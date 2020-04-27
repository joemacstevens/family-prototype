/**
 * Simple shims for WeakMap and Map classes.
 * This implementation is not meant to be used outside of IntersectionObserver modules
 * because it covers only limited range of use cases.
 */

const hasNativeCollections =
    typeof window.WeakMap === 'function' &&
    typeof window.Map === 'function';

const WeakMap = (function () {
    if (hasNativeCollections) {
        return window.WeakMap;
    }

    /**
     *
     * @param {Array<Array>} arr
     * @param {Object} key
     * @returns {Number}
     */
    function getIndex(arr, key) {
        let result = -1;

        arr.some((entry, index) => {
            let matches = entry[0] === key;

            if (matches) {
                result = index;
            }

            return matches;
        });

        return result;
    }

    return class {
        constructor() {
            this.__entries__ = [];
        }

        /**
         *
         * @param {Object} key
         * @returns {*}
         */
        get(key) {
            let index = getIndex(this.__entries__, key);

            return this.__entries__[index][1];
        }

        /**
         *
         * @param {Object} key
         * @param {*} value
         */
        set(key, value) {
            let index = getIndex(this.__entries__, key);

            if (~index) {
                this.__entries__[index][1] = value;
            } else {
                this.__entries__.push([key, value]);
            }
        }

        /**
         *
         * @param {Object} key
         */
        delete(key) {
            let entries = this.__entries__,
                index = getIndex(entries, key);

            if (~index) {
                entries.splice(index, 1);
            }
        }

        /**
         *
         * @param {Object} key
         * @returns {Boolean}
         */
        has(key) {
            return !!~getIndex(this.__entries__, key);
        }
    };
})();

const Map = (function () {
    if (hasNativeCollections) {
        return window.Map;
    }

    return class extends WeakMap {
        /**
         *
         * @returns {Number}
         */
        get size() {
            return this.__entries__.length;
        }

        clear() {
            this.__entries__.splice(0, this.__entries__.length);
        }

        /**
         *
         * @returns {Array<Array>}
         */
        entries() {
            return this.__entries__.slice();
        }

        /**
         *
         * @returns {Array}
         */
        keys() {
            return this.__entries__.map(entry => entry[0]);
        }

        /**
         *
         * @returns {Array}
         */
        values() {
            return this.__entries__.map(entry => entry[1]);
        }

        /**
         *
         * @param {Function} callback
         * @param {Object} [ctx = null]
         */
        forEach(callback, ctx = null) {
            for (const entry of this.__entries__) {
                callback.call(ctx, entry[1], entry[0]);
            }
        }
    };
})();

/**
 * A shim for performance.now method which falls back
 * to Date.now if the first one is not supported.
 *
 * @returns {Timestamp}
 */
const now = (function () {
    if (window.performance && window.performance.now) {
        return () => window.performance.now();
    }

    return () => Date.now();
})();

const mutationsSupported = typeof window.MutationObserver === 'function';

/**
 * A shim for requestAnimationFrame which falls back
 * to setTimeout if the first one is not supported.
 *
 * @returns {Number} Request identifier.
 */
const requestAnimFrame = (function () {
    if (window.requestAnimationFrame) {
        return window.requestAnimationFrame;
    }

    return callback => {
        return setTimeout(() => callback(now()), 1000 / 60);
    };
})();

/**
 * Creates a wrapper function that ensures that
 * provided callback will be invoked only after
 * the specified delay.
 *
 * @param {Function} callback
 * @param {Number} [delay = 0]
 * @returns {Function}
 */
function debounce(callback, delay = 0) {
    let timeoutID = false;

    return function (...args) {
        if (timeoutID !== false) {
            clearTimeout(timeoutID);
        }

        timeoutID = setTimeout(() => {
            timeoutID = false;

            callback.apply(this, args);
        }, delay);
    };
}

/**
 * Controller class that is used to handle updates of registered IntersectionObservers.
 * It controls when and for how long it's necessary to run updates of observations
 * by listening to various events on window along with DOM mutations
 * (nodes removal, changes of attributes, etc.).
  *
 * CSS transitions and animations are handled by running the update cycle
 * until position of DOM elements, added to connected observers, keeps changing
 * or until the idle timeout is reached (default timeout is 50 milliseconds).
 * Timeout value can be manually increased if transitions have a delay.
 *
 * Tracking of changes made by ":hover" class is optional and can be
 * enabled by invoking the "enableHover" method.
 *
 * Infinite update cycle along with a listener of "click" event will be used in case when
 * MutatioObserver is not supported.
 */
