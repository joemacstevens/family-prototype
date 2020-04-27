import { EventEmitter } from '../../stencil.core';
import { DropdownVerticalState } from './types';
export declare class WfDropdown {
    host: HTMLElement;
    opened: boolean;
    /** Define if closing on scroll active **/
    scrollSensitive: boolean;
    /** Define for special case parent selector **/
    parentSelector: string;
    /** Define if dropdown available to open **/
    disabled: boolean;
    /** Define if dropdown aling with parent **/
    alignWithParent: boolean;
    /** Define should we adjust height **/
    adjustHeight: boolean;
    toggle: EventEmitter<boolean>;
    /** Toggle event */
    docToggle: EventEmitter<boolean>;
    /** Toggle event */
    docWfToggle: EventEmitter<boolean>;
    dropdownParent: HTMLElement;
    dropdownTriggers: NodeListOf<Element>;
    dropdown: HTMLElement;
    manualMaxWidth: boolean;
    manualWidth: boolean;
    componentDidLoad(): void;
    componentDidRender(): void;
    componentDidUnload(): void;
    handleOpenedChange(): void;
    onGlobalScroll(): void;
    closeSelect(): void;
    handleKeydown(ev: KeyboardEvent): void;
    clickOutside(event: Event): void;
    toggleDropdown: (ev: Event) => void;
    toggleTrigger: (ev: any) => void;
    checkPlacement: () => void;
    calculateVerticalValue(dropdown: any, rect: any, parentRect: any, windowHeight: any): number;
    calculateHorizontalPosition(dropdown: any, windowWidth: any, rect: any): number;
    getVerticalState(windowHeight: any, rect: any, parentRect: any): DropdownVerticalState;
    emitEvent(): void;
    render(): any;
}
