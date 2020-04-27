var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import agGrid from 'ag-grid-enterprise/dist/ag-grid-enterprise';
import { h } from "@stencil/core";
import { CLIENT_SIDE_ROW_MODEL, SERVER_SIDE_ROW_MODEL, } from './types';
import * as renderers from './renderers';
import { detectIE } from '../../utils/utils';
import debounce from 'lodash.debounce';
import { getLicenseKey } from './license';
import { PrefixEvent } from '../../utils/custom-event-emitter';
export class WfTable {
    constructor() {
        /** Table width (px, percent) */
        this.width = '100%';
        /** Table height (px, auto) */
        this.height = 'auto';
        /** Define table layout */
        this.domLayout = 'autoHeight';
        /** Define column headers text overflow. Can be displayed with ellipsis or visible in few lines */
        this.headersDisplay = 'ellipsis';
        /** Define basic table style */
        this.styleType = 'lines';
        /** Define if table data are sortable */
        this.sortable = true;
        /** Define if columns are resizable */
        this.resizable = true;
        /** Define if data filter is enable */
        this.filter = true;
        /** Define row height */
        this.rowHeight = 50;
        /** Define header row height */
        this.headerHeight = 50;
        /** Define is table pagination is visible */
        this.pagination = false;
        /** Define number of rows to display with pagination option */
        this.paginationPageSize = 50;
        /** Define if data actions (such as sorting) should be animated */
        this.animateRows = false;
        /** Define if status bar should be visible */
        this.statusBar = false;
        /** Define type of data that are shown on status bar */
        this.statusPanel = 'agTotalRowCountComponent';
        /** Define alignment of status bar */
        this.statusPanelAlign = 'right';
        /** Define if groups should be expanded on load */
        this.expanded = false;
        /** Define if columns width should be auto resize after load, to fit cells content. This option will ignore width declaration in columns definition. Can not work with sizeColumnsToFitFlag.*/
        this.autoSizeColumnsFlag = false;
        /** Define if columns width should be auto resize after load, to fit table width. This option will ignore width declaration in columns definition and prevent table horizontal scroll. Can not work with autoSizeColumnsFlag*/
        this.sizeColumnsToFitFlag = false;
        /** Define if cells range selection is enabled */
        this.enableRangeSelection = true;
        this.handleCellClick = (event) => {
            this.cellClick.emit(event.value);
        };
        this.handleRowClicked = (event) => {
            if (event.data) {
                this.rowClicked.emit(event.node);
            }
        };
        this.handleRowSelect = (event) => {
            if (event.data) {
                this.rowSelect.emit(event.node);
            }
        };
        this.handleSelectionChanged = () => {
            this.selectionChanged.emit();
        };
        this.handleRangeSelectionChanged = (event) => {
            this.rangeSelectionChanged.emit(Object.assign(Object.assign({}, event), { selectedCells: event.api.getCellRanges() }));
        };
        this.handleSortChanged = (event) => {
            this.sortChanged.emit(event);
        };
        this.handleFilterChanged = (event) => {
            this.filterChanged.emit(event);
        };
        this.handleColumnMoved = (event) => {
            this.columnMoved.emit(event);
        };
        this.handleIeRenderingChange = () => {
            if (detectIE())
                this.renderStyleForIE();
        };
        this.handlePaginationChange = (event) => {
            this.paginationChanged.emit(event);
            debounce(this.handleIeRenderingChange);
        };
        //Trick for applying styles on IE EDGE
        this.renderStyleForIE = () => {
            const table = document.querySelector('wf-table');
            const className = table.classList[0].replace('-h', '');
            const elements = table.shadowRoot.querySelectorAll('*');
            for (let i = 0; i < elements.length; i++) {
                if (!elements[i].classList.contains(className))
                    elements[i].className += ` ${className}`;
            }
        };
    }
    updateData(newData) {
        if (!this.dataFromConfiguration) {
            this.trySetupClientSideData(newData);
        }
    }
    updateConfiguration(newConf) {
        this.parseConfiguration(newConf);
        if (!!this.parsedConfiguration.rowData) {
            this.trySetupClientSideData(this.parsedConfiguration.rowData);
        }
        if (!!this.parsedConfiguration.columnDefs) {
            this.setNewColumnDefiniton(this.parsedConfiguration.columnDefs);
        }
    }
    setNewColumnDefiniton(columns) {
        const { gridOptions } = this;
        const newColumns = typeof columns === 'string' ? JSON.parse(columns) : columns;
        gridOptions.api.setColumnDefs(newColumns);
        gridOptions.columnApi.resetColumnState();
    }
    /** Table exports data to an excel file by the method */
    async exportToExcel() {
        this.gridOptions.api.exportDataAsExcel();
    }
    async setColumnDataFilter(filteredResult) {
        if (!filteredResult.field)
            return;
        const instance = this.gridOptions.api.getFilterInstance(filteredResult.field);
        if (!instance)
            return;
        instance.setModel({
            type: 'set',
            values: filteredResult.values.map((value) => value.toString()),
        });
        this.gridOptions.api.onFilterChanged();
    }
    async setNumberRangeDataFilter(filteredResult) {
        if (!filteredResult.field)
            return;
        const instance = this.gridOptions.api.getFilterInstance(filteredResult.field);
        if (!instance || (!filteredResult.value && filteredResult.value !== 0))
            return;
        instance.setModel({
            filterType: 'number',
            type: filteredResult.filterType,
            filter: filteredResult.value.toString(),
        });
        this.gridOptions.api.onFilterChanged();
    }
    async setExpanded(nodeKey) {
        this.gridOptions.api.forEachNode((node) => {
            if (node.key === nodeKey) {
                node.setExpanded(true);
            }
        });
    }
    fitColumnsSizes() {
        if (!!this.autoSizeColumnsFlag) {
            this.autoSizeColumns();
        }
        else if (!!this.sizeColumnsToFitFlag) {
            this.sizeColumnsToFit();
        }
    }
    autoSizeColumns() {
        const allColumnIds = [];
        this.gridOptions.columnApi.getAllColumns().forEach((column) => {
            allColumnIds.push(column.getId());
        });
        this.gridOptions.columnApi.autoSizeColumns(allColumnIds);
    }
    sizeColumnsToFit() {
        this.gridOptions.api.sizeColumnsToFit();
    }
    renderTable() {
        const { data, datasource, height, columns, sortable, resizable, filter, animateRows, enableRangeSelection, rowHeight, domLayout, headerHeight, statusBar, statusPanel, statusPanelAlign, expanded, pagination, paginationPageSize, icons, parsedConfiguration, dataFromConfiguration, } = this;
        const rowModelType = !datasource ? CLIENT_SIDE_ROW_MODEL : SERVER_SIDE_ROW_MODEL;
        const rowData = dataFromConfiguration ? parsedConfiguration.rowData : data;
        // do not change events order
        const eventsDefinition = {
            onColumnMoved: this.handleColumnMoved,
            onFilterChanged: this.handleFilterChanged,
            onSortChanged: this.handleSortChanged,
            onSelectionChanged: this.handleSelectionChanged,
            onRowClicked: this.handleRowClicked,
            onCellClicked: this.handleCellClick,
            onRowSelected: this.handleRowSelect,
            onRangeSelectionChanged: this.handleRangeSelectionChanged,
            onPaginationChanged: this.handlePaginationChange,
            onModelUpdated: debounce(this.handleIeRenderingChange),
            onViewportChanged: debounce(this.handleIeRenderingChange),
            onCellContextMenu: debounce(this.handleIeRenderingChange),
        };
        const renderersDefinition = {
            renderIntoTwoLines: renderers.renderIntoTwoLines,
            renderBoldText: renderers.renderBoldText,
            renderFormattedNumber: renderers.renderFormattedNumber,
            renderPositiveNegativeColors: renderers.renderPositiveNegativeColors,
            renderCurrency: renderers.renderCurrency,
            renderNumberWithSymbol: renderers.renderNumberWithSymbol,
        };
        this.gridOptions = Object.assign(Object.assign(Object.assign({ rowModelType, defaultColDef: {
                sortable,
                filter,
                resizable,
            }, columnDefs: typeof columns === 'string' ? JSON.parse(columns) : columns, animateRows,
            pagination,
            paginationPageSize,
            enableRangeSelection, rowData: null, rowHeight, rowSelection: 'multiple', groupSelectsChildren: true, suppressAggFuncInHeader: true, domLayout: height === 'auto' ? domLayout : 'normal', headerHeight }, eventsDefinition), { components: Object.assign({}, renderersDefinition), statusBar: !!statusBar
                ? {
                    statusPanels: [{ statusPanel, align: statusPanelAlign }],
                }
                : null, groupDefaultExpanded: !!expanded ? -1 : 0, onGridSizeChanged: () => {
                this.fitColumnsSizes();
            }, suppressRowTransform: true }), parsedConfiguration);
        if (icons) {
            const tableIcons = {};
            icons.forEach((icon) => {
                tableIcons[icon.iconType] = function () {
                    const iconElement = document.createElement('wf-icon');
                    iconElement.name = icon.iconName;
                    iconElement.size = icon.iconSize || 'xs';
                    return iconElement;
                };
            });
            this.gridOptions.icons = tableIcons;
        }
        if (this.wrapper)
            this.wrapper.innerHTML = '';
        new agGrid.Grid(this.wrapper, this.gridOptions);
        this.trySetupClientSideData(rowData);
        this.trySetupServerSideData();
    }
    trySetupClientSideData(data) {
        const { gridOptions } = this;
        if (gridOptions.rowModelType !== CLIENT_SIDE_ROW_MODEL) {
            return;
        }
        const rowData = typeof data === 'string' ? JSON.parse(data) : data;
        gridOptions.api.setRowData(rowData);
    }
    trySetupServerSideData() {
        const { gridOptions, datasource } = this;
        if (gridOptions.rowModelType !== SERVER_SIDE_ROW_MODEL) {
            return;
        }
        const rowDatasource = typeof datasource === 'string' ? JSON.parse(datasource) : datasource;
        gridOptions.api.setServerSideDatasource(rowDatasource);
    }
    parseConfiguration(configuration) {
        this.parsedConfiguration =
            !!configuration && typeof configuration === 'string'
                ? JSON.parse(configuration)
                : configuration;
        this.dataFromConfiguration = !!this.parsedConfiguration && !!this.parsedConfiguration.rowData;
    }
    getGridOptions() {
        return this.gridOptions;
    }
    componentWillLoad() {
        const { configuration } = this;
        this.parseConfiguration(configuration);
    }
    componentDidLoad() {
        if (getLicenseKey()) {
            agGrid.LicenseManager.setLicenseKey(getLicenseKey());
        }
        this.renderTable();
    }
    render() {
        const { width, height, headersDisplay, styleType } = this;
        const classes = {
            'ag-theme-brml': true,
            [`headers-${headersDisplay}`]: true,
            [`style-${styleType}`]: true,
        };
        return (h("div", { class: Object.assign({}, classes), style: { width, height }, ref: (el) => (this.wrapper = el) }));
    }
    static get is() { return "wf-table"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/table/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/table/main.css"]
    }; }
    static get properties() { return {
        "columns": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "TableColumns[] | string",
                "resolved": "TableColumns[] | string",
                "references": {
                    "TableColumns": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Table columns definition array"
            },
            "attribute": "columns",
            "reflect": false
        },
        "data": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "RowDataType",
                "resolved": "any[] | string",
                "references": {
                    "RowDataType": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Client side data"
            },
            "attribute": "data",
            "reflect": false
        },
        "datasource": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "IServerSideDatasource | string",
                "resolved": "IServerSideDatasource | string",
                "references": {
                    "IServerSideDatasource": {
                        "location": "import",
                        "path": "ag-grid-community"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Server side data datasource object"
            },
            "attribute": "datasource",
            "reflect": false
        },
        "width": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Table width (px, percent)"
            },
            "attribute": "width",
            "reflect": false,
            "defaultValue": "'100%'"
        },
        "height": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Table height (px, auto)"
            },
            "attribute": "height",
            "reflect": false,
            "defaultValue": "'auto'"
        },
        "domLayout": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "GridLayoutType",
                "resolved": "\"autoHeight\" | \"normal\" | \"print\"",
                "references": {
                    "GridLayoutType": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Define table layout"
            },
            "attribute": "domlayout",
            "reflect": false,
            "defaultValue": "'autoHeight'"
        },
        "headersDisplay": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "HeadersDisplay",
                "resolved": "\"break\" | \"ellipsis\"",
                "references": {
                    "HeadersDisplay": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Define column headers text overflow. Can be displayed with ellipsis or visible in few lines"
            },
            "attribute": "headers",
            "reflect": false,
            "defaultValue": "'ellipsis'"
        },
        "styleType": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "StyleType",
                "resolved": "\"lines\" | \"striped\"",
                "references": {
                    "StyleType": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Define basic table style"
            },
            "attribute": "styletype",
            "reflect": false,
            "defaultValue": "'lines'"
        },
        "sortable": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Define if table data are sortable"
            },
            "attribute": "sortable",
            "reflect": false,
            "defaultValue": "true"
        },
        "resizable": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Define if columns are resizable"
            },
            "attribute": "resizable",
            "reflect": false,
            "defaultValue": "true"
        },
        "filter": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Define if data filter is enable"
            },
            "attribute": "filter",
            "reflect": false,
            "defaultValue": "true"
        },
        "icons": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "TableIcons[]",
                "resolved": "TableIcons[]",
                "references": {
                    "TableIcons": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Define header menu icon"
            }
        },
        "rowHeight": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Define row height"
            },
            "attribute": "rowheight",
            "reflect": false,
            "defaultValue": "50"
        },
        "headerHeight": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Define header row height"
            },
            "attribute": "headerheight",
            "reflect": false,
            "defaultValue": "50"
        },
        "pagination": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Define is table pagination is visible"
            },
            "attribute": "pagination",
            "reflect": false,
            "defaultValue": "false"
        },
        "paginationPageSize": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Define number of rows to display with pagination option"
            },
            "attribute": "paginationsize",
            "reflect": false,
            "defaultValue": "50"
        },
        "animateRows": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Define if data actions (such as sorting) should be animated"
            },
            "attribute": "animaterows",
            "reflect": false,
            "defaultValue": "false"
        },
        "statusBar": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Define if status bar should be visible"
            },
            "attribute": "statusbar",
            "reflect": false,
            "defaultValue": "false"
        },
        "statusPanel": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "StatusBarType",
                "resolved": "\"agAggregationComponent\" | \"agFilteredRowCountComponent\" | \"agSelectedRowCountComponent\" | \"agTotalAndFilteredRowCountComponent\" | \"agTotalRowCountComponent\"",
                "references": {
                    "StatusBarType": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Define type of data that are shown on status bar"
            },
            "attribute": "statusbartype",
            "reflect": false,
            "defaultValue": "'agTotalRowCountComponent'"
        },
        "statusPanelAlign": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "Alignment",
                "resolved": "\"center\" | \"left\" | \"right\"",
                "references": {
                    "Alignment": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Define alignment of status bar"
            },
            "attribute": "statusbaralign",
            "reflect": false,
            "defaultValue": "'right'"
        },
        "expanded": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Define if groups should be expanded on load"
            },
            "attribute": "expanded",
            "reflect": false,
            "defaultValue": "false"
        },
        "autoSizeColumnsFlag": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Define if columns width should be auto resize after load, to fit cells content. This option will ignore width declaration in columns definition. Can not work with sizeColumnsToFitFlag."
            },
            "attribute": "autosizecolumns",
            "reflect": false,
            "defaultValue": "false"
        },
        "sizeColumnsToFitFlag": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Define if columns width should be auto resize after load, to fit table width. This option will ignore width declaration in columns definition and prevent table horizontal scroll. Can not work with autoSizeColumnsFlag"
            },
            "attribute": "sizecolumnstofit",
            "reflect": false,
            "defaultValue": "false"
        },
        "enableRangeSelection": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Define if cells range selection is enabled"
            },
            "attribute": "enablerangeselection",
            "reflect": false,
            "defaultValue": "true"
        },
        "configuration": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "GridOptions | string",
                "resolved": "GridOptions | string",
                "references": {
                    "GridOptions": {
                        "location": "import",
                        "path": "ag-grid-community"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Define custom configuration of the table"
            },
            "attribute": "configuration",
            "reflect": false
        }
    }; }
    static get states() { return {
        "parsedConfiguration": {}
    }; }
    static get events() { return [{
            "method": "docCellClick",
            "name": "cellClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Table cell clicked"
            },
            "complexType": {
                "original": "CellClickedEvent",
                "resolved": "CellClickedEvent",
                "references": {
                    "CellClickedEvent": {
                        "location": "import",
                        "path": "ag-grid-community"
                    }
                }
            }
        }, {
            "method": "docWfCellClick",
            "name": "wfCellClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "CellClickedEvent",
                "resolved": "CellClickedEvent",
                "references": {
                    "CellClickedEvent": {
                        "location": "import",
                        "path": "ag-grid-community"
                    }
                }
            }
        }, {
            "method": "docRowSelect",
            "name": "rowSelect",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Table row selected"
            },
            "complexType": {
                "original": "RowSelectedEvent",
                "resolved": "RowSelectedEvent",
                "references": {
                    "RowSelectedEvent": {
                        "location": "import",
                        "path": "ag-grid-community"
                    }
                }
            }
        }, {
            "method": "docWfRowSelect",
            "name": "wfRowSelect",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "RowSelectedEvent",
                "resolved": "RowSelectedEvent",
                "references": {
                    "RowSelectedEvent": {
                        "location": "import",
                        "path": "ag-grid-community"
                    }
                }
            }
        }, {
            "method": "docRowClicked",
            "name": "rowClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Table row clicked"
            },
            "complexType": {
                "original": "RowClickedEvent",
                "resolved": "RowClickedEvent",
                "references": {
                    "RowClickedEvent": {
                        "location": "import",
                        "path": "ag-grid-community"
                    }
                }
            }
        }, {
            "method": "docWfRowClicked",
            "name": "wfRowClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "RowClickedEvent",
                "resolved": "RowClickedEvent",
                "references": {
                    "RowClickedEvent": {
                        "location": "import",
                        "path": "ag-grid-community"
                    }
                }
            }
        }, {
            "method": "docSelectionChanged",
            "name": "selectionChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Table selection changed"
            },
            "complexType": {
                "original": "SelectionChangedEvent",
                "resolved": "SelectionChangedEvent",
                "references": {
                    "SelectionChangedEvent": {
                        "location": "import",
                        "path": "ag-grid-community"
                    }
                }
            }
        }, {
            "method": "docWfSelectionChanged",
            "name": "wfSelectionChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "SelectionChangedEvent",
                "resolved": "SelectionChangedEvent",
                "references": {
                    "SelectionChangedEvent": {
                        "location": "import",
                        "path": "ag-grid-community"
                    }
                }
            }
        }, {
            "method": "docRangeSelectionChanged",
            "name": "rangeSelectionChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Table range selection changed"
            },
            "complexType": {
                "original": "CustomRangeSelectionChangedEvent",
                "resolved": "CustomRangeSelectionChangedEvent",
                "references": {
                    "CustomRangeSelectionChangedEvent": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            }
        }, {
            "method": "docWfRangeSelectionChanged",
            "name": "wfRangeSelectionChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "CustomRangeSelectionChangedEvent",
                "resolved": "CustomRangeSelectionChangedEvent",
                "references": {
                    "CustomRangeSelectionChangedEvent": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            }
        }, {
            "method": "docSortChanged",
            "name": "sortChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Table sort changed"
            },
            "complexType": {
                "original": "SortChangedEvent",
                "resolved": "SortChangedEvent",
                "references": {
                    "SortChangedEvent": {
                        "location": "import",
                        "path": "ag-grid-community"
                    }
                }
            }
        }, {
            "method": "docWfSortChanged",
            "name": "wfSortChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "SortChangedEvent",
                "resolved": "SortChangedEvent",
                "references": {
                    "SortChangedEvent": {
                        "location": "import",
                        "path": "ag-grid-community"
                    }
                }
            }
        }, {
            "method": "docFilterChanged",
            "name": "filterChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Table filter changed"
            },
            "complexType": {
                "original": "FilterChangedEvent",
                "resolved": "FilterChangedEvent",
                "references": {
                    "FilterChangedEvent": {
                        "location": "import",
                        "path": "ag-grid-community"
                    }
                }
            }
        }, {
            "method": "docWfFilterChanged",
            "name": "wfFilterChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "FilterChangedEvent",
                "resolved": "FilterChangedEvent",
                "references": {
                    "FilterChangedEvent": {
                        "location": "import",
                        "path": "ag-grid-community"
                    }
                }
            }
        }, {
            "method": "docColumnMoved",
            "name": "columnMoved",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Table column moved"
            },
            "complexType": {
                "original": "ColumnMovedEvent",
                "resolved": "ColumnMovedEvent",
                "references": {
                    "ColumnMovedEvent": {
                        "location": "import",
                        "path": "ag-grid-community"
                    }
                }
            }
        }, {
            "method": "docWfColumnMoved",
            "name": "wfColumnMoved",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "ColumnMovedEvent",
                "resolved": "ColumnMovedEvent",
                "references": {
                    "ColumnMovedEvent": {
                        "location": "import",
                        "path": "ag-grid-community"
                    }
                }
            }
        }, {
            "method": "docPaginationChanged",
            "name": "paginationChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Table pagination change"
            },
            "complexType": {
                "original": "PaginationChangedEvent",
                "resolved": "PaginationChangedEvent",
                "references": {
                    "PaginationChangedEvent": {
                        "location": "import",
                        "path": "ag-grid-community"
                    }
                }
            }
        }, {
            "method": "docWfPaginationChanged",
            "name": "wfPaginationChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "PaginationChangedEvent",
                "resolved": "PaginationChangedEvent",
                "references": {
                    "PaginationChangedEvent": {
                        "location": "import",
                        "path": "ag-grid-community"
                    }
                }
            }
        }]; }
    static get methods() { return {
        "exportToExcel": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Table exports data to an excel file by the method",
                "tags": []
            }
        },
        "setColumnDataFilter": {
            "complexType": {
                "signature": "(filteredResult: MultiselectDropdownResult) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "MultiselectDropdownResult": {
                        "location": "import",
                        "path": "../wf-multiselect-dropdown/types"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "setNumberRangeDataFilter": {
            "complexType": {
                "signature": "(filteredResult: AmountFilterOutput) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "AmountFilterOutput": {
                        "location": "import",
                        "path": "../wf-amount-filter/types"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "setExpanded": {
            "complexType": {
                "signature": "(nodeKey: any) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
    static get watchers() { return [{
            "propName": "data",
            "methodName": "updateData"
        }, {
            "propName": "configuration",
            "methodName": "updateConfiguration"
        }, {
            "propName": "columns",
            "methodName": "setNewColumnDefiniton"
        }]; }
}
__decorate([
    PrefixEvent()
], WfTable.prototype, "cellClick", void 0);
__decorate([
    PrefixEvent()
], WfTable.prototype, "rowSelect", void 0);
__decorate([
    PrefixEvent()
], WfTable.prototype, "rowClicked", void 0);
__decorate([
    PrefixEvent()
], WfTable.prototype, "selectionChanged", void 0);
__decorate([
    PrefixEvent()
], WfTable.prototype, "rangeSelectionChanged", void 0);
__decorate([
    PrefixEvent()
], WfTable.prototype, "sortChanged", void 0);
__decorate([
    PrefixEvent()
], WfTable.prototype, "filterChanged", void 0);
__decorate([
    PrefixEvent()
], WfTable.prototype, "columnMoved", void 0);
__decorate([
    PrefixEvent()
], WfTable.prototype, "paginationChanged", void 0);
