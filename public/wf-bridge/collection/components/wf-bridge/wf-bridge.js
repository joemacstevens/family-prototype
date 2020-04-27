import { h } from "@stencil/core";
import WFCallbacks from "./wf-callbacks";
import "../wf-design-components/dist/collection/assets/js/runtime-mocks.js";
import "../wf-design-components/dist/collection/assets/js/register-aliases.js";
import "../wf-design-components/dist/collection/skins/ubs/scripts.js";
const WF_FONTS_SRC = "css/fonts.css";
const WF_SKINS_PATH = "skins";
const WF_SKINS_STYLES_SRC = "styles.css";
const WF_SKINS_ASSET_CONFIG_SRC = "scripts.js";
const WF_STYLES_SRC = "wf-bridge/collection/components/wf-design-components/dist/wf-styles.css";
const WF_DESIGN_COMPONENT_MODULE_SRC = "wf-bridge/collection/components/wf-design-components/dist/wf-design-components/wf-design-components.esm.js";
const WF_DESIGN_COMPONENT_SRC = "wf-bridge/collection/components/wf-design-components/dist/wf-design-components/wf-design-components.js";
function getBaseUrl() {
    const bridgeScript = document.querySelector('script[src*="wf-bridge.js"]');
    const url = new URL(bridgeScript.src);
    return url.pathname.match(/(.*?)\/wf-bridge\//)[1];
}
function cssLoader(pathToFile) {
    const cssElement = document.createElement("link");
    cssElement.setAttribute("rel", "stylesheet");
    cssElement.setAttribute("type", "text/css");
    cssElement.href = `${getBaseUrl()}/${pathToFile}`;
    document.head.appendChild(cssElement);
}
function scriptLoader(pathToFile, type = "") {
    const scriptElement = document.createElement("script");
    if (type) {
        scriptElement.setAttribute("type", type);
    }
    scriptElement.src = `${getBaseUrl()}/${pathToFile}`;
    document.head.appendChild(scriptElement);
}
function updateAssetConfigs(theme) {
    const keys = Object.keys(window.config.assets);
    const baseUrl = getBaseUrl();
    keys.forEach((key) => {
        let path = window.config.assets[key];
        if (theme !== 'ubs') {
            path = path.replace('/skins/ubs/icons/', `/skins/${theme}/icons/`);
        }
        if (!path.includes(baseUrl)) {
            window.config.assets[key] = `${baseUrl}/${path}`;
        }
    });
}
export class WFBridge {
    constructor() {
        this.theme = "ubs";
    }
    componentWillLoad() {
        cssLoader(WF_FONTS_SRC);
        cssLoader(`${WF_SKINS_PATH}/${this.theme}/${WF_SKINS_STYLES_SRC}`);
        scriptLoader(`${WF_SKINS_PATH}/${this.theme}/${WF_SKINS_ASSET_CONFIG_SRC}`);
        updateAssetConfigs(this.theme);
        cssLoader(WF_STYLES_SRC);
        scriptLoader(WF_DESIGN_COMPONENT_MODULE_SRC, "module");
        scriptLoader(WF_DESIGN_COMPONENT_SRC, "nomodule");
    }
    componentDidRender() {
        const children = Array.prototype.slice.call(this.host.children);
        children.length > 0 &&
            children.forEach(element => {
                Object.entries(WFCallbacks).forEach(([callbackName, callback]) => {
                    element[callbackName] = callback;
                });
            });
    }
    render() {
        return (h("div", null,
            h("slot", null)));
    }
    static get is() { return "wf-bridge"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "theme": {
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
                "text": ""
            },
            "attribute": "theme",
            "reflect": false,
            "defaultValue": "\"ubs\""
        }
    }; }
    static get elementRef() { return "host"; }
}
