var be=globalThis,ye=be.ShadowRoot&&(be.ShadyCSS===void 0||be.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Le=Symbol(),wt=new WeakMap,Z=class{constructor(s,e,t){if(this._$cssResult$=!0,t!==Le)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=s,this.t=e}get styleSheet(){let s=this.o,e=this.t;if(ye&&s===void 0){let t=e!==void 0&&e.length===1;t&&(s=wt.get(e)),s===void 0&&((this.o=s=new CSSStyleSheet).replaceSync(this.cssText),t&&wt.set(e,s))}return s}toString(){return this.cssText}},we=a=>new Z(typeof a=="string"?a:a+"",void 0,Le),v=(a,...s)=>{let e=a.length===1?a[0]:s.reduce((t,i,n)=>t+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+a[n+1],a[0]);return new Z(e,a,Le)},kt=(a,s)=>{if(ye)a.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of s){let t=document.createElement("style"),i=be.litNonce;i!==void 0&&t.setAttribute("nonce",i),t.textContent=e.cssText,a.appendChild(t)}},Ne=ye?a=>a:a=>a instanceof CSSStyleSheet?(s=>{let e="";for(let t of s.cssRules)e+=t.cssText;return we(e)})(a):a;var{is:fi,defineProperty:gi,getOwnPropertyDescriptor:vi,getOwnPropertyNames:bi,getOwnPropertySymbols:yi,getPrototypeOf:wi}=Object,ke=globalThis,$t=ke.trustedTypes,ki=$t?$t.emptyScript:"",$i=ke.reactiveElementPolyfillSupport,Y=(a,s)=>a,Ve={toAttribute(a,s){switch(s){case Boolean:a=a?ki:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,s){let e=a;switch(s){case Boolean:e=a!==null;break;case Number:e=a===null?null:Number(a);break;case Object:case Array:try{e=JSON.parse(a)}catch{e=null}}return e}},St=(a,s)=>!fi(a,s),xt={attribute:!0,type:String,converter:Ve,reflect:!1,useDefault:!1,hasChanged:St};Symbol.metadata??=Symbol("metadata"),ke.litPropertyMetadata??=new WeakMap;var R=class extends HTMLElement{static addInitializer(s){this._$Ei(),(this.l??=[]).push(s)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(s,e=xt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(s)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(s,e),!e.noAccessor){let t=Symbol(),i=this.getPropertyDescriptor(s,t,e);i!==void 0&&gi(this.prototype,s,i)}}static getPropertyDescriptor(s,e,t){let{get:i,set:n}=vi(this.prototype,s)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let l=i?.call(this);n?.call(this,o),this.requestUpdate(s,l,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(s){return this.elementProperties.get(s)??xt}static _$Ei(){if(this.hasOwnProperty(Y("elementProperties")))return;let s=wi(this);s.finalize(),s.l!==void 0&&(this.l=[...s.l]),this.elementProperties=new Map(s.elementProperties)}static finalize(){if(this.hasOwnProperty(Y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Y("properties"))){let e=this.properties,t=[...bi(e),...yi(e)];for(let i of t)this.createProperty(i,e[i])}let s=this[Symbol.metadata];if(s!==null){let e=litPropertyMetadata.get(s);if(e!==void 0)for(let[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let i=this._$Eu(e,t);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(s){let e=[];if(Array.isArray(s)){let t=new Set(s.flat(1/0).reverse());for(let i of t)e.unshift(Ne(i))}else s!==void 0&&e.push(Ne(s));return e}static _$Eu(s,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof s=="string"?s.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(s=>this.enableUpdating=s),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(s=>s(this))}addController(s){(this._$EO??=new Set).add(s),this.renderRoot!==void 0&&this.isConnected&&s.hostConnected?.()}removeController(s){this._$EO?.delete(s)}_$E_(){let s=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(s.set(t,this[t]),delete this[t]);s.size>0&&(this._$Ep=s)}createRenderRoot(){let s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return kt(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(s=>s.hostConnected?.())}enableUpdating(s){}disconnectedCallback(){this._$EO?.forEach(s=>s.hostDisconnected?.())}attributeChangedCallback(s,e,t){this._$AK(s,t)}_$ET(s,e){let t=this.constructor.elementProperties.get(s),i=this.constructor._$Eu(s,t);if(i!==void 0&&t.reflect===!0){let n=(t.converter?.toAttribute!==void 0?t.converter:Ve).toAttribute(e,t.type);this._$Em=s,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(s,e){let t=this.constructor,i=t._$Eh.get(s);if(i!==void 0&&this._$Em!==i){let n=t.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Ve;this._$Em=i;let l=o.fromAttribute(e,n.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(s,e,t,i=!1,n){if(s!==void 0){let o=this.constructor;if(i===!1&&(n=this[s]),t??=o.getPropertyOptions(s),!((t.hasChanged??St)(n,e)||t.useDefault&&t.reflect&&n===this._$Ej?.get(s)&&!this.hasAttribute(o._$Eu(s,t))))return;this.C(s,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(s,e,{useDefault:t,reflect:i,wrapped:n},o){t&&!(this._$Ej??=new Map).has(s)&&(this._$Ej.set(s,o??e??this[s]),n!==!0||o!==void 0)||(this._$AL.has(s)||(this.hasUpdated||t||(e=void 0),this._$AL.set(s,e)),i===!0&&this._$Em!==s&&(this._$Eq??=new Set).add(s))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let s=this.scheduleUpdate();return s!=null&&await s,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[i,n]of t){let{wrapped:o}=n,l=this[i];o!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,n,l)}}let s=!1,e=this._$AL;try{s=this.shouldUpdate(e),s?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw s=!1,this._$EM(),t}s&&this._$AE(e)}willUpdate(s){}_$AE(s){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(s)),this.updated(s)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(s){return!0}update(s){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(s){}firstUpdated(s){}};R.elementStyles=[],R.shadowRootOptions={mode:"open"},R[Y("elementProperties")]=new Map,R[Y("finalized")]=new Map,$i?.({ReactiveElement:R}),(ke.reactiveElementVersions??=[]).push("2.1.2");var Ge=globalThis,At=a=>a,$e=Ge.trustedTypes,Et=$e?$e.createPolicy("lit-html",{createHTML:a=>a}):void 0,We="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,Be="?"+O,xi=`<${Be}>`,C=document,J=()=>C.createComment(""),X=a=>a===null||typeof a!="object"&&typeof a!="function",Ke=Array.isArray,zt=a=>Ke(a)||typeof a?.[Symbol.iterator]=="function",He=`[ 	
\f\r]`,Q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Tt=/-->/g,Rt=/>/g,z=RegExp(`>|${He}(?:([^\\s"'>=/]+)(${He}*=${He}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ot=/'/g,Pt=/"/g,jt=/^(?:script|style|textarea|title)$/i,Ue=a=>(s,...e)=>({_$litType$:a,strings:s,values:e}),r=Ue(1),Fe=Ue(2),ns=Ue(3),A=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Dt=new WeakMap,j=C.createTreeWalker(C,129);function Ct(a,s){if(!Ke(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return Et!==void 0?Et.createHTML(s):s}var Mt=(a,s)=>{let e=a.length-1,t=[],i,n=s===2?"<svg>":s===3?"<math>":"",o=Q;for(let l=0;l<e;l++){let c=a[l],d,p,h=-1,m=0;for(;m<c.length&&(o.lastIndex=m,p=o.exec(c),p!==null);)m=o.lastIndex,o===Q?p[1]==="!--"?o=Tt:p[1]!==void 0?o=Rt:p[2]!==void 0?(jt.test(p[2])&&(i=RegExp("</"+p[2],"g")),o=z):p[3]!==void 0&&(o=z):o===z?p[0]===">"?(o=i??Q,h=-1):p[1]===void 0?h=-2:(h=o.lastIndex-p[2].length,d=p[1],o=p[3]===void 0?z:p[3]==='"'?Pt:Ot):o===Pt||o===Ot?o=z:o===Tt||o===Rt?o=Q:(o=z,i=void 0);let _=o===z&&a[l+1].startsWith("/>")?" ":"";n+=o===Q?c+xi:h>=0?(t.push(d),c.slice(0,h)+We+c.slice(h)+O+_):c+O+(h===-2?l:_)}return[Ct(a,n+(a[e]||"<?>")+(s===2?"</svg>":s===3?"</math>":"")),t]},ee=class a{constructor({strings:s,_$litType$:e},t){let i;this.parts=[];let n=0,o=0,l=s.length-1,c=this.parts,[d,p]=Mt(s,e);if(this.el=a.createElement(d,t),j.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=j.nextNode())!==null&&c.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let h of i.getAttributeNames())if(h.endsWith(We)){let m=p[o++],_=i.getAttribute(h).split(O),f=/([.?@])?(.*)/.exec(m);c.push({type:1,index:n,name:f[2],strings:_,ctor:f[1]==="."?Se:f[1]==="?"?Ae:f[1]==="@"?Ee:I}),i.removeAttribute(h)}else h.startsWith(O)&&(c.push({type:6,index:n}),i.removeAttribute(h));if(jt.test(i.tagName)){let h=i.textContent.split(O),m=h.length-1;if(m>0){i.textContent=$e?$e.emptyScript:"";for(let _=0;_<m;_++)i.append(h[_],J()),j.nextNode(),c.push({type:2,index:++n});i.append(h[m],J())}}}else if(i.nodeType===8)if(i.data===Be)c.push({type:2,index:n});else{let h=-1;for(;(h=i.data.indexOf(O,h+1))!==-1;)c.push({type:7,index:n}),h+=O.length-1}n++}}static createElement(s,e){let t=C.createElement("template");return t.innerHTML=s,t}};function M(a,s,e=a,t){if(s===A)return s;let i=t!==void 0?e._$Co?.[t]:e._$Cl,n=X(s)?void 0:s._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(a),i._$AT(a,e,t)),t!==void 0?(e._$Co??=[])[t]=i:e._$Cl=i),i!==void 0&&(s=M(a,i._$AS(a,s.values),i,t)),s}var xe=class{constructor(s,e){this._$AV=[],this._$AN=void 0,this._$AD=s,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(s){let{el:{content:e},parts:t}=this._$AD,i=(s?.creationScope??C).importNode(e,!0);j.currentNode=i;let n=j.nextNode(),o=0,l=0,c=t[0];for(;c!==void 0;){if(o===c.index){let d;c.type===2?d=new W(n,n.nextSibling,this,s):c.type===1?d=new c.ctor(n,c.name,c.strings,this,s):c.type===6&&(d=new Te(n,this,s)),this._$AV.push(d),c=t[++l]}o!==c?.index&&(n=j.nextNode(),o++)}return j.currentNode=C,i}p(s){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(s,t,e),e+=t.strings.length-2):t._$AI(s[e])),e++}},W=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(s,e,t,i){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=s,this._$AB=e,this._$AM=t,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let s=this._$AA.parentNode,e=this._$AM;return e!==void 0&&s?.nodeType===11&&(s=e.parentNode),s}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(s,e=this){s=M(this,s,e),X(s)?s===u||s==null||s===""?(this._$AH!==u&&this._$AR(),this._$AH=u):s!==this._$AH&&s!==A&&this._(s):s._$litType$!==void 0?this.$(s):s.nodeType!==void 0?this.T(s):zt(s)?this.k(s):this._(s)}O(s){return this._$AA.parentNode.insertBefore(s,this._$AB)}T(s){this._$AH!==s&&(this._$AR(),this._$AH=this.O(s))}_(s){this._$AH!==u&&X(this._$AH)?this._$AA.nextSibling.data=s:this.T(C.createTextNode(s)),this._$AH=s}$(s){let{values:e,_$litType$:t}=s,i=typeof t=="number"?this._$AC(s):(t.el===void 0&&(t.el=ee.createElement(Ct(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new xe(i,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(s){let e=Dt.get(s.strings);return e===void 0&&Dt.set(s.strings,e=new ee(s)),e}k(s){Ke(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,i=0;for(let n of s)i===e.length?e.push(t=new a(this.O(J()),this.O(J()),this,this.options)):t=e[i],t._$AI(n),i++;i<e.length&&(this._$AR(t&&t._$AB.nextSibling,i),e.length=i)}_$AR(s=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);s!==this._$AB;){let t=At(s).nextSibling;At(s).remove(),s=t}}setConnected(s){this._$AM===void 0&&(this._$Cv=s,this._$AP?.(s))}},I=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(s,e,t,i,n){this.type=1,this._$AH=u,this._$AN=void 0,this.element=s,this.name=e,this._$AM=i,this.options=n,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=u}_$AI(s,e=this,t,i){let n=this.strings,o=!1;if(n===void 0)s=M(this,s,e,0),o=!X(s)||s!==this._$AH&&s!==A,o&&(this._$AH=s);else{let l=s,c,d;for(s=n[0],c=0;c<n.length-1;c++)d=M(this,l[t+c],e,c),d===A&&(d=this._$AH[c]),o||=!X(d)||d!==this._$AH[c],d===u?s=u:s!==u&&(s+=(d??"")+n[c+1]),this._$AH[c]=d}o&&!i&&this.j(s)}j(s){s===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,s??"")}},Se=class extends I{constructor(){super(...arguments),this.type=3}j(s){this.element[this.name]=s===u?void 0:s}},Ae=class extends I{constructor(){super(...arguments),this.type=4}j(s){this.element.toggleAttribute(this.name,!!s&&s!==u)}},Ee=class extends I{constructor(s,e,t,i,n){super(s,e,t,i,n),this.type=5}_$AI(s,e=this){if((s=M(this,s,e,0)??u)===A)return;let t=this._$AH,i=s===u&&t!==u||s.capture!==t.capture||s.once!==t.once||s.passive!==t.passive,n=s!==u&&(t===u||i);i&&this.element.removeEventListener(this.name,this,t),n&&this.element.addEventListener(this.name,this,s),this._$AH=s}handleEvent(s){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,s):this._$AH.handleEvent(s)}},Te=class{constructor(s,e,t){this.element=s,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(s){M(this,s)}},It={M:We,P:O,A:Be,C:1,L:Mt,R:xe,D:zt,V:M,I:W,H:I,N:Ae,U:Ee,B:Se,F:Te},Si=Ge.litHtmlPolyfillSupport;Si?.(ee,W),(Ge.litHtmlVersions??=[]).push("3.3.3");var Lt=(a,s,e)=>{let t=e?.renderBefore??s,i=t._$litPart$;if(i===void 0){let n=e?.renderBefore??null;t._$litPart$=i=new W(s.insertBefore(J(),n),n,void 0,e??{})}return i._$AI(a),i};var qe=globalThis,g=class extends R{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let s=super.createRenderRoot();return this.renderOptions.renderBefore??=s.firstChild,s}update(s){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(s),this._$Do=Lt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};g._$litElement$=!0,g.finalized=!0,qe.litElementHydrateSupport?.({LitElement:g});var Ai=qe.litElementPolyfillSupport;Ai?.({LitElement:g});(qe.litElementVersions??=[]).push("4.2.2");var Ei=`
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
`,y=v`
  :host {
    ${we(Ei)}
  }
`,w=v`
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
`,$=v`
  :host {
    --ltek-fs-panel-title: 17px;
    --ltek-fs-header: 16px;
    --ltek-fs-group: 15px;
    --ltek-fs-label: 14px;
    --ltek-fs-body: 13px;
    --ltek-fs-small: 12px;
    --ltek-fs-tiny: 11px;
  }
`,B="https://github.com/Ltek/easy-av-control";var Re={en:{"state.idle":"Off","flow.show":"Flow","flow.details":"Details","editor.show_flow":"Flow (opens by itself while the room starts or stops)","editor.flow_details":"Flow with entities, actions and notes","state.starting":"Starting \u2026","state.active":"On","now.paused":"Paused","state.stopping":"Stopping \u2026","state.error":"Error",power:"On/off",loading:"Loading \u2026",not_found:'Room "{room}" not found',no_room:"Pick a room in the card settings",warnings:"Warnings",volume:"Volume","command.volume_up":"Volume up","command.volume_down":"Volume down","command.mute":"Mute","command.volume_set":"Volume slider","command.select_source":"Select source","command.select_sound_mode":"Select sound mode","command.channel_up":"Channel up","command.channel_down":"Channel down","command.play_pause":"Play/pause","command.play":"Play","command.pause":"Pause","command.stop":"Stop","command.next":"Next","command.previous":"Previous","command.up":"Up","command.down":"Down","command.left":"Left","command.right":"Right","command.ok":"OK","command.back":"Back","command.menu":"Menu","command.home":"Home","command.info":"Info","command.guide":"Guide","command.exit":"Exit","editor.room":"Room","editor.section":"Card","editor.hint":"The room this card controls. The card shows its activities, the remote of the running one, and its settings.","editor.star":"\u2B50 Star on GitHub","editor.report":"\u{1F41B} Report an issue","editor.name":"Title (optional)","doing.power_on":"Turning the outlets on","doing.power_off":"Turning the outlets off","doing.boot":"{name} is booting","doing.reload":"Reconnecting {name}","doing.ready":"Waiting for {name}","doing.turn_on":"Turning on {name}","doing.warm_up":"{name} is starting up","doing.status_on":"Waiting for {name} to be on","doing.status_on_value":"{name}: {value}","doing.status_off":"Waiting for {name} to be off","doing.status_off_value":"{name}: {value}","doing.turn_off":"Turning off {name}","doing.checks":"Checking that everything works","doing.step":"Step {step} of {steps}: {what}","doing.wait":"Step {step} of {steps}: waiting","doing.hooks_on_start":"Waiting for the actions on start","doing.hooks_on_stop":"Waiting for the actions on stop","doing.left":"{time} left","doing.at_most":"at most {time}","cooling.text":"Cooling down: {names}","cooling.time":"power off in {time}","cooling.time_status":"power off once they are off, at most {time}",touchpad:"Touch surface: swipe for the arrow keys, tap for OK","touchpad.hint":"Swipe \xB7 tap for OK","rocker.volume":"VOL","rocker.channels":"CH","pad.show_arrows":"Show arrow keys","pad.show_touchpad":"Show touch surface",settings:"Settings","setting.source":"Source","setting.sound_mode":"Sound mode","toggle.on":"On","toggle.off":"Off","step.power_on":"Switch on","step.power_off":"Switch off","step.set_source":"Set source","step.set_volume":"Set volume","step.set_sound_mode":"Set sound mode","step.set_brightness":"Set brightness","step.set_color_temp":"Set color temperature","step.set_position":"Set cover position","step.set_tilt":"Set cover tilt","step.call_action":"Run action","step.delay":"Wait","step.wait_available":"Wait until available","step.wait_picture":"Wait for a picture"},de:{"state.idle":"Aus","flow.show":"Ablauf","flow.details":"Details","editor.show_flow":"Ablauf (\xF6ffnet sich selbst, w\xE4hrend der Raum startet oder stoppt)","editor.flow_details":"Ablauf mit Entit\xE4ten, Aktionen und Hinweisen","state.starting":"Startet \u2026","state.active":"An","now.paused":"Pausiert","state.stopping":"Stoppt \u2026","state.error":"Fehler",power:"Ein/Aus",loading:"L\xE4dt \u2026",not_found:"Raum \u201E{room}\u201C nicht gefunden",no_room:"Bitte in den Karteneinstellungen einen Raum w\xE4hlen",warnings:"Warnungen",volume:"Lautst\xE4rke","command.volume_up":"Lauter","command.volume_down":"Leiser","command.mute":"Stumm","command.volume_set":"Lautst\xE4rkeregler","command.select_source":"Quelle w\xE4hlen","command.select_sound_mode":"Klangmodus w\xE4hlen","command.channel_up":"Kanal hoch","command.channel_down":"Kanal runter","command.play_pause":"Wiedergabe/Pause","command.play":"Wiedergabe","command.pause":"Pause","command.stop":"Stopp","command.next":"Weiter","command.previous":"Zur\xFCck","command.up":"Hoch","command.down":"Runter","command.left":"Links","command.right":"Rechts","command.ok":"OK","command.back":"Zur\xFCck","command.menu":"Men\xFC","command.home":"Start","command.info":"Info","command.guide":"EPG","command.exit":"Beenden","editor.room":"Raum","editor.section":"Karte","editor.hint":"Der Raum, den diese Karte steuert. Sie zeigt seine Aktivit\xE4ten, die Fernbedienung der laufenden und ihre Einstellungen.","editor.star":"\u2B50 Auf GitHub markieren","editor.report":"\u{1F41B} Problem melden","editor.name":"Titel (optional)","doing.power_on":"Steckdosen werden eingeschaltet","doing.power_off":"Steckdosen werden ausgeschaltet","doing.boot":"{name} bootet","doing.reload":"{name} wird neu verbunden","doing.ready":"Warte auf {name}","doing.turn_on":"{name} wird eingeschaltet","doing.warm_up":"{name} f\xE4hrt hoch","doing.status_on":"Warte, bis {name} an ist","doing.status_on_value":"{name}: {value}","doing.status_off":"Warte, bis {name} aus ist","doing.status_off_value":"{name}: {value}","doing.turn_off":"{name} wird ausgeschaltet","doing.checks":"Pr\xFCfe, ob alles l\xE4uft","doing.step":"Schritt {step} von {steps}: {what}","doing.wait":"Schritt {step} von {steps}: warten","doing.hooks_on_start":"Warte auf die Aktionen beim Start","doing.hooks_on_stop":"Warte auf die Aktionen beim Stopp","doing.left":"noch {time}","doing.at_most":"h\xF6chstens noch {time}","cooling.text":"Abk\xFChlen: {names}","cooling.time":"Strom aus in {time}","cooling.time_status":"Strom aus, sobald sie aus sind, h\xF6chstens noch {time}",touchpad:"Touchfl\xE4che: wischen f\xFCr die Pfeiltasten, tippen f\xFCr OK","touchpad.hint":"Wischen \xB7 Tippen f\xFCr OK","rocker.volume":"VOL","rocker.channels":"CH","pad.show_arrows":"Pfeiltasten zeigen","pad.show_touchpad":"Touchfl\xE4che zeigen",settings:"Einstellungen","setting.source":"Quelle","setting.sound_mode":"Klangmodus","toggle.on":"An","toggle.off":"Aus","step.power_on":"Einschalten","step.power_off":"Ausschalten","step.set_source":"Quelle w\xE4hlen","step.set_volume":"Lautst\xE4rke setzen","step.set_sound_mode":"Klangmodus w\xE4hlen","step.set_brightness":"Helligkeit setzen","step.set_color_temp":"Farbtemperatur setzen","step.set_position":"Rollladen-Position setzen","step.set_tilt":"Lamellen-Neigung setzen","step.call_action":"Aktion ausf\xFChren","step.delay":"Warten","step.wait_available":"Auf Verf\xFCgbarkeit warten","step.wait_picture":"Auf ein Bild warten"}};function K(a,s,e={}){let t=(a??"en").split("-")[0],n=(t in Re?Re[t]:Re.en)[s]??Re.en[s]??s;for(let[o,l]of Object.entries(e))n=n.replace(`{${o}}`,l);return n}var Nt={en:{"pf.form":"Form","pf.form_hint":"Every part of the profile, picked on a real device of its integration. Entities are stored the way any Home Assistant finds them (type and translation key), never by their entity ID.","pf.general":"General","pf.general_hint":"What the profile is for, and where its devices go in an activity's power-on order.","pf.name":"Name","pf.id":"ID","pf.integration":"Integration","pf.example":"Example device","pf.no_example":"No device of this integration here: entities can't be picked, only typed in YAML.","pf.device_entity":"Device entity","pf.order":"Power-on order","pf.status":"Status","pf.status_hint":"Which entity says the device is on, and what each of its values means. Tap a value it shows to add it, or type one.","pf.status_entity":"Status entity","pf.status_own":"None picked: the device entity's own state is the status.","pf.status_other":"This entity's state (or attribute) is the status.","pf.attribute":"Attribute","pf.attribute_none":"Its state","pf.now":"Now: {value}","pf.available_is_on":"On while this entity is available (it's unavailable while the device is off)","pf.group.starting":"Starting","pf.group.on":"On","pf.group.stopping":"Stopping","pf.group.off":"Off","pf.group.error":"Error","pf.other_value":"Other value \u2026","pf.timing":"Timing","pf.timing_hint":"How long to wait for on and off before the device's failure setting applies, and how long a state must hold.","pf.timeout_on":"Timeout, turning on","pf.timeout_off":"Timeout, turning off","pf.debounce":"Debounce","pf.reset":"Back to the default","pf.companions":"Remote, outlet and settings","pf.companions_hint":"Filled in on every device that uses this profile.","pf.remote":"Remote (arrow keys)","pf.power_switch":"Power outlet switch","pf.settings":"Settings in the card","pf.settings_hint":"Offered in the remote card while an activity runs.","pf.picture":"Picture check","pf.picture_hint":"A device that can tell whether a picture arrives (Lumagen Active Video, JVC Source Display): Detect integrations adds a picture check for it to the activity's Checks.","pf.picture_on":"This device has a picture check","pf.picture_entity":"Entity","pf.picture_ok":"Picture","pf.picture_fail":"No picture","pf.picture_timeout":"Timeout","pf.jobs":"Jobs","pf.jobs_hint":"For a device several integrations cover (a TV with PiPup, ADB and Android TV Remote): the jobs this one does. Lower numbers win.","pf.none":"None","pf.not_on_device":"not on this device",detect_used_integration:"Used for this device's state",detect_open_profile:"Open this profile",detect_no_area:"No area",detect_select_all:"Select all",timing_on:"Comes on in about {typical} ({count} measured, slowest {slowest})",timing_off:"Goes off in about {typical} ({count} measured, slowest {slowest})",timing_use:"Use measured timeouts",timing_use_hint:"Sets the status timeouts to what the measured times suggest: half as long again as usual, and longer than the slowest seen.","flow.typical":"usually {seconds}",setup:"Setup","flow.picture":"{step}. Wait until {entity} shows {states}, at most {timeout}","field.on_failure_picture":"If there's no picture",detect:"Detect integrations",detect_intro:"Compares what's installed in Home Assistant with what the rooms use. Tick what to change, then Apply: the changes appear as unsaved, and nothing is stored until you press Save.",detect_running:"Looking at your integrations \u2026",detect_nothing:"Nothing to change: every AV device with a profile is in a room, and every entity the rooms use exists.",detect_new:"Detected devices",detect_new_hint:"Devices no room uses yet, by their Home Assistant area. Tick the ones to add: they go into the activities you tick, at the place their profile gives in the power-on order (early, middle, late), with their status, remote and outlet filled in. The profile chip opens its profile; the blue integration chip is the one used for the device's state.",detect_room:"Room",detect_new_room:"New room: {name}",detect_activities:"Add to",detect_no_activities:"This room has no activities yet.",detect_starter:"Create a new Activity per Room using the selected Devices",detect_picture:"with a picture check",detect_better:"Better integrations",detect_better_hint:"A device a room uses that another integration now covers better (it reports faster or says more). Not ticked: tick to switch.",detect_better_row:"{from} \u2192 {to}",detect_gone:"Missing entities",detect_gone_hint:"Entities a room uses that no longer exist, for example after removing an integration. Where the same device is still covered by another integration, it is offered as the replacement.",detect_replace_with:"Replace with {entity} ({integration})",detect_no_replacement:"Nothing replaces it; fix it by hand. A device without a status uses its fixed times.",detect_renamed:"Renamed entities",detect_renamed_hint:"The same entity under a new ID. It's replaced everywhere except in actions and commands: check those.",detect_unmatched:"Integrations without a profile",detect_unmatched_hint:"Their devices work with fixed times. Create a profile so Easy AV Control can wait for their own states.",detect_create_profile:"+ Profile",detect_apply:"Apply",detect_applied:"Applied. Review the rooms, then press Save.",detect_again:"Detect again",profile_new:"+ Profile",profile_new_pick:"Integration",profile_new_hint:"Integrations here with a media player or remote and no profile. The draft starts from the first device of the one you pick.",profile_new_none:"Every integration with a media player or remote has a profile.",learn:"Learn",learn_hint:"Turn the device on, then off, here: Easy AV Control records what {entity} shows and fills in which states mean starting, on, stopping and off.",learn_on:"Turn on now",learn_off:"Turn off now",learn_seen_on:"Turning on: {states}",learn_seen_off:"Turning off: {states}",learn_use:"Use what was seen",learn_nothing:"Nothing recorded yet.","flow.status_on":"Wait until {device} says it's on ({entity}), at most {timeout}","flow.status_off":"Wait until {device} says it's off ({entity}), at most {timeout}","flow.outlets_off_status":"Turn off the outlet once its devices say they're off: {outlets}","flow.debounce":"state must hold {seconds}",profiles:"Profiles",profiles_intro:"A profile tells Easy AV Control what an integration's entities say about a device: which entity shows that it's on, what its states mean, its remote, outlet and settings. Built-in ones are locked: duplicate one to change it.",profiles_builtin:"Built in",profiles_yours:"Yours",profiles_none_yours:"None yet. Duplicate a built-in profile, or import one.",profile_generic:"for any media player without its own profile",profile_untested:"From the integration's code, not tested on a device",profile_used_by:"Used by {where}",profile_unused:"Not used by a device",profile_preview:"Show the summary",profile_view:"View",profile_edit:"Edit",profile_duplicate:"Duplicate",profile_delete_confirm:'Delete your profile "{name}"? Devices that use it go back to the built-in one.',profile_readonly:"Built in: read only. Duplicate it to make your own version.",profile_editor_hint:"The profile as YAML. Entities are found on the device by domain and translation_key, never by entity ID, so the profile works on any Home Assistant.",profile_save:"Save profile",profile_close:"Close",profile_cancel:"Cancel",profile_saved:"Profile saved.",profile_export:"Export",profile_export_all:"Export yours",profile_import:"Import",profile_import_hint:"Paste an Easy AV Control profile export. Profiles you already have are never replaced: one with a taken ID is added under a new one.",profile_import_done:"Added: {added}",profile_import_renamed:"{from} added as {to}",profile_import_invalid:"Not valid, skipped: {ids}",profile_copy:"Copy to clipboard",profile_copied:"Copied \u2713",profile_copy_failed:"Press Ctrl/Cmd+C",profile_paste:"Paste from clipboard",profile_paste_failed:"Paste with Ctrl/Cmd+V",profile_share:"Share a profile",profile_share_hint:"Made one for a device others have too? Export it and send the text with Report an issue (at the bottom of the menu): accepted profiles ship as built-in ones.",sum_indicator:"On / off from {what}",sum_indicator_device:"the device's own state",sum_indicator_available:"{what} being available",sum_states:"{groups}",sum_remote:"Remote",sum_outlet:"Outlet",sum_settings:"Settings",sum_picture:"Picture check",sum_order:"Power-on order: {order}",sum_roles:"Jobs: {roles}","order.early":"early","order.middle":"middle","order.late":"late","role.power":"power","role.navigation":"arrow keys","role.now_playing":"now playing","role.turn_off":"turn off",section_state:"Device state",hint_state:"How Easy AV Control knows this device is on or off. With a status, it waits for the device itself instead of fixed times.",detected:"Detected: {name}",detected_none:"No profile for this device's integration: it uses the fixed times below.",detected_uses:"Uses",detected_now:"Now: {value}",detected_found_indicator:"Status from {entity}",detected_found_attribute:"attribute {attribute}",detected_found_remote:"Remote: {entity}",detected_found_outlet:"Outlet: {entity}",detected_found_settings:"Settings: {entities}",detected_use:"Use these",detected_applied:"In use",detected_siblings:"Also covered by: {integrations}",detected_role:"{role}: {integration}",state_source:"Status","state_source.auto":"Automatic (from the profile)","state_source.none":"None: fixed times only","field.profile":"Profile","profile.auto":"Automatic (for its integration)","field.wait_on":"When turning on, wait for","field.wait_off":"Before cutting the outlet, wait for","wait.status":"Its status","wait.time":"A fixed time","wait.both":"Its status, then a fixed time","field.timeout_on":"Status timeout, turning on","field.timeout_off":"Status timeout, turning off","field.debounce":"Debounce","helper.debounce":"Seconds a state must hold before it counts, so a flicker doesn't.","field.on_failure_on":"If it doesn't come on","field.on_failure_off":"If it doesn't go off","failure.warn":"Warn and continue","failure.stop":"Stop the activity","failure.retry":"Try once more, then warn","failure_off.stop":"Leave its outlet on",state_fixed_only:"No status for this device: only the fixed times below apply.",footer_version:"Easy AV Control (Ltek) {version}",star:"\u2B50 Star on GitHub",report:"\u{1F41B} Report an issue",title:"Easy AV Control",rooms:"Rooms",add_room:"Add room",guide:"Guide",reports:"Reports","rep.title":"Reports","rep.hint":"How long each start and stop took, and how long each device took to come on and go off. Times are measured while Easy AV Control switches; the last 300 runs and 100 times per device are kept.","rep.refresh":"Refresh","rep.clear":"Clear","rep.clear_confirm":"Delete the whole history? The typical times used for timeouts stay.","rep.runs":"Runs","rep.devices":"Devices","rep.devices_hint":"From the turn-on (or turn-off) command until the device says it is on (off), for devices with a status. Only when Easy AV Control switched the device.","rep.no_runs":"No runs yet: start an activity.","rep.no_devices":"No device times yet. They are measured for devices with a status, when an activity switches them.","rep.show":"Show","rep.mode_all":"Starts and stops","rep.mode_start":"Start","rep.mode_stop":"Stop","rep.from":"from {activity}","rep.typical":"typical","rep.count":"{n} runs","rep.count_times":"{n} times","rep.failed":"{n} failed","rep.result_ok":"OK","rep.result_warning":"Warnings","rep.result_error":"Failed","rep.result_cancelled":"Cancelled","rep.phase_switch_off_unused":"Turn off what's not needed","rep.phase_outlets_on":"Outlets on","rep.phase_outlets_off":"Outlets off","rep.phase_checks":"Checks","rep.phase_steps":"Actions after start","rep.phase_hooks":"Actions on start / stop","rep.dir_on":"Turn on","rep.dir_off":"Turn off","rep.dir":"","rep.when":"When","rep.time":"Time","rep.result":"Result","rep.for":"Room \xB7 activity","rep.slow":"Slow",sidebar_chip:"Editor in Sidebar",sidebar_hint:"Show Easy AV Control in Home Assistant's sidebar. Hidden, it stays at /easy-av-control and under Settings \u2192 Devices & services \u2192 Easy AV Control \u2192 Configure.",no_rooms:"No rooms yet.",room_name:"Name",room_area:"Area",room_default_activity:"Default activity",default_last:"Last used","helper.default_activity":"What the room's on/off switch and toggle_activity start, e.g. from a wall button.",room_id_hint:"ID {id}",delete_room:"Delete room",delete_room_confirm:'Delete room "{name}" with all devices and activities?',tab_devices:"Devices",tab_activities:"Activities",tab_yaml:"YAML",add_device:"Add device",add_activity:"Add activity",delete:"Delete",move_up:"Move up",move_down:"Move down",device_id:"Device ID",device_in_use:'Device "{id}" is used by: {where}. Remove it there first.',activity_id_hint:"ID {id} \u2013 part of the entity IDs, cannot be changed",new_activity:"New activity",add_device_to_activity:"Add device \u2026",steps:"Actions after start",section_checks:"Checks",hint_checks:"What must be right before the activity counts as running, e.g. a picture on the Lumagen and on the projector. They run at the same time, once every device is on, and again when you switch to this activity from another.",add_check:"Check",check_profile:"Picture check of its profile",check_entity:"An entity of your own",check_what:"What",check_entity_label:"Entity",check_states:"Right when it shows",check_states_placeholder:"e.g. on, Active Video",check_timeout:"Timeout",check_failure:"If it isn't right",check_warn:"Warn and go on",check_stop:"Stop the activity",check_none:"No checks: the activity counts as running once its devices are on.",check_unless_text:"Waits until {entity} no longer shows {states}.",add_step:"Add step \u2026",hooks:"Actions on start and stop",remote:"Remote control",quick_select:"Quick select",quick_select_hint:"Buttons that switch a media player to a source; on an Apple TV the sources are its apps.",quick_select_no_player:"Add a media player to this activity first.",add_quick_select:"Add quick select",card_settings:"Settings in the card",card_settings_hint:"Source, sound mode and other settings of the devices, changeable in the card while the activity runs: those set on the devices, or a choice for this activity only. The section is closed until it is opened; each browser remembers that.","setting.entity":"Entity of the device","field.entity":"Entity","helper.entity":"A number (slider), select (list) or switch (on/off key), e.g. the receiver's bass.","field.settings_mode":"Show",settings_auto:"From the devices",settings_chosen:"Chosen here, with favourites",settings_auto_shows:"The card shows: {list}.",settings_auto_none:"The devices of this activity offer no settings yet. Choose them on a device, or start the activity once so its media players report their lists.",device_settings_hint:"What the card offers of this device, in every activity that uses it. Automatic: source and sound mode of a media player, and the number and select entities of the same device.",device_settings_auto:"Automatic",device_settings_auto_none:"Nothing found yet: no source or sound mode list reported, and no number or select entities of the same device.",device_settings_none:"The card shows no settings of this device.",settings_none:"The card shows no settings for this activity.",add_setting:"Add setting","field.setting":"Setting","field.options":"Favourites (optional)","helper.options":"Only these in the card, in this order; empty: the device's whole list.",commands:"Own commands",save:"Save",discard:"Discard",saving:"Saving \u2026",saved:"Saved",unsaved:"Unsaved changes",reload:"Reload",reload_confirm:"Discard your unsaved changes and load the saved configuration?",retry:"Try again",save_anyway:"Save anyway",conflict:"The configuration was changed elsewhere. Reload it \u2013 your unsaved changes here are lost.",invalid:"Not saved \u2013 {path}: {message}",missing:"These entities do not exist in Home Assistant:",missing_hint:"A device without power usually stays known. Most likely a typo or a renamed entity.",loading:"Loading \u2026",load_error:"Could not load the configuration: {error}",route_auto:"Automatic",route_none:"Hide",devices_intro:"Every device of the room that Easy AV Control switches or controls: TV, projector, receiver, player.",devices_empty:"No devices yet.",new_device:"New device",no_entity:"No entity chosen",entity_missing:"Entity not found in Home Assistant",used_by:"Used by: {where}",section_device:"Device",hint_device:"The Home Assistant entity of the device, usually a media player.",section_power:"Power Outlet",hint_power:"The outlet that powers the device: switched on before the device and off after it. Untick when the device isn't on a switched outlet.",power_use:"Switch this device's power outlet",section_delays:"Waiting times",hint_delays:"How long Easy AV Control waits for this device.",section_ready:"Connection check",hint_ready:"Waits until the device is reachable in Home Assistant, before switching it on and before remote buttons. For devices that lose their connection without power, such as an Apple TV.",ready_preset:"Use {entity} for the connection check and the arrow keys (recommended for Apple TV)",section_advanced:"Advanced",hint_device_advanced:"The device ID is used in the YAML configuration. Own commands map a button name to Home Assistant actions, e.g. arrow keys for a receiver box.",activities_intro:'An activity combines devices for one use, e.g. "Apple TV" = TV and Apple TV. Starting it switches on what it needs and off what it does not.',activities_empty:"No activities yet.",no_devices:"No devices",needs_devices:"Add the devices of this room first.",section_general:"General",hint_general:"Name and icon appear in the card. Position sorts the activities.",section_activity_devices:"Devices",hint_activity_devices:"Switched on in this order.",hint_steps:"Extra actions, in this order, once every device is on and the checks passed: e.g. switch the TV to its HDMI input, set the sound mode or the volume, dim the lights.",hint_remote:"Which device gets which buttons of the card. Automatic suits most setups.",hint_activity_advanced:"Commands in YAML, and Home Assistant actions on start and stop.",card_divider:"Remote control card",card_extra:"Extra buttons",hint_card_extra:"Buttons beyond the standard ones, as a YAML list.",card_shows:"The card shows",or:"or",other_integration:"Other",add_device_short:"Device",nav_flow:"Open the flow",step_picture_checks:"Waits until {entity} shows {states}.",step_picture_none:"{device} has no picture check, so this step waits for nothing.",yaml_intro:"The whole room as YAML. Changes here and in the forms are the same configuration.",add_room_name:"Name of the new room",create:"Add",cancel:"Cancel","helper.power_switch":"Shared outlets stay on while any device on them is needed.","helper.delay_after_power":"How long the device needs after the outlet came on. Only waited when the outlet was off.","helper.delay_after_on":"Until the device accepts commands. Only when it was switched on.","helper.delay_after_off":"Cool-down before the next device or the outlet is switched off, e.g. 180 s for a projector.","helper.ready_entity":"E.g. the remote of an Apple TV, which is on only while it is connected.","helper.ready_reload":"Skips the waiting time of an integration that retries its connection.","helper.source":"The list shows what the device reported last, so it must have been on once. A name can also be typed in.","field.entity_id":"Entity","field.name":"Display name","field.power_switch":"Power outlet","field.remote_entity":"Remote (optional)","helper.remote_entity":"Arrow keys, OK, back, home and menu of the card go to this remote entity, e.g. the remote of an Apple TV.","field.delay_after_power":"Boot time (s)","field.delay_after_on":"Wait after switching on (s)","field.delay_after_off":"Wait after switching off (s)","field.ready_enabled":"Wait until available before switching on","field.ready_entity":"Check this entity instead (optional)","field.ready_state":"Wait for state (optional, e.g. on)","field.ready_timeout":"Timeout (s)","field.ready_reload":"Reload its integration","field.ready_on_timeout":"On timeout","field.commands":"Own commands (YAML: name \u2192 actions)","field.icon":"Icon","field.order":"Position","field.on_start":"On start","field.on_stop":"On stop","field.volume":"Volume","field.channels":"Channels","field.transport":"Playback","field.navigation":"Navigation","field.touchpad":"Touch surface","helper.touchpad":"A swipe area instead of the arrow keys in the card. Automatic: for navigation that goes to a remote entity, e.g. an Apple TV.",touchpad_auto:"Automatic",touchpad_on:"On",touchpad_off:"Off (arrow keys)","field.buttons":"Extra buttons (YAML list)","field.label":"Label (optional, default: the source)","field.activity_commands":"Commands of this activity (YAML: name \u2192 actions)","field.type":"Type","field.device":"Device","field.source":"Source","field.volume_level":"Volume","field.sound_mode":"Sound mode","field.brightness_pct":"Brightness (%)","field.color_temp_kelvin":"Color temperature (K)","field.transition":"Transition (s)","field.position":"Position (%)","field.tilt_position":"Tilt (%)","field.action":"Action (e.g. script.turn_on)","field.data":"Data","field.target":"Target","field.timeout":"Timeout (s)","field.reload_integration":"Reload its integration","field.on_timeout":"On timeout","field.delay_after":"Wait afterwards (s)",on_timeout_abort:"Abort the start",on_timeout_continue:"Continue","step.power_on":"Switch on","step.power_off":"Switch off","step.set_source":"Set source","step.set_volume":"Set volume","step.set_sound_mode":"Set sound mode","step.set_brightness":"Set brightness","step.set_color_temp":"Set color temperature","step.set_position":"Set cover position","step.set_tilt":"Set cover tilt","step.call_action":"Call action","step.delay":"Wait","step.wait_available":"Wait until available",section_remote_preview:"Remote control preview",hint_remote_preview:"The card as it looks while this activity runs, with the settings above, also before saving. Tap a button to see where it goes; nothing is sent.","preview.tap":"Tap a button to see which device gets it and what runs there.","preview.this_activity":"this activity","preview.device_commands":"own command of the device: {actions}","preview.activity_commands":"own command of the activity: {actions}","preview.unknown":"does nothing: no device of this activity handles it","preview.unknown_on_device":"does nothing: {device} cannot handle it","preview.ready":"Checks the connection first and restores it if needed.","preview.dead":"These buttons are shown but do nothing:","preview.groups":"Button groups","preview.mode_auto":"automatic","preview.mode_set":"chosen","preview.hidden":"hidden","preview.no_device":"no suitable device, not shown","preview.no_keys":"not shown: {device} has none of these buttons",section_flow:"Flow: what is switched when",hint_flow:"Computed from the settings of this activity and its devices, also before saving. Times count only the configured waits; how long the devices take to respond comes on top.","flow.mode_start":"Start","flow.mode_stop":"Stop","flow.from_label":"Starting from","flow.from_idle":"from idle (everything off)","flow.from":"switching from {activity}","flow.failed":"Could not compute the flow: {error}","flow.invalid":"No flow while the configuration has an error \u2013 {error}","flow.state_starting":"Room: starting","flow.state_active":"Room: active","flow.state_stopping":"Room: stopping","flow.state_idle":"Room: off","flow.outlets_on":"Turn on the outlets, all at once: {outlets}","flow.outlets_off":"Turn off the outlets: {outlets}","flow.outlets_off_later":"Turn off the outlet after its cool-down: {outlets}","flow.outlet_keep":"{outlet} stays on, this activity needs it","flow.outlets_already_on":"already on: {outlets}","flow.unless_rooms":"not while {rooms} uses it","flow.on_start":"Actions on start begin","flow.on_start_wait":"Wait until the actions on start are done","flow.on_stop":"Actions on stop begin","flow.on_stop_wait":"Wait until the actions on stop are done","flow.parallel":"runs alongside","flow.already_on":"Already on in {activity}: no switching, no waiting","flow.boot":"Boot time: until {seconds} after the outlets came on","flow.reload":"Reload the integration of {entity}","flow.ready":"Wait until {entity} is available, at most {timeout}","flow.ready_state":"Wait until {entity} is {states}, at most {timeout}","flow.on_timeout_abort":"\u2013 otherwise the start is aborted","flow.on_timeout_continue":"\u2013 otherwise it goes on anyway","flow.turn_on":"Turn on {device}","flow.turn_off":"Turn off {device}","flow.turn_off_unused":"Turn off {device}, this activity does not use it","flow.cannot_switch":"{device} cannot be switched on or off, nothing is sent","flow.wait_on":"Wait {seconds} until the device is ready","flow.wait":"Wait {seconds}","flow.steps":"Actions after start","flow.checks":"Checks, all at once","flow.edit":"Edit","flow.options":"Flow options","flow.options_hint":"What counts as a detail: hidden while Details is off, here and on the card.","flow.details_chip":"Details","flow.detail_entities":"Entity IDs and actions","flow.detail_waits":"Waits","flow.detail_notes":"Notes","flow.detail_reloads":"Reloads","flow.detail_outlets":"Outlets","flow.detail_hooks":"Actions on start and stop","flow.check":"{device}: wait until {entity} shows {states}, at most {timeout}","flow.check_unless":"{device}: wait until {entity} no longer shows {states}, at most {timeout}","flow.check_missing":"{device}: nothing to check, its profile has no picture check","flow.check_warn":"\u2013 otherwise a warning","flow.background":"In the background, after the room is done","flow.if.outlet_was_off":"only if its outlet was off","flow.if.if_off":"only if the device is off","flow.if.if_on":"only if the device is on","flow.reload_if_needed":"reloads its integration if not ready","flow.cooldown":"then {seconds} cool-down","flow.summary_start":"Active after {min} at the earliest, {max} at the latest if every readiness check takes its full timeout.","flow.summary_start_fixed":"Active after {min}.","flow.summary_stop":"Off as soon as the devices are switched off and the actions on stop are done.","flow.summary_stop_cut":"Off as soon as the devices are switched off and the actions on stop are done; the last outlet goes off after {seconds}."},de:{"pf.form":"Formular","pf.form_hint":"Jeder Teil des Profils, an einem echten Ger\xE4t seiner Integration gew\xE4hlt. Entit\xE4ten werden so gespeichert, wie jedes Home Assistant sie findet (Typ und \xDCbersetzungsschl\xFCssel), nie \xFCber ihre Entit\xE4ts-ID.","pf.general":"Allgemein","pf.general_hint":"Wof\xFCr das Profil ist und wo seine Ger\xE4te in der Einschaltreihenfolge einer Aktivit\xE4t stehen.","pf.name":"Name","pf.id":"ID","pf.integration":"Integration","pf.example":"Beispielger\xE4t","pf.no_example":"Kein Ger\xE4t dieser Integration vorhanden: Entit\xE4ten lassen sich nicht w\xE4hlen, nur in YAML eintragen.","pf.device_entity":"Ger\xE4te-Entit\xE4t","pf.order":"Einschaltreihenfolge","pf.status":"Status","pf.status_hint":"Welche Entit\xE4t sagt, dass das Ger\xE4t an ist, und was jeder ihrer Werte bedeutet. Einen angezeigten Wert antippen oder einen eintippen.","pf.status_entity":"Status-Entit\xE4t","pf.status_own":"Keine gew\xE4hlt: der Zustand der Ger\xE4te-Entit\xE4t selbst ist der Status.","pf.status_other":"Der Zustand (oder das Attribut) dieser Entit\xE4t ist der Status.","pf.attribute":"Attribut","pf.attribute_none":"Ihr Zustand","pf.now":"Jetzt: {value}","pf.available_is_on":"An, solange diese Entit\xE4t verf\xFCgbar ist (sie ist nicht verf\xFCgbar, w\xE4hrend das Ger\xE4t aus ist)","pf.group.starting":"Startet","pf.group.on":"An","pf.group.stopping":"Stoppt","pf.group.off":"Aus","pf.group.error":"Fehler","pf.other_value":"Anderer Wert \u2026","pf.timing":"Zeiten","pf.timing_hint":"Wie lange auf An und Aus gewartet wird, bevor die Fehler-Einstellung des Ger\xE4ts greift, und wie lange ein Zustand anhalten muss.","pf.timeout_on":"Zeitlimit beim Einschalten","pf.timeout_off":"Zeitlimit beim Ausschalten","pf.debounce":"Entprellen","pf.reset":"Zur\xFCck zum Standard","pf.companions":"Fernbedienung, Steckdose und Einstellungen","pf.companions_hint":"Wird bei jedem Ger\xE4t mit diesem Profil eingetragen.","pf.remote":"Fernbedienung (Pfeiltasten)","pf.power_switch":"Steckdosen-Schalter","pf.settings":"Einstellungen in der Karte","pf.settings_hint":"In der Fernbedienungskarte angeboten, w\xE4hrend eine Aktivit\xE4t l\xE4uft.","pf.picture":"Bildpr\xFCfung","pf.picture_hint":"Ein Ger\xE4t, das meldet, ob ein Bild ankommt (Lumagen Active Video, JVC Source Display): Integrationen erkennen f\xFCgt daf\xFCr eine Bildpr\xFCfung zu den Pr\xFCfungen der Aktivit\xE4t hinzu.","pf.picture_on":"Dieses Ger\xE4t hat eine Bildpr\xFCfung","pf.picture_entity":"Entit\xE4t","pf.picture_ok":"Bild","pf.picture_fail":"Kein Bild","pf.picture_timeout":"Zeitlimit","pf.jobs":"Aufgaben","pf.jobs_hint":"F\xFCr ein Ger\xE4t, das mehrere Integrationen abdecken (ein TV mit PiPup, ADB und Android TV Remote): die Aufgaben dieser. Kleinere Zahlen gewinnen.","pf.none":"Keine","pf.not_on_device":"nicht an diesem Ger\xE4t",detect_used_integration:"F\xFCr den Zustand dieses Ger\xE4ts genutzt",detect_open_profile:"Dieses Profil \xF6ffnen",detect_no_area:"Kein Bereich",detect_select_all:"Alle ausw\xE4hlen",timing_on:"Geht in etwa {typical} an ({count} gemessen, langsamste {slowest})",timing_off:"Geht in etwa {typical} aus ({count} gemessen, langsamste {slowest})",timing_use:"Gemessene Zeitlimits \xFCbernehmen",timing_use_hint:"Setzt die Status-Zeitlimits auf das, was die Messungen nahelegen: anderthalbmal so lang wie \xFCblich und l\xE4nger als die langsamste.","flow.typical":"meist {seconds}",setup:"Einrichtung","flow.picture":"{step}. Warten, bis {entity} {states} zeigt, h\xF6chstens {timeout}","field.on_failure_picture":"Wenn kein Bild kommt",detect:"Integrationen erkennen",detect_intro:"Vergleicht, was in Home Assistant installiert ist, mit dem, was die R\xE4ume nutzen. Ankreuzen, was sich \xE4ndern soll, dann \xDCbernehmen: die \xC4nderungen erscheinen als ungespeichert; gespeichert wird erst mit Speichern.",detect_running:"Integrationen werden angesehen \u2026",detect_nothing:"Nichts zu \xE4ndern: jedes AV-Ger\xE4t mit Profil ist in einem Raum, und jede Entit\xE4t der R\xE4ume existiert.",detect_new:"Erkannte Ger\xE4te",detect_new_hint:"Ger\xE4te, die noch kein Raum nutzt, nach ihrem Home-Assistant-Bereich. Die hinzuzuf\xFCgenden ankreuzen: sie kommen in die angekreuzten Aktivit\xE4ten, an die Stelle, die ihr Profil in der Einschaltreihenfolge vorgibt (fr\xFCh, Mitte, sp\xE4t), mit Status, Fernbedienung und Steckdose. Der Profil-Chip \xF6ffnet sein Profil; der blaue Integrations-Chip ist der f\xFCr den Zustand des Ger\xE4ts genutzte.",detect_room:"Raum",detect_new_room:"Neuer Raum: {name}",detect_activities:"Hinzuf\xFCgen zu",detect_no_activities:"Dieser Raum hat noch keine Aktivit\xE4ten.",detect_starter:"Pro Raum eine neue Aktivit\xE4t mit den ausgew\xE4hlten Ger\xE4ten anlegen",detect_picture:"mit Bildpr\xFCfung",detect_better:"Bessere Integrationen",detect_better_hint:"Ein Ger\xE4t eines Raums, das eine andere Integration jetzt besser abdeckt (schneller oder ausf\xFChrlicher). Nicht angekreuzt: zum Wechseln ankreuzen.",detect_better_row:"{from} \u2192 {to}",detect_gone:"Fehlende Entit\xE4ten",detect_gone_hint:"Entit\xE4ten eines Raums, die es nicht mehr gibt, z. B. nach dem Entfernen einer Integration. Wird dasselbe Ger\xE4t noch von einer anderen Integration abgedeckt, wird sie als Ersatz angeboten.",detect_replace_with:"Ersetzen durch {entity} ({integration})",detect_no_replacement:"Kein Ersatz; bitte von Hand anpassen. Ein Ger\xE4t ohne Status nutzt seine festen Zeiten.",detect_renamed:"Umbenannte Entit\xE4ten",detect_renamed_hint:"Dieselbe Entit\xE4t unter neuer ID. Sie wird \xFCberall ersetzt au\xDFer in Aktionen und Befehlen: diese pr\xFCfen.",detect_unmatched:"Integrationen ohne Profil",detect_unmatched_hint:"Ihre Ger\xE4te arbeiten mit festen Zeiten. Ein Profil anlegen, damit Easy AV Control auf ihre eigenen Zust\xE4nde warten kann.",detect_create_profile:"+ Profil",detect_apply:"\xDCbernehmen",detect_applied:"\xDCbernommen. R\xE4ume pr\xFCfen, dann Speichern.",detect_again:"Erneut erkennen",profile_new:"+ Profil",profile_new_pick:"Integration",profile_new_hint:"Integrationen mit Mediaplayer oder Fernbedienung ohne Profil. Der Entwurf startet vom ersten Ger\xE4t der gew\xE4hlten.",profile_new_none:"Jede Integration mit Mediaplayer oder Fernbedienung hat ein Profil.",learn:"Lernen",learn_hint:"Das Ger\xE4t hier ein- und wieder ausschalten: Easy AV Control zeichnet auf, was {entity} zeigt, und tr\xE4gt ein, welche Zust\xE4nde Starten, An, Stoppen und Aus bedeuten.",learn_on:"Jetzt einschalten",learn_off:"Jetzt ausschalten",learn_seen_on:"Beim Einschalten: {states}",learn_seen_off:"Beim Ausschalten: {states}",learn_use:"Gesehenes \xFCbernehmen",learn_nothing:"Noch nichts aufgezeichnet.","flow.status_on":"Warten, bis {device} meldet, dass es an ist ({entity}), h\xF6chstens {timeout}","flow.status_off":"Warten, bis {device} meldet, dass es aus ist ({entity}), h\xF6chstens {timeout}","flow.outlets_off_status":"Steckdose ausschalten, sobald ihre Ger\xE4te aus sind: {outlets}","flow.debounce":"der Zustand muss {seconds} anhalten",profiles:"Profile",profiles_intro:"Ein Profil sagt Easy AV Control, was die Entit\xE4ten einer Integration \xFCber ein Ger\xE4t verraten: welche Entit\xE4t zeigt, dass es an ist, was ihre Zust\xE4nde bedeuten, Fernbedienung, Steckdose und Einstellungen. Eingebaute sind gesperrt: zum \xC4ndern duplizieren.",profiles_builtin:"Eingebaut",profiles_yours:"Eigene",profiles_none_yours:"Noch keine. Ein eingebautes Profil duplizieren oder eines importieren.",profile_generic:"f\xFCr jeden Mediaplayer ohne eigenes Profil",profile_untested:"Aus dem Code der Integration, nicht an einem Ger\xE4t getestet",profile_used_by:"Genutzt von {where}",profile_unused:"Von keinem Ger\xE4t genutzt",profile_preview:"Zusammenfassung zeigen",profile_view:"Ansehen",profile_edit:"Bearbeiten",profile_duplicate:"Duplizieren",profile_delete_confirm:'Eigenes Profil "{name}" l\xF6schen? Ger\xE4te, die es nutzen, nehmen wieder das eingebaute.',profile_readonly:"Eingebaut: nur lesen. Zum \xC4ndern duplizieren.",profile_editor_hint:"Das Profil als YAML. Entit\xE4ten werden am Ger\xE4t \xFCber Domain und translation_key gefunden, nie \xFCber die Entit\xE4ts-ID; so passt das Profil zu jedem Home Assistant.",profile_save:"Profil speichern",profile_close:"Schlie\xDFen",profile_cancel:"Abbrechen",profile_saved:"Profil gespeichert.",profile_export:"Exportieren",profile_export_all:"Eigene exportieren",profile_import:"Importieren",profile_import_hint:"Einen Profil-Export von Easy AV Control einf\xFCgen. Vorhandene Profile werden nie ersetzt: eines mit vergebener ID kommt unter einer neuen dazu.",profile_import_done:"Hinzugef\xFCgt: {added}",profile_import_renamed:"{from} als {to} hinzugef\xFCgt",profile_import_invalid:"Ung\xFCltig, \xFCbersprungen: {ids}",profile_copy:"In die Zwischenablage",profile_copied:"Kopiert \u2713",profile_copy_failed:"Strg/Cmd+C dr\xFCcken",profile_paste:"Aus der Zwischenablage",profile_paste_failed:"Mit Strg/Cmd+V einf\xFCgen",profile_share:"Profil teilen",profile_share_hint:"Eines f\xFCr ein Ger\xE4t gebaut, das andere auch haben? Exportieren und den Text \xFCber Problem melden (unten im Men\xFC) schicken: angenommene Profile werden eingebaut.",sum_indicator:"An / aus \xFCber {what}",sum_indicator_device:"den Zustand des Ger\xE4ts",sum_indicator_available:"die Verf\xFCgbarkeit von {what}",sum_states:"{groups}",sum_remote:"Fernbedienung",sum_outlet:"Steckdose",sum_settings:"Einstellungen",sum_picture:"Bildpr\xFCfung",sum_order:"Einschaltreihenfolge: {order}",sum_roles:"Aufgaben: {roles}","order.early":"fr\xFCh","order.middle":"Mitte","order.late":"sp\xE4t","role.power":"Strom","role.navigation":"Pfeiltasten","role.now_playing":"l\xE4uft gerade","role.turn_off":"Ausschalten",section_state:"Ger\xE4tezustand",hint_state:"Woran Easy AV Control erkennt, dass das Ger\xE4t an oder aus ist. Mit einem Status wartet es auf das Ger\xE4t selbst statt auf feste Zeiten.",detected:"Erkannt: {name}",detected_none:"Kein Profil f\xFCr die Integration dieses Ger\xE4ts: es gelten die festen Zeiten unten.",detected_uses:"Nutzt",detected_now:"Jetzt: {value}",detected_found_indicator:"Status von {entity}",detected_found_attribute:"Attribut {attribute}",detected_found_remote:"Fernbedienung: {entity}",detected_found_outlet:"Steckdose: {entity}",detected_found_settings:"Einstellungen: {entities}",detected_use:"\xDCbernehmen",detected_applied:"In Gebrauch",detected_siblings:"Auch abgedeckt von: {integrations}",detected_role:"{role}: {integration}",state_source:"Status","state_source.auto":"Automatisch (aus dem Profil)","state_source.none":"Keiner: nur feste Zeiten","field.profile":"Profil","profile.auto":"Automatisch (f\xFCr seine Integration)","field.wait_on":"Beim Einschalten warten auf","field.wait_off":"Vor dem Abschalten der Steckdose warten auf","wait.status":"Seinen Status","wait.time":"Eine feste Zeit","wait.both":"Seinen Status, dann eine feste Zeit","field.timeout_on":"Status-Zeitlimit beim Einschalten","field.timeout_off":"Status-Zeitlimit beim Ausschalten","field.debounce":"Entprellen","helper.debounce":"Sekunden, die ein Zustand anhalten muss, bevor er z\xE4hlt.","field.on_failure_on":"Wenn es nicht angeht","field.on_failure_off":"Wenn es nicht ausgeht","failure.warn":"Warnen und weitermachen","failure.stop":"Aktivit\xE4t beenden","failure.retry":"Noch einmal versuchen, dann warnen","failure_off.stop":"Steckdose anlassen",state_fixed_only:"Kein Status f\xFCr dieses Ger\xE4t: nur die festen Zeiten unten gelten.",footer_version:"Easy AV Control (Ltek) {version}",star:"\u2B50 Auf GitHub markieren",report:"\u{1F41B} Problem melden",title:"Easy AV Control",rooms:"R\xE4ume",add_room:"Raum hinzuf\xFCgen",guide:"Anleitung",reports:"Berichte","rep.title":"Berichte","rep.hint":"Wie lange jeder Start und Stopp dauerte und wie lange jedes Ger\xE4t zum Ein- und Ausschalten brauchte. Gemessen, w\xE4hrend Easy AV Control schaltet; die letzten 300 L\xE4ufe und 100 Zeiten je Ger\xE4t bleiben erhalten.","rep.refresh":"Aktualisieren","rep.clear":"Leeren","rep.clear_confirm":"Den ganzen Verlauf l\xF6schen? Die typischen Zeiten f\xFCr die Zeitlimits bleiben.","rep.runs":"L\xE4ufe","rep.devices":"Ger\xE4te","rep.devices_hint":"Vom Ein- (oder Aus-)Befehl, bis das Ger\xE4t meldet, dass es an (aus) ist, f\xFCr Ger\xE4te mit Status. Nur, wenn Easy AV Control das Ger\xE4t geschaltet hat.","rep.no_runs":"Noch keine L\xE4ufe: eine Aktivit\xE4t starten.","rep.no_devices":"Noch keine Ger\xE4tezeiten. Sie werden f\xFCr Ger\xE4te mit Status gemessen, wenn eine Aktivit\xE4t sie schaltet.","rep.show":"Zeigen","rep.mode_all":"Starts und Stopps","rep.mode_start":"Start","rep.mode_stop":"Stopp","rep.from":"von {activity}","rep.typical":"typisch","rep.count":"{n} L\xE4ufe","rep.count_times":"{n} Mal","rep.failed":"{n} fehlgeschlagen","rep.result_ok":"OK","rep.result_warning":"Warnungen","rep.result_error":"Fehlgeschlagen","rep.result_cancelled":"Abgebrochen","rep.phase_switch_off_unused":"Nicht Ben\xF6tigtes ausschalten","rep.phase_outlets_on":"Steckdosen an","rep.phase_outlets_off":"Steckdosen aus","rep.phase_checks":"Pr\xFCfungen","rep.phase_steps":"Aktionen nach dem Start","rep.phase_hooks":"Aktionen bei Start / Stopp","rep.dir_on":"Einschalten","rep.dir_off":"Ausschalten","rep.dir":"","rep.when":"Wann","rep.time":"Zeit","rep.result":"Ergebnis","rep.for":"Raum \xB7 Aktivit\xE4t","rep.slow":"Langsam",sidebar_chip:"Editor in der Seitenleiste",sidebar_hint:"Easy AV Control in der Seitenleiste von Home Assistant zeigen. Ausgeblendet bleibt es unter /easy-av-control und unter Einstellungen \u2192 Ger\xE4te & Dienste \u2192 Easy AV Control \u2192 Konfigurieren.",no_rooms:"Noch keine R\xE4ume.",room_name:"Name",room_area:"Bereich",room_default_activity:"Standard-Aktivit\xE4t",default_last:"Zuletzt genutzte","helper.default_activity":"Was der Ein/Aus-Schalter des Raums und toggle_activity starten, z. B. von einem Wandtaster.",room_id_hint:"ID {id}",delete_room:"Raum l\xF6schen",delete_room_confirm:"Raum \u201E{name}\u201C mit allen Ger\xE4ten und Aktivit\xE4ten l\xF6schen?",tab_devices:"Ger\xE4te",tab_activities:"Aktivit\xE4ten",tab_yaml:"YAML",add_device:"Ger\xE4t hinzuf\xFCgen",add_activity:"Aktivit\xE4t hinzuf\xFCgen",delete:"L\xF6schen",move_up:"Nach oben",move_down:"Nach unten",device_id:"Ger\xE4te-ID",device_in_use:"Ger\xE4t \u201E{id}\u201C wird verwendet von: {where}. Bitte zuerst dort entfernen.",activity_id_hint:"ID {id} \u2013 Teil der Entit\xE4ts-IDs, nicht \xE4nderbar",new_activity:"Neue Aktivit\xE4t",add_device_to_activity:"Ger\xE4t hinzuf\xFCgen \u2026",steps:"Aktionen nach dem Start",section_checks:"Pr\xFCfungen",hint_checks:"Was stimmen muss, bevor die Aktivit\xE4t als laufend gilt, z. B. ein Bild am Lumagen und am Projektor. Sie laufen gleichzeitig, sobald alle Ger\xE4te an sind, und wieder beim Wechsel von einer anderen Aktivit\xE4t.",add_check:"Pr\xFCfung",check_profile:"Bildpr\xFCfung aus seinem Profil",check_entity:"Eine eigene Entit\xE4t",check_what:"Was",check_entity_label:"Entit\xE4t",check_states:"Richtig, wenn sie zeigt",check_states_placeholder:"z. B. on, Active Video",check_timeout:"Zeitlimit",check_failure:"Wenn es nicht stimmt",check_warn:"Warnen und weitermachen",check_stop:"Aktivit\xE4t abbrechen",check_none:"Keine Pr\xFCfungen: die Aktivit\xE4t gilt als laufend, sobald ihre Ger\xE4te an sind.",check_unless_text:"Wartet, bis {entity} nicht mehr {states} zeigt.","flow.steps":"Aktionen nach dem Start","flow.checks":"Pr\xFCfungen, gleichzeitig","flow.edit":"Bearbeiten","flow.options":"Ablauf-Optionen","flow.options_hint":"Was als Detail gilt: ausgeblendet, solange Details aus ist, hier und auf der Karte.","flow.details_chip":"Details","flow.detail_entities":"Entit\xE4ts-IDs und Aktionen","flow.detail_waits":"Wartezeiten","flow.detail_notes":"Hinweise","flow.detail_reloads":"Neu laden","flow.detail_outlets":"Steckdosen","flow.detail_hooks":"Aktionen bei Start und Stopp","flow.check":"{device}: warten, bis {entity} {states} zeigt, h\xF6chstens {timeout}","flow.check_unless":"{device}: warten, bis {entity} nicht mehr {states} zeigt, h\xF6chstens {timeout}","flow.check_missing":"{device}: nichts zu pr\xFCfen, sein Profil hat keine Bildpr\xFCfung","flow.check_warn":"\u2013 sonst eine Warnung",add_step:"Schritt hinzuf\xFCgen \u2026",hooks:"Aktionen bei Start und Stopp",remote:"Fernbedienung",quick_select:"Schnellwahl",quick_select_hint:"Tasten, die einen Mediaplayer auf eine Quelle schalten; beim Apple TV sind die Quellen seine Apps.",quick_select_no_player:"F\xFCge dieser Aktivit\xE4t zuerst einen Mediaplayer hinzu.",add_quick_select:"Schnellwahl hinzuf\xFCgen",card_settings:"Einstellungen in der Karte",card_settings_hint:"Quelle, Klangmodus und weitere Einstellungen der Ger\xE4te, in der Karte \xE4nderbar, w\xE4hrend die Aktivit\xE4t l\xE4uft: die an den Ger\xE4ten festgelegten oder eine Auswahl nur f\xFCr diese Aktivit\xE4t. Der Bereich ist zugeklappt, bis man ihn \xF6ffnet; jeder Browser merkt sich das.","setting.entity":"Entit\xE4t des Ger\xE4ts","field.entity":"Entit\xE4t","helper.entity":"Eine Zahl (Schieberegler), Auswahl (Liste) oder ein Schalter (An/Aus-Taste), z. B. der Bass des Receivers.","field.settings_mode":"Anzeigen",settings_auto:"Von den Ger\xE4ten",settings_chosen:"Hier ausgew\xE4hlt, mit Favoriten",settings_auto_shows:"Die Karte zeigt: {list}.",settings_auto_none:"Die Ger\xE4te dieser Aktivit\xE4t bieten noch keine Einstellungen. Lege sie an einem Ger\xE4t fest, oder starte die Aktivit\xE4t einmal, damit die Mediaplayer ihre Listen melden.",device_settings_hint:"Was die Karte von diesem Ger\xE4t anbietet, in jeder Aktivit\xE4t, die es nutzt. Automatisch: Quelle und Klangmodus eines Mediaplayers und die Zahl- und Auswahl-Entit\xE4ten desselben Ger\xE4ts.",device_settings_auto:"Automatisch",device_settings_auto_none:"Noch nichts gefunden: keine Quellen- oder Klangmodus-Liste gemeldet und keine Zahl- oder Auswahl-Entit\xE4ten desselben Ger\xE4ts.",device_settings_none:"Die Karte zeigt keine Einstellungen dieses Ger\xE4ts.",settings_none:"Die Karte zeigt f\xFCr diese Aktivit\xE4t keine Einstellungen.",add_setting:"Einstellung hinzuf\xFCgen","field.setting":"Einstellung","field.options":"Favoriten (optional)","helper.options":"Nur diese in der Karte, in dieser Reihenfolge; leer: die ganze Liste des Ger\xE4ts.",commands:"Eigene Befehle",save:"Speichern",discard:"Verwerfen",saving:"Speichert \u2026",saved:"Gespeichert",unsaved:"Ungespeicherte \xC4nderungen",reload:"Neu laden",reload_confirm:"Ungespeicherte \xC4nderungen verwerfen und die gespeicherte Konfiguration laden?",retry:"Erneut versuchen",save_anyway:"Trotzdem speichern",conflict:"Die Konfiguration wurde anderswo ge\xE4ndert. Bitte neu laden \u2013 deine ungespeicherten \xC4nderungen hier gehen dabei verloren.",invalid:"Nicht gespeichert \u2013 {path}: {message}",missing:"Diese Entit\xE4ten gibt es in Home Assistant nicht:",missing_hint:"Ein Ger\xE4t ohne Strom bleibt normalerweise bekannt \u2013 meist ist es ein Tippfehler oder eine umbenannte Entit\xE4t.",loading:"L\xE4dt \u2026",load_error:"Konfiguration konnte nicht geladen werden: {error}",route_auto:"Automatisch",route_none:"Ausblenden",devices_intro:"Alle Ger\xE4te des Raums, die Easy AV Control schaltet oder steuert: TV, Beamer, Receiver, Player.",devices_empty:"Noch keine Ger\xE4te.",new_device:"Neues Ger\xE4t",no_entity:"Keine Entit\xE4t gew\xE4hlt",entity_missing:"Entit\xE4t in Home Assistant nicht gefunden",used_by:"Verwendet in: {where}",section_device:"Ger\xE4t",hint_device:"Die Home-Assistant-Entit\xE4t des Ger\xE4ts, meist ein Mediaplayer.",section_power:"Steckdose",hint_power:"Die Steckdose, an der das Ger\xE4t h\xE4ngt: vor dem Ger\xE4t ein- und nach ihm ausgeschaltet. Abw\xE4hlen, wenn das Ger\xE4t an keiner schaltbaren Steckdose h\xE4ngt.",power_use:"Steckdose dieses Ger\xE4ts schalten",section_delays:"Wartezeiten",hint_delays:"Wie lange Easy AV Control auf dieses Ger\xE4t wartet.",section_ready:"Verbindung pr\xFCfen",hint_ready:"Wartet, bis das Ger\xE4t in Home Assistant erreichbar ist, vor dem Einschalten und vor Tasten der Fernbedienung. F\xFCr Ger\xE4te, die ohne Strom ihre Verbindung verlieren, etwa ein Apple TV.",ready_preset:"{entity} f\xFCr Verbindungspr\xFCfung und Pfeiltasten nutzen (empfohlen f\xFCr Apple TV)",section_advanced:"Erweitert",hint_device_advanced:"Die Ger\xE4te-ID wird in der YAML-Konfiguration verwendet. Eigene Befehle ordnen einem Tastennamen Home-Assistant-Aktionen zu, z. B. Pfeiltasten f\xFCr einen Receiver.",activities_intro:'Eine Aktivit\xE4t fasst Ger\xE4te f\xFCr eine Nutzung zusammen, z. B. "Apple TV" = TV und Apple TV. Beim Start wird eingeschaltet, was sie braucht, und ausgeschaltet, was nicht.',activities_empty:"Noch keine Aktivit\xE4ten.",no_devices:"Keine Ger\xE4te",needs_devices:"Lege zuerst die Ger\xE4te dieses Raums an.",section_general:"Allgemein",hint_general:"Name und Icon erscheinen in der Card. Die Position bestimmt die Reihenfolge.",section_activity_devices:"Ger\xE4te",hint_activity_devices:"Werden in dieser Reihenfolge eingeschaltet.",hint_steps:"Zus\xE4tzliche Aktionen in dieser Reihenfolge, sobald alle Ger\xE4te an sind und die Pr\xFCfungen bestanden: z. B. den TV auf seinen HDMI-Eingang schalten, Klangmodus oder Lautst\xE4rke setzen, das Licht dimmen.",hint_remote:"Welches Ger\xE4t welche Tasten der Card bekommt. Automatisch passt f\xFCr die meisten Aufbauten.",hint_activity_advanced:"Befehle in YAML sowie Home-Assistant-Aktionen bei Start und Stopp.",card_divider:"Fernbedienungs-Karte",card_extra:"Zus\xE4tzliche Tasten",hint_card_extra:"Tasten \xFCber die \xFCblichen hinaus, als YAML-Liste.",card_shows:"Die Karte zeigt",or:"oder",other_integration:"Sonstige",add_device_short:"Ger\xE4t",nav_flow:"Ablauf \xF6ffnen",step_picture_checks:"Wartet, bis {entity} {states} zeigt.",step_picture_none:"{device} hat keine Bildpr\xFCfung, dieser Schritt wartet also auf nichts.",yaml_intro:"Der ganze Raum als YAML. \xC4nderungen hier und in den Formularen betreffen dieselbe Konfiguration.",add_room_name:"Name des neuen Raums",create:"Hinzuf\xFCgen",cancel:"Abbrechen","helper.power_switch":"Gemeinsame Steckdosen bleiben an, solange ein Ger\xE4t daran gebraucht wird.","helper.delay_after_power":"Wie lange das Ger\xE4t nach dem Einschalten der Steckdose braucht. Nur wenn die Steckdose aus war.","helper.delay_after_on":"Bis das Ger\xE4t Befehle annimmt. Nur wenn es eingeschaltet wurde.","helper.delay_after_off":"Abk\xFChlzeit, bevor das n\xE4chste Ger\xE4t oder die Steckdose ausgeschaltet wird, z. B. 180 s f\xFCr einen Beamer.","helper.ready_entity":"Z. B. die Fernbedienung eines Apple TV, die nur bei bestehender Verbindung an ist.","helper.ready_reload":"\xDCberspringt die Wartezeit einer Integration, die ihre Verbindung erneut versucht.","helper.source":"Die Liste zeigt, was das Ger\xE4t zuletzt gemeldet hat; es muss also einmal an gewesen sein. Ein Name l\xE4sst sich auch eintippen.","field.entity_id":"Entit\xE4t","field.name":"Anzeigename","field.power_switch":"Steckdose","field.remote_entity":"Fernbedienung (optional)","helper.remote_entity":"Pfeiltasten, OK, Zur\xFCck, Home und Men\xFC der Card gehen an diese Fernbedienungs-Entit\xE4t, z. B. die Fernbedienung eines Apple TV.","field.delay_after_power":"Startzeit (s)","field.delay_after_on":"Warten nach Einschalten (s)","field.delay_after_off":"Warten nach Ausschalten (s)","field.ready_enabled":"Vor dem Einschalten auf Verf\xFCgbarkeit warten","field.ready_entity":"Stattdessen diese Entit\xE4t pr\xFCfen (optional)","field.ready_state":"Auf Zustand warten (optional, z. B. on)","field.ready_timeout":"Zeitlimit (s)","field.ready_reload":"Integration neu laden","field.ready_on_timeout":"Bei Zeit\xFCberschreitung","field.commands":"Eigene Befehle (YAML: Name \u2192 Aktionen)","field.icon":"Icon","field.order":"Position","field.on_start":"Beim Start","field.on_stop":"Beim Stopp","field.volume":"Lautst\xE4rke","field.channels":"Sender","field.transport":"Wiedergabe","field.navigation":"Navigation","field.touchpad":"Touchfl\xE4che","helper.touchpad":"Eine Wischfl\xE4che statt der Pfeiltasten in der Karte. Automatisch: wenn die Navigation an eine Remote-Entit\xE4t geht, z. B. ein Apple TV.",touchpad_auto:"Automatisch",touchpad_on:"An",touchpad_off:"Aus (Pfeiltasten)","field.buttons":"Zus\xE4tzliche Buttons (YAML-Liste)","field.label":"Beschriftung (optional, sonst die Quelle)","field.activity_commands":"Befehle dieser Aktivit\xE4t (YAML: Name \u2192 Aktionen)","field.type":"Typ","field.device":"Ger\xE4t","field.source":"Quelle","field.volume_level":"Lautst\xE4rke","field.sound_mode":"Klangmodus","field.brightness_pct":"Helligkeit (%)","field.color_temp_kelvin":"Farbtemperatur (K)","field.transition":"\xDCbergang (s)","field.position":"Position (%)","field.tilt_position":"Neigung (%)","field.action":"Aktion (z. B. script.turn_on)","field.data":"Daten","field.target":"Ziel","field.timeout":"Zeitlimit (s)","field.reload_integration":"Integration neu laden","field.on_timeout":"Bei Zeit\xFCberschreitung","field.delay_after":"Danach warten (s)",on_timeout_abort:"Start abbrechen",on_timeout_continue:"Weitermachen","step.power_on":"Einschalten","step.power_off":"Ausschalten","step.set_source":"Quelle w\xE4hlen","step.set_volume":"Lautst\xE4rke setzen","step.set_sound_mode":"Klangmodus w\xE4hlen","step.set_brightness":"Helligkeit setzen","step.set_color_temp":"Farbtemperatur setzen","step.set_position":"Rollladen-Position setzen","step.set_tilt":"Lamellen-Neigung setzen","step.call_action":"Aktion ausf\xFChren","step.delay":"Warten","step.wait_available":"Auf Verf\xFCgbarkeit warten",section_remote_preview:"Vorschau der Fernbedienung",hint_remote_preview:"So sieht die Karte aus, w\xE4hrend diese Aktivit\xE4t l\xE4uft, mit den Einstellungen oben, auch vor dem Speichern. Tippe eine Taste an, um zu sehen, wohin sie geht; es wird nichts gesendet.","preview.tap":"Tippe eine Taste an, um zu sehen, welches Ger\xE4t sie bekommt und was dort ausgef\xFChrt wird.","preview.this_activity":"diese Aktivit\xE4t","preview.device_commands":"eigener Befehl des Ger\xE4ts: {actions}","preview.activity_commands":"eigener Befehl der Aktivit\xE4t: {actions}","preview.unknown":"tut nichts: kein Ger\xE4t dieser Aktivit\xE4t kennt die Taste","preview.unknown_on_device":"tut nichts: {device} kennt die Taste nicht","preview.ready":"Pr\xFCft vorher die Verbindung und stellt sie bei Bedarf wieder her.","preview.dead":"Diese Tasten werden angezeigt, tun aber nichts:","preview.groups":"Tastengruppen","preview.mode_auto":"automatisch","preview.mode_set":"gew\xE4hlt","preview.hidden":"ausgeblendet","preview.no_device":"kein passendes Ger\xE4t, nicht angezeigt","preview.no_keys":"nicht angezeigt: {device} hat keine dieser Tasten",section_flow:"Ablauf: was wann geschaltet wird",hint_flow:"Berechnet aus den Einstellungen dieser Aktivit\xE4t und ihrer Ger\xE4te, auch vor dem Speichern. Die Zeiten z\xE4hlen nur die eingestellten Wartezeiten; wie lange die Ger\xE4te zum Reagieren brauchen, kommt hinzu.","flow.mode_start":"Start","flow.mode_stop":"Stopp","flow.from_label":"Ausgangslage","flow.from_idle":"aus dem Leerlauf (alles aus)","flow.from":"Wechsel von {activity}","flow.failed":"Ablauf konnte nicht berechnet werden: {error}","flow.invalid":"Kein Ablauf, solange die Konfiguration einen Fehler hat \u2013 {error}","flow.state_starting":"Raum: startet","flow.state_active":"Raum: aktiv","flow.state_stopping":"Raum: stoppt","flow.state_idle":"Raum: aus","flow.outlets_on":"Steckdosen gleichzeitig einschalten: {outlets}","flow.outlets_off":"Steckdosen ausschalten: {outlets}","flow.outlets_off_later":"Steckdose nach der Abk\xFChlzeit ausschalten: {outlets}","flow.outlet_keep":"{outlet} bleibt an, diese Aktivit\xE4t braucht sie","flow.outlets_already_on":"schon an: {outlets}","flow.unless_rooms":"nicht, solange {rooms} sie nutzt","flow.on_start":"Aktionen beim Start beginnen","flow.on_start_wait":"Warten, bis die Aktionen beim Start fertig sind","flow.on_stop":"Aktionen beim Stopp beginnen","flow.on_stop_wait":"Warten, bis die Aktionen beim Stopp fertig sind","flow.parallel":"l\xE4uft parallel","flow.already_on":"L\xE4uft schon in {activity}: kein Einschalten, keine Wartezeit","flow.boot":"Startzeit: bis {seconds} nach dem Einschalten der Steckdosen","flow.reload":"Integration von {entity} neu laden","flow.ready":"Warten, bis {entity} verf\xFCgbar ist, h\xF6chstens {timeout}","flow.ready_state":"Warten, bis {entity} {states} ist, h\xF6chstens {timeout}","flow.on_timeout_abort":"\u2013 sonst wird der Start abgebrochen","flow.on_timeout_continue":"\u2013 sonst geht es trotzdem weiter","flow.turn_on":"{device} einschalten","flow.turn_off":"{device} ausschalten","flow.turn_off_unused":"{device} ausschalten, diese Aktivit\xE4t braucht es nicht","flow.cannot_switch":"{device} l\xE4sst sich nicht schalten, es wird nichts gesendet","flow.wait_on":"{seconds} warten, bis das Ger\xE4t bereit ist","flow.wait":"{seconds} warten","flow.background":"Im Hintergrund, wenn der Raum schon fertig ist","flow.if.outlet_was_off":"nur, wenn die Steckdose aus war","flow.if.if_off":"nur, wenn das Ger\xE4t aus ist","flow.if.if_on":"nur, wenn das Ger\xE4t an ist","flow.reload_if_needed":"l\xE4dt die Integration neu, falls nicht bereit","flow.cooldown":"danach {seconds} Abk\xFChlzeit","flow.summary_start":"Aktiv fr\xFChestens nach {min}, sp\xE4testens nach {max}, wenn jede Bereitschaftspr\xFCfung ihr ganzes Zeitlimit braucht.","flow.summary_start_fixed":"Aktiv nach {min}.","flow.summary_stop":"Aus, sobald die Ger\xE4te ausgeschaltet und die Aktionen beim Stopp fertig sind.","flow.summary_stop_cut":"Aus, sobald die Ger\xE4te ausgeschaltet und die Aktionen beim Stopp fertig sind; die letzte Steckdose geht nach {seconds} aus."}};function x(a,s,e={}){let t=(a??"en").split("-")[0],i=Nt[t]?.[s]??Nt.en[s];if(i===void 0)return K(a,s,e);for(let[n,o]of Object.entries(e))i=i.replace(`{${n}}`,o);return i}var Ti="__none",U=a=>a.area_id??Ti,te=class extends g{constructor(){super();this._asked=!1;this._areas=new Map,this._ticked=new Set,this._starter=!1}_t(e,t){return x(this.hass?.language,e,t)}updated(){this.hass&&this.rooms&&!this._asked&&(this._asked=!0,this._run())}async _run(){this._result=void 0,this._error=void 0;try{let e=await this.hass.callWS({type:"easy_av_control/config/detect_all",rooms:this.rooms}),t=new Map;for(let n of e.new)t.has(U(n))||t.set(U(n),{target:n.room??`new:${n.new_room}`,activities:new Set(n.activities),devices:new Set});let i=new Set;e.renamed.forEach((n,o)=>i.add(`renamed:${o}`)),this._areas=t,this._ticked=i,this._result=e}catch(e){this._error=e.message??String(e)}}_toggle(e){let t=new Set(this._ticked);t.has(e)?t.delete(e):t.add(e),this._ticked=t}_setArea(e,t){let i=new Map(this._areas);i.set(e,{...i.get(e),...t}),this._areas=i}_toggleDevice(e,t){let i=new Set(this._areas.get(e).devices);i.has(t)?i.delete(t):i.add(t),this._setArea(e,{devices:i})}get _anyTicked(){return this._ticked.size>0||[...this._areas.values()].some(e=>e.devices.size>0)}_name(e){return e?this.hass.states[e]?.attributes.friendly_name??e:"\u2013"}async _apply(){let e=this._result,t={new:e.new.filter(n=>this._areas.get(U(n))?.devices.has(n.key)).map(n=>{let o=this._areas.get(U(n)),l=o.target.startsWith("new:"),c=e.new.find(d=>`new:${d.new_room}`===o.target);return{...n,room:l?null:o.target,new_room:l?o.target.slice(4):null,new_room_name:l?c?.new_room_name??n.new_room_name:null,area_id:l?c?.area_id??n.area_id:n.area_id,activities:l?[]:[...o.activities]}}),starter:this._starter,better:e.better.filter((n,o)=>this._ticked.has(`better:${o}`)),gone:e.gone.filter((n,o)=>this._ticked.has(`gone:${o}`)),renamed:e.renamed.filter((n,o)=>this._ticked.has(`renamed:${o}`))},i=await this.hass.callWS({type:"easy_av_control/config/detect_apply",rooms:this.rooms,choices:t});this.dispatchEvent(new CustomEvent("rooms-changed",{detail:{rooms:i.rooms}}))}render(){if(this._error)return r`<p class="ltek-error">${this._error}</p>
        <button class="ltek-btn" @click=${this._run}>${this._t("detect_again")}</button>`;let e=this._result;if(!e)return r`<p class="ltek-hint">${this._t("detect_running")}</p>`;let t=!e.new.length&&!e.better.length&&!e.gone.length&&!e.renamed.length,i=[...new Set(e.new.map(U))];return r`
      <p class="ltek-hint">${this._t("detect_intro")}</p>
      ${t?r`<p class="ltek-hint ok">${this._t("detect_nothing")}</p>`:u}
      <div class="ltek-buttons bar">
        <button class="ltek-btn primary" ?disabled=${!this._anyTicked} @click=${this._apply}>${this._t("detect_apply")}</button>
        <button class="ltek-btn" @click=${this._run}><ha-icon icon="mdi:refresh"></ha-icon> ${this._t("detect_again")}</button>
        ${e.new.length?r`<label class="check">
              <input type="checkbox" .checked=${this._starter} @change=${n=>this._starter=n.target.checked} />
              ${this._t("detect_starter")}
            </label>`:u}
      </div>
      ${e.new.length?this._section("new","mdi:plus-circle-outline",this._t("detect_new"),this._t("detect_new_hint"),r`${i.map(n=>this._renderArea(n,e.new.filter(o=>U(o)===n)))}`):u}
      ${e.better.length?this._section("better","mdi:arrow-up-bold-circle-outline",this._t("detect_better"),this._t("detect_better_hint"),r`${e.better.map((n,o)=>this._row(`better:${o}`,"mdi:swap-horizontal",this._t("detect_better_row",{from:this._name(n.entity_id),to:this._name(n.replacement)}),`${this.rooms[n.room]?.name??n.room} \xB7 ${n.integration} \u2192 ${n.replacement_integration}`))}`):u}
      ${e.gone.length?this._section("gone","mdi:link-variant-off",this._t("detect_gone"),this._t("detect_gone_hint"),r`${e.gone.map((n,o)=>this._row(`gone:${o}`,"mdi:help-circle-outline",n.entity_id,`${this.rooms[n.room]?.name??n.room}: ${n.path} \xB7 ${n.replacement?this._t("detect_replace_with",{entity:this._name(n.replacement),integration:n.replacement_integration??""}):this._t("detect_no_replacement")}`,!n.replacement))}`):u}
      ${e.renamed.length?this._section("renamed","mdi:rename-outline",this._t("detect_renamed"),this._t("detect_renamed_hint"),r`${e.renamed.map((n,o)=>this._row(`renamed:${o}`,"mdi:rename-outline",`${n.old} \u2192 ${n.new}`,n.uses.map(l=>`${this.rooms[l.room]?.name??l.room}: ${l.path}`).join(", ")))}`):u}
      ${e.unmatched.length?this._section("unmatched","mdi:package-variant",this._t("detect_unmatched"),this._t("detect_unmatched_hint"),r`<div class="ltek-list">${e.unmatched.map(n=>r`<div class="ltek-item">
              <ha-icon class="lead" icon="mdi:puzzle-outline"></ha-icon>
              <span class="ltek-item-text"><span class="ltek-name">${n}</span></span>
              <button class="ltek-add" @click=${()=>this.dispatchEvent(new CustomEvent("create-profile",{detail:{integration:n}}))}>${this._t("detect_create_profile")}</button>
            </div>`)}</div>`):u}

    `}_section(e,t,i,n,o){return r`<details class="ltek-sec" open data-section=${e}>
      <summary><ha-icon icon=${t}></ha-icon>${i}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="ltek-body"><p class="ltek-hint">${n}</p><div class="ltek-list">${o}</div></div>
    </details>`}_row(e,t,i,n,o=!1){return r`<label class="ltek-item ${this._ticked.has(e)?"open":""}">
      <input type="checkbox" ?disabled=${o} .checked=${this._ticked.has(e)} @change=${()=>this._toggle(e)} />
      <ha-icon class="lead" icon=${t}></ha-icon>
      <span class="ltek-item-text"><span class="ltek-name">${i}</span><span class="ltek-subline">${n}</span></span>
    </label>`}_renderArea(e,t){let i=this._areas.get(e),n=this._result,o=t[0],l=[...new Map(n.new.filter(m=>m.new_room).map(m=>[m.new_room,m.new_room_name??m.new_room])).entries()],c=[...Object.entries(this.rooms).map(([m,_])=>({value:m,label:_.name??m})),...l.map(([m,_])=>({value:`new:${m}`,label:this._t("detect_new_room",{name:_})}))],d=i.target.startsWith("new:")?void 0:this.rooms[i.target],p=Object.entries(d?.activities??{}),h=t.every(m=>i.devices.has(m.key));return r`<details class="ltek-sub area" open>
      <summary>
        <ha-icon icon="mdi:texture-box"></ha-icon>${o.area_name??this._t("detect_no_area")}
        <span class="count">${i.devices.size} / ${t.length}</span>
        <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
      </summary>
      <div class="ltek-sub-body">
        <div class="ltek-row">
          <label class="lbl">${this._t("detect_room")}</label>
          <select @change=${m=>{let _=m.target.value,f=_.startsWith("new:")?[]:Object.keys(this.rooms[_]?.activities??{});this._setArea(e,{target:_,activities:new Set(f)})}}>
            ${c.map(m=>r`<option value=${m.value} ?selected=${m.value===i.target}>${m.label}</option>`)}
          </select>
          <label class="check">
            <input type="checkbox" .checked=${h} @change=${()=>this._setArea(e,{devices:h?new Set:new Set(t.map(m=>m.key))})} />
            ${this._t("detect_select_all")}
          </label>
        </div>
        ${d?r`<div class="ltek-row">
              <label class="lbl">${this._t("detect_activities")}</label>
              ${p.length?p.map(([m,_])=>r`<label class="check">
                    <input type="checkbox" .checked=${i.activities.has(m)} @change=${()=>{let f=new Set(i.activities);f.has(m)?f.delete(m):f.add(m),this._setArea(e,{activities:f})}} />${_.name??m}</label>`):r`<span class="ltek-hint">${this._t("detect_no_activities")}</span>`}
            </div>`:u}
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
            @click=${n=>{n.preventDefault(),this.dispatchEvent(new CustomEvent("open-profile",{detail:{id:t.profile}}))}}
          >
            <ha-icon icon="mdi:package-variant-closed"></ha-icon>${t.profile_name}
          </button>
          ${t.integrations.map(n=>r`<span class="chip ${n===t.integration?"used":""}" title=${n===t.integration?this._t("detect_used_integration"):""}>${n}</span>`)}
          ${t.picture?r`<span class="chip picture">${this._t("detect_picture")}</span>`:u}
        </span>
      </span>
      <span class="chip order ${t.order}">${this._t(`order.${t.order}`)}</span>
    </label>`}};te.properties={hass:{attribute:!1},rooms:{attribute:!1},_result:{state:!0},_areas:{state:!0},_ticked:{state:!0},_starter:{state:!0},_error:{state:!0}},te.styles=[y,$,w,v`
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
    `];customElements.get("easy-av-control-detect")||customElements.define("easy-av-control-detect",te);var Vt="https://github.com/Ltek/easy-av-control#readme",Ht={en:{title:"Guide",close:"Close",steps_title:"How it works",steps:[r`<b>Add the devices</b> of the room under <i>Devices</i>: pick each device's entity. If it hangs on a
        switchable outlet, enter it under <i>Power Outlet</i>. If it loses its connection without power (Apple TV), use
        the recommended button under <i>Connection check</i>.`,r`<b>Put together activities</b> under <i>Activities</i>: choose the devices in the order they are
        switched on, and under <i>Actions after start</i> for example the TV's input. Quick-select buttons start apps.`,r`<b>Save and add the card:</b> save at the top right. On a dashboard, add a card, search for
        <i>Easy AV Control Remote</i> and choose the room.`],terms_title:"Terms",terms:[["Outlet","Switch that powers the device. Switched on first and off last; outlets shared by several devices stay on while one of them is needed."],["Boot time","Wait after the outlet came on, before the device is switched on. Only when the outlet was off."],["Waiting times","After switching on: until the device accepts commands. After switching off: cool-down, e.g. for a projector lamp."],["Connection check","Waits until the device is reachable in Home Assistant, at the start and before remote buttons; can reload its integration until it connects."],["Checks","What must be right before the activity counts as running, e.g. a picture on the Lumagen and the projector."],["Actions after start","Run once all devices are on and the checks passed: input, volume, sound mode, any action."],["Remote control","Which device gets volume, channels, playback and arrow keys. Automatic: volume to the first media player, the rest to the last."],["Quick select","Buttons that switch a media player to a source, on an Apple TV to an app."],["Settings in the card","On a device: source, sound mode and entities such as tone controls, changeable in the card in every activity that uses it; automatic or chosen with favourites. An activity can choose its own."]],example_title:"Example: TV and Apple TV",example:[r`Device <i>TV</i>: entity <code>media_player.tv</code>, outlet <code>switch.tv_outlet</code>, boot time
        15 s, wait after switching on 10 s.`,r`Device <i>Apple TV</i>: entity <code>media_player.apple_tv</code>, under <i>Connection check</i> the
        button <i>Use remote.apple_tv for the connection check and the arrow keys</i>.`,r`Activity <i>Apple TV</i>: devices TV, then Apple TV; action after start <i>Set source</i> on the TV to its
        HDMI input; quick select Apple TV with Netflix.`,r`Save, add the card, start the activity.`],docs:r`All options and the YAML reference: <a href=${Vt} target="_blank" rel="noreferrer">documentation on GitHub</a>.`},de:{title:"Anleitung",close:"Schlie\xDFen",steps_title:"So geht's",steps:[r`<b>Geräte anlegen</b> unter <i>Geräte</i>: Für jedes Gerät die Entität wählen. Hängt es an einer
        schaltbaren Steckdose, diese unter <i>Steckdose</i> eintragen. Verliert es ohne Strom die Verbindung (Apple
        TV), unter <i>Verbindung prüfen</i> den empfohlenen Knopf nutzen.`,r`<b>Aktivitäten zusammenstellen</b> unter <i>Aktivitäten</i>: die Geräte in Einschaltreihenfolge wählen,
        unter <i>Aktionen nach dem Start</i> zum Beispiel den Eingang des TV. Schnellwahl-Tasten starten Apps.`,r`<b>Speichern und Card einfügen:</b> oben rechts speichern. Im Dashboard eine Karte hinzufügen,
        <i>Easy AV Control Remote</i> suchen und den Raum wählen.`],terms_title:"Begriffe",terms:[["Steckdose","Schalter, an dem das Ger\xE4t h\xE4ngt. Wird zuerst ein- und zuletzt ausgeschaltet; gemeinsame Steckdosen mehrerer Ger\xE4te bleiben an, solange eines davon gebraucht wird."],["Startzeit","Wartezeit nach dem Einschalten der Steckdose, bevor das Ger\xE4t eingeschaltet wird. Nur wenn die Steckdose aus war."],["Wartezeiten","Nach dem Einschalten: bis das Ger\xE4t Befehle annimmt. Nach dem Ausschalten: Abk\xFChlzeit, z. B. f\xFCr eine Beamer-Lampe."],["Verbindung pr\xFCfen","Wartet, bis das Ger\xE4t in Home Assistant erreichbar ist, beim Start und vor Tasten der Fernbedienung; kann seine Integration neu laden, bis sie verbunden ist."],["Pr\xFCfungen","Was stimmen muss, bevor die Aktivit\xE4t als laufend gilt, z. B. ein Bild am Lumagen und am Projektor."],["Aktionen nach dem Start","Laufen, sobald alle Ger\xE4te an sind und die Pr\xFCfungen bestanden: Eingang, Lautst\xE4rke, Klangmodus, beliebige Aktion."],["Fernbedienung","Welches Ger\xE4t Lautst\xE4rke, Sender, Wiedergabe und Pfeiltasten bekommt. Automatisch: Lautst\xE4rke an den ersten Mediaplayer, der Rest an den letzten."],["Schnellwahl","Tasten, die einen Mediaplayer auf eine Quelle schalten, beim Apple TV auf eine App."],["Einstellungen in der Karte","Am Ger\xE4t: Quelle, Klangmodus und Entit\xE4ten wie Klangregler, in der Karte \xE4nderbar in jeder Aktivit\xE4t, die es nutzt; automatisch oder ausgew\xE4hlt mit Favoriten. Eine Aktivit\xE4t kann eigene w\xE4hlen."]],example_title:"Beispiel: TV und Apple TV",example:[r`Gerät <i>TV</i>: Entität <code>media_player.tv</code>, Steckdose <code>switch.steckdose_tv</code>,
        Startzeit 15 s, Warten nach Einschalten 10 s.`,r`Gerät <i>Apple TV</i>: Entität <code>media_player.apple_tv</code>, unter <i>Verbindung prüfen</i> der
        Knopf <i>remote.apple_tv für Verbindungsprüfung und Pfeiltasten nutzen</i>.`,r`Aktivität <i>Apple TV</i>: Geräte TV, dann Apple TV; Aktion nach dem Start <i>Quelle wählen</i> am TV auf
        den HDMI-Eingang; Schnellwahl Apple TV mit Netflix.`,r`Speichern, Card einfügen, Aktivität starten.`],docs:r`Alle Optionen und die YAML-Referenz: <a href=${Vt} target="_blank" rel="noreferrer">Dokumentation auf GitHub</a>.`}},ie=class extends g{render(){let s=(this.language??"en").split("-")[0],e=Ht[s]??Ht.en;return r`<div class="page">
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
    </div>`}};ie.properties={language:{}},ie.styles=[y,$,w,v`
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
  `];customElements.get("easy-av-control-guide")||customElements.define("easy-av-control-guide",ie);var Ye=["status","time","both"],Qe=["warn","stop","retry"],Pe=["profile","state_source","wait_on","wait_off","timeout_on","timeout_off","debounce","on_failure"];function Gt(a){let s=a?.profile?.data??{};return{timeout_on:s.timeouts?.on??120,timeout_off:s.timeouts?.off??300,debounce:s.debounce??2}}function Ze(a,s){let e=a.on_failure;return e&&typeof e=="object"?e[s]??"warn":e??"warn"}function Wt(a,s){let e=Gt(s),t=a.state_source;return{profile:a.profile??"__auto",state_source:t==="none"?"none":t&&typeof t=="object"?"custom":"auto",wait_on:a.wait_on??"status",wait_off:a.wait_off??"status",timeout_on:a.timeout_on??e.timeout_on,timeout_off:a.timeout_off??e.timeout_off,debounce:a.debounce??e.debounce,on_failure_on:Ze(a,"turn_on"),on_failure_off:Ze(a,"turn_off"),on_failure_picture:Ze(a,"picture")}}function Bt(a,s,e){let t=Gt(e),i={...a};for(let c of Pe)delete i[c];s.profile&&s.profile!=="__auto"&&(i.profile=s.profile),s.state_source==="none"?i.state_source="none":s.state_source==="custom"&&(i.state_source=a.state_source??{}),s.wait_on&&s.wait_on!=="status"&&(i.wait_on=s.wait_on),s.wait_off&&s.wait_off!=="status"&&(i.wait_off=s.wait_off),s.timeout_on!==void 0&&Number(s.timeout_on)!==t.timeout_on&&(i.timeout_on=Number(s.timeout_on)),s.timeout_off!==void 0&&Number(s.timeout_off)!==t.timeout_off&&(i.timeout_off=Number(s.timeout_off)),s.debounce!==void 0&&Number(s.debounce)!==t.debounce&&(i.debounce=Number(s.debounce));let n=s.on_failure_on||"warn",o=s.on_failure_off||"warn",l=s.on_failure_picture||"warn";return n===o&&o===l?n!=="warn"&&(i.on_failure=n):i.on_failure={...n!=="warn"?{turn_on:n}:{},...o!=="warn"?{turn_off:o}:{},...l!=="warn"?{picture:l}:{}},i}function Kt(a,s){let e=s?.found;if(!e)return{};let t={};return e.remote_entity&&a.remote_entity!==e.remote_entity&&(t.remote_entity=e.remote_entity),e.power_switch&&!a.power_switch&&(t.power_switch=e.power_switch),t}function Oe(a){if(!a||typeof a!="object")return"";let s=a;return[s.domain,s.translation_key??s.unique_id_suffix??s.device_class].filter(Boolean).join(" \xB7 ")}function Ut(a,s){let e=a.data,t=[],i=e.indicator;if(i){let o=i.entity?Oe(i.entity):s("sum_indicator_device"),l=i.attribute?`${o} (${i.attribute})`:o;t.push(s("sum_indicator",{what:i.available_is_on?s("sum_indicator_available",{what:l}):l}));let c=["starting","on","stopping","off","error"].filter(d=>Array.isArray(i[d])&&i[d].length).map(d=>`${d}: ${i[d].join(" / ")}`);c.length&&t.push(s("sum_states",{groups:c.join(" \xB7 ")}))}e.remote&&t.push(`${s("sum_remote")}: ${Oe(e.remote)}`),e.power_switch&&t.push(`${s("sum_outlet")}: ${Oe(e.power_switch)}`),Array.isArray(e.settings)&&e.settings.length&&t.push(`${s("sum_settings")}: ${e.settings.map(Oe).join(", ")}`),e.picture&&t.push(`${s("sum_picture")}: ${e.picture.ok.join(" / ")}`),e.order&&t.push(s("sum_order",{order:s(`order.${e.order}`)}));let n=Object.entries(e.roles??{}).sort(([,o],[,l])=>o-l).map(([o])=>s(`role.${o}`));return n.length&&t.push(s("sum_roles",{roles:n.join(", ")})),t}var Ri=new Set(["unavailable","unknown",""]);function Ft(a,s){let e={},t=(n,o)=>{o===void 0||Ri.has(o)||(e[n]??=[]).includes(o)||e[n].push(o)},i={};a.length&&(a.length>1&&t("off",a[0]),a.slice(1,-1).forEach(n=>t("starting",n)),t("on",a[a.length-1]),a[0]==="unavailable"&&(i.available_is_on=!0)),s.length&&(s.length>1&&t("on",s[0]),s.slice(1,-1).forEach(n=>t("stopping",n)),t("off",s[s.length-1]),s[s.length-1]==="unavailable"&&(i.available_is_on=!0));for(let n of["starting","stopping"])e[n]=(e[n]??[]).filter(o=>!e.on?.includes(o)&&!e.off?.includes(o)),e[n].length||delete e[n];return{...i,...e}}function Je(a){let s=Math.round(a);return s>=60?`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`:`${s} s`}function Xe(a,s){let e=s?.timings;if(!e||!s?.state)return{};let t={},i={on:s.state.timeout_on,off:s.state.timeout_off};for(let n of["on","off"]){let o=e[n]?.suggested;o&&o!==i[n]&&(t[n==="on"?"timeout_on":"timeout_off"]=o)}return t}var L={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},qt=a=>(...s)=>({_$litDirective$:a,values:s}),De=class{constructor(s){}get _$AU(){return this._$AM._$AU}_$AT(s,e,t){this._$Ct=s,this._$AM=e,this._$Ci=t}_$AS(s,e){return this.update(s,e)}update(s,e){return this.render(...e)}};var{I:Ds}=It;var Zt=a=>a.strings===void 0;var Oi={},Yt=(a,s=Oi)=>a._$AH=s;var E=qt(class extends De{constructor(a){if(super(a),a.type!==L.PROPERTY&&a.type!==L.ATTRIBUTE&&a.type!==L.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Zt(a))throw Error("`live` bindings can only contain a single expression")}render(a){return a}update(a,[s]){if(s===A||s===u)return s;let e=a.element,t=a.name;if(a.type===L.PROPERTY){if(s===e[t])return A}else if(a.type===L.BOOLEAN_ATTRIBUTE){if(!!s===e.hasAttribute(t))return A}else if(a.type===L.ATTRIBUTE&&e.getAttribute(t)===s+"")return A;return Yt(a),s}});var se=class extends g{constructor(){super(),this.data={},this.schema=[],this.disabled=!1}_set(s,e){let t={...this.data??{}};e===void 0||e===""?delete t[s]:t[s]=e,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t}}))}render(){return r`${(this.schema??[]).map(s=>this._field(s))}`}_field(s){let e=this.computeLabel?.(s)??s.name,t=this.computeHelper?.(s),[i,n]=Object.entries(s.selector??{})[0]??["text",{}],o=n??{},l=this.data?.[s.name],c=t?r`<div class="ltek-hint help">${t}</div>`:u;if(i==="boolean")return r`<label class="check">
          <input
            type="checkbox"
            .checked=${E(!!l)}
            ?disabled=${this.disabled}
            @change=${p=>this._set(s.name,p.target.checked)}
          />
          ${e}
        </label>
        ${c}`;if(i==="text")return r`<div class="ltek-row">
          <label class="lbl">${e}</label>
          <input
            type="text"
            .value=${E(l==null?"":String(l))}
            ?disabled=${this.disabled}
            @change=${p=>this._set(s.name,p.target.value)}
          />
        </div>
        ${c}`;if(i==="number"){let p=o.unit_of_measurement??"",h=_=>{let f=_.target.value;this._set(s.name,f===""?void 0:Number(f))},m=l==null?"":String(l);return o.mode==="slider"?r`<div class="ltek-row slider">
            <label class="lbl">${e}</label>
            <input
              type="range"
              min=${String(o.min??0)}
              max=${String(o.max??100)}
              step=${String(o.step??1)}
              .value=${E(m||String(o.min??0))}
              ?disabled=${this.disabled}
              @input=${h}
            />
            <span class="readout">${m===""?"\u2013":m}${p?r`<span class="unit">${p}</span>`:u}</span>
          </div>
          ${c}`:r`<div class="ltek-row">
          <label class="lbl">${e}</label>
          <input
            class="num"
            type="number"
            min=${String(o.min??"")}
            max=${String(o.max??"")}
            step=${String(o.step??1)}
            .value=${E(m)}
            ?disabled=${this.disabled}
            @change=${h}
          />
          ${p?r`<span class="unit">${p}</span>`:u}
        </div>
        ${c}`}if(i==="select"&&!o.multiple&&!o.custom_value){let p=(o.options??[]).map(m=>typeof m=="string"?{value:m,label:m}:m),h=l==null?"":String(l);return r`<div class="ltek-row">
          <label class="lbl">${e}</label>
          <select
            .value=${E(h)}
            ?disabled=${this.disabled}
            @change=${m=>this._set(s.name,m.target.value||void 0)}
          >
            ${s.required&&h?u:r`<option value="" ?selected=${!h}>–</option>`}
            ${p.map(m=>r`<option value=${m.value} ?selected=${m.value===h}>${m.label}</option>`)}
            ${h&&!p.some(m=>m.value===h)?r`<option value=${h} selected>${h}</option>`:u}
          </select>
        </div>
        ${c}`}return r`<div class="ltek-row ${i==="object"||i==="action"||i==="target"?"stack":"picker"}">
        <label class="lbl">${e}</label>
        <ha-selector
          .hass=${this.hass}
          .selector=${s.selector}
          .value=${l}
          .required=${!!s.required}
          .disabled=${this.disabled}
          @value-changed=${p=>{p.stopPropagation(),this._set(s.name,p.detail.value)}}
        ></ha-selector>
      </div>
      ${c}`}};se.properties={hass:{attribute:!1},data:{attribute:!1},schema:{attribute:!1},computeLabel:{attribute:!1},computeHelper:{attribute:!1},disabled:{type:Boolean}},se.styles=[y,$,w,v`
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
    `];customElements.get("ltek-form")||customElements.define("ltek-form",se);var Qt=["starting","on","stopping","off","error"],Pi=["power","navigation","now_playing","turn_off"],Di=["early","middle","late"];function et(a){let s={domain:a.domain};return a.translation_key?s.translation_key=a.translation_key:a.unique_id_suffix?s.unique_id_suffix=a.unique_id_suffix:a.device_class&&(s.device_class=a.device_class),s}function N(a,s){if(s)return a.filter(e=>e.domain===s.domain).filter(e=>!s.translation_key||e.translation_key===s.translation_key).filter(e=>!s.unique_id_suffix||(e.unique_id_suffix??"").endsWith(s.unique_id_suffix)).filter(e=>!s.device_class||e.device_class===s.device_class).sort((e,t)=>e.entity_id.localeCompare(t.entity_id))[0]}function zi(a,s,e){let t=new Set(Qt.filter(i=>i!==e).flatMap(i=>s[i]??[]));return a.filter(i=>!t.has(i))}function Jt(a,s,e){let t={...a},[i,...n]=s;if(n.length){let l=Jt(a[i]??{},n,e);return Object.keys(l).length?t[i]=l:delete t[i],t}return e===void 0||e===""||Array.isArray(e)&&!e.length||typeof e=="object"&&e!==null&&!Array.isArray(e)&&!Object.keys(e).length?delete t[i]:t[i]=e,t}var ne=class extends g{constructor(){super();this._sampleKey="";this.readonly=!1,this._open="general"}_t(e,t){return x(this.hass?.language,e,t)}willUpdate(){let e=String(this.profile?.integration??""),t=`${e}|${this._deviceId??""}`;this.hass&&t!==this._sampleKey&&(this._sampleKey=t,this.hass.callWS({type:"easy_av_control/profiles/sample",integration:e,device_id:this._deviceId??null}).then(i=>{t===this._sampleKey&&(this._sample=i)}).catch(()=>{}))}_set(e,t){this.readonly||this.dispatchEvent(new CustomEvent("profile-changed",{detail:{profile:Jt(this.profile,e,t)}}))}get _entities(){return this._sample?.entities??[]}_panel(e,t,i,n,o){return r`<details
      class="ltek-sec"
      .open=${this._open===e}
      @toggle=${l=>{let c=l.target.open;c&&this._open!==e?this._open=e:!c&&this._open===e&&(this._open="")}}
    >
      <summary><ha-icon icon=${t}></ha-icon>${i}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="ltek-body">${n?r`<p class="ltek-hint">${n}</p>`:u}<fieldset ?disabled=${this.readonly}>${o}</fieldset></div>
    </details>`}_text(e,t,i=""){let n=e.reduce((o,l)=>o?.[l],this.profile)??"";return r`<div class="ltek-row"><label class="lbl">${t}</label>
      <input type="text" .value=${String(n)} placeholder=${i}
        @change=${o=>this._set(e,o.target.value.trim())} /></div>`}_select(e,t,i,n=""){let o=String(e.reduce((l,c)=>l?.[c],this.profile)??n);return r`<div class="ltek-row"><label class="lbl">${t}</label>
      <select @change=${l=>this._set(e,l.target.value||void 0)}>
        ${i.map(([l,c])=>r`<option value=${l} ?selected=${l===o}>${c}</option>`)}
      </select></div>`}_slider(e,t,i,n,o,l){let c=e.reduce((p,h)=>p?.[h],this.profile),d=c===void 0?l:Number(c);return r`<div class="ltek-row nowrap"><label class="lbl">${t}</label>
      <input type="range" min=${i} max=${n} step=${o} .value=${String(d)}
        @input=${p=>p.target.nextElementSibling.textContent=this._secs(Number(p.target.value))}
        @change=${p=>{let h=Number(p.target.value);this._set(e,h===l?void 0:h)}} />
      <span class="ltek-val">${this._secs(d)}</span>
      ${c!==void 0&&!this.readonly?r`<button class="ltek-act" title=${this._t("pf.reset")} @click=${()=>this._set(e,void 0)}><ha-icon icon="mdi:restore"></ha-icon></button>`:u}</div>`}_secs(e){return e>=60&&e%60===0?`${e/60} min`:`${e} s`}_entityPicker(e,t,i,n=!0){let o=e.reduce((p,h)=>p?.[h],this.profile),l=N(this._entities,o),c=this._entities.filter(p=>!i||i.includes(p.domain)),d=p=>p?[p.domain,p.translation_key??p.unique_id_suffix??p.device_class].filter(Boolean).join(" \xB7 "):"";return r`<div class="ltek-row"><label class="lbl">${t}</label>
      <select @change=${p=>{let h=p.target.value,m=this._entities.find(_=>_.entity_id===h);this._set(e,m?et(m):void 0)}}>
        ${n?r`<option value="" ?selected=${!o}>${this._t("pf.none")}</option>`:u}
        ${o&&!l?r`<option value="__keep" selected>${d(o)} (${this._t("pf.not_on_device")})</option>`:u}
        ${c.map(p=>r`<option value=${p.entity_id} ?selected=${l?.entity_id===p.entity_id}>${p.name} · ${p.entity_id}</option>`)}
      </select>
      ${o?r`<span class="ltek-badge">${d(o)}</span>`:u}</div>`}_chips(e,t,i){let n=e.reduce((l,c)=>l?.[c],this.profile)??[],o=l=>l&&!n.includes(l)&&this._set(e,[...n,l]);return r`<div class="ltek-row"><label class="lbl">${t}</label>
      <span class="chips">
        ${n.map(l=>r`<span class="chip on">${l}
          ${this.readonly?u:r`<button title=${this._t("delete")} @click=${()=>this._set(e,n.filter(c=>c!==l))}>×</button>`}</span>`)}
        ${this.readonly?u:r`${i.filter(l=>!n.includes(l)).map(l=>r`<button class="chip add" @click=${()=>o(l)}>+ ${l}</button>`)}
              <input class="chip-input" type="text" placeholder=${this._t("pf.other_value")}
                @change=${l=>{let c=l.target;o(c.value.trim()),c.value=""}} />`}
      </span></div>`}_general(){let e=[...new Set([String(this.profile.integration??""),...this._sample?.integrations??[]])].filter(Boolean),t=this._sample?.devices??[];return r`
      ${this._text(["name"],this._t("pf.name"))}
      ${this._text(["id"],this._t("pf.id"),"my_receiver")}
      ${this._select(["integration"],this._t("pf.integration"),e.map(i=>[i,i]))}
      ${t.length>1?r`<div class="ltek-row"><label class="lbl">${this._t("pf.example")}</label>
            <select @change=${i=>this._deviceId=i.target.value}>
              ${t.map(i=>r`<option value=${i.id} ?selected=${i.id===this._sample?.device_id}>${i.name}</option>`)}
            </select></div>`:u}
      ${this._entities.length?u:r`<p class="ltek-hint ltek-warn">${this._t("pf.no_example")}</p>`}
      ${this._entityPicker(["device_entity"],this._t("pf.device_entity"),["media_player","remote","switch"],!1)}
      ${this._select(["order"],this._t("pf.order"),Di.map(i=>[i,this._t(`order.${i}`)]),"middle")}
    `}_status(){let e=this.profile.indicator??{},t=!e.entity,i=t?N(this._entities,this.profile.device_entity):N(this._entities,e.entity),n=e.attribute,o=n?i?.attributes[n]:i?.state,l=n?[o].filter(d=>d!==void 0).map(String):i?.values??[],c=Object.keys(i?.attributes??{});return r`
      ${this._entityPicker(["indicator","entity"],this._t("pf.status_entity"),null)}
      <p class="ltek-hint">${this._t(t?"pf.status_own":"pf.status_other")}</p>
      ${c.length?this._select(["indicator","attribute"],this._t("pf.attribute"),[["",this._t("pf.attribute_none")],...c.map(d=>[d,d])]):u}
      ${i?r`<p class="ltek-hint">${this._t("pf.now",{value:o===void 0?"\u2013":String(o)})}</p>`:u}
      <label class="check"><input type="checkbox" .checked=${!!e.available_is_on}
        @change=${d=>this._set(["indicator","available_is_on"],d.target.checked||void 0)} />
        ${this._t("pf.available_is_on")}</label>
      ${e.available_is_on?u:Qt.map(d=>this._chips(["indicator",d],this._t(`pf.group.${d}`),zi(l,e,d)))}
    `}_timing(){return r`
      ${this._slider(["timeouts","on"],this._t("pf.timeout_on"),5,600,5,120)}
      ${this._slider(["timeouts","off"],this._t("pf.timeout_off"),5,900,5,300)}
      ${this._slider(["debounce"],this._t("pf.debounce"),0,30,.5,2)}
    `}_companions(){let e=this.profile.settings??[],t=this._entities.filter(n=>["select","number","switch"].includes(n.domain)),i=new Set(e.map(n=>N(this._entities,n)?.entity_id).filter(Boolean));return r`
      ${this._entityPicker(["remote"],this._t("pf.remote"),["remote"])}
      ${this._entityPicker(["power_switch"],this._t("pf.power_switch"),["switch"])}
      <div class="ltek-group">${this._t("pf.settings")}</div>
      <p class="ltek-hint">${this._t("pf.settings_hint")}</p>
      ${t.map(n=>r`<label class="check"><input type="checkbox" .checked=${i.has(n.entity_id)}
        @change=${o=>{let l=o.target.checked,c=et(n),d=e.filter(p=>N(this._entities,p)?.entity_id!==n.entity_id);this._set(["settings"],l?[...d,c]:d)}} />${n.name}</label>`)}
      ${e.filter(n=>!N(this._entities,n)).map(n=>r`<span class="ltek-badge">${n.domain} · ${n.translation_key??n.unique_id_suffix??""}</span>`)}
    `}_picture(){let e=this.profile.picture,t=N(this._entities,e?.entity);return r`
      <label class="check"><input type="checkbox" .checked=${!!e}
        @change=${i=>{let n=i.target.checked,o=this._entities.find(l=>l.domain==="sensor");this._set(["picture"],n?{entity:o?et(o):{domain:"sensor"},ok:[]}:void 0)}} />${this._t("pf.picture_on")}</label>
      ${e?r`${this._entityPicker(["picture","entity"],this._t("pf.picture_entity"),null,!1)}
            ${this._chips(["picture","ok"],this._t("pf.picture_ok"),t?.values??[])}
            ${this._chips(["picture","fail"],this._t("pf.picture_fail"),t?.values??[])}
            ${this._slider(["picture","timeout"],this._t("pf.picture_timeout"),5,300,5,30)}
            ${this._slider(["picture","debounce"],this._t("pf.debounce"),0,30,.5,5)}`:u}
    `}_jobs(){let e=this.profile.roles??{};return r`${Pi.map(t=>r`<div class="ltek-row nowrap"><label class="ltek-check-inline">
        <input type="checkbox" .checked=${e[t]!==void 0}
          @change=${i=>this._set(["roles",t],i.target.checked?5:void 0)} />
        ${this._t(`role.${t}`)}</label>
        ${e[t]!==void 0?r`<input type="range" min="1" max="9" step="1" .value=${String(e[t])}
              @change=${i=>this._set(["roles",t],Number(i.target.value))} />
              <span class="ltek-val">${e[t]}</span>`:u}</div>`)}`}render(){return r`
      ${this._panel("general","mdi:information-outline",this._t("pf.general"),this._t("pf.general_hint"),this._general())}
      ${this._panel("status","mdi:state-machine",this._t("pf.status"),this._t("pf.status_hint"),this._status())}
      ${this._panel("timing","mdi:timer-sand",this._t("pf.timing"),this._t("pf.timing_hint"),this._timing())}
      ${this._panel("companions","mdi:remote",this._t("pf.companions"),this._t("pf.companions_hint"),this._companions())}
      ${this._panel("picture","mdi:image-check-outline",this._t("pf.picture"),this._t("pf.picture_hint"),this._picture())}
      ${this._panel("jobs","mdi:account-hard-hat-outline",this._t("pf.jobs"),this._t("pf.jobs_hint"),this._jobs())}
    `}};ne.properties={hass:{attribute:!1},profile:{attribute:!1},readonly:{type:Boolean},_sample:{state:!0},_open:{state:!0},_deviceId:{state:!0}},ne.styles=[y,$,w,v`
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
    `];customElements.get("easy-av-control-profile-form")||customElements.define("easy-av-control-profile-form",ne);var oe=class extends g{constructor(){super(),this.profiles=[],this._yaml=!1}_t(s,e){return x(this.hass?.language,s,e)}_changed(){this.dispatchEvent(new CustomEvent("profiles-changed"))}updated(s){if(s.has("focusProfile")&&this.focusProfile){let t=this.focusProfile;this._editing=void 0,this._preview=t,this.dispatchEvent(new CustomEvent("focus-shown")),this.updateComplete.then(()=>this.shadowRoot?.querySelector(`[data-profile="${CSS.escape(t)}"]`)?.scrollIntoView({block:"center"}))}if(s.has("draftFor")&&this.draftFor){let t=this.draftFor;this.dispatchEvent(new CustomEvent("draft-opened")),this._draft(t)}let e=this._editing?.learn;if(s.has("hass")&&e?.mode){let t=this.hass.states[e.watch]?.state,i=e[e.mode];t!==void 0&&i[i.length-1]!==t&&(this._editing={...this._editing,learn:{...e,[e.mode]:[...i,t]}})}}async _openPicker(){let s=await this.hass.callWS({type:"easy_av_control/config/detect_all",rooms:{}});this._pick=s.unmatched}async _draft(s){this._pick=void 0;try{let e=await this.hass.callWS({type:"easy_av_control/profiles/draft",integration:s});this._notice=void 0,this._editing={data:e.profile,previousId:null,readonly:!1,learn:{watch:e.watch,device:e.device_entity,on:[],off:[],mode:null}}}catch(e){this._notice=e.message??String(e)}}async _learn(s){let e=this._editing.learn,t=this.hass.states[e.watch]?.state;this._editing={...this._editing,learn:{...e,mode:s,[s]:t!==void 0?[t]:[]}},await this.hass.callService("homeassistant",s==="on"?"turn_on":"turn_off",{entity_id:e.device})}_useLearned(){let s=this._editing,e=Ft(s.learn.on,s.learn.off),t={...s.data.indicator??{},...e};this._editing={...s,data:{...s.data,indicator:t},learn:{...s.learn,mode:null}}}_renderLearn(s){let e=t=>t.length?t.join(" \u2192 "):"\u2013";return r`<details class="ltek-sec" open>
      <summary><ha-icon icon="mdi:school-outline"></ha-icon>${this._t("learn")}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="ltek-body">
        <p class="ltek-hint">${this._t("learn_hint",{entity:s.watch})}</p>
        <div class="ltek-buttons">
          <button class="ltek-btn ${s.mode==="on"?"primary":""}" @click=${()=>this._learn("on")}>
            <ha-icon icon="mdi:power"></ha-icon> ${this._t("learn_on")}
          </button>
          <button class="ltek-btn ${s.mode==="off"?"primary":""}" @click=${()=>this._learn("off")}>
            <ha-icon icon="mdi:power-off"></ha-icon> ${this._t("learn_off")}
          </button>
          <button class="ltek-btn" ?disabled=${!s.on.length&&!s.off.length} @click=${this._useLearned}>
            ${this._t("learn_use")}
          </button>
        </div>
        ${s.on.length||s.off.length?r`<p class="ltek-hint">${this._t("learn_seen_on",{states:e(s.on)})}<br />
              ${this._t("learn_seen_off",{states:e(s.off)})}</p>`:r`<p class="ltek-hint">${this._t("learn_nothing")}</p>`}
      </div>
    </details>`}render(){if(this._editing)return this._renderEditor(this._editing);let s=this.profiles.filter(t=>t.source==="builtin"),e=this.profiles.filter(t=>t.source==="user");return r`
      <p class="ltek-hint">${this._t("profiles_intro")}</p>
      ${this._notice?r`<p class="ltek-hint ok">${this._notice}</p>`:u}
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
                </button>`:u}
          </div>
          ${this._pick?r`<div class="ltek-row pick">
                <label class="lbl">${this._t("profile_new_pick")}</label>
                ${this._pick.length?r`<select @change=${t=>{let i=t.target.value;i&&this._draft(i)}}>
                      <option value="">–</option>
                      ${this._pick.map(t=>r`<option value=${t}>${t}</option>`)}
                    </select>`:u}
                <span class="ltek-hint">${this._t(this._pick.length?"profile_new_hint":"profile_new_none")}</span>
              </div>`:u}
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
        <div class="ltek-body"><div class="ltek-list">${s.map(t=>this._row(t))}</div></div>
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
    `}_row(s){let e=s.source==="builtin",t=this._preview===s.id,i=s.generic?this._t("profile_generic"):s.used_by?.length?this._t("profile_used_by",{where:s.used_by.join(", ")}):this._t("profile_unused");return r`<div class="ltek-item ${t?"open":""}" data-profile=${s.id}>
        <ha-icon class="lead" icon=${e?"mdi:lock-outline":"mdi:account-cog-outline"}></ha-icon>
        <span class="ltek-item-text">
          <span class="ltek-name">${s.name}</span>
          <span class="ltek-subline">${s.integration==="*"?"":`${s.integration} \xB7 `}${i}</span>
        </span>
        ${s.tested?u:r`<span class="ltek-badge warn" title=${this._t("profile_untested")}>!</span>`}
        <button class="ltek-act ${t?"on":""}" title=${this._t("profile_preview")} @click=${()=>this._preview=t?void 0:s.id}>
          <ha-icon icon=${t?"mdi:eye-off-outline":"mdi:eye-outline"}></ha-icon>
        </button>
        <button class="ltek-act" title=${this._t(e?"profile_view":"profile_edit")} @click=${()=>this._edit(s)}>
          <ha-icon icon="mdi:pencil"></ha-icon>
        </button>
        <button class="ltek-act" title=${this._t("profile_duplicate")} @click=${()=>this._duplicate(s.id)}>
          <ha-icon icon="mdi:content-copy"></ha-icon>
        </button>
        <button class="ltek-act" title=${this._t("profile_export")} @click=${()=>this._openExport([s.id])}>
          <ha-icon icon="mdi:export"></ha-icon>
        </button>
        ${e?u:r`<button class="ltek-del" title=${this._t("delete")} @click=${()=>this._delete(s)}>
              <ha-icon icon="mdi:trash-can-outline"></ha-icon>
            </button>`}
      </div>
      ${t?r`<div class="preview">${Ut(s,(n,o)=>this._t(n,o)).map(n=>r`<div>${n}</div>`)}</div>`:u}`}_edit(s){this._notice=void 0,this._editing={data:s.data,previousId:s.source==="user"?s.id:null,readonly:s.source==="builtin"}}async _duplicate(s){let e=await this.hass.callWS({type:"easy_av_control/profiles/duplicate",profile_id:s});this._notice=void 0,this._editing={data:e,previousId:null,readonly:!1}}async _delete(s){window.confirm(this._t("profile_delete_confirm",{name:s.name}))&&(await this.hass.callWS({type:"easy_av_control/profiles/delete",profile_id:s.id}),this._changed())}async _save(){let s=this._editing,e=await this.hass.callWS({type:"easy_av_control/profiles/save",profile:s.data,previous_id:s.previousId});if(e.error){this._editing={...s,error:e.error.message};return}this._editing=void 0,this._notice=this._t("profile_saved"),this._changed()}_renderEditor(s){return r`
      <div class="ltek-buttons bar">
        <button class="ltek-btn" @click=${()=>this._editing=void 0}>
          <ha-icon icon="mdi:arrow-left"></ha-icon> ${this._t(s.readonly?"profile_close":"profile_cancel")}
        </button>
        ${s.readonly?u:r`<button class="ltek-btn primary" @click=${this._save}>${this._t("profile_save")}</button>`}
      </div>
      <h2 class="title">
        <ha-icon icon=${s.readonly?"mdi:lock-outline":"mdi:pencil"}></ha-icon>${String(s.data.name??s.data.id)}
        <span class="mode">
          <button class="ltek-btn ${this._yaml?"":"primary"}" @click=${()=>this._yaml=!1}>${this._t("pf.form")}</button>
          <button class="ltek-btn ${this._yaml?"primary":""}" @click=${()=>this._yaml=!0}>YAML</button>
        </span>
      </h2>
      <p class="ltek-hint">${this._t(s.readonly?"profile_readonly":this._yaml?"profile_editor_hint":"pf.form_hint")}</p>
      ${s.error?r`<p class="ltek-error">${s.error}</p>`:u}
      ${s.learn&&!s.readonly?this._renderLearn(s.learn):u}
      ${this._yaml?r`<details class="ltek-sec" open>
            <summary><ha-icon icon="mdi:code-braces"></ha-icon>YAML<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
            <div class="ltek-body">
              <ltek-form
                .hass=${this.hass}
                .data=${{yaml:s.data}}
                .schema=${[{name:"yaml",selector:{object:{}}}]}
                .disabled=${s.readonly}
                .computeLabel=${()=>""}
                @value-changed=${e=>{if(s.readonly)return;let t=e.detail.value.yaml;t&&typeof t=="object"&&(this._editing={...s,data:t,error:void 0})}}
              ></ltek-form>
            </div>
          </details>`:r`<easy-av-control-profile-form
            .hass=${this.hass}
            .profile=${s.data}
            ?readonly=${s.readonly}
            @profile-changed=${e=>this._editing={...this._editing,data:e.detail.profile,error:void 0}}
          ></easy-av-control-profile-form>`}
    `}async _openExport(s){let e=await this.hass.callWS({type:"easy_av_control/profiles/export",ids:s});this._dialog={mode:"export",text:JSON.stringify(e,null,2)},await this.updateComplete,this._showDialog()}async _openImport(){this._dialog={mode:"import",text:""},await this.updateComplete,this._showDialog()}_showDialog(){let s=this.shadowRoot?.querySelector("dialog");s&&!s.open&&s.showModal()}_closeDialog(){this.shadowRoot?.querySelector("dialog")?.close(),this._dialog=void 0}async _copy(s){let e=s.currentTarget,t=this.shadowRoot.querySelector("textarea");t.select();let i=!1;try{i=document.execCommand("copy")}catch{i=!1}if(!i)try{await navigator.clipboard.writeText(t.value),i=!0}catch{i=!1}e.textContent=this._t(i?"profile_copied":"profile_copy_failed")}async _paste(){try{let s=await navigator.clipboard.readText();this._dialog={...this._dialog,text:s}}catch{this._dialog={...this._dialog,message:this._t("profile_paste_failed")}}}async _import(){let s;try{s=JSON.parse(this._dialog.text)}catch(i){this._dialog={...this._dialog,message:String(i)};return}let e=await this.hass.callWS({type:"easy_av_control/profiles/import",export:s});if(e.error){this._dialog={...this._dialog,message:e.error.message};return}let t=[this._t("profile_import_done",{added:(e.added??[]).join(", ")||"\u2013"})];for(let[i,n]of Object.entries(e.renamed??{}))t.push(this._t("profile_import_renamed",{from:i,to:n}));Object.keys(e.invalid??{}).length&&t.push(this._t("profile_import_invalid",{ids:Object.keys(e.invalid).join(", ")})),this._closeDialog(),this._notice=t.join(" \xB7 "),this._changed()}_renderDialog(){let s=this._dialog;if(!s)return u;let e=s.mode==="export";return r`<dialog @cancel=${this._closeDialog} @click=${t=>t.target===t.currentTarget&&this._closeDialog()}>
      <div class="dialog-body">
        <div class="ltek-group first">${this._t(e?"profile_export":"profile_import")}</div>
        ${e?u:r`<p class="ltek-hint">${this._t("profile_import_hint")}</p>`}
        <textarea
          class="ltek-text"
          rows="16"
          .value=${s.text}
          ?readonly=${e}
          @input=${t=>this._dialog={...s,text:t.target.value}}
        ></textarea>
        ${s.message?r`<p class="ltek-hint ltek-warn">${s.message}</p>`:u}
        <div class="ltek-buttons">
          ${e?r`<button class="ltek-btn primary" @click=${this._copy}>${this._t("profile_copy")}</button>`:r`<button class="ltek-btn" @click=${this._paste}>${this._t("profile_paste")}</button>
                <button class="ltek-btn primary" ?disabled=${!s.text.trim()} @click=${this._import}>${this._t("profile_import")}</button>`}
          <button class="ltek-btn" @click=${this._closeDialog}>${this._t("profile_close")}</button>
        </div>
      </div>
    </dialog>`}};oe.properties={hass:{attribute:!1},profiles:{attribute:!1},_preview:{state:!0},_editing:{state:!0},_dialog:{state:!0},_notice:{state:!0},_pick:{state:!0},_yaml:{state:!0},draftFor:{attribute:!1},focusProfile:{attribute:!1}},oe.styles=[y,$,w,v`
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
    `];customElements.get("easy-av-control-profiles")||customElements.define("easy-av-control-profiles",oe);function re(a){let s=a.filter(n=>n.ok).map(n=>n.seconds),e=[...s].sort((n,o)=>n-o),t=e.length>>1,i=e.length?e.length%2?e[t]:(e[t-1]+e[t])/2:null;return{count:a.length,typical:i===null?null:Math.round(i*10)/10,fastest:e.length?e[0]:null,slowest:e.length?e[e.length-1]:null,last:s.length?s[s.length-1]:null,spread:e.length?Math.round((e[e.length-1]-e[0])*10)/10:null,failed:a.length-s.length}}function Xt(a){let s=new Map;for(let e of a){let t=[e.room,e.activity,e.mode,e.mode==="start"?e.from??"":""].join("|");s.set(t,[...s.get(t)??[],e])}return[...s.entries()].map(([e,t])=>({key:e,runs:t}))}var tt=a=>a.result==="ok"||a.result==="warning";function P(a){if(a==null||!Number.isFinite(a))return"\u2013";if(a<60)return`${Math.round(a*10)/10} s`;let s=Math.round(a);return`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`}function it(a,s){if(!s||s<=0)return"";let e=Math.round((a-s)/s*100);return Math.abs(e)<10?"":`${e>0?"+":""}${e} %`}var ae=a=>a[a.length-1],ji={ok:"ok",warning:"warn",error:"err",cancelled:""},le=class extends g{constructor(){super(),this._open="runs",this._expanded=new Set,this._mode="all"}connectedCallback(){super.connectedCallback(),this._load()}async _load(){try{this._history=await this.hass.callWS({type:"easy_av_control/history/get"}),this._failed=void 0}catch(s){this._failed=s.message??String(s)}}async _clear(){window.confirm(this._t("rep.clear_confirm"))&&(await this.hass.callWS({type:"easy_av_control/history/clear"}),await this._load())}_t(s,e){return x(this.hass?.language,s,e)}_toggle(s){let e=new Set(this._expanded);e.has(s)?e.delete(s):e.add(s),this._expanded=e}_when(s){let e=new Date(s);return Number.isNaN(e.getTime())?s:e.toLocaleString(this.hass?.language,{dateStyle:"short",timeStyle:"medium"})}render(){if(this._failed)return r`<p class="ltek-hint ltek-error">${this._failed}</p>`;let s=this._history;return r`
      <div class="head">
        <h2><ha-icon icon="mdi:chart-timeline-variant"></ha-icon>${this._t("rep.title")}</h2>
        <div class="ltek-buttons">
          <button class="ltek-btn" @click=${()=>this._load()}>
            <ha-icon icon="mdi:refresh"></ha-icon> ${this._t("rep.refresh")}
          </button>
          <button class="ltek-btn danger" ?disabled=${!s?.runs.length} @click=${()=>this._clear()}>
            <ha-icon icon="mdi:trash-can-outline"></ha-icon> ${this._t("rep.clear")}
          </button>
        </div>
      </div>
      <p class="ltek-hint">${this._t("rep.hint")}</p>
      ${s?r`${this._panel("runs","mdi:timer-play-outline",this._t("rep.runs"),this._renderRuns(s.runs))}
          ${this._panel("devices","mdi:television-play",this._t("rep.devices"),this._renderDevices(s.devices))}`:r`<p class="ltek-hint">${this._t("loading")}</p>`}
    `}_panel(s,e,t,i){return r`<details
      class="ltek-sec"
      .open=${this._open===s}
      @toggle=${n=>{let o=n.target.open;o&&this._open!==s?this._open=s:!o&&this._open===s&&(this._open="")}}
    >
      <summary><ha-icon icon=${e}></ha-icon>${t}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="ltek-body">${i}</div>
    </details>`}_spark(s,e){let n=s.slice(-40),o=Math.max(1,...n.map(c=>c.seconds)),l=Math.max(2,Math.min(10,(180-n.length)/Math.max(1,n.length)));return r`<svg class="spark" viewBox="0 0 ${180} ${32}" width=${180} height=${32} aria-hidden="true">
      ${n.map((c,d)=>{let p=Math.max(2,c.seconds/o*30);return Fe`<rect x=${d*(l+1)} y=${32-p} width=${l} height=${p} rx="1"
          class=${c.ok?c.warn?"warn":"ok":"err"}><title>${P(c.seconds)}</title></rect>`})}
      ${e?Fe`<line x1="0" x2=${180} y1=${32-e/o*30} y2=${32-e/o*30} class="typ" />`:u}
    </svg>`}_stats(s,e="rep.count"){return r`<span class="stats">
      <span><b>${P(s.typical)}</b> ${this._t("rep.typical")}</span>
      <span>${P(s.fastest)} – ${P(s.slowest)}</span>
      ${s.failed?r`<span class="ltek-badge warn">${this._t("rep.failed",{n:String(s.failed)})}</span>`:u}
      <span class="muted">${this._t(e,{n:String(s.count)})}</span>
    </span>`}_renderRuns(s){if(!s.length)return r`<p class="ltek-hint">${this._t("rep.no_runs")}</p>`;let e=s.filter(i=>this._mode==="all"||i.mode===this._mode),t=Xt(e).sort((i,n)=>ae(i.runs).at<ae(n.runs).at?1:-1);return r`<div class="ltek-row">
        <label class="lbl">${this._t("rep.show")}</label>
        <select @change=${i=>this._mode=i.target.value}>
          ${["all","start","stop"].map(i=>r`<option value=${i} ?selected=${this._mode===i}>${this._t(`rep.mode_${i}`)}</option>`)}
        </select>
      </div>
      <div class="ltek-list">
        ${t.map(({key:i,runs:n})=>{let o=n[0],l=re(n.map(d=>({seconds:d.seconds,ok:tt(d)}))),c=this._expanded.has(i);return r`<div class="ltek-item group ${c?"open":""}">
            <button class="row" @click=${()=>this._toggle(i)}>
              <ha-icon class="lead" icon=${o.mode==="start"?"mdi:play-circle-outline":"mdi:stop-circle-outline"}></ha-icon>
              <span class="ltek-item-text">
                <span class="ltek-name">${o.room_name} · ${o.activity_name}</span>
                <span class="ltek-subline"
                  >${this._t(`rep.mode_${o.mode}`)}${o.from_name?` \xB7 ${this._t("rep.from",{activity:o.from_name})}`:""}</span
                >
                ${this._stats(l)}
              </span>
              ${this._spark(n.map(d=>({seconds:d.seconds,ok:tt(d),warn:d.result==="warning"})),l.typical)}
              <ha-icon class="ltek-act chev" icon=${c?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
            </button>
            ${c?r`<div class="runs">${[...n].reverse().map(d=>this._renderRun(d,l.typical))}</div>`:u}
          </div>`})}
      </div>`}_renderRun(s,e){let t=`run:${s.at}`,i=this._expanded.has(t),n=it(s.seconds,e);return r`<div class="run">
      <button class="run-row" @click=${()=>this._toggle(t)}>
        <span class="when">${this._when(s.at)}</span>
        <span class="total"><b>${P(s.seconds)}</b>${n?r` <span class="dev ${n.startsWith("+")?"slow":"fast"}">${n}</span>`:u}</span>
        <span class="ltek-badge ${ji[s.result]??""}">${this._t(`rep.result_${s.result}`)}</span>
        <ha-icon class="ltek-act" icon=${i?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
      </button>
      ${i?this._renderPhases(s):u}
    </div>`}_renderPhases(s){let e=Math.max(s.seconds,.1);return r`<div class="phases">
      ${s.phases.map(t=>r`<div class="phase ${t.result==="error"?"err":""}">
          <span class="phase-name">${this._phaseName(t)}</span>
          <span class="track"
            ><span
              class="bar"
              style="left:${t.start/e*100}%;width:${Math.max(.6,t.seconds/e*100)}%"
            ></span
          ></span>
          <span class="phase-time">${P(t.seconds)}</span>
        </div>`)}
      ${s.error?r`<p class="ltek-error small">${s.error}</p>`:u}
      ${(s.warnings??[]).map(t=>r`<p class="ltek-warn small">${t}</p>`)}
    </div>`}_phaseName(s){return s.kind==="device"?String(s.name??s.device??""):s.kind==="switch_off_unused"?this._t("rep.phase_switch_off_unused"):this._t(`rep.phase_${s.kind}`)}_renderDevices(s){let e=Object.entries(s).filter(([,t])=>t.length);return e.length?(e.sort(([t,i],[n,o])=>(ae(i).name??t).localeCompare(ae(o).name??n)),r`<p class="ltek-hint">${this._t("rep.devices_hint")}</p>
      <div class="ltek-list">
        ${e.map(([t,i])=>{let n=this._expanded.has(`dev:${t}`),o=ae(i).name??t;return r`<div class="ltek-item group ${n?"open":""}">
            <button class="row" @click=${()=>this._toggle(`dev:${t}`)}>
              <ha-icon class="lead" icon="mdi:television"></ha-icon>
              <span class="ltek-item-text">
                <span class="ltek-name">${o}</span>
                <span class="ltek-subline">${t}</span>
              </span>
              <ha-icon class="ltek-act chev" icon=${n?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
            </button>
            <div class="directions">
              ${["on","off"].map(l=>{let c=i.filter(p=>p.direction===l);if(!c.length)return u;let d=re(c.map(p=>({seconds:p.seconds,ok:p.result==="ok"})));return r`<div class="direction">
                  <span class="dir-label">${this._t(`rep.dir_${l}`)}</span>
                  ${this._stats(d,"rep.count_times")}
                  ${this._spark(c.map(p=>({seconds:p.seconds,ok:p.result==="ok",warn:p.slow})),d.typical)}
                </div>`})}
            </div>
            ${n?this._renderEvents(i):u}
          </div>`})}
      </div>`):r`<p class="ltek-hint">${this._t("rep.no_devices")}</p>`}_renderEvents(s){let e={on:re(s.filter(t=>t.direction==="on").map(t=>({seconds:t.seconds,ok:t.result==="ok"}))).typical,off:re(s.filter(t=>t.direction==="off").map(t=>({seconds:t.seconds,ok:t.result==="ok"}))).typical};return r`<table class="events">
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
        ${[...s].reverse().map(t=>{let i=t.result==="ok"?it(t.seconds,e[t.direction]):"";return r`<tr>
            <td>${this._when(t.at)}</td>
            <td>${this._t(`rep.dir_${t.direction}`)}</td>
            <td>
              <b>${P(t.seconds)}</b>${i?r` <span class="dev ${i.startsWith("+")?"slow":"fast"}">${i}</span>`:u}
            </td>
            <td>
              <span class="ltek-badge ${t.result==="ok"?t.slow?"warn":"ok":"err"}"
                >${t.result==="ok"?t.slow?this._t("rep.slow"):this._t("rep.result_ok"):t.result}</span
              >${t.value?r` <span class="muted">${t.value}</span>`:u}
            </td>
            <td class="muted">${[t.room_name,t.activity_name].filter(Boolean).join(" \xB7 ")}</td>
          </tr>`})}
      </tbody>
    </table>`}};le.properties={hass:{attribute:!1},_history:{state:!0},_failed:{state:!0},_open:{state:!0},_expanded:{state:!0},_mode:{state:!0}},le.styles=[y,$,w,v`
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
    `];customElements.get("easy-av-control-reports")||customElements.define("easy-av-control-reports",le);var ei=["power_on","power_off","set_source","set_volume","set_sound_mode","set_brightness","set_color_temp","set_position","set_tilt","call_action","delay","wait_available"],V=["volume","channels","transport","navigation"],st={number:{min:0,max:3600,step:1,mode:"box",unit_of_measurement:"s"}},nt={number:{min:0,max:100,step:1,mode:"slider"}};function ce(a,s,e,t="source_list"){if(!e)return[];let i=a.states[e]?.attributes[t];return Array.isArray(i)&&i.length?i.map(String):s[e]??[]}function ot(a,s,e){return ce(a,s,e,"source_list")}var rt=["source","sound_mode"],ti=["number","input_number","select","input_select","switch","input_boolean"],at={source:"source_list",sound_mode:"sound_mode_list"};function lt(a,s,e,t,i={}){let n=s.devices?.[e]?.entity_id;if(!n)return[];let o=[];if(n.startsWith("media_player."))for(let l of rt){let c=at[l];ce(a,t[c]??{},n,c).length&&o.push({device:e,setting:l})}for(let l of i[n]??[])o.push({device:e,entity:l});return o}function Ci(a,s,e,t,i={}){let n=s.devices?.[e]?.settings;return Array.isArray(n)?n.map(o=>({...o,device:e})):lt(a,s,e,t,i)}function ii(a,s,e,t,i={}){return(e.devices??[]).flatMap(n=>Ci(a,s,n,t,i))}function de(a){return typeof a=="object"&&a!==null&&"source"in a}function si(a,s,e,t,i={},n={}){let l={name:"device",required:!0,selector:{select:{options:Object.entries(s.devices??{}).map(([p,h])=>({value:p,label:h.name?`${h.name} (${p})`:p})),mode:"dropdown"}}},c=e.device?s.devices?.[e.device]?.entity_id:void 0;return[...{power_on:[l],power_off:[l],set_source:[l,{name:"source",required:!0,selector:{select:{options:ot(a,i,c),custom_value:!0,mode:"dropdown"}}}],set_volume:[l,{name:"volume_level",required:!0,selector:{number:{min:0,max:1,step:.01,mode:"slider"}}}],set_sound_mode:[l,{name:"sound_mode",required:!0,selector:{select:{options:ce(a,n,c,"sound_mode_list"),custom_value:!0,mode:"dropdown"}}}],set_brightness:[l,{name:"brightness_pct",selector:nt},{name:"color_temp_kelvin",selector:{color_temp:{unit:"kelvin",min:2e3,max:6500}}},{name:"transition",selector:st}],set_color_temp:[l,{name:"color_temp_kelvin",required:!0,selector:{color_temp:{unit:"kelvin",min:2e3,max:6500}}}],set_position:[l,{name:"position",required:!0,selector:nt}],set_tilt:[l,{name:"tilt_position",required:!0,selector:nt}],call_action:[{name:"action",required:!0,selector:{text:{}}},{name:"target",selector:{target:{}}},{name:"data",selector:{object:{}}}],delay:[],wait_picture:[l,{name:"timeout",selector:{number:{min:5,max:300,step:5,mode:"slider",unit_of_measurement:"s"}}}],wait_available:[{...l,required:!1},{name:"entity_id",selector:{entity:{}}},{name:"timeout",selector:st},{name:"reload_integration",selector:{boolean:{}}},{name:"on_timeout",selector:{select:{options:[{value:"abort",label:t("on_timeout_abort")},{value:"continue",label:t("on_timeout_continue")}],mode:"dropdown"}}}]}[e.type]??[],{name:"delay_after",selector:st}]}function S(a,s=[]){let e={};for(let[t,i]of Object.entries(a))if(s.includes(t))e[t]=i;else{if(i==null||i==="")continue;if(Array.isArray(i)&&i.length===0)continue;if(typeof i=="object"&&!Array.isArray(i)&&Object.keys(i).length===0)continue;e[t]=i}return e}function ze(a){let s=V.filter(e=>a[e]===null);return Array.isArray(a.settings)&&s.push("settings"),S(a,s)}function H(a){return a.normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/ß/g,"ss").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")}function D(a,s){let e=new Set(s),t=a||"item";if(!e.has(t))return t;let i=2;for(;e.has(`${t}_${i}`);)i+=1;return`${t}_${i}`}function ct(a,s){let e=[];for(let[t,i]of Object.entries(a.activities??{}))((i.devices??[]).includes(s)||(i.steps??[]).some(o=>o.device===s)||V.some(o=>i.remote?.[o]===s)||(i.remote?.buttons??[]).some(o=>typeof o=="object"&&o?.device===s))&&e.push(i.name??t);return e}function dt(a,s,e){let t={};for(let[o,l]of Object.entries(a.devices??{}))t[o===s?e:o]=l;let i=o=>o===s?e:o,n={};for(let[o,l]of Object.entries(a.activities??{})){let c=l.remote?{...l.remote}:void 0;if(c){for(let d of V)d in c&&(c[d]=i(c[d]));Array.isArray(c.buttons)&&(c.buttons=c.buttons.map(d=>typeof d=="object"&&d?{...d,device:i(d.device)}:d))}n[o]=S({...l,devices:l.devices?.map(d=>i(d)),steps:l.steps?.map(d=>d.device===s?{...d,device:e}:d),remote:c})}return{...a,devices:t,activities:n}}function je(a){return Object.entries(a?.activities??{}).sort(([s,e],[t,i])=>(e.order??1e3)-(i.order??1e3)||(e.name??s).localeCompare(i.name??t,void 0,{sensitivity:"base"}))}function pt(a){return a.split("_").filter(Boolean).map(s=>s[0].toUpperCase()+s.slice(1)).join(" ")}function ni(a,s,e){let t=new Map;for(let i of e){let n=i.entity||s.devices?.[String(i.device)]?.entity_id,o=n&&a.entities?.[n]?.platform||"";t.set(o,[...t.get(o)??[],i])}return[...t.entries()]}var ut=new Set(["boot","reload","ready","status","picture","check","turn_on","wait","already_on","step","turn_off"]),F=new Set(["device","checks","steps"]);function pe(a){let s;return a.map(e=>{if(F.has(e.kind)){s=e;return}return(!ut.has(e.kind)||e.reason==="unused")&&(s=void 0),s})}function Mi(a,s){if(!s)return-1;let e=pe(a),t=s.device??void 0,i=o=>(a[o].device??e[o]?.device)===t,n=o=>a.findIndex((l,c)=>!l.background&&o(l,c));switch(s.kind){case"power_on":return n(o=>o.kind==="outlets_on");case"power_off":return n(o=>o.kind==="outlets_off");case"boot":case"reload":case"ready":case"turn_on":case"status":return n((o,l)=>o.kind===s.kind&&i(l));case"warm_up":return n((o,l)=>o.kind==="wait"&&o.reason==="delay_after_on"&&i(l));case"turn_off":return n((o,l)=>o.kind==="turn_off"&&i(l));case"checks":return n(o=>o.kind==="checks");case"step":return n(o=>o.kind!=="wait"&&o.step===s.step);case"wait":return n(o=>o.kind==="wait"&&o.step===s.step);case"hooks":return n(o=>o.kind==="hook_wait");default:return-1}}function oi(a,s,e){if(s.state==="error"){let l=pe(a);return a.map((c,d)=>c.background||e<0?"todo":d<e?F.has(c.kind)&&l[e]===c?"failed":"done":d===e?"failed":"todo")}let t=s.state==="active"||s.state==="idle",i=s.state==="starting"||s.state==="stopping",n=i?Math.max(e,Mi(a,s.current)):-1,o=pe(a);return a.map((l,c)=>l.background?t&&s.state==="idle"?"done":"todo":t?"done":!i||n<0?c===0?"active":"todo":c<n?F.has(l.kind)&&o[n]===l?"active":"done":c===n?"active":"todo")}function ri(a){switch(a){case"on":return"on";case"starting":case"stopping":return"busy";case"off":return"off";case"error":return"error";case"unavailable":return"unavailable";default:return"unknown"}}var Ii={waits:["wait","boot","ready","status","hook_wait"],reloads:["reload"],outlets:["outlets_on","outlets_off","outlet_keep"],hooks:["hook","hook_wait"]},ai=["entities","waits","notes","reloads","outlets","hooks"];function ht(a,s){return s.some(e=>Ii[e]?.includes(a.kind))}var Li=400,Ni={state:"mdi:flag-outline",outlets_on:"mdi:power-socket-eu",outlets_off:"mdi:power-socket-eu",outlet_keep:"mdi:power-socket-eu",turn_on:"mdi:power",turn_off:"mdi:power-off",hook:"mdi:script-text-outline",hook_wait:"mdi:script-text-outline",boot:"mdi:timer-sand",wait:"mdi:timer-sand",reload:"mdi:reload",ready:"mdi:lan-connect",status:"mdi:state-machine",picture:"mdi:image-check-outline",check:"mdi:image-check-outline",already_on:"mdi:check",step:"mdi:tune-variant"},li={device:"section_device",boot:"section_power",reload:"section_ready",ready:"section_ready",status:"section_state",turn_on:"section_device",turn_off:"section_device",wait:"section_delays"},ci={checks:"section_checks",check:"section_checks",steps:"steps",step:"steps",picture:"section_checks",hook:"section_advanced",hook_wait:"section_advanced",already_on:"section_activity_devices"},ue=class extends g{constructor(){super();this._reached=-1;this._watched="";this._request=0;this._mode="start",this.details=!0,this._states={},this._detailKinds=["entities","waits"],this._showDetails=!0}connectedCallback(){super.connectedCallback(),this.hass?.callWS({type:"easy_av_control/ui/get"}).then(e=>this._detailKinds=e.flow_details).catch(()=>{})}get _detailsOn(){return this.live?this.details:this._showDetails}_hides(e){return!this._detailsOn&&this._detailKinds.includes(e)}async _setDetailKinds(e){this._detailKinds=e;try{let t=await this.hass.callWS({type:"easy_av_control/ui/flow_details",details:e});this._detailKinds=t.flow_details}catch{}}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._timer),window.clearTimeout(this._statesTimer)}willUpdate(e){if(e.has("activityId")&&e.get("activityId")!==void 0&&(this._from=void 0),this._from!==void 0&&!this.room?.activities?.[this._from]&&(this._from=void 0),this.live){let t=this.live.state==="stopping"?"stop":"start",i=e.get("live");t!==this._mode&&(this._mode=t),(!i||i.state!==this.live.state||i.activity!==this.live.activity)&&((this.live.state==="starting"||this.live.state==="stopping")&&(this._reached=-1),e.set("_mode",void 0))}if(["room","roomId","activityId","_mode","_from","from"].some(t=>e.has(t))){window.clearTimeout(this._timer);let i=!(this._flow===void 0&&this._failed===void 0)&&e.has("room")?Li:0;this._timer=window.setTimeout(()=>this._load(),i)}}async _load(){let e=++this._request,t=this.live?this.from:this._from;try{let i=await this.hass.callWS({...this.live?{type:"easy_av_control/control/flow",...this.entryId?{entry_id:this.entryId}:{}}:{type:"easy_av_control/config/flow",config:this.room},room:this.roomId,activity:this.activityId,mode:this._mode,...this._mode==="start"&&t?{from:t}:{}});this._loadStates(),e===this._request&&(this._flow=i,this._failed=void 0)}catch(i){e===this._request&&(this._failed=i.message??String(i))}}async _loadStates(){try{this._states=await this.hass.callWS({type:"easy_av_control/control/states",room:this.roomId,...this.entryId?{entry_id:this.entryId}:{}})}catch{}}updated(e){if(!e.has("hass")||!this.hass||!this._flow||this._flow.error)return;let t=new Set;for(let n of this._flow.rows){typeof n.entity_id=="string"&&t.add(n.entity_id);for(let o of n.entities??[])t.add(o)}for(let n of Object.values(this._room.devices??{}))n.entity_id&&t.add(n.entity_id);let i=[...t].map(n=>`${n}=${this.hass.states[n]?.state}`).join("|");i!==this._watched&&(this._watched=i,window.clearTimeout(this._statesTimer),this._statesTimer=window.setTimeout(()=>this._loadStates(),300))}get _room(){return this.room??(this._flow&&!this._flow.error?this._flow.room:void 0)??{}}_t(e,t){return x(this.hass?.language,e,t)}_entity(e){let t=String(e??"");return this.hass.states[t]?.attributes.friendly_name||t}_device(e){let t=String(e??""),i=this._room.devices?.[t];return i?.name||(i?.entity_id?this._entity(i.entity_id):"")||t}_activity(e){let t=String(e??"");return this._room.activities?.[t]?.name||t}_list(e){return(e??[]).map(t=>this._entity(t)).join(", ")}_seconds(e){return`${Math.round(Number(e)*10)/10} s`}_time([e,t]){return e===t?this._seconds(e):`${this._seconds(e).slice(0,-2)}\u2013${this._seconds(t)}`}_text(e){let t=this._device(e.device);switch(e.kind){case"state":return this._t(`flow.state_${e.state}`);case"outlets_on":return this._t("flow.outlets_on",{outlets:this._list(e.entities)});case"outlets_off":return this._t(e.after_status?"flow.outlets_off_status":e.background?"flow.outlets_off_later":"flow.outlets_off",{outlets:this._list(e.entities)});case"outlet_keep":return this._t("flow.outlet_keep",{outlet:this._entity(e.entity_id)});case"hook":return this._t(`flow.${e.hook}`);case"hook_wait":return this._t(`flow.${e.hook}_wait`);case"already_on":return this._t("flow.already_on",{activity:this._activity(e.previous)});case"boot":return this._t("flow.boot",{seconds:this._seconds(e.seconds)});case"reload":return this._t("flow.reload",{entity:this._entity(e.entity_id)});case"ready":{let i=Array.isArray(e.states)?e.states:e.states?[e.states]:[],n={entity:this._entity(e.entity_id),states:i.join(" / "),timeout:this._seconds(e.timeout)};return[e.step?`${e.step}. `:"",this._t(i.length?"flow.ready_state":"flow.ready",n)," ",this._t(`flow.on_timeout_${e.on_timeout}`)].join("")}case"turn_on":case"turn_off":{let i=e.step?`${e.step}. `:"";return e.skip?i+this._t("flow.cannot_switch",{device:t}):i+this._t(e.reason==="unused"?"flow.turn_off_unused":`flow.${e.kind}`,{device:t})}case"status":return this._t(e.target==="off"?"flow.status_off":"flow.status_on",{device:t,entity:this._entity(e.entity_id),timeout:this._seconds(e.timeout)});case"check":{let i=this._device(e.device);if(e.missing)return this._t("flow.check_missing",{device:i});let n=e.unless??[];return this._t(n.length?"flow.check_unless":"flow.check",{device:i,entity:this._entity(e.entity_id),states:(n.length?n:e.states??[]).join(" / "),timeout:this._seconds(e.timeout)})+(e.on_failure==="stop"?` ${this._t("flow.on_timeout_abort")}`:` ${this._t("flow.check_warn")}`)}case"picture":return this._t("flow.picture",{step:String(e.step??""),entity:this._entity(e.entity_id),states:(e.states??[]).join(" / "),timeout:this._seconds(e.timeout)});case"wait":return this._t(e.reason==="delay_after_on"?"flow.wait_on":"flow.wait",{seconds:this._seconds(e.seconds)});case"step":return`${e.step}. ${this._t(`step.${e.step_type}`)}${this._stepValue(e)}`;default:return e.kind}}_stepValue(e){let t=e.data??{},i=[];for(let[n,o]of Object.entries(t))n==="volume_level"?i.push(`${Math.round(Number(o)*100)} %`):n==="brightness_pct"||n==="position"||n==="tilt_position"?i.push(`${o} %`):n==="color_temp_kelvin"?i.push(`${o} K`):n==="transition"?i.push(this._seconds(o)):e.step_type!=="call_action"&&i.push(String(o));return i.length?`: ${i.join(", ")}`:""}_notes(e){let t=[];if(typeof e.condition=="string"&&t.push(this._t(`flow.if.${e.condition}`)),e.kind==="ready"&&e.reload&&t.push(this._t("flow.reload_if_needed")),e.kind==="status"&&Number(e.typical)>0&&t.push(this._t("flow.typical",{seconds:this._seconds(e.typical)})),e.kind==="status"&&Number(e.debounce)>0&&t.push(this._t("flow.debounce",{seconds:this._seconds(e.debounce)})),e.kind==="turn_off"&&Number(e.cooldown)>0&&t.push(this._t("flow.cooldown",{seconds:this._seconds(e.cooldown)})),Array.isArray(e.already_on)&&e.already_on.length&&t.push(this._t("flow.outlets_already_on",{outlets:this._list(e.already_on)})),Array.isArray(e.unless_rooms)&&e.unless_rooms.length&&t.push(this._t("flow.unless_rooms",{rooms:e.unless_rooms.join(", ")})),e.kind==="hook"){let i=e.actions??[];t.push(this._t("flow.parallel")),i.length&&t.push(i.join(", "))}return t}_call(e){if(typeof e.action!="string"||e.kind==="hook")return;let t=e.entities?this._list(e.entities):e.entity_id?this._entity(e.entity_id):"";return t?`${e.action} \u2192 ${t}`:e.action}_target(e,t){let i=e.device??(t?.kind==="device"?t.device:void 0);if(t?.kind==="device"&&i&&li[e.kind])return{device:i,panel:li[e.kind]};if(t?.kind==="steps"&&ut.has(e.kind))return{panel:"steps"};if(ci[e.kind])return{panel:ci[e.kind]};if(e.kind==="device"&&i)return{device:i,panel:"section_device"}}_renderRow(e,t,i,n,o){let l=this.live?void 0:this._target(e,n),c=this._hides("notes")?[]:this._notes(e),d=this._hides("entities")?void 0:this._call(e),p=F.has(e.kind),h=[t?"nested":"",p?"header":"",e.kind,o?`s-${o}`:""],m=e.kind==="device"&&e.device?this._states[e.device]:void 0;return r`<li class=${h.join(" ")}>
      <span class="time"
        >${o==="done"?r`<ha-icon class="mark" icon="mdi:check"></ha-icon>`:o==="active"?r`<ha-icon class="mark spin" icon="mdi:loading"></ha-icon>`:o==="failed"?r`<ha-icon class="mark" icon="mdi:close"></ha-icon>`:i?this._time(e.at):""}</span
      >
      ${p?r`<span class="index">${e.kind==="device"?e.index:e.kind==="checks"?"\u2713":"\u2261"}</span>`:r`<ha-icon class="icon" .icon=${Ni[e.kind]??"mdi:circle-small"}></ha-icon>`}
      <span class="body">
        <span class="what"
          >${e.kind==="device"?r`${this._device(e.device)}${m?.value?r`<span class="state-chip r-${ri(m.group)}">${m.value}</span>`:u}`:e.kind==="steps"?this._t("flow.steps"):e.kind==="checks"?this._t("flow.checks"):this._text(e)}</span
        >
        ${e.kind==="device"&&!this._hides("entities")?r`<span class="call">${e.entity_id}</span>`:u}
        ${d?r`<span class="call">${d}</span>`:u}
        ${c.length?r`<span class="notes">${c.map(_=>r`<span class="note">${_}</span>`)}</span>`:u}
      </span>
      ${l?r`<button
            class="ltek-act edit"
            title=${this._t("flow.edit")}
            aria-label=${this._t("flow.edit")}
            @click=${()=>this.dispatchEvent(new CustomEvent("flow-edit",{detail:l,bubbles:!0,composed:!0}))}
          >
            <ha-icon icon="mdi:pencil-outline"></ha-icon>
          </button>`:this.live?u:r`<span></span>`}
    </li>`}_renderRows(e){let t=pe(e),i;if(this.live&&["starting","stopping","active","error"].includes(this.live.state)){i=oi(e,this.live,this._reached);let c=i.lastIndexOf("active");c>this._reached&&!F.has(e[c].kind)&&(this._reached=c)}let n=e.filter(c=>c.background),o="",l=e.flatMap((c,d)=>{if(c.background||!this._detailsOn&&ht(c,this._detailKinds))return[];let p=this._time(c.at),h=p!==o||c.kind==="state";return o=p,[this._renderRow(c,t[d]!==void 0,h,t[d],i?.[d])]});return r`<ol class="flow">${l}</ol>
      ${n.length?r`<h4>${this._t("flow.background")}</h4>
            <ol class="flow">${n.filter(c=>this._detailsOn||!ht(c,this._detailKinds)).map(c=>this._renderRow(c,!1,!0,void 0,i?.[e.indexOf(c)]))}</ol>`:u}`}render(){if(this.live)return r`${this._renderBody()}`;let e=Object.entries(this.room.activities??{}).filter(([t])=>t!==this.activityId);return r`
      <details class="ltek-sub options">
        <summary><ha-icon icon="mdi:tune-variant"></ha-icon>${this._t("flow.options")}</summary>
        <div class="ltek-sub-body">
          <p class="ltek-hint">${this._t("flow.options_hint")}</p>
          ${ai.map(t=>r`<label class="check"
              ><input
                type="checkbox"
                .checked=${this._detailKinds.includes(t)}
                @change=${i=>{let n=i.target.checked;this._setDetailKinds(n?[...this._detailKinds,t]:this._detailKinds.filter(o=>o!==t))}}
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
            </select>`:u}
      </div>
      ${this._renderBody()}
    `}_renderBody(){if(this._failed)return r`<p class="error">${this._t("flow.failed",{error:this._failed})}</p>`;let e=this._flow;if(!e)return r`<p class="hint">${this._t("loading")}</p>`;if(e.error){let l=e.error.path.join(".");return r`<p class="error">
        ${this._t("flow.invalid",{error:l?`${l}: ${e.error.message}`:e.error.message})}
      </p>`}let[t,i]=e.done,n=e.rows.filter(l=>l.background).map(l=>l.at[0]),o=this._mode==="start"?this._t(t===i?"flow.summary_start_fixed":"flow.summary_start",{min:this._seconds(t),max:this._seconds(i)}):this._t(n.length?"flow.summary_stop_cut":"flow.summary_stop",{seconds:this._seconds(Math.max(0,...n))});return r`${this._renderRows(e.rows)}
      ${this._detailsOn?r`<p class="summary">${o}</p>`:u}`}};ue.properties={hass:{attribute:!1},room:{attribute:!1},roomId:{attribute:!1},activityId:{attribute:!1},_mode:{state:!0},_from:{state:!0},_flow:{state:!0},_failed:{state:!0},entryId:{attribute:!1},live:{attribute:!1},from:{attribute:!1},details:{type:Boolean},_states:{state:!0},_detailKinds:{state:!0},_showDetails:{state:!0}},ue.styles=[y,$,w,v`
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
      grid-template-columns: 64px 24px minmax(0, 1fr) 22px;
      gap: 4px 10px;
      align-items: start;
      padding: 6px 0;
      border-top: 1px solid var(--divider-color);
    }
    ol.flow li:first-child {
      border-top: none;
    }
    ol.flow li.nested {
      grid-template-columns: 64px 40px minmax(0, 1fr) 22px;
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
        grid-template-columns: 58px 22px minmax(0, 1fr) 22px;
        gap: 4px 6px;
      }
      ol.flow li.nested {
        grid-template-columns: 58px 32px minmax(0, 1fr) 22px;
      }
      .time {
        font-size: var(--ltek-fs-small);
      }
    }
  `];customElements.get("easy-av-control-flow")||customElements.define("easy-av-control-flow",ue);var he=class extends g{constructor(){super(...arguments);this._loading=!1}setConfig(e){this._config=e}updated(){this.hass&&this._rooms===void 0&&!this._loading&&(this._loading=!0,this.hass.callWS({type:"easy_av_control/control/rooms"}).then(e=>this._rooms=e).catch(()=>this._rooms=[]).finally(()=>this._loading=!1))}_schema(){let e=(this._rooms??[]).map(i=>i.room);return[{name:"room",required:!0,selector:{select:{mode:"dropdown",options:(this._rooms??[]).map(i=>({value:e.filter(n=>n===i.room).length>1?`${i.entry_id}/${i.room}`:i.room,label:i.name}))}}},{name:"name",selector:{text:{}}},{name:"show_flow",selector:{boolean:{}}},{name:"flow_details",selector:{boolean:{}}}]}render(){if(!this.hass||!this._config)return u;let e={show_flow:!0,...this._config,room:this._config.entry_id?`${this._config.entry_id}/${this._config.room}`:this._config.room},t=(this._rooms??[]).some(n=>n.room===this._config.room);this._rooms&&!t&&this._config.room&&(e.room=this._config.room);let i=n=>K(this.hass?.language,n);return r`<details class="ltek-sec" open>
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
            .computeLabel=${n=>i(`editor.${n.name}`)}
            @value-changed=${this._valueChanged}
          ></ltek-form>
        </div>
      </details>
      <div class="ltek-links">
        <a class="ltek-star" href=${B} target="_blank" rel="noopener">${i("editor.star")}</a>
        <a class="ltek-issue" href="${B}/issues" target="_blank" rel="noopener">${i("editor.report")}</a>
      </div>`}_valueChanged(e){e.stopPropagation();let t={...e.detail.value},i={...this._config,...t},n=String(t.room??"");if(n.includes("/")){let[o,l]=n.split("/",2);i.entry_id=o,i.room=l}else delete i.entry_id;i.name||delete i.name,i.show_flow!==!1&&delete i.show_flow,i.flow_details||delete i.flow_details,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}};he.properties={hass:{attribute:!1},_config:{state:!0},_rooms:{state:!0}},he.styles=[y,w,v`
    :host {
      display: block;
    }
  `];customElements.get("easy-av-control-card-editor")||customElements.define("easy-av-control-card-editor",he);function q(a,s){let e=`command.${a}`,t=s(e);if(t!==e)return t;let i=a.replace(/[_-]+/g," ").trim();return i.charAt(0).toUpperCase()+i.slice(1)}var Vi=new Set(["off","standby","unavailable","unknown"]);function di(a,s){if(!a||Vi.has(a.state))return;let e=a.attributes,t=k=>typeof e[k]=="string"&&e[k]?e[k]:void 0,i=k=>typeof e[k]=="number"?e[k]:void 0,n=t("app_name"),o=t("media_title")??n;if(!o)return;let l=i("media_season")??t("media_season"),c=i("media_episode")??t("media_episode"),d=t("media_series_title"),p=d&&(l!==void 0||c!==void 0)?`${d} \xB7 ${[l!==void 0?`S${l}`:"",c!==void 0?`E${c}`:""].filter(Boolean).join(" ")}`:d??t("media_artist")??t("media_album_name"),h=a.state==="playing",m=i("media_duration"),_=m!==void 0&&m>0?m:void 0,f=i("media_position"),b=t("media_position_updated_at");return f!==void 0&&h&&b&&!Number.isNaN(Date.parse(b))&&(f+=(s-Date.parse(b))/1e3),f!==void 0&&_!==void 0&&(f=Math.max(0,Math.min(_,f))),{title:o,app:o===n?void 0:n,subtitle:p,picture:t("entity_picture"),playing:h,duration:_,position:_!==void 0?f:void 0}}function me(a){let s=Math.floor(a),e=Math.floor(s/3600),t=Math.floor(s%3600/60),i=String(s%60).padStart(2,"0");return e?`${e}:${String(t).padStart(2,"0")}:${i}`:`${t}:${i}`}function pi(a,s){let e=Math.max(0,Math.ceil((Date.parse(a)-s)/1e3));return e>=60?me(e):`${e} s`}function ui(a,s,e){let t=a.names.length?a.names.join(", "):a.outlet;return{text:e("cooling.text",{names:t}),time:e(a.status?"cooling.time_status":"cooling.time",{time:pi(a.until,s)})}}function hi(a,s,e){if(!a)return;let t=a.name??"",i={step:String(a.step??""),steps:String(a.steps??"")},n;switch(a.kind){case"step":{let c=e(`step.${a.step_type}`);n=e("doing.step",{...i,what:t?`${c} (${t})`:c});break}case"wait":n=e("doing.wait",i);break;case"hooks":n=e(`doing.hooks_${a.hook}`);break;case"status":n=a.value?e(`doing.status_${a.target==="off"?"off":"on"}_value`,{name:t,value:a.value}):e(`doing.status_${a.target==="off"?"off":"on"}`,{name:t});break;default:n=e(`doing.${a.kind}`,{name:t})}if(!a.until)return{text:n};let o=pi(a.until,s),l=a.kind==="ready"||a.kind==="status";return{text:n,time:e(l?"doing.at_most":"doing.left",{time:o})}}var Ce=class{constructor(){this.originX=0;this.originY=0;this.startX=0;this.startY=0;this.startTime=0;this.moved=!1}start(s,e,t){this.originX=this.startX=s,this.originY=this.startY=e,this.startTime=t,this.moved=!1}move(s,e){Math.hypot(s-this.startX,e-this.startY)>10&&(this.moved=!0);let t=[];for(;;){let i=s-this.originX,n=e-this.originY;if(Math.max(Math.abs(i),Math.abs(n))<40)return t;Math.abs(i)>=Math.abs(n)?(t.push(i>0?"right":"left"),this.originX+=Math.sign(i)*40,this.originY=e):(t.push(n>0?"down":"up"),this.originY+=Math.sign(n)*40,this.originX=s)}}end(s,e,t){return Math.hypot(s-this.startX,e-this.startY)>10&&(this.moved=!0),!this.moved&&t-this.startTime<=500}};function mt(a,s){return`easy-av-control-touchpad:${a}:${s}`}function mi(a,s){return a==="on"?!0:a==="off"?!1:s}var Me="easy_av_control",_t={volume_up:"mdi:volume-plus",volume_down:"mdi:volume-minus",mute:"mdi:volume-off",channel_up:"mdi:chevron-up",channel_down:"mdi:chevron-down",play_pause:"mdi:play-pause",play:"mdi:play",pause:"mdi:pause",stop:"mdi:stop",next:"mdi:skip-next",previous:"mdi:skip-previous",up:"mdi:chevron-up",down:"mdi:chevron-down",left:"mdi:chevron-left",right:"mdi:chevron-right",back:"mdi:arrow-u-left-top",menu:"mdi:menu",home:"mdi:home-outline",info:"mdi:information-outline",guide:"mdi:television-guide",exit:"mdi:close",select_source:"mdi:apps"},Hi=["back","home","menu","info","guide","exit"],Gi=["previous","play_pause","play","pause","stop","next"],Wi=new Set(["volume_up","volume_down","up","down","left","right"]),Bi=400,Ki=200;function _i(a){return`easy-av-control-settings:${a}`}var Ui=3e4,Fi={idle:"mdi:power",starting:"mdi:timer-sand",active:"mdi:power",stopping:"mdi:timer-sand",error:"mdi:alert-circle-outline"},G=class extends g{constructor(){super();this._padChoices=new Map;this._settingsOpen=new Map;this._settingDrafts=new Map;this._view=null,this._loaded=!1}static getConfigElement(){return document.createElement("easy-av-control-card-editor")}static async getStubConfig(e){try{return{room:(await e.callWS({type:`${Me}/control/rooms`}))[0]?.room??""}}catch{return{room:""}}}setConfig(e){if(!e||typeof e.room!="string")throw new Error("room is required");let t=e.room!==this._config?.room||e.entry_id!==this._config?.entry_id;this._config=e,t&&this._resubscribe()}getCardSize(){return this._view?.remote?8:3}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._pressEnd(!1),window.clearInterval(this._tickTimer),this._tickTimer=void 0,this._unsubscribeNow()}willUpdate(e){e.has("demoView")&&this.demoView&&(this._config={type:"custom:easy-av-control-card",room:this.demoView.room},this._view=this.demoView,this._loaded=!0)}updated(e){let t=this._nowPlaying(),i=t?.playing===!0&&t.duration!==void 0||!!this._view?.current?.until||!!this._view?.cooling?.length;i&&this._tickTimer===void 0?this._tickTimer=window.setInterval(()=>this.requestUpdate(),1e3):!i&&this._tickTimer!==void 0&&(window.clearInterval(this._tickTimer),this._tickTimer=void 0),e.has("hass")&&!this._unsubscribe&&this._retryTimer===void 0&&this._subscribe()}_subscribe(){if(this.demoView||!this.hass||!this._config?.room||this._unsubscribe||!this.isConnected)return;let e={type:`${Me}/control/subscribe`,room:this._config.room};this._config.entry_id&&(e.entry_id=this._config.entry_id);let t=this.hass.connection.subscribeMessage(i=>{this._unsubscribe===t&&(i?.state==="starting"&&this._view?.state!=="starting"&&(this._from=this._lastActive&&this._lastActive!==i.activity?this._lastActive:void 0),i?.state==="active"&&i.activity&&(this._lastActive=i.activity),i?.state==="idle"&&(this._lastActive=void 0),this._view=i,this._loaded=!0,this._subscribeError=void 0)},e);this._unsubscribe=t,t.catch(i=>{this._unsubscribe===t&&(this._subscribeError=i?.message??String(i),this._loaded=!0,this._unsubscribe=void 0,this._retryTimer=window.setTimeout(()=>{this._retryTimer=void 0,this._subscribe()},Ui))})}_unsubscribeNow(){window.clearTimeout(this._retryTimer),this._retryTimer=void 0;let e=this._unsubscribe;this._unsubscribe=void 0,e?.then(t=>t()).catch(()=>{})}_resubscribe(){this._unsubscribeNow(),this._view=null,this._loaded=!1,this._subscribe()}_t(e,t){return K(this.hass?.language,e,t)}_call(e,t={}){if(!(!this.hass||!this._view)){if(this._haptic(),this.demoView){this.dispatchEvent(new CustomEvent("preview-call",{detail:{service:e,data:t}}));return}this.hass.callService(Me,e,{room:this._view.room,...t}).catch(i=>this._toast(i?.message??String(i)))}}_send(e,t={}){this._call("send_command",{command:e,...t})}_haptic(){this.dispatchEvent(new CustomEvent("haptic",{detail:"light",bubbles:!0,composed:!0}))}_toast(e){this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:e},bubbles:!0,composed:!0}))}_pressStart(e,t,i={}){if(e.button!==0)return;this._pressEnd(!1);let n={command:t,extra:i,sent:!1};this._press=n,Wi.has(t)&&(this._repeatTimer=window.setTimeout(()=>{n.sent=!0,this._send(t,i),this._repeatTimer=window.setInterval(()=>this._send(t,i),Ki)},Bi))}_pressEnd(e){let t=this._press;this._press=void 0,this._stopRepeat(),e&&t&&!t.sent&&this._send(t.command,t.extra)}_stopRepeat(){this._repeatTimer!==void 0&&(window.clearTimeout(this._repeatTimer),window.clearInterval(this._repeatTimer),this._repeatTimer=void 0)}_keySend(e,t,i={}){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._send(t,i))}render(){if(!this._config?.room)return r`<ha-card><div class="message">${this._t("no_room")}</div></ha-card>`;if(!this._loaded)return r`<ha-card><div class="message">${this._t("loading")}</div></ha-card>`;let e=this._view;return e?r`<ha-card>
      ${this._renderHeader(e)} ${this._renderStatus(e)} ${this._renderFlow(e)} ${this._renderNowPlaying()}
      ${this._renderActivities(e)}
      ${e.remote?this._renderRemote(e):u}
    </ha-card>`:r`<ha-card>
        <div class="message warning">
          ${this._subscribeError??this._t("not_found",{room:this._config.room})}
        </div>
      </ha-card>`}_renderHeader(e){let t=e.activities.find(o=>o.id===e.activity),i=e.state!=="idle",n=t?`${t.name} \xB7 ${this._t(`state.${e.state}`)}`:this._t(`state.${e.state}`);return r`<div class="header">
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
        <ha-icon .icon=${Fi[e.state]??"mdi:power"}></ha-icon>
      </button>
    </div>`}_renderFlow(e){if(this._config?.show_flow===!1||this.demoView)return u;let t=e.activity??e.default_activity??e.activities[0]?.id;if(!t)return u;let i=e.state==="starting"||e.state==="stopping",n=this._flowOpen??i,o=this._flowDetails??this._config?.flow_details===!0;return r`<div class="flow-bar">
        <button class="chip ${n?"on":""}" @click=${()=>this._flowOpen=!n}>
          <ha-icon icon="mdi:sitemap-outline"></ha-icon>${this._t("flow.show")}
        </button>
        ${n?r`<button class="chip ${o?"on":""}" @click=${()=>this._flowDetails=!o}>
              <ha-icon icon=${o?"mdi:eye-outline":"mdi:eye-off-outline"}></ha-icon>${this._t("flow.details")}
            </button>`:u}
      </div>
      ${n?r`<easy-av-control-flow
            class="live-flow"
            .hass=${this.hass}
            .roomId=${e.room}
            .entryId=${e.entry_id}
            .activityId=${t}
            .from=${e.state==="starting"?this._from:void 0}
            .live=${{state:e.state,current:e.current,activity:e.activity}}
            .details=${o}
          ></easy-av-control-flow>`:u}`}_renderStatus(e){let t=e.state==="starting"||e.state==="stopping",[i,n]=e.progress,o=n>0?Math.round(i/n*100):0,l=t?hi(e.current,Date.now(),(c,d)=>this._t(c,d)):void 0;return r`
      ${t?r`<div
            class="progress"
            role="progressbar"
            aria-label=${this._t(`state.${e.state}`)}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow=${o}
          >
            <div style="width: ${e.state==="starting"?o:100}%"></div>
          </div>`:u}
      ${l?r`<div class="doing" aria-live="polite">
            <span class="doing-text">${l.text}</span>
            ${l.time?r`<span class="doing-time">${l.time}</span>`:u}
          </div>`:u}
      ${(e.cooling??[]).map(c=>{let{text:d,time:p}=ui(c,Date.now(),(h,m)=>this._t(h,m));return r`<div class="doing cooling">
          <span class="doing-text">${d}</span><span class="doing-time">${p}</span>
        </div>`})}
      ${e.state==="error"&&e.error?r`<div class="message error">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>${e.error}
          </div>`:u}
      ${e.warnings.length&&e.state!=="idle"?r`<details class="warnings">
            <summary>${this._t("warnings")} (${e.warnings.length})</summary>
            <ul>
              ${e.warnings.map(c=>r`<li>${c}</li>`)}
            </ul>
          </details>`:u}
    `}_nowPlaying(){let e=this._view?.remote?.media;return di(e?this.hass?.states[e]:void 0,Date.now())}_renderNowPlaying(){let e=this._nowPlaying();if(!e)return u;let t=[e.app,e.playing?void 0:this._t("now.paused")].filter(Boolean).join(" \xB7 ");return r`<div class="now">
      ${e.picture?r`<img
            class="art"
            src=${e.picture}
            alt=""
            @error=${i=>i.target.style.display="none"}
          />`:u}
      <div class="meta">
        ${t?r`<div class="now-top">${t}</div>`:u}
        <div class="now-title">${e.title}</div>
        ${e.subtitle?r`<div class="now-sub">${e.subtitle}</div>`:u}
        ${e.duration!==void 0&&e.position!==void 0?r`<div class="now-progress" role="progressbar" aria-valuemin="0"
                aria-valuemax=${Math.round(e.duration)} aria-valuenow=${Math.round(e.position)}>
                <div style="width: ${e.position/e.duration*100}%"></div>
              </div>
              <div class="now-time">
                <span>${me(e.position)}</span><span>${me(e.duration)}</span>
              </div>`:u}
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
    </div>`}_renderRemote(e){let{groups:t,buttons:i}=e.remote,n=t.navigation,o=n?Hi.filter(d=>n.commands.includes(d)):[],l=n?mi(this._padChoice(e),n.touchpad===!0):!1,c=t.transport?Gi.filter(d=>t.transport.commands.includes(d)):[];return c.includes("play_pause")&&(c=c.filter(d=>d!=="play"&&d!=="pause")),r`<div class="remote">
      ${t.volume||n||t.channels?r`<div class="main ${n?"":"no-nav"}">
            ${t.volume?this._renderVolumeRocker(t.volume):n?r`<div></div>`:u}
            ${n?l?this._renderTouchpad(n):this._renderDpad(n):u}
            ${t.channels?this._renderChannelRocker(t.channels):n?r`<div></div>`:u}
          </div>`:u}
      ${t.volume?.commands.includes("volume_set")?this._renderSlider(t.volume):u}
      ${n?r`<div class="row">
            ${o.map(d=>this._key(d))}${this._renderPadSwitch(e,l)}
          </div>`:u}
      ${c.length?r`<div class="row">${c.map(d=>this._key(d))}</div>`:u}
      ${i.length?r`<div class="buttons">${i.map(d=>this._customButton(d))}</div>`:u}
      ${e.remote.settings?.length?this._renderSettings(e,e.remote.settings):u}
    </div>`}_settingsShown(e){let t=_i(e);if(this._settingsOpen.has(t))return this._settingsOpen.get(t);try{return window.localStorage.getItem(t)==="open"}catch{return!1}}_toggleSettings(e){let t=_i(e),i=!this._settingsShown(e);this._settingsOpen.set(t,i);try{window.localStorage.setItem(t,i?"open":"closed")}catch{}this.requestUpdate()}_renderSettings(e,t){let i=this._settingsShown(e.room);return r`<div class="settings">
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
            ${t.map((n,o)=>r`${o===0||t[o-1].device!==n.device?r`<span class="setting-device">${this._settingDevice(n)}</span>`:u}${this._renderSetting(n)}`)}
          </div>`:u}
    </div>`}_renderSetting(e){if(e.setting==="entity")return this._renderEntitySetting(e);let t=this.hass?.states[e.entity_id],i=e.attribute?t?.attributes[e.attribute]:void 0,n=i==null?void 0:String(i);return this._settingRow(e,this._t(`setting.${e.setting}`),this._settingSelect(e,this._t(`setting.${e.setting}`),n,e.options))}_settingDevice(e){return e.name||this.hass?.states[e.device_entity_id]?.attributes.friendly_name||e.device}_settingRow(e,t,i){return r`<div class="setting">
      <span class="setting-name">${t}</span>
      ${i}
    </div>`}_settingSelect(e,t,i,n,o=!1){let l=i!==void 0&&!n.includes(i)?[i,...n]:n;return r`<select
      aria-label=${`${t}, ${this._settingDevice(e)}`}
      .value=${E(i??"")}
      ?disabled=${o||!l.length}
      @change=${c=>{let d=c.target.value;d&&d!==i&&this._send(e.command,{device:e.device,value:d})}}
    >
      ${i===void 0?r`<option value="" disabled>–</option>`:u}
      ${l.map(c=>r`<option value=${c} ?selected=${c===i}>${c}</option>`)}
    </select>`}_renderEntitySetting(e){let t=this.hass?.states[e.entity_id],i=e.label||t?.attributes.friendly_name||e.entity_id,n=!t||t.state==="unavailable"||t.state==="unknown",o=e.entity_id.split(".")[0];if(o==="number"||o==="input_number"){let c=Number(t?.attributes.min??0),d=Number(t?.attributes.max??100),p=Number(t?.attributes.step??1),m=this._settingDrafts.get(e.entity_id)??(n?void 0:Number(t.state)),_=m===void 0||Number.isNaN(m)?"\u2013":`${c<0&&m>0?"+":""}${m}`;return this._settingRow(e,i,r`<span class="setting-range">
          <input
            type="range"
            aria-label=${`${i}, ${this._settingDevice(e)}`}
            min=${c}
            max=${d}
            step=${p}
            .value=${E(String(m??c))}
            ?disabled=${n}
            @input=${f=>{this._settingDrafts.set(e.entity_id,Number(f.target.value)),this.requestUpdate()}}
            @change=${f=>{this._settingDrafts.delete(e.entity_id),this._send(e.command,{device:e.device,value:Number(f.target.value)})}}
          />
          <span class="value">${_}</span>
        </span>`)}if(o==="select"||o==="input_select"){let c=Array.isArray(t?.attributes.options)?t.attributes.options.map(String):[];return this._settingRow(e,i,this._settingSelect(e,i,n?void 0:t.state,e.options.length?e.options:c,n))}let l=t?.state==="on";return this._settingRow(e,i,r`<button
        class="key toggle ${l?"active":""}"
        aria-label=${`${i}, ${this._settingDevice(e)}`}
        aria-pressed=${l?"true":"false"}
        ?disabled=${n}
        @click=${()=>this._send(e.command,{device:e.device,value:l?"off":"on"})}
      >
        ${this._t(l?"toggle.on":"toggle.off")}
      </button>`)}_key(e,t="key",i,n){let o=q(e,l=>this._t(l));return r`<button
      class=${t}
      title=${o}
      aria-label=${o}
      aria-pressed=${n===void 0?u:String(n)}
      @pointerdown=${l=>this._pressStart(l,e)}
      @pointerup=${()=>this._pressEnd(!0)}
      @pointerleave=${()=>this._pressEnd(!1)}
      @pointercancel=${()=>this._pressEnd(!1)}
      @keydown=${l=>this._keySend(l,e)}
      @contextmenu=${l=>l.preventDefault()}
    >
      ${i??r`<ha-icon .icon=${_t[e]??"mdi:circle-small"}></ha-icon>`}
    </button>`}_renderVolumeRocker(e){let t=this._volumeState(e).muted;return r`<div class="rocker">
      ${e.commands.includes("volume_up")?this._key("volume_up"):r`<span></span>`}
      ${e.commands.includes("mute")?this._key("mute",`key label ${t?"active":""}`,r`<ha-icon .icon=${t?"mdi:volume-off":"mdi:volume-high"}></ha-icon>`,t):r`<span class="label">${this._t("rocker.volume")}</span>`}
      ${e.commands.includes("volume_down")?this._key("volume_down"):r`<span></span>`}
    </div>`}_renderChannelRocker(e){return r`<div class="rocker">
      ${e.commands.includes("channel_up")?this._key("channel_up"):r`<span></span>`}
      <span class="label">${this._t("rocker.channels")}</span>
      ${e.commands.includes("channel_down")?this._key("channel_down"):r`<span></span>`}
    </div>`}_renderDpad(e){let t=n=>e.commands.includes(n),i=(n,o)=>t(n)?this._key(n,`key ${o}`,n==="ok"?"OK":void 0):r`<span></span>`;return r`<div class="dpad">
      <span></span>${i("up","up")}<span></span>
      ${i("left","left")}${i("ok","ok")}${i("right","right")}
      <span></span>${i("down","down")}<span></span>
    </div>`}_padChoice(e){if(!e.activity)return null;let t=mt(e.room,e.activity);if(this._padChoices.has(t))return this._padChoices.get(t);try{return window.localStorage.getItem(t)}catch{return null}}_renderPadSwitch(e,t){let i=this._t(t?"pad.show_arrows":"pad.show_touchpad");return r`<button
      class="key pad-switch"
      title=${i}
      aria-label=${i}
      @click=${()=>{if(!e.activity)return;let n=mt(e.room,e.activity),o=t?"off":"on";this._padChoices.set(n,o);try{window.localStorage.setItem(n,o)}catch{}this.requestUpdate()}}
    >
      <ha-icon .icon=${t?"mdi:arrow-all":"mdi:gesture-tap"}></ha-icon>
    </button>`}_renderTouchpad(e){let t=n=>e.commands.includes(n),i={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right",Enter:"ok"," ":"ok"};return r`<div
      class="touchpad"
      role="group"
      tabindex="0"
      aria-label=${this._t("touchpad")}
      title=${this._t("touchpad")}
      @pointerdown=${n=>{n.button===0&&(n.currentTarget.setPointerCapture(n.pointerId),this._swipe=new Ce,this._swipe.start(n.clientX,n.clientY,n.timeStamp))}}
      @pointermove=${n=>{for(let o of this._swipe?.move(n.clientX,n.clientY)??[])t(o)&&this._send(o)}}
      @pointerup=${n=>{let o=this._swipe?.end(n.clientX,n.clientY,n.timeStamp);this._swipe=void 0,o&&t("ok")&&this._send("ok")}}
      @pointercancel=${()=>this._swipe=void 0}
      @keydown=${n=>{let o=i[n.key];o&&t(o)&&(n.preventDefault(),this._send(o))}}
      @contextmenu=${n=>n.preventDefault()}
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
        @input=${n=>{this._volumeDraft=Number(n.target.value)}}
        @change=${n=>{let o=Number(n.target.value);this._volumeDraft=void 0,this._send("volume_set",{value:o/100})}}
      />
      <span class="value">${t!==void 0||this._volumeDraft!==void 0?i:"\u2013"}</span>
    </div>`}_customButton(e){let t=e.name??q(e.command,n=>this._t(n)),i={};return e.device&&(i.device=e.device),e.value!==null&&e.value!==void 0&&(i.value=e.value),r`<button
      class="custom"
      title=${t}
      @pointerdown=${n=>this._pressStart(n,e.command,i)}
      @pointerup=${()=>this._pressEnd(!0)}
      @pointerleave=${()=>this._pressEnd(!1)}
      @pointercancel=${()=>this._pressEnd(!1)}
      @keydown=${n=>this._keySend(n,e.command,i)}
    >
      ${e.icon||_t[e.command]?r`<ha-icon .icon=${e.icon??_t[e.command]}></ha-icon>`:u}
      <span>${t}</span>
    </button>`}};G.properties={hass:{attribute:!1},demoView:{attribute:!1},_flowOpen:{state:!0},_flowDetails:{state:!0},_config:{state:!0},_view:{state:!0},_loaded:{state:!0},_subscribeError:{state:!0},_volumeDraft:{state:!0}},G.styles=v`
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
  `;customElements.get("easy-av-control-card")||customElements.define("easy-av-control-card",G);function qi(a,s){let e=a.entities?.[s]?.device_id,i=(e?a.devices?.[e]:void 0)?.identifiers?.find(([n])=>n===Me);return i?i[1]:null}var Ie=window;Ie.customCards=Ie.customCards??[];Ie.customCards.some(a=>a.type==="easy-av-control-card")||Ie.customCards.push({type:"easy-av-control-card",name:"Easy AV Control Remote",description:"Remote control for an Easy AV Control room",preview:!0,documentationURL:"https://github.com/Ltek/easy-av-control#the-card",getEntitySuggestion:(a,s)=>{let e=qi(a,s);return e?{config:{type:"custom:easy-av-control-card",room:e}}:null}});var ft=class extends G{};customElements.get("easy-av-control-preview-card")||customElements.define("easy-av-control-preview-card",ft);var Zi=400,_e=class extends g{constructor(){super(...arguments);this._request=0}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._timer)}willUpdate(e){if(e.has("activityId")&&(this._pressed=void 0),["room","roomId","activityId"].some(t=>e.has(t))){window.clearTimeout(this._timer);let t=this._preview===void 0&&this._failed===void 0;this._timer=window.setTimeout(()=>this._load(),t?0:Zi)}}async _load(){let e=++this._request;try{let t=await this.hass.callWS({type:"easy_av_control/config/remote",room:this.roomId,config:this.room,activity:this.activityId});e===this._request&&(this._preview=t,this._failed=void 0)}catch(t){e===this._request&&(this._failed=t.message??String(t))}}_t(e,t){return x(this.hass?.language,e,t)}_entity(e){let t=String(e??"");return this.hass.states[t]?.attributes.friendly_name||t}_device(e){let t=String(e??""),i=this.room.devices?.[t];return i?.name||(i?.entity_id?this._entity(i.entity_id):"")||t}_button(e,t){let[i,n]=t.split("|"),o=e.remote?.buttons.find(c=>c.command===i&&(c.device??"")===n);if(o?.name)return o.name;let l=e.remote?.settings?.find(c=>c.command===i&&c.device===n);return l?.setting==="entity"?l.label||this._entity(l.entity_id):q(i,c=>this._t(c))}_onCall(e){let{service:t,data:i}=e.detail;t==="send_command"&&(this._pressed=`${i.command}|${i.device??""}`)}_describe(e){let t=e.device?this._device(e.device):this._t("preview.this_activity");switch(e.via){case"media_player":case"entity":return{to:t,how:`${e.action} \u2192 ${this._entity(e.entity_id)}`};case"remote":return{to:t,how:`remote.send_command "${e.key}" \u2192 ${this._entity(e.entity_id)}`};case"device_commands":return{to:t,how:this._t("preview.device_commands",{actions:(e.actions??[]).join(", ")})};case"activity_commands":return{to:t,how:this._t("preview.activity_commands",{actions:(e.actions??[]).join(", ")})};default:return{to:t,how:e.device?this._t("preview.unknown_on_device",{device:t}):this._t("preview.unknown")}}}_renderPressed(e,t){let i=this._pressed?t[this._pressed]:void 0;if(!this._pressed||!i)return r`<p class="pressed hint">${this._t("preview.tap")}</p>`;let{to:n,how:o}=this._describe(i);return r`<p class="pressed ${i.via?"":"bad"}">
      <span class="what">${this._button(e,this._pressed)} → ${n}</span>
      <span class="how">${o}</span>
      ${i.ready?r`<span class="note">${this._t("preview.ready")}</span>`:u}
    </p>`}_renderRoutes(e){return r`<h4>${this._t("preview.groups")}</h4>
      <ul class="routes">
        ${e.map(t=>{let i=t.mode==="hidden"?this._t("preview.hidden"):t.device?`${this._device(t.device)} (${this._t(`preview.mode_${t.mode}`)})`:this._t("preview.no_device"),n=t.commands.length?t.commands.map(o=>q(o,l=>this._t(l))).join(", "):t.mode==="hidden"?"":t.device?this._t("preview.no_keys",{device:this._device(t.device)}):"";return r`<li class=${t.commands.length?"":"off"}>
            <span class="group">${this._t(`field.${t.group}`)}</span>
            <span class="where">${i}</span>
            ${n?r`<span class="keys">${n}</span>`:u}
          </li>`})}
      </ul>`}render(){if(this._failed)return r`<p class="error">${this._t("flow.failed",{error:this._failed})}</p>`;let e=this._preview;if(!e)return r`<p class="hint">${this._t("loading")}</p>`;if(e.error){let l=e.error.path.join(".");return r`<p class="error">
        ${this._t("flow.invalid",{error:l?`${l}: ${e.error.message}`:e.error.message})}
      </p>`}let{view:t,targets:i,routes:n}=e,o=Object.entries(i).filter(([,l])=>!l.via);return r`<div class="layout">
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
            </div>`:u}
        ${this._renderRoutes(n)}
      </div>
    </div>`}};_e.properties={hass:{attribute:!1},room:{attribute:!1},roomId:{attribute:!1},activityId:{attribute:!1},_preview:{state:!0},_failed:{state:!0},_pressed:{state:!0}},_e.styles=[y,$,w,v`
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
  `];customElements.get("easy-av-control-remote-preview")||customElements.define("easy-av-control-remote-preview",_e);function Yi(a){let s=(a??"").split(",").map(e=>e.trim()).filter(Boolean);return s.length>1?s:s[0]}var ge=(a,s=1,e=0)=>({number:{min:e,max:a,step:s,mode:"slider",unit_of_measurement:"s"}}),gt=ge(600),Qi={section_device:"mdi:television",section_state:"mdi:state-machine",section_power:"mdi:power-socket-eu",section_delays:"mdi:timer-sand",section_ready:"mdi:lan-connect",card_settings:"mdi:tune-vertical",section_general:"mdi:information-outline",section_activity_devices:"mdi:format-list-numbered",section_checks:"mdi:check-decagram-outline",steps:"mdi:playlist-play",remote:"mdi:remote",quick_select:"mdi:gesture-tap-button",section_flow:"mdi:sitemap-outline",section_remote_preview:"mdi:cellphone-screenshot"},Ji=ge(120),fe=class extends g{constructor(){super();this._relatedKey="";this._detectAsked=new Set;this._powerMemo=new Map;this._openPanel=new Map;this._label=e=>this._t(`field.${e.name}`);this._helper=e=>{let t=`helper.${e.name}`,i=this._t(t);return i===t?void 0:i};this._tab="devices",this._view={kind:"list"},this.sources={},this.soundModes={},this._related={},this._detect={},this.profiles=[],this._powerOn=new Set}_loadRelated(){let e=[...new Set(Object.values(this.room?.devices??{}).map(i=>i.entity_id).filter(Boolean))].sort(),t=e.join(",");!this.hass||t===this._relatedKey||(this._relatedKey=t,this.hass.callWS({type:"easy_av_control/config/related",entity_ids:e}).then(i=>{t===this._relatedKey&&(this._related=i)}).catch(()=>{}))}willUpdate(e){(e.has("room")||e.has("hass"))&&this._loadRelated(),e.has("roomId")&&e.get("roomId")!==void 0&&(this._view={kind:"list"},this._notice=void 0);let t=this.jump;e.has("jump")&&t&&!t.activity?(this._view={kind:"list"},this._notice=void 0):e.has("jump")&&t?.activity&&this.room?.activities?.[t.activity]&&(this._view={kind:"activity",id:t.activity},this._notice=void 0,t.flow&&this._openPanel.set(this._pageKey(),`activity:${this._t("section_flow")}`),window.scrollTo({top:0})),(e.has("_view")||e.has("roomId")||e.has("jump"))&&this.dispatchEvent(new CustomEvent("view-changed",{detail:{view:this._view}}))}_t(e,t){return x(this.hass?.language,e,t)}_emit(e){this.dispatchEvent(new CustomEvent("room-changed",{detail:{room:e}}))}_show(e){this._view=e,this._notice=void 0,window.scrollTo({top:0})}render(){this._firstPanel=void 0;let e=this._view;if(e.kind==="device"&&this.room.devices?.[e.id])return this._renderDevice(e.id,this.room.devices[e.id]);if(e.kind==="activity"&&this.room.activities?.[e.id])return this._renderActivity(e.id,this.room.activities[e.id]);let t=[{value:"__last",label:this._t("default_last")},...Object.entries(this.room.activities??{}).map(([i,n])=>({value:i,label:n.name??i}))];return r`
      <ltek-form
        .hass=${this.hass}
        .data=${{name:this.room.name??"",area_id:this.room.area_id??void 0,default_activity:this.room.default_activity??"__last"}}
        .schema=${[{name:"name",required:!0,selector:{text:{}}},{name:"area_id",selector:{area:{}}},{name:"default_activity",selector:{select:{options:t,mode:"dropdown"}}}]}
        .computeLabel=${i=>this._t(`room_${i.name==="area_id"?"area":i.name}`)}
        .computeHelper=${this._helper}
        @value-changed=${i=>{let n=i.detail.value;this._emit(S({...this.room,name:n.name,area_id:n.area_id,default_activity:n.default_activity==="__last"?void 0:n.default_activity}))}}
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
      ${this._notice?r`<div class="notice">${this._notice}</div>`:u}
      ${this._tab==="devices"?this._renderDeviceList():this._tab==="activities"?this._renderActivityList():this._renderYaml()}
      <button class="ltek-btn danger delete-room" @click=${()=>this.dispatchEvent(new CustomEvent("delete-room"))}>
        <ha-icon icon="mdi:trash-can-outline"></ha-icon>
        ${this._t("delete_room")}
      </button>
    `}_detailHeader(e,t,i){return r`<div class="detail-head">
        <button class="back" @click=${()=>this._show({kind:"list"})}>
          <ha-icon icon="mdi:arrow-left"></ha-icon>
          <span>${e}</span>
        </button>
        <button class="ltek-btn danger" @click=${i}>
          <ha-icon icon="mdi:trash-can-outline"></ha-icon> ${this._t("delete")}
        </button>
      </div>
      <h2>${t}</h2>
      ${this._notice?r`<div class="notice">${this._notice}</div>`:u}`}_panel(e,t,i,n,o,l=!0){let c=this._pageKey();l&&this._firstPanel===void 0&&(this._firstPanel=e);let p=(this._openPanel.get(c)??this._firstPanel)===e;return r`<details
      class="ltek-sec"
      .open=${E(p)}
      @toggle=${h=>{let m=h.target.open,_=this._openPanel.get(c)??this._firstPanel;m&&_!==e?(this._openPanel.set(c,e),this.requestUpdate()):!m&&_===e&&(this._openPanel.set(c,""),this.requestUpdate())}}
    >
      <summary><ha-icon icon=${t}></ha-icon>${i}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="ltek-body">${n?r`<p class="ltek-hint">${n}</p>`:u}${o}</div>
    </details>`}_pageKey(){let e=this._view;return e.kind==="list"?`list:${this.roomId}`:`${e.kind}:${this.roomId}:${e.id}`}_card(e,t,i,n){let o=Object.entries(Qi).find(([l])=>this._t(l)===e);return this._panel(`${this._view.kind}:${e}`,n??o?.[1]??"mdi:tune-variant",e,t,i)}_advanced(e,t){let i=this._t("section_advanced");return this._panel(`${this._view.kind}:${i}`,"mdi:cog-outline",i,e,t,!1)}_deviceTitle(e,t){let i=t.entity_id?this.hass.states[t.entity_id]:void 0;return t.name||i?.attributes.friendly_name||(t.entity_id?e:this._t("new_device"))}_renderDeviceList(){let e=Object.entries(this.room.devices??{});return r`
      <p class="ltek-hint">${this._t("devices_intro")}</p>
      <div class="ltek-list">
        <button class="ltek-add" @click=${this._addDevice}>+ ${this._t("add_device")}</button>
      ${e.length?r`
            ${e.map(([t,i])=>{let n=!i.entity_id||this._entityKnown(i.entity_id);return this._row(this._deviceTitle(t,i),i.entity_id||this._t("no_entity"),()=>this._show({kind:"device",id:t}),n?void 0:this._t("entity_missing"),this._deviceIcon(i))})}`:r`<p class="ltek-hint">${this._t("devices_empty")}</p>`}
      </div>
    `}_entityKnown(e){return e in this.hass.states||e in(this.hass.entities??{})}_row(e,t,i,n,o="mdi:play-circle-outline"){return r`<button class="ltek-item" @click=${i}>
      <ha-icon class="lead" icon=${o}></ha-icon>
      <span class="ltek-item-text">
        <span class="ltek-name">${e}</span>
        <span class="ltek-subline">${t}</span>
        ${n?r`<span class="ltek-warn ltek-subline">${n}</span>`:u}
      </span>
      <ha-icon class="ltek-act" icon="mdi:chevron-right"></ha-icon>
    </button>`}_deviceIcon(e){let i=(e.entity_id?this.hass.states[e.entity_id]:void 0)?.attributes.icon;if(i)return i;let n=e.entity_id?.split(".")[0];return n==="remote"?"mdi:remote":n==="switch"?"mdi:power-socket-eu":"mdi:television"}_deviceData(e){let t=e.ready??null;return{entity_id:e.entity_id,name:e.name,remote_entity:e.remote_entity??void 0,power_switch:e.power_switch??void 0,delay_after_power:e.delay_after_power,delay_after_on:e.delay_after_on,delay_after_off:e.delay_after_off,ready_enabled:t!==null,ready_entity:t?.entity_id,ready_state:Array.isArray(t?.state)?t?.state.join(", "):t?.state,ready_timeout:t?.timeout,ready_reload:t?.reload_integration,ready_on_timeout:t?.on_timeout,commands:e.commands}}_deviceForm(e,t,i,n=!1){return r`<ltek-form
      .hass=${this.hass}
      .disabled=${n}
      .data=${t}
      .schema=${i}
      .computeLabel=${this._label}
      .computeHelper=${this._helper}
      @value-changed=${o=>this._deviceChanged(e,{...t,...o.detail.value})}
    ></ltek-form>`}_remoteOf(e){let t=this.hass.entities??{},i=e?t[e]?.device_id:void 0;if(i)return Object.values(t).find(n=>n?.device_id===i&&n.entity_id.startsWith("remote."))?.entity_id}_renderDevice(e,t){let i=this._deviceData(t),n=t.ready??null,o=this._remoteOf(t.entity_id),l=n?.entity_id===o&&n?.reload_integration===!0&&t.remote_entity===o,c=ct(this.room,e);return r`
      ${this._detailHeader(this._t("tab_devices"),this._deviceTitle(e,t),()=>this._deleteDevice(e))}
      ${c.length?r`<p class="ltek-hint">${this._t("used_by",{where:c.join(", ")})}</p>`:u}

      ${this._card(this._t("section_device"),this._t("hint_device"),this._deviceForm(e,i,[{name:"entity_id",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"remote_entity",selector:{entity:{filter:{domain:"remote"}}}}]),"mdi:television")}
      ${this._card(this._t("section_state"),this._t("hint_state"),this._renderState(e,t),"mdi:state-machine")}
      ${this._card(this._t("section_power"),this._t("hint_power"),this._renderPower(e,t,i),"mdi:power-socket-eu")}
      ${this._card(this._t("section_delays"),this._t("hint_delays"),this._deviceForm(e,i,[{name:"delay_after_on",selector:gt},{name:"delay_after_off",selector:gt}]),"mdi:timer-sand")}
      ${this._card(this._t("section_ready"),this._t("hint_ready"),r`${o&&!l?r`<button class="ltek-btn preset" @click=${()=>this._applyReadyPreset(e,t,o)}>
                ${this._t("ready_preset",{entity:o})}
              </button>`:u}
          ${this._deviceForm(e,i,[{name:"ready_enabled",selector:{boolean:{}}},...n!==null?[{name:"ready_entity",selector:{entity:{}}},{name:"ready_state",selector:{text:{}}},{name:"ready_timeout",selector:gt},{name:"ready_reload",selector:{boolean:{}}},{name:"ready_on_timeout",selector:{select:{options:[{value:"abort",label:this._t("on_timeout_abort")},{value:"continue",label:this._t("on_timeout_continue")}],mode:"dropdown"}}}]:[]])}`)}
      ${this._advanced(this._t("hint_device_advanced"),r`<label class="id">
            ${this._t("device_id")}
            <input
              .value=${e}
              @change=${d=>this._renameDevice(e,d.target.value)}
            />
          </label>
          ${this._deviceForm(e,i,[{name:"commands",selector:{object:{}}}])}`)}
      ${this._cardDivider()}
      ${this._card(this._t("card_settings"),this._t("device_settings_hint"),this._renderDeviceSettings(e,t))}
    `}_renderPower(e,t,i){let n=!!t.power_switch||this._powerOn.has(e),o=l=>{let c=new Set(this._powerOn),d={...t};l?(Object.assign(d,this._powerMemo.get(e)??{}),d.power_switch||c.add(e)):(t.power_switch&&this._powerMemo.set(e,{power_switch:t.power_switch,delay_after_power:t.delay_after_power}),delete d.power_switch,delete d.delay_after_power,c.delete(e)),this._powerOn=c,this._emit({...this.room,devices:{...this.room.devices,[e]:S(d)}})};return r`<label class="check">
        <input type="checkbox" .checked=${E(n)} @change=${l=>o(l.target.checked)} />
        ${this._t("power_use")}
      </label>
      <div class=${n?"":"unused"}>
        ${this._deviceForm(e,n?i:{...i,...this._powerMemo.get(e)??{}},[{name:"power_switch",selector:{entity:{filter:{domain:["switch","input_boolean","light"]}}}},{name:"delay_after_power",selector:Ji}],!n)}
      </div>`}_detectFor(e){if(!e.entity_id||!this.hass)return;let t=Object.fromEntries(Pe.filter(n=>e[n]!==void 0).map(n=>[n,e[n]])),i=JSON.stringify([e.entity_id,t]);return this._detectAsked.has(i)||(this._detectAsked.add(i),this.hass.callWS({type:"easy_av_control/config/detect",entity_id:e.entity_id,device:t}).then(n=>this._detect={...this._detect,[i]:n}).catch(()=>this._detectAsked.delete(i))),this._detect[i]}_renderState(e,t){let i=this._detectFor(t);if(!t.entity_id)return r`<p class="ltek-hint">${this._t("no_entity")}</p>`;let n=Wt(t,i),o=t.entity_id?this.hass.entities?.[t.entity_id]?.platform:void 0,l=[{value:"__auto",label:this._t("profile.auto")},...this.profiles.filter(m=>!m.generic&&(m.integration===o||m.id===t.profile)).map(m=>({value:m.id,label:`${m.name} (${this._t(m.source==="user"?"profiles_yours":"profiles_builtin")})`}))],c=!!i?.state,d=(m,_)=>_.map(f=>({value:f,label:this._t(`${m}.${f}`)})),p=Qe.map(m=>({value:m,label:this._t(m==="stop"?"failure_off.stop":`failure.${m}`)})),h=[...l.length>1?[{name:"profile",selector:{select:{options:l,mode:"dropdown"}}}]:[],{name:"state_source",selector:{select:{mode:"dropdown",options:[{value:"auto",label:this._t("state_source.auto")},{value:"none",label:this._t("state_source.none")},...n.state_source==="custom"?[{value:"custom",label:"YAML"}]:[]]}}},...c?[{name:"wait_on",selector:{select:{mode:"dropdown",options:d("wait",Ye)}}},{name:"timeout_on",selector:ge(600,5,5)},{name:"on_failure_on",selector:{select:{mode:"dropdown",options:d("failure",Qe)}}},{name:"wait_off",selector:{select:{mode:"dropdown",options:d("wait",Ye)}}},{name:"timeout_off",selector:ge(900,5,5)},{name:"on_failure_off",selector:{select:{mode:"dropdown",options:p}}},{name:"debounce",selector:ge(30,.5)},...i?.found?.picture?[{name:"on_failure_picture",selector:{select:{mode:"dropdown",options:d("failure",["warn","stop"])}}}]:[]]:[]];return r`${this._renderDetected(e,t,i)}
      ${i&&!c?r`<p class="ltek-hint">${this._t("state_fixed_only")}</p>`:u}
      <ltek-form
        .hass=${this.hass}
        .data=${n}
        .schema=${h}
        .computeLabel=${m=>this._t(m.name==="state_source"?"state_source":`field.${m.name}`)}
        .computeHelper=${this._helper}
        @value-changed=${m=>{let _=Bt(t,{...n,...m.detail.value},i);this._emit({...this.room,devices:{...this.room.devices,[e]:_}})}}
      ></ltek-form>`}_renderDetected(e,t,i){if(!i)return r`<p class="ltek-hint">${this._t("loading")}</p>`;if(!i.profile)return r`<p class="ltek-hint">${this._t("detected_none")}</p>`;let{profile:n,found:o,state:l}=i,c=Kt(t,i),d=[];if(o?.indicator&&d.push(this._t("detected_found_indicator",{entity:this._entityName(o.indicator)})+(o.attribute?`, ${this._t("detected_found_attribute",{attribute:o.attribute})}`:"")),o?.remote_entity&&d.push(this._t("detected_found_remote",{entity:this._entityName(o.remote_entity)})),o?.power_switch&&d.push(this._t("detected_found_outlet",{entity:this._entityName(o.power_switch)})),o?.settings?.length&&d.push(this._t("detected_found_settings",{entities:o.settings.map(p=>this._entityName(p)).join(", ")})),i.siblings.length){d.push(this._t("detected_siblings",{integrations:i.siblings.map(h=>h.integration).join(", ")}));let p=Object.entries(i.roles).filter(([,h])=>h).map(([h,m])=>this._t("detected_role",{role:this._t(`role.${h}`),integration:m}));p.length&&d.push(p.join(" \xB7 "))}return r`<div class="ltek-item detected open">
      <ha-icon class="lead" icon="mdi:auto-fix"></ha-icon>
      <span class="ltek-item-text">
        <span class="ltek-name">${this._t("detected",{name:n.name})}</span>
        ${d.map(p=>r`<span class="ltek-subline">${p}</span>`)}
        ${l?r`<span class="ltek-subline">${this._t("detected_now",{value:l.value??l.group})}</span>`:u}
        ${this._timingLines(i).map(p=>r`<span class="ltek-subline">${p}</span>`)}
      </span>
      <span class="ltek-badge ${n.source==="user"?"lib":"accent"}">
        ${this._t(n.source==="user"?"profiles_yours":"profiles_builtin")}
      </span>
      ${n.tested?u:r`<span class="ltek-badge warn" title=${this._t("profile_untested")}>!</span>`}
      ${Object.keys(c).length?r`<button
            class="ltek-btn primary"
            @click=${()=>this._emit({...this.room,devices:{...this.room.devices,[e]:{...t,...c}}})}
          >
            ${this._t("detected_use")}
          </button>`:r`<span class="ltek-badge ok">${this._t("detected_applied")}</span>`}
      ${Object.keys(Xe(t,i)).length?r`<button
            class="ltek-btn"
            title=${this._t("timing_use_hint")}
            @click=${()=>this._emit({...this.room,devices:{...this.room.devices,[e]:{...t,...Xe(t,i)}}})}
          >
            ${this._t("timing_use")}
          </button>`:u}
    </div>`}_timingLines(e){let t=e.timings;if(!t)return[];let i=[];for(let n of["on","off"]){let o=t[n];!o?.samples||o.typical===null||i.push(this._t(`timing_${n}`,{typical:Je(o.typical),count:String(o.samples),slowest:Je(o.slowest??o.typical)}))}return i}_entityName(e){return this.hass.states[e]?.attributes.friendly_name??e}_applyReadyPreset(e,t,i){let n={entity_id:i,state:"on",timeout:60,reload_integration:!0,on_timeout:"continue"};this._emit({...this.room,devices:{...this.room.devices,[e]:{...t,ready:n,remote_entity:i}}})}_unsaved(e,t){return!(t in(this.saved?.[e]??{}))}_deviceChanged(e,t){let i=S({entity_id:t.entity_id,name:t.name,remote_entity:t.remote_entity,power_switch:t.power_switch,ready:t.ready_enabled?S({entity_id:t.ready_entity,state:Yi(t.ready_state),timeout:t.ready_timeout,reload_integration:t.ready_reload,on_timeout:t.ready_on_timeout}):void 0,delay_after_power:t.power_switch?t.delay_after_power:void 0,delay_after_on:t.delay_after_on,delay_after_off:t.delay_after_off,commands:t.commands}),n=this.room.devices?.[e]??{};for(let d of Pe)n[d]!==void 0&&(i[d]=n[d]);let o=this.room.devices?.[e]?.settings;o!==void 0&&(i.settings=o),t.ready_enabled&&!i.ready&&(i.ready={});let l={...this.room,devices:{...this.room.devices,[e]:i}},c=i.entity_id?.split(".")[1];if(c&&this._unsaved("devices",e)&&i.entity_id!==this.room.devices?.[e]?.entity_id){let d=D(H(c),Object.keys(l.devices??{}).filter(p=>p!==e));if(d!==e){this._emit(dt(l,e,d)),this._view={kind:"device",id:d};return}}this._emit(l)}_addDevice(){let e=D("device",Object.keys(this.room.devices??{}));this._emit({...this.room,devices:{...this.room.devices,[e]:{entity_id:""}}}),this._show({kind:"device",id:e})}_renameDevice(e,t){let i=H(t);if(!i||i===e){this.requestUpdate();return}let n=D(i,Object.keys(this.room.devices??{}).filter(o=>o!==e));this._emit(dt(this.room,e,n)),this._view={kind:"device",id:n}}_deleteDevice(e){let t=ct(this.room,e);if(t.length){this._notice=this._t("device_in_use",{id:e,where:t.join(", ")});return}if(!window.confirm(`${this._t("delete")}: ${this._deviceTitle(e,this.room.devices[e])}?`))return;let i={...this.room.devices};delete i[e],this._emit({...this.room,devices:i}),this._show({kind:"list"})}_renderActivityList(){let e=je(this.room),t=i=>(i.devices??[]).map(n=>this.room.devices?.[n]?.name??n).join(" \u2192 ");return r`
      <p class="ltek-hint">${this._t("activities_intro")}</p>
      <div class="ltek-list">
        ${Object.keys(this.room.devices??{}).length?r`<button class="ltek-add" @click=${this._addActivity}>+ ${this._t("add_activity")}</button>`:r`<p class="ltek-hint">${this._t("needs_devices")}</p>`}
        ${e.length?e.map(([i,n])=>this._row(n.name??i,t(n)||this._t("no_devices"),()=>this._show({kind:"activity",id:i}),void 0,n.icon??"mdi:play-circle-outline")):r`<p class="ltek-hint">${this._t("activities_empty")}</p>`}
      </div>
    `}_setActivity(e,t){this._emit({...this.room,activities:{...this.room.activities,[e]:S(t)}})}_renderActivity(e,t){let i=Object.keys(this.room.devices??{}),n=t.devices??[],o=[{value:"__auto",label:this._t("route_auto")},{value:"__none",label:this._t("route_none")},...n.map(p=>({value:p,label:this.room.devices?.[p]?.name??p}))],l=t.remote??{},c={};for(let p of V)c[p]=p in l?l[p]===null?"__none":l[p]:"__auto";c.touchpad=l.touchpad===!0?"on":l.touchpad===!1?"off":"auto";let d=(l.buttons??[]).filter(p=>!de(p));return r`
      ${this._detailHeader(this._t("tab_activities"),t.name??e,()=>this._deleteActivity(e,t))}

      ${this._card(this._t("section_general"),this._t("hint_general"),r`<ltek-form
          .hass=${this.hass}
          .data=${{name:t.name,icon:t.icon,order:t.order}}
          .schema=${[{name:"name",required:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"order",selector:{number:{min:0,max:999,mode:"box"}}}]}
          .computeLabel=${this._label}
          @value-changed=${p=>{let h=p.detail.value;this._activityGeneralChanged(e,t,h)}}
        ></ltek-form>`)}

      ${this._card(this._t("section_activity_devices"),this._t("hint_activity_devices"),this._renderActivityDevices(e,t,i,n))}

      ${this._card(this._t("section_checks"),this._t("hint_checks"),this._renderChecks(e,t))}

      ${this._card(this._t("steps"),this._t("hint_steps"),r`${(t.steps??[]).map((p,h)=>this._renderStep(e,t,p,h))}
          ${this._picker(this._t("add_step"),ei.map(p=>({value:p,label:this._t(`step.${p}`)})),p=>this._setActivity(e,{...t,steps:[...t.steps??[],{type:p}]}))}`)}

      ${this._card(this._t("section_flow"),this._t("hint_flow"),r`<easy-av-control-flow
          .hass=${this.hass}
          .room=${this.room}
          .roomId=${this.roomId}
          .activityId=${e}
          @flow-edit=${p=>this._flowEdit(p.detail)}
        ></easy-av-control-flow>`)}

      ${this._advanced(this._t("hint_activity_advanced"),r`<p class="ltek-hint">${this._t("activity_id_hint",{id:e})}</p>
          <ltek-form
            .hass=${this.hass}
            .data=${{buttons:d,activity_commands:t.commands}}
            .schema=${[{name:"activity_commands",selector:{object:{}}}]}
            .computeLabel=${this._label}
            @value-changed=${p=>this._extrasChanged(e,t,p.detail.value)}
          ></ltek-form>
          <h4>${this._t("hooks")}</h4>
          <ltek-form
            .hass=${this.hass}
            .data=${{on_start:t.on_start??[],on_stop:t.on_stop??[]}}
            .schema=${[{name:"on_start",selector:{action:{}}},{name:"on_stop",selector:{action:{}}}]}
            .computeLabel=${this._label}
            @value-changed=${p=>{let h=p.detail.value;this._setActivity(e,{...t,on_start:h.on_start,on_stop:h.on_stop})}}
          ></ltek-form>`)}

      ${this._cardDivider()}
      ${this._card(this._t("remote"),this._t("hint_remote"),r`<ltek-form
          .hass=${this.hass}
          .data=${c}
          .schema=${[...V.map(p=>({name:p,selector:{select:{options:o,mode:"dropdown"}}})),{name:"touchpad",selector:{select:{options:["auto","on","off"].map(p=>({value:p,label:this._t(`touchpad_${p}`)})),mode:"dropdown"}}}]}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${p=>this._routesChanged(e,t,p.detail.value)}
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
          .data=${{buttons:d,activity_commands:t.commands}}
          .schema=${[{name:"buttons",selector:{object:{}}}]}
          .computeLabel=${this._label}
          @value-changed=${p=>this._extrasChanged(e,t,p.detail.value)}
        ></ltek-form>`,!1)}
    `}_flowEdit(e){let t=this._t(e.panel);e.device&&this.room.devices?.[e.device]?(this._view={kind:"device",id:e.device},this._openPanel.set(this._pageKey(),`device:${t}`)):(this._openPanel.set(this._pageKey(),`activity:${t}`),this.requestUpdate()),this._notice=void 0,window.scrollTo({top:0})}_cardDivider(){return r`<div class="card-divider"><ha-icon icon="mdi:remote"></ha-icon>${this._t("card_divider")}</div>`}_renderActivityDevices(e,t,i,n){let o=c=>this._setActivity(e,{...t,devices:c}),l=i.filter(c=>!n.includes(c));return r`<div class="ltek-list">
      ${l.length?r`<select
            class="ltek-add add-select"
            aria-label=${this._t("add_device_to_activity")}
            @change=${c=>{let d=c.target;d.value&&o([...n,d.value]),d.value=""}}
          >
            <option value="" selected>+ ${this._t("add_device_short")}</option>
            ${l.map(c=>r`<option value=${c}>${this.room.devices?.[c]?.name??c}</option>`)}
          </select>`:u}
      ${n.map((c,d)=>{let p=this.room.devices?.[c],h=p?.entity_id?this.hass.entities?.[p.entity_id]?.platform:void 0;return r`<div class="ltek-item ordered-row">
          <span class="num">${d+1}</span>
          <ha-icon class="lead" icon=${p?this._deviceIcon(p):"mdi:help-circle-outline"}></ha-icon>
          <button class="ltek-item-text link" @click=${()=>this._show({kind:"device",id:c})}>
            <span class="ltek-name">${p?.name??c}</span>
            <span class="ltek-subline">${p?.entity_id??""}</span>
          </button>
          ${h?r`<span class="ltek-badge">${pt(h)}</span>`:u}
          ${this._moveButtons(n,d,o)}
        </div>`})}
    </div>`}_activityGeneralChanged(e,t,i){let n=S({...t,name:i.name,icon:i.icon,order:i.order}),o=i.name?.trim();if(!o||o===t.name||!this._unsaved("activities",e)){this._setActivity(e,n);return}let l=D(H(o),Object.keys(this.room.activities??{}).filter(p=>p!==e));if(l===e){this._setActivity(e,n);return}let c={};for(let[p,h]of Object.entries(this.room.activities??{}))c[p===e?l:p]=p===e?n:h;let d={...this.room,activities:c};d.default_activity===e&&(d.default_activity=l),this._emit(d),this._view={kind:"activity",id:l}}_renderStep(e,t,i,n){let o=t.steps??[],l=c=>this._setActivity(e,{...t,steps:c});return r`<div class="step">
      <div class="step-head">
        <span class="title">${n+1}. ${this._t(`step.${i.type}`)}</span>
        ${this._moveButtons(o,n,l)}
      </div>
      <ltek-form
        .hass=${this.hass}
        .data=${i}
        .schema=${si(this.hass,this.room,i,c=>this._t(c),this.sources,this.soundModes)}
        .computeLabel=${this._label}
        @value-changed=${c=>{let d=[...o];d[n]=S({...c.detail.value,type:i.type}),l(d)}}
      ></ltek-form>
    </div>`}_checkNote(e){let t=this.room.devices?.[e];if(!t?.entity_id)return u;let i=this._detectFor(t);if(!i)return u;let n=i.found?.picture,o=i.profile?.data?.picture,l=o?.ok??[],c=o?.fail??[],d=n?this.hass.states[n]?.attributes.friendly_name||n:"";return r`<p class="ltek-hint">
      ${n?l.length?this._t("step_picture_checks",{entity:d,states:l.join(` ${this._t("or")} `)}):this._t("check_unless_text",{entity:d,states:c.join(` ${this._t("or")} `)}):this._t("step_picture_none",{device:t.name??t.entity_id})}
    </p>`}_renderChecks(e,t){let i=t.checks??[],n=d=>this._setActivity(e,{...t,checks:d.length?d:void 0}),o=t.devices??[],c=o.filter(d=>{let p=this.room.devices?.[d];return p?.entity_id&&this._detectFor(p)?.found?.picture}).find(d=>!i.some(p=>p.device===d&&!p.entity_id))??o[0];return r`<div class="ltek-list">
      ${o.length?r`<button class="ltek-add" @click=${()=>n([...i,{device:c}])}>+ ${this._t("add_check")}</button>`:r`<p class="ltek-hint">${this._t("needs_devices")}</p>`}
      ${i.length?u:r`<p class="ltek-hint">${this._t("check_none")}</p>`}
      ${i.map((d,p)=>{let h=b=>{let k=[...i];k[p]=S({...d,...b}),n(k)},m=d.entity_id!==void 0,_=String(d.device??""),f=d.state??[];return r`<div class="step check">
          <div class="step-head">
            <span class="title"><span class="num">${p+1}</span> ${this.room.devices?.[_]?.name??_}</span>
            ${this._moveButtons(i,p,n)}
          </div>
          <div class="ltek-row">
            <label class="lbl">${this._t("field.device")}</label>
            <select @change=${b=>h({device:b.target.value})}>
              ${o.map(b=>r`<option value=${b} ?selected=${b===_}>${this.room.devices?.[b]?.name??b}</option>`)}
            </select>
          </div>
          <div class="ltek-row">
            <label class="lbl">${this._t("check_what")}</label>
            <select
              @change=${b=>b.target.value==="own"?h({entity_id:"",state:["on"]}):h({entity_id:void 0,state:void 0,debounce:void 0})}
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
                  @value-changed=${b=>h({entity_id:b.detail.value.entity_id??""})}
                ></ltek-form>
                <div class="ltek-row">
                  <label class="lbl">${this._t("check_states")}</label>
                  <input
                    type="text"
                    .value=${(Array.isArray(f)?f:[f]).join(", ")}
                    placeholder=${this._t("check_states_placeholder")}
                    @change=${b=>{let k=b.target.value.split(",").map(T=>T.trim()).filter(Boolean);h({state:k.length?k:void 0})}}
                  />
                </div>`:this._checkNote(_)}
          <ltek-form
            .hass=${this.hass}
            .data=${{timeout:d.timeout,on_failure:d.on_failure??"warn"}}
            .schema=${[{name:"timeout",selector:{number:{min:5,max:300,step:5,mode:"slider",unit_of_measurement:"s"}}},{name:"on_failure",required:!0,selector:{select:{options:[{value:"warn",label:this._t("check_warn")},{value:"stop",label:this._t("check_stop")}],mode:"dropdown"}}}]}
            .computeLabel=${b=>this._t(b.name==="timeout"?"check_timeout":"check_failure")}
            @value-changed=${b=>{let k=b.detail.value;h({timeout:k.timeout,on_failure:k.on_failure==="stop"?"stop":void 0})}}
          ></ltek-form>
        </div>`})}
    </div>`}_routesChanged(e,t,i){let n={};for(let o of V)i[o]==="__none"?n[o]=null:i[o]&&i[o]!=="__auto"&&(n[o]=i[o]);(i.touchpad==="on"||i.touchpad==="off")&&(n.touchpad=i.touchpad==="on"),t.remote?.buttons&&(n.buttons=t.remote.buttons),t.remote?.settings&&(n.settings=t.remote.settings),this._setActivity(e,{...t,remote:Object.keys(n).length?n:void 0})}_extrasChanged(e,t,i){let n=(t.remote?.buttons??[]).filter(de),o=[...Array.isArray(i.buttons)?i.buttons:[],...n],l={...t.remote,buttons:o};this._setActivity(e,{...t,remote:ze(l),commands:i.activity_commands})}_renderQuickSelect(e,t){let i=t.remote?.buttons??[],n=i.filter(p=>!de(p)),o=i.filter(de),l=p=>{let h={...t.remote,buttons:[...n,...p]};this._setActivity(e,{...t,remote:ze(h)})},c=(t.devices??[]).filter(p=>this.room.devices?.[p]?.entity_id?.startsWith("media_player.")),d=c.map(p=>({value:p,label:this.room.devices?.[p]?.name??p}));return r`${o.map((p,h)=>{let m=this.room.devices?.[p.device]?.entity_id;return r`<div class="step">
          <div class="step-head">
            <span class="title">${p.name||p.source||""}</span>
            ${this._moveButtons(o,h,l)}
          </div>
          <ltek-form
            .hass=${this.hass}
            .data=${{device:p.device,source:p.source,label:p.name,icon:p.icon}}
            .schema=${[{name:"device",required:!0,selector:{select:{options:d,mode:"dropdown"}}},{name:"source",required:!0,selector:{select:{options:ot(this.hass,this.sources,m),custom_value:!0,mode:"dropdown"}}},{name:"label",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]}
            .computeLabel=${this._label}
            .computeHelper=${this._helper}
            @value-changed=${_=>{let f=_.detail.value,b=[...o];b[h]=S({device:f.device,source:f.source??"",name:f.label,icon:f.icon},["source"]),l(b)}}
          ></ltek-form>
        </div>`})}
      ${c.length?r`<button class="ltek-add" @click=${()=>l([...o,{device:c[c.length-1],source:""}])}>
            + ${this._t("add_quick_select")}
          </button>`:r`<p class="ltek-hint">${this._t("quick_select_no_player")}</p>`}`}_settingList(e,t){let i=at[String(t)]??"source_list",n=i==="sound_mode_list"?this.soundModes:this.sources;return ce(this.hass,n,this.room.devices?.[String(e)]?.entity_id,i)}_describeSetting(e,t){let i=e.entity?e.name||this.hass.states[e.entity]?.attributes.friendly_name||e.entity||this._t("setting.entity"):this._t(`setting.${e.setting}`);if(!t)return i;let n=this.room.devices?.[String(e.device)];return`${i} (${n?.name??String(e.device)})`}_settingsMode(e,t,i){return r`<ltek-form
      .hass=${this.hass}
      .data=${{settings_mode:e?"chosen":"auto"}}
      .schema=${[{name:"settings_mode",required:!0,selector:{select:{options:[{value:"auto",label:this._t(t)},{value:"chosen",label:this._t("settings_chosen")}],mode:"dropdown"}}}]}
      .computeLabel=${this._label}
      @value-changed=${n=>{let o=n.detail.value.settings_mode==="chosen";o!==e&&i(o)}}
    ></ltek-form>`}_renderSettingItems(e,t,i,n){let o=c=>!!this.room.devices?.[String(c)]?.entity_id?.startsWith("media_player."),l=(i??[]).map(c=>({value:c,label:this.room.devices?.[c]?.name??c}));return r`${e.map((c,d)=>{let p=i?c.device:n,h=c.entity!==void 0?"entity":c.setting,m=o(p)?[...rt,"entity"]:["entity"],_=c.entity,f=_?this.hass.states[_]?.attributes.options:void 0,b=h==="entity"?Array.isArray(f)?f.map(String):void 0:this._settingList(p,h);return r`<div class="step">
        <div class="step-head">
          <span class="title">${this._describeSetting(c,i!==null)}</span>
          ${this._moveButtons(e,d,t)}
        </div>
        <ltek-form
          .hass=${this.hass}
          .data=${{device:c.device,setting:h,entity:_,name:c.name,options:c.options??[]}}
          .schema=${[...i?[{name:"device",required:!0,selector:{select:{options:l,mode:"dropdown"}}}]:[],{name:"setting",required:!0,selector:{select:{options:m.map(k=>({value:k,label:this._t(`setting.${k}`)})),mode:"dropdown"}}},...h==="entity"?[{name:"entity",required:!0,selector:{entity:{filter:{domain:[...ti]}}}},{name:"name",selector:{text:{}}}]:[],...b!==void 0?[{name:"options",selector:{select:{options:b,multiple:!0,custom_value:!0,mode:"dropdown"}}}]:[]]}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${k=>{let T=k.detail.value,vt=o(i?T.device:n)?T.setting:"entity",bt=i?{device:T.device}:{},yt=[...e];yt[d]=vt==="entity"?S({...bt,entity:T.entity??"",name:T.name,options:T.options},["entity"]):S({...bt,setting:vt,options:T.options}),t(yt)}}
        ></ltek-form>
      </div>`})}`}get _lists(){return{source_list:this.sources,sound_mode_list:this.soundModes}}_renderCardSettings(e,t){let i=t.remote?.settings,n=p=>{let h={...t.remote};p===void 0?delete h.settings:h.settings=p,this._setActivity(e,{...t,remote:ze(h)})},o=ii(this.hass,this.room,t,this._lists,this._related),l=this._settingsMode(i!==void 0,"settings_auto",p=>n(p?o.map(h=>({...h})):void 0));if(i===void 0)return r`${l}
        ${o.length?this._settingColumns(o):r`<p class="ltek-hint">${this._t("settings_auto_none")}</p>`}`;let c=t.devices??[],d=c.filter(p=>this.room.devices?.[p]?.entity_id?.startsWith("media_player."));return r`${l}
      ${this._renderSettingItems(i,n,c)}
      ${i.length?u:r`<p class="ltek-hint">${this._t("settings_none")}</p>`}
      ${c.length?r`<button
            class="add"
            @click=${()=>n([...i,d.length?{device:d[0],setting:"sound_mode"}:{device:c[0],entity:""}])}
          >
            + ${this._t("add_setting")}
          </button>`:u}`}_settingColumns(e){return r`<div class="ltek-group first">${this._t("card_shows")}</div>
      <div class="columns">
        ${ni(this.hass,this.room,e).map(([t,i])=>{let n=new Set(i.map(o=>String(o.device)));return r`<div class="column">
            <div class="column-head">${t?pt(t):this._t("other_integration")}</div>
            ${n.size===1?r`<div class="ltek-subline">${this.room.devices?.[[...n][0]]?.name??[...n][0]}</div>`:u}
            <ul>
              ${i.map(o=>r`<li>${this._describeSetting(o,n.size>1)}</li>`)}
            </ul>
          </div>`})}
      </div>`}_renderDeviceSettings(e,t){let i=t.settings,n=d=>{let p={...t};d===void 0?delete p.settings:p.settings=d,this._emit({...this.room,devices:{...this.room.devices,[e]:p}})},o=lt(this.hass,this.room,e,this._lists,this._related),l=this._settingsMode(i!==void 0,"device_settings_auto",d=>n(d?o.map(({device:p,...h})=>h):void 0));if(i===void 0)return r`${l}
        <p class="ltek-hint">
          ${o.length?this._t("settings_auto_shows",{list:o.map(d=>this._describeSetting(d,!1)).join(", ")}):this._t("device_settings_auto_none")}
        </p>`;let c=t.entity_id?.startsWith("media_player.");return r`${l}
      ${this._renderSettingItems(i,n,null,e)}
      ${i.length?u:r`<p class="ltek-hint">${this._t("device_settings_none")}</p>`}
      <button
        class="add"
        @click=${()=>n([...i,c?{setting:"sound_mode"}:{entity:""}])}
      >
        + ${this._t("add_setting")}
      </button>`}_addActivity(){let e=this._t("new_activity"),t=D(H(e),Object.keys(this.room.activities??{}));this._setActivity(t,{name:e,devices:[]}),this._show({kind:"activity",id:t})}_deleteActivity(e,t){if(!window.confirm(`${this._t("delete")}: ${t.name??e}?`))return;let i={...this.room.activities};delete i[e];let n={...this.room,activities:i};n.default_activity===e&&delete n.default_activity,this._emit(n),this._show({kind:"list"})}_renderYaml(){return r`<p class="ltek-hint">${this._t("yaml_intro")}</p>
      <ltek-form
        .hass=${this.hass}
        .data=${{yaml:this.room}}
        .schema=${[{name:"yaml",selector:{object:{}}}]}
        .computeLabel=${()=>""}
        @value-changed=${e=>{let t=e.detail.value.yaml;t&&typeof t=="object"&&!Array.isArray(t)&&this._emit(t)}}
      ></ltek-form>`}_moveButtons(e,t,i){let n=o=>{let l=[...e],[c]=l.splice(t,1);l.splice(o,0,c),i(l)};return r`<span class="move">
      <button class="ltek-act" title=${this._t("move_up")} aria-label=${this._t("move_up")} ?disabled=${t===0} @click=${()=>n(t-1)}>
        <ha-icon icon="mdi:arrow-up"></ha-icon>
      </button>
      <button class="ltek-act" title=${this._t("move_down")} aria-label=${this._t("move_down")} ?disabled=${t===e.length-1} @click=${()=>n(t+1)}>
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
      @value-changed=${n=>{let o=n.detail.value.pick;o&&(i(o),n.target.requestUpdate())}}
    ></ltek-form>`}};fe.properties={hass:{attribute:!1},room:{attribute:!1},roomId:{attribute:!1},sources:{attribute:!1},soundModes:{attribute:!1},saved:{attribute:!1},_tab:{state:!0},_view:{state:!0},_notice:{state:!0},_related:{state:!0},_detect:{state:!0},profiles:{attribute:!1},jump:{attribute:!1},_powerOn:{state:!0}},fe.styles=[y,$,w,v`
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
  `];customElements.get("easy-av-control-room-editor")||customElements.define("easy-av-control-room-editor",fe);async function Xi(){if(customElements.get("ha-form")&&customElements.get("ha-selector"))return;await(await(await window.loadCardHelpers()).createCardElement({type:"entities",entities:[]})).constructor.getConfigElement(),await customElements.whenDefined("ha-form")}var ve=class extends g{constructor(){super();this._back="room";this._original="";this._loading=!1;this._saving=!1,this._ready=!1,this._sources={},this._soundModes={},this._adding=!1,this._profiles=[],this._page="room"}async _loadProfiles(){this._profiles=await this.hass.callWS({type:"easy_av_control/profiles/list"}).catch(()=>[])}_t(e,t){return x(this.hass?.language,e,t)}async _load(){this._loading=!0;try{await Xi(),this._ready=!0;let e=await this.hass.callWS({type:"easy_av_control/config/get"});this._entryId=e.entry_id,this._version=e.version,this.hass.callWS({type:"easy_av_control/ui/sidebar"}).then(t=>this._sidebar=t.visible).catch(()=>{}),this._revision=e.revision,this._original=JSON.stringify(e.rooms),this._rooms=e.rooms,this._banner=void 0,(!this._selected||!(this._selected in e.rooms))&&(this._selected=Object.keys(e.rooms)[0]),this._loadProfiles(),[this._sources,this._soundModes]=await Promise.all(["source_list","sound_mode_list"].map(t=>this.hass.callWS({type:"easy_av_control/config/sources",attribute:t}).catch(()=>({}))))}catch(e){this._loadError=e?.message??String(e)}finally{this._loading=!1}}get _dirty(){return this._rooms!==void 0&&JSON.stringify(this._rooms)!==this._original}_roomChanged(e,t){this._rooms={...this._rooms,[e]:t},this._banner?.kind!=="conflict"&&(this._banner=void 0)}_addRoom(e){if(this._adding=!1,!e.trim())return;let t=D(H(e),Object.keys(this._rooms??{}));this._rooms={...this._rooms,[t]:{name:e.trim(),devices:{},activities:{}}},this._selected=t}_renderAddRoom(){return this._adding?r`<form class="new-room" @submit=${t=>{t.preventDefault();let i=t.target.querySelector("input");this._addRoom(i.value)}}>
      <input
        aria-label=${this._t("add_room_name")}
        placeholder=${this._t("add_room_name")}
        @keydown=${t=>t.key==="Escape"&&(this._adding=!1)}
      />
      <div class="new-room-buttons">
        <button type="button" class="flat" @click=${()=>this._adding=!1}>${this._t("cancel")}</button>
        <button type="submit" class="primary">${this._t("create")}</button>
      </div>
    </form>`:r`<button class="room add" @click=${()=>this._adding=!0}>+ ${this._t("add_room")}</button>`}updated(e){this.hass&&!this._rooms&&!this._loading&&!this._loadError&&this._load(),e.has("_adding")&&this._adding&&this.shadowRoot?.querySelector("form.new-room input")?.focus()}_deleteRoom(e){let t=this._rooms?.[e];if(!t||!window.confirm(this._t("delete_room_confirm",{name:t.name??e})))return;let i={...this._rooms};delete i[e],this._rooms=i,this._selected=Object.keys(i)[0]}_discard(){this._rooms=JSON.parse(this._original),this._banner=void 0,(!this._selected||!(this._selected in this._rooms))&&(this._selected=Object.keys(this._rooms)[0])}_reload(){this._dirty&&!window.confirm(this._t("reload_confirm"))||(this._loadError=void 0,this._load())}async _save(e=!1){if(!this._rooms||!this._revision)return;let t=this._rooms,i={};for(let[n,o]of Object.entries(t))i[n]=S(o);this._saving=!0;try{let n=await this.hass.callWS({type:"easy_av_control/config/validate",rooms:i});if(n.error){this._banner={kind:"invalid",path:n.error.path.join("."),message:n.error.message};return}if(n.missing.length&&!e){this._banner={kind:"missing",missing:n.missing};return}let o=await this.hass.callWS({type:"easy_av_control/config/save",rooms:i,revision:this._revision,entry_id:this._entryId});this._revision=o.revision,this._original=JSON.stringify(i),this._rooms===t&&(this._rooms=i),this._banner={kind:"saved"},this._loadProfiles()}catch(n){let o=n;this._banner=o.code==="conflict"?{kind:"conflict"}:{kind:"invalid",path:"",message:o.message??String(n)}}finally{this._saving=!1}}render(){return r`
      <div class="toolbar">
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <div class="main-title">${this._t("title")}</div>
        ${this._dirty?r`<span class="dirty">${this._t("unsaved")}</span>`:u}
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
        ${this._adding?this._renderAddRoom():u}
        ${e.map(([i,n])=>r`<button
            class="room ${this._page==="room"&&i===t&&!this._openActivity?"active":""}"
            @click=${()=>this._goRoom(i)}
          >
            ${n.name??i}
          </button>
          ${je(n).map(([o,l])=>r`<div
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
        ${this._sidebar===void 0?u:r`<button
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
          <a class="ltek-star" href=${B} target="_blank" rel="noopener">${this._t("star")}</a>
          <a class="ltek-issue" href="${B}/issues" target="_blank" rel="noopener">${this._t("report")}</a>
          ${this._version?r`<div class="ltek-foot">${this._t("footer_version",{version:this._version})}</div>`:u}
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
                @view-changed=${i=>{let n=i.detail.view;this._openActivity=n.kind==="activity"?n.id:void 0}}
              ></easy-av-control-room-editor>`:r`<div class="empty">${this._t("no_rooms")}</div>`}
      </main>
    </div>`}_goRoom(e){this._selected=e,this._page="room",this._openActivity=void 0,this._jump={flow:!1,n:(this._jump?.n??0)+1}}_openGuide(){this._page!=="guide"&&(this._back=this._page),this._page="guide",window.scrollTo({top:0})}async _setSidebar(e){this._sidebar=e;try{let t=await this.hass.callWS({type:"easy_av_control/ui/sidebar",visible:e});this._sidebar=t.visible}catch{this._sidebar=!e}}_goActivity(e,t,i){this._selected=e,this._page="room",this._jump={activity:t,flow:i,n:(this._jump?.n??0)+1}}_renderBanner(){let e=this._banner;if(!e)return u;switch(e.kind){case"saved":return r`<div class="banner ok">${this._t("saved")}</div>`;case"applied":return r`<div class="banner warning">${this._t("detect_applied")}</div>`;case"invalid":return r`<div class="banner error">
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
        </div>`}}};ve.properties={hass:{attribute:!1},narrow:{type:Boolean},_rooms:{state:!0},_selected:{state:!0},_loadError:{state:!0},_banner:{state:!0},_saving:{state:!0},_ready:{state:!0},_sources:{state:!0},_soundModes:{state:!0},_adding:{state:!0},_profiles:{state:!0},_page:{state:!0},_draftFor:{state:!0},_focusProfile:{state:!0},_version:{state:!0},_jump:{state:!0},_sidebar:{state:!0},_openActivity:{state:!0}},ve.styles=[y,$,w,v`
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
  `];customElements.get("easy-av-control-panel")||customElements.define("easy-av-control-panel",ve);export{ve as EasyAvControlPanel};
