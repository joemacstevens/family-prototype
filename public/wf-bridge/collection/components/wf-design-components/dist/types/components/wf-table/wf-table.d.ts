import { IServerSideDatasource, CellClickedEvent, RowSelectedEvent, SelectionChangedEvent, SortChangedEvent, RowClickedEvent, FilterChangedEvent, ColumnMovedEvent, GridOptions, PaginationChangedEvent } from 'ag-grid-community';
import { EventEmitter } from '../../stencil.core';
import { Alignment, CustomRangeSelectionChangedEvent, GridLayoutType, HeadersDisplay, StatusBarType, TableColumns, TableIcons, RowDataType, StyleType } from './types';
import { MultiselectDropdownResult } from '../wf-multiselect-dropdown/types';
import { AmountFilterOutput } from '../wf-amount-filter/types';
export declare class WfTable {
    /** Prepared table configuration */
    parsedConfiguration: GridOptions;
    /** Table columns definition array */
    columns: TableColumns[] | string;
    /** Client side data */
    data?: RowDataType;
    /** Server side data datasource object */
    datasource?: IServerSideDatasource | string;
    /** Table width (px, percent) */
    width?: string;
    /** Table height (px, auto) */
    height?: string;
    /** Define table layout */
    domLayout?: GridLayoutType;
    /** Define column headers text overflow. Can be displayed with ellipsis or visible in few lines */
    headersDisplay?: HeadersDisplay;
    /** Define basic table style */
    styleType?: StyleType;
    /** Define if table data are sortable */
    sortable?: boolean;
    /** Define if columns are resizable */
    resizable?: boolean;
    /** Define if data filter is enable */
    filter?: boolean;
    /**Define header menu icon */
    icons: TableIcons[];
    /** Define row height */
    rowHeight?: number;
    /** Define header row height */
    headerHeight?: number;
    /** Define is table pagination is visible */
    pagination?: boolean;
    /** Define number of rows to display with pagination option */
    paginationPageSize?: number;
    /** Define if data actions (such as sorting) should be animated */
    animateRows?: boolean;
    /** Define if status bar should be visible */
    statusBar?: boolean;
    /** Define type of data that are shown on status bar */
    statusPanel?: StatusBarType;
    /** Define alignment of status bar */
    statusPanelAlign?: Alignment;
    /** Define if groups should be expanded on load */
    expanded?: boolean;
    /** Define if columns width should be auto resize after load, to fit cells content. This option will ignore width declaration in columns definition. Can not work with sizeColumnsToFitFlag.*/
    autoSizeColumnsFlag?: boolean;
    /** Define if columns width should be auto resize after load, to fit table width. This option will ignore width declaration in columns definition and prevent table horizontal scroll. Can not work with autoSizeColumnsFlag*/
    sizeColumnsToFitFlag?: boolean;
    /** Define if cells range selection is enabled */
    enableRangeSelection?: boolean;
    /** Define custom configuration of the table */
    configuration?: GridOptions | string;
    /** Table cell clicked */
    cellClick: EventEmitter<CellClickedEvent>;
    /** Table row selected */
    rowSelect: EventEmitter<RowSelectedEvent>;
    /** Table row clicked */
    rowClicked: EventEmitter<RowClickedEvent>;
    /** Table selection changed */
    selectionChanged: EventEmitter<SelectionChangedEvent>;
    /** Table range selection changed */
    rangeSelectionChanged: EventEmitter<CustomRangeSelectionChangedEvent>;
    /** Table sort changed */
    sortChanged: EventEmitter<SortChangedEvent>;
    /** Table filter changed */
    filterChanged: EventEmitter<FilterChangedEvent>;
    /** Table column moved */
    columnMoved: EventEmitter<ColumnMovedEvent>;
    /** Table pagination change */
    paginationChanged: EventEmitter<PaginationChangedEvent>;
    /** Table cell clicked */
    docCellClick: EventEmitter<CellClickedEvent>;
    docWfCellClick: EventEmitter<CellClickedEvent>;
    /** Table row selected */
    docRowSelect: EventEmitter<RowSelectedEvent>;
    docWfRowSelect: EventEmitter<RowSelectedEvent>;
    /** Table row clicked */
    docRowClicked: EventEmitter<RowClickedEvent>;
    docWfRowClicked: EventEmitter<RowClickedEvent>;
    /** Table selection changed */
    docSelectionChanged: EventEmitter<SelectionChangedEvent>;
    docWfSelectionChanged: EventEmitter<SelectionChangedEvent>;
    /** Table range selection changed */
    docRangeSelectionChanged: EventEmitter<CustomRangeSelectionChangedEvent>;
    docWfRangeSelectionChanged: EventEmitter<CustomRangeSelectionChangedEvent>;
    /** Table sort changed */
    docSortChanged: EventEmitter<SortChangedEvent>;
    docWfSortChanged: EventEmitter<SortChangedEvent>;
    /** Table filter changed */
    docFilterChanged: EventEmitter<FilterChangedEvent>;
    docWfFilterChanged: EventEmitter<FilterChangedEvent>;
    /** Table column moved */
    docColumnMoved: EventEmitter<ColumnMovedEvent>;
    docWfColumnMoved: EventEmitter<ColumnMovedEvent>;
    /** Table pagination change */
    docPaginationChanged: EventEmitter<PaginationChangedEvent>;
    docWfPaginationChanged: EventEmitter<PaginationChangedEvent>;
    private gridOptions;
    private wrapper?;
    private dataFromConfiguration;
    updateData(newData: RowDataType): void;
    updateConfiguration(newConf: GridOptions | string): void;
    setNewColumnDefiniton(columns: TableColumns[] | string): void;
    /** Table exports data to an excel file by the method */
    exportToExcel(): Promise<void>;
    setColumnDataFilter(filteredResult: MultiselectDropdownResult): Promise<void>;
    setNumberRangeDataFilter(filteredResult: AmountFilterOutput): Promise<void>;
    setExpanded(nodeKey: any): Promise<void>;
    handleCellClick: (event: any) => void;
    handleRowClicked: (event: any) => void;
    handleRowSelect: (event: any) => void;
    handleSelectionChanged: () => void;
    handleRangeSelectionChanged: (event: any) => void;
    handleSortChanged: (event: any) => void;
    handleFilterChanged: (event: any) => void;
    handleColumnMoved: (event: any) => void;
    handleIeRenderingChange: () => void;
    handlePaginationChange: (event: any) => void;
    renderStyleForIE: () => void;
    fitColumnsSizes(): void;
    autoSizeColumns(): void;
    sizeColumnsToFit(): void;
    private renderTable;
    trySetupClientSideData(data: RowDataType): void;
    trySetupServerSideData(): void;
    parseConfiguration(configuration: GridOptions | string): void;
    getGridOptions(): GridOptions;
    componentWillLoad(): void;
    componentDidLoad(): void;
    render(): any;
}
