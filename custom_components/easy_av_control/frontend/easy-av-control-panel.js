var ke=globalThis,$e=ke.ShadowRoot&&(ke.ShadyCSS===void 0||ke.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ve=Symbol(),At=new WeakMap,X=class{constructor(n,e,t){if(this._$cssResult$=!0,t!==Ve)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=n,this.t=e}get styleSheet(){let n=this.o,e=this.t;if($e&&n===void 0){let t=e!==void 0&&e.length===1;t&&(n=At.get(e)),n===void 0&&((this.o=n=new CSSStyleSheet).replaceSync(this.cssText),t&&At.set(e,n))}return n}toString(){return this.cssText}},xe=a=>new X(typeof a=="string"?a:a+"",void 0,Ve),b=(a,...n)=>{let e=a.length===1?a[0]:n.reduce((t,i,s)=>t+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+a[s+1],a[0]);return new X(e,a,Ve)},Et=(a,n)=>{if($e)a.adoptedStyleSheets=n.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of n){let t=document.createElement("style"),i=ke.litNonce;i!==void 0&&t.setAttribute("nonce",i),t.textContent=e.cssText,a.appendChild(t)}},Be=$e?a=>a:a=>a instanceof CSSStyleSheet?(n=>{let e="";for(let t of n.cssRules)e+=t.cssText;return xe(e)})(a):a;var{is:xi,defineProperty:Si,getOwnPropertyDescriptor:Ai,getOwnPropertyNames:Ei,getOwnPropertySymbols:Ti,getPrototypeOf:Ri}=Object,Se=globalThis,Tt=Se.trustedTypes,Oi=Tt?Tt.emptyScript:"",Pi=Se.reactiveElementPolyfillSupport,ee=(a,n)=>a,We={toAttribute(a,n){switch(n){case Boolean:a=a?Oi:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,n){let e=a;switch(n){case Boolean:e=a!==null;break;case Number:e=a===null?null:Number(a);break;case Object:case Array:try{e=JSON.parse(a)}catch{e=null}}return e}},Ot=(a,n)=>!xi(a,n),Rt={attribute:!0,type:String,converter:We,reflect:!1,useDefault:!1,hasChanged:Ot};Symbol.metadata??=Symbol("metadata"),Se.litPropertyMetadata??=new WeakMap;var R=class extends HTMLElement{static addInitializer(n){this._$Ei(),(this.l??=[]).push(n)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(n,e=Rt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(n)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(n,e),!e.noAccessor){let t=Symbol(),i=this.getPropertyDescriptor(n,t,e);i!==void 0&&Si(this.prototype,n,i)}}static getPropertyDescriptor(n,e,t){let{get:i,set:s}=Ai(this.prototype,n)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let l=i?.call(this);s?.call(this,o),this.requestUpdate(n,l,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(n){return this.elementProperties.get(n)??Rt}static _$Ei(){if(this.hasOwnProperty(ee("elementProperties")))return;let n=Ri(this);n.finalize(),n.l!==void 0&&(this.l=[...n.l]),this.elementProperties=new Map(n.elementProperties)}static finalize(){if(this.hasOwnProperty(ee("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ee("properties"))){let e=this.properties,t=[...Ei(e),...Ti(e)];for(let i of t)this.createProperty(i,e[i])}let n=this[Symbol.metadata];if(n!==null){let e=litPropertyMetadata.get(n);if(e!==void 0)for(let[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let i=this._$Eu(e,t);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(n){let e=[];if(Array.isArray(n)){let t=new Set(n.flat(1/0).reverse());for(let i of t)e.unshift(Be(i))}else n!==void 0&&e.push(Be(n));return e}static _$Eu(n,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof n=="string"?n.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(n=>n(this))}addController(n){(this._$EO??=new Set).add(n),this.renderRoot!==void 0&&this.isConnected&&n.hostConnected?.()}removeController(n){this._$EO?.delete(n)}_$E_(){let n=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(n.set(t,this[t]),delete this[t]);n.size>0&&(this._$Ep=n)}createRenderRoot(){let n=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Et(n,this.constructor.elementStyles),n}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(n=>n.hostConnected?.())}enableUpdating(n){}disconnectedCallback(){this._$EO?.forEach(n=>n.hostDisconnected?.())}attributeChangedCallback(n,e,t){this._$AK(n,t)}_$ET(n,e){let t=this.constructor.elementProperties.get(n),i=this.constructor._$Eu(n,t);if(i!==void 0&&t.reflect===!0){let s=(t.converter?.toAttribute!==void 0?t.converter:We).toAttribute(e,t.type);this._$Em=n,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(n,e){let t=this.constructor,i=t._$Eh.get(n);if(i!==void 0&&this._$Em!==i){let s=t.getPropertyOptions(i),o=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:We;this._$Em=i;let l=o.fromAttribute(e,s.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(n,e,t,i=!1,s){if(n!==void 0){let o=this.constructor;if(i===!1&&(s=this[n]),t??=o.getPropertyOptions(n),!((t.hasChanged??Ot)(s,e)||t.useDefault&&t.reflect&&s===this._$Ej?.get(n)&&!this.hasAttribute(o._$Eu(n,t))))return;this.C(n,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(n,e,{useDefault:t,reflect:i,wrapped:s},o){t&&!(this._$Ej??=new Map).has(n)&&(this._$Ej.set(n,o??e??this[n]),s!==!0||o!==void 0)||(this._$AL.has(n)||(this.hasUpdated||t||(e=void 0),this._$AL.set(n,e)),i===!0&&this._$Em!==n&&(this._$Eq??=new Set).add(n))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let n=this.scheduleUpdate();return n!=null&&await n,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[i,s]of t){let{wrapped:o}=s,l=this[i];o!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,s,l)}}let n=!1,e=this._$AL;try{n=this.shouldUpdate(e),n?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw n=!1,this._$EM(),t}n&&this._$AE(e)}willUpdate(n){}_$AE(n){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(n)),this.updated(n)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(n){return!0}update(n){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(n){}firstUpdated(n){}};R.elementStyles=[],R.shadowRootOptions={mode:"open"},R[ee("elementProperties")]=new Map,R[ee("finalized")]=new Map,Pi?.({ReactiveElement:R}),(Se.reactiveElementVersions??=[]).push("2.1.2");var Ke=globalThis,Pt=a=>a,Ae=Ke.trustedTypes,jt=Ae?Ae.createPolicy("lit-html",{createHTML:a=>a}):void 0,Fe="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,Ue="?"+O,ji=`<${Ue}>`,L=document,ie=()=>L.createComment(""),ne=a=>a===null||typeof a!="object"&&typeof a!="function",qe=Array.isArray,It=a=>qe(a)||typeof a?.[Symbol.iterator]=="function",Ge=`[ 	
\f\r]`,te=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Dt=/-->/g,zt=/>/g,z=RegExp(`>|${Ge}(?:([^\\s"'>=/]+)(${Ge}*=${Ge}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ct=/'/g,Lt=/"/g,Nt=/^(?:script|style|textarea|title)$/i,Ze=a=>(n,...e)=>({_$litType$:a,strings:n,values:e}),r=Ze(1),Ye=Ze(2),_n=Ze(3),E=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),Mt=new WeakMap,C=L.createTreeWalker(L,129);function Ht(a,n){if(!qe(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return jt!==void 0?jt.createHTML(n):n}var Vt=(a,n)=>{let e=a.length-1,t=[],i,s=n===2?"<svg>":n===3?"<math>":"",o=te;for(let l=0;l<e;l++){let c=a[l],d,u,p=-1,m=0;for(;m<c.length&&(o.lastIndex=m,u=o.exec(c),u!==null);)m=o.lastIndex,o===te?u[1]==="!--"?o=Dt:u[1]!==void 0?o=zt:u[2]!==void 0?(Nt.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=z):u[3]!==void 0&&(o=z):o===z?u[0]===">"?(o=i??te,p=-1):u[1]===void 0?p=-2:(p=o.lastIndex-u[2].length,d=u[1],o=u[3]===void 0?z:u[3]==='"'?Lt:Ct):o===Lt||o===Ct?o=z:o===Dt||o===zt?o=te:(o=z,i=void 0);let f=o===z&&a[l+1].startsWith("/>")?" ":"";s+=o===te?c+ji:p>=0?(t.push(d),c.slice(0,p)+Fe+c.slice(p)+O+f):c+O+(p===-2?l:f)}return[Ht(a,s+(a[e]||"<?>")+(n===2?"</svg>":n===3?"</math>":"")),t]},se=class a{constructor({strings:n,_$litType$:e},t){let i;this.parts=[];let s=0,o=0,l=n.length-1,c=this.parts,[d,u]=Vt(n,e);if(this.el=a.createElement(d,t),C.currentNode=this.el.content,e===2||e===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=C.nextNode())!==null&&c.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let p of i.getAttributeNames())if(p.endsWith(Fe)){let m=u[o++],f=i.getAttribute(p).split(O),_=/([.?@])?(.*)/.exec(m);c.push({type:1,index:s,name:_[2],strings:f,ctor:_[1]==="."?Te:_[1]==="?"?Re:_[1]==="@"?Oe:I}),i.removeAttribute(p)}else p.startsWith(O)&&(c.push({type:6,index:s}),i.removeAttribute(p));if(Nt.test(i.tagName)){let p=i.textContent.split(O),m=p.length-1;if(m>0){i.textContent=Ae?Ae.emptyScript:"";for(let f=0;f<m;f++)i.append(p[f],ie()),C.nextNode(),c.push({type:2,index:++s});i.append(p[m],ie())}}}else if(i.nodeType===8)if(i.data===Ue)c.push({type:2,index:s});else{let p=-1;for(;(p=i.data.indexOf(O,p+1))!==-1;)c.push({type:7,index:s}),p+=O.length-1}s++}}static createElement(n,e){let t=L.createElement("template");return t.innerHTML=n,t}};function M(a,n,e=a,t){if(n===E)return n;let i=t!==void 0?e._$Co?.[t]:e._$Cl,s=ne(n)?void 0:n._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),s===void 0?i=void 0:(i=new s(a),i._$AT(a,e,t)),t!==void 0?(e._$Co??=[])[t]=i:e._$Cl=i),i!==void 0&&(n=M(a,i._$AS(a,n.values),i,t)),n}var Ee=class{constructor(n,e){this._$AV=[],this._$AN=void 0,this._$AD=n,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(n){let{el:{content:e},parts:t}=this._$AD,i=(n?.creationScope??L).importNode(e,!0);C.currentNode=i;let s=C.nextNode(),o=0,l=0,c=t[0];for(;c!==void 0;){if(o===c.index){let d;c.type===2?d=new F(s,s.nextSibling,this,n):c.type===1?d=new c.ctor(s,c.name,c.strings,this,n):c.type===6&&(d=new Pe(s,this,n)),this._$AV.push(d),c=t[++l]}o!==c?.index&&(s=C.nextNode(),o++)}return C.currentNode=L,i}p(n){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(n,t,e),e+=t.strings.length-2):t._$AI(n[e])),e++}},F=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(n,e,t,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=n,this._$AB=e,this._$AM=t,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let n=this._$AA.parentNode,e=this._$AM;return e!==void 0&&n?.nodeType===11&&(n=e.parentNode),n}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(n,e=this){n=M(this,n,e),ne(n)?n===h||n==null||n===""?(this._$AH!==h&&this._$AR(),this._$AH=h):n!==this._$AH&&n!==E&&this._(n):n._$litType$!==void 0?this.$(n):n.nodeType!==void 0?this.T(n):It(n)?this.k(n):this._(n)}O(n){return this._$AA.parentNode.insertBefore(n,this._$AB)}T(n){this._$AH!==n&&(this._$AR(),this._$AH=this.O(n))}_(n){this._$AH!==h&&ne(this._$AH)?this._$AA.nextSibling.data=n:this.T(L.createTextNode(n)),this._$AH=n}$(n){let{values:e,_$litType$:t}=n,i=typeof t=="number"?this._$AC(n):(t.el===void 0&&(t.el=se.createElement(Ht(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===i)this._$AH.p(e);else{let s=new Ee(i,this),o=s.u(this.options);s.p(e),this.T(o),this._$AH=s}}_$AC(n){let e=Mt.get(n.strings);return e===void 0&&Mt.set(n.strings,e=new se(n)),e}k(n){qe(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,i=0;for(let s of n)i===e.length?e.push(t=new a(this.O(ie()),this.O(ie()),this,this.options)):t=e[i],t._$AI(s),i++;i<e.length&&(this._$AR(t&&t._$AB.nextSibling,i),e.length=i)}_$AR(n=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);n!==this._$AB;){let t=Pt(n).nextSibling;Pt(n).remove(),n=t}}setConnected(n){this._$AM===void 0&&(this._$Cv=n,this._$AP?.(n))}},I=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(n,e,t,i,s){this.type=1,this._$AH=h,this._$AN=void 0,this.element=n,this.name=e,this._$AM=i,this.options=s,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=h}_$AI(n,e=this,t,i){let s=this.strings,o=!1;if(s===void 0)n=M(this,n,e,0),o=!ne(n)||n!==this._$AH&&n!==E,o&&(this._$AH=n);else{let l=n,c,d;for(n=s[0],c=0;c<s.length-1;c++)d=M(this,l[t+c],e,c),d===E&&(d=this._$AH[c]),o||=!ne(d)||d!==this._$AH[c],d===h?n=h:n!==h&&(n+=(d??"")+s[c+1]),this._$AH[c]=d}o&&!i&&this.j(n)}j(n){n===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,n??"")}},Te=class extends I{constructor(){super(...arguments),this.type=3}j(n){this.element[this.name]=n===h?void 0:n}},Re=class extends I{constructor(){super(...arguments),this.type=4}j(n){this.element.toggleAttribute(this.name,!!n&&n!==h)}},Oe=class extends I{constructor(n,e,t,i,s){super(n,e,t,i,s),this.type=5}_$AI(n,e=this){if((n=M(this,n,e,0)??h)===E)return;let t=this._$AH,i=n===h&&t!==h||n.capture!==t.capture||n.once!==t.once||n.passive!==t.passive,s=n!==h&&(t===h||i);i&&this.element.removeEventListener(this.name,this,t),s&&this.element.addEventListener(this.name,this,n),this._$AH=n}handleEvent(n){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,n):this._$AH.handleEvent(n)}},Pe=class{constructor(n,e,t){this.element=n,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(n){M(this,n)}},Bt={M:Fe,P:O,A:Ue,C:1,L:Vt,R:Ee,D:It,V:M,I:F,H:I,N:Re,U:Oe,B:Te,F:Pe},Di=Ke.litHtmlPolyfillSupport;Di?.(se,F),(Ke.litHtmlVersions??=[]).push("3.3.3");var Wt=(a,n,e)=>{let t=e?.renderBefore??n,i=t._$litPart$;if(i===void 0){let s=e?.renderBefore??null;t._$litPart$=i=new F(n.insertBefore(ie(),s),s,void 0,e??{})}return i._$AI(a),i};var Je=globalThis,v=class extends R{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let n=super.createRenderRoot();return this.renderOptions.renderBefore??=n.firstChild,n}update(n){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(n),this._$Do=Wt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};v._$litElement$=!0,v.finalized=!0,Je.litElementHydrateSupport?.({LitElement:v});var zi=Je.litElementPolyfillSupport;zi?.({LitElement:v});(Je.litElementVersions??=[]).push("4.2.2");var Ci=`
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
`,k=b`
  :host {
    ${xe(Ci)}
  }
`,$=b`
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
`,x=b`
  :host {
    --ltek-fs-panel-title: 17px;
    --ltek-fs-header: 16px;
    --ltek-fs-group: 15px;
    --ltek-fs-label: 14px;
    --ltek-fs-body: 13px;
    --ltek-fs-small: 12px;
    --ltek-fs-tiny: 11px;
  }
`,U="https://github.com/Ltek/easy-av-control";var je={en:{"state.idle":"Off","flow.show":"Flow","flow.details":"Details","editor.show_flow":"Flow (opens by itself while the room starts or stops)","editor.flow_details":"Flow with entities, actions and notes","state.starting":"Starting \u2026","state.active":"On","now.paused":"Paused","state.stopping":"Stopping \u2026","state.error":"Error",power:"On/off",loading:"Loading \u2026",not_found:'Room "{room}" not found',no_room:"Pick a room in the card settings",warnings:"Warnings",volume:"Volume","command.volume_up":"Volume up","command.volume_down":"Volume down","command.mute":"Mute","command.volume_set":"Volume slider","command.select_source":"Select source","command.select_sound_mode":"Select sound mode","command.channel_up":"Channel up","command.channel_down":"Channel down","command.play_pause":"Play/pause","command.play":"Play","command.pause":"Pause","command.stop":"Stop","command.next":"Next","command.previous":"Previous","command.up":"Up","command.down":"Down","command.left":"Left","command.right":"Right","command.ok":"OK","command.back":"Back","command.menu":"Menu","command.home":"Home","command.info":"Info","command.guide":"Guide","command.exit":"Exit","editor.room":"Room","editor.section":"Card","editor.hint":"The room this card controls. The card shows its activities, the remote of the running one, and its settings.","editor.star":"\u2B50 Star on GitHub","editor.report":"\u{1F41B} Report an issue","editor.name":"Title (optional)","doing.power_on":"Turning the outlets on","doing.power_off":"Turning the outlets off","doing.boot":"{name} is booting","doing.reload":"Reconnecting {name}","doing.ready":"Waiting for {name}","doing.turn_on":"Turning on {name}","doing.reach":"Waiting for {name} to be reachable","doing.delay":"Waiting before turning on {name}","doing.before":"Before {name}: waiting for {names}","doing.warm_up":"{name} is starting up","doing.status_on":"Waiting for {name} to be on","doing.status_on_value":"{name}: {value}","doing.status_off":"Waiting for {name} to be off","doing.status_off_value":"{name}: {value}","doing.turn_off":"Turning off {name}","doing.checks":"Checking that everything works","doing.step":"Step {step} of {steps}: {what}","doing.wait":"Step {step} of {steps}: waiting","doing.hooks_on_start":"Waiting for the actions on start","doing.hooks_on_stop":"Waiting for the actions on stop","doing.left":"{time} left","doing.at_most":"at most {time}","cooling.text":"Cooling down: {names}","cooling.time":"power off in {time}","cooling.time_status":"power off once they are off, at most {time}",touchpad:"Touch surface: swipe for the arrow keys, tap for OK","touchpad.hint":"Swipe \xB7 tap for OK","rocker.volume":"VOL","rocker.channels":"CH","pad.show_arrows":"Show arrow keys","pad.show_touchpad":"Show touch surface",settings:"Settings","setting.source":"Source","setting.sound_mode":"Sound mode","toggle.on":"On","toggle.off":"Off","step.power_on":"Switch on","step.power_off":"Switch off","step.set_source":"Set source","step.set_volume":"Set volume","step.set_sound_mode":"Set sound mode","step.set_brightness":"Set brightness","step.set_color_temp":"Set color temperature","step.set_position":"Set cover position","step.set_tilt":"Set cover tilt","step.call_action":"Run action","step.delay":"Wait","step.wait_available":"Wait until available","step.wait_picture":"Wait for a picture"},de:{"state.idle":"Aus","flow.show":"Ablauf","flow.details":"Details","editor.show_flow":"Ablauf (\xF6ffnet sich selbst, w\xE4hrend der Raum startet oder stoppt)","editor.flow_details":"Ablauf mit Entit\xE4ten, Aktionen und Hinweisen","state.starting":"Startet \u2026","state.active":"An","now.paused":"Pausiert","state.stopping":"Stoppt \u2026","state.error":"Fehler",power:"Ein/Aus",loading:"L\xE4dt \u2026",not_found:"Raum \u201E{room}\u201C nicht gefunden",no_room:"Bitte in den Karteneinstellungen einen Raum w\xE4hlen",warnings:"Warnungen",volume:"Lautst\xE4rke","command.volume_up":"Lauter","command.volume_down":"Leiser","command.mute":"Stumm","command.volume_set":"Lautst\xE4rkeregler","command.select_source":"Quelle w\xE4hlen","command.select_sound_mode":"Klangmodus w\xE4hlen","command.channel_up":"Kanal hoch","command.channel_down":"Kanal runter","command.play_pause":"Wiedergabe/Pause","command.play":"Wiedergabe","command.pause":"Pause","command.stop":"Stopp","command.next":"Weiter","command.previous":"Zur\xFCck","command.up":"Hoch","command.down":"Runter","command.left":"Links","command.right":"Rechts","command.ok":"OK","command.back":"Zur\xFCck","command.menu":"Men\xFC","command.home":"Start","command.info":"Info","command.guide":"EPG","command.exit":"Beenden","editor.room":"Raum","editor.section":"Karte","editor.hint":"Der Raum, den diese Karte steuert. Sie zeigt seine Aktivit\xE4ten, die Fernbedienung der laufenden und ihre Einstellungen.","editor.star":"\u2B50 Auf GitHub markieren","editor.report":"\u{1F41B} Problem melden","editor.name":"Titel (optional)","doing.power_on":"Steckdosen werden eingeschaltet","doing.power_off":"Steckdosen werden ausgeschaltet","doing.boot":"{name} bootet","doing.reload":"{name} wird neu verbunden","doing.ready":"Warte auf {name}","doing.turn_on":"{name} wird eingeschaltet","doing.reach":"Warte, bis {name} erreichbar ist","doing.delay":"Warte vor dem Einschalten von {name}","doing.before":"Vor {name}: warte auf {names}","doing.warm_up":"{name} f\xE4hrt hoch","doing.status_on":"Warte, bis {name} an ist","doing.status_on_value":"{name}: {value}","doing.status_off":"Warte, bis {name} aus ist","doing.status_off_value":"{name}: {value}","doing.turn_off":"{name} wird ausgeschaltet","doing.checks":"Pr\xFCfe, ob alles l\xE4uft","doing.step":"Schritt {step} von {steps}: {what}","doing.wait":"Schritt {step} von {steps}: warten","doing.hooks_on_start":"Warte auf die Aktionen beim Start","doing.hooks_on_stop":"Warte auf die Aktionen beim Stopp","doing.left":"noch {time}","doing.at_most":"h\xF6chstens noch {time}","cooling.text":"Abk\xFChlen: {names}","cooling.time":"Strom aus in {time}","cooling.time_status":"Strom aus, sobald sie aus sind, h\xF6chstens noch {time}",touchpad:"Touchfl\xE4che: wischen f\xFCr die Pfeiltasten, tippen f\xFCr OK","touchpad.hint":"Wischen \xB7 Tippen f\xFCr OK","rocker.volume":"VOL","rocker.channels":"CH","pad.show_arrows":"Pfeiltasten zeigen","pad.show_touchpad":"Touchfl\xE4che zeigen",settings:"Einstellungen","setting.source":"Quelle","setting.sound_mode":"Klangmodus","toggle.on":"An","toggle.off":"Aus","step.power_on":"Einschalten","step.power_off":"Ausschalten","step.set_source":"Quelle w\xE4hlen","step.set_volume":"Lautst\xE4rke setzen","step.set_sound_mode":"Klangmodus w\xE4hlen","step.set_brightness":"Helligkeit setzen","step.set_color_temp":"Farbtemperatur setzen","step.set_position":"Rollladen-Position setzen","step.set_tilt":"Lamellen-Neigung setzen","step.call_action":"Aktion ausf\xFChren","step.delay":"Warten","step.wait_available":"Auf Verf\xFCgbarkeit warten","step.wait_picture":"Auf ein Bild warten"}};function q(a,n,e={}){let t=(a??"en").split("-")[0],s=(t in je?je[t]:je.en)[n]??je.en[n]??n;for(let[o,l]of Object.entries(e))s=s.replace(`{${o}}`,l);return s}var Gt={en:{"pf.form":"Form","pf.form_hint":"Every part of the profile, picked on a real device of its integration. Entities are stored the way any Home Assistant finds them (type and translation key), never by their entity ID.","pf.general":"General","pf.general_hint":"What the profile is for, and where its devices go in an activity's power-on order.","pf.name":"Name","pf.id":"ID","pf.integration":"Integration","pf.example":"Example device","pf.no_example":"No device of this integration here: entities can't be picked, only typed in YAML.","pf.device_entity":"Device entity","pf.order":"Power-on order","pf.status":"Status","pf.status_hint":"Which entity says the device is on, and what each of its values means. Tap a value it shows to add it, or type one.","pf.status_entity":"Status entity","pf.status_own":"None picked: the device entity's own state is the status.","pf.status_other":"This entity's state (or attribute) is the status.","pf.attribute":"Attribute","pf.attribute_none":"Its state","pf.now":"Now: {value}","pf.available_is_on":"On while this entity is available (it's unavailable while the device is off)","pf.group.starting":"Starting","pf.group.on":"On","pf.group.stopping":"Stopping","pf.group.off":"Off","pf.group.error":"Error","pf.other_value":"Other value \u2026","pf.timing":"Timing","pf.timing_hint":"How long to wait for on and off before the device's failure setting applies, and how long a state must hold.","pf.timeout_on":"Timeout, turning on","pf.timeout_off":"Timeout, turning off","pf.debounce":"Debounce","pf.reset":"Back to the default","pf.companions":"Remote, outlet and settings","pf.companions_hint":"Filled in on every device that uses this profile.","pf.remote":"Remote (arrow keys)","pf.power_switch":"Power outlet switch","pf.settings":"Settings in the card","pf.settings_hint":"Offered in the remote card while an activity runs.","pf.picture":"Picture check","pf.picture_hint":"A device that can tell whether a picture arrives (Lumagen Active Video, JVC Source Display): Detect integrations adds a picture check for it to the activity's Checks.","pf.picture_on":"This device has a picture check","pf.picture_entity":"Entity","pf.picture_ok":"Picture","pf.picture_fail":"No picture","pf.picture_timeout":"Timeout","pf.jobs":"Jobs","pf.jobs_hint":"For a device several integrations cover (a TV with PiPup, ADB and Android TV Remote): the jobs this one does. Lower numbers win.","pf.none":"None","pf.not_on_device":"not on this device",detect_used_integration:"Used for this device's state",detect_open_profile:"Open this profile",detect_no_area:"No area",detect_select_all:"Select all",timing_on:"Comes on in about {typical} ({count} measured, slowest {slowest})",timing_off:"Goes off in about {typical} ({count} measured, slowest {slowest})",timing_use:"Use measured timeouts",timing_use_hint:"Sets the status timeouts to what the measured times suggest: half as long again as usual, and longer than the slowest seen.","flow.typical":"usually {seconds}",setup:"Setup","flow.picture":"{step}. Wait until {entity} shows {states}, at most {timeout}","field.on_failure_picture":"If there's no picture",detect:"Detect integrations",detect_intro:"Compares what's installed in Home Assistant with what the rooms use. Tick what to change, then Apply: the changes appear as unsaved, and nothing is stored until you press Save.",detect_running:"Looking at your integrations \u2026",detect_nothing:"Nothing to change: every AV device with a profile is in a room, and every entity the rooms use exists.",detect_new:"Detected devices",detect_new_hint:"Devices no room uses yet, by their Home Assistant area. Tick the ones to add: they go into the activities you tick, at the place their profile gives in the power-on order (early, middle, late), with their status, remote and outlet filled in. The profile chip opens its profile; the blue integration chip is the one used for the device's state.",detect_room:"Room",detect_new_room:"New room: {name}",detect_activities:"Add to",detect_no_activities:"This room has no activities yet.",detect_starter:"Create a new Activity per Room using the selected Devices",detect_picture:"with a picture check",detect_better:"Better integrations",detect_better_hint:"A device a room uses that another integration now covers better (it reports faster or says more). Not ticked: tick to switch.",detect_better_row:"{from} \u2192 {to}",detect_gone:"Missing entities",detect_gone_hint:"Entities a room uses that no longer exist, for example after removing an integration. Where the same device is still covered by another integration, it is offered as the replacement.",detect_replace_with:"Replace with {entity} ({integration})",detect_no_replacement:"Nothing replaces it; fix it by hand. A device without a status uses its fixed times.",detect_renamed:"Renamed entities",detect_renamed_hint:"The same entity under a new ID. It's replaced everywhere except in actions and commands: check those.",detect_unmatched:"Integrations without a profile",detect_unmatched_hint:"Their devices work with fixed times. Create a profile so Easy AV Control can wait for their own states.",detect_create_profile:"+ Profile",detect_apply:"Apply",detect_applied:"Applied. Review the rooms, then press Save.",detect_again:"Detect again",profile_new:"+ Profile",profile_new_pick:"Integration",profile_new_hint:"Integrations here with a media player or remote and no profile. The draft starts from the first device of the one you pick.",profile_new_none:"Every integration with a media player or remote has a profile.",learn:"Learn",learn_hint:"Turn the device on, then off, here: Easy AV Control records what {entity} shows and fills in which states mean starting, on, stopping and off.",learn_on:"Turn on now",learn_off:"Turn off now",learn_seen_on:"Turning on: {states}",learn_seen_off:"Turning off: {states}",learn_use:"Use what was seen",learn_nothing:"Nothing recorded yet.","flow.status_on":"Wait until {device} says it's on ({entity}), at most {timeout}","flow.status_off":"Wait until {device} says it's off ({entity}), at most {timeout}","flow.outlets_off_status":"Turn off the outlet once its devices say they're off: {outlets}","flow.debounce":"state must hold {seconds}",profiles:"Profiles",profiles_intro:"A profile tells Easy AV Control what an integration's entities say about a device: which entity shows that it's on, what its states mean, its remote, outlet and settings. Built-in ones are locked: duplicate one to change it.",profiles_builtin:"Built in",profiles_yours:"Yours",profiles_none_yours:"None yet. Duplicate a built-in profile, or import one.",profile_generic:"for any media player without its own profile",profile_untested:"From the integration's code, not tested on a device",profile_used_by:"Used by {where}",profile_unused:"Not used by a device",profile_preview:"Show the summary",profile_view:"View",profile_edit:"Edit",profile_duplicate:"Duplicate",profile_delete_confirm:'Delete your profile "{name}"? Devices that use it go back to the built-in one.',profile_readonly:"Built in: read only. Duplicate it to make your own version.",profile_editor_hint:"The profile as YAML. Entities are found on the device by domain and translation_key, never by entity ID, so the profile works on any Home Assistant.",profile_save:"Save profile",profile_close:"Close",profile_cancel:"Cancel",profile_saved:"Profile saved.",profile_export:"Export",profile_export_all:"Export yours",profile_import:"Import",profile_import_hint:"Paste an Easy AV Control profile export. Profiles you already have are never replaced: one with a taken ID is added under a new one.",profile_import_done:"Added: {added}",profile_import_renamed:"{from} added as {to}",profile_import_invalid:"Not valid, skipped: {ids}",profile_copy:"Copy to clipboard",profile_copied:"Copied \u2713",profile_copy_failed:"Press Ctrl/Cmd+C",profile_paste:"Paste from clipboard",profile_paste_failed:"Paste with Ctrl/Cmd+V",profile_share:"Share a profile",profile_share_hint:"Made one for a device others have too? Export it and send the text with Report an issue (at the bottom of the menu): accepted profiles ship as built-in ones.",sum_indicator:"On / off from {what}",sum_indicator_device:"the device's own state",sum_indicator_available:"{what} being available",sum_states:"{groups}",sum_remote:"Remote",sum_outlet:"Outlet",sum_settings:"Settings",sum_picture:"Picture check",sum_order:"Power-on order: {order}",sum_roles:"Jobs: {roles}","order.early":"early","order.middle":"middle","order.late":"late","role.power":"power","role.navigation":"arrow keys","role.now_playing":"now playing","role.turn_off":"turn off",section_state:"Device state",hint_state:"How Easy AV Control knows this device is on or off. With a status, it waits for the device itself instead of fixed times.",detected:"Detected: {name}",detected_none:"No profile for this device's integration: it uses the fixed times below.",detected_uses:"Uses",detected_now:"Now: {value}",detected_found_indicator:"Status from {entity}",detected_found_attribute:"attribute {attribute}",detected_found_remote:"Remote: {entity}",detected_found_outlet:"Outlet: {entity}",detected_found_settings:"Settings: {entities}",detected_use:"Use these",detected_applied:"In use",detected_siblings:"Also covered by: {integrations}",detected_role:"{role}: {integration}",state_source:"Status","state_source.auto":"Automatic (from the profile)","state_source.none":"None: fixed times only","field.profile":"Profile","profile.auto":"Automatic (for its integration)","field.wait_on":"When turning on, wait for","field.wait_off":"Before cutting the outlet, wait for","wait.status":"Its status","wait.time":"A fixed time","wait.both":"Its status, then a fixed time","field.timeout_on":"Status timeout, turning on","field.timeout_off":"Status timeout, turning off","field.debounce":"Debounce","helper.debounce":"Seconds a state must hold before it counts, so a flicker doesn't.","field.on_failure_on":"If it doesn't come on","field.on_failure_off":"If it doesn't go off","failure.warn":"Warn and continue","failure.stop":"Stop the activity","failure.retry":"Try once more, then warn","failure_off.stop":"Leave its outlet on",state_fixed_only:"No status for this device: only the fixed times below apply.",footer_version:"Easy AV Control (Ltek) {version}",star:"\u2B50 Star on GitHub",report:"\u{1F41B} Report an issue",title:"Easy AV Control",rooms:"Rooms",add_room:"Add room",guide:"Guide",act_startup:"Startup",act_shutdown:"Shutdown",act_hold:"Hold for 3 seconds to start this activity",act_saved_only:"Runs the activity as saved; save first to use your changes.",reports:"Reports","rep.title":"Reports","rep.hint":"How long each start and stop took, and how long each device took to come on and go off. Times are measured while Easy AV Control switches; the last 300 runs and 100 times per device are kept.","rep.refresh":"Refresh","rep.clear":"Clear","rep.clear_confirm":"Delete the whole history? The typical times used for timeouts stay.","rep.runs":"Runs","rep.devices":"Devices","rep.devices_hint":"From the turn-on (or turn-off) command until the device says it is on (off), for devices with a status. Only when Easy AV Control switched the device.","rep.no_runs":"No runs yet: start an activity.","rep.no_devices":"No device times yet. They are measured for devices with a status, when an activity switches them.","rep.show":"Show","rep.mode_all":"Startups and shutdowns","rep.mode_start":"Startup","rep.mode_stop":"Shutdown","rep.export":"Export","rep.export_run":"Export this run with its trace","rep.copied":"Copied to the clipboard","rep.export_hint":"The report is a JSON file: the runs, each with its trace (what Easy AV Control did, every service call and every state change of the room's entities), the device times, the rooms as configured and the versions.","rep.from":"from {activity}","rep.typical":"typical","rep.count":"{n} runs","rep.count_times":"{n} times","rep.failed":"{n} failed","rep.result_ok":"OK","rep.result_warning":"Warnings","rep.result_error":"Failed","rep.result_cancelled":"Cancelled","rep.phase_switch_off_unused":"Turn off what's not needed","rep.phase_outlets_on":"Outlets on","rep.phase_outlets_off":"Outlets off","rep.phase_checks":"Checks","rep.phase_steps":"Actions after start","rep.phase_hooks":"Actions on start / stop","rep.dir_on":"Turn on","rep.dir_off":"Turn off","rep.dir":"","rep.when":"When","rep.time":"Time","rep.result":"Result","rep.for":"Room \xB7 activity","rep.slow":"Slow",sidebar_chip:"Editor in Sidebar",sidebar_hint:"Show Easy AV Control in Home Assistant's sidebar. Hidden, it stays at /easy-av-control and under Settings \u2192 Devices & services \u2192 Easy AV Control \u2192 Configure.",no_rooms:"No rooms yet.",room_name:"Name",room_area:"Area",room_default_activity:"Default activity",default_last:"Last used","helper.default_activity":"What the room's on/off switch and toggle_activity start, e.g. from a wall button.",room_id_hint:"ID {id}",delete_room:"Delete room",delete_room_confirm:'Delete room "{name}" with all devices and activities?',tab_devices:"Devices",tab_activities:"Activities",tab_yaml:"YAML",add_device:"Add device",add_activity:"Add activity",delete:"Delete",move_up:"Move up",move_down:"Move down",device_id:"Device ID",device_in_use:'Device "{id}" is used by: {where}. Remove it there first.',activity_id_hint:"ID {id} \u2013 part of the entity IDs, cannot be changed",new_activity:"New activity",add_device_to_activity:"Add device \u2026",steps:"Actions after start",section_checks:"Checks",hint_checks:"What must be right before the activity counts as running, e.g. a picture on the Lumagen and on the projector. They run at the same time, once every device is on, and again when you switch to this activity from another.",add_check:"Check",check_profile:"Picture check of its profile",check_entity:"An entity of your own",check_what:"What",check_entity_label:"Entity",check_states:"Right when it shows",check_states_placeholder:"e.g. on, Active Video",check_timeout:"Timeout",check_failure:"If it isn't right",check_warn:"Warn and go on",check_stop:"Stop the activity",check_none:"No checks: the activity counts as running once its devices are on.",check_unless_text:"Waits until {entity} no longer shows {states}.",add_step:"Add step \u2026",hooks:"Actions on start and stop",remote:"Remote control",quick_select:"Quick select",quick_select_hint:"Buttons that switch a media player to a source; on an Apple TV the sources are its apps.",quick_select_no_player:"Add a media player to this activity first.",add_quick_select:"Add quick select",card_settings:"Settings in the card",card_settings_hint:"Source, sound mode and other settings of the devices, changeable in the card while the activity runs: those set on the devices, or a choice for this activity only. The section is closed until it is opened; each browser remembers that.","setting.entity":"Entity of the device","field.entity":"Entity","helper.entity":"A number (slider), select (list) or switch (on/off key), e.g. the receiver's bass.","field.settings_mode":"Show",settings_auto:"From the devices",settings_chosen:"Chosen here, with favourites",settings_auto_shows:"The card shows: {list}.",settings_auto_none:"The devices of this activity offer no settings yet. Choose them on a device, or start the activity once so its media players report their lists.",device_settings_hint:"What the card offers of this device, in every activity that uses it. Automatic: source and sound mode of a media player, and the number and select entities of the same device.",device_settings_auto:"Automatic",device_settings_auto_none:"Nothing found yet: no source or sound mode list reported, and no number or select entities of the same device.",device_settings_none:"The card shows no settings of this device.",settings_none:"The card shows no settings for this activity.",add_setting:"Add setting","field.setting":"Setting","field.options":"Favourites (optional)","helper.options":"Only these in the card, in this order; empty: the device's whole list.",commands:"Own commands",save:"Save",discard:"Discard",saving:"Saving \u2026",saved:"Saved",unsaved:"Unsaved changes",reload:"Reload",reload_confirm:"Discard your unsaved changes and load the saved configuration?",retry:"Try again",save_anyway:"Save anyway",conflict:"The configuration was changed elsewhere. Reload it \u2013 your unsaved changes here are lost.",invalid:"Not saved \u2013 {path}: {message}",missing:"These entities do not exist in Home Assistant:",missing_hint:"A device without power usually stays known. Most likely a typo or a renamed entity.",loading:"Loading \u2026",load_error:"Could not load the configuration: {error}",route_auto:"Automatic",route_none:"Hide",devices_intro:"Every device of the room that Easy AV Control switches or controls: TV, projector, receiver, player.",devices_empty:"No devices yet.",new_device:"New device",no_entity:"No entity chosen",entity_missing:"Entity not found in Home Assistant",used_by:"Used by: {where}",section_device:"Device",hint_device:"The Home Assistant entity of the device, usually a media player.",section_power:"Power Outlet",hint_power:"The outlet that powers the device: switched on before the device and off after it. Untick when the device isn't on a switched outlet.",power_use:"Switch this device's power outlet",section_delays:"Waiting times",hint_delays:"How long Easy AV Control waits for this device.",section_ready:"Connection check",hint_ready:"Waits until the device is reachable in Home Assistant, before switching it on and before remote buttons. For devices that lose their connection without power, such as an Apple TV.",ready_preset:"Use {entity} for the connection check and the arrow keys (recommended for Apple TV)",section_advanced:"Advanced",hint_device_advanced:"The device ID is used in the YAML configuration. Own commands map a button name to Home Assistant actions, e.g. arrow keys for a receiver box.",activities_intro:'An activity combines devices for one use, e.g. "Apple TV" = TV and Apple TV. Starting it switches on what it needs and off what it does not.',activities_empty:"No activities yet.",no_devices:"No devices",needs_devices:"Add the devices of this room first.",section_general:"General",hint_general:"Name and icon appear in the card. Position sorts the activities.",section_activity_devices:"Devices",hint_activity_devices:"Switched on in this order.",hint_steps:"Extra actions, in this order, once every device is on and the checks passed: e.g. switch the TV to its HDMI input, set the sound mode or the volume, dim the lights.",hint_remote:"Which device gets which buttons of the card. Automatic suits most setups.",hint_activity_advanced:"Commands in YAML, and Home Assistant actions on start and stop.",card_divider:"Remote control card",card_extra:"Extra buttons",hint_card_extra:"Buttons beyond the standard ones, as a YAML list.",card_shows:"The card shows",or:"or",other_integration:"Other",add_device_short:"Device",nav_flow:"Open the flow",step_picture_checks:"Waits until {entity} shows {states}.",step_picture_none:"{device} has no picture check, so this step waits for nothing.",yaml_intro:"The whole room as YAML. Changes here and in the forms are the same configuration.",add_room_name:"Name of the new room",create:"Add",cancel:"Cancel","helper.power_switch":"Shared outlets stay on while any device on them is needed.","helper.delay_after_power":"How long the device needs after the outlet came on. Only waited when the outlet was off.","helper.delay_after_on":"Until the device accepts commands. Only when it was switched on.","helper.delay_after_off":"Cool-down before the next device or the outlet is switched off, e.g. 180 s for a projector.","helper.ready_entity":"E.g. the remote of an Apple TV, which is on only while it is connected.","helper.ready_reload":"Skips the waiting time of an integration that retries its connection.","helper.source":"The list shows what the device reported last, so it must have been on once. A name can also be typed in.","field.entity_id":"Entity","field.name":"Display name","field.power_switch":"Power outlet","field.remote_entity":"Remote (optional)","helper.remote_entity":"Arrow keys, OK, back, home and menu of the card go to this remote entity, e.g. the remote of an Apple TV.","field.delay_after_power":"Boot time (s)","field.delay_after_on":"Wait after switching on (s)","field.delay_after_off":"Wait after switching off (s)","field.ready_enabled":"Wait until available before switching on","field.ready_entity":"Check this entity instead (optional)","field.ready_state":"Wait for state (optional, e.g. on)","field.ready_timeout":"Timeout (s)","field.ready_reload":"Reload its integration","field.ready_on_timeout":"On timeout","field.commands":"Own commands (YAML: name \u2192 actions)","field.icon":"Icon","field.order":"Position","field.on_start":"On start","field.on_stop":"On stop","field.volume":"Volume","field.channels":"Channels","field.transport":"Playback","field.navigation":"Navigation","field.touchpad":"Touch surface","helper.touchpad":"A swipe area instead of the arrow keys in the card. Automatic: for navigation that goes to a remote entity, e.g. an Apple TV.",touchpad_auto:"Automatic",touchpad_on:"On",touchpad_off:"Off (arrow keys)","field.buttons":"Extra buttons (YAML list)","field.label":"Label (optional, default: the source)","field.activity_commands":"Commands of this activity (YAML: name \u2192 actions)","field.type":"Type","field.device":"Device","field.source":"Source","field.volume_level":"Volume","field.sound_mode":"Sound mode","field.brightness_pct":"Brightness (%)","field.color_temp_kelvin":"Color temperature (K)","field.transition":"Transition (s)","field.position":"Position (%)","field.tilt_position":"Tilt (%)","field.action":"Action (e.g. script.turn_on)","field.data":"Data","field.target":"Target","field.timeout":"Timeout (s)","field.reload_integration":"Reload its integration","field.on_timeout":"On timeout","field.delay_after":"Wait afterwards (s)",on_timeout_abort:"Abort the start",on_timeout_continue:"Continue","step.power_on":"Switch on","step.power_off":"Switch off","step.set_source":"Set source","step.set_volume":"Set volume","step.set_sound_mode":"Set sound mode","step.set_brightness":"Set brightness","step.set_color_temp":"Set color temperature","step.set_position":"Set cover position","step.set_tilt":"Set cover tilt","step.call_action":"Call action","step.delay":"Wait","step.wait_available":"Wait until available",section_remote_preview:"Remote control preview",hint_remote_preview:"The card as it looks while this activity runs, with the settings above, also before saving. Tap a button to see where it goes; nothing is sent.","preview.tap":"Tap a button to see which device gets it and what runs there.","preview.this_activity":"this activity","preview.device_commands":"own command of the device: {actions}","preview.activity_commands":"own command of the activity: {actions}","preview.unknown":"does nothing: no device of this activity handles it","preview.unknown_on_device":"does nothing: {device} cannot handle it","preview.ready":"Checks the connection first and restores it if needed.","preview.dead":"These buttons are shown but do nothing:","preview.groups":"Button groups","preview.mode_auto":"automatic","preview.mode_set":"chosen","preview.hidden":"hidden","preview.no_device":"no suitable device, not shown","preview.no_keys":"not shown: {device} has none of these buttons",section_flow:"Flow: what is switched when",hint_flow:"Computed from the settings of this activity and its devices, also before saving. Times count only the configured waits; how long the devices take to respond comes on top.","flow.mode_start":"Startup","flow.mode_stop":"Shutdown","flow.from_label":"Starting from","flow.from_idle":"from idle (everything off)","flow.from":"switching from {activity}","flow.failed":"Could not compute the flow: {error}","flow.invalid":"No flow while the configuration has an error \u2013 {error}","flow.state_starting":"Room: starting","flow.state_active":"Room: active","flow.state_stopping":"Room: stopping","flow.state_idle":"Room: off","flow.outlets_on":"Turn on the outlets, all at once: {outlets}","flow.outlets_off":"Turn off the outlets: {outlets}","flow.outlets_off_later":"Turn off the outlet after its cool-down: {outlets}","flow.outlet_keep":"{outlet} stays on, this activity needs it","flow.outlets_already_on":"already on: {outlets}","flow.unless_rooms":"not while {rooms} uses it","flow.on_start":"Actions on start begin","flow.on_start_wait":"Wait until the actions on start are done","flow.on_stop":"Actions on stop begin","flow.on_stop_wait":"Wait until the actions on stop are done","flow.parallel":"runs alongside","flow.already_on":"Already on in {activity}: no switching, no waiting","flow.boot":"Boot time: until {seconds} after the outlets came on","flow.reload":"Reload the integration of {entity}","flow.ready":"Wait until {entity} is available, at most {timeout}","flow.ready_state":"Wait until {entity} is {states}, at most {timeout}","flow.on_timeout_abort":"\u2013 otherwise the start is aborted","flow.on_timeout_continue":"\u2013 otherwise it goes on anyway","flow.turn_on":"Turn on {device}","flow.turn_off":"Turn off {device}","flow.turn_off_unused":"Turn off {device}, this activity does not use it","flow.cannot_switch":"{device} cannot be switched on or off, nothing is sent","flow.wait_on":"Wait {seconds} until the device is ready","flow.wait":"Wait {seconds}","flow.started_by":"Also starts when {entity} changes to {states}","flow.stopped_by":"Also shuts down when {entity} changes to {states}","flow.add_started_by":"Started by",started_by:"Started by",started_by_hint:"Start this activity when an entity changes to a state, e.g. the Harmony remote's activity button or a wall switch, and optionally shut it down on another state. Changes that come from this activity's own startup or shutdown are ignored, and so are reconnects.","field.started_by_entity":"Entity","field.started_by_state":"Starts on","field.started_by_stop":"Shuts down on (optional)","flow.delay":"Wait {seconds} before turning it on","flow.wait_for":"Wait until {what}, at most {timeout}","flow.wait_for_on":"{device} is on","flow.wait_for_picture":"{device} shows a picture","flow.and":" and ","flow.turn_off_later":"Turn off {device} {seconds} after the shutdown","flow.option":"selects {option}","flow.delete":"Remove","flow.group.on":"on","flow.group.off":"off","flow.group.starting":"starting","flow.group.stopping":"stopping","flow.group.error":"error","flow.add_device":"Device","flow.add_check":"Check","flow.add_step":"Action after start","flow.add_on_start":"Actions on start","flow.add_on_stop":"Actions on stop","flow.add_hint":"Add to the startup:","flow.add_stop_hint":"Add to the shutdown:","flow.edit_hint":"Click \u270E on a line to change it here, the trash icon removes it.","flow.close_edit":"Done","flow.device_shared":"These settings belong to the device: they apply to every activity that uses it.","flow.open_device":"Open the device page","flow.remove_device":"Remove from this activity","flow.before":"Before turning it on","flow.before_hint":"Wait a fixed time, and/or until other devices of this activity are on or show a picture.","flow.add_wait_for":"+ Wait for a device","flow.pick_device":"Add a device\u2026","flow.no_more_devices":"Every device of the room is in this activity. New devices are added on the Devices page.","field.before_delay":"Wait first","field.before_timeout":"At most","field.before_on_timeout":"If not in time","wait_for.on":"is on","wait_for.picture":"shows a picture","field.turn_off_after":"At shutdown, turn off after","helper.turn_off_after":"0: with the other devices. For seats or lights that stay on for a while; a new startup keeps it on.","field.option":"Activity to select","helper.option":"Startup selects it; without one, the first that isn't the off option.","field.off_option":"Shutdown selects","wait.none":"Nothing, go on at once","flow.steps":"Actions after start","flow.checks":"Checks, all at once","flow.edit":"Edit","flow.options":"Flow options","flow.options_hint":"What counts as a detail: hidden while Details is off, here and on the card.","flow.details_chip":"Details","flow.detail_entities":"Entity IDs and actions","flow.detail_waits":"Waits","flow.detail_notes":"Notes","flow.detail_reloads":"Reloads","flow.detail_outlets":"Outlets","flow.detail_hooks":"Actions on start and stop","flow.check":"{device}: wait until {entity} shows {states}, at most {timeout}","flow.check_unless":"{device}: wait until {entity} no longer shows {states}, at most {timeout}","flow.check_missing":"{device}: nothing to check, its profile has no picture check","flow.check_warn":"\u2013 otherwise a warning","flow.background":"In the background, after the room is done","flow.if.outlet_was_off":"only if its outlet was off","flow.if.if_off":"only if the device is off","flow.if.if_on":"only if the device is on","flow.reload_if_needed":"reloads its integration if not ready","flow.cooldown":"then {seconds} cool-down","flow.summary_start":"Active after {min} at the earliest, {max} at the latest if every readiness check takes its full timeout.","flow.summary_start_fixed":"Active after {min}.","flow.summary_stop":"Off as soon as the devices are switched off and the actions on stop are done.","flow.summary_stop_cut":"Off as soon as the devices are switched off and the actions on stop are done; the last outlet goes off after {seconds}."},de:{"pf.form":"Formular","pf.form_hint":"Jeder Teil des Profils, an einem echten Ger\xE4t seiner Integration gew\xE4hlt. Entit\xE4ten werden so gespeichert, wie jedes Home Assistant sie findet (Typ und \xDCbersetzungsschl\xFCssel), nie \xFCber ihre Entit\xE4ts-ID.","pf.general":"Allgemein","pf.general_hint":"Wof\xFCr das Profil ist und wo seine Ger\xE4te in der Einschaltreihenfolge einer Aktivit\xE4t stehen.","pf.name":"Name","pf.id":"ID","pf.integration":"Integration","pf.example":"Beispielger\xE4t","pf.no_example":"Kein Ger\xE4t dieser Integration vorhanden: Entit\xE4ten lassen sich nicht w\xE4hlen, nur in YAML eintragen.","pf.device_entity":"Ger\xE4te-Entit\xE4t","pf.order":"Einschaltreihenfolge","pf.status":"Status","pf.status_hint":"Welche Entit\xE4t sagt, dass das Ger\xE4t an ist, und was jeder ihrer Werte bedeutet. Einen angezeigten Wert antippen oder einen eintippen.","pf.status_entity":"Status-Entit\xE4t","pf.status_own":"Keine gew\xE4hlt: der Zustand der Ger\xE4te-Entit\xE4t selbst ist der Status.","pf.status_other":"Der Zustand (oder das Attribut) dieser Entit\xE4t ist der Status.","pf.attribute":"Attribut","pf.attribute_none":"Ihr Zustand","pf.now":"Jetzt: {value}","pf.available_is_on":"An, solange diese Entit\xE4t verf\xFCgbar ist (sie ist nicht verf\xFCgbar, w\xE4hrend das Ger\xE4t aus ist)","pf.group.starting":"Startet","pf.group.on":"An","pf.group.stopping":"Stoppt","pf.group.off":"Aus","pf.group.error":"Fehler","pf.other_value":"Anderer Wert \u2026","pf.timing":"Zeiten","pf.timing_hint":"Wie lange auf An und Aus gewartet wird, bevor die Fehler-Einstellung des Ger\xE4ts greift, und wie lange ein Zustand anhalten muss.","pf.timeout_on":"Zeitlimit beim Einschalten","pf.timeout_off":"Zeitlimit beim Ausschalten","pf.debounce":"Entprellen","pf.reset":"Zur\xFCck zum Standard","pf.companions":"Fernbedienung, Steckdose und Einstellungen","pf.companions_hint":"Wird bei jedem Ger\xE4t mit diesem Profil eingetragen.","pf.remote":"Fernbedienung (Pfeiltasten)","pf.power_switch":"Steckdosen-Schalter","pf.settings":"Einstellungen in der Karte","pf.settings_hint":"In der Fernbedienungskarte angeboten, w\xE4hrend eine Aktivit\xE4t l\xE4uft.","pf.picture":"Bildpr\xFCfung","pf.picture_hint":"Ein Ger\xE4t, das meldet, ob ein Bild ankommt (Lumagen Active Video, JVC Source Display): Integrationen erkennen f\xFCgt daf\xFCr eine Bildpr\xFCfung zu den Pr\xFCfungen der Aktivit\xE4t hinzu.","pf.picture_on":"Dieses Ger\xE4t hat eine Bildpr\xFCfung","pf.picture_entity":"Entit\xE4t","pf.picture_ok":"Bild","pf.picture_fail":"Kein Bild","pf.picture_timeout":"Zeitlimit","pf.jobs":"Aufgaben","pf.jobs_hint":"F\xFCr ein Ger\xE4t, das mehrere Integrationen abdecken (ein TV mit PiPup, ADB und Android TV Remote): die Aufgaben dieser. Kleinere Zahlen gewinnen.","pf.none":"Keine","pf.not_on_device":"nicht an diesem Ger\xE4t",detect_used_integration:"F\xFCr den Zustand dieses Ger\xE4ts genutzt",detect_open_profile:"Dieses Profil \xF6ffnen",detect_no_area:"Kein Bereich",detect_select_all:"Alle ausw\xE4hlen",timing_on:"Geht in etwa {typical} an ({count} gemessen, langsamste {slowest})",timing_off:"Geht in etwa {typical} aus ({count} gemessen, langsamste {slowest})",timing_use:"Gemessene Zeitlimits \xFCbernehmen",timing_use_hint:"Setzt die Status-Zeitlimits auf das, was die Messungen nahelegen: anderthalbmal so lang wie \xFCblich und l\xE4nger als die langsamste.","flow.typical":"meist {seconds}",setup:"Einrichtung","flow.picture":"{step}. Warten, bis {entity} {states} zeigt, h\xF6chstens {timeout}","field.on_failure_picture":"Wenn kein Bild kommt",detect:"Integrationen erkennen",detect_intro:"Vergleicht, was in Home Assistant installiert ist, mit dem, was die R\xE4ume nutzen. Ankreuzen, was sich \xE4ndern soll, dann \xDCbernehmen: die \xC4nderungen erscheinen als ungespeichert; gespeichert wird erst mit Speichern.",detect_running:"Integrationen werden angesehen \u2026",detect_nothing:"Nichts zu \xE4ndern: jedes AV-Ger\xE4t mit Profil ist in einem Raum, und jede Entit\xE4t der R\xE4ume existiert.",detect_new:"Erkannte Ger\xE4te",detect_new_hint:"Ger\xE4te, die noch kein Raum nutzt, nach ihrem Home-Assistant-Bereich. Die hinzuzuf\xFCgenden ankreuzen: sie kommen in die angekreuzten Aktivit\xE4ten, an die Stelle, die ihr Profil in der Einschaltreihenfolge vorgibt (fr\xFCh, Mitte, sp\xE4t), mit Status, Fernbedienung und Steckdose. Der Profil-Chip \xF6ffnet sein Profil; der blaue Integrations-Chip ist der f\xFCr den Zustand des Ger\xE4ts genutzte.",detect_room:"Raum",detect_new_room:"Neuer Raum: {name}",detect_activities:"Hinzuf\xFCgen zu",detect_no_activities:"Dieser Raum hat noch keine Aktivit\xE4ten.",detect_starter:"Pro Raum eine neue Aktivit\xE4t mit den ausgew\xE4hlten Ger\xE4ten anlegen",detect_picture:"mit Bildpr\xFCfung",detect_better:"Bessere Integrationen",detect_better_hint:"Ein Ger\xE4t eines Raums, das eine andere Integration jetzt besser abdeckt (schneller oder ausf\xFChrlicher). Nicht angekreuzt: zum Wechseln ankreuzen.",detect_better_row:"{from} \u2192 {to}",detect_gone:"Fehlende Entit\xE4ten",detect_gone_hint:"Entit\xE4ten eines Raums, die es nicht mehr gibt, z. B. nach dem Entfernen einer Integration. Wird dasselbe Ger\xE4t noch von einer anderen Integration abgedeckt, wird sie als Ersatz angeboten.",detect_replace_with:"Ersetzen durch {entity} ({integration})",detect_no_replacement:"Kein Ersatz; bitte von Hand anpassen. Ein Ger\xE4t ohne Status nutzt seine festen Zeiten.",detect_renamed:"Umbenannte Entit\xE4ten",detect_renamed_hint:"Dieselbe Entit\xE4t unter neuer ID. Sie wird \xFCberall ersetzt au\xDFer in Aktionen und Befehlen: diese pr\xFCfen.",detect_unmatched:"Integrationen ohne Profil",detect_unmatched_hint:"Ihre Ger\xE4te arbeiten mit festen Zeiten. Ein Profil anlegen, damit Easy AV Control auf ihre eigenen Zust\xE4nde warten kann.",detect_create_profile:"+ Profil",detect_apply:"\xDCbernehmen",detect_applied:"\xDCbernommen. R\xE4ume pr\xFCfen, dann Speichern.",detect_again:"Erneut erkennen",profile_new:"+ Profil",profile_new_pick:"Integration",profile_new_hint:"Integrationen mit Mediaplayer oder Fernbedienung ohne Profil. Der Entwurf startet vom ersten Ger\xE4t der gew\xE4hlten.",profile_new_none:"Jede Integration mit Mediaplayer oder Fernbedienung hat ein Profil.",learn:"Lernen",learn_hint:"Das Ger\xE4t hier ein- und wieder ausschalten: Easy AV Control zeichnet auf, was {entity} zeigt, und tr\xE4gt ein, welche Zust\xE4nde Starten, An, Stoppen und Aus bedeuten.",learn_on:"Jetzt einschalten",learn_off:"Jetzt ausschalten",learn_seen_on:"Beim Einschalten: {states}",learn_seen_off:"Beim Ausschalten: {states}",learn_use:"Gesehenes \xFCbernehmen",learn_nothing:"Noch nichts aufgezeichnet.","flow.status_on":"Warten, bis {device} meldet, dass es an ist ({entity}), h\xF6chstens {timeout}","flow.status_off":"Warten, bis {device} meldet, dass es aus ist ({entity}), h\xF6chstens {timeout}","flow.outlets_off_status":"Steckdose ausschalten, sobald ihre Ger\xE4te aus sind: {outlets}","flow.debounce":"der Zustand muss {seconds} anhalten",profiles:"Profile",profiles_intro:"Ein Profil sagt Easy AV Control, was die Entit\xE4ten einer Integration \xFCber ein Ger\xE4t verraten: welche Entit\xE4t zeigt, dass es an ist, was ihre Zust\xE4nde bedeuten, Fernbedienung, Steckdose und Einstellungen. Eingebaute sind gesperrt: zum \xC4ndern duplizieren.",profiles_builtin:"Eingebaut",profiles_yours:"Eigene",profiles_none_yours:"Noch keine. Ein eingebautes Profil duplizieren oder eines importieren.",profile_generic:"f\xFCr jeden Mediaplayer ohne eigenes Profil",profile_untested:"Aus dem Code der Integration, nicht an einem Ger\xE4t getestet",profile_used_by:"Genutzt von {where}",profile_unused:"Von keinem Ger\xE4t genutzt",profile_preview:"Zusammenfassung zeigen",profile_view:"Ansehen",profile_edit:"Bearbeiten",profile_duplicate:"Duplizieren",profile_delete_confirm:'Eigenes Profil "{name}" l\xF6schen? Ger\xE4te, die es nutzen, nehmen wieder das eingebaute.',profile_readonly:"Eingebaut: nur lesen. Zum \xC4ndern duplizieren.",profile_editor_hint:"Das Profil als YAML. Entit\xE4ten werden am Ger\xE4t \xFCber Domain und translation_key gefunden, nie \xFCber die Entit\xE4ts-ID; so passt das Profil zu jedem Home Assistant.",profile_save:"Profil speichern",profile_close:"Schlie\xDFen",profile_cancel:"Abbrechen",profile_saved:"Profil gespeichert.",profile_export:"Exportieren",profile_export_all:"Eigene exportieren",profile_import:"Importieren",profile_import_hint:"Einen Profil-Export von Easy AV Control einf\xFCgen. Vorhandene Profile werden nie ersetzt: eines mit vergebener ID kommt unter einer neuen dazu.",profile_import_done:"Hinzugef\xFCgt: {added}",profile_import_renamed:"{from} als {to} hinzugef\xFCgt",profile_import_invalid:"Ung\xFCltig, \xFCbersprungen: {ids}",profile_copy:"In die Zwischenablage",profile_copied:"Kopiert \u2713",profile_copy_failed:"Strg/Cmd+C dr\xFCcken",profile_paste:"Aus der Zwischenablage",profile_paste_failed:"Mit Strg/Cmd+V einf\xFCgen",profile_share:"Profil teilen",profile_share_hint:"Eines f\xFCr ein Ger\xE4t gebaut, das andere auch haben? Exportieren und den Text \xFCber Problem melden (unten im Men\xFC) schicken: angenommene Profile werden eingebaut.",sum_indicator:"An / aus \xFCber {what}",sum_indicator_device:"den Zustand des Ger\xE4ts",sum_indicator_available:"die Verf\xFCgbarkeit von {what}",sum_states:"{groups}",sum_remote:"Fernbedienung",sum_outlet:"Steckdose",sum_settings:"Einstellungen",sum_picture:"Bildpr\xFCfung",sum_order:"Einschaltreihenfolge: {order}",sum_roles:"Aufgaben: {roles}","order.early":"fr\xFCh","order.middle":"Mitte","order.late":"sp\xE4t","role.power":"Strom","role.navigation":"Pfeiltasten","role.now_playing":"l\xE4uft gerade","role.turn_off":"Ausschalten",section_state:"Ger\xE4tezustand",hint_state:"Woran Easy AV Control erkennt, dass das Ger\xE4t an oder aus ist. Mit einem Status wartet es auf das Ger\xE4t selbst statt auf feste Zeiten.",detected:"Erkannt: {name}",detected_none:"Kein Profil f\xFCr die Integration dieses Ger\xE4ts: es gelten die festen Zeiten unten.",detected_uses:"Nutzt",detected_now:"Jetzt: {value}",detected_found_indicator:"Status von {entity}",detected_found_attribute:"Attribut {attribute}",detected_found_remote:"Fernbedienung: {entity}",detected_found_outlet:"Steckdose: {entity}",detected_found_settings:"Einstellungen: {entities}",detected_use:"\xDCbernehmen",detected_applied:"In Gebrauch",detected_siblings:"Auch abgedeckt von: {integrations}",detected_role:"{role}: {integration}",state_source:"Status","state_source.auto":"Automatisch (aus dem Profil)","state_source.none":"Keiner: nur feste Zeiten","field.profile":"Profil","profile.auto":"Automatisch (f\xFCr seine Integration)","field.wait_on":"Beim Einschalten warten auf","field.wait_off":"Vor dem Abschalten der Steckdose warten auf","wait.status":"Seinen Status","wait.time":"Eine feste Zeit","wait.both":"Seinen Status, dann eine feste Zeit","field.timeout_on":"Status-Zeitlimit beim Einschalten","field.timeout_off":"Status-Zeitlimit beim Ausschalten","field.debounce":"Entprellen","helper.debounce":"Sekunden, die ein Zustand anhalten muss, bevor er z\xE4hlt.","field.on_failure_on":"Wenn es nicht angeht","field.on_failure_off":"Wenn es nicht ausgeht","failure.warn":"Warnen und weitermachen","failure.stop":"Aktivit\xE4t beenden","failure.retry":"Noch einmal versuchen, dann warnen","failure_off.stop":"Steckdose anlassen",state_fixed_only:"Kein Status f\xFCr dieses Ger\xE4t: nur die festen Zeiten unten gelten.",footer_version:"Easy AV Control (Ltek) {version}",star:"\u2B50 Auf GitHub markieren",report:"\u{1F41B} Problem melden",title:"Easy AV Control",rooms:"R\xE4ume",add_room:"Raum hinzuf\xFCgen",guide:"Anleitung",act_startup:"Hochfahren",act_shutdown:"Herunterfahren",act_hold:"3 Sekunden gedr\xFCckt halten, um diese Aktivit\xE4t zu starten",act_saved_only:"Startet die Aktivit\xE4t wie gespeichert; vorher speichern, um die \xC4nderungen zu nutzen.",reports:"Berichte","rep.title":"Berichte","rep.hint":"Wie lange jeder Start und Stopp dauerte und wie lange jedes Ger\xE4t zum Ein- und Ausschalten brauchte. Gemessen, w\xE4hrend Easy AV Control schaltet; die letzten 300 L\xE4ufe und 100 Zeiten je Ger\xE4t bleiben erhalten.","rep.refresh":"Aktualisieren","rep.clear":"Leeren","rep.clear_confirm":"Den ganzen Verlauf l\xF6schen? Die typischen Zeiten f\xFCr die Zeitlimits bleiben.","rep.runs":"L\xE4ufe","rep.devices":"Ger\xE4te","rep.devices_hint":"Vom Ein- (oder Aus-)Befehl, bis das Ger\xE4t meldet, dass es an (aus) ist, f\xFCr Ger\xE4te mit Status. Nur, wenn Easy AV Control das Ger\xE4t geschaltet hat.","rep.no_runs":"Noch keine L\xE4ufe: eine Aktivit\xE4t starten.","rep.no_devices":"Noch keine Ger\xE4tezeiten. Sie werden f\xFCr Ger\xE4te mit Status gemessen, wenn eine Aktivit\xE4t sie schaltet.","rep.show":"Zeigen","rep.mode_all":"Hoch- und Herunterfahren","rep.mode_start":"Hochfahren","rep.mode_stop":"Herunterfahren","rep.export":"Exportieren","rep.export_run":"Diesen Lauf mit seinem Protokoll exportieren","rep.copied":"In die Zwischenablage kopiert","rep.export_hint":"Der Bericht ist eine JSON-Datei: die L\xE4ufe, jeder mit seinem Protokoll (was Easy AV Control tat, jeder Dienstaufruf und jede Zustands\xE4nderung der Entit\xE4ten des Raums), die Ger\xE4tezeiten, die R\xE4ume wie eingerichtet und die Versionen.","rep.from":"von {activity}","rep.typical":"typisch","rep.count":"{n} L\xE4ufe","rep.count_times":"{n} Mal","rep.failed":"{n} fehlgeschlagen","rep.result_ok":"OK","rep.result_warning":"Warnungen","rep.result_error":"Fehlgeschlagen","rep.result_cancelled":"Abgebrochen","rep.phase_switch_off_unused":"Nicht Ben\xF6tigtes ausschalten","rep.phase_outlets_on":"Steckdosen an","rep.phase_outlets_off":"Steckdosen aus","rep.phase_checks":"Pr\xFCfungen","rep.phase_steps":"Aktionen nach dem Start","rep.phase_hooks":"Aktionen bei Start / Stopp","rep.dir_on":"Einschalten","rep.dir_off":"Ausschalten","rep.dir":"","rep.when":"Wann","rep.time":"Zeit","rep.result":"Ergebnis","rep.for":"Raum \xB7 Aktivit\xE4t","rep.slow":"Langsam",sidebar_chip:"Editor in der Seitenleiste",sidebar_hint:"Easy AV Control in der Seitenleiste von Home Assistant zeigen. Ausgeblendet bleibt es unter /easy-av-control und unter Einstellungen \u2192 Ger\xE4te & Dienste \u2192 Easy AV Control \u2192 Konfigurieren.",no_rooms:"Noch keine R\xE4ume.",room_name:"Name",room_area:"Bereich",room_default_activity:"Standard-Aktivit\xE4t",default_last:"Zuletzt genutzte","helper.default_activity":"Was der Ein/Aus-Schalter des Raums und toggle_activity starten, z. B. von einem Wandtaster.",room_id_hint:"ID {id}",delete_room:"Raum l\xF6schen",delete_room_confirm:"Raum \u201E{name}\u201C mit allen Ger\xE4ten und Aktivit\xE4ten l\xF6schen?",tab_devices:"Ger\xE4te",tab_activities:"Aktivit\xE4ten",tab_yaml:"YAML",add_device:"Ger\xE4t hinzuf\xFCgen",add_activity:"Aktivit\xE4t hinzuf\xFCgen",delete:"L\xF6schen",move_up:"Nach oben",move_down:"Nach unten",device_id:"Ger\xE4te-ID",device_in_use:"Ger\xE4t \u201E{id}\u201C wird verwendet von: {where}. Bitte zuerst dort entfernen.",activity_id_hint:"ID {id} \u2013 Teil der Entit\xE4ts-IDs, nicht \xE4nderbar",new_activity:"Neue Aktivit\xE4t",add_device_to_activity:"Ger\xE4t hinzuf\xFCgen \u2026",steps:"Aktionen nach dem Start",section_checks:"Pr\xFCfungen",hint_checks:"Was stimmen muss, bevor die Aktivit\xE4t als laufend gilt, z. B. ein Bild am Lumagen und am Projektor. Sie laufen gleichzeitig, sobald alle Ger\xE4te an sind, und wieder beim Wechsel von einer anderen Aktivit\xE4t.",add_check:"Pr\xFCfung",check_profile:"Bildpr\xFCfung aus seinem Profil",check_entity:"Eine eigene Entit\xE4t",check_what:"Was",check_entity_label:"Entit\xE4t",check_states:"Richtig, wenn sie zeigt",check_states_placeholder:"z. B. on, Active Video",check_timeout:"Zeitlimit",check_failure:"Wenn es nicht stimmt",check_warn:"Warnen und weitermachen",check_stop:"Aktivit\xE4t abbrechen",check_none:"Keine Pr\xFCfungen: die Aktivit\xE4t gilt als laufend, sobald ihre Ger\xE4te an sind.",check_unless_text:"Wartet, bis {entity} nicht mehr {states} zeigt.","flow.steps":"Aktionen nach dem Start","flow.checks":"Pr\xFCfungen, gleichzeitig","flow.edit":"Bearbeiten","flow.options":"Ablauf-Optionen","flow.options_hint":"Was als Detail gilt: ausgeblendet, solange Details aus ist, hier und auf der Karte.","flow.details_chip":"Details","flow.detail_entities":"Entit\xE4ts-IDs und Aktionen","flow.detail_waits":"Wartezeiten","flow.detail_notes":"Hinweise","flow.detail_reloads":"Neu laden","flow.detail_outlets":"Steckdosen","flow.detail_hooks":"Aktionen bei Start und Stopp","flow.check":"{device}: warten, bis {entity} {states} zeigt, h\xF6chstens {timeout}","flow.check_unless":"{device}: warten, bis {entity} nicht mehr {states} zeigt, h\xF6chstens {timeout}","flow.check_missing":"{device}: nichts zu pr\xFCfen, sein Profil hat keine Bildpr\xFCfung","flow.check_warn":"\u2013 sonst eine Warnung",add_step:"Schritt hinzuf\xFCgen \u2026",hooks:"Aktionen bei Start und Stopp",remote:"Fernbedienung",quick_select:"Schnellwahl",quick_select_hint:"Tasten, die einen Mediaplayer auf eine Quelle schalten; beim Apple TV sind die Quellen seine Apps.",quick_select_no_player:"F\xFCge dieser Aktivit\xE4t zuerst einen Mediaplayer hinzu.",add_quick_select:"Schnellwahl hinzuf\xFCgen",card_settings:"Einstellungen in der Karte",card_settings_hint:"Quelle, Klangmodus und weitere Einstellungen der Ger\xE4te, in der Karte \xE4nderbar, w\xE4hrend die Aktivit\xE4t l\xE4uft: die an den Ger\xE4ten festgelegten oder eine Auswahl nur f\xFCr diese Aktivit\xE4t. Der Bereich ist zugeklappt, bis man ihn \xF6ffnet; jeder Browser merkt sich das.","setting.entity":"Entit\xE4t des Ger\xE4ts","field.entity":"Entit\xE4t","helper.entity":"Eine Zahl (Schieberegler), Auswahl (Liste) oder ein Schalter (An/Aus-Taste), z. B. der Bass des Receivers.","field.settings_mode":"Anzeigen",settings_auto:"Von den Ger\xE4ten",settings_chosen:"Hier ausgew\xE4hlt, mit Favoriten",settings_auto_shows:"Die Karte zeigt: {list}.",settings_auto_none:"Die Ger\xE4te dieser Aktivit\xE4t bieten noch keine Einstellungen. Lege sie an einem Ger\xE4t fest, oder starte die Aktivit\xE4t einmal, damit die Mediaplayer ihre Listen melden.",device_settings_hint:"Was die Karte von diesem Ger\xE4t anbietet, in jeder Aktivit\xE4t, die es nutzt. Automatisch: Quelle und Klangmodus eines Mediaplayers und die Zahl- und Auswahl-Entit\xE4ten desselben Ger\xE4ts.",device_settings_auto:"Automatisch",device_settings_auto_none:"Noch nichts gefunden: keine Quellen- oder Klangmodus-Liste gemeldet und keine Zahl- oder Auswahl-Entit\xE4ten desselben Ger\xE4ts.",device_settings_none:"Die Karte zeigt keine Einstellungen dieses Ger\xE4ts.",settings_none:"Die Karte zeigt f\xFCr diese Aktivit\xE4t keine Einstellungen.",add_setting:"Einstellung hinzuf\xFCgen","field.setting":"Einstellung","field.options":"Favoriten (optional)","helper.options":"Nur diese in der Karte, in dieser Reihenfolge; leer: die ganze Liste des Ger\xE4ts.",commands:"Eigene Befehle",save:"Speichern",discard:"Verwerfen",saving:"Speichert \u2026",saved:"Gespeichert",unsaved:"Ungespeicherte \xC4nderungen",reload:"Neu laden",reload_confirm:"Ungespeicherte \xC4nderungen verwerfen und die gespeicherte Konfiguration laden?",retry:"Erneut versuchen",save_anyway:"Trotzdem speichern",conflict:"Die Konfiguration wurde anderswo ge\xE4ndert. Bitte neu laden \u2013 deine ungespeicherten \xC4nderungen hier gehen dabei verloren.",invalid:"Nicht gespeichert \u2013 {path}: {message}",missing:"Diese Entit\xE4ten gibt es in Home Assistant nicht:",missing_hint:"Ein Ger\xE4t ohne Strom bleibt normalerweise bekannt \u2013 meist ist es ein Tippfehler oder eine umbenannte Entit\xE4t.",loading:"L\xE4dt \u2026",load_error:"Konfiguration konnte nicht geladen werden: {error}",route_auto:"Automatisch",route_none:"Ausblenden",devices_intro:"Alle Ger\xE4te des Raums, die Easy AV Control schaltet oder steuert: TV, Beamer, Receiver, Player.",devices_empty:"Noch keine Ger\xE4te.",new_device:"Neues Ger\xE4t",no_entity:"Keine Entit\xE4t gew\xE4hlt",entity_missing:"Entit\xE4t in Home Assistant nicht gefunden",used_by:"Verwendet in: {where}",section_device:"Ger\xE4t",hint_device:"Die Home-Assistant-Entit\xE4t des Ger\xE4ts, meist ein Mediaplayer.",section_power:"Steckdose",hint_power:"Die Steckdose, an der das Ger\xE4t h\xE4ngt: vor dem Ger\xE4t ein- und nach ihm ausgeschaltet. Abw\xE4hlen, wenn das Ger\xE4t an keiner schaltbaren Steckdose h\xE4ngt.",power_use:"Steckdose dieses Ger\xE4ts schalten",section_delays:"Wartezeiten",hint_delays:"Wie lange Easy AV Control auf dieses Ger\xE4t wartet.",section_ready:"Verbindung pr\xFCfen",hint_ready:"Wartet, bis das Ger\xE4t in Home Assistant erreichbar ist, vor dem Einschalten und vor Tasten der Fernbedienung. F\xFCr Ger\xE4te, die ohne Strom ihre Verbindung verlieren, etwa ein Apple TV.",ready_preset:"{entity} f\xFCr Verbindungspr\xFCfung und Pfeiltasten nutzen (empfohlen f\xFCr Apple TV)",section_advanced:"Erweitert",hint_device_advanced:"Die Ger\xE4te-ID wird in der YAML-Konfiguration verwendet. Eigene Befehle ordnen einem Tastennamen Home-Assistant-Aktionen zu, z. B. Pfeiltasten f\xFCr einen Receiver.",activities_intro:'Eine Aktivit\xE4t fasst Ger\xE4te f\xFCr eine Nutzung zusammen, z. B. "Apple TV" = TV und Apple TV. Beim Start wird eingeschaltet, was sie braucht, und ausgeschaltet, was nicht.',activities_empty:"Noch keine Aktivit\xE4ten.",no_devices:"Keine Ger\xE4te",needs_devices:"Lege zuerst die Ger\xE4te dieses Raums an.",section_general:"Allgemein",hint_general:"Name und Icon erscheinen in der Card. Die Position bestimmt die Reihenfolge.",section_activity_devices:"Ger\xE4te",hint_activity_devices:"Werden in dieser Reihenfolge eingeschaltet.",hint_steps:"Zus\xE4tzliche Aktionen in dieser Reihenfolge, sobald alle Ger\xE4te an sind und die Pr\xFCfungen bestanden: z. B. den TV auf seinen HDMI-Eingang schalten, Klangmodus oder Lautst\xE4rke setzen, das Licht dimmen.",hint_remote:"Welches Ger\xE4t welche Tasten der Card bekommt. Automatisch passt f\xFCr die meisten Aufbauten.",hint_activity_advanced:"Befehle in YAML sowie Home-Assistant-Aktionen bei Start und Stopp.",card_divider:"Fernbedienungs-Karte",card_extra:"Zus\xE4tzliche Tasten",hint_card_extra:"Tasten \xFCber die \xFCblichen hinaus, als YAML-Liste.",card_shows:"Die Karte zeigt",or:"oder",other_integration:"Sonstige",add_device_short:"Ger\xE4t",nav_flow:"Ablauf \xF6ffnen",step_picture_checks:"Wartet, bis {entity} {states} zeigt.",step_picture_none:"{device} hat keine Bildpr\xFCfung, dieser Schritt wartet also auf nichts.",yaml_intro:"Der ganze Raum als YAML. \xC4nderungen hier und in den Formularen betreffen dieselbe Konfiguration.",add_room_name:"Name des neuen Raums",create:"Hinzuf\xFCgen",cancel:"Abbrechen","helper.power_switch":"Gemeinsame Steckdosen bleiben an, solange ein Ger\xE4t daran gebraucht wird.","helper.delay_after_power":"Wie lange das Ger\xE4t nach dem Einschalten der Steckdose braucht. Nur wenn die Steckdose aus war.","helper.delay_after_on":"Bis das Ger\xE4t Befehle annimmt. Nur wenn es eingeschaltet wurde.","helper.delay_after_off":"Abk\xFChlzeit, bevor das n\xE4chste Ger\xE4t oder die Steckdose ausgeschaltet wird, z. B. 180 s f\xFCr einen Beamer.","helper.ready_entity":"Z. B. die Fernbedienung eines Apple TV, die nur bei bestehender Verbindung an ist.","helper.ready_reload":"\xDCberspringt die Wartezeit einer Integration, die ihre Verbindung erneut versucht.","helper.source":"Die Liste zeigt, was das Ger\xE4t zuletzt gemeldet hat; es muss also einmal an gewesen sein. Ein Name l\xE4sst sich auch eintippen.","field.entity_id":"Entit\xE4t","field.name":"Anzeigename","field.power_switch":"Steckdose","field.remote_entity":"Fernbedienung (optional)","helper.remote_entity":"Pfeiltasten, OK, Zur\xFCck, Home und Men\xFC der Card gehen an diese Fernbedienungs-Entit\xE4t, z. B. die Fernbedienung eines Apple TV.","field.delay_after_power":"Startzeit (s)","field.delay_after_on":"Warten nach Einschalten (s)","field.delay_after_off":"Warten nach Ausschalten (s)","field.ready_enabled":"Vor dem Einschalten auf Verf\xFCgbarkeit warten","field.ready_entity":"Stattdessen diese Entit\xE4t pr\xFCfen (optional)","field.ready_state":"Auf Zustand warten (optional, z. B. on)","field.ready_timeout":"Zeitlimit (s)","field.ready_reload":"Integration neu laden","field.ready_on_timeout":"Bei Zeit\xFCberschreitung","field.commands":"Eigene Befehle (YAML: Name \u2192 Aktionen)","field.icon":"Icon","field.order":"Position","field.on_start":"Beim Start","field.on_stop":"Beim Stopp","field.volume":"Lautst\xE4rke","field.channels":"Sender","field.transport":"Wiedergabe","field.navigation":"Navigation","field.touchpad":"Touchfl\xE4che","helper.touchpad":"Eine Wischfl\xE4che statt der Pfeiltasten in der Karte. Automatisch: wenn die Navigation an eine Remote-Entit\xE4t geht, z. B. ein Apple TV.",touchpad_auto:"Automatisch",touchpad_on:"An",touchpad_off:"Aus (Pfeiltasten)","field.buttons":"Zus\xE4tzliche Buttons (YAML-Liste)","field.label":"Beschriftung (optional, sonst die Quelle)","field.activity_commands":"Befehle dieser Aktivit\xE4t (YAML: Name \u2192 Aktionen)","field.type":"Typ","field.device":"Ger\xE4t","field.source":"Quelle","field.volume_level":"Lautst\xE4rke","field.sound_mode":"Klangmodus","field.brightness_pct":"Helligkeit (%)","field.color_temp_kelvin":"Farbtemperatur (K)","field.transition":"\xDCbergang (s)","field.position":"Position (%)","field.tilt_position":"Neigung (%)","field.action":"Aktion (z. B. script.turn_on)","field.data":"Daten","field.target":"Ziel","field.timeout":"Zeitlimit (s)","field.reload_integration":"Integration neu laden","field.on_timeout":"Bei Zeit\xFCberschreitung","field.delay_after":"Danach warten (s)",on_timeout_abort:"Start abbrechen",on_timeout_continue:"Weitermachen","step.power_on":"Einschalten","step.power_off":"Ausschalten","step.set_source":"Quelle w\xE4hlen","step.set_volume":"Lautst\xE4rke setzen","step.set_sound_mode":"Klangmodus w\xE4hlen","step.set_brightness":"Helligkeit setzen","step.set_color_temp":"Farbtemperatur setzen","step.set_position":"Rollladen-Position setzen","step.set_tilt":"Lamellen-Neigung setzen","step.call_action":"Aktion ausf\xFChren","step.delay":"Warten","step.wait_available":"Auf Verf\xFCgbarkeit warten",section_remote_preview:"Vorschau der Fernbedienung",hint_remote_preview:"So sieht die Karte aus, w\xE4hrend diese Aktivit\xE4t l\xE4uft, mit den Einstellungen oben, auch vor dem Speichern. Tippe eine Taste an, um zu sehen, wohin sie geht; es wird nichts gesendet.","preview.tap":"Tippe eine Taste an, um zu sehen, welches Ger\xE4t sie bekommt und was dort ausgef\xFChrt wird.","preview.this_activity":"diese Aktivit\xE4t","preview.device_commands":"eigener Befehl des Ger\xE4ts: {actions}","preview.activity_commands":"eigener Befehl der Aktivit\xE4t: {actions}","preview.unknown":"tut nichts: kein Ger\xE4t dieser Aktivit\xE4t kennt die Taste","preview.unknown_on_device":"tut nichts: {device} kennt die Taste nicht","preview.ready":"Pr\xFCft vorher die Verbindung und stellt sie bei Bedarf wieder her.","preview.dead":"Diese Tasten werden angezeigt, tun aber nichts:","preview.groups":"Tastengruppen","preview.mode_auto":"automatisch","preview.mode_set":"gew\xE4hlt","preview.hidden":"ausgeblendet","preview.no_device":"kein passendes Ger\xE4t, nicht angezeigt","preview.no_keys":"nicht angezeigt: {device} hat keine dieser Tasten",section_flow:"Ablauf: was wann geschaltet wird",hint_flow:"Berechnet aus den Einstellungen dieser Aktivit\xE4t und ihrer Ger\xE4te, auch vor dem Speichern. Die Zeiten z\xE4hlen nur die eingestellten Wartezeiten; wie lange die Ger\xE4te zum Reagieren brauchen, kommt hinzu.","flow.mode_start":"Hochfahren","flow.mode_stop":"Herunterfahren","flow.from_label":"Ausgangslage","flow.from_idle":"aus dem Leerlauf (alles aus)","flow.from":"Wechsel von {activity}","flow.failed":"Ablauf konnte nicht berechnet werden: {error}","flow.invalid":"Kein Ablauf, solange die Konfiguration einen Fehler hat \u2013 {error}","flow.state_starting":"Raum: startet","flow.state_active":"Raum: aktiv","flow.state_stopping":"Raum: stoppt","flow.state_idle":"Raum: aus","flow.outlets_on":"Steckdosen gleichzeitig einschalten: {outlets}","flow.outlets_off":"Steckdosen ausschalten: {outlets}","flow.outlets_off_later":"Steckdose nach der Abk\xFChlzeit ausschalten: {outlets}","flow.outlet_keep":"{outlet} bleibt an, diese Aktivit\xE4t braucht sie","flow.outlets_already_on":"schon an: {outlets}","flow.unless_rooms":"nicht, solange {rooms} sie nutzt","flow.on_start":"Aktionen beim Start beginnen","flow.on_start_wait":"Warten, bis die Aktionen beim Start fertig sind","flow.on_stop":"Aktionen beim Stopp beginnen","flow.on_stop_wait":"Warten, bis die Aktionen beim Stopp fertig sind","flow.parallel":"l\xE4uft parallel","flow.already_on":"L\xE4uft schon in {activity}: kein Einschalten, keine Wartezeit","flow.boot":"Startzeit: bis {seconds} nach dem Einschalten der Steckdosen","flow.reload":"Integration von {entity} neu laden","flow.ready":"Warten, bis {entity} verf\xFCgbar ist, h\xF6chstens {timeout}","flow.ready_state":"Warten, bis {entity} {states} ist, h\xF6chstens {timeout}","flow.on_timeout_abort":"\u2013 sonst wird der Start abgebrochen","flow.on_timeout_continue":"\u2013 sonst geht es trotzdem weiter","flow.turn_on":"{device} einschalten","flow.turn_off":"{device} ausschalten","flow.turn_off_unused":"{device} ausschalten, diese Aktivit\xE4t braucht es nicht","flow.cannot_switch":"{device} l\xE4sst sich nicht schalten, es wird nichts gesendet","flow.wait_on":"{seconds} warten, bis das Ger\xE4t bereit ist","flow.wait":"{seconds} warten","flow.started_by":"Startet auch, wenn {entity} zu {states} wechselt","flow.stopped_by":"F\xE4hrt auch herunter, wenn {entity} zu {states} wechselt","flow.add_started_by":"Gestartet durch",started_by:"Gestartet durch",started_by_hint:"Diese Aktivit\xE4t starten, wenn eine Entit\xE4t in einen Zustand wechselt, z. B. die Aktivit\xE4tstaste der Harmony-Fernbedienung oder ein Wandschalter, und optional bei einem anderen Zustand herunterfahren. \xC4nderungen durch das eigene Hoch- oder Herunterfahren werden ignoriert, Neuverbindungen auch.","field.started_by_entity":"Entit\xE4t","field.started_by_state":"Startet bei","field.started_by_stop":"F\xE4hrt herunter bei (optional)","flow.delay":"{seconds} warten, bevor es eingeschaltet wird","flow.wait_for":"Warten, bis {what}, h\xF6chstens {timeout}","flow.wait_for_on":"{device} an ist","flow.wait_for_picture":"{device} ein Bild zeigt","flow.and":" und ","flow.turn_off_later":"{device} {seconds} nach dem Herunterfahren ausschalten","flow.option":"w\xE4hlt {option}","flow.delete":"Entfernen","flow.group.on":"an","flow.group.off":"aus","flow.group.starting":"startet","flow.group.stopping":"f\xE4hrt herunter","flow.group.error":"Fehler","flow.add_device":"Ger\xE4t","flow.add_check":"Pr\xFCfung","flow.add_step":"Aktion nach dem Start","flow.add_on_start":"Aktionen beim Start","flow.add_on_stop":"Aktionen beim Stopp","flow.add_hint":"Zum Hochfahren hinzuf\xFCgen:","flow.add_stop_hint":"Zum Herunterfahren hinzuf\xFCgen:","flow.edit_hint":"Mit \u270E an einer Zeile wird sie hier ge\xE4ndert, der Papierkorb entfernt sie.","flow.close_edit":"Fertig","flow.device_shared":"Diese Einstellungen geh\xF6ren zum Ger\xE4t: Sie gelten f\xFCr jede Aktivit\xE4t, die es nutzt.","flow.open_device":"Ger\xE4teseite \xF6ffnen","flow.remove_device":"Aus dieser Aktivit\xE4t entfernen","flow.before":"Vor dem Einschalten","flow.before_hint":"Eine feste Zeit warten und/oder, bis andere Ger\xE4te dieser Aktivit\xE4t an sind oder ein Bild zeigen.","flow.add_wait_for":"+ Auf ein Ger\xE4t warten","flow.pick_device":"Ger\xE4t hinzuf\xFCgen\u2026","flow.no_more_devices":"Alle Ger\xE4te des Raums sind in dieser Aktivit\xE4t. Neue Ger\xE4te kommen auf der Ger\xE4teseite dazu.","field.before_delay":"Zuerst warten","field.before_timeout":"H\xF6chstens","field.before_on_timeout":"Wenn nicht rechtzeitig","wait_for.on":"ist an","wait_for.picture":"zeigt ein Bild","field.turn_off_after":"Beim Herunterfahren ausschalten nach","helper.turn_off_after":"0: mit den anderen Ger\xE4ten. F\xFCr Sitze oder Licht, die eine Weile an bleiben; ein neues Hochfahren l\xE4sst es an.","field.option":"Zu w\xE4hlende Aktivit\xE4t","helper.option":"Hochfahren w\xE4hlt sie; ohne: die erste, die nicht die Aus-Option ist.","field.off_option":"Herunterfahren w\xE4hlt","wait.none":"Nichts, sofort weiter","flow.background":"Im Hintergrund, wenn der Raum schon fertig ist","flow.if.outlet_was_off":"nur, wenn die Steckdose aus war","flow.if.if_off":"nur, wenn das Ger\xE4t aus ist","flow.if.if_on":"nur, wenn das Ger\xE4t an ist","flow.reload_if_needed":"l\xE4dt die Integration neu, falls nicht bereit","flow.cooldown":"danach {seconds} Abk\xFChlzeit","flow.summary_start":"Aktiv fr\xFChestens nach {min}, sp\xE4testens nach {max}, wenn jede Bereitschaftspr\xFCfung ihr ganzes Zeitlimit braucht.","flow.summary_start_fixed":"Aktiv nach {min}.","flow.summary_stop":"Aus, sobald die Ger\xE4te ausgeschaltet und die Aktionen beim Stopp fertig sind.","flow.summary_stop_cut":"Aus, sobald die Ger\xE4te ausgeschaltet und die Aktionen beim Stopp fertig sind; die letzte Steckdose geht nach {seconds} aus."}};function S(a,n,e={}){let t=(a??"en").split("-")[0],i=Gt[t]?.[n]??Gt.en[n];if(i===void 0)return q(a,n,e);for(let[s,o]of Object.entries(e))i=i.replace(`{${s}}`,o);return i}var Li="__none",Z=a=>a.area_id??Li,oe=class extends v{constructor(){super();this._asked=!1;this._areas=new Map,this._ticked=new Set,this._starter=!1}_t(e,t){return S(this.hass?.language,e,t)}updated(){this.hass&&this.rooms&&!this._asked&&(this._asked=!0,this._run())}async _run(){this._result=void 0,this._error=void 0;try{let e=await this.hass.callWS({type:"easy_av_control/config/detect_all",rooms:this.rooms}),t=new Map;for(let s of e.new)t.has(Z(s))||t.set(Z(s),{target:s.room??`new:${s.new_room}`,activities:new Set(s.activities),devices:new Set});let i=new Set;e.renamed.forEach((s,o)=>i.add(`renamed:${o}`)),this._areas=t,this._ticked=i,this._result=e}catch(e){this._error=e.message??String(e)}}_toggle(e){let t=new Set(this._ticked);t.has(e)?t.delete(e):t.add(e),this._ticked=t}_setArea(e,t){let i=new Map(this._areas);i.set(e,{...i.get(e),...t}),this._areas=i}_toggleDevice(e,t){let i=new Set(this._areas.get(e).devices);i.has(t)?i.delete(t):i.add(t),this._setArea(e,{devices:i})}get _anyTicked(){return this._ticked.size>0||[...this._areas.values()].some(e=>e.devices.size>0)}_name(e){return e?this.hass.states[e]?.attributes.friendly_name??e:"\u2013"}async _apply(){let e=this._result,t={new:e.new.filter(s=>this._areas.get(Z(s))?.devices.has(s.key)).map(s=>{let o=this._areas.get(Z(s)),l=o.target.startsWith("new:"),c=e.new.find(d=>`new:${d.new_room}`===o.target);return{...s,room:l?null:o.target,new_room:l?o.target.slice(4):null,new_room_name:l?c?.new_room_name??s.new_room_name:null,area_id:l?c?.area_id??s.area_id:s.area_id,activities:l?[]:[...o.activities]}}),starter:this._starter,better:e.better.filter((s,o)=>this._ticked.has(`better:${o}`)),gone:e.gone.filter((s,o)=>this._ticked.has(`gone:${o}`)),renamed:e.renamed.filter((s,o)=>this._ticked.has(`renamed:${o}`))},i=await this.hass.callWS({type:"easy_av_control/config/detect_apply",rooms:this.rooms,choices:t});this.dispatchEvent(new CustomEvent("rooms-changed",{detail:{rooms:i.rooms}}))}render(){if(this._error)return r`<p class="ltek-error">${this._error}</p>
        <button class="ltek-btn" @click=${this._run}>${this._t("detect_again")}</button>`;let e=this._result;if(!e)return r`<p class="ltek-hint">${this._t("detect_running")}</p>`;let t=!e.new.length&&!e.better.length&&!e.gone.length&&!e.renamed.length,i=[...new Set(e.new.map(Z))];return r`
      <p class="ltek-hint">${this._t("detect_intro")}</p>
      ${t?r`<p class="ltek-hint ok">${this._t("detect_nothing")}</p>`:h}
      <div class="ltek-buttons bar">
        <button class="ltek-btn primary" ?disabled=${!this._anyTicked} @click=${this._apply}>${this._t("detect_apply")}</button>
        <button class="ltek-btn" @click=${this._run}><ha-icon icon="mdi:refresh"></ha-icon> ${this._t("detect_again")}</button>
        ${e.new.length?r`<label class="check">
              <input type="checkbox" .checked=${this._starter} @change=${s=>this._starter=s.target.checked} />
              ${this._t("detect_starter")}
            </label>`:h}
      </div>
      ${e.new.length?this._section("new","mdi:plus-circle-outline",this._t("detect_new"),this._t("detect_new_hint"),r`${i.map(s=>this._renderArea(s,e.new.filter(o=>Z(o)===s)))}`):h}
      ${e.better.length?this._section("better","mdi:arrow-up-bold-circle-outline",this._t("detect_better"),this._t("detect_better_hint"),r`${e.better.map((s,o)=>this._row(`better:${o}`,"mdi:swap-horizontal",this._t("detect_better_row",{from:this._name(s.entity_id),to:this._name(s.replacement)}),`${this.rooms[s.room]?.name??s.room} \xB7 ${s.integration} \u2192 ${s.replacement_integration}`))}`):h}
      ${e.gone.length?this._section("gone","mdi:link-variant-off",this._t("detect_gone"),this._t("detect_gone_hint"),r`${e.gone.map((s,o)=>this._row(`gone:${o}`,"mdi:help-circle-outline",s.entity_id,`${this.rooms[s.room]?.name??s.room}: ${s.path} \xB7 ${s.replacement?this._t("detect_replace_with",{entity:this._name(s.replacement),integration:s.replacement_integration??""}):this._t("detect_no_replacement")}`,!s.replacement))}`):h}
      ${e.renamed.length?this._section("renamed","mdi:rename-outline",this._t("detect_renamed"),this._t("detect_renamed_hint"),r`${e.renamed.map((s,o)=>this._row(`renamed:${o}`,"mdi:rename-outline",`${s.old} \u2192 ${s.new}`,s.uses.map(l=>`${this.rooms[l.room]?.name??l.room}: ${l.path}`).join(", ")))}`):h}
      ${e.unmatched.length?this._section("unmatched","mdi:package-variant",this._t("detect_unmatched"),this._t("detect_unmatched_hint"),r`<div class="ltek-list">${e.unmatched.map(s=>r`<div class="ltek-item">
              <ha-icon class="lead" icon="mdi:puzzle-outline"></ha-icon>
              <span class="ltek-item-text"><span class="ltek-name">${s}</span></span>
              <button class="ltek-add" @click=${()=>this.dispatchEvent(new CustomEvent("create-profile",{detail:{integration:s}}))}>${this._t("detect_create_profile")}</button>
            </div>`)}</div>`):h}

    `}_section(e,t,i,s,o){return r`<details class="ltek-sec" open data-section=${e}>
      <summary><ha-icon icon=${t}></ha-icon>${i}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="ltek-body"><p class="ltek-hint">${s}</p><div class="ltek-list">${o}</div></div>
    </details>`}_row(e,t,i,s,o=!1){return r`<label class="ltek-item ${this._ticked.has(e)?"open":""}">
      <input type="checkbox" ?disabled=${o} .checked=${this._ticked.has(e)} @change=${()=>this._toggle(e)} />
      <ha-icon class="lead" icon=${t}></ha-icon>
      <span class="ltek-item-text"><span class="ltek-name">${i}</span><span class="ltek-subline">${s}</span></span>
    </label>`}_renderArea(e,t){let i=this._areas.get(e),s=this._result,o=t[0],l=[...new Map(s.new.filter(m=>m.new_room).map(m=>[m.new_room,m.new_room_name??m.new_room])).entries()],c=[...Object.entries(this.rooms).map(([m,f])=>({value:m,label:f.name??m})),...l.map(([m,f])=>({value:`new:${m}`,label:this._t("detect_new_room",{name:f})}))],d=i.target.startsWith("new:")?void 0:this.rooms[i.target],u=Object.entries(d?.activities??{}),p=t.every(m=>i.devices.has(m.key));return r`<details class="ltek-sub area" open>
      <summary>
        <ha-icon icon="mdi:texture-box"></ha-icon>${o.area_name??this._t("detect_no_area")}
        <span class="count">${i.devices.size} / ${t.length}</span>
        <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
      </summary>
      <div class="ltek-sub-body">
        <div class="ltek-row">
          <label class="lbl">${this._t("detect_room")}</label>
          <select @change=${m=>{let f=m.target.value,_=f.startsWith("new:")?[]:Object.keys(this.rooms[f]?.activities??{});this._setArea(e,{target:f,activities:new Set(_)})}}>
            ${c.map(m=>r`<option value=${m.value} ?selected=${m.value===i.target}>${m.label}</option>`)}
          </select>
          <label class="check">
            <input type="checkbox" .checked=${p} @change=${()=>this._setArea(e,{devices:p?new Set:new Set(t.map(m=>m.key))})} />
            ${this._t("detect_select_all")}
          </label>
        </div>
        ${d?r`<div class="ltek-row">
              <label class="lbl">${this._t("detect_activities")}</label>
              ${u.length?u.map(([m,f])=>r`<label class="check">
                    <input type="checkbox" .checked=${i.activities.has(m)} @change=${()=>{let _=new Set(i.activities);_.has(m)?_.delete(m):_.add(m),this._setArea(e,{activities:_})}} />${f.name??m}</label>`):r`<span class="ltek-hint">${this._t("detect_no_activities")}</span>`}
            </div>`:h}
        <div class="ltek-list">${t.map(m=>this._renderDevice(e,m))}</div>
      </div>
    </details>`}_renderDevice(e,t){let i=this._areas.get(e).devices.has(t.key);return r`<label class="ltek-item ${i?"open":""}">
      <input type="checkbox" .checked=${i} @change=${()=>this._toggleDevice(e,t.key)} />
      <ha-icon class="lead" icon="mdi:television"></ha-icon>
      <span class="ltek-item-text">
        <span class="ltek-name">${t.name}</span>
        <span class="ltek-subline">${t.entity_id}</span>
        <span class="chips">
          <button
            class="chip profile"
            title=${this._t("detect_open_profile")}
            @click=${s=>{s.preventDefault(),this.dispatchEvent(new CustomEvent("open-profile",{detail:{id:t.profile}}))}}
          >
            <ha-icon icon="mdi:package-variant-closed"></ha-icon>${t.profile_name}
          </button>
          ${t.integrations.map(s=>r`<span class="chip ${s===t.integration?"used":""}" title=${s===t.integration?this._t("detect_used_integration"):""}>${s}</span>`)}
          ${t.picture?r`<span class="chip picture">${this._t("detect_picture")}</span>`:h}
        </span>
      </span>
      <span class="chip order ${t.order}">${this._t(`order.${t.order}`)}</span>
    </label>`}};oe.properties={hass:{attribute:!1},rooms:{attribute:!1},_result:{state:!0},_areas:{state:!0},_ticked:{state:!0},_starter:{state:!0},_error:{state:!0}},oe.styles=[k,x,$,b`
      :host {
        display: block;
      }
      .bar {
        margin-top: var(--ltek-sp-4);
      }
      .ltek-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--ltek-sp-1);
      }
      label.ltek-item {
        cursor: pointer;
      }
      .ltek-item {
        align-items: flex-start;
      }
      details.area {
        margin-bottom: var(--ltek-sp-2);
      }
      details.area .count {
        margin-left: var(--ltek-sp-2);
        color: var(--ltek-c-muted);
        font-weight: var(--ltek-fw-normal);
        text-transform: none;
        letter-spacing: 0;
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: var(--ltek-sp-1);
        margin-top: var(--ltek-sp-1);
      }
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 8px;
        border-radius: 10px;
        border: 1px solid var(--ltek-c-border);
        background: var(--ltek-c-surface-raised);
        color: var(--ltek-c-label);
        font: inherit;
        font-size: var(--ltek-fs-small);
        line-height: 1.4;
        white-space: nowrap;
        --mdc-icon-size: 14px;
      }
      .chip.used {
        border-color: var(--ltek-c-accent);
        color: var(--ltek-c-accent);
        background: var(--ltek-c-accent-fade);
      }
      button.chip.profile {
        cursor: pointer;
        border-color: var(--ltek-c-accent-lib);
        color: var(--ltek-c-accent-lib);
        background: color-mix(in srgb, var(--ltek-c-accent-lib) 12%, transparent);
      }
      button.chip.profile:hover {
        background: color-mix(in srgb, var(--ltek-c-accent-lib) 24%, transparent);
      }
      .chip.picture {
        border-color: var(--ltek-c-info);
        color: var(--ltek-c-info);
      }
      /* Power-on order: a colour each, so they read at a glance */
      .chip.order {
        flex: none;
        font-weight: var(--ltek-fw-semibold);
        color: var(--ltek-c-on-accent);
        border: none;
      }
      .chip.order.early {
        background: var(--ltek-c-warning);
        color: #212121;
      }
      .chip.order.middle {
        background: var(--ltek-c-info);
      }
      .chip.order.late {
        background: var(--ltek-c-success);
      }
      .ltek-item input[type="checkbox"],
      label.check input {
        accent-color: var(--ltek-c-accent);
      }
      label.check {
        display: inline-flex;
        align-items: center;
        gap: var(--ltek-sp-1);
        color: var(--ltek-c-label);
        font-size: var(--ltek-fs-body);
        margin-right: var(--ltek-sp-3);
      }
      .ltek-row select {
        flex: 0 1 260px;
      }
      .ok {
        color: var(--ltek-c-success);
      }
    `];customElements.get("easy-av-control-detect")||customElements.define("easy-av-control-detect",oe);var Kt="https://github.com/Ltek/easy-av-control#readme",Ft={en:{title:"Guide",close:"Close",steps_title:"How it works",steps:[r`<b>Add the devices</b> of the room under <i>Devices</i>: pick each device's entity. If it hangs on a
        switchable outlet, enter it under <i>Power Outlet</i>. If it loses its connection without power (Apple TV), use
        the recommended button under <i>Connection check</i>.`,r`<b>Put together activities</b> under <i>Activities</i>: choose the devices in the order they are
        switched on, and under <i>Actions after start</i> for example the TV's input. Quick-select buttons start apps.`,r`<b>Save and add the card:</b> save at the top right. On a dashboard, add a card, search for
        <i>Easy AV Control Remote</i> and choose the room.`],terms_title:"Terms",terms:[["Outlet","Switch that powers the device. Switched on first and off last; outlets shared by several devices stay on while one of them is needed."],["Boot time","Wait after the outlet came on, before the device is switched on. Only when the outlet was off."],["Waiting times","After switching on: until the device accepts commands. After switching off: cool-down, e.g. for a projector lamp."],["Connection check","Waits until the device is reachable in Home Assistant, at the start and before remote buttons; can reload its integration until it connects."],["Checks","What must be right before the activity counts as running, e.g. a picture on the Lumagen and the projector."],["Actions after start","Run once all devices are on and the checks passed: input, volume, sound mode, any action."],["Remote control","Which device gets volume, channels, playback and arrow keys. Automatic: volume to the first media player, the rest to the last."],["Quick select","Buttons that switch a media player to a source, on an Apple TV to an app."],["Settings in the card","On a device: source, sound mode and entities such as tone controls, changeable in the card in every activity that uses it; automatic or chosen with favourites. An activity can choose its own."]],example_title:"Example: TV and Apple TV",example:[r`Device <i>TV</i>: entity <code>media_player.tv</code>, outlet <code>switch.tv_outlet</code>, boot time
        15 s, wait after switching on 10 s.`,r`Device <i>Apple TV</i>: entity <code>media_player.apple_tv</code>, under <i>Connection check</i> the
        button <i>Use remote.apple_tv for the connection check and the arrow keys</i>.`,r`Activity <i>Apple TV</i>: devices TV, then Apple TV; action after start <i>Set source</i> on the TV to its
        HDMI input; quick select Apple TV with Netflix.`,r`Save, add the card, start the activity.`],docs:r`All options and the YAML reference: <a href=${Kt} target="_blank" rel="noreferrer">documentation on GitHub</a>.`},de:{title:"Anleitung",close:"Schlie\xDFen",steps_title:"So geht's",steps:[r`<b>Geräte anlegen</b> unter <i>Geräte</i>: Für jedes Gerät die Entität wählen. Hängt es an einer
        schaltbaren Steckdose, diese unter <i>Steckdose</i> eintragen. Verliert es ohne Strom die Verbindung (Apple
        TV), unter <i>Verbindung prüfen</i> den empfohlenen Knopf nutzen.`,r`<b>Aktivitäten zusammenstellen</b> unter <i>Aktivitäten</i>: die Geräte in Einschaltreihenfolge wählen,
        unter <i>Aktionen nach dem Start</i> zum Beispiel den Eingang des TV. Schnellwahl-Tasten starten Apps.`,r`<b>Speichern und Card einfügen:</b> oben rechts speichern. Im Dashboard eine Karte hinzufügen,
        <i>Easy AV Control Remote</i> suchen und den Raum wählen.`],terms_title:"Begriffe",terms:[["Steckdose","Schalter, an dem das Ger\xE4t h\xE4ngt. Wird zuerst ein- und zuletzt ausgeschaltet; gemeinsame Steckdosen mehrerer Ger\xE4te bleiben an, solange eines davon gebraucht wird."],["Startzeit","Wartezeit nach dem Einschalten der Steckdose, bevor das Ger\xE4t eingeschaltet wird. Nur wenn die Steckdose aus war."],["Wartezeiten","Nach dem Einschalten: bis das Ger\xE4t Befehle annimmt. Nach dem Ausschalten: Abk\xFChlzeit, z. B. f\xFCr eine Beamer-Lampe."],["Verbindung pr\xFCfen","Wartet, bis das Ger\xE4t in Home Assistant erreichbar ist, beim Start und vor Tasten der Fernbedienung; kann seine Integration neu laden, bis sie verbunden ist."],["Pr\xFCfungen","Was stimmen muss, bevor die Aktivit\xE4t als laufend gilt, z. B. ein Bild am Lumagen und am Projektor."],["Aktionen nach dem Start","Laufen, sobald alle Ger\xE4te an sind und die Pr\xFCfungen bestanden: Eingang, Lautst\xE4rke, Klangmodus, beliebige Aktion."],["Fernbedienung","Welches Ger\xE4t Lautst\xE4rke, Sender, Wiedergabe und Pfeiltasten bekommt. Automatisch: Lautst\xE4rke an den ersten Mediaplayer, der Rest an den letzten."],["Schnellwahl","Tasten, die einen Mediaplayer auf eine Quelle schalten, beim Apple TV auf eine App."],["Einstellungen in der Karte","Am Ger\xE4t: Quelle, Klangmodus und Entit\xE4ten wie Klangregler, in der Karte \xE4nderbar in jeder Aktivit\xE4t, die es nutzt; automatisch oder ausgew\xE4hlt mit Favoriten. Eine Aktivit\xE4t kann eigene w\xE4hlen."]],example_title:"Beispiel: TV und Apple TV",example:[r`Gerät <i>TV</i>: Entität <code>media_player.tv</code>, Steckdose <code>switch.steckdose_tv</code>,
        Startzeit 15 s, Warten nach Einschalten 10 s.`,r`Gerät <i>Apple TV</i>: Entität <code>media_player.apple_tv</code>, unter <i>Verbindung prüfen</i> der
        Knopf <i>remote.apple_tv für Verbindungsprüfung und Pfeiltasten nutzen</i>.`,r`Aktivität <i>Apple TV</i>: Geräte TV, dann Apple TV; Aktion nach dem Start <i>Quelle wählen</i> am TV auf
        den HDMI-Eingang; Schnellwahl Apple TV mit Netflix.`,r`Speichern, Card einfügen, Aktivität starten.`],docs:r`Alle Optionen und die YAML-Referenz: <a href=${Kt} target="_blank" rel="noreferrer">Dokumentation auf GitHub</a>.`}},re=class extends v{render(){let n=(this.language??"en").split("-")[0],e=Ft[n]??Ft.en;return r`<div class="page">
      <div class="head">
        <h2><ha-icon icon="mdi:help-circle-outline"></ha-icon>${e.title}</h2>
        <button class="ltek-btn" @click=${()=>this.dispatchEvent(new CustomEvent("close"))}>
          <ha-icon icon="mdi:close"></ha-icon> ${e.close}
        </button>
      </div>
      <div class="body">
        <h3>${e.steps_title}</h3>
        <ol>
          ${e.steps.map(t=>r`<li>${t}</li>`)}
        </ol>
        <h3>${e.terms_title}</h3>
        <dl>
          ${e.terms.map(([t,i])=>r`<dt>${t}</dt><dd>${i}</dd>`)}
        </dl>
        <h3>${e.example_title}</h3>
        <ol>
          ${e.example.map(t=>r`<li>${t}</li>`)}
        </ol>
        <p>${e.docs}</p>
      </div>
    </div>`}};re.properties={language:{}},re.styles=[k,x,$,b`
    :host {
      display: block;
      margin-bottom: 16px;
      font-size: var(--ltek-fs-label);
    }
    .page {
      border: 1px solid var(--ltek-c-accent);
      border-radius: var(--ltek-r-panel);
      background: var(--ltek-c-surface);
    }
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ltek-sp-3);
      padding: var(--ltek-sp-5) var(--ltek-sp-6);
    }
    h2 {
      display: flex;
      align-items: center;
      gap: var(--ltek-sp-3);
      margin: 0;
      font-size: var(--ltek-fs-panel-title);
      font-weight: var(--ltek-fw-semibold);
      --mdc-icon-size: var(--ltek-icon-lg);
    }
    h2 ha-icon {
      color: var(--ltek-c-accent);
    }
    .head .ltek-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--ltek-sp-1);
      --mdc-icon-size: 16px;
    }
    .body {
      padding: 0 var(--ltek-sp-6) var(--ltek-sp-6);
      line-height: 1.5;
    }
    h3 {
      color: var(--accent-color, var(--ltek-c-accent));
      font-size: var(--ltek-fs-group);
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
      font-size: var(--ltek-fs-body);
      overflow-wrap: anywhere;
    }
    a {
      color: var(--primary-color);
    }
  `];customElements.get("easy-av-control-guide")||customElements.define("easy-av-control-guide",re);var Xe=["status","time","both","none"],et=["warn","stop","retry"],ze=["profile","state_source","wait_on","wait_off","timeout_on","timeout_off","debounce","on_failure"];function Ut(a){let n=a?.profile?.data??{};return{timeout_on:n.timeouts?.on??120,timeout_off:n.timeouts?.off??300,debounce:n.debounce??2}}function Qe(a,n){let e=a.on_failure;return e&&typeof e=="object"?e[n]??"warn":e??"warn"}function qt(a,n){let e=Ut(n),t=a.state_source;return{profile:a.profile??"__auto",state_source:t==="none"?"none":t&&typeof t=="object"?"custom":"auto",wait_on:a.wait_on??"status",wait_off:a.wait_off??"status",timeout_on:a.timeout_on??e.timeout_on,timeout_off:a.timeout_off??e.timeout_off,debounce:a.debounce??e.debounce,on_failure_on:Qe(a,"turn_on"),on_failure_off:Qe(a,"turn_off"),on_failure_picture:Qe(a,"picture")}}function Zt(a,n,e){let t=Ut(e),i={...a};for(let c of ze)delete i[c];n.profile&&n.profile!=="__auto"&&(i.profile=n.profile),n.state_source==="none"?i.state_source="none":n.state_source==="custom"&&(i.state_source=a.state_source??{}),n.wait_on&&n.wait_on!=="status"&&(i.wait_on=n.wait_on),n.wait_off&&n.wait_off!=="status"&&(i.wait_off=n.wait_off),n.timeout_on!==void 0&&Number(n.timeout_on)!==t.timeout_on&&(i.timeout_on=Number(n.timeout_on)),n.timeout_off!==void 0&&Number(n.timeout_off)!==t.timeout_off&&(i.timeout_off=Number(n.timeout_off)),n.debounce!==void 0&&Number(n.debounce)!==t.debounce&&(i.debounce=Number(n.debounce));let s=n.on_failure_on||"warn",o=n.on_failure_off||"warn",l=n.on_failure_picture||"warn";return s===o&&o===l?s!=="warn"&&(i.on_failure=s):i.on_failure={...s!=="warn"?{turn_on:s}:{},...o!=="warn"?{turn_off:o}:{},...l!=="warn"?{picture:l}:{}},i}function Yt(a,n){let e=n?.found;if(!e)return{};let t={};return e.remote_entity&&a.remote_entity!==e.remote_entity&&(t.remote_entity=e.remote_entity),e.power_switch&&!a.power_switch&&(t.power_switch=e.power_switch),t}function De(a){if(!a||typeof a!="object")return"";let n=a;return[n.domain,n.translation_key??n.unique_id_suffix??n.device_class].filter(Boolean).join(" \xB7 ")}function Jt(a,n){let e=a.data,t=[],i=e.indicator;if(i){let o=i.entity?De(i.entity):n("sum_indicator_device"),l=i.attribute?`${o} (${i.attribute})`:o;t.push(n("sum_indicator",{what:i.available_is_on?n("sum_indicator_available",{what:l}):l}));let c=["starting","on","stopping","off","error"].filter(d=>Array.isArray(i[d])&&i[d].length).map(d=>`${d}: ${i[d].join(" / ")}`);c.length&&t.push(n("sum_states",{groups:c.join(" \xB7 ")}))}e.remote&&t.push(`${n("sum_remote")}: ${De(e.remote)}`),e.power_switch&&t.push(`${n("sum_outlet")}: ${De(e.power_switch)}`),Array.isArray(e.settings)&&e.settings.length&&t.push(`${n("sum_settings")}: ${e.settings.map(De).join(", ")}`),e.picture&&t.push(`${n("sum_picture")}: ${e.picture.ok.join(" / ")}`),e.order&&t.push(n("sum_order",{order:n(`order.${e.order}`)}));let s=Object.entries(e.roles??{}).sort(([,o],[,l])=>o-l).map(([o])=>n(`role.${o}`));return s.length&&t.push(n("sum_roles",{roles:s.join(", ")})),t}var Mi=new Set(["unavailable","unknown",""]);function Qt(a,n){let e={},t=(s,o)=>{o===void 0||Mi.has(o)||(e[s]??=[]).includes(o)||e[s].push(o)},i={};a.length&&(a.length>1&&t("off",a[0]),a.slice(1,-1).forEach(s=>t("starting",s)),t("on",a[a.length-1]),a[0]==="unavailable"&&(i.available_is_on=!0)),n.length&&(n.length>1&&t("on",n[0]),n.slice(1,-1).forEach(s=>t("stopping",s)),t("off",n[n.length-1]),n[n.length-1]==="unavailable"&&(i.available_is_on=!0));for(let s of["starting","stopping"])e[s]=(e[s]??[]).filter(o=>!e.on?.includes(o)&&!e.off?.includes(o)),e[s].length||delete e[s];return{...i,...e}}function tt(a){let n=Math.round(a);return n>=60?`${Math.floor(n/60)}:${String(n%60).padStart(2,"0")}`:`${n} s`}function it(a,n){let e=n?.timings;if(!e||!n?.state)return{};let t={},i={on:n.state.timeout_on,off:n.state.timeout_off};for(let s of["on","off"]){let o=e[s]?.suggested;o&&o!==i[s]&&(t[s==="on"?"timeout_on":"timeout_off"]=o)}return t}var N={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Xt=a=>(...n)=>({_$litDirective$:a,values:n}),Ce=class{constructor(n){}get _$AU(){return this._$AM._$AU}_$AT(n,e,t){this._$Ct=n,this._$AM=e,this._$Ci=t}_$AS(n,e){return this.update(n,e)}update(n,e){return this.render(...e)}};var{I:Gn}=Bt;var ei=a=>a.strings===void 0;var Ii={},ti=(a,n=Ii)=>a._$AH=n;var T=Xt(class extends Ce{constructor(a){if(super(a),a.type!==N.PROPERTY&&a.type!==N.ATTRIBUTE&&a.type!==N.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ei(a))throw Error("`live` bindings can only contain a single expression")}render(a){return a}update(a,[n]){if(n===E||n===h)return n;let e=a.element,t=a.name;if(a.type===N.PROPERTY){if(n===e[t])return E}else if(a.type===N.BOOLEAN_ATTRIBUTE){if(!!n===e.hasAttribute(t))return E}else if(a.type===N.ATTRIBUTE&&e.getAttribute(t)===n+"")return E;return ti(a),n}});var ae=class extends v{constructor(){super(),this.data={},this.schema=[],this.disabled=!1}_set(n,e){let t={...this.data??{}};e===void 0||e===""?delete t[n]:t[n]=e,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t}}))}render(){return r`${(this.schema??[]).map(n=>this._field(n))}`}_field(n){let e=this.computeLabel?.(n)??n.name,t=this.computeHelper?.(n),[i,s]=Object.entries(n.selector??{})[0]??["text",{}],o=s??{},l=this.data?.[n.name],c=t?r`<div class="ltek-hint help">${t}</div>`:h;if(i==="boolean")return r`<label class="check">
          <input
            type="checkbox"
            .checked=${T(!!l)}
            ?disabled=${this.disabled}
            @change=${u=>this._set(n.name,u.target.checked)}
          />
          ${e}
        </label>
        ${c}`;if(i==="text")return r`<div class="ltek-row">
          <label class="lbl">${e}</label>
          <input
            type="text"
            .value=${T(l==null?"":String(l))}
            ?disabled=${this.disabled}
            @change=${u=>this._set(n.name,u.target.value)}
          />
        </div>
        ${c}`;if(i==="number"){let u=o.unit_of_measurement??"",p=f=>{let _=f.target.value;this._set(n.name,_===""?void 0:Number(_))},m=l==null?"":String(l);return o.mode==="slider"?r`<div class="ltek-row slider">
            <label class="lbl">${e}</label>
            <input
              type="range"
              min=${String(o.min??0)}
              max=${String(o.max??100)}
              step=${String(o.step??1)}
              .value=${T(m||String(o.min??0))}
              ?disabled=${this.disabled}
              @input=${p}
            />
            <span class="readout">${m===""?"\u2013":m}${u?r`<span class="unit">${u}</span>`:h}</span>
          </div>
          ${c}`:r`<div class="ltek-row">
          <label class="lbl">${e}</label>
          <input
            class="num"
            type="number"
            min=${String(o.min??"")}
            max=${String(o.max??"")}
            step=${String(o.step??1)}
            .value=${T(m)}
            ?disabled=${this.disabled}
            @change=${p}
          />
          ${u?r`<span class="unit">${u}</span>`:h}
        </div>
        ${c}`}if(i==="select"&&!o.multiple&&!o.custom_value){let u=(o.options??[]).map(m=>typeof m=="string"?{value:m,label:m}:m),p=l==null?"":String(l);return r`<div class="ltek-row">
          <label class="lbl">${e}</label>
          <select
            .value=${T(p)}
            ?disabled=${this.disabled}
            @change=${m=>this._set(n.name,m.target.value||void 0)}
          >
            ${n.required&&p?h:r`<option value="" ?selected=${!p}>–</option>`}
            ${u.map(m=>r`<option value=${m.value} ?selected=${m.value===p}>${m.label}</option>`)}
            ${p&&!u.some(m=>m.value===p)?r`<option value=${p} selected>${p}</option>`:h}
          </select>
        </div>
        ${c}`}return r`<div class="ltek-row ${i==="object"||i==="action"||i==="target"?"stack":"picker"}">
        <label class="lbl">${e}</label>
        <ha-selector
          .hass=${this.hass}
          .selector=${n.selector}
          .value=${l}
          .required=${!!n.required}
          .disabled=${this.disabled}
          @value-changed=${u=>{u.stopPropagation(),this._set(n.name,u.detail.value)}}
        ></ha-selector>
      </div>
      ${c}`}};ae.properties={hass:{attribute:!1},data:{attribute:!1},schema:{attribute:!1},computeLabel:{attribute:!1},computeHelper:{attribute:!1},disabled:{type:Boolean}},ae.styles=[k,x,$,b`
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
    `];customElements.get("ltek-form")||customElements.define("ltek-form",ae);var ii=["starting","on","stopping","off","error"],Ni=["power","navigation","now_playing","turn_off"],Hi=["early","middle","late"];function nt(a){let n={domain:a.domain};return a.translation_key?n.translation_key=a.translation_key:a.unique_id_suffix?n.unique_id_suffix=a.unique_id_suffix:a.device_class&&(n.device_class=a.device_class),n}function H(a,n){if(n)return a.filter(e=>e.domain===n.domain).filter(e=>!n.translation_key||e.translation_key===n.translation_key).filter(e=>!n.unique_id_suffix||(e.unique_id_suffix??"").endsWith(n.unique_id_suffix)).filter(e=>!n.device_class||e.device_class===n.device_class).sort((e,t)=>e.entity_id.localeCompare(t.entity_id))[0]}function Vi(a,n,e){let t=new Set(ii.filter(i=>i!==e).flatMap(i=>n[i]??[]));return a.filter(i=>!t.has(i))}function ni(a,n,e){let t={...a},[i,...s]=n;if(s.length){let l=ni(a[i]??{},s,e);return Object.keys(l).length?t[i]=l:delete t[i],t}return e===void 0||e===""||Array.isArray(e)&&!e.length||typeof e=="object"&&e!==null&&!Array.isArray(e)&&!Object.keys(e).length?delete t[i]:t[i]=e,t}var le=class extends v{constructor(){super();this._sampleKey="";this.readonly=!1,this._open="general"}_t(e,t){return S(this.hass?.language,e,t)}willUpdate(){let e=String(this.profile?.integration??""),t=`${e}|${this._deviceId??""}`;this.hass&&t!==this._sampleKey&&(this._sampleKey=t,this.hass.callWS({type:"easy_av_control/profiles/sample",integration:e,device_id:this._deviceId??null}).then(i=>{t===this._sampleKey&&(this._sample=i)}).catch(()=>{}))}_set(e,t){this.readonly||this.dispatchEvent(new CustomEvent("profile-changed",{detail:{profile:ni(this.profile,e,t)}}))}get _entities(){return this._sample?.entities??[]}_panel(e,t,i,s,o){return r`<details
      class="ltek-sec"
      .open=${this._open===e}
      @toggle=${l=>{let c=l.target.open;c&&this._open!==e?this._open=e:!c&&this._open===e&&(this._open="")}}
    >
      <summary><ha-icon icon=${t}></ha-icon>${i}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="ltek-body">${s?r`<p class="ltek-hint">${s}</p>`:h}<fieldset ?disabled=${this.readonly}>${o}</fieldset></div>
    </details>`}_text(e,t,i=""){let s=e.reduce((o,l)=>o?.[l],this.profile)??"";return r`<div class="ltek-row"><label class="lbl">${t}</label>
      <input type="text" .value=${String(s)} placeholder=${i}
        @change=${o=>this._set(e,o.target.value.trim())} /></div>`}_select(e,t,i,s=""){let o=String(e.reduce((l,c)=>l?.[c],this.profile)??s);return r`<div class="ltek-row"><label class="lbl">${t}</label>
      <select @change=${l=>this._set(e,l.target.value||void 0)}>
        ${i.map(([l,c])=>r`<option value=${l} ?selected=${l===o}>${c}</option>`)}
      </select></div>`}_slider(e,t,i,s,o,l){let c=e.reduce((u,p)=>u?.[p],this.profile),d=c===void 0?l:Number(c);return r`<div class="ltek-row nowrap"><label class="lbl">${t}</label>
      <input type="range" min=${i} max=${s} step=${o} .value=${String(d)}
        @input=${u=>u.target.nextElementSibling.textContent=this._secs(Number(u.target.value))}
        @change=${u=>{let p=Number(u.target.value);this._set(e,p===l?void 0:p)}} />
      <span class="ltek-val">${this._secs(d)}</span>
      ${c!==void 0&&!this.readonly?r`<button class="ltek-act" title=${this._t("pf.reset")} @click=${()=>this._set(e,void 0)}><ha-icon icon="mdi:restore"></ha-icon></button>`:h}</div>`}_secs(e){return e>=60&&e%60===0?`${e/60} min`:`${e} s`}_entityPicker(e,t,i,s=!0){let o=e.reduce((u,p)=>u?.[p],this.profile),l=H(this._entities,o),c=this._entities.filter(u=>!i||i.includes(u.domain)),d=u=>u?[u.domain,u.translation_key??u.unique_id_suffix??u.device_class].filter(Boolean).join(" \xB7 "):"";return r`<div class="ltek-row"><label class="lbl">${t}</label>
      <select @change=${u=>{let p=u.target.value,m=this._entities.find(f=>f.entity_id===p);this._set(e,m?nt(m):void 0)}}>
        ${s?r`<option value="" ?selected=${!o}>${this._t("pf.none")}</option>`:h}
        ${o&&!l?r`<option value="__keep" selected>${d(o)} (${this._t("pf.not_on_device")})</option>`:h}
        ${c.map(u=>r`<option value=${u.entity_id} ?selected=${l?.entity_id===u.entity_id}>${u.name} · ${u.entity_id}</option>`)}
      </select>
      ${o?r`<span class="ltek-badge">${d(o)}</span>`:h}</div>`}_chips(e,t,i){let s=e.reduce((l,c)=>l?.[c],this.profile)??[],o=l=>l&&!s.includes(l)&&this._set(e,[...s,l]);return r`<div class="ltek-row"><label class="lbl">${t}</label>
      <span class="chips">
        ${s.map(l=>r`<span class="chip on">${l}
          ${this.readonly?h:r`<button title=${this._t("delete")} @click=${()=>this._set(e,s.filter(c=>c!==l))}>×</button>`}</span>`)}
        ${this.readonly?h:r`${i.filter(l=>!s.includes(l)).map(l=>r`<button class="chip add" @click=${()=>o(l)}>+ ${l}</button>`)}
              <input class="chip-input" type="text" placeholder=${this._t("pf.other_value")}
                @change=${l=>{let c=l.target;o(c.value.trim()),c.value=""}} />`}
      </span></div>`}_general(){let e=[...new Set([String(this.profile.integration??""),...this._sample?.integrations??[]])].filter(Boolean),t=this._sample?.devices??[];return r`
      ${this._text(["name"],this._t("pf.name"))}
      ${this._text(["id"],this._t("pf.id"),"my_receiver")}
      ${this._select(["integration"],this._t("pf.integration"),e.map(i=>[i,i]))}
      ${t.length>1?r`<div class="ltek-row"><label class="lbl">${this._t("pf.example")}</label>
            <select @change=${i=>this._deviceId=i.target.value}>
              ${t.map(i=>r`<option value=${i.id} ?selected=${i.id===this._sample?.device_id}>${i.name}</option>`)}
            </select></div>`:h}
      ${this._entities.length?h:r`<p class="ltek-hint ltek-warn">${this._t("pf.no_example")}</p>`}
      ${this._entityPicker(["device_entity"],this._t("pf.device_entity"),["media_player","remote","switch"],!1)}
      ${this._select(["order"],this._t("pf.order"),Hi.map(i=>[i,this._t(`order.${i}`)]),"middle")}
    `}_status(){let e=this.profile.indicator??{},t=!e.entity,i=t?H(this._entities,this.profile.device_entity):H(this._entities,e.entity),s=e.attribute,o=s?i?.attributes[s]:i?.state,l=s?[o].filter(d=>d!==void 0).map(String):i?.values??[],c=Object.keys(i?.attributes??{});return r`
      ${this._entityPicker(["indicator","entity"],this._t("pf.status_entity"),null)}
      <p class="ltek-hint">${this._t(t?"pf.status_own":"pf.status_other")}</p>
      ${c.length?this._select(["indicator","attribute"],this._t("pf.attribute"),[["",this._t("pf.attribute_none")],...c.map(d=>[d,d])]):h}
      ${i?r`<p class="ltek-hint">${this._t("pf.now",{value:o===void 0?"\u2013":String(o)})}</p>`:h}
      <label class="check"><input type="checkbox" .checked=${!!e.available_is_on}
        @change=${d=>this._set(["indicator","available_is_on"],d.target.checked||void 0)} />
        ${this._t("pf.available_is_on")}</label>
      ${e.available_is_on?h:ii.map(d=>this._chips(["indicator",d],this._t(`pf.group.${d}`),Vi(l,e,d)))}
    `}_timing(){return r`
      ${this._slider(["timeouts","on"],this._t("pf.timeout_on"),5,600,5,120)}
      ${this._slider(["timeouts","off"],this._t("pf.timeout_off"),5,900,5,300)}
      ${this._slider(["debounce"],this._t("pf.debounce"),0,30,.5,2)}
    `}_companions(){let e=this.profile.settings??[],t=this._entities.filter(s=>["select","number","switch"].includes(s.domain)),i=new Set(e.map(s=>H(this._entities,s)?.entity_id).filter(Boolean));return r`
      ${this._entityPicker(["remote"],this._t("pf.remote"),["remote"])}
      ${this._entityPicker(["power_switch"],this._t("pf.power_switch"),["switch"])}
      <div class="ltek-group">${this._t("pf.settings")}</div>
      <p class="ltek-hint">${this._t("pf.settings_hint")}</p>
      ${t.map(s=>r`<label class="check"><input type="checkbox" .checked=${i.has(s.entity_id)}
        @change=${o=>{let l=o.target.checked,c=nt(s),d=e.filter(u=>H(this._entities,u)?.entity_id!==s.entity_id);this._set(["settings"],l?[...d,c]:d)}} />${s.name}</label>`)}
      ${e.filter(s=>!H(this._entities,s)).map(s=>r`<span class="ltek-badge">${s.domain} · ${s.translation_key??s.unique_id_suffix??""}</span>`)}
    `}_picture(){let e=this.profile.picture,t=H(this._entities,e?.entity);return r`
      <label class="check"><input type="checkbox" .checked=${!!e}
        @change=${i=>{let s=i.target.checked,o=this._entities.find(l=>l.domain==="sensor");this._set(["picture"],s?{entity:o?nt(o):{domain:"sensor"},ok:[]}:void 0)}} />${this._t("pf.picture_on")}</label>
      ${e?r`${this._entityPicker(["picture","entity"],this._t("pf.picture_entity"),null,!1)}
            ${this._chips(["picture","ok"],this._t("pf.picture_ok"),t?.values??[])}
            ${this._chips(["picture","fail"],this._t("pf.picture_fail"),t?.values??[])}
            ${this._slider(["picture","timeout"],this._t("pf.picture_timeout"),5,300,5,30)}
            ${this._slider(["picture","debounce"],this._t("pf.debounce"),0,30,.5,5)}`:h}
    `}_jobs(){let e=this.profile.roles??{};return r`${Ni.map(t=>r`<div class="ltek-row nowrap"><label class="ltek-check-inline">
        <input type="checkbox" .checked=${e[t]!==void 0}
          @change=${i=>this._set(["roles",t],i.target.checked?5:void 0)} />
        ${this._t(`role.${t}`)}</label>
        ${e[t]!==void 0?r`<input type="range" min="1" max="9" step="1" .value=${String(e[t])}
              @change=${i=>this._set(["roles",t],Number(i.target.value))} />
              <span class="ltek-val">${e[t]}</span>`:h}</div>`)}`}render(){return r`
      ${this._panel("general","mdi:information-outline",this._t("pf.general"),this._t("pf.general_hint"),this._general())}
      ${this._panel("status","mdi:state-machine",this._t("pf.status"),this._t("pf.status_hint"),this._status())}
      ${this._panel("timing","mdi:timer-sand",this._t("pf.timing"),this._t("pf.timing_hint"),this._timing())}
      ${this._panel("companions","mdi:remote",this._t("pf.companions"),this._t("pf.companions_hint"),this._companions())}
      ${this._panel("picture","mdi:image-check-outline",this._t("pf.picture"),this._t("pf.picture_hint"),this._picture())}
      ${this._panel("jobs","mdi:account-hard-hat-outline",this._t("pf.jobs"),this._t("pf.jobs_hint"),this._jobs())}
    `}};le.properties={hass:{attribute:!1},profile:{attribute:!1},readonly:{type:Boolean},_sample:{state:!0},_open:{state:!0},_deviceId:{state:!0}},le.styles=[k,x,$,b`
      :host {
        display: block;
      }
      fieldset {
        border: none;
        margin: 0;
        padding: 0;
        min-width: 0;
      }
      .ltek-row input[type="text"],
      .ltek-row select {
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
      .ltek-row.nowrap {
        flex-wrap: nowrap;
      }
      .ltek-row input[type="range"] {
        flex: 1 1 auto;
        min-width: 100px;
        accent-color: var(--ltek-c-accent);
      }
      .ltek-val {
        flex: 0 0 var(--ltek-slider-val-w);
        text-align: right;
        font-weight: var(--ltek-fw-bold);
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
        font-size: var(--ltek-fs-body);
      }
      label.check,
      label.ltek-check-inline {
        display: inline-flex;
        align-items: center;
        gap: var(--ltek-sp-2);
        color: var(--ltek-c-label);
        font-size: var(--ltek-fs-body);
        padding: var(--ltek-sp-1) var(--ltek-sp-3) var(--ltek-sp-1) 0;
        flex: none;
      }
      label.check input,
      label.ltek-check-inline input {
        accent-color: var(--ltek-c-accent);
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: var(--ltek-sp-1);
        flex: 1 1 auto;
        min-width: 0;
      }
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 8px;
        border-radius: 10px;
        border: 1px solid var(--ltek-c-border);
        background: var(--ltek-c-surface-raised);
        color: var(--ltek-c-label);
        font: inherit;
        font-size: var(--ltek-fs-small);
      }
      .chip.on {
        border-color: var(--ltek-c-accent);
        color: var(--ltek-c-accent);
        background: var(--ltek-c-accent-fade);
      }
      .chip.on button {
        border: none;
        background: none;
        color: inherit;
        cursor: pointer;
        padding: 0 0 0 2px;
        font-size: 14px;
        line-height: 1;
      }
      button.chip.add {
        cursor: pointer;
        border-style: dashed;
      }
      button.chip.add:hover {
        border-color: var(--ltek-c-accent);
        color: var(--ltek-c-accent);
      }
      input.chip-input {
        flex: 0 1 120px;
        padding: 2px 8px;
        border-radius: 10px;
        border: 1px solid var(--ltek-c-border);
        background: transparent;
        color: var(--ltek-c-text);
        font: inherit;
        font-size: var(--ltek-fs-small);
      }
    `];customElements.get("easy-av-control-profile-form")||customElements.define("easy-av-control-profile-form",le);var ce=class extends v{constructor(){super(),this.profiles=[],this._yaml=!1}_t(n,e){return S(this.hass?.language,n,e)}_changed(){this.dispatchEvent(new CustomEvent("profiles-changed"))}updated(n){if(n.has("focusProfile")&&this.focusProfile){let t=this.focusProfile;this._editing=void 0,this._preview=t,this.dispatchEvent(new CustomEvent("focus-shown")),this.updateComplete.then(()=>this.shadowRoot?.querySelector(`[data-profile="${CSS.escape(t)}"]`)?.scrollIntoView({block:"center"}))}if(n.has("draftFor")&&this.draftFor){let t=this.draftFor;this.dispatchEvent(new CustomEvent("draft-opened")),this._draft(t)}let e=this._editing?.learn;if(n.has("hass")&&e?.mode){let t=this.hass.states[e.watch]?.state,i=e[e.mode];t!==void 0&&i[i.length-1]!==t&&(this._editing={...this._editing,learn:{...e,[e.mode]:[...i,t]}})}}async _openPicker(){let n=await this.hass.callWS({type:"easy_av_control/config/detect_all",rooms:{}});this._pick=n.unmatched}async _draft(n){this._pick=void 0;try{let e=await this.hass.callWS({type:"easy_av_control/profiles/draft",integration:n});this._notice=void 0,this._editing={data:e.profile,previousId:null,readonly:!1,learn:{watch:e.watch,device:e.device_entity,on:[],off:[],mode:null}}}catch(e){this._notice=e.message??String(e)}}async _learn(n){let e=this._editing.learn,t=this.hass.states[e.watch]?.state;this._editing={...this._editing,learn:{...e,mode:n,[n]:t!==void 0?[t]:[]}},await this.hass.callService("homeassistant",n==="on"?"turn_on":"turn_off",{entity_id:e.device})}_useLearned(){let n=this._editing,e=Qt(n.learn.on,n.learn.off),t={...n.data.indicator??{},...e};this._editing={...n,data:{...n.data,indicator:t},learn:{...n.learn,mode:null}}}_renderLearn(n){let e=t=>t.length?t.join(" \u2192 "):"\u2013";return r`<details class="ltek-sec" open>
      <summary><ha-icon icon="mdi:school-outline"></ha-icon>${this._t("learn")}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="ltek-body">
        <p class="ltek-hint">${this._t("learn_hint",{entity:n.watch})}</p>
        <div class="ltek-buttons">
          <button class="ltek-btn ${n.mode==="on"?"primary":""}" @click=${()=>this._learn("on")}>
            <ha-icon icon="mdi:power"></ha-icon> ${this._t("learn_on")}
          </button>
          <button class="ltek-btn ${n.mode==="off"?"primary":""}" @click=${()=>this._learn("off")}>
            <ha-icon icon="mdi:power-off"></ha-icon> ${this._t("learn_off")}
          </button>
          <button class="ltek-btn" ?disabled=${!n.on.length&&!n.off.length} @click=${this._useLearned}>
            ${this._t("learn_use")}
          </button>
        </div>
        ${n.on.length||n.off.length?r`<p class="ltek-hint">${this._t("learn_seen_on",{states:e(n.on)})}<br />
              ${this._t("learn_seen_off",{states:e(n.off)})}</p>`:r`<p class="ltek-hint">${this._t("learn_nothing")}</p>`}
      </div>
    </details>`}render(){if(this._editing)return this._renderEditor(this._editing);let n=this.profiles.filter(t=>t.source==="builtin"),e=this.profiles.filter(t=>t.source==="user");return r`
      <p class="ltek-hint">${this._t("profiles_intro")}</p>
      ${this._notice?r`<p class="ltek-hint ok">${this._notice}</p>`:h}
      <details class="ltek-sec" open>
        <summary>
          <ha-icon icon="mdi:account-cog-outline"></ha-icon>${this._t("profiles_yours")}
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="ltek-body">
          <div class="ltek-buttons bar">
            <button class="ltek-add" @click=${this._openPicker}>${this._t("profile_new")}</button>
            <button class="ltek-btn" @click=${this._openImport}><ha-icon icon="mdi:import"></ha-icon> ${this._t("profile_import")}</button>
            ${e.length?r`<button class="ltek-btn" @click=${()=>this._openExport(e.map(t=>t.id))}>
                  <ha-icon icon="mdi:export"></ha-icon> ${this._t("profile_export_all")}
                </button>`:h}
          </div>
          ${this._pick?r`<div class="ltek-row pick">
                <label class="lbl">${this._t("profile_new_pick")}</label>
                ${this._pick.length?r`<select @change=${t=>{let i=t.target.value;i&&this._draft(i)}}>
                      <option value="">–</option>
                      ${this._pick.map(t=>r`<option value=${t}>${t}</option>`)}
                    </select>`:h}
                <span class="ltek-hint">${this._t(this._pick.length?"profile_new_hint":"profile_new_none")}</span>
              </div>`:h}
          <div class="ltek-list">
            ${e.length?e.map(t=>this._row(t)):r`<p class="ltek-hint">${this._t("profiles_none_yours")}</p>`}
          </div>
        </div>
      </details>
      <details class="ltek-sec" open>
        <summary>
          <ha-icon icon="mdi:package-variant-closed"></ha-icon>${this._t("profiles_builtin")}
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="ltek-body"><div class="ltek-list">${n.map(t=>this._row(t))}</div></div>
      </details>
      <details class="ltek-sec">
        <summary>
          <ha-icon icon="mdi:share-variant-outline"></ha-icon>${this._t("profile_share")}
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="ltek-body">
          <p class="ltek-hint">${this._t("profile_share_hint")}</p>
        </div>
      </details>
      ${this._renderDialog()}
    `}_row(n){let e=n.source==="builtin",t=this._preview===n.id,i=n.generic?this._t("profile_generic"):n.used_by?.length?this._t("profile_used_by",{where:n.used_by.join(", ")}):this._t("profile_unused");return r`<div class="ltek-item ${t?"open":""}" data-profile=${n.id}>
        <ha-icon class="lead" icon=${e?"mdi:lock-outline":"mdi:account-cog-outline"}></ha-icon>
        <span class="ltek-item-text">
          <span class="ltek-name">${n.name}</span>
          <span class="ltek-subline">${n.integration==="*"?"":`${n.integration} \xB7 `}${i}</span>
        </span>
        ${n.tested?h:r`<span class="ltek-badge warn" title=${this._t("profile_untested")}>!</span>`}
        <button class="ltek-act ${t?"on":""}" title=${this._t("profile_preview")} @click=${()=>this._preview=t?void 0:n.id}>
          <ha-icon icon=${t?"mdi:eye-off-outline":"mdi:eye-outline"}></ha-icon>
        </button>
        <button class="ltek-act" title=${this._t(e?"profile_view":"profile_edit")} @click=${()=>this._edit(n)}>
          <ha-icon icon="mdi:pencil"></ha-icon>
        </button>
        <button class="ltek-act" title=${this._t("profile_duplicate")} @click=${()=>this._duplicate(n.id)}>
          <ha-icon icon="mdi:content-copy"></ha-icon>
        </button>
        <button class="ltek-act" title=${this._t("profile_export")} @click=${()=>this._openExport([n.id])}>
          <ha-icon icon="mdi:export"></ha-icon>
        </button>
        ${e?h:r`<button class="ltek-del" title=${this._t("delete")} @click=${()=>this._delete(n)}>
              <ha-icon icon="mdi:trash-can-outline"></ha-icon>
            </button>`}
      </div>
      ${t?r`<div class="preview">${Jt(n,(s,o)=>this._t(s,o)).map(s=>r`<div>${s}</div>`)}</div>`:h}`}_edit(n){this._notice=void 0,this._editing={data:n.data,previousId:n.source==="user"?n.id:null,readonly:n.source==="builtin"}}async _duplicate(n){let e=await this.hass.callWS({type:"easy_av_control/profiles/duplicate",profile_id:n});this._notice=void 0,this._editing={data:e,previousId:null,readonly:!1}}async _delete(n){window.confirm(this._t("profile_delete_confirm",{name:n.name}))&&(await this.hass.callWS({type:"easy_av_control/profiles/delete",profile_id:n.id}),this._changed())}async _save(){let n=this._editing,e=await this.hass.callWS({type:"easy_av_control/profiles/save",profile:n.data,previous_id:n.previousId});if(e.error){this._editing={...n,error:e.error.message};return}this._editing=void 0,this._notice=this._t("profile_saved"),this._changed()}_renderEditor(n){return r`
      <div class="ltek-buttons bar">
        <button class="ltek-btn" @click=${()=>this._editing=void 0}>
          <ha-icon icon="mdi:arrow-left"></ha-icon> ${this._t(n.readonly?"profile_close":"profile_cancel")}
        </button>
        ${n.readonly?h:r`<button class="ltek-btn primary" @click=${this._save}>${this._t("profile_save")}</button>`}
      </div>
      <h2 class="title">
        <ha-icon icon=${n.readonly?"mdi:lock-outline":"mdi:pencil"}></ha-icon>${String(n.data.name??n.data.id)}
        <span class="mode">
          <button class="ltek-btn ${this._yaml?"":"primary"}" @click=${()=>this._yaml=!1}>${this._t("pf.form")}</button>
          <button class="ltek-btn ${this._yaml?"primary":""}" @click=${()=>this._yaml=!0}>YAML</button>
        </span>
      </h2>
      <p class="ltek-hint">${this._t(n.readonly?"profile_readonly":this._yaml?"profile_editor_hint":"pf.form_hint")}</p>
      ${n.error?r`<p class="ltek-error">${n.error}</p>`:h}
      ${n.learn&&!n.readonly?this._renderLearn(n.learn):h}
      ${this._yaml?r`<details class="ltek-sec" open>
            <summary><ha-icon icon="mdi:code-braces"></ha-icon>YAML<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
            <div class="ltek-body">
              <ltek-form
                .hass=${this.hass}
                .data=${{yaml:n.data}}
                .schema=${[{name:"yaml",selector:{object:{}}}]}
                .disabled=${n.readonly}
                .computeLabel=${()=>""}
                @value-changed=${e=>{if(n.readonly)return;let t=e.detail.value.yaml;t&&typeof t=="object"&&(this._editing={...n,data:t,error:void 0})}}
              ></ltek-form>
            </div>
          </details>`:r`<easy-av-control-profile-form
            .hass=${this.hass}
            .profile=${n.data}
            ?readonly=${n.readonly}
            @profile-changed=${e=>this._editing={...this._editing,data:e.detail.profile,error:void 0}}
          ></easy-av-control-profile-form>`}
    `}async _openExport(n){let e=await this.hass.callWS({type:"easy_av_control/profiles/export",ids:n});this._dialog={mode:"export",text:JSON.stringify(e,null,2)},await this.updateComplete,this._showDialog()}async _openImport(){this._dialog={mode:"import",text:""},await this.updateComplete,this._showDialog()}_showDialog(){let n=this.shadowRoot?.querySelector("dialog");n&&!n.open&&n.showModal()}_closeDialog(){this.shadowRoot?.querySelector("dialog")?.close(),this._dialog=void 0}async _copy(n){let e=n.currentTarget,t=this.shadowRoot.querySelector("textarea");t.select();let i=!1;try{i=document.execCommand("copy")}catch{i=!1}if(!i)try{await navigator.clipboard.writeText(t.value),i=!0}catch{i=!1}e.textContent=this._t(i?"profile_copied":"profile_copy_failed")}async _paste(){try{let n=await navigator.clipboard.readText();this._dialog={...this._dialog,text:n}}catch{this._dialog={...this._dialog,message:this._t("profile_paste_failed")}}}async _import(){let n;try{n=JSON.parse(this._dialog.text)}catch(i){this._dialog={...this._dialog,message:String(i)};return}let e=await this.hass.callWS({type:"easy_av_control/profiles/import",export:n});if(e.error){this._dialog={...this._dialog,message:e.error.message};return}let t=[this._t("profile_import_done",{added:(e.added??[]).join(", ")||"\u2013"})];for(let[i,s]of Object.entries(e.renamed??{}))t.push(this._t("profile_import_renamed",{from:i,to:s}));Object.keys(e.invalid??{}).length&&t.push(this._t("profile_import_invalid",{ids:Object.keys(e.invalid).join(", ")})),this._closeDialog(),this._notice=t.join(" \xB7 "),this._changed()}_renderDialog(){let n=this._dialog;if(!n)return h;let e=n.mode==="export";return r`<dialog @cancel=${this._closeDialog} @click=${t=>t.target===t.currentTarget&&this._closeDialog()}>
      <div class="dialog-body">
        <div class="ltek-group first">${this._t(e?"profile_export":"profile_import")}</div>
        ${e?h:r`<p class="ltek-hint">${this._t("profile_import_hint")}</p>`}
        <textarea
          class="ltek-text"
          rows="16"
          .value=${n.text}
          ?readonly=${e}
          @input=${t=>this._dialog={...n,text:t.target.value}}
        ></textarea>
        ${n.message?r`<p class="ltek-hint ltek-warn">${n.message}</p>`:h}
        <div class="ltek-buttons">
          ${e?r`<button class="ltek-btn primary" @click=${this._copy}>${this._t("profile_copy")}</button>`:r`<button class="ltek-btn" @click=${this._paste}>${this._t("profile_paste")}</button>
                <button class="ltek-btn primary" ?disabled=${!n.text.trim()} @click=${this._import}>${this._t("profile_import")}</button>`}
          <button class="ltek-btn" @click=${this._closeDialog}>${this._t("profile_close")}</button>
        </div>
      </div>
    </dialog>`}};ce.properties={hass:{attribute:!1},profiles:{attribute:!1},_preview:{state:!0},_editing:{state:!0},_dialog:{state:!0},_notice:{state:!0},_pick:{state:!0},_yaml:{state:!0},draftFor:{attribute:!1},focusProfile:{attribute:!1}},ce.styles=[k,x,$,b`
      :host {
        display: block;
      }
      .bar {
        margin-bottom: var(--ltek-sp-4);
      }
      .ltek-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--ltek-sp-1);
      }
      h2.title {
        display: flex;
        align-items: center;
        gap: var(--ltek-sp-3);
        font-size: var(--ltek-fs-panel-title);
        font-weight: var(--ltek-fw-bold);
        margin: var(--ltek-sp-2) 0;
        --mdc-icon-size: var(--ltek-icon-lg);
      }
      h2.title > ha-icon {
        color: var(--ltek-c-accent);
      }
      h2.title .mode {
        margin-left: auto;
        display: inline-flex;
        gap: var(--ltek-sp-1);
      }
      .preview {
        margin: calc(-1 * var(--ltek-sp-1)) 0 var(--ltek-sp-2) 34px;
        color: var(--ltek-c-label);
        font-size: var(--ltek-fs-small);
        line-height: 1.5;
      }
      .ok {
        color: var(--ltek-c-success);
      }
      dialog {
        border: 1px solid var(--ltek-c-accent);
        border-radius: var(--ltek-r-panel);
        background: var(--card-background-color, #1c1c1c);
        color: var(--ltek-c-text);
        padding: 0;
        width: min(640px, 92vw);
      }
      dialog::backdrop {
        background: rgba(0, 0, 0, 0.55);
      }
      .dialog-body {
        display: flex;
        flex-direction: column;
        gap: var(--ltek-sp-3);
        padding: 16px;
      }
      textarea.ltek-text {
        font-family: var(--code-font-family, monospace);
        font-size: var(--ltek-fs-small);
        resize: vertical;
      }
    `];customElements.get("easy-av-control-profiles")||customElements.define("easy-av-control-profiles",ce);function de(a){let n=a.filter(s=>s.ok).map(s=>s.seconds),e=[...n].sort((s,o)=>s-o),t=e.length>>1,i=e.length?e.length%2?e[t]:(e[t-1]+e[t])/2:null;return{count:a.length,typical:i===null?null:Math.round(i*10)/10,fastest:e.length?e[0]:null,slowest:e.length?e[e.length-1]:null,last:n.length?n[n.length-1]:null,spread:e.length?Math.round((e[e.length-1]-e[0])*10)/10:null,failed:a.length-n.length}}function si(a){let n=new Map;for(let e of a){let t=[e.room,e.activity,e.mode,e.mode==="start"?e.from??"":""].join("|");n.set(t,[...n.get(t)??[],e])}return[...n.entries()].map(([e,t])=>({key:e,runs:t}))}var st=a=>a.result==="ok"||a.result==="warning";function P(a){if(a==null||!Number.isFinite(a))return"\u2013";if(a<60)return`${Math.round(a*10)/10} s`;let n=Math.round(a);return`${Math.floor(n/60)}:${String(n%60).padStart(2,"0")}`}function ot(a,n){if(!n||n<=0)return"";let e=Math.round((a-n)/n*100);return Math.abs(e)<10?"":`${e>0?"+":""}${e} %`}var ue=a=>a[a.length-1],Bi={ok:"ok",warning:"warn",error:"err",cancelled:""},pe=class extends v{constructor(){super(),this._open="runs",this._expanded=new Set,this._mode="all"}connectedCallback(){super.connectedCallback(),this._load()}async _load(){try{this._history=await this.hass.callWS({type:"easy_av_control/history/get"}),this._failed=void 0}catch(n){this._failed=n.message??String(n)}}async _export(n){let e=await this.hass.callWS({type:"easy_av_control/history/export",...n?{run:n}:{}}),t=JSON.stringify(e,null,2),i=new Date().toISOString().replace(/[-:]/g,"").slice(0,13),s=`easy-av-control-report-${n?`run-${n.split("-")[0]}`:i}.json`;try{let o=URL.createObjectURL(new Blob([t],{type:"application/json"})),l=document.createElement("a");l.href=o,l.download=s,document.body.appendChild(l),l.click(),l.remove(),window.setTimeout(()=>URL.revokeObjectURL(o),5e3)}catch{}try{await navigator.clipboard.writeText(t),this._copied=!0,window.setTimeout(()=>this._copied=!1,3e3)}catch{}}async _clear(){window.confirm(this._t("rep.clear_confirm"))&&(await this.hass.callWS({type:"easy_av_control/history/clear"}),await this._load())}_t(n,e){return S(this.hass?.language,n,e)}_toggle(n){let e=new Set(this._expanded);e.has(n)?e.delete(n):e.add(n),this._expanded=e}_when(n){let e=new Date(n);return Number.isNaN(e.getTime())?n:e.toLocaleString(this.hass?.language,{dateStyle:"short",timeStyle:"medium"})}render(){if(this._failed)return r`<p class="ltek-hint ltek-error">${this._failed}</p>`;let n=this._history;return r`
      <div class="head">
        <h2><ha-icon icon="mdi:chart-timeline-variant"></ha-icon>${this._t("rep.title")}</h2>
        <div class="ltek-buttons">
          ${this._copied?r`<span class="ltek-hint copied">${this._t("rep.copied")}</span>`:h}
          <button class="ltek-btn" title=${this._t("rep.export_hint")} ?disabled=${!n?.runs.length} @click=${()=>this._export()}>
            <ha-icon icon="mdi:download"></ha-icon> ${this._t("rep.export")}
          </button>
          <button class="ltek-btn" @click=${()=>this._load()}>
            <ha-icon icon="mdi:refresh"></ha-icon> ${this._t("rep.refresh")}
          </button>
          <button class="ltek-btn danger" ?disabled=${!n?.runs.length} @click=${()=>this._clear()}>
            <ha-icon icon="mdi:trash-can-outline"></ha-icon> ${this._t("rep.clear")}
          </button>
        </div>
      </div>
      <p class="ltek-hint">${this._t("rep.hint")}</p>
      ${n?r`${this._panel("runs","mdi:timer-play-outline",this._t("rep.runs"),this._renderRuns(n.runs))}
          ${this._panel("devices","mdi:television-play",this._t("rep.devices"),this._renderDevices(n.devices))}`:r`<p class="ltek-hint">${this._t("loading")}</p>`}
    `}_panel(n,e,t,i){return r`<details
      class="ltek-sec"
      .open=${this._open===n}
      @toggle=${s=>{let o=s.target.open;o&&this._open!==n?this._open=n:!o&&this._open===n&&(this._open="")}}
    >
      <summary><ha-icon icon=${e}></ha-icon>${t}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="ltek-body">${i}</div>
    </details>`}_spark(n,e){let s=n.slice(-40),o=Math.max(1,...s.map(c=>c.seconds)),l=Math.max(2,Math.min(10,(180-s.length)/Math.max(1,s.length)));return r`<svg class="spark" viewBox="0 0 ${180} ${32}" width=${180} height=${32} aria-hidden="true">
      ${s.map((c,d)=>{let u=Math.max(2,c.seconds/o*30);return Ye`<rect x=${d*(l+1)} y=${32-u} width=${l} height=${u} rx="1"
          class=${c.ok?c.warn?"warn":"ok":"err"}><title>${P(c.seconds)}</title></rect>`})}
      ${e?Ye`<line x1="0" x2=${180} y1=${32-e/o*30} y2=${32-e/o*30} class="typ" />`:h}
    </svg>`}_stats(n,e="rep.count"){return r`<span class="stats">
      <span><b>${P(n.typical)}</b> ${this._t("rep.typical")}</span>
      <span>${P(n.fastest)} – ${P(n.slowest)}</span>
      ${n.failed?r`<span class="ltek-badge warn">${this._t("rep.failed",{n:String(n.failed)})}</span>`:h}
      <span class="muted">${this._t(e,{n:String(n.count)})}</span>
    </span>`}_renderRuns(n){if(!n.length)return r`<p class="ltek-hint">${this._t("rep.no_runs")}</p>`;let e=n.filter(i=>this._mode==="all"||i.mode===this._mode),t=si(e).sort((i,s)=>ue(i.runs).at<ue(s.runs).at?1:-1);return r`<div class="ltek-row">
        <label class="lbl">${this._t("rep.show")}</label>
        <select @change=${i=>this._mode=i.target.value}>
          ${["all","start","stop"].map(i=>r`<option value=${i} ?selected=${this._mode===i}>${this._t(`rep.mode_${i}`)}</option>`)}
        </select>
      </div>
      <div class="ltek-list">
        ${t.map(({key:i,runs:s})=>{let o=s[0],l=de(s.map(d=>({seconds:d.seconds,ok:st(d)}))),c=this._expanded.has(i);return r`<div class="ltek-item group ${c?"open":""}">
            <button class="row" @click=${()=>this._toggle(i)}>
              <ha-icon class="lead" icon=${o.mode==="start"?"mdi:play-circle-outline":"mdi:stop-circle-outline"}></ha-icon>
              <span class="ltek-item-text">
                <span class="ltek-name">${o.room_name} · ${o.activity_name}</span>
                <span class="ltek-subline"
                  >${this._t(`rep.mode_${o.mode}`)}${o.from_name?` \xB7 ${this._t("rep.from",{activity:o.from_name})}`:""}</span
                >
                ${this._stats(l)}
              </span>
              ${this._spark(s.map(d=>({seconds:d.seconds,ok:st(d),warn:d.result==="warning"})),l.typical)}
              <ha-icon class="ltek-act chev" icon=${c?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
            </button>
            ${c?r`<div class="runs">${[...s].reverse().map(d=>this._renderRun(d,l.typical))}</div>`:h}
          </div>`})}
      </div>`}_renderRun(n,e){let t=`run:${n.at}`,i=this._expanded.has(t),s=ot(n.seconds,e);return r`<div class="run">
      <button class="run-row" @click=${()=>this._toggle(t)}>
        <span class="when">${this._when(n.at)}</span>
        <span class="total"><b>${P(n.seconds)}</b>${s?r` <span class="dev ${s.startsWith("+")?"slow":"fast"}">${s}</span>`:h}</span>
        <span class="ltek-badge ${Bi[n.result]??""}">${this._t(`rep.result_${n.result}`)}</span>
        <ha-icon class="ltek-act" icon=${i?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
      </button>
      ${i&&n.id?r`<button class="ltek-btn export-run" @click=${()=>this._export(n.id)}>
            <ha-icon icon="mdi:download"></ha-icon> ${this._t("rep.export_run")}
          </button>`:h}
      ${i?this._renderPhases(n):h}
    </div>`}_renderPhases(n){let e=Math.max(n.seconds,.1);return r`<div class="phases">
      ${n.phases.map(t=>r`<div class="phase ${t.result==="error"?"err":""}">
          <span class="phase-name">${this._phaseName(t)}</span>
          <span class="track"
            ><span
              class="bar"
              style="left:${t.start/e*100}%;width:${Math.max(.6,t.seconds/e*100)}%"
            ></span
          ></span>
          <span class="phase-time">${P(t.seconds)}</span>
        </div>`)}
      ${n.error?r`<p class="ltek-error small">${n.error}</p>`:h}
      ${(n.warnings??[]).map(t=>r`<p class="ltek-warn small">${t}</p>`)}
    </div>`}_phaseName(n){return n.kind==="device"?String(n.name??n.device??""):n.kind==="switch_off_unused"?this._t("rep.phase_switch_off_unused"):this._t(`rep.phase_${n.kind}`)}_renderDevices(n){let e=Object.entries(n).filter(([,t])=>t.length);return e.length?(e.sort(([t,i],[s,o])=>(ue(i).name??t).localeCompare(ue(o).name??s)),r`<p class="ltek-hint">${this._t("rep.devices_hint")}</p>
      <div class="ltek-list">
        ${e.map(([t,i])=>{let s=this._expanded.has(`dev:${t}`),o=ue(i).name??t;return r`<div class="ltek-item group ${s?"open":""}">
            <button class="row" @click=${()=>this._toggle(`dev:${t}`)}>
              <ha-icon class="lead" icon="mdi:television"></ha-icon>
              <span class="ltek-item-text">
                <span class="ltek-name">${o}</span>
                <span class="ltek-subline">${t}</span>
              </span>
              <ha-icon class="ltek-act chev" icon=${s?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
            </button>
            <div class="directions">
              ${["on","off"].map(l=>{let c=i.filter(u=>u.direction===l);if(!c.length)return h;let d=de(c.map(u=>({seconds:u.seconds,ok:u.result==="ok"})));return r`<div class="direction">
                  <span class="dir-label">${this._t(`rep.dir_${l}`)}</span>
                  ${this._stats(d,"rep.count_times")}
                  ${this._spark(c.map(u=>({seconds:u.seconds,ok:u.result==="ok",warn:u.slow})),d.typical)}
                </div>`})}
            </div>
            ${s?this._renderEvents(i):h}
          </div>`})}
      </div>`):r`<p class="ltek-hint">${this._t("rep.no_devices")}</p>`}_renderEvents(n){let e={on:de(n.filter(t=>t.direction==="on").map(t=>({seconds:t.seconds,ok:t.result==="ok"}))).typical,off:de(n.filter(t=>t.direction==="off").map(t=>({seconds:t.seconds,ok:t.result==="ok"}))).typical};return r`<table class="events">
      <thead>
        <tr>
          <th>${this._t("rep.when")}</th>
          <th>${this._t("rep.dir")}</th>
          <th>${this._t("rep.time")}</th>
          <th>${this._t("rep.result")}</th>
          <th>${this._t("rep.for")}</th>
        </tr>
      </thead>
      <tbody>
        ${[...n].reverse().map(t=>{let i=t.result==="ok"?ot(t.seconds,e[t.direction]):"";return r`<tr>
            <td>${this._when(t.at)}</td>
            <td>${this._t(`rep.dir_${t.direction}`)}</td>
            <td>
              <b>${P(t.seconds)}</b>${i?r` <span class="dev ${i.startsWith("+")?"slow":"fast"}">${i}</span>`:h}
            </td>
            <td>
              <span class="ltek-badge ${t.result==="ok"?t.slow?"warn":"ok":"err"}"
                >${t.result==="ok"?t.slow?this._t("rep.slow"):this._t("rep.result_ok"):t.result}</span
              >${t.value?r` <span class="muted">${t.value}</span>`:h}
            </td>
            <td class="muted">${[t.room_name,t.activity_name].filter(Boolean).join(" \xB7 ")}</td>
          </tr>`})}
      </tbody>
    </table>`}};pe.properties={hass:{attribute:!1},_history:{state:!0},_failed:{state:!0},_open:{state:!0},_expanded:{state:!0},_mode:{state:!0},_copied:{state:!0}},pe.styles=[k,x,$,b`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--ltek-sp-3);
        font-size: var(--ltek-fs-body);
      }
      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--ltek-sp-3);
        flex-wrap: wrap;
      }
      h2 {
        display: flex;
        align-items: center;
        gap: var(--ltek-sp-3);
        margin: 0;
        font-size: var(--ltek-fs-panel-title);
        font-weight: var(--ltek-fw-semibold);
      }
      h2 ha-icon {
        color: var(--ltek-c-accent);
      }
      .ltek-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--ltek-sp-1);
        --mdc-icon-size: 16px;
      }
      .ltek-row select {
        padding: var(--ltek-ctrl-pad);
        background: var(--secondary-background-color, #2a2a2a);
        border: 1px solid var(--ltek-c-border);
        border-radius: var(--ltek-r-ctrl);
        color: var(--ltek-c-text);
        font: inherit;
      }
      .ltek-item.group {
        flex-direction: column;
        align-items: stretch;
        gap: var(--ltek-sp-2);
      }
      button.row {
        display: flex;
        align-items: center;
        gap: var(--ltek-sp-3);
        border: none;
        background: none;
        padding: 0;
        font: inherit;
        color: inherit;
        text-align: left;
        cursor: pointer;
        width: 100%;
      }
      button.row > ha-icon.lead {
        color: var(--accent-color, var(--ltek-c-accent));
        --mdc-icon-size: var(--ltek-icon-lg);
        flex: none;
      }
      .stats {
        display: flex;
        flex-wrap: wrap;
        gap: 2px var(--ltek-sp-4);
        font-size: var(--ltek-fs-small);
        color: var(--ltek-c-label);
        margin-top: 2px;
      }
      .muted {
        color: var(--ltek-c-muted);
      }
      .spark {
        flex: none;
      }
      .spark rect.ok {
        fill: var(--green-color, #4caf50);
      }
      .spark rect.warn {
        fill: var(--yellow-color, #ffeb3b);
      }
      .spark rect.err {
        fill: var(--red-color, #f44336);
      }
      .spark line.typ {
        stroke: var(--ltek-c-accent);
        stroke-dasharray: 3 2;
        stroke-width: 1;
      }
      .runs {
        display: flex;
        flex-direction: column;
        border-top: 1px solid var(--ltek-c-border-soft);
      }
      button.run-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto auto 20px;
        align-items: center;
        gap: var(--ltek-sp-3);
        width: 100%;
        padding: var(--ltek-sp-2) 0;
        border: none;
        border-bottom: 1px solid var(--ltek-c-border-soft);
        background: none;
        font: inherit;
        color: inherit;
        text-align: left;
        cursor: pointer;
      }
      .when {
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
      }
      .total {
        font-variant-numeric: tabular-nums;
      }
      .dev {
        font-size: var(--ltek-fs-small);
      }
      .dev.slow {
        color: var(--red-color, #f44336);
      }
      .dev.fast {
        color: var(--green-color, #4caf50);
      }
      .ltek-badge.err {
        color: var(--ltek-c-error);
        border-color: var(--ltek-c-error);
      }
      .copied {
        margin: 0;
        color: var(--ltek-c-success);
      }
      .export-run {
        align-self: flex-start;
        margin: var(--ltek-sp-2) 0 0;
      }
      .phases {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: var(--ltek-sp-2) 0 var(--ltek-sp-3);
      }
      .phase {
        display: grid;
        grid-template-columns: minmax(90px, 30%) minmax(0, 1fr) 56px;
        align-items: center;
        gap: var(--ltek-sp-3);
        font-size: var(--ltek-fs-small);
      }
      .phase-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .track {
        position: relative;
        height: 10px;
        border-radius: 5px;
        background: var(--ltek-c-border-soft);
      }
      .bar {
        position: absolute;
        top: 0;
        bottom: 0;
        border-radius: 5px;
        background: var(--ltek-c-accent);
      }
      .phase.err .bar {
        background: var(--red-color, #f44336);
      }
      .phase-time {
        text-align: right;
        font-variant-numeric: tabular-nums;
      }
      .small {
        font-size: var(--ltek-fs-small);
        margin: 2px 0;
      }
      .directions {
        display: flex;
        flex-direction: column;
        gap: var(--ltek-sp-2);
        padding-left: calc(var(--ltek-icon-lg) + var(--ltek-sp-3));
      }
      .direction {
        display: flex;
        align-items: center;
        gap: var(--ltek-sp-4);
        flex-wrap: wrap;
      }
      .dir-label {
        min-width: 70px;
        color: var(--accent-color, var(--ltek-c-accent));
        font-weight: var(--ltek-fw-semibold);
      }
      .direction .stats {
        flex: 1 1 auto;
        margin: 0;
      }
      table.events {
        width: 100%;
        border-collapse: collapse;
        font-size: var(--ltek-fs-small);
      }
      table.events th {
        text-align: left;
        color: var(--ltek-c-muted);
        font-weight: var(--ltek-fw-semibold);
        padding: 4px 6px;
        border-bottom: 1px solid var(--ltek-c-border-soft);
      }
      table.events td {
        padding: 4px 6px;
        border-bottom: 1px solid var(--ltek-c-border-soft);
        font-variant-numeric: tabular-nums;
      }
    `];customElements.get("easy-av-control-reports")||customElements.define("easy-av-control-reports",pe);var lt=["power_on","power_off","set_source","set_volume","set_sound_mode","set_brightness","set_color_temp","set_position","set_tilt","call_action","delay","wait_available"],V=["volume","channels","transport","navigation"],rt={number:{min:0,max:3600,step:1,mode:"box",unit_of_measurement:"s"}},at={number:{min:0,max:100,step:1,mode:"slider"}};function he(a,n,e,t="source_list"){if(!e)return[];let i=a.states[e]?.attributes[t];return Array.isArray(i)&&i.length?i.map(String):n[e]??[]}function ct(a,n,e){return he(a,n,e,"source_list")}var dt=["source","sound_mode"],oi=["number","input_number","select","input_select","switch","input_boolean"],ut={source:"source_list",sound_mode:"sound_mode_list"};function pt(a,n,e,t,i={}){let s=n.devices?.[e]?.entity_id;if(!s)return[];let o=[];if(s.startsWith("media_player."))for(let l of dt){let c=ut[l];he(a,t[c]??{},s,c).length&&o.push({device:e,setting:l})}for(let l of i[s]??[])o.push({device:e,entity:l});return o}function Wi(a,n,e,t,i={}){let s=n.devices?.[e]?.settings;return Array.isArray(s)?s.map(o=>({...o,device:e})):pt(a,n,e,t,i)}function ri(a,n,e,t,i={}){return(e.devices??[]).flatMap(s=>Wi(a,n,s,t,i))}function me(a){return typeof a=="object"&&a!==null&&"source"in a}function ai(a,n,e,t,i={},s={}){let l={name:"device",required:!0,selector:{select:{options:Object.entries(n.devices??{}).map(([u,p])=>({value:u,label:p.name?`${p.name} (${u})`:u})),mode:"dropdown"}}},c=e.device?n.devices?.[e.device]?.entity_id:void 0;return[...{power_on:[l],power_off:[l],set_source:[l,{name:"source",required:!0,selector:{select:{options:ct(a,i,c),custom_value:!0,mode:"dropdown"}}}],set_volume:[l,{name:"volume_level",required:!0,selector:{number:{min:0,max:1,step:.01,mode:"slider"}}}],set_sound_mode:[l,{name:"sound_mode",required:!0,selector:{select:{options:he(a,s,c,"sound_mode_list"),custom_value:!0,mode:"dropdown"}}}],set_brightness:[l,{name:"brightness_pct",selector:at},{name:"color_temp_kelvin",selector:{color_temp:{unit:"kelvin",min:2e3,max:6500}}},{name:"transition",selector:rt}],set_color_temp:[l,{name:"color_temp_kelvin",required:!0,selector:{color_temp:{unit:"kelvin",min:2e3,max:6500}}}],set_position:[l,{name:"position",required:!0,selector:at}],set_tilt:[l,{name:"tilt_position",required:!0,selector:at}],call_action:[{name:"action",required:!0,selector:{text:{}}},{name:"target",selector:{target:{}}},{name:"data",selector:{object:{}}}],delay:[],wait_picture:[l,{name:"timeout",selector:{number:{min:5,max:300,step:5,mode:"slider",unit_of_measurement:"s"}}}],wait_available:[{...l,required:!1},{name:"entity_id",selector:{entity:{}}},{name:"timeout",selector:rt},{name:"reload_integration",selector:{boolean:{}}},{name:"on_timeout",selector:{select:{options:[{value:"abort",label:t("on_timeout_abort")},{value:"continue",label:t("on_timeout_continue")}],mode:"dropdown"}}}]}[e.type]??[],{name:"delay_after",selector:rt}]}function y(a,n=[]){let e={};for(let[t,i]of Object.entries(a))if(n.includes(t))e[t]=i;else{if(i==null||i==="")continue;if(Array.isArray(i)&&i.length===0)continue;if(typeof i=="object"&&!Array.isArray(i)&&Object.keys(i).length===0)continue;e[t]=i}return e}function Le(a){let n=V.filter(e=>a[e]===null);return Array.isArray(a.settings)&&n.push("settings"),y(a,n)}function B(a){return a.normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/ß/g,"ss").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")}function j(a,n){let e=new Set(n),t=a||"item";if(!e.has(t))return t;let i=2;for(;e.has(`${t}_${i}`);)i+=1;return`${t}_${i}`}function ht(a,n){let e=[];for(let[t,i]of Object.entries(a.activities??{}))((i.devices??[]).includes(n)||(i.steps??[]).some(o=>o.device===n)||V.some(o=>i.remote?.[o]===n)||(i.remote?.buttons??[]).some(o=>typeof o=="object"&&o?.device===n))&&e.push(i.name??t);return e}function mt(a,n,e){let t={};for(let[o,l]of Object.entries(a.devices??{}))t[o===n?e:o]=l;let i=o=>o===n?e:o,s={};for(let[o,l]of Object.entries(a.activities??{})){let c=l.remote?{...l.remote}:void 0;if(c){for(let u of V)u in c&&(c[u]=i(c[u]));Array.isArray(c.buttons)&&(c.buttons=c.buttons.map(u=>typeof u=="object"&&u?{...u,device:i(u.device)}:u))}let d=l.before?Object.fromEntries(Object.entries(l.before).map(([u,p])=>[i(u),p.wait_for?{...p,wait_for:p.wait_for.map(m=>({...m,device:i(m.device)}))}:p])):void 0;s[o]=y({...l,devices:l.devices?.map(u=>i(u)),steps:l.steps?.map(u=>u.device===n?{...u,device:e}:u),checks:l.checks?.map(u=>u.device===n?{...u,device:e}:u),before:d,remote:c})}return{...a,devices:t,activities:s}}function Me(a){return Object.entries(a?.activities??{}).sort(([n,e],[t,i])=>(e.order??1e3)-(i.order??1e3)||(e.name??n).localeCompare(i.name??t,void 0,{sensitivity:"base"}))}function ft(a){return a.split("_").filter(Boolean).map(n=>n[0].toUpperCase()+n.slice(1)).join(" ")}function li(a,n,e){let t=new Map;for(let i of e){let s=i.entity||n.devices?.[String(i.device)]?.entity_id,o=s&&a.entities?.[s]?.platform||"";t.set(o,[...t.get(o)??[],i])}return[...t.entries()]}function _t(a,n){let e={};for(let[t,i]of Object.entries(a.before??{})){if(t===n)continue;let s=(i.wait_for??[]).filter(l=>l.device!==n),o=y({...i,wait_for:s.length?s:void 0});Object.keys(o).some(l=>l==="delay"||l==="wait_for")&&(e[t]=o)}return y({...a,devices:(a.devices??[]).filter(t=>t!==n),before:Object.keys(e).length?e:void 0})}function gt(a,n,e){let t={...a.before??{}},i=e?y({...e,wait_for:e.wait_for?.length?e.wait_for:void 0}):void 0;return i&&(i.delay||i.wait_for?.length)?t[n]=i:delete t[n],y({...a,before:Object.keys(t).length?t:void 0})}var vt=new Set(["boot","reload","ready","status","picture","check","turn_on","wait","already_on","step","turn_off","delay","wait_for"]),Y=new Set(["device","checks","steps"]);function fe(a){let n;return a.map(e=>{if(Y.has(e.kind)){n=e;return}return(!vt.has(e.kind)||e.reason==="unused")&&(n=void 0),n})}function Gi(a,n){if(!n)return-1;let e=fe(a),t=n.device??void 0,i=o=>(a[o].device??e[o]?.device)===t,s=o=>a.findIndex((l,c)=>!l.background&&o(l,c));switch(n.kind){case"power_on":return s(o=>o.kind==="outlets_on");case"power_off":return s(o=>o.kind==="outlets_off");case"boot":case"reload":case"ready":case"turn_on":case"status":return s((o,l)=>o.kind===n.kind&&i(l));case"reach":return s((o,l)=>o.kind==="turn_on"&&i(l));case"delay":case"before":return s((o,l)=>o.kind===(n.kind==="delay"?"delay":"wait_for")&&i(l));case"warm_up":return s((o,l)=>o.kind==="wait"&&o.reason==="delay_after_on"&&i(l));case"turn_off":return s((o,l)=>o.kind==="turn_off"&&i(l));case"checks":return s(o=>o.kind==="checks");case"step":return s(o=>o.kind!=="wait"&&o.step===n.step);case"wait":return s(o=>o.kind==="wait"&&o.step===n.step);case"hooks":return s(o=>o.kind==="hook_wait");default:return-1}}function ci(a,n,e){if(n.state==="error"){let l=fe(a);return a.map((c,d)=>c.background||e<0?"todo":d<e?Y.has(c.kind)&&l[e]===c?"failed":"done":d===e?"failed":"todo")}let t=n.state==="active"||n.state==="idle",i=n.state==="starting"||n.state==="stopping",s=i?Math.max(e,Gi(a,n.current)):-1,o=fe(a);return a.map((l,c)=>l.background?t&&n.state==="idle"?"done":"todo":t?"done":!i||s<0?c===0?"active":"todo":c<s?Y.has(l.kind)&&o[s]===l?"active":"done":c===s?"active":"todo")}function di(a){switch(a){case"on":return"on";case"starting":case"stopping":return"busy";case"off":return"off";case"error":return"error";case"unavailable":return"unavailable";default:return"unknown"}}var Ki={waits:["wait","boot","ready","status","hook_wait"],reloads:["reload"],outlets:["outlets_on","outlets_off","outlet_keep"],hooks:["hook","hook_wait"]},ui=["entities","waits","notes","reloads","outlets","hooks"];function bt(a,n){return n.some(e=>Ki[e]?.includes(a.kind))}var Fi=400,Ui={state:"mdi:flag-outline",outlets_on:"mdi:power-socket-eu",outlets_off:"mdi:power-socket-eu",outlet_keep:"mdi:power-socket-eu",turn_on:"mdi:power",turn_off:"mdi:power-off",hook:"mdi:script-text-outline",hook_wait:"mdi:script-text-outline",boot:"mdi:timer-sand",wait:"mdi:timer-sand",reload:"mdi:reload",ready:"mdi:lan-connect",status:"mdi:state-machine",picture:"mdi:image-check-outline",check:"mdi:image-check-outline",already_on:"mdi:check",step:"mdi:tune-variant",delay:"mdi:timer-outline",started_by:"mdi:gesture-tap-button",wait_for:"mdi:clock-check-outline"};function qi(a,n){let e=a.device??(n?.kind==="device"?n.device:void 0)??"";return[a.kind,e,a.step??a.index??"",a.check??"",a.hook??"",a.reason??""].join("|")}function Zi(a,n,e){if(a.background)return!1;if(n?.kind==="steps")return!0;switch(a.kind){case"device":return e==="start";case"status":case"boot":case"ready":case"delay":case"wait_for":case"started_by":case"check":case"step":case"hook":return!0;case"wait":return a.reason==="delay_after_on";default:return!1}}var pi={device:"section_device",boot:"section_power",reload:"section_ready",ready:"section_ready",status:"section_state",turn_on:"section_device",turn_off:"section_device",wait:"section_delays",delay:"flow.before",wait_for:"flow.before"},hi={checks:"section_checks",check:"section_checks",steps:"steps",step:"steps",picture:"section_checks",hook:"section_advanced",hook_wait:"section_advanced",already_on:"section_activity_devices",started_by:"started_by"},_e=class extends v{constructor(){super();this._reached=-1;this._watched="";this._request=0;this._mode="start",this.details=!0,this._states={},this._detailKinds=["entities","waits"],this._showDetails=!0}connectedCallback(){super.connectedCallback(),this.hass?.callWS({type:"easy_av_control/ui/get"}).then(e=>this._detailKinds=e.flow_details).catch(()=>{})}get _detailsOn(){return this.live?this.details:this._showDetails}_hides(e){return!this._detailsOn&&this._detailKinds.includes(e)}async _setDetailKinds(e){this._detailKinds=e;try{let t=await this.hass.callWS({type:"easy_av_control/ui/flow_details",details:e});this._detailKinds=t.flow_details}catch{}}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._timer),window.clearTimeout(this._statesTimer)}willUpdate(e){if(e.has("activityId")&&e.get("activityId")!==void 0&&(this._from=void 0),this._from!==void 0&&!this.room?.activities?.[this._from]&&(this._from=void 0),this.live){let t=this.live.state==="stopping"?"stop":"start",i=e.get("live");t!==this._mode&&(this._mode=t),(!i||i.state!==this.live.state||i.activity!==this.live.activity)&&((this.live.state==="starting"||this.live.state==="stopping")&&(this._reached=-1),e.set("_mode",void 0))}if(["room","roomId","activityId","_mode","_from","from"].some(t=>e.has(t))){window.clearTimeout(this._timer);let i=!(this._flow===void 0&&this._failed===void 0)&&e.has("room")?Fi:0;this._timer=window.setTimeout(()=>this._load(),i)}}async _load(){let e=++this._request,t=this.live?this.from:this._from;try{let i=await this.hass.callWS({...this.live?{type:"easy_av_control/control/flow",...this.entryId?{entry_id:this.entryId}:{}}:{type:"easy_av_control/config/flow",config:this.room},room:this.roomId,activity:this.activityId,mode:this._mode,...this._mode==="start"&&t?{from:t}:{}});this._loadStates(),e===this._request&&(this._flow=i,this._failed=void 0)}catch(i){e===this._request&&(this._failed=i.message??String(i))}}async _loadStates(){try{this._states=await this.hass.callWS({type:"easy_av_control/control/states",room:this.roomId,...this.entryId?{entry_id:this.entryId}:{}})}catch{}}updated(e){if(!e.has("hass")||!this.hass||!this._flow||this._flow.error)return;let t=new Set;for(let s of this._flow.rows){typeof s.entity_id=="string"&&t.add(s.entity_id);for(let o of s.entities??[])t.add(o)}for(let s of Object.values(this._room.devices??{}))s.entity_id&&t.add(s.entity_id);let i=[...t].map(s=>`${s}=${this.hass.states[s]?.state}`).join("|");i!==this._watched&&(this._watched=i,window.clearTimeout(this._statesTimer),this._statesTimer=window.setTimeout(()=>this._loadStates(),300))}get _room(){return this.room??(this._flow&&!this._flow.error?this._flow.room:void 0)??{}}_t(e,t){return S(this.hass?.language,e,t)}_entity(e){let t=String(e??"");return this.hass.states[t]?.attributes.friendly_name||t}_device(e){let t=String(e??""),i=this._room.devices?.[t];return i?.name||(i?.entity_id?this._entity(i.entity_id):"")||t}_activity(e){let t=String(e??"");return this._room.activities?.[t]?.name||t}_list(e){return(e??[]).map(t=>this._entity(t)).join(", ")}_seconds(e){return`${Math.round(Number(e)*10)/10} s`}_duration(e){return e>=120&&e%60===0?`${e/60} min`:this._seconds(e)}_time([e,t]){return e===t?this._seconds(e):`${this._seconds(e).slice(0,-2)}\u2013${this._seconds(t)}`}_text(e){let t=this._device(e.device);switch(e.kind){case"state":return this._t(`flow.state_${e.state}`);case"outlets_on":return this._t("flow.outlets_on",{outlets:this._list(e.entities)});case"outlets_off":return this._t(e.after_status?"flow.outlets_off_status":e.background?"flow.outlets_off_later":"flow.outlets_off",{outlets:this._list(e.entities)});case"outlet_keep":return this._t("flow.outlet_keep",{outlet:this._entity(e.entity_id)});case"hook":return this._t(`flow.${e.hook}`);case"hook_wait":return this._t(`flow.${e.hook}_wait`);case"already_on":return this._t("flow.already_on",{activity:this._activity(e.previous)});case"boot":return this._t("flow.boot",{seconds:this._seconds(e.seconds)});case"reload":return this._t("flow.reload",{entity:this._entity(e.entity_id)});case"ready":{let i=Array.isArray(e.states)?e.states:e.states?[e.states]:[],s={entity:this._entity(e.entity_id),states:i.join(" / "),timeout:this._seconds(e.timeout)};return[e.step?`${e.step}. `:"",this._t(i.length?"flow.ready_state":"flow.ready",s)," ",this._t(`flow.on_timeout_${e.on_timeout}`)].join("")}case"turn_on":case"turn_off":{let i=e.step?`${e.step}. `:"";return e.skip?i+this._t("flow.cannot_switch",{device:t}):e.later?i+this._t("flow.turn_off_later",{device:t,seconds:this._duration(Number(e.later))}):i+this._t(e.reason==="unused"?"flow.turn_off_unused":`flow.${e.kind}`,{device:t})}case"status":return this._t(e.target==="off"?"flow.status_off":"flow.status_on",{device:t,entity:this._entity(e.entity_id),timeout:this._seconds(e.timeout)});case"check":{let i=this._device(e.device);if(e.missing)return this._t("flow.check_missing",{device:i});let s=e.unless??[];return this._t(s.length?"flow.check_unless":"flow.check",{device:i,entity:this._entity(e.entity_id),states:(s.length?s:e.states??[]).join(" / "),timeout:this._seconds(e.timeout)})+(e.on_failure==="stop"?` ${this._t("flow.on_timeout_abort")}`:` ${this._t("flow.check_warn")}`)}case"picture":return this._t("flow.picture",{step:String(e.step??""),entity:this._entity(e.entity_id),states:(e.states??[]).join(" / "),timeout:this._seconds(e.timeout)});case"delay":return this._t("flow.delay",{seconds:this._seconds(e.seconds)});case"started_by":return this._t(this._mode==="stop"?"flow.stopped_by":"flow.started_by",{entity:this._entity(e.entity_id),states:(e.states??[]).join(" / ")});case"wait_for":{let s=(e.waits??[]).map(o=>this._t(o.state==="picture"?"flow.wait_for_picture":"flow.wait_for_on",{device:this._device(o.device)})).join(this._t("flow.and"));return this._t("flow.wait_for",{what:s,timeout:this._seconds(e.timeout)})+" "+this._t(`flow.on_timeout_${e.on_timeout}`)}case"wait":return this._t(e.reason==="delay_after_on"?"flow.wait_on":"flow.wait",{seconds:this._seconds(e.seconds)});case"step":return`${e.step}. ${this._t(`step.${e.step_type}`)}${this._stepValue(e)}`;default:return e.kind}}_stepValue(e){let t=e.data??{},i=[];for(let[s,o]of Object.entries(t))s==="volume_level"?i.push(`${Math.round(Number(o)*100)} %`):s==="brightness_pct"||s==="position"||s==="tilt_position"?i.push(`${o} %`):s==="color_temp_kelvin"?i.push(`${o} K`):s==="transition"?i.push(this._seconds(o)):e.step_type!=="call_action"&&i.push(String(o));return i.length?`: ${i.join(", ")}`:""}_notes(e){let t=[];if(typeof e.condition=="string"&&t.push(this._t(`flow.if.${e.condition}`)),e.kind==="ready"&&e.reload&&t.push(this._t("flow.reload_if_needed")),typeof e.option=="string"&&t.push(this._t("flow.option",{option:e.option})),e.kind==="status"&&Number(e.typical)>0&&t.push(this._t("flow.typical",{seconds:this._seconds(e.typical)})),e.kind==="status"&&Number(e.debounce)>0&&t.push(this._t("flow.debounce",{seconds:this._seconds(e.debounce)})),e.kind==="turn_off"&&Number(e.cooldown)>0&&t.push(this._t("flow.cooldown",{seconds:this._seconds(e.cooldown)})),Array.isArray(e.already_on)&&e.already_on.length&&t.push(this._t("flow.outlets_already_on",{outlets:this._list(e.already_on)})),Array.isArray(e.unless_rooms)&&e.unless_rooms.length&&t.push(this._t("flow.unless_rooms",{rooms:e.unless_rooms.join(", ")})),e.kind==="hook"){let i=e.actions??[];t.push(this._t("flow.parallel")),i.length&&t.push(i.join(", "))}return t}_call(e){if(typeof e.action!="string"||e.kind==="hook")return;let t=e.entities?this._list(e.entities):e.entity_id?this._entity(e.entity_id):"";return t?`${e.action} \u2192 ${t}`:e.action}_target(e,t){let i=e.device??(t?.kind==="device"?t.device:void 0);if(t?.kind==="device"&&i&&pi[e.kind])return{device:i,panel:pi[e.kind]};if(t?.kind==="steps"&&vt.has(e.kind))return{panel:"steps"};if(hi[e.kind])return{panel:hi[e.kind]};if(e.kind==="device"&&i)return{device:i,panel:"section_device"}}_renderRow(e,t,i,s,o){let l=this.live?void 0:this._target(e,s),c=qi(e,s),d=this._hides("notes")?[]:this._notes(e),u=this._hides("entities")?void 0:this._call(e),p=Y.has(e.kind),m=[t?"nested":"",p?"header":"",e.kind,o?`s-${o}`:""],f=e.kind==="device"&&e.device?this._states[e.device]:void 0;return r`<li class=${m.join(" ")}>
      <span class="time"
        >${o==="done"?r`<ha-icon class="mark" icon="mdi:check"></ha-icon>`:o==="active"?r`<ha-icon class="mark spin" icon="mdi:loading"></ha-icon>`:o==="failed"?r`<ha-icon class="mark" icon="mdi:close"></ha-icon>`:i?this._time(e.at):""}</span
      >
      ${p?r`<span class="index">${e.kind==="device"?e.index:e.kind==="checks"?"\u2713":"\u2261"}</span>`:r`<ha-icon class="icon" .icon=${Ui[e.kind]??"mdi:circle-small"}></ha-icon>`}
      <span class="body">
        <span class="what"
          >${e.kind==="device"?r`${this._device(e.device)}${f?.value?r`<span class="state-chip r-${di(f.group)}" title=${f.value}
                    >${["on","off","starting","stopping","error"].includes(f.group)?this._t(`flow.group.${f.group}`):f.value}</span
                  >`:h}`:e.kind==="steps"?this._t("flow.steps"):e.kind==="checks"?this._t("flow.checks"):this._text(e)}</span
        >
        ${e.kind==="device"&&!this._hides("entities")?r`<span class="call">${e.entity_id}</span>`:h}
        ${u?r`<span class="call">${u}</span>`:h}
        ${d.length?r`<span class="notes">${d.map(_=>r`<span class="note">${_}</span>`)}</span>`:h}
      </span>
      ${this.live?h:r`<span class="acts"
            >${l?r`<button
                  class="ltek-act edit ${this.editing===c?"on":""}"
                  title=${this._t("flow.edit")}
                  aria-label=${this._t("flow.edit")}
                  @click=${()=>this.dispatchEvent(new CustomEvent("flow-edit",{detail:{...l,key:c},bubbles:!0,composed:!0}))}
                >
                  <ha-icon icon="mdi:pencil-outline"></ha-icon>
                </button>`:h}${Zi(e,s,this._mode)?r`<button
                  class="ltek-del"
                  title=${this._t("flow.delete")}
                  aria-label=${this._t("flow.delete")}
                  @click=${()=>this.dispatchEvent(new CustomEvent("flow-delete",{detail:{row:e,header:s?.kind,device:e.device??s?.device,mode:this._mode},bubbles:!0,composed:!0}))}
                >
                  <ha-icon icon="mdi:trash-can-outline"></ha-icon>
                </button>`:h}</span
          >`}
    </li>
    ${!this.live&&this.editing===c?r`<li class="inline"><slot name="edit"></slot></li>`:h}`}_renderRows(e){let t=fe(e),i;if(this.live&&["starting","stopping","active","error"].includes(this.live.state)){i=ci(e,this.live,this._reached);let c=i.lastIndexOf("active");c>this._reached&&!Y.has(e[c].kind)&&(this._reached=c)}let s=e.filter(c=>c.background),o="",l=e.flatMap((c,d)=>{if(c.background||!this._detailsOn&&bt(c,this._detailKinds))return[];let u=this._time(c.at),p=u!==o||c.kind==="state";return o=u,[this._renderRow(c,t[d]!==void 0,p,t[d],i?.[d])]});return r`<ol class="flow">${l}</ol>
      ${s.length?r`<h4>${this._t("flow.background")}</h4>
            <ol class="flow">${s.filter(c=>this._detailsOn||!bt(c,this._detailKinds)).map(c=>this._renderRow(c,!1,!0,void 0,i?.[e.indexOf(c)]))}</ol>`:h}`}render(){if(this.live)return r`${this._renderBody()}`;let e=Object.entries(this.room.activities??{}).filter(([t])=>t!==this.activityId);return r`
      <details class="ltek-sub options">
        <summary><ha-icon icon="mdi:tune-variant"></ha-icon>${this._t("flow.options")}</summary>
        <div class="ltek-sub-body">
          <p class="ltek-hint">${this._t("flow.options_hint")}</p>
          ${ui.map(t=>r`<label class="check"
              ><input
                type="checkbox"
                .checked=${this._detailKinds.includes(t)}
                @change=${i=>{let s=i.target.checked;this._setDetailKinds(s?[...this._detailKinds,t]:this._detailKinds.filter(o=>o!==t))}}
              />${this._t(`flow.detail_${t}`)}</label
            >`)}
        </div>
      </details>
      <div class="modes" role="tablist">
        ${["start","stop"].map(t=>r`<button
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
        ${this._mode==="start"&&e.length?r`<select
              aria-label=${this._t("flow.from_label")}
              @change=${t=>{let i=t.target.value;this._from=i||void 0}}
            >
              <option value="" ?selected=${!this._from}>${this._t("flow.from_idle")}</option>
              ${e.map(([t,i])=>r`<option value=${t} ?selected=${this._from===t}>
                    ${this._t("flow.from",{activity:i.name||t})}
                  </option>`)}
            </select>`:h}
      </div>
      ${this._renderBody()}
    `}_renderBody(){if(this._failed)return r`<p class="error">${this._t("flow.failed",{error:this._failed})}</p>`;let e=this._flow;if(!e)return r`<p class="hint">${this._t("loading")}</p>`;if(e.error){let l=e.error.path.join(".");return r`<p class="error">
        ${this._t("flow.invalid",{error:l?`${l}: ${e.error.message}`:e.error.message})}
      </p>`}let[t,i]=e.done,s=e.rows.filter(l=>l.background).map(l=>l.at[0]),o=this._mode==="start"?this._t(t===i?"flow.summary_start_fixed":"flow.summary_start",{min:this._seconds(t),max:this._seconds(i)}):this._t(s.length?"flow.summary_stop_cut":"flow.summary_stop",{seconds:this._seconds(Math.max(0,...s))});return r`${this._renderRows(e.rows)}
      ${this.live?h:r`<div class="adder"><slot name=${`add-${this._mode}`}></slot></div>`}
      ${this._detailsOn?r`<p class="summary">${o}</p>`:h}`}};_e.properties={hass:{attribute:!1},room:{attribute:!1},roomId:{attribute:!1},activityId:{attribute:!1},_mode:{state:!0},_from:{state:!0},_flow:{state:!0},_failed:{state:!0},entryId:{attribute:!1},live:{attribute:!1},from:{attribute:!1},details:{type:Boolean},editing:{attribute:!1},_states:{state:!0},_detailKinds:{state:!0},_showDetails:{state:!0}},_e.styles=[k,x,$,b`
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
      margin-top: 10px;
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
  `];customElements.get("easy-av-control-flow")||customElements.define("easy-av-control-flow",_e);var ge=class extends v{constructor(){super(...arguments);this._loading=!1}setConfig(e){this._config=e}updated(){this.hass&&this._rooms===void 0&&!this._loading&&(this._loading=!0,this.hass.callWS({type:"easy_av_control/control/rooms"}).then(e=>this._rooms=e).catch(()=>this._rooms=[]).finally(()=>this._loading=!1))}_schema(){let e=(this._rooms??[]).map(i=>i.room);return[{name:"room",required:!0,selector:{select:{mode:"dropdown",options:(this._rooms??[]).map(i=>({value:e.filter(s=>s===i.room).length>1?`${i.entry_id}/${i.room}`:i.room,label:i.name}))}}},{name:"name",selector:{text:{}}},{name:"show_flow",selector:{boolean:{}}},{name:"flow_details",selector:{boolean:{}}}]}render(){if(!this.hass||!this._config)return h;let e={show_flow:!0,...this._config,room:this._config.entry_id?`${this._config.entry_id}/${this._config.room}`:this._config.room},t=(this._rooms??[]).some(s=>s.room===this._config.room);this._rooms&&!t&&this._config.room&&(e.room=this._config.room);let i=s=>q(this.hass?.language,s);return r`<details class="ltek-sec" open>
        <summary>
          <ha-icon icon="mdi:remote-tv"></ha-icon>${i("editor.section")}
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="ltek-body">
          <p class="ltek-hint">${i("editor.hint")}</p>
          <ltek-form
            .hass=${this.hass}
            .data=${e}
            .schema=${this._schema()}
            .computeLabel=${s=>i(`editor.${s.name}`)}
            @value-changed=${this._valueChanged}
          ></ltek-form>
        </div>
      </details>
      <div class="ltek-links">
        <a class="ltek-star" href=${U} target="_blank" rel="noopener">${i("editor.star")}</a>
        <a class="ltek-issue" href="${U}/issues" target="_blank" rel="noopener">${i("editor.report")}</a>
      </div>`}_valueChanged(e){e.stopPropagation();let t={...e.detail.value},i={...this._config,...t},s=String(t.room??"");if(s.includes("/")){let[o,l]=s.split("/",2);i.entry_id=o,i.room=l}else delete i.entry_id;i.name||delete i.name,i.show_flow!==!1&&delete i.show_flow,i.flow_details||delete i.flow_details,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}};ge.properties={hass:{attribute:!1},_config:{state:!0},_rooms:{state:!0}},ge.styles=[k,$,b`
    :host {
      display: block;
    }
  `];customElements.get("easy-av-control-card-editor")||customElements.define("easy-av-control-card-editor",ge);function J(a,n){let e=`command.${a}`,t=n(e);if(t!==e)return t;let i=a.replace(/[_-]+/g," ").trim();return i.charAt(0).toUpperCase()+i.slice(1)}var Yi=new Set(["off","standby","unavailable","unknown"]);function mi(a,n){if(!a||Yi.has(a.state))return;let e=a.attributes,t=w=>typeof e[w]=="string"&&e[w]?e[w]:void 0,i=w=>typeof e[w]=="number"?e[w]:void 0,s=t("app_name"),o=t("media_title")??s;if(!o)return;let l=i("media_season")??t("media_season"),c=i("media_episode")??t("media_episode"),d=t("media_series_title"),u=d&&(l!==void 0||c!==void 0)?`${d} \xB7 ${[l!==void 0?`S${l}`:"",c!==void 0?`E${c}`:""].filter(Boolean).join(" ")}`:d??t("media_artist")??t("media_album_name"),p=a.state==="playing",m=i("media_duration"),f=m!==void 0&&m>0?m:void 0,_=i("media_position"),g=t("media_position_updated_at");return _!==void 0&&p&&g&&!Number.isNaN(Date.parse(g))&&(_+=(n-Date.parse(g))/1e3),_!==void 0&&f!==void 0&&(_=Math.max(0,Math.min(f,_))),{title:o,app:o===s?void 0:s,subtitle:u,picture:t("entity_picture"),playing:p,duration:f,position:f!==void 0?_:void 0}}function ve(a){let n=Math.floor(a),e=Math.floor(n/3600),t=Math.floor(n%3600/60),i=String(n%60).padStart(2,"0");return e?`${e}:${String(t).padStart(2,"0")}:${i}`:`${t}:${i}`}function fi(a,n){let e=Math.max(0,Math.ceil((Date.parse(a)-n)/1e3));return e>=60?ve(e):`${e} s`}function _i(a,n,e){let t=a.names.length?a.names.join(", "):a.outlet;return{text:e("cooling.text",{names:t}),time:e(a.status?"cooling.time_status":"cooling.time",{time:fi(a.until,n)})}}function gi(a,n,e){if(!a)return;let t=a.name??"",i={step:String(a.step??""),steps:String(a.steps??"")},s;switch(a.kind){case"step":{let c=e(`step.${a.step_type}`);s=e("doing.step",{...i,what:t?`${c} (${t})`:c});break}case"wait":s=e("doing.wait",i);break;case"hooks":s=e(`doing.hooks_${a.hook}`);break;case"status":s=a.value?e(`doing.status_${a.target==="off"?"off":"on"}_value`,{name:t,value:a.value}):e(`doing.status_${a.target==="off"?"off":"on"}`,{name:t});break;default:s=e(`doing.${a.kind}`,{name:t})}if(!a.until)return{text:s};let o=fi(a.until,n),l=a.kind==="ready"||a.kind==="status";return{text:s,time:e(l?"doing.at_most":"doing.left",{time:o})}}var Ie=class{constructor(){this.originX=0;this.originY=0;this.startX=0;this.startY=0;this.startTime=0;this.moved=!1}start(n,e,t){this.originX=this.startX=n,this.originY=this.startY=e,this.startTime=t,this.moved=!1}move(n,e){Math.hypot(n-this.startX,e-this.startY)>10&&(this.moved=!0);let t=[];for(;;){let i=n-this.originX,s=e-this.originY;if(Math.max(Math.abs(i),Math.abs(s))<40)return t;Math.abs(i)>=Math.abs(s)?(t.push(i>0?"right":"left"),this.originX+=Math.sign(i)*40,this.originY=e):(t.push(s>0?"down":"up"),this.originY+=Math.sign(s)*40,this.originX=n)}}end(n,e,t){return Math.hypot(n-this.startX,e-this.startY)>10&&(this.moved=!0),!this.moved&&t-this.startTime<=500}};function wt(a,n){return`easy-av-control-touchpad:${a}:${n}`}function vi(a,n){return a==="on"?!0:a==="off"?!1:n}var Ne="easy_av_control",yt={volume_up:"mdi:volume-plus",volume_down:"mdi:volume-minus",mute:"mdi:volume-off",channel_up:"mdi:chevron-up",channel_down:"mdi:chevron-down",play_pause:"mdi:play-pause",play:"mdi:play",pause:"mdi:pause",stop:"mdi:stop",next:"mdi:skip-next",previous:"mdi:skip-previous",up:"mdi:chevron-up",down:"mdi:chevron-down",left:"mdi:chevron-left",right:"mdi:chevron-right",back:"mdi:arrow-u-left-top",menu:"mdi:menu",home:"mdi:home-outline",info:"mdi:information-outline",guide:"mdi:television-guide",exit:"mdi:close",select_source:"mdi:apps"},Ji=["back","home","menu","info","guide","exit"],Qi=["previous","play_pause","play","pause","stop","next"],Xi=new Set(["volume_up","volume_down","up","down","left","right"]),en=400,tn=200;function bi(a){return`easy-av-control-settings:${a}`}var nn=3e4,sn={idle:"mdi:power",starting:"mdi:timer-sand",active:"mdi:power",stopping:"mdi:timer-sand",error:"mdi:alert-circle-outline"},W=class extends v{constructor(){super();this._padChoices=new Map;this._settingsOpen=new Map;this._settingDrafts=new Map;this._view=null,this._loaded=!1}static getConfigElement(){return document.createElement("easy-av-control-card-editor")}static async getStubConfig(e){try{return{room:(await e.callWS({type:`${Ne}/control/rooms`}))[0]?.room??""}}catch{return{room:""}}}setConfig(e){if(!e||typeof e.room!="string")throw new Error("room is required");let t=e.room!==this._config?.room||e.entry_id!==this._config?.entry_id;this._config=e,t&&this._resubscribe()}getCardSize(){return this._view?.remote?8:3}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._pressEnd(!1),window.clearInterval(this._tickTimer),this._tickTimer=void 0,this._unsubscribeNow()}willUpdate(e){e.has("demoView")&&this.demoView&&(this._config={type:"custom:easy-av-control-card",room:this.demoView.room},this._view=this.demoView,this._loaded=!0)}updated(e){let t=this._nowPlaying(),i=t?.playing===!0&&t.duration!==void 0||!!this._view?.current?.until||!!this._view?.cooling?.length;i&&this._tickTimer===void 0?this._tickTimer=window.setInterval(()=>this.requestUpdate(),1e3):!i&&this._tickTimer!==void 0&&(window.clearInterval(this._tickTimer),this._tickTimer=void 0),e.has("hass")&&!this._unsubscribe&&this._retryTimer===void 0&&this._subscribe()}_subscribe(){if(this.demoView||!this.hass||!this._config?.room||this._unsubscribe||!this.isConnected)return;let e={type:`${Ne}/control/subscribe`,room:this._config.room};this._config.entry_id&&(e.entry_id=this._config.entry_id);let t=this.hass.connection.subscribeMessage(i=>{this._unsubscribe===t&&(i?.state==="starting"&&this._view?.state!=="starting"&&(this._from=this._lastActive&&this._lastActive!==i.activity?this._lastActive:void 0),i?.state==="active"&&i.activity&&(this._lastActive=i.activity),i?.state==="idle"&&(this._lastActive=void 0),this._view=i,this._loaded=!0,this._subscribeError=void 0)},e);this._unsubscribe=t,t.catch(i=>{this._unsubscribe===t&&(this._subscribeError=i?.message??String(i),this._loaded=!0,this._unsubscribe=void 0,this._retryTimer=window.setTimeout(()=>{this._retryTimer=void 0,this._subscribe()},nn))})}_unsubscribeNow(){window.clearTimeout(this._retryTimer),this._retryTimer=void 0;let e=this._unsubscribe;this._unsubscribe=void 0,e?.then(t=>t()).catch(()=>{})}_resubscribe(){this._unsubscribeNow(),this._view=null,this._loaded=!1,this._subscribe()}_t(e,t){return q(this.hass?.language,e,t)}_call(e,t={}){if(!(!this.hass||!this._view)){if(this._haptic(),this.demoView){this.dispatchEvent(new CustomEvent("preview-call",{detail:{service:e,data:t}}));return}this.hass.callService(Ne,e,{room:this._view.room,...t}).catch(i=>this._toast(i?.message??String(i)))}}_send(e,t={}){this._call("send_command",{command:e,...t})}_haptic(){this.dispatchEvent(new CustomEvent("haptic",{detail:"light",bubbles:!0,composed:!0}))}_toast(e){this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:e},bubbles:!0,composed:!0}))}_pressStart(e,t,i={}){if(e.button!==0)return;this._pressEnd(!1);let s={command:t,extra:i,sent:!1};this._press=s,Xi.has(t)&&(this._repeatTimer=window.setTimeout(()=>{s.sent=!0,this._send(t,i),this._repeatTimer=window.setInterval(()=>this._send(t,i),tn)},en))}_pressEnd(e){let t=this._press;this._press=void 0,this._stopRepeat(),e&&t&&!t.sent&&this._send(t.command,t.extra)}_stopRepeat(){this._repeatTimer!==void 0&&(window.clearTimeout(this._repeatTimer),window.clearInterval(this._repeatTimer),this._repeatTimer=void 0)}_keySend(e,t,i={}){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._send(t,i))}render(){if(!this._config?.room)return r`<ha-card><div class="message">${this._t("no_room")}</div></ha-card>`;if(!this._loaded)return r`<ha-card><div class="message">${this._t("loading")}</div></ha-card>`;let e=this._view;return e?r`<ha-card>
      ${this._renderHeader(e)} ${this._renderStatus(e)} ${this._renderFlow(e)} ${this._renderNowPlaying()}
      ${this._renderActivities(e)}
      ${e.remote?this._renderRemote(e):h}
    </ha-card>`:r`<ha-card>
        <div class="message warning">
          ${this._subscribeError??this._t("not_found",{room:this._config.room})}
        </div>
      </ha-card>`}_renderHeader(e){let t=e.activities.find(o=>o.id===e.activity),i=e.state!=="idle",s=t?`${t.name} \xB7 ${this._t(`state.${e.state}`)}`:this._t(`state.${e.state}`);return r`<div class="header">
      <div class="title">
        <div class="name">${this._config?.name||e.name}</div>
        <div class="status state-${e.state}">${s}</div>
      </div>
      <button
        class="power ${i?"on":""} state-${e.state}"
        title=${this._t("power")}
        aria-label=${this._t("power")}
        @click=${()=>this._call("toggle_activity")}
      >
        <ha-icon .icon=${sn[e.state]??"mdi:power"}></ha-icon>
      </button>
    </div>`}_renderFlow(e){if(this._config?.show_flow===!1||this.demoView)return h;let t=e.activity??e.default_activity??e.activities[0]?.id;if(!t)return h;let i=e.state==="starting"||e.state==="stopping",s=this._flowOpen??i,o=this._flowDetails??this._config?.flow_details===!0;return r`<div class="flow-bar">
        <button class="chip ${s?"on":""}" @click=${()=>this._flowOpen=!s}>
          <ha-icon icon="mdi:sitemap-outline"></ha-icon>${this._t("flow.show")}
        </button>
        ${s?r`<button class="chip ${o?"on":""}" @click=${()=>this._flowDetails=!o}>
              <ha-icon icon=${o?"mdi:eye-outline":"mdi:eye-off-outline"}></ha-icon>${this._t("flow.details")}
            </button>`:h}
      </div>
      ${s?r`<easy-av-control-flow
            class="live-flow"
            .hass=${this.hass}
            .roomId=${e.room}
            .entryId=${e.entry_id}
            .activityId=${t}
            .from=${e.state==="starting"?this._from:void 0}
            .live=${{state:e.state,current:e.current,activity:e.activity}}
            .details=${o}
          ></easy-av-control-flow>`:h}`}_renderStatus(e){let t=e.state==="starting"||e.state==="stopping",[i,s]=e.progress,o=s>0?Math.round(i/s*100):0,l=t?gi(e.current,Date.now(),(c,d)=>this._t(c,d)):void 0;return r`
      ${t?r`<div
            class="progress"
            role="progressbar"
            aria-label=${this._t(`state.${e.state}`)}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow=${o}
          >
            <div style="width: ${e.state==="starting"?o:100}%"></div>
          </div>`:h}
      ${l?r`<div class="doing" aria-live="polite">
            <span class="doing-text">${l.text}</span>
            ${l.time?r`<span class="doing-time">${l.time}</span>`:h}
          </div>`:h}
      ${(e.cooling??[]).map(c=>{let{text:d,time:u}=_i(c,Date.now(),(p,m)=>this._t(p,m));return r`<div class="doing cooling">
          <span class="doing-text">${d}</span><span class="doing-time">${u}</span>
        </div>`})}
      ${e.state==="error"&&e.error?r`<div class="message error">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>${e.error}
          </div>`:h}
      ${e.warnings.length&&e.state!=="idle"?r`<details class="warnings">
            <summary>${this._t("warnings")} (${e.warnings.length})</summary>
            <ul>
              ${e.warnings.map(c=>r`<li>${c}</li>`)}
            </ul>
          </details>`:h}
    `}_nowPlaying(){let e=this._view?.remote?.media;return mi(e?this.hass?.states[e]:void 0,Date.now())}_renderNowPlaying(){let e=this._nowPlaying();if(!e)return h;let t=[e.app,e.playing?void 0:this._t("now.paused")].filter(Boolean).join(" \xB7 ");return r`<div class="now">
      ${e.picture?r`<img
            class="art"
            src=${e.picture}
            alt=""
            @error=${i=>i.target.style.display="none"}
          />`:h}
      <div class="meta">
        ${t?r`<div class="now-top">${t}</div>`:h}
        <div class="now-title">${e.title}</div>
        ${e.subtitle?r`<div class="now-sub">${e.subtitle}</div>`:h}
        ${e.duration!==void 0&&e.position!==void 0?r`<div class="now-progress" role="progressbar" aria-valuemin="0"
                aria-valuemax=${Math.round(e.duration)} aria-valuenow=${Math.round(e.position)}>
                <div style="width: ${e.position/e.duration*100}%"></div>
              </div>
              <div class="now-time">
                <span>${ve(e.position)}</span><span>${ve(e.duration)}</span>
              </div>`:h}
      </div>
    </div>`}_renderActivities(e){return r`<div class="activities">
      ${e.activities.map(t=>{let i=t.id===e.activity;return r`<button
          class="chip ${i?`current state-${e.state}`:""}"
          aria-pressed=${i?"true":"false"}
          @click=${()=>this._call("start_activity",{activity:t.id})}
        >
          <ha-icon .icon=${t.icon??"mdi:play-circle-outline"}></ha-icon>
          <span>${t.name}</span>
        </button>`})}
    </div>`}_renderRemote(e){let{groups:t,buttons:i}=e.remote,s=t.navigation,o=s?Ji.filter(d=>s.commands.includes(d)):[],l=s?vi(this._padChoice(e),s.touchpad===!0):!1,c=t.transport?Qi.filter(d=>t.transport.commands.includes(d)):[];return c.includes("play_pause")&&(c=c.filter(d=>d!=="play"&&d!=="pause")),r`<div class="remote">
      ${t.volume||s||t.channels?r`<div class="main ${s?"":"no-nav"}">
            ${t.volume?this._renderVolumeRocker(t.volume):s?r`<div></div>`:h}
            ${s?l?this._renderTouchpad(s):this._renderDpad(s):h}
            ${t.channels?this._renderChannelRocker(t.channels):s?r`<div></div>`:h}
          </div>`:h}
      ${t.volume?.commands.includes("volume_set")?this._renderSlider(t.volume):h}
      ${s?r`<div class="row">
            ${o.map(d=>this._key(d))}${this._renderPadSwitch(e,l)}
          </div>`:h}
      ${c.length?r`<div class="row">${c.map(d=>this._key(d))}</div>`:h}
      ${i.length?r`<div class="buttons">${i.map(d=>this._customButton(d))}</div>`:h}
      ${e.remote.settings?.length?this._renderSettings(e,e.remote.settings):h}
    </div>`}_settingsShown(e){let t=bi(e);if(this._settingsOpen.has(t))return this._settingsOpen.get(t);try{return window.localStorage.getItem(t)==="open"}catch{return!1}}_toggleSettings(e){let t=bi(e),i=!this._settingsShown(e);this._settingsOpen.set(t,i);try{window.localStorage.setItem(t,i?"open":"closed")}catch{}this.requestUpdate()}_renderSettings(e,t){let i=this._settingsShown(e.room);return r`<div class="settings">
      <button
        class="settings-toggle"
        aria-expanded=${i?"true":"false"}
        @click=${()=>this._toggleSettings(e.room)}
      >
        <ha-icon icon="mdi:tune-variant"></ha-icon>
        <span>${this._t("settings")}</span>
        <ha-icon class="chevron" .icon=${i?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
      </button>
      ${i?r`<div class="setting-list">
            ${t.map((s,o)=>r`${o===0||t[o-1].device!==s.device?r`<span class="setting-device">${this._settingDevice(s)}</span>`:h}${this._renderSetting(s)}`)}
          </div>`:h}
    </div>`}_renderSetting(e){if(e.setting==="entity")return this._renderEntitySetting(e);let t=this.hass?.states[e.entity_id],i=e.attribute?t?.attributes[e.attribute]:void 0,s=i==null?void 0:String(i);return this._settingRow(e,this._t(`setting.${e.setting}`),this._settingSelect(e,this._t(`setting.${e.setting}`),s,e.options))}_settingDevice(e){return e.name||this.hass?.states[e.device_entity_id]?.attributes.friendly_name||e.device}_settingRow(e,t,i){return r`<div class="setting">
      <span class="setting-name">${t}</span>
      ${i}
    </div>`}_settingSelect(e,t,i,s,o=!1){let l=i!==void 0&&!s.includes(i)?[i,...s]:s;return r`<select
      aria-label=${`${t}, ${this._settingDevice(e)}`}
      .value=${T(i??"")}
      ?disabled=${o||!l.length}
      @change=${c=>{let d=c.target.value;d&&d!==i&&this._send(e.command,{device:e.device,value:d})}}
    >
      ${i===void 0?r`<option value="" disabled>–</option>`:h}
      ${l.map(c=>r`<option value=${c} ?selected=${c===i}>${c}</option>`)}
    </select>`}_renderEntitySetting(e){let t=this.hass?.states[e.entity_id],i=e.label||t?.attributes.friendly_name||e.entity_id,s=!t||t.state==="unavailable"||t.state==="unknown",o=e.entity_id.split(".")[0];if(o==="number"||o==="input_number"){let c=Number(t?.attributes.min??0),d=Number(t?.attributes.max??100),u=Number(t?.attributes.step??1),m=this._settingDrafts.get(e.entity_id)??(s?void 0:Number(t.state)),f=m===void 0||Number.isNaN(m)?"\u2013":`${c<0&&m>0?"+":""}${m}`;return this._settingRow(e,i,r`<span class="setting-range">
          <input
            type="range"
            aria-label=${`${i}, ${this._settingDevice(e)}`}
            min=${c}
            max=${d}
            step=${u}
            .value=${T(String(m??c))}
            ?disabled=${s}
            @input=${_=>{this._settingDrafts.set(e.entity_id,Number(_.target.value)),this.requestUpdate()}}
            @change=${_=>{this._settingDrafts.delete(e.entity_id),this._send(e.command,{device:e.device,value:Number(_.target.value)})}}
          />
          <span class="value">${f}</span>
        </span>`)}if(o==="select"||o==="input_select"){let c=Array.isArray(t?.attributes.options)?t.attributes.options.map(String):[];return this._settingRow(e,i,this._settingSelect(e,i,s?void 0:t.state,e.options.length?e.options:c,s))}let l=t?.state==="on";return this._settingRow(e,i,r`<button
        class="key toggle ${l?"active":""}"
        aria-label=${`${i}, ${this._settingDevice(e)}`}
        aria-pressed=${l?"true":"false"}
        ?disabled=${s}
        @click=${()=>this._send(e.command,{device:e.device,value:l?"off":"on"})}
      >
        ${this._t(l?"toggle.on":"toggle.off")}
      </button>`)}_key(e,t="key",i,s){let o=J(e,l=>this._t(l));return r`<button
      class=${t}
      title=${o}
      aria-label=${o}
      aria-pressed=${s===void 0?h:String(s)}
      @pointerdown=${l=>this._pressStart(l,e)}
      @pointerup=${()=>this._pressEnd(!0)}
      @pointerleave=${()=>this._pressEnd(!1)}
      @pointercancel=${()=>this._pressEnd(!1)}
      @keydown=${l=>this._keySend(l,e)}
      @contextmenu=${l=>l.preventDefault()}
    >
      ${i??r`<ha-icon .icon=${yt[e]??"mdi:circle-small"}></ha-icon>`}
    </button>`}_renderVolumeRocker(e){let t=this._volumeState(e).muted;return r`<div class="rocker">
      ${e.commands.includes("volume_up")?this._key("volume_up"):r`<span></span>`}
      ${e.commands.includes("mute")?this._key("mute",`key label ${t?"active":""}`,r`<ha-icon .icon=${t?"mdi:volume-off":"mdi:volume-high"}></ha-icon>`,t):r`<span class="label">${this._t("rocker.volume")}</span>`}
      ${e.commands.includes("volume_down")?this._key("volume_down"):r`<span></span>`}
    </div>`}_renderChannelRocker(e){return r`<div class="rocker">
      ${e.commands.includes("channel_up")?this._key("channel_up"):r`<span></span>`}
      <span class="label">${this._t("rocker.channels")}</span>
      ${e.commands.includes("channel_down")?this._key("channel_down"):r`<span></span>`}
    </div>`}_renderDpad(e){let t=s=>e.commands.includes(s),i=(s,o)=>t(s)?this._key(s,`key ${o}`,s==="ok"?"OK":void 0):r`<span></span>`;return r`<div class="dpad">
      <span></span>${i("up","up")}<span></span>
      ${i("left","left")}${i("ok","ok")}${i("right","right")}
      <span></span>${i("down","down")}<span></span>
    </div>`}_padChoice(e){if(!e.activity)return null;let t=wt(e.room,e.activity);if(this._padChoices.has(t))return this._padChoices.get(t);try{return window.localStorage.getItem(t)}catch{return null}}_renderPadSwitch(e,t){let i=this._t(t?"pad.show_arrows":"pad.show_touchpad");return r`<button
      class="key pad-switch"
      title=${i}
      aria-label=${i}
      @click=${()=>{if(!e.activity)return;let s=wt(e.room,e.activity),o=t?"off":"on";this._padChoices.set(s,o);try{window.localStorage.setItem(s,o)}catch{}this.requestUpdate()}}
    >
      <ha-icon .icon=${t?"mdi:arrow-all":"mdi:gesture-tap"}></ha-icon>
    </button>`}_renderTouchpad(e){let t=s=>e.commands.includes(s),i={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right",Enter:"ok"," ":"ok"};return r`<div
      class="touchpad"
      role="group"
      tabindex="0"
      aria-label=${this._t("touchpad")}
      title=${this._t("touchpad")}
      @pointerdown=${s=>{s.button===0&&(s.currentTarget.setPointerCapture(s.pointerId),this._swipe=new Ie,this._swipe.start(s.clientX,s.clientY,s.timeStamp))}}
      @pointermove=${s=>{for(let o of this._swipe?.move(s.clientX,s.clientY)??[])t(o)&&this._send(o)}}
      @pointerup=${s=>{let o=this._swipe?.end(s.clientX,s.clientY,s.timeStamp);this._swipe=void 0,o&&t("ok")&&this._send("ok")}}
      @pointercancel=${()=>this._swipe=void 0}
      @keydown=${s=>{let o=i[s.key];o&&t(o)&&(s.preventDefault(),this._send(o))}}
      @contextmenu=${s=>s.preventDefault()}
    >
      <span class="touchpad-hint">${this._t("touchpad.hint")}</span>
    </div>`}_volumeState(e){let t=e.entity_id?this.hass?.states[e.entity_id]:void 0,i=t?.attributes.volume_level;return{level:typeof i=="number"?i:void 0,muted:t?.attributes.is_volume_muted===!0}}_renderSlider(e){let{level:t}=this._volumeState(e),i=this._volumeDraft??(t!==void 0?Math.round(t*100):0);return r`<div class="slider">
      <ha-icon icon="mdi:volume-medium"></ha-icon>
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        .value=${String(i)}
        ?disabled=${t===void 0}
        aria-label=${this._t("volume")}
        @input=${s=>{this._volumeDraft=Number(s.target.value)}}
        @change=${s=>{let o=Number(s.target.value);this._volumeDraft=void 0,this._send("volume_set",{value:o/100})}}
      />
      <span class="value">${t!==void 0||this._volumeDraft!==void 0?i:"\u2013"}</span>
    </div>`}_customButton(e){let t=e.name??J(e.command,s=>this._t(s)),i={};return e.device&&(i.device=e.device),e.value!==null&&e.value!==void 0&&(i.value=e.value),r`<button
      class="custom"
      title=${t}
      @pointerdown=${s=>this._pressStart(s,e.command,i)}
      @pointerup=${()=>this._pressEnd(!0)}
      @pointerleave=${()=>this._pressEnd(!1)}
      @pointercancel=${()=>this._pressEnd(!1)}
      @keydown=${s=>this._keySend(s,e.command,i)}
    >
      ${e.icon||yt[e.command]?r`<ha-icon .icon=${e.icon??yt[e.command]}></ha-icon>`:h}
      <span>${t}</span>
    </button>`}};W.properties={hass:{attribute:!1},demoView:{attribute:!1},_flowOpen:{state:!0},_flowDetails:{state:!0},_config:{state:!0},_view:{state:!0},_loaded:{state:!0},_subscribeError:{state:!0},_volumeDraft:{state:!0}},W.styles=b`
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
  `;customElements.get("easy-av-control-card")||customElements.define("easy-av-control-card",W);function on(a,n){let e=a.entities?.[n]?.device_id,i=(e?a.devices?.[e]:void 0)?.identifiers?.find(([s])=>s===Ne);return i?i[1]:null}var He=window;He.customCards=He.customCards??[];He.customCards.some(a=>a.type==="easy-av-control-card")||He.customCards.push({type:"easy-av-control-card",name:"Easy AV Control Remote",description:"Remote control for an Easy AV Control room",preview:!0,documentationURL:"https://github.com/Ltek/easy-av-control#the-card",getEntitySuggestion:(a,n)=>{let e=on(a,n);return e?{config:{type:"custom:easy-av-control-card",room:e}}:null}});var kt=class extends W{};customElements.get("easy-av-control-preview-card")||customElements.define("easy-av-control-preview-card",kt);var rn=400,be=class extends v{constructor(){super(...arguments);this._request=0}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._timer)}willUpdate(e){if(e.has("activityId")&&(this._pressed=void 0),["room","roomId","activityId"].some(t=>e.has(t))){window.clearTimeout(this._timer);let t=this._preview===void 0&&this._failed===void 0;this._timer=window.setTimeout(()=>this._load(),t?0:rn)}}async _load(){let e=++this._request;try{let t=await this.hass.callWS({type:"easy_av_control/config/remote",room:this.roomId,config:this.room,activity:this.activityId});e===this._request&&(this._preview=t,this._failed=void 0)}catch(t){e===this._request&&(this._failed=t.message??String(t))}}_t(e,t){return S(this.hass?.language,e,t)}_entity(e){let t=String(e??"");return this.hass.states[t]?.attributes.friendly_name||t}_device(e){let t=String(e??""),i=this.room.devices?.[t];return i?.name||(i?.entity_id?this._entity(i.entity_id):"")||t}_button(e,t){let[i,s]=t.split("|"),o=e.remote?.buttons.find(c=>c.command===i&&(c.device??"")===s);if(o?.name)return o.name;let l=e.remote?.settings?.find(c=>c.command===i&&c.device===s);return l?.setting==="entity"?l.label||this._entity(l.entity_id):J(i,c=>this._t(c))}_onCall(e){let{service:t,data:i}=e.detail;t==="send_command"&&(this._pressed=`${i.command}|${i.device??""}`)}_describe(e){let t=e.device?this._device(e.device):this._t("preview.this_activity");switch(e.via){case"media_player":case"entity":return{to:t,how:`${e.action} \u2192 ${this._entity(e.entity_id)}`};case"remote":return{to:t,how:`remote.send_command "${e.key}" \u2192 ${this._entity(e.entity_id)}`};case"device_commands":return{to:t,how:this._t("preview.device_commands",{actions:(e.actions??[]).join(", ")})};case"activity_commands":return{to:t,how:this._t("preview.activity_commands",{actions:(e.actions??[]).join(", ")})};default:return{to:t,how:e.device?this._t("preview.unknown_on_device",{device:t}):this._t("preview.unknown")}}}_renderPressed(e,t){let i=this._pressed?t[this._pressed]:void 0;if(!this._pressed||!i)return r`<p class="pressed hint">${this._t("preview.tap")}</p>`;let{to:s,how:o}=this._describe(i);return r`<p class="pressed ${i.via?"":"bad"}">
      <span class="what">${this._button(e,this._pressed)} → ${s}</span>
      <span class="how">${o}</span>
      ${i.ready?r`<span class="note">${this._t("preview.ready")}</span>`:h}
    </p>`}_renderRoutes(e){return r`<h4>${this._t("preview.groups")}</h4>
      <ul class="routes">
        ${e.map(t=>{let i=t.mode==="hidden"?this._t("preview.hidden"):t.device?`${this._device(t.device)} (${this._t(`preview.mode_${t.mode}`)})`:this._t("preview.no_device"),s=t.commands.length?t.commands.map(o=>J(o,l=>this._t(l))).join(", "):t.mode==="hidden"?"":t.device?this._t("preview.no_keys",{device:this._device(t.device)}):"";return r`<li class=${t.commands.length?"":"off"}>
            <span class="group">${this._t(`field.${t.group}`)}</span>
            <span class="where">${i}</span>
            ${s?r`<span class="keys">${s}</span>`:h}
          </li>`})}
      </ul>`}render(){if(this._failed)return r`<p class="error">${this._t("flow.failed",{error:this._failed})}</p>`;let e=this._preview;if(!e)return r`<p class="hint">${this._t("loading")}</p>`;if(e.error){let l=e.error.path.join(".");return r`<p class="error">
        ${this._t("flow.invalid",{error:l?`${l}: ${e.error.message}`:e.error.message})}
      </p>`}let{view:t,targets:i,routes:s}=e,o=Object.entries(i).filter(([,l])=>!l.via);return r`<div class="layout">
      <div class="card">
        <easy-av-control-preview-card
          .hass=${this.hass}
          .demoView=${t}
          @preview-call=${this._onCall}
        ></easy-av-control-preview-card>
      </div>
      <div class="info">
        ${this._renderPressed(t,i)}
        ${o.length?r`<div class="dead">
              <span>${this._t("preview.dead")}</span>
              <ul>
                ${o.map(([l,c])=>r`<li>${this._button(t,l)}: ${this._describe(c).how}</li>`)}
              </ul>
            </div>`:h}
        ${this._renderRoutes(s)}
      </div>
    </div>`}};be.properties={hass:{attribute:!1},room:{attribute:!1},roomId:{attribute:!1},activityId:{attribute:!1},_preview:{state:!0},_failed:{state:!0},_pressed:{state:!0}},be.styles=[k,x,$,b`
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
      font-size: var(--ltek-fs-small);
    }
    .note {
      font-size: var(--ltek-fs-small);
      color: var(--secondary-text-color);
    }
    .dead {
      color: var(--error-color, #db4437);
      font-size: var(--ltek-fs-body);
      margin-bottom: 12px;
    }
    .dead ul {
      margin: 4px 0 0;
      padding-left: 20px;
    }
    h4 {
      font-size: var(--ltek-fs-group);
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
      font-size: var(--ltek-fs-small);
      color: var(--secondary-text-color);
    }
    .error {
      color: var(--error-color, #db4437);
      margin: 0;
    }
    p.hint {
      color: var(--secondary-text-color);
    }
  `];customElements.get("easy-av-control-remote-preview")||customElements.define("easy-av-control-remote-preview",be);function an(a){let n=(a??"").split(",").map(e=>e.trim()).filter(Boolean);return n.length>1?n:n[0]}var G=(a,n=1,e=0)=>({number:{min:e,max:a,step:n,mode:"slider",unit_of_measurement:"s"}}),$t=G(600),ln={section_device:"mdi:television",section_state:"mdi:state-machine",section_power:"mdi:power-socket-eu",section_delays:"mdi:timer-sand",section_ready:"mdi:lan-connect",card_settings:"mdi:tune-vertical",section_general:"mdi:information-outline",section_activity_devices:"mdi:format-list-numbered",section_checks:"mdi:check-decagram-outline",steps:"mdi:playlist-play",remote:"mdi:remote",quick_select:"mdi:gesture-tap-button",section_flow:"mdi:sitemap-outline",section_remote_preview:"mdi:cellphone-screenshot"},wi=G(120),cn=[["section_device","mdi:television"],["section_state","mdi:state-machine"],["section_power","mdi:power-socket-eu"],["section_delays","mdi:timer-sand"],["section_ready","mdi:lan-connect"]],yi={section_device:"hint_device",section_state:"hint_state",section_power:"hint_power",section_delays:"hint_delays",section_ready:"hint_ready"},we=class extends v{constructor(){super();this._relatedKey="";this._detectAsked=new Set;this._powerMemo=new Map;this._openPanel=new Map;this._label=e=>this._t(`field.${e.name}`);this._helper=e=>{let t=`helper.${e.name}`,i=this._t(t);return i===t?void 0:i};this._tab="devices",this._view={kind:"list"},this.sources={},this.soundModes={},this._related={},this._detect={},this.profiles=[],this._powerOn=new Set}_loadRelated(){let e=[...new Set(Object.values(this.room?.devices??{}).map(i=>i.entity_id).filter(Boolean))].sort(),t=e.join(",");!this.hass||t===this._relatedKey||(this._relatedKey=t,this.hass.callWS({type:"easy_av_control/config/related",entity_ids:e}).then(i=>{t===this._relatedKey&&(this._related=i)}).catch(()=>{}))}willUpdate(e){(e.has("room")||e.has("hass"))&&this._loadRelated(),e.has("roomId")&&e.get("roomId")!==void 0&&(this._view={kind:"list"},this._notice=void 0),e.has("_view")&&(this._flowEditing=void 0,this._draftStartedBy=void 0);let t=this.jump;e.has("jump")&&t&&!t.activity?(this._view={kind:"list"},this._notice=void 0):e.has("jump")&&t?.activity&&this.room?.activities?.[t.activity]&&(this._view={kind:"activity",id:t.activity},this._notice=void 0,t.flow&&this._openPanel.set(this._pageKey(),`activity:${this._t("section_flow")}`),window.scrollTo({top:0})),(e.has("_view")||e.has("roomId")||e.has("jump"))&&this.dispatchEvent(new CustomEvent("view-changed",{detail:{view:this._view}}))}_t(e,t){return S(this.hass?.language,e,t)}_emit(e){this.dispatchEvent(new CustomEvent("room-changed",{detail:{room:e}}))}_show(e){this._view=e,this._notice=void 0,window.scrollTo({top:0})}render(){this._firstPanel=void 0;let e=this._view;if(e.kind==="device"&&this.room.devices?.[e.id])return this._renderDevice(e.id,this.room.devices[e.id]);if(e.kind==="activity"&&this.room.activities?.[e.id])return this._renderActivity(e.id,this.room.activities[e.id]);let t=[{value:"__last",label:this._t("default_last")},...Object.entries(this.room.activities??{}).map(([i,s])=>({value:i,label:s.name??i}))];return r`
      <ltek-form
        .hass=${this.hass}
        .data=${{name:this.room.name??"",area_id:this.room.area_id??void 0,default_activity:this.room.default_activity??"__last"}}
        .schema=${[{name:"name",required:!0,selector:{text:{}}},{name:"area_id",selector:{area:{}}},{name:"default_activity",selector:{select:{options:t,mode:"dropdown"}}}]}
        .computeLabel=${i=>this._t(`room_${i.name==="area_id"?"area":i.name}`)}
        .computeHelper=${this._helper}
        @value-changed=${i=>{let s=i.detail.value;this._emit(y({...this.room,name:s.name,area_id:s.area_id,default_activity:s.default_activity==="__last"?void 0:s.default_activity}))}}
      ></ltek-form>

      <div class="tabs" role="tablist">
        ${["devices","activities","yaml"].map(i=>r`<button
            role="tab"
            class=${this._tab===i?"active":""}
            aria-selected=${this._tab===i?"true":"false"}
            @click=${()=>this._tab=i}
          >
            ${this._t(`tab_${i}`)}
          </button>`)}
      </div>
      ${this._notice?r`<div class="notice">${this._notice}</div>`:h}
      ${this._tab==="devices"?this._renderDeviceList():this._tab==="activities"?this._renderActivityList():this._renderYaml()}
      <button class="ltek-btn danger delete-room" @click=${()=>this.dispatchEvent(new CustomEvent("delete-room"))}>
        <ha-icon icon="mdi:trash-can-outline"></ha-icon>
        ${this._t("delete_room")}
      </button>
    `}_detailHeader(e,t,i,s){return r`<div class="detail-head">
        <button class="back" @click=${()=>this._show({kind:"list"})}>
          <ha-icon icon="mdi:arrow-left"></ha-icon>
          <span>${e}</span>
        </button>
        <button class="ltek-btn danger" @click=${i}>
          <ha-icon icon="mdi:trash-can-outline"></ha-icon> ${this._t("delete")}
        </button>
      </div>
      <div class="title-row"><h2>${t}</h2>${s??h}</div>
      ${this._notice?r`<div class="notice">${this._notice}</div>`:h}`}_runButtons(e){let t=!!this.saved?.activities?.[e],i=o=>{let l=o.currentTarget;l.setPointerCapture?.(o.pointerId),l.classList.add("holding"),this._holdTimer=window.setTimeout(()=>{l.classList.remove("holding"),this._holdTimer=void 0,this.hass.callService("easy_av_control","start_activity",{room:this.roomId,activity:e})},3e3)},s=o=>{o.currentTarget.classList.remove("holding"),window.clearTimeout(this._holdTimer),this._holdTimer=void 0};return r`<span class="run-buttons">
      <button
        class="run-btn startup"
        title=${`${this._t("act_hold")}. ${this._t("act_saved_only")}`}
        ?disabled=${!t}
        @pointerdown=${i}
        @pointerup=${s}
        @pointerleave=${s}
        @pointercancel=${s}
        @contextmenu=${o=>o.preventDefault()}
      >
        <span class="fill"></span><ha-icon icon="mdi:play"></ha-icon>${this._t("act_startup")}
      </button>
      <button
        class="run-btn shutdown"
        title=${this._t("act_shutdown")}
        @click=${()=>this.hass.callService("easy_av_control","stop_activity",{room:this.roomId})}
      >
        <ha-icon icon="mdi:stop"></ha-icon>${this._t("act_shutdown")}
      </button>
    </span>`}_panel(e,t,i,s,o,l=!0){let c=this._pageKey();l&&this._firstPanel===void 0&&(this._firstPanel=e);let u=(this._openPanel.get(c)??this._firstPanel)===e;return r`<details
      class="ltek-sec"
      .open=${T(u)}
      @toggle=${p=>{let m=p.target.open,f=this._openPanel.get(c)??this._firstPanel;m&&f!==e?(this._openPanel.set(c,e),this.requestUpdate()):!m&&f===e&&(this._openPanel.set(c,""),this.requestUpdate())}}
    >
      <summary><ha-icon icon=${t}></ha-icon>${i}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="ltek-body">${s?r`<p class="ltek-hint">${s}</p>`:h}${o}</div>
    </details>`}_pageKey(){let e=this._view;return e.kind==="list"?`list:${this.roomId}`:`${e.kind}:${this.roomId}:${e.id}`}_card(e,t,i,s){let o=Object.entries(ln).find(([l])=>this._t(l)===e);return this._panel(`${this._view.kind}:${e}`,s??o?.[1]??"mdi:tune-variant",e,t,i)}_advanced(e,t){let i=this._t("section_advanced");return this._panel(`${this._view.kind}:${i}`,"mdi:cog-outline",i,e,t,!1)}_deviceTitle(e,t){let i=t.entity_id?this.hass.states[t.entity_id]:void 0;return t.name||i?.attributes.friendly_name||(t.entity_id?e:this._t("new_device"))}_renderDeviceList(){let e=Object.entries(this.room.devices??{});return r`
      <p class="ltek-hint">${this._t("devices_intro")}</p>
      <div class="ltek-list">
        <button class="ltek-add" @click=${this._addDevice}>+ ${this._t("add_device")}</button>
      ${e.length?r`
            ${e.map(([t,i])=>{let s=!i.entity_id||this._entityKnown(i.entity_id);return this._row(this._deviceTitle(t,i),i.entity_id||this._t("no_entity"),()=>this._show({kind:"device",id:t}),s?void 0:this._t("entity_missing"),this._deviceIcon(i))})}`:r`<p class="ltek-hint">${this._t("devices_empty")}</p>`}
      </div>
    `}_entityKnown(e){return e in this.hass.states||e in(this.hass.entities??{})}_row(e,t,i,s,o="mdi:play-circle-outline"){return r`<button class="ltek-item" @click=${i}>
      <ha-icon class="lead" icon=${o}></ha-icon>
      <span class="ltek-item-text">
        <span class="ltek-name">${e}</span>
        <span class="ltek-subline">${t}</span>
        ${s?r`<span class="ltek-warn ltek-subline">${s}</span>`:h}
      </span>
      <ha-icon class="ltek-act" icon="mdi:chevron-right"></ha-icon>
    </button>`}_deviceIcon(e){let i=(e.entity_id?this.hass.states[e.entity_id]:void 0)?.attributes.icon;if(i)return i;let s=e.entity_id?.split(".")[0];return s==="remote"?"mdi:remote":s==="switch"?"mdi:power-socket-eu":"mdi:television"}_deviceData(e){let t=e.ready??null;return{entity_id:e.entity_id,name:e.name,remote_entity:e.remote_entity??void 0,power_switch:e.power_switch??void 0,delay_after_power:e.delay_after_power,delay_after_on:e.delay_after_on,delay_after_off:e.delay_after_off,turn_off_after:e.turn_off_after,option:e.option,off_option:e.off_option,ready_enabled:t!==null,ready_entity:t?.entity_id,ready_state:Array.isArray(t?.state)?t?.state.join(", "):t?.state,ready_timeout:t?.timeout,ready_reload:t?.reload_integration,ready_on_timeout:t?.on_timeout,commands:e.commands}}_deviceForm(e,t,i,s=!1){return r`<ltek-form
      .hass=${this.hass}
      .disabled=${s}
      .data=${t}
      .schema=${i}
      .computeLabel=${this._label}
      .computeHelper=${this._helper}
      @value-changed=${o=>this._deviceChanged(e,{...t,...o.detail.value})}
    ></ltek-form>`}_remoteOf(e){let t=this.hass.entities??{},i=e?t[e]?.device_id:void 0;if(i)return Object.values(t).find(s=>s?.device_id===i&&s.entity_id.startsWith("remote."))?.entity_id}_renderDevice(e,t){let i=this._deviceData(t),s=ht(this.room,e);return r`
      ${this._detailHeader(this._t("tab_devices"),this._deviceTitle(e,t),()=>this._deleteDevice(e))}
      ${s.length?r`<p class="ltek-hint">${this._t("used_by",{where:s.join(", ")})}</p>`:h}

      ${cn.map(([o,l])=>this._card(this._t(o),this._t(yi[o]),this._deviceSection(e,t,o),l))}
      ${this._advanced(this._t("hint_device_advanced"),r`<label class="id">
            ${this._t("device_id")}
            <input
              .value=${e}
              @change=${o=>this._renameDevice(e,o.target.value)}
            />
          </label>
          ${this._deviceForm(e,i,[{name:"commands",selector:{object:{}}}])}`)}
      ${this._cardDivider()}
      ${this._card(this._t("card_settings"),this._t("device_settings_hint"),this._renderDeviceSettings(e,t))}
    `}_deviceSection(e,t,i){let s=this._deviceData(t),o=t.ready??null,l=this._remoteOf(t.entity_id),c=o?.entity_id===l&&o?.reload_integration===!0&&t.remote_entity===l,d=/^(input_)?select\./.test(t.entity_id??""),u=(t.entity_id?this.hass.states[t.entity_id]?.attributes.options:void 0)??[],p=m=>({select:{options:m.map(f=>({value:f,label:f})),mode:"dropdown",custom_value:!0}});switch(i){case"section_device":return this._deviceForm(e,s,[{name:"entity_id",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"remote_entity",selector:{entity:{filter:{domain:"remote"}}}},...d?[{name:"option",selector:p(u.filter(m=>m!==(t.off_option??"power_off")))},{name:"off_option",selector:p(u)}]:[]]);case"section_state":return this._renderState(e,t);case"section_power":return this._renderPower(e,t,s);case"section_delays":return this._deviceForm(e,s,[{name:"delay_after_on",selector:$t},{name:"delay_after_off",selector:$t},{name:"turn_off_after",selector:G(1800,10)}]);case"section_ready":return r`${l&&!c?r`<button class="ltek-btn preset" @click=${()=>this._applyReadyPreset(e,t,l)}>
                ${this._t("ready_preset",{entity:l})}
              </button>`:h}
          ${this._deviceForm(e,s,[{name:"ready_enabled",selector:{boolean:{}}},...o!==null?[{name:"ready_entity",selector:{entity:{}}},{name:"ready_state",selector:{text:{}}},{name:"ready_timeout",selector:$t},{name:"ready_reload",selector:{boolean:{}}},{name:"ready_on_timeout",selector:{select:{options:[{value:"abort",label:this._t("on_timeout_abort")},{value:"continue",label:this._t("on_timeout_continue")}],mode:"dropdown"}}}]:[]])}`;default:return r``}}_renderPower(e,t,i){let s=!!t.power_switch||this._powerOn.has(e),o=l=>{let c=new Set(this._powerOn),d={...t};l?(Object.assign(d,this._powerMemo.get(e)??{}),d.power_switch||c.add(e)):(t.power_switch&&this._powerMemo.set(e,{power_switch:t.power_switch,delay_after_power:t.delay_after_power}),delete d.power_switch,delete d.delay_after_power,c.delete(e)),this._powerOn=c,this._emit({...this.room,devices:{...this.room.devices,[e]:y(d)}})};return r`<label class="check">
        <input type="checkbox" .checked=${T(s)} @change=${l=>o(l.target.checked)} />
        ${this._t("power_use")}
      </label>
      <div class=${s?"":"unused"}>
        ${this._deviceForm(e,s?i:{...i,...this._powerMemo.get(e)??{}},[{name:"power_switch",selector:{entity:{filter:{domain:["switch","input_boolean","light"]}}}},{name:"delay_after_power",selector:wi}],!s)}
      </div>`}_detectFor(e){if(!e.entity_id||!this.hass)return;let t=Object.fromEntries(ze.filter(s=>e[s]!==void 0).map(s=>[s,e[s]])),i=JSON.stringify([e.entity_id,t]);return this._detectAsked.has(i)||(this._detectAsked.add(i),this.hass.callWS({type:"easy_av_control/config/detect",entity_id:e.entity_id,device:t}).then(s=>this._detect={...this._detect,[i]:s}).catch(()=>this._detectAsked.delete(i))),this._detect[i]}_renderState(e,t){let i=this._detectFor(t);if(!t.entity_id)return r`<p class="ltek-hint">${this._t("no_entity")}</p>`;let s=qt(t,i),o=t.entity_id?this.hass.entities?.[t.entity_id]?.platform:void 0,l=[{value:"__auto",label:this._t("profile.auto")},...this.profiles.filter(m=>!m.generic&&(m.integration===o||m.id===t.profile)).map(m=>({value:m.id,label:`${m.name} (${this._t(m.source==="user"?"profiles_yours":"profiles_builtin")})`}))],c=!!i?.state,d=(m,f)=>f.map(_=>({value:_,label:this._t(`${m}.${_}`)})),u=et.map(m=>({value:m,label:this._t(m==="stop"?"failure_off.stop":`failure.${m}`)})),p=[...l.length>1?[{name:"profile",selector:{select:{options:l,mode:"dropdown"}}}]:[],{name:"state_source",selector:{select:{mode:"dropdown",options:[{value:"auto",label:this._t("state_source.auto")},{value:"none",label:this._t("state_source.none")},...s.state_source==="custom"?[{value:"custom",label:"YAML"}]:[]]}}},...c?[{name:"wait_on",selector:{select:{mode:"dropdown",options:d("wait",Xe)}}},{name:"timeout_on",selector:G(600,5,5)},{name:"on_failure_on",selector:{select:{mode:"dropdown",options:d("failure",et)}}},{name:"wait_off",selector:{select:{mode:"dropdown",options:d("wait",Xe)}}},{name:"timeout_off",selector:G(900,5,5)},{name:"on_failure_off",selector:{select:{mode:"dropdown",options:u}}},{name:"debounce",selector:G(30,.5)},...i?.found?.picture?[{name:"on_failure_picture",selector:{select:{mode:"dropdown",options:d("failure",["warn","stop"])}}}]:[]]:[]];return r`${this._renderDetected(e,t,i)}
      ${i&&!c?r`<p class="ltek-hint">${this._t("state_fixed_only")}</p>`:h}
      <ltek-form
        .hass=${this.hass}
        .data=${s}
        .schema=${p}
        .computeLabel=${m=>this._t(m.name==="state_source"?"state_source":`field.${m.name}`)}
        .computeHelper=${this._helper}
        @value-changed=${m=>{let f=Zt(t,{...s,...m.detail.value},i);this._emit({...this.room,devices:{...this.room.devices,[e]:f}})}}
      ></ltek-form>`}_renderDetected(e,t,i){if(!i)return r`<p class="ltek-hint">${this._t("loading")}</p>`;if(!i.profile)return r`<p class="ltek-hint">${this._t("detected_none")}</p>`;let{profile:s,found:o,state:l}=i,c=Yt(t,i),d=[];if(o?.indicator&&d.push(this._t("detected_found_indicator",{entity:this._entityName(o.indicator)})+(o.attribute?`, ${this._t("detected_found_attribute",{attribute:o.attribute})}`:"")),o?.remote_entity&&d.push(this._t("detected_found_remote",{entity:this._entityName(o.remote_entity)})),o?.power_switch&&d.push(this._t("detected_found_outlet",{entity:this._entityName(o.power_switch)})),o?.settings?.length&&d.push(this._t("detected_found_settings",{entities:o.settings.map(u=>this._entityName(u)).join(", ")})),i.siblings.length){d.push(this._t("detected_siblings",{integrations:i.siblings.map(p=>p.integration).join(", ")}));let u=Object.entries(i.roles).filter(([,p])=>p).map(([p,m])=>this._t("detected_role",{role:this._t(`role.${p}`),integration:m}));u.length&&d.push(u.join(" \xB7 "))}return r`<div class="ltek-item detected open">
      <ha-icon class="lead" icon="mdi:auto-fix"></ha-icon>
      <span class="ltek-item-text">
        <span class="ltek-name">${this._t("detected",{name:s.name})}</span>
        ${d.map(u=>r`<span class="ltek-subline">${u}</span>`)}
        ${l?r`<span class="ltek-subline">${this._t("detected_now",{value:l.value??l.group})}</span>`:h}
        ${this._timingLines(i).map(u=>r`<span class="ltek-subline">${u}</span>`)}
      </span>
      <span class="ltek-badge ${s.source==="user"?"lib":"accent"}">
        ${this._t(s.source==="user"?"profiles_yours":"profiles_builtin")}
      </span>
      ${s.tested?h:r`<span class="ltek-badge warn" title=${this._t("profile_untested")}>!</span>`}
      ${Object.keys(c).length?r`<button
            class="ltek-btn primary"
            @click=${()=>this._emit({...this.room,devices:{...this.room.devices,[e]:{...t,...c}}})}
          >
            ${this._t("detected_use")}
          </button>`:r`<span class="ltek-badge ok">${this._t("detected_applied")}</span>`}
      ${Object.keys(it(t,i)).length?r`<button
            class="ltek-btn"
            title=${this._t("timing_use_hint")}
            @click=${()=>this._emit({...this.room,devices:{...this.room.devices,[e]:{...t,...it(t,i)}}})}
          >
            ${this._t("timing_use")}
          </button>`:h}
    </div>`}_timingLines(e){let t=e.timings;if(!t)return[];let i=[];for(let s of["on","off"]){let o=t[s];!o?.samples||o.typical===null||i.push(this._t(`timing_${s}`,{typical:tt(o.typical),count:String(o.samples),slowest:tt(o.slowest??o.typical)}))}return i}_entityName(e){return this.hass.states[e]?.attributes.friendly_name??e}_applyReadyPreset(e,t,i){let s={entity_id:i,state:"on",timeout:60,reload_integration:!0,on_timeout:"continue"};this._emit({...this.room,devices:{...this.room.devices,[e]:{...t,ready:s,remote_entity:i}}})}_unsaved(e,t){return!(t in(this.saved?.[e]??{}))}_deviceChanged(e,t){let i=y({entity_id:t.entity_id,name:t.name,remote_entity:t.remote_entity,power_switch:t.power_switch,ready:t.ready_enabled?y({entity_id:t.ready_entity,state:an(t.ready_state),timeout:t.ready_timeout,reload_integration:t.ready_reload,on_timeout:t.ready_on_timeout}):void 0,delay_after_power:t.power_switch?t.delay_after_power:void 0,delay_after_on:t.delay_after_on,delay_after_off:t.delay_after_off,turn_off_after:t.turn_off_after||void 0,option:t.option,off_option:t.off_option,commands:t.commands}),s=this.room.devices?.[e]??{};for(let d of ze)s[d]!==void 0&&(i[d]=s[d]);let o=this.room.devices?.[e]?.settings;o!==void 0&&(i.settings=o),t.ready_enabled&&!i.ready&&(i.ready={});let l={...this.room,devices:{...this.room.devices,[e]:i}},c=i.entity_id?.split(".")[1];if(c&&this._unsaved("devices",e)&&i.entity_id!==this.room.devices?.[e]?.entity_id){let d=j(B(c),Object.keys(l.devices??{}).filter(u=>u!==e));if(d!==e){this._emit(mt(l,e,d)),this._view={kind:"device",id:d};return}}this._emit(l)}_addDevice(){let e=j("device",Object.keys(this.room.devices??{}));this._emit({...this.room,devices:{...this.room.devices,[e]:{entity_id:""}}}),this._show({kind:"device",id:e})}_renameDevice(e,t){let i=B(t);if(!i||i===e){this.requestUpdate();return}let s=j(i,Object.keys(this.room.devices??{}).filter(o=>o!==e));this._emit(mt(this.room,e,s)),this._view={kind:"device",id:s}}_deleteDevice(e){let t=ht(this.room,e);if(t.length){this._notice=this._t("device_in_use",{id:e,where:t.join(", ")});return}if(!window.confirm(`${this._t("delete")}: ${this._deviceTitle(e,this.room.devices[e])}?`))return;let i={...this.room.devices};delete i[e],this._emit({...this.room,devices:i}),this._show({kind:"list"})}_renderActivityList(){let e=Me(this.room),t=i=>(i.devices??[]).map(s=>this.room.devices?.[s]?.name??s).join(" \u2192 ");return r`
      <p class="ltek-hint">${this._t("activities_intro")}</p>
      <div class="ltek-list">
        ${Object.keys(this.room.devices??{}).length?r`<button class="ltek-add" @click=${this._addActivity}>+ ${this._t("add_activity")}</button>`:r`<p class="ltek-hint">${this._t("needs_devices")}</p>`}
        ${e.length?e.map(([i,s])=>this._row(s.name??i,t(s)||this._t("no_devices"),()=>this._show({kind:"activity",id:i}),void 0,s.icon??"mdi:play-circle-outline")):r`<p class="ltek-hint">${this._t("activities_empty")}</p>`}
      </div>
    `}_setActivity(e,t){this._emit({...this.room,activities:{...this.room.activities,[e]:y(t)}})}_renderActivity(e,t){let i=t.devices??[],s=[{value:"__auto",label:this._t("route_auto")},{value:"__none",label:this._t("route_none")},...i.map(d=>({value:d,label:this.room.devices?.[d]?.name??d}))],o=t.remote??{},l={};for(let d of V)l[d]=d in o?o[d]===null?"__none":o[d]:"__auto";l.touchpad=o.touchpad===!0?"on":o.touchpad===!1?"off":"auto";let c=(o.buttons??[]).filter(d=>!me(d));return r`
      ${this._detailHeader(this._t("tab_activities"),t.name??e,()=>this._deleteActivity(e,t),this._runButtons(e))}

      ${this._card(this._t("section_flow"),`${this._t("hint_flow")} ${this._t("flow.edit_hint")}`,this._renderFlowEditor(e,t))}

      ${this._card(this._t("section_general"),this._t("hint_general"),r`<ltek-form
          .hass=${this.hass}
          .data=${{name:t.name,icon:t.icon,order:t.order}}
          .schema=${[{name:"name",required:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"order",selector:{number:{min:0,max:999,mode:"box"}}}]}
          .computeLabel=${this._label}
          @value-changed=${d=>{let u=d.detail.value;this._activityGeneralChanged(e,t,u)}}
        ></ltek-form>`)}

      ${this._advanced(this._t("hint_activity_advanced"),r`<p class="ltek-hint">${this._t("activity_id_hint",{id:e})}</p>
          <ltek-form
            .hass=${this.hass}
            .data=${{buttons:c,activity_commands:t.commands}}
            .schema=${[{name:"activity_commands",selector:{object:{}}}]}
            .computeLabel=${this._label}
            @value-changed=${d=>this._extrasChanged(e,t,d.detail.value)}
          ></ltek-form>`)}

      ${this._cardDivider()}
      ${this._card(this._t("remote"),this._t("hint_remote"),r`<ltek-form
          .hass=${this.hass}
          .data=${l}
          .schema=${[...V.map(d=>({name:d,selector:{select:{options:s,mode:"dropdown"}}})),{name:"touchpad",selector:{select:{options:["auto","on","off"].map(d=>({value:d,label:this._t(`touchpad_${d}`)})),mode:"dropdown"}}}]}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${d=>this._routesChanged(e,t,d.detail.value)}
        ></ltek-form>`)}

      ${this._card(this._t("quick_select"),this._t("quick_select_hint"),this._renderQuickSelect(e,t))}

      ${this._card(this._t("card_settings"),this._t("card_settings_hint"),this._renderCardSettings(e,t))}

      ${this._card(this._t("section_remote_preview"),this._t("hint_remote_preview"),r`<easy-av-control-remote-preview
          .hass=${this.hass}
          .room=${this.room}
          .roomId=${this.roomId}
          .activityId=${e}
        ></easy-av-control-remote-preview>`)}

      ${this._panel(`activity:${this._t("card_extra")}`,"mdi:gesture-tap-box",this._t("card_extra"),this._t("hint_card_extra"),r`<ltek-form
          .hass=${this.hass}
          .data=${{buttons:c,activity_commands:t.commands}}
          .schema=${[{name:"buttons",selector:{object:{}}}]}
          .computeLabel=${this._label}
          @value-changed=${d=>this._extrasChanged(e,t,d.detail.value)}
        ></ltek-form>`,!1)}
    `}_renderFlowEditor(e,t){let i=this._flowEditing;return r`<easy-av-control-flow
      .hass=${this.hass}
      .room=${this.room}
      .roomId=${this.roomId}
      .activityId=${e}
      .editing=${i?.key}
      @flow-edit=${s=>{this._flowEditing=i?.key===s.detail.key?void 0:s.detail}}
      @flow-delete=${s=>this._flowDelete(e,t,s.detail)}
    >
      ${i&&!i.key.startsWith("__")?r`<div slot="edit">${this._inlineEditor(e,t,i)}</div>`:h}
      <div slot="add-start">${this._flowAdder(e,t,"start")}</div>
      <div slot="add-stop">${this._flowAdder(e,t,"stop")}</div>
    </easy-av-control-flow>`}_inlineEditor(e,t,i){let s=r`<div class="inline-bar">
      <button class="ltek-btn" @click=${()=>this._flowEditing=void 0}>${this._t("flow.close_edit")}</button>
    </div>`,o=i.device,l=o?this.room.devices?.[o]:void 0;if(i.panel==="flow.before"&&o)return r`${this._renderBefore(e,t,o)}${s}`;if(l&&o&&yi[i.panel]){let c=i.key.startsWith("device|"),d=t.devices??[],u=d.indexOf(o);return r`${c?r`<div class="inline-order">
                ${u>=0?this._moveButtons(d,u,p=>p.length<d.length?this._setActivity(e,_t(t,o)):this._setActivity(e,{...t,devices:p})):h}
              </div>
              <h4>${this._t("flow.before")}</h4>
              ${this._renderBefore(e,t,o)}
              <h4>${this._t("section_device")}</h4>`:r`<h4>${this._t(i.panel)}</h4>`}
        <p class="ltek-hint">
          ${this._t("flow.device_shared")}
          <button class="link" @click=${()=>this._show({kind:"device",id:o})}>${this._t("flow.open_device")}</button>
        </p>
        ${this._deviceSection(o,l,c?"section_device":i.panel)}
        ${c?this._deviceSection(o,l,"section_delays"):h}
        ${s}`}switch(i.panel){case"started_by":return r`${this._renderStartedBy(e,t)}${s}`;case"section_checks":return r`${this._renderChecks(e,t)}${s}`;case"steps":return r`${this._renderSteps(e,t)}${s}`;case"section_advanced":return r`${this._renderHooks(e,t,i.key.includes("on_stop")?"on_stop":"on_start")}${s}`;case"section_activity_devices":return r`${this._renderActivityDevices(e,t,Object.keys(this.room.devices??{}),t.devices??[])}${s}`;default:return s}}_renderBefore(e,t,i){let s=t.before?.[i]??{},o=p=>this._setActivity(e,gt(t,i,p)),l=s.wait_for??[],d=(t.devices??[]).filter(p=>p!==i).filter(p=>!l.some(m=>m.device===p)),u=p=>this.room.devices?.[p]?.name??p;return r`<p class="ltek-hint">${this._t("flow.before_hint")}</p>
      <ltek-form
        .hass=${this.hass}
        .data=${{before_delay:s.delay??0}}
        .schema=${[{name:"before_delay",selector:wi}]}
        .computeLabel=${this._label}
        @value-changed=${p=>o({...s,delay:Number(p.detail.value.before_delay)||void 0})}
      ></ltek-form>
      <div class="ltek-list">
        ${d.length?r`<select
              class="ltek-add add-select"
              aria-label=${this._t("flow.add_wait_for")}
              @change=${p=>{let m=p.target;m.value&&o({...s,wait_for:[...l,{device:m.value,state:"on"}]}),m.value=""}}
            >
              <option value="" selected>${this._t("flow.add_wait_for")}</option>
              ${d.map(p=>r`<option value=${p}>${u(p)}</option>`)}
            </select>`:h}
        ${l.map((p,m)=>r`<div class="ltek-item ordered-row">
            <span class="ltek-name">${u(p.device)}</span>
            <select
              @change=${f=>{let _=[...l];_[m]={...p,state:f.target.value},o({...s,wait_for:_})}}
            >
              ${["on","picture"].map(f=>r`<option value=${f} ?selected=${(p.state??"on")===f}>${this._t(`wait_for.${f}`)}</option>`)}
            </select>
            <button
              class="ltek-del"
              title=${this._t("delete")}
              aria-label=${this._t("delete")}
              @click=${()=>o({...s,wait_for:l.filter((f,_)=>_!==m)})}
            >
              <ha-icon icon="mdi:trash-can-outline"></ha-icon>
            </button>
          </div>`)}
      </div>
      ${l.length?r`<ltek-form
            .hass=${this.hass}
            .data=${{before_timeout:s.timeout??90,before_on_timeout:s.on_timeout??"continue"}}
            .schema=${[{name:"before_timeout",selector:G(600,5,5)},{name:"before_on_timeout",selector:{select:{mode:"dropdown",options:[{value:"continue",label:this._t("on_timeout_continue")},{value:"abort",label:this._t("on_timeout_abort")}]}}}]}
            .computeLabel=${this._label}
            @value-changed=${p=>{let m=p.detail.value;o({...s,timeout:m.before_timeout,on_timeout:m.before_on_timeout})}}
          ></ltek-form>`:h}`}_renderStartedBy(e,t){let i=t.started_by??[],s=u=>this._setActivity(e,{...t,started_by:u.length?u:void 0}),o=this._draftStartedBy,l=o?[...i,o]:i,c=u=>(this.hass.states[u]?.attributes.options??[]).map(p=>({value:p,label:p})),d=u=>Array.isArray(u)?String(u[0]??""):String(u??"");return r`<p class="ltek-hint">${this._t("started_by_hint")}</p>
      <div class="ltek-list">
        ${o?h:r`<button class="ltek-add" @click=${()=>this._draftStartedBy={entity_id:"",state:""}}>+ ${this._t("flow.add_started_by")}</button>`}
        ${l.map((u,p)=>{let m=p>=i.length,f=c(u.entity_id),_=f.length?{select:{options:f,mode:"dropdown",custom_value:!0}}:{text:{}};return r`<div class="step">
            <div class="step-head">
              <span class="title"><span class="num">${p+1}</span> ${this._t("started_by")}</span>
              ${m?r`<button class="ltek-del" title=${this._t("delete")} aria-label=${this._t("delete")} @click=${()=>this._draftStartedBy=void 0}>
                    <ha-icon icon="mdi:trash-can-outline"></ha-icon>
                  </button>`:this._moveButtons(i,p,s)}
            </div>
            <ltek-form
              .hass=${this.hass}
              .data=${{started_by_entity:u.entity_id,started_by_state:d(u.state),started_by_stop:d(u.stop_state)}}
              .schema=${[{name:"started_by_entity",required:!0,selector:{entity:{}}},{name:"started_by_state",required:!0,selector:_},{name:"started_by_stop",selector:_}]}
              .computeLabel=${this._label}
              @value-changed=${g=>{let w=g.detail.value,A=String(w.started_by_entity??""),D=String(w.started_by_state??""),K=String(w.started_by_stop??"");if(A!==u.entity_id){let St=this.hass.states[A]?.attributes.options??[];St.includes("power_off")&&(D=St.find($i=>$i!=="power_off")??"",K="power_off")}let Q=y({entity_id:A,state:D,stop_state:K||void 0});if(m){A&&D?(this._draftStartedBy=void 0,s([...i,Q])):this._draftStartedBy={entity_id:A,state:D,stop_state:K||void 0};return}let xt=[...i];xt[p]=Q,s(xt)}}
            ></ltek-form>
          </div>`})}
      </div>`}_renderSteps(e,t){return r`${(t.steps??[]).map((i,s)=>this._renderStep(e,t,i,s))}
      ${this._picker(this._t("add_step"),lt.map(i=>({value:i,label:this._t(`step.${i}`)})),i=>this._setActivity(e,{...t,steps:[...t.steps??[],ki(i,t,this.room)]}))}`}_renderHooks(e,t,i){return r`<ltek-form
      .hass=${this.hass}
      .data=${{[i]:t[i]??[]}}
      .schema=${[{name:i,selector:{action:{}}}]}
      .computeLabel=${this._label}
      @value-changed=${s=>this._setActivity(e,{...t,[i]:s.detail.value[i]})}
    ></ltek-form>`}_flowAdder(e,t,i){let s=t.devices??[],o=Object.keys(this.room.devices??{}).filter(p=>!s.includes(p)),l=i==="start"?"on_start":"on_stop",c=this._flowEditing?.key===`__${l}`,d=(t[l]??[]).length>0,u=(p,m)=>this._flowEditing={key:p,panel:m};return r`<div class="flow-add">
        <span class="ltek-hint">${this._t(i==="start"?"flow.add_hint":"flow.add_stop_hint")}</span>
        ${i==="start"?r`${o.length?r`<select
                    class="ltek-add add-select"
                    aria-label=${this._t("flow.pick_device")}
                    @change=${p=>{let m=p.target;m.value&&this._setActivity(e,{...t,devices:[...s,m.value]}),m.value=""}}
                  >
                    <option value="" selected>+ ${this._t("flow.add_device")}</option>
                    ${o.map(p=>r`<option value=${p}>${this.room.devices?.[p]?.name??p}</option>`)}
                  </select>`:h}
              ${s.length?r`<button
                    class="ltek-add"
                    @click=${()=>{let p=t.checks??[];this._setActivity(e,{...t,checks:[...p,{device:dn(s,p)}]}),u("checks|||||","section_checks")}}
                  >
                    + ${this._t("flow.add_check")}
                  </button>`:h}
              <select
                class="ltek-add add-select"
                aria-label=${this._t("flow.add_step")}
                @change=${p=>{let m=p.target;m.value&&(this._setActivity(e,{...t,steps:[...t.steps??[],ki(m.value,t,this.room)]}),u("steps|||||","steps")),m.value=""}}
              >
                <option value="" selected>+ ${this._t("flow.add_step")}</option>
                ${lt.map(p=>r`<option value=${p}>${this._t(`step.${p}`)}</option>`)}
              </select>`:h}
        ${i==="start"&&!(t.started_by??[]).length?r`<button
              class="ltek-add"
              @click=${()=>{this._draftStartedBy={entity_id:"",state:""},this._flowEditing={key:"__started_by",panel:"started_by"}}}
            >
              + ${this._t("flow.add_started_by")}
            </button>`:h}
        ${d?h:r`<button class="ltek-add" @click=${()=>this._flowEditing=c?void 0:{key:`__${l}`,panel:"section_advanced"}}>
              + ${this._t(i==="start"?"flow.add_on_start":"flow.add_on_stop")}
            </button>`}
      </div>
      ${i==="start"&&!o.length&&!s.length?r`<p class="ltek-hint">${this._t("flow.no_more_devices")}</p>`:h}
      ${c&&!d?r`<div class="inline-add">${this._renderHooks(e,t,l)}</div>`:h}
      ${i==="start"&&this._flowEditing?.key==="__started_by"?r`<div class="inline-add">${this._renderStartedBy(e,t)}</div>`:h}`}_flowDelete(e,t,i){let{row:s,header:o,device:l}=i;if(o==="steps"||s.kind==="step"&&s.step){let u=Number(s.step)-1;this._setActivity(e,{...t,steps:(t.steps??[]).filter((p,m)=>m!==u)});return}switch(s.kind){case"device":l&&this._setActivity(e,_t(t,l));return;case"check":{let u=Number(s.check)-1,p=(t.checks??[]).filter((m,f)=>f!==u);this._setActivity(e,{...t,checks:p.length?p:void 0});return}case"hook":this._setActivity(e,{...t,[String(s.hook)]:[]});return;case"started_by":{let u=Number(s.index)-1,p=t.started_by?.[u];if(!p)return;let m=[...t.started_by??[]];i.mode==="stop"?m[u]=y({...p,stop_state:void 0}):m.splice(u,1),this._setActivity(e,{...t,started_by:m.length?m:void 0});return}case"delay":case"wait_for":{if(!l)return;let u={...t.before?.[l]??{}};s.kind==="delay"?delete u.delay:delete u.wait_for,this._setActivity(e,gt(t,l,u));return}}let c=l?this.room.devices?.[l]:void 0;if(!c||!l)return;let d={...c};if(s.kind==="status")d.wait_on="none";else if(s.kind==="wait")d.delay_after_on=0;else if(s.kind==="boot")d.delay_after_power=0;else if(s.kind==="ready")delete d.ready;else return;this._emit({...this.room,devices:{...this.room.devices,[l]:y(d)}})}_cardDivider(){return r`<div class="card-divider"><ha-icon icon="mdi:remote"></ha-icon>${this._t("card_divider")}</div>`}_renderActivityDevices(e,t,i,s){let o=c=>this._setActivity(e,{...t,devices:c}),l=i.filter(c=>!s.includes(c));return r`<div class="ltek-list">
      ${l.length?r`<select
            class="ltek-add add-select"
            aria-label=${this._t("add_device_to_activity")}
            @change=${c=>{let d=c.target;d.value&&o([...s,d.value]),d.value=""}}
          >
            <option value="" selected>+ ${this._t("add_device_short")}</option>
            ${l.map(c=>r`<option value=${c}>${this.room.devices?.[c]?.name??c}</option>`)}
          </select>`:h}
      ${s.map((c,d)=>{let u=this.room.devices?.[c],p=u?.entity_id?this.hass.entities?.[u.entity_id]?.platform:void 0;return r`<div class="ltek-item ordered-row">
          <span class="num">${d+1}</span>
          <ha-icon class="lead" icon=${u?this._deviceIcon(u):"mdi:help-circle-outline"}></ha-icon>
          <button class="ltek-item-text link" @click=${()=>this._show({kind:"device",id:c})}>
            <span class="ltek-name">${u?.name??c}</span>
            <span class="ltek-subline">${u?.entity_id??""}</span>
          </button>
          ${p?r`<span class="ltek-badge">${ft(p)}</span>`:h}
          ${this._moveButtons(s,d,o)}
        </div>`})}
    </div>`}_activityGeneralChanged(e,t,i){let s=y({...t,name:i.name,icon:i.icon,order:i.order}),o=i.name?.trim();if(!o||o===t.name||!this._unsaved("activities",e)){this._setActivity(e,s);return}let l=j(B(o),Object.keys(this.room.activities??{}).filter(u=>u!==e));if(l===e){this._setActivity(e,s);return}let c={};for(let[u,p]of Object.entries(this.room.activities??{}))c[u===e?l:u]=u===e?s:p;let d={...this.room,activities:c};d.default_activity===e&&(d.default_activity=l),this._emit(d),this._view={kind:"activity",id:l}}_renderStep(e,t,i,s){let o=t.steps??[],l=c=>this._setActivity(e,{...t,steps:c});return r`<div class="step">
      <div class="step-head">
        <span class="title">${s+1}. ${this._t(`step.${i.type}`)}</span>
        ${this._moveButtons(o,s,l)}
      </div>
      <ltek-form
        .hass=${this.hass}
        .data=${i}
        .schema=${ai(this.hass,this.room,i,c=>this._t(c),this.sources,this.soundModes)}
        .computeLabel=${this._label}
        @value-changed=${c=>{let d=[...o];d[s]=y({...c.detail.value,type:i.type}),l(d)}}
      ></ltek-form>
    </div>`}_checkNote(e){let t=this.room.devices?.[e];if(!t?.entity_id)return h;let i=this._detectFor(t);if(!i)return h;let s=i.found?.picture,o=i.profile?.data?.picture,l=o?.ok??[],c=o?.fail??[],d=s?this.hass.states[s]?.attributes.friendly_name||s:"";return r`<p class="ltek-hint">
      ${s?l.length?this._t("step_picture_checks",{entity:d,states:l.join(` ${this._t("or")} `)}):this._t("check_unless_text",{entity:d,states:c.join(` ${this._t("or")} `)}):this._t("step_picture_none",{device:t.name??t.entity_id})}
    </p>`}_renderChecks(e,t){let i=t.checks??[],s=d=>this._setActivity(e,{...t,checks:d.length?d:void 0}),o=t.devices??[],c=o.filter(d=>{let u=this.room.devices?.[d];return u?.entity_id&&this._detectFor(u)?.found?.picture}).find(d=>!i.some(u=>u.device===d&&!u.entity_id))??o[0];return r`<div class="ltek-list">
      ${o.length?r`<button class="ltek-add" @click=${()=>s([...i,{device:c}])}>+ ${this._t("add_check")}</button>`:r`<p class="ltek-hint">${this._t("needs_devices")}</p>`}
      ${i.length?h:r`<p class="ltek-hint">${this._t("check_none")}</p>`}
      ${i.map((d,u)=>{let p=g=>{let w=[...i];w[u]=y({...d,...g}),s(w)},m=d.entity_id!==void 0,f=String(d.device??""),_=d.state??[];return r`<div class="step check">
          <div class="step-head">
            <span class="title"><span class="num">${u+1}</span> ${this.room.devices?.[f]?.name??f}</span>
            ${this._moveButtons(i,u,s)}
          </div>
          <div class="ltek-row">
            <label class="lbl">${this._t("field.device")}</label>
            <select @change=${g=>p({device:g.target.value})}>
              ${o.map(g=>r`<option value=${g} ?selected=${g===f}>${this.room.devices?.[g]?.name??g}</option>`)}
            </select>
          </div>
          <div class="ltek-row">
            <label class="lbl">${this._t("check_what")}</label>
            <select
              @change=${g=>g.target.value==="own"?p({entity_id:"",state:["on"]}):p({entity_id:void 0,state:void 0,debounce:void 0})}
            >
              <option value="profile" ?selected=${!m}>${this._t("check_profile")}</option>
              <option value="own" ?selected=${m}>${this._t("check_entity")}</option>
            </select>
          </div>
          ${m?r`<ltek-form
                  .hass=${this.hass}
                  .data=${{entity_id:d.entity_id||void 0}}
                  .schema=${[{name:"entity_id",selector:{entity:{}}}]}
                  .computeLabel=${()=>this._t("check_entity_label")}
                  @value-changed=${g=>p({entity_id:g.detail.value.entity_id??""})}
                ></ltek-form>
                <div class="ltek-row">
                  <label class="lbl">${this._t("check_states")}</label>
                  <input
                    type="text"
                    .value=${(Array.isArray(_)?_:[_]).join(", ")}
                    placeholder=${this._t("check_states_placeholder")}
                    @change=${g=>{let w=g.target.value.split(",").map(A=>A.trim()).filter(Boolean);p({state:w.length?w:void 0})}}
                  />
                </div>`:this._checkNote(f)}
          <ltek-form
            .hass=${this.hass}
            .data=${{timeout:d.timeout,on_failure:d.on_failure??"warn"}}
            .schema=${[{name:"timeout",selector:{number:{min:5,max:300,step:5,mode:"slider",unit_of_measurement:"s"}}},{name:"on_failure",required:!0,selector:{select:{options:[{value:"warn",label:this._t("check_warn")},{value:"stop",label:this._t("check_stop")}],mode:"dropdown"}}}]}
            .computeLabel=${g=>this._t(g.name==="timeout"?"check_timeout":"check_failure")}
            @value-changed=${g=>{let w=g.detail.value;p({timeout:w.timeout,on_failure:w.on_failure==="stop"?"stop":void 0})}}
          ></ltek-form>
        </div>`})}
    </div>`}_routesChanged(e,t,i){let s={};for(let o of V)i[o]==="__none"?s[o]=null:i[o]&&i[o]!=="__auto"&&(s[o]=i[o]);(i.touchpad==="on"||i.touchpad==="off")&&(s.touchpad=i.touchpad==="on"),t.remote?.buttons&&(s.buttons=t.remote.buttons),t.remote?.settings&&(s.settings=t.remote.settings),this._setActivity(e,{...t,remote:Object.keys(s).length?s:void 0})}_extrasChanged(e,t,i){let s=(t.remote?.buttons??[]).filter(me),o=[...Array.isArray(i.buttons)?i.buttons:[],...s],l={...t.remote,buttons:o};this._setActivity(e,{...t,remote:Le(l),commands:i.activity_commands})}_renderQuickSelect(e,t){let i=t.remote?.buttons??[],s=i.filter(u=>!me(u)),o=i.filter(me),l=u=>{let p={...t.remote,buttons:[...s,...u]};this._setActivity(e,{...t,remote:Le(p)})},c=(t.devices??[]).filter(u=>this.room.devices?.[u]?.entity_id?.startsWith("media_player.")),d=c.map(u=>({value:u,label:this.room.devices?.[u]?.name??u}));return r`${o.map((u,p)=>{let m=this.room.devices?.[u.device]?.entity_id;return r`<div class="step">
          <div class="step-head">
            <span class="title">${u.name||u.source||""}</span>
            ${this._moveButtons(o,p,l)}
          </div>
          <ltek-form
            .hass=${this.hass}
            .data=${{device:u.device,source:u.source,label:u.name,icon:u.icon}}
            .schema=${[{name:"device",required:!0,selector:{select:{options:d,mode:"dropdown"}}},{name:"source",required:!0,selector:{select:{options:ct(this.hass,this.sources,m),custom_value:!0,mode:"dropdown"}}},{name:"label",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]}
            .computeLabel=${this._label}
            .computeHelper=${this._helper}
            @value-changed=${f=>{let _=f.detail.value,g=[...o];g[p]=y({device:_.device,source:_.source??"",name:_.label,icon:_.icon},["source"]),l(g)}}
          ></ltek-form>
        </div>`})}
      ${c.length?r`<button class="ltek-add" @click=${()=>l([...o,{device:c[c.length-1],source:""}])}>
            + ${this._t("add_quick_select")}
          </button>`:r`<p class="ltek-hint">${this._t("quick_select_no_player")}</p>`}`}_settingList(e,t){let i=ut[String(t)]??"source_list",s=i==="sound_mode_list"?this.soundModes:this.sources;return he(this.hass,s,this.room.devices?.[String(e)]?.entity_id,i)}_describeSetting(e,t){let i=e.entity?e.name||this.hass.states[e.entity]?.attributes.friendly_name||e.entity||this._t("setting.entity"):this._t(`setting.${e.setting}`);if(!t)return i;let s=this.room.devices?.[String(e.device)];return`${i} (${s?.name??String(e.device)})`}_settingsMode(e,t,i){return r`<ltek-form
      .hass=${this.hass}
      .data=${{settings_mode:e?"chosen":"auto"}}
      .schema=${[{name:"settings_mode",required:!0,selector:{select:{options:[{value:"auto",label:this._t(t)},{value:"chosen",label:this._t("settings_chosen")}],mode:"dropdown"}}}]}
      .computeLabel=${this._label}
      @value-changed=${s=>{let o=s.detail.value.settings_mode==="chosen";o!==e&&i(o)}}
    ></ltek-form>`}_renderSettingItems(e,t,i,s){let o=c=>!!this.room.devices?.[String(c)]?.entity_id?.startsWith("media_player."),l=(i??[]).map(c=>({value:c,label:this.room.devices?.[c]?.name??c}));return r`${e.map((c,d)=>{let u=i?c.device:s,p=c.entity!==void 0?"entity":c.setting,m=o(u)?[...dt,"entity"]:["entity"],f=c.entity,_=f?this.hass.states[f]?.attributes.options:void 0,g=p==="entity"?Array.isArray(_)?_.map(String):void 0:this._settingList(u,p);return r`<div class="step">
        <div class="step-head">
          <span class="title">${this._describeSetting(c,i!==null)}</span>
          ${this._moveButtons(e,d,t)}
        </div>
        <ltek-form
          .hass=${this.hass}
          .data=${{device:c.device,setting:p,entity:f,name:c.name,options:c.options??[]}}
          .schema=${[...i?[{name:"device",required:!0,selector:{select:{options:l,mode:"dropdown"}}}]:[],{name:"setting",required:!0,selector:{select:{options:m.map(w=>({value:w,label:this._t(`setting.${w}`)})),mode:"dropdown"}}},...p==="entity"?[{name:"entity",required:!0,selector:{entity:{filter:{domain:[...oi]}}}},{name:"name",selector:{text:{}}}]:[],...g!==void 0?[{name:"options",selector:{select:{options:g,multiple:!0,custom_value:!0,mode:"dropdown"}}}]:[]]}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${w=>{let A=w.detail.value,D=o(i?A.device:s)?A.setting:"entity",K=i?{device:A.device}:{},Q=[...e];Q[d]=D==="entity"?y({...K,entity:A.entity??"",name:A.name,options:A.options},["entity"]):y({...K,setting:D,options:A.options}),t(Q)}}
        ></ltek-form>
      </div>`})}`}get _lists(){return{source_list:this.sources,sound_mode_list:this.soundModes}}_renderCardSettings(e,t){let i=t.remote?.settings,s=u=>{let p={...t.remote};u===void 0?delete p.settings:p.settings=u,this._setActivity(e,{...t,remote:Le(p)})},o=ri(this.hass,this.room,t,this._lists,this._related),l=this._settingsMode(i!==void 0,"settings_auto",u=>s(u?o.map(p=>({...p})):void 0));if(i===void 0)return r`${l}
        ${o.length?this._settingColumns(o):r`<p class="ltek-hint">${this._t("settings_auto_none")}</p>`}`;let c=t.devices??[],d=c.filter(u=>this.room.devices?.[u]?.entity_id?.startsWith("media_player."));return r`${l}
      ${this._renderSettingItems(i,s,c)}
      ${i.length?h:r`<p class="ltek-hint">${this._t("settings_none")}</p>`}
      ${c.length?r`<button
            class="add"
            @click=${()=>s([...i,d.length?{device:d[0],setting:"sound_mode"}:{device:c[0],entity:""}])}
          >
            + ${this._t("add_setting")}
          </button>`:h}`}_settingColumns(e){return r`<div class="ltek-group first">${this._t("card_shows")}</div>
      <div class="columns">
        ${li(this.hass,this.room,e).map(([t,i])=>{let s=new Set(i.map(o=>String(o.device)));return r`<div class="column">
            <div class="column-head">${t?ft(t):this._t("other_integration")}</div>
            ${s.size===1?r`<div class="ltek-subline">${this.room.devices?.[[...s][0]]?.name??[...s][0]}</div>`:h}
            <ul>
              ${i.map(o=>r`<li>${this._describeSetting(o,s.size>1)}</li>`)}
            </ul>
          </div>`})}
      </div>`}_renderDeviceSettings(e,t){let i=t.settings,s=d=>{let u={...t};d===void 0?delete u.settings:u.settings=d,this._emit({...this.room,devices:{...this.room.devices,[e]:u}})},o=pt(this.hass,this.room,e,this._lists,this._related),l=this._settingsMode(i!==void 0,"device_settings_auto",d=>s(d?o.map(({device:u,...p})=>p):void 0));if(i===void 0)return r`${l}
        <p class="ltek-hint">
          ${o.length?this._t("settings_auto_shows",{list:o.map(d=>this._describeSetting(d,!1)).join(", ")}):this._t("device_settings_auto_none")}
        </p>`;let c=t.entity_id?.startsWith("media_player.");return r`${l}
      ${this._renderSettingItems(i,s,null,e)}
      ${i.length?h:r`<p class="ltek-hint">${this._t("device_settings_none")}</p>`}
      <button
        class="add"
        @click=${()=>s([...i,c?{setting:"sound_mode"}:{entity:""}])}
      >
        + ${this._t("add_setting")}
      </button>`}_addActivity(){let e=this._t("new_activity"),t=j(B(e),Object.keys(this.room.activities??{}));this._setActivity(t,{name:e,devices:[]}),this._show({kind:"activity",id:t})}_deleteActivity(e,t){if(!window.confirm(`${this._t("delete")}: ${t.name??e}?`))return;let i={...this.room.activities};delete i[e];let s={...this.room,activities:i};s.default_activity===e&&delete s.default_activity,this._emit(s),this._show({kind:"list"})}_renderYaml(){return r`<p class="ltek-hint">${this._t("yaml_intro")}</p>
      <ltek-form
        .hass=${this.hass}
        .data=${{yaml:this.room}}
        .schema=${[{name:"yaml",selector:{object:{}}}]}
        .computeLabel=${()=>""}
        @value-changed=${e=>{let t=e.detail.value.yaml;t&&typeof t=="object"&&!Array.isArray(t)&&this._emit(t)}}
      ></ltek-form>`}_moveButtons(e,t,i){let s=o=>{let l=[...e],[c]=l.splice(t,1);l.splice(o,0,c),i(l)};return r`<span class="move">
      <button class="ltek-act" title=${this._t("move_up")} aria-label=${this._t("move_up")} ?disabled=${t===0} @click=${()=>s(t-1)}>
        <ha-icon icon="mdi:arrow-up"></ha-icon>
      </button>
      <button class="ltek-act" title=${this._t("move_down")} aria-label=${this._t("move_down")} ?disabled=${t===e.length-1} @click=${()=>s(t+1)}>
        <ha-icon icon="mdi:arrow-down"></ha-icon>
      </button>
      <button class="ltek-del" title=${this._t("delete")} aria-label=${this._t("delete")} @click=${()=>i(e.filter((o,l)=>l!==t))}>
        <ha-icon icon="mdi:trash-can-outline"></ha-icon>
      </button>
    </span>`}_picker(e,t,i){return r`<ltek-form
      class="picker"
      .hass=${this.hass}
      .data=${{pick:void 0}}
      .schema=${[{name:"pick",selector:{select:{options:t,mode:"dropdown"}}}]}
      .computeLabel=${()=>e}
      @value-changed=${s=>{let o=s.detail.value.pick;o&&(i(o),s.target.requestUpdate())}}
    ></ltek-form>`}};we.properties={hass:{attribute:!1},room:{attribute:!1},roomId:{attribute:!1},sources:{attribute:!1},soundModes:{attribute:!1},saved:{attribute:!1},_tab:{state:!0},_view:{state:!0},_notice:{state:!0},_related:{state:!0},_detect:{state:!0},profiles:{attribute:!1},jump:{attribute:!1},_powerOn:{state:!0},_flowEditing:{state:!0},_draftStartedBy:{state:!0}},we.styles=[k,x,$,b`
    :host {
      display: block;
    }
    .detected {
      margin-bottom: var(--ltek-sp-4);
      align-items: flex-start;
      flex-wrap: wrap;
    }
    .hint,
    .sub {
      color: var(--secondary-text-color);
      font-size: var(--ltek-fs-body);
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
      font-size: var(--ltek-fs-small);
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
    /* Design guide over the original layout */
    .tabs button {
      font-size: var(--ltek-fs-label);
    }
    .tabs button.active {
      color: var(--ltek-c-accent);
      border-bottom-color: var(--ltek-c-accent);
    }
    .step {
      background: var(--ltek-c-surface-raised);
      border: 1px solid var(--ltek-c-border-soft);
      border-radius: var(--ltek-r-card);
    }
    .move {
      gap: var(--ltek-sp-2);
    }
    .move button.ltek-act,
    .move button.ltek-del {
      padding: 2px;
    }
    h2 {
      color: var(--ltek-c-text);
    }
    button.back {
      color: var(--ltek-c-accent);
    }
    .notice {
      background: none;
      color: var(--ltek-c-warning);
      border: 1px solid var(--ltek-c-warning);
      border-radius: var(--ltek-r-md);
    }
    button.delete-room {
      display: inline-flex;
      align-items: center;
      gap: var(--ltek-sp-2);
      margin-top: 32px;
    }
    /* Startup / Shutdown beside the activity's name */
    .inline-bar {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }
    .inline-order {
      display: flex;
      justify-content: flex-end;
    }
    .inline-add {
      margin-top: 10px;
    }
    [slot="edit"] h4 {
      margin: 10px 0 4px;
      font-size: var(--ltek-fs-group);
      font-weight: 500;
    }
    .flow-add {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }
    .flow-add .ltek-add {
      width: auto;
      margin: 0;
    }
    button.link {
      background: none;
      border: none;
      padding: 0 0 0 4px;
      color: var(--ltek-c-accent);
      cursor: pointer;
      font: inherit;
    }
    .title-row {
      display: flex;
      align-items: center;
      gap: var(--ltek-sp-4);
      flex-wrap: wrap;
    }
    .title-row h2 {
      margin-right: auto;
    }
    .run-buttons {
      display: inline-flex;
      gap: var(--ltek-sp-2);
    }
    button.run-btn {
      position: relative;
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      gap: var(--ltek-sp-1);
      padding: var(--ltek-ctrl-pad);
      border-radius: var(--ltek-r-ctrl);
      border: 1px solid var(--ltek-c-border);
      background: transparent;
      color: var(--ltek-c-text);
      font: inherit;
      font-size: var(--ltek-fs-body);
      cursor: pointer;
      user-select: none;
      touch-action: none;
      --mdc-icon-size: 18px;
    }
    button.run-btn:disabled {
      opacity: 0.4;
      cursor: default;
    }
    button.run-btn.startup {
      border-color: var(--green-color, #4caf50);
      color: var(--green-color, #4caf50);
    }
    button.run-btn.shutdown {
      border-color: var(--red-color, #f44336);
      color: var(--red-color, #f44336);
    }
    button.run-btn > * {
      position: relative;
    }
    /* Held: fills up over the 3 seconds */
    button.run-btn .fill {
      position: absolute;
      inset: 0;
      width: 0;
      background: color-mix(in srgb, var(--green-color, #4caf50) 30%, transparent);
    }
    button.run-btn.holding .fill {
      width: 100%;
      transition: width 3s linear;
    }
    /* Start of the Remote control card's settings */
    .card-divider {
      display: flex;
      align-items: center;
      gap: var(--ltek-sp-2);
      margin: var(--ltek-sp-6) 0 var(--ltek-sp-1);
      color: var(--ltek-c-muted);
      font-size: var(--ltek-fs-small);
      font-weight: var(--ltek-fw-semibold);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      --mdc-icon-size: 18px;
    }
    .card-divider::after {
      content: "";
      flex: 1;
      border-top: 1px solid var(--divider-color);
    }
    /* An activity's devices: numbered raised rows */
    .check .title .num {
      color: var(--accent-color, var(--ltek-c-accent));
      font-weight: var(--ltek-fw-semibold);
      margin-right: var(--ltek-sp-1);
    }
    .check .ltek-row {
      margin: var(--ltek-sp-2) 0;
    }
    .ordered-row .num {
      flex: none;
      min-width: 1.5em;
      text-align: center;
      color: var(--accent-color, var(--ltek-c-accent));
      font-weight: var(--ltek-fw-semibold);
      font-variant-numeric: tabular-nums;
    }
    .ordered-row .move {
      gap: var(--ltek-sp-2);
    }
    button.ltek-item-text.link {
      border: none;
      background: none;
      padding: 0;
      font: inherit;
      text-align: left;
      cursor: pointer;
      color: inherit;
    }
    button.ltek-item-text.link:hover .ltek-name {
      color: var(--ltek-c-accent);
    }
    select.add-select {
      appearance: none;
      -webkit-appearance: none;
      align-self: flex-start;
      width: auto;
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
    select.add-select:hover {
      background: var(--ltek-c-accent-fade-soft);
    }
    select.add-select option {
      color: var(--ltek-c-text);
      background: var(--card-background-color);
      font-weight: var(--ltek-fw-normal);
    }
    /* Settings in the card: a column per integration */
    .columns {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: var(--ltek-sp-3);
      margin-top: var(--ltek-sp-2);
    }
    .column {
      background: var(--ltek-c-surface-raised);
      border-radius: var(--ltek-r-card);
      padding: var(--ltek-sp-2) var(--ltek-sp-3);
    }
    .column-head {
      color: var(--accent-color, var(--ltek-c-accent));
      font-weight: var(--ltek-fw-semibold);
      font-size: var(--ltek-fs-label);
    }
    .column ul {
      margin: var(--ltek-sp-1) 0 0;
      padding-left: 1.1em;
      font-size: var(--ltek-fs-body);
    }
    /* Power Outlet: off is greyed out */
    label.check {
      display: inline-flex;
      align-items: center;
      gap: var(--ltek-sp-2);
      color: var(--ltek-c-label);
      font-size: var(--ltek-fs-body);
      margin-bottom: var(--ltek-sp-2);
    }
    label.check input {
      accent-color: var(--ltek-c-accent);
    }
    .unused {
      opacity: 0.45;
      pointer-events: none;
    }
    .detail-head .ltek-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--ltek-sp-1);
    }
  `];customElements.get("easy-av-control-room-editor")||customElements.define("easy-av-control-room-editor",we);function ki(a,n,e){if(!["power_on","power_off","set_source","set_volume","set_sound_mode","set_brightness","set_color_temp","set_position","set_tilt"].includes(a))return{type:a};let i=(n.devices??[])[0]??Object.keys(e.devices??{})[0];return i?{type:a,device:i}:{type:a}}function dn(a,n){return a.find(e=>!n.some(t=>t.device===e&&!t.entity_id))??a[0]}async function un(){if(customElements.get("ha-form")&&customElements.get("ha-selector"))return;await(await(await window.loadCardHelpers()).createCardElement({type:"entities",entities:[]})).constructor.getConfigElement(),await customElements.whenDefined("ha-form")}var ye=class extends v{constructor(){super();this._back="room";this._original="";this._loading=!1;this._saving=!1,this._ready=!1,this._sources={},this._soundModes={},this._adding=!1,this._profiles=[],this._page="room"}async _loadProfiles(){this._profiles=await this.hass.callWS({type:"easy_av_control/profiles/list"}).catch(()=>[])}_t(e,t){return S(this.hass?.language,e,t)}async _load(){this._loading=!0;try{await un(),this._ready=!0;let e=await this.hass.callWS({type:"easy_av_control/config/get"});this._entryId=e.entry_id,this._version=e.version,this.hass.callWS({type:"easy_av_control/ui/sidebar"}).then(t=>this._sidebar=t.visible).catch(()=>{}),this._revision=e.revision,this._original=JSON.stringify(e.rooms),this._rooms=e.rooms,this._banner=void 0,(!this._selected||!(this._selected in e.rooms))&&(this._selected=Object.keys(e.rooms)[0]),this._loadProfiles(),[this._sources,this._soundModes]=await Promise.all(["source_list","sound_mode_list"].map(t=>this.hass.callWS({type:"easy_av_control/config/sources",attribute:t}).catch(()=>({}))))}catch(e){this._loadError=e?.message??String(e)}finally{this._loading=!1}}get _dirty(){return this._rooms!==void 0&&JSON.stringify(this._rooms)!==this._original}_roomChanged(e,t){this._rooms={...this._rooms,[e]:t},this._banner?.kind!=="conflict"&&(this._banner=void 0)}_addRoom(e){if(this._adding=!1,!e.trim())return;let t=j(B(e),Object.keys(this._rooms??{}));this._rooms={...this._rooms,[t]:{name:e.trim(),devices:{},activities:{}}},this._selected=t}_renderAddRoom(){return this._adding?r`<form class="new-room" @submit=${t=>{t.preventDefault();let i=t.target.querySelector("input");this._addRoom(i.value)}}>
      <input
        aria-label=${this._t("add_room_name")}
        placeholder=${this._t("add_room_name")}
        @keydown=${t=>t.key==="Escape"&&(this._adding=!1)}
      />
      <div class="new-room-buttons">
        <button type="button" class="flat" @click=${()=>this._adding=!1}>${this._t("cancel")}</button>
        <button type="submit" class="primary">${this._t("create")}</button>
      </div>
    </form>`:r`<button class="room add" @click=${()=>this._adding=!0}>+ ${this._t("add_room")}</button>`}updated(e){this.hass&&!this._rooms&&!this._loading&&!this._loadError&&this._load(),e.has("_adding")&&this._adding&&this.shadowRoot?.querySelector("form.new-room input")?.focus()}_deleteRoom(e){let t=this._rooms?.[e];if(!t||!window.confirm(this._t("delete_room_confirm",{name:t.name??e})))return;let i={...this._rooms};delete i[e],this._rooms=i,this._selected=Object.keys(i)[0]}_discard(){this._rooms=JSON.parse(this._original),this._banner=void 0,(!this._selected||!(this._selected in this._rooms))&&(this._selected=Object.keys(this._rooms)[0])}_reload(){this._dirty&&!window.confirm(this._t("reload_confirm"))||(this._loadError=void 0,this._load())}async _save(e=!1){if(!this._rooms||!this._revision)return;let t=this._rooms,i={};for(let[s,o]of Object.entries(t))i[s]=y(o);this._saving=!0;try{let s=await this.hass.callWS({type:"easy_av_control/config/validate",rooms:i});if(s.error){this._banner={kind:"invalid",path:s.error.path.join("."),message:s.error.message};return}if(s.missing.length&&!e){this._banner={kind:"missing",missing:s.missing};return}let o=await this.hass.callWS({type:"easy_av_control/config/save",rooms:i,revision:this._revision,entry_id:this._entryId});this._revision=o.revision,this._original=JSON.stringify(i),this._rooms===t&&(this._rooms=i),this._banner={kind:"saved"},this._loadProfiles()}catch(s){let o=s;this._banner=o.code==="conflict"?{kind:"conflict"}:{kind:"invalid",path:"",message:o.message??String(s)}}finally{this._saving=!1}}render(){return r`
      <div class="toolbar">
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <div class="main-title">${this._t("title")}</div>
        ${this._dirty?r`<span class="dirty">${this._t("unsaved")}</span>`:h}
        <button class="flat" ?disabled=${!this._dirty||this._saving} @click=${this._discard}>
          ${this._t("discard")}
        </button>
        <button class="primary" ?disabled=${!this._dirty||this._saving} @click=${()=>this._save()}>
          ${this._saving?this._t("saving"):this._t("save")}
        </button>
      </div>
      <div class="content">${this._renderContent()}</div>
    `}_renderContent(){if(this._loadError)return r`<div class="banner error">
        ${this._t("load_error",{error:this._loadError})}
        <button class="flat" @click=${()=>this._reload()}>${this._t("retry")}</button>
      </div>`;if(!this._rooms||!this._ready)return r`<div class="empty">${this._t("loading")}</div>`;let e=Object.entries(this._rooms),t=this._selected&&this._rooms[this._selected]?this._selected:void 0;return r`<div class="layout ${this.narrow?"narrow":""}">
      <nav>
        <div class="nav-head">
          <span class="nav-title">${this._t("rooms")}</span>
          <button
            class="nav-add"
            title=${this._t("add_room")}
            aria-label=${this._t("add_room")}
            @click=${()=>this._adding=!0}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
        ${this._adding?this._renderAddRoom():h}
        ${e.map(([i,s])=>r`<button
            class="room ${this._page==="room"&&i===t&&!this._openActivity?"active":""}"
            @click=${()=>this._goRoom(i)}
          >
            ${s.name??i}
          </button>
          ${Me(s).map(([o,l])=>r`<div
              class="nav-activity ${this._page==="room"&&i===t&&this._openActivity===o?"active":""}"
            >
              <button class="nav-act-name" @click=${()=>this._goActivity(i,o,!1)}>
                <ha-icon icon=${l.icon??"mdi:play-circle-outline"}></ha-icon>
                <span>${l.name??o}</span>
              </button>
              <button
                class="ltek-act nav-flow"
                title=${this._t("nav_flow")}
                aria-label=${this._t("nav_flow")}
                @click=${()=>this._goActivity(i,o,!0)}
              >
                <ha-icon icon="mdi:sitemap-outline"></ha-icon>
              </button>
            </div>`)}`)}
        <div class="nav-title library">${this._t("setup")}</div>
        <button class="room ${this._page==="detect"?"active":""}" @click=${()=>this._page="detect"}>
          <ha-icon icon="mdi:auto-fix"></ha-icon> ${this._t("detect")}
        </button>
        <button class="room ${this._page==="profiles"?"active":""}" @click=${()=>this._page="profiles"}>
          <ha-icon icon="mdi:package-variant-closed"></ha-icon> ${this._t("profiles")}
        </button>
        <button class="room ${this._page==="reports"?"active":""}" @click=${()=>this._page="reports"}>
          <ha-icon icon="mdi:chart-timeline-variant"></ha-icon> ${this._t("reports")}
        </button>
        <button class="room ${this._page==="guide"?"active":""}" @click=${()=>this._openGuide()}>
          <ha-icon icon="mdi:help-circle-outline"></ha-icon> ${this._t("guide")}
        </button>
        ${this._sidebar===void 0?h:r`<button
              class="sidebar-chip ${this._sidebar?"on":""}"
              role="switch"
              aria-checked=${this._sidebar?"true":"false"}
              title=${this._t("sidebar_hint")}
              @click=${()=>this._setSidebar(!this._sidebar)}
            >
              <ha-icon icon=${this._sidebar?"mdi:check":"mdi:eye-off-outline"}></ha-icon>
              ${this._t("sidebar_chip")}
            </button>`}
        <div class="nav-foot">
          <a class="ltek-star" href=${U} target="_blank" rel="noopener">${this._t("star")}</a>
          <a class="ltek-issue" href="${U}/issues" target="_blank" rel="noopener">${this._t("report")}</a>
          ${this._version?r`<div class="ltek-foot">${this._t("footer_version",{version:this._version})}</div>`:h}
        </div>
      </nav>
      <main>
        ${this._renderBanner()}
        ${this._page==="guide"?r`<easy-av-control-guide
              .language=${this.hass.language}
              @close=${()=>this._page=this._back}
            ></easy-av-control-guide>`:this._page==="reports"?r`<easy-av-control-reports .hass=${this.hass}></easy-av-control-reports>`:this._page==="detect"?r`<easy-av-control-detect
              .hass=${this.hass}
              .rooms=${this._rooms}
              @rooms-changed=${i=>{this._rooms=i.detail.rooms,(!this._selected||!(this._selected in i.detail.rooms))&&(this._selected=Object.keys(i.detail.rooms)[0]),this._page="room",this._banner={kind:"applied"}}}
              @open-profile=${i=>{this._focusProfile=i.detail.id,this._page="profiles"}}
              @create-profile=${i=>{this._draftFor=i.detail.integration,this._page="profiles"}}
            ></easy-av-control-detect>`:this._page==="profiles"?r`<easy-av-control-profiles
              .hass=${this.hass}
              .profiles=${this._profiles}
              .draftFor=${this._draftFor}
              .focusProfile=${this._focusProfile}
              @focus-shown=${()=>this._focusProfile=void 0}
              @draft-opened=${()=>this._draftFor=void 0}
              @profiles-changed=${()=>this._loadProfiles()}
            ></easy-av-control-profiles>`:t?r`<easy-av-control-room-editor
                .hass=${this.hass}
                .room=${this._rooms[t]}
                .roomId=${t}
                .sources=${this._sources}
                .soundModes=${this._soundModes}
                .saved=${JSON.parse(this._original||"{}")[t]}
                .profiles=${this._profiles}
                @room-changed=${i=>this._roomChanged(t,i.detail.room)}
                @delete-room=${()=>this._deleteRoom(t)}
                .jump=${this._jump}
                @view-changed=${i=>{let s=i.detail.view;this._openActivity=s.kind==="activity"?s.id:void 0}}
              ></easy-av-control-room-editor>`:r`<div class="empty">${this._t("no_rooms")}</div>`}
      </main>
    </div>`}_goRoom(e){this._selected=e,this._page="room",this._openActivity=void 0,this._jump={flow:!1,n:(this._jump?.n??0)+1}}_openGuide(){this._page!=="guide"&&(this._back=this._page),this._page="guide",window.scrollTo({top:0})}async _setSidebar(e){this._sidebar=e;try{let t=await this.hass.callWS({type:"easy_av_control/ui/sidebar",visible:e});this._sidebar=t.visible}catch{this._sidebar=!e}}_goActivity(e,t,i){this._selected=e,this._page="room",this._jump={activity:t,flow:i,n:(this._jump?.n??0)+1}}_renderBanner(){let e=this._banner;if(!e)return h;switch(e.kind){case"saved":return r`<div class="banner ok">${this._t("saved")}</div>`;case"applied":return r`<div class="banner warning">${this._t("detect_applied")}</div>`;case"invalid":return r`<div class="banner error">
          ${this._t("invalid",{path:e.path||"\u2013",message:e.message})}
        </div>`;case"conflict":return r`<div class="banner error">
          ${this._t("conflict")}
          <button class="flat" @click=${()=>this._reload()}>${this._t("reload")}</button>
        </div>`;case"missing":return r`<div class="banner warning">
          ${this._t("missing")}
          <ul>
            ${e.missing.map(t=>r`<li>
                <code>${t.entity_id}</code> (${this._rooms?.[t.room]?.name??t.room}: ${t.path})
              </li>`)}
          </ul>
          <div class="sub">${this._t("missing_hint")}</div>
          <button class="primary" @click=${()=>this._save(!0)}>${this._t("save_anyway")}</button>
        </div>`}}};ye.properties={hass:{attribute:!1},narrow:{type:Boolean},_rooms:{state:!0},_selected:{state:!0},_loadError:{state:!0},_banner:{state:!0},_saving:{state:!0},_ready:{state:!0},_sources:{state:!0},_soundModes:{state:!0},_adding:{state:!0},_profiles:{state:!0},_page:{state:!0},_draftFor:{state:!0},_focusProfile:{state:!0},_version:{state:!0},_jump:{state:!0},_sidebar:{state:!0},_openActivity:{state:!0}},ye.styles=[k,x,$,b`
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
      font-size: var(--ltek-fs-small);
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
    /* Design guide */
    .nav-title {
      color: var(--ltek-c-muted);
      font-size: var(--ltek-fs-small);
      font-weight: var(--ltek-fw-semibold);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .nav-foot {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--ltek-sp-3);
      margin-top: var(--ltek-sp-6);
      padding-top: var(--ltek-sp-5);
      border-top: 1px solid var(--divider-color);
    }
    .layout.narrow .nav-foot {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
    }
    .nav-title.library {
      margin-top: var(--ltek-sp-6);
    }
    button.room {
      display: flex;
      align-items: center;
      gap: var(--ltek-sp-2);
      border-radius: var(--ltek-r-ctrl);
      background: var(--ltek-c-surface-raised);
      border: 1px solid var(--ltek-c-border-soft);
      font-size: var(--ltek-fs-label);
    }
    button.room.active {
      background: var(--ltek-c-accent-fade);
      border-color: var(--ltek-c-accent);
      color: var(--ltek-c-text);
    }
    .nav-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    .nav-head .nav-title {
      margin-bottom: 0;
      width: auto;
    }
    button.nav-add {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      padding: 0;
      border: 1px dashed var(--ltek-c-accent);
      border-radius: var(--ltek-r-ctrl);
      background: transparent;
      color: var(--ltek-c-accent);
      cursor: pointer;
      --mdc-icon-size: 18px;
    }
    button.nav-add:hover {
      background: var(--ltek-c-accent-fade-soft);
    }
    /* In the sidebar: a chip that switches the panel's sidebar entry */
    button.sidebar-chip {
      align-self: flex-start;
      display: inline-flex;
      align-items: center;
      gap: var(--ltek-sp-1);
      margin-top: var(--ltek-sp-1);
      padding: 3px 12px 3px 8px;
      border-radius: 14px;
      border: 1px solid var(--ltek-c-border);
      background: transparent;
      color: var(--ltek-c-muted);
      font: inherit;
      font-size: var(--ltek-fs-small);
      cursor: pointer;
      --mdc-icon-size: 16px;
    }
    button.sidebar-chip.on {
      border-color: var(--ltek-c-accent);
      color: var(--ltek-c-accent);
      background: var(--ltek-c-accent-fade);
    }
    /* A room's activities, under it in the menu; the icon on the right opens the Flow */
    .nav-activity {
      display: flex;
      align-items: center;
      gap: var(--ltek-sp-1);
      margin-left: var(--ltek-sp-4);
      padding-right: var(--ltek-sp-2);
      border-radius: var(--ltek-r-ctrl);
      border: 1px solid transparent;
    }
    .nav-activity:hover {
      background: var(--ltek-c-accent-fade-soft);
    }
    .nav-activity.active {
      border-color: var(--ltek-c-accent);
      background: var(--ltek-c-accent-fade);
    }
    .nav-act-name {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      gap: var(--ltek-sp-2);
      border: none;
      background: none;
      padding: 6px 8px;
      font: inherit;
      font-size: var(--ltek-fs-body);
      color: var(--ltek-c-text);
      text-align: left;
      cursor: pointer;
      --mdc-icon-size: 18px;
    }
    .nav-act-name ha-icon {
      color: var(--accent-color, var(--ltek-c-accent));
      flex: none;
    }
    .nav-act-name span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    button.nav-flow {
      --mdc-icon-size: 18px;
      color: var(--ltek-c-accent);
    }
    .layout.narrow .nav-activity {
      margin-left: 0;
    }
    button.room.add {
      border: 1px dashed var(--ltek-c-accent);
      color: var(--ltek-c-accent);
      background: transparent;
    }
    .banner {
      border-radius: var(--ltek-r-md);
    }
  `];customElements.get("easy-av-control-panel")||customElements.define("easy-av-control-panel",ye);export{ye as EasyAvControlPanel};