class IntersectionObserverController {
    /**
     * Creates new IntersectionObserverController instance.
     *
     * @param {Number} [idleTimeout = 50]
     * @pram {Boolean} [trackHovers = false] - Whether to track "mouseover"
     *      events or not. Disabled be default.
     */
    constructor(idleTimeout = 50, trackHovers = false) {
        this._idleTimeout = idleTimeout;
        this._trackHovers = trackHovers;
        this._cycleStartTime = -1;

        // Indicates whether the update of observers is scheduled.
        this._isUpdateScheduled = false;

        // Indicates whether infinite cycles are enabled.
        this._repeatCycle = false;

        // Indicates whether "mouseover" event handler was added.
        this._hoverInitiated = false;

        // Keeps reference to the instance of MutationObserver.
        this._mutationsObserver = null;

        // Indicates whether DOM listeners were initiated.
        this._isListening = false;

        // A list of connected observers.
        this._observers = [];

        // Fix value of "this" binding for the following methods.
        this.startUpdateCycle = this.startUpdateCycle.bind(this);
        this.scheduleUpdate = this.scheduleUpdate.bind(this);
        this._onMutation = this._onMutation.bind(this);

        // Function that will be invoked to re-rerun the update cycle
        // if repeatable cycles are enabled.
        this._repeatHandler = debounce(this.scheduleUpdate, 200);

        // "mouseover" event handler.
        this._onMouseOver = debounce(this.startUpdateCycle, 200);
    }

    /**
     * Returns current idle timeout value.
     *
     * @returns {Number}
     */
    get idleTimeout() {
        return this._idleTimeout;
    }

    /**
     * Sets up new idle timeout value.
     *
     * @param {Number} value - New timeout value.
     */
    set idleTimeout(value) {
        this._idleTimeout = value;
    }

    /**
     * Adds observer to observers list.
     *
     * @param {IntersectionObserver} observer - Observer to be added.
     */
    connect(observer) {
        if (!this.isConnected(observer)) {
            this._observers.push(observer);
        }

        // Instantiate listeners if they
        // weren't instantiated yet.
        if (!this._isListening) {
            this._initListeners();
        }
    }

    /**
     * Removes observer from observers list.
     *
     * @param {IntersectionObserver} observer - Observer to be removed.
     */
    disconnect(observer) {
        let observers = this._observers,
            index = observers.indexOf(observer);

        if (~index) {
            observers.splice(index, 1);
        }

        // Remove listeners if controller
        // has no connected observers.
        if (!observers.length && this._isListening) {
            this._removeListeners();
        }
    }

    /**
     * Tells whether provided observer is connected to controller.
     *
     * @param {IntersectionObserver} observer - Observer to be checked.
     * @returns {Boolean}
     */
    isConnected(observer) {
        return !!~this._observers.indexOf(observer);
    }

    /**
     * Updates every observer from observers list and
     * notifies them of queued entries.
     *
     * @private
     * @returns {Boolean} Returns "true" if any observer
     *      has detected changes in position of its elements.
     */
    _updateObservers() {
        let hasChanges = false;

        for (const observer of this._observers) {
            if (observer.updateObservations()) {
                hasChanges = true;
            }

            if (observer.hasEntries()) {
                observer.notifySubscriber();
            }
        }

        return hasChanges;
    }

    /**
     * Schedules new update cycle.
     */
    startUpdateCycle() {
        this._cycleStartTime = now();

        this.scheduleUpdate();
    }

