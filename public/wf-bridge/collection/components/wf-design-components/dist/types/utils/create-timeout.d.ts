export interface TimeoutInstance {
    set: (handler: TimerHandler, timeout?: number, ...args: any[]) => void;
    clear: () => void;
}
export declare const createTimeout: () => TimeoutInstance;
