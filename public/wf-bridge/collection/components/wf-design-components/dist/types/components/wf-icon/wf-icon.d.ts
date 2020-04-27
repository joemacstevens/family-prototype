import { IconSize, IconType } from './types';
export declare class WfIcon {
    /** The name of the icon */
    name: string;
    /** The size of the icon */
    size: IconSize;
    /** Decide if icon can change the size */
    scalable: boolean;
    /** DEPRECATED! The type of the icon */
    type: IconType;
    svgContent: string | null;
    componentWillRender(): Promise<void>;
    render(): any;
}
