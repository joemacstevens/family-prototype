export class WfSpy {
    /**
     * Target to be disposed when spy is removed from DOM
     */
    componentDidUnload() {
        if (!this.target) {
            return;
        }
        this.target.remove();
    }
    static get is() { return "wf-spy"; }
    static get properties() { return {
        "target": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "HTMLElement",
                "resolved": "HTMLElement",
                "references": {
                    "HTMLElement": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "HTML element to track"
            }
        }
    }; }
}
