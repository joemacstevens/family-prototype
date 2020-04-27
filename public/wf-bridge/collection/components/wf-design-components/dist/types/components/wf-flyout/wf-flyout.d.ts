import { EventEmitter } from '../../stencil.core';
import { ScreenSpaces } from '../../utils/types';
import { FlyoutEvent, FlyoutPlacement, FlyoutOpenEvent, FlyoutCloseEvent } from './types';
export declare class WfFlyout {
    host: HTMLElement;
    /** Current depth level */
    level: number;
    /**  Define if flyout should have visual pointer to trigger element */
    noArrow: boolean;
    /** Configure child level flyout menu overlap */
    overlap: number;
    /** Define if flyout content is open or close */
    opened: boolean;
    /** Focusable element attribute. Should be added to design component that content should be focusable. */
    focusAttribute: string;
    /** Tab index assigned to the trigger element */
    triggerTabIndex: string;
    /** DEPRECATED! Define if flyout should have visual pointer to trigger element */
    arrowPointer: boolean;
    /** Trigger event */
    trigger: FlyoutEvent;
    enableOpenChangedEvent: boolean;
    /** Placement of flyout, if not defined it will be auto-calculated */
    placement: FlyoutPlacement;
    /** Whether it should be moved directly to the body */
    detached: boolean;
    /** Flyout content position */
    contentPositionStyles: any;
    /** Flyout if trigger is in view port */
    visible: boolean;
    /** @internal */
    flyoutOpenChanged: EventEmitter<any>;
    /** Flyout open event */
    open: EventEmitter<FlyoutOpenEvent>;
    /** Flyout close event */
    close: EventEmitter<FlyoutCloseEvent>;
    docOpen: EventEmitter<FlyoutOpenEvent>;
    docWfOpen: EventEmitter<FlyoutOpenEvent>;
    docClose: EventEmitter<FlyoutCloseEvent>;
    docWfClose: EventEmitter<FlyoutCloseEvent>;
    /** Trigger position on Screen spaces */
    private spaces;
    private triggerEl;
    private flyoutElement;
    private focusableElementsSelector;
    private readonly screenGrid;
    private readonly triggerSelector;
    private focusableElements;
    private focusFirstChild;
    private slotElement;
    componentWillLoad(): void;
    emitOpenChanged(): void;
    searchFocusableInComponent(focusableElement: any, selector: any): any;
    queryShadowRoot(element: any, selector: any): any;
    getAllFocusableItems(): any[];
    setFocusToChild(): void;
    closeFlyout(reason: FlyoutCloseEvent, notFocus?: boolean): void;
    openFlyout(reason: FlyoutOpenEvent): void;
    handleClick: (event: MouseEvent | KeyboardEvent) => void;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    focusPrevItem(currentItemIndex: any): void;
    focusNextItem(currentItemIndex: any): void;
    searchForFocusableItem(target: any): any;
    keyPressCases: (event: any, triggerTarget: HTMLElement, currentItemIndex: number) => any;
    handleKeyPress(event: any): void;
    clickOutside(event: Event): void;
    applyStyles(arrow: HTMLElement, { top, right, bottom, left }: {
        top: any;
        right: any;
        bottom: any;
        left: any;
    }): void;
    calculateArrowPointer(spaces: ScreenSpaces): void;
    spacesValidity: (params: ScreenSpaces) => {
        vertical: import("../../utils/types").SpaceName;
        horizontal: import("../../utils/types").SpaceName;
    };
    updateSpaces(placement: FlyoutPlacement): ScreenSpaces;
    private updatePosition;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    setupTriggerElement(): void;
    detachHost(): void;
    addEventListeners(): void;
    addIntersectionObserver(): void;
    componentDidUnload(): void;
    render(): any;
}
