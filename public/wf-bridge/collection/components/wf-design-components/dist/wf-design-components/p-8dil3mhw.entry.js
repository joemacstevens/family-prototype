import{r as s,h as t}from"./p-5f633ccc.js";import{g as n}from"./p-d6b78d37.js";const c=class{constructor(t){s(this,t),this.size="md",this.scalable=!0,this.svgContent=null}async componentWillRender(){const{name:s,size:t}=this;try{this.svgContent=await n(s,t)}catch(c){this.svgContent=null,console.error(c)}}render(){const{size:s,type:n,scalable:c,svgContent:i}=this;return i?t("div",{class:{icon:!0,[`icon-${s}`]:!!s,"icon-scalable":c,[`icon-${n}`]:!!n},innerHTML:i}):null}static get style(){return".icon{background:var(--icon-primary-background-color,transparent);display:-ms-inline-flexbox;display:inline-flex;overflow:hidden;border-radius:var(--icon-border-radius,50%);padding:var(--icon-padding-md,18px)}.icon svg{display:block}.icon.icon-scalable svg{height:var(--icon-size-md,36px);width:var(--icon-size-md,36px)}.icon.icon-scalable.icon-xxs{padding:var(--icon-padding-xxs,2px)}.icon.icon-scalable.icon-xxs svg{height:var(--icon-size-xxs,12px);width:var(--icon-size-xxs,12px)}.icon.icon-scalable.icon-xs{padding:var(--icon-padding-xs,4px)}.icon.icon-scalable.icon-xs svg{height:var(--icon-size-xs,16px);width:var(--icon-size-xs,16px)}.icon.icon-scalable.icon-sm{padding:var(--icon-padding-sm,6px)}.icon.icon-scalable.icon-sm svg{height:var(--icon-size-sm,24px);width:var(--icon-size-sm,24px)}.icon.icon-scalable.icon-md{padding:var(--icon-padding-md,18px)}.icon.icon-scalable.icon-md svg{height:var(--icon-size-md,36px);width:var(--icon-size-md,36px)}.icon.icon-scalable.icon-lg{padding:var(--icon-padding-lg,12px)}.icon.icon-scalable.icon-lg svg{height:var(--icon-size-lg,72px);width:var(--icon-size-lg,72px)}.icon.icon-scalable.icon-xl{padding:var(--icon-padding-xl,12px)}.icon.icon-scalable.icon-xl svg{height:var(--icon-size-xl,96px);width:var(--icon-size-xl,96px)}.icon-primary{background:var(--icon-primary-background-color,transparent)}.icon-primary svg{--icon-color:var(--icon-primary-color,#1c1c1c)}.icon-secondary{background:var(--icon-secondary-background-color,#eee)}.icon-secondary svg{--icon-color:var(--icon-secondary-color,#646464)}.icon-success{background:var(--icon-success-background-color,transparent)}.icon-success svg{--icon-color:var(--icon-success-color,#498100)}.icon-info{background:var(--icon-info-background-color,transparent)}.icon-info svg{--icon-color:var(--icon-info-color,#007099)}.icon-danger{background:var(--icon-danger-background-color,transparent)}.icon-danger svg{--icon-color:var(--icon-danger-color,#c81219)}.icon-warning{background:var(--icon-warning-background-color,transparent)}.icon-warning svg{--icon-color:var(--icon-warning-color,#c81219)}.icon-inverse{background:var(--icon-inverse-background-color,#1c1c1c)}.icon-inverse svg{--icon-color:var(--icon-inverse-color,#fff)}.icon-inverse-simple{background:none}.icon-inverse-simple svg{--icon-color:var(--icon-inverse-color,#fff)}"}};export{c as wf_icon};