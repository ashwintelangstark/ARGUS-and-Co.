(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function Uv(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Am={exports:{}},Rl={},bm={exports:{}},Ze={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Go=Symbol.for("react.element"),Ov=Symbol.for("react.portal"),Fv=Symbol.for("react.fragment"),kv=Symbol.for("react.strict_mode"),zv=Symbol.for("react.profiler"),Bv=Symbol.for("react.provider"),Hv=Symbol.for("react.context"),Gv=Symbol.for("react.forward_ref"),Vv=Symbol.for("react.suspense"),jv=Symbol.for("react.memo"),Wv=Symbol.for("react.lazy"),Uf=Symbol.iterator;function Xv(t){return t===null||typeof t!="object"?null:(t=Uf&&t[Uf]||t["@@iterator"],typeof t=="function"?t:null)}var Cm={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Rm=Object.assign,Pm={};function Is(t,e,n){this.props=t,this.context=e,this.refs=Pm,this.updater=n||Cm}Is.prototype.isReactComponent={};Is.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Is.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Lm(){}Lm.prototype=Is.prototype;function gd(t,e,n){this.props=t,this.context=e,this.refs=Pm,this.updater=n||Cm}var vd=gd.prototype=new Lm;vd.constructor=gd;Rm(vd,Is.prototype);vd.isPureReactComponent=!0;var Of=Array.isArray,Nm=Object.prototype.hasOwnProperty,xd={current:null},Dm={key:!0,ref:!0,__self:!0,__source:!0};function Im(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)Nm.call(e,i)&&!Dm.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:Go,type:t,key:s,ref:o,props:r,_owner:xd.current}}function Yv(t,e){return{$$typeof:Go,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function _d(t){return typeof t=="object"&&t!==null&&t.$$typeof===Go}function qv(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Ff=/\/+/g;function ic(t,e){return typeof t=="object"&&t!==null&&t.key!=null?qv(""+t.key):e.toString(36)}function ka(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Go:case Ov:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+ic(o,0):i,Of(r)?(n="",t!=null&&(n=t.replace(Ff,"$&/")+"/"),ka(r,e,n,"",function(c){return c})):r!=null&&(_d(r)&&(r=Yv(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Ff,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Of(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+ic(s,a);o+=ka(s,e,n,l,r)}else if(l=Xv(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+ic(s,a++),o+=ka(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Ko(t,e,n){if(t==null)return t;var i=[],r=0;return ka(t,i,"","",function(s){return e.call(n,s,r++)}),i}function $v(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var nn={current:null},za={transition:null},Kv={ReactCurrentDispatcher:nn,ReactCurrentBatchConfig:za,ReactCurrentOwner:xd};function Um(){throw Error("act(...) is not supported in production builds of React.")}Ze.Children={map:Ko,forEach:function(t,e,n){Ko(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Ko(t,function(){e++}),e},toArray:function(t){return Ko(t,function(e){return e})||[]},only:function(t){if(!_d(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Ze.Component=Is;Ze.Fragment=Fv;Ze.Profiler=zv;Ze.PureComponent=gd;Ze.StrictMode=kv;Ze.Suspense=Vv;Ze.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Kv;Ze.act=Um;Ze.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=Rm({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=xd.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)Nm.call(e,l)&&!Dm.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:Go,type:t.type,key:r,ref:s,props:i,_owner:o}};Ze.createContext=function(t){return t={$$typeof:Hv,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:Bv,_context:t},t.Consumer=t};Ze.createElement=Im;Ze.createFactory=function(t){var e=Im.bind(null,t);return e.type=t,e};Ze.createRef=function(){return{current:null}};Ze.forwardRef=function(t){return{$$typeof:Gv,render:t}};Ze.isValidElement=_d;Ze.lazy=function(t){return{$$typeof:Wv,_payload:{_status:-1,_result:t},_init:$v}};Ze.memo=function(t,e){return{$$typeof:jv,type:t,compare:e===void 0?null:e}};Ze.startTransition=function(t){var e=za.transition;za.transition={};try{t()}finally{za.transition=e}};Ze.unstable_act=Um;Ze.useCallback=function(t,e){return nn.current.useCallback(t,e)};Ze.useContext=function(t){return nn.current.useContext(t)};Ze.useDebugValue=function(){};Ze.useDeferredValue=function(t){return nn.current.useDeferredValue(t)};Ze.useEffect=function(t,e){return nn.current.useEffect(t,e)};Ze.useId=function(){return nn.current.useId()};Ze.useImperativeHandle=function(t,e,n){return nn.current.useImperativeHandle(t,e,n)};Ze.useInsertionEffect=function(t,e){return nn.current.useInsertionEffect(t,e)};Ze.useLayoutEffect=function(t,e){return nn.current.useLayoutEffect(t,e)};Ze.useMemo=function(t,e){return nn.current.useMemo(t,e)};Ze.useReducer=function(t,e,n){return nn.current.useReducer(t,e,n)};Ze.useRef=function(t){return nn.current.useRef(t)};Ze.useState=function(t){return nn.current.useState(t)};Ze.useSyncExternalStore=function(t,e,n){return nn.current.useSyncExternalStore(t,e,n)};Ze.useTransition=function(){return nn.current.useTransition()};Ze.version="18.3.1";bm.exports=Ze;var Ee=bm.exports;const Zv=Uv(Ee);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Jv=Ee,Qv=Symbol.for("react.element"),ex=Symbol.for("react.fragment"),tx=Object.prototype.hasOwnProperty,nx=Jv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ix={key:!0,ref:!0,__self:!0,__source:!0};function Om(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)tx.call(e,i)&&!ix.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:Qv,type:t,key:s,ref:o,props:r,_owner:nx.current}}Rl.Fragment=ex;Rl.jsx=Om;Rl.jsxs=Om;Am.exports=Rl;var x=Am.exports,du={},Fm={exports:{}},yn={},km={exports:{}},zm={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(O,H){var j=O.length;O.push(H);e:for(;0<j;){var te=j-1>>>1,ie=O[te];if(0<r(ie,H))O[te]=H,O[j]=ie,j=te;else break e}}function n(O){return O.length===0?null:O[0]}function i(O){if(O.length===0)return null;var H=O[0],j=O.pop();if(j!==H){O[0]=j;e:for(var te=0,ie=O.length,Y=ie>>>1;te<Y;){var X=2*(te+1)-1,le=O[X],me=X+1,he=O[me];if(0>r(le,j))me<ie&&0>r(he,le)?(O[te]=he,O[me]=j,te=me):(O[te]=le,O[X]=j,te=X);else if(me<ie&&0>r(he,j))O[te]=he,O[me]=j,te=me;else break e}}return H}function r(O,H){var j=O.sortIndex-H.sortIndex;return j!==0?j:O.id-H.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],d=1,f=null,h=3,p=!1,_=!1,y=!1,m=typeof setTimeout=="function"?setTimeout:null,u=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(O){for(var H=n(c);H!==null;){if(H.callback===null)i(c);else if(H.startTime<=O)i(c),H.sortIndex=H.expirationTime,e(l,H);else break;H=n(c)}}function M(O){if(y=!1,g(O),!_)if(n(l)!==null)_=!0,k(P);else{var H=n(c);H!==null&&J(M,H.startTime-O)}}function P(O,H){_=!1,y&&(y=!1,u(L),L=-1),p=!0;var j=h;try{for(g(H),f=n(l);f!==null&&(!(f.expirationTime>H)||O&&!B());){var te=f.callback;if(typeof te=="function"){f.callback=null,h=f.priorityLevel;var ie=te(f.expirationTime<=H);H=t.unstable_now(),typeof ie=="function"?f.callback=ie:f===n(l)&&i(l),g(H)}else i(l);f=n(l)}if(f!==null)var Y=!0;else{var X=n(c);X!==null&&J(M,X.startTime-H),Y=!1}return Y}finally{f=null,h=j,p=!1}}var T=!1,S=null,L=-1,E=5,A=-1;function B(){return!(t.unstable_now()-A<E)}function D(){if(S!==null){var O=t.unstable_now();A=O;var H=!0;try{H=S(!0,O)}finally{H?ee():(T=!1,S=null)}}else T=!1}var ee;if(typeof v=="function")ee=function(){v(D)};else if(typeof MessageChannel<"u"){var I=new MessageChannel,z=I.port2;I.port1.onmessage=D,ee=function(){z.postMessage(null)}}else ee=function(){m(D,0)};function k(O){S=O,T||(T=!0,ee())}function J(O,H){L=m(function(){O(t.unstable_now())},H)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(O){O.callback=null},t.unstable_continueExecution=function(){_||p||(_=!0,k(P))},t.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<O?Math.floor(1e3/O):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(O){switch(h){case 1:case 2:case 3:var H=3;break;default:H=h}var j=h;h=H;try{return O()}finally{h=j}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(O,H){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var j=h;h=O;try{return H()}finally{h=j}},t.unstable_scheduleCallback=function(O,H,j){var te=t.unstable_now();switch(typeof j=="object"&&j!==null?(j=j.delay,j=typeof j=="number"&&0<j?te+j:te):j=te,O){case 1:var ie=-1;break;case 2:ie=250;break;case 5:ie=1073741823;break;case 4:ie=1e4;break;default:ie=5e3}return ie=j+ie,O={id:d++,callback:H,priorityLevel:O,startTime:j,expirationTime:ie,sortIndex:-1},j>te?(O.sortIndex=j,e(c,O),n(l)===null&&O===n(c)&&(y?(u(L),L=-1):y=!0,J(M,j-te))):(O.sortIndex=ie,e(l,O),_||p||(_=!0,k(P))),O},t.unstable_shouldYield=B,t.unstable_wrapCallback=function(O){var H=h;return function(){var j=h;h=H;try{return O.apply(this,arguments)}finally{h=j}}}})(zm);km.exports=zm;var rx=km.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sx=Ee,_n=rx;function fe(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Bm=new Set,yo={};function Pr(t,e){Es(t,e),Es(t+"Capture",e)}function Es(t,e){for(yo[t]=e,t=0;t<e.length;t++)Bm.add(e[t])}var xi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),fu=Object.prototype.hasOwnProperty,ox=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,kf={},zf={};function ax(t){return fu.call(zf,t)?!0:fu.call(kf,t)?!1:ox.test(t)?zf[t]=!0:(kf[t]=!0,!1)}function lx(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function cx(t,e,n,i){if(e===null||typeof e>"u"||lx(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function rn(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Ht={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Ht[t]=new rn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Ht[e]=new rn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Ht[t]=new rn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Ht[t]=new rn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Ht[t]=new rn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Ht[t]=new rn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Ht[t]=new rn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Ht[t]=new rn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Ht[t]=new rn(t,5,!1,t.toLowerCase(),null,!1,!1)});var yd=/[\-:]([a-z])/g;function Sd(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(yd,Sd);Ht[e]=new rn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(yd,Sd);Ht[e]=new rn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(yd,Sd);Ht[e]=new rn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Ht[t]=new rn(t,1,!1,t.toLowerCase(),null,!1,!1)});Ht.xlinkHref=new rn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Ht[t]=new rn(t,1,!1,t.toLowerCase(),null,!0,!0)});function Md(t,e,n,i){var r=Ht.hasOwnProperty(e)?Ht[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(cx(e,n,r,i)&&(n=null),i||r===null?ax(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Ei=sx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Zo=Symbol.for("react.element"),Qr=Symbol.for("react.portal"),es=Symbol.for("react.fragment"),Ed=Symbol.for("react.strict_mode"),hu=Symbol.for("react.profiler"),Hm=Symbol.for("react.provider"),Gm=Symbol.for("react.context"),wd=Symbol.for("react.forward_ref"),pu=Symbol.for("react.suspense"),mu=Symbol.for("react.suspense_list"),Td=Symbol.for("react.memo"),Pi=Symbol.for("react.lazy"),Vm=Symbol.for("react.offscreen"),Bf=Symbol.iterator;function Hs(t){return t===null||typeof t!="object"?null:(t=Bf&&t[Bf]||t["@@iterator"],typeof t=="function"?t:null)}var vt=Object.assign,rc;function eo(t){if(rc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);rc=e&&e[1]||""}return`
`+rc+t}var sc=!1;function oc(t,e){if(!t||sc)return"";sc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{sc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?eo(t):""}function ux(t){switch(t.tag){case 5:return eo(t.type);case 16:return eo("Lazy");case 13:return eo("Suspense");case 19:return eo("SuspenseList");case 0:case 2:case 15:return t=oc(t.type,!1),t;case 11:return t=oc(t.type.render,!1),t;case 1:return t=oc(t.type,!0),t;default:return""}}function gu(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case es:return"Fragment";case Qr:return"Portal";case hu:return"Profiler";case Ed:return"StrictMode";case pu:return"Suspense";case mu:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Gm:return(t.displayName||"Context")+".Consumer";case Hm:return(t._context.displayName||"Context")+".Provider";case wd:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Td:return e=t.displayName||null,e!==null?e:gu(t.type)||"Memo";case Pi:e=t._payload,t=t._init;try{return gu(t(e))}catch{}}return null}function dx(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return gu(e);case 8:return e===Ed?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Ki(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function jm(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function fx(t){var e=jm(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Jo(t){t._valueTracker||(t._valueTracker=fx(t))}function Wm(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=jm(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Za(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function vu(t,e){var n=e.checked;return vt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Hf(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=Ki(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Xm(t,e){e=e.checked,e!=null&&Md(t,"checked",e,!1)}function xu(t,e){Xm(t,e);var n=Ki(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?_u(t,e.type,n):e.hasOwnProperty("defaultValue")&&_u(t,e.type,Ki(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Gf(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function _u(t,e,n){(e!=="number"||Za(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var to=Array.isArray;function ps(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+Ki(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function yu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(fe(91));return vt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Vf(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(fe(92));if(to(n)){if(1<n.length)throw Error(fe(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Ki(n)}}function Ym(t,e){var n=Ki(e.value),i=Ki(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function jf(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function qm(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Su(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?qm(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Qo,$m=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Qo=Qo||document.createElement("div"),Qo.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Qo.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function So(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var ro={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},hx=["Webkit","ms","Moz","O"];Object.keys(ro).forEach(function(t){hx.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),ro[e]=ro[t]})});function Km(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||ro.hasOwnProperty(t)&&ro[t]?(""+e).trim():e+"px"}function Zm(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Km(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var px=vt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Mu(t,e){if(e){if(px[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(fe(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(fe(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(fe(61))}if(e.style!=null&&typeof e.style!="object")throw Error(fe(62))}}function Eu(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var wu=null;function Ad(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Tu=null,ms=null,gs=null;function Wf(t){if(t=Wo(t)){if(typeof Tu!="function")throw Error(fe(280));var e=t.stateNode;e&&(e=Il(e),Tu(t.stateNode,t.type,e))}}function Jm(t){ms?gs?gs.push(t):gs=[t]:ms=t}function Qm(){if(ms){var t=ms,e=gs;if(gs=ms=null,Wf(t),e)for(t=0;t<e.length;t++)Wf(e[t])}}function eg(t,e){return t(e)}function tg(){}var ac=!1;function ng(t,e,n){if(ac)return t(e,n);ac=!0;try{return eg(t,e,n)}finally{ac=!1,(ms!==null||gs!==null)&&(tg(),Qm())}}function Mo(t,e){var n=t.stateNode;if(n===null)return null;var i=Il(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(fe(231,e,typeof n));return n}var Au=!1;if(xi)try{var Gs={};Object.defineProperty(Gs,"passive",{get:function(){Au=!0}}),window.addEventListener("test",Gs,Gs),window.removeEventListener("test",Gs,Gs)}catch{Au=!1}function mx(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(d){this.onError(d)}}var so=!1,Ja=null,Qa=!1,bu=null,gx={onError:function(t){so=!0,Ja=t}};function vx(t,e,n,i,r,s,o,a,l){so=!1,Ja=null,mx.apply(gx,arguments)}function xx(t,e,n,i,r,s,o,a,l){if(vx.apply(this,arguments),so){if(so){var c=Ja;so=!1,Ja=null}else throw Error(fe(198));Qa||(Qa=!0,bu=c)}}function Lr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function ig(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Xf(t){if(Lr(t)!==t)throw Error(fe(188))}function _x(t){var e=t.alternate;if(!e){if(e=Lr(t),e===null)throw Error(fe(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Xf(r),t;if(s===i)return Xf(r),e;s=s.sibling}throw Error(fe(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(fe(189))}}if(n.alternate!==i)throw Error(fe(190))}if(n.tag!==3)throw Error(fe(188));return n.stateNode.current===n?t:e}function rg(t){return t=_x(t),t!==null?sg(t):null}function sg(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=sg(t);if(e!==null)return e;t=t.sibling}return null}var og=_n.unstable_scheduleCallback,Yf=_n.unstable_cancelCallback,yx=_n.unstable_shouldYield,Sx=_n.unstable_requestPaint,Tt=_n.unstable_now,Mx=_n.unstable_getCurrentPriorityLevel,bd=_n.unstable_ImmediatePriority,ag=_n.unstable_UserBlockingPriority,el=_n.unstable_NormalPriority,Ex=_n.unstable_LowPriority,lg=_n.unstable_IdlePriority,Pl=null,Qn=null;function wx(t){if(Qn&&typeof Qn.onCommitFiberRoot=="function")try{Qn.onCommitFiberRoot(Pl,t,void 0,(t.current.flags&128)===128)}catch{}}var Vn=Math.clz32?Math.clz32:bx,Tx=Math.log,Ax=Math.LN2;function bx(t){return t>>>=0,t===0?32:31-(Tx(t)/Ax|0)|0}var ea=64,ta=4194304;function no(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function tl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=no(a):(s&=o,s!==0&&(i=no(s)))}else o=n&~r,o!==0?i=no(o):s!==0&&(i=no(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-Vn(e),r=1<<n,i|=t[n],e&=~r;return i}function Cx(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Rx(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-Vn(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=Cx(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function Cu(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function cg(){var t=ea;return ea<<=1,!(ea&4194240)&&(ea=64),t}function lc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Vo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Vn(e),t[e]=n}function Px(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-Vn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function Cd(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Vn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var rt=0;function ug(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var dg,Rd,fg,hg,pg,Ru=!1,na=[],zi=null,Bi=null,Hi=null,Eo=new Map,wo=new Map,Di=[],Lx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function qf(t,e){switch(t){case"focusin":case"focusout":zi=null;break;case"dragenter":case"dragleave":Bi=null;break;case"mouseover":case"mouseout":Hi=null;break;case"pointerover":case"pointerout":Eo.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":wo.delete(e.pointerId)}}function Vs(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Wo(e),e!==null&&Rd(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function Nx(t,e,n,i,r){switch(e){case"focusin":return zi=Vs(zi,t,e,n,i,r),!0;case"dragenter":return Bi=Vs(Bi,t,e,n,i,r),!0;case"mouseover":return Hi=Vs(Hi,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Eo.set(s,Vs(Eo.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,wo.set(s,Vs(wo.get(s)||null,t,e,n,i,r)),!0}return!1}function mg(t){var e=pr(t.target);if(e!==null){var n=Lr(e);if(n!==null){if(e=n.tag,e===13){if(e=ig(n),e!==null){t.blockedOn=e,pg(t.priority,function(){fg(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ba(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Pu(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);wu=i,n.target.dispatchEvent(i),wu=null}else return e=Wo(n),e!==null&&Rd(e),t.blockedOn=n,!1;e.shift()}return!0}function $f(t,e,n){Ba(t)&&n.delete(e)}function Dx(){Ru=!1,zi!==null&&Ba(zi)&&(zi=null),Bi!==null&&Ba(Bi)&&(Bi=null),Hi!==null&&Ba(Hi)&&(Hi=null),Eo.forEach($f),wo.forEach($f)}function js(t,e){t.blockedOn===e&&(t.blockedOn=null,Ru||(Ru=!0,_n.unstable_scheduleCallback(_n.unstable_NormalPriority,Dx)))}function To(t){function e(r){return js(r,t)}if(0<na.length){js(na[0],t);for(var n=1;n<na.length;n++){var i=na[n];i.blockedOn===t&&(i.blockedOn=null)}}for(zi!==null&&js(zi,t),Bi!==null&&js(Bi,t),Hi!==null&&js(Hi,t),Eo.forEach(e),wo.forEach(e),n=0;n<Di.length;n++)i=Di[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Di.length&&(n=Di[0],n.blockedOn===null);)mg(n),n.blockedOn===null&&Di.shift()}var vs=Ei.ReactCurrentBatchConfig,nl=!0;function Ix(t,e,n,i){var r=rt,s=vs.transition;vs.transition=null;try{rt=1,Pd(t,e,n,i)}finally{rt=r,vs.transition=s}}function Ux(t,e,n,i){var r=rt,s=vs.transition;vs.transition=null;try{rt=4,Pd(t,e,n,i)}finally{rt=r,vs.transition=s}}function Pd(t,e,n,i){if(nl){var r=Pu(t,e,n,i);if(r===null)xc(t,e,i,il,n),qf(t,i);else if(Nx(r,t,e,n,i))i.stopPropagation();else if(qf(t,i),e&4&&-1<Lx.indexOf(t)){for(;r!==null;){var s=Wo(r);if(s!==null&&dg(s),s=Pu(t,e,n,i),s===null&&xc(t,e,i,il,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else xc(t,e,i,null,n)}}var il=null;function Pu(t,e,n,i){if(il=null,t=Ad(i),t=pr(t),t!==null)if(e=Lr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=ig(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return il=t,null}function gg(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Mx()){case bd:return 1;case ag:return 4;case el:case Ex:return 16;case lg:return 536870912;default:return 16}default:return 16}}var Ui=null,Ld=null,Ha=null;function vg(){if(Ha)return Ha;var t,e=Ld,n=e.length,i,r="value"in Ui?Ui.value:Ui.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return Ha=r.slice(t,1<i?1-i:void 0)}function Ga(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function ia(){return!0}function Kf(){return!1}function Sn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?ia:Kf,this.isPropagationStopped=Kf,this}return vt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ia)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ia)},persist:function(){},isPersistent:ia}),e}var Us={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Nd=Sn(Us),jo=vt({},Us,{view:0,detail:0}),Ox=Sn(jo),cc,uc,Ws,Ll=vt({},jo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Dd,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ws&&(Ws&&t.type==="mousemove"?(cc=t.screenX-Ws.screenX,uc=t.screenY-Ws.screenY):uc=cc=0,Ws=t),cc)},movementY:function(t){return"movementY"in t?t.movementY:uc}}),Zf=Sn(Ll),Fx=vt({},Ll,{dataTransfer:0}),kx=Sn(Fx),zx=vt({},jo,{relatedTarget:0}),dc=Sn(zx),Bx=vt({},Us,{animationName:0,elapsedTime:0,pseudoElement:0}),Hx=Sn(Bx),Gx=vt({},Us,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Vx=Sn(Gx),jx=vt({},Us,{data:0}),Jf=Sn(jx),Wx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Xx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Yx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function qx(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Yx[t])?!!e[t]:!1}function Dd(){return qx}var $x=vt({},jo,{key:function(t){if(t.key){var e=Wx[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Ga(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Xx[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Dd,charCode:function(t){return t.type==="keypress"?Ga(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ga(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Kx=Sn($x),Zx=vt({},Ll,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Qf=Sn(Zx),Jx=vt({},jo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Dd}),Qx=Sn(Jx),e_=vt({},Us,{propertyName:0,elapsedTime:0,pseudoElement:0}),t_=Sn(e_),n_=vt({},Ll,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),i_=Sn(n_),r_=[9,13,27,32],Id=xi&&"CompositionEvent"in window,oo=null;xi&&"documentMode"in document&&(oo=document.documentMode);var s_=xi&&"TextEvent"in window&&!oo,xg=xi&&(!Id||oo&&8<oo&&11>=oo),eh=" ",th=!1;function _g(t,e){switch(t){case"keyup":return r_.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function yg(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ts=!1;function o_(t,e){switch(t){case"compositionend":return yg(e);case"keypress":return e.which!==32?null:(th=!0,eh);case"textInput":return t=e.data,t===eh&&th?null:t;default:return null}}function a_(t,e){if(ts)return t==="compositionend"||!Id&&_g(t,e)?(t=vg(),Ha=Ld=Ui=null,ts=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return xg&&e.locale!=="ko"?null:e.data;default:return null}}var l_={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function nh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!l_[t.type]:e==="textarea"}function Sg(t,e,n,i){Jm(i),e=rl(e,"onChange"),0<e.length&&(n=new Nd("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var ao=null,Ao=null;function c_(t){Ng(t,0)}function Nl(t){var e=rs(t);if(Wm(e))return t}function u_(t,e){if(t==="change")return e}var Mg=!1;if(xi){var fc;if(xi){var hc="oninput"in document;if(!hc){var ih=document.createElement("div");ih.setAttribute("oninput","return;"),hc=typeof ih.oninput=="function"}fc=hc}else fc=!1;Mg=fc&&(!document.documentMode||9<document.documentMode)}function rh(){ao&&(ao.detachEvent("onpropertychange",Eg),Ao=ao=null)}function Eg(t){if(t.propertyName==="value"&&Nl(Ao)){var e=[];Sg(e,Ao,t,Ad(t)),ng(c_,e)}}function d_(t,e,n){t==="focusin"?(rh(),ao=e,Ao=n,ao.attachEvent("onpropertychange",Eg)):t==="focusout"&&rh()}function f_(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Nl(Ao)}function h_(t,e){if(t==="click")return Nl(e)}function p_(t,e){if(t==="input"||t==="change")return Nl(e)}function m_(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Wn=typeof Object.is=="function"?Object.is:m_;function bo(t,e){if(Wn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!fu.call(e,r)||!Wn(t[r],e[r]))return!1}return!0}function sh(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function oh(t,e){var n=sh(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=sh(n)}}function wg(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?wg(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Tg(){for(var t=window,e=Za();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Za(t.document)}return e}function Ud(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function g_(t){var e=Tg(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&wg(n.ownerDocument.documentElement,n)){if(i!==null&&Ud(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=oh(n,s);var o=oh(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var v_=xi&&"documentMode"in document&&11>=document.documentMode,ns=null,Lu=null,lo=null,Nu=!1;function ah(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Nu||ns==null||ns!==Za(i)||(i=ns,"selectionStart"in i&&Ud(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),lo&&bo(lo,i)||(lo=i,i=rl(Lu,"onSelect"),0<i.length&&(e=new Nd("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=ns)))}function ra(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var is={animationend:ra("Animation","AnimationEnd"),animationiteration:ra("Animation","AnimationIteration"),animationstart:ra("Animation","AnimationStart"),transitionend:ra("Transition","TransitionEnd")},pc={},Ag={};xi&&(Ag=document.createElement("div").style,"AnimationEvent"in window||(delete is.animationend.animation,delete is.animationiteration.animation,delete is.animationstart.animation),"TransitionEvent"in window||delete is.transitionend.transition);function Dl(t){if(pc[t])return pc[t];if(!is[t])return t;var e=is[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Ag)return pc[t]=e[n];return t}var bg=Dl("animationend"),Cg=Dl("animationiteration"),Rg=Dl("animationstart"),Pg=Dl("transitionend"),Lg=new Map,lh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function er(t,e){Lg.set(t,e),Pr(e,[t])}for(var mc=0;mc<lh.length;mc++){var gc=lh[mc],x_=gc.toLowerCase(),__=gc[0].toUpperCase()+gc.slice(1);er(x_,"on"+__)}er(bg,"onAnimationEnd");er(Cg,"onAnimationIteration");er(Rg,"onAnimationStart");er("dblclick","onDoubleClick");er("focusin","onFocus");er("focusout","onBlur");er(Pg,"onTransitionEnd");Es("onMouseEnter",["mouseout","mouseover"]);Es("onMouseLeave",["mouseout","mouseover"]);Es("onPointerEnter",["pointerout","pointerover"]);Es("onPointerLeave",["pointerout","pointerover"]);Pr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Pr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Pr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Pr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Pr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Pr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var io="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),y_=new Set("cancel close invalid load scroll toggle".split(" ").concat(io));function ch(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,xx(i,e,void 0,t),t.currentTarget=null}function Ng(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;ch(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;ch(r,a,c),s=l}}}if(Qa)throw t=bu,Qa=!1,bu=null,t}function ct(t,e){var n=e[Fu];n===void 0&&(n=e[Fu]=new Set);var i=t+"__bubble";n.has(i)||(Dg(e,t,2,!1),n.add(i))}function vc(t,e,n){var i=0;e&&(i|=4),Dg(n,t,i,e)}var sa="_reactListening"+Math.random().toString(36).slice(2);function Co(t){if(!t[sa]){t[sa]=!0,Bm.forEach(function(n){n!=="selectionchange"&&(y_.has(n)||vc(n,!1,t),vc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[sa]||(e[sa]=!0,vc("selectionchange",!1,e))}}function Dg(t,e,n,i){switch(gg(e)){case 1:var r=Ix;break;case 4:r=Ux;break;default:r=Pd}n=r.bind(null,e,n,t),r=void 0,!Au||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function xc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=pr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}ng(function(){var c=s,d=Ad(n),f=[];e:{var h=Lg.get(t);if(h!==void 0){var p=Nd,_=t;switch(t){case"keypress":if(Ga(n)===0)break e;case"keydown":case"keyup":p=Kx;break;case"focusin":_="focus",p=dc;break;case"focusout":_="blur",p=dc;break;case"beforeblur":case"afterblur":p=dc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Zf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=kx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=Qx;break;case bg:case Cg:case Rg:p=Hx;break;case Pg:p=t_;break;case"scroll":p=Ox;break;case"wheel":p=i_;break;case"copy":case"cut":case"paste":p=Vx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Qf}var y=(e&4)!==0,m=!y&&t==="scroll",u=y?h!==null?h+"Capture":null:h;y=[];for(var v=c,g;v!==null;){g=v;var M=g.stateNode;if(g.tag===5&&M!==null&&(g=M,u!==null&&(M=Mo(v,u),M!=null&&y.push(Ro(v,M,g)))),m)break;v=v.return}0<y.length&&(h=new p(h,_,null,n,d),f.push({event:h,listeners:y}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",h&&n!==wu&&(_=n.relatedTarget||n.fromElement)&&(pr(_)||_[_i]))break e;if((p||h)&&(h=d.window===d?d:(h=d.ownerDocument)?h.defaultView||h.parentWindow:window,p?(_=n.relatedTarget||n.toElement,p=c,_=_?pr(_):null,_!==null&&(m=Lr(_),_!==m||_.tag!==5&&_.tag!==6)&&(_=null)):(p=null,_=c),p!==_)){if(y=Zf,M="onMouseLeave",u="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(y=Qf,M="onPointerLeave",u="onPointerEnter",v="pointer"),m=p==null?h:rs(p),g=_==null?h:rs(_),h=new y(M,v+"leave",p,n,d),h.target=m,h.relatedTarget=g,M=null,pr(d)===c&&(y=new y(u,v+"enter",_,n,d),y.target=g,y.relatedTarget=m,M=y),m=M,p&&_)t:{for(y=p,u=_,v=0,g=y;g;g=Dr(g))v++;for(g=0,M=u;M;M=Dr(M))g++;for(;0<v-g;)y=Dr(y),v--;for(;0<g-v;)u=Dr(u),g--;for(;v--;){if(y===u||u!==null&&y===u.alternate)break t;y=Dr(y),u=Dr(u)}y=null}else y=null;p!==null&&uh(f,h,p,y,!1),_!==null&&m!==null&&uh(f,m,_,y,!0)}}e:{if(h=c?rs(c):window,p=h.nodeName&&h.nodeName.toLowerCase(),p==="select"||p==="input"&&h.type==="file")var P=u_;else if(nh(h))if(Mg)P=p_;else{P=f_;var T=d_}else(p=h.nodeName)&&p.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(P=h_);if(P&&(P=P(t,c))){Sg(f,P,n,d);break e}T&&T(t,h,c),t==="focusout"&&(T=h._wrapperState)&&T.controlled&&h.type==="number"&&_u(h,"number",h.value)}switch(T=c?rs(c):window,t){case"focusin":(nh(T)||T.contentEditable==="true")&&(ns=T,Lu=c,lo=null);break;case"focusout":lo=Lu=ns=null;break;case"mousedown":Nu=!0;break;case"contextmenu":case"mouseup":case"dragend":Nu=!1,ah(f,n,d);break;case"selectionchange":if(v_)break;case"keydown":case"keyup":ah(f,n,d)}var S;if(Id)e:{switch(t){case"compositionstart":var L="onCompositionStart";break e;case"compositionend":L="onCompositionEnd";break e;case"compositionupdate":L="onCompositionUpdate";break e}L=void 0}else ts?_g(t,n)&&(L="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(L="onCompositionStart");L&&(xg&&n.locale!=="ko"&&(ts||L!=="onCompositionStart"?L==="onCompositionEnd"&&ts&&(S=vg()):(Ui=d,Ld="value"in Ui?Ui.value:Ui.textContent,ts=!0)),T=rl(c,L),0<T.length&&(L=new Jf(L,t,null,n,d),f.push({event:L,listeners:T}),S?L.data=S:(S=yg(n),S!==null&&(L.data=S)))),(S=s_?o_(t,n):a_(t,n))&&(c=rl(c,"onBeforeInput"),0<c.length&&(d=new Jf("onBeforeInput","beforeinput",null,n,d),f.push({event:d,listeners:c}),d.data=S))}Ng(f,e)})}function Ro(t,e,n){return{instance:t,listener:e,currentTarget:n}}function rl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Mo(t,n),s!=null&&i.unshift(Ro(t,s,r)),s=Mo(t,e),s!=null&&i.push(Ro(t,s,r))),t=t.return}return i}function Dr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function uh(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=Mo(n,s),l!=null&&o.unshift(Ro(n,l,a))):r||(l=Mo(n,s),l!=null&&o.push(Ro(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var S_=/\r\n?/g,M_=/\u0000|\uFFFD/g;function dh(t){return(typeof t=="string"?t:""+t).replace(S_,`
`).replace(M_,"")}function oa(t,e,n){if(e=dh(e),dh(t)!==e&&n)throw Error(fe(425))}function sl(){}var Du=null,Iu=null;function Uu(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Ou=typeof setTimeout=="function"?setTimeout:void 0,E_=typeof clearTimeout=="function"?clearTimeout:void 0,fh=typeof Promise=="function"?Promise:void 0,w_=typeof queueMicrotask=="function"?queueMicrotask:typeof fh<"u"?function(t){return fh.resolve(null).then(t).catch(T_)}:Ou;function T_(t){setTimeout(function(){throw t})}function _c(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),To(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);To(e)}function Gi(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function hh(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Os=Math.random().toString(36).slice(2),Kn="__reactFiber$"+Os,Po="__reactProps$"+Os,_i="__reactContainer$"+Os,Fu="__reactEvents$"+Os,A_="__reactListeners$"+Os,b_="__reactHandles$"+Os;function pr(t){var e=t[Kn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[_i]||n[Kn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=hh(t);t!==null;){if(n=t[Kn])return n;t=hh(t)}return e}t=n,n=t.parentNode}return null}function Wo(t){return t=t[Kn]||t[_i],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function rs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(fe(33))}function Il(t){return t[Po]||null}var ku=[],ss=-1;function tr(t){return{current:t}}function dt(t){0>ss||(t.current=ku[ss],ku[ss]=null,ss--)}function ot(t,e){ss++,ku[ss]=t.current,t.current=e}var Zi={},qt=tr(Zi),cn=tr(!1),Mr=Zi;function ws(t,e){var n=t.type.contextTypes;if(!n)return Zi;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function un(t){return t=t.childContextTypes,t!=null}function ol(){dt(cn),dt(qt)}function ph(t,e,n){if(qt.current!==Zi)throw Error(fe(168));ot(qt,e),ot(cn,n)}function Ig(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(fe(108,dx(t)||"Unknown",r));return vt({},n,i)}function al(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Zi,Mr=qt.current,ot(qt,t),ot(cn,cn.current),!0}function mh(t,e,n){var i=t.stateNode;if(!i)throw Error(fe(169));n?(t=Ig(t,e,Mr),i.__reactInternalMemoizedMergedChildContext=t,dt(cn),dt(qt),ot(qt,t)):dt(cn),ot(cn,n)}var fi=null,Ul=!1,yc=!1;function Ug(t){fi===null?fi=[t]:fi.push(t)}function C_(t){Ul=!0,Ug(t)}function nr(){if(!yc&&fi!==null){yc=!0;var t=0,e=rt;try{var n=fi;for(rt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}fi=null,Ul=!1}catch(r){throw fi!==null&&(fi=fi.slice(t+1)),og(bd,nr),r}finally{rt=e,yc=!1}}return null}var os=[],as=0,ll=null,cl=0,Tn=[],An=0,Er=null,pi=1,mi="";function cr(t,e){os[as++]=cl,os[as++]=ll,ll=t,cl=e}function Og(t,e,n){Tn[An++]=pi,Tn[An++]=mi,Tn[An++]=Er,Er=t;var i=pi;t=mi;var r=32-Vn(i)-1;i&=~(1<<r),n+=1;var s=32-Vn(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,pi=1<<32-Vn(e)+r|n<<r|i,mi=s+t}else pi=1<<s|n<<r|i,mi=t}function Od(t){t.return!==null&&(cr(t,1),Og(t,1,0))}function Fd(t){for(;t===ll;)ll=os[--as],os[as]=null,cl=os[--as],os[as]=null;for(;t===Er;)Er=Tn[--An],Tn[An]=null,mi=Tn[--An],Tn[An]=null,pi=Tn[--An],Tn[An]=null}var xn=null,vn=null,ft=!1,zn=null;function Fg(t,e){var n=Rn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function gh(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,xn=t,vn=Gi(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,xn=t,vn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Er!==null?{id:pi,overflow:mi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Rn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,xn=t,vn=null,!0):!1;default:return!1}}function zu(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Bu(t){if(ft){var e=vn;if(e){var n=e;if(!gh(t,e)){if(zu(t))throw Error(fe(418));e=Gi(n.nextSibling);var i=xn;e&&gh(t,e)?Fg(i,n):(t.flags=t.flags&-4097|2,ft=!1,xn=t)}}else{if(zu(t))throw Error(fe(418));t.flags=t.flags&-4097|2,ft=!1,xn=t}}}function vh(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;xn=t}function aa(t){if(t!==xn)return!1;if(!ft)return vh(t),ft=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Uu(t.type,t.memoizedProps)),e&&(e=vn)){if(zu(t))throw kg(),Error(fe(418));for(;e;)Fg(t,e),e=Gi(e.nextSibling)}if(vh(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(fe(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){vn=Gi(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}vn=null}}else vn=xn?Gi(t.stateNode.nextSibling):null;return!0}function kg(){for(var t=vn;t;)t=Gi(t.nextSibling)}function Ts(){vn=xn=null,ft=!1}function kd(t){zn===null?zn=[t]:zn.push(t)}var R_=Ei.ReactCurrentBatchConfig;function Xs(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(fe(309));var i=n.stateNode}if(!i)throw Error(fe(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(fe(284));if(!n._owner)throw Error(fe(290,t))}return t}function la(t,e){throw t=Object.prototype.toString.call(e),Error(fe(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function xh(t){var e=t._init;return e(t._payload)}function zg(t){function e(u,v){if(t){var g=u.deletions;g===null?(u.deletions=[v],u.flags|=16):g.push(v)}}function n(u,v){if(!t)return null;for(;v!==null;)e(u,v),v=v.sibling;return null}function i(u,v){for(u=new Map;v!==null;)v.key!==null?u.set(v.key,v):u.set(v.index,v),v=v.sibling;return u}function r(u,v){return u=Xi(u,v),u.index=0,u.sibling=null,u}function s(u,v,g){return u.index=g,t?(g=u.alternate,g!==null?(g=g.index,g<v?(u.flags|=2,v):g):(u.flags|=2,v)):(u.flags|=1048576,v)}function o(u){return t&&u.alternate===null&&(u.flags|=2),u}function a(u,v,g,M){return v===null||v.tag!==6?(v=bc(g,u.mode,M),v.return=u,v):(v=r(v,g),v.return=u,v)}function l(u,v,g,M){var P=g.type;return P===es?d(u,v,g.props.children,M,g.key):v!==null&&(v.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===Pi&&xh(P)===v.type)?(M=r(v,g.props),M.ref=Xs(u,v,g),M.return=u,M):(M=$a(g.type,g.key,g.props,null,u.mode,M),M.ref=Xs(u,v,g),M.return=u,M)}function c(u,v,g,M){return v===null||v.tag!==4||v.stateNode.containerInfo!==g.containerInfo||v.stateNode.implementation!==g.implementation?(v=Cc(g,u.mode,M),v.return=u,v):(v=r(v,g.children||[]),v.return=u,v)}function d(u,v,g,M,P){return v===null||v.tag!==7?(v=xr(g,u.mode,M,P),v.return=u,v):(v=r(v,g),v.return=u,v)}function f(u,v,g){if(typeof v=="string"&&v!==""||typeof v=="number")return v=bc(""+v,u.mode,g),v.return=u,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Zo:return g=$a(v.type,v.key,v.props,null,u.mode,g),g.ref=Xs(u,null,v),g.return=u,g;case Qr:return v=Cc(v,u.mode,g),v.return=u,v;case Pi:var M=v._init;return f(u,M(v._payload),g)}if(to(v)||Hs(v))return v=xr(v,u.mode,g,null),v.return=u,v;la(u,v)}return null}function h(u,v,g,M){var P=v!==null?v.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return P!==null?null:a(u,v,""+g,M);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Zo:return g.key===P?l(u,v,g,M):null;case Qr:return g.key===P?c(u,v,g,M):null;case Pi:return P=g._init,h(u,v,P(g._payload),M)}if(to(g)||Hs(g))return P!==null?null:d(u,v,g,M,null);la(u,g)}return null}function p(u,v,g,M,P){if(typeof M=="string"&&M!==""||typeof M=="number")return u=u.get(g)||null,a(v,u,""+M,P);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case Zo:return u=u.get(M.key===null?g:M.key)||null,l(v,u,M,P);case Qr:return u=u.get(M.key===null?g:M.key)||null,c(v,u,M,P);case Pi:var T=M._init;return p(u,v,g,T(M._payload),P)}if(to(M)||Hs(M))return u=u.get(g)||null,d(v,u,M,P,null);la(v,M)}return null}function _(u,v,g,M){for(var P=null,T=null,S=v,L=v=0,E=null;S!==null&&L<g.length;L++){S.index>L?(E=S,S=null):E=S.sibling;var A=h(u,S,g[L],M);if(A===null){S===null&&(S=E);break}t&&S&&A.alternate===null&&e(u,S),v=s(A,v,L),T===null?P=A:T.sibling=A,T=A,S=E}if(L===g.length)return n(u,S),ft&&cr(u,L),P;if(S===null){for(;L<g.length;L++)S=f(u,g[L],M),S!==null&&(v=s(S,v,L),T===null?P=S:T.sibling=S,T=S);return ft&&cr(u,L),P}for(S=i(u,S);L<g.length;L++)E=p(S,u,L,g[L],M),E!==null&&(t&&E.alternate!==null&&S.delete(E.key===null?L:E.key),v=s(E,v,L),T===null?P=E:T.sibling=E,T=E);return t&&S.forEach(function(B){return e(u,B)}),ft&&cr(u,L),P}function y(u,v,g,M){var P=Hs(g);if(typeof P!="function")throw Error(fe(150));if(g=P.call(g),g==null)throw Error(fe(151));for(var T=P=null,S=v,L=v=0,E=null,A=g.next();S!==null&&!A.done;L++,A=g.next()){S.index>L?(E=S,S=null):E=S.sibling;var B=h(u,S,A.value,M);if(B===null){S===null&&(S=E);break}t&&S&&B.alternate===null&&e(u,S),v=s(B,v,L),T===null?P=B:T.sibling=B,T=B,S=E}if(A.done)return n(u,S),ft&&cr(u,L),P;if(S===null){for(;!A.done;L++,A=g.next())A=f(u,A.value,M),A!==null&&(v=s(A,v,L),T===null?P=A:T.sibling=A,T=A);return ft&&cr(u,L),P}for(S=i(u,S);!A.done;L++,A=g.next())A=p(S,u,L,A.value,M),A!==null&&(t&&A.alternate!==null&&S.delete(A.key===null?L:A.key),v=s(A,v,L),T===null?P=A:T.sibling=A,T=A);return t&&S.forEach(function(D){return e(u,D)}),ft&&cr(u,L),P}function m(u,v,g,M){if(typeof g=="object"&&g!==null&&g.type===es&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case Zo:e:{for(var P=g.key,T=v;T!==null;){if(T.key===P){if(P=g.type,P===es){if(T.tag===7){n(u,T.sibling),v=r(T,g.props.children),v.return=u,u=v;break e}}else if(T.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===Pi&&xh(P)===T.type){n(u,T.sibling),v=r(T,g.props),v.ref=Xs(u,T,g),v.return=u,u=v;break e}n(u,T);break}else e(u,T);T=T.sibling}g.type===es?(v=xr(g.props.children,u.mode,M,g.key),v.return=u,u=v):(M=$a(g.type,g.key,g.props,null,u.mode,M),M.ref=Xs(u,v,g),M.return=u,u=M)}return o(u);case Qr:e:{for(T=g.key;v!==null;){if(v.key===T)if(v.tag===4&&v.stateNode.containerInfo===g.containerInfo&&v.stateNode.implementation===g.implementation){n(u,v.sibling),v=r(v,g.children||[]),v.return=u,u=v;break e}else{n(u,v);break}else e(u,v);v=v.sibling}v=Cc(g,u.mode,M),v.return=u,u=v}return o(u);case Pi:return T=g._init,m(u,v,T(g._payload),M)}if(to(g))return _(u,v,g,M);if(Hs(g))return y(u,v,g,M);la(u,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,v!==null&&v.tag===6?(n(u,v.sibling),v=r(v,g),v.return=u,u=v):(n(u,v),v=bc(g,u.mode,M),v.return=u,u=v),o(u)):n(u,v)}return m}var As=zg(!0),Bg=zg(!1),ul=tr(null),dl=null,ls=null,zd=null;function Bd(){zd=ls=dl=null}function Hd(t){var e=ul.current;dt(ul),t._currentValue=e}function Hu(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function xs(t,e){dl=t,zd=ls=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(ln=!0),t.firstContext=null)}function Ln(t){var e=t._currentValue;if(zd!==t)if(t={context:t,memoizedValue:e,next:null},ls===null){if(dl===null)throw Error(fe(308));ls=t,dl.dependencies={lanes:0,firstContext:t}}else ls=ls.next=t;return e}var mr=null;function Gd(t){mr===null?mr=[t]:mr.push(t)}function Hg(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Gd(e)):(n.next=r.next,r.next=n),e.interleaved=n,yi(t,i)}function yi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Li=!1;function Vd(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Gg(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function vi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Vi(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,tt&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,yi(t,n)}return r=i.interleaved,r===null?(e.next=e,Gd(i)):(e.next=r.next,r.next=e),i.interleaved=e,yi(t,n)}function Va(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Cd(t,n)}}function _h(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function fl(t,e,n,i){var r=t.updateQueue;Li=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var d=t.alternate;d!==null&&(d=d.updateQueue,a=d.lastBaseUpdate,a!==o&&(a===null?d.firstBaseUpdate=c:a.next=c,d.lastBaseUpdate=l))}if(s!==null){var f=r.baseState;o=0,d=c=l=null,a=s;do{var h=a.lane,p=a.eventTime;if((i&h)===h){d!==null&&(d=d.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var _=t,y=a;switch(h=e,p=n,y.tag){case 1:if(_=y.payload,typeof _=="function"){f=_.call(p,f,h);break e}f=_;break e;case 3:_.flags=_.flags&-65537|128;case 0:if(_=y.payload,h=typeof _=="function"?_.call(p,f,h):_,h==null)break e;f=vt({},f,h);break e;case 2:Li=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,h=r.effects,h===null?r.effects=[a]:h.push(a))}else p={eventTime:p,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},d===null?(c=d=p,l=f):d=d.next=p,o|=h;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;h=a,a=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(d===null&&(l=f),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=d,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Tr|=o,t.lanes=o,t.memoizedState=f}}function yh(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(fe(191,r));r.call(i)}}}var Xo={},ei=tr(Xo),Lo=tr(Xo),No=tr(Xo);function gr(t){if(t===Xo)throw Error(fe(174));return t}function jd(t,e){switch(ot(No,e),ot(Lo,t),ot(ei,Xo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Su(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Su(e,t)}dt(ei),ot(ei,e)}function bs(){dt(ei),dt(Lo),dt(No)}function Vg(t){gr(No.current);var e=gr(ei.current),n=Su(e,t.type);e!==n&&(ot(Lo,t),ot(ei,n))}function Wd(t){Lo.current===t&&(dt(ei),dt(Lo))}var mt=tr(0);function hl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Sc=[];function Xd(){for(var t=0;t<Sc.length;t++)Sc[t]._workInProgressVersionPrimary=null;Sc.length=0}var ja=Ei.ReactCurrentDispatcher,Mc=Ei.ReactCurrentBatchConfig,wr=0,gt=null,Pt=null,Ot=null,pl=!1,co=!1,Do=0,P_=0;function Vt(){throw Error(fe(321))}function Yd(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Wn(t[n],e[n]))return!1;return!0}function qd(t,e,n,i,r,s){if(wr=s,gt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,ja.current=t===null||t.memoizedState===null?I_:U_,t=n(i,r),co){s=0;do{if(co=!1,Do=0,25<=s)throw Error(fe(301));s+=1,Ot=Pt=null,e.updateQueue=null,ja.current=O_,t=n(i,r)}while(co)}if(ja.current=ml,e=Pt!==null&&Pt.next!==null,wr=0,Ot=Pt=gt=null,pl=!1,e)throw Error(fe(300));return t}function $d(){var t=Do!==0;return Do=0,t}function qn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ot===null?gt.memoizedState=Ot=t:Ot=Ot.next=t,Ot}function Nn(){if(Pt===null){var t=gt.alternate;t=t!==null?t.memoizedState:null}else t=Pt.next;var e=Ot===null?gt.memoizedState:Ot.next;if(e!==null)Ot=e,Pt=t;else{if(t===null)throw Error(fe(310));Pt=t,t={memoizedState:Pt.memoizedState,baseState:Pt.baseState,baseQueue:Pt.baseQueue,queue:Pt.queue,next:null},Ot===null?gt.memoizedState=Ot=t:Ot=Ot.next=t}return Ot}function Io(t,e){return typeof e=="function"?e(t):e}function Ec(t){var e=Nn(),n=e.queue;if(n===null)throw Error(fe(311));n.lastRenderedReducer=t;var i=Pt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var d=c.lane;if((wr&d)===d)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var f={lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=f,o=i):l=l.next=f,gt.lanes|=d,Tr|=d}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,Wn(i,e.memoizedState)||(ln=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,gt.lanes|=s,Tr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function wc(t){var e=Nn(),n=e.queue;if(n===null)throw Error(fe(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);Wn(s,e.memoizedState)||(ln=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function jg(){}function Wg(t,e){var n=gt,i=Nn(),r=e(),s=!Wn(i.memoizedState,r);if(s&&(i.memoizedState=r,ln=!0),i=i.queue,Kd(qg.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Ot!==null&&Ot.memoizedState.tag&1){if(n.flags|=2048,Uo(9,Yg.bind(null,n,i,r,e),void 0,null),Ft===null)throw Error(fe(349));wr&30||Xg(n,e,r)}return r}function Xg(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=gt.updateQueue,e===null?(e={lastEffect:null,stores:null},gt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Yg(t,e,n,i){e.value=n,e.getSnapshot=i,$g(e)&&Kg(t)}function qg(t,e,n){return n(function(){$g(e)&&Kg(t)})}function $g(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Wn(t,n)}catch{return!0}}function Kg(t){var e=yi(t,1);e!==null&&jn(e,t,1,-1)}function Sh(t){var e=qn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Io,lastRenderedState:t},e.queue=t,t=t.dispatch=D_.bind(null,gt,t),[e.memoizedState,t]}function Uo(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=gt.updateQueue,e===null?(e={lastEffect:null,stores:null},gt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function Zg(){return Nn().memoizedState}function Wa(t,e,n,i){var r=qn();gt.flags|=t,r.memoizedState=Uo(1|e,n,void 0,i===void 0?null:i)}function Ol(t,e,n,i){var r=Nn();i=i===void 0?null:i;var s=void 0;if(Pt!==null){var o=Pt.memoizedState;if(s=o.destroy,i!==null&&Yd(i,o.deps)){r.memoizedState=Uo(e,n,s,i);return}}gt.flags|=t,r.memoizedState=Uo(1|e,n,s,i)}function Mh(t,e){return Wa(8390656,8,t,e)}function Kd(t,e){return Ol(2048,8,t,e)}function Jg(t,e){return Ol(4,2,t,e)}function Qg(t,e){return Ol(4,4,t,e)}function e0(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function t0(t,e,n){return n=n!=null?n.concat([t]):null,Ol(4,4,e0.bind(null,e,t),n)}function Zd(){}function n0(t,e){var n=Nn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Yd(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function i0(t,e){var n=Nn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Yd(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function r0(t,e,n){return wr&21?(Wn(n,e)||(n=cg(),gt.lanes|=n,Tr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,ln=!0),t.memoizedState=n)}function L_(t,e){var n=rt;rt=n!==0&&4>n?n:4,t(!0);var i=Mc.transition;Mc.transition={};try{t(!1),e()}finally{rt=n,Mc.transition=i}}function s0(){return Nn().memoizedState}function N_(t,e,n){var i=Wi(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},o0(t))a0(e,n);else if(n=Hg(t,e,n,i),n!==null){var r=en();jn(n,t,i,r),l0(n,e,i)}}function D_(t,e,n){var i=Wi(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(o0(t))a0(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,Wn(a,o)){var l=e.interleaved;l===null?(r.next=r,Gd(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=Hg(t,e,r,i),n!==null&&(r=en(),jn(n,t,i,r),l0(n,e,i))}}function o0(t){var e=t.alternate;return t===gt||e!==null&&e===gt}function a0(t,e){co=pl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function l0(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Cd(t,n)}}var ml={readContext:Ln,useCallback:Vt,useContext:Vt,useEffect:Vt,useImperativeHandle:Vt,useInsertionEffect:Vt,useLayoutEffect:Vt,useMemo:Vt,useReducer:Vt,useRef:Vt,useState:Vt,useDebugValue:Vt,useDeferredValue:Vt,useTransition:Vt,useMutableSource:Vt,useSyncExternalStore:Vt,useId:Vt,unstable_isNewReconciler:!1},I_={readContext:Ln,useCallback:function(t,e){return qn().memoizedState=[t,e===void 0?null:e],t},useContext:Ln,useEffect:Mh,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Wa(4194308,4,e0.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Wa(4194308,4,t,e)},useInsertionEffect:function(t,e){return Wa(4,2,t,e)},useMemo:function(t,e){var n=qn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=qn();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=N_.bind(null,gt,t),[i.memoizedState,t]},useRef:function(t){var e=qn();return t={current:t},e.memoizedState=t},useState:Sh,useDebugValue:Zd,useDeferredValue:function(t){return qn().memoizedState=t},useTransition:function(){var t=Sh(!1),e=t[0];return t=L_.bind(null,t[1]),qn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=gt,r=qn();if(ft){if(n===void 0)throw Error(fe(407));n=n()}else{if(n=e(),Ft===null)throw Error(fe(349));wr&30||Xg(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Mh(qg.bind(null,i,s,t),[t]),i.flags|=2048,Uo(9,Yg.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=qn(),e=Ft.identifierPrefix;if(ft){var n=mi,i=pi;n=(i&~(1<<32-Vn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Do++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=P_++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},U_={readContext:Ln,useCallback:n0,useContext:Ln,useEffect:Kd,useImperativeHandle:t0,useInsertionEffect:Jg,useLayoutEffect:Qg,useMemo:i0,useReducer:Ec,useRef:Zg,useState:function(){return Ec(Io)},useDebugValue:Zd,useDeferredValue:function(t){var e=Nn();return r0(e,Pt.memoizedState,t)},useTransition:function(){var t=Ec(Io)[0],e=Nn().memoizedState;return[t,e]},useMutableSource:jg,useSyncExternalStore:Wg,useId:s0,unstable_isNewReconciler:!1},O_={readContext:Ln,useCallback:n0,useContext:Ln,useEffect:Kd,useImperativeHandle:t0,useInsertionEffect:Jg,useLayoutEffect:Qg,useMemo:i0,useReducer:wc,useRef:Zg,useState:function(){return wc(Io)},useDebugValue:Zd,useDeferredValue:function(t){var e=Nn();return Pt===null?e.memoizedState=t:r0(e,Pt.memoizedState,t)},useTransition:function(){var t=wc(Io)[0],e=Nn().memoizedState;return[t,e]},useMutableSource:jg,useSyncExternalStore:Wg,useId:s0,unstable_isNewReconciler:!1};function Fn(t,e){if(t&&t.defaultProps){e=vt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Gu(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:vt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Fl={isMounted:function(t){return(t=t._reactInternals)?Lr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=en(),r=Wi(t),s=vi(i,r);s.payload=e,n!=null&&(s.callback=n),e=Vi(t,s,r),e!==null&&(jn(e,t,r,i),Va(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=en(),r=Wi(t),s=vi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Vi(t,s,r),e!==null&&(jn(e,t,r,i),Va(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=en(),i=Wi(t),r=vi(n,i);r.tag=2,e!=null&&(r.callback=e),e=Vi(t,r,i),e!==null&&(jn(e,t,i,n),Va(e,t,i))}};function Eh(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!bo(n,i)||!bo(r,s):!0}function c0(t,e,n){var i=!1,r=Zi,s=e.contextType;return typeof s=="object"&&s!==null?s=Ln(s):(r=un(e)?Mr:qt.current,i=e.contextTypes,s=(i=i!=null)?ws(t,r):Zi),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Fl,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function wh(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Fl.enqueueReplaceState(e,e.state,null)}function Vu(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Vd(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Ln(s):(s=un(e)?Mr:qt.current,r.context=ws(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Gu(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Fl.enqueueReplaceState(r,r.state,null),fl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Cs(t,e){try{var n="",i=e;do n+=ux(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Tc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function ju(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var F_=typeof WeakMap=="function"?WeakMap:Map;function u0(t,e,n){n=vi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){vl||(vl=!0,ed=i),ju(t,e)},n}function d0(t,e,n){n=vi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){ju(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){ju(t,e),typeof i!="function"&&(ji===null?ji=new Set([this]):ji.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Th(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new F_;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=Z_.bind(null,t,e,n),e.then(t,t))}function Ah(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function bh(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=vi(-1,1),e.tag=2,Vi(n,e,1))),n.lanes|=1),t)}var k_=Ei.ReactCurrentOwner,ln=!1;function Jt(t,e,n,i){e.child=t===null?Bg(e,null,n,i):As(e,t.child,n,i)}function Ch(t,e,n,i,r){n=n.render;var s=e.ref;return xs(e,r),i=qd(t,e,n,i,s,r),n=$d(),t!==null&&!ln?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Si(t,e,r)):(ft&&n&&Od(e),e.flags|=1,Jt(t,e,i,r),e.child)}function Rh(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!of(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,f0(t,e,s,i,r)):(t=$a(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:bo,n(o,i)&&t.ref===e.ref)return Si(t,e,r)}return e.flags|=1,t=Xi(s,i),t.ref=e.ref,t.return=e,e.child=t}function f0(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(bo(s,i)&&t.ref===e.ref)if(ln=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(ln=!0);else return e.lanes=t.lanes,Si(t,e,r)}return Wu(t,e,n,i,r)}function h0(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ot(us,gn),gn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ot(us,gn),gn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,ot(us,gn),gn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,ot(us,gn),gn|=i;return Jt(t,e,r,n),e.child}function p0(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Wu(t,e,n,i,r){var s=un(n)?Mr:qt.current;return s=ws(e,s),xs(e,r),n=qd(t,e,n,i,s,r),i=$d(),t!==null&&!ln?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Si(t,e,r)):(ft&&i&&Od(e),e.flags|=1,Jt(t,e,n,r),e.child)}function Ph(t,e,n,i,r){if(un(n)){var s=!0;al(e)}else s=!1;if(xs(e,r),e.stateNode===null)Xa(t,e),c0(e,n,i),Vu(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Ln(c):(c=un(n)?Mr:qt.current,c=ws(e,c));var d=n.getDerivedStateFromProps,f=typeof d=="function"||typeof o.getSnapshotBeforeUpdate=="function";f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&wh(e,o,i,c),Li=!1;var h=e.memoizedState;o.state=h,fl(e,i,o,r),l=e.memoizedState,a!==i||h!==l||cn.current||Li?(typeof d=="function"&&(Gu(e,n,d,i),l=e.memoizedState),(a=Li||Eh(e,n,a,i,h,l,c))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,Gg(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:Fn(e.type,a),o.props=c,f=e.pendingProps,h=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Ln(l):(l=un(n)?Mr:qt.current,l=ws(e,l));var p=n.getDerivedStateFromProps;(d=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==f||h!==l)&&wh(e,o,i,l),Li=!1,h=e.memoizedState,o.state=h,fl(e,i,o,r);var _=e.memoizedState;a!==f||h!==_||cn.current||Li?(typeof p=="function"&&(Gu(e,n,p,i),_=e.memoizedState),(c=Li||Eh(e,n,c,i,h,_,l)||!1)?(d||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,_,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,_,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=_),o.props=i,o.state=_,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),i=!1)}return Xu(t,e,n,i,s,r)}function Xu(t,e,n,i,r,s){p0(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&mh(e,n,!1),Si(t,e,s);i=e.stateNode,k_.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=As(e,t.child,null,s),e.child=As(e,null,a,s)):Jt(t,e,a,s),e.memoizedState=i.state,r&&mh(e,n,!0),e.child}function m0(t){var e=t.stateNode;e.pendingContext?ph(t,e.pendingContext,e.pendingContext!==e.context):e.context&&ph(t,e.context,!1),jd(t,e.containerInfo)}function Lh(t,e,n,i,r){return Ts(),kd(r),e.flags|=256,Jt(t,e,n,i),e.child}var Yu={dehydrated:null,treeContext:null,retryLane:0};function qu(t){return{baseLanes:t,cachePool:null,transitions:null}}function g0(t,e,n){var i=e.pendingProps,r=mt.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),ot(mt,r&1),t===null)return Bu(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Bl(o,i,0,null),t=xr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=qu(n),e.memoizedState=Yu,t):Jd(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return z_(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=Xi(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=Xi(a,s):(s=xr(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?qu(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=Yu,i}return s=t.child,t=s.sibling,i=Xi(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Jd(t,e){return e=Bl({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function ca(t,e,n,i){return i!==null&&kd(i),As(e,t.child,null,n),t=Jd(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function z_(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=Tc(Error(fe(422))),ca(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=Bl({mode:"visible",children:i.children},r,0,null),s=xr(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&As(e,t.child,null,o),e.child.memoizedState=qu(o),e.memoizedState=Yu,s);if(!(e.mode&1))return ca(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(fe(419)),i=Tc(s,i,void 0),ca(t,e,o,i)}if(a=(o&t.childLanes)!==0,ln||a){if(i=Ft,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,yi(t,r),jn(i,t,r,-1))}return sf(),i=Tc(Error(fe(421))),ca(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=J_.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,vn=Gi(r.nextSibling),xn=e,ft=!0,zn=null,t!==null&&(Tn[An++]=pi,Tn[An++]=mi,Tn[An++]=Er,pi=t.id,mi=t.overflow,Er=e),e=Jd(e,i.children),e.flags|=4096,e)}function Nh(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Hu(t.return,e,n)}function Ac(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function v0(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(Jt(t,e,i.children,n),i=mt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Nh(t,n,e);else if(t.tag===19)Nh(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(ot(mt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&hl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Ac(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&hl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Ac(e,!0,n,null,s);break;case"together":Ac(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Xa(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Si(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Tr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(fe(153));if(e.child!==null){for(t=e.child,n=Xi(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Xi(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function B_(t,e,n){switch(e.tag){case 3:m0(e),Ts();break;case 5:Vg(e);break;case 1:un(e.type)&&al(e);break;case 4:jd(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;ot(ul,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(ot(mt,mt.current&1),e.flags|=128,null):n&e.child.childLanes?g0(t,e,n):(ot(mt,mt.current&1),t=Si(t,e,n),t!==null?t.sibling:null);ot(mt,mt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return v0(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),ot(mt,mt.current),i)break;return null;case 22:case 23:return e.lanes=0,h0(t,e,n)}return Si(t,e,n)}var x0,$u,_0,y0;x0=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};$u=function(){};_0=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,gr(ei.current);var s=null;switch(n){case"input":r=vu(t,r),i=vu(t,i),s=[];break;case"select":r=vt({},r,{value:void 0}),i=vt({},i,{value:void 0}),s=[];break;case"textarea":r=yu(t,r),i=yu(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=sl)}Mu(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(yo.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(yo.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&ct("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};y0=function(t,e,n,i){n!==i&&(e.flags|=4)};function Ys(t,e){if(!ft)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function jt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function H_(t,e,n){var i=e.pendingProps;switch(Fd(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return jt(e),null;case 1:return un(e.type)&&ol(),jt(e),null;case 3:return i=e.stateNode,bs(),dt(cn),dt(qt),Xd(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(aa(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,zn!==null&&(id(zn),zn=null))),$u(t,e),jt(e),null;case 5:Wd(e);var r=gr(No.current);if(n=e.type,t!==null&&e.stateNode!=null)_0(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(fe(166));return jt(e),null}if(t=gr(ei.current),aa(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[Kn]=e,i[Po]=s,t=(e.mode&1)!==0,n){case"dialog":ct("cancel",i),ct("close",i);break;case"iframe":case"object":case"embed":ct("load",i);break;case"video":case"audio":for(r=0;r<io.length;r++)ct(io[r],i);break;case"source":ct("error",i);break;case"img":case"image":case"link":ct("error",i),ct("load",i);break;case"details":ct("toggle",i);break;case"input":Hf(i,s),ct("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},ct("invalid",i);break;case"textarea":Vf(i,s),ct("invalid",i)}Mu(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&oa(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&oa(i.textContent,a,t),r=["children",""+a]):yo.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&ct("scroll",i)}switch(n){case"input":Jo(i),Gf(i,s,!0);break;case"textarea":Jo(i),jf(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=sl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=qm(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[Kn]=e,t[Po]=i,x0(t,e,!1,!1),e.stateNode=t;e:{switch(o=Eu(n,i),n){case"dialog":ct("cancel",t),ct("close",t),r=i;break;case"iframe":case"object":case"embed":ct("load",t),r=i;break;case"video":case"audio":for(r=0;r<io.length;r++)ct(io[r],t);r=i;break;case"source":ct("error",t),r=i;break;case"img":case"image":case"link":ct("error",t),ct("load",t),r=i;break;case"details":ct("toggle",t),r=i;break;case"input":Hf(t,i),r=vu(t,i),ct("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=vt({},i,{value:void 0}),ct("invalid",t);break;case"textarea":Vf(t,i),r=yu(t,i),ct("invalid",t);break;default:r=i}Mu(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?Zm(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&$m(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&So(t,l):typeof l=="number"&&So(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(yo.hasOwnProperty(s)?l!=null&&s==="onScroll"&&ct("scroll",t):l!=null&&Md(t,s,l,o))}switch(n){case"input":Jo(t),Gf(t,i,!1);break;case"textarea":Jo(t),jf(t);break;case"option":i.value!=null&&t.setAttribute("value",""+Ki(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?ps(t,!!i.multiple,s,!1):i.defaultValue!=null&&ps(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=sl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return jt(e),null;case 6:if(t&&e.stateNode!=null)y0(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(fe(166));if(n=gr(No.current),gr(ei.current),aa(e)){if(i=e.stateNode,n=e.memoizedProps,i[Kn]=e,(s=i.nodeValue!==n)&&(t=xn,t!==null))switch(t.tag){case 3:oa(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&oa(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[Kn]=e,e.stateNode=i}return jt(e),null;case 13:if(dt(mt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(ft&&vn!==null&&e.mode&1&&!(e.flags&128))kg(),Ts(),e.flags|=98560,s=!1;else if(s=aa(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(fe(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(fe(317));s[Kn]=e}else Ts(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;jt(e),s=!1}else zn!==null&&(id(zn),zn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||mt.current&1?Lt===0&&(Lt=3):sf())),e.updateQueue!==null&&(e.flags|=4),jt(e),null);case 4:return bs(),$u(t,e),t===null&&Co(e.stateNode.containerInfo),jt(e),null;case 10:return Hd(e.type._context),jt(e),null;case 17:return un(e.type)&&ol(),jt(e),null;case 19:if(dt(mt),s=e.memoizedState,s===null)return jt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)Ys(s,!1);else{if(Lt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=hl(t),o!==null){for(e.flags|=128,Ys(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ot(mt,mt.current&1|2),e.child}t=t.sibling}s.tail!==null&&Tt()>Rs&&(e.flags|=128,i=!0,Ys(s,!1),e.lanes=4194304)}else{if(!i)if(t=hl(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Ys(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!ft)return jt(e),null}else 2*Tt()-s.renderingStartTime>Rs&&n!==1073741824&&(e.flags|=128,i=!0,Ys(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Tt(),e.sibling=null,n=mt.current,ot(mt,i?n&1|2:n&1),e):(jt(e),null);case 22:case 23:return rf(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?gn&1073741824&&(jt(e),e.subtreeFlags&6&&(e.flags|=8192)):jt(e),null;case 24:return null;case 25:return null}throw Error(fe(156,e.tag))}function G_(t,e){switch(Fd(e),e.tag){case 1:return un(e.type)&&ol(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return bs(),dt(cn),dt(qt),Xd(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Wd(e),null;case 13:if(dt(mt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(fe(340));Ts()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return dt(mt),null;case 4:return bs(),null;case 10:return Hd(e.type._context),null;case 22:case 23:return rf(),null;case 24:return null;default:return null}}var ua=!1,Yt=!1,V_=typeof WeakSet=="function"?WeakSet:Set,Ae=null;function cs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){yt(t,e,i)}else n.current=null}function Ku(t,e,n){try{n()}catch(i){yt(t,e,i)}}var Dh=!1;function j_(t,e){if(Du=nl,t=Tg(),Ud(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,d=0,f=t,h=null;t:for(;;){for(var p;f!==n||r!==0&&f.nodeType!==3||(a=o+r),f!==s||i!==0&&f.nodeType!==3||(l=o+i),f.nodeType===3&&(o+=f.nodeValue.length),(p=f.firstChild)!==null;)h=f,f=p;for(;;){if(f===t)break t;if(h===n&&++c===r&&(a=o),h===s&&++d===i&&(l=o),(p=f.nextSibling)!==null)break;f=h,h=f.parentNode}f=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Iu={focusedElem:t,selectionRange:n},nl=!1,Ae=e;Ae!==null;)if(e=Ae,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Ae=t;else for(;Ae!==null;){e=Ae;try{var _=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(_!==null){var y=_.memoizedProps,m=_.memoizedState,u=e.stateNode,v=u.getSnapshotBeforeUpdate(e.elementType===e.type?y:Fn(e.type,y),m);u.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var g=e.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(fe(163))}}catch(M){yt(e,e.return,M)}if(t=e.sibling,t!==null){t.return=e.return,Ae=t;break}Ae=e.return}return _=Dh,Dh=!1,_}function uo(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Ku(e,n,s)}r=r.next}while(r!==i)}}function kl(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function Zu(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function S0(t){var e=t.alternate;e!==null&&(t.alternate=null,S0(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Kn],delete e[Po],delete e[Fu],delete e[A_],delete e[b_])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function M0(t){return t.tag===5||t.tag===3||t.tag===4}function Ih(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||M0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Ju(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=sl));else if(i!==4&&(t=t.child,t!==null))for(Ju(t,e,n),t=t.sibling;t!==null;)Ju(t,e,n),t=t.sibling}function Qu(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Qu(t,e,n),t=t.sibling;t!==null;)Qu(t,e,n),t=t.sibling}var zt=null,kn=!1;function wi(t,e,n){for(n=n.child;n!==null;)E0(t,e,n),n=n.sibling}function E0(t,e,n){if(Qn&&typeof Qn.onCommitFiberUnmount=="function")try{Qn.onCommitFiberUnmount(Pl,n)}catch{}switch(n.tag){case 5:Yt||cs(n,e);case 6:var i=zt,r=kn;zt=null,wi(t,e,n),zt=i,kn=r,zt!==null&&(kn?(t=zt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):zt.removeChild(n.stateNode));break;case 18:zt!==null&&(kn?(t=zt,n=n.stateNode,t.nodeType===8?_c(t.parentNode,n):t.nodeType===1&&_c(t,n),To(t)):_c(zt,n.stateNode));break;case 4:i=zt,r=kn,zt=n.stateNode.containerInfo,kn=!0,wi(t,e,n),zt=i,kn=r;break;case 0:case 11:case 14:case 15:if(!Yt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Ku(n,e,o),r=r.next}while(r!==i)}wi(t,e,n);break;case 1:if(!Yt&&(cs(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){yt(n,e,a)}wi(t,e,n);break;case 21:wi(t,e,n);break;case 22:n.mode&1?(Yt=(i=Yt)||n.memoizedState!==null,wi(t,e,n),Yt=i):wi(t,e,n);break;default:wi(t,e,n)}}function Uh(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new V_),e.forEach(function(i){var r=Q_.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Dn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:zt=a.stateNode,kn=!1;break e;case 3:zt=a.stateNode.containerInfo,kn=!0;break e;case 4:zt=a.stateNode.containerInfo,kn=!0;break e}a=a.return}if(zt===null)throw Error(fe(160));E0(s,o,r),zt=null,kn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){yt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)w0(e,t),e=e.sibling}function w0(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Dn(e,t),Yn(t),i&4){try{uo(3,t,t.return),kl(3,t)}catch(y){yt(t,t.return,y)}try{uo(5,t,t.return)}catch(y){yt(t,t.return,y)}}break;case 1:Dn(e,t),Yn(t),i&512&&n!==null&&cs(n,n.return);break;case 5:if(Dn(e,t),Yn(t),i&512&&n!==null&&cs(n,n.return),t.flags&32){var r=t.stateNode;try{So(r,"")}catch(y){yt(t,t.return,y)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&Xm(r,s),Eu(a,o);var c=Eu(a,s);for(o=0;o<l.length;o+=2){var d=l[o],f=l[o+1];d==="style"?Zm(r,f):d==="dangerouslySetInnerHTML"?$m(r,f):d==="children"?So(r,f):Md(r,d,f,c)}switch(a){case"input":xu(r,s);break;case"textarea":Ym(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?ps(r,!!s.multiple,p,!1):h!==!!s.multiple&&(s.defaultValue!=null?ps(r,!!s.multiple,s.defaultValue,!0):ps(r,!!s.multiple,s.multiple?[]:"",!1))}r[Po]=s}catch(y){yt(t,t.return,y)}}break;case 6:if(Dn(e,t),Yn(t),i&4){if(t.stateNode===null)throw Error(fe(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(y){yt(t,t.return,y)}}break;case 3:if(Dn(e,t),Yn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{To(e.containerInfo)}catch(y){yt(t,t.return,y)}break;case 4:Dn(e,t),Yn(t);break;case 13:Dn(e,t),Yn(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(tf=Tt())),i&4&&Uh(t);break;case 22:if(d=n!==null&&n.memoizedState!==null,t.mode&1?(Yt=(c=Yt)||d,Dn(e,t),Yt=c):Dn(e,t),Yn(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!d&&t.mode&1)for(Ae=t,d=t.child;d!==null;){for(f=Ae=d;Ae!==null;){switch(h=Ae,p=h.child,h.tag){case 0:case 11:case 14:case 15:uo(4,h,h.return);break;case 1:cs(h,h.return);var _=h.stateNode;if(typeof _.componentWillUnmount=="function"){i=h,n=h.return;try{e=i,_.props=e.memoizedProps,_.state=e.memoizedState,_.componentWillUnmount()}catch(y){yt(i,n,y)}}break;case 5:cs(h,h.return);break;case 22:if(h.memoizedState!==null){Fh(f);continue}}p!==null?(p.return=h,Ae=p):Fh(f)}d=d.sibling}e:for(d=null,f=t;;){if(f.tag===5){if(d===null){d=f;try{r=f.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=f.stateNode,l=f.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=Km("display",o))}catch(y){yt(t,t.return,y)}}}else if(f.tag===6){if(d===null)try{f.stateNode.nodeValue=c?"":f.memoizedProps}catch(y){yt(t,t.return,y)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===t)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===t)break e;for(;f.sibling===null;){if(f.return===null||f.return===t)break e;d===f&&(d=null),f=f.return}d===f&&(d=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Dn(e,t),Yn(t),i&4&&Uh(t);break;case 21:break;default:Dn(e,t),Yn(t)}}function Yn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(M0(n)){var i=n;break e}n=n.return}throw Error(fe(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(So(r,""),i.flags&=-33);var s=Ih(t);Qu(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=Ih(t);Ju(t,a,o);break;default:throw Error(fe(161))}}catch(l){yt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function W_(t,e,n){Ae=t,T0(t)}function T0(t,e,n){for(var i=(t.mode&1)!==0;Ae!==null;){var r=Ae,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||ua;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||Yt;a=ua;var c=Yt;if(ua=o,(Yt=l)&&!c)for(Ae=r;Ae!==null;)o=Ae,l=o.child,o.tag===22&&o.memoizedState!==null?kh(r):l!==null?(l.return=o,Ae=l):kh(r);for(;s!==null;)Ae=s,T0(s),s=s.sibling;Ae=r,ua=a,Yt=c}Oh(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Ae=s):Oh(t)}}function Oh(t){for(;Ae!==null;){var e=Ae;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Yt||kl(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Yt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Fn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&yh(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}yh(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var d=c.memoizedState;if(d!==null){var f=d.dehydrated;f!==null&&To(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(fe(163))}Yt||e.flags&512&&Zu(e)}catch(h){yt(e,e.return,h)}}if(e===t){Ae=null;break}if(n=e.sibling,n!==null){n.return=e.return,Ae=n;break}Ae=e.return}}function Fh(t){for(;Ae!==null;){var e=Ae;if(e===t){Ae=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Ae=n;break}Ae=e.return}}function kh(t){for(;Ae!==null;){var e=Ae;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{kl(4,e)}catch(l){yt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){yt(e,r,l)}}var s=e.return;try{Zu(e)}catch(l){yt(e,s,l)}break;case 5:var o=e.return;try{Zu(e)}catch(l){yt(e,o,l)}}}catch(l){yt(e,e.return,l)}if(e===t){Ae=null;break}var a=e.sibling;if(a!==null){a.return=e.return,Ae=a;break}Ae=e.return}}var X_=Math.ceil,gl=Ei.ReactCurrentDispatcher,Qd=Ei.ReactCurrentOwner,Pn=Ei.ReactCurrentBatchConfig,tt=0,Ft=null,Rt=null,Bt=0,gn=0,us=tr(0),Lt=0,Oo=null,Tr=0,zl=0,ef=0,fo=null,on=null,tf=0,Rs=1/0,ui=null,vl=!1,ed=null,ji=null,da=!1,Oi=null,xl=0,ho=0,td=null,Ya=-1,qa=0;function en(){return tt&6?Tt():Ya!==-1?Ya:Ya=Tt()}function Wi(t){return t.mode&1?tt&2&&Bt!==0?Bt&-Bt:R_.transition!==null?(qa===0&&(qa=cg()),qa):(t=rt,t!==0||(t=window.event,t=t===void 0?16:gg(t.type)),t):1}function jn(t,e,n,i){if(50<ho)throw ho=0,td=null,Error(fe(185));Vo(t,n,i),(!(tt&2)||t!==Ft)&&(t===Ft&&(!(tt&2)&&(zl|=n),Lt===4&&Ii(t,Bt)),dn(t,i),n===1&&tt===0&&!(e.mode&1)&&(Rs=Tt()+500,Ul&&nr()))}function dn(t,e){var n=t.callbackNode;Rx(t,e);var i=tl(t,t===Ft?Bt:0);if(i===0)n!==null&&Yf(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&Yf(n),e===1)t.tag===0?C_(zh.bind(null,t)):Ug(zh.bind(null,t)),w_(function(){!(tt&6)&&nr()}),n=null;else{switch(ug(i)){case 1:n=bd;break;case 4:n=ag;break;case 16:n=el;break;case 536870912:n=lg;break;default:n=el}n=D0(n,A0.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function A0(t,e){if(Ya=-1,qa=0,tt&6)throw Error(fe(327));var n=t.callbackNode;if(_s()&&t.callbackNode!==n)return null;var i=tl(t,t===Ft?Bt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=_l(t,i);else{e=i;var r=tt;tt|=2;var s=C0();(Ft!==t||Bt!==e)&&(ui=null,Rs=Tt()+500,vr(t,e));do try{$_();break}catch(a){b0(t,a)}while(!0);Bd(),gl.current=s,tt=r,Rt!==null?e=0:(Ft=null,Bt=0,e=Lt)}if(e!==0){if(e===2&&(r=Cu(t),r!==0&&(i=r,e=nd(t,r))),e===1)throw n=Oo,vr(t,0),Ii(t,i),dn(t,Tt()),n;if(e===6)Ii(t,i);else{if(r=t.current.alternate,!(i&30)&&!Y_(r)&&(e=_l(t,i),e===2&&(s=Cu(t),s!==0&&(i=s,e=nd(t,s))),e===1))throw n=Oo,vr(t,0),Ii(t,i),dn(t,Tt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(fe(345));case 2:ur(t,on,ui);break;case 3:if(Ii(t,i),(i&130023424)===i&&(e=tf+500-Tt(),10<e)){if(tl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){en(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Ou(ur.bind(null,t,on,ui),e);break}ur(t,on,ui);break;case 4:if(Ii(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-Vn(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=Tt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*X_(i/1960))-i,10<i){t.timeoutHandle=Ou(ur.bind(null,t,on,ui),i);break}ur(t,on,ui);break;case 5:ur(t,on,ui);break;default:throw Error(fe(329))}}}return dn(t,Tt()),t.callbackNode===n?A0.bind(null,t):null}function nd(t,e){var n=fo;return t.current.memoizedState.isDehydrated&&(vr(t,e).flags|=256),t=_l(t,e),t!==2&&(e=on,on=n,e!==null&&id(e)),t}function id(t){on===null?on=t:on.push.apply(on,t)}function Y_(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!Wn(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Ii(t,e){for(e&=~ef,e&=~zl,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Vn(e),i=1<<n;t[n]=-1,e&=~i}}function zh(t){if(tt&6)throw Error(fe(327));_s();var e=tl(t,0);if(!(e&1))return dn(t,Tt()),null;var n=_l(t,e);if(t.tag!==0&&n===2){var i=Cu(t);i!==0&&(e=i,n=nd(t,i))}if(n===1)throw n=Oo,vr(t,0),Ii(t,e),dn(t,Tt()),n;if(n===6)throw Error(fe(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,ur(t,on,ui),dn(t,Tt()),null}function nf(t,e){var n=tt;tt|=1;try{return t(e)}finally{tt=n,tt===0&&(Rs=Tt()+500,Ul&&nr())}}function Ar(t){Oi!==null&&Oi.tag===0&&!(tt&6)&&_s();var e=tt;tt|=1;var n=Pn.transition,i=rt;try{if(Pn.transition=null,rt=1,t)return t()}finally{rt=i,Pn.transition=n,tt=e,!(tt&6)&&nr()}}function rf(){gn=us.current,dt(us)}function vr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,E_(n)),Rt!==null)for(n=Rt.return;n!==null;){var i=n;switch(Fd(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&ol();break;case 3:bs(),dt(cn),dt(qt),Xd();break;case 5:Wd(i);break;case 4:bs();break;case 13:dt(mt);break;case 19:dt(mt);break;case 10:Hd(i.type._context);break;case 22:case 23:rf()}n=n.return}if(Ft=t,Rt=t=Xi(t.current,null),Bt=gn=e,Lt=0,Oo=null,ef=zl=Tr=0,on=fo=null,mr!==null){for(e=0;e<mr.length;e++)if(n=mr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}mr=null}return t}function b0(t,e){do{var n=Rt;try{if(Bd(),ja.current=ml,pl){for(var i=gt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}pl=!1}if(wr=0,Ot=Pt=gt=null,co=!1,Do=0,Qd.current=null,n===null||n.return===null){Lt=1,Oo=e,Rt=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=Bt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,d=a,f=d.tag;if(!(d.mode&1)&&(f===0||f===11||f===15)){var h=d.alternate;h?(d.updateQueue=h.updateQueue,d.memoizedState=h.memoizedState,d.lanes=h.lanes):(d.updateQueue=null,d.memoizedState=null)}var p=Ah(o);if(p!==null){p.flags&=-257,bh(p,o,a,s,e),p.mode&1&&Th(s,c,e),e=p,l=c;var _=e.updateQueue;if(_===null){var y=new Set;y.add(l),e.updateQueue=y}else _.add(l);break e}else{if(!(e&1)){Th(s,c,e),sf();break e}l=Error(fe(426))}}else if(ft&&a.mode&1){var m=Ah(o);if(m!==null){!(m.flags&65536)&&(m.flags|=256),bh(m,o,a,s,e),kd(Cs(l,a));break e}}s=l=Cs(l,a),Lt!==4&&(Lt=2),fo===null?fo=[s]:fo.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var u=u0(s,l,e);_h(s,u);break e;case 1:a=l;var v=s.type,g=s.stateNode;if(!(s.flags&128)&&(typeof v.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(ji===null||!ji.has(g)))){s.flags|=65536,e&=-e,s.lanes|=e;var M=d0(s,a,e);_h(s,M);break e}}s=s.return}while(s!==null)}P0(n)}catch(P){e=P,Rt===n&&n!==null&&(Rt=n=n.return);continue}break}while(!0)}function C0(){var t=gl.current;return gl.current=ml,t===null?ml:t}function sf(){(Lt===0||Lt===3||Lt===2)&&(Lt=4),Ft===null||!(Tr&268435455)&&!(zl&268435455)||Ii(Ft,Bt)}function _l(t,e){var n=tt;tt|=2;var i=C0();(Ft!==t||Bt!==e)&&(ui=null,vr(t,e));do try{q_();break}catch(r){b0(t,r)}while(!0);if(Bd(),tt=n,gl.current=i,Rt!==null)throw Error(fe(261));return Ft=null,Bt=0,Lt}function q_(){for(;Rt!==null;)R0(Rt)}function $_(){for(;Rt!==null&&!yx();)R0(Rt)}function R0(t){var e=N0(t.alternate,t,gn);t.memoizedProps=t.pendingProps,e===null?P0(t):Rt=e,Qd.current=null}function P0(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=G_(n,e),n!==null){n.flags&=32767,Rt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Lt=6,Rt=null;return}}else if(n=H_(n,e,gn),n!==null){Rt=n;return}if(e=e.sibling,e!==null){Rt=e;return}Rt=e=t}while(e!==null);Lt===0&&(Lt=5)}function ur(t,e,n){var i=rt,r=Pn.transition;try{Pn.transition=null,rt=1,K_(t,e,n,i)}finally{Pn.transition=r,rt=i}return null}function K_(t,e,n,i){do _s();while(Oi!==null);if(tt&6)throw Error(fe(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(fe(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(Px(t,s),t===Ft&&(Rt=Ft=null,Bt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||da||(da=!0,D0(el,function(){return _s(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Pn.transition,Pn.transition=null;var o=rt;rt=1;var a=tt;tt|=4,Qd.current=null,j_(t,n),w0(n,t),g_(Iu),nl=!!Du,Iu=Du=null,t.current=n,W_(n),Sx(),tt=a,rt=o,Pn.transition=s}else t.current=n;if(da&&(da=!1,Oi=t,xl=r),s=t.pendingLanes,s===0&&(ji=null),wx(n.stateNode),dn(t,Tt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(vl)throw vl=!1,t=ed,ed=null,t;return xl&1&&t.tag!==0&&_s(),s=t.pendingLanes,s&1?t===td?ho++:(ho=0,td=t):ho=0,nr(),null}function _s(){if(Oi!==null){var t=ug(xl),e=Pn.transition,n=rt;try{if(Pn.transition=null,rt=16>t?16:t,Oi===null)var i=!1;else{if(t=Oi,Oi=null,xl=0,tt&6)throw Error(fe(331));var r=tt;for(tt|=4,Ae=t.current;Ae!==null;){var s=Ae,o=s.child;if(Ae.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(Ae=c;Ae!==null;){var d=Ae;switch(d.tag){case 0:case 11:case 15:uo(8,d,s)}var f=d.child;if(f!==null)f.return=d,Ae=f;else for(;Ae!==null;){d=Ae;var h=d.sibling,p=d.return;if(S0(d),d===c){Ae=null;break}if(h!==null){h.return=p,Ae=h;break}Ae=p}}}var _=s.alternate;if(_!==null){var y=_.child;if(y!==null){_.child=null;do{var m=y.sibling;y.sibling=null,y=m}while(y!==null)}}Ae=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,Ae=o;else e:for(;Ae!==null;){if(s=Ae,s.flags&2048)switch(s.tag){case 0:case 11:case 15:uo(9,s,s.return)}var u=s.sibling;if(u!==null){u.return=s.return,Ae=u;break e}Ae=s.return}}var v=t.current;for(Ae=v;Ae!==null;){o=Ae;var g=o.child;if(o.subtreeFlags&2064&&g!==null)g.return=o,Ae=g;else e:for(o=v;Ae!==null;){if(a=Ae,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:kl(9,a)}}catch(P){yt(a,a.return,P)}if(a===o){Ae=null;break e}var M=a.sibling;if(M!==null){M.return=a.return,Ae=M;break e}Ae=a.return}}if(tt=r,nr(),Qn&&typeof Qn.onPostCommitFiberRoot=="function")try{Qn.onPostCommitFiberRoot(Pl,t)}catch{}i=!0}return i}finally{rt=n,Pn.transition=e}}return!1}function Bh(t,e,n){e=Cs(n,e),e=u0(t,e,1),t=Vi(t,e,1),e=en(),t!==null&&(Vo(t,1,e),dn(t,e))}function yt(t,e,n){if(t.tag===3)Bh(t,t,n);else for(;e!==null;){if(e.tag===3){Bh(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(ji===null||!ji.has(i))){t=Cs(n,t),t=d0(e,t,1),e=Vi(e,t,1),t=en(),e!==null&&(Vo(e,1,t),dn(e,t));break}}e=e.return}}function Z_(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=en(),t.pingedLanes|=t.suspendedLanes&n,Ft===t&&(Bt&n)===n&&(Lt===4||Lt===3&&(Bt&130023424)===Bt&&500>Tt()-tf?vr(t,0):ef|=n),dn(t,e)}function L0(t,e){e===0&&(t.mode&1?(e=ta,ta<<=1,!(ta&130023424)&&(ta=4194304)):e=1);var n=en();t=yi(t,e),t!==null&&(Vo(t,e,n),dn(t,n))}function J_(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),L0(t,n)}function Q_(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(fe(314))}i!==null&&i.delete(e),L0(t,n)}var N0;N0=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||cn.current)ln=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return ln=!1,B_(t,e,n);ln=!!(t.flags&131072)}else ln=!1,ft&&e.flags&1048576&&Og(e,cl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Xa(t,e),t=e.pendingProps;var r=ws(e,qt.current);xs(e,n),r=qd(null,e,i,t,r,n);var s=$d();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,un(i)?(s=!0,al(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Vd(e),r.updater=Fl,e.stateNode=r,r._reactInternals=e,Vu(e,i,t,n),e=Xu(null,e,i,!0,s,n)):(e.tag=0,ft&&s&&Od(e),Jt(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(Xa(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=ty(i),t=Fn(i,t),r){case 0:e=Wu(null,e,i,t,n);break e;case 1:e=Ph(null,e,i,t,n);break e;case 11:e=Ch(null,e,i,t,n);break e;case 14:e=Rh(null,e,i,Fn(i.type,t),n);break e}throw Error(fe(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Fn(i,r),Wu(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Fn(i,r),Ph(t,e,i,r,n);case 3:e:{if(m0(e),t===null)throw Error(fe(387));i=e.pendingProps,s=e.memoizedState,r=s.element,Gg(t,e),fl(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Cs(Error(fe(423)),e),e=Lh(t,e,i,n,r);break e}else if(i!==r){r=Cs(Error(fe(424)),e),e=Lh(t,e,i,n,r);break e}else for(vn=Gi(e.stateNode.containerInfo.firstChild),xn=e,ft=!0,zn=null,n=Bg(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ts(),i===r){e=Si(t,e,n);break e}Jt(t,e,i,n)}e=e.child}return e;case 5:return Vg(e),t===null&&Bu(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,Uu(i,r)?o=null:s!==null&&Uu(i,s)&&(e.flags|=32),p0(t,e),Jt(t,e,o,n),e.child;case 6:return t===null&&Bu(e),null;case 13:return g0(t,e,n);case 4:return jd(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=As(e,null,i,n):Jt(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Fn(i,r),Ch(t,e,i,r,n);case 7:return Jt(t,e,e.pendingProps,n),e.child;case 8:return Jt(t,e,e.pendingProps.children,n),e.child;case 12:return Jt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,ot(ul,i._currentValue),i._currentValue=o,s!==null)if(Wn(s.value,o)){if(s.children===r.children&&!cn.current){e=Si(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=vi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var d=c.pending;d===null?l.next=l:(l.next=d.next,d.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Hu(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(fe(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Hu(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}Jt(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,xs(e,n),r=Ln(r),i=i(r),e.flags|=1,Jt(t,e,i,n),e.child;case 14:return i=e.type,r=Fn(i,e.pendingProps),r=Fn(i.type,r),Rh(t,e,i,r,n);case 15:return f0(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Fn(i,r),Xa(t,e),e.tag=1,un(i)?(t=!0,al(e)):t=!1,xs(e,n),c0(e,i,r),Vu(e,i,r,n),Xu(null,e,i,!0,t,n);case 19:return v0(t,e,n);case 22:return h0(t,e,n)}throw Error(fe(156,e.tag))};function D0(t,e){return og(t,e)}function ey(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Rn(t,e,n,i){return new ey(t,e,n,i)}function of(t){return t=t.prototype,!(!t||!t.isReactComponent)}function ty(t){if(typeof t=="function")return of(t)?1:0;if(t!=null){if(t=t.$$typeof,t===wd)return 11;if(t===Td)return 14}return 2}function Xi(t,e){var n=t.alternate;return n===null?(n=Rn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function $a(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")of(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case es:return xr(n.children,r,s,e);case Ed:o=8,r|=8;break;case hu:return t=Rn(12,n,e,r|2),t.elementType=hu,t.lanes=s,t;case pu:return t=Rn(13,n,e,r),t.elementType=pu,t.lanes=s,t;case mu:return t=Rn(19,n,e,r),t.elementType=mu,t.lanes=s,t;case Vm:return Bl(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Hm:o=10;break e;case Gm:o=9;break e;case wd:o=11;break e;case Td:o=14;break e;case Pi:o=16,i=null;break e}throw Error(fe(130,t==null?t:typeof t,""))}return e=Rn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function xr(t,e,n,i){return t=Rn(7,t,i,e),t.lanes=n,t}function Bl(t,e,n,i){return t=Rn(22,t,i,e),t.elementType=Vm,t.lanes=n,t.stateNode={isHidden:!1},t}function bc(t,e,n){return t=Rn(6,t,null,e),t.lanes=n,t}function Cc(t,e,n){return e=Rn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function ny(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=lc(0),this.expirationTimes=lc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=lc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function af(t,e,n,i,r,s,o,a,l){return t=new ny(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Rn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Vd(s),t}function iy(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Qr,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function I0(t){if(!t)return Zi;t=t._reactInternals;e:{if(Lr(t)!==t||t.tag!==1)throw Error(fe(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(un(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(fe(171))}if(t.tag===1){var n=t.type;if(un(n))return Ig(t,n,e)}return e}function U0(t,e,n,i,r,s,o,a,l){return t=af(n,i,!0,t,r,s,o,a,l),t.context=I0(null),n=t.current,i=en(),r=Wi(n),s=vi(i,r),s.callback=e??null,Vi(n,s,r),t.current.lanes=r,Vo(t,r,i),dn(t,i),t}function Hl(t,e,n,i){var r=e.current,s=en(),o=Wi(r);return n=I0(n),e.context===null?e.context=n:e.pendingContext=n,e=vi(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=Vi(r,e,o),t!==null&&(jn(t,r,o,s),Va(t,r,o)),o}function yl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Hh(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function lf(t,e){Hh(t,e),(t=t.alternate)&&Hh(t,e)}function ry(){return null}var O0=typeof reportError=="function"?reportError:function(t){console.error(t)};function cf(t){this._internalRoot=t}Gl.prototype.render=cf.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(fe(409));Hl(t,e,null,null)};Gl.prototype.unmount=cf.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Ar(function(){Hl(null,t,null,null)}),e[_i]=null}};function Gl(t){this._internalRoot=t}Gl.prototype.unstable_scheduleHydration=function(t){if(t){var e=hg();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Di.length&&e!==0&&e<Di[n].priority;n++);Di.splice(n,0,t),n===0&&mg(t)}};function uf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Vl(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Gh(){}function sy(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=yl(o);s.call(c)}}var o=U0(e,i,t,0,null,!1,!1,"",Gh);return t._reactRootContainer=o,t[_i]=o.current,Co(t.nodeType===8?t.parentNode:t),Ar(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=yl(l);a.call(c)}}var l=af(t,0,!1,null,null,!1,!1,"",Gh);return t._reactRootContainer=l,t[_i]=l.current,Co(t.nodeType===8?t.parentNode:t),Ar(function(){Hl(e,l,n,i)}),l}function jl(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=yl(o);a.call(l)}}Hl(e,o,t,r)}else o=sy(n,e,t,r,i);return yl(o)}dg=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=no(e.pendingLanes);n!==0&&(Cd(e,n|1),dn(e,Tt()),!(tt&6)&&(Rs=Tt()+500,nr()))}break;case 13:Ar(function(){var i=yi(t,1);if(i!==null){var r=en();jn(i,t,1,r)}}),lf(t,1)}};Rd=function(t){if(t.tag===13){var e=yi(t,134217728);if(e!==null){var n=en();jn(e,t,134217728,n)}lf(t,134217728)}};fg=function(t){if(t.tag===13){var e=Wi(t),n=yi(t,e);if(n!==null){var i=en();jn(n,t,e,i)}lf(t,e)}};hg=function(){return rt};pg=function(t,e){var n=rt;try{return rt=t,e()}finally{rt=n}};Tu=function(t,e,n){switch(e){case"input":if(xu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Il(i);if(!r)throw Error(fe(90));Wm(i),xu(i,r)}}}break;case"textarea":Ym(t,n);break;case"select":e=n.value,e!=null&&ps(t,!!n.multiple,e,!1)}};eg=nf;tg=Ar;var oy={usingClientEntryPoint:!1,Events:[Wo,rs,Il,Jm,Qm,nf]},qs={findFiberByHostInstance:pr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},ay={bundleType:qs.bundleType,version:qs.version,rendererPackageName:qs.rendererPackageName,rendererConfig:qs.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ei.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=rg(t),t===null?null:t.stateNode},findFiberByHostInstance:qs.findFiberByHostInstance||ry,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var fa=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!fa.isDisabled&&fa.supportsFiber)try{Pl=fa.inject(ay),Qn=fa}catch{}}yn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=oy;yn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!uf(e))throw Error(fe(200));return iy(t,e,null,n)};yn.createRoot=function(t,e){if(!uf(t))throw Error(fe(299));var n=!1,i="",r=O0;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=af(t,1,!1,null,null,n,!1,i,r),t[_i]=e.current,Co(t.nodeType===8?t.parentNode:t),new cf(e)};yn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(fe(188)):(t=Object.keys(t).join(","),Error(fe(268,t)));return t=rg(e),t=t===null?null:t.stateNode,t};yn.flushSync=function(t){return Ar(t)};yn.hydrate=function(t,e,n){if(!Vl(e))throw Error(fe(200));return jl(null,t,e,!0,n)};yn.hydrateRoot=function(t,e,n){if(!uf(t))throw Error(fe(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=O0;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=U0(e,null,t,1,n??null,r,!1,s,o),t[_i]=e.current,Co(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new Gl(e)};yn.render=function(t,e,n){if(!Vl(e))throw Error(fe(200));return jl(null,t,e,!1,n)};yn.unmountComponentAtNode=function(t){if(!Vl(t))throw Error(fe(40));return t._reactRootContainer?(Ar(function(){jl(null,null,t,!1,function(){t._reactRootContainer=null,t[_i]=null})}),!0):!1};yn.unstable_batchedUpdates=nf;yn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Vl(n))throw Error(fe(200));if(t==null||t._reactInternals===void 0)throw Error(fe(38));return jl(t,e,n,!1,i)};yn.version="18.3.1-next-f1338f8080-20240426";function F0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(F0)}catch(t){console.error(t)}}F0(),Fm.exports=yn;var ly=Fm.exports,Vh=ly;du.createRoot=Vh.createRoot,du.hydrateRoot=Vh.hydrateRoot;class cy{constructor(){this.ctx=null,this.muted=!1}init(){if(!this.ctx&&typeof window<"u"){const e=window.AudioContext||window.webkitAudioContext;e&&(this.ctx=new e)}this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}toggleMute(){return this.muted=!this.muted,this.muted}typewriterClick(){if(this.muted||(this.init(),!this.ctx))return;const e=this.ctx.createOscillator(),n=this.ctx.createGain(),i=this.ctx.currentTime;e.type="triangle",e.frequency.setValueAtTime(320+Math.random()*220,i),e.frequency.exponentialRampToValueAtTime(120,i+.04),n.gain.setValueAtTime(.08,i),n.gain.exponentialRampToValueAtTime(.001,i+.045),e.connect(n),n.connect(this.ctx.destination),e.start(i),e.stop(i+.05)}telegraphBeep(){if(this.muted||(this.init(),!this.ctx))return;const e=this.ctx.createOscillator(),n=this.ctx.createGain(),i=this.ctx.currentTime;e.type="sine",e.frequency.setValueAtTime(780,i),n.gain.setValueAtTime(.1,i),n.gain.exponentialRampToValueAtTime(.001,i+.09),e.connect(n),n.connect(this.ctx.destination),e.start(i),e.stop(i+.1)}cameraShutter(){if(this.muted||(this.init(),!this.ctx))return;const e=this.ctx.currentTime,n=this.ctx.createOscillator(),i=this.ctx.createGain();n.type="sawtooth",n.frequency.setValueAtTime(180,e),n.frequency.linearRampToValueAtTime(60,e+.08),i.gain.setValueAtTime(.18,e),i.gain.exponentialRampToValueAtTime(.001,e+.12),n.connect(i),i.connect(this.ctx.destination),n.start(e),n.stop(e+.13)}biometricScanHum(){if(this.muted||(this.init(),!this.ctx))return;const e=this.ctx.currentTime,n=this.ctx.createOscillator(),i=this.ctx.createGain();n.type="sine",n.frequency.setValueAtTime(220,e),n.frequency.linearRampToValueAtTime(440,e+.25),n.frequency.linearRampToValueAtTime(280,e+.5),i.gain.setValueAtTime(.05,e),i.gain.exponentialRampToValueAtTime(.001,e+.55),n.connect(i),i.connect(this.ctx.destination),n.start(e),n.stop(e+.6)}conclaveChime(){if(this.muted||(this.init(),!this.ctx))return;const e=this.ctx.currentTime;[440,554.37,659.25,880].forEach((n,i)=>{const r=this.ctx.createOscillator(),s=this.ctx.createGain();r.type="triangle",r.frequency.setValueAtTime(n,e+i*.08),s.gain.setValueAtTime(.12,e+i*.08),s.gain.exponentialRampToValueAtTime(.001,e+i*.08+.6),r.connect(s),s.connect(this.ctx.destination),r.start(e+i*.08),r.stop(e+i*.08+.65)})}}const it=new cy;/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uy=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),k0=(...t)=>t.filter((e,n,i)=>!!e&&e.trim()!==""&&i.indexOf(e)===n).join(" ").trim();/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var dy={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fy=Ee.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:i,className:r="",children:s,iconNode:o,...a},l)=>Ee.createElement("svg",{ref:l,...dy,width:e,height:e,stroke:t,strokeWidth:i?Number(n)*24/Number(e):n,className:k0("lucide",r),...a},[...o.map(([c,d])=>Ee.createElement(c,d)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const et=(t,e)=>{const n=Ee.forwardRef(({className:i,...r},s)=>Ee.createElement(fy,{ref:s,iconNode:e,className:k0(`lucide-${uy(t)}`,i),...r}));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hy=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],py=et("ArrowRight",hy);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const my=[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]],gy=et("ArrowUpRight",my);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vy=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],xy=et("Calendar",vy);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _y=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],yy=et("Check",_y);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sy=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],My=et("CircleCheck",Sy);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ey=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]],wy=et("Clock",Ey);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ty=[["path",{d:"M12 13v8",key:"1l5pq0"}],["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"m8 17 4-4 4 4",key:"1quai1"}]],Ay=et("CloudUpload",Ty);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const by=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],Cy=et("Copy",by);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ry=[["rect",{width:"16",height:"16",x:"4",y:"4",rx:"2",key:"14l7u7"}],["rect",{width:"6",height:"6",x:"9",y:"9",rx:"1",key:"5aljv4"}],["path",{d:"M15 2v2",key:"13l42r"}],["path",{d:"M15 20v2",key:"15mkzm"}],["path",{d:"M2 15h2",key:"1gxd5l"}],["path",{d:"M2 9h2",key:"1bbxkp"}],["path",{d:"M20 15h2",key:"19e6y8"}],["path",{d:"M20 9h2",key:"19tzq7"}],["path",{d:"M9 2v2",key:"165o2o"}],["path",{d:"M9 20v2",key:"i2bqo8"}]],Py=et("Cpu",Ry);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ly=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]],Ny=et("Download",Ly);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dy=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],Iy=et("Eye",Dy);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uy=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],z0=et("FileText",Uy);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oy=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}]],Fy=et("File",Oy);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ky=[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]],zy=et("Flame",ky);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const By=[["path",{d:"M12 10v6",key:"1bos4e"}],["path",{d:"M9 13h6",key:"1uhe8q"}],["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]],Hy=et("FolderPlus",By);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gy=[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]],Vy=et("Hash",Gy);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jy=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],Wy=et("Layers",jy);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xy=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]],Yy=et("Link",Xy);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qy=[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]],$y=et("Pin",qy);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ky=[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]],Zy=et("Play",Ky);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jy=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],Qy=et("Plus",Jy);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e1=[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]],t1=et("Printer",e1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n1=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],rd=et("RefreshCw",n1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i1=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],r1=et("RotateCcw",i1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s1=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],o1=et("Search",s1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a1=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],l1=et("Send",a1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c1=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]],B0=et("ShieldAlert",c1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u1=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],d1=et("ShieldCheck",u1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f1=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],h1=et("Shield",f1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p1=[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]],H0=et("Sparkles",p1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m1=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],G0=et("Trash2",m1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g1=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]],v1=et("Volume2",g1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x1=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]],_1=et("VolumeX",x1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y1=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Sl=et("X",y1);function S1({activeView:t,onViewChange:e}){const[n,i]=Ee.useState("");Ee.useEffect(()=>{const o=()=>{i(new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}))};o();const a=setInterval(o,1e3);return()=>clearInterval(a)},[]);const r=o=>{it.typewriterClick(),e(o)},s=[{id:"headquarters",label:"⌂ Headquarters"},{id:"casefiles",label:"▤ Case Files"},{id:"lab",label:"⚒ Investigation Lab"},{id:"clues",label:"☍ Clues & Suspect Web"},{id:"reports",label:"▧ Reports Desk"},{id:"archives",label:"▣ Archives"}];return x.jsxs("header",{className:"topbar",children:[x.jsxs("div",{className:"brand cursor-pointer",onClick:()=>r("headquarters"),children:[x.jsx("img",{src:"/favicon.png",alt:"ARGUS & Co.",className:"brandmark-img"}),x.jsxs("div",{children:[x.jsx("strong",{children:"ARGUS & Co."}),x.jsx("small",{children:"WESTERN INVESTIGATION BUREAU"})]})]}),x.jsx("nav",{className:"nav","aria-label":"Main navigation",children:s.map(o=>{const a=t===o.id;return x.jsx("button",{onClick:()=>r(o.id),className:a?"active":"",children:o.label},o.id)})}),x.jsxs("div",{className:"topright",children:[x.jsx("span",{className:"dot"}),x.jsx("span",{children:"BUREAU STATUS: ON DUTY"}),x.jsx("span",{style:{marginLeft:"12px",opacity:.75},children:n})]})]})}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const df="160",Ir={ROTATE:0,DOLLY:1,PAN:2},Ur={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},M1=0,jh=1,E1=2,V0=1,j0=2,ci=3,Ji=0,fn=1,Zn=2,Yi=0,ys=1,Wh=2,Xh=3,Yh=4,w1=5,fr=100,T1=101,A1=102,qh=103,$h=104,b1=200,C1=201,R1=202,P1=203,sd=204,od=205,L1=206,N1=207,D1=208,I1=209,U1=210,O1=211,F1=212,k1=213,z1=214,B1=0,H1=1,G1=2,Ml=3,V1=4,j1=5,W1=6,X1=7,W0=0,Y1=1,q1=2,qi=0,$1=1,K1=2,Z1=3,ff=4,J1=5,Q1=6,X0=300,Ps=301,Ls=302,ad=303,ld=304,Wl=306,cd=1e3,Hn=1001,ud=1002,Qt=1003,Kh=1004,Rc=1005,bn=1006,eS=1007,Fo=1008,$i=1009,tS=1010,nS=1011,hf=1012,Y0=1013,Fi=1014,ki=1015,ko=1016,q0=1017,$0=1018,_r=1020,iS=1021,Gn=1023,rS=1024,sS=1025,yr=1026,Ns=1027,oS=1028,K0=1029,aS=1030,Z0=1031,J0=1033,Pc=33776,Lc=33777,Nc=33778,Dc=33779,Zh=35840,Jh=35841,Qh=35842,ep=35843,Q0=36196,tp=37492,np=37496,ip=37808,rp=37809,sp=37810,op=37811,ap=37812,lp=37813,cp=37814,up=37815,dp=37816,fp=37817,hp=37818,pp=37819,mp=37820,gp=37821,Ic=36492,vp=36494,xp=36495,lS=36283,_p=36284,yp=36285,Sp=36286,ev=3e3,Sr=3001,cS=3200,uS=3201,tv=0,dS=1,Cn="",St="srgb",Mi="srgb-linear",pf="display-p3",Xl="display-p3-linear",El="linear",ut="srgb",wl="rec709",Tl="p3",Or=7680,Mp=519,fS=512,hS=513,pS=514,nv=515,mS=516,gS=517,vS=518,xS=519,Ep=35044,wp="300 es",dd=1035,gi=2e3,Al=2001;class Nr{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Tp=1234567;const po=Math.PI/180,zo=180/Math.PI;function Fs(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Wt[t&255]+Wt[t>>8&255]+Wt[t>>16&255]+Wt[t>>24&255]+"-"+Wt[e&255]+Wt[e>>8&255]+"-"+Wt[e>>16&15|64]+Wt[e>>24&255]+"-"+Wt[n&63|128]+Wt[n>>8&255]+"-"+Wt[n>>16&255]+Wt[n>>24&255]+Wt[i&255]+Wt[i>>8&255]+Wt[i>>16&255]+Wt[i>>24&255]).toLowerCase()}function Ct(t,e,n){return Math.max(e,Math.min(n,t))}function mf(t,e){return(t%e+e)%e}function _S(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)}function yS(t,e,n){return t!==e?(n-t)/(e-t):0}function mo(t,e,n){return(1-n)*t+n*e}function SS(t,e,n,i){return mo(t,e,1-Math.exp(-n*i))}function MS(t,e=1){return e-Math.abs(mf(t,e*2)-e)}function ES(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function wS(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function TS(t,e){return t+Math.floor(Math.random()*(e-t+1))}function AS(t,e){return t+Math.random()*(e-t)}function bS(t){return t*(.5-Math.random())}function CS(t){t!==void 0&&(Tp=t);let e=Tp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function RS(t){return t*po}function PS(t){return t*zo}function fd(t){return(t&t-1)===0&&t!==0}function LS(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function bl(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function NS(t,e,n,i,r){const s=Math.cos,o=Math.sin,a=s(n/2),l=o(n/2),c=s((e+i)/2),d=o((e+i)/2),f=s((e-i)/2),h=o((e-i)/2),p=s((i-e)/2),_=o((i-e)/2);switch(r){case"XYX":t.set(a*d,l*f,l*h,a*c);break;case"YZY":t.set(l*h,a*d,l*f,a*c);break;case"ZXZ":t.set(l*f,l*h,a*d,a*c);break;case"XZX":t.set(a*d,l*_,l*p,a*c);break;case"YXY":t.set(l*p,a*d,l*_,a*c);break;case"ZYZ":t.set(l*_,l*p,a*d,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Jr(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function Kt(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const sn={DEG2RAD:po,RAD2DEG:zo,generateUUID:Fs,clamp:Ct,euclideanModulo:mf,mapLinear:_S,inverseLerp:yS,lerp:mo,damp:SS,pingpong:MS,smoothstep:ES,smootherstep:wS,randInt:TS,randFloat:AS,randFloatSpread:bS,seededRandom:CS,degToRad:RS,radToDeg:PS,isPowerOfTwo:fd,ceilPowerOfTwo:LS,floorPowerOfTwo:bl,setQuaternionFromProperEuler:NS,normalize:Kt,denormalize:Jr};class ye{constructor(e=0,n=0){ye.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ct(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ke{constructor(e,n,i,r,s,o,a,l,c){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=a,d[3]=n,d[4]=s,d[5]=l,d[6]=i,d[7]=o,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],d=i[4],f=i[7],h=i[2],p=i[5],_=i[8],y=r[0],m=r[3],u=r[6],v=r[1],g=r[4],M=r[7],P=r[2],T=r[5],S=r[8];return s[0]=o*y+a*v+l*P,s[3]=o*m+a*g+l*T,s[6]=o*u+a*M+l*S,s[1]=c*y+d*v+f*P,s[4]=c*m+d*g+f*T,s[7]=c*u+d*M+f*S,s[2]=h*y+p*v+_*P,s[5]=h*m+p*g+_*T,s[8]=h*u+p*M+_*S,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8];return n*o*d-n*a*c-i*s*d+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],f=d*o-a*c,h=a*l-d*s,p=c*s-o*l,_=n*f+i*h+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/_;return e[0]=f*y,e[1]=(r*c-d*i)*y,e[2]=(a*i-r*o)*y,e[3]=h*y,e[4]=(d*n-r*l)*y,e[5]=(r*s-a*n)*y,e[6]=p*y,e[7]=(i*l-c*n)*y,e[8]=(o*n-i*s)*y,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(Uc.makeScale(e,n)),this}rotate(e){return this.premultiply(Uc.makeRotation(-e)),this}translate(e,n){return this.premultiply(Uc.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Uc=new Ke;function iv(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Bo(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function DS(){const t=Bo("canvas");return t.style.display="block",t}const Ap={};function go(t){t in Ap||(Ap[t]=!0,console.warn(t))}const bp=new Ke().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Cp=new Ke().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ha={[Mi]:{transfer:El,primaries:wl,toReference:t=>t,fromReference:t=>t},[St]:{transfer:ut,primaries:wl,toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[Xl]:{transfer:El,primaries:Tl,toReference:t=>t.applyMatrix3(Cp),fromReference:t=>t.applyMatrix3(bp)},[pf]:{transfer:ut,primaries:Tl,toReference:t=>t.convertSRGBToLinear().applyMatrix3(Cp),fromReference:t=>t.applyMatrix3(bp).convertLinearToSRGB()}},IS=new Set([Mi,Xl]),st={enabled:!0,_workingColorSpace:Mi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!IS.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=ha[e].toReference,r=ha[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return ha[t].primaries},getTransfer:function(t){return t===Cn?El:ha[t].transfer}};function Ss(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Oc(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Fr;class rv{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Fr===void 0&&(Fr=Bo("canvas")),Fr.width=e.width,Fr.height=e.height;const i=Fr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Fr}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Bo("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ss(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ss(n[i]/255)*255):n[i]=Ss(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let US=0;class sv{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:US++}),this.uuid=Fs(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Fc(r[o].image)):s.push(Fc(r[o]))}else s=Fc(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Fc(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?rv.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let OS=0;class tn extends Nr{constructor(e=tn.DEFAULT_IMAGE,n=tn.DEFAULT_MAPPING,i=Hn,r=Hn,s=bn,o=Fo,a=Gn,l=$i,c=tn.DEFAULT_ANISOTROPY,d=Cn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:OS++}),this.uuid=Fs(),this.name="",this.source=new sv(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ye(0,0),this.repeat=new ye(1,1),this.center=new ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof d=="string"?this.colorSpace=d:(go("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=d===Sr?St:Cn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==X0)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case cd:e.x=e.x-Math.floor(e.x);break;case Hn:e.x=e.x<0?0:1;break;case ud:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case cd:e.y=e.y-Math.floor(e.y);break;case Hn:e.y=e.y<0?0:1;break;case ud:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return go("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===St?Sr:ev}set encoding(e){go("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Sr?St:Cn}}tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=X0;tn.DEFAULT_ANISOTROPY=1;class ht{constructor(e=0,n=0,i=0,r=1){ht.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],d=l[4],f=l[8],h=l[1],p=l[5],_=l[9],y=l[2],m=l[6],u=l[10];if(Math.abs(d-h)<.01&&Math.abs(f-y)<.01&&Math.abs(_-m)<.01){if(Math.abs(d+h)<.1&&Math.abs(f+y)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const g=(c+1)/2,M=(p+1)/2,P=(u+1)/2,T=(d+h)/4,S=(f+y)/4,L=(_+m)/4;return g>M&&g>P?g<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(g),r=T/i,s=S/i):M>P?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=T/r,s=L/r):P<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),i=S/s,r=L/s),this.set(i,r,s,n),this}let v=Math.sqrt((m-_)*(m-_)+(f-y)*(f-y)+(h-d)*(h-d));return Math.abs(v)<.001&&(v=1),this.x=(m-_)/v,this.y=(f-y)/v,this.z=(h-d)/v,this.w=Math.acos((c+p+u-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class FS extends Nr{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new ht(0,0,e,n),this.scissorTest=!1,this.viewport=new ht(0,0,e,n);const r={width:e,height:n,depth:1};i.encoding!==void 0&&(go("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Sr?St:Cn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new tn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,n,i=1){(this.width!==e||this.height!==n||this.depth!==i)&&(this.width=e,this.height=n,this.depth=i,this.texture.image.width=e,this.texture.image.height=n,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new sv(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class br extends FS{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class ov extends tn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class kS extends tn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Cr{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],d=i[r+2],f=i[r+3];const h=s[o+0],p=s[o+1],_=s[o+2],y=s[o+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=d,e[n+3]=f;return}if(a===1){e[n+0]=h,e[n+1]=p,e[n+2]=_,e[n+3]=y;return}if(f!==y||l!==h||c!==p||d!==_){let m=1-a;const u=l*h+c*p+d*_+f*y,v=u>=0?1:-1,g=1-u*u;if(g>Number.EPSILON){const P=Math.sqrt(g),T=Math.atan2(P,u*v);m=Math.sin(m*T)/P,a=Math.sin(a*T)/P}const M=a*v;if(l=l*m+h*M,c=c*m+p*M,d=d*m+_*M,f=f*m+y*M,m===1-a){const P=1/Math.sqrt(l*l+c*c+d*d+f*f);l*=P,c*=P,d*=P,f*=P}}e[n]=l,e[n+1]=c,e[n+2]=d,e[n+3]=f}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],d=i[r+3],f=s[o],h=s[o+1],p=s[o+2],_=s[o+3];return e[n]=a*_+d*f+l*p-c*h,e[n+1]=l*_+d*h+c*f-a*p,e[n+2]=c*_+d*p+a*h-l*f,e[n+3]=d*_-a*f-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),d=a(r/2),f=a(s/2),h=l(i/2),p=l(r/2),_=l(s/2);switch(o){case"XYZ":this._x=h*d*f+c*p*_,this._y=c*p*f-h*d*_,this._z=c*d*_+h*p*f,this._w=c*d*f-h*p*_;break;case"YXZ":this._x=h*d*f+c*p*_,this._y=c*p*f-h*d*_,this._z=c*d*_-h*p*f,this._w=c*d*f+h*p*_;break;case"ZXY":this._x=h*d*f-c*p*_,this._y=c*p*f+h*d*_,this._z=c*d*_+h*p*f,this._w=c*d*f-h*p*_;break;case"ZYX":this._x=h*d*f-c*p*_,this._y=c*p*f+h*d*_,this._z=c*d*_-h*p*f,this._w=c*d*f+h*p*_;break;case"YZX":this._x=h*d*f+c*p*_,this._y=c*p*f+h*d*_,this._z=c*d*_-h*p*f,this._w=c*d*f-h*p*_;break;case"XZY":this._x=h*d*f-c*p*_,this._y=c*p*f-h*d*_,this._z=c*d*_+h*p*f,this._w=c*d*f+h*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],d=n[6],f=n[10],h=i+a+f;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(d-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>f){const p=2*Math.sqrt(1+i-a-f);this._w=(d-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>f){const p=2*Math.sqrt(1+a-i-f);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+f-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ct(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,d=n._w;return this._x=i*d+o*a+r*c-s*l,this._y=r*d+o*l+s*a-i*c,this._z=s*d+o*c+i*l-r*a,this._w=o*d-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,a),f=Math.sin((1-n)*d)/c,h=Math.sin(n*d)/c;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=Math.random(),n=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(n*Math.cos(r),i*Math.sin(s),i*Math.cos(s),n*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,n=0,i=0){N.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Rp.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Rp.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),d=2*(a*n-s*r),f=2*(s*i-o*n);return this.x=n+l*c+o*f-a*d,this.y=i+l*d+a*c-s*f,this.z=r+l*f+s*d-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return kc.copy(this).projectOnVector(e),this.sub(kc)}reflect(e){return this.sub(kc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ct(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,n=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(n),this.y=i*Math.sin(n),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const kc=new N,Rp=new Cr;class Yo{constructor(e=new N(1/0,1/0,1/0),n=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(In.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(In.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=In.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,In):In.fromBufferAttribute(s,o),In.applyMatrix4(e.matrixWorld),this.expandByPoint(In);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),pa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),pa.copy(i.boundingBox)),pa.applyMatrix4(e.matrixWorld),this.union(pa)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,In),In.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter($s),ma.subVectors(this.max,$s),kr.subVectors(e.a,$s),zr.subVectors(e.b,$s),Br.subVectors(e.c,$s),Ti.subVectors(zr,kr),Ai.subVectors(Br,zr),sr.subVectors(kr,Br);let n=[0,-Ti.z,Ti.y,0,-Ai.z,Ai.y,0,-sr.z,sr.y,Ti.z,0,-Ti.x,Ai.z,0,-Ai.x,sr.z,0,-sr.x,-Ti.y,Ti.x,0,-Ai.y,Ai.x,0,-sr.y,sr.x,0];return!zc(n,kr,zr,Br,ma)||(n=[1,0,0,0,1,0,0,0,1],!zc(n,kr,zr,Br,ma))?!1:(ga.crossVectors(Ti,Ai),n=[ga.x,ga.y,ga.z],zc(n,kr,zr,Br,ma))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,In).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(In).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ri),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ri=[new N,new N,new N,new N,new N,new N,new N,new N],In=new N,pa=new Yo,kr=new N,zr=new N,Br=new N,Ti=new N,Ai=new N,sr=new N,$s=new N,ma=new N,ga=new N,or=new N;function zc(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){or.fromArray(t,s);const a=r.x*Math.abs(or.x)+r.y*Math.abs(or.y)+r.z*Math.abs(or.z),l=e.dot(or),c=n.dot(or),d=i.dot(or);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>a)return!1}return!0}const zS=new Yo,Ks=new N,Bc=new N;class Yl{constructor(e=new N,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):zS.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ks.subVectors(e,this.center);const n=Ks.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(Ks,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Bc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ks.copy(e.center).add(Bc)),this.expandByPoint(Ks.copy(e.center).sub(Bc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const si=new N,Hc=new N,va=new N,bi=new N,Gc=new N,xa=new N,Vc=new N;class ql{constructor(e=new N,n=new N(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,si)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=si.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(si.copy(this.origin).addScaledVector(this.direction,n),si.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Hc.copy(e).add(n).multiplyScalar(.5),va.copy(n).sub(e).normalize(),bi.copy(this.origin).sub(Hc);const s=e.distanceTo(n)*.5,o=-this.direction.dot(va),a=bi.dot(this.direction),l=-bi.dot(va),c=bi.lengthSq(),d=Math.abs(1-o*o);let f,h,p,_;if(d>0)if(f=o*l-a,h=o*a-l,_=s*d,f>=0)if(h>=-_)if(h<=_){const y=1/d;f*=y,h*=y,p=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;else h<=-_?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+c):h<=_?(f=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+c);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Hc).addScaledVector(va,h),p}intersectSphere(e,n){si.subVectors(e.center,this.origin);const i=si.dot(this.direction),r=si.dot(si)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),d>=0?(s=(e.min.y-h.y)*d,o=(e.max.y-h.y)*d):(s=(e.max.y-h.y)*d,o=(e.min.y-h.y)*d),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,si)!==null}intersectTriangle(e,n,i,r,s){Gc.subVectors(n,e),xa.subVectors(i,e),Vc.crossVectors(Gc,xa);let o=this.direction.dot(Vc),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;bi.subVectors(this.origin,e);const l=a*this.direction.dot(xa.crossVectors(bi,xa));if(l<0)return null;const c=a*this.direction.dot(Gc.cross(bi));if(c<0||l+c>o)return null;const d=-a*bi.dot(Vc);return d<0?null:this.at(d/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Mt{constructor(e,n,i,r,s,o,a,l,c,d,f,h,p,_,y,m){Mt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,d,f,h,p,_,y,m)}set(e,n,i,r,s,o,a,l,c,d,f,h,p,_,y,m){const u=this.elements;return u[0]=e,u[4]=n,u[8]=i,u[12]=r,u[1]=s,u[5]=o,u[9]=a,u[13]=l,u[2]=c,u[6]=d,u[10]=f,u[14]=h,u[3]=p,u[7]=_,u[11]=y,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Mt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/Hr.setFromMatrixColumn(e,0).length(),s=1/Hr.setFromMatrixColumn(e,1).length(),o=1/Hr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),d=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=o*d,p=o*f,_=a*d,y=a*f;n[0]=l*d,n[4]=-l*f,n[8]=c,n[1]=p+_*c,n[5]=h-y*c,n[9]=-a*l,n[2]=y-h*c,n[6]=_+p*c,n[10]=o*l}else if(e.order==="YXZ"){const h=l*d,p=l*f,_=c*d,y=c*f;n[0]=h+y*a,n[4]=_*a-p,n[8]=o*c,n[1]=o*f,n[5]=o*d,n[9]=-a,n[2]=p*a-_,n[6]=y+h*a,n[10]=o*l}else if(e.order==="ZXY"){const h=l*d,p=l*f,_=c*d,y=c*f;n[0]=h-y*a,n[4]=-o*f,n[8]=_+p*a,n[1]=p+_*a,n[5]=o*d,n[9]=y-h*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const h=o*d,p=o*f,_=a*d,y=a*f;n[0]=l*d,n[4]=_*c-p,n[8]=h*c+y,n[1]=l*f,n[5]=y*c+h,n[9]=p*c-_,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const h=o*l,p=o*c,_=a*l,y=a*c;n[0]=l*d,n[4]=y-h*f,n[8]=_*f+p,n[1]=f,n[5]=o*d,n[9]=-a*d,n[2]=-c*d,n[6]=p*f+_,n[10]=h-y*f}else if(e.order==="XZY"){const h=o*l,p=o*c,_=a*l,y=a*c;n[0]=l*d,n[4]=-f,n[8]=c*d,n[1]=h*f+y,n[5]=o*d,n[9]=p*f-_,n[2]=_*f-p,n[6]=a*d,n[10]=y*f+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(BS,e,HS)}lookAt(e,n,i){const r=this.elements;return pn.subVectors(e,n),pn.lengthSq()===0&&(pn.z=1),pn.normalize(),Ci.crossVectors(i,pn),Ci.lengthSq()===0&&(Math.abs(i.z)===1?pn.x+=1e-4:pn.z+=1e-4,pn.normalize(),Ci.crossVectors(i,pn)),Ci.normalize(),_a.crossVectors(pn,Ci),r[0]=Ci.x,r[4]=_a.x,r[8]=pn.x,r[1]=Ci.y,r[5]=_a.y,r[9]=pn.y,r[2]=Ci.z,r[6]=_a.z,r[10]=pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],d=i[1],f=i[5],h=i[9],p=i[13],_=i[2],y=i[6],m=i[10],u=i[14],v=i[3],g=i[7],M=i[11],P=i[15],T=r[0],S=r[4],L=r[8],E=r[12],A=r[1],B=r[5],D=r[9],ee=r[13],I=r[2],z=r[6],k=r[10],J=r[14],O=r[3],H=r[7],j=r[11],te=r[15];return s[0]=o*T+a*A+l*I+c*O,s[4]=o*S+a*B+l*z+c*H,s[8]=o*L+a*D+l*k+c*j,s[12]=o*E+a*ee+l*J+c*te,s[1]=d*T+f*A+h*I+p*O,s[5]=d*S+f*B+h*z+p*H,s[9]=d*L+f*D+h*k+p*j,s[13]=d*E+f*ee+h*J+p*te,s[2]=_*T+y*A+m*I+u*O,s[6]=_*S+y*B+m*z+u*H,s[10]=_*L+y*D+m*k+u*j,s[14]=_*E+y*ee+m*J+u*te,s[3]=v*T+g*A+M*I+P*O,s[7]=v*S+g*B+M*z+P*H,s[11]=v*L+g*D+M*k+P*j,s[15]=v*E+g*ee+M*J+P*te,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],d=e[2],f=e[6],h=e[10],p=e[14],_=e[3],y=e[7],m=e[11],u=e[15];return _*(+s*l*f-r*c*f-s*a*h+i*c*h+r*a*p-i*l*p)+y*(+n*l*p-n*c*h+s*o*h-r*o*p+r*c*d-s*l*d)+m*(+n*c*f-n*a*p-s*o*f+i*o*p+s*a*d-i*c*d)+u*(-r*a*d-n*l*f+n*a*h+r*o*f-i*o*h+i*l*d)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],f=e[9],h=e[10],p=e[11],_=e[12],y=e[13],m=e[14],u=e[15],v=f*m*c-y*h*c+y*l*p-a*m*p-f*l*u+a*h*u,g=_*h*c-d*m*c-_*l*p+o*m*p+d*l*u-o*h*u,M=d*y*c-_*f*c+_*a*p-o*y*p-d*a*u+o*f*u,P=_*f*l-d*y*l-_*a*h+o*y*h+d*a*m-o*f*m,T=n*v+i*g+r*M+s*P;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const S=1/T;return e[0]=v*S,e[1]=(y*h*s-f*m*s-y*r*p+i*m*p+f*r*u-i*h*u)*S,e[2]=(a*m*s-y*l*s+y*r*c-i*m*c-a*r*u+i*l*u)*S,e[3]=(f*l*s-a*h*s-f*r*c+i*h*c+a*r*p-i*l*p)*S,e[4]=g*S,e[5]=(d*m*s-_*h*s+_*r*p-n*m*p-d*r*u+n*h*u)*S,e[6]=(_*l*s-o*m*s-_*r*c+n*m*c+o*r*u-n*l*u)*S,e[7]=(o*h*s-d*l*s+d*r*c-n*h*c-o*r*p+n*l*p)*S,e[8]=M*S,e[9]=(_*f*s-d*y*s-_*i*p+n*y*p+d*i*u-n*f*u)*S,e[10]=(o*y*s-_*a*s+_*i*c-n*y*c-o*i*u+n*a*u)*S,e[11]=(d*a*s-o*f*s-d*i*c+n*f*c+o*i*p-n*a*p)*S,e[12]=P*S,e[13]=(d*y*r-_*f*r+_*i*h-n*y*h-d*i*m+n*f*m)*S,e[14]=(_*a*r-o*y*r-_*i*l+n*y*l+o*i*m-n*a*m)*S,e[15]=(o*f*r-d*a*r+d*i*l-n*f*l-o*i*h+n*a*h)*S,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,d=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,d*a+i,d*l-r*o,0,c*l-r*a,d*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,d=o+o,f=a+a,h=s*c,p=s*d,_=s*f,y=o*d,m=o*f,u=a*f,v=l*c,g=l*d,M=l*f,P=i.x,T=i.y,S=i.z;return r[0]=(1-(y+u))*P,r[1]=(p+M)*P,r[2]=(_-g)*P,r[3]=0,r[4]=(p-M)*T,r[5]=(1-(h+u))*T,r[6]=(m+v)*T,r[7]=0,r[8]=(_+g)*S,r[9]=(m-v)*S,r[10]=(1-(h+y))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=Hr.set(r[0],r[1],r[2]).length();const o=Hr.set(r[4],r[5],r[6]).length(),a=Hr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Un.copy(this);const c=1/s,d=1/o,f=1/a;return Un.elements[0]*=c,Un.elements[1]*=c,Un.elements[2]*=c,Un.elements[4]*=d,Un.elements[5]*=d,Un.elements[6]*=d,Un.elements[8]*=f,Un.elements[9]*=f,Un.elements[10]*=f,n.setFromRotationMatrix(Un),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=gi){const l=this.elements,c=2*s/(n-e),d=2*s/(i-r),f=(n+e)/(n-e),h=(i+r)/(i-r);let p,_;if(a===gi)p=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Al)p=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=gi){const l=this.elements,c=1/(n-e),d=1/(i-r),f=1/(o-s),h=(n+e)*c,p=(i+r)*d;let _,y;if(a===gi)_=(o+s)*f,y=-2*f;else if(a===Al)_=s*f,y=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=y,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Hr=new N,Un=new Mt,BS=new N(0,0,0),HS=new N(1,1,1),Ci=new N,_a=new N,pn=new N,Pp=new Mt,Lp=new Cr;class $l{constructor(e=0,n=0,i=0,r=$l.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],d=r[9],f=r[2],h=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(Ct(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ct(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ct(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ct(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ct(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Pp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Pp,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Lp.setFromEuler(this),this.setFromQuaternion(Lp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$l.DEFAULT_ORDER="XYZ";class gf{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let GS=0;const Np=new N,Gr=new Cr,oi=new Mt,ya=new N,Zs=new N,VS=new N,jS=new Cr,Dp=new N(1,0,0),Ip=new N(0,1,0),Up=new N(0,0,1),WS={type:"added"},XS={type:"removed"};class kt extends Nr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:GS++}),this.uuid=Fs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=kt.DEFAULT_UP.clone();const e=new N,n=new $l,i=new Cr,r=new N(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Mt},normalMatrix:{value:new Ke}}),this.matrix=new Mt,this.matrixWorld=new Mt,this.matrixAutoUpdate=kt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Gr.setFromAxisAngle(e,n),this.quaternion.multiply(Gr),this}rotateOnWorldAxis(e,n){return Gr.setFromAxisAngle(e,n),this.quaternion.premultiply(Gr),this}rotateX(e){return this.rotateOnAxis(Dp,e)}rotateY(e){return this.rotateOnAxis(Ip,e)}rotateZ(e){return this.rotateOnAxis(Up,e)}translateOnAxis(e,n){return Np.copy(e).applyQuaternion(this.quaternion),this.position.add(Np.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Dp,e)}translateY(e){return this.translateOnAxis(Ip,e)}translateZ(e){return this.translateOnAxis(Up,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(oi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?ya.copy(e):ya.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Zs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?oi.lookAt(Zs,ya,this.up):oi.lookAt(ya,Zs,this.up),this.quaternion.setFromRotationMatrix(oi),r&&(oi.extractRotation(r.matrixWorld),Gr.setFromRotationMatrix(oi),this.quaternion.premultiply(Gr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(WS)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(XS)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),oi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),oi.multiply(e.parent.matrixWorld)),e.applyMatrix4(oi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,e,VS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,jS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++){const s=n[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),d=o(e.images),f=o(e.shapes),h=o(e.skeletons),p=o(e.animations),_=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(a){const l=[];for(const c in a){const d=a[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}kt.DEFAULT_UP=new N(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const On=new N,ai=new N,jc=new N,li=new N,Vr=new N,jr=new N,Op=new N,Wc=new N,Xc=new N,Yc=new N;let Sa=!1;class Bn{constructor(e=new N,n=new N,i=new N){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),On.subVectors(e,n),r.cross(On);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){On.subVectors(r,n),ai.subVectors(i,n),jc.subVectors(e,n);const o=On.dot(On),a=On.dot(ai),l=On.dot(jc),c=ai.dot(ai),d=ai.dot(jc),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const h=1/f,p=(c*l-a*d)*h,_=(o*d-a*l)*h;return s.set(1-p-_,_,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,li)===null?!1:li.x>=0&&li.y>=0&&li.x+li.y<=1}static getUV(e,n,i,r,s,o,a,l){return Sa===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Sa=!0),this.getInterpolation(e,n,i,r,s,o,a,l)}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,li)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,li.x),l.addScaledVector(o,li.y),l.addScaledVector(a,li.z),l)}static isFrontFacing(e,n,i,r){return On.subVectors(i,n),ai.subVectors(e,n),On.cross(ai).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return On.subVectors(this.c,this.b),ai.subVectors(this.a,this.b),On.cross(ai).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Bn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Bn.getBarycoord(e,this.a,this.b,this.c,n)}getUV(e,n,i,r,s){return Sa===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Sa=!0),Bn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}getInterpolation(e,n,i,r,s){return Bn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Bn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Bn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;Vr.subVectors(r,i),jr.subVectors(s,i),Wc.subVectors(e,i);const l=Vr.dot(Wc),c=jr.dot(Wc);if(l<=0&&c<=0)return n.copy(i);Xc.subVectors(e,r);const d=Vr.dot(Xc),f=jr.dot(Xc);if(d>=0&&f<=d)return n.copy(r);const h=l*f-d*c;if(h<=0&&l>=0&&d<=0)return o=l/(l-d),n.copy(i).addScaledVector(Vr,o);Yc.subVectors(e,s);const p=Vr.dot(Yc),_=jr.dot(Yc);if(_>=0&&p<=_)return n.copy(s);const y=p*c-l*_;if(y<=0&&c>=0&&_<=0)return a=c/(c-_),n.copy(i).addScaledVector(jr,a);const m=d*_-p*f;if(m<=0&&f-d>=0&&p-_>=0)return Op.subVectors(s,r),a=(f-d)/(f-d+(p-_)),n.copy(r).addScaledVector(Op,a);const u=1/(m+y+h);return o=y*u,a=h*u,n.copy(i).addScaledVector(Vr,o).addScaledVector(jr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const av={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ri={h:0,s:0,l:0},Ma={h:0,s:0,l:0};function qc(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class qe{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=St){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=st.workingColorSpace){return this.r=e,this.g=n,this.b=i,st.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=st.workingColorSpace){if(e=mf(e,1),n=Ct(n,0,1),i=Ct(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=qc(o,s,e+1/3),this.g=qc(o,s,e),this.b=qc(o,s,e-1/3)}return st.toWorkingColorSpace(this,r),this}setStyle(e,n=St){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=St){const i=av[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ss(e.r),this.g=Ss(e.g),this.b=Ss(e.b),this}copyLinearToSRGB(e){return this.r=Oc(e.r),this.g=Oc(e.g),this.b=Oc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=St){return st.fromWorkingColorSpace(Xt.copy(this),e),Math.round(Ct(Xt.r*255,0,255))*65536+Math.round(Ct(Xt.g*255,0,255))*256+Math.round(Ct(Xt.b*255,0,255))}getHexString(e=St){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=st.workingColorSpace){st.fromWorkingColorSpace(Xt.copy(this),n);const i=Xt.r,r=Xt.g,s=Xt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const d=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=d<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,n=st.workingColorSpace){return st.fromWorkingColorSpace(Xt.copy(this),n),e.r=Xt.r,e.g=Xt.g,e.b=Xt.b,e}getStyle(e=St){st.fromWorkingColorSpace(Xt.copy(this),e);const n=Xt.r,i=Xt.g,r=Xt.b;return e!==St?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Ri),this.setHSL(Ri.h+e,Ri.s+n,Ri.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Ri),e.getHSL(Ma);const i=mo(Ri.h,Ma.h,n),r=mo(Ri.s,Ma.s,n),s=mo(Ri.l,Ma.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Xt=new qe;qe.NAMES=av;let YS=0;class ks extends Nr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:YS++}),this.uuid=Fs(),this.name="",this.type="Material",this.blending=ys,this.side=Ji,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=sd,this.blendDst=od,this.blendEquation=fr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=Ml,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Mp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Or,this.stencilZFail=Or,this.stencilZPass=Or,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ys&&(i.blending=this.blending),this.side!==Ji&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==sd&&(i.blendSrc=this.blendSrc),this.blendDst!==od&&(i.blendDst=this.blendDst),this.blendEquation!==fr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ml&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Mp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Or&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Or&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Or&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Cl extends ks{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=W0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const bt=new N,Ea=new ye;class ti{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Ep,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=ki,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Ea.fromBufferAttribute(this,n),Ea.applyMatrix3(e),this.setXY(n,Ea.x,Ea.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)bt.fromBufferAttribute(this,n),bt.applyMatrix3(e),this.setXYZ(n,bt.x,bt.y,bt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)bt.fromBufferAttribute(this,n),bt.applyMatrix4(e),this.setXYZ(n,bt.x,bt.y,bt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)bt.fromBufferAttribute(this,n),bt.applyNormalMatrix(e),this.setXYZ(n,bt.x,bt.y,bt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)bt.fromBufferAttribute(this,n),bt.transformDirection(e),this.setXYZ(n,bt.x,bt.y,bt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Jr(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=Kt(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Jr(n,this.array)),n}setX(e,n){return this.normalized&&(n=Kt(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Jr(n,this.array)),n}setY(e,n){return this.normalized&&(n=Kt(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Jr(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Kt(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Jr(n,this.array)),n}setW(e,n){return this.normalized&&(n=Kt(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=Kt(n,this.array),i=Kt(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=Kt(n,this.array),i=Kt(i,this.array),r=Kt(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=Kt(n,this.array),i=Kt(i,this.array),r=Kt(r,this.array),s=Kt(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ep&&(e.usage=this.usage),e}}class lv extends ti{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class cv extends ti{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class at extends ti{constructor(e,n,i){super(new Float32Array(e),n,i)}}let qS=0;const En=new Mt,$c=new kt,Wr=new N,mn=new Yo,Js=new Yo,Ut=new N;class $t extends Nr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qS++}),this.uuid=Fs(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(iv(e)?cv:lv)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ke().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return En.makeRotationFromQuaternion(e),this.applyMatrix4(En),this}rotateX(e){return En.makeRotationX(e),this.applyMatrix4(En),this}rotateY(e){return En.makeRotationY(e),this.applyMatrix4(En),this}rotateZ(e){return En.makeRotationZ(e),this.applyMatrix4(En),this}translate(e,n,i){return En.makeTranslation(e,n,i),this.applyMatrix4(En),this}scale(e,n,i){return En.makeScale(e,n,i),this.applyMatrix4(En),this}lookAt(e){return $c.lookAt(e),$c.updateMatrix(),this.applyMatrix4($c.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Wr).negate(),this.translate(Wr.x,Wr.y,Wr.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new at(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];mn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,mn.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,mn.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(mn.min),this.boundingBox.expandByPoint(mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yl);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new N,1/0);return}if(e){const i=this.boundingSphere.center;if(mn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];Js.setFromBufferAttribute(a),this.morphTargetsRelative?(Ut.addVectors(mn.min,Js.min),mn.expandByPoint(Ut),Ut.addVectors(mn.max,Js.max),mn.expandByPoint(Ut)):(mn.expandByPoint(Js.min),mn.expandByPoint(Js.max))}mn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Ut.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ut));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,d=a.count;c<d;c++)Ut.fromBufferAttribute(a,c),l&&(Wr.fromBufferAttribute(e,c),Ut.add(Wr)),r=Math.max(r,i.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=n.position.array,s=n.normal.array,o=n.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ti(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],d=[];for(let A=0;A<a;A++)c[A]=new N,d[A]=new N;const f=new N,h=new N,p=new N,_=new ye,y=new ye,m=new ye,u=new N,v=new N;function g(A,B,D){f.fromArray(r,A*3),h.fromArray(r,B*3),p.fromArray(r,D*3),_.fromArray(o,A*2),y.fromArray(o,B*2),m.fromArray(o,D*2),h.sub(f),p.sub(f),y.sub(_),m.sub(_);const ee=1/(y.x*m.y-m.x*y.y);isFinite(ee)&&(u.copy(h).multiplyScalar(m.y).addScaledVector(p,-y.y).multiplyScalar(ee),v.copy(p).multiplyScalar(y.x).addScaledVector(h,-m.x).multiplyScalar(ee),c[A].add(u),c[B].add(u),c[D].add(u),d[A].add(v),d[B].add(v),d[D].add(v))}let M=this.groups;M.length===0&&(M=[{start:0,count:i.length}]);for(let A=0,B=M.length;A<B;++A){const D=M[A],ee=D.start,I=D.count;for(let z=ee,k=ee+I;z<k;z+=3)g(i[z+0],i[z+1],i[z+2])}const P=new N,T=new N,S=new N,L=new N;function E(A){S.fromArray(s,A*3),L.copy(S);const B=c[A];P.copy(B),P.sub(S.multiplyScalar(S.dot(B))).normalize(),T.crossVectors(L,B);const ee=T.dot(d[A])<0?-1:1;l[A*4]=P.x,l[A*4+1]=P.y,l[A*4+2]=P.z,l[A*4+3]=ee}for(let A=0,B=M.length;A<B;++A){const D=M[A],ee=D.start,I=D.count;for(let z=ee,k=ee+I;z<k;z+=3)E(i[z+0]),E(i[z+1]),E(i[z+2])}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ti(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new N,s=new N,o=new N,a=new N,l=new N,c=new N,d=new N,f=new N;if(e)for(let h=0,p=e.count;h<p;h+=3){const _=e.getX(h+0),y=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(n,_),s.fromBufferAttribute(n,y),o.fromBufferAttribute(n,m),d.subVectors(o,s),f.subVectors(r,s),d.cross(f),a.fromBufferAttribute(i,_),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,m),a.add(d),l.add(d),c.add(d),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=n.count;h<p;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),o.fromBufferAttribute(n,h+2),d.subVectors(o,s),f.subVectors(r,s),d.cross(f),i.setXYZ(h+0,d.x,d.y,d.z),i.setXYZ(h+1,d.x,d.y,d.z),i.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Ut.fromBufferAttribute(e,n),Ut.normalize(),e.setXYZ(n,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(a,l){const c=a.array,d=a.itemSize,f=a.normalized,h=new c.constructor(l.length*d);let p=0,_=0;for(let y=0,m=l.length;y<m;y++){a.isInterleavedBufferAttribute?p=l[y]*a.data.stride+a.offset:p=l[y]*d;for(let u=0;u<d;u++)h[_++]=c[p++]}return new ti(h,d,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new $t,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let d=0,f=c.length;d<f;d++){const h=c[d],p=e(h,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let f=0,h=c.length;f<h;f++){const p=c[f];d.push(p.toJSON(e.data))}d.length>0&&(r[l]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(n))}const s=e.morphAttributes;for(const c in s){const d=[],f=s[c];for(let h=0,p=f.length;h<p;h++)d.push(f[h].clone(n));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,d=o.length;c<d;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Fp=new Mt,ar=new ql,wa=new Yl,kp=new N,Xr=new N,Yr=new N,qr=new N,Kc=new N,Ta=new N,Aa=new ye,ba=new ye,Ca=new ye,zp=new N,Bp=new N,Hp=new N,Ra=new N,Pa=new N;class Xe extends kt{constructor(e=new $t,n=new Cl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Ta.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=a[l],f=s[l];d!==0&&(Kc.fromBufferAttribute(f,e),o?Ta.addScaledVector(Kc,d):Ta.addScaledVector(Kc.sub(n),d))}n.add(Ta)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),wa.copy(i.boundingSphere),wa.applyMatrix4(s),ar.copy(e.ray).recast(e.near),!(wa.containsPoint(ar.origin)===!1&&(ar.intersectSphere(wa,kp)===null||ar.origin.distanceToSquared(kp)>(e.far-e.near)**2))&&(Fp.copy(s).invert(),ar.copy(e.ray).applyMatrix4(Fp),!(i.boundingBox!==null&&ar.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,ar)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,f=s.attributes.normal,h=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,y=h.length;_<y;_++){const m=h[_],u=o[m.materialIndex],v=Math.max(m.start,p.start),g=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let M=v,P=g;M<P;M+=3){const T=a.getX(M),S=a.getX(M+1),L=a.getX(M+2);r=La(this,u,e,i,c,d,f,T,S,L),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const _=Math.max(0,p.start),y=Math.min(a.count,p.start+p.count);for(let m=_,u=y;m<u;m+=3){const v=a.getX(m),g=a.getX(m+1),M=a.getX(m+2);r=La(this,o,e,i,c,d,f,v,g,M),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,y=h.length;_<y;_++){const m=h[_],u=o[m.materialIndex],v=Math.max(m.start,p.start),g=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let M=v,P=g;M<P;M+=3){const T=M,S=M+1,L=M+2;r=La(this,u,e,i,c,d,f,T,S,L),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const _=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let m=_,u=y;m<u;m+=3){const v=m,g=m+1,M=m+2;r=La(this,o,e,i,c,d,f,v,g,M),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function $S(t,e,n,i,r,s,o,a){let l;if(e.side===fn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Ji,a),l===null)return null;Pa.copy(a),Pa.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Pa);return c<n.near||c>n.far?null:{distance:c,point:Pa.clone(),object:t}}function La(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,Xr),t.getVertexPosition(l,Yr),t.getVertexPosition(c,qr);const d=$S(t,e,n,i,Xr,Yr,qr,Ra);if(d){r&&(Aa.fromBufferAttribute(r,a),ba.fromBufferAttribute(r,l),Ca.fromBufferAttribute(r,c),d.uv=Bn.getInterpolation(Ra,Xr,Yr,qr,Aa,ba,Ca,new ye)),s&&(Aa.fromBufferAttribute(s,a),ba.fromBufferAttribute(s,l),Ca.fromBufferAttribute(s,c),d.uv1=Bn.getInterpolation(Ra,Xr,Yr,qr,Aa,ba,Ca,new ye),d.uv2=d.uv1),o&&(zp.fromBufferAttribute(o,a),Bp.fromBufferAttribute(o,l),Hp.fromBufferAttribute(o,c),d.normal=Bn.getInterpolation(Ra,Xr,Yr,qr,zp,Bp,Hp,new N),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new N,materialIndex:0};Bn.getNormal(Xr,Yr,qr,f.normal),d.face=f}return d}class Qi extends $t{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],d=[],f=[];let h=0,p=0;_("z","y","x",-1,-1,i,n,e,o,s,0),_("z","y","x",1,-1,i,n,-e,o,s,1),_("x","z","y",1,1,e,i,n,r,o,2),_("x","z","y",1,-1,e,i,-n,r,o,3),_("x","y","z",1,-1,e,n,i,r,s,4),_("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new at(c,3)),this.setAttribute("normal",new at(d,3)),this.setAttribute("uv",new at(f,2));function _(y,m,u,v,g,M,P,T,S,L,E){const A=M/S,B=P/L,D=M/2,ee=P/2,I=T/2,z=S+1,k=L+1;let J=0,O=0;const H=new N;for(let j=0;j<k;j++){const te=j*B-ee;for(let ie=0;ie<z;ie++){const Y=ie*A-D;H[y]=Y*v,H[m]=te*g,H[u]=I,c.push(H.x,H.y,H.z),H[y]=0,H[m]=0,H[u]=T>0?1:-1,d.push(H.x,H.y,H.z),f.push(ie/S),f.push(1-j/L),J+=1}}for(let j=0;j<L;j++)for(let te=0;te<S;te++){const ie=h+te+z*j,Y=h+te+z*(j+1),X=h+(te+1)+z*(j+1),le=h+(te+1)+z*j;l.push(ie,Y,le),l.push(Y,X,le),O+=6}a.addGroup(p,O,E),p+=O,h+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ds(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function Zt(t){const e={};for(let n=0;n<t.length;n++){const i=Ds(t[n]);for(const r in i)e[r]=i[r]}return e}function KS(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function uv(t){return t.getRenderTarget()===null?t.outputColorSpace:st.workingColorSpace}const ZS={clone:Ds,merge:Zt};var JS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,QS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Rr extends ks{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=JS,this.fragmentShader=QS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ds(e.uniforms),this.uniformsGroups=KS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class dv extends kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Mt,this.projectionMatrix=new Mt,this.projectionMatrixInverse=new Mt,this.coordinateSystem=gi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class an extends dv{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=zo*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(po*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zo*2*Math.atan(Math.tan(po*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(po*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const $r=-90,Kr=1;class eM extends kt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new an($r,Kr,e,n);r.layers=this.layers,this.add(r);const s=new an($r,Kr,e,n);s.layers=this.layers,this.add(s);const o=new an($r,Kr,e,n);o.layers=this.layers,this.add(o);const a=new an($r,Kr,e,n);a.layers=this.layers,this.add(a);const l=new an($r,Kr,e,n);l.layers=this.layers,this.add(l);const c=new an($r,Kr,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===gi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Al)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,d]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),e.render(n,d),e.setRenderTarget(f,h,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class fv extends tn{constructor(e,n,i,r,s,o,a,l,c,d){e=e!==void 0?e:[],n=n!==void 0?n:Ps,super(e,n,i,r,s,o,a,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class tM extends br{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];n.encoding!==void 0&&(go("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Sr?St:Cn),this.texture=new fv(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:bn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Qi(5,5,5),s=new Rr({name:"CubemapFromEquirect",uniforms:Ds(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:fn,blending:Yi});s.uniforms.tEquirect.value=n;const o=new Xe(r,s),a=n.minFilter;return n.minFilter===Fo&&(n.minFilter=bn),new eM(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}const Zc=new N,nM=new N,iM=new Ke;class Ni{constructor(e=new N(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Zc.subVectors(i,n).cross(nM.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Zc),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||iM.getNormalMatrix(e),r=this.coplanarPoint(Zc).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const lr=new Yl,Na=new N;class vf{constructor(e=new Ni,n=new Ni,i=new Ni,r=new Ni,s=new Ni,o=new Ni){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=gi){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],d=r[5],f=r[6],h=r[7],p=r[8],_=r[9],y=r[10],m=r[11],u=r[12],v=r[13],g=r[14],M=r[15];if(i[0].setComponents(l-s,h-c,m-p,M-u).normalize(),i[1].setComponents(l+s,h+c,m+p,M+u).normalize(),i[2].setComponents(l+o,h+d,m+_,M+v).normalize(),i[3].setComponents(l-o,h-d,m-_,M-v).normalize(),i[4].setComponents(l-a,h-f,m-y,M-g).normalize(),n===gi)i[5].setComponents(l+a,h+f,m+y,M+g).normalize();else if(n===Al)i[5].setComponents(a,f,y,g).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),lr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),lr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(lr)}intersectsSprite(e){return lr.center.set(0,0,0),lr.radius=.7071067811865476,lr.applyMatrix4(e.matrixWorld),this.intersectsSphere(lr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Na.x=r.normal.x>0?e.max.x:e.min.x,Na.y=r.normal.y>0?e.max.y:e.min.y,Na.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Na)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function hv(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function rM(t,e){const n=e.isWebGL2,i=new WeakMap;function r(c,d){const f=c.array,h=c.usage,p=f.byteLength,_=t.createBuffer();t.bindBuffer(d,_),t.bufferData(d,f,h),c.onUploadCallback();let y;if(f instanceof Float32Array)y=t.FLOAT;else if(f instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(n)y=t.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else y=t.UNSIGNED_SHORT;else if(f instanceof Int16Array)y=t.SHORT;else if(f instanceof Uint32Array)y=t.UNSIGNED_INT;else if(f instanceof Int32Array)y=t.INT;else if(f instanceof Int8Array)y=t.BYTE;else if(f instanceof Uint8Array)y=t.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)y=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:_,type:y,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version,size:p}}function s(c,d,f){const h=d.array,p=d._updateRange,_=d.updateRanges;if(t.bindBuffer(f,c),p.count===-1&&_.length===0&&t.bufferSubData(f,0,h),_.length!==0){for(let y=0,m=_.length;y<m;y++){const u=_[y];n?t.bufferSubData(f,u.start*h.BYTES_PER_ELEMENT,h,u.start,u.count):t.bufferSubData(f,u.start*h.BYTES_PER_ELEMENT,h.subarray(u.start,u.start+u.count))}d.clearUpdateRanges()}p.count!==-1&&(n?t.bufferSubData(f,p.offset*h.BYTES_PER_ELEMENT,h,p.offset,p.count):t.bufferSubData(f,p.offset*h.BYTES_PER_ELEMENT,h.subarray(p.offset,p.offset+p.count)),p.count=-1),d.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const d=i.get(c);d&&(t.deleteBuffer(d.buffer),i.delete(c))}function l(c,d){if(c.isGLBufferAttribute){const h=i.get(c);(!h||h.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const f=i.get(c);if(f===void 0)i.set(c,r(c,d));else if(f.version<c.version){if(f.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,c,d),f.version=c.version}}return{get:o,remove:a,update:l}}class Ms extends $t{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,d=l+1,f=e/a,h=n/l,p=[],_=[],y=[],m=[];for(let u=0;u<d;u++){const v=u*h-o;for(let g=0;g<c;g++){const M=g*f-s;_.push(M,-v,0),y.push(0,0,1),m.push(g/a),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let v=0;v<a;v++){const g=v+c*u,M=v+c*(u+1),P=v+1+c*(u+1),T=v+1+c*u;p.push(g,M,T),p.push(M,P,T)}this.setIndex(p),this.setAttribute("position",new at(_,3)),this.setAttribute("normal",new at(y,3)),this.setAttribute("uv",new at(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ms(e.width,e.height,e.widthSegments,e.heightSegments)}}var sM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,oM=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,aM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,lM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cM=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,uM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,dM=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,fM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,hM=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,pM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,mM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,gM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,xM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,_M=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,yM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,SM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,MM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,EM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,TM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,AM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,bM=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,CM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,RM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,PM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,LM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,NM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,DM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,IM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,UM="gl_FragColor = linearToOutputTexel( gl_FragColor );",OM=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,FM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,kM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,zM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,BM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,HM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,GM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,VM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,jM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,WM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,XM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,YM=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,qM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$M=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,KM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ZM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,JM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,QM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,eE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,tE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,nE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,iE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,rE=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,sE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,oE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,aE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lE=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,cE=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,uE=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,dE=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,fE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,pE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,mE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,vE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xE=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_E=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,yE=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,SE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,ME=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,EE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,wE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,TE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,AE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,CE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,RE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,PE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,LE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,NE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,DE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,IE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,UE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,OE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,FE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,kE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,zE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,BE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,HE=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,GE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,VE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,jE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,WE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,XE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,YE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$E=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,KE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ZE=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,JE=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,QE=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ew=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,nw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,iw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const rw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sw=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ow=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,aw=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,dw=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,fw=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,hw=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,pw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,mw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gw=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vw=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,xw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,_w=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yw=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sw=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mw=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ew=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ww=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Tw=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Aw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bw=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cw=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Rw=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pw=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lw=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nw=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Dw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Iw=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Uw=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ow=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:sM,alphahash_pars_fragment:oM,alphamap_fragment:aM,alphamap_pars_fragment:lM,alphatest_fragment:cM,alphatest_pars_fragment:uM,aomap_fragment:dM,aomap_pars_fragment:fM,batching_pars_vertex:hM,batching_vertex:pM,begin_vertex:mM,beginnormal_vertex:gM,bsdfs:vM,iridescence_fragment:xM,bumpmap_pars_fragment:_M,clipping_planes_fragment:yM,clipping_planes_pars_fragment:SM,clipping_planes_pars_vertex:MM,clipping_planes_vertex:EM,color_fragment:wM,color_pars_fragment:TM,color_pars_vertex:AM,color_vertex:bM,common:CM,cube_uv_reflection_fragment:RM,defaultnormal_vertex:PM,displacementmap_pars_vertex:LM,displacementmap_vertex:NM,emissivemap_fragment:DM,emissivemap_pars_fragment:IM,colorspace_fragment:UM,colorspace_pars_fragment:OM,envmap_fragment:FM,envmap_common_pars_fragment:kM,envmap_pars_fragment:zM,envmap_pars_vertex:BM,envmap_physical_pars_fragment:JM,envmap_vertex:HM,fog_vertex:GM,fog_pars_vertex:VM,fog_fragment:jM,fog_pars_fragment:WM,gradientmap_pars_fragment:XM,lightmap_fragment:YM,lightmap_pars_fragment:qM,lights_lambert_fragment:$M,lights_lambert_pars_fragment:KM,lights_pars_begin:ZM,lights_toon_fragment:QM,lights_toon_pars_fragment:eE,lights_phong_fragment:tE,lights_phong_pars_fragment:nE,lights_physical_fragment:iE,lights_physical_pars_fragment:rE,lights_fragment_begin:sE,lights_fragment_maps:oE,lights_fragment_end:aE,logdepthbuf_fragment:lE,logdepthbuf_pars_fragment:cE,logdepthbuf_pars_vertex:uE,logdepthbuf_vertex:dE,map_fragment:fE,map_pars_fragment:hE,map_particle_fragment:pE,map_particle_pars_fragment:mE,metalnessmap_fragment:gE,metalnessmap_pars_fragment:vE,morphcolor_vertex:xE,morphnormal_vertex:_E,morphtarget_pars_vertex:yE,morphtarget_vertex:SE,normal_fragment_begin:ME,normal_fragment_maps:EE,normal_pars_fragment:wE,normal_pars_vertex:TE,normal_vertex:AE,normalmap_pars_fragment:bE,clearcoat_normal_fragment_begin:CE,clearcoat_normal_fragment_maps:RE,clearcoat_pars_fragment:PE,iridescence_pars_fragment:LE,opaque_fragment:NE,packing:DE,premultiplied_alpha_fragment:IE,project_vertex:UE,dithering_fragment:OE,dithering_pars_fragment:FE,roughnessmap_fragment:kE,roughnessmap_pars_fragment:zE,shadowmap_pars_fragment:BE,shadowmap_pars_vertex:HE,shadowmap_vertex:GE,shadowmask_pars_fragment:VE,skinbase_vertex:jE,skinning_pars_vertex:WE,skinning_vertex:XE,skinnormal_vertex:YE,specularmap_fragment:qE,specularmap_pars_fragment:$E,tonemapping_fragment:KE,tonemapping_pars_fragment:ZE,transmission_fragment:JE,transmission_pars_fragment:QE,uv_pars_fragment:ew,uv_pars_vertex:tw,uv_vertex:nw,worldpos_vertex:iw,background_vert:rw,background_frag:sw,backgroundCube_vert:ow,backgroundCube_frag:aw,cube_vert:lw,cube_frag:cw,depth_vert:uw,depth_frag:dw,distanceRGBA_vert:fw,distanceRGBA_frag:hw,equirect_vert:pw,equirect_frag:mw,linedashed_vert:gw,linedashed_frag:vw,meshbasic_vert:xw,meshbasic_frag:_w,meshlambert_vert:yw,meshlambert_frag:Sw,meshmatcap_vert:Mw,meshmatcap_frag:Ew,meshnormal_vert:ww,meshnormal_frag:Tw,meshphong_vert:Aw,meshphong_frag:bw,meshphysical_vert:Cw,meshphysical_frag:Rw,meshtoon_vert:Pw,meshtoon_frag:Lw,points_vert:Nw,points_frag:Dw,shadow_vert:Iw,shadow_frag:Uw,sprite_vert:Ow,sprite_frag:Fw},xe={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},$n={basic:{uniforms:Zt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Zt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new qe(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Zt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Zt([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Zt([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new qe(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Zt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Zt([xe.points,xe.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Zt([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Zt([xe.common,xe.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Zt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Zt([xe.sprite,xe.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:Zt([xe.common,xe.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:Zt([xe.lights,xe.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};$n.physical={uniforms:Zt([$n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const Da={r:0,b:0,g:0};function kw(t,e,n,i,r,s,o){const a=new qe(0);let l=s===!0?0:1,c,d,f=null,h=0,p=null;function _(m,u){let v=!1,g=u.isScene===!0?u.background:null;g&&g.isTexture&&(g=(u.backgroundBlurriness>0?n:e).get(g)),g===null?y(a,l):g&&g.isColor&&(y(g,1),v=!0);const M=t.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||v)&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),g&&(g.isCubeTexture||g.mapping===Wl)?(d===void 0&&(d=new Xe(new Qi(1,1,1),new Rr({name:"BackgroundCubeMaterial",uniforms:Ds($n.backgroundCube.uniforms),vertexShader:$n.backgroundCube.vertexShader,fragmentShader:$n.backgroundCube.fragmentShader,side:fn,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(P,T,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),d.material.uniforms.envMap.value=g,d.material.uniforms.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=u.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,d.material.toneMapped=st.getTransfer(g.colorSpace)!==ut,(f!==g||h!==g.version||p!==t.toneMapping)&&(d.material.needsUpdate=!0,f=g,h=g.version,p=t.toneMapping),d.layers.enableAll(),m.unshift(d,d.geometry,d.material,0,0,null)):g&&g.isTexture&&(c===void 0&&(c=new Xe(new Ms(2,2),new Rr({name:"BackgroundMaterial",uniforms:Ds($n.background.uniforms),vertexShader:$n.background.vertexShader,fragmentShader:$n.background.fragmentShader,side:Ji,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=g,c.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,c.material.toneMapped=st.getTransfer(g.colorSpace)!==ut,g.matrixAutoUpdate===!0&&g.updateMatrix(),c.material.uniforms.uvTransform.value.copy(g.matrix),(f!==g||h!==g.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,f=g,h=g.version,p=t.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function y(m,u){m.getRGB(Da,uv(t)),i.buffers.color.setClear(Da.r,Da.g,Da.b,u,o)}return{getClearColor:function(){return a},setClearColor:function(m,u=1){a.set(m),l=u,y(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,y(a,l)},render:_}}function zw(t,e,n,i){const r=t.getParameter(t.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},l=m(null);let c=l,d=!1;function f(I,z,k,J,O){let H=!1;if(o){const j=y(J,k,z);c!==j&&(c=j,p(c.object)),H=u(I,J,k,O),H&&v(I,J,k,O)}else{const j=z.wireframe===!0;(c.geometry!==J.id||c.program!==k.id||c.wireframe!==j)&&(c.geometry=J.id,c.program=k.id,c.wireframe=j,H=!0)}O!==null&&n.update(O,t.ELEMENT_ARRAY_BUFFER),(H||d)&&(d=!1,L(I,z,k,J),O!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,n.get(O).buffer))}function h(){return i.isWebGL2?t.createVertexArray():s.createVertexArrayOES()}function p(I){return i.isWebGL2?t.bindVertexArray(I):s.bindVertexArrayOES(I)}function _(I){return i.isWebGL2?t.deleteVertexArray(I):s.deleteVertexArrayOES(I)}function y(I,z,k){const J=k.wireframe===!0;let O=a[I.id];O===void 0&&(O={},a[I.id]=O);let H=O[z.id];H===void 0&&(H={},O[z.id]=H);let j=H[J];return j===void 0&&(j=m(h()),H[J]=j),j}function m(I){const z=[],k=[],J=[];for(let O=0;O<r;O++)z[O]=0,k[O]=0,J[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:k,attributeDivisors:J,object:I,attributes:{},index:null}}function u(I,z,k,J){const O=c.attributes,H=z.attributes;let j=0;const te=k.getAttributes();for(const ie in te)if(te[ie].location>=0){const X=O[ie];let le=H[ie];if(le===void 0&&(ie==="instanceMatrix"&&I.instanceMatrix&&(le=I.instanceMatrix),ie==="instanceColor"&&I.instanceColor&&(le=I.instanceColor)),X===void 0||X.attribute!==le||le&&X.data!==le.data)return!0;j++}return c.attributesNum!==j||c.index!==J}function v(I,z,k,J){const O={},H=z.attributes;let j=0;const te=k.getAttributes();for(const ie in te)if(te[ie].location>=0){let X=H[ie];X===void 0&&(ie==="instanceMatrix"&&I.instanceMatrix&&(X=I.instanceMatrix),ie==="instanceColor"&&I.instanceColor&&(X=I.instanceColor));const le={};le.attribute=X,X&&X.data&&(le.data=X.data),O[ie]=le,j++}c.attributes=O,c.attributesNum=j,c.index=J}function g(){const I=c.newAttributes;for(let z=0,k=I.length;z<k;z++)I[z]=0}function M(I){P(I,0)}function P(I,z){const k=c.newAttributes,J=c.enabledAttributes,O=c.attributeDivisors;k[I]=1,J[I]===0&&(t.enableVertexAttribArray(I),J[I]=1),O[I]!==z&&((i.isWebGL2?t:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,z),O[I]=z)}function T(){const I=c.newAttributes,z=c.enabledAttributes;for(let k=0,J=z.length;k<J;k++)z[k]!==I[k]&&(t.disableVertexAttribArray(k),z[k]=0)}function S(I,z,k,J,O,H,j){j===!0?t.vertexAttribIPointer(I,z,k,O,H):t.vertexAttribPointer(I,z,k,J,O,H)}function L(I,z,k,J){if(i.isWebGL2===!1&&(I.isInstancedMesh||J.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;g();const O=J.attributes,H=k.getAttributes(),j=z.defaultAttributeValues;for(const te in H){const ie=H[te];if(ie.location>=0){let Y=O[te];if(Y===void 0&&(te==="instanceMatrix"&&I.instanceMatrix&&(Y=I.instanceMatrix),te==="instanceColor"&&I.instanceColor&&(Y=I.instanceColor)),Y!==void 0){const X=Y.normalized,le=Y.itemSize,me=n.get(Y);if(me===void 0)continue;const he=me.buffer,be=me.type,Pe=me.bytesPerElement,Le=i.isWebGL2===!0&&(be===t.INT||be===t.UNSIGNED_INT||Y.gpuType===Y0);if(Y.isInterleavedBufferAttribute){const Ge=Y.data,W=Ge.stride,lt=Y.offset;if(Ge.isInstancedInterleavedBuffer){for(let Ce=0;Ce<ie.locationSize;Ce++)P(ie.location+Ce,Ge.meshPerAttribute);I.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=Ge.meshPerAttribute*Ge.count)}else for(let Ce=0;Ce<ie.locationSize;Ce++)M(ie.location+Ce);t.bindBuffer(t.ARRAY_BUFFER,he);for(let Ce=0;Ce<ie.locationSize;Ce++)S(ie.location+Ce,le/ie.locationSize,be,X,W*Pe,(lt+le/ie.locationSize*Ce)*Pe,Le)}else{if(Y.isInstancedBufferAttribute){for(let Ge=0;Ge<ie.locationSize;Ge++)P(ie.location+Ge,Y.meshPerAttribute);I.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let Ge=0;Ge<ie.locationSize;Ge++)M(ie.location+Ge);t.bindBuffer(t.ARRAY_BUFFER,he);for(let Ge=0;Ge<ie.locationSize;Ge++)S(ie.location+Ge,le/ie.locationSize,be,X,le*Pe,le/ie.locationSize*Ge*Pe,Le)}}else if(j!==void 0){const X=j[te];if(X!==void 0)switch(X.length){case 2:t.vertexAttrib2fv(ie.location,X);break;case 3:t.vertexAttrib3fv(ie.location,X);break;case 4:t.vertexAttrib4fv(ie.location,X);break;default:t.vertexAttrib1fv(ie.location,X)}}}}T()}function E(){D();for(const I in a){const z=a[I];for(const k in z){const J=z[k];for(const O in J)_(J[O].object),delete J[O];delete z[k]}delete a[I]}}function A(I){if(a[I.id]===void 0)return;const z=a[I.id];for(const k in z){const J=z[k];for(const O in J)_(J[O].object),delete J[O];delete z[k]}delete a[I.id]}function B(I){for(const z in a){const k=a[z];if(k[I.id]===void 0)continue;const J=k[I.id];for(const O in J)_(J[O].object),delete J[O];delete k[I.id]}}function D(){ee(),d=!0,c!==l&&(c=l,p(c.object))}function ee(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:D,resetDefaultState:ee,dispose:E,releaseStatesOfGeometry:A,releaseStatesOfProgram:B,initAttributes:g,enableAttribute:M,disableUnusedAttributes:T}}function Bw(t,e,n,i){const r=i.isWebGL2;let s;function o(d){s=d}function a(d,f){t.drawArrays(s,d,f),n.update(f,s,1)}function l(d,f,h){if(h===0)return;let p,_;if(r)p=t,_="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[_](s,d,f,h),n.update(f,s,h)}function c(d,f,h){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<h;_++)this.render(d[_],f[_]);else{p.multiDrawArraysWEBGL(s,d,0,f,0,h);let _=0;for(let y=0;y<h;y++)_+=f[y];n.update(_,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function Hw(t,e,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const S=e.get("EXT_texture_filter_anisotropic");i=t.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(S){if(S==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&t.constructor.name==="WebGL2RenderingContext";let a=n.precision!==void 0?n.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),d=n.logarithmicDepthBuffer===!0,f=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),h=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=t.getParameter(t.MAX_TEXTURE_SIZE),_=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),y=t.getParameter(t.MAX_VERTEX_ATTRIBS),m=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),u=t.getParameter(t.MAX_VARYING_VECTORS),v=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),g=h>0,M=o||e.has("OES_texture_float"),P=g&&M,T=o?t.getParameter(t.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:d,maxTextures:f,maxVertexTextures:h,maxTextureSize:p,maxCubemapSize:_,maxAttributes:y,maxVertexUniforms:m,maxVaryings:u,maxFragmentUniforms:v,vertexTextures:g,floatFragmentTextures:M,floatVertexTextures:P,maxSamples:T}}function Gw(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new Ni,a=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const p=f.length!==0||h||i!==0||r;return r=h,i=f.length,p},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){n=d(f,h,0)},this.setState=function(f,h,p){const _=f.clippingPlanes,y=f.clipIntersection,m=f.clipShadows,u=t.get(f);if(!r||_===null||_.length===0||s&&!m)s?d(null):c();else{const v=s?0:i,g=v*4;let M=u.clippingState||null;l.value=M,M=d(_,h,g,p);for(let P=0;P!==g;++P)M[P]=n[P];u.clippingState=M,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(f,h,p,_){const y=f!==null?f.length:0;let m=null;if(y!==0){if(m=l.value,_!==!0||m===null){const u=p+y*4,v=h.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<u)&&(m=new Float32Array(u));for(let g=0,M=p;g!==y;++g,M+=4)o.copy(f[g]).applyMatrix4(v,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function Vw(t){let e=new WeakMap;function n(o,a){return a===ad?o.mapping=Ps:a===ld&&(o.mapping=Ls),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===ad||a===ld)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new tM(l.height/2);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",r),n(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class pv extends dv{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=d*this.view.offsetY,l=a-d*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const ds=4,Gp=[.125,.215,.35,.446,.526,.582],hr=20,Jc=new pv,Vp=new qe;let Qc=null,eu=0,tu=0;const dr=(1+Math.sqrt(5))/2,Zr=1/dr,jp=[new N(1,1,1),new N(-1,1,1),new N(1,1,-1),new N(-1,1,-1),new N(0,dr,Zr),new N(0,dr,-Zr),new N(Zr,0,dr),new N(-Zr,0,dr),new N(dr,Zr,0),new N(-dr,Zr,0)];class Wp{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){Qc=this._renderer.getRenderTarget(),eu=this._renderer.getActiveCubeFace(),tu=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Qc,eu,tu),e.scissorTest=!1,Ia(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Ps||e.mapping===Ls?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Qc=this._renderer.getRenderTarget(),eu=this._renderer.getActiveCubeFace(),tu=this._renderer.getActiveMipmapLevel();const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:bn,minFilter:bn,generateMipmaps:!1,type:ko,format:Gn,colorSpace:Mi,depthBuffer:!1},r=Xp(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xp(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=jw(s)),this._blurMaterial=Ww(s,e,n)}return r}_compileMaterial(e){const n=new Xe(this._lodPlanes[0],e);this._renderer.compile(n,Jc)}_sceneToCubeUV(e,n,i,r){const a=new an(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(Vp),d.toneMapping=qi,d.autoClear=!1;const p=new Cl({name:"PMREM.Background",side:fn,depthWrite:!1,depthTest:!1}),_=new Xe(new Qi,p);let y=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,y=!0):(p.color.copy(Vp),y=!0);for(let u=0;u<6;u++){const v=u%3;v===0?(a.up.set(0,l[u],0),a.lookAt(c[u],0,0)):v===1?(a.up.set(0,0,l[u]),a.lookAt(0,c[u],0)):(a.up.set(0,l[u],0),a.lookAt(0,0,c[u]));const g=this._cubeSize;Ia(r,v*g,u>2?g:0,g,g),d.setRenderTarget(r),y&&d.render(_,a),d.render(e,a)}_.geometry.dispose(),_.material.dispose(),d.toneMapping=h,d.autoClear=f,e.background=m}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Ps||e.mapping===Ls;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=qp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yp());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Xe(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Ia(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,Jc)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=jp[(r-1)%jp.length];this._blur(e,r-1,r,s,o)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,f=new Xe(this._lodPlanes[r],c),h=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*hr-1),y=s/_,m=isFinite(s)?1+Math.floor(d*y):hr;m>hr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${hr}`);const u=[];let v=0;for(let S=0;S<hr;++S){const L=S/y,E=Math.exp(-L*L/2);u.push(E),S===0?v+=E:S<m&&(v+=2*E)}for(let S=0;S<u.length;S++)u[S]=u[S]/v;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=u,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:g}=this;h.dTheta.value=_,h.mipInt.value=g-i;const M=this._sizeLods[r],P=3*M*(r>g-ds?r-g+ds:0),T=4*(this._cubeSize-M);Ia(n,P,T,3*M,2*M),l.setRenderTarget(n),l.render(f,Jc)}}function jw(t){const e=[],n=[],i=[];let r=t;const s=t-ds+1+Gp.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-ds?l=Gp[o-t+ds-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),d=-c,f=1+c,h=[d,d,f,d,f,f,d,d,f,f,d,f],p=6,_=6,y=3,m=2,u=1,v=new Float32Array(y*_*p),g=new Float32Array(m*_*p),M=new Float32Array(u*_*p);for(let T=0;T<p;T++){const S=T%3*2/3-1,L=T>2?0:-1,E=[S,L,0,S+2/3,L,0,S+2/3,L+1,0,S,L,0,S+2/3,L+1,0,S,L+1,0];v.set(E,y*_*T),g.set(h,m*_*T);const A=[T,T,T,T,T,T];M.set(A,u*_*T)}const P=new $t;P.setAttribute("position",new ti(v,y)),P.setAttribute("uv",new ti(g,m)),P.setAttribute("faceIndex",new ti(M,u)),e.push(P),r>ds&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function Xp(t,e,n){const i=new br(t,e,n);return i.texture.mapping=Wl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ia(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function Ww(t,e,n){const i=new Float32Array(hr),r=new N(0,1,0);return new Rr({name:"SphericalGaussianBlur",defines:{n:hr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:xf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function Yp(){return new Rr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function qp(){return new Rr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function xf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Xw(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===ad||l===ld,d=l===Ps||l===Ls;if(c||d)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let f=e.get(a);return n===null&&(n=new Wp(t)),f=c?n.fromEquirectangular(a,f):n.fromCubemap(a,f),e.set(a,f),f.texture}else{if(e.has(a))return e.get(a).texture;{const f=a.image;if(c&&f&&f.height>0||d&&f&&r(f)){n===null&&(n=new Wp(t));const h=c?n.fromEquirectangular(a):n.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",s),h.texture}else return null}}}return a}function r(a){let l=0;const c=6;for(let d=0;d<c;d++)a[d]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function Yw(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(i){i.isWebGL2?(n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance")):(n("WEBGL_depth_texture"),n("OES_texture_float"),n("OES_texture_half_float"),n("OES_texture_half_float_linear"),n("OES_standard_derivatives"),n("OES_element_index_uint"),n("OES_vertex_array_object"),n("ANGLE_instanced_arrays")),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture")},get:function(i){const r=n(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function qw(t,e,n,i){const r={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);for(const _ in h.morphAttributes){const y=h.morphAttributes[_];for(let m=0,u=y.length;m<u;m++)e.remove(y[m])}h.removeEventListener("dispose",o),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,n.memory.geometries++),h}function l(f){const h=f.attributes;for(const _ in h)e.update(h[_],t.ARRAY_BUFFER);const p=f.morphAttributes;for(const _ in p){const y=p[_];for(let m=0,u=y.length;m<u;m++)e.update(y[m],t.ARRAY_BUFFER)}}function c(f){const h=[],p=f.index,_=f.attributes.position;let y=0;if(p!==null){const v=p.array;y=p.version;for(let g=0,M=v.length;g<M;g+=3){const P=v[g+0],T=v[g+1],S=v[g+2];h.push(P,T,T,S,S,P)}}else if(_!==void 0){const v=_.array;y=_.version;for(let g=0,M=v.length/3-1;g<M;g+=3){const P=g+0,T=g+1,S=g+2;h.push(P,T,T,S,S,P)}}else return;const m=new(iv(h)?cv:lv)(h,1);m.version=y;const u=s.get(f);u&&e.remove(u),s.set(f,m)}function d(f){const h=s.get(f);if(h){const p=f.index;p!==null&&h.version<p.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:d}}function $w(t,e,n,i){const r=i.isWebGL2;let s;function o(p){s=p}let a,l;function c(p){a=p.type,l=p.bytesPerElement}function d(p,_){t.drawElements(s,_,a,p*l),n.update(_,s,1)}function f(p,_,y){if(y===0)return;let m,u;if(r)m=t,u="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),u="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[u](s,_,a,p*l,y),n.update(_,s,y)}function h(p,_,y){if(y===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<y;u++)this.render(p[u]/l,_[u]);else{m.multiDrawElementsWEBGL(s,_,0,a,p,0,y);let u=0;for(let v=0;v<y;v++)u+=_[v];n.update(u,s,1)}}this.setMode=o,this.setIndex=c,this.render=d,this.renderInstances=f,this.renderMultiDraw=h}function Kw(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function Zw(t,e){return t[0]-e[0]}function Jw(t,e){return Math.abs(e[1])-Math.abs(t[1])}function Qw(t,e,n){const i={},r=new Float32Array(8),s=new WeakMap,o=new ht,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,d,f){const h=c.morphTargetInfluences;if(e.isWebGL2===!0){const _=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,y=_!==void 0?_.length:0;let m=s.get(d);if(m===void 0||m.count!==y){let z=function(){ee.dispose(),s.delete(d),d.removeEventListener("dispose",z)};var p=z;m!==void 0&&m.texture.dispose();const g=d.morphAttributes.position!==void 0,M=d.morphAttributes.normal!==void 0,P=d.morphAttributes.color!==void 0,T=d.morphAttributes.position||[],S=d.morphAttributes.normal||[],L=d.morphAttributes.color||[];let E=0;g===!0&&(E=1),M===!0&&(E=2),P===!0&&(E=3);let A=d.attributes.position.count*E,B=1;A>e.maxTextureSize&&(B=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const D=new Float32Array(A*B*4*y),ee=new ov(D,A,B,y);ee.type=ki,ee.needsUpdate=!0;const I=E*4;for(let k=0;k<y;k++){const J=T[k],O=S[k],H=L[k],j=A*B*4*k;for(let te=0;te<J.count;te++){const ie=te*I;g===!0&&(o.fromBufferAttribute(J,te),D[j+ie+0]=o.x,D[j+ie+1]=o.y,D[j+ie+2]=o.z,D[j+ie+3]=0),M===!0&&(o.fromBufferAttribute(O,te),D[j+ie+4]=o.x,D[j+ie+5]=o.y,D[j+ie+6]=o.z,D[j+ie+7]=0),P===!0&&(o.fromBufferAttribute(H,te),D[j+ie+8]=o.x,D[j+ie+9]=o.y,D[j+ie+10]=o.z,D[j+ie+11]=H.itemSize===4?o.w:1)}}m={count:y,texture:ee,size:new ye(A,B)},s.set(d,m),d.addEventListener("dispose",z)}let u=0;for(let g=0;g<h.length;g++)u+=h[g];const v=d.morphTargetsRelative?1:1-u;f.getUniforms().setValue(t,"morphTargetBaseInfluence",v),f.getUniforms().setValue(t,"morphTargetInfluences",h),f.getUniforms().setValue(t,"morphTargetsTexture",m.texture,n),f.getUniforms().setValue(t,"morphTargetsTextureSize",m.size)}else{const _=h===void 0?0:h.length;let y=i[d.id];if(y===void 0||y.length!==_){y=[];for(let M=0;M<_;M++)y[M]=[M,0];i[d.id]=y}for(let M=0;M<_;M++){const P=y[M];P[0]=M,P[1]=h[M]}y.sort(Jw);for(let M=0;M<8;M++)M<_&&y[M][1]?(a[M][0]=y[M][0],a[M][1]=y[M][1]):(a[M][0]=Number.MAX_SAFE_INTEGER,a[M][1]=0);a.sort(Zw);const m=d.morphAttributes.position,u=d.morphAttributes.normal;let v=0;for(let M=0;M<8;M++){const P=a[M],T=P[0],S=P[1];T!==Number.MAX_SAFE_INTEGER&&S?(m&&d.getAttribute("morphTarget"+M)!==m[T]&&d.setAttribute("morphTarget"+M,m[T]),u&&d.getAttribute("morphNormal"+M)!==u[T]&&d.setAttribute("morphNormal"+M,u[T]),r[M]=S,v+=S):(m&&d.hasAttribute("morphTarget"+M)===!0&&d.deleteAttribute("morphTarget"+M),u&&d.hasAttribute("morphNormal"+M)===!0&&d.deleteAttribute("morphNormal"+M),r[M]=0)}const g=d.morphTargetsRelative?1:1-v;f.getUniforms().setValue(t,"morphTargetBaseInfluence",g),f.getUniforms().setValue(t,"morphTargetInfluences",r)}}return{update:l}}function eT(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,d=l.geometry,f=e.get(l,d);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return f}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:o}}class mv extends tn{constructor(e,n,i,r,s,o,a,l,c,d){if(d=d!==void 0?d:yr,d!==yr&&d!==Ns)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===yr&&(i=Fi),i===void 0&&d===Ns&&(i=_r),super(null,r,s,o,a,l,d,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:Qt,this.minFilter=l!==void 0?l:Qt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const gv=new tn,vv=new mv(1,1);vv.compareFunction=nv;const xv=new ov,_v=new kS,yv=new fv,$p=[],Kp=[],Zp=new Float32Array(16),Jp=new Float32Array(9),Qp=new Float32Array(4);function zs(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=$p[r];if(s===void 0&&(s=new Float32Array(r),$p[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Nt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Dt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Kl(t,e){let n=Kp[e];n===void 0&&(n=new Int32Array(e),Kp[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function tT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function nT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Nt(n,e))return;t.uniform2fv(this.addr,e),Dt(n,e)}}function iT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Nt(n,e))return;t.uniform3fv(this.addr,e),Dt(n,e)}}function rT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Nt(n,e))return;t.uniform4fv(this.addr,e),Dt(n,e)}}function sT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Nt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Dt(n,e)}else{if(Nt(n,i))return;Qp.set(i),t.uniformMatrix2fv(this.addr,!1,Qp),Dt(n,i)}}function oT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Nt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Dt(n,e)}else{if(Nt(n,i))return;Jp.set(i),t.uniformMatrix3fv(this.addr,!1,Jp),Dt(n,i)}}function aT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Nt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Dt(n,e)}else{if(Nt(n,i))return;Zp.set(i),t.uniformMatrix4fv(this.addr,!1,Zp),Dt(n,i)}}function lT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function cT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Nt(n,e))return;t.uniform2iv(this.addr,e),Dt(n,e)}}function uT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Nt(n,e))return;t.uniform3iv(this.addr,e),Dt(n,e)}}function dT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Nt(n,e))return;t.uniform4iv(this.addr,e),Dt(n,e)}}function fT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function hT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Nt(n,e))return;t.uniform2uiv(this.addr,e),Dt(n,e)}}function pT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Nt(n,e))return;t.uniform3uiv(this.addr,e),Dt(n,e)}}function mT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Nt(n,e))return;t.uniform4uiv(this.addr,e),Dt(n,e)}}function gT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);const s=this.type===t.SAMPLER_2D_SHADOW?vv:gv;n.setTexture2D(e||s,r)}function vT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||_v,r)}function xT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||yv,r)}function _T(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||xv,r)}function yT(t){switch(t){case 5126:return tT;case 35664:return nT;case 35665:return iT;case 35666:return rT;case 35674:return sT;case 35675:return oT;case 35676:return aT;case 5124:case 35670:return lT;case 35667:case 35671:return cT;case 35668:case 35672:return uT;case 35669:case 35673:return dT;case 5125:return fT;case 36294:return hT;case 36295:return pT;case 36296:return mT;case 35678:case 36198:case 36298:case 36306:case 35682:return gT;case 35679:case 36299:case 36307:return vT;case 35680:case 36300:case 36308:case 36293:return xT;case 36289:case 36303:case 36311:case 36292:return _T}}function ST(t,e){t.uniform1fv(this.addr,e)}function MT(t,e){const n=zs(e,this.size,2);t.uniform2fv(this.addr,n)}function ET(t,e){const n=zs(e,this.size,3);t.uniform3fv(this.addr,n)}function wT(t,e){const n=zs(e,this.size,4);t.uniform4fv(this.addr,n)}function TT(t,e){const n=zs(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function AT(t,e){const n=zs(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function bT(t,e){const n=zs(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function CT(t,e){t.uniform1iv(this.addr,e)}function RT(t,e){t.uniform2iv(this.addr,e)}function PT(t,e){t.uniform3iv(this.addr,e)}function LT(t,e){t.uniform4iv(this.addr,e)}function NT(t,e){t.uniform1uiv(this.addr,e)}function DT(t,e){t.uniform2uiv(this.addr,e)}function IT(t,e){t.uniform3uiv(this.addr,e)}function UT(t,e){t.uniform4uiv(this.addr,e)}function OT(t,e,n){const i=this.cache,r=e.length,s=Kl(n,r);Nt(i,s)||(t.uniform1iv(this.addr,s),Dt(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||gv,s[o])}function FT(t,e,n){const i=this.cache,r=e.length,s=Kl(n,r);Nt(i,s)||(t.uniform1iv(this.addr,s),Dt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||_v,s[o])}function kT(t,e,n){const i=this.cache,r=e.length,s=Kl(n,r);Nt(i,s)||(t.uniform1iv(this.addr,s),Dt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||yv,s[o])}function zT(t,e,n){const i=this.cache,r=e.length,s=Kl(n,r);Nt(i,s)||(t.uniform1iv(this.addr,s),Dt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||xv,s[o])}function BT(t){switch(t){case 5126:return ST;case 35664:return MT;case 35665:return ET;case 35666:return wT;case 35674:return TT;case 35675:return AT;case 35676:return bT;case 5124:case 35670:return CT;case 35667:case 35671:return RT;case 35668:case 35672:return PT;case 35669:case 35673:return LT;case 5125:return NT;case 36294:return DT;case 36295:return IT;case 36296:return UT;case 35678:case 36198:case 36298:case 36306:case 35682:return OT;case 35679:case 36299:case 36307:return FT;case 35680:case 36300:case 36308:case 36293:return kT;case 36289:case 36303:case 36311:case 36292:return zT}}class HT{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=yT(n.type)}}class GT{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=BT(n.type)}}class VT{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const nu=/(\w+)(\])?(\[|\.)?/g;function em(t,e){t.seq.push(e),t.map[e.id]=e}function jT(t,e,n){const i=t.name,r=i.length;for(nu.lastIndex=0;;){const s=nu.exec(i),o=nu.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){em(n,c===void 0?new HT(a,t,e):new GT(a,t,e));break}else{let f=n.map[a];f===void 0&&(f=new VT(a),em(n,f)),n=f}}}class Ka{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);jT(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function tm(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const WT=37297;let XT=0;function YT(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}function qT(t){const e=st.getPrimaries(st.workingColorSpace),n=st.getPrimaries(t);let i;switch(e===n?i="":e===Tl&&n===wl?i="LinearDisplayP3ToLinearSRGB":e===wl&&n===Tl&&(i="LinearSRGBToLinearDisplayP3"),t){case Mi:case Xl:return[i,"LinearTransferOETF"];case St:case pf:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function nm(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+YT(t.getShaderSource(e),o)}else return r}function $T(t,e){const n=qT(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function KT(t,e){let n;switch(e){case $1:n="Linear";break;case K1:n="Reinhard";break;case Z1:n="OptimizedCineon";break;case ff:n="ACESFilmic";break;case Q1:n="AgX";break;case J1:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function ZT(t){return[t.extensionDerivatives||t.envMapCubeUVHeight||t.bumpMap||t.normalMapTangentSpace||t.clearcoatNormalMap||t.flatShading||t.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(t.extensionFragDepth||t.logarithmicDepthBuffer)&&t.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",t.extensionDrawBuffers&&t.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(t.extensionShaderTextureLOD||t.envMap||t.transmission)&&t.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(fs).join(`
`)}function JT(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(fs).join(`
`)}function QT(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function e2(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function fs(t){return t!==""}function im(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function rm(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const t2=/^[ \t]*#include +<([\w\d./]+)>/gm;function hd(t){return t.replace(t2,i2)}const n2=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function i2(t,e){let n=We[e];if(n===void 0){const i=n2.get(e);if(i!==void 0)n=We[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return hd(n)}const r2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function sm(t){return t.replace(r2,s2)}function s2(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function om(t){let e="precision "+t.precision+` float;
precision `+t.precision+" int;";return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function o2(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===V0?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===j0?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===ci&&(e="SHADOWMAP_TYPE_VSM"),e}function a2(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Ps:case Ls:e="ENVMAP_TYPE_CUBE";break;case Wl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function l2(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case Ls:e="ENVMAP_MODE_REFRACTION";break}return e}function c2(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case W0:e="ENVMAP_BLENDING_MULTIPLY";break;case Y1:e="ENVMAP_BLENDING_MIX";break;case q1:e="ENVMAP_BLENDING_ADD";break}return e}function u2(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function d2(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=o2(n),c=a2(n),d=l2(n),f=c2(n),h=u2(n),p=n.isWebGL2?"":ZT(n),_=JT(n),y=QT(s),m=r.createProgram();let u,v,g=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y].filter(fs).join(`
`),u.length>0&&(u+=`
`),v=[p,"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y].filter(fs).join(`
`),v.length>0&&(v+=`
`)):(u=[om(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors&&n.isWebGL2?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fs).join(`
`),v=[p,om(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==qi?"#define TONE_MAPPING":"",n.toneMapping!==qi?We.tonemapping_pars_fragment:"",n.toneMapping!==qi?KT("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,$T("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(fs).join(`
`)),o=hd(o),o=im(o,n),o=rm(o,n),a=hd(a),a=im(a,n),a=rm(a,n),o=sm(o),a=sm(a),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,u=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,v=["precision mediump sampler2DArray;","#define varying in",n.glslVersion===wp?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===wp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const M=g+u+o,P=g+v+a,T=tm(r,r.VERTEX_SHADER,M),S=tm(r,r.FRAGMENT_SHADER,P);r.attachShader(m,T),r.attachShader(m,S),n.index0AttributeName!==void 0?r.bindAttribLocation(m,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function L(D){if(t.debug.checkShaderErrors){const ee=r.getProgramInfoLog(m).trim(),I=r.getShaderInfoLog(T).trim(),z=r.getShaderInfoLog(S).trim();let k=!0,J=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(k=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,m,T,S);else{const O=nm(r,T,"vertex"),H=nm(r,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+ee+`
`+O+`
`+H)}else ee!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ee):(I===""||z==="")&&(J=!1);J&&(D.diagnostics={runnable:k,programLog:ee,vertexShader:{log:I,prefix:u},fragmentShader:{log:z,prefix:v}})}r.deleteShader(T),r.deleteShader(S),E=new Ka(r,m),A=e2(r,m)}let E;this.getUniforms=function(){return E===void 0&&L(this),E};let A;this.getAttributes=function(){return A===void 0&&L(this),A};let B=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=r.getProgramParameter(m,WT)),B},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=XT++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=T,this.fragmentShader=S,this}let f2=0;class h2{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new p2(e),n.set(e,i)),i}}class p2{constructor(e){this.id=f2++,this.code=e,this.usedTimes=0}}function m2(t,e,n,i,r,s,o){const a=new gf,l=new h2,c=[],d=r.isWebGL2,f=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(E){return E===0?"uv":`uv${E}`}function m(E,A,B,D,ee){const I=D.fog,z=ee.geometry,k=E.isMeshStandardMaterial?D.environment:null,J=(E.isMeshStandardMaterial?n:e).get(E.envMap||k),O=J&&J.mapping===Wl?J.image.height:null,H=_[E.type];E.precision!==null&&(p=r.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const j=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,te=j!==void 0?j.length:0;let ie=0;z.morphAttributes.position!==void 0&&(ie=1),z.morphAttributes.normal!==void 0&&(ie=2),z.morphAttributes.color!==void 0&&(ie=3);let Y,X,le,me;if(H){const Et=$n[H];Y=Et.vertexShader,X=Et.fragmentShader}else Y=E.vertexShader,X=E.fragmentShader,l.update(E),le=l.getVertexShaderID(E),me=l.getFragmentShaderID(E);const he=t.getRenderTarget(),be=ee.isInstancedMesh===!0,Pe=ee.isBatchedMesh===!0,Le=!!E.map,Ge=!!E.matcap,W=!!J,lt=!!E.aoMap,Ce=!!E.lightMap,ue=!!E.bumpMap,ve=!!E.normalMap,ke=!!E.displacementMap,Ie=!!E.emissiveMap,b=!!E.metalnessMap,w=!!E.roughnessMap,V=E.anisotropy>0,re=E.clearcoat>0,se=E.iridescence>0,oe=E.sheen>0,Re=E.transmission>0,Se=V&&!!E.anisotropyMap,we=re&&!!E.clearcoatMap,F=re&&!!E.clearcoatNormalMap,ne=re&&!!E.clearcoatRoughnessMap,Z=se&&!!E.iridescenceMap,Fe=se&&!!E.iridescenceThicknessMap,De=oe&&!!E.sheenColorMap,$=oe&&!!E.sheenRoughnessMap,ge=!!E.specularMap,de=!!E.specularColorMap,R=!!E.specularIntensityMap,ae=Re&&!!E.transmissionMap,Ne=Re&&!!E.thicknessMap,_e=!!E.gradientMap,ce=!!E.alphaMap,U=E.alphaTest>0,pe=!!E.alphaHash,Me=!!E.extensions,ze=!!z.attributes.uv1,Oe=!!z.attributes.uv2,Je=!!z.attributes.uv3;let Qe=qi;return E.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(Qe=t.toneMapping),{isWebGL2:d,shaderID:H,shaderType:E.type,shaderName:E.name,vertexShader:Y,fragmentShader:X,defines:E.defines,customVertexShaderID:le,customFragmentShaderID:me,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:Pe,instancing:be,instancingColor:be&&ee.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:he===null?t.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:Mi,map:Le,matcap:Ge,envMap:W,envMapMode:W&&J.mapping,envMapCubeUVHeight:O,aoMap:lt,lightMap:Ce,bumpMap:ue,normalMap:ve,displacementMap:h&&ke,emissiveMap:Ie,normalMapObjectSpace:ve&&E.normalMapType===dS,normalMapTangentSpace:ve&&E.normalMapType===tv,metalnessMap:b,roughnessMap:w,anisotropy:V,anisotropyMap:Se,clearcoat:re,clearcoatMap:we,clearcoatNormalMap:F,clearcoatRoughnessMap:ne,iridescence:se,iridescenceMap:Z,iridescenceThicknessMap:Fe,sheen:oe,sheenColorMap:De,sheenRoughnessMap:$,specularMap:ge,specularColorMap:de,specularIntensityMap:R,transmission:Re,transmissionMap:ae,thicknessMap:Ne,gradientMap:_e,opaque:E.transparent===!1&&E.blending===ys,alphaMap:ce,alphaTest:U,alphaHash:pe,combine:E.combine,mapUv:Le&&y(E.map.channel),aoMapUv:lt&&y(E.aoMap.channel),lightMapUv:Ce&&y(E.lightMap.channel),bumpMapUv:ue&&y(E.bumpMap.channel),normalMapUv:ve&&y(E.normalMap.channel),displacementMapUv:ke&&y(E.displacementMap.channel),emissiveMapUv:Ie&&y(E.emissiveMap.channel),metalnessMapUv:b&&y(E.metalnessMap.channel),roughnessMapUv:w&&y(E.roughnessMap.channel),anisotropyMapUv:Se&&y(E.anisotropyMap.channel),clearcoatMapUv:we&&y(E.clearcoatMap.channel),clearcoatNormalMapUv:F&&y(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ne&&y(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&y(E.iridescenceMap.channel),iridescenceThicknessMapUv:Fe&&y(E.iridescenceThicknessMap.channel),sheenColorMapUv:De&&y(E.sheenColorMap.channel),sheenRoughnessMapUv:$&&y(E.sheenRoughnessMap.channel),specularMapUv:ge&&y(E.specularMap.channel),specularColorMapUv:de&&y(E.specularColorMap.channel),specularIntensityMapUv:R&&y(E.specularIntensityMap.channel),transmissionMapUv:ae&&y(E.transmissionMap.channel),thicknessMapUv:Ne&&y(E.thicknessMap.channel),alphaMapUv:ce&&y(E.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(ve||V),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,vertexUv1s:ze,vertexUv2s:Oe,vertexUv3s:Je,pointsUvs:ee.isPoints===!0&&!!z.attributes.uv&&(Le||ce),fog:!!I,useFog:E.fog===!0,fogExp2:I&&I.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:ee.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:ie,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:t.shadowMap.enabled&&B.length>0,shadowMapType:t.shadowMap.type,toneMapping:Qe,useLegacyLights:t._useLegacyLights,decodeVideoTexture:Le&&E.map.isVideoTexture===!0&&st.getTransfer(E.map.colorSpace)===ut,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Zn,flipSided:E.side===fn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:Me&&E.extensions.derivatives===!0,extensionFragDepth:Me&&E.extensions.fragDepth===!0,extensionDrawBuffers:Me&&E.extensions.drawBuffers===!0,extensionShaderTextureLOD:Me&&E.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Me&&E.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:d||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:d||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:d||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()}}function u(E){const A=[];if(E.shaderID?A.push(E.shaderID):(A.push(E.customVertexShaderID),A.push(E.customFragmentShaderID)),E.defines!==void 0)for(const B in E.defines)A.push(B),A.push(E.defines[B]);return E.isRawShaderMaterial===!1&&(v(A,E),g(A,E),A.push(t.outputColorSpace)),A.push(E.customProgramCacheKey),A.join()}function v(E,A){E.push(A.precision),E.push(A.outputColorSpace),E.push(A.envMapMode),E.push(A.envMapCubeUVHeight),E.push(A.mapUv),E.push(A.alphaMapUv),E.push(A.lightMapUv),E.push(A.aoMapUv),E.push(A.bumpMapUv),E.push(A.normalMapUv),E.push(A.displacementMapUv),E.push(A.emissiveMapUv),E.push(A.metalnessMapUv),E.push(A.roughnessMapUv),E.push(A.anisotropyMapUv),E.push(A.clearcoatMapUv),E.push(A.clearcoatNormalMapUv),E.push(A.clearcoatRoughnessMapUv),E.push(A.iridescenceMapUv),E.push(A.iridescenceThicknessMapUv),E.push(A.sheenColorMapUv),E.push(A.sheenRoughnessMapUv),E.push(A.specularMapUv),E.push(A.specularColorMapUv),E.push(A.specularIntensityMapUv),E.push(A.transmissionMapUv),E.push(A.thicknessMapUv),E.push(A.combine),E.push(A.fogExp2),E.push(A.sizeAttenuation),E.push(A.morphTargetsCount),E.push(A.morphAttributeCount),E.push(A.numDirLights),E.push(A.numPointLights),E.push(A.numSpotLights),E.push(A.numSpotLightMaps),E.push(A.numHemiLights),E.push(A.numRectAreaLights),E.push(A.numDirLightShadows),E.push(A.numPointLightShadows),E.push(A.numSpotLightShadows),E.push(A.numSpotLightShadowsWithMaps),E.push(A.numLightProbes),E.push(A.shadowMapType),E.push(A.toneMapping),E.push(A.numClippingPlanes),E.push(A.numClipIntersection),E.push(A.depthPacking)}function g(E,A){a.disableAll(),A.isWebGL2&&a.enable(0),A.supportsVertexTextures&&a.enable(1),A.instancing&&a.enable(2),A.instancingColor&&a.enable(3),A.matcap&&a.enable(4),A.envMap&&a.enable(5),A.normalMapObjectSpace&&a.enable(6),A.normalMapTangentSpace&&a.enable(7),A.clearcoat&&a.enable(8),A.iridescence&&a.enable(9),A.alphaTest&&a.enable(10),A.vertexColors&&a.enable(11),A.vertexAlphas&&a.enable(12),A.vertexUv1s&&a.enable(13),A.vertexUv2s&&a.enable(14),A.vertexUv3s&&a.enable(15),A.vertexTangents&&a.enable(16),A.anisotropy&&a.enable(17),A.alphaHash&&a.enable(18),A.batching&&a.enable(19),E.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.skinning&&a.enable(4),A.morphTargets&&a.enable(5),A.morphNormals&&a.enable(6),A.morphColors&&a.enable(7),A.premultipliedAlpha&&a.enable(8),A.shadowMapEnabled&&a.enable(9),A.useLegacyLights&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),E.push(a.mask)}function M(E){const A=_[E.type];let B;if(A){const D=$n[A];B=ZS.clone(D.uniforms)}else B=E.uniforms;return B}function P(E,A){let B;for(let D=0,ee=c.length;D<ee;D++){const I=c[D];if(I.cacheKey===A){B=I,++B.usedTimes;break}}return B===void 0&&(B=new d2(t,A,E,s),c.push(B)),B}function T(E){if(--E.usedTimes===0){const A=c.indexOf(E);c[A]=c[c.length-1],c.pop(),E.destroy()}}function S(E){l.remove(E)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:M,acquireProgram:P,releaseProgram:T,releaseShaderCache:S,programs:c,dispose:L}}function g2(){let t=new WeakMap;function e(s){let o=t.get(s);return o===void 0&&(o={},t.set(s,o)),o}function n(s){t.delete(s)}function i(s,o,a){t.get(s)[o]=a}function r(){t=new WeakMap}return{get:e,remove:n,update:i,dispose:r}}function v2(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function am(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function lm(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(f,h,p,_,y,m){let u=t[e];return u===void 0?(u={id:f.id,object:f,geometry:h,material:p,groupOrder:_,renderOrder:f.renderOrder,z:y,group:m},t[e]=u):(u.id=f.id,u.object=f,u.geometry=h,u.material=p,u.groupOrder=_,u.renderOrder=f.renderOrder,u.z=y,u.group=m),e++,u}function a(f,h,p,_,y,m){const u=o(f,h,p,_,y,m);p.transmission>0?i.push(u):p.transparent===!0?r.push(u):n.push(u)}function l(f,h,p,_,y,m){const u=o(f,h,p,_,y,m);p.transmission>0?i.unshift(u):p.transparent===!0?r.unshift(u):n.unshift(u)}function c(f,h){n.length>1&&n.sort(f||v2),i.length>1&&i.sort(h||am),r.length>1&&r.sort(h||am)}function d(){for(let f=e,h=t.length;f<h;f++){const p=t[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:d,sort:c}}function x2(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new lm,t.set(i,[o])):r>=s.length?(o=new lm,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function _2(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new N,color:new qe};break;case"SpotLight":n={position:new N,direction:new N,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new N,color:new qe,distance:0,decay:0};break;case"HemisphereLight":n={direction:new N,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":n={color:new qe,position:new N,halfWidth:new N,halfHeight:new N};break}return t[e.id]=n,n}}}function y2(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let S2=0;function M2(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function E2(t,e){const n=new _2,i=y2(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)r.probe.push(new N);const s=new N,o=new Mt,a=new Mt;function l(d,f){let h=0,p=0,_=0;for(let D=0;D<9;D++)r.probe[D].set(0,0,0);let y=0,m=0,u=0,v=0,g=0,M=0,P=0,T=0,S=0,L=0,E=0;d.sort(M2);const A=f===!0?Math.PI:1;for(let D=0,ee=d.length;D<ee;D++){const I=d[D],z=I.color,k=I.intensity,J=I.distance,O=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=z.r*k*A,p+=z.g*k*A,_+=z.b*k*A;else if(I.isLightProbe){for(let H=0;H<9;H++)r.probe[H].addScaledVector(I.sh.coefficients[H],k);E++}else if(I.isDirectionalLight){const H=n.get(I);if(H.color.copy(I.color).multiplyScalar(I.intensity*A),I.castShadow){const j=I.shadow,te=i.get(I);te.shadowBias=j.bias,te.shadowNormalBias=j.normalBias,te.shadowRadius=j.radius,te.shadowMapSize=j.mapSize,r.directionalShadow[y]=te,r.directionalShadowMap[y]=O,r.directionalShadowMatrix[y]=I.shadow.matrix,M++}r.directional[y]=H,y++}else if(I.isSpotLight){const H=n.get(I);H.position.setFromMatrixPosition(I.matrixWorld),H.color.copy(z).multiplyScalar(k*A),H.distance=J,H.coneCos=Math.cos(I.angle),H.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),H.decay=I.decay,r.spot[u]=H;const j=I.shadow;if(I.map&&(r.spotLightMap[S]=I.map,S++,j.updateMatrices(I),I.castShadow&&L++),r.spotLightMatrix[u]=j.matrix,I.castShadow){const te=i.get(I);te.shadowBias=j.bias,te.shadowNormalBias=j.normalBias,te.shadowRadius=j.radius,te.shadowMapSize=j.mapSize,r.spotShadow[u]=te,r.spotShadowMap[u]=O,T++}u++}else if(I.isRectAreaLight){const H=n.get(I);H.color.copy(z).multiplyScalar(k),H.halfWidth.set(I.width*.5,0,0),H.halfHeight.set(0,I.height*.5,0),r.rectArea[v]=H,v++}else if(I.isPointLight){const H=n.get(I);if(H.color.copy(I.color).multiplyScalar(I.intensity*A),H.distance=I.distance,H.decay=I.decay,I.castShadow){const j=I.shadow,te=i.get(I);te.shadowBias=j.bias,te.shadowNormalBias=j.normalBias,te.shadowRadius=j.radius,te.shadowMapSize=j.mapSize,te.shadowCameraNear=j.camera.near,te.shadowCameraFar=j.camera.far,r.pointShadow[m]=te,r.pointShadowMap[m]=O,r.pointShadowMatrix[m]=I.shadow.matrix,P++}r.point[m]=H,m++}else if(I.isHemisphereLight){const H=n.get(I);H.skyColor.copy(I.color).multiplyScalar(k*A),H.groundColor.copy(I.groundColor).multiplyScalar(k*A),r.hemi[g]=H,g++}}v>0&&(e.isWebGL2?t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=xe.LTC_FLOAT_1,r.rectAreaLTC2=xe.LTC_FLOAT_2):(r.rectAreaLTC1=xe.LTC_HALF_1,r.rectAreaLTC2=xe.LTC_HALF_2):t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=xe.LTC_FLOAT_1,r.rectAreaLTC2=xe.LTC_FLOAT_2):t.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=xe.LTC_HALF_1,r.rectAreaLTC2=xe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=h,r.ambient[1]=p,r.ambient[2]=_;const B=r.hash;(B.directionalLength!==y||B.pointLength!==m||B.spotLength!==u||B.rectAreaLength!==v||B.hemiLength!==g||B.numDirectionalShadows!==M||B.numPointShadows!==P||B.numSpotShadows!==T||B.numSpotMaps!==S||B.numLightProbes!==E)&&(r.directional.length=y,r.spot.length=u,r.rectArea.length=v,r.point.length=m,r.hemi.length=g,r.directionalShadow.length=M,r.directionalShadowMap.length=M,r.pointShadow.length=P,r.pointShadowMap.length=P,r.spotShadow.length=T,r.spotShadowMap.length=T,r.directionalShadowMatrix.length=M,r.pointShadowMatrix.length=P,r.spotLightMatrix.length=T+S-L,r.spotLightMap.length=S,r.numSpotLightShadowsWithMaps=L,r.numLightProbes=E,B.directionalLength=y,B.pointLength=m,B.spotLength=u,B.rectAreaLength=v,B.hemiLength=g,B.numDirectionalShadows=M,B.numPointShadows=P,B.numSpotShadows=T,B.numSpotMaps=S,B.numLightProbes=E,r.version=S2++)}function c(d,f){let h=0,p=0,_=0,y=0,m=0;const u=f.matrixWorldInverse;for(let v=0,g=d.length;v<g;v++){const M=d[v];if(M.isDirectionalLight){const P=r.directional[h];P.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(u),h++}else if(M.isSpotLight){const P=r.spot[_];P.position.setFromMatrixPosition(M.matrixWorld),P.position.applyMatrix4(u),P.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(u),_++}else if(M.isRectAreaLight){const P=r.rectArea[y];P.position.setFromMatrixPosition(M.matrixWorld),P.position.applyMatrix4(u),a.identity(),o.copy(M.matrixWorld),o.premultiply(u),a.extractRotation(o),P.halfWidth.set(M.width*.5,0,0),P.halfHeight.set(0,M.height*.5,0),P.halfWidth.applyMatrix4(a),P.halfHeight.applyMatrix4(a),y++}else if(M.isPointLight){const P=r.point[p];P.position.setFromMatrixPosition(M.matrixWorld),P.position.applyMatrix4(u),p++}else if(M.isHemisphereLight){const P=r.hemi[m];P.direction.setFromMatrixPosition(M.matrixWorld),P.direction.transformDirection(u),m++}}}return{setup:l,setupView:c,state:r}}function cm(t,e){const n=new E2(t,e),i=[],r=[];function s(){i.length=0,r.length=0}function o(f){i.push(f)}function a(f){r.push(f)}function l(f){n.setup(i,f)}function c(f){n.setupView(i,f)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:n},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function w2(t,e){let n=new WeakMap;function i(s,o=0){const a=n.get(s);let l;return a===void 0?(l=new cm(t,e),n.set(s,[l])):o>=a.length?(l=new cm(t,e),a.push(l)):l=a[o],l}function r(){n=new WeakMap}return{get:i,dispose:r}}class T2 extends ks{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=cS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class A2 extends ks{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const b2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,C2=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function R2(t,e,n){let i=new vf;const r=new ye,s=new ye,o=new ht,a=new T2({depthPacking:uS}),l=new A2,c={},d=n.maxTextureSize,f={[Ji]:fn,[fn]:Ji,[Zn]:Zn},h=new Rr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ye},radius:{value:4}},vertexShader:b2,fragmentShader:C2}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const _=new $t;_.setAttribute("position",new ti(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Xe(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=V0;let u=this.type;this.render=function(T,S,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const E=t.getRenderTarget(),A=t.getActiveCubeFace(),B=t.getActiveMipmapLevel(),D=t.state;D.setBlending(Yi),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const ee=u!==ci&&this.type===ci,I=u===ci&&this.type!==ci;for(let z=0,k=T.length;z<k;z++){const J=T[z],O=J.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;r.copy(O.mapSize);const H=O.getFrameExtents();if(r.multiply(H),s.copy(O.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/H.x),r.x=s.x*H.x,O.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/H.y),r.y=s.y*H.y,O.mapSize.y=s.y)),O.map===null||ee===!0||I===!0){const te=this.type!==ci?{minFilter:Qt,magFilter:Qt}:{};O.map!==null&&O.map.dispose(),O.map=new br(r.x,r.y,te),O.map.texture.name=J.name+".shadowMap",O.camera.updateProjectionMatrix()}t.setRenderTarget(O.map),t.clear();const j=O.getViewportCount();for(let te=0;te<j;te++){const ie=O.getViewport(te);o.set(s.x*ie.x,s.y*ie.y,s.x*ie.z,s.y*ie.w),D.viewport(o),O.updateMatrices(J,te),i=O.getFrustum(),M(S,L,O.camera,J,this.type)}O.isPointLightShadow!==!0&&this.type===ci&&v(O,L),O.needsUpdate=!1}u=this.type,m.needsUpdate=!1,t.setRenderTarget(E,A,B)};function v(T,S){const L=e.update(y);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new br(r.x,r.y)),h.uniforms.shadow_pass.value=T.map.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,t.setRenderTarget(T.mapPass),t.clear(),t.renderBufferDirect(S,null,L,h,y,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,t.setRenderTarget(T.map),t.clear(),t.renderBufferDirect(S,null,L,p,y,null)}function g(T,S,L,E){let A=null;const B=L.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(B!==void 0)A=B;else if(A=L.isPointLight===!0?l:a,t.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0){const D=A.uuid,ee=S.uuid;let I=c[D];I===void 0&&(I={},c[D]=I);let z=I[ee];z===void 0&&(z=A.clone(),I[ee]=z,S.addEventListener("dispose",P)),A=z}if(A.visible=S.visible,A.wireframe=S.wireframe,E===ci?A.side=S.shadowSide!==null?S.shadowSide:S.side:A.side=S.shadowSide!==null?S.shadowSide:f[S.side],A.alphaMap=S.alphaMap,A.alphaTest=S.alphaTest,A.map=S.map,A.clipShadows=S.clipShadows,A.clippingPlanes=S.clippingPlanes,A.clipIntersection=S.clipIntersection,A.displacementMap=S.displacementMap,A.displacementScale=S.displacementScale,A.displacementBias=S.displacementBias,A.wireframeLinewidth=S.wireframeLinewidth,A.linewidth=S.linewidth,L.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const D=t.properties.get(A);D.light=L}return A}function M(T,S,L,E,A){if(T.visible===!1)return;if(T.layers.test(S.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&A===ci)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,T.matrixWorld);const ee=e.update(T),I=T.material;if(Array.isArray(I)){const z=ee.groups;for(let k=0,J=z.length;k<J;k++){const O=z[k],H=I[O.materialIndex];if(H&&H.visible){const j=g(T,H,E,A);T.onBeforeShadow(t,T,S,L,ee,j,O),t.renderBufferDirect(L,null,ee,j,T,O),T.onAfterShadow(t,T,S,L,ee,j,O)}}}else if(I.visible){const z=g(T,I,E,A);T.onBeforeShadow(t,T,S,L,ee,z,null),t.renderBufferDirect(L,null,ee,z,T,null),T.onAfterShadow(t,T,S,L,ee,z,null)}}const D=T.children;for(let ee=0,I=D.length;ee<I;ee++)M(D[ee],S,L,E,A)}function P(T){T.target.removeEventListener("dispose",P);for(const L in c){const E=c[L],A=T.target.uuid;A in E&&(E[A].dispose(),delete E[A])}}}function P2(t,e,n){const i=n.isWebGL2;function r(){let U=!1;const pe=new ht;let Me=null;const ze=new ht(0,0,0,0);return{setMask:function(Oe){Me!==Oe&&!U&&(t.colorMask(Oe,Oe,Oe,Oe),Me=Oe)},setLocked:function(Oe){U=Oe},setClear:function(Oe,Je,Qe,xt,Et){Et===!0&&(Oe*=xt,Je*=xt,Qe*=xt),pe.set(Oe,Je,Qe,xt),ze.equals(pe)===!1&&(t.clearColor(Oe,Je,Qe,xt),ze.copy(pe))},reset:function(){U=!1,Me=null,ze.set(-1,0,0,0)}}}function s(){let U=!1,pe=null,Me=null,ze=null;return{setTest:function(Oe){Oe?Pe(t.DEPTH_TEST):Le(t.DEPTH_TEST)},setMask:function(Oe){pe!==Oe&&!U&&(t.depthMask(Oe),pe=Oe)},setFunc:function(Oe){if(Me!==Oe){switch(Oe){case B1:t.depthFunc(t.NEVER);break;case H1:t.depthFunc(t.ALWAYS);break;case G1:t.depthFunc(t.LESS);break;case Ml:t.depthFunc(t.LEQUAL);break;case V1:t.depthFunc(t.EQUAL);break;case j1:t.depthFunc(t.GEQUAL);break;case W1:t.depthFunc(t.GREATER);break;case X1:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}Me=Oe}},setLocked:function(Oe){U=Oe},setClear:function(Oe){ze!==Oe&&(t.clearDepth(Oe),ze=Oe)},reset:function(){U=!1,pe=null,Me=null,ze=null}}}function o(){let U=!1,pe=null,Me=null,ze=null,Oe=null,Je=null,Qe=null,xt=null,Et=null;return{setTest:function(nt){U||(nt?Pe(t.STENCIL_TEST):Le(t.STENCIL_TEST))},setMask:function(nt){pe!==nt&&!U&&(t.stencilMask(nt),pe=nt)},setFunc:function(nt,At,Xn){(Me!==nt||ze!==At||Oe!==Xn)&&(t.stencilFunc(nt,At,Xn),Me=nt,ze=At,Oe=Xn)},setOp:function(nt,At,Xn){(Je!==nt||Qe!==At||xt!==Xn)&&(t.stencilOp(nt,At,Xn),Je=nt,Qe=At,xt=Xn)},setLocked:function(nt){U=nt},setClear:function(nt){Et!==nt&&(t.clearStencil(nt),Et=nt)},reset:function(){U=!1,pe=null,Me=null,ze=null,Oe=null,Je=null,Qe=null,xt=null,Et=null}}}const a=new r,l=new s,c=new o,d=new WeakMap,f=new WeakMap;let h={},p={},_=new WeakMap,y=[],m=null,u=!1,v=null,g=null,M=null,P=null,T=null,S=null,L=null,E=new qe(0,0,0),A=0,B=!1,D=null,ee=null,I=null,z=null,k=null;const J=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,H=0;const j=t.getParameter(t.VERSION);j.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(j)[1]),O=H>=1):j.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),O=H>=2);let te=null,ie={};const Y=t.getParameter(t.SCISSOR_BOX),X=t.getParameter(t.VIEWPORT),le=new ht().fromArray(Y),me=new ht().fromArray(X);function he(U,pe,Me,ze){const Oe=new Uint8Array(4),Je=t.createTexture();t.bindTexture(U,Je),t.texParameteri(U,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(U,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Qe=0;Qe<Me;Qe++)i&&(U===t.TEXTURE_3D||U===t.TEXTURE_2D_ARRAY)?t.texImage3D(pe,0,t.RGBA,1,1,ze,0,t.RGBA,t.UNSIGNED_BYTE,Oe):t.texImage2D(pe+Qe,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,Oe);return Je}const be={};be[t.TEXTURE_2D]=he(t.TEXTURE_2D,t.TEXTURE_2D,1),be[t.TEXTURE_CUBE_MAP]=he(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(be[t.TEXTURE_2D_ARRAY]=he(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),be[t.TEXTURE_3D]=he(t.TEXTURE_3D,t.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Pe(t.DEPTH_TEST),l.setFunc(Ml),Ie(!1),b(jh),Pe(t.CULL_FACE),ve(Yi);function Pe(U){h[U]!==!0&&(t.enable(U),h[U]=!0)}function Le(U){h[U]!==!1&&(t.disable(U),h[U]=!1)}function Ge(U,pe){return p[U]!==pe?(t.bindFramebuffer(U,pe),p[U]=pe,i&&(U===t.DRAW_FRAMEBUFFER&&(p[t.FRAMEBUFFER]=pe),U===t.FRAMEBUFFER&&(p[t.DRAW_FRAMEBUFFER]=pe)),!0):!1}function W(U,pe){let Me=y,ze=!1;if(U)if(Me=_.get(pe),Me===void 0&&(Me=[],_.set(pe,Me)),U.isWebGLMultipleRenderTargets){const Oe=U.texture;if(Me.length!==Oe.length||Me[0]!==t.COLOR_ATTACHMENT0){for(let Je=0,Qe=Oe.length;Je<Qe;Je++)Me[Je]=t.COLOR_ATTACHMENT0+Je;Me.length=Oe.length,ze=!0}}else Me[0]!==t.COLOR_ATTACHMENT0&&(Me[0]=t.COLOR_ATTACHMENT0,ze=!0);else Me[0]!==t.BACK&&(Me[0]=t.BACK,ze=!0);ze&&(n.isWebGL2?t.drawBuffers(Me):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Me))}function lt(U){return m!==U?(t.useProgram(U),m=U,!0):!1}const Ce={[fr]:t.FUNC_ADD,[T1]:t.FUNC_SUBTRACT,[A1]:t.FUNC_REVERSE_SUBTRACT};if(i)Ce[qh]=t.MIN,Ce[$h]=t.MAX;else{const U=e.get("EXT_blend_minmax");U!==null&&(Ce[qh]=U.MIN_EXT,Ce[$h]=U.MAX_EXT)}const ue={[b1]:t.ZERO,[C1]:t.ONE,[R1]:t.SRC_COLOR,[sd]:t.SRC_ALPHA,[U1]:t.SRC_ALPHA_SATURATE,[D1]:t.DST_COLOR,[L1]:t.DST_ALPHA,[P1]:t.ONE_MINUS_SRC_COLOR,[od]:t.ONE_MINUS_SRC_ALPHA,[I1]:t.ONE_MINUS_DST_COLOR,[N1]:t.ONE_MINUS_DST_ALPHA,[O1]:t.CONSTANT_COLOR,[F1]:t.ONE_MINUS_CONSTANT_COLOR,[k1]:t.CONSTANT_ALPHA,[z1]:t.ONE_MINUS_CONSTANT_ALPHA};function ve(U,pe,Me,ze,Oe,Je,Qe,xt,Et,nt){if(U===Yi){u===!0&&(Le(t.BLEND),u=!1);return}if(u===!1&&(Pe(t.BLEND),u=!0),U!==w1){if(U!==v||nt!==B){if((g!==fr||T!==fr)&&(t.blendEquation(t.FUNC_ADD),g=fr,T=fr),nt)switch(U){case ys:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Wh:t.blendFunc(t.ONE,t.ONE);break;case Xh:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Yh:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case ys:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Wh:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case Xh:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Yh:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}M=null,P=null,S=null,L=null,E.set(0,0,0),A=0,v=U,B=nt}return}Oe=Oe||pe,Je=Je||Me,Qe=Qe||ze,(pe!==g||Oe!==T)&&(t.blendEquationSeparate(Ce[pe],Ce[Oe]),g=pe,T=Oe),(Me!==M||ze!==P||Je!==S||Qe!==L)&&(t.blendFuncSeparate(ue[Me],ue[ze],ue[Je],ue[Qe]),M=Me,P=ze,S=Je,L=Qe),(xt.equals(E)===!1||Et!==A)&&(t.blendColor(xt.r,xt.g,xt.b,Et),E.copy(xt),A=Et),v=U,B=!1}function ke(U,pe){U.side===Zn?Le(t.CULL_FACE):Pe(t.CULL_FACE);let Me=U.side===fn;pe&&(Me=!Me),Ie(Me),U.blending===ys&&U.transparent===!1?ve(Yi):ve(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),l.setFunc(U.depthFunc),l.setTest(U.depthTest),l.setMask(U.depthWrite),a.setMask(U.colorWrite);const ze=U.stencilWrite;c.setTest(ze),ze&&(c.setMask(U.stencilWriteMask),c.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),c.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),V(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?Pe(t.SAMPLE_ALPHA_TO_COVERAGE):Le(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ie(U){D!==U&&(U?t.frontFace(t.CW):t.frontFace(t.CCW),D=U)}function b(U){U!==M1?(Pe(t.CULL_FACE),U!==ee&&(U===jh?t.cullFace(t.BACK):U===E1?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Le(t.CULL_FACE),ee=U}function w(U){U!==I&&(O&&t.lineWidth(U),I=U)}function V(U,pe,Me){U?(Pe(t.POLYGON_OFFSET_FILL),(z!==pe||k!==Me)&&(t.polygonOffset(pe,Me),z=pe,k=Me)):Le(t.POLYGON_OFFSET_FILL)}function re(U){U?Pe(t.SCISSOR_TEST):Le(t.SCISSOR_TEST)}function se(U){U===void 0&&(U=t.TEXTURE0+J-1),te!==U&&(t.activeTexture(U),te=U)}function oe(U,pe,Me){Me===void 0&&(te===null?Me=t.TEXTURE0+J-1:Me=te);let ze=ie[Me];ze===void 0&&(ze={type:void 0,texture:void 0},ie[Me]=ze),(ze.type!==U||ze.texture!==pe)&&(te!==Me&&(t.activeTexture(Me),te=Me),t.bindTexture(U,pe||be[U]),ze.type=U,ze.texture=pe)}function Re(){const U=ie[te];U!==void 0&&U.type!==void 0&&(t.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Se(){try{t.compressedTexImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function we(){try{t.compressedTexImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function F(){try{t.texSubImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ne(){try{t.texSubImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Z(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Fe(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function De(){try{t.texStorage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function $(){try{t.texStorage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ge(){try{t.texImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function de(){try{t.texImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function R(U){le.equals(U)===!1&&(t.scissor(U.x,U.y,U.z,U.w),le.copy(U))}function ae(U){me.equals(U)===!1&&(t.viewport(U.x,U.y,U.z,U.w),me.copy(U))}function Ne(U,pe){let Me=f.get(pe);Me===void 0&&(Me=new WeakMap,f.set(pe,Me));let ze=Me.get(U);ze===void 0&&(ze=t.getUniformBlockIndex(pe,U.name),Me.set(U,ze))}function _e(U,pe){const ze=f.get(pe).get(U);d.get(pe)!==ze&&(t.uniformBlockBinding(pe,ze,U.__bindingPointIndex),d.set(pe,ze))}function ce(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),i===!0&&(t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null)),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),h={},te=null,ie={},p={},_=new WeakMap,y=[],m=null,u=!1,v=null,g=null,M=null,P=null,T=null,S=null,L=null,E=new qe(0,0,0),A=0,B=!1,D=null,ee=null,I=null,z=null,k=null,le.set(0,0,t.canvas.width,t.canvas.height),me.set(0,0,t.canvas.width,t.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Pe,disable:Le,bindFramebuffer:Ge,drawBuffers:W,useProgram:lt,setBlending:ve,setMaterial:ke,setFlipSided:Ie,setCullFace:b,setLineWidth:w,setPolygonOffset:V,setScissorTest:re,activeTexture:se,bindTexture:oe,unbindTexture:Re,compressedTexImage2D:Se,compressedTexImage3D:we,texImage2D:ge,texImage3D:de,updateUBOMapping:Ne,uniformBlockBinding:_e,texStorage2D:De,texStorage3D:$,texSubImage2D:F,texSubImage3D:ne,compressedTexSubImage2D:Z,compressedTexSubImage3D:Fe,scissor:R,viewport:ae,reset:ce}}function L2(t,e,n,i,r,s,o){const a=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new WeakMap;let f;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(b,w){return p?new OffscreenCanvas(b,w):Bo("canvas")}function y(b,w,V,re){let se=1;if((b.width>re||b.height>re)&&(se=re/Math.max(b.width,b.height)),se<1||w===!0)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap){const oe=w?bl:Math.floor,Re=oe(se*b.width),Se=oe(se*b.height);f===void 0&&(f=_(Re,Se));const we=V?_(Re,Se):f;return we.width=Re,we.height=Se,we.getContext("2d").drawImage(b,0,0,Re,Se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+b.width+"x"+b.height+") to ("+Re+"x"+Se+")."),we}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+b.width+"x"+b.height+")."),b;return b}function m(b){return fd(b.width)&&fd(b.height)}function u(b){return a?!1:b.wrapS!==Hn||b.wrapT!==Hn||b.minFilter!==Qt&&b.minFilter!==bn}function v(b,w){return b.generateMipmaps&&w&&b.minFilter!==Qt&&b.minFilter!==bn}function g(b){t.generateMipmap(b)}function M(b,w,V,re,se=!1){if(a===!1)return w;if(b!==null){if(t[b]!==void 0)return t[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let oe=w;if(w===t.RED&&(V===t.FLOAT&&(oe=t.R32F),V===t.HALF_FLOAT&&(oe=t.R16F),V===t.UNSIGNED_BYTE&&(oe=t.R8)),w===t.RED_INTEGER&&(V===t.UNSIGNED_BYTE&&(oe=t.R8UI),V===t.UNSIGNED_SHORT&&(oe=t.R16UI),V===t.UNSIGNED_INT&&(oe=t.R32UI),V===t.BYTE&&(oe=t.R8I),V===t.SHORT&&(oe=t.R16I),V===t.INT&&(oe=t.R32I)),w===t.RG&&(V===t.FLOAT&&(oe=t.RG32F),V===t.HALF_FLOAT&&(oe=t.RG16F),V===t.UNSIGNED_BYTE&&(oe=t.RG8)),w===t.RGBA){const Re=se?El:st.getTransfer(re);V===t.FLOAT&&(oe=t.RGBA32F),V===t.HALF_FLOAT&&(oe=t.RGBA16F),V===t.UNSIGNED_BYTE&&(oe=Re===ut?t.SRGB8_ALPHA8:t.RGBA8),V===t.UNSIGNED_SHORT_4_4_4_4&&(oe=t.RGBA4),V===t.UNSIGNED_SHORT_5_5_5_1&&(oe=t.RGB5_A1)}return(oe===t.R16F||oe===t.R32F||oe===t.RG16F||oe===t.RG32F||oe===t.RGBA16F||oe===t.RGBA32F)&&e.get("EXT_color_buffer_float"),oe}function P(b,w,V){return v(b,V)===!0||b.isFramebufferTexture&&b.minFilter!==Qt&&b.minFilter!==bn?Math.log2(Math.max(w.width,w.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?w.mipmaps.length:1}function T(b){return b===Qt||b===Kh||b===Rc?t.NEAREST:t.LINEAR}function S(b){const w=b.target;w.removeEventListener("dispose",S),E(w),w.isVideoTexture&&d.delete(w)}function L(b){const w=b.target;w.removeEventListener("dispose",L),B(w)}function E(b){const w=i.get(b);if(w.__webglInit===void 0)return;const V=b.source,re=h.get(V);if(re){const se=re[w.__cacheKey];se.usedTimes--,se.usedTimes===0&&A(b),Object.keys(re).length===0&&h.delete(V)}i.remove(b)}function A(b){const w=i.get(b);t.deleteTexture(w.__webglTexture);const V=b.source,re=h.get(V);delete re[w.__cacheKey],o.memory.textures--}function B(b){const w=b.texture,V=i.get(b),re=i.get(w);if(re.__webglTexture!==void 0&&(t.deleteTexture(re.__webglTexture),o.memory.textures--),b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(V.__webglFramebuffer[se]))for(let oe=0;oe<V.__webglFramebuffer[se].length;oe++)t.deleteFramebuffer(V.__webglFramebuffer[se][oe]);else t.deleteFramebuffer(V.__webglFramebuffer[se]);V.__webglDepthbuffer&&t.deleteRenderbuffer(V.__webglDepthbuffer[se])}else{if(Array.isArray(V.__webglFramebuffer))for(let se=0;se<V.__webglFramebuffer.length;se++)t.deleteFramebuffer(V.__webglFramebuffer[se]);else t.deleteFramebuffer(V.__webglFramebuffer);if(V.__webglDepthbuffer&&t.deleteRenderbuffer(V.__webglDepthbuffer),V.__webglMultisampledFramebuffer&&t.deleteFramebuffer(V.__webglMultisampledFramebuffer),V.__webglColorRenderbuffer)for(let se=0;se<V.__webglColorRenderbuffer.length;se++)V.__webglColorRenderbuffer[se]&&t.deleteRenderbuffer(V.__webglColorRenderbuffer[se]);V.__webglDepthRenderbuffer&&t.deleteRenderbuffer(V.__webglDepthRenderbuffer)}if(b.isWebGLMultipleRenderTargets)for(let se=0,oe=w.length;se<oe;se++){const Re=i.get(w[se]);Re.__webglTexture&&(t.deleteTexture(Re.__webglTexture),o.memory.textures--),i.remove(w[se])}i.remove(w),i.remove(b)}let D=0;function ee(){D=0}function I(){const b=D;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),D+=1,b}function z(b){const w=[];return w.push(b.wrapS),w.push(b.wrapT),w.push(b.wrapR||0),w.push(b.magFilter),w.push(b.minFilter),w.push(b.anisotropy),w.push(b.internalFormat),w.push(b.format),w.push(b.type),w.push(b.generateMipmaps),w.push(b.premultiplyAlpha),w.push(b.flipY),w.push(b.unpackAlignment),w.push(b.colorSpace),w.join()}function k(b,w){const V=i.get(b);if(b.isVideoTexture&&ke(b),b.isRenderTargetTexture===!1&&b.version>0&&V.__version!==b.version){const re=b.image;if(re===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le(V,b,w);return}}n.bindTexture(t.TEXTURE_2D,V.__webglTexture,t.TEXTURE0+w)}function J(b,w){const V=i.get(b);if(b.version>0&&V.__version!==b.version){le(V,b,w);return}n.bindTexture(t.TEXTURE_2D_ARRAY,V.__webglTexture,t.TEXTURE0+w)}function O(b,w){const V=i.get(b);if(b.version>0&&V.__version!==b.version){le(V,b,w);return}n.bindTexture(t.TEXTURE_3D,V.__webglTexture,t.TEXTURE0+w)}function H(b,w){const V=i.get(b);if(b.version>0&&V.__version!==b.version){me(V,b,w);return}n.bindTexture(t.TEXTURE_CUBE_MAP,V.__webglTexture,t.TEXTURE0+w)}const j={[cd]:t.REPEAT,[Hn]:t.CLAMP_TO_EDGE,[ud]:t.MIRRORED_REPEAT},te={[Qt]:t.NEAREST,[Kh]:t.NEAREST_MIPMAP_NEAREST,[Rc]:t.NEAREST_MIPMAP_LINEAR,[bn]:t.LINEAR,[eS]:t.LINEAR_MIPMAP_NEAREST,[Fo]:t.LINEAR_MIPMAP_LINEAR},ie={[fS]:t.NEVER,[xS]:t.ALWAYS,[hS]:t.LESS,[nv]:t.LEQUAL,[pS]:t.EQUAL,[vS]:t.GEQUAL,[mS]:t.GREATER,[gS]:t.NOTEQUAL};function Y(b,w,V){if(V?(t.texParameteri(b,t.TEXTURE_WRAP_S,j[w.wrapS]),t.texParameteri(b,t.TEXTURE_WRAP_T,j[w.wrapT]),(b===t.TEXTURE_3D||b===t.TEXTURE_2D_ARRAY)&&t.texParameteri(b,t.TEXTURE_WRAP_R,j[w.wrapR]),t.texParameteri(b,t.TEXTURE_MAG_FILTER,te[w.magFilter]),t.texParameteri(b,t.TEXTURE_MIN_FILTER,te[w.minFilter])):(t.texParameteri(b,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(b,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),(b===t.TEXTURE_3D||b===t.TEXTURE_2D_ARRAY)&&t.texParameteri(b,t.TEXTURE_WRAP_R,t.CLAMP_TO_EDGE),(w.wrapS!==Hn||w.wrapT!==Hn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),t.texParameteri(b,t.TEXTURE_MAG_FILTER,T(w.magFilter)),t.texParameteri(b,t.TEXTURE_MIN_FILTER,T(w.minFilter)),w.minFilter!==Qt&&w.minFilter!==bn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),w.compareFunction&&(t.texParameteri(b,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(b,t.TEXTURE_COMPARE_FUNC,ie[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const re=e.get("EXT_texture_filter_anisotropic");if(w.magFilter===Qt||w.minFilter!==Rc&&w.minFilter!==Fo||w.type===ki&&e.has("OES_texture_float_linear")===!1||a===!1&&w.type===ko&&e.has("OES_texture_half_float_linear")===!1)return;(w.anisotropy>1||i.get(w).__currentAnisotropy)&&(t.texParameterf(b,re.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,r.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy)}}function X(b,w){let V=!1;b.__webglInit===void 0&&(b.__webglInit=!0,w.addEventListener("dispose",S));const re=w.source;let se=h.get(re);se===void 0&&(se={},h.set(re,se));const oe=z(w);if(oe!==b.__cacheKey){se[oe]===void 0&&(se[oe]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,V=!0),se[oe].usedTimes++;const Re=se[b.__cacheKey];Re!==void 0&&(se[b.__cacheKey].usedTimes--,Re.usedTimes===0&&A(w)),b.__cacheKey=oe,b.__webglTexture=se[oe].texture}return V}function le(b,w,V){let re=t.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(re=t.TEXTURE_2D_ARRAY),w.isData3DTexture&&(re=t.TEXTURE_3D);const se=X(b,w),oe=w.source;n.bindTexture(re,b.__webglTexture,t.TEXTURE0+V);const Re=i.get(oe);if(oe.version!==Re.__version||se===!0){n.activeTexture(t.TEXTURE0+V);const Se=st.getPrimaries(st.workingColorSpace),we=w.colorSpace===Cn?null:st.getPrimaries(w.colorSpace),F=w.colorSpace===Cn||Se===we?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,F);const ne=u(w)&&m(w.image)===!1;let Z=y(w.image,ne,!1,r.maxTextureSize);Z=Ie(w,Z);const Fe=m(Z)||a,De=s.convert(w.format,w.colorSpace);let $=s.convert(w.type),ge=M(w.internalFormat,De,$,w.colorSpace,w.isVideoTexture);Y(re,w,Fe);let de;const R=w.mipmaps,ae=a&&w.isVideoTexture!==!0&&ge!==Q0,Ne=Re.__version===void 0||se===!0,_e=P(w,Z,Fe);if(w.isDepthTexture)ge=t.DEPTH_COMPONENT,a?w.type===ki?ge=t.DEPTH_COMPONENT32F:w.type===Fi?ge=t.DEPTH_COMPONENT24:w.type===_r?ge=t.DEPTH24_STENCIL8:ge=t.DEPTH_COMPONENT16:w.type===ki&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),w.format===yr&&ge===t.DEPTH_COMPONENT&&w.type!==hf&&w.type!==Fi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),w.type=Fi,$=s.convert(w.type)),w.format===Ns&&ge===t.DEPTH_COMPONENT&&(ge=t.DEPTH_STENCIL,w.type!==_r&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),w.type=_r,$=s.convert(w.type))),Ne&&(ae?n.texStorage2D(t.TEXTURE_2D,1,ge,Z.width,Z.height):n.texImage2D(t.TEXTURE_2D,0,ge,Z.width,Z.height,0,De,$,null));else if(w.isDataTexture)if(R.length>0&&Fe){ae&&Ne&&n.texStorage2D(t.TEXTURE_2D,_e,ge,R[0].width,R[0].height);for(let ce=0,U=R.length;ce<U;ce++)de=R[ce],ae?n.texSubImage2D(t.TEXTURE_2D,ce,0,0,de.width,de.height,De,$,de.data):n.texImage2D(t.TEXTURE_2D,ce,ge,de.width,de.height,0,De,$,de.data);w.generateMipmaps=!1}else ae?(Ne&&n.texStorage2D(t.TEXTURE_2D,_e,ge,Z.width,Z.height),n.texSubImage2D(t.TEXTURE_2D,0,0,0,Z.width,Z.height,De,$,Z.data)):n.texImage2D(t.TEXTURE_2D,0,ge,Z.width,Z.height,0,De,$,Z.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){ae&&Ne&&n.texStorage3D(t.TEXTURE_2D_ARRAY,_e,ge,R[0].width,R[0].height,Z.depth);for(let ce=0,U=R.length;ce<U;ce++)de=R[ce],w.format!==Gn?De!==null?ae?n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ce,0,0,0,de.width,de.height,Z.depth,De,de.data,0,0):n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,ce,ge,de.width,de.height,Z.depth,0,de.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ae?n.texSubImage3D(t.TEXTURE_2D_ARRAY,ce,0,0,0,de.width,de.height,Z.depth,De,$,de.data):n.texImage3D(t.TEXTURE_2D_ARRAY,ce,ge,de.width,de.height,Z.depth,0,De,$,de.data)}else{ae&&Ne&&n.texStorage2D(t.TEXTURE_2D,_e,ge,R[0].width,R[0].height);for(let ce=0,U=R.length;ce<U;ce++)de=R[ce],w.format!==Gn?De!==null?ae?n.compressedTexSubImage2D(t.TEXTURE_2D,ce,0,0,de.width,de.height,De,de.data):n.compressedTexImage2D(t.TEXTURE_2D,ce,ge,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ae?n.texSubImage2D(t.TEXTURE_2D,ce,0,0,de.width,de.height,De,$,de.data):n.texImage2D(t.TEXTURE_2D,ce,ge,de.width,de.height,0,De,$,de.data)}else if(w.isDataArrayTexture)ae?(Ne&&n.texStorage3D(t.TEXTURE_2D_ARRAY,_e,ge,Z.width,Z.height,Z.depth),n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,De,$,Z.data)):n.texImage3D(t.TEXTURE_2D_ARRAY,0,ge,Z.width,Z.height,Z.depth,0,De,$,Z.data);else if(w.isData3DTexture)ae?(Ne&&n.texStorage3D(t.TEXTURE_3D,_e,ge,Z.width,Z.height,Z.depth),n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,De,$,Z.data)):n.texImage3D(t.TEXTURE_3D,0,ge,Z.width,Z.height,Z.depth,0,De,$,Z.data);else if(w.isFramebufferTexture){if(Ne)if(ae)n.texStorage2D(t.TEXTURE_2D,_e,ge,Z.width,Z.height);else{let ce=Z.width,U=Z.height;for(let pe=0;pe<_e;pe++)n.texImage2D(t.TEXTURE_2D,pe,ge,ce,U,0,De,$,null),ce>>=1,U>>=1}}else if(R.length>0&&Fe){ae&&Ne&&n.texStorage2D(t.TEXTURE_2D,_e,ge,R[0].width,R[0].height);for(let ce=0,U=R.length;ce<U;ce++)de=R[ce],ae?n.texSubImage2D(t.TEXTURE_2D,ce,0,0,De,$,de):n.texImage2D(t.TEXTURE_2D,ce,ge,De,$,de);w.generateMipmaps=!1}else ae?(Ne&&n.texStorage2D(t.TEXTURE_2D,_e,ge,Z.width,Z.height),n.texSubImage2D(t.TEXTURE_2D,0,0,0,De,$,Z)):n.texImage2D(t.TEXTURE_2D,0,ge,De,$,Z);v(w,Fe)&&g(re),Re.__version=oe.version,w.onUpdate&&w.onUpdate(w)}b.__version=w.version}function me(b,w,V){if(w.image.length!==6)return;const re=X(b,w),se=w.source;n.bindTexture(t.TEXTURE_CUBE_MAP,b.__webglTexture,t.TEXTURE0+V);const oe=i.get(se);if(se.version!==oe.__version||re===!0){n.activeTexture(t.TEXTURE0+V);const Re=st.getPrimaries(st.workingColorSpace),Se=w.colorSpace===Cn?null:st.getPrimaries(w.colorSpace),we=w.colorSpace===Cn||Re===Se?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);const F=w.isCompressedTexture||w.image[0].isCompressedTexture,ne=w.image[0]&&w.image[0].isDataTexture,Z=[];for(let ce=0;ce<6;ce++)!F&&!ne?Z[ce]=y(w.image[ce],!1,!0,r.maxCubemapSize):Z[ce]=ne?w.image[ce].image:w.image[ce],Z[ce]=Ie(w,Z[ce]);const Fe=Z[0],De=m(Fe)||a,$=s.convert(w.format,w.colorSpace),ge=s.convert(w.type),de=M(w.internalFormat,$,ge,w.colorSpace),R=a&&w.isVideoTexture!==!0,ae=oe.__version===void 0||re===!0;let Ne=P(w,Fe,De);Y(t.TEXTURE_CUBE_MAP,w,De);let _e;if(F){R&&ae&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Ne,de,Fe.width,Fe.height);for(let ce=0;ce<6;ce++){_e=Z[ce].mipmaps;for(let U=0;U<_e.length;U++){const pe=_e[U];w.format!==Gn?$!==null?R?n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,U,0,0,pe.width,pe.height,$,pe.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,U,de,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,U,0,0,pe.width,pe.height,$,ge,pe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,U,de,pe.width,pe.height,0,$,ge,pe.data)}}}else{_e=w.mipmaps,R&&ae&&(_e.length>0&&Ne++,n.texStorage2D(t.TEXTURE_CUBE_MAP,Ne,de,Z[0].width,Z[0].height));for(let ce=0;ce<6;ce++)if(ne){R?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,Z[ce].width,Z[ce].height,$,ge,Z[ce].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,de,Z[ce].width,Z[ce].height,0,$,ge,Z[ce].data);for(let U=0;U<_e.length;U++){const Me=_e[U].image[ce].image;R?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,U+1,0,0,Me.width,Me.height,$,ge,Me.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,U+1,de,Me.width,Me.height,0,$,ge,Me.data)}}else{R?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,$,ge,Z[ce]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,de,$,ge,Z[ce]);for(let U=0;U<_e.length;U++){const pe=_e[U];R?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,U+1,0,0,$,ge,pe.image[ce]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ce,U+1,de,$,ge,pe.image[ce])}}}v(w,De)&&g(t.TEXTURE_CUBE_MAP),oe.__version=se.version,w.onUpdate&&w.onUpdate(w)}b.__version=w.version}function he(b,w,V,re,se,oe){const Re=s.convert(V.format,V.colorSpace),Se=s.convert(V.type),we=M(V.internalFormat,Re,Se,V.colorSpace);if(!i.get(w).__hasExternalTextures){const ne=Math.max(1,w.width>>oe),Z=Math.max(1,w.height>>oe);se===t.TEXTURE_3D||se===t.TEXTURE_2D_ARRAY?n.texImage3D(se,oe,we,ne,Z,w.depth,0,Re,Se,null):n.texImage2D(se,oe,we,ne,Z,0,Re,Se,null)}n.bindFramebuffer(t.FRAMEBUFFER,b),ve(w)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,re,se,i.get(V).__webglTexture,0,ue(w)):(se===t.TEXTURE_2D||se>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,re,se,i.get(V).__webglTexture,oe),n.bindFramebuffer(t.FRAMEBUFFER,null)}function be(b,w,V){if(t.bindRenderbuffer(t.RENDERBUFFER,b),w.depthBuffer&&!w.stencilBuffer){let re=a===!0?t.DEPTH_COMPONENT24:t.DEPTH_COMPONENT16;if(V||ve(w)){const se=w.depthTexture;se&&se.isDepthTexture&&(se.type===ki?re=t.DEPTH_COMPONENT32F:se.type===Fi&&(re=t.DEPTH_COMPONENT24));const oe=ue(w);ve(w)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,oe,re,w.width,w.height):t.renderbufferStorageMultisample(t.RENDERBUFFER,oe,re,w.width,w.height)}else t.renderbufferStorage(t.RENDERBUFFER,re,w.width,w.height);t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,b)}else if(w.depthBuffer&&w.stencilBuffer){const re=ue(w);V&&ve(w)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,re,t.DEPTH24_STENCIL8,w.width,w.height):ve(w)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,re,t.DEPTH24_STENCIL8,w.width,w.height):t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_STENCIL,w.width,w.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,b)}else{const re=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let se=0;se<re.length;se++){const oe=re[se],Re=s.convert(oe.format,oe.colorSpace),Se=s.convert(oe.type),we=M(oe.internalFormat,Re,Se,oe.colorSpace),F=ue(w);V&&ve(w)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,F,we,w.width,w.height):ve(w)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,F,we,w.width,w.height):t.renderbufferStorage(t.RENDERBUFFER,we,w.width,w.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Pe(b,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,b),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),k(w.depthTexture,0);const re=i.get(w.depthTexture).__webglTexture,se=ue(w);if(w.depthTexture.format===yr)ve(w)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,re,0,se):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,re,0);else if(w.depthTexture.format===Ns)ve(w)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,re,0,se):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,re,0);else throw new Error("Unknown depthTexture format")}function Le(b){const w=i.get(b),V=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!w.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");Pe(w.__webglFramebuffer,b)}else if(V){w.__webglDepthbuffer=[];for(let re=0;re<6;re++)n.bindFramebuffer(t.FRAMEBUFFER,w.__webglFramebuffer[re]),w.__webglDepthbuffer[re]=t.createRenderbuffer(),be(w.__webglDepthbuffer[re],b,!1)}else n.bindFramebuffer(t.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer=t.createRenderbuffer(),be(w.__webglDepthbuffer,b,!1);n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ge(b,w,V){const re=i.get(b);w!==void 0&&he(re.__webglFramebuffer,b,b.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),V!==void 0&&Le(b)}function W(b){const w=b.texture,V=i.get(b),re=i.get(w);b.addEventListener("dispose",L),b.isWebGLMultipleRenderTargets!==!0&&(re.__webglTexture===void 0&&(re.__webglTexture=t.createTexture()),re.__version=w.version,o.memory.textures++);const se=b.isWebGLCubeRenderTarget===!0,oe=b.isWebGLMultipleRenderTargets===!0,Re=m(b)||a;if(se){V.__webglFramebuffer=[];for(let Se=0;Se<6;Se++)if(a&&w.mipmaps&&w.mipmaps.length>0){V.__webglFramebuffer[Se]=[];for(let we=0;we<w.mipmaps.length;we++)V.__webglFramebuffer[Se][we]=t.createFramebuffer()}else V.__webglFramebuffer[Se]=t.createFramebuffer()}else{if(a&&w.mipmaps&&w.mipmaps.length>0){V.__webglFramebuffer=[];for(let Se=0;Se<w.mipmaps.length;Se++)V.__webglFramebuffer[Se]=t.createFramebuffer()}else V.__webglFramebuffer=t.createFramebuffer();if(oe)if(r.drawBuffers){const Se=b.texture;for(let we=0,F=Se.length;we<F;we++){const ne=i.get(Se[we]);ne.__webglTexture===void 0&&(ne.__webglTexture=t.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&b.samples>0&&ve(b)===!1){const Se=oe?w:[w];V.__webglMultisampledFramebuffer=t.createFramebuffer(),V.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let we=0;we<Se.length;we++){const F=Se[we];V.__webglColorRenderbuffer[we]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,V.__webglColorRenderbuffer[we]);const ne=s.convert(F.format,F.colorSpace),Z=s.convert(F.type),Fe=M(F.internalFormat,ne,Z,F.colorSpace,b.isXRRenderTarget===!0),De=ue(b);t.renderbufferStorageMultisample(t.RENDERBUFFER,De,Fe,b.width,b.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+we,t.RENDERBUFFER,V.__webglColorRenderbuffer[we])}t.bindRenderbuffer(t.RENDERBUFFER,null),b.depthBuffer&&(V.__webglDepthRenderbuffer=t.createRenderbuffer(),be(V.__webglDepthRenderbuffer,b,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(se){n.bindTexture(t.TEXTURE_CUBE_MAP,re.__webglTexture),Y(t.TEXTURE_CUBE_MAP,w,Re);for(let Se=0;Se<6;Se++)if(a&&w.mipmaps&&w.mipmaps.length>0)for(let we=0;we<w.mipmaps.length;we++)he(V.__webglFramebuffer[Se][we],b,w,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,we);else he(V.__webglFramebuffer[Se],b,w,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0);v(w,Re)&&g(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(oe){const Se=b.texture;for(let we=0,F=Se.length;we<F;we++){const ne=Se[we],Z=i.get(ne);n.bindTexture(t.TEXTURE_2D,Z.__webglTexture),Y(t.TEXTURE_2D,ne,Re),he(V.__webglFramebuffer,b,ne,t.COLOR_ATTACHMENT0+we,t.TEXTURE_2D,0),v(ne,Re)&&g(t.TEXTURE_2D)}n.unbindTexture()}else{let Se=t.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(a?Se=b.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),n.bindTexture(Se,re.__webglTexture),Y(Se,w,Re),a&&w.mipmaps&&w.mipmaps.length>0)for(let we=0;we<w.mipmaps.length;we++)he(V.__webglFramebuffer[we],b,w,t.COLOR_ATTACHMENT0,Se,we);else he(V.__webglFramebuffer,b,w,t.COLOR_ATTACHMENT0,Se,0);v(w,Re)&&g(Se),n.unbindTexture()}b.depthBuffer&&Le(b)}function lt(b){const w=m(b)||a,V=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let re=0,se=V.length;re<se;re++){const oe=V[re];if(v(oe,w)){const Re=b.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,Se=i.get(oe).__webglTexture;n.bindTexture(Re,Se),g(Re),n.unbindTexture()}}}function Ce(b){if(a&&b.samples>0&&ve(b)===!1){const w=b.isWebGLMultipleRenderTargets?b.texture:[b.texture],V=b.width,re=b.height;let se=t.COLOR_BUFFER_BIT;const oe=[],Re=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Se=i.get(b),we=b.isWebGLMultipleRenderTargets===!0;if(we)for(let F=0;F<w.length;F++)n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+F,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+F,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let F=0;F<w.length;F++){oe.push(t.COLOR_ATTACHMENT0+F),b.depthBuffer&&oe.push(Re);const ne=Se.__ignoreDepthValues!==void 0?Se.__ignoreDepthValues:!1;if(ne===!1&&(b.depthBuffer&&(se|=t.DEPTH_BUFFER_BIT),b.stencilBuffer&&(se|=t.STENCIL_BUFFER_BIT)),we&&t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Se.__webglColorRenderbuffer[F]),ne===!0&&(t.invalidateFramebuffer(t.READ_FRAMEBUFFER,[Re]),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[Re])),we){const Z=i.get(w[F]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Z,0)}t.blitFramebuffer(0,0,V,re,0,0,V,re,se,t.NEAREST),c&&t.invalidateFramebuffer(t.READ_FRAMEBUFFER,oe)}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),we)for(let F=0;F<w.length;F++){n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+F,t.RENDERBUFFER,Se.__webglColorRenderbuffer[F]);const ne=i.get(w[F]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+F,t.TEXTURE_2D,ne,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}}function ue(b){return Math.min(r.maxSamples,b.samples)}function ve(b){const w=i.get(b);return a&&b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function ke(b){const w=o.render.frame;d.get(b)!==w&&(d.set(b,w),b.update())}function Ie(b,w){const V=b.colorSpace,re=b.format,se=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||b.format===dd||V!==Mi&&V!==Cn&&(st.getTransfer(V)===ut?a===!1?e.has("EXT_sRGB")===!0&&re===Gn?(b.format=dd,b.minFilter=bn,b.generateMipmaps=!1):w=rv.sRGBToLinear(w):(re!==Gn||se!==$i)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),w}this.allocateTextureUnit=I,this.resetTextureUnits=ee,this.setTexture2D=k,this.setTexture2DArray=J,this.setTexture3D=O,this.setTextureCube=H,this.rebindTextures=Ge,this.setupRenderTarget=W,this.updateRenderTargetMipmap=lt,this.updateMultisampleRenderTarget=Ce,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=he,this.useMultisampledRTT=ve}function N2(t,e,n){const i=n.isWebGL2;function r(s,o=Cn){let a;const l=st.getTransfer(o);if(s===$i)return t.UNSIGNED_BYTE;if(s===q0)return t.UNSIGNED_SHORT_4_4_4_4;if(s===$0)return t.UNSIGNED_SHORT_5_5_5_1;if(s===tS)return t.BYTE;if(s===nS)return t.SHORT;if(s===hf)return t.UNSIGNED_SHORT;if(s===Y0)return t.INT;if(s===Fi)return t.UNSIGNED_INT;if(s===ki)return t.FLOAT;if(s===ko)return i?t.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===iS)return t.ALPHA;if(s===Gn)return t.RGBA;if(s===rS)return t.LUMINANCE;if(s===sS)return t.LUMINANCE_ALPHA;if(s===yr)return t.DEPTH_COMPONENT;if(s===Ns)return t.DEPTH_STENCIL;if(s===dd)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===oS)return t.RED;if(s===K0)return t.RED_INTEGER;if(s===aS)return t.RG;if(s===Z0)return t.RG_INTEGER;if(s===J0)return t.RGBA_INTEGER;if(s===Pc||s===Lc||s===Nc||s===Dc)if(l===ut)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Pc)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Lc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Nc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Dc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Pc)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Lc)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Nc)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Dc)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Zh||s===Jh||s===Qh||s===ep)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Zh)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Jh)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Qh)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===ep)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Q0)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===tp||s===np)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===tp)return l===ut?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===np)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===ip||s===rp||s===sp||s===op||s===ap||s===lp||s===cp||s===up||s===dp||s===fp||s===hp||s===pp||s===mp||s===gp)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===ip)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===rp)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===sp)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===op)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===ap)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===lp)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===cp)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===up)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===dp)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===fp)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===hp)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===pp)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===mp)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===gp)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Ic||s===vp||s===xp)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===Ic)return l===ut?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===vp)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===xp)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===lS||s===_p||s===yp||s===Sp)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===Ic)return a.COMPRESSED_RED_RGTC1_EXT;if(s===_p)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===yp)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Sp)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===_r?i?t.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):t[s]!==void 0?t[s]:null}return{convert:r}}class D2 extends an{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class wn extends kt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const I2={type:"move"};class iu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const y of e.hand.values()){const m=n.getJointPose(y,i),u=this._getHandJoint(c,y);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const d=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=d.position.distanceTo(f.position),p=.02,_=.005;c.inputState.pinching&&h>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(I2)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new wn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}class U2 extends Nr{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,d=null,f=null,h=null,p=null,_=null;const y=n.getContextAttributes();let m=null,u=null;const v=[],g=[],M=new ye;let P=null;const T=new an;T.layers.enable(1),T.viewport=new ht;const S=new an;S.layers.enable(2),S.viewport=new ht;const L=[T,S],E=new D2;E.layers.enable(1),E.layers.enable(2);let A=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let X=v[Y];return X===void 0&&(X=new iu,v[Y]=X),X.getTargetRaySpace()},this.getControllerGrip=function(Y){let X=v[Y];return X===void 0&&(X=new iu,v[Y]=X),X.getGripSpace()},this.getHand=function(Y){let X=v[Y];return X===void 0&&(X=new iu,v[Y]=X),X.getHandSpace()};function D(Y){const X=g.indexOf(Y.inputSource);if(X===-1)return;const le=v[X];le!==void 0&&(le.update(Y.inputSource,Y.frame,c||o),le.dispatchEvent({type:Y.type,data:Y.inputSource}))}function ee(){r.removeEventListener("select",D),r.removeEventListener("selectstart",D),r.removeEventListener("selectend",D),r.removeEventListener("squeeze",D),r.removeEventListener("squeezestart",D),r.removeEventListener("squeezeend",D),r.removeEventListener("end",ee),r.removeEventListener("inputsourceschange",I);for(let Y=0;Y<v.length;Y++){const X=g[Y];X!==null&&(g[Y]=null,v[Y].disconnect(X))}A=null,B=null,e.setRenderTarget(m),p=null,h=null,f=null,r=null,u=null,ie.stop(),i.isPresenting=!1,e.setPixelRatio(P),e.setSize(M.width,M.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",D),r.addEventListener("selectstart",D),r.addEventListener("selectend",D),r.addEventListener("squeeze",D),r.addEventListener("squeezestart",D),r.addEventListener("squeezeend",D),r.addEventListener("end",ee),r.addEventListener("inputsourceschange",I),y.xrCompatible!==!0&&await n.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(M),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const X={antialias:r.renderState.layers===void 0?y.antialias:!0,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,X),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),u=new br(p.framebufferWidth,p.framebufferHeight,{format:Gn,type:$i,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil})}else{let X=null,le=null,me=null;y.depth&&(me=y.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,X=y.stencil?Ns:yr,le=y.stencil?_r:Fi);const he={colorFormat:n.RGBA8,depthFormat:me,scaleFactor:s};f=new XRWebGLBinding(r,n),h=f.createProjectionLayer(he),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),u=new br(h.textureWidth,h.textureHeight,{format:Gn,type:$i,depthTexture:new mv(h.textureWidth,h.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,X),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0});const be=e.properties.get(u);be.__ignoreDepthValues=h.ignoreDepthValues}u.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),ie.setContext(r),ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function I(Y){for(let X=0;X<Y.removed.length;X++){const le=Y.removed[X],me=g.indexOf(le);me>=0&&(g[me]=null,v[me].disconnect(le))}for(let X=0;X<Y.added.length;X++){const le=Y.added[X];let me=g.indexOf(le);if(me===-1){for(let be=0;be<v.length;be++)if(be>=g.length){g.push(le),me=be;break}else if(g[be]===null){g[be]=le,me=be;break}if(me===-1)break}const he=v[me];he&&he.connect(le)}}const z=new N,k=new N;function J(Y,X,le){z.setFromMatrixPosition(X.matrixWorld),k.setFromMatrixPosition(le.matrixWorld);const me=z.distanceTo(k),he=X.projectionMatrix.elements,be=le.projectionMatrix.elements,Pe=he[14]/(he[10]-1),Le=he[14]/(he[10]+1),Ge=(he[9]+1)/he[5],W=(he[9]-1)/he[5],lt=(he[8]-1)/he[0],Ce=(be[8]+1)/be[0],ue=Pe*lt,ve=Pe*Ce,ke=me/(-lt+Ce),Ie=ke*-lt;X.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ie),Y.translateZ(ke),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert();const b=Pe+ke,w=Le+ke,V=ue-Ie,re=ve+(me-Ie),se=Ge*Le/w*b,oe=W*Le/w*b;Y.projectionMatrix.makePerspective(V,re,se,oe,b,w),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}function O(Y,X){X===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(X.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;E.near=S.near=T.near=Y.near,E.far=S.far=T.far=Y.far,(A!==E.near||B!==E.far)&&(r.updateRenderState({depthNear:E.near,depthFar:E.far}),A=E.near,B=E.far);const X=Y.parent,le=E.cameras;O(E,X);for(let me=0;me<le.length;me++)O(le[me],X);le.length===2?J(E,T,S):E.projectionMatrix.copy(T.projectionMatrix),H(Y,E,X)};function H(Y,X,le){le===null?Y.matrix.copy(X.matrixWorld):(Y.matrix.copy(le.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(X.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(X.projectionMatrix),Y.projectionMatrixInverse.copy(X.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=zo*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(Y){l=Y,h!==null&&(h.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)};let j=null;function te(Y,X){if(d=X.getViewerPose(c||o),_=X,d!==null){const le=d.views;p!==null&&(e.setRenderTargetFramebuffer(u,p.framebuffer),e.setRenderTarget(u));let me=!1;le.length!==E.cameras.length&&(E.cameras.length=0,me=!0);for(let he=0;he<le.length;he++){const be=le[he];let Pe=null;if(p!==null)Pe=p.getViewport(be);else{const Ge=f.getViewSubImage(h,be);Pe=Ge.viewport,he===0&&(e.setRenderTargetTextures(u,Ge.colorTexture,h.ignoreDepthValues?void 0:Ge.depthStencilTexture),e.setRenderTarget(u))}let Le=L[he];Le===void 0&&(Le=new an,Le.layers.enable(he),Le.viewport=new ht,L[he]=Le),Le.matrix.fromArray(be.transform.matrix),Le.matrix.decompose(Le.position,Le.quaternion,Le.scale),Le.projectionMatrix.fromArray(be.projectionMatrix),Le.projectionMatrixInverse.copy(Le.projectionMatrix).invert(),Le.viewport.set(Pe.x,Pe.y,Pe.width,Pe.height),he===0&&(E.matrix.copy(Le.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),me===!0&&E.cameras.push(Le)}}for(let le=0;le<v.length;le++){const me=g[le],he=v[le];me!==null&&he!==void 0&&he.update(me,X,c||o)}j&&j(Y,X),X.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:X}),_=null}const ie=new hv;ie.setAnimationLoop(te),this.setAnimationLoop=function(Y){j=Y},this.dispose=function(){}}}function O2(t,e){function n(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function i(m,u){u.color.getRGB(m.fogColor.value,uv(t)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function r(m,u,v,g,M){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(m,u):u.isMeshToonMaterial?(s(m,u),f(m,u)):u.isMeshPhongMaterial?(s(m,u),d(m,u)):u.isMeshStandardMaterial?(s(m,u),h(m,u),u.isMeshPhysicalMaterial&&p(m,u,M)):u.isMeshMatcapMaterial?(s(m,u),_(m,u)):u.isMeshDepthMaterial?s(m,u):u.isMeshDistanceMaterial?(s(m,u),y(m,u)):u.isMeshNormalMaterial?s(m,u):u.isLineBasicMaterial?(o(m,u),u.isLineDashedMaterial&&a(m,u)):u.isPointsMaterial?l(m,u,v,g):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,n(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===fn&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,n(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===fn&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,n(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,n(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const v=e.get(u).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap){m.lightMap.value=u.lightMap;const g=t._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=u.lightMapIntensity*g,n(u.lightMap,m.lightMapTransform)}u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,m.aoMapTransform))}function o(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform))}function a(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,v,g){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*v,m.scale.value=g*.5,u.map&&(m.map.value=u.map,n(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function d(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function f(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function h(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,m.roughnessMapTransform)),e.get(u).envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,v){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===fn&&m.clearcoatNormalScale.value.negate())),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,u){u.matcap&&(m.matcap.value=u.matcap)}function y(m,u){const v=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function F2(t,e,n,i){let r={},s={},o=[];const a=n.isWebGL2?t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(v,g){const M=g.program;i.uniformBlockBinding(v,M)}function c(v,g){let M=r[v.id];M===void 0&&(_(v),M=d(v),r[v.id]=M,v.addEventListener("dispose",m));const P=g.program;i.updateUBOMapping(v,P);const T=e.render.frame;s[v.id]!==T&&(h(v),s[v.id]=T)}function d(v){const g=f();v.__bindingPointIndex=g;const M=t.createBuffer(),P=v.__size,T=v.usage;return t.bindBuffer(t.UNIFORM_BUFFER,M),t.bufferData(t.UNIFORM_BUFFER,P,T),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,g,M),M}function f(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const g=r[v.id],M=v.uniforms,P=v.__cache;t.bindBuffer(t.UNIFORM_BUFFER,g);for(let T=0,S=M.length;T<S;T++){const L=Array.isArray(M[T])?M[T]:[M[T]];for(let E=0,A=L.length;E<A;E++){const B=L[E];if(p(B,T,E,P)===!0){const D=B.__offset,ee=Array.isArray(B.value)?B.value:[B.value];let I=0;for(let z=0;z<ee.length;z++){const k=ee[z],J=y(k);typeof k=="number"||typeof k=="boolean"?(B.__data[0]=k,t.bufferSubData(t.UNIFORM_BUFFER,D+I,B.__data)):k.isMatrix3?(B.__data[0]=k.elements[0],B.__data[1]=k.elements[1],B.__data[2]=k.elements[2],B.__data[3]=0,B.__data[4]=k.elements[3],B.__data[5]=k.elements[4],B.__data[6]=k.elements[5],B.__data[7]=0,B.__data[8]=k.elements[6],B.__data[9]=k.elements[7],B.__data[10]=k.elements[8],B.__data[11]=0):(k.toArray(B.__data,I),I+=J.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,D,B.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(v,g,M,P){const T=v.value,S=g+"_"+M;if(P[S]===void 0)return typeof T=="number"||typeof T=="boolean"?P[S]=T:P[S]=T.clone(),!0;{const L=P[S];if(typeof T=="number"||typeof T=="boolean"){if(L!==T)return P[S]=T,!0}else if(L.equals(T)===!1)return L.copy(T),!0}return!1}function _(v){const g=v.uniforms;let M=0;const P=16;for(let S=0,L=g.length;S<L;S++){const E=Array.isArray(g[S])?g[S]:[g[S]];for(let A=0,B=E.length;A<B;A++){const D=E[A],ee=Array.isArray(D.value)?D.value:[D.value];for(let I=0,z=ee.length;I<z;I++){const k=ee[I],J=y(k),O=M%P;O!==0&&P-O<J.boundary&&(M+=P-O),D.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=M,M+=J.storage}}}const T=M%P;return T>0&&(M+=P-T),v.__size=M,v.__cache={},this}function y(v){const g={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(g.boundary=4,g.storage=4):v.isVector2?(g.boundary=8,g.storage=8):v.isVector3||v.isColor?(g.boundary=16,g.storage=12):v.isVector4?(g.boundary=16,g.storage=16):v.isMatrix3?(g.boundary=48,g.storage=48):v.isMatrix4?(g.boundary=64,g.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),g}function m(v){const g=v.target;g.removeEventListener("dispose",m);const M=o.indexOf(g.__bindingPointIndex);o.splice(M,1),t.deleteBuffer(r[g.id]),delete r[g.id],delete s[g.id]}function u(){for(const v in r)t.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:l,update:c,dispose:u}}class _f{constructor(e={}){const{canvas:n=DS(),context:i=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let h;i!==null?h=i.getContextAttributes().alpha:h=o;const p=new Uint32Array(4),_=new Int32Array(4);let y=null,m=null;const u=[],v=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=St,this._useLegacyLights=!1,this.toneMapping=qi,this.toneMappingExposure=1;const g=this;let M=!1,P=0,T=0,S=null,L=-1,E=null;const A=new ht,B=new ht;let D=null;const ee=new qe(0);let I=0,z=n.width,k=n.height,J=1,O=null,H=null;const j=new ht(0,0,z,k),te=new ht(0,0,z,k);let ie=!1;const Y=new vf;let X=!1,le=!1,me=null;const he=new Mt,be=new ye,Pe=new N,Le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ge(){return S===null?J:1}let W=i;function lt(C,G){for(let K=0;K<C.length;K++){const Q=C[K],q=n.getContext(Q,G);if(q!==null)return q}return null}try{const C={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${df}`),n.addEventListener("webglcontextlost",ce,!1),n.addEventListener("webglcontextrestored",U,!1),n.addEventListener("webglcontextcreationerror",pe,!1),W===null){const G=["webgl2","webgl","experimental-webgl"];if(g.isWebGL1Renderer===!0&&G.shift(),W=lt(G,C),W===null)throw lt(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&W instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),W.getShaderPrecisionFormat===void 0&&(W.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let Ce,ue,ve,ke,Ie,b,w,V,re,se,oe,Re,Se,we,F,ne,Z,Fe,De,$,ge,de,R,ae;function Ne(){Ce=new Yw(W),ue=new Hw(W,Ce,e),Ce.init(ue),de=new N2(W,Ce,ue),ve=new P2(W,Ce,ue),ke=new Kw(W),Ie=new g2,b=new L2(W,Ce,ve,Ie,ue,de,ke),w=new Vw(g),V=new Xw(g),re=new rM(W,ue),R=new zw(W,Ce,re,ue),se=new qw(W,re,ke,R),oe=new eT(W,se,re,ke),De=new Qw(W,ue,b),ne=new Gw(Ie),Re=new m2(g,w,V,Ce,ue,R,ne),Se=new O2(g,Ie),we=new x2,F=new w2(Ce,ue),Fe=new kw(g,w,V,ve,oe,h,l),Z=new R2(g,oe,ue),ae=new F2(W,ke,ue,ve),$=new Bw(W,Ce,ke,ue),ge=new $w(W,Ce,ke,ue),ke.programs=Re.programs,g.capabilities=ue,g.extensions=Ce,g.properties=Ie,g.renderLists=we,g.shadowMap=Z,g.state=ve,g.info=ke}Ne();const _e=new U2(g,W);this.xr=_e,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const C=Ce.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=Ce.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(C){C!==void 0&&(J=C,this.setSize(z,k,!1))},this.getSize=function(C){return C.set(z,k)},this.setSize=function(C,G,K=!0){if(_e.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=C,k=G,n.width=Math.floor(C*J),n.height=Math.floor(G*J),K===!0&&(n.style.width=C+"px",n.style.height=G+"px"),this.setViewport(0,0,C,G)},this.getDrawingBufferSize=function(C){return C.set(z*J,k*J).floor()},this.setDrawingBufferSize=function(C,G,K){z=C,k=G,J=K,n.width=Math.floor(C*K),n.height=Math.floor(G*K),this.setViewport(0,0,C,G)},this.getCurrentViewport=function(C){return C.copy(A)},this.getViewport=function(C){return C.copy(j)},this.setViewport=function(C,G,K,Q){C.isVector4?j.set(C.x,C.y,C.z,C.w):j.set(C,G,K,Q),ve.viewport(A.copy(j).multiplyScalar(J).floor())},this.getScissor=function(C){return C.copy(te)},this.setScissor=function(C,G,K,Q){C.isVector4?te.set(C.x,C.y,C.z,C.w):te.set(C,G,K,Q),ve.scissor(B.copy(te).multiplyScalar(J).floor())},this.getScissorTest=function(){return ie},this.setScissorTest=function(C){ve.setScissorTest(ie=C)},this.setOpaqueSort=function(C){O=C},this.setTransparentSort=function(C){H=C},this.getClearColor=function(C){return C.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor.apply(Fe,arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha.apply(Fe,arguments)},this.clear=function(C=!0,G=!0,K=!0){let Q=0;if(C){let q=!1;if(S!==null){const Te=S.texture.format;q=Te===J0||Te===Z0||Te===K0}if(q){const Te=S.texture.type,Ue=Te===$i||Te===Fi||Te===hf||Te===_r||Te===q0||Te===$0,Be=Fe.getClearColor(),He=Fe.getClearAlpha(),Ye=Be.r,Ve=Be.g,je=Be.b;Ue?(p[0]=Ye,p[1]=Ve,p[2]=je,p[3]=He,W.clearBufferuiv(W.COLOR,0,p)):(_[0]=Ye,_[1]=Ve,_[2]=je,_[3]=He,W.clearBufferiv(W.COLOR,0,_))}else Q|=W.COLOR_BUFFER_BIT}G&&(Q|=W.DEPTH_BUFFER_BIT),K&&(Q|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",ce,!1),n.removeEventListener("webglcontextrestored",U,!1),n.removeEventListener("webglcontextcreationerror",pe,!1),we.dispose(),F.dispose(),Ie.dispose(),w.dispose(),V.dispose(),oe.dispose(),R.dispose(),ae.dispose(),Re.dispose(),_e.dispose(),_e.removeEventListener("sessionstart",Et),_e.removeEventListener("sessionend",nt),me&&(me.dispose(),me=null),At.stop()};function ce(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function U(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const C=ke.autoReset,G=Z.enabled,K=Z.autoUpdate,Q=Z.needsUpdate,q=Z.type;Ne(),ke.autoReset=C,Z.enabled=G,Z.autoUpdate=K,Z.needsUpdate=Q,Z.type=q}function pe(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Me(C){const G=C.target;G.removeEventListener("dispose",Me),ze(G)}function ze(C){Oe(C),Ie.remove(C)}function Oe(C){const G=Ie.get(C).programs;G!==void 0&&(G.forEach(function(K){Re.releaseProgram(K)}),C.isShaderMaterial&&Re.releaseShaderCache(C))}this.renderBufferDirect=function(C,G,K,Q,q,Te){G===null&&(G=Le);const Ue=q.isMesh&&q.matrixWorld.determinant()<0,Be=Lv(C,G,K,Q,q);ve.setMaterial(Q,Ue);let He=K.index,Ye=1;if(Q.wireframe===!0){if(He=se.getWireframeAttribute(K),He===void 0)return;Ye=2}const Ve=K.drawRange,je=K.attributes.position;let wt=Ve.start*Ye,hn=(Ve.start+Ve.count)*Ye;Te!==null&&(wt=Math.max(wt,Te.start*Ye),hn=Math.min(hn,(Te.start+Te.count)*Ye)),He!==null?(wt=Math.max(wt,0),hn=Math.min(hn,He.count)):je!=null&&(wt=Math.max(wt,0),hn=Math.min(hn,je.count));const It=hn-wt;if(It<0||It===1/0)return;R.setup(q,Q,Be,K,He);let ii,pt=$;if(He!==null&&(ii=re.get(He),pt=ge,pt.setIndex(ii)),q.isMesh)Q.wireframe===!0?(ve.setLineWidth(Q.wireframeLinewidth*Ge()),pt.setMode(W.LINES)):pt.setMode(W.TRIANGLES);else if(q.isLine){let $e=Q.linewidth;$e===void 0&&($e=1),ve.setLineWidth($e*Ge()),q.isLineSegments?pt.setMode(W.LINES):q.isLineLoop?pt.setMode(W.LINE_LOOP):pt.setMode(W.LINE_STRIP)}else q.isPoints?pt.setMode(W.POINTS):q.isSprite&&pt.setMode(W.TRIANGLES);if(q.isBatchedMesh)pt.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else if(q.isInstancedMesh)pt.renderInstances(wt,It,q.count);else if(K.isInstancedBufferGeometry){const $e=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Ql=Math.min(K.instanceCount,$e);pt.renderInstances(wt,It,Ql)}else pt.render(wt,It)};function Je(C,G,K){C.transparent===!0&&C.side===Zn&&C.forceSinglePass===!1?(C.side=fn,C.needsUpdate=!0,$o(C,G,K),C.side=Ji,C.needsUpdate=!0,$o(C,G,K),C.side=Zn):$o(C,G,K)}this.compile=function(C,G,K=null){K===null&&(K=C),m=F.get(K),m.init(),v.push(m),K.traverseVisible(function(q){q.isLight&&q.layers.test(G.layers)&&(m.pushLight(q),q.castShadow&&m.pushShadow(q))}),C!==K&&C.traverseVisible(function(q){q.isLight&&q.layers.test(G.layers)&&(m.pushLight(q),q.castShadow&&m.pushShadow(q))}),m.setupLights(g._useLegacyLights);const Q=new Set;return C.traverse(function(q){const Te=q.material;if(Te)if(Array.isArray(Te))for(let Ue=0;Ue<Te.length;Ue++){const Be=Te[Ue];Je(Be,K,q),Q.add(Be)}else Je(Te,K,q),Q.add(Te)}),v.pop(),m=null,Q},this.compileAsync=function(C,G,K=null){const Q=this.compile(C,G,K);return new Promise(q=>{function Te(){if(Q.forEach(function(Ue){Ie.get(Ue).currentProgram.isReady()&&Q.delete(Ue)}),Q.size===0){q(C);return}setTimeout(Te,10)}Ce.get("KHR_parallel_shader_compile")!==null?Te():setTimeout(Te,10)})};let Qe=null;function xt(C){Qe&&Qe(C)}function Et(){At.stop()}function nt(){At.start()}const At=new hv;At.setAnimationLoop(xt),typeof self<"u"&&At.setContext(self),this.setAnimationLoop=function(C){Qe=C,_e.setAnimationLoop(C),C===null?At.stop():At.start()},_e.addEventListener("sessionstart",Et),_e.addEventListener("sessionend",nt),this.render=function(C,G){if(G!==void 0&&G.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),_e.enabled===!0&&_e.isPresenting===!0&&(_e.cameraAutoUpdate===!0&&_e.updateCamera(G),G=_e.getCamera()),C.isScene===!0&&C.onBeforeRender(g,C,G,S),m=F.get(C,v.length),m.init(),v.push(m),he.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),Y.setFromProjectionMatrix(he),le=this.localClippingEnabled,X=ne.init(this.clippingPlanes,le),y=we.get(C,u.length),y.init(),u.push(y),Xn(C,G,0,g.sortObjects),y.finish(),g.sortObjects===!0&&y.sort(O,H),this.info.render.frame++,X===!0&&ne.beginShadows();const K=m.state.shadowsArray;if(Z.render(K,C,G),X===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset(),Fe.render(y,C),m.setupLights(g._useLegacyLights),G.isArrayCamera){const Q=G.cameras;for(let q=0,Te=Q.length;q<Te;q++){const Ue=Q[q];Rf(y,C,Ue,Ue.viewport)}}else Rf(y,C,G);S!==null&&(b.updateMultisampleRenderTarget(S),b.updateRenderTargetMipmap(S)),C.isScene===!0&&C.onAfterRender(g,C,G),R.resetDefaultState(),L=-1,E=null,v.pop(),v.length>0?m=v[v.length-1]:m=null,u.pop(),u.length>0?y=u[u.length-1]:y=null};function Xn(C,G,K,Q){if(C.visible===!1)return;if(C.layers.test(G.layers)){if(C.isGroup)K=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(G);else if(C.isLight)m.pushLight(C),C.castShadow&&m.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Y.intersectsSprite(C)){Q&&Pe.setFromMatrixPosition(C.matrixWorld).applyMatrix4(he);const Ue=oe.update(C),Be=C.material;Be.visible&&y.push(C,Ue,Be,K,Pe.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Y.intersectsObject(C))){const Ue=oe.update(C),Be=C.material;if(Q&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Pe.copy(C.boundingSphere.center)):(Ue.boundingSphere===null&&Ue.computeBoundingSphere(),Pe.copy(Ue.boundingSphere.center)),Pe.applyMatrix4(C.matrixWorld).applyMatrix4(he)),Array.isArray(Be)){const He=Ue.groups;for(let Ye=0,Ve=He.length;Ye<Ve;Ye++){const je=He[Ye],wt=Be[je.materialIndex];wt&&wt.visible&&y.push(C,Ue,wt,K,Pe.z,je)}}else Be.visible&&y.push(C,Ue,Be,K,Pe.z,null)}}const Te=C.children;for(let Ue=0,Be=Te.length;Ue<Be;Ue++)Xn(Te[Ue],G,K,Q)}function Rf(C,G,K,Q){const q=C.opaque,Te=C.transmissive,Ue=C.transparent;m.setupLightsView(K),X===!0&&ne.setGlobalState(g.clippingPlanes,K),Te.length>0&&Pv(q,Te,G,K),Q&&ve.viewport(A.copy(Q)),q.length>0&&qo(q,G,K),Te.length>0&&qo(Te,G,K),Ue.length>0&&qo(Ue,G,K),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function Pv(C,G,K,Q){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;const Te=ue.isWebGL2;me===null&&(me=new br(1,1,{generateMipmaps:!0,type:Ce.has("EXT_color_buffer_half_float")?ko:$i,minFilter:Fo,samples:Te?4:0})),g.getDrawingBufferSize(be),Te?me.setSize(be.x,be.y):me.setSize(bl(be.x),bl(be.y));const Ue=g.getRenderTarget();g.setRenderTarget(me),g.getClearColor(ee),I=g.getClearAlpha(),I<1&&g.setClearColor(16777215,.5),g.clear();const Be=g.toneMapping;g.toneMapping=qi,qo(C,K,Q),b.updateMultisampleRenderTarget(me),b.updateRenderTargetMipmap(me);let He=!1;for(let Ye=0,Ve=G.length;Ye<Ve;Ye++){const je=G[Ye],wt=je.object,hn=je.geometry,It=je.material,ii=je.group;if(It.side===Zn&&wt.layers.test(Q.layers)){const pt=It.side;It.side=fn,It.needsUpdate=!0,Pf(wt,K,Q,hn,It,ii),It.side=pt,It.needsUpdate=!0,He=!0}}He===!0&&(b.updateMultisampleRenderTarget(me),b.updateRenderTargetMipmap(me)),g.setRenderTarget(Ue),g.setClearColor(ee,I),g.toneMapping=Be}function qo(C,G,K){const Q=G.isScene===!0?G.overrideMaterial:null;for(let q=0,Te=C.length;q<Te;q++){const Ue=C[q],Be=Ue.object,He=Ue.geometry,Ye=Q===null?Ue.material:Q,Ve=Ue.group;Be.layers.test(K.layers)&&Pf(Be,G,K,He,Ye,Ve)}}function Pf(C,G,K,Q,q,Te){C.onBeforeRender(g,G,K,Q,q,Te),C.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),q.onBeforeRender(g,G,K,Q,C,Te),q.transparent===!0&&q.side===Zn&&q.forceSinglePass===!1?(q.side=fn,q.needsUpdate=!0,g.renderBufferDirect(K,G,Q,q,C,Te),q.side=Ji,q.needsUpdate=!0,g.renderBufferDirect(K,G,Q,q,C,Te),q.side=Zn):g.renderBufferDirect(K,G,Q,q,C,Te),C.onAfterRender(g,G,K,Q,q,Te)}function $o(C,G,K){G.isScene!==!0&&(G=Le);const Q=Ie.get(C),q=m.state.lights,Te=m.state.shadowsArray,Ue=q.state.version,Be=Re.getParameters(C,q.state,Te,G,K),He=Re.getProgramCacheKey(Be);let Ye=Q.programs;Q.environment=C.isMeshStandardMaterial?G.environment:null,Q.fog=G.fog,Q.envMap=(C.isMeshStandardMaterial?V:w).get(C.envMap||Q.environment),Ye===void 0&&(C.addEventListener("dispose",Me),Ye=new Map,Q.programs=Ye);let Ve=Ye.get(He);if(Ve!==void 0){if(Q.currentProgram===Ve&&Q.lightsStateVersion===Ue)return Nf(C,Be),Ve}else Be.uniforms=Re.getUniforms(C),C.onBuild(K,Be,g),C.onBeforeCompile(Be,g),Ve=Re.acquireProgram(Be,He),Ye.set(He,Ve),Q.uniforms=Be.uniforms;const je=Q.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(je.clippingPlanes=ne.uniform),Nf(C,Be),Q.needsLights=Dv(C),Q.lightsStateVersion=Ue,Q.needsLights&&(je.ambientLightColor.value=q.state.ambient,je.lightProbe.value=q.state.probe,je.directionalLights.value=q.state.directional,je.directionalLightShadows.value=q.state.directionalShadow,je.spotLights.value=q.state.spot,je.spotLightShadows.value=q.state.spotShadow,je.rectAreaLights.value=q.state.rectArea,je.ltc_1.value=q.state.rectAreaLTC1,je.ltc_2.value=q.state.rectAreaLTC2,je.pointLights.value=q.state.point,je.pointLightShadows.value=q.state.pointShadow,je.hemisphereLights.value=q.state.hemi,je.directionalShadowMap.value=q.state.directionalShadowMap,je.directionalShadowMatrix.value=q.state.directionalShadowMatrix,je.spotShadowMap.value=q.state.spotShadowMap,je.spotLightMatrix.value=q.state.spotLightMatrix,je.spotLightMap.value=q.state.spotLightMap,je.pointShadowMap.value=q.state.pointShadowMap,je.pointShadowMatrix.value=q.state.pointShadowMatrix),Q.currentProgram=Ve,Q.uniformsList=null,Ve}function Lf(C){if(C.uniformsList===null){const G=C.currentProgram.getUniforms();C.uniformsList=Ka.seqWithValue(G.seq,C.uniforms)}return C.uniformsList}function Nf(C,G){const K=Ie.get(C);K.outputColorSpace=G.outputColorSpace,K.batching=G.batching,K.instancing=G.instancing,K.instancingColor=G.instancingColor,K.skinning=G.skinning,K.morphTargets=G.morphTargets,K.morphNormals=G.morphNormals,K.morphColors=G.morphColors,K.morphTargetsCount=G.morphTargetsCount,K.numClippingPlanes=G.numClippingPlanes,K.numIntersection=G.numClipIntersection,K.vertexAlphas=G.vertexAlphas,K.vertexTangents=G.vertexTangents,K.toneMapping=G.toneMapping}function Lv(C,G,K,Q,q){G.isScene!==!0&&(G=Le),b.resetTextureUnits();const Te=G.fog,Ue=Q.isMeshStandardMaterial?G.environment:null,Be=S===null?g.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:Mi,He=(Q.isMeshStandardMaterial?V:w).get(Q.envMap||Ue),Ye=Q.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Ve=!!K.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),je=!!K.morphAttributes.position,wt=!!K.morphAttributes.normal,hn=!!K.morphAttributes.color;let It=qi;Q.toneMapped&&(S===null||S.isXRRenderTarget===!0)&&(It=g.toneMapping);const ii=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,pt=ii!==void 0?ii.length:0,$e=Ie.get(Q),Ql=m.state.lights;if(X===!0&&(le===!0||C!==E)){const Mn=C===E&&Q.id===L;ne.setState(Q,C,Mn)}let _t=!1;Q.version===$e.__version?($e.needsLights&&$e.lightsStateVersion!==Ql.state.version||$e.outputColorSpace!==Be||q.isBatchedMesh&&$e.batching===!1||!q.isBatchedMesh&&$e.batching===!0||q.isInstancedMesh&&$e.instancing===!1||!q.isInstancedMesh&&$e.instancing===!0||q.isSkinnedMesh&&$e.skinning===!1||!q.isSkinnedMesh&&$e.skinning===!0||q.isInstancedMesh&&$e.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&$e.instancingColor===!1&&q.instanceColor!==null||$e.envMap!==He||Q.fog===!0&&$e.fog!==Te||$e.numClippingPlanes!==void 0&&($e.numClippingPlanes!==ne.numPlanes||$e.numIntersection!==ne.numIntersection)||$e.vertexAlphas!==Ye||$e.vertexTangents!==Ve||$e.morphTargets!==je||$e.morphNormals!==wt||$e.morphColors!==hn||$e.toneMapping!==It||ue.isWebGL2===!0&&$e.morphTargetsCount!==pt)&&(_t=!0):(_t=!0,$e.__version=Q.version);let ir=$e.currentProgram;_t===!0&&(ir=$o(Q,G,q));let Df=!1,Bs=!1,ec=!1;const Gt=ir.getUniforms(),rr=$e.uniforms;if(ve.useProgram(ir.program)&&(Df=!0,Bs=!0,ec=!0),Q.id!==L&&(L=Q.id,Bs=!0),Df||E!==C){Gt.setValue(W,"projectionMatrix",C.projectionMatrix),Gt.setValue(W,"viewMatrix",C.matrixWorldInverse);const Mn=Gt.map.cameraPosition;Mn!==void 0&&Mn.setValue(W,Pe.setFromMatrixPosition(C.matrixWorld)),ue.logarithmicDepthBuffer&&Gt.setValue(W,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&Gt.setValue(W,"isOrthographic",C.isOrthographicCamera===!0),E!==C&&(E=C,Bs=!0,ec=!0)}if(q.isSkinnedMesh){Gt.setOptional(W,q,"bindMatrix"),Gt.setOptional(W,q,"bindMatrixInverse");const Mn=q.skeleton;Mn&&(ue.floatVertexTextures?(Mn.boneTexture===null&&Mn.computeBoneTexture(),Gt.setValue(W,"boneTexture",Mn.boneTexture,b)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}q.isBatchedMesh&&(Gt.setOptional(W,q,"batchingTexture"),Gt.setValue(W,"batchingTexture",q._matricesTexture,b));const tc=K.morphAttributes;if((tc.position!==void 0||tc.normal!==void 0||tc.color!==void 0&&ue.isWebGL2===!0)&&De.update(q,K,ir),(Bs||$e.receiveShadow!==q.receiveShadow)&&($e.receiveShadow=q.receiveShadow,Gt.setValue(W,"receiveShadow",q.receiveShadow)),Q.isMeshGouraudMaterial&&Q.envMap!==null&&(rr.envMap.value=He,rr.flipEnvMap.value=He.isCubeTexture&&He.isRenderTargetTexture===!1?-1:1),Bs&&(Gt.setValue(W,"toneMappingExposure",g.toneMappingExposure),$e.needsLights&&Nv(rr,ec),Te&&Q.fog===!0&&Se.refreshFogUniforms(rr,Te),Se.refreshMaterialUniforms(rr,Q,J,k,me),Ka.upload(W,Lf($e),rr,b)),Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(Ka.upload(W,Lf($e),rr,b),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&Gt.setValue(W,"center",q.center),Gt.setValue(W,"modelViewMatrix",q.modelViewMatrix),Gt.setValue(W,"normalMatrix",q.normalMatrix),Gt.setValue(W,"modelMatrix",q.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){const Mn=Q.uniformsGroups;for(let nc=0,Iv=Mn.length;nc<Iv;nc++)if(ue.isWebGL2){const If=Mn[nc];ae.update(If,ir),ae.bind(If,ir)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ir}function Nv(C,G){C.ambientLightColor.needsUpdate=G,C.lightProbe.needsUpdate=G,C.directionalLights.needsUpdate=G,C.directionalLightShadows.needsUpdate=G,C.pointLights.needsUpdate=G,C.pointLightShadows.needsUpdate=G,C.spotLights.needsUpdate=G,C.spotLightShadows.needsUpdate=G,C.rectAreaLights.needsUpdate=G,C.hemisphereLights.needsUpdate=G}function Dv(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(C,G,K){Ie.get(C.texture).__webglTexture=G,Ie.get(C.depthTexture).__webglTexture=K;const Q=Ie.get(C);Q.__hasExternalTextures=!0,Q.__hasExternalTextures&&(Q.__autoAllocateDepthBuffer=K===void 0,Q.__autoAllocateDepthBuffer||Ce.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Q.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(C,G){const K=Ie.get(C);K.__webglFramebuffer=G,K.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(C,G=0,K=0){S=C,P=G,T=K;let Q=!0,q=null,Te=!1,Ue=!1;if(C){const He=Ie.get(C);He.__useDefaultFramebuffer!==void 0?(ve.bindFramebuffer(W.FRAMEBUFFER,null),Q=!1):He.__webglFramebuffer===void 0?b.setupRenderTarget(C):He.__hasExternalTextures&&b.rebindTextures(C,Ie.get(C.texture).__webglTexture,Ie.get(C.depthTexture).__webglTexture);const Ye=C.texture;(Ye.isData3DTexture||Ye.isDataArrayTexture||Ye.isCompressedArrayTexture)&&(Ue=!0);const Ve=Ie.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ve[G])?q=Ve[G][K]:q=Ve[G],Te=!0):ue.isWebGL2&&C.samples>0&&b.useMultisampledRTT(C)===!1?q=Ie.get(C).__webglMultisampledFramebuffer:Array.isArray(Ve)?q=Ve[K]:q=Ve,A.copy(C.viewport),B.copy(C.scissor),D=C.scissorTest}else A.copy(j).multiplyScalar(J).floor(),B.copy(te).multiplyScalar(J).floor(),D=ie;if(ve.bindFramebuffer(W.FRAMEBUFFER,q)&&ue.drawBuffers&&Q&&ve.drawBuffers(C,q),ve.viewport(A),ve.scissor(B),ve.setScissorTest(D),Te){const He=Ie.get(C.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+G,He.__webglTexture,K)}else if(Ue){const He=Ie.get(C.texture),Ye=G||0;W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,He.__webglTexture,K||0,Ye)}L=-1},this.readRenderTargetPixels=function(C,G,K,Q,q,Te,Ue){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Be=Ie.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ue!==void 0&&(Be=Be[Ue]),Be){ve.bindFramebuffer(W.FRAMEBUFFER,Be);try{const He=C.texture,Ye=He.format,Ve=He.type;if(Ye!==Gn&&de.convert(Ye)!==W.getParameter(W.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const je=Ve===ko&&(Ce.has("EXT_color_buffer_half_float")||ue.isWebGL2&&Ce.has("EXT_color_buffer_float"));if(Ve!==$i&&de.convert(Ve)!==W.getParameter(W.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ve===ki&&(ue.isWebGL2||Ce.has("OES_texture_float")||Ce.has("WEBGL_color_buffer_float")))&&!je){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=C.width-Q&&K>=0&&K<=C.height-q&&W.readPixels(G,K,Q,q,de.convert(Ye),de.convert(Ve),Te)}finally{const He=S!==null?Ie.get(S).__webglFramebuffer:null;ve.bindFramebuffer(W.FRAMEBUFFER,He)}}},this.copyFramebufferToTexture=function(C,G,K=0){const Q=Math.pow(2,-K),q=Math.floor(G.image.width*Q),Te=Math.floor(G.image.height*Q);b.setTexture2D(G,0),W.copyTexSubImage2D(W.TEXTURE_2D,K,0,0,C.x,C.y,q,Te),ve.unbindTexture()},this.copyTextureToTexture=function(C,G,K,Q=0){const q=G.image.width,Te=G.image.height,Ue=de.convert(K.format),Be=de.convert(K.type);b.setTexture2D(K,0),W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,K.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,K.unpackAlignment),G.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,Q,C.x,C.y,q,Te,Ue,Be,G.image.data):G.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,Q,C.x,C.y,G.mipmaps[0].width,G.mipmaps[0].height,Ue,G.mipmaps[0].data):W.texSubImage2D(W.TEXTURE_2D,Q,C.x,C.y,Ue,Be,G.image),Q===0&&K.generateMipmaps&&W.generateMipmap(W.TEXTURE_2D),ve.unbindTexture()},this.copyTextureToTexture3D=function(C,G,K,Q,q=0){if(g.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Te=C.max.x-C.min.x+1,Ue=C.max.y-C.min.y+1,Be=C.max.z-C.min.z+1,He=de.convert(Q.format),Ye=de.convert(Q.type);let Ve;if(Q.isData3DTexture)b.setTexture3D(Q,0),Ve=W.TEXTURE_3D;else if(Q.isDataArrayTexture||Q.isCompressedArrayTexture)b.setTexture2DArray(Q,0),Ve=W.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,Q.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,Q.unpackAlignment);const je=W.getParameter(W.UNPACK_ROW_LENGTH),wt=W.getParameter(W.UNPACK_IMAGE_HEIGHT),hn=W.getParameter(W.UNPACK_SKIP_PIXELS),It=W.getParameter(W.UNPACK_SKIP_ROWS),ii=W.getParameter(W.UNPACK_SKIP_IMAGES),pt=K.isCompressedTexture?K.mipmaps[q]:K.image;W.pixelStorei(W.UNPACK_ROW_LENGTH,pt.width),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,pt.height),W.pixelStorei(W.UNPACK_SKIP_PIXELS,C.min.x),W.pixelStorei(W.UNPACK_SKIP_ROWS,C.min.y),W.pixelStorei(W.UNPACK_SKIP_IMAGES,C.min.z),K.isDataTexture||K.isData3DTexture?W.texSubImage3D(Ve,q,G.x,G.y,G.z,Te,Ue,Be,He,Ye,pt.data):K.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),W.compressedTexSubImage3D(Ve,q,G.x,G.y,G.z,Te,Ue,Be,He,pt.data)):W.texSubImage3D(Ve,q,G.x,G.y,G.z,Te,Ue,Be,He,Ye,pt),W.pixelStorei(W.UNPACK_ROW_LENGTH,je),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,wt),W.pixelStorei(W.UNPACK_SKIP_PIXELS,hn),W.pixelStorei(W.UNPACK_SKIP_ROWS,It),W.pixelStorei(W.UNPACK_SKIP_IMAGES,ii),q===0&&Q.generateMipmaps&&W.generateMipmap(Ve),ve.unbindTexture()},this.initTexture=function(C){C.isCubeTexture?b.setTextureCube(C,0):C.isData3DTexture?b.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?b.setTexture2DArray(C,0):b.setTexture2D(C,0),ve.unbindTexture()},this.resetState=function(){P=0,T=0,S=null,ve.reset(),R.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===pf?"display-p3":"srgb",n.unpackColorSpace=st.workingColorSpace===Xl?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===St?Sr:ev}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Sr?St:Mi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class k2 extends _f{}k2.prototype.isWebGL1Renderer=!0;class yf{constructor(e,n=1,i=1e3){this.isFog=!0,this.name="",this.color=new qe(e),this.near=n,this.far=i}clone(){return new yf(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Sv extends kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n}}class Mv extends ks{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const um=new N,dm=new N,fm=new Mt,ru=new ql,Ua=new Yl;class hm extends kt{constructor(e=new $t,n=new Mv){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)um.fromBufferAttribute(n,r-1),dm.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=um.distanceTo(dm);e.setAttribute("lineDistance",new at(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ua.copy(i.boundingSphere),Ua.applyMatrix4(r),Ua.radius+=s,e.ray.intersectsSphere(Ua)===!1)return;fm.copy(r).invert(),ru.copy(e.ray).applyMatrix4(fm);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new N,d=new N,f=new N,h=new N,p=this.isLineSegments?2:1,_=i.index,m=i.attributes.position;if(_!==null){const u=Math.max(0,o.start),v=Math.min(_.count,o.start+o.count);for(let g=u,M=v-1;g<M;g+=p){const P=_.getX(g),T=_.getX(g+1);if(c.fromBufferAttribute(m,P),d.fromBufferAttribute(m,T),ru.distanceSqToSegment(c,d,h,f)>l)continue;h.applyMatrix4(this.matrixWorld);const L=e.ray.origin.distanceTo(h);L<e.near||L>e.far||n.push({distance:L,point:f.clone().applyMatrix4(this.matrixWorld),index:g,face:null,faceIndex:null,object:this})}}else{const u=Math.max(0,o.start),v=Math.min(m.count,o.start+o.count);for(let g=u,M=v-1;g<M;g+=p){if(c.fromBufferAttribute(m,g),d.fromBufferAttribute(m,g+1),ru.distanceSqToSegment(c,d,h,f)>l)continue;h.applyMatrix4(this.matrixWorld);const T=e.ray.origin.distanceTo(h);T<e.near||T>e.far||n.push({distance:T,point:f.clone().applyMatrix4(this.matrixWorld),index:g,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}class Sf extends tn{constructor(e,n,i,r,s,o,a,l,c){super(e,n,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ni{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,n){const i=this.getUtoTmapping(e);return this.getPoint(i,n)}getPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return n}getSpacedPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPointAt(i/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,r=this.getPoint(0),s=0;n.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),n.push(s),r=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n){const i=this.getLengths();let r=0;const s=i.length;let o;n?o=n:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const d=i[r],h=i[r+1]-d,p=(o-d)/h;return(r+p)/(s-1)}getTangent(e,n){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=n||(o.isVector2?new ye:new N);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,n){const i=this.getUtoTmapping(e);return this.getTangent(i,n)}computeFrenetFrames(e,n){const i=new N,r=[],s=[],o=[],a=new N,l=new Mt;for(let p=0;p<=e;p++){const _=p/e;r[p]=this.getTangentAt(_,new N)}s[0]=new N,o[0]=new N;let c=Number.MAX_VALUE;const d=Math.abs(r[0].x),f=Math.abs(r[0].y),h=Math.abs(r[0].z);d<=c&&(c=d,i.set(1,0,0)),f<=c&&(c=f,i.set(0,1,0)),h<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const _=Math.acos(Ct(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,_))}o[p].crossVectors(r[p],s[p])}if(n===!0){let p=Math.acos(Ct(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(p=-p);for(let _=1;_<=e;_++)s[_].applyMatrix4(l.makeRotationAxis(r[_],p*_)),o[_].crossVectors(r[_],s[_])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Mf extends ni{constructor(e=0,n=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=n,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,n){const i=n||new ye,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const d=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=l-this.aX,p=c-this.aY;l=h*d-p*f+this.aX,c=h*f+p*d+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class z2 extends Mf{constructor(e,n,i,r,s,o){super(e,n,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ef(){let t=0,e=0,n=0,i=0;function r(s,o,a,l){t=s,e=a,n=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,d,f){let h=(o-s)/c-(a-s)/(c+d)+(a-o)/d,p=(a-o)/d-(l-o)/(d+f)+(l-a)/f;h*=d,p*=d,r(o,a,h,p)},calc:function(s){const o=s*s,a=o*s;return t+e*s+n*o+i*a}}}const Oa=new N,su=new Ef,ou=new Ef,au=new Ef;class B2 extends ni{constructor(e=[],n=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=n,this.curveType=i,this.tension=r}getPoint(e,n=new N){const i=n,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,d;this.closed||a>0?c=r[(a-1)%s]:(Oa.subVectors(r[0],r[1]).add(r[0]),c=Oa);const f=r[a%s],h=r[(a+1)%s];if(this.closed||a+2<s?d=r[(a+2)%s]:(Oa.subVectors(r[s-1],r[s-2]).add(r[s-1]),d=Oa),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let _=Math.pow(c.distanceToSquared(f),p),y=Math.pow(f.distanceToSquared(h),p),m=Math.pow(h.distanceToSquared(d),p);y<1e-4&&(y=1),_<1e-4&&(_=y),m<1e-4&&(m=y),su.initNonuniformCatmullRom(c.x,f.x,h.x,d.x,_,y,m),ou.initNonuniformCatmullRom(c.y,f.y,h.y,d.y,_,y,m),au.initNonuniformCatmullRom(c.z,f.z,h.z,d.z,_,y,m)}else this.curveType==="catmullrom"&&(su.initCatmullRom(c.x,f.x,h.x,d.x,this.tension),ou.initCatmullRom(c.y,f.y,h.y,d.y,this.tension),au.initCatmullRom(c.z,f.z,h.z,d.z,this.tension));return i.set(su.calc(l),ou.calc(l),au.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new N().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function pm(t,e,n,i,r){const s=(i-e)*.5,o=(r-n)*.5,a=t*t,l=t*a;return(2*n-2*i+s+o)*l+(-3*n+3*i-2*s-o)*a+s*t+n}function H2(t,e){const n=1-t;return n*n*e}function G2(t,e){return 2*(1-t)*t*e}function V2(t,e){return t*t*e}function vo(t,e,n,i){return H2(t,e)+G2(t,n)+V2(t,i)}function j2(t,e){const n=1-t;return n*n*n*e}function W2(t,e){const n=1-t;return 3*n*n*t*e}function X2(t,e){return 3*(1-t)*t*t*e}function Y2(t,e){return t*t*t*e}function xo(t,e,n,i,r){return j2(t,e)+W2(t,n)+X2(t,i)+Y2(t,r)}class Ev extends ni{constructor(e=new ye,n=new ye,i=new ye,r=new ye){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new ye){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(xo(e,r.x,s.x,o.x,a.x),xo(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class q2 extends ni{constructor(e=new N,n=new N,i=new N,r=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new N){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(xo(e,r.x,s.x,o.x,a.x),xo(e,r.y,s.y,o.y,a.y),xo(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class wv extends ni{constructor(e=new ye,n=new ye){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=n}getPoint(e,n=new ye){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new ye){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class $2 extends ni{constructor(e=new N,n=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=n}getPoint(e,n=new N){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new N){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Tv extends ni{constructor(e=new ye,n=new ye,i=new ye){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new ye){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(vo(e,r.x,s.x,o.x),vo(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class K2 extends ni{constructor(e=new N,n=new N,i=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new N){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(vo(e,r.x,s.x,o.x),vo(e,r.y,s.y,o.y),vo(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Av extends ni{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,n=new ye){const i=n,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],d=r[o>r.length-2?r.length-1:o+1],f=r[o>r.length-3?r.length-1:o+2];return i.set(pm(a,l.x,c.x,d.x,f.x),pm(a,l.y,c.y,d.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new ye().fromArray(r))}return this}}var mm=Object.freeze({__proto__:null,ArcCurve:z2,CatmullRomCurve3:B2,CubicBezierCurve:Ev,CubicBezierCurve3:q2,EllipseCurve:Mf,LineCurve:wv,LineCurve3:$2,QuadraticBezierCurve:Tv,QuadraticBezierCurve3:K2,SplineCurve:Av});class Z2 extends ni{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(n)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new mm[i](n,e))}return this}getPoint(e,n){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,n)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let n=0;for(let i=0,r=this.curves.length;i<r;i++)n+=this.curves[i].getLength(),e.push(n);return this.cacheLengths=e,e}getSpacedPoints(e=40){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return this.autoClose&&n.push(n[0]),n}getPoints(e=12){const n=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const d=l[c];i&&i.equals(d)||(n.push(d),i=d)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(e){super.copy(e),this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let n=0,i=this.curves.length;n<i;n++){const r=this.curves[n];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(new mm[r.type]().fromJSON(r))}return this}}class J2 extends Z2{constructor(e){super(),this.type="Path",this.currentPoint=new ye,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let n=1,i=e.length;n<i;n++)this.lineTo(e[n].x,e[n].y);return this}moveTo(e,n){return this.currentPoint.set(e,n),this}lineTo(e,n){const i=new wv(this.currentPoint.clone(),new ye(e,n));return this.curves.push(i),this.currentPoint.set(e,n),this}quadraticCurveTo(e,n,i,r){const s=new Tv(this.currentPoint.clone(),new ye(e,n),new ye(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,n,i,r,s,o){const a=new Ev(this.currentPoint.clone(),new ye(e,n),new ye(i,r),new ye(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const n=[this.currentPoint.clone()].concat(e),i=new Av(n);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,n,i,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,n+l,i,r,s,o),this}absarc(e,n,i,r,s,o){return this.absellipse(e,n,i,i,r,s,o),this}ellipse(e,n,i,r,s,o,a,l){const c=this.currentPoint.x,d=this.currentPoint.y;return this.absellipse(e+c,n+d,i,r,s,o,a,l),this}absellipse(e,n,i,r,s,o,a,l){const c=new Mf(e,n,i,r,s,o,a,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const d=c.getPoint(1);return this.currentPoint.copy(d),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class wf extends $t{constructor(e=[new ye(0,-.5),new ye(.5,0),new ye(0,.5)],n=12,i=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:n,phiStart:i,phiLength:r},n=Math.floor(n),r=Ct(r,0,Math.PI*2);const s=[],o=[],a=[],l=[],c=[],d=1/n,f=new N,h=new ye,p=new N,_=new N,y=new N;let m=0,u=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:m=e[v+1].x-e[v].x,u=e[v+1].y-e[v].y,p.x=u*1,p.y=-m,p.z=u*0,y.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(y.x,y.y,y.z);break;default:m=e[v+1].x-e[v].x,u=e[v+1].y-e[v].y,p.x=u*1,p.y=-m,p.z=u*0,_.copy(p),p.x+=y.x,p.y+=y.y,p.z+=y.z,p.normalize(),l.push(p.x,p.y,p.z),y.copy(_)}for(let v=0;v<=n;v++){const g=i+v*d*r,M=Math.sin(g),P=Math.cos(g);for(let T=0;T<=e.length-1;T++){f.x=e[T].x*M,f.y=e[T].y,f.z=e[T].x*P,o.push(f.x,f.y,f.z),h.x=v/n,h.y=T/(e.length-1),a.push(h.x,h.y);const S=l[3*T+0]*M,L=l[3*T+1],E=l[3*T+0]*P;c.push(S,L,E)}}for(let v=0;v<n;v++)for(let g=0;g<e.length-1;g++){const M=g+v*e.length,P=M,T=M+e.length,S=M+e.length+1,L=M+1;s.push(P,T,L),s.push(S,L,T)}this.setIndex(s),this.setAttribute("position",new at(o,3)),this.setAttribute("uv",new at(a,2)),this.setAttribute("normal",new at(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wf(e.points,e.segments,e.phiStart,e.phiLength)}}class hs extends wf{constructor(e=1,n=1,i=4,r=8){const s=new J2;s.absarc(0,-n/2,e,Math.PI*1.5,0),s.absarc(0,n/2,e,0,Math.PI*.5),super(s.getPoints(i),r),this.type="CapsuleGeometry",this.parameters={radius:e,length:n,capSegments:i,radialSegments:r}}static fromJSON(e){return new hs(e.radius,e.length,e.capSegments,e.radialSegments)}}class Zl extends $t{constructor(e=1,n=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:n,thetaStart:i,thetaLength:r},n=Math.max(3,n);const s=[],o=[],a=[],l=[],c=new N,d=new ye;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let f=0,h=3;f<=n;f++,h+=3){const p=i+f/n*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),d.x=(o[h]/e+1)/2,d.y=(o[h+1]/e+1)/2,l.push(d.x,d.y)}for(let f=1;f<=n;f++)s.push(f,f+1,0);this.setIndex(s),this.setAttribute("position",new at(o,3)),this.setAttribute("normal",new at(a,3)),this.setAttribute("uv",new at(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zl(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Jn extends $t{constructor(e=1,n=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const d=[],f=[],h=[],p=[];let _=0;const y=[],m=i/2;let u=0;v(),o===!1&&(e>0&&g(!0),n>0&&g(!1)),this.setIndex(d),this.setAttribute("position",new at(f,3)),this.setAttribute("normal",new at(h,3)),this.setAttribute("uv",new at(p,2));function v(){const M=new N,P=new N;let T=0;const S=(n-e)/i;for(let L=0;L<=s;L++){const E=[],A=L/s,B=A*(n-e)+e;for(let D=0;D<=r;D++){const ee=D/r,I=ee*l+a,z=Math.sin(I),k=Math.cos(I);P.x=B*z,P.y=-A*i+m,P.z=B*k,f.push(P.x,P.y,P.z),M.set(z,S,k).normalize(),h.push(M.x,M.y,M.z),p.push(ee,1-A),E.push(_++)}y.push(E)}for(let L=0;L<r;L++)for(let E=0;E<s;E++){const A=y[E][L],B=y[E+1][L],D=y[E+1][L+1],ee=y[E][L+1];d.push(A,B,ee),d.push(B,D,ee),T+=6}c.addGroup(u,T,0),u+=T}function g(M){const P=_,T=new ye,S=new N;let L=0;const E=M===!0?e:n,A=M===!0?1:-1;for(let D=1;D<=r;D++)f.push(0,m*A,0),h.push(0,A,0),p.push(.5,.5),_++;const B=_;for(let D=0;D<=r;D++){const I=D/r*l+a,z=Math.cos(I),k=Math.sin(I);S.x=E*k,S.y=m*A,S.z=E*z,f.push(S.x,S.y,S.z),h.push(0,A,0),T.x=z*.5+.5,T.y=k*.5*A+.5,p.push(T.x,T.y),_++}for(let D=0;D<r;D++){const ee=P+D,I=B+D;M===!0?d.push(I,I+1,ee):d.push(I+1,I,ee),L+=3}c.addGroup(u,L,M===!0?1:2),u+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Tf extends Jn{constructor(e=1,n=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,n,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:n,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Tf(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Af extends $t{constructor(e=.5,n=1,i=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:n,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:o},i=Math.max(3,i),r=Math.max(1,r);const a=[],l=[],c=[],d=[];let f=e;const h=(n-e)/r,p=new N,_=new ye;for(let y=0;y<=r;y++){for(let m=0;m<=i;m++){const u=s+m/i*o;p.x=f*Math.cos(u),p.y=f*Math.sin(u),l.push(p.x,p.y,p.z),c.push(0,0,1),_.x=(p.x/n+1)/2,_.y=(p.y/n+1)/2,d.push(_.x,_.y)}f+=h}for(let y=0;y<r;y++){const m=y*(i+1);for(let u=0;u<i;u++){const v=u+m,g=v,M=v+i+1,P=v+i+2,T=v+1;a.push(g,M,T),a.push(M,P,T)}}this.setIndex(a),this.setAttribute("position",new at(l,3)),this.setAttribute("normal",new at(c,3)),this.setAttribute("uv",new at(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Af(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class di extends $t{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const d=[],f=new N,h=new N,p=[],_=[],y=[],m=[];for(let u=0;u<=i;u++){const v=[],g=u/i;let M=0;u===0&&o===0?M=.5/n:u===i&&l===Math.PI&&(M=-.5/n);for(let P=0;P<=n;P++){const T=P/n;f.x=-e*Math.cos(r+T*s)*Math.sin(o+g*a),f.y=e*Math.cos(o+g*a),f.z=e*Math.sin(r+T*s)*Math.sin(o+g*a),_.push(f.x,f.y,f.z),h.copy(f).normalize(),y.push(h.x,h.y,h.z),m.push(T+M,1-g),v.push(c++)}d.push(v)}for(let u=0;u<i;u++)for(let v=0;v<n;v++){const g=d[u][v+1],M=d[u][v],P=d[u+1][v],T=d[u+1][v+1];(u!==0||o>0)&&p.push(g,M,T),(u!==i-1||l<Math.PI)&&p.push(M,P,T)}this.setIndex(p),this.setAttribute("position",new at(_,3)),this.setAttribute("normal",new at(y,3)),this.setAttribute("uv",new at(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new di(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ho extends $t{constructor(e=1,n=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:n,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const o=[],a=[],l=[],c=[],d=new N,f=new N,h=new N;for(let p=0;p<=i;p++)for(let _=0;_<=r;_++){const y=_/r*s,m=p/i*Math.PI*2;f.x=(e+n*Math.cos(m))*Math.cos(y),f.y=(e+n*Math.cos(m))*Math.sin(y),f.z=n*Math.sin(m),a.push(f.x,f.y,f.z),d.x=e*Math.cos(y),d.y=e*Math.sin(y),h.subVectors(f,d).normalize(),l.push(h.x,h.y,h.z),c.push(_/r),c.push(p/i)}for(let p=1;p<=i;p++)for(let _=1;_<=r;_++){const y=(r+1)*p+_-1,m=(r+1)*(p-1)+_-1,u=(r+1)*(p-1)+_,v=(r+1)*p+_;o.push(y,m,v),o.push(m,u,v)}this.setIndex(o),this.setAttribute("position",new at(a,3)),this.setAttribute("normal",new at(l,3)),this.setAttribute("uv",new at(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ho(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class hi extends ks{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tv,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Q2 extends hi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ye(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ct(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new qe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new qe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new qe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}const gm={enabled:!1,files:{},add:function(t,e){this.enabled!==!1&&(this.files[t]=e)},get:function(t){if(this.enabled!==!1)return this.files[t]},remove:function(t){delete this.files[t]},clear:function(){this.files={}}};class eA{constructor(e,n,i){const r=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=n,this.onError=i,this.itemStart=function(d){a++,s===!1&&r.onStart!==void 0&&r.onStart(d,o,a),s=!0},this.itemEnd=function(d){o++,r.onProgress!==void 0&&r.onProgress(d,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(d){r.onError!==void 0&&r.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,f){return c.push(d,f),this},this.removeHandler=function(d){const f=c.indexOf(d);return f!==-1&&c.splice(f,2),this},this.getHandler=function(d){for(let f=0,h=c.length;f<h;f+=2){const p=c[f],_=c[f+1];if(p.global&&(p.lastIndex=0),p.test(d))return _}return null}}}const tA=new eA;class bf{constructor(e){this.manager=e!==void 0?e:tA,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,n){const i=this;return new Promise(function(r,s){i.load(e,r,n,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}bf.DEFAULT_MATERIAL_NAME="__DEFAULT";class nA extends bf{constructor(e){super(e)}load(e,n,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=gm.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){n&&n(o),s.manager.itemEnd(e)},0),o;const a=Bo("img");function l(){d(),gm.add(e,this),n&&n(this),s.manager.itemEnd(e)}function c(f){d(),r&&r(f),s.manager.itemError(e),s.manager.itemEnd(e)}function d(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class iA extends bf{constructor(e){super(e)}load(e,n,i,r){const s=new tn,o=new nA(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,n!==void 0&&n(s)},i,r),s}}class Jl extends kt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),n}}class rA extends Jl{constructor(e,n,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qe(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}}const lu=new Mt,vm=new N,xm=new N;class bv{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ye(512,512),this.map=null,this.mapPass=null,this.matrix=new Mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vf,this._frameExtents=new ye(1,1),this._viewportCount=1,this._viewports=[new ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;vm.setFromMatrixPosition(e.matrixWorld),n.position.copy(vm),xm.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(xm),n.updateMatrixWorld(),lu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(lu),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(lu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const _m=new Mt,Qs=new N,cu=new N;class sA extends bv{constructor(){super(new an(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ye(4,2),this._viewportCount=6,this._viewports=[new ht(2,1,1,1),new ht(0,1,1,1),new ht(3,1,1,1),new ht(1,1,1,1),new ht(3,0,1,1),new ht(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(e,n=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),Qs.setFromMatrixPosition(e.matrixWorld),i.position.copy(Qs),cu.copy(i.position),cu.add(this._cubeDirections[n]),i.up.copy(this._cubeUps[n]),i.lookAt(cu),i.updateMatrixWorld(),r.makeTranslation(-Qs.x,-Qs.y,-Qs.z),_m.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_m)}}class _o extends Jl{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new sA}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class oA extends bv{constructor(){super(new pv(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class pd extends Jl{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.shadow=new oA}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class aA extends Jl{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class Cv{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=ym(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=ym();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}function ym(){return(typeof performance>"u"?Date:performance).now()}class lA{constructor(e,n,i=0,r=1/0){this.ray=new ql(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new gf,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}intersectObject(e,n=!0,i=[]){return md(e,this,i,n),i.sort(Sm),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)md(e[r],this,i,n);return i.sort(Sm),i}}function Sm(t,e){return t.distance-e.distance}function md(t,e,n,i){if(t.layers.test(e.layers)&&t.raycast(e,n),i===!0){const r=t.children;for(let s=0,o=r.length;s<o;s++)md(r[s],e,n,!0)}}class Mm{constructor(e=1,n=0,i=0){return this.radius=e,this.phi=n,this.theta=i,this}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ct(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:df}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=df);const Em={type:"change"},uu={type:"start"},wm={type:"end"},Fa=new ql,Tm=new Ni,cA=Math.cos(70*sn.DEG2RAD);class uA extends Nr{constructor(e,n){super(),this.object=e,this.domElement=n,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ir.ROTATE,MIDDLE:Ir.DOLLY,RIGHT:Ir.PAN},this.touches={ONE:Ur.ROTATE,TWO:Ur.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(R){R.addEventListener("keydown",F),this._domElementKeyEvents=R},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",F),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(Em),i.update(),s=r.NONE},this.update=function(){const R=new N,ae=new Cr().setFromUnitVectors(e.up,new N(0,1,0)),Ne=ae.clone().invert(),_e=new N,ce=new Cr,U=new N,pe=2*Math.PI;return function(ze=null){const Oe=i.object.position;R.copy(Oe).sub(i.target),R.applyQuaternion(ae),a.setFromVector3(R),i.autoRotate&&s===r.NONE&&D(A(ze)),i.enableDamping?(a.theta+=l.theta*i.dampingFactor,a.phi+=l.phi*i.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let Je=i.minAzimuthAngle,Qe=i.maxAzimuthAngle;isFinite(Je)&&isFinite(Qe)&&(Je<-Math.PI?Je+=pe:Je>Math.PI&&(Je-=pe),Qe<-Math.PI?Qe+=pe:Qe>Math.PI&&(Qe-=pe),Je<=Qe?a.theta=Math.max(Je,Math.min(Qe,a.theta)):a.theta=a.theta>(Je+Qe)/2?Math.max(Je,a.theta):Math.min(Qe,a.theta)),a.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,a.phi)),a.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(d,i.dampingFactor):i.target.add(d),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor),i.zoomToCursor&&T||i.object.isOrthographicCamera?a.radius=j(a.radius):a.radius=j(a.radius*c),R.setFromSpherical(a),R.applyQuaternion(Ne),Oe.copy(i.target).add(R),i.object.lookAt(i.target),i.enableDamping===!0?(l.theta*=1-i.dampingFactor,l.phi*=1-i.dampingFactor,d.multiplyScalar(1-i.dampingFactor)):(l.set(0,0,0),d.set(0,0,0));let xt=!1;if(i.zoomToCursor&&T){let Et=null;if(i.object.isPerspectiveCamera){const nt=R.length();Et=j(nt*c);const At=nt-Et;i.object.position.addScaledVector(M,At),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){const nt=new N(P.x,P.y,0);nt.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),xt=!0;const At=new N(P.x,P.y,0);At.unproject(i.object),i.object.position.sub(At).add(nt),i.object.updateMatrixWorld(),Et=R.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;Et!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(Et).add(i.object.position):(Fa.origin.copy(i.object.position),Fa.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(Fa.direction))<cA?e.lookAt(i.target):(Tm.setFromNormalAndCoplanarPoint(i.object.up,i.target),Fa.intersectPlane(Tm,i.target))))}else i.object.isOrthographicCamera&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),xt=!0);return c=1,T=!1,xt||_e.distanceToSquared(i.object.position)>o||8*(1-ce.dot(i.object.quaternion))>o||U.distanceToSquared(i.target)>0?(i.dispatchEvent(Em),_e.copy(i.object.position),ce.copy(i.object.quaternion),U.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",Fe),i.domElement.removeEventListener("pointerdown",b),i.domElement.removeEventListener("pointercancel",V),i.domElement.removeEventListener("wheel",oe),i.domElement.removeEventListener("pointermove",w),i.domElement.removeEventListener("pointerup",V),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",F),i._domElementKeyEvents=null)};const i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const o=1e-6,a=new Mm,l=new Mm;let c=1;const d=new N,f=new ye,h=new ye,p=new ye,_=new ye,y=new ye,m=new ye,u=new ye,v=new ye,g=new ye,M=new N,P=new ye;let T=!1;const S=[],L={};let E=!1;function A(R){return R!==null?2*Math.PI/60*i.autoRotateSpeed*R:2*Math.PI/60/60*i.autoRotateSpeed}function B(R){const ae=Math.abs(R*.01);return Math.pow(.95,i.zoomSpeed*ae)}function D(R){l.theta-=R}function ee(R){l.phi-=R}const I=function(){const R=new N;return function(Ne,_e){R.setFromMatrixColumn(_e,0),R.multiplyScalar(-Ne),d.add(R)}}(),z=function(){const R=new N;return function(Ne,_e){i.screenSpacePanning===!0?R.setFromMatrixColumn(_e,1):(R.setFromMatrixColumn(_e,0),R.crossVectors(i.object.up,R)),R.multiplyScalar(Ne),d.add(R)}}(),k=function(){const R=new N;return function(Ne,_e){const ce=i.domElement;if(i.object.isPerspectiveCamera){const U=i.object.position;R.copy(U).sub(i.target);let pe=R.length();pe*=Math.tan(i.object.fov/2*Math.PI/180),I(2*Ne*pe/ce.clientHeight,i.object.matrix),z(2*_e*pe/ce.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(I(Ne*(i.object.right-i.object.left)/i.object.zoom/ce.clientWidth,i.object.matrix),z(_e*(i.object.top-i.object.bottom)/i.object.zoom/ce.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function J(R){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c/=R:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function O(R){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c*=R:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function H(R,ae){if(!i.zoomToCursor)return;T=!0;const Ne=i.domElement.getBoundingClientRect(),_e=R-Ne.left,ce=ae-Ne.top,U=Ne.width,pe=Ne.height;P.x=_e/U*2-1,P.y=-(ce/pe)*2+1,M.set(P.x,P.y,1).unproject(i.object).sub(i.object.position).normalize()}function j(R){return Math.max(i.minDistance,Math.min(i.maxDistance,R))}function te(R){f.set(R.clientX,R.clientY)}function ie(R){H(R.clientX,R.clientX),u.set(R.clientX,R.clientY)}function Y(R){_.set(R.clientX,R.clientY)}function X(R){h.set(R.clientX,R.clientY),p.subVectors(h,f).multiplyScalar(i.rotateSpeed);const ae=i.domElement;D(2*Math.PI*p.x/ae.clientHeight),ee(2*Math.PI*p.y/ae.clientHeight),f.copy(h),i.update()}function le(R){v.set(R.clientX,R.clientY),g.subVectors(v,u),g.y>0?J(B(g.y)):g.y<0&&O(B(g.y)),u.copy(v),i.update()}function me(R){y.set(R.clientX,R.clientY),m.subVectors(y,_).multiplyScalar(i.panSpeed),k(m.x,m.y),_.copy(y),i.update()}function he(R){H(R.clientX,R.clientY),R.deltaY<0?O(B(R.deltaY)):R.deltaY>0&&J(B(R.deltaY)),i.update()}function be(R){let ae=!1;switch(R.code){case i.keys.UP:R.ctrlKey||R.metaKey||R.shiftKey?ee(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):k(0,i.keyPanSpeed),ae=!0;break;case i.keys.BOTTOM:R.ctrlKey||R.metaKey||R.shiftKey?ee(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):k(0,-i.keyPanSpeed),ae=!0;break;case i.keys.LEFT:R.ctrlKey||R.metaKey||R.shiftKey?D(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):k(i.keyPanSpeed,0),ae=!0;break;case i.keys.RIGHT:R.ctrlKey||R.metaKey||R.shiftKey?D(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):k(-i.keyPanSpeed,0),ae=!0;break}ae&&(R.preventDefault(),i.update())}function Pe(R){if(S.length===1)f.set(R.pageX,R.pageY);else{const ae=de(R),Ne=.5*(R.pageX+ae.x),_e=.5*(R.pageY+ae.y);f.set(Ne,_e)}}function Le(R){if(S.length===1)_.set(R.pageX,R.pageY);else{const ae=de(R),Ne=.5*(R.pageX+ae.x),_e=.5*(R.pageY+ae.y);_.set(Ne,_e)}}function Ge(R){const ae=de(R),Ne=R.pageX-ae.x,_e=R.pageY-ae.y,ce=Math.sqrt(Ne*Ne+_e*_e);u.set(0,ce)}function W(R){i.enableZoom&&Ge(R),i.enablePan&&Le(R)}function lt(R){i.enableZoom&&Ge(R),i.enableRotate&&Pe(R)}function Ce(R){if(S.length==1)h.set(R.pageX,R.pageY);else{const Ne=de(R),_e=.5*(R.pageX+Ne.x),ce=.5*(R.pageY+Ne.y);h.set(_e,ce)}p.subVectors(h,f).multiplyScalar(i.rotateSpeed);const ae=i.domElement;D(2*Math.PI*p.x/ae.clientHeight),ee(2*Math.PI*p.y/ae.clientHeight),f.copy(h)}function ue(R){if(S.length===1)y.set(R.pageX,R.pageY);else{const ae=de(R),Ne=.5*(R.pageX+ae.x),_e=.5*(R.pageY+ae.y);y.set(Ne,_e)}m.subVectors(y,_).multiplyScalar(i.panSpeed),k(m.x,m.y),_.copy(y)}function ve(R){const ae=de(R),Ne=R.pageX-ae.x,_e=R.pageY-ae.y,ce=Math.sqrt(Ne*Ne+_e*_e);v.set(0,ce),g.set(0,Math.pow(v.y/u.y,i.zoomSpeed)),J(g.y),u.copy(v);const U=(R.pageX+ae.x)*.5,pe=(R.pageY+ae.y)*.5;H(U,pe)}function ke(R){i.enableZoom&&ve(R),i.enablePan&&ue(R)}function Ie(R){i.enableZoom&&ve(R),i.enableRotate&&Ce(R)}function b(R){i.enabled!==!1&&(S.length===0&&(i.domElement.setPointerCapture(R.pointerId),i.domElement.addEventListener("pointermove",w),i.domElement.addEventListener("pointerup",V)),De(R),R.pointerType==="touch"?ne(R):re(R))}function w(R){i.enabled!==!1&&(R.pointerType==="touch"?Z(R):se(R))}function V(R){$(R),S.length===0&&(i.domElement.releasePointerCapture(R.pointerId),i.domElement.removeEventListener("pointermove",w),i.domElement.removeEventListener("pointerup",V)),i.dispatchEvent(wm),s=r.NONE}function re(R){let ae;switch(R.button){case 0:ae=i.mouseButtons.LEFT;break;case 1:ae=i.mouseButtons.MIDDLE;break;case 2:ae=i.mouseButtons.RIGHT;break;default:ae=-1}switch(ae){case Ir.DOLLY:if(i.enableZoom===!1)return;ie(R),s=r.DOLLY;break;case Ir.ROTATE:if(R.ctrlKey||R.metaKey||R.shiftKey){if(i.enablePan===!1)return;Y(R),s=r.PAN}else{if(i.enableRotate===!1)return;te(R),s=r.ROTATE}break;case Ir.PAN:if(R.ctrlKey||R.metaKey||R.shiftKey){if(i.enableRotate===!1)return;te(R),s=r.ROTATE}else{if(i.enablePan===!1)return;Y(R),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(uu)}function se(R){switch(s){case r.ROTATE:if(i.enableRotate===!1)return;X(R);break;case r.DOLLY:if(i.enableZoom===!1)return;le(R);break;case r.PAN:if(i.enablePan===!1)return;me(R);break}}function oe(R){i.enabled===!1||i.enableZoom===!1||s!==r.NONE||(R.preventDefault(),i.dispatchEvent(uu),he(Re(R)),i.dispatchEvent(wm))}function Re(R){const ae=R.deltaMode,Ne={clientX:R.clientX,clientY:R.clientY,deltaY:R.deltaY};switch(ae){case 1:Ne.deltaY*=16;break;case 2:Ne.deltaY*=100;break}return R.ctrlKey&&!E&&(Ne.deltaY*=10),Ne}function Se(R){R.key==="Control"&&(E=!0,document.addEventListener("keyup",we,{passive:!0,capture:!0}))}function we(R){R.key==="Control"&&(E=!1,document.removeEventListener("keyup",we,{passive:!0,capture:!0}))}function F(R){i.enabled===!1||i.enablePan===!1||be(R)}function ne(R){switch(ge(R),S.length){case 1:switch(i.touches.ONE){case Ur.ROTATE:if(i.enableRotate===!1)return;Pe(R),s=r.TOUCH_ROTATE;break;case Ur.PAN:if(i.enablePan===!1)return;Le(R),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(i.touches.TWO){case Ur.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;W(R),s=r.TOUCH_DOLLY_PAN;break;case Ur.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;lt(R),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(uu)}function Z(R){switch(ge(R),s){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;Ce(R),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;ue(R),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;ke(R),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Ie(R),i.update();break;default:s=r.NONE}}function Fe(R){i.enabled!==!1&&R.preventDefault()}function De(R){S.push(R.pointerId)}function $(R){delete L[R.pointerId];for(let ae=0;ae<S.length;ae++)if(S[ae]==R.pointerId){S.splice(ae,1);return}}function ge(R){let ae=L[R.pointerId];ae===void 0&&(ae=new ye,L[R.pointerId]=ae),ae.set(R.pageX,R.pageY)}function de(R){const ae=R.pointerId===S[0]?S[1]:S[0];return L[ae]}i.domElement.addEventListener("contextmenu",Fe),i.domElement.addEventListener("pointerdown",b),i.domElement.addEventListener("pointercancel",V),i.domElement.addEventListener("wheel",oe,{passive:!1}),document.addEventListener("keydown",Se,{passive:!0,capture:!0}),this.update()}}function Rv(t,e={}){const{isStudio:n=!1,scale:i=1}=e,r=new wn;r.name=`character_${t}`;const s={ARGUS:{name:"Detective Argus",role:"Chief Investigation Officer",gender:"Male",dusterColor:2825492,vestColor:1708556,accentColor:13673564,hatColor:2036750,hatBand:13673564,badgeColor:13935961,scale:1.08,height:1.82,isFemale:!1,hasBeard:!0,hasGlasses:!1},APEX:{name:"Detective Apex",role:"Deputy Investigation Officer",gender:"Female",dusterColor:4007194,vestColor:4855838,accentColor:11897442,hatColor:2364687,hatBand:10382403,badgeColor:13751771,scale:1,height:1.7,isFemale:!0,hasPonytail:!0,hasGlasses:!1},LUTKIN:{name:"Officer Lutkin",role:"Forensic Intelligence Officer",gender:"Female",dusterColor:2437932,vestColor:1844769,accentColor:10203019,hatColor:1580571,hatBand:8559731,badgeColor:13149282,scale:.94,height:1.66,isFemale:!0,hasBun:!0,hasGlasses:"round"},VANGUARD:{name:"Officer Vanguard",role:"Intelligence Operations Officer",gender:"Male",dusterColor:2760214,vestColor:1905678,accentColor:12618828,hatColor:1905678,hatBand:10250802,badgeColor:12883021,scale:1.04,height:1.84,isFemale:!1,hasSweptHair:!0,hasHarness:!0,hasGlasses:!1},CORTEX:{name:"Officer Cortex",role:"Analytical Intelligence Officer",gender:"Male",dusterColor:2305326,vestColor:1449246,accentColor:10267270,hatColor:1317660,hatBand:7244405,badgeColor:11571026,scale:.95,height:1.74,isFemale:!1,hasCurledFringe:!0,hasGlasses:"rect"}},o=s[t]||s.ARGUS,a=(ue,ve=.72,ke=.08)=>new hi({color:ue,roughness:ve,metalness:ke}),l=a(o.dusterColor,.78,.08),c=a(o.vestColor,.75,.12),d=a(12882802,.52,.04),f=a(1643536,.78,.15),h=a(2364941,.7,.1),p=a(o.badgeColor,.32,.85),_=a(1314828,.85,.12),y=a(o.accentColor,.48,.45),m=new wn;r.add(m);const u=new wn;m.add(u);function v(ue,ve,ke,Ie,b,w,V,re){const se=new Xe(new Qi(ve,ke,Ie),b);return se.position.set(w,V,re),se.castShadow=!0,se.receiveShadow=!0,ue.add(se),se}function g(ue,ve,ke,Ie,b,w,V,re,se=18){const oe=new Xe(new Jn(ve,ke,Ie,se),b);return oe.position.set(w,V,re),oe.castShadow=!0,ue.add(oe),oe}let M;if(o.isFemale){M=new Xe(new Jn(.32,.28,.78,16),l),M.position.y=1.32,M.scale.set(1.05,1,.8),M.castShadow=!0,u.add(M);const ue=new Xe(new di(.18,14,10),c);ue.scale.set(1.4,.9,.8),ue.position.set(0,1.42,.16),u.add(ue),v(u,.09,.72,.03,y,-.11,1.35,.32),v(u,.09,.72,.03,y,.11,1.35,.32)}else if(M=new Xe(new hs(.42,.75,6,14),l),M.position.y=1.32,M.scale.set(1.12,1,.82),M.castShadow=!0,u.add(M),v(u,.44,.7,.05,c,0,1.32,.28),v(u,.13,.76,.035,y,-.14,1.35,.35),v(u,.13,.76,.035,y,.14,1.35,.35),o.hasHarness||t==="ARGUS")for(const ue of[-1,1]){const ve=v(u,.07,.82,.03,a(1577484),ue*.24,1.42,.26);ve.rotation.z=ue*-.12,v(u,.08,.05,.04,p,ue*.24,1.58,.28)}const P=o.isFemale?.1:.13;g(u,P,P+.02,.22,d,0,1.95,0);const T=new wn;T.position.set(0,2.18,0),m.add(T);const S=new di(.27,24,18);o.isFemale?S.scale(.88,1.1,.95):S.scale(.96,1.14,1.02);const L=new Xe(S,d);L.castShadow=!0,T.add(L);const E=new di(.285,20,14,0,Math.PI*2,0,Math.PI*.6);E.scale(.95,1.12,1.02);const A=new Xe(E,f);if(A.position.set(0,.06,-.02),T.add(A),o.hasBun){const ue=new Xe(new di(.13,14,12),f);ue.scale.set(1.1,.85,.9),ue.position.set(0,.36,-.12),T.add(ue),g(T,.11,.11,.03,a(1052688),0,.32,-.12)}else if(o.hasPonytail){const ue=new Xe(new Tf(.09,.42,10),f);ue.position.set(0,.02,-.28),ue.rotation.x=-Math.PI*.42,T.add(ue)}else if(o.hasBeard){const ue=new Xe(new di(.2,14,10,0,Math.PI*2,Math.PI*.4,Math.PI*.5),f);ue.scale.set(1,1.05,1.15),ue.position.set(0,-.1,.05),T.add(ue)}const B=o.isFemale?.17:.2,D=o.isFemale?.42:.49;g(T,B,B+.03,.26,a(o.hatColor),0,.34,0);const ee=new Xe(new Jn(D,D,.045,32),a(o.hatColor));if(ee.position.y=.24,o.isFemale&&(ee.rotation.z=-.06,ee.rotation.x=.04),ee.castShadow=!0,T.add(ee),g(T,B+.006,B+.006,.045,a(o.hatBand,.4,.4),0,.28,0),o.hasGlasses){const ue=a(2826778,.3,.9),ve=new Q2({color:16777215,transmission:.96,transparent:!0,opacity:.8});if(o.hasGlasses==="round"){for(const Ie of[-1,1]){const b=new Xe(new Ho(.058,.005,8,20),ue);b.position.set(Ie*.084,.04,.27),T.add(b);const w=new Xe(new Zl(.056,16),ve);w.position.set(Ie*.084,.04,.27),T.add(w)}const ke=new Xe(new Jn(.004,.004,.05,8),ue);ke.rotation.z=Math.PI/2,ke.position.set(0,.04,.27),T.add(ke)}else{for(const Ie of[-1,1]){const b=new Xe(new Qi(.11,.07,.01),ue);b.position.set(Ie*.088,.04,.27),T.add(b)}const ke=new Xe(new Jn(.004,.004,.055,8),ue);ke.rotation.z=Math.PI/2,ke.position.set(0,.04,.27),T.add(ke)}}const I=o.isFemale?.16:.19,z=o.isFemale?.13:.16,k=o.isFemale?.22:.27,J=new wn;J.position.set(-I,.74,0),u.add(J);const O=new Xe(new hs(z,.62,4,10),h);O.position.y=-.31,O.castShadow=!0,J.add(O),v(J,k,.13,.44,_,0,-.66,.12);const H=new wn;H.position.set(I,.74,0),u.add(H);const j=new Xe(new hs(z,.62,4,10),h);j.position.y=-.31,j.castShadow=!0,H.add(j),v(H,k,.13,.44,_,0,-.66,.12);const te=o.isFemale?.4:.48,ie=o.isFemale?.1:.13,Y=o.isFemale?.09:.11,X=new hs(ie,.54,4,10),le=new wn;le.position.set(-te,1.62,0),u.add(le);const me=new Xe(X,l);me.position.set(0,-.28,0),me.rotation.z=-.16,me.castShadow=!0,le.add(me);const he=new Xe(new di(Y,12,10),d);he.position.set(-.06,-.6,.04),he.castShadow=!0,le.add(he);const be=new wn;be.position.set(te,1.62,0),u.add(be);const Pe=new Xe(X,l);Pe.position.set(0,-.28,0),Pe.rotation.z=.16,Pe.castShadow=!0,be.add(Pe);const Le=new Xe(new di(Y,12,10),d);Le.position.set(.06,-.6,.04),Le.castShadow=!0,be.add(Le);const Ge=v(u,.15,.15,.035,p,.22,1.56,.36);Ge.rotation.z=.12;const W=new Xe(new Ho(.52,.022,8,44),new Cl({color:o.accentColor,transparent:!0,opacity:.85}));W.rotation.x=Math.PI/2,W.position.y=.04,r.add(W);const lt=new Xe(new Af(.58,.6,32),new Cl({color:o.accentColor,side:Zn,transparent:!0,opacity:.35}));lt.rotation.x=Math.PI/2,lt.position.y=.035,r.add(lt);const Ce=new _o(o.accentColor,1.4,3.8);return Ce.position.set(0,2.3,.3),r.add(Ce),r.scale.setScalar(i),r.update=function(ue,ve={x:0,y:0},ke=!1,Ie=!1,b=0){if(Ie){const re=Math.sin(b*7.5);J.rotation.x=re*.48,H.rotation.x=-re*.48,le.rotation.x=-re*.38,be.rotation.x=re*.38,u.position.y=Math.abs(Math.sin(b*7.5))*.04,u.rotation.z=Math.sin(b*3.75)*.02,T.position.y=2.18+u.position.y*1.1}else{const re=Math.sin(ue*1.3)*.02;u.position.y=re,u.rotation.z=sn.lerp(u.rotation.z,0,.1),T.position.y=2.18+re*1.1,J.rotation.x=sn.lerp(J.rotation.x,0,.15),H.rotation.x=sn.lerp(H.rotation.x,0,.15),le.rotation.x=sn.lerp(le.rotation.x,0,.15),be.rotation.x=sn.lerp(be.rotation.x,0,.15)}const w=sn.clamp(ve.x*.38,-.42,.42),V=sn.clamp(-ve.y*.25,-.22,.22);T.rotation.y=sn.lerp(T.rotation.y,w,.06),T.rotation.x=sn.lerp(T.rotation.x,V,.06),W.rotation.z=ue*.2,lt.rotation.z=-ue*.12,ke?(Ce.intensity=2.5+Math.sin(ue*10)*.8,W.scale.setScalar(1+Math.sin(ue*8)*.08)):(Ce.intensity=1.3+Math.sin(ue*1.5)*.25,W.scale.setScalar(1))},r.setRenderMode=function(ue){const ve=ue==="wireframe";l.wireframe=ve,c.wireframe=ve,d.wireframe=ve,ue==="thermal"?(l.color.setHex(3342506),d.color.setHex(16724736),y.color.setHex(16776960),Ce.color.setHex(16720384)):ue==="hologram"?(l.color.setHex(o.accentColor),d.color.setHex(o.accentColor),y.color.setHex(o.accentColor),l.transparent=!0,l.opacity=.72,Ce.color.setHex(o.accentColor)):(l.color.setHex(o.dusterColor),d.color.setHex(12882802),y.color.setHex(o.accentColor),l.transparent=!1,l.opacity=1,Ce.color.setHex(o.accentColor))},r}function Cf(t,e,n,i=!1){const r=t.createLinearGradient(0,0,e,n);i?(r.addColorStop(0,"#e2cb9d"),r.addColorStop(.5,"#d6be8e"),r.addColorStop(1,"#c7ab7b")):(r.addColorStop(0,"#f2e4c7"),r.addColorStop(.5,"#ebd7b2"),r.addColorStop(1,"#dfc79d")),t.fillStyle=r,t.fillRect(0,0,e,n),t.strokeStyle="#8a6438",t.lineWidth=4,t.strokeRect(6,6,e-12,n-12),t.strokeStyle="#5a3d1d",t.lineWidth=1,t.strokeRect(10,10,e-20,n-20),t.fillStyle="rgba(120, 80, 40, 0.05)";for(let s=30;s<n-20;s+=18)t.fillRect(12,s,e-24,1)}function dA(t,e,n,i,r){const s=document.createElement("canvas");s.width=1024,s.height=512;const o=s.getContext("2d");Cf(o,1024,512,!1),o.fillStyle="#4a2d18",o.fillRect(16,16,992,58),o.fillStyle="#f8ebd1",o.font="bold 28px serif",o.textAlign="center",o.fillText("ARGUS & CO. — OFFICIAL CASE DOSSIER",512,54),o.textAlign="left",o.fillStyle="#872b1d",o.font="bold 24px monospace",o.fillText(`DOSSIER REF: ${t||"ARG-1891-001"}`,36,116),o.fillStyle="#2e1e12",o.font="bold 20px monospace",o.fillText(`PRIORITY: ${(n||"HIGH").toUpperCase()}  |  STATUS: ${(i||"ACTIVE").toUpperCase()}`,520,116),o.fillStyle="#21140b",o.font="bold 36px serif",o.fillText(e||"The Vanishing Ledger of Silvercreek Trust",36,172),o.strokeStyle="#9c7344",o.lineWidth=2,o.beginPath(),o.moveTo(36,195),o.lineTo(988,195),o.stroke(),o.fillStyle="#3f2b1c",o.font="20px monospace",o.fillText("INTAKE SUMMARY & BRIEFING:",36,235);const l=(r||"At 02:40 AM, the primary subterranean ledger repository was breached without acoustic tripwire activation. Supervisor code utilized alongside RF carrier suppression.").split(" ");let c="",d=275;for(let h=0;h<l.length;h++){const p=c+l[h]+" ";if(o.measureText(p).width>920&&h>0){if(o.fillText(c,36,d),c=l[h]+" ",d+=32,d>440)break}else c=p}o.fillText(c,36,d),o.save(),o.translate(840,420),o.rotate(-.15),o.strokeStyle="#a62419",o.lineWidth=4,o.strokeRect(-120,-32,240,64),o.fillStyle="#a62419",o.font="bold 22px monospace",o.textAlign="center",o.fillText("BUREAU CERTIFIED",0,-4),o.font="14px monospace",o.fillText("CHAIN OF CUSTODY VERIFIED",0,18),o.restore();const f=new Sf(s);return f.colorSpace=St,f}function fA(t,e,n,i,r){const s=document.createElement("canvas");s.width=512,s.height=420;const o=s.getContext("2d");Cf(o,512,420,!0),o.fillStyle="#3a2414",o.fillRect(12,12,488,46),o.fillStyle="#fbeacf",o.font="bold 22px monospace",o.textAlign="left",o.fillText(`EVIDENCE ITEM #${t}`,26,43),o.fillStyle="#872b1d",o.fillRect(380,20,100,30),o.fillStyle="#ffffff",o.font="bold 16px monospace",o.textAlign="center",o.fillText((n||"FILE").toUpperCase(),430,41),o.textAlign="left",o.fillStyle="#21140b",o.font="bold 24px serif",o.fillText(e||"access_vault_log.csv",26,105),o.strokeStyle="#8c673d",o.lineWidth=1.5,o.beginPath(),o.moveTo(26,125),o.lineTo(486,125),o.stroke(),o.fillStyle="#5c3d23",o.font="16px monospace",o.fillText("CRYPTOGRAPHIC CHECKSUM:",26,160),o.fillStyle="#1c120a",o.font="bold 15px monospace";const a=i||"8a4f9b2d3c91e7048a4f9b2d3c91e7048a4f9b2d3c91e704";o.fillText(a.slice(0,26),26,190),o.fillText(a.slice(26,52)||"00b4e21a89c7d4e3f1a2b3",26,215),o.fillStyle="#5c3d23",o.font="16px monospace",o.fillText(`LOGGED: ${r||"1891-10-24 02:41:19"}`,26,265),o.fillText("STATUS: LOCKED IN EVIDENCE ARCHIVE",26,295),o.save(),o.translate(380,345),o.rotate(.12),o.strokeStyle="#1f5f3f",o.lineWidth=3,o.strokeRect(-90,-26,180,52),o.fillStyle="#1f5f3f",o.font="bold 18px monospace",o.textAlign="center",o.fillText("HASH VERIFIED",0,5),o.restore();const l=new Sf(s);return l.colorSpace=St,l}function hA(t,e,n,i=!1){const r=document.createElement("canvas");r.width=512,r.height=420;const s=r.getContext("2d");Cf(s,512,420,!1),s.fillStyle=i?"#522919":"#1e292a",s.fillRect(12,12,488,46),s.fillStyle="#fbeacf",s.font="bold 20px monospace",s.textAlign="left",s.fillText((e||"LEAD").toUpperCase(),26,42),s.fillStyle="#24150b",s.font="bold 24px serif",s.fillText(t||"Person of Interest",26,100),s.strokeStyle="#8c673d",s.lineWidth=1.5,s.beginPath(),s.moveTo(26,120),s.lineTo(486,120),s.stroke(),s.fillStyle="#452f1e",s.font="18px monospace";const o=(n||"Key entity implicated in the timeline. Cross-referenced with port manifests and railway punch records.").split(" ");let a="",l=160;for(let d=0;d<o.length;d++){const f=a+o[d]+" ";if(s.measureText(f).width>440&&d>0){if(s.fillText(a,26,l),a=o[d]+" ",l+=28,l>330)break}else a=f}s.fillText(a,26,l),s.save(),s.translate(370,350),s.rotate(-.08),s.strokeStyle=i?"#9e3223":"#a36d2c",s.lineWidth=3,s.strokeRect(-95,-26,190,52),s.fillStyle=i?"#9e3223":"#a36d2c",s.font="bold 17px monospace",s.textAlign="center",s.fillText(i?"WORKING HYPOTHESIS":"SURVEILLANCE ORDER",0,6),s.restore();const c=new Sf(r);return c.colorSpace=St,c}function pA(t,e={}){const{onAgentClick:n,onEvidenceClick:i,initialCase:r=null,evidenceList:s=[],cluesList:o=[]}=e,a=new Sv;a.background=new qe(2365199),a.fog=new yf(2365199,18,48);const l=new _f({canvas:t,antialias:!0,powerPreference:"high-performance"});l.setPixelRatio(Math.min(window.devicePixelRatio,2)),l.shadowMap.enabled=!0,l.shadowMap.type=j0,l.outputColorSpace=St,l.toneMapping=ff,l.toneMappingExposure=1.15;const c=new an(44,1,.1,100),d=new N(0,8.5,17),f=new N(0,2.3,0);c.position.copy(d),c.lookAt(f);const h=new uA(c,t);h.enableDamping=!0,h.dampingFactor=.05,h.target.copy(f),h.minDistance=2.8,h.maxDistance=28,h.maxPolarAngle=Math.PI/2+.02,h.enablePan=!0;const p=new rA(16767138,2693134,1.8);a.add(p);const _=new pd(16762749,3.2);_.position.set(-6,12,7),_.castShadow=!0,_.shadow.mapSize.set(2048,2048),_.shadow.bias=-4e-4,a.add(_);const y=new _o(16754251,24,18);y.position.set(-7,5,-2),a.add(y);const m=new _o(16760427,20,18);m.position.set(7,5,-2),a.add(m);const u=new _o(16765066,14,12);u.position.set(0,3.5,2.5),a.add(u);const v={dawn:{bgColor:1709595,fogColor:1709595,hemiSky:11912923,hemiGround:2365458,hemiIntensity:1.4,sunColor:16765606,sunIntensity:2.2,sunPos:[-9,7,6],lanternIntensity:16,exposure:1.05},day:{bgColor:3549214,fogColor:3549214,hemiSky:16774374,hemiGround:4008476,hemiIntensity:2.4,sunColor:16775917,sunIntensity:4.2,sunPos:[-4,14,6],lanternIntensity:8,exposure:1.25},sunset:{bgColor:2823950,fogColor:2823950,hemiSky:16746547,hemiGround:2494984,hemiIntensity:1.8,sunColor:16737809,sunIntensity:3.8,sunPos:[-12,5,4],lanternIntensity:22,exposure:1.15},night:{bgColor:1182728,fogColor:1182728,hemiSky:4468770,hemiGround:1313798,hemiIntensity:1,sunColor:6719658,sunIntensity:1.2,sunPos:[-6,10,5],lanternIntensity:32,exposure:1.1}};function g(){const F=new Date().getHours();return F>=5&&F<8?"dawn":F>=8&&F<17?"day":F>=17&&F<20?"sunset":"night"}let M="auto",P=v[g()];function T(F){a.background.setHex(F.bgColor),a.fog.color.setHex(F.fogColor),p.color.setHex(F.hemiSky),p.groundColor.setHex(F.hemiGround),p.intensity=F.hemiIntensity,_.color.setHex(F.sunColor),_.intensity=F.sunIntensity,_.position.set(...F.sunPos),y.intensity=F.lanternIntensity,m.intensity=F.lanternIntensity*.85,l.toneMappingExposure=F.exposure}T(P);const S=(F,ne=.75,Z=0)=>new hi({color:F,roughness:ne,metalness:Z}),L=S(6635557),E=S(2693135),A=S(4927520),B=S(3811355),D=S(11897421,.35,.65),ee=S(14206106),I=S(1511950),z=new hi({color:3293514,emissive:2570812,emissiveIntensity:.55});function k(F,ne,Z,Fe,De,$,ge,de){const R=new Xe(new Qi(ne,Z,Fe),De);return R.position.set($,ge,de),R.castShadow=!0,R.receiveShadow=!0,F.add(R),R}function J(F,ne,Z,Fe,De,$,ge,de){const R=new Xe(new Jn(ne,Z,Fe,18),De);return R.position.set($,ge,de),R.castShadow=!0,F.add(R),R}k(a,24,.4,22,B,0,-.25,0),k(a,24,8,.4,A,0,3.8,-9),k(a,.4,8,22,A,-12,3.8,0),k(a,.4,8,22,A,12,3.8,0);for(let F=-10;F<=10;F+=2)k(a,.025,.015,21,S(9070661),F,.01,0);for(let F=-8;F<9;F+=2)k(a,23,.015,.025,S(9070661),0,.01,F);k(a,10.6,4.4,.3,E,0,4.3,-8.65),k(a,10.2,4.1,.07,S(7951928),0,4.3,-8.43);const H=new iA().load("/assets/logo.png");H.colorSpace=St;const j=new Xe(new Zl(1.25,32),new hi({map:H,roughness:.32,metalness:.68,transparent:!0}));j.position.set(0,6.9,-8.44),a.add(j);const te=new Xe(new Ho(1.26,.04,8,32),D);te.position.set(0,6.9,-8.43),a.add(te);const ie=r||{case_ref:"ARG-1891-001",title:"The Vanishing Ledger of Silvercreek Trust",priority:"High",status:"Active",notes:"Subterranean repository vault breached at 02:40 AM without acoustic alarm. Supervisor key deployed with RF carrier suppression."},Y=dA(ie.case_ref,ie.title,ie.priority,ie.status,ie.notes),X=new Xe(new Ms(4.2,1.8),new hi({map:Y,roughness:.85}));X.position.set(0,5,-8.36),X.castShadow=!0,X.userData={type:"docket",caseData:ie},a.add(X),J(a,.04,.04,.05,D,-1.95,5.8,-8.32),J(a,.04,.04,.05,D,1.95,5.8,-8.32);const le=[new N(0,4.4,-8.32)];(s&&s.length>0?s:[{id:1,original_name:"vault_access_logs.csv",file_type:"CSV",hash_sha256:"8a4f9b2d3c91e704b2a8d1e3c79a0b4e",created_at:"1891-10-24 02:41:19"},{id:2,original_name:"audio_wiretap_intercept.wav",file_type:"AUDIO",hash_sha256:"c3e4a1b8d79f0412e8b2a3c4d5e6f7a8",created_at:"1891-10-24 03:15:00"},{id:3,original_name:"pier9_manifest_photo.jpg",file_type:"IMAGE",hash_sha256:"e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",created_at:"1891-10-24 05:20:45"}]).slice(0,4).forEach((F,ne)=>{const Z=ne%2===0,Fe=Math.floor(ne/2),De=Z?-3.4+Fe*.2:3.4-Fe*.2,$=3.3-Fe*1.35,ge=-8.35,de=fA(ne+1,F.original_name,F.file_type,F.hash_sha256,F.created_at),R=new Xe(new Ms(1.5,1.15),new hi({map:de,roughness:.88}));R.position.set(De,$,ge),R.rotation.z=ne%2===0?.03:-.04,R.castShadow=!0,R.userData={type:"evidence",data:F},a.add(R),J(a,.035,.035,.05,D,De,$+.52,ge+.03),le.push(new N(De,$+.45,ge+.02))}),(o&&o.length>0?o:[{id:1,title:"Suspect: Elias Vance",category:"SUSPECT",description:"Railway transit punch logged 2 miles from claimed off-duty location.",is_hypothesis:!1},{id:2,title:"Pier 9 Cargo Manifest",category:"LOCATION",description:"Port registry entries show undeclared crated machinery loaded onto vessel.",is_hypothesis:!1},{id:3,title:"Inside Accomplice Ring",category:"HYPOTHESIS",description:"Dual supervisor key deployed simultaneously with acoustic suppression.",is_hypothesis:!0}]).slice(0,3).forEach((F,ne)=>{const Z=-1.6+ne*1.6,Fe=2.85+Math.sin(ne*2)*.15,De=-8.35,$=hA(F.title,F.category,F.description,F.is_hypothesis),ge=new Xe(new Ms(1.4,1.1),new hi({map:$,roughness:.85}));ge.position.set(Z,Fe,De),ge.rotation.z=ne%2===0?-.025:.03,ge.castShadow=!0,ge.userData={type:"clue",data:F},a.add(ge),J(a,.035,.035,.05,D,Z,Fe+.5,De+.03),le.push(new N(Z,Fe+.42,De+.02))});const be=new Mv({color:10363927,linewidth:2});if(le.length>=2)for(let F=1;F<le.length;F++){const ne=[le[0],le[F]];if(a.add(new hm(new $t().setFromPoints(ne),be)),F>1&&F%2===0){const Z=[le[F-1],le[F]];a.add(new hm(new $t().setFromPoints(Z),be))}}function Pe(F,ne,Z=3){k(a,Z,.2,1.5,L,F,1,ne);for(const Fe of[-Z/2+.15,Z/2-.15])for(const De of[-.58,.58])k(a,.13,.95,.13,D,F+Fe,.48,ne+De);k(a,1.1,.06,.7,E,F,.16,ne)}function Le(F,ne){k(a,1.15,.8,.12,I,F,2,ne),k(a,1.02,.65,.03,z,F,2,ne+.08),k(a,.12,.35,.12,D,F,1.42,ne),k(a,.55,.06,.3,D,F,1.23,ne)}function Ge(F,ne){J(a,.55,.55,.12,E,F,.65,ne),J(a,.08,.08,.75,D,F,.27,ne),k(a,.9,1,.18,E,F,1.25,ne-.4)}Pe(-7,-1),Le(-7,-1.2),Ge(-7,1),Pe(7,-1),Le(7,-1.2),Ge(7,1),Pe(-7,4,2.7),Le(-7,3.8),Ge(-7,6),Pe(7,4,2.7),Le(7,3.8),Ge(7,6),k(a,5.4,.22,2.8,L,0,1.15,2.1);for(const F of[-2.35,2.35])for(const ne of[1.1,3.1])k(a,.15,1,.15,D,F,.55,ne);for(const F of[-3.5,3.5])for(const ne of[1.4,3.2])Ge(F,ne);for(const F of[-8,0,8])k(a,3,.18,.3,E,F,7.5,-1),k(a,1.2,.18,.18,D,F,7.35,-1);for(const F of[-9,9])k(a,1.25,1.7,.12,E,F,4.5,-8.68),k(a,1.02,1.45,.035,ee,F,4.5,-8.59);for(const F of[-8,-5,5,8])k(a,1.45,1,.14,E,F,5.8,-8.7),k(a,1.25,.78,.04,z,F,5.8,-8.6);const W=[{name:"ARGUS",x:0,z:3.6,rotY:0,scale:1.08,gender:"Male",role:"Chief Investigation Officer"},{name:"APEX",x:-4.5,z:-.4,rotY:Math.PI/4,scale:1,gender:"Female",role:"Deputy Investigation Officer"},{name:"LUTKIN",x:-8.2,z:2.5,rotY:0,scale:.94,gender:"Female",role:"Forensic Intelligence Officer"},{name:"VANGUARD",x:4.5,z:-.4,rotY:-Math.PI/4,scale:1.04,gender:"Male",role:"Intelligence Operations Officer"},{name:"CORTEX",x:8.2,z:2.5,rotY:0,scale:.95,gender:"Male",role:"Analytical Intelligence Officer"}],lt=[{x:-2.8,z:-5.8,rotY:Math.PI},{x:0,z:-6,rotY:Math.PI},{x:2.8,z:-5.8,rotY:Math.PI},{x:-3.2,z:1.8,rotY:Math.PI/2},{x:3.2,z:2,rotY:-Math.PI/2},{x:0,z:.5,rotY:0},{x:-2,z:-2.5,rotY:Math.PI*.7},{x:2,z:-2.5,rotY:Math.PI*1.3},{x:-1.5,z:5.5,rotY:0},{x:1.5,z:5.5,rotY:0},{x:-9.5,z:-3.8,rotY:Math.PI/4},{x:9.5,z:-3.8,rotY:-Math.PI/4}];let Ce=!0;const ue=[];W.forEach((F,ne)=>{const Z=Rv(F.name,{scale:F.scale});Z.position.set(F.x,0,F.z),Z.rotation.y=F.rotY||0,a.add(Z),ue.push({name:F.name,group:Z,agentData:F,homePos:new N(F.x,0,F.z),homeRotY:F.rotY||0,currentPos:new N(F.x,0,F.z),targetPos:new N(F.x,0,F.z),targetRotY:F.rotY||0,state:"idle",idleTimer:1.5+ne*1.8,walkCycle:Math.random()*10,speed:1.25+ne%3*.15,isAssignedWork:!1,phase:Math.random()*6})});const ve=new lA,ke=new ye;function Ie(F){const ne=t.getBoundingClientRect();ke.x=(F.clientX-ne.left)/ne.width*2-1,ke.y=-((F.clientY-ne.top)/ne.height)*2+1}t.addEventListener("mousemove",Ie);function b(F){const ne=t.getBoundingClientRect(),Z=new ye((F.clientX-ne.left)/ne.width*2-1,-((F.clientY-ne.top)/ne.height)*2+1);ve.setFromCamera(Z,c);const Fe=ve.intersectObjects(a.children,!0);for(const De of Fe){let $=De.object;if($.userData&&($.userData.type==="evidence"||$.userData.type==="clue"||$.userData.type==="docket")){se.set($.position.x*.7,$.position.y,$.position.z+2.8),oe.set($.position.x,$.position.y,$.position.z),re=!0,typeof i=="function"&&i($.userData);return}for(;$&&$!==a;){if($.name&&$.name.startsWith("character_")){const ge=$.name.replace("character_","");typeof n=="function"&&n(ge);return}$=$.parent}}}t.addEventListener("click",b);function w(){const F=t.getBoundingClientRect(),ne=F.width||t.clientWidth||window.innerWidth,Z=F.height||t.clientHeight||window.innerHeight;l.setSize(ne,Z,!1),c.aspect=ne/Z,c.updateProjectionMatrix()}window.addEventListener("resize",w),w();let V=!0,re=!1,se=d.clone(),oe=f.clone(),Re=null;const Se=new Cv;function we(){if(!V)return;requestAnimationFrame(we);const F=Math.min(Se.getDelta(),.1),ne=Se.getElapsedTime();ue.forEach($=>{const ge=$.name===Re;if(Ce&&!$.isAssignedWork){if($.state==="walking"){const de=$.targetPos.x-$.currentPos.x,R=$.targetPos.z-$.currentPos.z,ae=Math.hypot(de,R);if(ae>.15){let _e=Math.atan2(de,R)-$.group.rotation.y;for(;_e<-Math.PI;)_e+=Math.PI*2;for(;_e>Math.PI;)_e-=Math.PI*2;$.group.rotation.y+=_e*.08;const ce=Math.min($.speed*F,ae);$.currentPos.x+=de/ae*ce,$.currentPos.z+=R/ae*ce,$.group.position.x=$.currentPos.x,$.group.position.z=$.currentPos.z,$.walkCycle+=F,$.group.update&&$.group.update(ne,ke,ge,!0,$.walkCycle)}else $.state="idle",$.idleTimer=4.5+Math.random()*6,$.group.update&&$.group.update(ne,ke,ge,!1,0)}else if($.group.rotation.y=sn.lerp($.group.rotation.y,$.targetRotY,.05),$.group.update&&$.group.update(ne,ke,ge,!1,0),$.idleTimer-=F,$.idleTimer<=0){const de=lt.filter(ae=>Math.hypot(ae.x-$.currentPos.x,ae.z-$.currentPos.z)>2.5);let R;Math.random()<.22?R={x:$.homePos.x,z:$.homePos.z,rotY:$.homeRotY}:R=de[Math.floor(Math.random()*de.length)]||lt[0],$.targetPos.set(R.x,0,R.z),$.targetRotY=R.rotY,$.state="walking"}}else{const de=$.homePos.x-$.currentPos.x,R=$.homePos.z-$.currentPos.z,ae=Math.hypot(de,R);if(ae>.15){let _e=Math.atan2(de,R)-$.group.rotation.y;for(;_e<-Math.PI;)_e+=Math.PI*2;for(;_e>Math.PI;)_e-=Math.PI*2;$.group.rotation.y+=_e*.08;const ce=Math.min($.speed*F,ae);$.currentPos.x+=de/ae*ce,$.currentPos.z+=R/ae*ce,$.group.position.x=$.currentPos.x,$.group.position.z=$.currentPos.z,$.walkCycle+=F,$.group.update&&$.group.update(ne,ke,ge,!0,$.walkCycle)}else $.group.rotation.y=sn.lerp($.group.rotation.y,$.homeRotY,.08),$.group.update&&$.group.update(ne,ke,ge,!1,0)}});const Z=t.getBoundingClientRect(),Fe=Z.width,De=Z.height;ue.forEach($=>{const ge=document.getElementById(`agent-tag-${$.name}`);if(ge){const de=new N;if($.group.getWorldPosition(de),de.y+=2.45,de.project(c),de.z<1&&de.z>-1){const R=(de.x*.5+.5)*Fe,ae=(-(de.y*.5)+.5)*De;ge.style.display="block",ge.style.left=`${R.toFixed(1)}px`,ge.style.top=`${ae.toFixed(1)}px`}else ge.style.display="none"}}),u.intensity=14+Math.sin(ne*14)*.8+Math.cos(ne*7)*.5,re&&(c.position.lerp(se,.06),h.target.lerp(oe,.06),c.position.distanceTo(se)<.08&&(re=!1)),h.update(),l.render(a,c)}return we(),{destroy:()=>{V=!1,window.removeEventListener("resize",w),t.removeEventListener("mousemove",Ie),t.removeEventListener("click",b),h.dispose(),l.dispose()},focusAgent:F=>{const ne=ue.find(Z=>Z.name===F);ne&&(se.set(ne.currentPos.x*.35,6.5,ne.currentPos.z+5),oe.set(ne.currentPos.x,1.8,ne.currentPos.z),re=!0)},focusBoard:()=>{se.set(0,4.4,-4.2),oe.set(0,4.3,-8.4),re=!0},resetCamera:()=>{se.copy(d),oe.copy(f),re=!0},setActiveSpeaker:F=>{Re=F},setFreeRoam:F=>{Ce=F,F||ue.forEach(ne=>{ne.state="walking",ne.targetPos.copy(ne.homePos),ne.targetRotY=ne.homeRotY})},isFreeRoam:()=>Ce,assignWork:(F,ne)=>{const Z=ue.find(Fe=>Fe.name===F);Z&&(Z.isAssignedWork=ne,ne&&(Z.state="walking",Z.targetPos.copy(Z.homePos),Z.targetRotY=Z.homeRotY))},setLightingMode:F=>{M=F;const ne=F==="auto"?g():F;v[ne]&&T(v[ne])},getActiveLightingMode:()=>M,setPause:F=>{V=!F,V&&we()}}}const mA=[{id:"LUTKIN",title:"OFFICER LUTKIN",role:"Forensic Intelligence Officer"},{id:"APEX",title:"DETECTIVE APEX",role:"Deputy Investigation Officer"},{id:"ARGUS",title:"DETECTIVE ARGUS",role:"Chief Investigation Officer"},{id:"VANGUARD",title:"OFFICER VANGUARD",role:"Intelligence Operations Officer"},{id:"CORTEX",title:"OFFICER CORTEX",role:"Analytical Intelligence Officer"}];function gA({cases:t=[],onSelectAgent:e,activeSpeaker:n=null}){var E,A,B,D,ee,I,z,k,J,O,H,j,te,ie,Y;const i=Ee.useRef(null),r=Ee.useRef(null),[s,o]=Ee.useState(!0),[a,l]=Ee.useState(!1),[c,d]=Ee.useState("ARGUS"),[f,h]=Ee.useState("Officers are moving freely through the bureau, inspecting case evidence."),[p,_]=Ee.useState(null),[y,m]=Ee.useState(null),u=t.length>0?t[0]:null,v={openCases:t.filter(X=>X.status!=="Solved").length,filesLogged:t.reduce((X,le)=>X+(le.evidence_count||0),0),reportsCount:t.reduce((X,le)=>X+(le.report_count||0),0)},g={ARGUS:"Chief investigator coordinating the bureau and case priorities.",APEX:"Deputy investigator reviewing strategy and checking conclusions.",LUTKIN:"Forensic officer assigned to digital evidence examination.",VANGUARD:"Intelligence officer assigned to authorised public-source research.",CORTEX:"Analytical officer assigned to comparison and anomaly review."};Ee.useEffect(()=>{u!=null&&u.case_ref&&fetch(`/api/cases/${u.case_ref}`).then(X=>X.json()).then(X=>{X.success&&m(X)}).catch(X=>console.warn("Could not fetch active case for 3D board:",X))},[u==null?void 0:u.case_ref]),Ee.useEffect(()=>{const X=i.current;if(!X)return;const le=pA(X,{onAgentClick:me=>{it.telegraphBeep(),d(me),h(`${me} selected. ${g[me]}`),le.focusAgent(me)},onEvidenceClick:me=>{var he,be,Pe;it.typewriterClick(),_(me),me.type==="evidence"?h(`Forensic evidence inspected: ${((he=me.data)==null?void 0:he.original_name)||"File record"}`):me.type==="clue"?h(`Investigative lead inspected: ${((be=me.data)==null?void 0:be.title)||"Case Clue"}`):me.type==="docket"&&h(`Central case docket: ${((Pe=me.caseData)==null?void 0:Pe.title)||"Active dossier"}`)},initialCase:(y==null?void 0:y.case)||u,evidenceList:(y==null?void 0:y.evidence)||[],cluesList:(y==null?void 0:y.clues)||[]});return r.current=le,()=>{le.destroy()}},[y]),Ee.useEffect(()=>{r.current&&n&&(r.current.setActiveSpeaker(n),r.current.focusAgent(n))},[n]);const M=X=>{it.telegraphBeep(),d(X),h(`${X} selected. ${g[X]}`),r.current&&r.current.focusAgent(X)},P=()=>{const X=!s;o(X),r.current&&r.current.setFreeRoam(X),h(X?"Officers freed to roam, patrol, and inspect evidence across the bureau.":"All officers ordered to station at their assigned desks."),it.typewriterClick()},T=()=>{it.typewriterClick(),d("ARGUS"),_(null),r.current&&r.current.resetCamera()},S=()=>{it.typewriterClick(),r.current&&r.current.focusBoard()},L=()=>{const X=it.toggleMute();l(X)};return x.jsxs("section",{className:"view active",id:"headquarters",children:[x.jsx("canvas",{id:"scene",ref:i,"aria-label":"Three dimensional western detective office"}),x.jsx("div",{className:"vignette"}),x.jsxs("div",{className:"hq-tools",children:[x.jsx("button",{onClick:P,className:`western-btn ${s?"western-btn-gold":""}`,title:s?"Station all agents at their desks":"Free agents to roam and inspect evidence",children:x.jsx("span",{children:s?"🪑 Station at Desks":"🚶 Free Agents"})}),x.jsx("button",{onClick:S,className:"western-btn",title:"Zoom camera onto Central Case Board",children:x.jsx("span",{children:"▤ Inspect Board"})}),x.jsx("button",{onClick:L,className:"western-btn",title:a?"Unmute Audio":"Mute Audio",children:a?x.jsx(_1,{size:13}):x.jsx(v1,{size:13})}),x.jsx("button",{onClick:T,className:"western-btn",id:"resetScene",children:"↺ Reset view"})]}),x.jsx("div",{className:"agent-tags",children:mA.map(X=>x.jsxs("button",{id:`agent-tag-${X.id}`,className:`agent-tag ${c===X.id?"selected":""}`,"data-agent":X.id,onClick:()=>M(X.id),children:[x.jsx("b",{children:X.title}),x.jsx("span",{children:X.role})]},X.id))}),p&&x.jsxs("div",{className:"absolute top-20 right-5 w-84 max-w-[90vw] bg-[#1d130ce8] border-2 border-[#b88c4d] rounded p-4 text-[#f5dfb8] shadow-2xl backdrop-blur-md z-30 font-elite animate-in fade-in duration-200",children:[x.jsxs("div",{className:"flex items-start justify-between border-b border-[#7d5631] pb-2 mb-3",children:[x.jsxs("div",{children:[x.jsx("span",{className:"text-[10px] tracking-wider text-[#d1a65e] uppercase",children:p.type==="evidence"?"★ EVIDENCE RECORD EXAMINED":p.type==="clue"?"◆ INVESTIGATIVE CLUE CARD":"▣ ACTIVE CASE DOCKET"}),x.jsx("h3",{className:"font-rye text-base text-[#fcedd0] mt-0.5",children:p.type==="evidence"?(E=p.data)==null?void 0:E.original_name:p.type==="clue"?(A=p.data)==null?void 0:A.title:(B=p.caseData)==null?void 0:B.title})]}),x.jsx("button",{onClick:()=>_(null),className:"text-[#aa8c64] hover:text-[#fff] p-1",children:x.jsx(Sl,{size:16})})]}),p.type==="evidence"&&x.jsxs("div",{className:"space-y-2 text-xs",children:[x.jsxs("div",{className:"flex items-center gap-1.5 text-[#e0cb9f]",children:[x.jsx(z0,{size:12,className:"text-[#c69a50]"}),x.jsxs("span",{children:["Format: ",x.jsx("strong",{children:((D=p.data)==null?void 0:D.file_type)||"Unknown"})]}),((ee=p.data)==null?void 0:ee.file_size)&&x.jsxs("span",{className:"text-[#a8906e]",children:["(",Math.round(p.data.file_size/1024)," KB)"]})]}),x.jsxs("div",{className:"bg-[#140c07] p-2 rounded border border-[#5d3f23] text-[10px] space-y-1",children:[x.jsxs("div",{className:"flex items-center gap-1 text-[#b59972]",children:[x.jsx(Vy,{size:11,className:"text-[#c69a50]"}),x.jsx("span",{children:"SHA-256 HASH VERIFICATION:"})]}),x.jsx("div",{className:"font-mono text-[#f3dfb7] break-all select-all",children:((I=p.data)==null?void 0:I.hash_sha256)||"8a4f9b2d3c91e704b2a8d1e3c79a0b4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0"})]}),x.jsxs("div",{className:"flex items-center gap-1 text-[11px] text-[#aa8e69]",children:[x.jsx(xy,{size:11}),x.jsxs("span",{children:["Intake Log: ",(z=p.data)!=null&&z.created_at?new Date(p.data.created_at).toLocaleString():"1891-10-24 02:41:19"]})]}),x.jsxs("div",{className:"pt-2 border-t border-[#684628] flex justify-between items-center text-[11px]",children:[x.jsx("span",{className:"text-[#8ca16b]",children:"✓ CHAIN OF CUSTODY SEALED"}),x.jsx("button",{onClick:T,className:"text-[#c69a50] underline hover:text-[#ffe4b0]",children:"Return to Office"})]})]}),p.type==="clue"&&x.jsxs("div",{className:"space-y-2 text-xs",children:[x.jsxs("div",{className:"text-[11px] font-semibold text-[#c69a50]",children:["CATEGORY: ",(k=p.data)==null?void 0:k.category]}),x.jsx("p",{className:"text-[#d8c29b] leading-relaxed",children:(J=p.data)==null?void 0:J.description}),((O=p.data)==null?void 0:O.is_hypothesis)&&x.jsxs("div",{className:"flex items-center gap-1.5 text-amber-400 text-[10px] bg-amber-950/40 p-1.5 rounded border border-amber-800/60",children:[x.jsx(B0,{size:12}),x.jsx("span",{children:"Officer deduction under active adversarial review."})]})]}),p.type==="docket"&&x.jsxs("div",{className:"space-y-2 text-xs",children:[x.jsxs("div",{className:"text-[11px] text-[#d6be96]",children:["Case Reference: ",x.jsx("strong",{className:"text-[#ffe0a3]",children:(H=p.caseData)==null?void 0:H.case_ref})]}),x.jsxs("div",{className:"text-[11px] text-[#d6be96]",children:["Priority: ",x.jsx("span",{className:"text-red-400 font-bold",children:(j=p.caseData)==null?void 0:j.priority})," · Status: ",x.jsx("span",{className:"text-green-400 font-bold",children:((te=p.caseData)==null?void 0:te.status)||"Active"})]}),x.jsx("p",{className:"text-[#d4be98] text-[11px] leading-relaxed pt-1 border-t border-[#684628]",children:((ie=p.caseData)==null?void 0:ie.notes)||((Y=p.caseData)==null?void 0:Y.summary)||"Active case intake underway."})]})]}),x.jsxs("div",{className:"hq-dashboard",children:[x.jsxs("div",{className:"dash-card",children:[x.jsx("h3",{children:"▣ BUREAU LEDGER"}),x.jsxs("div",{className:"metric-row",children:[x.jsxs("div",{className:"metric",children:[x.jsx("b",{id:"caseMetric",children:v.openCases}),x.jsx("span",{children:"OPEN CASES"})]}),x.jsxs("div",{className:"metric",children:[x.jsx("b",{id:"evidenceMetric",children:v.filesLogged}),x.jsx("span",{children:"FILES LOGGED"})]}),x.jsxs("div",{className:"metric",children:[x.jsx("b",{id:"reportMetric",children:v.reportsCount}),x.jsx("span",{children:"REPORTS"})]})]})]}),x.jsxs("div",{className:"dash-card",children:[x.jsx("h3",{children:"✦ CURRENT BUREAU ACTIVITY"}),x.jsx("p",{id:"hqActivity",children:f})]}),x.jsxs("div",{className:"dash-card",children:[x.jsx("h3",{children:"♜ OFFICERS ON DUTY"}),x.jsxs("ul",{children:[x.jsx("li",{children:"ARGUS · Case command"}),x.jsx("li",{children:"APEX · Review & verification"}),x.jsx("li",{children:"LUTKIN · Evidence examination"}),x.jsx("li",{children:"VANGUARD · Public intelligence"}),x.jsx("li",{children:"CORTEX · Pattern analysis"})]})]})]})]})}function vA({cases:t=[],onRefresh:e,onSelectCaseForLab:n}){const[i,r]=Ee.useState(`ARG-1891-00${t.length+1}`),[s,o]=Ee.useState(""),[a,l]=Ee.useState("High"),[c,d]=Ee.useState("Classified Investigation"),[f,h]=Ee.useState(""),[p,_]=Ee.useState([]),[y,m]=Ee.useState(!1),[u,v]=Ee.useState(!1),[g,M]=Ee.useState(null),P=D=>{var ee;D.preventDefault(),m(!1),(ee=D.dataTransfer)!=null&&ee.files&&S(Array.from(D.dataTransfer.files))},T=D=>{D.target.files&&S(Array.from(D.target.files))},S=D=>{const ee=["doc","docx","xls","xlsx","csv","jpg","jpeg","heic","png","pdf","txt","dat","log"],I=[];for(const z of D){const k=z.name.split(".").pop().toLowerCase();if(!ee.includes(k)){alert(`File format .${k} is not in the allowed evidence register.`);continue}p.some(J=>J.name===z.name&&J.size===z.size)||I.push(z)}I.length>0&&(it.cameraShutter(),_(z=>[...z,...I]))},L=D=>{_(ee=>ee.filter((I,z)=>z!==D))},E=D=>D<1024?D+" B":D<1048576?(D/1024).toFixed(1)+" KB":(D/1048576).toFixed(1)+" MB",A=async D=>{if(D.preventDefault(),!i.trim()||!s.trim()){alert("Case Reference and Case Title are required.");return}v(!0),it.typewriterClick();try{const I=await(await fetch("/api/cases",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({case_ref:i.trim(),title:s.trim(),priority:a,category:c,summary:f.slice(0,200),notes:f})})).json();if(!I.success)throw new Error(I.error||"Failed to create case");if(p.length>0){const z=new FormData;p.forEach(O=>z.append("files",O)),z.append("notes",`Evidence logged at case intake for ${i}`),z.append("assigned_officer","LUTKIN");const J=await(await fetch(`/api/cases/${encodeURIComponent(i)}/evidence`,{method:"POST",body:z})).json();J.success||console.warn("Upload error:",J.error)}it.conclaveChime(),M(`Dossier ${i} registered and locked into the Bureau Ledger.`),r(`ARG-1891-00${t.length+2}`),o(""),h(""),_([]),typeof e=="function"&&e()}catch(ee){alert(ee.message)}finally{v(!1)}},B=async D=>{if(confirm(`Are you certain you wish to delete and purge Case Dossier ${D}?`))try{await fetch(`/api/cases/${encodeURIComponent(D)}`,{method:"DELETE"}),it.cameraShutter(),typeof e=="function"&&e()}catch(ee){alert(ee.message)}};return x.jsxs("div",{className:"flex-1 flex flex-col h-full overflow-hidden bg-[#100d0a]",children:[x.jsxs("div",{className:"flex-none p-4 bg-gradient-to-r from-[#21140c] via-[#170e09] to-[#21140c] border-b-2 border-[#b1844c] flex items-center justify-between",children:[x.jsxs("div",{children:[x.jsx("h1",{className:"font-rye text-xl md:text-2xl text-[#f0d9ad] tracking-wide",children:"Case Files & Evidence Register"}),x.jsx("p",{className:"font-elite text-xs text-[#bda47b] mt-0.5",children:"Register classified case materials, compute cryptographic hashes, and maintain chain-of-custody."})]}),x.jsxs("span",{className:"badge px-3 py-1 bg-[#5b3922] border border-[#a17849] text-[#f4dfb6] font-elite text-xs",children:[t.length," REGISTERED DOSSIERS"]})]}),x.jsxs("div",{className:"flex-1 overflow-y-auto p-4 md:p-6 space-y-6",children:[x.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6",children:[x.jsxs("div",{className:"lg:col-span-7 vintage-card p-5 rounded",children:[x.jsxs("h2",{className:"font-rye text-lg text-[#3e2311] border-b border-[#a88258] pb-2 mb-4 flex items-center gap-2",children:[x.jsx(Hy,{size:18,className:"text-[#8d4829]"}),"Open a New Case Dossier"]}),x.jsxs("form",{onSubmit:A,className:"space-y-4",children:[x.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[x.jsxs("div",{children:[x.jsx("label",{className:"block text-[11px] font-elite font-bold text-[#56371f] mb-1",children:"CASE REFERENCE"}),x.jsx("input",{type:"text",required:!0,value:i,onChange:D=>r(D.target.value),className:"w-full p-2 bg-[#f6ecda] border border-[#96744c] rounded text-xs font-elite text-[#24170f] focus:outline-none focus:border-[#4d2f19]"})]}),x.jsxs("div",{children:[x.jsx("label",{className:"block text-[11px] font-elite font-bold text-[#56371f] mb-1",children:"CASE TITLE"}),x.jsx("input",{type:"text",required:!0,value:s,onChange:D=>o(D.target.value),placeholder:"e.g. The Silvercreek Telegraph Breach",className:"w-full p-2 bg-[#f6ecda] border border-[#96744c] rounded text-xs font-elite text-[#24170f] focus:outline-none focus:border-[#4d2f19]"})]})]}),x.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[x.jsxs("div",{children:[x.jsx("label",{className:"block text-[11px] font-elite font-bold text-[#56371f] mb-1",children:"SECURITY PRIORITY"}),x.jsxs("select",{value:a,onChange:D=>l(D.target.value),className:"w-full p-2 bg-[#f6ecda] border border-[#96744c] rounded text-xs font-elite text-[#24170f] focus:outline-none focus:border-[#4d2f19]",children:[x.jsx("option",{value:"Critical",children:"Critical Priority"}),x.jsx("option",{value:"High",children:"High Priority"}),x.jsx("option",{value:"Medium",children:"Medium Priority"}),x.jsx("option",{value:"Low",children:"Routine Priority"})]})]}),x.jsxs("div",{children:[x.jsx("label",{className:"block text-[11px] font-elite font-bold text-[#56371f] mb-1",children:"INVESTIGATION CATEGORY"}),x.jsx("input",{type:"text",value:c,onChange:D=>d(D.target.value),placeholder:"e.g. Financial Fraud / Wiretap",className:"w-full p-2 bg-[#f6ecda] border border-[#96744c] rounded text-xs font-elite text-[#24170f] focus:outline-none focus:border-[#4d2f19]"})]})]}),x.jsxs("div",{children:[x.jsx("label",{className:"block text-[11px] font-elite font-bold text-[#56371f] mb-1",children:"CASE NOTES / INTAKE SUMMARY"}),x.jsx("textarea",{rows:3,value:f,onChange:D=>h(D.target.value),placeholder:"Detail the mystery, initial witness testimony, suspect persons of interest...",className:"w-full p-2 bg-[#f6ecda] border border-[#96744c] rounded text-xs font-elite text-[#24170f] focus:outline-none focus:border-[#4d2f19]"})]}),x.jsxs("div",{children:[x.jsx("label",{className:"block text-[11px] font-elite font-bold text-[#56371f] mb-1",children:"PHYSICAL & DIGITAL EVIDENCE DEPOSITORY"}),x.jsxs("div",{onDragOver:D=>{D.preventDefault(),m(!0)},onDragLeave:()=>m(!1),onDrop:P,onClick:()=>document.getElementById("evidenceUploadInput").click(),className:`border-2 border-dashed p-6 text-center rounded cursor-pointer transition-all ${y?"border-[#5d3a20] bg-[#e2cc9f]":"border-[#98754b] bg-[#f2e6cf] hover:bg-[#ebdcc0]"}`,children:[x.jsx(Ay,{size:28,className:"mx-auto text-[#764f2e] mb-1"}),x.jsx("strong",{className:"block font-rye text-sm text-[#4b2d1d]",children:"Drop evidence files here or click to browse"}),x.jsx("span",{className:"block font-elite text-[10px] text-[#755637] mt-1",children:"Supports DOC, DOCX, XLS, CSV, JPG, PNG, PDF, TXT, DAT, LOG"}),x.jsx("input",{id:"evidenceUploadInput",type:"file",multiple:!0,hidden:!0,onChange:T})]}),p.length>0&&x.jsxs("div",{className:"mt-2.5 p-2 bg-[#ebdcc0] rounded border border-[#a88258] space-y-1.5",children:[x.jsxs("div",{className:"text-[10px] font-elite font-bold text-[#54351c] flex items-center justify-between",children:[x.jsxs("span",{children:[p.length," file(s) staged for custody:"]}),x.jsx("button",{type:"button",onClick:()=>_([]),className:"text-red-700 hover:underline",children:"Clear All"})]}),x.jsx("div",{className:"flex flex-wrap gap-1.5",children:p.map((D,ee)=>x.jsxs("span",{className:"inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#f7efdc] border border-[#a88258] text-[9px] font-elite text-[#3a2211]",children:[x.jsx(Fy,{size:10}),D.name," (",E(D.size),")",x.jsx("button",{type:"button",onClick:()=>L(ee),className:"hover:text-red-700 ml-0.5",children:"×"})]},ee))})]})]}),x.jsxs("div",{className:"pt-2 flex items-center justify-between",children:[x.jsx("button",{type:"submit",disabled:u,className:"western-btn-gold px-5 py-2 font-elite text-xs font-bold rounded shadow",children:u?"Registering Dossier...":"＋ Save Case Dossier & Evidence"}),g&&x.jsxs("span",{className:"text-xs font-elite text-[#31572c] font-bold flex items-center gap-1",children:[x.jsx(My,{size:13})," ",g]})]})]})]}),x.jsxs("div",{className:"lg:col-span-5 vintage-card p-5 rounded flex flex-col justify-between",children:[x.jsxs("div",{children:[x.jsxs("h2",{className:"font-rye text-lg text-[#3e2311] border-b border-[#a88258] pb-2 mb-3 flex items-center gap-2",children:[x.jsx(d1,{size:18,className:"text-[#8d4829]"}),"Evidence Custody Protocol"]}),x.jsx("p",{className:"font-elite text-xs text-[#523821] leading-relaxed mb-3",children:"Each evidence artifact committed to the ARGUS and Co. register is processed through Officer Lutkin's forensic intake pipeline. Cryptographic SHA-256 integrity hashes are computed instantly upon receipt."}),x.jsxs("div",{className:"p-3 bg-[#e8d7b7] rounded border border-[#96744c] space-y-2 mb-4",children:[x.jsx("h4",{className:"font-rye text-xs text-[#4b2d1d]",children:"Bureau Verification Standards:"}),x.jsxs("ul",{className:"text-[11px] font-elite text-[#5c3e25] space-y-1.5 pl-4 list-disc",children:[x.jsxs("li",{children:[x.jsx("strong",{children:"Zero File Mutation:"})," Raw byte contents remain preserved in local storage vault."]}),x.jsxs("li",{children:[x.jsx("strong",{children:"Cryptographic Checksums:"})," SHA-256 integrity seals prevent evidence tampering."]}),x.jsxs("li",{children:[x.jsx("strong",{children:"Role Segregation:"})," Forensics (Lutkin), OSINT (Vanguard), Anomaly (Cortex), Review (Apex), Verdict (Argus)."]}),x.jsxs("li",{children:[x.jsx("strong",{children:"Multi-Agent Corroboration:"})," No hypothesis accepted without dual-officer consensus."]})]})]})]}),x.jsx("div",{className:"pt-3 border-t border-[#96744c]/40 text-[10px] font-elite text-[#755535]",children:"ARGUS DETECTIVE AGENCY · EST. 1891 · EVIDENCE DIVISION"})]})]}),x.jsxs("div",{className:"vintage-card p-5 rounded",children:[x.jsx("h2",{className:"font-rye text-lg text-[#3e2311] border-b border-[#a88258] pb-2 mb-4",children:"Active Bureau Dossier Ledger"}),x.jsx("div",{className:"overflow-x-auto",children:x.jsxs("table",{className:"w-full text-left font-elite text-xs border-collapse",children:[x.jsx("thead",{children:x.jsxs("tr",{className:"bg-[#4b2e1b] text-[#f7e6ca]",children:[x.jsx("th",{className:"p-2.5",children:"CASE REFERENCE & TITLE"}),x.jsx("th",{className:"p-2.5",children:"PRIORITY"}),x.jsx("th",{className:"p-2.5",children:"CATEGORY"}),x.jsx("th",{className:"p-2.5",children:"EVIDENCE"}),x.jsx("th",{className:"p-2.5",children:"STATUS"}),x.jsx("th",{className:"p-2.5",children:"REGISTERED"}),x.jsx("th",{className:"p-2.5 text-right",children:"OPERATIONAL ACTIONS"})]})}),x.jsxs("tbody",{className:"divide-y divide-[#a88258]",children:[t.map(D=>x.jsxs("tr",{className:"hover:bg-[#ebdcc0] transition-colors",children:[x.jsxs("td",{className:"p-2.5 text-[#2b1b11]",children:[x.jsx("strong",{className:"font-rye text-sm text-[#4d2f19] block",children:D.case_ref}),x.jsx("span",{className:"text-xs text-[#523720]",children:D.title})]}),x.jsx("td",{className:"p-2.5",children:x.jsx("span",{className:`px-2 py-0.5 rounded text-[10px] font-bold ${D.priority==="Critical"?"bg-red-800 text-white":D.priority==="High"?"bg-amber-800 text-amber-100":"bg-[#68492c] text-[#f5ebd7]"}`,children:D.priority})}),x.jsx("td",{className:"p-2.5 text-[#4a321f] text-[11px]",children:D.category||"Classified"}),x.jsxs("td",{className:"p-2.5 text-[#3a2516] font-bold",children:[D.evidence_count||0," item(s)"]}),x.jsx("td",{className:"p-2.5",children:x.jsx("span",{className:"px-2 py-0.5 rounded text-[10px] bg-[#3a2516] text-[#dfcdb0]",children:D.status||"Active"})}),x.jsx("td",{className:"p-2.5 text-[#634830] text-[10px]",children:D.created_at?new Date(D.created_at).toLocaleDateString():"Active"}),x.jsxs("td",{className:"p-2.5 text-right space-x-2",children:[x.jsx("button",{onClick:()=>{it.telegraphBeep(),typeof n=="function"&&n(D.case_ref)},className:"western-btn px-2.5 py-1 text-[10px]",children:"⚒ Open in Lab"}),x.jsx("button",{onClick:()=>B(D.case_ref),className:"p-1 text-red-800 hover:text-red-950 transition-colors",title:"Delete Dossier",children:x.jsx(G0,{size:13})})]})]},D.id||D.case_ref)),t.length===0&&x.jsx("tr",{children:x.jsx("td",{colSpan:7,className:"p-8 text-center text-[#7e5f3f]",children:"No case dossiers found in active registry. Create a dossier above to begin investigation."})})]})]})})]})]})]})}function xA({cases:t=[],selectedCaseRef:e,onCaseChange:n,onOpenOfficerStudio:i,onViewReports:r}){const[s,o]=Ee.useState(null),[a,l]=Ee.useState([]),[c,d]=Ee.useState([]),[f,h]=Ee.useState(!1),[p,_]=Ee.useState("Select a case and launch the Bureau Conclave."),[y,m]=Ee.useState(null),u=Ee.useRef(null),v=Ee.useRef(null),g=async S=>{if(!S){o(null),l([]),d([]);return}try{const E=await(await fetch(`/api/cases/${encodeURIComponent(S)}`)).json();E.success&&(o(E.case),l(E.evidence||[]),d(E.deliberations||[]))}catch(L){console.error(L)}};Ee.useEffect(()=>(e&&(g(e),M(e)),()=>{u.current&&u.current.close()}),[e]);const M=S=>{u.current&&u.current.close();const L=new EventSource(`/api/cases/${encodeURIComponent(S)}/stream`);u.current=L,L.onmessage=E=>{try{const A=JSON.parse(E.data);A.type==="status"?(_(A.message),it.telegraphBeep()):A.type==="turn"?(it.typewriterClick(),m(A.officer),d(B=>B.some(D=>D.id===A.id)?B:[...B,A]),v.current&&(v.current.scrollTop=v.current.scrollHeight)):A.type==="completed"?(it.conclaveChime(),h(!1),m(null),_("Bureau Conclave successfully concluded. Official findings compiled."),g(S)):A.type==="error"&&(h(!1),_(`Conclave interrupted: ${A.error}`))}catch(A){console.error("SSE parse error:",A)}},L.onerror=()=>{}},P=async()=>{if(!(!e||f)){h(!0),_("Convening all 5 Bureau Officers for autonomous investigation..."),it.conclaveChime();try{const L=await(await fetch(`/api/cases/${encodeURIComponent(e)}/conclave`,{method:"POST"})).json();L.success||(h(!1),_(L.error||"Failed to start conclave"))}catch{h(!1),_("Network failure reaching Bureau AI agents.")}}},T=[{id:"ARGUS",name:"Detective Argus",role:"Chief Investigation Officer",model:"openrouter/free (Gemma-4-31B)",accent:"#f59e0b",borderClass:"border-amber-500",badge:"CHIEF",icon:"👑",desc:"Orchestrates case strategy, interrogates suspect motives, and issues final directives."},{id:"APEX",name:"Detective Apex",role:"Deputy Investigation Officer",model:"openrouter/free (Nemotron-3.5)",accent:"#a855f7",borderClass:"border-purple-500",badge:"DEPUTY",icon:"★",desc:"Challenges working assumptions, attacks confirmation bias, and protects against flawed conclusions."},{id:"LUTKIN",name:"Officer Lutkin",role:"Forensic Intelligence Officer",model:"openrouter/free (LFM-2.5)",accent:"#00d2ff",borderClass:"border-cyan-400",badge:"FORENSICS",icon:"🔬",desc:"Performs cryptographic hash inspection, digital log validation, and forgery analysis."},{id:"VANGUARD",name:"Officer Vanguard",role:"Intelligence Operations Officer",model:"openrouter/free (Nemotron-Omni)",accent:"#f97316",borderClass:"border-orange-500",badge:"INTEL & OSINT",icon:"🌐",desc:"Monitors public manifests, wire intercepts, transit coordinates, and syndicate entities."},{id:"CORTEX",name:"Officer Cortex",role:"Analytical Intelligence Officer",model:"openrouter/free (Gemma-4-26B)",accent:"#10b981",borderClass:"border-emerald-400",badge:"ANALYTICS",icon:"📊",desc:"Calculates probability matrices, identifies signal anomalies, and graphs relational link charts."}];return x.jsxs("div",{className:"flex-1 flex flex-col h-full overflow-hidden bg-[#100d0a]",children:[x.jsxs("div",{className:"flex-none p-4 bg-gradient-to-r from-[#21140c] via-[#170e09] to-[#21140c] border-b-2 border-[#b1844c] flex flex-wrap items-center justify-between gap-3",children:[x.jsxs("div",{children:[x.jsx("h1",{className:"font-rye text-xl md:text-2xl text-[#f0d9ad] tracking-wide flex items-center gap-2",children:"Investigation Laboratory & Conclave"}),x.jsx("p",{className:"font-elite text-xs text-[#bda47b] mt-0.5",children:"5-Stage Autonomous Multi-Agent Investigation Powered by Unlimited Free Models."})]}),x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx("label",{className:"text-xs font-elite text-[#d6bd94] font-bold",children:"SELECT CASE:"}),x.jsxs("select",{value:e||"",onChange:S=>n(S.target.value),className:"p-1.5 px-3 bg-[#f5e9cf] text-[#24170f] font-elite text-xs border border-[#9b7b50] rounded focus:outline-none",children:[x.jsx("option",{value:"",children:"Choose a case dossier…"}),t.map(S=>x.jsxs("option",{value:S.case_ref,children:[S.case_ref," — ",S.title]},S.case_ref))]})]})]}),x.jsxs("div",{className:"flex-1 overflow-y-auto p-4 md:p-6 space-y-6",children:[x.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6",children:[x.jsxs("div",{className:"lg:col-span-5 vintage-card p-5 rounded flex flex-col justify-between",children:[x.jsxs("div",{children:[x.jsxs("div",{className:"flex items-center justify-between border-b border-[#9c764e] pb-2 mb-3",children:[x.jsx("h2",{className:"font-rye text-base text-[#3e2311]",children:"Evidence Examination Bench"}),s&&x.jsxs("span",{className:"px-2 py-0.5 rounded text-[10px] font-elite bg-[#4d2f19] text-[#f7e4be]",children:[s.priority," Priority"]})]}),s?x.jsxs("div",{className:"space-y-3 font-elite text-xs text-[#4b301a]",children:[x.jsxs("div",{children:[x.jsx("h3",{className:"font-rye text-sm text-[#4b2d1d]",children:s.title}),x.jsx("p",{className:"text-[11px] text-[#634830] mt-1",children:s.notes||"No intake notes."})]}),x.jsxs("div",{className:"p-3 bg-[#e8d5b5] rounded border border-[#96744c]",children:[x.jsxs("div",{className:"text-[10px] font-bold text-[#5c3e25] mb-1.5",children:["REGISTERED EVIDENCE PIECES (",a.length,"):"]}),a.length>0?x.jsx("ul",{className:"space-y-1.5 text-[11px] max-h-36 overflow-y-auto pr-1",children:a.map((S,L)=>x.jsxs("li",{className:"p-1.5 bg-[#f5ecdc] rounded border border-[#bfa27a]",children:[x.jsxs("div",{className:"flex items-center justify-between font-bold",children:[x.jsx("span",{children:S.original_name}),x.jsx("span",{className:"text-[9px] px-1 bg-[#4d2f19] text-white rounded",children:S.file_type})]}),x.jsxs("div",{className:"text-[9px] text-[#6d5137] font-mono-code truncate mt-0.5",children:["Hash: ",S.hash_sha256||"Calculated on intake"]})]},L))}):x.jsx("p",{className:"text-[11px] text-[#856546] italic",children:"No evidence files logged yet. Add in Case Files view."})]})]}):x.jsx("div",{className:"py-12 text-center text-[#806344] font-elite text-xs",children:"Choose a case dossier from the dropdown to initialize workbench."})]}),x.jsxs("div",{className:"pt-4 border-t border-[#96744c]/40 mt-4 space-y-2",children:[x.jsx("button",{onClick:P,disabled:!e||f,className:"w-full western-btn-gold py-2.5 font-elite text-xs font-bold rounded flex items-center justify-center gap-2 shadow-md",children:f?x.jsxs(x.Fragment,{children:[x.jsx(rd,{size:14,className:"animate-spin"}),x.jsx("span",{children:"Conclave in Progress..."})]}):x.jsxs(x.Fragment,{children:[x.jsx(Zy,{size:14,fill:"currentColor"}),x.jsx("span",{children:"Run Autonomous Bureau Conclave"})]})}),x.jsxs("div",{className:"text-[10px] font-elite text-[#6b4e33] flex items-center justify-between",children:[x.jsxs("span",{className:"truncate max-w-[280px]",children:["Status: ",p]}),c.length>0&&x.jsxs("button",{onClick:()=>r(e),className:"text-[#854524] hover:underline font-bold flex items-center gap-1",children:["View Report ",x.jsx(py,{size:10})]})]})]})]}),x.jsxs("div",{className:"lg:col-span-7 vintage-card p-5 rounded",children:[x.jsxs("h2",{className:"font-rye text-base text-[#3e2311] border-b border-[#9c764e] pb-2 mb-3 flex items-center justify-between",children:[x.jsx("span",{children:"Bureau Officers on Duty (Click to Inspect in 3D)"}),x.jsx("span",{className:"text-[10px] font-elite text-[#7a5839]",children:"5 Specialists Assigned"})]}),x.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3",children:T.map(S=>{const L=y===S.id;return x.jsxs("div",{onClick:()=>{it.biometricScanHum(),typeof i=="function"&&i(S.id)},className:`relative p-2.5 rounded bg-[#ebdcc0] border-2 transition-all cursor-pointer hover:bg-[#e4d1ad] ${L?"ring-4 ring-amber-500 scale-105 border-amber-600 shadow-xl":"border-[#96744c] hover:border-[#4d2f19]"}`,children:[L&&x.jsx("span",{className:"absolute -top-2 -right-2 px-1.5 py-0.5 rounded text-[8px] font-elite bg-amber-600 text-white font-bold animate-pulse",children:"SPEAKING"}),x.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[x.jsx("div",{className:"w-10 h-10 rounded border border-[#4d2f19] shadow flex items-center justify-center text-lg bg-[#24170f]",style:{borderColor:S.accent},children:x.jsx("span",{children:S.icon})}),x.jsxs("div",{children:[x.jsx("span",{className:"text-[9px] font-elite px-1 rounded text-white font-bold",style:{backgroundColor:S.accent},children:S.badge}),x.jsx("h4",{className:"font-rye text-xs text-[#3b2413] mt-0.5 leading-none",children:S.name})]})]}),x.jsx("p",{className:"font-elite text-[9px] leading-tight text-[#5a3e26] line-clamp-2 mb-1.5",children:S.desc}),x.jsxs("div",{className:"text-[8px] font-mono-code text-[#735133] border-t border-[#bfa27a] pt-1 truncate",children:["Model: ",S.model.split("/")[1]||S.model]})]},S.id)})})]})]}),x.jsxs("div",{className:"vintage-card p-5 rounded",children:[x.jsxs("div",{className:"flex items-center justify-between border-b border-[#9c764e] pb-2 mb-4",children:[x.jsxs("h2",{className:"font-rye text-lg text-[#3e2311] flex items-center gap-2",children:[x.jsx(H0,{size:18,className:"text-[#c69a50]"}),"Bureau Conclave Deliberation Feed"]}),x.jsxs("span",{className:"font-elite text-xs text-[#6e4e30]",children:[c.length," Statements Logged"]})]}),x.jsxs("div",{ref:v,className:"h-[380px] overflow-y-auto space-y-3.5 pr-2 font-elite text-xs",children:[c.map((S,L)=>{const E=T.find(A=>A.id===S.officer||A.name===S.officer_name)||T[0];return x.jsxs("div",{className:"p-3.5 rounded bg-[#f5ece0] border-l-4 shadow-sm",style:{borderLeftColor:E.accent},children:[x.jsxs("div",{className:"flex items-center justify-between mb-1.5 pb-1 border-b border-[#debda0]",children:[x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx("img",{src:E.face,alt:E.name,className:"w-6 h-6 rounded-full object-cover border border-[#4d2f19]"}),x.jsx("strong",{className:"font-rye text-xs text-[#3d2412]",children:S.officer_name||E.name}),x.jsxs("span",{className:"text-[10px] text-[#78593a]",children:["— ",S.role||E.role]})]}),x.jsx("span",{className:"text-[9px] font-mono-code text-[#8f6e4d]",children:S.model_used?S.model_used.split("/")[1]||S.model_used:"bureau-conclave"})]}),x.jsx("div",{className:"text-xs leading-relaxed text-[#3b2413] whitespace-pre-wrap",children:S.message})]},S.id||L)}),f&&x.jsxs("div",{className:"p-4 bg-[#f2e6d5] border border-dashed border-[#a68056] rounded text-[#6b4b2c] flex items-center gap-3 animate-pulse",children:[x.jsx(rd,{size:16,className:"animate-spin text-[#c69a50]"}),x.jsxs("div",{children:[x.jsx("p",{className:"font-rye text-xs text-[#4b2d1d]",children:"The Bureau is Deliberating..."}),x.jsx("p",{className:"text-[10px] mt-0.5",children:p})]})]}),c.length===0&&!f&&x.jsxs("div",{className:"py-20 text-center text-[#826444] font-elite",children:[x.jsx("p",{children:"The deliberation floor is currently quiet."}),x.jsx("p",{className:"text-[11px] mt-1",children:'Select a case dossier and click "Run Autonomous Bureau Conclave" to begin.'})]})]})]})]})]})}function _A({caseRef:t,onClueSelected:e}){const[n,i]=Ee.useState([]),[r,s]=Ee.useState(!0),[o,a]=Ee.useState(!1),[l,c]=Ee.useState(""),[d,f]=Ee.useState("evidence"),[h,p]=Ee.useState(""),[_,y]=Ee.useState(null),[m,u]=Ee.useState(null),v=Ee.useRef(null),g=async()=>{try{s(!0);const L=await(await fetch(`/api/cases/${t}/clues`)).json();L.success&&i(L.clues.map(E=>({...E,connections:typeof E.connections=="string"?JSON.parse(E.connections||"[]"):E.connections||[]})))}catch(S){console.error("Failed to load clues:",S)}finally{s(!1)}};Ee.useEffect(()=>{t&&g()},[t]);const M=async S=>{if(S.preventDefault(),!l.trim())return;it.cameraShutter();const L={suspect:"#f59e0b",evidence:"#00d2ff",location:"#10b981",hypothesis:"#a855f7"};try{(await(await fetch(`/api/cases/${t}/clues`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:l.trim(),type:d,description:h.trim(),pos_x:(Math.random()-.5)*4,pos_y:(Math.random()-.5)*3,color:L[d]||"#d9c49b",connections:[]})})).json()).success&&(c(""),p(""),a(!1),g())}catch(E){console.error(E)}},P=async(S,L)=>{if(L.stopPropagation(),!!confirm("Remove this pinned clue from the investigation board?"))try{await fetch(`/api/clues/${S}`,{method:"DELETE"}),g()}catch(E){console.error(E)}},T=async S=>{if(!m||m===S){u(S),it.telegraphBeep();return}it.cameraShutter();const L=n.find(A=>A.id===m);if(!L)return;const E=Array.from(new Set([...L.connections,S]));try{await fetch(`/api/clues/${L.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({connections:E})}),u(null),g()}catch(A){console.error(A)}};return x.jsxs("div",{className:"relative w-full h-full flex flex-col bg-[#140e0a] overflow-hidden select-none",children:[x.jsxs("div",{className:"h-12 bg-gradient-to-r from-[#21140c] via-[#160e09] to-[#21140c] border-b border-[#734e2c] px-4 flex items-center justify-between z-20 flex-none",children:[x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx($y,{size:16,className:"text-[#c69a50]"}),x.jsxs("h2",{className:"font-rye text-sm md:text-base text-[#f2e0be]",children:["CLUES & SUSPECT WEB — ",t]}),x.jsxs("span",{className:"text-[10px] font-elite text-[#bd9f6f]",children:["(",n.length," Items Pinned)"]})]}),x.jsxs("div",{className:"flex items-center gap-2",children:[m&&x.jsxs("div",{className:"text-[10px] font-elite bg-red-950/80 border border-red-500 text-red-200 px-2 py-0.5 rounded flex items-center gap-1.5 animate-pulse",children:[x.jsx("span",{children:"Stringing Red Yarn: Click target clue to attach"}),x.jsx("button",{onClick:()=>u(null),className:"hover:text-white",children:x.jsx(Sl,{size:12})})]}),x.jsxs("button",{onClick:()=>a(!0),className:"western-btn text-[11px] py-1 px-3 border-[#c49a52]",children:[x.jsx(Qy,{size:13})," Pin New Clue"]}),x.jsx("button",{onClick:g,className:"western-btn text-[11px] py-1 px-2.5",title:"Refresh Board",children:x.jsx(rd,{size:13,className:r?"animate-spin":""})})]})]}),x.jsxs("div",{ref:v,className:"relative flex-1 bg-[#1a120b] overflow-auto p-8",style:{backgroundImage:`
            radial-gradient(circle at 50% 50%, rgba(20, 14, 9, 0.45) 0%, rgba(8, 5, 3, 0.95) 100%),
            url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop')
          `,backgroundSize:"cover",backgroundPosition:"center"},children:[x.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none"}),x.jsx("div",{className:"relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto",children:n.map(S=>{var A;const L=(_==null?void 0:_.id)===S.id,E=m===S.id;return x.jsxs("div",{onClick:()=>{m?T(S.id):y(S)},className:`relative p-4 rounded bg-[#e8d5b5] text-[#2c1c11] border-2 shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 ${E?"border-red-600 ring-4 ring-red-500/50 scale-105":L?"border-[#c69a50] ring-2 ring-[#c69a50]":"border-[#94734b] hover:border-[#b88f57]"}`,style:{boxShadow:"0 8px 22px rgba(0,0,0,0.6)"},children:[x.jsx("div",{className:"absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-[#ffd580] via-[#c69a50] to-[#784e1b] border border-[#ffe9b8] shadow-md flex items-center justify-center",children:x.jsx("div",{className:"w-1.5 h-1.5 rounded-full bg-[#3d240e]"})}),x.jsxs("div",{className:"flex items-center justify-between text-[10px] font-elite font-bold tracking-wider mb-2 pt-1 border-b border-[#8f6d44]/30 pb-1",children:[x.jsx("span",{className:"px-2 py-0.5 rounded text-[9px] uppercase tracking-wider text-black font-semibold",style:{backgroundColor:S.color||"#d9c49b"},children:S.type}),x.jsxs("div",{className:"flex items-center gap-1",children:[x.jsx("button",{onClick:B=>{B.stopPropagation(),u(S.id),it.telegraphBeep()},className:"p-1 hover:text-red-700 transition-colors",title:"Attach Red Yarn",children:x.jsx(Yy,{size:12})}),x.jsx("button",{onClick:B=>P(S.id,B),className:"p-1 hover:text-red-800 transition-colors",title:"Delete",children:x.jsx(G0,{size:12})})]})]}),S.image_url&&x.jsx("div",{className:"mb-2 p-1 bg-white shadow rounded overflow-hidden",children:x.jsx("img",{src:S.image_url,alt:S.title,className:"w-full h-32 object-cover rounded filter contrast-105 brightness-95"})}),x.jsx("h3",{className:"font-rye text-sm leading-snug mb-1 text-[#3b2413]",children:S.title}),x.jsx("p",{className:"font-elite text-xs leading-relaxed text-[#543b23] line-clamp-3",children:S.description||"No description recorded."}),((A=S.connections)==null?void 0:A.length)>0&&x.jsxs("div",{className:"mt-3 pt-1 border-t border-[#8f6d44]/30 text-[9px] font-elite text-red-900 font-bold flex items-center gap-1",children:[x.jsx("span",{className:"w-2 h-2 rounded-full bg-red-600 inline-block"}),x.jsxs("span",{children:["Connected to ",S.connections.length," item(s) by red yarn"]})]})]},S.id)})}),n.length===0&&!r&&x.jsxs("div",{className:"text-center py-24 text-[#9c7d54] font-elite",children:[x.jsx("p",{className:"text-sm",children:"No evidence or suspect items pinned to this case board yet."}),x.jsx("p",{className:"text-xs mt-1",children:'Click "Pin New Clue" above or run the Bureau Conclave to auto-generate findings.'})]})]}),o&&x.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150",children:x.jsxs("form",{onSubmit:M,className:"w-full max-w-md bg-[#e4d1ad] text-[#2b1b11] p-6 rounded border-2 border-[#805e3a] shadow-2xl space-y-4",children:[x.jsxs("div",{className:"flex items-center justify-between border-b border-[#9c764e] pb-2",children:[x.jsx("h3",{className:"font-rye text-lg text-[#3e2311]",children:"Pin Clue / Suspect to Board"}),x.jsx("button",{type:"button",onClick:()=>a(!1),className:"hover:text-red-800",children:x.jsx(Sl,{size:18})})]}),x.jsxs("div",{children:[x.jsx("label",{className:"block text-xs font-elite font-bold mb-1 text-[#4d2f19]",children:"TITLE / ENTITY NAME"}),x.jsx("input",{type:"text",required:!0,value:l,onChange:S=>c(S.target.value),placeholder:"e.g. Master Key Override Token",className:"w-full p-2 bg-[#f4e8cf] border border-[#8f6a42] rounded text-xs font-elite focus:outline-none focus:border-[#4d2f19]"})]}),x.jsxs("div",{children:[x.jsx("label",{className:"block text-xs font-elite font-bold mb-1 text-[#4d2f19]",children:"CATEGORY / CLUE TYPE"}),x.jsxs("select",{value:d,onChange:S=>f(S.target.value),className:"w-full p-2 bg-[#f4e8cf] border border-[#8f6a42] rounded text-xs font-elite focus:outline-none focus:border-[#4d2f19]",children:[x.jsx("option",{value:"evidence",children:"Evidence Item (Digital/Physical)"}),x.jsx("option",{value:"suspect",children:"Suspect / Person of Interest"}),x.jsx("option",{value:"location",children:"Crime Scene / Location"}),x.jsx("option",{value:"hypothesis",children:"Investigative Hypothesis / Theory"})]})]}),x.jsxs("div",{children:[x.jsx("label",{className:"block text-xs font-elite font-bold mb-1 text-[#4d2f19]",children:"CASE OBSERVATION NOTES"}),x.jsx("textarea",{rows:3,value:h,onChange:S=>p(S.target.value),placeholder:"Describe observations, timestamps, inconsistencies...",className:"w-full p-2 bg-[#f4e8cf] border border-[#8f6a42] rounded text-xs font-elite focus:outline-none focus:border-[#4d2f19]"})]}),x.jsxs("div",{className:"flex justify-end gap-2 pt-2",children:[x.jsx("button",{type:"button",onClick:()=>a(!1),className:"px-3 py-1.5 text-xs font-elite border border-[#8f6a42] rounded",children:"Cancel"}),x.jsx("button",{type:"submit",className:"western-btn-gold px-4 py-1.5 text-xs font-elite rounded font-bold",children:"Pin to Board"})]})]})})]})}function yA({cases:t=[],initialCaseRef:e=null}){var _;const[n,i]=Ee.useState(e||((_=t[0])==null?void 0:_.case_ref)||""),[r,s]=Ee.useState([]),[o,a]=Ee.useState(null),[l,c]=Ee.useState(!1);Ee.useEffect(()=>{e?i(e):!n&&t.length>0&&i(t[0].case_ref)},[e,t]),Ee.useEffect(()=>{n&&d(n)},[n]);const d=async y=>{try{const u=await(await fetch(`/api/cases/${encodeURIComponent(y)}/reports`)).json();u.success&&u.reports.length>0?(s(u.reports),a(u.reports[0])):(s([]),a(null))}catch(m){console.error(m)}},f=()=>{if(!o)return;it.cameraShutter();const y=new Blob([o.full_report_text],{type:"text/plain;charset=utf-8"}),m=URL.createObjectURL(y),u=document.createElement("a");u.href=m,u.download=`ARGUS_${n}_Classified_Report.txt`,u.click(),URL.revokeObjectURL(m)},h=()=>{o&&(it.typewriterClick(),navigator.clipboard.writeText(o.full_report_text),c(!0),setTimeout(()=>c(!1),2e3))},p=()=>{it.typewriterClick(),window.print()};return x.jsxs("div",{className:"flex-1 flex flex-col h-full overflow-hidden bg-[#100d0a]",children:[x.jsxs("div",{className:"flex-none p-4 bg-gradient-to-r from-[#21140c] via-[#170e09] to-[#21140c] border-b-2 border-[#b1844c] flex flex-wrap items-center justify-between gap-3",children:[x.jsxs("div",{children:[x.jsx("h1",{className:"font-rye text-xl md:text-2xl text-[#f0d9ad] tracking-wide",children:"Classified Bureau Reports & Findings Desk"}),x.jsx("p",{className:"font-elite text-xs text-[#bda47b] mt-0.5",children:"Review certified multi-agent investigation dossiers, forensic findings, and executive verdicts."})]}),x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx("label",{className:"text-xs font-elite text-[#d6bd94] font-bold",children:"CASE DOSSIER:"}),x.jsx("select",{value:n,onChange:y=>i(y.target.value),className:"p-1.5 px-3 bg-[#f5e9cf] text-[#24170f] font-elite text-xs border border-[#9b7b50] rounded focus:outline-none",children:t.map(y=>x.jsxs("option",{value:y.case_ref,children:[y.case_ref," — ",y.title]},y.case_ref))})]})]}),x.jsxs("div",{className:"flex-1 overflow-y-auto p-4 md:p-6 space-y-6",children:[x.jsxs("div",{className:"vintage-card p-4 rounded flex flex-wrap items-center justify-between gap-3",children:[x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx(z0,{size:18,className:"text-[#8d4829]"}),x.jsx("span",{className:"font-rye text-sm text-[#3b2413]",children:o?o.title:`No compiled report for ${n}`})]}),x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsxs("button",{onClick:h,disabled:!o,className:"western-btn text-xs py-1.5 px-3",children:[l?x.jsx(yy,{size:13,className:"text-green-600"}):x.jsx(Cy,{size:13}),x.jsx("span",{children:l?"Copied":"Copy Text"})]}),x.jsxs("button",{onClick:p,disabled:!o,className:"western-btn text-xs py-1.5 px-3",children:[x.jsx(t1,{size:13})," Print / PDF"]}),x.jsxs("button",{onClick:f,disabled:!o,className:"western-btn-gold text-xs py-1.5 px-4 font-bold",children:[x.jsx(Ny,{size:13})," Download .txt"]})]})]}),o?x.jsxs("div",{className:"max-w-4xl mx-auto p-8 md:p-12 rounded bg-[#f5ecdb] text-[#2a1a0f] border border-[#a17e55] shadow-2xl font-elite relative",children:[x.jsx("div",{className:"absolute top-6 right-6 border-2 border-red-800 text-red-800 px-3 py-1 text-[11px] font-bold tracking-widest rotate-6 select-none opacity-85",children:"CLASSIFIED · BUREAU SEAL"}),x.jsxs("div",{className:"text-center border-b-2 border-[#7a5433] pb-4 mb-6",children:[x.jsx("img",{src:"/favicon.png",alt:"ARGUS & Co.",className:"w-16 h-16 mx-auto mb-2 rounded-full border border-[#b1844c] shadow-md"}),x.jsx("h2",{className:"font-rye text-2xl text-[#3b2414] tracking-wide",children:"ARGUS & Co."}),x.jsx("p",{className:"text-xs text-[#6e4e30] tracking-widest mt-1",children:"WESTERN INVESTIGATION BUREAU · FRONTIER DISTRICT"}),x.jsx("p",{className:"text-[10px] text-[#8c6945] mt-0.5",children:"EXECUTIVE DOSSIER FINDINGS REPORT"})]}),x.jsx("div",{className:"whitespace-pre-wrap text-xs md:text-sm leading-relaxed text-[#2c1c11] font-elite",children:o.full_report_text}),x.jsxs("div",{className:"mt-10 pt-6 border-t-2 border-[#7a5433] flex flex-wrap justify-between items-center text-[10px] text-[#735334]",children:[x.jsxs("div",{children:[x.jsx("p",{children:"CERTIFIED IN ACCORDANCE WITH BUREAU EVIDENCE PROTOCOLS"}),x.jsxs("p",{className:"font-mono-code mt-0.5",children:["GENERATED BY: ",o.generated_by||"BUREAU_AI_CONCLAVE"]})]}),x.jsxs("div",{className:"text-right",children:[x.jsx("p",{className:"font-rye text-sm text-[#4d2f19]",children:"Detective Argus"}),x.jsx("p",{children:"CHIEF INVESTIGATION OFFICER"})]})]})]}):x.jsxs("div",{className:"vintage-card p-12 text-center text-[#7e5f3f] font-elite max-w-xl mx-auto",children:[x.jsx(B0,{size:36,className:"mx-auto mb-3 text-[#a87e53]"}),x.jsxs("h3",{className:"font-rye text-base text-[#4b2d1d] mb-1",children:["No Report Generated for ",n]}),x.jsxs("p",{className:"text-xs leading-relaxed",children:["To produce an official findings report, navigate to the ",x.jsx("strong",{children:"Investigation Lab"})," and click ",x.jsx("strong",{children:'"Run Autonomous Bureau Conclave"'}),". All 5 specialist officers will synthesize and certify the report automatically."]})]})]})]})}function SA({cases:t=[],onSelectCase:e}){const[n,i]=Ee.useState(""),[r,s]=Ee.useState("ALL"),[o,a]=Ee.useState([]);Ee.useEffect(()=>{fetch("/api/audit").then(c=>c.json()).then(c=>{c.success&&a(c.logs||[])}).catch(console.error)},[]);const l=t.filter(c=>{const d=c.case_ref.toLowerCase().includes(n.toLowerCase())||c.title.toLowerCase().includes(n.toLowerCase())||c.category&&c.category.toLowerCase().includes(n.toLowerCase()),f=r==="ALL"||c.status===r;return d&&f});return x.jsxs("div",{className:"flex-1 flex flex-col h-full overflow-hidden bg-[#100d0a]",children:[x.jsxs("div",{className:"flex-none p-4 bg-gradient-to-r from-[#21140c] via-[#170e09] to-[#21140c] border-b-2 border-[#b1844c] flex items-center justify-between",children:[x.jsxs("div",{children:[x.jsx("h1",{className:"font-rye text-xl md:text-2xl text-[#f0d9ad] tracking-wide",children:"Agency Archives & Chain of Custody Ledger"}),x.jsx("p",{className:"font-elite text-xs text-[#bda47b] mt-0.5",children:"Historical case dossiers, immutable audit records, and officer operational activity."})]}),x.jsxs("span",{className:"badge px-3 py-1 bg-[#5b3922] border border-[#a17849] text-[#f4dfb6] font-elite text-xs",children:[t.length," HISTORICAL RECORDS"]})]}),x.jsxs("div",{className:"flex-1 overflow-y-auto p-4 md:p-6 space-y-6",children:[x.jsxs("div",{className:"vintage-card p-4 rounded flex flex-wrap items-center justify-between gap-3",children:[x.jsxs("div",{className:"flex items-center gap-2 flex-1 min-w-[240px]",children:[x.jsx(o1,{size:16,className:"text-[#8d4829]"}),x.jsx("input",{type:"text",value:n,onChange:c=>i(c.target.value),placeholder:"Search by case reference, title, or category...",className:"w-full p-2 bg-[#f4e8cf] text-[#24170f] font-elite text-xs border border-[#9b7b50] rounded focus:outline-none"})]}),x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx("label",{className:"text-xs font-elite text-[#523720] font-bold",children:"STATUS:"}),x.jsxs("select",{value:r,onChange:c=>s(c.target.value),className:"p-1.5 px-3 bg-[#f4e8cf] text-[#24170f] font-elite text-xs border border-[#9b7b50] rounded focus:outline-none",children:[x.jsx("option",{value:"ALL",children:"All Statuses"}),x.jsx("option",{value:"Active",children:"Active"}),x.jsx("option",{value:"Under Deliberation",children:"Under Deliberation"}),x.jsx("option",{value:"Solved",children:"Solved"})]})]})]}),x.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:l.map(c=>x.jsxs("div",{className:"vintage-card p-4 rounded hover:bg-[#ebdcc0] transition-all flex flex-col justify-between",children:[x.jsxs("div",{children:[x.jsxs("div",{className:"flex items-center justify-between border-b border-[#a88258] pb-1.5 mb-2",children:[x.jsx("span",{className:"font-rye text-sm text-[#4d2f19]",children:c.case_ref}),x.jsx("span",{className:"text-[10px] font-elite px-2 py-0.5 rounded bg-[#4d2f19] text-[#f7e6ca]",children:c.status||"Active"})]}),x.jsx("h3",{className:"font-rye text-base text-[#301b0f] mb-1 leading-snug",children:c.title}),x.jsx("p",{className:"font-elite text-xs text-[#523720] line-clamp-3 mb-3",children:c.notes||c.summary||"No intake summary."}),x.jsxs("div",{className:"text-[10px] font-elite text-[#6e4e30] space-y-1 mb-4",children:[x.jsxs("div",{children:[x.jsx("strong",{children:"CATEGORY:"})," ",c.category||"Classified"]}),x.jsxs("div",{children:[x.jsx("strong",{children:"PRIORITY:"})," ",c.priority]}),x.jsxs("div",{children:[x.jsx("strong",{children:"EVIDENCE ATTACHED:"})," ",c.evidence_count||0," file(s)"]})]})]}),x.jsxs("div",{className:"pt-2 border-t border-[#a88258] flex items-center justify-between",children:[x.jsx("span",{className:"text-[9px] font-elite text-[#856545]",children:c.created_at?new Date(c.created_at).toLocaleDateString():"Historical"}),x.jsxs("button",{onClick:()=>{it.telegraphBeep(),typeof e=="function"&&e(c.case_ref)},className:"western-btn text-[10px] py-1 px-2.5 flex items-center gap-1",children:[x.jsx("span",{children:"Re-open Dossier"}),x.jsx(gy,{size:11})]})]})]},c.case_ref))}),x.jsxs("div",{className:"vintage-card p-5 rounded",children:[x.jsxs("div",{className:"flex items-center gap-2 border-b border-[#a88258] pb-2 mb-3",children:[x.jsx(wy,{size:16,className:"text-[#8d4829]"}),x.jsx("h2",{className:"font-rye text-base text-[#3e2311]",children:"Bureau Immutable Audit Log & Chain of Custody"})]}),x.jsxs("div",{className:"max-h-64 overflow-y-auto font-elite text-xs text-[#3a2516] divide-y divide-[#a88258]/40",children:[o.map(c=>x.jsxs("div",{className:"py-2 flex items-center justify-between",children:[x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx("span",{className:"px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#4b2d1d] text-[#f2e0be]",children:c.officer||"SYSTEM"}),x.jsxs("strong",{className:"text-[#4b2d1d]",children:[c.action,":"]}),x.jsx("span",{children:c.details||c.case_ref})]}),x.jsx("span",{className:"text-[10px] text-[#735334] font-mono-code",children:c.created_at?new Date(c.created_at).toLocaleTimeString():""})]},c.id)),o.length===0&&x.jsx("div",{className:"py-6 text-center text-[#7e5f3f]",children:"No audit events registered in current ledger."})]})]})]})]})}function MA({agentId:t,onClose:e,activeCaseRef:n=null}){const i=Ee.useRef(null),r=Ee.useRef(null),[s,o]=Ee.useState("realistic"),[a,l]=Ee.useState([]),[c,d]=Ee.useState(""),[f,h]=Ee.useState(!1),[p,_]=Ee.useState(!1),y={ARGUS:{name:"Detective Argus",title:"Chief Investigation Officer",badge:"BUREAU COMMAND",accent:"#f59e0b",borderClass:"border-amber-500",model:"openrouter/free (Gemma-4-31B)",specialty:"Strategy, Motive Synthesis, Final Directives",greeting:"I am Detective Argus. What matter requires chief command review?"},APEX:{name:"Detective Apex",title:"Deputy Investigation Officer",badge:"RED-TEAM AUDITOR",accent:"#a855f7",borderClass:"border-purple-500",model:"openrouter/free (Nemotron-3.5)",specialty:"Skeptical Cross-Examination, Confirmation Bias Defense",greeting:"Detective Apex here. Before you accept that theory, let us tear it apart."},LUTKIN:{name:"Officer Lutkin",title:"Forensic Intelligence Officer",badge:"DIGITAL FORENSICS",accent:"#00d2ff",borderClass:"border-cyan-400",model:"openrouter/free (LFM-2.5)",specialty:"Cryptographic Hashes, Audio Spectrograms, Forgeries",greeting:"Officer Lutkin at the bench. Files and physical evidence tell the unvarnished truth."},VANGUARD:{name:"Officer Vanguard",title:"Intelligence Operations Officer",badge:"FIELD INTEL & OSINT",accent:"#f97316",borderClass:"border-orange-500",model:"openrouter/free (Nemotron-Omni)",specialty:"Surveillance Wires, Transit Logs, Public Registries",greeting:"Officer Vanguard reporting. Coordinates, routes, and movement patterns locked."},CORTEX:{name:"Officer Cortex",title:"Analytical Intelligence Officer",badge:"ANALYTICS & LINK GRAPH",accent:"#10b981",borderClass:"border-emerald-400",model:"openrouter/free (Gemma-4-26B)",specialty:"Anomaly Detection, Harmonic Packets, Entity Clusters",greeting:"Officer Cortex online. The mathematical probability of coincidence is near zero."}},m=y[t]||y.ARGUS;Ee.useEffect(()=>{it.biometricScanHum(),l([{role:"assistant",content:m.greeting,model:m.model}])},[t]),Ee.useEffect(()=>{const g=i.current;if(!g)return;const M=new Sv;M.background=new qe(788743);const P=new _f({canvas:g,antialias:!0,alpha:!0});P.setPixelRatio(Math.min(window.devicePixelRatio,2)),P.shadowMap.enabled=!0,P.toneMapping=ff,P.toneMappingExposure=1.25;const T=new an(40,g.clientWidth/g.clientHeight,.1,50);T.position.set(0,2.15,3.2),T.lookAt(0,2.05,0);const S=new pd(16772564,3.2);S.position.set(2.5,4.5,3),S.castShadow=!0,M.add(S);const L=new pd(4219013,1.4);L.position.set(-3,2.5,2),M.add(L);const E=new _o(parseInt(m.accent.replace("#","0x")),3.5,6);E.position.set(0,3.2,-2.2),M.add(E);const A=new aA(2234384,1.2);M.add(A);const B=Rv(t,{isStudio:!0,scale:1});M.add(B);const D=new Jn(1.2,1.2,.04,32),ee=new hi({color:1314314,roughness:.8,metalness:.3}),I=new Xe(D,ee);I.position.y=-.02,M.add(I);let z=!1,k={x:0},J=0;const O={x:0,y:0},H=he=>{z=!0,k={x:he.clientX,y:he.clientY}},j=he=>{const be=g.getBoundingClientRect();if(O.x=(he.clientX-be.left)/be.width*2-1,O.y=-((he.clientY-be.top)/be.height)*2+1,z){const Pe=he.clientX-k.x;J+=Pe*.008,k={x:he.clientX,y:he.clientY}}},te=()=>{z=!1},ie=he=>{he.preventDefault(),T.position.z=sn.clamp(T.position.z+he.deltaY*.002,1.8,4.5)};g.addEventListener("mousedown",H),window.addEventListener("mousemove",j),window.addEventListener("mouseup",te),g.addEventListener("wheel",ie,{passive:!1});const Y=()=>{if(!g)return;const he=g.clientWidth,be=g.clientHeight;P.setSize(he,be,!1),T.aspect=he/be,T.updateProjectionMatrix()};Y(),window.addEventListener("resize",Y);let X=!0;const le=new Cv;function me(){if(!X)return;requestAnimationFrame(me);const he=le.getElapsedTime();B.rotation.y=sn.lerp(B.rotation.y,J,.08),B.update(he,O,p),P.render(M,T)}return me(),r.current={character:B,setRenderMode:he=>B.setRenderMode(he),resetRotation:()=>{J=0,T.position.set(0,2.15,3.2)}},()=>{X=!1,g.removeEventListener("mousedown",H),window.removeEventListener("mousemove",j),window.removeEventListener("mouseup",te),g.removeEventListener("wheel",ie),window.removeEventListener("resize",Y),P.dispose()}},[t,p]);const u=g=>{o(g),r.current&&r.current.setRenderMode(g),it.telegraphBeep()},v=async g=>{if(g==null||g.preventDefault(),!c.trim()||f)return;const M=c.trim();d(""),it.typewriterClick();const P=[...a,{role:"user",content:M}];l(P),h(!0),_(!0);try{const S=await(await fetch("/api/interrogate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({officerId:t,message:M,caseRef:n,history:a.slice(-6)})})).json();S.success&&S.reply?(it.typewriterClick(),l(L=>[...L,{role:"assistant",content:S.reply,model:S.modelUsed}])):l(L=>[...L,{role:"assistant",content:"Connection temporarily disrupted. Repeating statement.",model:"offline"}])}catch(T){console.error("Chat error:",T),l(S=>[...S,{role:"assistant",content:`[${m.name}]: I hear you, but the telegraph wire dropped packet. Let me state my operational position again.`,model:"local"}])}finally{h(!1),setTimeout(()=>_(!1),1600)}};return x.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200",children:x.jsxs("div",{className:"relative w-full max-w-6xl h-[92vh] max-h-[850px] flex flex-col md:flex-row bg-gradient-to-b from-[#1b120c] to-[#0c0805] border-2 border-[#875d33] rounded shadow-2xl overflow-hidden",children:[x.jsxs("div",{className:"absolute top-0 left-0 right-0 h-14 bg-gradient-to-r from-[#21140c] via-[#160e09] to-[#21140c] border-b border-[#734e2c] px-4 flex items-center justify-between z-20",children:[x.jsxs("div",{className:"flex items-center gap-3",children:[x.jsx("img",{src:"/favicon.png",alt:"ARGUS & Co.",className:"w-8 h-8 rounded-full border border-[#c69a50] object-contain bg-[#120a06] shadow-sm"}),x.jsx("span",{className:"w-2.5 h-2.5 rounded-full animate-pulse",style:{backgroundColor:m.accent}}),x.jsxs("div",{children:[x.jsx("h2",{className:"font-rye text-base md:text-lg tracking-wide text-[#f2e0be]",children:m.name}),x.jsxs("p",{className:"text-[10px] font-elite text-[#bd9f6f]",children:[m.title," · ",m.badge]})]})]}),x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsxs("span",{className:"hidden sm:inline-block px-2 py-0.5 rounded text-[9px] font-mono-code bg-[#2b1b11] border border-[#9b7545] text-[#d6b785]",children:["AI: ",m.model.split("/")[1]||m.model]}),x.jsx("button",{onClick:e,className:"p-1.5 text-[#bfa175] hover:text-[#fff2d6] hover:bg-[#462817] rounded transition-colors",children:x.jsx(Sl,{size:20})})]})]}),x.jsxs("div",{className:"relative flex-1 h-[48%] md:h-full pt-14 flex flex-col bg-[#0a0705]",children:[x.jsx("canvas",{ref:i,className:"w-full h-full cursor-grab active:cursor-grabbing block"}),s==="hologram"&&x.jsx("div",{className:"absolute inset-0 pt-14 crt-overlay pointer-events-none"}),x.jsxs("div",{className:"absolute top-16 left-3 flex flex-wrap gap-1.5 z-10",children:[x.jsxs("button",{onClick:()=>u("realistic"),className:`px-2.5 py-1 text-[10px] font-elite rounded border flex items-center gap-1.5 transition-all ${s==="realistic"?"bg-[#5c3a22] text-[#fff0cf] border-[#c49a52] shadow-md":"bg-[#1a120c]/80 text-[#ba9f73] border-[#6b4c2d] hover:bg-[#382315]"}`,children:[x.jsx(Iy,{size:12})," Ultra-Realistic"]}),x.jsxs("button",{onClick:()=>u("hologram"),className:`px-2.5 py-1 text-[10px] font-elite rounded border flex items-center gap-1.5 transition-all ${s==="hologram"?"bg-[#14323d] text-[#00d2ff] border-[#00d2ff] shadow-md":"bg-[#1a120c]/80 text-[#ba9f73] border-[#6b4c2d] hover:bg-[#382315]"}`,children:[x.jsx(Wy,{size:12})," Holographic Scan"]}),x.jsxs("button",{onClick:()=>u("wireframe"),className:`px-2.5 py-1 text-[10px] font-elite rounded border flex items-center gap-1.5 transition-all ${s==="wireframe"?"bg-[#291e3d] text-[#c084fc] border-[#a855f7] shadow-md":"bg-[#1a120c]/80 text-[#ba9f73] border-[#6b4c2d] hover:bg-[#382315]"}`,children:[x.jsx(Py,{size:12})," 3D Wireframe"]}),x.jsxs("button",{onClick:()=>u("thermal"),className:`px-2.5 py-1 text-[10px] font-elite rounded border flex items-center gap-1.5 transition-all ${s==="thermal"?"bg-[#3b1d12] text-[#ff7744] border-[#ff7744] shadow-md":"bg-[#1a120c]/80 text-[#ba9f73] border-[#6b4c2d] hover:bg-[#382315]"}`,children:[x.jsx(zy,{size:12})," Thermal Spec"]})]}),x.jsxs("button",{onClick:()=>{var g;return(g=r.current)==null?void 0:g.resetRotation()},className:"absolute bottom-3 left-3 px-2 py-1 text-[10px] font-elite bg-[#1f150e]/90 text-[#bba177] hover:text-[#ffedd1] border border-[#6f4c2c] rounded flex items-center gap-1 backdrop-blur-sm z-10",children:[x.jsx(r1,{size:11})," Reset 3D Angle"]}),p&&x.jsxs("div",{className:"absolute bottom-3 right-3 px-3 py-1 bg-black/80 border border-[#b88c4d] rounded flex items-center gap-2 z-10 animate-pulse",children:[x.jsx("span",{className:"w-2 h-2 rounded-full",style:{backgroundColor:m.accent}}),x.jsx("span",{className:"text-[10px] font-elite text-[#ffdfa6]",children:"TRANSMITTING VOICE SPECTRUM..."})]})]}),x.jsxs("div",{className:"w-full md:w-[440px] h-[52%] md:h-full pt-14 flex flex-col bg-[#140e0a] border-t md:border-t-0 md:border-l border-[#6f4b2a]",children:[x.jsxs("div",{className:"p-3 bg-[#1e130c] border-b border-[#5e3e22] text-[#d6be96]",children:[x.jsxs("div",{className:"text-[11px] font-elite flex justify-between",children:[x.jsx("span",{children:"SPECIALIZATION:"}),x.jsx("span",{className:"text-[#f5deb3] font-semibold",children:m.specialty})]}),n&&x.jsxs("div",{className:"text-[10px] font-mono-code text-[#9f835b] mt-1 flex items-center gap-1",children:[x.jsx(h1,{size:11})," ACTIVE CASE: ",x.jsx("strong",{className:"text-[#e2ceab]",children:n})]})]}),x.jsxs("div",{className:"flex-1 p-3 overflow-y-auto space-y-3 font-elite text-xs",children:[a.map((g,M)=>x.jsxs("div",{className:`p-2.5 rounded border ${g.role==="user"?"bg-[#2a1b12] border-[#7d5631] text-[#faedd4] ml-6":"bg-[#19100a] border-[#5e3d22] text-[#d9c49e] mr-4"}`,children:[x.jsxs("div",{className:"flex items-center justify-between text-[9px] text-[#9a7e58] mb-1",children:[x.jsx("span",{children:g.role==="user"?"YOU (LEAD INVESTIGATOR)":m.name}),g.model&&x.jsx("span",{className:"font-mono-code text-[8px] opacity-75",children:g.model.split(":")[0]})]}),x.jsx("div",{className:"whitespace-pre-wrap leading-relaxed",children:g.content})]},M)),f&&x.jsxs("div",{className:"p-2.5 bg-[#19100a] border border-[#5e3d22] text-[#bd9f71] rounded mr-4 animate-pulse flex items-center gap-2",children:[x.jsx(H0,{size:14,className:"animate-spin text-[#c69a50]"}),x.jsxs("span",{children:[m.name," is deducing findings..."]})]})]}),x.jsxs("form",{onSubmit:v,className:"p-3 bg-[#18110b] border-t border-[#5e3e22] flex gap-2",children:[x.jsx("input",{type:"text",value:c,onChange:g=>d(g.target.value),placeholder:`Interrogate ${m.name}...`,className:"flex-1 bg-[#24170f] text-[#f7e6ca] placeholder-[#8f7453] px-3 py-2 text-xs font-elite border border-[#7a5430] rounded focus:outline-none focus:border-[#d1a65e]"}),x.jsx("button",{type:"submit",disabled:f||!c.trim(),className:"western-btn px-4",style:{borderColor:m.accent},children:x.jsx(l1,{size:13})})]})]})]})})}function EA(){var p;const[t,e]=Ee.useState("headquarters"),[n,i]=Ee.useState([]),[r,s]=Ee.useState(""),[o,a]=Ee.useState(null),[l,c]=Ee.useState(null),d=async()=>{try{const y=await(await fetch("/api/cases")).json();y.success&&y.cases&&(i(y.cases),!r&&y.cases.length>0&&s(y.cases[0].case_ref))}catch(_){console.error("Failed to fetch cases:",_)}};Ee.useEffect(()=>{d()},[]);const f=_=>{s(_),e("lab")},h=_=>{_&&s(_),e("reports")};return x.jsxs("div",{id:"app-container",children:[x.jsx(S1,{activeView:t,onViewChange:_=>e(_)}),x.jsxs("main",{className:"main-viewport",children:[t==="headquarters"&&x.jsx(gA,{cases:n,onSelectAgent:_=>a(_),activeSpeaker:l}),t==="casefiles"&&x.jsx(vA,{cases:n,onRefresh:d,onSelectCaseForLab:f}),t==="lab"&&x.jsx(xA,{cases:n,selectedCaseRef:r,onCaseChange:_=>s(_),onOpenOfficerStudio:_=>a(_),onViewReports:h}),t==="clues"&&x.jsx(_A,{caseRef:r||((p=n[0])==null?void 0:p.case_ref)||"ARG-1891-001"}),t==="reports"&&x.jsx(yA,{cases:n,initialCaseRef:r}),t==="archives"&&x.jsx(SA,{cases:n,onSelectCase:f})]}),o&&x.jsx(MA,{agentId:o,activeCaseRef:r,onClose:()=>a(null)}),x.jsxs("footer",{className:"footer-strip",children:[x.jsx("span",{children:"ARGUS DETECTIVE AGENCY · FRONTIER DISTRICT · EST. 1891"}),x.jsx("span",{children:"SQLITE (WAL) STORAGE ACTIVE · OPENROUTER FREE TIER AI"})]})]})}du.createRoot(document.getElementById("root")).render(x.jsx(Zv.StrictMode,{children:x.jsx(EA,{})}));
