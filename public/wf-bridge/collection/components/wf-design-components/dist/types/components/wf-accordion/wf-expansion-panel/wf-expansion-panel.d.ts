import { EventEmitter } from '../../../stencil.core';
import { ExpansionPanelEventData } from '../types';
export declare class WfExpansionPanel {
    /** State of panel */
    expanded: boolean;
    /** Unique Id of panel */
    panelId: string;
    /** Show title on open style*/
    pinnedTitle: boolean;
    /** Collapse event */
    expand: EventEmitter<ExpansionPanelEventData>;
    /** Collapse event */
    docExpand: EventEmitter<ExpansionPanelEventData>;
    /** Collapse event */
    docWfExpand: EventEmitter<ExpansionPanelEventData>;
    onTogglePanel: () => void;
    render(): any;
}
