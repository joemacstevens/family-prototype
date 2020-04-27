export const createAnimationFrameRunner = (callback) => {
    let requestId;
    const wrapper = () => {
        callback();
        requestId = window.requestAnimationFrame(wrapper);
    };
    return {
        start: () => {
            requestId = window.requestAnimationFrame(wrapper);
        },
        stop: () => {
            requestId && window.cancelAnimationFrame(requestId);
        },
    };
};
