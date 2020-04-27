import { h } from "@stencil/core";
import { setupTimeout } from '../../utils/utils';
import { timeoutMessages, defaultDelay, defaultWarningTimeout, defaultErrorTimeout, } from './constans';
export class WfSpinner {
    constructor() {
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
        return visible ? (h("div", { class: "spinner-wrapper" },
            !timeoutErrorState ? (h("svg", { class: "spinner-graphic", viewBox: "0 0 60 60", preserveAspectRatio: "xMidYMid" },
                h("circle", { class: "spinner-background-ring", cx: "30", cy: "30", r: "24", "stroke-linecap": "round", fill: "none" }),
                h("circle", { class: "spinner-foreground-ring", cx: "30", cy: "30", r: "24", "stroke-linecap": "round", fill: "none" }))) : (''),
            timeoutWarningState ? h("span", { class: "spinner-msg" }, timeoutWarningMsg) : '',
            timeoutErrorState ? h("span", { class: "spinner-msg" }, timeoutErrorMsg) : '')) : null;
    }
    static get is() { return "wf-spinner"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/spinner/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/spinner/main.css"]
    }; }
    static get properties() { return {
        "opened": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Define if spinner is visible"
            },
            "attribute": "opened",
            "reflect": false
        },
        "timeoutWarningMsg": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Message to show warning with long loading time"
            },
            "attribute": "timeout-warning-msg",
            "reflect": false,
            "defaultValue": "timeoutMessages.warning"
        },
        "timeoutErrorMsg": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Message to show error when time expired"
            },
            "attribute": "timeout-error-msg",
            "reflect": false,
            "defaultValue": "timeoutMessages.error"
        },
        "delay": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Delay time (in ms) after which spinner will show"
            },
            "attribute": "delay",
            "reflect": false,
            "defaultValue": "defaultDelay"
        },
        "warningTimeout": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Amount of time (in ms) that spinner will wait until shows timeoutWarningMsg. Set to 0 to disable."
            },
            "attribute": "warning-timeout",
            "reflect": false,
            "defaultValue": "defaultWarningTimeout"
        },
        "errorTimeout": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Amount of time (in ms) that spinner will wait until shows timeoutErrorMsg. Set to 0 to disable."
            },
            "attribute": "error-timeout",
            "reflect": false,
            "defaultValue": "defaultErrorTimeout"
        }
    }; }
    static get states() { return {
        "timeoutWarningState": {},
        "timeoutErrorState": {},
        "visible": {}
    }; }
    static get watchers() { return [{
            "propName": "opened",
            "methodName": "setSpinner"
        }]; }
}
