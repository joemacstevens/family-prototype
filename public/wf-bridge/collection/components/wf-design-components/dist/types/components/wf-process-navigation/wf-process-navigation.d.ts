import { EventEmitter } from '../../stencil.core';
import { ProcessNavigationStep, ProcessNavigationType } from './types';
export declare class WfProcessNavigation {
    /** Array of process steps */
    steps: ProcessNavigationStep[] | string;
    /** Navigation type, freeflow allows step clicking */
    type: ProcessNavigationType;
    /** Emmitted when one of the steps is clicked on freeflow process */
    click: EventEmitter<ProcessNavigationStep>;
    /** Emmitted when one of the steps is clicked on freeflow process */
    docClick: EventEmitter<ProcessNavigationStep>;
    /** Emmitted when one of the steps is clicked on freeflow process */
    docWfClick: EventEmitter<ProcessNavigationStep>;
    componentWillLoad(): void;
    handleStepClick(event: MouseEvent, step: ProcessNavigationStep): void;
    handleStepKeyDown(event: KeyboardEvent, step: ProcessNavigationStep): void;
    renderStep(step: ProcessNavigationStep): any;
    render(): any;
}
