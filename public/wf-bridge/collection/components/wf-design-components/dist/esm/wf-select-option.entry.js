import { r as registerInstance } from './core-2ee2b62e.js';

const WfSelectOption = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** Decides if option is disabled */
        this.disabled = false;
        /** Decides if option is selected */
        this.selected = false;
    }
};

export { WfSelectOption as wf_select_option };
