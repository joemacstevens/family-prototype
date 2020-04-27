import { g as getElement } from './core-2ee2b62e.js';

const defaultOptions = {
    cancelable: true,
    composed: true,
    bubbles: true,
    prefix: 'wf',
};
const addPrefix = (str, prefix) => prefix + str.charAt(0).toUpperCase() + str.substring(1);
function customEventEmitter(host, event, opts = defaultOptions) {
    const prefix = opts.prefix ? opts.prefix : defaultOptions.prefix;
    const events = [addPrefix(event, prefix), event];
    return {
        emit(detail) {
            events.forEach((eventName) => {
                const event = new CustomEvent(eventName, Object.assign(Object.assign({ detail }, defaultOptions), opts));
                host.dispatchEvent(event);
            });
        },
    };
}
function PrefixEvent(opts) {
    return function (proto, propertyName) {
        const { componentDidLoad } = proto;
        const eventName = opts && opts.eventName ? opts.eventName : propertyName;
        proto.componentDidLoad = function () {
            const emitter = this[eventName];
            if (!emitter || !emitter.emit) {
                const host = getElement(this);
                this[propertyName] = customEventEmitter(host, eventName, opts);
            }
            return componentDidLoad && componentDidLoad.call(this);
        };
    };
}

export { PrefixEvent as P };
