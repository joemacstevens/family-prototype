/* eslint-disable */
export const createTimeout = () => {
    return {
        set: jest.fn(),
        clear: jest.fn(),
    };
};
