import { IconType, IconSize } from '../wf-icon/types';
export interface ActionItemDTO {
    menuItemTitle: string;
    menuItemIcon: string;
    menuItemIconSize?: IconSize;
    menuItemIconAlign?: 'left' | 'right';
    actionType: string;
    actionURL: string;
    staticParamsToAdd: string;
    dynamicParamsToAdd: string;
}
export interface GroupItemDTO {
    groupTitle: string;
    groupIcon: string;
    groupIconSize?: IconSize;
    groupIconAlign?: 'left' | 'right';
    items: ActionItemDTO[];
}
export interface ActionMenuItem {
    title: string;
    icon?: string;
    iconType?: IconType;
    iconSize?: IconSize;
    iconAlign?: 'left' | 'right';
    items?: ActionMenuItem[];
    isGroup: boolean;
    originalItem: GroupItemDTO | ActionItemDTO;
}
