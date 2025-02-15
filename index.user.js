

// ==UserScript==
// @name          s21plus
// @author        s21toolkit
// @description   s21 platform enchancement features
// @license       AGPL-3.0-only
// @version       0.0.3
// @namespace     https://edu.21-school.ru
// @match         https://edu.21-school.ru/*
// @run-at        document-start

// ==/UserScript==

"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __typeError = (msg) => {
    throw TypeError(msg);
  };
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop2 in b || (b = {}))
      if (__hasOwnProp.call(b, prop2))
        __defNormalProp(a, prop2, b[prop2]);
    if (__getOwnPropSymbols)
      for (var prop2 of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop2))
          __defNormalProp(a, prop2, b[prop2]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
  var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/utils/waitNotNull.ts
  function waitNotNull(func, timeout = 1e4, interval = 1e3) {
    return __async(this, null, function* () {
      return new Promise((res, rej) => __async(this, null, function* () {
        let time = timeout;
        const v = yield func();
        if (v) res(v);
        const i = setInterval(() => __async(this, null, function* () {
          const c = yield func();
          time -= interval;
          if (time <= 0) {
            clearInterval(i);
            rej();
          }
          if (!c) return;
          clearInterval(i);
          res(c);
        }), interval);
      }));
    });
  }

  // src/routes/calendar/popupWatcher.ts
  var onpopup = /* @__PURE__ */ new Set();
  var observer = new MutationObserver((mutationList) => {
    if (mutationList[0].addedNodes.length === 0) return;
    let nestedView = mutationList[0].addedNodes[0];
    while (nestedView.childNodes.length === 1) {
      nestedView = nestedView.childNodes[0];
    }
    for (const listener of onpopup) {
      listener(nestedView);
    }
  });
  function injectPopupWatcher() {
    return __async(this, null, function* () {
      console.log("Popup watcher injected");
      const view = yield waitNotNull(
        () => document.evaluate(
          "/html/body/div[1]/div[4]/div",
          document,
          null,
          XPathResult.ANY_TYPE,
          null
        ).iterateNext()
      );
      observer.observe(view, {
        childList: true
      });
      console.log("Observing for popups on", view);
    });
  }
  function ejectPopupWatcher() {
    observer.disconnect();
  }
  function addOnpopupListener(listener) {
    onpopup.add(listener);
  }

  // node_modules/.pnpm/esm-env@1.2.2/node_modules/esm-env/dev-fallback.js
  var _a, _b;
  var node_env = (_b = (_a = globalThis.process) == null ? void 0 : _a.env) == null ? void 0 : _b.NODE_ENV;
  var dev_fallback_default = node_env && !node_env.toLowerCase().startsWith("prod");

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/shared/utils.js
  var is_array = Array.isArray;
  var index_of = Array.prototype.indexOf;
  var array_from = Array.from;
  var object_keys = Object.keys;
  var define_property = Object.defineProperty;
  var get_descriptor = Object.getOwnPropertyDescriptor;
  var get_descriptors = Object.getOwnPropertyDescriptors;
  var object_prototype = Object.prototype;
  var array_prototype = Array.prototype;
  var get_prototype_of = Object.getPrototypeOf;
  function run(fn) {
    return fn();
  }
  function run_all(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i]();
    }
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/constants.js
  var DERIVED = 1 << 1;
  var EFFECT = 1 << 2;
  var RENDER_EFFECT = 1 << 3;
  var BLOCK_EFFECT = 1 << 4;
  var BRANCH_EFFECT = 1 << 5;
  var ROOT_EFFECT = 1 << 6;
  var BOUNDARY_EFFECT = 1 << 7;
  var UNOWNED = 1 << 8;
  var DISCONNECTED = 1 << 9;
  var CLEAN = 1 << 10;
  var DIRTY = 1 << 11;
  var MAYBE_DIRTY = 1 << 12;
  var INERT = 1 << 13;
  var DESTROYED = 1 << 14;
  var EFFECT_RAN = 1 << 15;
  var EFFECT_TRANSPARENT = 1 << 16;
  var LEGACY_DERIVED_PROP = 1 << 17;
  var INSPECT_EFFECT = 1 << 18;
  var HEAD_EFFECT = 1 << 19;
  var EFFECT_HAS_DERIVED = 1 << 20;
  var STATE_SYMBOL = Symbol("$state");
  var STATE_SYMBOL_METADATA = Symbol("$state metadata");
  var LEGACY_PROPS = Symbol("legacy props");
  var LOADING_ATTR_SYMBOL = Symbol("");

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/reactivity/equality.js
  function equals(value) {
    return value === this.v;
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
  }
  function safe_equals(value) {
    return !safe_not_equal(value, this.v);
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/errors.js
  function derived_references_self() {
    if (dev_fallback_default) {
      const error = new Error(`derived_references_self
A derived value cannot reference itself recursively
https://svelte.dev/e/derived_references_self`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/derived_references_self`);
    }
  }
  function effect_in_teardown(rune) {
    if (dev_fallback_default) {
      const error = new Error(`effect_in_teardown
\`${rune}\` cannot be used inside an effect cleanup function
https://svelte.dev/e/effect_in_teardown`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/effect_in_teardown`);
    }
  }
  function effect_in_unowned_derived() {
    if (dev_fallback_default) {
      const error = new Error(`effect_in_unowned_derived
Effect cannot be created inside a \`$derived\` value that was not itself created inside an effect
https://svelte.dev/e/effect_in_unowned_derived`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
    }
  }
  function effect_orphan(rune) {
    if (dev_fallback_default) {
      const error = new Error(`effect_orphan
\`${rune}\` can only be used inside an effect (e.g. during component initialisation)
https://svelte.dev/e/effect_orphan`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/effect_orphan`);
    }
  }
  function effect_update_depth_exceeded() {
    if (dev_fallback_default) {
      const error = new Error(`effect_update_depth_exceeded
Maximum update depth exceeded. This can happen when a reactive block or effect repeatedly sets a new value. Svelte limits the number of nested updates to prevent infinite loops
https://svelte.dev/e/effect_update_depth_exceeded`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
    }
  }
  function hydration_failed() {
    if (dev_fallback_default) {
      const error = new Error(`hydration_failed
Failed to hydrate the application
https://svelte.dev/e/hydration_failed`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/hydration_failed`);
    }
  }
  function props_invalid_value(key) {
    if (dev_fallback_default) {
      const error = new Error(`props_invalid_value
Cannot do \`bind:${key}={undefined}\` when \`${key}\` has a fallback value
https://svelte.dev/e/props_invalid_value`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/props_invalid_value`);
    }
  }
  function rune_outside_svelte(rune) {
    if (dev_fallback_default) {
      const error = new Error(`rune_outside_svelte
The \`${rune}\` rune is only available inside \`.svelte\` and \`.svelte.js/ts\` files
https://svelte.dev/e/rune_outside_svelte`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/rune_outside_svelte`);
    }
  }
  function state_descriptors_fixed() {
    if (dev_fallback_default) {
      const error = new Error(`state_descriptors_fixed
Property descriptors defined on \`$state\` objects must contain \`value\` and always be \`enumerable\`, \`configurable\` and \`writable\`.
https://svelte.dev/e/state_descriptors_fixed`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
    }
  }
  function state_prototype_fixed() {
    if (dev_fallback_default) {
      const error = new Error(`state_prototype_fixed
Cannot set prototype of \`$state\` object
https://svelte.dev/e/state_prototype_fixed`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
    }
  }
  function state_unsafe_local_read() {
    if (dev_fallback_default) {
      const error = new Error(`state_unsafe_local_read
Reading state that was created inside the same derived is forbidden. Consider using \`untrack\` to read locally created state
https://svelte.dev/e/state_unsafe_local_read`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/state_unsafe_local_read`);
    }
  }
  function state_unsafe_mutation() {
    if (dev_fallback_default) {
      const error = new Error(`state_unsafe_mutation
Updating state inside a derived or a template expression is forbidden. If the value should not be reactive, declare it without \`$state\`
https://svelte.dev/e/state_unsafe_mutation`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
    }
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/flags/index.js
  var legacy_mode_flag = false;
  var tracing_mode_flag = false;
  function enable_legacy_mode_flag() {
    legacy_mode_flag = true;
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/constants.js
  var EACH_INDEX_REACTIVE = 1 << 1;
  var EACH_IS_CONTROLLED = 1 << 2;
  var EACH_IS_ANIMATED = 1 << 3;
  var EACH_ITEM_IMMUTABLE = 1 << 4;
  var PROPS_IS_IMMUTABLE = 1;
  var PROPS_IS_RUNES = 1 << 1;
  var PROPS_IS_UPDATED = 1 << 2;
  var PROPS_IS_BINDABLE = 1 << 3;
  var PROPS_IS_LAZY_INITIAL = 1 << 4;
  var TRANSITION_OUT = 1 << 1;
  var TRANSITION_GLOBAL = 1 << 2;
  var TEMPLATE_FRAGMENT = 1;
  var TEMPLATE_USE_IMPORT_NODE = 1 << 1;
  var HYDRATION_START = "[";
  var HYDRATION_END = "]";
  var HYDRATION_ERROR = {};
  var ELEMENT_PRESERVE_ATTRIBUTE_CASE = 1 << 1;
  var UNINITIALIZED = Symbol();
  var FILENAME = Symbol("filename");
  var HMR = Symbol("hmr");

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/dev/tracing.js
  var tracing_expressions = null;
  function get_stack(label) {
    let error = Error();
    const stack2 = error.stack;
    if (stack2) {
      const lines = stack2.split("\n");
      const new_lines = ["\n"];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line === "Error") {
          continue;
        }
        if (line.includes("validate_each_keys")) {
          return null;
        }
        if (line.includes("svelte/src/internal")) {
          continue;
        }
        new_lines.push(line);
      }
      if (new_lines.length === 1) {
        return null;
      }
      define_property(error, "stack", {
        value: new_lines.join("\n")
      });
      define_property(error, "name", {
        // 'Error' suffix is required for stack traces to be rendered properly
        value: `${label}Error`
      });
    }
    return error;
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/warnings.js
  var bold = "font-weight: bold";
  var normal = "font-weight: normal";
  function hydration_mismatch(location) {
    if (dev_fallback_default) {
      console.warn(`%c[svelte] hydration_mismatch
%c${location ? `Hydration failed because the initial UI does not match what was rendered on the server. The error occurred near ${location}` : "Hydration failed because the initial UI does not match what was rendered on the server"}
https://svelte.dev/e/hydration_mismatch`, bold, normal);
    } else {
      console.warn(`https://svelte.dev/e/hydration_mismatch`);
    }
  }
  function lifecycle_double_unmount() {
    if (dev_fallback_default) {
      console.warn(`%c[svelte] lifecycle_double_unmount
%cTried to unmount a component that was not mounted
https://svelte.dev/e/lifecycle_double_unmount`, bold, normal);
    } else {
      console.warn(`https://svelte.dev/e/lifecycle_double_unmount`);
    }
  }
  function ownership_invalid_mutation(component2, owner) {
    if (dev_fallback_default) {
      console.warn(`%c[svelte] ownership_invalid_mutation
%c${component2 ? `${component2} mutated a value owned by ${owner}. This is strongly discouraged. Consider passing values to child components with \`bind:\`, or use a callback instead` : "Mutating a value outside the component that created it is strongly discouraged. Consider passing values to child components with `bind:`, or use a callback instead"}
https://svelte.dev/e/ownership_invalid_mutation`, bold, normal);
    } else {
      console.warn(`https://svelte.dev/e/ownership_invalid_mutation`);
    }
  }
  function state_proxy_equality_mismatch(operator) {
    if (dev_fallback_default) {
      console.warn(`%c[svelte] state_proxy_equality_mismatch
%cReactive \`$state(...)\` proxies and the values they proxy have different identities. Because of this, comparisons with \`${operator}\` will produce unexpected results
https://svelte.dev/e/state_proxy_equality_mismatch`, bold, normal);
    } else {
      console.warn(`https://svelte.dev/e/state_proxy_equality_mismatch`);
    }
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/dev/ownership.js
  var boundaries = {};
  var chrome_pattern = /at (?:.+ \()?(.+):(\d+):(\d+)\)?$/;
  var firefox_pattern = /@(.+):(\d+):(\d+)$/;
  function get_stack2() {
    var _a3;
    const stack2 = new Error().stack;
    if (!stack2) return null;
    const entries = [];
    for (const line of stack2.split("\n")) {
      let match = (_a3 = chrome_pattern.exec(line)) != null ? _a3 : firefox_pattern.exec(line);
      if (match) {
        entries.push({
          file: match[1],
          line: +match[2],
          column: +match[3]
        });
      }
    }
    return entries;
  }
  function get_component() {
    var _a3;
    const stack2 = (_a3 = get_stack2()) == null ? void 0 : _a3.slice(4);
    if (!stack2) return null;
    for (let i = 0; i < stack2.length; i++) {
      const entry = stack2[i];
      const modules = boundaries[entry.file];
      if (!modules) {
        if (i === 0) return null;
        continue;
      }
      for (const module of modules) {
        if (module.end == null) {
          return null;
        }
        if (module.start.line < entry.line && module.end.line > entry.line) {
          return module.component;
        }
      }
    }
    return null;
  }
  var ADD_OWNER = Symbol("ADD_OWNER");
  function widen_ownership(from, to) {
    if (to.owners === null) {
      return;
    }
    while (from) {
      if (from.owners === null) {
        to.owners = null;
        break;
      }
      for (const owner of from.owners) {
        to.owners.add(owner);
      }
      from = from.parent;
    }
  }
  function has_owner(metadata, component2) {
    if (metadata.owners === null) {
      return true;
    }
    return metadata.owners.has(component2) || // This helps avoid false positives when using HMR, where the component function is replaced
    [...metadata.owners].some(
      (owner) => (
        /** @type {any} */
        owner[FILENAME] === /** @type {any} */
        (component2 == null ? void 0 : component2[FILENAME])
      )
    ) || metadata.parent !== null && has_owner(metadata.parent, component2);
  }
  function get_owner(metadata) {
    var _a3, _b2;
    return (_b2 = (_a3 = metadata == null ? void 0 : metadata.owners) == null ? void 0 : _a3.values().next().value) != null ? _b2 : get_owner(
      /** @type {ProxyMetadata} */
      metadata.parent
    );
  }
  var skip = false;
  function check_ownership(metadata) {
    if (skip) return;
    const component2 = get_component();
    if (component2 && !has_owner(metadata, component2)) {
      let original = get_owner(metadata);
      if (original[FILENAME] !== component2[FILENAME]) {
        ownership_invalid_mutation(component2[FILENAME], original[FILENAME]);
      } else {
        ownership_invalid_mutation();
      }
    }
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/context.js
  var component_context = null;
  function set_component_context(context) {
    component_context = context;
  }
  var dev_current_component_function = null;
  function set_dev_current_component_function(fn) {
    dev_current_component_function = fn;
  }
  function push(props, runes = false, fn) {
    component_context = {
      p: component_context,
      c: null,
      e: null,
      m: false,
      s: props,
      x: null,
      l: null
    };
    if (legacy_mode_flag && !runes) {
      component_context.l = {
        s: null,
        u: null,
        r1: [],
        r2: source(false)
      };
    }
    if (dev_fallback_default) {
      component_context.function = fn;
      dev_current_component_function = fn;
    }
  }
  function pop(component2) {
    var _a3, _b2;
    const context_stack_item = component_context;
    if (context_stack_item !== null) {
      if (component2 !== void 0) {
        context_stack_item.x = component2;
      }
      const component_effects = context_stack_item.e;
      if (component_effects !== null) {
        var previous_effect = active_effect;
        var previous_reaction = active_reaction;
        context_stack_item.e = null;
        try {
          for (var i = 0; i < component_effects.length; i++) {
            var component_effect = component_effects[i];
            set_active_effect(component_effect.effect);
            set_active_reaction(component_effect.reaction);
            effect(component_effect.fn);
          }
        } finally {
          set_active_effect(previous_effect);
          set_active_reaction(previous_reaction);
        }
      }
      component_context = context_stack_item.p;
      if (dev_fallback_default) {
        dev_current_component_function = (_b2 = (_a3 = context_stack_item.p) == null ? void 0 : _a3.function) != null ? _b2 : null;
      }
      context_stack_item.m = true;
    }
    return component2 || /** @type {T} */
    {};
  }
  function is_runes() {
    return !legacy_mode_flag || component_context !== null && component_context.l === null;
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/reactivity/sources.js
  var inspect_effects = /* @__PURE__ */ new Set();
  function set_inspect_effects(v) {
    inspect_effects = v;
  }
  function source(v, stack2) {
    var signal = {
      f: 0,
      // TODO ideally we could skip this altogether, but it causes type errors
      v,
      reactions: null,
      equals,
      rv: 0,
      wv: 0
    };
    if (dev_fallback_default && tracing_mode_flag) {
      signal.created = stack2 != null ? stack2 : get_stack("CreatedAt");
      signal.debug = null;
    }
    return signal;
  }
  // @__NO_SIDE_EFFECTS__
  function mutable_source(initial_value, immutable = false) {
    var _a3, _b2;
    const s = source(initial_value);
    if (!immutable) {
      s.equals = safe_equals;
    }
    if (legacy_mode_flag && component_context !== null && component_context.l !== null) {
      ((_b2 = (_a3 = component_context.l).s) != null ? _b2 : _a3.s = []).push(s);
    }
    return s;
  }
  function mutable_state(v, immutable = false) {
    return /* @__PURE__ */ push_derived_source(/* @__PURE__ */ mutable_source(v, immutable));
  }
  // @__NO_SIDE_EFFECTS__
  function push_derived_source(source2) {
    if (active_reaction !== null && !untracking && (active_reaction.f & DERIVED) !== 0) {
      if (derived_sources === null) {
        set_derived_sources([source2]);
      } else {
        derived_sources.push(source2);
      }
    }
    return source2;
  }
  function set(source2, value) {
    if (active_reaction !== null && !untracking && is_runes() && (active_reaction.f & (DERIVED | BLOCK_EFFECT)) !== 0 && // If the source was created locally within the current derived, then
    // we allow the mutation.
    (derived_sources === null || !derived_sources.includes(source2))) {
      state_unsafe_mutation();
    }
    return internal_set(source2, value);
  }
  function internal_set(source2, value) {
    var _a3;
    if (!source2.equals(value)) {
      var old_value = source2.v;
      source2.v = value;
      source2.wv = increment_write_version();
      if (dev_fallback_default && tracing_mode_flag) {
        source2.updated = get_stack("UpdatedAt");
        if (active_effect != null) {
          source2.trace_need_increase = true;
          (_a3 = source2.trace_v) != null ? _a3 : source2.trace_v = old_value;
        }
      }
      mark_reactions(source2, DIRTY);
      if (is_runes() && active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
        if (untracked_writes === null) {
          set_untracked_writes([source2]);
        } else {
          untracked_writes.push(source2);
        }
      }
      if (dev_fallback_default && inspect_effects.size > 0) {
        const inspects = Array.from(inspect_effects);
        var previously_flushing_effect = is_flushing_effect;
        set_is_flushing_effect(true);
        try {
          for (const effect2 of inspects) {
            if ((effect2.f & CLEAN) !== 0) {
              set_signal_status(effect2, MAYBE_DIRTY);
            }
            if (check_dirtiness(effect2)) {
              update_effect(effect2);
            }
          }
        } finally {
          set_is_flushing_effect(previously_flushing_effect);
        }
        inspect_effects.clear();
      }
    }
    return value;
  }
  function mark_reactions(signal, status) {
    var reactions = signal.reactions;
    if (reactions === null) return;
    var runes = is_runes();
    var length = reactions.length;
    for (var i = 0; i < length; i++) {
      var reaction = reactions[i];
      var flags = reaction.f;
      if ((flags & DIRTY) !== 0) continue;
      if (!runes && reaction === active_effect) continue;
      if (dev_fallback_default && (flags & INSPECT_EFFECT) !== 0) {
        inspect_effects.add(reaction);
        continue;
      }
      set_signal_status(reaction, status);
      if ((flags & (CLEAN | UNOWNED)) !== 0) {
        if ((flags & DERIVED) !== 0) {
          mark_reactions(
            /** @type {Derived} */
            reaction,
            MAYBE_DIRTY
          );
        } else {
          schedule_effect(
            /** @type {Effect} */
            reaction
          );
        }
      }
    }
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/dom/hydration.js
  var hydrating = false;
  function set_hydrating(value) {
    hydrating = value;
  }
  var hydrate_node;
  function set_hydrate_node(node) {
    if (node === null) {
      hydration_mismatch();
      throw HYDRATION_ERROR;
    }
    return hydrate_node = node;
  }
  function hydrate_next() {
    return set_hydrate_node(
      /** @type {TemplateNode} */
      get_next_sibling(hydrate_node)
    );
  }
  function reset(node) {
    if (!hydrating) return;
    if (get_next_sibling(hydrate_node) !== null) {
      hydration_mismatch();
      throw HYDRATION_ERROR;
    }
    hydrate_node = node;
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/proxy.js
  function proxy(value, parent = null, prev) {
    var _a3, _b2;
    var stack2 = null;
    if (dev_fallback_default && tracing_mode_flag) {
      stack2 = get_stack("CreatedAt");
    }
    if (typeof value !== "object" || value === null || STATE_SYMBOL in value) {
      return value;
    }
    const prototype = get_prototype_of(value);
    if (prototype !== object_prototype && prototype !== array_prototype) {
      return value;
    }
    var sources = /* @__PURE__ */ new Map();
    var is_proxied_array = is_array(value);
    var version = source(0);
    if (is_proxied_array) {
      sources.set("length", source(
        /** @type {any[]} */
        value.length,
        stack2
      ));
    }
    var metadata;
    if (dev_fallback_default) {
      metadata = {
        parent,
        owners: null
      };
      if (prev) {
        const prev_owners = (_b2 = (_a3 = prev.v) == null ? void 0 : _a3[STATE_SYMBOL_METADATA]) == null ? void 0 : _b2.owners;
        metadata.owners = prev_owners ? new Set(prev_owners) : null;
      } else {
        metadata.owners = parent === null ? component_context !== null ? /* @__PURE__ */ new Set([component_context.function]) : null : /* @__PURE__ */ new Set();
      }
    }
    return new Proxy(
      /** @type {any} */
      value,
      {
        defineProperty(_, prop2, descriptor) {
          if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) {
            state_descriptors_fixed();
          }
          var s = sources.get(prop2);
          if (s === void 0) {
            s = source(descriptor.value, stack2);
            sources.set(prop2, s);
          } else {
            set(s, proxy(descriptor.value, metadata));
          }
          return true;
        },
        deleteProperty(target, prop2) {
          var s = sources.get(prop2);
          if (s === void 0) {
            if (prop2 in target) {
              sources.set(prop2, source(UNINITIALIZED, stack2));
            }
          } else {
            if (is_proxied_array && typeof prop2 === "string") {
              var ls = (
                /** @type {Source<number>} */
                sources.get("length")
              );
              var n = Number(prop2);
              if (Number.isInteger(n) && n < ls.v) {
                set(ls, n);
              }
            }
            set(s, UNINITIALIZED);
            update_version(version);
          }
          return true;
        },
        get(target, prop2, receiver) {
          var _a4;
          if (dev_fallback_default && prop2 === STATE_SYMBOL_METADATA) {
            return metadata;
          }
          if (prop2 === STATE_SYMBOL) {
            return value;
          }
          var s = sources.get(prop2);
          var exists = prop2 in target;
          if (s === void 0 && (!exists || ((_a4 = get_descriptor(target, prop2)) == null ? void 0 : _a4.writable))) {
            s = source(proxy(exists ? target[prop2] : UNINITIALIZED, metadata), stack2);
            sources.set(prop2, s);
          }
          if (s !== void 0) {
            var v = get(s);
            if (dev_fallback_default) {
              var prop_metadata = v == null ? void 0 : v[STATE_SYMBOL_METADATA];
              if (prop_metadata && (prop_metadata == null ? void 0 : prop_metadata.parent) !== metadata) {
                widen_ownership(metadata, prop_metadata);
              }
            }
            return v === UNINITIALIZED ? void 0 : v;
          }
          return Reflect.get(target, prop2, receiver);
        },
        getOwnPropertyDescriptor(target, prop2) {
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
          if (descriptor && "value" in descriptor) {
            var s = sources.get(prop2);
            if (s) descriptor.value = get(s);
          } else if (descriptor === void 0) {
            var source2 = sources.get(prop2);
            var value2 = source2 == null ? void 0 : source2.v;
            if (source2 !== void 0 && value2 !== UNINITIALIZED) {
              return {
                enumerable: true,
                configurable: true,
                value: value2,
                writable: true
              };
            }
          }
          return descriptor;
        },
        has(target, prop2) {
          var _a4;
          if (dev_fallback_default && prop2 === STATE_SYMBOL_METADATA) {
            return true;
          }
          if (prop2 === STATE_SYMBOL) {
            return true;
          }
          var s = sources.get(prop2);
          var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop2);
          if (s !== void 0 || active_effect !== null && (!has || ((_a4 = get_descriptor(target, prop2)) == null ? void 0 : _a4.writable))) {
            if (s === void 0) {
              s = source(has ? proxy(target[prop2], metadata) : UNINITIALIZED, stack2);
              sources.set(prop2, s);
            }
            var value2 = get(s);
            if (value2 === UNINITIALIZED) {
              return false;
            }
          }
          return has;
        },
        set(target, prop2, value2, receiver) {
          var _a4;
          var s = sources.get(prop2);
          var has = prop2 in target;
          if (is_proxied_array && prop2 === "length") {
            for (var i = value2; i < /** @type {Source<number>} */
            s.v; i += 1) {
              var other_s = sources.get(i + "");
              if (other_s !== void 0) {
                set(other_s, UNINITIALIZED);
              } else if (i in target) {
                other_s = source(UNINITIALIZED, stack2);
                sources.set(i + "", other_s);
              }
            }
          }
          if (s === void 0) {
            if (!has || ((_a4 = get_descriptor(target, prop2)) == null ? void 0 : _a4.writable)) {
              s = source(void 0, stack2);
              set(s, proxy(value2, metadata));
              sources.set(prop2, s);
            }
          } else {
            has = s.v !== UNINITIALIZED;
            set(s, proxy(value2, metadata));
          }
          if (dev_fallback_default) {
            var prop_metadata = value2 == null ? void 0 : value2[STATE_SYMBOL_METADATA];
            if (prop_metadata && (prop_metadata == null ? void 0 : prop_metadata.parent) !== metadata) {
              widen_ownership(metadata, prop_metadata);
            }
            check_ownership(metadata);
          }
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
          if (descriptor == null ? void 0 : descriptor.set) {
            descriptor.set.call(receiver, value2);
          }
          if (!has) {
            if (is_proxied_array && typeof prop2 === "string") {
              var ls = (
                /** @type {Source<number>} */
                sources.get("length")
              );
              var n = Number(prop2);
              if (Number.isInteger(n) && n >= ls.v) {
                set(ls, n + 1);
              }
            }
            update_version(version);
          }
          return true;
        },
        ownKeys(target) {
          get(version);
          var own_keys = Reflect.ownKeys(target).filter((key2) => {
            var source3 = sources.get(key2);
            return source3 === void 0 || source3.v !== UNINITIALIZED;
          });
          for (var [key, source2] of sources) {
            if (source2.v !== UNINITIALIZED && !(key in target)) {
              own_keys.push(key);
            }
          }
          return own_keys;
        },
        setPrototypeOf() {
          state_prototype_fixed();
        }
      }
    );
  }
  function update_version(signal, d = 1) {
    set(signal, signal.v + d);
  }
  function get_proxied_value(value) {
    if (value !== null && typeof value === "object" && STATE_SYMBOL in value) {
      return value[STATE_SYMBOL];
    }
    return value;
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/dev/equality.js
  function init_array_prototype_warnings() {
    const array_prototype2 = Array.prototype;
    const cleanup = Array.__svelte_cleanup;
    if (cleanup) {
      cleanup();
    }
    const { indexOf, lastIndexOf, includes } = array_prototype2;
    array_prototype2.indexOf = function(item, from_index) {
      const index2 = indexOf.call(this, item, from_index);
      if (index2 === -1) {
        for (let i = from_index != null ? from_index : 0; i < this.length; i += 1) {
          if (get_proxied_value(this[i]) === item) {
            state_proxy_equality_mismatch("array.indexOf(...)");
            break;
          }
        }
      }
      return index2;
    };
    array_prototype2.lastIndexOf = function(item, from_index) {
      const index2 = lastIndexOf.call(this, item, from_index != null ? from_index : this.length - 1);
      if (index2 === -1) {
        for (let i = 0; i <= (from_index != null ? from_index : this.length - 1); i += 1) {
          if (get_proxied_value(this[i]) === item) {
            state_proxy_equality_mismatch("array.lastIndexOf(...)");
            break;
          }
        }
      }
      return index2;
    };
    array_prototype2.includes = function(item, from_index) {
      const has = includes.call(this, item, from_index);
      if (!has) {
        for (let i = 0; i < this.length; i += 1) {
          if (get_proxied_value(this[i]) === item) {
            state_proxy_equality_mismatch("array.includes(...)");
            break;
          }
        }
      }
      return has;
    };
    Array.__svelte_cleanup = () => {
      array_prototype2.indexOf = indexOf;
      array_prototype2.lastIndexOf = lastIndexOf;
      array_prototype2.includes = includes;
    };
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/dom/operations.js
  var $window;
  var $document;
  var first_child_getter;
  var next_sibling_getter;
  function init_operations() {
    if ($window !== void 0) {
      return;
    }
    $window = window;
    $document = document;
    var element_prototype = Element.prototype;
    var node_prototype = Node.prototype;
    first_child_getter = get_descriptor(node_prototype, "firstChild").get;
    next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
    element_prototype.__click = void 0;
    element_prototype.__className = "";
    element_prototype.__attributes = null;
    element_prototype.__styles = null;
    element_prototype.__e = void 0;
    Text.prototype.__t = void 0;
    if (dev_fallback_default) {
      element_prototype.__svelte_meta = null;
      init_array_prototype_warnings();
    }
  }
  function create_text(value = "") {
    return document.createTextNode(value);
  }
  // @__NO_SIDE_EFFECTS__
  function get_first_child(node) {
    return first_child_getter.call(node);
  }
  // @__NO_SIDE_EFFECTS__
  function get_next_sibling(node) {
    return next_sibling_getter.call(node);
  }
  function child(node, is_text) {
    if (!hydrating) {
      return /* @__PURE__ */ get_first_child(node);
    }
    var child2 = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_first_child(hydrate_node)
    );
    if (child2 === null) {
      child2 = hydrate_node.appendChild(create_text());
    } else if (is_text && child2.nodeType !== 3) {
      var text2 = create_text();
      child2 == null ? void 0 : child2.before(text2);
      set_hydrate_node(text2);
      return text2;
    }
    set_hydrate_node(child2);
    return child2;
  }
  function clear_text_content(node) {
    node.textContent = "";
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/reactivity/deriveds.js
  // @__NO_SIDE_EFFECTS__
  function derived(fn) {
    var flags = DERIVED | DIRTY;
    var parent_derived = active_reaction !== null && (active_reaction.f & DERIVED) !== 0 ? (
      /** @type {Derived} */
      active_reaction
    ) : null;
    if (active_effect === null || parent_derived !== null && (parent_derived.f & UNOWNED) !== 0) {
      flags |= UNOWNED;
    } else {
      active_effect.f |= EFFECT_HAS_DERIVED;
    }
    const signal = {
      ctx: component_context,
      deps: null,
      effects: null,
      equals,
      f: flags,
      fn,
      reactions: null,
      rv: 0,
      v: (
        /** @type {V} */
        null
      ),
      wv: 0,
      parent: parent_derived != null ? parent_derived : active_effect
    };
    if (dev_fallback_default && tracing_mode_flag) {
      signal.created = get_stack("CreatedAt");
    }
    return signal;
  }
  // @__NO_SIDE_EFFECTS__
  function derived_safe_equal(fn) {
    const signal = /* @__PURE__ */ derived(fn);
    signal.equals = safe_equals;
    return signal;
  }
  function destroy_derived_effects(derived2) {
    var effects = derived2.effects;
    if (effects !== null) {
      derived2.effects = null;
      for (var i = 0; i < effects.length; i += 1) {
        destroy_effect(
          /** @type {Effect} */
          effects[i]
        );
      }
    }
  }
  var stack = [];
  function get_derived_parent_effect(derived2) {
    var parent = derived2.parent;
    while (parent !== null) {
      if ((parent.f & DERIVED) === 0) {
        return (
          /** @type {Effect} */
          parent
        );
      }
      parent = parent.parent;
    }
    return null;
  }
  function execute_derived(derived2) {
    var value;
    var prev_active_effect = active_effect;
    set_active_effect(get_derived_parent_effect(derived2));
    if (dev_fallback_default) {
      let prev_inspect_effects = inspect_effects;
      set_inspect_effects(/* @__PURE__ */ new Set());
      try {
        if (stack.includes(derived2)) {
          derived_references_self();
        }
        stack.push(derived2);
        destroy_derived_effects(derived2);
        value = update_reaction(derived2);
      } finally {
        set_active_effect(prev_active_effect);
        set_inspect_effects(prev_inspect_effects);
        stack.pop();
      }
    } else {
      try {
        destroy_derived_effects(derived2);
        value = update_reaction(derived2);
      } finally {
        set_active_effect(prev_active_effect);
      }
    }
    return value;
  }
  function update_derived(derived2) {
    var value = execute_derived(derived2);
    var status = (skip_reaction || (derived2.f & UNOWNED) !== 0) && derived2.deps !== null ? MAYBE_DIRTY : CLEAN;
    set_signal_status(derived2, status);
    if (!derived2.equals(value)) {
      derived2.v = value;
      derived2.wv = increment_write_version();
    }
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/reactivity/effects.js
  function validate_effect(rune) {
    if (active_effect === null && active_reaction === null) {
      effect_orphan(rune);
    }
    if (active_reaction !== null && (active_reaction.f & UNOWNED) !== 0 && active_effect === null) {
      effect_in_unowned_derived();
    }
    if (is_destroying_effect) {
      effect_in_teardown(rune);
    }
  }
  function push_effect(effect2, parent_effect) {
    var parent_last = parent_effect.last;
    if (parent_last === null) {
      parent_effect.last = parent_effect.first = effect2;
    } else {
      parent_last.next = effect2;
      effect2.prev = parent_last;
      parent_effect.last = effect2;
    }
  }
  function create_effect(type, fn, sync, push2 = true) {
    var _a3;
    var is_root = (type & ROOT_EFFECT) !== 0;
    var parent_effect = active_effect;
    if (dev_fallback_default) {
      while (parent_effect !== null && (parent_effect.f & INSPECT_EFFECT) !== 0) {
        parent_effect = parent_effect.parent;
      }
    }
    var effect2 = {
      ctx: component_context,
      deps: null,
      nodes_start: null,
      nodes_end: null,
      f: type | DIRTY,
      first: null,
      fn,
      last: null,
      next: null,
      parent: is_root ? null : parent_effect,
      prev: null,
      teardown: null,
      transitions: null,
      wv: 0
    };
    if (dev_fallback_default) {
      effect2.component_function = dev_current_component_function;
    }
    if (sync) {
      var previously_flushing_effect = is_flushing_effect;
      try {
        set_is_flushing_effect(true);
        update_effect(effect2);
        effect2.f |= EFFECT_RAN;
      } catch (e) {
        destroy_effect(effect2);
        throw e;
      } finally {
        set_is_flushing_effect(previously_flushing_effect);
      }
    } else if (fn !== null) {
      schedule_effect(effect2);
    }
    var inert = sync && effect2.deps === null && effect2.first === null && effect2.nodes_start === null && effect2.teardown === null && (effect2.f & (EFFECT_HAS_DERIVED | BOUNDARY_EFFECT)) === 0;
    if (!inert && !is_root && push2) {
      if (parent_effect !== null) {
        push_effect(effect2, parent_effect);
      }
      if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0) {
        var derived2 = (
          /** @type {Derived} */
          active_reaction
        );
        ((_a3 = derived2.effects) != null ? _a3 : derived2.effects = []).push(effect2);
      }
    }
    return effect2;
  }
  function teardown(fn) {
    const effect2 = create_effect(RENDER_EFFECT, null, false);
    set_signal_status(effect2, CLEAN);
    effect2.teardown = fn;
    return effect2;
  }
  function user_effect(fn) {
    var _a3;
    validate_effect("$effect");
    var defer = active_effect !== null && (active_effect.f & BRANCH_EFFECT) !== 0 && component_context !== null && !component_context.m;
    if (dev_fallback_default) {
      define_property(fn, "name", {
        value: "$effect"
      });
    }
    if (defer) {
      var context = (
        /** @type {ComponentContext} */
        component_context
      );
      ((_a3 = context.e) != null ? _a3 : context.e = []).push({
        fn,
        effect: active_effect,
        reaction: active_reaction
      });
    } else {
      var signal = effect(fn);
      return signal;
    }
  }
  function user_pre_effect(fn) {
    validate_effect("$effect.pre");
    if (dev_fallback_default) {
      define_property(fn, "name", {
        value: "$effect.pre"
      });
    }
    return render_effect(fn);
  }
  function effect_root(fn) {
    const effect2 = create_effect(ROOT_EFFECT, fn, true);
    return () => {
      destroy_effect(effect2);
    };
  }
  function component_root(fn) {
    const effect2 = create_effect(ROOT_EFFECT, fn, true);
    return (options = {}) => {
      return new Promise((fulfil) => {
        if (options.outro) {
          pause_effect(effect2, () => {
            destroy_effect(effect2);
            fulfil(void 0);
          });
        } else {
          destroy_effect(effect2);
          fulfil(void 0);
        }
      });
    };
  }
  function effect(fn) {
    return create_effect(EFFECT, fn, false);
  }
  function render_effect(fn) {
    return create_effect(RENDER_EFFECT, fn, true);
  }
  function template_effect(fn, thunks = [], d = derived) {
    const deriveds = thunks.map(d);
    const effect2 = () => fn(...deriveds.map(get));
    if (dev_fallback_default) {
      define_property(effect2, "name", {
        value: "{expression}"
      });
    }
    return block(effect2);
  }
  function block(fn, flags = 0) {
    return create_effect(RENDER_EFFECT | BLOCK_EFFECT | flags, fn, true);
  }
  function branch(fn, push2 = true) {
    return create_effect(RENDER_EFFECT | BRANCH_EFFECT, fn, true, push2);
  }
  function execute_effect_teardown(effect2) {
    var teardown2 = effect2.teardown;
    if (teardown2 !== null) {
      const previously_destroying_effect = is_destroying_effect;
      const previous_reaction = active_reaction;
      set_is_destroying_effect(true);
      set_active_reaction(null);
      try {
        teardown2.call(null);
      } finally {
        set_is_destroying_effect(previously_destroying_effect);
        set_active_reaction(previous_reaction);
      }
    }
  }
  function destroy_effect_children(signal, remove_dom = false) {
    var effect2 = signal.first;
    signal.first = signal.last = null;
    while (effect2 !== null) {
      var next2 = effect2.next;
      destroy_effect(effect2, remove_dom);
      effect2 = next2;
    }
  }
  function destroy_block_effect_children(signal) {
    var effect2 = signal.first;
    while (effect2 !== null) {
      var next2 = effect2.next;
      if ((effect2.f & BRANCH_EFFECT) === 0) {
        destroy_effect(effect2);
      }
      effect2 = next2;
    }
  }
  function destroy_effect(effect2, remove_dom = true) {
    var removed = false;
    if ((remove_dom || (effect2.f & HEAD_EFFECT) !== 0) && effect2.nodes_start !== null) {
      var node = effect2.nodes_start;
      var end = effect2.nodes_end;
      while (node !== null) {
        var next2 = node === end ? null : (
          /** @type {TemplateNode} */
          get_next_sibling(node)
        );
        node.remove();
        node = next2;
      }
      removed = true;
    }
    destroy_effect_children(effect2, remove_dom && !removed);
    remove_reactions(effect2, 0);
    set_signal_status(effect2, DESTROYED);
    var transitions = effect2.transitions;
    if (transitions !== null) {
      for (const transition2 of transitions) {
        transition2.stop();
      }
    }
    execute_effect_teardown(effect2);
    var parent = effect2.parent;
    if (parent !== null && parent.first !== null) {
      unlink_effect(effect2);
    }
    if (dev_fallback_default) {
      effect2.component_function = null;
    }
    effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.deps = effect2.fn = effect2.nodes_start = effect2.nodes_end = null;
  }
  function unlink_effect(effect2) {
    var parent = effect2.parent;
    var prev = effect2.prev;
    var next2 = effect2.next;
    if (prev !== null) prev.next = next2;
    if (next2 !== null) next2.prev = prev;
    if (parent !== null) {
      if (parent.first === effect2) parent.first = next2;
      if (parent.last === effect2) parent.last = prev;
    }
  }
  function pause_effect(effect2, callback) {
    var transitions = [];
    pause_children(effect2, transitions, true);
    run_out_transitions(transitions, () => {
      destroy_effect(effect2);
      if (callback) callback();
    });
  }
  function run_out_transitions(transitions, fn) {
    var remaining = transitions.length;
    if (remaining > 0) {
      var check = () => --remaining || fn();
      for (var transition2 of transitions) {
        transition2.out(check);
      }
    } else {
      fn();
    }
  }
  function pause_children(effect2, transitions, local) {
    if ((effect2.f & INERT) !== 0) return;
    effect2.f ^= INERT;
    if (effect2.transitions !== null) {
      for (const transition2 of effect2.transitions) {
        if (transition2.is_global || local) {
          transitions.push(transition2);
        }
      }
    }
    var child2 = effect2.first;
    while (child2 !== null) {
      var sibling2 = child2.next;
      var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
      pause_children(child2, transitions, transparent ? local : false);
      child2 = sibling2;
    }
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/dom/task.js
  var is_micro_task_queued = false;
  var is_idle_task_queued = false;
  var current_queued_micro_tasks = [];
  var current_queued_idle_tasks = [];
  function process_micro_tasks() {
    is_micro_task_queued = false;
    const tasks = current_queued_micro_tasks.slice();
    current_queued_micro_tasks = [];
    run_all(tasks);
  }
  function process_idle_tasks() {
    is_idle_task_queued = false;
    const tasks = current_queued_idle_tasks.slice();
    current_queued_idle_tasks = [];
    run_all(tasks);
  }
  function queue_micro_task(fn) {
    if (!is_micro_task_queued) {
      is_micro_task_queued = true;
      queueMicrotask(process_micro_tasks);
    }
    current_queued_micro_tasks.push(fn);
  }
  function flush_tasks() {
    if (is_micro_task_queued) {
      process_micro_tasks();
    }
    if (is_idle_task_queued) {
      process_idle_tasks();
    }
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/runtime.js
  var FLUSH_MICROTASK = 0;
  var FLUSH_SYNC = 1;
  var handled_errors = /* @__PURE__ */ new WeakSet();
  var is_throwing_error = false;
  var scheduler_mode = FLUSH_MICROTASK;
  var is_micro_task_queued2 = false;
  var last_scheduled_effect = null;
  var is_flushing_effect = false;
  var is_destroying_effect = false;
  function set_is_flushing_effect(value) {
    is_flushing_effect = value;
  }
  function set_is_destroying_effect(value) {
    is_destroying_effect = value;
  }
  var queued_root_effects = [];
  var flush_count = 0;
  var dev_effect_stack = [];
  var active_reaction = null;
  var untracking = false;
  function set_active_reaction(reaction) {
    active_reaction = reaction;
  }
  var active_effect = null;
  function set_active_effect(effect2) {
    active_effect = effect2;
  }
  var derived_sources = null;
  function set_derived_sources(sources) {
    derived_sources = sources;
  }
  var new_deps = null;
  var skipped_deps = 0;
  var untracked_writes = null;
  function set_untracked_writes(value) {
    untracked_writes = value;
  }
  var write_version = 1;
  var read_version = 0;
  var skip_reaction = false;
  var captured_signals = null;
  function increment_write_version() {
    return ++write_version;
  }
  function check_dirtiness(reaction) {
    var _a3, _b2;
    var flags = reaction.f;
    if ((flags & DIRTY) !== 0) {
      return true;
    }
    if ((flags & MAYBE_DIRTY) !== 0) {
      var dependencies = reaction.deps;
      var is_unowned = (flags & UNOWNED) !== 0;
      if (dependencies !== null) {
        var i;
        var dependency;
        var is_disconnected = (flags & DISCONNECTED) !== 0;
        var is_unowned_connected = is_unowned && active_effect !== null && !skip_reaction;
        var length = dependencies.length;
        if (is_disconnected || is_unowned_connected) {
          for (i = 0; i < length; i++) {
            dependency = dependencies[i];
            if (is_disconnected || !((_a3 = dependency == null ? void 0 : dependency.reactions) == null ? void 0 : _a3.includes(reaction))) {
              ((_b2 = dependency.reactions) != null ? _b2 : dependency.reactions = []).push(reaction);
            }
          }
          if (is_disconnected) {
            reaction.f ^= DISCONNECTED;
          }
        }
        for (i = 0; i < length; i++) {
          dependency = dependencies[i];
          if (check_dirtiness(
            /** @type {Derived} */
            dependency
          )) {
            update_derived(
              /** @type {Derived} */
              dependency
            );
          }
          if (dependency.wv > reaction.wv) {
            return true;
          }
        }
      }
      if (!is_unowned || active_effect !== null && !skip_reaction) {
        set_signal_status(reaction, CLEAN);
      }
    }
    return false;
  }
  function propagate_error(error, effect2) {
    var current = effect2;
    while (current !== null) {
      if ((current.f & BOUNDARY_EFFECT) !== 0) {
        try {
          current.fn(error);
          return;
        } catch (e) {
          current.f ^= BOUNDARY_EFFECT;
        }
      }
      current = current.parent;
    }
    is_throwing_error = false;
    throw error;
  }
  function should_rethrow_error(effect2) {
    return (effect2.f & DESTROYED) === 0 && (effect2.parent === null || (effect2.parent.f & BOUNDARY_EFFECT) === 0);
  }
  function handle_error(error, effect2, previous_effect, component_context2) {
    var _a3, _b2;
    if (is_throwing_error) {
      if (previous_effect === null) {
        is_throwing_error = false;
      }
      if (should_rethrow_error(effect2)) {
        throw error;
      }
      return;
    }
    if (previous_effect !== null) {
      is_throwing_error = true;
    }
    if (!dev_fallback_default || component_context2 === null || !(error instanceof Error) || handled_errors.has(error)) {
      propagate_error(error, effect2);
      return;
    }
    handled_errors.add(error);
    const component_stack = [];
    const effect_name = (_a3 = effect2.fn) == null ? void 0 : _a3.name;
    if (effect_name) {
      component_stack.push(effect_name);
    }
    let current_context = component_context2;
    while (current_context !== null) {
      if (dev_fallback_default) {
        var filename = (_b2 = current_context.function) == null ? void 0 : _b2[FILENAME];
        if (filename) {
          const file = filename.split("/").pop();
          component_stack.push(file);
        }
      }
      current_context = current_context.p;
    }
    const indent = /Firefox/.test(navigator.userAgent) ? "  " : "	";
    define_property(error, "message", {
      value: error.message + `
${component_stack.map((name) => `
${indent}in ${name}`).join("")}
`
    });
    define_property(error, "component_stack", {
      value: component_stack
    });
    const stack2 = error.stack;
    if (stack2) {
      const lines = stack2.split("\n");
      const new_lines = [];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes("svelte/src/internal")) {
          continue;
        }
        new_lines.push(line);
      }
      define_property(error, "stack", {
        value: new_lines.join("\n")
      });
    }
    propagate_error(error, effect2);
    if (should_rethrow_error(effect2)) {
      throw error;
    }
  }
  function schedule_possible_effect_self_invalidation(signal, effect2, depth = 0) {
    var reactions = signal.reactions;
    if (reactions === null) return;
    for (var i = 0; i < reactions.length; i++) {
      var reaction = reactions[i];
      if ((reaction.f & DERIVED) !== 0) {
        schedule_possible_effect_self_invalidation(
          /** @type {Derived} */
          reaction,
          effect2,
          depth + 1
        );
      } else if (effect2 === reaction) {
        if (depth === 0) {
          set_signal_status(reaction, DIRTY);
        } else if ((reaction.f & CLEAN) !== 0) {
          set_signal_status(reaction, MAYBE_DIRTY);
        }
        schedule_effect(
          /** @type {Effect} */
          reaction
        );
      }
    }
  }
  function update_reaction(reaction) {
    var _a3, _b2;
    var previous_deps = new_deps;
    var previous_skipped_deps = skipped_deps;
    var previous_untracked_writes = untracked_writes;
    var previous_reaction = active_reaction;
    var previous_skip_reaction = skip_reaction;
    var prev_derived_sources = derived_sources;
    var previous_component_context = component_context;
    var previous_untracking = untracking;
    var flags = reaction.f;
    new_deps = /** @type {null | Value[]} */
    null;
    skipped_deps = 0;
    untracked_writes = null;
    active_reaction = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
    skip_reaction = (flags & UNOWNED) !== 0 && (!is_flushing_effect || previous_reaction === null || previous_untracking);
    derived_sources = null;
    set_component_context(reaction.ctx);
    untracking = false;
    read_version++;
    try {
      var result = (
        /** @type {Function} */
        (0, reaction.fn)()
      );
      var deps = reaction.deps;
      if (new_deps !== null) {
        var i;
        remove_reactions(reaction, skipped_deps);
        if (deps !== null && skipped_deps > 0) {
          deps.length = skipped_deps + new_deps.length;
          for (i = 0; i < new_deps.length; i++) {
            deps[skipped_deps + i] = new_deps[i];
          }
        } else {
          reaction.deps = deps = new_deps;
        }
        if (!skip_reaction) {
          for (i = skipped_deps; i < deps.length; i++) {
            ((_b2 = (_a3 = deps[i]).reactions) != null ? _b2 : _a3.reactions = []).push(reaction);
          }
        }
      } else if (deps !== null && skipped_deps < deps.length) {
        remove_reactions(reaction, skipped_deps);
        deps.length = skipped_deps;
      }
      if (is_runes() && untracked_writes !== null && (reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0) {
        for (i = 0; i < /** @type {Source[]} */
        untracked_writes.length; i++) {
          schedule_possible_effect_self_invalidation(
            untracked_writes[i],
            /** @type {Effect} */
            reaction
          );
        }
      }
      if (previous_reaction !== null) {
        read_version++;
      }
      return result;
    } finally {
      new_deps = previous_deps;
      skipped_deps = previous_skipped_deps;
      untracked_writes = previous_untracked_writes;
      active_reaction = previous_reaction;
      skip_reaction = previous_skip_reaction;
      derived_sources = prev_derived_sources;
      set_component_context(previous_component_context);
      untracking = previous_untracking;
    }
  }
  function remove_reaction(signal, dependency) {
    let reactions = dependency.reactions;
    if (reactions !== null) {
      var index2 = index_of.call(reactions, signal);
      if (index2 !== -1) {
        var new_length = reactions.length - 1;
        if (new_length === 0) {
          reactions = dependency.reactions = null;
        } else {
          reactions[index2] = reactions[new_length];
          reactions.pop();
        }
      }
    }
    if (reactions === null && (dependency.f & DERIVED) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
    // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
    // allows us to skip the expensive work of disconnecting and immediately reconnecting it
    (new_deps === null || !new_deps.includes(dependency))) {
      set_signal_status(dependency, MAYBE_DIRTY);
      if ((dependency.f & (UNOWNED | DISCONNECTED)) === 0) {
        dependency.f ^= DISCONNECTED;
      }
      destroy_derived_effects(
        /** @type {Derived} **/
        dependency
      );
      remove_reactions(
        /** @type {Derived} **/
        dependency,
        0
      );
    }
  }
  function remove_reactions(signal, start_index) {
    var dependencies = signal.deps;
    if (dependencies === null) return;
    for (var i = start_index; i < dependencies.length; i++) {
      remove_reaction(signal, dependencies[i]);
    }
  }
  function update_effect(effect2) {
    var flags = effect2.f;
    if ((flags & DESTROYED) !== 0) {
      return;
    }
    set_signal_status(effect2, CLEAN);
    var previous_effect = active_effect;
    var previous_component_context = component_context;
    active_effect = effect2;
    if (dev_fallback_default) {
      var previous_component_fn = dev_current_component_function;
      set_dev_current_component_function(effect2.component_function);
    }
    try {
      if ((flags & BLOCK_EFFECT) !== 0) {
        destroy_block_effect_children(effect2);
      } else {
        destroy_effect_children(effect2);
      }
      execute_effect_teardown(effect2);
      var teardown2 = update_reaction(effect2);
      effect2.teardown = typeof teardown2 === "function" ? teardown2 : null;
      effect2.wv = write_version;
      var deps = effect2.deps;
      if (dev_fallback_default && tracing_mode_flag && (effect2.f & DIRTY) !== 0 && deps !== null) {
        for (let i = 0; i < deps.length; i++) {
          var dep = deps[i];
          if (dep.trace_need_increase) {
            dep.wv = increment_write_version();
            dep.trace_need_increase = void 0;
            dep.trace_v = void 0;
          }
        }
      }
      if (dev_fallback_default) {
        dev_effect_stack.push(effect2);
      }
    } catch (error) {
      handle_error(error, effect2, previous_effect, previous_component_context || effect2.ctx);
    } finally {
      active_effect = previous_effect;
      if (dev_fallback_default) {
        set_dev_current_component_function(previous_component_fn);
      }
    }
  }
  function log_effect_stack() {
    console.error(
      "Last ten effects were: ",
      dev_effect_stack.slice(-10).map((d) => d.fn)
    );
    dev_effect_stack = [];
  }
  function infinite_loop_guard() {
    if (flush_count > 1e3) {
      flush_count = 0;
      try {
        effect_update_depth_exceeded();
      } catch (error) {
        if (dev_fallback_default) {
          define_property(error, "stack", {
            value: ""
          });
        }
        if (last_scheduled_effect !== null) {
          if (dev_fallback_default) {
            try {
              handle_error(error, last_scheduled_effect, null, null);
            } catch (e) {
              log_effect_stack();
              throw e;
            }
          } else {
            handle_error(error, last_scheduled_effect, null, null);
          }
        } else {
          if (dev_fallback_default) {
            log_effect_stack();
          }
          throw error;
        }
      }
    }
    flush_count++;
  }
  function flush_queued_root_effects(root_effects) {
    var length = root_effects.length;
    if (length === 0) {
      return;
    }
    infinite_loop_guard();
    var previously_flushing_effect = is_flushing_effect;
    is_flushing_effect = true;
    try {
      for (var i = 0; i < length; i++) {
        var effect2 = root_effects[i];
        if ((effect2.f & CLEAN) === 0) {
          effect2.f ^= CLEAN;
        }
        var collected_effects = [];
        process_effects(effect2, collected_effects);
        flush_queued_effects(collected_effects);
      }
    } finally {
      is_flushing_effect = previously_flushing_effect;
    }
  }
  function flush_queued_effects(effects) {
    var length = effects.length;
    if (length === 0) return;
    for (var i = 0; i < length; i++) {
      var effect2 = effects[i];
      if ((effect2.f & (DESTROYED | INERT)) === 0) {
        try {
          if (check_dirtiness(effect2)) {
            update_effect(effect2);
            if (effect2.deps === null && effect2.first === null && effect2.nodes_start === null) {
              if (effect2.teardown === null) {
                unlink_effect(effect2);
              } else {
                effect2.fn = null;
              }
            }
          }
        } catch (error) {
          handle_error(error, effect2, null, effect2.ctx);
        }
      }
    }
  }
  function process_deferred() {
    is_micro_task_queued2 = false;
    if (flush_count > 1001) {
      return;
    }
    const previous_queued_root_effects = queued_root_effects;
    queued_root_effects = [];
    flush_queued_root_effects(previous_queued_root_effects);
    if (!is_micro_task_queued2) {
      flush_count = 0;
      last_scheduled_effect = null;
      if (dev_fallback_default) {
        dev_effect_stack = [];
      }
    }
  }
  function schedule_effect(signal) {
    if (scheduler_mode === FLUSH_MICROTASK) {
      if (!is_micro_task_queued2) {
        is_micro_task_queued2 = true;
        queueMicrotask(process_deferred);
      }
    }
    last_scheduled_effect = signal;
    var effect2 = signal;
    while (effect2.parent !== null) {
      effect2 = effect2.parent;
      var flags = effect2.f;
      if ((flags & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
        if ((flags & CLEAN) === 0) return;
        effect2.f ^= CLEAN;
      }
    }
    queued_root_effects.push(effect2);
  }
  function process_effects(effect2, collected_effects) {
    var current_effect = effect2.first;
    var effects = [];
    main_loop: while (current_effect !== null) {
      var flags = current_effect.f;
      var is_branch = (flags & BRANCH_EFFECT) !== 0;
      var is_skippable_branch = is_branch && (flags & CLEAN) !== 0;
      var sibling2 = current_effect.next;
      if (!is_skippable_branch && (flags & INERT) === 0) {
        if ((flags & RENDER_EFFECT) !== 0) {
          if (is_branch) {
            current_effect.f ^= CLEAN;
          } else {
            var previous_active_reaction = active_reaction;
            try {
              active_reaction = current_effect;
              if (check_dirtiness(current_effect)) {
                update_effect(current_effect);
              }
            } catch (error) {
              handle_error(error, current_effect, null, current_effect.ctx);
            } finally {
              active_reaction = previous_active_reaction;
            }
          }
          var child2 = current_effect.first;
          if (child2 !== null) {
            current_effect = child2;
            continue;
          }
        } else if ((flags & EFFECT) !== 0) {
          effects.push(current_effect);
        }
      }
      if (sibling2 === null) {
        let parent = current_effect.parent;
        while (parent !== null) {
          if (effect2 === parent) {
            break main_loop;
          }
          var parent_sibling = parent.next;
          if (parent_sibling !== null) {
            current_effect = parent_sibling;
            continue main_loop;
          }
          parent = parent.parent;
        }
      }
      current_effect = sibling2;
    }
    for (var i = 0; i < effects.length; i++) {
      child2 = effects[i];
      collected_effects.push(child2);
      process_effects(child2, collected_effects);
    }
  }
  function flush_sync(fn) {
    var previous_scheduler_mode = scheduler_mode;
    var previous_queued_root_effects = queued_root_effects;
    try {
      infinite_loop_guard();
      const root_effects = [];
      scheduler_mode = FLUSH_SYNC;
      queued_root_effects = root_effects;
      is_micro_task_queued2 = false;
      flush_queued_root_effects(previous_queued_root_effects);
      var result = fn == null ? void 0 : fn();
      flush_tasks();
      if (queued_root_effects.length > 0 || root_effects.length > 0) {
        flush_sync();
      }
      flush_count = 0;
      last_scheduled_effect = null;
      if (dev_fallback_default) {
        dev_effect_stack = [];
      }
      return result;
    } finally {
      scheduler_mode = previous_scheduler_mode;
      queued_root_effects = previous_queued_root_effects;
    }
  }
  function get(signal) {
    var flags = signal.f;
    var is_derived = (flags & DERIVED) !== 0;
    if (captured_signals !== null) {
      captured_signals.add(signal);
    }
    if (active_reaction !== null && !untracking) {
      if (derived_sources !== null && derived_sources.includes(signal)) {
        state_unsafe_local_read();
      }
      var deps = active_reaction.deps;
      if (signal.rv < read_version) {
        signal.rv = read_version;
        if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
          skipped_deps++;
        } else if (new_deps === null) {
          new_deps = [signal];
        } else if (!skip_reaction || !new_deps.includes(signal)) {
          new_deps.push(signal);
        }
      }
    } else if (is_derived && /** @type {Derived} */
    signal.deps === null && /** @type {Derived} */
    signal.effects === null) {
      var derived2 = (
        /** @type {Derived} */
        signal
      );
      var parent = derived2.parent;
      if (parent !== null && (parent.f & UNOWNED) === 0) {
        derived2.f ^= UNOWNED;
      }
    }
    if (is_derived) {
      derived2 = /** @type {Derived} */
      signal;
      if (check_dirtiness(derived2)) {
        update_derived(derived2);
      }
    }
    if (dev_fallback_default && tracing_mode_flag && tracing_expressions !== null && active_reaction !== null && tracing_expressions.reaction === active_reaction) {
      if (signal.debug) {
        signal.debug();
      } else if (signal.created) {
        var entry = tracing_expressions.entries.get(signal);
        if (entry === void 0) {
          entry = { read: [] };
          tracing_expressions.entries.set(signal, entry);
        }
        entry.read.push(get_stack("TracedAt"));
      }
    }
    return signal.v;
  }
  function untrack(fn) {
    var previous_untracking = untracking;
    try {
      untracking = true;
      return fn();
    } finally {
      untracking = previous_untracking;
    }
  }
  var STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
  function set_signal_status(signal, status) {
    signal.f = signal.f & STATUS_MASK | status;
  }
  function deep_read_state(value) {
    if (typeof value !== "object" || !value || value instanceof EventTarget) {
      return;
    }
    if (STATE_SYMBOL in value) {
      deep_read(value);
    } else if (!Array.isArray(value)) {
      for (let key in value) {
        const prop2 = value[key];
        if (typeof prop2 === "object" && prop2 && STATE_SYMBOL in prop2) {
          deep_read(prop2);
        }
      }
    }
  }
  function deep_read(value, visited = /* @__PURE__ */ new Set()) {
    if (typeof value === "object" && value !== null && // We don't want to traverse DOM elements
    !(value instanceof EventTarget) && !visited.has(value)) {
      visited.add(value);
      if (value instanceof Date) {
        value.getTime();
      }
      for (let key in value) {
        try {
          deep_read(value[key], visited);
        } catch (e) {
        }
      }
      const proto = get_prototype_of(value);
      if (proto !== Object.prototype && proto !== Array.prototype && proto !== Map.prototype && proto !== Set.prototype && proto !== Date.prototype) {
        const descriptors = get_descriptors(proto);
        for (let key in descriptors) {
          const get3 = descriptors[key].get;
          if (get3) {
            try {
              get3.call(value);
            } catch (e) {
            }
          }
        }
      }
    }
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/utils.js
  var DOM_BOOLEAN_ATTRIBUTES = [
    "allowfullscreen",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "disabled",
    "formnovalidate",
    "hidden",
    "indeterminate",
    "inert",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "seamless",
    "selected",
    "webkitdirectory",
    "defer",
    "disablepictureinpicture",
    "disableremoteplayback"
  ];
  var DOM_PROPERTIES = [
    ...DOM_BOOLEAN_ATTRIBUTES,
    "formNoValidate",
    "isMap",
    "noModule",
    "playsInline",
    "readOnly",
    "value",
    "volume",
    "defaultValue",
    "defaultChecked",
    "srcObject",
    "noValidate",
    "allowFullscreen",
    "disablePictureInPicture",
    "disableRemotePlayback"
  ];
  var PASSIVE_EVENTS = ["touchstart", "touchmove"];
  function is_passive_event(name) {
    return PASSIVE_EVENTS.includes(name);
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/dev/css.js
  var all_styles = /* @__PURE__ */ new Map();
  function register_style(hash2, style) {
    var styles = all_styles.get(hash2);
    if (!styles) {
      styles = /* @__PURE__ */ new Set();
      all_styles.set(hash2, styles);
    }
    styles.add(style);
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
  function without_reactive_context(fn) {
    var previous_reaction = active_reaction;
    var previous_effect = active_effect;
    set_active_reaction(null);
    set_active_effect(null);
    try {
      return fn();
    } finally {
      set_active_reaction(previous_reaction);
      set_active_effect(previous_effect);
    }
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/dom/elements/events.js
  var all_registered_events = /* @__PURE__ */ new Set();
  var root_event_handles = /* @__PURE__ */ new Set();
  function create_event(event_name, dom, handler, options = {}) {
    function target_handler(event2) {
      if (!options.capture) {
        handle_event_propagation.call(dom, event2);
      }
      if (!event2.cancelBubble) {
        return without_reactive_context(() => {
          return handler == null ? void 0 : handler.call(this, event2);
        });
      }
    }
    if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") {
      queue_micro_task(() => {
        dom.addEventListener(event_name, target_handler, options);
      });
    } else {
      dom.addEventListener(event_name, target_handler, options);
    }
    return target_handler;
  }
  function event(event_name, dom, handler, capture, passive2) {
    var options = { capture, passive: passive2 };
    var target_handler = create_event(event_name, dom, handler, options);
    if (dom === document.body || dom === window || dom === document) {
      teardown(() => {
        dom.removeEventListener(event_name, target_handler, options);
      });
    }
  }
  function handle_event_propagation(event2) {
    var _a3;
    var handler_element = this;
    var owner_document = (
      /** @type {Node} */
      handler_element.ownerDocument
    );
    var event_name = event2.type;
    var path = ((_a3 = event2.composedPath) == null ? void 0 : _a3.call(event2)) || [];
    var current_target = (
      /** @type {null | Element} */
      path[0] || event2.target
    );
    var path_idx = 0;
    var handled_at = event2.__root;
    if (handled_at) {
      var at_idx = path.indexOf(handled_at);
      if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
      window)) {
        event2.__root = handler_element;
        return;
      }
      var handler_idx = path.indexOf(handler_element);
      if (handler_idx === -1) {
        return;
      }
      if (at_idx <= handler_idx) {
        path_idx = at_idx;
      }
    }
    current_target = /** @type {Element} */
    path[path_idx] || event2.target;
    if (current_target === handler_element) return;
    define_property(event2, "currentTarget", {
      configurable: true,
      get() {
        return current_target || owner_document;
      }
    });
    var previous_reaction = active_reaction;
    var previous_effect = active_effect;
    set_active_reaction(null);
    set_active_effect(null);
    try {
      var throw_error;
      var other_errors = [];
      while (current_target !== null) {
        var parent_element = current_target.assignedSlot || current_target.parentNode || /** @type {any} */
        current_target.host || null;
        try {
          var delegated = current_target["__" + event_name];
          if (delegated !== void 0 && !/** @type {any} */
          current_target.disabled) {
            if (is_array(delegated)) {
              var [fn, ...data] = delegated;
              fn.apply(current_target, [event2, ...data]);
            } else {
              delegated.call(current_target, event2);
            }
          }
        } catch (error) {
          if (throw_error) {
            other_errors.push(error);
          } else {
            throw_error = error;
          }
        }
        if (event2.cancelBubble || parent_element === handler_element || parent_element === null) {
          break;
        }
        current_target = parent_element;
      }
      if (throw_error) {
        for (let error of other_errors) {
          queueMicrotask(() => {
            throw error;
          });
        }
        throw throw_error;
      }
    } finally {
      event2.__root = handler_element;
      delete event2.currentTarget;
      set_active_reaction(previous_reaction);
      set_active_effect(previous_effect);
    }
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/dom/blocks/svelte-head.js
  var head_anchor;
  function reset_head_anchor() {
    head_anchor = void 0;
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/dom/reconciler.js
  function create_fragment_from_html(html2) {
    var elem = document.createElement("template");
    elem.innerHTML = html2;
    return elem.content;
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/dom/template.js
  function assign_nodes(start, end) {
    var effect2 = (
      /** @type {Effect} */
      active_effect
    );
    if (effect2.nodes_start === null) {
      effect2.nodes_start = start;
      effect2.nodes_end = end;
    }
  }
  // @__NO_SIDE_EFFECTS__
  function template(content, flags) {
    var is_fragment = (flags & TEMPLATE_FRAGMENT) !== 0;
    var use_import_node = (flags & TEMPLATE_USE_IMPORT_NODE) !== 0;
    var node;
    var has_start = !content.startsWith("<!>");
    return () => {
      if (hydrating) {
        assign_nodes(hydrate_node, null);
        return hydrate_node;
      }
      if (node === void 0) {
        node = create_fragment_from_html(has_start ? content : "<!>" + content);
        if (!is_fragment) node = /** @type {Node} */
        get_first_child(node);
      }
      var clone = (
        /** @type {TemplateNode} */
        use_import_node ? document.importNode(node, true) : node.cloneNode(true)
      );
      if (is_fragment) {
        var start = (
          /** @type {TemplateNode} */
          get_first_child(clone)
        );
        var end = (
          /** @type {TemplateNode} */
          clone.lastChild
        );
        assign_nodes(start, end);
      } else {
        assign_nodes(clone, clone);
      }
      return clone;
    };
  }
  function append(anchor, dom) {
    if (hydrating) {
      active_effect.nodes_end = hydrate_node;
      hydrate_next();
      return;
    }
    if (anchor === null) {
      return;
    }
    anchor.before(
      /** @type {Node} */
      dom
    );
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/render.js
  var should_intro = true;
  function set_text(text2, value) {
    var _a3;
    var str = value == null ? "" : typeof value === "object" ? value + "" : value;
    if (str !== ((_a3 = text2.__t) != null ? _a3 : text2.__t = text2.nodeValue)) {
      text2.__t = str;
      text2.nodeValue = str + "";
    }
  }
  function mount(component2, options) {
    return _mount(component2, options);
  }
  function hydrate(component2, options) {
    var _a3;
    init_operations();
    options.intro = (_a3 = options.intro) != null ? _a3 : false;
    const target = options.target;
    const was_hydrating = hydrating;
    const previous_hydrate_node = hydrate_node;
    try {
      var anchor = (
        /** @type {TemplateNode} */
        get_first_child(target)
      );
      while (anchor && (anchor.nodeType !== 8 || /** @type {Comment} */
      anchor.data !== HYDRATION_START)) {
        anchor = /** @type {TemplateNode} */
        get_next_sibling(anchor);
      }
      if (!anchor) {
        throw HYDRATION_ERROR;
      }
      set_hydrating(true);
      set_hydrate_node(
        /** @type {Comment} */
        anchor
      );
      hydrate_next();
      const instance = _mount(component2, __spreadProps(__spreadValues({}, options), { anchor }));
      if (hydrate_node === null || hydrate_node.nodeType !== 8 || /** @type {Comment} */
      hydrate_node.data !== HYDRATION_END) {
        hydration_mismatch();
        throw HYDRATION_ERROR;
      }
      set_hydrating(false);
      return (
        /**  @type {Exports} */
        instance
      );
    } catch (error) {
      if (error === HYDRATION_ERROR) {
        if (options.recover === false) {
          hydration_failed();
        }
        init_operations();
        clear_text_content(target);
        set_hydrating(false);
        return mount(component2, options);
      }
      throw error;
    } finally {
      set_hydrating(was_hydrating);
      set_hydrate_node(previous_hydrate_node);
      reset_head_anchor();
    }
  }
  var document_listeners = /* @__PURE__ */ new Map();
  function _mount(Component, { target, anchor, props = {}, events, context, intro = true }) {
    init_operations();
    var registered_events = /* @__PURE__ */ new Set();
    var event_handle = (events2) => {
      for (var i = 0; i < events2.length; i++) {
        var event_name = events2[i];
        if (registered_events.has(event_name)) continue;
        registered_events.add(event_name);
        var passive2 = is_passive_event(event_name);
        target.addEventListener(event_name, handle_event_propagation, { passive: passive2 });
        var n = document_listeners.get(event_name);
        if (n === void 0) {
          document.addEventListener(event_name, handle_event_propagation, { passive: passive2 });
          document_listeners.set(event_name, 1);
        } else {
          document_listeners.set(event_name, n + 1);
        }
      }
    };
    event_handle(array_from(all_registered_events));
    root_event_handles.add(event_handle);
    var component2 = void 0;
    var unmount2 = component_root(() => {
      var anchor_node = anchor != null ? anchor : target.appendChild(create_text());
      branch(() => {
        if (context) {
          push({});
          var ctx = (
            /** @type {ComponentContext} */
            component_context
          );
          ctx.c = context;
        }
        if (events) {
          props.$$events = events;
        }
        if (hydrating) {
          assign_nodes(
            /** @type {TemplateNode} */
            anchor_node,
            null
          );
        }
        should_intro = intro;
        component2 = Component(anchor_node, props) || {};
        should_intro = true;
        if (hydrating) {
          active_effect.nodes_end = hydrate_node;
        }
        if (context) {
          pop();
        }
      });
      return () => {
        var _a3;
        for (var event_name of registered_events) {
          target.removeEventListener(event_name, handle_event_propagation);
          var n = (
            /** @type {number} */
            document_listeners.get(event_name)
          );
          if (--n === 0) {
            document.removeEventListener(event_name, handle_event_propagation);
            document_listeners.delete(event_name);
          } else {
            document_listeners.set(event_name, n);
          }
        }
        root_event_handles.delete(event_handle);
        if (anchor_node !== anchor) {
          (_a3 = anchor_node.parentNode) == null ? void 0 : _a3.removeChild(anchor_node);
        }
      };
    });
    mounted_components.set(component2, unmount2);
    return component2;
  }
  var mounted_components = /* @__PURE__ */ new WeakMap();
  function unmount(component2, options) {
    const fn = mounted_components.get(component2);
    if (fn) {
      mounted_components.delete(component2);
      return fn(options);
    }
    if (dev_fallback_default) {
      lifecycle_double_unmount();
    }
    return Promise.resolve();
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/dom/css.js
  function append_styles(anchor, css) {
    queue_micro_task(() => {
      var _a3;
      var root2 = anchor.getRootNode();
      var target = (
        /** @type {ShadowRoot} */
        root2.host ? (
          /** @type {ShadowRoot} */
          root2
        ) : (
          /** @type {Document} */
          (_a3 = root2.head) != null ? _a3 : (
            /** @type {Document} */
            root2.ownerDocument.head
          )
        )
      );
      if (!target.querySelector("#" + css.hash)) {
        const style = document.createElement("style");
        style.id = css.hash;
        style.textContent = css.code;
        target.appendChild(style);
        if (dev_fallback_default) {
          register_style(css.hash, style);
        }
      }
    });
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
  function is_bound_this(bound_value, element_or_component) {
    return bound_value === element_or_component || (bound_value == null ? void 0 : bound_value[STATE_SYMBOL]) === element_or_component;
  }
  function bind_this(element_or_component = {}, update2, get_value, get_parts) {
    effect(() => {
      var old_parts;
      var parts;
      render_effect(() => {
        old_parts = parts;
        parts = (get_parts == null ? void 0 : get_parts()) || [];
        untrack(() => {
          if (element_or_component !== get_value(...parts)) {
            update2(element_or_component, ...parts);
            if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) {
              update2(null, ...old_parts);
            }
          }
        });
      });
      return () => {
        queue_micro_task(() => {
          if (parts && is_bound_this(get_value(...parts), element_or_component)) {
            update2(null, ...parts);
          }
        });
      };
    });
    return element_or_component;
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/dom/legacy/lifecycle.js
  function init(immutable = false) {
    const context = (
      /** @type {ComponentContextLegacy} */
      component_context
    );
    const callbacks = context.l.u;
    if (!callbacks) return;
    let props = () => deep_read_state(context.s);
    if (immutable) {
      let version = 0;
      let prev = (
        /** @type {Record<string, any>} */
        {}
      );
      const d = derived(() => {
        let changed = false;
        const props2 = context.s;
        for (const key in props2) {
          if (props2[key] !== prev[key]) {
            prev[key] = props2[key];
            changed = true;
          }
        }
        if (changed) version++;
        return version;
      });
      props = () => get(d);
    }
    if (callbacks.b.length) {
      user_pre_effect(() => {
        observe_all(context, props);
        run_all(callbacks.b);
      });
    }
    user_effect(() => {
      const fns = untrack(() => callbacks.m.map(run));
      return () => {
        for (const fn of fns) {
          if (typeof fn === "function") {
            fn();
          }
        }
      };
    });
    if (callbacks.a.length) {
      user_effect(() => {
        observe_all(context, props);
        run_all(callbacks.a);
      });
    }
  }
  function observe_all(context, props) {
    if (context.l.s) {
      for (const signal of context.l.s) get(signal);
    }
    props();
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/reactivity/store.js
  var is_store_binding = false;
  var IS_UNMOUNTED = Symbol();
  function capture_store_binding(fn) {
    var previous_is_store_binding = is_store_binding;
    try {
      is_store_binding = false;
      return [fn(), is_store_binding];
    } finally {
      is_store_binding = previous_is_store_binding;
    }
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/reactivity/props.js
  function with_parent_branch(fn) {
    var effect2 = active_effect;
    var previous_effect = active_effect;
    while (effect2 !== null && (effect2.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
      effect2 = effect2.parent;
    }
    try {
      set_active_effect(effect2);
      return fn();
    } finally {
      set_active_effect(previous_effect);
    }
  }
  function prop(props, key, flags, fallback2) {
    var _a3, _b2;
    var immutable = (flags & PROPS_IS_IMMUTABLE) !== 0;
    var runes = !legacy_mode_flag || (flags & PROPS_IS_RUNES) !== 0;
    var bindable = (flags & PROPS_IS_BINDABLE) !== 0;
    var lazy = (flags & PROPS_IS_LAZY_INITIAL) !== 0;
    var is_store_sub = false;
    var prop_value;
    if (bindable) {
      [prop_value, is_store_sub] = capture_store_binding(() => (
        /** @type {V} */
        props[key]
      ));
    } else {
      prop_value = /** @type {V} */
      props[key];
    }
    var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
    var setter = bindable && ((_b2 = (_a3 = get_descriptor(props, key)) == null ? void 0 : _a3.set) != null ? _b2 : is_entry_props && key in props && ((v) => props[key] = v)) || void 0;
    var fallback_value = (
      /** @type {V} */
      fallback2
    );
    var fallback_dirty = true;
    var fallback_used = false;
    var get_fallback = () => {
      fallback_used = true;
      if (fallback_dirty) {
        fallback_dirty = false;
        if (lazy) {
          fallback_value = untrack(
            /** @type {() => V} */
            fallback2
          );
        } else {
          fallback_value = /** @type {V} */
          fallback2;
        }
      }
      return fallback_value;
    };
    if (prop_value === void 0 && fallback2 !== void 0) {
      if (setter && runes) {
        props_invalid_value(key);
      }
      prop_value = get_fallback();
      if (setter) setter(prop_value);
    }
    var getter;
    if (runes) {
      getter = () => {
        var value = (
          /** @type {V} */
          props[key]
        );
        if (value === void 0) return get_fallback();
        fallback_dirty = true;
        fallback_used = false;
        return value;
      };
    } else {
      var derived_getter = with_parent_branch(
        () => (immutable ? derived : derived_safe_equal)(() => (
          /** @type {V} */
          props[key]
        ))
      );
      derived_getter.f |= LEGACY_DERIVED_PROP;
      getter = () => {
        var value = get(derived_getter);
        if (value !== void 0) fallback_value = /** @type {V} */
        void 0;
        return value === void 0 ? fallback_value : value;
      };
    }
    if ((flags & PROPS_IS_UPDATED) === 0) {
      return getter;
    }
    if (setter) {
      var legacy_parent = props.$$legacy;
      return function(value, mutation) {
        if (arguments.length > 0) {
          if (!runes || !mutation || legacy_parent || is_store_sub) {
            setter(mutation ? getter() : value);
          }
          return value;
        } else {
          return getter();
        }
      };
    }
    var from_child = false;
    var was_from_child = false;
    var inner_current_value = mutable_source(prop_value);
    var current_value = with_parent_branch(
      () => derived(() => {
        var parent_value = getter();
        var child_value = get(inner_current_value);
        if (from_child) {
          from_child = false;
          was_from_child = true;
          return child_value;
        }
        was_from_child = false;
        return inner_current_value.v = parent_value;
      })
    );
    if (!immutable) current_value.equals = safe_equals;
    return function(value, mutation) {
      if (captured_signals !== null) {
        from_child = was_from_child;
        getter();
        get(inner_current_value);
      }
      if (arguments.length > 0) {
        const new_value = mutation ? get(current_value) : runes && bindable ? proxy(value) : value;
        if (!current_value.equals(new_value)) {
          from_child = true;
          set(inner_current_value, new_value);
          if (fallback_used && fallback_value !== void 0) {
            fallback_value = new_value;
          }
          untrack(() => get(current_value));
        }
        return value;
      }
      return get(current_value);
    };
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/legacy/legacy-client.js
  function createClassComponent(options) {
    return new Svelte4Component(options);
  }
  var _events, _instance;
  var Svelte4Component = class {
    /**
     * @param {ComponentConstructorOptions & {
     *  component: any;
     * }} options
     */
    constructor(options) {
      /** @type {any} */
      __privateAdd(this, _events);
      /** @type {Record<string, any>} */
      __privateAdd(this, _instance);
      var _a3, _b2;
      var sources = /* @__PURE__ */ new Map();
      var add_source = (key, value) => {
        var s = mutable_source(value);
        sources.set(key, s);
        return s;
      };
      const props = new Proxy(
        __spreadProps(__spreadValues({}, options.props || {}), { $$events: {} }),
        {
          get(target, prop2) {
            var _a4;
            return get((_a4 = sources.get(prop2)) != null ? _a4 : add_source(prop2, Reflect.get(target, prop2)));
          },
          has(target, prop2) {
            var _a4;
            if (prop2 === LEGACY_PROPS) return true;
            get((_a4 = sources.get(prop2)) != null ? _a4 : add_source(prop2, Reflect.get(target, prop2)));
            return Reflect.has(target, prop2);
          },
          set(target, prop2, value) {
            var _a4;
            set((_a4 = sources.get(prop2)) != null ? _a4 : add_source(prop2, value), value);
            return Reflect.set(target, prop2, value);
          }
        }
      );
      __privateSet(this, _instance, (options.hydrate ? hydrate : mount)(options.component, {
        target: options.target,
        anchor: options.anchor,
        props,
        context: options.context,
        intro: (_a3 = options.intro) != null ? _a3 : false,
        recover: options.recover
      }));
      if (!((_b2 = options == null ? void 0 : options.props) == null ? void 0 : _b2.$$host) || options.sync === false) {
        flush_sync();
      }
      __privateSet(this, _events, props.$$events);
      for (const key of Object.keys(__privateGet(this, _instance))) {
        if (key === "$set" || key === "$destroy" || key === "$on") continue;
        define_property(this, key, {
          get() {
            return __privateGet(this, _instance)[key];
          },
          /** @param {any} value */
          set(value) {
            __privateGet(this, _instance)[key] = value;
          },
          enumerable: true
        });
      }
      __privateGet(this, _instance).$set = /** @param {Record<string, any>} next */
      (next2) => {
        Object.assign(props, next2);
      };
      __privateGet(this, _instance).$destroy = () => {
        unmount(__privateGet(this, _instance));
      };
    }
    /** @param {Record<string, any>} props */
    $set(props) {
      __privateGet(this, _instance).$set(props);
    }
    /**
     * @param {string} event
     * @param {(...args: any[]) => any} callback
     * @returns {any}
     */
    $on(event2, callback) {
      __privateGet(this, _events)[event2] = __privateGet(this, _events)[event2] || [];
      const cb = (...args) => callback.call(this, ...args);
      __privateGet(this, _events)[event2].push(cb);
      return () => {
        __privateGet(this, _events)[event2] = __privateGet(this, _events)[event2].filter(
          /** @param {any} fn */
          (fn) => fn !== cb
        );
      };
    }
    $destroy() {
      __privateGet(this, _instance).$destroy();
    }
  };
  _events = new WeakMap();
  _instance = new WeakMap();

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/client/dom/elements/custom-element.js
  var SvelteElement;
  if (typeof HTMLElement === "function") {
    SvelteElement = class extends HTMLElement {
      /**
       * @param {*} $$componentCtor
       * @param {*} $$slots
       * @param {*} use_shadow_dom
       */
      constructor($$componentCtor, $$slots, use_shadow_dom) {
        super();
        /** The Svelte component constructor */
        __publicField(this, "$$ctor");
        /** Slots */
        __publicField(this, "$$s");
        /** @type {any} The Svelte component instance */
        __publicField(this, "$$c");
        /** Whether or not the custom element is connected */
        __publicField(this, "$$cn", false);
        /** @type {Record<string, any>} Component props data */
        __publicField(this, "$$d", {});
        /** `true` if currently in the process of reflecting component props back to attributes */
        __publicField(this, "$$r", false);
        /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
        __publicField(this, "$$p_d", {});
        /** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
        __publicField(this, "$$l", {});
        /** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
        __publicField(this, "$$l_u", /* @__PURE__ */ new Map());
        /** @type {any} The managed render effect for reflecting attributes */
        __publicField(this, "$$me");
        this.$$ctor = $$componentCtor;
        this.$$s = $$slots;
        if (use_shadow_dom) {
          this.attachShadow({ mode: "open" });
        }
      }
      /**
       * @param {string} type
       * @param {EventListenerOrEventListenerObject} listener
       * @param {boolean | AddEventListenerOptions} [options]
       */
      addEventListener(type, listener, options) {
        this.$$l[type] = this.$$l[type] || [];
        this.$$l[type].push(listener);
        if (this.$$c) {
          const unsub = this.$$c.$on(type, listener);
          this.$$l_u.set(listener, unsub);
        }
        super.addEventListener(type, listener, options);
      }
      /**
       * @param {string} type
       * @param {EventListenerOrEventListenerObject} listener
       * @param {boolean | AddEventListenerOptions} [options]
       */
      removeEventListener(type, listener, options) {
        super.removeEventListener(type, listener, options);
        if (this.$$c) {
          const unsub = this.$$l_u.get(listener);
          if (unsub) {
            unsub();
            this.$$l_u.delete(listener);
          }
        }
      }
      connectedCallback() {
        return __async(this, null, function* () {
          this.$$cn = true;
          if (!this.$$c) {
            let create_slot = function(name) {
              return (anchor) => {
                const slot2 = document.createElement("slot");
                if (name !== "default") slot2.name = name;
                append(anchor, slot2);
              };
            };
            yield Promise.resolve();
            if (!this.$$cn || this.$$c) {
              return;
            }
            const $$slots = {};
            const existing_slots = get_custom_elements_slots(this);
            for (const name of this.$$s) {
              if (name in existing_slots) {
                if (name === "default" && !this.$$d.children) {
                  this.$$d.children = create_slot(name);
                  $$slots.default = true;
                } else {
                  $$slots[name] = create_slot(name);
                }
              }
            }
            for (const attribute of this.attributes) {
              const name = this.$$g_p(attribute.name);
              if (!(name in this.$$d)) {
                this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
              }
            }
            for (const key in this.$$p_d) {
              if (!(key in this.$$d) && this[key] !== void 0) {
                this.$$d[key] = this[key];
                delete this[key];
              }
            }
            this.$$c = createClassComponent({
              component: this.$$ctor,
              target: this.shadowRoot || this,
              props: __spreadProps(__spreadValues({}, this.$$d), {
                $$slots,
                $$host: this
              })
            });
            this.$$me = effect_root(() => {
              render_effect(() => {
                var _a3;
                this.$$r = true;
                for (const key of object_keys(this.$$c)) {
                  if (!((_a3 = this.$$p_d[key]) == null ? void 0 : _a3.reflect)) continue;
                  this.$$d[key] = this.$$c[key];
                  const attribute_value = get_custom_element_value(
                    key,
                    this.$$d[key],
                    this.$$p_d,
                    "toAttribute"
                  );
                  if (attribute_value == null) {
                    this.removeAttribute(this.$$p_d[key].attribute || key);
                  } else {
                    this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
                  }
                }
                this.$$r = false;
              });
            });
            for (const type in this.$$l) {
              for (const listener of this.$$l[type]) {
                const unsub = this.$$c.$on(type, listener);
                this.$$l_u.set(listener, unsub);
              }
            }
            this.$$l = {};
          }
        });
      }
      // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
      // and setting attributes through setAttribute etc, this is helpful
      /**
       * @param {string} attr
       * @param {string} _oldValue
       * @param {string} newValue
       */
      attributeChangedCallback(attr2, _oldValue, newValue) {
        var _a3;
        if (this.$$r) return;
        attr2 = this.$$g_p(attr2);
        this.$$d[attr2] = get_custom_element_value(attr2, newValue, this.$$p_d, "toProp");
        (_a3 = this.$$c) == null ? void 0 : _a3.$set({ [attr2]: this.$$d[attr2] });
      }
      disconnectedCallback() {
        this.$$cn = false;
        Promise.resolve().then(() => {
          if (!this.$$cn && this.$$c) {
            this.$$c.$destroy();
            this.$$me();
            this.$$c = void 0;
          }
        });
      }
      /**
       * @param {string} attribute_name
       */
      $$g_p(attribute_name) {
        return object_keys(this.$$p_d).find(
          (key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name
        ) || attribute_name;
      }
    };
  }
  function get_custom_element_value(prop2, value, props_definition, transform) {
    var _a3;
    const type = (_a3 = props_definition[prop2]) == null ? void 0 : _a3.type;
    value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
    if (!transform || !props_definition[prop2]) {
      return value;
    } else if (transform === "toAttribute") {
      switch (type) {
        case "Object":
        case "Array":
          return value == null ? null : JSON.stringify(value);
        case "Boolean":
          return value ? "" : null;
        case "Number":
          return value == null ? null : value;
        default:
          return value;
      }
    } else {
      switch (type) {
        case "Object":
        case "Array":
          return value && JSON.parse(value);
        case "Boolean":
          return value;
        // conversion already handled above
        case "Number":
          return value != null ? +value : value;
        default:
          return value;
      }
    }
  }
  function get_custom_elements_slots(element2) {
    const result = {};
    element2.childNodes.forEach((node) => {
      result[
        /** @type {Element} node */
        node.slot || "default"
      ] = true;
    });
    return result;
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/index-client.js
  if (dev_fallback_default) {
    let throw_rune_error = function(rune) {
      if (!(rune in globalThis)) {
        let value;
        Object.defineProperty(globalThis, rune, {
          configurable: true,
          // eslint-disable-next-line getter-return
          get: () => {
            if (value !== void 0) {
              return value;
            }
            rune_outside_svelte(rune);
          },
          set: (v) => {
            value = v;
          }
        });
      }
    };
    throw_rune_error("$state");
    throw_rune_error("$effect");
    throw_rune_error("$derived");
    throw_rune_error("$inspect");
    throw_rune_error("$props");
    throw_rune_error("$bindable");
  }

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/version.js
  var PUBLIC_VERSION = "5";

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/disclose-version.js
  if (typeof window !== "undefined")
    (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);

  // node_modules/.pnpm/svelte@5.19.9/node_modules/svelte/src/internal/flags/legacy.js
  enable_legacy_mode_flag();

  // src/components/Button.svelte
  var root = template(`<div class="svelte-1wradqy"><button class="svelte-1wradqy"><span class="svelte-1wradqy"> </span></button></div>`);
  var $$css = {
    hash: "svelte-1wradqy",
    code: 'button.svelte-1wradqy:hover {color:#ffffff;box-shadow:none;background-color:#a24fea;}button.svelte-1wradqy {width:100%;background-color:rgb(68, 235, 153);color:rgb(0, 0, 0);padding:10px 16px;cursor:pointer;transition:background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,\n			color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,\n			box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;border-radius:8px;border:none;}span.svelte-1wradqy {width:auto;font-size:14px;font-style:normal;font-family:"SB Sans Display", Helvetica, sans-serif;font-weight:400;line-height:20px;}div.svelte-1wradqy {display:flex;margin-top:24px;flex-direction:row;justify-content:flex-end;}'
  };
  function Button($$anchor, $$props) {
    push($$props, false);
    append_styles($$anchor, $$css);
    let text2 = prop($$props, "text", 8);
    let clickedText = prop($$props, "clickedText", 8);
    let onclick = prop($$props, "onclick", 8);
    let timeout;
    let currentText = mutable_state(text2());
    function clicked() {
      clearTimeout(timeout);
      timeout = setTimeout(() => set(currentText, text2()), 1e3);
      set(currentText, clickedText());
      onclick()();
    }
    init();
    var div = root();
    var button = child(div);
    var span = child(button);
    var text_1 = child(span, true);
    reset(span);
    reset(button);
    reset(div);
    template_effect(() => set_text(text_1, get(currentText)));
    event("click", button, clicked);
    append($$anchor, div);
    pop();
  }

  // src/routes/calendar/slug/onpopup.ts
  function copySlugFromPopupToCpipboard(popup) {
    return function() {
      var _a3, _b2, _c, _d;
      const project = (_a3 = popup.querySelector(
        'a[href^="/project/"][href$="/about"]'
      )) == null ? void 0 : _a3.textContent;
      if (!project) console.error("Cant get project info on", popup);
      const names = Array.from(
        popup.querySelectorAll('a[href^="/profile"]')
      ).map((e) => e.href.split("/").pop().split("@")[0]);
      const time = (_d = (_c = (_b2 = popup.querySelector("p")) == null ? void 0 : _b2.textContent) == null ? void 0 : _c.split(", ")) == null ? void 0 : _d[1];
      if (!time) console.error("Cant get evaluation timeframe on", popup);
      navigator.clipboard.writeText(`${project} ${time} (${names.join(",")})`);
    };
  }
  function injectSlugButton(popup) {
    mount(Button, {
      target: popup,
      props: {
        text: "Copy slug!",
        clickedText: "Copied!",
        onclick: copySlugFromPopupToCpipboard(popup)
      }
    });
  }

  // src/routes/calendar/index.ts
  var calendar_default = {
    load() {
      return __async(this, null, function* () {
        yield injectPopupWatcher();
        addOnpopupListener(injectSlugButton);
      });
    },
    unload() {
      return __async(this, null, function* () {
        ejectPopupWatcher();
      });
    }
  };

  // src/components/EnchantedText.svelte
  var root_1 = template(`<p class="enchanted-text svelte-v2p8dm"> </p>`);
  var $$css2 = {
    hash: "svelte-v2p8dm",
    code: '\n	@keyframes svelte-v2p8dm-enchantment {\n		0% {\n			background-position: 0% 50%;\n		}\n		50% {\n			background-position: 100% 50%;\n		}\n		100% {\n			background-position: 0% 50%;\n		}\n	}.enchanted-text.svelte-v2p8dm {font-size:24px;font-weight:bold;font-family:"Minecraft", sans-serif;background:linear-gradient(90deg, #8649c5, #4b0082, #3498db, #8649c5);background-size:300% 300%;background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;\n		animation: svelte-v2p8dm-enchantment 7s infinite linear;text-shadow:0px 0px 10px rgba(120, 0, 255, 0.8),\n			0px 0px 20px rgba(50, 50, 255, 0.5);}'
  };
  function EnchantedText($$anchor, $$props) {
    push($$props, true);
    append_styles($$anchor, $$css2);
    let root2;
    user_effect(() => {
      Object.entries($$props.dataset).forEach(([k, v]) => root2.dataset[k] = v);
    });
    var p = root_1();
    var text_1 = child(p, true);
    reset(p);
    bind_this(p, ($$value) => root2 = $$value, () => root2);
    template_effect(() => set_text(text_1, $$props.text));
    append($$anchor, p);
    pop();
  }

  // src/routes/index/enchantedNickname.ts
  var TEST_ID = "dashboard.personalInfo.name";
  var observer2 = new MutationObserver((records) => {
    var _a3;
    for (const r of records) {
      if (!r.addedNodes.length) continue;
      for (const n of Array.from(r.addedNodes)) {
        const target = n;
        if (((_a3 = target.dataset) == null ? void 0 : _a3.testid) === TEST_ID) {
          const nick = target.textContent;
          target.innerHTML = "";
          mount(EnchantedText, {
            intro: false,
            anchor: target,
            target: target.parentNode,
            props: {
              text: nick,
              dataset: {
                testid: TEST_ID
              }
            }
          });
          target.remove();
          observer2.disconnect();
        }
      }
    }
  });
  function enchant() {
    return __async(this, null, function* () {
      observer2.observe(document.body, {
        subtree: true,
        childList: true
      });
    });
  }

  // src/routes/index/задумчивый_господин.ts
  var observer3 = new MutationObserver((records) => {
    for (const r of records) {
      const img = r.target;
      if (img.src.includes("/thinker-")) {
        observer3.disconnect();
        img.src = "https://static.wikia.nocookie.net/surrealmemes/images/a/a0/Moyai.png";
      }
    }
  });
  function observe() {
    observer3.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["src"]
    });
  }
  var _a2;
  var oldwidth = (_a2 = window.visualViewport) == null ? void 0 : _a2.width;
  function \u0437\u0430\u0434\u0443\u043C\u0447\u0438\u0432\u044B\u0439_\u0433\u043E\u0441\u043F\u043E\u0434\u0438\u043D() {
    observe();
    window.addEventListener("resize", () => {
      var _a3;
      const newwidth = (_a3 = window.visualViewport) == null ? void 0 : _a3.width;
      if (oldwidth !== newwidth) {
        oldwidth = newwidth;
        observe();
      }
    });
  }
  function \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u0442\u044C_\u0434\u0443\u043C\u0430\u0442\u044C() {
    observer3.disconnect();
  }

  // src/routes/index/index.ts
  var index_default = {
    load() {
      return __async(this, null, function* () {
        \u0437\u0430\u0434\u0443\u043C\u0447\u0438\u0432\u044B\u0439_\u0433\u043E\u0441\u043F\u043E\u0434\u0438\u043D();
        enchant();
      });
    },
    unload() {
      return __async(this, null, function* () {
        \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u0442\u044C_\u0434\u0443\u043C\u0430\u0442\u044C();
      });
    }
  };

  // src/utils/random.ts
  function stringToSeed(str) {
    let hash2 = 0;
    for (let i = 0; i < str.length; i++) {
      hash2 = (hash2 << 5) - hash2 + str.charCodeAt(i);
      hash2 |= 0;
    }
    return hash2 >>> 0;
  }
  function seededRandom(str) {
    let seed = stringToSeed(str);
    return seed % 1e4 / 1e4;
  }

  // src/api/neko.ts
  var nekosAvatarPool = [];
  function ensureNekoPoolLength(amount) {
    return __async(this, null, function* () {
      while (nekosAvatarPool.length < amount) {
        const fetchAmount = Math.min(Math.max(amount, 20));
        nekosAvatarPool.push(
          ...yield fetch(`https://nekos.best/api/v2/neko?amount=${fetchAmount}`).then((e) => e.json()).then((e) => e.results.map((n) => n.url))
        );
      }
    });
  }
  function getNeko(username) {
    return __async(this, null, function* () {
      yield ensureNekoPoolLength(2);
      return nekosAvatarPool[Math.trunc(seededRandom(username) * nekosAvatarPool.length)];
    });
  }

  // src/utils/gqlInterceptor.ts
  var operationHooks = /* @__PURE__ */ new Map();
  var operationHookOneshots = /* @__PURE__ */ new Map();
  function addOperationHook(operationName, config) {
    var _a3;
    const collection = config.oneshot ? operationHookOneshots : operationHooks;
    (_a3 = collection[operationName]) != null ? _a3 : collection[operationName] = [];
    collection[operationName].push(config.hook);
  }
  function modify(request, response) {
    return __async(this, null, function* () {
      var _a3;
      const req = JSON.parse(request);
      const data = JSON.parse(response);
      const res = (_a3 = data == null ? void 0 : data.data) != null ? _a3 : data;
      const oneshots = operationHookOneshots[req.operationName];
      if (oneshots) {
        for (const op of oneshots) {
          yield op(req, res);
        }
        oneshots.length = 0;
      }
      const hooks = operationHookOneshots[req.operationName];
      if (hooks) {
        for (const op of hooks) {
          yield op(req, res);
        }
      }
      return JSON.stringify(data);
    });
  }
  var originalFetch = unsafeWindow.fetch;
  unsafeWindow.fetch = function(url, options) {
    return __async(this, null, function* () {
      if (`${url}`.includes("sentry")) {
        console.warn(`Blocked ${url}`);
        return new Response();
      }
      const data = yield originalFetch(url, options);
      if (!`${url}`.includes("graphql") || !(options == null ? void 0 : options.body)) {
        return data;
      }
      const origText = data.text;
      data.text = function() {
        return __async(this, null, function* () {
          var _a3, _b2;
          return yield modify(
            (_b2 = (_a3 = options.body) == null ? void 0 : _a3.toString()) != null ? _b2 : "",
            yield origText.call(this)
          );
        });
      };
      data.json = function() {
        return __async(this, null, function* () {
          var _a3, _b2;
          return yield modify(
            (_b2 = (_a3 = options.body) == null ? void 0 : _a3.toString()) != null ? _b2 : "",
            yield origText.call(this)
          );
        });
      };
      return data;
    });
  };

  // src/utils/user.ts
  var userCache;
  addOperationHook("getCurrentUser", {
    oneshot: true,
    hook(_, resp) {
      userCache = resp.user.getCurrentUser;
    }
  });
  function getCurrentUser() {
    return waitNotNull(() => userCache, 1e4, 100);
  }

  // src/avatars.ts
  function digestText(message) {
    return __async(this, null, function* () {
      const msgUint8 = new TextEncoder().encode(message);
      const hashBuffer = yield crypto.subtle.digest("SHA-256", msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      return hashHex;
    });
  }
  var loginHashes = /* @__PURE__ */ new Map();
  function getGravatarUrl(username) {
    return __async(this, null, function* () {
      if (loginHashes.has(username)) {
        return `https://gravatar.com/avatar/${loginHashes.get(username)}?s=512&d=${encodeURIComponent(yield getNeko(username))}`;
      }
      const email = `${username}@student.21-school.ru`;
      const hash2 = yield digestText(email);
      loginHashes.set(username, hash2);
      return yield getGravatarUrl(username);
    });
  }
  function findUsernameNearby(i) {
    return __async(this, null, function* () {
      var _a3, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
      const u = yield getCurrentUser();
      const grandparent = (_a3 = i.parentNode) == null ? void 0 : _a3.parentNode;
      return (_q = (_o = (_m = (_k = (_i = (_f = (_c = i.closest("[data-testid='UserMenuWidget.MoreInfoButton']") ? u.login : void 0) != null ? _c : i.closest("[data-testid='components.teamMembersList.teamUser']") ? (_b2 = grandparent == null ? void 0 : grandparent.querySelector("[data-testid='components.teamMembersList.userLogin']")) == null ? void 0 : _b2.textContent : void 0) != null ? _f : (_e = (_d = grandparent == null ? void 0 : grandparent.parentNode) == null ? void 0 : _d.querySelector("[data-testid='dashboard.personalInfo.name']")) == null ? void 0 : _e.textContent) != null ? _i : (_h = (_g = grandparent == null ? void 0 : grandparent.parentNode) == null ? void 0 : _g.querySelector("[data-testid='personalInfo.studentLogin']")) == null ? void 0 : _h.textContent) != null ? _k : (_j = grandparent == null ? void 0 : grandparent.querySelector("[data-testid='Coalition.CoalitionList.Title.mvpLogin']")) == null ? void 0 : _j.textContent) != null ? _m : (_l = grandparent == null ? void 0 : grandparent.querySelector("[data-testid='Coalition.MembersList.Member.loginDisplay']")) == null ? void 0 : _l.textContent) != null ? _o : (_n = grandparent == null ? void 0 : grandparent.querySelector("[data-testid='Coalition.CoalitionList.Title.masterLogin']")) == null ? void 0 : _n.textContent) != null ? _q : (_p = grandparent == null ? void 0 : grandparent.querySelector("[data-testid='Coalition.CoalitionList.Member.login']")) == null ? void 0 : _p.textContent;
    });
  }
  var observer4 = new MutationObserver((records) => __async(void 0, null, function* () {
    for (const m of records) {
      const img = m.target;
      if (img.src.includes("/noavatar")) {
        const username = yield findUsernameNearby(img);
        console.log(img, username);
        if (!username) continue;
        if (window.location.pathname === "/competition/tournament") {
          yield ensureNekoPoolLength(50);
        }
        const url = yield getGravatarUrl(username);
        observer4.disconnect();
        img.src = url;
        observe2();
      }
    }
  }));
  function observe2() {
    observer4.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["src"]
    });
  }
  function observeNewAvatars() {
    return __async(this, null, function* () {
      observe2();
    });
  }

  // src/utils/navigateHook.ts
  function pathname() {
    return unsafeWindow.location.pathname.replace(/\/+$/, "");
  }
  function injectNavigationHook(callback) {
    let hash2 = pathname();
    const H = unsafeWindow.history;
    const oldPushState = H.pushState;
    H.pushState = function(...args) {
      if (typeof H.onpushstate == "function") {
        H.onpushstate(args[0]);
      }
      return oldPushState.apply(H, args);
    };
    H.onpushstate = () => {
      const nhash = pathname();
      if (nhash === hash2) return;
      hash2 = nhash;
      callback({ oldpath: hash2, newpath: nhash });
    };
    unsafeWindow.addEventListener("popstate", H.onpushstate);
    callback({ oldpath: hash2, newpath: pathname() });
  }

  // src/index.ts
  var routes = {
    "/calendar": calendar_default,
    "/": index_default,
    "": index_default
  };
  injectNavigationHook(({ oldpath, newpath }) => {
    var _a3, _b2;
    (_a3 = routes[oldpath]) == null ? void 0 : _a3.unload();
    (_b2 = routes[newpath]) == null ? void 0 : _b2.load();
    observeNewAvatars();
  });
})();