    /**
     * Controls invocation of "_updateObservers" method.
     * It will re-invoke itself in the following cases:
     *      - Update of observers detected changes in elements position.
     *        In this case we need to postpone cycle end time in order to ensure
     *        that we won't miss next iteration of animations.
     *
     *      - Idle timeout wasn't reached yet.
     *        In this case we need to schedule new single update
     *        because changes may be delayed.
     *
     * @param {Number} [timestamp] - Internal parameter
     *      that is used to define whether method was invoked
     *      as a callback of requestAnimationFrame.
     */
    scheduleUpdate(timestamp) {
        let calledFromRAF = typeof timestamp === 'number';

        // Invoke the update of observers only if function
        // was called as a requestAnimationFrame callback.
        if (calledFromRAF) {
            const hasChanges = this._updateObservers();

            this._isUpdateScheduled = false;

            // Do nothing if cycle wasn't started.
            if (!this._wasCycleStarted()) {
                return;
            }

            if (hasChanges) {
                // Postpone cycle end time if changes were detected.
                this.startUpdateCycle();
            } else if (!this._hasIdleTimeEnded()) {
                // Schedule new single update if cycle timeout wasn't reached yet.
                this.scheduleUpdate();
            } else {
                // Finish cycle.
                this._onCycleEnded();
            }
        } else if (!this._isUpdateScheduled) {
            // Request new update if it wasn't requested already.
            requestAnimFrame(this.scheduleUpdate);

            this._isUpdateScheduled = true;
        }
    }

    /**
     * Tells whether cycle has reached its idle timeout.
     *
     * @private
     * @returns {Boolean}
     */
    _hasIdleTimeEnded() {
        return now() - this._cycleStartTime > this._idleTimeout;
    }

    /**
     * Tells whether the update cycle is currently running.
     *
     * @private
     * @returns {Boolean}
     */
    _wasCycleStarted() {
        return this._cycleStartTime !== -1;
    }

    /**
     * Callback that will be invoked after the update cycle is finished.
     *
     * @private
     */
    _onCycleEnded() {
        // Mark that update cycle is not running.
        this._cycleStartTime = -1;

        if (this._repeatCycle) {
            // Time is set to '0' because we want to automatically
            // start update cycle when single update detects changes.
            this._cycleStartTime = 0;

            this._repeatHandler();
        }
    }

