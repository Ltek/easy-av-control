var U=globalThis,Z=U.ShadowRoot&&(U.ShadyCSS===void 0||U.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ce=Symbol(),Se=new WeakMap,G=class{constructor(i,e,t){if(this._$cssResult$=!0,t!==ce)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o,e=this.t;if(Z&&i===void 0){let t=e!==void 0&&e.length===1;t&&(i=Se.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),t&&Se.set(e,i))}return i}toString(){return this.cssText}},Y=r=>new G(typeof r=="string"?r:r+"",void 0,ce),v=(r,...i)=>{let e=r.length===1?r[0]:i.reduce((t,n,s)=>t+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+r[s+1],r[0]);return new G(e,r,ce)},Ee=(r,i)=>{if(Z)r.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let t=document.createElement("style"),n=U.litNonce;n!==void 0&&t.setAttribute("nonce",n),t.textContent=e.cssText,r.appendChild(t)}},ue=Z?r=>r:r=>r instanceof CSSStyleSheet?(i=>{let e="";for(let t of i.cssRules)e+=t.cssText;return Y(e)})(r):r;var{is:rt,defineProperty:at,getOwnPropertyDescriptor:lt,getOwnPropertyNames:dt,getOwnPropertySymbols:ct,getPrototypeOf:ut}=Object,J=globalThis,Te=J.trustedTypes,ht=Te?Te.emptyScript:"",pt=J.reactiveElementPolyfillSupport,V=(r,i)=>r,he={toAttribute(r,i){switch(i){case Boolean:r=r?ht:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,i){let e=r;switch(i){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},ze=(r,i)=>!rt(r,i),Re={attribute:!0,type:String,converter:he,reflect:!1,useDefault:!1,hasChanged:ze};Symbol.metadata??=Symbol("metadata"),J.litPropertyMetadata??=new WeakMap;var b=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=Re){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(i,e),!e.noAccessor){let t=Symbol(),n=this.getPropertyDescriptor(i,t,e);n!==void 0&&at(this.prototype,i,n)}}static getPropertyDescriptor(i,e,t){let{get:n,set:s}=lt(this.prototype,i)??{get(){return this[e]},set(o){this[e]=o}};return{get:n,set(o){let l=n?.call(this);s?.call(this,o),this.requestUpdate(i,l,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??Re}static _$Ei(){if(this.hasOwnProperty(V("elementProperties")))return;let i=ut(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(V("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(V("properties"))){let e=this.properties,t=[...dt(e),...ct(e)];for(let n of t)this.createProperty(n,e[n])}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[t,n]of e)this.elementProperties.set(t,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let t=new Set(i.flat(1/0).reverse());for(let n of t)e.unshift(ue(n))}else i!==void 0&&e.push(ue(i));return e}static _$Eu(i,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(i.set(t,this[t]),delete this[t]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ee(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,e,t){this._$AK(i,t)}_$ET(i,e){let t=this.constructor.elementProperties.get(i),n=this.constructor._$Eu(i,t);if(n!==void 0&&t.reflect===!0){let s=(t.converter?.toAttribute!==void 0?t.converter:he).toAttribute(e,t.type);this._$Em=i,s==null?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(i,e){let t=this.constructor,n=t._$Eh.get(i);if(n!==void 0&&this._$Em!==n){let s=t.getPropertyOptions(n),o=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:he;this._$Em=n;let l=o.fromAttribute(e,s.type);this[n]=l??this._$Ej?.get(n)??l,this._$Em=null}}requestUpdate(i,e,t,n=!1,s){if(i!==void 0){let o=this.constructor;if(n===!1&&(s=this[i]),t??=o.getPropertyOptions(i),!((t.hasChanged??ze)(s,e)||t.useDefault&&t.reflect&&s===this._$Ej?.get(i)&&!this.hasAttribute(o._$Eu(i,t))))return;this.C(i,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,e,{useDefault:t,reflect:n,wrapped:s},o){t&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,o??e??this[i]),s!==!0||o!==void 0)||(this._$AL.has(i)||(this.hasUpdated||t||(e=void 0),this._$AL.set(i,e)),n===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,s]of this._$Ep)this[n]=s;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[n,s]of t){let{wrapped:o}=s,l=this[n];o!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,s,l)}}let i=!1,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw i=!1,this._$EM(),t}i&&this._$AE(e)}willUpdate(i){}_$AE(i){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(i){}firstUpdated(i){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[V("elementProperties")]=new Map,b[V("finalized")]=new Map,pt?.({ReactiveElement:b}),(J.reactiveElementVersions??=[]).push("2.1.2");var fe=globalThis,Ce=r=>r,Q=fe.trustedTypes,Pe=Q?Q.createPolicy("lit-html",{createHTML:r=>r}):void 0,me="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,_e="?"+y,ft=`<${_e}>`,$=document,W=()=>$.createComment(""),B=r=>r===null||typeof r!="object"&&typeof r!="function",ge=Array.isArray,Me=r=>ge(r)||typeof r?.[Symbol.iterator]=="function",pe=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,De=/-->/g,Ne=/>/g,A=RegExp(`>|${pe}(?:([^\\s"'>=/]+)(${pe}*=${pe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ie=/'/g,Ge=/"/g,We=/^(?:script|style|textarea|title)$/i,ve=r=>(i,...e)=>({_$litType$:r,strings:i,values:e}),a=ve(1),Mt=ve(2),Wt=ve(3),w=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Ve=new WeakMap,x=$.createTreeWalker($,129);function Be(r,i){if(!ge(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Pe!==void 0?Pe.createHTML(i):i}var He=(r,i)=>{let e=r.length-1,t=[],n,s=i===2?"<svg>":i===3?"<math>":"",o=M;for(let l=0;l<e;l++){let d=r[l],c,p,h=-1,f=0;for(;f<d.length&&(o.lastIndex=f,p=o.exec(d),p!==null);)f=o.lastIndex,o===M?p[1]==="!--"?o=De:p[1]!==void 0?o=Ne:p[2]!==void 0?(We.test(p[2])&&(n=RegExp("</"+p[2],"g")),o=A):p[3]!==void 0&&(o=A):o===A?p[0]===">"?(o=n??M,h=-1):p[1]===void 0?h=-2:(h=o.lastIndex-p[2].length,c=p[1],o=p[3]===void 0?A:p[3]==='"'?Ge:Ie):o===Ge||o===Ie?o=A:o===De||o===Ne?o=M:(o=A,n=void 0);let _=o===A&&r[l+1].startsWith("/>")?" ":"";s+=o===M?d+ft:h>=0?(t.push(c),d.slice(0,h)+me+d.slice(h)+y+_):d+y+(h===-2?l:_)}return[Be(r,s+(r[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),t]},H=class r{constructor({strings:i,_$litType$:e},t){let n;this.parts=[];let s=0,o=0,l=i.length-1,d=this.parts,[c,p]=He(i,e);if(this.el=r.createElement(c,t),x.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=x.nextNode())!==null&&d.length<l;){if(n.nodeType===1){if(n.hasAttributes())for(let h of n.getAttributeNames())if(h.endsWith(me)){let f=p[o++],_=n.getAttribute(h).split(y),m=/([.?@])?(.*)/.exec(f);d.push({type:1,index:s,name:m[2],strings:_,ctor:m[1]==="."?ee:m[1]==="?"?te:m[1]==="@"?ie:E}),n.removeAttribute(h)}else h.startsWith(y)&&(d.push({type:6,index:s}),n.removeAttribute(h));if(We.test(n.tagName)){let h=n.textContent.split(y),f=h.length-1;if(f>0){n.textContent=Q?Q.emptyScript:"";for(let _=0;_<f;_++)n.append(h[_],W()),x.nextNode(),d.push({type:2,index:++s});n.append(h[f],W())}}}else if(n.nodeType===8)if(n.data===_e)d.push({type:2,index:s});else{let h=-1;for(;(h=n.data.indexOf(y,h+1))!==-1;)d.push({type:7,index:s}),h+=y.length-1}s++}}static createElement(i,e){let t=$.createElement("template");return t.innerHTML=i,t}};function S(r,i,e=r,t){if(i===w)return i;let n=t!==void 0?e._$Co?.[t]:e._$Cl,s=B(i)?void 0:i._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),s===void 0?n=void 0:(n=new s(r),n._$AT(r,e,t)),t!==void 0?(e._$Co??=[])[t]=n:e._$Cl=n),n!==void 0&&(i=S(r,n._$AS(r,i.values),n,t)),i}var X=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:t}=this._$AD,n=(i?.creationScope??$).importNode(e,!0);x.currentNode=n;let s=x.nextNode(),o=0,l=0,d=t[0];for(;d!==void 0;){if(o===d.index){let c;d.type===2?c=new z(s,s.nextSibling,this,i):d.type===1?c=new d.ctor(s,d.name,d.strings,this,i):d.type===6&&(c=new ne(s,this,i)),this._$AV.push(c),d=t[++l]}o!==d?.index&&(s=x.nextNode(),o++)}return x.currentNode=$,n}p(i){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(i,t,e),e+=t.strings.length-2):t._$AI(i[e])),e++}},z=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,e,t,n){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=t,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&i?.nodeType===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=S(this,i,e),B(i)?i===u||i==null||i===""?(this._$AH!==u&&this._$AR(),this._$AH=u):i!==this._$AH&&i!==w&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):Me(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==u&&B(this._$AH)?this._$AA.nextSibling.data=i:this.T($.createTextNode(i)),this._$AH=i}$(i){let{values:e,_$litType$:t}=i,n=typeof t=="number"?this._$AC(i):(t.el===void 0&&(t.el=H.createElement(Be(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===n)this._$AH.p(e);else{let s=new X(n,this),o=s.u(this.options);s.p(e),this.T(o),this._$AH=s}}_$AC(i){let e=Ve.get(i.strings);return e===void 0&&Ve.set(i.strings,e=new H(i)),e}k(i){ge(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,n=0;for(let s of i)n===e.length?e.push(t=new r(this.O(W()),this.O(W()),this,this.options)):t=e[n],t._$AI(s),n++;n<e.length&&(this._$AR(t&&t._$AB.nextSibling,n),e.length=n)}_$AR(i=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);i!==this._$AB;){let t=Ce(i).nextSibling;Ce(i).remove(),i=t}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},E=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,t,n,s){this.type=1,this._$AH=u,this._$AN=void 0,this.element=i,this.name=e,this._$AM=n,this.options=s,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=u}_$AI(i,e=this,t,n){let s=this.strings,o=!1;if(s===void 0)i=S(this,i,e,0),o=!B(i)||i!==this._$AH&&i!==w,o&&(this._$AH=i);else{let l=i,d,c;for(i=s[0],d=0;d<s.length-1;d++)c=S(this,l[t+d],e,d),c===w&&(c=this._$AH[d]),o||=!B(c)||c!==this._$AH[d],c===u?i=u:i!==u&&(i+=(c??"")+s[d+1]),this._$AH[d]=c}o&&!n&&this.j(i)}j(i){i===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},ee=class extends E{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===u?void 0:i}},te=class extends E{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==u)}},ie=class extends E{constructor(i,e,t,n,s){super(i,e,t,n,s),this.type=5}_$AI(i,e=this){if((i=S(this,i,e,0)??u)===w)return;let t=this._$AH,n=i===u&&t!==u||i.capture!==t.capture||i.once!==t.once||i.passive!==t.passive,s=i!==u&&(t===u||n);n&&this.element.removeEventListener(this.name,this,t),s&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},ne=class{constructor(i,e,t){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(i){S(this,i)}},Le={M:me,P:y,A:_e,C:1,L:He,R:X,D:Me,V:S,I:z,H:E,N:te,U:ie,B:ee,F:ne},mt=fe.litHtmlPolyfillSupport;mt?.(H,z),(fe.litHtmlVersions??=[]).push("3.3.3");var Oe=(r,i,e)=>{let t=e?.renderBefore??i,n=t._$litPart$;if(n===void 0){let s=e?.renderBefore??null;t._$litPart$=n=new z(i.insertBefore(W(),s),s,void 0,e??{})}return n._$AI(r),n};var we=globalThis,g=class extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=Oe(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}};g._$litElement$=!0,g.finalized=!0,we.litElementHydrateSupport?.({LitElement:g});var _t=we.litElementPolyfillSupport;_t?.({LitElement:g});(we.litElementVersions??=[]).push("4.2.2");var T={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},qe=r=>(...i)=>({_$litDirective$:r,values:i}),se=class{constructor(i){}get _$AU(){return this._$AM._$AU}_$AT(i,e,t){this._$Ct=i,this._$AM=e,this._$Ci=t}_$AS(i,e){return this.update(i,e)}update(i,e){return this.render(...e)}};var{I:ei}=Le;var Ke=r=>r.strings===void 0;var gt={},je=(r,i=gt)=>r._$AH=i;var k=qe(class extends se{constructor(r){if(super(r),r.type!==T.PROPERTY&&r.type!==T.ATTRIBUTE&&r.type!==T.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ke(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(r,[i]){if(i===w||i===u)return i;let e=r.element,t=r.name;if(r.type===T.PROPERTY){if(i===e[t])return w}else if(r.type===T.BOOLEAN_ATTRIBUTE){if(!!i===e.hasAttribute(t))return w}else if(r.type===T.ATTRIBUTE&&e.getAttribute(t)===i+"")return w;return je(r),i}});var oe={en:{"state.idle":"Off","flow.show":"Flow","flow.details":"Details","editor.show_flow":"Flow (opens by itself while the room starts or stops)","editor.flow_details":"Flow with entities, actions and notes","state.starting":"Starting \u2026","state.active":"On","now.paused":"Paused","state.stopping":"Stopping \u2026","state.error":"Error",power:"On/off",loading:"Loading \u2026",not_found:'Room "{room}" not found',no_room:"Pick a room in the card settings",warnings:"Warnings",volume:"Volume","command.volume_up":"Volume up","command.volume_down":"Volume down","command.mute":"Mute","command.volume_set":"Volume slider","command.select_source":"Select source","command.select_sound_mode":"Select sound mode","command.channel_up":"Channel up","command.channel_down":"Channel down","command.play_pause":"Play/pause","command.play":"Play","command.pause":"Pause","command.stop":"Stop","command.next":"Next","command.previous":"Previous","command.up":"Up","command.down":"Down","command.left":"Left","command.right":"Right","command.ok":"OK","command.back":"Back","command.menu":"Menu","command.home":"Home","command.info":"Info","command.guide":"Guide","command.exit":"Exit","editor.room":"Room","editor.section":"Card","editor.hint":"The room this card controls. The card shows its activities, the remote of the running one, and its settings.","editor.star":"\u2B50 Star on GitHub","editor.report":"\u{1F41B} Report an issue","editor.name":"Title (optional)","doing.power_on":"Turning the outlets on","doing.power_off":"Turning the outlets off","doing.boot":"{name} is booting","doing.reload":"Reconnecting {name}","doing.ready":"Waiting for {name}","doing.turn_on":"Turning on {name}","doing.reach":"Waiting for {name} to be reachable","doing.delay":"Waiting before turning on {name}","doing.before":"Before {name}: waiting for {names}","doing.warm_up":"{name} is starting up","doing.status_on":"Waiting for {name} to be on","doing.status_on_value":"{name}: {value}","doing.status_off":"Waiting for {name} to be off","doing.status_off_value":"{name}: {value}","doing.turn_off":"Turning off {name}","doing.checks":"Checking that everything works","doing.step":"Step {step} of {steps}: {what}","doing.wait":"Step {step} of {steps}: waiting","doing.hooks_on_start":"Waiting for the actions on start","doing.hooks_on_stop":"Waiting for the actions on stop","doing.left":"{time} left","doing.at_most":"at most {time}","cooling.text":"Cooling down: {names}","cooling.time":"power off in {time}","cooling.time_status":"power off once they are off, at most {time}",touchpad:"Touch surface: swipe for the arrow keys, tap for OK","touchpad.hint":"Swipe \xB7 tap for OK","rocker.volume":"VOL","rocker.channels":"CH","pad.show_arrows":"Show arrow keys","pad.show_touchpad":"Show touch surface",settings:"Settings","setting.source":"Source","setting.sound_mode":"Sound mode","toggle.on":"On","toggle.off":"Off","step.power_on":"Switch on","step.power_off":"Switch off","step.set_source":"Set source","step.set_volume":"Set volume","step.set_sound_mode":"Set sound mode","step.set_brightness":"Set brightness","step.set_color_temp":"Set color temperature","step.set_position":"Set cover position","step.set_tilt":"Set cover tilt","step.call_action":"Run action","step.delay":"Wait","step.wait_available":"Wait until available","step.wait_picture":"Wait for a picture"},de:{"state.idle":"Aus","flow.show":"Ablauf","flow.details":"Details","editor.show_flow":"Ablauf (\xF6ffnet sich selbst, w\xE4hrend der Raum startet oder stoppt)","editor.flow_details":"Ablauf mit Entit\xE4ten, Aktionen und Hinweisen","state.starting":"Startet \u2026","state.active":"An","now.paused":"Pausiert","state.stopping":"Stoppt \u2026","state.error":"Fehler",power:"Ein/Aus",loading:"L\xE4dt \u2026",not_found:"Raum \u201E{room}\u201C nicht gefunden",no_room:"Bitte in den Karteneinstellungen einen Raum w\xE4hlen",warnings:"Warnungen",volume:"Lautst\xE4rke","command.volume_up":"Lauter","command.volume_down":"Leiser","command.mute":"Stumm","command.volume_set":"Lautst\xE4rkeregler","command.select_source":"Quelle w\xE4hlen","command.select_sound_mode":"Klangmodus w\xE4hlen","command.channel_up":"Kanal hoch","command.channel_down":"Kanal runter","command.play_pause":"Wiedergabe/Pause","command.play":"Wiedergabe","command.pause":"Pause","command.stop":"Stopp","command.next":"Weiter","command.previous":"Zur\xFCck","command.up":"Hoch","command.down":"Runter","command.left":"Links","command.right":"Rechts","command.ok":"OK","command.back":"Zur\xFCck","command.menu":"Men\xFC","command.home":"Start","command.info":"Info","command.guide":"EPG","command.exit":"Beenden","editor.room":"Raum","editor.section":"Karte","editor.hint":"Der Raum, den diese Karte steuert. Sie zeigt seine Aktivit\xE4ten, die Fernbedienung der laufenden und ihre Einstellungen.","editor.star":"\u2B50 Auf GitHub markieren","editor.report":"\u{1F41B} Problem melden","editor.name":"Titel (optional)","doing.power_on":"Steckdosen werden eingeschaltet","doing.power_off":"Steckdosen werden ausgeschaltet","doing.boot":"{name} bootet","doing.reload":"{name} wird neu verbunden","doing.ready":"Warte auf {name}","doing.turn_on":"{name} wird eingeschaltet","doing.reach":"Warte, bis {name} erreichbar ist","doing.delay":"Warte vor dem Einschalten von {name}","doing.before":"Vor {name}: warte auf {names}","doing.warm_up":"{name} f\xE4hrt hoch","doing.status_on":"Warte, bis {name} an ist","doing.status_on_value":"{name}: {value}","doing.status_off":"Warte, bis {name} aus ist","doing.status_off_value":"{name}: {value}","doing.turn_off":"{name} wird ausgeschaltet","doing.checks":"Pr\xFCfe, ob alles l\xE4uft","doing.step":"Schritt {step} von {steps}: {what}","doing.wait":"Schritt {step} von {steps}: warten","doing.hooks_on_start":"Warte auf die Aktionen beim Start","doing.hooks_on_stop":"Warte auf die Aktionen beim Stopp","doing.left":"noch {time}","doing.at_most":"h\xF6chstens noch {time}","cooling.text":"Abk\xFChlen: {names}","cooling.time":"Strom aus in {time}","cooling.time_status":"Strom aus, sobald sie aus sind, h\xF6chstens noch {time}",touchpad:"Touchfl\xE4che: wischen f\xFCr die Pfeiltasten, tippen f\xFCr OK","touchpad.hint":"Wischen \xB7 Tippen f\xFCr OK","rocker.volume":"VOL","rocker.channels":"CH","pad.show_arrows":"Pfeiltasten zeigen","pad.show_touchpad":"Touchfl\xE4che zeigen",settings:"Einstellungen","setting.source":"Quelle","setting.sound_mode":"Klangmodus","toggle.on":"An","toggle.off":"Aus","step.power_on":"Einschalten","step.power_off":"Ausschalten","step.set_source":"Quelle w\xE4hlen","step.set_volume":"Lautst\xE4rke setzen","step.set_sound_mode":"Klangmodus w\xE4hlen","step.set_brightness":"Helligkeit setzen","step.set_color_temp":"Farbtemperatur setzen","step.set_position":"Rollladen-Position setzen","step.set_tilt":"Lamellen-Neigung setzen","step.call_action":"Aktion ausf\xFChren","step.delay":"Warten","step.wait_available":"Auf Verf\xFCgbarkeit warten","step.wait_picture":"Auf ein Bild warten"}};function C(r,i,e={}){let t=(r??"en").split("-")[0],s=(t in oe?oe[t]:oe.en)[i]??oe.en[i]??i;for(let[o,l]of Object.entries(e))s=s.replace(`{${o}}`,l);return s}var vt=`
          /* Font sizes (by role, not by pixel) */
          --ltek-fs-panel-title: 16px;  /* top-level panel / section title */
          --ltek-fs-header: 15px;       /* editor header, panel summary */
          --ltek-fs-group: 14px;        /* group heading inside a panel */
          --ltek-fs-label: 13px;        /* standard field label / row */
          --ltek-fs-body: 12px;         /* body text, most controls */
          --ltek-fs-small: 11px;        /* hints, secondary text */
          --ltek-fs-tiny: 10px;         /* badges, micro-labels */
          /* Font weights */
          --ltek-fw-normal: 400;        /* control labels (recede) */
          --ltek-fw-medium: 500;
          --ltek-fw-semibold: 600;
          --ltek-fw-bold: 700;          /* titles, values (lead) */
          /* Text colors */
          --ltek-c-text: var(--primary-text-color, #e1e1e1);  /* primary */
          --ltek-c-label: #ccc;         /* control labels */
          --ltek-c-muted: #888;         /* hints / disabled */
          --ltek-c-accent: var(--primary-color, #2196F3);
          /* Accent tints \u2014 hover / active fills (kept as rgba literals; one place
             to change). Default to the Material blue the cards shipped with. */
          --ltek-c-accent-fade: rgba(var(--rgb-primary-color,33,150,243),0.12);       /* active / pressed fill */
          --ltek-c-accent-fade-soft: rgba(var(--rgb-primary-color,33,150,243),0.08);  /* hover fill */
          --ltek-c-error-fade: rgba(244,67,54,0.15);         /* delete hover fill */
          /* Status colors \u2014 defer to the user's theme, fall back to Material. */
          --ltek-c-error: var(--error-color, #f44336);
          --ltek-c-success: var(--success-color, #4caf50);
          --ltek-c-warning: var(--warning-color, #ffb300);
          --ltek-c-info: var(--info-color, #2196F3);
          /* Second accent: the green "library / shared" grouping (distinct from
             the blue layout accent on purpose \u2014 NOT tied to --primary-color). */
          --ltek-c-accent-lib: #7fd18a;
          --ltek-c-on-accent: #fff;   /* text/icon on a solid accent fill */
          /* Action icons (edit/copy/hide/etc): neutral idle \u2192 brighten on hover.
             Delete stays a status color (error) on its own hover. */
          --ltek-c-icon: #aaa;        /* idle action icon */
          --ltek-c-icon-hover: #fff;  /* hovered action icon */
          /* Surfaces */
          --ltek-c-surface: rgba(255,255,255,0.015);        /* panels */
          --ltek-c-surface-raised: rgba(255,255,255,0.02);  /* cards / rows */
          /* Borders */
          --ltek-c-panel-border: #3a3a3a;   /* panels */
          --ltek-c-border: #444;            /* controls */
          --ltek-c-border-soft: #333;       /* subtle inner dividers */
          /* Radii */
          --ltek-r-panel: 12px;   /* panels */
          --ltek-r-card: 10px;    /* section cards */
          --ltek-r-md: 8px;       /* blocks */
          --ltek-r-ctrl: 6px;     /* inputs, selects, buttons */
          /* Spacing scale (4px base) */
          --ltek-sp-1: 4px;
          --ltek-sp-2: 6px;
          --ltek-sp-3: 8px;
          --ltek-sp-4: 10px;
          --ltek-sp-5: 12px;
          --ltek-sp-6: 16px;
          /* Control padding \u2014 uniform input/select/button height. */
          --ltek-ctrl-pad: 6px 10px;
          /* Icon sizes (two clear roles; one-off glyphs stay literal). */
          --ltek-icon-sm: 16px;   /* inline / action icons */
          --ltek-icon-lg: 20px;   /* panel-title icons */
          /* Slider row geometry (shared by every slider) */
          --ltek-slider-val-w: 44px;   /* value readout column width */
`,P=v`
  :host {
    ${Y(vt)}
  }
`,D=v`
  :host {
    font-family: var(--paper-font-body1_-_font-family, inherit);
  }
  ha-icon {
    --mdc-icon-size: var(--ltek-icon-sm);
  }
  /* Top-level panel: bordered, accent border when open */
  details.ltek-sec,
  section.ltek-sec {
    border: 1px solid var(--ltek-c-panel-border);
    border-radius: var(--ltek-r-panel);
    background: var(--ltek-c-surface);
    margin-bottom: var(--ltek-sp-3);
    overflow: hidden;
  }
  details.ltek-sec[open] {
    border-color: var(--ltek-c-accent);
  }
  .ltek-sec > summary,
  .ltek-sec > .ltek-sec-head {
    display: flex;
    align-items: center;
    gap: var(--ltek-sp-3);
    padding: 14px 16px;
    cursor: pointer;
    user-select: none;
    list-style: none;
    font-size: var(--ltek-fs-panel-title);
    font-weight: var(--ltek-fw-bold);
    color: var(--ltek-c-text);
  }
  .ltek-sec > .ltek-sec-head {
    cursor: default;
  }
  .ltek-sec > summary::-webkit-details-marker,
  .ltek-sub > summary::-webkit-details-marker {
    display: none;
  }
  .ltek-sec > summary > ha-icon:not(.chev),
  .ltek-sec > .ltek-sec-head > ha-icon {
    color: var(--ltek-c-accent);
    --mdc-icon-size: var(--ltek-icon-lg);
  }
  .chev {
    margin-left: auto;
    color: #999;
    --mdc-icon-size: 20px;
    transition: transform 0.2s ease;
    transform: rotate(-90deg);
  }
  details[open] > summary .chev {
    transform: none;
  }
  .ltek-body {
    padding: 0 16px 16px;
  }
  .ltek-hint {
    color: var(--ltek-c-muted);
    font-size: var(--ltek-fs-small);
    margin: 0 0 var(--ltek-sp-3);
    line-height: 1.4;
  }
  .ltek-hint code {
    font-size: var(--ltek-fs-tiny);
  }
  /* Group subtitle: theme accent, mixed case, divider above (not on the first) */
  .ltek-group {
    color: var(--accent-color, var(--ltek-c-accent));
    font-size: var(--ltek-fs-group);
    font-weight: var(--ltek-fw-semibold);
    margin-top: var(--ltek-sp-4);
    padding-top: var(--ltek-sp-3);
    border-top: 1px solid var(--ltek-c-border-soft);
  }
  .ltek-group.first {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }
  /* Flat sub-panel: divider when closed, accent border when open, uppercase title */
  details.ltek-sub {
    border-top: 1px solid var(--ltek-c-border-soft);
    border-radius: var(--ltek-r-ctrl);
  }
  details.ltek-sub[open] {
    border: 1px solid var(--accent-color, var(--ltek-c-accent));
    margin: var(--ltek-sp-1) 0;
  }
  .ltek-sub > summary {
    display: flex;
    align-items: center;
    gap: var(--ltek-sp-2);
    padding: var(--ltek-sp-3) var(--ltek-sp-2);
    cursor: pointer;
    list-style: none;
    color: var(--ltek-c-accent);
    font-size: var(--ltek-fs-label);
    font-weight: var(--ltek-fw-semibold);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .ltek-sub-body {
    padding: 0 var(--ltek-sp-4) var(--ltek-sp-4);
  }
  /* Field row: content-width label, control right beside it */
  .ltek-row {
    display: flex;
    align-items: center;
    gap: var(--ltek-sp-4);
    padding: var(--ltek-sp-1) 0;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .ltek-row > label.lbl {
    color: var(--ltek-c-label);
    font-size: var(--ltek-fs-body);
    font-weight: var(--ltek-fw-normal);
    flex: none;
  }
  .ltek-row > input[type="text"],
  .ltek-row > select,
  textarea.ltek-text {
    flex: 1 1 auto;
    min-width: 0;
    padding: var(--ltek-ctrl-pad);
    background: var(--secondary-background-color, #2a2a2a);
    border: 1px solid var(--ltek-c-border);
    border-radius: var(--ltek-r-ctrl);
    color: var(--ltek-c-text);
    font: inherit;
    font-size: var(--ltek-fs-body);
  }
  /* Lists: raised rows with a leading accent icon, name, sub line, action icons */
  .ltek-list {
    display: flex;
    flex-direction: column;
    gap: var(--ltek-sp-2);
  }
  .ltek-item {
    display: flex;
    align-items: center;
    gap: var(--ltek-sp-2);
    padding: var(--ltek-sp-2) var(--ltek-sp-3);
    background: var(--ltek-c-surface-raised);
    border-radius: var(--ltek-r-card);
    border: 1px solid transparent;
    width: 100%;
    box-sizing: border-box;
    font: inherit;
    text-align: left;
    color: var(--ltek-c-text);
  }
  button.ltek-item {
    cursor: pointer;
  }
  button.ltek-item:hover {
    background: var(--ltek-c-accent-fade-soft);
  }
  .ltek-item.open {
    border-color: var(--accent-color, var(--ltek-c-accent));
  }
  .ltek-item > ha-icon.lead {
    color: var(--accent-color, var(--ltek-c-accent));
    --mdc-icon-size: var(--ltek-icon-lg);
    flex: none;
  }
  .ltek-item-text {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    min-width: 0;
    overflow-wrap: anywhere;
  }
  .ltek-name {
    color: var(--ltek-c-text);
    font-size: var(--ltek-fs-label);
    font-weight: var(--ltek-fw-normal);
  }
  .ltek-subline {
    color: var(--ltek-c-muted);
    font-size: var(--ltek-fs-small);
  }
  .ltek-badge {
    flex: none;
    color: var(--ltek-c-muted);
    font-size: var(--ltek-fs-tiny);
    border: 1px solid var(--ltek-c-border);
    border-radius: var(--ltek-r-ctrl);
    padding: 0 var(--ltek-sp-1);
    white-space: nowrap;
  }
  .ltek-badge.accent {
    color: var(--ltek-c-accent);
    border-color: var(--ltek-c-accent);
  }
  .ltek-badge.ok {
    color: var(--ltek-c-success);
    border-color: var(--ltek-c-success);
  }
  .ltek-badge.warn {
    color: var(--ltek-c-warning);
    border-color: var(--ltek-c-warning);
  }
  .ltek-badge.lib {
    color: var(--ltek-c-accent-lib);
    border-color: var(--ltek-c-accent-lib);
  }
  /* Action icons: neutral idle, bright on hover; delete turns red */
  button.ltek-act,
  button.ltek-del {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    color: var(--ltek-c-icon);
    flex: none;
    line-height: 0;
  }
  button.ltek-act:hover {
    color: var(--ltek-c-icon-hover);
  }
  button.ltek-act.on {
    color: var(--ltek-c-accent);
  }
  button.ltek-act:disabled {
    opacity: 0.3;
    cursor: default;
  }
  button.ltek-del:hover {
    color: var(--ltek-c-error);
  }
  /* Add: dashed accent, at the top of its list */
  button.ltek-add {
    align-self: flex-start;
    padding: var(--ltek-ctrl-pad);
    border: 1px dashed var(--ltek-c-accent);
    border-radius: var(--ltek-r-ctrl);
    background: transparent;
    color: var(--ltek-c-accent);
    font: inherit;
    font-size: var(--ltek-fs-body);
    font-weight: var(--ltek-fw-semibold);
    cursor: pointer;
  }
  button.ltek-add:hover {
    background: var(--ltek-c-accent-fade-soft);
  }
  button.ltek-btn {
    padding: var(--ltek-ctrl-pad);
    border: 1px solid var(--ltek-c-border);
    border-radius: var(--ltek-r-ctrl);
    background: transparent;
    color: var(--ltek-c-text);
    font: inherit;
    font-size: var(--ltek-fs-body);
    cursor: pointer;
  }
  button.ltek-btn.primary {
    background: var(--ltek-c-accent);
    border-color: var(--ltek-c-accent);
    color: var(--ltek-c-on-accent);
  }
  button.ltek-btn:hover {
    background: var(--ltek-c-accent-fade-soft);
  }
  button.ltek-btn.primary:hover {
    filter: brightness(1.1);
    background: var(--ltek-c-accent);
  }
  button.ltek-btn:disabled,
  button.ltek-add:disabled {
    opacity: 0.4;
    cursor: default;
    filter: none;
  }
  button.ltek-btn.danger {
    color: var(--ltek-c-error);
    border-color: var(--ltek-c-error);
  }
  button.ltek-btn.danger:hover {
    background: var(--ltek-c-error-fade);
  }
  .ltek-buttons {
    display: flex;
    gap: var(--ltek-sp-3);
    flex-wrap: wrap;
    align-items: center;
  }
  .ltek-warn {
    color: var(--ltek-c-warning);
  }
  .ltek-error {
    color: var(--ltek-c-error);
  }
  /* Footer: Star + Report an issue, one left-aligned row */
  .ltek-links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--divider-color);
  }
  .ltek-star {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
    padding: 6px 18px;
    border-radius: 20px;
    background: linear-gradient(90deg, #f7a92b 0%, #f4731a 100%);
    box-shadow: 0 2px 8px rgba(244, 115, 26, 0.35);
  }
  .ltek-star:hover {
    filter: brightness(1.1);
  }
  .ltek-issue {
    font-size: 12px;
    color: var(--primary-color);
    text-decoration: none;
    padding: 4px 10px;
    border: 1px solid var(--primary-color);
    border-radius: 14px;
  }
  .ltek-issue:hover {
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
  }
  .ltek-foot {
    color: var(--ltek-c-muted);
    font-size: var(--ltek-fs-tiny);
  }
`,re=v`
  :host {
    --ltek-fs-panel-title: 17px;
    --ltek-fs-header: 16px;
    --ltek-fs-group: 15px;
    --ltek-fs-label: 14px;
    --ltek-fs-body: 13px;
    --ltek-fs-small: 12px;
    --ltek-fs-tiny: 11px;
  }
`,be="https://github.com/Ltek/easy-av-control";var L=class extends g{constructor(){super(),this.data={},this.schema=[],this.disabled=!1}_set(i,e){let t={...this.data??{}};e===void 0||e===""?delete t[i]:t[i]=e,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t}}))}render(){return a`${(this.schema??[]).map(i=>this._field(i))}`}_field(i){let e=this.computeLabel?.(i)??i.name,t=this.computeHelper?.(i),[n,s]=Object.entries(i.selector??{})[0]??["text",{}],o=s??{},l=this.data?.[i.name],d=t?a`<div class="ltek-hint help">${t}</div>`:u;if(n==="boolean")return a`<label class="check">
          <input
            type="checkbox"
            .checked=${k(!!l)}
            ?disabled=${this.disabled}
            @change=${p=>this._set(i.name,p.target.checked)}
          />
          ${e}
        </label>
        ${d}`;if(n==="text")return a`<div class="ltek-row">
          <label class="lbl">${e}</label>
          <input
            type="text"
            .value=${k(l==null?"":String(l))}
            ?disabled=${this.disabled}
            @change=${p=>this._set(i.name,p.target.value)}
          />
        </div>
        ${d}`;if(n==="number"){let p=o.unit_of_measurement??"",h=_=>{let m=_.target.value;this._set(i.name,m===""?void 0:Number(m))},f=l==null?"":String(l);return o.mode==="slider"?a`<div class="ltek-row slider">
            <label class="lbl">${e}</label>
            <input
              type="range"
              min=${String(o.min??0)}
              max=${String(o.max??100)}
              step=${String(o.step??1)}
              .value=${k(f||String(o.min??0))}
              ?disabled=${this.disabled}
              @input=${h}
            />
            <span class="readout">${f===""?"\u2013":f}${p?a`<span class="unit">${p}</span>`:u}</span>
          </div>
          ${d}`:a`<div class="ltek-row">
          <label class="lbl">${e}</label>
          <input
            class="num"
            type="number"
            min=${String(o.min??"")}
            max=${String(o.max??"")}
            step=${String(o.step??1)}
            .value=${k(f)}
            ?disabled=${this.disabled}
            @change=${h}
          />
          ${p?a`<span class="unit">${p}</span>`:u}
        </div>
        ${d}`}if(n==="select"&&!o.multiple&&!o.custom_value){let p=(o.options??[]).map(f=>typeof f=="string"?{value:f,label:f}:f),h=l==null?"":String(l);return a`<div class="ltek-row">
          <label class="lbl">${e}</label>
          <select
            .value=${k(h)}
            ?disabled=${this.disabled}
            @change=${f=>this._set(i.name,f.target.value||void 0)}
          >
            ${i.required&&h?u:a`<option value="" ?selected=${!h}>–</option>`}
            ${p.map(f=>a`<option value=${f.value} ?selected=${f.value===h}>${f.label}</option>`)}
            ${h&&!p.some(f=>f.value===h)?a`<option value=${h} selected>${h}</option>`:u}
          </select>
        </div>
        ${d}`}return a`<div class="ltek-row ${n==="object"||n==="action"||n==="target"?"stack":"picker"}">
        <label class="lbl">${e}</label>
        <ha-selector
          .hass=${this.hass}
          .selector=${i.selector}
          .value=${l}
          .required=${!!i.required}
          .disabled=${this.disabled}
          @value-changed=${p=>{p.stopPropagation(),this._set(i.name,p.detail.value)}}
        ></ha-selector>
      </div>
      ${d}`}};L.properties={hass:{attribute:!1},data:{attribute:!1},schema:{attribute:!1},computeLabel:{attribute:!1},computeHelper:{attribute:!1},disabled:{type:Boolean}},L.styles=[P,re,D,v`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--ltek-sp-1);
      }
      .ltek-row {
        flex-wrap: nowrap;
      }
      .ltek-row > label.lbl {
        font-size: var(--ltek-fs-label);
        white-space: nowrap;
      }
      .ltek-row > input[type="text"],
      .ltek-row > select,
      .ltek-row > input.num {
        flex: 1 1 auto;
        min-width: 0;
        padding: var(--ltek-ctrl-pad);
        background: var(--secondary-background-color, #2a2a2a);
        border: 1px solid var(--ltek-c-border);
        border-radius: var(--ltek-r-ctrl);
        color: var(--ltek-c-text);
        font: inherit;
        font-size: var(--ltek-fs-body);
      }
      .ltek-row > input.num {
        flex: 0 0 90px;
      }
      .ltek-row > input:focus,
      .ltek-row > select:focus {
        outline: none;
        border-color: var(--ltek-c-accent);
      }
      .ltek-row.slider input[type="range"] {
        flex: 1 1 auto;
        min-width: 80px;
        accent-color: var(--ltek-c-accent);
      }
      .readout {
        flex: none;
        min-width: var(--ltek-slider-val-w);
        text-align: right;
        font-variant-numeric: tabular-nums;
        font-weight: var(--ltek-fw-bold);
        font-size: var(--ltek-fs-body);
        color: var(--ltek-c-text);
      }
      .unit {
        color: var(--ltek-c-muted);
        font-size: var(--ltek-fs-small);
        font-weight: var(--ltek-fw-normal);
        margin-left: 2px;
      }
      .ltek-row.picker > ha-selector {
        flex: 1 1 auto;
        min-width: 0;
      }
      .ltek-row.stack {
        flex-direction: column;
        align-items: stretch;
      }
      /* HA's own pickers: no fill, no underline, a border like the other controls */
      ha-selector {
        display: block;
        --mdc-text-field-fill-color: transparent;
        --input-fill-color: transparent;
        --mdc-text-field-idle-line-color: transparent;
        --mdc-text-field-hover-line-color: transparent;
        --input-idle-line-color: transparent;
        --input-hover-line-color: transparent;
        --mdc-ripple-color: transparent;
        border: 1px solid var(--ltek-c-border);
        border-radius: var(--ltek-r-ctrl);
        overflow: hidden;
      }
      .ltek-row.stack > ha-selector {
        border: none;
        overflow: visible;
      }
      label.check {
        display: inline-flex;
        align-items: center;
        gap: var(--ltek-sp-2);
        color: var(--ltek-c-label);
        font-size: var(--ltek-fs-label);
        padding: var(--ltek-sp-1) 0;
      }
      label.check input {
        accent-color: var(--ltek-c-accent);
      }
      .help {
        margin: 0 0 var(--ltek-sp-2);
      }
    `];customElements.get("ltek-form")||customElements.define("ltek-form",L);var O=class extends g{constructor(){super(...arguments);this._loading=!1}setConfig(e){this._config=e}updated(){this.hass&&this._rooms===void 0&&!this._loading&&(this._loading=!0,this.hass.callWS({type:"easy_av_control/control/rooms"}).then(e=>this._rooms=e).catch(()=>this._rooms=[]).finally(()=>this._loading=!1))}_schema(){let e=(this._rooms??[]).map(n=>n.room);return[{name:"room",required:!0,selector:{select:{mode:"dropdown",options:(this._rooms??[]).map(n=>({value:e.filter(s=>s===n.room).length>1?`${n.entry_id}/${n.room}`:n.room,label:n.name}))}}},{name:"name",selector:{text:{}}},{name:"show_flow",selector:{boolean:{}}},{name:"flow_details",selector:{boolean:{}}}]}render(){if(!this.hass||!this._config)return u;let e={show_flow:!0,...this._config,room:this._config.entry_id?`${this._config.entry_id}/${this._config.room}`:this._config.room},t=(this._rooms??[]).some(s=>s.room===this._config.room);this._rooms&&!t&&this._config.room&&(e.room=this._config.room);let n=s=>C(this.hass?.language,s);return a`<details class="ltek-sec" open>
        <summary>
          <ha-icon icon="mdi:remote-tv"></ha-icon>${n("editor.section")}
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="ltek-body">
          <p class="ltek-hint">${n("editor.hint")}</p>
          <ltek-form
            .hass=${this.hass}
            .data=${e}
            .schema=${this._schema()}
            .computeLabel=${s=>n(`editor.${s.name}`)}
            @value-changed=${this._valueChanged}
          ></ltek-form>
        </div>
      </details>
      <div class="ltek-links">
        <a class="ltek-star" href=${be} target="_blank" rel="noopener">${n("editor.star")}</a>
        <a class="ltek-issue" href="${be}/issues" target="_blank" rel="noopener">${n("editor.report")}</a>
      </div>`}_valueChanged(e){e.stopPropagation();let t={...e.detail.value},n={...this._config,...t},s=String(t.room??"");if(s.includes("/")){let[o,l]=s.split("/",2);n.entry_id=o,n.room=l}else delete n.entry_id;n.name||delete n.name,n.show_flow!==!1&&delete n.show_flow,n.flow_details||delete n.flow_details,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:n},bubbles:!0,composed:!0}))}};O.properties={hass:{attribute:!1},_config:{state:!0},_rooms:{state:!0}},O.styles=[P,D,v`
    :host {
      display: block;
    }
  `];customElements.get("easy-av-control-card-editor")||customElements.define("easy-av-control-card-editor",O);var Fe={en:{"pf.form":"Form","pf.form_hint":"Every part of the profile, picked on a real device of its integration. Entities are stored the way any Home Assistant finds them (type and translation key), never by their entity ID.","pf.general":"General","pf.general_hint":"What the profile is for, and where its devices go in an activity's power-on order.","pf.name":"Name","pf.id":"ID","pf.integration":"Integration","pf.example":"Example device","pf.no_example":"No device of this integration here: entities can't be picked, only typed in YAML.","pf.device_entity":"Device entity","pf.order":"Power-on order","pf.status":"Status","pf.status_hint":"Which entity says the device is on, and what each of its values means. Tap a value it shows to add it, or type one.","pf.status_entity":"Status entity","pf.status_own":"None picked: the device entity's own state is the status.","pf.status_other":"This entity's state (or attribute) is the status.","pf.attribute":"Attribute","pf.attribute_none":"Its state","pf.now":"Now: {value}","pf.available_is_on":"On while this entity is available (it's unavailable while the device is off)","pf.group.starting":"Starting","pf.group.on":"On","pf.group.stopping":"Stopping","pf.group.off":"Off","pf.group.error":"Error","pf.other_value":"Other value \u2026","pf.timing":"Timing","pf.timing_hint":"How long to wait for on and off before the device's failure setting applies, and how long a state must hold.","pf.timeout_on":"Timeout, turning on","pf.timeout_off":"Timeout, turning off","pf.debounce":"Debounce","pf.reset":"Back to the default","pf.companions":"Remote, outlet and settings","pf.companions_hint":"Filled in on every device that uses this profile.","pf.remote":"Remote (arrow keys)","pf.power_switch":"Power outlet switch","pf.settings":"Settings in the card","pf.settings_hint":"Offered in the remote card while an activity runs.","pf.picture":"Picture check","pf.picture_hint":"A device that can tell whether a picture arrives (Lumagen Active Video, JVC Source Display): Detect integrations adds a picture check for it to the activity's Checks.","pf.picture_on":"This device has a picture check","pf.picture_entity":"Entity","pf.picture_ok":"Picture","pf.picture_fail":"No picture","pf.picture_timeout":"Timeout","pf.jobs":"Jobs","pf.jobs_hint":"For a device several integrations cover (a TV with PiPup, ADB and Android TV Remote): the jobs this one does. Lower numbers win.","pf.none":"None","pf.not_on_device":"not on this device",detect_used_integration:"Used for this device's state",detect_open_profile:"Open this profile",detect_no_area:"No area",detect_select_all:"Select all",timing_on:"Comes on in about {typical} ({count} measured, slowest {slowest})",timing_off:"Goes off in about {typical} ({count} measured, slowest {slowest})",timing_use:"Use measured timeouts",timing_use_hint:"Sets the status timeouts to what the measured times suggest: half as long again as usual, and longer than the slowest seen.","flow.typical":"usually {seconds}",setup:"Setup","flow.picture":"{step}. Wait until {entity} shows {states}, at most {timeout}","field.on_failure_picture":"If there's no picture",detect:"Detect integrations",detect_intro:"Compares what's installed in Home Assistant with what the rooms use. Tick what to change, then Apply: the changes appear as unsaved, and nothing is stored until you press Save.",detect_running:"Looking at your integrations \u2026",detect_nothing:"Nothing to change: every AV device with a profile is in a room, and every entity the rooms use exists.",detect_new:"Detected devices",detect_new_hint:"Devices no room uses yet, by their Home Assistant area. Tick the ones to add: they go into the activities you tick, at the place their profile gives in the power-on order (early, middle, late), with their status, remote and outlet filled in. The profile chip opens its profile; the blue integration chip is the one used for the device's state.",detect_room:"Room",detect_new_room:"New room: {name}",detect_activities:"Add to",detect_no_activities:"This room has no activities yet.",detect_starter:"Create a new Activity per Room using the selected Devices",detect_picture:"with a picture check",detect_better:"Better integrations",detect_better_hint:"A device a room uses that another integration now covers better (it reports faster or says more). Not ticked: tick to switch.",detect_better_row:"{from} \u2192 {to}",detect_gone:"Missing entities",detect_gone_hint:"Entities a room uses that no longer exist, for example after removing an integration. Where the same device is still covered by another integration, it is offered as the replacement.",detect_replace_with:"Replace with {entity} ({integration})",detect_no_replacement:"Nothing replaces it; fix it by hand. A device without a status uses its fixed times.",detect_renamed:"Renamed entities",detect_renamed_hint:"The same entity under a new ID. It's replaced everywhere except in actions and commands: check those.",detect_unmatched:"Integrations without a profile",detect_unmatched_hint:"Their devices work with fixed times. Create a profile so Easy AV Control can wait for their own states.",detect_create_profile:"+ Profile",detect_apply:"Apply",detect_applied:"Applied. Review the rooms, then press Save.",detect_again:"Detect again",profile_new:"+ Profile",profile_new_pick:"Integration",profile_new_hint:"Integrations here with a media player or remote and no profile. The draft starts from the first device of the one you pick.",profile_new_none:"Every integration with a media player or remote has a profile.",learn:"Learn",learn_hint:"Turn the device on, then off, here: Easy AV Control records what {entity} shows and fills in which states mean starting, on, stopping and off.",learn_on:"Turn on now",learn_off:"Turn off now",learn_seen_on:"Turning on: {states}",learn_seen_off:"Turning off: {states}",learn_use:"Use what was seen",learn_nothing:"Nothing recorded yet.","flow.status_on":"Wait until {device} says it's on ({entity}), at most {timeout}","flow.status_off":"Wait until {device} says it's off ({entity}), at most {timeout}","flow.outlets_off_status":"Turn off the outlet once its devices say they're off: {outlets}","flow.debounce":"state must hold {seconds}",profiles:"Profiles",profiles_intro:"A profile tells Easy AV Control what an integration's entities say about a device: which entity shows that it's on, what its states mean, its remote, outlet and settings. Built-in ones are locked: duplicate one to change it.",profiles_builtin:"Built in",profiles_yours:"Yours",profiles_none_yours:"None yet. Duplicate a built-in profile, or import one.",profile_generic:"for any media player without its own profile",profile_untested:"From the integration's code, not tested on a device",profile_used_by:"Used by {where}",profile_unused:"Not used by a device",profile_preview:"Show the summary",profile_view:"View",profile_edit:"Edit",profile_duplicate:"Duplicate",profile_delete_confirm:'Delete your profile "{name}"? Devices that use it go back to the built-in one.',profile_readonly:"Built in: read only. Duplicate it to make your own version.",profile_editor_hint:"The profile as YAML. Entities are found on the device by domain and translation_key, never by entity ID, so the profile works on any Home Assistant.",profile_save:"Save profile",profile_close:"Close",profile_cancel:"Cancel",profile_saved:"Profile saved.",profile_export:"Export",profile_export_all:"Export yours",profile_import:"Import",profile_import_hint:"Paste an Easy AV Control profile export. Profiles you already have are never replaced: one with a taken ID is added under a new one.",profile_import_done:"Added: {added}",profile_import_renamed:"{from} added as {to}",profile_import_invalid:"Not valid, skipped: {ids}",profile_copy:"Copy to clipboard",profile_copied:"Copied \u2713",profile_copy_failed:"Press Ctrl/Cmd+C",profile_paste:"Paste from clipboard",profile_paste_failed:"Paste with Ctrl/Cmd+V",profile_share:"Share a profile",profile_share_hint:"Made one for a device others have too? Export it and send the text with Report an issue (at the bottom of the menu): accepted profiles ship as built-in ones.",sum_indicator:"On / off from {what}",sum_indicator_device:"the device's own state",sum_indicator_available:"{what} being available",sum_states:"{groups}",sum_remote:"Remote",sum_outlet:"Outlet",sum_settings:"Settings",sum_picture:"Picture check",sum_order:"Power-on order: {order}",sum_roles:"Jobs: {roles}","order.early":"early","order.middle":"middle","order.late":"late","role.power":"power","role.navigation":"arrow keys","role.now_playing":"now playing","role.turn_off":"turn off",section_state:"Device state",hint_state:"How Easy AV Control knows this device is on or off. With a status, it waits for the device itself instead of fixed times.",detected:"Detected: {name}",detected_none:"No profile for this device's integration: it uses the fixed times below.",detected_uses:"Uses",detected_now:"Now: {value}",detected_found_indicator:"Status from {entity}",detected_found_attribute:"attribute {attribute}",detected_found_remote:"Remote: {entity}",detected_found_outlet:"Outlet: {entity}",detected_found_settings:"Settings: {entities}",detected_use:"Use these",detected_applied:"In use",detected_siblings:"Also covered by: {integrations}",detected_role:"{role}: {integration}",state_source:"Status","state_source.auto":"Automatic (from the profile)","state_source.none":"None: fixed times only","field.profile":"Profile","profile.auto":"Automatic (for its integration)","field.wait_on":"When turning on, wait for","field.wait_off":"Before cutting the outlet, wait for","wait.status":"Its status","wait.time":"A fixed time","wait.both":"Its status, then a fixed time","field.timeout_on":"Status timeout, turning on","field.timeout_off":"Status timeout, turning off","field.debounce":"Debounce","helper.debounce":"Seconds a state must hold before it counts, so a flicker doesn't.","field.on_failure_on":"If it doesn't come on","field.on_failure_off":"If it doesn't go off","failure.warn":"Warn and continue","failure.stop":"Stop the activity","failure.retry":"Try once more, then warn","failure_off.stop":"Leave its outlet on",state_fixed_only:"No status for this device: only the fixed times below apply.",footer_version:"Easy AV Control (Ltek) {version}",star:"\u2B50 Star on GitHub",report:"\u{1F41B} Report an issue",title:"Easy AV Control",rooms:"Rooms",add_room:"Add room",guide:"Guide",act_startup:"Startup",act_shutdown:"Shutdown",act_hold:"Hold for 3 seconds to start this activity",act_saved_only:"Runs the activity as saved; save first to use your changes.",reports:"Reports","rep.title":"Reports","qs.title":"Quick Start","qs.hint":"What is set up, and the steps left, for the whole system and for each activity. Apply does the automatic ones; the others say what to do and open the page for it. Come back any time.","qs.your_setup":"Your setup","qs.tab_system":"System","qs.tab_activity":"Activities","qs.system_hint":"Needed once, for every activity: the room, its devices, nothing else switching them, notifications, the card.","qs.activity_hint":"Needed by each activity on its own: its devices, a startup that worked, checks, who starts it.","qs.no_activity":"No activity yet: Activities tab \u2192 + Activity, then its Flow.","qs.astep.devices":"Its devices","qs.astep.tested":"A startup that worked","qs.astep.checks":"Checks: does it work once it's on","qs.astep.started_by":"The Harmony remote starts the activity","qs.astep.auto_off":"Auto-off when nothing plays","qs.all_done":"All done","qs.n_done":"{done} of {total} done","qs.apply":"Apply {n} step(s)","qs.applied":"All automatic steps done","qs.apply_hint":"Apply only adds what is missing; it changes nothing that exists.","qs.open":"open","qs.show_sidebar":"show it","qs.card_on":"on {boards}","qs.card_add":"not on a dashboard yet: Edit dashboard \u2192 Add card \u2192 Easy AV Control, or paste:","qs.s_rooms":"{n} room(s)","qs.s_devices":"{n} device(s)","qs.s_activities":"{n} activities","qs.s_activities_off":"{n} activities, {off} disabled","qs.s_runs":"{n} run(s)","qs.s_alerts":"{n} alert(s)","qs.step.rooms":"A room","qs.step.detect":"Your AV devices","qs.step.status":"Easy AV Control can read each device's status","qs.step.activity":"An activity with its devices","qs.step.competing":"No other automation switches the AV devices","qs.step.tested":"A startup that worked","qs.step.checks":"Checks: does it work once it's on","qs.step.started_by":"The Harmony remote starts the activity","qs.step.auto_off":"Auto-off when nothing plays","qs.step.blueprint":"Notifications blueprint","qs.step.notifications":"Notifications for Watchdog and Monitoring","qs.step.card":"The remote control card on a dashboard","qs.step.sidebar":"Editor in the sidebar","rep.entities":"Entities","rep.entities_hint":"Per room: the entities Easy AV Control makes, and the ones it relies on, with what each is for and its state now.","rep.ent_created":"Made by Easy AV Control","rep.ent_used":"Relied on","rep.ent_missing":"missing","rep.ent.switch":"On while an activity runs, starts or failed; on starts the default activity, off shuts down","rep.ent.sensor":"The room's state: idle, starting, active, stopping or error (for automations)","rep.ent.select":"Which activity runs; choosing one starts it","rep.ent.scene":"Starts {activity}","rep.ent.problem":"{problem}: on while the problem lasts (notifications follow it)","rep.use.device":"Turned on and off as","rep.use.outlet":"Outlet for","rep.use.remote":"Remote buttons for","rep.use.ready":"Connection check for","rep.use.status":"Status (on / off) of","rep.use.picture":"Picture check of","rep.use.check":"Checked in","rep.use.started_by":"Starts",watchdog:"Watchdog",tab_watchdog:"Watchdog",watchdog_hint:"The room outside its activities: a device that is on while nothing uses it, or reports an error. Each turns on a sensor of the room, which a notification can follow.","problem.on_unexpectedly":"Device on unexpectedly","problem.device_error":"Device error","problem.device_lost":"Device lost","problem.picture_lost":"Picture lost","problem.left_on":"Left on",watchdog_ok:"Nothing wrong",watchdog_save_first:"The sensors appear once the room is saved.",watchdog_devices:"Devices",watchdog_devices_hint:"What happens when a device is on while the room is idle, or the running activity doesn't use it.",watchdog_no_status:"Easy AV Control can't read this device's status (no profile), so it can't be watched.",watchdog_error:"A device that reports an error is always reported.",watchdog_notify:"Notifications for these",check_keep:"Keep checking while active (Monitoring: Picture lost)","action.turn_off":"Turn off","action.turn_on":"Turn on","action.keep_on":"Keep on","action.shutdown":"Shut down","action.dismiss":"Dismiss","ntf.scope_watchdog":"Watchdog","ntf.scope_monitoring":"Monitoring","ntf.title":"Notifications","ntf.hint":"One ready-made alert per room and monitor problem, made from the Smart Repeating Alerts blueprint: a normal Home Assistant automation with its own editor and traces. It notifies when the problem's sensor turns on and clears itself when it turns off. Its buttons only tell Easy AV Control what to do; the integration does it.","ntf.blueprint":"Blueprint","ntf.bp_installed":"Smart Repeating Alerts {version}","ntf.bp_foreign":"blueprints/automation/LTek/smart-repeating-alerts-ltek.yaml is another file ({version}); it is left as it is","ntf.bp_missing":"Not installed yet: it is installed with the first alert.","ntf.bp_install":"Install {version}","ntf.bp_update":"Update to {version}","ntf.phones":"Send to","ntf.no_phones":"No phone with the Home Assistant app yet.","ntf.pick_phone":"Pick at least one phone","ntf.create":"Create","ntf.edit":"Edit","ntf.on":"On","ntf.off":"Off","rep.hint":"How long each start and stop took, and how long each device took to come on and go off. Times are measured while Easy AV Control switches; the last 300 runs and 100 times per device are kept.","rep.refresh":"Refresh","rep.clear":"Clear","rep.clear_confirm":"Delete the whole history? The typical times used for timeouts stay.","rep.runs":"Runs","rep.devices":"Devices","rep.devices_hint":"From the turn-on (or turn-off) command until the device says it is on (off), for devices with a status. Only when Easy AV Control switched the device.","rep.no_runs":"No runs yet: start an activity.","rep.no_devices":"No device times yet. They are measured for devices with a status, when an activity switches them.","rep.show":"Show","rep.mode_all":"Startups and shutdowns","rep.mode_start":"Startup","rep.mode_stop":"Shutdown","rep.export":"Export","rep.export_run":"Export this run with its trace","rep.copied":"Copied to the clipboard","rep.export_hint":"The report is a JSON file: the runs, each with its trace (what Easy AV Control did, every service call and every state change of the room's entities), the device times, the rooms as configured and the versions.","rep.from":"from {activity}","rep.typical":"typical","rep.count":"{n} runs","rep.count_times":"{n} times","rep.failed":"{n} failed","rep.result_ok":"OK","rep.result_warning":"Warnings","rep.result_error":"Failed","rep.result_cancelled":"Cancelled","rep.phase_switch_off_unused":"Turn off what's not needed","rep.phase_outlets_on":"Outlets on","rep.phase_outlets_off":"Outlets off","rep.phase_checks":"Checks","rep.phase_steps":"Actions after start","rep.phase_hooks":"Actions on start / stop","rep.dir_on":"Turn on","rep.dir_off":"Turn off","rep.dir":"","rep.when":"When","rep.time":"Time","rep.result":"Result","rep.for":"Room \xB7 activity","rep.slow":"Slow",sidebar_chip:"Editor in Sidebar",sidebar_hint:"Show Easy AV Control in Home Assistant's sidebar. Hidden, it stays at /easy-av-control and under Settings \u2192 Devices & services \u2192 Easy AV Control \u2192 Configure.",no_rooms:"No rooms yet.",room_name:"Name",room_area:"Area",room_default_activity:"Default activity",default_last:"Last used","helper.default_activity":"What the room's on/off switch and toggle_activity start, e.g. from a wall button.",room_id_hint:"ID {id}",delete_room:"Delete room",delete_room_confirm:'Delete room "{name}" with all devices and activities?',tab_devices:"Devices",tab_activities:"Activities",tab_yaml:"YAML",add_device:"Add device",add_activity:"Add activity",delete:"Delete",move_up:"Move up",move_down:"Move down",device_id:"Device ID",device_in_use:'Device "{id}" is used by: {where}. Remove it there first.',activity_id_hint:"ID {id} \u2013 part of the entity IDs, cannot be changed",new_activity:"New activity",add_device_to_activity:"Add device \u2026",steps:"Actions after start",section_checks:"Checks",hint_checks:"What must be right before the activity counts as running, e.g. a picture on the Lumagen and on the projector. They run at the same time, once every device is on, and again when you switch to this activity from another.",add_check:"Check",check_profile:"Picture check of its profile",check_entity:"An entity of your own",check_what:"What",check_entity_label:"Entity",check_states:"Right when it shows",check_states_placeholder:"e.g. on, Active Video",check_timeout:"Timeout",check_failure:"If it isn't right",check_warn:"Warn and go on",check_stop:"Stop the activity",check_none:"No checks: the activity counts as running once its devices are on.",check_unless_text:"Waits until {entity} no longer shows {states}.",add_step:"Add step \u2026",hooks:"Actions on start and stop",remote:"Remote control",quick_select:"Quick select",quick_select_hint:"Buttons that switch a media player to a source; on an Apple TV the sources are its apps.",quick_select_no_player:"Add a media player to this activity first.",add_quick_select:"Add quick select",card_settings:"Settings in the card",card_settings_hint:"Source, sound mode and other settings of the devices, changeable in the card while the activity runs: those set on the devices, or a choice for this activity only. The section is closed until it is opened; each browser remembers that.","setting.entity":"Entity of the device","field.entity":"Entity","helper.entity":"A number (slider), select (list) or switch (on/off key), e.g. the receiver's bass.","field.settings_mode":"Show",settings_auto:"From the devices",settings_chosen:"Chosen here, with favourites",settings_auto_shows:"The card shows: {list}.",settings_auto_none:"The devices of this activity offer no settings yet. Choose them on a device, or start the activity once so its media players report their lists.",device_settings_hint:"What the card offers of this device, in every activity that uses it. Automatic: source and sound mode of a media player, and the number and select entities of the same device.",device_settings_auto:"Automatic",device_settings_auto_none:"Nothing found yet: no source or sound mode list reported, and no number or select entities of the same device.",device_settings_none:"The card shows no settings of this device.",settings_none:"The card shows no settings for this activity.",add_setting:"Add setting","field.setting":"Setting","field.options":"Favourites (optional)","helper.options":"Only these in the card, in this order; empty: the device's whole list.",commands:"Own commands",save:"Save",discard:"Discard",saving:"Saving \u2026",saved:"Saved",unsaved:"Unsaved changes",reload:"Reload",reload_confirm:"Discard your unsaved changes and load the saved configuration?",retry:"Try again",save_anyway:"Save anyway",conflict:"The configuration was changed elsewhere. Reload it \u2013 your unsaved changes here are lost.",invalid:"Not saved \u2013 {path}: {message}",missing:"These entities do not exist in Home Assistant:",missing_hint:"A device without power usually stays known. Most likely a typo or a renamed entity.",loading:"Loading \u2026",load_error:"Could not load the configuration: {error}",route_auto:"Automatic",route_none:"Hide",devices_intro:"Every device of the room that Easy AV Control switches or controls: TV, projector, receiver, player.",devices_empty:"No devices yet.",new_device:"New device",no_entity:"No entity chosen",entity_missing:"Entity not found in Home Assistant",used_by:"Used by: {where}",section_device:"Device",hint_device:"The Home Assistant entity of the device, usually a media player.",section_power:"Power Outlet",hint_power:"The outlet that powers the device: switched on before the device and off after it. Untick when the device isn't on a switched outlet.",power_use:"Switch this device's power outlet",section_delays:"Waiting times",hint_delays:"How long Easy AV Control waits for this device.",section_ready:"Connection check",hint_ready:"Waits until the device is reachable in Home Assistant, before switching it on and before remote buttons. For devices that lose their connection without power, such as an Apple TV.",ready_preset:"Use {entity} for the connection check and the arrow keys (recommended for Apple TV)",section_advanced:"Advanced",hint_device_advanced:"The device ID is used in the YAML configuration. Own commands map a button name to Home Assistant actions, e.g. arrow keys for a receiver box.",activities_intro:'An activity combines devices for one use, e.g. "Apple TV" = TV and Apple TV. Starting it switches on what it needs and off what it does not.',activities_empty:"No activities yet.",no_devices:"No devices",needs_devices:"Add the devices of this room first.",section_general:"General",hint_general:"Name and icon appear in the card. Position sorts the activities.",section_activity_devices:"Devices",hint_activity_devices:"Switched on in this order.",hint_steps:"Extra actions, in this order, once every device is on and the checks passed: e.g. switch the TV to its HDMI input, set the sound mode or the volume, dim the lights.",hint_remote:"Which device gets which buttons of the card. Automatic suits most setups.",hint_activity_advanced:"Commands in YAML, and Home Assistant actions on start and stop.",card_divider:"Remote control card",card_extra:"Extra buttons",hint_card_extra:"Buttons beyond the standard ones, as a YAML list.",card_shows:"The card shows",or:"or",other_integration:"Other",add_device_short:"Device",nav_flow:"Open the flow",step_picture_checks:"Waits until {entity} shows {states}.",step_picture_none:"{device} has no picture check, so this step waits for nothing.",yaml_intro:"The whole room as YAML. Changes here and in the forms are the same configuration.",add_room_name:"Name of the new room",create:"Add",cancel:"Cancel","helper.power_switch":"Shared outlets stay on while any device on them is needed.","helper.delay_after_power":"How long the device needs after the outlet came on. Only waited when the outlet was off.","helper.delay_after_on":"Until the device accepts commands. Only when it was switched on.","helper.delay_after_off":"Cool-down before the next device or the outlet is switched off, e.g. 180 s for a projector.","helper.ready_entity":"E.g. the remote of an Apple TV, which is on only while it is connected.","helper.ready_reload":"Skips the waiting time of an integration that retries its connection.","helper.source":"The list shows what the device reported last, so it must have been on once. A name can also be typed in.","field.entity_id":"Entity","field.name":"Display name","field.power_switch":"Power outlet","field.remote_entity":"Remote (optional)","helper.remote_entity":"Arrow keys, OK, back, home and menu of the card go to this remote entity, e.g. the remote of an Apple TV.","field.delay_after_power":"Boot time (s)","field.delay_after_on":"Wait after switching on (s)","field.delay_after_off":"Wait after switching off (s)","field.ready_enabled":"Wait until available before switching on","field.ready_entity":"Check this entity instead (optional)","field.ready_state":"Wait for state (optional, e.g. on)","field.ready_timeout":"Timeout (s)","field.ready_reload":"Reload its integration","field.ready_on_timeout":"On timeout","field.commands":"Own commands (YAML: name \u2192 actions)","field.icon":"Icon","field.order":"Position","field.on_start":"On start","field.on_stop":"On stop","field.volume":"Volume","field.channels":"Channels","field.transport":"Playback","field.navigation":"Navigation","field.touchpad":"Touch surface","helper.touchpad":"A swipe area instead of the arrow keys in the card. Automatic: for navigation that goes to a remote entity, e.g. an Apple TV.",touchpad_auto:"Automatic",touchpad_on:"On",touchpad_off:"Off (arrow keys)","field.buttons":"Extra buttons (YAML list)","field.label":"Label (optional, default: the source)","field.activity_commands":"Commands of this activity (YAML: name \u2192 actions)","field.type":"Type","field.device":"Device","field.source":"Source","field.volume_level":"Volume","field.sound_mode":"Sound mode","field.brightness_pct":"Brightness (%)","field.color_temp_kelvin":"Color temperature (K)","field.transition":"Transition (s)","field.position":"Position (%)","field.tilt_position":"Tilt (%)","field.action":"Action (e.g. script.turn_on)","field.data":"Data","field.target":"Target","field.timeout":"Timeout (s)","field.reload_integration":"Reload its integration","field.on_timeout":"On timeout","field.delay_after":"Wait afterwards (s)",on_timeout_abort:"Abort the start",on_timeout_continue:"Continue","step.power_on":"Switch on","step.power_off":"Switch off","step.set_source":"Set source","step.set_volume":"Set volume","step.set_sound_mode":"Set sound mode","step.set_brightness":"Set brightness","step.set_color_temp":"Set color temperature","step.set_position":"Set cover position","step.set_tilt":"Set cover tilt","step.call_action":"Call action","step.delay":"Wait","step.wait_available":"Wait until available",section_remote_preview:"Remote control preview",hint_remote_preview:"The card as it looks while this activity runs, with the settings above, also before saving. Tap a button to see where it goes; nothing is sent.","preview.tap":"Tap a button to see which device gets it and what runs there.","preview.this_activity":"this activity","preview.device_commands":"own command of the device: {actions}","preview.activity_commands":"own command of the activity: {actions}","preview.unknown":"does nothing: no device of this activity handles it","preview.unknown_on_device":"does nothing: {device} cannot handle it","preview.ready":"Checks the connection first and restores it if needed.","preview.dead":"These buttons are shown but do nothing:","preview.groups":"Button groups","preview.mode_auto":"automatic","preview.mode_set":"chosen","preview.hidden":"hidden","preview.no_device":"no suitable device, not shown","preview.no_keys":"not shown: {device} has none of these buttons",section_flow:"Flow: what is switched when",hint_flow:"Computed from the settings of this activity and its devices, also before saving. Times count only the configured waits; how long the devices take to respond comes on top.","flow.mode_start":"Startup","flow.mode_stop":"Shutdown","flow.from_label":"Starting from","flow.from_idle":"from idle (everything off)","flow.from":"switching from {activity}","flow.failed":"Could not compute the flow: {error}","flow.invalid":"No flow while the configuration has an error \u2013 {error}","flow.state_starting":"Room: starting","flow.state_active":"Room: active","flow.state_stopping":"Room: stopping","flow.state_idle":"Room: off","flow.outlets_on":"Turn on the outlets, all at once: {outlets}","flow.outlets_off":"Turn off the outlets: {outlets}","flow.outlets_off_later":"Turn off the outlet after its cool-down: {outlets}","flow.outlet_keep":"{outlet} stays on, this activity needs it","flow.outlets_already_on":"already on: {outlets}","flow.unless_rooms":"not while {rooms} uses it","flow.on_start":"Actions on start begin","flow.on_start_wait":"Wait until the actions on start are done","flow.on_stop":"Actions on stop begin","flow.on_stop_wait":"Wait until the actions on stop are done","flow.parallel":"runs alongside","flow.already_on":"Already on in {activity}: no switching, no waiting","flow.boot":"Boot time: until {seconds} after the outlets came on","flow.reload":"Reload the integration of {entity}","flow.ready":"Wait until {entity} is available, at most {timeout}","flow.ready_state":"Wait until {entity} is {states}, at most {timeout}","flow.on_timeout_abort":"\u2013 otherwise the start is aborted","flow.on_timeout_continue":"\u2013 otherwise it goes on anyway","flow.turn_on":"Turn on {device}","flow.turn_off":"Turn off {device}","flow.turn_off_unused":"Turn off {device}, this activity does not use it","flow.cannot_switch":"{device} cannot be switched on or off, nothing is sent","flow.wait_on":"Wait {seconds} until the device is ready","flow.wait":"Wait {seconds}","flow.mode_monitor":"Monitoring","flow.summary_monitor":"Monitoring checks this every few seconds while the activity is active; the room's Watchdog has its own page. Each problem turns on its sensor (binary_sensor.av_<room>_\u2026), which a notification can follow; its buttons tell Easy AV Control what to do.","flow.monitor_lost":"Notify when a device of this activity is off or unreachable for {seconds}","flow.monitor_picture":"Checks keep running: notify when one fails for {seconds}","flow.monitor_idle":"Auto-off: when nothing has played for {idle}, notify, then shut down {warning} later","flow.monitor_error":"Notify when a device reports an error, at any time","flow.monitor_watch":"{device}: notify when it is on and nothing uses it, after {grace}","flow.monitor_watch_off":"{device}: notify when it is on and nothing uses it, after {grace}; turn it off {after} later","flow.add_monitor_hint":"Add to the monitor:","flow.add_monitor_lost":"Device lost","flow.add_monitor_picture":"Keep checking","flow.add_monitor_idle":"Auto-off",section_monitor:"Watchdog",hint_monitor:`When this device is on while the room is idle, or the running activity doesn't use it: notify (its room's "Device on unexpectedly" sensor turns on), and optionally turn it off.`,monitor_hint:"While this activity is active. 0 turns one off.","field.watch_mode":"When it is on unexpectedly","watch.off":"Don't watch","watch.notify":"Notify","watch.turn_off":"Notify, then turn it off","field.watch_grace":"After","field.watch_turn_off_after":"Turn off after","field.lost_after":"Device lost after","field.picture_lost_after":"Picture lost after","field.idle_after_min":"Auto-off when nothing plays for (min)","field.idle_warning_min":"Shut down after the notification (min)","flow.started_by":"Also starts when {entity} changes to {states}","flow.stopped_by":"Also shuts down when {entity} changes to {states}","flow.add_started_by":"Started by",started_by:"Started by",started_by_hint:"Start this activity when an entity changes to a state, e.g. the Harmony remote's activity button or a wall switch, and optionally shut it down on another state. Changes that come from this activity's own startup or shutdown are ignored, and so are reconnects.","field.started_by_entity":"Entity","field.started_by_state":"Starts on","field.started_by_stop":"Shuts down on (optional)","flow.delay":"Wait {seconds} before turning it on","flow.wait_for":"Wait until {what}, at most {timeout}","flow.wait_for_on":"{device} is on","flow.wait_for_picture":"{device} shows a picture","flow.and":" and ","flow.turn_off_later":"Turn off {device} {seconds} after the shutdown","flow.option":"selects {option}","flow.delete":"Remove","flow.group.on":"on","flow.group.off":"off","flow.group.starting":"starting","flow.group.stopping":"stopping","flow.group.error":"error","flow.add_device":"Device","flow.device_actions":"What happens to {device} in this activity","flow.device_identity":"What the device is (its entity, remote, outlet, status) is set on its own page, for every activity.",duplicate:"Duplicate",act_export:"Export",act_enabled:"Enabled",act_disabled:"Disabled",act_enabled_hint:"A disabled activity can't be started: the card, its scene and select, Started by and the default activity leave it out. Saved with Save.",act_export_all:"Export all",act_import:"Import",act_download:"Download",act_export_hint:"The activity with every device it uses. Import it in another room or another Home Assistant; devices with the same entity there are used, the others are added.",act_import_hint:`Paste an export, or choose its file. Import replaces an activity of the same name, and every device with the same entity, completely with the file's; the rest is added. Import as a copy adds the activity beside the old one as "Name 2". Nothing is stored until Save.`,act_import_copy:"Import as a copy",act_import_replaced:"Replaced: {names}",act_import_devices_replaced:"devices replaced: {devices}",act_import_confirm:"The file replaces {devices}. These activities use them too and get their new settings: {activities}. Import?",act_import_done:"Added: {added}",act_import_devices:"devices added: {devices}",act_import_started_by:"Started by left out of {names}: another activity starts on the same entity",copy_suffix:"(copy)",move_earlier:"Earlier",move_later:"Later","flow.add_check":"Check","flow.add_step":"Action after start","flow.add_on_start":"Actions on start","flow.add_on_stop":"Actions on stop","flow.add_hint":"Add to the startup:","flow.add_stop_hint":"Add to the shutdown:","flow.edit_hint":"Click \u270E on a line to change it here, the trash icon removes it.","flow.close_edit":"Done","flow.device_shared":"These settings belong to the device: they apply to every activity that uses it.","flow.open_device":"Open the device page","flow.remove_device":"Remove from this activity","flow.before":"Before turning it on","flow.before_hint":"Wait a fixed time, and/or until other devices of this activity are on or show a picture.","flow.add_wait_for":"+ Wait for a device","flow.pick_device":"Add a device\u2026","flow.no_more_devices":"Every device of the room is in this activity. New devices are added on the Devices page.","field.before_delay":"Wait first","field.before_timeout":"At most","field.before_on_timeout":"If not in time","wait_for.on":"is on","wait_for.picture":"shows a picture","field.turn_off_after":"At shutdown, turn off after","helper.turn_off_after":"0: with the other devices. For seats or lights that stay on for a while; a new startup keeps it on.","field.option":"Activity to select","helper.option":"Startup selects it; without one, the first that isn't the off option.","field.off_option":"Shutdown selects","wait.none":"Nothing, go on at once","flow.steps":"Actions after start","flow.checks":"Checks, all at once","flow.edit":"Edit","flow.options":"Flow Details Filters","flow.options_hint":"What counts as a detail: hidden while Details is off, here and on the card.","flow.details_chip":"Details","flow.detail_entities":"Entity IDs and actions","flow.detail_waits":"Waits","flow.detail_notes":"Notes","flow.detail_reloads":"Reloads","flow.detail_outlets":"Outlets","flow.detail_hooks":"Actions on start and stop","flow.check":"{device}: wait until {entity} shows {states}, at most {timeout}","flow.check_unless":"{device}: wait until {entity} no longer shows {states}, at most {timeout}","flow.check_missing":"{device}: nothing to check, its profile has no picture check","flow.check_warn":"\u2013 otherwise a warning","flow.background":"In the background, after the room is done","flow.if.outlet_was_off":"only if its outlet was off","flow.if.if_off":"only if the device is off","flow.if.if_on":"only if the device is on","flow.reload_if_needed":"reloads its integration if not ready","flow.cooldown":"then {seconds} cool-down","flow.summary_start":"Active after {min} at the earliest, {max} at the latest if every readiness check takes its full timeout.","flow.summary_start_fixed":"Active after {min}.","flow.summary_stop":"Off as soon as the devices are switched off and the actions on stop are done.","flow.summary_stop_cut":"Off as soon as the devices are switched off and the actions on stop are done; the last outlet goes off after {seconds}."},de:{"pf.form":"Formular","pf.form_hint":"Jeder Teil des Profils, an einem echten Ger\xE4t seiner Integration gew\xE4hlt. Entit\xE4ten werden so gespeichert, wie jedes Home Assistant sie findet (Typ und \xDCbersetzungsschl\xFCssel), nie \xFCber ihre Entit\xE4ts-ID.","pf.general":"Allgemein","pf.general_hint":"Wof\xFCr das Profil ist und wo seine Ger\xE4te in der Einschaltreihenfolge einer Aktivit\xE4t stehen.","pf.name":"Name","pf.id":"ID","pf.integration":"Integration","pf.example":"Beispielger\xE4t","pf.no_example":"Kein Ger\xE4t dieser Integration vorhanden: Entit\xE4ten lassen sich nicht w\xE4hlen, nur in YAML eintragen.","pf.device_entity":"Ger\xE4te-Entit\xE4t","pf.order":"Einschaltreihenfolge","pf.status":"Status","pf.status_hint":"Welche Entit\xE4t sagt, dass das Ger\xE4t an ist, und was jeder ihrer Werte bedeutet. Einen angezeigten Wert antippen oder einen eintippen.","pf.status_entity":"Status-Entit\xE4t","pf.status_own":"Keine gew\xE4hlt: der Zustand der Ger\xE4te-Entit\xE4t selbst ist der Status.","pf.status_other":"Der Zustand (oder das Attribut) dieser Entit\xE4t ist der Status.","pf.attribute":"Attribut","pf.attribute_none":"Ihr Zustand","pf.now":"Jetzt: {value}","pf.available_is_on":"An, solange diese Entit\xE4t verf\xFCgbar ist (sie ist nicht verf\xFCgbar, w\xE4hrend das Ger\xE4t aus ist)","pf.group.starting":"Startet","pf.group.on":"An","pf.group.stopping":"Stoppt","pf.group.off":"Aus","pf.group.error":"Fehler","pf.other_value":"Anderer Wert \u2026","pf.timing":"Zeiten","pf.timing_hint":"Wie lange auf An und Aus gewartet wird, bevor die Fehler-Einstellung des Ger\xE4ts greift, und wie lange ein Zustand anhalten muss.","pf.timeout_on":"Zeitlimit beim Einschalten","pf.timeout_off":"Zeitlimit beim Ausschalten","pf.debounce":"Entprellen","pf.reset":"Zur\xFCck zum Standard","pf.companions":"Fernbedienung, Steckdose und Einstellungen","pf.companions_hint":"Wird bei jedem Ger\xE4t mit diesem Profil eingetragen.","pf.remote":"Fernbedienung (Pfeiltasten)","pf.power_switch":"Steckdosen-Schalter","pf.settings":"Einstellungen in der Karte","pf.settings_hint":"In der Fernbedienungskarte angeboten, w\xE4hrend eine Aktivit\xE4t l\xE4uft.","pf.picture":"Bildpr\xFCfung","pf.picture_hint":"Ein Ger\xE4t, das meldet, ob ein Bild ankommt (Lumagen Active Video, JVC Source Display): Integrationen erkennen f\xFCgt daf\xFCr eine Bildpr\xFCfung zu den Pr\xFCfungen der Aktivit\xE4t hinzu.","pf.picture_on":"Dieses Ger\xE4t hat eine Bildpr\xFCfung","pf.picture_entity":"Entit\xE4t","pf.picture_ok":"Bild","pf.picture_fail":"Kein Bild","pf.picture_timeout":"Zeitlimit","pf.jobs":"Aufgaben","pf.jobs_hint":"F\xFCr ein Ger\xE4t, das mehrere Integrationen abdecken (ein TV mit PiPup, ADB und Android TV Remote): die Aufgaben dieser. Kleinere Zahlen gewinnen.","pf.none":"Keine","pf.not_on_device":"nicht an diesem Ger\xE4t",detect_used_integration:"F\xFCr den Zustand dieses Ger\xE4ts genutzt",detect_open_profile:"Dieses Profil \xF6ffnen",detect_no_area:"Kein Bereich",detect_select_all:"Alle ausw\xE4hlen",timing_on:"Geht in etwa {typical} an ({count} gemessen, langsamste {slowest})",timing_off:"Geht in etwa {typical} aus ({count} gemessen, langsamste {slowest})",timing_use:"Gemessene Zeitlimits \xFCbernehmen",timing_use_hint:"Setzt die Status-Zeitlimits auf das, was die Messungen nahelegen: anderthalbmal so lang wie \xFCblich und l\xE4nger als die langsamste.","flow.typical":"meist {seconds}",setup:"Einrichtung","flow.picture":"{step}. Warten, bis {entity} {states} zeigt, h\xF6chstens {timeout}","field.on_failure_picture":"Wenn kein Bild kommt",detect:"Integrationen erkennen",detect_intro:"Vergleicht, was in Home Assistant installiert ist, mit dem, was die R\xE4ume nutzen. Ankreuzen, was sich \xE4ndern soll, dann \xDCbernehmen: die \xC4nderungen erscheinen als ungespeichert; gespeichert wird erst mit Speichern.",detect_running:"Integrationen werden angesehen \u2026",detect_nothing:"Nichts zu \xE4ndern: jedes AV-Ger\xE4t mit Profil ist in einem Raum, und jede Entit\xE4t der R\xE4ume existiert.",detect_new:"Erkannte Ger\xE4te",detect_new_hint:"Ger\xE4te, die noch kein Raum nutzt, nach ihrem Home-Assistant-Bereich. Die hinzuzuf\xFCgenden ankreuzen: sie kommen in die angekreuzten Aktivit\xE4ten, an die Stelle, die ihr Profil in der Einschaltreihenfolge vorgibt (fr\xFCh, Mitte, sp\xE4t), mit Status, Fernbedienung und Steckdose. Der Profil-Chip \xF6ffnet sein Profil; der blaue Integrations-Chip ist der f\xFCr den Zustand des Ger\xE4ts genutzte.",detect_room:"Raum",detect_new_room:"Neuer Raum: {name}",detect_activities:"Hinzuf\xFCgen zu",detect_no_activities:"Dieser Raum hat noch keine Aktivit\xE4ten.",detect_starter:"Pro Raum eine neue Aktivit\xE4t mit den ausgew\xE4hlten Ger\xE4ten anlegen",detect_picture:"mit Bildpr\xFCfung",detect_better:"Bessere Integrationen",detect_better_hint:"Ein Ger\xE4t eines Raums, das eine andere Integration jetzt besser abdeckt (schneller oder ausf\xFChrlicher). Nicht angekreuzt: zum Wechseln ankreuzen.",detect_better_row:"{from} \u2192 {to}",detect_gone:"Fehlende Entit\xE4ten",detect_gone_hint:"Entit\xE4ten eines Raums, die es nicht mehr gibt, z. B. nach dem Entfernen einer Integration. Wird dasselbe Ger\xE4t noch von einer anderen Integration abgedeckt, wird sie als Ersatz angeboten.",detect_replace_with:"Ersetzen durch {entity} ({integration})",detect_no_replacement:"Kein Ersatz; bitte von Hand anpassen. Ein Ger\xE4t ohne Status nutzt seine festen Zeiten.",detect_renamed:"Umbenannte Entit\xE4ten",detect_renamed_hint:"Dieselbe Entit\xE4t unter neuer ID. Sie wird \xFCberall ersetzt au\xDFer in Aktionen und Befehlen: diese pr\xFCfen.",detect_unmatched:"Integrationen ohne Profil",detect_unmatched_hint:"Ihre Ger\xE4te arbeiten mit festen Zeiten. Ein Profil anlegen, damit Easy AV Control auf ihre eigenen Zust\xE4nde warten kann.",detect_create_profile:"+ Profil",detect_apply:"\xDCbernehmen",detect_applied:"\xDCbernommen. R\xE4ume pr\xFCfen, dann Speichern.",detect_again:"Erneut erkennen",profile_new:"+ Profil",profile_new_pick:"Integration",profile_new_hint:"Integrationen mit Mediaplayer oder Fernbedienung ohne Profil. Der Entwurf startet vom ersten Ger\xE4t der gew\xE4hlten.",profile_new_none:"Jede Integration mit Mediaplayer oder Fernbedienung hat ein Profil.",learn:"Lernen",learn_hint:"Das Ger\xE4t hier ein- und wieder ausschalten: Easy AV Control zeichnet auf, was {entity} zeigt, und tr\xE4gt ein, welche Zust\xE4nde Starten, An, Stoppen und Aus bedeuten.",learn_on:"Jetzt einschalten",learn_off:"Jetzt ausschalten",learn_seen_on:"Beim Einschalten: {states}",learn_seen_off:"Beim Ausschalten: {states}",learn_use:"Gesehenes \xFCbernehmen",learn_nothing:"Noch nichts aufgezeichnet.","flow.status_on":"Warten, bis {device} meldet, dass es an ist ({entity}), h\xF6chstens {timeout}","flow.status_off":"Warten, bis {device} meldet, dass es aus ist ({entity}), h\xF6chstens {timeout}","flow.outlets_off_status":"Steckdose ausschalten, sobald ihre Ger\xE4te aus sind: {outlets}","flow.debounce":"der Zustand muss {seconds} anhalten",profiles:"Profile",profiles_intro:"Ein Profil sagt Easy AV Control, was die Entit\xE4ten einer Integration \xFCber ein Ger\xE4t verraten: welche Entit\xE4t zeigt, dass es an ist, was ihre Zust\xE4nde bedeuten, Fernbedienung, Steckdose und Einstellungen. Eingebaute sind gesperrt: zum \xC4ndern duplizieren.",profiles_builtin:"Eingebaut",profiles_yours:"Eigene",profiles_none_yours:"Noch keine. Ein eingebautes Profil duplizieren oder eines importieren.",profile_generic:"f\xFCr jeden Mediaplayer ohne eigenes Profil",profile_untested:"Aus dem Code der Integration, nicht an einem Ger\xE4t getestet",profile_used_by:"Genutzt von {where}",profile_unused:"Von keinem Ger\xE4t genutzt",profile_preview:"Zusammenfassung zeigen",profile_view:"Ansehen",profile_edit:"Bearbeiten",profile_duplicate:"Duplizieren",profile_delete_confirm:'Eigenes Profil "{name}" l\xF6schen? Ger\xE4te, die es nutzen, nehmen wieder das eingebaute.',profile_readonly:"Eingebaut: nur lesen. Zum \xC4ndern duplizieren.",profile_editor_hint:"Das Profil als YAML. Entit\xE4ten werden am Ger\xE4t \xFCber Domain und translation_key gefunden, nie \xFCber die Entit\xE4ts-ID; so passt das Profil zu jedem Home Assistant.",profile_save:"Profil speichern",profile_close:"Schlie\xDFen",profile_cancel:"Abbrechen",profile_saved:"Profil gespeichert.",profile_export:"Exportieren",profile_export_all:"Eigene exportieren",profile_import:"Importieren",profile_import_hint:"Einen Profil-Export von Easy AV Control einf\xFCgen. Vorhandene Profile werden nie ersetzt: eines mit vergebener ID kommt unter einer neuen dazu.",profile_import_done:"Hinzugef\xFCgt: {added}",profile_import_renamed:"{from} als {to} hinzugef\xFCgt",profile_import_invalid:"Ung\xFCltig, \xFCbersprungen: {ids}",profile_copy:"In die Zwischenablage",profile_copied:"Kopiert \u2713",profile_copy_failed:"Strg/Cmd+C dr\xFCcken",profile_paste:"Aus der Zwischenablage",profile_paste_failed:"Mit Strg/Cmd+V einf\xFCgen",profile_share:"Profil teilen",profile_share_hint:"Eines f\xFCr ein Ger\xE4t gebaut, das andere auch haben? Exportieren und den Text \xFCber Problem melden (unten im Men\xFC) schicken: angenommene Profile werden eingebaut.",sum_indicator:"An / aus \xFCber {what}",sum_indicator_device:"den Zustand des Ger\xE4ts",sum_indicator_available:"die Verf\xFCgbarkeit von {what}",sum_states:"{groups}",sum_remote:"Fernbedienung",sum_outlet:"Steckdose",sum_settings:"Einstellungen",sum_picture:"Bildpr\xFCfung",sum_order:"Einschaltreihenfolge: {order}",sum_roles:"Aufgaben: {roles}","order.early":"fr\xFCh","order.middle":"Mitte","order.late":"sp\xE4t","role.power":"Strom","role.navigation":"Pfeiltasten","role.now_playing":"l\xE4uft gerade","role.turn_off":"Ausschalten",section_state:"Ger\xE4tezustand",hint_state:"Woran Easy AV Control erkennt, dass das Ger\xE4t an oder aus ist. Mit einem Status wartet es auf das Ger\xE4t selbst statt auf feste Zeiten.",detected:"Erkannt: {name}",detected_none:"Kein Profil f\xFCr die Integration dieses Ger\xE4ts: es gelten die festen Zeiten unten.",detected_uses:"Nutzt",detected_now:"Jetzt: {value}",detected_found_indicator:"Status von {entity}",detected_found_attribute:"Attribut {attribute}",detected_found_remote:"Fernbedienung: {entity}",detected_found_outlet:"Steckdose: {entity}",detected_found_settings:"Einstellungen: {entities}",detected_use:"\xDCbernehmen",detected_applied:"In Gebrauch",detected_siblings:"Auch abgedeckt von: {integrations}",detected_role:"{role}: {integration}",state_source:"Status","state_source.auto":"Automatisch (aus dem Profil)","state_source.none":"Keiner: nur feste Zeiten","field.profile":"Profil","profile.auto":"Automatisch (f\xFCr seine Integration)","field.wait_on":"Beim Einschalten warten auf","field.wait_off":"Vor dem Abschalten der Steckdose warten auf","wait.status":"Seinen Status","wait.time":"Eine feste Zeit","wait.both":"Seinen Status, dann eine feste Zeit","field.timeout_on":"Status-Zeitlimit beim Einschalten","field.timeout_off":"Status-Zeitlimit beim Ausschalten","field.debounce":"Entprellen","helper.debounce":"Sekunden, die ein Zustand anhalten muss, bevor er z\xE4hlt.","field.on_failure_on":"Wenn es nicht angeht","field.on_failure_off":"Wenn es nicht ausgeht","failure.warn":"Warnen und weitermachen","failure.stop":"Aktivit\xE4t beenden","failure.retry":"Noch einmal versuchen, dann warnen","failure_off.stop":"Steckdose anlassen",state_fixed_only:"Kein Status f\xFCr dieses Ger\xE4t: nur die festen Zeiten unten gelten.",footer_version:"Easy AV Control (Ltek) {version}",star:"\u2B50 Auf GitHub markieren",report:"\u{1F41B} Problem melden",title:"Easy AV Control",rooms:"R\xE4ume",add_room:"Raum hinzuf\xFCgen",guide:"Anleitung",act_startup:"Hochfahren",act_shutdown:"Herunterfahren",act_hold:"3 Sekunden gedr\xFCckt halten, um diese Aktivit\xE4t zu starten",act_saved_only:"Startet die Aktivit\xE4t wie gespeichert; vorher speichern, um die \xC4nderungen zu nutzen.",reports:"Berichte","rep.title":"Berichte","qs.title":"Schnellstart","qs.hint":"Was eingerichtet ist, und die \xFCbrigen Schritte, f\xFCr das ganze System und f\xFCr jede Aktivit\xE4t. Anwenden erledigt die automatischen; die anderen sagen, was zu tun ist, und \xF6ffnen die Seite daf\xFCr. Jederzeit wiederkommen.","qs.your_setup":"Deine Einrichtung","qs.tab_system":"System","qs.tab_activity":"Aktivit\xE4ten","qs.system_hint":"Einmal n\xF6tig, f\xFCr alle Aktivit\xE4ten: der Raum, seine Ger\xE4te, keine andere Automation, Benachrichtigungen, die Karte.","qs.activity_hint":"Jede Aktivit\xE4t braucht f\xFCr sich: ihre Ger\xE4te, ein Hochfahren, das geklappt hat, Pr\xFCfungen, wer sie startet.","qs.no_activity":"Noch keine Aktivit\xE4t: Reiter Aktivit\xE4ten \u2192 + Aktivit\xE4t, dann ihr Flow.","qs.astep.devices":"Ihre Ger\xE4te","qs.astep.tested":"Ein Hochfahren, das geklappt hat","qs.astep.checks":"Pr\xFCfungen: Funktioniert es, wenn es an ist","qs.astep.started_by":"Die Harmony-Fernbedienung startet die Aktivit\xE4t","qs.astep.auto_off":"Auto-Aus, wenn nichts l\xE4uft","qs.all_done":"Alles erledigt","qs.n_done":"{done} von {total} erledigt","qs.apply":"{n} Schritt(e) anwenden","qs.applied":"Alle automatischen Schritte erledigt","qs.apply_hint":"Anwenden f\xFCgt nur Fehlendes hinzu; Bestehendes bleibt.","qs.open":"\xF6ffnen","qs.show_sidebar":"einblenden","qs.card_on":"auf {boards}","qs.card_add":"noch auf keinem Dashboard: Dashboard bearbeiten \u2192 Karte hinzuf\xFCgen \u2192 Easy AV Control, oder einf\xFCgen:","qs.s_rooms":"{n} Raum/R\xE4ume","qs.s_devices":"{n} Ger\xE4t(e)","qs.s_activities":"{n} Aktivit\xE4ten","qs.s_activities_off":"{n} Aktivit\xE4ten, {off} deaktiviert","qs.s_runs":"{n} Lauf/L\xE4ufe","qs.s_alerts":"{n} Alarm(e)","qs.step.rooms":"Ein Raum","qs.step.detect":"Deine AV-Ger\xE4te","qs.step.status":"Easy AV Control kann den Status jedes Ger\xE4ts lesen","qs.step.activity":"Eine Aktivit\xE4t mit ihren Ger\xE4ten","qs.step.competing":"Keine andere Automation schaltet die AV-Ger\xE4te","qs.step.tested":"Ein Hochfahren, das geklappt hat","qs.step.checks":"Pr\xFCfungen: Funktioniert es, wenn es an ist","qs.step.started_by":"Die Harmony-Fernbedienung startet die Aktivit\xE4t","qs.step.auto_off":"Auto-Aus, wenn nichts l\xE4uft","qs.step.blueprint":"Blueprint f\xFCr Benachrichtigungen","qs.step.notifications":"Benachrichtigungen f\xFCr Watchdog und Monitoring","qs.step.card":"Die Fernbedienungskarte auf einem Dashboard","qs.step.sidebar":"Editor in der Seitenleiste","rep.entities":"Entit\xE4ten","rep.entities_hint":"Je Raum: die Entit\xE4ten, die Easy AV Control anlegt, und die, auf die es sich st\xFCtzt, mit ihrem Zweck und ihrem Zustand jetzt.","rep.ent_created":"Von Easy AV Control angelegt","rep.ent_used":"Genutzt","rep.ent_missing":"fehlt","rep.ent.switch":"An, solange eine Aktivit\xE4t l\xE4uft, startet oder fehlschlug; an startet die Standardaktivit\xE4t, aus f\xE4hrt herunter","rep.ent.sensor":"Zustand des Raums: idle, starting, active, stopping oder error (f\xFCr Automationen)","rep.ent.select":"Welche Aktivit\xE4t l\xE4uft; eine w\xE4hlen startet sie","rep.ent.scene":"Startet {activity}","rep.ent.problem":"{problem}: an, solange das Problem besteht (Benachrichtigungen folgen ihm)","rep.use.device":"Ein- und ausgeschaltet als","rep.use.outlet":"Steckdose f\xFCr","rep.use.remote":"Fernbedienungstasten f\xFCr","rep.use.ready":"Verbindungspr\xFCfung von","rep.use.status":"Status (an / aus) von","rep.use.picture":"Bildpr\xFCfung von","rep.use.check":"Gepr\xFCft in","rep.use.started_by":"Startet",watchdog:"Watchdog",tab_watchdog:"Watchdog",watchdog_hint:"Der Raum au\xDFerhalb seiner Aktivit\xE4ten: ein Ger\xE4t, das an ist, w\xE4hrend nichts es nutzt, oder einen Fehler meldet. Beides schaltet einen Sensor des Raums ein, dem eine Benachrichtigung folgen kann.","problem.on_unexpectedly":"Ger\xE4t unerwartet an","problem.device_error":"Ger\xE4tefehler","problem.device_lost":"Ger\xE4t verloren","problem.picture_lost":"Bild verloren","problem.left_on":"Angelassen",watchdog_ok:"Alles in Ordnung",watchdog_save_first:"Die Sensoren erscheinen, sobald der Raum gespeichert ist.",watchdog_devices:"Ger\xE4te",watchdog_devices_hint:"Was geschieht, wenn ein Ger\xE4t an ist, w\xE4hrend der Raum ruht oder die laufende Aktivit\xE4t es nicht nutzt.",watchdog_no_status:"Easy AV Control kann den Status dieses Ger\xE4ts nicht lesen (kein Profil), es kann also nicht \xFCberwacht werden.",watchdog_error:"Ein Ger\xE4t, das einen Fehler meldet, wird immer gemeldet.",watchdog_notify:"Benachrichtigungen daf\xFCr",check_keep:"Auch w\xE4hrend aktiv pr\xFCfen (Monitoring: Bild verloren)","action.turn_off":"Ausschalten","action.turn_on":"Einschalten","action.keep_on":"Anlassen","action.shutdown":"Herunterfahren","action.dismiss":"Verwerfen","ntf.scope_watchdog":"Watchdog","ntf.scope_monitoring":"Monitoring","ntf.title":"Benachrichtigungen","ntf.hint":"Ein fertiger Alarm je Raum und Monitor-Problem, aus dem Blueprint Smart Repeating Alerts: eine normale Home-Assistant-Automation mit eigenem Editor und Traces. Sie benachrichtigt, wenn der Sensor des Problems angeht, und r\xE4umt sich auf, wenn er ausgeht. Ihre Tasten sagen Easy AV Control nur, was zu tun ist; die Integration tut es.","ntf.blueprint":"Blueprint","ntf.bp_installed":"Smart Repeating Alerts {version}","ntf.bp_foreign":"blueprints/automation/LTek/smart-repeating-alerts-ltek.yaml ist eine andere Datei ({version}); sie bleibt, wie sie ist","ntf.bp_missing":"Noch nicht installiert: Das geschieht mit dem ersten Alarm.","ntf.bp_install":"{version} installieren","ntf.bp_update":"Auf {version} aktualisieren","ntf.phones":"Senden an","ntf.no_phones":"Noch kein Telefon mit der Home-Assistant-App.","ntf.pick_phone":"Mindestens ein Telefon w\xE4hlen","ntf.create":"Erstellen","ntf.edit":"Bearbeiten","ntf.on":"An","ntf.off":"Aus","rep.hint":"Wie lange jeder Start und Stopp dauerte und wie lange jedes Ger\xE4t zum Ein- und Ausschalten brauchte. Gemessen, w\xE4hrend Easy AV Control schaltet; die letzten 300 L\xE4ufe und 100 Zeiten je Ger\xE4t bleiben erhalten.","rep.refresh":"Aktualisieren","rep.clear":"Leeren","rep.clear_confirm":"Den ganzen Verlauf l\xF6schen? Die typischen Zeiten f\xFCr die Zeitlimits bleiben.","rep.runs":"L\xE4ufe","rep.devices":"Ger\xE4te","rep.devices_hint":"Vom Ein- (oder Aus-)Befehl, bis das Ger\xE4t meldet, dass es an (aus) ist, f\xFCr Ger\xE4te mit Status. Nur, wenn Easy AV Control das Ger\xE4t geschaltet hat.","rep.no_runs":"Noch keine L\xE4ufe: eine Aktivit\xE4t starten.","rep.no_devices":"Noch keine Ger\xE4tezeiten. Sie werden f\xFCr Ger\xE4te mit Status gemessen, wenn eine Aktivit\xE4t sie schaltet.","rep.show":"Zeigen","rep.mode_all":"Hoch- und Herunterfahren","rep.mode_start":"Hochfahren","rep.mode_stop":"Herunterfahren","rep.export":"Exportieren","rep.export_run":"Diesen Lauf mit seinem Protokoll exportieren","rep.copied":"In die Zwischenablage kopiert","rep.export_hint":"Der Bericht ist eine JSON-Datei: die L\xE4ufe, jeder mit seinem Protokoll (was Easy AV Control tat, jeder Dienstaufruf und jede Zustands\xE4nderung der Entit\xE4ten des Raums), die Ger\xE4tezeiten, die R\xE4ume wie eingerichtet und die Versionen.","rep.from":"von {activity}","rep.typical":"typisch","rep.count":"{n} L\xE4ufe","rep.count_times":"{n} Mal","rep.failed":"{n} fehlgeschlagen","rep.result_ok":"OK","rep.result_warning":"Warnungen","rep.result_error":"Fehlgeschlagen","rep.result_cancelled":"Abgebrochen","rep.phase_switch_off_unused":"Nicht Ben\xF6tigtes ausschalten","rep.phase_outlets_on":"Steckdosen an","rep.phase_outlets_off":"Steckdosen aus","rep.phase_checks":"Pr\xFCfungen","rep.phase_steps":"Aktionen nach dem Start","rep.phase_hooks":"Aktionen bei Start / Stopp","rep.dir_on":"Einschalten","rep.dir_off":"Ausschalten","rep.dir":"","rep.when":"Wann","rep.time":"Zeit","rep.result":"Ergebnis","rep.for":"Raum \xB7 Aktivit\xE4t","rep.slow":"Langsam",sidebar_chip:"Editor in der Seitenleiste",sidebar_hint:"Easy AV Control in der Seitenleiste von Home Assistant zeigen. Ausgeblendet bleibt es unter /easy-av-control und unter Einstellungen \u2192 Ger\xE4te & Dienste \u2192 Easy AV Control \u2192 Konfigurieren.",no_rooms:"Noch keine R\xE4ume.",room_name:"Name",room_area:"Bereich",room_default_activity:"Standard-Aktivit\xE4t",default_last:"Zuletzt genutzte","helper.default_activity":"Was der Ein/Aus-Schalter des Raums und toggle_activity starten, z. B. von einem Wandtaster.",room_id_hint:"ID {id}",delete_room:"Raum l\xF6schen",delete_room_confirm:"Raum \u201E{name}\u201C mit allen Ger\xE4ten und Aktivit\xE4ten l\xF6schen?",tab_devices:"Ger\xE4te",tab_activities:"Aktivit\xE4ten",tab_yaml:"YAML",add_device:"Ger\xE4t hinzuf\xFCgen",add_activity:"Aktivit\xE4t hinzuf\xFCgen",delete:"L\xF6schen",move_up:"Nach oben",move_down:"Nach unten",device_id:"Ger\xE4te-ID",device_in_use:"Ger\xE4t \u201E{id}\u201C wird verwendet von: {where}. Bitte zuerst dort entfernen.",activity_id_hint:"ID {id} \u2013 Teil der Entit\xE4ts-IDs, nicht \xE4nderbar",new_activity:"Neue Aktivit\xE4t",add_device_to_activity:"Ger\xE4t hinzuf\xFCgen \u2026",steps:"Aktionen nach dem Start",section_checks:"Pr\xFCfungen",hint_checks:"Was stimmen muss, bevor die Aktivit\xE4t als laufend gilt, z. B. ein Bild am Lumagen und am Projektor. Sie laufen gleichzeitig, sobald alle Ger\xE4te an sind, und wieder beim Wechsel von einer anderen Aktivit\xE4t.",add_check:"Pr\xFCfung",check_profile:"Bildpr\xFCfung aus seinem Profil",check_entity:"Eine eigene Entit\xE4t",check_what:"Was",check_entity_label:"Entit\xE4t",check_states:"Richtig, wenn sie zeigt",check_states_placeholder:"z. B. on, Active Video",check_timeout:"Zeitlimit",check_failure:"Wenn es nicht stimmt",check_warn:"Warnen und weitermachen",check_stop:"Aktivit\xE4t abbrechen",check_none:"Keine Pr\xFCfungen: die Aktivit\xE4t gilt als laufend, sobald ihre Ger\xE4te an sind.",check_unless_text:"Wartet, bis {entity} nicht mehr {states} zeigt.","flow.steps":"Aktionen nach dem Start","flow.checks":"Pr\xFCfungen, gleichzeitig","flow.edit":"Bearbeiten","flow.options":"Filter f\xFCr Flow-Details","flow.options_hint":"Was als Detail gilt: ausgeblendet, solange Details aus ist, hier und auf der Karte.","flow.details_chip":"Details","flow.detail_entities":"Entit\xE4ts-IDs und Aktionen","flow.detail_waits":"Wartezeiten","flow.detail_notes":"Hinweise","flow.detail_reloads":"Neu laden","flow.detail_outlets":"Steckdosen","flow.detail_hooks":"Aktionen bei Start und Stopp","flow.check":"{device}: warten, bis {entity} {states} zeigt, h\xF6chstens {timeout}","flow.check_unless":"{device}: warten, bis {entity} nicht mehr {states} zeigt, h\xF6chstens {timeout}","flow.check_missing":"{device}: nichts zu pr\xFCfen, sein Profil hat keine Bildpr\xFCfung","flow.check_warn":"\u2013 sonst eine Warnung",add_step:"Schritt hinzuf\xFCgen \u2026",hooks:"Aktionen bei Start und Stopp",remote:"Fernbedienung",quick_select:"Schnellwahl",quick_select_hint:"Tasten, die einen Mediaplayer auf eine Quelle schalten; beim Apple TV sind die Quellen seine Apps.",quick_select_no_player:"F\xFCge dieser Aktivit\xE4t zuerst einen Mediaplayer hinzu.",add_quick_select:"Schnellwahl hinzuf\xFCgen",card_settings:"Einstellungen in der Karte",card_settings_hint:"Quelle, Klangmodus und weitere Einstellungen der Ger\xE4te, in der Karte \xE4nderbar, w\xE4hrend die Aktivit\xE4t l\xE4uft: die an den Ger\xE4ten festgelegten oder eine Auswahl nur f\xFCr diese Aktivit\xE4t. Der Bereich ist zugeklappt, bis man ihn \xF6ffnet; jeder Browser merkt sich das.","setting.entity":"Entit\xE4t des Ger\xE4ts","field.entity":"Entit\xE4t","helper.entity":"Eine Zahl (Schieberegler), Auswahl (Liste) oder ein Schalter (An/Aus-Taste), z. B. der Bass des Receivers.","field.settings_mode":"Anzeigen",settings_auto:"Von den Ger\xE4ten",settings_chosen:"Hier ausgew\xE4hlt, mit Favoriten",settings_auto_shows:"Die Karte zeigt: {list}.",settings_auto_none:"Die Ger\xE4te dieser Aktivit\xE4t bieten noch keine Einstellungen. Lege sie an einem Ger\xE4t fest, oder starte die Aktivit\xE4t einmal, damit die Mediaplayer ihre Listen melden.",device_settings_hint:"Was die Karte von diesem Ger\xE4t anbietet, in jeder Aktivit\xE4t, die es nutzt. Automatisch: Quelle und Klangmodus eines Mediaplayers und die Zahl- und Auswahl-Entit\xE4ten desselben Ger\xE4ts.",device_settings_auto:"Automatisch",device_settings_auto_none:"Noch nichts gefunden: keine Quellen- oder Klangmodus-Liste gemeldet und keine Zahl- oder Auswahl-Entit\xE4ten desselben Ger\xE4ts.",device_settings_none:"Die Karte zeigt keine Einstellungen dieses Ger\xE4ts.",settings_none:"Die Karte zeigt f\xFCr diese Aktivit\xE4t keine Einstellungen.",add_setting:"Einstellung hinzuf\xFCgen","field.setting":"Einstellung","field.options":"Favoriten (optional)","helper.options":"Nur diese in der Karte, in dieser Reihenfolge; leer: die ganze Liste des Ger\xE4ts.",commands:"Eigene Befehle",save:"Speichern",discard:"Verwerfen",saving:"Speichert \u2026",saved:"Gespeichert",unsaved:"Ungespeicherte \xC4nderungen",reload:"Neu laden",reload_confirm:"Ungespeicherte \xC4nderungen verwerfen und die gespeicherte Konfiguration laden?",retry:"Erneut versuchen",save_anyway:"Trotzdem speichern",conflict:"Die Konfiguration wurde anderswo ge\xE4ndert. Bitte neu laden \u2013 deine ungespeicherten \xC4nderungen hier gehen dabei verloren.",invalid:"Nicht gespeichert \u2013 {path}: {message}",missing:"Diese Entit\xE4ten gibt es in Home Assistant nicht:",missing_hint:"Ein Ger\xE4t ohne Strom bleibt normalerweise bekannt \u2013 meist ist es ein Tippfehler oder eine umbenannte Entit\xE4t.",loading:"L\xE4dt \u2026",load_error:"Konfiguration konnte nicht geladen werden: {error}",route_auto:"Automatisch",route_none:"Ausblenden",devices_intro:"Alle Ger\xE4te des Raums, die Easy AV Control schaltet oder steuert: TV, Beamer, Receiver, Player.",devices_empty:"Noch keine Ger\xE4te.",new_device:"Neues Ger\xE4t",no_entity:"Keine Entit\xE4t gew\xE4hlt",entity_missing:"Entit\xE4t in Home Assistant nicht gefunden",used_by:"Verwendet in: {where}",section_device:"Ger\xE4t",hint_device:"Die Home-Assistant-Entit\xE4t des Ger\xE4ts, meist ein Mediaplayer.",section_power:"Steckdose",hint_power:"Die Steckdose, an der das Ger\xE4t h\xE4ngt: vor dem Ger\xE4t ein- und nach ihm ausgeschaltet. Abw\xE4hlen, wenn das Ger\xE4t an keiner schaltbaren Steckdose h\xE4ngt.",power_use:"Steckdose dieses Ger\xE4ts schalten",section_delays:"Wartezeiten",hint_delays:"Wie lange Easy AV Control auf dieses Ger\xE4t wartet.",section_ready:"Verbindung pr\xFCfen",hint_ready:"Wartet, bis das Ger\xE4t in Home Assistant erreichbar ist, vor dem Einschalten und vor Tasten der Fernbedienung. F\xFCr Ger\xE4te, die ohne Strom ihre Verbindung verlieren, etwa ein Apple TV.",ready_preset:"{entity} f\xFCr Verbindungspr\xFCfung und Pfeiltasten nutzen (empfohlen f\xFCr Apple TV)",section_advanced:"Erweitert",hint_device_advanced:"Die Ger\xE4te-ID wird in der YAML-Konfiguration verwendet. Eigene Befehle ordnen einem Tastennamen Home-Assistant-Aktionen zu, z. B. Pfeiltasten f\xFCr einen Receiver.",activities_intro:'Eine Aktivit\xE4t fasst Ger\xE4te f\xFCr eine Nutzung zusammen, z. B. "Apple TV" = TV und Apple TV. Beim Start wird eingeschaltet, was sie braucht, und ausgeschaltet, was nicht.',activities_empty:"Noch keine Aktivit\xE4ten.",no_devices:"Keine Ger\xE4te",needs_devices:"Lege zuerst die Ger\xE4te dieses Raums an.",section_general:"Allgemein",hint_general:"Name und Icon erscheinen in der Card. Die Position bestimmt die Reihenfolge.",section_activity_devices:"Ger\xE4te",hint_activity_devices:"Werden in dieser Reihenfolge eingeschaltet.",hint_steps:"Zus\xE4tzliche Aktionen in dieser Reihenfolge, sobald alle Ger\xE4te an sind und die Pr\xFCfungen bestanden: z. B. den TV auf seinen HDMI-Eingang schalten, Klangmodus oder Lautst\xE4rke setzen, das Licht dimmen.",hint_remote:"Welches Ger\xE4t welche Tasten der Card bekommt. Automatisch passt f\xFCr die meisten Aufbauten.",hint_activity_advanced:"Befehle in YAML sowie Home-Assistant-Aktionen bei Start und Stopp.",card_divider:"Fernbedienungs-Karte",card_extra:"Zus\xE4tzliche Tasten",hint_card_extra:"Tasten \xFCber die \xFCblichen hinaus, als YAML-Liste.",card_shows:"Die Karte zeigt",or:"oder",other_integration:"Sonstige",add_device_short:"Ger\xE4t",nav_flow:"Ablauf \xF6ffnen",step_picture_checks:"Wartet, bis {entity} {states} zeigt.",step_picture_none:"{device} hat keine Bildpr\xFCfung, dieser Schritt wartet also auf nichts.",yaml_intro:"Der ganze Raum als YAML. \xC4nderungen hier und in den Formularen betreffen dieselbe Konfiguration.",add_room_name:"Name des neuen Raums",create:"Hinzuf\xFCgen",cancel:"Abbrechen","helper.power_switch":"Gemeinsame Steckdosen bleiben an, solange ein Ger\xE4t daran gebraucht wird.","helper.delay_after_power":"Wie lange das Ger\xE4t nach dem Einschalten der Steckdose braucht. Nur wenn die Steckdose aus war.","helper.delay_after_on":"Bis das Ger\xE4t Befehle annimmt. Nur wenn es eingeschaltet wurde.","helper.delay_after_off":"Abk\xFChlzeit, bevor das n\xE4chste Ger\xE4t oder die Steckdose ausgeschaltet wird, z. B. 180 s f\xFCr einen Beamer.","helper.ready_entity":"Z. B. die Fernbedienung eines Apple TV, die nur bei bestehender Verbindung an ist.","helper.ready_reload":"\xDCberspringt die Wartezeit einer Integration, die ihre Verbindung erneut versucht.","helper.source":"Die Liste zeigt, was das Ger\xE4t zuletzt gemeldet hat; es muss also einmal an gewesen sein. Ein Name l\xE4sst sich auch eintippen.","field.entity_id":"Entit\xE4t","field.name":"Anzeigename","field.power_switch":"Steckdose","field.remote_entity":"Fernbedienung (optional)","helper.remote_entity":"Pfeiltasten, OK, Zur\xFCck, Home und Men\xFC der Card gehen an diese Fernbedienungs-Entit\xE4t, z. B. die Fernbedienung eines Apple TV.","field.delay_after_power":"Startzeit (s)","field.delay_after_on":"Warten nach Einschalten (s)","field.delay_after_off":"Warten nach Ausschalten (s)","field.ready_enabled":"Vor dem Einschalten auf Verf\xFCgbarkeit warten","field.ready_entity":"Stattdessen diese Entit\xE4t pr\xFCfen (optional)","field.ready_state":"Auf Zustand warten (optional, z. B. on)","field.ready_timeout":"Zeitlimit (s)","field.ready_reload":"Integration neu laden","field.ready_on_timeout":"Bei Zeit\xFCberschreitung","field.commands":"Eigene Befehle (YAML: Name \u2192 Aktionen)","field.icon":"Icon","field.order":"Position","field.on_start":"Beim Start","field.on_stop":"Beim Stopp","field.volume":"Lautst\xE4rke","field.channels":"Sender","field.transport":"Wiedergabe","field.navigation":"Navigation","field.touchpad":"Touchfl\xE4che","helper.touchpad":"Eine Wischfl\xE4che statt der Pfeiltasten in der Karte. Automatisch: wenn die Navigation an eine Remote-Entit\xE4t geht, z. B. ein Apple TV.",touchpad_auto:"Automatisch",touchpad_on:"An",touchpad_off:"Aus (Pfeiltasten)","field.buttons":"Zus\xE4tzliche Buttons (YAML-Liste)","field.label":"Beschriftung (optional, sonst die Quelle)","field.activity_commands":"Befehle dieser Aktivit\xE4t (YAML: Name \u2192 Aktionen)","field.type":"Typ","field.device":"Ger\xE4t","field.source":"Quelle","field.volume_level":"Lautst\xE4rke","field.sound_mode":"Klangmodus","field.brightness_pct":"Helligkeit (%)","field.color_temp_kelvin":"Farbtemperatur (K)","field.transition":"\xDCbergang (s)","field.position":"Position (%)","field.tilt_position":"Neigung (%)","field.action":"Aktion (z. B. script.turn_on)","field.data":"Daten","field.target":"Ziel","field.timeout":"Zeitlimit (s)","field.reload_integration":"Integration neu laden","field.on_timeout":"Bei Zeit\xFCberschreitung","field.delay_after":"Danach warten (s)",on_timeout_abort:"Start abbrechen",on_timeout_continue:"Weitermachen","step.power_on":"Einschalten","step.power_off":"Ausschalten","step.set_source":"Quelle w\xE4hlen","step.set_volume":"Lautst\xE4rke setzen","step.set_sound_mode":"Klangmodus w\xE4hlen","step.set_brightness":"Helligkeit setzen","step.set_color_temp":"Farbtemperatur setzen","step.set_position":"Rollladen-Position setzen","step.set_tilt":"Lamellen-Neigung setzen","step.call_action":"Aktion ausf\xFChren","step.delay":"Warten","step.wait_available":"Auf Verf\xFCgbarkeit warten",section_remote_preview:"Vorschau der Fernbedienung",hint_remote_preview:"So sieht die Karte aus, w\xE4hrend diese Aktivit\xE4t l\xE4uft, mit den Einstellungen oben, auch vor dem Speichern. Tippe eine Taste an, um zu sehen, wohin sie geht; es wird nichts gesendet.","preview.tap":"Tippe eine Taste an, um zu sehen, welches Ger\xE4t sie bekommt und was dort ausgef\xFChrt wird.","preview.this_activity":"diese Aktivit\xE4t","preview.device_commands":"eigener Befehl des Ger\xE4ts: {actions}","preview.activity_commands":"eigener Befehl der Aktivit\xE4t: {actions}","preview.unknown":"tut nichts: kein Ger\xE4t dieser Aktivit\xE4t kennt die Taste","preview.unknown_on_device":"tut nichts: {device} kennt die Taste nicht","preview.ready":"Pr\xFCft vorher die Verbindung und stellt sie bei Bedarf wieder her.","preview.dead":"Diese Tasten werden angezeigt, tun aber nichts:","preview.groups":"Tastengruppen","preview.mode_auto":"automatisch","preview.mode_set":"gew\xE4hlt","preview.hidden":"ausgeblendet","preview.no_device":"kein passendes Ger\xE4t, nicht angezeigt","preview.no_keys":"nicht angezeigt: {device} hat keine dieser Tasten",section_flow:"Ablauf: was wann geschaltet wird",hint_flow:"Berechnet aus den Einstellungen dieser Aktivit\xE4t und ihrer Ger\xE4te, auch vor dem Speichern. Die Zeiten z\xE4hlen nur die eingestellten Wartezeiten; wie lange die Ger\xE4te zum Reagieren brauchen, kommt hinzu.","flow.mode_start":"Hochfahren","flow.mode_stop":"Herunterfahren","flow.from_label":"Ausgangslage","flow.from_idle":"aus dem Leerlauf (alles aus)","flow.from":"Wechsel von {activity}","flow.failed":"Ablauf konnte nicht berechnet werden: {error}","flow.invalid":"Kein Ablauf, solange die Konfiguration einen Fehler hat \u2013 {error}","flow.state_starting":"Raum: startet","flow.state_active":"Raum: aktiv","flow.state_stopping":"Raum: stoppt","flow.state_idle":"Raum: aus","flow.outlets_on":"Steckdosen gleichzeitig einschalten: {outlets}","flow.outlets_off":"Steckdosen ausschalten: {outlets}","flow.outlets_off_later":"Steckdose nach der Abk\xFChlzeit ausschalten: {outlets}","flow.outlet_keep":"{outlet} bleibt an, diese Aktivit\xE4t braucht sie","flow.outlets_already_on":"schon an: {outlets}","flow.unless_rooms":"nicht, solange {rooms} sie nutzt","flow.on_start":"Aktionen beim Start beginnen","flow.on_start_wait":"Warten, bis die Aktionen beim Start fertig sind","flow.on_stop":"Aktionen beim Stopp beginnen","flow.on_stop_wait":"Warten, bis die Aktionen beim Stopp fertig sind","flow.parallel":"l\xE4uft parallel","flow.already_on":"L\xE4uft schon in {activity}: kein Einschalten, keine Wartezeit","flow.boot":"Startzeit: bis {seconds} nach dem Einschalten der Steckdosen","flow.reload":"Integration von {entity} neu laden","flow.ready":"Warten, bis {entity} verf\xFCgbar ist, h\xF6chstens {timeout}","flow.ready_state":"Warten, bis {entity} {states} ist, h\xF6chstens {timeout}","flow.on_timeout_abort":"\u2013 sonst wird der Start abgebrochen","flow.on_timeout_continue":"\u2013 sonst geht es trotzdem weiter","flow.turn_on":"{device} einschalten","flow.turn_off":"{device} ausschalten","flow.turn_off_unused":"{device} ausschalten, diese Aktivit\xE4t braucht es nicht","flow.cannot_switch":"{device} l\xE4sst sich nicht schalten, es wird nichts gesendet","flow.wait_on":"{seconds} warten, bis das Ger\xE4t bereit ist","flow.wait":"{seconds} warten","flow.mode_monitor":"Monitoring","flow.summary_monitor":"Monitoring pr\xFCft das alle paar Sekunden, solange die Aktivit\xE4t aktiv ist; der Watchdog des Raums hat eine eigene Seite. Jedes Problem schaltet seinen Sensor ein (binary_sensor.av_<raum>_\u2026), dem eine Benachrichtigung folgen kann; ihre Tasten sagen Easy AV Control, was zu tun ist.","flow.monitor_lost":"Benachrichtigen, wenn ein Ger\xE4t dieser Aktivit\xE4t {seconds} lang aus oder nicht erreichbar ist","flow.monitor_picture":"Pr\xFCfungen laufen weiter: benachrichtigen, wenn eine {seconds} lang fehlschl\xE4gt","flow.monitor_idle":"Auto-Aus: wenn {idle} lang nichts l\xE4uft, benachrichtigen, dann {warning} sp\xE4ter herunterfahren","flow.monitor_error":"Benachrichtigen, wenn ein Ger\xE4t einen Fehler meldet, jederzeit","flow.monitor_watch":"{device}: benachrichtigen, wenn es an ist und nichts es nutzt, nach {grace}","flow.monitor_watch_off":"{device}: benachrichtigen, wenn es an ist und nichts es nutzt, nach {grace}; {after} sp\xE4ter ausschalten","flow.add_monitor_hint":"Zum Monitor hinzuf\xFCgen:","flow.add_monitor_lost":"Ger\xE4t verloren","flow.add_monitor_picture":"Weiter pr\xFCfen","flow.add_monitor_idle":"Auto-Aus",section_monitor:"Watchdog",hint_monitor:"Wenn dieses Ger\xE4t an ist, w\xE4hrend der Raum ruht oder die laufende Aktivit\xE4t es nicht nutzt: benachrichtigen (der Sensor \u201EGer\xE4t unerwartet an\u201C des Raums geht an) und optional ausschalten.",monitor_hint:"W\xE4hrend diese Aktivit\xE4t aktiv ist. 0 schaltet eine Pr\xFCfung ab.","field.watch_mode":"Wenn es unerwartet an ist","watch.off":"Nicht \xFCberwachen","watch.notify":"Benachrichtigen","watch.turn_off":"Benachrichtigen, dann ausschalten","field.watch_grace":"Nach","field.watch_turn_off_after":"Ausschalten nach","field.lost_after":"Ger\xE4t verloren nach","field.picture_lost_after":"Bild verloren nach","field.idle_after_min":"Auto-Aus, wenn nichts l\xE4uft seit (min)","field.idle_warning_min":"Herunterfahren nach der Benachrichtigung (min)","flow.started_by":"Startet auch, wenn {entity} zu {states} wechselt","flow.stopped_by":"F\xE4hrt auch herunter, wenn {entity} zu {states} wechselt","flow.add_started_by":"Gestartet durch",started_by:"Gestartet durch",started_by_hint:"Diese Aktivit\xE4t starten, wenn eine Entit\xE4t in einen Zustand wechselt, z. B. die Aktivit\xE4tstaste der Harmony-Fernbedienung oder ein Wandschalter, und optional bei einem anderen Zustand herunterfahren. \xC4nderungen durch das eigene Hoch- oder Herunterfahren werden ignoriert, Neuverbindungen auch.","field.started_by_entity":"Entit\xE4t","field.started_by_state":"Startet bei","field.started_by_stop":"F\xE4hrt herunter bei (optional)","flow.delay":"{seconds} warten, bevor es eingeschaltet wird","flow.wait_for":"Warten, bis {what}, h\xF6chstens {timeout}","flow.wait_for_on":"{device} an ist","flow.wait_for_picture":"{device} ein Bild zeigt","flow.and":" und ","flow.turn_off_later":"{device} {seconds} nach dem Herunterfahren ausschalten","flow.option":"w\xE4hlt {option}","flow.delete":"Entfernen","flow.group.on":"an","flow.group.off":"aus","flow.group.starting":"startet","flow.group.stopping":"f\xE4hrt herunter","flow.group.error":"Fehler","flow.add_device":"Ger\xE4t","flow.device_actions":"Was mit {device} in dieser Aktivit\xE4t geschieht","flow.device_identity":"Was das Ger\xE4t ist (Entit\xE4t, Fernbedienung, Steckdose, Status), steht auf seiner eigenen Seite, f\xFCr jede Aktivit\xE4t.",duplicate:"Duplizieren",act_export:"Exportieren",act_enabled:"Aktiviert",act_disabled:"Deaktiviert",act_enabled_hint:"Eine deaktivierte Aktivit\xE4t kann nicht gestartet werden: Karte, ihre Szene und Auswahl, Gestartet durch und die Standardaktivit\xE4t lassen sie aus. Gespeichert mit Speichern.",act_export_all:"Alle exportieren",act_import:"Importieren",act_download:"Herunterladen",act_export_hint:"Die Aktivit\xE4t mit jedem Ger\xE4t, das sie nutzt. In einem anderen Raum oder einem anderen Home Assistant importieren; Ger\xE4te mit derselben Entit\xE4t dort werden genutzt, die anderen hinzugef\xFCgt.",act_import_hint:"Einen Export einf\xFCgen oder seine Datei w\xE4hlen. Importieren ersetzt eine Aktivit\xE4t gleichen Namens und jedes Ger\xE4t mit derselben Entit\xE4t vollst\xE4ndig durch die aus der Datei; der Rest kommt hinzu. Als Kopie importieren f\xFCgt die Aktivit\xE4t neben der alten als \u201EName 2\u201C hinzu. Gespeichert wird erst mit Speichern.",act_import_copy:"Als Kopie importieren",act_import_replaced:"Ersetzt: {names}",act_import_devices_replaced:"Ger\xE4te ersetzt: {devices}",act_import_confirm:"Die Datei ersetzt {devices}. Diese Aktivit\xE4ten nutzen sie auch und bekommen ihre neuen Einstellungen: {activities}. Importieren?",act_import_done:"Hinzugef\xFCgt: {added}",act_import_devices:"Ger\xE4te hinzugef\xFCgt: {devices}",act_import_started_by:"Gestartet durch weggelassen bei {names}: eine andere Aktivit\xE4t startet auf derselben Entit\xE4t",copy_suffix:"(Kopie)",move_earlier:"Fr\xFCher",move_later:"Sp\xE4ter","flow.add_check":"Pr\xFCfung","flow.add_step":"Aktion nach dem Start","flow.add_on_start":"Aktionen beim Start","flow.add_on_stop":"Aktionen beim Stopp","flow.add_hint":"Zum Hochfahren hinzuf\xFCgen:","flow.add_stop_hint":"Zum Herunterfahren hinzuf\xFCgen:","flow.edit_hint":"Mit \u270E an einer Zeile wird sie hier ge\xE4ndert, der Papierkorb entfernt sie.","flow.close_edit":"Fertig","flow.device_shared":"Diese Einstellungen geh\xF6ren zum Ger\xE4t: Sie gelten f\xFCr jede Aktivit\xE4t, die es nutzt.","flow.open_device":"Ger\xE4teseite \xF6ffnen","flow.remove_device":"Aus dieser Aktivit\xE4t entfernen","flow.before":"Vor dem Einschalten","flow.before_hint":"Eine feste Zeit warten und/oder, bis andere Ger\xE4te dieser Aktivit\xE4t an sind oder ein Bild zeigen.","flow.add_wait_for":"+ Auf ein Ger\xE4t warten","flow.pick_device":"Ger\xE4t hinzuf\xFCgen\u2026","flow.no_more_devices":"Alle Ger\xE4te des Raums sind in dieser Aktivit\xE4t. Neue Ger\xE4te kommen auf der Ger\xE4teseite dazu.","field.before_delay":"Zuerst warten","field.before_timeout":"H\xF6chstens","field.before_on_timeout":"Wenn nicht rechtzeitig","wait_for.on":"ist an","wait_for.picture":"zeigt ein Bild","field.turn_off_after":"Beim Herunterfahren ausschalten nach","helper.turn_off_after":"0: mit den anderen Ger\xE4ten. F\xFCr Sitze oder Licht, die eine Weile an bleiben; ein neues Hochfahren l\xE4sst es an.","field.option":"Zu w\xE4hlende Aktivit\xE4t","helper.option":"Hochfahren w\xE4hlt sie; ohne: die erste, die nicht die Aus-Option ist.","field.off_option":"Herunterfahren w\xE4hlt","wait.none":"Nichts, sofort weiter","flow.background":"Im Hintergrund, wenn der Raum schon fertig ist","flow.if.outlet_was_off":"nur, wenn die Steckdose aus war","flow.if.if_off":"nur, wenn das Ger\xE4t aus ist","flow.if.if_on":"nur, wenn das Ger\xE4t an ist","flow.reload_if_needed":"l\xE4dt die Integration neu, falls nicht bereit","flow.cooldown":"danach {seconds} Abk\xFChlzeit","flow.summary_start":"Aktiv fr\xFChestens nach {min}, sp\xE4testens nach {max}, wenn jede Bereitschaftspr\xFCfung ihr ganzes Zeitlimit braucht.","flow.summary_start_fixed":"Aktiv nach {min}.","flow.summary_stop":"Aus, sobald die Ger\xE4te ausgeschaltet und die Aktionen beim Stopp fertig sind.","flow.summary_stop_cut":"Aus, sobald die Ger\xE4te ausgeschaltet und die Aktionen beim Stopp fertig sind; die letzte Steckdose geht nach {seconds} aus."}};function Ue(r,i,e={}){let t=(r??"en").split("-")[0],n=Fe[t]?.[i]??Fe.en[i];if(n===void 0)return C(r,i,e);for(let[s,o]of Object.entries(e))n=n.replace(`{${s}}`,o);return n}var ye=new Set(["boot","reload","ready","status","picture","check","turn_on","wait","already_on","step","turn_off","delay","wait_for"]),N=new Set(["device","checks","steps"]);function q(r){let i;return r.map(e=>{if(N.has(e.kind)){i=e;return}return(!ye.has(e.kind)||e.reason==="unused")&&(i=void 0),i})}function wt(r,i){if(!i)return-1;let e=q(r),t=i.device??void 0,n=o=>(r[o].device??e[o]?.device)===t,s=o=>r.findIndex((l,d)=>!l.background&&o(l,d));switch(i.kind){case"power_on":return s(o=>o.kind==="outlets_on");case"power_off":return s(o=>o.kind==="outlets_off");case"boot":case"reload":case"ready":case"turn_on":case"status":return s((o,l)=>o.kind===i.kind&&n(l));case"reach":return s((o,l)=>o.kind==="turn_on"&&n(l));case"delay":case"before":return s((o,l)=>o.kind===(i.kind==="delay"?"delay":"wait_for")&&n(l));case"warm_up":return s((o,l)=>o.kind==="wait"&&o.reason==="delay_after_on"&&n(l));case"turn_off":return s((o,l)=>o.kind==="turn_off"&&n(l));case"checks":return s(o=>o.kind==="checks");case"step":return s(o=>o.kind!=="wait"&&o.step===i.step);case"wait":return s(o=>o.kind==="wait"&&o.step===i.step);case"hooks":return s(o=>o.kind==="hook_wait");default:return-1}}function Ze(r,i,e){if(i.state==="error"){let l=q(r);return r.map((d,c)=>d.background||e<0?"todo":c<e?N.has(d.kind)&&l[e]===d?"failed":"done":c===e?"failed":"todo")}let t=i.state==="active"||i.state==="idle",n=i.state==="starting"||i.state==="stopping",s=n?Math.max(e,wt(r,i.current)):-1,o=q(r);return r.map((l,d)=>l.background?t&&i.state==="idle"?"done":"todo":t?"done":!n||s<0?d===0?"active":"todo":d<s?N.has(l.kind)&&o[s]===l?"active":"done":d===s?"active":"todo")}function Ye(r){switch(r){case"on":return"on";case"starting":case"stopping":return"busy";case"off":return"off";case"error":return"error";case"unavailable":return"unavailable";default:return"unknown"}}var bt={waits:["wait","boot","ready","status","hook_wait"],reloads:["reload"],outlets:["outlets_on","outlets_off","outlet_keep"],hooks:["hook","hook_wait"]},Je=["entities","waits","notes","reloads","outlets","hooks"];function ke(r,i){return i.some(e=>bt[e]?.includes(r.kind))}var yt=400,kt={state:"mdi:flag-outline",outlets_on:"mdi:power-socket-eu",outlets_off:"mdi:power-socket-eu",outlet_keep:"mdi:power-socket-eu",turn_on:"mdi:power",turn_off:"mdi:power-off",hook:"mdi:script-text-outline",hook_wait:"mdi:script-text-outline",boot:"mdi:timer-sand",wait:"mdi:timer-sand",reload:"mdi:reload",ready:"mdi:lan-connect",status:"mdi:state-machine",picture:"mdi:image-check-outline",check:"mdi:image-check-outline",already_on:"mdi:check",step:"mdi:tune-variant",delay:"mdi:timer-outline",started_by:"mdi:gesture-tap-button",monitor_lost:"mdi:lan-disconnect",monitor_picture:"mdi:image-off-outline",monitor_idle:"mdi:sleep",monitor_error:"mdi:alert-circle-outline",monitor_watch:"mdi:eye-outline",wait_for:"mdi:clock-check-outline"};function At(r,i){let e=r.device??(i?.kind==="device"?i.device:void 0)??"";return[r.kind,e,r.step??r.index??"",r.check??"",r.hook??"",r.reason??""].join("|")}function xt(r,i,e){if(r.background)return!1;if(i?.kind==="steps")return!0;switch(r.kind){case"device":return e==="start";case"status":case"boot":case"ready":case"delay":case"wait_for":case"started_by":case"monitor_lost":case"monitor_picture":case"monitor_idle":case"monitor_watch":case"check":case"step":case"hook":return!0;case"wait":return r.reason==="delay_after_on";default:return!1}}var Qe={device:"section_device",boot:"section_power",reload:"section_ready",ready:"section_ready",status:"section_state",turn_on:"section_device",turn_off:"section_device",wait:"section_delays",delay:"flow.before",wait_for:"flow.before"},Xe={checks:"section_checks",check:"section_checks",steps:"steps",step:"steps",picture:"section_checks",hook:"section_advanced",hook_wait:"section_advanced",already_on:"section_activity_devices",started_by:"started_by",monitor_lost:"monitor",monitor_picture:"monitor",monitor_idle:"monitor",monitor_error:"monitor"},K=class extends g{constructor(){super();this._reached=-1;this._watched="";this._request=0;this._mode="start",this.details=!0,this._states={},this._detailKinds=["entities","waits"],this._showDetails=!0}connectedCallback(){super.connectedCallback(),this.hass?.callWS({type:"easy_av_control/ui/get"}).then(e=>this._detailKinds=e.flow_details).catch(()=>{})}get _detailsOn(){return this.live?this.details:this._showDetails}_hides(e){return!this._detailsOn&&this._detailKinds.includes(e)}async _setDetailKinds(e){this._detailKinds=e;try{let t=await this.hass.callWS({type:"easy_av_control/ui/flow_details",details:e});this._detailKinds=t.flow_details}catch{}}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._timer),window.clearTimeout(this._statesTimer)}willUpdate(e){if(e.has("activityId")&&e.get("activityId")!==void 0&&(this._from=void 0),this._from!==void 0&&!this.room?.activities?.[this._from]&&(this._from=void 0),this.live){let t=this.live.state==="stopping"?"stop":"start",n=e.get("live");t!==this._mode&&(this._mode=t),(!n||n.state!==this.live.state||n.activity!==this.live.activity)&&((this.live.state==="starting"||this.live.state==="stopping")&&(this._reached=-1),e.set("_mode",void 0))}if(["room","roomId","activityId","_mode","_from","from"].some(t=>e.has(t))){window.clearTimeout(this._timer);let n=!(this._flow===void 0&&this._failed===void 0)&&e.has("room")?yt:0;this._timer=window.setTimeout(()=>this._load(),n)}}async _load(){let e=++this._request,t=this.live?this.from:this._from;try{let n=await this.hass.callWS({...this.live?{type:"easy_av_control/control/flow",...this.entryId?{entry_id:this.entryId}:{}}:{type:"easy_av_control/config/flow",config:this.room},room:this.roomId,activity:this.activityId,mode:this._mode,...this._mode==="start"&&t?{from:t}:{}});this._loadStates(),e===this._request&&(this._flow=n,this._failed=void 0)}catch(n){e===this._request&&(this._failed=n.message??String(n))}}async _loadStates(){try{this._states=await this.hass.callWS({type:"easy_av_control/control/states",room:this.roomId,...this.entryId?{entry_id:this.entryId}:{},...this.live?{}:{devices:this.room?.devices??{}}})}catch{}}updated(e){if(!e.has("hass")||!this.hass||!this._flow||this._flow.error)return;let t=new Set;for(let s of this._flow.rows){typeof s.entity_id=="string"&&t.add(s.entity_id);for(let o of s.entities??[])t.add(o)}for(let s of Object.values(this._room.devices??{}))s.entity_id&&t.add(s.entity_id);let n=[...t].map(s=>`${s}=${this.hass.states[s]?.state}`).join("|");n!==this._watched&&(this._watched=n,window.clearTimeout(this._statesTimer),this._statesTimer=window.setTimeout(()=>this._loadStates(),300))}get _room(){return this.room??(this._flow&&!this._flow.error?this._flow.room:void 0)??{}}_t(e,t){return Ue(this.hass?.language,e,t)}_entity(e){let t=String(e??"");return this.hass.states[t]?.attributes.friendly_name||t}_device(e){let t=String(e??""),n=this._room.devices?.[t];return n?.name||(n?.entity_id?this._entity(n.entity_id):"")||t}_activity(e){let t=String(e??"");return this._room.activities?.[t]?.name||t}_list(e){return(e??[]).map(t=>this._entity(t)).join(", ")}_seconds(e){return`${Math.round(Number(e)*10)/10} s`}_duration(e){return e>=120&&e%60===0?`${e/60} min`:this._seconds(e)}_time([e,t]){return e===t?this._seconds(e):`${this._seconds(e).slice(0,-2)}\u2013${this._seconds(t)}`}_text(e){let t=this._device(e.device);switch(e.kind){case"state":return this._t(`flow.state_${e.state}`);case"outlets_on":return this._t("flow.outlets_on",{outlets:this._list(e.entities)});case"outlets_off":return this._t(e.after_status?"flow.outlets_off_status":e.background?"flow.outlets_off_later":"flow.outlets_off",{outlets:this._list(e.entities)});case"outlet_keep":return this._t("flow.outlet_keep",{outlet:this._entity(e.entity_id)});case"hook":return this._t(`flow.${e.hook}`);case"hook_wait":return this._t(`flow.${e.hook}_wait`);case"already_on":return this._t("flow.already_on",{activity:this._activity(e.previous)});case"boot":return this._t("flow.boot",{seconds:this._seconds(e.seconds)});case"reload":return this._t("flow.reload",{entity:this._entity(e.entity_id)});case"ready":{let n=Array.isArray(e.states)?e.states:e.states?[e.states]:[],s={entity:this._entity(e.entity_id),states:n.join(" / "),timeout:this._seconds(e.timeout)};return[e.step?`${e.step}. `:"",this._t(n.length?"flow.ready_state":"flow.ready",s)," ",this._t(`flow.on_timeout_${e.on_timeout}`)].join("")}case"turn_on":case"turn_off":{let n=e.step?`${e.step}. `:"";return e.skip?n+this._t("flow.cannot_switch",{device:t}):e.later?n+this._t("flow.turn_off_later",{device:t,seconds:this._duration(Number(e.later))}):n+this._t(e.reason==="unused"?"flow.turn_off_unused":`flow.${e.kind}`,{device:t})}case"status":return this._t(e.target==="off"?"flow.status_off":"flow.status_on",{device:t,entity:this._entity(e.entity_id),timeout:this._seconds(e.timeout)});case"check":{let n=this._device(e.device);if(e.missing)return this._t("flow.check_missing",{device:n});let s=e.unless??[];return this._t(s.length?"flow.check_unless":"flow.check",{device:n,entity:this._entity(e.entity_id),states:(s.length?s:e.states??[]).join(" / "),timeout:this._seconds(e.timeout)})+(e.on_failure==="stop"?` ${this._t("flow.on_timeout_abort")}`:` ${this._t("flow.check_warn")}`)}case"picture":return this._t("flow.picture",{step:String(e.step??""),entity:this._entity(e.entity_id),states:(e.states??[]).join(" / "),timeout:this._seconds(e.timeout)});case"delay":return this._t("flow.delay",{seconds:this._seconds(e.seconds)});case"monitor_lost":return this._t("flow.monitor_lost",{seconds:this._seconds(e.seconds)});case"monitor_picture":return this._t("flow.monitor_picture",{seconds:this._seconds(e.seconds)});case"monitor_idle":return this._t("flow.monitor_idle",{idle:this._duration(Number(e.seconds)),warning:this._duration(Number(e.warning))});case"monitor_error":return this._t("flow.monitor_error");case"monitor_watch":return this._t(e.mode==="turn_off"?"flow.monitor_watch_off":"flow.monitor_watch",{device:t,grace:this._duration(Number(e.grace)),after:this._duration(Number(e.turn_off_after))});case"started_by":return this._t(this._mode==="stop"?"flow.stopped_by":"flow.started_by",{entity:this._entity(e.entity_id),states:(e.states??[]).join(" / ")});case"wait_for":{let s=(e.waits??[]).map(o=>this._t(o.state==="picture"?"flow.wait_for_picture":"flow.wait_for_on",{device:this._device(o.device)})).join(this._t("flow.and"));return this._t("flow.wait_for",{what:s,timeout:this._seconds(e.timeout)})+" "+this._t(`flow.on_timeout_${e.on_timeout}`)}case"wait":return this._t(e.reason==="delay_after_on"?"flow.wait_on":"flow.wait",{seconds:this._seconds(e.seconds)});case"step":return`${e.step}. ${this._t(`step.${e.step_type}`)}${this._stepValue(e)}`;default:return e.kind}}_stepValue(e){let t=e.data??{},n=[];for(let[s,o]of Object.entries(t))s==="volume_level"?n.push(`${Math.round(Number(o)*100)} %`):s==="brightness_pct"||s==="position"||s==="tilt_position"?n.push(`${o} %`):s==="color_temp_kelvin"?n.push(`${o} K`):s==="transition"?n.push(this._seconds(o)):e.step_type!=="call_action"&&n.push(String(o));return n.length?`: ${n.join(", ")}`:""}_notes(e){let t=[];if(typeof e.condition=="string"&&t.push(this._t(`flow.if.${e.condition}`)),e.kind==="ready"&&e.reload&&t.push(this._t("flow.reload_if_needed")),typeof e.option=="string"&&t.push(this._t("flow.option",{option:e.option})),e.kind==="status"&&Number(e.typical)>0&&t.push(this._t("flow.typical",{seconds:this._seconds(e.typical)})),e.kind==="status"&&Number(e.debounce)>0&&t.push(this._t("flow.debounce",{seconds:this._seconds(e.debounce)})),e.kind==="turn_off"&&Number(e.cooldown)>0&&t.push(this._t("flow.cooldown",{seconds:this._seconds(e.cooldown)})),Array.isArray(e.already_on)&&e.already_on.length&&t.push(this._t("flow.outlets_already_on",{outlets:this._list(e.already_on)})),Array.isArray(e.unless_rooms)&&e.unless_rooms.length&&t.push(this._t("flow.unless_rooms",{rooms:e.unless_rooms.join(", ")})),e.kind==="hook"){let n=e.actions??[];t.push(this._t("flow.parallel")),n.length&&t.push(n.join(", "))}return t}_call(e){if(typeof e.action!="string"||e.kind==="hook")return;let t=e.entities?this._list(e.entities):e.entity_id?this._entity(e.entity_id):"";return t?`${e.action} \u2192 ${t}`:e.action}_target(e,t){let n=e.device??(t?.kind==="device"?t.device:void 0);if(t?.kind==="device"&&n&&Qe[e.kind])return{device:n,panel:Qe[e.kind]};if(t?.kind==="steps"&&ye.has(e.kind))return{panel:"steps"};if(e.kind==="monitor_watch"&&n)return{device:n,panel:"section_monitor"};if(Xe[e.kind])return{panel:Xe[e.kind]};if(e.kind==="device"&&n)return{device:n,panel:"section_device"}}_moves(e,t){let n=new Map;if(this.live||this._mode==="monitor")return n;let s=e.map((o,l)=>({row:o,i:l})).filter(({row:o})=>!o.background&&(this._mode==="start"?o.kind==="device":o.kind==="turn_off"&&o.reason!=="unused"&&!o.step));return s.forEach(({row:o,i:l},d)=>n.set(l,{what:"device",device:String(o.device),index:d,first:d===0,last:d===s.length-1})),e.forEach((o,l)=>{let d=t[l];if(d?.kind==="steps"&&o.step&&!n.has(l)){let c=Number(o.step)-1;n.set(l,{what:"step",index:c,first:c===0,last:c===Number(d.count)-1})}else if(o.kind==="check"&&d?.kind==="checks"){let c=Number(o.check)-1;n.set(l,{what:"check",index:c,first:c===0,last:c===Number(d.count)-1})}}),n}_moveButtons(e){let t=n=>this.dispatchEvent(new CustomEvent("flow-move",{detail:{...e,dir:n,mode:this._mode},bubbles:!0,composed:!0}));return a`<button class="ltek-act move" title=${this._t("move_earlier")} aria-label=${this._t("move_earlier")} ?disabled=${e.first} @click=${()=>t(-1)}>
        <ha-icon icon="mdi:arrow-up"></ha-icon></button
      ><button class="ltek-act move" title=${this._t("move_later")} aria-label=${this._t("move_later")} ?disabled=${e.last} @click=${()=>t(1)}>
        <ha-icon icon="mdi:arrow-down"></ha-icon>
      </button>`}_renderRow(e,t,n,s,o,l){let d=this.live?void 0:this._target(e,s),c=At(e,s),p=this._hides("notes")?[]:this._notes(e),h=this._hides("entities")?void 0:this._call(e),f=N.has(e.kind),_=[t?"nested":"",f?"header":"",e.kind,o?`s-${o}`:""],m=e.kind==="device"&&e.device?this._states[e.device]:void 0;return a`<li class=${_.join(" ")}>
      <span class="time"
        >${o==="done"?a`<ha-icon class="mark" icon="mdi:check"></ha-icon>`:o==="active"?a`<ha-icon class="mark spin" icon="mdi:loading"></ha-icon>`:o==="failed"?a`<ha-icon class="mark" icon="mdi:close"></ha-icon>`:n?this._time(e.at):""}</span
      >
      ${f?a`<span class="index">${e.kind==="device"?e.index:e.kind==="checks"?"\u2713":"\u2261"}</span>`:a`<ha-icon class="icon" .icon=${kt[e.kind]??"mdi:circle-small"}></ha-icon>`}
      <span class="body">
        <span class="what"
          >${e.kind==="device"?a`${this._device(e.device)}${m?.value?a`<span class="state-chip r-${Ye(m.group)}" title=${m.value}
                    >${["on","off","starting","stopping","error"].includes(m.group)?this._t(`flow.group.${m.group}`):m.value}</span
                  >`:u}`:e.kind==="steps"?this._t("flow.steps"):e.kind==="checks"?this._t("flow.checks"):this._text(e)}</span
        >
        ${e.kind==="device"&&!this._hides("entities")?a`<span class="call">${e.entity_id}</span>`:u}
        ${h?a`<span class="call">${h}</span>`:u}
        ${p.length?a`<span class="notes">${p.map(I=>a`<span class="note">${I}</span>`)}</span>`:u}
      </span>
      ${this.live?u:a`<span class="acts"
            >${l?this._moveButtons(l):u}${d?a`<button
                  class="ltek-act edit ${this.editing===c?"on":""}"
                  title=${this._t("flow.edit")}
                  aria-label=${this._t("flow.edit")}
                  @click=${()=>this.dispatchEvent(new CustomEvent("flow-edit",{detail:{...d,key:c},bubbles:!0,composed:!0}))}
                >
                  <ha-icon icon="mdi:pencil-outline"></ha-icon>
                </button>`:u}${xt(e,s,this._mode)?a`<button
                  class="ltek-del"
                  title=${this._t("flow.delete")}
                  aria-label=${this._t("flow.delete")}
                  @click=${()=>this.dispatchEvent(new CustomEvent("flow-delete",{detail:{row:e,header:s?.kind,device:e.device??s?.device,mode:this._mode},bubbles:!0,composed:!0}))}
                >
                  <ha-icon icon="mdi:trash-can-outline"></ha-icon>
                </button>`:u}</span
          >`}
    </li>
    ${!this.live&&this.editing===c?a`<li class="inline"><slot name="edit"></slot></li>`:u}`}_renderRows(e){let t=q(e),n;if(this.live&&["starting","stopping","active","error"].includes(this.live.state)){n=Ze(e,this.live,this._reached);let c=n.lastIndexOf("active");c>this._reached&&!N.has(e[c].kind)&&(this._reached=c)}let s=e.filter(c=>c.background),o=this._moves(e,t),l="",d=e.flatMap((c,p)=>{if(c.background||!this._detailsOn&&ke(c,this._detailKinds))return[];let h=this._time(c.at),f=h!==l||c.kind==="state";return l=h,[this._renderRow(c,t[p]!==void 0,f,t[p],n?.[p],o.get(p))]});return a`<ol class="flow">${d}</ol>
      ${s.length?a`<h4>${this._t("flow.background")}</h4>
            <ol class="flow">${s.filter(c=>this._detailsOn||!ke(c,this._detailKinds)).map(c=>this._renderRow(c,!1,!0,void 0,n?.[e.indexOf(c)]))}</ol>`:u}`}render(){if(this.live)return a`${this._renderBody()}`;let e=Object.entries(this.room.activities??{}).filter(([t])=>t!==this.activityId);return a`
      <details class="ltek-sub options">
        <summary><ha-icon icon="mdi:tune-variant"></ha-icon>${this._t("flow.options")}</summary>
        <div class="ltek-sub-body">
          <p class="ltek-hint">${this._t("flow.options_hint")}</p>
          ${Je.map(t=>a`<label class="check"
              ><input
                type="checkbox"
                .checked=${this._detailKinds.includes(t)}
                @change=${n=>{let s=n.target.checked;this._setDetailKinds(s?[...this._detailKinds,t]:this._detailKinds.filter(o=>o!==t))}}
              />${this._t(`flow.detail_${t}`)}</label
            >`)}
        </div>
      </details>
      <div class="modes" role="tablist">
        ${["start","stop","monitor"].map(t=>a`<button
            role="tab"
            class=${this._mode===t?"active":""}
            aria-selected=${this._mode===t?"true":"false"}
            @click=${()=>this._mode=t}
          >
            ${this._t(`flow.mode_${t}`)}
          </button>`)}
        <button class="chip ${this._showDetails?"on":""}" @click=${()=>this._showDetails=!this._showDetails}>
          <ha-icon icon=${this._showDetails?"mdi:eye-outline":"mdi:eye-off-outline"}></ha-icon>${this._t("flow.details_chip")}
        </button>
        ${this._mode==="start"&&e.length?a`<select
              aria-label=${this._t("flow.from_label")}
              @change=${t=>{let n=t.target.value;this._from=n||void 0}}
            >
              <option value="" ?selected=${!this._from}>${this._t("flow.from_idle")}</option>
              ${e.map(([t,n])=>a`<option value=${t} ?selected=${this._from===t}>
                    ${this._t("flow.from",{activity:n.name||t})}
                  </option>`)}
            </select>`:u}
      </div>
      ${this._renderBody()}
    `}_renderBody(){if(this._failed)return a`<p class="error">${this._t("flow.failed",{error:this._failed})}</p>`;let e=this._flow;if(!e)return a`<p class="hint">${this._t("loading")}</p>`;if(e.error){let l=e.error.path.join(".");return a`<p class="error">
        ${this._t("flow.invalid",{error:l?`${l}: ${e.error.message}`:e.error.message})}
      </p>`}let[t,n]=e.done,s=e.rows.filter(l=>l.background).map(l=>l.at[0]),o=this._mode==="monitor"?this._t("flow.summary_monitor"):this._mode==="start"?this._t(t===n?"flow.summary_start_fixed":"flow.summary_start",{min:this._seconds(t),max:this._seconds(n)}):this._t(s.length?"flow.summary_stop_cut":"flow.summary_stop",{seconds:this._seconds(Math.max(0,...s))});return a`${this.live?u:a`<div class="adder"><slot name=${`add-${this._mode}`}></slot></div>`}
      ${this._renderRows(e.rows)}
      ${this._detailsOn?a`<p class="summary">${o}</p>`:u}`}};K.properties={hass:{attribute:!1},room:{attribute:!1},roomId:{attribute:!1},activityId:{attribute:!1},_mode:{state:!0},_from:{state:!0},_flow:{state:!0},_failed:{state:!0},entryId:{attribute:!1},live:{attribute:!1},from:{attribute:!1},details:{type:Boolean},editing:{attribute:!1},_states:{state:!0},_detailKinds:{state:!0},_showDetails:{state:!0}},K.styles=[P,re,D,v`
    :host {
      display: block;
    }
    .modes {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }
    .modes button {
      font: inherit;
      padding: 6px 14px;
      border-radius: 16px;
      border: 1px solid var(--divider-color);
      background: none;
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .modes button.active {
      background: var(--ltek-c-accent);
      border-color: var(--ltek-c-accent);
      color: var(--ltek-c-on-accent);
    }
    .modes select {
      font: inherit;
      padding: 6px 8px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      max-width: 100%;
    }
    ol.flow {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    ol.flow li {
      display: grid;
      grid-template-columns: 64px 24px minmax(0, 1fr) auto;
      gap: 4px 10px;
      align-items: start;
      padding: 6px 0;
      border-top: 1px solid var(--divider-color);
    }
    ol.flow li:first-child {
      border-top: none;
    }
    ol.flow li.nested {
      grid-template-columns: 64px 40px minmax(0, 1fr) auto;
      border-top: none;
      padding-top: 2px;
    }
    ol.flow li.nested .icon {
      justify-self: end;
    }
    .time {
      color: var(--secondary-text-color);
      font-size: var(--ltek-fs-small);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      text-align: right;
      padding-top: 2px;
    }
    .icon {
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
    }
    li.state .icon,
    li.state .what {
      color: var(--primary-color);
    }
    li.state .what,
    li.header .what {
      font-weight: 500;
    }
    .index {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 1px solid var(--accent-color, var(--ltek-c-accent));
      color: var(--accent-color, var(--ltek-c-accent));
      font-size: var(--ltek-fs-small);
      font-weight: 500;
      box-sizing: border-box;
    }
    /* A device's (or the steps') heading: number and name in the theme accent */
    li.header .what {
      color: var(--accent-color, var(--ltek-c-accent));
    }
    .body {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
      overflow-wrap: anywhere;
    }
    /* A device's state now, as a chip beside its name */
    .state-chip {
      display: inline-block;
      margin-left: var(--ltek-sp-2);
      padding: 0 8px;
      border-radius: 10px;
      border: 1px solid currentColor;
      font-size: var(--ltek-fs-tiny);
      font-weight: var(--ltek-fw-medium);
      vertical-align: 1px;
      color: var(--secondary-text-color);
    }
    .state-chip.r-on {
      color: var(--state-icon-active-color, var(--state-active-color, var(--ltek-c-accent)));
    }
    .state-chip.r-busy {
      color: var(--warning-color, #ffa600);
    }
    .state-chip.r-error {
      color: var(--error-color, #db4437);
    }
    .state-chip.r-unavailable {
      color: var(--state-unavailable-color, var(--disabled-text-color, #6f6f6f));
    }
    /* Step number and icon: yellow while it runs, green done, red failed */
    li.s-active .icon,
    li.s-active .index,
    li.s-active .mark {
      color: var(--yellow-color, #ffeb3b);
      border-color: currentColor;
    }
    li.s-done .icon,
    li.s-done .index,
    li.s-done .mark {
      color: var(--green-color, #4caf50);
      border-color: currentColor;
    }
    li.s-failed .icon,
    li.s-failed .index,
    li.s-failed .mark {
      color: var(--red-color, #f44336);
      border-color: currentColor;
    }
    /* Live: done, doing, still to come */
    li.s-done .what {
      color: var(--secondary-text-color);
    }
    li.s-done.header .what {
      color: var(--accent-color, var(--ltek-c-accent));
    }
    li.s-active {
      background: var(--ltek-c-accent-fade);
      border-radius: var(--ltek-r-ctrl);
    }
    li.s-active .what {
      font-weight: var(--ltek-fw-semibold);
    }
    li.s-todo {
      opacity: 0.6;
    }
    .mark {
      --mdc-icon-size: 16px;
    }
    .mark.spin {
      animation: spin 1s linear infinite;
    }
    details.options {
      margin-bottom: var(--ltek-sp-3);
    }
    details.options label.check {
      display: inline-flex;
      align-items: center;
      gap: var(--ltek-sp-2);
      margin: 0 var(--ltek-sp-5) var(--ltek-sp-2) 0;
      font-size: var(--ltek-fs-body);
      color: var(--ltek-c-label);
    }
    details.options input {
      accent-color: var(--ltek-c-accent);
    }
    .modes .chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 10px 3px 8px;
      border-radius: 14px;
      border: 1px solid var(--divider-color);
      background: transparent;
      color: var(--secondary-text-color);
      font: inherit;
      font-size: var(--ltek-fs-small);
      cursor: pointer;
      --mdc-icon-size: 16px;
    }
    .modes .chip.on {
      border-color: var(--ltek-c-accent);
      color: var(--ltek-c-accent);
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    .acts {
      display: flex;
      gap: 2px;
      align-items: flex-start;
    }
    .acts .ltek-del {
      --mdc-icon-size: 16px;
      padding-top: 2px;
      opacity: 0.45;
    }
    li:hover .acts .ltek-del {
      opacity: 1;
    }
    button.edit.on {
      opacity: 1;
      color: var(--ltek-c-accent);
    }
    ol.flow li.inline {
      display: block;
      border-top: none;
      margin: 4px 0 8px 74px;
      padding: 10px 12px;
      border-left: 3px solid var(--ltek-c-accent);
      border-radius: 0 8px 8px 0;
      background: var(--secondary-background-color);
    }
    .adder {
      margin: 4px 0 10px;
    }
    .acts .move {
      --mdc-icon-size: 16px;
      padding-top: 2px;
      opacity: 0.45;
    }
    li:hover .acts .move:not([disabled]) {
      opacity: 1;
    }
    .acts .move[disabled] {
      opacity: 0.15;
    }
    button.edit {
      --mdc-icon-size: 16px;
      padding-top: 2px;
      opacity: 0.55;
    }
    li:hover button.edit {
      opacity: 1;
      color: var(--ltek-c-accent);
    }
    .call {
      font-family: var(--code-font-family, monospace);
      font-size: var(--ltek-fs-small);
      color: var(--secondary-text-color);
    }
    .notes {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
    .note {
      font-size: var(--ltek-fs-small);
      padding: 1px 8px;
      border-radius: 10px;
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
    }
    h4 {
      font-size: var(--ltek-fs-group);
      font-weight: 500;
      margin: 16px 0 4px;
    }
    .summary {
      margin: 12px 0 0;
      font-size: var(--ltek-fs-body);
      color: var(--secondary-text-color);
      line-height: 1.4;
    }
    .error {
      color: var(--error-color, #db4437);
      margin: 0;
    }
    .hint {
      color: var(--secondary-text-color);
      margin: 0;
    }
    @media (max-width: 450px) {
      ol.flow li {
        grid-template-columns: 58px 22px minmax(0, 1fr) auto;
        gap: 4px 6px;
      }
      ol.flow li.nested {
        grid-template-columns: 58px 32px minmax(0, 1fr) auto;
      }
      .time {
        font-size: var(--ltek-fs-small);
      }
    }
  `];customElements.get("easy-av-control-flow")||customElements.define("easy-av-control-flow",K);function Ae(r,i){let e=`command.${r}`,t=i(e);if(t!==e)return t;let n=r.replace(/[_-]+/g," ").trim();return n.charAt(0).toUpperCase()+n.slice(1)}var $t=new Set(["off","standby","unavailable","unknown"]);function et(r,i){if(!r||$t.has(r.state))return;let e=r.attributes,t=R=>typeof e[R]=="string"&&e[R]?e[R]:void 0,n=R=>typeof e[R]=="number"?e[R]:void 0,s=t("app_name"),o=t("media_title")??s;if(!o)return;let l=n("media_season")??t("media_season"),d=n("media_episode")??t("media_episode"),c=t("media_series_title"),p=c&&(l!==void 0||d!==void 0)?`${c} \xB7 ${[l!==void 0?`S${l}`:"",d!==void 0?`E${d}`:""].filter(Boolean).join(" ")}`:c??t("media_artist")??t("media_album_name"),h=r.state==="playing",f=n("media_duration"),_=f!==void 0&&f>0?f:void 0,m=n("media_position"),I=t("media_position_updated_at");return m!==void 0&&h&&I&&!Number.isNaN(Date.parse(I))&&(m+=(i-Date.parse(I))/1e3),m!==void 0&&_!==void 0&&(m=Math.max(0,Math.min(_,m))),{title:o,app:o===s?void 0:s,subtitle:p,picture:t("entity_picture"),playing:h,duration:_,position:_!==void 0?m:void 0}}function j(r){let i=Math.floor(r),e=Math.floor(i/3600),t=Math.floor(i%3600/60),n=String(i%60).padStart(2,"0");return e?`${e}:${String(t).padStart(2,"0")}:${n}`:`${t}:${n}`}function tt(r,i){let e=Math.max(0,Math.ceil((Date.parse(r)-i)/1e3));return e>=60?j(e):`${e} s`}function it(r,i,e){let t=r.names.length?r.names.join(", "):r.outlet;return{text:e("cooling.text",{names:t}),time:e(r.status?"cooling.time_status":"cooling.time",{time:tt(r.until,i)})}}function nt(r,i,e){if(!r)return;let t=r.name??"",n={step:String(r.step??""),steps:String(r.steps??"")},s;switch(r.kind){case"step":{let d=e(`step.${r.step_type}`);s=e("doing.step",{...n,what:t?`${d} (${t})`:d});break}case"wait":s=e("doing.wait",n);break;case"hooks":s=e(`doing.hooks_${r.hook}`);break;case"status":s=r.value?e(`doing.status_${r.target==="off"?"off":"on"}_value`,{name:t,value:r.value}):e(`doing.status_${r.target==="off"?"off":"on"}`,{name:t});break;default:s=e(`doing.${r.kind}`,{name:t})}if(!r.until)return{text:s};let o=tt(r.until,i),l=r.kind==="ready"||r.kind==="status";return{text:s,time:e(l?"doing.at_most":"doing.left",{time:o})}}var ae=class{constructor(){this.originX=0;this.originY=0;this.startX=0;this.startY=0;this.startTime=0;this.moved=!1}start(i,e,t){this.originX=this.startX=i,this.originY=this.startY=e,this.startTime=t,this.moved=!1}move(i,e){Math.hypot(i-this.startX,e-this.startY)>10&&(this.moved=!0);let t=[];for(;;){let n=i-this.originX,s=e-this.originY;if(Math.max(Math.abs(n),Math.abs(s))<40)return t;Math.abs(n)>=Math.abs(s)?(t.push(n>0?"right":"left"),this.originX+=Math.sign(n)*40,this.originY=e):(t.push(s>0?"down":"up"),this.originY+=Math.sign(s)*40,this.originX=i)}}end(i,e,t){return Math.hypot(i-this.startX,e-this.startY)>10&&(this.moved=!0),!this.moved&&t-this.startTime<=500}};function xe(r,i){return`easy-av-control-touchpad:${r}:${i}`}function st(r,i){return r==="on"?!0:r==="off"?!1:i}var le="easy_av_control",$e={volume_up:"mdi:volume-plus",volume_down:"mdi:volume-minus",mute:"mdi:volume-off",channel_up:"mdi:chevron-up",channel_down:"mdi:chevron-down",play_pause:"mdi:play-pause",play:"mdi:play",pause:"mdi:pause",stop:"mdi:stop",next:"mdi:skip-next",previous:"mdi:skip-previous",up:"mdi:chevron-up",down:"mdi:chevron-down",left:"mdi:chevron-left",right:"mdi:chevron-right",back:"mdi:arrow-u-left-top",menu:"mdi:menu",home:"mdi:home-outline",info:"mdi:information-outline",guide:"mdi:television-guide",exit:"mdi:close",select_source:"mdi:apps"},St=["back","home","menu","info","guide","exit"],Et=["previous","play_pause","play","pause","stop","next"],Tt=new Set(["volume_up","volume_down","up","down","left","right"]),Rt=400,zt=200;function ot(r){return`easy-av-control-settings:${r}`}var Ct=3e4,Pt={idle:"mdi:power",starting:"mdi:timer-sand",active:"mdi:power",stopping:"mdi:timer-sand",error:"mdi:alert-circle-outline"},F=class extends g{constructor(){super();this._padChoices=new Map;this._settingsOpen=new Map;this._settingDrafts=new Map;this._view=null,this._loaded=!1}static getConfigElement(){return document.createElement("easy-av-control-card-editor")}static async getStubConfig(e){try{return{room:(await e.callWS({type:`${le}/control/rooms`}))[0]?.room??""}}catch{return{room:""}}}setConfig(e){if(!e||typeof e.room!="string")throw new Error("room is required");let t=e.room!==this._config?.room||e.entry_id!==this._config?.entry_id;this._config=e,t&&this._resubscribe()}getCardSize(){return this._view?.remote?8:3}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._pressEnd(!1),window.clearInterval(this._tickTimer),this._tickTimer=void 0,this._unsubscribeNow()}willUpdate(e){e.has("demoView")&&this.demoView&&(this._config={type:"custom:easy-av-control-card",room:this.demoView.room},this._view=this.demoView,this._loaded=!0)}updated(e){let t=this._nowPlaying(),n=t?.playing===!0&&t.duration!==void 0||!!this._view?.current?.until||!!this._view?.cooling?.length;n&&this._tickTimer===void 0?this._tickTimer=window.setInterval(()=>this.requestUpdate(),1e3):!n&&this._tickTimer!==void 0&&(window.clearInterval(this._tickTimer),this._tickTimer=void 0),e.has("hass")&&!this._unsubscribe&&this._retryTimer===void 0&&this._subscribe()}_subscribe(){if(this.demoView||!this.hass||!this._config?.room||this._unsubscribe||!this.isConnected)return;let e={type:`${le}/control/subscribe`,room:this._config.room};this._config.entry_id&&(e.entry_id=this._config.entry_id);let t=this.hass.connection.subscribeMessage(n=>{this._unsubscribe===t&&(n?.state==="starting"&&this._view?.state!=="starting"&&(this._from=this._lastActive&&this._lastActive!==n.activity?this._lastActive:void 0),n?.state==="active"&&n.activity&&(this._lastActive=n.activity),n?.state==="idle"&&(this._lastActive=void 0),this._view=n,this._loaded=!0,this._subscribeError=void 0)},e);this._unsubscribe=t,t.catch(n=>{this._unsubscribe===t&&(this._subscribeError=n?.message??String(n),this._loaded=!0,this._unsubscribe=void 0,this._retryTimer=window.setTimeout(()=>{this._retryTimer=void 0,this._subscribe()},Ct))})}_unsubscribeNow(){window.clearTimeout(this._retryTimer),this._retryTimer=void 0;let e=this._unsubscribe;this._unsubscribe=void 0,e?.then(t=>t()).catch(()=>{})}_resubscribe(){this._unsubscribeNow(),this._view=null,this._loaded=!1,this._subscribe()}_t(e,t){return C(this.hass?.language,e,t)}_call(e,t={}){if(!(!this.hass||!this._view)){if(this._haptic(),this.demoView){this.dispatchEvent(new CustomEvent("preview-call",{detail:{service:e,data:t}}));return}this.hass.callService(le,e,{room:this._view.room,...t}).catch(n=>this._toast(n?.message??String(n)))}}_send(e,t={}){this._call("send_command",{command:e,...t})}_haptic(){this.dispatchEvent(new CustomEvent("haptic",{detail:"light",bubbles:!0,composed:!0}))}_toast(e){this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:e},bubbles:!0,composed:!0}))}_pressStart(e,t,n={}){if(e.button!==0)return;this._pressEnd(!1);let s={command:t,extra:n,sent:!1};this._press=s,Tt.has(t)&&(this._repeatTimer=window.setTimeout(()=>{s.sent=!0,this._send(t,n),this._repeatTimer=window.setInterval(()=>this._send(t,n),zt)},Rt))}_pressEnd(e){let t=this._press;this._press=void 0,this._stopRepeat(),e&&t&&!t.sent&&this._send(t.command,t.extra)}_stopRepeat(){this._repeatTimer!==void 0&&(window.clearTimeout(this._repeatTimer),window.clearInterval(this._repeatTimer),this._repeatTimer=void 0)}_keySend(e,t,n={}){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._send(t,n))}render(){if(!this._config?.room)return a`<ha-card><div class="message">${this._t("no_room")}</div></ha-card>`;if(!this._loaded)return a`<ha-card><div class="message">${this._t("loading")}</div></ha-card>`;let e=this._view;return e?a`<ha-card>
      ${this._renderHeader(e)} ${this._renderStatus(e)} ${this._renderFlow(e)} ${this._renderNowPlaying()}
      ${this._renderActivities(e)}
      ${e.remote?this._renderRemote(e):u}
    </ha-card>`:a`<ha-card>
        <div class="message warning">
          ${this._subscribeError??this._t("not_found",{room:this._config.room})}
        </div>
      </ha-card>`}_renderHeader(e){let t=e.activities.find(o=>o.id===e.activity),n=e.state!=="idle",s=t?`${t.name} \xB7 ${this._t(`state.${e.state}`)}`:this._t(`state.${e.state}`);return a`<div class="header">
      <div class="title">
        <div class="name">${this._config?.name||e.name}</div>
        <div class="status state-${e.state}">${s}</div>
      </div>
      <button
        class="power ${n?"on":""} state-${e.state}"
        title=${this._t("power")}
        aria-label=${this._t("power")}
        @click=${()=>this._call("toggle_activity")}
      >
        <ha-icon .icon=${Pt[e.state]??"mdi:power"}></ha-icon>
      </button>
    </div>`}_renderFlow(e){if(this._config?.show_flow===!1||this.demoView)return u;let t=e.activity??e.default_activity??e.activities[0]?.id;if(!t)return u;let n=e.state==="starting"||e.state==="stopping",s=this._flowOpen??n,o=this._flowDetails??this._config?.flow_details===!0;return a`<div class="flow-bar">
        <button class="chip ${s?"on":""}" @click=${()=>this._flowOpen=!s}>
          <ha-icon icon="mdi:sitemap-outline"></ha-icon>${this._t("flow.show")}
        </button>
        ${s?a`<button class="chip ${o?"on":""}" @click=${()=>this._flowDetails=!o}>
              <ha-icon icon=${o?"mdi:eye-outline":"mdi:eye-off-outline"}></ha-icon>${this._t("flow.details")}
            </button>`:u}
      </div>
      ${s?a`<easy-av-control-flow
            class="live-flow"
            .hass=${this.hass}
            .roomId=${e.room}
            .entryId=${e.entry_id}
            .activityId=${t}
            .from=${e.state==="starting"?this._from:void 0}
            .live=${{state:e.state,current:e.current,activity:e.activity}}
            .details=${o}
          ></easy-av-control-flow>`:u}`}_renderStatus(e){let t=e.state==="starting"||e.state==="stopping",[n,s]=e.progress,o=s>0?Math.round(n/s*100):0,l=t?nt(e.current,Date.now(),(d,c)=>this._t(d,c)):void 0;return a`
      ${t?a`<div
            class="progress"
            role="progressbar"
            aria-label=${this._t(`state.${e.state}`)}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow=${o}
          >
            <div style="width: ${e.state==="starting"?o:100}%"></div>
          </div>`:u}
      ${l?a`<div class="doing" aria-live="polite">
            <span class="doing-text">${l.text}</span>
            ${l.time?a`<span class="doing-time">${l.time}</span>`:u}
          </div>`:u}
      ${(e.cooling??[]).map(d=>{let{text:c,time:p}=it(d,Date.now(),(h,f)=>this._t(h,f));return a`<div class="doing cooling">
          <span class="doing-text">${c}</span><span class="doing-time">${p}</span>
        </div>`})}
      ${e.state==="error"&&e.error?a`<div class="message error">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>${e.error}
          </div>`:u}
      ${e.warnings.length&&e.state!=="idle"?a`<details class="warnings">
            <summary>${this._t("warnings")} (${e.warnings.length})</summary>
            <ul>
              ${e.warnings.map(d=>a`<li>${d}</li>`)}
            </ul>
          </details>`:u}
    `}_nowPlaying(){let e=this._view?.remote?.media;return et(e?this.hass?.states[e]:void 0,Date.now())}_renderNowPlaying(){let e=this._nowPlaying();if(!e)return u;let t=[e.app,e.playing?void 0:this._t("now.paused")].filter(Boolean).join(" \xB7 ");return a`<div class="now">
      ${e.picture?a`<img
            class="art"
            src=${e.picture}
            alt=""
            @error=${n=>n.target.style.display="none"}
          />`:u}
      <div class="meta">
        ${t?a`<div class="now-top">${t}</div>`:u}
        <div class="now-title">${e.title}</div>
        ${e.subtitle?a`<div class="now-sub">${e.subtitle}</div>`:u}
        ${e.duration!==void 0&&e.position!==void 0?a`<div class="now-progress" role="progressbar" aria-valuemin="0"
                aria-valuemax=${Math.round(e.duration)} aria-valuenow=${Math.round(e.position)}>
                <div style="width: ${e.position/e.duration*100}%"></div>
              </div>
              <div class="now-time">
                <span>${j(e.position)}</span><span>${j(e.duration)}</span>
              </div>`:u}
      </div>
    </div>`}_renderActivities(e){return a`<div class="activities">
      ${e.activities.map(t=>{let n=t.id===e.activity;return a`<button
          class="chip ${n?`current state-${e.state}`:""}"
          aria-pressed=${n?"true":"false"}
          @click=${()=>this._call("start_activity",{activity:t.id})}
        >
          <ha-icon .icon=${t.icon??"mdi:play-circle-outline"}></ha-icon>
          <span>${t.name}</span>
        </button>`})}
    </div>`}_renderRemote(e){let{groups:t,buttons:n}=e.remote,s=t.navigation,o=s?St.filter(c=>s.commands.includes(c)):[],l=s?st(this._padChoice(e),s.touchpad===!0):!1,d=t.transport?Et.filter(c=>t.transport.commands.includes(c)):[];return d.includes("play_pause")&&(d=d.filter(c=>c!=="play"&&c!=="pause")),a`<div class="remote">
      ${t.volume||s||t.channels?a`<div class="main ${s?"":"no-nav"}">
            ${t.volume?this._renderVolumeRocker(t.volume):s?a`<div></div>`:u}
            ${s?l?this._renderTouchpad(s):this._renderDpad(s):u}
            ${t.channels?this._renderChannelRocker(t.channels):s?a`<div></div>`:u}
          </div>`:u}
      ${t.volume?.commands.includes("volume_set")?this._renderSlider(t.volume):u}
      ${s?a`<div class="row">
            ${o.map(c=>this._key(c))}${this._renderPadSwitch(e,l)}
          </div>`:u}
      ${d.length?a`<div class="row">${d.map(c=>this._key(c))}</div>`:u}
      ${n.length?a`<div class="buttons">${n.map(c=>this._customButton(c))}</div>`:u}
      ${e.remote.settings?.length?this._renderSettings(e,e.remote.settings):u}
    </div>`}_settingsShown(e){let t=ot(e);if(this._settingsOpen.has(t))return this._settingsOpen.get(t);try{return window.localStorage.getItem(t)==="open"}catch{return!1}}_toggleSettings(e){let t=ot(e),n=!this._settingsShown(e);this._settingsOpen.set(t,n);try{window.localStorage.setItem(t,n?"open":"closed")}catch{}this.requestUpdate()}_renderSettings(e,t){let n=this._settingsShown(e.room);return a`<div class="settings">
      <button
        class="settings-toggle"
        aria-expanded=${n?"true":"false"}
        @click=${()=>this._toggleSettings(e.room)}
      >
        <ha-icon icon="mdi:tune-variant"></ha-icon>
        <span>${this._t("settings")}</span>
        <ha-icon class="chevron" .icon=${n?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
      </button>
      ${n?a`<div class="setting-list">
            ${t.map((s,o)=>a`${o===0||t[o-1].device!==s.device?a`<span class="setting-device">${this._settingDevice(s)}</span>`:u}${this._renderSetting(s)}`)}
          </div>`:u}
    </div>`}_renderSetting(e){if(e.setting==="entity")return this._renderEntitySetting(e);let t=this.hass?.states[e.entity_id],n=e.attribute?t?.attributes[e.attribute]:void 0,s=n==null?void 0:String(n);return this._settingRow(e,this._t(`setting.${e.setting}`),this._settingSelect(e,this._t(`setting.${e.setting}`),s,e.options))}_settingDevice(e){return e.name||this.hass?.states[e.device_entity_id]?.attributes.friendly_name||e.device}_settingRow(e,t,n){return a`<div class="setting">
      <span class="setting-name">${t}</span>
      ${n}
    </div>`}_settingSelect(e,t,n,s,o=!1){let l=n!==void 0&&!s.includes(n)?[n,...s]:s;return a`<select
      aria-label=${`${t}, ${this._settingDevice(e)}`}
      .value=${k(n??"")}
      ?disabled=${o||!l.length}
      @change=${d=>{let c=d.target.value;c&&c!==n&&this._send(e.command,{device:e.device,value:c})}}
    >
      ${n===void 0?a`<option value="" disabled>–</option>`:u}
      ${l.map(d=>a`<option value=${d} ?selected=${d===n}>${d}</option>`)}
    </select>`}_renderEntitySetting(e){let t=this.hass?.states[e.entity_id],n=e.label||t?.attributes.friendly_name||e.entity_id,s=!t||t.state==="unavailable"||t.state==="unknown",o=e.entity_id.split(".")[0];if(o==="number"||o==="input_number"){let d=Number(t?.attributes.min??0),c=Number(t?.attributes.max??100),p=Number(t?.attributes.step??1),f=this._settingDrafts.get(e.entity_id)??(s?void 0:Number(t.state)),_=f===void 0||Number.isNaN(f)?"\u2013":`${d<0&&f>0?"+":""}${f}`;return this._settingRow(e,n,a`<span class="setting-range">
          <input
            type="range"
            aria-label=${`${n}, ${this._settingDevice(e)}`}
            min=${d}
            max=${c}
            step=${p}
            .value=${k(String(f??d))}
            ?disabled=${s}
            @input=${m=>{this._settingDrafts.set(e.entity_id,Number(m.target.value)),this.requestUpdate()}}
            @change=${m=>{this._settingDrafts.delete(e.entity_id),this._send(e.command,{device:e.device,value:Number(m.target.value)})}}
          />
          <span class="value">${_}</span>
        </span>`)}if(o==="select"||o==="input_select"){let d=Array.isArray(t?.attributes.options)?t.attributes.options.map(String):[];return this._settingRow(e,n,this._settingSelect(e,n,s?void 0:t.state,e.options.length?e.options:d,s))}let l=t?.state==="on";return this._settingRow(e,n,a`<button
        class="key toggle ${l?"active":""}"
        aria-label=${`${n}, ${this._settingDevice(e)}`}
        aria-pressed=${l?"true":"false"}
        ?disabled=${s}
        @click=${()=>this._send(e.command,{device:e.device,value:l?"off":"on"})}
      >
        ${this._t(l?"toggle.on":"toggle.off")}
      </button>`)}_key(e,t="key",n,s){let o=Ae(e,l=>this._t(l));return a`<button
      class=${t}
      title=${o}
      aria-label=${o}
      aria-pressed=${s===void 0?u:String(s)}
      @pointerdown=${l=>this._pressStart(l,e)}
      @pointerup=${()=>this._pressEnd(!0)}
      @pointerleave=${()=>this._pressEnd(!1)}
      @pointercancel=${()=>this._pressEnd(!1)}
      @keydown=${l=>this._keySend(l,e)}
      @contextmenu=${l=>l.preventDefault()}
    >
      ${n??a`<ha-icon .icon=${$e[e]??"mdi:circle-small"}></ha-icon>`}
    </button>`}_renderVolumeRocker(e){let t=this._volumeState(e).muted;return a`<div class="rocker">
      ${e.commands.includes("volume_up")?this._key("volume_up"):a`<span></span>`}
      ${e.commands.includes("mute")?this._key("mute",`key label ${t?"active":""}`,a`<ha-icon .icon=${t?"mdi:volume-off":"mdi:volume-high"}></ha-icon>`,t):a`<span class="label">${this._t("rocker.volume")}</span>`}
      ${e.commands.includes("volume_down")?this._key("volume_down"):a`<span></span>`}
    </div>`}_renderChannelRocker(e){return a`<div class="rocker">
      ${e.commands.includes("channel_up")?this._key("channel_up"):a`<span></span>`}
      <span class="label">${this._t("rocker.channels")}</span>
      ${e.commands.includes("channel_down")?this._key("channel_down"):a`<span></span>`}
    </div>`}_renderDpad(e){let t=s=>e.commands.includes(s),n=(s,o)=>t(s)?this._key(s,`key ${o}`,s==="ok"?"OK":void 0):a`<span></span>`;return a`<div class="dpad">
      <span></span>${n("up","up")}<span></span>
      ${n("left","left")}${n("ok","ok")}${n("right","right")}
      <span></span>${n("down","down")}<span></span>
    </div>`}_padChoice(e){if(!e.activity)return null;let t=xe(e.room,e.activity);if(this._padChoices.has(t))return this._padChoices.get(t);try{return window.localStorage.getItem(t)}catch{return null}}_renderPadSwitch(e,t){let n=this._t(t?"pad.show_arrows":"pad.show_touchpad");return a`<button
      class="key pad-switch"
      title=${n}
      aria-label=${n}
      @click=${()=>{if(!e.activity)return;let s=xe(e.room,e.activity),o=t?"off":"on";this._padChoices.set(s,o);try{window.localStorage.setItem(s,o)}catch{}this.requestUpdate()}}
    >
      <ha-icon .icon=${t?"mdi:arrow-all":"mdi:gesture-tap"}></ha-icon>
    </button>`}_renderTouchpad(e){let t=s=>e.commands.includes(s),n={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right",Enter:"ok"," ":"ok"};return a`<div
      class="touchpad"
      role="group"
      tabindex="0"
      aria-label=${this._t("touchpad")}
      title=${this._t("touchpad")}
      @pointerdown=${s=>{s.button===0&&(s.currentTarget.setPointerCapture(s.pointerId),this._swipe=new ae,this._swipe.start(s.clientX,s.clientY,s.timeStamp))}}
      @pointermove=${s=>{for(let o of this._swipe?.move(s.clientX,s.clientY)??[])t(o)&&this._send(o)}}
      @pointerup=${s=>{let o=this._swipe?.end(s.clientX,s.clientY,s.timeStamp);this._swipe=void 0,o&&t("ok")&&this._send("ok")}}
      @pointercancel=${()=>this._swipe=void 0}
      @keydown=${s=>{let o=n[s.key];o&&t(o)&&(s.preventDefault(),this._send(o))}}
      @contextmenu=${s=>s.preventDefault()}
    >
      <span class="touchpad-hint">${this._t("touchpad.hint")}</span>
    </div>`}_volumeState(e){let t=e.entity_id?this.hass?.states[e.entity_id]:void 0,n=t?.attributes.volume_level;return{level:typeof n=="number"?n:void 0,muted:t?.attributes.is_volume_muted===!0}}_renderSlider(e){let{level:t}=this._volumeState(e),n=this._volumeDraft??(t!==void 0?Math.round(t*100):0);return a`<div class="slider">
      <ha-icon icon="mdi:volume-medium"></ha-icon>
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        .value=${String(n)}
        ?disabled=${t===void 0}
        aria-label=${this._t("volume")}
        @input=${s=>{this._volumeDraft=Number(s.target.value)}}
        @change=${s=>{let o=Number(s.target.value);this._volumeDraft=void 0,this._send("volume_set",{value:o/100})}}
      />
      <span class="value">${t!==void 0||this._volumeDraft!==void 0?n:"\u2013"}</span>
    </div>`}_customButton(e){let t=e.name??Ae(e.command,s=>this._t(s)),n={};return e.device&&(n.device=e.device),e.value!==null&&e.value!==void 0&&(n.value=e.value),a`<button
      class="custom"
      title=${t}
      @pointerdown=${s=>this._pressStart(s,e.command,n)}
      @pointerup=${()=>this._pressEnd(!0)}
      @pointerleave=${()=>this._pressEnd(!1)}
      @pointercancel=${()=>this._pressEnd(!1)}
      @keydown=${s=>this._keySend(s,e.command,n)}
    >
      ${e.icon||$e[e.command]?a`<ha-icon .icon=${e.icon??$e[e.command]}></ha-icon>`:u}
      <span>${t}</span>
    </button>`}};F.properties={hass:{attribute:!1},demoView:{attribute:!1},_flowOpen:{state:!0},_flowDetails:{state:!0},_config:{state:!0},_view:{state:!0},_loaded:{state:!0},_subscribeError:{state:!0},_volumeDraft:{state:!0}},F.styles=v`
    .flow-bar {
      display: flex;
      gap: 6px;
      padding: 0 16px 8px;
    }
    .flow-bar .chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 10px 3px 8px;
      border-radius: 14px;
      border: 1px solid var(--divider-color);
      background: transparent;
      color: var(--secondary-text-color);
      font: inherit;
      font-size: 12px;
      cursor: pointer;
      --mdc-icon-size: 16px;
    }
    .flow-bar .chip.on {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }
    easy-av-control-flow.live-flow {
      display: block;
      padding: 0 12px 12px;
    }

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
  `;customElements.get("easy-av-control-card")||customElements.define("easy-av-control-card",F);function Dt(r,i){let e=r.entities?.[i]?.device_id,n=(e?r.devices?.[e]:void 0)?.identifiers?.find(([s])=>s===le);return n?n[1]:null}var de=window;de.customCards=de.customCards??[];de.customCards.some(r=>r.type==="easy-av-control-card")||de.customCards.push({type:"easy-av-control-card",name:"Easy AV Control Remote",description:"Remote control for an Easy AV Control room",preview:!0,documentationURL:"https://github.com/Ltek/easy-av-control#the-card",getEntitySuggestion:(r,i)=>{let e=Dt(r,i);return e?{config:{type:"custom:easy-av-control-card",room:e}}:null}});export{F as EasyAvControlRemoteCard,Dt as roomOfEntity};
