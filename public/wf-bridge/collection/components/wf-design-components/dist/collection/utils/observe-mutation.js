export const observeMutation = (element, callback, options) => {
    const observer = new MutationObserver(callback);
    observer.observe(element, options);
};
