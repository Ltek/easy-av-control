var Te=globalThis,Re=Te.ShadowRoot&&(Te.ShadyCSS===void 0||Te.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Je=Symbol(),Ht=new WeakMap,ne=class{constructor(n,e,t){if(this._$cssResult$=!0,t!==Je)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=n,this.t=e}get styleSheet(){let n=this.o,e=this.t;if(Re&&n===void 0){let t=e!==void 0&&e.length===1;t&&(n=Ht.get(e)),n===void 0&&((this.o=n=new CSSStyleSheet).replaceSync(this.cssText),t&&Ht.set(e,n))}return n}toString(){return this.cssText}},Oe=l=>new ne(typeof l=="string"?l:l+"",void 0,Je),w=(l,...n)=>{let e=l.length===1?l[0]:n.reduce((t,i,s)=>t+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+l[s+1],l[0]);return new ne(e,l,Je)},Bt=(l,n)=>{if(Re)l.adoptedStyleSheets=n.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of n){let t=document.createElement("style"),i=Te.litNonce;i!==void 0&&t.setAttribute("nonce",i),t.textContent=e.cssText,l.appendChild(t)}},Qe=Re?l=>l:l=>l instanceof CSSStyleSheet?(n=>{let e="";for(let t of n.cssRules)e+=t.cssText;return Oe(e)})(l):l;var{is:Bi,defineProperty:Vi,getOwnPropertyDescriptor:Wi,getOwnPropertyNames:Gi,getOwnPropertySymbols:qi,getPrototypeOf:Fi}=Object,je=globalThis,Vt=je.trustedTypes,Ki=Vt?Vt.emptyScript:"",Ui=je.reactiveElementPolyfillSupport,se=(l,n)=>l,Xe={toAttribute(l,n){switch(n){case Boolean:l=l?Ki:null;break;case Object:case Array:l=l==null?l:JSON.stringify(l)}return l},fromAttribute(l,n){let e=l;switch(n){case Boolean:e=l!==null;break;case Number:e=l===null?null:Number(l);break;case Object:case Array:try{e=JSON.parse(l)}catch{e=null}}return e}},Gt=(l,n)=>!Bi(l,n),Wt={attribute:!0,type:String,converter:Xe,reflect:!1,useDefault:!1,hasChanged:Gt};Symbol.metadata??=Symbol("metadata"),je.litPropertyMetadata??=new WeakMap;var M=class extends HTMLElement{static addInitializer(n){this._$Ei(),(this.l??=[]).push(n)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(n,e=Wt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(n)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(n,e),!e.noAccessor){let t=Symbol(),i=this.getPropertyDescriptor(n,t,e);i!==void 0&&Vi(this.prototype,n,i)}}static getPropertyDescriptor(n,e,t){let{get:i,set:s}=Wi(this.prototype,n)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let a=i?.call(this);s?.call(this,o),this.requestUpdate(n,a,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(n){return this.elementProperties.get(n)??Wt}static _$Ei(){if(this.hasOwnProperty(se("elementProperties")))return;let n=Fi(this);n.finalize(),n.l!==void 0&&(this.l=[...n.l]),this.elementProperties=new Map(n.elementProperties)}static finalize(){if(this.hasOwnProperty(se("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(se("properties"))){let e=this.properties,t=[...Gi(e),...qi(e)];for(let i of t)this.createProperty(i,e[i])}let n=this[Symbol.metadata];if(n!==null){let e=litPropertyMetadata.get(n);if(e!==void 0)for(let[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let i=this._$Eu(e,t);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(n){let e=[];if(Array.isArray(n)){let t=new Set(n.flat(1/0).reverse());for(let i of t)e.unshift(Qe(i))}else n!==void 0&&e.push(Qe(n));return e}static _$Eu(n,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof n=="string"?n.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(n=>n(this))}addController(n){(this._$EO??=new Set).add(n),this.renderRoot!==void 0&&this.isConnected&&n.hostConnected?.()}removeController(n){this._$EO?.delete(n)}_$E_(){let n=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(n.set(t,this[t]),delete this[t]);n.size>0&&(this._$Ep=n)}createRenderRoot(){let n=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Bt(n,this.constructor.elementStyles),n}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(n=>n.hostConnected?.())}enableUpdating(n){}disconnectedCallback(){this._$EO?.forEach(n=>n.hostDisconnected?.())}attributeChangedCallback(n,e,t){this._$AK(n,t)}_$ET(n,e){let t=this.constructor.elementProperties.get(n),i=this.constructor._$Eu(n,t);if(i!==void 0&&t.reflect===!0){let s=(t.converter?.toAttribute!==void 0?t.converter:Xe).toAttribute(e,t.type);this._$Em=n,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(n,e){let t=this.constructor,i=t._$Eh.get(n);if(i!==void 0&&this._$Em!==i){let s=t.getPropertyOptions(i),o=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Xe;this._$Em=i;let a=o.fromAttribute(e,s.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(n,e,t,i=!1,s){if(n!==void 0){let o=this.constructor;if(i===!1&&(s=this[n]),t??=o.getPropertyOptions(n),!((t.hasChanged??Gt)(s,e)||t.useDefault&&t.reflect&&s===this._$Ej?.get(n)&&!this.hasAttribute(o._$Eu(n,t))))return;this.C(n,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(n,e,{useDefault:t,reflect:i,wrapped:s},o){t&&!(this._$Ej??=new Map).has(n)&&(this._$Ej.set(n,o??e??this[n]),s!==!0||o!==void 0)||(this._$AL.has(n)||(this.hasUpdated||t||(e=void 0),this._$AL.set(n,e)),i===!0&&this._$Em!==n&&(this._$Eq??=new Set).add(n))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let n=this.scheduleUpdate();return n!=null&&await n,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[i,s]of t){let{wrapped:o}=s,a=this[i];o!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,s,a)}}let n=!1,e=this._$AL;try{n=this.shouldUpdate(e),n?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw n=!1,this._$EM(),t}n&&this._$AE(e)}willUpdate(n){}_$AE(n){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(n)),this.updated(n)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(n){return!0}update(n){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(n){}firstUpdated(n){}};M.elementStyles=[],M.shadowRootOptions={mode:"open"},M[se("elementProperties")]=new Map,M[se("finalized")]=new Map,Ui?.({ReactiveElement:M}),(je.reactiveElementVersions??=[]).push("2.1.2");var tt=globalThis,qt=l=>l,De=tt.trustedTypes,Ft=De?De.createPolicy("lit-html",{createHTML:l=>l}):void 0,it="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,nt="?"+I,Zi=`<${nt}>`,G=document,re=()=>G.createComment(""),ae=l=>l===null||typeof l!="object"&&typeof l!="function",st=Array.isArray,Qt=l=>st(l)||typeof l?.[Symbol.iterator]=="function",et=`[ 	
\f\r]`,oe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Kt=/-->/g,Ut=/>/g,V=RegExp(`>|${et}(?:([^\\s"'>=/]+)(${et}*=${et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Zt=/'/g,Yt=/"/g,Xt=/^(?:script|style|textarea|title)$/i,ot=l=>(n,...e)=>({_$litType$:l,strings:n,values:e}),r=ot(1),rt=ot(2),Cn=ot(3),z=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Jt=new WeakMap,W=G.createTreeWalker(G,129);function ei(l,n){if(!st(l)||!l.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ft!==void 0?Ft.createHTML(n):n}var ti=(l,n)=>{let e=l.length-1,t=[],i,s=n===2?"<svg>":n===3?"<math>":"",o=oe;for(let a=0;a<e;a++){let c=l[a],h,d,u=-1,m=0;for(;m<c.length&&(o.lastIndex=m,d=o.exec(c),d!==null);)m=o.lastIndex,o===oe?d[1]==="!--"?o=Kt:d[1]!==void 0?o=Ut:d[2]!==void 0?(Xt.test(d[2])&&(i=RegExp("</"+d[2],"g")),o=V):d[3]!==void 0&&(o=V):o===V?d[0]===">"?(o=i??oe,u=-1):d[1]===void 0?u=-2:(u=o.lastIndex-d[2].length,h=d[1],o=d[3]===void 0?V:d[3]==='"'?Yt:Zt):o===Yt||o===Zt?o=V:o===Kt||o===Ut?o=oe:(o=V,i=void 0);let f=o===V&&l[a+1].startsWith("/>")?" ":"";s+=o===oe?c+Zi:u>=0?(t.push(h),c.slice(0,u)+it+c.slice(u)+I+f):c+I+(u===-2?a:f)}return[ei(l,s+(l[e]||"<?>")+(n===2?"</svg>":n===3?"</math>":"")),t]},le=class l{constructor({strings:n,_$litType$:e},t){let i;this.parts=[];let s=0,o=0,a=n.length-1,c=this.parts,[h,d]=ti(n,e);if(this.el=l.createElement(h,t),W.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=W.nextNode())!==null&&c.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let u of i.getAttributeNames())if(u.endsWith(it)){let m=d[o++],f=i.getAttribute(u).split(I),_=/([.?@])?(.*)/.exec(m);c.push({type:1,index:s,name:_[2],strings:f,ctor:_[1]==="."?Pe:_[1]==="?"?Ce:_[1]==="@"?Le:F}),i.removeAttribute(u)}else u.startsWith(I)&&(c.push({type:6,index:s}),i.removeAttribute(u));if(Xt.test(i.tagName)){let u=i.textContent.split(I),m=u.length-1;if(m>0){i.textContent=De?De.emptyScript:"";for(let f=0;f<m;f++)i.append(u[f],re()),W.nextNode(),c.push({type:2,index:++s});i.append(u[m],re())}}}else if(i.nodeType===8)if(i.data===nt)c.push({type:2,index:s});else{let u=-1;for(;(u=i.data.indexOf(I,u+1))!==-1;)c.push({type:7,index:s}),u+=I.length-1}s++}}static createElement(n,e){let t=G.createElement("template");return t.innerHTML=n,t}};function q(l,n,e=l,t){if(n===z)return n;let i=t!==void 0?e._$Co?.[t]:e._$Cl,s=ae(n)?void 0:n._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),s===void 0?i=void 0:(i=new s(l),i._$AT(l,e,t)),t!==void 0?(e._$Co??=[])[t]=i:e._$Cl=i),i!==void 0&&(n=q(l,i._$AS(l,n.values),i,t)),n}var ze=class{constructor(n,e){this._$AV=[],this._$AN=void 0,this._$AD=n,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(n){let{el:{content:e},parts:t}=this._$AD,i=(n?.creationScope??G).importNode(e,!0);W.currentNode=i;let s=W.nextNode(),o=0,a=0,c=t[0];for(;c!==void 0;){if(o===c.index){let h;c.type===2?h=new Y(s,s.nextSibling,this,n):c.type===1?h=new c.ctor(s,c.name,c.strings,this,n):c.type===6&&(h=new Me(s,this,n)),this._$AV.push(h),c=t[++a]}o!==c?.index&&(s=W.nextNode(),o++)}return W.currentNode=G,i}p(n){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(n,t,e),e+=t.strings.length-2):t._$AI(n[e])),e++}},Y=class l{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(n,e,t,i){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=n,this._$AB=e,this._$AM=t,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let n=this._$AA.parentNode,e=this._$AM;return e!==void 0&&n?.nodeType===11&&(n=e.parentNode),n}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(n,e=this){n=q(this,n,e),ae(n)?n===p||n==null||n===""?(this._$AH!==p&&this._$AR(),this._$AH=p):n!==this._$AH&&n!==z&&this._(n):n._$litType$!==void 0?this.$(n):n.nodeType!==void 0?this.T(n):Qt(n)?this.k(n):this._(n)}O(n){return this._$AA.parentNode.insertBefore(n,this._$AB)}T(n){this._$AH!==n&&(this._$AR(),this._$AH=this.O(n))}_(n){this._$AH!==p&&ae(this._$AH)?this._$AA.nextSibling.data=n:this.T(G.createTextNode(n)),this._$AH=n}$(n){let{values:e,_$litType$:t}=n,i=typeof t=="number"?this._$AC(n):(t.el===void 0&&(t.el=le.createElement(ei(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===i)this._$AH.p(e);else{let s=new ze(i,this),o=s.u(this.options);s.p(e),this.T(o),this._$AH=s}}_$AC(n){let e=Jt.get(n.strings);return e===void 0&&Jt.set(n.strings,e=new le(n)),e}k(n){st(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,i=0;for(let s of n)i===e.length?e.push(t=new l(this.O(re()),this.O(re()),this,this.options)):t=e[i],t._$AI(s),i++;i<e.length&&(this._$AR(t&&t._$AB.nextSibling,i),e.length=i)}_$AR(n=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);n!==this._$AB;){let t=qt(n).nextSibling;qt(n).remove(),n=t}}setConnected(n){this._$AM===void 0&&(this._$Cv=n,this._$AP?.(n))}},F=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(n,e,t,i,s){this.type=1,this._$AH=p,this._$AN=void 0,this.element=n,this.name=e,this._$AM=i,this.options=s,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=p}_$AI(n,e=this,t,i){let s=this.strings,o=!1;if(s===void 0)n=q(this,n,e,0),o=!ae(n)||n!==this._$AH&&n!==z,o&&(this._$AH=n);else{let a=n,c,h;for(n=s[0],c=0;c<s.length-1;c++)h=q(this,a[t+c],e,c),h===z&&(h=this._$AH[c]),o||=!ae(h)||h!==this._$AH[c],h===p?n=p:n!==p&&(n+=(h??"")+s[c+1]),this._$AH[c]=h}o&&!i&&this.j(n)}j(n){n===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,n??"")}},Pe=class extends F{constructor(){super(...arguments),this.type=3}j(n){this.element[this.name]=n===p?void 0:n}},Ce=class extends F{constructor(){super(...arguments),this.type=4}j(n){this.element.toggleAttribute(this.name,!!n&&n!==p)}},Le=class extends F{constructor(n,e,t,i,s){super(n,e,t,i,s),this.type=5}_$AI(n,e=this){if((n=q(this,n,e,0)??p)===z)return;let t=this._$AH,i=n===p&&t!==p||n.capture!==t.capture||n.once!==t.once||n.passive!==t.passive,s=n!==p&&(t===p||i);i&&this.element.removeEventListener(this.name,this,t),s&&this.element.addEventListener(this.name,this,n),this._$AH=n}handleEvent(n){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,n):this._$AH.handleEvent(n)}},Me=class{constructor(n,e,t){this.element=n,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(n){q(this,n)}},ii={M:it,P:I,A:nt,C:1,L:ti,R:ze,D:Qt,V:q,I:Y,H:F,N:Ce,U:Le,B:Pe,F:Me},Yi=tt.litHtmlPolyfillSupport;Yi?.(le,Y),(tt.litHtmlVersions??=[]).push("3.3.3");var ni=(l,n,e)=>{let t=e?.renderBefore??n,i=t._$litPart$;if(i===void 0){let s=e?.renderBefore??null;t._$litPart$=i=new Y(n.insertBefore(re(),s),s,void 0,e??{})}return i._$AI(l),i};var at=globalThis,b=class extends M{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let n=super.createRenderRoot();return this.renderOptions.renderBefore??=n.firstChild,n}update(n){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(n),this._$Do=ni(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return z}};b._$litElement$=!0,b.finalized=!0,at.litElementHydrateSupport?.({LitElement:b});var Ji=at.litElementPolyfillSupport;Ji?.({LitElement:b});(at.litElementVersions??=[]).push("4.2.2");var Qi=`
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
`,$=w`
  :host {
    ${Oe(Qi)}
  }
`,x=w`
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
`,A=w`
  :host {
    --ltek-fs-panel-title: 17px;
    --ltek-fs-header: 16px;
    --ltek-fs-group: 15px;
    --ltek-fs-label: 14px;
    --ltek-fs-body: 13px;
    --ltek-fs-small: 12px;
    --ltek-fs-tiny: 11px;
  }
`,J="https://github.com/Ltek/easy-av-control";var Ie={en:{"state.idle":"Off","flow.show":"Flow","flow.details":"Details","editor.show_flow":"Flow (opens by itself while the room starts or stops)","editor.flow_details":"Flow with entities, actions and notes","state.starting":"Starting \u2026","state.active":"On","now.paused":"Paused","state.stopping":"Stopping \u2026","state.error":"Error",power:"On/off",loading:"Loading \u2026",not_found:'Room "{room}" not found',no_room:"Pick a room in the card settings",warnings:"Warnings",volume:"Volume","command.volume_up":"Volume up","command.volume_down":"Volume down","command.mute":"Mute","command.volume_set":"Volume slider","command.select_source":"Select source","command.select_sound_mode":"Select sound mode","command.channel_up":"Channel up","command.channel_down":"Channel down","command.play_pause":"Play/pause","command.play":"Play","command.pause":"Pause","command.stop":"Stop","command.next":"Next","command.previous":"Previous","command.up":"Up","command.down":"Down","command.left":"Left","command.right":"Right","command.ok":"OK","command.back":"Back","command.menu":"Menu","command.home":"Home","command.info":"Info","command.guide":"Guide","command.exit":"Exit","editor.room":"Room","editor.section":"Card","editor.hint":"The room this card controls. The card shows its activities, the remote of the running one, and its settings.","editor.star":"\u2B50 Star on GitHub","editor.report":"\u{1F41B} Report an issue","editor.name":"Title (optional)","doing.power_on":"Turning the outlets on","doing.power_off":"Turning the outlets off","doing.boot":"{name} is booting","doing.reload":"Reconnecting {name}","doing.ready":"Waiting for {name}","doing.turn_on":"Turning on {name}","doing.reach":"Waiting for {name} to be reachable","doing.delay":"Waiting before turning on {name}","doing.before":"Before {name}: waiting for {names}","doing.warm_up":"{name} is starting up","doing.status_on":"Waiting for {name} to be on","doing.status_on_value":"{name}: {value}","doing.status_off":"Waiting for {name} to be off","doing.status_off_value":"{name}: {value}","doing.turn_off":"Turning off {name}","doing.checks":"Checking that everything works","doing.step":"Step {step} of {steps}: {what}","doing.wait":"Step {step} of {steps}: waiting","doing.hooks_on_start":"Waiting for the actions on start","doing.hooks_on_stop":"Waiting for the actions on stop","doing.left":"{time} left","doing.at_most":"at most {time}","cooling.text":"Cooling down: {names}","cooling.time":"power off in {time}","cooling.time_status":"power off once they are off, at most {time}",touchpad:"Touch surface: swipe for the arrow keys, tap for OK","touchpad.hint":"Swipe \xB7 tap for OK","rocker.volume":"VOL","rocker.channels":"CH","pad.show_arrows":"Show arrow keys","pad.show_touchpad":"Show touch surface",settings:"Settings","setting.source":"Source","setting.sound_mode":"Sound mode","toggle.on":"On","toggle.off":"Off","step.power_on":"Switch on","step.power_off":"Switch off","step.set_source":"Set source","step.set_volume":"Set volume","step.set_sound_mode":"Set sound mode","step.set_brightness":"Set brightness","step.set_color_temp":"Set color temperature","step.set_position":"Set cover position","step.set_tilt":"Set cover tilt","step.call_action":"Run action","step.delay":"Wait","step.wait_available":"Wait until available","step.wait_picture":"Wait for a picture"},de:{"state.idle":"Aus","flow.show":"Ablauf","flow.details":"Details","editor.show_flow":"Ablauf (\xF6ffnet sich selbst, w\xE4hrend der Raum startet oder stoppt)","editor.flow_details":"Ablauf mit Entit\xE4ten, Aktionen und Hinweisen","state.starting":"Startet \u2026","state.active":"An","now.paused":"Pausiert","state.stopping":"Stoppt \u2026","state.error":"Fehler",power:"Ein/Aus",loading:"L\xE4dt \u2026",not_found:"Raum \u201E{room}\u201C nicht gefunden",no_room:"Bitte in den Karteneinstellungen einen Raum w\xE4hlen",warnings:"Warnungen",volume:"Lautst\xE4rke","command.volume_up":"Lauter","command.volume_down":"Leiser","command.mute":"Stumm","command.volume_set":"Lautst\xE4rkeregler","command.select_source":"Quelle w\xE4hlen","command.select_sound_mode":"Klangmodus w\xE4hlen","command.channel_up":"Kanal hoch","command.channel_down":"Kanal runter","command.play_pause":"Wiedergabe/Pause","command.play":"Wiedergabe","command.pause":"Pause","command.stop":"Stopp","command.next":"Weiter","command.previous":"Zur\xFCck","command.up":"Hoch","command.down":"Runter","command.left":"Links","command.right":"Rechts","command.ok":"OK","command.back":"Zur\xFCck","command.menu":"Men\xFC","command.home":"Start","command.info":"Info","command.guide":"EPG","command.exit":"Beenden","editor.room":"Raum","editor.section":"Karte","editor.hint":"Der Raum, den diese Karte steuert. Sie zeigt seine Aktivit\xE4ten, die Fernbedienung der laufenden und ihre Einstellungen.","editor.star":"\u2B50 Auf GitHub markieren","editor.report":"\u{1F41B} Problem melden","editor.name":"Titel (optional)","doing.power_on":"Steckdosen werden eingeschaltet","doing.power_off":"Steckdosen werden ausgeschaltet","doing.boot":"{name} bootet","doing.reload":"{name} wird neu verbunden","doing.ready":"Warte auf {name}","doing.turn_on":"{name} wird eingeschaltet","doing.reach":"Warte, bis {name} erreichbar ist","doing.delay":"Warte vor dem Einschalten von {name}","doing.before":"Vor {name}: warte auf {names}","doing.warm_up":"{name} f\xE4hrt hoch","doing.status_on":"Warte, bis {name} an ist","doing.status_on_value":"{name}: {value}","doing.status_off":"Warte, bis {name} aus ist","doing.status_off_value":"{name}: {value}","doing.turn_off":"{name} wird ausgeschaltet","doing.checks":"Pr\xFCfe, ob alles l\xE4uft","doing.step":"Schritt {step} von {steps}: {what}","doing.wait":"Schritt {step} von {steps}: warten","doing.hooks_on_start":"Warte auf die Aktionen beim Start","doing.hooks_on_stop":"Warte auf die Aktionen beim Stopp","doing.left":"noch {time}","doing.at_most":"h\xF6chstens noch {time}","cooling.text":"Abk\xFChlen: {names}","cooling.time":"Strom aus in {time}","cooling.time_status":"Strom aus, sobald sie aus sind, h\xF6chstens noch {time}",touchpad:"Touchfl\xE4che: wischen f\xFCr die Pfeiltasten, tippen f\xFCr OK","touchpad.hint":"Wischen \xB7 Tippen f\xFCr OK","rocker.volume":"VOL","rocker.channels":"CH","pad.show_arrows":"Pfeiltasten zeigen","pad.show_touchpad":"Touchfl\xE4che zeigen",settings:"Einstellungen","setting.source":"Quelle","setting.sound_mode":"Klangmodus","toggle.on":"An","toggle.off":"Aus","step.power_on":"Einschalten","step.power_off":"Ausschalten","step.set_source":"Quelle w\xE4hlen","step.set_volume":"Lautst\xE4rke setzen","step.set_sound_mode":"Klangmodus w\xE4hlen","step.set_brightness":"Helligkeit setzen","step.set_color_temp":"Farbtemperatur setzen","step.set_position":"Rollladen-Position setzen","step.set_tilt":"Lamellen-Neigung setzen","step.call_action":"Aktion ausf\xFChren","step.delay":"Warten","step.wait_available":"Auf Verf\xFCgbarkeit warten","step.wait_picture":"Auf ein Bild warten"}};function Q(l,n,e={}){let t=(l??"en").split("-")[0],s=(t in Ie?Ie[t]:Ie.en)[n]??Ie.en[n]??n;for(let[o,a]of Object.entries(e))s=s.replace(`{${o}}`,a);return s}var si={en:{"pf.form":"Form","pf.form_hint":"Every part of the profile, picked on a real device of its integration. Entities are stored the way any Home Assistant finds them (type and translation key), never by their entity ID.","pf.general":"General","pf.general_hint":"What the profile is for, and where its devices go in an activity's power-on order.","pf.name":"Name","pf.id":"ID","pf.integration":"Integration","pf.example":"Example device","pf.no_example":"No device of this integration here: entities can't be picked, only typed in YAML.","pf.device_entity":"Device entity","pf.order":"Power-on order","pf.status":"Status","pf.status_hint":"Which entity says the device is on, and what each of its values means. Tap a value it shows to add it, or type one.","pf.status_entity":"Status entity","pf.status_own":"None picked: the device entity's own state is the status.","pf.status_other":"This entity's state (or attribute) is the status.","pf.attribute":"Attribute","pf.attribute_none":"Its state","pf.now":"Now: {value}","pf.available_is_on":"On while this entity is available (it's unavailable while the device is off)","pf.group.starting":"Starting","pf.group.on":"On","pf.group.stopping":"Stopping","pf.group.off":"Off","pf.group.error":"Error","pf.other_value":"Other value \u2026","pf.timing":"Timing","pf.timing_hint":"How long to wait for on and off before the device's failure setting applies, and how long a state must hold.","pf.timeout_on":"Timeout, turning on","pf.timeout_off":"Timeout, turning off","pf.debounce":"Debounce","pf.reset":"Back to the default","pf.companions":"Remote, outlet and settings","pf.companions_hint":"Filled in on every device that uses this profile.","pf.remote":"Remote (arrow keys)","pf.power_switch":"Power outlet switch","pf.settings":"Settings in the card","pf.settings_hint":"Offered in the remote card while an activity runs.","pf.picture":"Picture check","pf.picture_hint":"A device that can tell whether a picture arrives (Lumagen Active Video, JVC Source Display): Detect integrations adds a picture check for it to the activity's Checks.","pf.picture_on":"This device has a picture check","pf.picture_entity":"Entity","pf.picture_ok":"Picture","pf.picture_fail":"No picture","pf.picture_timeout":"Timeout","pf.jobs":"Jobs","pf.jobs_hint":"For a device several integrations cover (a TV with PiPup, ADB and Android TV Remote): the jobs this one does. Lower numbers win.","pf.none":"None","pf.not_on_device":"not on this device",detect_used_integration:"Used for this device's state",detect_open_profile:"Open this profile",detect_no_area:"No area",detect_select_all:"Select all",timing_on:"Comes on in about {typical} ({count} measured, slowest {slowest})",timing_off:"Goes off in about {typical} ({count} measured, slowest {slowest})",timing_use:"Use measured timeouts",timing_use_hint:"Sets the status timeouts to what the measured times suggest: half as long again as usual, and longer than the slowest seen.","flow.typical":"usually {seconds}",setup:"Setup","flow.picture":"{step}. Wait until {entity} shows {states}, at most {timeout}","field.on_failure_picture":"If there's no picture",detect:"Detect integrations",detect_intro:"Compares what's installed in Home Assistant with what the rooms use. Tick what to change, then Apply: the changes appear as unsaved, and nothing is stored until you press Save.",detect_running:"Looking at your integrations \u2026",detect_nothing:"Nothing to change: every AV device with a profile is in a room, and every entity the rooms use exists.",detect_new:"Detected devices",detect_new_hint:"Devices no room uses yet, by their Home Assistant area. Tick the ones to add: they go into the activities you tick, at the place their profile gives in the power-on order (early, middle, late), with their status, remote and outlet filled in. The profile chip opens its profile; the blue integration chip is the one used for the device's state.",detect_room:"Room",detect_new_room:"New room: {name}",detect_activities:"Add to",detect_no_activities:"This room has no activities yet.",detect_starter:"Create a new Activity per Room using the selected Devices",detect_picture:"with a picture check",detect_better:"Better integrations",detect_better_hint:"A device a room uses that another integration now covers better (it reports faster or says more). Not ticked: tick to switch.",detect_better_row:"{from} \u2192 {to}",detect_gone:"Missing entities",detect_gone_hint:"Entities a room uses that no longer exist, for example after removing an integration. Where the same device is still covered by another integration, it is offered as the replacement.",detect_replace_with:"Replace with {entity} ({integration})",detect_no_replacement:"Nothing replaces it; fix it by hand. A device without a status uses its fixed times.",detect_renamed:"Renamed entities",detect_renamed_hint:"The same entity under a new ID. It's replaced everywhere except in actions and commands: check those.",detect_unmatched:"Integrations without a profile",detect_unmatched_hint:"Their devices work with fixed times. Create a profile so Easy AV Control can wait for their own states.",detect_create_profile:"+ Profile",detect_apply:"Apply",detect_applied:"Applied. Review the rooms, then press Save.",detect_again:"Detect again",profile_new:"+ Profile",profile_new_pick:"Integration",profile_new_hint:"Integrations here with a media player or remote and no profile. The draft starts from the first device of the one you pick.",profile_new_none:"Every integration with a media player or remote has a profile.",learn:"Learn",learn_hint:"Turn the device on, then off, here: Easy AV Control records what {entity} shows and fills in which states mean starting, on, stopping and off.",learn_on:"Turn on now",learn_off:"Turn off now",learn_seen_on:"Turning on: {states}",learn_seen_off:"Turning off: {states}",learn_use:"Use what was seen",learn_nothing:"Nothing recorded yet.","flow.status_on":"Wait until {device} says it's on ({entity}), at most {timeout}","flow.status_off":"Wait until {device} says it's off ({entity}), at most {timeout}","flow.outlets_off_status":"Turn off the outlet once its devices say they're off: {outlets}","flow.debounce":"state must hold {seconds}",profiles:"Profiles",profiles_intro:"A profile tells Easy AV Control what an integration's entities say about a device: which entity shows that it's on, what its states mean, its remote, outlet and settings. Built-in ones are locked: duplicate one to change it.",profiles_builtin:"Built in",profiles_yours:"Yours",profiles_none_yours:"None yet. Duplicate a built-in profile, or import one.",profile_generic:"for any media player without its own profile",profile_untested:"From the integration's code, not tested on a device",profile_used_by:"Used by {where}",profile_unused:"Not used by a device",profile_preview:"Show the summary",profile_view:"View",profile_edit:"Edit",profile_duplicate:"Duplicate",profile_delete_confirm:'Delete your profile "{name}"? Devices that use it go back to the built-in one.',profile_readonly:"Built in: read only. Duplicate it to make your own version.",profile_editor_hint:"The profile as YAML. Entities are found on the device by domain and translation_key, never by entity ID, so the profile works on any Home Assistant.",profile_save:"Save profile",profile_close:"Close",profile_cancel:"Cancel",profile_saved:"Profile saved.",profile_export:"Export",profile_export_all:"Export yours",profile_import:"Import",profile_import_hint:"Paste an Easy AV Control profile export. Profiles you already have are never replaced: one with a taken ID is added under a new one.",profile_import_done:"Added: {added}",profile_import_renamed:"{from} added as {to}",profile_import_invalid:"Not valid, skipped: {ids}",profile_copy:"Copy to clipboard",profile_copied:"Copied \u2713",profile_copy_failed:"Press Ctrl/Cmd+C",profile_paste:"Paste from clipboard",profile_paste_failed:"Paste with Ctrl/Cmd+V",profile_share:"Share a profile",profile_share_hint:"Made one for a device others have too? Export it and send the text with Report an issue (at the bottom of the menu): accepted profiles ship as built-in ones.",sum_indicator:"On / off from {what}",sum_indicator_device:"the device's own state",sum_indicator_available:"{what} being available",sum_states:"{groups}",sum_remote:"Remote",sum_outlet:"Outlet",sum_settings:"Settings",sum_picture:"Picture check",sum_order:"Power-on order: {order}",sum_roles:"Jobs: {roles}","order.early":"early","order.middle":"middle","order.late":"late","role.power":"power","role.navigation":"arrow keys","role.now_playing":"now playing","role.turn_off":"turn off",section_state:"Device state",hint_state:"How Easy AV Control knows this device is on or off. With a status, it waits for the device itself instead of fixed times.",detected:"Detected: {name}",detected_none:"No profile for this device's integration: it uses the fixed times below.",detected_uses:"Uses",detected_now:"Now: {value}",detected_found_indicator:"Status from {entity}",detected_found_attribute:"attribute {attribute}",detected_found_remote:"Remote: {entity}",detected_found_outlet:"Outlet: {entity}",detected_found_settings:"Settings: {entities}",detected_use:"Use these",detected_applied:"In use",detected_siblings:"Also covered by: {integrations}",detected_role:"{role}: {integration}",state_source:"Status","state_source.auto":"Automatic (from the profile)","state_source.none":"None: fixed times only","field.profile":"Profile","profile.auto":"Automatic (for its integration)","field.wait_on":"When turning on, wait for","field.wait_off":"Before cutting the outlet, wait for","wait.status":"Its status","wait.time":"A fixed time","wait.both":"Its status, then a fixed time","field.timeout_on":"Status timeout, turning on","field.timeout_off":"Status timeout, turning off","field.debounce":"Debounce","helper.debounce":"Seconds a state must hold before it counts, so a flicker doesn't.","field.on_failure_on":"If it doesn't come on","field.on_failure_off":"If it doesn't go off","failure.warn":"Warn and continue","failure.stop":"Stop the activity","failure.retry":"Try once more, then warn","failure_off.stop":"Leave its outlet on",state_fixed_only:"No status for this device: only the fixed times below apply.",footer_version:"Easy AV Control (Ltek) {version}",star:"\u2B50 Star on GitHub",report:"\u{1F41B} Report an issue",title:"Easy AV Control",rooms:"Rooms",add_room:"Add room",guide:"Guide",act_startup:"Startup",act_shutdown:"Shutdown",act_hold:"Hold for 3 seconds to start this activity",act_saved_only:"Runs the activity as saved; save first to use your changes.",reports:"Reports","rep.title":"Reports","qs.title":"Quick Start","qs.hint":"What is set up, and the steps left, for the whole system and for each activity. Apply does the automatic ones; the others say what to do and open the page for it. Come back any time.","qs.your_setup":"Your setup","qs.tab_system":"System","qs.tab_activity":"Activities","qs.system_hint":"Needed once, for every activity: the room, its devices, nothing else switching them, notifications, the card.","qs.activity_hint":"Needed by each activity on its own: its devices, a startup that worked, checks, who starts it.","qs.no_activity":"No activity yet: Activities tab \u2192 + Activity, then its Flow.","qs.astep.devices":"Its devices","qs.astep.tested":"A startup that worked","qs.astep.checks":"Checks: does it work once it's on","qs.astep.started_by":"The Harmony remote starts the activity","qs.astep.auto_off":"Auto-off when nothing plays","qs.all_done":"All done","qs.n_done":"{done} of {total} done","qs.apply":"Apply {n} step(s)","qs.applied":"All automatic steps done","qs.apply_hint":"Apply only adds what is missing; it changes nothing that exists.","qs.open":"open","qs.show_sidebar":"show it","qs.card_on":"on {boards}","qs.card_add":"not on a dashboard yet: Edit dashboard \u2192 Add card \u2192 Easy AV Control, or paste:","qs.s_rooms":"{n} room(s)","qs.s_devices":"{n} device(s)","qs.s_activities":"{n} activities","qs.s_activities_off":"{n} activities, {off} disabled","qs.s_runs":"{n} run(s)","qs.s_alerts":"{n} alert(s)","qs.step.rooms":"A room","qs.step.detect":"Your AV devices","qs.step.status":"Easy AV Control can read each device's status","qs.step.activity":"An activity with its devices","qs.step.competing":"No other automation switches the AV devices","qs.step.tested":"A startup that worked","qs.step.checks":"Checks: does it work once it's on","qs.step.started_by":"The Harmony remote starts the activity","qs.step.auto_off":"Auto-off when nothing plays","qs.step.blueprint":"Notifications blueprint","qs.step.notifications":"Notifications for Watchdog and Monitoring","qs.step.card":"The remote control card on a dashboard","qs.step.sidebar":"Editor in the sidebar","rep.entities":"Entities","rep.entities_hint":"Per room: the entities Easy AV Control makes, and the ones it relies on, with what each is for and its state now.","rep.ent_created":"Made by Easy AV Control","rep.ent_used":"Relied on","rep.ent_missing":"missing","rep.ent.switch":"On while an activity runs, starts or failed; on starts the default activity, off shuts down","rep.ent.sensor":"The room's state: idle, starting, active, stopping or error (for automations)","rep.ent.select":"Which activity runs; choosing one starts it","rep.ent.scene":"Starts {activity}","rep.ent.problem":"{problem}: on while the problem lasts (notifications follow it)","rep.use.device":"Turned on and off as","rep.use.outlet":"Outlet for","rep.use.remote":"Remote buttons for","rep.use.ready":"Connection check for","rep.use.status":"Status (on / off) of","rep.use.picture":"Picture check of","rep.use.check":"Checked in","rep.use.started_by":"Starts",watchdog:"Watchdog",tab_watchdog:"Watchdog",watchdog_hint:"The room outside its activities: a device that is on while nothing uses it, or reports an error. Each turns on a sensor of the room, which a notification can follow.","problem.on_unexpectedly":"Device on unexpectedly","problem.device_error":"Device error","problem.device_lost":"Device lost","problem.picture_lost":"Picture lost","problem.left_on":"Left on",watchdog_ok:"Nothing wrong",watchdog_save_first:"The sensors appear once the room is saved.",watchdog_devices:"Devices",watchdog_devices_hint:"What happens when a device is on while the room is idle, or the running activity doesn't use it.",watchdog_no_status:"Easy AV Control can't read this device's status (no profile), so it can't be watched.",watchdog_error:"A device that reports an error is always reported.",watchdog_notify:"Notifications for these",check_keep:"Keep checking while active (Monitoring: Picture lost)","action.turn_off":"Turn off","action.turn_on":"Turn on","action.keep_on":"Keep on","action.shutdown":"Shut down","action.dismiss":"Dismiss","ntf.scope_watchdog":"Watchdog","ntf.scope_monitoring":"Monitoring","ntf.title":"Notifications","ntf.hint":"One ready-made alert per room and monitor problem, made from the Smart Repeating Alerts blueprint: a normal Home Assistant automation with its own editor and traces. It notifies when the problem's sensor turns on and clears itself when it turns off. Its buttons only tell Easy AV Control what to do; the integration does it.","ntf.blueprint":"Blueprint","ntf.bp_installed":"Smart Repeating Alerts {version}","ntf.bp_foreign":"blueprints/automation/LTek/smart-repeating-alerts-ltek.yaml is another file ({version}); it is left as it is","ntf.bp_missing":"Not installed yet: it is installed with the first alert.","ntf.bp_install":"Install {version}","ntf.bp_update":"Update to {version}","ntf.phones":"Send to","ntf.no_phones":"No phone with the Home Assistant app yet.","ntf.pick_phone":"Pick at least one phone","ntf.create":"Create","ntf.edit":"Edit","ntf.on":"On","ntf.off":"Off","rep.hint":"How long each start and stop took, and how long each device took to come on and go off. Times are measured while Easy AV Control switches; the last 300 runs and 100 times per device are kept.","rep.refresh":"Refresh","rep.clear":"Clear","rep.clear_confirm":"Delete the whole history? The typical times used for timeouts stay.","rep.runs":"Runs","rep.devices":"Devices","rep.devices_hint":`From the turn-on (or turn-off) command until the device's status changed to on (off) (the seconds it has to hold, the debounce, are not counted), for devices with a status. Only when Easy AV Control switched the device. "Picture shown" and "Signal locked" time the checks of an activity (the device's picture check, or an entity of your own such as the audio stream type): from switching the device on until the check passes.`,"rep.no_runs":"No runs yet: start an activity.","rep.no_devices":"No device times yet. They are measured for devices with a status, when an activity switches them.","rep.show":"Show","rep.mode_all":"Startups and shutdowns","rep.mode_start":"Startup","rep.mode_stop":"Shutdown","rep.export":"Export","rep.export_run":"Export this run with its trace","rep.copied":"Copied to the clipboard","rep.export_hint":"The report is a JSON file: the runs, each with its trace (what Easy AV Control did, every service call and every state change of the room's entities), the device times, the rooms as configured and the versions.","rep.from":"from {activity}","rep.typical":"typical","rep.count":"{n} runs","rep.count_times":"{n} times","rep.failed":"{n} failed","rep.result_ok":"OK","rep.result_warning":"Warnings","rep.result_error":"Failed","rep.result_cancelled":"Cancelled","rep.phase_switch_off_unused":"Turn off what's not needed","rep.phase_outlets_on":"Outlets on","rep.phase_outlets_off":"Outlets off","rep.phase_checks":"Checks","rep.phase_steps":"Actions after start","rep.phase_hooks":"Actions on start / stop","rep.dir_on":"Turn on","rep.dir_off":"Turn off","rep.lane_off":"Off","rep.lane_standby":"Standby","rep.lane_busy":"Starting / warming / stopping","rep.lane_idle":"Idle","rep.lane_on":"On","rep.lane_on_already":"was on","rep.took":"From switching it on until its status said on","rep.sent_at":"Switched on at {time}","rep.then_hint":"Then: the outlets, the checks and the actions after start. They don't hold up any device's power-on.","rep.dir_picture":"Picture shown","rep.dir_signal":"Signal locked","rep.warm":"was on already: counted from the start of the check","rep.dir":"","rep.when":"When","rep.time":"Time","rep.result":"Result","rep.for":"Room \xB7 activity","rep.slow":"Slow",sidebar_chip:"Editor in Sidebar",sidebar_hint:"Show Easy AV Control in Home Assistant's sidebar. Hidden, it stays at /easy-av-control and under Settings \u2192 Devices & services \u2192 Easy AV Control \u2192 Configure.",no_rooms:"No rooms yet.",room_name:"Name",room_area:"Area",room_default_activity:"Default activity",default_last:"Last used",gen_unlock:"Unlock to edit",gen_lock:"Lock without saving",gen_no_area:"No area",gen_default:"Default activity","helper.default_activity":"What the room's on/off switch and toggle_activity start, e.g. from a wall button.",room_id_hint:"ID {id}",delete_room:"Delete room",delete_room_confirm:'Delete room "{name}" with all devices and activities?',tab_devices:"Devices",tab_activities:"Activities",tab_yaml:"YAML",add_device:"Add device",add_activity:"Add activity",delete:"Delete",move_up:"Move up",move_down:"Move down",device_id:"Device ID",device_in_use:'Device "{id}" is used by: {where}. Remove it there first.',activity_id_hint:"ID {id} \u2013 part of the entity IDs, cannot be changed",new_activity:"New activity",add_device_to_activity:"Add device \u2026",steps:"Actions after start",section_checks:"Checks",hint_checks:"What must be right before the activity counts as running, e.g. a picture on the Lumagen and on the projector. They run at the same time, once every device is on, and again when you switch to this activity from another.",add_check:"Check",check_profile:"Picture check of its profile",check_entity:"An entity of your own",check_what:"What",check_entity_label:"Entity",check_states:"Right when it shows",check_states_placeholder:"e.g. on, Active Video",check_timeout:"Timeout",check_failure:"If it isn't right",check_warn:"Warn and go on",check_stop:"Stop the activity",check_none:"No checks: the activity counts as running once its devices are on.",check_unless_text:"Waits until {entity} no longer shows {states}.",add_step:"Add step \u2026",hooks:"Actions on start and stop",remote:"Remote control",quick_select:"Quick select",quick_select_hint:"Buttons that switch a media player to a source; on an Apple TV the sources are its apps.",quick_select_no_player:"Add a media player to this activity first.",add_quick_select:"Add quick select",card_settings:"Settings in the card",card_settings_hint:"Source, sound mode and other settings of the devices, changeable in the card while the activity runs: those set on the devices, or a choice for this activity only. The section is closed until it is opened; each browser remembers that.","setting.entity":"Entity of the device","field.entity":"Entity","helper.entity":"A number (slider), select (list) or switch (on/off key), e.g. the receiver's bass.","field.settings_mode":"Show",settings_auto:"From the devices",settings_chosen:"Chosen here, with favourites",settings_auto_shows:"The card shows: {list}.",settings_auto_none:"The devices of this activity offer no settings yet. Choose them on a device, or start the activity once so its media players report their lists.",device_settings_hint:"What the card offers of this device, in every activity that uses it. Automatic: source and sound mode of a media player, and the number and select entities of the same device.",device_settings_auto:"Automatic",device_settings_auto_none:"Nothing found yet: no source or sound mode list reported, and no number or select entities of the same device.",device_settings_none:"The card shows no settings of this device.",settings_none:"The card shows no settings for this activity.",add_setting:"Add setting","field.setting":"Setting","field.options":"Favourites (optional)","helper.options":"Only these in the card, in this order; empty: the device's whole list.",commands:"Own commands",save:"Save",discard:"Discard",saving:"Saving \u2026",saved:"Saved",unsaved:"Unsaved changes",reload:"Reload",reload_confirm:"Discard your unsaved changes and load the saved configuration?",retry:"Try again",save_anyway:"Save anyway",conflict:"The configuration was changed elsewhere. Reload it \u2013 your unsaved changes here are lost.",invalid:"Not saved \u2013 {path}: {message}",missing:"These entities do not exist in Home Assistant:",missing_hint:"A device without power usually stays known. Most likely a typo or a renamed entity.",loading:"Loading \u2026",load_error:"Could not load the configuration: {error}",route_auto:"Automatic",route_none:"Hide",devices_intro:"Every device of the room that Easy AV Control switches or controls: TV, projector, receiver, player.",devices_empty:"No devices yet.",new_device:"New device",no_entity:"No entity chosen",entity_missing:"Entity not found in Home Assistant",used_by:"Used by: {where}",section_device:"Device",hint_device:"The Home Assistant entity of the device, usually a media player.",section_power:"Power Outlet",hint_power:"The outlet that powers the device: switched on before the device and off after it. Untick when the device isn't on a switched outlet.",power_use:"Switch this device's power outlet",section_delays:"Waiting times",hint_delays:"How long Easy AV Control waits for this device.",section_ready:"Connection check",hint_ready:"Waits until the device is reachable in Home Assistant, before switching it on and before remote buttons. For devices that lose their connection without power, such as an Apple TV.",ready_preset:"Use {entity} for the connection check and the arrow keys (recommended for Apple TV)",section_advanced:"Advanced",hint_device_advanced:"The device ID is used in the YAML configuration. Own commands map a button name to Home Assistant actions, e.g. arrow keys for a receiver box.",activities_intro:'An activity combines devices for one use, e.g. "Apple TV" = TV and Apple TV. Starting it switches on what it needs and off what it does not.',activities_empty:"No activities yet.",no_devices:"No devices",needs_devices:"Add the devices of this room first.",section_general:"General",hint_general:"Name and icon appear in the card. Position sorts the activities.",section_activity_devices:"Devices",hint_activity_devices:"Switched on in this order.",hint_steps:"Extra actions, in this order, once every device is on and the checks passed: e.g. switch the TV to its HDMI input, set the sound mode or the volume, dim the lights.",hint_remote:"Which device gets which buttons of the card. Automatic suits most setups.",hint_activity_advanced:"Commands in YAML, and Home Assistant actions on start and stop.",card_divider:"Remote control card",card_extra:"Extra buttons",hint_card_extra:"Buttons beyond the standard ones, as a YAML list.",card_shows:"The card shows",or:"or",other_integration:"Other",add_device_short:"Device",nav_flow:"Open the flow",step_picture_checks:"Waits until {entity} shows {states}.",step_picture_none:"{device} has no picture check, so this step waits for nothing.",yaml_intro:"The whole room as YAML. Changes here and in the forms are the same configuration.",add_room_name:"Name of the new room",create:"Add",cancel:"Cancel","helper.power_switch":"Shared outlets stay on while any device on them is needed.","helper.delay_after_power":"How long the device needs after the outlet came on. Only waited when the outlet was off.","helper.delay_after_on":"Until the device accepts commands. Only when it was switched on.","helper.delay_after_off":"Cool-down before the next device or the outlet is switched off, e.g. 180 s for a projector.","helper.ready_entity":"E.g. the remote of an Apple TV, which is on only while it is connected.","helper.ready_reload":"Skips the waiting time of an integration that retries its connection.","helper.source":"The list shows what the device reported last, so it must have been on once. A name can also be typed in.","field.entity_id":"Entity","field.name":"Display name","field.power_switch":"Power outlet","field.remote_entity":"Remote (optional)","helper.remote_entity":"Arrow keys, OK, back, home and menu of the card go to this remote entity, e.g. the remote of an Apple TV.","field.delay_after_power":"Boot time (s)","field.delay_after_on":"Wait after switching on (s)","field.delay_after_off":"Wait after switching off (s)","field.ready_enabled":"Wait until available before switching on","field.ready_entity":"Check this entity instead (optional)","field.ready_state":"Wait for state (optional, e.g. on)","field.ready_timeout":"Timeout (s)","field.ready_reload":"Reload its integration","field.ready_on_timeout":"On timeout","field.commands":"Own commands (YAML: name \u2192 actions)","field.icon":"Icon","field.order":"Position","field.on_start":"On start","field.on_stop":"On stop","field.volume":"Volume","field.channels":"Channels","field.transport":"Playback","field.navigation":"Navigation","field.touchpad":"Touch surface","helper.touchpad":"A swipe area instead of the arrow keys in the card. Automatic: for navigation that goes to a remote entity, e.g. an Apple TV.",touchpad_auto:"Automatic",touchpad_on:"On",touchpad_off:"Off (arrow keys)","field.buttons":"Extra buttons (YAML list)","field.label":"Label (optional, default: the source)","field.activity_commands":"Commands of this activity (YAML: name \u2192 actions)","field.type":"Type","field.device":"Device","field.source":"Source","field.volume_level":"Volume","field.sound_mode":"Sound mode","field.brightness_pct":"Brightness (%)","field.color_temp_kelvin":"Color temperature (K)","field.transition":"Transition (s)","field.position":"Position (%)","field.tilt_position":"Tilt (%)","field.action":"Action (e.g. script.turn_on)","field.data":"Data","field.target":"Target","field.timeout":"Timeout (s)","field.reload_integration":"Reload its integration","field.on_timeout":"On timeout","field.delay_after":"Wait afterwards (s)",on_timeout_abort:"Abort the start",on_timeout_continue:"Continue","step.power_on":"Switch on","step.power_off":"Switch off","step.set_source":"Set source","step.set_volume":"Set volume","step.set_sound_mode":"Set sound mode","step.set_brightness":"Set brightness","step.set_color_temp":"Set color temperature","step.set_position":"Set cover position","step.set_tilt":"Set cover tilt","step.call_action":"Call action","step.delay":"Wait","step.wait_available":"Wait until available",section_remote_preview:"Remote control preview",hint_remote_preview:"The card as it looks while this activity runs, with the settings above, also before saving. Tap a button to see where it goes; nothing is sent.","preview.tap":"Tap a button to see which device gets it and what runs there.","preview.this_activity":"this activity","preview.device_commands":"own command of the device: {actions}","preview.activity_commands":"own command of the activity: {actions}","preview.unknown":"does nothing: no device of this activity handles it","preview.unknown_on_device":"does nothing: {device} cannot handle it","preview.ready":"Checks the connection first and restores it if needed.","preview.dead":"These buttons are shown but do nothing:","preview.groups":"Button groups","preview.mode_auto":"automatic","preview.mode_set":"chosen","preview.hidden":"hidden","preview.no_device":"no suitable device, not shown","preview.no_keys":"not shown: {device} has none of these buttons",section_flow:"Flow: what is switched when",hint_flow:"Computed from the settings of this activity and its devices, also before saving. Times count only the configured waits; how long the devices take to respond comes on top.","flow.mode_start":"Startup","flow.mode_stop":"Shutdown","flow.from_label":"Starting from","flow.from_idle":"from idle (everything off)","flow.from":"switching from {activity}","flow.failed":"Could not compute the flow: {error}","flow.invalid":"No flow while the configuration has an error \u2013 {error}","flow.state_starting":"Room: starting","flow.state_active":"Room: active","flow.state_stopping":"Room: stopping","flow.state_idle":"Room: off","flow.outlets_on":"Turn on the outlets, all at once: {outlets}","flow.outlets_off":"Turn off the outlets: {outlets}","flow.outlets_off_later":"Turn off the outlet after its cool-down: {outlets}","flow.outlet_keep":"{outlet} stays on, this activity needs it","flow.outlets_already_on":"already on: {outlets}","flow.unless_rooms":"not while {rooms} uses it","flow.on_start":"Actions on start begin","flow.on_start_wait":"Wait until the actions on start are done","flow.on_stop":"Actions on stop begin","flow.on_stop_wait":"Wait until the actions on stop are done","flow.parallel":"runs alongside","flow.already_on":"Already on in {activity}: no switching, no waiting","flow.boot":"Boot time: until {seconds} after the outlets came on","flow.reload":"Reload the integration of {entity}","flow.ready":"Wait until {entity} is available, at most {timeout}","flow.ready_state":"Wait until {entity} is {states}, at most {timeout}","flow.on_timeout_abort":"\u2013 otherwise the start is aborted","flow.on_timeout_continue":"\u2013 otherwise it goes on anyway","flow.turn_on":"Turn on {device}","flow.turn_off":"Turn off {device}","flow.turn_off_unused":"Turn off {device}, this activity does not use it","flow.cannot_switch":"{device} cannot be switched on or off, nothing is sent","flow.wait_on":"Wait {seconds} until the device is ready","flow.wait":"Wait {seconds}","flow.mode_monitor":"Monitoring","flow.summary_monitor":"Monitoring checks this every few seconds while the activity is active; the room's Watchdog has its own page. Each problem turns on its sensor (binary_sensor.av_<room>_\u2026), which a notification can follow; its buttons tell Easy AV Control what to do.","flow.monitor_lost":"Notify when a device of this activity is off or unreachable for {seconds}","flow.monitor_picture":"Checks keep running: notify when one fails for {seconds}","flow.monitor_idle":"Auto-off: when nothing has played for {idle}, notify, then shut down {warning} later","flow.monitor_error":"Notify when a device reports an error, at any time","flow.monitor_watch":"{device}: notify when it is on and nothing uses it, after {grace}","flow.monitor_watch_off":"{device}: notify when it is on and nothing uses it, after {grace}; turn it off {after} later","flow.add_monitor_hint":"Add to the monitor:","flow.add_monitor_lost":"Device lost","flow.add_monitor_picture":"Keep checking","flow.add_monitor_idle":"Auto-off",section_monitor:"Watchdog",hint_monitor:`When this device is on while the room is idle, or the running activity doesn't use it: notify (its room's "Device on unexpectedly" sensor turns on), and optionally turn it off.`,monitor_hint:"While this activity is active. 0 turns one off.","field.watch_mode":"When it is on unexpectedly","watch.off":"Don't watch","watch.notify":"Notify","watch.turn_off":"Notify, then turn it off","field.watch_grace":"After","field.watch_turn_off_after":"Turn off after","field.lost_after":"Device lost after","field.picture_lost_after":"Picture lost after","field.idle_after_min":"Auto-off when nothing plays for (min)","field.idle_warning_min":"Shut down after the notification (min)","flow.started_by":"Also starts when {entity} changes to {states}","flow.stopped_by":"Also shuts down when {entity} changes to {states}","flow.add_started_by":"Started by",started_by:"Started by",started_by_hint:"Start this activity when an entity changes to a state, e.g. the Harmony remote's activity button or a wall switch, and optionally shut it down on another state. Changes that come from this activity's own startup or shutdown are ignored, and so are reconnects.","field.started_by_entity":"Entity","field.started_by_state":"Starts on","field.started_by_stop":"Shuts down on (optional)","flow.delay":"Wait {seconds} before turning it on","flow.wait_for":"Wait until {what}, at most {timeout}","flow.wait_for_on":"{device} is on","flow.wait_for_picture":"{device} shows a picture","flow.and":" and ","flow.turn_off_later":"Turn off {device} {seconds} after the shutdown","flow.option":"selects {option}","flow.delete":"Remove","flow.group.on":"on","flow.group.off":"off","flow.group.starting":"starting","flow.group.stopping":"stopping","flow.group.error":"error","flow.add_device":"Device","flow.device_actions":"What happens to {device} in this activity","flow.device_identity":"What the device is (its entity, remote, outlet, status) is set on its own page, for every activity.",duplicate:"Duplicate",act_export:"Export",act_enabled:"Enabled",act_disabled:"Disabled",act_enabled_hint:"A disabled activity can't be started: the card, its scene and select, Started by and the default activity leave it out. Saved with Save.",act_export_all:"Export all",act_import:"Import",act_download:"Download",act_export_hint:"The activity with every device it uses. Import it in another room or another Home Assistant; devices with the same entity there are used, the others are added.",act_import_hint:`Paste an export, or choose its file. Import replaces an activity of the same name, and every device with the same entity, completely with the file's; the rest is added. Import as a copy adds the activity beside the old one as "Name 2". Nothing is stored until Save.`,act_import_copy:"Import as a copy",act_import_replaced:"Replaced: {names}",act_import_devices_replaced:"devices replaced: {devices}",act_import_confirm:"The file replaces {devices}. These activities use them too and get their new settings: {activities}. Import?",act_import_done:"Added: {added}",act_import_devices:"devices added: {devices}",act_import_started_by:"Started by left out of {names}: another activity starts on the same entity",copy_suffix:"(copy)",move_earlier:"Earlier",move_later:"Later","flow.add_check":"Check","flow.add_step":"Action after start","flow.add_on_start":"Actions on start","flow.add_on_stop":"Actions on stop","flow.add_hint":"Add to the startup:","flow.add_stop_hint":"Add to the shutdown:","flow.edit_hint":"Click \u270E on a line to change it here, the trash icon removes it.","flow.close_edit":"Done","flow.device_shared":"These settings belong to the device: they apply to every activity that uses it.","flow.open_device":"Open the device page","flow.remove_device":"Remove from this activity","flow.before":"Before turning it on","flow.before_hint":"Wait a fixed time, and/or until other devices of this activity are on or show a picture.","flow.add_wait_for":"+ Wait for a device","flow.pick_device":"Add a device\u2026","flow.no_more_devices":"Every device of the room is in this activity. New devices are added on the Devices page.","field.before_delay":"Wait first","field.before_timeout":"At most","field.before_on_timeout":"If not in time","wait_for.on":"is on","wait_for.picture":"shows a picture","field.turn_off_after":"At shutdown, turn off after","helper.turn_off_after":"0: with the other devices. For seats or lights that stay on for a while; a new startup keeps it on.","field.option":"Activity to select","helper.option":"Startup selects it; without one, the first that isn't the off option.","field.off_option":"Shutdown selects","wait.none":"Nothing, go on at once","flow.steps":"Actions after start","flow.checks":"Checks, all at once","flow.edit":"Edit","flow.options":"Flow Details Filters","flow.options_hint":"What counts as a detail: hidden while Details is off, here and on the card.","flow.details_chip":"Details","flow.detail_entities":"Entity IDs and actions","flow.detail_waits":"Waits","flow.detail_notes":"Notes","flow.detail_reloads":"Reloads","flow.detail_outlets":"Outlets","flow.detail_hooks":"Actions on start and stop","flow.check":"{device}: wait until {entity} shows {states}, at most {timeout}","flow.check_unless":"{device}: wait until {entity} no longer shows {states}, at most {timeout}","flow.check_missing":"{device}: nothing to check, its profile has no picture check","flow.check_warn":"\u2013 otherwise a warning","flow.background":"In the background, after the room is done","flow.if.outlet_was_off":"only if its outlet was off","flow.if.if_off":"only if the device is off","flow.if.if_on":"only if the device is on","flow.reload_if_needed":"reloads its integration if not ready","flow.cooldown":"then {seconds} cool-down","flow.summary_start":"Active after {min} at the earliest, {max} at the latest if every readiness check takes its full timeout.","flow.summary_start_fixed":"Active after {min}.","flow.summary_stop":"Off as soon as the devices are switched off and the actions on stop are done.","flow.summary_stop_cut":"Off as soon as the devices are switched off and the actions on stop are done; the last outlet goes off after {seconds}."},de:{"pf.form":"Formular","pf.form_hint":"Jeder Teil des Profils, an einem echten Ger\xE4t seiner Integration gew\xE4hlt. Entit\xE4ten werden so gespeichert, wie jedes Home Assistant sie findet (Typ und \xDCbersetzungsschl\xFCssel), nie \xFCber ihre Entit\xE4ts-ID.","pf.general":"Allgemein","pf.general_hint":"Wof\xFCr das Profil ist und wo seine Ger\xE4te in der Einschaltreihenfolge einer Aktivit\xE4t stehen.","pf.name":"Name","pf.id":"ID","pf.integration":"Integration","pf.example":"Beispielger\xE4t","pf.no_example":"Kein Ger\xE4t dieser Integration vorhanden: Entit\xE4ten lassen sich nicht w\xE4hlen, nur in YAML eintragen.","pf.device_entity":"Ger\xE4te-Entit\xE4t","pf.order":"Einschaltreihenfolge","pf.status":"Status","pf.status_hint":"Welche Entit\xE4t sagt, dass das Ger\xE4t an ist, und was jeder ihrer Werte bedeutet. Einen angezeigten Wert antippen oder einen eintippen.","pf.status_entity":"Status-Entit\xE4t","pf.status_own":"Keine gew\xE4hlt: der Zustand der Ger\xE4te-Entit\xE4t selbst ist der Status.","pf.status_other":"Der Zustand (oder das Attribut) dieser Entit\xE4t ist der Status.","pf.attribute":"Attribut","pf.attribute_none":"Ihr Zustand","pf.now":"Jetzt: {value}","pf.available_is_on":"An, solange diese Entit\xE4t verf\xFCgbar ist (sie ist nicht verf\xFCgbar, w\xE4hrend das Ger\xE4t aus ist)","pf.group.starting":"Startet","pf.group.on":"An","pf.group.stopping":"Stoppt","pf.group.off":"Aus","pf.group.error":"Fehler","pf.other_value":"Anderer Wert \u2026","pf.timing":"Zeiten","pf.timing_hint":"Wie lange auf An und Aus gewartet wird, bevor die Fehler-Einstellung des Ger\xE4ts greift, und wie lange ein Zustand anhalten muss.","pf.timeout_on":"Zeitlimit beim Einschalten","pf.timeout_off":"Zeitlimit beim Ausschalten","pf.debounce":"Entprellen","pf.reset":"Zur\xFCck zum Standard","pf.companions":"Fernbedienung, Steckdose und Einstellungen","pf.companions_hint":"Wird bei jedem Ger\xE4t mit diesem Profil eingetragen.","pf.remote":"Fernbedienung (Pfeiltasten)","pf.power_switch":"Steckdosen-Schalter","pf.settings":"Einstellungen in der Karte","pf.settings_hint":"In der Fernbedienungskarte angeboten, w\xE4hrend eine Aktivit\xE4t l\xE4uft.","pf.picture":"Bildpr\xFCfung","pf.picture_hint":"Ein Ger\xE4t, das meldet, ob ein Bild ankommt (Lumagen Active Video, JVC Source Display): Integrationen erkennen f\xFCgt daf\xFCr eine Bildpr\xFCfung zu den Pr\xFCfungen der Aktivit\xE4t hinzu.","pf.picture_on":"Dieses Ger\xE4t hat eine Bildpr\xFCfung","pf.picture_entity":"Entit\xE4t","pf.picture_ok":"Bild","pf.picture_fail":"Kein Bild","pf.picture_timeout":"Zeitlimit","pf.jobs":"Aufgaben","pf.jobs_hint":"F\xFCr ein Ger\xE4t, das mehrere Integrationen abdecken (ein TV mit PiPup, ADB und Android TV Remote): die Aufgaben dieser. Kleinere Zahlen gewinnen.","pf.none":"Keine","pf.not_on_device":"nicht an diesem Ger\xE4t",detect_used_integration:"F\xFCr den Zustand dieses Ger\xE4ts genutzt",detect_open_profile:"Dieses Profil \xF6ffnen",detect_no_area:"Kein Bereich",detect_select_all:"Alle ausw\xE4hlen",timing_on:"Geht in etwa {typical} an ({count} gemessen, langsamste {slowest})",timing_off:"Geht in etwa {typical} aus ({count} gemessen, langsamste {slowest})",timing_use:"Gemessene Zeitlimits \xFCbernehmen",timing_use_hint:"Setzt die Status-Zeitlimits auf das, was die Messungen nahelegen: anderthalbmal so lang wie \xFCblich und l\xE4nger als die langsamste.","flow.typical":"meist {seconds}",setup:"Einrichtung","flow.picture":"{step}. Warten, bis {entity} {states} zeigt, h\xF6chstens {timeout}","field.on_failure_picture":"Wenn kein Bild kommt",detect:"Integrationen erkennen",detect_intro:"Vergleicht, was in Home Assistant installiert ist, mit dem, was die R\xE4ume nutzen. Ankreuzen, was sich \xE4ndern soll, dann \xDCbernehmen: die \xC4nderungen erscheinen als ungespeichert; gespeichert wird erst mit Speichern.",detect_running:"Integrationen werden angesehen \u2026",detect_nothing:"Nichts zu \xE4ndern: jedes AV-Ger\xE4t mit Profil ist in einem Raum, und jede Entit\xE4t der R\xE4ume existiert.",detect_new:"Erkannte Ger\xE4te",detect_new_hint:"Ger\xE4te, die noch kein Raum nutzt, nach ihrem Home-Assistant-Bereich. Die hinzuzuf\xFCgenden ankreuzen: sie kommen in die angekreuzten Aktivit\xE4ten, an die Stelle, die ihr Profil in der Einschaltreihenfolge vorgibt (fr\xFCh, Mitte, sp\xE4t), mit Status, Fernbedienung und Steckdose. Der Profil-Chip \xF6ffnet sein Profil; der blaue Integrations-Chip ist der f\xFCr den Zustand des Ger\xE4ts genutzte.",detect_room:"Raum",detect_new_room:"Neuer Raum: {name}",detect_activities:"Hinzuf\xFCgen zu",detect_no_activities:"Dieser Raum hat noch keine Aktivit\xE4ten.",detect_starter:"Pro Raum eine neue Aktivit\xE4t mit den ausgew\xE4hlten Ger\xE4ten anlegen",detect_picture:"mit Bildpr\xFCfung",detect_better:"Bessere Integrationen",detect_better_hint:"Ein Ger\xE4t eines Raums, das eine andere Integration jetzt besser abdeckt (schneller oder ausf\xFChrlicher). Nicht angekreuzt: zum Wechseln ankreuzen.",detect_better_row:"{from} \u2192 {to}",detect_gone:"Fehlende Entit\xE4ten",detect_gone_hint:"Entit\xE4ten eines Raums, die es nicht mehr gibt, z. B. nach dem Entfernen einer Integration. Wird dasselbe Ger\xE4t noch von einer anderen Integration abgedeckt, wird sie als Ersatz angeboten.",detect_replace_with:"Ersetzen durch {entity} ({integration})",detect_no_replacement:"Kein Ersatz; bitte von Hand anpassen. Ein Ger\xE4t ohne Status nutzt seine festen Zeiten.",detect_renamed:"Umbenannte Entit\xE4ten",detect_renamed_hint:"Dieselbe Entit\xE4t unter neuer ID. Sie wird \xFCberall ersetzt au\xDFer in Aktionen und Befehlen: diese pr\xFCfen.",detect_unmatched:"Integrationen ohne Profil",detect_unmatched_hint:"Ihre Ger\xE4te arbeiten mit festen Zeiten. Ein Profil anlegen, damit Easy AV Control auf ihre eigenen Zust\xE4nde warten kann.",detect_create_profile:"+ Profil",detect_apply:"\xDCbernehmen",detect_applied:"\xDCbernommen. R\xE4ume pr\xFCfen, dann Speichern.",detect_again:"Erneut erkennen",profile_new:"+ Profil",profile_new_pick:"Integration",profile_new_hint:"Integrationen mit Mediaplayer oder Fernbedienung ohne Profil. Der Entwurf startet vom ersten Ger\xE4t der gew\xE4hlten.",profile_new_none:"Jede Integration mit Mediaplayer oder Fernbedienung hat ein Profil.",learn:"Lernen",learn_hint:"Das Ger\xE4t hier ein- und wieder ausschalten: Easy AV Control zeichnet auf, was {entity} zeigt, und tr\xE4gt ein, welche Zust\xE4nde Starten, An, Stoppen und Aus bedeuten.",learn_on:"Jetzt einschalten",learn_off:"Jetzt ausschalten",learn_seen_on:"Beim Einschalten: {states}",learn_seen_off:"Beim Ausschalten: {states}",learn_use:"Gesehenes \xFCbernehmen",learn_nothing:"Noch nichts aufgezeichnet.","flow.status_on":"Warten, bis {device} meldet, dass es an ist ({entity}), h\xF6chstens {timeout}","flow.status_off":"Warten, bis {device} meldet, dass es aus ist ({entity}), h\xF6chstens {timeout}","flow.outlets_off_status":"Steckdose ausschalten, sobald ihre Ger\xE4te aus sind: {outlets}","flow.debounce":"der Zustand muss {seconds} anhalten",profiles:"Profile",profiles_intro:"Ein Profil sagt Easy AV Control, was die Entit\xE4ten einer Integration \xFCber ein Ger\xE4t verraten: welche Entit\xE4t zeigt, dass es an ist, was ihre Zust\xE4nde bedeuten, Fernbedienung, Steckdose und Einstellungen. Eingebaute sind gesperrt: zum \xC4ndern duplizieren.",profiles_builtin:"Eingebaut",profiles_yours:"Eigene",profiles_none_yours:"Noch keine. Ein eingebautes Profil duplizieren oder eines importieren.",profile_generic:"f\xFCr jeden Mediaplayer ohne eigenes Profil",profile_untested:"Aus dem Code der Integration, nicht an einem Ger\xE4t getestet",profile_used_by:"Genutzt von {where}",profile_unused:"Von keinem Ger\xE4t genutzt",profile_preview:"Zusammenfassung zeigen",profile_view:"Ansehen",profile_edit:"Bearbeiten",profile_duplicate:"Duplizieren",profile_delete_confirm:'Eigenes Profil "{name}" l\xF6schen? Ger\xE4te, die es nutzen, nehmen wieder das eingebaute.',profile_readonly:"Eingebaut: nur lesen. Zum \xC4ndern duplizieren.",profile_editor_hint:"Das Profil als YAML. Entit\xE4ten werden am Ger\xE4t \xFCber Domain und translation_key gefunden, nie \xFCber die Entit\xE4ts-ID; so passt das Profil zu jedem Home Assistant.",profile_save:"Profil speichern",profile_close:"Schlie\xDFen",profile_cancel:"Abbrechen",profile_saved:"Profil gespeichert.",profile_export:"Exportieren",profile_export_all:"Eigene exportieren",profile_import:"Importieren",profile_import_hint:"Einen Profil-Export von Easy AV Control einf\xFCgen. Vorhandene Profile werden nie ersetzt: eines mit vergebener ID kommt unter einer neuen dazu.",profile_import_done:"Hinzugef\xFCgt: {added}",profile_import_renamed:"{from} als {to} hinzugef\xFCgt",profile_import_invalid:"Ung\xFCltig, \xFCbersprungen: {ids}",profile_copy:"In die Zwischenablage",profile_copied:"Kopiert \u2713",profile_copy_failed:"Strg/Cmd+C dr\xFCcken",profile_paste:"Aus der Zwischenablage",profile_paste_failed:"Mit Strg/Cmd+V einf\xFCgen",profile_share:"Profil teilen",profile_share_hint:"Eines f\xFCr ein Ger\xE4t gebaut, das andere auch haben? Exportieren und den Text \xFCber Problem melden (unten im Men\xFC) schicken: angenommene Profile werden eingebaut.",sum_indicator:"An / aus \xFCber {what}",sum_indicator_device:"den Zustand des Ger\xE4ts",sum_indicator_available:"die Verf\xFCgbarkeit von {what}",sum_states:"{groups}",sum_remote:"Fernbedienung",sum_outlet:"Steckdose",sum_settings:"Einstellungen",sum_picture:"Bildpr\xFCfung",sum_order:"Einschaltreihenfolge: {order}",sum_roles:"Aufgaben: {roles}","order.early":"fr\xFCh","order.middle":"Mitte","order.late":"sp\xE4t","role.power":"Strom","role.navigation":"Pfeiltasten","role.now_playing":"l\xE4uft gerade","role.turn_off":"Ausschalten",section_state:"Ger\xE4tezustand",hint_state:"Woran Easy AV Control erkennt, dass das Ger\xE4t an oder aus ist. Mit einem Status wartet es auf das Ger\xE4t selbst statt auf feste Zeiten.",detected:"Erkannt: {name}",detected_none:"Kein Profil f\xFCr die Integration dieses Ger\xE4ts: es gelten die festen Zeiten unten.",detected_uses:"Nutzt",detected_now:"Jetzt: {value}",detected_found_indicator:"Status von {entity}",detected_found_attribute:"Attribut {attribute}",detected_found_remote:"Fernbedienung: {entity}",detected_found_outlet:"Steckdose: {entity}",detected_found_settings:"Einstellungen: {entities}",detected_use:"\xDCbernehmen",detected_applied:"In Gebrauch",detected_siblings:"Auch abgedeckt von: {integrations}",detected_role:"{role}: {integration}",state_source:"Status","state_source.auto":"Automatisch (aus dem Profil)","state_source.none":"Keiner: nur feste Zeiten","field.profile":"Profil","profile.auto":"Automatisch (f\xFCr seine Integration)","field.wait_on":"Beim Einschalten warten auf","field.wait_off":"Vor dem Abschalten der Steckdose warten auf","wait.status":"Seinen Status","wait.time":"Eine feste Zeit","wait.both":"Seinen Status, dann eine feste Zeit","field.timeout_on":"Status-Zeitlimit beim Einschalten","field.timeout_off":"Status-Zeitlimit beim Ausschalten","field.debounce":"Entprellen","helper.debounce":"Sekunden, die ein Zustand anhalten muss, bevor er z\xE4hlt.","field.on_failure_on":"Wenn es nicht angeht","field.on_failure_off":"Wenn es nicht ausgeht","failure.warn":"Warnen und weitermachen","failure.stop":"Aktivit\xE4t beenden","failure.retry":"Noch einmal versuchen, dann warnen","failure_off.stop":"Steckdose anlassen",state_fixed_only:"Kein Status f\xFCr dieses Ger\xE4t: nur die festen Zeiten unten gelten.",footer_version:"Easy AV Control (Ltek) {version}",star:"\u2B50 Auf GitHub markieren",report:"\u{1F41B} Problem melden",title:"Easy AV Control",rooms:"R\xE4ume",add_room:"Raum hinzuf\xFCgen",guide:"Anleitung",act_startup:"Hochfahren",act_shutdown:"Herunterfahren",act_hold:"3 Sekunden gedr\xFCckt halten, um diese Aktivit\xE4t zu starten",act_saved_only:"Startet die Aktivit\xE4t wie gespeichert; vorher speichern, um die \xC4nderungen zu nutzen.",reports:"Berichte","rep.title":"Berichte","qs.title":"Schnellstart","qs.hint":"Was eingerichtet ist, und die \xFCbrigen Schritte, f\xFCr das ganze System und f\xFCr jede Aktivit\xE4t. Anwenden erledigt die automatischen; die anderen sagen, was zu tun ist, und \xF6ffnen die Seite daf\xFCr. Jederzeit wiederkommen.","qs.your_setup":"Deine Einrichtung","qs.tab_system":"System","qs.tab_activity":"Aktivit\xE4ten","qs.system_hint":"Einmal n\xF6tig, f\xFCr alle Aktivit\xE4ten: der Raum, seine Ger\xE4te, keine andere Automation, Benachrichtigungen, die Karte.","qs.activity_hint":"Jede Aktivit\xE4t braucht f\xFCr sich: ihre Ger\xE4te, ein Hochfahren, das geklappt hat, Pr\xFCfungen, wer sie startet.","qs.no_activity":"Noch keine Aktivit\xE4t: Reiter Aktivit\xE4ten \u2192 + Aktivit\xE4t, dann ihr Flow.","qs.astep.devices":"Ihre Ger\xE4te","qs.astep.tested":"Ein Hochfahren, das geklappt hat","qs.astep.checks":"Pr\xFCfungen: Funktioniert es, wenn es an ist","qs.astep.started_by":"Die Harmony-Fernbedienung startet die Aktivit\xE4t","qs.astep.auto_off":"Auto-Aus, wenn nichts l\xE4uft","qs.all_done":"Alles erledigt","qs.n_done":"{done} von {total} erledigt","qs.apply":"{n} Schritt(e) anwenden","qs.applied":"Alle automatischen Schritte erledigt","qs.apply_hint":"Anwenden f\xFCgt nur Fehlendes hinzu; Bestehendes bleibt.","qs.open":"\xF6ffnen","qs.show_sidebar":"einblenden","qs.card_on":"auf {boards}","qs.card_add":"noch auf keinem Dashboard: Dashboard bearbeiten \u2192 Karte hinzuf\xFCgen \u2192 Easy AV Control, oder einf\xFCgen:","qs.s_rooms":"{n} Raum/R\xE4ume","qs.s_devices":"{n} Ger\xE4t(e)","qs.s_activities":"{n} Aktivit\xE4ten","qs.s_activities_off":"{n} Aktivit\xE4ten, {off} deaktiviert","qs.s_runs":"{n} Lauf/L\xE4ufe","qs.s_alerts":"{n} Alarm(e)","qs.step.rooms":"Ein Raum","qs.step.detect":"Deine AV-Ger\xE4te","qs.step.status":"Easy AV Control kann den Status jedes Ger\xE4ts lesen","qs.step.activity":"Eine Aktivit\xE4t mit ihren Ger\xE4ten","qs.step.competing":"Keine andere Automation schaltet die AV-Ger\xE4te","qs.step.tested":"Ein Hochfahren, das geklappt hat","qs.step.checks":"Pr\xFCfungen: Funktioniert es, wenn es an ist","qs.step.started_by":"Die Harmony-Fernbedienung startet die Aktivit\xE4t","qs.step.auto_off":"Auto-Aus, wenn nichts l\xE4uft","qs.step.blueprint":"Blueprint f\xFCr Benachrichtigungen","qs.step.notifications":"Benachrichtigungen f\xFCr Watchdog und Monitoring","qs.step.card":"Die Fernbedienungskarte auf einem Dashboard","qs.step.sidebar":"Editor in der Seitenleiste","rep.entities":"Entit\xE4ten","rep.entities_hint":"Je Raum: die Entit\xE4ten, die Easy AV Control anlegt, und die, auf die es sich st\xFCtzt, mit ihrem Zweck und ihrem Zustand jetzt.","rep.ent_created":"Von Easy AV Control angelegt","rep.ent_used":"Genutzt","rep.ent_missing":"fehlt","rep.ent.switch":"An, solange eine Aktivit\xE4t l\xE4uft, startet oder fehlschlug; an startet die Standardaktivit\xE4t, aus f\xE4hrt herunter","rep.ent.sensor":"Zustand des Raums: idle, starting, active, stopping oder error (f\xFCr Automationen)","rep.ent.select":"Welche Aktivit\xE4t l\xE4uft; eine w\xE4hlen startet sie","rep.ent.scene":"Startet {activity}","rep.ent.problem":"{problem}: an, solange das Problem besteht (Benachrichtigungen folgen ihm)","rep.use.device":"Ein- und ausgeschaltet als","rep.use.outlet":"Steckdose f\xFCr","rep.use.remote":"Fernbedienungstasten f\xFCr","rep.use.ready":"Verbindungspr\xFCfung von","rep.use.status":"Status (an / aus) von","rep.use.picture":"Bildpr\xFCfung von","rep.use.check":"Gepr\xFCft in","rep.use.started_by":"Startet",watchdog:"Watchdog",tab_watchdog:"Watchdog",watchdog_hint:"Der Raum au\xDFerhalb seiner Aktivit\xE4ten: ein Ger\xE4t, das an ist, w\xE4hrend nichts es nutzt, oder einen Fehler meldet. Beides schaltet einen Sensor des Raums ein, dem eine Benachrichtigung folgen kann.","problem.on_unexpectedly":"Ger\xE4t unerwartet an","problem.device_error":"Ger\xE4tefehler","problem.device_lost":"Ger\xE4t verloren","problem.picture_lost":"Bild verloren","problem.left_on":"Angelassen",watchdog_ok:"Alles in Ordnung",watchdog_save_first:"Die Sensoren erscheinen, sobald der Raum gespeichert ist.",watchdog_devices:"Ger\xE4te",watchdog_devices_hint:"Was geschieht, wenn ein Ger\xE4t an ist, w\xE4hrend der Raum ruht oder die laufende Aktivit\xE4t es nicht nutzt.",watchdog_no_status:"Easy AV Control kann den Status dieses Ger\xE4ts nicht lesen (kein Profil), es kann also nicht \xFCberwacht werden.",watchdog_error:"Ein Ger\xE4t, das einen Fehler meldet, wird immer gemeldet.",watchdog_notify:"Benachrichtigungen daf\xFCr",check_keep:"Auch w\xE4hrend aktiv pr\xFCfen (Monitoring: Bild verloren)","action.turn_off":"Ausschalten","action.turn_on":"Einschalten","action.keep_on":"Anlassen","action.shutdown":"Herunterfahren","action.dismiss":"Verwerfen","ntf.scope_watchdog":"Watchdog","ntf.scope_monitoring":"Monitoring","ntf.title":"Benachrichtigungen","ntf.hint":"Ein fertiger Alarm je Raum und Monitor-Problem, aus dem Blueprint Smart Repeating Alerts: eine normale Home-Assistant-Automation mit eigenem Editor und Traces. Sie benachrichtigt, wenn der Sensor des Problems angeht, und r\xE4umt sich auf, wenn er ausgeht. Ihre Tasten sagen Easy AV Control nur, was zu tun ist; die Integration tut es.","ntf.blueprint":"Blueprint","ntf.bp_installed":"Smart Repeating Alerts {version}","ntf.bp_foreign":"blueprints/automation/LTek/smart-repeating-alerts-ltek.yaml ist eine andere Datei ({version}); sie bleibt, wie sie ist","ntf.bp_missing":"Noch nicht installiert: Das geschieht mit dem ersten Alarm.","ntf.bp_install":"{version} installieren","ntf.bp_update":"Auf {version} aktualisieren","ntf.phones":"Senden an","ntf.no_phones":"Noch kein Telefon mit der Home-Assistant-App.","ntf.pick_phone":"Mindestens ein Telefon w\xE4hlen","ntf.create":"Erstellen","ntf.edit":"Bearbeiten","ntf.on":"An","ntf.off":"Aus","rep.hint":"Wie lange jeder Start und Stopp dauerte und wie lange jedes Ger\xE4t zum Ein- und Ausschalten brauchte. Gemessen, w\xE4hrend Easy AV Control schaltet; die letzten 300 L\xE4ufe und 100 Zeiten je Ger\xE4t bleiben erhalten.","rep.refresh":"Aktualisieren","rep.clear":"Leeren","rep.clear_confirm":"Den ganzen Verlauf l\xF6schen? Die typischen Zeiten f\xFCr die Zeitlimits bleiben.","rep.runs":"L\xE4ufe","rep.devices":"Ger\xE4te","rep.devices_hint":'Vom Ein- (oder Aus-)Befehl, bis der Status des Ger\xE4ts auf an (aus) wechselte (die Sekunden, die er halten muss, die Entprellzeit, z\xE4hlen nicht), f\xFCr Ger\xE4te mit Status. Nur, wenn Easy AV Control das Ger\xE4t geschaltet hat. "Bild da" und "Signal erkannt" messen die Pr\xFCfungen einer Aktivit\xE4t (die Bildpr\xFCfung des Ger\xE4ts oder eine eigene Entit\xE4t, etwa die Audio-Stream-Art): vom Einschalten des Ger\xE4ts, bis die Pr\xFCfung besteht.',"rep.no_runs":"Noch keine L\xE4ufe: eine Aktivit\xE4t starten.","rep.no_devices":"Noch keine Ger\xE4tezeiten. Sie werden f\xFCr Ger\xE4te mit Status gemessen, wenn eine Aktivit\xE4t sie schaltet.","rep.show":"Zeigen","rep.mode_all":"Hoch- und Herunterfahren","rep.mode_start":"Hochfahren","rep.mode_stop":"Herunterfahren","rep.export":"Exportieren","rep.export_run":"Diesen Lauf mit seinem Protokoll exportieren","rep.copied":"In die Zwischenablage kopiert","rep.export_hint":"Der Bericht ist eine JSON-Datei: die L\xE4ufe, jeder mit seinem Protokoll (was Easy AV Control tat, jeder Dienstaufruf und jede Zustands\xE4nderung der Entit\xE4ten des Raums), die Ger\xE4tezeiten, die R\xE4ume wie eingerichtet und die Versionen.","rep.from":"von {activity}","rep.typical":"typisch","rep.count":"{n} L\xE4ufe","rep.count_times":"{n} Mal","rep.failed":"{n} fehlgeschlagen","rep.result_ok":"OK","rep.result_warning":"Warnungen","rep.result_error":"Fehlgeschlagen","rep.result_cancelled":"Abgebrochen","rep.phase_switch_off_unused":"Nicht Ben\xF6tigtes ausschalten","rep.phase_outlets_on":"Steckdosen an","rep.phase_outlets_off":"Steckdosen aus","rep.phase_checks":"Pr\xFCfungen","rep.phase_steps":"Aktionen nach dem Start","rep.phase_hooks":"Aktionen bei Start / Stopp","rep.dir_on":"Einschalten","rep.dir_off":"Ausschalten","rep.lane_off":"Aus","rep.lane_standby":"Standby","rep.lane_busy":"Startet / Aufw\xE4rmen / Stoppt","rep.lane_idle":"Leerlauf","rep.lane_on":"An","rep.lane_on_already":"war an","rep.took":"Vom Einschalten, bis der Status \u201Ean\u201C meldete","rep.sent_at":"Eingeschaltet bei {time}","rep.then_hint":"Danach: die Steckdosen, die Pr\xFCfungen und die Aktionen nach dem Start. Sie halten das Einschalten keines Ger\xE4ts auf.","rep.dir_picture":"Bild da","rep.dir_signal":"Signal erkannt","rep.warm":"war schon an: ab Beginn der Pr\xFCfung gez\xE4hlt","rep.dir":"","rep.when":"Wann","rep.time":"Zeit","rep.result":"Ergebnis","rep.for":"Raum \xB7 Aktivit\xE4t","rep.slow":"Langsam",sidebar_chip:"Editor in der Seitenleiste",sidebar_hint:"Easy AV Control in der Seitenleiste von Home Assistant zeigen. Ausgeblendet bleibt es unter /easy-av-control und unter Einstellungen \u2192 Ger\xE4te & Dienste \u2192 Easy AV Control \u2192 Konfigurieren.",no_rooms:"Noch keine R\xE4ume.",room_name:"Name",room_area:"Bereich",room_default_activity:"Standard-Aktivit\xE4t",default_last:"Zuletzt genutzte",gen_unlock:"Zum Bearbeiten entsperren",gen_lock:"Sperren ohne zu speichern",gen_no_area:"Kein Bereich",gen_default:"Standard-Aktivit\xE4t","helper.default_activity":"Was der Ein/Aus-Schalter des Raums und toggle_activity starten, z. B. von einem Wandtaster.",room_id_hint:"ID {id}",delete_room:"Raum l\xF6schen",delete_room_confirm:"Raum \u201E{name}\u201C mit allen Ger\xE4ten und Aktivit\xE4ten l\xF6schen?",tab_devices:"Ger\xE4te",tab_activities:"Aktivit\xE4ten",tab_yaml:"YAML",add_device:"Ger\xE4t hinzuf\xFCgen",add_activity:"Aktivit\xE4t hinzuf\xFCgen",delete:"L\xF6schen",move_up:"Nach oben",move_down:"Nach unten",device_id:"Ger\xE4te-ID",device_in_use:"Ger\xE4t \u201E{id}\u201C wird verwendet von: {where}. Bitte zuerst dort entfernen.",activity_id_hint:"ID {id} \u2013 Teil der Entit\xE4ts-IDs, nicht \xE4nderbar",new_activity:"Neue Aktivit\xE4t",add_device_to_activity:"Ger\xE4t hinzuf\xFCgen \u2026",steps:"Aktionen nach dem Start",section_checks:"Pr\xFCfungen",hint_checks:"Was stimmen muss, bevor die Aktivit\xE4t als laufend gilt, z. B. ein Bild am Lumagen und am Projektor. Sie laufen gleichzeitig, sobald alle Ger\xE4te an sind, und wieder beim Wechsel von einer anderen Aktivit\xE4t.",add_check:"Pr\xFCfung",check_profile:"Bildpr\xFCfung aus seinem Profil",check_entity:"Eine eigene Entit\xE4t",check_what:"Was",check_entity_label:"Entit\xE4t",check_states:"Richtig, wenn sie zeigt",check_states_placeholder:"z. B. on, Active Video",check_timeout:"Zeitlimit",check_failure:"Wenn es nicht stimmt",check_warn:"Warnen und weitermachen",check_stop:"Aktivit\xE4t abbrechen",check_none:"Keine Pr\xFCfungen: die Aktivit\xE4t gilt als laufend, sobald ihre Ger\xE4te an sind.",check_unless_text:"Wartet, bis {entity} nicht mehr {states} zeigt.","flow.steps":"Aktionen nach dem Start","flow.checks":"Pr\xFCfungen, gleichzeitig","flow.edit":"Bearbeiten","flow.options":"Filter f\xFCr Flow-Details","flow.options_hint":"Was als Detail gilt: ausgeblendet, solange Details aus ist, hier und auf der Karte.","flow.details_chip":"Details","flow.detail_entities":"Entit\xE4ts-IDs und Aktionen","flow.detail_waits":"Wartezeiten","flow.detail_notes":"Hinweise","flow.detail_reloads":"Neu laden","flow.detail_outlets":"Steckdosen","flow.detail_hooks":"Aktionen bei Start und Stopp","flow.check":"{device}: warten, bis {entity} {states} zeigt, h\xF6chstens {timeout}","flow.check_unless":"{device}: warten, bis {entity} nicht mehr {states} zeigt, h\xF6chstens {timeout}","flow.check_missing":"{device}: nichts zu pr\xFCfen, sein Profil hat keine Bildpr\xFCfung","flow.check_warn":"\u2013 sonst eine Warnung",add_step:"Schritt hinzuf\xFCgen \u2026",hooks:"Aktionen bei Start und Stopp",remote:"Fernbedienung",quick_select:"Schnellwahl",quick_select_hint:"Tasten, die einen Mediaplayer auf eine Quelle schalten; beim Apple TV sind die Quellen seine Apps.",quick_select_no_player:"F\xFCge dieser Aktivit\xE4t zuerst einen Mediaplayer hinzu.",add_quick_select:"Schnellwahl hinzuf\xFCgen",card_settings:"Einstellungen in der Karte",card_settings_hint:"Quelle, Klangmodus und weitere Einstellungen der Ger\xE4te, in der Karte \xE4nderbar, w\xE4hrend die Aktivit\xE4t l\xE4uft: die an den Ger\xE4ten festgelegten oder eine Auswahl nur f\xFCr diese Aktivit\xE4t. Der Bereich ist zugeklappt, bis man ihn \xF6ffnet; jeder Browser merkt sich das.","setting.entity":"Entit\xE4t des Ger\xE4ts","field.entity":"Entit\xE4t","helper.entity":"Eine Zahl (Schieberegler), Auswahl (Liste) oder ein Schalter (An/Aus-Taste), z. B. der Bass des Receivers.","field.settings_mode":"Anzeigen",settings_auto:"Von den Ger\xE4ten",settings_chosen:"Hier ausgew\xE4hlt, mit Favoriten",settings_auto_shows:"Die Karte zeigt: {list}.",settings_auto_none:"Die Ger\xE4te dieser Aktivit\xE4t bieten noch keine Einstellungen. Lege sie an einem Ger\xE4t fest, oder starte die Aktivit\xE4t einmal, damit die Mediaplayer ihre Listen melden.",device_settings_hint:"Was die Karte von diesem Ger\xE4t anbietet, in jeder Aktivit\xE4t, die es nutzt. Automatisch: Quelle und Klangmodus eines Mediaplayers und die Zahl- und Auswahl-Entit\xE4ten desselben Ger\xE4ts.",device_settings_auto:"Automatisch",device_settings_auto_none:"Noch nichts gefunden: keine Quellen- oder Klangmodus-Liste gemeldet und keine Zahl- oder Auswahl-Entit\xE4ten desselben Ger\xE4ts.",device_settings_none:"Die Karte zeigt keine Einstellungen dieses Ger\xE4ts.",settings_none:"Die Karte zeigt f\xFCr diese Aktivit\xE4t keine Einstellungen.",add_setting:"Einstellung hinzuf\xFCgen","field.setting":"Einstellung","field.options":"Favoriten (optional)","helper.options":"Nur diese in der Karte, in dieser Reihenfolge; leer: die ganze Liste des Ger\xE4ts.",commands:"Eigene Befehle",save:"Speichern",discard:"Verwerfen",saving:"Speichert \u2026",saved:"Gespeichert",unsaved:"Ungespeicherte \xC4nderungen",reload:"Neu laden",reload_confirm:"Ungespeicherte \xC4nderungen verwerfen und die gespeicherte Konfiguration laden?",retry:"Erneut versuchen",save_anyway:"Trotzdem speichern",conflict:"Die Konfiguration wurde anderswo ge\xE4ndert. Bitte neu laden \u2013 deine ungespeicherten \xC4nderungen hier gehen dabei verloren.",invalid:"Nicht gespeichert \u2013 {path}: {message}",missing:"Diese Entit\xE4ten gibt es in Home Assistant nicht:",missing_hint:"Ein Ger\xE4t ohne Strom bleibt normalerweise bekannt \u2013 meist ist es ein Tippfehler oder eine umbenannte Entit\xE4t.",loading:"L\xE4dt \u2026",load_error:"Konfiguration konnte nicht geladen werden: {error}",route_auto:"Automatisch",route_none:"Ausblenden",devices_intro:"Alle Ger\xE4te des Raums, die Easy AV Control schaltet oder steuert: TV, Beamer, Receiver, Player.",devices_empty:"Noch keine Ger\xE4te.",new_device:"Neues Ger\xE4t",no_entity:"Keine Entit\xE4t gew\xE4hlt",entity_missing:"Entit\xE4t in Home Assistant nicht gefunden",used_by:"Verwendet in: {where}",section_device:"Ger\xE4t",hint_device:"Die Home-Assistant-Entit\xE4t des Ger\xE4ts, meist ein Mediaplayer.",section_power:"Steckdose",hint_power:"Die Steckdose, an der das Ger\xE4t h\xE4ngt: vor dem Ger\xE4t ein- und nach ihm ausgeschaltet. Abw\xE4hlen, wenn das Ger\xE4t an keiner schaltbaren Steckdose h\xE4ngt.",power_use:"Steckdose dieses Ger\xE4ts schalten",section_delays:"Wartezeiten",hint_delays:"Wie lange Easy AV Control auf dieses Ger\xE4t wartet.",section_ready:"Verbindung pr\xFCfen",hint_ready:"Wartet, bis das Ger\xE4t in Home Assistant erreichbar ist, vor dem Einschalten und vor Tasten der Fernbedienung. F\xFCr Ger\xE4te, die ohne Strom ihre Verbindung verlieren, etwa ein Apple TV.",ready_preset:"{entity} f\xFCr Verbindungspr\xFCfung und Pfeiltasten nutzen (empfohlen f\xFCr Apple TV)",section_advanced:"Erweitert",hint_device_advanced:"Die Ger\xE4te-ID wird in der YAML-Konfiguration verwendet. Eigene Befehle ordnen einem Tastennamen Home-Assistant-Aktionen zu, z. B. Pfeiltasten f\xFCr einen Receiver.",activities_intro:'Eine Aktivit\xE4t fasst Ger\xE4te f\xFCr eine Nutzung zusammen, z. B. "Apple TV" = TV und Apple TV. Beim Start wird eingeschaltet, was sie braucht, und ausgeschaltet, was nicht.',activities_empty:"Noch keine Aktivit\xE4ten.",no_devices:"Keine Ger\xE4te",needs_devices:"Lege zuerst die Ger\xE4te dieses Raums an.",section_general:"Allgemein",hint_general:"Name und Icon erscheinen in der Card. Die Position bestimmt die Reihenfolge.",section_activity_devices:"Ger\xE4te",hint_activity_devices:"Werden in dieser Reihenfolge eingeschaltet.",hint_steps:"Zus\xE4tzliche Aktionen in dieser Reihenfolge, sobald alle Ger\xE4te an sind und die Pr\xFCfungen bestanden: z. B. den TV auf seinen HDMI-Eingang schalten, Klangmodus oder Lautst\xE4rke setzen, das Licht dimmen.",hint_remote:"Welches Ger\xE4t welche Tasten der Card bekommt. Automatisch passt f\xFCr die meisten Aufbauten.",hint_activity_advanced:"Befehle in YAML sowie Home-Assistant-Aktionen bei Start und Stopp.",card_divider:"Fernbedienungs-Karte",card_extra:"Zus\xE4tzliche Tasten",hint_card_extra:"Tasten \xFCber die \xFCblichen hinaus, als YAML-Liste.",card_shows:"Die Karte zeigt",or:"oder",other_integration:"Sonstige",add_device_short:"Ger\xE4t",nav_flow:"Ablauf \xF6ffnen",step_picture_checks:"Wartet, bis {entity} {states} zeigt.",step_picture_none:"{device} hat keine Bildpr\xFCfung, dieser Schritt wartet also auf nichts.",yaml_intro:"Der ganze Raum als YAML. \xC4nderungen hier und in den Formularen betreffen dieselbe Konfiguration.",add_room_name:"Name des neuen Raums",create:"Hinzuf\xFCgen",cancel:"Abbrechen","helper.power_switch":"Gemeinsame Steckdosen bleiben an, solange ein Ger\xE4t daran gebraucht wird.","helper.delay_after_power":"Wie lange das Ger\xE4t nach dem Einschalten der Steckdose braucht. Nur wenn die Steckdose aus war.","helper.delay_after_on":"Bis das Ger\xE4t Befehle annimmt. Nur wenn es eingeschaltet wurde.","helper.delay_after_off":"Abk\xFChlzeit, bevor das n\xE4chste Ger\xE4t oder die Steckdose ausgeschaltet wird, z. B. 180 s f\xFCr einen Beamer.","helper.ready_entity":"Z. B. die Fernbedienung eines Apple TV, die nur bei bestehender Verbindung an ist.","helper.ready_reload":"\xDCberspringt die Wartezeit einer Integration, die ihre Verbindung erneut versucht.","helper.source":"Die Liste zeigt, was das Ger\xE4t zuletzt gemeldet hat; es muss also einmal an gewesen sein. Ein Name l\xE4sst sich auch eintippen.","field.entity_id":"Entit\xE4t","field.name":"Anzeigename","field.power_switch":"Steckdose","field.remote_entity":"Fernbedienung (optional)","helper.remote_entity":"Pfeiltasten, OK, Zur\xFCck, Home und Men\xFC der Card gehen an diese Fernbedienungs-Entit\xE4t, z. B. die Fernbedienung eines Apple TV.","field.delay_after_power":"Startzeit (s)","field.delay_after_on":"Warten nach Einschalten (s)","field.delay_after_off":"Warten nach Ausschalten (s)","field.ready_enabled":"Vor dem Einschalten auf Verf\xFCgbarkeit warten","field.ready_entity":"Stattdessen diese Entit\xE4t pr\xFCfen (optional)","field.ready_state":"Auf Zustand warten (optional, z. B. on)","field.ready_timeout":"Zeitlimit (s)","field.ready_reload":"Integration neu laden","field.ready_on_timeout":"Bei Zeit\xFCberschreitung","field.commands":"Eigene Befehle (YAML: Name \u2192 Aktionen)","field.icon":"Icon","field.order":"Position","field.on_start":"Beim Start","field.on_stop":"Beim Stopp","field.volume":"Lautst\xE4rke","field.channels":"Sender","field.transport":"Wiedergabe","field.navigation":"Navigation","field.touchpad":"Touchfl\xE4che","helper.touchpad":"Eine Wischfl\xE4che statt der Pfeiltasten in der Karte. Automatisch: wenn die Navigation an eine Remote-Entit\xE4t geht, z. B. ein Apple TV.",touchpad_auto:"Automatisch",touchpad_on:"An",touchpad_off:"Aus (Pfeiltasten)","field.buttons":"Zus\xE4tzliche Buttons (YAML-Liste)","field.label":"Beschriftung (optional, sonst die Quelle)","field.activity_commands":"Befehle dieser Aktivit\xE4t (YAML: Name \u2192 Aktionen)","field.type":"Typ","field.device":"Ger\xE4t","field.source":"Quelle","field.volume_level":"Lautst\xE4rke","field.sound_mode":"Klangmodus","field.brightness_pct":"Helligkeit (%)","field.color_temp_kelvin":"Farbtemperatur (K)","field.transition":"\xDCbergang (s)","field.position":"Position (%)","field.tilt_position":"Neigung (%)","field.action":"Aktion (z. B. script.turn_on)","field.data":"Daten","field.target":"Ziel","field.timeout":"Zeitlimit (s)","field.reload_integration":"Integration neu laden","field.on_timeout":"Bei Zeit\xFCberschreitung","field.delay_after":"Danach warten (s)",on_timeout_abort:"Start abbrechen",on_timeout_continue:"Weitermachen","step.power_on":"Einschalten","step.power_off":"Ausschalten","step.set_source":"Quelle w\xE4hlen","step.set_volume":"Lautst\xE4rke setzen","step.set_sound_mode":"Klangmodus w\xE4hlen","step.set_brightness":"Helligkeit setzen","step.set_color_temp":"Farbtemperatur setzen","step.set_position":"Rollladen-Position setzen","step.set_tilt":"Lamellen-Neigung setzen","step.call_action":"Aktion ausf\xFChren","step.delay":"Warten","step.wait_available":"Auf Verf\xFCgbarkeit warten",section_remote_preview:"Vorschau der Fernbedienung",hint_remote_preview:"So sieht die Karte aus, w\xE4hrend diese Aktivit\xE4t l\xE4uft, mit den Einstellungen oben, auch vor dem Speichern. Tippe eine Taste an, um zu sehen, wohin sie geht; es wird nichts gesendet.","preview.tap":"Tippe eine Taste an, um zu sehen, welches Ger\xE4t sie bekommt und was dort ausgef\xFChrt wird.","preview.this_activity":"diese Aktivit\xE4t","preview.device_commands":"eigener Befehl des Ger\xE4ts: {actions}","preview.activity_commands":"eigener Befehl der Aktivit\xE4t: {actions}","preview.unknown":"tut nichts: kein Ger\xE4t dieser Aktivit\xE4t kennt die Taste","preview.unknown_on_device":"tut nichts: {device} kennt die Taste nicht","preview.ready":"Pr\xFCft vorher die Verbindung und stellt sie bei Bedarf wieder her.","preview.dead":"Diese Tasten werden angezeigt, tun aber nichts:","preview.groups":"Tastengruppen","preview.mode_auto":"automatisch","preview.mode_set":"gew\xE4hlt","preview.hidden":"ausgeblendet","preview.no_device":"kein passendes Ger\xE4t, nicht angezeigt","preview.no_keys":"nicht angezeigt: {device} hat keine dieser Tasten",section_flow:"Ablauf: was wann geschaltet wird",hint_flow:"Berechnet aus den Einstellungen dieser Aktivit\xE4t und ihrer Ger\xE4te, auch vor dem Speichern. Die Zeiten z\xE4hlen nur die eingestellten Wartezeiten; wie lange die Ger\xE4te zum Reagieren brauchen, kommt hinzu.","flow.mode_start":"Hochfahren","flow.mode_stop":"Herunterfahren","flow.from_label":"Ausgangslage","flow.from_idle":"aus dem Leerlauf (alles aus)","flow.from":"Wechsel von {activity}","flow.failed":"Ablauf konnte nicht berechnet werden: {error}","flow.invalid":"Kein Ablauf, solange die Konfiguration einen Fehler hat \u2013 {error}","flow.state_starting":"Raum: startet","flow.state_active":"Raum: aktiv","flow.state_stopping":"Raum: stoppt","flow.state_idle":"Raum: aus","flow.outlets_on":"Steckdosen gleichzeitig einschalten: {outlets}","flow.outlets_off":"Steckdosen ausschalten: {outlets}","flow.outlets_off_later":"Steckdose nach der Abk\xFChlzeit ausschalten: {outlets}","flow.outlet_keep":"{outlet} bleibt an, diese Aktivit\xE4t braucht sie","flow.outlets_already_on":"schon an: {outlets}","flow.unless_rooms":"nicht, solange {rooms} sie nutzt","flow.on_start":"Aktionen beim Start beginnen","flow.on_start_wait":"Warten, bis die Aktionen beim Start fertig sind","flow.on_stop":"Aktionen beim Stopp beginnen","flow.on_stop_wait":"Warten, bis die Aktionen beim Stopp fertig sind","flow.parallel":"l\xE4uft parallel","flow.already_on":"L\xE4uft schon in {activity}: kein Einschalten, keine Wartezeit","flow.boot":"Startzeit: bis {seconds} nach dem Einschalten der Steckdosen","flow.reload":"Integration von {entity} neu laden","flow.ready":"Warten, bis {entity} verf\xFCgbar ist, h\xF6chstens {timeout}","flow.ready_state":"Warten, bis {entity} {states} ist, h\xF6chstens {timeout}","flow.on_timeout_abort":"\u2013 sonst wird der Start abgebrochen","flow.on_timeout_continue":"\u2013 sonst geht es trotzdem weiter","flow.turn_on":"{device} einschalten","flow.turn_off":"{device} ausschalten","flow.turn_off_unused":"{device} ausschalten, diese Aktivit\xE4t braucht es nicht","flow.cannot_switch":"{device} l\xE4sst sich nicht schalten, es wird nichts gesendet","flow.wait_on":"{seconds} warten, bis das Ger\xE4t bereit ist","flow.wait":"{seconds} warten","flow.mode_monitor":"Monitoring","flow.summary_monitor":"Monitoring pr\xFCft das alle paar Sekunden, solange die Aktivit\xE4t aktiv ist; der Watchdog des Raums hat eine eigene Seite. Jedes Problem schaltet seinen Sensor ein (binary_sensor.av_<raum>_\u2026), dem eine Benachrichtigung folgen kann; ihre Tasten sagen Easy AV Control, was zu tun ist.","flow.monitor_lost":"Benachrichtigen, wenn ein Ger\xE4t dieser Aktivit\xE4t {seconds} lang aus oder nicht erreichbar ist","flow.monitor_picture":"Pr\xFCfungen laufen weiter: benachrichtigen, wenn eine {seconds} lang fehlschl\xE4gt","flow.monitor_idle":"Auto-Aus: wenn {idle} lang nichts l\xE4uft, benachrichtigen, dann {warning} sp\xE4ter herunterfahren","flow.monitor_error":"Benachrichtigen, wenn ein Ger\xE4t einen Fehler meldet, jederzeit","flow.monitor_watch":"{device}: benachrichtigen, wenn es an ist und nichts es nutzt, nach {grace}","flow.monitor_watch_off":"{device}: benachrichtigen, wenn es an ist und nichts es nutzt, nach {grace}; {after} sp\xE4ter ausschalten","flow.add_monitor_hint":"Zum Monitor hinzuf\xFCgen:","flow.add_monitor_lost":"Ger\xE4t verloren","flow.add_monitor_picture":"Weiter pr\xFCfen","flow.add_monitor_idle":"Auto-Aus",section_monitor:"Watchdog",hint_monitor:"Wenn dieses Ger\xE4t an ist, w\xE4hrend der Raum ruht oder die laufende Aktivit\xE4t es nicht nutzt: benachrichtigen (der Sensor \u201EGer\xE4t unerwartet an\u201C des Raums geht an) und optional ausschalten.",monitor_hint:"W\xE4hrend diese Aktivit\xE4t aktiv ist. 0 schaltet eine Pr\xFCfung ab.","field.watch_mode":"Wenn es unerwartet an ist","watch.off":"Nicht \xFCberwachen","watch.notify":"Benachrichtigen","watch.turn_off":"Benachrichtigen, dann ausschalten","field.watch_grace":"Nach","field.watch_turn_off_after":"Ausschalten nach","field.lost_after":"Ger\xE4t verloren nach","field.picture_lost_after":"Bild verloren nach","field.idle_after_min":"Auto-Aus, wenn nichts l\xE4uft seit (min)","field.idle_warning_min":"Herunterfahren nach der Benachrichtigung (min)","flow.started_by":"Startet auch, wenn {entity} zu {states} wechselt","flow.stopped_by":"F\xE4hrt auch herunter, wenn {entity} zu {states} wechselt","flow.add_started_by":"Gestartet durch",started_by:"Gestartet durch",started_by_hint:"Diese Aktivit\xE4t starten, wenn eine Entit\xE4t in einen Zustand wechselt, z. B. die Aktivit\xE4tstaste der Harmony-Fernbedienung oder ein Wandschalter, und optional bei einem anderen Zustand herunterfahren. \xC4nderungen durch das eigene Hoch- oder Herunterfahren werden ignoriert, Neuverbindungen auch.","field.started_by_entity":"Entit\xE4t","field.started_by_state":"Startet bei","field.started_by_stop":"F\xE4hrt herunter bei (optional)","flow.delay":"{seconds} warten, bevor es eingeschaltet wird","flow.wait_for":"Warten, bis {what}, h\xF6chstens {timeout}","flow.wait_for_on":"{device} an ist","flow.wait_for_picture":"{device} ein Bild zeigt","flow.and":" und ","flow.turn_off_later":"{device} {seconds} nach dem Herunterfahren ausschalten","flow.option":"w\xE4hlt {option}","flow.delete":"Entfernen","flow.group.on":"an","flow.group.off":"aus","flow.group.starting":"startet","flow.group.stopping":"f\xE4hrt herunter","flow.group.error":"Fehler","flow.add_device":"Ger\xE4t","flow.device_actions":"Was mit {device} in dieser Aktivit\xE4t geschieht","flow.device_identity":"Was das Ger\xE4t ist (Entit\xE4t, Fernbedienung, Steckdose, Status), steht auf seiner eigenen Seite, f\xFCr jede Aktivit\xE4t.",duplicate:"Duplizieren",act_export:"Exportieren",act_enabled:"Aktiviert",act_disabled:"Deaktiviert",act_enabled_hint:"Eine deaktivierte Aktivit\xE4t kann nicht gestartet werden: Karte, ihre Szene und Auswahl, Gestartet durch und die Standardaktivit\xE4t lassen sie aus. Gespeichert mit Speichern.",act_export_all:"Alle exportieren",act_import:"Importieren",act_download:"Herunterladen",act_export_hint:"Die Aktivit\xE4t mit jedem Ger\xE4t, das sie nutzt. In einem anderen Raum oder einem anderen Home Assistant importieren; Ger\xE4te mit derselben Entit\xE4t dort werden genutzt, die anderen hinzugef\xFCgt.",act_import_hint:"Einen Export einf\xFCgen oder seine Datei w\xE4hlen. Importieren ersetzt eine Aktivit\xE4t gleichen Namens und jedes Ger\xE4t mit derselben Entit\xE4t vollst\xE4ndig durch die aus der Datei; der Rest kommt hinzu. Als Kopie importieren f\xFCgt die Aktivit\xE4t neben der alten als \u201EName 2\u201C hinzu. Gespeichert wird erst mit Speichern.",act_import_copy:"Als Kopie importieren",act_import_replaced:"Ersetzt: {names}",act_import_devices_replaced:"Ger\xE4te ersetzt: {devices}",act_import_confirm:"Die Datei ersetzt {devices}. Diese Aktivit\xE4ten nutzen sie auch und bekommen ihre neuen Einstellungen: {activities}. Importieren?",act_import_done:"Hinzugef\xFCgt: {added}",act_import_devices:"Ger\xE4te hinzugef\xFCgt: {devices}",act_import_started_by:"Gestartet durch weggelassen bei {names}: eine andere Aktivit\xE4t startet auf derselben Entit\xE4t",copy_suffix:"(Kopie)",move_earlier:"Fr\xFCher",move_later:"Sp\xE4ter","flow.add_check":"Pr\xFCfung","flow.add_step":"Aktion nach dem Start","flow.add_on_start":"Aktionen beim Start","flow.add_on_stop":"Aktionen beim Stopp","flow.add_hint":"Zum Hochfahren hinzuf\xFCgen:","flow.add_stop_hint":"Zum Herunterfahren hinzuf\xFCgen:","flow.edit_hint":"Mit \u270E an einer Zeile wird sie hier ge\xE4ndert, der Papierkorb entfernt sie.","flow.close_edit":"Fertig","flow.device_shared":"Diese Einstellungen geh\xF6ren zum Ger\xE4t: Sie gelten f\xFCr jede Aktivit\xE4t, die es nutzt.","flow.open_device":"Ger\xE4teseite \xF6ffnen","flow.remove_device":"Aus dieser Aktivit\xE4t entfernen","flow.before":"Vor dem Einschalten","flow.before_hint":"Eine feste Zeit warten und/oder, bis andere Ger\xE4te dieser Aktivit\xE4t an sind oder ein Bild zeigen.","flow.add_wait_for":"+ Auf ein Ger\xE4t warten","flow.pick_device":"Ger\xE4t hinzuf\xFCgen\u2026","flow.no_more_devices":"Alle Ger\xE4te des Raums sind in dieser Aktivit\xE4t. Neue Ger\xE4te kommen auf der Ger\xE4teseite dazu.","field.before_delay":"Zuerst warten","field.before_timeout":"H\xF6chstens","field.before_on_timeout":"Wenn nicht rechtzeitig","wait_for.on":"ist an","wait_for.picture":"zeigt ein Bild","field.turn_off_after":"Beim Herunterfahren ausschalten nach","helper.turn_off_after":"0: mit den anderen Ger\xE4ten. F\xFCr Sitze oder Licht, die eine Weile an bleiben; ein neues Hochfahren l\xE4sst es an.","field.option":"Zu w\xE4hlende Aktivit\xE4t","helper.option":"Hochfahren w\xE4hlt sie; ohne: die erste, die nicht die Aus-Option ist.","field.off_option":"Herunterfahren w\xE4hlt","wait.none":"Nichts, sofort weiter","flow.background":"Im Hintergrund, wenn der Raum schon fertig ist","flow.if.outlet_was_off":"nur, wenn die Steckdose aus war","flow.if.if_off":"nur, wenn das Ger\xE4t aus ist","flow.if.if_on":"nur, wenn das Ger\xE4t an ist","flow.reload_if_needed":"l\xE4dt die Integration neu, falls nicht bereit","flow.cooldown":"danach {seconds} Abk\xFChlzeit","flow.summary_start":"Aktiv fr\xFChestens nach {min}, sp\xE4testens nach {max}, wenn jede Bereitschaftspr\xFCfung ihr ganzes Zeitlimit braucht.","flow.summary_start_fixed":"Aktiv nach {min}.","flow.summary_stop":"Aus, sobald die Ger\xE4te ausgeschaltet und die Aktionen beim Stopp fertig sind.","flow.summary_stop_cut":"Aus, sobald die Ger\xE4te ausgeschaltet und die Aktionen beim Stopp fertig sind; die letzte Steckdose geht nach {seconds} aus."}};function T(l,n,e={}){let t=(l??"en").split("-")[0],i=si[t]?.[n]??si.en[n];if(i===void 0)return Q(l,n,e);for(let[s,o]of Object.entries(e))i=i.replace(`{${s}}`,o);return i}var Xi="__none",X=l=>l.area_id??Xi,ce=class extends b{constructor(){super();this._asked=!1;this._areas=new Map,this._ticked=new Set,this._starter=!1}_t(e,t){return T(this.hass?.language,e,t)}updated(){this.hass&&this.rooms&&!this._asked&&(this._asked=!0,this._run())}async _run(){this._result=void 0,this._error=void 0;try{let e=await this.hass.callWS({type:"easy_av_control/config/detect_all",rooms:this.rooms}),t=new Map;for(let s of e.new)t.has(X(s))||t.set(X(s),{target:s.room??`new:${s.new_room}`,activities:new Set(s.activities),devices:new Set});let i=new Set;e.renamed.forEach((s,o)=>i.add(`renamed:${o}`)),this._areas=t,this._ticked=i,this._result=e}catch(e){this._error=e.message??String(e)}}_toggle(e){let t=new Set(this._ticked);t.has(e)?t.delete(e):t.add(e),this._ticked=t}_setArea(e,t){let i=new Map(this._areas);i.set(e,{...i.get(e),...t}),this._areas=i}_toggleDevice(e,t){let i=new Set(this._areas.get(e).devices);i.has(t)?i.delete(t):i.add(t),this._setArea(e,{devices:i})}get _anyTicked(){return this._ticked.size>0||[...this._areas.values()].some(e=>e.devices.size>0)}_name(e){return e?this.hass.states[e]?.attributes.friendly_name??e:"\u2013"}async _apply(){let e=this._result,t={new:e.new.filter(s=>this._areas.get(X(s))?.devices.has(s.key)).map(s=>{let o=this._areas.get(X(s)),a=o.target.startsWith("new:"),c=e.new.find(h=>`new:${h.new_room}`===o.target);return{...s,room:a?null:o.target,new_room:a?o.target.slice(4):null,new_room_name:a?c?.new_room_name??s.new_room_name:null,area_id:a?c?.area_id??s.area_id:s.area_id,activities:a?[]:[...o.activities]}}),starter:this._starter,better:e.better.filter((s,o)=>this._ticked.has(`better:${o}`)),gone:e.gone.filter((s,o)=>this._ticked.has(`gone:${o}`)),renamed:e.renamed.filter((s,o)=>this._ticked.has(`renamed:${o}`))},i=await this.hass.callWS({type:"easy_av_control/config/detect_apply",rooms:this.rooms,choices:t});this.dispatchEvent(new CustomEvent("rooms-changed",{detail:{rooms:i.rooms}}))}render(){if(this._error)return r`<p class="ltek-error">${this._error}</p>
        <button class="ltek-btn" @click=${this._run}>${this._t("detect_again")}</button>`;let e=this._result;if(!e)return r`<p class="ltek-hint">${this._t("detect_running")}</p>`;let t=!e.new.length&&!e.better.length&&!e.gone.length&&!e.renamed.length,i=[...new Set(e.new.map(X))];return r`
      <p class="ltek-hint">${this._t("detect_intro")}</p>
      ${t?r`<p class="ltek-hint ok">${this._t("detect_nothing")}</p>`:p}
      <div class="ltek-buttons bar">
        <button class="ltek-btn primary" ?disabled=${!this._anyTicked} @click=${this._apply}>${this._t("detect_apply")}</button>
        <button class="ltek-btn" @click=${this._run}><ha-icon icon="mdi:refresh"></ha-icon> ${this._t("detect_again")}</button>
        ${e.new.length?r`<label class="check">
              <input type="checkbox" .checked=${this._starter} @change=${s=>this._starter=s.target.checked} />
              ${this._t("detect_starter")}
            </label>`:p}
      </div>
      ${e.new.length?this._section("new","mdi:plus-circle-outline",this._t("detect_new"),this._t("detect_new_hint"),r`${i.map(s=>this._renderArea(s,e.new.filter(o=>X(o)===s)))}`):p}
      ${e.better.length?this._section("better","mdi:arrow-up-bold-circle-outline",this._t("detect_better"),this._t("detect_better_hint"),r`${e.better.map((s,o)=>this._row(`better:${o}`,"mdi:swap-horizontal",this._t("detect_better_row",{from:this._name(s.entity_id),to:this._name(s.replacement)}),`${this.rooms[s.room]?.name??s.room} \xB7 ${s.integration} \u2192 ${s.replacement_integration}`))}`):p}
      ${e.gone.length?this._section("gone","mdi:link-variant-off",this._t("detect_gone"),this._t("detect_gone_hint"),r`${e.gone.map((s,o)=>this._row(`gone:${o}`,"mdi:help-circle-outline",s.entity_id,`${this.rooms[s.room]?.name??s.room}: ${s.path} \xB7 ${s.replacement?this._t("detect_replace_with",{entity:this._name(s.replacement),integration:s.replacement_integration??""}):this._t("detect_no_replacement")}`,!s.replacement))}`):p}
      ${e.renamed.length?this._section("renamed","mdi:rename-outline",this._t("detect_renamed"),this._t("detect_renamed_hint"),r`${e.renamed.map((s,o)=>this._row(`renamed:${o}`,"mdi:rename-outline",`${s.old} \u2192 ${s.new}`,s.uses.map(a=>`${this.rooms[a.room]?.name??a.room}: ${a.path}`).join(", ")))}`):p}
      ${e.unmatched.length?this._section("unmatched","mdi:package-variant",this._t("detect_unmatched"),this._t("detect_unmatched_hint"),r`<div class="ltek-list">${e.unmatched.map(s=>r`<div class="ltek-item">
              <ha-icon class="lead" icon="mdi:puzzle-outline"></ha-icon>
              <span class="ltek-item-text"><span class="ltek-name">${s}</span></span>
              <button class="ltek-add" @click=${()=>this.dispatchEvent(new CustomEvent("create-profile",{detail:{integration:s}}))}>${this._t("detect_create_profile")}</button>
            </div>`)}</div>`):p}

    `}_section(e,t,i,s,o){return r`<details class="ltek-sec" open data-section=${e}>
      <summary><ha-icon icon=${t}></ha-icon>${i}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="ltek-body"><p class="ltek-hint">${s}</p><div class="ltek-list">${o}</div></div>
    </details>`}_row(e,t,i,s,o=!1){return r`<label class="ltek-item ${this._ticked.has(e)?"open":""}">
      <input type="checkbox" ?disabled=${o} .checked=${this._ticked.has(e)} @change=${()=>this._toggle(e)} />
      <ha-icon class="lead" icon=${t}></ha-icon>
      <span class="ltek-item-text"><span class="ltek-name">${i}</span><span class="ltek-subline">${s}</span></span>
    </label>`}_renderArea(e,t){let i=this._areas.get(e),s=this._result,o=t[0],a=[...new Map(s.new.filter(m=>m.new_room).map(m=>[m.new_room,m.new_room_name??m.new_room])).entries()],c=[...Object.entries(this.rooms).map(([m,f])=>({value:m,label:f.name??m})),...a.map(([m,f])=>({value:`new:${m}`,label:this._t("detect_new_room",{name:f})}))],h=i.target.startsWith("new:")?void 0:this.rooms[i.target],d=Object.entries(h?.activities??{}),u=t.every(m=>i.devices.has(m.key));return r`<details class="ltek-sub area" open>
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
            <input type="checkbox" .checked=${u} @change=${()=>this._setArea(e,{devices:u?new Set:new Set(t.map(m=>m.key))})} />
            ${this._t("detect_select_all")}
          </label>
        </div>
        ${h?r`<div class="ltek-row">
              <label class="lbl">${this._t("detect_activities")}</label>
              ${d.length?d.map(([m,f])=>r`<label class="check">
                    <input type="checkbox" .checked=${i.activities.has(m)} @change=${()=>{let _=new Set(i.activities);_.has(m)?_.delete(m):_.add(m),this._setArea(e,{activities:_})}} />${f.name??m}</label>`):r`<span class="ltek-hint">${this._t("detect_no_activities")}</span>`}
            </div>`:p}
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
          ${t.picture?r`<span class="chip picture">${this._t("detect_picture")}</span>`:p}
        </span>
      </span>
      <span class="chip order ${t.order}">${this._t(`order.${t.order}`)}</span>
    </label>`}};ce.properties={hass:{attribute:!1},rooms:{attribute:!1},_result:{state:!0},_areas:{state:!0},_ticked:{state:!0},_starter:{state:!0},_error:{state:!0}},ce.styles=[$,A,x,w`
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
    `];customElements.get("easy-av-control-detect")||customElements.define("easy-av-control-detect",ce);var oi="https://github.com/Ltek/easy-av-control#readme",ri={en:{title:"Guide",close:"Close",steps_title:"How it works",steps:[r`<b>Add the devices</b> of the room under <i>Devices</i>: pick each device's entity. If it hangs on a
        switchable outlet, enter it under <i>Power Outlet</i>. If it loses its connection without power (Apple TV), use
        the recommended button under <i>Connection check</i>.`,r`<b>Put together activities</b> under <i>Activities</i>: choose the devices in the order they are
        switched on, and under <i>Actions after start</i> for example the TV's input. Quick-select buttons start apps.`,r`<b>Save and add the card:</b> save at the top right. On a dashboard, add a card, search for
        <i>Easy AV Control Remote</i> and choose the room.`],terms_title:"Terms",terms:[["Outlet","Switch that powers the device. Switched on first and off last; outlets shared by several devices stay on while one of them is needed."],["Boot time","Wait after the outlet came on, before the device is switched on. Only when the outlet was off."],["Waiting times","After switching on: until the device accepts commands. After switching off: cool-down, e.g. for a projector lamp."],["Connection check","Waits until the device is reachable in Home Assistant, at the start and before remote buttons; can reload its integration until it connects."],["Checks","What must be right before the activity counts as running, e.g. a picture on the Lumagen and the projector."],["Actions after start","Run once all devices are on and the checks passed: input, volume, sound mode, any action."],["Remote control","Which device gets volume, channels, playback and arrow keys. Automatic: volume to the first media player, the rest to the last."],["Quick select","Buttons that switch a media player to a source, on an Apple TV to an app."],["Settings in the card","On a device: source, sound mode and entities such as tone controls, changeable in the card in every activity that uses it; automatic or chosen with favourites. An activity can choose its own."]],example_title:"Example: TV and Apple TV",example:[r`Device <i>TV</i>: entity <code>media_player.tv</code>, outlet <code>switch.tv_outlet</code>, boot time
        15 s, wait after switching on 10 s.`,r`Device <i>Apple TV</i>: entity <code>media_player.apple_tv</code>, under <i>Connection check</i> the
        button <i>Use remote.apple_tv for the connection check and the arrow keys</i>.`,r`Activity <i>Apple TV</i>: devices TV, then Apple TV; action after start <i>Set source</i> on the TV to its
        HDMI input; quick select Apple TV with Netflix.`,r`Save, add the card, start the activity.`],docs:r`All options and the YAML reference: <a href=${oi} target="_blank" rel="noreferrer">documentation on GitHub</a>.`},de:{title:"Anleitung",close:"Schlie\xDFen",steps_title:"So geht's",steps:[r`<b>Geräte anlegen</b> unter <i>Geräte</i>: Für jedes Gerät die Entität wählen. Hängt es an einer
        schaltbaren Steckdose, diese unter <i>Steckdose</i> eintragen. Verliert es ohne Strom die Verbindung (Apple
        TV), unter <i>Verbindung prüfen</i> den empfohlenen Knopf nutzen.`,r`<b>Aktivitäten zusammenstellen</b> unter <i>Aktivitäten</i>: die Geräte in Einschaltreihenfolge wählen,
        unter <i>Aktionen nach dem Start</i> zum Beispiel den Eingang des TV. Schnellwahl-Tasten starten Apps.`,r`<b>Speichern und Card einfügen:</b> oben rechts speichern. Im Dashboard eine Karte hinzufügen,
        <i>Easy AV Control Remote</i> suchen und den Raum wählen.`],terms_title:"Begriffe",terms:[["Steckdose","Schalter, an dem das Ger\xE4t h\xE4ngt. Wird zuerst ein- und zuletzt ausgeschaltet; gemeinsame Steckdosen mehrerer Ger\xE4te bleiben an, solange eines davon gebraucht wird."],["Startzeit","Wartezeit nach dem Einschalten der Steckdose, bevor das Ger\xE4t eingeschaltet wird. Nur wenn die Steckdose aus war."],["Wartezeiten","Nach dem Einschalten: bis das Ger\xE4t Befehle annimmt. Nach dem Ausschalten: Abk\xFChlzeit, z. B. f\xFCr eine Beamer-Lampe."],["Verbindung pr\xFCfen","Wartet, bis das Ger\xE4t in Home Assistant erreichbar ist, beim Start und vor Tasten der Fernbedienung; kann seine Integration neu laden, bis sie verbunden ist."],["Pr\xFCfungen","Was stimmen muss, bevor die Aktivit\xE4t als laufend gilt, z. B. ein Bild am Lumagen und am Projektor."],["Aktionen nach dem Start","Laufen, sobald alle Ger\xE4te an sind und die Pr\xFCfungen bestanden: Eingang, Lautst\xE4rke, Klangmodus, beliebige Aktion."],["Fernbedienung","Welches Ger\xE4t Lautst\xE4rke, Sender, Wiedergabe und Pfeiltasten bekommt. Automatisch: Lautst\xE4rke an den ersten Mediaplayer, der Rest an den letzten."],["Schnellwahl","Tasten, die einen Mediaplayer auf eine Quelle schalten, beim Apple TV auf eine App."],["Einstellungen in der Karte","Am Ger\xE4t: Quelle, Klangmodus und Entit\xE4ten wie Klangregler, in der Karte \xE4nderbar in jeder Aktivit\xE4t, die es nutzt; automatisch oder ausgew\xE4hlt mit Favoriten. Eine Aktivit\xE4t kann eigene w\xE4hlen."]],example_title:"Beispiel: TV und Apple TV",example:[r`Gerät <i>TV</i>: Entität <code>media_player.tv</code>, Steckdose <code>switch.steckdose_tv</code>,
        Startzeit 15 s, Warten nach Einschalten 10 s.`,r`Gerät <i>Apple TV</i>: Entität <code>media_player.apple_tv</code>, unter <i>Verbindung prüfen</i> der
        Knopf <i>remote.apple_tv für Verbindungsprüfung und Pfeiltasten nutzen</i>.`,r`Aktivität <i>Apple TV</i>: Geräte TV, dann Apple TV; Aktion nach dem Start <i>Quelle wählen</i> am TV auf
        den HDMI-Eingang; Schnellwahl Apple TV mit Netflix.`,r`Speichern, Card einfügen, Aktivität starten.`],docs:r`Alle Optionen und die YAML-Referenz: <a href=${oi} target="_blank" rel="noreferrer">Dokumentation auf GitHub</a>.`}},de=class extends b{render(){let n=(this.language??"en").split("-")[0],e=ri[n]??ri.en;return r`<div class="page">
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
    </div>`}};de.properties={language:{}},de.styles=[$,A,x,w`
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
  `];customElements.get("easy-av-control-guide")||customElements.define("easy-av-control-guide",de);var ct=["status","time","both","none"],dt=["warn","stop","retry"],He=["profile","state_source","wait_on","wait_off","timeout_on","timeout_off","debounce","on_failure"];function ai(l){let n=l?.profile?.data??{};return{timeout_on:n.timeouts?.on??120,timeout_off:n.timeouts?.off??300,debounce:n.debounce??2}}function lt(l,n){let e=l.on_failure;return e&&typeof e=="object"?e[n]??"warn":e??"warn"}function ht(l,n){let e=ai(n),t=l.state_source;return{profile:l.profile??"__auto",state_source:t==="none"?"none":t&&typeof t=="object"?"custom":"auto",wait_on:l.wait_on??"status",wait_off:l.wait_off??"status",timeout_on:l.timeout_on??e.timeout_on,timeout_off:l.timeout_off??e.timeout_off,debounce:l.debounce??e.debounce,on_failure_on:lt(l,"turn_on"),on_failure_off:lt(l,"turn_off"),on_failure_picture:lt(l,"picture")}}function pt(l,n,e){let t=ai(e),i={...l};for(let c of He)delete i[c];n.profile&&n.profile!=="__auto"&&(i.profile=n.profile),n.state_source==="none"?i.state_source="none":n.state_source==="custom"&&(i.state_source=l.state_source??{}),n.wait_on&&n.wait_on!=="status"&&(i.wait_on=n.wait_on),n.wait_off&&n.wait_off!=="status"&&(i.wait_off=n.wait_off),n.timeout_on!==void 0&&Number(n.timeout_on)!==t.timeout_on&&(i.timeout_on=Number(n.timeout_on)),n.timeout_off!==void 0&&Number(n.timeout_off)!==t.timeout_off&&(i.timeout_off=Number(n.timeout_off)),n.debounce!==void 0&&Number(n.debounce)!==t.debounce&&(i.debounce=Number(n.debounce));let s=n.on_failure_on||"warn",o=n.on_failure_off||"warn",a=n.on_failure_picture||"warn";return s===o&&o===a?s!=="warn"&&(i.on_failure=s):i.on_failure={...s!=="warn"?{turn_on:s}:{},...o!=="warn"?{turn_off:o}:{},...a!=="warn"?{picture:a}:{}},i}function li(l,n){let e=n?.found;if(!e)return{};let t={};return e.remote_entity&&l.remote_entity!==e.remote_entity&&(t.remote_entity=e.remote_entity),e.power_switch&&!l.power_switch&&(t.power_switch=e.power_switch),t}function Ne(l){if(!l||typeof l!="object")return"";let n=l;return[n.domain,n.translation_key??n.unique_id_suffix??n.device_class].filter(Boolean).join(" \xB7 ")}function ci(l,n){let e=l.data,t=[],i=e.indicator;if(i){let o=i.entity?Ne(i.entity):n("sum_indicator_device"),a=i.attribute?`${o} (${i.attribute})`:o;t.push(n("sum_indicator",{what:i.available_is_on?n("sum_indicator_available",{what:a}):a}));let c=["starting","on","stopping","off","error"].filter(h=>Array.isArray(i[h])&&i[h].length).map(h=>`${h}: ${i[h].join(" / ")}`);c.length&&t.push(n("sum_states",{groups:c.join(" \xB7 ")}))}e.remote&&t.push(`${n("sum_remote")}: ${Ne(e.remote)}`),e.power_switch&&t.push(`${n("sum_outlet")}: ${Ne(e.power_switch)}`),Array.isArray(e.settings)&&e.settings.length&&t.push(`${n("sum_settings")}: ${e.settings.map(Ne).join(", ")}`),e.picture&&t.push(`${n("sum_picture")}: ${e.picture.ok.join(" / ")}`),e.order&&t.push(n("sum_order",{order:n(`order.${e.order}`)}));let s=Object.entries(e.roles??{}).sort(([,o],[,a])=>o-a).map(([o])=>n(`role.${o}`));return s.length&&t.push(n("sum_roles",{roles:s.join(", ")})),t}var en=new Set(["unavailable","unknown",""]);function di(l,n){let e={},t=(s,o)=>{o===void 0||en.has(o)||(e[s]??=[]).includes(o)||e[s].push(o)},i={};l.length&&(l.length>1&&t("off",l[0]),l.slice(1,-1).forEach(s=>t("starting",s)),t("on",l[l.length-1]),l[0]==="unavailable"&&(i.available_is_on=!0)),n.length&&(n.length>1&&t("on",n[0]),n.slice(1,-1).forEach(s=>t("stopping",s)),t("off",n[n.length-1]),n[n.length-1]==="unavailable"&&(i.available_is_on=!0));for(let s of["starting","stopping"])e[s]=(e[s]??[]).filter(o=>!e.on?.includes(o)&&!e.off?.includes(o)),e[s].length||delete e[s];return{...i,...e}}function ut(l){let n=Math.round(l);return n>=60?`${Math.floor(n/60)}:${String(n%60).padStart(2,"0")}`:`${n} s`}function mt(l,n){let e=n?.timings;if(!e||!n?.state)return{};let t={},i={on:n.state.timeout_on,off:n.state.timeout_off};for(let s of["on","off"]){let o=e[s]?.suggested;o&&o!==i[s]&&(t[s==="on"?"timeout_on":"timeout_off"]=o)}return t}var K={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},hi=l=>(...n)=>({_$litDirective$:l,values:n}),Be=class{constructor(n){}get _$AU(){return this._$AM._$AU}_$AT(n,e,t){this._$Ct=n,this._$AM=e,this._$Ci=t}_$AS(n,e){return this.update(n,e)}update(n,e){return this.render(...e)}};var{I:cs}=ii;var pi=l=>l.strings===void 0;var tn={},ui=(l,n=tn)=>l._$AH=n;var D=hi(class extends Be{constructor(l){if(super(l),l.type!==K.PROPERTY&&l.type!==K.ATTRIBUTE&&l.type!==K.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!pi(l))throw Error("`live` bindings can only contain a single expression")}render(l){return l}update(l,[n]){if(n===z||n===p)return n;let e=l.element,t=l.name;if(l.type===K.PROPERTY){if(n===e[t])return z}else if(l.type===K.BOOLEAN_ATTRIBUTE){if(!!n===e.hasAttribute(t))return z}else if(l.type===K.ATTRIBUTE&&e.getAttribute(t)===n+"")return z;return ui(l),n}});var he=class extends b{constructor(){super();this._typing=new Map;this.data={},this.schema=[],this.disabled=!1}_set(e,t){let i={...this.data??{}};t===void 0||t===""?delete i[e]:i[e]=t,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:i}}))}render(){return r`${(this.schema??[]).map(e=>this._field(e))}`}_field(e){let t=this.computeLabel?.(e)??e.name,i=this.computeHelper?.(e),[s,o]=Object.entries(e.selector??{})[0]??["text",{}],a=o??{},c=this.data?.[e.name],h=i?r`<div class="ltek-hint help">${i}</div>`:p;if(s==="boolean")return r`<label class="check">
          <input
            type="checkbox"
            .checked=${D(!!c)}
            ?disabled=${this.disabled}
            @change=${u=>this._set(e.name,u.target.checked)}
          />
          ${t}
        </label>
        ${h}`;if(s==="text")return r`<div class="ltek-row">
          <label class="lbl">${t}</label>
          <input
            type="text"
            .value=${D(this._typing.get(e.name)??(c==null?"":String(c)))}
            ?disabled=${this.disabled}
            @input=${u=>this._typing.set(e.name,u.target.value)}
            @change=${u=>{this._typing.delete(e.name),this._set(e.name,u.target.value)}}
          />
        </div>
        ${h}`;if(s==="number"){let u=a.unit_of_measurement??"",m=_=>{this._typing.delete(e.name);let g=_.target.value;this._set(e.name,g===""?void 0:Number(g))},f=c==null?"":String(c);return a.mode==="slider"?r`<div class="ltek-row slider">
            <label class="lbl">${t}</label>
            <input
              type="range"
              min=${String(a.min??0)}
              max=${String(a.max??100)}
              step=${String(a.step??1)}
              .value=${D(f||String(a.min??0))}
              ?disabled=${this.disabled}
              @input=${m}
            />
            <span class="readout">${f===""?"\u2013":f}${u?r`<span class="unit">${u}</span>`:p}</span>
          </div>
          ${h}`:r`<div class="ltek-row">
          <label class="lbl">${t}</label>
          <input
            class="num"
            type="number"
            min=${String(a.min??"")}
            max=${String(a.max??"")}
            step=${String(a.step??1)}
            .value=${D(this._typing.get(e.name)??f)}
            ?disabled=${this.disabled}
            @input=${_=>this._typing.set(e.name,_.target.value)}
            @change=${m}
          />
          ${u?r`<span class="unit">${u}</span>`:p}
        </div>
        ${h}`}if(s==="select"&&!a.multiple&&!a.custom_value){let u=(a.options??[]).map(f=>typeof f=="string"?{value:f,label:f}:f),m=c==null?"":String(c);return r`<div class="ltek-row">
          <label class="lbl">${t}</label>
          <select
            .value=${D(m)}
            ?disabled=${this.disabled}
            @change=${f=>this._set(e.name,f.target.value||void 0)}
          >
            ${e.required&&m?p:r`<option value="" ?selected=${!m}>–</option>`}
            ${u.map(f=>r`<option value=${f.value} ?selected=${f.value===m}>${f.label}</option>`)}
            ${m&&!u.some(f=>f.value===m)?r`<option value=${m} selected>${m}</option>`:p}
          </select>
        </div>
        ${h}`}return r`<div class="ltek-row ${s==="object"||s==="action"||s==="target"?"stack":"picker"}">
        <label class="lbl">${t}</label>
        <ha-selector
          .hass=${this.hass}
          .selector=${e.selector}
          .value=${c}
          .required=${!!e.required}
          .disabled=${this.disabled}
          @value-changed=${u=>{u.stopPropagation(),this._set(e.name,u.detail.value)}}
        ></ha-selector>
      </div>
      ${h}`}};he.properties={hass:{attribute:!1},data:{attribute:!1},schema:{attribute:!1},computeLabel:{attribute:!1},computeHelper:{attribute:!1},disabled:{type:Boolean}},he.styles=[$,A,x,w`
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
    `];customElements.get("ltek-form")||customElements.define("ltek-form",he);var mi=["starting","on","stopping","off","error"],nn=["power","navigation","now_playing","turn_off"],sn=["early","middle","late"];function ft(l){let n={domain:l.domain};return l.translation_key?n.translation_key=l.translation_key:l.unique_id_suffix?n.unique_id_suffix=l.unique_id_suffix:l.device_class&&(n.device_class=l.device_class),n}function U(l,n){if(n)return l.filter(e=>e.domain===n.domain).filter(e=>!n.translation_key||e.translation_key===n.translation_key).filter(e=>!n.unique_id_suffix||(e.unique_id_suffix??"").endsWith(n.unique_id_suffix)).filter(e=>!n.device_class||e.device_class===n.device_class).sort((e,t)=>e.entity_id.localeCompare(t.entity_id))[0]}function on(l,n,e){let t=new Set(mi.filter(i=>i!==e).flatMap(i=>n[i]??[]));return l.filter(i=>!t.has(i))}function fi(l,n,e){let t={...l},[i,...s]=n;if(s.length){let a=fi(l[i]??{},s,e);return Object.keys(a).length?t[i]=a:delete t[i],t}return e===void 0||e===""||Array.isArray(e)&&!e.length||typeof e=="object"&&e!==null&&!Array.isArray(e)&&!Object.keys(e).length?delete t[i]:t[i]=e,t}var pe=class extends b{constructor(){super();this._sampleKey="";this.readonly=!1,this._open="general"}_t(e,t){return T(this.hass?.language,e,t)}willUpdate(){let e=String(this.profile?.integration??""),t=`${e}|${this._deviceId??""}`;this.hass&&t!==this._sampleKey&&(this._sampleKey=t,this.hass.callWS({type:"easy_av_control/profiles/sample",integration:e,device_id:this._deviceId??null}).then(i=>{t===this._sampleKey&&(this._sample=i)}).catch(()=>{}))}_set(e,t){this.readonly||this.dispatchEvent(new CustomEvent("profile-changed",{detail:{profile:fi(this.profile,e,t)}}))}get _entities(){return this._sample?.entities??[]}_panel(e,t,i,s,o){return r`<details
      class="ltek-sec"
      .open=${this._open===e}
      @toggle=${a=>{let c=a.target.open;c&&this._open!==e?this._open=e:!c&&this._open===e&&(this._open="")}}
    >
      <summary><ha-icon icon=${t}></ha-icon>${i}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="ltek-body">${s?r`<p class="ltek-hint">${s}</p>`:p}<fieldset ?disabled=${this.readonly}>${o}</fieldset></div>
    </details>`}_text(e,t,i=""){let s=e.reduce((o,a)=>o?.[a],this.profile)??"";return r`<div class="ltek-row"><label class="lbl">${t}</label>
      <input type="text" .value=${String(s)} placeholder=${i}
        @change=${o=>this._set(e,o.target.value.trim())} /></div>`}_select(e,t,i,s=""){let o=String(e.reduce((a,c)=>a?.[c],this.profile)??s);return r`<div class="ltek-row"><label class="lbl">${t}</label>
      <select @change=${a=>this._set(e,a.target.value||void 0)}>
        ${i.map(([a,c])=>r`<option value=${a} ?selected=${a===o}>${c}</option>`)}
      </select></div>`}_slider(e,t,i,s,o,a){let c=e.reduce((d,u)=>d?.[u],this.profile),h=c===void 0?a:Number(c);return r`<div class="ltek-row nowrap"><label class="lbl">${t}</label>
      <input type="range" min=${i} max=${s} step=${o} .value=${String(h)}
        @input=${d=>d.target.nextElementSibling.textContent=this._secs(Number(d.target.value))}
        @change=${d=>{let u=Number(d.target.value);this._set(e,u===a?void 0:u)}} />
      <span class="ltek-val">${this._secs(h)}</span>
      ${c!==void 0&&!this.readonly?r`<button class="ltek-act" title=${this._t("pf.reset")} @click=${()=>this._set(e,void 0)}><ha-icon icon="mdi:restore"></ha-icon></button>`:p}</div>`}_secs(e){return e>=60&&e%60===0?`${e/60} min`:`${e} s`}_entityPicker(e,t,i,s=!0){let o=e.reduce((d,u)=>d?.[u],this.profile),a=U(this._entities,o),c=this._entities.filter(d=>!i||i.includes(d.domain)),h=d=>d?[d.domain,d.translation_key??d.unique_id_suffix??d.device_class].filter(Boolean).join(" \xB7 "):"";return r`<div class="ltek-row"><label class="lbl">${t}</label>
      <select @change=${d=>{let u=d.target.value,m=this._entities.find(f=>f.entity_id===u);this._set(e,m?ft(m):void 0)}}>
        ${s?r`<option value="" ?selected=${!o}>${this._t("pf.none")}</option>`:p}
        ${o&&!a?r`<option value="__keep" selected>${h(o)} (${this._t("pf.not_on_device")})</option>`:p}
        ${c.map(d=>r`<option value=${d.entity_id} ?selected=${a?.entity_id===d.entity_id}>${d.name} · ${d.entity_id}</option>`)}
      </select>
      ${o?r`<span class="ltek-badge">${h(o)}</span>`:p}</div>`}_chips(e,t,i){let s=e.reduce((a,c)=>a?.[c],this.profile)??[],o=a=>a&&!s.includes(a)&&this._set(e,[...s,a]);return r`<div class="ltek-row"><label class="lbl">${t}</label>
      <span class="chips">
        ${s.map(a=>r`<span class="chip on">${a}
          ${this.readonly?p:r`<button title=${this._t("delete")} @click=${()=>this._set(e,s.filter(c=>c!==a))}>×</button>`}</span>`)}
        ${this.readonly?p:r`${i.filter(a=>!s.includes(a)).map(a=>r`<button class="chip add" @click=${()=>o(a)}>+ ${a}</button>`)}
              <input class="chip-input" type="text" placeholder=${this._t("pf.other_value")}
                @change=${a=>{let c=a.target;o(c.value.trim()),c.value=""}} />`}
      </span></div>`}_general(){let e=[...new Set([String(this.profile.integration??""),...this._sample?.integrations??[]])].filter(Boolean),t=this._sample?.devices??[];return r`
      ${this._text(["name"],this._t("pf.name"))}
      ${this._text(["id"],this._t("pf.id"),"my_receiver")}
      ${this._select(["integration"],this._t("pf.integration"),e.map(i=>[i,i]))}
      ${t.length>1?r`<div class="ltek-row"><label class="lbl">${this._t("pf.example")}</label>
            <select @change=${i=>this._deviceId=i.target.value}>
              ${t.map(i=>r`<option value=${i.id} ?selected=${i.id===this._sample?.device_id}>${i.name}</option>`)}
            </select></div>`:p}
      ${this._entities.length?p:r`<p class="ltek-hint ltek-warn">${this._t("pf.no_example")}</p>`}
      ${this._entityPicker(["device_entity"],this._t("pf.device_entity"),["media_player","remote","switch"],!1)}
      ${this._select(["order"],this._t("pf.order"),sn.map(i=>[i,this._t(`order.${i}`)]),"middle")}
    `}_status(){let e=this.profile.indicator??{},t=!e.entity,i=t?U(this._entities,this.profile.device_entity):U(this._entities,e.entity),s=e.attribute,o=s?i?.attributes[s]:i?.state,a=s?[o].filter(h=>h!==void 0).map(String):i?.values??[],c=Object.keys(i?.attributes??{});return r`
      ${this._entityPicker(["indicator","entity"],this._t("pf.status_entity"),null)}
      <p class="ltek-hint">${this._t(t?"pf.status_own":"pf.status_other")}</p>
      ${c.length?this._select(["indicator","attribute"],this._t("pf.attribute"),[["",this._t("pf.attribute_none")],...c.map(h=>[h,h])]):p}
      ${i?r`<p class="ltek-hint">${this._t("pf.now",{value:o===void 0?"\u2013":String(o)})}</p>`:p}
      <label class="check"><input type="checkbox" .checked=${!!e.available_is_on}
        @change=${h=>this._set(["indicator","available_is_on"],h.target.checked||void 0)} />
        ${this._t("pf.available_is_on")}</label>
      ${e.available_is_on?p:mi.map(h=>this._chips(["indicator",h],this._t(`pf.group.${h}`),on(a,e,h)))}
    `}_timing(){return r`
      ${this._slider(["timeouts","on"],this._t("pf.timeout_on"),5,600,5,120)}
      ${this._slider(["timeouts","off"],this._t("pf.timeout_off"),5,900,5,300)}
      ${this._slider(["debounce"],this._t("pf.debounce"),0,30,.5,2)}
    `}_companions(){let e=this.profile.settings??[],t=this._entities.filter(s=>["select","number","switch"].includes(s.domain)),i=new Set(e.map(s=>U(this._entities,s)?.entity_id).filter(Boolean));return r`
      ${this._entityPicker(["remote"],this._t("pf.remote"),["remote"])}
      ${this._entityPicker(["power_switch"],this._t("pf.power_switch"),["switch"])}
      <div class="ltek-group">${this._t("pf.settings")}</div>
      <p class="ltek-hint">${this._t("pf.settings_hint")}</p>
      ${t.map(s=>r`<label class="check"><input type="checkbox" .checked=${i.has(s.entity_id)}
        @change=${o=>{let a=o.target.checked,c=ft(s),h=e.filter(d=>U(this._entities,d)?.entity_id!==s.entity_id);this._set(["settings"],a?[...h,c]:h)}} />${s.name}</label>`)}
      ${e.filter(s=>!U(this._entities,s)).map(s=>r`<span class="ltek-badge">${s.domain} · ${s.translation_key??s.unique_id_suffix??""}</span>`)}
    `}_picture(){let e=this.profile.picture,t=U(this._entities,e?.entity);return r`
      <label class="check"><input type="checkbox" .checked=${!!e}
        @change=${i=>{let s=i.target.checked,o=this._entities.find(a=>a.domain==="sensor");this._set(["picture"],s?{entity:o?ft(o):{domain:"sensor"},ok:[]}:void 0)}} />${this._t("pf.picture_on")}</label>
      ${e?r`${this._entityPicker(["picture","entity"],this._t("pf.picture_entity"),null,!1)}
            ${this._chips(["picture","ok"],this._t("pf.picture_ok"),t?.values??[])}
            ${this._chips(["picture","fail"],this._t("pf.picture_fail"),t?.values??[])}
            ${this._slider(["picture","timeout"],this._t("pf.picture_timeout"),5,300,5,30)}
            ${this._slider(["picture","debounce"],this._t("pf.debounce"),0,30,.5,5)}`:p}
    `}_jobs(){let e=this.profile.roles??{};return r`${nn.map(t=>r`<div class="ltek-row nowrap"><label class="ltek-check-inline">
        <input type="checkbox" .checked=${e[t]!==void 0}
          @change=${i=>this._set(["roles",t],i.target.checked?5:void 0)} />
        ${this._t(`role.${t}`)}</label>
        ${e[t]!==void 0?r`<input type="range" min="1" max="9" step="1" .value=${String(e[t])}
              @change=${i=>this._set(["roles",t],Number(i.target.value))} />
              <span class="ltek-val">${e[t]}</span>`:p}</div>`)}`}render(){return r`
      ${this._panel("general","mdi:information-outline",this._t("pf.general"),this._t("pf.general_hint"),this._general())}
      ${this._panel("status","mdi:state-machine",this._t("pf.status"),this._t("pf.status_hint"),this._status())}
      ${this._panel("timing","mdi:timer-sand",this._t("pf.timing"),this._t("pf.timing_hint"),this._timing())}
      ${this._panel("companions","mdi:remote",this._t("pf.companions"),this._t("pf.companions_hint"),this._companions())}
      ${this._panel("picture","mdi:image-check-outline",this._t("pf.picture"),this._t("pf.picture_hint"),this._picture())}
      ${this._panel("jobs","mdi:account-hard-hat-outline",this._t("pf.jobs"),this._t("pf.jobs_hint"),this._jobs())}
    `}};pe.properties={hass:{attribute:!1},profile:{attribute:!1},readonly:{type:Boolean},_sample:{state:!0},_open:{state:!0},_deviceId:{state:!0}},pe.styles=[$,A,x,w`
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
    `];customElements.get("easy-av-control-profile-form")||customElements.define("easy-av-control-profile-form",pe);var ue=class extends b{constructor(){super(),this.profiles=[],this._yaml=!1}_t(n,e){return T(this.hass?.language,n,e)}_changed(){this.dispatchEvent(new CustomEvent("profiles-changed"))}updated(n){if(n.has("focusProfile")&&this.focusProfile){let t=this.focusProfile;this._editing=void 0,this._preview=t,this.dispatchEvent(new CustomEvent("focus-shown")),this.updateComplete.then(()=>this.shadowRoot?.querySelector(`[data-profile="${CSS.escape(t)}"]`)?.scrollIntoView({block:"center"}))}if(n.has("draftFor")&&this.draftFor){let t=this.draftFor;this.dispatchEvent(new CustomEvent("draft-opened")),this._draft(t)}let e=this._editing?.learn;if(n.has("hass")&&e?.mode){let t=this.hass.states[e.watch]?.state,i=e[e.mode];t!==void 0&&i[i.length-1]!==t&&(this._editing={...this._editing,learn:{...e,[e.mode]:[...i,t]}})}}async _openPicker(){let n=await this.hass.callWS({type:"easy_av_control/config/detect_all",rooms:{}});this._pick=n.unmatched}async _draft(n){this._pick=void 0;try{let e=await this.hass.callWS({type:"easy_av_control/profiles/draft",integration:n});this._notice=void 0,this._editing={data:e.profile,previousId:null,readonly:!1,learn:{watch:e.watch,device:e.device_entity,on:[],off:[],mode:null}}}catch(e){this._notice=e.message??String(e)}}async _learn(n){let e=this._editing.learn,t=this.hass.states[e.watch]?.state;this._editing={...this._editing,learn:{...e,mode:n,[n]:t!==void 0?[t]:[]}},await this.hass.callService("homeassistant",n==="on"?"turn_on":"turn_off",{entity_id:e.device})}_useLearned(){let n=this._editing,e=di(n.learn.on,n.learn.off),t={...n.data.indicator??{},...e};this._editing={...n,data:{...n.data,indicator:t},learn:{...n.learn,mode:null}}}_renderLearn(n){let e=t=>t.length?t.join(" \u2192 "):"\u2013";return r`<details class="ltek-sec" open>
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
      ${this._notice?r`<p class="ltek-hint ok">${this._notice}</p>`:p}
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
                </button>`:p}
          </div>
          ${this._pick?r`<div class="ltek-row pick">
                <label class="lbl">${this._t("profile_new_pick")}</label>
                ${this._pick.length?r`<select @change=${t=>{let i=t.target.value;i&&this._draft(i)}}>
                      <option value="">–</option>
                      ${this._pick.map(t=>r`<option value=${t}>${t}</option>`)}
                    </select>`:p}
                <span class="ltek-hint">${this._t(this._pick.length?"profile_new_hint":"profile_new_none")}</span>
              </div>`:p}
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
        ${n.tested?p:r`<span class="ltek-badge warn" title=${this._t("profile_untested")}>!</span>`}
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
        ${e?p:r`<button class="ltek-del" title=${this._t("delete")} @click=${()=>this._delete(n)}>
              <ha-icon icon="mdi:trash-can-outline"></ha-icon>
            </button>`}
      </div>
      ${t?r`<div class="preview">${ci(n,(s,o)=>this._t(s,o)).map(s=>r`<div>${s}</div>`)}</div>`:p}`}_edit(n){this._notice=void 0,this._editing={data:n.data,previousId:n.source==="user"?n.id:null,readonly:n.source==="builtin"}}async _duplicate(n){let e=await this.hass.callWS({type:"easy_av_control/profiles/duplicate",profile_id:n});this._notice=void 0,this._editing={data:e,previousId:null,readonly:!1}}async _delete(n){window.confirm(this._t("profile_delete_confirm",{name:n.name}))&&(await this.hass.callWS({type:"easy_av_control/profiles/delete",profile_id:n.id}),this._changed())}async _save(){let n=this._editing,e=await this.hass.callWS({type:"easy_av_control/profiles/save",profile:n.data,previous_id:n.previousId});if(e.error){this._editing={...n,error:e.error.message};return}this._editing=void 0,this._notice=this._t("profile_saved"),this._changed()}_renderEditor(n){return r`
      <div class="ltek-buttons bar">
        <button class="ltek-btn" @click=${()=>this._editing=void 0}>
          <ha-icon icon="mdi:arrow-left"></ha-icon> ${this._t(n.readonly?"profile_close":"profile_cancel")}
        </button>
        ${n.readonly?p:r`<button class="ltek-btn primary" @click=${this._save}>${this._t("profile_save")}</button>`}
      </div>
      <h2 class="title">
        <ha-icon icon=${n.readonly?"mdi:lock-outline":"mdi:pencil"}></ha-icon>${String(n.data.name??n.data.id)}
        <span class="mode">
          <button class="ltek-btn ${this._yaml?"":"primary"}" @click=${()=>this._yaml=!1}>${this._t("pf.form")}</button>
          <button class="ltek-btn ${this._yaml?"primary":""}" @click=${()=>this._yaml=!0}>YAML</button>
        </span>
      </h2>
      <p class="ltek-hint">${this._t(n.readonly?"profile_readonly":this._yaml?"profile_editor_hint":"pf.form_hint")}</p>
      ${n.error?r`<p class="ltek-error">${n.error}</p>`:p}
      ${n.learn&&!n.readonly?this._renderLearn(n.learn):p}
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
    `}async _openExport(n){let e=await this.hass.callWS({type:"easy_av_control/profiles/export",ids:n});this._dialog={mode:"export",text:JSON.stringify(e,null,2)},await this.updateComplete,this._showDialog()}async _openImport(){this._dialog={mode:"import",text:""},await this.updateComplete,this._showDialog()}_showDialog(){let n=this.shadowRoot?.querySelector("dialog");n&&!n.open&&n.showModal()}_closeDialog(){this.shadowRoot?.querySelector("dialog")?.close(),this._dialog=void 0}async _copy(n){let e=n.currentTarget,t=this.shadowRoot.querySelector("textarea");t.select();let i=!1;try{i=document.execCommand("copy")}catch{i=!1}if(!i)try{await navigator.clipboard.writeText(t.value),i=!0}catch{i=!1}e.textContent=this._t(i?"profile_copied":"profile_copy_failed")}async _paste(){try{let n=await navigator.clipboard.readText();this._dialog={...this._dialog,text:n}}catch{this._dialog={...this._dialog,message:this._t("profile_paste_failed")}}}async _import(){let n;try{n=JSON.parse(this._dialog.text)}catch(i){this._dialog={...this._dialog,message:String(i)};return}let e=await this.hass.callWS({type:"easy_av_control/profiles/import",export:n});if(e.error){this._dialog={...this._dialog,message:e.error.message};return}let t=[this._t("profile_import_done",{added:(e.added??[]).join(", ")||"\u2013"})];for(let[i,s]of Object.entries(e.renamed??{}))t.push(this._t("profile_import_renamed",{from:i,to:s}));Object.keys(e.invalid??{}).length&&t.push(this._t("profile_import_invalid",{ids:Object.keys(e.invalid).join(", ")})),this._closeDialog(),this._notice=t.join(" \xB7 "),this._changed()}_renderDialog(){let n=this._dialog;if(!n)return p;let e=n.mode==="export";return r`<dialog @cancel=${this._closeDialog} @click=${t=>t.target===t.currentTarget&&this._closeDialog()}>
      <div class="dialog-body">
        <div class="ltek-group first">${this._t(e?"profile_export":"profile_import")}</div>
        ${e?p:r`<p class="ltek-hint">${this._t("profile_import_hint")}</p>`}
        <textarea
          class="ltek-text"
          rows="16"
          .value=${n.text}
          ?readonly=${e}
          @input=${t=>this._dialog={...n,text:t.target.value}}
        ></textarea>
        ${n.message?r`<p class="ltek-hint ltek-warn">${n.message}</p>`:p}
        <div class="ltek-buttons">
          ${e?r`<button class="ltek-btn primary" @click=${this._copy}>${this._t("profile_copy")}</button>`:r`<button class="ltek-btn" @click=${this._paste}>${this._t("profile_paste")}</button>
                <button class="ltek-btn primary" ?disabled=${!n.text.trim()} @click=${this._import}>${this._t("profile_import")}</button>`}
          <button class="ltek-btn" @click=${this._closeDialog}>${this._t("profile_close")}</button>
        </div>
      </div>
    </dialog>`}};ue.properties={hass:{attribute:!1},profiles:{attribute:!1},_preview:{state:!0},_editing:{state:!0},_dialog:{state:!0},_notice:{state:!0},_pick:{state:!0},_yaml:{state:!0},draftFor:{attribute:!1},focusProfile:{attribute:!1}},ue.styles=[$,A,x,w`
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
    `];customElements.get("easy-av-control-profiles")||customElements.define("easy-av-control-profiles",ue);function _t(l,n){let e=String(l??"").trim().toLowerCase();if(e==="unavailable"||e==="unknown"||e==="")return"unavailable";if(e==="standby")return"standby";if(e==="idle")return"idle";switch(n){case"on":return"on";case"starting":case"stopping":return"busy";case"off":return"off";case"error":return"error";default:return"unavailable"}}function gt(l){let n=l.segments.find(e=>_t(e.value,e.group)==="on");return n?n.start:null}function _i(l){let n=gt(l);return n===null||l.sent===null||l.sent===void 0?null:Math.max(0,Math.round((n-l.sent)*10)/10)}function Ve(l){let n=l.filter(s=>s.ok).map(s=>s.seconds),e=[...n].sort((s,o)=>s-o),t=e.length>>1,i=e.length?e.length%2?e[t]:(e[t-1]+e[t])/2:null;return{count:l.length,typical:i===null?null:Math.round(i*10)/10,fastest:e.length?e[0]:null,slowest:e.length?e[e.length-1]:null,last:n.length?n[n.length-1]:null,spread:e.length?Math.round((e[e.length-1]-e[0])*10)/10:null,failed:l.length-n.length}}function gi(l){let n=new Map;for(let e of l){let t=[e.room,e.activity,e.mode,e.mode==="start"?e.from??"":""].join("|");n.set(t,[...n.get(t)??[],e])}return[...n.entries()].map(([e,t])=>({key:e,runs:t}))}var vt=l=>l.result==="ok"||l.result==="warning";function O(l){if(l==null||!Number.isFinite(l))return"\u2013";if(l<60)return`${Math.round(l*10)/10} s`;let n=Math.round(l);return`${Math.floor(n/60)}:${String(n%60).padStart(2,"0")}`}function bt(l,n){if(!n||n<=0)return"";let e=Math.round((l-n)/n*100);return Math.abs(e)<10?"":`${e>0?"+":""}${e} %`}var me=l=>l[l.length-1],rn={ok:"ok",warning:"warn",error:"err",cancelled:""},fe=class extends b{constructor(){super(),this._open="runs",this._expanded=new Set,this._mode="all"}connectedCallback(){super.connectedCallback(),this._load()}async _load(){try{this._history=await this.hass.callWS({type:"easy_av_control/history/get"}),this._failed=void 0}catch(n){this._failed=n.message??String(n)}}async _export(n){let e=await this.hass.callWS({type:"easy_av_control/history/export",...n?{run:n}:{}}),t=JSON.stringify(e,null,2),i=new Date().toISOString().replace(/[-:]/g,"").slice(0,13),s=`easy-av-control-report-${n?`run-${n.split("-")[0]}`:i}.json`;try{let o=URL.createObjectURL(new Blob([t],{type:"application/json"})),a=document.createElement("a");a.href=o,a.download=s,document.body.appendChild(a),a.click(),a.remove(),window.setTimeout(()=>URL.revokeObjectURL(o),5e3)}catch{}try{await navigator.clipboard.writeText(t),this._copied=!0,window.setTimeout(()=>this._copied=!1,3e3)}catch{}}async _clear(){window.confirm(this._t("rep.clear_confirm"))&&(await this.hass.callWS({type:"easy_av_control/history/clear"}),await this._load())}_t(n,e){return T(this.hass?.language,n,e)}_toggle(n){let e=new Set(this._expanded);e.has(n)?e.delete(n):e.add(n),this._expanded=e}_when(n){let e=new Date(n);return Number.isNaN(e.getTime())?n:e.toLocaleString(this.hass?.language,{dateStyle:"short",timeStyle:"medium"})}render(){if(this._failed)return r`<p class="ltek-hint ltek-error">${this._failed}</p>`;let n=this._history;return r`
      <div class="head">
        <h2><ha-icon icon="mdi:chart-timeline-variant"></ha-icon>${this._t("rep.title")}</h2>
        <div class="ltek-buttons">
          ${this._copied?r`<span class="ltek-hint copied">${this._t("rep.copied")}</span>`:p}
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
          ${this._panel("devices","mdi:television-play",this._t("rep.devices"),this._renderDevices(n.devices))}
          ${this._panel("entities","mdi:format-list-bulleted-type",this._t("rep.entities"),this._renderEntities())}`:r`<p class="ltek-hint">${this._t("loading")}</p>`}
    `}_panel(n,e,t,i){return r`<details
      class="ltek-sec"
      .open=${this._open===n}
      @toggle=${s=>{let o=s.target.open;o&&this._open!==n&&(this._open=n),o&&n==="entities"?this._loadEntities():!o&&this._open===n&&(this._open="")}}
    >
      <summary><ha-icon icon=${e}></ha-icon>${t}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="ltek-body">${i}</div>
    </details>`}_spark(n,e){let s=n.slice(-40),o=Math.max(1,...s.map(c=>c.seconds)),a=Math.max(2,Math.min(10,(180-s.length)/Math.max(1,s.length)));return r`<svg class="spark" viewBox="0 0 ${180} ${32}" width=${180} height=${32} aria-hidden="true">
      ${s.map((c,h)=>{let d=Math.max(2,c.seconds/o*30);return rt`<rect x=${h*(a+1)} y=${32-d} width=${a} height=${d} rx="1"
          class=${c.ok?c.warn?"warn":"ok":"err"}><title>${O(c.seconds)}</title></rect>`})}
      ${e?rt`<line x1="0" x2=${180} y1=${32-e/o*30} y2=${32-e/o*30} class="typ" />`:p}
    </svg>`}_stats(n,e="rep.count"){return r`<span class="stats">
      <span><b>${O(n.typical)}</b> ${this._t("rep.typical")}</span>
      <span>${O(n.fastest)} – ${O(n.slowest)}</span>
      ${n.failed?r`<span class="ltek-badge warn">${this._t("rep.failed",{n:String(n.failed)})}</span>`:p}
      <span class="muted">${this._t(e,{n:String(n.count)})}</span>
    </span>`}_renderRuns(n){if(!n.length)return r`<p class="ltek-hint">${this._t("rep.no_runs")}</p>`;let e=n.filter(i=>this._mode==="all"||i.mode===this._mode),t=gi(e).sort((i,s)=>me(i.runs).at<me(s.runs).at?1:-1);return r`<div class="ltek-row">
        <label class="lbl">${this._t("rep.show")}</label>
        <select @change=${i=>this._mode=i.target.value}>
          ${["all","start","stop"].map(i=>r`<option value=${i} ?selected=${this._mode===i}>${this._t(`rep.mode_${i}`)}</option>`)}
        </select>
      </div>
      <div class="ltek-list">
        ${t.map(({key:i,runs:s})=>{let o=s[0],a=Ve(s.map(h=>({seconds:h.seconds,ok:vt(h)}))),c=this._expanded.has(i);return r`<div class="ltek-item group ${c?"open":""}">
            <button class="row" @click=${()=>this._toggle(i)}>
              <ha-icon class="lead" icon=${o.mode==="start"?"mdi:play-circle-outline":"mdi:stop-circle-outline"}></ha-icon>
              <span class="ltek-item-text">
                <span class="ltek-name">${o.room_name} · ${o.activity_name}</span>
                <span class="ltek-subline"
                  >${this._t(`rep.mode_${o.mode}`)}${o.from_name?` \xB7 ${this._t("rep.from",{activity:o.from_name})}`:""}</span
                >
                ${this._stats(a)}
              </span>
              ${this._spark(s.map(h=>({seconds:h.seconds,ok:vt(h),warn:h.result==="warning"})),a.typical)}
              <ha-icon class="ltek-act chev" icon=${c?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
            </button>
            ${c?r`<div class="runs">${[...s].reverse().map(h=>this._renderRun(h,a.typical))}</div>`:p}
          </div>`})}
      </div>`}_renderRun(n,e){let t=`run:${n.at}`,i=this._expanded.has(t),s=bt(n.seconds,e);return r`<div class="run">
      <button class="run-row" @click=${()=>this._toggle(t)}>
        <span class="when">${this._when(n.at)}</span>
        <span class="total"><b>${O(n.seconds)}</b>${s?r` <span class="dev ${s.startsWith("+")?"slow":"fast"}">${s}</span>`:p}</span>
        <span class="ltek-badge ${rn[n.result]??""}">${this._t(`rep.result_${n.result}`)}</span>
        <ha-icon class="ltek-act" icon=${i?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
      </button>
      ${i&&n.id?r`<button class="ltek-btn export-run" @click=${()=>this._export(n.id)}>
            <ha-icon icon="mdi:download"></ha-icon> ${this._t("rep.export_run")}
          </button>`:p}
      ${i?this._renderPhases(n):p}
    </div>`}_renderPhases(n){let e=Math.max(n.seconds,.1),t=n.lanes??[],i=new Set(t.map(o=>o.device)),s=n.phases.filter(o=>!(o.kind==="device"&&i.has(String(o.device))));return r`<div class="phases">
      ${t.length?r`<div class="lane-legend">
              ${["off","standby","busy","idle","on"].map(o=>r`<span class="key"><i class="swatch c-${o}"></i>${this._t(`rep.lane_${o}`)}</span>`)}
            </div>
            ${t.map(o=>this._renderLane(o,e))}
            ${this._axis(e)}`:p}
      ${s.length&&t.length?r`<p class="ltek-hint lane-then">${this._t("rep.then_hint")}</p>`:p}
      ${s.map(o=>r`<div class="phase ${o.result==="error"?"err":""}">
          <span class="phase-name">${this._phaseName(o)}</span>
          <span class="track"
            ><span
              class="bar"
              style="left:${o.start/e*100}%;width:${Math.max(.6,o.seconds/e*100)}%"
            ></span
          ></span>
          <span class="phase-time">${O(o.seconds)}</span>
        </div>`)}
      ${n.error?r`<p class="ltek-error small">${n.error}</p>`:p}
      ${(n.warnings??[]).map(o=>r`<p class="ltek-warn small">${o}</p>`)}
    </div>`}_renderLane(n,e){let t=_i(n),i=gt(n),s=t!==null?O(t):n.sent===null&&i!==null?this._t("rep.lane_on_already"):"\u2013";return r`<div class="phase lane">
      <span class="phase-name" title=${n.entity_id}>${n.name}</span>
      <span class="track lane-track"
        >${n.segments.map(o=>{let a=_t(o.value,o.group),c=(o.end-o.start)/e*100;return r`<span
            class="seg c-${a}"
            style="left:${o.start/e*100}%;width:${Math.max(.4,c)}%"
            title=${`${o.value}: ${O(o.start)} \u2013 ${O(o.end)} (${O(o.end-o.start)})`}
          ></span>`})}${n.sent!==null&&n.sent!==void 0?r`<span
              class="sent"
              style="left:${n.sent/e*100}%"
              title=${this._t("rep.sent_at",{time:O(n.sent)})}
            ></span>`:p}</span
      >
      <span class="phase-time" title=${this._t("rep.took")}>${s}</span>
    </div>`}_axis(n){return r`<div class="phase axis">
      <span></span>
      <span class="ticks"><span>0</span><span>${O(n/2)}</span><span>${O(n)}</span></span>
      <span></span>
    </div>`}_phaseName(n){return n.kind==="device"?String(n.name??n.device??""):n.kind==="switch_off_unused"?this._t("rep.phase_switch_off_unused"):this._t(`rep.phase_${n.kind}`)}async _loadEntities(){try{this._entities=(await this.hass.callWS({type:"easy_av_control/history/entities"})).rooms}catch(n){this._failed=n.message??String(n)}}_renderEntities(){let n=this._entities;if(!n)return r`<p class="ltek-hint">${this._t("loading")}</p>`;let e=s=>this.hass.states[s]?.attributes.friendly_name??s,t=s=>this.hass.states[s]?.state??this._t("rep.ent_missing"),i=(s,o)=>r`<div class="ent">
      <span class="ent-name"><b>${e(s)}</b><span class="mono">${s}</span></span>
      <span class="ent-purpose">${o.map(a=>r`<span>${a}</span>`)}</span>
      <span class="ltek-badge ${this.hass.states[s]&&t(s)!=="unavailable"?"":"warn"}">${t(s)}</span>
    </div>`;return r`<p class="ltek-hint">${this._t("rep.entities_hint")}</p>
      ${Object.entries(n).map(([,s])=>{let o=a=>[a.device?s.devices[a.device]??a.device:"",a.activity?s.activities[a.activity]??a.activity:""].filter(Boolean).join(" \xB7 ");return r`<h3>${s.name}</h3>
          <h4>${this._t("rep.ent_created")}</h4>
          ${s.created.map(a=>i(a.entity_id,[this._t(`rep.ent.${a.role}`,{activity:a.activity?s.activities[a.activity]??a.activity:"",problem:a.problem?this._t(`problem.${a.problem}`):""})]))}
          <h4>${this._t("rep.ent_used")}</h4>
          ${s.used.map(a=>i(a.entity_id,a.roles.map(c=>`${this._t(`rep.use.${c.role}`)}${o(c)?`: ${o(c)}`:""}`)))}`})}`}_renderDevices(n){let e=Object.entries(n).filter(([,t])=>t.length);return e.length?(e.sort(([t,i],[s,o])=>(me(i).name??t).localeCompare(me(o).name??s)),r`<p class="ltek-hint">${this._t("rep.devices_hint")}</p>
      <div class="ltek-list">
        ${e.map(([t,i])=>{let s=this._expanded.has(`dev:${t}`),o=me(i).name??t;return r`<div class="ltek-item group ${s?"open":""}">
            <button class="row" @click=${()=>this._toggle(`dev:${t}`)}>
              <ha-icon class="lead" icon="mdi:television"></ha-icon>
              <span class="ltek-item-text">
                <span class="ltek-name">${o}</span>
                <span class="ltek-subline">${t}</span>
              </span>
              <ha-icon class="ltek-act chev" icon=${s?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
            </button>
            <div class="directions">
              ${["on","off","picture","signal"].map(a=>{let c=i.filter(d=>d.direction===a&&!d.warm);if(!c.length)return p;let h=Ve(c.map(d=>({seconds:d.seconds,ok:d.result==="ok"})));return r`<div class="direction">
                  <span class="dir-label">${this._t(`rep.dir_${a}`)}</span>
                  ${this._stats(h,"rep.count_times")}
                  ${this._spark(c.map(d=>({seconds:d.seconds,ok:d.result==="ok",warn:d.slow})),h.typical)}
                </div>`})}
            </div>
            ${s?this._renderEvents(i):p}
          </div>`})}
      </div>`):r`<p class="ltek-hint">${this._t("rep.no_devices")}</p>`}_renderEvents(n){let e={};for(let t of["on","off","picture","signal"])e[t]=Ve(n.filter(i=>i.direction===t&&!i.warm).map(i=>({seconds:i.seconds,ok:i.result==="ok"}))).typical;return r`<table class="events">
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
        ${[...n].reverse().map(t=>{let i=t.result==="ok"&&!t.warm?bt(t.seconds,e[t.direction]):"";return r`<tr>
            <td>${this._when(t.at)}</td>
            <td>
              ${this._t(`rep.dir_${t.direction}`)}${t.source?r`<div class="muted">${t.source}</div>`:p}${t.warm?r`<div class="muted">${this._t("rep.warm")}</div>`:p}
            </td>
            <td>
              <b>${O(t.seconds)}</b>${i?r` <span class="dev ${i.startsWith("+")?"slow":"fast"}">${i}</span>`:p}
            </td>
            <td>
              <span class="ltek-badge ${t.result==="ok"?t.slow?"warn":"ok":"err"}"
                >${t.result==="ok"?t.slow?this._t("rep.slow"):this._t("rep.result_ok"):t.result}</span
              >${t.value?r` <span class="muted">${t.value}</span>`:p}
            </td>
            <td class="muted">${[t.room_name,t.activity_name].filter(Boolean).join(" \xB7 ")}</td>
          </tr>`})}
      </tbody>
    </table>`}};fe.properties={hass:{attribute:!1},_history:{state:!0},_failed:{state:!0},_open:{state:!0},_expanded:{state:!0},_mode:{state:!0},_copied:{state:!0},_entities:{state:!0}},fe.styles=[$,A,x,w`
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
      .ent {
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.6fr) auto;
        gap: var(--ltek-sp-3);
        align-items: start;
        padding: 6px 0;
        border-top: 1px solid var(--divider-color);
      }
      .ent-name {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .ent-name .mono {
        font-family: var(--code-font-family, monospace);
        font-size: var(--ltek-fs-small);
        color: var(--secondary-text-color);
        overflow-wrap: anywhere;
      }
      .ent-purpose {
        display: flex;
        flex-direction: column;
        color: var(--secondary-text-color);
      }
      h3 {
        margin: var(--ltek-sp-3) 0 0;
        font-size: var(--ltek-fs-group);
      }
      h4 {
        margin: var(--ltek-sp-2) 0 0;
        font-size: var(--ltek-fs-small);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--secondary-text-color);
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
      .lane-legend {
        display: flex;
        flex-wrap: wrap;
        gap: 4px var(--ltek-sp-4);
        font-size: var(--ltek-fs-small);
        color: var(--secondary-text-color);
        margin-bottom: 2px;
      }
      .lane-legend .key {
        display: inline-flex;
        align-items: center;
        gap: 5px;
      }
      .swatch {
        width: 10px;
        height: 10px;
        border-radius: 3px;
        display: inline-block;
      }
      .lane-track {
        height: 14px;
        overflow: hidden;
      }
      .seg {
        position: absolute;
        top: 0;
        bottom: 0;
        border-radius: 0;
      }
      .c-off {
        background: var(--red-color, #f44336);
      }
      .c-standby {
        background: var(--grey-color, #9e9e9e);
      }
      .c-busy {
        background: #f5b800;
      }
      .c-idle {
        background: var(--blue-color, #2196f3);
      }
      .c-on {
        background: var(--green-color, #4caf50);
      }
      .c-error {
        background: repeating-linear-gradient(45deg, var(--red-color, #f44336), var(--red-color, #f44336) 4px, #7f1d1d 4px, #7f1d1d 8px);
      }
      .c-unavailable {
        background: repeating-linear-gradient(45deg, #5f5f5f, #5f5f5f 3px, #3c3c3c 3px, #3c3c3c 6px);
      }
      .sent {
        position: absolute;
        top: -1px;
        bottom: -1px;
        width: 2px;
        margin-left: -1px;
        background: #fff;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.55);
      }
      .axis .ticks {
        display: flex;
        justify-content: space-between;
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
      }
      .lane-then {
        margin: var(--ltek-sp-3) 0 0;
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
    `];customElements.get("easy-av-control-reports")||customElements.define("easy-av-control-reports",fe);var _e=class extends b{constructor(){super(),this._busy=""}connectedCallback(){super.connectedCallback(),this._load()}_t(n,e){return T(this.hass?.language,n,e)}async _load(){try{this._data=await this.hass.callWS({type:"easy_av_control/notify/get"}),this._phones||(this._phones=new Set(this._data.phones.map(n=>n.device_id))),this._failed=void 0}catch(n){this._failed=n.message??String(n)}}async _install(){this._busy="install";try{await this.hass.callWS({type:"easy_av_control/notify/install"}),await this._load()}catch(n){this._failed=n.message??String(n)}finally{this._busy=""}}async _create(n){if(this.hass.callApi){this._busy=`${n.room}/${n.kind}`;try{let{config:e}=await this.hass.callWS({type:"easy_av_control/notify/build",room:n.room,kind:n.kind,devices:[...this._phones??[]]});await this.hass.callApi("POST",`config/automation/config/${Date.now()}`,e),await new Promise(t=>window.setTimeout(t,900)),await this._load()}catch(e){this._failed=e.message??String(e)}finally{this._busy=""}}}_edit(n){let e=n.automation?.edit_id;e&&window.open(`/config/automation/edit/${e}`,"_blank","noopener")}render(){let n=this._data;return r`
      <div class="head">
        <h2><ha-icon icon="mdi:bell-ring-outline"></ha-icon>${this._t("ntf.title")}</h2>
        <button class="ltek-btn" @click=${()=>this._load()}><ha-icon icon="mdi:refresh"></ha-icon> ${this._t("rep.refresh")}</button>
      </div>
      <p class="ltek-hint">${this._t("ntf.hint")}</p>
      ${this._failed?r`<p class="ltek-hint ltek-error">${this._failed}</p>`:p}
      ${n?this._renderBody(n):r`<p class="ltek-hint">${this._t("loading")}</p>`}
    `}_renderBody(n){let e=n.blueprint,t=[...new Set(n.offers.map(i=>i.room))];return r`
      <div class="ltek-sec-flat">
        <div class="ltek-row">
          <span class="lbl">${this._t("ntf.blueprint")}</span>
          <span>
            ${e.installed?this._t(e.ours?"ntf.bp_installed":"ntf.bp_foreign",{version:e.installed_version??"?"}):this._t("ntf.bp_missing")}
          </span>
          ${!e.installed||e.update?r`<button class="ltek-btn" ?disabled=${this._busy==="install"} @click=${()=>this._install()}>
                ${this._t(e.installed?"ntf.bp_update":"ntf.bp_install",{version:e.shipped_version??""})}
              </button>`:p}
        </div>
        <div class="ltek-row phones">
          <span class="lbl">${this._t("ntf.phones")}</span>
          ${n.phones.length?n.phones.map(i=>r`<label class="check"
                  ><input
                    type="checkbox"
                    .checked=${this._phones?.has(i.device_id)??!0}
                    @change=${s=>{let o=new Set(this._phones);s.target.checked?o.add(i.device_id):o.delete(i.device_id),this._phones=o}}
                  />${i.name}</label
                >`):r`<span class="ltek-hint">${this._t("ntf.no_phones")}</span>`}
        </div>
      </div>
      ${t.map(i=>r`<h3>${n.offers.find(s=>s.room===i)?.room_name}</h3>
          ${["watchdog","monitoring"].map(s=>{let o=n.offers.filter(a=>a.room===i&&a.scope===s);return o.length?r`<h4>${this._t(`ntf.scope_${s}`)}</h4>
                  <div class="ltek-list">${o.map(a=>this._row(a))}</div>`:p})}`)}
    `}_row(n){let e=n.automation,t=`${n.room}/${n.kind}`;return r`<div class="ltek-item offer">
      <div class="ltek-item-text">
        <span class="ltek-name">${n.title}</span>
        <span class="ltek-subline">${n.text}</span>
        <span class="chips">
          ${n.buttons.map(i=>r`<span class="ltek-badge">${i}</span>`)}
          <span class="mono">${n.sensor}</span>
        </span>
      </div>
      ${e?r`<span class="ltek-badge ${e.state==="on"?"ok":""}">${this._t(e.state==="on"?"ntf.on":"ntf.off")}</span>
            <button class="ltek-btn" ?disabled=${!e.edit_id} @click=${()=>this._edit(n)}>
              <ha-icon icon="mdi:pencil-outline"></ha-icon> ${this._t("ntf.edit")}
            </button>`:r`<button
            class="ltek-btn primary"
            ?disabled=${this._busy===t||!this._phones?.size}
            title=${this._phones?.size?"":this._t("ntf.pick_phone")}
            @click=${()=>this._create(n)}
          >
            <ha-icon icon="mdi:plus"></ha-icon> ${this._t("ntf.create")}
          </button>`}
    </div>`}};_e.properties={hass:{attribute:!1},_data:{state:!0},_failed:{state:!0},_phones:{state:!0},_busy:{state:!0}},_e.styles=[$,A,x,w`
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
      h3 {
        margin: var(--ltek-sp-3) 0 0;
        font-size: var(--ltek-fs-group);
        font-weight: var(--ltek-fw-semibold);
      }
      h4 {
        margin: var(--ltek-sp-2) 0 0;
        font-size: var(--ltek-fs-small);
        font-weight: var(--ltek-fw-semibold);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--secondary-text-color);
      }
      .ltek-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--ltek-sp-1);
        --mdc-icon-size: 16px;
      }
      .ltek-row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: var(--ltek-sp-3);
        padding: var(--ltek-sp-1) 0;
      }
      .lbl {
        color: var(--ltek-c-text-2, var(--secondary-text-color));
        min-width: 110px;
      }
      label.check {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .offer {
        align-items: center;
        gap: var(--ltek-sp-3);
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        align-items: center;
        margin-top: 4px;
      }
      .mono {
        font-family: var(--code-font-family, monospace);
        font-size: var(--ltek-fs-small);
        color: var(--secondary-text-color);
      }
    `];customElements.get("easy-av-control-notifications")||customElements.define("easy-av-control-notifications",_e);var an={done:"mdi:check-circle",todo:"mdi:circle-outline",manual:"mdi:hand-pointing-right",optional:"mdi:circle-half-full",skip:"mdi:minus-circle-outline"},ge=class extends b{constructor(){super(),this._tab="system",this._busy=!1,this._copied=!1}connectedCallback(){super.connectedCallback(),this._load(),this._findCard()}_t(n,e){return T(this.hass?.language,n,e)}async _load(){try{this._plan=await this.hass.callWS({type:"easy_av_control/quickstart/plan"}),this._failed=void 0}catch(n){this._failed=n.message??String(n)}}async _findCard(){let n=[];try{let e=await this.hass.callWS({type:"lovelace/dashboards/list"});for(let t of[{url_path:null,title:"Overview"},...e])try{let i=await this.hass.callWS({type:"lovelace/config",url_path:t.url_path});JSON.stringify(i).includes("custom:easy-av-control-card")&&n.push(t.title||t.url_path||"Overview")}catch{}this._cardOn=n}catch{this._cardOn=void 0}}_effective(n){return n.id!=="card"?n:this._cardOn?.length?{...n,status:"done",detail:this._t("qs.card_on",{boards:this._cardOn.join(", ")}),yaml:void 0}:{...n,detail:this._t("qs.card_add")}}async _apply(n=!1){this._busy=!0;try{this._plan=await this.hass.callWS({type:"easy_av_control/quickstart/apply",sidebar:n})}catch(e){this._failed=e.message??String(e)}finally{this._busy=!1}}_open(n){this.dispatchEvent(new CustomEvent("open-page",{detail:{page:n},bubbles:!0,composed:!0}))}_count(n){let e=n.filter(t=>t.status!=="skip"&&t.status!=="optional");return{done:e.filter(t=>t.status==="done").length,total:e.length}}_summary(n){return n.done===n.total?this._t("qs.all_done"):this._t("qs.n_done",{done:String(n.done),total:String(n.total)})}render(){let n=this._plan,e=n?n.steps.map(o=>this._effective(o)):[],t=n?.activities??[],i=this._count(e),s=this._count(t.flatMap(o=>o.steps));return r`
      <div class="head"><h2><ha-icon icon="mdi:rocket-launch-outline"></ha-icon>${this._t("qs.title")}</h2></div>
      <p class="ltek-hint">${this._t("qs.hint")}</p>
      ${this._failed?r`<p class="ltek-hint ltek-error">${this._failed}</p>`:p}
      ${n?r`${this._renderStatus(n)}
            <div class="tabs" role="tablist">
              <button role="tab" class="tab ${this._tab==="system"?"active":""}" aria-selected=${this._tab==="system"} @click=${()=>this._tab="system"}>
                <ha-icon icon="mdi:server-network-outline"></ha-icon>${this._t("qs.tab_system")}
                <span class="count">${this._summary(i)}</span>
              </button>
              <button role="tab" class="tab ${this._tab==="activity"?"active":""}" aria-selected=${this._tab==="activity"} @click=${()=>this._tab="activity"}>
                <ha-icon icon="mdi:play-circle-outline"></ha-icon>${this._t("qs.tab_activity")}
                <span class="count">${t.length?this._summary(s):"\u2013"}</span>
              </button>
            </div>
            ${this._tab==="system"?r`<p class="ltek-hint">${this._t("qs.system_hint")}</p>
                  <ol class="steps">${e.map(o=>this._renderStep(o))}</ol>
                  <div class="bar">
                    <button class="ltek-btn primary" ?disabled=${!n.todo||this._busy} @click=${()=>this._apply()}>
                      <ha-icon icon="mdi:auto-fix"></ha-icon>
                      ${n.todo?this._t("qs.apply",{n:String(n.todo)}):this._t("qs.applied")}
                    </button>
                    <span class="ltek-hint">${this._t("qs.apply_hint")}</span>
                  </div>`:r`<p class="ltek-hint">${this._t("qs.activity_hint")}</p>
                  ${t.length?t.map(o=>r`<section class="act ${o.enabled?"":"off"}">
                          <h3>
                            <ha-icon icon="mdi:play-circle-outline"></ha-icon>${o.name}
                            <span class="room-name">${o.room_name}</span>
                            <span class="count">${this._summary(this._count(o.steps))}</span>
                          </h3>
                          <ol class="steps">${o.steps.map(a=>this._renderStep(a,"qs.astep."))}</ol>
                        </section>`):r`<p class="ltek-hint">${this._t("qs.no_activity")}
                        <button class="link" @click=${()=>this._open("activities")}>${this._t("qs.open")}</button></p>`}`}`:r`<p class="ltek-hint">${this._t("loading")}</p>`}
    `}_renderStatus(n){let e=n.status,t=(i,s,o,a)=>r`<button class="stat ${i?"ok":""}" @click=${()=>this._open(a)}><ha-icon icon=${s}></ha-icon><span>${o}</span></button>`;return r`<div class="stats">
      ${t(e.rooms>0,"mdi:home-outline",this._t("qs.s_rooms",{n:String(e.rooms)}),"rooms")}
      ${t(e.devices>0,"mdi:television",this._t("qs.s_devices",{n:String(e.devices)}),"rooms")}
      ${t(e.activities>0,"mdi:play-circle-outline",this._t(e.disabled?"qs.s_activities_off":"qs.s_activities",{n:String(e.activities),off:String(e.disabled)}),"activities")}
      ${t(e.runs>0,"mdi:chart-timeline-variant",this._t("qs.s_runs",{n:String(e.runs)}),"reports")}
      ${t(e.alerts>0,"mdi:bell-ring-outline",this._t("qs.s_alerts",{n:String(e.alerts)}),"notifications")}
    </div>`}_renderStep(n,e="qs.step."){return r`<li class="step ${n.status}">
      <ha-icon icon=${an[n.status]}></ha-icon>
      <div class="step-body">
        <div>
          <strong>${this._t(`${e}${n.id}`)}</strong>
          ${n.detail?r`<span class="ltek-hint inline"> · ${n.detail}</span>`:p}
          ${n.link&&(n.status==="manual"||n.status==="optional")?r`<button class="link" @click=${()=>this._open(n.link)}>${this._t("qs.open")}</button>`:p}
          ${n.id==="sidebar"&&n.status!=="done"?r`<button class="link" ?disabled=${this._busy} @click=${()=>this._apply(!0)}>${this._t("qs.show_sidebar")}</button>`:p}
        </div>
        ${n.automations?.length?r`<ul class="autos">
              ${n.automations.map(t=>r`<li>
                  <ha-icon icon="mdi:alert"></ha-icon>
                  <div>
                    ${t.edit_id?r`<a href=${`/config/automation/edit/${t.edit_id}`} target="_blank" rel="noopener">${t.name}</a>`:r`<strong>${t.name}</strong>`}
                    <div class="ltek-hint">${t.entities.join(", ")}</div>
                  </div>
                </li>`)}
            </ul>`:p}
        ${n.yaml?r`<pre class="yaml">${n.yaml}</pre>
              <button
                class="link"
                @click=${()=>navigator.clipboard?.writeText(n.yaml).then(()=>this._copied=!0,()=>{})}
              >
                ${this._t(this._copied?"profile_copied":"profile_copy")}
              </button>`:p}
      </div>
    </li>`}};ge.properties={hass:{attribute:!1},_plan:{state:!0},_failed:{state:!0},_busy:{state:!0},_cardOn:{state:!0},_copied:{state:!0},_tab:{state:!0}},ge.styles=[$,A,x,w`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--ltek-sp-3);
        font-size: var(--ltek-fs-body);
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
      .tabs {
        display: flex;
        gap: 4px;
        border-bottom: 1px solid var(--divider-color);
      }
      .tab {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border: none;
        border-bottom: 2px solid transparent;
        background: none;
        color: var(--secondary-text-color);
        font: inherit;
        cursor: pointer;
        --mdc-icon-size: 20px;
      }
      .tab.active {
        color: var(--primary-text-color);
        border-bottom-color: var(--ltek-c-accent);
      }
      .count {
        font-size: var(--ltek-fs-small);
        font-weight: normal;
        color: var(--secondary-text-color);
      }
      .act {
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        padding: 4px 12px 8px;
        margin-bottom: 8px;
      }
      .act.off {
        opacity: 0.6;
      }
      .act h3 {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 8px 0 4px;
        font-size: var(--ltek-fs-body);
        font-weight: var(--ltek-fw-semibold);
        --mdc-icon-size: 20px;
      }
      .act h3 ha-icon {
        color: var(--ltek-c-accent);
      }
      .act h3 .count {
        margin-left: auto;
      }
      .room-name {
        font-weight: normal;
        font-size: var(--ltek-fs-small);
        color: var(--secondary-text-color);
      }
      .stats {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .stat {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 12px 4px 8px;
        border-radius: 16px;
        border: 1px solid var(--divider-color);
        background: none;
        color: var(--secondary-text-color);
        font: inherit;
        cursor: pointer;
        --mdc-icon-size: 18px;
      }
      .stat.ok {
        color: var(--primary-text-color);
        border-color: var(--success-color, #43a047);
      }
      .stat.ok ha-icon {
        color: var(--success-color, #43a047);
      }
      .steps {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .step {
        display: flex;
        gap: 8px;
        padding: 7px 0;
        border-top: 1px solid var(--divider-color);
        --mdc-icon-size: 20px;
      }
      .step:first-child {
        border-top: none;
      }
      .step.done > ha-icon {
        color: var(--success-color, #43a047);
      }
      .step.todo > ha-icon {
        color: var(--primary-color);
      }
      .step.manual > ha-icon {
        color: var(--warning-color, #ffa600);
      }
      .step.optional > ha-icon,
      .step.skip > ha-icon {
        color: var(--secondary-text-color);
      }
      .step.skip {
        opacity: 0.6;
      }
      .step-body {
        flex: 1;
        min-width: 0;
      }
      .inline {
        display: inline;
      }
      button.link {
        background: none;
        border: none;
        padding: 0 0 0 6px;
        color: var(--ltek-c-accent);
        cursor: pointer;
        font: inherit;
      }
      .autos {
        list-style: none;
        padding: 0;
        margin: 6px 0 2px;
      }
      .autos li {
        display: flex;
        gap: 6px;
        padding: 3px 0;
        --mdc-icon-size: 16px;
      }
      .autos li > ha-icon {
        color: var(--warning-color, #ffa600);
        margin-top: 2px;
      }
      .autos a {
        color: var(--ltek-c-accent);
      }
      .yaml {
        margin: 6px 0 4px;
        padding: 8px 10px;
        border-radius: 6px;
        background: var(--secondary-background-color, #202020);
        font-family: var(--code-font-family, monospace);
        font-size: var(--ltek-fs-small);
      }
      .bar {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        padding-top: 10px;
      }
      .ltek-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--ltek-sp-1);
        --mdc-icon-size: 16px;
      }
    `];customElements.get("easy-av-control-quick-start")||customElements.define("easy-av-control-quick-start",ge);var $t=["power_on","power_off","set_source","set_volume","set_sound_mode","set_brightness","set_color_temp","set_position","set_tilt","call_action","delay","wait_available"],H=["volume","channels","transport","navigation"],yt={number:{min:0,max:3600,step:1,mode:"box",unit_of_measurement:"s"}},wt={number:{min:0,max:100,step:1,mode:"slider"}};function ve(l,n,e,t="source_list"){if(!e)return[];let i=l.states[e]?.attributes[t];return Array.isArray(i)&&i.length?i.map(String):n[e]??[]}function xt(l,n,e){return ve(l,n,e,"source_list")}var At=["source","sound_mode"],bi=["number","input_number","select","input_select","switch","input_boolean"],St={source:"source_list",sound_mode:"sound_mode_list"};function Et(l,n,e,t,i={}){let s=n.devices?.[e]?.entity_id;if(!s)return[];let o=[];if(s.startsWith("media_player."))for(let a of At){let c=St[a];ve(l,t[c]??{},s,c).length&&o.push({device:e,setting:a})}for(let a of i[s]??[])o.push({device:e,entity:a});return o}function ln(l,n,e,t,i={}){let s=n.devices?.[e]?.settings;return Array.isArray(s)?s.map(o=>({...o,device:e})):Et(l,n,e,t,i)}function yi(l,n,e,t,i={}){return(e.devices??[]).flatMap(s=>ln(l,n,s,t,i))}function be(l){return typeof l=="object"&&l!==null&&"source"in l}function wi(l,n,e,t,i={},s={}){let a={name:"device",required:!0,selector:{select:{options:Object.entries(n.devices??{}).map(([d,u])=>({value:d,label:u.name?`${u.name} (${d})`:d})),mode:"dropdown"}}},c=e.device?n.devices?.[e.device]?.entity_id:void 0;return[...{power_on:[a],power_off:[a],set_source:[a,{name:"source",required:!0,selector:{select:{options:xt(l,i,c),custom_value:!0,mode:"dropdown"}}}],set_volume:[a,{name:"volume_level",required:!0,selector:{number:{min:0,max:1,step:.01,mode:"slider"}}}],set_sound_mode:[a,{name:"sound_mode",required:!0,selector:{select:{options:ve(l,s,c,"sound_mode_list"),custom_value:!0,mode:"dropdown"}}}],set_brightness:[a,{name:"brightness_pct",selector:wt},{name:"color_temp_kelvin",selector:{color_temp:{unit:"kelvin",min:2e3,max:6500}}},{name:"transition",selector:yt}],set_color_temp:[a,{name:"color_temp_kelvin",required:!0,selector:{color_temp:{unit:"kelvin",min:2e3,max:6500}}}],set_position:[a,{name:"position",required:!0,selector:wt}],set_tilt:[a,{name:"tilt_position",required:!0,selector:wt}],call_action:[{name:"action",required:!0,selector:{text:{}}},{name:"target",selector:{target:{}}},{name:"data",selector:{object:{}}}],delay:[],wait_picture:[a,{name:"timeout",selector:{number:{min:5,max:300,step:5,mode:"slider",unit_of_measurement:"s"}}}],wait_available:[{...a,required:!1},{name:"entity_id",selector:{entity:{}}},{name:"timeout",selector:yt},{name:"reload_integration",selector:{boolean:{}}},{name:"on_timeout",selector:{select:{options:[{value:"abort",label:t("on_timeout_abort")},{value:"continue",label:t("on_timeout_continue")}],mode:"dropdown"}}}]}[e.type]??[],{name:"delay_after",selector:yt}]}function k(l,n=[]){let e={};for(let[t,i]of Object.entries(l))if(n.includes(t))e[t]=i;else{if(i==null||i==="")continue;if(Array.isArray(i)&&i.length===0)continue;if(typeof i=="object"&&!Array.isArray(i)&&Object.keys(i).length===0)continue;e[t]=i}return e}function We(l){let n=H.filter(e=>l[e]===null);return Array.isArray(l.settings)&&n.push("settings"),k(l,n)}function B(l){return l.normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/ß/g,"ss").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")}function C(l,n){let e=new Set(n),t=l||"item";if(!e.has(t))return t;let i=2;for(;e.has(`${t}_${i}`);)i+=1;return`${t}_${i}`}function Tt(l,n){let e=[];for(let[t,i]of Object.entries(l.activities??{}))((i.devices??[]).includes(n)||(i.steps??[]).some(o=>o.device===n)||H.some(o=>i.remote?.[o]===n)||(i.remote?.buttons??[]).some(o=>typeof o=="object"&&o?.device===n))&&e.push(i.name??t);return e}function Ge(l,n,e){let t={};for(let[o,a]of Object.entries(l.devices??{}))t[o===n?e:o]=a;let i=o=>o===n?e:o,s={};for(let[o,a]of Object.entries(l.activities??{})){let c=a.remote?{...a.remote}:void 0;if(c){for(let d of H)d in c&&(c[d]=i(c[d]));Array.isArray(c.buttons)&&(c.buttons=c.buttons.map(d=>typeof d=="object"&&d?{...d,device:i(d.device)}:d))}let h=a.before?Object.fromEntries(Object.entries(a.before).map(([d,u])=>[i(d),u.wait_for?{...u,wait_for:u.wait_for.map(m=>({...m,device:i(m.device)}))}:u])):void 0;s[o]=k({...a,devices:a.devices?.map(d=>i(d)),steps:a.steps?.map(d=>d.device===n?{...d,device:e}:d),checks:a.checks?.map(d=>d.device===n?{...d,device:e}:d),before:h,flow:a.flow?Object.fromEntries(Object.entries(a.flow).map(([d,u])=>[i(d),u])):void 0,remote:c})}return{...l,devices:t,activities:s}}function qe(l){return Object.entries(l?.activities??{}).sort(([n,e],[t,i])=>(e.order??1e3)-(i.order??1e3)||(e.name??n).localeCompare(i.name??t,void 0,{sensitivity:"base"}))}function Rt(l){return l.split("_").filter(Boolean).map(n=>n[0].toUpperCase()+n.slice(1)).join(" ")}function ki(l,n,e){let t=new Map;for(let i of e){let s=i.entity||n.devices?.[String(i.device)]?.entity_id,o=s&&l.entities?.[s]?.platform||"";t.set(o,[...t.get(o)??[],i])}return[...t.entries()]}function Ot(l,n){let e={};for(let[i,s]of Object.entries(l.before??{})){if(i===n)continue;let o=(s.wait_for??[]).filter(c=>c.device!==n),a=k({...s,wait_for:o.length?o:void 0});Object.keys(a).some(c=>c==="delay"||c==="wait_for")&&(e[i]=a)}let t={...l.flow??{}};return delete t[n],k({...l,devices:(l.devices??[]).filter(i=>i!==n),before:Object.keys(e).length?e:void 0,flow:Object.keys(t).length?t:void 0})}function jt(l,n,e){let t={...l.before??{}},i=e?k({...e,wait_for:e.wait_for?.length?e.wait_for:void 0}):void 0;return i&&(i.delay||i.wait_for?.length)?t[n]=i:delete t[n],k({...l,before:Object.keys(t).length?t:void 0})}var $i="easy_av_control.activities",vi="\u27E6eac\u27E7";function cn(l){let n=new Set(l.devices??[]);for(let t of l.checks??[])typeof t.device=="string"&&n.add(t.device);for(let t of l.steps??[])t.device&&n.add(t.device);for(let[t,i]of Object.entries(l.before??{})){n.add(t);for(let s of i.wait_for??[])n.add(s.device)}let e=l.remote??{};for(let t of H)typeof e[t]=="string"&&n.add(e[t]);for(let t of e.buttons??[])t&&typeof t.device=="string"&&n.add(t.device);for(let t of e.settings??[])t&&typeof t.device=="string"&&n.add(t.device);return[...n]}function xi(l,n){let e={},t={};for(let i of n){let s=l.activities?.[i];if(s){e[i]=JSON.parse(JSON.stringify(s));for(let o of cn(s))l.devices?.[o]&&(t[o]=JSON.parse(JSON.stringify(l.devices[o])))}}return{format:$i,version:1,activities:e,devices:t}}function dn(l,n){let e=new Set([...n].map(s=>s.trim().toLowerCase()));if(!e.has(l.trim().toLowerCase()))return l;let t=l.replace(/\s+\d+$/,""),i=2;for(;e.has(`${t} ${i}`.toLowerCase());)i+=1;return`${t} ${i}`}function Ai(l,n,e=!1){let t=n;if(!t||typeof t!="object"||t.format!==$i||typeof t.activities!="object")throw new Error("not an Easy AV Control activity export");let i=t.devices??{},s={...l.devices??{}},o={},a=[],c=[],h={};for(let[g,v]of Object.entries(i)){let y={};for(let S of kt)v[S]!==void 0&&(y[S]=v[S]);Object.keys(y).length&&(h[g]=y)}for(let[g,v]of Object.entries(i)){let y={...v};for(let j of kt)delete y[j];let S=Object.entries(s).find(([j,L])=>L.entity_id&&L.entity_id===y.entity_id&&!c.includes(j));if(S){o[g]=S[0],a.push(S[0]);continue}let E=C(g,Object.keys(s));s[E]=JSON.parse(JSON.stringify(y)),o[g]=E,c.push(E)}let d={...l.activities??{}},u={},m={},f=[];for(let[g,v]of Object.entries(t.activities)){let y={...v,flow:{...Object.fromEntries((v.devices??[]).filter(R=>h[R]).map(R=>[R,h[R]])),...v.flow??{}}};Object.keys(y.flow??{}).length||delete y.flow;let S={devices:{...i},activities:{[g]:y}};for(let[R,N]of Object.entries(o))R!==N&&(S=Ge(S,R,`${vi}${N}`));let E=JSON.parse(JSON.stringify(S.activities[g]).split(vi).join("")),j=E.name??g,L=e?void 0:Object.entries(d).find(([R,N])=>!(R in u)&&(N.name??R).trim().toLowerCase()===j.trim().toLowerCase())?.[0]??(g in d&&!(g in u)?g:void 0),Ee=Object.entries(d).filter(([R])=>R!==L),Ze=new Set(Ee.flatMap(([,R])=>(R.started_by??[]).map(N=>N.entity_id)));if((E.started_by??[]).some(R=>Ze.has(R.entity_id))&&(E=k({...E,started_by:void 0}),f.push(j)),L){d[L]=E,m[L]=j;continue}E={...E,name:dn(j,Object.entries(d).map(([R,N])=>N.name??R))};let Ye=C(g,Object.keys(d));d[Ye]=E,u[Ye]=E.name??Ye}let _=[];return{room:{...l,devices:s,activities:d},added:u,replaced:m,devicesReplaced:a,devicesAdded:c,alsoAffected:_,startedByDropped:f}}var kt=["ready","delay_after_power","delay_after_on","delay_after_off","turn_off_after","wait_on","wait_off","timeout_on","timeout_off","debounce","on_failure"];function Dt(l,n,e){return{...l.devices?.[e]??{},...n.flow?.[e]??{}}}function zt(l,n,e,t){let i={};for(let o of kt)e[o]!==void 0?i[o]=e[o]:o==="ready"&&t.ready&&(i.ready=null);let s={...l.flow??{}};return Object.keys(i).length?s[n]=i:delete s[n],{...l,flow:Object.keys(s).length?s:void 0}}var Pt=new Set(["boot","reload","ready","status","picture","check","turn_on","wait","already_on","step","turn_off","delay","wait_for"]),ee=new Set(["device","checks","steps"]);function ye(l){let n;return l.map(e=>{if(ee.has(e.kind)){n=e;return}return(!Pt.has(e.kind)||e.reason==="unused")&&(n=void 0),n})}function hn(l,n){if(!n)return-1;let e=ye(l),t=n.device??void 0,i=o=>(l[o].device??e[o]?.device)===t,s=o=>l.findIndex((a,c)=>!a.background&&o(a,c));switch(n.kind){case"power_on":return s(o=>o.kind==="outlets_on");case"power_off":return s(o=>o.kind==="outlets_off");case"boot":case"reload":case"ready":case"turn_on":case"status":return s((o,a)=>o.kind===n.kind&&i(a));case"reach":return s((o,a)=>o.kind==="turn_on"&&i(a));case"delay":case"before":return s((o,a)=>o.kind===(n.kind==="delay"?"delay":"wait_for")&&i(a));case"warm_up":return s((o,a)=>o.kind==="wait"&&o.reason==="delay_after_on"&&i(a));case"turn_off":return s((o,a)=>o.kind==="turn_off"&&i(a));case"checks":return s(o=>o.kind==="checks");case"step":return s(o=>o.kind!=="wait"&&o.step===n.step);case"wait":return s(o=>o.kind==="wait"&&o.step===n.step);case"hooks":return s(o=>o.kind==="hook_wait");default:return-1}}function Si(l,n,e){if(n.state==="error"){let a=ye(l);return l.map((c,h)=>c.background||e<0?"todo":h<e?ee.has(c.kind)&&a[e]===c?"failed":"done":h===e?"failed":"todo")}let t=n.state==="active"||n.state==="idle",i=n.state==="starting"||n.state==="stopping",s=i?Math.max(e,hn(l,n.current)):-1,o=ye(l);return l.map((a,c)=>a.background?t&&n.state==="idle"?"done":"todo":t?"done":!i||s<0?c===0?"active":"todo":c<s?ee.has(a.kind)&&o[s]===a?"active":"done":c===s?"active":"todo")}function Ei(l){switch(l){case"on":return"on";case"starting":case"stopping":return"busy";case"off":return"off";case"error":return"error";case"unavailable":return"unavailable";default:return"unknown"}}var pn={waits:["wait","boot","ready","status","hook_wait"],reloads:["reload"],outlets:["outlets_on","outlets_off","outlet_keep"],hooks:["hook","hook_wait"]},Ti=["entities","waits","notes","reloads","outlets","hooks"];function Ct(l,n){return n.some(e=>pn[e]?.includes(l.kind))}var un=400,mn={state:"mdi:flag-outline",outlets_on:"mdi:power-socket-eu",outlets_off:"mdi:power-socket-eu",outlet_keep:"mdi:power-socket-eu",turn_on:"mdi:power",turn_off:"mdi:power-off",hook:"mdi:script-text-outline",hook_wait:"mdi:script-text-outline",boot:"mdi:timer-sand",wait:"mdi:timer-sand",reload:"mdi:reload",ready:"mdi:lan-connect",status:"mdi:state-machine",picture:"mdi:image-check-outline",check:"mdi:image-check-outline",already_on:"mdi:check",step:"mdi:tune-variant",delay:"mdi:timer-outline",started_by:"mdi:gesture-tap-button",monitor_lost:"mdi:lan-disconnect",monitor_picture:"mdi:image-off-outline",monitor_idle:"mdi:sleep",monitor_error:"mdi:alert-circle-outline",monitor_watch:"mdi:eye-outline",wait_for:"mdi:clock-check-outline"};function fn(l,n){let e=l.device??(n?.kind==="device"?n.device:void 0)??"";return[l.kind,e,l.step??l.index??"",l.check??"",l.hook??"",l.reason??""].join("|")}function _n(l,n,e){if(l.background)return!1;if(n?.kind==="steps")return!0;switch(l.kind){case"device":return e==="start";case"status":case"boot":case"ready":case"delay":case"wait_for":case"started_by":case"monitor_lost":case"monitor_picture":case"monitor_idle":case"monitor_watch":case"check":case"step":case"hook":return!0;case"wait":return l.reason==="delay_after_on";default:return!1}}var Ri={device:"section_device",boot:"section_power",reload:"section_ready",ready:"section_ready",status:"section_state",turn_on:"section_device",turn_off:"section_device",wait:"section_delays",delay:"flow.before",wait_for:"flow.before"},Oi={checks:"section_checks",check:"section_checks",steps:"steps",step:"steps",picture:"section_checks",hook:"section_advanced",hook_wait:"section_advanced",already_on:"section_activity_devices",started_by:"started_by",monitor_lost:"monitor",monitor_picture:"monitor",monitor_idle:"monitor",monitor_error:"monitor"},we=class extends b{constructor(){super();this._reached=-1;this._watched="";this._request=0;this._mode="start",this.details=!0,this._states={},this._detailKinds=["entities","waits"],this._showDetails=!0}connectedCallback(){super.connectedCallback(),this.hass?.callWS({type:"easy_av_control/ui/get"}).then(e=>this._detailKinds=e.flow_details).catch(()=>{})}get _detailsOn(){return this.live?this.details:this._showDetails}_hides(e){return!this._detailsOn&&this._detailKinds.includes(e)}async _setDetailKinds(e){this._detailKinds=e;try{let t=await this.hass.callWS({type:"easy_av_control/ui/flow_details",details:e});this._detailKinds=t.flow_details}catch{}}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._timer),window.clearTimeout(this._statesTimer)}willUpdate(e){if(e.has("activityId")&&e.get("activityId")!==void 0&&(this._from=void 0),this._from!==void 0&&!this.room?.activities?.[this._from]&&(this._from=void 0),this.live){let t=this.live.state==="stopping"?"stop":"start",i=e.get("live");t!==this._mode&&(this._mode=t),(!i||i.state!==this.live.state||i.activity!==this.live.activity)&&((this.live.state==="starting"||this.live.state==="stopping")&&(this._reached=-1),e.set("_mode",void 0))}else if(this.run&&e.has("run")){let t=e.get("run"),i=this.run.activity===this.activityId,s=this.run.state==="starting"||this.run.state==="stopping";if((!t||t.state!==this.run.state||t.activity!==this.run.activity)&&s&&i){this._reached=-1;let o=this.run.state==="stopping"?"stop":"start";o!==this._mode&&(this._mode=o)}}if(["room","roomId","activityId","_mode","_from","from"].some(t=>e.has(t))){window.clearTimeout(this._timer);let i=!(this._flow===void 0&&this._failed===void 0)&&e.has("room")?un:0;this._timer=window.setTimeout(()=>this._load(),i)}}async _load(){let e=++this._request,t=this.live?this.from:this._from;try{let i=await this.hass.callWS({...this.live?{type:"easy_av_control/control/flow",...this.entryId?{entry_id:this.entryId}:{}}:{type:"easy_av_control/config/flow",config:this.room},room:this.roomId,activity:this.activityId,mode:this._mode,...this._mode==="start"&&t?{from:t}:{}});this._loadStates(),e===this._request&&(this._flow=i,this._failed=void 0)}catch(i){e===this._request&&(this._failed=i.message??String(i))}}async _loadStates(){try{this._states=await this.hass.callWS({type:"easy_av_control/control/states",room:this.roomId,...this.entryId?{entry_id:this.entryId}:{},...this.live?{}:{devices:this.room?.devices??{}}})}catch{}}updated(e){if(!e.has("hass")||!this.hass||!this._flow||this._flow.error)return;let t=new Set;for(let s of this._flow.rows){typeof s.entity_id=="string"&&t.add(s.entity_id);for(let o of s.entities??[])t.add(o)}for(let s of Object.values(this._room.devices??{}))s.entity_id&&t.add(s.entity_id);let i=[...t].map(s=>`${s}=${this.hass.states[s]?.state}`).join("|");i!==this._watched&&(this._watched=i,window.clearTimeout(this._statesTimer),this._statesTimer=window.setTimeout(()=>this._loadStates(),300))}get _room(){return this.room??(this._flow&&!this._flow.error?this._flow.room:void 0)??{}}_t(e,t){return T(this.hass?.language,e,t)}_entity(e){let t=String(e??"");return this.hass.states[t]?.attributes.friendly_name||t}_device(e){let t=String(e??""),i=this._room.devices?.[t];return i?.name||(i?.entity_id?this._entity(i.entity_id):"")||t}_activity(e){let t=String(e??"");return this._room.activities?.[t]?.name||t}_list(e){return(e??[]).map(t=>this._entity(t)).join(", ")}_seconds(e){return`${Math.round(Number(e)*10)/10} s`}_duration(e){return e>=120&&e%60===0?`${e/60} min`:this._seconds(e)}_time([e,t]){return e===t?this._seconds(e):`${this._seconds(e).slice(0,-2)}\u2013${this._seconds(t)}`}_text(e){let t=this._device(e.device);switch(e.kind){case"state":return this._t(`flow.state_${e.state}`);case"outlets_on":return this._t("flow.outlets_on",{outlets:this._list(e.entities)});case"outlets_off":return this._t(e.after_status?"flow.outlets_off_status":e.background?"flow.outlets_off_later":"flow.outlets_off",{outlets:this._list(e.entities)});case"outlet_keep":return this._t("flow.outlet_keep",{outlet:this._entity(e.entity_id)});case"hook":return this._t(`flow.${e.hook}`);case"hook_wait":return this._t(`flow.${e.hook}_wait`);case"already_on":return this._t("flow.already_on",{activity:this._activity(e.previous)});case"boot":return this._t("flow.boot",{seconds:this._seconds(e.seconds)});case"reload":return this._t("flow.reload",{entity:this._entity(e.entity_id)});case"ready":{let i=Array.isArray(e.states)?e.states:e.states?[e.states]:[],s={entity:this._entity(e.entity_id),states:i.join(" / "),timeout:this._seconds(e.timeout)};return[e.step?`${e.step}. `:"",this._t(i.length?"flow.ready_state":"flow.ready",s)," ",this._t(`flow.on_timeout_${e.on_timeout}`)].join("")}case"turn_on":case"turn_off":{let i=e.step?`${e.step}. `:"";return e.skip?i+this._t("flow.cannot_switch",{device:t}):e.later?i+this._t("flow.turn_off_later",{device:t,seconds:this._duration(Number(e.later))}):i+this._t(e.reason==="unused"?"flow.turn_off_unused":`flow.${e.kind}`,{device:t})}case"status":return this._t(e.target==="off"?"flow.status_off":"flow.status_on",{device:t,entity:this._entity(e.entity_id),timeout:this._seconds(e.timeout)});case"check":{let i=this._device(e.device);if(e.missing)return this._t("flow.check_missing",{device:i});let s=e.unless??[];return this._t(s.length?"flow.check_unless":"flow.check",{device:i,entity:this._entity(e.entity_id),states:(s.length?s:e.states??[]).join(" / "),timeout:this._seconds(e.timeout)})+(e.on_failure==="stop"?` ${this._t("flow.on_timeout_abort")}`:` ${this._t("flow.check_warn")}`)}case"picture":return this._t("flow.picture",{step:String(e.step??""),entity:this._entity(e.entity_id),states:(e.states??[]).join(" / "),timeout:this._seconds(e.timeout)});case"delay":return this._t("flow.delay",{seconds:this._seconds(e.seconds)});case"monitor_lost":return this._t("flow.monitor_lost",{seconds:this._seconds(e.seconds)});case"monitor_picture":return this._t("flow.monitor_picture",{seconds:this._seconds(e.seconds)});case"monitor_idle":return this._t("flow.monitor_idle",{idle:this._duration(Number(e.seconds)),warning:this._duration(Number(e.warning))});case"monitor_error":return this._t("flow.monitor_error");case"monitor_watch":return this._t(e.mode==="turn_off"?"flow.monitor_watch_off":"flow.monitor_watch",{device:t,grace:this._duration(Number(e.grace)),after:this._duration(Number(e.turn_off_after))});case"started_by":return this._t(this._mode==="stop"?"flow.stopped_by":"flow.started_by",{entity:this._entity(e.entity_id),states:(e.states??[]).join(" / ")});case"wait_for":{let s=(e.waits??[]).map(o=>this._t(o.state==="picture"?"flow.wait_for_picture":"flow.wait_for_on",{device:this._device(o.device)})).join(this._t("flow.and"));return this._t("flow.wait_for",{what:s,timeout:this._seconds(e.timeout)})+" "+this._t(`flow.on_timeout_${e.on_timeout}`)}case"wait":return this._t(e.reason==="delay_after_on"?"flow.wait_on":"flow.wait",{seconds:this._seconds(e.seconds)});case"step":return`${e.step}. ${this._t(`step.${e.step_type}`)}${this._stepValue(e)}`;default:return e.kind}}_stepValue(e){let t=e.data??{},i=[];for(let[s,o]of Object.entries(t))s==="volume_level"?i.push(`${Math.round(Number(o)*100)} %`):s==="brightness_pct"||s==="position"||s==="tilt_position"?i.push(`${o} %`):s==="color_temp_kelvin"?i.push(`${o} K`):s==="transition"?i.push(this._seconds(o)):e.step_type!=="call_action"&&i.push(String(o));return i.length?`: ${i.join(", ")}`:""}_notes(e){let t=[];if(typeof e.condition=="string"&&t.push(this._t(`flow.if.${e.condition}`)),e.kind==="ready"&&e.reload&&t.push(this._t("flow.reload_if_needed")),typeof e.option=="string"&&t.push(this._t("flow.option",{option:e.option})),e.kind==="status"&&Number(e.typical)>0&&t.push(this._t("flow.typical",{seconds:this._seconds(e.typical)})),e.kind==="status"&&Number(e.debounce)>0&&t.push(this._t("flow.debounce",{seconds:this._seconds(e.debounce)})),e.kind==="turn_off"&&Number(e.cooldown)>0&&t.push(this._t("flow.cooldown",{seconds:this._seconds(e.cooldown)})),Array.isArray(e.already_on)&&e.already_on.length&&t.push(this._t("flow.outlets_already_on",{outlets:this._list(e.already_on)})),Array.isArray(e.unless_rooms)&&e.unless_rooms.length&&t.push(this._t("flow.unless_rooms",{rooms:e.unless_rooms.join(", ")})),e.kind==="hook"){let i=e.actions??[];t.push(this._t("flow.parallel")),i.length&&t.push(i.join(", "))}return t}_call(e){if(typeof e.action!="string"||e.kind==="hook")return;let t=e.entities?this._list(e.entities):e.entity_id?this._entity(e.entity_id):"";return t?`${e.action} \u2192 ${t}`:e.action}_target(e,t){let i=e.device??(t?.kind==="device"?t.device:void 0);if(t?.kind==="device"&&i&&Ri[e.kind])return{device:i,panel:Ri[e.kind]};if(t?.kind==="steps"&&Pt.has(e.kind))return{panel:"steps"};if(e.kind==="monitor_watch"&&i)return{device:i,panel:"section_monitor"};if(Oi[e.kind])return{panel:Oi[e.kind]};if(e.kind==="device"&&i)return{device:i,panel:"section_device"}}_moves(e,t){let i=new Map;if(this.live||this._mode==="monitor")return i;let s=e.map((o,a)=>({row:o,i:a})).filter(({row:o})=>!o.background&&(this._mode==="start"?o.kind==="device":o.kind==="turn_off"&&o.reason!=="unused"&&!o.step));return s.forEach(({row:o,i:a},c)=>i.set(a,{what:"device",device:String(o.device),index:c,first:c===0,last:c===s.length-1})),e.forEach((o,a)=>{let c=t[a];if(c?.kind==="steps"&&o.step&&!i.has(a)){let h=Number(o.step)-1;i.set(a,{what:"step",index:h,first:h===0,last:h===Number(c.count)-1})}else if(o.kind==="check"&&c?.kind==="checks"){let h=Number(o.check)-1;i.set(a,{what:"check",index:h,first:h===0,last:h===Number(c.count)-1})}}),i}_moveButtons(e){let t=i=>this.dispatchEvent(new CustomEvent("flow-move",{detail:{...e,dir:i,mode:this._mode},bubbles:!0,composed:!0}));return r`<button class="ltek-act move" title=${this._t("move_earlier")} aria-label=${this._t("move_earlier")} ?disabled=${e.first} @click=${()=>t(-1)}>
        <ha-icon icon="mdi:arrow-up"></ha-icon></button
      ><button class="ltek-act move" title=${this._t("move_later")} aria-label=${this._t("move_later")} ?disabled=${e.last} @click=${()=>t(1)}>
        <ha-icon icon="mdi:arrow-down"></ha-icon>
      </button>`}_renderRow(e,t,i,s,o,a){let c=this.live?void 0:this._target(e,s),h=fn(e,s),d=this._hides("notes")?[]:this._notes(e),u=this._hides("entities")?void 0:this._call(e),m=ee.has(e.kind),f=[t?"nested":"",m?"header":"",e.kind,o?`s-${o}`:""],_=e.kind==="device"&&e.device?this._states[e.device]:void 0;return r`<li class=${f.join(" ")}>
      <span class="time"
        >${o==="done"?r`<ha-icon class="mark" icon="mdi:check"></ha-icon>`:o==="active"?r`<ha-icon class="mark spin" icon="mdi:loading"></ha-icon>`:o==="failed"?r`<ha-icon class="mark" icon="mdi:close"></ha-icon>`:i?this._time(e.at):""}</span
      >
      ${m?r`<span class="index">${e.kind==="device"?e.index:e.kind==="checks"?"\u2713":"\u2261"}</span>`:r`<ha-icon class="icon" .icon=${mn[e.kind]??"mdi:circle-small"}></ha-icon>`}
      <span class="body">
        <span class="what"
          >${e.kind==="device"?r`${this._device(e.device)}${_?.value?r`<span class="state-chip r-${Ei(_.group)}" title=${_.value}
                    >${["on","off","starting","stopping","error"].includes(_.group)?this._t(`flow.group.${_.group}`):_.value}</span
                  >`:p}`:e.kind==="steps"?this._t("flow.steps"):e.kind==="checks"?this._t("flow.checks"):this._text(e)}</span
        >
        ${e.kind==="device"&&!this._hides("entities")?r`<span class="call">${e.entity_id}</span>`:p}
        ${u?r`<span class="call">${u}</span>`:p}
        ${d.length?r`<span class="notes">${d.map(g=>r`<span class="note">${g}</span>`)}</span>`:p}
      </span>
      ${this.live?p:r`<span class="acts"
            >${a?this._moveButtons(a):p}${c?r`<button
                  class="ltek-act edit ${this.editing===h?"on":""}"
                  title=${this._t("flow.edit")}
                  aria-label=${this._t("flow.edit")}
                  @click=${()=>this.dispatchEvent(new CustomEvent("flow-edit",{detail:{...c,key:h},bubbles:!0,composed:!0}))}
                >
                  <ha-icon icon="mdi:pencil-outline"></ha-icon>
                </button>`:p}${_n(e,s,this._mode)?r`<button
                  class="ltek-del"
                  title=${this._t("flow.delete")}
                  aria-label=${this._t("flow.delete")}
                  @click=${()=>this.dispatchEvent(new CustomEvent("flow-delete",{detail:{row:e,header:s?.kind,device:e.device??s?.device,mode:this._mode},bubbles:!0,composed:!0}))}
                >
                  <ha-icon icon="mdi:trash-can-outline"></ha-icon>
                </button>`:p}</span
          >`}
    </li>
    ${!this.live&&this.editing===h?r`<li class="inline"><slot name="edit"></slot></li>`:p}`}_watchedRun(){let e=this.run;if(!(!e||e.activity!==this.activityId)&&(this._mode==="start"&&["starting","active","error"].includes(e.state)||this._mode==="stop"&&e.state==="stopping"))return e}_renderRows(e){let t=ye(e),i,s=this.live??this._watchedRun();if(s&&["starting","stopping","active","error"].includes(s.state)){i=Si(e,s,this._reached);let d=i.lastIndexOf("active");d>this._reached&&!ee.has(e[d].kind)&&(this._reached=d)}let o=e.filter(d=>d.background),a=this._moves(e,t),c="",h=e.flatMap((d,u)=>{if(d.background||!this._detailsOn&&Ct(d,this._detailKinds))return[];let m=this._time(d.at),f=m!==c||d.kind==="state";return c=m,[this._renderRow(d,t[u]!==void 0,f,t[u],i?.[u],a.get(u))]});return r`<ol class="flow">${h}</ol>
      ${o.length?r`<h4>${this._t("flow.background")}</h4>
            <ol class="flow">${o.filter(d=>this._detailsOn||!Ct(d,this._detailKinds)).map(d=>this._renderRow(d,!1,!0,void 0,i?.[e.indexOf(d)]))}</ol>`:p}`}render(){if(this.live)return r`${this._renderBody()}`;let e=Object.entries(this.room.activities??{}).filter(([t])=>t!==this.activityId);return r`
      <details class="ltek-sub options">
        <summary><ha-icon icon="mdi:tune-variant"></ha-icon>${this._t("flow.options")}</summary>
        <div class="ltek-sub-body">
          <p class="ltek-hint">${this._t("flow.options_hint")}</p>
          ${Ti.map(t=>r`<label class="check"
              ><input
                type="checkbox"
                .checked=${this._detailKinds.includes(t)}
                @change=${i=>{let s=i.target.checked;this._setDetailKinds(s?[...this._detailKinds,t]:this._detailKinds.filter(o=>o!==t))}}
              />${this._t(`flow.detail_${t}`)}</label
            >`)}
        </div>
      </details>
      <div class="modes" role="tablist">
        ${["start","stop","monitor"].map(t=>r`<button
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
            </select>`:p}
      </div>
      ${this._renderBody()}
    `}_renderBody(){if(this._failed)return r`<p class="error">${this._t("flow.failed",{error:this._failed})}</p>`;let e=this._flow;if(!e)return r`<p class="hint">${this._t("loading")}</p>`;if(e.error){let a=e.error.path.join(".");return r`<p class="error">
        ${this._t("flow.invalid",{error:a?`${a}: ${e.error.message}`:e.error.message})}
      </p>`}let[t,i]=e.done,s=e.rows.filter(a=>a.background).map(a=>a.at[0]),o=this._mode==="monitor"?this._t("flow.summary_monitor"):this._mode==="start"?this._t(t===i?"flow.summary_start_fixed":"flow.summary_start",{min:this._seconds(t),max:this._seconds(i)}):this._t(s.length?"flow.summary_stop_cut":"flow.summary_stop",{seconds:this._seconds(Math.max(0,...s))});return r`${this.live?p:r`<div class="adder"><slot name=${`add-${this._mode}`}></slot></div>`}
      ${this._renderRows(e.rows)}
      ${this._detailsOn?r`<p class="summary">${o}</p>`:p}`}};we.properties={hass:{attribute:!1},room:{attribute:!1},roomId:{attribute:!1},activityId:{attribute:!1},_mode:{state:!0},_from:{state:!0},_flow:{state:!0},_failed:{state:!0},entryId:{attribute:!1},live:{attribute:!1},run:{attribute:!1},from:{attribute:!1},details:{type:Boolean},editing:{attribute:!1},_states:{state:!0},_detailKinds:{state:!0},_showDetails:{state:!0}},we.styles=[$,A,x,w`
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
      /* Yellow that also shows on the light theme: a deeper yellow with a faint outline */
      color: #f5b800;
      border-color: currentColor;
      filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.5));
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
  `];customElements.get("easy-av-control-flow")||customElements.define("easy-av-control-flow",we);var ke=class extends b{constructor(){super(...arguments);this._loading=!1}setConfig(e){this._config=e}updated(){this.hass&&this._rooms===void 0&&!this._loading&&(this._loading=!0,this.hass.callWS({type:"easy_av_control/control/rooms"}).then(e=>this._rooms=e).catch(()=>this._rooms=[]).finally(()=>this._loading=!1))}_schema(){let e=(this._rooms??[]).map(i=>i.room);return[{name:"room",required:!0,selector:{select:{mode:"dropdown",options:(this._rooms??[]).map(i=>({value:e.filter(s=>s===i.room).length>1?`${i.entry_id}/${i.room}`:i.room,label:i.name}))}}},{name:"name",selector:{text:{}}},{name:"show_flow",selector:{boolean:{}}},{name:"flow_details",selector:{boolean:{}}}]}render(){if(!this.hass||!this._config)return p;let e={show_flow:!0,...this._config,room:this._config.entry_id?`${this._config.entry_id}/${this._config.room}`:this._config.room},t=(this._rooms??[]).some(s=>s.room===this._config.room);this._rooms&&!t&&this._config.room&&(e.room=this._config.room);let i=s=>Q(this.hass?.language,s);return r`<details class="ltek-sec" open>
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
        <a class="ltek-star" href=${J} target="_blank" rel="noopener">${i("editor.star")}</a>
        <a class="ltek-issue" href="${J}/issues" target="_blank" rel="noopener">${i("editor.report")}</a>
      </div>`}_valueChanged(e){e.stopPropagation();let t={...e.detail.value},i={...this._config,...t},s=String(t.room??"");if(s.includes("/")){let[o,a]=s.split("/",2);i.entry_id=o,i.room=a}else delete i.entry_id;i.name||delete i.name,i.show_flow!==!1&&delete i.show_flow,i.flow_details||delete i.flow_details,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}};ke.properties={hass:{attribute:!1},_config:{state:!0},_rooms:{state:!0}},ke.styles=[$,x,w`
    :host {
      display: block;
    }
  `];customElements.get("easy-av-control-card-editor")||customElements.define("easy-av-control-card-editor",ke);function te(l,n){let e=`command.${l}`,t=n(e);if(t!==e)return t;let i=l.replace(/[_-]+/g," ").trim();return i.charAt(0).toUpperCase()+i.slice(1)}var gn=new Set(["off","standby","unavailable","unknown"]);function ji(l,n){if(!l||gn.has(l.state))return;let e=l.attributes,t=v=>typeof e[v]=="string"&&e[v]?e[v]:void 0,i=v=>typeof e[v]=="number"?e[v]:void 0,s=t("app_name"),o=t("media_title")??s;if(!o)return;let a=i("media_season")??t("media_season"),c=i("media_episode")??t("media_episode"),h=t("media_series_title"),d=h&&(a!==void 0||c!==void 0)?`${h} \xB7 ${[a!==void 0?`S${a}`:"",c!==void 0?`E${c}`:""].filter(Boolean).join(" ")}`:h??t("media_artist")??t("media_album_name"),u=l.state==="playing",m=i("media_duration"),f=m!==void 0&&m>0?m:void 0,_=i("media_position"),g=t("media_position_updated_at");return _!==void 0&&u&&g&&!Number.isNaN(Date.parse(g))&&(_+=(n-Date.parse(g))/1e3),_!==void 0&&f!==void 0&&(_=Math.max(0,Math.min(f,_))),{title:o,app:o===s?void 0:s,subtitle:d,picture:t("entity_picture"),playing:u,duration:f,position:f!==void 0?_:void 0}}function $e(l){let n=Math.floor(l),e=Math.floor(n/3600),t=Math.floor(n%3600/60),i=String(n%60).padStart(2,"0");return e?`${e}:${String(t).padStart(2,"0")}:${i}`:`${t}:${i}`}function Di(l,n){let e=Math.max(0,Math.ceil((Date.parse(l)-n)/1e3));return e>=60?$e(e):`${e} s`}function zi(l,n,e){let t=l.names.length?l.names.join(", "):l.outlet;return{text:e("cooling.text",{names:t}),time:e(l.status?"cooling.time_status":"cooling.time",{time:Di(l.until,n)})}}function Pi(l,n,e){if(!l)return;let t=l.name??"",i={step:String(l.step??""),steps:String(l.steps??"")},s;switch(l.kind){case"step":{let c=e(`step.${l.step_type}`);s=e("doing.step",{...i,what:t?`${c} (${t})`:c});break}case"wait":s=e("doing.wait",i);break;case"hooks":s=e(`doing.hooks_${l.hook}`);break;case"status":s=l.value?e(`doing.status_${l.target==="off"?"off":"on"}_value`,{name:t,value:l.value}):e(`doing.status_${l.target==="off"?"off":"on"}`,{name:t});break;default:s=e(`doing.${l.kind}`,{name:t})}if(!l.until)return{text:s};let o=Di(l.until,n),a=l.kind==="ready"||l.kind==="status";return{text:s,time:e(a?"doing.at_most":"doing.left",{time:o})}}var Fe=class{constructor(){this.originX=0;this.originY=0;this.startX=0;this.startY=0;this.startTime=0;this.moved=!1}start(n,e,t){this.originX=this.startX=n,this.originY=this.startY=e,this.startTime=t,this.moved=!1}move(n,e){Math.hypot(n-this.startX,e-this.startY)>10&&(this.moved=!0);let t=[];for(;;){let i=n-this.originX,s=e-this.originY;if(Math.max(Math.abs(i),Math.abs(s))<40)return t;Math.abs(i)>=Math.abs(s)?(t.push(i>0?"right":"left"),this.originX+=Math.sign(i)*40,this.originY=e):(t.push(s>0?"down":"up"),this.originY+=Math.sign(s)*40,this.originX=n)}}end(n,e,t){return Math.hypot(n-this.startX,e-this.startY)>10&&(this.moved=!0),!this.moved&&t-this.startTime<=500}};function Lt(l,n){return`easy-av-control-touchpad:${l}:${n}`}function Ci(l,n){return l==="on"?!0:l==="off"?!1:n}var Ke="easy_av_control",Mt={volume_up:"mdi:volume-plus",volume_down:"mdi:volume-minus",mute:"mdi:volume-off",channel_up:"mdi:chevron-up",channel_down:"mdi:chevron-down",play_pause:"mdi:play-pause",play:"mdi:play",pause:"mdi:pause",stop:"mdi:stop",next:"mdi:skip-next",previous:"mdi:skip-previous",up:"mdi:chevron-up",down:"mdi:chevron-down",left:"mdi:chevron-left",right:"mdi:chevron-right",back:"mdi:arrow-u-left-top",menu:"mdi:menu",home:"mdi:home-outline",info:"mdi:information-outline",guide:"mdi:television-guide",exit:"mdi:close",select_source:"mdi:apps"},vn=["back","home","menu","info","guide","exit"],bn=["previous","play_pause","play","pause","stop","next"],yn=new Set(["volume_up","volume_down","up","down","left","right"]),wn=400,kn=200;function Li(l){return`easy-av-control-settings:${l}`}var $n=3e4,xn={idle:"mdi:power",starting:"mdi:timer-sand",active:"mdi:power",stopping:"mdi:timer-sand",error:"mdi:alert-circle-outline"},Z=class extends b{constructor(){super();this._padChoices=new Map;this._settingsOpen=new Map;this._settingDrafts=new Map;this._view=null,this._loaded=!1}static getConfigElement(){return document.createElement("easy-av-control-card-editor")}static async getStubConfig(e){try{return{room:(await e.callWS({type:`${Ke}/control/rooms`}))[0]?.room??""}}catch{return{room:""}}}setConfig(e){if(!e||typeof e.room!="string")throw new Error("room is required");let t=e.room!==this._config?.room||e.entry_id!==this._config?.entry_id;this._config=e,t&&this._resubscribe()}getCardSize(){return this._view?.remote?8:3}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._pressEnd(!1),window.clearInterval(this._tickTimer),this._tickTimer=void 0,this._unsubscribeNow()}willUpdate(e){e.has("demoView")&&this.demoView&&(this._config={type:"custom:easy-av-control-card",room:this.demoView.room},this._view=this.demoView,this._loaded=!0)}updated(e){let t=this._nowPlaying(),i=t?.playing===!0&&t.duration!==void 0||!!this._view?.current?.until||!!this._view?.cooling?.length;i&&this._tickTimer===void 0?this._tickTimer=window.setInterval(()=>this.requestUpdate(),1e3):!i&&this._tickTimer!==void 0&&(window.clearInterval(this._tickTimer),this._tickTimer=void 0),e.has("hass")&&!this._unsubscribe&&this._retryTimer===void 0&&this._subscribe()}_subscribe(){if(this.demoView||!this.hass||!this._config?.room||this._unsubscribe||!this.isConnected)return;let e={type:`${Ke}/control/subscribe`,room:this._config.room};this._config.entry_id&&(e.entry_id=this._config.entry_id);let t=this.hass.connection.subscribeMessage(i=>{this._unsubscribe===t&&(i?.state==="starting"&&this._view?.state!=="starting"&&(this._from=this._lastActive&&this._lastActive!==i.activity?this._lastActive:void 0),i?.state==="active"&&i.activity&&(this._lastActive=i.activity),i?.state==="idle"&&(this._lastActive=void 0),this._view=i,this._loaded=!0,this._subscribeError=void 0)},e);this._unsubscribe=t,t.catch(i=>{this._unsubscribe===t&&(this._subscribeError=i?.message??String(i),this._loaded=!0,this._unsubscribe=void 0,this._retryTimer=window.setTimeout(()=>{this._retryTimer=void 0,this._subscribe()},$n))})}_unsubscribeNow(){window.clearTimeout(this._retryTimer),this._retryTimer=void 0;let e=this._unsubscribe;this._unsubscribe=void 0,e?.then(t=>t()).catch(()=>{})}_resubscribe(){this._unsubscribeNow(),this._view=null,this._loaded=!1,this._subscribe()}_t(e,t){return Q(this.hass?.language,e,t)}_call(e,t={}){if(!(!this.hass||!this._view)){if(this._haptic(),this.demoView){this.dispatchEvent(new CustomEvent("preview-call",{detail:{service:e,data:t}}));return}this.hass.callService(Ke,e,{room:this._view.room,...t}).catch(i=>this._toast(i?.message??String(i)))}}_send(e,t={}){this._call("send_command",{command:e,...t})}_haptic(){this.dispatchEvent(new CustomEvent("haptic",{detail:"light",bubbles:!0,composed:!0}))}_toast(e){this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:e},bubbles:!0,composed:!0}))}_pressStart(e,t,i={}){if(e.button!==0)return;this._pressEnd(!1);let s={command:t,extra:i,sent:!1};this._press=s,yn.has(t)&&(this._repeatTimer=window.setTimeout(()=>{s.sent=!0,this._send(t,i),this._repeatTimer=window.setInterval(()=>this._send(t,i),kn)},wn))}_pressEnd(e){let t=this._press;this._press=void 0,this._stopRepeat(),e&&t&&!t.sent&&this._send(t.command,t.extra)}_stopRepeat(){this._repeatTimer!==void 0&&(window.clearTimeout(this._repeatTimer),window.clearInterval(this._repeatTimer),this._repeatTimer=void 0)}_keySend(e,t,i={}){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._send(t,i))}render(){if(!this._config?.room)return r`<ha-card><div class="message">${this._t("no_room")}</div></ha-card>`;if(!this._loaded)return r`<ha-card><div class="message">${this._t("loading")}</div></ha-card>`;let e=this._view;return e?r`<ha-card>
      ${this._renderHeader(e)} ${this._renderStatus(e)} ${this._renderFlow(e)} ${this._renderNowPlaying()}
      ${this._renderActivities(e)}
      ${e.remote?this._renderRemote(e):p}
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
        <ha-icon .icon=${xn[e.state]??"mdi:power"}></ha-icon>
      </button>
    </div>`}_renderFlow(e){if(this._config?.show_flow===!1||this.demoView)return p;let t=e.activity??e.default_activity??e.activities[0]?.id;if(!t)return p;let i=e.state==="starting"||e.state==="stopping",s=this._flowOpen??i,o=this._flowDetails??this._config?.flow_details===!0;return r`<div class="flow-bar">
        <button class="chip ${s?"on":""}" @click=${()=>this._flowOpen=!s}>
          <ha-icon icon="mdi:sitemap-outline"></ha-icon>${this._t("flow.show")}
        </button>
        ${s?r`<button class="chip ${o?"on":""}" @click=${()=>this._flowDetails=!o}>
              <ha-icon icon=${o?"mdi:eye-outline":"mdi:eye-off-outline"}></ha-icon>${this._t("flow.details")}
            </button>`:p}
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
          ></easy-av-control-flow>`:p}`}_renderStatus(e){let t=e.state==="starting"||e.state==="stopping",[i,s]=e.progress,o=s>0?Math.round(i/s*100):0,a=t?Pi(e.current,Date.now(),(c,h)=>this._t(c,h)):void 0;return r`
      ${t?r`<div
            class="progress"
            role="progressbar"
            aria-label=${this._t(`state.${e.state}`)}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow=${o}
          >
            <div style="width: ${e.state==="starting"?o:100}%"></div>
          </div>`:p}
      ${a?r`<div class="doing" aria-live="polite">
            <span class="doing-text">${a.text}</span>
            ${a.time?r`<span class="doing-time">${a.time}</span>`:p}
          </div>`:p}
      ${(e.cooling??[]).map(c=>{let{text:h,time:d}=zi(c,Date.now(),(u,m)=>this._t(u,m));return r`<div class="doing cooling">
          <span class="doing-text">${h}</span><span class="doing-time">${d}</span>
        </div>`})}
      ${e.state==="error"&&e.error?r`<div class="message error">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>${e.error}
          </div>`:p}
      ${e.warnings.length&&e.state!=="idle"?r`<details class="warnings">
            <summary>${this._t("warnings")} (${e.warnings.length})</summary>
            <ul>
              ${e.warnings.map(c=>r`<li>${c}</li>`)}
            </ul>
          </details>`:p}
    `}_nowPlaying(){let e=this._view?.remote?.media;return ji(e?this.hass?.states[e]:void 0,Date.now())}_renderNowPlaying(){let e=this._nowPlaying();if(!e)return p;let t=[e.app,e.playing?void 0:this._t("now.paused")].filter(Boolean).join(" \xB7 ");return r`<div class="now">
      ${e.picture?r`<img
            class="art"
            src=${e.picture}
            alt=""
            @error=${i=>i.target.style.display="none"}
          />`:p}
      <div class="meta">
        ${t?r`<div class="now-top">${t}</div>`:p}
        <div class="now-title">${e.title}</div>
        ${e.subtitle?r`<div class="now-sub">${e.subtitle}</div>`:p}
        ${e.duration!==void 0&&e.position!==void 0?r`<div class="now-progress" role="progressbar" aria-valuemin="0"
                aria-valuemax=${Math.round(e.duration)} aria-valuenow=${Math.round(e.position)}>
                <div style="width: ${e.position/e.duration*100}%"></div>
              </div>
              <div class="now-time">
                <span>${$e(e.position)}</span><span>${$e(e.duration)}</span>
              </div>`:p}
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
    </div>`}_renderRemote(e){let{groups:t,buttons:i}=e.remote,s=t.navigation,o=s?vn.filter(h=>s.commands.includes(h)):[],a=s?Ci(this._padChoice(e),s.touchpad===!0):!1,c=t.transport?bn.filter(h=>t.transport.commands.includes(h)):[];return c.includes("play_pause")&&(c=c.filter(h=>h!=="play"&&h!=="pause")),r`<div class="remote">
      ${t.volume||s||t.channels?r`<div class="main ${s?"":"no-nav"}">
            ${t.volume?this._renderVolumeRocker(t.volume):s?r`<div></div>`:p}
            ${s?a?this._renderTouchpad(s):this._renderDpad(s):p}
            ${t.channels?this._renderChannelRocker(t.channels):s?r`<div></div>`:p}
          </div>`:p}
      ${t.volume?.commands.includes("volume_set")?this._renderSlider(t.volume):p}
      ${s?r`<div class="row">
            ${o.map(h=>this._key(h))}${this._renderPadSwitch(e,a)}
          </div>`:p}
      ${c.length?r`<div class="row">${c.map(h=>this._key(h))}</div>`:p}
      ${i.length?r`<div class="buttons">${i.map(h=>this._customButton(h))}</div>`:p}
      ${e.remote.settings?.length?this._renderSettings(e,e.remote.settings):p}
    </div>`}_settingsShown(e){let t=Li(e);if(this._settingsOpen.has(t))return this._settingsOpen.get(t);try{return window.localStorage.getItem(t)==="open"}catch{return!1}}_toggleSettings(e){let t=Li(e),i=!this._settingsShown(e);this._settingsOpen.set(t,i);try{window.localStorage.setItem(t,i?"open":"closed")}catch{}this.requestUpdate()}_renderSettings(e,t){let i=this._settingsShown(e.room);return r`<div class="settings">
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
            ${t.map((s,o)=>r`${o===0||t[o-1].device!==s.device?r`<span class="setting-device">${this._settingDevice(s)}</span>`:p}${this._renderSetting(s)}`)}
          </div>`:p}
    </div>`}_renderSetting(e){if(e.setting==="entity")return this._renderEntitySetting(e);let t=this.hass?.states[e.entity_id],i=e.attribute?t?.attributes[e.attribute]:void 0,s=i==null?void 0:String(i);return this._settingRow(e,this._t(`setting.${e.setting}`),this._settingSelect(e,this._t(`setting.${e.setting}`),s,e.options))}_settingDevice(e){return e.name||this.hass?.states[e.device_entity_id]?.attributes.friendly_name||e.device}_settingRow(e,t,i){return r`<div class="setting">
      <span class="setting-name">${t}</span>
      ${i}
    </div>`}_settingSelect(e,t,i,s,o=!1){let a=i!==void 0&&!s.includes(i)?[i,...s]:s;return r`<select
      aria-label=${`${t}, ${this._settingDevice(e)}`}
      .value=${D(i??"")}
      ?disabled=${o||!a.length}
      @change=${c=>{let h=c.target.value;h&&h!==i&&this._send(e.command,{device:e.device,value:h})}}
    >
      ${i===void 0?r`<option value="" disabled>–</option>`:p}
      ${a.map(c=>r`<option value=${c} ?selected=${c===i}>${c}</option>`)}
    </select>`}_renderEntitySetting(e){let t=this.hass?.states[e.entity_id],i=e.label||t?.attributes.friendly_name||e.entity_id,s=!t||t.state==="unavailable"||t.state==="unknown",o=e.entity_id.split(".")[0];if(o==="number"||o==="input_number"){let c=Number(t?.attributes.min??0),h=Number(t?.attributes.max??100),d=Number(t?.attributes.step??1),m=this._settingDrafts.get(e.entity_id)??(s?void 0:Number(t.state)),f=m===void 0||Number.isNaN(m)?"\u2013":`${c<0&&m>0?"+":""}${m}`;return this._settingRow(e,i,r`<span class="setting-range">
          <input
            type="range"
            aria-label=${`${i}, ${this._settingDevice(e)}`}
            min=${c}
            max=${h}
            step=${d}
            .value=${D(String(m??c))}
            ?disabled=${s}
            @input=${_=>{this._settingDrafts.set(e.entity_id,Number(_.target.value)),this.requestUpdate()}}
            @change=${_=>{this._settingDrafts.delete(e.entity_id),this._send(e.command,{device:e.device,value:Number(_.target.value)})}}
          />
          <span class="value">${f}</span>
        </span>`)}if(o==="select"||o==="input_select"){let c=Array.isArray(t?.attributes.options)?t.attributes.options.map(String):[];return this._settingRow(e,i,this._settingSelect(e,i,s?void 0:t.state,e.options.length?e.options:c,s))}let a=t?.state==="on";return this._settingRow(e,i,r`<button
        class="key toggle ${a?"active":""}"
        aria-label=${`${i}, ${this._settingDevice(e)}`}
        aria-pressed=${a?"true":"false"}
        ?disabled=${s}
        @click=${()=>this._send(e.command,{device:e.device,value:a?"off":"on"})}
      >
        ${this._t(a?"toggle.on":"toggle.off")}
      </button>`)}_key(e,t="key",i,s){let o=te(e,a=>this._t(a));return r`<button
      class=${t}
      title=${o}
      aria-label=${o}
      aria-pressed=${s===void 0?p:String(s)}
      @pointerdown=${a=>this._pressStart(a,e)}
      @pointerup=${()=>this._pressEnd(!0)}
      @pointerleave=${()=>this._pressEnd(!1)}
      @pointercancel=${()=>this._pressEnd(!1)}
      @keydown=${a=>this._keySend(a,e)}
      @contextmenu=${a=>a.preventDefault()}
    >
      ${i??r`<ha-icon .icon=${Mt[e]??"mdi:circle-small"}></ha-icon>`}
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
    </div>`}_padChoice(e){if(!e.activity)return null;let t=Lt(e.room,e.activity);if(this._padChoices.has(t))return this._padChoices.get(t);try{return window.localStorage.getItem(t)}catch{return null}}_renderPadSwitch(e,t){let i=this._t(t?"pad.show_arrows":"pad.show_touchpad");return r`<button
      class="key pad-switch"
      title=${i}
      aria-label=${i}
      @click=${()=>{if(!e.activity)return;let s=Lt(e.room,e.activity),o=t?"off":"on";this._padChoices.set(s,o);try{window.localStorage.setItem(s,o)}catch{}this.requestUpdate()}}
    >
      <ha-icon .icon=${t?"mdi:arrow-all":"mdi:gesture-tap"}></ha-icon>
    </button>`}_renderTouchpad(e){let t=s=>e.commands.includes(s),i={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right",Enter:"ok"," ":"ok"};return r`<div
      class="touchpad"
      role="group"
      tabindex="0"
      aria-label=${this._t("touchpad")}
      title=${this._t("touchpad")}
      @pointerdown=${s=>{s.button===0&&(s.currentTarget.setPointerCapture(s.pointerId),this._swipe=new Fe,this._swipe.start(s.clientX,s.clientY,s.timeStamp))}}
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
    </div>`}_customButton(e){let t=e.name??te(e.command,s=>this._t(s)),i={};return e.device&&(i.device=e.device),e.value!==null&&e.value!==void 0&&(i.value=e.value),r`<button
      class="custom"
      title=${t}
      @pointerdown=${s=>this._pressStart(s,e.command,i)}
      @pointerup=${()=>this._pressEnd(!0)}
      @pointerleave=${()=>this._pressEnd(!1)}
      @pointercancel=${()=>this._pressEnd(!1)}
      @keydown=${s=>this._keySend(s,e.command,i)}
    >
      ${e.icon||Mt[e.command]?r`<ha-icon .icon=${e.icon??Mt[e.command]}></ha-icon>`:p}
      <span>${t}</span>
    </button>`}};Z.properties={hass:{attribute:!1},demoView:{attribute:!1},_flowOpen:{state:!0},_flowDetails:{state:!0},_config:{state:!0},_view:{state:!0},_loaded:{state:!0},_subscribeError:{state:!0},_volumeDraft:{state:!0}},Z.styles=w`
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
  `;customElements.get("easy-av-control-card")||customElements.define("easy-av-control-card",Z);function An(l,n){let e=l.entities?.[n]?.device_id,i=(e?l.devices?.[e]:void 0)?.identifiers?.find(([s])=>s===Ke);return i?i[1]:null}var Ue=window;Ue.customCards=Ue.customCards??[];Ue.customCards.some(l=>l.type==="easy-av-control-card")||Ue.customCards.push({type:"easy-av-control-card",name:"Easy AV Control Remote",description:"Remote control for an Easy AV Control room",preview:!0,documentationURL:"https://github.com/Ltek/easy-av-control#the-card",getEntitySuggestion:(l,n)=>{let e=An(l,n);return e?{config:{type:"custom:easy-av-control-card",room:e}}:null}});var It=class extends Z{};customElements.get("easy-av-control-preview-card")||customElements.define("easy-av-control-preview-card",It);var Sn=400,xe=class extends b{constructor(){super(...arguments);this._request=0}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._timer)}willUpdate(e){if(e.has("activityId")&&(this._pressed=void 0),["room","roomId","activityId"].some(t=>e.has(t))){window.clearTimeout(this._timer);let t=this._preview===void 0&&this._failed===void 0;this._timer=window.setTimeout(()=>this._load(),t?0:Sn)}}async _load(){let e=++this._request;try{let t=await this.hass.callWS({type:"easy_av_control/config/remote",room:this.roomId,config:this.room,activity:this.activityId});e===this._request&&(this._preview=t,this._failed=void 0)}catch(t){e===this._request&&(this._failed=t.message??String(t))}}_t(e,t){return T(this.hass?.language,e,t)}_entity(e){let t=String(e??"");return this.hass.states[t]?.attributes.friendly_name||t}_device(e){let t=String(e??""),i=this.room.devices?.[t];return i?.name||(i?.entity_id?this._entity(i.entity_id):"")||t}_button(e,t){let[i,s]=t.split("|"),o=e.remote?.buttons.find(c=>c.command===i&&(c.device??"")===s);if(o?.name)return o.name;let a=e.remote?.settings?.find(c=>c.command===i&&c.device===s);return a?.setting==="entity"?a.label||this._entity(a.entity_id):te(i,c=>this._t(c))}_onCall(e){let{service:t,data:i}=e.detail;t==="send_command"&&(this._pressed=`${i.command}|${i.device??""}`)}_describe(e){let t=e.device?this._device(e.device):this._t("preview.this_activity");switch(e.via){case"media_player":case"entity":return{to:t,how:`${e.action} \u2192 ${this._entity(e.entity_id)}`};case"remote":return{to:t,how:`remote.send_command "${e.key}" \u2192 ${this._entity(e.entity_id)}`};case"device_commands":return{to:t,how:this._t("preview.device_commands",{actions:(e.actions??[]).join(", ")})};case"activity_commands":return{to:t,how:this._t("preview.activity_commands",{actions:(e.actions??[]).join(", ")})};default:return{to:t,how:e.device?this._t("preview.unknown_on_device",{device:t}):this._t("preview.unknown")}}}_renderPressed(e,t){let i=this._pressed?t[this._pressed]:void 0;if(!this._pressed||!i)return r`<p class="pressed hint">${this._t("preview.tap")}</p>`;let{to:s,how:o}=this._describe(i);return r`<p class="pressed ${i.via?"":"bad"}">
      <span class="what">${this._button(e,this._pressed)} → ${s}</span>
      <span class="how">${o}</span>
      ${i.ready?r`<span class="note">${this._t("preview.ready")}</span>`:p}
    </p>`}_renderRoutes(e){return r`<h4>${this._t("preview.groups")}</h4>
      <ul class="routes">
        ${e.map(t=>{let i=t.mode==="hidden"?this._t("preview.hidden"):t.device?`${this._device(t.device)} (${this._t(`preview.mode_${t.mode}`)})`:this._t("preview.no_device"),s=t.commands.length?t.commands.map(o=>te(o,a=>this._t(a))).join(", "):t.mode==="hidden"?"":t.device?this._t("preview.no_keys",{device:this._device(t.device)}):"";return r`<li class=${t.commands.length?"":"off"}>
            <span class="group">${this._t(`field.${t.group}`)}</span>
            <span class="where">${i}</span>
            ${s?r`<span class="keys">${s}</span>`:p}
          </li>`})}
      </ul>`}render(){if(this._failed)return r`<p class="error">${this._t("flow.failed",{error:this._failed})}</p>`;let e=this._preview;if(!e)return r`<p class="hint">${this._t("loading")}</p>`;if(e.error){let a=e.error.path.join(".");return r`<p class="error">
        ${this._t("flow.invalid",{error:a?`${a}: ${e.error.message}`:e.error.message})}
      </p>`}let{view:t,targets:i,routes:s}=e,o=Object.entries(i).filter(([,a])=>!a.via);return r`<div class="layout">
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
                ${o.map(([a,c])=>r`<li>${this._button(t,a)}: ${this._describe(c).how}</li>`)}
              </ul>
            </div>`:p}
        ${this._renderRoutes(s)}
      </div>
    </div>`}};xe.properties={hass:{attribute:!1},room:{attribute:!1},roomId:{attribute:!1},activityId:{attribute:!1},_preview:{state:!0},_failed:{state:!0},_pressed:{state:!0}},xe.styles=[$,A,x,w`
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
  `];customElements.get("easy-av-control-remote-preview")||customElements.define("easy-av-control-remote-preview",xe);function Mi(l){let n=(l??"").split(",").map(e=>e.trim()).filter(Boolean);return n.length>1?n:n[0]}var P=(l,n=1,e=0)=>({number:{min:e,max:l,step:n,mode:"slider",unit_of_measurement:"s"}}),ie=P(600),En={section_device:"mdi:television",section_state:"mdi:state-machine",section_power:"mdi:power-socket-eu",section_delays:"mdi:timer-sand",section_ready:"mdi:lan-connect",card_settings:"mdi:tune-vertical",section_general:"mdi:information-outline",section_activity_devices:"mdi:format-list-numbered",section_checks:"mdi:check-decagram-outline",steps:"mdi:playlist-play",remote:"mdi:remote",quick_select:"mdi:gesture-tap-button",section_flow:"mdi:sitemap-outline",section_remote_preview:"mdi:cellphone-screenshot"},Ii=P(120),Tn=[["section_device","mdi:television"],["section_state","mdi:state-machine"],["section_power","mdi:power-socket-eu"]],Ni={section_device:"hint_device",section_state:"hint_state",section_power:"hint_power",section_delays:"hint_delays",section_ready:"hint_ready",section_monitor:"hint_monitor"},Ae=class extends b{constructor(){super();this._relatedKey="";this._detectAsked=new Set;this._powerMemo=new Map;this._openPanel=new Map;this._label=e=>this._t(`field.${e.name}`);this._helper=e=>{let t=`helper.${e.name}`,i=this._t(t);return i===t?void 0:i};this._tab="devices",this._view={kind:"list"},this.sources={},this.soundModes={},this._related={},this._detect={},this.profiles=[],this._powerOn=new Set}_loadRelated(){let e=[...new Set(Object.values(this.room?.devices??{}).map(i=>i.entity_id).filter(Boolean))].sort(),t=e.join(",");!this.hass||t===this._relatedKey||(this._relatedKey=t,this.hass.callWS({type:"easy_av_control/config/related",entity_ids:e}).then(i=>{t===this._relatedKey&&(this._related=i)}).catch(()=>{}))}disconnectedCallback(){super.disconnectedCallback(),this._unwatchRun()}_unwatchRun(){let e=this._runUnsub;this._runUnsub=void 0,this._runRoom=void 0,this._run=void 0,e?.then(t=>t()).catch(()=>{})}_watchRun(){if(!this.hass?.connection||!this.roomId||this._runRoom===this.roomId)return;this._unwatchRun();let e=this.roomId;this._runRoom=e;let t=this.hass.connection.subscribeMessage(i=>{this._runRoom===e&&(this._run=i?{state:i.state,current:i.current,activity:i.activity}:void 0)},{type:"easy_av_control/control/subscribe",room:e});t.catch(()=>{}),this._runUnsub=t}willUpdate(e){(e.has("hass")||e.has("roomId"))&&this._watchRun(),(e.has("room")||e.has("hass"))&&this._loadRelated(),e.has("roomId")&&e.get("roomId")!==void 0&&(this._view={kind:"list"},this._notice=void 0),(e.has("_view")||e.has("roomId"))&&(this._general=void 0),e.has("_view")&&(this._flowEditing=void 0,this._draftStartedBy=void 0);let t=this.jump;e.has("jump")&&t&&!t.activity?(this._view={kind:"list"},t.tab&&(this._tab=t.tab),this._notice=void 0):e.has("jump")&&t?.activity&&this.room?.activities?.[t.activity]&&(this._view={kind:"activity",id:t.activity},this._notice=void 0,t.flow&&this._openPanel.set(this._pageKey(),`activity:${this._t("section_flow")}`),window.scrollTo({top:0})),(e.has("_view")||e.has("roomId")||e.has("jump"))&&this.dispatchEvent(new CustomEvent("view-changed",{detail:{view:this._view}}))}_t(e,t){return T(this.hass?.language,e,t)}_emit(e){this.dispatchEvent(new CustomEvent("room-changed",{detail:{room:e}}))}_show(e){this._view=e,this._notice=void 0,window.scrollTo({top:0})}render(){this._firstPanel=void 0;let e=this._view;if(e.kind==="device"&&this.room.devices?.[e.id])return this._renderDevice(e.id,this.room.devices[e.id]);if(e.kind==="activity"&&this.room.activities?.[e.id])return this._renderActivity(e.id,this.room.activities[e.id]);let t=[{value:"__last",label:this._t("default_last")},...Object.entries(this.room.activities??{}).map(([a,c])=>({value:a,label:c.name??a}))],i=this.room.area_id?this.hass?.areas?.[this.room.area_id]:void 0,s=i?.floor_id?this.hass?.floors?.[i.floor_id]:void 0,o=this.room.default_activity?this.room.activities?.[this.room.default_activity]?.name??this.room.default_activity:this._t("default_last");return r`
      ${this._generalHeader({title:this.room.name??this.roomId,icon:i?.icon||"mdi:sofa-outline",meta:[r`<span><ha-icon icon="mdi:map-marker-outline"></ha-icon>${i?`${i.name}${s?` \xB7 ${s.name}`:""}`:this._t("gen_no_area")}</span>`,r`<span><ha-icon icon="mdi:play-circle-outline"></ha-icon>${this._t("room_default_activity")}: ${o}</span>`],data:{name:this.room.name??"",area_id:this.room.area_id??void 0,default_activity:this.room.default_activity??"__last"},schema:[{name:"name",required:!0,selector:{text:{}}},{name:"area_id",selector:{area:{}}},{name:"default_activity",selector:{select:{options:t,mode:"dropdown"}}}],label:a=>this._t(`room_${a.name==="area_id"?"area":a.name}`),save:a=>this._emit(k({...this.room,name:a.name?.trim()||this.room.name,area_id:a.area_id,default_activity:a.default_activity==="__last"?void 0:a.default_activity}))})}

      <div class="tabs" role="tablist">
        ${["devices","activities","watchdog","yaml"].map(a=>r`<button
            role="tab"
            class=${this._tab===a?"active":""}
            aria-selected=${this._tab===a?"true":"false"}
            @click=${()=>this._tab=a}
          >
            ${this._t(`tab_${a}`)}
          </button>`)}
      </div>
      ${this._notice?r`<div class="notice">${this._notice}</div>`:p}
      ${this._tab==="devices"?this._renderDeviceList():this._tab==="activities"?this._renderActivityList():this._tab==="watchdog"?this._renderWatchdog():this._renderYaml()}
      <button class="ltek-btn danger delete-room" @click=${()=>this.dispatchEvent(new CustomEvent("delete-room"))}>
        <ha-icon icon="mdi:trash-can-outline"></ha-icon>
        ${this._t("delete_room")}
      </button>
    `}_generalHeader(e){let t=this._pageKey(),i=this._general?.key===t?this._general:void 0;return r`<div class="gen-head ${i?"editing":""}">
        <div class="gen-icon"><ha-icon icon=${e.icon}></ha-icon></div>
        <div class="gen-text">
          <h2>${e.title}</h2>
          <div class="gen-meta">${e.meta}</div>
        </div>
        <button
          class="gen-lock ${i?"open":""}"
          title=${this._t(i?"gen_lock":"gen_unlock")}
          aria-label=${this._t(i?"gen_lock":"gen_unlock")}
          aria-pressed=${i?"true":"false"}
          @click=${()=>this._general=i?void 0:{key:t,draft:{...e.data}}}
        >
          <ha-icon icon=${i?"mdi:lock-open-variant-outline":"mdi:lock-outline"}></ha-icon>
        </button>
        ${e.beside??p}
      </div>
      ${i?r`<div class="gen-edit">
            <ltek-form
              .hass=${this.hass}
              .data=${i.draft}
              .schema=${e.schema}
              .computeLabel=${e.label}
              .computeHelper=${this._helper}
              @value-changed=${s=>this._general={key:t,draft:s.detail.value}}
            ></ltek-form>
            <div class="gen-bar">
              <button
                class="ltek-btn primary"
                ?disabled=${JSON.stringify(i.draft)===JSON.stringify(e.data)}
                @click=${()=>{this._general=void 0,e.save(i.draft),this.dispatchEvent(new CustomEvent("save-request",{bubbles:!0,composed:!0}))}}
              >
                <ha-icon icon="mdi:content-save-outline"></ha-icon> ${this._t("save")}
              </button>
              <button class="ltek-btn" @click=${()=>this._general=void 0}>${this._t("cancel")}</button>
            </div>
          </div>`:p}`}_detailHeader(e,t,i,s,o,a,c){return r`<div class="detail-head">
        ${e?r`<button class="back" @click=${()=>this._show({kind:"list"})}>
              <ha-icon icon="mdi:arrow-left"></ha-icon>
              <span>${e}</span>
            </button>`:p}
        <span class="head-acts">
          ${a?r`<button class="ltek-btn" @click=${a}>
                <ha-icon icon="mdi:export"></ha-icon> ${this._t("act_export")}
              </button>`:p}
          ${o?r`<button class="ltek-btn" @click=${o}>
                <ha-icon icon="mdi:content-copy"></ha-icon> ${this._t("duplicate")}
              </button>`:p}
          <button class="ltek-btn danger" @click=${i}>
            <ha-icon icon="mdi:trash-can-outline"></ha-icon> ${this._t("delete")}
          </button>
        </span>
      </div>
      ${c??r`<div class="title-row"><h2>${t}</h2>${s??p}</div>`}
      ${this._notice?r`<div class="notice">${this._notice}</div>`:p}`}_runButtons(e){let t=!!this.saved?.activities?.[e]&&this.saved?.activities?.[e]?.enabled!==!1,i=this.room.activities?.[e]??{},s=i.enabled!==!1,o=c=>{let h=c.currentTarget;h.setPointerCapture?.(c.pointerId),h.classList.add("holding"),this._holdTimer=window.setTimeout(()=>{h.classList.remove("holding"),this._holdTimer=void 0,this.hass.callService("easy_av_control","start_activity",{room:this.roomId,activity:e})},3e3)},a=c=>{c.currentTarget.classList.remove("holding"),window.clearTimeout(this._holdTimer),this._holdTimer=void 0};return r`<span class="run-buttons">
      <label class="enabled-toggle ${s?"":"off"}" title=${this._t("act_enabled_hint")}>
        <input
          type="checkbox"
          .checked=${D(s)}
          @change=${c=>this._setActivity(e,{...i,enabled:c.target.checked?void 0:!1})}
        />
        ${this._t(s?"act_enabled":"act_disabled")}
      </label>
      <button
        class="run-btn startup"
        title=${`${this._t("act_hold")}. ${this._t("act_saved_only")}`}
        ?disabled=${!t}
        @pointerdown=${o}
        @pointerup=${a}
        @pointerleave=${a}
        @pointercancel=${a}
        @contextmenu=${c=>c.preventDefault()}
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
    </span>`}_panel(e,t,i,s,o,a=!0){let c=this._pageKey();a&&this._firstPanel===void 0&&(this._firstPanel=e);let d=(this._openPanel.get(c)??this._firstPanel)===e;return r`<details
      class="ltek-sec"
      .open=${D(d)}
      @toggle=${u=>{let m=u.target.open,f=this._openPanel.get(c)??this._firstPanel;m&&f!==e?(this._openPanel.set(c,e),this.requestUpdate()):!m&&f===e&&(this._openPanel.set(c,""),this.requestUpdate())}}
    >
      <summary><ha-icon icon=${t}></ha-icon>${i}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="ltek-body">${s?r`<p class="ltek-hint">${s}</p>`:p}${o}</div>
    </details>`}_pageKey(){let e=this._view;return e.kind==="list"||e.kind==="watchdog"?`${e.kind}:${this.roomId}`:`${e.kind}:${this.roomId}:${e.id}`}_card(e,t,i,s){let o=Object.entries(En).find(([a])=>this._t(a)===e);return this._panel(`${this._view.kind}:${e}`,s??o?.[1]??"mdi:tune-variant",e,t,i)}_advanced(e,t){let i=this._t("section_advanced");return this._panel(`${this._view.kind}:${i}`,"mdi:cog-outline",i,e,t,!1)}_deviceTitle(e,t){let i=t.entity_id?this.hass.states[t.entity_id]:void 0;return t.name||i?.attributes.friendly_name||(t.entity_id?e:this._t("new_device"))}_renderDeviceList(){let e=Object.entries(this.room.devices??{});return r`
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
        ${s?r`<span class="ltek-warn ltek-subline">${s}</span>`:p}
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
    ></ltek-form>`}_remoteOf(e){let t=this.hass.entities??{},i=e?t[e]?.device_id:void 0;if(i)return Object.values(t).find(s=>s?.device_id===i&&s.entity_id.startsWith("remote."))?.entity_id}_renderDevice(e,t){let i=this._deviceData(t),s=Tt(this.room,e);return r`
      ${this._detailHeader(this._t("tab_devices"),this._deviceTitle(e,t),()=>this._deleteDevice(e))}
      ${s.length?r`<p class="ltek-hint">${this._t("used_by",{where:s.join(", ")})}</p>`:p}

      ${Tn.map(([o,a])=>this._card(this._t(o),this._t(Ni[o]),this._deviceSection(e,t,o),a))}
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
    `}_deviceSection(e,t,i){let s=this._deviceData(t),o=t.ready??null,a=this._remoteOf(t.entity_id),c=o?.entity_id===a&&o?.reload_integration===!0&&t.remote_entity===a,h=/^(input_)?select\./.test(t.entity_id??""),d=(t.entity_id?this.hass.states[t.entity_id]?.attributes.options:void 0)??[],u=m=>({select:{options:m.map(f=>({value:f,label:f})),mode:"dropdown",custom_value:!0}});switch(i){case"section_device":return this._deviceForm(e,s,[{name:"entity_id",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"remote_entity",selector:{entity:{filter:{domain:"remote"}}}},...h?[{name:"option",selector:u(d.filter(m=>m!==(t.off_option??"power_off")))},{name:"off_option",selector:u(d)}]:[]]);case"section_state":return this._renderState(e,t);case"section_power":return this._renderPower(e,t,s);case"section_delays":return this._deviceForm(e,s,[{name:"delay_after_on",selector:ie},{name:"delay_after_off",selector:ie},{name:"turn_off_after",selector:P(1800,10)}]);case"section_ready":return r`${a&&!c?r`<button class="ltek-btn preset" @click=${()=>this._applyReadyPreset(e,t,a)}>
                ${this._t("ready_preset",{entity:a})}
              </button>`:p}
          ${this._deviceForm(e,s,[{name:"ready_enabled",selector:{boolean:{}}},...o!==null?[{name:"ready_entity",selector:{entity:{}}},{name:"ready_state",selector:{text:{}}},{name:"ready_timeout",selector:ie},{name:"ready_reload",selector:{boolean:{}}},{name:"ready_on_timeout",selector:{select:{options:[{value:"abort",label:this._t("on_timeout_abort")},{value:"continue",label:this._t("on_timeout_continue")}],mode:"dropdown"}}}]:[]])}`;case"section_monitor":{let m=t.watch??{},f=m.mode??"notify";return r`<ltek-form
          .hass=${this.hass}
          .data=${{watch_mode:f,watch_grace:m.grace??120,watch_turn_off_after:m.turn_off_after??600}}
          .schema=${[{name:"watch_mode",selector:{select:{mode:"dropdown",options:["off","notify","turn_off"].map(_=>({value:_,label:this._t(`watch.${_}`)}))}}},...f==="off"?[]:[{name:"watch_grace",selector:P(1800,10)},...f==="turn_off"?[{name:"watch_turn_off_after",selector:P(3600,30)}]:[]]]}
          .computeLabel=${this._label}
          @value-changed=${_=>{let g=_.detail.value,v=k({mode:g.watch_mode==="notify"?void 0:g.watch_mode,grace:g.watch_grace===120?void 0:g.watch_grace,turn_off_after:g.watch_turn_off_after===600?void 0:g.watch_turn_off_after}),y=k({...t,watch:v});this._emit({...this.room,devices:{...this.room.devices,[e]:y}})}}
        ></ltek-form>`}default:return r``}}_renderWatchdog(){let e=Object.values(this.hass.states).filter(i=>i?.entity_id.startsWith("binary_sensor.")&&i.attributes.room===this.roomId&&i.attributes.scope==="watchdog"),t=(i,s)=>this.hass.callService("easy_av_control","problem_action",{room:this.roomId,problem:i,action:s});return r`<p class="ltek-hint">${this._t("watchdog_hint")}</p>
      ${e.length?r`<div class="ltek-list watchdog-now">
            ${e.map(i=>{let s=i.state==="on",o=String(i.attributes.problem);return r`<div class="ltek-item ordered-row">
                <ha-icon class="lead ${s?"bad":"good"}" icon=${s?"mdi:alert":"mdi:check-circle-outline"}></ha-icon>
                <span class="ltek-item-text">
                  <span class="ltek-name">${this._t(`problem.${o}`)}</span>
                  <span class="ltek-subline">${s?(i.attributes.names??[]).join(", "):this._t("watchdog_ok")}</span>
                </span>
                ${s?(i.attributes.actions??[]).map(a=>r`<button class="ltek-btn" @click=${()=>t(o,a)}>${this._t(`action.${a}`)}</button>`):p}
              </div>`})}
          </div>`:r`<p class="ltek-hint">${this._t("watchdog_save_first")}</p>`}
      ${this._card(this._t("watchdog_devices"),this._t("watchdog_devices_hint"),r`<div class="ltek-list">
          ${Object.entries(this.room.devices??{}).map(([i,s])=>{let o=this._detectFor(s);return r`<div class="step">
              <div class="step-head"><span class="title">${s.name??s.entity_id}</span></div>
              ${o&&!o.state?r`<p class="ltek-hint">${this._t("watchdog_no_status")}</p>`:this._deviceSection(i,s,"section_monitor")}
            </div>`})}
        </div>`,"mdi:television-guide")}
      <p class="ltek-hint">
        ${this._t("watchdog_error")}
        <button class="link" @click=${()=>this.dispatchEvent(new CustomEvent("open-page",{detail:{page:"notifications"}}))}>
          ${this._t("watchdog_notify")}
        </button>
      </p>`}_renderMonitor(e,t){let i=t.monitor??{},s={lost_after:i.lost_after??60,picture_lost_after:i.picture_lost_after??60,idle_after_min:Math.round((i.idle_after??0)/60),idle_warning_min:Math.round((i.idle_warning??300)/60)},o=(a,c=1)=>({number:{min:0,max:a,step:c,mode:"slider",unit_of_measurement:"min"}});return r`<p class="ltek-hint">${this._t("monitor_hint")}</p>
      <ltek-form
        .hass=${this.hass}
        .data=${s}
        .schema=${[{name:"lost_after",selector:P(600,10)},...(t.checks??[]).length?[{name:"picture_lost_after",selector:P(600,10)}]:[],{name:"idle_after_min",selector:o(240,5)},...s.idle_after_min?[{name:"idle_warning_min",selector:o(30)}]:[]]}
        .computeLabel=${this._label}
        @value-changed=${a=>{let c={...s,...a.detail.value};this._setActivity(e,{...t,monitor:Nt(c)})}}
      ></ltek-form>`}_renderPower(e,t,i){let s=!!t.power_switch||this._powerOn.has(e),o=a=>{let c=new Set(this._powerOn),h={...t};a?(Object.assign(h,this._powerMemo.get(e)??{}),h.power_switch||c.add(e)):(t.power_switch&&this._powerMemo.set(e,{power_switch:t.power_switch,delay_after_power:t.delay_after_power}),delete h.power_switch,delete h.delay_after_power,c.delete(e)),this._powerOn=c,this._emit({...this.room,devices:{...this.room.devices,[e]:k(h)}})};return r`<label class="check">
        <input type="checkbox" .checked=${D(s)} @change=${a=>o(a.target.checked)} />
        ${this._t("power_use")}
      </label>
      <div class=${s?"":"unused"}>
        ${this._deviceForm(e,s?i:{...i,...this._powerMemo.get(e)??{}},[{name:"power_switch",selector:{entity:{filter:{domain:["switch","input_boolean","light"]}}}}],!s)}
      </div>`}_detectFor(e){if(!e.entity_id||!this.hass)return;let t=Object.fromEntries(He.filter(s=>e[s]!==void 0).map(s=>[s,e[s]])),i=JSON.stringify([e.entity_id,t]);return this._detectAsked.has(i)||(this._detectAsked.add(i),this.hass.callWS({type:"easy_av_control/config/detect",entity_id:e.entity_id,device:t}).then(s=>this._detect={...this._detect,[i]:s}).catch(()=>this._detectAsked.delete(i))),this._detect[i]}_renderState(e,t){let i=this._detectFor(t);if(!t.entity_id)return r`<p class="ltek-hint">${this._t("no_entity")}</p>`;let s=ht(t,i),o=t.entity_id?this.hass.entities?.[t.entity_id]?.platform:void 0,a=[{value:"__auto",label:this._t("profile.auto")},...this.profiles.filter(d=>!d.generic&&(d.integration===o||d.id===t.profile)).map(d=>({value:d.id,label:`${d.name} (${this._t(d.source==="user"?"profiles_yours":"profiles_builtin")})`}))],c=!!i?.state,h=[...a.length>1?[{name:"profile",selector:{select:{options:a,mode:"dropdown"}}}]:[],{name:"state_source",selector:{select:{mode:"dropdown",options:[{value:"auto",label:this._t("state_source.auto")},{value:"none",label:this._t("state_source.none")},...s.state_source==="custom"?[{value:"custom",label:"YAML"}]:[]]}}}];return r`${this._renderDetected(e,t,i)}
      ${i&&!c?r`<p class="ltek-hint">${this._t("state_fixed_only")}</p>`:p}
      <ltek-form
        .hass=${this.hass}
        .data=${s}
        .schema=${h}
        .computeLabel=${d=>this._t(d.name==="state_source"?"state_source":`field.${d.name}`)}
        .computeHelper=${this._helper}
        @value-changed=${d=>{let u=pt(t,{...s,...d.detail.value},i);this._emit({...this.room,devices:{...this.room.devices,[e]:u}})}}
      ></ltek-form>`}_renderDetected(e,t,i){if(!i)return r`<p class="ltek-hint">${this._t("loading")}</p>`;if(!i.profile)return r`<p class="ltek-hint">${this._t("detected_none")}</p>`;let{profile:s,found:o,state:a}=i,c=li(t,i),h=[];if(o?.indicator&&h.push(this._t("detected_found_indicator",{entity:this._entityName(o.indicator)})+(o.attribute?`, ${this._t("detected_found_attribute",{attribute:o.attribute})}`:"")),o?.remote_entity&&h.push(this._t("detected_found_remote",{entity:this._entityName(o.remote_entity)})),o?.power_switch&&h.push(this._t("detected_found_outlet",{entity:this._entityName(o.power_switch)})),o?.settings?.length&&h.push(this._t("detected_found_settings",{entities:o.settings.map(d=>this._entityName(d)).join(", ")})),i.siblings.length){h.push(this._t("detected_siblings",{integrations:i.siblings.map(u=>u.integration).join(", ")}));let d=Object.entries(i.roles).filter(([,u])=>u).map(([u,m])=>this._t("detected_role",{role:this._t(`role.${u}`),integration:m}));d.length&&h.push(d.join(" \xB7 "))}return r`<div class="ltek-item detected open">
      <ha-icon class="lead" icon="mdi:auto-fix"></ha-icon>
      <span class="ltek-item-text">
        <span class="ltek-name">${this._t("detected",{name:s.name})}</span>
        ${h.map(d=>r`<span class="ltek-subline">${d}</span>`)}
        ${a?r`<span class="ltek-subline">${this._t("detected_now",{value:a.value??a.group})}</span>`:p}
        ${this._timingLines(i).map(d=>r`<span class="ltek-subline">${d}</span>`)}
      </span>
      <span class="ltek-badge ${s.source==="user"?"lib":"accent"}">
        ${this._t(s.source==="user"?"profiles_yours":"profiles_builtin")}
      </span>
      ${s.tested?p:r`<span class="ltek-badge warn" title=${this._t("profile_untested")}>!</span>`}
      ${Object.keys(c).length?r`<button
            class="ltek-btn primary"
            @click=${()=>this._emit({...this.room,devices:{...this.room.devices,[e]:{...t,...c}}})}
          >
            ${this._t("detected_use")}
          </button>`:r`<span class="ltek-badge ok">${this._t("detected_applied")}</span>`}
      ${Object.keys(mt(t,i)).length?r`<button
            class="ltek-btn"
            title=${this._t("timing_use_hint")}
            @click=${()=>this._emit({...this.room,devices:{...this.room.devices,[e]:{...t,...mt(t,i)}}})}
          >
            ${this._t("timing_use")}
          </button>`:p}
    </div>`}_timingLines(e){let t=e.timings;if(!t)return[];let i=[];for(let s of["on","off"]){let o=t[s];!o?.samples||o.typical===null||i.push(this._t(`timing_${s}`,{typical:ut(o.typical),count:String(o.samples),slowest:ut(o.slowest??o.typical)}))}return i}_entityName(e){return this.hass.states[e]?.attributes.friendly_name??e}_applyReadyPreset(e,t,i){let s={entity_id:i,state:"on",timeout:60,reload_integration:!0,on_timeout:"continue"};this._emit({...this.room,devices:{...this.room.devices,[e]:{...t,ready:s,remote_entity:i}}})}_unsaved(e,t){return!(t in(this.saved?.[e]??{}))}_deviceChanged(e,t){let i=k({entity_id:t.entity_id,name:t.name,remote_entity:t.remote_entity,power_switch:t.power_switch,ready:t.ready_enabled?k({entity_id:t.ready_entity,state:Mi(t.ready_state),timeout:t.ready_timeout,reload_integration:t.ready_reload,on_timeout:t.ready_on_timeout}):void 0,delay_after_power:t.power_switch?t.delay_after_power:void 0,delay_after_on:t.delay_after_on,delay_after_off:t.delay_after_off,turn_off_after:t.turn_off_after||void 0,option:t.option,off_option:t.off_option,commands:t.commands}),s=this.room.devices?.[e]??{};for(let h of He)s[h]!==void 0&&(i[h]=s[h]);let o=this.room.devices?.[e]?.settings;o!==void 0&&(i.settings=o),t.ready_enabled&&!i.ready&&(i.ready={});let a={...this.room,devices:{...this.room.devices,[e]:i}},c=i.entity_id?.split(".")[1];if(c&&this._unsaved("devices",e)&&i.entity_id!==this.room.devices?.[e]?.entity_id){let h=C(B(c),Object.keys(a.devices??{}).filter(d=>d!==e));if(h!==e){this._emit(Ge(a,e,h)),this._view={kind:"device",id:h};return}}this._emit(a)}_addDevice(){let e=C("device",Object.keys(this.room.devices??{}));this._emit({...this.room,devices:{...this.room.devices,[e]:{entity_id:""}}}),this._show({kind:"device",id:e})}_renameDevice(e,t){let i=B(t);if(!i||i===e){this.requestUpdate();return}let s=C(i,Object.keys(this.room.devices??{}).filter(o=>o!==e));this._emit(Ge(this.room,e,s)),this._view={kind:"device",id:s}}_deleteDevice(e){let t=Tt(this.room,e);if(t.length){this._notice=this._t("device_in_use",{id:e,where:t.join(", ")});return}if(!window.confirm(`${this._t("delete")}: ${this._deviceTitle(e,this.room.devices[e])}?`))return;let i={...this.room.devices};delete i[e],this._emit({...this.room,devices:i}),this._show({kind:"list"})}_renderActivityList(){let e=qe(this.room),t=i=>(i.devices??[]).map(s=>this.room.devices?.[s]?.name??s).join(" \u2192 ");return r`
      <p class="ltek-hint">${this._t("activities_intro")}</p>
      <div class="ltek-list">
        ${Object.keys(this.room.devices??{}).length?r`<button class="ltek-add" @click=${this._addActivity}>+ ${this._t("add_activity")}</button>`:r`<p class="ltek-hint">${this._t("needs_devices")}</p>`}
        <div class="ltek-buttons io">
          <button class="ltek-btn" @click=${()=>this._openIo("import")}>
            <ha-icon icon="mdi:import"></ha-icon> ${this._t("act_import")}
          </button>
          ${e.length?r`<button class="ltek-btn" @click=${()=>this._openIo("export",e.map(([i])=>i))}>
                <ha-icon icon="mdi:export"></ha-icon> ${this._t("act_export_all")}
              </button>`:p}
        </div>
        ${e.length?e.map(([i,s])=>this._row(s.name??i,t(s)||this._t("no_devices"),()=>this._show({kind:"activity",id:i}),s.enabled===!1?this._t("act_disabled"):void 0,s.icon??"mdi:play-circle-outline")):r`<p class="ltek-hint">${this._t("activities_empty")}</p>`}
      </div>
      ${this._renderIo()}
    `}async _openIo(e,t=[]){this._io={mode:e,text:e==="export"?JSON.stringify(xi(this.room,t),null,2):""},await this.updateComplete;let i=this.shadowRoot?.querySelector("dialog.io");i instanceof HTMLDialogElement&&!i.open&&i.showModal()}_closeIo(){this.shadowRoot?.querySelector("dialog.io")?.close(),this._io=void 0}async _ioCopy(e){let t=e.currentTarget,i=this.shadowRoot.querySelector("dialog.io textarea");i.select();let s=!1;try{s=document.execCommand("copy")}catch{s=!1}if(!s)try{await navigator.clipboard.writeText(i.value),s=!0}catch{s=!1}t.textContent=this._t(s?"profile_copied":"profile_copy_failed")}_ioDownload(){let e=URL.createObjectURL(new Blob([this._io?.text??""],{type:"application/json"})),t=document.createElement("a");t.href=e,t.download=`easy-av-control-activities-${this.roomId}.json`,t.click(),window.setTimeout(()=>URL.revokeObjectURL(e),1e3)}async _ioFile(e){let t=e.target.files?.[0];t&&this._io&&(this._io={...this._io,text:await t.text(),message:void 0})}_ioImport(e=!1){if(this._io)try{let t=Ai(this.room,JSON.parse(this._io.text),e),i=o=>t.room.devices?.[o]?.name??o;this._emit(t.room);let s=[];Object.keys(t.replaced).length&&s.push(this._t("act_import_replaced",{names:Object.values(t.replaced).join(", ")})),Object.keys(t.added).length&&s.push(this._t("act_import_done",{added:Object.values(t.added).join(", ")})),t.devicesAdded.length&&s.push(this._t("act_import_devices",{devices:t.devicesAdded.map(i).join(", ")})),t.startedByDropped.length&&s.push(this._t("act_import_started_by",{names:t.startedByDropped.join(", ")})),this._closeIo(),this._notice=s.join(" \xB7 ")}catch(t){this._io={...this._io,message:t.message??String(t)}}}_renderIo(){let e=this._io;if(!e)return p;let t=e.mode==="export";return r`<dialog class="io" @cancel=${this._closeIo} @click=${i=>i.target===i.currentTarget&&this._closeIo()}>
      <div class="dialog-body">
        <div class="ltek-group first">${this._t(t?"act_export":"act_import")}</div>
        <p class="ltek-hint">${this._t(t?"act_export_hint":"act_import_hint")}</p>
        ${t?p:r`<input type="file" accept=".json,application/json" @change=${this._ioFile} />`}
        <textarea
          class="ltek-text"
          rows="14"
          .value=${e.text}
          ?readonly=${t}
          @input=${i=>this._io={...e,text:i.target.value,message:void 0}}
        ></textarea>
        ${e.message?r`<p class="ltek-hint ltek-warn">${e.message}</p>`:p}
        <div class="ltek-buttons">
          ${t?r`<button class="ltek-btn primary" @click=${this._ioCopy}>${this._t("profile_copy")}</button>
                <button class="ltek-btn" @click=${this._ioDownload}><ha-icon icon="mdi:download"></ha-icon> ${this._t("act_download")}</button>`:r`<button class="ltek-btn primary" ?disabled=${!e.text.trim()} @click=${()=>this._ioImport(!1)}>${this._t("act_import")}</button>
                <button class="ltek-btn" ?disabled=${!e.text.trim()} @click=${()=>this._ioImport(!0)}>${this._t("act_import_copy")}</button>`}
          <button class="ltek-btn" @click=${this._closeIo}>${this._t("profile_close")}</button>
        </div>
      </div>
    </dialog>`}_setActivity(e,t){this._emit({...this.room,activities:{...this.room.activities,[e]:k(t)}})}_renderActivity(e,t){let i=t.devices??[],s=[{value:"__auto",label:this._t("route_auto")},{value:"__none",label:this._t("route_none")},...i.map(h=>({value:h,label:this.room.devices?.[h]?.name??h}))],o=t.remote??{},a={};for(let h of H)a[h]=h in o?o[h]===null?"__none":o[h]:"__auto";a.touchpad=o.touchpad===!0?"on":o.touchpad===!1?"off":"auto";let c=(o.buttons??[]).filter(h=>!be(h));return r`
      ${this._detailHeader(void 0,t.name??e,()=>this._deleteActivity(e,t),void 0,()=>this._duplicateActivity(e,t),()=>this._openIo("export",[e]),this._generalHeader({title:t.name??e,icon:t.icon||"mdi:play-circle-outline",meta:[r`<span><ha-icon icon="mdi:sofa-outline"></ha-icon>${this.room.name??this.roomId}</span>`,r`<span><ha-icon icon="mdi:sort-numeric-ascending"></ha-icon>${this._t("field.order")}: ${t.order??"\u2013"}</span>`,...this.room.default_activity===e?[r`<span><ha-icon icon="mdi:star-outline"></ha-icon>${this._t("gen_default")}</span>`]:[]],data:{name:t.name,icon:t.icon,order:t.order},schema:[{name:"name",required:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"order",selector:{number:{min:0,max:999,mode:"box"}}}],label:this._label,save:h=>this._activityGeneralChanged(e,t,{...h,name:h.name?.trim()||t.name}),beside:this._runButtons(e)}))}
      ${this._renderIo()}

      ${this._card(this._t("section_flow"),`${this._t("hint_flow")} ${this._t("flow.edit_hint")}`,this._renderFlowEditor(e,t))}

      ${this._advanced(this._t("hint_activity_advanced"),r`<p class="ltek-hint">${this._t("activity_id_hint",{id:e})}</p>
          <ltek-form
            .hass=${this.hass}
            .data=${{buttons:c,activity_commands:t.commands}}
            .schema=${[{name:"activity_commands",selector:{object:{}}}]}
            .computeLabel=${this._label}
            @value-changed=${h=>this._extrasChanged(e,t,h.detail.value)}
          ></ltek-form>`)}

      ${this._cardDivider()}
      ${this._card(this._t("remote"),this._t("hint_remote"),r`<ltek-form
          .hass=${this.hass}
          .data=${a}
          .schema=${[...H.map(h=>({name:h,selector:{select:{options:s,mode:"dropdown"}}})),{name:"touchpad",selector:{select:{options:["auto","on","off"].map(h=>({value:h,label:this._t(`touchpad_${h}`)})),mode:"dropdown"}}}]}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${h=>this._routesChanged(e,t,h.detail.value)}
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
          @value-changed=${h=>this._extrasChanged(e,t,h.detail.value)}
        ></ltek-form>`,!1)}
    `}_renderFlowEditor(e,t){let i=this._flowEditing;return r`<easy-av-control-flow
      .hass=${this.hass}
      .room=${this.room}
      .roomId=${this.roomId}
      .activityId=${e}
      .run=${this._run}
      .editing=${i?.key}
      @flow-edit=${s=>{this._flowEditing=i?.key===s.detail.key?void 0:s.detail}}
      @flow-delete=${s=>this._flowDelete(e,t,s.detail)}
      @flow-move=${s=>this._flowMove(e,t,s.detail)}
    >
      ${i&&!i.key.startsWith("__")?r`<div slot="edit">${this._inlineEditor(e,t,i)}</div>`:p}
      <div slot="add-start">${this._flowAdder(e,t,"start")}</div>
      <div slot="add-stop">${this._flowAdder(e,t,"stop")}</div>
      <div slot="add-monitor">${this._monitorAdder(e,t)}</div>
    </easy-av-control-flow>`}_inlineEditor(e,t,i){let s=r`<div class="inline-bar">
      <button class="ltek-btn" @click=${()=>this._flowEditing=void 0}>${this._t("flow.close_edit")}</button>
    </div>`,o=i.device,a=o?this.room.devices?.[o]:void 0;if(i.panel==="flow.before"&&o)return r`${this._renderBefore(e,t,o)}${s}`;if(a&&o&&Ni[i.panel]){let c=i.key.startsWith("device|"),h=t.devices??[],d=h.indexOf(o);return r`${c?r`<div class="inline-order">
                ${d>=0?this._moveButtons(h,d,u=>u.length<h.length?this._setActivity(e,Ot(t,o)):this._setActivity(e,{...t,devices:u})):p}
              </div>
              <h4>${this._t("flow.before")}</h4>
              ${this._renderBefore(e,t,o)}`:p}
        <h4>${this._t("flow.device_actions",{device:a.name??o})}</h4>
        ${this._renderDeviceFlow(e,t,o)}
        <p class="ltek-hint">
          ${this._t("flow.device_identity")}
          <button class="link" @click=${()=>this._show({kind:"device",id:o})}>${this._t("flow.open_device")}</button>
        </p>
        ${s}`}switch(i.panel){case"started_by":return r`${this._renderStartedBy(e,t)}${s}`;case"monitor":return r`${this._renderMonitor(e,t)}${s}`;case"section_checks":return r`${this._renderChecks(e,t)}${s}`;case"steps":return r`${this._renderSteps(e,t)}${s}`;case"section_advanced":return r`${this._renderHooks(e,t,i.key.includes("on_stop")?"on_stop":"on_start")}${s}`;case"section_activity_devices":return r`${this._renderActivityDevices(e,t,Object.keys(this.room.devices??{}),t.devices??[])}${s}`;default:return s}}_renderDeviceFlow(e,t,i){let s=this.room.devices?.[i];if(!s)return r``;let o=Dt(this.room,t,i),a=this._detectFor(s),c=!!a?.state,h={...ht(o,a),...this._deviceData(o)},d=(_,g)=>g.map(v=>({value:v,label:this._t(`${_}.${v}`)})),u=dt.map(_=>({value:_,label:this._t(_==="stop"?"failure_off.stop":`failure.${_}`)})),m=o.ready!==void 0&&o.ready!==null,f=[{name:"ready_enabled",selector:{boolean:{}}},...m?[{name:"ready_entity",selector:{entity:{}}},{name:"ready_state",selector:{text:{}}},{name:"ready_timeout",selector:ie},{name:"ready_reload",selector:{boolean:{}}},{name:"ready_on_timeout",selector:{select:{mode:"dropdown",options:[{value:"abort",label:this._t("on_timeout_abort")},{value:"continue",label:this._t("on_timeout_continue")}]}}}]:[],...s.power_switch?[{name:"delay_after_power",selector:Ii}]:[],...c?[{name:"wait_on",selector:{select:{mode:"dropdown",options:d("wait",ct)}}},{name:"timeout_on",selector:P(600,5,5)},{name:"debounce",selector:P(30,.5)},{name:"on_failure_on",selector:{select:{mode:"dropdown",options:d("failure",dt)}}}]:[],{name:"delay_after_on",selector:ie},...c?[{name:"wait_off",selector:{select:{mode:"dropdown",options:d("wait",ct)}}},{name:"timeout_off",selector:P(900,5,5)},{name:"on_failure_off",selector:{select:{mode:"dropdown",options:u}}}]:[],{name:"delay_after_off",selector:ie},{name:"turn_off_after",selector:P(1800,10)},...a?.found?.picture?[{name:"on_failure_picture",selector:{select:{mode:"dropdown",options:d("failure",["warn","stop"])}}}]:[]];return r`${c?p:r`<p class="ltek-hint">${this._t("state_fixed_only")}</p>`}
      <ltek-form
        .hass=${this.hass}
        .data=${h}
        .schema=${f}
        .computeLabel=${_=>this._t(`field.${_.name}`)}
        .computeHelper=${this._helper}
        @value-changed=${_=>{let g={...h,..._.detail.value},v=pt(o,g,a);for(let y of["delay_after_power","delay_after_on","delay_after_off","turn_off_after"]){let S=Number(g[y]);S?v[y]=S:delete v[y]}g.ready_enabled?v.ready=k({entity_id:g.ready_entity,state:Mi(g.ready_state),timeout:g.ready_timeout,reload_integration:g.ready_reload,on_timeout:g.ready_on_timeout}):delete v.ready,this._setActivity(e,zt(t,i,v,s))}}
      ></ltek-form>`}_renderBefore(e,t,i){let s=t.before?.[i]??{},o=u=>this._setActivity(e,jt(t,i,u)),a=s.wait_for??[],h=(t.devices??[]).filter(u=>u!==i).filter(u=>!a.some(m=>m.device===u)),d=u=>this.room.devices?.[u]?.name??u;return r`<p class="ltek-hint">${this._t("flow.before_hint")}</p>
      <ltek-form
        .hass=${this.hass}
        .data=${{before_delay:s.delay??0}}
        .schema=${[{name:"before_delay",selector:Ii}]}
        .computeLabel=${this._label}
        @value-changed=${u=>o({...s,delay:Number(u.detail.value.before_delay)||void 0})}
      ></ltek-form>
      <div class="ltek-list">
        ${h.length?r`<select
              class="ltek-add add-select"
              aria-label=${this._t("flow.add_wait_for")}
              @change=${u=>{let m=u.target;m.value&&o({...s,wait_for:[...a,{device:m.value,state:"on"}]}),m.value=""}}
            >
              <option value="" selected>${this._t("flow.add_wait_for")}</option>
              ${h.map(u=>r`<option value=${u}>${d(u)}</option>`)}
            </select>`:p}
        ${a.map((u,m)=>r`<div class="ltek-item ordered-row">
            <span class="ltek-name">${d(u.device)}</span>
            <select
              @change=${f=>{let _=[...a];_[m]={...u,state:f.target.value},o({...s,wait_for:_})}}
            >
              ${["on","picture"].map(f=>r`<option value=${f} ?selected=${(u.state??"on")===f}>${this._t(`wait_for.${f}`)}</option>`)}
            </select>
            <button
              class="ltek-del"
              title=${this._t("delete")}
              aria-label=${this._t("delete")}
              @click=${()=>o({...s,wait_for:a.filter((f,_)=>_!==m)})}
            >
              <ha-icon icon="mdi:trash-can-outline"></ha-icon>
            </button>
          </div>`)}
      </div>
      ${a.length?r`<ltek-form
            .hass=${this.hass}
            .data=${{before_timeout:s.timeout??90,before_on_timeout:s.on_timeout??"continue"}}
            .schema=${[{name:"before_timeout",selector:P(600,5,5)},{name:"before_on_timeout",selector:{select:{mode:"dropdown",options:[{value:"continue",label:this._t("on_timeout_continue")},{value:"abort",label:this._t("on_timeout_abort")}]}}}]}
            .computeLabel=${this._label}
            @value-changed=${u=>{let m=u.detail.value;o({...s,timeout:m.before_timeout,on_timeout:m.before_on_timeout})}}
          ></ltek-form>`:p}`}_renderStartedBy(e,t){let i=t.started_by??[],s=d=>this._setActivity(e,{...t,started_by:d.length?d:void 0}),o=this._draftStartedBy,a=o?[...i,o]:i,c=d=>(this.hass.states[d]?.attributes.options??[]).map(u=>({value:u,label:u})),h=d=>Array.isArray(d)?String(d[0]??""):String(d??"");return r`<p class="ltek-hint">${this._t("started_by_hint")}</p>
      <div class="ltek-list">
        ${o?p:r`<button class="ltek-add" @click=${()=>this._draftStartedBy={entity_id:"",state:""}}>+ ${this._t("flow.add_started_by")}</button>`}
        ${a.map((d,u)=>{let m=u>=i.length,f=c(d.entity_id),_=f.length?{select:{options:f,mode:"dropdown",custom_value:!0}}:{text:{}};return r`<div class="step">
            <div class="step-head">
              <span class="title"><span class="num">${u+1}</span> ${this._t("started_by")}</span>
              ${m?r`<button class="ltek-del" title=${this._t("delete")} aria-label=${this._t("delete")} @click=${()=>this._draftStartedBy=void 0}>
                    <ha-icon icon="mdi:trash-can-outline"></ha-icon>
                  </button>`:this._moveButtons(i,u,s)}
            </div>
            <ltek-form
              .hass=${this.hass}
              .data=${{started_by_entity:d.entity_id,started_by_state:h(d.state),started_by_stop:h(d.stop_state)}}
              .schema=${[{name:"started_by_entity",required:!0,selector:{entity:{}}},{name:"started_by_state",required:!0,selector:_},{name:"started_by_stop",selector:_}]}
              .computeLabel=${this._label}
              @value-changed=${g=>{let v=g.detail.value,y=String(v.started_by_entity??""),S=String(v.started_by_state??""),E=String(v.started_by_stop??"");if(y!==d.entity_id){let Ee=this.hass.states[y]?.attributes.options??[];Ee.includes("power_off")&&(S=Ee.find(Ze=>Ze!=="power_off")??"",E="power_off")}let j=k({entity_id:y,state:S,stop_state:E||void 0});if(m){y&&S?(this._draftStartedBy=void 0,s([...i,j])):this._draftStartedBy={entity_id:y,state:S,stop_state:E||void 0};return}let L=[...i];L[u]=j,s(L)}}
            ></ltek-form>
          </div>`})}
      </div>`}_renderSteps(e,t){return r`${(t.steps??[]).map((i,s)=>this._renderStep(e,t,i,s))}
      ${this._picker(this._t("add_step"),$t.map(i=>({value:i,label:this._t(`step.${i}`)})),i=>this._setActivity(e,{...t,steps:[...t.steps??[],Hi(i,t,this.room)]}))}`}_renderHooks(e,t,i){return r`<ltek-form
      .hass=${this.hass}
      .data=${{[i]:t[i]??[]}}
      .schema=${[{name:i,selector:{action:{}}}]}
      .computeLabel=${this._label}
      @value-changed=${s=>this._setActivity(e,{...t,[i]:s.detail.value[i]})}
    ></ltek-form>`}_flowAdder(e,t,i){let s=t.devices??[],o=Object.keys(this.room.devices??{}).filter(u=>!s.includes(u)),a=i==="start"?"on_start":"on_stop",c=this._flowEditing?.key===`__${a}`,h=(t[a]??[]).length>0,d=(u,m)=>this._flowEditing={key:u,panel:m};return r`<div class="flow-add">
        ${i==="start"?r`${o.length?r`<select
                    class="ltek-add add-select"
                    aria-label=${this._t("flow.pick_device")}
                    @change=${u=>{let m=u.target;m.value&&this._setActivity(e,{...t,devices:[...s,m.value]}),m.value=""}}
                  >
                    <option value="" selected>+ ${this._t("flow.add_device")}</option>
                    ${o.map(u=>r`<option value=${u}>${this.room.devices?.[u]?.name??u}</option>`)}
                  </select>`:p}
              ${s.length?r`<button
                    class="ltek-add"
                    @click=${()=>{let u=t.checks??[];this._setActivity(e,{...t,checks:[...u,{device:Rn(s,u)}]}),d("checks|||||","section_checks")}}
                  >
                    + ${this._t("flow.add_check")}
                  </button>`:p}
              <select
                class="ltek-add add-select"
                aria-label=${this._t("flow.add_step")}
                @change=${u=>{let m=u.target;m.value&&(this._setActivity(e,{...t,steps:[...t.steps??[],Hi(m.value,t,this.room)]}),d("steps|||||","steps")),m.value=""}}
              >
                <option value="" selected>+ ${this._t("flow.add_step")}</option>
                ${$t.map(u=>r`<option value=${u}>${this._t(`step.${u}`)}</option>`)}
              </select>`:p}
        ${i==="start"&&!(t.started_by??[]).length?r`<button
              class="ltek-add"
              @click=${()=>{this._draftStartedBy={entity_id:"",state:""},this._flowEditing={key:"__started_by",panel:"started_by"}}}
            >
              + ${this._t("flow.add_started_by")}
            </button>`:p}
        ${h?p:r`<button class="ltek-add" @click=${()=>this._flowEditing=c?void 0:{key:`__${a}`,panel:"section_advanced"}}>
              + ${this._t(i==="start"?"flow.add_on_start":"flow.add_on_stop")}
            </button>`}
      </div>
      ${i==="start"&&!o.length&&!s.length?r`<p class="ltek-hint">${this._t("flow.no_more_devices")}</p>`:p}
      ${c&&!h?r`<div class="inline-add">${this._renderHooks(e,t,a)}</div>`:p}
      ${i==="start"&&this._flowEditing?.key==="__started_by"?r`<div class="inline-add">${this._renderStartedBy(e,t)}</div>`:p}`}_monitorAdder(e,t){let i=t.monitor??{},s=a=>{this._setActivity(e,{...t,monitor:Nt({...i,...a})});let c="idle_after"in a?"monitor_idle":"lost_after"in a?"monitor_lost":"monitor_picture";this._flowEditing={key:`${c}|||||`,panel:"monitor"}},o=(a,c)=>(a??c)===0;return!o(i.idle_after,0)&&!o(i.lost_after,60)&&!((t.checks??[]).length&&o(i.picture_lost_after,60))?r``:r`<div class="flow-add">
      ${o(i.idle_after,0)?r`<button class="ltek-add" @click=${()=>s({idle_after:1800})}>+ ${this._t("flow.add_monitor_idle")}</button>`:p}
      ${o(i.lost_after,60)?r`<button class="ltek-add" @click=${()=>s({lost_after:60})}>+ ${this._t("flow.add_monitor_lost")}</button>`:p}
      ${(t.checks??[]).length&&o(i.picture_lost_after,60)?r`<button class="ltek-add" @click=${()=>s({picture_lost_after:60})}>+ ${this._t("flow.add_monitor_picture")}</button>`:p}
    </div>`}_flowMove(e,t,i){let s=(o,a,c)=>{let h=a+c;if(a<0||h<0||h>=o.length)return;let d=[...o];return[d[a],d[h]]=[d[h],d[a]],d};if(i.what==="device"&&i.device){let o=t.devices??[],a=s(o,o.indexOf(i.device),i.mode==="stop"?-i.dir:i.dir);a&&this._setActivity(e,{...t,devices:a})}else if(i.what==="step"){let o=s(t.steps??[],i.index,i.dir);o&&this._setActivity(e,{...t,steps:o})}else if(i.what==="check"){let o=s(t.checks??[],i.index,i.dir);o&&this._setActivity(e,{...t,checks:o})}}_flowDelete(e,t,i){let{row:s,header:o,device:a}=i;if(o==="steps"||s.kind==="step"&&s.step){let d=Number(s.step)-1;this._setActivity(e,{...t,steps:(t.steps??[]).filter((u,m)=>m!==d)});return}switch(s.kind){case"device":a&&this._setActivity(e,Ot(t,a));return;case"check":{let d=Number(s.check)-1,u=(t.checks??[]).filter((m,f)=>f!==d);this._setActivity(e,{...t,checks:u.length?u:void 0});return}case"hook":this._setActivity(e,{...t,[String(s.hook)]:[]});return;case"monitor_lost":case"monitor_picture":case"monitor_idle":{let d={monitor_lost:"lost_after",monitor_picture:"picture_lost_after",monitor_idle:"idle_after"}[s.kind];this._setActivity(e,{...t,monitor:Nt({...t.monitor??{},[d]:0})});return}case"monitor_watch":{let d=a?this.room.devices?.[a]:void 0;if(d&&a){let u=k({...d,watch:{...d.watch??{},mode:"off"}});this._emit({...this.room,devices:{...this.room.devices,[a]:u}})}return}case"started_by":{let d=Number(s.index)-1,u=t.started_by?.[d];if(!u)return;let m=[...t.started_by??[]];i.mode==="stop"?m[d]=k({...u,stop_state:void 0}):m.splice(d,1),this._setActivity(e,{...t,started_by:m.length?m:void 0});return}case"delay":case"wait_for":{if(!a)return;let d={...t.before?.[a]??{}};s.kind==="delay"?delete d.delay:delete d.wait_for,this._setActivity(e,jt(t,a,d));return}}let c=a?this.room.devices?.[a]:void 0;if(!c||!a)return;let h={...Dt(this.room,t,a)};if(s.kind==="status")h.wait_on="none";else if(s.kind==="wait")delete h.delay_after_on;else if(s.kind==="boot")delete h.delay_after_power;else if(s.kind==="ready")delete h.ready;else return;this._setActivity(e,zt(t,a,h,c))}_cardDivider(){return r`<div class="card-divider"><ha-icon icon="mdi:remote"></ha-icon>${this._t("card_divider")}</div>`}_renderActivityDevices(e,t,i,s){let o=c=>this._setActivity(e,{...t,devices:c}),a=i.filter(c=>!s.includes(c));return r`<div class="ltek-list">
      ${a.length?r`<select
            class="ltek-add add-select"
            aria-label=${this._t("add_device_to_activity")}
            @change=${c=>{let h=c.target;h.value&&o([...s,h.value]),h.value=""}}
          >
            <option value="" selected>+ ${this._t("add_device_short")}</option>
            ${a.map(c=>r`<option value=${c}>${this.room.devices?.[c]?.name??c}</option>`)}
          </select>`:p}
      ${s.map((c,h)=>{let d=this.room.devices?.[c],u=d?.entity_id?this.hass.entities?.[d.entity_id]?.platform:void 0;return r`<div class="ltek-item ordered-row">
          <span class="num">${h+1}</span>
          <ha-icon class="lead" icon=${d?this._deviceIcon(d):"mdi:help-circle-outline"}></ha-icon>
          <button class="ltek-item-text link" @click=${()=>this._show({kind:"device",id:c})}>
            <span class="ltek-name">${d?.name??c}</span>
            <span class="ltek-subline">${d?.entity_id??""}</span>
          </button>
          ${u?r`<span class="ltek-badge">${Rt(u)}</span>`:p}
          ${this._moveButtons(s,h,o)}
        </div>`})}
    </div>`}_activityGeneralChanged(e,t,i){let s=k({...t,name:i.name,icon:i.icon,order:i.order}),o=i.name?.trim();if(!o||o===t.name||!this._unsaved("activities",e)){this._setActivity(e,s);return}let a=C(B(o),Object.keys(this.room.activities??{}).filter(d=>d!==e));if(a===e){this._setActivity(e,s);return}let c={};for(let[d,u]of Object.entries(this.room.activities??{}))c[d===e?a:d]=d===e?s:u;let h={...this.room,activities:c};h.default_activity===e&&(h.default_activity=a),this._emit(h),this._view={kind:"activity",id:a}}_renderStep(e,t,i,s){let o=t.steps??[],a=c=>this._setActivity(e,{...t,steps:c});return r`<div class="step">
      <div class="step-head">
        <span class="title">${s+1}. ${this._t(`step.${i.type}`)}</span>
        ${this._moveButtons(o,s,a)}
      </div>
      <ltek-form
        .hass=${this.hass}
        .data=${i}
        .schema=${wi(this.hass,this.room,i,c=>this._t(c),this.sources,this.soundModes)}
        .computeLabel=${this._label}
        @value-changed=${c=>{let h=[...o];h[s]=k({...c.detail.value,type:i.type}),a(h)}}
      ></ltek-form>
    </div>`}_checkNote(e){let t=this.room.devices?.[e];if(!t?.entity_id)return p;let i=this._detectFor(t);if(!i)return p;let s=i.found?.picture,o=i.profile?.data?.picture,a=o?.ok??[],c=o?.fail??[],h=s?this.hass.states[s]?.attributes.friendly_name||s:"";return r`<p class="ltek-hint">
      ${s?a.length?this._t("step_picture_checks",{entity:h,states:a.join(` ${this._t("or")} `)}):this._t("check_unless_text",{entity:h,states:c.join(` ${this._t("or")} `)}):this._t("step_picture_none",{device:t.name??t.entity_id})}
    </p>`}_renderChecks(e,t){let i=t.checks??[],s=h=>this._setActivity(e,{...t,checks:h.length?h:void 0}),o=t.devices??[],c=o.filter(h=>{let d=this.room.devices?.[h];return d?.entity_id&&this._detectFor(d)?.found?.picture}).find(h=>!i.some(d=>d.device===h&&!d.entity_id))??o[0];return r`<div class="ltek-list">
      ${o.length?r`<button class="ltek-add" @click=${()=>s([...i,{device:c}])}>+ ${this._t("add_check")}</button>`:r`<p class="ltek-hint">${this._t("needs_devices")}</p>`}
      ${i.length?p:r`<p class="ltek-hint">${this._t("check_none")}</p>`}
      ${i.map((h,d)=>{let u=g=>{let v=[...i];v[d]=k({...h,...g}),s(v)},m=h.entity_id!==void 0,f=String(h.device??""),_=h.state??[];return r`<div class="step check">
          <div class="step-head">
            <span class="title"><span class="num">${d+1}</span> ${this.room.devices?.[f]?.name??f}</span>
            ${this._moveButtons(i,d,s)}
          </div>
          <div class="ltek-row">
            <label class="lbl">${this._t("field.device")}</label>
            <select @change=${g=>u({device:g.target.value})}>
              ${o.map(g=>r`<option value=${g} ?selected=${g===f}>${this.room.devices?.[g]?.name??g}</option>`)}
            </select>
          </div>
          <div class="ltek-row">
            <label class="lbl">${this._t("check_what")}</label>
            <select
              @change=${g=>g.target.value==="own"?u({entity_id:"",state:["on"]}):u({entity_id:void 0,state:void 0,debounce:void 0})}
            >
              <option value="profile" ?selected=${!m}>${this._t("check_profile")}</option>
              <option value="own" ?selected=${m}>${this._t("check_entity")}</option>
            </select>
          </div>
          ${m?r`<ltek-form
                  .hass=${this.hass}
                  .data=${{entity_id:h.entity_id||void 0}}
                  .schema=${[{name:"entity_id",selector:{entity:{}}}]}
                  .computeLabel=${()=>this._t("check_entity_label")}
                  @value-changed=${g=>u({entity_id:g.detail.value.entity_id??""})}
                ></ltek-form>
                <div class="ltek-row">
                  <label class="lbl">${this._t("check_states")}</label>
                  <input
                    type="text"
                    .value=${(Array.isArray(_)?_:[_]).join(", ")}
                    placeholder=${this._t("check_states_placeholder")}
                    @change=${g=>{let v=g.target.value.split(",").map(y=>y.trim()).filter(Boolean);u({state:v.length?v:void 0})}}
                  />
                </div>`:this._checkNote(f)}
          <ltek-form
            .hass=${this.hass}
            .data=${{timeout:h.timeout,on_failure:h.on_failure??"warn"}}
            .schema=${[{name:"timeout",selector:{number:{min:5,max:300,step:5,mode:"slider",unit_of_measurement:"s"}}},{name:"on_failure",required:!0,selector:{select:{options:[{value:"warn",label:this._t("check_warn")},{value:"stop",label:this._t("check_stop")}],mode:"dropdown"}}}]}
            .computeLabel=${g=>this._t(g.name==="timeout"?"check_timeout":"check_failure")}
            @value-changed=${g=>{let v=g.detail.value;u({timeout:v.timeout,on_failure:v.on_failure==="stop"?"stop":void 0})}}
          ></ltek-form>
          <label class="check">
            <input
              type="checkbox"
              .checked=${h.keep_checking!==!1}
              @change=${g=>u({keep_checking:g.target.checked?void 0:!1})}
            />
            ${this._t("check_keep")}
          </label>
        </div>`})}
    </div>`}_routesChanged(e,t,i){let s={};for(let o of H)i[o]==="__none"?s[o]=null:i[o]&&i[o]!=="__auto"&&(s[o]=i[o]);(i.touchpad==="on"||i.touchpad==="off")&&(s.touchpad=i.touchpad==="on"),t.remote?.buttons&&(s.buttons=t.remote.buttons),t.remote?.settings&&(s.settings=t.remote.settings),this._setActivity(e,{...t,remote:Object.keys(s).length?s:void 0})}_extrasChanged(e,t,i){let s=(t.remote?.buttons??[]).filter(be),o=[...Array.isArray(i.buttons)?i.buttons:[],...s],a={...t.remote,buttons:o};this._setActivity(e,{...t,remote:We(a),commands:i.activity_commands})}_renderQuickSelect(e,t){let i=t.remote?.buttons??[],s=i.filter(d=>!be(d)),o=i.filter(be),a=d=>{let u={...t.remote,buttons:[...s,...d]};this._setActivity(e,{...t,remote:We(u)})},c=(t.devices??[]).filter(d=>this.room.devices?.[d]?.entity_id?.startsWith("media_player.")),h=c.map(d=>({value:d,label:this.room.devices?.[d]?.name??d}));return r`${o.map((d,u)=>{let m=this.room.devices?.[d.device]?.entity_id;return r`<div class="step">
          <div class="step-head">
            <span class="title">${d.name||d.source||""}</span>
            ${this._moveButtons(o,u,a)}
          </div>
          <ltek-form
            .hass=${this.hass}
            .data=${{device:d.device,source:d.source,label:d.name,icon:d.icon}}
            .schema=${[{name:"device",required:!0,selector:{select:{options:h,mode:"dropdown"}}},{name:"source",required:!0,selector:{select:{options:xt(this.hass,this.sources,m),custom_value:!0,mode:"dropdown"}}},{name:"label",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]}
            .computeLabel=${this._label}
            .computeHelper=${this._helper}
            @value-changed=${f=>{let _=f.detail.value,g=[...o];g[u]=k({device:_.device,source:_.source??"",name:_.label,icon:_.icon},["source"]),a(g)}}
          ></ltek-form>
        </div>`})}
      ${c.length?r`<button class="ltek-add" @click=${()=>a([...o,{device:c[c.length-1],source:""}])}>
            + ${this._t("add_quick_select")}
          </button>`:r`<p class="ltek-hint">${this._t("quick_select_no_player")}</p>`}`}_settingList(e,t){let i=St[String(t)]??"source_list",s=i==="sound_mode_list"?this.soundModes:this.sources;return ve(this.hass,s,this.room.devices?.[String(e)]?.entity_id,i)}_describeSetting(e,t){let i=e.entity?e.name||this.hass.states[e.entity]?.attributes.friendly_name||e.entity||this._t("setting.entity"):this._t(`setting.${e.setting}`);if(!t)return i;let s=this.room.devices?.[String(e.device)];return`${i} (${s?.name??String(e.device)})`}_settingsMode(e,t,i){return r`<ltek-form
      .hass=${this.hass}
      .data=${{settings_mode:e?"chosen":"auto"}}
      .schema=${[{name:"settings_mode",required:!0,selector:{select:{options:[{value:"auto",label:this._t(t)},{value:"chosen",label:this._t("settings_chosen")}],mode:"dropdown"}}}]}
      .computeLabel=${this._label}
      @value-changed=${s=>{let o=s.detail.value.settings_mode==="chosen";o!==e&&i(o)}}
    ></ltek-form>`}_renderSettingItems(e,t,i,s){let o=c=>!!this.room.devices?.[String(c)]?.entity_id?.startsWith("media_player."),a=(i??[]).map(c=>({value:c,label:this.room.devices?.[c]?.name??c}));return r`${e.map((c,h)=>{let d=i?c.device:s,u=c.entity!==void 0?"entity":c.setting,m=o(d)?[...At,"entity"]:["entity"],f=c.entity,_=f?this.hass.states[f]?.attributes.options:void 0,g=u==="entity"?Array.isArray(_)?_.map(String):void 0:this._settingList(d,u);return r`<div class="step">
        <div class="step-head">
          <span class="title">${this._describeSetting(c,i!==null)}</span>
          ${this._moveButtons(e,h,t)}
        </div>
        <ltek-form
          .hass=${this.hass}
          .data=${{device:c.device,setting:u,entity:f,name:c.name,options:c.options??[]}}
          .schema=${[...i?[{name:"device",required:!0,selector:{select:{options:a,mode:"dropdown"}}}]:[],{name:"setting",required:!0,selector:{select:{options:m.map(v=>({value:v,label:this._t(`setting.${v}`)})),mode:"dropdown"}}},...u==="entity"?[{name:"entity",required:!0,selector:{entity:{filter:{domain:[...bi]}}}},{name:"name",selector:{text:{}}}]:[],...g!==void 0?[{name:"options",selector:{select:{options:g,multiple:!0,custom_value:!0,mode:"dropdown"}}}]:[]]}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${v=>{let y=v.detail.value,S=o(i?y.device:s)?y.setting:"entity",E=i?{device:y.device}:{},j=[...e];j[h]=S==="entity"?k({...E,entity:y.entity??"",name:y.name,options:y.options},["entity"]):k({...E,setting:S,options:y.options}),t(j)}}
        ></ltek-form>
      </div>`})}`}get _lists(){return{source_list:this.sources,sound_mode_list:this.soundModes}}_renderCardSettings(e,t){let i=t.remote?.settings,s=d=>{let u={...t.remote};d===void 0?delete u.settings:u.settings=d,this._setActivity(e,{...t,remote:We(u)})},o=yi(this.hass,this.room,t,this._lists,this._related),a=this._settingsMode(i!==void 0,"settings_auto",d=>s(d?o.map(u=>({...u})):void 0));if(i===void 0)return r`${a}
        ${o.length?this._settingColumns(o):r`<p class="ltek-hint">${this._t("settings_auto_none")}</p>`}`;let c=t.devices??[],h=c.filter(d=>this.room.devices?.[d]?.entity_id?.startsWith("media_player."));return r`${a}
      ${this._renderSettingItems(i,s,c)}
      ${i.length?p:r`<p class="ltek-hint">${this._t("settings_none")}</p>`}
      ${c.length?r`<button
            class="add"
            @click=${()=>s([...i,h.length?{device:h[0],setting:"sound_mode"}:{device:c[0],entity:""}])}
          >
            + ${this._t("add_setting")}
          </button>`:p}`}_settingColumns(e){return r`<div class="ltek-group first">${this._t("card_shows")}</div>
      <div class="columns">
        ${ki(this.hass,this.room,e).map(([t,i])=>{let s=new Set(i.map(o=>String(o.device)));return r`<div class="column">
            <div class="column-head">${t?Rt(t):this._t("other_integration")}</div>
            ${s.size===1?r`<div class="ltek-subline">${this.room.devices?.[[...s][0]]?.name??[...s][0]}</div>`:p}
            <ul>
              ${i.map(o=>r`<li>${this._describeSetting(o,s.size>1)}</li>`)}
            </ul>
          </div>`})}
      </div>`}_renderDeviceSettings(e,t){let i=t.settings,s=h=>{let d={...t};h===void 0?delete d.settings:d.settings=h,this._emit({...this.room,devices:{...this.room.devices,[e]:d}})},o=Et(this.hass,this.room,e,this._lists,this._related),a=this._settingsMode(i!==void 0,"device_settings_auto",h=>s(h?o.map(({device:d,...u})=>u):void 0));if(i===void 0)return r`${a}
        <p class="ltek-hint">
          ${o.length?this._t("settings_auto_shows",{list:o.map(h=>this._describeSetting(h,!1)).join(", ")}):this._t("device_settings_auto_none")}
        </p>`;let c=t.entity_id?.startsWith("media_player.");return r`${a}
      ${this._renderSettingItems(i,s,null,e)}
      ${i.length?p:r`<p class="ltek-hint">${this._t("device_settings_none")}</p>`}
      <button
        class="add"
        @click=${()=>s([...i,c?{setting:"sound_mode"}:{entity:""}])}
      >
        + ${this._t("add_setting")}
      </button>`}_addActivity(){let e=this._t("new_activity"),t=C(B(e),Object.keys(this.room.activities??{}));this._setActivity(t,{name:e,devices:[]}),this._show({kind:"activity",id:t})}_duplicateActivity(e,t){let i=`${t.name??e} ${this._t("copy_suffix")}`,s=C(B(i),Object.keys(this.room.activities??{})),o=k({...JSON.parse(JSON.stringify(t)),name:i,order:t.order!==void 0?t.order+1:void 0,started_by:void 0});this._emit({...this.room,activities:{...this.room.activities,[s]:o}}),this._show({kind:"activity",id:s})}_deleteActivity(e,t){if(!window.confirm(`${this._t("delete")}: ${t.name??e}?`))return;let i={...this.room.activities};delete i[e];let s={...this.room,activities:i};s.default_activity===e&&delete s.default_activity,this._emit(s),this._show({kind:"list"})}_renderYaml(){return r`<p class="ltek-hint">${this._t("yaml_intro")}</p>
      <ltek-form
        .hass=${this.hass}
        .data=${{yaml:this.room}}
        .schema=${[{name:"yaml",selector:{object:{}}}]}
        .computeLabel=${()=>""}
        @value-changed=${e=>{let t=e.detail.value.yaml;t&&typeof t=="object"&&!Array.isArray(t)&&this._emit(t)}}
      ></ltek-form>`}_moveButtons(e,t,i){let s=o=>{let a=[...e],[c]=a.splice(t,1);a.splice(o,0,c),i(a)};return r`<span class="move">
      <button class="ltek-act" title=${this._t("move_up")} aria-label=${this._t("move_up")} ?disabled=${t===0} @click=${()=>s(t-1)}>
        <ha-icon icon="mdi:arrow-up"></ha-icon>
      </button>
      <button class="ltek-act" title=${this._t("move_down")} aria-label=${this._t("move_down")} ?disabled=${t===e.length-1} @click=${()=>s(t+1)}>
        <ha-icon icon="mdi:arrow-down"></ha-icon>
      </button>
      <button class="ltek-del" title=${this._t("delete")} aria-label=${this._t("delete")} @click=${()=>i(e.filter((o,a)=>a!==t))}>
        <ha-icon icon="mdi:trash-can-outline"></ha-icon>
      </button>
    </span>`}_picker(e,t,i){return r`<ltek-form
      class="picker"
      .hass=${this.hass}
      .data=${{pick:void 0}}
      .schema=${[{name:"pick",selector:{select:{options:t,mode:"dropdown"}}}]}
      .computeLabel=${()=>e}
      @value-changed=${s=>{let o=s.detail.value.pick;o&&(i(o),s.target.requestUpdate())}}
    ></ltek-form>`}};Ae.properties={hass:{attribute:!1},room:{attribute:!1},roomId:{attribute:!1},sources:{attribute:!1},soundModes:{attribute:!1},saved:{attribute:!1},_tab:{state:!0},_view:{state:!0},_notice:{state:!0},_related:{state:!0},_detect:{state:!0},profiles:{attribute:!1},jump:{attribute:!1},_powerOn:{state:!0},_flowEditing:{state:!0},_draftStartedBy:{state:!0},_general:{state:!0},_run:{state:!0},_io:{state:!0}},Ae.styles=[$,A,x,w`
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
    .detail-head .head-acts {
      margin-left: auto;
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
    .ltek-item .lead.good {
      color: var(--success-color, #43a047);
    }
    .watchdog-now {
      margin-bottom: 8px;
    }
    .ltek-item .lead.bad {
      color: var(--error-color, #db4437);
    }
    .io {
      margin-top: 4px;
    }
    dialog.io {
      border: 1px solid var(--ltek-c-accent);
      border-radius: var(--ltek-r-panel);
      background: var(--card-background-color, #1c1c1c);
      color: var(--ltek-c-text);
      padding: 0;
      width: min(640px, 92vw);
    }
    dialog.io::backdrop {
      background: rgba(0, 0, 0, 0.55);
    }
    dialog.io .dialog-body {
      display: flex;
      flex-direction: column;
      gap: var(--ltek-sp-3);
      padding: 16px;
    }
    dialog.io textarea.ltek-text {
      font-family: var(--code-font-family, monospace);
      font-size: var(--ltek-fs-small);
      resize: vertical;
    }
    .enabled-toggle {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-right: 8px;
      font-size: var(--ltek-fs-small);
      color: var(--secondary-text-color);
      cursor: pointer;
    }
    .enabled-toggle.off {
      color: var(--warning-color, #ffa600);
    }
    .head-acts {
      display: flex;
      gap: 8px;
    }
    .gen-head {
      display: flex;
      align-items: center;
      gap: var(--ltek-sp-3);
      flex-wrap: wrap;
      margin: 8px 0 16px;
      padding: 14px 16px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: var(--ltek-c-surface, var(--card-background-color));
    }
    .gen-head.editing {
      border-color: var(--ltek-c-accent);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      margin-bottom: 0;
    }
    .gen-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: color-mix(in srgb, var(--ltek-c-accent) 14%, transparent);
      color: var(--ltek-c-accent);
      --mdc-icon-size: 28px;
      flex: none;
    }
    .gen-text {
      flex: 1;
      min-width: 0;
    }
    .gen-head h2 {
      margin: 0;
      font-size: 1.5em;
      font-weight: var(--ltek-fw-semibold, 600);
      line-height: 1.2;
    }
    .gen-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 16px;
      margin-top: 4px;
      font-size: var(--ltek-fs-small);
      color: var(--secondary-text-color);
      --mdc-icon-size: 15px;
    }
    .gen-meta span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    button.gen-lock {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      padding: 0;
      border: 1px solid var(--divider-color);
      border-radius: 50%;
      background: none;
      color: var(--secondary-text-color);
      cursor: pointer;
      --mdc-icon-size: 16px;
      flex: none;
      align-self: flex-start;
    }
    button.gen-lock:hover,
    button.gen-lock.open {
      color: var(--ltek-c-accent);
      border-color: var(--ltek-c-accent);
    }
    .gen-edit {
      margin: 0 0 16px;
      padding: 12px 16px;
      border: 1px solid var(--ltek-c-accent);
      border-top: none;
      border-radius: 0 0 12px 12px;
    }
    .gen-bar {
      display: flex;
      gap: var(--ltek-sp-2);
      padding-top: 10px;
    }
    .gen-bar .ltek-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--ltek-sp-1);
      --mdc-icon-size: 16px;
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
  `];customElements.get("easy-av-control-room-editor")||customElements.define("easy-av-control-room-editor",Ae);function Hi(l,n,e){if(!["power_on","power_off","set_source","set_volume","set_sound_mode","set_brightness","set_color_temp","set_position","set_tilt"].includes(l))return{type:l};let i=(n.devices??[])[0]??Object.keys(e.devices??{})[0];return i?{type:l,device:i}:{type:l}}function Rn(l,n){return l.find(e=>!n.some(t=>t.device===e&&!t.entity_id))??l[0]}function Nt(l){let n=l.idle_after_min!==void 0?Number(l.idle_after_min)*60:Number(l.idle_after??0),e=l.idle_warning_min!==void 0?Number(l.idle_warning_min)*60:Number(l.idle_warning??300),t=k({lost_after:Number(l.lost_after??60)===60?void 0:Number(l.lost_after),picture_lost_after:Number(l.picture_lost_after??60)===60?void 0:Number(l.picture_lost_after),idle_after:n||void 0,idle_warning:!n||e===300?void 0:e},["lost_after","picture_lost_after"].filter(i=>Number(l[i])===0));return Object.keys(t).length?t:void 0}async function On(){if(customElements.get("ha-form")&&customElements.get("ha-selector"))return;await(await(await window.loadCardHelpers()).createCardElement({type:"entities",entities:[]})).constructor.getConfigElement(),await customElements.whenDefined("ha-form")}var Se=class extends b{constructor(){super();this._back="room";this._original="";this._loading=!1;this._saving=!1,this._ready=!1,this._sources={},this._soundModes={},this._adding=!1,this._profiles=[],this._page="room"}async _loadProfiles(){this._profiles=await this.hass.callWS({type:"easy_av_control/profiles/list"}).catch(()=>[])}_t(e,t){return T(this.hass?.language,e,t)}async _load(){this._loading=!0;try{await On(),this._ready=!0;let e=await this.hass.callWS({type:"easy_av_control/config/get"});this._entryId=e.entry_id,this._version=e.version,this.hass.callWS({type:"easy_av_control/ui/sidebar"}).then(t=>this._sidebar=t.visible).catch(()=>{}),this._revision=e.revision,this._original=JSON.stringify(e.rooms),this._rooms=e.rooms,this._banner=void 0,(!this._selected||!(this._selected in e.rooms))&&(this._selected=Object.keys(e.rooms)[0]),this._loadProfiles(),[this._sources,this._soundModes]=await Promise.all(["source_list","sound_mode_list"].map(t=>this.hass.callWS({type:"easy_av_control/config/sources",attribute:t}).catch(()=>({}))))}catch(e){this._loadError=e?.message??String(e)}finally{this._loading=!1}}get _dirty(){return this._rooms!==void 0&&JSON.stringify(this._rooms)!==this._original}_roomChanged(e,t){this._rooms={...this._rooms,[e]:t},this._banner?.kind!=="conflict"&&(this._banner=void 0)}_addRoom(e){if(this._adding=!1,!e.trim())return;let t=C(B(e),Object.keys(this._rooms??{}));this._rooms={...this._rooms,[t]:{name:e.trim(),devices:{},activities:{}}},this._selected=t}_renderAddRoom(){return this._adding?r`<form class="new-room" @submit=${t=>{t.preventDefault();let i=t.target.querySelector("input");this._addRoom(i.value)}}>
      <input
        aria-label=${this._t("add_room_name")}
        placeholder=${this._t("add_room_name")}
        @keydown=${t=>t.key==="Escape"&&(this._adding=!1)}
      />
      <div class="new-room-buttons">
        <button type="button" class="flat" @click=${()=>this._adding=!1}>${this._t("cancel")}</button>
        <button type="submit" class="primary">${this._t("create")}</button>
      </div>
    </form>`:r`<button class="room add" @click=${()=>this._adding=!0}>+ ${this._t("add_room")}</button>`}updated(e){this.hass&&!this._rooms&&!this._loading&&!this._loadError&&this._load(),e.has("_adding")&&this._adding&&this.shadowRoot?.querySelector("form.new-room input")?.focus()}_deleteRoom(e){let t=this._rooms?.[e];if(!t||!window.confirm(this._t("delete_room_confirm",{name:t.name??e})))return;let i={...this._rooms};delete i[e],this._rooms=i,this._selected=Object.keys(i)[0]}_discard(){this._rooms=JSON.parse(this._original),this._banner=void 0,(!this._selected||!(this._selected in this._rooms))&&(this._selected=Object.keys(this._rooms)[0])}_reload(){this._dirty&&!window.confirm(this._t("reload_confirm"))||(this._loadError=void 0,this._load())}async _save(e=!1){if(!this._rooms||!this._revision)return;let t=this._rooms,i={};for(let[s,o]of Object.entries(t))i[s]=k(o);this._saving=!0;try{let s=await this.hass.callWS({type:"easy_av_control/config/validate",rooms:i});if(s.error){this._banner={kind:"invalid",path:s.error.path.join("."),message:s.error.message};return}if(s.missing.length&&!e){this._banner={kind:"missing",missing:s.missing};return}let o=await this.hass.callWS({type:"easy_av_control/config/save",rooms:i,revision:this._revision,entry_id:this._entryId});this._revision=o.revision,this._original=JSON.stringify(i),this._rooms===t&&(this._rooms=i),this._banner={kind:"saved"},this._loadProfiles()}catch(s){let o=s;this._banner=o.code==="conflict"?{kind:"conflict"}:{kind:"invalid",path:"",message:o.message??String(s)}}finally{this._saving=!1}}render(){return r`
      <div class="toolbar">
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <div class="main-title">${this._t("title")}</div>
        ${this._dirty?r`<span class="dirty">${this._t("unsaved")}</span>`:p}
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
        ${this._adding?this._renderAddRoom():p}
        ${e.map(([i,s])=>r`<button
            class="room ${this._page==="room"&&i===t&&!this._openActivity?"active":""}"
            @click=${()=>this._goRoom(i)}
          >
            ${s.name??i}
          </button>
          ${qe(s).map(([o,a])=>r`<div
              class="nav-activity ${this._page==="room"&&i===t&&this._openActivity===o?"active":""} ${a.enabled===!1?"disabled":""}"
            >
              <button class="nav-act-name" @click=${()=>this._goActivity(i,o,!1)}>
                <ha-icon icon=${a.icon??"mdi:play-circle-outline"}></ha-icon>
                <span>${a.name??o}</span>
              </button>
              <button
                class="ltek-act nav-flow"
                title=${this._t("nav_flow")}
                aria-label=${this._t("nav_flow")}
                @click=${()=>this._goActivity(i,o,!0)}
              >
                <ha-icon icon="mdi:sitemap-outline"></ha-icon>
              </button>
            </div>`)}
`)}
        <div class="nav-title library">${this._t("setup")}</div>
        <button class="room ${this._page==="quickstart"?"active":""}" @click=${()=>this._page="quickstart"}>
          <ha-icon icon="mdi:rocket-launch-outline"></ha-icon> ${this._t("qs.title")}
        </button>
        <button class="room ${this._page==="detect"?"active":""}" @click=${()=>this._page="detect"}>
          <ha-icon icon="mdi:auto-fix"></ha-icon> ${this._t("detect")}
        </button>
        <button class="room ${this._page==="profiles"?"active":""}" @click=${()=>this._page="profiles"}>
          <ha-icon icon="mdi:package-variant-closed"></ha-icon> ${this._t("profiles")}
        </button>
        <button class="room ${this._page==="reports"?"active":""}" @click=${()=>this._page="reports"}>
          <ha-icon icon="mdi:chart-timeline-variant"></ha-icon> ${this._t("reports")}
        </button>
        <button class="room ${this._page==="notifications"?"active":""}" @click=${()=>this._page="notifications"}>
          <ha-icon icon="mdi:bell-ring-outline"></ha-icon> ${this._t("ntf.title")}
        </button>
        <button class="room ${this._page==="guide"?"active":""}" @click=${()=>this._openGuide()}>
          <ha-icon icon="mdi:help-circle-outline"></ha-icon> ${this._t("guide")}
        </button>
        ${this._sidebar===void 0?p:r`<button
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
          <a class="ltek-star" href=${J} target="_blank" rel="noopener">${this._t("star")}</a>
          <a class="ltek-issue" href="${J}/issues" target="_blank" rel="noopener">${this._t("report")}</a>
          ${this._version?r`<div class="ltek-foot">${this._t("footer_version",{version:this._version})}</div>`:p}
        </div>
      </nav>
      <main>
        ${this._renderBanner()}
        ${this._page==="quickstart"||this._page==="room"&&!e.length?r`<easy-av-control-quick-start
              .hass=${this.hass}
              @open-page=${i=>this._openLink(i.detail.page)}
            ></easy-av-control-quick-start>`:this._page==="guide"?r`<easy-av-control-guide
              .language=${this.hass.language}
              @close=${()=>this._page=this._back}
            ></easy-av-control-guide>`:this._page==="reports"?r`<easy-av-control-reports .hass=${this.hass}></easy-av-control-reports>`:this._page==="notifications"?r`<easy-av-control-notifications .hass=${this.hass}></easy-av-control-notifications>`:this._page==="detect"?r`<easy-av-control-detect
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
                @save-request=${()=>{this._save()}}
                .jump=${this._jump}
                @view-changed=${i=>{let s=i.detail.view;this._openActivity=s.kind==="activity"?s.id:void 0}}
                @open-page=${i=>this._page=i.detail.page}
              ></easy-av-control-room-editor>`:r`<div class="empty">${this._t("no_rooms")}</div>`}
      </main>
    </div>`}_openLink(e){if(e==="rooms"||e==="activities"){let t=this._selected??Object.keys(this._rooms??{})[0];if(!t){this._adding=!0,this._page="room";return}this._selected=t,this._page="room",this._openActivity=void 0,this._jump={flow:!1,tab:e==="activities"?"activities":"devices",n:(this._jump?.n??0)+1};return}this._page=e}_goRoom(e){this._selected=e,this._page="room",this._openActivity=void 0,this._jump={flow:!1,n:(this._jump?.n??0)+1}}_openGuide(){this._page!=="guide"&&(this._back=this._page),this._page="guide",window.scrollTo({top:0})}async _setSidebar(e){this._sidebar=e;try{let t=await this.hass.callWS({type:"easy_av_control/ui/sidebar",visible:e});this._sidebar=t.visible}catch{this._sidebar=!e}}_goActivity(e,t,i){this._selected=e,this._page="room",this._jump={activity:t,flow:i,n:(this._jump?.n??0)+1}}_renderBanner(){let e=this._banner;if(!e)return p;switch(e.kind){case"saved":return r`<div class="banner ok">${this._t("saved")}</div>`;case"applied":return r`<div class="banner warning">${this._t("detect_applied")}</div>`;case"invalid":return r`<div class="banner error">
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
        </div>`}}};Se.properties={hass:{attribute:!1},narrow:{type:Boolean},_rooms:{state:!0},_selected:{state:!0},_loadError:{state:!0},_banner:{state:!0},_saving:{state:!0},_ready:{state:!0},_sources:{state:!0},_soundModes:{state:!0},_adding:{state:!0},_profiles:{state:!0},_page:{state:!0},_draftFor:{state:!0},_focusProfile:{state:!0},_version:{state:!0},_jump:{state:!0},_sidebar:{state:!0},_openActivity:{state:!0}},Se.styles=[$,A,x,w`
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
    .nav-activity.disabled .nav-act-name {
        opacity: 0.5;
        text-decoration: line-through;
      }
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
  `];customElements.get("easy-av-control-panel")||customElements.define("easy-av-control-panel",Se);export{Se as EasyAvControlPanel};
