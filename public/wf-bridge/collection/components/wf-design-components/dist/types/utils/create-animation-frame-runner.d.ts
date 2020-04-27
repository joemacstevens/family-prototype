export interface AnimationFrameRunner {
    start: () => void;
    stop: () => void;
}
export declare const createAnimationFrameRunner: (callback: () => void) => AnimationFrameRunner;
