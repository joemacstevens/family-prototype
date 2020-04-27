export declare enum AmountFilterType {
    EQUAL = "equals",
    GREATER = "greaterThan",
    LESS = "lessThan"
}
export declare type AmountFilterRange = 'equals' | 'greaterThan' | 'lessThan';
export interface AmountFilterOutput {
    field: string;
    value: number | string;
    filterType: AmountFilterRange;
}