    /**
     * Initializes DOM listeners.
     *
     * @private
     */
    _initListeners() {
        // Do nothing if listeners are already initiated.
        if (this._isListening) {
            return;
        }

        this._isListening = true;

        // Use update cycle here instead of a single update because we may encounter
        // with delayed changes, e.g. when width or height of an
        // element are changed by CSS transitions.
        window.addEventListener('resize', this.startUpdateCycle, true);

        window.addEventListener('scroll', this.scheduleUpdate, true);

        // Listen to possible changes made by ":hover" class.
        if (this._trackHovers) {
            this._addHoverListener();
        }

        // Fall back to repeatable cycle with additional tracking of
        // "click" event if MutationObserver is not supported.
        if (!mutationsSupported) {
            this._repeatCycle = true;

            // Listen to clicks as they may cause changes in elements position.
            window.addEventListener('click', this.startUpdateCycle, true);

            // Manually start cycle.
            this.startUpdateCycle();
        } else {
            // Subscribe to DOM mutations as they may lead to changes in position of elements.
            this._mutationsObserver = new MutationObserver(this._onMutation);

            this._mutationsObserver.observe(document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        }
    }

    /**
     * Removes all DOM listeners.
     *
     * @private
     */
    _removeListeners() {
        // Do nothing if listeners were already removed.
        if (!this._isListening) {
            return;
        }

        window.removeEventListener('resize', this.startUpdateCycle, true);
        window.removeEventListener('scroll', this.scheduleUpdate, true);

        this._removeHoverListener();

        if (!mutationsSupported) {
            this._repeatCycle = false;

            window.removeEventListener('click', this.startUpdateCycle, true);
        } else if (this._mutationsObserver) {
            this._mutationsObserver.disconnect();
            this._mutationsObserver = null;
        }

        this._isListening = false;
    }

    /**
     * Enables hover listener.
     */
    enableHover() {
        this._trackHovers = true;

        // Manually add hover listener
        // if listeners were already initiated.
        if (this._isListening) {
            this._addHoverListener();
        }
    }

    /**
     * Disables hover listener.
     */
    disableHover() {
        this._trackHovers = false;

        this._removeHoverListener();
    }

    /**
     * Tells whether hover listener is enabled.
     *
     * @returns {Boolean}
     */
    isHoverEnabled() {
        return this._trackHovers;
    }

    /**
     * Adds "mouseover" listener if it wasn't already added.
     *
     * @private
     */
    _addHoverListener() {
        if (this._hoverInitiated) {
            return;
        }

        window.addEventListener('mouseover', this._onMouseOver, true);

        this._hoverInitiated = true;
    }

    /**
     * Removes "mouseover" listener if it was added previously.
     *
     * @private
     */
    _removeHoverListener() {
        if (!this._hoverInitiated) {
            return;
        }

        window.removeEventListener('mouseover', this._onMouseOver, true);

        this._hoverInitiated = false;
    }

    /**
     * DOM mutations handler.
     *
     * @private
     * @param {Array<MutationRecord>} entries
     */
    _onMutation(entries) {
        const runSingleUpdate = entries.every(entry => {
            return entry.type !== 'attributes';
        });

        // Schedule single update if attributes (class, style, etc.)
        // were not changed. Otherwise run update cycle because
        // animations are expected to appear only in this case.
        runSingleUpdate ?
            this.scheduleUpdate() :
            this.startUpdateCycle();
    }
}

/**
 * From provided rectangle creates a new one whose
 * properties are not enumerable, configurable or writable.
 *
 * @param {ClientRect} rect - Initial rectangle.
 * @returns {ClientRect}
 */
function mapToClientRect(rect) {
    const descriptors = {};

    for (const key of Object.keys(rect)) {
        descriptors[key] = {value: rect[key]};
    }

    return Object.defineProperties({}, descriptors);
}

/**
 * Creates rectangle based on provided arguments.
 * If called without arguments then an empty rectangle
 * will be created.
 *
 * @param {Number} [left = 0] - Left position of rectangle.
 * @param {Number} [top = 0] - Top position of rectangle.
 * @param {Number} [width = 0] - Rectangles' width.
 * @param {Number} [height = 0] - Rectangles' height.
 * @returns {ClientRect}
 */
function createRectangle(left = 0, top = 0, width = 0, height = 0) {
    return {
        left, top, width, height,
        bottom: top + height,
        right: left + width
    };
}

/**
 * Returns client rectangle of provided element.
 * If element represents documentElement then returns
 * main viewport rectangle.
 *
 * @param {Element} target
 * @returns {ClientRect}
 */
function getRectangle(target) {
    if (target === document.documentElement) {
        return createRectangle(0, 0, target.clientWidth, target.clientHeight);
    }

    return target.getBoundingClientRect();
}

/**
 * Calculates area of rectangle.
 *
 * @param {ClientRect} rect - Rectangle whose area needs to be calculated.
 * @returns {Number} Rectangles' area.
 */
function getArea(rect) {
    return rect.width * rect.height;
}

/**
 * Tells whether rectangle is empty.
 *
 * @param {ClientRect} rect - Rectangle to be checked.
 * @returns {Boolean}
 */
function isEmpty(rect) {
    return rect.height === 0 && rect.width === 0;
}

/**
 * Compares rectangles to each other.
 *
 * @param {ClientRect} first
 * @param {ClientRect} second
 * @returns {Boolean}
 */
function isEqual(first, second) {
    return (
        first.top === second.top &&
        first.left === second.left &&
        first.right === second.right &&
        first.bottom === second.bottom
    );
}

class IntersectionObserverEntry {
    /**
     * Creates new instance of IntersectionObserverEntry.
     *
     * @param {Element} target
     * @param {ClientRect} targetRect
     * @param {ClientRect} intersecRect
     * @param {Number} intersecRatio
     * @param {ClientRect} rootBounds
     * @param {Timestamp} time
     */
    constructor(target, targetRect, intersecRect, intersecRatio, rootBounds, time) {

        // According to the spec following properties are not writable and
        // in native implementation they are also not enumerable.
        Object.defineProperties(this, {
            boundingClientRect: {value: targetRect},
            intersectionRatio:  {value: intersecRatio},
            intersectionRect:   {value: mapToClientRect(intersecRect)},
            rootBounds:         {value: mapToClientRect(rootBounds)},
            target:             {value: target},
            time:               {value: time}
        });
    }
}

const emptyRect = createRectangle();

/**
 * Tells whether target is a descendant of container element
 * and that both of them are present in DOM.
 *
 * @param {Element} container - Container element.
 * @param {Element} target - Target element.
 * @returns {Boolean}
 */
function isDetached(container, target) {
    const docElement = document.documentElement;

    return (
        container !== docElement && !docElement.contains(container) ||
        !container.contains(target)
    );
}

/**
 * Computes intersection rectangle between two rectangles.
 *
 * @param {ClientRect} rootRect - Rectangle of container element.
 * @param {ClientRect} targetRect - Rectangle of target element.
 * @returns {ClientRect} Intersection rectangle.
 */
function computeIntersection(rootRect, targetRect) {
    const left      = Math.max(targetRect.left, rootRect.left);
    const right     = Math.min(targetRect.right, rootRect.right);
    const top       = Math.max(targetRect.top, rootRect.top);
    const bottom    = Math.min(targetRect.bottom, rootRect.bottom);

    const width = right - left;
    const height = bottom - top;

    return createRectangle(left, top, width, height);
}

/**
 * Finds intersection rectangle of provided elements.
 *
 * @param {Element} container - Container element.
 * @param {Element} target - Target element.
 * @param {ClientRect} targetRect - Rectangle of target element.
 * @param {ClientRect} containterRect - Rectangle of container element.
 */
function getIntersection(container, target, containterRect, targetRect) {
    let intersecRect    = targetRect,
        parent          = target.parentNode,
        rootReached     = false;

    while (!rootReached) {
        let parentRect = null;

        if (parent === container || parent.nodeType !== 1) {
            rootReached = true;
            parentRect = containterRect;
        } else if (window.getComputedStyle(parent).overflow !== 'visible') {
            parentRect = getRectangle(parent);
        }

        if (parentRect) {
            intersecRect = computeIntersection(intersecRect, parentRect);
        }

        parent = parent.parentNode;
    }

    return intersecRect;
}

/**
 * This class is responsible for computing and keeping track of intersections
 * between target element and its container. It will create and queue for notification
 * new IntersectionObserverEntry when intersection ratio reaches new thresholded value.
 */
class IntersectionObservation {
    /**
     * Creates instance of IntersectionObservation.
     *
     * @param {Element} target - Element being observed.
     * @param {IntersectionObserver} observer - Associated IntersectionObserver.
     */
    constructor(target, observer) {
        this.target = target;
        this.observer = observer;

        this.prevTargetRect = emptyRect;
        this.prevThreshold = 0;
        this.prevRatio = 0;
    }

