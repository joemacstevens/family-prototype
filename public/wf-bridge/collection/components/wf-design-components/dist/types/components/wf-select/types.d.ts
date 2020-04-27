export declare type SelectType = 'input' | 'button';
export declare type SelectVariant = 'primary' | 'secondary' | 'inverse';
export declare type SelectSize = 'sm' | 'lg';
export interface SelectOption<T> {
    name: string;
    value: T;
    disabled?: boolean | string;
    selected?: boolean | string;
    selectedName?: string;
}
