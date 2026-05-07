import {
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgForm,
  Validators
} from "./chunk-5TONRF7E.js";
import {
  MatRippleLoader
} from "./chunk-3RBRPEGT.js";
import {
  MAT_RIPPLE_GLOBAL_OPTIONS,
  MatRippleModule,
  _StructuralStylesLoader
} from "./chunk-PRNQ5WY6.js";
import {
  coerceBooleanProperty
} from "./chunk-42QFQP6S.js";
import "./chunk-ABEGEAX2.js";
import "./chunk-GUGIMSVJ.js";
import {
  BACKSPACE,
  DELETE,
  DOWN_ARROW,
  ENTER,
  FocusKeyManager,
  FocusMonitor,
  SPACE,
  TAB,
  UP_ARROW,
  _IdGenerator,
  hasModifierKey
} from "./chunk-YQZEXX7D.js";
import {
  _CdkPrivateStyleLoader,
  _VisuallyHiddenLoader
} from "./chunk-K7WMG24O.js";
import "./chunk-PXBLFU3U.js";
import "./chunk-3QD6MVBE.js";
import {
  _animationsDisabled
} from "./chunk-CXLSEKAJ.js";
import "./chunk-N4DOILP3.js";
import "./chunk-XA6252L2.js";
import "./chunk-EZKXSARM.js";
import {
  Platform
} from "./chunk-LJIJD3DT.js";
import {
  NgTemplateOutlet
} from "./chunk-QS5A7TI6.js";
import "./chunk-LZKHBIQR.js";
import "./chunk-YHHMMDP3.js";
import {
  BidiModule,
  Directionality
} from "./chunk-X7BORJBP.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  DOCUMENT,
  Directive,
  ElementRef,
  EventEmitter,
  HOST_TAG_NAME,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  NgZone,
  Output,
  QueryList,
  Renderer2,
  RendererFactory2,
  ViewChild,
  ViewEncapsulation,
  afterNextRender,
  afterRenderEffect,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  forwardRef,
  inject,
  merge,
  numberAttribute,
  setClassMetadata,
  signal,
  viewChild,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵcontentQuerySignal,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery,
  ɵɵviewQuerySignal
} from "./chunk-X27ML562.js";
import {
  Observable,
  Subject,
  Subscription,
  filter,
  map,
  pairwise,
  shareReplay,
  startWith,
  switchMap,
  takeUntil
} from "./chunk-4PAWV54Y.js";
import "./chunk-WDMUDEB6.js";

// node_modules/@angular/material/fesm2022/_error-options-chunk.mjs
var ShowOnDirtyErrorStateMatcher = class _ShowOnDirtyErrorStateMatcher {
  isErrorState(control, form) {
    return !!(control && control.invalid && (control.dirty || form && form.submitted));
  }
  static ɵfac = function ShowOnDirtyErrorStateMatcher_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ShowOnDirtyErrorStateMatcher)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ShowOnDirtyErrorStateMatcher,
    factory: _ShowOnDirtyErrorStateMatcher.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShowOnDirtyErrorStateMatcher, [{
    type: Injectable
  }], null, null);
})();
var ErrorStateMatcher = class _ErrorStateMatcher {
  isErrorState(control, form) {
    return !!(control && control.invalid && (control.touched || form && form.submitted));
  }
  static ɵfac = function ErrorStateMatcher_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ErrorStateMatcher)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ErrorStateMatcher,
    factory: _ErrorStateMatcher.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ErrorStateMatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/_error-state-chunk.mjs
var _ErrorStateTracker = class {
  _defaultMatcher;
  ngControl;
  _parentFormGroup;
  _parentForm;
  _stateChanges;
  errorState = false;
  matcher;
  constructor(_defaultMatcher, ngControl, _parentFormGroup, _parentForm, _stateChanges) {
    this._defaultMatcher = _defaultMatcher;
    this.ngControl = ngControl;
    this._parentFormGroup = _parentFormGroup;
    this._parentForm = _parentForm;
    this._stateChanges = _stateChanges;
  }
  updateErrorState() {
    const oldState = this.errorState;
    const parent = this._parentFormGroup || this._parentForm;
    const matcher = this.matcher || this._defaultMatcher;
    const control = this.ngControl ? this.ngControl.control : null;
    const newState = matcher?.isErrorState(control, parent) ?? false;
    if (newState !== oldState) {
      this.errorState = newState;
      this._stateChanges.next();
    }
  }
};

// node_modules/@angular/cdk/fesm2022/observers-private.mjs
var loopLimitExceededErrorHandler = (e) => {
  if (e instanceof ErrorEvent && e.message === "ResizeObserver loop limit exceeded") {
    console.error(`${e.message}. This could indicate a performance issue with your app. See https://github.com/WICG/resize-observer/blob/master/explainer.md#error-handling`);
  }
};
var SingleBoxSharedResizeObserver = class {
  _box;
  _destroyed = new Subject();
  _resizeSubject = new Subject();
  _resizeObserver;
  _elementObservables = /* @__PURE__ */ new Map();
  constructor(_box) {
    this._box = _box;
    if (typeof ResizeObserver !== "undefined") {
      this._resizeObserver = new ResizeObserver((entries) => this._resizeSubject.next(entries));
    }
  }
  observe(target) {
    if (!this._elementObservables.has(target)) {
      this._elementObservables.set(target, new Observable((observer) => {
        const subscription = this._resizeSubject.subscribe(observer);
        this._resizeObserver?.observe(target, {
          box: this._box
        });
        return () => {
          this._resizeObserver?.unobserve(target);
          subscription.unsubscribe();
          this._elementObservables.delete(target);
        };
      }).pipe(filter((entries) => entries.some((entry) => entry.target === target)), shareReplay({
        bufferSize: 1,
        refCount: true
      }), takeUntil(this._destroyed)));
    }
    return this._elementObservables.get(target);
  }
  destroy() {
    this._destroyed.next();
    this._destroyed.complete();
    this._resizeSubject.complete();
    this._elementObservables.clear();
  }
};
var SharedResizeObserver = class _SharedResizeObserver {
  _cleanupErrorListener;
  _observers = /* @__PURE__ */ new Map();
  _ngZone = inject(NgZone);
  constructor() {
    if (typeof ResizeObserver !== "undefined" && (typeof ngDevMode === "undefined" || ngDevMode)) {
      this._ngZone.runOutsideAngular(() => {
        const renderer = inject(RendererFactory2).createRenderer(null, null);
        this._cleanupErrorListener = renderer.listen("window", "error", loopLimitExceededErrorHandler);
      });
    }
  }
  ngOnDestroy() {
    for (const [, observer] of this._observers) {
      observer.destroy();
    }
    this._observers.clear();
    this._cleanupErrorListener?.();
  }
  observe(target, options) {
    const box = options?.box || "content-box";
    if (!this._observers.has(box)) {
      this._observers.set(box, new SingleBoxSharedResizeObserver(box));
    }
    return this._observers.get(box).observe(target);
  }
  static ɵfac = function SharedResizeObserver_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SharedResizeObserver)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _SharedResizeObserver,
    factory: _SharedResizeObserver.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SharedResizeObserver, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// node_modules/@angular/material/fesm2022/_form-field-chunk.mjs
