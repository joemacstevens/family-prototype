System.register(["./p-52d4ac09.system.js","./p-50f9a219.system.js","./p-2fff7c3c.system.js","./p-aa55f3fb.system.js"],(function(e){"use strict";var t,o,n,s,r,l;return{setters:[function(e){t=e.r;o=e.c;n=e.h},function(){},function(e){s=e.P},function(e){r=e.d;l=e.e}],execute:function(){var i=undefined&&undefined.__decorate||function(e,t,o,n){var s=arguments.length,r=s<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,l;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(e,t,o,n);else for(var i=e.length-1;i>=0;i--)if(l=e[i])r=(s<3?l(r):s>3?l(t,o,r):l(t,o))||r;return s>3&&r&&Object.defineProperty(t,o,r),r};var a=e("wf_modal",function(){function e(e){t(this,e);this.opened=false;this.buttonSize="md";this.docClose=o(this,"close",7);this.docWfClose=o(this,"wfClose",7)}e.prototype.handleCloseRequest=function(e){e.stopPropagation();this.close()};e.prototype.handleGlobalScroll=function(e){e?r(this.modalDialog):l(this.modalDialog)};e.prototype.close=function(){this.opened=false;this.modalClose.emit()};e.prototype.renderHeader=function(){return n("header",{class:"modal-header"},n("button",{type:"button",class:"close","aria-label":"Close",onClick:this.handleCloseRequest.bind(this)},n("span",{"aria-hidden":"true"},"×")),this.header)};e.prototype.render=function(){var e=this;var t=this,o=t.opened,s=t.buttonSize;return o?n("div",{class:"modal"},n("div",{class:"modal-backdrop",onClick:this.close.bind(this)}),n("div",{ref:function(t){return e.modalDialog=t},class:"modal-dialog"},n("slot",{name:"header"},this.header?this.renderHeader():""),n("main",{class:"modal-body"},n("slot",null)),n("footer",{class:"modal-footer"},n("slot",{name:"footer"},n("wf-button",{onClick:this.handleCloseRequest.bind(this),size:s},"Close"))))):null};Object.defineProperty(e,"watchers",{get:function(){return{opened:["handleGlobalScroll"]}},enumerable:true,configurable:true});Object.defineProperty(e,"style",{get:function(){return".modal{z-index:var(--modal-z-index,100)}.modal-backdrop{background-color:var(--modal-backdrop-background,rgba(0,0,0,.8))}.modal,.modal-backdrop{bottom:0;left:0;position:fixed;right:0;top:0}.modal-dialog{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:var(--modal-shadow,0 0 7px 7px rgba(0,0,0,.2));box-shadow:var(--modal-shadow,0 0 7px 7px rgba(0,0,0,.2));background-color:var(--modal-content-background,#fff);border-radius:var(--modal-border-radius,0);font-family:var(--modal-font-family);height:auto;left:50%;width:var(--modal-width,60%);padding:var(--modal-padding,var(--spacing-m,36px) var(--spacing-l,54px));position:absolute;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);max-height:100%;max-width:100%;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}\@media (-ms-high-contrast:none),screen and (-ms-high-contrast:active){.modal-dialog{height:80%}}.modal-header{-ms-flex-negative:0;flex-shrink:0;background:var(--modal-header-background,none);border-bottom:var(--modal-header-border,2px solid);font-family:var(--headline-font-family,var(--font-family));font-size:var(--headline-4-font-size,32px);font-weight:var(--headline-font-weight,var(--font-weight-bold,var(--font-weight,normal)));padding:var(--modal-header-padding,0 0 var(--spacing-xs,12px))}.modal-header,.modal-header h4{color:var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)))}.modal-header h4{margin:0}.modal-header button.close{color:var(--modal-close-icon-color,#000);background:none;border:none;cursor:var(--cursor,pointer);float:right;font-size:var(--headline-4-font-size,32px);margin-right:calc(0px - var(--spacing-s, 24px));margin-top:calc(0px - var(--spacing-s, 24px))}.modal-body{-ms-flex-negative:1;flex-shrink:1;-ms-flex-preferred-size:90%;flex-basis:90%;overflow-y:auto;color:var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c)));display:block;min-height:var(--modal-body-min-height,170px);padding:var(--modal-body-padding,0);margin:var(--modal-body-margin,var(--spacing-s,24px) 0 var(--spacing-s,24px) 0)}.modal-footer{-ms-flex-negative:0;flex-shrink:0;padding:var(--modal-footer-padding,0);text-align:var(--modal-footer-align,left);display:-ms-flexbox;display:flex;-ms-flex-pack:var(--modal-footer-justify-content,flex-end);justify-content:var(--modal-footer-justify-content,flex-end)}.modal-footer:after{content:\"\";clear:both;display:table}"},enumerable:true,configurable:true});return e}());i([s({eventName:"close"})],a.prototype,"modalClose",void 0)}}}));