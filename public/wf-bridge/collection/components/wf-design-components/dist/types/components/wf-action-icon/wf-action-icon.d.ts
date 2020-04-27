import { EventEmitter } from '../../stencil.core';
import { ActionIconSize, ActionIconVariant } from './types';
export declare class WfActionIcon {
    /** The name of the icon */
    name: string;
    /** The size of the icon */
    size: ActionIconSize;
    /** Decide if icon can change the size */
    scalable: boolean;
    /** The variant of the icon */
    variant: ActionIconVariant;
    /** Defines if icon has bounding circle */
    bounding: boolean;
    /** Defines if icon has property open */
    open: boolean;
    /** Click event */
    /** @internal */
    wfClick: EventEmitter<any>;
    /** Click event */
    docClick: EventEmitter<any>;
    /** Click event */
    docWfClick: EventEmitter<any>;
    svgContent: string;
    componentWillRender(): Promise<void>;
    handleClick: () => void;
    render(): any;
}
