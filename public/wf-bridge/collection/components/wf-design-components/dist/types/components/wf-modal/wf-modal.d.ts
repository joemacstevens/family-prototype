import { EventEmitter } from '../../stencil.core';
import { ButtonSize } from '../wf-button/types';
export declare class WfModal {
    /** Controls the 'opened' state of the modal */
    opened: boolean;
    /** Header text */
    header: string;
    /** Emitted when modal is closed by the user */
    modalClose: EventEmitter;
    /** Emitted when modal is closed by the user */
    docClose: EventEmitter;
    /** Emitted when modal is closed by the user */
    docWfClose: EventEmitter;
    /** Size of action buttons */
    buttonSize: ButtonSize;
    modalDialog: HTMLElement;
    handleCloseRequest(event: any): void;
    handleGlobalScroll(opened: any): void;
    close(): void;
    renderHeader(): any;
    render(): any;
}