var _c0 = ["notch"];
var _c1 = ["matFormFieldNotchedOutline", ""];
var _c2 = ["*"];
var _c3 = ["iconPrefixContainer"];
var _c4 = ["textPrefixContainer"];
var _c5 = ["iconSuffixContainer"];
var _c6 = ["textSuffixContainer"];
var _c7 = ["textField"];
var _c8 = ["*", [["mat-label"]], [["", "matPrefix", ""], ["", "matIconPrefix", ""]], [["", "matTextPrefix", ""]], [["", "matTextSuffix", ""]], [["", "matSuffix", ""], ["", "matIconSuffix", ""]], [["mat-error"], ["", "matError", ""]], [["mat-hint", 3, "align", "end"]], [["mat-hint", "align", "end"]]];
var _c9 = ["*", "mat-label", "[matPrefix], [matIconPrefix]", "[matTextPrefix]", "[matTextSuffix]", "[matSuffix], [matIconSuffix]", "mat-error, [matError]", "mat-hint:not([align='end'])", "mat-hint[align='end']"];
function MatFormField_ng_template_0_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 21);
  }
}
function MatFormField_ng_template_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "label", 20);
    ɵɵprojection(1, 1);
    ɵɵconditionalCreate(2, MatFormField_ng_template_0_Conditional_0_Conditional_2_Template, 1, 0, "span", 21);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("floating", ctx_r0._shouldLabelFloat())("monitorResize", ctx_r0._hasOutline())("id", ctx_r0._labelId);
    ɵɵattribute("for", ctx_r0._control.disableAutomaticLabeling ? null : ctx_r0._control.id);
    ɵɵadvance(2);
    ɵɵconditional(!ctx_r0.hideRequiredMarker && ctx_r0._control.required ? 2 : -1);
  }
}
function MatFormField_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, MatFormField_ng_template_0_Conditional_0_Template, 3, 5, "label", 20);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵconditional(ctx_r0._hasFloatingLabel() ? 0 : -1);
  }
}
function MatFormField_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 7);
  }
}
function MatFormField_Conditional_6_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function MatFormField_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MatFormField_Conditional_6_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 13);
  }
  if (rf & 2) {
    ɵɵnextContext(2);
    const labelTemplate_r2 = ɵɵreference(1);
    ɵɵproperty("ngTemplateOutlet", labelTemplate_r2);
  }
}
function MatFormField_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 9);
    ɵɵconditionalCreate(1, MatFormField_Conditional_6_Conditional_1_Template, 1, 1, null, 13);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("matFormFieldNotchedOutlineOpen", ctx_r0._shouldLabelFloat());
    ɵɵadvance();
    ɵɵconditional(!ctx_r0._forceDisplayInfixLabel() ? 1 : -1);
  }
}
function MatFormField_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 10, 2);
    ɵɵprojection(2, 2);
    ɵɵelementEnd();
  }
}
function MatFormField_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 11, 3);
    ɵɵprojection(2, 3);
    ɵɵelementEnd();
  }
}
function MatFormField_Conditional_10_ng_template_0_Template(rf, ctx) {
}
function MatFormField_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MatFormField_Conditional_10_ng_template_0_Template, 0, 0, "ng-template", 13);
  }
  if (rf & 2) {
    ɵɵnextContext();
    const labelTemplate_r2 = ɵɵreference(1);
    ɵɵproperty("ngTemplateOutlet", labelTemplate_r2);
  }
}
function MatFormField_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 14, 4);
    ɵɵprojection(2, 4);
    ɵɵelementEnd();
  }
}
function MatFormField_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 15, 5);
    ɵɵprojection(2, 5);
    ɵɵelementEnd();
  }
}
function MatFormField_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 16);
  }
}
function MatFormField_Case_16_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 18);
    ɵɵprojection(1, 6);
    ɵɵelementEnd();
  }
}
function MatFormField_Case_17_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "mat-hint", 22);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("id", ctx_r0._hintLabelId);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.hintLabel);
  }
}
function MatFormField_Case_17_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 19);
    ɵɵconditionalCreate(1, MatFormField_Case_17_Conditional_1_Template, 2, 2, "mat-hint", 22);
    ɵɵprojection(2, 7);
    ɵɵelement(3, "div", 23);
    ɵɵprojection(4, 8);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵconditional(ctx_r0.hintLabel ? 1 : -1);
  }
}
var MatLabel = class _MatLabel {
  static ɵfac = function MatLabel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatLabel)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MatLabel,
    selectors: [["mat-label"]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatLabel, [{
    type: Directive,
    args: [{
      selector: "mat-label"
    }]
  }], null, null);
})();
var MAT_ERROR = new InjectionToken("MatError");
var MatError = class _MatError {
  id = inject(_IdGenerator).getId("mat-mdc-error-");
  constructor() {
  }
  static ɵfac = function MatError_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatError)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MatError,
    selectors: [["mat-error"], ["", "matError", ""]],
    hostAttrs: [1, "mat-mdc-form-field-error", "mat-mdc-form-field-bottom-align"],
    hostVars: 1,
    hostBindings: function MatError_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵdomProperty("id", ctx.id);
      }
    },
    inputs: {
      id: "id"
    },
    features: [ɵɵProvidersFeature([{
      provide: MAT_ERROR,
      useExisting: _MatError
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatError, [{
    type: Directive,
    args: [{
      selector: "mat-error, [matError]",
      host: {
        "class": "mat-mdc-form-field-error mat-mdc-form-field-bottom-align",
        "[id]": "id"
      },
      providers: [{
        provide: MAT_ERROR,
        useExisting: MatError
      }]
    }]
  }], () => [], {
    id: [{
      type: Input
    }]
  });
})();
var MatHint = class _MatHint {
  align = "start";
  id = inject(_IdGenerator).getId("mat-mdc-hint-");
  static ɵfac = function MatHint_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatHint)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MatHint,
    selectors: [["mat-hint"]],
    hostAttrs: [1, "mat-mdc-form-field-hint", "mat-mdc-form-field-bottom-align"],
    hostVars: 4,
    hostBindings: function MatHint_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵdomProperty("id", ctx.id);
        ɵɵattribute("align", null);
        ɵɵclassProp("mat-mdc-form-field-hint-end", ctx.align === "end");
      }
    },
    inputs: {
      align: "align",
      id: "id"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatHint, [{
    type: Directive,
    args: [{
      selector: "mat-hint",
      host: {
        "class": "mat-mdc-form-field-hint mat-mdc-form-field-bottom-align",
        "[class.mat-mdc-form-field-hint-end]": 'align === "end"',
        "[id]": "id",
        "[attr.align]": "null"
      }
    }]
  }], null, {
    align: [{
      type: Input
    }],
    id: [{
      type: Input
    }]
  });
})();
var MAT_PREFIX = new InjectionToken("MatPrefix");
var MatPrefix = class _MatPrefix {
  set _isTextSelector(value) {
    this._isText = true;
  }
  _isText = false;
  static ɵfac = function MatPrefix_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatPrefix)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MatPrefix,
    selectors: [["", "matPrefix", ""], ["", "matIconPrefix", ""], ["", "matTextPrefix", ""]],
    inputs: {
      _isTextSelector: [0, "matTextPrefix", "_isTextSelector"]
    },
    features: [ɵɵProvidersFeature([{
      provide: MAT_PREFIX,
      useExisting: _MatPrefix
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPrefix, [{
    type: Directive,
    args: [{
      selector: "[matPrefix], [matIconPrefix], [matTextPrefix]",
      providers: [{
        provide: MAT_PREFIX,
        useExisting: MatPrefix
      }]
    }]
  }], null, {
    _isTextSelector: [{
      type: Input,
      args: ["matTextPrefix"]
    }]
  });
})();
var MAT_SUFFIX = new InjectionToken("MatSuffix");
var MatSuffix = class _MatSuffix {
  set _isTextSelector(value) {
    this._isText = true;
  }
  _isText = false;
  static ɵfac = function MatSuffix_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatSuffix)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MatSuffix,
    selectors: [["", "matSuffix", ""], ["", "matIconSuffix", ""], ["", "matTextSuffix", ""]],
    inputs: {
      _isTextSelector: [0, "matTextSuffix", "_isTextSelector"]
    },
    features: [ɵɵProvidersFeature([{
      provide: MAT_SUFFIX,
      useExisting: _MatSuffix
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSuffix, [{
    type: Directive,
    args: [{
      selector: "[matSuffix], [matIconSuffix], [matTextSuffix]",
      providers: [{
        provide: MAT_SUFFIX,
        useExisting: MatSuffix
      }]
    }]
  }], null, {
    _isTextSelector: [{
      type: Input,
      args: ["matTextSuffix"]
    }]
  });
})();
var FLOATING_LABEL_PARENT = new InjectionToken("FloatingLabelParent");
var MatFormFieldFloatingLabel = class _MatFormFieldFloatingLabel {
  _elementRef = inject(ElementRef);
  get floating() {
    return this._floating;
  }
  set floating(value) {
    this._floating = value;
    if (this.monitorResize) {
      this._handleResize();
    }
  }
  _floating = false;
  get monitorResize() {
    return this._monitorResize;
  }
  set monitorResize(value) {
    this._monitorResize = value;
    if (this._monitorResize) {
      this._subscribeToResize();
    } else {
      this._resizeSubscription.unsubscribe();
    }
  }
  _monitorResize = false;
  _resizeObserver = inject(SharedResizeObserver);
  _ngZone = inject(NgZone);
  _parent = inject(FLOATING_LABEL_PARENT);
  _resizeSubscription = new Subscription();
  constructor() {
  }
  ngOnDestroy() {
    this._resizeSubscription.unsubscribe();
  }
  getWidth() {
    return estimateScrollWidth(this._elementRef.nativeElement);
  }
  get element() {
    return this._elementRef.nativeElement;
  }
  _handleResize() {
    setTimeout(() => this._parent._handleLabelResized());
  }
  _subscribeToResize() {
    this._resizeSubscription.unsubscribe();
    this._ngZone.runOutsideAngular(() => {
      this._resizeSubscription = this._resizeObserver.observe(this._elementRef.nativeElement, {
        box: "border-box"
      }).subscribe(() => this._handleResize());
    });
  }
  static ɵfac = function MatFormFieldFloatingLabel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatFormFieldFloatingLabel)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MatFormFieldFloatingLabel,
    selectors: [["label", "matFormFieldFloatingLabel", ""]],
    hostAttrs: [1, "mdc-floating-label", "mat-mdc-floating-label"],
    hostVars: 2,
    hostBindings: function MatFormFieldFloatingLabel_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("mdc-floating-label--float-above", ctx.floating);
      }
    },
    inputs: {
      floating: "floating",
      monitorResize: "monitorResize"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormFieldFloatingLabel, [{
    type: Directive,
    args: [{
      selector: "label[matFormFieldFloatingLabel]",
      host: {
        "class": "mdc-floating-label mat-mdc-floating-label",
        "[class.mdc-floating-label--float-above]": "floating"
      }
    }]
  }], () => [], {
    floating: [{
      type: Input
    }],
    monitorResize: [{
      type: Input
    }]
  });
})();
function estimateScrollWidth(element) {
  const htmlEl = element;
  if (htmlEl.offsetParent !== null) {
    return htmlEl.scrollWidth;
  }
  const clone = htmlEl.cloneNode(true);
  clone.style.setProperty("position", "absolute");
  clone.style.setProperty("transform", "translate(-9999px, -9999px)");
  document.documentElement.appendChild(clone);
  const scrollWidth = clone.scrollWidth;
  clone.remove();
  return scrollWidth;
}
var ACTIVATE_CLASS = "mdc-line-ripple--active";
var DEACTIVATING_CLASS = "mdc-line-ripple--deactivating";
var MatFormFieldLineRipple = class _MatFormFieldLineRipple {
  _elementRef = inject(ElementRef);
  _cleanupTransitionEnd;
  constructor() {
    const ngZone = inject(NgZone);
    const renderer = inject(Renderer2);
    ngZone.runOutsideAngular(() => {
      this._cleanupTransitionEnd = renderer.listen(this._elementRef.nativeElement, "transitionend", this._handleTransitionEnd);
    });
  }
  activate() {
    const classList = this._elementRef.nativeElement.classList;
    classList.remove(DEACTIVATING_CLASS);
    classList.add(ACTIVATE_CLASS);
  }
  deactivate() {
    this._elementRef.nativeElement.classList.add(DEACTIVATING_CLASS);
  }
  _handleTransitionEnd = (event) => {
    const classList = this._elementRef.nativeElement.classList;
    const isDeactivating = classList.contains(DEACTIVATING_CLASS);
    if (event.propertyName === "opacity" && isDeactivating) {
      classList.remove(ACTIVATE_CLASS, DEACTIVATING_CLASS);
    }
  };
  ngOnDestroy() {
    this._cleanupTransitionEnd();
  }
  static ɵfac = function MatFormFieldLineRipple_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatFormFieldLineRipple)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MatFormFieldLineRipple,
    selectors: [["div", "matFormFieldLineRipple", ""]],
    hostAttrs: [1, "mdc-line-ripple"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormFieldLineRipple, [{
    type: Directive,
    args: [{
      selector: "div[matFormFieldLineRipple]",
      host: {
        "class": "mdc-line-ripple"
      }
    }]
  }], () => [], null);
})();
var MatFormFieldNotchedOutline = class _MatFormFieldNotchedOutline {
  _elementRef = inject(ElementRef);
  _ngZone = inject(NgZone);
  open = false;
  _notch;
  ngAfterViewInit() {
    const element = this._elementRef.nativeElement;
    const label = element.querySelector(".mdc-floating-label");
    if (label) {
      element.classList.add("mdc-notched-outline--upgraded");
      if (typeof requestAnimationFrame === "function") {
        label.style.transitionDuration = "0s";
        this._ngZone.runOutsideAngular(() => {
          requestAnimationFrame(() => label.style.transitionDuration = "");
        });
      }
    } else {
      element.classList.add("mdc-notched-outline--no-label");
    }
  }
  _setNotchWidth(labelWidth) {
    const notch = this._notch.nativeElement;
    if (!this.open || !labelWidth) {
      notch.style.width = "";
    } else {
      const NOTCH_ELEMENT_PADDING = 8;
      const NOTCH_ELEMENT_BORDER = 1;
      notch.style.width = `calc(${labelWidth}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + ${NOTCH_ELEMENT_PADDING + NOTCH_ELEMENT_BORDER}px)`;
    }
  }
  _setMaxWidth(prefixAndSuffixWidth) {
    this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width", `calc(100% - ${prefixAndSuffixWidth}px)`);
  }
  static ɵfac = function MatFormFieldNotchedOutline_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatFormFieldNotchedOutline)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MatFormFieldNotchedOutline,
    selectors: [["div", "matFormFieldNotchedOutline", ""]],
    viewQuery: function MatFormFieldNotchedOutline_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._notch = _t.first);
      }
    },
    hostAttrs: [1, "mdc-notched-outline"],
    hostVars: 2,
    hostBindings: function MatFormFieldNotchedOutline_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("mdc-notched-outline--notched", ctx.open);
      }
    },
    inputs: {
      open: [0, "matFormFieldNotchedOutlineOpen", "open"]
    },
    attrs: _c1,
    ngContentSelectors: _c2,
    decls: 5,
    vars: 0,
    consts: [["notch", ""], [1, "mat-mdc-notch-piece", "mdc-notched-outline__leading"], [1, "mat-mdc-notch-piece", "mdc-notched-outline__notch"], [1, "mat-mdc-notch-piece", "mdc-notched-outline__trailing"]],
    template: function MatFormFieldNotchedOutline_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵdomElement(0, "div", 1);
        ɵɵdomElementStart(1, "div", 2, 0);
        ɵɵprojection(3);
        ɵɵdomElementEnd();
        ɵɵdomElement(4, "div", 3);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormFieldNotchedOutline, [{
    type: Component,
    args: [{
      selector: "div[matFormFieldNotchedOutline]",
      host: {
        "class": "mdc-notched-outline",
        "[class.mdc-notched-outline--notched]": "open"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: '<div class="mat-mdc-notch-piece mdc-notched-outline__leading"></div>\n<div class="mat-mdc-notch-piece mdc-notched-outline__notch" #notch>\n  <ng-content></ng-content>\n</div>\n<div class="mat-mdc-notch-piece mdc-notched-outline__trailing"></div>\n'
    }]
  }], null, {
    open: [{
      type: Input,
      args: ["matFormFieldNotchedOutlineOpen"]
    }],
    _notch: [{
      type: ViewChild,
      args: ["notch"]
    }]
  });
})();
var MatFormFieldControl = class _MatFormFieldControl {
  value = null;
  stateChanges;
  id;
  placeholder;
  ngControl = null;
  focused = false;
  empty = false;
  shouldLabelFloat = false;
  required = false;
  disabled = false;
  errorState = false;
  controlType;
  autofilled;
  userAriaDescribedBy;
  disableAutomaticLabeling;
  describedByIds;
  static ɵfac = function MatFormFieldControl_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatFormFieldControl)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MatFormFieldControl
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormFieldControl, [{
    type: Directive
  }], null, null);
})();
function getMatFormFieldDuplicatedHintError(align) {
  return Error(`A hint was already declared for 'align="${align}"'.`);
}
function getMatFormFieldMissingControlError() {
  return Error("mat-form-field must contain a MatFormFieldControl.");
}
var MAT_FORM_FIELD = new InjectionToken("MatFormField");
var MAT_FORM_FIELD_DEFAULT_OPTIONS = new InjectionToken("MAT_FORM_FIELD_DEFAULT_OPTIONS");
var DEFAULT_APPEARANCE = "fill";
var DEFAULT_FLOAT_LABEL = "auto";
var DEFAULT_SUBSCRIPT_SIZING = "fixed";
var FLOATING_LABEL_DEFAULT_DOCKED_TRANSFORM = `translateY(-50%)`;
var MatFormField = class _MatFormField {
  _elementRef = inject(ElementRef);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _platform = inject(Platform);
  _idGenerator = inject(_IdGenerator);
  _ngZone = inject(NgZone);
  _defaults = inject(MAT_FORM_FIELD_DEFAULT_OPTIONS, {
    optional: true
  });
  _currentDirection;
  _textField;
  _iconPrefixContainer;
  _textPrefixContainer;
  _iconSuffixContainer;
  _textSuffixContainer;
  _floatingLabel;
  _notchedOutline;
  _lineRipple;
  _iconPrefixContainerSignal = viewChild("iconPrefixContainer", ...ngDevMode ? [{
    debugName: "_iconPrefixContainerSignal"
  }] : []);
  _textPrefixContainerSignal = viewChild("textPrefixContainer", ...ngDevMode ? [{
    debugName: "_textPrefixContainerSignal"
  }] : []);
  _iconSuffixContainerSignal = viewChild("iconSuffixContainer", ...ngDevMode ? [{
    debugName: "_iconSuffixContainerSignal"
  }] : []);
  _textSuffixContainerSignal = viewChild("textSuffixContainer", ...ngDevMode ? [{
    debugName: "_textSuffixContainerSignal"
  }] : []);
  _prefixSuffixContainers = computed(() => {
    return [this._iconPrefixContainerSignal(), this._textPrefixContainerSignal(), this._iconSuffixContainerSignal(), this._textSuffixContainerSignal()].map((container) => container?.nativeElement).filter((e) => e !== void 0);
  }, ...ngDevMode ? [{
    debugName: "_prefixSuffixContainers"
  }] : []);
  _formFieldControl;
  _prefixChildren;
  _suffixChildren;
  _errorChildren;
  _hintChildren;
  _labelChild = contentChild(MatLabel, ...ngDevMode ? [{
    debugName: "_labelChild"
  }] : []);
  get hideRequiredMarker() {
    return this._hideRequiredMarker;
  }
  set hideRequiredMarker(value) {
    this._hideRequiredMarker = coerceBooleanProperty(value);
  }
  _hideRequiredMarker = false;
  color = "primary";
  get floatLabel() {
    return this._floatLabel || this._defaults?.floatLabel || DEFAULT_FLOAT_LABEL;
  }
  set floatLabel(value) {
    if (value !== this._floatLabel) {
      this._floatLabel = value;
      this._changeDetectorRef.markForCheck();
    }
  }
  _floatLabel;
  get appearance() {
    return this._appearanceSignal();
  }
  set appearance(value) {
    const newAppearance = value || this._defaults?.appearance || DEFAULT_APPEARANCE;
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (newAppearance !== "fill" && newAppearance !== "outline") {
        throw new Error(`MatFormField: Invalid appearance "${newAppearance}", valid values are "fill" or "outline".`);
      }
    }
    this._appearanceSignal.set(newAppearance);
  }
  _appearanceSignal = signal(DEFAULT_APPEARANCE, ...ngDevMode ? [{
    debugName: "_appearanceSignal"
  }] : []);
  get subscriptSizing() {
    return this._subscriptSizing || this._defaults?.subscriptSizing || DEFAULT_SUBSCRIPT_SIZING;
  }
  set subscriptSizing(value) {
    this._subscriptSizing = value || this._defaults?.subscriptSizing || DEFAULT_SUBSCRIPT_SIZING;
  }
  _subscriptSizing = null;
  get hintLabel() {
    return this._hintLabel;
  }
  set hintLabel(value) {
    this._hintLabel = value;
    this._processHints();
  }
  _hintLabel = "";
  _hasIconPrefix = false;
  _hasTextPrefix = false;
  _hasIconSuffix = false;
  _hasTextSuffix = false;
  _labelId = this._idGenerator.getId("mat-mdc-form-field-label-");
  _hintLabelId = this._idGenerator.getId("mat-mdc-hint-");
  _describedByIds;
  get _control() {
    return this._explicitFormFieldControl || this._formFieldControl;
  }
  set _control(value) {
    this._explicitFormFieldControl = value;
  }
  _destroyed = new Subject();
  _isFocused = null;
  _explicitFormFieldControl;
  _previousControl = null;
  _previousControlValidatorFn = null;
  _stateChanges;
  _valueChanges;
  _describedByChanges;
  _outlineLabelOffsetResizeObserver = null;
  _animationsDisabled = _animationsDisabled();
  constructor() {
    const defaults = this._defaults;
    const dir = inject(Directionality);
    if (defaults) {
      if (defaults.appearance) {
        this.appearance = defaults.appearance;
      }
      this._hideRequiredMarker = Boolean(defaults?.hideRequiredMarker);
      if (defaults.color) {
        this.color = defaults.color;
      }
    }
    effect(() => this._currentDirection = dir.valueSignal());
    this._syncOutlineLabelOffset();
  }
  ngAfterViewInit() {
    this._updateFocusState();
    if (!this._animationsDisabled) {
      this._ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled");
        }, 300);
      });
    }
    this._changeDetectorRef.detectChanges();
  }
  ngAfterContentInit() {
    this._assertFormFieldControl();
    this._initializeSubscript();
    this._initializePrefixAndSuffix();
  }
  ngAfterContentChecked() {
    this._assertFormFieldControl();
    if (this._control !== this._previousControl) {
      this._initializeControl(this._previousControl);
      if (this._control.ngControl && this._control.ngControl.control) {
        this._previousControlValidatorFn = this._control.ngControl.control.validator;
      }
      this._previousControl = this._control;
    }
    if (this._control.ngControl && this._control.ngControl.control) {
      const validatorFn = this._control.ngControl.control.validator;
      if (validatorFn !== this._previousControlValidatorFn) {
        this._changeDetectorRef.markForCheck();
      }
    }
  }
  ngOnDestroy() {
    this._outlineLabelOffsetResizeObserver?.disconnect();
    this._stateChanges?.unsubscribe();
    this._valueChanges?.unsubscribe();
    this._describedByChanges?.unsubscribe();
    this._destroyed.next();
    this._destroyed.complete();
  }
  getLabelId = computed(() => this._hasFloatingLabel() ? this._labelId : null, ...ngDevMode ? [{
    debugName: "getLabelId"
  }] : []);
  getConnectedOverlayOrigin() {
    return this._textField || this._elementRef;
  }
  _animateAndLockLabel() {
    if (this._hasFloatingLabel()) {
      this.floatLabel = "always";
    }
  }
  _initializeControl(previousControl) {
    const control = this._control;
    const classPrefix = "mat-mdc-form-field-type-";
    if (previousControl) {
      this._elementRef.nativeElement.classList.remove(classPrefix + previousControl.controlType);
    }
    if (control.controlType) {
      this._elementRef.nativeElement.classList.add(classPrefix + control.controlType);
    }
    this._stateChanges?.unsubscribe();
    this._stateChanges = control.stateChanges.subscribe(() => {
      this._updateFocusState();
      this._changeDetectorRef.markForCheck();
    });
    this._describedByChanges?.unsubscribe();
    this._describedByChanges = control.stateChanges.pipe(startWith([void 0, void 0]), map(() => [control.errorState, control.userAriaDescribedBy]), pairwise(), filter(([[prevErrorState, prevDescribedBy], [currentErrorState, currentDescribedBy]]) => {
      return prevErrorState !== currentErrorState || prevDescribedBy !== currentDescribedBy;
    })).subscribe(() => this._syncDescribedByIds());
    this._valueChanges?.unsubscribe();
    if (control.ngControl && control.ngControl.valueChanges) {
      this._valueChanges = control.ngControl.valueChanges.pipe(takeUntil(this._destroyed)).subscribe(() => this._changeDetectorRef.markForCheck());
    }
  }
  _checkPrefixAndSuffixTypes() {
    this._hasIconPrefix = !!this._prefixChildren.find((p) => !p._isText);
    this._hasTextPrefix = !!this._prefixChildren.find((p) => p._isText);
    this._hasIconSuffix = !!this._suffixChildren.find((s) => !s._isText);
    this._hasTextSuffix = !!this._suffixChildren.find((s) => s._isText);
  }
  _initializePrefixAndSuffix() {
    this._checkPrefixAndSuffixTypes();
    merge(this._prefixChildren.changes, this._suffixChildren.changes).subscribe(() => {
      this._checkPrefixAndSuffixTypes();
      this._changeDetectorRef.markForCheck();
    });
  }
  _initializeSubscript() {
    this._hintChildren.changes.subscribe(() => {
      this._processHints();
      this._changeDetectorRef.markForCheck();
    });
    this._errorChildren.changes.subscribe(() => {
      this._syncDescribedByIds();
      this._changeDetectorRef.markForCheck();
    });
    this._validateHints();
    this._syncDescribedByIds();
  }
  _assertFormFieldControl() {
    if (!this._control && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getMatFormFieldMissingControlError();
    }
  }
  _updateFocusState() {
    const controlFocused = this._control.focused;
    if (controlFocused && !this._isFocused) {
      this._isFocused = true;
      this._lineRipple?.activate();
    } else if (!controlFocused && (this._isFocused || this._isFocused === null)) {
      this._isFocused = false;
      this._lineRipple?.deactivate();
    }
    this._elementRef.nativeElement.classList.toggle("mat-focused", controlFocused);
    this._textField?.nativeElement.classList.toggle("mdc-text-field--focused", controlFocused);
  }
  _syncOutlineLabelOffset() {
    afterRenderEffect({
      earlyRead: () => {
        if (this._appearanceSignal() !== "outline") {
          this._outlineLabelOffsetResizeObserver?.disconnect();
          return null;
        }
        if (globalThis.ResizeObserver) {
          this._outlineLabelOffsetResizeObserver ||= new globalThis.ResizeObserver(() => {
            this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset());
          });
          for (const el of this._prefixSuffixContainers()) {
            this._outlineLabelOffsetResizeObserver.observe(el, {
              box: "border-box"
            });
          }
        }
        return this._getOutlinedLabelOffset();
      },
      write: (labelStyles) => this._writeOutlinedLabelStyles(labelStyles())
    });
  }
  _shouldAlwaysFloat() {
    return this.floatLabel === "always";
  }
  _hasOutline() {
    return this.appearance === "outline";
  }
  _forceDisplayInfixLabel() {
    return !this._platform.isBrowser && this._prefixChildren.length && !this._shouldLabelFloat();
  }
  _hasFloatingLabel = computed(() => !!this._labelChild(), ...ngDevMode ? [{
    debugName: "_hasFloatingLabel"
  }] : []);
  _shouldLabelFloat() {
    if (!this._hasFloatingLabel()) {
      return false;
    }
    return this._control.shouldLabelFloat || this._shouldAlwaysFloat();
  }
  _shouldForward(prop) {
    const control = this._control ? this._control.ngControl : null;
    return control && control[prop];
  }
  _getSubscriptMessageType() {
    return this._errorChildren && this._errorChildren.length > 0 && this._control.errorState ? "error" : "hint";
  }
  _handleLabelResized() {
    this._refreshOutlineNotchWidth();
  }
  _refreshOutlineNotchWidth() {
    if (!this._hasOutline() || !this._floatingLabel || !this._shouldLabelFloat()) {
      this._notchedOutline?._setNotchWidth(0);
    } else {
      this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth());
    }
  }
  _processHints() {
    this._validateHints();
    this._syncDescribedByIds();
  }
  _validateHints() {
    if (this._hintChildren && (typeof ngDevMode === "undefined" || ngDevMode)) {
      let startHint;
      let endHint;
      this._hintChildren.forEach((hint) => {
        if (hint.align === "start") {
          if (startHint || this.hintLabel) {
            throw getMatFormFieldDuplicatedHintError("start");
          }
          startHint = hint;
        } else if (hint.align === "end") {
          if (endHint) {
            throw getMatFormFieldDuplicatedHintError("end");
          }
          endHint = hint;
        }
      });
    }
  }
  _syncDescribedByIds() {
    if (this._control) {
      let ids = [];
      if (this._control.userAriaDescribedBy && typeof this._control.userAriaDescribedBy === "string") {
        ids.push(...this._control.userAriaDescribedBy.split(" "));
      }
      if (this._getSubscriptMessageType() === "hint") {
        const startHint = this._hintChildren ? this._hintChildren.find((hint) => hint.align === "start") : null;
        const endHint = this._hintChildren ? this._hintChildren.find((hint) => hint.align === "end") : null;
        if (startHint) {
          ids.push(startHint.id);
        } else if (this._hintLabel) {
          ids.push(this._hintLabelId);
        }
        if (endHint) {
          ids.push(endHint.id);
        }
      } else if (this._errorChildren) {
        ids.push(...this._errorChildren.map((error) => error.id));
      }
      const existingDescribedBy = this._control.describedByIds;
      let toAssign;
      if (existingDescribedBy) {
        const exclude = this._describedByIds || ids;
        toAssign = ids.concat(existingDescribedBy.filter((id) => id && !exclude.includes(id)));
      } else {
        toAssign = ids;
      }
      this._control.setDescribedByIds(toAssign);
      this._describedByIds = ids;
    }
  }
  _getOutlinedLabelOffset() {
    if (!this._hasOutline() || !this._floatingLabel) {
      return null;
    }
    if (!this._iconPrefixContainer && !this._textPrefixContainer) {
      return ["", null];
    }
    if (!this._isAttachedToDom()) {
      return null;
    }
    const iconPrefixContainer = this._iconPrefixContainer?.nativeElement;
    const textPrefixContainer = this._textPrefixContainer?.nativeElement;
    const iconSuffixContainer = this._iconSuffixContainer?.nativeElement;
    const textSuffixContainer = this._textSuffixContainer?.nativeElement;
    const iconPrefixContainerWidth = iconPrefixContainer?.getBoundingClientRect().width ?? 0;
    const textPrefixContainerWidth = textPrefixContainer?.getBoundingClientRect().width ?? 0;
    const iconSuffixContainerWidth = iconSuffixContainer?.getBoundingClientRect().width ?? 0;
    const textSuffixContainerWidth = textSuffixContainer?.getBoundingClientRect().width ?? 0;
    const negate = this._currentDirection === "rtl" ? "-1" : "1";
    const prefixWidth = `${iconPrefixContainerWidth + textPrefixContainerWidth}px`;
    const labelOffset = `var(--mat-mdc-form-field-label-offset-x, 0px)`;
    const labelHorizontalOffset = `calc(${negate} * (${prefixWidth} + ${labelOffset}))`;
    const floatingLabelTransform = `var(--mat-mdc-form-field-label-transform, ${FLOATING_LABEL_DEFAULT_DOCKED_TRANSFORM} translateX(${labelHorizontalOffset}))`;
    const notchedOutlineWidth = iconPrefixContainerWidth + textPrefixContainerWidth + iconSuffixContainerWidth + textSuffixContainerWidth;
    return [floatingLabelTransform, notchedOutlineWidth];
  }
  _writeOutlinedLabelStyles(styles) {
    if (styles !== null) {
      const [floatingLabelTransform, notchedOutlineWidth] = styles;
      if (this._floatingLabel) {
        this._floatingLabel.element.style.transform = floatingLabelTransform;
      }
      if (notchedOutlineWidth !== null) {
        this._notchedOutline?._setMaxWidth(notchedOutlineWidth);
      }
    }
  }
  _isAttachedToDom() {
    const element = this._elementRef.nativeElement;
    if (element.getRootNode) {
      const rootNode = element.getRootNode();
      return rootNode && rootNode !== element;
    }
    return document.documentElement.contains(element);
  }
  static ɵfac = function MatFormField_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatFormField)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MatFormField,
    selectors: [["mat-form-field"]],
    contentQueries: function MatFormField_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuerySignal(dirIndex, ctx._labelChild, MatLabel, 5);
        ɵɵcontentQuery(dirIndex, MatFormFieldControl, 5)(dirIndex, MAT_PREFIX, 5)(dirIndex, MAT_SUFFIX, 5)(dirIndex, MAT_ERROR, 5)(dirIndex, MatHint, 5);
      }
      if (rf & 2) {
        ɵɵqueryAdvance();
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._formFieldControl = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._prefixChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._suffixChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._errorChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._hintChildren = _t);
      }
    },
    viewQuery: function MatFormField_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuerySignal(ctx._iconPrefixContainerSignal, _c3, 5)(ctx._textPrefixContainerSignal, _c4, 5)(ctx._iconSuffixContainerSignal, _c5, 5)(ctx._textSuffixContainerSignal, _c6, 5);
        ɵɵviewQuery(_c7, 5)(_c3, 5)(_c4, 5)(_c5, 5)(_c6, 5)(MatFormFieldFloatingLabel, 5)(MatFormFieldNotchedOutline, 5)(MatFormFieldLineRipple, 5);
      }
      if (rf & 2) {
        ɵɵqueryAdvance(4);
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._textField = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._iconPrefixContainer = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._textPrefixContainer = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._iconSuffixContainer = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._textSuffixContainer = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._floatingLabel = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._notchedOutline = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._lineRipple = _t.first);
      }
    },
    hostAttrs: [1, "mat-mdc-form-field"],
    hostVars: 38,
    hostBindings: function MatFormField_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("mat-mdc-form-field-label-always-float", ctx._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix", ctx._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix", ctx._hasIconSuffix)("mat-form-field-invalid", ctx._control.errorState)("mat-form-field-disabled", ctx._control.disabled)("mat-form-field-autofilled", ctx._control.autofilled)("mat-form-field-appearance-fill", ctx.appearance == "fill")("mat-form-field-appearance-outline", ctx.appearance == "outline")("mat-form-field-hide-placeholder", ctx._hasFloatingLabel() && !ctx._shouldLabelFloat())("mat-primary", ctx.color !== "accent" && ctx.color !== "warn")("mat-accent", ctx.color === "accent")("mat-warn", ctx.color === "warn")("ng-untouched", ctx._shouldForward("untouched"))("ng-touched", ctx._shouldForward("touched"))("ng-pristine", ctx._shouldForward("pristine"))("ng-dirty", ctx._shouldForward("dirty"))("ng-valid", ctx._shouldForward("valid"))("ng-invalid", ctx._shouldForward("invalid"))("ng-pending", ctx._shouldForward("pending"));
      }
    },
    inputs: {
      hideRequiredMarker: "hideRequiredMarker",
      color: "color",
      floatLabel: "floatLabel",
      appearance: "appearance",
      subscriptSizing: "subscriptSizing",
      hintLabel: "hintLabel"
    },
    exportAs: ["matFormField"],
    features: [ɵɵProvidersFeature([{
      provide: MAT_FORM_FIELD,
      useExisting: _MatFormField
    }, {
      provide: FLOATING_LABEL_PARENT,
      useExisting: _MatFormField
    }])],
    ngContentSelectors: _c9,
    decls: 18,
    vars: 21,
    consts: [["labelTemplate", ""], ["textField", ""], ["iconPrefixContainer", ""], ["textPrefixContainer", ""], ["textSuffixContainer", ""], ["iconSuffixContainer", ""], [1, "mat-mdc-text-field-wrapper", "mdc-text-field", 3, "click"], [1, "mat-mdc-form-field-focus-overlay"], [1, "mat-mdc-form-field-flex"], ["matFormFieldNotchedOutline", "", 3, "matFormFieldNotchedOutlineOpen"], [1, "mat-mdc-form-field-icon-prefix"], [1, "mat-mdc-form-field-text-prefix"], [1, "mat-mdc-form-field-infix"], [3, "ngTemplateOutlet"], [1, "mat-mdc-form-field-text-suffix"], [1, "mat-mdc-form-field-icon-suffix"], ["matFormFieldLineRipple", ""], ["aria-atomic", "true", "aria-live", "polite", 1, "mat-mdc-form-field-subscript-wrapper", "mat-mdc-form-field-bottom-align"], [1, "mat-mdc-form-field-error-wrapper"], [1, "mat-mdc-form-field-hint-wrapper"], ["matFormFieldFloatingLabel", "", 3, "floating", "monitorResize", "id"], ["aria-hidden", "true", 1, "mat-mdc-form-field-required-marker", "mdc-floating-label--required"], [3, "id"], [1, "mat-mdc-form-field-hint-spacer"]],
    template: function MatFormField_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef(_c8);
        ɵɵtemplate(0, MatFormField_ng_template_0_Template, 1, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor);
        ɵɵelementStart(2, "div", 6, 1);
        ɵɵlistener("click", function MatFormField_Template_div_click_2_listener($event) {
          return ctx._control.onContainerClick($event);
        });
        ɵɵconditionalCreate(4, MatFormField_Conditional_4_Template, 1, 0, "div", 7);
        ɵɵelementStart(5, "div", 8);
        ɵɵconditionalCreate(6, MatFormField_Conditional_6_Template, 2, 2, "div", 9);
        ɵɵconditionalCreate(7, MatFormField_Conditional_7_Template, 3, 0, "div", 10);
        ɵɵconditionalCreate(8, MatFormField_Conditional_8_Template, 3, 0, "div", 11);
        ɵɵelementStart(9, "div", 12);
        ɵɵconditionalCreate(10, MatFormField_Conditional_10_Template, 1, 1, null, 13);
        ɵɵprojection(11);
        ɵɵelementEnd();
        ɵɵconditionalCreate(12, MatFormField_Conditional_12_Template, 3, 0, "div", 14);
        ɵɵconditionalCreate(13, MatFormField_Conditional_13_Template, 3, 0, "div", 15);
        ɵɵelementEnd();
        ɵɵconditionalCreate(14, MatFormField_Conditional_14_Template, 1, 0, "div", 16);
        ɵɵelementEnd();
        ɵɵelementStart(15, "div", 17);
        ɵɵconditionalCreate(16, MatFormField_Case_16_Template, 2, 0, "div", 18)(17, MatFormField_Case_17_Template, 5, 1, "div", 19);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        let tmp_17_0;
        ɵɵadvance(2);
        ɵɵclassProp("mdc-text-field--filled", !ctx._hasOutline())("mdc-text-field--outlined", ctx._hasOutline())("mdc-text-field--no-label", !ctx._hasFloatingLabel())("mdc-text-field--disabled", ctx._control.disabled)("mdc-text-field--invalid", ctx._control.errorState);
        ɵɵadvance(2);
        ɵɵconditional(!ctx._hasOutline() && !ctx._control.disabled ? 4 : -1);
        ɵɵadvance(2);
        ɵɵconditional(ctx._hasOutline() ? 6 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx._hasIconPrefix ? 7 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx._hasTextPrefix ? 8 : -1);
        ɵɵadvance(2);
        ɵɵconditional(!ctx._hasOutline() || ctx._forceDisplayInfixLabel() ? 10 : -1);
        ɵɵadvance(2);
        ɵɵconditional(ctx._hasTextSuffix ? 12 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx._hasIconSuffix ? 13 : -1);
        ɵɵadvance();
        ɵɵconditional(!ctx._hasOutline() ? 14 : -1);
        ɵɵadvance();
        ɵɵclassProp("mat-mdc-form-field-subscript-dynamic-size", ctx.subscriptSizing === "dynamic");
        const subscriptMessageType_r3 = ctx._getSubscriptMessageType();
        ɵɵadvance();
        ɵɵconditional((tmp_17_0 = subscriptMessageType_r3) === "error" ? 16 : tmp_17_0 === "hint" ? 17 : -1);
      }
    },
    dependencies: [MatFormFieldFloatingLabel, MatFormFieldNotchedOutline, NgTemplateOutlet, MatFormFieldLineRipple, MatHint],
    styles: ['.mdc-text-field {\n  display: inline-flex;\n  align-items: baseline;\n  padding: 0 16px;\n  position: relative;\n  box-sizing: border-box;\n  overflow: hidden;\n  will-change: opacity, transform, color;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.mdc-text-field__input {\n  width: 100%;\n  min-width: 0;\n  border: none;\n  border-radius: 0;\n  background: none;\n  padding: 0;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  height: 28px;\n}\n.mdc-text-field__input::-webkit-calendar-picker-indicator, .mdc-text-field__input::-webkit-search-cancel-button {\n  display: none;\n}\n.mdc-text-field__input::-ms-clear {\n  display: none;\n}\n.mdc-text-field__input:focus {\n  outline: none;\n}\n.mdc-text-field__input:invalid {\n  box-shadow: none;\n}\n.mdc-text-field__input::placeholder {\n  opacity: 0;\n}\n.mdc-text-field__input::-moz-placeholder {\n  opacity: 0;\n}\n.mdc-text-field__input::-webkit-input-placeholder {\n  opacity: 0;\n}\n.mdc-text-field__input:-ms-input-placeholder {\n  opacity: 0;\n}\n.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mdc-text-field--focused .mdc-text-field__input::placeholder {\n  opacity: 1;\n}\n.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {\n  opacity: 1;\n}\n.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {\n  opacity: 1;\n}\n.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {\n  opacity: 1;\n}\n.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {\n  opacity: 0;\n}\n.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {\n  opacity: 0;\n}\n.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {\n  opacity: 0;\n}\n.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {\n  opacity: 0;\n}\n.mdc-text-field--outlined .mdc-text-field__input, .mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input {\n  height: 100%;\n}\n.mdc-text-field--outlined .mdc-text-field__input {\n  display: flex;\n  border: none !important;\n  background-color: transparent;\n}\n.mdc-text-field--disabled .mdc-text-field__input {\n  pointer-events: auto;\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input {\n  color: var(--mat-form-field-filled-input-text-color, var(--mat-sys-on-surface));\n  caret-color: var(--mat-form-field-filled-caret-color, var(--mat-sys-primary));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {\n  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {\n  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {\n  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {\n  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {\n  color: var(--mat-form-field-outlined-input-text-color, var(--mat-sys-on-surface));\n  caret-color: var(--mat-form-field-outlined-caret-color, var(--mat-sys-primary));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {\n  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {\n  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {\n  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {\n  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {\n  caret-color: var(--mat-form-field-filled-error-caret-color, var(--mat-sys-error));\n}\n.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {\n  caret-color: var(--mat-form-field-outlined-error-caret-color, var(--mat-sys-error));\n}\n.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {\n  color: var(--mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {\n  color: var(--mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n@media (forced-colors: active) {\n  .mdc-text-field--disabled .mdc-text-field__input {\n    background-color: Window;\n  }\n}\n\n.mdc-text-field--filled {\n  height: 56px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n  border-top-left-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));\n  border-top-right-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) {\n  background-color: var(--mat-form-field-filled-container-color, var(--mat-sys-surface-variant));\n}\n.mdc-text-field--filled.mdc-text-field--disabled {\n  background-color: var(--mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 4%, transparent));\n}\n\n.mdc-text-field--outlined {\n  height: 56px;\n  overflow: visible;\n  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));\n  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);\n}\n[dir=rtl] .mdc-text-field--outlined {\n  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);\n  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));\n}\n\n.mdc-floating-label {\n  position: absolute;\n  left: 0;\n  transform-origin: left top;\n  line-height: 1.15rem;\n  text-align: left;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  cursor: text;\n  overflow: hidden;\n  will-change: transform;\n}\n[dir=rtl] .mdc-floating-label {\n  right: 0;\n  left: auto;\n  transform-origin: right top;\n  text-align: right;\n}\n.mdc-text-field .mdc-floating-label {\n  top: 50%;\n  transform: translateY(-50%);\n  pointer-events: none;\n}\n.mdc-notched-outline .mdc-floating-label {\n  display: inline-block;\n  position: relative;\n  max-width: 100%;\n}\n.mdc-text-field--outlined .mdc-floating-label {\n  left: 4px;\n  right: auto;\n}\n[dir=rtl] .mdc-text-field--outlined .mdc-floating-label {\n  left: auto;\n  right: 4px;\n}\n.mdc-text-field--filled .mdc-floating-label {\n  left: 16px;\n  right: auto;\n}\n[dir=rtl] .mdc-text-field--filled .mdc-floating-label {\n  left: auto;\n  right: 16px;\n}\n.mdc-text-field--disabled .mdc-floating-label {\n  cursor: default;\n}\n@media (forced-colors: active) {\n  .mdc-text-field--disabled .mdc-floating-label {\n    z-index: 1;\n  }\n}\n.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label {\n  display: none;\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label {\n  color: var(--mat-form-field-filled-label-text-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {\n  color: var(--mat-form-field-filled-focus-label-text-color, var(--mat-sys-primary));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {\n  color: var(--mat-form-field-filled-hover-label-text-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {\n  color: var(--mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {\n  color: var(--mat-form-field-filled-error-label-text-color, var(--mat-sys-error));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {\n  color: var(--mat-form-field-filled-error-focus-label-text-color, var(--mat-sys-error));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {\n  color: var(--mat-form-field-filled-error-hover-label-text-color, var(--mat-sys-on-error-container));\n}\n.mdc-text-field--filled .mdc-floating-label {\n  font-family: var(--mat-form-field-filled-label-text-font, var(--mat-sys-body-large-font));\n  font-size: var(--mat-form-field-filled-label-text-size, var(--mat-sys-body-large-size));\n  font-weight: var(--mat-form-field-filled-label-text-weight, var(--mat-sys-body-large-weight));\n  letter-spacing: var(--mat-form-field-filled-label-text-tracking, var(--mat-sys-body-large-tracking));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label {\n  color: var(--mat-form-field-outlined-label-text-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {\n  color: var(--mat-form-field-outlined-focus-label-text-color, var(--mat-sys-primary));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {\n  color: var(--mat-form-field-outlined-hover-label-text-color, var(--mat-sys-on-surface));\n}\n.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {\n  color: var(--mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {\n  color: var(--mat-form-field-outlined-error-label-text-color, var(--mat-sys-error));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {\n  color: var(--mat-form-field-outlined-error-focus-label-text-color, var(--mat-sys-error));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {\n  color: var(--mat-form-field-outlined-error-hover-label-text-color, var(--mat-sys-on-error-container));\n}\n.mdc-text-field--outlined .mdc-floating-label {\n  font-family: var(--mat-form-field-outlined-label-text-font, var(--mat-sys-body-large-font));\n  font-size: var(--mat-form-field-outlined-label-text-size, var(--mat-sys-body-large-size));\n  font-weight: var(--mat-form-field-outlined-label-text-weight, var(--mat-sys-body-large-weight));\n  letter-spacing: var(--mat-form-field-outlined-label-text-tracking, var(--mat-sys-body-large-tracking));\n}\n\n.mdc-floating-label--float-above {\n  cursor: auto;\n  transform: translateY(-106%) scale(0.75);\n}\n.mdc-text-field--filled .mdc-floating-label--float-above {\n  transform: translateY(-106%) scale(0.75);\n}\n.mdc-text-field--outlined .mdc-floating-label--float-above {\n  transform: translateY(-37.25px) scale(1);\n  font-size: 0.75rem;\n}\n.mdc-notched-outline .mdc-floating-label--float-above {\n  text-overflow: clip;\n}\n.mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  max-width: 133.3333333333%;\n}\n.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  transform: translateY(-34.75px) scale(0.75);\n}\n.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  font-size: 1rem;\n}\n\n.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {\n  margin-left: 1px;\n  margin-right: 0;\n  content: "*";\n}\n[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {\n  margin-left: 0;\n  margin-right: 1px;\n}\n\n.mdc-notched-outline {\n  display: flex;\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  box-sizing: border-box;\n  width: 100%;\n  max-width: 100%;\n  height: 100%;\n  text-align: left;\n  pointer-events: none;\n}\n[dir=rtl] .mdc-notched-outline {\n  text-align: right;\n}\n.mdc-text-field--outlined .mdc-notched-outline {\n  z-index: 1;\n}\n\n.mat-mdc-notch-piece {\n  box-sizing: border-box;\n  height: 100%;\n  pointer-events: none;\n  border: none;\n  border-top: 1px solid;\n  border-bottom: 1px solid;\n}\n.mdc-text-field--focused .mat-mdc-notch-piece {\n  border-width: 2px;\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {\n  border-color: var(--mat-form-field-outlined-outline-color, var(--mat-sys-outline));\n  border-width: var(--mat-form-field-outlined-outline-width, 1px);\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {\n  border-color: var(--mat-form-field-outlined-hover-outline-color, var(--mat-sys-on-surface));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {\n  border-color: var(--mat-form-field-outlined-focus-outline-color, var(--mat-sys-primary));\n}\n.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {\n  border-color: var(--mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {\n  border-color: var(--mat-form-field-outlined-error-outline-color, var(--mat-sys-error));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {\n  border-color: var(--mat-form-field-outlined-error-hover-outline-color, var(--mat-sys-on-error-container));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {\n  border-color: var(--mat-form-field-outlined-error-focus-outline-color, var(--mat-sys-error));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {\n  border-width: var(--mat-form-field-outlined-focus-outline-width, 2px);\n}\n\n.mdc-notched-outline__leading {\n  border-left: 1px solid;\n  border-right: none;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n}\n.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {\n  width: max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));\n}\n[dir=rtl] .mdc-notched-outline__leading {\n  border-left: none;\n  border-right: 1px solid;\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n}\n\n.mdc-notched-outline__trailing {\n  flex-grow: 1;\n  border-left: none;\n  border-right: 1px solid;\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n}\n[dir=rtl] .mdc-notched-outline__trailing {\n  border-left: 1px solid;\n  border-right: none;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n}\n\n.mdc-notched-outline__notch {\n  flex: 0 0 auto;\n  width: auto;\n}\n.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {\n  max-width: min(var(--mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));\n}\n.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {\n  max-width: min(100%, calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));\n}\n.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {\n  padding-top: 1px;\n}\n.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {\n  padding-top: 2px;\n}\n.mdc-notched-outline--notched .mdc-notched-outline__notch {\n  padding-left: 0;\n  padding-right: 8px;\n  border-top: none;\n}\n[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch {\n  padding-left: 8px;\n  padding-right: 0;\n}\n.mdc-notched-outline--no-label .mdc-notched-outline__notch {\n  display: none;\n}\n\n.mdc-line-ripple::before, .mdc-line-ripple::after {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  border-bottom-style: solid;\n  content: "";\n}\n.mdc-line-ripple::before {\n  z-index: 1;\n  border-bottom-width: var(--mat-form-field-filled-active-indicator-height, 1px);\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {\n  border-bottom-color: var(--mat-form-field-filled-active-indicator-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {\n  border-bottom-color: var(--mat-form-field-filled-hover-active-indicator-color, var(--mat-sys-on-surface));\n}\n.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {\n  border-bottom-color: var(--mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {\n  border-bottom-color: var(--mat-form-field-filled-error-active-indicator-color, var(--mat-sys-error));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {\n  border-bottom-color: var(--mat-form-field-filled-error-hover-active-indicator-color, var(--mat-sys-on-error-container));\n}\n.mdc-line-ripple::after {\n  transform: scaleX(0);\n  opacity: 0;\n  z-index: 2;\n}\n.mdc-text-field--filled .mdc-line-ripple::after {\n  border-bottom-width: var(--mat-form-field-filled-focus-active-indicator-height, 2px);\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {\n  border-bottom-color: var(--mat-form-field-filled-focus-active-indicator-color, var(--mat-sys-primary));\n}\n.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {\n  border-bottom-color: var(--mat-form-field-filled-error-focus-active-indicator-color, var(--mat-sys-error));\n}\n\n.mdc-line-ripple--active::after {\n  transform: scaleX(1);\n  opacity: 1;\n}\n\n.mdc-line-ripple--deactivating::after {\n  opacity: 0;\n}\n\n.mdc-text-field--disabled {\n  pointer-events: none;\n}\n\n.mat-mdc-form-field-textarea-control {\n  vertical-align: middle;\n  resize: vertical;\n  box-sizing: border-box;\n  height: auto;\n  margin: 0;\n  padding: 0;\n  border: none;\n  overflow: auto;\n}\n\n.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font: inherit;\n  letter-spacing: inherit;\n  text-decoration: inherit;\n  text-transform: inherit;\n  border: none;\n}\n\n.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  line-height: normal;\n  pointer-events: all;\n  will-change: auto;\n}\n\n.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label {\n  cursor: inherit;\n}\n\n.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,\n.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control {\n  height: auto;\n}\n\n.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color] {\n  height: 23px;\n}\n\n.mat-mdc-text-field-wrapper {\n  height: auto;\n  flex: auto;\n  will-change: auto;\n}\n\n.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {\n  padding-left: 0;\n  --mat-mdc-form-field-label-offset-x: -16px;\n}\n\n.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {\n  padding-right: 0;\n}\n\n[dir=rtl] .mat-mdc-text-field-wrapper {\n  padding-left: 16px;\n  padding-right: 16px;\n}\n[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {\n  padding-left: 0;\n}\n[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {\n  padding-right: 0;\n}\n\n.mat-form-field-disabled .mdc-text-field__input::placeholder {\n  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {\n  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {\n  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {\n  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n\n.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder {\n  transition-delay: 40ms;\n  transition-duration: 110ms;\n  opacity: 1;\n}\n\n.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label {\n  left: auto;\n  right: auto;\n}\n\n.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input {\n  display: inline-block;\n}\n\n.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch {\n  padding-top: 0;\n}\n\n.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {\n  border-left: 1px solid transparent;\n}\n\n[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {\n  border-left: none;\n  border-right: 1px solid transparent;\n}\n\n.mat-mdc-form-field-infix {\n  min-height: var(--mat-form-field-container-height, 56px);\n  padding-top: var(--mat-form-field-filled-with-label-container-padding-top, 24px);\n  padding-bottom: var(--mat-form-field-filled-with-label-container-padding-bottom, 8px);\n}\n.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {\n  padding-top: var(--mat-form-field-container-vertical-padding, 16px);\n  padding-bottom: var(--mat-form-field-container-vertical-padding, 16px);\n}\n\n.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {\n  top: calc(var(--mat-form-field-container-height, 56px) / 2);\n}\n\n.mdc-text-field--filled .mat-mdc-floating-label {\n  display: var(--mat-form-field-filled-label-display, block);\n}\n\n.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  --mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--mat-form-field-container-height, 56px) / 2) * -1))\n    scale(var(--mat-mdc-form-field-floating-label-scale, 0.75));\n  transform: var(--mat-mdc-form-field-label-transform);\n}\n\n@keyframes _mat-form-field-subscript-animation {\n  from {\n    opacity: 0;\n    transform: translateY(-5px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.mat-mdc-form-field-subscript-wrapper {\n  box-sizing: border-box;\n  width: 100%;\n  position: relative;\n}\n\n.mat-mdc-form-field-hint-wrapper,\n.mat-mdc-form-field-error-wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  padding: 0 16px;\n  opacity: 1;\n  transform: translateY(0);\n  animation: _mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2);\n}\n\n.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,\n.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper {\n  position: static;\n}\n\n.mat-mdc-form-field-bottom-align::before {\n  content: "";\n  display: inline-block;\n  height: 16px;\n}\n\n.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before {\n  content: unset;\n}\n\n.mat-mdc-form-field-hint-end {\n  order: 1;\n}\n\n.mat-mdc-form-field-hint-wrapper {\n  display: flex;\n}\n\n.mat-mdc-form-field-hint-spacer {\n  flex: 1 0 1em;\n}\n\n.mat-mdc-form-field-error {\n  display: block;\n  color: var(--mat-form-field-error-text-color, var(--mat-sys-error));\n}\n\n.mat-mdc-form-field-subscript-wrapper,\n.mat-mdc-form-field-bottom-align::before {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-family: var(--mat-form-field-subscript-text-font, var(--mat-sys-body-small-font));\n  line-height: var(--mat-form-field-subscript-text-line-height, var(--mat-sys-body-small-line-height));\n  font-size: var(--mat-form-field-subscript-text-size, var(--mat-sys-body-small-size));\n  letter-spacing: var(--mat-form-field-subscript-text-tracking, var(--mat-sys-body-small-tracking));\n  font-weight: var(--mat-form-field-subscript-text-weight, var(--mat-sys-body-small-weight));\n}\n\n.mat-mdc-form-field-focus-overlay {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  opacity: 0;\n  pointer-events: none;\n  background-color: var(--mat-form-field-state-layer-color, var(--mat-sys-on-surface));\n}\n.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {\n  opacity: var(--mat-form-field-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {\n  opacity: var(--mat-form-field-focus-state-layer-opacity, 0);\n}\n\nselect.mat-mdc-form-field-input-control {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  background-color: transparent;\n  display: inline-flex;\n  box-sizing: border-box;\n}\nselect.mat-mdc-form-field-input-control:not(:disabled) {\n  cursor: pointer;\n}\nselect.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option {\n  color: var(--mat-form-field-select-option-text-color, var(--mat-sys-neutral10));\n}\nselect.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {\n  color: var(--mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--mat-sys-neutral10) 38%, transparent));\n}\n\n.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {\n  content: "";\n  width: 0;\n  height: 0;\n  border-left: 5px solid transparent;\n  border-right: 5px solid transparent;\n  border-top: 5px solid;\n  position: absolute;\n  right: 0;\n  top: 50%;\n  margin-top: -2.5px;\n  pointer-events: none;\n  color: var(--mat-form-field-enabled-select-arrow-color, var(--mat-sys-on-surface-variant));\n}\n[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {\n  right: auto;\n  left: 0;\n}\n.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {\n  color: var(--mat-form-field-focus-select-arrow-color, var(--mat-sys-primary));\n}\n.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {\n  color: var(--mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {\n  padding-right: 15px;\n}\n[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {\n  padding-right: 0;\n  padding-left: 15px;\n}\n\n@media (forced-colors: active) {\n  .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper {\n    outline: solid 1px;\n  }\n}\n@media (forced-colors: active) {\n  .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper {\n    outline-color: GrayText;\n  }\n}\n\n@media (forced-colors: active) {\n  .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper {\n    outline: dashed 3px;\n  }\n}\n\n@media (forced-colors: active) {\n  .mat-mdc-form-field.mat-focused .mdc-notched-outline {\n    border: dashed 3px;\n  }\n}\n\n.mat-mdc-form-field-input-control[type=date], .mat-mdc-form-field-input-control[type=datetime], .mat-mdc-form-field-input-control[type=datetime-local], .mat-mdc-form-field-input-control[type=month], .mat-mdc-form-field-input-control[type=week], .mat-mdc-form-field-input-control[type=time] {\n  line-height: 1;\n}\n.mat-mdc-form-field-input-control::-webkit-datetime-edit {\n  line-height: 1;\n  padding: 0;\n  margin-bottom: -2px;\n}\n\n.mat-mdc-form-field {\n  --mat-mdc-form-field-floating-label-scale: 0.75;\n  display: inline-flex;\n  flex-direction: column;\n  min-width: 0;\n  text-align: left;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-family: var(--mat-form-field-container-text-font, var(--mat-sys-body-large-font));\n  line-height: var(--mat-form-field-container-text-line-height, var(--mat-sys-body-large-line-height));\n  font-size: var(--mat-form-field-container-text-size, var(--mat-sys-body-large-size));\n  letter-spacing: var(--mat-form-field-container-text-tracking, var(--mat-sys-body-large-tracking));\n  font-weight: var(--mat-form-field-container-text-weight, var(--mat-sys-body-large-weight));\n}\n.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {\n  font-size: calc(var(--mat-form-field-outlined-label-text-populated-size) * var(--mat-mdc-form-field-floating-label-scale));\n}\n.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  font-size: var(--mat-form-field-outlined-label-text-populated-size);\n}\n[dir=rtl] .mat-mdc-form-field {\n  text-align: right;\n}\n\n.mat-mdc-form-field-flex {\n  display: inline-flex;\n  align-items: baseline;\n  box-sizing: border-box;\n  width: 100%;\n}\n\n.mat-mdc-text-field-wrapper {\n  width: 100%;\n  z-index: 0;\n}\n\n.mat-mdc-form-field-icon-prefix,\n.mat-mdc-form-field-icon-suffix {\n  align-self: center;\n  line-height: 0;\n  pointer-events: auto;\n  position: relative;\n  z-index: 1;\n}\n.mat-mdc-form-field-icon-prefix > .mat-icon,\n.mat-mdc-form-field-icon-suffix > .mat-icon {\n  padding: 0 12px;\n  box-sizing: content-box;\n}\n\n.mat-mdc-form-field-icon-prefix {\n  color: var(--mat-form-field-leading-icon-color, var(--mat-sys-on-surface-variant));\n}\n.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {\n  color: var(--mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n\n.mat-mdc-form-field-icon-suffix {\n  color: var(--mat-form-field-trailing-icon-color, var(--mat-sys-on-surface-variant));\n}\n.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {\n  color: var(--mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {\n  color: var(--mat-form-field-error-trailing-icon-color, var(--mat-sys-error));\n}\n.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {\n  color: var(--mat-form-field-error-hover-trailing-icon-color, var(--mat-sys-on-error-container));\n}\n.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {\n  color: var(--mat-form-field-error-focus-trailing-icon-color, var(--mat-sys-error));\n}\n\n.mat-mdc-form-field-icon-prefix,\n[dir=rtl] .mat-mdc-form-field-icon-suffix {\n  padding: 0 4px 0 0;\n}\n\n.mat-mdc-form-field-icon-suffix,\n[dir=rtl] .mat-mdc-form-field-icon-prefix {\n  padding: 0 0 0 4px;\n}\n\n.mat-mdc-form-field-subscript-wrapper .mat-icon,\n.mat-mdc-form-field label .mat-icon {\n  width: 1em;\n  height: 1em;\n  font-size: inherit;\n}\n\n.mat-mdc-form-field-infix {\n  flex: auto;\n  min-width: 0;\n  width: 180px;\n  position: relative;\n  box-sizing: border-box;\n}\n.mat-mdc-form-field-infix:has(textarea[cols]) {\n  width: auto;\n}\n\n.mat-mdc-form-field .mdc-notched-outline__notch {\n  margin-left: -1px;\n  -webkit-clip-path: inset(-9em -999em -9em 1px);\n  clip-path: inset(-9em -999em -9em 1px);\n}\n[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch {\n  margin-left: 0;\n  margin-right: -1px;\n  -webkit-clip-path: inset(-9em 1px -9em -999em);\n  clip-path: inset(-9em 1px -9em -999em);\n}\n\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label {\n  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input {\n  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder {\n  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder {\n  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder {\n  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder {\n  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder {\n  transition-delay: 40ms;\n  transition-duration: 110ms;\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {\n  transition-delay: 40ms;\n  transition-duration: 110ms;\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {\n  transition-delay: 40ms;\n  transition-duration: 110ms;\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {\n  transition-delay: 40ms;\n  transition-duration: 110ms;\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {\n  transition-duration: 75ms;\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after {\n  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,\n.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper {\n  animation-duration: 300ms;\n}\n\n.mdc-notched-outline .mdc-floating-label {\n  max-width: calc(100% + 1px);\n}\n\n.mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  max-width: calc(133.3333333333% + 1px);\n}\n'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormField, [{
    type: Component,
    args: [{
      selector: "mat-form-field",
      exportAs: "matFormField",
      host: {
        "class": "mat-mdc-form-field",
        "[class.mat-mdc-form-field-label-always-float]": "_shouldAlwaysFloat()",
        "[class.mat-mdc-form-field-has-icon-prefix]": "_hasIconPrefix",
        "[class.mat-mdc-form-field-has-icon-suffix]": "_hasIconSuffix",
        "[class.mat-form-field-invalid]": "_control.errorState",
        "[class.mat-form-field-disabled]": "_control.disabled",
        "[class.mat-form-field-autofilled]": "_control.autofilled",
        "[class.mat-form-field-appearance-fill]": 'appearance == "fill"',
        "[class.mat-form-field-appearance-outline]": 'appearance == "outline"',
        "[class.mat-form-field-hide-placeholder]": "_hasFloatingLabel() && !_shouldLabelFloat()",
        "[class.mat-primary]": 'color !== "accent" && color !== "warn"',
        "[class.mat-accent]": 'color === "accent"',
        "[class.mat-warn]": 'color === "warn"',
        "[class.ng-untouched]": '_shouldForward("untouched")',
        "[class.ng-touched]": '_shouldForward("touched")',
        "[class.ng-pristine]": '_shouldForward("pristine")',
        "[class.ng-dirty]": '_shouldForward("dirty")',
        "[class.ng-valid]": '_shouldForward("valid")',
        "[class.ng-invalid]": '_shouldForward("invalid")',
        "[class.ng-pending]": '_shouldForward("pending")'
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: MAT_FORM_FIELD,
        useExisting: MatFormField
      }, {
        provide: FLOATING_LABEL_PARENT,
        useExisting: MatFormField
      }],
      imports: [MatFormFieldFloatingLabel, MatFormFieldNotchedOutline, NgTemplateOutlet, MatFormFieldLineRipple, MatHint],
      template: '<ng-template #labelTemplate>\n  <!--\n    MDC recommends that the text-field is a `<label>` element. This rather complicates the\n    setup because it would require every form-field control to explicitly set `aria-labelledby`.\n    This is because the `<label>` itself contains more than the actual label (e.g. prefix, suffix\n    or other projected content), and screen readers could potentially read out undesired content.\n    Excluding elements from being printed out requires them to be marked with `aria-hidden`, or\n    the form control is set to a scoped element for the label (using `aria-labelledby`). Both of\n    these options seem to complicate the setup because we know exactly what content is rendered\n    as part of the label, and we don\'t want to spend resources on walking through projected content\n    to set `aria-hidden`. Nor do we want to set `aria-labelledby` on every form control if we could\n    simply link the label to the control using the label `for` attribute.\n  -->\n  @if (_hasFloatingLabel()) {\n    <label\n      matFormFieldFloatingLabel\n      [floating]="_shouldLabelFloat()"\n      [monitorResize]="_hasOutline()"\n      [id]="_labelId"\n      [attr.for]="_control.disableAutomaticLabeling ? null : _control.id"\n    >\n      <ng-content select="mat-label"></ng-content>\n      <!--\n        We set the required marker as a separate element, in order to make it easier to target if\n        apps want to override it and to be able to set `aria-hidden` so that screen readers don\'t\n        pick it up.\n       -->\n      @if (!hideRequiredMarker && _control.required) {\n        <span\n          aria-hidden="true"\n          class="mat-mdc-form-field-required-marker mdc-floating-label--required"\n        ></span>\n      }\n    </label>\n  }\n</ng-template>\n\n<div\n  class="mat-mdc-text-field-wrapper mdc-text-field"\n  #textField\n  [class.mdc-text-field--filled]="!_hasOutline()"\n  [class.mdc-text-field--outlined]="_hasOutline()"\n  [class.mdc-text-field--no-label]="!_hasFloatingLabel()"\n  [class.mdc-text-field--disabled]="_control.disabled"\n  [class.mdc-text-field--invalid]="_control.errorState"\n  (click)="_control.onContainerClick($event)"\n>\n  @if (!_hasOutline() && !_control.disabled) {\n    <div class="mat-mdc-form-field-focus-overlay"></div>\n  }\n  <div class="mat-mdc-form-field-flex">\n    @if (_hasOutline()) {\n      <div matFormFieldNotchedOutline [matFormFieldNotchedOutlineOpen]="_shouldLabelFloat()">\n        @if (!_forceDisplayInfixLabel()) {\n          <ng-template [ngTemplateOutlet]="labelTemplate"></ng-template>\n        }\n      </div>\n    }\n\n    @if (_hasIconPrefix) {\n      <div class="mat-mdc-form-field-icon-prefix" #iconPrefixContainer>\n        <ng-content select="[matPrefix], [matIconPrefix]"></ng-content>\n      </div>\n    }\n\n    @if (_hasTextPrefix) {\n      <div class="mat-mdc-form-field-text-prefix" #textPrefixContainer>\n        <ng-content select="[matTextPrefix]"></ng-content>\n      </div>\n    }\n\n    <div class="mat-mdc-form-field-infix">\n      @if (!_hasOutline() || _forceDisplayInfixLabel()) {\n        <ng-template [ngTemplateOutlet]="labelTemplate"></ng-template>\n      }\n\n      <ng-content></ng-content>\n    </div>\n\n    @if (_hasTextSuffix) {\n      <div class="mat-mdc-form-field-text-suffix" #textSuffixContainer>\n        <ng-content select="[matTextSuffix]"></ng-content>\n      </div>\n    }\n\n    @if (_hasIconSuffix) {\n      <div class="mat-mdc-form-field-icon-suffix" #iconSuffixContainer>\n        <ng-content select="[matSuffix], [matIconSuffix]"></ng-content>\n      </div>\n    }\n  </div>\n\n  @if (!_hasOutline()) {\n    <div matFormFieldLineRipple></div>\n  }\n</div>\n\n<div aria-atomic="true" aria-live="polite"\n  class="mat-mdc-form-field-subscript-wrapper mat-mdc-form-field-bottom-align"\n  [class.mat-mdc-form-field-subscript-dynamic-size]="subscriptSizing === \'dynamic\'"\n>\n  @let subscriptMessageType = _getSubscriptMessageType();\n\n  @switch (subscriptMessageType) {\n    @case (\'error\') {\n      <div class="mat-mdc-form-field-error-wrapper">\n        <ng-content select="mat-error, [matError]"></ng-content>\n      </div>\n    }\n\n    @case (\'hint\') {\n      <div class="mat-mdc-form-field-hint-wrapper">\n        @if (hintLabel) {\n          <mat-hint [id]="_hintLabelId">{{hintLabel}}</mat-hint>\n        }\n        <ng-content select="mat-hint:not([align=\'end\'])"></ng-content>\n        <div class="mat-mdc-form-field-hint-spacer"></div>\n        <ng-content select="mat-hint[align=\'end\']"></ng-content>\n      </div>\n    }\n  }\n</div>\n',
      styles: ['.mdc-text-field {\n  display: inline-flex;\n  align-items: baseline;\n  padding: 0 16px;\n  position: relative;\n  box-sizing: border-box;\n  overflow: hidden;\n  will-change: opacity, transform, color;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.mdc-text-field__input {\n  width: 100%;\n  min-width: 0;\n  border: none;\n  border-radius: 0;\n  background: none;\n  padding: 0;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  height: 28px;\n}\n.mdc-text-field__input::-webkit-calendar-picker-indicator, .mdc-text-field__input::-webkit-search-cancel-button {\n  display: none;\n}\n.mdc-text-field__input::-ms-clear {\n  display: none;\n}\n.mdc-text-field__input:focus {\n  outline: none;\n}\n.mdc-text-field__input:invalid {\n  box-shadow: none;\n}\n.mdc-text-field__input::placeholder {\n  opacity: 0;\n}\n.mdc-text-field__input::-moz-placeholder {\n  opacity: 0;\n}\n.mdc-text-field__input::-webkit-input-placeholder {\n  opacity: 0;\n}\n.mdc-text-field__input:-ms-input-placeholder {\n  opacity: 0;\n}\n.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mdc-text-field--focused .mdc-text-field__input::placeholder {\n  opacity: 1;\n}\n.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {\n  opacity: 1;\n}\n.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {\n  opacity: 1;\n}\n.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {\n  opacity: 1;\n}\n.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {\n  opacity: 0;\n}\n.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {\n  opacity: 0;\n}\n.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {\n  opacity: 0;\n}\n.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {\n  opacity: 0;\n}\n.mdc-text-field--outlined .mdc-text-field__input, .mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input {\n  height: 100%;\n}\n.mdc-text-field--outlined .mdc-text-field__input {\n  display: flex;\n  border: none !important;\n  background-color: transparent;\n}\n.mdc-text-field--disabled .mdc-text-field__input {\n  pointer-events: auto;\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input {\n  color: var(--mat-form-field-filled-input-text-color, var(--mat-sys-on-surface));\n  caret-color: var(--mat-form-field-filled-caret-color, var(--mat-sys-primary));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {\n  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {\n  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {\n  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {\n  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {\n  color: var(--mat-form-field-outlined-input-text-color, var(--mat-sys-on-surface));\n  caret-color: var(--mat-form-field-outlined-caret-color, var(--mat-sys-primary));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {\n  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {\n  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {\n  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {\n  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {\n  caret-color: var(--mat-form-field-filled-error-caret-color, var(--mat-sys-error));\n}\n.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {\n  caret-color: var(--mat-form-field-outlined-error-caret-color, var(--mat-sys-error));\n}\n.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {\n  color: var(--mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {\n  color: var(--mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n@media (forced-colors: active) {\n  .mdc-text-field--disabled .mdc-text-field__input {\n    background-color: Window;\n  }\n}\n\n.mdc-text-field--filled {\n  height: 56px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n  border-top-left-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));\n  border-top-right-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) {\n  background-color: var(--mat-form-field-filled-container-color, var(--mat-sys-surface-variant));\n}\n.mdc-text-field--filled.mdc-text-field--disabled {\n  background-color: var(--mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 4%, transparent));\n}\n\n.mdc-text-field--outlined {\n  height: 56px;\n  overflow: visible;\n  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));\n  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);\n}\n[dir=rtl] .mdc-text-field--outlined {\n  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);\n  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));\n}\n\n.mdc-floating-label {\n  position: absolute;\n  left: 0;\n  transform-origin: left top;\n  line-height: 1.15rem;\n  text-align: left;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  cursor: text;\n  overflow: hidden;\n  will-change: transform;\n}\n[dir=rtl] .mdc-floating-label {\n  right: 0;\n  left: auto;\n  transform-origin: right top;\n  text-align: right;\n}\n.mdc-text-field .mdc-floating-label {\n  top: 50%;\n  transform: translateY(-50%);\n  pointer-events: none;\n}\n.mdc-notched-outline .mdc-floating-label {\n  display: inline-block;\n  position: relative;\n  max-width: 100%;\n}\n.mdc-text-field--outlined .mdc-floating-label {\n  left: 4px;\n  right: auto;\n}\n[dir=rtl] .mdc-text-field--outlined .mdc-floating-label {\n  left: auto;\n  right: 4px;\n}\n.mdc-text-field--filled .mdc-floating-label {\n  left: 16px;\n  right: auto;\n}\n[dir=rtl] .mdc-text-field--filled .mdc-floating-label {\n  left: auto;\n  right: 16px;\n}\n.mdc-text-field--disabled .mdc-floating-label {\n  cursor: default;\n}\n@media (forced-colors: active) {\n  .mdc-text-field--disabled .mdc-floating-label {\n    z-index: 1;\n  }\n}\n.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label {\n  display: none;\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label {\n  color: var(--mat-form-field-filled-label-text-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {\n  color: var(--mat-form-field-filled-focus-label-text-color, var(--mat-sys-primary));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {\n  color: var(--mat-form-field-filled-hover-label-text-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {\n  color: var(--mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {\n  color: var(--mat-form-field-filled-error-label-text-color, var(--mat-sys-error));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {\n  color: var(--mat-form-field-filled-error-focus-label-text-color, var(--mat-sys-error));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {\n  color: var(--mat-form-field-filled-error-hover-label-text-color, var(--mat-sys-on-error-container));\n}\n.mdc-text-field--filled .mdc-floating-label {\n  font-family: var(--mat-form-field-filled-label-text-font, var(--mat-sys-body-large-font));\n  font-size: var(--mat-form-field-filled-label-text-size, var(--mat-sys-body-large-size));\n  font-weight: var(--mat-form-field-filled-label-text-weight, var(--mat-sys-body-large-weight));\n  letter-spacing: var(--mat-form-field-filled-label-text-tracking, var(--mat-sys-body-large-tracking));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label {\n  color: var(--mat-form-field-outlined-label-text-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {\n  color: var(--mat-form-field-outlined-focus-label-text-color, var(--mat-sys-primary));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {\n  color: var(--mat-form-field-outlined-hover-label-text-color, var(--mat-sys-on-surface));\n}\n.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {\n  color: var(--mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {\n  color: var(--mat-form-field-outlined-error-label-text-color, var(--mat-sys-error));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {\n  color: var(--mat-form-field-outlined-error-focus-label-text-color, var(--mat-sys-error));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {\n  color: var(--mat-form-field-outlined-error-hover-label-text-color, var(--mat-sys-on-error-container));\n}\n.mdc-text-field--outlined .mdc-floating-label {\n  font-family: var(--mat-form-field-outlined-label-text-font, var(--mat-sys-body-large-font));\n  font-size: var(--mat-form-field-outlined-label-text-size, var(--mat-sys-body-large-size));\n  font-weight: var(--mat-form-field-outlined-label-text-weight, var(--mat-sys-body-large-weight));\n  letter-spacing: var(--mat-form-field-outlined-label-text-tracking, var(--mat-sys-body-large-tracking));\n}\n\n.mdc-floating-label--float-above {\n  cursor: auto;\n  transform: translateY(-106%) scale(0.75);\n}\n.mdc-text-field--filled .mdc-floating-label--float-above {\n  transform: translateY(-106%) scale(0.75);\n}\n.mdc-text-field--outlined .mdc-floating-label--float-above {\n  transform: translateY(-37.25px) scale(1);\n  font-size: 0.75rem;\n}\n.mdc-notched-outline .mdc-floating-label--float-above {\n  text-overflow: clip;\n}\n.mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  max-width: 133.3333333333%;\n}\n.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  transform: translateY(-34.75px) scale(0.75);\n}\n.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  font-size: 1rem;\n}\n\n.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {\n  margin-left: 1px;\n  margin-right: 0;\n  content: "*";\n}\n[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {\n  margin-left: 0;\n  margin-right: 1px;\n}\n\n.mdc-notched-outline {\n  display: flex;\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  box-sizing: border-box;\n  width: 100%;\n  max-width: 100%;\n  height: 100%;\n  text-align: left;\n  pointer-events: none;\n}\n[dir=rtl] .mdc-notched-outline {\n  text-align: right;\n}\n.mdc-text-field--outlined .mdc-notched-outline {\n  z-index: 1;\n}\n\n.mat-mdc-notch-piece {\n  box-sizing: border-box;\n  height: 100%;\n  pointer-events: none;\n  border: none;\n  border-top: 1px solid;\n  border-bottom: 1px solid;\n}\n.mdc-text-field--focused .mat-mdc-notch-piece {\n  border-width: 2px;\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {\n  border-color: var(--mat-form-field-outlined-outline-color, var(--mat-sys-outline));\n  border-width: var(--mat-form-field-outlined-outline-width, 1px);\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {\n  border-color: var(--mat-form-field-outlined-hover-outline-color, var(--mat-sys-on-surface));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {\n  border-color: var(--mat-form-field-outlined-focus-outline-color, var(--mat-sys-primary));\n}\n.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {\n  border-color: var(--mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {\n  border-color: var(--mat-form-field-outlined-error-outline-color, var(--mat-sys-error));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {\n  border-color: var(--mat-form-field-outlined-error-hover-outline-color, var(--mat-sys-on-error-container));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {\n  border-color: var(--mat-form-field-outlined-error-focus-outline-color, var(--mat-sys-error));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {\n  border-width: var(--mat-form-field-outlined-focus-outline-width, 2px);\n}\n\n.mdc-notched-outline__leading {\n  border-left: 1px solid;\n  border-right: none;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n}\n.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {\n  width: max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));\n}\n[dir=rtl] .mdc-notched-outline__leading {\n  border-left: none;\n  border-right: 1px solid;\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n}\n\n.mdc-notched-outline__trailing {\n  flex-grow: 1;\n  border-left: none;\n  border-right: 1px solid;\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n}\n[dir=rtl] .mdc-notched-outline__trailing {\n  border-left: 1px solid;\n  border-right: none;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n}\n\n.mdc-notched-outline__notch {\n  flex: 0 0 auto;\n  width: auto;\n}\n.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {\n  max-width: min(var(--mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));\n}\n.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {\n  max-width: min(100%, calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));\n}\n.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {\n  padding-top: 1px;\n}\n.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {\n  padding-top: 2px;\n}\n.mdc-notched-outline--notched .mdc-notched-outline__notch {\n  padding-left: 0;\n  padding-right: 8px;\n  border-top: none;\n}\n[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch {\n  padding-left: 8px;\n  padding-right: 0;\n}\n.mdc-notched-outline--no-label .mdc-notched-outline__notch {\n  display: none;\n}\n\n.mdc-line-ripple::before, .mdc-line-ripple::after {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  border-bottom-style: solid;\n  content: "";\n}\n.mdc-line-ripple::before {\n  z-index: 1;\n  border-bottom-width: var(--mat-form-field-filled-active-indicator-height, 1px);\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {\n  border-bottom-color: var(--mat-form-field-filled-active-indicator-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {\n  border-bottom-color: var(--mat-form-field-filled-hover-active-indicator-color, var(--mat-sys-on-surface));\n}\n.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {\n  border-bottom-color: var(--mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {\n  border-bottom-color: var(--mat-form-field-filled-error-active-indicator-color, var(--mat-sys-error));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {\n  border-bottom-color: var(--mat-form-field-filled-error-hover-active-indicator-color, var(--mat-sys-on-error-container));\n}\n.mdc-line-ripple::after {\n  transform: scaleX(0);\n  opacity: 0;\n  z-index: 2;\n}\n.mdc-text-field--filled .mdc-line-ripple::after {\n  border-bottom-width: var(--mat-form-field-filled-focus-active-indicator-height, 2px);\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {\n  border-bottom-color: var(--mat-form-field-filled-focus-active-indicator-color, var(--mat-sys-primary));\n}\n.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {\n  border-bottom-color: var(--mat-form-field-filled-error-focus-active-indicator-color, var(--mat-sys-error));\n}\n\n.mdc-line-ripple--active::after {\n  transform: scaleX(1);\n  opacity: 1;\n}\n\n.mdc-line-ripple--deactivating::after {\n  opacity: 0;\n}\n\n.mdc-text-field--disabled {\n  pointer-events: none;\n}\n\n.mat-mdc-form-field-textarea-control {\n  vertical-align: middle;\n  resize: vertical;\n  box-sizing: border-box;\n  height: auto;\n  margin: 0;\n  padding: 0;\n  border: none;\n  overflow: auto;\n}\n\n.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font: inherit;\n  letter-spacing: inherit;\n  text-decoration: inherit;\n  text-transform: inherit;\n  border: none;\n}\n\n.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  line-height: normal;\n  pointer-events: all;\n  will-change: auto;\n}\n\n.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label {\n  cursor: inherit;\n}\n\n.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,\n.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control {\n  height: auto;\n}\n\n.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color] {\n  height: 23px;\n}\n\n.mat-mdc-text-field-wrapper {\n  height: auto;\n  flex: auto;\n  will-change: auto;\n}\n\n.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {\n  padding-left: 0;\n  --mat-mdc-form-field-label-offset-x: -16px;\n}\n\n.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {\n  padding-right: 0;\n}\n\n[dir=rtl] .mat-mdc-text-field-wrapper {\n  padding-left: 16px;\n  padding-right: 16px;\n}\n[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {\n  padding-left: 0;\n}\n[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {\n  padding-right: 0;\n}\n\n.mat-form-field-disabled .mdc-text-field__input::placeholder {\n  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {\n  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {\n  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {\n  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n\n.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder {\n  transition-delay: 40ms;\n  transition-duration: 110ms;\n  opacity: 1;\n}\n\n.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label {\n  left: auto;\n  right: auto;\n}\n\n.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input {\n  display: inline-block;\n}\n\n.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch {\n  padding-top: 0;\n}\n\n.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {\n  border-left: 1px solid transparent;\n}\n\n[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {\n  border-left: none;\n  border-right: 1px solid transparent;\n}\n\n.mat-mdc-form-field-infix {\n  min-height: var(--mat-form-field-container-height, 56px);\n  padding-top: var(--mat-form-field-filled-with-label-container-padding-top, 24px);\n  padding-bottom: var(--mat-form-field-filled-with-label-container-padding-bottom, 8px);\n}\n.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {\n  padding-top: var(--mat-form-field-container-vertical-padding, 16px);\n  padding-bottom: var(--mat-form-field-container-vertical-padding, 16px);\n}\n\n.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {\n  top: calc(var(--mat-form-field-container-height, 56px) / 2);\n}\n\n.mdc-text-field--filled .mat-mdc-floating-label {\n  display: var(--mat-form-field-filled-label-display, block);\n}\n\n.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  --mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--mat-form-field-container-height, 56px) / 2) * -1))\n    scale(var(--mat-mdc-form-field-floating-label-scale, 0.75));\n  transform: var(--mat-mdc-form-field-label-transform);\n}\n\n@keyframes _mat-form-field-subscript-animation {\n  from {\n    opacity: 0;\n    transform: translateY(-5px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.mat-mdc-form-field-subscript-wrapper {\n  box-sizing: border-box;\n  width: 100%;\n  position: relative;\n}\n\n.mat-mdc-form-field-hint-wrapper,\n.mat-mdc-form-field-error-wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  padding: 0 16px;\n  opacity: 1;\n  transform: translateY(0);\n  animation: _mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2);\n}\n\n.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,\n.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper {\n  position: static;\n}\n\n.mat-mdc-form-field-bottom-align::before {\n  content: "";\n  display: inline-block;\n  height: 16px;\n}\n\n.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before {\n  content: unset;\n}\n\n.mat-mdc-form-field-hint-end {\n  order: 1;\n}\n\n.mat-mdc-form-field-hint-wrapper {\n  display: flex;\n}\n\n.mat-mdc-form-field-hint-spacer {\n  flex: 1 0 1em;\n}\n\n.mat-mdc-form-field-error {\n  display: block;\n  color: var(--mat-form-field-error-text-color, var(--mat-sys-error));\n}\n\n.mat-mdc-form-field-subscript-wrapper,\n.mat-mdc-form-field-bottom-align::before {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-family: var(--mat-form-field-subscript-text-font, var(--mat-sys-body-small-font));\n  line-height: var(--mat-form-field-subscript-text-line-height, var(--mat-sys-body-small-line-height));\n  font-size: var(--mat-form-field-subscript-text-size, var(--mat-sys-body-small-size));\n  letter-spacing: var(--mat-form-field-subscript-text-tracking, var(--mat-sys-body-small-tracking));\n  font-weight: var(--mat-form-field-subscript-text-weight, var(--mat-sys-body-small-weight));\n}\n\n.mat-mdc-form-field-focus-overlay {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  opacity: 0;\n  pointer-events: none;\n  background-color: var(--mat-form-field-state-layer-color, var(--mat-sys-on-surface));\n}\n.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {\n  opacity: var(--mat-form-field-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {\n  opacity: var(--mat-form-field-focus-state-layer-opacity, 0);\n}\n\nselect.mat-mdc-form-field-input-control {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  background-color: transparent;\n  display: inline-flex;\n  box-sizing: border-box;\n}\nselect.mat-mdc-form-field-input-control:not(:disabled) {\n  cursor: pointer;\n}\nselect.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option {\n  color: var(--mat-form-field-select-option-text-color, var(--mat-sys-neutral10));\n}\nselect.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {\n  color: var(--mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--mat-sys-neutral10) 38%, transparent));\n}\n\n.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {\n  content: "";\n  width: 0;\n  height: 0;\n  border-left: 5px solid transparent;\n  border-right: 5px solid transparent;\n  border-top: 5px solid;\n  position: absolute;\n  right: 0;\n  top: 50%;\n  margin-top: -2.5px;\n  pointer-events: none;\n  color: var(--mat-form-field-enabled-select-arrow-color, var(--mat-sys-on-surface-variant));\n}\n[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {\n  right: auto;\n  left: 0;\n}\n.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {\n  color: var(--mat-form-field-focus-select-arrow-color, var(--mat-sys-primary));\n}\n.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {\n  color: var(--mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {\n  padding-right: 15px;\n}\n[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {\n  padding-right: 0;\n  padding-left: 15px;\n}\n\n@media (forced-colors: active) {\n  .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper {\n    outline: solid 1px;\n  }\n}\n@media (forced-colors: active) {\n  .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper {\n    outline-color: GrayText;\n  }\n}\n\n@media (forced-colors: active) {\n  .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper {\n    outline: dashed 3px;\n  }\n}\n\n@media (forced-colors: active) {\n  .mat-mdc-form-field.mat-focused .mdc-notched-outline {\n    border: dashed 3px;\n  }\n}\n\n.mat-mdc-form-field-input-control[type=date], .mat-mdc-form-field-input-control[type=datetime], .mat-mdc-form-field-input-control[type=datetime-local], .mat-mdc-form-field-input-control[type=month], .mat-mdc-form-field-input-control[type=week], .mat-mdc-form-field-input-control[type=time] {\n  line-height: 1;\n}\n.mat-mdc-form-field-input-control::-webkit-datetime-edit {\n  line-height: 1;\n  padding: 0;\n  margin-bottom: -2px;\n}\n\n.mat-mdc-form-field {\n  --mat-mdc-form-field-floating-label-scale: 0.75;\n  display: inline-flex;\n  flex-direction: column;\n  min-width: 0;\n  text-align: left;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-family: var(--mat-form-field-container-text-font, var(--mat-sys-body-large-font));\n  line-height: var(--mat-form-field-container-text-line-height, var(--mat-sys-body-large-line-height));\n  font-size: var(--mat-form-field-container-text-size, var(--mat-sys-body-large-size));\n  letter-spacing: var(--mat-form-field-container-text-tracking, var(--mat-sys-body-large-tracking));\n  font-weight: var(--mat-form-field-container-text-weight, var(--mat-sys-body-large-weight));\n}\n.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {\n  font-size: calc(var(--mat-form-field-outlined-label-text-populated-size) * var(--mat-mdc-form-field-floating-label-scale));\n}\n.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  font-size: var(--mat-form-field-outlined-label-text-populated-size);\n}\n[dir=rtl] .mat-mdc-form-field {\n  text-align: right;\n}\n\n.mat-mdc-form-field-flex {\n  display: inline-flex;\n  align-items: baseline;\n  box-sizing: border-box;\n  width: 100%;\n}\n\n.mat-mdc-text-field-wrapper {\n  width: 100%;\n  z-index: 0;\n}\n\n.mat-mdc-form-field-icon-prefix,\n.mat-mdc-form-field-icon-suffix {\n  align-self: center;\n  line-height: 0;\n  pointer-events: auto;\n  position: relative;\n  z-index: 1;\n}\n.mat-mdc-form-field-icon-prefix > .mat-icon,\n.mat-mdc-form-field-icon-suffix > .mat-icon {\n  padding: 0 12px;\n  box-sizing: content-box;\n}\n\n.mat-mdc-form-field-icon-prefix {\n  color: var(--mat-form-field-leading-icon-color, var(--mat-sys-on-surface-variant));\n}\n.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {\n  color: var(--mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n\n.mat-mdc-form-field-icon-suffix {\n  color: var(--mat-form-field-trailing-icon-color, var(--mat-sys-on-surface-variant));\n}\n.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {\n  color: var(--mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {\n  color: var(--mat-form-field-error-trailing-icon-color, var(--mat-sys-error));\n}\n.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {\n  color: var(--mat-form-field-error-hover-trailing-icon-color, var(--mat-sys-on-error-container));\n}\n.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {\n  color: var(--mat-form-field-error-focus-trailing-icon-color, var(--mat-sys-error));\n}\n\n.mat-mdc-form-field-icon-prefix,\n[dir=rtl] .mat-mdc-form-field-icon-suffix {\n  padding: 0 4px 0 0;\n}\n\n.mat-mdc-form-field-icon-suffix,\n[dir=rtl] .mat-mdc-form-field-icon-prefix {\n  padding: 0 0 0 4px;\n}\n\n.mat-mdc-form-field-subscript-wrapper .mat-icon,\n.mat-mdc-form-field label .mat-icon {\n  width: 1em;\n  height: 1em;\n  font-size: inherit;\n}\n\n.mat-mdc-form-field-infix {\n  flex: auto;\n  min-width: 0;\n  width: 180px;\n  position: relative;\n  box-sizing: border-box;\n}\n.mat-mdc-form-field-infix:has(textarea[cols]) {\n  width: auto;\n}\n\n.mat-mdc-form-field .mdc-notched-outline__notch {\n  margin-left: -1px;\n  -webkit-clip-path: inset(-9em -999em -9em 1px);\n  clip-path: inset(-9em -999em -9em 1px);\n}\n[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch {\n  margin-left: 0;\n  margin-right: -1px;\n  -webkit-clip-path: inset(-9em 1px -9em -999em);\n  clip-path: inset(-9em 1px -9em -999em);\n}\n\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label {\n  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input {\n  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder {\n  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder {\n  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder {\n  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder {\n  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder {\n  transition-delay: 40ms;\n  transition-duration: 110ms;\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {\n  transition-delay: 40ms;\n  transition-duration: 110ms;\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {\n  transition-delay: 40ms;\n  transition-duration: 110ms;\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {\n  transition-delay: 40ms;\n  transition-duration: 110ms;\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {\n  transition-duration: 75ms;\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after {\n  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,\n.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper {\n  animation-duration: 300ms;\n}\n\n.mdc-notched-outline .mdc-floating-label {\n  max-width: calc(100% + 1px);\n}\n\n.mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  max-width: calc(133.3333333333% + 1px);\n}\n']
    }]
  }], () => [], {
    _textField: [{
      type: ViewChild,
      args: ["textField"]
    }],
    _iconPrefixContainer: [{
      type: ViewChild,
      args: ["iconPrefixContainer"]
    }],
    _textPrefixContainer: [{
      type: ViewChild,
      args: ["textPrefixContainer"]
    }],
    _iconSuffixContainer: [{
      type: ViewChild,
      args: ["iconSuffixContainer"]
    }],
    _textSuffixContainer: [{
      type: ViewChild,
      args: ["textSuffixContainer"]
    }],
    _floatingLabel: [{
      type: ViewChild,
      args: [MatFormFieldFloatingLabel]
    }],
    _notchedOutline: [{
      type: ViewChild,
      args: [MatFormFieldNotchedOutline]
    }],
    _lineRipple: [{
      type: ViewChild,
      args: [MatFormFieldLineRipple]
    }],
    _iconPrefixContainerSignal: [{
      type: ViewChild,
      args: ["iconPrefixContainer", {
        isSignal: true
      }]
    }],
    _textPrefixContainerSignal: [{
      type: ViewChild,
      args: ["textPrefixContainer", {
        isSignal: true
      }]
    }],
    _iconSuffixContainerSignal: [{
      type: ViewChild,
      args: ["iconSuffixContainer", {
        isSignal: true
      }]
    }],
    _textSuffixContainerSignal: [{
      type: ViewChild,
      args: ["textSuffixContainer", {
        isSignal: true
      }]
    }],
    _formFieldControl: [{
      type: ContentChild,
      args: [MatFormFieldControl]
    }],
    _prefixChildren: [{
      type: ContentChildren,
      args: [MAT_PREFIX, {
        descendants: true
      }]
    }],
    _suffixChildren: [{
      type: ContentChildren,
      args: [MAT_SUFFIX, {
        descendants: true
      }]
    }],
    _errorChildren: [{
      type: ContentChildren,
      args: [MAT_ERROR, {
        descendants: true
      }]
    }],
    _hintChildren: [{
      type: ContentChildren,
      args: [MatHint, {
        descendants: true
      }]
    }],
    _labelChild: [{
      type: ContentChild,
      args: [forwardRef(() => MatLabel), {
        isSignal: true
      }]
    }],
    hideRequiredMarker: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    floatLabel: [{
      type: Input
    }],
    appearance: [{
      type: Input
    }],
    subscriptSizing: [{
      type: Input
    }],
    hintLabel: [{
      type: Input
    }]
  });
})();

