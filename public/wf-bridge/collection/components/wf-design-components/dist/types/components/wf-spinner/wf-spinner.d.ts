export declare class WfSpinner {
    /** Define if spinner is visible */
    opened: boolean;
    /** Message to show warning with long loading time */
    timeoutWarningMsg: string;
    /** Message to show error when time expired */
    timeoutErrorMsg: string;
    /** Delay time (in ms) after which spinner will show */
    delay: number;
    /** Amount of time (in ms) that spinner will wait until shows timeoutWarningMsg. Set to 0 to disable. */
    warningTimeout: number;
    /** Amount of time (in ms) that spinner will wait until shows timeoutErrorMsg. Set to 0 to disable. */
    errorTimeout: number;
    /** Define if warning message is visible */
    timeoutWarningState: boolean;
    /** Define if error message is visible */
    timeoutErrorState: boolean;
    /** Define if spinner is actually visible */
    visible: boolean;
    warningTimeoutHandler: any;
    errorTimeoutHandler: any;
    delayTimeoutHandler: any;
    setErrorTimeout(): void;
    setSpinner(): Promise<void>;
    handleSpinnerStates(): void;
    private setTimers;
    componentDidLoad(): void;
    render(): any;
}
