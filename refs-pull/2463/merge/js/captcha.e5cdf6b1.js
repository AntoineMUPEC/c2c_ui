(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["captcha"],{e096:function(e,t,i){"use strict";function n(){return n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},n.apply(this,arguments)}i.r(t);var r=function(){var e=!1,t=[],i=function(i){if(!e){e=!0;for(var n=0,r=t.length;n<r;n++)t[n](i)}},n=function(i){e?i():t.push(i)},r={resolved:function(){return e},resolve:i,promise:{then:n}};return r},a=Object.prototype.hasOwnProperty;function c(){var e=r();return{notify:function(){e.resolve()},wait:function(){return e.promise},render:function(e,t,i){this.wait().then((function(){i(window.grecaptcha.render(e,t))}))},reset:function(e){"undefined"!==typeof e&&(this.assertLoaded(),this.wait().then((function(){return window.grecaptcha.reset(e)})))},execute:function(e){"undefined"!==typeof e&&(this.assertLoaded(),this.wait().then((function(){return window.grecaptcha.execute(e)})))},checkRecaptchaLoad:function(){a.call(window,"grecaptcha")&&a.call(window.grecaptcha,"render")&&this.notify()},assertLoaded:function(){if(!e.resolved())throw new Error("ReCAPTCHA has not been loaded")}}}var o=c();"undefined"!==typeof window&&(window.vueRecaptchaApiLoaded=o.notify);var d={name:"VueRecaptcha",props:{sitekey:{type:String,required:!0},theme:{type:String},badge:{type:String},type:{type:String},size:{type:String},tabindex:{type:String},loadRecaptchaScript:{type:Boolean,default:!1},recaptchaScriptId:{type:String,default:"__RECAPTCHA_SCRIPT"},recaptchaHost:{type:String,default:"www.google.com"},language:{type:String,default:""}},beforeMount:function(){if(this.loadRecaptchaScript&&!document.getElementById(this.recaptchaScriptId)){var e=document.createElement("script");e.id=this.recaptchaScriptId,e.src="https://"+this.recaptchaHost+"/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit&hl="+this.language,e.async=!0,e.defer=!0,document.head.appendChild(e)}},mounted:function(){var e=this;o.checkRecaptchaLoad();var t=n({},this.$props,{callback:this.emitVerify,"expired-callback":this.emitExpired,"error-callback":this.emitError}),i=this.$slots["default"]?this.$el.children[0]:this.$el;o.render(i,t,(function(t){e.$widgetId=t,e.$emit("render",t)}))},methods:{reset:function(){o.reset(this.$widgetId)},execute:function(){o.execute(this.$widgetId)},emitVerify:function(e){this.$emit("verify",e)},emitExpired:function(){this.$emit("expired")},emitError:function(){this.$emit("error")}},render:function(e){return e("div",{},this.$slots["default"])}};t["default"]=d}}]);
//# sourceMappingURL=captcha.e5cdf6b1.js.map