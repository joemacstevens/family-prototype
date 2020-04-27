/* eslint-disable */
export const createAnimationFrameRunner = (_callback) => {
    return {
        start: jest.fn(),
        stop: jest.fn(),
    };
};
