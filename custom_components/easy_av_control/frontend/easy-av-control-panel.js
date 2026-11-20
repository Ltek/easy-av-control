var ae=globalThis,le=ae.ShadowRoot&&(ae.ShadyCSS===void 0||ae.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ae=Symbol(),Xe=new WeakMap,G=class{constructor(n,e,t){if(this._$cssResult$=!0,t!==Ae)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=n,this.t=e}get styleSheet(){let n=this.o,e=this.t;if(le&&n===void 0){let t=e!==void 0&&e.length===1;t&&(n=Xe.get(e)),n===void 0&&((this.o=n=new CSSStyleSheet).replaceSync(this.cssText),t&&Xe.set(e,n))}return n}toString(){return this.cssText}},de=r=>new G(typeof r=="string"?r:r+"",void 0,Ae),v=(r,...n)=>{let e=r.length===1?r[0]:n.reduce((t,i,s)=>t+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[s+1],r[0]);return new G(e,r,Ae)},et=(r,n)=>{if(le)r.adoptedStyleSheets=n.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of n){let t=document.createElement("style"),i=ae.litNonce;i!==void 0&&t.setAttribute("nonce",i),t.textContent=e.cssText,r.appendChild(t)}},Se=le?r=>r:r=>r instanceof CSSStyleSheet?(n=>{let e="";for(let t of n.cssRules)e+=t.cssText;return de(e)})(r):r;var{is:Lt,defineProperty:Ht,getOwnPropertyDescriptor:Gt,getOwnPropertyNames:Wt,getOwnPropertySymbols:Bt,getPrototypeOf:Ut}=Object,ce=globalThis,tt=ce.trustedTypes,Kt=tt?tt.emptyScript:"",Ft=ce.reactiveElementPolyfillSupport,W=(r,n)=>r,Ee={toAttribute(r,n){switch(n){case Boolean:r=r?Kt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,n){let e=r;switch(n){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},nt=(r,n)=>!Lt(r,n),it={attribute:!0,type:String,converter:Ee,reflect:!1,useDefault:!1,hasChanged:nt};Symbol.metadata??=Symbol("metadata"),ce.litPropertyMetadata??=new WeakMap;var S=class extends HTMLElement{static addInitializer(n){this._$Ei(),(this.l??=[]).push(n)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(n,e=it){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(n)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(n,e),!e.noAccessor){let t=Symbol(),i=this.getPropertyDescriptor(n,t,e);i!==void 0&&Ht(this.prototype,n,i)}}static getPropertyDescriptor(n,e,t){let{get:i,set:s}=Gt(this.prototype,n)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let l=i?.call(this);s?.call(this,o),this.requestUpdate(n,l,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(n){return this.elementProperties.get(n)??it}static _$Ei(){if(this.hasOwnProperty(W("elementProperties")))return;let n=Ut(this);n.finalize(),n.l!==void 0&&(this.l=[...n.l]),this.elementProperties=new Map(n.elementProperties)}static finalize(){if(this.hasOwnProperty(W("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(W("properties"))){let e=this.properties,t=[...Wt(e),...Bt(e)];for(let i of t)this.createProperty(i,e[i])}let n=this[Symbol.metadata];if(n!==null){let e=litPropertyMetadata.get(n);if(e!==void 0)for(let[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let i=this._$Eu(e,t);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(n){let e=[];if(Array.isArray(n)){let t=new Set(n.flat(1/0).reverse());for(let i of t)e.unshift(Se(i))}else n!==void 0&&e.push(Se(n));return e}static _$Eu(n,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof n=="string"?n.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(n=>n(this))}addController(n){(this._$EO??=new Set).add(n),this.renderRoot!==void 0&&this.isConnected&&n.hostConnected?.()}removeController(n){this._$EO?.delete(n)}_$E_(){let n=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(n.set(t,this[t]),delete this[t]);n.size>0&&(this._$Ep=n)}createRenderRoot(){let n=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return et(n,this.constructor.elementStyles),n}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(n=>n.hostConnected?.())}enableUpdating(n){}disconnectedCallback(){this._$EO?.forEach(n=>n.hostDisconnected?.())}attributeChangedCallback(n,e,t){this._$AK(n,t)}_$ET(n,e){let t=this.constructor.elementProperties.get(n),i=this.constructor._$Eu(n,t);if(i!==void 0&&t.reflect===!0){let s=(t.converter?.toAttribute!==void 0?t.converter:Ee).toAttribute(e,t.type);this._$Em=n,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(n,e){let t=this.constructor,i=t._$Eh.get(n);if(i!==void 0&&this._$Em!==i){let s=t.getPropertyOptions(i),o=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Ee;this._$Em=i;let l=o.fromAttribute(e,s.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(n,e,t,i=!1,s){if(n!==void 0){let o=this.constructor;if(i===!1&&(s=this[n]),t??=o.getPropertyOptions(n),!((t.hasChanged??nt)(s,e)||t.useDefault&&t.reflect&&s===this._$Ej?.get(n)&&!this.hasAttribute(o._$Eu(n,t))))return;this.C(n,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(n,e,{useDefault:t,reflect:i,wrapped:s},o){t&&!(this._$Ej??=new Map).has(n)&&(this._$Ej.set(n,o??e??this[n]),s!==!0||o!==void 0)||(this._$AL.has(n)||(this.hasUpdated||t||(e=void 0),this._$AL.set(n,e)),i===!0&&this._$Em!==n&&(this._$Eq??=new Set).add(n))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let n=this.scheduleUpdate();return n!=null&&await n,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[i,s]of t){let{wrapped:o}=s,l=this[i];o!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,s,l)}}let n=!1,e=this._$AL;try{n=this.shouldUpdate(e),n?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw n=!1,this._$EM(),t}n&&this._$AE(e)}willUpdate(n){}_$AE(n){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(n)),this.updated(n)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(n){return!0}update(n){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(n){}firstUpdated(n){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[W("elementProperties")]=new Map,S[W("finalized")]=new Map,Ft?.({ReactiveElement:S}),(ce.reactiveElementVersions??=[]).push("2.1.2");var Re=globalThis,st=r=>r,ue=Re.trustedTypes,ot=ue?ue.createPolicy("lit-html",{createHTML:r=>r}):void 0,Oe="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,Pe="?"+E,qt=`<${Pe}>`,z=document,U=()=>z.createComment(""),K=r=>r===null||typeof r!="object"&&typeof r!="function",Ce=Array.isArray,ut=r=>Ce(r)||typeof r?.[Symbol.iterator]=="function",Te=`[ 	
\f\r]`,B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,rt=/-->/g,at=/>/g,P=RegExp(`>|${Te}(?:([^\\s"'>=/]+)(${Te}*=${Te}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),lt=/'/g,dt=/"/g,ht=/^(?:script|style|textarea|title)$/i,ze=r=>(n,...e)=>({_$litType$:r,strings:n,values:e}),a=ze(1),xi=ze(2),Ai=ze(3),k=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),ct=new WeakMap,C=z.createTreeWalker(z,129);function pt(r,n){if(!Ce(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ot!==void 0?ot.createHTML(n):n}var mt=(r,n)=>{let e=r.length-1,t=[],i,s=n===2?"<svg>":n===3?"<math>":"",o=B;for(let l=0;l<e;l++){let d=r[l],c,u,p=-1,m=0;for(;m<d.length&&(o.lastIndex=m,u=o.exec(d),u!==null);)m=o.lastIndex,o===B?u[1]==="!--"?o=rt:u[1]!==void 0?o=at:u[2]!==void 0?(ht.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=P):u[3]!==void 0&&(o=P):o===P?u[0]===">"?(o=i??B,p=-1):u[1]===void 0?p=-2:(p=o.lastIndex-u[2].length,c=u[1],o=u[3]===void 0?P:u[3]==='"'?dt:lt):o===dt||o===lt?o=P:o===rt||o===at?o=B:(o=P,i=void 0);let f=o===P&&r[l+1].startsWith("/>")?" ":"";s+=o===B?d+qt:p>=0?(t.push(c),d.slice(0,p)+Oe+d.slice(p)+E+f):d+E+(p===-2?l:f)}return[pt(r,s+(r[e]||"<?>")+(n===2?"</svg>":n===3?"</math>":"")),t]},F=class r{constructor({strings:n,_$litType$:e},t){let i;this.parts=[];let s=0,o=0,l=n.length-1,d=this.parts,[c,u]=mt(n,e);if(this.el=r.createElement(c,t),C.currentNode=this.el.content,e===2||e===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=C.nextNode())!==null&&d.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let p of i.getAttributeNames())if(p.endsWith(Oe)){let m=u[o++],f=i.getAttribute(p).split(E),_=/([.?@])?(.*)/.exec(m);d.push({type:1,index:s,name:_[2],strings:f,ctor:_[1]==="."?pe:_[1]==="?"?me:_[1]==="@"?_e:j}),i.removeAttribute(p)}else p.startsWith(E)&&(d.push({type:6,index:s}),i.removeAttribute(p));if(ht.test(i.tagName)){let p=i.textContent.split(E),m=p.length-1;if(m>0){i.textContent=ue?ue.emptyScript:"";for(let f=0;f<m;f++)i.append(p[f],U()),C.nextNode(),d.push({type:2,index:++s});i.append(p[m],U())}}}else if(i.nodeType===8)if(i.data===Pe)d.push({type:2,index:s});else{let p=-1;for(;(p=i.data.indexOf(E,p+1))!==-1;)d.push({type:7,index:s}),p+=E.length-1}s++}}static createElement(n,e){let t=z.createElement("template");return t.innerHTML=n,t}};function D(r,n,e=r,t){if(n===k)return n;let i=t!==void 0?e._$Co?.[t]:e._$Cl,s=K(n)?void 0:n._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),s===void 0?i=void 0:(i=new s(r),i._$AT(r,e,t)),t!==void 0?(e._$Co??=[])[t]=i:e._$Cl=i),i!==void 0&&(n=D(r,i._$AS(r,n.values),i,t)),n}var he=class{constructor(n,e){this._$AV=[],this._$AN=void 0,this._$AD=n,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(n){let{el:{content:e},parts:t}=this._$AD,i=(n?.creationScope??z).importNode(e,!0);C.currentNode=i;let s=C.nextNode(),o=0,l=0,d=t[0];for(;d!==void 0;){if(o===d.index){let c;d.type===2?c=new V(s,s.nextSibling,this,n):d.type===1?c=new d.ctor(s,d.name,d.strings,this,n):d.type===6&&(c=new fe(s,this,n)),this._$AV.push(c),d=t[++l]}o!==d?.index&&(s=C.nextNode(),o++)}return C.currentNode=z,i}p(n){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(n,t,e),e+=t.strings.length-2):t._$AI(n[e])),e++}},V=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(n,e,t,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=n,this._$AB=e,this._$AM=t,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let n=this._$AA.parentNode,e=this._$AM;return e!==void 0&&n?.nodeType===11&&(n=e.parentNode),n}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(n,e=this){n=D(this,n,e),K(n)?n===h||n==null||n===""?(this._$AH!==h&&this._$AR(),this._$AH=h):n!==this._$AH&&n!==k&&this._(n):n._$litType$!==void 0?this.$(n):n.nodeType!==void 0?this.T(n):ut(n)?this.k(n):this._(n)}O(n){return this._$AA.parentNode.insertBefore(n,this._$AB)}T(n){this._$AH!==n&&(this._$AR(),this._$AH=this.O(n))}_(n){this._$AH!==h&&K(this._$AH)?this._$AA.nextSibling.data=n:this.T(z.createTextNode(n)),this._$AH=n}$(n){let{values:e,_$litType$:t}=n,i=typeof t=="number"?this._$AC(n):(t.el===void 0&&(t.el=F.createElement(pt(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===i)this._$AH.p(e);else{let s=new he(i,this),o=s.u(this.options);s.p(e),this.T(o),this._$AH=s}}_$AC(n){let e=ct.get(n.strings);return e===void 0&&ct.set(n.strings,e=new F(n)),e}k(n){Ce(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,i=0;for(let s of n)i===e.length?e.push(t=new r(this.O(U()),this.O(U()),this,this.options)):t=e[i],t._$AI(s),i++;i<e.length&&(this._$AR(t&&t._$AB.nextSibling,i),e.length=i)}_$AR(n=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);n!==this._$AB;){let t=st(n).nextSibling;st(n).remove(),n=t}}setConnected(n){this._$AM===void 0&&(this._$Cv=n,this._$AP?.(n))}},j=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(n,e,t,i,s){this.type=1,this._$AH=h,this._$AN=void 0,this.element=n,this.name=e,this._$AM=i,this.options=s,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=h}_$AI(n,e=this,t,i){let s=this.strings,o=!1;if(s===void 0)n=D(this,n,e,0),o=!K(n)||n!==this._$AH&&n!==k,o&&(this._$AH=n);else{let l=n,d,c;for(n=s[0],d=0;d<s.length-1;d++)c=D(this,l[t+d],e,d),c===k&&(c=this._$AH[d]),o||=!K(c)||c!==this._$AH[d],c===h?n=h:n!==h&&(n+=(c??"")+s[d+1]),this._$AH[d]=c}o&&!i&&this.j(n)}j(n){n===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,n??"")}},pe=class extends j{constructor(){super(...arguments),this.type=3}j(n){this.element[this.name]=n===h?void 0:n}},me=class extends j{constructor(){super(...arguments),this.type=4}j(n){this.element.toggleAttribute(this.name,!!n&&n!==h)}},_e=class extends j{constructor(n,e,t,i,s){super(n,e,t,i,s),this.type=5}_$AI(n,e=this){if((n=D(this,n,e,0)??h)===k)return;let t=this._$AH,i=n===h&&t!==h||n.capture!==t.capture||n.once!==t.once||n.passive!==t.passive,s=n!==h&&(t===h||i);i&&this.element.removeEventListener(this.name,this,t),s&&this.element.addEventListener(this.name,this,n),this._$AH=n}handleEvent(n){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,n):this._$AH.handleEvent(n)}},fe=class{constructor(n,e,t){this.element=n,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(n){D(this,n)}},_t={M:Oe,P:E,A:Pe,C:1,L:mt,R:he,D:ut,V:D,I:V,H:j,N:me,U:_e,B:pe,F:fe},Yt=Re.litHtmlPolyfillSupport;Yt?.(F,V),(Re.litHtmlVersions??=[]).push("3.3.3");var ft=(r,n,e)=>{let t=e?.renderBefore??n,i=t._$litPart$;if(i===void 0){let s=e?.renderBefore??null;t._$litPart$=i=new V(n.insertBefore(U(),s),s,void 0,e??{})}return i._$AI(r),i};var De=globalThis,g=class extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let n=super.createRenderRoot();return this.renderOptions.renderBefore??=n.firstChild,n}update(n){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(n),this._$Do=ft(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};g._$litElement$=!0,g.finalized=!0,De.litElementHydrateSupport?.({LitElement:g});var Zt=De.litElementPolyfillSupport;Zt?.({LitElement:g});(De.litElementVersions??=[]).push("4.2.2");var Qt=`
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
`,b=v`
  :host {
    ${de(Qt)}
  }
`,y=v`
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
    font-size: 0.82rem;
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
    font-size: 0.78rem;
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
`,T="https://github.com/Ltek/easy-av-control";var ge={en:{"state.idle":"Off","state.starting":"Starting \u2026","state.active":"On","now.paused":"Paused","state.stopping":"Stopping \u2026","state.error":"Error",power:"On/off",loading:"Loading \u2026",not_found:'Room "{room}" not found',no_room:"Pick a room in the card settings",warnings:"Warnings",volume:"Volume","command.volume_up":"Volume up","command.volume_down":"Volume down","command.mute":"Mute","command.volume_set":"Volume slider","command.select_source":"Select source","command.select_sound_mode":"Select sound mode","command.channel_up":"Channel up","command.channel_down":"Channel down","command.play_pause":"Play/pause","command.play":"Play","command.pause":"Pause","command.stop":"Stop","command.next":"Next","command.previous":"Previous","command.up":"Up","command.down":"Down","command.left":"Left","command.right":"Right","command.ok":"OK","command.back":"Back","command.menu":"Menu","command.home":"Home","command.info":"Info","command.guide":"Guide","command.exit":"Exit","editor.room":"Room","editor.section":"Card","editor.hint":"The room this card controls. The card shows its activities, the remote of the running one, and its settings.","editor.star":"\u2B50 Star on GitHub","editor.report":"\u{1F41B} Report an issue","editor.name":"Title (optional)","doing.power_on":"Switching the outlets on","doing.power_off":"Switching the outlets off","doing.boot":"{name} is booting","doing.reload":"Reconnecting {name}","doing.ready":"Waiting for {name}","doing.turn_on":"Switching on {name}","doing.warm_up":"{name} is starting up","doing.status_on":"Waiting for {name} to be on","doing.status_on_value":"{name}: {value}","doing.status_off":"Waiting for {name} to be off","doing.status_off_value":"{name}: {value}","doing.turn_off":"Switching off {name}","doing.step":"Step {step} of {steps}: {what}","doing.wait":"Step {step} of {steps}: waiting","doing.hooks_on_start":"Waiting for the actions on start","doing.hooks_on_stop":"Waiting for the actions on stop","doing.left":"{time} left","doing.at_most":"at most {time}","cooling.text":"Cooling down: {names}","cooling.time":"power off in {time}","cooling.time_status":"power off once they are off, at most {time}",touchpad:"Touch surface: swipe for the arrow keys, tap for OK","touchpad.hint":"Swipe \xB7 tap for OK","rocker.volume":"VOL","rocker.channels":"CH","pad.show_arrows":"Show arrow keys","pad.show_touchpad":"Show touch surface",settings:"Settings","setting.source":"Source","setting.sound_mode":"Sound mode","toggle.on":"On","toggle.off":"Off","step.power_on":"Switch on","step.power_off":"Switch off","step.set_source":"Set source","step.set_volume":"Set volume","step.set_sound_mode":"Set sound mode","step.set_brightness":"Set brightness","step.set_color_temp":"Set color temperature","step.set_position":"Set cover position","step.set_tilt":"Set cover tilt","step.call_action":"Run action","step.delay":"Wait","step.wait_available":"Wait until available","step.wait_picture":"Wait for a picture"},de:{"state.idle":"Aus","state.starting":"Startet \u2026","state.active":"An","now.paused":"Pausiert","state.stopping":"Stoppt \u2026","state.error":"Fehler",power:"Ein/Aus",loading:"L\xE4dt \u2026",not_found:"Raum \u201E{room}\u201C nicht gefunden",no_room:"Bitte in den Karteneinstellungen einen Raum w\xE4hlen",warnings:"Warnungen",volume:"Lautst\xE4rke","command.volume_up":"Lauter","command.volume_down":"Leiser","command.mute":"Stumm","command.volume_set":"Lautst\xE4rkeregler","command.select_source":"Quelle w\xE4hlen","command.select_sound_mode":"Klangmodus w\xE4hlen","command.channel_up":"Kanal hoch","command.channel_down":"Kanal runter","command.play_pause":"Wiedergabe/Pause","command.play":"Wiedergabe","command.pause":"Pause","command.stop":"Stopp","command.next":"Weiter","command.previous":"Zur\xFCck","command.up":"Hoch","command.down":"Runter","command.left":"Links","command.right":"Rechts","command.ok":"OK","command.back":"Zur\xFCck","command.menu":"Men\xFC","command.home":"Start","command.info":"Info","command.guide":"EPG","command.exit":"Beenden","editor.room":"Raum","editor.section":"Karte","editor.hint":"Der Raum, den diese Karte steuert. Sie zeigt seine Aktivit\xE4ten, die Fernbedienung der laufenden und ihre Einstellungen.","editor.star":"\u2B50 Auf GitHub markieren","editor.report":"\u{1F41B} Problem melden","editor.name":"Titel (optional)","doing.power_on":"Steckdosen werden eingeschaltet","doing.power_off":"Steckdosen werden ausgeschaltet","doing.boot":"{name} bootet","doing.reload":"{name} wird neu verbunden","doing.ready":"Warte auf {name}","doing.turn_on":"{name} wird eingeschaltet","doing.warm_up":"{name} f\xE4hrt hoch","doing.status_on":"Warte, bis {name} an ist","doing.status_on_value":"{name}: {value}","doing.status_off":"Warte, bis {name} aus ist","doing.status_off_value":"{name}: {value}","doing.turn_off":"{name} wird ausgeschaltet","doing.step":"Schritt {step} von {steps}: {what}","doing.wait":"Schritt {step} von {steps}: warten","doing.hooks_on_start":"Warte auf die Aktionen beim Start","doing.hooks_on_stop":"Warte auf die Aktionen beim Stopp","doing.left":"noch {time}","doing.at_most":"h\xF6chstens noch {time}","cooling.text":"Abk\xFChlen: {names}","cooling.time":"Strom aus in {time}","cooling.time_status":"Strom aus, sobald sie aus sind, h\xF6chstens noch {time}",touchpad:"Touchfl\xE4che: wischen f\xFCr die Pfeiltasten, tippen f\xFCr OK","touchpad.hint":"Wischen \xB7 Tippen f\xFCr OK","rocker.volume":"VOL","rocker.channels":"CH","pad.show_arrows":"Pfeiltasten zeigen","pad.show_touchpad":"Touchfl\xE4che zeigen",settings:"Einstellungen","setting.source":"Quelle","setting.sound_mode":"Klangmodus","toggle.on":"An","toggle.off":"Aus","step.power_on":"Einschalten","step.power_off":"Ausschalten","step.set_source":"Quelle w\xE4hlen","step.set_volume":"Lautst\xE4rke setzen","step.set_sound_mode":"Klangmodus w\xE4hlen","step.set_brightness":"Helligkeit setzen","step.set_color_temp":"Farbtemperatur setzen","step.set_position":"Rollladen-Position setzen","step.set_tilt":"Lamellen-Neigung setzen","step.call_action":"Aktion ausf\xFChren","step.delay":"Warten","step.wait_available":"Auf Verf\xFCgbarkeit warten","step.wait_picture":"Auf ein Bild warten"}};function L(r,n,e={}){let t=(r??"en").split("-")[0],s=(t in ge?ge[t]:ge.en)[n]??ge.en[n]??n;for(let[o,l]of Object.entries(e))s=s.replace(`{${o}}`,l);return s}var gt={en:{setup:"Setup","flow.picture":"{step}. Wait until {entity} shows {states}, at most {timeout}","field.on_failure_picture":"If there's no picture",detect:"Detect integrations",detect_intro:"Compares what's installed in Home Assistant with what the rooms use. Tick what to change, then Apply: the changes appear as unsaved, and nothing is stored until you press Save.",detect_running:"Looking at your integrations \u2026",detect_nothing:"Nothing to change: every AV device with a profile is in a room, and every entity the rooms use exists.",detect_new:"New devices",detect_new_hint:"Devices no room uses yet. They go into the power-on order of the activities you tick, at the place their profile gives (projectors and processors early, audio in the middle, sources last), with their status, remote and outlet filled in.",detect_room:"Room",detect_new_room:"New room: {name}",detect_activities:"Add to",detect_no_activities:"This room has no activities yet.",detect_starter:"Create starter activities in new rooms (one per source)",detect_picture:"with a picture check",detect_better:"Better integrations",detect_better_hint:"A device a room uses that another integration now covers better (it reports faster or says more). Not ticked: tick to switch.",detect_better_row:"{from} \u2192 {to}",detect_gone:"Missing entities",detect_gone_hint:"Entities a room uses that no longer exist, for example after removing an integration. Where the same device is still covered by another integration, it is offered as the replacement.",detect_replace_with:"Replace with {entity} ({integration})",detect_no_replacement:"Nothing replaces it; fix it by hand. A device without a status uses its fixed times.",detect_renamed:"Renamed entities",detect_renamed_hint:"The same entity under a new ID. It's replaced everywhere except in actions and commands: check those.",detect_unmatched:"Integrations without a profile",detect_unmatched_hint:"Their devices work with fixed times. Create a profile so Easy AV Control can wait for their own states.",detect_create_profile:"+ Profile",detect_apply:"Apply",detect_applied:"Applied. Review the rooms, then press Save.",detect_again:"Detect again",profile_new:"+ Profile",profile_new_pick:"Integration",profile_new_hint:"Integrations here with a media player or remote and no profile. The draft starts from the first device of the one you pick.",profile_new_none:"Every integration with a media player or remote has a profile.",learn:"Learn",learn_hint:"Turn the device on, then off, here: Easy AV Control records what {entity} shows and fills in which states mean starting, on, stopping and off.",learn_on:"Turn on now",learn_off:"Turn off now",learn_seen_on:"Turning on: {states}",learn_seen_off:"Turning off: {states}",learn_use:"Use what was seen",learn_nothing:"Nothing recorded yet.","flow.status_on":"Wait until {device} says it's on ({entity}), at most {timeout}","flow.status_off":"Wait until {device} says it's off ({entity}), at most {timeout}","flow.outlets_off_status":"Switch off the outlet once its devices say they're off: {outlets}","flow.debounce":"the state must hold {seconds}",profiles:"Profiles",profiles_intro:"A profile tells Easy AV Control what an integration's entities say about a device: which entity shows that it's on, what its states mean, its remote, outlet and settings. Built-in ones are locked: duplicate one to change it.",profiles_builtin:"Built in",profiles_yours:"Yours",profiles_none_yours:"None yet. Duplicate a built-in profile, or import one.",profile_generic:"for any media player without its own profile",profile_untested:"From the integration's code, not tested on a device",profile_used_by:"Used by {where}",profile_unused:"Not used by a device",profile_preview:"Show the summary",profile_view:"View",profile_edit:"Edit",profile_duplicate:"Duplicate",profile_delete_confirm:'Delete your profile "{name}"? Devices that use it go back to the built-in one.',profile_readonly:"Built in: read only. Duplicate it to make your own version.",profile_editor_hint:"The profile as YAML. Entities are found on the device by domain and translation_key, never by entity ID, so the profile works on any Home Assistant.",profile_save:"Save profile",profile_close:"Close",profile_cancel:"Cancel",profile_saved:"Profile saved.",profile_export:"Export",profile_export_all:"Export yours",profile_import:"Import",profile_import_hint:"Paste an Easy AV Control profile export. Profiles you already have are never replaced: one with a taken ID is added under a new one.",profile_import_done:"Added: {added}",profile_import_renamed:"{from} added as {to}",profile_import_invalid:"Not valid, skipped: {ids}",profile_copy:"Copy to clipboard",profile_copied:"Copied \u2713",profile_copy_failed:"Press Ctrl/Cmd+C",profile_paste:"Paste from clipboard",profile_paste_failed:"Paste with Ctrl/Cmd+V",profile_share:"Share a profile",profile_share_hint:"Made one for a device others have too? Export it and open an issue with the text: accepted profiles ship as built-in ones.",sum_indicator:"On / off from {what}",sum_indicator_device:"the device's own state",sum_indicator_available:"{what} being available",sum_states:"{groups}",sum_remote:"Remote",sum_outlet:"Outlet",sum_settings:"Settings",sum_picture:"Picture check",sum_order:"Power-on order: {order}",sum_roles:"Jobs: {roles}","order.early":"early","order.middle":"middle","order.late":"late","role.power":"power","role.navigation":"arrow keys","role.now_playing":"now playing","role.turn_off":"turn off",section_state:"Device state",hint_state:"How Easy AV Control knows this device is on or off. With a status, it waits for the device itself instead of fixed times.",detected:"Detected: {name}",detected_none:"No profile for this device's integration: it uses the fixed times below.",detected_uses:"Uses",detected_now:"Now: {value}",detected_found_indicator:"Status from {entity}",detected_found_attribute:"attribute {attribute}",detected_found_remote:"Remote: {entity}",detected_found_outlet:"Outlet: {entity}",detected_found_settings:"Settings: {entities}",detected_use:"Use these",detected_applied:"In use",detected_siblings:"Also covered by: {integrations}",detected_role:"{role}: {integration}",state_source:"Status","state_source.auto":"Automatic (from the profile)","state_source.none":"None: fixed times only","field.profile":"Profile","profile.auto":"Automatic (for its integration)","field.wait_on":"When turning on, wait for","field.wait_off":"Before cutting the outlet, wait for","wait.status":"Its status","wait.time":"A fixed time","wait.both":"Its status, then a fixed time","field.timeout_on":"Status timeout, turning on","field.timeout_off":"Status timeout, turning off","field.debounce":"Debounce","helper.debounce":"Seconds a state must hold before it counts, so a flicker doesn't.","field.on_failure_on":"If it doesn't come on","field.on_failure_off":"If it doesn't go off","failure.warn":"Warn and continue","failure.stop":"Stop the activity","failure.retry":"Try once more, then warn","failure_off.stop":"Leave its outlet on",state_fixed_only:"No status for this device: only the fixed times below apply.",footer_version:"Easy AV Control (Ltek) {version}",star:"\u2B50 Star on GitHub",report:"\u{1F41B} Report an issue",title:"Easy AV Control",rooms:"Rooms",add_room:"Add room",no_rooms:"No rooms yet.",room_name:"Name",room_area:"Area",room_default_activity:"Default activity",default_last:"Last used","helper.default_activity":"What the room's on/off switch and toggle_activity start, e.g. from a wall button.",room_id_hint:"ID {id}",delete_room:"Delete room",delete_room_confirm:'Delete room "{name}" with all devices and activities?',tab_devices:"Devices",tab_activities:"Activities",tab_yaml:"YAML",add_device:"Add device",add_activity:"Add activity",delete:"Delete",move_up:"Move up",move_down:"Move down",device_id:"Device ID",device_in_use:'Device "{id}" is used by: {where}. Remove it there first.',activity_id_hint:"ID {id} \u2013 part of the entity IDs, cannot be changed",new_activity:"New activity",add_device_to_activity:"Add device \u2026",steps:"Start sequence",add_step:"Add step \u2026",hooks:"Actions on start and stop",remote:"Remote control",quick_select:"Quick select",quick_select_hint:"Buttons that switch a media player to a source; on an Apple TV the sources are its apps.",quick_select_no_player:"Add a media player to this activity first.",add_quick_select:"Add quick select",card_settings:"Settings in the card",card_settings_hint:"Source, sound mode and other settings of the devices, changeable in the card while the activity runs: those set on the devices, or a choice for this activity only. The section is closed until it is opened; each browser remembers that.","setting.entity":"Entity of the device","field.entity":"Entity","helper.entity":"A number (slider), select (list) or switch (on/off key), e.g. the receiver's bass.","field.settings_mode":"Show",settings_auto:"From the devices",settings_chosen:"Chosen here, with favourites",settings_auto_shows:"The card shows: {list}.",settings_auto_none:"The devices of this activity offer no settings yet. Choose them on a device, or start the activity once so its media players report their lists.",device_settings_hint:"What the card offers of this device, in every activity that uses it. Automatic: source and sound mode of a media player, and the number and select entities of the same device.",device_settings_auto:"Automatic",device_settings_auto_none:"Nothing found yet: no source or sound mode list reported, and no number or select entities of the same device.",device_settings_none:"The card shows no settings of this device.",settings_none:"The card shows no settings for this activity.",add_setting:"Add setting","field.setting":"Setting","field.options":"Favourites (optional)","helper.options":"Only these in the card, in this order; empty: the device's whole list.",commands:"Own commands",save:"Save",discard:"Discard",saving:"Saving \u2026",saved:"Saved",unsaved:"Unsaved changes",reload:"Reload",reload_confirm:"Discard your unsaved changes and load the saved configuration?",retry:"Try again",save_anyway:"Save anyway",conflict:"The configuration was changed elsewhere. Reload it \u2013 your unsaved changes here are lost.",invalid:"Not saved \u2013 {path}: {message}",missing:"These entities do not exist in Home Assistant:",missing_hint:"A device without power usually stays known. Most likely a typo or a renamed entity.",loading:"Loading \u2026",load_error:"Could not load the configuration: {error}",route_auto:"Automatic",route_none:"Hide",devices_intro:"Every device of the room that Easy AV Control switches or controls: TV, projector, receiver, player.",devices_empty:"No devices yet.",new_device:"New device",no_entity:"No entity chosen",entity_missing:"Entity not found in Home Assistant",used_by:"Used by: {where}",section_device:"Device",hint_device:"The Home Assistant entity of the device, usually a media player.",section_power:"Power",hint_power:"Optional. The outlet that powers the device. It is switched on before the device and off after it.",section_delays:"Waiting times",hint_delays:"How long Easy AV Control waits for this device.",section_ready:"Connection check",hint_ready:"Waits until the device is reachable in Home Assistant, before switching it on and before remote buttons. For devices that lose their connection without power, such as an Apple TV.",ready_preset:"Use {entity} for the connection check and the arrow keys (recommended for Apple TV)",section_advanced:"Advanced",hint_device_advanced:"The device ID is used in the YAML configuration. Own commands map a button name to Home Assistant actions, e.g. arrow keys for a receiver box.",activities_intro:'An activity combines devices for one use, e.g. "Apple TV" = TV and Apple TV. Starting it switches on what it needs and off what it does not.',activities_empty:"No activities yet.",no_devices:"No devices",needs_devices:"Add the devices of this room first.",section_general:"General",hint_general:"Name and icon appear in the card. Position sorts the activities.",section_activity_devices:"Devices",hint_activity_devices:"Switched on in this order.",hint_steps:"Run once all devices are on, e.g. switch the TV to its HDMI input or set the volume.",hint_remote:"Which device gets which buttons of the card. Automatic suits most setups.",hint_activity_advanced:"Extra buttons and commands in YAML, and Home Assistant actions on start and stop.",yaml_intro:"The whole room as YAML. Changes here and in the forms are the same configuration.",add_room_name:"Name of the new room",create:"Add",cancel:"Cancel","helper.power_switch":"Shared outlets stay on while any device on them is needed.","helper.delay_after_power":"How long the device needs after the outlet came on. Only waited when the outlet was off.","helper.delay_after_on":"Until the device accepts commands. Only when it was switched on.","helper.delay_after_off":"Cool-down before the next device or the outlet is switched off, e.g. 180 s for a projector.","helper.ready_entity":"E.g. the remote of an Apple TV, which is on only while it is connected.","helper.ready_reload":"Skips the waiting time of an integration that retries its connection.","helper.source":"The list shows what the device reported last, so it must have been on once. A name can also be typed in.","field.entity_id":"Entity","field.name":"Display name","field.power_switch":"Power outlet","field.remote_entity":"Remote (optional)","helper.remote_entity":"Arrow keys, OK, back, home and menu of the card go to this remote entity, e.g. the remote of an Apple TV.","field.delay_after_power":"Boot time (s)","field.delay_after_on":"Wait after switching on (s)","field.delay_after_off":"Wait after switching off (s)","field.ready_enabled":"Wait until available before switching on","field.ready_entity":"Check this entity instead (optional)","field.ready_state":"Wait for state (optional, e.g. on)","field.ready_timeout":"Timeout (s)","field.ready_reload":"Reload its integration","field.ready_on_timeout":"On timeout","field.commands":"Own commands (YAML: name \u2192 actions)","field.icon":"Icon","field.order":"Position","field.on_start":"On start","field.on_stop":"On stop","field.volume":"Volume","field.channels":"Channels","field.transport":"Playback","field.navigation":"Navigation","field.touchpad":"Touch surface","helper.touchpad":"A swipe area instead of the arrow keys in the card. Automatic: for navigation that goes to a remote entity, e.g. an Apple TV.",touchpad_auto:"Automatic",touchpad_on:"On",touchpad_off:"Off (arrow keys)","field.buttons":"Extra buttons (YAML list)","field.label":"Label (optional, default: the source)","field.activity_commands":"Commands of this activity (YAML: name \u2192 actions)","field.type":"Type","field.device":"Device","field.source":"Source","field.volume_level":"Volume","field.sound_mode":"Sound mode","field.brightness_pct":"Brightness (%)","field.color_temp_kelvin":"Color temperature (K)","field.transition":"Transition (s)","field.position":"Position (%)","field.tilt_position":"Tilt (%)","field.action":"Action (e.g. script.turn_on)","field.data":"Data","field.target":"Target","field.timeout":"Timeout (s)","field.reload_integration":"Reload its integration","field.on_timeout":"On timeout","field.delay_after":"Wait afterwards (s)",on_timeout_abort:"Abort the start",on_timeout_continue:"Continue","step.power_on":"Switch on","step.power_off":"Switch off","step.set_source":"Set source","step.set_volume":"Set volume","step.set_sound_mode":"Set sound mode","step.set_brightness":"Set brightness","step.set_color_temp":"Set color temperature","step.set_position":"Set cover position","step.set_tilt":"Set cover tilt","step.call_action":"Call action","step.delay":"Wait","step.wait_available":"Wait until available",section_remote_preview:"Remote control preview",hint_remote_preview:"The card as it looks while this activity runs, with the settings above, also before saving. Tap a button to see where it goes; nothing is sent.","preview.tap":"Tap a button to see which device gets it and what runs there.","preview.this_activity":"this activity","preview.device_commands":"own command of the device: {actions}","preview.activity_commands":"own command of the activity: {actions}","preview.unknown":"does nothing: no device of this activity handles it","preview.unknown_on_device":"does nothing: {device} cannot handle it","preview.ready":"Checks the connection first and restores it if needed.","preview.dead":"These buttons are shown but do nothing:","preview.groups":"Button groups","preview.mode_auto":"automatic","preview.mode_set":"chosen","preview.hidden":"hidden","preview.no_device":"no suitable device, not shown","preview.no_keys":"not shown: {device} has none of these buttons",section_flow:"Flow: what is switched when",hint_flow:"Computed from the settings of this activity and its devices, also before saving. Times count only the configured waits; how long the devices take to respond comes on top.","flow.mode_start":"Start","flow.mode_stop":"Stop","flow.from_label":"Starting from","flow.from_idle":"from idle (everything off)","flow.from":"switching from {activity}","flow.failed":"Could not compute the flow: {error}","flow.invalid":"No flow while the configuration has an error \u2013 {error}","flow.state_starting":"Room: starting","flow.state_active":"Room: active","flow.state_stopping":"Room: stopping","flow.state_idle":"Room: off","flow.outlets_on":"Switch on the outlets, all at once: {outlets}","flow.outlets_off":"Switch off the outlets: {outlets}","flow.outlets_off_later":"Switch off the outlet after its cool-down: {outlets}","flow.outlet_keep":"{outlet} stays on, this activity needs it","flow.outlets_already_on":"already on: {outlets}","flow.unless_rooms":"not while {rooms} uses it","flow.on_start":"Actions on start begin","flow.on_start_wait":"Wait until the actions on start are done","flow.on_stop":"Actions on stop begin","flow.on_stop_wait":"Wait until the actions on stop are done","flow.parallel":"runs alongside","flow.already_on":"Already on in {activity}: no switching, no waiting","flow.boot":"Boot time: until {seconds} after the outlets came on","flow.reload":"Reload the integration of {entity}","flow.ready":"Wait until {entity} is available, at most {timeout}","flow.ready_state":"Wait until {entity} is {states}, at most {timeout}","flow.on_timeout_abort":"\u2013 otherwise the start is aborted","flow.on_timeout_continue":"\u2013 otherwise it goes on anyway","flow.turn_on":"Switch on {device}","flow.turn_off":"Switch off {device}","flow.turn_off_unused":"Switch off {device}, this activity does not use it","flow.cannot_switch":"{device} cannot be switched on or off, nothing is sent","flow.wait_on":"Wait {seconds} until the device is ready","flow.wait":"Wait {seconds}","flow.steps":"Steps","flow.background":"In the background, after the room is done","flow.if.outlet_was_off":"only if its outlet was off","flow.if.if_off":"only if the device is off","flow.if.if_on":"only if the device is on","flow.reload_if_needed":"reloads its integration if not ready","flow.cooldown":"then {seconds} cool-down","flow.summary_start":"Active after {min} at the earliest, {max} at the latest if every readiness check takes its full timeout.","flow.summary_start_fixed":"Active after {min}.","flow.summary_stop":"Off as soon as the devices are switched off and the actions on stop are done.","flow.summary_stop_cut":"Off as soon as the devices are switched off and the actions on stop are done; the last outlet goes off after {seconds}."},de:{setup:"Einrichtung","flow.picture":"{step}. Warten, bis {entity} {states} zeigt, h\xF6chstens {timeout}","field.on_failure_picture":"Wenn kein Bild kommt",detect:"Integrationen erkennen",detect_intro:"Vergleicht, was in Home Assistant installiert ist, mit dem, was die R\xE4ume nutzen. Ankreuzen, was sich \xE4ndern soll, dann \xDCbernehmen: die \xC4nderungen erscheinen als ungespeichert; gespeichert wird erst mit Speichern.",detect_running:"Integrationen werden angesehen \u2026",detect_nothing:"Nichts zu \xE4ndern: jedes AV-Ger\xE4t mit Profil ist in einem Raum, und jede Entit\xE4t der R\xE4ume existiert.",detect_new:"Neue Ger\xE4te",detect_new_hint:"Ger\xE4te, die noch kein Raum nutzt. Sie kommen in die Einschaltreihenfolge der angekreuzten Aktivit\xE4ten, an die Stelle, die ihr Profil vorgibt (Projektoren und Prozessoren fr\xFCh, Audio in der Mitte, Quellen zuletzt), mit Status, Fernbedienung und Steckdose.",detect_room:"Raum",detect_new_room:"Neuer Raum: {name}",detect_activities:"Hinzuf\xFCgen zu",detect_no_activities:"Dieser Raum hat noch keine Aktivit\xE4ten.",detect_starter:"In neuen R\xE4umen Start-Aktivit\xE4ten anlegen (eine pro Quelle)",detect_picture:"mit Bildpr\xFCfung",detect_better:"Bessere Integrationen",detect_better_hint:"Ein Ger\xE4t eines Raums, das eine andere Integration jetzt besser abdeckt (schneller oder ausf\xFChrlicher). Nicht angekreuzt: zum Wechseln ankreuzen.",detect_better_row:"{from} \u2192 {to}",detect_gone:"Fehlende Entit\xE4ten",detect_gone_hint:"Entit\xE4ten eines Raums, die es nicht mehr gibt, z. B. nach dem Entfernen einer Integration. Wird dasselbe Ger\xE4t noch von einer anderen Integration abgedeckt, wird sie als Ersatz angeboten.",detect_replace_with:"Ersetzen durch {entity} ({integration})",detect_no_replacement:"Kein Ersatz; bitte von Hand anpassen. Ein Ger\xE4t ohne Status nutzt seine festen Zeiten.",detect_renamed:"Umbenannte Entit\xE4ten",detect_renamed_hint:"Dieselbe Entit\xE4t unter neuer ID. Sie wird \xFCberall ersetzt au\xDFer in Aktionen und Befehlen: diese pr\xFCfen.",detect_unmatched:"Integrationen ohne Profil",detect_unmatched_hint:"Ihre Ger\xE4te arbeiten mit festen Zeiten. Ein Profil anlegen, damit Easy AV Control auf ihre eigenen Zust\xE4nde warten kann.",detect_create_profile:"+ Profil",detect_apply:"\xDCbernehmen",detect_applied:"\xDCbernommen. R\xE4ume pr\xFCfen, dann Speichern.",detect_again:"Erneut erkennen",profile_new:"+ Profil",profile_new_pick:"Integration",profile_new_hint:"Integrationen mit Mediaplayer oder Fernbedienung ohne Profil. Der Entwurf startet vom ersten Ger\xE4t der gew\xE4hlten.",profile_new_none:"Jede Integration mit Mediaplayer oder Fernbedienung hat ein Profil.",learn:"Lernen",learn_hint:"Das Ger\xE4t hier ein- und wieder ausschalten: Easy AV Control zeichnet auf, was {entity} zeigt, und tr\xE4gt ein, welche Zust\xE4nde Starten, An, Stoppen und Aus bedeuten.",learn_on:"Jetzt einschalten",learn_off:"Jetzt ausschalten",learn_seen_on:"Beim Einschalten: {states}",learn_seen_off:"Beim Ausschalten: {states}",learn_use:"Gesehenes \xFCbernehmen",learn_nothing:"Noch nichts aufgezeichnet.","flow.status_on":"Warten, bis {device} meldet, dass es an ist ({entity}), h\xF6chstens {timeout}","flow.status_off":"Warten, bis {device} meldet, dass es aus ist ({entity}), h\xF6chstens {timeout}","flow.outlets_off_status":"Steckdose ausschalten, sobald ihre Ger\xE4te aus sind: {outlets}","flow.debounce":"der Zustand muss {seconds} anhalten",profiles:"Profile",profiles_intro:"Ein Profil sagt Easy AV Control, was die Entit\xE4ten einer Integration \xFCber ein Ger\xE4t verraten: welche Entit\xE4t zeigt, dass es an ist, was ihre Zust\xE4nde bedeuten, Fernbedienung, Steckdose und Einstellungen. Eingebaute sind gesperrt: zum \xC4ndern duplizieren.",profiles_builtin:"Eingebaut",profiles_yours:"Eigene",profiles_none_yours:"Noch keine. Ein eingebautes Profil duplizieren oder eines importieren.",profile_generic:"f\xFCr jeden Mediaplayer ohne eigenes Profil",profile_untested:"Aus dem Code der Integration, nicht an einem Ger\xE4t getestet",profile_used_by:"Genutzt von {where}",profile_unused:"Von keinem Ger\xE4t genutzt",profile_preview:"Zusammenfassung zeigen",profile_view:"Ansehen",profile_edit:"Bearbeiten",profile_duplicate:"Duplizieren",profile_delete_confirm:'Eigenes Profil "{name}" l\xF6schen? Ger\xE4te, die es nutzen, nehmen wieder das eingebaute.',profile_readonly:"Eingebaut: nur lesen. Zum \xC4ndern duplizieren.",profile_editor_hint:"Das Profil als YAML. Entit\xE4ten werden am Ger\xE4t \xFCber Domain und translation_key gefunden, nie \xFCber die Entit\xE4ts-ID; so passt das Profil zu jedem Home Assistant.",profile_save:"Profil speichern",profile_close:"Schlie\xDFen",profile_cancel:"Abbrechen",profile_saved:"Profil gespeichert.",profile_export:"Exportieren",profile_export_all:"Eigene exportieren",profile_import:"Importieren",profile_import_hint:"Einen Profil-Export von Easy AV Control einf\xFCgen. Vorhandene Profile werden nie ersetzt: eines mit vergebener ID kommt unter einer neuen dazu.",profile_import_done:"Hinzugef\xFCgt: {added}",profile_import_renamed:"{from} als {to} hinzugef\xFCgt",profile_import_invalid:"Ung\xFCltig, \xFCbersprungen: {ids}",profile_copy:"In die Zwischenablage",profile_copied:"Kopiert \u2713",profile_copy_failed:"Strg/Cmd+C dr\xFCcken",profile_paste:"Aus der Zwischenablage",profile_paste_failed:"Mit Strg/Cmd+V einf\xFCgen",profile_share:"Profil teilen",profile_share_hint:"Eines f\xFCr ein Ger\xE4t gebaut, das andere auch haben? Exportieren und den Text in einem Issue schicken: angenommene Profile werden eingebaut.",sum_indicator:"An / aus \xFCber {what}",sum_indicator_device:"den Zustand des Ger\xE4ts",sum_indicator_available:"die Verf\xFCgbarkeit von {what}",sum_states:"{groups}",sum_remote:"Fernbedienung",sum_outlet:"Steckdose",sum_settings:"Einstellungen",sum_picture:"Bildpr\xFCfung",sum_order:"Einschaltreihenfolge: {order}",sum_roles:"Aufgaben: {roles}","order.early":"fr\xFCh","order.middle":"Mitte","order.late":"sp\xE4t","role.power":"Strom","role.navigation":"Pfeiltasten","role.now_playing":"l\xE4uft gerade","role.turn_off":"Ausschalten",section_state:"Ger\xE4tezustand",hint_state:"Woran Easy AV Control erkennt, dass das Ger\xE4t an oder aus ist. Mit einem Status wartet es auf das Ger\xE4t selbst statt auf feste Zeiten.",detected:"Erkannt: {name}",detected_none:"Kein Profil f\xFCr die Integration dieses Ger\xE4ts: es gelten die festen Zeiten unten.",detected_uses:"Nutzt",detected_now:"Jetzt: {value}",detected_found_indicator:"Status von {entity}",detected_found_attribute:"Attribut {attribute}",detected_found_remote:"Fernbedienung: {entity}",detected_found_outlet:"Steckdose: {entity}",detected_found_settings:"Einstellungen: {entities}",detected_use:"\xDCbernehmen",detected_applied:"In Gebrauch",detected_siblings:"Auch abgedeckt von: {integrations}",detected_role:"{role}: {integration}",state_source:"Status","state_source.auto":"Automatisch (aus dem Profil)","state_source.none":"Keiner: nur feste Zeiten","field.profile":"Profil","profile.auto":"Automatisch (f\xFCr seine Integration)","field.wait_on":"Beim Einschalten warten auf","field.wait_off":"Vor dem Abschalten der Steckdose warten auf","wait.status":"Seinen Status","wait.time":"Eine feste Zeit","wait.both":"Seinen Status, dann eine feste Zeit","field.timeout_on":"Status-Zeitlimit beim Einschalten","field.timeout_off":"Status-Zeitlimit beim Ausschalten","field.debounce":"Entprellen","helper.debounce":"Sekunden, die ein Zustand anhalten muss, bevor er z\xE4hlt.","field.on_failure_on":"Wenn es nicht angeht","field.on_failure_off":"Wenn es nicht ausgeht","failure.warn":"Warnen und weitermachen","failure.stop":"Aktivit\xE4t beenden","failure.retry":"Noch einmal versuchen, dann warnen","failure_off.stop":"Steckdose anlassen",state_fixed_only:"Kein Status f\xFCr dieses Ger\xE4t: nur die festen Zeiten unten gelten.",footer_version:"Easy AV Control (Ltek) {version}",star:"\u2B50 Auf GitHub markieren",report:"\u{1F41B} Problem melden",title:"Easy AV Control",rooms:"R\xE4ume",add_room:"Raum hinzuf\xFCgen",no_rooms:"Noch keine R\xE4ume.",room_name:"Name",room_area:"Bereich",room_default_activity:"Standard-Aktivit\xE4t",default_last:"Zuletzt genutzte","helper.default_activity":"Was der Ein/Aus-Schalter des Raums und toggle_activity starten, z. B. von einem Wandtaster.",room_id_hint:"ID {id}",delete_room:"Raum l\xF6schen",delete_room_confirm:"Raum \u201E{name}\u201C mit allen Ger\xE4ten und Aktivit\xE4ten l\xF6schen?",tab_devices:"Ger\xE4te",tab_activities:"Aktivit\xE4ten",tab_yaml:"YAML",add_device:"Ger\xE4t hinzuf\xFCgen",add_activity:"Aktivit\xE4t hinzuf\xFCgen",delete:"L\xF6schen",move_up:"Nach oben",move_down:"Nach unten",device_id:"Ger\xE4te-ID",device_in_use:"Ger\xE4t \u201E{id}\u201C wird verwendet von: {where}. Bitte zuerst dort entfernen.",activity_id_hint:"ID {id} \u2013 Teil der Entit\xE4ts-IDs, nicht \xE4nderbar",new_activity:"Neue Aktivit\xE4t",add_device_to_activity:"Ger\xE4t hinzuf\xFCgen \u2026",steps:"Ablauf beim Start",add_step:"Schritt hinzuf\xFCgen \u2026",hooks:"Aktionen bei Start und Stopp",remote:"Fernbedienung",quick_select:"Schnellwahl",quick_select_hint:"Tasten, die einen Mediaplayer auf eine Quelle schalten; beim Apple TV sind die Quellen seine Apps.",quick_select_no_player:"F\xFCge dieser Aktivit\xE4t zuerst einen Mediaplayer hinzu.",add_quick_select:"Schnellwahl hinzuf\xFCgen",card_settings:"Einstellungen in der Karte",card_settings_hint:"Quelle, Klangmodus und weitere Einstellungen der Ger\xE4te, in der Karte \xE4nderbar, w\xE4hrend die Aktivit\xE4t l\xE4uft: die an den Ger\xE4ten festgelegten oder eine Auswahl nur f\xFCr diese Aktivit\xE4t. Der Bereich ist zugeklappt, bis man ihn \xF6ffnet; jeder Browser merkt sich das.","setting.entity":"Entit\xE4t des Ger\xE4ts","field.entity":"Entit\xE4t","helper.entity":"Eine Zahl (Schieberegler), Auswahl (Liste) oder ein Schalter (An/Aus-Taste), z. B. der Bass des Receivers.","field.settings_mode":"Anzeigen",settings_auto:"Von den Ger\xE4ten",settings_chosen:"Hier ausgew\xE4hlt, mit Favoriten",settings_auto_shows:"Die Karte zeigt: {list}.",settings_auto_none:"Die Ger\xE4te dieser Aktivit\xE4t bieten noch keine Einstellungen. Lege sie an einem Ger\xE4t fest, oder starte die Aktivit\xE4t einmal, damit die Mediaplayer ihre Listen melden.",device_settings_hint:"Was die Karte von diesem Ger\xE4t anbietet, in jeder Aktivit\xE4t, die es nutzt. Automatisch: Quelle und Klangmodus eines Mediaplayers und die Zahl- und Auswahl-Entit\xE4ten desselben Ger\xE4ts.",device_settings_auto:"Automatisch",device_settings_auto_none:"Noch nichts gefunden: keine Quellen- oder Klangmodus-Liste gemeldet und keine Zahl- oder Auswahl-Entit\xE4ten desselben Ger\xE4ts.",device_settings_none:"Die Karte zeigt keine Einstellungen dieses Ger\xE4ts.",settings_none:"Die Karte zeigt f\xFCr diese Aktivit\xE4t keine Einstellungen.",add_setting:"Einstellung hinzuf\xFCgen","field.setting":"Einstellung","field.options":"Favoriten (optional)","helper.options":"Nur diese in der Karte, in dieser Reihenfolge; leer: die ganze Liste des Ger\xE4ts.",commands:"Eigene Befehle",save:"Speichern",discard:"Verwerfen",saving:"Speichert \u2026",saved:"Gespeichert",unsaved:"Ungespeicherte \xC4nderungen",reload:"Neu laden",reload_confirm:"Ungespeicherte \xC4nderungen verwerfen und die gespeicherte Konfiguration laden?",retry:"Erneut versuchen",save_anyway:"Trotzdem speichern",conflict:"Die Konfiguration wurde anderswo ge\xE4ndert. Bitte neu laden \u2013 deine ungespeicherten \xC4nderungen hier gehen dabei verloren.",invalid:"Nicht gespeichert \u2013 {path}: {message}",missing:"Diese Entit\xE4ten gibt es in Home Assistant nicht:",missing_hint:"Ein Ger\xE4t ohne Strom bleibt normalerweise bekannt \u2013 meist ist es ein Tippfehler oder eine umbenannte Entit\xE4t.",loading:"L\xE4dt \u2026",load_error:"Konfiguration konnte nicht geladen werden: {error}",route_auto:"Automatisch",route_none:"Ausblenden",devices_intro:"Alle Ger\xE4te des Raums, die Easy AV Control schaltet oder steuert: TV, Beamer, Receiver, Player.",devices_empty:"Noch keine Ger\xE4te.",new_device:"Neues Ger\xE4t",no_entity:"Keine Entit\xE4t gew\xE4hlt",entity_missing:"Entit\xE4t in Home Assistant nicht gefunden",used_by:"Verwendet in: {where}",section_device:"Ger\xE4t",hint_device:"Die Home-Assistant-Entit\xE4t des Ger\xE4ts, meist ein Mediaplayer.",section_power:"Strom",hint_power:"Optional. Die Steckdose, an der das Ger\xE4t h\xE4ngt. Sie wird vor dem Ger\xE4t ein- und nach ihm ausgeschaltet.",section_delays:"Wartezeiten",hint_delays:"Wie lange Easy AV Control auf dieses Ger\xE4t wartet.",section_ready:"Verbindung pr\xFCfen",hint_ready:"Wartet, bis das Ger\xE4t in Home Assistant erreichbar ist, vor dem Einschalten und vor Tasten der Fernbedienung. F\xFCr Ger\xE4te, die ohne Strom ihre Verbindung verlieren, etwa ein Apple TV.",ready_preset:"{entity} f\xFCr Verbindungspr\xFCfung und Pfeiltasten nutzen (empfohlen f\xFCr Apple TV)",section_advanced:"Erweitert",hint_device_advanced:"Die Ger\xE4te-ID wird in der YAML-Konfiguration verwendet. Eigene Befehle ordnen einem Tastennamen Home-Assistant-Aktionen zu, z. B. Pfeiltasten f\xFCr einen Receiver.",activities_intro:'Eine Aktivit\xE4t fasst Ger\xE4te f\xFCr eine Nutzung zusammen, z. B. "Apple TV" = TV und Apple TV. Beim Start wird eingeschaltet, was sie braucht, und ausgeschaltet, was nicht.',activities_empty:"Noch keine Aktivit\xE4ten.",no_devices:"Keine Ger\xE4te",needs_devices:"Lege zuerst die Ger\xE4te dieses Raums an.",section_general:"Allgemein",hint_general:"Name und Icon erscheinen in der Card. Die Position bestimmt die Reihenfolge.",section_activity_devices:"Ger\xE4te",hint_activity_devices:"Werden in dieser Reihenfolge eingeschaltet.",hint_steps:"Laufen, sobald alle Ger\xE4te an sind, z. B. den TV auf seinen HDMI-Eingang schalten oder die Lautst\xE4rke setzen.",hint_remote:"Welches Ger\xE4t welche Tasten der Card bekommt. Automatisch passt f\xFCr die meisten Aufbauten.",hint_activity_advanced:"Zus\xE4tzliche Tasten und Befehle in YAML sowie Home-Assistant-Aktionen bei Start und Stopp.",yaml_intro:"Der ganze Raum als YAML. \xC4nderungen hier und in den Formularen betreffen dieselbe Konfiguration.",add_room_name:"Name des neuen Raums",create:"Hinzuf\xFCgen",cancel:"Abbrechen","helper.power_switch":"Gemeinsame Steckdosen bleiben an, solange ein Ger\xE4t daran gebraucht wird.","helper.delay_after_power":"Wie lange das Ger\xE4t nach dem Einschalten der Steckdose braucht. Nur wenn die Steckdose aus war.","helper.delay_after_on":"Bis das Ger\xE4t Befehle annimmt. Nur wenn es eingeschaltet wurde.","helper.delay_after_off":"Abk\xFChlzeit, bevor das n\xE4chste Ger\xE4t oder die Steckdose ausgeschaltet wird, z. B. 180 s f\xFCr einen Beamer.","helper.ready_entity":"Z. B. die Fernbedienung eines Apple TV, die nur bei bestehender Verbindung an ist.","helper.ready_reload":"\xDCberspringt die Wartezeit einer Integration, die ihre Verbindung erneut versucht.","helper.source":"Die Liste zeigt, was das Ger\xE4t zuletzt gemeldet hat; es muss also einmal an gewesen sein. Ein Name l\xE4sst sich auch eintippen.","field.entity_id":"Entit\xE4t","field.name":"Anzeigename","field.power_switch":"Steckdose","field.remote_entity":"Fernbedienung (optional)","helper.remote_entity":"Pfeiltasten, OK, Zur\xFCck, Home und Men\xFC der Card gehen an diese Fernbedienungs-Entit\xE4t, z. B. die Fernbedienung eines Apple TV.","field.delay_after_power":"Startzeit (s)","field.delay_after_on":"Warten nach Einschalten (s)","field.delay_after_off":"Warten nach Ausschalten (s)","field.ready_enabled":"Vor dem Einschalten auf Verf\xFCgbarkeit warten","field.ready_entity":"Stattdessen diese Entit\xE4t pr\xFCfen (optional)","field.ready_state":"Auf Zustand warten (optional, z. B. on)","field.ready_timeout":"Zeitlimit (s)","field.ready_reload":"Integration neu laden","field.ready_on_timeout":"Bei Zeit\xFCberschreitung","field.commands":"Eigene Befehle (YAML: Name \u2192 Aktionen)","field.icon":"Icon","field.order":"Position","field.on_start":"Beim Start","field.on_stop":"Beim Stopp","field.volume":"Lautst\xE4rke","field.channels":"Sender","field.transport":"Wiedergabe","field.navigation":"Navigation","field.touchpad":"Touchfl\xE4che","helper.touchpad":"Eine Wischfl\xE4che statt der Pfeiltasten in der Karte. Automatisch: wenn die Navigation an eine Remote-Entit\xE4t geht, z. B. ein Apple TV.",touchpad_auto:"Automatisch",touchpad_on:"An",touchpad_off:"Aus (Pfeiltasten)","field.buttons":"Zus\xE4tzliche Buttons (YAML-Liste)","field.label":"Beschriftung (optional, sonst die Quelle)","field.activity_commands":"Befehle dieser Aktivit\xE4t (YAML: Name \u2192 Aktionen)","field.type":"Typ","field.device":"Ger\xE4t","field.source":"Quelle","field.volume_level":"Lautst\xE4rke","field.sound_mode":"Klangmodus","field.brightness_pct":"Helligkeit (%)","field.color_temp_kelvin":"Farbtemperatur (K)","field.transition":"\xDCbergang (s)","field.position":"Position (%)","field.tilt_position":"Neigung (%)","field.action":"Aktion (z. B. script.turn_on)","field.data":"Daten","field.target":"Ziel","field.timeout":"Zeitlimit (s)","field.reload_integration":"Integration neu laden","field.on_timeout":"Bei Zeit\xFCberschreitung","field.delay_after":"Danach warten (s)",on_timeout_abort:"Start abbrechen",on_timeout_continue:"Weitermachen","step.power_on":"Einschalten","step.power_off":"Ausschalten","step.set_source":"Quelle w\xE4hlen","step.set_volume":"Lautst\xE4rke setzen","step.set_sound_mode":"Klangmodus w\xE4hlen","step.set_brightness":"Helligkeit setzen","step.set_color_temp":"Farbtemperatur setzen","step.set_position":"Rollladen-Position setzen","step.set_tilt":"Lamellen-Neigung setzen","step.call_action":"Aktion ausf\xFChren","step.delay":"Warten","step.wait_available":"Auf Verf\xFCgbarkeit warten",section_remote_preview:"Vorschau der Fernbedienung",hint_remote_preview:"So sieht die Karte aus, w\xE4hrend diese Aktivit\xE4t l\xE4uft, mit den Einstellungen oben, auch vor dem Speichern. Tippe eine Taste an, um zu sehen, wohin sie geht; es wird nichts gesendet.","preview.tap":"Tippe eine Taste an, um zu sehen, welches Ger\xE4t sie bekommt und was dort ausgef\xFChrt wird.","preview.this_activity":"diese Aktivit\xE4t","preview.device_commands":"eigener Befehl des Ger\xE4ts: {actions}","preview.activity_commands":"eigener Befehl der Aktivit\xE4t: {actions}","preview.unknown":"tut nichts: kein Ger\xE4t dieser Aktivit\xE4t kennt die Taste","preview.unknown_on_device":"tut nichts: {device} kennt die Taste nicht","preview.ready":"Pr\xFCft vorher die Verbindung und stellt sie bei Bedarf wieder her.","preview.dead":"Diese Tasten werden angezeigt, tun aber nichts:","preview.groups":"Tastengruppen","preview.mode_auto":"automatisch","preview.mode_set":"gew\xE4hlt","preview.hidden":"ausgeblendet","preview.no_device":"kein passendes Ger\xE4t, nicht angezeigt","preview.no_keys":"nicht angezeigt: {device} hat keine dieser Tasten",section_flow:"Ablauf: was wann geschaltet wird",hint_flow:"Berechnet aus den Einstellungen dieser Aktivit\xE4t und ihrer Ger\xE4te, auch vor dem Speichern. Die Zeiten z\xE4hlen nur die eingestellten Wartezeiten; wie lange die Ger\xE4te zum Reagieren brauchen, kommt hinzu.","flow.mode_start":"Start","flow.mode_stop":"Stopp","flow.from_label":"Ausgangslage","flow.from_idle":"aus dem Leerlauf (alles aus)","flow.from":"Wechsel von {activity}","flow.failed":"Ablauf konnte nicht berechnet werden: {error}","flow.invalid":"Kein Ablauf, solange die Konfiguration einen Fehler hat \u2013 {error}","flow.state_starting":"Raum: startet","flow.state_active":"Raum: aktiv","flow.state_stopping":"Raum: stoppt","flow.state_idle":"Raum: aus","flow.outlets_on":"Steckdosen gleichzeitig einschalten: {outlets}","flow.outlets_off":"Steckdosen ausschalten: {outlets}","flow.outlets_off_later":"Steckdose nach der Abk\xFChlzeit ausschalten: {outlets}","flow.outlet_keep":"{outlet} bleibt an, diese Aktivit\xE4t braucht sie","flow.outlets_already_on":"schon an: {outlets}","flow.unless_rooms":"nicht, solange {rooms} sie nutzt","flow.on_start":"Aktionen beim Start beginnen","flow.on_start_wait":"Warten, bis die Aktionen beim Start fertig sind","flow.on_stop":"Aktionen beim Stopp beginnen","flow.on_stop_wait":"Warten, bis die Aktionen beim Stopp fertig sind","flow.parallel":"l\xE4uft parallel","flow.already_on":"L\xE4uft schon in {activity}: kein Einschalten, keine Wartezeit","flow.boot":"Startzeit: bis {seconds} nach dem Einschalten der Steckdosen","flow.reload":"Integration von {entity} neu laden","flow.ready":"Warten, bis {entity} verf\xFCgbar ist, h\xF6chstens {timeout}","flow.ready_state":"Warten, bis {entity} {states} ist, h\xF6chstens {timeout}","flow.on_timeout_abort":"\u2013 sonst wird der Start abgebrochen","flow.on_timeout_continue":"\u2013 sonst geht es trotzdem weiter","flow.turn_on":"{device} einschalten","flow.turn_off":"{device} ausschalten","flow.turn_off_unused":"{device} ausschalten, diese Aktivit\xE4t braucht es nicht","flow.cannot_switch":"{device} l\xE4sst sich nicht schalten, es wird nichts gesendet","flow.wait_on":"{seconds} warten, bis das Ger\xE4t bereit ist","flow.wait":"{seconds} warten","flow.steps":"Schritte","flow.background":"Im Hintergrund, wenn der Raum schon fertig ist","flow.if.outlet_was_off":"nur, wenn die Steckdose aus war","flow.if.if_off":"nur, wenn das Ger\xE4t aus ist","flow.if.if_on":"nur, wenn das Ger\xE4t an ist","flow.reload_if_needed":"l\xE4dt die Integration neu, falls nicht bereit","flow.cooldown":"danach {seconds} Abk\xFChlzeit","flow.summary_start":"Aktiv fr\xFChestens nach {min}, sp\xE4testens nach {max}, wenn jede Bereitschaftspr\xFCfung ihr ganzes Zeitlimit braucht.","flow.summary_start_fixed":"Aktiv nach {min}.","flow.summary_stop":"Aus, sobald die Ger\xE4te ausgeschaltet und die Aktionen beim Stopp fertig sind.","flow.summary_stop_cut":"Aus, sobald die Ger\xE4te ausgeschaltet und die Aktionen beim Stopp fertig sind; die letzte Steckdose geht nach {seconds} aus."}};function $(r,n,e={}){let t=(r??"en").split("-")[0],i=gt[t]?.[n]??gt.en[n];if(i===void 0)return L(r,n,e);for(let[s,o]of Object.entries(e))i=i.replace(`{${s}}`,o);return i}var q=class extends g{constructor(){super();this._asked=!1;this._picks=new Map,this._ticked=new Set,this._starter=!0}_t(e,t){return $(this.hass?.language,e,t)}updated(){this.hass&&this.rooms&&!this._asked&&(this._asked=!0,this._run())}async _run(){this._result=void 0,this._error=void 0;try{let e=await this.hass.callWS({type:"easy_av_control/config/detect_all",rooms:this.rooms}),t=new Map;for(let s of e.new)t.set(s.key,{on:!0,target:s.room??`new:${s.new_room}`,activities:new Set(s.activities)});let i=new Set;e.gone.forEach((s,o)=>s.replacement&&i.add(`gone:${o}`)),e.renamed.forEach((s,o)=>i.add(`renamed:${o}`)),this._picks=t,this._ticked=i,this._result=e}catch(e){this._error=e.message??String(e)}}_toggle(e){let t=new Set(this._ticked);t.has(e)?t.delete(e):t.add(e),this._ticked=t}_setPick(e,t){let i=new Map(this._picks);i.set(e,{...i.get(e),...t}),this._picks=i}_name(e){return e?this.hass.states[e]?.attributes.friendly_name??e:"\u2013"}async _apply(){let e=this._result,t={new:e.new.filter(s=>this._picks.get(s.key)?.on).map(s=>{let o=this._picks.get(s.key),l=o.target.startsWith("new:"),d=e.new.find(c=>`new:${c.new_room}`===o.target);return{...s,room:l?null:o.target,new_room:l?o.target.slice(4):null,new_room_name:l?d?.new_room_name??s.new_room_name:null,area_id:l?d?.area_id??s.area_id:s.area_id,activities:l?[]:[...o.activities]}}),starter:this._starter,better:e.better.filter((s,o)=>this._ticked.has(`better:${o}`)),gone:e.gone.filter((s,o)=>this._ticked.has(`gone:${o}`)),renamed:e.renamed.filter((s,o)=>this._ticked.has(`renamed:${o}`))},i=await this.hass.callWS({type:"easy_av_control/config/detect_apply",rooms:this.rooms,choices:t});this.dispatchEvent(new CustomEvent("rooms-changed",{detail:{rooms:i.rooms}}))}render(){if(this._error)return a`<p class="ltek-error">${this._error}</p>
        <button class="ltek-btn" @click=${this._run}>${this._t("detect_again")}</button>`;let e=this._result;if(!e)return a`<p class="ltek-hint">${this._t("detect_running")}</p>`;let t=!e.new.length&&!e.better.length&&!e.gone.length&&!e.renamed.length,i=e.new.some(s=>this._picks.get(s.key)?.on&&this._picks.get(s.key).target.startsWith("new:"));return a`
      <p class="ltek-hint">${this._t("detect_intro")}</p>
      ${t?a`<p class="ltek-hint ok">${this._t("detect_nothing")}</p>`:h}
      ${e.new.length?this._section("new","mdi:plus-circle-outline",this._t("detect_new"),this._t("detect_new_hint"),a`${e.new.map(s=>this._renderNew(s))}
              ${i?a`<label class="check"><input type="checkbox" .checked=${this._starter}
                    @change=${s=>this._starter=s.target.checked} />${this._t("detect_starter")}</label>`:h}`):h}
      ${e.better.length?this._section("better","mdi:arrow-up-bold-circle-outline",this._t("detect_better"),this._t("detect_better_hint"),a`${e.better.map((s,o)=>this._row(`better:${o}`,"mdi:swap-horizontal",this._t("detect_better_row",{from:this._name(s.entity_id),to:this._name(s.replacement)}),`${this.rooms[s.room]?.name??s.room} \xB7 ${s.integration} \u2192 ${s.replacement_integration}`))}`):h}
      ${e.gone.length?this._section("gone","mdi:link-variant-off",this._t("detect_gone"),this._t("detect_gone_hint"),a`${e.gone.map((s,o)=>this._row(`gone:${o}`,"mdi:help-circle-outline",s.entity_id,`${this.rooms[s.room]?.name??s.room}: ${s.path} \xB7 ${s.replacement?this._t("detect_replace_with",{entity:this._name(s.replacement),integration:s.replacement_integration??""}):this._t("detect_no_replacement")}`,!s.replacement))}`):h}
      ${e.renamed.length?this._section("renamed","mdi:rename-outline",this._t("detect_renamed"),this._t("detect_renamed_hint"),a`${e.renamed.map((s,o)=>this._row(`renamed:${o}`,"mdi:rename-outline",`${s.old} \u2192 ${s.new}`,s.uses.map(l=>`${this.rooms[l.room]?.name??l.room}: ${l.path}`).join(", ")))}`):h}
      ${e.unmatched.length?this._section("unmatched","mdi:package-variant",this._t("detect_unmatched"),this._t("detect_unmatched_hint"),a`<div class="ltek-list">${e.unmatched.map(s=>a`<div class="ltek-item">
              <ha-icon class="lead" icon="mdi:puzzle-outline"></ha-icon>
              <span class="ltek-item-text"><span class="ltek-name">${s}</span></span>
              <button class="ltek-add" @click=${()=>this.dispatchEvent(new CustomEvent("create-profile",{detail:{integration:s}}))}>${this._t("detect_create_profile")}</button>
            </div>`)}</div>`):h}
      <div class="ltek-buttons bar">
        <button class="ltek-btn primary" ?disabled=${t} @click=${this._apply}>${this._t("detect_apply")}</button>
        <button class="ltek-btn" @click=${this._run}><ha-icon icon="mdi:refresh"></ha-icon> ${this._t("detect_again")}</button>
      </div>
    `}_section(e,t,i,s,o){return a`<details class="ltek-sec" open data-section=${e}>
      <summary><ha-icon icon=${t}></ha-icon>${i}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="ltek-body"><p class="ltek-hint">${s}</p><div class="ltek-list">${o}</div></div>
    </details>`}_row(e,t,i,s,o=!1){return a`<label class="ltek-item ${this._ticked.has(e)?"open":""}">
      <input type="checkbox" ?disabled=${o} .checked=${this._ticked.has(e)} @change=${()=>this._toggle(e)} />
      <ha-icon class="lead" icon=${t}></ha-icon>
      <span class="ltek-item-text"><span class="ltek-name">${i}</span><span class="ltek-subline">${s}</span></span>
    </label>`}_renderNew(e){let t=this._picks.get(e.key),i=this._result,s=[...new Map(i.new.filter(u=>u.new_room).map(u=>[u.new_room,u.new_room_name??u.new_room])).entries()],o=[...Object.entries(this.rooms).map(([u,p])=>({value:u,label:p.name??u})),...s.map(([u,p])=>({value:`new:${u}`,label:this._t("detect_new_room",{name:p})}))],l=t.target.startsWith("new:")?void 0:this.rooms[t.target],d=Object.entries(l?.activities??{}),c=e.integrations.length>1?e.integrations.join(", "):e.integration;return a`<div class="ltek-item new ${t.on?"open":""}">
      <input type="checkbox" .checked=${t.on} @change=${()=>this._setPick(e.key,{on:!t.on})} />
      <ha-icon class="lead" icon="mdi:television"></ha-icon>
      <span class="ltek-item-text">
        <span class="ltek-name">${e.name}</span>
        <span class="ltek-subline">${e.entity_id} · ${c} · ${e.profile_name}${e.picture?` \xB7 ${this._t("detect_picture")}`:""}</span>
        ${t.on?a`<span class="ltek-row">
                <label class="lbl">${this._t("detect_room")}</label>
                <select @change=${u=>{let p=u.target.value,m=p.startsWith("new:")?[]:Object.keys(this.rooms[p]?.activities??{});this._setPick(e.key,{target:p,activities:new Set(m)})}}>
                  ${o.map(u=>a`<option value=${u.value} ?selected=${u.value===t.target}>${u.label}</option>`)}
                </select>
              </span>
              ${l?d.length?a`<span class="ltek-row"><label class="lbl">${this._t("detect_activities")}</label>
                      ${d.map(([u,p])=>a`<label class="check">
                        <input type="checkbox" .checked=${t.activities.has(u)} @change=${()=>{let m=new Set(t.activities);m.has(u)?m.delete(u):m.add(u),this._setPick(e.key,{activities:m})}} />${p.name??u}</label>`)}</span>`:a`<span class="ltek-subline">${this._t("detect_no_activities")}</span>`:h}`:h}
      </span>
      <span class="ltek-badge">${this._t(`order.${e.order}`)}</span>
    </div>`}};q.properties={hass:{attribute:!1},rooms:{attribute:!1},_result:{state:!0},_picks:{state:!0},_ticked:{state:!0},_starter:{state:!0},_error:{state:!0}},q.styles=[b,y,v`
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
      .ltek-item.new {
        align-items: flex-start;
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
    `];customElements.get("easy-av-control-detect")||customElements.define("easy-av-control-detect",q);var vt="https://github.com/Ltek/easy-av-control#readme",yt="easy-av-control-guide-open",bt={en:{title:"Guide",steps_title:"How it works",steps:[a`<b>Add the devices</b> of the room under <i>Devices</i>: pick each device's entity. If it hangs on a
        switchable outlet, enter it under <i>Power</i>. If it loses its connection without power (Apple TV), use
        the recommended button under <i>Connection check</i>.`,a`<b>Put together activities</b> under <i>Activities</i>: choose the devices in the order they are
        switched on, and under <i>Start sequence</i> for example the TV's input. Quick-select buttons start apps.`,a`<b>Save and add the card:</b> save at the top right. On a dashboard, add a card, search for
        <i>Easy AV Control Remote</i> and choose the room.`],terms_title:"Terms",terms:[["Outlet","Switch that powers the device. Switched on first and off last; outlets shared by several devices stay on while one of them is needed."],["Boot time","Wait after the outlet came on, before the device is switched on. Only when the outlet was off."],["Waiting times","After switching on: until the device accepts commands. After switching off: cool-down, e.g. for a projector lamp."],["Connection check","Waits until the device is reachable in Home Assistant, at the start and before remote buttons; can reload its integration until it connects."],["Start sequence","Settings once all devices are on: input, volume, sound mode, any action."],["Remote control","Which device gets volume, channels, playback and arrow keys. Automatic: volume to the first media player, the rest to the last."],["Quick select","Buttons that switch a media player to a source, on an Apple TV to an app."],["Settings in the card","On a device: source, sound mode and entities such as tone controls, changeable in the card in every activity that uses it; automatic or chosen with favourites. An activity can choose its own."]],example_title:"Example: TV and Apple TV",example:[a`Device <i>TV</i>: entity <code>media_player.tv</code>, outlet <code>switch.tv_outlet</code>, boot time
        15 s, wait after switching on 10 s.`,a`Device <i>Apple TV</i>: entity <code>media_player.apple_tv</code>, under <i>Connection check</i> the
        button <i>Use remote.apple_tv for the connection check and the arrow keys</i>.`,a`Activity <i>Apple TV</i>: devices TV, then Apple TV; start sequence <i>Set source</i> on the TV to its
        HDMI input; quick select Apple TV with Netflix.`,a`Save, add the card, start the activity.`],docs:a`All options and the YAML reference: <a href=${vt} target="_blank" rel="noreferrer">documentation on GitHub</a>.`},de:{title:"Anleitung",steps_title:"So geht's",steps:[a`<b>Geräte anlegen</b> unter <i>Geräte</i>: Für jedes Gerät die Entität wählen. Hängt es an einer
        schaltbaren Steckdose, diese unter <i>Strom</i> eintragen. Verliert es ohne Strom die Verbindung (Apple
        TV), unter <i>Verbindung prüfen</i> den empfohlenen Knopf nutzen.`,a`<b>Aktivitäten zusammenstellen</b> unter <i>Aktivitäten</i>: die Geräte in Einschaltreihenfolge wählen,
        unter <i>Ablauf beim Start</i> zum Beispiel den Eingang des TV. Schnellwahl-Tasten starten Apps.`,a`<b>Speichern und Card einfügen:</b> oben rechts speichern. Im Dashboard eine Karte hinzufügen,
        <i>Easy AV Control Remote</i> suchen und den Raum wählen.`],terms_title:"Begriffe",terms:[["Steckdose","Schalter, an dem das Ger\xE4t h\xE4ngt. Wird zuerst ein- und zuletzt ausgeschaltet; gemeinsame Steckdosen mehrerer Ger\xE4te bleiben an, solange eines davon gebraucht wird."],["Startzeit","Wartezeit nach dem Einschalten der Steckdose, bevor das Ger\xE4t eingeschaltet wird. Nur wenn die Steckdose aus war."],["Wartezeiten","Nach dem Einschalten: bis das Ger\xE4t Befehle annimmt. Nach dem Ausschalten: Abk\xFChlzeit, z. B. f\xFCr eine Beamer-Lampe."],["Verbindung pr\xFCfen","Wartet, bis das Ger\xE4t in Home Assistant erreichbar ist, beim Start und vor Tasten der Fernbedienung; kann seine Integration neu laden, bis sie verbunden ist."],["Ablauf beim Start","Einstellungen, sobald alle Ger\xE4te an sind: Eingang, Lautst\xE4rke, Klangmodus, beliebige Aktion."],["Fernbedienung","Welches Ger\xE4t Lautst\xE4rke, Sender, Wiedergabe und Pfeiltasten bekommt. Automatisch: Lautst\xE4rke an den ersten Mediaplayer, der Rest an den letzten."],["Schnellwahl","Tasten, die einen Mediaplayer auf eine Quelle schalten, beim Apple TV auf eine App."],["Einstellungen in der Karte","Am Ger\xE4t: Quelle, Klangmodus und Entit\xE4ten wie Klangregler, in der Karte \xE4nderbar in jeder Aktivit\xE4t, die es nutzt; automatisch oder ausgew\xE4hlt mit Favoriten. Eine Aktivit\xE4t kann eigene w\xE4hlen."]],example_title:"Beispiel: TV und Apple TV",example:[a`Gerät <i>TV</i>: Entität <code>media_player.tv</code>, Steckdose <code>switch.steckdose_tv</code>,
        Startzeit 15 s, Warten nach Einschalten 10 s.`,a`Gerät <i>Apple TV</i>: Entität <code>media_player.apple_tv</code>, unter <i>Verbindung prüfen</i> der
        Knopf <i>remote.apple_tv für Verbindungsprüfung und Pfeiltasten nutzen</i>.`,a`Aktivität <i>Apple TV</i>: Geräte TV, dann Apple TV; Ablauf beim Start <i>Quelle wählen</i> am TV auf
        den HDMI-Eingang; Schnellwahl Apple TV mit Netflix.`,a`Speichern, Card einfügen, Aktivität starten.`],docs:a`Alle Optionen und die YAML-Referenz: <a href=${vt} target="_blank" rel="noreferrer">Dokumentation auf GitHub</a>.`}};function Jt(){try{return window.localStorage.getItem(yt)==="1"}catch{return!1}}function Xt(r){try{window.localStorage.setItem(yt,r?"1":"0")}catch{}}var Y=class extends g{render(){let n=(this.language??"en").split("-")[0],e=bt[n]??bt.en;return a`<details
      ?open=${Jt()}
      @toggle=${t=>Xt(t.target.open)}
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
    </details>`}};Y.properties={language:{}},Y.styles=[b,y,v`
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
  `];customElements.get("easy-av-control-guide")||customElements.define("easy-av-control-guide",Y);var Ne=["status","time","both"],Ie=["warn","stop","retry"],be=["profile","state_source","wait_on","wait_off","timeout_on","timeout_off","debounce","on_failure"];function wt(r){let n=r?.profile?.data??{};return{timeout_on:n.timeouts?.on??120,timeout_off:n.timeouts?.off??300,debounce:n.debounce??2}}function je(r,n){let e=r.on_failure;return e&&typeof e=="object"?e[n]??"warn":e??"warn"}function kt(r,n){let e=wt(n),t=r.state_source;return{profile:r.profile??"__auto",state_source:t==="none"?"none":t&&typeof t=="object"?"custom":"auto",wait_on:r.wait_on??"status",wait_off:r.wait_off??"status",timeout_on:r.timeout_on??e.timeout_on,timeout_off:r.timeout_off??e.timeout_off,debounce:r.debounce??e.debounce,on_failure_on:je(r,"turn_on"),on_failure_off:je(r,"turn_off"),on_failure_picture:je(r,"picture")}}function $t(r,n,e){let t=wt(e),i={...r};for(let d of be)delete i[d];n.profile&&n.profile!=="__auto"&&(i.profile=n.profile),n.state_source==="none"?i.state_source="none":n.state_source==="custom"&&(i.state_source=r.state_source??{}),n.wait_on&&n.wait_on!=="status"&&(i.wait_on=n.wait_on),n.wait_off&&n.wait_off!=="status"&&(i.wait_off=n.wait_off),n.timeout_on!==void 0&&Number(n.timeout_on)!==t.timeout_on&&(i.timeout_on=Number(n.timeout_on)),n.timeout_off!==void 0&&Number(n.timeout_off)!==t.timeout_off&&(i.timeout_off=Number(n.timeout_off)),n.debounce!==void 0&&Number(n.debounce)!==t.debounce&&(i.debounce=Number(n.debounce));let s=n.on_failure_on||"warn",o=n.on_failure_off||"warn",l=n.on_failure_picture||"warn";return s===o&&o===l?s!=="warn"&&(i.on_failure=s):i.on_failure={...s!=="warn"?{turn_on:s}:{},...o!=="warn"?{turn_off:o}:{},...l!=="warn"?{picture:l}:{}},i}function xt(r,n){let e=n?.found;if(!e)return{};let t={};return e.remote_entity&&r.remote_entity!==e.remote_entity&&(t.remote_entity=e.remote_entity),e.power_switch&&!r.power_switch&&(t.power_switch=e.power_switch),t}function ve(r){if(!r||typeof r!="object")return"";let n=r;return[n.domain,n.translation_key??n.unique_id_suffix??n.device_class].filter(Boolean).join(" \xB7 ")}function At(r,n){let e=r.data,t=[],i=e.indicator;if(i){let o=i.entity?ve(i.entity):n("sum_indicator_device"),l=i.attribute?`${o} (${i.attribute})`:o;t.push(n("sum_indicator",{what:i.available_is_on?n("sum_indicator_available",{what:l}):l}));let d=["starting","on","stopping","off","error"].filter(c=>Array.isArray(i[c])&&i[c].length).map(c=>`${c}: ${i[c].join(" / ")}`);d.length&&t.push(n("sum_states",{groups:d.join(" \xB7 ")}))}e.remote&&t.push(`${n("sum_remote")}: ${ve(e.remote)}`),e.power_switch&&t.push(`${n("sum_outlet")}: ${ve(e.power_switch)}`),Array.isArray(e.settings)&&e.settings.length&&t.push(`${n("sum_settings")}: ${e.settings.map(ve).join(", ")}`),e.picture&&t.push(`${n("sum_picture")}: ${e.picture.ok.join(" / ")}`),e.order&&t.push(n("sum_order",{order:n(`order.${e.order}`)}));let s=Object.entries(e.roles??{}).sort(([,o],[,l])=>o-l).map(([o])=>n(`role.${o}`));return s.length&&t.push(n("sum_roles",{roles:s.join(", ")})),t}var ei=new Set(["unavailable","unknown",""]);function St(r,n){let e={},t=(s,o)=>{o===void 0||ei.has(o)||(e[s]??=[]).includes(o)||e[s].push(o)},i={};r.length&&(r.length>1&&t("off",r[0]),r.slice(1,-1).forEach(s=>t("starting",s)),t("on",r[r.length-1]),r[0]==="unavailable"&&(i.available_is_on=!0)),n.length&&(n.length>1&&t("on",n[0]),n.slice(1,-1).forEach(s=>t("stopping",s)),t("off",n[n.length-1]),n[n.length-1]==="unavailable"&&(i.available_is_on=!0));for(let s of["starting","stopping"])e[s]=(e[s]??[]).filter(o=>!e.on?.includes(o)&&!e.off?.includes(o)),e[s].length||delete e[s];return{...i,...e}}var Z=class extends g{constructor(){super(),this.profiles=[]}_t(n,e){return $(this.hass?.language,n,e)}_changed(){this.dispatchEvent(new CustomEvent("profiles-changed"))}updated(n){if(n.has("draftFor")&&this.draftFor){let t=this.draftFor;this.dispatchEvent(new CustomEvent("draft-opened")),this._draft(t)}let e=this._editing?.learn;if(n.has("hass")&&e?.mode){let t=this.hass.states[e.watch]?.state,i=e[e.mode];t!==void 0&&i[i.length-1]!==t&&(this._editing={...this._editing,learn:{...e,[e.mode]:[...i,t]}})}}async _openPicker(){let n=await this.hass.callWS({type:"easy_av_control/config/detect_all",rooms:{}});this._pick=n.unmatched}async _draft(n){this._pick=void 0;try{let e=await this.hass.callWS({type:"easy_av_control/profiles/draft",integration:n});this._notice=void 0,this._editing={data:e.profile,previousId:null,readonly:!1,learn:{watch:e.watch,device:e.device_entity,on:[],off:[],mode:null}}}catch(e){this._notice=e.message??String(e)}}async _learn(n){let e=this._editing.learn,t=this.hass.states[e.watch]?.state;this._editing={...this._editing,learn:{...e,mode:n,[n]:t!==void 0?[t]:[]}},await this.hass.callService("homeassistant",n==="on"?"turn_on":"turn_off",{entity_id:e.device})}_useLearned(){let n=this._editing,e=St(n.learn.on,n.learn.off),t={...n.data.indicator??{},...e};this._editing={...n,data:{...n.data,indicator:t},learn:{...n.learn,mode:null}}}_renderLearn(n){let e=t=>t.length?t.join(" \u2192 "):"\u2013";return a`<details class="ltek-sec" open>
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
        ${n.on.length||n.off.length?a`<p class="ltek-hint">${this._t("learn_seen_on",{states:e(n.on)})}<br />
              ${this._t("learn_seen_off",{states:e(n.off)})}</p>`:a`<p class="ltek-hint">${this._t("learn_nothing")}</p>`}
      </div>
    </details>`}render(){if(this._editing)return this._renderEditor(this._editing);let n=this.profiles.filter(t=>t.source==="builtin"),e=this.profiles.filter(t=>t.source==="user");return a`
      <p class="ltek-hint">${this._t("profiles_intro")}</p>
      ${this._notice?a`<p class="ltek-hint ok">${this._notice}</p>`:h}
      <details class="ltek-sec" open>
        <summary>
          <ha-icon icon="mdi:account-cog-outline"></ha-icon>${this._t("profiles_yours")}
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="ltek-body">
          <div class="ltek-buttons bar">
            <button class="ltek-add" @click=${this._openPicker}>${this._t("profile_new")}</button>
            <button class="ltek-btn" @click=${this._openImport}><ha-icon icon="mdi:import"></ha-icon> ${this._t("profile_import")}</button>
            ${e.length?a`<button class="ltek-btn" @click=${()=>this._openExport(e.map(t=>t.id))}>
                  <ha-icon icon="mdi:export"></ha-icon> ${this._t("profile_export_all")}
                </button>`:h}
          </div>
          ${this._pick?a`<div class="ltek-row pick">
                <label class="lbl">${this._t("profile_new_pick")}</label>
                ${this._pick.length?a`<select @change=${t=>{let i=t.target.value;i&&this._draft(i)}}>
                      <option value="">–</option>
                      ${this._pick.map(t=>a`<option value=${t}>${t}</option>`)}
                    </select>`:h}
                <span class="ltek-hint">${this._t(this._pick.length?"profile_new_hint":"profile_new_none")}</span>
              </div>`:h}
          <div class="ltek-list">
            ${e.length?e.map(t=>this._row(t)):a`<p class="ltek-hint">${this._t("profiles_none_yours")}</p>`}
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
          <a class="ltek-issue" href="${T}/issues" target="_blank" rel="noopener">${this._t("report")}</a>
        </div>
      </details>
      ${this._renderDialog()}
    `}_row(n){let e=n.source==="builtin",t=this._preview===n.id,i=n.generic?this._t("profile_generic"):n.used_by?.length?this._t("profile_used_by",{where:n.used_by.join(", ")}):this._t("profile_unused");return a`<div class="ltek-item ${t?"open":""}">
        <ha-icon class="lead" icon=${e?"mdi:lock-outline":"mdi:account-cog-outline"}></ha-icon>
        <span class="ltek-item-text">
          <span class="ltek-name">${n.name}</span>
          <span class="ltek-subline">${n.integration==="*"?"":`${n.integration} \xB7 `}${i}</span>
        </span>
        ${n.tested?h:a`<span class="ltek-badge warn" title=${this._t("profile_untested")}>!</span>`}
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
        ${e?h:a`<button class="ltek-del" title=${this._t("delete")} @click=${()=>this._delete(n)}>
              <ha-icon icon="mdi:trash-can-outline"></ha-icon>
            </button>`}
      </div>
      ${t?a`<div class="preview">${At(n,(s,o)=>this._t(s,o)).map(s=>a`<div>${s}</div>`)}</div>`:h}`}_edit(n){this._notice=void 0,this._editing={data:n.data,previousId:n.source==="user"?n.id:null,readonly:n.source==="builtin"}}async _duplicate(n){let e=await this.hass.callWS({type:"easy_av_control/profiles/duplicate",profile_id:n});this._notice=void 0,this._editing={data:e,previousId:null,readonly:!1}}async _delete(n){window.confirm(this._t("profile_delete_confirm",{name:n.name}))&&(await this.hass.callWS({type:"easy_av_control/profiles/delete",profile_id:n.id}),this._changed())}async _save(){let n=this._editing,e=await this.hass.callWS({type:"easy_av_control/profiles/save",profile:n.data,previous_id:n.previousId});if(e.error){this._editing={...n,error:e.error.message};return}this._editing=void 0,this._notice=this._t("profile_saved"),this._changed()}_renderEditor(n){return a`
      <div class="ltek-buttons bar">
        <button class="ltek-btn" @click=${()=>this._editing=void 0}>
          <ha-icon icon="mdi:arrow-left"></ha-icon> ${this._t(n.readonly?"profile_close":"profile_cancel")}
        </button>
        ${n.readonly?h:a`<button class="ltek-btn primary" @click=${this._save}>${this._t("profile_save")}</button>`}
      </div>
      ${n.learn?this._renderLearn(n.learn):h}
      <details class="ltek-sec" open>
        <summary>
          <ha-icon icon=${n.readonly?"mdi:lock-outline":"mdi:pencil"}></ha-icon>${String(n.data.name??n.data.id)}
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="ltek-body">
          <p class="ltek-hint">${this._t(n.readonly?"profile_readonly":"profile_editor_hint")}</p>
          ${n.error?a`<p class="ltek-error">${n.error}</p>`:h}
          <ha-form
            .hass=${this.hass}
            .data=${{yaml:n.data}}
            .schema=${[{name:"yaml",selector:{object:{}}}]}
            .disabled=${n.readonly}
            .computeLabel=${()=>""}
            @value-changed=${e=>{if(n.readonly)return;let t=e.detail.value.yaml;t&&typeof t=="object"&&(this._editing={...n,data:t,error:void 0})}}
          ></ha-form>
        </div>
      </details>
    `}async _openExport(n){let e=await this.hass.callWS({type:"easy_av_control/profiles/export",ids:n});this._dialog={mode:"export",text:JSON.stringify(e,null,2)},await this.updateComplete,this._showDialog()}async _openImport(){this._dialog={mode:"import",text:""},await this.updateComplete,this._showDialog()}_showDialog(){let n=this.shadowRoot?.querySelector("dialog");n&&!n.open&&n.showModal()}_closeDialog(){this.shadowRoot?.querySelector("dialog")?.close(),this._dialog=void 0}async _copy(n){let e=n.currentTarget,t=this.shadowRoot.querySelector("textarea");t.select();let i=!1;try{i=document.execCommand("copy")}catch{i=!1}if(!i)try{await navigator.clipboard.writeText(t.value),i=!0}catch{i=!1}e.textContent=this._t(i?"profile_copied":"profile_copy_failed")}async _paste(){try{let n=await navigator.clipboard.readText();this._dialog={...this._dialog,text:n}}catch{this._dialog={...this._dialog,message:this._t("profile_paste_failed")}}}async _import(){let n;try{n=JSON.parse(this._dialog.text)}catch(i){this._dialog={...this._dialog,message:String(i)};return}let e=await this.hass.callWS({type:"easy_av_control/profiles/import",export:n});if(e.error){this._dialog={...this._dialog,message:e.error.message};return}let t=[this._t("profile_import_done",{added:(e.added??[]).join(", ")||"\u2013"})];for(let[i,s]of Object.entries(e.renamed??{}))t.push(this._t("profile_import_renamed",{from:i,to:s}));Object.keys(e.invalid??{}).length&&t.push(this._t("profile_import_invalid",{ids:Object.keys(e.invalid).join(", ")})),this._closeDialog(),this._notice=t.join(" \xB7 "),this._changed()}_renderDialog(){let n=this._dialog;if(!n)return h;let e=n.mode==="export";return a`<dialog @cancel=${this._closeDialog} @click=${t=>t.target===t.currentTarget&&this._closeDialog()}>
      <div class="dialog-body">
        <div class="ltek-group first">${this._t(e?"profile_export":"profile_import")}</div>
        ${e?h:a`<p class="ltek-hint">${this._t("profile_import_hint")}</p>`}
        <textarea
          class="ltek-text"
          rows="16"
          .value=${n.text}
          ?readonly=${e}
          @input=${t=>this._dialog={...n,text:t.target.value}}
        ></textarea>
        ${n.message?a`<p class="ltek-hint ltek-warn">${n.message}</p>`:h}
        <div class="ltek-buttons">
          ${e?a`<button class="ltek-btn primary" @click=${this._copy}>${this._t("profile_copy")}</button>`:a`<button class="ltek-btn" @click=${this._paste}>${this._t("profile_paste")}</button>
                <button class="ltek-btn primary" ?disabled=${!n.text.trim()} @click=${this._import}>${this._t("profile_import")}</button>`}
          <button class="ltek-btn" @click=${this._closeDialog}>${this._t("profile_close")}</button>
        </div>
      </div>
    </dialog>`}};Z.properties={hass:{attribute:!1},profiles:{attribute:!1},_preview:{state:!0},_editing:{state:!0},_dialog:{state:!0},_notice:{state:!0},_pick:{state:!0},draftFor:{attribute:!1}},Z.styles=[b,y,v`
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
    `];customElements.get("easy-av-control-profiles")||customElements.define("easy-av-control-profiles",Z);var Et=["power_on","power_off","set_source","set_volume","set_sound_mode","set_brightness","set_color_temp","set_position","set_tilt","call_action","delay","wait_available","wait_picture"],N=["volume","channels","transport","navigation"],Me={number:{min:0,max:3600,step:1,mode:"box",unit_of_measurement:"s"}},Ve={number:{min:0,max:100,step:1,mode:"slider"}};function Q(r,n,e,t="source_list"){if(!e)return[];let i=r.states[e]?.attributes[t];return Array.isArray(i)&&i.length?i.map(String):n[e]??[]}function Le(r,n,e){return Q(r,n,e,"source_list")}var He=["source","sound_mode"],Tt=["number","input_number","select","input_select","switch","input_boolean"],Ge={source:"source_list",sound_mode:"sound_mode_list"};function We(r,n,e,t,i={}){let s=n.devices?.[e]?.entity_id;if(!s)return[];let o=[];if(s.startsWith("media_player."))for(let l of He){let d=Ge[l];Q(r,t[d]??{},s,d).length&&o.push({device:e,setting:l})}for(let l of i[s]??[])o.push({device:e,entity:l});return o}function ti(r,n,e,t,i={}){let s=n.devices?.[e]?.settings;return Array.isArray(s)?s.map(o=>({...o,device:e})):We(r,n,e,t,i)}function Rt(r,n,e,t,i={}){return(e.devices??[]).flatMap(s=>ti(r,n,s,t,i))}function J(r){return typeof r=="object"&&r!==null&&"source"in r}function Ot(r,n,e,t,i={},s={}){let l={name:"device",required:!0,selector:{select:{options:Object.entries(n.devices??{}).map(([u,p])=>({value:u,label:p.name?`${p.name} (${u})`:u})),mode:"dropdown"}}},d=e.device?n.devices?.[e.device]?.entity_id:void 0;return[...{power_on:[l],power_off:[l],set_source:[l,{name:"source",required:!0,selector:{select:{options:Le(r,i,d),custom_value:!0,mode:"dropdown"}}}],set_volume:[l,{name:"volume_level",required:!0,selector:{number:{min:0,max:1,step:.01,mode:"slider"}}}],set_sound_mode:[l,{name:"sound_mode",required:!0,selector:{select:{options:Q(r,s,d,"sound_mode_list"),custom_value:!0,mode:"dropdown"}}}],set_brightness:[l,{name:"brightness_pct",selector:Ve},{name:"color_temp_kelvin",selector:{color_temp:{unit:"kelvin",min:2e3,max:6500}}},{name:"transition",selector:Me}],set_color_temp:[l,{name:"color_temp_kelvin",required:!0,selector:{color_temp:{unit:"kelvin",min:2e3,max:6500}}}],set_position:[l,{name:"position",required:!0,selector:Ve}],set_tilt:[l,{name:"tilt_position",required:!0,selector:Ve}],call_action:[{name:"action",required:!0,selector:{text:{}}},{name:"target",selector:{target:{}}},{name:"data",selector:{object:{}}}],delay:[],wait_picture:[l,{name:"timeout",selector:{number:{min:5,max:300,step:5,mode:"slider",unit_of_measurement:"s"}}}],wait_available:[{...l,required:!1},{name:"entity_id",selector:{entity:{}}},{name:"timeout",selector:Me},{name:"reload_integration",selector:{boolean:{}}},{name:"on_timeout",selector:{select:{options:[{value:"abort",label:t("on_timeout_abort")},{value:"continue",label:t("on_timeout_continue")}],mode:"dropdown"}}}]}[e.type]??[],{name:"delay_after",selector:Me}]}function w(r,n=[]){let e={};for(let[t,i]of Object.entries(r))if(n.includes(t))e[t]=i;else{if(i==null||i==="")continue;if(Array.isArray(i)&&i.length===0)continue;if(typeof i=="object"&&!Array.isArray(i)&&Object.keys(i).length===0)continue;e[t]=i}return e}function ye(r){let n=N.filter(e=>r[e]===null);return Array.isArray(r.settings)&&n.push("settings"),w(r,n)}function I(r){return r.normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/ß/g,"ss").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")}function R(r,n){let e=new Set(n),t=r||"item";if(!e.has(t))return t;let i=2;for(;e.has(`${t}_${i}`);)i+=1;return`${t}_${i}`}function Be(r,n){let e=[];for(let[t,i]of Object.entries(r.activities??{}))((i.devices??[]).includes(n)||(i.steps??[]).some(o=>o.device===n)||N.some(o=>i.remote?.[o]===n)||(i.remote?.buttons??[]).some(o=>typeof o=="object"&&o?.device===n))&&e.push(i.name??t);return e}function Ue(r,n,e){let t={};for(let[o,l]of Object.entries(r.devices??{}))t[o===n?e:o]=l;let i=o=>o===n?e:o,s={};for(let[o,l]of Object.entries(r.activities??{})){let d=l.remote?{...l.remote}:void 0;if(d){for(let c of N)c in d&&(d[c]=i(d[c]));Array.isArray(d.buttons)&&(d.buttons=d.buttons.map(c=>typeof c=="object"&&c?{...c,device:i(c.device)}:c))}s[o]=w({...l,devices:l.devices?.map(c=>i(c)),steps:l.steps?.map(c=>c.device===n?{...c,device:e}:c),remote:d})}return{...r,devices:t,activities:s}}var ii=400,ni={state:"mdi:flag-outline",outlets_on:"mdi:power-socket-eu",outlets_off:"mdi:power-socket-eu",outlet_keep:"mdi:power-socket-eu",turn_on:"mdi:power",turn_off:"mdi:power-off",hook:"mdi:script-text-outline",hook_wait:"mdi:script-text-outline",boot:"mdi:timer-sand",wait:"mdi:timer-sand",reload:"mdi:reload",ready:"mdi:lan-connect",status:"mdi:state-machine",picture:"mdi:image-check-outline",already_on:"mdi:check",step:"mdi:tune-variant"},si=new Set(["boot","reload","ready","status","picture","turn_on","wait","already_on","step","turn_off"]),X=class extends g{constructor(){super();this._request=0;this._mode="start"}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._timer)}willUpdate(e){if(e.has("activityId")&&e.get("activityId")!==void 0&&(this._from=void 0),this._from!==void 0&&!this.room.activities?.[this._from]&&(this._from=void 0),["room","roomId","activityId","_mode","_from"].some(t=>e.has(t))){window.clearTimeout(this._timer);let i=!(this._flow===void 0&&this._failed===void 0)&&e.has("room")?ii:0;this._timer=window.setTimeout(()=>this._load(),i)}}async _load(){let e=++this._request;try{let t=await this.hass.callWS({type:"easy_av_control/config/flow",room:this.roomId,config:this.room,activity:this.activityId,mode:this._mode,...this._mode==="start"&&this._from?{from:this._from}:{}});e===this._request&&(this._flow=t,this._failed=void 0)}catch(t){e===this._request&&(this._failed=t.message??String(t))}}_t(e,t){return $(this.hass?.language,e,t)}_entity(e){let t=String(e??"");return this.hass.states[t]?.attributes.friendly_name||t}_device(e){let t=String(e??""),i=this.room.devices?.[t];return i?.name||(i?.entity_id?this._entity(i.entity_id):"")||t}_activity(e){let t=String(e??"");return this.room.activities?.[t]?.name||t}_list(e){return(e??[]).map(t=>this._entity(t)).join(", ")}_seconds(e){return`${Math.round(Number(e)*10)/10} s`}_time([e,t]){return e===t?this._seconds(e):`${this._seconds(e).slice(0,-2)}\u2013${this._seconds(t)}`}_text(e){let t=this._device(e.device);switch(e.kind){case"state":return this._t(`flow.state_${e.state}`);case"outlets_on":return this._t("flow.outlets_on",{outlets:this._list(e.entities)});case"outlets_off":return this._t(e.after_status?"flow.outlets_off_status":e.background?"flow.outlets_off_later":"flow.outlets_off",{outlets:this._list(e.entities)});case"outlet_keep":return this._t("flow.outlet_keep",{outlet:this._entity(e.entity_id)});case"hook":return this._t(`flow.${e.hook}`);case"hook_wait":return this._t(`flow.${e.hook}_wait`);case"already_on":return this._t("flow.already_on",{activity:this._activity(e.previous)});case"boot":return this._t("flow.boot",{seconds:this._seconds(e.seconds)});case"reload":return this._t("flow.reload",{entity:this._entity(e.entity_id)});case"ready":{let i=Array.isArray(e.states)?e.states:e.states?[e.states]:[],s={entity:this._entity(e.entity_id),states:i.join(" / "),timeout:this._seconds(e.timeout)};return[e.step?`${e.step}. `:"",this._t(i.length?"flow.ready_state":"flow.ready",s)," ",this._t(`flow.on_timeout_${e.on_timeout}`)].join("")}case"turn_on":case"turn_off":{let i=e.step?`${e.step}. `:"";return e.skip?i+this._t("flow.cannot_switch",{device:t}):i+this._t(e.reason==="unused"?"flow.turn_off_unused":`flow.${e.kind}`,{device:t})}case"status":return this._t(e.target==="off"?"flow.status_off":"flow.status_on",{device:t,entity:this._entity(e.entity_id),timeout:this._seconds(e.timeout)});case"picture":return this._t("flow.picture",{step:String(e.step??""),entity:this._entity(e.entity_id),states:(e.states??[]).join(" / "),timeout:this._seconds(e.timeout)});case"wait":return this._t(e.reason==="delay_after_on"?"flow.wait_on":"flow.wait",{seconds:this._seconds(e.seconds)});case"step":return`${e.step}. ${this._t(`step.${e.step_type}`)}${this._stepValue(e)}`;default:return e.kind}}_stepValue(e){let t=e.data??{},i=[];for(let[s,o]of Object.entries(t))s==="volume_level"?i.push(`${Math.round(Number(o)*100)} %`):s==="brightness_pct"||s==="position"||s==="tilt_position"?i.push(`${o} %`):s==="color_temp_kelvin"?i.push(`${o} K`):s==="transition"?i.push(this._seconds(o)):e.step_type!=="call_action"&&i.push(String(o));return i.length?`: ${i.join(", ")}`:""}_notes(e){let t=[];if(typeof e.condition=="string"&&t.push(this._t(`flow.if.${e.condition}`)),e.kind==="ready"&&e.reload&&t.push(this._t("flow.reload_if_needed")),e.kind==="status"&&Number(e.debounce)>0&&t.push(this._t("flow.debounce",{seconds:this._seconds(e.debounce)})),e.kind==="turn_off"&&Number(e.cooldown)>0&&t.push(this._t("flow.cooldown",{seconds:this._seconds(e.cooldown)})),Array.isArray(e.already_on)&&e.already_on.length&&t.push(this._t("flow.outlets_already_on",{outlets:this._list(e.already_on)})),Array.isArray(e.unless_rooms)&&e.unless_rooms.length&&t.push(this._t("flow.unless_rooms",{rooms:e.unless_rooms.join(", ")})),e.kind==="hook"){let i=e.actions??[];t.push(this._t("flow.parallel")),i.length&&t.push(i.join(", "))}return t}_call(e){if(typeof e.action!="string"||e.kind==="hook")return;let t=e.entities?this._list(e.entities):e.entity_id?this._entity(e.entity_id):"";return t?`${e.action} \u2192 ${t}`:e.action}_renderRow(e,t,i){let s=this._notes(e),o=this._call(e),l=e.kind==="device"||e.kind==="steps";return a`<li class=${[t?"nested":"",l?"header":"",e.kind].join(" ")}>
      <span class="time">${i?this._time(e.at):""}</span>
      ${l?a`<span class="index">${e.kind==="device"?e.index:"\u2261"}</span>`:a`<ha-icon class="icon" .icon=${ni[e.kind]??"mdi:circle-small"}></ha-icon>`}
      <span class="body">
        <span class="what"
          >${e.kind==="device"?this._device(e.device):e.kind==="steps"?this._t("flow.steps"):this._text(e)}</span
        >
        ${e.kind==="device"?a`<span class="call">${e.entity_id}</span>`:h}
        ${o?a`<span class="call">${o}</span>`:h}
        ${s.length?a`<span class="notes">${s.map(d=>a`<span class="note">${d}</span>`)}</span>`:h}
      </span>
    </li>`}_renderRows(e){let t=e.filter(d=>!d.background),i=e.filter(d=>d.background),s=!1,o="",l=t.map(d=>{d.kind==="device"||d.kind==="steps"?s=!0:(!si.has(d.kind)||d.reason==="unused")&&(s=!1);let c=this._time(d.at),u=c!==o||d.kind==="state";return o=c,this._renderRow(d,s&&d.kind!=="device"&&d.kind!=="steps",u)});return a`<ol class="flow">${l}</ol>
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
      </p>`}let[t,i]=e.done,s=e.rows.filter(l=>l.background).map(l=>l.at[0]),o=this._mode==="start"?this._t(t===i?"flow.summary_start_fixed":"flow.summary_start",{min:this._seconds(t),max:this._seconds(i)}):this._t(s.length?"flow.summary_stop_cut":"flow.summary_stop",{seconds:this._seconds(Math.max(0,...s))});return a`${this._renderRows(e.rows)}
      <p class="summary">${o}</p>`}};X.properties={hass:{attribute:!1},room:{attribute:!1},roomId:{attribute:!1},activityId:{attribute:!1},_mode:{state:!0},_from:{state:!0},_flow:{state:!0},_failed:{state:!0}},X.styles=[b,y,v`
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
  `];customElements.get("easy-av-control-flow")||customElements.define("easy-av-control-flow",X);var M={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Pt=r=>(...n)=>({_$litDirective$:r,values:n}),we=class{constructor(n){}get _$AU(){return this._$AM._$AU}_$AT(n,e,t){this._$Ct=n,this._$AM=e,this._$Ci=t}_$AS(n,e){return this.update(n,e)}update(n,e){return this.render(...e)}};var{I:cn}=_t;var Ct=r=>r.strings===void 0;var oi={},zt=(r,n=oi)=>r._$AH=n;var Ke=Pt(class extends we{constructor(r){if(super(r),r.type!==M.PROPERTY&&r.type!==M.ATTRIBUTE&&r.type!==M.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ct(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(r,[n]){if(n===k||n===h)return n;let e=r.element,t=r.name;if(r.type===M.PROPERTY){if(n===e[t])return k}else if(r.type===M.BOOLEAN_ATTRIBUTE){if(!!n===e.hasAttribute(t))return k}else if(r.type===M.ATTRIBUTE&&e.getAttribute(t)===n+"")return k;return zt(r),n}});var ee=class extends g{constructor(){super(...arguments);this._loading=!1}setConfig(e){this._config=e}updated(){this.hass&&this._rooms===void 0&&!this._loading&&(this._loading=!0,this.hass.callWS({type:"easy_av_control/control/rooms"}).then(e=>this._rooms=e).catch(()=>this._rooms=[]).finally(()=>this._loading=!1))}_schema(){let e=(this._rooms??[]).map(i=>i.room);return[{name:"room",required:!0,selector:{select:{mode:"dropdown",options:(this._rooms??[]).map(i=>({value:e.filter(s=>s===i.room).length>1?`${i.entry_id}/${i.room}`:i.room,label:i.name}))}}},{name:"name",selector:{text:{}}}]}render(){if(!this.hass||!this._config)return h;let e={...this._config,room:this._config.entry_id?`${this._config.entry_id}/${this._config.room}`:this._config.room},t=(this._rooms??[]).some(s=>s.room===this._config.room);this._rooms&&!t&&this._config.room&&(e.room=this._config.room);let i=s=>L(this.hass?.language,s);return a`<details class="ltek-sec" open>
        <summary>
          <ha-icon icon="mdi:remote-tv"></ha-icon>${i("editor.section")}
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="ltek-body">
          <p class="ltek-hint">${i("editor.hint")}</p>
          <ha-form
            .hass=${this.hass}
            .data=${e}
            .schema=${this._schema()}
            .computeLabel=${s=>i(`editor.${s.name}`)}
            @value-changed=${this._valueChanged}
          ></ha-form>
        </div>
      </details>
      <div class="ltek-links">
        <a class="ltek-star" href=${T} target="_blank" rel="noopener">${i("editor.star")}</a>
        <a class="ltek-issue" href="${T}/issues" target="_blank" rel="noopener">${i("editor.report")}</a>
      </div>`}_valueChanged(e){e.stopPropagation();let t={...e.detail.value},i={...this._config,...t},s=String(t.room??"");if(s.includes("/")){let[o,l]=s.split("/",2);i.entry_id=o,i.room=l}else delete i.entry_id;i.name||delete i.name,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}};ee.properties={hass:{attribute:!1},_config:{state:!0},_rooms:{state:!0}},ee.styles=[b,y,v`
    :host {
      display: block;
    }
  `];customElements.get("easy-av-control-card-editor")||customElements.define("easy-av-control-card-editor",ee);function H(r,n){let e=`command.${r}`,t=n(e);if(t!==e)return t;let i=r.replace(/[_-]+/g," ").trim();return i.charAt(0).toUpperCase()+i.slice(1)}var ri=new Set(["off","standby","unavailable","unknown"]);function Dt(r,n){if(!r||ri.has(r.state))return;let e=r.attributes,t=x=>typeof e[x]=="string"&&e[x]?e[x]:void 0,i=x=>typeof e[x]=="number"?e[x]:void 0,s=t("app_name"),o=t("media_title")??s;if(!o)return;let l=i("media_season")??t("media_season"),d=i("media_episode")??t("media_episode"),c=t("media_series_title"),u=c&&(l!==void 0||d!==void 0)?`${c} \xB7 ${[l!==void 0?`S${l}`:"",d!==void 0?`E${d}`:""].filter(Boolean).join(" ")}`:c??t("media_artist")??t("media_album_name"),p=r.state==="playing",m=i("media_duration"),f=m!==void 0&&m>0?m:void 0,_=i("media_position"),A=t("media_position_updated_at");return _!==void 0&&p&&A&&!Number.isNaN(Date.parse(A))&&(_+=(n-Date.parse(A))/1e3),_!==void 0&&f!==void 0&&(_=Math.max(0,Math.min(f,_))),{title:o,app:o===s?void 0:s,subtitle:u,picture:t("entity_picture"),playing:p,duration:f,position:f!==void 0?_:void 0}}function te(r){let n=Math.floor(r),e=Math.floor(n/3600),t=Math.floor(n%3600/60),i=String(n%60).padStart(2,"0");return e?`${e}:${String(t).padStart(2,"0")}:${i}`:`${t}:${i}`}function jt(r,n){let e=Math.max(0,Math.ceil((Date.parse(r)-n)/1e3));return e>=60?te(e):`${e} s`}function Nt(r,n,e){let t=r.names.length?r.names.join(", "):r.outlet;return{text:e("cooling.text",{names:t}),time:e(r.status?"cooling.time_status":"cooling.time",{time:jt(r.until,n)})}}function It(r,n,e){if(!r)return;let t=r.name??"",i={step:String(r.step??""),steps:String(r.steps??"")},s;switch(r.kind){case"step":{let d=e(`step.${r.step_type}`);s=e("doing.step",{...i,what:t?`${d} (${t})`:d});break}case"wait":s=e("doing.wait",i);break;case"hooks":s=e(`doing.hooks_${r.hook}`);break;case"status":s=r.value?e(`doing.status_${r.target==="off"?"off":"on"}_value`,{name:t,value:r.value}):e(`doing.status_${r.target==="off"?"off":"on"}`,{name:t});break;default:s=e(`doing.${r.kind}`,{name:t})}if(!r.until)return{text:s};let o=jt(r.until,n),l=r.kind==="ready"||r.kind==="status";return{text:s,time:e(l?"doing.at_most":"doing.left",{time:o})}}var ke=class{constructor(){this.originX=0;this.originY=0;this.startX=0;this.startY=0;this.startTime=0;this.moved=!1}start(n,e,t){this.originX=this.startX=n,this.originY=this.startY=e,this.startTime=t,this.moved=!1}move(n,e){Math.hypot(n-this.startX,e-this.startY)>10&&(this.moved=!0);let t=[];for(;;){let i=n-this.originX,s=e-this.originY;if(Math.max(Math.abs(i),Math.abs(s))<40)return t;Math.abs(i)>=Math.abs(s)?(t.push(i>0?"right":"left"),this.originX+=Math.sign(i)*40,this.originY=e):(t.push(s>0?"down":"up"),this.originY+=Math.sign(s)*40,this.originX=n)}}end(n,e,t){return Math.hypot(n-this.startX,e-this.startY)>10&&(this.moved=!0),!this.moved&&t-this.startTime<=500}};function Fe(r,n){return`easy-av-control-touchpad:${r}:${n}`}function Mt(r,n){return r==="on"?!0:r==="off"?!1:n}var $e="easy_av_control",qe={volume_up:"mdi:volume-plus",volume_down:"mdi:volume-minus",mute:"mdi:volume-off",channel_up:"mdi:chevron-up",channel_down:"mdi:chevron-down",play_pause:"mdi:play-pause",play:"mdi:play",pause:"mdi:pause",stop:"mdi:stop",next:"mdi:skip-next",previous:"mdi:skip-previous",up:"mdi:chevron-up",down:"mdi:chevron-down",left:"mdi:chevron-left",right:"mdi:chevron-right",back:"mdi:arrow-u-left-top",menu:"mdi:menu",home:"mdi:home-outline",info:"mdi:information-outline",guide:"mdi:television-guide",exit:"mdi:close",select_source:"mdi:apps"},ai=["back","home","menu","info","guide","exit"],li=["previous","play_pause","play","pause","stop","next"],di=new Set(["volume_up","volume_down","up","down","left","right"]),ci=400,ui=200;function Vt(r){return`easy-av-control-settings:${r}`}var hi=3e4,pi={idle:"mdi:power",starting:"mdi:timer-sand",active:"mdi:power",stopping:"mdi:timer-sand",error:"mdi:alert-circle-outline"},ie=class extends g{constructor(){super();this._padChoices=new Map;this._settingsOpen=new Map;this._settingDrafts=new Map;this._view=null,this._loaded=!1}static getConfigElement(){return document.createElement("easy-av-control-card-editor")}static async getStubConfig(e){try{return{room:(await e.callWS({type:`${$e}/control/rooms`}))[0]?.room??""}}catch{return{room:""}}}setConfig(e){if(!e||typeof e.room!="string")throw new Error("room is required");let t=e.room!==this._config?.room||e.entry_id!==this._config?.entry_id;this._config=e,t&&this._resubscribe()}getCardSize(){return this._view?.remote?8:3}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._pressEnd(!1),window.clearInterval(this._tickTimer),this._tickTimer=void 0,this._unsubscribeNow()}willUpdate(e){e.has("preview")&&this.preview&&(this._config={type:"custom:easy-av-control-card",room:this.preview.room},this._view=this.preview,this._loaded=!0)}updated(e){let t=this._nowPlaying(),i=t?.playing===!0&&t.duration!==void 0||!!this._view?.current?.until||!!this._view?.cooling?.length;i&&this._tickTimer===void 0?this._tickTimer=window.setInterval(()=>this.requestUpdate(),1e3):!i&&this._tickTimer!==void 0&&(window.clearInterval(this._tickTimer),this._tickTimer=void 0),e.has("hass")&&!this._unsubscribe&&this._retryTimer===void 0&&this._subscribe()}_subscribe(){if(this.preview||!this.hass||!this._config?.room||this._unsubscribe||!this.isConnected)return;let e={type:`${$e}/control/subscribe`,room:this._config.room};this._config.entry_id&&(e.entry_id=this._config.entry_id);let t=this.hass.connection.subscribeMessage(i=>{this._unsubscribe===t&&(this._view=i,this._loaded=!0,this._subscribeError=void 0)},e);this._unsubscribe=t,t.catch(i=>{this._unsubscribe===t&&(this._subscribeError=i?.message??String(i),this._loaded=!0,this._unsubscribe=void 0,this._retryTimer=window.setTimeout(()=>{this._retryTimer=void 0,this._subscribe()},hi))})}_unsubscribeNow(){window.clearTimeout(this._retryTimer),this._retryTimer=void 0;let e=this._unsubscribe;this._unsubscribe=void 0,e?.then(t=>t()).catch(()=>{})}_resubscribe(){this._unsubscribeNow(),this._view=null,this._loaded=!1,this._subscribe()}_t(e,t){return L(this.hass?.language,e,t)}_call(e,t={}){if(!(!this.hass||!this._view)){if(this._haptic(),this.preview){this.dispatchEvent(new CustomEvent("preview-call",{detail:{service:e,data:t}}));return}this.hass.callService($e,e,{room:this._view.room,...t}).catch(i=>this._toast(i?.message??String(i)))}}_send(e,t={}){this._call("send_command",{command:e,...t})}_haptic(){this.dispatchEvent(new CustomEvent("haptic",{detail:"light",bubbles:!0,composed:!0}))}_toast(e){this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:e},bubbles:!0,composed:!0}))}_pressStart(e,t,i={}){if(e.button!==0)return;this._pressEnd(!1);let s={command:t,extra:i,sent:!1};this._press=s,di.has(t)&&(this._repeatTimer=window.setTimeout(()=>{s.sent=!0,this._send(t,i),this._repeatTimer=window.setInterval(()=>this._send(t,i),ui)},ci))}_pressEnd(e){let t=this._press;this._press=void 0,this._stopRepeat(),e&&t&&!t.sent&&this._send(t.command,t.extra)}_stopRepeat(){this._repeatTimer!==void 0&&(window.clearTimeout(this._repeatTimer),window.clearInterval(this._repeatTimer),this._repeatTimer=void 0)}_keySend(e,t,i={}){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._send(t,i))}render(){if(!this._config?.room)return a`<ha-card><div class="message">${this._t("no_room")}</div></ha-card>`;if(!this._loaded)return a`<ha-card><div class="message">${this._t("loading")}</div></ha-card>`;let e=this._view;return e?a`<ha-card>
      ${this._renderHeader(e)} ${this._renderStatus(e)} ${this._renderNowPlaying()}
      ${this._renderActivities(e)}
      ${e.remote?this._renderRemote(e):h}
    </ha-card>`:a`<ha-card>
        <div class="message warning">
          ${this._subscribeError??this._t("not_found",{room:this._config.room})}
        </div>
      </ha-card>`}_renderHeader(e){let t=e.activities.find(o=>o.id===e.activity),i=e.state!=="idle",s=t?`${t.name} \xB7 ${this._t(`state.${e.state}`)}`:this._t(`state.${e.state}`);return a`<div class="header">
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
        <ha-icon .icon=${pi[e.state]??"mdi:power"}></ha-icon>
      </button>
    </div>`}_renderStatus(e){let t=e.state==="starting"||e.state==="stopping",[i,s]=e.progress,o=s>0?Math.round(i/s*100):0,l=t?It(e.current,Date.now(),(d,c)=>this._t(d,c)):void 0;return a`
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
      ${(e.cooling??[]).map(d=>{let{text:c,time:u}=Nt(d,Date.now(),(p,m)=>this._t(p,m));return a`<div class="doing cooling">
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
    `}_nowPlaying(){let e=this._view?.remote?.media;return Dt(e?this.hass?.states[e]:void 0,Date.now())}_renderNowPlaying(){let e=this._nowPlaying();if(!e)return h;let t=[e.app,e.playing?void 0:this._t("now.paused")].filter(Boolean).join(" \xB7 ");return a`<div class="now">
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
                <span>${te(e.position)}</span><span>${te(e.duration)}</span>
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
    </div>`}_renderRemote(e){let{groups:t,buttons:i}=e.remote,s=t.navigation,o=s?ai.filter(c=>s.commands.includes(c)):[],l=s?Mt(this._padChoice(e),s.touchpad===!0):!1,d=t.transport?li.filter(c=>t.transport.commands.includes(c)):[];return d.includes("play_pause")&&(d=d.filter(c=>c!=="play"&&c!=="pause")),a`<div class="remote">
      ${t.volume||s||t.channels?a`<div class="main ${s?"":"no-nav"}">
            ${t.volume?this._renderVolumeRocker(t.volume):s?a`<div></div>`:h}
            ${s?l?this._renderTouchpad(s):this._renderDpad(s):h}
            ${t.channels?this._renderChannelRocker(t.channels):s?a`<div></div>`:h}
          </div>`:h}
      ${t.volume?.commands.includes("volume_set")?this._renderSlider(t.volume):h}
      ${s?a`<div class="row">
            ${o.map(c=>this._key(c))}${this._renderPadSwitch(e,l)}
          </div>`:h}
      ${d.length?a`<div class="row">${d.map(c=>this._key(c))}</div>`:h}
      ${i.length?a`<div class="buttons">${i.map(c=>this._customButton(c))}</div>`:h}
      ${e.remote.settings?.length?this._renderSettings(e,e.remote.settings):h}
    </div>`}_settingsShown(e){let t=Vt(e);if(this._settingsOpen.has(t))return this._settingsOpen.get(t);try{return window.localStorage.getItem(t)==="open"}catch{return!1}}_toggleSettings(e){let t=Vt(e),i=!this._settingsShown(e);this._settingsOpen.set(t,i);try{window.localStorage.setItem(t,i?"open":"closed")}catch{}this.requestUpdate()}_renderSettings(e,t){let i=this._settingsShown(e.room);return a`<div class="settings">
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
            ${t.map((s,o)=>a`${o===0||t[o-1].device!==s.device?a`<span class="setting-device">${this._settingDevice(s)}</span>`:h}${this._renderSetting(s)}`)}
          </div>`:h}
    </div>`}_renderSetting(e){if(e.setting==="entity")return this._renderEntitySetting(e);let t=this.hass?.states[e.entity_id],i=e.attribute?t?.attributes[e.attribute]:void 0,s=i==null?void 0:String(i);return this._settingRow(e,this._t(`setting.${e.setting}`),this._settingSelect(e,this._t(`setting.${e.setting}`),s,e.options))}_settingDevice(e){return e.name||this.hass?.states[e.device_entity_id]?.attributes.friendly_name||e.device}_settingRow(e,t,i){return a`<div class="setting">
      <span class="setting-name">${t}</span>
      ${i}
    </div>`}_settingSelect(e,t,i,s,o=!1){let l=i!==void 0&&!s.includes(i)?[i,...s]:s;return a`<select
      aria-label=${`${t}, ${this._settingDevice(e)}`}
      .value=${Ke(i??"")}
      ?disabled=${o||!l.length}
      @change=${d=>{let c=d.target.value;c&&c!==i&&this._send(e.command,{device:e.device,value:c})}}
    >
      ${i===void 0?a`<option value="" disabled>–</option>`:h}
      ${l.map(d=>a`<option value=${d} ?selected=${d===i}>${d}</option>`)}
    </select>`}_renderEntitySetting(e){let t=this.hass?.states[e.entity_id],i=e.label||t?.attributes.friendly_name||e.entity_id,s=!t||t.state==="unavailable"||t.state==="unknown",o=e.entity_id.split(".")[0];if(o==="number"||o==="input_number"){let d=Number(t?.attributes.min??0),c=Number(t?.attributes.max??100),u=Number(t?.attributes.step??1),m=this._settingDrafts.get(e.entity_id)??(s?void 0:Number(t.state)),f=m===void 0||Number.isNaN(m)?"\u2013":`${d<0&&m>0?"+":""}${m}`;return this._settingRow(e,i,a`<span class="setting-range">
          <input
            type="range"
            aria-label=${`${i}, ${this._settingDevice(e)}`}
            min=${d}
            max=${c}
            step=${u}
            .value=${Ke(String(m??d))}
            ?disabled=${s}
            @input=${_=>{this._settingDrafts.set(e.entity_id,Number(_.target.value)),this.requestUpdate()}}
            @change=${_=>{this._settingDrafts.delete(e.entity_id),this._send(e.command,{device:e.device,value:Number(_.target.value)})}}
          />
          <span class="value">${f}</span>
        </span>`)}if(o==="select"||o==="input_select"){let d=Array.isArray(t?.attributes.options)?t.attributes.options.map(String):[];return this._settingRow(e,i,this._settingSelect(e,i,s?void 0:t.state,e.options.length?e.options:d,s))}let l=t?.state==="on";return this._settingRow(e,i,a`<button
        class="key toggle ${l?"active":""}"
        aria-label=${`${i}, ${this._settingDevice(e)}`}
        aria-pressed=${l?"true":"false"}
        ?disabled=${s}
        @click=${()=>this._send(e.command,{device:e.device,value:l?"off":"on"})}
      >
        ${this._t(l?"toggle.on":"toggle.off")}
      </button>`)}_key(e,t="key",i,s){let o=H(e,l=>this._t(l));return a`<button
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
      ${i??a`<ha-icon .icon=${qe[e]??"mdi:circle-small"}></ha-icon>`}
    </button>`}_renderVolumeRocker(e){let t=this._volumeState(e).muted;return a`<div class="rocker">
      ${e.commands.includes("volume_up")?this._key("volume_up"):a`<span></span>`}
      ${e.commands.includes("mute")?this._key("mute",`key label ${t?"active":""}`,a`<ha-icon .icon=${t?"mdi:volume-off":"mdi:volume-high"}></ha-icon>`,t):a`<span class="label">${this._t("rocker.volume")}</span>`}
      ${e.commands.includes("volume_down")?this._key("volume_down"):a`<span></span>`}
    </div>`}_renderChannelRocker(e){return a`<div class="rocker">
      ${e.commands.includes("channel_up")?this._key("channel_up"):a`<span></span>`}
      <span class="label">${this._t("rocker.channels")}</span>
      ${e.commands.includes("channel_down")?this._key("channel_down"):a`<span></span>`}
    </div>`}_renderDpad(e){let t=s=>e.commands.includes(s),i=(s,o)=>t(s)?this._key(s,`key ${o}`,s==="ok"?"OK":void 0):a`<span></span>`;return a`<div class="dpad">
      <span></span>${i("up","up")}<span></span>
      ${i("left","left")}${i("ok","ok")}${i("right","right")}
      <span></span>${i("down","down")}<span></span>
    </div>`}_padChoice(e){if(!e.activity)return null;let t=Fe(e.room,e.activity);if(this._padChoices.has(t))return this._padChoices.get(t);try{return window.localStorage.getItem(t)}catch{return null}}_renderPadSwitch(e,t){let i=this._t(t?"pad.show_arrows":"pad.show_touchpad");return a`<button
      class="key pad-switch"
      title=${i}
      aria-label=${i}
      @click=${()=>{if(!e.activity)return;let s=Fe(e.room,e.activity),o=t?"off":"on";this._padChoices.set(s,o);try{window.localStorage.setItem(s,o)}catch{}this.requestUpdate()}}
    >
      <ha-icon .icon=${t?"mdi:arrow-all":"mdi:gesture-tap"}></ha-icon>
    </button>`}_renderTouchpad(e){let t=s=>e.commands.includes(s),i={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right",Enter:"ok"," ":"ok"};return a`<div
      class="touchpad"
      role="group"
      tabindex="0"
      aria-label=${this._t("touchpad")}
      title=${this._t("touchpad")}
      @pointerdown=${s=>{s.button===0&&(s.currentTarget.setPointerCapture(s.pointerId),this._swipe=new ke,this._swipe.start(s.clientX,s.clientY,s.timeStamp))}}
      @pointermove=${s=>{for(let o of this._swipe?.move(s.clientX,s.clientY)??[])t(o)&&this._send(o)}}
      @pointerup=${s=>{let o=this._swipe?.end(s.clientX,s.clientY,s.timeStamp);this._swipe=void 0,o&&t("ok")&&this._send("ok")}}
      @pointercancel=${()=>this._swipe=void 0}
      @keydown=${s=>{let o=i[s.key];o&&t(o)&&(s.preventDefault(),this._send(o))}}
      @contextmenu=${s=>s.preventDefault()}
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
        @input=${s=>{this._volumeDraft=Number(s.target.value)}}
        @change=${s=>{let o=Number(s.target.value);this._volumeDraft=void 0,this._send("volume_set",{value:o/100})}}
      />
      <span class="value">${t!==void 0||this._volumeDraft!==void 0?i:"\u2013"}</span>
    </div>`}_customButton(e){let t=e.name??H(e.command,s=>this._t(s)),i={};return e.device&&(i.device=e.device),e.value!==null&&e.value!==void 0&&(i.value=e.value),a`<button
      class="custom"
      title=${t}
      @pointerdown=${s=>this._pressStart(s,e.command,i)}
      @pointerup=${()=>this._pressEnd(!0)}
      @pointerleave=${()=>this._pressEnd(!1)}
      @pointercancel=${()=>this._pressEnd(!1)}
      @keydown=${s=>this._keySend(s,e.command,i)}
    >
      ${e.icon||qe[e.command]?a`<ha-icon .icon=${e.icon??qe[e.command]}></ha-icon>`:h}
      <span>${t}</span>
    </button>`}};ie.properties={hass:{attribute:!1},preview:{attribute:!1},_config:{state:!0},_view:{state:!0},_loaded:{state:!0},_subscribeError:{state:!0},_volumeDraft:{state:!0}},ie.styles=v`
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
  `;customElements.get("easy-av-control-card")||customElements.define("easy-av-control-card",ie);function mi(r,n){let e=r.entities?.[n]?.device_id,i=(e?r.devices?.[e]:void 0)?.identifiers?.find(([s])=>s===$e);return i?i[1]:null}var xe=window;xe.customCards=xe.customCards??[];xe.customCards.some(r=>r.type==="easy-av-control-card")||xe.customCards.push({type:"easy-av-control-card",name:"Easy AV Control Remote",description:"Remote control for an Easy AV Control room",preview:!0,documentationURL:"https://github.com/Ltek/easy-av-control#the-card",getEntitySuggestion:(r,n)=>{let e=mi(r,n);return e?{config:{type:"custom:easy-av-control-card",room:e}}:null}});var _i=400,ne=class extends g{constructor(){super(...arguments);this._request=0}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._timer)}willUpdate(e){if(e.has("activityId")&&(this._pressed=void 0),["room","roomId","activityId"].some(t=>e.has(t))){window.clearTimeout(this._timer);let t=this._preview===void 0&&this._failed===void 0;this._timer=window.setTimeout(()=>this._load(),t?0:_i)}}async _load(){let e=++this._request;try{let t=await this.hass.callWS({type:"easy_av_control/config/remote",room:this.roomId,config:this.room,activity:this.activityId});e===this._request&&(this._preview=t,this._failed=void 0)}catch(t){e===this._request&&(this._failed=t.message??String(t))}}_t(e,t){return $(this.hass?.language,e,t)}_entity(e){let t=String(e??"");return this.hass.states[t]?.attributes.friendly_name||t}_device(e){let t=String(e??""),i=this.room.devices?.[t];return i?.name||(i?.entity_id?this._entity(i.entity_id):"")||t}_button(e,t){let[i,s]=t.split("|"),o=e.remote?.buttons.find(d=>d.command===i&&(d.device??"")===s);if(o?.name)return o.name;let l=e.remote?.settings?.find(d=>d.command===i&&d.device===s);return l?.setting==="entity"?l.label||this._entity(l.entity_id):H(i,d=>this._t(d))}_onCall(e){let{service:t,data:i}=e.detail;t==="send_command"&&(this._pressed=`${i.command}|${i.device??""}`)}_describe(e){let t=e.device?this._device(e.device):this._t("preview.this_activity");switch(e.via){case"media_player":case"entity":return{to:t,how:`${e.action} \u2192 ${this._entity(e.entity_id)}`};case"remote":return{to:t,how:`remote.send_command "${e.key}" \u2192 ${this._entity(e.entity_id)}`};case"device_commands":return{to:t,how:this._t("preview.device_commands",{actions:(e.actions??[]).join(", ")})};case"activity_commands":return{to:t,how:this._t("preview.activity_commands",{actions:(e.actions??[]).join(", ")})};default:return{to:t,how:e.device?this._t("preview.unknown_on_device",{device:t}):this._t("preview.unknown")}}}_renderPressed(e,t){let i=this._pressed?t[this._pressed]:void 0;if(!this._pressed||!i)return a`<p class="pressed hint">${this._t("preview.tap")}</p>`;let{to:s,how:o}=this._describe(i);return a`<p class="pressed ${i.via?"":"bad"}">
      <span class="what">${this._button(e,this._pressed)} → ${s}</span>
      <span class="how">${o}</span>
      ${i.ready?a`<span class="note">${this._t("preview.ready")}</span>`:h}
    </p>`}_renderRoutes(e){return a`<h4>${this._t("preview.groups")}</h4>
      <ul class="routes">
        ${e.map(t=>{let i=t.mode==="hidden"?this._t("preview.hidden"):t.device?`${this._device(t.device)} (${this._t(`preview.mode_${t.mode}`)})`:this._t("preview.no_device"),s=t.commands.length?t.commands.map(o=>H(o,l=>this._t(l))).join(", "):t.mode==="hidden"?"":t.device?this._t("preview.no_keys",{device:this._device(t.device)}):"";return a`<li class=${t.commands.length?"":"off"}>
            <span class="group">${this._t(`field.${t.group}`)}</span>
            <span class="where">${i}</span>
            ${s?a`<span class="keys">${s}</span>`:h}
          </li>`})}
      </ul>`}render(){if(this._failed)return a`<p class="error">${this._t("flow.failed",{error:this._failed})}</p>`;let e=this._preview;if(!e)return a`<p class="hint">${this._t("loading")}</p>`;if(e.error){let l=e.error.path.join(".");return a`<p class="error">
        ${this._t("flow.invalid",{error:l?`${l}: ${e.error.message}`:e.error.message})}
      </p>`}let{view:t,targets:i,routes:s}=e,o=Object.entries(i).filter(([,l])=>!l.via);return a`<div class="layout">
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
        ${this._renderRoutes(s)}
      </div>
    </div>`}};ne.properties={hass:{attribute:!1},room:{attribute:!1},roomId:{attribute:!1},activityId:{attribute:!1},_preview:{state:!0},_failed:{state:!0},_pressed:{state:!0}},ne.styles=[b,y,v`
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
  `];customElements.get("easy-av-control-remote-preview")||customElements.define("easy-av-control-remote-preview",ne);function fi(r){let n=(r??"").split(",").map(e=>e.trim()).filter(Boolean);return n.length>1?n:n[0]}var oe=(r,n=1,e=0)=>({number:{min:e,max:r,step:n,mode:"slider",unit_of_measurement:"s"}}),Ye=oe(600),gi={section_device:"mdi:television",section_state:"mdi:state-machine",section_power:"mdi:power-socket-eu",section_delays:"mdi:timer-sand",section_ready:"mdi:lan-connect",card_settings:"mdi:tune-vertical",section_general:"mdi:information-outline",section_activity_devices:"mdi:format-list-numbered",steps:"mdi:playlist-play",remote:"mdi:remote",quick_select:"mdi:gesture-tap-button",section_flow:"mdi:sitemap-outline",section_remote_preview:"mdi:cellphone-screenshot"},vi=oe(120),se=class extends g{constructor(){super();this._relatedKey="";this._detectAsked=new Set;this._toggled=new Set;this._label=e=>this._t(`field.${e.name}`);this._helper=e=>{let t=`helper.${e.name}`,i=this._t(t);return i===t?void 0:i};this._tab="devices",this._view={kind:"list"},this.sources={},this.soundModes={},this._related={},this._detect={},this.profiles=[]}_loadRelated(){let e=[...new Set(Object.values(this.room?.devices??{}).map(i=>i.entity_id).filter(Boolean))].sort(),t=e.join(",");!this.hass||t===this._relatedKey||(this._relatedKey=t,this.hass.callWS({type:"easy_av_control/config/related",entity_ids:e}).then(i=>{t===this._relatedKey&&(this._related=i)}).catch(()=>{}))}willUpdate(e){(e.has("room")||e.has("hass"))&&this._loadRelated(),e.has("roomId")&&e.get("roomId")!==void 0&&(this._view={kind:"list"},this._notice=void 0)}_t(e,t){return $(this.hass?.language,e,t)}_emit(e){this.dispatchEvent(new CustomEvent("room-changed",{detail:{room:e}}))}_show(e){this._view=e,this._notice=void 0,window.scrollTo({top:0})}render(){let e=this._view;if(e.kind==="device"&&this.room.devices?.[e.id])return this._renderDevice(e.id,this.room.devices[e.id]);if(e.kind==="activity"&&this.room.activities?.[e.id])return this._renderActivity(e.id,this.room.activities[e.id]);let t=[{value:"__last",label:this._t("default_last")},...Object.entries(this.room.activities??{}).map(([i,s])=>({value:i,label:s.name??i}))];return a`
      <ha-form
        .hass=${this.hass}
        .data=${{name:this.room.name??"",area_id:this.room.area_id??void 0,default_activity:this.room.default_activity??"__last"}}
        .schema=${[{name:"name",required:!0,selector:{text:{}}},{name:"area_id",selector:{area:{}}},{name:"default_activity",selector:{select:{options:t,mode:"dropdown"}}}]}
        .computeLabel=${i=>this._t(`room_${i.name==="area_id"?"area":i.name}`)}
        .computeHelper=${this._helper}
        @value-changed=${i=>{let s=i.detail.value;this._emit(w({...this.room,name:s.name,area_id:s.area_id,default_activity:s.default_activity==="__last"?void 0:s.default_activity}))}}
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
      <button class="ltek-btn danger delete-room" @click=${()=>this.dispatchEvent(new CustomEvent("delete-room"))}>
        <ha-icon icon="mdi:trash-can-outline"></ha-icon>
        ${this._t("delete_room")}
      </button>
    `}_detailHeader(e,t,i){return a`<div class="detail-head">
        <button class="back" @click=${()=>this._show({kind:"list"})}>
          <ha-icon icon="mdi:arrow-left"></ha-icon>
          <span>${e}</span>
        </button>
        <button class="ltek-btn danger" @click=${i}>
          <ha-icon icon="mdi:trash-can-outline"></ha-icon> ${this._t("delete")}
        </button>
      </div>
      <h2>${t}</h2>
      ${this._notice?a`<div class="notice">${this._notice}</div>`:h}`}_panel(e,t,i,s,o,l=!0){let d=this._toggled.has(e)?!l:l;return a`<details
      class="ltek-sec"
      ?open=${d}
      @toggle=${c=>{c.target.open===l?this._toggled.delete(e):this._toggled.add(e)}}
    >
      <summary><ha-icon icon=${t}></ha-icon>${i}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="ltek-body">${s?a`<p class="ltek-hint">${s}</p>`:h}${o}</div>
    </details>`}_card(e,t,i,s){let o=Object.entries(gi).find(([l])=>this._t(l)===e);return this._panel(`${this._view.kind}:${e}`,s??o?.[1]??"mdi:tune-variant",e,t,i)}_advanced(e,t){let i=this._t("section_advanced");return this._panel(`${this._view.kind}:${i}`,"mdi:cog-outline",i,e,t,!1)}_deviceTitle(e,t){let i=t.entity_id?this.hass.states[t.entity_id]:void 0;return t.name||i?.attributes.friendly_name||(t.entity_id?e:this._t("new_device"))}_renderDeviceList(){let e=Object.entries(this.room.devices??{});return a`
      <p class="ltek-hint">${this._t("devices_intro")}</p>
      <div class="ltek-list">
        <button class="ltek-add" @click=${this._addDevice}>+ ${this._t("add_device")}</button>
      ${e.length?a`
            ${e.map(([t,i])=>{let s=!i.entity_id||this._entityKnown(i.entity_id);return this._row(this._deviceTitle(t,i),i.entity_id||this._t("no_entity"),()=>this._show({kind:"device",id:t}),s?void 0:this._t("entity_missing"),this._deviceIcon(i))})}`:a`<p class="ltek-hint">${this._t("devices_empty")}</p>`}
      </div>
    `}_entityKnown(e){return e in this.hass.states||e in(this.hass.entities??{})}_row(e,t,i,s,o="mdi:play-circle-outline"){return a`<button class="ltek-item" @click=${i}>
      <ha-icon class="lead" icon=${o}></ha-icon>
      <span class="ltek-item-text">
        <span class="ltek-name">${e}</span>
        <span class="ltek-subline">${t}</span>
        ${s?a`<span class="ltek-warn ltek-subline">${s}</span>`:h}
      </span>
      <ha-icon class="ltek-act" icon="mdi:chevron-right"></ha-icon>
    </button>`}_deviceIcon(e){let i=(e.entity_id?this.hass.states[e.entity_id]:void 0)?.attributes.icon;if(i)return i;let s=e.entity_id?.split(".")[0];return s==="remote"?"mdi:remote":s==="switch"?"mdi:power-socket-eu":"mdi:television"}_deviceData(e){let t=e.ready??null;return{entity_id:e.entity_id,name:e.name,remote_entity:e.remote_entity??void 0,power_switch:e.power_switch??void 0,delay_after_power:e.delay_after_power,delay_after_on:e.delay_after_on,delay_after_off:e.delay_after_off,ready_enabled:t!==null,ready_entity:t?.entity_id,ready_state:Array.isArray(t?.state)?t?.state.join(", "):t?.state,ready_timeout:t?.timeout,ready_reload:t?.reload_integration,ready_on_timeout:t?.on_timeout,commands:e.commands}}_deviceForm(e,t,i){return a`<ha-form
      .hass=${this.hass}
      .data=${t}
      .schema=${i}
      .computeLabel=${this._label}
      .computeHelper=${this._helper}
      @value-changed=${s=>this._deviceChanged(e,{...t,...s.detail.value})}
    ></ha-form>`}_remoteOf(e){let t=this.hass.entities??{},i=e?t[e]?.device_id:void 0;if(i)return Object.values(t).find(s=>s?.device_id===i&&s.entity_id.startsWith("remote."))?.entity_id}_renderDevice(e,t){let i=this._deviceData(t),s=t.ready??null,o=this._remoteOf(t.entity_id),l=s?.entity_id===o&&s?.reload_integration===!0&&t.remote_entity===o,d=Be(this.room,e);return a`
      ${this._detailHeader(this._t("tab_devices"),this._deviceTitle(e,t),()=>this._deleteDevice(e))}
      ${d.length?a`<p class="ltek-hint">${this._t("used_by",{where:d.join(", ")})}</p>`:h}

      ${this._card(this._t("section_device"),this._t("hint_device"),this._deviceForm(e,i,[{name:"entity_id",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"remote_entity",selector:{entity:{filter:{domain:"remote"}}}}]),"mdi:television")}
      ${this._card(this._t("section_state"),this._t("hint_state"),this._renderState(e,t),"mdi:state-machine")}
      ${this._card(this._t("section_power"),this._t("hint_power"),this._deviceForm(e,i,[{name:"power_switch",selector:{entity:{filter:{domain:["switch","input_boolean","light"]}}}},...t.power_switch?[{name:"delay_after_power",selector:vi}]:[]]),"mdi:power-socket-eu")}
      ${this._card(this._t("section_delays"),this._t("hint_delays"),this._deviceForm(e,i,[{name:"delay_after_on",selector:Ye},{name:"delay_after_off",selector:Ye}]),"mdi:timer-sand")}
      ${this._card(this._t("section_ready"),this._t("hint_ready"),a`${o&&!l?a`<button class="ltek-btn preset" @click=${()=>this._applyReadyPreset(e,t,o)}>
                ${this._t("ready_preset",{entity:o})}
              </button>`:h}
          ${this._deviceForm(e,i,[{name:"ready_enabled",selector:{boolean:{}}},...s!==null?[{name:"ready_entity",selector:{entity:{}}},{name:"ready_state",selector:{text:{}}},{name:"ready_timeout",selector:Ye},{name:"ready_reload",selector:{boolean:{}}},{name:"ready_on_timeout",selector:{select:{options:[{value:"abort",label:this._t("on_timeout_abort")},{value:"continue",label:this._t("on_timeout_continue")}],mode:"dropdown"}}}]:[]])}`)}
      ${this._card(this._t("card_settings"),this._t("device_settings_hint"),this._renderDeviceSettings(e,t))}
      ${this._advanced(this._t("hint_device_advanced"),a`<label class="id">
            ${this._t("device_id")}
            <input
              .value=${e}
              @change=${c=>this._renameDevice(e,c.target.value)}
            />
          </label>
          ${this._deviceForm(e,i,[{name:"commands",selector:{object:{}}}])}`)}
    `}_detectFor(e){if(!e.entity_id||!this.hass)return;let t=Object.fromEntries(be.filter(s=>e[s]!==void 0).map(s=>[s,e[s]])),i=JSON.stringify([e.entity_id,t]);return this._detectAsked.has(i)||(this._detectAsked.add(i),this.hass.callWS({type:"easy_av_control/config/detect",entity_id:e.entity_id,device:t}).then(s=>this._detect={...this._detect,[i]:s}).catch(()=>this._detectAsked.delete(i))),this._detect[i]}_renderState(e,t){let i=this._detectFor(t);if(!t.entity_id)return a`<p class="ltek-hint">${this._t("no_entity")}</p>`;let s=kt(t,i),o=t.entity_id?this.hass.entities?.[t.entity_id]?.platform:void 0,l=[{value:"__auto",label:this._t("profile.auto")},...this.profiles.filter(m=>!m.generic&&(m.integration===o||m.id===t.profile)).map(m=>({value:m.id,label:`${m.name} (${this._t(m.source==="user"?"profiles_yours":"profiles_builtin")})`}))],d=!!i?.state,c=(m,f)=>f.map(_=>({value:_,label:this._t(`${m}.${_}`)})),u=Ie.map(m=>({value:m,label:this._t(m==="stop"?"failure_off.stop":`failure.${m}`)})),p=[...l.length>1?[{name:"profile",selector:{select:{options:l,mode:"dropdown"}}}]:[],{name:"state_source",selector:{select:{mode:"dropdown",options:[{value:"auto",label:this._t("state_source.auto")},{value:"none",label:this._t("state_source.none")},...s.state_source==="custom"?[{value:"custom",label:"YAML"}]:[]]}}},...d?[{name:"wait_on",selector:{select:{mode:"dropdown",options:c("wait",Ne)}}},{name:"timeout_on",selector:oe(600,5,5)},{name:"on_failure_on",selector:{select:{mode:"dropdown",options:c("failure",Ie)}}},{name:"wait_off",selector:{select:{mode:"dropdown",options:c("wait",Ne)}}},{name:"timeout_off",selector:oe(900,5,5)},{name:"on_failure_off",selector:{select:{mode:"dropdown",options:u}}},{name:"debounce",selector:oe(30,.5)},...i?.found?.picture?[{name:"on_failure_picture",selector:{select:{mode:"dropdown",options:c("failure",["warn","stop"])}}}]:[]]:[]];return a`${this._renderDetected(e,t,i)}
      ${i&&!d?a`<p class="ltek-hint">${this._t("state_fixed_only")}</p>`:h}
      <ha-form
        .hass=${this.hass}
        .data=${s}
        .schema=${p}
        .computeLabel=${m=>this._t(m.name==="state_source"?"state_source":`field.${m.name}`)}
        .computeHelper=${this._helper}
        @value-changed=${m=>{let f=$t(t,{...s,...m.detail.value},i);this._emit({...this.room,devices:{...this.room.devices,[e]:f}})}}
      ></ha-form>`}_renderDetected(e,t,i){if(!i)return a`<p class="ltek-hint">${this._t("loading")}</p>`;if(!i.profile)return a`<p class="ltek-hint">${this._t("detected_none")}</p>`;let{profile:s,found:o,state:l}=i,d=xt(t,i),c=[];if(o?.indicator&&c.push(this._t("detected_found_indicator",{entity:this._entityName(o.indicator)})+(o.attribute?`, ${this._t("detected_found_attribute",{attribute:o.attribute})}`:"")),o?.remote_entity&&c.push(this._t("detected_found_remote",{entity:this._entityName(o.remote_entity)})),o?.power_switch&&c.push(this._t("detected_found_outlet",{entity:this._entityName(o.power_switch)})),o?.settings?.length&&c.push(this._t("detected_found_settings",{entities:o.settings.map(u=>this._entityName(u)).join(", ")})),i.siblings.length){c.push(this._t("detected_siblings",{integrations:i.siblings.map(p=>p.integration).join(", ")}));let u=Object.entries(i.roles).filter(([,p])=>p).map(([p,m])=>this._t("detected_role",{role:this._t(`role.${p}`),integration:m}));u.length&&c.push(u.join(" \xB7 "))}return a`<div class="ltek-item detected open">
      <ha-icon class="lead" icon="mdi:auto-fix"></ha-icon>
      <span class="ltek-item-text">
        <span class="ltek-name">${this._t("detected",{name:s.name})}</span>
        ${c.map(u=>a`<span class="ltek-subline">${u}</span>`)}
        ${l?a`<span class="ltek-subline">${this._t("detected_now",{value:l.value??l.group})}</span>`:h}
      </span>
      <span class="ltek-badge ${s.source==="user"?"lib":"accent"}">
        ${this._t(s.source==="user"?"profiles_yours":"profiles_builtin")}
      </span>
      ${s.tested?h:a`<span class="ltek-badge warn" title=${this._t("profile_untested")}>!</span>`}
      ${Object.keys(d).length?a`<button
            class="ltek-btn primary"
            @click=${()=>this._emit({...this.room,devices:{...this.room.devices,[e]:{...t,...d}}})}
          >
            ${this._t("detected_use")}
          </button>`:a`<span class="ltek-badge ok">${this._t("detected_applied")}</span>`}
    </div>`}_entityName(e){return this.hass.states[e]?.attributes.friendly_name??e}_applyReadyPreset(e,t,i){let s={entity_id:i,state:"on",timeout:60,reload_integration:!0,on_timeout:"continue"};this._emit({...this.room,devices:{...this.room.devices,[e]:{...t,ready:s,remote_entity:i}}})}_unsaved(e,t){return!(t in(this.saved?.[e]??{}))}_deviceChanged(e,t){let i=w({entity_id:t.entity_id,name:t.name,remote_entity:t.remote_entity,power_switch:t.power_switch,ready:t.ready_enabled?w({entity_id:t.ready_entity,state:fi(t.ready_state),timeout:t.ready_timeout,reload_integration:t.ready_reload,on_timeout:t.ready_on_timeout}):void 0,delay_after_power:t.power_switch?t.delay_after_power:void 0,delay_after_on:t.delay_after_on,delay_after_off:t.delay_after_off,commands:t.commands}),s=this.room.devices?.[e]??{};for(let c of be)s[c]!==void 0&&(i[c]=s[c]);let o=this.room.devices?.[e]?.settings;o!==void 0&&(i.settings=o),t.ready_enabled&&!i.ready&&(i.ready={});let l={...this.room,devices:{...this.room.devices,[e]:i}},d=i.entity_id?.split(".")[1];if(d&&this._unsaved("devices",e)&&i.entity_id!==this.room.devices?.[e]?.entity_id){let c=R(I(d),Object.keys(l.devices??{}).filter(u=>u!==e));if(c!==e){this._emit(Ue(l,e,c)),this._view={kind:"device",id:c};return}}this._emit(l)}_addDevice(){let e=R("device",Object.keys(this.room.devices??{}));this._emit({...this.room,devices:{...this.room.devices,[e]:{entity_id:""}}}),this._show({kind:"device",id:e})}_renameDevice(e,t){let i=I(t);if(!i||i===e){this.requestUpdate();return}let s=R(i,Object.keys(this.room.devices??{}).filter(o=>o!==e));this._emit(Ue(this.room,e,s)),this._view={kind:"device",id:s}}_deleteDevice(e){let t=Be(this.room,e);if(t.length){this._notice=this._t("device_in_use",{id:e,where:t.join(", ")});return}if(!window.confirm(`${this._t("delete")}: ${this._deviceTitle(e,this.room.devices[e])}?`))return;let i={...this.room.devices};delete i[e],this._emit({...this.room,devices:i}),this._show({kind:"list"})}_renderActivityList(){let e=Object.entries(this.room.activities??{}).sort(([i,s],[o,l])=>(s.order??1e3)-(l.order??1e3)||(s.name??i).localeCompare(l.name??o,void 0,{sensitivity:"base"})),t=i=>(i.devices??[]).map(s=>this.room.devices?.[s]?.name??s).join(" \u2192 ");return a`
      <p class="ltek-hint">${this._t("activities_intro")}</p>
      <div class="ltek-list">
        ${Object.keys(this.room.devices??{}).length?a`<button class="ltek-add" @click=${this._addActivity}>+ ${this._t("add_activity")}</button>`:a`<p class="ltek-hint">${this._t("needs_devices")}</p>`}
        ${e.length?e.map(([i,s])=>this._row(s.name??i,t(s)||this._t("no_devices"),()=>this._show({kind:"activity",id:i}),void 0,s.icon??"mdi:play-circle-outline")):a`<p class="ltek-hint">${this._t("activities_empty")}</p>`}
      </div>
    `}_setActivity(e,t){this._emit({...this.room,activities:{...this.room.activities,[e]:w(t)}})}_renderActivity(e,t){let i=Object.keys(this.room.devices??{}),s=t.devices??[],o=[{value:"__auto",label:this._t("route_auto")},{value:"__none",label:this._t("route_none")},...s.map(c=>({value:c,label:this.room.devices?.[c]?.name??c}))],l=t.remote??{},d={};for(let c of N)d[c]=c in l?l[c]===null?"__none":l[c]:"__auto";return d.touchpad=l.touchpad===!0?"on":l.touchpad===!1?"off":"auto",a`
      ${this._detailHeader(this._t("tab_activities"),t.name??e,()=>this._deleteActivity(e,t))}

      ${this._card(this._t("section_general"),this._t("hint_general"),a`<ha-form
          .hass=${this.hass}
          .data=${{name:t.name,icon:t.icon,order:t.order}}
          .schema=${[{name:"name",required:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"order",selector:{number:{min:0,max:999,mode:"box"}}}]}
          .computeLabel=${this._label}
          @value-changed=${c=>{let u=c.detail.value;this._activityGeneralChanged(e,t,u)}}
        ></ha-form>`)}

      ${this._card(this._t("section_activity_devices"),this._t("hint_activity_devices"),a`${s.length?a`<ol class="ordered">
                ${s.map((c,u)=>a`<li>
                    <span class="li-text">
                      <span>${this.room.devices?.[c]?.name??c}</span>
                      <span class="sub">${this.room.devices?.[c]?.entity_id??""}</span>
                    </span>
                    ${this._moveButtons(s,u,p=>this._setActivity(e,{...t,devices:p}))}
                  </li>`)}
              </ol>`:h}
          ${i.some(c=>!s.includes(c))?this._picker(this._t("add_device_to_activity"),i.filter(c=>!s.includes(c)).map(c=>({value:c,label:this.room.devices?.[c]?.name??c})),c=>this._setActivity(e,{...t,devices:[...s,c]})):h}`)}

      ${this._card(this._t("steps"),this._t("hint_steps"),a`${(t.steps??[]).map((c,u)=>this._renderStep(e,t,c,u))}
          ${this._picker(this._t("add_step"),Et.map(c=>({value:c,label:this._t(`step.${c}`)})),c=>this._setActivity(e,{...t,steps:[...t.steps??[],{type:c}]}))}`)}

      ${this._card(this._t("section_flow"),this._t("hint_flow"),a`<easy-av-control-flow
          .hass=${this.hass}
          .room=${this.room}
          .roomId=${this.roomId}
          .activityId=${e}
        ></easy-av-control-flow>`)}

      ${this._card(this._t("remote"),this._t("hint_remote"),a`<ha-form
          .hass=${this.hass}
          .data=${d}
          .schema=${[...N.map(c=>({name:c,selector:{select:{options:o,mode:"dropdown"}}})),{name:"touchpad",selector:{select:{options:["auto","on","off"].map(c=>({value:c,label:this._t(`touchpad_${c}`)})),mode:"dropdown"}}}]}
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

      ${this._advanced(this._t("hint_activity_advanced"),a`<p class="ltek-hint">${this._t("activity_id_hint",{id:e})}</p>
          <ha-form
            .hass=${this.hass}
            .data=${{buttons:(l.buttons??[]).filter(c=>!J(c)),activity_commands:t.commands}}
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
    `}_activityGeneralChanged(e,t,i){let s=w({...t,name:i.name,icon:i.icon,order:i.order}),o=i.name?.trim();if(!o||o===t.name||!this._unsaved("activities",e)){this._setActivity(e,s);return}let l=R(I(o),Object.keys(this.room.activities??{}).filter(u=>u!==e));if(l===e){this._setActivity(e,s);return}let d={};for(let[u,p]of Object.entries(this.room.activities??{}))d[u===e?l:u]=u===e?s:p;let c={...this.room,activities:d};c.default_activity===e&&(c.default_activity=l),this._emit(c),this._view={kind:"activity",id:l}}_renderStep(e,t,i,s){let o=t.steps??[],l=d=>this._setActivity(e,{...t,steps:d});return a`<div class="step">
      <div class="step-head">
        <span class="title">${s+1}. ${this._t(`step.${i.type}`)}</span>
        ${this._moveButtons(o,s,l)}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${i}
        .schema=${Ot(this.hass,this.room,i,d=>this._t(d),this.sources,this.soundModes)}
        .computeLabel=${this._label}
        @value-changed=${d=>{let c=[...o];c[s]=w({...d.detail.value,type:i.type}),l(c)}}
      ></ha-form>
    </div>`}_routesChanged(e,t,i){let s={};for(let o of N)i[o]==="__none"?s[o]=null:i[o]&&i[o]!=="__auto"&&(s[o]=i[o]);(i.touchpad==="on"||i.touchpad==="off")&&(s.touchpad=i.touchpad==="on"),t.remote?.buttons&&(s.buttons=t.remote.buttons),t.remote?.settings&&(s.settings=t.remote.settings),this._setActivity(e,{...t,remote:Object.keys(s).length?s:void 0})}_extrasChanged(e,t,i){let s=(t.remote?.buttons??[]).filter(J),o=[...Array.isArray(i.buttons)?i.buttons:[],...s],l={...t.remote,buttons:o};this._setActivity(e,{...t,remote:ye(l),commands:i.activity_commands})}_renderQuickSelect(e,t){let i=t.remote?.buttons??[],s=i.filter(u=>!J(u)),o=i.filter(J),l=u=>{let p={...t.remote,buttons:[...s,...u]};this._setActivity(e,{...t,remote:ye(p)})},d=(t.devices??[]).filter(u=>this.room.devices?.[u]?.entity_id?.startsWith("media_player.")),c=d.map(u=>({value:u,label:this.room.devices?.[u]?.name??u}));return a`${o.map((u,p)=>{let m=this.room.devices?.[u.device]?.entity_id;return a`<div class="step">
          <div class="step-head">
            <span class="title">${u.name||u.source||""}</span>
            ${this._moveButtons(o,p,l)}
          </div>
          <ha-form
            .hass=${this.hass}
            .data=${{device:u.device,source:u.source,label:u.name,icon:u.icon}}
            .schema=${[{name:"device",required:!0,selector:{select:{options:c,mode:"dropdown"}}},{name:"source",required:!0,selector:{select:{options:Le(this.hass,this.sources,m),custom_value:!0,mode:"dropdown"}}},{name:"label",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]}
            .computeLabel=${this._label}
            .computeHelper=${this._helper}
            @value-changed=${f=>{let _=f.detail.value,A=[...o];A[p]=w({device:_.device,source:_.source??"",name:_.label,icon:_.icon},["source"]),l(A)}}
          ></ha-form>
        </div>`})}
      ${d.length?a`<button class="ltek-add" @click=${()=>l([...o,{device:d[d.length-1],source:""}])}>
            + ${this._t("add_quick_select")}
          </button>`:a`<p class="ltek-hint">${this._t("quick_select_no_player")}</p>`}`}_settingList(e,t){let i=Ge[String(t)]??"source_list",s=i==="sound_mode_list"?this.soundModes:this.sources;return Q(this.hass,s,this.room.devices?.[String(e)]?.entity_id,i)}_describeSetting(e,t){let i=e.entity?e.name||this.hass.states[e.entity]?.attributes.friendly_name||e.entity||this._t("setting.entity"):this._t(`setting.${e.setting}`);if(!t)return i;let s=this.room.devices?.[String(e.device)];return`${i} (${s?.name??String(e.device)})`}_settingsMode(e,t,i){return a`<ha-form
      .hass=${this.hass}
      .data=${{settings_mode:e?"chosen":"auto"}}
      .schema=${[{name:"settings_mode",required:!0,selector:{select:{options:[{value:"auto",label:this._t(t)},{value:"chosen",label:this._t("settings_chosen")}],mode:"dropdown"}}}]}
      .computeLabel=${this._label}
      @value-changed=${s=>{let o=s.detail.value.settings_mode==="chosen";o!==e&&i(o)}}
    ></ha-form>`}_renderSettingItems(e,t,i,s){let o=d=>!!this.room.devices?.[String(d)]?.entity_id?.startsWith("media_player."),l=(i??[]).map(d=>({value:d,label:this.room.devices?.[d]?.name??d}));return a`${e.map((d,c)=>{let u=i?d.device:s,p=d.entity!==void 0?"entity":d.setting,m=o(u)?[...He,"entity"]:["entity"],f=d.entity,_=f?this.hass.states[f]?.attributes.options:void 0,A=p==="entity"?Array.isArray(_)?_.map(String):void 0:this._settingList(u,p);return a`<div class="step">
        <div class="step-head">
          <span class="title">${this._describeSetting(d,i!==null)}</span>
          ${this._moveButtons(e,c,t)}
        </div>
        <ha-form
          .hass=${this.hass}
          .data=${{device:d.device,setting:p,entity:f,name:d.name,options:d.options??[]}}
          .schema=${[...i?[{name:"device",required:!0,selector:{select:{options:l,mode:"dropdown"}}}]:[],{name:"setting",required:!0,selector:{select:{options:m.map(x=>({value:x,label:this._t(`setting.${x}`)})),mode:"dropdown"}}},...p==="entity"?[{name:"entity",required:!0,selector:{entity:{filter:{domain:[...Tt]}}}},{name:"name",selector:{text:{}}}]:[],...A!==void 0?[{name:"options",selector:{select:{options:A,multiple:!0,custom_value:!0,mode:"dropdown"}}}]:[]]}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${x=>{let O=x.detail.value,Ze=o(i?O.device:s)?O.setting:"entity",Qe=i?{device:O.device}:{},Je=[...e];Je[c]=Ze==="entity"?w({...Qe,entity:O.entity??"",name:O.name,options:O.options},["entity"]):w({...Qe,setting:Ze,options:O.options}),t(Je)}}
        ></ha-form>
      </div>`})}`}get _lists(){return{source_list:this.sources,sound_mode_list:this.soundModes}}_renderCardSettings(e,t){let i=t.remote?.settings,s=u=>{let p={...t.remote};u===void 0?delete p.settings:p.settings=u,this._setActivity(e,{...t,remote:ye(p)})},o=Rt(this.hass,this.room,t,this._lists,this._related),l=this._settingsMode(i!==void 0,"settings_auto",u=>s(u?o.map(p=>({...p})):void 0));if(i===void 0)return a`${l}
        <p class="ltek-hint">
          ${o.length?this._t("settings_auto_shows",{list:o.map(u=>this._describeSetting(u,!0)).join(", ")}):this._t("settings_auto_none")}
        </p>`;let d=t.devices??[],c=d.filter(u=>this.room.devices?.[u]?.entity_id?.startsWith("media_player."));return a`${l}
      ${this._renderSettingItems(i,s,d)}
      ${i.length?h:a`<p class="ltek-hint">${this._t("settings_none")}</p>`}
      ${d.length?a`<button
            class="add"
            @click=${()=>s([...i,c.length?{device:c[0],setting:"sound_mode"}:{device:d[0],entity:""}])}
          >
            + ${this._t("add_setting")}
          </button>`:h}`}_renderDeviceSettings(e,t){let i=t.settings,s=c=>{let u={...t};c===void 0?delete u.settings:u.settings=c,this._emit({...this.room,devices:{...this.room.devices,[e]:u}})},o=We(this.hass,this.room,e,this._lists,this._related),l=this._settingsMode(i!==void 0,"device_settings_auto",c=>s(c?o.map(({device:u,...p})=>p):void 0));if(i===void 0)return a`${l}
        <p class="ltek-hint">
          ${o.length?this._t("settings_auto_shows",{list:o.map(c=>this._describeSetting(c,!1)).join(", ")}):this._t("device_settings_auto_none")}
        </p>`;let d=t.entity_id?.startsWith("media_player.");return a`${l}
      ${this._renderSettingItems(i,s,null,e)}
      ${i.length?h:a`<p class="ltek-hint">${this._t("device_settings_none")}</p>`}
      <button
        class="add"
        @click=${()=>s([...i,d?{setting:"sound_mode"}:{entity:""}])}
      >
        + ${this._t("add_setting")}
      </button>`}_addActivity(){let e=this._t("new_activity"),t=R(I(e),Object.keys(this.room.activities??{}));this._setActivity(t,{name:e,devices:[]}),this._show({kind:"activity",id:t})}_deleteActivity(e,t){if(!window.confirm(`${this._t("delete")}: ${t.name??e}?`))return;let i={...this.room.activities};delete i[e];let s={...this.room,activities:i};s.default_activity===e&&delete s.default_activity,this._emit(s),this._show({kind:"list"})}_renderYaml(){return a`<p class="ltek-hint">${this._t("yaml_intro")}</p>
      <ha-form
        .hass=${this.hass}
        .data=${{yaml:this.room}}
        .schema=${[{name:"yaml",selector:{object:{}}}]}
        .computeLabel=${()=>""}
        @value-changed=${e=>{let t=e.detail.value.yaml;t&&typeof t=="object"&&!Array.isArray(t)&&this._emit(t)}}
      ></ha-form>`}_moveButtons(e,t,i){let s=o=>{let l=[...e],[d]=l.splice(t,1);l.splice(o,0,d),i(l)};return a`<span class="move">
      <button class="ltek-act" title=${this._t("move_up")} aria-label=${this._t("move_up")} ?disabled=${t===0} @click=${()=>s(t-1)}>
        <ha-icon icon="mdi:arrow-up"></ha-icon>
      </button>
      <button class="ltek-act" title=${this._t("move_down")} aria-label=${this._t("move_down")} ?disabled=${t===e.length-1} @click=${()=>s(t+1)}>
        <ha-icon icon="mdi:arrow-down"></ha-icon>
      </button>
      <button class="ltek-del" title=${this._t("delete")} aria-label=${this._t("delete")} @click=${()=>i(e.filter((o,l)=>l!==t))}>
        <ha-icon icon="mdi:trash-can-outline"></ha-icon>
      </button>
    </span>`}_picker(e,t,i){return a`<ha-form
      class="picker"
      .hass=${this.hass}
      .data=${{pick:void 0}}
      .schema=${[{name:"pick",selector:{select:{options:t,mode:"dropdown"}}}]}
      .computeLabel=${()=>e}
      @value-changed=${s=>{let o=s.detail.value.pick;o&&(i(o),s.target.requestUpdate())}}
    ></ha-form>`}};se.properties={hass:{attribute:!1},room:{attribute:!1},roomId:{attribute:!1},sources:{attribute:!1},soundModes:{attribute:!1},saved:{attribute:!1},_tab:{state:!0},_view:{state:!0},_notice:{state:!0},_related:{state:!0},_detect:{state:!0},profiles:{attribute:!1}},se.styles=[b,y,v`
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
    .detail-head .ltek-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--ltek-sp-1);
    }
  `];customElements.get("easy-av-control-room-editor")||customElements.define("easy-av-control-room-editor",se);async function bi(){if(customElements.get("ha-form")&&customElements.get("ha-selector"))return;await(await(await window.loadCardHelpers()).createCardElement({type:"entities",entities:[]})).constructor.getConfigElement(),await customElements.whenDefined("ha-form")}var re=class extends g{constructor(){super();this._original="";this._loading=!1;this._saving=!1,this._ready=!1,this._sources={},this._soundModes={},this._adding=!1,this._profiles=[],this._page="room"}async _loadProfiles(){this._profiles=await this.hass.callWS({type:"easy_av_control/profiles/list"}).catch(()=>[])}_t(e,t){return $(this.hass?.language,e,t)}async _load(){this._loading=!0;try{await bi(),this._ready=!0;let e=await this.hass.callWS({type:"easy_av_control/config/get"});this._entryId=e.entry_id,this._revision=e.revision,this._original=JSON.stringify(e.rooms),this._rooms=e.rooms,this._banner=void 0,(!this._selected||!(this._selected in e.rooms))&&(this._selected=Object.keys(e.rooms)[0]),this._loadProfiles(),[this._sources,this._soundModes]=await Promise.all(["source_list","sound_mode_list"].map(t=>this.hass.callWS({type:"easy_av_control/config/sources",attribute:t}).catch(()=>({}))))}catch(e){this._loadError=e?.message??String(e)}finally{this._loading=!1}}get _dirty(){return this._rooms!==void 0&&JSON.stringify(this._rooms)!==this._original}_roomChanged(e,t){this._rooms={...this._rooms,[e]:t},this._banner?.kind!=="conflict"&&(this._banner=void 0)}_addRoom(e){if(this._adding=!1,!e.trim())return;let t=R(I(e),Object.keys(this._rooms??{}));this._rooms={...this._rooms,[t]:{name:e.trim(),devices:{},activities:{}}},this._selected=t}_renderAddRoom(){return this._adding?a`<form class="new-room" @submit=${t=>{t.preventDefault();let i=t.target.querySelector("input");this._addRoom(i.value)}}>
      <input
        aria-label=${this._t("add_room_name")}
        placeholder=${this._t("add_room_name")}
        @keydown=${t=>t.key==="Escape"&&(this._adding=!1)}
      />
      <div class="new-room-buttons">
        <button type="button" class="flat" @click=${()=>this._adding=!1}>${this._t("cancel")}</button>
        <button type="submit" class="primary">${this._t("create")}</button>
      </div>
    </form>`:a`<button class="room add" @click=${()=>this._adding=!0}>+ ${this._t("add_room")}</button>`}updated(e){this.hass&&!this._rooms&&!this._loading&&!this._loadError&&this._load(),e.has("_adding")&&this._adding&&this.shadowRoot?.querySelector("form.new-room input")?.focus()}_deleteRoom(e){let t=this._rooms?.[e];if(!t||!window.confirm(this._t("delete_room_confirm",{name:t.name??e})))return;let i={...this._rooms};delete i[e],this._rooms=i,this._selected=Object.keys(i)[0]}_discard(){this._rooms=JSON.parse(this._original),this._banner=void 0,(!this._selected||!(this._selected in this._rooms))&&(this._selected=Object.keys(this._rooms)[0])}_reload(){this._dirty&&!window.confirm(this._t("reload_confirm"))||(this._loadError=void 0,this._load())}async _save(e=!1){if(!this._rooms||!this._revision)return;let t=this._rooms,i={};for(let[s,o]of Object.entries(t))i[s]=w(o);this._saving=!0;try{let s=await this.hass.callWS({type:"easy_av_control/config/validate",rooms:i});if(s.error){this._banner={kind:"invalid",path:s.error.path.join("."),message:s.error.message};return}if(s.missing.length&&!e){this._banner={kind:"missing",missing:s.missing};return}let o=await this.hass.callWS({type:"easy_av_control/config/save",rooms:i,revision:this._revision,entry_id:this._entryId});this._revision=o.revision,this._original=JSON.stringify(i),this._rooms===t&&(this._rooms=i),this._banner={kind:"saved"},this._loadProfiles()}catch(s){let o=s;this._banner=o.code==="conflict"?{kind:"conflict"}:{kind:"invalid",path:"",message:o.message??String(s)}}finally{this._saving=!1}}render(){return a`
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
        ${e.map(([i,s])=>a`<button
            class="room ${this._page==="room"&&i===t?"active":""}"
            @click=${()=>{this._selected=i,this._page="room"}}
          >
            ${s.name??i}
          </button>`)}
        ${this._renderAddRoom()}
        <div class="nav-title library">${this._t("setup")}</div>
        <button class="room ${this._page==="detect"?"active":""}" @click=${()=>this._page="detect"}>
          <ha-icon icon="mdi:auto-fix"></ha-icon> ${this._t("detect")}
        </button>
        <button class="room ${this._page==="profiles"?"active":""}" @click=${()=>this._page="profiles"}>
          <ha-icon icon="mdi:package-variant-closed"></ha-icon> ${this._t("profiles")}
        </button>
      </nav>
      <main>
        <easy-av-control-guide .language=${this.hass.language}></easy-av-control-guide>
        ${this._renderBanner()}
        ${this._page==="detect"?a`<easy-av-control-detect
              .hass=${this.hass}
              .rooms=${this._rooms}
              @rooms-changed=${i=>{this._rooms=i.detail.rooms,(!this._selected||!(this._selected in i.detail.rooms))&&(this._selected=Object.keys(i.detail.rooms)[0]),this._page="room",this._banner={kind:"applied"}}}
              @create-profile=${i=>{this._draftFor=i.detail.integration,this._page="profiles"}}
            ></easy-av-control-detect>`:this._page==="profiles"?a`<easy-av-control-profiles
              .hass=${this.hass}
              .profiles=${this._profiles}
              .draftFor=${this._draftFor}
              @draft-opened=${()=>this._draftFor=void 0}
              @profiles-changed=${()=>this._loadProfiles()}
            ></easy-av-control-profiles>`:t?a`<easy-av-control-room-editor
                .hass=${this.hass}
                .room=${this._rooms[t]}
                .roomId=${t}
                .sources=${this._sources}
                .soundModes=${this._soundModes}
                .saved=${JSON.parse(this._original||"{}")[t]}
                .profiles=${this._profiles}
                @room-changed=${i=>this._roomChanged(t,i.detail.room)}
                @delete-room=${()=>this._deleteRoom(t)}
              ></easy-av-control-room-editor>`:a`<div class="empty">${this._t("no_rooms")}</div>`}
        <div class="ltek-links">
          <a class="ltek-star" href=${T} target="_blank" rel="noopener">${this._t("star")}</a>
          <a class="ltek-issue" href="${T}/issues" target="_blank" rel="noopener">${this._t("report")}</a>
        </div>
      </main>
    </div>`}_renderBanner(){let e=this._banner;if(!e)return h;switch(e.kind){case"saved":return a`<div class="banner ok">${this._t("saved")}</div>`;case"applied":return a`<div class="banner warning">${this._t("detect_applied")}</div>`;case"invalid":return a`<div class="banner error">
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
        </div>`}}};re.properties={hass:{attribute:!1},narrow:{type:Boolean},_rooms:{state:!0},_selected:{state:!0},_loadError:{state:!0},_banner:{state:!0},_saving:{state:!0},_ready:{state:!0},_sources:{state:!0},_soundModes:{state:!0},_adding:{state:!0},_profiles:{state:!0},_page:{state:!0},_draftFor:{state:!0}},re.styles=[b,y,v`
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
    /* Design guide */
    .nav-title {
      color: var(--ltek-c-muted);
      font-size: var(--ltek-fs-small);
      font-weight: var(--ltek-fw-semibold);
      text-transform: uppercase;
      letter-spacing: 0.04em;
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
    button.room.add {
      border: 1px dashed var(--ltek-c-accent);
      color: var(--ltek-c-accent);
      background: transparent;
    }
    .banner {
      border-radius: var(--ltek-r-md);
    }
  `];customElements.get("easy-av-control-panel")||customElements.define("easy-av-control-panel",re);export{re as EasyAvControlPanel};
