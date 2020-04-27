export const queryShadowRoot = (element, path) => {
    if (!element.shadowRoot) {
        throw new Error('Element has no shadow root');
    }
    const selectors = path.split('>>');
    return selectors.reduce((previousElement, currentSelector) => {
        return previousElement.querySelector(currentSelector);
    }, element.shadowRoot);
};
export const makeSiblings = (element, other) => {
    element.parentNode.append(other);
};
export const appendToBody = (element) => {
    document.querySelector('body').append(element);
};
export const createSpy = (target, container) => {
    const spy = document.createElement('wf-spy');
    spy.target = target;
    if (container) {
        container.append(spy);
    }
    return spy;
};
export const getElementsFromSlot = (element, selector) => {
    const slot = element.shadowRoot.querySelector(selector);
    return slot ? slot.assignedElements() : [];
};
