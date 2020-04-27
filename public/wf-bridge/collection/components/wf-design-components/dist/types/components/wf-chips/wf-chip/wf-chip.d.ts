import { EventEmitter } from '../../../stencil.core';
export declare class WfChip {
    host: HTMLElement;
    chipRemove: EventEmitter<any>;
    chipClick: EventEmitter<any>;
    docChipRemove: EventEmitter<any>;
    docWfChipRemove: EventEmitter<any>;
    docChipClick: EventEmitter<any>;
    docWfChipClick: EventEmitter<any>;
    handleChipRemove: (event: any) => void;
    handlelChipClick: () => void;
    removeChip(): Promise<void>;
    render(): any;
}
