System.register(["./p-52d4ac09.system.js","./p-0a7e8b0a.system.js"],(function(e){"use strict";var t,n,i,r;return{setters:[function(e){t=e.r;n=e.c;i=e.h},function(e){r=e.K}],execute:function(){var s=e("wf_process_navigation",function(){function e(e){t(this,e);this.steps=[];this.type="guided";this.wfClick=n(this,"wfClick",7)}e.prototype.componentWillLoad=function(){this.renderStep=this.renderStep.bind(this);this.handleStepClick=this.handleStepClick.bind(this);this.handleStepKeyDown=this.handleStepKeyDown.bind(this)};e.prototype.handleStepClick=function(e,t){var n=this,i=n.type,r=n.wfClick;if(i!=="freeflow"||t.disabled)return;e.target.blur();r.emit(t)};e.prototype.handleStepKeyDown=function(e,t){var n=this,i=n.type,s=n.wfClick;if(i!=="freeflow"||e.keyCode!==r.ENTER_KEY||t.disabled)return;s.emit(t)};e.prototype.renderStep=function(e){var t;var n=this,r=n.handleStepClick,s=n.handleStepKeyDown,a=n.type;var o=(t={"process-navigation-step":true,"process-navigation-step-disabled":e.disabled},t["process-navigation-step-"+(e.status||"uncompleted")]=true,t);return i("div",{class:o,onClick:function(t){return r(t,e)},onKeyDown:function(t){return s(t,e)},tabindex:a==="freeflow"&&!e.disabled?"0":"-1"},e.icon&&i("wf-icon",{class:"process-navigation-step-icon",name:e.icon,size:e.iconSize||"xs",type:"primary"}),i("span",{class:"process-navigation-step-label"},e.label))};e.prototype.render=function(){var e;var t=this,n=t.steps,r=t.renderStep,s=t.type;var a=Array.isArray(n)?n:JSON.parse(n);var o=(e={"process-navigation":true},e["process-navigation-"+(s||"guided")]=true,e);return i("div",{class:o},a.map(r))};Object.defineProperty(e,"style",{get:function(){return":host{display:block}.process-navigation{display:-ms-flexbox;display:flex;font-family:var(--process-navigation-font-family);font-size:var(--process-navigation-font-size,var(--font-size-small,.9em));overflow-x:auto}.process-navigation-step{border-top:var(--process-navigation-step-border-width,var(--spacing-xxs,6px)) solid;-ms-flex:1 1 0px;flex:1 1 0px;min-width:var(--process-navigation-step-min-width,150px);outline:none}.process-navigation-step-label{line-height:var(--process-navigation-step-line-height,25px);vertical-align:middle}.process-navigation-step+.process-navigation-step{margin-left:var(--process-navigation-step-margin,var(--spacing-xxs,6px))}.process-navigation-step .process-navigation-step-icon{--icon-padding-xs:0;display:inline-block;height:var(--icon-size-xs,16px);margin-right:6px;vertical-align:middle}.process-navigation-freeflow .process-navigation-step:focus:not(.process-navigation-step-disabled),.process-navigation-freeflow .process-navigation-step:hover:not(.process-navigation-step-disabled){--icon-primary-color:var(--process-navigation-step-hover-icon-color,var(--plum,#5a6f89));border-top-color:var(--process-navigation-step-hover-border-color,var(--plum,#5a6f89));color:var(--process-navigation-step-hover-font-color,var(--plum,#5a6f89));font-weight:var(--process-navigation-step-hover-font-weight,var(--font-weight-bold,var(--font-weight,normal)));cursor:pointer}.process-navigation-step-active{--icon-primary-color:var(--process-navigation-step-active-icon-color,var(--positive,#0a7520));border-top-color:var(--process-navigation-step-active-border-color,var(--positive,#0a7520));color:var(--process-navigation-step-active-font-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));font-weight:var(--process-navigation-step-active-font-weight,var(--font-weight-bold,var(--font-weight,normal)))}.process-navigation-step-completed{--icon-primary-color:var(--process-navigation-step-completed-icon-color,var(--positive,#0a7520));border-top-color:var(--process-navigation-step-completed-border-color,var(--positive,#0a7520));color:var(--process-navigation-step-completed-font-color,var(--color-text-primary,var(--text-primary-color,var(--text-color,#1c1c1c))));font-weight:var(--process-navigation-step-completed-font-weight,var(--font-weight-normal,var(--font-weight,normal)))}.process-navigation-step-started{--icon-primary-color:var(--process-navigation-step-started-icon-color,var(--plum,#5a6f89));border-top-color:var(--process-navigation-step-started-border-color,var(--plum,#5a6f89));color:var(--process-navigation-step-started-font-color,var(--plum,#5a6f89));font-weight:var(--process-navigation-step-started-font-weight,var(--font-weight-normal,var(--font-weight,normal)))}.process-navigation-step-uncompleted{--icon-primary-color:var(--process-navigation-step-uncompleted-icon-color,var(--lavender,#bdc6d4));border-top-color:var(--process-navigation-step-uncompleted-border-color,var(--lavender,#bdc6d4));color:var(--process-navigation-step-uncompleted-font-color,var(--plum,#5a6f89));font-weight:var(--process-navigation-step-uncompleted-font-weight,var(--font-weight-normal,var(--font-weight,normal)))}"},enumerable:true,configurable:true});return e}())}}}));