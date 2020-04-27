var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from "@stencil/core";
import { parseArrayProperty, stopPropagation } from '../../utils/utils';
import { DragManager } from '../../utils/drag-manager';
import { KeyValue } from '../../utils/types';
import { handleKeyboardControl } from '../../utils/keyboard-control';
import { PrefixEvent } from '../../utils/custom-event-emitter';
export class WfColumnsCustomizer {
    constructor() {
        /** Define if customizer drawer is opened */
        this.opened = false;
        /** Header text */
        this.header = 'Customize columns';
        /** Columns definition object. Should be created from wf-table columns definition. */
        this.defaultColumns = [];
        /** Dragging icon name */
        this.icon = 'wf-drag';
        /** Dragging icon size */
        this.iconSize = 'sm';
        /** Size of action buttons */
        this.buttonSize = 'md';
        /** Search/jump to input icon name */
        this.searchInputIcon = 'wf-search';
        /** Search/jump to input icon size */
        this.searchInputIconSize = 'xs';
        /** Search/jump to input size*/
        this.searchInputSize = 'lg';
        /** Limit of search/jump to list items */
        this.maxSearchItems = 10;
        /** Search/jump to input value */
        this.searchStr = '';
        /** Define if search/jump to should be visible */
        this.enableSearch = true;
        this.searchIntialValue = '';
        this.selectedClassName = 'columns-item-selected';
        this.handleOnCancelClick = this.handleOnCancelClick.bind(this);
        this.handleOnSaveClick = this.handleOnSaveClick.bind(this);
        this.handleSetSelectedColumn = this.handleSetSelectedColumn.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.renderEditableColumn = this.renderEditableColumn.bind(this);
    }
    handlerDrawerClose() {
        this.opened = false;
        this.searchStr = '';
        this.searchIntialValue = '';
        this.getColumnCopy();
    }
    handleDropdownChange(event) {
        event.stopPropagation();
        this.toggleInputValue(event.detail);
    }
    handleDragChangeEvent(ev) {
        if (ev.from) {
            ev.stopPropagation();
        }
    }
    updateDefaultColumns() {
        this.getColumnCopy();
    }
    handleSwitchChange(column, event) {
        event.stopPropagation();
        column.hide = !event.detail;
    }
    handleSearchInput(event) {
        event.stopPropagation();
        this.searchStr = event.detail;
    }
    handleOnCancelClick() {
        this.close.emit();
    }
    handleOnSaveClick() {
        this.editedColumns = this.rerenderListOrder();
        if (Array.isArray(this.defaultColumns))
            this.defaultColumns.splice(0, this.editedColumns.length, ...this.editedColumns);
        this.change.emit(this.editedColumns);
        this.handlerDrawerClose();
    }
    handleSetSelectedColumn(column, event) {
        event.stopPropagation();
        this.searchIntialValue = column.headerName;
        this.handleSelectedItemHighlight(column, this.selectedClassName);
        this.dropdown.opened = false;
    }
    handleSelectedItemHighlight(column, className) {
        this.removeItemsSelectedClass('columns-item', className);
        const columnItem = this.getHost().querySelector(`.column-${column.field}`);
        if (columnItem) {
            columnItem.classList.add(className);
            columnItem.scrollIntoView();
        }
    }
    componentWillLoad() {
        this.getColumnCopy();
        this.dragManager = new DragManager('drag-handle');
    }
    componentDidRender() {
        const { dragManager, opened } = this;
        const drawer = this.getHost().querySelector('wf-drawer');
        if (!drawer || !drawer.shadowRoot || !opened)
            return;
        dragManager.initContainer(this.getHost().querySelector('.drag-area'));
        this.selectedColumnInputElement = this.getHost().querySelector('.column-customizer-search-input');
        this.toggleSearchVisibility();
    }
    componentDidLoad() {
        this.dropdown = this.getHost().querySelector('wf-dropdown');
    }
    componentDidUnload() {
        this.dragManager.unload();
    }
    getColumnCopy() {
        const { defaultColumns } = this;
        this.editedColumns = parseArrayProperty(defaultColumns);
    }
    getHost() {
        return this.host;
    }
    toggleSearchVisibility() {
        const drawer = this.getHost()
            .querySelector('wf-drawer')
            .shadowRoot.querySelector('main');
        if (drawer.scrollHeight <= drawer.clientHeight) {
            this.enableSearch = false;
        }
        else {
            this.enableSearch = true;
        }
    }
    toggleInputValue(opened) {
        if (opened) {
            this.selectedColumnInputElement.value = this.searchStr;
        }
        else {
            this.selectedColumnInputElement.value = this.searchIntialValue;
        }
    }
    removeItemsSelectedClass(columnsClassName, columnsSelectedClass) {
        this.getHost()
            .querySelectorAll(`.${columnsClassName}`)
            .forEach((item) => {
            item.classList.remove(columnsSelectedClass);
        });
    }
    handleKeyDown(e) {
        const { dropdown, host } = this;
        if (!dropdown.opened)
            return;
        e.cancelBubble = true;
        if (e.key === KeyValue.ESC_KEY) {
            e.preventDefault();
            dropdown.opened = false;
            return;
        }
        const optionClass = 'column-customizer-search-list-item';
        const focusClass = 'form-select-option-focused';
        const optionsList = host.querySelector(`.column-customizer-search-list`);
        if (optionsList) {
            handleKeyboardControl(e, optionClass, focusClass, optionsList);
        }
    }
    rerenderListOrder() {
        const lockedColumns = this.findLockedColumns();
        const editableColumns = this.findEditableColumns();
        return lockedColumns.concat(this.renderArrayFromList().map((i) => editableColumns[i]));
    }
    renderArrayFromList() {
        return Array.from(this.getHost()
            .querySelector('.drag-area')
            .querySelectorAll('li')).map((listElem) => +listElem.dataset.value);
    }
    findLockedColumns() {
        const { editedColumns } = this;
        return !!editedColumns ? editedColumns.filter((columns) => columns.lockPosition) : [];
    }
    findEditableColumns() {
        const { editedColumns } = this;
        return !!editedColumns ? editedColumns.filter((columns) => !columns.lockPosition) : [];
    }
    renderLockedColumn(column) {
        const columnClasses = {
            ['columns-item']: true,
            [`column-${column.field}`]: !!column.field,
        };
        return (h("li", { class: columnClasses },
            h("wf-switch", { label: column.headerName, disabled: true, "icon-placement": "left" })));
    }
    renderEditableColumn(column, index) {
        const columnClasses = {
            ['columns-item']: true,
            [`column-${column.field}`]: !!column.field,
        };
        return (h("li", { "data-value": index, class: columnClasses },
            h("wf-icon", { class: "columns-item-icon drag-handle", name: this.icon, size: this.iconSize }),
            h("span", null, column.headerName),
            !column.lockVisible ? (h("wf-switch", { class: "columns-item-switch", onChange: this.handleSwitchChange.bind(this, column), onWfChange: stopPropagation, checked: !column.hide })) : ('')));
    }
    findSearchStrInValue(searchStr, value) {
        return searchStr.length > 0
            ? value
                .toString()
                .toLowerCase()
                .includes(searchStr.toString().toLowerCase())
            : true;
    }
    renderFilteredColumnsList() {
        const { searchStr, maxSearchItems } = this;
        const filteredColumns = this.editedColumns.filter((column) => this.findSearchStrInValue(searchStr, column.headerName));
        return filteredColumns.length === 0 ? (h("li", { class: "not-found" }, "Column not found")) : (filteredColumns.map((column, index) => {
            if (index >= maxSearchItems)
                return;
            return (h("li", { class: "column-customizer-search-list-item form-select-option form-select-option-lg", onClick: (event) => this.handleSetSelectedColumn(column, event) }, column.headerName));
        }));
    }
    render() {
        const { opened, header, buttonSize, searchInputIcon, searchInputSize, searchInputLabel, searchInputIconSize, searchInputPlaceholder, enableSearch, } = this;
        const lockedColumns = this.findLockedColumns();
        const editableColumns = this.findEditableColumns();
        const searchInputAttributes = {
            icon: searchInputIcon,
            iconSize: searchInputIconSize,
            size: searchInputSize,
            placeholder: !!searchInputPlaceholder ? searchInputPlaceholder : null,
            label: !!searchInputLabel ? searchInputLabel : null,
            class: 'column-customizer-search-input',
            onChange: stopPropagation,
            onInput: this.handleSearchInput,
        };
        return opened ? (h("wf-drawer", { class: "column-customizer", header: header, width: "slim", opened: opened },
            h("div", { slot: "header" },
                h("slot", null),
                enableSearch ? (h("div", { class: "dropdown-column-customizer form-control-wrapper" },
                    h("div", { class: "dropdown-trigger", "data-dropdown": true },
                        h("wf-input", Object.assign({ "data-dropdown-trigger": true }, searchInputAttributes))),
                    h("wf-dropdown", { ref: (el) => (this.dropdown = el), "scroll-sensitive": "false" },
                        h("ul", { class: "column-customizer-search-list form-select-list" }, this.renderFilteredColumnsList())))) : null),
            !!lockedColumns.length && (h("ul", { class: "columns locked" }, lockedColumns.map(this.renderLockedColumn))),
            !!editableColumns.length && (h("ul", { class: "drag-area columns" }, editableColumns.map(this.renderEditableColumn))),
            h("div", { slot: "footer" },
                h("wf-button", { class: "column-customizer-footer-button", onClick: this.handleOnCancelClick, variant: "secondary", size: buttonSize }, "Cancel"),
                h("wf-button", { class: "column-customizer-footer-button", onClick: this.handleOnSaveClick, size: buttonSize }, "Save")))) : (h("div", { class: "column-customizer-hidden" },
            h("slot", null)));
    }
    static get is() { return "wf-columns-customizer"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/column-customizer/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/column-customizer/main.css"]
    }; }
    static get properties() { return {
        "opened": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Define if customizer drawer is opened"
            },
            "attribute": "opened",
            "reflect": false,
            "defaultValue": "false"
        },
        "header": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Header text"
            },
            "attribute": "header",
            "reflect": false,
            "defaultValue": "'Customize columns'"
        },
        "defaultColumns": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "TableColumns[] | string",
                "resolved": "TableColumns[] | string",
                "references": {
                    "TableColumns": {
                        "location": "import",
                        "path": "../wf-table/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Columns definition object. Should be created from wf-table columns definition."
            },
            "attribute": "default-columns",
            "reflect": false,
            "defaultValue": "[]"
        },
        "icon": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Dragging icon name"
            },
            "attribute": "icon",
            "reflect": false,
            "defaultValue": "'wf-drag'"
        },
        "iconSize": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "IconSize",
                "resolved": "\"lg\" | \"md\" | \"sm\" | \"xl\" | \"xs\" | \"xxs\"",
                "references": {
                    "IconSize": {
                        "location": "import",
                        "path": "../wf-icon/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Dragging icon size"
            },
            "attribute": "icon-size",
            "reflect": false,
            "defaultValue": "'sm'"
        },
        "buttonSize": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ButtonSize",
                "resolved": "\"lg\" | \"md\" | \"sm\"",
                "references": {
                    "ButtonSize": {
                        "location": "import",
                        "path": "../wf-button/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Size of action buttons"
            },
            "attribute": "button-size",
            "reflect": false,
            "defaultValue": "'md'"
        },
        "searchInputIcon": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Search/jump to input icon name"
            },
            "attribute": "search-input-icon",
            "reflect": false,
            "defaultValue": "'wf-search'"
        },
        "searchInputIconSize": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "IconSize",
                "resolved": "\"lg\" | \"md\" | \"sm\" | \"xl\" | \"xs\" | \"xxs\"",
                "references": {
                    "IconSize": {
                        "location": "import",
                        "path": "../wf-icon/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Search/jump to input icon size"
            },
            "attribute": "search-input-icon-size",
            "reflect": false,
            "defaultValue": "'xs'"
        },
        "searchInputSize": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "InputSize",
                "resolved": "\"lg\" | \"sm\"",
                "references": {
                    "InputSize": {
                        "location": "import",
                        "path": "../wf-input/types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Search/jump to input size"
            },
            "attribute": "search-input-size",
            "reflect": false,
            "defaultValue": "'lg'"
        },
        "searchInputLabel": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Search/jump to input label"
            },
            "attribute": "search-input-label",
            "reflect": false
        },
        "searchInputPlaceholder": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Search/jump to input placeholder"
            },
            "attribute": "search-input-placeholder",
            "reflect": false
        },
        "maxSearchItems": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Limit of search/jump to list items"
            },
            "attribute": "max-search-items",
            "reflect": false,
            "defaultValue": "10"
        }
    }; }
    static get states() { return {
        "searchStr": {},
        "enableSearch": {}
    }; }
    static get events() { return [{
            "method": "docChange",
            "name": "change",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "TableColumns[]",
                "resolved": "TableColumns[]",
                "references": {
                    "TableColumns": {
                        "location": "import",
                        "path": "../wf-table/types"
                    }
                }
            }
        }, {
            "method": "docWfChange",
            "name": "wfChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "TableColumns[]",
                "resolved": "TableColumns[]",
                "references": {
                    "TableColumns": {
                        "location": "import",
                        "path": "../wf-table/types"
                    }
                }
            }
        }, {
            "method": "docClose",
            "name": "close",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
                "references": {}
            }
        }, {
            "method": "docWfClose",
            "name": "wfClose",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
                "references": {}
            }
        }]; }
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "defaultColumns",
            "methodName": "updateDefaultColumns"
        }]; }
    static get listeners() { return [{
            "name": "close",
            "method": "handlerDrawerClose",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "toggle",
            "method": "handleDropdownChange",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "change",
            "method": "handleDragChangeEvent",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "keydown",
            "method": "handleKeyDown",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
__decorate([
    PrefixEvent()
], WfColumnsCustomizer.prototype, "change", void 0);
__decorate([
    PrefixEvent()
], WfColumnsCustomizer.prototype, "close", void 0);
