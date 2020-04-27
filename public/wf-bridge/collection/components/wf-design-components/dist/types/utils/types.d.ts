import { TooltipPlacement } from '../components/wf-tooltip/types';
export declare type SpaceName = 'top' | 'middle' | 'bottom' | 'left' | 'center' | 'right';
export declare type IconPlacement = 'left' | 'right';
export interface ElementDimensions {
    width: number;
    height: number;
}
export interface ScreenGrid {
    columns: number;
    rows: number;
}
export interface ScreenSpaces {
    vertical: SpaceName;
    horizontal: SpaceName;
}
export interface ElementPlacement {
    top: number;
    left: number;
}
export interface ElementPosition {
    spaces: ScreenSpaces;
    placement: ElementPlacement;
}
export interface FormErrorMessage {
    text?: string;
    tooltip?: string;
    placement?: TooltipPlacement;
}
export interface Presets {
    start?: number;
    end?: number;
}
export declare enum KeyCodes {
    TAB_KEY = 9,
    ENTER_KEY = 13,
    ESC_KEY = 27,
    ARROW_DOWN = 40,
    ARROW_UP = 38
}
export declare enum KeyValue {
    TAB_KEY = "Tab",
    ENTER_KEY = "Enter",
    ESC_KEY = "Escape",
    ARROW_DOWN = "ArrowDown",
    ARROW_UP = "ArrowUp",
    ARROW_RIGHT = "ArrowRight",
    ARROW_LEFT = "ArrowLeft"
}
export declare enum DropdownTriggerType {
    TOGGLE = "toggle",
    OPEN_ONLY = "open_only",
    OPEN_ONLY_WITH_ICON = "open_only_icon"
}
