import { getElement } from "@stencil/core";
const defaultOptions = {
    cancelable: true,
    composed: true,
    bubbles: true,
    prefix: 'wf',
};
export const addPrefix = (str, prefix) => prefix + str.charAt(0).toUpperCase() + str.substring(1);
export function customEventEmitter(host, event, opts = defaultOptions) {
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
export function PrefixEvent(opts) {
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
