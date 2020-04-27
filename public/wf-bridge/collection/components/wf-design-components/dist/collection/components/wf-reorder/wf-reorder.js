import { h } from "@stencil/core";
import { parseArrayProperty } from '../../utils/utils';
import { DragManager } from '../../utils/drag-manager';
export class WfReorder {
    constructor() {
        /** Dragging icon name */
        this.icon = 'wf-drag';
        /** Dragging icon size */
        this.iconSize = 'sm';
    }
    componentWillLoad() {
        const { data, columns } = this;
        this.dragManager = new DragManager('drag-handle');
        this.updateColumnData(columns);
        this.updateData(data);
    }
    componentDidRender() {
        const { dragManager, dragArea } = this;
        dragManager.initContainer(dragArea, {
            onEnd: async () => this.change.emit(await this.getOrder()),
        });
    }
    componentDidUnload() {
        this.dragManager.unload();
    }
    updateData(data) {
        this.parsedData = data ? parseArrayProperty(data) : [];
        this.dragManager.resetDraggable();
    }
    updateColumnData(columns) {
        this.parsedColumnData = columns ? parseArrayProperty(columns) : [];
    }
    async resetToDefault() {
        this.dragManager.resetDraggable();
    }
    async getOrder() {
        return this.dragManager.getCurrentOrder().map((i) => this.parsedData[i]);
    }
    render() {
        const { parsedColumnData, parsedData, icon, iconSize } = this;
        return (h("div", { class: "reorder-responsive" },
            h("table", null,
                h("thead", null,
                    h("tr", null,
                        h("th", { scope: "col" }),
                        parsedColumnData.map((column) => (h("th", { scope: "col" },
                            " ",
                            column.headerName,
                            " "))))),
                h("tbody", { ref: (el) => (this.dragArea = el) }, parsedData.map((dataItem, index) => (h("tr", { "data-id": index, key: index },
                    h("td", null,
                        h("wf-icon", { class: "columns-item-icon drag-handle", name: icon, size: iconSize })),
                    parsedColumnData.map((column) => (h("td", null,
                        " ",
                        dataItem[column.field],
                        " "))))))))));
    }
    static get is() { return "wf-reorder"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../styles/components/reorder/main.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../styles/components/reorder/main.css"]
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
                        "path": "../wf-table/types"
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
                "original": "any[] | string",
                "resolved": "any[] | string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Array of data"
            },
            "attribute": "data",
            "reflect": false
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
        }
    }; }
    static get states() { return {
        "parsedColumnData": {},
        "parsedData": {}
    }; }
    static get events() { return [{
            "method": "change",
            "name": "change",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Event fired on the drop"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "docWfChange",
            "name": "wfChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Event fired on the drop"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "resetToDefault": {
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
                "text": "",
                "tags": []
            }
        },
        "getOrder": {
            "complexType": {
                "signature": "() => Promise<any>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<any>"
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
            "propName": "columns",
            "methodName": "updateColumnData"
        }]; }
}
