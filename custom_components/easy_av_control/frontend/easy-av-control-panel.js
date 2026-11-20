var ee=globalThis,te=ee.ShadowRoot&&(ee.ShadyCSS===void 0||ee.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ge=Symbol(),He=new WeakMap,V=class{constructor(s,e,t){if(this._$cssResult$=!0,t!==ge)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=s,this.t=e}get styleSheet(){let s=this.o,e=this.t;if(te&&s===void 0){let t=e!==void 0&&e.length===1;t&&(s=He.get(e)),s===void 0&&((this.o=s=new CSSStyleSheet).replaceSync(this.cssText),t&&He.set(e,s))}return s}toString(){return this.cssText}},Be=r=>new V(typeof r=="string"?r:r+"",void 0,ge),y=(r,...s)=>{let e=r.length===1?r[0]:s.reduce((t,i,n)=>t+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new V(e,r,ge)},Ge=(r,s)=>{if(te)r.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of s){let t=document.createElement("style"),i=ee.litNonce;i!==void 0&&t.setAttribute("nonce",i),t.textContent=e.cssText,r.appendChild(t)}},ve=te?r=>r:r=>r instanceof CSSStyleSheet?(s=>{let e="";for(let t of s.cssRules)e+=t.cssText;return Be(e)})(r):r;var{is:xt,defineProperty:kt,getOwnPropertyDescriptor:At,getOwnPropertyNames:St,getOwnPropertySymbols:Tt,getPrototypeOf:Et}=Object,ie=globalThis,We=ie.trustedTypes,Rt=We?We.emptyScript:"",Ot=ie.reactiveElementPolyfillSupport,I=(r,s)=>r,ye={toAttribute(r,s){switch(s){case Boolean:r=r?Rt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,s){let e=r;switch(s){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Ke=(r,s)=>!xt(r,s),Ue={attribute:!0,type:String,converter:ye,reflect:!1,useDefault:!1,hasChanged:Ke};Symbol.metadata??=Symbol("metadata"),ie.litPropertyMetadata??=new WeakMap;var x=class extends HTMLElement{static addInitializer(s){this._$Ei(),(this.l??=[]).push(s)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(s,e=Ue){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(s)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(s,e),!e.noAccessor){let t=Symbol(),i=this.getPropertyDescriptor(s,t,e);i!==void 0&&kt(this.prototype,s,i)}}static getPropertyDescriptor(s,e,t){let{get:i,set:n}=At(this.prototype,s)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let l=i?.call(this);n?.call(this,o),this.requestUpdate(s,l,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(s){return this.elementProperties.get(s)??Ue}static _$Ei(){if(this.hasOwnProperty(I("elementProperties")))return;let s=Et(this);s.finalize(),s.l!==void 0&&(this.l=[...s.l]),this.elementProperties=new Map(s.elementProperties)}static finalize(){if(this.hasOwnProperty(I("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(I("properties"))){let e=this.properties,t=[...St(e),...Tt(e)];for(let i of t)this.createProperty(i,e[i])}let s=this[Symbol.metadata];if(s!==null){let e=litPropertyMetadata.get(s);if(e!==void 0)for(let[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let i=this._$Eu(e,t);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(s){let e=[];if(Array.isArray(s)){let t=new Set(s.flat(1/0).reverse());for(let i of t)e.unshift(ve(i))}else s!==void 0&&e.push(ve(s));return e}static _$Eu(s,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof s=="string"?s.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(s=>this.enableUpdating=s),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(s=>s(this))}addController(s){(this._$EO??=new Set).add(s),this.renderRoot!==void 0&&this.isConnected&&s.hostConnected?.()}removeController(s){this._$EO?.delete(s)}_$E_(){let s=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(s.set(t,this[t]),delete this[t]);s.size>0&&(this._$Ep=s)}createRenderRoot(){let s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ge(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(s=>s.hostConnected?.())}enableUpdating(s){}disconnectedCallback(){this._$EO?.forEach(s=>s.hostDisconnected?.())}attributeChangedCallback(s,e,t){this._$AK(s,t)}_$ET(s,e){let t=this.constructor.elementProperties.get(s),i=this.constructor._$Eu(s,t);if(i!==void 0&&t.reflect===!0){let n=(t.converter?.toAttribute!==void 0?t.converter:ye).toAttribute(e,t.type);this._$Em=s,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(s,e){let t=this.constructor,i=t._$Eh.get(s);if(i!==void 0&&this._$Em!==i){let n=t.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:ye;this._$Em=i;let l=o.fromAttribute(e,n.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(s,e,t,i=!1,n){if(s!==void 0){let o=this.constructor;if(i===!1&&(n=this[s]),t??=o.getPropertyOptions(s),!((t.hasChanged??Ke)(n,e)||t.useDefault&&t.reflect&&n===this._$Ej?.get(s)&&!this.hasAttribute(o._$Eu(s,t))))return;this.C(s,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(s,e,{useDefault:t,reflect:i,wrapped:n},o){t&&!(this._$Ej??=new Map).has(s)&&(this._$Ej.set(s,o??e??this[s]),n!==!0||o!==void 0)||(this._$AL.has(s)||(this.hasUpdated||t||(e=void 0),this._$AL.set(s,e)),i===!0&&this._$Em!==s&&(this._$Eq??=new Set).add(s))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let s=this.scheduleUpdate();return s!=null&&await s,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[i,n]of t){let{wrapped:o}=n,l=this[i];o!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,n,l)}}let s=!1,e=this._$AL;try{s=this.shouldUpdate(e),s?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw s=!1,this._$EM(),t}s&&this._$AE(e)}willUpdate(s){}_$AE(s){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(s)),this.updated(s)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(s){return!0}update(s){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(s){}firstUpdated(s){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[I("elementProperties")]=new Map,x[I("finalized")]=new Map,Ot?.({ReactiveElement:x}),(ie.reactiveElementVersions??=[]).push("2.1.2");var we=globalThis,qe=r=>r,se=we.trustedTypes,Ye=se?se.createPolicy("lit-html",{createHTML:r=>r}):void 0,$e="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,xe="?"+k,Ct=`<${xe}>`,O=document,B=()=>O.createComment(""),G=r=>r===null||typeof r!="object"&&typeof r!="function",ke=Array.isArray,et=r=>ke(r)||typeof r?.[Symbol.iterator]=="function",be=`[ 	
\f\r]`,H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Fe=/-->/g,Qe=/>/g,E=RegExp(`>|${be}(?:([^\\s"'>=/]+)(${be}*=${be}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ze=/'/g,Xe=/"/g,tt=/^(?:script|style|textarea|title)$/i,Ae=r=>(s,...e)=>({_$litType$:r,strings:s,values:e}),a=Ae(1),si=Ae(2),ni=Ae(3),b=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),Je=new WeakMap,R=O.createTreeWalker(O,129);function it(r,s){if(!ke(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ye!==void 0?Ye.createHTML(s):s}var st=(r,s)=>{let e=r.length-1,t=[],i,n=s===2?"<svg>":s===3?"<math>":"",o=H;for(let l=0;l<e;l++){let d=r[l],c,u,m=-1,p=0;for(;p<d.length&&(o.lastIndex=p,u=o.exec(d),u!==null);)p=o.lastIndex,o===H?u[1]==="!--"?o=Fe:u[1]!==void 0?o=Qe:u[2]!==void 0?(tt.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=E):u[3]!==void 0&&(o=E):o===E?u[0]===">"?(o=i??H,m=-1):u[1]===void 0?m=-2:(m=o.lastIndex-u[2].length,c=u[1],o=u[3]===void 0?E:u[3]==='"'?Xe:Ze):o===Xe||o===Ze?o=E:o===Fe||o===Qe?o=H:(o=E,i=void 0);let f=o===E&&r[l+1].startsWith("/>")?" ":"";n+=o===H?d+Ct:m>=0?(t.push(c),d.slice(0,m)+$e+d.slice(m)+k+f):d+k+(m===-2?l:f)}return[it(r,n+(r[e]||"<?>")+(s===2?"</svg>":s===3?"</math>":"")),t]},W=class r{constructor({strings:s,_$litType$:e},t){let i;this.parts=[];let n=0,o=0,l=s.length-1,d=this.parts,[c,u]=st(s,e);if(this.el=r.createElement(c,t),R.currentNode=this.el.content,e===2||e===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(i=R.nextNode())!==null&&d.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let m of i.getAttributeNames())if(m.endsWith($e)){let p=u[o++],f=i.getAttribute(m).split(k),_=/([.?@])?(.*)/.exec(p);d.push({type:1,index:n,name:_[2],strings:f,ctor:_[1]==="."?oe:_[1]==="?"?re:_[1]==="@"?ae:P}),i.removeAttribute(m)}else m.startsWith(k)&&(d.push({type:6,index:n}),i.removeAttribute(m));if(tt.test(i.tagName)){let m=i.textContent.split(k),p=m.length-1;if(p>0){i.textContent=se?se.emptyScript:"";for(let f=0;f<p;f++)i.append(m[f],B()),R.nextNode(),d.push({type:2,index:++n});i.append(m[p],B())}}}else if(i.nodeType===8)if(i.data===xe)d.push({type:2,index:n});else{let m=-1;for(;(m=i.data.indexOf(k,m+1))!==-1;)d.push({type:7,index:n}),m+=k.length-1}n++}}static createElement(s,e){let t=O.createElement("template");return t.innerHTML=s,t}};function C(r,s,e=r,t){if(s===b)return s;let i=t!==void 0?e._$Co?.[t]:e._$Cl,n=G(s)?void 0:s._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,t)),t!==void 0?(e._$Co??=[])[t]=i:e._$Cl=i),i!==void 0&&(s=C(r,i._$AS(r,s.values),i,t)),s}var ne=class{constructor(s,e){this._$AV=[],this._$AN=void 0,this._$AD=s,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(s){let{el:{content:e},parts:t}=this._$AD,i=(s?.creationScope??O).importNode(e,!0);R.currentNode=i;let n=R.nextNode(),o=0,l=0,d=t[0];for(;d!==void 0;){if(o===d.index){let c;d.type===2?c=new M(n,n.nextSibling,this,s):d.type===1?c=new d.ctor(n,d.name,d.strings,this,s):d.type===6&&(c=new de(n,this,s)),this._$AV.push(c),d=t[++l]}o!==d?.index&&(n=R.nextNode(),o++)}return R.currentNode=O,i}p(s){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(s,t,e),e+=t.strings.length-2):t._$AI(s[e])),e++}},M=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(s,e,t,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=s,this._$AB=e,this._$AM=t,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let s=this._$AA.parentNode,e=this._$AM;return e!==void 0&&s?.nodeType===11&&(s=e.parentNode),s}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(s,e=this){s=C(this,s,e),G(s)?s===h||s==null||s===""?(this._$AH!==h&&this._$AR(),this._$AH=h):s!==this._$AH&&s!==b&&this._(s):s._$litType$!==void 0?this.$(s):s.nodeType!==void 0?this.T(s):et(s)?this.k(s):this._(s)}O(s){return this._$AA.parentNode.insertBefore(s,this._$AB)}T(s){this._$AH!==s&&(this._$AR(),this._$AH=this.O(s))}_(s){this._$AH!==h&&G(this._$AH)?this._$AA.nextSibling.data=s:this.T(O.createTextNode(s)),this._$AH=s}$(s){let{values:e,_$litType$:t}=s,i=typeof t=="number"?this._$AC(s):(t.el===void 0&&(t.el=W.createElement(it(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new ne(i,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(s){let e=Je.get(s.strings);return e===void 0&&Je.set(s.strings,e=new W(s)),e}k(s){ke(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,i=0;for(let n of s)i===e.length?e.push(t=new r(this.O(B()),this.O(B()),this,this.options)):t=e[i],t._$AI(n),i++;i<e.length&&(this._$AR(t&&t._$AB.nextSibling,i),e.length=i)}_$AR(s=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);s!==this._$AB;){let t=qe(s).nextSibling;qe(s).remove(),s=t}}setConnected(s){this._$AM===void 0&&(this._$Cv=s,this._$AP?.(s))}},P=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(s,e,t,i,n){this.type=1,this._$AH=h,this._$AN=void 0,this.element=s,this.name=e,this._$AM=i,this.options=n,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=h}_$AI(s,e=this,t,i){let n=this.strings,o=!1;if(n===void 0)s=C(this,s,e,0),o=!G(s)||s!==this._$AH&&s!==b,o&&(this._$AH=s);else{let l=s,d,c;for(s=n[0],d=0;d<n.length-1;d++)c=C(this,l[t+d],e,d),c===b&&(c=this._$AH[d]),o||=!G(c)||c!==this._$AH[d],c===h?s=h:s!==h&&(s+=(c??"")+n[d+1]),this._$AH[d]=c}o&&!i&&this.j(s)}j(s){s===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,s??"")}},oe=class extends P{constructor(){super(...arguments),this.type=3}j(s){this.element[this.name]=s===h?void 0:s}},re=class extends P{constructor(){super(...arguments),this.type=4}j(s){this.element.toggleAttribute(this.name,!!s&&s!==h)}},ae=class extends P{constructor(s,e,t,i,n){super(s,e,t,i,n),this.type=5}_$AI(s,e=this){if((s=C(this,s,e,0)??h)===b)return;let t=this._$AH,i=s===h&&t!==h||s.capture!==t.capture||s.once!==t.once||s.passive!==t.passive,n=s!==h&&(t===h||i);i&&this.element.removeEventListener(this.name,this,t),n&&this.element.addEventListener(this.name,this,s),this._$AH=s}handleEvent(s){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,s):this._$AH.handleEvent(s)}},de=class{constructor(s,e,t){this.element=s,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(s){C(this,s)}},nt={M:$e,P:k,A:xe,C:1,L:st,R:ne,D:et,V:C,I:M,H:P,N:re,U:ae,B:oe,F:de},Pt=we.litHtmlPolyfillSupport;Pt?.(W,M),(we.litHtmlVersions??=[]).push("3.3.3");var ot=(r,s,e)=>{let t=e?.renderBefore??s,i=t._$litPart$;if(i===void 0){let n=e?.renderBefore??null;t._$litPart$=i=new M(s.insertBefore(B(),n),n,void 0,e??{})}return i._$AI(r),i};var Se=globalThis,g=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let s=super.createRenderRoot();return this.renderOptions.renderBefore??=s.firstChild,s}update(s){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(s),this._$Do=ot(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return b}};g._$litElement$=!0,g.finalized=!0,Se.litElementHydrateSupport?.({LitElement:g});var jt=Se.litElementPolyfillSupport;jt?.({LitElement:g});(Se.litElementVersions??=[]).push("4.2.2");var rt="https://github.com/Ltek/easy-av-control#readme",dt="easy-av-control-guide-open",at={en:{title:"Guide",steps_title:"How it works",steps:[a`<b>Add the devices</b> of the room under <i>Devices</i>: pick each device's entity. If it hangs on a
        switchable outlet, enter it under <i>Power</i>. If it loses its connection without power (Apple TV), use
        the recommended button under <i>Connection check</i>.`,a`<b>Put together activities</b> under <i>Activities</i>: choose the devices in the order they are
        switched on, and under <i>Start sequence</i> for example the TV's input. Quick-select buttons start apps.`,a`<b>Save and add the card:</b> save at the top right. On a dashboard, add a card, search for
        <i>Easy AV Control Remote</i> and choose the room.`],terms_title:"Terms",terms:[["Outlet","Switch that powers the device. Switched on first and off last; outlets shared by several devices stay on while one of them is needed."],["Boot time","Wait after the outlet came on, before the device is switched on. Only when the outlet was off."],["Waiting times","After switching on: until the device accepts commands. After switching off: cool-down, e.g. for a projector lamp."],["Connection check","Waits until the device is reachable in Home Assistant, at the start and before remote buttons; can reload its integration until it connects."],["Start sequence","Settings once all devices are on: input, volume, sound mode, any action."],["Remote control","Which device gets volume, channels, playback and arrow keys. Automatic: volume to the first media player, the rest to the last."],["Quick select","Buttons that switch a media player to a source, on an Apple TV to an app."],["Settings in the card","On a device: source, sound mode and entities such as tone controls, changeable in the card in every activity that uses it; automatic or chosen with favourites. An activity can choose its own."]],example_title:"Example: TV and Apple TV",example:[a`Device <i>TV</i>: entity <code>media_player.tv</code>, outlet <code>switch.tv_outlet</code>, boot time
        15 s, wait after switching on 10 s.`,a`Device <i>Apple TV</i>: entity <code>media_player.apple_tv</code>, under <i>Connection check</i> the
        button <i>Use remote.apple_tv for the connection check and the arrow keys</i>.`,a`Activity <i>Apple TV</i>: devices TV, then Apple TV; start sequence <i>Set source</i> on the TV to its
        HDMI input; quick select Apple TV with Netflix.`,a`Save, add the card, start the activity.`],docs:a`All options and the YAML reference: <a href=${rt} target="_blank" rel="noreferrer">documentation on GitHub</a>.`},de:{title:"Anleitung",steps_title:"So geht's",steps:[a`<b>Geräte anlegen</b> unter <i>Geräte</i>: Für jedes Gerät die Entität wählen. Hängt es an einer
        schaltbaren Steckdose, diese unter <i>Strom</i> eintragen. Verliert es ohne Strom die Verbindung (Apple
        TV), unter <i>Verbindung prüfen</i> den empfohlenen Knopf nutzen.`,a`<b>Aktivitäten zusammenstellen</b> unter <i>Aktivitäten</i>: die Geräte in Einschaltreihenfolge wählen,
        unter <i>Ablauf beim Start</i> zum Beispiel den Eingang des TV. Schnellwahl-Tasten starten Apps.`,a`<b>Speichern und Card einfügen:</b> oben rechts speichern. Im Dashboard eine Karte hinzufügen,
        <i>Easy AV Control Remote</i> suchen und den Raum wählen.`],terms_title:"Begriffe",terms:[["Steckdose","Schalter, an dem das Ger\xE4t h\xE4ngt. Wird zuerst ein- und zuletzt ausgeschaltet; gemeinsame Steckdosen mehrerer Ger\xE4te bleiben an, solange eines davon gebraucht wird."],["Startzeit","Wartezeit nach dem Einschalten der Steckdose, bevor das Ger\xE4t eingeschaltet wird. Nur wenn die Steckdose aus war."],["Wartezeiten","Nach dem Einschalten: bis das Ger\xE4t Befehle annimmt. Nach dem Ausschalten: Abk\xFChlzeit, z. B. f\xFCr eine Beamer-Lampe."],["Verbindung pr\xFCfen","Wartet, bis das Ger\xE4t in Home Assistant erreichbar ist, beim Start und vor Tasten der Fernbedienung; kann seine Integration neu laden, bis sie verbunden ist."],["Ablauf beim Start","Einstellungen, sobald alle Ger\xE4te an sind: Eingang, Lautst\xE4rke, Klangmodus, beliebige Aktion."],["Fernbedienung","Welches Ger\xE4t Lautst\xE4rke, Sender, Wiedergabe und Pfeiltasten bekommt. Automatisch: Lautst\xE4rke an den ersten Mediaplayer, der Rest an den letzten."],["Schnellwahl","Tasten, die einen Mediaplayer auf eine Quelle schalten, beim Apple TV auf eine App."],["Einstellungen in der Karte","Am Ger\xE4t: Quelle, Klangmodus und Entit\xE4ten wie Klangregler, in der Karte \xE4nderbar in jeder Aktivit\xE4t, die es nutzt; automatisch oder ausgew\xE4hlt mit Favoriten. Eine Aktivit\xE4t kann eigene w\xE4hlen."]],example_title:"Beispiel: TV und Apple TV",example:[a`Gerät <i>TV</i>: Entität <code>media_player.tv</code>, Steckdose <code>switch.steckdose_tv</code>,
        Startzeit 15 s, Warten nach Einschalten 10 s.`,a`Gerät <i>Apple TV</i>: Entität <code>media_player.apple_tv</code>, unter <i>Verbindung prüfen</i> der
        Knopf <i>remote.apple_tv für Verbindungsprüfung und Pfeiltasten nutzen</i>.`,a`Aktivität <i>Apple TV</i>: Geräte TV, dann Apple TV; Ablauf beim Start <i>Quelle wählen</i> am TV auf
        den HDMI-Eingang; Schnellwahl Apple TV mit Netflix.`,a`Speichern, Card einfügen, Aktivität starten.`],docs:a`Alle Optionen und die YAML-Referenz: <a href=${rt} target="_blank" rel="noreferrer">Dokumentation auf GitHub</a>.`}};function Dt(){try{return window.localStorage.getItem(dt)==="1"}catch{return!1}}function zt(r){try{window.localStorage.setItem(dt,r?"1":"0")}catch{}}var U=class extends g{render(){let s=(this.language??"en").split("-")[0],e=at[s]??at.en;return a`<details
      ?open=${Dt()}
      @toggle=${t=>zt(t.target.open)}
    >
      <summary><ha-icon icon="mdi:help-circle-outline"></ha-icon><span>${e.title}</span></summary>
      <div class="body">
        <h3>${e.steps_title}</h3>
        <ol>
          ${e.steps.map(t=>a`<li>${t}</li>`)}
        </ol>
        <h3>${e.terms_title}</h3>
        <dl>
          ${e.terms.map(([t,i])=>a`<dt>${t}</dt><dd>${i}</dd>`)}
        </dl>
        <h3>${e.example_title}</h3>
        <ol>
          ${e.example.map(t=>a`<li>${t}</li>`)}
        </ol>
        <p>${e.docs}</p>
      </div>
    </details>`}};U.properties={language:{}},U.styles=y`
    :host {
      display: block;
      margin-bottom: 16px;
    }
    details {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: var(--card-background-color);
    }
    summary {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      cursor: pointer;
      font-weight: 500;
      color: var(--primary-color);
    }
    .body {
      padding: 0 16px 16px;
      line-height: 1.5;
    }
    h3 {
      font-size: 1em;
      font-weight: 500;
      margin: 12px 0 4px;
    }
    ol {
      margin: 0;
      padding-left: 22px;
    }
    li {
      margin-bottom: 6px;
    }
    dl {
      margin: 0;
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: 4px 16px;
    }
    dt {
      font-weight: 500;
    }
    dd {
      margin: 0;
      color: var(--secondary-text-color);
    }
    @media (max-width: 600px) {
      dl {
        grid-template-columns: 1fr;
      }
      dd {
        margin-bottom: 6px;
      }
    }
    code {
      font-size: 0.9em;
      overflow-wrap: anywhere;
    }
    a {
      color: var(--primary-color);
    }
  `;customElements.get("easy-av-control-guide")||customElements.define("easy-av-control-guide",U);var lt=["power_on","power_off","set_source","set_volume","set_sound_mode","set_brightness","set_color_temp","set_position","set_tilt","call_action","delay","wait_available"],j=["volume","channels","transport","navigation"],Te={number:{min:0,max:3600,step:1,mode:"box",unit_of_measurement:"s"}},Ee={number:{min:0,max:100,step:1,mode:"slider"}};function K(r,s,e,t="source_list"){if(!e)return[];let i=r.states[e]?.attributes[t];return Array.isArray(i)&&i.length?i.map(String):s[e]??[]}function Re(r,s,e){return K(r,s,e,"source_list")}var Oe=["source","sound_mode"],ct=["number","input_number","select","input_select","switch","input_boolean"],Ce={source:"source_list",sound_mode:"sound_mode_list"};function Pe(r,s,e,t,i={}){let n=s.devices?.[e]?.entity_id;if(!n)return[];let o=[];if(n.startsWith("media_player."))for(let l of Oe){let d=Ce[l];K(r,t[d]??{},n,d).length&&o.push({device:e,setting:l})}for(let l of i[n]??[])o.push({device:e,entity:l});return o}function Mt(r,s,e,t,i={}){let n=s.devices?.[e]?.settings;return Array.isArray(n)?n.map(o=>({...o,device:e})):Pe(r,s,e,t,i)}function ut(r,s,e,t,i={}){return(e.devices??[]).flatMap(n=>Mt(r,s,n,t,i))}function q(r){return typeof r=="object"&&r!==null&&"source"in r}function ht(r,s,e,t,i={},n={}){let l={name:"device",required:!0,selector:{select:{options:Object.entries(s.devices??{}).map(([u,m])=>({value:u,label:m.name?`${m.name} (${u})`:u})),mode:"dropdown"}}},d=e.device?s.devices?.[e.device]?.entity_id:void 0;return[...{power_on:[l],power_off:[l],set_source:[l,{name:"source",required:!0,selector:{select:{options:Re(r,i,d),custom_value:!0,mode:"dropdown"}}}],set_volume:[l,{name:"volume_level",required:!0,selector:{number:{min:0,max:1,step:.01,mode:"slider"}}}],set_sound_mode:[l,{name:"sound_mode",required:!0,selector:{select:{options:K(r,n,d,"sound_mode_list"),custom_value:!0,mode:"dropdown"}}}],set_brightness:[l,{name:"brightness_pct",selector:Ee},{name:"color_temp_kelvin",selector:{color_temp:{unit:"kelvin",min:2e3,max:6500}}},{name:"transition",selector:Te}],set_color_temp:[l,{name:"color_temp_kelvin",required:!0,selector:{color_temp:{unit:"kelvin",min:2e3,max:6500}}}],set_position:[l,{name:"position",required:!0,selector:Ee}],set_tilt:[l,{name:"tilt_position",required:!0,selector:Ee}],call_action:[{name:"action",required:!0,selector:{text:{}}},{name:"target",selector:{target:{}}},{name:"data",selector:{object:{}}}],delay:[],wait_available:[{...l,required:!1},{name:"entity_id",selector:{entity:{}}},{name:"timeout",selector:Te},{name:"reload_integration",selector:{boolean:{}}},{name:"on_timeout",selector:{select:{options:[{value:"abort",label:t("on_timeout_abort")},{value:"continue",label:t("on_timeout_continue")}],mode:"dropdown"}}}]}[e.type]??[],{name:"delay_after",selector:Te}]}function v(r,s=[]){let e={};for(let[t,i]of Object.entries(r))if(s.includes(t))e[t]=i;else{if(i==null||i==="")continue;if(Array.isArray(i)&&i.length===0)continue;if(typeof i=="object"&&!Array.isArray(i)&&Object.keys(i).length===0)continue;e[t]=i}return e}function le(r){let s=j.filter(e=>r[e]===null);return Array.isArray(r.settings)&&s.push("settings"),v(r,s)}function D(r){return r.normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/ß/g,"ss").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")}function A(r,s){let e=new Set(s),t=r||"item";if(!e.has(t))return t;let i=2;for(;e.has(`${t}_${i}`);)i+=1;return`${t}_${i}`}function je(r,s){let e=[];for(let[t,i]of Object.entries(r.activities??{}))((i.devices??[]).includes(s)||(i.steps??[]).some(o=>o.device===s)||j.some(o=>i.remote?.[o]===s)||(i.remote?.buttons??[]).some(o=>typeof o=="object"&&o?.device===s))&&e.push(i.name??t);return e}function De(r,s,e){let t={};for(let[o,l]of Object.entries(r.devices??{}))t[o===s?e:o]=l;let i=o=>o===s?e:o,n={};for(let[o,l]of Object.entries(r.activities??{})){let d=l.remote?{...l.remote}:void 0;if(d){for(let c of j)c in d&&(d[c]=i(d[c]));Array.isArray(d.buttons)&&(d.buttons=d.buttons.map(c=>typeof c=="object"&&c?{...c,device:i(c.device)}:c))}n[o]=v({...l,devices:l.devices?.map(c=>i(c)),steps:l.steps?.map(c=>c.device===s?{...c,device:e}:c),remote:d})}return{...r,devices:t,activities:n}}var ce={en:{"state.idle":"Off","state.starting":"Starting \u2026","state.active":"On","now.paused":"Paused","state.stopping":"Stopping \u2026","state.error":"Error",power:"On/off",loading:"Loading \u2026",not_found:'Room "{room}" not found',no_room:"Pick a room in the card settings",warnings:"Warnings",volume:"Volume","command.volume_up":"Volume up","command.volume_down":"Volume down","command.mute":"Mute","command.volume_set":"Volume slider","command.select_source":"Select source","command.select_sound_mode":"Select sound mode","command.channel_up":"Channel up","command.channel_down":"Channel down","command.play_pause":"Play/pause","command.play":"Play","command.pause":"Pause","command.stop":"Stop","command.next":"Next","command.previous":"Previous","command.up":"Up","command.down":"Down","command.left":"Left","command.right":"Right","command.ok":"OK","command.back":"Back","command.menu":"Menu","command.home":"Home","command.info":"Info","command.guide":"Guide","command.exit":"Exit","editor.room":"Room","editor.name":"Title (optional)","doing.power_on":"Switching the outlets on","doing.power_off":"Switching the outlets off","doing.boot":"{name} is booting","doing.reload":"Reconnecting {name}","doing.ready":"Waiting for {name}","doing.turn_on":"Switching on {name}","doing.warm_up":"{name} is starting up","doing.status_on":"Waiting for {name} to be on","doing.status_on_value":"{name}: {value}","doing.status_off":"Waiting for {name} to be off","doing.status_off_value":"{name}: {value}","doing.turn_off":"Switching off {name}","doing.step":"Step {step} of {steps}: {what}","doing.wait":"Step {step} of {steps}: waiting","doing.hooks_on_start":"Waiting for the actions on start","doing.hooks_on_stop":"Waiting for the actions on stop","doing.left":"{time} left","doing.at_most":"at most {time}","cooling.text":"Cooling down: {names}","cooling.time":"power off in {time}","cooling.time_status":"power off once they are off, at most {time}",touchpad:"Touch surface: swipe for the arrow keys, tap for OK","touchpad.hint":"Swipe \xB7 tap for OK","rocker.volume":"VOL","rocker.channels":"CH","pad.show_arrows":"Show arrow keys","pad.show_touchpad":"Show touch surface",settings:"Settings","setting.source":"Source","setting.sound_mode":"Sound mode","toggle.on":"On","toggle.off":"Off","step.power_on":"Switch on","step.power_off":"Switch off","step.set_source":"Set source","step.set_volume":"Set volume","step.set_sound_mode":"Set sound mode","step.set_brightness":"Set brightness","step.set_color_temp":"Set color temperature","step.set_position":"Set cover position","step.set_tilt":"Set cover tilt","step.call_action":"Run action","step.delay":"Wait","step.wait_available":"Wait until available"},de:{"state.idle":"Aus","state.starting":"Startet \u2026","state.active":"An","now.paused":"Pausiert","state.stopping":"Stoppt \u2026","state.error":"Fehler",power:"Ein/Aus",loading:"L\xE4dt \u2026",not_found:"Raum \u201E{room}\u201C nicht gefunden",no_room:"Bitte in den Karteneinstellungen einen Raum w\xE4hlen",warnings:"Warnungen",volume:"Lautst\xE4rke","command.volume_up":"Lauter","command.volume_down":"Leiser","command.mute":"Stumm","command.volume_set":"Lautst\xE4rkeregler","command.select_source":"Quelle w\xE4hlen","command.select_sound_mode":"Klangmodus w\xE4hlen","command.channel_up":"Kanal hoch","command.channel_down":"Kanal runter","command.play_pause":"Wiedergabe/Pause","command.play":"Wiedergabe","command.pause":"Pause","command.stop":"Stopp","command.next":"Weiter","command.previous":"Zur\xFCck","command.up":"Hoch","command.down":"Runter","command.left":"Links","command.right":"Rechts","command.ok":"OK","command.back":"Zur\xFCck","command.menu":"Men\xFC","command.home":"Start","command.info":"Info","command.guide":"EPG","command.exit":"Beenden","editor.room":"Raum","editor.name":"Titel (optional)","doing.power_on":"Steckdosen werden eingeschaltet","doing.power_off":"Steckdosen werden ausgeschaltet","doing.boot":"{name} bootet","doing.reload":"{name} wird neu verbunden","doing.ready":"Warte auf {name}","doing.turn_on":"{name} wird eingeschaltet","doing.warm_up":"{name} f\xE4hrt hoch","doing.status_on":"Warte, bis {name} an ist","doing.status_on_value":"{name}: {value}","doing.status_off":"Warte, bis {name} aus ist","doing.status_off_value":"{name}: {value}","doing.turn_off":"{name} wird ausgeschaltet","doing.step":"Schritt {step} von {steps}: {what}","doing.wait":"Schritt {step} von {steps}: warten","doing.hooks_on_start":"Warte auf die Aktionen beim Start","doing.hooks_on_stop":"Warte auf die Aktionen beim Stopp","doing.left":"noch {time}","doing.at_most":"h\xF6chstens noch {time}","cooling.text":"Abk\xFChlen: {names}","cooling.time":"Strom aus in {time}","cooling.time_status":"Strom aus, sobald sie aus sind, h\xF6chstens noch {time}",touchpad:"Touchfl\xE4che: wischen f\xFCr die Pfeiltasten, tippen f\xFCr OK","touchpad.hint":"Wischen \xB7 Tippen f\xFCr OK","rocker.volume":"VOL","rocker.channels":"CH","pad.show_arrows":"Pfeiltasten zeigen","pad.show_touchpad":"Touchfl\xE4che zeigen",settings:"Einstellungen","setting.source":"Quelle","setting.sound_mode":"Klangmodus","toggle.on":"An","toggle.off":"Aus","step.power_on":"Einschalten","step.power_off":"Ausschalten","step.set_source":"Quelle w\xE4hlen","step.set_volume":"Lautst\xE4rke setzen","step.set_sound_mode":"Klangmodus w\xE4hlen","step.set_brightness":"Helligkeit setzen","step.set_color_temp":"Farbtemperatur setzen","step.set_position":"Rollladen-Position setzen","step.set_tilt":"Lamellen-Neigung setzen","step.call_action":"Aktion ausf\xFChren","step.delay":"Warten","step.wait_available":"Auf Verf\xFCgbarkeit warten"}};function N(r,s,e={}){let t=(r??"en").split("-")[0],n=(t in ce?ce[t]:ce.en)[s]??ce.en[s]??s;for(let[o,l]of Object.entries(e))n=n.replace(`{${o}}`,l);return n}var mt={en:{title:"Easy AV Control",rooms:"Rooms",add_room:"Add room",no_rooms:"No rooms yet.",room_name:"Name",room_area:"Area",room_default_activity:"Default activity",default_last:"Last used","helper.default_activity":"What the room's on/off switch and toggle_activity start, e.g. from a wall button.",room_id_hint:"ID {id}",delete_room:"Delete room",delete_room_confirm:'Delete room "{name}" with all devices and activities?',tab_devices:"Devices",tab_activities:"Activities",tab_yaml:"YAML",add_device:"Add device",add_activity:"Add activity",delete:"Delete",move_up:"Move up",move_down:"Move down",device_id:"Device ID",device_in_use:'Device "{id}" is used by: {where}. Remove it there first.',activity_id_hint:"ID {id} \u2013 part of the entity IDs, cannot be changed",new_activity:"New activity",add_device_to_activity:"Add device \u2026",steps:"Start sequence",add_step:"Add step \u2026",hooks:"Actions on start and stop",remote:"Remote control",quick_select:"Quick select",quick_select_hint:"Buttons that switch a media player to a source; on an Apple TV the sources are its apps.",quick_select_no_player:"Add a media player to this activity first.",add_quick_select:"Add quick select",card_settings:"Settings in the card",card_settings_hint:"Source, sound mode and other settings of the devices, changeable in the card while the activity runs: those set on the devices, or a choice for this activity only. The section is closed until it is opened; each browser remembers that.","setting.entity":"Entity of the device","field.entity":"Entity","helper.entity":"A number (slider), select (list) or switch (on/off key), e.g. the receiver's bass.","field.settings_mode":"Show",settings_auto:"From the devices",settings_chosen:"Chosen here, with favourites",settings_auto_shows:"The card shows: {list}.",settings_auto_none:"The devices of this activity offer no settings yet. Choose them on a device, or start the activity once so its media players report their lists.",device_settings_hint:"What the card offers of this device, in every activity that uses it. Automatic: source and sound mode of a media player, and the number and select entities of the same device.",device_settings_auto:"Automatic",device_settings_auto_none:"Nothing found yet: no source or sound mode list reported, and no number or select entities of the same device.",device_settings_none:"The card shows no settings of this device.",settings_none:"The card shows no settings for this activity.",add_setting:"Add setting","field.setting":"Setting","field.options":"Favourites (optional)","helper.options":"Only these in the card, in this order; empty: the device's whole list.",commands:"Own commands",save:"Save",discard:"Discard",saving:"Saving \u2026",saved:"Saved",unsaved:"Unsaved changes",reload:"Reload",reload_confirm:"Discard your unsaved changes and load the saved configuration?",retry:"Try again",save_anyway:"Save anyway",conflict:"The configuration was changed elsewhere. Reload it \u2013 your unsaved changes here are lost.",invalid:"Not saved \u2013 {path}: {message}",missing:"These entities do not exist in Home Assistant:",missing_hint:"A device without power usually stays known. Most likely a typo or a renamed entity.",loading:"Loading \u2026",load_error:"Could not load the configuration: {error}",route_auto:"Automatic",route_none:"Hide",devices_intro:"Every device of the room that Easy AV Control switches or controls: TV, projector, receiver, player.",devices_empty:"No devices yet.",new_device:"New device",no_entity:"No entity chosen",entity_missing:"Entity not found in Home Assistant",used_by:"Used by: {where}",section_device:"Device",hint_device:"The Home Assistant entity of the device, usually a media player.",section_power:"Power",hint_power:"Optional. The outlet that powers the device. It is switched on before the device and off after it.",section_delays:"Waiting times",hint_delays:"How long Easy AV Control waits for this device.",section_ready:"Connection check",hint_ready:"Waits until the device is reachable in Home Assistant, before switching it on and before remote buttons. For devices that lose their connection without power, such as an Apple TV.",ready_preset:"Use {entity} for the connection check and the arrow keys (recommended for Apple TV)",section_advanced:"Advanced",hint_device_advanced:"The device ID is used in the YAML configuration. Own commands map a button name to Home Assistant actions, e.g. arrow keys for a receiver box.",activities_intro:'An activity combines devices for one use, e.g. "Apple TV" = TV and Apple TV. Starting it switches on what it needs and off what it does not.',activities_empty:"No activities yet.",no_devices:"No devices",needs_devices:"Add the devices of this room first.",section_general:"General",hint_general:"Name and icon appear in the card. Position sorts the activities.",section_activity_devices:"Devices",hint_activity_devices:"Switched on in this order.",hint_steps:"Run once all devices are on, e.g. switch the TV to its HDMI input or set the volume.",hint_remote:"Which device gets which buttons of the card. Automatic suits most setups.",hint_activity_advanced:"Extra buttons and commands in YAML, and Home Assistant actions on start and stop.",yaml_intro:"The whole room as YAML. Changes here and in the forms are the same configuration.",add_room_name:"Name of the new room",create:"Add",cancel:"Cancel","helper.power_switch":"Shared outlets stay on while any device on them is needed.","helper.delay_after_power":"How long the device needs after the outlet came on. Only waited when the outlet was off.","helper.delay_after_on":"Until the device accepts commands. Only when it was switched on.","helper.delay_after_off":"Cool-down before the next device or the outlet is switched off, e.g. 180 s for a projector.","helper.ready_entity":"E.g. the remote of an Apple TV, which is on only while it is connected.","helper.ready_reload":"Skips the waiting time of an integration that retries its connection.","helper.source":"The list shows what the device reported last, so it must have been on once. A name can also be typed in.","field.entity_id":"Entity","field.name":"Display name","field.power_switch":"Power outlet","field.remote_entity":"Remote (optional)","helper.remote_entity":"Arrow keys, OK, back, home and menu of the card go to this remote entity, e.g. the remote of an Apple TV.","field.delay_after_power":"Boot time (s)","field.delay_after_on":"Wait after switching on (s)","field.delay_after_off":"Wait after switching off (s)","field.ready_enabled":"Wait until available before switching on","field.ready_entity":"Check this entity instead (optional)","field.ready_state":"Wait for state (optional, e.g. on)","field.ready_timeout":"Timeout (s)","field.ready_reload":"Reload its integration","field.ready_on_timeout":"On timeout","field.commands":"Own commands (YAML: name \u2192 actions)","field.icon":"Icon","field.order":"Position","field.on_start":"On start","field.on_stop":"On stop","field.volume":"Volume","field.channels":"Channels","field.transport":"Playback","field.navigation":"Navigation","field.touchpad":"Touch surface","helper.touchpad":"A swipe area instead of the arrow keys in the card. Automatic: for navigation that goes to a remote entity, e.g. an Apple TV.",touchpad_auto:"Automatic",touchpad_on:"On",touchpad_off:"Off (arrow keys)","field.buttons":"Extra buttons (YAML list)","field.label":"Label (optional, default: the source)","field.activity_commands":"Commands of this activity (YAML: name \u2192 actions)","field.type":"Type","field.device":"Device","field.source":"Source","field.volume_level":"Volume","field.sound_mode":"Sound mode","field.brightness_pct":"Brightness (%)","field.color_temp_kelvin":"Color temperature (K)","field.transition":"Transition (s)","field.position":"Position (%)","field.tilt_position":"Tilt (%)","field.action":"Action (e.g. script.turn_on)","field.data":"Data","field.target":"Target","field.timeout":"Timeout (s)","field.reload_integration":"Reload its integration","field.on_timeout":"On timeout","field.delay_after":"Wait afterwards (s)",on_timeout_abort:"Abort the start",on_timeout_continue:"Continue","step.power_on":"Switch on","step.power_off":"Switch off","step.set_source":"Set source","step.set_volume":"Set volume","step.set_sound_mode":"Set sound mode","step.set_brightness":"Set brightness","step.set_color_temp":"Set color temperature","step.set_position":"Set cover position","step.set_tilt":"Set cover tilt","step.call_action":"Call action","step.delay":"Wait","step.wait_available":"Wait until available",section_remote_preview:"Remote control preview",hint_remote_preview:"The card as it looks while this activity runs, with the settings above, also before saving. Tap a button to see where it goes; nothing is sent.","preview.tap":"Tap a button to see which device gets it and what runs there.","preview.this_activity":"this activity","preview.device_commands":"own command of the device: {actions}","preview.activity_commands":"own command of the activity: {actions}","preview.unknown":"does nothing: no device of this activity handles it","preview.unknown_on_device":"does nothing: {device} cannot handle it","preview.ready":"Checks the connection first and restores it if needed.","preview.dead":"These buttons are shown but do nothing:","preview.groups":"Button groups","preview.mode_auto":"automatic","preview.mode_set":"chosen","preview.hidden":"hidden","preview.no_device":"no suitable device, not shown","preview.no_keys":"not shown: {device} has none of these buttons",section_flow:"Flow: what is switched when",hint_flow:"Computed from the settings of this activity and its devices, also before saving. Times count only the configured waits; how long the devices take to respond comes on top.","flow.mode_start":"Start","flow.mode_stop":"Stop","flow.from_label":"Starting from","flow.from_idle":"from idle (everything off)","flow.from":"switching from {activity}","flow.failed":"Could not compute the flow: {error}","flow.invalid":"No flow while the configuration has an error \u2013 {error}","flow.state_starting":"Room: starting","flow.state_active":"Room: active","flow.state_stopping":"Room: stopping","flow.state_idle":"Room: off","flow.outlets_on":"Switch on the outlets, all at once: {outlets}","flow.outlets_off":"Switch off the outlets: {outlets}","flow.outlets_off_later":"Switch off the outlet after its cool-down: {outlets}","flow.outlet_keep":"{outlet} stays on, this activity needs it","flow.outlets_already_on":"already on: {outlets}","flow.unless_rooms":"not while {rooms} uses it","flow.on_start":"Actions on start begin","flow.on_start_wait":"Wait until the actions on start are done","flow.on_stop":"Actions on stop begin","flow.on_stop_wait":"Wait until the actions on stop are done","flow.parallel":"runs alongside","flow.already_on":"Already on in {activity}: no switching, no waiting","flow.boot":"Boot time: until {seconds} after the outlets came on","flow.reload":"Reload the integration of {entity}","flow.ready":"Wait until {entity} is available, at most {timeout}","flow.ready_state":"Wait until {entity} is {states}, at most {timeout}","flow.on_timeout_abort":"\u2013 otherwise the start is aborted","flow.on_timeout_continue":"\u2013 otherwise it goes on anyway","flow.turn_on":"Switch on {device}","flow.turn_off":"Switch off {device}","flow.turn_off_unused":"Switch off {device}, this activity does not use it","flow.cannot_switch":"{device} cannot be switched on or off, nothing is sent","flow.wait_on":"Wait {seconds} until the device is ready","flow.wait":"Wait {seconds}","flow.steps":"Steps","flow.background":"In the background, after the room is done","flow.if.outlet_was_off":"only if its outlet was off","flow.if.if_off":"only if the device is off","flow.if.if_on":"only if the device is on","flow.reload_if_needed":"reloads its integration if not ready","flow.cooldown":"then {seconds} cool-down","flow.summary_start":"Active after {min} at the earliest, {max} at the latest if every readiness check takes its full timeout.","flow.summary_start_fixed":"Active after {min}.","flow.summary_stop":"Off as soon as the devices are switched off and the actions on stop are done.","flow.summary_stop_cut":"Off as soon as the devices are switched off and the actions on stop are done; the last outlet goes off after {seconds}."},de:{title:"Easy AV Control",rooms:"R\xE4ume",add_room:"Raum hinzuf\xFCgen",no_rooms:"Noch keine R\xE4ume.",room_name:"Name",room_area:"Bereich",room_default_activity:"Standard-Aktivit\xE4t",default_last:"Zuletzt genutzte","helper.default_activity":"Was der Ein/Aus-Schalter des Raums und toggle_activity starten, z. B. von einem Wandtaster.",room_id_hint:"ID {id}",delete_room:"Raum l\xF6schen",delete_room_confirm:"Raum \u201E{name}\u201C mit allen Ger\xE4ten und Aktivit\xE4ten l\xF6schen?",tab_devices:"Ger\xE4te",tab_activities:"Aktivit\xE4ten",tab_yaml:"YAML",add_device:"Ger\xE4t hinzuf\xFCgen",add_activity:"Aktivit\xE4t hinzuf\xFCgen",delete:"L\xF6schen",move_up:"Nach oben",move_down:"Nach unten",device_id:"Ger\xE4te-ID",device_in_use:"Ger\xE4t \u201E{id}\u201C wird verwendet von: {where}. Bitte zuerst dort entfernen.",activity_id_hint:"ID {id} \u2013 Teil der Entit\xE4ts-IDs, nicht \xE4nderbar",new_activity:"Neue Aktivit\xE4t",add_device_to_activity:"Ger\xE4t hinzuf\xFCgen \u2026",steps:"Ablauf beim Start",add_step:"Schritt hinzuf\xFCgen \u2026",hooks:"Aktionen bei Start und Stopp",remote:"Fernbedienung",quick_select:"Schnellwahl",quick_select_hint:"Tasten, die einen Mediaplayer auf eine Quelle schalten; beim Apple TV sind die Quellen seine Apps.",quick_select_no_player:"F\xFCge dieser Aktivit\xE4t zuerst einen Mediaplayer hinzu.",add_quick_select:"Schnellwahl hinzuf\xFCgen",card_settings:"Einstellungen in der Karte",card_settings_hint:"Quelle, Klangmodus und weitere Einstellungen der Ger\xE4te, in der Karte \xE4nderbar, w\xE4hrend die Aktivit\xE4t l\xE4uft: die an den Ger\xE4ten festgelegten oder eine Auswahl nur f\xFCr diese Aktivit\xE4t. Der Bereich ist zugeklappt, bis man ihn \xF6ffnet; jeder Browser merkt sich das.","setting.entity":"Entit\xE4t des Ger\xE4ts","field.entity":"Entit\xE4t","helper.entity":"Eine Zahl (Schieberegler), Auswahl (Liste) oder ein Schalter (An/Aus-Taste), z. B. der Bass des Receivers.","field.settings_mode":"Anzeigen",settings_auto:"Von den Ger\xE4ten",settings_chosen:"Hier ausgew\xE4hlt, mit Favoriten",settings_auto_shows:"Die Karte zeigt: {list}.",settings_auto_none:"Die Ger\xE4te dieser Aktivit\xE4t bieten noch keine Einstellungen. Lege sie an einem Ger\xE4t fest, oder starte die Aktivit\xE4t einmal, damit die Mediaplayer ihre Listen melden.",device_settings_hint:"Was die Karte von diesem Ger\xE4t anbietet, in jeder Aktivit\xE4t, die es nutzt. Automatisch: Quelle und Klangmodus eines Mediaplayers und die Zahl- und Auswahl-Entit\xE4ten desselben Ger\xE4ts.",device_settings_auto:"Automatisch",device_settings_auto_none:"Noch nichts gefunden: keine Quellen- oder Klangmodus-Liste gemeldet und keine Zahl- oder Auswahl-Entit\xE4ten desselben Ger\xE4ts.",device_settings_none:"Die Karte zeigt keine Einstellungen dieses Ger\xE4ts.",settings_none:"Die Karte zeigt f\xFCr diese Aktivit\xE4t keine Einstellungen.",add_setting:"Einstellung hinzuf\xFCgen","field.setting":"Einstellung","field.options":"Favoriten (optional)","helper.options":"Nur diese in der Karte, in dieser Reihenfolge; leer: die ganze Liste des Ger\xE4ts.",commands:"Eigene Befehle",save:"Speichern",discard:"Verwerfen",saving:"Speichert \u2026",saved:"Gespeichert",unsaved:"Ungespeicherte \xC4nderungen",reload:"Neu laden",reload_confirm:"Ungespeicherte \xC4nderungen verwerfen und die gespeicherte Konfiguration laden?",retry:"Erneut versuchen",save_anyway:"Trotzdem speichern",conflict:"Die Konfiguration wurde anderswo ge\xE4ndert. Bitte neu laden \u2013 deine ungespeicherten \xC4nderungen hier gehen dabei verloren.",invalid:"Nicht gespeichert \u2013 {path}: {message}",missing:"Diese Entit\xE4ten gibt es in Home Assistant nicht:",missing_hint:"Ein Ger\xE4t ohne Strom bleibt normalerweise bekannt \u2013 meist ist es ein Tippfehler oder eine umbenannte Entit\xE4t.",loading:"L\xE4dt \u2026",load_error:"Konfiguration konnte nicht geladen werden: {error}",route_auto:"Automatisch",route_none:"Ausblenden",devices_intro:"Alle Ger\xE4te des Raums, die Easy AV Control schaltet oder steuert: TV, Beamer, Receiver, Player.",devices_empty:"Noch keine Ger\xE4te.",new_device:"Neues Ger\xE4t",no_entity:"Keine Entit\xE4t gew\xE4hlt",entity_missing:"Entit\xE4t in Home Assistant nicht gefunden",used_by:"Verwendet in: {where}",section_device:"Ger\xE4t",hint_device:"Die Home-Assistant-Entit\xE4t des Ger\xE4ts, meist ein Mediaplayer.",section_power:"Strom",hint_power:"Optional. Die Steckdose, an der das Ger\xE4t h\xE4ngt. Sie wird vor dem Ger\xE4t ein- und nach ihm ausgeschaltet.",section_delays:"Wartezeiten",hint_delays:"Wie lange Easy AV Control auf dieses Ger\xE4t wartet.",section_ready:"Verbindung pr\xFCfen",hint_ready:"Wartet, bis das Ger\xE4t in Home Assistant erreichbar ist, vor dem Einschalten und vor Tasten der Fernbedienung. F\xFCr Ger\xE4te, die ohne Strom ihre Verbindung verlieren, etwa ein Apple TV.",ready_preset:"{entity} f\xFCr Verbindungspr\xFCfung und Pfeiltasten nutzen (empfohlen f\xFCr Apple TV)",section_advanced:"Erweitert",hint_device_advanced:"Die Ger\xE4te-ID wird in der YAML-Konfiguration verwendet. Eigene Befehle ordnen einem Tastennamen Home-Assistant-Aktionen zu, z. B. Pfeiltasten f\xFCr einen Receiver.",activities_intro:'Eine Aktivit\xE4t fasst Ger\xE4te f\xFCr eine Nutzung zusammen, z. B. "Apple TV" = TV und Apple TV. Beim Start wird eingeschaltet, was sie braucht, und ausgeschaltet, was nicht.',activities_empty:"Noch keine Aktivit\xE4ten.",no_devices:"Keine Ger\xE4te",needs_devices:"Lege zuerst die Ger\xE4te dieses Raums an.",section_general:"Allgemein",hint_general:"Name und Icon erscheinen in der Card. Die Position bestimmt die Reihenfolge.",section_activity_devices:"Ger\xE4te",hint_activity_devices:"Werden in dieser Reihenfolge eingeschaltet.",hint_steps:"Laufen, sobald alle Ger\xE4te an sind, z. B. den TV auf seinen HDMI-Eingang schalten oder die Lautst\xE4rke setzen.",hint_remote:"Welches Ger\xE4t welche Tasten der Card bekommt. Automatisch passt f\xFCr die meisten Aufbauten.",hint_activity_advanced:"Zus\xE4tzliche Tasten und Befehle in YAML sowie Home-Assistant-Aktionen bei Start und Stopp.",yaml_intro:"Der ganze Raum als YAML. \xC4nderungen hier und in den Formularen betreffen dieselbe Konfiguration.",add_room_name:"Name des neuen Raums",create:"Hinzuf\xFCgen",cancel:"Abbrechen","helper.power_switch":"Gemeinsame Steckdosen bleiben an, solange ein Ger\xE4t daran gebraucht wird.","helper.delay_after_power":"Wie lange das Ger\xE4t nach dem Einschalten der Steckdose braucht. Nur wenn die Steckdose aus war.","helper.delay_after_on":"Bis das Ger\xE4t Befehle annimmt. Nur wenn es eingeschaltet wurde.","helper.delay_after_off":"Abk\xFChlzeit, bevor das n\xE4chste Ger\xE4t oder die Steckdose ausgeschaltet wird, z. B. 180 s f\xFCr einen Beamer.","helper.ready_entity":"Z. B. die Fernbedienung eines Apple TV, die nur bei bestehender Verbindung an ist.","helper.ready_reload":"\xDCberspringt die Wartezeit einer Integration, die ihre Verbindung erneut versucht.","helper.source":"Die Liste zeigt, was das Ger\xE4t zuletzt gemeldet hat; es muss also einmal an gewesen sein. Ein Name l\xE4sst sich auch eintippen.","field.entity_id":"Entit\xE4t","field.name":"Anzeigename","field.power_switch":"Steckdose","field.remote_entity":"Fernbedienung (optional)","helper.remote_entity":"Pfeiltasten, OK, Zur\xFCck, Home und Men\xFC der Card gehen an diese Fernbedienungs-Entit\xE4t, z. B. die Fernbedienung eines Apple TV.","field.delay_after_power":"Startzeit (s)","field.delay_after_on":"Warten nach Einschalten (s)","field.delay_after_off":"Warten nach Ausschalten (s)","field.ready_enabled":"Vor dem Einschalten auf Verf\xFCgbarkeit warten","field.ready_entity":"Stattdessen diese Entit\xE4t pr\xFCfen (optional)","field.ready_state":"Auf Zustand warten (optional, z. B. on)","field.ready_timeout":"Zeitlimit (s)","field.ready_reload":"Integration neu laden","field.ready_on_timeout":"Bei Zeit\xFCberschreitung","field.commands":"Eigene Befehle (YAML: Name \u2192 Aktionen)","field.icon":"Icon","field.order":"Position","field.on_start":"Beim Start","field.on_stop":"Beim Stopp","field.volume":"Lautst\xE4rke","field.channels":"Sender","field.transport":"Wiedergabe","field.navigation":"Navigation","field.touchpad":"Touchfl\xE4che","helper.touchpad":"Eine Wischfl\xE4che statt der Pfeiltasten in der Karte. Automatisch: wenn die Navigation an eine Remote-Entit\xE4t geht, z. B. ein Apple TV.",touchpad_auto:"Automatisch",touchpad_on:"An",touchpad_off:"Aus (Pfeiltasten)","field.buttons":"Zus\xE4tzliche Buttons (YAML-Liste)","field.label":"Beschriftung (optional, sonst die Quelle)","field.activity_commands":"Befehle dieser Aktivit\xE4t (YAML: Name \u2192 Aktionen)","field.type":"Typ","field.device":"Ger\xE4t","field.source":"Quelle","field.volume_level":"Lautst\xE4rke","field.sound_mode":"Klangmodus","field.brightness_pct":"Helligkeit (%)","field.color_temp_kelvin":"Farbtemperatur (K)","field.transition":"\xDCbergang (s)","field.position":"Position (%)","field.tilt_position":"Neigung (%)","field.action":"Aktion (z. B. script.turn_on)","field.data":"Daten","field.target":"Ziel","field.timeout":"Zeitlimit (s)","field.reload_integration":"Integration neu laden","field.on_timeout":"Bei Zeit\xFCberschreitung","field.delay_after":"Danach warten (s)",on_timeout_abort:"Start abbrechen",on_timeout_continue:"Weitermachen","step.power_on":"Einschalten","step.power_off":"Ausschalten","step.set_source":"Quelle w\xE4hlen","step.set_volume":"Lautst\xE4rke setzen","step.set_sound_mode":"Klangmodus w\xE4hlen","step.set_brightness":"Helligkeit setzen","step.set_color_temp":"Farbtemperatur setzen","step.set_position":"Rollladen-Position setzen","step.set_tilt":"Lamellen-Neigung setzen","step.call_action":"Aktion ausf\xFChren","step.delay":"Warten","step.wait_available":"Auf Verf\xFCgbarkeit warten",section_remote_preview:"Vorschau der Fernbedienung",hint_remote_preview:"So sieht die Karte aus, w\xE4hrend diese Aktivit\xE4t l\xE4uft, mit den Einstellungen oben, auch vor dem Speichern. Tippe eine Taste an, um zu sehen, wohin sie geht; es wird nichts gesendet.","preview.tap":"Tippe eine Taste an, um zu sehen, welches Ger\xE4t sie bekommt und was dort ausgef\xFChrt wird.","preview.this_activity":"diese Aktivit\xE4t","preview.device_commands":"eigener Befehl des Ger\xE4ts: {actions}","preview.activity_commands":"eigener Befehl der Aktivit\xE4t: {actions}","preview.unknown":"tut nichts: kein Ger\xE4t dieser Aktivit\xE4t kennt die Taste","preview.unknown_on_device":"tut nichts: {device} kennt die Taste nicht","preview.ready":"Pr\xFCft vorher die Verbindung und stellt sie bei Bedarf wieder her.","preview.dead":"Diese Tasten werden angezeigt, tun aber nichts:","preview.groups":"Tastengruppen","preview.mode_auto":"automatisch","preview.mode_set":"gew\xE4hlt","preview.hidden":"ausgeblendet","preview.no_device":"kein passendes Ger\xE4t, nicht angezeigt","preview.no_keys":"nicht angezeigt: {device} hat keine dieser Tasten",section_flow:"Ablauf: was wann geschaltet wird",hint_flow:"Berechnet aus den Einstellungen dieser Aktivit\xE4t und ihrer Ger\xE4te, auch vor dem Speichern. Die Zeiten z\xE4hlen nur die eingestellten Wartezeiten; wie lange die Ger\xE4te zum Reagieren brauchen, kommt hinzu.","flow.mode_start":"Start","flow.mode_stop":"Stopp","flow.from_label":"Ausgangslage","flow.from_idle":"aus dem Leerlauf (alles aus)","flow.from":"Wechsel von {activity}","flow.failed":"Ablauf konnte nicht berechnet werden: {error}","flow.invalid":"Kein Ablauf, solange die Konfiguration einen Fehler hat \u2013 {error}","flow.state_starting":"Raum: startet","flow.state_active":"Raum: aktiv","flow.state_stopping":"Raum: stoppt","flow.state_idle":"Raum: aus","flow.outlets_on":"Steckdosen gleichzeitig einschalten: {outlets}","flow.outlets_off":"Steckdosen ausschalten: {outlets}","flow.outlets_off_later":"Steckdose nach der Abk\xFChlzeit ausschalten: {outlets}","flow.outlet_keep":"{outlet} bleibt an, diese Aktivit\xE4t braucht sie","flow.outlets_already_on":"schon an: {outlets}","flow.unless_rooms":"nicht, solange {rooms} sie nutzt","flow.on_start":"Aktionen beim Start beginnen","flow.on_start_wait":"Warten, bis die Aktionen beim Start fertig sind","flow.on_stop":"Aktionen beim Stopp beginnen","flow.on_stop_wait":"Warten, bis die Aktionen beim Stopp fertig sind","flow.parallel":"l\xE4uft parallel","flow.already_on":"L\xE4uft schon in {activity}: kein Einschalten, keine Wartezeit","flow.boot":"Startzeit: bis {seconds} nach dem Einschalten der Steckdosen","flow.reload":"Integration von {entity} neu laden","flow.ready":"Warten, bis {entity} verf\xFCgbar ist, h\xF6chstens {timeout}","flow.ready_state":"Warten, bis {entity} {states} ist, h\xF6chstens {timeout}","flow.on_timeout_abort":"\u2013 sonst wird der Start abgebrochen","flow.on_timeout_continue":"\u2013 sonst geht es trotzdem weiter","flow.turn_on":"{device} einschalten","flow.turn_off":"{device} ausschalten","flow.turn_off_unused":"{device} ausschalten, diese Aktivit\xE4t braucht es nicht","flow.cannot_switch":"{device} l\xE4sst sich nicht schalten, es wird nichts gesendet","flow.wait_on":"{seconds} warten, bis das Ger\xE4t bereit ist","flow.wait":"{seconds} warten","flow.steps":"Schritte","flow.background":"Im Hintergrund, wenn der Raum schon fertig ist","flow.if.outlet_was_off":"nur, wenn die Steckdose aus war","flow.if.if_off":"nur, wenn das Ger\xE4t aus ist","flow.if.if_on":"nur, wenn das Ger\xE4t an ist","flow.reload_if_needed":"l\xE4dt die Integration neu, falls nicht bereit","flow.cooldown":"danach {seconds} Abk\xFChlzeit","flow.summary_start":"Aktiv fr\xFChestens nach {min}, sp\xE4testens nach {max}, wenn jede Bereitschaftspr\xFCfung ihr ganzes Zeitlimit braucht.","flow.summary_start_fixed":"Aktiv nach {min}.","flow.summary_stop":"Aus, sobald die Ger\xE4te ausgeschaltet und die Aktionen beim Stopp fertig sind.","flow.summary_stop_cut":"Aus, sobald die Ger\xE4te ausgeschaltet und die Aktionen beim Stopp fertig sind; die letzte Steckdose geht nach {seconds} aus."}};function S(r,s,e={}){let t=(r??"en").split("-")[0],i=mt[t]?.[s]??mt.en[s];if(i===void 0)return N(r,s,e);for(let[n,o]of Object.entries(e))i=i.replace(`{${n}}`,o);return i}var Nt=400,Lt={state:"mdi:flag-outline",outlets_on:"mdi:power-socket-eu",outlets_off:"mdi:power-socket-eu",outlet_keep:"mdi:power-socket-eu",turn_on:"mdi:power",turn_off:"mdi:power-off",hook:"mdi:script-text-outline",hook_wait:"mdi:script-text-outline",boot:"mdi:timer-sand",wait:"mdi:timer-sand",reload:"mdi:reload",ready:"mdi:lan-connect",already_on:"mdi:check",step:"mdi:tune-variant"},Vt=new Set(["boot","reload","ready","turn_on","wait","already_on","step","turn_off"]),Y=class extends g{constructor(){super();this._request=0;this._mode="start"}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._timer)}willUpdate(e){if(e.has("activityId")&&e.get("activityId")!==void 0&&(this._from=void 0),this._from!==void 0&&!this.room.activities?.[this._from]&&(this._from=void 0),["room","roomId","activityId","_mode","_from"].some(t=>e.has(t))){window.clearTimeout(this._timer);let i=!(this._flow===void 0&&this._failed===void 0)&&e.has("room")?Nt:0;this._timer=window.setTimeout(()=>this._load(),i)}}async _load(){let e=++this._request;try{let t=await this.hass.callWS({type:"easy_av_control/config/flow",room:this.roomId,config:this.room,activity:this.activityId,mode:this._mode,...this._mode==="start"&&this._from?{from:this._from}:{}});e===this._request&&(this._flow=t,this._failed=void 0)}catch(t){e===this._request&&(this._failed=t.message??String(t))}}_t(e,t){return S(this.hass?.language,e,t)}_entity(e){let t=String(e??"");return this.hass.states[t]?.attributes.friendly_name||t}_device(e){let t=String(e??""),i=this.room.devices?.[t];return i?.name||(i?.entity_id?this._entity(i.entity_id):"")||t}_activity(e){let t=String(e??"");return this.room.activities?.[t]?.name||t}_list(e){return(e??[]).map(t=>this._entity(t)).join(", ")}_seconds(e){return`${Math.round(Number(e)*10)/10} s`}_time([e,t]){return e===t?this._seconds(e):`${this._seconds(e).slice(0,-2)}\u2013${this._seconds(t)}`}_text(e){let t=this._device(e.device);switch(e.kind){case"state":return this._t(`flow.state_${e.state}`);case"outlets_on":return this._t("flow.outlets_on",{outlets:this._list(e.entities)});case"outlets_off":return this._t(e.background?"flow.outlets_off_later":"flow.outlets_off",{outlets:this._list(e.entities)});case"outlet_keep":return this._t("flow.outlet_keep",{outlet:this._entity(e.entity_id)});case"hook":return this._t(`flow.${e.hook}`);case"hook_wait":return this._t(`flow.${e.hook}_wait`);case"already_on":return this._t("flow.already_on",{activity:this._activity(e.previous)});case"boot":return this._t("flow.boot",{seconds:this._seconds(e.seconds)});case"reload":return this._t("flow.reload",{entity:this._entity(e.entity_id)});case"ready":{let i=Array.isArray(e.states)?e.states:e.states?[e.states]:[],n={entity:this._entity(e.entity_id),states:i.join(" / "),timeout:this._seconds(e.timeout)};return[e.step?`${e.step}. `:"",this._t(i.length?"flow.ready_state":"flow.ready",n)," ",this._t(`flow.on_timeout_${e.on_timeout}`)].join("")}case"turn_on":case"turn_off":{let i=e.step?`${e.step}. `:"";return e.skip?i+this._t("flow.cannot_switch",{device:t}):i+this._t(e.reason==="unused"?"flow.turn_off_unused":`flow.${e.kind}`,{device:t})}case"wait":return this._t(e.reason==="delay_after_on"?"flow.wait_on":"flow.wait",{seconds:this._seconds(e.seconds)});case"step":return`${e.step}. ${this._t(`step.${e.step_type}`)}${this._stepValue(e)}`;default:return e.kind}}_stepValue(e){let t=e.data??{},i=[];for(let[n,o]of Object.entries(t))n==="volume_level"?i.push(`${Math.round(Number(o)*100)} %`):n==="brightness_pct"||n==="position"||n==="tilt_position"?i.push(`${o} %`):n==="color_temp_kelvin"?i.push(`${o} K`):n==="transition"?i.push(this._seconds(o)):e.step_type!=="call_action"&&i.push(String(o));return i.length?`: ${i.join(", ")}`:""}_notes(e){let t=[];if(typeof e.condition=="string"&&t.push(this._t(`flow.if.${e.condition}`)),e.kind==="ready"&&e.reload&&t.push(this._t("flow.reload_if_needed")),e.kind==="turn_off"&&Number(e.cooldown)>0&&t.push(this._t("flow.cooldown",{seconds:this._seconds(e.cooldown)})),Array.isArray(e.already_on)&&e.already_on.length&&t.push(this._t("flow.outlets_already_on",{outlets:this._list(e.already_on)})),Array.isArray(e.unless_rooms)&&e.unless_rooms.length&&t.push(this._t("flow.unless_rooms",{rooms:e.unless_rooms.join(", ")})),e.kind==="hook"){let i=e.actions??[];t.push(this._t("flow.parallel")),i.length&&t.push(i.join(", "))}return t}_call(e){if(typeof e.action!="string"||e.kind==="hook")return;let t=e.entities?this._list(e.entities):e.entity_id?this._entity(e.entity_id):"";return t?`${e.action} \u2192 ${t}`:e.action}_renderRow(e,t,i){let n=this._notes(e),o=this._call(e),l=e.kind==="device"||e.kind==="steps";return a`<li class=${[t?"nested":"",l?"header":"",e.kind].join(" ")}>
      <span class="time">${i?this._time(e.at):""}</span>
      ${l?a`<span class="index">${e.kind==="device"?e.index:"\u2261"}</span>`:a`<ha-icon class="icon" .icon=${Lt[e.kind]??"mdi:circle-small"}></ha-icon>`}
      <span class="body">
        <span class="what"
          >${e.kind==="device"?this._device(e.device):e.kind==="steps"?this._t("flow.steps"):this._text(e)}</span
        >
        ${e.kind==="device"?a`<span class="call">${e.entity_id}</span>`:h}
        ${o?a`<span class="call">${o}</span>`:h}
        ${n.length?a`<span class="notes">${n.map(d=>a`<span class="note">${d}</span>`)}</span>`:h}
      </span>
    </li>`}_renderRows(e){let t=e.filter(d=>!d.background),i=e.filter(d=>d.background),n=!1,o="",l=t.map(d=>{d.kind==="device"||d.kind==="steps"?n=!0:(!Vt.has(d.kind)||d.reason==="unused")&&(n=!1);let c=this._time(d.at),u=c!==o||d.kind==="state";return o=c,this._renderRow(d,n&&d.kind!=="device"&&d.kind!=="steps",u)});return a`<ol class="flow">${l}</ol>
      ${i.length?a`<h4>${this._t("flow.background")}</h4>
            <ol class="flow">${i.map(d=>this._renderRow(d,!1,!0))}</ol>`:h}`}render(){let e=Object.entries(this.room.activities??{}).filter(([t])=>t!==this.activityId);return a`
      <div class="modes" role="tablist">
        ${["start","stop"].map(t=>a`<button
            role="tab"
            class=${this._mode===t?"active":""}
            aria-selected=${this._mode===t?"true":"false"}
            @click=${()=>this._mode=t}
          >
            ${this._t(`flow.mode_${t}`)}
          </button>`)}
        ${this._mode==="start"&&e.length?a`<select
              aria-label=${this._t("flow.from_label")}
              @change=${t=>{let i=t.target.value;this._from=i||void 0}}
            >
              <option value="" ?selected=${!this._from}>${this._t("flow.from_idle")}</option>
              ${e.map(([t,i])=>a`<option value=${t} ?selected=${this._from===t}>
                    ${this._t("flow.from",{activity:i.name||t})}
                  </option>`)}
            </select>`:h}
      </div>
      ${this._renderBody()}
    `}_renderBody(){if(this._failed)return a`<p class="error">${this._t("flow.failed",{error:this._failed})}</p>`;let e=this._flow;if(!e)return a`<p class="hint">${this._t("loading")}</p>`;if(e.error){let l=e.error.path.join(".");return a`<p class="error">
        ${this._t("flow.invalid",{error:l?`${l}: ${e.error.message}`:e.error.message})}
      </p>`}let[t,i]=e.done,n=e.rows.filter(l=>l.background).map(l=>l.at[0]),o=this._mode==="start"?this._t(t===i?"flow.summary_start_fixed":"flow.summary_start",{min:this._seconds(t),max:this._seconds(i)}):this._t(n.length?"flow.summary_stop_cut":"flow.summary_stop",{seconds:this._seconds(Math.max(0,...n))});return a`${this._renderRows(e.rows)}
      <p class="summary">${o}</p>`}};Y.properties={hass:{attribute:!1},room:{attribute:!1},roomId:{attribute:!1},activityId:{attribute:!1},_mode:{state:!0},_from:{state:!0},_flow:{state:!0},_failed:{state:!0}},Y.styles=y`
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
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
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
      grid-template-columns: 64px 24px minmax(0, 1fr);
      gap: 4px 10px;
      align-items: start;
      padding: 6px 0;
      border-top: 1px solid var(--divider-color);
    }
    ol.flow li:first-child {
      border-top: none;
    }
    ol.flow li.nested {
      grid-template-columns: 64px 40px minmax(0, 1fr);
      border-top: none;
      padding-top: 2px;
    }
    ol.flow li.nested .icon {
      justify-self: end;
    }
    .time {
      color: var(--secondary-text-color);
      font-size: 0.85em;
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
      background: var(--secondary-background-color);
      font-size: 0.8em;
      font-weight: 500;
    }
    .body {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
      overflow-wrap: anywhere;
    }
    .call {
      font-family: var(--code-font-family, monospace);
      font-size: 0.8em;
      color: var(--secondary-text-color);
    }
    .notes {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
    .note {
      font-size: 0.8em;
      padding: 1px 8px;
      border-radius: 10px;
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
    }
    h4 {
      font-size: 0.95em;
      font-weight: 500;
      margin: 16px 0 4px;
    }
    .summary {
      margin: 12px 0 0;
      font-size: 0.9em;
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
        grid-template-columns: 58px 22px minmax(0, 1fr);
        gap: 4px 6px;
      }
      ol.flow li.nested {
        grid-template-columns: 58px 32px minmax(0, 1fr);
      }
      .time {
        font-size: 0.75em;
      }
    }
  `;customElements.get("easy-av-control-flow")||customElements.define("easy-av-control-flow",Y);var z={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},pt=r=>(...s)=>({_$litDirective$:r,values:s}),ue=class{constructor(s){}get _$AU(){return this._$AM._$AU}_$AT(s,e,t){this._$Ct=s,this._$AM=e,this._$Ci=t}_$AS(s,e){return this.update(s,e)}update(s,e){return this.render(...e)}};var{I:Ei}=nt;var _t=r=>r.strings===void 0;var It={},ft=(r,s=It)=>r._$AH=s;var ze=pt(class extends ue{constructor(r){if(super(r),r.type!==z.PROPERTY&&r.type!==z.ATTRIBUTE&&r.type!==z.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!_t(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(r,[s]){if(s===b||s===h)return s;let e=r.element,t=r.name;if(r.type===z.PROPERTY){if(s===e[t])return b}else if(r.type===z.BOOLEAN_ATTRIBUTE){if(!!s===e.hasAttribute(t))return b}else if(r.type===z.ATTRIBUTE&&e.getAttribute(t)===s+"")return b;return ft(r),s}});var he=class extends g{constructor(){super(...arguments);this._loading=!1}setConfig(e){this._config=e}updated(){this.hass&&this._rooms===void 0&&!this._loading&&(this._loading=!0,this.hass.callWS({type:"easy_av_control/control/rooms"}).then(e=>this._rooms=e).catch(()=>this._rooms=[]).finally(()=>this._loading=!1))}_schema(){let e=(this._rooms??[]).map(i=>i.room);return[{name:"room",required:!0,selector:{select:{mode:"dropdown",options:(this._rooms??[]).map(i=>({value:e.filter(n=>n===i.room).length>1?`${i.entry_id}/${i.room}`:i.room,label:i.name}))}}},{name:"name",selector:{text:{}}}]}render(){if(!this.hass||!this._config)return h;let e={...this._config,room:this._config.entry_id?`${this._config.entry_id}/${this._config.room}`:this._config.room},t=(this._rooms??[]).some(i=>i.room===this._config.room);return this._rooms&&!t&&this._config.room&&(e.room=this._config.room),a`<ha-form
      .hass=${this.hass}
      .data=${e}
      .schema=${this._schema()}
      .computeLabel=${i=>N(this.hass?.language,`editor.${i.name}`)}
      @value-changed=${this._valueChanged}
    ></ha-form>`}_valueChanged(e){e.stopPropagation();let t={...e.detail.value},i={...this._config,...t},n=String(t.room??"");if(n.includes("/")){let[o,l]=n.split("/",2);i.entry_id=o,i.room=l}else delete i.entry_id;i.name||delete i.name,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}};he.properties={hass:{attribute:!1},_config:{state:!0},_rooms:{state:!0}};customElements.get("easy-av-control-card-editor")||customElements.define("easy-av-control-card-editor",he);function L(r,s){let e=`command.${r}`,t=s(e);if(t!==e)return t;let i=r.replace(/[_-]+/g," ").trim();return i.charAt(0).toUpperCase()+i.slice(1)}var Ht=new Set(["off","standby","unavailable","unknown"]);function gt(r,s){if(!r||Ht.has(r.state))return;let e=r.attributes,t=w=>typeof e[w]=="string"&&e[w]?e[w]:void 0,i=w=>typeof e[w]=="number"?e[w]:void 0,n=t("app_name"),o=t("media_title")??n;if(!o)return;let l=i("media_season")??t("media_season"),d=i("media_episode")??t("media_episode"),c=t("media_series_title"),u=c&&(l!==void 0||d!==void 0)?`${c} \xB7 ${[l!==void 0?`S${l}`:"",d!==void 0?`E${d}`:""].filter(Boolean).join(" ")}`:c??t("media_artist")??t("media_album_name"),m=r.state==="playing",p=i("media_duration"),f=p!==void 0&&p>0?p:void 0,_=i("media_position"),$=t("media_position_updated_at");return _!==void 0&&m&&$&&!Number.isNaN(Date.parse($))&&(_+=(s-Date.parse($))/1e3),_!==void 0&&f!==void 0&&(_=Math.max(0,Math.min(f,_))),{title:o,app:o===n?void 0:n,subtitle:u,picture:t("entity_picture"),playing:m,duration:f,position:f!==void 0?_:void 0}}function F(r){let s=Math.floor(r),e=Math.floor(s/3600),t=Math.floor(s%3600/60),i=String(s%60).padStart(2,"0");return e?`${e}:${String(t).padStart(2,"0")}:${i}`:`${t}:${i}`}function vt(r,s){let e=Math.max(0,Math.ceil((Date.parse(r)-s)/1e3));return e>=60?F(e):`${e} s`}function yt(r,s,e){let t=r.names.length?r.names.join(", "):r.outlet;return{text:e("cooling.text",{names:t}),time:e(r.status?"cooling.time_status":"cooling.time",{time:vt(r.until,s)})}}function bt(r,s,e){if(!r)return;let t=r.name??"",i={step:String(r.step??""),steps:String(r.steps??"")},n;switch(r.kind){case"step":{let d=e(`step.${r.step_type}`);n=e("doing.step",{...i,what:t?`${d} (${t})`:d});break}case"wait":n=e("doing.wait",i);break;case"hooks":n=e(`doing.hooks_${r.hook}`);break;case"status":n=r.value?e(`doing.status_${r.target==="off"?"off":"on"}_value`,{name:t,value:r.value}):e(`doing.status_${r.target==="off"?"off":"on"}`,{name:t});break;default:n=e(`doing.${r.kind}`,{name:t})}if(!r.until)return{text:n};let o=vt(r.until,s),l=r.kind==="ready"||r.kind==="status";return{text:n,time:e(l?"doing.at_most":"doing.left",{time:o})}}var me=class{constructor(){this.originX=0;this.originY=0;this.startX=0;this.startY=0;this.startTime=0;this.moved=!1}start(s,e,t){this.originX=this.startX=s,this.originY=this.startY=e,this.startTime=t,this.moved=!1}move(s,e){Math.hypot(s-this.startX,e-this.startY)>10&&(this.moved=!0);let t=[];for(;;){let i=s-this.originX,n=e-this.originY;if(Math.max(Math.abs(i),Math.abs(n))<40)return t;Math.abs(i)>=Math.abs(n)?(t.push(i>0?"right":"left"),this.originX+=Math.sign(i)*40,this.originY=e):(t.push(n>0?"down":"up"),this.originY+=Math.sign(n)*40,this.originX=s)}}end(s,e,t){return Math.hypot(s-this.startX,e-this.startY)>10&&(this.moved=!0),!this.moved&&t-this.startTime<=500}};function Me(r,s){return`easy-av-control-touchpad:${r}:${s}`}function wt(r,s){return r==="on"?!0:r==="off"?!1:s}var pe="easy_av_control",Ne={volume_up:"mdi:volume-plus",volume_down:"mdi:volume-minus",mute:"mdi:volume-off",channel_up:"mdi:chevron-up",channel_down:"mdi:chevron-down",play_pause:"mdi:play-pause",play:"mdi:play",pause:"mdi:pause",stop:"mdi:stop",next:"mdi:skip-next",previous:"mdi:skip-previous",up:"mdi:chevron-up",down:"mdi:chevron-down",left:"mdi:chevron-left",right:"mdi:chevron-right",back:"mdi:arrow-u-left-top",menu:"mdi:menu",home:"mdi:home-outline",info:"mdi:information-outline",guide:"mdi:television-guide",exit:"mdi:close",select_source:"mdi:apps"},Bt=["back","home","menu","info","guide","exit"],Gt=["previous","play_pause","play","pause","stop","next"],Wt=new Set(["volume_up","volume_down","up","down","left","right"]),Ut=400,Kt=200;function $t(r){return`easy-av-control-settings:${r}`}var qt=3e4,Yt={idle:"mdi:power",starting:"mdi:timer-sand",active:"mdi:power",stopping:"mdi:timer-sand",error:"mdi:alert-circle-outline"},Q=class extends g{constructor(){super();this._padChoices=new Map;this._settingsOpen=new Map;this._settingDrafts=new Map;this._view=null,this._loaded=!1}static getConfigElement(){return document.createElement("easy-av-control-card-editor")}static async getStubConfig(e){try{return{room:(await e.callWS({type:`${pe}/control/rooms`}))[0]?.room??""}}catch{return{room:""}}}setConfig(e){if(!e||typeof e.room!="string")throw new Error("room is required");let t=e.room!==this._config?.room||e.entry_id!==this._config?.entry_id;this._config=e,t&&this._resubscribe()}getCardSize(){return this._view?.remote?8:3}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._pressEnd(!1),window.clearInterval(this._tickTimer),this._tickTimer=void 0,this._unsubscribeNow()}willUpdate(e){e.has("preview")&&this.preview&&(this._config={type:"custom:easy-av-control-card",room:this.preview.room},this._view=this.preview,this._loaded=!0)}updated(e){let t=this._nowPlaying(),i=t?.playing===!0&&t.duration!==void 0||!!this._view?.current?.until||!!this._view?.cooling?.length;i&&this._tickTimer===void 0?this._tickTimer=window.setInterval(()=>this.requestUpdate(),1e3):!i&&this._tickTimer!==void 0&&(window.clearInterval(this._tickTimer),this._tickTimer=void 0),e.has("hass")&&!this._unsubscribe&&this._retryTimer===void 0&&this._subscribe()}_subscribe(){if(this.preview||!this.hass||!this._config?.room||this._unsubscribe||!this.isConnected)return;let e={type:`${pe}/control/subscribe`,room:this._config.room};this._config.entry_id&&(e.entry_id=this._config.entry_id);let t=this.hass.connection.subscribeMessage(i=>{this._unsubscribe===t&&(this._view=i,this._loaded=!0,this._subscribeError=void 0)},e);this._unsubscribe=t,t.catch(i=>{this._unsubscribe===t&&(this._subscribeError=i?.message??String(i),this._loaded=!0,this._unsubscribe=void 0,this._retryTimer=window.setTimeout(()=>{this._retryTimer=void 0,this._subscribe()},qt))})}_unsubscribeNow(){window.clearTimeout(this._retryTimer),this._retryTimer=void 0;let e=this._unsubscribe;this._unsubscribe=void 0,e?.then(t=>t()).catch(()=>{})}_resubscribe(){this._unsubscribeNow(),this._view=null,this._loaded=!1,this._subscribe()}_t(e,t){return N(this.hass?.language,e,t)}_call(e,t={}){if(!(!this.hass||!this._view)){if(this._haptic(),this.preview){this.dispatchEvent(new CustomEvent("preview-call",{detail:{service:e,data:t}}));return}this.hass.callService(pe,e,{room:this._view.room,...t}).catch(i=>this._toast(i?.message??String(i)))}}_send(e,t={}){this._call("send_command",{command:e,...t})}_haptic(){this.dispatchEvent(new CustomEvent("haptic",{detail:"light",bubbles:!0,composed:!0}))}_toast(e){this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:e},bubbles:!0,composed:!0}))}_pressStart(e,t,i={}){if(e.button!==0)return;this._pressEnd(!1);let n={command:t,extra:i,sent:!1};this._press=n,Wt.has(t)&&(this._repeatTimer=window.setTimeout(()=>{n.sent=!0,this._send(t,i),this._repeatTimer=window.setInterval(()=>this._send(t,i),Kt)},Ut))}_pressEnd(e){let t=this._press;this._press=void 0,this._stopRepeat(),e&&t&&!t.sent&&this._send(t.command,t.extra)}_stopRepeat(){this._repeatTimer!==void 0&&(window.clearTimeout(this._repeatTimer),window.clearInterval(this._repeatTimer),this._repeatTimer=void 0)}_keySend(e,t,i={}){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._send(t,i))}render(){if(!this._config?.room)return a`<ha-card><div class="message">${this._t("no_room")}</div></ha-card>`;if(!this._loaded)return a`<ha-card><div class="message">${this._t("loading")}</div></ha-card>`;let e=this._view;return e?a`<ha-card>
      ${this._renderHeader(e)} ${this._renderStatus(e)} ${this._renderNowPlaying()}
      ${this._renderActivities(e)}
      ${e.remote?this._renderRemote(e):h}
    </ha-card>`:a`<ha-card>
        <div class="message warning">
          ${this._subscribeError??this._t("not_found",{room:this._config.room})}
        </div>
      </ha-card>`}_renderHeader(e){let t=e.activities.find(o=>o.id===e.activity),i=e.state!=="idle",n=t?`${t.name} \xB7 ${this._t(`state.${e.state}`)}`:this._t(`state.${e.state}`);return a`<div class="header">
      <div class="title">
        <div class="name">${this._config?.name||e.name}</div>
        <div class="status state-${e.state}">${n}</div>
      </div>
      <button
        class="power ${i?"on":""} state-${e.state}"
        title=${this._t("power")}
        aria-label=${this._t("power")}
        @click=${()=>this._call("toggle_activity")}
      >
        <ha-icon .icon=${Yt[e.state]??"mdi:power"}></ha-icon>
      </button>
    </div>`}_renderStatus(e){let t=e.state==="starting"||e.state==="stopping",[i,n]=e.progress,o=n>0?Math.round(i/n*100):0,l=t?bt(e.current,Date.now(),(d,c)=>this._t(d,c)):void 0;return a`
      ${t?a`<div
            class="progress"
            role="progressbar"
            aria-label=${this._t(`state.${e.state}`)}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow=${o}
          >
            <div style="width: ${e.state==="starting"?o:100}%"></div>
          </div>`:h}
      ${l?a`<div class="doing" aria-live="polite">
            <span class="doing-text">${l.text}</span>
            ${l.time?a`<span class="doing-time">${l.time}</span>`:h}
          </div>`:h}
      ${(e.cooling??[]).map(d=>{let{text:c,time:u}=yt(d,Date.now(),(m,p)=>this._t(m,p));return a`<div class="doing cooling">
          <span class="doing-text">${c}</span><span class="doing-time">${u}</span>
        </div>`})}
      ${e.state==="error"&&e.error?a`<div class="message error">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>${e.error}
          </div>`:h}
      ${e.warnings.length&&e.state!=="idle"?a`<details class="warnings">
            <summary>${this._t("warnings")} (${e.warnings.length})</summary>
            <ul>
              ${e.warnings.map(d=>a`<li>${d}</li>`)}
            </ul>
          </details>`:h}
    `}_nowPlaying(){let e=this._view?.remote?.media;return gt(e?this.hass?.states[e]:void 0,Date.now())}_renderNowPlaying(){let e=this._nowPlaying();if(!e)return h;let t=[e.app,e.playing?void 0:this._t("now.paused")].filter(Boolean).join(" \xB7 ");return a`<div class="now">
      ${e.picture?a`<img
            class="art"
            src=${e.picture}
            alt=""
            @error=${i=>i.target.style.display="none"}
          />`:h}
      <div class="meta">
        ${t?a`<div class="now-top">${t}</div>`:h}
        <div class="now-title">${e.title}</div>
        ${e.subtitle?a`<div class="now-sub">${e.subtitle}</div>`:h}
        ${e.duration!==void 0&&e.position!==void 0?a`<div class="now-progress" role="progressbar" aria-valuemin="0"
                aria-valuemax=${Math.round(e.duration)} aria-valuenow=${Math.round(e.position)}>
                <div style="width: ${e.position/e.duration*100}%"></div>
              </div>
              <div class="now-time">
                <span>${F(e.position)}</span><span>${F(e.duration)}</span>
              </div>`:h}
      </div>
    </div>`}_renderActivities(e){return a`<div class="activities">
      ${e.activities.map(t=>{let i=t.id===e.activity;return a`<button
          class="chip ${i?`current state-${e.state}`:""}"
          aria-pressed=${i?"true":"false"}
          @click=${()=>this._call("start_activity",{activity:t.id})}
        >
          <ha-icon .icon=${t.icon??"mdi:play-circle-outline"}></ha-icon>
          <span>${t.name}</span>
        </button>`})}
    </div>`}_renderRemote(e){let{groups:t,buttons:i}=e.remote,n=t.navigation,o=n?Bt.filter(c=>n.commands.includes(c)):[],l=n?wt(this._padChoice(e),n.touchpad===!0):!1,d=t.transport?Gt.filter(c=>t.transport.commands.includes(c)):[];return d.includes("play_pause")&&(d=d.filter(c=>c!=="play"&&c!=="pause")),a`<div class="remote">
      ${t.volume||n||t.channels?a`<div class="main ${n?"":"no-nav"}">
            ${t.volume?this._renderVolumeRocker(t.volume):n?a`<div></div>`:h}
            ${n?l?this._renderTouchpad(n):this._renderDpad(n):h}
            ${t.channels?this._renderChannelRocker(t.channels):n?a`<div></div>`:h}
          </div>`:h}
      ${t.volume?.commands.includes("volume_set")?this._renderSlider(t.volume):h}
      ${n?a`<div class="row">
            ${o.map(c=>this._key(c))}${this._renderPadSwitch(e,l)}
          </div>`:h}
      ${d.length?a`<div class="row">${d.map(c=>this._key(c))}</div>`:h}
      ${i.length?a`<div class="buttons">${i.map(c=>this._customButton(c))}</div>`:h}
      ${e.remote.settings?.length?this._renderSettings(e,e.remote.settings):h}
    </div>`}_settingsShown(e){let t=$t(e);if(this._settingsOpen.has(t))return this._settingsOpen.get(t);try{return window.localStorage.getItem(t)==="open"}catch{return!1}}_toggleSettings(e){let t=$t(e),i=!this._settingsShown(e);this._settingsOpen.set(t,i);try{window.localStorage.setItem(t,i?"open":"closed")}catch{}this.requestUpdate()}_renderSettings(e,t){let i=this._settingsShown(e.room);return a`<div class="settings">
      <button
        class="settings-toggle"
        aria-expanded=${i?"true":"false"}
        @click=${()=>this._toggleSettings(e.room)}
      >
        <ha-icon icon="mdi:tune-variant"></ha-icon>
        <span>${this._t("settings")}</span>
        <ha-icon class="chevron" .icon=${i?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
      </button>
      ${i?a`<div class="setting-list">
            ${t.map((n,o)=>a`${o===0||t[o-1].device!==n.device?a`<span class="setting-device">${this._settingDevice(n)}</span>`:h}${this._renderSetting(n)}`)}
          </div>`:h}
    </div>`}_renderSetting(e){if(e.setting==="entity")return this._renderEntitySetting(e);let t=this.hass?.states[e.entity_id],i=e.attribute?t?.attributes[e.attribute]:void 0,n=i==null?void 0:String(i);return this._settingRow(e,this._t(`setting.${e.setting}`),this._settingSelect(e,this._t(`setting.${e.setting}`),n,e.options))}_settingDevice(e){return e.name||this.hass?.states[e.device_entity_id]?.attributes.friendly_name||e.device}_settingRow(e,t,i){return a`<div class="setting">
      <span class="setting-name">${t}</span>
      ${i}
    </div>`}_settingSelect(e,t,i,n,o=!1){let l=i!==void 0&&!n.includes(i)?[i,...n]:n;return a`<select
      aria-label=${`${t}, ${this._settingDevice(e)}`}
      .value=${ze(i??"")}
      ?disabled=${o||!l.length}
      @change=${d=>{let c=d.target.value;c&&c!==i&&this._send(e.command,{device:e.device,value:c})}}
    >
      ${i===void 0?a`<option value="" disabled>–</option>`:h}
      ${l.map(d=>a`<option value=${d} ?selected=${d===i}>${d}</option>`)}
    </select>`}_renderEntitySetting(e){let t=this.hass?.states[e.entity_id],i=e.label||t?.attributes.friendly_name||e.entity_id,n=!t||t.state==="unavailable"||t.state==="unknown",o=e.entity_id.split(".")[0];if(o==="number"||o==="input_number"){let d=Number(t?.attributes.min??0),c=Number(t?.attributes.max??100),u=Number(t?.attributes.step??1),p=this._settingDrafts.get(e.entity_id)??(n?void 0:Number(t.state)),f=p===void 0||Number.isNaN(p)?"\u2013":`${d<0&&p>0?"+":""}${p}`;return this._settingRow(e,i,a`<span class="setting-range">
          <input
            type="range"
            aria-label=${`${i}, ${this._settingDevice(e)}`}
            min=${d}
            max=${c}
            step=${u}
            .value=${ze(String(p??d))}
            ?disabled=${n}
            @input=${_=>{this._settingDrafts.set(e.entity_id,Number(_.target.value)),this.requestUpdate()}}
            @change=${_=>{this._settingDrafts.delete(e.entity_id),this._send(e.command,{device:e.device,value:Number(_.target.value)})}}
          />
          <span class="value">${f}</span>
        </span>`)}if(o==="select"||o==="input_select"){let d=Array.isArray(t?.attributes.options)?t.attributes.options.map(String):[];return this._settingRow(e,i,this._settingSelect(e,i,n?void 0:t.state,e.options.length?e.options:d,n))}let l=t?.state==="on";return this._settingRow(e,i,a`<button
        class="key toggle ${l?"active":""}"
        aria-label=${`${i}, ${this._settingDevice(e)}`}
        aria-pressed=${l?"true":"false"}
        ?disabled=${n}
        @click=${()=>this._send(e.command,{device:e.device,value:l?"off":"on"})}
      >
        ${this._t(l?"toggle.on":"toggle.off")}
      </button>`)}_key(e,t="key",i,n){let o=L(e,l=>this._t(l));return a`<button
      class=${t}
      title=${o}
      aria-label=${o}
      aria-pressed=${n===void 0?h:String(n)}
      @pointerdown=${l=>this._pressStart(l,e)}
      @pointerup=${()=>this._pressEnd(!0)}
      @pointerleave=${()=>this._pressEnd(!1)}
      @pointercancel=${()=>this._pressEnd(!1)}
      @keydown=${l=>this._keySend(l,e)}
      @contextmenu=${l=>l.preventDefault()}
    >
      ${i??a`<ha-icon .icon=${Ne[e]??"mdi:circle-small"}></ha-icon>`}
    </button>`}_renderVolumeRocker(e){let t=this._volumeState(e).muted;return a`<div class="rocker">
      ${e.commands.includes("volume_up")?this._key("volume_up"):a`<span></span>`}
      ${e.commands.includes("mute")?this._key("mute",`key label ${t?"active":""}`,a`<ha-icon .icon=${t?"mdi:volume-off":"mdi:volume-high"}></ha-icon>`,t):a`<span class="label">${this._t("rocker.volume")}</span>`}
      ${e.commands.includes("volume_down")?this._key("volume_down"):a`<span></span>`}
    </div>`}_renderChannelRocker(e){return a`<div class="rocker">
      ${e.commands.includes("channel_up")?this._key("channel_up"):a`<span></span>`}
      <span class="label">${this._t("rocker.channels")}</span>
      ${e.commands.includes("channel_down")?this._key("channel_down"):a`<span></span>`}
    </div>`}_renderDpad(e){let t=n=>e.commands.includes(n),i=(n,o)=>t(n)?this._key(n,`key ${o}`,n==="ok"?"OK":void 0):a`<span></span>`;return a`<div class="dpad">
      <span></span>${i("up","up")}<span></span>
      ${i("left","left")}${i("ok","ok")}${i("right","right")}
      <span></span>${i("down","down")}<span></span>
    </div>`}_padChoice(e){if(!e.activity)return null;let t=Me(e.room,e.activity);if(this._padChoices.has(t))return this._padChoices.get(t);try{return window.localStorage.getItem(t)}catch{return null}}_renderPadSwitch(e,t){let i=this._t(t?"pad.show_arrows":"pad.show_touchpad");return a`<button
      class="key pad-switch"
      title=${i}
      aria-label=${i}
      @click=${()=>{if(!e.activity)return;let n=Me(e.room,e.activity),o=t?"off":"on";this._padChoices.set(n,o);try{window.localStorage.setItem(n,o)}catch{}this.requestUpdate()}}
    >
      <ha-icon .icon=${t?"mdi:arrow-all":"mdi:gesture-tap"}></ha-icon>
    </button>`}_renderTouchpad(e){let t=n=>e.commands.includes(n),i={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right",Enter:"ok"," ":"ok"};return a`<div
      class="touchpad"
      role="group"
      tabindex="0"
      aria-label=${this._t("touchpad")}
      title=${this._t("touchpad")}
      @pointerdown=${n=>{n.button===0&&(n.currentTarget.setPointerCapture(n.pointerId),this._swipe=new me,this._swipe.start(n.clientX,n.clientY,n.timeStamp))}}
      @pointermove=${n=>{for(let o of this._swipe?.move(n.clientX,n.clientY)??[])t(o)&&this._send(o)}}
      @pointerup=${n=>{let o=this._swipe?.end(n.clientX,n.clientY,n.timeStamp);this._swipe=void 0,o&&t("ok")&&this._send("ok")}}
      @pointercancel=${()=>this._swipe=void 0}
      @keydown=${n=>{let o=i[n.key];o&&t(o)&&(n.preventDefault(),this._send(o))}}
      @contextmenu=${n=>n.preventDefault()}
    >
      <span class="touchpad-hint">${this._t("touchpad.hint")}</span>
    </div>`}_volumeState(e){let t=e.entity_id?this.hass?.states[e.entity_id]:void 0,i=t?.attributes.volume_level;return{level:typeof i=="number"?i:void 0,muted:t?.attributes.is_volume_muted===!0}}_renderSlider(e){let{level:t}=this._volumeState(e),i=this._volumeDraft??(t!==void 0?Math.round(t*100):0);return a`<div class="slider">
      <ha-icon icon="mdi:volume-medium"></ha-icon>
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        .value=${String(i)}
        ?disabled=${t===void 0}
        aria-label=${this._t("volume")}
        @input=${n=>{this._volumeDraft=Number(n.target.value)}}
        @change=${n=>{let o=Number(n.target.value);this._volumeDraft=void 0,this._send("volume_set",{value:o/100})}}
      />
      <span class="value">${t!==void 0||this._volumeDraft!==void 0?i:"\u2013"}</span>
    </div>`}_customButton(e){let t=e.name??L(e.command,n=>this._t(n)),i={};return e.device&&(i.device=e.device),e.value!==null&&e.value!==void 0&&(i.value=e.value),a`<button
      class="custom"
      title=${t}
      @pointerdown=${n=>this._pressStart(n,e.command,i)}
      @pointerup=${()=>this._pressEnd(!0)}
      @pointerleave=${()=>this._pressEnd(!1)}
      @pointercancel=${()=>this._pressEnd(!1)}
      @keydown=${n=>this._keySend(n,e.command,i)}
    >
      ${e.icon||Ne[e.command]?a`<ha-icon .icon=${e.icon??Ne[e.command]}></ha-icon>`:h}
      <span>${t}</span>
    </button>`}};Q.properties={hass:{attribute:!1},preview:{attribute:!1},_config:{state:!0},_view:{state:!0},_loaded:{state:!0},_subscribeError:{state:!0},_volumeDraft:{state:!0}},Q.styles=y`
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
  `;customElements.get("easy-av-control-card")||customElements.define("easy-av-control-card",Q);function Ft(r,s){let e=r.entities?.[s]?.device_id,i=(e?r.devices?.[e]:void 0)?.identifiers?.find(([n])=>n===pe);return i?i[1]:null}var _e=window;_e.customCards=_e.customCards??[];_e.customCards.some(r=>r.type==="easy-av-control-card")||_e.customCards.push({type:"easy-av-control-card",name:"Easy AV Control Remote",description:"Remote control for an Easy AV Control room",preview:!0,documentationURL:"https://github.com/Ltek/easy-av-control#the-card",getEntitySuggestion:(r,s)=>{let e=Ft(r,s);return e?{config:{type:"custom:easy-av-control-card",room:e}}:null}});var Qt=400,Z=class extends g{constructor(){super(...arguments);this._request=0}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._timer)}willUpdate(e){if(e.has("activityId")&&(this._pressed=void 0),["room","roomId","activityId"].some(t=>e.has(t))){window.clearTimeout(this._timer);let t=this._preview===void 0&&this._failed===void 0;this._timer=window.setTimeout(()=>this._load(),t?0:Qt)}}async _load(){let e=++this._request;try{let t=await this.hass.callWS({type:"easy_av_control/config/remote",room:this.roomId,config:this.room,activity:this.activityId});e===this._request&&(this._preview=t,this._failed=void 0)}catch(t){e===this._request&&(this._failed=t.message??String(t))}}_t(e,t){return S(this.hass?.language,e,t)}_entity(e){let t=String(e??"");return this.hass.states[t]?.attributes.friendly_name||t}_device(e){let t=String(e??""),i=this.room.devices?.[t];return i?.name||(i?.entity_id?this._entity(i.entity_id):"")||t}_button(e,t){let[i,n]=t.split("|"),o=e.remote?.buttons.find(d=>d.command===i&&(d.device??"")===n);if(o?.name)return o.name;let l=e.remote?.settings?.find(d=>d.command===i&&d.device===n);return l?.setting==="entity"?l.label||this._entity(l.entity_id):L(i,d=>this._t(d))}_onCall(e){let{service:t,data:i}=e.detail;t==="send_command"&&(this._pressed=`${i.command}|${i.device??""}`)}_describe(e){let t=e.device?this._device(e.device):this._t("preview.this_activity");switch(e.via){case"media_player":case"entity":return{to:t,how:`${e.action} \u2192 ${this._entity(e.entity_id)}`};case"remote":return{to:t,how:`remote.send_command "${e.key}" \u2192 ${this._entity(e.entity_id)}`};case"device_commands":return{to:t,how:this._t("preview.device_commands",{actions:(e.actions??[]).join(", ")})};case"activity_commands":return{to:t,how:this._t("preview.activity_commands",{actions:(e.actions??[]).join(", ")})};default:return{to:t,how:e.device?this._t("preview.unknown_on_device",{device:t}):this._t("preview.unknown")}}}_renderPressed(e,t){let i=this._pressed?t[this._pressed]:void 0;if(!this._pressed||!i)return a`<p class="pressed hint">${this._t("preview.tap")}</p>`;let{to:n,how:o}=this._describe(i);return a`<p class="pressed ${i.via?"":"bad"}">
      <span class="what">${this._button(e,this._pressed)} → ${n}</span>
      <span class="how">${o}</span>
      ${i.ready?a`<span class="note">${this._t("preview.ready")}</span>`:h}
    </p>`}_renderRoutes(e){return a`<h4>${this._t("preview.groups")}</h4>
      <ul class="routes">
        ${e.map(t=>{let i=t.mode==="hidden"?this._t("preview.hidden"):t.device?`${this._device(t.device)} (${this._t(`preview.mode_${t.mode}`)})`:this._t("preview.no_device"),n=t.commands.length?t.commands.map(o=>L(o,l=>this._t(l))).join(", "):t.mode==="hidden"?"":t.device?this._t("preview.no_keys",{device:this._device(t.device)}):"";return a`<li class=${t.commands.length?"":"off"}>
            <span class="group">${this._t(`field.${t.group}`)}</span>
            <span class="where">${i}</span>
            ${n?a`<span class="keys">${n}</span>`:h}
          </li>`})}
      </ul>`}render(){if(this._failed)return a`<p class="error">${this._t("flow.failed",{error:this._failed})}</p>`;let e=this._preview;if(!e)return a`<p class="hint">${this._t("loading")}</p>`;if(e.error){let l=e.error.path.join(".");return a`<p class="error">
        ${this._t("flow.invalid",{error:l?`${l}: ${e.error.message}`:e.error.message})}
      </p>`}let{view:t,targets:i,routes:n}=e,o=Object.entries(i).filter(([,l])=>!l.via);return a`<div class="layout">
      <div class="card">
        <easy-av-control-card
          .hass=${this.hass}
          .preview=${t}
          @preview-call=${this._onCall}
        ></easy-av-control-card>
      </div>
      <div class="info">
        ${this._renderPressed(t,i)}
        ${o.length?a`<div class="dead">
              <span>${this._t("preview.dead")}</span>
              <ul>
                ${o.map(([l,d])=>a`<li>${this._button(t,l)}: ${this._describe(d).how}</li>`)}
              </ul>
            </div>`:h}
        ${this._renderRoutes(n)}
      </div>
    </div>`}};Z.properties={hass:{attribute:!1},room:{attribute:!1},roomId:{attribute:!1},activityId:{attribute:!1},_preview:{state:!0},_failed:{state:!0},_pressed:{state:!0}},Z.styles=y`
    :host {
      display: block;
    }
    .layout {
      display: grid;
      grid-template-columns: minmax(0, 360px) minmax(0, 1fr);
      gap: 16px;
      align-items: start;
    }
    @media (max-width: 700px) {
      .layout {
        grid-template-columns: minmax(0, 1fr);
      }
    }
    .card {
      max-width: 360px;
    }
    .pressed {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin: 0 0 12px;
      padding: 8px 12px;
      border-radius: 8px;
      background: var(--secondary-background-color);
      overflow-wrap: anywhere;
    }
    .pressed.hint {
      color: var(--secondary-text-color);
    }
    .pressed.bad {
      color: var(--error-color, #db4437);
    }
    .what {
      font-weight: 500;
    }
    .how {
      font-family: var(--code-font-family, monospace);
      font-size: 0.85em;
    }
    .note {
      font-size: 0.85em;
      color: var(--secondary-text-color);
    }
    .dead {
      color: var(--error-color, #db4437);
      font-size: 0.9em;
      margin-bottom: 12px;
    }
    .dead ul {
      margin: 4px 0 0;
      padding-left: 20px;
    }
    h4 {
      font-size: 0.95em;
      font-weight: 500;
      margin: 0 0 6px;
    }
    ul.routes {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    ul.routes li {
      display: grid;
      grid-template-columns: 110px minmax(0, 1fr);
      gap: 0 8px;
      padding: 6px 0;
      border-top: 1px solid var(--divider-color);
    }
    ul.routes li:first-child {
      border-top: none;
    }
    ul.routes li.off .where {
      color: var(--secondary-text-color);
    }
    .group {
      font-weight: 500;
    }
    .keys {
      grid-column: 2;
      font-size: 0.85em;
      color: var(--secondary-text-color);
    }
    .error {
      color: var(--error-color, #db4437);
      margin: 0;
    }
    p.hint {
      color: var(--secondary-text-color);
    }
  `;customElements.get("easy-av-control-remote-preview")||customElements.define("easy-av-control-remote-preview",Z);function Zt(r){let s=(r??"").split(",").map(e=>e.trim()).filter(Boolean);return s.length>1?s:s[0]}var fe={number:{min:0,max:3600,step:1,mode:"box",unit_of_measurement:"s"}},X=class extends g{constructor(){super();this._relatedKey="";this._label=e=>this._t(`field.${e.name}`);this._helper=e=>{let t=`helper.${e.name}`,i=this._t(t);return i===t?void 0:i};this._tab="devices",this._view={kind:"list"},this.sources={},this.soundModes={},this._related={}}_loadRelated(){let e=[...new Set(Object.values(this.room?.devices??{}).map(i=>i.entity_id).filter(Boolean))].sort(),t=e.join(",");!this.hass||t===this._relatedKey||(this._relatedKey=t,this.hass.callWS({type:"easy_av_control/config/related",entity_ids:e}).then(i=>{t===this._relatedKey&&(this._related=i)}).catch(()=>{}))}willUpdate(e){(e.has("room")||e.has("hass"))&&this._loadRelated(),e.has("roomId")&&e.get("roomId")!==void 0&&(this._view={kind:"list"},this._notice=void 0)}_t(e,t){return S(this.hass?.language,e,t)}_emit(e){this.dispatchEvent(new CustomEvent("room-changed",{detail:{room:e}}))}_show(e){this._view=e,this._notice=void 0,window.scrollTo({top:0})}render(){let e=this._view;if(e.kind==="device"&&this.room.devices?.[e.id])return this._renderDevice(e.id,this.room.devices[e.id]);if(e.kind==="activity"&&this.room.activities?.[e.id])return this._renderActivity(e.id,this.room.activities[e.id]);let t=[{value:"__last",label:this._t("default_last")},...Object.entries(this.room.activities??{}).map(([i,n])=>({value:i,label:n.name??i}))];return a`
      <ha-form
        .hass=${this.hass}
        .data=${{name:this.room.name??"",area_id:this.room.area_id??void 0,default_activity:this.room.default_activity??"__last"}}
        .schema=${[{name:"name",required:!0,selector:{text:{}}},{name:"area_id",selector:{area:{}}},{name:"default_activity",selector:{select:{options:t,mode:"dropdown"}}}]}
        .computeLabel=${i=>this._t(`room_${i.name==="area_id"?"area":i.name}`)}
        .computeHelper=${this._helper}
        @value-changed=${i=>{let n=i.detail.value;this._emit(v({...this.room,name:n.name,area_id:n.area_id,default_activity:n.default_activity==="__last"?void 0:n.default_activity}))}}
      ></ha-form>

      <div class="tabs" role="tablist">
        ${["devices","activities","yaml"].map(i=>a`<button
            role="tab"
            class=${this._tab===i?"active":""}
            aria-selected=${this._tab===i?"true":"false"}
            @click=${()=>this._tab=i}
          >
            ${this._t(`tab_${i}`)}
          </button>`)}
      </div>
      ${this._notice?a`<div class="notice">${this._notice}</div>`:h}
      ${this._tab==="devices"?this._renderDeviceList():this._tab==="activities"?this._renderActivityList():this._renderYaml()}
      <button class="danger delete-room" @click=${()=>this.dispatchEvent(new CustomEvent("delete-room"))}>
        ${this._t("delete_room")}
      </button>
    `}_detailHeader(e,t,i){return a`<div class="detail-head">
        <button class="back" @click=${()=>this._show({kind:"list"})}>
          <ha-icon icon="mdi:arrow-left"></ha-icon>
          <span>${e}</span>
        </button>
        <button class="danger" @click=${i}>${this._t("delete")}</button>
      </div>
      <h2>${t}</h2>
      ${this._notice?a`<div class="notice">${this._notice}</div>`:h}`}_card(e,t,i){return a`<section class="card">
      <h3>${e}</h3>
      ${t?a`<p class="hint">${t}</p>`:h}
      ${i}
    </section>`}_advanced(e,t){return a`<details class="card advanced">
      <summary>${this._t("section_advanced")}</summary>
      <p class="hint">${e}</p>
      ${t}
    </details>`}_deviceTitle(e,t){let i=t.entity_id?this.hass.states[t.entity_id]:void 0;return t.name||i?.attributes.friendly_name||(t.entity_id?e:this._t("new_device"))}_renderDeviceList(){let e=Object.entries(this.room.devices??{});return a`
      <p class="hint">${this._t("devices_intro")}</p>
      ${e.length?a`<div class="list">
            ${e.map(([t,i])=>{let n=!i.entity_id||this._entityKnown(i.entity_id);return this._row(this._deviceTitle(t,i),i.entity_id||this._t("no_entity"),()=>this._show({kind:"device",id:t}),n?void 0:this._t("entity_missing"))})}
          </div>`:a`<p class="empty">${this._t("devices_empty")}</p>`}
      <button class="add" @click=${this._addDevice}>+ ${this._t("add_device")}</button>
    `}_entityKnown(e){return e in this.hass.states||e in(this.hass.entities??{})}_row(e,t,i,n){return a`<button class="row-item" @click=${i}>
      <span class="row-text">
        <span class="title">${e}</span>
        <span class="sub">${t}</span>
        ${n?a`<span class="warn">${n}</span>`:h}
      </span>
      <ha-icon icon="mdi:chevron-right"></ha-icon>
    </button>`}_deviceData(e){let t=e.ready??null;return{entity_id:e.entity_id,name:e.name,remote_entity:e.remote_entity??void 0,power_switch:e.power_switch??void 0,delay_after_power:e.delay_after_power,delay_after_on:e.delay_after_on,delay_after_off:e.delay_after_off,ready_enabled:t!==null,ready_entity:t?.entity_id,ready_state:Array.isArray(t?.state)?t?.state.join(", "):t?.state,ready_timeout:t?.timeout,ready_reload:t?.reload_integration,ready_on_timeout:t?.on_timeout,commands:e.commands}}_deviceForm(e,t,i){return a`<ha-form
      .hass=${this.hass}
      .data=${t}
      .schema=${i}
      .computeLabel=${this._label}
      .computeHelper=${this._helper}
      @value-changed=${n=>this._deviceChanged(e,{...t,...n.detail.value})}
    ></ha-form>`}_remoteOf(e){let t=this.hass.entities??{},i=e?t[e]?.device_id:void 0;if(i)return Object.values(t).find(n=>n?.device_id===i&&n.entity_id.startsWith("remote."))?.entity_id}_renderDevice(e,t){let i=this._deviceData(t),n=t.ready??null,o=this._remoteOf(t.entity_id),l=n?.entity_id===o&&n?.reload_integration===!0&&t.remote_entity===o,d=je(this.room,e);return a`
      ${this._detailHeader(this._t("tab_devices"),this._deviceTitle(e,t),()=>this._deleteDevice(e))}
      ${d.length?a`<p class="hint">${this._t("used_by",{where:d.join(", ")})}</p>`:h}

      ${this._card(this._t("section_device"),this._t("hint_device"),this._deviceForm(e,i,[{name:"entity_id",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"remote_entity",selector:{entity:{filter:{domain:"remote"}}}}]))}
      ${this._card(this._t("section_power"),this._t("hint_power"),this._deviceForm(e,i,[{name:"power_switch",selector:{entity:{filter:{domain:["switch","input_boolean","light"]}}}},...t.power_switch?[{name:"delay_after_power",selector:fe}]:[]]))}
      ${this._card(this._t("section_delays"),this._t("hint_delays"),this._deviceForm(e,i,[{name:"delay_after_on",selector:fe},{name:"delay_after_off",selector:fe}]))}
      ${this._card(this._t("section_ready"),this._t("hint_ready"),a`${o&&!l?a`<button class="add preset" @click=${()=>this._applyReadyPreset(e,t,o)}>
                ${this._t("ready_preset",{entity:o})}
              </button>`:h}
          ${this._deviceForm(e,i,[{name:"ready_enabled",selector:{boolean:{}}},...n!==null?[{name:"ready_entity",selector:{entity:{}}},{name:"ready_state",selector:{text:{}}},{name:"ready_timeout",selector:fe},{name:"ready_reload",selector:{boolean:{}}},{name:"ready_on_timeout",selector:{select:{options:[{value:"abort",label:this._t("on_timeout_abort")},{value:"continue",label:this._t("on_timeout_continue")}],mode:"dropdown"}}}]:[]])}`)}
      ${this._card(this._t("card_settings"),this._t("device_settings_hint"),this._renderDeviceSettings(e,t))}
      ${this._advanced(this._t("hint_device_advanced"),a`<label class="id">
            ${this._t("device_id")}
            <input
              .value=${e}
              @change=${c=>this._renameDevice(e,c.target.value)}
            />
          </label>
          ${this._deviceForm(e,i,[{name:"commands",selector:{object:{}}}])}`)}
    `}_applyReadyPreset(e,t,i){let n={entity_id:i,state:"on",timeout:60,reload_integration:!0,on_timeout:"continue"};this._emit({...this.room,devices:{...this.room.devices,[e]:{...t,ready:n,remote_entity:i}}})}_unsaved(e,t){return!(t in(this.saved?.[e]??{}))}_deviceChanged(e,t){let i=v({entity_id:t.entity_id,name:t.name,remote_entity:t.remote_entity,power_switch:t.power_switch,ready:t.ready_enabled?v({entity_id:t.ready_entity,state:Zt(t.ready_state),timeout:t.ready_timeout,reload_integration:t.ready_reload,on_timeout:t.ready_on_timeout}):void 0,delay_after_power:t.power_switch?t.delay_after_power:void 0,delay_after_on:t.delay_after_on,delay_after_off:t.delay_after_off,commands:t.commands}),n=this.room.devices?.[e]?.settings;n!==void 0&&(i.settings=n),t.ready_enabled&&!i.ready&&(i.ready={});let o={...this.room,devices:{...this.room.devices,[e]:i}},l=i.entity_id?.split(".")[1];if(l&&this._unsaved("devices",e)&&i.entity_id!==this.room.devices?.[e]?.entity_id){let d=A(D(l),Object.keys(o.devices??{}).filter(c=>c!==e));if(d!==e){this._emit(De(o,e,d)),this._view={kind:"device",id:d};return}}this._emit(o)}_addDevice(){let e=A("device",Object.keys(this.room.devices??{}));this._emit({...this.room,devices:{...this.room.devices,[e]:{entity_id:""}}}),this._show({kind:"device",id:e})}_renameDevice(e,t){let i=D(t);if(!i||i===e){this.requestUpdate();return}let n=A(i,Object.keys(this.room.devices??{}).filter(o=>o!==e));this._emit(De(this.room,e,n)),this._view={kind:"device",id:n}}_deleteDevice(e){let t=je(this.room,e);if(t.length){this._notice=this._t("device_in_use",{id:e,where:t.join(", ")});return}if(!window.confirm(`${this._t("delete")}: ${this._deviceTitle(e,this.room.devices[e])}?`))return;let i={...this.room.devices};delete i[e],this._emit({...this.room,devices:i}),this._show({kind:"list"})}_renderActivityList(){let e=Object.entries(this.room.activities??{}).sort(([i,n],[o,l])=>(n.order??1e3)-(l.order??1e3)||(n.name??i).localeCompare(l.name??o,void 0,{sensitivity:"base"})),t=i=>(i.devices??[]).map(n=>this.room.devices?.[n]?.name??n).join(" \u2192 ");return a`
      <p class="hint">${this._t("activities_intro")}</p>
      ${e.length?a`<div class="list">
            ${e.map(([i,n])=>this._row(n.name??i,t(n)||this._t("no_devices"),()=>this._show({kind:"activity",id:i})))}
          </div>`:a`<p class="empty">${this._t("activities_empty")}</p>`}
      ${Object.keys(this.room.devices??{}).length?a`<button class="add" @click=${this._addActivity}>+ ${this._t("add_activity")}</button>`:a`<p class="hint">${this._t("needs_devices")}</p>`}
    `}_setActivity(e,t){this._emit({...this.room,activities:{...this.room.activities,[e]:v(t)}})}_renderActivity(e,t){let i=Object.keys(this.room.devices??{}),n=t.devices??[],o=[{value:"__auto",label:this._t("route_auto")},{value:"__none",label:this._t("route_none")},...n.map(c=>({value:c,label:this.room.devices?.[c]?.name??c}))],l=t.remote??{},d={};for(let c of j)d[c]=c in l?l[c]===null?"__none":l[c]:"__auto";return d.touchpad=l.touchpad===!0?"on":l.touchpad===!1?"off":"auto",a`
      ${this._detailHeader(this._t("tab_activities"),t.name??e,()=>this._deleteActivity(e,t))}

      ${this._card(this._t("section_general"),this._t("hint_general"),a`<ha-form
          .hass=${this.hass}
          .data=${{name:t.name,icon:t.icon,order:t.order}}
          .schema=${[{name:"name",required:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"order",selector:{number:{min:0,max:999,mode:"box"}}}]}
          .computeLabel=${this._label}
          @value-changed=${c=>{let u=c.detail.value;this._activityGeneralChanged(e,t,u)}}
        ></ha-form>`)}

      ${this._card(this._t("section_activity_devices"),this._t("hint_activity_devices"),a`${n.length?a`<ol class="ordered">
                ${n.map((c,u)=>a`<li>
                    <span class="li-text">
                      <span>${this.room.devices?.[c]?.name??c}</span>
                      <span class="sub">${this.room.devices?.[c]?.entity_id??""}</span>
                    </span>
                    ${this._moveButtons(n,u,m=>this._setActivity(e,{...t,devices:m}))}
                  </li>`)}
              </ol>`:h}
          ${i.some(c=>!n.includes(c))?this._picker(this._t("add_device_to_activity"),i.filter(c=>!n.includes(c)).map(c=>({value:c,label:this.room.devices?.[c]?.name??c})),c=>this._setActivity(e,{...t,devices:[...n,c]})):h}`)}

      ${this._card(this._t("steps"),this._t("hint_steps"),a`${(t.steps??[]).map((c,u)=>this._renderStep(e,t,c,u))}
          ${this._picker(this._t("add_step"),lt.map(c=>({value:c,label:this._t(`step.${c}`)})),c=>this._setActivity(e,{...t,steps:[...t.steps??[],{type:c}]}))}`)}

      ${this._card(this._t("section_flow"),this._t("hint_flow"),a`<easy-av-control-flow
          .hass=${this.hass}
          .room=${this.room}
          .roomId=${this.roomId}
          .activityId=${e}
        ></easy-av-control-flow>`)}

      ${this._card(this._t("remote"),this._t("hint_remote"),a`<ha-form
          .hass=${this.hass}
          .data=${d}
          .schema=${[...j.map(c=>({name:c,selector:{select:{options:o,mode:"dropdown"}}})),{name:"touchpad",selector:{select:{options:["auto","on","off"].map(c=>({value:c,label:this._t(`touchpad_${c}`)})),mode:"dropdown"}}}]}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${c=>this._routesChanged(e,t,c.detail.value)}
        ></ha-form>`)}

      ${this._card(this._t("quick_select"),this._t("quick_select_hint"),this._renderQuickSelect(e,t))}

      ${this._card(this._t("card_settings"),this._t("card_settings_hint"),this._renderCardSettings(e,t))}

      ${this._card(this._t("section_remote_preview"),this._t("hint_remote_preview"),a`<easy-av-control-remote-preview
          .hass=${this.hass}
          .room=${this.room}
          .roomId=${this.roomId}
          .activityId=${e}
        ></easy-av-control-remote-preview>`)}

      ${this._advanced(this._t("hint_activity_advanced"),a`<p class="hint">${this._t("activity_id_hint",{id:e})}</p>
          <ha-form
            .hass=${this.hass}
            .data=${{buttons:(l.buttons??[]).filter(c=>!q(c)),activity_commands:t.commands}}
            .schema=${[{name:"buttons",selector:{object:{}}},{name:"activity_commands",selector:{object:{}}}]}
            .computeLabel=${this._label}
            @value-changed=${c=>this._extrasChanged(e,t,c.detail.value)}
          ></ha-form>
          <h4>${this._t("hooks")}</h4>
          <ha-form
            .hass=${this.hass}
            .data=${{on_start:t.on_start??[],on_stop:t.on_stop??[]}}
            .schema=${[{name:"on_start",selector:{action:{}}},{name:"on_stop",selector:{action:{}}}]}
            .computeLabel=${this._label}
            @value-changed=${c=>{let u=c.detail.value;this._setActivity(e,{...t,on_start:u.on_start,on_stop:u.on_stop})}}
          ></ha-form>`)}
    `}_activityGeneralChanged(e,t,i){let n=v({...t,name:i.name,icon:i.icon,order:i.order}),o=i.name?.trim();if(!o||o===t.name||!this._unsaved("activities",e)){this._setActivity(e,n);return}let l=A(D(o),Object.keys(this.room.activities??{}).filter(u=>u!==e));if(l===e){this._setActivity(e,n);return}let d={};for(let[u,m]of Object.entries(this.room.activities??{}))d[u===e?l:u]=u===e?n:m;let c={...this.room,activities:d};c.default_activity===e&&(c.default_activity=l),this._emit(c),this._view={kind:"activity",id:l}}_renderStep(e,t,i,n){let o=t.steps??[],l=d=>this._setActivity(e,{...t,steps:d});return a`<div class="step">
      <div class="step-head">
        <span class="title">${n+1}. ${this._t(`step.${i.type}`)}</span>
        ${this._moveButtons(o,n,l)}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${i}
        .schema=${ht(this.hass,this.room,i,d=>this._t(d),this.sources,this.soundModes)}
        .computeLabel=${this._label}
        @value-changed=${d=>{let c=[...o];c[n]=v({...d.detail.value,type:i.type}),l(c)}}
      ></ha-form>
    </div>`}_routesChanged(e,t,i){let n={};for(let o of j)i[o]==="__none"?n[o]=null:i[o]&&i[o]!=="__auto"&&(n[o]=i[o]);(i.touchpad==="on"||i.touchpad==="off")&&(n.touchpad=i.touchpad==="on"),t.remote?.buttons&&(n.buttons=t.remote.buttons),t.remote?.settings&&(n.settings=t.remote.settings),this._setActivity(e,{...t,remote:Object.keys(n).length?n:void 0})}_extrasChanged(e,t,i){let n=(t.remote?.buttons??[]).filter(q),o=[...Array.isArray(i.buttons)?i.buttons:[],...n],l={...t.remote,buttons:o};this._setActivity(e,{...t,remote:le(l),commands:i.activity_commands})}_renderQuickSelect(e,t){let i=t.remote?.buttons??[],n=i.filter(u=>!q(u)),o=i.filter(q),l=u=>{let m={...t.remote,buttons:[...n,...u]};this._setActivity(e,{...t,remote:le(m)})},d=(t.devices??[]).filter(u=>this.room.devices?.[u]?.entity_id?.startsWith("media_player.")),c=d.map(u=>({value:u,label:this.room.devices?.[u]?.name??u}));return a`${o.map((u,m)=>{let p=this.room.devices?.[u.device]?.entity_id;return a`<div class="step">
          <div class="step-head">
            <span class="title">${u.name||u.source||""}</span>
            ${this._moveButtons(o,m,l)}
          </div>
          <ha-form
            .hass=${this.hass}
            .data=${{device:u.device,source:u.source,label:u.name,icon:u.icon}}
            .schema=${[{name:"device",required:!0,selector:{select:{options:c,mode:"dropdown"}}},{name:"source",required:!0,selector:{select:{options:Re(this.hass,this.sources,p),custom_value:!0,mode:"dropdown"}}},{name:"label",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]}
            .computeLabel=${this._label}
            .computeHelper=${this._helper}
            @value-changed=${f=>{let _=f.detail.value,$=[...o];$[m]=v({device:_.device,source:_.source??"",name:_.label,icon:_.icon},["source"]),l($)}}
          ></ha-form>
        </div>`})}
      ${d.length?a`<button class="add" @click=${()=>l([...o,{device:d[d.length-1],source:""}])}>
            + ${this._t("add_quick_select")}
          </button>`:a`<p class="hint">${this._t("quick_select_no_player")}</p>`}`}_settingList(e,t){let i=Ce[String(t)]??"source_list",n=i==="sound_mode_list"?this.soundModes:this.sources;return K(this.hass,n,this.room.devices?.[String(e)]?.entity_id,i)}_describeSetting(e,t){let i=e.entity?e.name||this.hass.states[e.entity]?.attributes.friendly_name||e.entity||this._t("setting.entity"):this._t(`setting.${e.setting}`);if(!t)return i;let n=this.room.devices?.[String(e.device)];return`${i} (${n?.name??String(e.device)})`}_settingsMode(e,t,i){return a`<ha-form
      .hass=${this.hass}
      .data=${{settings_mode:e?"chosen":"auto"}}
      .schema=${[{name:"settings_mode",required:!0,selector:{select:{options:[{value:"auto",label:this._t(t)},{value:"chosen",label:this._t("settings_chosen")}],mode:"dropdown"}}}]}
      .computeLabel=${this._label}
      @value-changed=${n=>{let o=n.detail.value.settings_mode==="chosen";o!==e&&i(o)}}
    ></ha-form>`}_renderSettingItems(e,t,i,n){let o=d=>!!this.room.devices?.[String(d)]?.entity_id?.startsWith("media_player."),l=(i??[]).map(d=>({value:d,label:this.room.devices?.[d]?.name??d}));return a`${e.map((d,c)=>{let u=i?d.device:n,m=d.entity!==void 0?"entity":d.setting,p=o(u)?[...Oe,"entity"]:["entity"],f=d.entity,_=f?this.hass.states[f]?.attributes.options:void 0,$=m==="entity"?Array.isArray(_)?_.map(String):void 0:this._settingList(u,m);return a`<div class="step">
        <div class="step-head">
          <span class="title">${this._describeSetting(d,i!==null)}</span>
          ${this._moveButtons(e,c,t)}
        </div>
        <ha-form
          .hass=${this.hass}
          .data=${{device:d.device,setting:m,entity:f,name:d.name,options:d.options??[]}}
          .schema=${[...i?[{name:"device",required:!0,selector:{select:{options:l,mode:"dropdown"}}}]:[],{name:"setting",required:!0,selector:{select:{options:p.map(w=>({value:w,label:this._t(`setting.${w}`)})),mode:"dropdown"}}},...m==="entity"?[{name:"entity",required:!0,selector:{entity:{filter:{domain:[...ct]}}}},{name:"name",selector:{text:{}}}]:[],...$!==void 0?[{name:"options",selector:{select:{options:$,multiple:!0,custom_value:!0,mode:"dropdown"}}}]:[]]}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${w=>{let T=w.detail.value,Le=o(i?T.device:n)?T.setting:"entity",Ve=i?{device:T.device}:{},Ie=[...e];Ie[c]=Le==="entity"?v({...Ve,entity:T.entity??"",name:T.name,options:T.options},["entity"]):v({...Ve,setting:Le,options:T.options}),t(Ie)}}
        ></ha-form>
      </div>`})}`}get _lists(){return{source_list:this.sources,sound_mode_list:this.soundModes}}_renderCardSettings(e,t){let i=t.remote?.settings,n=u=>{let m={...t.remote};u===void 0?delete m.settings:m.settings=u,this._setActivity(e,{...t,remote:le(m)})},o=ut(this.hass,this.room,t,this._lists,this._related),l=this._settingsMode(i!==void 0,"settings_auto",u=>n(u?o.map(m=>({...m})):void 0));if(i===void 0)return a`${l}
        <p class="hint">
          ${o.length?this._t("settings_auto_shows",{list:o.map(u=>this._describeSetting(u,!0)).join(", ")}):this._t("settings_auto_none")}
        </p>`;let d=t.devices??[],c=d.filter(u=>this.room.devices?.[u]?.entity_id?.startsWith("media_player."));return a`${l}
      ${this._renderSettingItems(i,n,d)}
      ${i.length?h:a`<p class="hint">${this._t("settings_none")}</p>`}
      ${d.length?a`<button
            class="add"
            @click=${()=>n([...i,c.length?{device:c[0],setting:"sound_mode"}:{device:d[0],entity:""}])}
          >
            + ${this._t("add_setting")}
          </button>`:h}`}_renderDeviceSettings(e,t){let i=t.settings,n=c=>{let u={...t};c===void 0?delete u.settings:u.settings=c,this._emit({...this.room,devices:{...this.room.devices,[e]:u}})},o=Pe(this.hass,this.room,e,this._lists,this._related),l=this._settingsMode(i!==void 0,"device_settings_auto",c=>n(c?o.map(({device:u,...m})=>m):void 0));if(i===void 0)return a`${l}
        <p class="hint">
          ${o.length?this._t("settings_auto_shows",{list:o.map(c=>this._describeSetting(c,!1)).join(", ")}):this._t("device_settings_auto_none")}
        </p>`;let d=t.entity_id?.startsWith("media_player.");return a`${l}
      ${this._renderSettingItems(i,n,null,e)}
      ${i.length?h:a`<p class="hint">${this._t("device_settings_none")}</p>`}
      <button
        class="add"
        @click=${()=>n([...i,d?{setting:"sound_mode"}:{entity:""}])}
      >
        + ${this._t("add_setting")}
      </button>`}_addActivity(){let e=this._t("new_activity"),t=A(D(e),Object.keys(this.room.activities??{}));this._setActivity(t,{name:e,devices:[]}),this._show({kind:"activity",id:t})}_deleteActivity(e,t){if(!window.confirm(`${this._t("delete")}: ${t.name??e}?`))return;let i={...this.room.activities};delete i[e];let n={...this.room,activities:i};n.default_activity===e&&delete n.default_activity,this._emit(n),this._show({kind:"list"})}_renderYaml(){return a`<p class="hint">${this._t("yaml_intro")}</p>
      <ha-form
        .hass=${this.hass}
        .data=${{yaml:this.room}}
        .schema=${[{name:"yaml",selector:{object:{}}}]}
        .computeLabel=${()=>""}
        @value-changed=${e=>{let t=e.detail.value.yaml;t&&typeof t=="object"&&!Array.isArray(t)&&this._emit(t)}}
      ></ha-form>`}_moveButtons(e,t,i){let n=o=>{let l=[...e],[d]=l.splice(t,1);l.splice(o,0,d),i(l)};return a`<span class="move">
      <button title=${this._t("move_up")} aria-label=${this._t("move_up")} ?disabled=${t===0} @click=${()=>n(t-1)}>
        <ha-icon icon="mdi:arrow-up"></ha-icon>
      </button>
      <button title=${this._t("move_down")} aria-label=${this._t("move_down")} ?disabled=${t===e.length-1} @click=${()=>n(t+1)}>
        <ha-icon icon="mdi:arrow-down"></ha-icon>
      </button>
      <button title=${this._t("delete")} aria-label=${this._t("delete")} @click=${()=>i(e.filter((o,l)=>l!==t))}>
        <ha-icon icon="mdi:close"></ha-icon>
      </button>
    </span>`}_picker(e,t,i){return a`<ha-form
      class="picker"
      .hass=${this.hass}
      .data=${{pick:void 0}}
      .schema=${[{name:"pick",selector:{select:{options:t,mode:"dropdown"}}}]}
      .computeLabel=${()=>e}
      @value-changed=${n=>{let o=n.detail.value.pick;o&&(i(o),n.target.requestUpdate())}}
    ></ha-form>`}};X.properties={hass:{attribute:!1},room:{attribute:!1},roomId:{attribute:!1},sources:{attribute:!1},soundModes:{attribute:!1},saved:{attribute:!1},_tab:{state:!0},_view:{state:!0},_notice:{state:!0},_related:{state:!0}},X.styles=y`
    :host {
      display: block;
    }
    .hint,
    .sub {
      color: var(--secondary-text-color);
      font-size: 0.9em;
    }
    p.hint {
      margin: 0 0 12px;
      line-height: 1.4;
    }
    .empty {
      color: var(--secondary-text-color);
    }
    .tabs {
      display: flex;
      gap: 4px;
      border-bottom: 1px solid var(--divider-color);
      margin: 16px 0;
    }
    .tabs button {
      font: inherit;
      background: none;
      border: none;
      padding: 8px 16px;
      cursor: pointer;
      color: var(--secondary-text-color);
      border-bottom: 2px solid transparent;
    }
    .tabs button.active {
      color: var(--primary-color);
      border-bottom-color: var(--primary-color);
    }
    .notice {
      background: var(--warning-color, #ffa600);
      color: var(--text-primary-color, #fff);
      padding: 8px 12px;
      border-radius: 8px;
      margin-bottom: 12px;
    }
    .list {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      overflow: hidden;
      background: var(--card-background-color);
    }
    button.row-item {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      font: inherit;
      text-align: left;
      color: var(--primary-text-color);
      background: none;
      border: none;
      border-bottom: 1px solid var(--divider-color);
      padding: 12px 16px;
      cursor: pointer;
    }
    button.row-item:last-child {
      border-bottom: none;
    }
    button.row-item:hover {
      background: var(--secondary-background-color);
    }
    .row-text {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
      overflow-wrap: anywhere;
    }
    .warn {
      color: var(--error-color, #db4437);
      font-size: 0.85em;
    }
    .title {
      font-weight: 500;
    }
    .detail-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    button.back {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font: inherit;
      background: none;
      border: none;
      padding: 6px 0;
      cursor: pointer;
      color: var(--primary-color);
    }
    h2 {
      font-size: 1.4em;
      font-weight: 400;
      margin: 8px 0 16px;
      overflow-wrap: anywhere;
    }
    section.card,
    details.card {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      background: var(--card-background-color);
    }
    .card h3 {
      font-size: 1.05em;
      font-weight: 500;
      margin: 0 0 4px;
    }
    h4 {
      font-size: 1em;
      font-weight: 500;
      margin: 20px 0 8px;
    }
    details.advanced > summary {
      cursor: pointer;
      font-weight: 500;
    }
    details.advanced[open] > summary {
      margin-bottom: 8px;
    }
    label.id {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--secondary-text-color);
      margin-bottom: 12px;
      flex-wrap: wrap;
    }
    label.id input {
      font: inherit;
      padding: 6px 8px;
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }
    ol.ordered {
      margin: 0 0 8px;
      padding-left: 24px;
    }
    ol.ordered li {
      padding: 2px 0;
    }
    ol.ordered li > * {
      vertical-align: middle;
    }
    .li-text {
      display: inline-flex;
      flex-wrap: wrap;
      gap: 0 8px;
      margin-right: 8px;
    }
    .step {
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      padding: 8px 12px;
      margin-bottom: 8px;
    }
    .step-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .move {
      display: inline-flex;
      gap: 2px;
      vertical-align: middle;
    }
    .move button {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--secondary-text-color);
      padding: 4px;
      --mdc-icon-size: 18px;
    }
    .move button:disabled {
      opacity: 0.3;
      cursor: default;
    }
    button.add,
    button.danger {
      font: inherit;
      border: none;
      border-radius: 8px;
      padding: 8px 14px;
      cursor: pointer;
    }
    button.add {
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      margin-top: 8px;
    }
    button.preset {
      margin: 0 0 12px;
    }
    button.delete-room {
      display: block;
      margin-top: 32px;
      padding-left: 0;
    }
    button.danger {
      background: none;
      color: var(--error-color, #db4437);
    }
    .picker {
      display: block;
      max-width: 320px;
    }
  `;customElements.get("easy-av-control-room-editor")||customElements.define("easy-av-control-room-editor",X);async function Xt(){if(customElements.get("ha-form")&&customElements.get("ha-selector"))return;await(await(await window.loadCardHelpers()).createCardElement({type:"entities",entities:[]})).constructor.getConfigElement(),await customElements.whenDefined("ha-form")}var J=class extends g{constructor(){super();this._original="";this._loading=!1;this._saving=!1,this._ready=!1,this._sources={},this._soundModes={},this._adding=!1}_t(e,t){return S(this.hass?.language,e,t)}async _load(){this._loading=!0;try{await Xt(),this._ready=!0;let e=await this.hass.callWS({type:"easy_av_control/config/get"});this._entryId=e.entry_id,this._revision=e.revision,this._original=JSON.stringify(e.rooms),this._rooms=e.rooms,this._banner=void 0,(!this._selected||!(this._selected in e.rooms))&&(this._selected=Object.keys(e.rooms)[0]),[this._sources,this._soundModes]=await Promise.all(["source_list","sound_mode_list"].map(t=>this.hass.callWS({type:"easy_av_control/config/sources",attribute:t}).catch(()=>({}))))}catch(e){this._loadError=e?.message??String(e)}finally{this._loading=!1}}get _dirty(){return this._rooms!==void 0&&JSON.stringify(this._rooms)!==this._original}_roomChanged(e,t){this._rooms={...this._rooms,[e]:t},this._banner?.kind!=="conflict"&&(this._banner=void 0)}_addRoom(e){if(this._adding=!1,!e.trim())return;let t=A(D(e),Object.keys(this._rooms??{}));this._rooms={...this._rooms,[t]:{name:e.trim(),devices:{},activities:{}}},this._selected=t}_renderAddRoom(){return this._adding?a`<form class="new-room" @submit=${t=>{t.preventDefault();let i=t.target.querySelector("input");this._addRoom(i.value)}}>
      <input
        aria-label=${this._t("add_room_name")}
        placeholder=${this._t("add_room_name")}
        @keydown=${t=>t.key==="Escape"&&(this._adding=!1)}
      />
      <div class="new-room-buttons">
        <button type="button" class="flat" @click=${()=>this._adding=!1}>${this._t("cancel")}</button>
        <button type="submit" class="primary">${this._t("create")}</button>
      </div>
    </form>`:a`<button class="room add" @click=${()=>this._adding=!0}>+ ${this._t("add_room")}</button>`}updated(e){this.hass&&!this._rooms&&!this._loading&&!this._loadError&&this._load(),e.has("_adding")&&this._adding&&this.shadowRoot?.querySelector("form.new-room input")?.focus()}_deleteRoom(e){let t=this._rooms?.[e];if(!t||!window.confirm(this._t("delete_room_confirm",{name:t.name??e})))return;let i={...this._rooms};delete i[e],this._rooms=i,this._selected=Object.keys(i)[0]}_discard(){this._rooms=JSON.parse(this._original),this._banner=void 0,(!this._selected||!(this._selected in this._rooms))&&(this._selected=Object.keys(this._rooms)[0])}_reload(){this._dirty&&!window.confirm(this._t("reload_confirm"))||(this._loadError=void 0,this._load())}async _save(e=!1){if(!this._rooms||!this._revision)return;let t=this._rooms,i={};for(let[n,o]of Object.entries(t))i[n]=v(o);this._saving=!0;try{let n=await this.hass.callWS({type:"easy_av_control/config/validate",rooms:i});if(n.error){this._banner={kind:"invalid",path:n.error.path.join("."),message:n.error.message};return}if(n.missing.length&&!e){this._banner={kind:"missing",missing:n.missing};return}let o=await this.hass.callWS({type:"easy_av_control/config/save",rooms:i,revision:this._revision,entry_id:this._entryId});this._revision=o.revision,this._original=JSON.stringify(i),this._rooms===t&&(this._rooms=i),this._banner={kind:"saved"}}catch(n){let o=n;this._banner=o.code==="conflict"?{kind:"conflict"}:{kind:"invalid",path:"",message:o.message??String(n)}}finally{this._saving=!1}}render(){return a`
      <div class="toolbar">
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <div class="main-title">${this._t("title")}</div>
        ${this._dirty?a`<span class="dirty">${this._t("unsaved")}</span>`:h}
        <button class="flat" ?disabled=${!this._dirty||this._saving} @click=${this._discard}>
          ${this._t("discard")}
        </button>
        <button class="primary" ?disabled=${!this._dirty||this._saving} @click=${()=>this._save()}>
          ${this._saving?this._t("saving"):this._t("save")}
        </button>
      </div>
      <div class="content">${this._renderContent()}</div>
    `}_renderContent(){if(this._loadError)return a`<div class="banner error">
        ${this._t("load_error",{error:this._loadError})}
        <button class="flat" @click=${()=>this._reload()}>${this._t("retry")}</button>
      </div>`;if(!this._rooms||!this._ready)return a`<div class="empty">${this._t("loading")}</div>`;let e=Object.entries(this._rooms),t=this._selected&&this._rooms[this._selected]?this._selected:void 0;return a`<div class="layout ${this.narrow?"narrow":""}">
      <nav>
        <div class="nav-title">${this._t("rooms")}</div>
        ${e.map(([i,n])=>a`<button
            class="room ${i===t?"active":""}"
            @click=${()=>this._selected=i}
          >
            ${n.name??i}
          </button>`)}
        ${this._renderAddRoom()}
      </nav>
      <main>
        <easy-av-control-guide .language=${this.hass.language}></easy-av-control-guide>
        ${this._renderBanner()}
        ${t?a`<easy-av-control-room-editor
                .hass=${this.hass}
                .room=${this._rooms[t]}
                .roomId=${t}
                .sources=${this._sources}
                .soundModes=${this._soundModes}
                .saved=${JSON.parse(this._original||"{}")[t]}
                @room-changed=${i=>this._roomChanged(t,i.detail.room)}
                @delete-room=${()=>this._deleteRoom(t)}
              ></easy-av-control-room-editor>`:a`<div class="empty">${this._t("no_rooms")}</div>`}
      </main>
    </div>`}_renderBanner(){let e=this._banner;if(!e)return h;switch(e.kind){case"saved":return a`<div class="banner ok">${this._t("saved")}</div>`;case"invalid":return a`<div class="banner error">
          ${this._t("invalid",{path:e.path||"\u2013",message:e.message})}
        </div>`;case"conflict":return a`<div class="banner error">
          ${this._t("conflict")}
          <button class="flat" @click=${()=>this._reload()}>${this._t("reload")}</button>
        </div>`;case"missing":return a`<div class="banner warning">
          ${this._t("missing")}
          <ul>
            ${e.missing.map(t=>a`<li>
                <code>${t.entity_id}</code> (${this._rooms?.[t.room]?.name??t.room}: ${t.path})
              </li>`)}
          </ul>
          <div class="sub">${this._t("missing_hint")}</div>
          <button class="primary" @click=${()=>this._save(!0)}>${this._t("save_anyway")}</button>
        </div>`}}};J.properties={hass:{attribute:!1},narrow:{type:Boolean},_rooms:{state:!0},_selected:{state:!0},_loadError:{state:!0},_banner:{state:!0},_saving:{state:!0},_ready:{state:!0},_sources:{state:!0},_soundModes:{state:!0},_adding:{state:!0}},J.styles=y`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
    }
    .toolbar {
      display: flex;
      align-items: center;
      gap: 8px;
      height: var(--header-height, 56px);
      padding: 0 12px;
      background: var(--app-header-background-color, var(--primary-color));
      color: var(--app-header-text-color, var(--text-primary-color, #fff));
      border-bottom: var(--app-header-border-bottom, none);
      position: sticky;
      top: 0;
      z-index: 2;
    }
    .main-title {
      flex: 1;
      min-width: 0;
      font-size: 20px;
      margin-left: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .dirty {
      font-size: 0.85em;
      opacity: 0.85;
    }
    button {
      font: inherit;
      cursor: pointer;
    }
    button.primary,
    button.flat {
      border: none;
      border-radius: 18px;
      padding: 8px 16px;
    }
    button.primary {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .toolbar button.primary {
      background: var(--text-primary-color, #fff);
      color: var(--primary-color);
    }
    button.flat {
      background: none;
      color: inherit;
    }
    button:disabled {
      opacity: 0.4;
      cursor: default;
    }
    .content {
      padding: 16px;
      max-width: 1100px;
      margin: 0 auto;
      box-sizing: border-box;
    }
    .layout {
      display: grid;
      grid-template-columns: 220px 1fr;
      gap: 24px;
    }
    .layout.narrow {
      grid-template-columns: 1fr;
    }
    nav {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .layout.narrow nav {
      flex-direction: row;
      flex-wrap: wrap;
    }
    .nav-title {
      font-weight: 500;
      color: var(--secondary-text-color);
      margin-bottom: 4px;
      width: 100%;
    }
    button.room {
      text-align: left;
      border: none;
      border-radius: 18px;
      padding: 8px 14px;
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
    }
    button.room.active {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    button.room.add {
      background: none;
      color: var(--primary-color);
    }
    form.new-room {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 100%;
    }
    form.new-room input {
      font: inherit;
      padding: 8px 12px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }
    .new-room-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 4px;
    }
    nav button.flat {
      color: var(--primary-color);
    }
    main {
      min-width: 0;
    }
    .banner {
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 16px;
      overflow-wrap: anywhere;
    }
    .banner.error {
      background: var(--error-color, #db4437);
      color: var(--text-primary-color, #fff);
    }
    .banner.warning {
      background: var(--warning-color, #ffa600);
      color: var(--text-primary-color, #fff);
    }
    .banner.ok {
      background: var(--success-color, #43a047);
      color: var(--text-primary-color, #fff);
    }
    .banner ul {
      margin: 8px 0;
    }
    .banner .sub {
      margin-bottom: 8px;
      opacity: 0.9;
    }
    .banner button.primary {
      background: var(--text-primary-color, #fff);
      color: var(--primary-text-color);
    }
    .banner button.flat {
      text-decoration: underline;
    }
    .empty {
      color: var(--secondary-text-color);
      padding: 24px 0;
    }
    @media (max-width: 600px) {
      /* Room for the buttons: Save is only enabled with unsaved changes anyway */
      .dirty {
        display: none;
      }
      .toolbar button.primary,
      .toolbar button.flat {
        padding: 6px 12px;
      }
    }
  `;customElements.get("easy-av-control-panel")||customElements.define("easy-av-control-panel",J);export{J as EasyAvControlPanel};
