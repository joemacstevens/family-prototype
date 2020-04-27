import { SpaceName, ScreenSpaces, ElementPlacement, ScreenGrid } from './types';
export declare function checkElementPosition(trigger: HTMLElement, element: HTMLElement, grid: ScreenGrid, distance: number, defaultSpaces?: ScreenSpaces): {
    spaces: ScreenSpaces;
    placement: ElementPlacement;
};
export declare function checkChildElementPosition(trigger: HTMLElement, flyout: HTMLElement, overlap: number, defaultSpaces?: ScreenSpaces): {
    spaces: {
        vertical: SpaceName;
        horizontal: SpaceName;
    };
    placement: {
        top: number;
        left: number;
    };
};
export declare function checkParentElementPosition(trigger: HTMLElement, element: HTMLElement, grid: ScreenGrid, defaultSpaces?: ScreenSpaces): {
    spaces: ScreenSpaces;
    placement: ElementPlacement;
};
export declare function calucaleTriggerMiddle(triggerSize: number, arrowSize: number, minDistance: number): string;
export declare function arrowCoordinate(key: string, triggerEl: HTMLElement, arrowSize: number): any;
