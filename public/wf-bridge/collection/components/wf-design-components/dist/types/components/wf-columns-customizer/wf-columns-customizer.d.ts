import { EventEmitter } from '../../stencil.core';
import { TableColumns } from '../wf-table/types';
import { JSXElement } from '@babel/types';
import { DragManager } from '../../utils/drag-manager';
import { IconSize } from '../wf-icon/types';
import { ButtonSize } from '../wf-button/types';
import { InputSize } from '../wf-input/types';
export declare class WfColumnsCustomizer {
    host: HTMLElement;
    /** Define if customizer drawer is opened */
    opened: boolean;
    /** Header text */
    header: string;
    /** Columns definition object. Should be created from wf-table columns definition. */
    defaultColumns: TableColumns[] | string;
    /** Dragging icon name */
    icon: string;
    /** Dragging icon size */
    iconSize: IconSize;
    /** Size of action buttons */
    buttonSize: ButtonSize;
    /** Search/jump to input icon name */
    searchInputIcon: string;
    /** Search/jump to input icon size */
    searchInputIconSize: IconSize;
    /** Search/jump to input size*/
    searchInputSize: InputSize;
    /** Search/jump to input label*/
    searchInputLabel: string;
    /** Search/jump to input placeholder*/
    searchInputPlaceholder: string;
    /** Limit of search/jump to list items */
    maxSearchItems: number;
    /** Search/jump to input value */
    searchStr: string;
    /** Define if search/jump to should be visible */
    enableSearch: boolean;
    /** Change event */
    change: EventEmitter<TableColumns[]>;
    /** Close event */
    close: EventEmitter<void>;
    docChange: EventEmitter<TableColumns[]>;
    docWfChange: EventEmitter<TableColumns[]>;
    docClose: EventEmitter<void>;
    docWfClose: EventEmitter<void>;
    editedColumns: TableColumns[];
    dragManager: DragManager;
    dropdown: HTMLWfDropdownElement;
    selectedColumnInputElement: HTMLWfInputElement;
    selectedColumn: TableColumns;
    searchIntialValue: string;
    selectedClassName: string;
    constructor();
    handlerDrawerClose(): void;
    handleDropdownChange(event: CustomEvent): void;
    handleDragChangeEvent(ev: any): void;
    updateDefaultColumns(): void;
    handleSwitchChange(column: TableColumns, event: CustomEvent): void;
    handleSearchInput(event: CustomEvent): void;
    handleOnCancelClick(): void;
    handleOnSaveClick(): void;
    handleSetSelectedColumn(column: TableColumns, event: any): void;
    handleSelectedItemHighlight(column: any, className: any): void;
    componentWillLoad(): void;
    componentDidRender(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    getColumnCopy(): void;
    getHost(): HTMLElement;
    toggleSearchVisibility(): void;
    toggleInputValue(opened: boolean): void;
    removeItemsSelectedClass(columnsClassName: any, columnsSelectedClass: any): void;
    handleKeyDown(e: KeyboardEvent): void;
    rerenderListOrder(): TableColumns[];
    renderArrayFromList(): number[];
    findLockedColumns(): TableColumns[];
    findEditableColumns(): TableColumns[];
    renderLockedColumn(column: any): JSXElement;
    renderEditableColumn(column: any, index: any): any;
    findSearchStrInValue(searchStr: string, value: string): boolean;
    renderFilteredColumnsList(): any;
    render(): any;
}
