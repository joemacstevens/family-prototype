import { h } from "@stencil/core";
import debounce from 'lodash.debounce';
import { observeIntersection } from '../../utils/observe-intersection';
import { observeResize } from '../../utils/observe-resize';
import { observeMutation } from '../../utils/observe-mutation';
export class WfScrollbar {
    constructor() {
        /** Define scrollbar type. */
        this.type = 'vertical';
        /** Define attribute name that will be added to scroll parent. */
        this.parentAttr = '*[wf-scroll-parent], *[brml-scroll-parent]';
        /** Scrolling content calculated height */
        this.contentHeight = 'auto';
        this.setContentHeight = debounce((parent) => {
            const { staticHeight } = this;
            if (staticHeight)
                return;
            const scrollWrapperHeight = this.getAvailableHeight(parent);
            const selfSize = this.host.querySelector('.scroll-element').getBoundingClientRect().height;
            if (scrollWrapperHeight <= 0) {
                this.contentHeight = `${selfSize + scrollWrapperHeight}px`;
            }
        }, 200);
    }
    addIntersectionObserver(element, parent) {
        observeIntersection(element, (entries) => {
            if (entries[0].isIntersecting === true) {
                this.setContentHeight(parent);
            }
        }, { threshold: [0] });
    }
    addResizeObserver(element) {
        observeResize(element, () => {
            this.contentHeight = 'auto';
            this.setContentHeight(element);
        });
    }
    addMutationObserver(element) {
        observeMutation(element, () => {
            this.contentHeight = 'auto';
            this.setContentHeight(element);
        }, { childList: true });
    }
    getDirectChildrenHeight(parent) {
        let heightSum = 0;
        const children = parent.children;
        const allChildNodes = parent.childNodes;
        if (allChildNodes.length !== children.length) {
            allChildNodes.forEach((child) => {
                if (child.nodeName === '#text') {
                    const range = document.createRange();
                    range.selectNodeContents(child);
                    const rect = range.getBoundingClientRect();
                    heightSum += rect.height;
                }
            });
        }
        let childrenArray = [];
        childrenArray = Array.from(children);
        heightSum += childrenArray.reduce((sum, children) => sum + children.getBoundingClientRect().height, 0);
        return heightSum;
    }
    getParentByAttr(element, attributeName) {
        return element.closest(attributeName) || element.parentElement;
    }
    getAvailableHeight(parent) {
        const parentStyle = window.getComputedStyle(parent);
        const parentPaddings = parseInt(parentStyle.paddingTop) + parseInt(parentStyle.paddingBottom);
        const childrenHeight = this.getDirectChildrenHeight(parent);
        return parent.getBoundingClientRect().height - parentPaddings - childrenHeight;
    }
    componentDidLoad() {
        const { parentAttr, host, type } = this;
        if (type !== 'horizontal') {
            const parent = this.getParentByAttr(host, parentAttr);
            this.addIntersectionObserver(host, parent);
            this.addMutationObserver(parent);
            this.addResizeObserver(parent);
        }
    }
    render() {
        const { type, contentHeight, staticHeight } = this;
        const stylesHorizontal = {
            width: '100%',
            ['overflow-x']: 'auto',
        };
        const stylesVertical = {
            height: !!staticHeight ? staticHeight : contentHeight,
            ['min-height']: '50px',
            ['overflow-y']: 'auto',
        };
        const styles = type === 'horizontal' ? stylesHorizontal : stylesVertical;
        const combinedStyles = type === 'both' ? Object.assign(Object.assign({}, stylesHorizontal), stylesVertical) : styles;
        return (h("div", { class: "scroll-element", style: Object.assign({}, combinedStyles) },
            h("slot", null)));
    }
    static get is() { return "wf-scrollbar"; }
    static get properties() { return {
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ScrollType",
                "resolved": "\"both\" | \"horizontal\" | \"vertical\"",
                "references": {
                    "ScrollType": {
                        "location": "import",
                        "path": "./types"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Define scrollbar type."
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "'vertical'"
        },
        "parentAttr": {
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
                "text": "Define attribute name that will be added to scroll parent."
            },
            "attribute": "parentattr",
            "reflect": false,
            "defaultValue": "'*[wf-scroll-parent], *[brml-scroll-parent]'"
        },
        "staticHeight": {
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
                "text": "Define static height of scrolling content. If set, content height won't be recalculated."
            },
            "attribute": "staticheight",
            "reflect": false
        }
    }; }
    static get states() { return {
        "contentHeight": {}
    }; }
    static get elementRef() { return "host"; }
}
