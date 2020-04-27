'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-4cbc2ed1.js');

const WfRadioOption = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        /** Decides if option is disabled */
        this.disabled = false;
        /** Decides if option is initially selected */
        this.checked = false;
    }
};

exports.wf_radio_option = WfRadioOption;
