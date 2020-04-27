'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-4cbc2ed1.js');

const WfSelectOption = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        /** Decides if option is disabled */
        this.disabled = false;
        /** Decides if option is selected */
        this.selected = false;
    }
};

exports.wf_select_option = WfSelectOption;
