import { r as registerInstance, c as createEvent, h } from './core-2ee2b62e.js';
import { g as getIconBody } from './svg-60a44df6.js';

const WfActionIcon = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** The size of the icon */
        this.size = 'sm';
        /** Decide if icon can change the size */
        this.scalable = true;
        /** Defines if icon has bounding circle */
        this.bounding = false;
        /** Defines if icon has property open */
        this.open = false;
        this.svgContent = '';
        this.handleClick = () => {
            this.wfClick.emit();
        };
        this.wfClick = createEvent(this, "wfClick", 7);
        this.docClick = createEvent(this, "click", 7);
        this.docWfClick = createEvent(this, "wfClick", 7);
    }
    async componentWillRender() {
        const { name, size } = this;
        try {
            this.svgContent = await getIconBody(name, size);
        }
        catch (e) {
            this.svgContent = '';
            console.error(e);
        }
    }
    render() {
        const { size, scalable, variant, open, svgContent, bounding, handleClick } = this;
        const iconClasses = {
            icon: true,
            [`icon-${size}`]: !!size,
            [`icon-scalable`]: scalable,
            [`icon-${variant}`]: !!variant,
            [`icon-bounding`]: !!bounding,
            [`icon-open`]: !!open,
        };
        return svgContent ? (h("div", { class: iconClasses }, h("button", { type: "button", onClick: handleClick, innerHTML: svgContent }))) : null;
    }
    static get style() { return ".icon{display:-ms-inline-flexbox;display:inline-flex;overflow:hidden;padding:0;border-radius:50%}.icon button{display:block;cursor:pointer;border:none;margin:0;padding:0;color:inherit;font:inherit;text-align:inherit;line-height:normal;overflow:visible;background-color:transparent;-webkit-appearance:none;position:relative}.icon button:before{z-index:1}.icon button:after,.icon button:before{content:\"\";position:absolute;left:0;right:0;top:0;bottom:0}.icon button:after{z-index:2}.icon button:focus{outline:none}.icon button svg{display:block;position:relative;z-index:3;--icon-color:var(--action-icon-color,var(--text-color,#1c1c1c))}.icon.icon-scalable.icon-xs button{padding:var(--icon-padding-xs,4px)}.icon.icon-scalable.icon-xs svg{height:var(--icon-size-xs,16px);width:var(--icon-size-xs,16px)}.icon.icon-scalable.icon-sm button{padding:var(--icon-padding-sm,6px)}.icon.icon-scalable.icon-sm svg{height:var(--icon-size-sm,24px);width:var(--icon-size-sm,24px)}.icon.icon-bounding button:before{background-color:var(--action-icon-background-color,transparent);mix-blend-mode:var(--action-icon-blend-mode,normal)}.icon.icon-bounding button:after{background-color:var(--action-icon-overlay-background-color,transparent);mix-blend-mode:var(--action-icon-overlay-blend-mode,var(--action-icon-blend-mode,normal))}.icon:hover button:before{background-color:var(--action-icon-hover-background-color,var(--action-icon-background-color,transparent));mix-blend-mode:var(--action-icon-hover-blend-mode,var(--action-icon-blend-mode,normal))}.icon:hover button:after{background-color:var(--action-icon-overlay-hover-background-color,var(--action-icon-overlay-background-color,transparent));mix-blend-mode:var(--action-icon-overlay-hover-blend-mode,var(--action-icon-overlay-blend-mode,var(--action-icon-blend-mode,normal)))}.icon:hover button svg{--icon-color:var(--action-icon-hover-color,var(--action-icon-color,var(--text-color,#1c1c1c)))}.icon:active button:before{background-color:var(--action-icon-active-background-color,var(--action-icon-background-color,transparent));mix-blend-mode:var(--action-icon-active-blend-mode,var(--action-icon-blend-mode,normal))}.icon:active button:after{background-color:var(--action-icon-overlay-active-background-color,var(--action-icon-overlay-background-color,transparent));mix-blend-mode:var(--action-icon-overlay-active-blend-mode,var(--action-icon-overlay-blend-mode,var(--action-icon-blend-mode,normal)))}.icon:active button svg{--icon-color:var(--action-icon-active-color,var(--action-icon-color,var(--text-color,#1c1c1c)))}.icon.icon-open button:before{background-color:var(--action-icon-open-background-color,var(--action-icon-background-color,transparent));mix-blend-mode:var(--action-icon-open-blend-mode,var(--action-icon-blend-mode,normal))}.icon.icon-open button:after{background-color:var(--action-icon-overlay-open-background-color,var(--action-icon-overlay-background-color,transparent));mix-blend-mode:var(--action-icon-overlay-open-blend-mode,var(--action-icon-overlay-blend-mode,var(--action-icon-blend-mode,normal)))}.icon.icon-open button svg{--icon-color:var(--action-icon-open-color,var(--action-icon-color,var(--text-color,#1c1c1c)))}.icon-inverse.icon-bounding button:before{background-color:var(--action-icon-inverse-background-color,transparent);mix-blend-mode:var(--action-icon-inverse-blend-mode,normal)}.icon-inverse.icon-bounding button:after{background-color:var(--action-icon-inverse-overlay-background-color,transparent);mix-blend-mode:var(--action-icon-inverse-overlay-blend-mode,var(--action-icon-blend-mode,normal))}.icon-inverse button svg{--icon-color:var(--action-icon-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))))}.icon-inverse:hover button:before{background-color:var(--action-icon-inverse-hover-background-color,var(--action-icon-inverse-background-color,transparent));mix-blend-mode:var(--action-icon-inverse-hover-blend-mode,var(--action-icon-inverse-blend-mode,normal))}.icon-inverse:hover button:after{background-color:var(--action-icon-inverse-overlay-hover-background-color,var(--action-icon-inverse-overlay-background-color,transparent));mix-blend-mode:var(--action-icon-inverse-overlay-hover-blend-mode,var(--action-icon-inverse-overlay-blend-mode,var(--action-icon-blend-mode,normal)))}.icon-inverse:hover button svg{--icon-color:var(--action-icon-inverse-hover-color,var(--action-icon-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff)))))}.icon-inverse:active button:before{background-color:var(--action-icon-inverse-active-background-color,var(--action-icon-inverse-background-color,transparent));mix-blend-mode:var(--action-icon-inverse-active-blend-mode,var(--action-icon-inverse-blend-mode,normal))}.icon-inverse:active button:after{background-color:var(--action-icon-inverse-overlay-active-background-color,var(--action-icon-inverse-overlay-background-color,transparent));mix-blend-mode:var(--action-icon-inverse-overlay-active-blend-mode,var(--action-icon-inverse-overlay-blend-mode,var(--action-icon-blend-mode,normal)))}.icon-inverse:active button svg{--icon-color:var(--action-icon-inverse-active-color,var(--action-icon-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff)))))}.icon-inverse.icon-open button:before{background-color:var(--action-icon-inverse-open-background-color,var(--action-icon-inverse-background-color,transparent));mix-blend-mode:var(--action-icon-inverse-open-blend-mode,var(--action-icon-inverse-blend-mode,normal))}.icon-inverse.icon-open button:after{background-color:var(--action-icon-inverse-overlay-open-background-color,var(--action-icon-inverse-overlay-background-color,transparent));mix-blend-mode:var(--action-icon-inverse-overlay-open-blend-mode,var(--action-icon-inverse-overlay-blend-mode,var(--action-icon-blend-mode,normal)))}.icon-inverse.icon-open button svg{--icon-color:var(--action-icon-inverse-open-color,var(--action-icon-inverse-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff)))))}:host(.trigger-active) .icon button:before{background-color:var(--action-icon-active-background-color,var(--action-icon-background-color,transparent));mix-blend-mode:var(--action-icon-active-blend-mode,var(--action-icon-blend-mode,normal))}:host(.trigger-active) .icon button:after{background-color:var(--action-icon-overlay-active-background-color,var(--action-icon-overlay-background-color,transparent));mix-blend-mode:var(--action-icon-overlay-active-blend-mode,var(--action-icon-overlay-blend-mode,var(--action-icon-blend-mode,normal)))}"; }
};

export { WfActionIcon as wf_action_icon };
