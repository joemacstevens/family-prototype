import { ICellRendererParams, RangeSelectionChangedEvent, CellRange, ColDef } from 'ag-grid-community';
import { IconSize } from '../wf-icon/types';
export declare type Alignment = 'left' | 'right' | 'center';
export declare type HeadersDisplay = 'ellipsis' | 'break';
export declare type StyleType = 'striped' | 'lines';
export declare type GridLayoutType = 'normal' | 'autoHeight' | 'print';
export declare type RowDataType = string | any[];
export interface ExtraCellRendererParams {
    align?: Alignment;
    withoutArrow?: boolean;
    currencySymbol?: string;
    suffixSymbol?: string;
}
export interface CustomCellRendererParams extends ICellRendererParams, ExtraCellRendererParams {
}
export interface CustomRangeSelectionChangedEvent extends RangeSelectionChangedEvent {
    selectedCells: CellRange[];
}
export declare type StatusBarType = 'agTotalRowCountComponent' | 'agTotalAndFilteredRowCountComponent' | 'agFilteredRowCountComponent' | 'agSelectedRowCountComponent' | 'agAggregationComponent';
export interface TableColumns extends ColDef {
    headerName: string;
    field: string;
    cellRendererParams?: ExtraCellRendererParams;
}
export interface TableIcons {
    iconType: TableIconTypes;
    iconSize?: IconSize;
    iconName: string;
}
export declare type TableIconTypes = 'menu' | 'filter' | 'columns' | 'sortAscending' | 'sortDescending' | 'sortUnSort' | 'groupExpanded' | 'groupContracted' | 'columnGroupOpened' | 'columnGroupClosed' | 'columnSelectOpen' | 'columnSelectClosed' | 'checkboxChecked' | 'checkboxUnchecked' | 'checkboxIndeterminate' | 'checkboxCheckedReadOnly' | 'checkboxUncheckedReadOnly' | 'checkboxIndeterminateReadOnly' | 'columnMovePin' | 'columnMoveAdd' | 'columnMoveHide' | 'columnMoveMove' | 'columnMoveLeft' | 'columnMoveRight' | 'columnMoveGroup' | 'columnMoveValue' | 'columnMovePivot' | 'dropNotAllowed' | 'menuPin' | 'menuValue' | 'menuAddRowGroup' | 'menuRemoveRowGroup' | 'clipboardCopy' | 'clipboardPaste' | 'rowGroupPanel' | 'pivotPanel' | 'valuePanel';
export declare const CLIENT_SIDE_ROW_MODEL = "clientSide";
export declare const SERVER_SIDE_ROW_MODEL = "serverSide";