// node_modules/@angular/material/fesm2022/chips.mjs
var _c02 = ["*", [["mat-chip-avatar"], ["", "matChipAvatar", ""]], [["mat-chip-trailing-icon"], ["", "matChipRemove", ""], ["", "matChipTrailingIcon", ""]]];
var _c12 = ["*", "mat-chip-avatar, [matChipAvatar]", "mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"];
function MatChip_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 3);
    ɵɵprojection(1, 1);
    ɵɵelementEnd();
  }
}
function MatChip_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 6);
    ɵɵprojection(1, 2);
    ɵɵelementEnd();
  }
}
function MatChipOption_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 3);
    ɵɵprojection(1, 1);
    ɵɵelementStart(2, "span", 7);
    ɵɵnamespaceSVG();
    ɵɵelementStart(3, "svg", 8);
    ɵɵelement(4, "path", 9);
    ɵɵelementEnd()()();
  }
}
function MatChipOption_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 6);
    ɵɵprojection(1, 2);
    ɵɵelementEnd();
  }
}
var _c22 = '.mdc-evolution-chip,\n.mdc-evolution-chip__cell,\n.mdc-evolution-chip__action {\n  display: inline-flex;\n  align-items: center;\n}\n\n.mdc-evolution-chip {\n  position: relative;\n  max-width: 100%;\n}\n\n.mdc-evolution-chip__cell,\n.mdc-evolution-chip__action {\n  height: 100%;\n}\n\n.mdc-evolution-chip__cell--primary {\n  flex-basis: 100%;\n  overflow-x: hidden;\n}\n\n.mdc-evolution-chip__cell--trailing {\n  flex: 1 0 auto;\n}\n\n.mdc-evolution-chip__action {\n  align-items: center;\n  background: none;\n  border: none;\n  box-sizing: content-box;\n  cursor: pointer;\n  display: inline-flex;\n  justify-content: center;\n  outline: none;\n  padding: 0;\n  text-decoration: none;\n  color: inherit;\n}\n\n.mdc-evolution-chip__action--presentational {\n  cursor: auto;\n}\n\n.mdc-evolution-chip--disabled,\n.mdc-evolution-chip__action:disabled {\n  pointer-events: none;\n}\n@media (forced-colors: active) {\n  .mdc-evolution-chip--disabled,\n  .mdc-evolution-chip__action:disabled {\n    forced-color-adjust: none;\n  }\n}\n\n.mdc-evolution-chip__action--primary {\n  font: inherit;\n  letter-spacing: inherit;\n  white-space: inherit;\n  overflow-x: hidden;\n}\n.mat-mdc-standard-chip .mdc-evolution-chip__action--primary::before {\n  border-width: var(--mat-chip-outline-width, 1px);\n  border-radius: var(--mat-chip-container-shape-radius, 8px);\n  box-sizing: border-box;\n  content: "";\n  height: 100%;\n  left: 0;\n  position: absolute;\n  pointer-events: none;\n  top: 0;\n  width: 100%;\n  z-index: 1;\n  border-style: solid;\n}\n.mat-mdc-standard-chip .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 12px;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 12px;\n}\n[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 0;\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--primary::before {\n  border-color: var(--mat-chip-outline-color, var(--mat-sys-outline));\n}\n.mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus::before {\n  border-color: var(--mat-chip-focus-outline-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--primary::before {\n  border-color: var(--mat-chip-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary::before {\n  border-width: var(--mat-chip-flat-selected-outline-width, 0);\n}\n.mat-mdc-basic-chip .mdc-evolution-chip__action--primary {\n  font: inherit;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 12px;\n}\n[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 0;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 0;\n}\n[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 12px;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 12px;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 0;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.mdc-evolution-chip__action--secondary {\n  position: relative;\n  overflow: visible;\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--secondary {\n  color: var(--mat-chip-with-trailing-icon-trailing-icon-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--secondary {\n  color: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-color, var(--mat-sys-on-surface));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n\n.mdc-evolution-chip__text-label {\n  -webkit-user-select: none;\n  user-select: none;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.mat-mdc-standard-chip .mdc-evolution-chip__text-label {\n  font-family: var(--mat-chip-label-text-font, var(--mat-sys-label-large-font));\n  line-height: var(--mat-chip-label-text-line-height, var(--mat-sys-label-large-line-height));\n  font-size: var(--mat-chip-label-text-size, var(--mat-sys-label-large-size));\n  font-weight: var(--mat-chip-label-text-weight, var(--mat-sys-label-large-weight));\n  letter-spacing: var(--mat-chip-label-text-tracking, var(--mat-sys-label-large-tracking));\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {\n  color: var(--mat-chip-label-text-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {\n  color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label, .mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label {\n  color: var(--mat-chip-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n\n.mdc-evolution-chip__graphic {\n  align-items: center;\n  display: inline-flex;\n  justify-content: center;\n  overflow: hidden;\n  pointer-events: none;\n  position: relative;\n  flex: 1 0 auto;\n}\n.mat-mdc-standard-chip .mdc-evolution-chip__graphic {\n  width: var(--mat-chip-with-avatar-avatar-size, 24px);\n  height: var(--mat-chip-with-avatar-avatar-size, 24px);\n  font-size: var(--mat-chip-with-avatar-avatar-size, 24px);\n}\n.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic {\n  transition: width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic {\n  width: 0;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {\n  padding-left: 6px;\n  padding-right: 6px;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {\n  padding-left: 4px;\n  padding-right: 8px;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {\n  padding-left: 8px;\n  padding-right: 4px;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {\n  padding-left: 6px;\n  padding-right: 6px;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {\n  padding-left: 4px;\n  padding-right: 8px;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {\n  padding-left: 8px;\n  padding-right: 4px;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__graphic {\n  padding-left: 0;\n}\n\n.mdc-evolution-chip__checkmark {\n  position: absolute;\n  opacity: 0;\n  top: 50%;\n  left: 50%;\n  height: 20px;\n  width: 20px;\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark {\n  color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark {\n  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));\n}\n.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark {\n  transition: transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);\n  transform: translate(-75%, -50%);\n}\n.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {\n  transform: translate(-50%, -50%);\n  opacity: 1;\n}\n\n.mdc-evolution-chip__checkmark-svg {\n  display: block;\n}\n\n.mdc-evolution-chip__checkmark-path {\n  stroke-width: 2px;\n  stroke-dasharray: 29.7833385;\n  stroke-dashoffset: 29.7833385;\n  stroke: currentColor;\n}\n.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path {\n  transition: stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path {\n  stroke-dashoffset: 0;\n}\n@media (forced-colors: active) {\n  .mdc-evolution-chip__checkmark-path {\n    stroke: CanvasText !important;\n  }\n}\n\n.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing {\n  height: 18px;\n  width: 18px;\n  font-size: 18px;\n}\n.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove {\n  opacity: calc(var(--mat-chip-trailing-action-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));\n}\n.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove:focus {\n  opacity: calc(var(--mat-chip-trailing-action-focus-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));\n}\n\n.mat-mdc-standard-chip {\n  border-radius: var(--mat-chip-container-shape-radius, 8px);\n  height: var(--mat-chip-container-height, 32px);\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) {\n  background-color: var(--mat-chip-elevated-container-color, transparent);\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled {\n  background-color: var(--mat-chip-elevated-disabled-container-color);\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) {\n  background-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled {\n  background-color: var(--mat-chip-flat-disabled-selected-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n@media (forced-colors: active) {\n  .mat-mdc-standard-chip {\n    outline: solid 1px;\n  }\n}\n\n.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary {\n  border-radius: var(--mat-chip-with-avatar-avatar-shape-radius, 24px);\n  width: var(--mat-chip-with-icon-icon-size, 18px);\n  height: var(--mat-chip-with-icon-icon-size, 18px);\n  font-size: var(--mat-chip-with-icon-icon-size, 18px);\n}\n.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary {\n  opacity: 0;\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary {\n  color: var(--mat-chip-with-icon-icon-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary {\n  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));\n}\n\n.mat-mdc-chip-highlighted {\n  --mat-chip-with-icon-icon-color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));\n  --mat-chip-elevated-container-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));\n  --mat-chip-label-text-color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));\n  --mat-chip-outline-width: var(--mat-chip-flat-selected-outline-width, 0);\n}\n\n.mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-chip-selected .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-hover-state-layer-color, var(--mat-sys-on-surface-variant));\n  opacity: var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-chip-focus-overlay .mat-mdc-chip-selected:hover, .mat-mdc-chip-highlighted:hover .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-selected-hover-state-layer-color, var(--mat-sys-on-secondary-container));\n  opacity: var(--mat-chip-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));\n  opacity: var(--mat-chip-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-chip-selected.cdk-focused .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted.cdk-focused .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));\n  opacity: var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n\n.mdc-evolution-chip--disabled:not(.mdc-evolution-chip--selected) .mat-mdc-chip-avatar {\n  opacity: var(--mat-chip-with-avatar-disabled-avatar-opacity, 0.38);\n}\n\n.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {\n  opacity: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38);\n}\n\n.mdc-evolution-chip--disabled.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {\n  opacity: var(--mat-chip-with-icon-disabled-icon-opacity, 0.38);\n}\n\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled {\n  opacity: var(--mat-chip-disabled-container-opacity, 1);\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted .mdc-evolution-chip__icon--trailing {\n  color: var(--mat-chip-selected-trailing-icon-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {\n  color: var(--mat-chip-selected-disabled-trailing-icon-color, var(--mat-sys-on-surface));\n}\n\n.mat-mdc-chip-edit, .mat-mdc-chip-remove {\n  opacity: var(--mat-chip-trailing-action-opacity, 1);\n}\n.mat-mdc-chip-edit:focus, .mat-mdc-chip-remove:focus {\n  opacity: var(--mat-chip-trailing-action-focus-opacity, 1);\n}\n.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {\n  background-color: var(--mat-chip-trailing-action-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-chip-edit:hover::after, .mat-mdc-chip-remove:hover::after {\n  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));\n}\n.mat-mdc-chip-edit:focus::after, .mat-mdc-chip-remove:focus::after {\n  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));\n}\n\n.mat-mdc-chip-selected .mat-mdc-chip-remove::after,\n.mat-mdc-chip-highlighted .mat-mdc-chip-remove::after {\n  background-color: var(--mat-chip-selected-trailing-action-state-layer-color, var(--mat-sys-on-secondary-container));\n}\n\n.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:focus::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:focus::after {\n  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));\n}\n.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:hover::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:hover::after {\n  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));\n}\n\n.mat-mdc-standard-chip {\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-standard-chip .mat-mdc-chip-graphic,\n.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon {\n  box-sizing: content-box;\n}\n.mat-mdc-standard-chip._mat-animation-noopable,\n.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,\n.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,\n.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path {\n  transition-duration: 1ms;\n  animation-duration: 1ms;\n}\n\n.mat-mdc-chip-focus-overlay {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  opacity: 0;\n  border-radius: inherit;\n  transition: opacity 150ms linear;\n}\n._mat-animation-noopable .mat-mdc-chip-focus-overlay {\n  transition: none;\n}\n.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay {\n  display: none;\n}\n\n.mat-mdc-chip .mat-ripple.mat-mdc-chip-ripple {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n\n.mat-mdc-chip-avatar {\n  text-align: center;\n  line-height: 1;\n  color: var(--mat-chip-with-icon-icon-color, currentColor);\n}\n\n.mat-mdc-chip {\n  position: relative;\n  z-index: 0;\n}\n\n.mat-mdc-chip-action-label {\n  text-align: left;\n  z-index: 1;\n}\n[dir=rtl] .mat-mdc-chip-action-label {\n  text-align: right;\n}\n.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label {\n  position: relative;\n}\n.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  pointer-events: none;\n}\n.mat-mdc-chip-action-label .mat-focus-indicator::before {\n  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);\n}\n\n.mat-mdc-chip-edit::before, .mat-mdc-chip-remove::before {\n  margin: calc(var(--mat-focus-indicator-border-width, 3px) * -1);\n  left: 8px;\n  right: 8px;\n}\n.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {\n  content: "";\n  display: block;\n  opacity: 0;\n  position: absolute;\n  top: -3px;\n  bottom: -3px;\n  left: 5px;\n  right: 5px;\n  border-radius: 50%;\n  box-sizing: border-box;\n  padding: 12px;\n  margin: -12px;\n  background-clip: content-box;\n}\n.mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {\n  width: 18px;\n  height: 18px;\n  font-size: 18px;\n  box-sizing: content-box;\n}\n\n.mat-chip-edit-input {\n  cursor: text;\n  display: inline-block;\n  color: inherit;\n  outline: 0;\n}\n\n@media (forced-colors: active) {\n  .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple) {\n    outline-width: 3px;\n  }\n}\n\n.mat-mdc-chip-action:focus-visible .mat-focus-indicator::before {\n  content: "";\n}\n\n.mdc-evolution-chip__icon, .mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {\n  min-height: fit-content;\n}\n\nimg.mdc-evolution-chip__icon {\n  min-height: 0;\n}\n';
var _c32 = [[["", "matChipEdit", ""]], [["mat-chip-avatar"], ["", "matChipAvatar", ""]], [["", "matChipEditInput", ""]], "*", [["mat-chip-trailing-icon"], ["", "matChipRemove", ""], ["", "matChipTrailingIcon", ""]]];
var _c42 = ["[matChipEdit]", "mat-chip-avatar, [matChipAvatar]", "[matChipEditInput]", "*", "mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"];
function MatChipRow_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 0);
  }
}
function MatChipRow_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 1);
    ɵɵprojection(1);
    ɵɵelementEnd();
  }
}
function MatChipRow_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 3);
    ɵɵprojection(1, 1);
    ɵɵelementEnd();
  }
}
function MatChipRow_Conditional_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 2);
  }
}
function MatChipRow_Conditional_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 7);
  }
}
function MatChipRow_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, MatChipRow_Conditional_5_Conditional_0_Template, 1, 0)(1, MatChipRow_Conditional_5_Conditional_1_Template, 1, 0, "span", 7);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵconditional(ctx_r0.contentEditInput ? 0 : 1);
  }
}
function MatChipRow_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 3);
  }
}
function MatChipRow_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 6);
    ɵɵprojection(1, 4);
    ɵɵelementEnd();
  }
}
var _c52 = ["*"];
var _c62 = ".mat-mdc-chip-set {\n  display: flex;\n}\n.mat-mdc-chip-set:focus {\n  outline: none;\n}\n.mat-mdc-chip-set .mdc-evolution-chip-set__chips {\n  min-width: 100%;\n  margin-left: -8px;\n  margin-right: 0;\n}\n.mat-mdc-chip-set .mdc-evolution-chip {\n  margin: 4px 0 4px 8px;\n}\n[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip-set__chips {\n  margin-left: 0;\n  margin-right: -8px;\n}\n[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip {\n  margin-left: 0;\n  margin-right: 8px;\n}\n\n.mdc-evolution-chip-set__chips {\n  display: flex;\n  flex-flow: wrap;\n  min-width: 0;\n}\n\n.mat-mdc-chip-set-stacked {\n  flex-direction: column;\n  align-items: flex-start;\n}\n.mat-mdc-chip-set-stacked .mat-mdc-chip {\n  width: 100%;\n}\n.mat-mdc-chip-set-stacked .mdc-evolution-chip__graphic {\n  flex-grow: 0;\n}\n.mat-mdc-chip-set-stacked .mdc-evolution-chip__action--primary {\n  flex-basis: 100%;\n  justify-content: start;\n}\n\ninput.mat-mdc-chip-input {\n  flex: 1 0 150px;\n  margin-left: 8px;\n}\n[dir=rtl] input.mat-mdc-chip-input {\n  margin-left: 0;\n  margin-right: 8px;\n}\n.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::placeholder {\n  opacity: 1;\n}\n.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-moz-placeholder {\n  opacity: 1;\n}\n.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-webkit-input-placeholder {\n  opacity: 1;\n}\n.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input:-ms-input-placeholder {\n  opacity: 1;\n}\n.mat-mdc-chip-set + input.mat-mdc-chip-input {\n  margin-left: 0;\n  margin-right: 0;\n}\n";
var MAT_CHIPS_DEFAULT_OPTIONS = new InjectionToken("mat-chips-default-options", {
  providedIn: "root",
  factory: () => ({
    separatorKeyCodes: [ENTER]
  })
});
var MAT_CHIP_AVATAR = new InjectionToken("MatChipAvatar");
var MAT_CHIP_TRAILING_ICON = new InjectionToken("MatChipTrailingIcon");
var MAT_CHIP_EDIT = new InjectionToken("MatChipEdit");
var MAT_CHIP_REMOVE = new InjectionToken("MatChipRemove");
var MAT_CHIP = new InjectionToken("MatChip");
var MatChipContent = class _MatChipContent {
  _elementRef = inject(ElementRef);
  _parentChip = inject(MAT_CHIP);
  _isPrimary = true;
  _isLeading = false;
  get disabled() {
    return this._disabled || this._parentChip?.disabled || false;
  }
  set disabled(value) {
    this._disabled = value;
  }
  _disabled = false;
  tabIndex = -1;
  _allowFocusWhenDisabled = false;
  _getDisabledAttribute() {
    return this.disabled && !this._allowFocusWhenDisabled ? "" : null;
  }
  constructor() {
    inject(_CdkPrivateStyleLoader).load(_StructuralStylesLoader);
    if (this._elementRef.nativeElement.nodeName === "BUTTON") {
      this._elementRef.nativeElement.setAttribute("type", "button");
    }
  }
  focus() {
    this._elementRef.nativeElement.focus();
  }
  static ɵfac = function MatChipContent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatChipContent)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MatChipContent,
    selectors: [["", "matChipContent", ""]],
    hostAttrs: [1, "mat-mdc-chip-action", "mdc-evolution-chip__action", "mdc-evolution-chip__action--presentational"],
    hostVars: 8,
    hostBindings: function MatChipContent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("disabled", ctx._getDisabledAttribute())("aria-disabled", ctx.disabled);
        ɵɵclassProp("mdc-evolution-chip__action--primary", ctx._isPrimary)("mdc-evolution-chip__action--secondary", !ctx._isPrimary)("mdc-evolution-chip__action--trailing", !ctx._isPrimary && !ctx._isLeading);
      }
    },
    inputs: {
      disabled: [2, "disabled", "disabled", booleanAttribute],
      tabIndex: [2, "tabIndex", "tabIndex", (value) => value == null ? -1 : numberAttribute(value)],
      _allowFocusWhenDisabled: "_allowFocusWhenDisabled"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatChipContent, [{
    type: Directive,
    args: [{
      selector: "[matChipContent]",
      host: {
        "class": "mat-mdc-chip-action mdc-evolution-chip__action mdc-evolution-chip__action--presentational",
        "[class.mdc-evolution-chip__action--primary]": "_isPrimary",
        "[class.mdc-evolution-chip__action--secondary]": "!_isPrimary",
        "[class.mdc-evolution-chip__action--trailing]": "!_isPrimary && !_isLeading",
        "[attr.disabled]": "_getDisabledAttribute()",
        "[attr.aria-disabled]": "disabled"
      }
    }]
  }], () => [], {
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tabIndex: [{
      type: Input,
      args: [{
        transform: (value) => value == null ? -1 : numberAttribute(value)
      }]
    }],
    _allowFocusWhenDisabled: [{
      type: Input
    }]
  });
})();
var MatChipAction = class _MatChipAction extends MatChipContent {
  _getTabindex() {
    return this.disabled && !this._allowFocusWhenDisabled ? null : this.tabIndex.toString();
  }
  _handleClick(event) {
    if (!this.disabled && this._isPrimary) {
      event.preventDefault();
      this._parentChip._handlePrimaryActionInteraction();
    }
  }
  _handleKeydown(event) {
    if ((event.keyCode === ENTER || event.keyCode === SPACE) && !this.disabled && this._isPrimary && !this._parentChip._isEditing) {
      event.preventDefault();
      this._parentChip._handlePrimaryActionInteraction();
    }
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMatChipAction_BaseFactory;
    return function MatChipAction_Factory(__ngFactoryType__) {
      return (ɵMatChipAction_BaseFactory || (ɵMatChipAction_BaseFactory = ɵɵgetInheritedFactory(_MatChipAction)))(__ngFactoryType__ || _MatChipAction);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _MatChipAction,
    selectors: [["", "matChipAction", ""]],
    hostVars: 3,
    hostBindings: function MatChipAction_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function MatChipAction_click_HostBindingHandler($event) {
          return ctx._handleClick($event);
        })("keydown", function MatChipAction_keydown_HostBindingHandler($event) {
          return ctx._handleKeydown($event);
        });
      }
      if (rf & 2) {
        ɵɵattribute("tabindex", ctx._getTabindex());
        ɵɵclassProp("mdc-evolution-chip__action--presentational", false);
      }
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatChipAction, [{
    type: Directive,
    args: [{
      selector: "[matChipAction]",
      host: {
        "[attr.tabindex]": "_getTabindex()",
        "[class.mdc-evolution-chip__action--presentational]": "false",
        "(click)": "_handleClick($event)",
        "(keydown)": "_handleKeydown($event)"
      }
    }]
  }], null, null);
})();
var MatChipAvatar = class _MatChipAvatar {
  static ɵfac = function MatChipAvatar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatChipAvatar)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MatChipAvatar,
    selectors: [["mat-chip-avatar"], ["", "matChipAvatar", ""]],
    hostAttrs: ["role", "img", 1, "mat-mdc-chip-avatar", "mdc-evolution-chip__icon", "mdc-evolution-chip__icon--primary"],
    features: [ɵɵProvidersFeature([{
      provide: MAT_CHIP_AVATAR,
      useExisting: _MatChipAvatar
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatChipAvatar, [{
    type: Directive,
    args: [{
      selector: "mat-chip-avatar, [matChipAvatar]",
      host: {
        "class": "mat-mdc-chip-avatar mdc-evolution-chip__icon mdc-evolution-chip__icon--primary",
        "role": "img"
      },
      providers: [{
        provide: MAT_CHIP_AVATAR,
        useExisting: MatChipAvatar
      }]
    }]
  }], null, null);
})();
var MatChipTrailingIcon = class _MatChipTrailingIcon extends MatChipContent {
  _isPrimary = false;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMatChipTrailingIcon_BaseFactory;
    return function MatChipTrailingIcon_Factory(__ngFactoryType__) {
      return (ɵMatChipTrailingIcon_BaseFactory || (ɵMatChipTrailingIcon_BaseFactory = ɵɵgetInheritedFactory(_MatChipTrailingIcon)))(__ngFactoryType__ || _MatChipTrailingIcon);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _MatChipTrailingIcon,
    selectors: [["mat-chip-trailing-icon"], ["", "matChipTrailingIcon", ""]],
    hostAttrs: ["aria-hidden", "true", 1, "mat-mdc-chip-trailing-icon", "mdc-evolution-chip__icon", "mdc-evolution-chip__icon--trailing"],
    features: [ɵɵProvidersFeature([{
      provide: MAT_CHIP_TRAILING_ICON,
      useExisting: _MatChipTrailingIcon
    }]), ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatChipTrailingIcon, [{
    type: Directive,
    args: [{
      selector: "mat-chip-trailing-icon, [matChipTrailingIcon]",
      host: {
        "class": "mat-mdc-chip-trailing-icon mdc-evolution-chip__icon mdc-evolution-chip__icon--trailing",
        "aria-hidden": "true"
      },
      providers: [{
        provide: MAT_CHIP_TRAILING_ICON,
        useExisting: MatChipTrailingIcon
      }]
    }]
  }], null, null);
})();
var MatChipEdit = class _MatChipEdit extends MatChipAction {
  _isPrimary = false;
  _isLeading = true;
  _handleClick(event) {
    if (!this.disabled) {
      event.stopPropagation();
      event.preventDefault();
      this._parentChip._edit(event);
    }
  }
  _handleKeydown(event) {
    if ((event.keyCode === ENTER || event.keyCode === SPACE) && !this.disabled) {
      event.stopPropagation();
      event.preventDefault();
      this._parentChip._edit(event);
    }
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMatChipEdit_BaseFactory;
    return function MatChipEdit_Factory(__ngFactoryType__) {
      return (ɵMatChipEdit_BaseFactory || (ɵMatChipEdit_BaseFactory = ɵɵgetInheritedFactory(_MatChipEdit)))(__ngFactoryType__ || _MatChipEdit);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _MatChipEdit,
    selectors: [["", "matChipEdit", ""]],
    hostAttrs: ["role", "button", 1, "mat-mdc-chip-edit", "mat-mdc-chip-avatar", "mat-focus-indicator", "mdc-evolution-chip__icon", "mdc-evolution-chip__icon--primary"],
    hostVars: 1,
    hostBindings: function MatChipEdit_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("aria-hidden", null);
      }
    },
    features: [ɵɵProvidersFeature([{
      provide: MAT_CHIP_EDIT,
      useExisting: _MatChipEdit
    }]), ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatChipEdit, [{
    type: Directive,
    args: [{
      selector: "[matChipEdit]",
      host: {
        "class": "mat-mdc-chip-edit mat-mdc-chip-avatar mat-focus-indicator mdc-evolution-chip__icon mdc-evolution-chip__icon--primary",
        "role": "button",
        "[attr.aria-hidden]": "null"
      },
      providers: [{
        provide: MAT_CHIP_EDIT,
        useExisting: MatChipEdit
      }]
    }]
  }], null, null);
})();
var MatChipRemove = class _MatChipRemove extends MatChipAction {
  _isPrimary = false;
  _handleClick(event) {
    if (!this.disabled) {
      event.stopPropagation();
      event.preventDefault();
      this._parentChip.remove();
    }
  }
  _handleKeydown(event) {
    if ((event.keyCode === ENTER || event.keyCode === SPACE) && !this.disabled) {
      event.stopPropagation();
      event.preventDefault();
      this._parentChip.remove();
    }
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMatChipRemove_BaseFactory;
    return function MatChipRemove_Factory(__ngFactoryType__) {
      return (ɵMatChipRemove_BaseFactory || (ɵMatChipRemove_BaseFactory = ɵɵgetInheritedFactory(_MatChipRemove)))(__ngFactoryType__ || _MatChipRemove);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _MatChipRemove,
    selectors: [["", "matChipRemove", ""]],
    hostAttrs: ["role", "button", 1, "mat-mdc-chip-remove", "mat-mdc-chip-trailing-icon", "mat-focus-indicator", "mdc-evolution-chip__icon", "mdc-evolution-chip__icon--trailing"],
    hostVars: 1,
    hostBindings: function MatChipRemove_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("aria-hidden", null);
      }
    },
    features: [ɵɵProvidersFeature([{
      provide: MAT_CHIP_REMOVE,
      useExisting: _MatChipRemove
    }]), ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatChipRemove, [{
    type: Directive,
    args: [{
      selector: "[matChipRemove]",
      host: {
        "class": "mat-mdc-chip-remove mat-mdc-chip-trailing-icon mat-focus-indicator mdc-evolution-chip__icon mdc-evolution-chip__icon--trailing",
        "role": "button",
        "[attr.aria-hidden]": "null"
      },
      providers: [{
        provide: MAT_CHIP_REMOVE,
        useExisting: MatChipRemove
      }]
    }]
  }], null, null);
})();
var MatChip = class _MatChip {
  _changeDetectorRef = inject(ChangeDetectorRef);
  _elementRef = inject(ElementRef);
  _tagName = inject(HOST_TAG_NAME);
  _ngZone = inject(NgZone);
  _focusMonitor = inject(FocusMonitor);
  _globalRippleOptions = inject(MAT_RIPPLE_GLOBAL_OPTIONS, {
    optional: true
  });
  _document = inject(DOCUMENT);
  _onFocus = new Subject();
  _onBlur = new Subject();
  _isBasicChip = false;
  role = null;
  _hasFocusInternal = false;
  _pendingFocus = false;
  _actionChanges;
  _animationsDisabled = _animationsDisabled();
  _allLeadingIcons;
  _allTrailingIcons;
  _allEditIcons;
  _allRemoveIcons;
  _hasFocus() {
    return this._hasFocusInternal;
  }
  id = inject(_IdGenerator).getId("mat-mdc-chip-");
  ariaLabel = null;
  ariaDescription = null;
  _chipListDisabled = false;
  _hadFocusOnRemove = false;
  _textElement;
  get value() {
    return this._value !== void 0 ? this._value : this._textElement.textContent.trim();
  }
  set value(value) {
    this._value = value;
  }
  _value;
  color;
  removable = true;
  highlighted = false;
  disableRipple = false;
  get disabled() {
    return this._disabled || this._chipListDisabled;
  }
  set disabled(value) {
    this._disabled = value;
  }
  _disabled = false;
  removed = new EventEmitter();
  destroyed = new EventEmitter();
  basicChipAttrName = "mat-basic-chip";
  leadingIcon;
  editIcon;
  trailingIcon;
  removeIcon;
  primaryAction;
  _rippleLoader = inject(MatRippleLoader);
  _injector = inject(Injector);
  constructor() {
    const styleLoader = inject(_CdkPrivateStyleLoader);
    styleLoader.load(_StructuralStylesLoader);
    styleLoader.load(_VisuallyHiddenLoader);
    this._monitorFocus();
    this._rippleLoader?.configureRipple(this._elementRef.nativeElement, {
      className: "mat-mdc-chip-ripple",
      disabled: this._isRippleDisabled()
    });
  }
  ngOnInit() {
    this._isBasicChip = this._elementRef.nativeElement.hasAttribute(this.basicChipAttrName) || this._tagName.toLowerCase() === this.basicChipAttrName;
  }
  ngAfterViewInit() {
    this._textElement = this._elementRef.nativeElement.querySelector(".mat-mdc-chip-action-label");
    if (this._pendingFocus) {
      this._pendingFocus = false;
      this.focus();
    }
  }
  ngAfterContentInit() {
    this._actionChanges = merge(this._allLeadingIcons.changes, this._allTrailingIcons.changes, this._allEditIcons.changes, this._allRemoveIcons.changes).subscribe(() => this._changeDetectorRef.markForCheck());
  }
  ngDoCheck() {
    this._rippleLoader.setDisabled(this._elementRef.nativeElement, this._isRippleDisabled());
  }
  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
    this._rippleLoader?.destroyRipple(this._elementRef.nativeElement);
    this._actionChanges?.unsubscribe();
    this.destroyed.emit({
      chip: this
    });
    this.destroyed.complete();
  }
  remove() {
    if (this.removable) {
      this._hadFocusOnRemove = this._hasFocus();
      this.removed.emit({
        chip: this
      });
    }
  }
  _isRippleDisabled() {
    return this.disabled || this.disableRipple || this._animationsDisabled || this._isBasicChip || !this._hasInteractiveActions() || !!this._globalRippleOptions?.disabled;
  }
  _hasTrailingIcon() {
    return !!(this.trailingIcon || this.removeIcon);
  }
  _handleKeydown(event) {
    if (event.keyCode === BACKSPACE && !event.repeat || event.keyCode === DELETE) {
      event.preventDefault();
      this.remove();
    }
  }
  focus() {
    if (!this.disabled) {
      if (this.primaryAction) {
        this.primaryAction.focus();
      } else {
        this._pendingFocus = true;
      }
    }
  }
  _getSourceAction(target) {
    return this._getActions().find((action) => {
      const element = action._elementRef.nativeElement;
      return element === target || element.contains(target);
    });
  }
  _getActions() {
    const result = [];
    if (this.editIcon) {
      result.push(this.editIcon);
    }
    if (this.primaryAction) {
      result.push(this.primaryAction);
    }
    if (this.removeIcon) {
      result.push(this.removeIcon);
    }
    return result;
  }
  _handlePrimaryActionInteraction() {
  }
  _hasInteractiveActions() {
    return this._getActions().length > 0;
  }
  _edit(event) {
  }
  _monitorFocus() {
    this._focusMonitor.monitor(this._elementRef, true).subscribe((origin) => {
      const hasFocus = origin !== null;
      if (hasFocus !== this._hasFocusInternal) {
        this._hasFocusInternal = hasFocus;
        if (hasFocus) {
          this._onFocus.next({
            chip: this
          });
        } else {
          this._changeDetectorRef.markForCheck();
          setTimeout(() => this._ngZone.run(() => this._onBlur.next({
            chip: this
          })));
        }
      }
    });
  }
  static ɵfac = function MatChip_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatChip)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MatChip,
    selectors: [["mat-basic-chip"], ["", "mat-basic-chip", ""], ["mat-chip"], ["", "mat-chip", ""]],
    contentQueries: function MatChip_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, MAT_CHIP_AVATAR, 5)(dirIndex, MAT_CHIP_EDIT, 5)(dirIndex, MAT_CHIP_TRAILING_ICON, 5)(dirIndex, MAT_CHIP_REMOVE, 5)(dirIndex, MAT_CHIP_AVATAR, 5)(dirIndex, MAT_CHIP_TRAILING_ICON, 5)(dirIndex, MAT_CHIP_EDIT, 5)(dirIndex, MAT_CHIP_REMOVE, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.leadingIcon = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.editIcon = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.trailingIcon = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.removeIcon = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._allLeadingIcons = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._allTrailingIcons = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._allEditIcons = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._allRemoveIcons = _t);
      }
    },
    viewQuery: function MatChip_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(MatChipAction, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.primaryAction = _t.first);
      }
    },
    hostAttrs: [1, "mat-mdc-chip"],
    hostVars: 31,
    hostBindings: function MatChip_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("keydown", function MatChip_keydown_HostBindingHandler($event) {
          return ctx._handleKeydown($event);
        });
      }
      if (rf & 2) {
        ɵɵdomProperty("id", ctx.id);
        ɵɵattribute("role", ctx.role)("aria-label", ctx.ariaLabel);
        ɵɵclassMap("mat-" + (ctx.color || "primary"));
        ɵɵclassProp("mdc-evolution-chip", !ctx._isBasicChip)("mdc-evolution-chip--disabled", ctx.disabled)("mdc-evolution-chip--with-trailing-action", ctx._hasTrailingIcon())("mdc-evolution-chip--with-primary-graphic", ctx.leadingIcon)("mdc-evolution-chip--with-primary-icon", ctx.leadingIcon)("mdc-evolution-chip--with-avatar", ctx.leadingIcon)("mat-mdc-chip-with-avatar", ctx.leadingIcon)("mat-mdc-chip-highlighted", ctx.highlighted)("mat-mdc-chip-disabled", ctx.disabled)("mat-mdc-basic-chip", ctx._isBasicChip)("mat-mdc-standard-chip", !ctx._isBasicChip)("mat-mdc-chip-with-trailing-icon", ctx._hasTrailingIcon())("_mat-animation-noopable", ctx._animationsDisabled);
      }
    },
    inputs: {
      role: "role",
      id: "id",
      ariaLabel: [0, "aria-label", "ariaLabel"],
      ariaDescription: [0, "aria-description", "ariaDescription"],
      value: "value",
      color: "color",
      removable: [2, "removable", "removable", booleanAttribute],
      highlighted: [2, "highlighted", "highlighted", booleanAttribute],
      disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
      disabled: [2, "disabled", "disabled", booleanAttribute]
    },
    outputs: {
      removed: "removed",
      destroyed: "destroyed"
    },
    exportAs: ["matChip"],
    features: [ɵɵProvidersFeature([{
      provide: MAT_CHIP,
      useExisting: _MatChip
    }])],
    ngContentSelectors: _c12,
    decls: 8,
    vars: 2,
    consts: [[1, "mat-mdc-chip-focus-overlay"], [1, "mdc-evolution-chip__cell", "mdc-evolution-chip__cell--primary"], ["matChipContent", ""], [1, "mdc-evolution-chip__graphic", "mat-mdc-chip-graphic"], [1, "mdc-evolution-chip__text-label", "mat-mdc-chip-action-label"], [1, "mat-mdc-chip-primary-focus-indicator", "mat-focus-indicator"], [1, "mdc-evolution-chip__cell", "mdc-evolution-chip__cell--trailing"]],
    template: function MatChip_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef(_c02);
        ɵɵelement(0, "span", 0);
        ɵɵelementStart(1, "span", 1)(2, "span", 2);
        ɵɵconditionalCreate(3, MatChip_Conditional_3_Template, 2, 0, "span", 3);
        ɵɵelementStart(4, "span", 4);
        ɵɵprojection(5);
        ɵɵelement(6, "span", 5);
        ɵɵelementEnd()()();
        ɵɵconditionalCreate(7, MatChip_Conditional_7_Template, 2, 0, "span", 6);
      }
      if (rf & 2) {
        ɵɵadvance(3);
        ɵɵconditional(ctx.leadingIcon ? 3 : -1);
        ɵɵadvance(4);
        ɵɵconditional(ctx._hasTrailingIcon() ? 7 : -1);
      }
    },
    dependencies: [MatChipContent],
    styles: ['.mdc-evolution-chip,\n.mdc-evolution-chip__cell,\n.mdc-evolution-chip__action {\n  display: inline-flex;\n  align-items: center;\n}\n\n.mdc-evolution-chip {\n  position: relative;\n  max-width: 100%;\n}\n\n.mdc-evolution-chip__cell,\n.mdc-evolution-chip__action {\n  height: 100%;\n}\n\n.mdc-evolution-chip__cell--primary {\n  flex-basis: 100%;\n  overflow-x: hidden;\n}\n\n.mdc-evolution-chip__cell--trailing {\n  flex: 1 0 auto;\n}\n\n.mdc-evolution-chip__action {\n  align-items: center;\n  background: none;\n  border: none;\n  box-sizing: content-box;\n  cursor: pointer;\n  display: inline-flex;\n  justify-content: center;\n  outline: none;\n  padding: 0;\n  text-decoration: none;\n  color: inherit;\n}\n\n.mdc-evolution-chip__action--presentational {\n  cursor: auto;\n}\n\n.mdc-evolution-chip--disabled,\n.mdc-evolution-chip__action:disabled {\n  pointer-events: none;\n}\n@media (forced-colors: active) {\n  .mdc-evolution-chip--disabled,\n  .mdc-evolution-chip__action:disabled {\n    forced-color-adjust: none;\n  }\n}\n\n.mdc-evolution-chip__action--primary {\n  font: inherit;\n  letter-spacing: inherit;\n  white-space: inherit;\n  overflow-x: hidden;\n}\n.mat-mdc-standard-chip .mdc-evolution-chip__action--primary::before {\n  border-width: var(--mat-chip-outline-width, 1px);\n  border-radius: var(--mat-chip-container-shape-radius, 8px);\n  box-sizing: border-box;\n  content: "";\n  height: 100%;\n  left: 0;\n  position: absolute;\n  pointer-events: none;\n  top: 0;\n  width: 100%;\n  z-index: 1;\n  border-style: solid;\n}\n.mat-mdc-standard-chip .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 12px;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 12px;\n}\n[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 0;\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--primary::before {\n  border-color: var(--mat-chip-outline-color, var(--mat-sys-outline));\n}\n.mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus::before {\n  border-color: var(--mat-chip-focus-outline-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--primary::before {\n  border-color: var(--mat-chip-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary::before {\n  border-width: var(--mat-chip-flat-selected-outline-width, 0);\n}\n.mat-mdc-basic-chip .mdc-evolution-chip__action--primary {\n  font: inherit;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 12px;\n}\n[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 0;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 0;\n}\n[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 12px;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 12px;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 0;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.mdc-evolution-chip__action--secondary {\n  position: relative;\n  overflow: visible;\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--secondary {\n  color: var(--mat-chip-with-trailing-icon-trailing-icon-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--secondary {\n  color: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-color, var(--mat-sys-on-surface));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n\n.mdc-evolution-chip__text-label {\n  -webkit-user-select: none;\n  user-select: none;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.mat-mdc-standard-chip .mdc-evolution-chip__text-label {\n  font-family: var(--mat-chip-label-text-font, var(--mat-sys-label-large-font));\n  line-height: var(--mat-chip-label-text-line-height, var(--mat-sys-label-large-line-height));\n  font-size: var(--mat-chip-label-text-size, var(--mat-sys-label-large-size));\n  font-weight: var(--mat-chip-label-text-weight, var(--mat-sys-label-large-weight));\n  letter-spacing: var(--mat-chip-label-text-tracking, var(--mat-sys-label-large-tracking));\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {\n  color: var(--mat-chip-label-text-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {\n  color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label, .mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label {\n  color: var(--mat-chip-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n\n.mdc-evolution-chip__graphic {\n  align-items: center;\n  display: inline-flex;\n  justify-content: center;\n  overflow: hidden;\n  pointer-events: none;\n  position: relative;\n  flex: 1 0 auto;\n}\n.mat-mdc-standard-chip .mdc-evolution-chip__graphic {\n  width: var(--mat-chip-with-avatar-avatar-size, 24px);\n  height: var(--mat-chip-with-avatar-avatar-size, 24px);\n  font-size: var(--mat-chip-with-avatar-avatar-size, 24px);\n}\n.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic {\n  transition: width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic {\n  width: 0;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {\n  padding-left: 6px;\n  padding-right: 6px;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {\n  padding-left: 4px;\n  padding-right: 8px;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {\n  padding-left: 8px;\n  padding-right: 4px;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {\n  padding-left: 6px;\n  padding-right: 6px;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {\n  padding-left: 4px;\n  padding-right: 8px;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {\n  padding-left: 8px;\n  padding-right: 4px;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__graphic {\n  padding-left: 0;\n}\n\n.mdc-evolution-chip__checkmark {\n  position: absolute;\n  opacity: 0;\n  top: 50%;\n  left: 50%;\n  height: 20px;\n  width: 20px;\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark {\n  color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark {\n  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));\n}\n.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark {\n  transition: transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);\n  transform: translate(-75%, -50%);\n}\n.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {\n  transform: translate(-50%, -50%);\n  opacity: 1;\n}\n\n.mdc-evolution-chip__checkmark-svg {\n  display: block;\n}\n\n.mdc-evolution-chip__checkmark-path {\n  stroke-width: 2px;\n  stroke-dasharray: 29.7833385;\n  stroke-dashoffset: 29.7833385;\n  stroke: currentColor;\n}\n.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path {\n  transition: stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path {\n  stroke-dashoffset: 0;\n}\n@media (forced-colors: active) {\n  .mdc-evolution-chip__checkmark-path {\n    stroke: CanvasText !important;\n  }\n}\n\n.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing {\n  height: 18px;\n  width: 18px;\n  font-size: 18px;\n}\n.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove {\n  opacity: calc(var(--mat-chip-trailing-action-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));\n}\n.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove:focus {\n  opacity: calc(var(--mat-chip-trailing-action-focus-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));\n}\n\n.mat-mdc-standard-chip {\n  border-radius: var(--mat-chip-container-shape-radius, 8px);\n  height: var(--mat-chip-container-height, 32px);\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) {\n  background-color: var(--mat-chip-elevated-container-color, transparent);\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled {\n  background-color: var(--mat-chip-elevated-disabled-container-color);\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) {\n  background-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled {\n  background-color: var(--mat-chip-flat-disabled-selected-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n@media (forced-colors: active) {\n  .mat-mdc-standard-chip {\n    outline: solid 1px;\n  }\n}\n\n.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary {\n  border-radius: var(--mat-chip-with-avatar-avatar-shape-radius, 24px);\n  width: var(--mat-chip-with-icon-icon-size, 18px);\n  height: var(--mat-chip-with-icon-icon-size, 18px);\n  font-size: var(--mat-chip-with-icon-icon-size, 18px);\n}\n.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary {\n  opacity: 0;\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary {\n  color: var(--mat-chip-with-icon-icon-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary {\n  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));\n}\n\n.mat-mdc-chip-highlighted {\n  --mat-chip-with-icon-icon-color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));\n  --mat-chip-elevated-container-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));\n  --mat-chip-label-text-color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));\n  --mat-chip-outline-width: var(--mat-chip-flat-selected-outline-width, 0);\n}\n\n.mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-chip-selected .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-hover-state-layer-color, var(--mat-sys-on-surface-variant));\n  opacity: var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-chip-focus-overlay .mat-mdc-chip-selected:hover, .mat-mdc-chip-highlighted:hover .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-selected-hover-state-layer-color, var(--mat-sys-on-secondary-container));\n  opacity: var(--mat-chip-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));\n  opacity: var(--mat-chip-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-chip-selected.cdk-focused .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted.cdk-focused .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));\n  opacity: var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n\n.mdc-evolution-chip--disabled:not(.mdc-evolution-chip--selected) .mat-mdc-chip-avatar {\n  opacity: var(--mat-chip-with-avatar-disabled-avatar-opacity, 0.38);\n}\n\n.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {\n  opacity: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38);\n}\n\n.mdc-evolution-chip--disabled.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {\n  opacity: var(--mat-chip-with-icon-disabled-icon-opacity, 0.38);\n}\n\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled {\n  opacity: var(--mat-chip-disabled-container-opacity, 1);\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted .mdc-evolution-chip__icon--trailing {\n  color: var(--mat-chip-selected-trailing-icon-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {\n  color: var(--mat-chip-selected-disabled-trailing-icon-color, var(--mat-sys-on-surface));\n}\n\n.mat-mdc-chip-edit, .mat-mdc-chip-remove {\n  opacity: var(--mat-chip-trailing-action-opacity, 1);\n}\n.mat-mdc-chip-edit:focus, .mat-mdc-chip-remove:focus {\n  opacity: var(--mat-chip-trailing-action-focus-opacity, 1);\n}\n.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {\n  background-color: var(--mat-chip-trailing-action-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-chip-edit:hover::after, .mat-mdc-chip-remove:hover::after {\n  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));\n}\n.mat-mdc-chip-edit:focus::after, .mat-mdc-chip-remove:focus::after {\n  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));\n}\n\n.mat-mdc-chip-selected .mat-mdc-chip-remove::after,\n.mat-mdc-chip-highlighted .mat-mdc-chip-remove::after {\n  background-color: var(--mat-chip-selected-trailing-action-state-layer-color, var(--mat-sys-on-secondary-container));\n}\n\n.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:focus::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:focus::after {\n  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));\n}\n.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:hover::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:hover::after {\n  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));\n}\n\n.mat-mdc-standard-chip {\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-standard-chip .mat-mdc-chip-graphic,\n.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon {\n  box-sizing: content-box;\n}\n.mat-mdc-standard-chip._mat-animation-noopable,\n.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,\n.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,\n.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path {\n  transition-duration: 1ms;\n  animation-duration: 1ms;\n}\n\n.mat-mdc-chip-focus-overlay {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  opacity: 0;\n  border-radius: inherit;\n  transition: opacity 150ms linear;\n}\n._mat-animation-noopable .mat-mdc-chip-focus-overlay {\n  transition: none;\n}\n.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay {\n  display: none;\n}\n\n.mat-mdc-chip .mat-ripple.mat-mdc-chip-ripple {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n\n.mat-mdc-chip-avatar {\n  text-align: center;\n  line-height: 1;\n  color: var(--mat-chip-with-icon-icon-color, currentColor);\n}\n\n.mat-mdc-chip {\n  position: relative;\n  z-index: 0;\n}\n\n.mat-mdc-chip-action-label {\n  text-align: left;\n  z-index: 1;\n}\n[dir=rtl] .mat-mdc-chip-action-label {\n  text-align: right;\n}\n.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label {\n  position: relative;\n}\n.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  pointer-events: none;\n}\n.mat-mdc-chip-action-label .mat-focus-indicator::before {\n  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);\n}\n\n.mat-mdc-chip-edit::before, .mat-mdc-chip-remove::before {\n  margin: calc(var(--mat-focus-indicator-border-width, 3px) * -1);\n  left: 8px;\n  right: 8px;\n}\n.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {\n  content: "";\n  display: block;\n  opacity: 0;\n  position: absolute;\n  top: -3px;\n  bottom: -3px;\n  left: 5px;\n  right: 5px;\n  border-radius: 50%;\n  box-sizing: border-box;\n  padding: 12px;\n  margin: -12px;\n  background-clip: content-box;\n}\n.mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {\n  width: 18px;\n  height: 18px;\n  font-size: 18px;\n  box-sizing: content-box;\n}\n\n.mat-chip-edit-input {\n  cursor: text;\n  display: inline-block;\n  color: inherit;\n  outline: 0;\n}\n\n@media (forced-colors: active) {\n  .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple) {\n    outline-width: 3px;\n  }\n}\n\n.mat-mdc-chip-action:focus-visible .mat-focus-indicator::before {\n  content: "";\n}\n\n.mdc-evolution-chip__icon, .mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {\n  min-height: fit-content;\n}\n\nimg.mdc-evolution-chip__icon {\n  min-height: 0;\n}\n'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatChip, [{
    type: Component,
    args: [{
      selector: "mat-basic-chip, [mat-basic-chip], mat-chip, [mat-chip]",
      exportAs: "matChip",
      host: {
        "class": "mat-mdc-chip",
        "[class]": '"mat-" + (color || "primary")',
        "[class.mdc-evolution-chip]": "!_isBasicChip",
        "[class.mdc-evolution-chip--disabled]": "disabled",
        "[class.mdc-evolution-chip--with-trailing-action]": "_hasTrailingIcon()",
        "[class.mdc-evolution-chip--with-primary-graphic]": "leadingIcon",
        "[class.mdc-evolution-chip--with-primary-icon]": "leadingIcon",
        "[class.mdc-evolution-chip--with-avatar]": "leadingIcon",
        "[class.mat-mdc-chip-with-avatar]": "leadingIcon",
        "[class.mat-mdc-chip-highlighted]": "highlighted",
        "[class.mat-mdc-chip-disabled]": "disabled",
        "[class.mat-mdc-basic-chip]": "_isBasicChip",
        "[class.mat-mdc-standard-chip]": "!_isBasicChip",
        "[class.mat-mdc-chip-with-trailing-icon]": "_hasTrailingIcon()",
        "[class._mat-animation-noopable]": "_animationsDisabled",
        "[id]": "id",
        "[attr.role]": "role",
        "[attr.aria-label]": "ariaLabel",
        "(keydown)": "_handleKeydown($event)"
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: MAT_CHIP,
        useExisting: MatChip
      }],
      imports: [MatChipContent],
      template: '<span class="mat-mdc-chip-focus-overlay"></span>\n\n<span class="mdc-evolution-chip__cell mdc-evolution-chip__cell--primary">\n  <span matChipContent>\n    @if (leadingIcon) {\n      <span class="mdc-evolution-chip__graphic mat-mdc-chip-graphic">\n        <ng-content select="mat-chip-avatar, [matChipAvatar]"></ng-content>\n      </span>\n    }\n    <span class="mdc-evolution-chip__text-label mat-mdc-chip-action-label">\n      <ng-content></ng-content>\n      <span class="mat-mdc-chip-primary-focus-indicator mat-focus-indicator"></span>\n    </span>\n  </span>\n</span>\n\n@if (_hasTrailingIcon()) {\n  <span class="mdc-evolution-chip__cell mdc-evolution-chip__cell--trailing">\n    <ng-content select="mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"></ng-content>\n  </span>\n}\n',
      styles: ['.mdc-evolution-chip,\n.mdc-evolution-chip__cell,\n.mdc-evolution-chip__action {\n  display: inline-flex;\n  align-items: center;\n}\n\n.mdc-evolution-chip {\n  position: relative;\n  max-width: 100%;\n}\n\n.mdc-evolution-chip__cell,\n.mdc-evolution-chip__action {\n  height: 100%;\n}\n\n.mdc-evolution-chip__cell--primary {\n  flex-basis: 100%;\n  overflow-x: hidden;\n}\n\n.mdc-evolution-chip__cell--trailing {\n  flex: 1 0 auto;\n}\n\n.mdc-evolution-chip__action {\n  align-items: center;\n  background: none;\n  border: none;\n  box-sizing: content-box;\n  cursor: pointer;\n  display: inline-flex;\n  justify-content: center;\n  outline: none;\n  padding: 0;\n  text-decoration: none;\n  color: inherit;\n}\n\n.mdc-evolution-chip__action--presentational {\n  cursor: auto;\n}\n\n.mdc-evolution-chip--disabled,\n.mdc-evolution-chip__action:disabled {\n  pointer-events: none;\n}\n@media (forced-colors: active) {\n  .mdc-evolution-chip--disabled,\n  .mdc-evolution-chip__action:disabled {\n    forced-color-adjust: none;\n  }\n}\n\n.mdc-evolution-chip__action--primary {\n  font: inherit;\n  letter-spacing: inherit;\n  white-space: inherit;\n  overflow-x: hidden;\n}\n.mat-mdc-standard-chip .mdc-evolution-chip__action--primary::before {\n  border-width: var(--mat-chip-outline-width, 1px);\n  border-radius: var(--mat-chip-container-shape-radius, 8px);\n  box-sizing: border-box;\n  content: "";\n  height: 100%;\n  left: 0;\n  position: absolute;\n  pointer-events: none;\n  top: 0;\n  width: 100%;\n  z-index: 1;\n  border-style: solid;\n}\n.mat-mdc-standard-chip .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 12px;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 12px;\n}\n[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 0;\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--primary::before {\n  border-color: var(--mat-chip-outline-color, var(--mat-sys-outline));\n}\n.mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus::before {\n  border-color: var(--mat-chip-focus-outline-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--primary::before {\n  border-color: var(--mat-chip-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary::before {\n  border-width: var(--mat-chip-flat-selected-outline-width, 0);\n}\n.mat-mdc-basic-chip .mdc-evolution-chip__action--primary {\n  font: inherit;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 12px;\n}\n[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 0;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 0;\n}\n[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 12px;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 12px;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 0;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.mdc-evolution-chip__action--secondary {\n  position: relative;\n  overflow: visible;\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--secondary {\n  color: var(--mat-chip-with-trailing-icon-trailing-icon-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--secondary {\n  color: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-color, var(--mat-sys-on-surface));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n\n.mdc-evolution-chip__text-label {\n  -webkit-user-select: none;\n  user-select: none;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.mat-mdc-standard-chip .mdc-evolution-chip__text-label {\n  font-family: var(--mat-chip-label-text-font, var(--mat-sys-label-large-font));\n  line-height: var(--mat-chip-label-text-line-height, var(--mat-sys-label-large-line-height));\n  font-size: var(--mat-chip-label-text-size, var(--mat-sys-label-large-size));\n  font-weight: var(--mat-chip-label-text-weight, var(--mat-sys-label-large-weight));\n  letter-spacing: var(--mat-chip-label-text-tracking, var(--mat-sys-label-large-tracking));\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {\n  color: var(--mat-chip-label-text-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {\n  color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label, .mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label {\n  color: var(--mat-chip-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n\n.mdc-evolution-chip__graphic {\n  align-items: center;\n  display: inline-flex;\n  justify-content: center;\n  overflow: hidden;\n  pointer-events: none;\n  position: relative;\n  flex: 1 0 auto;\n}\n.mat-mdc-standard-chip .mdc-evolution-chip__graphic {\n  width: var(--mat-chip-with-avatar-avatar-size, 24px);\n  height: var(--mat-chip-with-avatar-avatar-size, 24px);\n  font-size: var(--mat-chip-with-avatar-avatar-size, 24px);\n}\n.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic {\n  transition: width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic {\n  width: 0;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {\n  padding-left: 6px;\n  padding-right: 6px;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {\n  padding-left: 4px;\n  padding-right: 8px;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {\n  padding-left: 8px;\n  padding-right: 4px;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {\n  padding-left: 6px;\n  padding-right: 6px;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {\n  padding-left: 4px;\n  padding-right: 8px;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {\n  padding-left: 8px;\n  padding-right: 4px;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__graphic {\n  padding-left: 0;\n}\n\n.mdc-evolution-chip__checkmark {\n  position: absolute;\n  opacity: 0;\n  top: 50%;\n  left: 50%;\n  height: 20px;\n  width: 20px;\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark {\n  color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark {\n  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));\n}\n.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark {\n  transition: transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);\n  transform: translate(-75%, -50%);\n}\n.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {\n  transform: translate(-50%, -50%);\n  opacity: 1;\n}\n\n.mdc-evolution-chip__checkmark-svg {\n  display: block;\n}\n\n.mdc-evolution-chip__checkmark-path {\n  stroke-width: 2px;\n  stroke-dasharray: 29.7833385;\n  stroke-dashoffset: 29.7833385;\n  stroke: currentColor;\n}\n.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path {\n  transition: stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path {\n  stroke-dashoffset: 0;\n}\n@media (forced-colors: active) {\n  .mdc-evolution-chip__checkmark-path {\n    stroke: CanvasText !important;\n  }\n}\n\n.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing {\n  height: 18px;\n  width: 18px;\n  font-size: 18px;\n}\n.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove {\n  opacity: calc(var(--mat-chip-trailing-action-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));\n}\n.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove:focus {\n  opacity: calc(var(--mat-chip-trailing-action-focus-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));\n}\n\n.mat-mdc-standard-chip {\n  border-radius: var(--mat-chip-container-shape-radius, 8px);\n  height: var(--mat-chip-container-height, 32px);\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) {\n  background-color: var(--mat-chip-elevated-container-color, transparent);\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled {\n  background-color: var(--mat-chip-elevated-disabled-container-color);\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) {\n  background-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled {\n  background-color: var(--mat-chip-flat-disabled-selected-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n@media (forced-colors: active) {\n  .mat-mdc-standard-chip {\n    outline: solid 1px;\n  }\n}\n\n.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary {\n  border-radius: var(--mat-chip-with-avatar-avatar-shape-radius, 24px);\n  width: var(--mat-chip-with-icon-icon-size, 18px);\n  height: var(--mat-chip-with-icon-icon-size, 18px);\n  font-size: var(--mat-chip-with-icon-icon-size, 18px);\n}\n.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary {\n  opacity: 0;\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary {\n  color: var(--mat-chip-with-icon-icon-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary {\n  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));\n}\n\n.mat-mdc-chip-highlighted {\n  --mat-chip-with-icon-icon-color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));\n  --mat-chip-elevated-container-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));\n  --mat-chip-label-text-color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));\n  --mat-chip-outline-width: var(--mat-chip-flat-selected-outline-width, 0);\n}\n\n.mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-chip-selected .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-hover-state-layer-color, var(--mat-sys-on-surface-variant));\n  opacity: var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-chip-focus-overlay .mat-mdc-chip-selected:hover, .mat-mdc-chip-highlighted:hover .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-selected-hover-state-layer-color, var(--mat-sys-on-secondary-container));\n  opacity: var(--mat-chip-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));\n  opacity: var(--mat-chip-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-chip-selected.cdk-focused .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted.cdk-focused .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));\n  opacity: var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n\n.mdc-evolution-chip--disabled:not(.mdc-evolution-chip--selected) .mat-mdc-chip-avatar {\n  opacity: var(--mat-chip-with-avatar-disabled-avatar-opacity, 0.38);\n}\n\n.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {\n  opacity: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38);\n}\n\n.mdc-evolution-chip--disabled.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {\n  opacity: var(--mat-chip-with-icon-disabled-icon-opacity, 0.38);\n}\n\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled {\n  opacity: var(--mat-chip-disabled-container-opacity, 1);\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted .mdc-evolution-chip__icon--trailing {\n  color: var(--mat-chip-selected-trailing-icon-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {\n  color: var(--mat-chip-selected-disabled-trailing-icon-color, var(--mat-sys-on-surface));\n}\n\n.mat-mdc-chip-edit, .mat-mdc-chip-remove {\n  opacity: var(--mat-chip-trailing-action-opacity, 1);\n}\n.mat-mdc-chip-edit:focus, .mat-mdc-chip-remove:focus {\n  opacity: var(--mat-chip-trailing-action-focus-opacity, 1);\n}\n.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {\n  background-color: var(--mat-chip-trailing-action-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-chip-edit:hover::after, .mat-mdc-chip-remove:hover::after {\n  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));\n}\n.mat-mdc-chip-edit:focus::after, .mat-mdc-chip-remove:focus::after {\n  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));\n}\n\n.mat-mdc-chip-selected .mat-mdc-chip-remove::after,\n.mat-mdc-chip-highlighted .mat-mdc-chip-remove::after {\n  background-color: var(--mat-chip-selected-trailing-action-state-layer-color, var(--mat-sys-on-secondary-container));\n}\n\n.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:focus::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:focus::after {\n  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));\n}\n.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:hover::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:hover::after {\n  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));\n}\n\n.mat-mdc-standard-chip {\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-standard-chip .mat-mdc-chip-graphic,\n.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon {\n  box-sizing: content-box;\n}\n.mat-mdc-standard-chip._mat-animation-noopable,\n.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,\n.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,\n.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path {\n  transition-duration: 1ms;\n  animation-duration: 1ms;\n}\n\n.mat-mdc-chip-focus-overlay {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  opacity: 0;\n  border-radius: inherit;\n  transition: opacity 150ms linear;\n}\n._mat-animation-noopable .mat-mdc-chip-focus-overlay {\n  transition: none;\n}\n.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay {\n  display: none;\n}\n\n.mat-mdc-chip .mat-ripple.mat-mdc-chip-ripple {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n\n.mat-mdc-chip-avatar {\n  text-align: center;\n  line-height: 1;\n  color: var(--mat-chip-with-icon-icon-color, currentColor);\n}\n\n.mat-mdc-chip {\n  position: relative;\n  z-index: 0;\n}\n\n.mat-mdc-chip-action-label {\n  text-align: left;\n  z-index: 1;\n}\n[dir=rtl] .mat-mdc-chip-action-label {\n  text-align: right;\n}\n.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label {\n  position: relative;\n}\n.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  pointer-events: none;\n}\n.mat-mdc-chip-action-label .mat-focus-indicator::before {\n  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);\n}\n\n.mat-mdc-chip-edit::before, .mat-mdc-chip-remove::before {\n  margin: calc(var(--mat-focus-indicator-border-width, 3px) * -1);\n  left: 8px;\n  right: 8px;\n}\n.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {\n  content: "";\n  display: block;\n  opacity: 0;\n  position: absolute;\n  top: -3px;\n  bottom: -3px;\n  left: 5px;\n  right: 5px;\n  border-radius: 50%;\n  box-sizing: border-box;\n  padding: 12px;\n  margin: -12px;\n  background-clip: content-box;\n}\n.mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {\n  width: 18px;\n  height: 18px;\n  font-size: 18px;\n  box-sizing: content-box;\n}\n\n.mat-chip-edit-input {\n  cursor: text;\n  display: inline-block;\n  color: inherit;\n  outline: 0;\n}\n\n@media (forced-colors: active) {\n  .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple) {\n    outline-width: 3px;\n  }\n}\n\n.mat-mdc-chip-action:focus-visible .mat-focus-indicator::before {\n  content: "";\n}\n\n.mdc-evolution-chip__icon, .mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {\n  min-height: fit-content;\n}\n\nimg.mdc-evolution-chip__icon {\n  min-height: 0;\n}\n']
    }]
  }], () => [], {
    role: [{
      type: Input
    }],
    _allLeadingIcons: [{
      type: ContentChildren,
      args: [MAT_CHIP_AVATAR, {
        descendants: true
      }]
    }],
    _allTrailingIcons: [{
      type: ContentChildren,
      args: [MAT_CHIP_TRAILING_ICON, {
        descendants: true
      }]
    }],
    _allEditIcons: [{
      type: ContentChildren,
      args: [MAT_CHIP_EDIT, {
        descendants: true
      }]
    }],
    _allRemoveIcons: [{
      type: ContentChildren,
      args: [MAT_CHIP_REMOVE, {
        descendants: true
      }]
    }],
    id: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaDescription: [{
      type: Input,
      args: ["aria-description"]
    }],
    value: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    removable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    highlighted: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    removed: [{
      type: Output
    }],
    destroyed: [{
      type: Output
    }],
    leadingIcon: [{
      type: ContentChild,
      args: [MAT_CHIP_AVATAR]
    }],
    editIcon: [{
      type: ContentChild,
      args: [MAT_CHIP_EDIT]
    }],
    trailingIcon: [{
      type: ContentChild,
      args: [MAT_CHIP_TRAILING_ICON]
    }],
    removeIcon: [{
      type: ContentChild,
      args: [MAT_CHIP_REMOVE]
    }],
    primaryAction: [{
      type: ViewChild,
      args: [MatChipAction]
    }]
  });
})();
var MatChipSelectionChange = class {
  source;
  selected;
  isUserInput;
  constructor(source, selected, isUserInput = false) {
    this.source = source;
    this.selected = selected;
    this.isUserInput = isUserInput;
  }
};
var MatChipOption = class _MatChipOption extends MatChip {
  _defaultOptions = inject(MAT_CHIPS_DEFAULT_OPTIONS, {
    optional: true
  });
  chipListSelectable = true;
  _chipListMultiple = false;
  _chipListHideSingleSelectionIndicator = this._defaultOptions?.hideSingleSelectionIndicator ?? false;
  get selectable() {
    return this._selectable && this.chipListSelectable;
  }
  set selectable(value) {
    this._selectable = value;
    this._changeDetectorRef.markForCheck();
  }
  _selectable = true;
  get selected() {
    return this._selected;
  }
  set selected(value) {
    this._setSelectedState(value, false, true);
  }
  _selected = false;
  get ariaSelected() {
    return this.selectable ? this.selected.toString() : null;
  }
  basicChipAttrName = "mat-basic-chip-option";
  selectionChange = new EventEmitter();
  ngOnInit() {
    super.ngOnInit();
    this.role = "presentation";
  }
  select() {
    this._setSelectedState(true, false, true);
  }
  deselect() {
    this._setSelectedState(false, false, true);
  }
  selectViaInteraction() {
    this._setSelectedState(true, true, true);
  }
  toggleSelected(isUserInput = false) {
    this._setSelectedState(!this.selected, isUserInput, true);
    return this.selected;
  }
  _handlePrimaryActionInteraction() {
    if (!this.disabled) {
      this.focus();
      if (this.selectable) {
        this.toggleSelected(true);
      }
    }
  }
  _hasLeadingGraphic() {
    if (this.leadingIcon) {
      return true;
    }
    return !this._chipListHideSingleSelectionIndicator || this._chipListMultiple;
  }
  _setSelectedState(isSelected, isUserInput, emitEvent) {
    if (isSelected !== this.selected) {
      this._selected = isSelected;
      if (emitEvent) {
        this.selectionChange.emit({
          source: this,
          isUserInput,
          selected: this.selected
        });
      }
      this._changeDetectorRef.markForCheck();
    }
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMatChipOption_BaseFactory;
    return function MatChipOption_Factory(__ngFactoryType__) {
      return (ɵMatChipOption_BaseFactory || (ɵMatChipOption_BaseFactory = ɵɵgetInheritedFactory(_MatChipOption)))(__ngFactoryType__ || _MatChipOption);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _MatChipOption,
    selectors: [["mat-basic-chip-option"], ["", "mat-basic-chip-option", ""], ["mat-chip-option"], ["", "mat-chip-option", ""]],
    hostAttrs: [1, "mat-mdc-chip", "mat-mdc-chip-option"],
    hostVars: 37,
    hostBindings: function MatChipOption_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵdomProperty("id", ctx.id);
        ɵɵattribute("tabindex", null)("aria-label", null)("aria-description", null)("role", ctx.role);
        ɵɵclassProp("mdc-evolution-chip", !ctx._isBasicChip)("mdc-evolution-chip--filter", !ctx._isBasicChip)("mdc-evolution-chip--selectable", !ctx._isBasicChip)("mat-mdc-chip-selected", ctx.selected)("mat-mdc-chip-multiple", ctx._chipListMultiple)("mat-mdc-chip-disabled", ctx.disabled)("mat-mdc-chip-with-avatar", ctx.leadingIcon)("mdc-evolution-chip--disabled", ctx.disabled)("mdc-evolution-chip--selected", ctx.selected)("mdc-evolution-chip--selecting", !ctx._animationsDisabled)("mdc-evolution-chip--with-trailing-action", ctx._hasTrailingIcon())("mdc-evolution-chip--with-primary-icon", ctx.leadingIcon)("mdc-evolution-chip--with-primary-graphic", ctx._hasLeadingGraphic())("mdc-evolution-chip--with-avatar", ctx.leadingIcon)("mat-mdc-chip-highlighted", ctx.highlighted)("mat-mdc-chip-with-trailing-icon", ctx._hasTrailingIcon());
      }
    },
    inputs: {
      selectable: [2, "selectable", "selectable", booleanAttribute],
      selected: [2, "selected", "selected", booleanAttribute]
    },
    outputs: {
      selectionChange: "selectionChange"
    },
    features: [ɵɵProvidersFeature([{
      provide: MatChip,
      useExisting: _MatChipOption
    }, {
      provide: MAT_CHIP,
      useExisting: _MatChipOption
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c12,
    decls: 8,
    vars: 6,
    consts: [[1, "mat-mdc-chip-focus-overlay"], [1, "mdc-evolution-chip__cell", "mdc-evolution-chip__cell--primary"], ["matChipAction", "", "role", "option", 3, "_allowFocusWhenDisabled"], [1, "mdc-evolution-chip__graphic", "mat-mdc-chip-graphic"], [1, "mdc-evolution-chip__text-label", "mat-mdc-chip-action-label"], [1, "mat-mdc-chip-primary-focus-indicator", "mat-focus-indicator"], [1, "mdc-evolution-chip__cell", "mdc-evolution-chip__cell--trailing"], [1, "mdc-evolution-chip__checkmark"], ["viewBox", "-2 -3 30 30", "focusable", "false", "aria-hidden", "true", 1, "mdc-evolution-chip__checkmark-svg"], ["fill", "none", "stroke", "currentColor", "d", "M1.73,12.91 8.1,19.28 22.79,4.59", 1, "mdc-evolution-chip__checkmark-path"]],
    template: function MatChipOption_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef(_c02);
        ɵɵelement(0, "span", 0);
        ɵɵelementStart(1, "span", 1)(2, "button", 2);
        ɵɵconditionalCreate(3, MatChipOption_Conditional_3_Template, 5, 0, "span", 3);
        ɵɵelementStart(4, "span", 4);
        ɵɵprojection(5);
        ɵɵelement(6, "span", 5);
        ɵɵelementEnd()()();
        ɵɵconditionalCreate(7, MatChipOption_Conditional_7_Template, 2, 0, "span", 6);
      }
      if (rf & 2) {
        ɵɵadvance(2);
        ɵɵproperty("_allowFocusWhenDisabled", true);
        ɵɵattribute("aria-description", ctx.ariaDescription)("aria-label", ctx.ariaLabel)("aria-selected", ctx.ariaSelected);
        ɵɵadvance();
        ɵɵconditional(ctx._hasLeadingGraphic() ? 3 : -1);
        ɵɵadvance(4);
        ɵɵconditional(ctx._hasTrailingIcon() ? 7 : -1);
      }
    },
    dependencies: [MatChipAction],
    styles: [_c22],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatChipOption, [{
    type: Component,
    args: [{
      selector: "mat-basic-chip-option, [mat-basic-chip-option], mat-chip-option, [mat-chip-option]",
      host: {
        "class": "mat-mdc-chip mat-mdc-chip-option",
        "[class.mdc-evolution-chip]": "!_isBasicChip",
        "[class.mdc-evolution-chip--filter]": "!_isBasicChip",
        "[class.mdc-evolution-chip--selectable]": "!_isBasicChip",
        "[class.mat-mdc-chip-selected]": "selected",
        "[class.mat-mdc-chip-multiple]": "_chipListMultiple",
        "[class.mat-mdc-chip-disabled]": "disabled",
        "[class.mat-mdc-chip-with-avatar]": "leadingIcon",
        "[class.mdc-evolution-chip--disabled]": "disabled",
        "[class.mdc-evolution-chip--selected]": "selected",
        "[class.mdc-evolution-chip--selecting]": "!_animationsDisabled",
        "[class.mdc-evolution-chip--with-trailing-action]": "_hasTrailingIcon()",
        "[class.mdc-evolution-chip--with-primary-icon]": "leadingIcon",
        "[class.mdc-evolution-chip--with-primary-graphic]": "_hasLeadingGraphic()",
        "[class.mdc-evolution-chip--with-avatar]": "leadingIcon",
        "[class.mat-mdc-chip-highlighted]": "highlighted",
        "[class.mat-mdc-chip-with-trailing-icon]": "_hasTrailingIcon()",
        "[attr.tabindex]": "null",
        "[attr.aria-label]": "null",
        "[attr.aria-description]": "null",
        "[attr.role]": "role",
        "[id]": "id"
      },
      providers: [{
        provide: MatChip,
        useExisting: MatChipOption
      }, {
        provide: MAT_CHIP,
        useExisting: MatChipOption
      }],
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [MatChipAction],
      template: '<span class="mat-mdc-chip-focus-overlay"></span>\n\n<span class="mdc-evolution-chip__cell mdc-evolution-chip__cell--primary">\n  <button\n    matChipAction\n    [_allowFocusWhenDisabled]="true"\n    [attr.aria-description]="ariaDescription"\n    [attr.aria-label]="ariaLabel"\n    [attr.aria-selected]="ariaSelected"\n    role="option">\n    @if (_hasLeadingGraphic()) {\n      <span class="mdc-evolution-chip__graphic mat-mdc-chip-graphic">\n        <ng-content select="mat-chip-avatar, [matChipAvatar]"></ng-content>\n        <span class="mdc-evolution-chip__checkmark">\n          <svg\n            class="mdc-evolution-chip__checkmark-svg"\n            viewBox="-2 -3 30 30"\n            focusable="false"\n            aria-hidden="true">\n            <path class="mdc-evolution-chip__checkmark-path"\n                  fill="none" stroke="currentColor" d="M1.73,12.91 8.1,19.28 22.79,4.59" />\n          </svg>\n        </span>\n      </span>\n    }\n    <span class="mdc-evolution-chip__text-label mat-mdc-chip-action-label">\n      <ng-content></ng-content>\n      <span class="mat-mdc-chip-primary-focus-indicator mat-focus-indicator"></span>\n    </span>\n  </button>\n</span>\n\n@if (_hasTrailingIcon()) {\n  <span class="mdc-evolution-chip__cell mdc-evolution-chip__cell--trailing">\n    <ng-content select="mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"></ng-content>\n  </span>\n}\n',
      styles: ['.mdc-evolution-chip,\n.mdc-evolution-chip__cell,\n.mdc-evolution-chip__action {\n  display: inline-flex;\n  align-items: center;\n}\n\n.mdc-evolution-chip {\n  position: relative;\n  max-width: 100%;\n}\n\n.mdc-evolution-chip__cell,\n.mdc-evolution-chip__action {\n  height: 100%;\n}\n\n.mdc-evolution-chip__cell--primary {\n  flex-basis: 100%;\n  overflow-x: hidden;\n}\n\n.mdc-evolution-chip__cell--trailing {\n  flex: 1 0 auto;\n}\n\n.mdc-evolution-chip__action {\n  align-items: center;\n  background: none;\n  border: none;\n  box-sizing: content-box;\n  cursor: pointer;\n  display: inline-flex;\n  justify-content: center;\n  outline: none;\n  padding: 0;\n  text-decoration: none;\n  color: inherit;\n}\n\n.mdc-evolution-chip__action--presentational {\n  cursor: auto;\n}\n\n.mdc-evolution-chip--disabled,\n.mdc-evolution-chip__action:disabled {\n  pointer-events: none;\n}\n@media (forced-colors: active) {\n  .mdc-evolution-chip--disabled,\n  .mdc-evolution-chip__action:disabled {\n    forced-color-adjust: none;\n  }\n}\n\n.mdc-evolution-chip__action--primary {\n  font: inherit;\n  letter-spacing: inherit;\n  white-space: inherit;\n  overflow-x: hidden;\n}\n.mat-mdc-standard-chip .mdc-evolution-chip__action--primary::before {\n  border-width: var(--mat-chip-outline-width, 1px);\n  border-radius: var(--mat-chip-container-shape-radius, 8px);\n  box-sizing: border-box;\n  content: "";\n  height: 100%;\n  left: 0;\n  position: absolute;\n  pointer-events: none;\n  top: 0;\n  width: 100%;\n  z-index: 1;\n  border-style: solid;\n}\n.mat-mdc-standard-chip .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 12px;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 12px;\n}\n[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 0;\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--primary::before {\n  border-color: var(--mat-chip-outline-color, var(--mat-sys-outline));\n}\n.mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus::before {\n  border-color: var(--mat-chip-focus-outline-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--primary::before {\n  border-color: var(--mat-chip-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary::before {\n  border-width: var(--mat-chip-flat-selected-outline-width, 0);\n}\n.mat-mdc-basic-chip .mdc-evolution-chip__action--primary {\n  font: inherit;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 12px;\n}\n[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 0;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 0;\n}\n[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 12px;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 12px;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 0;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.mdc-evolution-chip__action--secondary {\n  position: relative;\n  overflow: visible;\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--secondary {\n  color: var(--mat-chip-with-trailing-icon-trailing-icon-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--secondary {\n  color: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-color, var(--mat-sys-on-surface));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n\n.mdc-evolution-chip__text-label {\n  -webkit-user-select: none;\n  user-select: none;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.mat-mdc-standard-chip .mdc-evolution-chip__text-label {\n  font-family: var(--mat-chip-label-text-font, var(--mat-sys-label-large-font));\n  line-height: var(--mat-chip-label-text-line-height, var(--mat-sys-label-large-line-height));\n  font-size: var(--mat-chip-label-text-size, var(--mat-sys-label-large-size));\n  font-weight: var(--mat-chip-label-text-weight, var(--mat-sys-label-large-weight));\n  letter-spacing: var(--mat-chip-label-text-tracking, var(--mat-sys-label-large-tracking));\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {\n  color: var(--mat-chip-label-text-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {\n  color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label, .mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label {\n  color: var(--mat-chip-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n\n.mdc-evolution-chip__graphic {\n  align-items: center;\n  display: inline-flex;\n  justify-content: center;\n  overflow: hidden;\n  pointer-events: none;\n  position: relative;\n  flex: 1 0 auto;\n}\n.mat-mdc-standard-chip .mdc-evolution-chip__graphic {\n  width: var(--mat-chip-with-avatar-avatar-size, 24px);\n  height: var(--mat-chip-with-avatar-avatar-size, 24px);\n  font-size: var(--mat-chip-with-avatar-avatar-size, 24px);\n}\n.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic {\n  transition: width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic {\n  width: 0;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {\n  padding-left: 6px;\n  padding-right: 6px;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {\n  padding-left: 4px;\n  padding-right: 8px;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {\n  padding-left: 8px;\n  padding-right: 4px;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {\n  padding-left: 6px;\n  padding-right: 6px;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {\n  padding-left: 4px;\n  padding-right: 8px;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {\n  padding-left: 8px;\n  padding-right: 4px;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__graphic {\n  padding-left: 0;\n}\n\n.mdc-evolution-chip__checkmark {\n  position: absolute;\n  opacity: 0;\n  top: 50%;\n  left: 50%;\n  height: 20px;\n  width: 20px;\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark {\n  color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark {\n  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));\n}\n.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark {\n  transition: transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);\n  transform: translate(-75%, -50%);\n}\n.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {\n  transform: translate(-50%, -50%);\n  opacity: 1;\n}\n\n.mdc-evolution-chip__checkmark-svg {\n  display: block;\n}\n\n.mdc-evolution-chip__checkmark-path {\n  stroke-width: 2px;\n  stroke-dasharray: 29.7833385;\n  stroke-dashoffset: 29.7833385;\n  stroke: currentColor;\n}\n.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path {\n  transition: stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path {\n  stroke-dashoffset: 0;\n}\n@media (forced-colors: active) {\n  .mdc-evolution-chip__checkmark-path {\n    stroke: CanvasText !important;\n  }\n}\n\n.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing {\n  height: 18px;\n  width: 18px;\n  font-size: 18px;\n}\n.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove {\n  opacity: calc(var(--mat-chip-trailing-action-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));\n}\n.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove:focus {\n  opacity: calc(var(--mat-chip-trailing-action-focus-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));\n}\n\n.mat-mdc-standard-chip {\n  border-radius: var(--mat-chip-container-shape-radius, 8px);\n  height: var(--mat-chip-container-height, 32px);\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) {\n  background-color: var(--mat-chip-elevated-container-color, transparent);\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled {\n  background-color: var(--mat-chip-elevated-disabled-container-color);\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) {\n  background-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled {\n  background-color: var(--mat-chip-flat-disabled-selected-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n@media (forced-colors: active) {\n  .mat-mdc-standard-chip {\n    outline: solid 1px;\n  }\n}\n\n.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary {\n  border-radius: var(--mat-chip-with-avatar-avatar-shape-radius, 24px);\n  width: var(--mat-chip-with-icon-icon-size, 18px);\n  height: var(--mat-chip-with-icon-icon-size, 18px);\n  font-size: var(--mat-chip-with-icon-icon-size, 18px);\n}\n.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary {\n  opacity: 0;\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary {\n  color: var(--mat-chip-with-icon-icon-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary {\n  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));\n}\n\n.mat-mdc-chip-highlighted {\n  --mat-chip-with-icon-icon-color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));\n  --mat-chip-elevated-container-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));\n  --mat-chip-label-text-color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));\n  --mat-chip-outline-width: var(--mat-chip-flat-selected-outline-width, 0);\n}\n\n.mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-chip-selected .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-hover-state-layer-color, var(--mat-sys-on-surface-variant));\n  opacity: var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-chip-focus-overlay .mat-mdc-chip-selected:hover, .mat-mdc-chip-highlighted:hover .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-selected-hover-state-layer-color, var(--mat-sys-on-secondary-container));\n  opacity: var(--mat-chip-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));\n  opacity: var(--mat-chip-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-chip-selected.cdk-focused .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted.cdk-focused .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));\n  opacity: var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n\n.mdc-evolution-chip--disabled:not(.mdc-evolution-chip--selected) .mat-mdc-chip-avatar {\n  opacity: var(--mat-chip-with-avatar-disabled-avatar-opacity, 0.38);\n}\n\n.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {\n  opacity: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38);\n}\n\n.mdc-evolution-chip--disabled.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {\n  opacity: var(--mat-chip-with-icon-disabled-icon-opacity, 0.38);\n}\n\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled {\n  opacity: var(--mat-chip-disabled-container-opacity, 1);\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted .mdc-evolution-chip__icon--trailing {\n  color: var(--mat-chip-selected-trailing-icon-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {\n  color: var(--mat-chip-selected-disabled-trailing-icon-color, var(--mat-sys-on-surface));\n}\n\n.mat-mdc-chip-edit, .mat-mdc-chip-remove {\n  opacity: var(--mat-chip-trailing-action-opacity, 1);\n}\n.mat-mdc-chip-edit:focus, .mat-mdc-chip-remove:focus {\n  opacity: var(--mat-chip-trailing-action-focus-opacity, 1);\n}\n.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {\n  background-color: var(--mat-chip-trailing-action-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-chip-edit:hover::after, .mat-mdc-chip-remove:hover::after {\n  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));\n}\n.mat-mdc-chip-edit:focus::after, .mat-mdc-chip-remove:focus::after {\n  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));\n}\n\n.mat-mdc-chip-selected .mat-mdc-chip-remove::after,\n.mat-mdc-chip-highlighted .mat-mdc-chip-remove::after {\n  background-color: var(--mat-chip-selected-trailing-action-state-layer-color, var(--mat-sys-on-secondary-container));\n}\n\n.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:focus::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:focus::after {\n  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));\n}\n.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:hover::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:hover::after {\n  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));\n}\n\n.mat-mdc-standard-chip {\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-standard-chip .mat-mdc-chip-graphic,\n.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon {\n  box-sizing: content-box;\n}\n.mat-mdc-standard-chip._mat-animation-noopable,\n.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,\n.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,\n.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path {\n  transition-duration: 1ms;\n  animation-duration: 1ms;\n}\n\n.mat-mdc-chip-focus-overlay {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  opacity: 0;\n  border-radius: inherit;\n  transition: opacity 150ms linear;\n}\n._mat-animation-noopable .mat-mdc-chip-focus-overlay {\n  transition: none;\n}\n.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay {\n  display: none;\n}\n\n.mat-mdc-chip .mat-ripple.mat-mdc-chip-ripple {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n\n.mat-mdc-chip-avatar {\n  text-align: center;\n  line-height: 1;\n  color: var(--mat-chip-with-icon-icon-color, currentColor);\n}\n\n.mat-mdc-chip {\n  position: relative;\n  z-index: 0;\n}\n\n.mat-mdc-chip-action-label {\n  text-align: left;\n  z-index: 1;\n}\n[dir=rtl] .mat-mdc-chip-action-label {\n  text-align: right;\n}\n.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label {\n  position: relative;\n}\n.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  pointer-events: none;\n}\n.mat-mdc-chip-action-label .mat-focus-indicator::before {\n  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);\n}\n\n.mat-mdc-chip-edit::before, .mat-mdc-chip-remove::before {\n  margin: calc(var(--mat-focus-indicator-border-width, 3px) * -1);\n  left: 8px;\n  right: 8px;\n}\n.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {\n  content: "";\n  display: block;\n  opacity: 0;\n  position: absolute;\n  top: -3px;\n  bottom: -3px;\n  left: 5px;\n  right: 5px;\n  border-radius: 50%;\n  box-sizing: border-box;\n  padding: 12px;\n  margin: -12px;\n  background-clip: content-box;\n}\n.mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {\n  width: 18px;\n  height: 18px;\n  font-size: 18px;\n  box-sizing: content-box;\n}\n\n.mat-chip-edit-input {\n  cursor: text;\n  display: inline-block;\n  color: inherit;\n  outline: 0;\n}\n\n@media (forced-colors: active) {\n  .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple) {\n    outline-width: 3px;\n  }\n}\n\n.mat-mdc-chip-action:focus-visible .mat-focus-indicator::before {\n  content: "";\n}\n\n.mdc-evolution-chip__icon, .mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {\n  min-height: fit-content;\n}\n\nimg.mdc-evolution-chip__icon {\n  min-height: 0;\n}\n']
    }]
  }], null, {
    selectable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    selected: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    selectionChange: [{
      type: Output
    }]
  });
})();
var MatChipEditInput = class _MatChipEditInput {
  _elementRef = inject(ElementRef);
  _document = inject(DOCUMENT);
  constructor() {
  }
  initialize(initialValue) {
    this.getNativeElement().focus();
    this.setValue(initialValue);
  }
  getNativeElement() {
    return this._elementRef.nativeElement;
  }
  setValue(value) {
    this.getNativeElement().textContent = value;
    this._moveCursorToEndOfInput();
  }
  getValue() {
    return this.getNativeElement().textContent || "";
  }
  _moveCursorToEndOfInput() {
    const range = this._document.createRange();
    range.selectNodeContents(this.getNativeElement());
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
  static ɵfac = function MatChipEditInput_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatChipEditInput)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MatChipEditInput,
    selectors: [["span", "matChipEditInput", ""]],
    hostAttrs: ["role", "textbox", "tabindex", "-1", "contenteditable", "true", 1, "mat-chip-edit-input"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatChipEditInput, [{
    type: Directive,
    args: [{
      selector: "span[matChipEditInput]",
      host: {
        "class": "mat-chip-edit-input",
        "role": "textbox",
        "tabindex": "-1",
        "contenteditable": "true"
      }
    }]
  }], () => [], null);
})();
var MatChipRow = class _MatChipRow extends MatChip {
  basicChipAttrName = "mat-basic-chip-row";
  _renderer = inject(Renderer2);
  _cleanupMousedown;
  _editStartPending = false;
  editable = false;
  edited = new EventEmitter();
  defaultEditInput;
  contentEditInput;
  _alreadyFocused = false;
  _isEditing = false;
  constructor() {
    super();
    this.role = "row";
    this._onBlur.pipe(takeUntil(this.destroyed)).subscribe(() => {
      if (this._isEditing && !this._editStartPending) {
        this._onEditFinish();
      }
      this._alreadyFocused = false;
    });
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this._cleanupMousedown = this._ngZone.runOutsideAngular(() => this._renderer.listen(this._elementRef.nativeElement, "mousedown", () => {
      this._alreadyFocused = this._hasFocus();
    }));
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this._cleanupMousedown?.();
  }
  _hasLeadingActionIcon() {
    return !this._isEditing && !!this.editIcon;
  }
  _hasTrailingIcon() {
    return !this._isEditing && super._hasTrailingIcon();
  }
  _handleFocus() {
    if (!this._isEditing && !this.disabled) {
      this.focus();
    }
  }
  _handleKeydown(event) {
    if (event.keyCode === ENTER && !this.disabled) {
      if (this._isEditing) {
        event.preventDefault();
        this._onEditFinish();
      } else if (this.editable) {
        this._startEditing(event);
      }
    } else if (this._isEditing) {
      event.stopPropagation();
    } else {
      super._handleKeydown(event);
    }
  }
  _handleClick(event) {
    if (!this.disabled && this.editable && !this._isEditing && this._alreadyFocused) {
      event.preventDefault();
      event.stopPropagation();
      this._startEditing(event);
    }
  }
  _handleDoubleclick(event) {
    if (!this.disabled && this.editable) {
      this._startEditing(event);
    }
  }
  _edit() {
    this._changeDetectorRef.markForCheck();
    this._startEditing();
  }
  _startEditing(event) {
    if (!this.primaryAction || this.removeIcon && !!event && this._getSourceAction(event.target) === this.removeIcon) {
      return;
    }
    const value = this.value;
    this._isEditing = this._editStartPending = true;
    afterNextRender(() => {
      this._getEditInput().initialize(value);
      setTimeout(() => this._ngZone.run(() => this._editStartPending = false));
    }, {
      injector: this._injector
    });
  }
  _onEditFinish() {
    this._isEditing = this._editStartPending = false;
    this.edited.emit({
      chip: this,
      value: this._getEditInput().getValue()
    });
    if (this._document.activeElement === this._getEditInput().getNativeElement() || this._document.activeElement === this._document.body) {
      this.primaryAction.focus();
    }
  }
  _isRippleDisabled() {
    return super._isRippleDisabled() || this._isEditing;
  }
  _getEditInput() {
    return this.contentEditInput || this.defaultEditInput;
  }
  static ɵfac = function MatChipRow_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatChipRow)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MatChipRow,
    selectors: [["mat-chip-row"], ["", "mat-chip-row", ""], ["mat-basic-chip-row"], ["", "mat-basic-chip-row", ""]],
    contentQueries: function MatChipRow_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, MatChipEditInput, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contentEditInput = _t.first);
      }
    },
    viewQuery: function MatChipRow_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(MatChipEditInput, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.defaultEditInput = _t.first);
      }
    },
    hostAttrs: [1, "mat-mdc-chip", "mat-mdc-chip-row", "mdc-evolution-chip"],
    hostVars: 29,
    hostBindings: function MatChipRow_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("focus", function MatChipRow_focus_HostBindingHandler() {
          return ctx._handleFocus();
        })("click", function MatChipRow_click_HostBindingHandler($event) {
          return ctx._hasInteractiveActions() ? ctx._handleClick($event) : null;
        })("dblclick", function MatChipRow_dblclick_HostBindingHandler($event) {
          return ctx._handleDoubleclick($event);
        });
      }
      if (rf & 2) {
        ɵɵdomProperty("id", ctx.id);
        ɵɵattribute("tabindex", ctx.disabled ? null : -1)("aria-label", null)("aria-description", null)("role", ctx.role);
        ɵɵclassProp("mat-mdc-chip-with-avatar", ctx.leadingIcon)("mat-mdc-chip-disabled", ctx.disabled)("mat-mdc-chip-editing", ctx._isEditing)("mat-mdc-chip-editable", ctx.editable)("mdc-evolution-chip--disabled", ctx.disabled)("mdc-evolution-chip--with-leading-action", ctx._hasLeadingActionIcon())("mdc-evolution-chip--with-trailing-action", ctx._hasTrailingIcon())("mdc-evolution-chip--with-primary-graphic", ctx.leadingIcon)("mdc-evolution-chip--with-primary-icon", ctx.leadingIcon)("mdc-evolution-chip--with-avatar", ctx.leadingIcon)("mat-mdc-chip-highlighted", ctx.highlighted)("mat-mdc-chip-with-trailing-icon", ctx._hasTrailingIcon());
      }
    },
    inputs: {
      editable: "editable"
    },
    outputs: {
      edited: "edited"
    },
    features: [ɵɵProvidersFeature([{
      provide: MatChip,
      useExisting: _MatChipRow
    }, {
      provide: MAT_CHIP,
      useExisting: _MatChipRow
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c42,
    decls: 9,
    vars: 8,
    consts: [[1, "mat-mdc-chip-focus-overlay"], ["role", "gridcell", 1, "mdc-evolution-chip__cell", "mdc-evolution-chip__cell--leading"], ["role", "gridcell", "matChipAction", "", 1, "mdc-evolution-chip__cell", "mdc-evolution-chip__cell--primary", 3, "disabled"], [1, "mdc-evolution-chip__graphic", "mat-mdc-chip-graphic"], [1, "mdc-evolution-chip__text-label", "mat-mdc-chip-action-label"], ["aria-hidden", "true", 1, "mat-mdc-chip-primary-focus-indicator", "mat-focus-indicator"], ["role", "gridcell", 1, "mdc-evolution-chip__cell", "mdc-evolution-chip__cell--trailing"], ["matChipEditInput", ""]],
    template: function MatChipRow_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef(_c32);
        ɵɵconditionalCreate(0, MatChipRow_Conditional_0_Template, 1, 0, "span", 0);
        ɵɵconditionalCreate(1, MatChipRow_Conditional_1_Template, 2, 0, "span", 1);
        ɵɵelementStart(2, "span", 2);
        ɵɵconditionalCreate(3, MatChipRow_Conditional_3_Template, 2, 0, "span", 3);
        ɵɵelementStart(4, "span", 4);
        ɵɵconditionalCreate(5, MatChipRow_Conditional_5_Template, 2, 1)(6, MatChipRow_Conditional_6_Template, 1, 0);
        ɵɵelement(7, "span", 5);
        ɵɵelementEnd()();
        ɵɵconditionalCreate(8, MatChipRow_Conditional_8_Template, 2, 0, "span", 6);
      }
      if (rf & 2) {
        ɵɵconditional(!ctx._isEditing ? 0 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx._hasLeadingActionIcon() ? 1 : -1);
        ɵɵadvance();
        ɵɵproperty("disabled", ctx.disabled);
        ɵɵattribute("aria-description", ctx.ariaDescription)("aria-label", ctx.ariaLabel);
        ɵɵadvance();
        ɵɵconditional(ctx.leadingIcon ? 3 : -1);
        ɵɵadvance(2);
        ɵɵconditional(ctx._isEditing ? 5 : 6);
        ɵɵadvance(3);
        ɵɵconditional(ctx._hasTrailingIcon() ? 8 : -1);
      }
    },
    dependencies: [MatChipAction, MatChipEditInput],
    styles: [_c22],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatChipRow, [{
    type: Component,
    args: [{
      selector: "mat-chip-row, [mat-chip-row], mat-basic-chip-row, [mat-basic-chip-row]",
      host: {
        "class": "mat-mdc-chip mat-mdc-chip-row mdc-evolution-chip",
        "[class.mat-mdc-chip-with-avatar]": "leadingIcon",
        "[class.mat-mdc-chip-disabled]": "disabled",
        "[class.mat-mdc-chip-editing]": "_isEditing",
        "[class.mat-mdc-chip-editable]": "editable",
        "[class.mdc-evolution-chip--disabled]": "disabled",
        "[class.mdc-evolution-chip--with-leading-action]": "_hasLeadingActionIcon()",
        "[class.mdc-evolution-chip--with-trailing-action]": "_hasTrailingIcon()",
        "[class.mdc-evolution-chip--with-primary-graphic]": "leadingIcon",
        "[class.mdc-evolution-chip--with-primary-icon]": "leadingIcon",
        "[class.mdc-evolution-chip--with-avatar]": "leadingIcon",
        "[class.mat-mdc-chip-highlighted]": "highlighted",
        "[class.mat-mdc-chip-with-trailing-icon]": "_hasTrailingIcon()",
        "[id]": "id",
        "[attr.tabindex]": "disabled ? null : -1",
        "[attr.aria-label]": "null",
        "[attr.aria-description]": "null",
        "[attr.role]": "role",
        "(focus)": "_handleFocus()",
        "(click)": "this._hasInteractiveActions() ? _handleClick($event) : null",
        "(dblclick)": "_handleDoubleclick($event)"
      },
      providers: [{
        provide: MatChip,
        useExisting: MatChipRow
      }, {
        provide: MAT_CHIP,
        useExisting: MatChipRow
      }],
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [MatChipAction, MatChipEditInput],
      template: '@if (!_isEditing) {\n  <span class="mat-mdc-chip-focus-overlay"></span>\n}\n\n@if (_hasLeadingActionIcon()) {\n  <span class="mdc-evolution-chip__cell mdc-evolution-chip__cell--leading" role="gridcell">\n    <ng-content select="[matChipEdit]"></ng-content>\n  </span>\n}\n<span class="mdc-evolution-chip__cell mdc-evolution-chip__cell--primary" role="gridcell"\n    matChipAction\n    [disabled]="disabled"\n    [attr.aria-description]="ariaDescription"\n    [attr.aria-label]="ariaLabel">\n  @if (leadingIcon) {\n    <span class="mdc-evolution-chip__graphic mat-mdc-chip-graphic">\n      <ng-content select="mat-chip-avatar, [matChipAvatar]"></ng-content>\n    </span>\n  }\n\n  <span class="mdc-evolution-chip__text-label mat-mdc-chip-action-label">\n    @if (_isEditing) {\n      @if (contentEditInput) {\n        <ng-content select="[matChipEditInput]"></ng-content>\n      } @else {\n        <span matChipEditInput></span>\n      }\n    } @else {\n      <ng-content></ng-content>\n    }\n\n    <span class="mat-mdc-chip-primary-focus-indicator mat-focus-indicator" aria-hidden="true"></span>\n  </span>\n</span>\n\n@if (_hasTrailingIcon()) {\n  <span\n    class="mdc-evolution-chip__cell mdc-evolution-chip__cell--trailing"\n    role="gridcell">\n    <ng-content select="mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"></ng-content>\n  </span>\n}\n',
      styles: ['.mdc-evolution-chip,\n.mdc-evolution-chip__cell,\n.mdc-evolution-chip__action {\n  display: inline-flex;\n  align-items: center;\n}\n\n.mdc-evolution-chip {\n  position: relative;\n  max-width: 100%;\n}\n\n.mdc-evolution-chip__cell,\n.mdc-evolution-chip__action {\n  height: 100%;\n}\n\n.mdc-evolution-chip__cell--primary {\n  flex-basis: 100%;\n  overflow-x: hidden;\n}\n\n.mdc-evolution-chip__cell--trailing {\n  flex: 1 0 auto;\n}\n\n.mdc-evolution-chip__action {\n  align-items: center;\n  background: none;\n  border: none;\n  box-sizing: content-box;\n  cursor: pointer;\n  display: inline-flex;\n  justify-content: center;\n  outline: none;\n  padding: 0;\n  text-decoration: none;\n  color: inherit;\n}\n\n.mdc-evolution-chip__action--presentational {\n  cursor: auto;\n}\n\n.mdc-evolution-chip--disabled,\n.mdc-evolution-chip__action:disabled {\n  pointer-events: none;\n}\n@media (forced-colors: active) {\n  .mdc-evolution-chip--disabled,\n  .mdc-evolution-chip__action:disabled {\n    forced-color-adjust: none;\n  }\n}\n\n.mdc-evolution-chip__action--primary {\n  font: inherit;\n  letter-spacing: inherit;\n  white-space: inherit;\n  overflow-x: hidden;\n}\n.mat-mdc-standard-chip .mdc-evolution-chip__action--primary::before {\n  border-width: var(--mat-chip-outline-width, 1px);\n  border-radius: var(--mat-chip-container-shape-radius, 8px);\n  box-sizing: border-box;\n  content: "";\n  height: 100%;\n  left: 0;\n  position: absolute;\n  pointer-events: none;\n  top: 0;\n  width: 100%;\n  z-index: 1;\n  border-style: solid;\n}\n.mat-mdc-standard-chip .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 12px;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 12px;\n}\n[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 0;\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--primary::before {\n  border-color: var(--mat-chip-outline-color, var(--mat-sys-outline));\n}\n.mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus::before {\n  border-color: var(--mat-chip-focus-outline-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--primary::before {\n  border-color: var(--mat-chip-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary::before {\n  border-width: var(--mat-chip-flat-selected-outline-width, 0);\n}\n.mat-mdc-basic-chip .mdc-evolution-chip__action--primary {\n  font: inherit;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 12px;\n}\n[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 0;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 0;\n}\n[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 12px;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 12px;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {\n  padding-left: 12px;\n  padding-right: 0;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.mdc-evolution-chip__action--secondary {\n  position: relative;\n  overflow: visible;\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--secondary {\n  color: var(--mat-chip-with-trailing-icon-trailing-icon-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--secondary {\n  color: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-color, var(--mat-sys-on-surface));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n\n.mdc-evolution-chip__text-label {\n  -webkit-user-select: none;\n  user-select: none;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.mat-mdc-standard-chip .mdc-evolution-chip__text-label {\n  font-family: var(--mat-chip-label-text-font, var(--mat-sys-label-large-font));\n  line-height: var(--mat-chip-label-text-line-height, var(--mat-sys-label-large-line-height));\n  font-size: var(--mat-chip-label-text-size, var(--mat-sys-label-large-size));\n  font-weight: var(--mat-chip-label-text-weight, var(--mat-sys-label-large-weight));\n  letter-spacing: var(--mat-chip-label-text-tracking, var(--mat-sys-label-large-tracking));\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {\n  color: var(--mat-chip-label-text-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {\n  color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label, .mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label {\n  color: var(--mat-chip-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n\n.mdc-evolution-chip__graphic {\n  align-items: center;\n  display: inline-flex;\n  justify-content: center;\n  overflow: hidden;\n  pointer-events: none;\n  position: relative;\n  flex: 1 0 auto;\n}\n.mat-mdc-standard-chip .mdc-evolution-chip__graphic {\n  width: var(--mat-chip-with-avatar-avatar-size, 24px);\n  height: var(--mat-chip-with-avatar-avatar-size, 24px);\n  font-size: var(--mat-chip-with-avatar-avatar-size, 24px);\n}\n.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic {\n  transition: width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic {\n  width: 0;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {\n  padding-left: 6px;\n  padding-right: 6px;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {\n  padding-left: 4px;\n  padding-right: 8px;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {\n  padding-left: 8px;\n  padding-right: 4px;\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {\n  padding-left: 6px;\n  padding-right: 6px;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {\n  padding-left: 4px;\n  padding-right: 8px;\n}\n[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {\n  padding-left: 8px;\n  padding-right: 4px;\n}\n.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__graphic {\n  padding-left: 0;\n}\n\n.mdc-evolution-chip__checkmark {\n  position: absolute;\n  opacity: 0;\n  top: 50%;\n  left: 50%;\n  height: 20px;\n  width: 20px;\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark {\n  color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark {\n  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));\n}\n.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark {\n  transition: transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);\n  transform: translate(-75%, -50%);\n}\n.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {\n  transform: translate(-50%, -50%);\n  opacity: 1;\n}\n\n.mdc-evolution-chip__checkmark-svg {\n  display: block;\n}\n\n.mdc-evolution-chip__checkmark-path {\n  stroke-width: 2px;\n  stroke-dasharray: 29.7833385;\n  stroke-dashoffset: 29.7833385;\n  stroke: currentColor;\n}\n.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path {\n  transition: stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path {\n  stroke-dashoffset: 0;\n}\n@media (forced-colors: active) {\n  .mdc-evolution-chip__checkmark-path {\n    stroke: CanvasText !important;\n  }\n}\n\n.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing {\n  height: 18px;\n  width: 18px;\n  font-size: 18px;\n}\n.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove {\n  opacity: calc(var(--mat-chip-trailing-action-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));\n}\n.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove:focus {\n  opacity: calc(var(--mat-chip-trailing-action-focus-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));\n}\n\n.mat-mdc-standard-chip {\n  border-radius: var(--mat-chip-container-shape-radius, 8px);\n  height: var(--mat-chip-container-height, 32px);\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) {\n  background-color: var(--mat-chip-elevated-container-color, transparent);\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled {\n  background-color: var(--mat-chip-elevated-disabled-container-color);\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) {\n  background-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled {\n  background-color: var(--mat-chip-flat-disabled-selected-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n@media (forced-colors: active) {\n  .mat-mdc-standard-chip {\n    outline: solid 1px;\n  }\n}\n\n.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary {\n  border-radius: var(--mat-chip-with-avatar-avatar-shape-radius, 24px);\n  width: var(--mat-chip-with-icon-icon-size, 18px);\n  height: var(--mat-chip-with-icon-icon-size, 18px);\n  font-size: var(--mat-chip-with-icon-icon-size, 18px);\n}\n.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary {\n  opacity: 0;\n}\n.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary {\n  color: var(--mat-chip-with-icon-icon-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary {\n  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));\n}\n\n.mat-mdc-chip-highlighted {\n  --mat-chip-with-icon-icon-color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));\n  --mat-chip-elevated-container-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));\n  --mat-chip-label-text-color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));\n  --mat-chip-outline-width: var(--mat-chip-flat-selected-outline-width, 0);\n}\n\n.mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-chip-selected .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-hover-state-layer-color, var(--mat-sys-on-surface-variant));\n  opacity: var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-chip-focus-overlay .mat-mdc-chip-selected:hover, .mat-mdc-chip-highlighted:hover .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-selected-hover-state-layer-color, var(--mat-sys-on-secondary-container));\n  opacity: var(--mat-chip-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));\n  opacity: var(--mat-chip-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-chip-selected.cdk-focused .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted.cdk-focused .mat-mdc-chip-focus-overlay {\n  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));\n  opacity: var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n\n.mdc-evolution-chip--disabled:not(.mdc-evolution-chip--selected) .mat-mdc-chip-avatar {\n  opacity: var(--mat-chip-with-avatar-disabled-avatar-opacity, 0.38);\n}\n\n.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {\n  opacity: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38);\n}\n\n.mdc-evolution-chip--disabled.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {\n  opacity: var(--mat-chip-with-icon-disabled-icon-opacity, 0.38);\n}\n\n.mat-mdc-standard-chip.mdc-evolution-chip--disabled {\n  opacity: var(--mat-chip-disabled-container-opacity, 1);\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted .mdc-evolution-chip__icon--trailing {\n  color: var(--mat-chip-selected-trailing-icon-color, var(--mat-sys-on-secondary-container));\n}\n.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {\n  color: var(--mat-chip-selected-disabled-trailing-icon-color, var(--mat-sys-on-surface));\n}\n\n.mat-mdc-chip-edit, .mat-mdc-chip-remove {\n  opacity: var(--mat-chip-trailing-action-opacity, 1);\n}\n.mat-mdc-chip-edit:focus, .mat-mdc-chip-remove:focus {\n  opacity: var(--mat-chip-trailing-action-focus-opacity, 1);\n}\n.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {\n  background-color: var(--mat-chip-trailing-action-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-chip-edit:hover::after, .mat-mdc-chip-remove:hover::after {\n  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));\n}\n.mat-mdc-chip-edit:focus::after, .mat-mdc-chip-remove:focus::after {\n  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));\n}\n\n.mat-mdc-chip-selected .mat-mdc-chip-remove::after,\n.mat-mdc-chip-highlighted .mat-mdc-chip-remove::after {\n  background-color: var(--mat-chip-selected-trailing-action-state-layer-color, var(--mat-sys-on-secondary-container));\n}\n\n.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:focus::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:focus::after {\n  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));\n}\n.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:hover::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:hover::after {\n  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));\n}\n\n.mat-mdc-standard-chip {\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-standard-chip .mat-mdc-chip-graphic,\n.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon {\n  box-sizing: content-box;\n}\n.mat-mdc-standard-chip._mat-animation-noopable,\n.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,\n.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,\n.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path {\n  transition-duration: 1ms;\n  animation-duration: 1ms;\n}\n\n.mat-mdc-chip-focus-overlay {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  opacity: 0;\n  border-radius: inherit;\n  transition: opacity 150ms linear;\n}\n._mat-animation-noopable .mat-mdc-chip-focus-overlay {\n  transition: none;\n}\n.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay {\n  display: none;\n}\n\n.mat-mdc-chip .mat-ripple.mat-mdc-chip-ripple {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n\n.mat-mdc-chip-avatar {\n  text-align: center;\n  line-height: 1;\n  color: var(--mat-chip-with-icon-icon-color, currentColor);\n}\n\n.mat-mdc-chip {\n  position: relative;\n  z-index: 0;\n}\n\n.mat-mdc-chip-action-label {\n  text-align: left;\n  z-index: 1;\n}\n[dir=rtl] .mat-mdc-chip-action-label {\n  text-align: right;\n}\n.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label {\n  position: relative;\n}\n.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  pointer-events: none;\n}\n.mat-mdc-chip-action-label .mat-focus-indicator::before {\n  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);\n}\n\n.mat-mdc-chip-edit::before, .mat-mdc-chip-remove::before {\n  margin: calc(var(--mat-focus-indicator-border-width, 3px) * -1);\n  left: 8px;\n  right: 8px;\n}\n.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {\n  content: "";\n  display: block;\n  opacity: 0;\n  position: absolute;\n  top: -3px;\n  bottom: -3px;\n  left: 5px;\n  right: 5px;\n  border-radius: 50%;\n  box-sizing: border-box;\n  padding: 12px;\n  margin: -12px;\n  background-clip: content-box;\n}\n.mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {\n  width: 18px;\n  height: 18px;\n  font-size: 18px;\n  box-sizing: content-box;\n}\n\n.mat-chip-edit-input {\n  cursor: text;\n  display: inline-block;\n  color: inherit;\n  outline: 0;\n}\n\n@media (forced-colors: active) {\n  .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple) {\n    outline-width: 3px;\n  }\n}\n\n.mat-mdc-chip-action:focus-visible .mat-focus-indicator::before {\n  content: "";\n}\n\n.mdc-evolution-chip__icon, .mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {\n  min-height: fit-content;\n}\n\nimg.mdc-evolution-chip__icon {\n  min-height: 0;\n}\n']
    }]
  }], () => [], {
    editable: [{
      type: Input
    }],
    edited: [{
      type: Output
    }],
    defaultEditInput: [{
      type: ViewChild,
      args: [MatChipEditInput]
    }],
    contentEditInput: [{
      type: ContentChild,
      args: [MatChipEditInput]
    }]
  });
})();
var MatChipSet = class _MatChipSet {
  _elementRef = inject(ElementRef);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _dir = inject(Directionality, {
    optional: true
  });
  _lastDestroyedFocusedChipIndex = null;
  _keyManager;
  _destroyed = new Subject();
  _defaultRole = "presentation";
  get chipFocusChanges() {
    return this._getChipStream((chip) => chip._onFocus);
  }
  get chipDestroyedChanges() {
    return this._getChipStream((chip) => chip.destroyed);
  }
  get chipRemovedChanges() {
    return this._getChipStream((chip) => chip.removed);
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
    this._syncChipsState();
  }
  _disabled = false;
  get empty() {
    return !this._chips || this._chips.length === 0;
  }
  get role() {
    if (this._explicitRole) {
      return this._explicitRole;
    }
    return this.empty ? null : this._defaultRole;
  }
  tabIndex = 0;
  set role(value) {
    this._explicitRole = value;
  }
  _explicitRole = null;
  get focused() {
    return this._hasFocusedChip();
  }
  _chips;
  _chipActions = new QueryList();
  constructor() {
  }
  ngAfterViewInit() {
    this._setUpFocusManagement();
    this._trackChipSetChanges();
    this._trackDestroyedFocusedChip();
  }
  ngOnDestroy() {
    this._keyManager?.destroy();
    this._chipActions.destroy();
    this._destroyed.next();
    this._destroyed.complete();
  }
  _hasFocusedChip() {
    return this._chips && this._chips.some((chip) => chip._hasFocus());
  }
  _syncChipsState() {
    this._chips?.forEach((chip) => {
      chip._chipListDisabled = this._disabled;
      chip._changeDetectorRef.markForCheck();
    });
  }
  focus() {
  }
  _handleKeydown(event) {
    if (this._originatesFromChip(event)) {
      this._keyManager.onKeydown(event);
    }
  }
  _isValidIndex(index) {
    return index >= 0 && index < this._chips.length;
  }
  _allowFocusEscape() {
    const previous = this._elementRef.nativeElement.tabIndex;
    if (previous !== -1) {
      this._elementRef.nativeElement.tabIndex = -1;
      setTimeout(() => this._elementRef.nativeElement.tabIndex = previous);
    }
  }
  _getChipStream(mappingFunction) {
    return this._chips.changes.pipe(startWith(null), switchMap(() => merge(...this._chips.map(mappingFunction))));
  }
  _originatesFromChip(event) {
    let currentElement = event.target;
    while (currentElement && currentElement !== this._elementRef.nativeElement) {
      if (currentElement.classList.contains("mat-mdc-chip")) {
        return true;
      }
      currentElement = currentElement.parentElement;
    }
    return false;
  }
  _setUpFocusManagement() {
    this._chips.changes.pipe(startWith(this._chips)).subscribe((chips) => {
      const actions = [];
      chips.forEach((chip) => chip._getActions().forEach((action) => actions.push(action)));
      this._chipActions.reset(actions);
      this._chipActions.notifyOnChanges();
    });
    this._keyManager = new FocusKeyManager(this._chipActions).withVerticalOrientation().withHorizontalOrientation(this._dir ? this._dir.value : "ltr").withHomeAndEnd().skipPredicate((action) => this._skipPredicate(action));
    this.chipFocusChanges.pipe(takeUntil(this._destroyed)).subscribe(({
      chip
    }) => {
      const action = chip._getSourceAction(document.activeElement);
      if (action) {
        this._keyManager.updateActiveItem(action);
      }
    });
    this._dir?.change.pipe(takeUntil(this._destroyed)).subscribe((direction) => this._keyManager.withHorizontalOrientation(direction));
  }
  _skipPredicate(action) {
    return action.disabled;
  }
  _trackChipSetChanges() {
    this._chips.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
      if (this.disabled) {
        Promise.resolve().then(() => this._syncChipsState());
      }
      this._redirectDestroyedChipFocus();
    });
  }
  _trackDestroyedFocusedChip() {
    this.chipDestroyedChanges.pipe(takeUntil(this._destroyed)).subscribe((event) => {
      const chipArray = this._chips.toArray();
      const chipIndex = chipArray.indexOf(event.chip);
      const hasFocus = event.chip._hasFocus();
      const wasLastFocused = event.chip._hadFocusOnRemove && this._keyManager.activeItem && event.chip._getActions().includes(this._keyManager.activeItem);
      const shouldMoveFocus = hasFocus || wasLastFocused;
      if (this._isValidIndex(chipIndex) && shouldMoveFocus) {
        this._lastDestroyedFocusedChipIndex = chipIndex;
      }
    });
  }
  _redirectDestroyedChipFocus() {
    if (this._lastDestroyedFocusedChipIndex == null) {
      return;
    }
    if (this._chips.length) {
      const newIndex = Math.min(this._lastDestroyedFocusedChipIndex, this._chips.length - 1);
      const chipToFocus = this._chips.toArray()[newIndex];
      if (chipToFocus.disabled) {
        if (this._chips.length === 1) {
          this.focus();
        } else {
          this._keyManager.setPreviousItemActive();
        }
      } else {
        chipToFocus.focus();
      }
    } else {
      this.focus();
    }
    this._lastDestroyedFocusedChipIndex = null;
  }
  static ɵfac = function MatChipSet_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatChipSet)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MatChipSet,
    selectors: [["mat-chip-set"]],
    contentQueries: function MatChipSet_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, MatChip, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._chips = _t);
      }
    },
    hostAttrs: [1, "mat-mdc-chip-set", "mdc-evolution-chip-set"],
    hostVars: 1,
    hostBindings: function MatChipSet_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("keydown", function MatChipSet_keydown_HostBindingHandler($event) {
          return ctx._handleKeydown($event);
        });
      }
      if (rf & 2) {
        ɵɵattribute("role", ctx.role);
      }
    },
    inputs: {
      disabled: [2, "disabled", "disabled", booleanAttribute],
      role: "role",
      tabIndex: [2, "tabIndex", "tabIndex", (value) => value == null ? 0 : numberAttribute(value)]
    },
    ngContentSelectors: _c52,
    decls: 2,
    vars: 0,
    consts: [["role", "presentation", 1, "mdc-evolution-chip-set__chips"]],
    template: function MatChipSet_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵdomElementStart(0, "div", 0);
        ɵɵprojection(1);
        ɵɵdomElementEnd();
      }
    },
    styles: [".mat-mdc-chip-set {\n  display: flex;\n}\n.mat-mdc-chip-set:focus {\n  outline: none;\n}\n.mat-mdc-chip-set .mdc-evolution-chip-set__chips {\n  min-width: 100%;\n  margin-left: -8px;\n  margin-right: 0;\n}\n.mat-mdc-chip-set .mdc-evolution-chip {\n  margin: 4px 0 4px 8px;\n}\n[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip-set__chips {\n  margin-left: 0;\n  margin-right: -8px;\n}\n[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip {\n  margin-left: 0;\n  margin-right: 8px;\n}\n\n.mdc-evolution-chip-set__chips {\n  display: flex;\n  flex-flow: wrap;\n  min-width: 0;\n}\n\n.mat-mdc-chip-set-stacked {\n  flex-direction: column;\n  align-items: flex-start;\n}\n.mat-mdc-chip-set-stacked .mat-mdc-chip {\n  width: 100%;\n}\n.mat-mdc-chip-set-stacked .mdc-evolution-chip__graphic {\n  flex-grow: 0;\n}\n.mat-mdc-chip-set-stacked .mdc-evolution-chip__action--primary {\n  flex-basis: 100%;\n  justify-content: start;\n}\n\ninput.mat-mdc-chip-input {\n  flex: 1 0 150px;\n  margin-left: 8px;\n}\n[dir=rtl] input.mat-mdc-chip-input {\n  margin-left: 0;\n  margin-right: 8px;\n}\n.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::placeholder {\n  opacity: 1;\n}\n.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-moz-placeholder {\n  opacity: 1;\n}\n.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-webkit-input-placeholder {\n  opacity: 1;\n}\n.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input:-ms-input-placeholder {\n  opacity: 1;\n}\n.mat-mdc-chip-set + input.mat-mdc-chip-input {\n  margin-left: 0;\n  margin-right: 0;\n}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatChipSet, [{
    type: Component,
    args: [{
      selector: "mat-chip-set",
      template: `
    <div class="mdc-evolution-chip-set__chips" role="presentation">
      <ng-content></ng-content>
    </div>
  `,
      host: {
        "class": "mat-mdc-chip-set mdc-evolution-chip-set",
        "(keydown)": "_handleKeydown($event)",
        "[attr.role]": "role"
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      styles: [".mat-mdc-chip-set {\n  display: flex;\n}\n.mat-mdc-chip-set:focus {\n  outline: none;\n}\n.mat-mdc-chip-set .mdc-evolution-chip-set__chips {\n  min-width: 100%;\n  margin-left: -8px;\n  margin-right: 0;\n}\n.mat-mdc-chip-set .mdc-evolution-chip {\n  margin: 4px 0 4px 8px;\n}\n[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip-set__chips {\n  margin-left: 0;\n  margin-right: -8px;\n}\n[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip {\n  margin-left: 0;\n  margin-right: 8px;\n}\n\n.mdc-evolution-chip-set__chips {\n  display: flex;\n  flex-flow: wrap;\n  min-width: 0;\n}\n\n.mat-mdc-chip-set-stacked {\n  flex-direction: column;\n  align-items: flex-start;\n}\n.mat-mdc-chip-set-stacked .mat-mdc-chip {\n  width: 100%;\n}\n.mat-mdc-chip-set-stacked .mdc-evolution-chip__graphic {\n  flex-grow: 0;\n}\n.mat-mdc-chip-set-stacked .mdc-evolution-chip__action--primary {\n  flex-basis: 100%;\n  justify-content: start;\n}\n\ninput.mat-mdc-chip-input {\n  flex: 1 0 150px;\n  margin-left: 8px;\n}\n[dir=rtl] input.mat-mdc-chip-input {\n  margin-left: 0;\n  margin-right: 8px;\n}\n.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::placeholder {\n  opacity: 1;\n}\n.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-moz-placeholder {\n  opacity: 1;\n}\n.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-webkit-input-placeholder {\n  opacity: 1;\n}\n.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input:-ms-input-placeholder {\n  opacity: 1;\n}\n.mat-mdc-chip-set + input.mat-mdc-chip-input {\n  margin-left: 0;\n  margin-right: 0;\n}\n"]
    }]
  }], () => [], {
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    role: [{
      type: Input
    }],
    tabIndex: [{
      type: Input,
      args: [{
        transform: (value) => value == null ? 0 : numberAttribute(value)
      }]
    }],
    _chips: [{
      type: ContentChildren,
      args: [MatChip, {
        descendants: true
      }]
    }]
  });
})();
var MatChipListboxChange = class {
  source;
  value;
  constructor(source, value) {
    this.source = source;
    this.value = value;
  }
};
var MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MatChipListbox),
  multi: true
};
var MatChipListbox = class _MatChipListbox extends MatChipSet {
  _onTouched = () => {
  };
  _onChange = () => {
  };
  _defaultRole = "listbox";
  _defaultOptions = inject(MAT_CHIPS_DEFAULT_OPTIONS, {
    optional: true
  });
  get multiple() {
    return this._multiple;
  }
  set multiple(value) {
    this._multiple = value;
    this._syncListboxProperties();
  }
  _multiple = false;
  get selected() {
    const selectedChips = this._chips.toArray().filter((chip) => chip.selected);
    return this.multiple ? selectedChips : selectedChips[0];
  }
  ariaOrientation = "horizontal";
  get selectable() {
    return this._selectable;
  }
  set selectable(value) {
    this._selectable = value;
    this._syncListboxProperties();
  }
  _selectable = true;
  compareWith = (o1, o2) => o1 === o2;
  required = false;
  get hideSingleSelectionIndicator() {
    return this._hideSingleSelectionIndicator;
  }
  set hideSingleSelectionIndicator(value) {
    this._hideSingleSelectionIndicator = value;
    this._syncListboxProperties();
  }
  _hideSingleSelectionIndicator = this._defaultOptions?.hideSingleSelectionIndicator ?? false;
  get chipSelectionChanges() {
    return this._getChipStream((chip) => chip.selectionChange);
  }
  get chipBlurChanges() {
    return this._getChipStream((chip) => chip._onBlur);
  }
  get value() {
    return this._value;
  }
  set value(value) {
    if (this._chips && this._chips.length) {
      this._setSelectionByValue(value, false);
    }
    this._value = value;
  }
  _value;
  change = new EventEmitter();
  _chips = void 0;
  ngAfterContentInit() {
    this._chips.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
      if (this.value !== void 0) {
        Promise.resolve().then(() => {
          this._setSelectionByValue(this.value, false);
        });
      }
      this._syncListboxProperties();
    });
    this.chipBlurChanges.pipe(takeUntil(this._destroyed)).subscribe(() => this._blur());
    this.chipSelectionChanges.pipe(takeUntil(this._destroyed)).subscribe((event) => {
      if (!this.multiple) {
        this._chips.forEach((chip) => {
          if (chip !== event.source) {
            chip._setSelectedState(false, false, false);
          }
        });
      }
      if (event.isUserInput) {
        this._propagateChanges();
      }
    });
  }
  focus() {
    if (this.disabled) {
      return;
    }
    const firstSelectedChip = this._getFirstSelectedChip();
    if (firstSelectedChip && !firstSelectedChip.disabled) {
      firstSelectedChip.focus();
    } else if (this._chips.length > 0) {
      this._keyManager.setFirstItemActive();
    } else {
      this._elementRef.nativeElement.focus();
    }
  }
  writeValue(value) {
    if (value != null) {
      this.value = value;
    } else {
      this.value = void 0;
    }
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  _setSelectionByValue(value, isUserInput = true) {
    this._clearSelection();
    if (Array.isArray(value)) {
      value.forEach((currentValue) => this._selectValue(currentValue, isUserInput));
    } else {
      this._selectValue(value, isUserInput);
    }
  }
  _blur() {
    if (!this.disabled) {
      setTimeout(() => {
        if (!this.focused) {
          this._markAsTouched();
        }
      });
    }
  }
  _keydown(event) {
    if (event.keyCode === TAB) {
      super._allowFocusEscape();
    }
  }
  _markAsTouched() {
    this._onTouched();
    this._changeDetectorRef.markForCheck();
  }
  _propagateChanges() {
    let valueToEmit = null;
    if (Array.isArray(this.selected)) {
      valueToEmit = this.selected.map((chip) => chip.value);
    } else {
      valueToEmit = this.selected ? this.selected.value : void 0;
    }
    this._value = valueToEmit;
    this.change.emit(new MatChipListboxChange(this, valueToEmit));
    this._onChange(valueToEmit);
    this._changeDetectorRef.markForCheck();
  }
  _clearSelection(skip) {
    this._chips.forEach((chip) => {
      if (chip !== skip) {
        chip.deselect();
      }
    });
  }
  _selectValue(value, isUserInput) {
    const correspondingChip = this._chips.find((chip) => {
      return chip.value != null && this.compareWith(chip.value, value);
    });
    if (correspondingChip) {
      isUserInput ? correspondingChip.selectViaInteraction() : correspondingChip.select();
    }
    return correspondingChip;
  }
  _syncListboxProperties() {
    if (this._chips) {
      Promise.resolve().then(() => {
        this._chips.forEach((chip) => {
          chip._chipListMultiple = this.multiple;
          chip.chipListSelectable = this._selectable;
          chip._chipListHideSingleSelectionIndicator = this.hideSingleSelectionIndicator;
          chip._changeDetectorRef.markForCheck();
        });
      });
    }
  }
  _getFirstSelectedChip() {
    if (Array.isArray(this.selected)) {
      return this.selected.length ? this.selected[0] : void 0;
    } else {
      return this.selected;
    }
  }
  _skipPredicate(action) {
    return false;
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMatChipListbox_BaseFactory;
    return function MatChipListbox_Factory(__ngFactoryType__) {
      return (ɵMatChipListbox_BaseFactory || (ɵMatChipListbox_BaseFactory = ɵɵgetInheritedFactory(_MatChipListbox)))(__ngFactoryType__ || _MatChipListbox);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _MatChipListbox,
    selectors: [["mat-chip-listbox"]],
    contentQueries: function MatChipListbox_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, MatChipOption, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._chips = _t);
      }
    },
    hostAttrs: [1, "mdc-evolution-chip-set", "mat-mdc-chip-listbox"],
    hostVars: 10,
    hostBindings: function MatChipListbox_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("focus", function MatChipListbox_focus_HostBindingHandler() {
          return ctx.focus();
        })("blur", function MatChipListbox_blur_HostBindingHandler() {
          return ctx._blur();
        })("keydown", function MatChipListbox_keydown_HostBindingHandler($event) {
          return ctx._keydown($event);
        });
      }
      if (rf & 2) {
        ɵɵdomProperty("tabIndex", ctx.disabled || ctx.empty ? -1 : ctx.tabIndex);
        ɵɵattribute("role", ctx.role)("aria-required", ctx.role ? ctx.required : null)("aria-disabled", ctx.disabled.toString())("aria-multiselectable", ctx.multiple)("aria-orientation", ctx.ariaOrientation);
        ɵɵclassProp("mat-mdc-chip-list-disabled", ctx.disabled)("mat-mdc-chip-list-required", ctx.required);
      }
    },
    inputs: {
      multiple: [2, "multiple", "multiple", booleanAttribute],
      ariaOrientation: [0, "aria-orientation", "ariaOrientation"],
      selectable: [2, "selectable", "selectable", booleanAttribute],
      compareWith: "compareWith",
      required: [2, "required", "required", booleanAttribute],
      hideSingleSelectionIndicator: [2, "hideSingleSelectionIndicator", "hideSingleSelectionIndicator", booleanAttribute],
      value: "value"
    },
    outputs: {
      change: "change"
    },
    features: [ɵɵProvidersFeature([MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c52,
    decls: 2,
    vars: 0,
    consts: [["role", "presentation", 1, "mdc-evolution-chip-set__chips"]],
    template: function MatChipListbox_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵdomElementStart(0, "div", 0);
        ɵɵprojection(1);
        ɵɵdomElementEnd();
      }
    },
    styles: [_c62],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatChipListbox, [{
    type: Component,
    args: [{
      selector: "mat-chip-listbox",
      template: `
    <div class="mdc-evolution-chip-set__chips" role="presentation">
      <ng-content></ng-content>
    </div>
  `,
      host: {
        "class": "mdc-evolution-chip-set mat-mdc-chip-listbox",
        "[attr.role]": "role",
        "[tabIndex]": "(disabled || empty) ? -1 : tabIndex",
        "[attr.aria-required]": "role ? required : null",
        "[attr.aria-disabled]": "disabled.toString()",
        "[attr.aria-multiselectable]": "multiple",
        "[attr.aria-orientation]": "ariaOrientation",
        "[class.mat-mdc-chip-list-disabled]": "disabled",
        "[class.mat-mdc-chip-list-required]": "required",
        "(focus)": "focus()",
        "(blur)": "_blur()",
        "(keydown)": "_keydown($event)"
      },
      providers: [MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR],
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      styles: [".mat-mdc-chip-set {\n  display: flex;\n}\n.mat-mdc-chip-set:focus {\n  outline: none;\n}\n.mat-mdc-chip-set .mdc-evolution-chip-set__chips {\n  min-width: 100%;\n  margin-left: -8px;\n  margin-right: 0;\n}\n.mat-mdc-chip-set .mdc-evolution-chip {\n  margin: 4px 0 4px 8px;\n}\n[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip-set__chips {\n  margin-left: 0;\n  margin-right: -8px;\n}\n[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip {\n  margin-left: 0;\n  margin-right: 8px;\n}\n\n.mdc-evolution-chip-set__chips {\n  display: flex;\n  flex-flow: wrap;\n  min-width: 0;\n}\n\n.mat-mdc-chip-set-stacked {\n  flex-direction: column;\n  align-items: flex-start;\n}\n.mat-mdc-chip-set-stacked .mat-mdc-chip {\n  width: 100%;\n}\n.mat-mdc-chip-set-stacked .mdc-evolution-chip__graphic {\n  flex-grow: 0;\n}\n.mat-mdc-chip-set-stacked .mdc-evolution-chip__action--primary {\n  flex-basis: 100%;\n  justify-content: start;\n}\n\ninput.mat-mdc-chip-input {\n  flex: 1 0 150px;\n  margin-left: 8px;\n}\n[dir=rtl] input.mat-mdc-chip-input {\n  margin-left: 0;\n  margin-right: 8px;\n}\n.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::placeholder {\n  opacity: 1;\n}\n.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-moz-placeholder {\n  opacity: 1;\n}\n.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-webkit-input-placeholder {\n  opacity: 1;\n}\n.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input:-ms-input-placeholder {\n  opacity: 1;\n}\n.mat-mdc-chip-set + input.mat-mdc-chip-input {\n  margin-left: 0;\n  margin-right: 0;\n}\n"]
    }]
  }], null, {
    multiple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    ariaOrientation: [{
      type: Input,
      args: ["aria-orientation"]
    }],
    selectable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    compareWith: [{
      type: Input
    }],
    required: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hideSingleSelectionIndicator: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    value: [{
      type: Input
    }],
    change: [{
      type: Output
    }],
    _chips: [{
      type: ContentChildren,
      args: [MatChipOption, {
        descendants: true
      }]
    }]
  });
})();
var MatChipGridChange = class {
  source;
  value;
  constructor(source, value) {
    this.source = source;
    this.value = value;
  }
};
var MatChipGrid = class _MatChipGrid extends MatChipSet {
  ngControl = inject(NgControl, {
    optional: true,
    self: true
  });
  controlType = "mat-chip-grid";
  _chipInput;
  _defaultRole = "grid";
  _errorStateTracker;
  _uid = inject(_IdGenerator).getId("mat-chip-grid-");
  _ariaDescribedbyIds = [];
  _onTouched = () => {
  };
  _onChange = () => {
  };
  get disabled() {
    return this.ngControl ? !!this.ngControl.disabled : this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
    this._syncChipsState();
    this.stateChanges.next();
  }
  get id() {
    return this._chipInput ? this._chipInput.id : this._uid;
  }
  get empty() {
    return (!this._chipInput || this._chipInput.empty) && (!this._chips || this._chips.length === 0);
  }
  get placeholder() {
    return this._chipInput ? this._chipInput.placeholder : this._placeholder;
  }
  set placeholder(value) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  _placeholder = "";
  get focused() {
    return this._chipInput?.focused || this._hasFocusedChip();
  }
  get required() {
    return this._required ?? this.ngControl?.control?.hasValidator(Validators.required) ?? false;
  }
  set required(value) {
    this._required = value;
    this.stateChanges.next();
  }
  _required;
  get shouldLabelFloat() {
    return !this.empty || this.focused;
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
  }
  _value = [];
  get errorStateMatcher() {
    return this._errorStateTracker.matcher;
  }
  set errorStateMatcher(value) {
    this._errorStateTracker.matcher = value;
  }
  get chipBlurChanges() {
    return this._getChipStream((chip) => chip._onBlur);
  }
  change = new EventEmitter();
  valueChange = new EventEmitter();
  _chips = void 0;
  stateChanges = new Subject();
  get errorState() {
    return this._errorStateTracker.errorState;
  }
  set errorState(value) {
    this._errorStateTracker.errorState = value;
  }
  constructor() {
    super();
    const parentForm = inject(NgForm, {
      optional: true
    });
    const parentFormGroup = inject(FormGroupDirective, {
      optional: true
    });
    const defaultErrorStateMatcher = inject(ErrorStateMatcher);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    this._errorStateTracker = new _ErrorStateTracker(defaultErrorStateMatcher, this.ngControl, parentFormGroup, parentForm, this.stateChanges);
  }
  ngAfterContentInit() {
    this.chipBlurChanges.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._blur();
      this.stateChanges.next();
    });
    merge(this.chipFocusChanges, this._chips.changes).pipe(takeUntil(this._destroyed)).subscribe(() => this.stateChanges.next());
  }
  ngDoCheck() {
    if (this.ngControl) {
      this.updateErrorState();
    }
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this.stateChanges.complete();
  }
  registerInput(inputElement) {
    this._chipInput = inputElement;
    this._chipInput.setDescribedByIds(this._ariaDescribedbyIds);
    this._elementRef.nativeElement.removeAttribute("aria-describedby");
  }
  onContainerClick(event) {
    if (!this.disabled && !this._originatesFromChip(event)) {
      this.focus();
    }
  }
  focus() {
    if (this.disabled || this._chipInput?.focused) {
      return;
    }
    if (!this._chips.length || this._chips.first.disabled) {
      if (!this._chipInput) {
        return;
      }
      Promise.resolve().then(() => this._chipInput.focus());
    } else {
      const activeItem = this._keyManager.activeItem;
      if (activeItem) {
        activeItem.focus();
      } else {
        this._keyManager.setFirstItemActive();
      }
    }
    this.stateChanges.next();
  }
  get describedByIds() {
    if (this._chipInput) {
      return this._chipInput.describedByIds || [];
    }
    const existing = this._elementRef.nativeElement.getAttribute("aria-describedby");
    return existing ? existing.split(" ") : [];
  }
  setDescribedByIds(ids) {
    this._ariaDescribedbyIds = ids;
    if (this._chipInput) {
      this._chipInput.setDescribedByIds(ids);
    } else if (ids.length) {
      this._elementRef.nativeElement.setAttribute("aria-describedby", ids.join(" "));
    } else {
      this._elementRef.nativeElement.removeAttribute("aria-describedby");
    }
  }
  writeValue(value) {
    this._value = value;
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
    this.stateChanges.next();
  }
  updateErrorState() {
    this._errorStateTracker.updateErrorState();
  }
  _blur() {
    if (!this.disabled) {
      setTimeout(() => {
        if (!this.focused) {
          this._propagateChanges();
          this._markAsTouched();
        }
      });
    }
  }
  _allowFocusEscape() {
    if (!this._chipInput?.focused) {
      super._allowFocusEscape();
    }
  }
  _handleKeydown(event) {
    const keyCode = event.keyCode;
    const activeItem = this._keyManager.activeItem;
    if (keyCode === TAB) {
      if (this._chipInput?.focused && hasModifierKey(event, "shiftKey") && this._chips.length && !this._chips.last.disabled) {
        event.preventDefault();
        if (activeItem) {
          this._keyManager.setActiveItem(activeItem);
        } else {
          this._focusLastChip();
        }
      } else {
        super._allowFocusEscape();
      }
    } else if (!this._chipInput?.focused) {
      if ((keyCode === UP_ARROW || keyCode === DOWN_ARROW) && activeItem) {
        const eligibleActions = this._chipActions.filter((action) => action._isPrimary === activeItem._isPrimary && !this._skipPredicate(action));
        const currentIndex = eligibleActions.indexOf(activeItem);
        const delta = event.keyCode === UP_ARROW ? -1 : 1;
        event.preventDefault();
        if (currentIndex > -1 && this._isValidIndex(currentIndex + delta)) {
          this._keyManager.setActiveItem(eligibleActions[currentIndex + delta]);
        }
      } else {
        super._handleKeydown(event);
      }
    }
    this.stateChanges.next();
  }
  _focusLastChip() {
    if (this._chips.length) {
      this._chips.last.focus();
    }
  }
  _propagateChanges() {
    const valueToEmit = this._chips.length ? this._chips.toArray().map((chip) => chip.value) : [];
    this._value = valueToEmit;
    this.change.emit(new MatChipGridChange(this, valueToEmit));
    this.valueChange.emit(valueToEmit);
    this._onChange(valueToEmit);
    this._changeDetectorRef.markForCheck();
  }
  _markAsTouched() {
    this._onTouched();
    this._changeDetectorRef.markForCheck();
    this.stateChanges.next();
  }
  static ɵfac = function MatChipGrid_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatChipGrid)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MatChipGrid,
    selectors: [["mat-chip-grid"]],
    contentQueries: function MatChipGrid_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, MatChipRow, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._chips = _t);
      }
    },
    hostAttrs: [1, "mat-mdc-chip-set", "mat-mdc-chip-grid", "mdc-evolution-chip-set"],
    hostVars: 10,
    hostBindings: function MatChipGrid_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("focus", function MatChipGrid_focus_HostBindingHandler() {
          return ctx.focus();
        })("blur", function MatChipGrid_blur_HostBindingHandler() {
          return ctx._blur();
        });
      }
      if (rf & 2) {
        ɵɵattribute("role", ctx.role)("tabindex", ctx.disabled || ctx._chips && ctx._chips.length === 0 ? -1 : ctx.tabIndex)("aria-disabled", ctx.disabled.toString())("aria-invalid", ctx.errorState);
        ɵɵclassProp("mat-mdc-chip-list-disabled", ctx.disabled)("mat-mdc-chip-list-invalid", ctx.errorState)("mat-mdc-chip-list-required", ctx.required);
      }
    },
    inputs: {
      disabled: [2, "disabled", "disabled", booleanAttribute],
      placeholder: "placeholder",
      required: [2, "required", "required", booleanAttribute],
      value: "value",
      errorStateMatcher: "errorStateMatcher"
    },
    outputs: {
      change: "change",
      valueChange: "valueChange"
    },
    features: [ɵɵProvidersFeature([{
      provide: MatFormFieldControl,
      useExisting: _MatChipGrid
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c52,
    decls: 2,
    vars: 0,
    consts: [["role", "presentation", 1, "mdc-evolution-chip-set__chips"]],
    template: function MatChipGrid_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵdomElementStart(0, "div", 0);
        ɵɵprojection(1);
        ɵɵdomElementEnd();
      }
    },
    styles: [_c62],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatChipGrid, [{
    type: Component,
    args: [{
      selector: "mat-chip-grid",
      template: `
    <div class="mdc-evolution-chip-set__chips" role="presentation">
      <ng-content></ng-content>
    </div>
  `,
      host: {
        "class": "mat-mdc-chip-set mat-mdc-chip-grid mdc-evolution-chip-set",
        "[attr.role]": "role",
        "[attr.tabindex]": "(disabled || (_chips && _chips.length === 0)) ? -1 : tabIndex",
        "[attr.aria-disabled]": "disabled.toString()",
        "[attr.aria-invalid]": "errorState",
        "[class.mat-mdc-chip-list-disabled]": "disabled",
        "[class.mat-mdc-chip-list-invalid]": "errorState",
        "[class.mat-mdc-chip-list-required]": "required",
        "(focus)": "focus()",
        "(blur)": "_blur()"
      },
      providers: [{
        provide: MatFormFieldControl,
        useExisting: MatChipGrid
      }],
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      styles: [".mat-mdc-chip-set {\n  display: flex;\n}\n.mat-mdc-chip-set:focus {\n  outline: none;\n}\n.mat-mdc-chip-set .mdc-evolution-chip-set__chips {\n  min-width: 100%;\n  margin-left: -8px;\n  margin-right: 0;\n}\n.mat-mdc-chip-set .mdc-evolution-chip {\n  margin: 4px 0 4px 8px;\n}\n[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip-set__chips {\n  margin-left: 0;\n  margin-right: -8px;\n}\n[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip {\n  margin-left: 0;\n  margin-right: 8px;\n}\n\n.mdc-evolution-chip-set__chips {\n  display: flex;\n  flex-flow: wrap;\n  min-width: 0;\n}\n\n.mat-mdc-chip-set-stacked {\n  flex-direction: column;\n  align-items: flex-start;\n}\n.mat-mdc-chip-set-stacked .mat-mdc-chip {\n  width: 100%;\n}\n.mat-mdc-chip-set-stacked .mdc-evolution-chip__graphic {\n  flex-grow: 0;\n}\n.mat-mdc-chip-set-stacked .mdc-evolution-chip__action--primary {\n  flex-basis: 100%;\n  justify-content: start;\n}\n\ninput.mat-mdc-chip-input {\n  flex: 1 0 150px;\n  margin-left: 8px;\n}\n[dir=rtl] input.mat-mdc-chip-input {\n  margin-left: 0;\n  margin-right: 8px;\n}\n.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::placeholder {\n  opacity: 1;\n}\n.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-moz-placeholder {\n  opacity: 1;\n}\n.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-webkit-input-placeholder {\n  opacity: 1;\n}\n.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input:-ms-input-placeholder {\n  opacity: 1;\n}\n.mat-mdc-chip-set + input.mat-mdc-chip-input {\n  margin-left: 0;\n  margin-right: 0;\n}\n"]
    }]
  }], () => [], {
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    placeholder: [{
      type: Input
    }],
    required: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    value: [{
      type: Input
    }],
    errorStateMatcher: [{
      type: Input
    }],
    change: [{
      type: Output
    }],
    valueChange: [{
      type: Output
    }],
    _chips: [{
      type: ContentChildren,
      args: [MatChipRow, {
        descendants: true
      }]
    }]
  });
})();
var MatChipInput = class _MatChipInput {
  _elementRef = inject(ElementRef);
  focused = false;
  get chipGrid() {
    return this._chipGrid;
  }
  set chipGrid(value) {
    if (value) {
      this._chipGrid = value;
      this._chipGrid.registerInput(this);
    }
  }
  _chipGrid;
  addOnBlur = false;
  separatorKeyCodes;
  chipEnd = new EventEmitter();
  placeholder = "";
  id = inject(_IdGenerator).getId("mat-mdc-chip-list-input-");
  get disabled() {
    return this._disabled || this._chipGrid && this._chipGrid.disabled;
  }
  set disabled(value) {
    this._disabled = value;
  }
  _disabled = false;
  readonly = false;
  disabledInteractive;
  get empty() {
    return !this.inputElement.value;
  }
  inputElement;
  constructor() {
    const defaultOptions = inject(MAT_CHIPS_DEFAULT_OPTIONS);
    const formField = inject(MAT_FORM_FIELD, {
      optional: true
    });
    this.inputElement = this._elementRef.nativeElement;
    this.separatorKeyCodes = defaultOptions.separatorKeyCodes;
    this.disabledInteractive = defaultOptions.inputDisabledInteractive ?? false;
    if (formField) {
      this.inputElement.classList.add("mat-mdc-form-field-input-control");
    }
  }
  ngOnChanges() {
    this._chipGrid.stateChanges.next();
  }
  ngOnDestroy() {
    this.chipEnd.complete();
  }
  _keydown(event) {
    if (this.empty && event.keyCode === BACKSPACE) {
      if (!event.repeat) {
        this._chipGrid._focusLastChip();
      }
      event.preventDefault();
    } else {
      this._emitChipEnd(event);
    }
  }
  _blur() {
    if (this.addOnBlur) {
      this._emitChipEnd();
    }
    this.focused = false;
    if (!this._chipGrid.focused) {
      this._chipGrid._blur();
    }
    this._chipGrid.stateChanges.next();
  }
  _focus() {
    this.focused = true;
    this._chipGrid.stateChanges.next();
  }
  _emitChipEnd(event) {
    if (!event || this._isSeparatorKey(event) && !event.repeat) {
      this.chipEnd.emit({
        input: this.inputElement,
        value: this.inputElement.value,
        chipInput: this
      });
      event?.preventDefault();
    }
  }
  _onInput() {
    this._chipGrid.stateChanges.next();
  }
  focus() {
    this.inputElement.focus();
  }
  clear() {
    this.inputElement.value = "";
  }
  get describedByIds() {
    const element = this._elementRef.nativeElement;
    const existingDescribedBy = element.getAttribute("aria-describedby");
    return existingDescribedBy?.split(" ") || [];
  }
  setDescribedByIds(ids) {
    const element = this._elementRef.nativeElement;
    if (ids.length) {
      element.setAttribute("aria-describedby", ids.join(" "));
    } else {
      element.removeAttribute("aria-describedby");
    }
  }
  _isSeparatorKey(event) {
    if (!this.separatorKeyCodes) {
      return false;
    }
    for (const key of this.separatorKeyCodes) {
      let keyCode;
      let modifiers;
      if (typeof key === "number") {
        keyCode = key;
        modifiers = null;
      } else {
        keyCode = key.keyCode;
        modifiers = key.modifiers;
      }
      const modifiersMatch = !modifiers?.length ? !hasModifierKey(event) : hasModifierKey(event, ...modifiers);
      if (keyCode === event.keyCode && modifiersMatch) {
        return true;
      }
    }
    return false;
  }
  _getReadonlyAttribute() {
    return this.readonly || this.disabled && this.disabledInteractive ? "true" : null;
  }
  static ɵfac = function MatChipInput_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatChipInput)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MatChipInput,
    selectors: [["input", "matChipInputFor", ""]],
    hostAttrs: [1, "mat-mdc-chip-input", "mat-mdc-input-element", "mdc-text-field__input", "mat-input-element"],
    hostVars: 8,
    hostBindings: function MatChipInput_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("keydown", function MatChipInput_keydown_HostBindingHandler($event) {
          return ctx._keydown($event);
        })("blur", function MatChipInput_blur_HostBindingHandler() {
          return ctx._blur();
        })("focus", function MatChipInput_focus_HostBindingHandler() {
          return ctx._focus();
        })("input", function MatChipInput_input_HostBindingHandler() {
          return ctx._onInput();
        });
      }
      if (rf & 2) {
        ɵɵdomProperty("id", ctx.id);
        ɵɵattribute("disabled", ctx.disabled && !ctx.disabledInteractive ? "" : null)("placeholder", ctx.placeholder || null)("aria-invalid", ctx._chipGrid && ctx._chipGrid.ngControl ? ctx._chipGrid.ngControl.invalid : null)("aria-required", ctx._chipGrid && ctx._chipGrid.required || null)("aria-disabled", ctx.disabled && ctx.disabledInteractive ? "true" : null)("readonly", ctx._getReadonlyAttribute())("required", ctx._chipGrid && ctx._chipGrid.required || null);
      }
    },
    inputs: {
      chipGrid: [0, "matChipInputFor", "chipGrid"],
      addOnBlur: [2, "matChipInputAddOnBlur", "addOnBlur", booleanAttribute],
      separatorKeyCodes: [0, "matChipInputSeparatorKeyCodes", "separatorKeyCodes"],
      placeholder: "placeholder",
      id: "id",
      disabled: [2, "disabled", "disabled", booleanAttribute],
      readonly: [2, "readonly", "readonly", booleanAttribute],
      disabledInteractive: [2, "matChipInputDisabledInteractive", "disabledInteractive", booleanAttribute]
    },
    outputs: {
      chipEnd: "matChipInputTokenEnd"
    },
    exportAs: ["matChipInput", "matChipInputFor"],
    features: [ɵɵNgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatChipInput, [{
    type: Directive,
    args: [{
      selector: "input[matChipInputFor]",
      exportAs: "matChipInput, matChipInputFor",
      host: {
        "class": "mat-mdc-chip-input mat-mdc-input-element mdc-text-field__input mat-input-element",
        "(keydown)": "_keydown($event)",
        "(blur)": "_blur()",
        "(focus)": "_focus()",
        "(input)": "_onInput()",
        "[id]": "id",
        "[attr.disabled]": 'disabled && !disabledInteractive ? "" : null',
        "[attr.placeholder]": "placeholder || null",
        "[attr.aria-invalid]": "_chipGrid && _chipGrid.ngControl ? _chipGrid.ngControl.invalid : null",
        "[attr.aria-required]": "_chipGrid && _chipGrid.required || null",
        "[attr.aria-disabled]": 'disabled && disabledInteractive ? "true" : null',
        "[attr.readonly]": "_getReadonlyAttribute()",
        "[attr.required]": "_chipGrid && _chipGrid.required || null"
      }
    }]
  }], () => [], {
    chipGrid: [{
      type: Input,
      args: ["matChipInputFor"]
    }],
    addOnBlur: [{
      type: Input,
      args: [{
        alias: "matChipInputAddOnBlur",
        transform: booleanAttribute
      }]
    }],
    separatorKeyCodes: [{
      type: Input,
      args: ["matChipInputSeparatorKeyCodes"]
    }],
    chipEnd: [{
      type: Output,
      args: ["matChipInputTokenEnd"]
    }],
    placeholder: [{
      type: Input
    }],
    id: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    readonly: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabledInteractive: [{
      type: Input,
      args: [{
        alias: "matChipInputDisabledInteractive",
        transform: booleanAttribute
      }]
    }]
  });
})();
var CHIP_DECLARATIONS = [MatChip, MatChipAvatar, MatChipEdit, MatChipEditInput, MatChipGrid, MatChipInput, MatChipListbox, MatChipOption, MatChipRemove, MatChipRow, MatChipSet, MatChipTrailingIcon];
var MatChipsModule = class _MatChipsModule {
  static ɵfac = function MatChipsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatChipsModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MatChipsModule,
    imports: [MatRippleModule, MatChipAction, MatChip, MatChipAvatar, MatChipEdit, MatChipEditInput, MatChipGrid, MatChipInput, MatChipListbox, MatChipOption, MatChipRemove, MatChipRow, MatChipSet, MatChipTrailingIcon],
    exports: [BidiModule, MatChip, MatChipAvatar, MatChipEdit, MatChipEditInput, MatChipGrid, MatChipInput, MatChipListbox, MatChipOption, MatChipRemove, MatChipRow, MatChipSet, MatChipTrailingIcon]
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [ErrorStateMatcher, {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER]
      }
    }],
    imports: [MatRippleModule, BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatChipsModule, [{
    type: NgModule,
    args: [{
      imports: [MatRippleModule, MatChipAction, CHIP_DECLARATIONS],
      exports: [BidiModule, CHIP_DECLARATIONS],
      providers: [ErrorStateMatcher, {
        provide: MAT_CHIPS_DEFAULT_OPTIONS,
        useValue: {
          separatorKeyCodes: [ENTER]
        }
      }]
    }]
  }], null, null);
})();
export {
  MAT_CHIP,
  MAT_CHIPS_DEFAULT_OPTIONS,
  MAT_CHIP_AVATAR,
  MAT_CHIP_EDIT,
  MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR,
  MAT_CHIP_REMOVE,
  MAT_CHIP_TRAILING_ICON,
  MatChip,
  MatChipAvatar,
  MatChipEdit,
  MatChipEditInput,
  MatChipGrid,
  MatChipGridChange,
  MatChipInput,
  MatChipListbox,
  MatChipListboxChange,
  MatChipOption,
  MatChipRemove,
  MatChipRow,
  MatChipSelectionChange,
  MatChipSet,
  MatChipTrailingIcon,
  MatChipsModule
};
//# sourceMappingURL=@angular_material_chips.js.map
