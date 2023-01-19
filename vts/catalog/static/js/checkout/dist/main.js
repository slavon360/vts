(()=>{var e={651:function(e,t){!function(e){"use strict";function t(e){var r,n,s=new Error(e);return r=s,n=t.prototype,Object.setPrototypeOf?Object.setPrototypeOf(r,n):r.__proto__=n,s}function r(e,r,n){var s=r.slice(0,n).split(/\n/),i=s.length,a=s[i-1].length+1;throw t(e+=" at line "+i+" col "+a+":\n\n  "+r.split(/\n/)[i-1]+"\n  "+Array(a).join(" ")+"^")}t.prototype=Object.create(Error.prototype,{name:{value:"Squirrelly Error",enumerable:!1}});var n=new Function("return this")().Promise,s=!1;try{s=new Function("return (async function(){}).constructor")()}catch(e){if(!(e instanceof SyntaxError))throw e}function i(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function a(e,t,r){for(var n in t)i(t,n)&&(null==t[n]||"object"!=typeof t[n]||"storage"!==n&&"prefixes"!==n||r?e[n]=t[n]:e[n]=a({},t[n]));return e}var o=/^async +/,c=/`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})*}|(?!\${)[^\\`])*`/g,l=/'(?:\\[\s\w"'\\`]|[^\n\r'\\])*?'/g,d=/"(?:\\[\s\w"'\\`]|[^\n\r"\\])*?"/g,h=/[.*+\-?^${}()|[\]\\]/g;function u(e){return h.test(e)?e.replace(h,"\\$&"):e}function p(e,n){n.rmWhitespace&&(e=e.replace(/[\r\n]+/g,"\n").replace(/^\s+|\s+$/gm,"")),c.lastIndex=0,l.lastIndex=0,d.lastIndex=0;var s=n.prefixes,i=[s.h,s.b,s.i,s.r,s.c,s.e].reduce((function(e,t){return e&&t?e+"|"+u(t):t?u(t):e}),""),a=new RegExp("([|()]|=>)|('|\"|`|\\/\\*)|\\s*((\\/)?(-|_)?"+u(n.tags[1])+")","g"),h=new RegExp("([^]*?)"+u(n.tags[0])+"(-|_)?\\s*("+i+")?\\s*","g"),p=0,f=!1;function m(t,s){var i,u={f:[]},m=0,g="c";function v(t){var s=e.slice(p,t),i=s.trim();if("f"===g)"safe"===i?u.raw=!0:n.async&&o.test(i)?(i=i.replace(o,""),u.f.push([i,"",!0])):u.f.push([i,""]);else if("fp"===g)u.f[u.f.length-1][1]+=i;else if("err"===g){if(i){var a=s.search(/\S/);r("invalid syntax",e,p+a)}}else u[g]=i;p=t+1}for("h"===s||"b"===s||"c"===s?g="n":"r"===s&&(u.raw=!0,s="i"),a.lastIndex=p;null!==(i=a.exec(e));){var y=i[1],_=i[2],b=i[3],x=i[4],w=i[5],S=i.index;if(y)"("===y?(0===m&&("n"===g?(v(S),g="p"):"f"===g&&(v(S),g="fp")),m++):")"===y?0==--m&&"c"!==g&&(v(S),g="err"):0===m&&"|"===y?(v(S),g="f"):"=>"===y&&(v(S),p+=1,g="res");else if(_)if("/*"===_){var k=e.indexOf("*/",a.lastIndex);-1===k&&r("unclosed comment",e,i.index),a.lastIndex=k+2}else"'"===_?(l.lastIndex=i.index,l.exec(e)?a.lastIndex=l.lastIndex:r("unclosed string",e,i.index)):'"'===_?(d.lastIndex=i.index,d.exec(e)?a.lastIndex=d.lastIndex:r("unclosed string",e,i.index)):"`"===_&&(c.lastIndex=i.index,c.exec(e)?a.lastIndex=c.lastIndex:r("unclosed string",e,i.index));else if(b)return v(S),p=S+i[0].length,h.lastIndex=p,f=w,x&&"h"===s&&(s="s"),u.t=s,u}return r("unclosed tag",e,t),u}var g=function i(a,c){a.b=[],a.d=[];var l,d=!1,u=[];function g(e,t){e&&(e=function(e,t,r,n){var s,i;return"string"==typeof t.autoTrim?s=i=t.autoTrim:Array.isArray(t.autoTrim)&&(s=t.autoTrim[1],i=t.autoTrim[0]),(r||!1===r)&&(s=r),(n||!1===n)&&(i=n),"slurp"===s&&"slurp"===i?e.trim():("_"===s||"slurp"===s?e=String.prototype.trimLeft?e.trimLeft():e.replace(/^[\s\uFEFF\xA0]+/,""):"-"!==s&&"nl"!==s||(e=e.replace(/^(?:\n|\r|\r\n)/,"")),"_"===i||"slurp"===i?e=String.prototype.trimRight?e.trimRight():e.replace(/[\s\uFEFF\xA0]+$/,""):"-"!==i&&"nl"!==i||(e=e.replace(/(?:\n|\r|\r\n)$/,"")),e)}(e,n,f,t))&&(e=e.replace(/\\|'/g,"\\$&").replace(/\r\n|\n|\r/g,"\\n"),u.push(e))}for(;null!==(l=h.exec(e));){var v,y=l[1],_=l[2],b=l[3]||"";for(var x in s)if(s[x]===b){v=x;break}g(y,_),p=l.index+l[0].length,v||r("unrecognized tag type: "+b,e,p);var w=m(l.index,v),S=w.t;if("h"===S){var k=w.n||"";n.async&&o.test(k)&&(w.a=!0,w.n=k.replace(o,"")),w=i(w),u.push(w)}else if("c"===S){if(a.n===w.n)return d?(d.d=u,a.b.push(d)):a.d=u,a;r("Helper start and end don't match",e,l.index+l[0].length)}else if("b"===S){d?(d.d=u,a.b.push(d)):a.d=u;var E=w.n||"";n.async&&o.test(E)&&(w.a=!0,w.n=E.replace(o,"")),d=w,u=[]}else if("s"===S){var C=w.n||"";n.async&&o.test(C)&&(w.a=!0,w.n=C.replace(o,"")),u.push(w)}else u.push(w)}if(!c)throw t('unclosed helper "'+a.n+'"');return g(e.slice(p,e.length),!1),a.d=u,a}({f:[]},!0);if(n.plugins)for(var v=0;v<n.plugins.length;v++){var y=n.plugins[v];y.processAST&&(g.d=y.processAST(g.d,n))}return g.d}function f(e,t){var r=p(e,t),n="var tR='';"+(t.useWith?"with("+t.varName+"||{}){":"")+_(r,t)+"if(cb){cb(null,tR)} return tR"+(t.useWith?"}":"");if(t.plugins)for(var s=0;s<t.plugins.length;s++){var i=t.plugins[s];i.processFnString&&(n=i.processFnString(n,t))}return n}function m(e,t){for(var r=0;r<t.length;r++){var n=t[r][0],s=t[r][1];e=(t[r][2]?"await ":"")+"c.l('F','"+n+"')("+e,s&&(e+=","+s),e+=")"}return e}function g(e,t,r,n,s,i){var a="{exec:"+(s?"async ":"")+y(r,t,e)+",params:["+n+"]";return i&&(a+=",name:'"+i+"'"),s&&(a+=",async:true"),a+"}"}function v(e,t){for(var r="[",n=0;n<e.length;n++){var s=e[n];r+=g(t,s.res||"",s.d,s.p||"",s.a,s.n),n<e.length&&(r+=",")}return r+"]"}function y(e,t,r){return"function("+t+"){var tR='';"+_(e,r)+"return tR}"}function _(e,t){for(var r=0,n=e.length,s="";r<n;r++){var i=e[r];if("string"==typeof i)s+="tR+='"+i+"';";else{var a=i.t,o=i.c||"",c=i.f,l=i.n||"",d=i.p||"",h=i.res||"",u=i.b,p=!!i.a;if("i"===a){t.defaultFilter&&(o="c.l('F','"+t.defaultFilter+"')("+o+")");var f=m(o,c);!i.raw&&t.autoEscape&&(f="c.l('F','e')("+f+")"),s+="tR+="+f+";"}else if("h"===a)if(t.storage.nativeHelpers.get(l))s+=t.storage.nativeHelpers.get(l)(i,t);else{var y=(p?"await ":"")+"c.l('H','"+l+"')("+g(t,h,i.d,d,p);y+=u?","+v(u,t):",[]",s+="tR+="+m(y+=",c)",c)+";"}else"s"===a?s+="tR+="+m((p?"await ":"")+"c.l('H','"+l+"')({params:["+d+"]},[],c)",c)+";":"e"===a&&(s+=o+"\n")}}return s}var b=function(){function e(e){this.cache=e}return e.prototype.define=function(e,t){this.cache[e]=t},e.prototype.get=function(e){return this.cache[e]},e.prototype.remove=function(e){delete this.cache[e]},e.prototype.reset=function(){this.cache={}},e.prototype.load=function(e){a(this.cache,e,!0)},e}();function x(e,r,n,s){if(r&&r.length>0)throw t((s?"Native":"")+"Helper '"+e+"' doesn't accept blocks");if(n&&n.length>0)throw t((s?"Native":"")+"Helper '"+e+"' doesn't accept filters")}var w={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function S(e){return w[e]}var k=new b({}),E=new b({each:function(e,t){var r="",n=e.params[0];if(x("each",t,!1),e.async)return new Promise((function(t){!function e(t,r,n,s,i){n(t[r],r).then((function(a){s+=a,r===t.length-1?i(s):e(t,r+1,n,s,i)}))}(n,0,e.exec,r,t)}));for(var s=0;s<n.length;s++)r+=e.exec(n[s],s);return r},foreach:function(e,t){var r=e.params[0];if(x("foreach",t,!1),e.async)return new Promise((function(t){!function e(t,r,n,s,i,a){s(r[n],t[r[n]]).then((function(o){i+=o,n===r.length-1?a(i):e(t,r,n+1,s,i,a)}))}(r,Object.keys(r),0,e.exec,"",t)}));var n="";for(var s in r)i(r,s)&&(n+=e.exec(s,r[s]));return n},include:function(e,r,n){x("include",r,!1);var s=n.storage.templates.get(e.params[0]);if(!s)throw t('Could not fetch template "'+e.params[0]+'"');return s(e.params[1],n)},extends:function(e,r,n){var s=e.params[1]||{};s.content=e.exec();for(var i=0;i<r.length;i++){var a=r[i];s[a.name]=a.exec()}var o=n.storage.templates.get(e.params[0]);if(!o)throw t('Could not fetch template "'+e.params[0]+'"');return o(s,n)},useScope:function(e,t){return x("useScope",t,!1),e.exec(e.params[0])}}),C=new b({if:function(e,t){x("if",!1,e.f,!0);var r="if("+e.p+"){"+_(e.d,t)+"}";if(e.b)for(var n=0;n<e.b.length;n++){var s=e.b[n];"else"===s.n?r+="else{"+_(s.d,t)+"}":"elif"===s.n&&(r+="else if("+s.p+"){"+_(s.d,t)+"}")}return r},try:function(e,r){if(x("try",!1,e.f,!0),!e.b||1!==e.b.length||"catch"!==e.b[0].n)throw t("native helper 'try' only accepts 1 block, 'catch'");var n="try{"+_(e.d,r)+"}",s=e.b[0];return n+"catch"+(s.res?"("+s.res+")":"")+"{"+_(s.d,r)+"}"},block:function(e,t){return x("block",e.b,e.f,!0),"if(!"+t.varName+"["+e.p+"]){tR+=("+y(e.d,"",t)+")()}else{tR+="+t.varName+"["+e.p+"]}"}}),P=new b({e:function(e){var t=String(e);return/[&<>"']/.test(t)?t.replace(/[&<>"']/g,S):t}}),A={varName:"it",autoTrim:[!1,"nl"],autoEscape:!0,defaultFilter:!1,tags:["{{","}}"],l:function(e,r){if("H"===e){var n=this.storage.helpers.get(r);if(n)return n;throw t("Can't find helper '"+r+"'")}if("F"===e){var s=this.storage.filters.get(r);if(s)return s;throw t("Can't find filter '"+r+"'")}},async:!1,storage:{helpers:E,nativeHelpers:C,filters:P,templates:k},prefixes:{h:"@",b:"#",i:"",r:"*",c:"/",e:"!"},cache:!1,plugins:[],useWith:!1};function L(e,t){var r={};return a(r,A),t&&a(r,t),e&&a(r,e),r.l.bind(r),r}function q(e,r){var n=L(r||{}),i=Function;if(n.async){if(!s)throw t("This environment doesn't support async/await");i=s}try{return new i(n.varName,"c","cb",f(e,n))}catch(r){throw r instanceof SyntaxError?t("Bad template syntax\n\n"+r.message+"\n"+Array(r.message.length+1).join("=")+"\n"+f(e,n)):r}}function R(e,t){var r;return t.cache&&t.name&&t.storage.templates.get(t.name)?t.storage.templates.get(t.name):(r="function"==typeof e?e:q(e,t),t.cache&&t.name&&t.storage.templates.define(t.name,r),r)}A.l.bind(A),e.compile=q,e.compileScope=_,e.compileScopeIntoFunction=y,e.compileToString=f,e.defaultConfig=A,e.filters=P,e.getConfig=L,e.helpers=E,e.nativeHelpers=C,e.parse=p,e.render=function(e,r,s,i){var a=L(s||{});if(!a.async)return R(e,a)(r,a);if(!i){if("function"==typeof n)return new n((function(t,n){try{t(R(e,a)(r,a))}catch(e){n(e)}}));throw t("Please provide a callback function, this env doesn't support Promises")}try{R(e,a)(r,a,i)}catch(e){return i(e)}},e.templates=k,Object.defineProperty(e,"__esModule",{value:!0})}(t)}},t={};function r(n){var s=t[n];if(void 0!==s)return s.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,r),i.exports}(()=>{"use strict";var e=r(651);new class{constructor(){this.shopping_cart_key="shopping-cart-vts-service",this.checkout_form=document.querySelector("#checkout-form"),this.email_field=this.checkout_form.querySelector('[type="email"]'),this.submit_btn=this.checkout_form.querySelector('[type="submit"]'),this.required_fields=this.checkout_form.querySelectorAll("input[required]"),this.shipping_address_field=this.checkout_form.querySelector("#shipping-address"),this.shipping_address_error_msg=this.checkout_form.querySelector(".shipping-address-error-msg"),this.nova_post_city_field=this.checkout_form.querySelector("#nova-post-city"),this.csrfmiddlewaretoken_field=this.checkout_form.querySelector('[name="csrfmiddlewaretoken"]'),this.nova_post_office_select=this.checkout_form.querySelector("#nova-post-office"),this.checkout_url="/checkout",this.nova_post_settlements_url="/external/nova-poshta/search-settlements/api",this.nova_post_warehouses_url="/external/nova-poshta/search-warehouses/api",this.bindListeners()}getShoppingCartData(){const t=JSON.parse(localStorage.getItem(this.shopping_cart_key)),r=t.reduce(((e,{price:t})=>e+Number(t.replace(/,/g,""))),0),n=e.render('<table> <thead> <tr> <th></th> <th>Продукт</th> <th>Кількість</th> <th>Ціна</th> </tr> </thead> <tbody> {{@each(it.cart_data) => prod, index}} <tr> <td> <img src="{{prod.img_url}}" style="width:auto;height:100px"> </td> <td>{{prod.title}}</td> <td>{{prod.qty}}</td> <td>{{prod.price}}</td> </tr> {{/each}} </tbody> <tfoot> <tr> <th colspan="3" style="text-align:right">До сплати:</th> <th>{{it.total}}</th> </tr> </tfoot> </table>',{cart_data:t,total:r});return console.log(n),n}isFilledElement(e){const t=e.value.trim();return e.nextElementSibling.textContent=t?"":"Поле обов'язкове для вводу",t}validate(e){e.preventDefault();const t=[].reduce.call(this.required_fields,((e,t)=>{const r=this.isFilledElement(t);return e&&r}),!0);return this.validateShippingAddress()&&this.is_valid_email(this.email_field.value)&&t}validateShippingAddress=()=>{const e=this.shipping_address_field.value.trim();return this.shipping_address_error_msg.textContent=e?"":"Будь ласка, введіть адресу доставки",e};is_valid_email=e=>{const t=String(e).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);return this.email_field.nextElementSibling.textContent=!t&&e?"Будь ласка, введіть валідний емейл":"",t};bindListeners(){this.submit_btn.addEventListener("click",this.submit.bind(this)),this.checkout_form.addEventListener("submit",this.submit.bind(this)),this.required_fields.forEach((e=>{e.addEventListener("keyup",this.isFilledElement.bind(null,e))})),this.nova_post_city_field.addEventListener("keyup",window.debounce(this.searchCityNovaPost.bind(this),800)),this.checkout_form.addEventListener("click",this.hideSearchedResults.bind(this)),this.nova_post_city_field.addEventListener("click",this.showSearchedResults),this.nova_post_office_select.addEventListener("change",this.setNovaPostShippingAddress.bind(this))}showPreloader(e){e.setAttribute("disabled",!0),e.nextElementSibling.classList.remove("d-none")}hidePreloader(e){e.removeAttribute("disabled"),e.nextElementSibling.classList.add("d-none")}showDeliveryCompanyError(e,t){const r=t.reduce(((e,t)=>e+t),"");console.error(r),e.textContent="Місто не знайдено. Перевірте правильність написання."}hideDeliveryCompanyError(e){e.textContent=""}hideSearchedResults(){this.checkout_form.querySelectorAll(".searched-results").forEach((e=>e.classList.add("d-none")))}showSearchedResults(e){e.stopPropagation();const{target:t}=e;t.parentElement.querySelector(".searched-results").classList.remove("d-none")}renderCities({results_container:e,addresses:t,search_query:r,data_target_select_id:n}){const s=t.map((({Present:e,MainDescription:t})=>{const s=new RegExp(r,"ig"),i=e.replace(s,`<b>${r}</b>`).toLowerCase();return`<div class="searched-city" data-city-name="${t}" data-target-select-id="${n}">${i}</div>`})).join("");e.innerHTML=s,e.classList.remove("d-none"),e.querySelectorAll(".searched-city").forEach((e=>{e.addEventListener("click",this.bindCityClickHandler.bind(this))}))}bindCityClickHandler(e){const{target:t}=e,r=t.getAttribute("data-city-name"),n=t.getAttribute("data-target-select-id"),s=t.textContent;console.log(t.textContent),"nova-post-office"===n&&this.searchWarehousesNovaPost({city_name:r,target_select_id:n,city_and_region_name:s})}setNovaPostShippingAddress(e){const t=this.nova_post_city_field.value,r=e.target.value;this.shipping_address_field.value=`${t} ${r}`,this.validateShippingAddress()}searchWarehousesNovaPost({city_name:e,target_select_id:t,city_and_region_name:r}){const n=this.checkout_form.querySelector(`#${t}`),s=n.parentElement;n.innerHTML="",this.showPreloader(n),this.nova_post_city_field.value=r,this.hideSearchedResults(),fetch(this.nova_post_warehouses_url,{method:"POST",headers:{Accept:"/","Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({csrfmiddlewaretoken:this.csrfmiddlewaretoken_field.value,CityName:e,Page:"1",Limit:"500"})}).then((e=>e.json())).then((({errors:e,data:t,success:r})=>{const i=s.querySelector(".text-danger");r?(n.add(new Option("","")),t.forEach((({Description:e,Schedule:t,WarehouseIndex:r})=>{n.add(new Option(e,e))}))):this.showDeliveryCompanyError(i,e)})).finally((()=>{this.hidePreloader(n)}))}unbindSearchedResultsClickHandlersAndRemove(){this.checkout_form.querySelectorAll(".searched-results .searched-city").forEach((e=>{e.removeEventListener("click",this.bindCityClickHandler),e.remove()}))}searchCityNovaPost(e){const{target:{value:t}}=e,r=e.target.getAttribute("data-target-select-id");t.trim()&&(this.showPreloader(e.target),this.unbindSearchedResultsClickHandlersAndRemove(),fetch(this.nova_post_settlements_url,{method:"POST",headers:{Accept:"/","Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({csrfmiddlewaretoken:this.csrfmiddlewaretoken_field.value,CityName:t,Page:"1",Limit:"50"})}).then((e=>e.json())).then((({errors:n,data:s,success:i})=>{const[{TotalCount:a,Addresses:o}={}]=s,c=e.target.parentElement,l=c.querySelector(".text-danger");if(i&&0!==a){const e=c.querySelector(".searched-results"),n=o.map((({Present:e,MainDescription:t})=>({Present:e,MainDescription:t})));this.hideDeliveryCompanyError(l),this.renderCities({results_container:e,addresses:n,search_query:t,data_target_select_id:r})}else this.showDeliveryCompanyError(l,n)})).finally((()=>{this.hidePreloader(e.target),e.target.focus()})))}submit(e){const t=this.validate(e),r=[].reduce.call(this.required_fields,((e,{name:t,value:r})=>({...e,[t]:r})),{}),n=this.submit_btn.querySelector(".spinner-border");t&&(n.classList.remove("d-none"),fetch(this.checkout_url,{method:"POST",headers:{Accept:"/","Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({shipping_address:this.shipping_address_field.value,email:this.email_field.value,details:this.getShoppingCartData(),csrfmiddlewaretoken:this.csrfmiddlewaretoken_field.value,...r})}).then((({redirected:e,status:t,url:r})=>{console.log(t,e),200===t&&e&&(location.href=r)})).finally((()=>{n.classList.add("d-none")})))}}})()})();