import { EventEmitter } from '../../stencil.core';
import { TabsType } from './types';
export declare class WfTabs {
    host: HTMLElement;
    /** Emmitted when one of the tabs is selected by user interaction */
    tabSelect: EventEmitter<string>;
    /** Emmitted when one of the tabs is selected by user interaction */
    docTabSelect: EventEmitter<any>;
    /** Emmitted when one of the tabs is selected by user interaction */
    docWfTabSelect: EventEmitter<any>;
    /** Decides which tab is selected initially */
    selected: string;
    /** Controls the visual 'type' of tabs */
    type: TabsType;
    currentTab: string;
    private tabButtons;
    componentDidLoad(): void;
    handleProgrammaticSelection(newSelection: string): void;
    handleTabButtonClick(event: CustomEvent): void;
    markButtonSelected(tabName: string): void;
    render(): any;
}