    /**
     * Updates intersection data. Creates and queues new
     * IntersectionObserverEntry if intersection threshold has changed.
     *
     * @param {Object} root - Element for which to compute intersection.
     * @param {ClientRect} rootRect - Rectangle of root element.
     * @returns {Object} An object with information about detected changes:
     *  {
     *      ratioChanged: boolean,
     *      targetRectChanged: boolean,
     *      thresholdChanged: boolean
     *  }
     */
    updateIntersection(root, rootRect) {
        let targetRect          = getRectangle(this.target),
            intersection        = this.getIntersectionData(root, rootRect, targetRect),
            threshold           = +intersection.exists,
            ratioChanged        = intersection.ratio !== this.prevRatio,
            targetRectChanged   = !isEqual(targetRect, this.prevTargetRect),
            thresholdChanged;

        // Find thresholds' index if intersection
        // and target rectangles are not empty.
        if (intersection.exists && !isEmpty(targetRect)) {
            threshold = this.observer.getThresholdGreaterThan(intersection.ratio);
        }

        thresholdChanged = threshold !== this.prevThreshold;

        // Update cached properties.
        this.prevTargetRect = targetRect;
        this.prevThreshold = threshold;
        this.prevRatio = intersection.ratio;

        // Create an empty rectangle if there is no intersection.
        if (!intersection.exists) {
            intersection.ratio = 0;
            intersection.rect = emptyRect;
        }

        // Create and queue new entry if threshold has changed.
        if (thresholdChanged) {
            const entry = new IntersectionObserverEntry(
                this.target,
                targetRect,
                intersection.rect,
                intersection.ratio,
                rootRect,
                now()
            );

            this.observer.queueEntry(entry);
        }

        return {ratioChanged, thresholdChanged, targetRectChanged};
    }

