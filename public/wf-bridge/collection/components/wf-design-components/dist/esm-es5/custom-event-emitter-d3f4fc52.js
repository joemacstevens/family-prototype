import { g as getElement } from './core-2ee2b62e.js';
var defaultOptions = {
    cancelable: true,
    composed: true,
    bubbles: true,
    prefix: 'wf',
};
var addPrefix = function (str, prefix) { return prefix + str.charAt(0).toUpperCase() + str.substring(1); };
function customEventEmitter(host, event, opts) {
    if (opts === void 0) { opts = defaultOptions; }
    var prefix = opts.prefix ? opts.prefix : defaultOptions.prefix;
    var events = [addPrefix(event, prefix), event];
    return {
        emit: function (detail) {
            events.forEach(function (eventName) {
                var event = new CustomEvent(eventName, Object.assign(Object.assign({ detail: detail }, defaultOptions), opts));
                host.dispatchEvent(event);
            });
        },
    };
}
function PrefixEvent(opts) {
    return function (proto, propertyName) {
        var componentDidLoad = proto.componentDidLoad;
        var eventName = opts && opts.eventName ? opts.eventName : propertyName;
        proto.componentDidLoad = function () {
            var emitter = this[eventName];
            if (!emitter || !emitter.emit) {
                var host = getElement(this);
                this[propertyName] = customEventEmitter(host, eventName, opts);
            }
            return componentDidLoad && componentDidLoad.call(this);
        };
    };
}
export { PrefixEvent as P };
