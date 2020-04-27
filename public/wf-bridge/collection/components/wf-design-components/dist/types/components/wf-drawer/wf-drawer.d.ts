import { EventEmitter } from '../../stencil.core';
import { DrawerWidth, DrawerPosition } from './types';
import { ActionIconSize } from '../wf-action-icon/types';
export declare class WfDrawer {
    host: HTMLElement;
    /** Controls the 'width' of drawer dialog. Can be standard (default), slim or wide*/
    width: DrawerWidth;
    /** Simple drawer title */
    header: string;
    /** Position of drawer */
    position: DrawerPosition;
    /** Preset drawer */
    preset: string;
    /** Backdrop drawer */
    hideBackdrop: boolean;
    /** Controls the 'opened' state of the drawer */
    opened: boolean;
    /** Closing action icon name */
    closeIcon: string;
    /** Control back button */
    backButton: boolean;
    /** Back action icon name */
    backIcon: string;
    /** The size of the close and back icon */
    iconSize: ActionIconSize;
    /** Control should drawer squeeze page */
    squeezePage: boolean;
    /** Min witdth of page where squeeze is available */
    thresholdBreakpoint: number;
    /** Animation duration */
    animationDuration: number;
    /** Internal event emitted when user click on Close button */
    drawerClose: EventEmitter;
    /** Event emitted on click on back buttom */
    back: EventEmitter;
    docClose: EventEmitter;
    docWfClose: EventEmitter;
    docBack: EventEmitter;
    docWfBack: EventEmitter;
    drawerDialog: HTMLDivElement;
    isSqueezed: boolean;
    handleGlobalScroll(opened: any): void;
    close(): Promise<void>;
    isPreset(preset: string): boolean;
    isSqueeze: () => boolean;
    checkPreset(): void;
    isVertical(position: DrawerPosition): boolean;
    setStylesByPreset(host: HTMLElement): void;
    onBackClick: () => void;
    componentDidRender(): void;
    componentDidUpdate(): void;
    render(): any;
}