    /**
     * Computes intersection data.
     *
     * @param {Element} container - Container element.
     * @param {ClientRect} [containterRect]
     * @param {ClientRect} [targetRect]
     * @returns {Object}
     */
    getIntersectionData(container, containterRect, targetRect) {
        const target = this.target;

        if (!targetRect) {
            targetRect = getRectangle(this.target);
        }

        if (!containterRect) {
            containterRect = getRectangle(container);
        }

        let detached        = isDetached(container, target),
            intersecRect    = !detached ? getIntersection(container, target, containterRect, targetRect) : emptyRect,
            intersects      = !detached && intersecRect.width >= 0 && intersecRect.height >= 0,
            intersecRatio   = getArea(intersecRect) / getArea(targetRect) || 0;

        return {
            rect: intersecRect,
            ratio: intersecRatio,
            exists: intersects
        };
    }
}

/**
 * Validates and parses threshold values.
 * Throws an error if one of the thresholds
 * is non-finite or not in range of 0 and 1.
 *
 * @param {(Array<Number>|Number)} [thresholds = 0]
 * @returns {Array<Number>} An array of thresholds in ascending order.
 */
function parseThresholds(thresholds = 0) {
    let result = thresholds;

    if (!Array.isArray(thresholds)) {
        result = [thresholds];
    } else if (!thresholds.length) {
        result = [0];
    }

    return result.map(threshold => {
        // We use Number function instead of parseFloat
        // to convert boolean values and null to theirs
        // numeric representation. This is done to act
        // in the same manner as a native implementation.
        threshold = Number(threshold);

        if (!window.isFinite(threshold)) {
            throw new TypeError('The provided double value is non-finite.');
        } else if (threshold < 0 || threshold > 1) {
            throw new RangeError('Threshold values must be between 0 and 1.');
        }

        return threshold;
    }).sort();
}

/**
 * Validates and converts margins value (defined in a form of
 * CSS 'margin' property) to a list of tokens, e.g:
 * 1. '0px' = [['0px'], ['0px'], ['0px'], ['0px']]
 * 2. '5px 11px' = [['5px'], ['11px'], ['5px'], ['11px']]
 *
 * @param {String} [margins = '0px'] - Margins value to be processed.
 * @returns {Array<Array>} Object that contains both: a list of
 *      tokens and its string representation.
 */
function parseMargins(margins = '0px') {
    // Use regular expression in order to properly
    // handle multiple spaces in-between of tokens: '0px     2px   5px'.
    //
    // Casting to a string is required to keep the behavior
    // closer to the native implementation which converts
    // an array like [[['2px 3px']]] to '2px 3px';
    margins = (margins + '').split(/\s+/);

    // Chrome validates tokens length starting from version 53.
    if (margins.length > 4) {
        throw new Error('Extra text found at the end of rootMargin.');
    }

    margins[0] = margins[0] || '0px';
    margins[1] = margins[1] || margins[0];
    margins[2] = margins[2] || margins[0];
    margins[3] = margins[3] || margins[1];

    const rawData = margins.join(' ');

    const parsedData = margins.map(token => {
        let [,value, unit] = /^(-?\d*\.?\d+)(px|%)$/.exec(token) || [];
        const pixels = unit === 'px';

        value = parseFloat(value);

        if (!window.isFinite(value)) {
            throw new Error('rootMargin must be specified in pixels or percent.');
        }

        if (!pixels) {
            value /= 100;
        }

        return {value, pixels};
    });

    return {rawData, parsedData};
}

/**
 * Creates new rectangle from provided one whose
 * dimensions will be modified by applying margins
 * defined in a form of [[value: Number, pixels: Boolean], ...].
 *
 * @param {ClientRect} targetRect - Initial rectangle.
 * @param {Array<Array>} margins - Margins data.
 * @returns {ClientRect} Modified rectangle.
 */
function applyMargins(targetRect, margins) {
    margins = margins.map((margin, index) => {
        let value = margin.value;

        if (!margin.pixels) {
            value *= index % 2 ? targetRect.width : targetRect.height;
        }

        return value;
    });

    const result = {
        top: targetRect.top - margins[0],
        right: targetRect.right + margins[1],
        bottom: targetRect.bottom + margins[2],
        left: targetRect.left - margins[3]
    };

    result.width = result.right - result.left;
    result.height = result.bottom - result.top;

    return result;
}

class IntersectionObserver {
    /**
     * Creates new IntersectionObserver instance.
     *
     * @param {Function} callback - Callback function that will be invoked
     *      whenever one of the observed targets reaches new ratio value defined in "options.threshold".
     * @param {Object} [options = {}] - Optional configuration.
     * @param {IntersectionObserverController} controller - Associated controller instance.
     * @param {IntersectionObserver} publicObserver - This value will be used as
     *      a value of "this" binding for the callback function.
     */
    constructor(callback, options = {}, controller, publicObserver) {
        if (typeof callback !== 'function') {
            throw new TypeError("The callback provided as parameter 1 is not a function.");
        }

        if (typeof options !== 'object') {
            throw new TypeError("parameter 2 is not an object.");
        }

        if ('root' in options && !(options.root instanceof Element)) {
            throw new TypeError("member root is not of type Element.");
        }


        const thresholds = parseThresholds(options.threshold);
        const rootMargin = parseMargins(options.rootMargin);

        this.root = options.root || null;
        this.rootMargin = rootMargin.rawData;

        // Thresholds array needs to be immutable
        // according to the native implementation.
        this.thresholds = Object.freeze(thresholds);

        this._root = options.root || document.documentElement;
        this._callback = callback;
        this._rootMargin = rootMargin.parsedData;

        // Registry of observed elements and
        // corresponding IntersectionObservation instances.
        this._targets = new Map();

        // A list of queued IntersectionObserverEntry
        // items that will passed to the callback function.
        this._quedEntries = [];

        this._publicObserver = publicObserver || this;

        this.controller = controller;
    }

