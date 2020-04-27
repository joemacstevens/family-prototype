var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { r as registerInstance, c as createEvent, h, g as getElement } from './core-2ee2b62e.js';
import './_commonjsHelpers-97e6d7b1.js';
import { p as parseArrayProperty, s as stopPropagation } from './utils-9974937e.js';
import { a as KeyValue } from './types-bc604d28.js';
import { P as PrefixEvent } from './custom-event-emitter-d3f4fc52.js';
import { D as DragManager } from './drag-manager-7e942a3b.js';
import { h as handleKeyboardControl } from './keyboard-control-29636223.js';
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WfColumnsCustomizer = /** @class */ (function () {
    function WfColumnsCustomizer(hostRef) {
        registerInstance(this, hostRef);
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
        this.docChange = createEvent(this, "change", 7);
        this.docWfChange = createEvent(this, "wfChange", 7);
        this.docClose = createEvent(this, "close", 7);
        this.docWfClose = createEvent(this, "wfClose", 7);
    }
    WfColumnsCustomizer.prototype.handlerDrawerClose = function () {
        this.opened = false;
        this.searchStr = '';
        this.searchIntialValue = '';
        this.getColumnCopy();
    };
    WfColumnsCustomizer.prototype.handleDropdownChange = function (event) {
        event.stopPropagation();
        this.toggleInputValue(event.detail);
    };
    WfColumnsCustomizer.prototype.handleDragChangeEvent = function (ev) {
        if (ev.from) {
            ev.stopPropagation();
        }
    };
    WfColumnsCustomizer.prototype.updateDefaultColumns = function () {
        this.getColumnCopy();
    };
    WfColumnsCustomizer.prototype.handleSwitchChange = function (column, event) {
        event.stopPropagation();
        column.hide = !event.detail;
    };
    WfColumnsCustomizer.prototype.handleSearchInput = function (event) {
        event.stopPropagation();
        this.searchStr = event.detail;
    };
    WfColumnsCustomizer.prototype.handleOnCancelClick = function () {
        this.close.emit();
    };
    WfColumnsCustomizer.prototype.handleOnSaveClick = function () {
        var _a;
        this.editedColumns = this.rerenderListOrder();
        if (Array.isArray(this.defaultColumns))
            (_a = this.defaultColumns).splice.apply(_a, __spreadArrays([0, this.editedColumns.length], this.editedColumns));
        this.change.emit(this.editedColumns);
        this.handlerDrawerClose();
    };
    WfColumnsCustomizer.prototype.handleSetSelectedColumn = function (column, event) {
        event.stopPropagation();
        this.searchIntialValue = column.headerName;
        this.handleSelectedItemHighlight(column, this.selectedClassName);
        this.dropdown.opened = false;
    };
    WfColumnsCustomizer.prototype.handleSelectedItemHighlight = function (column, className) {
        this.removeItemsSelectedClass('columns-item', className);
        var columnItem = this.getHost().querySelector(".column-" + column.field);
        if (columnItem) {
            columnItem.classList.add(className);
            columnItem.scrollIntoView();
        }
    };
    WfColumnsCustomizer.prototype.componentWillLoad = function () {
        this.getColumnCopy();
        this.dragManager = new DragManager('drag-handle');
    };
    WfColumnsCustomizer.prototype.componentDidRender = function () {
        var _a = this, dragManager = _a.dragManager, opened = _a.opened;
        var drawer = this.getHost().querySelector('wf-drawer');
        if (!drawer || !drawer.shadowRoot || !opened)
            return;
        dragManager.initContainer(this.getHost().querySelector('.drag-area'));
        this.selectedColumnInputElement = this.getHost().querySelector('.column-customizer-search-input');
        this.toggleSearchVisibility();
    };
    WfColumnsCustomizer.prototype.componentDidLoad = function () {
        this.dropdown = this.getHost().querySelector('wf-dropdown');
    };
    WfColumnsCustomizer.prototype.componentDidUnload = function () {
        this.dragManager.unload();
    };
    WfColumnsCustomizer.prototype.getColumnCopy = function () {
        var defaultColumns = this.defaultColumns;
        this.editedColumns = parseArrayProperty(defaultColumns);
    };
    WfColumnsCustomizer.prototype.getHost = function () {
        return this.host;
    };
    WfColumnsCustomizer.prototype.toggleSearchVisibility = function () {
        var drawer = this.getHost()
            .querySelector('wf-drawer')
            .shadowRoot.querySelector('main');
        if (drawer.scrollHeight <= drawer.clientHeight) {
            this.enableSearch = false;
        }
        else {
            this.enableSearch = true;
        }
    };
    WfColumnsCustomizer.prototype.toggleInputValue = function (opened) {
        if (opened) {
            this.selectedColumnInputElement.value = this.searchStr;
        }
        else {
            this.selectedColumnInputElement.value = this.searchIntialValue;
        }
    };
    WfColumnsCustomizer.prototype.removeItemsSelectedClass = function (columnsClassName, columnsSelectedClass) {
        this.getHost()
            .querySelectorAll("." + columnsClassName)
            .forEach(function (item) {
            item.classList.remove(columnsSelectedClass);
        });
    };
    WfColumnsCustomizer.prototype.handleKeyDown = function (e) {
        var _a = this, dropdown = _a.dropdown, host = _a.host;
        if (!dropdown.opened)
            return;
        e.cancelBubble = true;
        if (e.key === KeyValue.ESC_KEY) {
            e.preventDefault();
            dropdown.opened = false;
            return;
        }
        var optionClass = 'column-customizer-search-list-item';
        var focusClass = 'form-select-option-focused';
        var optionsList = host.querySelector(".column-customizer-search-list");
        if (optionsList) {
            handleKeyboardControl(e, optionClass, focusClass, optionsList);
        }
    };
    WfColumnsCustomizer.prototype.rerenderListOrder = function () {
        var lockedColumns = this.findLockedColumns();
        var editableColumns = this.findEditableColumns();
        return lockedColumns.concat(this.renderArrayFromList().map(function (i) { return editableColumns[i]; }));
    };
    WfColumnsCustomizer.prototype.renderArrayFromList = function () {
        return Array.from(this.getHost()
            .querySelector('.drag-area')
            .querySelectorAll('li')).map(function (listElem) { return +listElem.dataset.value; });
    };
    WfColumnsCustomizer.prototype.findLockedColumns = function () {
        var editedColumns = this.editedColumns;
        return !!editedColumns ? editedColumns.filter(function (columns) { return columns.lockPosition; }) : [];
    };
    WfColumnsCustomizer.prototype.findEditableColumns = function () {
        var editedColumns = this.editedColumns;
        return !!editedColumns ? editedColumns.filter(function (columns) { return !columns.lockPosition; }) : [];
    };
    WfColumnsCustomizer.prototype.renderLockedColumn = function (column) {
        var _a;
        var columnClasses = (_a = {},
            _a['columns-item'] = true,
            _a["column-" + column.field] = !!column.field,
            _a);
        return (h("li", { class: columnClasses }, h("wf-switch", { label: column.headerName, disabled: true, "icon-placement": "left" })));
    };
    WfColumnsCustomizer.prototype.renderEditableColumn = function (column, index) {
        var _a;
        var columnClasses = (_a = {},
            _a['columns-item'] = true,
            _a["column-" + column.field] = !!column.field,
            _a);
        return (h("li", { "data-value": index, class: columnClasses }, h("wf-icon", { class: "columns-item-icon drag-handle", name: this.icon, size: this.iconSize }), h("span", null, column.headerName), !column.lockVisible ? (h("wf-switch", { class: "columns-item-switch", onChange: this.handleSwitchChange.bind(this, column), onWfChange: stopPropagation, checked: !column.hide })) : ('')));
    };
    WfColumnsCustomizer.prototype.findSearchStrInValue = function (searchStr, value) {
        return searchStr.length > 0
            ? value
                .toString()
                .toLowerCase()
                .includes(searchStr.toString().toLowerCase())
            : true;
    };
    WfColumnsCustomizer.prototype.renderFilteredColumnsList = function () {
        var _this = this;
        var _a = this, searchStr = _a.searchStr, maxSearchItems = _a.maxSearchItems;
        var filteredColumns = this.editedColumns.filter(function (column) { return _this.findSearchStrInValue(searchStr, column.headerName); });
        return filteredColumns.length === 0 ? (h("li", { class: "not-found" }, "Column not found")) : (filteredColumns.map(function (column, index) {
            if (index >= maxSearchItems)
                return;
            return (h("li", { class: "column-customizer-search-list-item form-select-option form-select-option-lg", onClick: function (event) { return _this.handleSetSelectedColumn(column, event); } }, column.headerName));
        }));
    };
    WfColumnsCustomizer.prototype.render = function () {
        var _this = this;
        var _a = this, opened = _a.opened, header = _a.header, buttonSize = _a.buttonSize, searchInputIcon = _a.searchInputIcon, searchInputSize = _a.searchInputSize, searchInputLabel = _a.searchInputLabel, searchInputIconSize = _a.searchInputIconSize, searchInputPlaceholder = _a.searchInputPlaceholder, enableSearch = _a.enableSearch;
        var lockedColumns = this.findLockedColumns();
        var editableColumns = this.findEditableColumns();
        var searchInputAttributes = {
            icon: searchInputIcon,
            iconSize: searchInputIconSize,
            size: searchInputSize,
            placeholder: !!searchInputPlaceholder ? searchInputPlaceholder : null,
            label: !!searchInputLabel ? searchInputLabel : null,
            class: 'column-customizer-search-input',
            onChange: stopPropagation,
            onInput: this.handleSearchInput,
        };
        return opened ? (h("wf-drawer", { class: "column-customizer", header: header, width: "slim", opened: opened }, h("div", { slot: "header" }, h("slot", null), enableSearch ? (h("div", { class: "dropdown-column-customizer form-control-wrapper" }, h("div", { class: "dropdown-trigger", "data-dropdown": true }, h("wf-input", Object.assign({ "data-dropdown-trigger": true }, searchInputAttributes))), h("wf-dropdown", { ref: function (el) { return (_this.dropdown = el); }, "scroll-sensitive": "false" }, h("ul", { class: "column-customizer-search-list form-select-list" }, this.renderFilteredColumnsList())))) : null), !!lockedColumns.length && (h("ul", { class: "columns locked" }, lockedColumns.map(this.renderLockedColumn))), !!editableColumns.length && (h("ul", { class: "drag-area columns" }, editableColumns.map(this.renderEditableColumn))), h("div", { slot: "footer" }, h("wf-button", { class: "column-customizer-footer-button", onClick: this.handleOnCancelClick, variant: "secondary", size: buttonSize }, "Cancel"), h("wf-button", { class: "column-customizer-footer-button", onClick: this.handleOnSaveClick, size: buttonSize }, "Save")))) : (h("div", { class: "column-customizer-hidden" }, h("slot", null)));
    };
    Object.defineProperty(WfColumnsCustomizer.prototype, "host", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WfColumnsCustomizer, "watchers", {
        get: function () {
            return {
                "defaultColumns": ["updateDefaultColumns"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WfColumnsCustomizer, "style", {
        get: function () { return ".all-caps{font-family:var(--all-caps-font-family,var(--font-family));font-weight:var(--all-caps-font-weight,var(--font-weight-bold,var(--font-weight,normal)));font-size:var(--all-caps-font-size,13px);line-height:var(--all-caps-line-height,15px);text-transform:var(--all-caps-text-transform,uppercase);letter-spacing:var(--all-caps-letter-spacing,1px)}.label-1{font-family:var(--label-1-font-family,var(--label-font-family));font-size:var(--label-1-font-size,var(--label-font-size));line-height:var(--label-1-line-height,var(--label-line-height));color:var(--label-1-color,var(--label-color));letter-spacing:var(--label-1-spacing,var(--label-letter-spacing));font-weight:var(--label-1-font-weight,var(--label-font-weight));text-transform:var(--label-1-text-transform,var(--label-text-transform))}.label-2{font-family:var(--label-2-font-family,var(--label-font-family));font-size:var(--label-2-font-size,var(--label-font-size));line-height:var(--label-2-line-height,var(--label-line-height));color:var(--label-2-color,var(--label-color));letter-spacing:var(--label-2-spacing,var(--label-letter-spacing));font-weight:var(--label-2-font-weight,var(--label-font-weight));text-transform:var(--label-2-text-transform,var(--label-text-transform))}.label-3{font-family:var(--label-3-font-family,var(--label-font-family));font-size:var(--label-3-font-size,var(--label-font-size));line-height:var(--label-3-line-height,var(--label-line-height));color:var(--label-3-color,var(--label-color));letter-spacing:var(--label-3-spacing,var(--label-letter-spacing));font-weight:var(--label-3-font-weight,var(--label-font-weight));text-transform:var(--label-3-text-transform,var(--label-text-transform))}.label-4{font-family:var(--label-4-font-family,var(--label-font-family));font-size:var(--label-4-font-size,var(--label-font-size));line-height:var(--label-4-line-height,var(--label-line-height));color:var(--label-4-color,var(--label-color));letter-spacing:var(--label-4-spacing,var(--label-letter-spacing));font-weight:var(--label-4-font-weight,var(--label-font-weight));text-transform:var(--label-4-text-transform,var(--label-text-transform))}.label-5{font-family:var(--label-5-font-family,var(--label-font-family));font-size:var(--label-5-font-size,var(--label-font-size));line-height:var(--label-5-line-height,var(--label-line-height));color:var(--label-5-color,var(--label-color));letter-spacing:var(--label-5-spacing,var(--label-letter-spacing));font-weight:var(--label-5-font-weight,var(--label-font-weight));text-transform:var(--label-5-text-transform,var(--label-text-transform))}.label-secondary{color:var(--label-secondary-color,var(--color-text-secondary,var(--text-secondary-color,#444)))}.label-tertiary{color:var(--label-tertiary-color,var(--text-tertiary-color,#646464))}.label-inverse{color:var(--label-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}:host{display:inline-block;vertical-align:var(--form-control-vertical-align,bottom)}.form-label,:host .form-tooltip{display:block}.form-label{font-family:var(--form-control-label-font-family);font-size:var(--form-control-label-font-size,var(--font-size-small,.9em));color:var(--form-control-label-color,var(--color-text-secondary,var(--text-secondary-color,#444)));line-height:var(--form-control-label-line-height);margin-bottom:var(--form-control-label-margin-bottom,var(--spacing-xxs,6px))}.form-label-inline{display:inline-block;text-align:right;padding-right:var(--form-control-label-inline-padding-right,var(--spacing-s,24px));padding-left:0;margin:0;width:var(--form-control-caption-width,var(--form-control-label-inline-width,25%));-ms-flex:1;flex:1}.form-label-locked{pointer-events:none}.form-label-error{color:var(--form-control-label-color-error,var(--form-control-error-label-color))}.form-label-inverse{color:var(--form-control-inverse-label-color,hsla(0,0%,100%,.8))}.form-label .required{color:var(--form-control-required-asterisk-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31))))}.form-label .error{color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-control{display:block;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:var(--form-control-font-family);font-weight:var(--form-control-font-weight);font-size:var(--form-control-font-size);border-width:0;border-style:var(--form-control-border-style,solid);border-radius:var(--form-control-border-radius);height:var(--form-control-size-m,var(--form-control-height,var(--spacing-m,36px)));-webkit-box-shadow:var(--form-control-box-shadow);box-shadow:var(--form-control-box-shadow)}.form-control-primary{color:var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));border-color:var(--form-control-border-color,var(--smoke,#919191));border-width:var(--form-control-border-width,1px);background:var(--form-control-background,var(--white,#fff));padding-left:var(--form-control-padding,var(--spacing-xs,12px));padding-right:var(--form-control-padding,var(--spacing-xs,12px))}.form-control-primary .form-control-required{border-color:var(--form-control-border-color-required,var(--form-control-required-border-color,var(--form-control-border-color,var(--smoke,#919191))))}.form-control-secondary{color:var(--form-control-secondary-color,var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))));border-color:var(--form-control-secondary-border-color,var(--form-control-border-color,var(--smoke,#919191)));border-width:var(--form-control-secondary-border-width,var(--form-control-border-width,1px));background:var(--form-control-secondary-background,var(--form-control-background,var(--white,#fff)));padding-left:var(--form-control-secondary-padding,var(--form-control-padding,var(--spacing-xs,12px)));padding-right:var(--form-control-secondary-padding,var(--form-control-padding,var(--spacing-xs,12px)))}.form-control-secondary .form-control-required{border-color:var(--form-control-secondary-required-border-color,var(--form-control-secondary-border-color,var(--form-control-border-color,var(--smoke,#919191))))}.form-control-inverse{color:var(--form-control-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))));border-color:var(--form-control-inverse-border-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))));border-width:var(--form-control-inverse-border-width,var(--form-control-border-width,1px));background:var(--form-control-inverse-background,transparent);padding-left:var(--form-control-inverse-padding,var(--form-control-padding,var(--spacing-xs,12px)));padding-right:var(--form-control-inverse-padding,var(--form-control-padding,var(--spacing-xs,12px)))}.form-control-inverse .form-control-required{border-color:var(--form-control-inverse-required-border-color,var(--form-control-inverse-border-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff)))))}.form-control-sm{height:var(--form-control-size-sm,var(--form-control-sm-height,var(--form-control-size-m,var(--form-control-height,var(--spacing-m,36px)))))}.form-control-icon-xs{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-xs, 16px))}.form-control-icon-xs+.form-control-icon-wrapper-xs,.form-control-icon-xs .form-control-arrow-xs{top:calc(50% - (var(--icon-size-xs, 16px) / 2) - var(--icon-padding-xs, 4px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-xs, 4px))}.form-control .input-arrow-xs{--icon-padding-xs:0}.form-control .input-arrow-xs.up{top:1px}.form-control .input-arrow-xs.down{top:50%}.form-control-icon-locked-xs{position:absolute;top:calc(50% - (var(--icon-size-xs, 16px) / 2) - var(--icon-padding-xs, 4px));left:0}.form-control-icon-locked-xs~input{text-indent:var(--icon-size-xs,16px)}.form-control-icon-sm{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-sm, 24px))}.form-control-icon-sm+.form-control-icon-wrapper-sm,.form-control-icon-sm .form-control-arrow-sm{top:calc(50% - (var(--icon-size-sm, 24px) / 2) - var(--icon-padding-sm, 6px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-sm, 6px))}.form-control .input-arrow-sm{--icon-padding-sm:0}.form-control .input-arrow-sm.up{top:1px}.form-control .input-arrow-sm.down{top:50%}.form-control-icon-locked-sm{position:absolute;top:calc(50% - (var(--icon-size-sm, 24px) / 2) - var(--icon-padding-sm, 6px));left:0}.form-control-icon-locked-sm~input{text-indent:var(--icon-size-sm,24px)}.form-control-icon-md{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-md, 36px))}.form-control-icon-md+.form-control-icon-wrapper-md,.form-control-icon-md .form-control-arrow-md{top:calc(50% - (var(--icon-size-md, 36px) / 2) - var(--icon-padding-md, 18px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-md, 18px))}.form-control .input-arrow-md{--icon-padding-md:0}.form-control .input-arrow-md.up{top:1px}.form-control .input-arrow-md.down{top:50%}.form-control-icon-locked-md{position:absolute;top:calc(50% - (var(--icon-size-md, 36px) / 2) - var(--icon-padding-md, 18px));left:0}.form-control-icon-locked-md~input{text-indent:var(--icon-size-md,36px)}.form-control-icon-lg{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-lg, 72px))}.form-control-icon-lg+.form-control-icon-wrapper-lg,.form-control-icon-lg .form-control-arrow-lg{top:calc(50% - (var(--icon-size-lg, 72px) / 2) - var(--icon-padding-lg, 12px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-lg, 12px))}.form-control .input-arrow-lg{--icon-padding-lg:0}.form-control .input-arrow-lg.up{top:1px}.form-control .input-arrow-lg.down{top:50%}.form-control-icon-locked-lg{position:absolute;top:calc(50% - (var(--icon-size-lg, 72px) / 2) - var(--icon-padding-lg, 12px));left:0}.form-control-icon-locked-lg~input{text-indent:var(--icon-size-lg,72px)}.form-control-icon-xl{padding-right:calc(2 * var(--form-control-padding, var(--spacing-xs, 12px)) + var(--icon-size-xl, 96px))}.form-control-icon-xl+.form-control-icon-wrapper-xl,.form-control-icon-xl .form-control-arrow-xl{top:calc(50% - (var(--icon-size-xl, 96px) / 2) - var(--icon-padding-xl, 12px));right:calc(var(--form-control-padding, var(--spacing-xs, 12px)) - var(--icon-padding-xl, 12px))}.form-control .input-arrow-xl{--icon-padding-xl:0}.form-control .input-arrow-xl.up{top:1px}.form-control .input-arrow-xl.down{top:50%}.form-control-icon-locked-xl{position:absolute;top:calc(50% - (var(--icon-size-xl, 96px) / 2) - var(--icon-padding-xl, 12px));left:0}.form-control-icon-locked-xl~input{text-indent:var(--icon-size-xl,96px)}.form-control-icon-locked-primary{left:var(--form-control-locked-icon-position-left)}.form-control-icon-locked-secondary{left:var(--form-control-secondary-locked-icon-position-left)}.form-control-icon-locked-inverse{left:var(--form-control-inverse-locked-icon-position-left)}.form-control-disabled,.form-control[disabled]{color:var(--form-control-font-color-disabled,var(--form-control-disabled-color,var(--text-disabled-color,#bebebe)));background:var(--form-control-background-disabled,var(--alto,#d7d7d7));border-color:var(--form-control-border-color-disabled,var(--form-control-disabled-border-color,var(--text-disabled-color,#bebebe)))}.form-control-disabled.form-control-inverse,.form-control[disabled].form-control-inverse{background:var(--form-control-inverse-background,transparent)}.form-control-disabled:focus,.form-control[disabled]:focus{outline:0}.form-control-locked{color:var(--form-control-font-color-locked,var(--form-control-locked-color,var(--form-control-font-color-disabled,var(--form-control-disabled-color,var(--text-disabled-color,#bebebe)))));background:var(--form-control-locked-background,var(--form-control-background-disabled,var(--alto,#d7d7d7)));border-color:var(--form-control-border-color-locked,var(--form-control-locked-border-color,var(--form-control-border-color-disabled,var(--form-control-disabled-border-color,var(--text-disabled-color,#bebebe)))));cursor:default}.form-control-locked.form-control-inverse{background:var(--form-control-inverse-background,transparent)}.form-control-error{border-color:var(--form-control-border-color-error,var(--form-control-error-border-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-control-error.form-control-inverse{border-color:var(--form-control-inverse-error-border-color)}.form-control::-webkit-input-placeholder{color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464))}.form-control::-webkit-input-placeholder,.form-control::placeholder{color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464))}.form-control.form-control-inverse::-webkit-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::-moz-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse:-ms-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::-ms-input-placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control.form-control-inverse::placeholder{color:var(--form-control-inverse-placeholder-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-control:active,.form-control:focus{outline:0}.form-control:active:not([disabled]):not(.form-control-disabled),.form-control:focus:not([disabled]):not(.form-control-disabled){border-color:var(--form-control-border-color-focus,var(--form-control-focus-border-color,var(--lagoon,#009ad2)))}.form-control:hover:not([disabled]):not(.form-control-disabled){border-color:var(--form-control-border-color-hover,var(--form-control-hover-border-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))))}.form-control:hover:not([disabled]):not(.form-control-disabled).form-control-inverse{border-color:var(--form-control-inverse-hover-border-color)}.form-control-error-message{font-family:var(--form-control-error-font-family);font-size:var(--form-control-error-font-size,.8em);font-style:var(--form-control-error-message-font-style,var(--form-control-error-font-style,italic));white-space:pre-line;color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))));margin-top:var(--form-control-error-message-margin-top,var(--form-control-error-margin-top,var(--spacing-xxs,6px)))}.form-control-description{font-family:var(--form-control-description-font-family);font-size:var(--form-control-description-font-size,.8em);font-style:var(--form-control-description-font-style);color:var(--form-control-description-color,var(--text-tertiary-color,#646464));white-space:pre-line;margin-top:var(--form-control-description-margin-top,var(--spacing-xxs,6px))}.form-control-icon-wrapper{position:absolute;cursor:pointer}.form-control-textarea{resize:none}.form-control-text-align-left,.form-control-text-align-left input{text-align:left}.form-control-text-align-center,.form-control-text-align-center input{text-align:center}.form-control-text-align-right,.form-control-text-align-right input{text-align:right}.form-control-wrapper{position:relative;min-width:var(--form-control-min-width,250px);max-width:var(--form-control-max-width,100%);width:100%}.form-control-wrapper .prefix{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;position:absolute;height:100%;width:auto;top:0;left:0;bottom:0;padding-left:var(--form-control-prefix-padding,var(--spacing-xxs,6px));padding-right:var(--form-control-prefix-padding,var(--spacing-xxs,6px));font-weight:var(--form-control-prefix-font-weight,var(--form-control-font-weight));font-size:var(--form-control-prefix-font-size,var(--form-control-font-size));color:var(--form-control-prefix-color,var(--form-control-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))))}.form-group{margin:var(--form-control-margin-top,0) var(--form-control-margin-right,0) var(--form-control-margin-bottom,0) var(--form-control-margin-left,0)}.form-group-inverse .form-control-icon-wrapper{--icon-color:var(--form-control-inverse-icon-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-group-inverse .form-control-icon-locked-inverse{--icon-color:var(--form-control-inverse-locked-icon-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.form-group-inverse .form-control-error-message{color:var(--form-control-inverse-error-color)}.form-group-inverse .form-control-description{color:var(--form-control-inverse-description-color)}.inline-form-group{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;-ms-flex-wrap:wrap;flex-wrap:wrap}.inline-form-group .form-control-error-message{width:100%;padding-left:var(--form-control-label-inline-padding-right,var(--spacing-s,24px));margin-left:var(--form-control-caption-width,var(--form-control-label-inline-width,25%))}.form-check{margin:var(--form-check-margin-top,0) var(--form-check-margin-right,0) var(--form-check-margin-bottom,var(--spacing-xs,12px)) var(--form-check-margin-left,0);font-family:var(--form-check-font-family);font-weight:var(--font-weight-normal,var(--font-weight,normal));font-size:var(--form-control-font-size)}.form-check:last-of-type{margin-bottom:0}.form-check input[type=checkbox],.form-check input[type=radio]{display:none}.form-check input[type=checkbox]+button,.form-check input[type=checkbox]+label,.form-check input[type=radio]+button,.form-check input[type=radio]+label{position:relative;display:inline-block;text-align:inherit}.form-check input[type=checkbox]+button.position-static,.form-check input[type=checkbox]+label.position-static,.form-check input[type=radio]+button.position-static,.form-check input[type=radio]+label.position-static{display:inline}.form-check input[type=checkbox]+button :after,.form-check input[type=checkbox]+label :after,.form-check input[type=radio]+button :after,.form-check input[type=radio]+label :after{content:none}.form-check input[type=checkbox]+button:after,.form-check input[type=checkbox]+button:before,.form-check input[type=checkbox]+label:after,.form-check input[type=checkbox]+label:before,.form-check input[type=radio]+button:after,.form-check input[type=radio]+button:before,.form-check input[type=radio]+label:after,.form-check input[type=radio]+label:before{content:\"\";position:absolute;display:inline-block}.form-check input[type=checkbox]+button:focus,.form-check input[type=checkbox]+label:focus,.form-check input[type=radio]+button:focus,.form-check input[type=radio]+label:focus{outline:none}.form-check input[type=checkbox]+button:focus:before,.form-check input[type=checkbox]+label:focus:before,.form-check input[type=radio]+button:focus:before,.form-check input[type=radio]+label:focus:before{border-color:var(--form-control-border-color-focus,var(--form-control-focus-border-color,var(--lagoon,#009ad2)))}.form-check.error input[type=checkbox]+label{color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-check.error input[type=checkbox]+label:before{border-color:var(--form-control-font-color-error,var(--form-control-error-color,var(--color-text-danger,var(--text-negative-color,var(--negative,#b32e31)))))}.form-check.warning input[type=checkbox]+label{color:var(--color-text-warning,var(--text-warning-color,var(--warning,#7e5f16)))}.form-check.warning input[type=checkbox]+label:before{border-color:var(--color-text-warning,var(--text-warning-color,var(--warning,#7e5f16)))}.form-control-arrow{pointer-events:none;cursor:pointer;position:absolute;display:block}.form-control-select{font-family:var(--form-control-font-family);font-weight:var(--form-control-font-weight);font-size:var(--form-control-font-size);position:relative;display:block;width:100%;text-align:left;--form-control-margin-top:0;--form-control-margin-bottom:0;--form-control-margin-right:0;--form-control-margin-left:0;--input-min-width:100%;--input-max-width:100%;--input-width:100%}.form-control-select-dropdown{--dropdown-width:var(--form-select-list-width,var(--select-list-width,auto));--dropdown-min-width:var(--form-select-list-min-width,var(--select-list-min-width,250px));--dropdown-max-width:var(--select-list-max-width)}.select-search-input{--input-min-width:100%;--input-max-width:100%;--input-width:100%;--spacing-s:$form-search-input-margin;display:block}.form-control-wrapper{width:var(--select-width,var(--form-control-width,auto));min-width:var(--form-select-min-width,var(--select-min-width,var(--form-control-min-width,250px)));max-width:var(--form-select-max-width,var(--select-max-width,var(--form-control-max-width,100%)))}.form-control-wrapper .form-control{-ms-appearance:none;-moz-appearance:none;-webkit-appearance:none;appearance:none}.form-control-wrapper .form-control::-ms-expand{display:none}.form-control-wrapper .form-control-select{position:relative;text-align:left}.form-control-wrapper .form-control-select .value{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.form-control-wrapper .form-control-select .value .placeholder{color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464))}.form-control-wrapper .form-select-list{list-style:none;overflow-y:auto;overflow-x:hidden;max-height:var(--form-select-list-height,var(--select-list-height,300px));padding:var(--form-select-list-padding,var(--select-list-padding,var(--spacing-xxs,6px)));margin:0;-webkit-box-shadow:var(--form-select-box-shadow,var(--select-box-shadow,var(--form-control-box-shadow)));box-shadow:var(--form-select-box-shadow,var(--select-box-shadow,var(--form-control-box-shadow)));background-clip:padding-box;border-radius:var(--form-select-border-radius,var(--select-border-radius,var(--form-control-border-radius)));border:solid var(--form-select-border-width,var(--select-border-width,var(--form-control-border-width,1px))) var(--form-select-border-color,var(--select-border-color,var(--form-control-border-color,var(--smoke,#919191))))}.form-control-wrapper .form-select-list,.form-control-wrapper .form-select-list .form-select-option{background-color:var(--form-select-option-background,var(--select-option-background,var(--white,#fff)))}.form-control-wrapper .form-select-list .form-select-option{color:var(--form-select-option-color,var(--select-option-color));-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;min-height:var(--form-select-option-min-height,var(--select-option-min-height,var(--form-control-size-m,var(--form-control-height,var(--spacing-m,36px)))));padding:var(--form-select-option-padding,var(--select-option-padding,0 var(--form-control-padding,var(--spacing-xs,12px))));border:var(--form-select-option-border-width,var(--select-option-border-width,1px)) solid var(--form-select-option-border-color,var(--select-option-border-color,transparent));border-bottom:var(--form-select-option-border-width,var(--select-option-border-width,1px)) solid var(--form-select-divider-border-color,var(--select-divider-border-color,transparent))}.form-control-wrapper .form-select-list .form-select-option.form-select-option-sm{min-height:var(--form-control-size-sm,var(--form-control-sm-height,var(--form-control-size-m,var(--form-control-height,var(--spacing-m,36px)))))}.form-control-wrapper .form-select-list .form-select-option[disabled]{background:var(--form-control-background-disabled,var(--alto,#d7d7d7));color:var(--form-control-font-color-disabled,var(--form-control-disabled-color,var(--text-disabled-color,#bebebe)))}.form-control-wrapper .form-select-list .form-select-option:hover:not([disabled]):not(.form-control-disabled){text-decoration:none;cursor:pointer;color:var(--form-select-option-hover-color,var(--select-option-hover-color,var(--item-hovered-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))))));background-color:var(--form-select-option-hover-background,var(--select-option-hover-background,var(--item-hovered-background,var(--mercury,#e6e6e6))))}.form-control-wrapper .form-select-list .form-select-option-selected:not([disabled]):not(.form-control-disabled){text-decoration:none;color:var(--select-option-active-color,var(--form-control-option-active-color,var(--item-selected-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))))));background-color:var(--select-option-active-background,var(--form-control-option-active-background,var(--item-selected-background,var(--ice,#d3eaf3))))}.form-control-wrapper .form-select-list .form-select-option-focused:not([disabled]):not(.form-control-disabled){color:var(--form-select-option-focused-color,var(--select-option-focused-color,var(--item-focused-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))))));border-color:var(--form-select-option-focused-border-color,var(--select-option-focused-border-color,var(--item-focused-border-color,var(--lagoon,#009ad2))))}.form-control-wrapper .form-select-list .form-select-option a{display:inline-block;font-size:inherit}.form-group-button{--button-min-width:var(--form-select-button-min-width,var(--select-button-min-width,100px));--button-max-width:var(--form-select-button-max-width,var(--select-button-max-width,200px));--button-justify-content:var(--form-select-button-justify-content,var(--select-button-justify-content,space-between))}.form-group-button .with-placeholder{--button-primary-color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464));--button-secondary-color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464));--button-tertiary-color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464));--button-inverse-color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464));--button-link-color:var(--form-control-placeholder-color,var(--text-tertiary-color,#646464))}.form-group-button .form-control-wrapper{width:auto;min-width:0}.column-customizer{--drawer-slim-width:var(--column-customizer-drawer-width,20%);--drawer-spacing-s:var(--column-customizer-drawer-spacing-s,var(--spacing-xs,12px));--drawer-spacing-l:var(--column-customizer-drawer-spacing-l,18px);--drawer-headline-4-font-size:1em;--switch-label-padding:0 10px}.column-customizer .dropdown-column-customizer{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box}.column-customizer-hidden{display:none}.column-customizer .form-control-wrapper{width:var(--column-customizer-search-width,100%);max-width:var(--column-customizer-search-max-width,250px);min-width:var(--column-customizer-search-min-width,auto)}.column-customizer-search-input{--input-width:var(--column-customizer-search-width,100%);--input-min-width:var(--column-customizer-search-min-width,auto);--input-max-width:var(--column-customizer-search-max-width,250px)}.column-customizer-search-list .not-found{text-align:center;padding:var(--column-customizer-search-not-found-padding,var(--spacing-xs,12px) var(--spacing-xxs,6px));color:var(--column-customizer-search-not-found-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));font-size:var(--column-customizer-search-not-found-size,var(--form-control-font-size))}.column-customizer-footer-button{--button-margin-left:var(--spacing-xs,12px)}.columns{font-size:var(--column-customizer-font-size,var(--font-size,16px));font-weight:var(--column-customizer-font-weight,var(--font-weight-normal,var(--font-weight,normal)));list-style-type:none;padding:0;margin:0}.columns,.columns-item{font-family:var(--column-customizer-font-family)}.columns-item{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;border-bottom:var(--column-customizer-item-border-width,1px) solid var(--column-customizer-item-border-color,var(--form-control-border-color,var(--smoke,#919191)))}.columns-item-icon{--icon-padding-md:0px;--icon-primary-color:var(--column-customizer-icon-color,var(--stone,#bebebe));width:var(--column-customizer-icon-width,var(--spacing-m,36px));-ms-flex-negative:0;flex-shrink:0}.columns-item-icon.drag-handle{cursor:-webkit-grab;cursor:grab}.columns-item span{display:inline-block;padding-top:var(--column-customizer-item-padding,var(--spacing-xs,12px));padding-bottom:var(--column-customizer-item-padding,var(--spacing-xs,12px))}.columns-item-switch{--switch-on-background:var(--column-customizer-switch-on-background,var(--steel,#0478c4));--switch-off-background:var(--column-customizer-switch-off-background,var(--smoke,#919191));margin-left:auto;margin-right:var(--column-customizer-item-padding,var(--spacing-xs,12px))}.columns-item-selected{color:var(--select-option-active-color,var(--form-control-option-active-color,var(--item-selected-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))))));background-color:var(--select-option-active-background,var(--form-control-option-active-background,var(--item-selected-background,var(--ice,#d3eaf3))))}.columns.locked{padding-top:calc(var(--column-customizer-item-padding, var(--spacing-xs, 12px)) / 2);padding-bottom:calc(var(--column-customizer-item-padding, var(--spacing-xs, 12px)) / 2);border-bottom:var(--column-customizer-item-border-width,1px) solid var(--column-customizer-item-border-color,var(--form-control-border-color,var(--smoke,#919191)))}.columns.locked .columns-item{border-bottom:0;min-height:var(--colums-item-min-height,36px)}.columns.locked .columns-item-icon{--icon-primary-color:var(--column-customizer-locked-icon-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))))}.columns.locked .columns-item span{padding-top:calc(var(--column-customizer-item-padding, var(--spacing-xs, 12px)) / 2);padding-bottom:calc(var(--column-customizer-item-padding, var(--spacing-xs, 12px)) / 2)}.gu-mirror{cursor:-webkit-grabbing;cursor:grabbing}.gu-mirror .columns-item-switch{display:none}"; },
        enumerable: true,
        configurable: true
    });
    return WfColumnsCustomizer;
}());
__decorate([
    PrefixEvent()
], WfColumnsCustomizer.prototype, "change", void 0);
__decorate([
    PrefixEvent()
], WfColumnsCustomizer.prototype, "close", void 0);
export { WfColumnsCustomizer as wf_columns_customizer };