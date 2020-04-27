import{r as t,c as s,h as i,g as e}from"./p-5f633ccc.js";import"./p-74149bb1.js";import{h as o}from"./p-6675dcbc.js";import{P as r}from"./p-f02f0fad.js";import{o as n}from"./p-17dc0833.js";import{h,e as l,q as c,m as a,d as p,f as d}from"./p-d5bb5fa2.js";const m=class{constructor(s){t(this,s)}componentDidUnload(){this.target&&this.target.remove()}},u={columns:3,rows:3},w=class{constructor(i){t(this,i),this.distance=10,this.closeTimeout=(()=>{let t;return{set:(s,i,...e)=>{t=window.setTimeout(s,i,...e)},clear:()=>{t&&window.clearTimeout(t)}}})(),this.spaces={vertical:"bottom",horizontal:"center"},this.type="default",this.trigger="hover",this.timeout=0,this.opened=!1,this.width="standard",this.detached=!1,this.updatePosition=()=>{const{opened:t,triggerEl:s,tooltipEl:i,distance:e}=this;if(!t||!i.classList.contains("show"))return;const r=h(s,i,u,e,this.getDefaultSpaces());this.tryAdjustSpaces(r.spaces),i.style.top=o(r.placement.top),i.style.left=o(r.placement.left),i.style.willChange="top, left"},this.mouseEnterListener=()=>this.handleEvent("hover",!0),this.mouseLeaveListener=()=>this.handleEvent("hover",!1),this.clickListener=()=>this.handleEvent("click",!this.opened),this.docClose=s(this,"close",7),this.docWfClose=s(this,"wfClose",7)}openHandle(t,s){t!==s&&this.toggleTooltip(t)}toggleTooltip(t){t?(this.show(),this.timeout>0&&this.setupTimeout(this.timeout)):this.hide()}toggleTriggerActiveClass(t){const s="trigger-active",i=this.getElementsFromSlot();for(const e of i)t?e.classList.add(s):e.classList.remove(s)}show(){const{tooltipEl:t}=this;t.classList.add("show"),this.toggleTriggerActiveClass(!0),this.closeTimeout.clear(),this.animationFrameRunner.start()}hide(){const{tooltipEl:t}=this;t.classList.remove("show"),this.opened=!1,this.close.emit(),this.toggleTriggerActiveClass(!1),this.animationFrameRunner.stop()}setupTimeout(t){this.closeTimeout.clear(),this.closeTimeout.set(()=>{this.hide()},t)}clickOutside(t){if(!this.opened||"click"!==this.trigger)return;let s=[];t.composedPath&&(s=t.composedPath());const i=[this.host,this.tooltipEl,this.triggerEl];s.some(t=>i.includes(t))||this.hide()}placementHandle(t,s){t!==s&&this.updateSpaces(t)}updateSpaces(t){this.spaces={top:{vertical:"bottom",horizontal:"center"},bottom:{vertical:"top",horizontal:"center"},left:{vertical:"middle",horizontal:"right"},right:{vertical:"middle",horizontal:"left"}}[t]}componentWillLoad(){const{updatePosition:t,placement:s}=this;this.animationFrameRunner=(t=>{let s;const i=()=>{t(),s=window.requestAnimationFrame(i)};return{start:()=>{s=window.requestAnimationFrame(i)},stop:()=>{s&&window.cancelAnimationFrame(s)}}})(t),s&&this.updateSpaces(s)}getDefaultSpaces(){const{placement:t}=this;if(t)return this.spaces}tryAdjustSpaces(t){const{spaces:s}=this;s.horizontal===t.horizontal&&s.vertical===t.vertical||(this.spaces=t)}componentDidLoad(){const{opened:t}=this;this.setupTriggerElement(),this.tooltipEl=this.host.shadowRoot.querySelector(".tooltip-wrapper"),window.getComputedStyle(this.tooltipEl).paddingTop&&(this.distance=parseInt(window.getComputedStyle(this.tooltipEl).paddingTop,10)),t&&(this.toggleTooltip(!0),this.animationFrameRunner.start())}setupTriggerElement(){if(this.detached){const t=this.getElementsFromSlot();if(0===t.length)throw new Error(l.NOT_FOUND_DETACHED_ELEMENT);if(t.length>1)throw new Error(l.MORE_THAN_ONE_ELEMENT);this.triggerEl=t[0],this.detachHost()}else this.triggerEl=this.host.shadowRoot.querySelector(".tooltip-trigger");this.addEventListeners(),this.addIntersectionObserver()}getElementsFromSlot(){const t=c(this.host,".tooltip-trigger>>slot");return t?t.assignedElements():[]}detachHost(){a(this.host,this.triggerEl),p(this.host,this.triggerEl),d(this.host)}handleEvent(t,s){this.trigger===t&&this.opened!==s&&(this.opened=s)}addEventListeners(){const{triggerEl:t,mouseEnterListener:s,mouseLeaveListener:i,clickListener:e}=this;t.addEventListener("mouseenter",s),t.addEventListener("mouseleave",i),t.addEventListener("click",e)}addIntersectionObserver(){const{triggerEl:t}=this;n(t,t=>{this.opened&&(!0===t[0].isIntersecting?(this.tooltipEl.classList.add("show"),this.updatePosition()):this.tooltipEl.classList.remove("show"))},{threshold:[0]})}componentDidUnload(){const{animationFrameRunner:t,triggerEl:s,mouseEnterListener:i,mouseLeaveListener:e,clickListener:o}=this;t.stop(),s.removeEventListener("mouseenter",i),s.removeEventListener("mouseleave",e),s.removeEventListener("click",o)}render(){const{header:t,text:s,type:e,width:o,spaces:r,trigger:n,opened:h}=this,l={"tooltip-trigger":!0,[`tooltip-trigger-${n}`]:!0,"tooltip-opened":!!h},c={"tooltip-content":!0,"tooltip-content-wide":"wide"===o,[`tooltip-content-${e}`]:!0,[`tooltip-content-${r.vertical}-${r.horizontal}`]:!0},a=t?i("h6",{class:"tooltip-header"},t):null,p=s?i("div",{class:"tooltip-text"},s):null;return i("div",null,i("div",{class:l},i("slot",null)),i("div",{class:"tooltip-wrapper"},i("div",{class:c},i("span",{class:"arrow-mask"},i("span",{class:"arrow-pointer"})),i("div",{class:"tooltip-content-inner-wrapper"},a,i("slot",{name:"content"},p)))))}get host(){return e(this)}static get watchers(){return{opened:["openHandle"],placement:["placementHandle"]}}static get style(){return":host{display:inline-block;position:relative}.tooltip-wrapper{position:fixed;display:none;opacity:0;visibility:hidden;z-index:var(--tooltip-z-index,9999);padding:var(--tooltip-distance,12px);-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:opacity linear var(--tooltip-animate-delay,.15s),visibility linear var(--tooltip-animate-delay,.15s);transition:opacity linear var(--tooltip-animate-delay,.15s),visibility linear var(--tooltip-animate-delay,.15s);top:0;left:0;white-space:normal;word-break:break-word}.tooltip-wrapper.show{display:block;opacity:1;visibility:visible}.tooltip-content{position:relative;display:-ms-flexbox;display:flex;width:var(--tooltip-width,auto);max-width:var(--tooltip-max-width,220px);border-radius:var(--tooltip-border-radius,0);-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:var(--tooltip-shadow,1px 1px 2px 1px) var(--tooltip-shadow-color,rgba(0,0,0,.25));box-shadow:var(--tooltip-shadow,1px 1px 2px 1px) var(--tooltip-shadow-color,rgba(0,0,0,.25));white-space:normal;font-size:var(--tooltip-font-size);font-family:var(--tooltip-font-family);font-weight:var(--tooltip-font-weight);line-height:var(--tooltip-line-height);text-align:left}.tooltip-content .tooltip-header{font:inherit;font-family:var(--tooltip-header-font-family,var(--headline-font-family,var(--font-family)));font-weight:var(--tooltip-header-font-weight,var(--headline-font-weight,var(--font-weight-bold,var(--font-weight,normal))));font-size:var(--tooltip-header-font-size,var(--tooltip-font-size));margin:0 0 var(--tooltip-header-margin-bottom,var(--spacing-xs,12px)) 0}.tooltip-content-wide{max-width:var(--tooltip-wide-max-width,300px)}.tooltip-content-inner-wrapper{padding:var(--tooltip-padding,var(--spacing-xs,12px));position:relative;-ms-flex-item-align:stretch;align-self:stretch;width:100%}.tooltip-content .arrow-mask{display:block;position:absolute;height:var(--tooltip-arrow-size,4px);width:var(--tooltip-arrow-size,4px)}.tooltip-content .arrow-mask .arrow-pointer{position:absolute;left:auto;top:auto;width:calc(var(--tooltip-arrow-size, 4px) * 1.41);height:calc(var(--tooltip-arrow-size, 4px) * 1.41);-webkit-box-shadow:var(--tooltip-shadow,1px 1px 2px 1px) var(--tooltip-shadow-color,rgba(0,0,0,.25));box-shadow:var(--tooltip-shadow,1px 1px 2px 1px) var(--tooltip-shadow-color,rgba(0,0,0,.25));-webkit-transform:rotate(45deg);transform:rotate(45deg)}.tooltip-content-default{color:var(--tooltip-color);border-color:var(--tooltip-background-color,#fff)}.tooltip-content-default,.tooltip-content-default .arrow-mask .arrow-pointer,.tooltip-content-default .tooltip-content-inner-wrapper{background-color:var(--tooltip-background-color,#fff)}.tooltip-content-info{color:var(--tooltip-info-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));border-color:var(--tooltip-info-background-color,#2191cb)}.tooltip-content-info,.tooltip-content-info .arrow-mask .arrow-pointer,.tooltip-content-info .tooltip-content-inner-wrapper{background-color:var(--tooltip-info-background-color,#2191cb)}.tooltip-content-warning{color:var(--tooltip-warning-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));border-color:var(--tooltip-warning-background-color,#f7e1df)}.tooltip-content-warning,.tooltip-content-warning .arrow-mask .arrow-pointer,.tooltip-content-warning .tooltip-content-inner-wrapper{background-color:var(--tooltip-warning-background-color,#f7e1df)}.tooltip-content-error{color:var(--tooltip-error-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));border-color:var(--tooltip-error-background-color,#f7e1df)}.tooltip-content-error,.tooltip-content-error .arrow-mask .arrow-pointer,.tooltip-content-error .tooltip-content-inner-wrapper{background-color:var(--tooltip-error-background-color,#f7e1df)}.tooltip-content-feedback{color:var(--tooltip-feedback-color,var(--color-text-inverse,var(--text-inverse-color,var(--white,#fff))));border-color:var(--tooltip-feedback-background-color,#444)}.tooltip-content-feedback,.tooltip-content-feedback .arrow-mask .arrow-pointer,.tooltip-content-feedback .tooltip-content-inner-wrapper{background-color:var(--tooltip-feedback-background-color,#444)}.tooltip-content-top-left .arrow-mask{bottom:100%;left:0;width:100%}.tooltip-content-top-left .arrow-mask .arrow-pointer{bottom:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);left:calc(calc(var(--tooltip-arrow-size, 4px) * 1.41))}.tooltip-content-top-center .arrow-mask{bottom:100%;left:0;width:100%}.tooltip-content-top-center .arrow-mask .arrow-pointer{bottom:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);left:calc(50% - calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2)}.tooltip-content-top-right .arrow-mask{bottom:100%;right:0;width:100%}.tooltip-content-top-right .arrow-mask .arrow-pointer{bottom:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);right:calc(calc(var(--tooltip-arrow-size, 4px) * 1.41))}.tooltip-content-middle-left .arrow-mask{right:100%;top:0;height:100%}.tooltip-content-middle-left .arrow-mask .arrow-pointer{right:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);top:calc(50% - calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2)}.tooltip-content-middle-right .arrow-mask{left:100%;top:0;height:100%}.tooltip-content-middle-right .arrow-mask .arrow-pointer{left:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);top:calc(50% - calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2)}.tooltip-content-bottom-left .arrow-mask{top:100%;left:0;width:100%}.tooltip-content-bottom-left .arrow-mask .arrow-pointer{top:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);left:calc(calc(var(--tooltip-arrow-size, 4px) * 1.41))}.tooltip-content-bottom-center .arrow-mask{top:100%;left:0;width:100%}.tooltip-content-bottom-center .arrow-mask .arrow-pointer{top:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);left:calc(50% - calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2)}.tooltip-content-bottom-right .arrow-mask{top:100%;right:0;width:100%}.tooltip-content-bottom-right .arrow-mask .arrow-pointer{top:calc(-1 * calc(var(--tooltip-arrow-size, 4px) * 1.41)/ 2);right:calc(calc(var(--tooltip-arrow-size, 4px) * 1.41))}"}};!function(t,s,i,e){var o,r=arguments.length,n=r<3?s:null===e?e=Object.getOwnPropertyDescriptor(s,i):e;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,s,i,e);else for(var h=t.length-1;h>=0;h--)(o=t[h])&&(n=(r<3?o(n):r>3?o(s,i,n):o(s,i))||n);r>3&&n&&Object.defineProperty(s,i,n)}([r()],w.prototype,"close",void 0);export{m as wf_spy,w as wf_tooltip};