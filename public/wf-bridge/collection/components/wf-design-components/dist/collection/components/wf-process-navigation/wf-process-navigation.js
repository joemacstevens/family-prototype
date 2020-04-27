var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from "@stencil/core";
import { KeyCodes } from '../../utils/types';
import { PrefixEvent } from '../../utils/custom-event-emitter';
export class WfProcessNavigation {
    constructor() {
        /** Array of process steps */
        this.steps = [];
        /** Navigation type, freeflow allows step clicking */
        this.type = 'guided';
    }
    componentWillLoad() {
        this.renderStep = this.renderStep.bind(this);
        this.handleStepClick = this.handleStepClick.bind(this);
        this.handleStepKeyDown = this.handleStepKeyDown.bind(this);
    }
    handleStepClick(event, step) {
        const { type, click } = this;
        event.stopPropagation();
        if (type !== 'freeflow' || step.disabled)
            return;
        event.target.blur();
        click.emit(step);
    }
    handleStepKeyDown(event, step) {
        const { type, click } = this;
        if (type !== 'freeflow' || event.keyCode !== KeyCodes.ENTER_KEY || step.disabled)
            return;
        click.emit(step);
    }
    renderStep(step) {
        const { handleStepClick, handleStepKeyDown, type } = this;
        const stepClasses = {
            'process-navigation-step': true,
            'process-navigation-step-disabled': step.disabled,
            [`process-navigation-step-${step.status || 'uncompleted'}`]: true,
        };
        return (h("div", { class: stepClasses, onClick: (event) => handleStepClick(event, step), onKeyDown: (event) => handleStepKeyDown(event, step), tabindex: type === 'freeflow' && !step.disabled ? '0' : '-1' },
            step.icon && (h("wf-icon", { class: "process-navigation-step-icon", name: step.icon, size: step.iconSize || 'xs', type: "primary" })),
            h("span", { class: "process-navigation-step-label" }, step.label)));
    }
    render() {
        const { steps, renderStep, type } = this;
        const parsedSteps = Array.isArray(steps) ? steps : JSON.parse(steps);
        const navigationClasses = {
            'process-navigation': true,
            [`process-navigation-${type || 'guided'}`]: true,
        };
        return h("div", { class: navigationClasses }, parsedSteps.map(renderStep));
    }
    static get is() { return "wf-process-navigation"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/process-navigation/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/process-navigation/main.css"]
    }; }
    static get properties() { return {
        "steps": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ProcessNavigationStep[] | string",
                "resolved": "ProcessNavigationStep[] | string",
                "references": {
                    "ProcessNavigationStep": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Array of process steps"
            },
            "attribute": "steps",
            "reflect": false,
            "defaultValue": "[]"
        },
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ProcessNavigationType",
                "resolved": "\"freeflow\" | \"guided\"",
                "references": {
                    "ProcessNavigationType": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Navigation type, freeflow allows step clicking"
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "'guided'"
        }
    }; }
    static get events() { return [{
            "method": "docClick",
            "name": "click",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emmitted when one of the steps is clicked on freeflow process"
            },
            "complexType": {
                "original": "ProcessNavigationStep",
                "resolved": "ProcessNavigationStep",
                "references": {
                    "ProcessNavigationStep": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            }
        }, {
            "method": "docWfClick",
            "name": "wfClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emmitted when one of the steps is clicked on freeflow process"
            },
            "complexType": {
                "original": "ProcessNavigationStep",
                "resolved": "ProcessNavigationStep",
                "references": {
                    "ProcessNavigationStep": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            }
        }]; }
}
__decorate([
    PrefixEvent()
], WfProcessNavigation.prototype, "click", void 0);
