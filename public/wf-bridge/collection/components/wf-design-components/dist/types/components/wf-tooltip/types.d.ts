import { ScreenSpaces } from '../../utils/types';
export declare type TooltipType = 'default' | 'info' | 'warning' | 'error' | 'feedback';
export declare type TooltipPlacement = 'top' | 'left' | 'bottom' | 'right';
export declare type TooltipEvent = 'click' | 'hover' | 'none';
export declare type TooltipWidth = 'standard' | 'wide';
export interface TooltipDetails {
    distance: number;
    triggerLeft: number;
    triggerTop: number;
    triggerWidth: number;
    triggerHeight: number;
    tooltipWidth: number;
    tooltipHeight: number;
    windowWidth: number;
    windowHeight: number;
}
export interface TooltipCoordinatePositions {
    top: number;
    left: number;
}
export interface PlacementsMap {
    top: ScreenSpaces;
    bottom: ScreenSpaces;
    left: ScreenSpaces;
    right: ScreenSpaces;
}
export interface CheckedSpaceResult {
    placement: TooltipPlacement;
    spaceAround: SpaceAround;
}
export interface SpaceAround {
    spaceTop: boolean;
    spaceRight: boolean;
    spaceBottom: boolean;
    spaceLeft: boolean;
}
export interface TooltipPosition extends ScreenSpaces {
    placement: TooltipCoordinatePositions;
}
