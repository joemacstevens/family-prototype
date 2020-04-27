import { EventEmitter } from '../../stencil.core';
import { TooltipPlacement, TooltipType, TooltipEvent, TooltipWidth } from './types';
import { ScreenSpaces } from '../../utils/types';
import { AnimationFrameRunner } from '../../utils/create-animation-frame-runner';
export declare class WfTooltip {
    host: HTMLElement;
    triggerEl: HTMLElement;
    tooltipEl: HTMLElement;
    distance: number;
    animationFrameRunner: AnimationFrameRunner;
    readonly closeTimeout: import("../../utils/create-timeout").TimeoutInstance;
    /** Trigger position on Screen spaces */
    spaces: ScreenSpaces;
    /** The title of the tooltip */
    header: string;
    /** The text of the tooltip */
    text: string;
    /** Placement of tooltip, if not defined it will be auto-calculated */
    placement: TooltipPlacement;
    /** Type of tooltip */
    type: TooltipType;
    /** Trigger event */
    trigger: TooltipEvent;
    /** Tooltip visibility period */
    timeout: number;
    /** Controls the 'visible' state of the tooltip */
    opened: boolean;
    /** Controls the 'width' of drawer dialog. Can be standard (default), slim or wide */
    width: TooltipWidth;
    /** Whether it should be moved directly to the body */
    detached: boolean;
    /** Emitted when tooltip is closed */
    close: EventEmitter;
    /** Emitted when tooltip is closed */
    docClose: EventEmitter;
    /** Emitted when tooltip is closed */
    docWfClose: EventEmitter;
    openHandle(newValue: boolean, oldValue: boolean): void;
    toggleTooltip(opened: boolean): void;
    toggleTriggerActiveClass(toggle: any): void;
    show(): void;
    hide(): void;
    setupTimeout(timeout: any): void;
    clickOutside(event: Event): void;
    placementHandle(newValue: TooltipPlacement, oldValue: TooltipPlacement): void;
    updateSpaces(placement: TooltipPlacement): void;
    componentWillLoad(): void;
    updatePosition: () => void;
    getDefaultSpaces(): ScreenSpaces;
    tryAdjustSpaces(newSpaces: ScreenSpaces): void;
    componentDidLoad(): void;
    setupTriggerElement(): void;
    getElementsFromSlot(): Element[];
    detachHost(): void;
    handleEvent(event: string, opened: boolean): void;
    mouseEnterListener: () => void;
    mouseLeaveListener: () => void;
    clickListener: () => void;
    addEventListeners(): void;
    addIntersectionObserver(): void;
    componentDidUnload(): void;
    render(): any;
}
