import { r as registerInstance, h } from './core-2ee2b62e.js';
import { g as getIconBody } from './svg-60a44df6.js';

const WfIcon = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** The size of the icon */
        this.size = 'md';
        /** Decide if icon can change the size */
        this.scalable = true;
        this.svgContent = null;
    }
    async componentWillRender() {
        const { name, size } = this;
        try {
            this.svgContent = await getIconBody(name, size);
        }
        catch (e) {
            this.svgContent = null;
            console.error(e);
        }
    }
    render() {
        const { size, type, scalable, svgContent } = this;
        const iconClasses = {
            icon: true,
            [`icon-${size}`]: !!size,
            [`icon-scalable`]: scalable,
            [`icon-${type}`]: !!type,
        };
        return svgContent ? h("div", { class: iconClasses, innerHTML: svgContent }) : null;
    }
    static get style() { return ".icon{background:var(--icon-primary-background-color,transparent);display:-ms-inline-flexbox;display:inline-flex;overflow:hidden;border-radius:var(--icon-border-radius,50%);padding:var(--icon-padding-md,18px)}.icon svg{display:block}.icon.icon-scalable svg{height:var(--icon-size-md,36px);width:var(--icon-size-md,36px)}.icon.icon-scalable.icon-xxs{padding:var(--icon-padding-xxs,2px)}.icon.icon-scalable.icon-xxs svg{height:var(--icon-size-xxs,12px);width:var(--icon-size-xxs,12px)}.icon.icon-scalable.icon-xs{padding:var(--icon-padding-xs,4px)}.icon.icon-scalable.icon-xs svg{height:var(--icon-size-xs,16px);width:var(--icon-size-xs,16px)}.icon.icon-scalable.icon-sm{padding:var(--icon-padding-sm,6px)}.icon.icon-scalable.icon-sm svg{height:var(--icon-size-sm,24px);width:var(--icon-size-sm,24px)}.icon.icon-scalable.icon-md{padding:var(--icon-padding-md,18px)}.icon.icon-scalable.icon-md svg{height:var(--icon-size-md,36px);width:var(--icon-size-md,36px)}.icon.icon-scalable.icon-lg{padding:var(--icon-padding-lg,12px)}.icon.icon-scalable.icon-lg svg{height:var(--icon-size-lg,72px);width:var(--icon-size-lg,72px)}.icon.icon-scalable.icon-xl{padding:var(--icon-padding-xl,12px)}.icon.icon-scalable.icon-xl svg{height:var(--icon-size-xl,96px);width:var(--icon-size-xl,96px)}.icon-primary{background:var(--icon-primary-background-color,transparent)}.icon-primary svg{--icon-color:var(--icon-primary-color,#1c1c1c)}.icon-secondary{background:var(--icon-secondary-background-color,#eee)}.icon-secondary svg{--icon-color:var(--icon-secondary-color,#646464)}.icon-success{background:var(--icon-success-background-color,transparent)}.icon-success svg{--icon-color:var(--icon-success-color,#498100)}.icon-info{background:var(--icon-info-background-color,transparent)}.icon-info svg{--icon-color:var(--icon-info-color,#007099)}.icon-danger{background:var(--icon-danger-background-color,transparent)}.icon-danger svg{--icon-color:var(--icon-danger-color,#c81219)}.icon-warning{background:var(--icon-warning-background-color,transparent)}.icon-warning svg{--icon-color:var(--icon-warning-color,#c81219)}.icon-inverse{background:var(--icon-inverse-background-color,#1c1c1c)}.icon-inverse svg{--icon-color:var(--icon-inverse-color,#fff)}.icon-inverse-simple{background:none}.icon-inverse-simple svg{--icon-color:var(--icon-inverse-color,#fff)}"; }
};

export { WfIcon as wf_icon };