    /**
     * Adds provided target to observations list.
     *
     * @param {Element} target - DOM element to be observed.
     */
    observe(target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }

        if (!(target instanceof Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }

        let targets = this._targets;

        // Do nothing if target is already observed.
        if (targets.has(target)) {
            return;
        }

        // Create new IntersectionObservation instance and assign it
        // to provided target.
        targets.set(target, new IntersectionObservation(target, this));

        // Connect current observer to controller
        // if it wasn't connected yet.
        if (!this.controller.isConnected(this)) {
            this.controller.connect(this);
        }

        // Request the update of observers.
        this.controller.startUpdateCycle();
    }

    /**
     * Removes provided target from observations list.
     *
     * @param {Element} target - DOM element to stop observing.
     */
    unobserve(target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }

        if (!(target instanceof Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }

        let targets = this._targets;

        if (targets.has(target)) {
            targets.delete(target);
        }

        // Disconnect observer if the list of observed targets is empty.
        if (!targets.size) {
            this.disconnect();
        }
    }

    /**
     * Removes all targets from observations list
     * and disconnects observer from associated controller, i.e.
     * no updates will be invoked for it.
     */
    disconnect() {
        this._targets.clear();
        this.controller.disconnect(this);
    }

    /**
     * Returns a list of queued observation entries and
     * clears the queue.
     *
     * @returns {Array}
     */
    takeRecords() {
        return this._quedEntries.splice(0);
    }

    /**
     * Invokes callback function with a list
     * of queued entries if the last one is not empty.
     *
     * @private
     */
    notifySubscriber() {
        const entries = this.takeRecords();
        const publicObserver = this._publicObserver;

        if (entries.length) {
            this._callback.call(publicObserver, entries, publicObserver);
        }
    }

    /**
     * Adds entry to the queue.
     *
     * @param {IntersectionObserverEntry} entry
     */
    queueEntry(entry) {
        this._quedEntries.push(entry);
    }

    /**
     * Tells whether observer has queued entries.
     *
     * @returns {Boolean}
     */
    hasEntries() {
        return !!this._quedEntries.length;
    }

    /**
     * Updates intersection data of each observed target.
     *
     * @returns {Boolean} Returns "true" if intersection ratio or the rectangle of one of the
     *      observed targets has changed. This information is required for
     *      controller to decide whether to continue running the update cycle.
     */
    updateObservations() {
        let root     = this._root,
            rootRect = this.getRootRect(),
            hasChanges = false;

        this._targets.forEach(observation => {
            const changes = observation.updateIntersection(root, rootRect);

            if (changes.ratioChanged || changes.targetRectChanged) {
                hasChanges = true;
            }
        });

        return hasChanges;
    }

