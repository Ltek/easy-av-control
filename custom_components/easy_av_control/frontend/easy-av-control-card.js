var U=globalThis,D=U.ShadowRoot&&(U.ShadyCSS===void 0||U.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ee=Symbol(),ge=new WeakMap,R=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==ee)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(D&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=ge.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ge.set(e,t))}return t}toString(){return this.cssText}},fe=o=>new R(typeof o=="string"?o:o+"",void 0,ee),te=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((i,s,n)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[n+1],o[0]);return new R(e,o,ee)},_e=(o,t)=>{if(D)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=U.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,o.appendChild(i)}},ie=D?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return fe(e)})(o):o;var{is:je,defineProperty:We,getOwnPropertyDescriptor:Ke,getOwnPropertyNames:Ye,getOwnPropertySymbols:Ge,getPrototypeOf:qe}=Object,I=globalThis,ve=I.trustedTypes,Xe=ve?ve.emptyScript:"",Fe=I.reactiveElementPolyfillSupport,C=(o,t)=>o,se={toAttribute(o,t){switch(t){case Boolean:o=o?Xe:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},ye=(o,t)=>!je(o,t),$e={attribute:!0,type:String,converter:se,reflect:!1,useDefault:!1,hasChanged:ye};Symbol.metadata??=Symbol("metadata"),I.litPropertyMetadata??=new WeakMap;var $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$e){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&We(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:n}=Ke(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:s,set(r){let d=s?.call(this);n?.call(this,r),this.requestUpdate(t,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$e}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;let t=qe(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){let e=this.properties,i=[...Ye(e),...Ge(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(ie(s))}else t!==void 0&&e.push(ie(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return _e(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:se).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let n=i.getPropertyOptions(s),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:se;this._$Em=s;let d=r.fromAttribute(e,n.type);this[s]=d??this._$Ej?.get(s)??d,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(t!==void 0){let r=this.constructor;if(s===!1&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??ye)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),n!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,n]of i){let{wrapped:r}=n,d=this[s];r!==!0||this._$AL.has(s)||d===void 0||this.C(s,void 0,n,d)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[C("elementProperties")]=new Map,$[C("finalized")]=new Map,Fe?.({ReactiveElement:$}),(I.reactiveElementVersions??=[]).push("2.1.2");var oe=globalThis,we=o=>o,V=oe.trustedTypes,be=V?V.createPolicy("lit-html",{createHTML:o=>o}):void 0,re="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,ae="?"+y,Qe=`<${ae}>`,x=document,M=()=>x.createComment(""),N=o=>o===null||typeof o!="object"&&typeof o!="function",le=Array.isArray,Te=o=>le(o)||typeof o?.[Symbol.iterator]=="function",ne=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xe=/-->/g,Se=/>/g,w=RegExp(`>|${ne}(?:([^\\s"'>=/]+)(${ne}*=${ne}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ae=/'/g,Ee=/"/g,Re=/^(?:script|style|textarea|title)$/i,de=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),l=de(1),mt=de(2),gt=de(3),_=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),ke=new WeakMap,b=x.createTreeWalker(x,129);function Ce(o,t){if(!le(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return be!==void 0?be.createHTML(t):t}var Pe=(o,t)=>{let e=o.length-1,i=[],s,n=t===2?"<svg>":t===3?"<math>":"",r=P;for(let d=0;d<e;d++){let a=o[d],p,h,u=-1,m=0;for(;m<a.length&&(r.lastIndex=m,h=r.exec(a),h!==null);)m=r.lastIndex,r===P?h[1]==="!--"?r=xe:h[1]!==void 0?r=Se:h[2]!==void 0?(Re.test(h[2])&&(s=RegExp("</"+h[2],"g")),r=w):h[3]!==void 0&&(r=w):r===w?h[0]===">"?(r=s??P,u=-1):h[1]===void 0?u=-2:(u=r.lastIndex-h[2].length,p=h[1],r=h[3]===void 0?w:h[3]==='"'?Ee:Ae):r===Ee||r===Ae?r=w:r===xe||r===Se?r=P:(r=w,s=void 0);let g=r===w&&o[d+1].startsWith("/>")?" ":"";n+=r===P?a+Qe:u>=0?(i.push(p),a.slice(0,u)+re+a.slice(u)+y+g):a+y+(u===-2?d:g)}return[Ce(o,n+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},O=class o{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0,d=t.length-1,a=this.parts,[p,h]=Pe(t,e);if(this.el=o.createElement(p,i),b.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=b.nextNode())!==null&&a.length<d;){if(s.nodeType===1){if(s.hasAttributes())for(let u of s.getAttributeNames())if(u.endsWith(re)){let m=h[r++],g=s.getAttribute(u).split(y),f=/([.?@])?(.*)/.exec(m);a.push({type:1,index:n,name:f[2],strings:g,ctor:f[1]==="."?z:f[1]==="?"?j:f[1]==="@"?W:A}),s.removeAttribute(u)}else u.startsWith(y)&&(a.push({type:6,index:n}),s.removeAttribute(u));if(Re.test(s.tagName)){let u=s.textContent.split(y),m=u.length-1;if(m>0){s.textContent=V?V.emptyScript:"";for(let g=0;g<m;g++)s.append(u[g],M()),b.nextNode(),a.push({type:2,index:++n});s.append(u[m],M())}}}else if(s.nodeType===8)if(s.data===ae)a.push({type:2,index:n});else{let u=-1;for(;(u=s.data.indexOf(y,u+1))!==-1;)a.push({type:7,index:n}),u+=y.length-1}n++}}static createElement(t,e){let i=x.createElement("template");return i.innerHTML=t,i}};function S(o,t,e=o,i){if(t===_)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,n=N(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(o),s._$AT(o,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=S(o,s._$AS(o,t.values),s,i)),t}var B=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??x).importNode(e,!0);b.currentNode=s;let n=b.nextNode(),r=0,d=0,a=i[0];for(;a!==void 0;){if(r===a.index){let p;a.type===2?p=new T(n,n.nextSibling,this,t):a.type===1?p=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(p=new K(n,this,t)),this._$AV.push(p),a=i[++d]}r!==a?.index&&(n=b.nextNode(),r++)}return b.currentNode=x,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},T=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),N(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==_&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Te(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=O.createElement(Ce(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let n=new B(s,this),r=n.u(this.options);n.p(e),this.T(r),this._$AH=n}}_$AC(t){let e=ke.get(t.strings);return e===void 0&&ke.set(t.strings,e=new O(t)),e}k(t){le(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let n of t)s===e.length?e.push(i=new o(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=we(t).nextSibling;we(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},A=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=c}_$AI(t,e=this,i,s){let n=this.strings,r=!1;if(n===void 0)t=S(this,t,e,0),r=!N(t)||t!==this._$AH&&t!==_,r&&(this._$AH=t);else{let d=t,a,p;for(t=n[0],a=0;a<n.length-1;a++)p=S(this,d[i+a],e,a),p===_&&(p=this._$AH[a]),r||=!N(p)||p!==this._$AH[a],p===c?t=c:t!==c&&(t+=(p??"")+n[a+1]),this._$AH[a]=p}r&&!s&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},z=class extends A{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}},j=class extends A{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}},W=class extends A{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??c)===_)return;let i=this._$AH,s=t===c&&i!==c||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==c&&(i===c||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},K=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}},Me={M:re,P:y,A:ae,C:1,L:Pe,R:B,D:Te,V:S,I:T,H:A,N:j,U:W,B:z,F:K},Ze=oe.litHtmlPolyfillSupport;Ze?.(O,T),(oe.litHtmlVersions??=[]).push("3.3.3");var Ne=(o,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let n=e?.renderBefore??null;i._$litPart$=s=new T(t.insertBefore(M(),n),n,void 0,e??{})}return s._$AI(o),s};var ce=globalThis,v=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ne(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return _}};v._$litElement$=!0,v.finalized=!0,ce.litElementHydrateSupport?.({LitElement:v});var Je=ce.litElementPolyfillSupport;Je?.({LitElement:v});(ce.litElementVersions??=[]).push("4.2.2");var E={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Oe=o=>(...t)=>({_$litDirective$:o,values:t}),Y=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:Ct}=Me;var He=o=>o.strings===void 0;var et={},Le=(o,t=et)=>o._$AH=t;var pe=Oe(class extends Y{constructor(o){if(super(o),o.type!==E.PROPERTY&&o.type!==E.ATTRIBUTE&&o.type!==E.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!He(o))throw Error("`live` bindings can only contain a single expression")}render(o){return o}update(o,[t]){if(t===_||t===c)return t;let e=o.element,i=o.name;if(o.type===E.PROPERTY){if(t===e[i])return _}else if(o.type===E.BOOLEAN_ATTRIBUTE){if(!!t===e.hasAttribute(i))return _}else if(o.type===E.ATTRIBUTE&&e.getAttribute(i)===t+"")return _;return Le(o),t}});var G={en:{"state.idle":"Off","state.starting":"Starting \u2026","state.active":"On","now.paused":"Paused","state.stopping":"Stopping \u2026","state.error":"Error",power:"On/off",loading:"Loading \u2026",not_found:'Room "{room}" not found',no_room:"Pick a room in the card settings",warnings:"Warnings",volume:"Volume","command.volume_up":"Volume up","command.volume_down":"Volume down","command.mute":"Mute","command.volume_set":"Volume slider","command.select_source":"Select source","command.select_sound_mode":"Select sound mode","command.channel_up":"Channel up","command.channel_down":"Channel down","command.play_pause":"Play/pause","command.play":"Play","command.pause":"Pause","command.stop":"Stop","command.next":"Next","command.previous":"Previous","command.up":"Up","command.down":"Down","command.left":"Left","command.right":"Right","command.ok":"OK","command.back":"Back","command.menu":"Menu","command.home":"Home","command.info":"Info","command.guide":"Guide","command.exit":"Exit","editor.room":"Room","editor.name":"Title (optional)","doing.power_on":"Switching the outlets on","doing.power_off":"Switching the outlets off","doing.boot":"{name} is booting","doing.reload":"Reconnecting {name}","doing.ready":"Waiting for {name}","doing.turn_on":"Switching on {name}","doing.warm_up":"{name} is starting up","doing.status_on":"Waiting for {name} to be on","doing.status_on_value":"{name}: {value}","doing.status_off":"Waiting for {name} to be off","doing.status_off_value":"{name}: {value}","doing.turn_off":"Switching off {name}","doing.step":"Step {step} of {steps}: {what}","doing.wait":"Step {step} of {steps}: waiting","doing.hooks_on_start":"Waiting for the actions on start","doing.hooks_on_stop":"Waiting for the actions on stop","doing.left":"{time} left","doing.at_most":"at most {time}","cooling.text":"Cooling down: {names}","cooling.time":"power off in {time}","cooling.time_status":"power off once they are off, at most {time}",touchpad:"Touch surface: swipe for the arrow keys, tap for OK","touchpad.hint":"Swipe \xB7 tap for OK","rocker.volume":"VOL","rocker.channels":"CH","pad.show_arrows":"Show arrow keys","pad.show_touchpad":"Show touch surface",settings:"Settings","setting.source":"Source","setting.sound_mode":"Sound mode","toggle.on":"On","toggle.off":"Off","step.power_on":"Switch on","step.power_off":"Switch off","step.set_source":"Set source","step.set_volume":"Set volume","step.set_sound_mode":"Set sound mode","step.set_brightness":"Set brightness","step.set_color_temp":"Set color temperature","step.set_position":"Set cover position","step.set_tilt":"Set cover tilt","step.call_action":"Run action","step.delay":"Wait","step.wait_available":"Wait until available"},de:{"state.idle":"Aus","state.starting":"Startet \u2026","state.active":"An","now.paused":"Pausiert","state.stopping":"Stoppt \u2026","state.error":"Fehler",power:"Ein/Aus",loading:"L\xE4dt \u2026",not_found:"Raum \u201E{room}\u201C nicht gefunden",no_room:"Bitte in den Karteneinstellungen einen Raum w\xE4hlen",warnings:"Warnungen",volume:"Lautst\xE4rke","command.volume_up":"Lauter","command.volume_down":"Leiser","command.mute":"Stumm","command.volume_set":"Lautst\xE4rkeregler","command.select_source":"Quelle w\xE4hlen","command.select_sound_mode":"Klangmodus w\xE4hlen","command.channel_up":"Kanal hoch","command.channel_down":"Kanal runter","command.play_pause":"Wiedergabe/Pause","command.play":"Wiedergabe","command.pause":"Pause","command.stop":"Stopp","command.next":"Weiter","command.previous":"Zur\xFCck","command.up":"Hoch","command.down":"Runter","command.left":"Links","command.right":"Rechts","command.ok":"OK","command.back":"Zur\xFCck","command.menu":"Men\xFC","command.home":"Start","command.info":"Info","command.guide":"EPG","command.exit":"Beenden","editor.room":"Raum","editor.name":"Titel (optional)","doing.power_on":"Steckdosen werden eingeschaltet","doing.power_off":"Steckdosen werden ausgeschaltet","doing.boot":"{name} bootet","doing.reload":"{name} wird neu verbunden","doing.ready":"Warte auf {name}","doing.turn_on":"{name} wird eingeschaltet","doing.warm_up":"{name} f\xE4hrt hoch","doing.status_on":"Warte, bis {name} an ist","doing.status_on_value":"{name}: {value}","doing.status_off":"Warte, bis {name} aus ist","doing.status_off_value":"{name}: {value}","doing.turn_off":"{name} wird ausgeschaltet","doing.step":"Schritt {step} von {steps}: {what}","doing.wait":"Schritt {step} von {steps}: warten","doing.hooks_on_start":"Warte auf die Aktionen beim Start","doing.hooks_on_stop":"Warte auf die Aktionen beim Stopp","doing.left":"noch {time}","doing.at_most":"h\xF6chstens noch {time}","cooling.text":"Abk\xFChlen: {names}","cooling.time":"Strom aus in {time}","cooling.time_status":"Strom aus, sobald sie aus sind, h\xF6chstens noch {time}",touchpad:"Touchfl\xE4che: wischen f\xFCr die Pfeiltasten, tippen f\xFCr OK","touchpad.hint":"Wischen \xB7 Tippen f\xFCr OK","rocker.volume":"VOL","rocker.channels":"CH","pad.show_arrows":"Pfeiltasten zeigen","pad.show_touchpad":"Touchfl\xE4che zeigen",settings:"Einstellungen","setting.source":"Quelle","setting.sound_mode":"Klangmodus","toggle.on":"An","toggle.off":"Aus","step.power_on":"Einschalten","step.power_off":"Ausschalten","step.set_source":"Quelle w\xE4hlen","step.set_volume":"Lautst\xE4rke setzen","step.set_sound_mode":"Klangmodus w\xE4hlen","step.set_brightness":"Helligkeit setzen","step.set_color_temp":"Farbtemperatur setzen","step.set_position":"Rollladen-Position setzen","step.set_tilt":"Lamellen-Neigung setzen","step.call_action":"Aktion ausf\xFChren","step.delay":"Warten","step.wait_available":"Auf Verf\xFCgbarkeit warten"}};function q(o,t,e={}){let i=(o??"en").split("-")[0],n=(i in G?G[i]:G.en)[t]??G.en[t]??t;for(let[r,d]of Object.entries(e))n=n.replace(`{${r}}`,d);return n}var X=class extends v{constructor(){super(...arguments);this._loading=!1}setConfig(e){this._config=e}updated(){this.hass&&this._rooms===void 0&&!this._loading&&(this._loading=!0,this.hass.callWS({type:"easy_av_control/control/rooms"}).then(e=>this._rooms=e).catch(()=>this._rooms=[]).finally(()=>this._loading=!1))}_schema(){let e=(this._rooms??[]).map(s=>s.room);return[{name:"room",required:!0,selector:{select:{mode:"dropdown",options:(this._rooms??[]).map(s=>({value:e.filter(n=>n===s.room).length>1?`${s.entry_id}/${s.room}`:s.room,label:s.name}))}}},{name:"name",selector:{text:{}}}]}render(){if(!this.hass||!this._config)return c;let e={...this._config,room:this._config.entry_id?`${this._config.entry_id}/${this._config.room}`:this._config.room},i=(this._rooms??[]).some(s=>s.room===this._config.room);return this._rooms&&!i&&this._config.room&&(e.room=this._config.room),l`<ha-form
      .hass=${this.hass}
      .data=${e}
      .schema=${this._schema()}
      .computeLabel=${s=>q(this.hass?.language,`editor.${s.name}`)}
      @value-changed=${this._valueChanged}
    ></ha-form>`}_valueChanged(e){e.stopPropagation();let i={...e.detail.value},s={...this._config,...i},n=String(i.room??"");if(n.includes("/")){let[r,d]=n.split("/",2);s.entry_id=r,s.room=d}else delete s.entry_id;s.name||delete s.name,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:s},bubbles:!0,composed:!0}))}};X.properties={hass:{attribute:!1},_config:{state:!0},_rooms:{state:!0}};customElements.get("easy-av-control-card-editor")||customElements.define("easy-av-control-card-editor",X);function ue(o,t){let e=`command.${o}`,i=t(e);if(i!==e)return i;let s=o.replace(/[_-]+/g," ").trim();return s.charAt(0).toUpperCase()+s.slice(1)}var tt=new Set(["off","standby","unavailable","unknown"]);function Ue(o,t){if(!o||tt.has(o.state))return;let e=o.attributes,i=k=>typeof e[k]=="string"&&e[k]?e[k]:void 0,s=k=>typeof e[k]=="number"?e[k]:void 0,n=i("app_name"),r=i("media_title")??n;if(!r)return;let d=s("media_season")??i("media_season"),a=s("media_episode")??i("media_episode"),p=i("media_series_title"),h=p&&(d!==void 0||a!==void 0)?`${p} \xB7 ${[d!==void 0?`S${d}`:"",a!==void 0?`E${a}`:""].filter(Boolean).join(" ")}`:p??i("media_artist")??i("media_album_name"),u=o.state==="playing",m=s("media_duration"),g=m!==void 0&&m>0?m:void 0,f=s("media_position"),J=i("media_position_updated_at");return f!==void 0&&u&&J&&!Number.isNaN(Date.parse(J))&&(f+=(t-Date.parse(J))/1e3),f!==void 0&&g!==void 0&&(f=Math.max(0,Math.min(g,f))),{title:r,app:r===n?void 0:n,subtitle:h,picture:i("entity_picture"),playing:u,duration:g,position:g!==void 0?f:void 0}}function H(o){let t=Math.floor(o),e=Math.floor(t/3600),i=Math.floor(t%3600/60),s=String(t%60).padStart(2,"0");return e?`${e}:${String(i).padStart(2,"0")}:${s}`:`${i}:${s}`}function De(o,t){let e=Math.max(0,Math.ceil((Date.parse(o)-t)/1e3));return e>=60?H(e):`${e} s`}function Ie(o,t,e){let i=o.names.length?o.names.join(", "):o.outlet;return{text:e("cooling.text",{names:i}),time:e(o.status?"cooling.time_status":"cooling.time",{time:De(o.until,t)})}}function Ve(o,t,e){if(!o)return;let i=o.name??"",s={step:String(o.step??""),steps:String(o.steps??"")},n;switch(o.kind){case"step":{let a=e(`step.${o.step_type}`);n=e("doing.step",{...s,what:i?`${a} (${i})`:a});break}case"wait":n=e("doing.wait",s);break;case"hooks":n=e(`doing.hooks_${o.hook}`);break;case"status":n=o.value?e(`doing.status_${o.target==="off"?"off":"on"}_value`,{name:i,value:o.value}):e(`doing.status_${o.target==="off"?"off":"on"}`,{name:i});break;default:n=e(`doing.${o.kind}`,{name:i})}if(!o.until)return{text:n};let r=De(o.until,t),d=o.kind==="ready"||o.kind==="status";return{text:n,time:e(d?"doing.at_most":"doing.left",{time:r})}}var F=class{constructor(){this.originX=0;this.originY=0;this.startX=0;this.startY=0;this.startTime=0;this.moved=!1}start(t,e,i){this.originX=this.startX=t,this.originY=this.startY=e,this.startTime=i,this.moved=!1}move(t,e){Math.hypot(t-this.startX,e-this.startY)>10&&(this.moved=!0);let i=[];for(;;){let s=t-this.originX,n=e-this.originY;if(Math.max(Math.abs(s),Math.abs(n))<40)return i;Math.abs(s)>=Math.abs(n)?(i.push(s>0?"right":"left"),this.originX+=Math.sign(s)*40,this.originY=e):(i.push(n>0?"down":"up"),this.originY+=Math.sign(n)*40,this.originX=t)}}end(t,e,i){return Math.hypot(t-this.startX,e-this.startY)>10&&(this.moved=!0),!this.moved&&i-this.startTime<=500}};function he(o,t){return`easy-av-control-touchpad:${o}:${t}`}function Be(o,t){return o==="on"?!0:o==="off"?!1:t}var Q="easy_av_control",me={volume_up:"mdi:volume-plus",volume_down:"mdi:volume-minus",mute:"mdi:volume-off",channel_up:"mdi:chevron-up",channel_down:"mdi:chevron-down",play_pause:"mdi:play-pause",play:"mdi:play",pause:"mdi:pause",stop:"mdi:stop",next:"mdi:skip-next",previous:"mdi:skip-previous",up:"mdi:chevron-up",down:"mdi:chevron-down",left:"mdi:chevron-left",right:"mdi:chevron-right",back:"mdi:arrow-u-left-top",menu:"mdi:menu",home:"mdi:home-outline",info:"mdi:information-outline",guide:"mdi:television-guide",exit:"mdi:close",select_source:"mdi:apps"},it=["back","home","menu","info","guide","exit"],st=["previous","play_pause","play","pause","stop","next"],nt=new Set(["volume_up","volume_down","up","down","left","right"]),ot=400,rt=200;function ze(o){return`easy-av-control-settings:${o}`}var at=3e4,lt={idle:"mdi:power",starting:"mdi:timer-sand",active:"mdi:power",stopping:"mdi:timer-sand",error:"mdi:alert-circle-outline"},L=class extends v{constructor(){super();this._padChoices=new Map;this._settingsOpen=new Map;this._settingDrafts=new Map;this._view=null,this._loaded=!1}static getConfigElement(){return document.createElement("easy-av-control-card-editor")}static async getStubConfig(e){try{return{room:(await e.callWS({type:`${Q}/control/rooms`}))[0]?.room??""}}catch{return{room:""}}}setConfig(e){if(!e||typeof e.room!="string")throw new Error("room is required");let i=e.room!==this._config?.room||e.entry_id!==this._config?.entry_id;this._config=e,i&&this._resubscribe()}getCardSize(){return this._view?.remote?8:3}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._pressEnd(!1),window.clearInterval(this._tickTimer),this._tickTimer=void 0,this._unsubscribeNow()}willUpdate(e){e.has("preview")&&this.preview&&(this._config={type:"custom:easy-av-control-card",room:this.preview.room},this._view=this.preview,this._loaded=!0)}updated(e){let i=this._nowPlaying(),s=i?.playing===!0&&i.duration!==void 0||!!this._view?.current?.until||!!this._view?.cooling?.length;s&&this._tickTimer===void 0?this._tickTimer=window.setInterval(()=>this.requestUpdate(),1e3):!s&&this._tickTimer!==void 0&&(window.clearInterval(this._tickTimer),this._tickTimer=void 0),e.has("hass")&&!this._unsubscribe&&this._retryTimer===void 0&&this._subscribe()}_subscribe(){if(this.preview||!this.hass||!this._config?.room||this._unsubscribe||!this.isConnected)return;let e={type:`${Q}/control/subscribe`,room:this._config.room};this._config.entry_id&&(e.entry_id=this._config.entry_id);let i=this.hass.connection.subscribeMessage(s=>{this._unsubscribe===i&&(this._view=s,this._loaded=!0,this._subscribeError=void 0)},e);this._unsubscribe=i,i.catch(s=>{this._unsubscribe===i&&(this._subscribeError=s?.message??String(s),this._loaded=!0,this._unsubscribe=void 0,this._retryTimer=window.setTimeout(()=>{this._retryTimer=void 0,this._subscribe()},at))})}_unsubscribeNow(){window.clearTimeout(this._retryTimer),this._retryTimer=void 0;let e=this._unsubscribe;this._unsubscribe=void 0,e?.then(i=>i()).catch(()=>{})}_resubscribe(){this._unsubscribeNow(),this._view=null,this._loaded=!1,this._subscribe()}_t(e,i){return q(this.hass?.language,e,i)}_call(e,i={}){if(!(!this.hass||!this._view)){if(this._haptic(),this.preview){this.dispatchEvent(new CustomEvent("preview-call",{detail:{service:e,data:i}}));return}this.hass.callService(Q,e,{room:this._view.room,...i}).catch(s=>this._toast(s?.message??String(s)))}}_send(e,i={}){this._call("send_command",{command:e,...i})}_haptic(){this.dispatchEvent(new CustomEvent("haptic",{detail:"light",bubbles:!0,composed:!0}))}_toast(e){this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:e},bubbles:!0,composed:!0}))}_pressStart(e,i,s={}){if(e.button!==0)return;this._pressEnd(!1);let n={command:i,extra:s,sent:!1};this._press=n,nt.has(i)&&(this._repeatTimer=window.setTimeout(()=>{n.sent=!0,this._send(i,s),this._repeatTimer=window.setInterval(()=>this._send(i,s),rt)},ot))}_pressEnd(e){let i=this._press;this._press=void 0,this._stopRepeat(),e&&i&&!i.sent&&this._send(i.command,i.extra)}_stopRepeat(){this._repeatTimer!==void 0&&(window.clearTimeout(this._repeatTimer),window.clearInterval(this._repeatTimer),this._repeatTimer=void 0)}_keySend(e,i,s={}){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._send(i,s))}render(){if(!this._config?.room)return l`<ha-card><div class="message">${this._t("no_room")}</div></ha-card>`;if(!this._loaded)return l`<ha-card><div class="message">${this._t("loading")}</div></ha-card>`;let e=this._view;return e?l`<ha-card>
      ${this._renderHeader(e)} ${this._renderStatus(e)} ${this._renderNowPlaying()}
      ${this._renderActivities(e)}
      ${e.remote?this._renderRemote(e):c}
    </ha-card>`:l`<ha-card>
        <div class="message warning">
          ${this._subscribeError??this._t("not_found",{room:this._config.room})}
        </div>
      </ha-card>`}_renderHeader(e){let i=e.activities.find(r=>r.id===e.activity),s=e.state!=="idle",n=i?`${i.name} \xB7 ${this._t(`state.${e.state}`)}`:this._t(`state.${e.state}`);return l`<div class="header">
      <div class="title">
        <div class="name">${this._config?.name||e.name}</div>
        <div class="status state-${e.state}">${n}</div>
      </div>
      <button
        class="power ${s?"on":""} state-${e.state}"
        title=${this._t("power")}
        aria-label=${this._t("power")}
        @click=${()=>this._call("toggle_activity")}
      >
        <ha-icon .icon=${lt[e.state]??"mdi:power"}></ha-icon>
      </button>
    </div>`}_renderStatus(e){let i=e.state==="starting"||e.state==="stopping",[s,n]=e.progress,r=n>0?Math.round(s/n*100):0,d=i?Ve(e.current,Date.now(),(a,p)=>this._t(a,p)):void 0;return l`
      ${i?l`<div
            class="progress"
            role="progressbar"
            aria-label=${this._t(`state.${e.state}`)}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow=${r}
          >
            <div style="width: ${e.state==="starting"?r:100}%"></div>
          </div>`:c}
      ${d?l`<div class="doing" aria-live="polite">
            <span class="doing-text">${d.text}</span>
            ${d.time?l`<span class="doing-time">${d.time}</span>`:c}
          </div>`:c}
      ${(e.cooling??[]).map(a=>{let{text:p,time:h}=Ie(a,Date.now(),(u,m)=>this._t(u,m));return l`<div class="doing cooling">
          <span class="doing-text">${p}</span><span class="doing-time">${h}</span>
        </div>`})}
      ${e.state==="error"&&e.error?l`<div class="message error">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>${e.error}
          </div>`:c}
      ${e.warnings.length&&e.state!=="idle"?l`<details class="warnings">
            <summary>${this._t("warnings")} (${e.warnings.length})</summary>
            <ul>
              ${e.warnings.map(a=>l`<li>${a}</li>`)}
            </ul>
          </details>`:c}
    `}_nowPlaying(){let e=this._view?.remote?.media;return Ue(e?this.hass?.states[e]:void 0,Date.now())}_renderNowPlaying(){let e=this._nowPlaying();if(!e)return c;let i=[e.app,e.playing?void 0:this._t("now.paused")].filter(Boolean).join(" \xB7 ");return l`<div class="now">
      ${e.picture?l`<img
            class="art"
            src=${e.picture}
            alt=""
            @error=${s=>s.target.style.display="none"}
          />`:c}
      <div class="meta">
        ${i?l`<div class="now-top">${i}</div>`:c}
        <div class="now-title">${e.title}</div>
        ${e.subtitle?l`<div class="now-sub">${e.subtitle}</div>`:c}
        ${e.duration!==void 0&&e.position!==void 0?l`<div class="now-progress" role="progressbar" aria-valuemin="0"
                aria-valuemax=${Math.round(e.duration)} aria-valuenow=${Math.round(e.position)}>
                <div style="width: ${e.position/e.duration*100}%"></div>
              </div>
              <div class="now-time">
                <span>${H(e.position)}</span><span>${H(e.duration)}</span>
              </div>`:c}
      </div>
    </div>`}_renderActivities(e){return l`<div class="activities">
      ${e.activities.map(i=>{let s=i.id===e.activity;return l`<button
          class="chip ${s?`current state-${e.state}`:""}"
          aria-pressed=${s?"true":"false"}
          @click=${()=>this._call("start_activity",{activity:i.id})}
        >
          <ha-icon .icon=${i.icon??"mdi:play-circle-outline"}></ha-icon>
          <span>${i.name}</span>
        </button>`})}
    </div>`}_renderRemote(e){let{groups:i,buttons:s}=e.remote,n=i.navigation,r=n?it.filter(p=>n.commands.includes(p)):[],d=n?Be(this._padChoice(e),n.touchpad===!0):!1,a=i.transport?st.filter(p=>i.transport.commands.includes(p)):[];return a.includes("play_pause")&&(a=a.filter(p=>p!=="play"&&p!=="pause")),l`<div class="remote">
      ${i.volume||n||i.channels?l`<div class="main ${n?"":"no-nav"}">
            ${i.volume?this._renderVolumeRocker(i.volume):n?l`<div></div>`:c}
            ${n?d?this._renderTouchpad(n):this._renderDpad(n):c}
            ${i.channels?this._renderChannelRocker(i.channels):n?l`<div></div>`:c}
          </div>`:c}
      ${i.volume?.commands.includes("volume_set")?this._renderSlider(i.volume):c}
      ${n?l`<div class="row">
            ${r.map(p=>this._key(p))}${this._renderPadSwitch(e,d)}
          </div>`:c}
      ${a.length?l`<div class="row">${a.map(p=>this._key(p))}</div>`:c}
      ${s.length?l`<div class="buttons">${s.map(p=>this._customButton(p))}</div>`:c}
      ${e.remote.settings?.length?this._renderSettings(e,e.remote.settings):c}
    </div>`}_settingsShown(e){let i=ze(e);if(this._settingsOpen.has(i))return this._settingsOpen.get(i);try{return window.localStorage.getItem(i)==="open"}catch{return!1}}_toggleSettings(e){let i=ze(e),s=!this._settingsShown(e);this._settingsOpen.set(i,s);try{window.localStorage.setItem(i,s?"open":"closed")}catch{}this.requestUpdate()}_renderSettings(e,i){let s=this._settingsShown(e.room);return l`<div class="settings">
      <button
        class="settings-toggle"
        aria-expanded=${s?"true":"false"}
        @click=${()=>this._toggleSettings(e.room)}
      >
        <ha-icon icon="mdi:tune-variant"></ha-icon>
        <span>${this._t("settings")}</span>
        <ha-icon class="chevron" .icon=${s?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
      </button>
      ${s?l`<div class="setting-list">
            ${i.map((n,r)=>l`${r===0||i[r-1].device!==n.device?l`<span class="setting-device">${this._settingDevice(n)}</span>`:c}${this._renderSetting(n)}`)}
          </div>`:c}
    </div>`}_renderSetting(e){if(e.setting==="entity")return this._renderEntitySetting(e);let i=this.hass?.states[e.entity_id],s=e.attribute?i?.attributes[e.attribute]:void 0,n=s==null?void 0:String(s);return this._settingRow(e,this._t(`setting.${e.setting}`),this._settingSelect(e,this._t(`setting.${e.setting}`),n,e.options))}_settingDevice(e){return e.name||this.hass?.states[e.device_entity_id]?.attributes.friendly_name||e.device}_settingRow(e,i,s){return l`<div class="setting">
      <span class="setting-name">${i}</span>
      ${s}
    </div>`}_settingSelect(e,i,s,n,r=!1){let d=s!==void 0&&!n.includes(s)?[s,...n]:n;return l`<select
      aria-label=${`${i}, ${this._settingDevice(e)}`}
      .value=${pe(s??"")}
      ?disabled=${r||!d.length}
      @change=${a=>{let p=a.target.value;p&&p!==s&&this._send(e.command,{device:e.device,value:p})}}
    >
      ${s===void 0?l`<option value="" disabled>–</option>`:c}
      ${d.map(a=>l`<option value=${a} ?selected=${a===s}>${a}</option>`)}
    </select>`}_renderEntitySetting(e){let i=this.hass?.states[e.entity_id],s=e.label||i?.attributes.friendly_name||e.entity_id,n=!i||i.state==="unavailable"||i.state==="unknown",r=e.entity_id.split(".")[0];if(r==="number"||r==="input_number"){let a=Number(i?.attributes.min??0),p=Number(i?.attributes.max??100),h=Number(i?.attributes.step??1),m=this._settingDrafts.get(e.entity_id)??(n?void 0:Number(i.state)),g=m===void 0||Number.isNaN(m)?"\u2013":`${a<0&&m>0?"+":""}${m}`;return this._settingRow(e,s,l`<span class="setting-range">
          <input
            type="range"
            aria-label=${`${s}, ${this._settingDevice(e)}`}
            min=${a}
            max=${p}
            step=${h}
            .value=${pe(String(m??a))}
            ?disabled=${n}
            @input=${f=>{this._settingDrafts.set(e.entity_id,Number(f.target.value)),this.requestUpdate()}}
            @change=${f=>{this._settingDrafts.delete(e.entity_id),this._send(e.command,{device:e.device,value:Number(f.target.value)})}}
          />
          <span class="value">${g}</span>
        </span>`)}if(r==="select"||r==="input_select"){let a=Array.isArray(i?.attributes.options)?i.attributes.options.map(String):[];return this._settingRow(e,s,this._settingSelect(e,s,n?void 0:i.state,e.options.length?e.options:a,n))}let d=i?.state==="on";return this._settingRow(e,s,l`<button
        class="key toggle ${d?"active":""}"
        aria-label=${`${s}, ${this._settingDevice(e)}`}
        aria-pressed=${d?"true":"false"}
        ?disabled=${n}
        @click=${()=>this._send(e.command,{device:e.device,value:d?"off":"on"})}
      >
        ${this._t(d?"toggle.on":"toggle.off")}
      </button>`)}_key(e,i="key",s,n){let r=ue(e,d=>this._t(d));return l`<button
      class=${i}
      title=${r}
      aria-label=${r}
      aria-pressed=${n===void 0?c:String(n)}
      @pointerdown=${d=>this._pressStart(d,e)}
      @pointerup=${()=>this._pressEnd(!0)}
      @pointerleave=${()=>this._pressEnd(!1)}
      @pointercancel=${()=>this._pressEnd(!1)}
      @keydown=${d=>this._keySend(d,e)}
      @contextmenu=${d=>d.preventDefault()}
    >
      ${s??l`<ha-icon .icon=${me[e]??"mdi:circle-small"}></ha-icon>`}
    </button>`}_renderVolumeRocker(e){let i=this._volumeState(e).muted;return l`<div class="rocker">
      ${e.commands.includes("volume_up")?this._key("volume_up"):l`<span></span>`}
      ${e.commands.includes("mute")?this._key("mute",`key label ${i?"active":""}`,l`<ha-icon .icon=${i?"mdi:volume-off":"mdi:volume-high"}></ha-icon>`,i):l`<span class="label">${this._t("rocker.volume")}</span>`}
      ${e.commands.includes("volume_down")?this._key("volume_down"):l`<span></span>`}
    </div>`}_renderChannelRocker(e){return l`<div class="rocker">
      ${e.commands.includes("channel_up")?this._key("channel_up"):l`<span></span>`}
      <span class="label">${this._t("rocker.channels")}</span>
      ${e.commands.includes("channel_down")?this._key("channel_down"):l`<span></span>`}
    </div>`}_renderDpad(e){let i=n=>e.commands.includes(n),s=(n,r)=>i(n)?this._key(n,`key ${r}`,n==="ok"?"OK":void 0):l`<span></span>`;return l`<div class="dpad">
      <span></span>${s("up","up")}<span></span>
      ${s("left","left")}${s("ok","ok")}${s("right","right")}
      <span></span>${s("down","down")}<span></span>
    </div>`}_padChoice(e){if(!e.activity)return null;let i=he(e.room,e.activity);if(this._padChoices.has(i))return this._padChoices.get(i);try{return window.localStorage.getItem(i)}catch{return null}}_renderPadSwitch(e,i){let s=this._t(i?"pad.show_arrows":"pad.show_touchpad");return l`<button
      class="key pad-switch"
      title=${s}
      aria-label=${s}
      @click=${()=>{if(!e.activity)return;let n=he(e.room,e.activity),r=i?"off":"on";this._padChoices.set(n,r);try{window.localStorage.setItem(n,r)}catch{}this.requestUpdate()}}
    >
      <ha-icon .icon=${i?"mdi:arrow-all":"mdi:gesture-tap"}></ha-icon>
    </button>`}_renderTouchpad(e){let i=n=>e.commands.includes(n),s={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right",Enter:"ok"," ":"ok"};return l`<div
      class="touchpad"
      role="group"
      tabindex="0"
      aria-label=${this._t("touchpad")}
      title=${this._t("touchpad")}
      @pointerdown=${n=>{n.button===0&&(n.currentTarget.setPointerCapture(n.pointerId),this._swipe=new F,this._swipe.start(n.clientX,n.clientY,n.timeStamp))}}
      @pointermove=${n=>{for(let r of this._swipe?.move(n.clientX,n.clientY)??[])i(r)&&this._send(r)}}
      @pointerup=${n=>{let r=this._swipe?.end(n.clientX,n.clientY,n.timeStamp);this._swipe=void 0,r&&i("ok")&&this._send("ok")}}
      @pointercancel=${()=>this._swipe=void 0}
      @keydown=${n=>{let r=s[n.key];r&&i(r)&&(n.preventDefault(),this._send(r))}}
      @contextmenu=${n=>n.preventDefault()}
    >
      <span class="touchpad-hint">${this._t("touchpad.hint")}</span>
    </div>`}_volumeState(e){let i=e.entity_id?this.hass?.states[e.entity_id]:void 0,s=i?.attributes.volume_level;return{level:typeof s=="number"?s:void 0,muted:i?.attributes.is_volume_muted===!0}}_renderSlider(e){let{level:i}=this._volumeState(e),s=this._volumeDraft??(i!==void 0?Math.round(i*100):0);return l`<div class="slider">
      <ha-icon icon="mdi:volume-medium"></ha-icon>
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        .value=${String(s)}
        ?disabled=${i===void 0}
        aria-label=${this._t("volume")}
        @input=${n=>{this._volumeDraft=Number(n.target.value)}}
        @change=${n=>{let r=Number(n.target.value);this._volumeDraft=void 0,this._send("volume_set",{value:r/100})}}
      />
      <span class="value">${i!==void 0||this._volumeDraft!==void 0?s:"\u2013"}</span>
    </div>`}_customButton(e){let i=e.name??ue(e.command,n=>this._t(n)),s={};return e.device&&(s.device=e.device),e.value!==null&&e.value!==void 0&&(s.value=e.value),l`<button
      class="custom"
      title=${i}
      @pointerdown=${n=>this._pressStart(n,e.command,s)}
      @pointerup=${()=>this._pressEnd(!0)}
      @pointerleave=${()=>this._pressEnd(!1)}
      @pointercancel=${()=>this._pressEnd(!1)}
      @keydown=${n=>this._keySend(n,e.command,s)}
    >
      ${e.icon||me[e.command]?l`<ha-icon .icon=${e.icon??me[e.command]}></ha-icon>`:c}
      <span>${i}</span>
    </button>`}};L.properties={hass:{attribute:!1},preview:{attribute:!1},_config:{state:!0},_view:{state:!0},_loaded:{state:!0},_subscribeError:{state:!0},_volumeDraft:{state:!0}},L.styles=te`
    :host {
      --avs-key-bg: var(--secondary-background-color, #f0f0f0);
      --avs-key-color: var(--primary-text-color, #212121);
      --avs-accent: var(--primary-color, #03a9f4);
      --avs-radius: 12px;
    }
    ha-card {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    button {
      font: inherit;
      color: inherit;
      border: none;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
      user-select: none;
      -webkit-user-select: none;
    }
    button:focus-visible {
      outline: 2px solid var(--avs-accent);
      outline-offset: 2px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .title {
      flex: 1;
      min-width: 0;
    }
    .name {
      font-size: 1.2em;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .status {
      color: var(--secondary-text-color);
      font-size: 0.9em;
    }
    .status.state-error {
      color: var(--error-color, #db4437);
    }
    .power {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--avs-key-bg);
      display: grid;
      place-items: center;
      flex: none;
    }
    .power.on {
      background: var(--avs-accent);
      color: var(--text-primary-color, #fff);
    }
    .power.state-error {
      background: var(--error-color, #db4437);
    }
    .doing {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      margin-top: -6px;
      color: var(--secondary-text-color);
      font-size: 0.9em;
    }
    .doing.cooling {
      margin-top: 0;
    }
    .doing-text {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .doing-time {
      flex: none;
      font-variant-numeric: tabular-nums;
    }
    .now {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }
    .now .art {
      width: 64px;
      height: 64px;
      flex: none;
      border-radius: 8px;
      object-fit: cover;
      background: var(--avs-key-bg);
    }
    .now .meta {
      flex: 1;
      min-width: 0;
    }
    .now-top,
    .now-sub,
    .now-time {
      color: var(--secondary-text-color);
      font-size: 0.85em;
    }
    .now-top,
    .now-title,
    .now-sub {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .now-title {
      font-weight: 500;
    }
    .now-progress {
      height: 3px;
      margin-top: 6px;
      border-radius: 2px;
      background: var(--divider-color, rgba(0, 0, 0, 0.12));
      overflow: hidden;
    }
    .now-progress div {
      height: 100%;
      background: var(--avs-accent);
    }
    .now-time {
      display: flex;
      justify-content: space-between;
      font-variant-numeric: tabular-nums;
      margin-top: 2px;
    }
    .progress {
      height: 4px;
      border-radius: 2px;
      background: var(--divider-color, rgba(0, 0, 0, 0.12));
      overflow: hidden;
    }
    .progress div {
      height: 100%;
      background: var(--avs-accent);
      transition: width 0.3s ease;
    }
    .message {
      color: var(--secondary-text-color);
    }
    .message.error,
    .message.warning {
      color: var(--error-color, #db4437);
      display: flex;
      gap: 8px;
      align-items: flex-start;
      overflow-wrap: anywhere;
    }
    .warnings {
      font-size: 0.9em;
      color: var(--warning-color, #ffa600);
    }
    .warnings ul {
      margin: 4px 0 0;
      padding-left: 20px;
      color: var(--secondary-text-color);
      overflow-wrap: anywhere;
    }
    .activities {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 18px;
      background: var(--avs-key-bg);
      --mdc-icon-size: 20px;
    }
    .chip.current {
      background: var(--avs-accent);
      color: var(--text-primary-color, #fff);
    }
    .chip.current.state-starting,
    .chip.current.state-stopping {
      animation: pulse 1.2s ease-in-out infinite;
    }
    .chip.current.state-error {
      background: var(--error-color, #db4437);
    }
    @keyframes pulse {
      50% {
        opacity: 0.6;
      }
    }
    .remote {
      display: flex;
      flex-direction: column;
      gap: 12px;
      border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      padding-top: 12px;
    }
    .main {
      display: grid;
      grid-template-columns: 56px 1fr 56px;
      align-items: center;
      gap: 12px;
    }
    .main.no-nav {
      display: flex;
      justify-content: center;
      gap: 64px;
    }
    .main.no-nav .rocker {
      width: 56px;
    }
    .rocker {
      display: grid;
      grid-template-rows: 56px 40px 56px;
      background: var(--avs-key-bg);
      border-radius: 28px;
      overflow: hidden;
    }
    .rocker .key {
      background: none;
      border-radius: 0;
      width: 100%;
      height: 100%;
    }
    .rocker .label {
      display: grid;
      place-items: center;
      font-size: 0.8em;
      color: var(--secondary-text-color);
    }
    .rocker .key.label.active {
      color: var(--error-color, #db4437);
    }
    .key {
      display: grid;
      place-items: center;
      height: 48px;
      min-width: 48px;
      border-radius: var(--avs-radius);
      background: var(--avs-key-bg);
      color: var(--avs-key-color);
    }
    .key:active,
    .custom:active,
    .chip:active,
    .power:active {
      filter: brightness(0.85);
    }
    .touchpad {
      display: grid;
      place-items: end center;
      width: 100%;
      max-width: 320px;
      aspect-ratio: 1;
      justify-self: center;
      border-radius: 20px;
      background: var(--avs-key-bg);
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
      cursor: pointer;
    }
    .touchpad:active {
      filter: brightness(0.94);
    }
    .touchpad:focus-visible {
      outline: 2px solid var(--avs-accent);
      outline-offset: 2px;
    }
    .touchpad-hint {
      padding-bottom: 10px;
      font-size: 0.75em;
      color: var(--secondary-text-color);
      pointer-events: none;
    }
    .dpad {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 52px);
      gap: 4px;
      max-width: 220px;
      width: 100%;
      justify-self: center;
    }
    .dpad .key {
      height: 100%;
    }
    .dpad .ok {
      border-radius: 50%;
      font-weight: 600;
      background: var(--avs-accent);
      color: var(--text-primary-color, #fff);
    }
    .row {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 8px;
    }
    .row .key.pad-switch {
      color: var(--secondary-text-color);
    }
    .row .key {
      flex: 1 1 0;
      max-width: 72px;
    }
    .slider {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--secondary-text-color);
    }
    .slider input {
      flex: 1;
      accent-color: var(--avs-accent);
      min-width: 0;
    }
    .slider .value {
      width: 3ch;
      text-align: right;
      font-variant-numeric: tabular-nums;
    }
    .buttons {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
      gap: 8px;
    }
    .settings {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .settings-toggle {
      display: flex;
      align-items: center;
      gap: 8px;
      min-height: 40px;
      padding: 0 4px;
      background: none;
      color: var(--secondary-text-color);
      --mdc-icon-size: 20px;
    }
    .settings-toggle span {
      flex: 1;
      text-align: left;
    }
    .setting-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .setting {
      min-height: 40px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
      align-items: center;
      gap: 12px;
    }
    .setting-name {
      min-width: 0;
      overflow-wrap: anywhere;
    }
    .setting-device {
      margin-top: 4px;
      font-size: 0.85em;
      font-weight: 500;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .setting-range {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }
    .setting-range input {
      flex: 1;
      min-width: 0;
      accent-color: var(--avs-accent);
    }
    .setting-range .value {
      width: 4ch;
      text-align: right;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
    }
    .setting .toggle {
      height: 40px;
      justify-self: start;
      padding: 0 20px;
    }
    .setting .toggle.active {
      background: var(--avs-accent);
      color: var(--text-primary-color, #fff);
    }
    .setting select {
      width: 100%;
      min-height: 40px;
      padding: 0 8px;
      border: none;
      border-radius: var(--avs-radius);
      background: var(--avs-key-bg);
      color: var(--avs-key-color);
      font: inherit;
    }
    .custom {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      min-height: 44px;
      padding: 6px 10px;
      border-radius: var(--avs-radius);
      background: var(--avs-key-bg);
      --mdc-icon-size: 20px;
    }
  `;customElements.get("easy-av-control-card")||customElements.define("easy-av-control-card",L);function dt(o,t){let e=o.entities?.[t]?.device_id,s=(e?o.devices?.[e]:void 0)?.identifiers?.find(([n])=>n===Q);return s?s[1]:null}var Z=window;Z.customCards=Z.customCards??[];Z.customCards.some(o=>o.type==="easy-av-control-card")||Z.customCards.push({type:"easy-av-control-card",name:"Easy AV Control Remote",description:"Remote control for an Easy AV Control room",preview:!0,documentationURL:"https://github.com/Ltek/easy-av-control#the-card",getEntitySuggestion:(o,t)=>{let e=dt(o,t);return e?{config:{type:"custom:easy-av-control-card",room:e}}:null}});export{L as EasyAvControlRemoteCard,dt as roomOfEntity};
