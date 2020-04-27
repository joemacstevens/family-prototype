import { r as registerInstance, h } from './core-2ee2b62e.js';
import './_commonjsHelpers-97e6d7b1.js';
import { c as setupTimeout } from './utils-9974937e.js';

const timeoutMessages = {
    error: 'Seems to be down, please try again later',
    warning: 'Please be patient, it may take a longer time',
};
const defaultDelay = 0;
const defaultWarningTimeout = 10000;
const defaultErrorTimeout = 20000;

const WfSpinner = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** Message to show warning with long loading time */
        this.timeoutWarningMsg = timeoutMessages.warning;
        /** Message to show error when time expired */
        this.timeoutErrorMsg = timeoutMessages.error;
        /** Delay time (in ms) after which spinner will show */
        this.delay = defaultDelay;
        /** Amount of time (in ms) that spinner will wait until shows timeoutWarningMsg. Set to 0 to disable. */
        this.warningTimeout = defaultWarningTimeout;
        /** Amount of time (in ms) that spinner will wait until shows timeoutErrorMsg. Set to 0 to disable. */
        this.errorTimeout = defaultErrorTimeout;
        /** Define if warning message is visible */
        this.timeoutWarningState = false;
        /** Define if error message is visible */
        this.timeoutErrorState = false;
        /** Define if spinner is actually visible */
        this.visible = false;
    }
    setErrorTimeout() {
        const { errorTimeout } = this;
        this.errorTimeoutHandler = setupTimeout(() => {
            if (errorTimeout === 0)
                return;
            this.timeoutWarningState = false;
            this.timeoutErrorState = true;
        }, errorTimeout);
    }
    async setSpinner() {
        const { opened, warningTimeoutHandler, errorTimeoutHandler, delay, delayTimeoutHandler } = this;
        if (!opened) {
            if (!!warningTimeoutHandler)
                warningTimeoutHandler();
            if (!!errorTimeoutHandler)
                errorTimeoutHandler();
            if (!!delayTimeoutHandler)
                delayTimeoutHandler();
            this.visible = false;
            return;
        }
        if (delay !== 0) {
            this.delayTimeoutHandler = setupTimeout(() => {
                this.handleSpinnerStates();
            }, delay);
        }
        else {
            this.handleSpinnerStates();
        }
    }
    handleSpinnerStates() {
        this.visible = true;
        this.timeoutWarningState = false;
        this.timeoutErrorState = false;
        this.setTimers();
    }
    setTimers() {
        const { warningTimeout, errorTimeout } = this;
        if (warningTimeout === 0 && errorTimeout === 0)
            return;
        this.warningTimeoutHandler = setupTimeout(() => {
            if (warningTimeout !== 0)
                this.timeoutWarningState = true;
            this.setErrorTimeout();
        }, warningTimeout);
    }
    componentDidLoad() {
        this.setSpinner();
    }
    render() {
        const { timeoutWarningMsg, timeoutErrorMsg, timeoutWarningState, timeoutErrorState, visible, } = this;
        return visible ? (h("div", { class: "spinner-wrapper" }, !timeoutErrorState ? (h("svg", { class: "spinner-graphic", viewBox: "0 0 60 60", preserveAspectRatio: "xMidYMid" }, h("circle", { class: "spinner-background-ring", cx: "30", cy: "30", r: "24", "stroke-linecap": "round", fill: "none" }), h("circle", { class: "spinner-foreground-ring", cx: "30", cy: "30", r: "24", "stroke-linecap": "round", fill: "none" }))) : (''), timeoutWarningState ? h("span", { class: "spinner-msg" }, timeoutWarningMsg) : '', timeoutErrorState ? h("span", { class: "spinner-msg" }, timeoutErrorMsg) : '')) : null;
    }
    static get watchers() { return {
        "opened": ["setSpinner"]
    }; }
    static get style() { return "\@-webkit-keyframes spinner-border{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@keyframes spinner-border{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.spinner-wrapper{position:absolute;top:0;bottom:0;left:0;right:0;z-index:var(--spinner-z-index,600);background:var(--spinner-background,hsla(0,0%,100%,.8));display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.spinner-wrapper .spinner-msg{color:var(--spinner-msg-color);font-family:var(--spinner-msg-font-family);font-size:var(--spinner-msg-font-size);font-weight:var(--spinner-msg-font-weight);text-transform:var(--spinner-text-transform,var(--spinner-msg-text-transform))}.spinner-wrapper .spinner{border-color:var(--spinner-color,var(--spinner-foreground-ring-color,#444));border-top-color:transparent;border-width:var(--spinner-thickness,var(--spacing-xxxs,3px));border-radius:50%;border-style:solid;-webkit-animation:spinner-border 1.2s linear infinite;animation:spinner-border 1.2s linear infinite}.spinner-wrapper .spinner,.spinner-wrapper .spinner-graphic{width:var(--spinner-size,var(--spacing-m,36px));height:var(--spinner-size,var(--spacing-m,36px))}.spinner-wrapper .spinner-background-ring{stroke:var(--spinner-background-ring-color,#f5f5f5);stroke-width:var(--spinner-thickness,var(--spacing-xxxs,3px))}.spinner-wrapper .spinner-background-ring,.spinner-wrapper .spinner-foreground-ring{width:var(--spinner-size,var(--spacing-m,36px));height:var(--spinner-size,var(--spacing-m,36px))}.spinner-wrapper .spinner-foreground-ring{fill:transparent;stroke:var(--spinner-color,var(--spinner-foreground-ring-color,#444));stroke-width:var(--spinner-thickness,var(--spacing-xxxs,3px));-webkit-animation:spinner 1.6666666667s linear infinite;animation:spinner 1.6666666667s linear infinite}\@-webkit-keyframes spinner{0%{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate(0deg);transform:rotate(0deg);stroke-dasharray:0 144.5132620651}50%{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate(190deg);transform:rotate(190deg);stroke-dasharray:115.6106096521 28.902652413}to{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate(2turn);transform:rotate(2turn);stroke-dasharray:0 144.5132620651}}\@keyframes spinner{0%{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate(0deg);transform:rotate(0deg);stroke-dasharray:0 144.5132620651}50%{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate(190deg);transform:rotate(190deg);stroke-dasharray:115.6106096521 28.902652413}to{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate(2turn);transform:rotate(2turn);stroke-dasharray:0 144.5132620651}}"; }
};

export { WfSpinner as wf_spinner };
