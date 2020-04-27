export const createTimeout = () => {
    let id;
    return {
        set: (handler, timeout, ...args) => {
            id = window.setTimeout(handler, timeout, ...args);
        },
        clear: () => {
            id && window.clearTimeout(id);
        },
    };
};