    /**
     * Finds index of the first threshold whose value is greater than provided ratio.
     * In case if there is no such value the amount of thresholds will be returned.
     *
     * @param {Number} ratio
     * @returns {Number}
     */
    getThresholdGreaterThan(ratio) {
        let thresholds = this.thresholds,
            thresholdsLen = thresholds.length,
            index = 0;

        while (index < thresholdsLen && thresholds[index] <= ratio) {
            ++index;
        }

        return index;
    }

    /**
     * Calculates rectangle of root node with applied margins.
     *
     * @returns {ClientRect}
     */
    getRootRect() {
        let rootRect = getRectangle(this._root);

        return applyMargins(rootRect, this._rootMargin);
    }
}

// This controllers' instance will be assigned to all IntersectionObservers
const controller = new IntersectionObserverController();

// Registry of internal observers.
const observers = new WeakMap();

/**
 * IntersectionObservers' "Proxy" class which is meant to hide private
 * properties and methods from IntersectionObserver instances.
 *
 * Additionally it implements "idleTimeout" and "trackHovers" static property
 * accessors to give a control over the behavior of IntersectionObserverController
 * instance. Changes made to these properties will affect both future and
 * existing instances of IntersectionObserver.
 */
class IntersectionObserver$1 {
    /**
     * Creates instance of public IntersectionObserver.
     *
     * @param {Function} callback
     * @param {Object} options
     */
    constructor(callback, options) {
        if (!arguments.length) {
            throw new TypeError("1 argument required, but only 0 present.");
        }

        const observer = new IntersectionObserver(callback, options, controller, this);

        // Due to the spec following properties are non-writable
        // and in native implementation they are also not enumerable.
        Object.defineProperties(this, {
            root:       {value: observer.root},
            thresholds: {value: observer.thresholds},
            rootMargin: {value: observer.rootMargin}
        });

        // Register internal observer.
        observers.set(this, observer);
    }

    /**
     * Extracts controllers' idle timeout value.
     *
     * @returns {Number}
     */
    static get idleTimeout() {
        return controller.idleTimeout;
    }

    /**
     * Sets up new idle timeout.
     *
     * @param {Number} value - New timeout value.
     */
    static set idleTimeout(value) {
        if (typeof value !== 'number') {
            throw new TypeError('type of "idleTimeout" value must be a number.');
        }

        if (typeof value < 0) {
            throw new TypeError('"idleTimeout" value must be greater than 0.');
        }

        controller.idleTimeout = value;
    }

    /**
     * Tells whether controller tracks "hover" events.
     *
     * @returns {Boolean}
     */
    static get trackHovers() {
        return controller.isHoverEnabled();
    }

    /**
     * Enables or disables tracking of "hover" event.
     *
     * @param {Boolean} value - Whether to disable or enable tracking.
     */
    static set trackHovers(value) {
        if (typeof value !== 'boolean') {
            throw new TypeError('type of "trackHovers" value must be a boolean.');
        }

        value ?
            controller.enableHover() :
            controller.disableHover();
    }
}

// Expose public methods of IntersectionObserver.
[
    'observe',
    'unobserve',
    'disconnect',
    'takeRecords'
].forEach(method => {
    IntersectionObserver$1.prototype[method] = function () {
        return observers.get(this)[method](...arguments);
    };
});

let IntersectionObserver$2;

// Define what implementation of IntersectionObserver
// needs to be exported: existing or polyfilled.
if (typeof window.IntersectionObserver === 'function') {
    // Export existing IntersectionObservers' implementation.
    IntersectionObserver$2 = window.IntersectionObserver;
} else {
    // Export polyfill.
    IntersectionObserver$2 = IntersectionObserver$1;
}

const IntersectionObserver$3 = IntersectionObserver$2;

const observeIntersection = (element, callback, options) => {
    const observer = new IntersectionObserver$3(callback, options);
    observer.observe(element);
};

export { observeIntersection as o };
