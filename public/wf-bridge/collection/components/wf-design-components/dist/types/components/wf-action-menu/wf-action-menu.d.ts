import { EventEmitter } from '../../stencil.core';
import { ActionMenuItem, GroupItemDTO, ActionItemDTO } from './types';
import { FlyoutEvent, FlyoutPlacement } from '../wf-flyout/types';
export declare class WfActionMenu {
    host: HTMLElement;
    /** Define if action menu is opened or closed */
    opened: boolean;
    /** Strucutre of menu items */
    items: GroupItemDTO[] | string;
    /** Limit of items to show in primary dropdown */
    itemsLimit: number;
    /** Label of extra items button */
    extraItemsLabel: string;
    /** Configure the arrow pointer for the child level menu flyout */
    noArrow: boolean;
    /** Configure child level flyout menu overlap */
    overlap: number;
    /** Trigger event */
    trigger: FlyoutEvent;
    /** Child menu trigger event */
    childTrigger: FlyoutEvent;
    /** Placement of action menu, if not defined it will be auto-calculated */
    placement: FlyoutPlacement;
    /** Placement of sub menus, if not defined it will be auto-calculated */
    subPlacement: 'left' | 'right';
    /** Select event */
    select: EventEmitter<any>;
    /** Select event */
    docSelect: EventEmitter<any>;
    /** Select event */
    docWfSelect: EventEmitter<any>;
    parsedItems: GroupItemDTO[];
    mappedItems: ActionMenuItem[];
    componentWillLoad(): void;
    handleOpenChanged(event: CustomEvent): void;
    handleNewItems(): void;
    mapActionItem(item: ActionItemDTO): ActionMenuItem;
    handleItemClick(item: ActionMenuItem): void;
    renderItem(item: ActionMenuItem, enableClickEvent?: boolean): any;
    renderGroup(item: ActionMenuItem): any;
    renderGroupOrItem(item: ActionMenuItem): any;
    render(): any;
}
