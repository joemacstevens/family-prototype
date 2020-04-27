import ResizeObserver from 'resize-observer-polyfill';
export const observeResize = (element, callback) => {
    const observer = new ResizeObserver(callback);
    observer.observe(element);
};
