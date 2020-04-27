import { IconSize } from '../wf-icon/types';
export declare type ProcessNavigationType = 'guided' | 'freeflow';
export declare type ProcessNavigationStepStatus = 'active' | 'completed' | 'started' | 'uncompleted';
export interface ProcessNavigationStep {
    id: string;
    label: string;
    icon?: string;
    iconSize?: IconSize;
    status?: ProcessNavigationStepStatus;
    disabled?: boolean;
}
