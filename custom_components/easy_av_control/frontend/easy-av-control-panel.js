var re=globalThis,ae=re.ShadowRoot&&(re.ShadyCSS===void 0||re.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,xe=Symbol(),Qe=new WeakMap,G=class{constructor(s,e,t){if(this._$cssResult$=!0,t!==xe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=s,this.t=e}get styleSheet(){let s=this.o,e=this.t;if(ae&&s===void 0){let t=e!==void 0&&e.length===1;t&&(s=Qe.get(e)),s===void 0&&((this.o=s=new CSSStyleSheet).replaceSync(this.cssText),t&&Qe.set(e,s))}return s}toString(){return this.cssText}},le=r=>new G(typeof r=="string"?r:r+"",void 0,xe),v=(r,...s)=>{let e=r.length===1?r[0]:s.reduce((t,i,n)=>t+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new G(e,r,xe)},Xe=(r,s)=>{if(ae)r.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of s){let t=document.createElement("style"),i=re.litNonce;i!==void 0&&t.setAttribute("nonce",i),t.textContent=e.cssText,r.appendChild(t)}},Ae=ae?r=>r:r=>r instanceof CSSStyleSheet?(s=>{let e="";for(let t of s.cssRules)e+=t.cssText;return le(e)})(r):r;var{is:It,defineProperty:Mt,getOwnPropertyDescriptor:Lt,getOwnPropertyNames:Ht,getOwnPropertySymbols:Gt,getPrototypeOf:Bt}=Object,de=globalThis,Je=de.trustedTypes,Wt=Je?Je.emptyScript:"",Ut=de.reactiveElementPolyfillSupport,B=(r,s)=>r,Se={toAttribute(r,s){switch(s){case Boolean:r=r?Wt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,s){let e=r;switch(s){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},tt=(r,s)=>!It(r,s),et={attribute:!0,type:String,converter:Se,reflect:!1,useDefault:!1,hasChanged:tt};Symbol.metadata??=Symbol("metadata"),de.litPropertyMetadata??=new WeakMap;var S=class extends HTMLElement{static addInitializer(s){this._$Ei(),(this.l??=[]).push(s)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(s,e=et){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(s)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(s,e),!e.noAccessor){let t=Symbol(),i=this.getPropertyDescriptor(s,t,e);i!==void 0&&Mt(this.prototype,s,i)}}static getPropertyDescriptor(s,e,t){let{get:i,set:n}=Lt(this.prototype,s)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let d=i?.call(this);n?.call(this,o),this.requestUpdate(s,d,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(s){return this.elementProperties.get(s)??et}static _$Ei(){if(this.hasOwnProperty(B("elementProperties")))return;let s=Bt(this);s.finalize(),s.l!==void 0&&(this.l=[...s.l]),this.elementProperties=new Map(s.elementProperties)}static finalize(){if(this.hasOwnProperty(B("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(B("properties"))){let e=this.properties,t=[...Ht(e),...Gt(e)];for(let i of t)this.createProperty(i,e[i])}let s=this[Symbol.metadata];if(s!==null){let e=litPropertyMetadata.get(s);if(e!==void 0)for(let[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let i=this._$Eu(e,t);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(s){let e=[];if(Array.isArray(s)){let t=new Set(s.flat(1/0).reverse());for(let i of t)e.unshift(Ae(i))}else s!==void 0&&e.push(Ae(s));return e}static _$Eu(s,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof s=="string"?s.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(s=>this.enableUpdating=s),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(s=>s(this))}addController(s){(this._$EO??=new Set).add(s),this.renderRoot!==void 0&&this.isConnected&&s.hostConnected?.()}removeController(s){this._$EO?.delete(s)}_$E_(){let s=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(s.set(t,this[t]),delete this[t]);s.size>0&&(this._$Ep=s)}createRenderRoot(){let s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Xe(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(s=>s.hostConnected?.())}enableUpdating(s){}disconnectedCallback(){this._$EO?.forEach(s=>s.hostDisconnected?.())}attributeChangedCallback(s,e,t){this._$AK(s,t)}_$ET(s,e){let t=this.constructor.elementProperties.get(s),i=this.constructor._$Eu(s,t);if(i!==void 0&&t.reflect===!0){let n=(t.converter?.toAttribute!==void 0?t.converter:Se).toAttribute(e,t.type);this._$Em=s,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(s,e){let t=this.constructor,i=t._$Eh.get(s);if(i!==void 0&&this._$Em!==i){let n=t.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Se;this._$Em=i;let d=o.fromAttribute(e,n.type);this[i]=d??this._$Ej?.get(i)??d,this._$Em=null}}requestUpdate(s,e,t,i=!1,n){if(s!==void 0){let o=this.constructor;if(i===!1&&(n=this[s]),t??=o.getPropertyOptions(s),!((t.hasChanged??tt)(n,e)||t.useDefault&&t.reflect&&n===this._$Ej?.get(s)&&!this.hasAttribute(o._$Eu(s,t))))return;this.C(s,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(s,e,{useDefault:t,reflect:i,wrapped:n},o){t&&!(this._$Ej??=new Map).has(s)&&(this._$Ej.set(s,o??e??this[s]),n!==!0||o!==void 0)||(this._$AL.has(s)||(this.hasUpdated||t||(e=void 0),this._$AL.set(s,e)),i===!0&&this._$Em!==s&&(this._$Eq??=new Set).add(s))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let s=this.scheduleUpdate();return s!=null&&await s,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[i,n]of t){let{wrapped:o}=n,d=this[i];o!==!0||this._$AL.has(i)||d===void 0||this.C(i,void 0,n,d)}}let s=!1,e=this._$AL;try{s=this.shouldUpdate(e),s?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw s=!1,this._$EM(),t}s&&this._$AE(e)}willUpdate(s){}_$AE(s){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(s)),this.updated(s)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(s){return!0}update(s){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(s){}firstUpdated(s){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[B("elementProperties")]=new Map,S[B("finalized")]=new Map,Ut?.({ReactiveElement:S}),(de.reactiveElementVersions??=[]).push("2.1.2");var Te=globalThis,it=r=>r,ce=Te.trustedTypes,st=ce?ce.createPolicy("lit-html",{createHTML:r=>r}):void 0,Re="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,Oe="?"+E,Kt=`<${Oe}>`,D=document,U=()=>D.createComment(""),K=r=>r===null||typeof r!="object"&&typeof r!="function",Ce=Array.isArray,dt=r=>Ce(r)||typeof r?.[Symbol.iterator]=="function",Ee=`[ 	
\f\r]`,W=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,nt=/-->/g,ot=/>/g,C=RegExp(`>|${Ee}(?:([^\\s"'>=/]+)(${Ee}*=${Ee}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),rt=/'/g,at=/"/g,ct=/^(?:script|style|textarea|title)$/i,Pe=r=>(s,...e)=>({_$litType$:r,strings:s,values:e}),a=Pe(1),wi=Pe(2),ki=Pe(3),k=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),lt=new WeakMap,P=D.createTreeWalker(D,129);function ut(r,s){if(!Ce(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return st!==void 0?st.createHTML(s):s}var pt=(r,s)=>{let e=r.length-1,t=[],i,n=s===2?"<svg>":s===3?"<math>":"",o=W;for(let d=0;d<e;d++){let l=r[d],c,u,h=-1,m=0;for(;m<l.length&&(o.lastIndex=m,u=o.exec(l),u!==null);)m=o.lastIndex,o===W?u[1]==="!--"?o=nt:u[1]!==void 0?o=ot:u[2]!==void 0?(ct.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=C):u[3]!==void 0&&(o=C):o===C?u[0]===">"?(o=i??W,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,c=u[1],o=u[3]===void 0?C:u[3]==='"'?at:rt):o===at||o===rt?o=C:o===nt||o===ot?o=W:(o=C,i=void 0);let f=o===C&&r[d+1].startsWith("/>")?" ":"";n+=o===W?l+Kt:h>=0?(t.push(c),l.slice(0,h)+Re+l.slice(h)+E+f):l+E+(h===-2?d:f)}return[ut(r,n+(r[e]||"<?>")+(s===2?"</svg>":s===3?"</math>":"")),t]},q=class r{constructor({strings:s,_$litType$:e},t){let i;this.parts=[];let n=0,o=0,d=s.length-1,l=this.parts,[c,u]=pt(s,e);if(this.el=r.createElement(c,t),P.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=P.nextNode())!==null&&l.length<d;){if(i.nodeType===1){if(i.hasAttributes())for(let h of i.getAttributeNames())if(h.endsWith(Re)){let m=u[o++],f=i.getAttribute(h).split(E),_=/([.?@])?(.*)/.exec(m);l.push({type:1,index:n,name:_[2],strings:f,ctor:_[1]==="."?pe:_[1]==="?"?he:_[1]==="@"?me:z}),i.removeAttribute(h)}else h.startsWith(E)&&(l.push({type:6,index:n}),i.removeAttribute(h));if(ct.test(i.tagName)){let h=i.textContent.split(E),m=h.length-1;if(m>0){i.textContent=ce?ce.emptyScript:"";for(let f=0;f<m;f++)i.append(h[f],U()),P.nextNode(),l.push({type:2,index:++n});i.append(h[m],U())}}}else if(i.nodeType===8)if(i.data===Oe)l.push({type:2,index:n});else{let h=-1;for(;(h=i.data.indexOf(E,h+1))!==-1;)l.push({type:7,index:n}),h+=E.length-1}n++}}static createElement(s,e){let t=D.createElement("template");return t.innerHTML=s,t}};function j(r,s,e=r,t){if(s===k)return s;let i=t!==void 0?e._$Co?.[t]:e._$Cl,n=K(s)?void 0:s._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,t)),t!==void 0?(e._$Co??=[])[t]=i:e._$Cl=i),i!==void 0&&(s=j(r,i._$AS(r,s.values),i,t)),s}var ue=class{constructor(s,e){this._$AV=[],this._$AN=void 0,this._$AD=s,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(s){let{el:{content:e},parts:t}=this._$AD,i=(s?.creationScope??D).importNode(e,!0);P.currentNode=i;let n=P.nextNode(),o=0,d=0,l=t[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new M(n,n.nextSibling,this,s):l.type===1?c=new l.ctor(n,l.name,l.strings,this,s):l.type===6&&(c=new _e(n,this,s)),this._$AV.push(c),l=t[++d]}o!==l?.index&&(n=P.nextNode(),o++)}return P.currentNode=D,i}p(s){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(s,t,e),e+=t.strings.length-2):t._$AI(s[e])),e++}},M=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(s,e,t,i){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=s,this._$AB=e,this._$AM=t,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let s=this._$AA.parentNode,e=this._$AM;return e!==void 0&&s?.nodeType===11&&(s=e.parentNode),s}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(s,e=this){s=j(this,s,e),K(s)?s===p||s==null||s===""?(this._$AH!==p&&this._$AR(),this._$AH=p):s!==this._$AH&&s!==k&&this._(s):s._$litType$!==void 0?this.$(s):s.nodeType!==void 0?this.T(s):dt(s)?this.k(s):this._(s)}O(s){return this._$AA.parentNode.insertBefore(s,this._$AB)}T(s){this._$AH!==s&&(this._$AR(),this._$AH=this.O(s))}_(s){this._$AH!==p&&K(this._$AH)?this._$AA.nextSibling.data=s:this.T(D.createTextNode(s)),this._$AH=s}$(s){let{values:e,_$litType$:t}=s,i=typeof t=="number"?this._$AC(s):(t.el===void 0&&(t.el=q.createElement(ut(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new ue(i,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(s){let e=lt.get(s.strings);return e===void 0&&lt.set(s.strings,e=new q(s)),e}k(s){Ce(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,i=0;for(let n of s)i===e.length?e.push(t=new r(this.O(U()),this.O(U()),this,this.options)):t=e[i],t._$AI(n),i++;i<e.length&&(this._$AR(t&&t._$AB.nextSibling,i),e.length=i)}_$AR(s=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);s!==this._$AB;){let t=it(s).nextSibling;it(s).remove(),s=t}}setConnected(s){this._$AM===void 0&&(this._$Cv=s,this._$AP?.(s))}},z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(s,e,t,i,n){this.type=1,this._$AH=p,this._$AN=void 0,this.element=s,this.name=e,this._$AM=i,this.options=n,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=p}_$AI(s,e=this,t,i){let n=this.strings,o=!1;if(n===void 0)s=j(this,s,e,0),o=!K(s)||s!==this._$AH&&s!==k,o&&(this._$AH=s);else{let d=s,l,c;for(s=n[0],l=0;l<n.length-1;l++)c=j(this,d[t+l],e,l),c===k&&(c=this._$AH[l]),o||=!K(c)||c!==this._$AH[l],c===p?s=p:s!==p&&(s+=(c??"")+n[l+1]),this._$AH[l]=c}o&&!i&&this.j(s)}j(s){s===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,s??"")}},pe=class extends z{constructor(){super(...arguments),this.type=3}j(s){this.element[this.name]=s===p?void 0:s}},he=class extends z{constructor(){super(...arguments),this.type=4}j(s){this.element.toggleAttribute(this.name,!!s&&s!==p)}},me=class extends z{constructor(s,e,t,i,n){super(s,e,t,i,n),this.type=5}_$AI(s,e=this){if((s=j(this,s,e,0)??p)===k)return;let t=this._$AH,i=s===p&&t!==p||s.capture!==t.capture||s.once!==t.once||s.passive!==t.passive,n=s!==p&&(t===p||i);i&&this.element.removeEventListener(this.name,this,t),n&&this.element.addEventListener(this.name,this,s),this._$AH=s}handleEvent(s){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,s):this._$AH.handleEvent(s)}},_e=class{constructor(s,e,t){this.element=s,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(s){j(this,s)}},ht={M:Re,P:E,A:Oe,C:1,L:pt,R:ue,D:dt,V:j,I:M,H:z,N:he,U:me,B:pe,F:_e},qt=Te.litHtmlPolyfillSupport;qt?.(q,M),(Te.litHtmlVersions??=[]).push("3.3.3");var mt=(r,s,e)=>{let t=e?.renderBefore??s,i=t._$litPart$;if(i===void 0){let n=e?.renderBefore??null;t._$litPart$=i=new M(s.insertBefore(U(),n),n,void 0,e??{})}return i._$AI(r),i};var De=globalThis,g=class extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let s=super.createRenderRoot();return this.renderOptions.renderBefore??=s.firstChild,s}update(s){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(s),this._$Do=mt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};g._$litElement$=!0,g.finalized=!0,De.litElementHydrateSupport?.({LitElement:g});var Ft=De.litElementPolyfillSupport;Ft?.({LitElement:g});(De.litElementVersions??=[]).push("4.2.2");var Yt=`
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
    ${le(Yt)}
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
`,T="https://github.com/Ltek/easy-av-control";var _t="https://github.com/Ltek/easy-av-control#readme",gt="easy-av-control-guide-open",ft={en:{title:"Guide",steps_title:"How it works",steps:[a`<b>Add the devices</b> of the room under <i>Devices</i>: pick each device's entity. If it hangs on a
        switchable outlet, enter it under <i>Power</i>. If it loses its connection without power (Apple TV), use
        the recommended button under <i>Connection check</i>.`,a`<b>Put together activities</b> under <i>Activities</i>: choose the devices in the order they are
        switched on, and under <i>Start sequence</i> for example the TV's input. Quick-select buttons start apps.`,a`<b>Save and add the card:</b> save at the top right. On a dashboard, add a card, search for
        <i>Easy AV Control Remote</i> and choose the room.`],terms_title:"Terms",terms:[["Outlet","Switch that powers the device. Switched on first and off last; outlets shared by several devices stay on while one of them is needed."],["Boot time","Wait after the outlet came on, before the device is switched on. Only when the outlet was off."],["Waiting times","After switching on: until the device accepts commands. After switching off: cool-down, e.g. for a projector lamp."],["Connection check","Waits until the device is reachable in Home Assistant, at the start and before remote buttons; can reload its integration until it connects."],["Start sequence","Settings once all devices are on: input, volume, sound mode, any action."],["Remote control","Which device gets volume, channels, playback and arrow keys. Automatic: volume to the first media player, the rest to the last."],["Quick select","Buttons that switch a media player to a source, on an Apple TV to an app."],["Settings in the card","On a device: source, sound mode and entities such as tone controls, changeable in the card in every activity that uses it; automatic or chosen with favourites. An activity can choose its own."]],example_title:"Example: TV and Apple TV",example:[a`Device <i>TV</i>: entity <code>media_player.tv</code>, outlet <code>switch.tv_outlet</code>, boot time
        15 s, wait after switching on 10 s.`,a`Device <i>Apple TV</i>: entity <code>media_player.apple_tv</code>, under <i>Connection check</i> the
        button <i>Use remote.apple_tv for the connection check and the arrow keys</i>.`,a`Activity <i>Apple TV</i>: devices TV, then Apple TV; start sequence <i>Set source</i> on the TV to its
        HDMI input; quick select Apple TV with Netflix.`,a`Save, add the card, start the activity.`],docs:a`All options and the YAML reference: <a href=${_t} target="_blank" rel="noreferrer">documentation on GitHub</a>.`},de:{title:"Anleitung",steps_title:"So geht's",steps:[a`<b>Geräte anlegen</b> unter <i>Geräte</i>: Für jedes Gerät die Entität wählen. Hängt es an einer
        schaltbaren Steckdose, diese unter <i>Strom</i> eintragen. Verliert es ohne Strom die Verbindung (Apple
        TV), unter <i>Verbindung prüfen</i> den empfohlenen Knopf nutzen.`,a`<b>Aktivitäten zusammenstellen</b> unter <i>Aktivitäten</i>: die Geräte in Einschaltreihenfolge wählen,
        unter <i>Ablauf beim Start</i> zum Beispiel den Eingang des TV. Schnellwahl-Tasten starten Apps.`,a`<b>Speichern und Card einfügen:</b> oben rechts speichern. Im Dashboard eine Karte hinzufügen,
        <i>Easy AV Control Remote</i> suchen und den Raum wählen.`],terms_title:"Begriffe",terms:[["Steckdose","Schalter, an dem das Ger\xE4t h\xE4ngt. Wird zuerst ein- und zuletzt ausgeschaltet; gemeinsame Steckdosen mehrerer Ger\xE4te bleiben an, solange eines davon gebraucht wird."],["Startzeit","Wartezeit nach dem Einschalten der Steckdose, bevor das Ger\xE4t eingeschaltet wird. Nur wenn die Steckdose aus war."],["Wartezeiten","Nach dem Einschalten: bis das Ger\xE4t Befehle annimmt. Nach dem Ausschalten: Abk\xFChlzeit, z. B. f\xFCr eine Beamer-Lampe."],["Verbindung pr\xFCfen","Wartet, bis das Ger\xE4t in Home Assistant erreichbar ist, beim Start und vor Tasten der Fernbedienung; kann seine Integration neu laden, bis sie verbunden ist."],["Ablauf beim Start","Einstellungen, sobald alle Ger\xE4te an sind: Eingang, Lautst\xE4rke, Klangmodus, beliebige Aktion."],["Fernbedienung","Welches Ger\xE4t Lautst\xE4rke, Sender, Wiedergabe und Pfeiltasten bekommt. Automatisch: Lautst\xE4rke an den ersten Mediaplayer, der Rest an den letzten."],["Schnellwahl","Tasten, die einen Mediaplayer auf eine Quelle schalten, beim Apple TV auf eine App."],["Einstellungen in der Karte","Am Ger\xE4t: Quelle, Klangmodus und Entit\xE4ten wie Klangregler, in der Karte \xE4nderbar in jeder Aktivit\xE4t, die es nutzt; automatisch oder ausgew\xE4hlt mit Favoriten. Eine Aktivit\xE4t kann eigene w\xE4hlen."]],example_title:"Beispiel: TV und Apple TV",example:[a`Gerät <i>TV</i>: Entität <code>media_player.tv</code>, Steckdose <code>switch.steckdose_tv</code>,
        Startzeit 15 s, Warten nach Einschalten 10 s.`,a`Gerät <i>Apple TV</i>: Entität <code>media_player.apple_tv</code>, unter <i>Verbindung prüfen</i> der
        Knopf <i>remote.apple_tv für Verbindungsprüfung und Pfeiltasten nutzen</i>.`,a`Aktivität <i>Apple TV</i>: Geräte TV, dann Apple TV; Ablauf beim Start <i>Quelle wählen</i> am TV auf
        den HDMI-Eingang; Schnellwahl Apple TV mit Netflix.`,a`Speichern, Card einfügen, Aktivität starten.`],docs:a`Alle Optionen und die YAML-Referenz: <a href=${_t} target="_blank" rel="noreferrer">Dokumentation auf GitHub</a>.`}};function Zt(){try{return window.localStorage.getItem(gt)==="1"}catch{return!1}}function Qt(r){try{window.localStorage.setItem(gt,r?"1":"0")}catch{}}var F=class extends g{render(){let s=(this.language??"en").split("-")[0],e=ft[s]??ft.en;return a`<details
      ?open=${Zt()}
      @toggle=${t=>Qt(t.target.open)}
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
    </details>`}};F.properties={language:{}},F.styles=[b,y,v`
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
  `];customElements.get("easy-av-control-guide")||customElements.define("easy-av-control-guide",F);var je=["status","time","both"],ze=["warn","stop","retry"],ge=["profile","state_source","wait_on","wait_off","timeout_on","timeout_off","debounce","on_failure"];function bt(r){let s=r?.profile?.data??{};return{timeout_on:s.timeouts?.on??120,timeout_off:s.timeouts?.off??300,debounce:s.debounce??2}}function vt(r,s){let e=r.on_failure;return e&&typeof e=="object"?e[s]??"warn":e??"warn"}function yt(r,s){let e=bt(s),t=r.state_source;return{profile:r.profile??"__auto",state_source:t==="none"?"none":t&&typeof t=="object"?"custom":"auto",wait_on:r.wait_on??"status",wait_off:r.wait_off??"status",timeout_on:r.timeout_on??e.timeout_on,timeout_off:r.timeout_off??e.timeout_off,debounce:r.debounce??e.debounce,on_failure_on:vt(r,"turn_on"),on_failure_off:vt(r,"turn_off")}}function wt(r,s,e){let t=bt(e),i={...r};for(let d of ge)delete i[d];s.profile&&s.profile!=="__auto"&&(i.profile=s.profile),s.state_source==="none"?i.state_source="none":s.state_source==="custom"&&(i.state_source=r.state_source??{}),s.wait_on&&s.wait_on!=="status"&&(i.wait_on=s.wait_on),s.wait_off&&s.wait_off!=="status"&&(i.wait_off=s.wait_off),s.timeout_on!==void 0&&Number(s.timeout_on)!==t.timeout_on&&(i.timeout_on=Number(s.timeout_on)),s.timeout_off!==void 0&&Number(s.timeout_off)!==t.timeout_off&&(i.timeout_off=Number(s.timeout_off)),s.debounce!==void 0&&Number(s.debounce)!==t.debounce&&(i.debounce=Number(s.debounce));let n=s.on_failure_on||"warn",o=s.on_failure_off||"warn";return n===o&&n!=="warn"?i.on_failure=n:n!==o&&(i.on_failure={...n!=="warn"?{turn_on:n}:{},...o!=="warn"?{turn_off:o}:{}}),i}function kt(r,s){let e=s?.found;if(!e)return{};let t={};return e.remote_entity&&r.remote_entity!==e.remote_entity&&(t.remote_entity=e.remote_entity),e.power_switch&&!r.power_switch&&(t.power_switch=e.power_switch),t}function fe(r){if(!r||typeof r!="object")return"";let s=r;return[s.domain,s.translation_key??s.unique_id_suffix??s.device_class].filter(Boolean).join(" \xB7 ")}function $t(r,s){let e=r.data,t=[],i=e.indicator;if(i){let o=i.entity?fe(i.entity):s("sum_indicator_device"),d=i.attribute?`${o} (${i.attribute})`:o;t.push(s("sum_indicator",{what:i.available_is_on?s("sum_indicator_available",{what:d}):d}));let l=["starting","on","stopping","off","error"].filter(c=>Array.isArray(i[c])&&i[c].length).map(c=>`${c}: ${i[c].join(" / ")}`);l.length&&t.push(s("sum_states",{groups:l.join(" \xB7 ")}))}e.remote&&t.push(`${s("sum_remote")}: ${fe(e.remote)}`),e.power_switch&&t.push(`${s("sum_outlet")}: ${fe(e.power_switch)}`),Array.isArray(e.settings)&&e.settings.length&&t.push(`${s("sum_settings")}: ${e.settings.map(fe).join(", ")}`),e.picture&&t.push(`${s("sum_picture")}: ${e.picture.ok.join(" / ")}`),e.order&&t.push(s("sum_order",{order:s(`order.${e.order}`)}));let n=Object.entries(e.roles??{}).sort(([,o],[,d])=>o-d).map(([o])=>s(`role.${o}`));return n.length&&t.push(s("sum_roles",{roles:n.join(", ")})),t}var ve={en:{"state.idle":"Off","state.starting":"Starting \u2026","state.active":"On","now.paused":"Paused","state.stopping":"Stopping \u2026","state.error":"Error",power:"On/off",loading:"Loading \u2026",not_found:'Room "{room}" not found',no_room:"Pick a room in the card settings",warnings:"Warnings",volume:"Volume","command.volume_up":"Volume up","command.volume_down":"Volume down","command.mute":"Mute","command.volume_set":"Volume slider","command.select_source":"Select source","command.select_sound_mode":"Select sound mode","command.channel_up":"Channel up","command.channel_down":"Channel down","command.play_pause":"Play/pause","command.play":"Play","command.pause":"Pause","command.stop":"Stop","command.next":"Next","command.previous":"Previous","command.up":"Up","command.down":"Down","command.left":"Left","command.right":"Right","command.ok":"OK","command.back":"Back","command.menu":"Menu","command.home":"Home","command.info":"Info","command.guide":"Guide","command.exit":"Exit","editor.room":"Room","editor.section":"Card","editor.hint":"The room this card controls. The card shows its activities, the remote of the running one, and its settings.","editor.star":"\u2B50 Star on GitHub","editor.report":"\u{1F41B} Report an issue","editor.name":"Title (optional)","doing.power_on":"Switching the outlets on","doing.power_off":"Switching the outlets off","doing.boot":"{name} is booting","doing.reload":"Reconnecting {name}","doing.ready":"Waiting for {name}","doing.turn_on":"Switching on {name}","doing.warm_up":"{name} is starting up","doing.status_on":"Waiting for {name} to be on","doing.status_on_value":"{name}: {value}","doing.status_off":"Waiting for {name} to be off","doing.status_off_value":"{name}: {value}","doing.turn_off":"Switching off {name}","doing.step":"Step {step} of {steps}: {what}","doing.wait":"Step {step} of {steps}: waiting","doing.hooks_on_start":"Waiting for the actions on start","doing.hooks_on_stop":"Waiting for the actions on stop","doing.left":"{time} left","doing.at_most":"at most {time}","cooling.text":"Cooling down: {names}","cooling.time":"power off in {time}","cooling.time_status":"power off once they are off, at most {time}",touchpad:"Touch surface: swipe for the arrow keys, tap for OK","touchpad.hint":"Swipe \xB7 tap for OK","rocker.volume":"VOL","rocker.channels":"CH","pad.show_arrows":"Show arrow keys","pad.show_touchpad":"Show touch surface",settings:"Settings","setting.source":"Source","setting.sound_mode":"Sound mode","toggle.on":"On","toggle.off":"Off","step.power_on":"Switch on","step.power_off":"Switch off","step.set_source":"Set source","step.set_volume":"Set volume","step.set_sound_mode":"Set sound mode","step.set_brightness":"Set brightness","step.set_color_temp":"Set color temperature","step.set_position":"Set cover position","step.set_tilt":"Set cover tilt","step.call_action":"Run action","step.delay":"Wait","step.wait_available":"Wait until available"},de:{"state.idle":"Aus","state.starting":"Startet \u2026","state.active":"An","now.paused":"Pausiert","state.stopping":"Stoppt \u2026","state.error":"Fehler",power:"Ein/Aus",loading:"L\xE4dt \u2026",not_found:"Raum \u201E{room}\u201C nicht gefunden",no_room:"Bitte in den Karteneinstellungen einen Raum w\xE4hlen",warnings:"Warnungen",volume:"Lautst\xE4rke","command.volume_up":"Lauter","command.volume_down":"Leiser","command.mute":"Stumm","command.volume_set":"Lautst\xE4rkeregler","command.select_source":"Quelle w\xE4hlen","command.select_sound_mode":"Klangmodus w\xE4hlen","command.channel_up":"Kanal hoch","command.channel_down":"Kanal runter","command.play_pause":"Wiedergabe/Pause","command.play":"Wiedergabe","command.pause":"Pause","command.stop":"Stopp","command.next":"Weiter","command.previous":"Zur\xFCck","command.up":"Hoch","command.down":"Runter","command.left":"Links","command.right":"Rechts","command.ok":"OK","command.back":"Zur\xFCck","command.menu":"Men\xFC","command.home":"Start","command.info":"Info","command.guide":"EPG","command.exit":"Beenden","editor.room":"Raum","editor.section":"Karte","editor.hint":"Der Raum, den diese Karte steuert. Sie zeigt seine Aktivit\xE4ten, die Fernbedienung der laufenden und ihre Einstellungen.","editor.star":"\u2B50 Auf GitHub markieren","editor.report":"\u{1F41B} Problem melden","editor.name":"Titel (optional)","doing.power_on":"Steckdosen werden eingeschaltet","doing.power_off":"Steckdosen werden ausgeschaltet","doing.boot":"{name} bootet","doing.reload":"{name} wird neu verbunden","doing.ready":"Warte auf {name}","doing.turn_on":"{name} wird eingeschaltet","doing.warm_up":"{name} f\xE4hrt hoch","doing.status_on":"Warte, bis {name} an ist","doing.status_on_value":"{name}: {value}","doing.status_off":"Warte, bis {name} aus ist","doing.status_off_value":"{name}: {value}","doing.turn_off":"{name} wird ausgeschaltet","doing.step":"Schritt {step} von {steps}: {what}","doing.wait":"Schritt {step} von {steps}: warten","doing.hooks_on_start":"Warte auf die Aktionen beim Start","doing.hooks_on_stop":"Warte auf die Aktionen beim Stopp","doing.left":"noch {time}","doing.at_most":"h\xF6chstens noch {time}","cooling.text":"Abk\xFChlen: {names}","cooling.time":"Strom aus in {time}","cooling.time_status":"Strom aus, sobald sie aus sind, h\xF6chstens noch {time}",touchpad:"Touchfl\xE4che: wischen f\xFCr die Pfeiltasten, tippen f\xFCr OK","touchpad.hint":"Wischen \xB7 Tippen f\xFCr OK","rocker.volume":"VOL","rocker.channels":"CH","pad.show_arrows":"Pfeiltasten zeigen","pad.show_touchpad":"Touchfl\xE4che zeigen",settings:"Einstellungen","setting.source":"Quelle","setting.sound_mode":"Klangmodus","toggle.on":"An","toggle.off":"Aus","step.power_on":"Einschalten","step.power_off":"Ausschalten","step.set_source":"Quelle w\xE4hlen","step.set_volume":"Lautst\xE4rke setzen","step.set_sound_mode":"Klangmodus w\xE4hlen","step.set_brightness":"Helligkeit setzen","step.set_color_temp":"Farbtemperatur setzen","step.set_position":"Rollladen-Position setzen","step.set_tilt":"Lamellen-Neigung setzen","step.call_action":"Aktion ausf\xFChren","step.delay":"Warten","step.wait_available":"Auf Verf\xFCgbarkeit warten"}};function L(r,s,e={}){let t=(r??"en").split("-")[0],n=(t in ve?ve[t]:ve.en)[s]??ve.en[s]??s;for(let[o,d]of Object.entries(e))n=n.replace(`{${o}}`,d);return n}var xt={en:{"flow.status_on":"Wait until {device} says it's on ({entity}), at most {timeout}","flow.status_off":"Wait until {device} says it's off ({entity}), at most {timeout}","flow.outlets_off_status":"Switch off the outlet once its devices say they're off: {outlets}","flow.debounce":"the state must hold {seconds}",profiles:"Profiles",profiles_intro:"A profile tells Easy AV Control what an integration's entities say about a device: which entity shows that it's on, what its states mean, its remote, outlet and settings. Built-in ones are locked: duplicate one to change it.",profiles_builtin:"Built in",profiles_yours:"Yours",profiles_none_yours:"None yet. Duplicate a built-in profile, or import one.",profile_generic:"for any media player without its own profile",profile_untested:"From the integration's code, not tested on a device",profile_used_by:"Used by {where}",profile_unused:"Not used by a device",profile_preview:"Show the summary",profile_view:"View",profile_edit:"Edit",profile_duplicate:"Duplicate",profile_delete_confirm:'Delete your profile "{name}"? Devices that use it go back to the built-in one.',profile_readonly:"Built in: read only. Duplicate it to make your own version.",profile_editor_hint:"The profile as YAML. Entities are found on the device by domain and translation_key, never by entity ID, so the profile works on any Home Assistant.",profile_save:"Save profile",profile_close:"Close",profile_cancel:"Cancel",profile_saved:"Profile saved.",profile_export:"Export",profile_export_all:"Export yours",profile_import:"Import",profile_import_hint:"Paste an Easy AV Control profile export. Profiles you already have are never replaced: one with a taken ID is added under a new one.",profile_import_done:"Added: {added}",profile_import_renamed:"{from} added as {to}",profile_import_invalid:"Not valid, skipped: {ids}",profile_copy:"Copy to clipboard",profile_copied:"Copied \u2713",profile_copy_failed:"Press Ctrl/Cmd+C",profile_paste:"Paste from clipboard",profile_paste_failed:"Paste with Ctrl/Cmd+V",profile_share:"Share a profile",profile_share_hint:"Made one for a device others have too? Export it and open an issue with the text: accepted profiles ship as built-in ones.",sum_indicator:"On / off from {what}",sum_indicator_device:"the device's own state",sum_indicator_available:"{what} being available",sum_states:"{groups}",sum_remote:"Remote",sum_outlet:"Outlet",sum_settings:"Settings",sum_picture:"Picture check",sum_order:"Power-on order: {order}",sum_roles:"Jobs: {roles}","order.early":"early","order.middle":"middle","order.late":"late","role.power":"power","role.navigation":"arrow keys","role.now_playing":"now playing","role.turn_off":"turn off",section_state:"Device state",hint_state:"How Easy AV Control knows this device is on or off. With a status, it waits for the device itself instead of fixed times.",detected:"Detected: {name}",detected_none:"No profile for this device's integration: it uses the fixed times below.",detected_uses:"Uses",detected_now:"Now: {value}",detected_found_indicator:"Status from {entity}",detected_found_attribute:"attribute {attribute}",detected_found_remote:"Remote: {entity}",detected_found_outlet:"Outlet: {entity}",detected_found_settings:"Settings: {entities}",detected_use:"Use these",detected_applied:"In use",detected_siblings:"Also covered by: {integrations}",detected_role:"{role}: {integration}",state_source:"Status","state_source.auto":"Automatic (from the profile)","state_source.none":"None: fixed times only","field.profile":"Profile","profile.auto":"Automatic (for its integration)","field.wait_on":"When turning on, wait for","field.wait_off":"Before cutting the outlet, wait for","wait.status":"Its status","wait.time":"A fixed time","wait.both":"Its status, then a fixed time","field.timeout_on":"Status timeout, turning on","field.timeout_off":"Status timeout, turning off","field.debounce":"Debounce","helper.debounce":"Seconds a state must hold before it counts, so a flicker doesn't.","field.on_failure_on":"If it doesn't come on","field.on_failure_off":"If it doesn't go off","failure.warn":"Warn and continue","failure.stop":"Stop the activity","failure.retry":"Try once more, then warn","failure_off.stop":"Leave its outlet on",state_fixed_only:"No status for this device: only the fixed times below apply.",footer_version:"Easy AV Control (Ltek) {version}",star:"\u2B50 Star on GitHub",report:"\u{1F41B} Report an issue",title:"Easy AV Control",rooms:"Rooms",add_room:"Add room",no_rooms:"No rooms yet.",room_name:"Name",room_area:"Area",room_default_activity:"Default activity",default_last:"Last used","helper.default_activity":"What the room's on/off switch and toggle_activity start, e.g. from a wall button.",room_id_hint:"ID {id}",delete_room:"Delete room",delete_room_confirm:'Delete room "{name}" with all devices and activities?',tab_devices:"Devices",tab_activities:"Activities",tab_yaml:"YAML",add_device:"Add device",add_activity:"Add activity",delete:"Delete",move_up:"Move up",move_down:"Move down",device_id:"Device ID",device_in_use:'Device "{id}" is used by: {where}. Remove it there first.',activity_id_hint:"ID {id} \u2013 part of the entity IDs, cannot be changed",new_activity:"New activity",add_device_to_activity:"Add device \u2026",steps:"Start sequence",add_step:"Add step \u2026",hooks:"Actions on start and stop",remote:"Remote control",quick_select:"Quick select",quick_select_hint:"Buttons that switch a media player to a source; on an Apple TV the sources are its apps.",quick_select_no_player:"Add a media player to this activity first.",add_quick_select:"Add quick select",card_settings:"Settings in the card",card_settings_hint:"Source, sound mode and other settings of the devices, changeable in the card while the activity runs: those set on the devices, or a choice for this activity only. The section is closed until it is opened; each browser remembers that.","setting.entity":"Entity of the device","field.entity":"Entity","helper.entity":"A number (slider), select (list) or switch (on/off key), e.g. the receiver's bass.","field.settings_mode":"Show",settings_auto:"From the devices",settings_chosen:"Chosen here, with favourites",settings_auto_shows:"The card shows: {list}.",settings_auto_none:"The devices of this activity offer no settings yet. Choose them on a device, or start the activity once so its media players report their lists.",device_settings_hint:"What the card offers of this device, in every activity that uses it. Automatic: source and sound mode of a media player, and the number and select entities of the same device.",device_settings_auto:"Automatic",device_settings_auto_none:"Nothing found yet: no source or sound mode list reported, and no number or select entities of the same device.",device_settings_none:"The card shows no settings of this device.",settings_none:"The card shows no settings for this activity.",add_setting:"Add setting","field.setting":"Setting","field.options":"Favourites (optional)","helper.options":"Only these in the card, in this order; empty: the device's whole list.",commands:"Own commands",save:"Save",discard:"Discard",saving:"Saving \u2026",saved:"Saved",unsaved:"Unsaved changes",reload:"Reload",reload_confirm:"Discard your unsaved changes and load the saved configuration?",retry:"Try again",save_anyway:"Save anyway",conflict:"The configuration was changed elsewhere. Reload it \u2013 your unsaved changes here are lost.",invalid:"Not saved \u2013 {path}: {message}",missing:"These entities do not exist in Home Assistant:",missing_hint:"A device without power usually stays known. Most likely a typo or a renamed entity.",loading:"Loading \u2026",load_error:"Could not load the configuration: {error}",route_auto:"Automatic",route_none:"Hide",devices_intro:"Every device of the room that Easy AV Control switches or controls: TV, projector, receiver, player.",devices_empty:"No devices yet.",new_device:"New device",no_entity:"No entity chosen",entity_missing:"Entity not found in Home Assistant",used_by:"Used by: {where}",section_device:"Device",hint_device:"The Home Assistant entity of the device, usually a media player.",section_power:"Power",hint_power:"Optional. The outlet that powers the device. It is switched on before the device and off after it.",section_delays:"Waiting times",hint_delays:"How long Easy AV Control waits for this device.",section_ready:"Connection check",hint_ready:"Waits until the device is reachable in Home Assistant, before switching it on and before remote buttons. For devices that lose their connection without power, such as an Apple TV.",ready_preset:"Use {entity} for the connection check and the arrow keys (recommended for Apple TV)",section_advanced:"Advanced",hint_device_advanced:"The device ID is used in the YAML configuration. Own commands map a button name to Home Assistant actions, e.g. arrow keys for a receiver box.",activities_intro:'An activity combines devices for one use, e.g. "Apple TV" = TV and Apple TV. Starting it switches on what it needs and off what it does not.',activities_empty:"No activities yet.",no_devices:"No devices",needs_devices:"Add the devices of this room first.",section_general:"General",hint_general:"Name and icon appear in the card. Position sorts the activities.",section_activity_devices:"Devices",hint_activity_devices:"Switched on in this order.",hint_steps:"Run once all devices are on, e.g. switch the TV to its HDMI input or set the volume.",hint_remote:"Which device gets which buttons of the card. Automatic suits most setups.",hint_activity_advanced:"Extra buttons and commands in YAML, and Home Assistant actions on start and stop.",yaml_intro:"The whole room as YAML. Changes here and in the forms are the same configuration.",add_room_name:"Name of the new room",create:"Add",cancel:"Cancel","helper.power_switch":"Shared outlets stay on while any device on them is needed.","helper.delay_after_power":"How long the device needs after the outlet came on. Only waited when the outlet was off.","helper.delay_after_on":"Until the device accepts commands. Only when it was switched on.","helper.delay_after_off":"Cool-down before the next device or the outlet is switched off, e.g. 180 s for a projector.","helper.ready_entity":"E.g. the remote of an Apple TV, which is on only while it is connected.","helper.ready_reload":"Skips the waiting time of an integration that retries its connection.","helper.source":"The list shows what the device reported last, so it must have been on once. A name can also be typed in.","field.entity_id":"Entity","field.name":"Display name","field.power_switch":"Power outlet","field.remote_entity":"Remote (optional)","helper.remote_entity":"Arrow keys, OK, back, home and menu of the card go to this remote entity, e.g. the remote of an Apple TV.","field.delay_after_power":"Boot time (s)","field.delay_after_on":"Wait after switching on (s)","field.delay_after_off":"Wait after switching off (s)","field.ready_enabled":"Wait until available before switching on","field.ready_entity":"Check this entity instead (optional)","field.ready_state":"Wait for state (optional, e.g. on)","field.ready_timeout":"Timeout (s)","field.ready_reload":"Reload its integration","field.ready_on_timeout":"On timeout","field.commands":"Own commands (YAML: name \u2192 actions)","field.icon":"Icon","field.order":"Position","field.on_start":"On start","field.on_stop":"On stop","field.volume":"Volume","field.channels":"Channels","field.transport":"Playback","field.navigation":"Navigation","field.touchpad":"Touch surface","helper.touchpad":"A swipe area instead of the arrow keys in the card. Automatic: for navigation that goes to a remote entity, e.g. an Apple TV.",touchpad_auto:"Automatic",touchpad_on:"On",touchpad_off:"Off (arrow keys)","field.buttons":"Extra buttons (YAML list)","field.label":"Label (optional, default: the source)","field.activity_commands":"Commands of this activity (YAML: name \u2192 actions)","field.type":"Type","field.device":"Device","field.source":"Source","field.volume_level":"Volume","field.sound_mode":"Sound mode","field.brightness_pct":"Brightness (%)","field.color_temp_kelvin":"Color temperature (K)","field.transition":"Transition (s)","field.position":"Position (%)","field.tilt_position":"Tilt (%)","field.action":"Action (e.g. script.turn_on)","field.data":"Data","field.target":"Target","field.timeout":"Timeout (s)","field.reload_integration":"Reload its integration","field.on_timeout":"On timeout","field.delay_after":"Wait afterwards (s)",on_timeout_abort:"Abort the start",on_timeout_continue:"Continue","step.power_on":"Switch on","step.power_off":"Switch off","step.set_source":"Set source","step.set_volume":"Set volume","step.set_sound_mode":"Set sound mode","step.set_brightness":"Set brightness","step.set_color_temp":"Set color temperature","step.set_position":"Set cover position","step.set_tilt":"Set cover tilt","step.call_action":"Call action","step.delay":"Wait","step.wait_available":"Wait until available",section_remote_preview:"Remote control preview",hint_remote_preview:"The card as it looks while this activity runs, with the settings above, also before saving. Tap a button to see where it goes; nothing is sent.","preview.tap":"Tap a button to see which device gets it and what runs there.","preview.this_activity":"this activity","preview.device_commands":"own command of the device: {actions}","preview.activity_commands":"own command of the activity: {actions}","preview.unknown":"does nothing: no device of this activity handles it","preview.unknown_on_device":"does nothing: {device} cannot handle it","preview.ready":"Checks the connection first and restores it if needed.","preview.dead":"These buttons are shown but do nothing:","preview.groups":"Button groups","preview.mode_auto":"automatic","preview.mode_set":"chosen","preview.hidden":"hidden","preview.no_device":"no suitable device, not shown","preview.no_keys":"not shown: {device} has none of these buttons",section_flow:"Flow: what is switched when",hint_flow:"Computed from the settings of this activity and its devices, also before saving. Times count only the configured waits; how long the devices take to respond comes on top.","flow.mode_start":"Start","flow.mode_stop":"Stop","flow.from_label":"Starting from","flow.from_idle":"from idle (everything off)","flow.from":"switching from {activity}","flow.failed":"Could not compute the flow: {error}","flow.invalid":"No flow while the configuration has an error \u2013 {error}","flow.state_starting":"Room: starting","flow.state_active":"Room: active","flow.state_stopping":"Room: stopping","flow.state_idle":"Room: off","flow.outlets_on":"Switch on the outlets, all at once: {outlets}","flow.outlets_off":"Switch off the outlets: {outlets}","flow.outlets_off_later":"Switch off the outlet after its cool-down: {outlets}","flow.outlet_keep":"{outlet} stays on, this activity needs it","flow.outlets_already_on":"already on: {outlets}","flow.unless_rooms":"not while {rooms} uses it","flow.on_start":"Actions on start begin","flow.on_start_wait":"Wait until the actions on start are done","flow.on_stop":"Actions on stop begin","flow.on_stop_wait":"Wait until the actions on stop are done","flow.parallel":"runs alongside","flow.already_on":"Already on in {activity}: no switching, no waiting","flow.boot":"Boot time: until {seconds} after the outlets came on","flow.reload":"Reload the integration of {entity}","flow.ready":"Wait until {entity} is available, at most {timeout}","flow.ready_state":"Wait until {entity} is {states}, at most {timeout}","flow.on_timeout_abort":"\u2013 otherwise the start is aborted","flow.on_timeout_continue":"\u2013 otherwise it goes on anyway","flow.turn_on":"Switch on {device}","flow.turn_off":"Switch off {device}","flow.turn_off_unused":"Switch off {device}, this activity does not use it","flow.cannot_switch":"{device} cannot be switched on or off, nothing is sent","flow.wait_on":"Wait {seconds} until the device is ready","flow.wait":"Wait {seconds}","flow.steps":"Steps","flow.background":"In the background, after the room is done","flow.if.outlet_was_off":"only if its outlet was off","flow.if.if_off":"only if the device is off","flow.if.if_on":"only if the device is on","flow.reload_if_needed":"reloads its integration if not ready","flow.cooldown":"then {seconds} cool-down","flow.summary_start":"Active after {min} at the earliest, {max} at the latest if every readiness check takes its full timeout.","flow.summary_start_fixed":"Active after {min}.","flow.summary_stop":"Off as soon as the devices are switched off and the actions on stop are done.","flow.summary_stop_cut":"Off as soon as the devices are switched off and the actions on stop are done; the last outlet goes off after {seconds}."},de:{"flow.status_on":"Warten, bis {device} meldet, dass es an ist ({entity}), h\xF6chstens {timeout}","flow.status_off":"Warten, bis {device} meldet, dass es aus ist ({entity}), h\xF6chstens {timeout}","flow.outlets_off_status":"Steckdose ausschalten, sobald ihre Ger\xE4te aus sind: {outlets}","flow.debounce":"der Zustand muss {seconds} anhalten",profiles:"Profile",profiles_intro:"Ein Profil sagt Easy AV Control, was die Entit\xE4ten einer Integration \xFCber ein Ger\xE4t verraten: welche Entit\xE4t zeigt, dass es an ist, was ihre Zust\xE4nde bedeuten, Fernbedienung, Steckdose und Einstellungen. Eingebaute sind gesperrt: zum \xC4ndern duplizieren.",profiles_builtin:"Eingebaut",profiles_yours:"Eigene",profiles_none_yours:"Noch keine. Ein eingebautes Profil duplizieren oder eines importieren.",profile_generic:"f\xFCr jeden Mediaplayer ohne eigenes Profil",profile_untested:"Aus dem Code der Integration, nicht an einem Ger\xE4t getestet",profile_used_by:"Genutzt von {where}",profile_unused:"Von keinem Ger\xE4t genutzt",profile_preview:"Zusammenfassung zeigen",profile_view:"Ansehen",profile_edit:"Bearbeiten",profile_duplicate:"Duplizieren",profile_delete_confirm:'Eigenes Profil "{name}" l\xF6schen? Ger\xE4te, die es nutzen, nehmen wieder das eingebaute.',profile_readonly:"Eingebaut: nur lesen. Zum \xC4ndern duplizieren.",profile_editor_hint:"Das Profil als YAML. Entit\xE4ten werden am Ger\xE4t \xFCber Domain und translation_key gefunden, nie \xFCber die Entit\xE4ts-ID; so passt das Profil zu jedem Home Assistant.",profile_save:"Profil speichern",profile_close:"Schlie\xDFen",profile_cancel:"Abbrechen",profile_saved:"Profil gespeichert.",profile_export:"Exportieren",profile_export_all:"Eigene exportieren",profile_import:"Importieren",profile_import_hint:"Einen Profil-Export von Easy AV Control einf\xFCgen. Vorhandene Profile werden nie ersetzt: eines mit vergebener ID kommt unter einer neuen dazu.",profile_import_done:"Hinzugef\xFCgt: {added}",profile_import_renamed:"{from} als {to} hinzugef\xFCgt",profile_import_invalid:"Ung\xFCltig, \xFCbersprungen: {ids}",profile_copy:"In die Zwischenablage",profile_copied:"Kopiert \u2713",profile_copy_failed:"Strg/Cmd+C dr\xFCcken",profile_paste:"Aus der Zwischenablage",profile_paste_failed:"Mit Strg/Cmd+V einf\xFCgen",profile_share:"Profil teilen",profile_share_hint:"Eines f\xFCr ein Ger\xE4t gebaut, das andere auch haben? Exportieren und den Text in einem Issue schicken: angenommene Profile werden eingebaut.",sum_indicator:"An / aus \xFCber {what}",sum_indicator_device:"den Zustand des Ger\xE4ts",sum_indicator_available:"die Verf\xFCgbarkeit von {what}",sum_states:"{groups}",sum_remote:"Fernbedienung",sum_outlet:"Steckdose",sum_settings:"Einstellungen",sum_picture:"Bildpr\xFCfung",sum_order:"Einschaltreihenfolge: {order}",sum_roles:"Aufgaben: {roles}","order.early":"fr\xFCh","order.middle":"Mitte","order.late":"sp\xE4t","role.power":"Strom","role.navigation":"Pfeiltasten","role.now_playing":"l\xE4uft gerade","role.turn_off":"Ausschalten",section_state:"Ger\xE4tezustand",hint_state:"Woran Easy AV Control erkennt, dass das Ger\xE4t an oder aus ist. Mit einem Status wartet es auf das Ger\xE4t selbst statt auf feste Zeiten.",detected:"Erkannt: {name}",detected_none:"Kein Profil f\xFCr die Integration dieses Ger\xE4ts: es gelten die festen Zeiten unten.",detected_uses:"Nutzt",detected_now:"Jetzt: {value}",detected_found_indicator:"Status von {entity}",detected_found_attribute:"Attribut {attribute}",detected_found_remote:"Fernbedienung: {entity}",detected_found_outlet:"Steckdose: {entity}",detected_found_settings:"Einstellungen: {entities}",detected_use:"\xDCbernehmen",detected_applied:"In Gebrauch",detected_siblings:"Auch abgedeckt von: {integrations}",detected_role:"{role}: {integration}",state_source:"Status","state_source.auto":"Automatisch (aus dem Profil)","state_source.none":"Keiner: nur feste Zeiten","field.profile":"Profil","profile.auto":"Automatisch (f\xFCr seine Integration)","field.wait_on":"Beim Einschalten warten auf","field.wait_off":"Vor dem Abschalten der Steckdose warten auf","wait.status":"Seinen Status","wait.time":"Eine feste Zeit","wait.both":"Seinen Status, dann eine feste Zeit","field.timeout_on":"Status-Zeitlimit beim Einschalten","field.timeout_off":"Status-Zeitlimit beim Ausschalten","field.debounce":"Entprellen","helper.debounce":"Sekunden, die ein Zustand anhalten muss, bevor er z\xE4hlt.","field.on_failure_on":"Wenn es nicht angeht","field.on_failure_off":"Wenn es nicht ausgeht","failure.warn":"Warnen und weitermachen","failure.stop":"Aktivit\xE4t beenden","failure.retry":"Noch einmal versuchen, dann warnen","failure_off.stop":"Steckdose anlassen",state_fixed_only:"Kein Status f\xFCr dieses Ger\xE4t: nur die festen Zeiten unten gelten.",footer_version:"Easy AV Control (Ltek) {version}",star:"\u2B50 Auf GitHub markieren",report:"\u{1F41B} Problem melden",title:"Easy AV Control",rooms:"R\xE4ume",add_room:"Raum hinzuf\xFCgen",no_rooms:"Noch keine R\xE4ume.",room_name:"Name",room_area:"Bereich",room_default_activity:"Standard-Aktivit\xE4t",default_last:"Zuletzt genutzte","helper.default_activity":"Was der Ein/Aus-Schalter des Raums und toggle_activity starten, z. B. von einem Wandtaster.",room_id_hint:"ID {id}",delete_room:"Raum l\xF6schen",delete_room_confirm:"Raum \u201E{name}\u201C mit allen Ger\xE4ten und Aktivit\xE4ten l\xF6schen?",tab_devices:"Ger\xE4te",tab_activities:"Aktivit\xE4ten",tab_yaml:"YAML",add_device:"Ger\xE4t hinzuf\xFCgen",add_activity:"Aktivit\xE4t hinzuf\xFCgen",delete:"L\xF6schen",move_up:"Nach oben",move_down:"Nach unten",device_id:"Ger\xE4te-ID",device_in_use:"Ger\xE4t \u201E{id}\u201C wird verwendet von: {where}. Bitte zuerst dort entfernen.",activity_id_hint:"ID {id} \u2013 Teil der Entit\xE4ts-IDs, nicht \xE4nderbar",new_activity:"Neue Aktivit\xE4t",add_device_to_activity:"Ger\xE4t hinzuf\xFCgen \u2026",steps:"Ablauf beim Start",add_step:"Schritt hinzuf\xFCgen \u2026",hooks:"Aktionen bei Start und Stopp",remote:"Fernbedienung",quick_select:"Schnellwahl",quick_select_hint:"Tasten, die einen Mediaplayer auf eine Quelle schalten; beim Apple TV sind die Quellen seine Apps.",quick_select_no_player:"F\xFCge dieser Aktivit\xE4t zuerst einen Mediaplayer hinzu.",add_quick_select:"Schnellwahl hinzuf\xFCgen",card_settings:"Einstellungen in der Karte",card_settings_hint:"Quelle, Klangmodus und weitere Einstellungen der Ger\xE4te, in der Karte \xE4nderbar, w\xE4hrend die Aktivit\xE4t l\xE4uft: die an den Ger\xE4ten festgelegten oder eine Auswahl nur f\xFCr diese Aktivit\xE4t. Der Bereich ist zugeklappt, bis man ihn \xF6ffnet; jeder Browser merkt sich das.","setting.entity":"Entit\xE4t des Ger\xE4ts","field.entity":"Entit\xE4t","helper.entity":"Eine Zahl (Schieberegler), Auswahl (Liste) oder ein Schalter (An/Aus-Taste), z. B. der Bass des Receivers.","field.settings_mode":"Anzeigen",settings_auto:"Von den Ger\xE4ten",settings_chosen:"Hier ausgew\xE4hlt, mit Favoriten",settings_auto_shows:"Die Karte zeigt: {list}.",settings_auto_none:"Die Ger\xE4te dieser Aktivit\xE4t bieten noch keine Einstellungen. Lege sie an einem Ger\xE4t fest, oder starte die Aktivit\xE4t einmal, damit die Mediaplayer ihre Listen melden.",device_settings_hint:"Was die Karte von diesem Ger\xE4t anbietet, in jeder Aktivit\xE4t, die es nutzt. Automatisch: Quelle und Klangmodus eines Mediaplayers und die Zahl- und Auswahl-Entit\xE4ten desselben Ger\xE4ts.",device_settings_auto:"Automatisch",device_settings_auto_none:"Noch nichts gefunden: keine Quellen- oder Klangmodus-Liste gemeldet und keine Zahl- oder Auswahl-Entit\xE4ten desselben Ger\xE4ts.",device_settings_none:"Die Karte zeigt keine Einstellungen dieses Ger\xE4ts.",settings_none:"Die Karte zeigt f\xFCr diese Aktivit\xE4t keine Einstellungen.",add_setting:"Einstellung hinzuf\xFCgen","field.setting":"Einstellung","field.options":"Favoriten (optional)","helper.options":"Nur diese in der Karte, in dieser Reihenfolge; leer: die ganze Liste des Ger\xE4ts.",commands:"Eigene Befehle",save:"Speichern",discard:"Verwerfen",saving:"Speichert \u2026",saved:"Gespeichert",unsaved:"Ungespeicherte \xC4nderungen",reload:"Neu laden",reload_confirm:"Ungespeicherte \xC4nderungen verwerfen und die gespeicherte Konfiguration laden?",retry:"Erneut versuchen",save_anyway:"Trotzdem speichern",conflict:"Die Konfiguration wurde anderswo ge\xE4ndert. Bitte neu laden \u2013 deine ungespeicherten \xC4nderungen hier gehen dabei verloren.",invalid:"Nicht gespeichert \u2013 {path}: {message}",missing:"Diese Entit\xE4ten gibt es in Home Assistant nicht:",missing_hint:"Ein Ger\xE4t ohne Strom bleibt normalerweise bekannt \u2013 meist ist es ein Tippfehler oder eine umbenannte Entit\xE4t.",loading:"L\xE4dt \u2026",load_error:"Konfiguration konnte nicht geladen werden: {error}",route_auto:"Automatisch",route_none:"Ausblenden",devices_intro:"Alle Ger\xE4te des Raums, die Easy AV Control schaltet oder steuert: TV, Beamer, Receiver, Player.",devices_empty:"Noch keine Ger\xE4te.",new_device:"Neues Ger\xE4t",no_entity:"Keine Entit\xE4t gew\xE4hlt",entity_missing:"Entit\xE4t in Home Assistant nicht gefunden",used_by:"Verwendet in: {where}",section_device:"Ger\xE4t",hint_device:"Die Home-Assistant-Entit\xE4t des Ger\xE4ts, meist ein Mediaplayer.",section_power:"Strom",hint_power:"Optional. Die Steckdose, an der das Ger\xE4t h\xE4ngt. Sie wird vor dem Ger\xE4t ein- und nach ihm ausgeschaltet.",section_delays:"Wartezeiten",hint_delays:"Wie lange Easy AV Control auf dieses Ger\xE4t wartet.",section_ready:"Verbindung pr\xFCfen",hint_ready:"Wartet, bis das Ger\xE4t in Home Assistant erreichbar ist, vor dem Einschalten und vor Tasten der Fernbedienung. F\xFCr Ger\xE4te, die ohne Strom ihre Verbindung verlieren, etwa ein Apple TV.",ready_preset:"{entity} f\xFCr Verbindungspr\xFCfung und Pfeiltasten nutzen (empfohlen f\xFCr Apple TV)",section_advanced:"Erweitert",hint_device_advanced:"Die Ger\xE4te-ID wird in der YAML-Konfiguration verwendet. Eigene Befehle ordnen einem Tastennamen Home-Assistant-Aktionen zu, z. B. Pfeiltasten f\xFCr einen Receiver.",activities_intro:'Eine Aktivit\xE4t fasst Ger\xE4te f\xFCr eine Nutzung zusammen, z. B. "Apple TV" = TV und Apple TV. Beim Start wird eingeschaltet, was sie braucht, und ausgeschaltet, was nicht.',activities_empty:"Noch keine Aktivit\xE4ten.",no_devices:"Keine Ger\xE4te",needs_devices:"Lege zuerst die Ger\xE4te dieses Raums an.",section_general:"Allgemein",hint_general:"Name und Icon erscheinen in der Card. Die Position bestimmt die Reihenfolge.",section_activity_devices:"Ger\xE4te",hint_activity_devices:"Werden in dieser Reihenfolge eingeschaltet.",hint_steps:"Laufen, sobald alle Ger\xE4te an sind, z. B. den TV auf seinen HDMI-Eingang schalten oder die Lautst\xE4rke setzen.",hint_remote:"Welches Ger\xE4t welche Tasten der Card bekommt. Automatisch passt f\xFCr die meisten Aufbauten.",hint_activity_advanced:"Zus\xE4tzliche Tasten und Befehle in YAML sowie Home-Assistant-Aktionen bei Start und Stopp.",yaml_intro:"Der ganze Raum als YAML. \xC4nderungen hier und in den Formularen betreffen dieselbe Konfiguration.",add_room_name:"Name des neuen Raums",create:"Hinzuf\xFCgen",cancel:"Abbrechen","helper.power_switch":"Gemeinsame Steckdosen bleiben an, solange ein Ger\xE4t daran gebraucht wird.","helper.delay_after_power":"Wie lange das Ger\xE4t nach dem Einschalten der Steckdose braucht. Nur wenn die Steckdose aus war.","helper.delay_after_on":"Bis das Ger\xE4t Befehle annimmt. Nur wenn es eingeschaltet wurde.","helper.delay_after_off":"Abk\xFChlzeit, bevor das n\xE4chste Ger\xE4t oder die Steckdose ausgeschaltet wird, z. B. 180 s f\xFCr einen Beamer.","helper.ready_entity":"Z. B. die Fernbedienung eines Apple TV, die nur bei bestehender Verbindung an ist.","helper.ready_reload":"\xDCberspringt die Wartezeit einer Integration, die ihre Verbindung erneut versucht.","helper.source":"Die Liste zeigt, was das Ger\xE4t zuletzt gemeldet hat; es muss also einmal an gewesen sein. Ein Name l\xE4sst sich auch eintippen.","field.entity_id":"Entit\xE4t","field.name":"Anzeigename","field.power_switch":"Steckdose","field.remote_entity":"Fernbedienung (optional)","helper.remote_entity":"Pfeiltasten, OK, Zur\xFCck, Home und Men\xFC der Card gehen an diese Fernbedienungs-Entit\xE4t, z. B. die Fernbedienung eines Apple TV.","field.delay_after_power":"Startzeit (s)","field.delay_after_on":"Warten nach Einschalten (s)","field.delay_after_off":"Warten nach Ausschalten (s)","field.ready_enabled":"Vor dem Einschalten auf Verf\xFCgbarkeit warten","field.ready_entity":"Stattdessen diese Entit\xE4t pr\xFCfen (optional)","field.ready_state":"Auf Zustand warten (optional, z. B. on)","field.ready_timeout":"Zeitlimit (s)","field.ready_reload":"Integration neu laden","field.ready_on_timeout":"Bei Zeit\xFCberschreitung","field.commands":"Eigene Befehle (YAML: Name \u2192 Aktionen)","field.icon":"Icon","field.order":"Position","field.on_start":"Beim Start","field.on_stop":"Beim Stopp","field.volume":"Lautst\xE4rke","field.channels":"Sender","field.transport":"Wiedergabe","field.navigation":"Navigation","field.touchpad":"Touchfl\xE4che","helper.touchpad":"Eine Wischfl\xE4che statt der Pfeiltasten in der Karte. Automatisch: wenn die Navigation an eine Remote-Entit\xE4t geht, z. B. ein Apple TV.",touchpad_auto:"Automatisch",touchpad_on:"An",touchpad_off:"Aus (Pfeiltasten)","field.buttons":"Zus\xE4tzliche Buttons (YAML-Liste)","field.label":"Beschriftung (optional, sonst die Quelle)","field.activity_commands":"Befehle dieser Aktivit\xE4t (YAML: Name \u2192 Aktionen)","field.type":"Typ","field.device":"Ger\xE4t","field.source":"Quelle","field.volume_level":"Lautst\xE4rke","field.sound_mode":"Klangmodus","field.brightness_pct":"Helligkeit (%)","field.color_temp_kelvin":"Farbtemperatur (K)","field.transition":"\xDCbergang (s)","field.position":"Position (%)","field.tilt_position":"Neigung (%)","field.action":"Aktion (z. B. script.turn_on)","field.data":"Daten","field.target":"Ziel","field.timeout":"Zeitlimit (s)","field.reload_integration":"Integration neu laden","field.on_timeout":"Bei Zeit\xFCberschreitung","field.delay_after":"Danach warten (s)",on_timeout_abort:"Start abbrechen",on_timeout_continue:"Weitermachen","step.power_on":"Einschalten","step.power_off":"Ausschalten","step.set_source":"Quelle w\xE4hlen","step.set_volume":"Lautst\xE4rke setzen","step.set_sound_mode":"Klangmodus w\xE4hlen","step.set_brightness":"Helligkeit setzen","step.set_color_temp":"Farbtemperatur setzen","step.set_position":"Rollladen-Position setzen","step.set_tilt":"Lamellen-Neigung setzen","step.call_action":"Aktion ausf\xFChren","step.delay":"Warten","step.wait_available":"Auf Verf\xFCgbarkeit warten",section_remote_preview:"Vorschau der Fernbedienung",hint_remote_preview:"So sieht die Karte aus, w\xE4hrend diese Aktivit\xE4t l\xE4uft, mit den Einstellungen oben, auch vor dem Speichern. Tippe eine Taste an, um zu sehen, wohin sie geht; es wird nichts gesendet.","preview.tap":"Tippe eine Taste an, um zu sehen, welches Ger\xE4t sie bekommt und was dort ausgef\xFChrt wird.","preview.this_activity":"diese Aktivit\xE4t","preview.device_commands":"eigener Befehl des Ger\xE4ts: {actions}","preview.activity_commands":"eigener Befehl der Aktivit\xE4t: {actions}","preview.unknown":"tut nichts: kein Ger\xE4t dieser Aktivit\xE4t kennt die Taste","preview.unknown_on_device":"tut nichts: {device} kennt die Taste nicht","preview.ready":"Pr\xFCft vorher die Verbindung und stellt sie bei Bedarf wieder her.","preview.dead":"Diese Tasten werden angezeigt, tun aber nichts:","preview.groups":"Tastengruppen","preview.mode_auto":"automatisch","preview.mode_set":"gew\xE4hlt","preview.hidden":"ausgeblendet","preview.no_device":"kein passendes Ger\xE4t, nicht angezeigt","preview.no_keys":"nicht angezeigt: {device} hat keine dieser Tasten",section_flow:"Ablauf: was wann geschaltet wird",hint_flow:"Berechnet aus den Einstellungen dieser Aktivit\xE4t und ihrer Ger\xE4te, auch vor dem Speichern. Die Zeiten z\xE4hlen nur die eingestellten Wartezeiten; wie lange die Ger\xE4te zum Reagieren brauchen, kommt hinzu.","flow.mode_start":"Start","flow.mode_stop":"Stopp","flow.from_label":"Ausgangslage","flow.from_idle":"aus dem Leerlauf (alles aus)","flow.from":"Wechsel von {activity}","flow.failed":"Ablauf konnte nicht berechnet werden: {error}","flow.invalid":"Kein Ablauf, solange die Konfiguration einen Fehler hat \u2013 {error}","flow.state_starting":"Raum: startet","flow.state_active":"Raum: aktiv","flow.state_stopping":"Raum: stoppt","flow.state_idle":"Raum: aus","flow.outlets_on":"Steckdosen gleichzeitig einschalten: {outlets}","flow.outlets_off":"Steckdosen ausschalten: {outlets}","flow.outlets_off_later":"Steckdose nach der Abk\xFChlzeit ausschalten: {outlets}","flow.outlet_keep":"{outlet} bleibt an, diese Aktivit\xE4t braucht sie","flow.outlets_already_on":"schon an: {outlets}","flow.unless_rooms":"nicht, solange {rooms} sie nutzt","flow.on_start":"Aktionen beim Start beginnen","flow.on_start_wait":"Warten, bis die Aktionen beim Start fertig sind","flow.on_stop":"Aktionen beim Stopp beginnen","flow.on_stop_wait":"Warten, bis die Aktionen beim Stopp fertig sind","flow.parallel":"l\xE4uft parallel","flow.already_on":"L\xE4uft schon in {activity}: kein Einschalten, keine Wartezeit","flow.boot":"Startzeit: bis {seconds} nach dem Einschalten der Steckdosen","flow.reload":"Integration von {entity} neu laden","flow.ready":"Warten, bis {entity} verf\xFCgbar ist, h\xF6chstens {timeout}","flow.ready_state":"Warten, bis {entity} {states} ist, h\xF6chstens {timeout}","flow.on_timeout_abort":"\u2013 sonst wird der Start abgebrochen","flow.on_timeout_continue":"\u2013 sonst geht es trotzdem weiter","flow.turn_on":"{device} einschalten","flow.turn_off":"{device} ausschalten","flow.turn_off_unused":"{device} ausschalten, diese Aktivit\xE4t braucht es nicht","flow.cannot_switch":"{device} l\xE4sst sich nicht schalten, es wird nichts gesendet","flow.wait_on":"{seconds} warten, bis das Ger\xE4t bereit ist","flow.wait":"{seconds} warten","flow.steps":"Schritte","flow.background":"Im Hintergrund, wenn der Raum schon fertig ist","flow.if.outlet_was_off":"nur, wenn die Steckdose aus war","flow.if.if_off":"nur, wenn das Ger\xE4t aus ist","flow.if.if_on":"nur, wenn das Ger\xE4t an ist","flow.reload_if_needed":"l\xE4dt die Integration neu, falls nicht bereit","flow.cooldown":"danach {seconds} Abk\xFChlzeit","flow.summary_start":"Aktiv fr\xFChestens nach {min}, sp\xE4testens nach {max}, wenn jede Bereitschaftspr\xFCfung ihr ganzes Zeitlimit braucht.","flow.summary_start_fixed":"Aktiv nach {min}.","flow.summary_stop":"Aus, sobald die Ger\xE4te ausgeschaltet und die Aktionen beim Stopp fertig sind.","flow.summary_stop_cut":"Aus, sobald die Ger\xE4te ausgeschaltet und die Aktionen beim Stopp fertig sind; die letzte Steckdose geht nach {seconds} aus."}};function x(r,s,e={}){let t=(r??"en").split("-")[0],i=xt[t]?.[s]??xt.en[s];if(i===void 0)return L(r,s,e);for(let[n,o]of Object.entries(e))i=i.replace(`{${n}}`,o);return i}var Y=class extends g{constructor(){super(),this.profiles=[]}_t(s,e){return x(this.hass?.language,s,e)}_changed(){this.dispatchEvent(new CustomEvent("profiles-changed"))}render(){if(this._editing)return this._renderEditor(this._editing);let s=this.profiles.filter(t=>t.source==="builtin"),e=this.profiles.filter(t=>t.source==="user");return a`
      <p class="ltek-hint">${this._t("profiles_intro")}</p>
      ${this._notice?a`<p class="ltek-hint ok">${this._notice}</p>`:p}
      <details class="ltek-sec" open>
        <summary>
          <ha-icon icon="mdi:account-cog-outline"></ha-icon>${this._t("profiles_yours")}
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="ltek-body">
          <div class="ltek-buttons bar">
            <button class="ltek-btn" @click=${this._openImport}><ha-icon icon="mdi:import"></ha-icon> ${this._t("profile_import")}</button>
            ${e.length?a`<button class="ltek-btn" @click=${()=>this._openExport(e.map(t=>t.id))}>
                  <ha-icon icon="mdi:export"></ha-icon> ${this._t("profile_export_all")}
                </button>`:p}
          </div>
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
        <div class="ltek-body"><div class="ltek-list">${s.map(t=>this._row(t))}</div></div>
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
    `}_row(s){let e=s.source==="builtin",t=this._preview===s.id,i=s.generic?this._t("profile_generic"):s.used_by?.length?this._t("profile_used_by",{where:s.used_by.join(", ")}):this._t("profile_unused");return a`<div class="ltek-item ${t?"open":""}">
        <ha-icon class="lead" icon=${e?"mdi:lock-outline":"mdi:account-cog-outline"}></ha-icon>
        <span class="ltek-item-text">
          <span class="ltek-name">${s.name}</span>
          <span class="ltek-subline">${s.integration==="*"?"":`${s.integration} \xB7 `}${i}</span>
        </span>
        ${s.tested?p:a`<span class="ltek-badge warn" title=${this._t("profile_untested")}>!</span>`}
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
        ${e?p:a`<button class="ltek-del" title=${this._t("delete")} @click=${()=>this._delete(s)}>
              <ha-icon icon="mdi:trash-can-outline"></ha-icon>
            </button>`}
      </div>
      ${t?a`<div class="preview">${$t(s,(n,o)=>this._t(n,o)).map(n=>a`<div>${n}</div>`)}</div>`:p}`}_edit(s){this._notice=void 0,this._editing={data:s.data,previousId:s.source==="user"?s.id:null,readonly:s.source==="builtin"}}async _duplicate(s){let e=await this.hass.callWS({type:"easy_av_control/profiles/duplicate",profile_id:s});this._notice=void 0,this._editing={data:e,previousId:null,readonly:!1}}async _delete(s){window.confirm(this._t("profile_delete_confirm",{name:s.name}))&&(await this.hass.callWS({type:"easy_av_control/profiles/delete",profile_id:s.id}),this._changed())}async _save(){let s=this._editing,e=await this.hass.callWS({type:"easy_av_control/profiles/save",profile:s.data,previous_id:s.previousId});if(e.error){this._editing={...s,error:e.error.message};return}this._editing=void 0,this._notice=this._t("profile_saved"),this._changed()}_renderEditor(s){return a`
      <div class="ltek-buttons bar">
        <button class="ltek-btn" @click=${()=>this._editing=void 0}>
          <ha-icon icon="mdi:arrow-left"></ha-icon> ${this._t(s.readonly?"profile_close":"profile_cancel")}
        </button>
        ${s.readonly?p:a`<button class="ltek-btn primary" @click=${this._save}>${this._t("profile_save")}</button>`}
      </div>
      <details class="ltek-sec" open>
        <summary>
          <ha-icon icon=${s.readonly?"mdi:lock-outline":"mdi:pencil"}></ha-icon>${String(s.data.name??s.data.id)}
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="ltek-body">
          <p class="ltek-hint">${this._t(s.readonly?"profile_readonly":"profile_editor_hint")}</p>
          ${s.error?a`<p class="ltek-error">${s.error}</p>`:p}
          <ha-form
            .hass=${this.hass}
            .data=${{yaml:s.data}}
            .schema=${[{name:"yaml",selector:{object:{}}}]}
            .disabled=${s.readonly}
            .computeLabel=${()=>""}
            @value-changed=${e=>{if(s.readonly)return;let t=e.detail.value.yaml;t&&typeof t=="object"&&(this._editing={...s,data:t,error:void 0})}}
          ></ha-form>
        </div>
      </details>
    `}async _openExport(s){let e=await this.hass.callWS({type:"easy_av_control/profiles/export",ids:s});this._dialog={mode:"export",text:JSON.stringify(e,null,2)},await this.updateComplete,this._showDialog()}async _openImport(){this._dialog={mode:"import",text:""},await this.updateComplete,this._showDialog()}_showDialog(){let s=this.shadowRoot?.querySelector("dialog");s&&!s.open&&s.showModal()}_closeDialog(){this.shadowRoot?.querySelector("dialog")?.close(),this._dialog=void 0}async _copy(s){let e=s.currentTarget,t=this.shadowRoot.querySelector("textarea");t.select();let i=!1;try{i=document.execCommand("copy")}catch{i=!1}if(!i)try{await navigator.clipboard.writeText(t.value),i=!0}catch{i=!1}e.textContent=this._t(i?"profile_copied":"profile_copy_failed")}async _paste(){try{let s=await navigator.clipboard.readText();this._dialog={...this._dialog,text:s}}catch{this._dialog={...this._dialog,message:this._t("profile_paste_failed")}}}async _import(){let s;try{s=JSON.parse(this._dialog.text)}catch(i){this._dialog={...this._dialog,message:String(i)};return}let e=await this.hass.callWS({type:"easy_av_control/profiles/import",export:s});if(e.error){this._dialog={...this._dialog,message:e.error.message};return}let t=[this._t("profile_import_done",{added:(e.added??[]).join(", ")||"\u2013"})];for(let[i,n]of Object.entries(e.renamed??{}))t.push(this._t("profile_import_renamed",{from:i,to:n}));Object.keys(e.invalid??{}).length&&t.push(this._t("profile_import_invalid",{ids:Object.keys(e.invalid).join(", ")})),this._closeDialog(),this._notice=t.join(" \xB7 "),this._changed()}_renderDialog(){let s=this._dialog;if(!s)return p;let e=s.mode==="export";return a`<dialog @cancel=${this._closeDialog} @click=${t=>t.target===t.currentTarget&&this._closeDialog()}>
      <div class="dialog-body">
        <div class="ltek-group first">${this._t(e?"profile_export":"profile_import")}</div>
        ${e?p:a`<p class="ltek-hint">${this._t("profile_import_hint")}</p>`}
        <textarea
          class="ltek-text"
          rows="16"
          .value=${s.text}
          ?readonly=${e}
          @input=${t=>this._dialog={...s,text:t.target.value}}
        ></textarea>
        ${s.message?a`<p class="ltek-hint ltek-warn">${s.message}</p>`:p}
        <div class="ltek-buttons">
          ${e?a`<button class="ltek-btn primary" @click=${this._copy}>${this._t("profile_copy")}</button>`:a`<button class="ltek-btn" @click=${this._paste}>${this._t("profile_paste")}</button>
                <button class="ltek-btn primary" ?disabled=${!s.text.trim()} @click=${this._import}>${this._t("profile_import")}</button>`}
          <button class="ltek-btn" @click=${this._closeDialog}>${this._t("profile_close")}</button>
        </div>
      </div>
    </dialog>`}};Y.properties={hass:{attribute:!1},profiles:{attribute:!1},_preview:{state:!0},_editing:{state:!0},_dialog:{state:!0},_notice:{state:!0}},Y.styles=[b,y,v`
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
    `];customElements.get("easy-av-control-profiles")||customElements.define("easy-av-control-profiles",Y);var At=["power_on","power_off","set_source","set_volume","set_sound_mode","set_brightness","set_color_temp","set_position","set_tilt","call_action","delay","wait_available"],N=["volume","channels","transport","navigation"],Ne={number:{min:0,max:3600,step:1,mode:"box",unit_of_measurement:"s"}},Ve={number:{min:0,max:100,step:1,mode:"slider"}};function Z(r,s,e,t="source_list"){if(!e)return[];let i=r.states[e]?.attributes[t];return Array.isArray(i)&&i.length?i.map(String):s[e]??[]}function Ie(r,s,e){return Z(r,s,e,"source_list")}var Me=["source","sound_mode"],St=["number","input_number","select","input_select","switch","input_boolean"],Le={source:"source_list",sound_mode:"sound_mode_list"};function He(r,s,e,t,i={}){let n=s.devices?.[e]?.entity_id;if(!n)return[];let o=[];if(n.startsWith("media_player."))for(let d of Me){let l=Le[d];Z(r,t[l]??{},n,l).length&&o.push({device:e,setting:d})}for(let d of i[n]??[])o.push({device:e,entity:d});return o}function Xt(r,s,e,t,i={}){let n=s.devices?.[e]?.settings;return Array.isArray(n)?n.map(o=>({...o,device:e})):He(r,s,e,t,i)}function Et(r,s,e,t,i={}){return(e.devices??[]).flatMap(n=>Xt(r,s,n,t,i))}function Q(r){return typeof r=="object"&&r!==null&&"source"in r}function Tt(r,s,e,t,i={},n={}){let d={name:"device",required:!0,selector:{select:{options:Object.entries(s.devices??{}).map(([u,h])=>({value:u,label:h.name?`${h.name} (${u})`:u})),mode:"dropdown"}}},l=e.device?s.devices?.[e.device]?.entity_id:void 0;return[...{power_on:[d],power_off:[d],set_source:[d,{name:"source",required:!0,selector:{select:{options:Ie(r,i,l),custom_value:!0,mode:"dropdown"}}}],set_volume:[d,{name:"volume_level",required:!0,selector:{number:{min:0,max:1,step:.01,mode:"slider"}}}],set_sound_mode:[d,{name:"sound_mode",required:!0,selector:{select:{options:Z(r,n,l,"sound_mode_list"),custom_value:!0,mode:"dropdown"}}}],set_brightness:[d,{name:"brightness_pct",selector:Ve},{name:"color_temp_kelvin",selector:{color_temp:{unit:"kelvin",min:2e3,max:6500}}},{name:"transition",selector:Ne}],set_color_temp:[d,{name:"color_temp_kelvin",required:!0,selector:{color_temp:{unit:"kelvin",min:2e3,max:6500}}}],set_position:[d,{name:"position",required:!0,selector:Ve}],set_tilt:[d,{name:"tilt_position",required:!0,selector:Ve}],call_action:[{name:"action",required:!0,selector:{text:{}}},{name:"target",selector:{target:{}}},{name:"data",selector:{object:{}}}],delay:[],wait_available:[{...d,required:!1},{name:"entity_id",selector:{entity:{}}},{name:"timeout",selector:Ne},{name:"reload_integration",selector:{boolean:{}}},{name:"on_timeout",selector:{select:{options:[{value:"abort",label:t("on_timeout_abort")},{value:"continue",label:t("on_timeout_continue")}],mode:"dropdown"}}}]}[e.type]??[],{name:"delay_after",selector:Ne}]}function w(r,s=[]){let e={};for(let[t,i]of Object.entries(r))if(s.includes(t))e[t]=i;else{if(i==null||i==="")continue;if(Array.isArray(i)&&i.length===0)continue;if(typeof i=="object"&&!Array.isArray(i)&&Object.keys(i).length===0)continue;e[t]=i}return e}function be(r){let s=N.filter(e=>r[e]===null);return Array.isArray(r.settings)&&s.push("settings"),w(r,s)}function V(r){return r.normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/ß/g,"ss").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")}function R(r,s){let e=new Set(s),t=r||"item";if(!e.has(t))return t;let i=2;for(;e.has(`${t}_${i}`);)i+=1;return`${t}_${i}`}function Ge(r,s){let e=[];for(let[t,i]of Object.entries(r.activities??{}))((i.devices??[]).includes(s)||(i.steps??[]).some(o=>o.device===s)||N.some(o=>i.remote?.[o]===s)||(i.remote?.buttons??[]).some(o=>typeof o=="object"&&o?.device===s))&&e.push(i.name??t);return e}function Be(r,s,e){let t={};for(let[o,d]of Object.entries(r.devices??{}))t[o===s?e:o]=d;let i=o=>o===s?e:o,n={};for(let[o,d]of Object.entries(r.activities??{})){let l=d.remote?{...d.remote}:void 0;if(l){for(let c of N)c in l&&(l[c]=i(l[c]));Array.isArray(l.buttons)&&(l.buttons=l.buttons.map(c=>typeof c=="object"&&c?{...c,device:i(c.device)}:c))}n[o]=w({...d,devices:d.devices?.map(c=>i(c)),steps:d.steps?.map(c=>c.device===s?{...c,device:e}:c),remote:l})}return{...r,devices:t,activities:n}}var Jt=400,ei={state:"mdi:flag-outline",outlets_on:"mdi:power-socket-eu",outlets_off:"mdi:power-socket-eu",outlet_keep:"mdi:power-socket-eu",turn_on:"mdi:power",turn_off:"mdi:power-off",hook:"mdi:script-text-outline",hook_wait:"mdi:script-text-outline",boot:"mdi:timer-sand",wait:"mdi:timer-sand",reload:"mdi:reload",ready:"mdi:lan-connect",status:"mdi:state-machine",already_on:"mdi:check",step:"mdi:tune-variant"},ti=new Set(["boot","reload","ready","status","turn_on","wait","already_on","step","turn_off"]),X=class extends g{constructor(){super();this._request=0;this._mode="start"}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._timer)}willUpdate(e){if(e.has("activityId")&&e.get("activityId")!==void 0&&(this._from=void 0),this._from!==void 0&&!this.room.activities?.[this._from]&&(this._from=void 0),["room","roomId","activityId","_mode","_from"].some(t=>e.has(t))){window.clearTimeout(this._timer);let i=!(this._flow===void 0&&this._failed===void 0)&&e.has("room")?Jt:0;this._timer=window.setTimeout(()=>this._load(),i)}}async _load(){let e=++this._request;try{let t=await this.hass.callWS({type:"easy_av_control/config/flow",room:this.roomId,config:this.room,activity:this.activityId,mode:this._mode,...this._mode==="start"&&this._from?{from:this._from}:{}});e===this._request&&(this._flow=t,this._failed=void 0)}catch(t){e===this._request&&(this._failed=t.message??String(t))}}_t(e,t){return x(this.hass?.language,e,t)}_entity(e){let t=String(e??"");return this.hass.states[t]?.attributes.friendly_name||t}_device(e){let t=String(e??""),i=this.room.devices?.[t];return i?.name||(i?.entity_id?this._entity(i.entity_id):"")||t}_activity(e){let t=String(e??"");return this.room.activities?.[t]?.name||t}_list(e){return(e??[]).map(t=>this._entity(t)).join(", ")}_seconds(e){return`${Math.round(Number(e)*10)/10} s`}_time([e,t]){return e===t?this._seconds(e):`${this._seconds(e).slice(0,-2)}\u2013${this._seconds(t)}`}_text(e){let t=this._device(e.device);switch(e.kind){case"state":return this._t(`flow.state_${e.state}`);case"outlets_on":return this._t("flow.outlets_on",{outlets:this._list(e.entities)});case"outlets_off":return this._t(e.after_status?"flow.outlets_off_status":e.background?"flow.outlets_off_later":"flow.outlets_off",{outlets:this._list(e.entities)});case"outlet_keep":return this._t("flow.outlet_keep",{outlet:this._entity(e.entity_id)});case"hook":return this._t(`flow.${e.hook}`);case"hook_wait":return this._t(`flow.${e.hook}_wait`);case"already_on":return this._t("flow.already_on",{activity:this._activity(e.previous)});case"boot":return this._t("flow.boot",{seconds:this._seconds(e.seconds)});case"reload":return this._t("flow.reload",{entity:this._entity(e.entity_id)});case"ready":{let i=Array.isArray(e.states)?e.states:e.states?[e.states]:[],n={entity:this._entity(e.entity_id),states:i.join(" / "),timeout:this._seconds(e.timeout)};return[e.step?`${e.step}. `:"",this._t(i.length?"flow.ready_state":"flow.ready",n)," ",this._t(`flow.on_timeout_${e.on_timeout}`)].join("")}case"turn_on":case"turn_off":{let i=e.step?`${e.step}. `:"";return e.skip?i+this._t("flow.cannot_switch",{device:t}):i+this._t(e.reason==="unused"?"flow.turn_off_unused":`flow.${e.kind}`,{device:t})}case"status":return this._t(e.target==="off"?"flow.status_off":"flow.status_on",{device:t,entity:this._entity(e.entity_id),timeout:this._seconds(e.timeout)});case"wait":return this._t(e.reason==="delay_after_on"?"flow.wait_on":"flow.wait",{seconds:this._seconds(e.seconds)});case"step":return`${e.step}. ${this._t(`step.${e.step_type}`)}${this._stepValue(e)}`;default:return e.kind}}_stepValue(e){let t=e.data??{},i=[];for(let[n,o]of Object.entries(t))n==="volume_level"?i.push(`${Math.round(Number(o)*100)} %`):n==="brightness_pct"||n==="position"||n==="tilt_position"?i.push(`${o} %`):n==="color_temp_kelvin"?i.push(`${o} K`):n==="transition"?i.push(this._seconds(o)):e.step_type!=="call_action"&&i.push(String(o));return i.length?`: ${i.join(", ")}`:""}_notes(e){let t=[];if(typeof e.condition=="string"&&t.push(this._t(`flow.if.${e.condition}`)),e.kind==="ready"&&e.reload&&t.push(this._t("flow.reload_if_needed")),e.kind==="status"&&Number(e.debounce)>0&&t.push(this._t("flow.debounce",{seconds:this._seconds(e.debounce)})),e.kind==="turn_off"&&Number(e.cooldown)>0&&t.push(this._t("flow.cooldown",{seconds:this._seconds(e.cooldown)})),Array.isArray(e.already_on)&&e.already_on.length&&t.push(this._t("flow.outlets_already_on",{outlets:this._list(e.already_on)})),Array.isArray(e.unless_rooms)&&e.unless_rooms.length&&t.push(this._t("flow.unless_rooms",{rooms:e.unless_rooms.join(", ")})),e.kind==="hook"){let i=e.actions??[];t.push(this._t("flow.parallel")),i.length&&t.push(i.join(", "))}return t}_call(e){if(typeof e.action!="string"||e.kind==="hook")return;let t=e.entities?this._list(e.entities):e.entity_id?this._entity(e.entity_id):"";return t?`${e.action} \u2192 ${t}`:e.action}_renderRow(e,t,i){let n=this._notes(e),o=this._call(e),d=e.kind==="device"||e.kind==="steps";return a`<li class=${[t?"nested":"",d?"header":"",e.kind].join(" ")}>
      <span class="time">${i?this._time(e.at):""}</span>
      ${d?a`<span class="index">${e.kind==="device"?e.index:"\u2261"}</span>`:a`<ha-icon class="icon" .icon=${ei[e.kind]??"mdi:circle-small"}></ha-icon>`}
      <span class="body">
        <span class="what"
          >${e.kind==="device"?this._device(e.device):e.kind==="steps"?this._t("flow.steps"):this._text(e)}</span
        >
        ${e.kind==="device"?a`<span class="call">${e.entity_id}</span>`:p}
        ${o?a`<span class="call">${o}</span>`:p}
        ${n.length?a`<span class="notes">${n.map(l=>a`<span class="note">${l}</span>`)}</span>`:p}
      </span>
    </li>`}_renderRows(e){let t=e.filter(l=>!l.background),i=e.filter(l=>l.background),n=!1,o="",d=t.map(l=>{l.kind==="device"||l.kind==="steps"?n=!0:(!ti.has(l.kind)||l.reason==="unused")&&(n=!1);let c=this._time(l.at),u=c!==o||l.kind==="state";return o=c,this._renderRow(l,n&&l.kind!=="device"&&l.kind!=="steps",u)});return a`<ol class="flow">${d}</ol>
      ${i.length?a`<h4>${this._t("flow.background")}</h4>
            <ol class="flow">${i.map(l=>this._renderRow(l,!1,!0))}</ol>`:p}`}render(){let e=Object.entries(this.room.activities??{}).filter(([t])=>t!==this.activityId);return a`
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
            </select>`:p}
      </div>
      ${this._renderBody()}
    `}_renderBody(){if(this._failed)return a`<p class="error">${this._t("flow.failed",{error:this._failed})}</p>`;let e=this._flow;if(!e)return a`<p class="hint">${this._t("loading")}</p>`;if(e.error){let d=e.error.path.join(".");return a`<p class="error">
        ${this._t("flow.invalid",{error:d?`${d}: ${e.error.message}`:e.error.message})}
      </p>`}let[t,i]=e.done,n=e.rows.filter(d=>d.background).map(d=>d.at[0]),o=this._mode==="start"?this._t(t===i?"flow.summary_start_fixed":"flow.summary_start",{min:this._seconds(t),max:this._seconds(i)}):this._t(n.length?"flow.summary_stop_cut":"flow.summary_stop",{seconds:this._seconds(Math.max(0,...n))});return a`${this._renderRows(e.rows)}
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
  `];customElements.get("easy-av-control-flow")||customElements.define("easy-av-control-flow",X);var I={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Rt=r=>(...s)=>({_$litDirective$:r,values:s}),ye=class{constructor(s){}get _$AU(){return this._$AM._$AU}_$AT(s,e,t){this._$Ct=s,this._$AM=e,this._$Ci=t}_$AS(s,e){return this.update(s,e)}update(s,e){return this.render(...e)}};var{I:is}=ht;var Ot=r=>r.strings===void 0;var ii={},Ct=(r,s=ii)=>r._$AH=s;var We=Rt(class extends ye{constructor(r){if(super(r),r.type!==I.PROPERTY&&r.type!==I.ATTRIBUTE&&r.type!==I.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ot(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(r,[s]){if(s===k||s===p)return s;let e=r.element,t=r.name;if(r.type===I.PROPERTY){if(s===e[t])return k}else if(r.type===I.BOOLEAN_ATTRIBUTE){if(!!s===e.hasAttribute(t))return k}else if(r.type===I.ATTRIBUTE&&e.getAttribute(t)===s+"")return k;return Ct(r),s}});var J=class extends g{constructor(){super(...arguments);this._loading=!1}setConfig(e){this._config=e}updated(){this.hass&&this._rooms===void 0&&!this._loading&&(this._loading=!0,this.hass.callWS({type:"easy_av_control/control/rooms"}).then(e=>this._rooms=e).catch(()=>this._rooms=[]).finally(()=>this._loading=!1))}_schema(){let e=(this._rooms??[]).map(i=>i.room);return[{name:"room",required:!0,selector:{select:{mode:"dropdown",options:(this._rooms??[]).map(i=>({value:e.filter(n=>n===i.room).length>1?`${i.entry_id}/${i.room}`:i.room,label:i.name}))}}},{name:"name",selector:{text:{}}}]}render(){if(!this.hass||!this._config)return p;let e={...this._config,room:this._config.entry_id?`${this._config.entry_id}/${this._config.room}`:this._config.room},t=(this._rooms??[]).some(n=>n.room===this._config.room);this._rooms&&!t&&this._config.room&&(e.room=this._config.room);let i=n=>L(this.hass?.language,n);return a`<details class="ltek-sec" open>
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
            .computeLabel=${n=>i(`editor.${n.name}`)}
            @value-changed=${this._valueChanged}
          ></ha-form>
        </div>
      </details>
      <div class="ltek-links">
        <a class="ltek-star" href=${T} target="_blank" rel="noopener">${i("editor.star")}</a>
        <a class="ltek-issue" href="${T}/issues" target="_blank" rel="noopener">${i("editor.report")}</a>
      </div>`}_valueChanged(e){e.stopPropagation();let t={...e.detail.value},i={...this._config,...t},n=String(t.room??"");if(n.includes("/")){let[o,d]=n.split("/",2);i.entry_id=o,i.room=d}else delete i.entry_id;i.name||delete i.name,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}};J.properties={hass:{attribute:!1},_config:{state:!0},_rooms:{state:!0}},J.styles=[b,y,v`
    :host {
      display: block;
    }
  `];customElements.get("easy-av-control-card-editor")||customElements.define("easy-av-control-card-editor",J);function H(r,s){let e=`command.${r}`,t=s(e);if(t!==e)return t;let i=r.replace(/[_-]+/g," ").trim();return i.charAt(0).toUpperCase()+i.slice(1)}var si=new Set(["off","standby","unavailable","unknown"]);function Pt(r,s){if(!r||si.has(r.state))return;let e=r.attributes,t=$=>typeof e[$]=="string"&&e[$]?e[$]:void 0,i=$=>typeof e[$]=="number"?e[$]:void 0,n=t("app_name"),o=t("media_title")??n;if(!o)return;let d=i("media_season")??t("media_season"),l=i("media_episode")??t("media_episode"),c=t("media_series_title"),u=c&&(d!==void 0||l!==void 0)?`${c} \xB7 ${[d!==void 0?`S${d}`:"",l!==void 0?`E${l}`:""].filter(Boolean).join(" ")}`:c??t("media_artist")??t("media_album_name"),h=r.state==="playing",m=i("media_duration"),f=m!==void 0&&m>0?m:void 0,_=i("media_position"),A=t("media_position_updated_at");return _!==void 0&&h&&A&&!Number.isNaN(Date.parse(A))&&(_+=(s-Date.parse(A))/1e3),_!==void 0&&f!==void 0&&(_=Math.max(0,Math.min(f,_))),{title:o,app:o===n?void 0:n,subtitle:u,picture:t("entity_picture"),playing:h,duration:f,position:f!==void 0?_:void 0}}function ee(r){let s=Math.floor(r),e=Math.floor(s/3600),t=Math.floor(s%3600/60),i=String(s%60).padStart(2,"0");return e?`${e}:${String(t).padStart(2,"0")}:${i}`:`${t}:${i}`}function Dt(r,s){let e=Math.max(0,Math.ceil((Date.parse(r)-s)/1e3));return e>=60?ee(e):`${e} s`}function jt(r,s,e){let t=r.names.length?r.names.join(", "):r.outlet;return{text:e("cooling.text",{names:t}),time:e(r.status?"cooling.time_status":"cooling.time",{time:Dt(r.until,s)})}}function zt(r,s,e){if(!r)return;let t=r.name??"",i={step:String(r.step??""),steps:String(r.steps??"")},n;switch(r.kind){case"step":{let l=e(`step.${r.step_type}`);n=e("doing.step",{...i,what:t?`${l} (${t})`:l});break}case"wait":n=e("doing.wait",i);break;case"hooks":n=e(`doing.hooks_${r.hook}`);break;case"status":n=r.value?e(`doing.status_${r.target==="off"?"off":"on"}_value`,{name:t,value:r.value}):e(`doing.status_${r.target==="off"?"off":"on"}`,{name:t});break;default:n=e(`doing.${r.kind}`,{name:t})}if(!r.until)return{text:n};let o=Dt(r.until,s),d=r.kind==="ready"||r.kind==="status";return{text:n,time:e(d?"doing.at_most":"doing.left",{time:o})}}var we=class{constructor(){this.originX=0;this.originY=0;this.startX=0;this.startY=0;this.startTime=0;this.moved=!1}start(s,e,t){this.originX=this.startX=s,this.originY=this.startY=e,this.startTime=t,this.moved=!1}move(s,e){Math.hypot(s-this.startX,e-this.startY)>10&&(this.moved=!0);let t=[];for(;;){let i=s-this.originX,n=e-this.originY;if(Math.max(Math.abs(i),Math.abs(n))<40)return t;Math.abs(i)>=Math.abs(n)?(t.push(i>0?"right":"left"),this.originX+=Math.sign(i)*40,this.originY=e):(t.push(n>0?"down":"up"),this.originY+=Math.sign(n)*40,this.originX=s)}}end(s,e,t){return Math.hypot(s-this.startX,e-this.startY)>10&&(this.moved=!0),!this.moved&&t-this.startTime<=500}};function Ue(r,s){return`easy-av-control-touchpad:${r}:${s}`}function Nt(r,s){return r==="on"?!0:r==="off"?!1:s}var ke="easy_av_control",Ke={volume_up:"mdi:volume-plus",volume_down:"mdi:volume-minus",mute:"mdi:volume-off",channel_up:"mdi:chevron-up",channel_down:"mdi:chevron-down",play_pause:"mdi:play-pause",play:"mdi:play",pause:"mdi:pause",stop:"mdi:stop",next:"mdi:skip-next",previous:"mdi:skip-previous",up:"mdi:chevron-up",down:"mdi:chevron-down",left:"mdi:chevron-left",right:"mdi:chevron-right",back:"mdi:arrow-u-left-top",menu:"mdi:menu",home:"mdi:home-outline",info:"mdi:information-outline",guide:"mdi:television-guide",exit:"mdi:close",select_source:"mdi:apps"},ni=["back","home","menu","info","guide","exit"],oi=["previous","play_pause","play","pause","stop","next"],ri=new Set(["volume_up","volume_down","up","down","left","right"]),ai=400,li=200;function Vt(r){return`easy-av-control-settings:${r}`}var di=3e4,ci={idle:"mdi:power",starting:"mdi:timer-sand",active:"mdi:power",stopping:"mdi:timer-sand",error:"mdi:alert-circle-outline"},te=class extends g{constructor(){super();this._padChoices=new Map;this._settingsOpen=new Map;this._settingDrafts=new Map;this._view=null,this._loaded=!1}static getConfigElement(){return document.createElement("easy-av-control-card-editor")}static async getStubConfig(e){try{return{room:(await e.callWS({type:`${ke}/control/rooms`}))[0]?.room??""}}catch{return{room:""}}}setConfig(e){if(!e||typeof e.room!="string")throw new Error("room is required");let t=e.room!==this._config?.room||e.entry_id!==this._config?.entry_id;this._config=e,t&&this._resubscribe()}getCardSize(){return this._view?.remote?8:3}getGridOptions(){return{columns:12,min_columns:6}}connectedCallback(){super.connectedCallback(),this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._pressEnd(!1),window.clearInterval(this._tickTimer),this._tickTimer=void 0,this._unsubscribeNow()}willUpdate(e){e.has("preview")&&this.preview&&(this._config={type:"custom:easy-av-control-card",room:this.preview.room},this._view=this.preview,this._loaded=!0)}updated(e){let t=this._nowPlaying(),i=t?.playing===!0&&t.duration!==void 0||!!this._view?.current?.until||!!this._view?.cooling?.length;i&&this._tickTimer===void 0?this._tickTimer=window.setInterval(()=>this.requestUpdate(),1e3):!i&&this._tickTimer!==void 0&&(window.clearInterval(this._tickTimer),this._tickTimer=void 0),e.has("hass")&&!this._unsubscribe&&this._retryTimer===void 0&&this._subscribe()}_subscribe(){if(this.preview||!this.hass||!this._config?.room||this._unsubscribe||!this.isConnected)return;let e={type:`${ke}/control/subscribe`,room:this._config.room};this._config.entry_id&&(e.entry_id=this._config.entry_id);let t=this.hass.connection.subscribeMessage(i=>{this._unsubscribe===t&&(this._view=i,this._loaded=!0,this._subscribeError=void 0)},e);this._unsubscribe=t,t.catch(i=>{this._unsubscribe===t&&(this._subscribeError=i?.message??String(i),this._loaded=!0,this._unsubscribe=void 0,this._retryTimer=window.setTimeout(()=>{this._retryTimer=void 0,this._subscribe()},di))})}_unsubscribeNow(){window.clearTimeout(this._retryTimer),this._retryTimer=void 0;let e=this._unsubscribe;this._unsubscribe=void 0,e?.then(t=>t()).catch(()=>{})}_resubscribe(){this._unsubscribeNow(),this._view=null,this._loaded=!1,this._subscribe()}_t(e,t){return L(this.hass?.language,e,t)}_call(e,t={}){if(!(!this.hass||!this._view)){if(this._haptic(),this.preview){this.dispatchEvent(new CustomEvent("preview-call",{detail:{service:e,data:t}}));return}this.hass.callService(ke,e,{room:this._view.room,...t}).catch(i=>this._toast(i?.message??String(i)))}}_send(e,t={}){this._call("send_command",{command:e,...t})}_haptic(){this.dispatchEvent(new CustomEvent("haptic",{detail:"light",bubbles:!0,composed:!0}))}_toast(e){this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:e},bubbles:!0,composed:!0}))}_pressStart(e,t,i={}){if(e.button!==0)return;this._pressEnd(!1);let n={command:t,extra:i,sent:!1};this._press=n,ri.has(t)&&(this._repeatTimer=window.setTimeout(()=>{n.sent=!0,this._send(t,i),this._repeatTimer=window.setInterval(()=>this._send(t,i),li)},ai))}_pressEnd(e){let t=this._press;this._press=void 0,this._stopRepeat(),e&&t&&!t.sent&&this._send(t.command,t.extra)}_stopRepeat(){this._repeatTimer!==void 0&&(window.clearTimeout(this._repeatTimer),window.clearInterval(this._repeatTimer),this._repeatTimer=void 0)}_keySend(e,t,i={}){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._send(t,i))}render(){if(!this._config?.room)return a`<ha-card><div class="message">${this._t("no_room")}</div></ha-card>`;if(!this._loaded)return a`<ha-card><div class="message">${this._t("loading")}</div></ha-card>`;let e=this._view;return e?a`<ha-card>
      ${this._renderHeader(e)} ${this._renderStatus(e)} ${this._renderNowPlaying()}
      ${this._renderActivities(e)}
      ${e.remote?this._renderRemote(e):p}
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
        <ha-icon .icon=${ci[e.state]??"mdi:power"}></ha-icon>
      </button>
    </div>`}_renderStatus(e){let t=e.state==="starting"||e.state==="stopping",[i,n]=e.progress,o=n>0?Math.round(i/n*100):0,d=t?zt(e.current,Date.now(),(l,c)=>this._t(l,c)):void 0;return a`
      ${t?a`<div
            class="progress"
            role="progressbar"
            aria-label=${this._t(`state.${e.state}`)}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow=${o}
          >
            <div style="width: ${e.state==="starting"?o:100}%"></div>
          </div>`:p}
      ${d?a`<div class="doing" aria-live="polite">
            <span class="doing-text">${d.text}</span>
            ${d.time?a`<span class="doing-time">${d.time}</span>`:p}
          </div>`:p}
      ${(e.cooling??[]).map(l=>{let{text:c,time:u}=jt(l,Date.now(),(h,m)=>this._t(h,m));return a`<div class="doing cooling">
          <span class="doing-text">${c}</span><span class="doing-time">${u}</span>
        </div>`})}
      ${e.state==="error"&&e.error?a`<div class="message error">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>${e.error}
          </div>`:p}
      ${e.warnings.length&&e.state!=="idle"?a`<details class="warnings">
            <summary>${this._t("warnings")} (${e.warnings.length})</summary>
            <ul>
              ${e.warnings.map(l=>a`<li>${l}</li>`)}
            </ul>
          </details>`:p}
    `}_nowPlaying(){let e=this._view?.remote?.media;return Pt(e?this.hass?.states[e]:void 0,Date.now())}_renderNowPlaying(){let e=this._nowPlaying();if(!e)return p;let t=[e.app,e.playing?void 0:this._t("now.paused")].filter(Boolean).join(" \xB7 ");return a`<div class="now">
      ${e.picture?a`<img
            class="art"
            src=${e.picture}
            alt=""
            @error=${i=>i.target.style.display="none"}
          />`:p}
      <div class="meta">
        ${t?a`<div class="now-top">${t}</div>`:p}
        <div class="now-title">${e.title}</div>
        ${e.subtitle?a`<div class="now-sub">${e.subtitle}</div>`:p}
        ${e.duration!==void 0&&e.position!==void 0?a`<div class="now-progress" role="progressbar" aria-valuemin="0"
                aria-valuemax=${Math.round(e.duration)} aria-valuenow=${Math.round(e.position)}>
                <div style="width: ${e.position/e.duration*100}%"></div>
              </div>
              <div class="now-time">
                <span>${ee(e.position)}</span><span>${ee(e.duration)}</span>
              </div>`:p}
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
    </div>`}_renderRemote(e){let{groups:t,buttons:i}=e.remote,n=t.navigation,o=n?ni.filter(c=>n.commands.includes(c)):[],d=n?Nt(this._padChoice(e),n.touchpad===!0):!1,l=t.transport?oi.filter(c=>t.transport.commands.includes(c)):[];return l.includes("play_pause")&&(l=l.filter(c=>c!=="play"&&c!=="pause")),a`<div class="remote">
      ${t.volume||n||t.channels?a`<div class="main ${n?"":"no-nav"}">
            ${t.volume?this._renderVolumeRocker(t.volume):n?a`<div></div>`:p}
            ${n?d?this._renderTouchpad(n):this._renderDpad(n):p}
            ${t.channels?this._renderChannelRocker(t.channels):n?a`<div></div>`:p}
          </div>`:p}
      ${t.volume?.commands.includes("volume_set")?this._renderSlider(t.volume):p}
      ${n?a`<div class="row">
            ${o.map(c=>this._key(c))}${this._renderPadSwitch(e,d)}
          </div>`:p}
      ${l.length?a`<div class="row">${l.map(c=>this._key(c))}</div>`:p}
      ${i.length?a`<div class="buttons">${i.map(c=>this._customButton(c))}</div>`:p}
      ${e.remote.settings?.length?this._renderSettings(e,e.remote.settings):p}
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
            ${t.map((n,o)=>a`${o===0||t[o-1].device!==n.device?a`<span class="setting-device">${this._settingDevice(n)}</span>`:p}${this._renderSetting(n)}`)}
          </div>`:p}
    </div>`}_renderSetting(e){if(e.setting==="entity")return this._renderEntitySetting(e);let t=this.hass?.states[e.entity_id],i=e.attribute?t?.attributes[e.attribute]:void 0,n=i==null?void 0:String(i);return this._settingRow(e,this._t(`setting.${e.setting}`),this._settingSelect(e,this._t(`setting.${e.setting}`),n,e.options))}_settingDevice(e){return e.name||this.hass?.states[e.device_entity_id]?.attributes.friendly_name||e.device}_settingRow(e,t,i){return a`<div class="setting">
      <span class="setting-name">${t}</span>
      ${i}
    </div>`}_settingSelect(e,t,i,n,o=!1){let d=i!==void 0&&!n.includes(i)?[i,...n]:n;return a`<select
      aria-label=${`${t}, ${this._settingDevice(e)}`}
      .value=${We(i??"")}
      ?disabled=${o||!d.length}
      @change=${l=>{let c=l.target.value;c&&c!==i&&this._send(e.command,{device:e.device,value:c})}}
    >
      ${i===void 0?a`<option value="" disabled>–</option>`:p}
      ${d.map(l=>a`<option value=${l} ?selected=${l===i}>${l}</option>`)}
    </select>`}_renderEntitySetting(e){let t=this.hass?.states[e.entity_id],i=e.label||t?.attributes.friendly_name||e.entity_id,n=!t||t.state==="unavailable"||t.state==="unknown",o=e.entity_id.split(".")[0];if(o==="number"||o==="input_number"){let l=Number(t?.attributes.min??0),c=Number(t?.attributes.max??100),u=Number(t?.attributes.step??1),m=this._settingDrafts.get(e.entity_id)??(n?void 0:Number(t.state)),f=m===void 0||Number.isNaN(m)?"\u2013":`${l<0&&m>0?"+":""}${m}`;return this._settingRow(e,i,a`<span class="setting-range">
          <input
            type="range"
            aria-label=${`${i}, ${this._settingDevice(e)}`}
            min=${l}
            max=${c}
            step=${u}
            .value=${We(String(m??l))}
            ?disabled=${n}
            @input=${_=>{this._settingDrafts.set(e.entity_id,Number(_.target.value)),this.requestUpdate()}}
            @change=${_=>{this._settingDrafts.delete(e.entity_id),this._send(e.command,{device:e.device,value:Number(_.target.value)})}}
          />
          <span class="value">${f}</span>
        </span>`)}if(o==="select"||o==="input_select"){let l=Array.isArray(t?.attributes.options)?t.attributes.options.map(String):[];return this._settingRow(e,i,this._settingSelect(e,i,n?void 0:t.state,e.options.length?e.options:l,n))}let d=t?.state==="on";return this._settingRow(e,i,a`<button
        class="key toggle ${d?"active":""}"
        aria-label=${`${i}, ${this._settingDevice(e)}`}
        aria-pressed=${d?"true":"false"}
        ?disabled=${n}
        @click=${()=>this._send(e.command,{device:e.device,value:d?"off":"on"})}
      >
        ${this._t(d?"toggle.on":"toggle.off")}
      </button>`)}_key(e,t="key",i,n){let o=H(e,d=>this._t(d));return a`<button
      class=${t}
      title=${o}
      aria-label=${o}
      aria-pressed=${n===void 0?p:String(n)}
      @pointerdown=${d=>this._pressStart(d,e)}
      @pointerup=${()=>this._pressEnd(!0)}
      @pointerleave=${()=>this._pressEnd(!1)}
      @pointercancel=${()=>this._pressEnd(!1)}
      @keydown=${d=>this._keySend(d,e)}
      @contextmenu=${d=>d.preventDefault()}
    >
      ${i??a`<ha-icon .icon=${Ke[e]??"mdi:circle-small"}></ha-icon>`}
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
    </div>`}_padChoice(e){if(!e.activity)return null;let t=Ue(e.room,e.activity);if(this._padChoices.has(t))return this._padChoices.get(t);try{return window.localStorage.getItem(t)}catch{return null}}_renderPadSwitch(e,t){let i=this._t(t?"pad.show_arrows":"pad.show_touchpad");return a`<button
      class="key pad-switch"
      title=${i}
      aria-label=${i}
      @click=${()=>{if(!e.activity)return;let n=Ue(e.room,e.activity),o=t?"off":"on";this._padChoices.set(n,o);try{window.localStorage.setItem(n,o)}catch{}this.requestUpdate()}}
    >
      <ha-icon .icon=${t?"mdi:arrow-all":"mdi:gesture-tap"}></ha-icon>
    </button>`}_renderTouchpad(e){let t=n=>e.commands.includes(n),i={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right",Enter:"ok"," ":"ok"};return a`<div
      class="touchpad"
      role="group"
      tabindex="0"
      aria-label=${this._t("touchpad")}
      title=${this._t("touchpad")}
      @pointerdown=${n=>{n.button===0&&(n.currentTarget.setPointerCapture(n.pointerId),this._swipe=new we,this._swipe.start(n.clientX,n.clientY,n.timeStamp))}}
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
    </div>`}_customButton(e){let t=e.name??H(e.command,n=>this._t(n)),i={};return e.device&&(i.device=e.device),e.value!==null&&e.value!==void 0&&(i.value=e.value),a`<button
      class="custom"
      title=${t}
      @pointerdown=${n=>this._pressStart(n,e.command,i)}
      @pointerup=${()=>this._pressEnd(!0)}
      @pointerleave=${()=>this._pressEnd(!1)}
      @pointercancel=${()=>this._pressEnd(!1)}
      @keydown=${n=>this._keySend(n,e.command,i)}
    >
      ${e.icon||Ke[e.command]?a`<ha-icon .icon=${e.icon??Ke[e.command]}></ha-icon>`:p}
      <span>${t}</span>
    </button>`}};te.properties={hass:{attribute:!1},preview:{attribute:!1},_config:{state:!0},_view:{state:!0},_loaded:{state:!0},_subscribeError:{state:!0},_volumeDraft:{state:!0}},te.styles=v`
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
  `;customElements.get("easy-av-control-card")||customElements.define("easy-av-control-card",te);function ui(r,s){let e=r.entities?.[s]?.device_id,i=(e?r.devices?.[e]:void 0)?.identifiers?.find(([n])=>n===ke);return i?i[1]:null}var $e=window;$e.customCards=$e.customCards??[];$e.customCards.some(r=>r.type==="easy-av-control-card")||$e.customCards.push({type:"easy-av-control-card",name:"Easy AV Control Remote",description:"Remote control for an Easy AV Control room",preview:!0,documentationURL:"https://github.com/Ltek/easy-av-control#the-card",getEntitySuggestion:(r,s)=>{let e=ui(r,s);return e?{config:{type:"custom:easy-av-control-card",room:e}}:null}});var pi=400,ie=class extends g{constructor(){super(...arguments);this._request=0}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._timer)}willUpdate(e){if(e.has("activityId")&&(this._pressed=void 0),["room","roomId","activityId"].some(t=>e.has(t))){window.clearTimeout(this._timer);let t=this._preview===void 0&&this._failed===void 0;this._timer=window.setTimeout(()=>this._load(),t?0:pi)}}async _load(){let e=++this._request;try{let t=await this.hass.callWS({type:"easy_av_control/config/remote",room:this.roomId,config:this.room,activity:this.activityId});e===this._request&&(this._preview=t,this._failed=void 0)}catch(t){e===this._request&&(this._failed=t.message??String(t))}}_t(e,t){return x(this.hass?.language,e,t)}_entity(e){let t=String(e??"");return this.hass.states[t]?.attributes.friendly_name||t}_device(e){let t=String(e??""),i=this.room.devices?.[t];return i?.name||(i?.entity_id?this._entity(i.entity_id):"")||t}_button(e,t){let[i,n]=t.split("|"),o=e.remote?.buttons.find(l=>l.command===i&&(l.device??"")===n);if(o?.name)return o.name;let d=e.remote?.settings?.find(l=>l.command===i&&l.device===n);return d?.setting==="entity"?d.label||this._entity(d.entity_id):H(i,l=>this._t(l))}_onCall(e){let{service:t,data:i}=e.detail;t==="send_command"&&(this._pressed=`${i.command}|${i.device??""}`)}_describe(e){let t=e.device?this._device(e.device):this._t("preview.this_activity");switch(e.via){case"media_player":case"entity":return{to:t,how:`${e.action} \u2192 ${this._entity(e.entity_id)}`};case"remote":return{to:t,how:`remote.send_command "${e.key}" \u2192 ${this._entity(e.entity_id)}`};case"device_commands":return{to:t,how:this._t("preview.device_commands",{actions:(e.actions??[]).join(", ")})};case"activity_commands":return{to:t,how:this._t("preview.activity_commands",{actions:(e.actions??[]).join(", ")})};default:return{to:t,how:e.device?this._t("preview.unknown_on_device",{device:t}):this._t("preview.unknown")}}}_renderPressed(e,t){let i=this._pressed?t[this._pressed]:void 0;if(!this._pressed||!i)return a`<p class="pressed hint">${this._t("preview.tap")}</p>`;let{to:n,how:o}=this._describe(i);return a`<p class="pressed ${i.via?"":"bad"}">
      <span class="what">${this._button(e,this._pressed)} → ${n}</span>
      <span class="how">${o}</span>
      ${i.ready?a`<span class="note">${this._t("preview.ready")}</span>`:p}
    </p>`}_renderRoutes(e){return a`<h4>${this._t("preview.groups")}</h4>
      <ul class="routes">
        ${e.map(t=>{let i=t.mode==="hidden"?this._t("preview.hidden"):t.device?`${this._device(t.device)} (${this._t(`preview.mode_${t.mode}`)})`:this._t("preview.no_device"),n=t.commands.length?t.commands.map(o=>H(o,d=>this._t(d))).join(", "):t.mode==="hidden"?"":t.device?this._t("preview.no_keys",{device:this._device(t.device)}):"";return a`<li class=${t.commands.length?"":"off"}>
            <span class="group">${this._t(`field.${t.group}`)}</span>
            <span class="where">${i}</span>
            ${n?a`<span class="keys">${n}</span>`:p}
          </li>`})}
      </ul>`}render(){if(this._failed)return a`<p class="error">${this._t("flow.failed",{error:this._failed})}</p>`;let e=this._preview;if(!e)return a`<p class="hint">${this._t("loading")}</p>`;if(e.error){let d=e.error.path.join(".");return a`<p class="error">
        ${this._t("flow.invalid",{error:d?`${d}: ${e.error.message}`:e.error.message})}
      </p>`}let{view:t,targets:i,routes:n}=e,o=Object.entries(i).filter(([,d])=>!d.via);return a`<div class="layout">
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
                ${o.map(([d,l])=>a`<li>${this._button(t,d)}: ${this._describe(l).how}</li>`)}
              </ul>
            </div>`:p}
        ${this._renderRoutes(n)}
      </div>
    </div>`}};ie.properties={hass:{attribute:!1},room:{attribute:!1},roomId:{attribute:!1},activityId:{attribute:!1},_preview:{state:!0},_failed:{state:!0},_pressed:{state:!0}},ie.styles=[b,y,v`
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
  `];customElements.get("easy-av-control-remote-preview")||customElements.define("easy-av-control-remote-preview",ie);function hi(r){let s=(r??"").split(",").map(e=>e.trim()).filter(Boolean);return s.length>1?s:s[0]}var ne=(r,s=1,e=0)=>({number:{min:e,max:r,step:s,mode:"slider",unit_of_measurement:"s"}}),qe=ne(600),mi={section_device:"mdi:television",section_state:"mdi:state-machine",section_power:"mdi:power-socket-eu",section_delays:"mdi:timer-sand",section_ready:"mdi:lan-connect",card_settings:"mdi:tune-vertical",section_general:"mdi:information-outline",section_activity_devices:"mdi:format-list-numbered",steps:"mdi:playlist-play",remote:"mdi:remote",quick_select:"mdi:gesture-tap-button",section_flow:"mdi:sitemap-outline",section_remote_preview:"mdi:cellphone-screenshot"},_i=ne(120),se=class extends g{constructor(){super();this._relatedKey="";this._detectAsked=new Set;this._toggled=new Set;this._label=e=>this._t(`field.${e.name}`);this._helper=e=>{let t=`helper.${e.name}`,i=this._t(t);return i===t?void 0:i};this._tab="devices",this._view={kind:"list"},this.sources={},this.soundModes={},this._related={},this._detect={},this.profiles=[]}_loadRelated(){let e=[...new Set(Object.values(this.room?.devices??{}).map(i=>i.entity_id).filter(Boolean))].sort(),t=e.join(",");!this.hass||t===this._relatedKey||(this._relatedKey=t,this.hass.callWS({type:"easy_av_control/config/related",entity_ids:e}).then(i=>{t===this._relatedKey&&(this._related=i)}).catch(()=>{}))}willUpdate(e){(e.has("room")||e.has("hass"))&&this._loadRelated(),e.has("roomId")&&e.get("roomId")!==void 0&&(this._view={kind:"list"},this._notice=void 0)}_t(e,t){return x(this.hass?.language,e,t)}_emit(e){this.dispatchEvent(new CustomEvent("room-changed",{detail:{room:e}}))}_show(e){this._view=e,this._notice=void 0,window.scrollTo({top:0})}render(){let e=this._view;if(e.kind==="device"&&this.room.devices?.[e.id])return this._renderDevice(e.id,this.room.devices[e.id]);if(e.kind==="activity"&&this.room.activities?.[e.id])return this._renderActivity(e.id,this.room.activities[e.id]);let t=[{value:"__last",label:this._t("default_last")},...Object.entries(this.room.activities??{}).map(([i,n])=>({value:i,label:n.name??i}))];return a`
      <ha-form
        .hass=${this.hass}
        .data=${{name:this.room.name??"",area_id:this.room.area_id??void 0,default_activity:this.room.default_activity??"__last"}}
        .schema=${[{name:"name",required:!0,selector:{text:{}}},{name:"area_id",selector:{area:{}}},{name:"default_activity",selector:{select:{options:t,mode:"dropdown"}}}]}
        .computeLabel=${i=>this._t(`room_${i.name==="area_id"?"area":i.name}`)}
        .computeHelper=${this._helper}
        @value-changed=${i=>{let n=i.detail.value;this._emit(w({...this.room,name:n.name,area_id:n.area_id,default_activity:n.default_activity==="__last"?void 0:n.default_activity}))}}
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
      ${this._notice?a`<div class="notice">${this._notice}</div>`:p}
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
      ${this._notice?a`<div class="notice">${this._notice}</div>`:p}`}_panel(e,t,i,n,o,d=!0){let l=this._toggled.has(e)?!d:d;return a`<details
      class="ltek-sec"
      ?open=${l}
      @toggle=${c=>{c.target.open===d?this._toggled.delete(e):this._toggled.add(e)}}
    >
      <summary><ha-icon icon=${t}></ha-icon>${i}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="ltek-body">${n?a`<p class="ltek-hint">${n}</p>`:p}${o}</div>
    </details>`}_card(e,t,i,n){let o=Object.entries(mi).find(([d])=>this._t(d)===e);return this._panel(`${this._view.kind}:${e}`,n??o?.[1]??"mdi:tune-variant",e,t,i)}_advanced(e,t){let i=this._t("section_advanced");return this._panel(`${this._view.kind}:${i}`,"mdi:cog-outline",i,e,t,!1)}_deviceTitle(e,t){let i=t.entity_id?this.hass.states[t.entity_id]:void 0;return t.name||i?.attributes.friendly_name||(t.entity_id?e:this._t("new_device"))}_renderDeviceList(){let e=Object.entries(this.room.devices??{});return a`
      <p class="ltek-hint">${this._t("devices_intro")}</p>
      <div class="ltek-list">
        <button class="ltek-add" @click=${this._addDevice}>+ ${this._t("add_device")}</button>
      ${e.length?a`
            ${e.map(([t,i])=>{let n=!i.entity_id||this._entityKnown(i.entity_id);return this._row(this._deviceTitle(t,i),i.entity_id||this._t("no_entity"),()=>this._show({kind:"device",id:t}),n?void 0:this._t("entity_missing"),this._deviceIcon(i))})}`:a`<p class="ltek-hint">${this._t("devices_empty")}</p>`}
      </div>
    `}_entityKnown(e){return e in this.hass.states||e in(this.hass.entities??{})}_row(e,t,i,n,o="mdi:play-circle-outline"){return a`<button class="ltek-item" @click=${i}>
      <ha-icon class="lead" icon=${o}></ha-icon>
      <span class="ltek-item-text">
        <span class="ltek-name">${e}</span>
        <span class="ltek-subline">${t}</span>
        ${n?a`<span class="ltek-warn ltek-subline">${n}</span>`:p}
      </span>
      <ha-icon class="ltek-act" icon="mdi:chevron-right"></ha-icon>
    </button>`}_deviceIcon(e){let i=(e.entity_id?this.hass.states[e.entity_id]:void 0)?.attributes.icon;if(i)return i;let n=e.entity_id?.split(".")[0];return n==="remote"?"mdi:remote":n==="switch"?"mdi:power-socket-eu":"mdi:television"}_deviceData(e){let t=e.ready??null;return{entity_id:e.entity_id,name:e.name,remote_entity:e.remote_entity??void 0,power_switch:e.power_switch??void 0,delay_after_power:e.delay_after_power,delay_after_on:e.delay_after_on,delay_after_off:e.delay_after_off,ready_enabled:t!==null,ready_entity:t?.entity_id,ready_state:Array.isArray(t?.state)?t?.state.join(", "):t?.state,ready_timeout:t?.timeout,ready_reload:t?.reload_integration,ready_on_timeout:t?.on_timeout,commands:e.commands}}_deviceForm(e,t,i){return a`<ha-form
      .hass=${this.hass}
      .data=${t}
      .schema=${i}
      .computeLabel=${this._label}
      .computeHelper=${this._helper}
      @value-changed=${n=>this._deviceChanged(e,{...t,...n.detail.value})}
    ></ha-form>`}_remoteOf(e){let t=this.hass.entities??{},i=e?t[e]?.device_id:void 0;if(i)return Object.values(t).find(n=>n?.device_id===i&&n.entity_id.startsWith("remote."))?.entity_id}_renderDevice(e,t){let i=this._deviceData(t),n=t.ready??null,o=this._remoteOf(t.entity_id),d=n?.entity_id===o&&n?.reload_integration===!0&&t.remote_entity===o,l=Ge(this.room,e);return a`
      ${this._detailHeader(this._t("tab_devices"),this._deviceTitle(e,t),()=>this._deleteDevice(e))}
      ${l.length?a`<p class="ltek-hint">${this._t("used_by",{where:l.join(", ")})}</p>`:p}

      ${this._card(this._t("section_device"),this._t("hint_device"),this._deviceForm(e,i,[{name:"entity_id",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"remote_entity",selector:{entity:{filter:{domain:"remote"}}}}]),"mdi:television")}
      ${this._card(this._t("section_state"),this._t("hint_state"),this._renderState(e,t),"mdi:state-machine")}
      ${this._card(this._t("section_power"),this._t("hint_power"),this._deviceForm(e,i,[{name:"power_switch",selector:{entity:{filter:{domain:["switch","input_boolean","light"]}}}},...t.power_switch?[{name:"delay_after_power",selector:_i}]:[]]),"mdi:power-socket-eu")}
      ${this._card(this._t("section_delays"),this._t("hint_delays"),this._deviceForm(e,i,[{name:"delay_after_on",selector:qe},{name:"delay_after_off",selector:qe}]),"mdi:timer-sand")}
      ${this._card(this._t("section_ready"),this._t("hint_ready"),a`${o&&!d?a`<button class="ltek-btn preset" @click=${()=>this._applyReadyPreset(e,t,o)}>
                ${this._t("ready_preset",{entity:o})}
              </button>`:p}
          ${this._deviceForm(e,i,[{name:"ready_enabled",selector:{boolean:{}}},...n!==null?[{name:"ready_entity",selector:{entity:{}}},{name:"ready_state",selector:{text:{}}},{name:"ready_timeout",selector:qe},{name:"ready_reload",selector:{boolean:{}}},{name:"ready_on_timeout",selector:{select:{options:[{value:"abort",label:this._t("on_timeout_abort")},{value:"continue",label:this._t("on_timeout_continue")}],mode:"dropdown"}}}]:[]])}`)}
      ${this._card(this._t("card_settings"),this._t("device_settings_hint"),this._renderDeviceSettings(e,t))}
      ${this._advanced(this._t("hint_device_advanced"),a`<label class="id">
            ${this._t("device_id")}
            <input
              .value=${e}
              @change=${c=>this._renameDevice(e,c.target.value)}
            />
          </label>
          ${this._deviceForm(e,i,[{name:"commands",selector:{object:{}}}])}`)}
    `}_detectFor(e){if(!e.entity_id||!this.hass)return;let t=Object.fromEntries(ge.filter(n=>e[n]!==void 0).map(n=>[n,e[n]])),i=JSON.stringify([e.entity_id,t]);return this._detectAsked.has(i)||(this._detectAsked.add(i),this.hass.callWS({type:"easy_av_control/config/detect",entity_id:e.entity_id,device:t}).then(n=>this._detect={...this._detect,[i]:n}).catch(()=>this._detectAsked.delete(i))),this._detect[i]}_renderState(e,t){let i=this._detectFor(t);if(!t.entity_id)return a`<p class="ltek-hint">${this._t("no_entity")}</p>`;let n=yt(t,i),o=t.entity_id?this.hass.entities?.[t.entity_id]?.platform:void 0,d=[{value:"__auto",label:this._t("profile.auto")},...this.profiles.filter(m=>!m.generic&&(m.integration===o||m.id===t.profile)).map(m=>({value:m.id,label:`${m.name} (${this._t(m.source==="user"?"profiles_yours":"profiles_builtin")})`}))],l=!!i?.state,c=(m,f)=>f.map(_=>({value:_,label:this._t(`${m}.${_}`)})),u=ze.map(m=>({value:m,label:this._t(m==="stop"?"failure_off.stop":`failure.${m}`)})),h=[...d.length>1?[{name:"profile",selector:{select:{options:d,mode:"dropdown"}}}]:[],{name:"state_source",selector:{select:{mode:"dropdown",options:[{value:"auto",label:this._t("state_source.auto")},{value:"none",label:this._t("state_source.none")},...n.state_source==="custom"?[{value:"custom",label:"YAML"}]:[]]}}},...l?[{name:"wait_on",selector:{select:{mode:"dropdown",options:c("wait",je)}}},{name:"timeout_on",selector:ne(600,5,5)},{name:"on_failure_on",selector:{select:{mode:"dropdown",options:c("failure",ze)}}},{name:"wait_off",selector:{select:{mode:"dropdown",options:c("wait",je)}}},{name:"timeout_off",selector:ne(900,5,5)},{name:"on_failure_off",selector:{select:{mode:"dropdown",options:u}}},{name:"debounce",selector:ne(30,.5)}]:[]];return a`${this._renderDetected(e,t,i)}
      ${i&&!l?a`<p class="ltek-hint">${this._t("state_fixed_only")}</p>`:p}
      <ha-form
        .hass=${this.hass}
        .data=${n}
        .schema=${h}
        .computeLabel=${m=>this._t(m.name==="state_source"?"state_source":`field.${m.name}`)}
        .computeHelper=${this._helper}
        @value-changed=${m=>{let f=wt(t,{...n,...m.detail.value},i);this._emit({...this.room,devices:{...this.room.devices,[e]:f}})}}
      ></ha-form>`}_renderDetected(e,t,i){if(!i)return a`<p class="ltek-hint">${this._t("loading")}</p>`;if(!i.profile)return a`<p class="ltek-hint">${this._t("detected_none")}</p>`;let{profile:n,found:o,state:d}=i,l=kt(t,i),c=[];if(o?.indicator&&c.push(this._t("detected_found_indicator",{entity:this._entityName(o.indicator)})+(o.attribute?`, ${this._t("detected_found_attribute",{attribute:o.attribute})}`:"")),o?.remote_entity&&c.push(this._t("detected_found_remote",{entity:this._entityName(o.remote_entity)})),o?.power_switch&&c.push(this._t("detected_found_outlet",{entity:this._entityName(o.power_switch)})),o?.settings?.length&&c.push(this._t("detected_found_settings",{entities:o.settings.map(u=>this._entityName(u)).join(", ")})),i.siblings.length){c.push(this._t("detected_siblings",{integrations:i.siblings.map(h=>h.integration).join(", ")}));let u=Object.entries(i.roles).filter(([,h])=>h).map(([h,m])=>this._t("detected_role",{role:this._t(`role.${h}`),integration:m}));u.length&&c.push(u.join(" \xB7 "))}return a`<div class="ltek-item detected open">
      <ha-icon class="lead" icon="mdi:auto-fix"></ha-icon>
      <span class="ltek-item-text">
        <span class="ltek-name">${this._t("detected",{name:n.name})}</span>
        ${c.map(u=>a`<span class="ltek-subline">${u}</span>`)}
        ${d?a`<span class="ltek-subline">${this._t("detected_now",{value:d.value??d.group})}</span>`:p}
      </span>
      <span class="ltek-badge ${n.source==="user"?"lib":"accent"}">
        ${this._t(n.source==="user"?"profiles_yours":"profiles_builtin")}
      </span>
      ${n.tested?p:a`<span class="ltek-badge warn" title=${this._t("profile_untested")}>!</span>`}
      ${Object.keys(l).length?a`<button
            class="ltek-btn primary"
            @click=${()=>this._emit({...this.room,devices:{...this.room.devices,[e]:{...t,...l}}})}
          >
            ${this._t("detected_use")}
          </button>`:a`<span class="ltek-badge ok">${this._t("detected_applied")}</span>`}
    </div>`}_entityName(e){return this.hass.states[e]?.attributes.friendly_name??e}_applyReadyPreset(e,t,i){let n={entity_id:i,state:"on",timeout:60,reload_integration:!0,on_timeout:"continue"};this._emit({...this.room,devices:{...this.room.devices,[e]:{...t,ready:n,remote_entity:i}}})}_unsaved(e,t){return!(t in(this.saved?.[e]??{}))}_deviceChanged(e,t){let i=w({entity_id:t.entity_id,name:t.name,remote_entity:t.remote_entity,power_switch:t.power_switch,ready:t.ready_enabled?w({entity_id:t.ready_entity,state:hi(t.ready_state),timeout:t.ready_timeout,reload_integration:t.ready_reload,on_timeout:t.ready_on_timeout}):void 0,delay_after_power:t.power_switch?t.delay_after_power:void 0,delay_after_on:t.delay_after_on,delay_after_off:t.delay_after_off,commands:t.commands}),n=this.room.devices?.[e]??{};for(let c of ge)n[c]!==void 0&&(i[c]=n[c]);let o=this.room.devices?.[e]?.settings;o!==void 0&&(i.settings=o),t.ready_enabled&&!i.ready&&(i.ready={});let d={...this.room,devices:{...this.room.devices,[e]:i}},l=i.entity_id?.split(".")[1];if(l&&this._unsaved("devices",e)&&i.entity_id!==this.room.devices?.[e]?.entity_id){let c=R(V(l),Object.keys(d.devices??{}).filter(u=>u!==e));if(c!==e){this._emit(Be(d,e,c)),this._view={kind:"device",id:c};return}}this._emit(d)}_addDevice(){let e=R("device",Object.keys(this.room.devices??{}));this._emit({...this.room,devices:{...this.room.devices,[e]:{entity_id:""}}}),this._show({kind:"device",id:e})}_renameDevice(e,t){let i=V(t);if(!i||i===e){this.requestUpdate();return}let n=R(i,Object.keys(this.room.devices??{}).filter(o=>o!==e));this._emit(Be(this.room,e,n)),this._view={kind:"device",id:n}}_deleteDevice(e){let t=Ge(this.room,e);if(t.length){this._notice=this._t("device_in_use",{id:e,where:t.join(", ")});return}if(!window.confirm(`${this._t("delete")}: ${this._deviceTitle(e,this.room.devices[e])}?`))return;let i={...this.room.devices};delete i[e],this._emit({...this.room,devices:i}),this._show({kind:"list"})}_renderActivityList(){let e=Object.entries(this.room.activities??{}).sort(([i,n],[o,d])=>(n.order??1e3)-(d.order??1e3)||(n.name??i).localeCompare(d.name??o,void 0,{sensitivity:"base"})),t=i=>(i.devices??[]).map(n=>this.room.devices?.[n]?.name??n).join(" \u2192 ");return a`
      <p class="ltek-hint">${this._t("activities_intro")}</p>
      <div class="ltek-list">
        ${Object.keys(this.room.devices??{}).length?a`<button class="ltek-add" @click=${this._addActivity}>+ ${this._t("add_activity")}</button>`:a`<p class="ltek-hint">${this._t("needs_devices")}</p>`}
        ${e.length?e.map(([i,n])=>this._row(n.name??i,t(n)||this._t("no_devices"),()=>this._show({kind:"activity",id:i}),void 0,n.icon??"mdi:play-circle-outline")):a`<p class="ltek-hint">${this._t("activities_empty")}</p>`}
      </div>
    `}_setActivity(e,t){this._emit({...this.room,activities:{...this.room.activities,[e]:w(t)}})}_renderActivity(e,t){let i=Object.keys(this.room.devices??{}),n=t.devices??[],o=[{value:"__auto",label:this._t("route_auto")},{value:"__none",label:this._t("route_none")},...n.map(c=>({value:c,label:this.room.devices?.[c]?.name??c}))],d=t.remote??{},l={};for(let c of N)l[c]=c in d?d[c]===null?"__none":d[c]:"__auto";return l.touchpad=d.touchpad===!0?"on":d.touchpad===!1?"off":"auto",a`
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
                    ${this._moveButtons(n,u,h=>this._setActivity(e,{...t,devices:h}))}
                  </li>`)}
              </ol>`:p}
          ${i.some(c=>!n.includes(c))?this._picker(this._t("add_device_to_activity"),i.filter(c=>!n.includes(c)).map(c=>({value:c,label:this.room.devices?.[c]?.name??c})),c=>this._setActivity(e,{...t,devices:[...n,c]})):p}`)}

      ${this._card(this._t("steps"),this._t("hint_steps"),a`${(t.steps??[]).map((c,u)=>this._renderStep(e,t,c,u))}
          ${this._picker(this._t("add_step"),At.map(c=>({value:c,label:this._t(`step.${c}`)})),c=>this._setActivity(e,{...t,steps:[...t.steps??[],{type:c}]}))}`)}

      ${this._card(this._t("section_flow"),this._t("hint_flow"),a`<easy-av-control-flow
          .hass=${this.hass}
          .room=${this.room}
          .roomId=${this.roomId}
          .activityId=${e}
        ></easy-av-control-flow>`)}

      ${this._card(this._t("remote"),this._t("hint_remote"),a`<ha-form
          .hass=${this.hass}
          .data=${l}
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
            .data=${{buttons:(d.buttons??[]).filter(c=>!Q(c)),activity_commands:t.commands}}
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
    `}_activityGeneralChanged(e,t,i){let n=w({...t,name:i.name,icon:i.icon,order:i.order}),o=i.name?.trim();if(!o||o===t.name||!this._unsaved("activities",e)){this._setActivity(e,n);return}let d=R(V(o),Object.keys(this.room.activities??{}).filter(u=>u!==e));if(d===e){this._setActivity(e,n);return}let l={};for(let[u,h]of Object.entries(this.room.activities??{}))l[u===e?d:u]=u===e?n:h;let c={...this.room,activities:l};c.default_activity===e&&(c.default_activity=d),this._emit(c),this._view={kind:"activity",id:d}}_renderStep(e,t,i,n){let o=t.steps??[],d=l=>this._setActivity(e,{...t,steps:l});return a`<div class="step">
      <div class="step-head">
        <span class="title">${n+1}. ${this._t(`step.${i.type}`)}</span>
        ${this._moveButtons(o,n,d)}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${i}
        .schema=${Tt(this.hass,this.room,i,l=>this._t(l),this.sources,this.soundModes)}
        .computeLabel=${this._label}
        @value-changed=${l=>{let c=[...o];c[n]=w({...l.detail.value,type:i.type}),d(c)}}
      ></ha-form>
    </div>`}_routesChanged(e,t,i){let n={};for(let o of N)i[o]==="__none"?n[o]=null:i[o]&&i[o]!=="__auto"&&(n[o]=i[o]);(i.touchpad==="on"||i.touchpad==="off")&&(n.touchpad=i.touchpad==="on"),t.remote?.buttons&&(n.buttons=t.remote.buttons),t.remote?.settings&&(n.settings=t.remote.settings),this._setActivity(e,{...t,remote:Object.keys(n).length?n:void 0})}_extrasChanged(e,t,i){let n=(t.remote?.buttons??[]).filter(Q),o=[...Array.isArray(i.buttons)?i.buttons:[],...n],d={...t.remote,buttons:o};this._setActivity(e,{...t,remote:be(d),commands:i.activity_commands})}_renderQuickSelect(e,t){let i=t.remote?.buttons??[],n=i.filter(u=>!Q(u)),o=i.filter(Q),d=u=>{let h={...t.remote,buttons:[...n,...u]};this._setActivity(e,{...t,remote:be(h)})},l=(t.devices??[]).filter(u=>this.room.devices?.[u]?.entity_id?.startsWith("media_player.")),c=l.map(u=>({value:u,label:this.room.devices?.[u]?.name??u}));return a`${o.map((u,h)=>{let m=this.room.devices?.[u.device]?.entity_id;return a`<div class="step">
          <div class="step-head">
            <span class="title">${u.name||u.source||""}</span>
            ${this._moveButtons(o,h,d)}
          </div>
          <ha-form
            .hass=${this.hass}
            .data=${{device:u.device,source:u.source,label:u.name,icon:u.icon}}
            .schema=${[{name:"device",required:!0,selector:{select:{options:c,mode:"dropdown"}}},{name:"source",required:!0,selector:{select:{options:Ie(this.hass,this.sources,m),custom_value:!0,mode:"dropdown"}}},{name:"label",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]}
            .computeLabel=${this._label}
            .computeHelper=${this._helper}
            @value-changed=${f=>{let _=f.detail.value,A=[...o];A[h]=w({device:_.device,source:_.source??"",name:_.label,icon:_.icon},["source"]),d(A)}}
          ></ha-form>
        </div>`})}
      ${l.length?a`<button class="ltek-add" @click=${()=>d([...o,{device:l[l.length-1],source:""}])}>
            + ${this._t("add_quick_select")}
          </button>`:a`<p class="ltek-hint">${this._t("quick_select_no_player")}</p>`}`}_settingList(e,t){let i=Le[String(t)]??"source_list",n=i==="sound_mode_list"?this.soundModes:this.sources;return Z(this.hass,n,this.room.devices?.[String(e)]?.entity_id,i)}_describeSetting(e,t){let i=e.entity?e.name||this.hass.states[e.entity]?.attributes.friendly_name||e.entity||this._t("setting.entity"):this._t(`setting.${e.setting}`);if(!t)return i;let n=this.room.devices?.[String(e.device)];return`${i} (${n?.name??String(e.device)})`}_settingsMode(e,t,i){return a`<ha-form
      .hass=${this.hass}
      .data=${{settings_mode:e?"chosen":"auto"}}
      .schema=${[{name:"settings_mode",required:!0,selector:{select:{options:[{value:"auto",label:this._t(t)},{value:"chosen",label:this._t("settings_chosen")}],mode:"dropdown"}}}]}
      .computeLabel=${this._label}
      @value-changed=${n=>{let o=n.detail.value.settings_mode==="chosen";o!==e&&i(o)}}
    ></ha-form>`}_renderSettingItems(e,t,i,n){let o=l=>!!this.room.devices?.[String(l)]?.entity_id?.startsWith("media_player."),d=(i??[]).map(l=>({value:l,label:this.room.devices?.[l]?.name??l}));return a`${e.map((l,c)=>{let u=i?l.device:n,h=l.entity!==void 0?"entity":l.setting,m=o(u)?[...Me,"entity"]:["entity"],f=l.entity,_=f?this.hass.states[f]?.attributes.options:void 0,A=h==="entity"?Array.isArray(_)?_.map(String):void 0:this._settingList(u,h);return a`<div class="step">
        <div class="step-head">
          <span class="title">${this._describeSetting(l,i!==null)}</span>
          ${this._moveButtons(e,c,t)}
        </div>
        <ha-form
          .hass=${this.hass}
          .data=${{device:l.device,setting:h,entity:f,name:l.name,options:l.options??[]}}
          .schema=${[...i?[{name:"device",required:!0,selector:{select:{options:d,mode:"dropdown"}}}]:[],{name:"setting",required:!0,selector:{select:{options:m.map($=>({value:$,label:this._t(`setting.${$}`)})),mode:"dropdown"}}},...h==="entity"?[{name:"entity",required:!0,selector:{entity:{filter:{domain:[...St]}}}},{name:"name",selector:{text:{}}}]:[],...A!==void 0?[{name:"options",selector:{select:{options:A,multiple:!0,custom_value:!0,mode:"dropdown"}}}]:[]]}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${$=>{let O=$.detail.value,Fe=o(i?O.device:n)?O.setting:"entity",Ye=i?{device:O.device}:{},Ze=[...e];Ze[c]=Fe==="entity"?w({...Ye,entity:O.entity??"",name:O.name,options:O.options},["entity"]):w({...Ye,setting:Fe,options:O.options}),t(Ze)}}
        ></ha-form>
      </div>`})}`}get _lists(){return{source_list:this.sources,sound_mode_list:this.soundModes}}_renderCardSettings(e,t){let i=t.remote?.settings,n=u=>{let h={...t.remote};u===void 0?delete h.settings:h.settings=u,this._setActivity(e,{...t,remote:be(h)})},o=Et(this.hass,this.room,t,this._lists,this._related),d=this._settingsMode(i!==void 0,"settings_auto",u=>n(u?o.map(h=>({...h})):void 0));if(i===void 0)return a`${d}
        <p class="ltek-hint">
          ${o.length?this._t("settings_auto_shows",{list:o.map(u=>this._describeSetting(u,!0)).join(", ")}):this._t("settings_auto_none")}
        </p>`;let l=t.devices??[],c=l.filter(u=>this.room.devices?.[u]?.entity_id?.startsWith("media_player."));return a`${d}
      ${this._renderSettingItems(i,n,l)}
      ${i.length?p:a`<p class="ltek-hint">${this._t("settings_none")}</p>`}
      ${l.length?a`<button
            class="add"
            @click=${()=>n([...i,c.length?{device:c[0],setting:"sound_mode"}:{device:l[0],entity:""}])}
          >
            + ${this._t("add_setting")}
          </button>`:p}`}_renderDeviceSettings(e,t){let i=t.settings,n=c=>{let u={...t};c===void 0?delete u.settings:u.settings=c,this._emit({...this.room,devices:{...this.room.devices,[e]:u}})},o=He(this.hass,this.room,e,this._lists,this._related),d=this._settingsMode(i!==void 0,"device_settings_auto",c=>n(c?o.map(({device:u,...h})=>h):void 0));if(i===void 0)return a`${d}
        <p class="ltek-hint">
          ${o.length?this._t("settings_auto_shows",{list:o.map(c=>this._describeSetting(c,!1)).join(", ")}):this._t("device_settings_auto_none")}
        </p>`;let l=t.entity_id?.startsWith("media_player.");return a`${d}
      ${this._renderSettingItems(i,n,null,e)}
      ${i.length?p:a`<p class="ltek-hint">${this._t("device_settings_none")}</p>`}
      <button
        class="add"
        @click=${()=>n([...i,l?{setting:"sound_mode"}:{entity:""}])}
      >
        + ${this._t("add_setting")}
      </button>`}_addActivity(){let e=this._t("new_activity"),t=R(V(e),Object.keys(this.room.activities??{}));this._setActivity(t,{name:e,devices:[]}),this._show({kind:"activity",id:t})}_deleteActivity(e,t){if(!window.confirm(`${this._t("delete")}: ${t.name??e}?`))return;let i={...this.room.activities};delete i[e];let n={...this.room,activities:i};n.default_activity===e&&delete n.default_activity,this._emit(n),this._show({kind:"list"})}_renderYaml(){return a`<p class="ltek-hint">${this._t("yaml_intro")}</p>
      <ha-form
        .hass=${this.hass}
        .data=${{yaml:this.room}}
        .schema=${[{name:"yaml",selector:{object:{}}}]}
        .computeLabel=${()=>""}
        @value-changed=${e=>{let t=e.detail.value.yaml;t&&typeof t=="object"&&!Array.isArray(t)&&this._emit(t)}}
      ></ha-form>`}_moveButtons(e,t,i){let n=o=>{let d=[...e],[l]=d.splice(t,1);d.splice(o,0,l),i(d)};return a`<span class="move">
      <button class="ltek-act" title=${this._t("move_up")} aria-label=${this._t("move_up")} ?disabled=${t===0} @click=${()=>n(t-1)}>
        <ha-icon icon="mdi:arrow-up"></ha-icon>
      </button>
      <button class="ltek-act" title=${this._t("move_down")} aria-label=${this._t("move_down")} ?disabled=${t===e.length-1} @click=${()=>n(t+1)}>
        <ha-icon icon="mdi:arrow-down"></ha-icon>
      </button>
      <button class="ltek-del" title=${this._t("delete")} aria-label=${this._t("delete")} @click=${()=>i(e.filter((o,d)=>d!==t))}>
        <ha-icon icon="mdi:trash-can-outline"></ha-icon>
      </button>
    </span>`}_picker(e,t,i){return a`<ha-form
      class="picker"
      .hass=${this.hass}
      .data=${{pick:void 0}}
      .schema=${[{name:"pick",selector:{select:{options:t,mode:"dropdown"}}}]}
      .computeLabel=${()=>e}
      @value-changed=${n=>{let o=n.detail.value.pick;o&&(i(o),n.target.requestUpdate())}}
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
  `];customElements.get("easy-av-control-room-editor")||customElements.define("easy-av-control-room-editor",se);async function fi(){if(customElements.get("ha-form")&&customElements.get("ha-selector"))return;await(await(await window.loadCardHelpers()).createCardElement({type:"entities",entities:[]})).constructor.getConfigElement(),await customElements.whenDefined("ha-form")}var oe=class extends g{constructor(){super();this._original="";this._loading=!1;this._saving=!1,this._ready=!1,this._sources={},this._soundModes={},this._adding=!1,this._profiles=[],this._page="room"}async _loadProfiles(){this._profiles=await this.hass.callWS({type:"easy_av_control/profiles/list"}).catch(()=>[])}_t(e,t){return x(this.hass?.language,e,t)}async _load(){this._loading=!0;try{await fi(),this._ready=!0;let e=await this.hass.callWS({type:"easy_av_control/config/get"});this._entryId=e.entry_id,this._revision=e.revision,this._original=JSON.stringify(e.rooms),this._rooms=e.rooms,this._banner=void 0,(!this._selected||!(this._selected in e.rooms))&&(this._selected=Object.keys(e.rooms)[0]),this._loadProfiles(),[this._sources,this._soundModes]=await Promise.all(["source_list","sound_mode_list"].map(t=>this.hass.callWS({type:"easy_av_control/config/sources",attribute:t}).catch(()=>({}))))}catch(e){this._loadError=e?.message??String(e)}finally{this._loading=!1}}get _dirty(){return this._rooms!==void 0&&JSON.stringify(this._rooms)!==this._original}_roomChanged(e,t){this._rooms={...this._rooms,[e]:t},this._banner?.kind!=="conflict"&&(this._banner=void 0)}_addRoom(e){if(this._adding=!1,!e.trim())return;let t=R(V(e),Object.keys(this._rooms??{}));this._rooms={...this._rooms,[t]:{name:e.trim(),devices:{},activities:{}}},this._selected=t}_renderAddRoom(){return this._adding?a`<form class="new-room" @submit=${t=>{t.preventDefault();let i=t.target.querySelector("input");this._addRoom(i.value)}}>
      <input
        aria-label=${this._t("add_room_name")}
        placeholder=${this._t("add_room_name")}
        @keydown=${t=>t.key==="Escape"&&(this._adding=!1)}
      />
      <div class="new-room-buttons">
        <button type="button" class="flat" @click=${()=>this._adding=!1}>${this._t("cancel")}</button>
        <button type="submit" class="primary">${this._t("create")}</button>
      </div>
    </form>`:a`<button class="room add" @click=${()=>this._adding=!0}>+ ${this._t("add_room")}</button>`}updated(e){this.hass&&!this._rooms&&!this._loading&&!this._loadError&&this._load(),e.has("_adding")&&this._adding&&this.shadowRoot?.querySelector("form.new-room input")?.focus()}_deleteRoom(e){let t=this._rooms?.[e];if(!t||!window.confirm(this._t("delete_room_confirm",{name:t.name??e})))return;let i={...this._rooms};delete i[e],this._rooms=i,this._selected=Object.keys(i)[0]}_discard(){this._rooms=JSON.parse(this._original),this._banner=void 0,(!this._selected||!(this._selected in this._rooms))&&(this._selected=Object.keys(this._rooms)[0])}_reload(){this._dirty&&!window.confirm(this._t("reload_confirm"))||(this._loadError=void 0,this._load())}async _save(e=!1){if(!this._rooms||!this._revision)return;let t=this._rooms,i={};for(let[n,o]of Object.entries(t))i[n]=w(o);this._saving=!0;try{let n=await this.hass.callWS({type:"easy_av_control/config/validate",rooms:i});if(n.error){this._banner={kind:"invalid",path:n.error.path.join("."),message:n.error.message};return}if(n.missing.length&&!e){this._banner={kind:"missing",missing:n.missing};return}let o=await this.hass.callWS({type:"easy_av_control/config/save",rooms:i,revision:this._revision,entry_id:this._entryId});this._revision=o.revision,this._original=JSON.stringify(i),this._rooms===t&&(this._rooms=i),this._banner={kind:"saved"},this._loadProfiles()}catch(n){let o=n;this._banner=o.code==="conflict"?{kind:"conflict"}:{kind:"invalid",path:"",message:o.message??String(n)}}finally{this._saving=!1}}render(){return a`
      <div class="toolbar">
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <div class="main-title">${this._t("title")}</div>
        ${this._dirty?a`<span class="dirty">${this._t("unsaved")}</span>`:p}
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
            class="room ${this._page==="room"&&i===t?"active":""}"
            @click=${()=>{this._selected=i,this._page="room"}}
          >
            ${n.name??i}
          </button>`)}
        ${this._renderAddRoom()}
        <div class="nav-title library">${this._t("profiles")}</div>
        <button class="room ${this._page==="profiles"?"active":""}" @click=${()=>this._page="profiles"}>
          <ha-icon icon="mdi:package-variant-closed"></ha-icon> ${this._t("profiles")}
        </button>
      </nav>
      <main>
        <easy-av-control-guide .language=${this.hass.language}></easy-av-control-guide>
        ${this._renderBanner()}
        ${this._page==="profiles"?a`<easy-av-control-profiles
              .hass=${this.hass}
              .profiles=${this._profiles}
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
    </div>`}_renderBanner(){let e=this._banner;if(!e)return p;switch(e.kind){case"saved":return a`<div class="banner ok">${this._t("saved")}</div>`;case"invalid":return a`<div class="banner error">
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
        </div>`}}};oe.properties={hass:{attribute:!1},narrow:{type:Boolean},_rooms:{state:!0},_selected:{state:!0},_loadError:{state:!0},_banner:{state:!0},_saving:{state:!0},_ready:{state:!0},_sources:{state:!0},_soundModes:{state:!0},_adding:{state:!0},_profiles:{state:!0},_page:{state:!0}},oe.styles=[b,y,v`
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
  `];customElements.get("easy-av-control-panel")||customElements.define("easy-av-control-panel",oe);export{oe as EasyAvControlPanel};
