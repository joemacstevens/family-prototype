import { EventEmitter } from '../../../stencil.core';
import { TabsType } from '../types';
export declare class WfTabButton {
    /** Denotes the name of the tab slot that will be selected when button is clicked */
    /** This prop needs to be reflected due to a weird behavior of Stencil in Stencil components */
    tab: string;
    /** Controls the visual 'type' of tabs, do not set this property directly since it's propagated from `wf-tabs` */
    type: TabsType;
    /** Decides which tab is selected initially, do not set this property directly since it's propagated from `wf-tabs` */
    selected: boolean;
    /** Controls the 'disabled' state of the button */
    disabled: boolean;
    /** Tab button click event */
    tabButtonClicked: EventEmitter<string>;
    /** Tab button click event */
    docWfTabButtonClicked: EventEmitter<string>;
    handleWfTabSelect(): void;
    render(): any;
}
