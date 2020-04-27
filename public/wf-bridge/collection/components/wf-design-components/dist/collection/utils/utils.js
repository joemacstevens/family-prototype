import clonedeep from 'lodash.clonedeep';
export function format(first, middle, last) {
    return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}
export function getAllNodes(host, selector) {
    return Array.from(host.querySelectorAll(selector));
}
export function getNode(host, selector) {
    return host.querySelector(selector);
}
export function generateUniqueId() {
    const timestamp = Date.now();
    const randomString = Math.random()
        .toString(36)
        .substr(2);
    return timestamp + randomString;
}
export function removePX(string) {
    return Number(string.replace('px', ''));
}
export function setPX(number) {
    return `${number}px`;
}
export function showErrorMessage(error, errorMessage, type) {
    const messageType = !!type ? type : 'text';
    return (!!error && !!errorMessage && errorMessage[messageType] && errorMessage[messageType].length > 0);
}
export function prepareErrorTooltip(error, errorMessage) {
    const defaultType = 'error';
    const defaultEvent = 'none';
    return Object.assign({ class: 'form-tooltip', opened: showErrorMessage(error, errorMessage, 'tooltip'), type: defaultType, trigger: defaultEvent, text: showErrorMessage(error, errorMessage, 'tooltip') ? errorMessage.tooltip : '' }, (showErrorMessage(error, errorMessage, 'placement') && {
        placement: errorMessage.placement,
    }));
}
export function detectIE() {
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    const trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        const rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    const edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
    // other browser
    return false;
}
export function setupTimeout(callback, time) {
    const timeoutId = setTimeout(() => {
        callback();
    }, time);
    return () => {
        clearTimeout(timeoutId);
    };
}
export function delayTimeout(time) {
    return new Promise((resolve) => setupTimeout(resolve, time));
}
export function parseArrayProperty(property) {
    if (typeof property === 'string') {
        try {
            return JSON.parse(property);
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }
    return clonedeep(property);
}
export function animate(element, start, end, prop = 'right', duration = 500) {
    element.animate({
        [prop]: [start, end],
    }, { duration, fill: 'forwards' });
}
export function stopPropagation(e) {
    e.stopPropagation();
}
