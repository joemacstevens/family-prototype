import Sortable from 'sortablejs/modular/sortable.core.esm.js';
export declare class DragManager {
    dragManager: Sortable;
    dragIcon: any;
    initOrder: any;
    constructor(dragClass: any);
    initContainer(dragArea: any, options?: {}): void;
    resetDraggable(): void;
    unload(): void;
    getCurrentOrder(): any;
}
