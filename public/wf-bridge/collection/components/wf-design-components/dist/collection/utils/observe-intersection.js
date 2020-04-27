import IntersectionObserver from 'intersection-observer-polyfill';
export const observeIntersection = (element, callback, options) => {
    const observer = new IntersectionObserver(callback, options);
    observer.observe(element);
};
