import { EventEmitter } from '../../stencil.core';
import { TableColumns } from '../wf-table/types';
import { DragManager } from '../../utils/drag-manager';
import { IconSize } from '../wf-icon/types';
export declare class WfReorder {
    /** Table columns definition array */
    columns: TableColumns[] | string;
    /**  Array of data */
    data: any[] | string;
    /** Dragging icon name */
    icon: string;
    /** Dragging icon size */
    iconSize: IconSize;
    parsedColumnData: TableColumns[];
    parsedData: any[];
    /** Event fired on the drop */
    change: EventEmitter;
    /** Event fired on the drop */
    docWfChange: EventEmitter;
    dragManager: DragManager;
    dragArea: HTMLElement;
    componentWillLoad(): void;
    componentDidRender(): void;
    componentDidUnload(): void;
    updateData(data: any): void;
    updateColumnData(columns: any): void;
    resetToDefault(): Promise<void>;
    getOrder(): Promise<any>;
    render(): any;
}
