export interface Range {
    from: Date;
    to: Date;
}
export interface Preset {
    name: PresetNames;
    displayValue: string;
    hidden: boolean;
    presetHandler?: () => Range;
}
export declare type PresetNameType = 'this_month' | 'last_month' | 'quarter_to_date' | 'year_to_date' | 'last_year' | 'custom_range' | 'all_available_activity';
export declare enum PresetNames {
    THIS_MONTH = "this_month",
    LAST_MONTH = "last_month",
    QUARTER_TO_DATE = "quarter_to_date",
    YEAR_TO_DATE = "year_to_date",
    LAST_YEAR = "last_year",
    CUSTOM_RANGE = "custom_range",
    ALL_AVAILABLE_ACTIVITY = "all_available_activity"
}
export declare enum PresetDisplayValue {
    THIS_MONTH = "THIS MONTH",
    LAST_MONTH = "LAST MONTH",
    QUARTER_TO_DATE = "QUARTER TO DATE(QTD)",
    YEAR_TO_DATE = "YEAR TO DATE(YTD)",
    LAST_YEAR = "LAST YEAR",
    CUSTOM_RANGE = "CUSTOM RANGE",
    ALL_AVAILABLE_ACTIVITY = "ALL AVAILABLE ACTIVITY"
}
export declare type CalendarWeekend = true | false | 'only_sat' | 'only_sun';
