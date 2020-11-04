import { a as createCommonjsModule$1, d as getDefaultExportFromCjs, c as commonjsGlobal$1 } from './common/_commonjsHelpers-709dc846.js';
import './common/runtime-607bd836.js';
import { B as BigNumber } from './common/bignumber-e85100d6.js';
import { g as global } from './common/global-5c50bad9.js';

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Used by `_.defaults` to customize its `_.assignIn` use.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to assign.
 * @param {Object} object The parent object of `objValue`.
 * @returns {*} Returns the value to assign.
 */
function assignInDefaults(objValue, srcValue, key, object) {
  if (objValue === undefined ||
      (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
    return srcValue;
  }
  return objValue;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * This method is like `_.assignIn` except that it accepts `customizer`
 * which is invoked to produce the assigned values. If `customizer` returns
 * `undefined`, assignment is handled by the method instead. The `customizer`
 * is invoked with five arguments: (objValue, srcValue, key, object, source).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias extendWith
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @see _.assignWith
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   return _.isUndefined(objValue) ? srcValue : objValue;
 * }
 *
 * var defaults = _.partialRight(_.assignInWith, customizer);
 *
 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
  copyObject(source, keysIn(source), object, customizer);
});

/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaultsDeep
 * @example
 *
 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var defaults = baseRest(function(args) {
  args.push(undefined, assignInDefaults);
  return apply(assignInWith, undefined, args);
});

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

var lodash_defaults = defaults;

var dist = createCommonjsModule$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

var SHOULD_RECONNECT_FALSE_MESSAGE = "Provided shouldReconnect() returned false. Closing permanently.";
var SHOULD_RECONNECT_PROMISE_FALSE_MESSAGE = "Provided shouldReconnect() resolved to false. Closing permanently.";
var SturdyWebSocket = /** @class */ (function () {
    function SturdyWebSocket(url, protocolsOrOptions, options) {
        this.url = url;
        this.onclose = null;
        this.onerror = null;
        this.onmessage = null;
        this.onopen = null;
        this.ondown = null;
        this.onreopen = null;
        this.CONNECTING = SturdyWebSocket.CONNECTING;
        this.OPEN = SturdyWebSocket.OPEN;
        this.CLOSING = SturdyWebSocket.CLOSING;
        this.CLOSED = SturdyWebSocket.CLOSED;
        this.hasBeenOpened = false;
        this.isClosed = false;
        this.messageBuffer = [];
        this.nextRetryTime = 0;
        this.reconnectCount = 0;
        this.lastKnownExtensions = "";
        this.lastKnownProtocol = "";
        this.listeners = {};
        if (protocolsOrOptions == null ||
            typeof protocolsOrOptions === "string" ||
            Array.isArray(protocolsOrOptions)) {
            this.protocols = protocolsOrOptions;
        }
        else {
            options = protocolsOrOptions;
        }
        this.options = lodash_defaults({}, options, SturdyWebSocket.DEFAULT_OPTIONS);
        if (!this.options.wsConstructor) {
            if (typeof WebSocket !== "undefined") {
                this.options.wsConstructor = WebSocket;
            }
            else {
                throw new Error("WebSocket not present in global scope and no " +
                    "wsConstructor option was provided.");
            }
        }
        this.openNewWebSocket();
    }
    Object.defineProperty(SturdyWebSocket.prototype, "binaryType", {
        get: function () {
            return this.binaryTypeInternal || "blob";
        },
        set: function (binaryType) {
            this.binaryTypeInternal = binaryType;
            if (this.ws) {
                this.ws.binaryType = binaryType;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SturdyWebSocket.prototype, "bufferedAmount", {
        get: function () {
            var sum = this.ws ? this.ws.bufferedAmount : 0;
            var hasUnknownAmount = false;
            this.messageBuffer.forEach(function (data) {
                var byteLength = getDataByteLength(data);
                if (byteLength != null) {
                    sum += byteLength;
                }
                else {
                    hasUnknownAmount = true;
                }
            });
            if (hasUnknownAmount) {
                this.debugLog("Some buffered data had unknown length. bufferedAmount()" +
                    " return value may be below the correct amount.");
            }
            return sum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SturdyWebSocket.prototype, "extensions", {
        get: function () {
            return this.ws ? this.ws.extensions : this.lastKnownExtensions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SturdyWebSocket.prototype, "protocol", {
        get: function () {
            return this.ws ? this.ws.protocol : this.lastKnownProtocol;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SturdyWebSocket.prototype, "readyState", {
        get: function () {
            return this.isClosed ? SturdyWebSocket.CLOSED : SturdyWebSocket.OPEN;
        },
        enumerable: true,
        configurable: true
    });
    SturdyWebSocket.prototype.close = function (code, reason) {
        if (this.ws) {
            this.ws.close(code, reason);
        }
        this.shutdown();
        this.debugLog("WebSocket permanently closed by client.");
    };
    SturdyWebSocket.prototype.send = function (data) {
        if (this.ws && this.ws.readyState === this.OPEN) {
            this.ws.send(data);
        }
        else {
            this.messageBuffer.push(data);
        }
    };
    SturdyWebSocket.prototype.addEventListener = function (type, listener) {
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(listener);
    };
    SturdyWebSocket.prototype.dispatchEvent = function (event) {
        return this.dispatchEventOfType(event.type, event);
    };
    SturdyWebSocket.prototype.removeEventListener = function (type, listener) {
        if (this.listeners[type]) {
            this.listeners[type] = this.listeners[type].filter(function (l) { return l !== listener; });
        }
    };
    SturdyWebSocket.prototype.openNewWebSocket = function () {
        var _this = this;
        if (this.isClosed) {
            return;
        }
        var _a = this.options, connectTimeout = _a.connectTimeout, wsConstructor = _a.wsConstructor;
        this.debugLog("Opening new WebSocket to " + this.url + ".");
        var ws = new wsConstructor(this.url, this.protocols);
        ws.onclose = function (event) { return _this.handleClose(event); };
        ws.onerror = function (event) { return _this.handleError(event); };
        ws.onmessage = function (event) { return _this.handleMessage(event); };
        ws.onopen = function (event) { return _this.handleOpen(event); };
        this.connectTimeoutId = setTimeout(function () {
            // If this is running, we still haven't opened the websocket.
            // Kill it so we can try again.
            _this.clearConnectTimeout();
            ws.close();
        }, connectTimeout);
        this.ws = ws;
    };
    SturdyWebSocket.prototype.handleOpen = function (event) {
        var _this = this;
        if (!this.ws || this.isClosed) {
            return;
        }
        var allClearResetTime = this.options.allClearResetTime;
        this.debugLog("WebSocket opened.");
        if (this.binaryTypeInternal != null) {
            this.ws.binaryType = this.binaryTypeInternal;
        }
        else {
            this.binaryTypeInternal = this.ws.binaryType;
        }
        this.clearConnectTimeout();
        if (this.hasBeenOpened) {
            this.dispatchEventOfType("reopen", event);
        }
        else {
            this.dispatchEventOfType("open", event);
            this.hasBeenOpened = true;
        }
        this.messageBuffer.forEach(function (message) { return _this.send(message); });
        this.messageBuffer = [];
        this.allClearTimeoutId = setTimeout(function () {
            _this.clearAllClearTimeout();
            _this.nextRetryTime = 0;
            _this.reconnectCount = 0;
            var openTime = (allClearResetTime / 1000) | 0;
            _this.debugLog("WebSocket remained open for " + openTime + " seconds. Resetting" +
                " retry time and count.");
        }, allClearResetTime);
    };
    SturdyWebSocket.prototype.handleMessage = function (event) {
        if (this.isClosed) {
            return;
        }
        this.dispatchEventOfType("message", event);
    };
    SturdyWebSocket.prototype.handleClose = function (event) {
        var _this = this;
        if (this.isClosed) {
            return;
        }
        var _a = this.options, maxReconnectAttempts = _a.maxReconnectAttempts, shouldReconnect = _a.shouldReconnect;
        this.clearConnectTimeout();
        this.clearAllClearTimeout();
        if (this.ws) {
            this.lastKnownExtensions = this.ws.extensions;
            this.lastKnownProtocol = this.ws.protocol;
            this.ws = undefined;
        }
        this.dispatchEventOfType("down", event);
        if (this.reconnectCount >= maxReconnectAttempts) {
            this.stopReconnecting(event, this.getTooManyFailedReconnectsMessage());
            return;
        }
        var willReconnect = shouldReconnect(event);
        if (typeof willReconnect === "boolean") {
            this.handleWillReconnect(willReconnect, event, SHOULD_RECONNECT_FALSE_MESSAGE);
        }
        else {
            willReconnect.then(function (willReconnectResolved) {
                if (_this.isClosed) {
                    return;
                }
                _this.handleWillReconnect(willReconnectResolved, event, SHOULD_RECONNECT_PROMISE_FALSE_MESSAGE);
            });
        }
    };
    SturdyWebSocket.prototype.handleError = function (event) {
        this.dispatchEventOfType("error", event);
        this.debugLog("WebSocket encountered an error.");
    };
    SturdyWebSocket.prototype.handleWillReconnect = function (willReconnect, event, denialReason) {
        if (willReconnect) {
            this.reconnect();
        }
        else {
            this.stopReconnecting(event, denialReason);
        }
    };
    SturdyWebSocket.prototype.reconnect = function () {
        var _this = this;
        var _a = this.options, minReconnectDelay = _a.minReconnectDelay, maxReconnectDelay = _a.maxReconnectDelay, reconnectBackoffFactor = _a.reconnectBackoffFactor;
        this.reconnectCount++;
        var retryTime = this.nextRetryTime;
        this.nextRetryTime = Math.max(minReconnectDelay, Math.min(this.nextRetryTime * reconnectBackoffFactor, maxReconnectDelay));
        setTimeout(function () { return _this.openNewWebSocket(); }, retryTime);
        var retryTimeSeconds = (retryTime / 1000) | 0;
        this.debugLog("WebSocket was closed. Re-opening in " + retryTimeSeconds + " seconds.");
    };
    SturdyWebSocket.prototype.stopReconnecting = function (event, debugReason) {
        this.debugLog(debugReason);
        this.shutdown();
        this.dispatchEventOfType("close", event);
    };
    SturdyWebSocket.prototype.shutdown = function () {
        this.isClosed = true;
        this.clearAllTimeouts();
        this.messageBuffer = [];
    };
    SturdyWebSocket.prototype.clearAllTimeouts = function () {
        this.clearConnectTimeout();
        this.clearAllClearTimeout();
    };
    SturdyWebSocket.prototype.clearConnectTimeout = function () {
        if (this.connectTimeoutId != null) {
            clearTimeout(this.connectTimeoutId);
            this.connectTimeoutId = undefined;
        }
    };
    SturdyWebSocket.prototype.clearAllClearTimeout = function () {
        if (this.allClearTimeoutId != null) {
            clearTimeout(this.allClearTimeoutId);
            this.allClearTimeoutId = undefined;
        }
    };
    SturdyWebSocket.prototype.dispatchEventOfType = function (type, event) {
        var _this = this;
        switch (type) {
            case "close":
                if (this.onclose) {
                    this.onclose(event);
                }
                break;
            case "error":
                if (this.onerror) {
                    this.onerror(event);
                }
                break;
            case "message":
                if (this.onmessage) {
                    this.onmessage(event);
                }
                break;
            case "open":
                if (this.onopen) {
                    this.onopen(event);
                }
                break;
            case "down":
                if (this.ondown) {
                    this.ondown(event);
                }
                break;
            case "reopen":
                if (this.onreopen) {
                    this.onreopen(event);
                }
                break;
        }
        if (type in this.listeners) {
            this.listeners[type]
                .slice()
                .forEach(function (listener) { return _this.callListener(listener, event); });
        }
        return !event || !event.defaultPrevented;
    };
    SturdyWebSocket.prototype.callListener = function (listener, event) {
        if (typeof listener === "function") {
            listener.call(this, event);
        }
        else {
            listener.handleEvent.call(this, event);
        }
    };
    SturdyWebSocket.prototype.debugLog = function (message) {
        if (this.options.debug) {
            // tslint:disable-next-line:no-console
            console.log(message);
        }
    };
    SturdyWebSocket.prototype.getTooManyFailedReconnectsMessage = function () {
        var maxReconnectAttempts = this.options.maxReconnectAttempts;
        return "Failed to reconnect after " + maxReconnectAttempts + " " + pluralize("attempt", maxReconnectAttempts) + ". Closing permanently.";
    };
    SturdyWebSocket.DEFAULT_OPTIONS = {
        allClearResetTime: 5000,
        connectTimeout: 5000,
        debug: false,
        minReconnectDelay: 1000,
        maxReconnectDelay: 30000,
        maxReconnectAttempts: Number.POSITIVE_INFINITY,
        reconnectBackoffFactor: 1.5,
        shouldReconnect: function () { return true; },
        wsConstructor: undefined,
    };
    SturdyWebSocket.CONNECTING = 0;
    SturdyWebSocket.OPEN = 1;
    SturdyWebSocket.CLOSING = 2;
    SturdyWebSocket.CLOSED = 3;
    return SturdyWebSocket;
}());
exports.default = SturdyWebSocket;
function getDataByteLength(data) {
    if (typeof data === "string") {
        // UTF-16 strings use two bytes per character.
        return 2 * data.length;
    }
    else if (data instanceof ArrayBuffer) {
        return data.byteLength;
    }
    else if (data instanceof Blob) {
        return data.size;
    }
    else {
        return undefined;
    }
}
function pluralize(s, n) {
    return n === 1 ? s : s + "s";
}
});

var SturdyWebSocket = /*@__PURE__*/getDefaultExportFromCjs(dist);

/* eslint-disable no-use-before-define */

/**
 * Base class for inheritance.
 */
class Base {
  /**
   * Extends this object and runs the init method.
   * Arguments to create() will be passed to init().
   *
   * @return {Object} The new object.
   *
   * @static
   *
   * @example
   *
   *     var instance = MyType.create();
   */
  static create(...args) {
    return new this(...args);
  }

  /**
   * Copies properties into this object.
   *
   * @param {Object} properties The properties to mix in.
   *
   * @example
   *
   *     MyType.mixIn({
   *         field: 'value'
   *     });
   */
  mixIn(properties) {
    return Object.assign(this, properties);
  }

  /**
   * Creates a copy of this object.
   *
   * @return {Object} The clone.
   *
   * @example
   *
   *     var clone = instance.clone();
   */
  clone() {
    const clone = new this.constructor();
    Object.assign(clone, this);
    return clone;
  }
}

/**
 * An array of 32-bit words.
 *
 * @property {Array} words The array of 32-bit words.
 * @property {number} sigBytes The number of significant bytes in this word array.
 */
class WordArray extends Base {
  /**
   * Initializes a newly created word array.
   *
   * @param {Array} words (Optional) An array of 32-bit words.
   * @param {number} sigBytes (Optional) The number of significant bytes in the words.
   *
   * @example
   *
   *     var wordArray = CryptoJS.lib.WordArray.create();
   *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
   *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
   */
  constructor(words = [], sigBytes = words.length * 4) {
    super();

    let typedArray = words;
    // Convert buffers to uint8
    if (typedArray instanceof ArrayBuffer) {
      typedArray = new Uint8Array(typedArray);
    }

    // Convert other array views to uint8
    if (
      typedArray instanceof Int8Array
      || typedArray instanceof Uint8ClampedArray
      || typedArray instanceof Int16Array
      || typedArray instanceof Uint16Array
      || typedArray instanceof Int32Array
      || typedArray instanceof Uint32Array
      || typedArray instanceof Float32Array
      || typedArray instanceof Float64Array
    ) {
      typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
    }

    // Handle Uint8Array
    if (typedArray instanceof Uint8Array) {
      // Shortcut
      const typedArrayByteLength = typedArray.byteLength;

      // Extract bytes
      const _words = [];
      for (let i = 0; i < typedArrayByteLength; i += 1) {
        _words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
      }

      // Initialize this word array
      this.words = _words;
      this.sigBytes = typedArrayByteLength;
    } else {
      // Else call normal init
      this.words = words;
      this.sigBytes = sigBytes;
    }
  }

  /**
   * Creates a word array filled with random bytes.
   *
   * @param {number} nBytes The number of random bytes to generate.
   *
   * @return {WordArray} The random word array.
   *
   * @static
   *
   * @example
   *
   *     var wordArray = CryptoJS.lib.WordArray.random(16);
   */
  static random(nBytes) {
    const words = [];

    const r = (m_w) => {
      let _m_w = m_w;
      let _m_z = 0x3ade68b1;
      const mask = 0xffffffff;

      return () => {
        _m_z = (0x9069 * (_m_z & 0xFFFF) + (_m_z >> 0x10)) & mask;
        _m_w = (0x4650 * (_m_w & 0xFFFF) + (_m_w >> 0x10)) & mask;
        let result = ((_m_z << 0x10) + _m_w) & mask;
        result /= 0x100000000;
        result += 0.5;
        return result * (Math.random() > 0.5 ? 1 : -1);
      };
    };

    for (let i = 0, rcache; i < nBytes; i += 4) {
      const _r = r((rcache || Math.random()) * 0x100000000);

      rcache = _r() * 0x3ade67b7;
      words.push((_r() * 0x100000000) | 0);
    }

    return new WordArray(words, nBytes);
  }

  /**
   * Converts this word array to a string.
   *
   * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
   *
   * @return {string} The stringified word array.
   *
   * @example
   *
   *     var string = wordArray + '';
   *     var string = wordArray.toString();
   *     var string = wordArray.toString(CryptoJS.enc.Utf8);
   */
  toString(encoder = Hex) {
    return encoder.stringify(this);
  }

  /**
   * Concatenates a word array to this word array.
   *
   * @param {WordArray} wordArray The word array to append.
   *
   * @return {WordArray} This word array.
   *
   * @example
   *
   *     wordArray1.concat(wordArray2);
   */
  concat(wordArray) {
    // Shortcuts
    const thisWords = this.words;
    const thatWords = wordArray.words;
    const thisSigBytes = this.sigBytes;
    const thatSigBytes = wordArray.sigBytes;

    // Clamp excess bits
    this.clamp();

    // Concat
    if (thisSigBytes % 4) {
      // Copy one byte at a time
      for (let i = 0; i < thatSigBytes; i += 1) {
        const thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
      }
    } else {
      // Copy one word at a time
      for (let i = 0; i < thatSigBytes; i += 4) {
        thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
      }
    }
    this.sigBytes += thatSigBytes;

    // Chainable
    return this;
  }

  /**
   * Removes insignificant bits.
   *
   * @example
   *
   *     wordArray.clamp();
   */
  clamp() {
    // Shortcuts
    const { words, sigBytes } = this;

    // Clamp
    words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
    words.length = Math.ceil(sigBytes / 4);
  }

  /**
   * Creates a copy of this word array.
   *
   * @return {WordArray} The clone.
   *
   * @example
   *
   *     var clone = wordArray.clone();
   */
  clone() {
    const clone = super.clone.call(this);
    clone.words = this.words.slice(0);

    return clone;
  }
}

/**
 * Hex encoding strategy.
 */
const Hex = {
  /**
   * Converts a word array to a hex string.
   *
   * @param {WordArray} wordArray The word array.
   *
   * @return {string} The hex string.
   *
   * @static
   *
   * @example
   *
   *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
   */
  stringify(wordArray) {
    // Shortcuts
    const { words, sigBytes } = wordArray;

    // Convert
    const hexChars = [];
    for (let i = 0; i < sigBytes; i += 1) {
      const bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
      hexChars.push((bite >>> 4).toString(16));
      hexChars.push((bite & 0x0f).toString(16));
    }

    return hexChars.join('');
  },

  /**
   * Converts a hex string to a word array.
   *
   * @param {string} hexStr The hex string.
   *
   * @return {WordArray} The word array.
   *
   * @static
   *
   * @example
   *
   *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
   */
  parse(hexStr) {
    // Shortcut
    const hexStrLength = hexStr.length;

    // Convert
    const words = [];
    for (let i = 0; i < hexStrLength; i += 2) {
      words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
    }

    return new WordArray(words, hexStrLength / 2);
  },
};

/**
 * Latin1 encoding strategy.
 */
const Latin1 = {
  /**
   * Converts a word array to a Latin1 string.
   *
   * @param {WordArray} wordArray The word array.
   *
   * @return {string} The Latin1 string.
   *
   * @static
   *
   * @example
   *
   *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
   */
  stringify(wordArray) {
    // Shortcuts
    const { words, sigBytes } = wordArray;

    // Convert
    const latin1Chars = [];
    for (let i = 0; i < sigBytes; i += 1) {
      const bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
      latin1Chars.push(String.fromCharCode(bite));
    }

    return latin1Chars.join('');
  },

  /**
   * Converts a Latin1 string to a word array.
   *
   * @param {string} latin1Str The Latin1 string.
   *
   * @return {WordArray} The word array.
   *
   * @static
   *
   * @example
   *
   *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
   */
  parse(latin1Str) {
    // Shortcut
    const latin1StrLength = latin1Str.length;

    // Convert
    const words = [];
    for (let i = 0; i < latin1StrLength; i += 1) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
    }

    return new WordArray(words, latin1StrLength);
  },
};

/**
 * UTF-8 encoding strategy.
 */
const Utf8 = {
  /**
   * Converts a word array to a UTF-8 string.
   *
   * @param {WordArray} wordArray The word array.
   *
   * @return {string} The UTF-8 string.
   *
   * @static
   *
   * @example
   *
   *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
   */
  stringify(wordArray) {
    try {
      return decodeURIComponent(escape(Latin1.stringify(wordArray)));
    } catch (e) {
      throw new Error('Malformed UTF-8 data');
    }
  },

  /**
   * Converts a UTF-8 string to a word array.
   *
   * @param {string} utf8Str The UTF-8 string.
   *
   * @return {WordArray} The word array.
   *
   * @static
   *
   * @example
   *
   *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
   */
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  },
};

/**
 * Abstract buffered block algorithm template.
 *
 * The property blockSize must be implemented in a concrete subtype.
 *
 * @property {number} _minBufferSize
 *
 *     The number of blocks that should be kept unprocessed in the buffer. Default: 0
 */
class BufferedBlockAlgorithm extends Base {
  constructor() {
    super();
    this._minBufferSize = 0;
  }

  /**
   * Resets this block algorithm's data buffer to its initial state.
   *
   * @example
   *
   *     bufferedBlockAlgorithm.reset();
   */
  reset() {
    // Initial values
    this._data = new WordArray();
    this._nDataBytes = 0;
  }

  /**
   * Adds new data to this block algorithm's buffer.
   *
   * @param {WordArray|string} data
   *
   *     The data to append. Strings are converted to a WordArray using UTF-8.
   *
   * @example
   *
   *     bufferedBlockAlgorithm._append('data');
   *     bufferedBlockAlgorithm._append(wordArray);
   */
  _append(data) {
    let m_data = data;

    // Convert string to WordArray, else assume WordArray already
    if (typeof m_data === 'string') {
      m_data = Utf8.parse(m_data);
    }

    // Append
    this._data.concat(m_data);
    this._nDataBytes += m_data.sigBytes;
  }

  /**
   * Processes available data blocks.
   *
   * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
   *
   * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
   *
   * @return {WordArray} The processed data.
   *
   * @example
   *
   *     var processedData = bufferedBlockAlgorithm._process();
   *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
   */
  _process(doFlush) {
    let processedWords;

    // Shortcuts
    const { _data: data, blockSize } = this;
    const dataWords = data.words;
    const dataSigBytes = data.sigBytes;
    const blockSizeBytes = blockSize * 4;

    // Count blocks ready
    let nBlocksReady = dataSigBytes / blockSizeBytes;
    if (doFlush) {
      // Round up to include partial blocks
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      // Round down to include only full blocks,
      // less the number of blocks that must remain in the buffer
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }

    // Count words ready
    const nWordsReady = nBlocksReady * blockSize;

    // Count bytes ready
    const nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

    // Process blocks
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += blockSize) {
        // Perform concrete-algorithm logic
        this._doProcessBlock(dataWords, offset);
      }

      // Remove processed words
      processedWords = dataWords.splice(0, nWordsReady);
      data.sigBytes -= nBytesReady;
    }

    // Return processed words
    return new WordArray(processedWords, nBytesReady);
  }

  /**
   * Creates a copy of this object.
   *
   * @return {Object} The clone.
   *
   * @example
   *
   *     var clone = bufferedBlockAlgorithm.clone();
   */
  clone() {
    const clone = super.clone.call(this);
    clone._data = this._data.clone();

    return clone;
  }
}

/**
 * Abstract hasher template.
 *
 * @property {number} blockSize
 *
 *     The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
 */
class Hasher extends BufferedBlockAlgorithm {
  constructor(cfg) {
    super();

    this.blockSize = 512 / 32;

    /**
     * Configuration options.
     */
    this.cfg = Object.assign(new Base(), cfg);

    // Set initial values
    this.reset();
  }

  /**
   * Creates a shortcut function to a hasher's object interface.
   *
   * @param {Hasher} SubHasher The hasher to create a helper for.
   *
   * @return {Function} The shortcut function.
   *
   * @static
   *
   * @example
   *
   *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
   */
  static _createHelper(SubHasher) {
    return (message, cfg) => new SubHasher(cfg).finalize(message);
  }

  /**
   * Creates a shortcut function to the HMAC's object interface.
   *
   * @param {Hasher} SubHasher The hasher to use in this HMAC helper.
   *
   * @return {Function} The shortcut function.
   *
   * @static
   *
   * @example
   *
   *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
   */
  static _createHmacHelper(SubHasher) {
    return (message, key) => new HMAC(SubHasher, key).finalize(message);
  }

  /**
   * Resets this hasher to its initial state.
   *
   * @example
   *
   *     hasher.reset();
   */
  reset() {
    // Reset data buffer
    super.reset.call(this);

    // Perform concrete-hasher logic
    this._doReset();
  }

  /**
   * Updates this hasher with a message.
   *
   * @param {WordArray|string} messageUpdate The message to append.
   *
   * @return {Hasher} This hasher.
   *
   * @example
   *
   *     hasher.update('message');
   *     hasher.update(wordArray);
   */
  update(messageUpdate) {
    // Append
    this._append(messageUpdate);

    // Update the hash
    this._process();

    // Chainable
    return this;
  }

  /**
   * Finalizes the hash computation.
   * Note that the finalize operation is effectively a destructive, read-once operation.
   *
   * @param {WordArray|string} messageUpdate (Optional) A final message update.
   *
   * @return {WordArray} The hash.
   *
   * @example
   *
   *     var hash = hasher.finalize();
   *     var hash = hasher.finalize('message');
   *     var hash = hasher.finalize(wordArray);
   */
  finalize(messageUpdate) {
    // Final message update
    if (messageUpdate) {
      this._append(messageUpdate);
    }

    // Perform concrete-hasher logic
    const hash = this._doFinalize();

    return hash;
  }
}

/**
 * HMAC algorithm.
 */
class HMAC extends Base {
  /**
   * Initializes a newly created HMAC.
   *
   * @param {Hasher} SubHasher The hash algorithm to use.
   * @param {WordArray|string} key The secret key.
   *
   * @example
   *
   *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
   */
  constructor(SubHasher, key) {
    super();

    const hasher = new SubHasher();
    this._hasher = hasher;

    // Convert string to WordArray, else assume WordArray already
    let _key = key;
    if (typeof _key === 'string') {
      _key = Utf8.parse(_key);
    }

    // Shortcuts
    const hasherBlockSize = hasher.blockSize;
    const hasherBlockSizeBytes = hasherBlockSize * 4;

    // Allow arbitrary length keys
    if (_key.sigBytes > hasherBlockSizeBytes) {
      _key = hasher.finalize(key);
    }

    // Clamp excess bits
    _key.clamp();

    // Clone key for inner and outer pads
    const oKey = _key.clone();
    this._oKey = oKey;
    const iKey = _key.clone();
    this._iKey = iKey;

    // Shortcuts
    const oKeyWords = oKey.words;
    const iKeyWords = iKey.words;

    // XOR keys with pad constants
    for (let i = 0; i < hasherBlockSize; i += 1) {
      oKeyWords[i] ^= 0x5c5c5c5c;
      iKeyWords[i] ^= 0x36363636;
    }
    oKey.sigBytes = hasherBlockSizeBytes;
    iKey.sigBytes = hasherBlockSizeBytes;

    // Set initial values
    this.reset();
  }

  /**
   * Resets this HMAC to its initial state.
   *
   * @example
   *
   *     hmacHasher.reset();
   */
  reset() {
    // Shortcut
    const hasher = this._hasher;

    // Reset
    hasher.reset();
    hasher.update(this._iKey);
  }

  /**
   * Updates this HMAC with a message.
   *
   * @param {WordArray|string} messageUpdate The message to append.
   *
   * @return {HMAC} This HMAC instance.
   *
   * @example
   *
   *     hmacHasher.update('message');
   *     hmacHasher.update(wordArray);
   */
  update(messageUpdate) {
    this._hasher.update(messageUpdate);

    // Chainable
    return this;
  }

  /**
   * Finalizes the HMAC computation.
   * Note that the finalize operation is effectively a destructive, read-once operation.
   *
   * @param {WordArray|string} messageUpdate (Optional) A final message update.
   *
   * @return {WordArray} The HMAC.
   *
   * @example
   *
   *     var hmac = hmacHasher.finalize();
   *     var hmac = hmacHasher.finalize('message');
   *     var hmac = hmacHasher.finalize(wordArray);
   */
  finalize(messageUpdate) {
    // Shortcut
    const hasher = this._hasher;

    // Compute HMAC
    const innerHash = hasher.finalize(messageUpdate);
    hasher.reset();
    const hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

    return hmac;
  }
}

const X32WordArray = WordArray;

/**
 * A 64-bit word.
 */
class X64Word extends Base {
  /**
   * Initializes a newly created 64-bit word.
   *
   * @param {number} high The high 32 bits.
   * @param {number} low The low 32 bits.
   *
   * @example
   *
   *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
   */
  constructor(high, low) {
    super();

    this.high = high;
    this.low = low;
  }
}

/**
 * An array of 64-bit words.
 *
 * @property {Array} words The array of CryptoJS.x64.Word objects.
 * @property {number} sigBytes The number of significant bytes in this word array.
 */
class X64WordArray extends Base {
  /**
   * Initializes a newly created word array.
   *
   * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
   * @param {number} sigBytes (Optional) The number of significant bytes in the words.
   *
   * @example
   *
   *     var wordArray = CryptoJS.x64.WordArray.create();
   *
   *     var wordArray = CryptoJS.x64.WordArray.create([
   *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
   *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
   *     ]);
   *
   *     var wordArray = CryptoJS.x64.WordArray.create([
   *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
   *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
   *     ], 10);
   */
  constructor(words = [], sigBytes = words.length * 8) {
    super();

    this.words = words;
    this.sigBytes = sigBytes;
  }

  /**
   * Converts this 64-bit word array to a 32-bit word array.
   *
   * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
   *
   * @example
   *
   *     var x32WordArray = x64WordArray.toX32();
   */
  toX32() {
    // Shortcuts
    const x64Words = this.words;
    const x64WordsLength = x64Words.length;

    // Convert
    const x32Words = [];
    for (let i = 0; i < x64WordsLength; i += 1) {
      const x64Word = x64Words[i];
      x32Words.push(x64Word.high);
      x32Words.push(x64Word.low);
    }

    return X32WordArray.create(x32Words, this.sigBytes);
  }

  /**
   * Creates a copy of this word array.
   *
   * @return {X64WordArray} The clone.
   *
   * @example
   *
   *     var clone = x64WordArray.clone();
   */
  clone() {
    const clone = super.clone.call(this);

    // Clone "words" array
    clone.words = this.words.slice(0);
    const { words } = clone;

    // Clone each X64Word object
    const wordsLength = words.length;
    for (let i = 0; i < wordsLength; i += 1) {
      words[i] = words[i].clone();
    }

    return clone;
  }
}

const parseLoop = (base64Str, base64StrLength, reverseMap) => {
  const words = [];
  let nBytes = 0;
  for (let i = 0; i < base64StrLength; i += 1) {
    if (i % 4) {
      const bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
      const bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
      const bitsCombined = bits1 | bits2;
      words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
      nBytes += 1;
    }
  }
  return WordArray.create(words, nBytes);
};

/**
 * Base64 encoding strategy.
 */
const Base64 = {
  /**
   * Converts a word array to a Base64 string.
   *
   * @param {WordArray} wordArray The word array.
   *
   * @return {string} The Base64 string.
   *
   * @static
   *
   * @example
   *
   *     const base64String = CryptoJS.enc.Base64.stringify(wordArray);
   */
  stringify(wordArray) {
    // Shortcuts
    const { words, sigBytes } = wordArray;
    const map = this._map;

    // Clamp excess bits
    wordArray.clamp();

    // Convert
    const base64Chars = [];
    for (let i = 0; i < sigBytes; i += 3) {
      const byte1 = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
      const byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
      const byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

      const triplet = (byte1 << 16) | (byte2 << 8) | byte3;

      for (let j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j += 1) {
        base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
      }
    }

    // Add padding
    const paddingChar = map.charAt(64);
    if (paddingChar) {
      while (base64Chars.length % 4) {
        base64Chars.push(paddingChar);
      }
    }

    return base64Chars.join('');
  },

  /**
   * Converts a Base64 string to a word array.
   *
   * @param {string} base64Str The Base64 string.
   *
   * @return {WordArray} The word array.
   *
   * @static
   *
   * @example
   *
   *     const wordArray = CryptoJS.enc.Base64.parse(base64String);
   */
  parse(base64Str) {
    // Shortcuts
    let base64StrLength = base64Str.length;
    const map = this._map;
    let reverseMap = this._reverseMap;

    if (!reverseMap) {
      this._reverseMap = [];
      reverseMap = this._reverseMap;
      for (let j = 0; j < map.length; j += 1) {
        reverseMap[map.charCodeAt(j)] = j;
      }
    }

    // Ignore padding
    const paddingChar = map.charAt(64);
    if (paddingChar) {
      const paddingIndex = base64Str.indexOf(paddingChar);
      if (paddingIndex !== -1) {
        base64StrLength = paddingIndex;
      }
    }

    // Convert
    return parseLoop(base64Str, base64StrLength, reverseMap);
  },

  _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
};

// Constants table
const T = [];

// Compute constants
for (let i = 0; i < 64; i += 1) {
  T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
}

const FF = (a, b, c, d, x, s, t) => {
  const n = a + ((b & c) | (~b & d)) + x + t;
  return ((n << s) | (n >>> (32 - s))) + b;
};

const GG = (a, b, c, d, x, s, t) => {
  const n = a + ((b & d) | (c & ~d)) + x + t;
  return ((n << s) | (n >>> (32 - s))) + b;
};

const HH = (a, b, c, d, x, s, t) => {
  const n = a + (b ^ c ^ d) + x + t;
  return ((n << s) | (n >>> (32 - s))) + b;
};

const II = (a, b, c, d, x, s, t) => {
  const n = a + (c ^ (b | ~d)) + x + t;
  return ((n << s) | (n >>> (32 - s))) + b;
};

/**
 * MD5 hash algorithm.
 */
class MD5Algo extends Hasher {
  _doReset() {
    this._hash = new WordArray([
      0x67452301,
      0xefcdab89,
      0x98badcfe,
      0x10325476,
    ]);
  }

  _doProcessBlock(M, offset) {
    const _M = M;

    // Swap endian
    for (let i = 0; i < 16; i += 1) {
      // Shortcuts
      const offset_i = offset + i;
      const M_offset_i = M[offset_i];

      _M[offset_i] = (
        (((M_offset_i << 8) | (M_offset_i >>> 24)) & 0x00ff00ff)
          | (((M_offset_i << 24) | (M_offset_i >>> 8)) & 0xff00ff00)
      );
    }

    // Shortcuts
    const H = this._hash.words;

    const M_offset_0 = _M[offset + 0];
    const M_offset_1 = _M[offset + 1];
    const M_offset_2 = _M[offset + 2];
    const M_offset_3 = _M[offset + 3];
    const M_offset_4 = _M[offset + 4];
    const M_offset_5 = _M[offset + 5];
    const M_offset_6 = _M[offset + 6];
    const M_offset_7 = _M[offset + 7];
    const M_offset_8 = _M[offset + 8];
    const M_offset_9 = _M[offset + 9];
    const M_offset_10 = _M[offset + 10];
    const M_offset_11 = _M[offset + 11];
    const M_offset_12 = _M[offset + 12];
    const M_offset_13 = _M[offset + 13];
    const M_offset_14 = _M[offset + 14];
    const M_offset_15 = _M[offset + 15];

    // Working varialbes
    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];

    // Computation
    a = FF(a, b, c, d, M_offset_0, 7, T[0]);
    d = FF(d, a, b, c, M_offset_1, 12, T[1]);
    c = FF(c, d, a, b, M_offset_2, 17, T[2]);
    b = FF(b, c, d, a, M_offset_3, 22, T[3]);
    a = FF(a, b, c, d, M_offset_4, 7, T[4]);
    d = FF(d, a, b, c, M_offset_5, 12, T[5]);
    c = FF(c, d, a, b, M_offset_6, 17, T[6]);
    b = FF(b, c, d, a, M_offset_7, 22, T[7]);
    a = FF(a, b, c, d, M_offset_8, 7, T[8]);
    d = FF(d, a, b, c, M_offset_9, 12, T[9]);
    c = FF(c, d, a, b, M_offset_10, 17, T[10]);
    b = FF(b, c, d, a, M_offset_11, 22, T[11]);
    a = FF(a, b, c, d, M_offset_12, 7, T[12]);
    d = FF(d, a, b, c, M_offset_13, 12, T[13]);
    c = FF(c, d, a, b, M_offset_14, 17, T[14]);
    b = FF(b, c, d, a, M_offset_15, 22, T[15]);

    a = GG(a, b, c, d, M_offset_1, 5, T[16]);
    d = GG(d, a, b, c, M_offset_6, 9, T[17]);
    c = GG(c, d, a, b, M_offset_11, 14, T[18]);
    b = GG(b, c, d, a, M_offset_0, 20, T[19]);
    a = GG(a, b, c, d, M_offset_5, 5, T[20]);
    d = GG(d, a, b, c, M_offset_10, 9, T[21]);
    c = GG(c, d, a, b, M_offset_15, 14, T[22]);
    b = GG(b, c, d, a, M_offset_4, 20, T[23]);
    a = GG(a, b, c, d, M_offset_9, 5, T[24]);
    d = GG(d, a, b, c, M_offset_14, 9, T[25]);
    c = GG(c, d, a, b, M_offset_3, 14, T[26]);
    b = GG(b, c, d, a, M_offset_8, 20, T[27]);
    a = GG(a, b, c, d, M_offset_13, 5, T[28]);
    d = GG(d, a, b, c, M_offset_2, 9, T[29]);
    c = GG(c, d, a, b, M_offset_7, 14, T[30]);
    b = GG(b, c, d, a, M_offset_12, 20, T[31]);

    a = HH(a, b, c, d, M_offset_5, 4, T[32]);
    d = HH(d, a, b, c, M_offset_8, 11, T[33]);
    c = HH(c, d, a, b, M_offset_11, 16, T[34]);
    b = HH(b, c, d, a, M_offset_14, 23, T[35]);
    a = HH(a, b, c, d, M_offset_1, 4, T[36]);
    d = HH(d, a, b, c, M_offset_4, 11, T[37]);
    c = HH(c, d, a, b, M_offset_7, 16, T[38]);
    b = HH(b, c, d, a, M_offset_10, 23, T[39]);
    a = HH(a, b, c, d, M_offset_13, 4, T[40]);
    d = HH(d, a, b, c, M_offset_0, 11, T[41]);
    c = HH(c, d, a, b, M_offset_3, 16, T[42]);
    b = HH(b, c, d, a, M_offset_6, 23, T[43]);
    a = HH(a, b, c, d, M_offset_9, 4, T[44]);
    d = HH(d, a, b, c, M_offset_12, 11, T[45]);
    c = HH(c, d, a, b, M_offset_15, 16, T[46]);
    b = HH(b, c, d, a, M_offset_2, 23, T[47]);

    a = II(a, b, c, d, M_offset_0, 6, T[48]);
    d = II(d, a, b, c, M_offset_7, 10, T[49]);
    c = II(c, d, a, b, M_offset_14, 15, T[50]);
    b = II(b, c, d, a, M_offset_5, 21, T[51]);
    a = II(a, b, c, d, M_offset_12, 6, T[52]);
    d = II(d, a, b, c, M_offset_3, 10, T[53]);
    c = II(c, d, a, b, M_offset_10, 15, T[54]);
    b = II(b, c, d, a, M_offset_1, 21, T[55]);
    a = II(a, b, c, d, M_offset_8, 6, T[56]);
    d = II(d, a, b, c, M_offset_15, 10, T[57]);
    c = II(c, d, a, b, M_offset_6, 15, T[58]);
    b = II(b, c, d, a, M_offset_13, 21, T[59]);
    a = II(a, b, c, d, M_offset_4, 6, T[60]);
    d = II(d, a, b, c, M_offset_11, 10, T[61]);
    c = II(c, d, a, b, M_offset_2, 15, T[62]);
    b = II(b, c, d, a, M_offset_9, 21, T[63]);

    // Intermediate hash value
    H[0] = (H[0] + a) | 0;
    H[1] = (H[1] + b) | 0;
    H[2] = (H[2] + c) | 0;
    H[3] = (H[3] + d) | 0;
  }
  /* eslint-ensable no-param-reassign */

  _doFinalize() {
    // Shortcuts
    const data = this._data;
    const dataWords = data.words;

    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = data.sigBytes * 8;

    // Add padding
    dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - (nBitsLeft % 32));

    const nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
    const nBitsTotalL = nBitsTotal;
    dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
      (((nBitsTotalH << 8) | (nBitsTotalH >>> 24)) & 0x00ff00ff)
        | (((nBitsTotalH << 24) | (nBitsTotalH >>> 8)) & 0xff00ff00)
    );
    dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
      (((nBitsTotalL << 8) | (nBitsTotalL >>> 24)) & 0x00ff00ff)
        | (((nBitsTotalL << 24) | (nBitsTotalL >>> 8)) & 0xff00ff00)
    );

    data.sigBytes = (dataWords.length + 1) * 4;

    // Hash final blocks
    this._process();

    // Shortcuts
    const hash = this._hash;
    const H = hash.words;

    // Swap endian
    for (let i = 0; i < 4; i += 1) {
      // Shortcut
      const H_i = H[i];

      H[i] = (((H_i << 8) | (H_i >>> 24)) & 0x00ff00ff)
        | (((H_i << 24) | (H_i >>> 8)) & 0xff00ff00);
    }

    // Return final computed hash
    return hash;
  }

  clone() {
    const clone = super.clone.call(this);
    clone._hash = this._hash.clone();

    return clone;
  }
}

/**
 * Shortcut function to the hasher's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 *
 * @return {WordArray} The hash.
 *
 * @static
 *
 * @example
 *
 *     var hash = CryptoJS.MD5('message');
 *     var hash = CryptoJS.MD5(wordArray);
 */
const MD5 = Hasher._createHelper(MD5Algo);

/**
 * Shortcut function to the HMAC's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 * @param {WordArray|string} key The secret key.
 *
 * @return {WordArray} The HMAC.
 *
 * @static
 *
 * @example
 *
 *     var hmac = CryptoJS.HmacMD5(message, key);
 */
const HmacMD5 = Hasher._createHmacHelper(MD5Algo);

/**
 * This key derivation function is meant to conform with EVP_BytesToKey.
 * www.openssl.org/docs/crypto/EVP_BytesToKey.html
 */
class EvpKDFAlgo extends Base {
  /**
   * Initializes a newly created key derivation function.
   *
   * @param {Object} cfg (Optional) The configuration options to use for the derivation.
   *
   * @example
   *
   *     const kdf = CryptoJS.algo.EvpKDF.create();
   *     const kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
   *     const kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
   */
  constructor(cfg) {
    super();

    /**
     * Configuration options.
     *
     * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
     * @property {Hasher} hasher The hash algorithm to use. Default: MD5
     * @property {number} iterations The number of iterations to perform. Default: 1
     */
    this.cfg = Object.assign(
      new Base(),
      {
        keySize: 128 / 32,
        hasher: MD5Algo,
        iterations: 1,
      },
      cfg,
    );
  }

  /**
   * Derives a key from a password.
   *
   * @param {WordArray|string} password The password.
   * @param {WordArray|string} salt A salt.
   *
   * @return {WordArray} The derived key.
   *
   * @example
   *
   *     const key = kdf.compute(password, salt);
   */
  compute(password, salt) {
    let block;

    // Shortcut
    const { cfg } = this;

    // Init hasher
    const hasher = cfg.hasher.create();

    // Initial values
    const derivedKey = WordArray.create();

    // Shortcuts
    const derivedKeyWords = derivedKey.words;
    const { keySize, iterations } = cfg;

    // Generate key
    while (derivedKeyWords.length < keySize) {
      if (block) {
        hasher.update(block);
      }
      block = hasher.update(password).finalize(salt);
      hasher.reset();

      // Iterations
      for (let i = 1; i < iterations; i += 1) {
        block = hasher.finalize(block);
        hasher.reset();
      }

      derivedKey.concat(block);
    }
    derivedKey.sigBytes = keySize * 4;

    return derivedKey;
  }
}

/**
 * Derives a key from a password.
 *
 * @param {WordArray|string} password The password.
 * @param {WordArray|string} salt A salt.
 * @param {Object} cfg (Optional) The configuration options to use for this computation.
 *
 * @return {WordArray} The derived key.
 *
 * @static
 *
 * @example
 *
 *     var key = CryptoJS.EvpKDF(password, salt);
 *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
 *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
 */
const EvpKDF = (password, salt, cfg) => EvpKDFAlgo.create(cfg).compute(password, salt);

/* eslint-disable no-use-before-define */

/**
 * Abstract base cipher template.
 *
 * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
 * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
 * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
 * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
 */
class Cipher extends BufferedBlockAlgorithm {
  /**
   * Initializes a newly created cipher.
   *
   * @param {number} xformMode Either the encryption or decryption transormation mode constant.
   * @param {WordArray} key The key.
   * @param {Object} cfg (Optional) The configuration options to use for this operation.
   *
   * @example
   *
   *     const cipher = CryptoJS.algo.AES.create(
   *       CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray }
   *     );
   */
  constructor(xformMode, key, cfg) {
    super();

    /**
     * Configuration options.
     *
     * @property {WordArray} iv The IV to use for this operation.
     */
    this.cfg = Object.assign(new Base(), cfg);

    // Store transform mode and key
    this._xformMode = xformMode;
    this._key = key;

    // Set initial values
    this.reset();
  }

  /**
   * Creates this cipher in encryption mode.
   *
   * @param {WordArray} key The key.
   * @param {Object} cfg (Optional) The configuration options to use for this operation.
   *
   * @return {Cipher} A cipher instance.
   *
   * @static
   *
   * @example
   *
   *     const cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
   */
  static createEncryptor(key, cfg) {
    return this.create(this._ENC_XFORM_MODE, key, cfg);
  }

  /**
   * Creates this cipher in decryption mode.
   *
   * @param {WordArray} key The key.
   * @param {Object} cfg (Optional) The configuration options to use for this operation.
   *
   * @return {Cipher} A cipher instance.
   *
   * @static
   *
   * @example
   *
   *     const cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
   */
  static createDecryptor(key, cfg) {
    return this.create(this._DEC_XFORM_MODE, key, cfg);
  }

  /**
   * Creates shortcut functions to a cipher's object interface.
   *
   * @param {Cipher} cipher The cipher to create a helper for.
   *
   * @return {Object} An object with encrypt and decrypt shortcut functions.
   *
   * @static
   *
   * @example
   *
   *     const AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
   */
  static _createHelper(SubCipher) {
    const selectCipherStrategy = (key) => {
      if (typeof key === 'string') {
        return PasswordBasedCipher;
      }
      return SerializableCipher;
    };

    return {
      encrypt(message, key, cfg) {
        return selectCipherStrategy(key).encrypt(SubCipher, message, key, cfg);
      },

      decrypt(ciphertext, key, cfg) {
        return selectCipherStrategy(key).decrypt(SubCipher, ciphertext, key, cfg);
      },
    };
  }

  /**
   * Resets this cipher to its initial state.
   *
   * @example
   *
   *     cipher.reset();
   */
  reset() {
    // Reset data buffer
    super.reset.call(this);

    // Perform concrete-cipher logic
    this._doReset();
  }

  /**
   * Adds data to be encrypted or decrypted.
   *
   * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
   *
   * @return {WordArray} The data after processing.
   *
   * @example
   *
   *     const encrypted = cipher.process('data');
   *     const encrypted = cipher.process(wordArray);
   */
  process(dataUpdate) {
    // Append
    this._append(dataUpdate);

    // Process available blocks
    return this._process();
  }

  /**
   * Finalizes the encryption or decryption process.
   * Note that the finalize operation is effectively a destructive, read-once operation.
   *
   * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
   *
   * @return {WordArray} The data after final processing.
   *
   * @example
   *
   *     const encrypted = cipher.finalize();
   *     const encrypted = cipher.finalize('data');
   *     const encrypted = cipher.finalize(wordArray);
   */
  finalize(dataUpdate) {
    // Final data update
    if (dataUpdate) {
      this._append(dataUpdate);
    }

    // Perform concrete-cipher logic
    const finalProcessedData = this._doFinalize();

    return finalProcessedData;
  }
}
Cipher._ENC_XFORM_MODE = 1;
Cipher._DEC_XFORM_MODE = 2;
Cipher.keySize = 128 / 32;
Cipher.ivSize = 128 / 32;

/**
 * Abstract base stream cipher template.
 *
 * @property {number} blockSize
 *
 *     The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
 */
class StreamCipher extends Cipher {
  constructor(...args) {
    super(...args);

    this.blockSize = 1;
  }

  _doFinalize() {
    // Process partial blocks
    const finalProcessedBlocks = this._process(!!'flush');

    return finalProcessedBlocks;
  }
}

/**
 * Abstract base block cipher mode template.
 */
class BlockCipherMode extends Base {
  /**
   * Initializes a newly created mode.
   *
   * @param {Cipher} cipher A block cipher instance.
   * @param {Array} iv The IV words.
   *
   * @example
   *
   *     const mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
   */
  constructor(cipher, iv) {
    super();

    this._cipher = cipher;
    this._iv = iv;
  }

  /**
   * Creates this mode for encryption.
   *
   * @param {Cipher} cipher A block cipher instance.
   * @param {Array} iv The IV words.
   *
   * @static
   *
   * @example
   *
   *     const mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
   */
  static createEncryptor(cipher, iv) {
    return this.Encryptor.create(cipher, iv);
  }

  /**
   * Creates this mode for decryption.
   *
   * @param {Cipher} cipher A block cipher instance.
   * @param {Array} iv The IV words.
   *
   * @static
   *
   * @example
   *
   *     const mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
   */
  static createDecryptor(cipher, iv) {
    return this.Decryptor.create(cipher, iv);
  }
}

function xorBlock(words, offset, blockSize) {
  const _words = words;
  let block;

  // Shortcut
  const iv = this._iv;

  // Choose mixing block
  if (iv) {
    block = iv;

    // Remove IV for subsequent blocks
    this._iv = undefined;
  } else {
    block = this._prevBlock;
  }

  // XOR blocks
  for (let i = 0; i < blockSize; i += 1) {
    _words[offset + i] ^= block[i];
  }
}

/**
 * Cipher Block Chaining mode.
 */

/**
 * Abstract base CBC mode.
 */
class CBC extends BlockCipherMode {
}
/**
 * CBC encryptor.
 */
CBC.Encryptor = class extends CBC {
  /**
   * Processes the data block at offset.
   *
   * @param {Array} words The data words to operate on.
   * @param {number} offset The offset where the block starts.
   *
   * @example
   *
   *     mode.processBlock(data.words, offset);
   */
  processBlock(words, offset) {
    // Shortcuts
    const cipher = this._cipher;
    const { blockSize } = cipher;

    // XOR and encrypt
    xorBlock.call(this, words, offset, blockSize);
    cipher.encryptBlock(words, offset);

    // Remember this block to use with next block
    this._prevBlock = words.slice(offset, offset + blockSize);
  }
};
/**
 * CBC decryptor.
 */
CBC.Decryptor = class extends CBC {
  /**
   * Processes the data block at offset.
   *
   * @param {Array} words The data words to operate on.
   * @param {number} offset The offset where the block starts.
   *
   * @example
   *
   *     mode.processBlock(data.words, offset);
   */
  processBlock(words, offset) {
    // Shortcuts
    const cipher = this._cipher;
    const { blockSize } = cipher;

    // Remember this block to use with next block
    const thisBlock = words.slice(offset, offset + blockSize);

    // Decrypt and XOR
    cipher.decryptBlock(words, offset);
    xorBlock.call(this, words, offset, blockSize);

    // This block becomes the previous block
    this._prevBlock = thisBlock;
  }
};

/**
 * PKCS #5/7 padding strategy.
 */
const Pkcs7 = {
  /**
   * Pads data using the algorithm defined in PKCS #5/7.
   *
   * @param {WordArray} data The data to pad.
   * @param {number} blockSize The multiple that the data should be padded to.
   *
   * @static
   *
   * @example
   *
   *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
   */
  pad(data, blockSize) {
    // Shortcut
    const blockSizeBytes = blockSize * 4;

    // Count padding bytes
    const nPaddingBytes = blockSizeBytes - (data.sigBytes % blockSizeBytes);

    // Create padding word
    const paddingWord = (nPaddingBytes << 24)
      | (nPaddingBytes << 16)
      | (nPaddingBytes << 8)
      | nPaddingBytes;

    // Create padding
    const paddingWords = [];
    for (let i = 0; i < nPaddingBytes; i += 4) {
      paddingWords.push(paddingWord);
    }
    const padding = WordArray.create(paddingWords, nPaddingBytes);

    // Add padding
    data.concat(padding);
  },

  /**
   * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
   *
   * @param {WordArray} data The data to unpad.
   *
   * @static
   *
   * @example
   *
   *     CryptoJS.pad.Pkcs7.unpad(wordArray);
   */
  unpad(data) {
    const _data = data;

    // Get number of padding bytes from last byte
    const nPaddingBytes = _data.words[(_data.sigBytes - 1) >>> 2] & 0xff;

    // Remove padding
    _data.sigBytes -= nPaddingBytes;
  },
};

/**
 * Abstract base block cipher template.
 *
 * @property {number} blockSize
 *
 *    The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
 */
class BlockCipher extends Cipher {
  constructor(xformMode, key, cfg) {
    /**
     * Configuration options.
     *
     * @property {Mode} mode The block mode to use. Default: CBC
     * @property {Padding} padding The padding strategy to use. Default: Pkcs7
     */
    super(xformMode, key, Object.assign(
      {
        mode: CBC,
        padding: Pkcs7,
      },
      cfg,
    ));

    this.blockSize = 128 / 32;
  }

  reset() {
    let modeCreator;

    // Reset cipher
    super.reset.call(this);

    // Shortcuts
    const { cfg } = this;
    const { iv, mode } = cfg;

    // Reset block mode
    if (this._xformMode === this.constructor._ENC_XFORM_MODE) {
      modeCreator = mode.createEncryptor;
    } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
      modeCreator = mode.createDecryptor;
      // Keep at least one block in the buffer for unpadding
      this._minBufferSize = 1;
    }

    this._mode = modeCreator.call(mode, this, iv && iv.words);
    this._mode.__creator = modeCreator;
  }

  _doProcessBlock(words, offset) {
    this._mode.processBlock(words, offset);
  }

  _doFinalize() {
    let finalProcessedBlocks;

    // Shortcut
    const { padding } = this.cfg;

    // Finalize
    if (this._xformMode === this.constructor._ENC_XFORM_MODE) {
      // Pad data
      padding.pad(this._data, this.blockSize);

      // Process final blocks
      finalProcessedBlocks = this._process(!!'flush');
    } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
      // Process final blocks
      finalProcessedBlocks = this._process(!!'flush');

      // Unpad data
      padding.unpad(finalProcessedBlocks);
    }

    return finalProcessedBlocks;
  }
}

/**
 * A collection of cipher parameters.
 *
 * @property {WordArray} ciphertext The raw ciphertext.
 * @property {WordArray} key The key to this ciphertext.
 * @property {WordArray} iv The IV used in the ciphering operation.
 * @property {WordArray} salt The salt used with a key derivation function.
 * @property {Cipher} algorithm The cipher algorithm.
 * @property {Mode} mode The block mode used in the ciphering operation.
 * @property {Padding} padding The padding scheme used in the ciphering operation.
 * @property {number} blockSize The block size of the cipher.
 * @property {Format} formatter
 *    The default formatting strategy to convert this cipher params object to a string.
 */
class CipherParams extends Base {
  /**
   * Initializes a newly created cipher params object.
   *
   * @param {Object} cipherParams An object with any of the possible cipher parameters.
   *
   * @example
   *
   *     var cipherParams = CryptoJS.lib.CipherParams.create({
   *         ciphertext: ciphertextWordArray,
   *         key: keyWordArray,
   *         iv: ivWordArray,
   *         salt: saltWordArray,
   *         algorithm: CryptoJS.algo.AES,
   *         mode: CryptoJS.mode.CBC,
   *         padding: CryptoJS.pad.PKCS7,
   *         blockSize: 4,
   *         formatter: CryptoJS.format.OpenSSL
   *     });
   */
  constructor(cipherParams) {
    super();

    this.mixIn(cipherParams);
  }

  /**
   * Converts this cipher params object to a string.
   *
   * @param {Format} formatter (Optional) The formatting strategy to use.
   *
   * @return {string} The stringified cipher params.
   *
   * @throws Error If neither the formatter nor the default formatter is set.
   *
   * @example
   *
   *     var string = cipherParams + '';
   *     var string = cipherParams.toString();
   *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
   */
  toString(formatter) {
    return (formatter || this.formatter).stringify(this);
  }
}

/**
 * OpenSSL formatting strategy.
 */
const OpenSSLFormatter = {
  /**
   * Converts a cipher params object to an OpenSSL-compatible string.
   *
   * @param {CipherParams} cipherParams The cipher params object.
   *
   * @return {string} The OpenSSL-compatible string.
   *
   * @static
   *
   * @example
   *
   *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
   */
  stringify(cipherParams) {
    let wordArray;

    // Shortcuts
    const { ciphertext, salt } = cipherParams;

    // Format
    if (salt) {
      wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
    } else {
      wordArray = ciphertext;
    }

    return wordArray.toString(Base64);
  },

  /**
   * Converts an OpenSSL-compatible string to a cipher params object.
   *
   * @param {string} openSSLStr The OpenSSL-compatible string.
   *
   * @return {CipherParams} The cipher params object.
   *
   * @static
   *
   * @example
   *
   *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
   */
  parse(openSSLStr) {
    let salt;

    // Parse base64
    const ciphertext = Base64.parse(openSSLStr);

    // Shortcut
    const ciphertextWords = ciphertext.words;

    // Test for salt
    if (ciphertextWords[0] === 0x53616c74 && ciphertextWords[1] === 0x65645f5f) {
      // Extract salt
      salt = WordArray.create(ciphertextWords.slice(2, 4));

      // Remove salt from ciphertext
      ciphertextWords.splice(0, 4);
      ciphertext.sigBytes -= 16;
    }

    return CipherParams.create({ ciphertext, salt });
  },
};

/**
 * A cipher wrapper that returns ciphertext as a serializable cipher params object.
 */
class SerializableCipher extends Base {
  /**
   * Encrypts a message.
   *
   * @param {Cipher} cipher The cipher algorithm to use.
   * @param {WordArray|string} message The message to encrypt.
   * @param {WordArray} key The key.
   * @param {Object} cfg (Optional) The configuration options to use for this operation.
   *
   * @return {CipherParams} A cipher params object.
   *
   * @static
   *
   * @example
   *
   *     var ciphertextParams = CryptoJS.lib.SerializableCipher
   *       .encrypt(CryptoJS.algo.AES, message, key);
   *     var ciphertextParams = CryptoJS.lib.SerializableCipher
   *       .encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
   *     var ciphertextParams = CryptoJS.lib.SerializableCipher
   *       .encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
   */
  static encrypt(cipher, message, key, cfg) {
    // Apply config defaults
    const _cfg = Object.assign(new Base(), this.cfg, cfg);

    // Encrypt
    const encryptor = cipher.createEncryptor(key, _cfg);
    const ciphertext = encryptor.finalize(message);

    // Shortcut
    const cipherCfg = encryptor.cfg;

    // Create and return serializable cipher params
    return CipherParams.create({
      ciphertext,
      key,
      iv: cipherCfg.iv,
      algorithm: cipher,
      mode: cipherCfg.mode,
      padding: cipherCfg.padding,
      blockSize: encryptor.blockSize,
      formatter: _cfg.format,
    });
  }

  /**
   * Decrypts serialized ciphertext.
   *
   * @param {Cipher} cipher The cipher algorithm to use.
   * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
   * @param {WordArray} key The key.
   * @param {Object} cfg (Optional) The configuration options to use for this operation.
   *
   * @return {WordArray} The plaintext.
   *
   * @static
   *
   * @example
   *
   *     var plaintext = CryptoJS.lib.SerializableCipher
   *       .decrypt(CryptoJS.algo.AES, formattedCiphertext, key,
   *         { iv: iv, format: CryptoJS.format.OpenSSL });
   *     var plaintext = CryptoJS.lib.SerializableCipher
   *       .decrypt(CryptoJS.algo.AES, ciphertextParams, key,
   *         { iv: iv, format: CryptoJS.format.OpenSSL });
   */
  static decrypt(cipher, ciphertext, key, cfg) {
    let _ciphertext = ciphertext;

    // Apply config defaults
    const _cfg = Object.assign(new Base(), this.cfg, cfg);

    // Convert string to CipherParams
    _ciphertext = this._parse(_ciphertext, _cfg.format);

    // Decrypt
    const plaintext = cipher.createDecryptor(key, _cfg).finalize(_ciphertext.ciphertext);

    return plaintext;
  }

  /**
   * Converts serialized ciphertext to CipherParams,
   * else assumed CipherParams already and returns ciphertext unchanged.
   *
   * @param {CipherParams|string} ciphertext The ciphertext.
   * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
   *
   * @return {CipherParams} The unserialized ciphertext.
   *
   * @static
   *
   * @example
   *
   *     var ciphertextParams = CryptoJS.lib.SerializableCipher
   *       ._parse(ciphertextStringOrParams, format);
   */
  static _parse(ciphertext, format) {
    if (typeof ciphertext === 'string') {
      return format.parse(ciphertext, this);
    }
    return ciphertext;
  }
}
/**
 * Configuration options.
 *
 * @property {Formatter} format
 *
 *    The formatting strategy to convert cipher param objects to and from a string.
 *    Default: OpenSSL
 */
SerializableCipher.cfg = Object.assign(
  new Base(),
  { format: OpenSSLFormatter },
);

/**
 * OpenSSL key derivation function.
 */
const OpenSSLKdf = {
  /**
   * Derives a key and IV from a password.
   *
   * @param {string} password The password to derive from.
   * @param {number} keySize The size in words of the key to generate.
   * @param {number} ivSize The size in words of the IV to generate.
   * @param {WordArray|string} salt
   *     (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
   *
   * @return {CipherParams} A cipher params object with the key, IV, and salt.
   *
   * @static
   *
   * @example
   *
   *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
   *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
   */
  execute(password, keySize, ivSize, salt) {
    let _salt = salt;

    // Generate random salt
    if (!_salt) {
      _salt = WordArray.random(64 / 8);
    }

    // Derive key and IV
    const key = EvpKDFAlgo.create({ keySize: keySize + ivSize }).compute(password, _salt);

    // Separate key and IV
    const iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
    key.sigBytes = keySize * 4;

    // Return params
    return CipherParams.create({ key, iv, salt: _salt });
  },
};

/**
 * A serializable cipher wrapper that derives the key from a password,
 * and returns ciphertext as a serializable cipher params object.
 */
class PasswordBasedCipher extends SerializableCipher {
  /**
   * Encrypts a message using a password.
   *
   * @param {Cipher} cipher The cipher algorithm to use.
   * @param {WordArray|string} message The message to encrypt.
   * @param {string} password The password.
   * @param {Object} cfg (Optional) The configuration options to use for this operation.
   *
   * @return {CipherParams} A cipher params object.
   *
   * @static
   *
   * @example
   *
   *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher
   *       .encrypt(CryptoJS.algo.AES, message, 'password');
   *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher
   *       .encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
   */
  static encrypt(cipher, message, password, cfg) {
    // Apply config defaults
    const _cfg = Object.assign(new Base(), this.cfg, cfg);

    // Derive key and other params
    const derivedParams = _cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

    // Add IV to config
    _cfg.iv = derivedParams.iv;

    // Encrypt
    const ciphertext = SerializableCipher.encrypt
      .call(this, cipher, message, derivedParams.key, _cfg);

    // Mix in derived params
    ciphertext.mixIn(derivedParams);

    return ciphertext;
  }

  /**
   * Decrypts serialized ciphertext using a password.
   *
   * @param {Cipher} cipher The cipher algorithm to use.
   * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
   * @param {string} password The password.
   * @param {Object} cfg (Optional) The configuration options to use for this operation.
   *
   * @return {WordArray} The plaintext.
   *
   * @static
   *
   * @example
   *
   *     var plaintext = CryptoJS.lib.PasswordBasedCipher
   *       .decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password',
   *         { format: CryptoJS.format.OpenSSL });
   *     var plaintext = CryptoJS.lib.PasswordBasedCipher
   *       .decrypt(CryptoJS.algo.AES, ciphertextParams, 'password',
   *         { format: CryptoJS.format.OpenSSL });
   */
  static decrypt(cipher, ciphertext, password, cfg) {
    let _ciphertext = ciphertext;

    // Apply config defaults
    const _cfg = Object.assign(new Base(), this.cfg, cfg);

    // Convert string to CipherParams
    _ciphertext = this._parse(_ciphertext, _cfg.format);

    // Derive key and other params
    const derivedParams = _cfg.kdf
      .execute(password, cipher.keySize, cipher.ivSize, _ciphertext.salt);

    // Add IV to config
    _cfg.iv = derivedParams.iv;

    // Decrypt
    const plaintext = SerializableCipher.decrypt
      .call(this, cipher, _ciphertext, derivedParams.key, _cfg);

    return plaintext;
  }
}
/**
 * Configuration options.
 *
 * @property {KDF} kdf
 *     The key derivation function to use to generate a key and IV from a password.
 *     Default: OpenSSL
 */
PasswordBasedCipher.cfg = Object.assign(SerializableCipher.cfg, { kdf: OpenSSLKdf });

const swapEndian = word => ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);

/**
 * UTF-16 BE encoding strategy.
 */
const Utf16BE = {
  /**
   * Converts a word array to a UTF-16 BE string.
   *
   * @param {WordArray} wordArray The word array.
   *
   * @return {string} The UTF-16 BE string.
   *
   * @static
   *
   * @example
   *
   *     const utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
   */
  stringify(wordArray) {
    // Shortcuts
    const { words, sigBytes } = wordArray;

    // Convert
    const utf16Chars = [];
    for (let i = 0; i < sigBytes; i += 2) {
      const codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;
      utf16Chars.push(String.fromCharCode(codePoint));
    }

    return utf16Chars.join('');
  },

  /**
   * Converts a UTF-16 BE string to a word array.
   *
   * @param {string} utf16Str The UTF-16 BE string.
   *
   * @return {WordArray} The word array.
   *
   * @static
   *
   * @example
   *
   *     const wordArray = CryptoJS.enc.Utf16.parse(utf16String);
   */
  parse(utf16Str) {
    // Shortcut
    const utf16StrLength = utf16Str.length;

    // Convert
    const words = [];
    for (let i = 0; i < utf16StrLength; i += 1) {
      words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);
    }

    return WordArray.create(words, utf16StrLength * 2);
  },
};
const Utf16 = Utf16BE;

/**
 * UTF-16 LE encoding strategy.
 */
const Utf16LE = {
  /**
   * Converts a word array to a UTF-16 LE string.
   *
   * @param {WordArray} wordArray The word array.
   *
   * @return {string} The UTF-16 LE string.
   *
   * @static
   *
   * @example
   *
   *     const utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
   */
  stringify(wordArray) {
    // Shortcuts
    const { words, sigBytes } = wordArray;

    // Convert
    const utf16Chars = [];
    for (let i = 0; i < sigBytes; i += 2) {
      const codePoint = swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);
      utf16Chars.push(String.fromCharCode(codePoint));
    }

    return utf16Chars.join('');
  },

  /**
   * Converts a UTF-16 LE string to a word array.
   *
   * @param {string} utf16Str The UTF-16 LE string.
   *
   * @return {WordArray} The word array.
   *
   * @static
   *
   * @example
   *
   *     const wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
   */
  parse(utf16Str) {
    // Shortcut
    const utf16StrLength = utf16Str.length;

    // Convert
    const words = [];
    for (let i = 0; i < utf16StrLength; i += 1) {
      words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));
    }

    return WordArray.create(words, utf16StrLength * 2);
  },
};

// Reusable object
const W = [];

/**
 * SHA-1 hash algorithm.
 */
class SHA1Algo extends Hasher {
  _doReset() {
    this._hash = new WordArray([
      0x67452301,
      0xefcdab89,
      0x98badcfe,
      0x10325476,
      0xc3d2e1f0,
    ]);
  }

  _doProcessBlock(M, offset) {
    // Shortcut
    const H = this._hash.words;

    // Working variables
    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];

    // Computation
    for (let i = 0; i < 80; i += 1) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
        W[i] = (n << 1) | (n >>> 31);
      }

      let t = ((a << 5) | (a >>> 27)) + e + W[i];
      if (i < 20) {
        t += ((b & c) | (~b & d)) + 0x5a827999;
      } else if (i < 40) {
        t += (b ^ c ^ d) + 0x6ed9eba1;
      } else if (i < 60) {
        t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
      } else /* if (i < 80) */ {
        t += (b ^ c ^ d) - 0x359d3e2a;
      }

      e = d;
      d = c;
      c = (b << 30) | (b >>> 2);
      b = a;
      a = t;
    }

    // Intermediate hash value
    H[0] = (H[0] + a) | 0;
    H[1] = (H[1] + b) | 0;
    H[2] = (H[2] + c) | 0;
    H[3] = (H[3] + d) | 0;
    H[4] = (H[4] + e) | 0;
  }

  _doFinalize() {
    // Shortcuts
    const data = this._data;
    const dataWords = data.words;

    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = data.sigBytes * 8;

    // Add padding
    dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - (nBitsLeft % 32));
    dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
    dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
    data.sigBytes = dataWords.length * 4;

    // Hash final blocks
    this._process();

    // Return final computed hash
    return this._hash;
  }

  clone() {
    const clone = super.clone.call(this);
    clone._hash = this._hash.clone();

    return clone;
  }
}

/**
 * Shortcut function to the hasher's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 *
 * @return {WordArray} The hash.
 *
 * @static
 *
 * @example
 *
 *     var hash = CryptoJS.SHA1('message');
 *     var hash = CryptoJS.SHA1(wordArray);
 */
const SHA1 = Hasher._createHelper(SHA1Algo);

/**
 * Shortcut function to the HMAC's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 * @param {WordArray|string} key The secret key.
 *
 * @return {WordArray} The HMAC.
 *
 * @static
 *
 * @example
 *
 *     var hmac = CryptoJS.HmacSHA1(message, key);
 */
const HmacSHA1 = Hasher._createHmacHelper(SHA1Algo);

// Initialization and round constants tables
const H = [];
const K = [];

// Compute constants
const isPrime = (n) => {
  const sqrtN = Math.sqrt(n);
  for (let factor = 2; factor <= sqrtN; factor += 1) {
    if (!(n % factor)) {
      return false;
    }
  }

  return true;
};

const getFractionalBits = n => ((n - (n | 0)) * 0x100000000) | 0;

let n = 2;
let nPrime = 0;
while (nPrime < 64) {
  if (isPrime(n)) {
    if (nPrime < 8) {
      H[nPrime] = getFractionalBits(n ** (1 / 2));
    }
    K[nPrime] = getFractionalBits(n ** (1 / 3));

    nPrime += 1;
  }

  n += 1;
}

// Reusable object
const W$1 = [];

/**
 * SHA-256 hash algorithm.
 */
class SHA256Algo extends Hasher {
  _doReset() {
    this._hash = new WordArray(H.slice(0));
  }

  _doProcessBlock(M, offset) {
    // Shortcut
    const _H = this._hash.words;

    // Working variables
    let a = _H[0];
    let b = _H[1];
    let c = _H[2];
    let d = _H[3];
    let e = _H[4];
    let f = _H[5];
    let g = _H[6];
    let h = _H[7];

    // Computation
    for (let i = 0; i < 64; i += 1) {
      if (i < 16) {
        W$1[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W$1[i - 15];
        const gamma0 = ((gamma0x << 25) | (gamma0x >>> 7))
          ^ ((gamma0x << 14) | (gamma0x >>> 18))
          ^ (gamma0x >>> 3);

        const gamma1x = W$1[i - 2];
        const gamma1 = ((gamma1x << 15) | (gamma1x >>> 17))
          ^ ((gamma1x << 13) | (gamma1x >>> 19))
          ^ (gamma1x >>> 10);

        W$1[i] = gamma0 + W$1[i - 7] + gamma1 + W$1[i - 16];
      }

      const ch = (e & f) ^ (~e & g);
      const maj = (a & b) ^ (a & c) ^ (b & c);

      const sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
      const sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7) | (e >>> 25));

      const t1 = h + sigma1 + ch + K[i] + W$1[i];
      const t2 = sigma0 + maj;

      h = g;
      g = f;
      f = e;
      e = (d + t1) | 0;
      d = c;
      c = b;
      b = a;
      a = (t1 + t2) | 0;
    }

    // Intermediate hash value
    _H[0] = (_H[0] + a) | 0;
    _H[1] = (_H[1] + b) | 0;
    _H[2] = (_H[2] + c) | 0;
    _H[3] = (_H[3] + d) | 0;
    _H[4] = (_H[4] + e) | 0;
    _H[5] = (_H[5] + f) | 0;
    _H[6] = (_H[6] + g) | 0;
    _H[7] = (_H[7] + h) | 0;
  }

  _doFinalize() {
    // Shortcuts
    const data = this._data;
    const dataWords = data.words;

    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = data.sigBytes * 8;

    // Add padding
    dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - (nBitsLeft % 32));
    dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
    dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
    data.sigBytes = dataWords.length * 4;

    // Hash final blocks
    this._process();

    // Return final computed hash
    return this._hash;
  }

  clone() {
    const clone = super.clone.call(this);
    clone._hash = this._hash.clone();

    return clone;
  }
}

/**
 * Shortcut function to the hasher's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 *
 * @return {WordArray} The hash.
 *
 * @static
 *
 * @example
 *
 *     var hash = CryptoJS.SHA256('message');
 *     var hash = CryptoJS.SHA256(wordArray);
 */
const SHA256 = Hasher._createHelper(SHA256Algo);

/**
 * Shortcut function to the HMAC's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 * @param {WordArray|string} key The secret key.
 *
 * @return {WordArray} The HMAC.
 *
 * @static
 *
 * @example
 *
 *     var hmac = CryptoJS.HmacSHA256(message, key);
 */
const HmacSHA256 = Hasher._createHmacHelper(SHA256Algo);

/**
 * SHA-224 hash algorithm.
 */
class SHA224Algo extends SHA256Algo {
  _doReset() {
    this._hash = new WordArray([
      0xc1059ed8,
      0x367cd507,
      0x3070dd17,
      0xf70e5939,
      0xffc00b31,
      0x68581511,
      0x64f98fa7,
      0xbefa4fa4,
    ]);
  }

  _doFinalize() {
    const hash = super._doFinalize.call(this);

    hash.sigBytes -= 4;

    return hash;
  }
}

/**
 * Shortcut function to the hasher's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 *
 * @return {WordArray} The hash.
 *
 * @static
 *
 * @example
 *
 *     var hash = CryptoJS.SHA224('message');
 *     var hash = CryptoJS.SHA224(wordArray);
 */
const SHA224 = SHA256Algo._createHelper(SHA224Algo);

/**
 * Shortcut function to the HMAC's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 * @param {WordArray|string} key The secret key.
 *
 * @return {WordArray} The HMAC.
 *
 * @static
 *
 * @example
 *
 *     var hmac = CryptoJS.HmacSHA224(message, key);
 */
const HmacSHA224 = SHA256Algo._createHmacHelper(SHA224Algo);

// Constants
const K$1 = [
  new X64Word(0x428a2f98, 0xd728ae22),
  new X64Word(0x71374491, 0x23ef65cd),
  new X64Word(0xb5c0fbcf, 0xec4d3b2f),
  new X64Word(0xe9b5dba5, 0x8189dbbc),
  new X64Word(0x3956c25b, 0xf348b538),
  new X64Word(0x59f111f1, 0xb605d019),
  new X64Word(0x923f82a4, 0xaf194f9b),
  new X64Word(0xab1c5ed5, 0xda6d8118),
  new X64Word(0xd807aa98, 0xa3030242),
  new X64Word(0x12835b01, 0x45706fbe),
  new X64Word(0x243185be, 0x4ee4b28c),
  new X64Word(0x550c7dc3, 0xd5ffb4e2),
  new X64Word(0x72be5d74, 0xf27b896f),
  new X64Word(0x80deb1fe, 0x3b1696b1),
  new X64Word(0x9bdc06a7, 0x25c71235),
  new X64Word(0xc19bf174, 0xcf692694),
  new X64Word(0xe49b69c1, 0x9ef14ad2),
  new X64Word(0xefbe4786, 0x384f25e3),
  new X64Word(0x0fc19dc6, 0x8b8cd5b5),
  new X64Word(0x240ca1cc, 0x77ac9c65),
  new X64Word(0x2de92c6f, 0x592b0275),
  new X64Word(0x4a7484aa, 0x6ea6e483),
  new X64Word(0x5cb0a9dc, 0xbd41fbd4),
  new X64Word(0x76f988da, 0x831153b5),
  new X64Word(0x983e5152, 0xee66dfab),
  new X64Word(0xa831c66d, 0x2db43210),
  new X64Word(0xb00327c8, 0x98fb213f),
  new X64Word(0xbf597fc7, 0xbeef0ee4),
  new X64Word(0xc6e00bf3, 0x3da88fc2),
  new X64Word(0xd5a79147, 0x930aa725),
  new X64Word(0x06ca6351, 0xe003826f),
  new X64Word(0x14292967, 0x0a0e6e70),
  new X64Word(0x27b70a85, 0x46d22ffc),
  new X64Word(0x2e1b2138, 0x5c26c926),
  new X64Word(0x4d2c6dfc, 0x5ac42aed),
  new X64Word(0x53380d13, 0x9d95b3df),
  new X64Word(0x650a7354, 0x8baf63de),
  new X64Word(0x766a0abb, 0x3c77b2a8),
  new X64Word(0x81c2c92e, 0x47edaee6),
  new X64Word(0x92722c85, 0x1482353b),
  new X64Word(0xa2bfe8a1, 0x4cf10364),
  new X64Word(0xa81a664b, 0xbc423001),
  new X64Word(0xc24b8b70, 0xd0f89791),
  new X64Word(0xc76c51a3, 0x0654be30),
  new X64Word(0xd192e819, 0xd6ef5218),
  new X64Word(0xd6990624, 0x5565a910),
  new X64Word(0xf40e3585, 0x5771202a),
  new X64Word(0x106aa070, 0x32bbd1b8),
  new X64Word(0x19a4c116, 0xb8d2d0c8),
  new X64Word(0x1e376c08, 0x5141ab53),
  new X64Word(0x2748774c, 0xdf8eeb99),
  new X64Word(0x34b0bcb5, 0xe19b48a8),
  new X64Word(0x391c0cb3, 0xc5c95a63),
  new X64Word(0x4ed8aa4a, 0xe3418acb),
  new X64Word(0x5b9cca4f, 0x7763e373),
  new X64Word(0x682e6ff3, 0xd6b2b8a3),
  new X64Word(0x748f82ee, 0x5defb2fc),
  new X64Word(0x78a5636f, 0x43172f60),
  new X64Word(0x84c87814, 0xa1f0ab72),
  new X64Word(0x8cc70208, 0x1a6439ec),
  new X64Word(0x90befffa, 0x23631e28),
  new X64Word(0xa4506ceb, 0xde82bde9),
  new X64Word(0xbef9a3f7, 0xb2c67915),
  new X64Word(0xc67178f2, 0xe372532b),
  new X64Word(0xca273ece, 0xea26619c),
  new X64Word(0xd186b8c7, 0x21c0c207),
  new X64Word(0xeada7dd6, 0xcde0eb1e),
  new X64Word(0xf57d4f7f, 0xee6ed178),
  new X64Word(0x06f067aa, 0x72176fba),
  new X64Word(0x0a637dc5, 0xa2c898a6),
  new X64Word(0x113f9804, 0xbef90dae),
  new X64Word(0x1b710b35, 0x131c471b),
  new X64Word(0x28db77f5, 0x23047d84),
  new X64Word(0x32caab7b, 0x40c72493),
  new X64Word(0x3c9ebe0a, 0x15c9bebc),
  new X64Word(0x431d67c4, 0x9c100d4c),
  new X64Word(0x4cc5d4be, 0xcb3e42b6),
  new X64Word(0x597f299c, 0xfc657e2a),
  new X64Word(0x5fcb6fab, 0x3ad6faec),
  new X64Word(0x6c44198c, 0x4a475817),
];

// Reusable objects
const W$2 = [];
for (let i = 0; i < 80; i += 1) {
  W$2[i] = new X64Word();
}

/**
 * SHA-512 hash algorithm.
 */
class SHA512Algo extends Hasher {
  constructor() {
    super();

    this.blockSize = 1024 / 32;
  }

  _doReset() {
    this._hash = new X64WordArray([
      new X64Word(0x6a09e667, 0xf3bcc908),
      new X64Word(0xbb67ae85, 0x84caa73b),
      new X64Word(0x3c6ef372, 0xfe94f82b),
      new X64Word(0xa54ff53a, 0x5f1d36f1),
      new X64Word(0x510e527f, 0xade682d1),
      new X64Word(0x9b05688c, 0x2b3e6c1f),
      new X64Word(0x1f83d9ab, 0xfb41bd6b),
      new X64Word(0x5be0cd19, 0x137e2179),
    ]);
  }

  _doProcessBlock(M, offset) {
    // Shortcuts
    const H = this._hash.words;

    const H0 = H[0];
    const H1 = H[1];
    const H2 = H[2];
    const H3 = H[3];
    const H4 = H[4];
    const H5 = H[5];
    const H6 = H[6];
    const H7 = H[7];

    const H0h = H0.high;
    let H0l = H0.low;
    const H1h = H1.high;
    let H1l = H1.low;
    const H2h = H2.high;
    let H2l = H2.low;
    const H3h = H3.high;
    let H3l = H3.low;
    const H4h = H4.high;
    let H4l = H4.low;
    const H5h = H5.high;
    let H5l = H5.low;
    const H6h = H6.high;
    let H6l = H6.low;
    const H7h = H7.high;
    let H7l = H7.low;

    // Working variables
    let ah = H0h;
    let al = H0l;
    let bh = H1h;
    let bl = H1l;
    let ch = H2h;
    let cl = H2l;
    let dh = H3h;
    let dl = H3l;
    let eh = H4h;
    let el = H4l;
    let fh = H5h;
    let fl = H5l;
    let gh = H6h;
    let gl = H6l;
    let hh = H7h;
    let hl = H7l;

    // Rounds
    for (let i = 0; i < 80; i += 1) {
      let Wil;
      let Wih;

      // Shortcut
      const Wi = W$2[i];

      // Extend message
      if (i < 16) {
        Wi.high = M[offset + i * 2] | 0;
        Wih = Wi.high;
        Wi.low = M[offset + i * 2 + 1] | 0;
        Wil = Wi.low;
      } else {
        // Gamma0
        const gamma0x = W$2[i - 15];
        const gamma0xh = gamma0x.high;
        const gamma0xl = gamma0x.low;
        const gamma0h = ((gamma0xh >>> 1) | (gamma0xl << 31))
          ^ ((gamma0xh >>> 8) | (gamma0xl << 24))
          ^ (gamma0xh >>> 7);
        const gamma0l = ((gamma0xl >>> 1) | (gamma0xh << 31))
          ^ ((gamma0xl >>> 8) | (gamma0xh << 24))
          ^ ((gamma0xl >>> 7) | (gamma0xh << 25));

        // Gamma1
        const gamma1x = W$2[i - 2];
        const gamma1xh = gamma1x.high;
        const gamma1xl = gamma1x.low;
        const gamma1h = ((gamma1xh >>> 19) | (gamma1xl << 13))
          ^ ((gamma1xh << 3) | (gamma1xl >>> 29))
          ^ (gamma1xh >>> 6);
        const gamma1l = ((gamma1xl >>> 19) | (gamma1xh << 13))
          ^ ((gamma1xl << 3) | (gamma1xh >>> 29))
          ^ ((gamma1xl >>> 6) | (gamma1xh << 26));

        // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
        const Wi7 = W$2[i - 7];
        const Wi7h = Wi7.high;
        const Wi7l = Wi7.low;

        const Wi16 = W$2[i - 16];
        const Wi16h = Wi16.high;
        const Wi16l = Wi16.low;

        Wil = gamma0l + Wi7l;
        Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
        Wil += gamma1l;
        Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
        Wil += Wi16l;
        Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);

        Wi.high = Wih;
        Wi.low = Wil;
      }

      const chh = (eh & fh) ^ (~eh & gh);
      const chl = (el & fl) ^ (~el & gl);
      const majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
      const majl = (al & bl) ^ (al & cl) ^ (bl & cl);

      const sigma0h = ((ah >>> 28) | (al << 4))
        ^ ((ah << 30) | (al >>> 2))
        ^ ((ah << 25) | (al >>> 7));
      const sigma0l = ((al >>> 28) | (ah << 4))
        ^ ((al << 30) | (ah >>> 2))
        ^ ((al << 25) | (ah >>> 7));
      const sigma1h = ((eh >>> 14) | (el << 18))
        ^ ((eh >>> 18) | (el << 14))
        ^ ((eh << 23) | (el >>> 9));
      const sigma1l = ((el >>> 14) | (eh << 18))
        ^ ((el >>> 18) | (eh << 14))
        ^ ((el << 23) | (eh >>> 9));

      // t1 = h + sigma1 + ch + K[i] + W[i]
      const Ki = K$1[i];
      const Kih = Ki.high;
      const Kil = Ki.low;

      let t1l = hl + sigma1l;
      let t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
      t1l += chl;
      t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
      t1l += Kil;
      t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
      t1l += Wil;
      t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);

      // t2 = sigma0 + maj
      const t2l = sigma0l + majl;
      const t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);

      // Update working variables
      hh = gh;
      hl = gl;
      gh = fh;
      gl = fl;
      fh = eh;
      fl = el;
      el = (dl + t1l) | 0;
      eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
      dh = ch;
      dl = cl;
      ch = bh;
      cl = bl;
      bh = ah;
      bl = al;
      al = (t1l + t2l) | 0;
      ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
    }

    // Intermediate hash value
    H0.low = (H0l + al);
    H0l = H0.low;
    H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
    H1.low = (H1l + bl);
    H1l = H1.low;
    H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
    H2.low = (H2l + cl);
    H2l = H2.low;
    H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
    H3.low = (H3l + dl);
    H3l = H3.low;
    H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
    H4.low = (H4l + el);
    H4l = H4.low;
    H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
    H5.low = (H5l + fl);
    H5l = H5.low;
    H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
    H6.low = (H6l + gl);
    H6l = H6.low;
    H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
    H7.low = (H7l + hl);
    H7l = H7.low;
    H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
  }

  _doFinalize() {
    // Shortcuts
    const data = this._data;
    const dataWords = data.words;

    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = data.sigBytes * 8;

    // Add padding
    dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - (nBitsLeft % 32));
    dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
    dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
    data.sigBytes = dataWords.length * 4;

    // Hash final blocks
    this._process();

    // Convert hash to 32-bit word array before returning
    const hash = this._hash.toX32();

    // Return final computed hash
    return hash;
  }

  clone() {
    const clone = super.clone.call(this);
    clone._hash = this._hash.clone();

    return clone;
  }
}

/**
 * Shortcut function to the hasher's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 *
 * @return {WordArray} The hash.
 *
 * @static
 *
 * @example
 *
 *     var hash = CryptoJS.SHA512('message');
 *     var hash = CryptoJS.SHA512(wordArray);
 */
const SHA512 = Hasher._createHelper(SHA512Algo);

/**
 * Shortcut function to the HMAC's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 * @param {WordArray|string} key The secret key.
 *
 * @return {WordArray} The HMAC.
 *
 * @static
 *
 * @example
 *
 *     var hmac = CryptoJS.HmacSHA512(message, key);
 */
const HmacSHA512 = Hasher._createHmacHelper(SHA512Algo);

/**
 * SHA-384 hash algorithm.
 */
class SHA384Algo extends SHA512Algo {
  _doReset() {
    this._hash = new X64WordArray([
      new X64Word(0xcbbb9d5d, 0xc1059ed8),
      new X64Word(0x629a292a, 0x367cd507),
      new X64Word(0x9159015a, 0x3070dd17),
      new X64Word(0x152fecd8, 0xf70e5939),
      new X64Word(0x67332667, 0xffc00b31),
      new X64Word(0x8eb44a87, 0x68581511),
      new X64Word(0xdb0c2e0d, 0x64f98fa7),
      new X64Word(0x47b5481d, 0xbefa4fa4),
    ]);
  }

  _doFinalize() {
    const hash = super._doFinalize.call(this);

    hash.sigBytes -= 16;

    return hash;
  }
}

/**
 * Shortcut function to the hasher's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 *
 * @return {WordArray} The hash.
 *
 * @static
 *
 * @example
 *
 *     var hash = CryptoJS.SHA384('message');
 *     var hash = CryptoJS.SHA384(wordArray);
 */
const SHA384 = SHA512Algo._createHelper(SHA384Algo);

/**
 * Shortcut function to the HMAC's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 * @param {WordArray|string} key The secret key.
 *
 * @return {WordArray} The HMAC.
 *
 * @static
 *
 * @example
 *
 *     var hmac = CryptoJS.HmacSHA384(message, key);
 */
const HmacSHA384 = SHA512Algo._createHmacHelper(SHA384Algo);

// Constants tables
const RHO_OFFSETS = [];
const PI_INDEXES = [];
const ROUND_CONSTANTS = [];

// Compute Constants
// Compute rho offset constants
let _x = 1;
let _y = 0;
for (let t = 0; t < 24; t += 1) {
  RHO_OFFSETS[_x + 5 * _y] = ((t + 1) * (t + 2) / 2) % 64;

  const newX = _y % 5;
  const newY = (2 * _x + 3 * _y) % 5;
  _x = newX;
  _y = newY;
}

// Compute pi index constants
for (let x = 0; x < 5; x += 1) {
  for (let y = 0; y < 5; y += 1) {
    PI_INDEXES[x + 5 * y] = y + ((2 * x + 3 * y) % 5) * 5;
  }
}

// Compute round constants
let LFSR = 0x01;
for (let i = 0; i < 24; i += 1) {
  let roundConstantMsw = 0;
  let roundConstantLsw = 0;

  for (let j = 0; j < 7; j += 1) {
    if (LFSR & 0x01) {
      const bitPosition = (1 << j) - 1;
      if (bitPosition < 32) {
        roundConstantLsw ^= 1 << bitPosition;
      } else /* if (bitPosition >= 32) */ {
        roundConstantMsw ^= 1 << (bitPosition - 32);
      }
    }

    // Compute next LFSR
    if (LFSR & 0x80) {
      // Primitive polynomial over GF(2): x^8 + x^6 + x^5 + x^4 + 1
      LFSR = (LFSR << 1) ^ 0x71;
    } else {
      LFSR <<= 1;
    }
  }

  ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
}

// Reusable objects for temporary values
const T$1 = [];
for (let i = 0; i < 25; i += 1) {
  T$1[i] = X64Word.create();
}

/**
 * SHA-3 hash algorithm.
 */
class SHA3Algo extends Hasher {
  constructor(cfg) {
    /**
     * Configuration options.
     *
     * @property {number} outputLength
     *   The desired number of bits in the output hash.
     *   Only values permitted are: 224, 256, 384, 512.
     *   Default: 512
     */
    super(Object.assign(
      { outputLength: 512 },
      cfg,
    ));
  }

  _doReset() {
    this._state = [];
    const state = this._state;
    for (let i = 0; i < 25; i += 1) {
      state[i] = new X64Word();
    }

    this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
  }

  _doProcessBlock(M, offset) {
    // Shortcuts
    const state = this._state;
    const nBlockSizeLanes = this.blockSize / 2;

    // Absorb
    for (let i = 0; i < nBlockSizeLanes; i += 1) {
      // Shortcuts
      let M2i = M[offset + 2 * i];
      let M2i1 = M[offset + 2 * i + 1];

      // Swap endian
      M2i = (((M2i << 8) | (M2i >>> 24)) & 0x00ff00ff)
        | (((M2i << 24) | (M2i >>> 8)) & 0xff00ff00);
      M2i1 = (((M2i1 << 8) | (M2i1 >>> 24)) & 0x00ff00ff)
        | (((M2i1 << 24) | (M2i1 >>> 8)) & 0xff00ff00);

      // Absorb message into state
      const lane = state[i];
      lane.high ^= M2i1;
      lane.low ^= M2i;
    }

    // Rounds
    for (let round = 0; round < 24; round += 1) {
      // Theta
      for (let x = 0; x < 5; x += 1) {
        // Mix column lanes
        let tMsw = 0;
        let tLsw = 0;
        for (let y = 0; y < 5; y += 1) {
          const lane = state[x + 5 * y];
          tMsw ^= lane.high;
          tLsw ^= lane.low;
        }

        // Temporary values
        const Tx = T$1[x];
        Tx.high = tMsw;
        Tx.low = tLsw;
      }
      for (let x = 0; x < 5; x += 1) {
        // Shortcuts
        const Tx4 = T$1[(x + 4) % 5];
        const Tx1 = T$1[(x + 1) % 5];
        const Tx1Msw = Tx1.high;
        const Tx1Lsw = Tx1.low;

        // Mix surrounding columns
        const tMsw = Tx4.high ^ ((Tx1Msw << 1) | (Tx1Lsw >>> 31));
        const tLsw = Tx4.low ^ ((Tx1Lsw << 1) | (Tx1Msw >>> 31));
        for (let y = 0; y < 5; y += 1) {
          const lane = state[x + 5 * y];
          lane.high ^= tMsw;
          lane.low ^= tLsw;
        }
      }

      // Rho Pi
      for (let laneIndex = 1; laneIndex < 25; laneIndex += 1) {
        let tMsw;
        let tLsw;

        // Shortcuts
        const lane = state[laneIndex];
        const laneMsw = lane.high;
        const laneLsw = lane.low;
        const rhoOffset = RHO_OFFSETS[laneIndex];

        // Rotate lanes
        if (rhoOffset < 32) {
          tMsw = (laneMsw << rhoOffset) | (laneLsw >>> (32 - rhoOffset));
          tLsw = (laneLsw << rhoOffset) | (laneMsw >>> (32 - rhoOffset));
        } else /* if (rhoOffset >= 32) */ {
          tMsw = (laneLsw << (rhoOffset - 32)) | (laneMsw >>> (64 - rhoOffset));
          tLsw = (laneMsw << (rhoOffset - 32)) | (laneLsw >>> (64 - rhoOffset));
        }

        // Transpose lanes
        const TPiLane = T$1[PI_INDEXES[laneIndex]];
        TPiLane.high = tMsw;
        TPiLane.low = tLsw;
      }

      // Rho pi at x = y = 0
      const T0 = T$1[0];
      const state0 = state[0];
      T0.high = state0.high;
      T0.low = state0.low;

      // Chi
      for (let x = 0; x < 5; x += 1) {
        for (let y = 0; y < 5; y += 1) {
          // Shortcuts
          const laneIndex = x + 5 * y;
          const lane = state[laneIndex];
          const TLane = T$1[laneIndex];
          const Tx1Lane = T$1[((x + 1) % 5) + 5 * y];
          const Tx2Lane = T$1[((x + 2) % 5) + 5 * y];

          // Mix rows
          lane.high = TLane.high ^ (~Tx1Lane.high & Tx2Lane.high);
          lane.low = TLane.low ^ (~Tx1Lane.low & Tx2Lane.low);
        }
      }

      // Iota
      const lane = state[0];
      const roundConstant = ROUND_CONSTANTS[round];
      lane.high ^= roundConstant.high;
      lane.low ^= roundConstant.low;
    }
  }

  _doFinalize() {
    // Shortcuts
    const data = this._data;
    const dataWords = data.words;
    const nBitsLeft = data.sigBytes * 8;
    const blockSizeBits = this.blockSize * 32;

    // Add padding
    dataWords[nBitsLeft >>> 5] |= 0x1 << (24 - (nBitsLeft % 32));
    dataWords[((Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits) >>> 5) - 1] |= 0x80;
    data.sigBytes = dataWords.length * 4;

    // Hash final blocks
    this._process();

    // Shortcuts
    const state = this._state;
    const outputLengthBytes = this.cfg.outputLength / 8;
    const outputLengthLanes = outputLengthBytes / 8;

    // Squeeze
    const hashWords = [];
    for (let i = 0; i < outputLengthLanes; i += 1) {
      // Shortcuts
      const lane = state[i];
      let laneMsw = lane.high;
      let laneLsw = lane.low;

      // Swap endian
      laneMsw = (((laneMsw << 8) | (laneMsw >>> 24)) & 0x00ff00ff)
        | (((laneMsw << 24) | (laneMsw >>> 8)) & 0xff00ff00);
      laneLsw = (((laneLsw << 8) | (laneLsw >>> 24)) & 0x00ff00ff)
        | (((laneLsw << 24) | (laneLsw >>> 8)) & 0xff00ff00);

      // Squeeze state to retrieve hash
      hashWords.push(laneLsw);
      hashWords.push(laneMsw);
    }

    // Return final computed hash
    return new WordArray(hashWords, outputLengthBytes);
  }

  clone() {
    const clone = super.clone.call(this);

    clone._state = this._state.slice(0);
    const state = clone._state;
    for (let i = 0; i < 25; i += 1) {
      state[i] = state[i].clone();
    }

    return clone;
  }
}

/**
 * Shortcut function to the hasher's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 *
 * @return {WordArray} The hash.
 *
 * @static
 *
 * @example
 *
 *     var hash = CryptoJS.SHA3('message');
 *     var hash = CryptoJS.SHA3(wordArray);
 */
const SHA3 = Hasher._createHelper(SHA3Algo);

/**
 * Shortcut function to the HMAC's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 * @param {WordArray|string} key The secret key.
 *
 * @return {WordArray} The HMAC.
 *
 * @static
 *
 * @example
 *
 *     var hmac = CryptoJS.HmacSHA3(message, key);
 */
const HmacSHA3 = Hasher._createHmacHelper(SHA3Algo);

/** @preserve
(c) 2012 by Cédric Mesnil. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted
provided that the following conditions are met:

    - Redistributions of source code must retain the above copyright notice, this list of
    conditions and the following disclaimer.
    - Redistributions in binary form must reproduce the above copyright notice, this list
    of conditions and the following disclaimer in the documentation and/or other materials
    provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY
WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// Constants table
const _zl = WordArray.create([
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]);
const _zr = WordArray.create([
  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]);
const _sl = WordArray.create([
  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]);
const _sr = WordArray.create([
  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]);

const _hl = WordArray.create([0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
const _hr = WordArray.create([0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);

const f1 = (x, y, z) => (x) ^ (y) ^ (z);

const f2 = (x, y, z) => ((x) & (y)) | ((~x) & (z));

const f3 = (x, y, z) => ((x) | (~(y))) ^ (z);

const f4 = (x, y, z) => ((x) & (z)) | ((y) & (~(z)));

const f5 = (x, y, z) => (x) ^ ((y) | (~(z)));

const rotl = (x, n) => (x << n) | (x >>> (32 - n));

/**
 * RIPEMD160 hash algorithm.
 */
class RIPEMD160Algo extends Hasher {
  _doReset() {
    this._hash = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
  }

  _doProcessBlock(M, offset) {
    const _M = M;

    // Swap endian
    for (let i = 0; i < 16; i += 1) {
      // Shortcuts
      const offset_i = offset + i;
      const M_offset_i = _M[offset_i];

      // Swap
      _M[offset_i] = (
        (((M_offset_i << 8) | (M_offset_i >>> 24)) & 0x00ff00ff)
          | (((M_offset_i << 24) | (M_offset_i >>> 8)) & 0xff00ff00)
      );
    }
    // Shortcut
    const H = this._hash.words;
    const hl = _hl.words;
    const hr = _hr.words;
    const zl = _zl.words;
    const zr = _zr.words;
    const sl = _sl.words;
    const sr = _sr.words;

    // Working variables
    let al = H[0];
    let bl = H[1];
    let cl = H[2];
    let dl = H[3];
    let el = H[4];
    let ar = H[0];
    let br = H[1];
    let cr = H[2];
    let dr = H[3];
    let er = H[4];

    // Computation
    let t;
    for (let i = 0; i < 80; i += 1) {
      t = (al + _M[offset + zl[i]]) | 0;
      if (i < 16) {
        t += f1(bl, cl, dl) + hl[0];
      } else if (i < 32) {
        t += f2(bl, cl, dl) + hl[1];
      } else if (i < 48) {
        t += f3(bl, cl, dl) + hl[2];
      } else if (i < 64) {
        t += f4(bl, cl, dl) + hl[3];
      } else { // if (i<80) {
        t += f5(bl, cl, dl) + hl[4];
      }
      t |= 0;
      t = rotl(t, sl[i]);
      t = (t + el) | 0;
      al = el;
      el = dl;
      dl = rotl(cl, 10);
      cl = bl;
      bl = t;

      t = (ar + _M[offset + zr[i]]) | 0;
      if (i < 16) {
        t += f5(br, cr, dr) + hr[0];
      } else if (i < 32) {
        t += f4(br, cr, dr) + hr[1];
      } else if (i < 48) {
        t += f3(br, cr, dr) + hr[2];
      } else if (i < 64) {
        t += f2(br, cr, dr) + hr[3];
      } else { // if (i<80) {
        t += f1(br, cr, dr) + hr[4];
      }
      t |= 0;
      t = rotl(t, sr[i]);
      t = (t + er) | 0;
      ar = er;
      er = dr;
      dr = rotl(cr, 10);
      cr = br;
      br = t;
    }
    // Intermediate hash value
    t = (H[1] + cl + dr) | 0;
    H[1] = (H[2] + dl + er) | 0;
    H[2] = (H[3] + el + ar) | 0;
    H[3] = (H[4] + al + br) | 0;
    H[4] = (H[0] + bl + cr) | 0;
    H[0] = t;
  }

  _doFinalize() {
    // Shortcuts
    const data = this._data;
    const dataWords = data.words;

    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = data.sigBytes * 8;

    // Add padding
    dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - (nBitsLeft % 32));
    dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
      (((nBitsTotal << 8) | (nBitsTotal >>> 24)) & 0x00ff00ff)
        | (((nBitsTotal << 24) | (nBitsTotal >>> 8)) & 0xff00ff00)
    );
    data.sigBytes = (dataWords.length + 1) * 4;

    // Hash final blocks
    this._process();

    // Shortcuts
    const hash = this._hash;
    const H = hash.words;

    // Swap endian
    for (let i = 0; i < 5; i += 1) {
      // Shortcut
      const H_i = H[i];

      // Swap
      H[i] = (((H_i << 8) | (H_i >>> 24)) & 0x00ff00ff)
        | (((H_i << 24) | (H_i >>> 8)) & 0xff00ff00);
    }

    // Return final computed hash
    return hash;
  }

  clone() {
    const clone = super.clone.call(this);
    clone._hash = this._hash.clone();

    return clone;
  }
}

/**
 * Shortcut function to the hasher's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 *
 * @return {WordArray} The hash.
 *
 * @static
 *
 * @example
 *
 *     var hash = CryptoJS.RIPEMD160('message');
 *     var hash = CryptoJS.RIPEMD160(wordArray);
 */
const RIPEMD160 = Hasher._createHelper(RIPEMD160Algo);

/**
 * Shortcut function to the HMAC's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 * @param {WordArray|string} key The secret key.
 *
 * @return {WordArray} The HMAC.
 *
 * @static
 *
 * @example
 *
 *     var hmac = CryptoJS.HmacRIPEMD160(message, key);
 */
const HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160Algo);

/**
 * Password-Based Key Derivation Function 2 algorithm.
 */
class PBKDF2Algo extends Base {
  /**
   * Initializes a newly created key derivation function.
   *
   * @param {Object} cfg (Optional) The configuration options to use for the derivation.
   *
   * @example
   *
   *     const kdf = CryptoJS.algo.PBKDF2.create();
   *     const kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
   *     const kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
   */
  constructor(cfg) {
    super();

    /**
     * Configuration options.
     *
     * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
     * @property {Hasher} hasher The hasher to use. Default: SHA1
     * @property {number} iterations The number of iterations to perform. Default: 1
     */
    this.cfg = Object.assign(
      new Base(),
      {
        keySize: 128 / 32,
        hasher: SHA1Algo,
        iterations: 1,
      },
      cfg,
    );
  }

  /**
   * Computes the Password-Based Key Derivation Function 2.
   *
   * @param {WordArray|string} password The password.
   * @param {WordArray|string} salt A salt.
   *
   * @return {WordArray} The derived key.
   *
   * @example
   *
   *     const key = kdf.compute(password, salt);
   */
  compute(password, salt) {
    // Shortcut
    const { cfg } = this;

    // Init HMAC
    const hmac = HMAC.create(cfg.hasher, password);

    // Initial values
    const derivedKey = WordArray.create();
    const blockIndex = WordArray.create([0x00000001]);

    // Shortcuts
    const derivedKeyWords = derivedKey.words;
    const blockIndexWords = blockIndex.words;
    const { keySize, iterations } = cfg;

    // Generate key
    while (derivedKeyWords.length < keySize) {
      const block = hmac.update(salt).finalize(blockIndex);
      hmac.reset();

      // Shortcuts
      const blockWords = block.words;
      const blockWordsLength = blockWords.length;

      // Iterations
      let intermediate = block;
      for (let i = 1; i < iterations; i += 1) {
        intermediate = hmac.finalize(intermediate);
        hmac.reset();

        // Shortcut
        const intermediateWords = intermediate.words;

        // XOR intermediate with block
        for (let j = 0; j < blockWordsLength; j += 1) {
          blockWords[j] ^= intermediateWords[j];
        }
      }

      derivedKey.concat(block);
      blockIndexWords[0] += 1;
    }
    derivedKey.sigBytes = keySize * 4;

    return derivedKey;
  }
}

/**
 * Computes the Password-Based Key Derivation Function 2.
 *
 * @param {WordArray|string} password The password.
 * @param {WordArray|string} salt A salt.
 * @param {Object} cfg (Optional) The configuration options to use for this computation.
 *
 * @return {WordArray} The derived key.
 *
 * @static
 *
 * @example
 *
 *     var key = CryptoJS.PBKDF2(password, salt);
 *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
 *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
 */
const PBKDF2 = (password, salt, cfg) => PBKDF2Algo.create(cfg).compute(password, salt);

// Lookup tables
const _SBOX = [];
const INV_SBOX = [];
const _SUB_MIX_0 = [];
const _SUB_MIX_1 = [];
const _SUB_MIX_2 = [];
const _SUB_MIX_3 = [];
const INV_SUB_MIX_0 = [];
const INV_SUB_MIX_1 = [];
const INV_SUB_MIX_2 = [];
const INV_SUB_MIX_3 = [];

// Compute lookup tables

// Compute double table
const d = [];
for (let i = 0; i < 256; i += 1) {
  if (i < 128) {
    d[i] = i << 1;
  } else {
    d[i] = (i << 1) ^ 0x11b;
  }
}

// Walk GF(2^8)
let x = 0;
let xi = 0;
for (let i = 0; i < 256; i += 1) {
  // Compute sbox
  let sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
  sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
  _SBOX[x] = sx;
  INV_SBOX[sx] = x;

  // Compute multiplication
  const x2 = d[x];
  const x4 = d[x2];
  const x8 = d[x4];

  // Compute sub bytes, mix columns tables
  let t = (d[sx] * 0x101) ^ (sx * 0x1010100);
  _SUB_MIX_0[x] = (t << 24) | (t >>> 8);
  _SUB_MIX_1[x] = (t << 16) | (t >>> 16);
  _SUB_MIX_2[x] = (t << 8) | (t >>> 24);
  _SUB_MIX_3[x] = t;

  // Compute inv sub bytes, inv mix columns tables
  t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
  INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
  INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
  INV_SUB_MIX_2[sx] = (t << 8) | (t >>> 24);
  INV_SUB_MIX_3[sx] = t;

  // Compute next counter
  if (!x) {
    xi = 1;
    x = xi;
  } else {
    x = x2 ^ d[d[d[x8 ^ x2]]];
    xi ^= d[d[xi]];
  }
}

// Precomputed Rcon lookup
const RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

/**
 * AES block cipher algorithm.
 */
class AESAlgo extends BlockCipher {
  _doReset() {
    let t;

    // Skip reset of nRounds has been set before and key did not change
    if (this._nRounds && this._keyPriorReset === this._key) {
      return;
    }

    // Shortcuts
    this._keyPriorReset = this._key;
    const key = this._keyPriorReset;
    const keyWords = key.words;
    const keySize = key.sigBytes / 4;

    // Compute number of rounds
    this._nRounds = keySize + 6;
    const nRounds = this._nRounds;

    // Compute number of key schedule rows
    const ksRows = (nRounds + 1) * 4;

    // Compute key schedule
    this._keySchedule = [];
    const keySchedule = this._keySchedule;
    for (let ksRow = 0; ksRow < ksRows; ksRow += 1) {
      if (ksRow < keySize) {
        keySchedule[ksRow] = keyWords[ksRow];
      } else {
        t = keySchedule[ksRow - 1];

        if (!(ksRow % keySize)) {
          // Rot word
          t = (t << 8) | (t >>> 24);

          // Sub word
          t = (_SBOX[t >>> 24] << 24)
            | (_SBOX[(t >>> 16) & 0xff] << 16)
            | (_SBOX[(t >>> 8) & 0xff] << 8)
            | _SBOX[t & 0xff];

          // Mix Rcon
          t ^= RCON[(ksRow / keySize) | 0] << 24;
        } else if (keySize > 6 && ksRow % keySize === 4) {
          // Sub word
          t = (_SBOX[t >>> 24] << 24)
            | (_SBOX[(t >>> 16) & 0xff] << 16)
            | (_SBOX[(t >>> 8) & 0xff] << 8)
            | _SBOX[t & 0xff];
        }

        keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
      }
    }

    // Compute inv key schedule
    this._invKeySchedule = [];
    const invKeySchedule = this._invKeySchedule;
    for (let invKsRow = 0; invKsRow < ksRows; invKsRow += 1) {
      const ksRow = ksRows - invKsRow;

      if (invKsRow % 4) {
        t = keySchedule[ksRow];
      } else {
        t = keySchedule[ksRow - 4];
      }

      if (invKsRow < 4 || ksRow <= 4) {
        invKeySchedule[invKsRow] = t;
      } else {
        invKeySchedule[invKsRow] = INV_SUB_MIX_0[_SBOX[t >>> 24]]
          ^ INV_SUB_MIX_1[_SBOX[(t >>> 16) & 0xff]]
          ^ INV_SUB_MIX_2[_SBOX[(t >>> 8) & 0xff]]
          ^ INV_SUB_MIX_3[_SBOX[t & 0xff]];
      }
    }
  }

  encryptBlock(M, offset) {
    this._doCryptBlock(
      M, offset, this._keySchedule, _SUB_MIX_0, _SUB_MIX_1, _SUB_MIX_2, _SUB_MIX_3, _SBOX,
    );
  }

  decryptBlock(M, offset) {
    const _M = M;

    // Swap 2nd and 4th rows
    let t = _M[offset + 1];
    _M[offset + 1] = _M[offset + 3];
    _M[offset + 3] = t;

    this._doCryptBlock(
      _M,
      offset,
      this._invKeySchedule,
      INV_SUB_MIX_0,
      INV_SUB_MIX_1,
      INV_SUB_MIX_2,
      INV_SUB_MIX_3,
      INV_SBOX,
    );

    // Inv swap 2nd and 4th rows
    t = _M[offset + 1];
    _M[offset + 1] = _M[offset + 3];
    _M[offset + 3] = t;
  }

  _doCryptBlock(M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
    const _M = M;

    // Shortcut
    const nRounds = this._nRounds;

    // Get input, add round key
    let s0 = _M[offset] ^ keySchedule[0];
    let s1 = _M[offset + 1] ^ keySchedule[1];
    let s2 = _M[offset + 2] ^ keySchedule[2];
    let s3 = _M[offset + 3] ^ keySchedule[3];

    // Key schedule row counter
    let ksRow = 4;

    // Rounds
    for (let round = 1; round < nRounds; round += 1) {
      // Shift rows, sub bytes, mix columns, add round key
      const t0 = SUB_MIX_0[s0 >>> 24]
        ^ SUB_MIX_1[(s1 >>> 16) & 0xff]
        ^ SUB_MIX_2[(s2 >>> 8) & 0xff]
        ^ SUB_MIX_3[s3 & 0xff]
        ^ keySchedule[ksRow];
      ksRow += 1;
      const t1 = SUB_MIX_0[s1 >>> 24]
        ^ SUB_MIX_1[(s2 >>> 16) & 0xff]
        ^ SUB_MIX_2[(s3 >>> 8) & 0xff]
        ^ SUB_MIX_3[s0 & 0xff]
        ^ keySchedule[ksRow];
      ksRow += 1;
      const t2 = SUB_MIX_0[s2 >>> 24]
        ^ SUB_MIX_1[(s3 >>> 16) & 0xff]
        ^ SUB_MIX_2[(s0 >>> 8) & 0xff]
        ^ SUB_MIX_3[s1 & 0xff]
        ^ keySchedule[ksRow];
      ksRow += 1;
      const t3 = SUB_MIX_0[s3 >>> 24]
        ^ SUB_MIX_1[(s0 >>> 16) & 0xff]
        ^ SUB_MIX_2[(s1 >>> 8) & 0xff]
        ^ SUB_MIX_3[s2 & 0xff]
        ^ keySchedule[ksRow];
      ksRow += 1;

      // Update state
      s0 = t0;
      s1 = t1;
      s2 = t2;
      s3 = t3;
    }

    // Shift rows, sub bytes, add round key
    const t0 = (
      (SBOX[s0 >>> 24] << 24)
        | (SBOX[(s1 >>> 16) & 0xff] << 16)
        | (SBOX[(s2 >>> 8) & 0xff] << 8)
        | SBOX[s3 & 0xff]
    ) ^ keySchedule[ksRow];
    ksRow += 1;
    const t1 = (
      (SBOX[s1 >>> 24] << 24)
        | (SBOX[(s2 >>> 16) & 0xff] << 16)
        | (SBOX[(s3 >>> 8) & 0xff] << 8)
        | SBOX[s0 & 0xff]
    ) ^ keySchedule[ksRow];
    ksRow += 1;
    const t2 = (
      (SBOX[s2 >>> 24] << 24)
        | (SBOX[(s3 >>> 16) & 0xff] << 16)
        | (SBOX[(s0 >>> 8) & 0xff] << 8)
        | SBOX[s1 & 0xff]
    ) ^ keySchedule[ksRow];
    ksRow += 1;
    const t3 = (
      (SBOX[s3 >>> 24] << 24)
        | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]
    ) ^ keySchedule[ksRow];
    ksRow += 1;

    // Set output
    _M[offset] = t0;
    _M[offset + 1] = t1;
    _M[offset + 2] = t2;
    _M[offset + 3] = t3;
  }
}
AESAlgo.keySize = 256 / 32;

/**
 * Shortcut functions to the cipher's object interface.
 *
 * @example
 *
 *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
 *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
 */
const AES = BlockCipher._createHelper(AESAlgo);

// Permuted Choice 1 constants
const PC1 = [
  57, 49, 41, 33, 25, 17, 9, 1,
  58, 50, 42, 34, 26, 18, 10, 2,
  59, 51, 43, 35, 27, 19, 11, 3,
  60, 52, 44, 36, 63, 55, 47, 39,
  31, 23, 15, 7, 62, 54, 46, 38,
  30, 22, 14, 6, 61, 53, 45, 37,
  29, 21, 13, 5, 28, 20, 12, 4,
];

// Permuted Choice 2 constants
const PC2 = [
  14, 17, 11, 24, 1, 5,
  3, 28, 15, 6, 21, 10,
  23, 19, 12, 4, 26, 8,
  16, 7, 27, 20, 13, 2,
  41, 52, 31, 37, 47, 55,
  30, 40, 51, 45, 33, 48,
  44, 49, 39, 56, 34, 53,
  46, 42, 50, 36, 29, 32,
];

// Cumulative bit shift constants
const BIT_SHIFTS = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];

// SBOXes and round permutation constants
const SBOX_P = [
  {
    0x0: 0x808200,
    0x10000000: 0x8000,
    0x20000000: 0x808002,
    0x30000000: 0x2,
    0x40000000: 0x200,
    0x50000000: 0x808202,
    0x60000000: 0x800202,
    0x70000000: 0x800000,
    0x80000000: 0x202,
    0x90000000: 0x800200,
    0xa0000000: 0x8200,
    0xb0000000: 0x808000,
    0xc0000000: 0x8002,
    0xd0000000: 0x800002,
    0xe0000000: 0x0,
    0xf0000000: 0x8202,
    0x8000000: 0x0,
    0x18000000: 0x808202,
    0x28000000: 0x8202,
    0x38000000: 0x8000,
    0x48000000: 0x808200,
    0x58000000: 0x200,
    0x68000000: 0x808002,
    0x78000000: 0x2,
    0x88000000: 0x800200,
    0x98000000: 0x8200,
    0xa8000000: 0x808000,
    0xb8000000: 0x800202,
    0xc8000000: 0x800002,
    0xd8000000: 0x8002,
    0xe8000000: 0x202,
    0xf8000000: 0x800000,
    0x1: 0x8000,
    0x10000001: 0x2,
    0x20000001: 0x808200,
    0x30000001: 0x800000,
    0x40000001: 0x808002,
    0x50000001: 0x8200,
    0x60000001: 0x200,
    0x70000001: 0x800202,
    0x80000001: 0x808202,
    0x90000001: 0x808000,
    0xa0000001: 0x800002,
    0xb0000001: 0x8202,
    0xc0000001: 0x202,
    0xd0000001: 0x800200,
    0xe0000001: 0x8002,
    0xf0000001: 0x0,
    0x8000001: 0x808202,
    0x18000001: 0x808000,
    0x28000001: 0x800000,
    0x38000001: 0x200,
    0x48000001: 0x8000,
    0x58000001: 0x800002,
    0x68000001: 0x2,
    0x78000001: 0x8202,
    0x88000001: 0x8002,
    0x98000001: 0x800202,
    0xa8000001: 0x202,
    0xb8000001: 0x808200,
    0xc8000001: 0x800200,
    0xd8000001: 0x0,
    0xe8000001: 0x8200,
    0xf8000001: 0x808002,
  },
  {
    0x0: 0x40084010,
    0x1000000: 0x4000,
    0x2000000: 0x80000,
    0x3000000: 0x40080010,
    0x4000000: 0x40000010,
    0x5000000: 0x40084000,
    0x6000000: 0x40004000,
    0x7000000: 0x10,
    0x8000000: 0x84000,
    0x9000000: 0x40004010,
    0xa000000: 0x40000000,
    0xb000000: 0x84010,
    0xc000000: 0x80010,
    0xd000000: 0x0,
    0xe000000: 0x4010,
    0xf000000: 0x40080000,
    0x800000: 0x40004000,
    0x1800000: 0x84010,
    0x2800000: 0x10,
    0x3800000: 0x40004010,
    0x4800000: 0x40084010,
    0x5800000: 0x40000000,
    0x6800000: 0x80000,
    0x7800000: 0x40080010,
    0x8800000: 0x80010,
    0x9800000: 0x0,
    0xa800000: 0x4000,
    0xb800000: 0x40080000,
    0xc800000: 0x40000010,
    0xd800000: 0x84000,
    0xe800000: 0x40084000,
    0xf800000: 0x4010,
    0x10000000: 0x0,
    0x11000000: 0x40080010,
    0x12000000: 0x40004010,
    0x13000000: 0x40084000,
    0x14000000: 0x40080000,
    0x15000000: 0x10,
    0x16000000: 0x84010,
    0x17000000: 0x4000,
    0x18000000: 0x4010,
    0x19000000: 0x80000,
    0x1a000000: 0x80010,
    0x1b000000: 0x40000010,
    0x1c000000: 0x84000,
    0x1d000000: 0x40004000,
    0x1e000000: 0x40000000,
    0x1f000000: 0x40084010,
    0x10800000: 0x84010,
    0x11800000: 0x80000,
    0x12800000: 0x40080000,
    0x13800000: 0x4000,
    0x14800000: 0x40004000,
    0x15800000: 0x40084010,
    0x16800000: 0x10,
    0x17800000: 0x40000000,
    0x18800000: 0x40084000,
    0x19800000: 0x40000010,
    0x1a800000: 0x40004010,
    0x1b800000: 0x80010,
    0x1c800000: 0x0,
    0x1d800000: 0x4010,
    0x1e800000: 0x40080010,
    0x1f800000: 0x84000,
  },
  {
    0x0: 0x104,
    0x100000: 0x0,
    0x200000: 0x4000100,
    0x300000: 0x10104,
    0x400000: 0x10004,
    0x500000: 0x4000004,
    0x600000: 0x4010104,
    0x700000: 0x4010000,
    0x800000: 0x4000000,
    0x900000: 0x4010100,
    0xa00000: 0x10100,
    0xb00000: 0x4010004,
    0xc00000: 0x4000104,
    0xd00000: 0x10000,
    0xe00000: 0x4,
    0xf00000: 0x100,
    0x80000: 0x4010100,
    0x180000: 0x4010004,
    0x280000: 0x0,
    0x380000: 0x4000100,
    0x480000: 0x4000004,
    0x580000: 0x10000,
    0x680000: 0x10004,
    0x780000: 0x104,
    0x880000: 0x4,
    0x980000: 0x100,
    0xa80000: 0x4010000,
    0xb80000: 0x10104,
    0xc80000: 0x10100,
    0xd80000: 0x4000104,
    0xe80000: 0x4010104,
    0xf80000: 0x4000000,
    0x1000000: 0x4010100,
    0x1100000: 0x10004,
    0x1200000: 0x10000,
    0x1300000: 0x4000100,
    0x1400000: 0x100,
    0x1500000: 0x4010104,
    0x1600000: 0x4000004,
    0x1700000: 0x0,
    0x1800000: 0x4000104,
    0x1900000: 0x4000000,
    0x1a00000: 0x4,
    0x1b00000: 0x10100,
    0x1c00000: 0x4010000,
    0x1d00000: 0x104,
    0x1e00000: 0x10104,
    0x1f00000: 0x4010004,
    0x1080000: 0x4000000,
    0x1180000: 0x104,
    0x1280000: 0x4010100,
    0x1380000: 0x0,
    0x1480000: 0x10004,
    0x1580000: 0x4000100,
    0x1680000: 0x100,
    0x1780000: 0x4010004,
    0x1880000: 0x10000,
    0x1980000: 0x4010104,
    0x1a80000: 0x10104,
    0x1b80000: 0x4000004,
    0x1c80000: 0x4000104,
    0x1d80000: 0x4010000,
    0x1e80000: 0x4,
    0x1f80000: 0x10100,
  },
  {
    0x0: 0x80401000,
    0x10000: 0x80001040,
    0x20000: 0x401040,
    0x30000: 0x80400000,
    0x40000: 0x0,
    0x50000: 0x401000,
    0x60000: 0x80000040,
    0x70000: 0x400040,
    0x80000: 0x80000000,
    0x90000: 0x400000,
    0xa0000: 0x40,
    0xb0000: 0x80001000,
    0xc0000: 0x80400040,
    0xd0000: 0x1040,
    0xe0000: 0x1000,
    0xf0000: 0x80401040,
    0x8000: 0x80001040,
    0x18000: 0x40,
    0x28000: 0x80400040,
    0x38000: 0x80001000,
    0x48000: 0x401000,
    0x58000: 0x80401040,
    0x68000: 0x0,
    0x78000: 0x80400000,
    0x88000: 0x1000,
    0x98000: 0x80401000,
    0xa8000: 0x400000,
    0xb8000: 0x1040,
    0xc8000: 0x80000000,
    0xd8000: 0x400040,
    0xe8000: 0x401040,
    0xf8000: 0x80000040,
    0x100000: 0x400040,
    0x110000: 0x401000,
    0x120000: 0x80000040,
    0x130000: 0x0,
    0x140000: 0x1040,
    0x150000: 0x80400040,
    0x160000: 0x80401000,
    0x170000: 0x80001040,
    0x180000: 0x80401040,
    0x190000: 0x80000000,
    0x1a0000: 0x80400000,
    0x1b0000: 0x401040,
    0x1c0000: 0x80001000,
    0x1d0000: 0x400000,
    0x1e0000: 0x40,
    0x1f0000: 0x1000,
    0x108000: 0x80400000,
    0x118000: 0x80401040,
    0x128000: 0x0,
    0x138000: 0x401000,
    0x148000: 0x400040,
    0x158000: 0x80000000,
    0x168000: 0x80001040,
    0x178000: 0x40,
    0x188000: 0x80000040,
    0x198000: 0x1000,
    0x1a8000: 0x80001000,
    0x1b8000: 0x80400040,
    0x1c8000: 0x1040,
    0x1d8000: 0x80401000,
    0x1e8000: 0x400000,
    0x1f8000: 0x401040,
  },
  {
    0x0: 0x80,
    0x1000: 0x1040000,
    0x2000: 0x40000,
    0x3000: 0x20000000,
    0x4000: 0x20040080,
    0x5000: 0x1000080,
    0x6000: 0x21000080,
    0x7000: 0x40080,
    0x8000: 0x1000000,
    0x9000: 0x20040000,
    0xa000: 0x20000080,
    0xb000: 0x21040080,
    0xc000: 0x21040000,
    0xd000: 0x0,
    0xe000: 0x1040080,
    0xf000: 0x21000000,
    0x800: 0x1040080,
    0x1800: 0x21000080,
    0x2800: 0x80,
    0x3800: 0x1040000,
    0x4800: 0x40000,
    0x5800: 0x20040080,
    0x6800: 0x21040000,
    0x7800: 0x20000000,
    0x8800: 0x20040000,
    0x9800: 0x0,
    0xa800: 0x21040080,
    0xb800: 0x1000080,
    0xc800: 0x20000080,
    0xd800: 0x21000000,
    0xe800: 0x1000000,
    0xf800: 0x40080,
    0x10000: 0x40000,
    0x11000: 0x80,
    0x12000: 0x20000000,
    0x13000: 0x21000080,
    0x14000: 0x1000080,
    0x15000: 0x21040000,
    0x16000: 0x20040080,
    0x17000: 0x1000000,
    0x18000: 0x21040080,
    0x19000: 0x21000000,
    0x1a000: 0x1040000,
    0x1b000: 0x20040000,
    0x1c000: 0x40080,
    0x1d000: 0x20000080,
    0x1e000: 0x0,
    0x1f000: 0x1040080,
    0x10800: 0x21000080,
    0x11800: 0x1000000,
    0x12800: 0x1040000,
    0x13800: 0x20040080,
    0x14800: 0x20000000,
    0x15800: 0x1040080,
    0x16800: 0x80,
    0x17800: 0x21040000,
    0x18800: 0x40080,
    0x19800: 0x21040080,
    0x1a800: 0x0,
    0x1b800: 0x21000000,
    0x1c800: 0x1000080,
    0x1d800: 0x40000,
    0x1e800: 0x20040000,
    0x1f800: 0x20000080,
  },
  {
    0x0: 0x10000008,
    0x100: 0x2000,
    0x200: 0x10200000,
    0x300: 0x10202008,
    0x400: 0x10002000,
    0x500: 0x200000,
    0x600: 0x200008,
    0x700: 0x10000000,
    0x800: 0x0,
    0x900: 0x10002008,
    0xa00: 0x202000,
    0xb00: 0x8,
    0xc00: 0x10200008,
    0xd00: 0x202008,
    0xe00: 0x2008,
    0xf00: 0x10202000,
    0x80: 0x10200000,
    0x180: 0x10202008,
    0x280: 0x8,
    0x380: 0x200000,
    0x480: 0x202008,
    0x580: 0x10000008,
    0x680: 0x10002000,
    0x780: 0x2008,
    0x880: 0x200008,
    0x980: 0x2000,
    0xa80: 0x10002008,
    0xb80: 0x10200008,
    0xc80: 0x0,
    0xd80: 0x10202000,
    0xe80: 0x202000,
    0xf80: 0x10000000,
    0x1000: 0x10002000,
    0x1100: 0x10200008,
    0x1200: 0x10202008,
    0x1300: 0x2008,
    0x1400: 0x200000,
    0x1500: 0x10000000,
    0x1600: 0x10000008,
    0x1700: 0x202000,
    0x1800: 0x202008,
    0x1900: 0x0,
    0x1a00: 0x8,
    0x1b00: 0x10200000,
    0x1c00: 0x2000,
    0x1d00: 0x10002008,
    0x1e00: 0x10202000,
    0x1f00: 0x200008,
    0x1080: 0x8,
    0x1180: 0x202000,
    0x1280: 0x200000,
    0x1380: 0x10000008,
    0x1480: 0x10002000,
    0x1580: 0x2008,
    0x1680: 0x10202008,
    0x1780: 0x10200000,
    0x1880: 0x10202000,
    0x1980: 0x10200008,
    0x1a80: 0x2000,
    0x1b80: 0x202008,
    0x1c80: 0x200008,
    0x1d80: 0x0,
    0x1e80: 0x10000000,
    0x1f80: 0x10002008,
  },
  {
    0x0: 0x100000,
    0x10: 0x2000401,
    0x20: 0x400,
    0x30: 0x100401,
    0x40: 0x2100401,
    0x50: 0x0,
    0x60: 0x1,
    0x70: 0x2100001,
    0x80: 0x2000400,
    0x90: 0x100001,
    0xa0: 0x2000001,
    0xb0: 0x2100400,
    0xc0: 0x2100000,
    0xd0: 0x401,
    0xe0: 0x100400,
    0xf0: 0x2000000,
    0x8: 0x2100001,
    0x18: 0x0,
    0x28: 0x2000401,
    0x38: 0x2100400,
    0x48: 0x100000,
    0x58: 0x2000001,
    0x68: 0x2000000,
    0x78: 0x401,
    0x88: 0x100401,
    0x98: 0x2000400,
    0xa8: 0x2100000,
    0xb8: 0x100001,
    0xc8: 0x400,
    0xd8: 0x2100401,
    0xe8: 0x1,
    0xf8: 0x100400,
    0x100: 0x2000000,
    0x110: 0x100000,
    0x120: 0x2000401,
    0x130: 0x2100001,
    0x140: 0x100001,
    0x150: 0x2000400,
    0x160: 0x2100400,
    0x170: 0x100401,
    0x180: 0x401,
    0x190: 0x2100401,
    0x1a0: 0x100400,
    0x1b0: 0x1,
    0x1c0: 0x0,
    0x1d0: 0x2100000,
    0x1e0: 0x2000001,
    0x1f0: 0x400,
    0x108: 0x100400,
    0x118: 0x2000401,
    0x128: 0x2100001,
    0x138: 0x1,
    0x148: 0x2000000,
    0x158: 0x100000,
    0x168: 0x401,
    0x178: 0x2100400,
    0x188: 0x2000001,
    0x198: 0x2100000,
    0x1a8: 0x0,
    0x1b8: 0x2100401,
    0x1c8: 0x100401,
    0x1d8: 0x400,
    0x1e8: 0x2000400,
    0x1f8: 0x100001,
  },
  {
    0x0: 0x8000820,
    0x1: 0x20000,
    0x2: 0x8000000,
    0x3: 0x20,
    0x4: 0x20020,
    0x5: 0x8020820,
    0x6: 0x8020800,
    0x7: 0x800,
    0x8: 0x8020000,
    0x9: 0x8000800,
    0xa: 0x20800,
    0xb: 0x8020020,
    0xc: 0x820,
    0xd: 0x0,
    0xe: 0x8000020,
    0xf: 0x20820,
    0x80000000: 0x800,
    0x80000001: 0x8020820,
    0x80000002: 0x8000820,
    0x80000003: 0x8000000,
    0x80000004: 0x8020000,
    0x80000005: 0x20800,
    0x80000006: 0x20820,
    0x80000007: 0x20,
    0x80000008: 0x8000020,
    0x80000009: 0x820,
    0x8000000a: 0x20020,
    0x8000000b: 0x8020800,
    0x8000000c: 0x0,
    0x8000000d: 0x8020020,
    0x8000000e: 0x8000800,
    0x8000000f: 0x20000,
    0x10: 0x20820,
    0x11: 0x8020800,
    0x12: 0x20,
    0x13: 0x800,
    0x14: 0x8000800,
    0x15: 0x8000020,
    0x16: 0x8020020,
    0x17: 0x20000,
    0x18: 0x0,
    0x19: 0x20020,
    0x1a: 0x8020000,
    0x1b: 0x8000820,
    0x1c: 0x8020820,
    0x1d: 0x20800,
    0x1e: 0x820,
    0x1f: 0x8000000,
    0x80000010: 0x20000,
    0x80000011: 0x800,
    0x80000012: 0x8020020,
    0x80000013: 0x20820,
    0x80000014: 0x20,
    0x80000015: 0x8020000,
    0x80000016: 0x8000000,
    0x80000017: 0x8000820,
    0x80000018: 0x8020820,
    0x80000019: 0x8000020,
    0x8000001a: 0x8000800,
    0x8000001b: 0x0,
    0x8000001c: 0x20800,
    0x8000001d: 0x820,
    0x8000001e: 0x20020,
    0x8000001f: 0x8020800,
  },
];

// Masks that select the SBOX input
const SBOX_MASK = [
  0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000,
  0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f,
];

// Swap bits across the left and right words
function exchangeLR(offset, mask) {
  const t = ((this._lBlock >>> offset) ^ this._rBlock) & mask;
  this._rBlock ^= t;
  this._lBlock ^= t << offset;
}

function exchangeRL(offset, mask) {
  const t = ((this._rBlock >>> offset) ^ this._lBlock) & mask;
  this._lBlock ^= t;
  this._rBlock ^= t << offset;
}

/**
 * DES block cipher algorithm.
 */
class DESAlgo extends BlockCipher {
  _doReset() {
    // Shortcuts
    const key = this._key;
    const keyWords = key.words;

    // Select 56 bits according to PC1
    const keyBits = [];
    for (let i = 0; i < 56; i += 1) {
      const keyBitPos = PC1[i] - 1;
      keyBits[i] = (keyWords[keyBitPos >>> 5] >>> (31 - (keyBitPos % 32))) & 1;
    }

    // Assemble 16 subkeys
    this._subKeys = [];
    const subKeys = this._subKeys;
    for (let nSubKey = 0; nSubKey < 16; nSubKey += 1) {
      // Create subkey
      subKeys[nSubKey] = [];
      const subKey = subKeys[nSubKey];

      // Shortcut
      const bitShift = BIT_SHIFTS[nSubKey];

      // Select 48 bits according to PC2
      for (let i = 0; i < 24; i += 1) {
        // Select from the left 28 key bits
        subKey[(i / 6) | 0] |= keyBits[((PC2[i] - 1) + bitShift) % 28] << (31 - (i % 6));

        // Select from the right 28 key bits
        subKey[4 + ((i / 6) | 0)]
          |= keyBits[28 + (((PC2[i + 24] - 1) + bitShift) % 28)]
          << (31 - (i % 6));
      }

      // Since each subkey is applied to an expanded 32-bit input,
      // the subkey can be broken into 8 values scaled to 32-bits,
      // which allows the key to be used without expansion
      subKey[0] = (subKey[0] << 1) | (subKey[0] >>> 31);
      for (let i = 1; i < 7; i += 1) {
        subKey[i] >>>= ((i - 1) * 4 + 3);
      }
      subKey[7] = (subKey[7] << 5) | (subKey[7] >>> 27);
    }

    // Compute inverse subkeys
    this._invSubKeys = [];
    const invSubKeys = this._invSubKeys;
    for (let i = 0; i < 16; i += 1) {
      invSubKeys[i] = subKeys[15 - i];
    }
  }

  encryptBlock(M, offset) {
    this._doCryptBlock(M, offset, this._subKeys);
  }

  decryptBlock(M, offset) {
    this._doCryptBlock(M, offset, this._invSubKeys);
  }

  _doCryptBlock(M, offset, subKeys) {
    const _M = M;

    // Get input
    this._lBlock = M[offset];
    this._rBlock = M[offset + 1];

    // Initial permutation
    exchangeLR.call(this, 4, 0x0f0f0f0f);
    exchangeLR.call(this, 16, 0x0000ffff);
    exchangeRL.call(this, 2, 0x33333333);
    exchangeRL.call(this, 8, 0x00ff00ff);
    exchangeLR.call(this, 1, 0x55555555);

    // Rounds
    for (let round = 0; round < 16; round += 1) {
      // Shortcuts
      const subKey = subKeys[round];
      const lBlock = this._lBlock;
      const rBlock = this._rBlock;

      // Feistel function
      let f = 0;
      for (let i = 0; i < 8; i += 1) {
        f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
      }
      this._lBlock = rBlock;
      this._rBlock = lBlock ^ f;
    }

    // Undo swap from last round
    const t = this._lBlock;
    this._lBlock = this._rBlock;
    this._rBlock = t;

    // Final permutation
    exchangeLR.call(this, 1, 0x55555555);
    exchangeRL.call(this, 8, 0x00ff00ff);
    exchangeRL.call(this, 2, 0x33333333);
    exchangeLR.call(this, 16, 0x0000ffff);
    exchangeLR.call(this, 4, 0x0f0f0f0f);

    // Set output
    _M[offset] = this._lBlock;
    _M[offset + 1] = this._rBlock;
  }
}
DESAlgo.keySize = 64 / 32;
DESAlgo.ivSize = 64 / 32;
DESAlgo.blockSize = 64 / 32;

/**
 * Shortcut functions to the cipher's object interface.
 *
 * @example
 *
 *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
 *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
 */
const DES = BlockCipher._createHelper(DESAlgo);

/**
 * Triple-DES block cipher algorithm.
 */
class TripleDESAlgo extends BlockCipher {
  _doReset() {
    // Shortcuts
    const key = this._key;
    const keyWords = key.words;
    // Make sure the key length is valid (64, 128 or >= 192 bit)
    if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {
      throw new Error('Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.');
    }

    // Extend the key according to the keying options defined in 3DES standard
    const key1 = keyWords.slice(0, 2);
    const key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
    const key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);

    // Create DES instances
    this._des1 = DESAlgo.createEncryptor(WordArray.create(key1));
    this._des2 = DESAlgo.createEncryptor(WordArray.create(key2));
    this._des3 = DESAlgo.createEncryptor(WordArray.create(key3));
  }

  encryptBlock(M, offset) {
    this._des1.encryptBlock(M, offset);
    this._des2.decryptBlock(M, offset);
    this._des3.encryptBlock(M, offset);
  }

  decryptBlock(M, offset) {
    this._des3.decryptBlock(M, offset);
    this._des2.encryptBlock(M, offset);
    this._des1.decryptBlock(M, offset);
  }
}
TripleDESAlgo.keySize = 192 / 32;
TripleDESAlgo.ivSize = 64 / 32;
TripleDESAlgo.blockSize = 64 / 32;

/**
 * Shortcut functions to the cipher's object interface.
 *
 * @example
 *
 *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
 *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
 */
const TripleDES = BlockCipher._createHelper(TripleDESAlgo);

// Reusable objects
const S = [];
const C_ = [];
const G = [];

function nextState() {
  // Shortcuts
  const X = this._X;
  const C = this._C;

  // Save old counter values
  for (let i = 0; i < 8; i += 1) {
    C_[i] = C[i];
  }

  // Calculate new counter values
  C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
  C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
  C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
  C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
  C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
  C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
  C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
  C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
  this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

  // Calculate the g-values
  for (let i = 0; i < 8; i += 1) {
    const gx = X[i] + C[i];

    // Construct high and low argument for squaring
    const ga = gx & 0xffff;
    const gb = gx >>> 16;

    // Calculate high and low result of squaring
    const gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
    const gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

    // High XOR low
    G[i] = gh ^ gl;
  }

  // Calculate new state values
  X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
  X[1] = (G[1] + ((G[0] << 8) | (G[0] >>> 24)) + G[7]) | 0;
  X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
  X[3] = (G[3] + ((G[2] << 8) | (G[2] >>> 24)) + G[1]) | 0;
  X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
  X[5] = (G[5] + ((G[4] << 8) | (G[4] >>> 24)) + G[3]) | 0;
  X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
  X[7] = (G[7] + ((G[6] << 8) | (G[6] >>> 24)) + G[5]) | 0;
}

/**
 * Rabbit stream cipher algorithm
 */
class RabbitAlgo extends StreamCipher {
  constructor(...args) {
    super(...args);

    this.blockSize = 128 / 32;
    this.ivSize = 64 / 32;
  }

  _doReset() {
    // Shortcuts
    const K = this._key.words;
    const { iv } = this.cfg;

    // Swap endian
    for (let i = 0; i < 4; i += 1) {
      K[i] = (((K[i] << 8) | (K[i] >>> 24)) & 0x00ff00ff)
        | (((K[i] << 24) | (K[i] >>> 8)) & 0xff00ff00);
    }

    // Generate initial state values
    this._X = [
      K[0], (K[3] << 16) | (K[2] >>> 16),
      K[1], (K[0] << 16) | (K[3] >>> 16),
      K[2], (K[1] << 16) | (K[0] >>> 16),
      K[3], (K[2] << 16) | (K[1] >>> 16),
    ];
    const X = this._X;

    // Generate initial counter values
    this._C = [
      (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
      (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
      (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
      (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff),
    ];
    const C = this._C;

    // Carry bit
    this._b = 0;

    // Iterate the system four times
    for (let i = 0; i < 4; i += 1) {
      nextState.call(this);
    }

    // Modify the counters
    for (let i = 0; i < 8; i += 1) {
      C[i] ^= X[(i + 4) & 7];
    }

    // IV setup
    if (iv) {
      // Shortcuts
      const IV = iv.words;
      const IV_0 = IV[0];
      const IV_1 = IV[1];

      // Generate four subvectors
      const i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff)
        | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
      const i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff)
        | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
      const i1 = (i0 >>> 16) | (i2 & 0xffff0000);
      const i3 = (i2 << 16) | (i0 & 0x0000ffff);

      // Modify counter values
      C[0] ^= i0;
      C[1] ^= i1;
      C[2] ^= i2;
      C[3] ^= i3;
      C[4] ^= i0;
      C[5] ^= i1;
      C[6] ^= i2;
      C[7] ^= i3;

      // Iterate the system four times
      for (let i = 0; i < 4; i += 1) {
        nextState.call(this);
      }
    }
  }

  _doProcessBlock(M, offset) {
    const _M = M;

    // Shortcut
    const X = this._X;

    // Iterate the system
    nextState.call(this);

    // Generate four keystream words
    S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
    S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
    S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
    S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

    for (let i = 0; i < 4; i += 1) {
      // Swap endian
      S[i] = (((S[i] << 8) | (S[i] >>> 24)) & 0x00ff00ff)
        | (((S[i] << 24) | (S[i] >>> 8)) & 0xff00ff00);

      // Encrypt
      _M[offset + i] ^= S[i];
    }
  }
}

/**
 * Shortcut functions to the cipher's object interface.
 *
 * @example
 *
 *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
 *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
 */
const Rabbit = StreamCipher._createHelper(RabbitAlgo);

// Reusable objects
const S$1 = [];
const C_$1 = [];
const G$1 = [];

function nextState$1() {
  // Shortcuts
  const X = this._X;
  const C = this._C;

  // Save old counter values
  for (let i = 0; i < 8; i += 1) {
    C_$1[i] = C[i];
  }

  // Calculate new counter values
  C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
  C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_$1[0] >>> 0) ? 1 : 0)) | 0;
  C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_$1[1] >>> 0) ? 1 : 0)) | 0;
  C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_$1[2] >>> 0) ? 1 : 0)) | 0;
  C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_$1[3] >>> 0) ? 1 : 0)) | 0;
  C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_$1[4] >>> 0) ? 1 : 0)) | 0;
  C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_$1[5] >>> 0) ? 1 : 0)) | 0;
  C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_$1[6] >>> 0) ? 1 : 0)) | 0;
  this._b = (C[7] >>> 0) < (C_$1[7] >>> 0) ? 1 : 0;

  // Calculate the g-values
  for (let i = 0; i < 8; i += 1) {
    const gx = X[i] + C[i];

    // Construct high and low argument for squaring
    const ga = gx & 0xffff;
    const gb = gx >>> 16;

    // Calculate high and low result of squaring
    const gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
    const gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

    // High XOR low
    G$1[i] = gh ^ gl;
  }

  // Calculate new state values
  X[0] = (G$1[0] + ((G$1[7] << 16) | (G$1[7] >>> 16)) + ((G$1[6] << 16) | (G$1[6] >>> 16))) | 0;
  X[1] = (G$1[1] + ((G$1[0] << 8) | (G$1[0] >>> 24)) + G$1[7]) | 0;
  X[2] = (G$1[2] + ((G$1[1] << 16) | (G$1[1] >>> 16)) + ((G$1[0] << 16) | (G$1[0] >>> 16))) | 0;
  X[3] = (G$1[3] + ((G$1[2] << 8) | (G$1[2] >>> 24)) + G$1[1]) | 0;
  X[4] = (G$1[4] + ((G$1[3] << 16) | (G$1[3] >>> 16)) + ((G$1[2] << 16) | (G$1[2] >>> 16))) | 0;
  X[5] = (G$1[5] + ((G$1[4] << 8) | (G$1[4] >>> 24)) + G$1[3]) | 0;
  X[6] = (G$1[6] + ((G$1[5] << 16) | (G$1[5] >>> 16)) + ((G$1[4] << 16) | (G$1[4] >>> 16))) | 0;
  X[7] = (G$1[7] + ((G$1[6] << 8) | (G$1[6] >>> 24)) + G$1[5]) | 0;
}

/**
 * Rabbit stream cipher algorithm.
 *
 * This is a legacy version that neglected to convert the key to little-endian.
 * This error doesn't affect the cipher's security,
 * but it does affect its compatibility with other implementations.
 */
class RabbitLegacyAlgo extends StreamCipher {
  constructor(...args) {
    super(...args);

    this.blockSize = 128 / 32;
    this.ivSize = 64 / 32;
  }

  _doReset() {
    // Shortcuts
    const K = this._key.words;
    const { iv } = this.cfg;

    // Generate initial state values
    this._X = [
      K[0], (K[3] << 16) | (K[2] >>> 16),
      K[1], (K[0] << 16) | (K[3] >>> 16),
      K[2], (K[1] << 16) | (K[0] >>> 16),
      K[3], (K[2] << 16) | (K[1] >>> 16),
    ];
    const X = this._X;

    // Generate initial counter values
    this._C = [
      (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
      (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
      (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
      (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff),
    ];
    const C = this._C;

    // Carry bit
    this._b = 0;

    // Iterate the system four times
    for (let i = 0; i < 4; i += 1) {
      nextState$1.call(this);
    }

    // Modify the counters
    for (let i = 0; i < 8; i += 1) {
      C[i] ^= X[(i + 4) & 7];
    }

    // IV setup
    if (iv) {
      // Shortcuts
      const IV = iv.words;
      const IV_0 = IV[0];
      const IV_1 = IV[1];

      // Generate four subvectors
      const i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff)
        | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
      const i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff)
        | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
      const i1 = (i0 >>> 16) | (i2 & 0xffff0000);
      const i3 = (i2 << 16) | (i0 & 0x0000ffff);

      // Modify counter values
      C[0] ^= i0;
      C[1] ^= i1;
      C[2] ^= i2;
      C[3] ^= i3;
      C[4] ^= i0;
      C[5] ^= i1;
      C[6] ^= i2;
      C[7] ^= i3;

      // Iterate the system four times
      for (let i = 0; i < 4; i += 1) {
        nextState$1.call(this);
      }
    }
  }

  _doProcessBlock(M, offset) {
    const _M = M;

    // Shortcut
    const X = this._X;

    // Iterate the system
    nextState$1.call(this);

    // Generate four keystream words
    S$1[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
    S$1[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
    S$1[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
    S$1[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

    for (let i = 0; i < 4; i += 1) {
      // Swap endian
      S$1[i] = (((S$1[i] << 8) | (S$1[i] >>> 24)) & 0x00ff00ff)
        | (((S$1[i] << 24) | (S$1[i] >>> 8)) & 0xff00ff00);

      // Encrypt
      _M[offset + i] ^= S$1[i];
    }
  }
}

/**
 * Shortcut functions to the cipher's object interface.
 *
 * @example
 *
 *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
 *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
 */
const RabbitLegacy = StreamCipher._createHelper(RabbitLegacyAlgo);

function generateKeystreamWord() {
  // Shortcuts
  const S = this._S;
  let i = this._i;
  let j = this._j;

  // Generate keystream word
  let keystreamWord = 0;
  for (let n = 0; n < 4; n += 1) {
    i = (i + 1) % 256;
    j = (j + S[i]) % 256;

    // Swap
    const t = S[i];
    S[i] = S[j];
    S[j] = t;

    keystreamWord |= S[(S[i] + S[j]) % 256] << (24 - n * 8);
  }

  // Update counters
  this._i = i;
  this._j = j;

  return keystreamWord;
}

/**
 * RC4 stream cipher algorithm.
 */
class RC4Algo extends StreamCipher {
  _doReset() {
    // Shortcuts
    const key = this._key;
    const keyWords = key.words;
    const keySigBytes = key.sigBytes;

    // Init sbox
    this._S = [];
    const S = this._S;
    for (let i = 0; i < 256; i += 1) {
      S[i] = i;
    }

    // Key setup
    for (let i = 0, j = 0; i < 256; i += 1) {
      const keyByteIndex = i % keySigBytes;
      const keyByte = (keyWords[keyByteIndex >>> 2] >>> (24 - (keyByteIndex % 4) * 8)) & 0xff;

      j = (j + S[i] + keyByte) % 256;

      // Swap
      const t = S[i];
      S[i] = S[j];
      S[j] = t;
    }

    // Counters
    this._j = 0;
    this._i = this._j;
  }

  _doProcessBlock(M, offset) {
    const _M = M;

    _M[offset] ^= generateKeystreamWord.call(this);
  }
}
RC4Algo.keySize = 256 / 32;
RC4Algo.ivSize = 0;

/**
 * Shortcut functions to the cipher's object interface.
 *
 * @example
 *
 *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
 *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
 */
const RC4 = StreamCipher._createHelper(RC4Algo);

/**
 * Modified RC4 stream cipher algorithm.
 */
class RC4DropAlgo extends RC4Algo {
  constructor(...args) {
    super(...args);

    /**
     * Configuration options.
     *
     * @property {number} drop The number of keystream words to drop. Default 192
     */
    Object.assign(this.cfg, { drop: 192 });
  }

  _doReset() {
    super._doReset.call(this);

    // Drop
    for (let i = this.cfg.drop; i > 0; i -= 1) {
      generateKeystreamWord.call(this);
    }
  }
}

/**
 * Shortcut functions to the cipher's object interface.
 *
 * @example
 *
 *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
 *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
 */
const RC4Drop = StreamCipher._createHelper(RC4DropAlgo);

function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
  const _words = words;
  let keystream;

  // Shortcut
  const iv = this._iv;

  // Generate keystream
  if (iv) {
    keystream = iv.slice(0);

    // Remove IV for subsequent blocks
    this._iv = undefined;
  } else {
    keystream = this._prevBlock;
  }
  cipher.encryptBlock(keystream, 0);

  // Encrypt
  for (let i = 0; i < blockSize; i += 1) {
    _words[offset + i] ^= keystream[i];
  }
}

/**
 * Cipher Feedback block mode.
 */
class CFB extends BlockCipherMode {
}
CFB.Encryptor = class extends CFB {
  processBlock(words, offset) {
    // Shortcuts
    const cipher = this._cipher;
    const { blockSize } = cipher;

    generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

    // Remember this block to use with next block
    this._prevBlock = words.slice(offset, offset + blockSize);
  }
};
CFB.Decryptor = class extends CFB {
  processBlock(words, offset) {
    // Shortcuts
    const cipher = this._cipher;
    const { blockSize } = cipher;

    // Remember this block to use with next block
    const thisBlock = words.slice(offset, offset + blockSize);

    generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

    // This block becomes the previous block
    this._prevBlock = thisBlock;
  }
};

/**
 * Counter block mode.
 */

class CTR extends BlockCipherMode {
}
CTR.Encryptor = class extends CTR {
  processBlock(words, offset) {
    const _words = words;

    // Shortcuts
    const cipher = this._cipher;
    const { blockSize } = cipher;
    const iv = this._iv;
    let counter = this._counter;

    // Generate keystream
    if (iv) {
      this._counter = iv.slice(0);
      counter = this._counter;

      // Remove IV for subsequent blocks
      this._iv = undefined;
    }
    const keystream = counter.slice(0);
    cipher.encryptBlock(keystream, 0);

    // Increment counter
    counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0;

    // Encrypt
    for (let i = 0; i < blockSize; i += 1) {
      _words[offset + i] ^= keystream[i];
    }
  }
};
CTR.Decryptor = CTR.Encryptor;

const incWord = (word) => {
  let _word = word;

  if (((word >> 24) & 0xff) === 0xff) { // overflow
    let b1 = (word >> 16) & 0xff;
    let b2 = (word >> 8) & 0xff;
    let b3 = word & 0xff;

    if (b1 === 0xff) { // overflow b1
      b1 = 0;
      if (b2 === 0xff) {
        b2 = 0;
        if (b3 === 0xff) {
          b3 = 0;
        } else {
          b3 += 1;
        }
      } else {
        b2 += 1;
      }
    } else {
      b1 += 1;
    }

    _word = 0;
    _word += (b1 << 16);
    _word += (b2 << 8);
    _word += b3;
  } else {
    _word += (0x01 << 24);
  }
  return _word;
};

const incCounter = (counter) => {
  const _counter = counter;
  _counter[0] = incWord(_counter[0]);

  if (_counter[0] === 0) {
    // encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
    _counter[1] = incWord(_counter[1]);
  }
  return _counter;
};

/** @preserve
 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
 * derived from CryptoJS.mode.CTR
 * Jan Hruby jhruby.web@gmail.com
 */
class CTRGladman extends BlockCipherMode {
}
CTRGladman.Encryptor = class extends CTRGladman {
  processBlock(words, offset) {
    const _words = words;

    // Shortcuts
    const cipher = this._cipher;
    const { blockSize } = cipher;
    const iv = this._iv;
    let counter = this._counter;

    // Generate keystream
    if (iv) {
      this._counter = iv.slice(0);
      counter = this._counter;

      // Remove IV for subsequent blocks
      this._iv = undefined;
    }

    incCounter(counter);

    const keystream = counter.slice(0);
    cipher.encryptBlock(keystream, 0);

    // Encrypt
    for (let i = 0; i < blockSize; i += 1) {
      _words[offset + i] ^= keystream[i];
    }
  }
};
CTRGladman.Decryptor = CTRGladman.Encryptor;

/**
 * Electronic Codebook block mode.
 */

class ECB extends BlockCipherMode {
}
ECB.Encryptor = class extends ECB {
  processBlock(words, offset) {
    this._cipher.encryptBlock(words, offset);
  }
};
ECB.Decryptor = class extends ECB {
  processBlock(words, offset) {
    this._cipher.decryptBlock(words, offset);
  }
};

/**
 * Output Feedback block mode.
 */

class OFB extends BlockCipherMode {
}
OFB.Encryptor = class extends OFB {
  processBlock(words, offset) {
    const _words = words;

    // Shortcuts
    const cipher = this._cipher;
    const { blockSize } = cipher;
    const iv = this._iv;
    let keystream = this._keystream;

    // Generate keystream
    if (iv) {
      this._keystream = iv.slice(0);
      keystream = this._keystream;

      // Remove IV for subsequent blocks
      this._iv = undefined;
    }
    cipher.encryptBlock(keystream, 0);

    // Encrypt
    for (let i = 0; i < blockSize; i += 1) {
      _words[offset + i] ^= keystream[i];
    }
  }
};
OFB.Decryptor = OFB.Encryptor;

/**
 * ANSI X.923 padding strategy.
 */
const AnsiX923 = {
  pad(data, blockSize) {
    const _data = data;

    // Shortcuts
    const dataSigBytes = _data.sigBytes;
    const blockSizeBytes = blockSize * 4;

    // Count padding bytes
    const nPaddingBytes = blockSizeBytes - (dataSigBytes % blockSizeBytes);

    // Compute last byte position
    const lastBytePos = dataSigBytes + nPaddingBytes - 1;

    // Pad
    _data.clamp();
    _data.words[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);
    _data.sigBytes += nPaddingBytes;
  },

  unpad(data) {
    const _data = data;

    // Get number of padding bytes from last byte
    const nPaddingBytes = _data.words[(_data.sigBytes - 1) >>> 2] & 0xff;

    // Remove padding
    _data.sigBytes -= nPaddingBytes;
  },
};

/**
 * ISO 10126 padding strategy.
 */
const Iso10126 = {
  pad(data, blockSize) {
    // Shortcut
    const blockSizeBytes = blockSize * 4;

    // Count padding bytes
    const nPaddingBytes = blockSizeBytes - (data.sigBytes % blockSizeBytes);

    // Pad
    data
      .concat(WordArray.random(nPaddingBytes - 1))
      .concat(WordArray.create([nPaddingBytes << 24], 1));
  },

  unpad(data) {
    const _data = data;
    // Get number of padding bytes from last byte
    const nPaddingBytes = _data.words[(_data.sigBytes - 1) >>> 2] & 0xff;

    // Remove padding
    _data.sigBytes -= nPaddingBytes;
  },
};

/**
 * Zero padding strategy.
 */
const ZeroPadding = {
  pad(data, blockSize) {
    const _data = data;

    // Shortcut
    const blockSizeBytes = blockSize * 4;

    // Pad
    _data.clamp();
    _data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes);
  },

  unpad(data) {
    const _data = data;

    // Shortcut
    const dataWords = _data.words;

    // Unpad
    for (let i = _data.sigBytes - 1; i >= 0; i -= 1) {
      if (((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
        _data.sigBytes = i + 1;
        break;
      }
    }
  },
};

/**
 * ISO/IEC 9797-1 Padding Method 2.
 */
const Iso97971 = {
  pad(data, blockSize) {
    // Add 0x80 byte
    data.concat(WordArray.create([0x80000000], 1));

    // Zero pad the rest
    ZeroPadding.pad(data, blockSize);
  },

  unpad(data) {
    const _data = data;

    // Remove zero padding
    ZeroPadding.unpad(_data);

    // Remove one more byte -- the 0x80 byte
    _data.sigBytes -= 1;
  },
};

/**
 * A noop padding strategy.
 */
const NoPadding = {
  pad() {
  },

  unpad() {
  },
};

const HexFormatter = {
  /**
   * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
   *
   * @param {CipherParams} cipherParams The cipher params object.
   *
   * @return {string} The hexadecimally encoded string.
   *
   * @static
   *
   * @example
   *
   *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
   */
  stringify(cipherParams) {
    return cipherParams.ciphertext.toString(Hex);
  },

  /**
   * Converts a hexadecimally encoded ciphertext string to a cipher params object.
   *
   * @param {string} input The hexadecimally encoded string.
   *
   * @return {CipherParams} The cipher params object.
   *
   * @static
   *
   * @example
   *
   *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
   */
  parse(input) {
    const ciphertext = Hex.parse(input);
    return CipherParams.create({ ciphertext });
  },
};

var CryptoEs = {
  lib: {
    Base,
    WordArray,
    BufferedBlockAlgorithm,
    Hasher,
    Cipher,
    StreamCipher,
    BlockCipherMode,
    BlockCipher,
    CipherParams,
    SerializableCipher,
    PasswordBasedCipher,
  },

  x64: {
    Word: X64Word,
    WordArray: X64WordArray,
  },

  enc: {
    Hex,
    Latin1,
    Utf8,
    Utf16,
    Utf16BE,
    Utf16LE,
    Base64,
  },

  algo: {
    HMAC,
    MD5: MD5Algo,
    SHA1: SHA1Algo,
    SHA224: SHA224Algo,
    SHA256: SHA256Algo,
    SHA384: SHA384Algo,
    SHA512: SHA512Algo,
    SHA3: SHA3Algo,
    RIPEMD160: RIPEMD160Algo,

    PBKDF2: PBKDF2Algo,
    EvpKDF: EvpKDFAlgo,

    AES: AESAlgo,
    DES: DESAlgo,
    TripleDES: TripleDESAlgo,
    Rabbit: RabbitAlgo,
    RabbitLegacy: RabbitLegacyAlgo,
    RC4: RC4Algo,
    RC4Drop: RC4DropAlgo,
  },

  mode: {
    CBC,
    CFB,
    CTR,
    CTRGladman,
    ECB,
    OFB,
  },

  pad: {
    Pkcs7,
    AnsiX923,
    Iso10126,
    Iso97971,
    NoPadding,
    ZeroPadding,
  },

  format: {
    OpenSSL: OpenSSLFormatter,
    Hex: HexFormatter,
  },

  kdf: {
    OpenSSL: OpenSSLKdf,
  },

  MD5,
  HmacMD5,
  SHA1,
  HmacSHA1,
  SHA224,
  HmacSHA224,
  SHA256,
  HmacSHA256,
  SHA384,
  HmacSHA384,
  SHA512,
  HmacSHA512,
  SHA3,
  HmacSHA3,
  RIPEMD160,
  HmacRIPEMD160,

  PBKDF2,
  EvpKDF,

  AES,
  DES,
  TripleDES,
  Rabbit,
  RabbitLegacy,
  RC4,
  RC4Drop,
};

const networks = {
  bitcoin: {
    '1': 'main',
    '2': 'testnet'
  },
  ethereum: {
    '1': 'main',
    '3': 'ropsten',
    '4': 'rinkeby',
    '5': 'goerli',
    '42': 'kovan',
    '100': 'xdai'
  }
};
const DEFAULT_RATE_LIMIT_RULES = {
  points: 150,
  duration: 1
};
const QUEUE_LIMIT = 10000;

function createEmitter() {
  return {
    listeners: {},
    on: function (eventCode, listener) {
      // check if valid eventCode
      switch (eventCode) {
        case 'txSent':
        case 'txPool':
        case 'txConfirmed':
        case 'txSpeedUp':
        case 'txCancel':
        case 'txFailed':
        case 'all':
          break;

        default:
          throw new Error(`${eventCode} is not a valid event code, for a list of valid event codes see: https://github.com/blocknative/sdk`);
      } // check that listener is a function


      if (typeof listener !== 'function') {
        throw new Error('Listener must be a function');
      } // add listener for the eventCode


      this.listeners[eventCode] = listener;
    },
    emit: function (state) {
      if (this.listeners[state.eventCode]) {
        return this.listeners[state.eventCode](state);
      }

      if (this.listeners.all) {
        return this.listeners.all(state);
      }
    }
  };
}

function networkName(blockchain, id) {
  return networks[blockchain][id];
}

function serverEcho(eventCode) {
  switch (eventCode) {
    case 'txRequest':
    case 'nsfFail':
    case 'txRepeat':
    case 'txAwaitingApproval':
    case 'txConfirmReminder':
    case 'txSendFail':
    case 'txError':
    case 'txUnderPriced':
    case 'txSent':
      return true;

    default:
      return false;
  }
}

function last(arr) {
  return arr.reverse()[0];
} // isAddress and isTxid are not meant to perform real validation,
// just needs to work out if it is an address or a transaction id
// the server will do more thorough validation


function isAddress(blockchain, addressOrHash) {
  switch (blockchain) {
    case 'ethereum':
      return addressOrHash.length === 42;

    case 'bitcoin':
      return addressOrHash.length !== 64;

    default:
      return false;
  }
}

function isTxid(blockchain, addressOrHash) {
  switch (blockchain) {
    case 'ethereum':
      return addressOrHash.length === 66;

    case 'bitcoin':
      return addressOrHash.length === 64;

    default:
      return false;
  }
}

function wait(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

function transaction(hash, id) {
  if (this._destroyed) throw new Error('The WebSocket instance has been destroyed, re-initialize to continue making requests.'); // create startTime for transaction

  const startTime = Date.now(); // create emitter for transaction

  const emitter = createEmitter(); // create eventCode for transaction

  const eventCode = 'txSent'; // put in queue

  this._watchedTransactions.push({
    hash,
    emitter
  });

  const transaction = {
    [this._system === 'ethereum' ? 'hash' : 'txid']: hash,
    id: id || hash,
    startTime,
    status: 'sent'
  };
  const newState = { ...transaction,
    eventCode
  }; // logEvent to server

  this._sendMessage({
    eventCode,
    categoryCode: 'activeTransaction',
    transaction
  });

  const transactionObj = {
    details: transaction,
    emitter
  };

  function emitState() {
    const emitterResult = emitter.emit(newState);

    this._transactionHandlers.forEach(handler => handler({
      transaction: newState,
      emitterResult
    }));
  } // emit after delay to allow for listener to be registered


  setTimeout(emitState.bind(this), 5);
  return transactionObj;
}

function account(address) {
  if (this._destroyed) throw new Error('The WebSocket instance has been destroyed, re-initialize to continue making requests.'); // lowercase the address if Ethereum

  address = this._system === 'ethereum' ? address.toLowerCase() : address; // create emitter for transaction

  const emitter = createEmitter(); // create eventCode for transaction

  const eventCode = 'watch';

  const existingAddressWatcher = this._watchedAccounts.find(ac => ac.address === address);

  if (existingAddressWatcher) {
    // add to existing emitters array
    existingAddressWatcher.emitters.push(emitter);
  } else {
    // put in accounts queue
    this._watchedAccounts.push({
      address,
      emitters: [emitter]
    });
  } // logEvent to server


  this._sendMessage({
    eventCode,
    categoryCode: 'accountAddress',
    account: {
      address
    }
  });

  return {
    emitter,
    details: {
      address
    }
  };
}

function event(eventObj) {
  if (this._destroyed) throw new Error('The WebSocket instance has been destroyed, re-initialize to continue making requests.');

  this._sendMessage(eventObj);
}

function unsubscribe(addressOrHash) {
  if (this._destroyed) throw new Error('The WebSocket instance has been destroyed, re-initialize to continue making requests.');
  const address = isAddress(this._system, addressOrHash);
  const txid = isTxid(this._system, addressOrHash); // check if it is an address or a hash

  if (address) {
    const normalizedAddress = this._system === 'ethereum' ? addressOrHash.toLowerCase() : addressOrHash; // remove address from accounts

    this._watchedAccounts = this._watchedAccounts.filter(ac => ac.address !== normalizedAddress); // logEvent to server

    this._sendMessage({
      categoryCode: 'accountAddress',
      eventCode: 'unwatch',
      account: {
        address: normalizedAddress
      }
    });
  } else if (txid) {
    // remove transaction from transactions
    this._watchedTransactions = this._watchedTransactions.filter(tx => tx.hash !== addressOrHash); // logEvent to server

    this._sendMessage({
      categoryCode: 'activeTransaction',
      eventCode: 'unwatch',
      transaction: {
        [this._system === 'ethereum' ? 'hash' : 'txid']: addressOrHash,
        id: addressOrHash,
        status: 'unsubscribed'
      }
    });
  } else {
    throw new Error(`Error trying to unsubscribe ${addressOrHash}: not a valid address or transaction id/hash`);
  }
}

var version = "2.1.5";

function sendMessage(msg) {
  if (this._queuedMessages.length > QUEUE_LIMIT) {
    throw new Error(`Queue limit of ${QUEUE_LIMIT} messages has been reached.`);
  }

  this._queuedMessages.push(createEventLog.bind(this)(msg));

  if (!this._processingQueue) {
    this._processQueue();
  }
}

async function processQueue() {
  this._processingQueue = true;

  if (!this._connected) {
    await waitForConnectionOpen.bind(this)();
  }

  while (this._queuedMessages.length > 0) {
    // small wait to allow response from server to take affect
    await wait(1);

    if (this._waitToRetry !== null) {
      // have been rate limited so wait
      await this._waitToRetry;
      this._waitToRetry = null;
    }

    const msg = this._queuedMessages.shift();

    const delay = this._limitRules.duration / this._limitRules.points * 1000;
    await wait(delay);

    this._socket.send(msg);
  }

  this._processingQueue = false;
  this._limitRules = DEFAULT_RATE_LIMIT_RULES;
}

function handleMessage(msg) {
  const {
    status,
    reason,
    event,
    connectionId,
    retryMs,
    limitRules,
    blockedMsg
  } = JSON.parse(msg.data);

  if (connectionId) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(this._storageKey, connectionId);
    }

    this._connectionId = connectionId;
  } // handle any errors from the server


  if (status === 'error') {
    if (reason.includes('ratelimit')) {
      this._waitToRetry = wait(retryMs);
      this._limitRules = limitRules; // add blocked msg to the front of the queue

      blockedMsg && this._queuedMessages.unshift(blockedMsg);
      return;
    }

    if (reason.includes('not a valid API key')) {
      if (this._onerror) {
        this._onerror({
          message: reason
        });

        return;
      } else {
        throw new Error(reason);
      }
    }

    if (reason.includes('network not supported')) {
      if (this._onerror) {
        this._onerror({
          message: reason
        });

        return;
      } else {
        throw new Error(reason);
      }
    }

    if (reason.includes('maximum allowed amount')) {
      if (this._onerror) {
        this._onerror({
          message: reason
        });

        return;
      } else {
        throw new Error(reason);
      }
    } // handle bitcoin txid error


    if (reason.includes('invalid txid')) {
      const reason = `${event.transaction.txid} is an invalid txid`;

      if (this._onerror) {
        this._onerror({
          message: reason,
          transaction: event.transaction.txid
        });

        return;
      } else {
        throw new Error(reason);
      }
    } // handle ethereum transaction hash error


    if (reason.includes('invalid hash')) {
      const reason = `${event.transaction.hash} is an invalid transaction hash`;

      if (this._onerror) {
        this._onerror({
          message: reason,
          transaction: event.transaction.hash
        });

        return;
      } else {
        throw new Error(reason);
      }
    } // handle general address error


    if (reason.includes('invalid address')) {
      const reason = `${event.account.address} is an invalid address`;

      if (this._onerror) {
        this._onerror({
          message: reason,
          account: event.account.address
        });

        return;
      } else {
        throw new Error(reason);
      }
    } // handle bitcoin specific address error


    if (reason.includes('not a valid Bitcoin')) {
      if (this._onerror) {
        this._onerror({
          message: reason,
          account: event.account.address
        });

        return;
      } else {
        throw new Error(reason);
      }
    } // handle ethereum specific address error


    if (reason.includes('not a valid Ethereum')) {
      if (this._onerror) {
        this._onerror({
          message: reason,
          account: event.account.address
        });

        return;
      } else {
        throw new Error(reason);
      }
    } // throw error that comes back from the server without formatting the message


    if (this._onerror) {
      this._onerror({
        message: reason
      });

      return;
    } else {
      throw new Error(reason);
    }
  }

  if (event && event.transaction) {
    const {
      transaction,
      eventCode,
      contractCall
    } = event; // flatten in to one object

    const newState = this._system === 'ethereum' ? { ...transaction,
      eventCode,
      contractCall
    } : { ...transaction,
      eventCode
    }; // ignore server echo and unsubscribe messages

    if (serverEcho(eventCode) || transaction.status === 'unsubscribed') {
      return;
    } // handle change of hash in speedup and cancel events


    if (eventCode === 'txSpeedUp' || eventCode === 'txCancel') {
      this._watchedTransactions = this._watchedTransactions.map(tx => {
        if (tx.hash === transaction.originalHash) {
          // reassign hash parameter in transaction queue to new hash or txid
          tx.hash = transaction.hash || transaction.txid;
        }

        return tx;
      });
    }

    const watchedAddress = transaction.watchedAddress && this._system === 'ethereum' ? transaction.watchedAddress.toLowerCase() : transaction.watchedAddress;

    if (watchedAddress) {
      const accountObj = this._watchedAccounts.find(ac => ac.address === watchedAddress);

      const emitterResult = accountObj ? last(accountObj.emitters.map(emitter => emitter.emit(newState))) : false;

      this._transactionHandlers.forEach(handler => handler({
        transaction: newState,
        emitterResult
      }));
    } else {
      const transactionObj = this._watchedTransactions.find(tx => tx.hash === transaction.hash || transaction.txid);

      const emitterResult = transactionObj && transactionObj.emitter.emit(newState);

      this._transactionHandlers.forEach(handler => handler({
        transaction: newState,
        emitterResult
      }));
    }
  }
}

function createEventLog(msg) {
  return JSON.stringify({
    timeStamp: new Date(),
    dappId: this._dappId,
    version,
    blockchain: {
      system: this._system,
      network: networkName(this._system, this._networkId) || 'local'
    },
    ...msg
  });
}

function waitForConnectionOpen() {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      if (this._connected) {
        setTimeout(resolve, 100);
        clearInterval(interval);
      }
    });
  });
}

function validateType(options) {
  const {
    name,
    value,
    type,
    optional,
    customValidation
  } = options;

  if (!optional && typeof value === 'undefined') {
    throw new Error(`"${name}" is required`);
  }

  if (typeof value !== 'undefined' && (type === 'array' ? Array.isArray(type) : typeof value !== type)) {
    throw new Error(`"${name}" must be of type: ${type}, received type: ${typeof value} from value: ${value}`);
  }

  if (typeof value !== 'undefined' && customValidation && !customValidation(value)) {
    throw new Error(`"${value}" is not a valid "${name}"`);
  }
}

function validateOptions(options) {
  validateType({
    name: 'sdk options',
    value: options,
    type: 'object'
  });
  const {
    dappId,
    system,
    name,
    networkId,
    transactionHandlers,
    apiUrl,
    ws,
    onopen,
    ondown,
    onreopen,
    onerror,
    onclose,
    ...otherParams
  } = options;
  invalidParams(otherParams, ['dappId', 'system', 'name', 'networkId', 'transactionHandlers', 'apiUrl', 'ws', 'onopen', 'ondown', 'onreopen', 'onerror', 'onclose'], 'Initialization Options');
  validateType({
    name: 'dappId',
    value: dappId,
    type: 'string'
  });
  validateType({
    name: 'system',
    value: system,
    type: 'string',
    optional: true,
    customValidation: validSystem
  });
  validateType({
    name: 'name',
    value: name,
    type: 'string',
    optional: true
  });
  validateType({
    name: 'networkId',
    value: networkId,
    type: 'number'
  });
  validateType({
    name: 'transactionHandler',
    value: transactionHandlers,
    type: 'array',
    optional: true
  });

  if (transactionHandlers) {
    transactionHandlers.forEach(handler => validateType({
      name: 'transactionHandler',
      value: handler,
      type: 'function'
    }));
  }

  validateType({
    name: 'apiUrl',
    value: apiUrl,
    type: 'string',
    optional: true
  });
  validateType({
    name: 'ws',
    value: ws,
    type: 'function',
    optional: true
  });
  validateType({
    name: 'onopen',
    value: onopen,
    type: 'function',
    optional: true
  });
  validateType({
    name: 'ondown',
    value: ondown,
    type: 'function',
    optional: true
  });
  validateType({
    name: 'onreopen',
    value: onreopen,
    type: 'function',
    optional: true
  });
  validateType({
    name: 'onerror',
    value: onerror,
    type: 'function',
    optional: true
  });
  validateType({
    name: 'onclose',
    value: onclose,
    type: 'function',
    optional: true
  });
}

function validSystem(system) {
  return !!networks[system];
}

function invalidParams(params, validParams, functionName) {
  const invalid = Object.keys(params);

  if (invalid.length > 0) {
    throw new Error(`${invalid[0]} is not a valid parameter for ${functionName}, must be one of the following valid parameters: ${validParams.join(', ')}`);
  }
}

const DEFAULT_NAME = 'unknown';
const DEFAULT_SYSTEM = 'ethereum';

class Blocknative {
  constructor(options) {
    validateOptions(options);
    const {
      dappId,
      system = DEFAULT_SYSTEM,
      name = DEFAULT_NAME,
      networkId,
      transactionHandlers = [],
      apiUrl,
      ws,
      onopen,
      ondown,
      onreopen,
      onerror,
      onclose
    } = options;
    const socket = new SturdyWebSocket(apiUrl || 'wss://api.blocknative.com/v0', ws ? {
      wsConstructor: ws
    } : {});
    socket.onopen = onOpen.bind(this, onopen);
    socket.ondown = onDown.bind(this, ondown);
    socket.onreopen = onReopen.bind(this, onreopen);
    socket.onmessage = handleMessage.bind(this);

    socket.onerror = error => onerror && onerror({
      message: 'There was a WebSocket error',
      error
    });

    socket.onclose = () => {
      this._pingTimeout && clearInterval(this._pingTimeout);
      onclose && onclose();
    };

    const storageKey = CryptoEs.SHA1(`${dappId} - ${name}`).toString();
    const storedConnectionId = typeof window !== 'undefined' && window.localStorage.getItem(storageKey);
    this._storageKey = storageKey;
    this._connectionId = storedConnectionId || undefined;
    this._dappId = dappId;
    this._system = system;
    this._networkId = networkId;
    this._transactionHandlers = transactionHandlers;
    this._socket = socket;
    this._connected = false;
    this._sendMessage = sendMessage.bind(this);
    this._watchedTransactions = [];
    this._watchedAccounts = [];
    this._pingTimeout = undefined;
    this._destroyed = false;
    this._onerror = onerror;
    this._queuedMessages = [];
    this._limitRules = DEFAULT_RATE_LIMIT_RULES;
    this._waitToRetry = null;
    this._processingQueue = false;
    this._processQueue = processQueue.bind(this);

    if (this._socket.ws.on) {
      this._heartbeat = () => {
        this._pingTimeout && clearTimeout(this._pingTimeout);
        this._pingTimeout = setTimeout(() => {
          // terminate connection if we haven't heard the server ping after server timeout plus conservative latency delay
          // Sturdy Websocket will handle the new connection logic
          this._socket.ws.terminate();
        }, 30000 + 1000);
      };

      this._socket.ws.on('ping', () => {
        this._heartbeat && this._heartbeat();
      });
    } // public API


    this.transaction = transaction.bind(this);
    this.account = account.bind(this);
    this.event = event.bind(this);
    this.unsubscribe = unsubscribe.bind(this);

    this.destroy = () => {
      this._socket.close();

      this._destroyed = true; // call onclose manually here as SturdyWebSocket doesn't currently work as expected
      // https://github.com/dphilipson/sturdy-websocket/issues/5

      this._socket.onclose();
    };
  }

}

function onOpen(handler) {
  this._connected = true;
  const msg = {
    categoryCode: 'initialize',
    eventCode: 'checkDappId',
    connectionId: this._connectionId
  }; // send this message directly rather than put in queue

  this._socket.send(createEventLog.bind(this)(msg));

  this._heartbeat && this._heartbeat();
  handler && handler();
}

function onDown(handler, closeEvent) {
  this._connected = false;

  if (handler) {
    handler(closeEvent);
  }

  this._pingTimeout && clearTimeout(this._pingTimeout);
}

function onReopen(handler) {
  this._connected = true;
  const msg = {
    categoryCode: 'initialize',
    eventCode: 'checkDappId',
    connectionId: this._connectionId
  };

  this._socket.send(createEventLog.bind(this)(msg)); // re-register all accounts to be watched by server upon
  // re-connection as they don't get transferred over automatically
  // to the new connection like tx hashes do


  this._watchedAccounts.forEach(account => {
    this._sendMessage({
      eventCode: 'accountAddress',
      categoryCode: 'watch',
      account: {
        address: account.address
      }
    });
  });

  if (handler) {
    handler();
  }

  if (this._socket.ws.on) {
    // need to re-register ping event since new connection
    this._socket.ws.on('ping', () => {
      this._heartbeat && this._heartbeat();
    });

    this._heartbeat();
  }
}

var rngBrowser = createCommonjsModule$1(function (module) {
// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}
});

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

var bytesToUuid_1 = bytesToUuid;

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rngBrowser)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid_1(rnds);
}

var v4_1 = v4;

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal$1 == 'object' && commonjsGlobal$1 && commonjsGlobal$1.Object === Object && commonjsGlobal$1;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$1 = objectProto$1.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$1 = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject$1(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax$1(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$1(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike$1(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike$1(value) && objectToString$1.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject$1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject$1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var lodash_debounce = debounce;

function noop() { }
const identity = x => x;
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}

const is_client = typeof window !== 'undefined';
let now$1 = is_client
    ? () => window.performance.now()
    : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
}

function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function stop_propagation(fn) {
    return function (event) {
        event.stopPropagation();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function set_style(node, key, value, important) {
    node.style.setProperty(key, value, important ? 'important' : '');
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}

const active_docs = new Set();
let active = 0;
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
    let hash = 5381;
    let i = str.length;
    while (i--)
        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return hash >>> 0;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = '{\n';
    for (let p = 0; p <= 1; p += step) {
        const t = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = node.ownerDocument;
    active_docs.add(doc);
    const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
    const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
    if (!current_rules[name]) {
        current_rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || '';
    node.style.animation = `${animation ? `${animation}, ` : ``}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
}
function delete_rule(node, name) {
    const previous = (node.style.animation || '').split(', ');
    const next = previous.filter(name
        ? anim => anim.indexOf(name) < 0 // remove specific animation
        : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
        node.style.animation = next.join(', ');
        active -= deleted;
        if (!active)
            clear_rules();
    }
}
function clear_rules() {
    raf(() => {
        if (active)
            return;
        active_docs.forEach(doc => {
            const stylesheet = doc.__svelte_stylesheet;
            let i = stylesheet.cssRules.length;
            while (i--)
                stylesheet.deleteRule(i);
            doc.__svelte_rules = {};
        });
        active_docs.clear();
    });
}

function create_animation(node, from, fn, params) {
    if (!from)
        return noop;
    const to = node.getBoundingClientRect();
    if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom)
        return noop;
    const { delay = 0, duration = 300, easing = identity, 
    // @ts-ignore todo: should this be separated from destructuring? Or start/end added to public api and documentation?
    start: start_time = now$1() + delay, 
    // @ts-ignore todo:
    end = start_time + duration, tick = noop, css } = fn(node, { from, to }, params);
    let running = true;
    let started = false;
    let name;
    function start() {
        if (css) {
            name = create_rule(node, 0, 1, duration, delay, easing, css);
        }
        if (!delay) {
            started = true;
        }
    }
    function stop() {
        if (css)
            delete_rule(node, name);
        running = false;
    }
    loop(now => {
        if (!started && now >= start_time) {
            started = true;
        }
        if (started && now >= end) {
            tick(1, 0);
            stop();
        }
        if (!running) {
            return false;
        }
        if (started) {
            const p = now - start_time;
            const t = 0 + 1 * easing(p / duration);
            tick(t, 1 - t);
        }
        return true;
    });
    start();
    tick(0, 1);
    return stop;
}
function fix_position(node) {
    const style = getComputedStyle(node);
    if (style.position !== 'absolute' && style.position !== 'fixed') {
        const { width, height } = style;
        const a = node.getBoundingClientRect();
        node.style.position = 'absolute';
        node.style.width = width;
        node.style.height = height;
        add_transform(node, a);
    }
}
function add_transform(node, a) {
    const b = node.getBoundingClientRect();
    if (a.left !== b.left || a.top !== b.top) {
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
    }
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error(`Function called outside component initialization`);
    return current_component;
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}

let promise;
function wait$1() {
    if (!promise) {
        promise = Promise.resolve();
        promise.then(() => {
            promise = null;
        });
    }
    return promise;
}
function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}
const null_transition = { duration: 0 };
function create_in_transition(node, fn, params) {
    let config = fn(node, params);
    let running = false;
    let animation_name;
    let task;
    let uid = 0;
    function cleanup() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
        tick(0, 1);
        const start_time = now$1() + delay;
        const end_time = start_time + duration;
        if (task)
            task.abort();
        running = true;
        add_render_callback(() => dispatch(node, true, 'start'));
        task = loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(1, 0);
                    dispatch(node, true, 'end');
                    cleanup();
                    return running = false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(t, 1 - t);
                }
            }
            return running;
        });
    }
    let started = false;
    return {
        start() {
            if (started)
                return;
            delete_rule(node);
            if (is_function(config)) {
                config = config();
                wait$1().then(go);
            }
            else {
                go();
            }
        },
        invalidate() {
            started = false;
        },
        end() {
            if (running) {
                cleanup();
                running = false;
            }
        }
    };
}
function create_out_transition(node, fn, params) {
    let config = fn(node, params);
    let running = true;
    let animation_name;
    const group = outros;
    group.r += 1;
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
        const start_time = now$1() + delay;
        const end_time = start_time + duration;
        add_render_callback(() => dispatch(node, false, 'start'));
        loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(0, 1);
                    dispatch(node, false, 'end');
                    if (!--group.r) {
                        // this will result in `end()` being called,
                        // so we don't need to clean up here
                        run_all(group.c);
                    }
                    return false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(1 - t, t);
                }
            }
            return running;
        });
    }
    if (is_function(config)) {
        wait$1().then(() => {
            // @ts-ignore
            config = config();
            go();
        });
    }
    else {
        go();
    }
    return {
        end(reset) {
            if (reset && config.tick) {
                config.tick(1, 0);
            }
            if (running) {
                if (animation_name)
                    delete_rule(node, animation_name);
                running = false;
            }
        }
    };
}
function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
        lookup.delete(block.key);
    });
}
function fix_and_outro_and_destroy_block(block, lookup) {
    block.f();
    outro_and_destroy_block(block, lookup);
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
        old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        }
        else if (dynamic) {
            block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        }
        else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        }
        else if (!lookup.has(new_key) || will_move.has(new_key)) {
            insert(new_block);
        }
        else if (did_move.has(old_key)) {
            o--;
        }
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        }
        else {
            will_move.add(old_key);
            o--;
        }
    }
    while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
            destroy(old_block, lookup);
    }
    while (n)
        insert(new_blocks[n - 1]);
    return new_blocks;
}
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    // onMount happens before the initial afterUpdate
    add_render_callback(() => {
        const new_on_destroy = on_mount.map(run).filter(is_function);
        if (on_destroy) {
            on_destroy.push(...new_on_destroy);
        }
        else {
            // Edge case - component was destroyed immediately,
            // most likely as a result of a binding initialising
            run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const prop_values = options.props || {};
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : []),
        // everything else
        callbacks: blank_object(),
        dirty
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, prop_values, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if ($$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor);
        flush();
    }
    set_current_component(parent_component);
}
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set() {
        // overridden by instance, if it has props
    }
}

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

// gutted from https://github.com/Polymer/observe-js/blob/master/src/observe.js
function noop$1 () {}
function detectEval () {
  // Don't test for eval if we're running in a Chrome App environment.
  // We check for APIs set that only exist in a Chrome App context.
  if (typeof chrome !== 'undefined' && chrome.app && chrome.app.runtime) {
    return false
  }

  // Firefox OS Apps do not allow eval. This feature detection is very hacky
  // but even if some other platform adds support for this function this code
  // will continue to work.
  if (typeof navigator != 'undefined' && navigator.getDeviceStorage) {
    return false
  }

  try {
    var f = new Function('', 'return true;');
    return f()
  } catch (ex) {
    return false
  }
}

var hasEval = detectEval();

function isIndex$1 (s) {
  return +s === s >>> 0 && s !== ''
}

function isObject$2 (obj) {
  return obj === Object(obj)
}

var createObject = ('__proto__' in {}) ?
  function (obj) {
    return obj
  } :
  function (obj) {
    var proto = obj.__proto__;
    if (!proto)
      return obj
    var newObject = Object.create(proto);
    Object.getOwnPropertyNames(obj).forEach(function (name) {
      Object.defineProperty(newObject, name,
        Object.getOwnPropertyDescriptor(obj, name));
    });
    return newObject
  };

function parsePath (path) {
  var keys = [];
  var index = -1;
  var c, newChar, key, type, transition, action, typeMap, mode = 'beforePath';

  var actions = {
    push: function () {
      if (key === undefined)
        return

      keys.push(key);
      key = undefined;
    },

    append: function () {
      if (key === undefined)
        key = newChar;
      else
        key += newChar;
    }
  };

  function maybeUnescapeQuote () {
    if (index >= path.length)
      return

    var nextChar = path[index + 1];
    if ((mode == 'inSingleQuote' && nextChar == "'") ||
      (mode == 'inDoubleQuote' && nextChar == '"')) {
      index++;
      newChar = nextChar;
      actions.append();
      return true
    }
  }

  while (mode) {
    index++;
    c = path[index];

    if (c == '\\' && maybeUnescapeQuote())
      continue

    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap['else'] || 'error';

    if (transition == 'error')
      return // parse error

    mode = transition[0];
    action = actions[transition[1]] || noop$1;
    newChar = transition[2] === undefined ? c : transition[2];
    action();

    if (mode === 'afterPath') {
      return keys
    }
  }

  return // parse error
}

var identStart = '[\$_a-zA-Z]';
var identPart = '[\$_a-zA-Z0-9]';
var identRegExp = new RegExp('^' + identStart + '+' + identPart + '*' + '$');

function isIdent (s) {
  return identRegExp.test(s)
}

var constructorIsPrivate = {};

function Path (parts, privateToken) {
  if (privateToken !== constructorIsPrivate)
    throw Error('Use Path.get to retrieve path objects')

  for (var i = 0; i < parts.length; i++) {
    this.push(String(parts[i]));
  }

  if (hasEval && this.length) {
    this.getValueFrom = this.compiledGetValueFromFn();
  }
}

var pathCache = {};

function getPath (pathString) {
  if (pathString instanceof Path)
    return pathString

  if (pathString == null || pathString.length == 0)
    pathString = '';

  if (typeof pathString != 'string') {
    if (isIndex$1(pathString.length)) {
      // Constructed with array-like (pre-parsed) keys
      return new Path(pathString, constructorIsPrivate)
    }

    pathString = String(pathString);
  }

  var path = pathCache[pathString];
  if (path)
    return path

  var parts = parsePath(pathString);
  if (!parts)
    return invalidPath

  var path = new Path(parts, constructorIsPrivate);
  pathCache[pathString] = path;
  return path
}

Path.get = getPath;

function formatAccessor (key) {
  if (isIndex$1(key)) {
    return '[' + key + ']'
  } else {
    return '["' + key.replace(/"/g, '\\"') + '"]'
  }
}

Path.prototype = createObject({
  __proto__: [],
  valid: true,

  toString: function () {
    var pathString = '';
    for (var i = 0; i < this.length; i++) {
      var key = this[i];
      if (isIdent(key)) {
        pathString += i ? '.' + key : key;
      } else {
        pathString += formatAccessor(key);
      }
    }

    return pathString
  },

  getValueFrom: function (obj, directObserver) {
    for (var i = 0; i < this.length; i++) {
      if (obj == null)
        return
      obj = obj[this[i]];
    }
    return obj
  },

  iterateObjects: function (obj, observe) {
    for (var i = 0; i < this.length; i++) {
      if (i)
        obj = obj[this[i - 1]];
      if (!isObject$2(obj))
        return
      observe(obj, this[i]);
    }
  },

  compiledGetValueFromFn: function () {
    var str = '';
    var pathString = 'obj';
    str += 'if (obj != null';
    var i = 0;
    var key;
    for (; i < (this.length - 1); i++) {
      key = this[i];
      pathString += isIdent(key) ? '.' + key : formatAccessor(key);
      str += ' &&\n     ' + pathString + ' != null';
    }
    str += ')\n';

    var key = this[i];
    pathString += isIdent(key) ? '.' + key : formatAccessor(key);

    str += '  return ' + pathString + ';\nelse\n  return undefined;';
    return new Function('obj', str)
  },

  setValueFrom: function (obj, value) {
    if (!this.length)
      return false

    for (var i = 0; i < this.length - 1; i++) {
      if (!isObject$2(obj))
        return false
      obj = obj[this[i]];
    }

    if (!isObject$2(obj))
      return false

    obj[this[i]] = value;
    return true
  }
});

function getPathCharType (char) {
  if (char === undefined)
    return 'eof'

  var code = char.charCodeAt(0);

  switch (code) {
    case 0x5B: // [
    case 0x5D: // ]
    case 0x2E: // .
    case 0x22: // "
    case 0x27: // '
    case 0x30: // 0
      return char

    case 0x5F: // _
    case 0x24: // $
      return 'ident'

    case 0x20: // Space
    case 0x09: // Tab
    case 0x0A: // Newline
    case 0x0D: // Return
    case 0xA0: // No-break space
    case 0xFEFF: // Byte Order Mark
    case 0x2028: // Line Separator
    case 0x2029: // Paragraph Separator
      return 'ws'
  }

  // a-z, A-Z
  if ((0x61 <= code && code <= 0x7A) || (0x41 <= code && code <= 0x5A))
    return 'ident'

  // 1-9
  if (0x31 <= code && code <= 0x39)
    return 'number'

  return 'else'
}

var pathStateMachine = {
  'beforePath': {
    'ws': ['beforePath'],
    'ident': ['inIdent', 'append'],
    '[': ['beforeElement'],
    'eof': ['afterPath']
  },

  'inPath': {
    'ws': ['inPath'],
    '.': ['beforeIdent'],
    '[': ['beforeElement'],
    'eof': ['afterPath']
  },

  'beforeIdent': {
    'ws': ['beforeIdent'],
    'ident': ['inIdent', 'append']
  },

  'inIdent': {
    'ident': ['inIdent', 'append'],
    '0': ['inIdent', 'append'],
    'number': ['inIdent', 'append'],
    'ws': ['inPath', 'push'],
    '.': ['beforeIdent', 'push'],
    '[': ['beforeElement', 'push'],
    'eof': ['afterPath', 'push']
  },

  'beforeElement': {
    'ws': ['beforeElement'],
    '0': ['afterZero', 'append'],
    'number': ['inIndex', 'append'],
    "'": ['inSingleQuote', 'append', ''],
    '"': ['inDoubleQuote', 'append', '']
  },

  'afterZero': {
    'ws': ['afterElement', 'push'],
    ']': ['inPath', 'push']
  },

  'inIndex': {
    '0': ['inIndex', 'append'],
    'number': ['inIndex', 'append'],
    'ws': ['afterElement'],
    ']': ['inPath', 'push']
  },

  'inSingleQuote': {
    "'": ['afterElement'],
    'eof': ['error'],
    'else': ['inSingleQuote', 'append']
  },

  'inDoubleQuote': {
    '"': ['afterElement'],
    'eof': ['error'],
    'else': ['inDoubleQuote', 'append']
  },

  'afterElement': {
    'ws': ['afterElement'],
    ']': ['inPath', 'push']
  }
};

var invalidPath = new Path('', constructorIsPrivate);
invalidPath.valid = false;
invalidPath.getValueFrom = invalidPath.setValueFrom = function () {};

var path = Path;

/**
 *
 * @param {Object} o
 * @param {String} path
 * @returns {*}
 */
var objectResolvePath = function (o, path$1) {
  if (typeof path$1 !== 'string') {
    throw new TypeError('path must be a string')
  }
  if (typeof o !== 'object') {
    throw new TypeError('object must be passed')
  }
  var pathObj = path.get(path$1);
  if (!pathObj.valid) {
    throw new Error('path is not a valid object path')
  }
  return pathObj.getValueFrom(o)
};

var TYPE;
(function (TYPE) {
    /**
     * Raw text
     */
    TYPE[TYPE["literal"] = 0] = "literal";
    /**
     * Variable w/o any format, e.g `var` in `this is a {var}`
     */
    TYPE[TYPE["argument"] = 1] = "argument";
    /**
     * Variable w/ number format
     */
    TYPE[TYPE["number"] = 2] = "number";
    /**
     * Variable w/ date format
     */
    TYPE[TYPE["date"] = 3] = "date";
    /**
     * Variable w/ time format
     */
    TYPE[TYPE["time"] = 4] = "time";
    /**
     * Variable w/ select format
     */
    TYPE[TYPE["select"] = 5] = "select";
    /**
     * Variable w/ plural format
     */
    TYPE[TYPE["plural"] = 6] = "plural";
    /**
     * Only possible within plural argument.
     * This is the `#` symbol that will be substituted with the count.
     */
    TYPE[TYPE["pound"] = 7] = "pound";
})(TYPE || (TYPE = {}));
/**
 * Type Guards
 */
function isLiteralElement(el) {
    return el.type === TYPE.literal;
}
function isArgumentElement(el) {
    return el.type === TYPE.argument;
}
function isNumberElement(el) {
    return el.type === TYPE.number;
}
function isDateElement(el) {
    return el.type === TYPE.date;
}
function isTimeElement(el) {
    return el.type === TYPE.time;
}
function isSelectElement(el) {
    return el.type === TYPE.select;
}
function isPluralElement(el) {
    return el.type === TYPE.plural;
}
function isPoundElement(el) {
    return el.type === TYPE.pound;
}
function isNumberSkeleton(el) {
    return !!(el && typeof el === 'object' && el.type === 0 /* number */);
}
function isDateTimeSkeleton(el) {
    return !!(el && typeof el === 'object' && el.type === 1 /* dateTime */);
}

// tslint:disable:only-arrow-functions
// tslint:disable:object-literal-shorthand
// tslint:disable:trailing-comma
// tslint:disable:object-literal-sort-keys
// tslint:disable:one-variable-per-declaration
// tslint:disable:max-line-length
// tslint:disable:no-consecutive-blank-lines
// tslint:disable:align
var __extends =  (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign =  function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var SyntaxError = /** @class */ (function (_super) {
    __extends(SyntaxError, _super);
    function SyntaxError(message, expected, found, location) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.expected = expected;
        _this.found = found;
        _this.location = location;
        _this.name = "SyntaxError";
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(_this, SyntaxError);
        }
        return _this;
    }
    SyntaxError.buildMessage = function (expected, found) {
        function hex(ch) {
            return ch.charCodeAt(0).toString(16).toUpperCase();
        }
        function literalEscape(s) {
            return s
                .replace(/\\/g, "\\\\")
                .replace(/"/g, "\\\"")
                .replace(/\0/g, "\\0")
                .replace(/\t/g, "\\t")
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/[\x00-\x0F]/g, function (ch) { return "\\x0" + hex(ch); })
                .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) { return "\\x" + hex(ch); });
        }
        function classEscape(s) {
            return s
                .replace(/\\/g, "\\\\")
                .replace(/\]/g, "\\]")
                .replace(/\^/g, "\\^")
                .replace(/-/g, "\\-")
                .replace(/\0/g, "\\0")
                .replace(/\t/g, "\\t")
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/[\x00-\x0F]/g, function (ch) { return "\\x0" + hex(ch); })
                .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) { return "\\x" + hex(ch); });
        }
        function describeExpectation(expectation) {
            switch (expectation.type) {
                case "literal":
                    return "\"" + literalEscape(expectation.text) + "\"";
                case "class":
                    var escapedParts = expectation.parts.map(function (part) {
                        return Array.isArray(part)
                            ? classEscape(part[0]) + "-" + classEscape(part[1])
                            : classEscape(part);
                    });
                    return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
                case "any":
                    return "any character";
                case "end":
                    return "end of input";
                case "other":
                    return expectation.description;
            }
        }
        function describeExpected(expected1) {
            var descriptions = expected1.map(describeExpectation);
            var i;
            var j;
            descriptions.sort();
            if (descriptions.length > 0) {
                for (i = 1, j = 1; i < descriptions.length; i++) {
                    if (descriptions[i - 1] !== descriptions[i]) {
                        descriptions[j] = descriptions[i];
                        j++;
                    }
                }
                descriptions.length = j;
            }
            switch (descriptions.length) {
                case 1:
                    return descriptions[0];
                case 2:
                    return descriptions[0] + " or " + descriptions[1];
                default:
                    return descriptions.slice(0, -1).join(", ")
                        + ", or "
                        + descriptions[descriptions.length - 1];
            }
        }
        function describeFound(found1) {
            return found1 ? "\"" + literalEscape(found1) + "\"" : "end of input";
        }
        return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
    };
    return SyntaxError;
}(Error));
function peg$parse(input, options) {
    options = options !== undefined ? options : {};
    var peg$FAILED = {};
    var peg$startRuleFunctions = { start: peg$parsestart };
    var peg$startRuleFunction = peg$parsestart;
    var peg$c0 = function (parts) {
        return parts.join('');
    };
    var peg$c1 = function (messageText) {
        return __assign({ type: TYPE.literal, value: messageText }, insertLocation());
    };
    var peg$c2 = "#";
    var peg$c3 = peg$literalExpectation("#", false);
    var peg$c4 = function () {
        return __assign({ type: TYPE.pound }, insertLocation());
    };
    var peg$c5 = peg$otherExpectation("argumentElement");
    var peg$c6 = "{";
    var peg$c7 = peg$literalExpectation("{", false);
    var peg$c8 = "}";
    var peg$c9 = peg$literalExpectation("}", false);
    var peg$c10 = function (value) {
        return __assign({ type: TYPE.argument, value: value }, insertLocation());
    };
    var peg$c11 = peg$otherExpectation("numberSkeletonId");
    var peg$c12 = /^['\/{}]/;
    var peg$c13 = peg$classExpectation(["'", "/", "{", "}"], false, false);
    var peg$c14 = peg$anyExpectation();
    var peg$c15 = peg$otherExpectation("numberSkeletonTokenOption");
    var peg$c16 = "/";
    var peg$c17 = peg$literalExpectation("/", false);
    var peg$c18 = function (option) { return option; };
    var peg$c19 = peg$otherExpectation("numberSkeletonToken");
    var peg$c20 = function (stem, options) {
        return { stem: stem, options: options };
    };
    var peg$c21 = function (tokens) {
        return __assign({ type: 0 /* number */, tokens: tokens }, insertLocation());
    };
    var peg$c22 = "::";
    var peg$c23 = peg$literalExpectation("::", false);
    var peg$c24 = function (skeleton) { return skeleton; };
    var peg$c25 = function () { messageCtx.push('numberArgStyle'); return true; };
    var peg$c26 = function (style) {
        messageCtx.pop();
        return style.replace(/\s*$/, '');
    };
    var peg$c27 = ",";
    var peg$c28 = peg$literalExpectation(",", false);
    var peg$c29 = "number";
    var peg$c30 = peg$literalExpectation("number", false);
    var peg$c31 = function (value, type, style) {
        return __assign({ type: type === 'number' ? TYPE.number : type === 'date' ? TYPE.date : TYPE.time, style: style && style[2], value: value }, insertLocation());
    };
    var peg$c32 = "'";
    var peg$c33 = peg$literalExpectation("'", false);
    var peg$c34 = /^[^']/;
    var peg$c35 = peg$classExpectation(["'"], true, false);
    var peg$c36 = /^[^a-zA-Z'{}]/;
    var peg$c37 = peg$classExpectation([["a", "z"], ["A", "Z"], "'", "{", "}"], true, false);
    var peg$c38 = /^[a-zA-Z]/;
    var peg$c39 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false);
    var peg$c40 = function (pattern) {
        return __assign({ type: 1 /* dateTime */, pattern: pattern }, insertLocation());
    };
    var peg$c41 = function () { messageCtx.push('dateOrTimeArgStyle'); return true; };
    var peg$c42 = "date";
    var peg$c43 = peg$literalExpectation("date", false);
    var peg$c44 = "time";
    var peg$c45 = peg$literalExpectation("time", false);
    var peg$c46 = "plural";
    var peg$c47 = peg$literalExpectation("plural", false);
    var peg$c48 = "selectordinal";
    var peg$c49 = peg$literalExpectation("selectordinal", false);
    var peg$c50 = "offset:";
    var peg$c51 = peg$literalExpectation("offset:", false);
    var peg$c52 = function (value, pluralType, offset, options) {
        return __assign({ type: TYPE.plural, pluralType: pluralType === 'plural' ? 'cardinal' : 'ordinal', value: value, offset: offset ? offset[2] : 0, options: options.reduce(function (all, _a) {
                var id = _a.id, value = _a.value, optionLocation = _a.location;
                if (id in all) {
                    error("Duplicate option \"" + id + "\" in plural element: \"" + text() + "\"", location());
                }
                all[id] = {
                    value: value,
                    location: optionLocation
                };
                return all;
            }, {}) }, insertLocation());
    };
    var peg$c53 = "select";
    var peg$c54 = peg$literalExpectation("select", false);
    var peg$c55 = function (value, options) {
        return __assign({ type: TYPE.select, value: value, options: options.reduce(function (all, _a) {
                var id = _a.id, value = _a.value, optionLocation = _a.location;
                if (id in all) {
                    error("Duplicate option \"" + id + "\" in select element: \"" + text() + "\"", location());
                }
                all[id] = {
                    value: value,
                    location: optionLocation
                };
                return all;
            }, {}) }, insertLocation());
    };
    var peg$c56 = "=";
    var peg$c57 = peg$literalExpectation("=", false);
    var peg$c58 = function (id) { messageCtx.push('select'); return true; };
    var peg$c59 = function (id, value) {
        messageCtx.pop();
        return __assign({ id: id,
            value: value }, insertLocation());
    };
    var peg$c60 = function (id) { messageCtx.push('plural'); return true; };
    var peg$c61 = function (id, value) {
        messageCtx.pop();
        return __assign({ id: id,
            value: value }, insertLocation());
    };
    var peg$c62 = peg$otherExpectation("whitespace");
    var peg$c63 = /^[\t-\r \x85\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
    var peg$c64 = peg$classExpectation([["\t", "\r"], " ", "\x85", "\xA0", "\u1680", ["\u2000", "\u200A"], "\u2028", "\u2029", "\u202F", "\u205F", "\u3000"], false, false);
    var peg$c65 = peg$otherExpectation("syntax pattern");
    var peg$c66 = /^[!-\/:-@[-\^`{-~\xA1-\xA7\xA9\xAB\xAC\xAE\xB0\xB1\xB6\xBB\xBF\xD7\xF7\u2010-\u2027\u2030-\u203E\u2041-\u2053\u2055-\u205E\u2190-\u245F\u2500-\u2775\u2794-\u2BFF\u2E00-\u2E7F\u3001-\u3003\u3008-\u3020\u3030\uFD3E\uFD3F\uFE45\uFE46]/;
    var peg$c67 = peg$classExpectation([["!", "/"], [":", "@"], ["[", "^"], "`", ["{", "~"], ["\xA1", "\xA7"], "\xA9", "\xAB", "\xAC", "\xAE", "\xB0", "\xB1", "\xB6", "\xBB", "\xBF", "\xD7", "\xF7", ["\u2010", "\u2027"], ["\u2030", "\u203E"], ["\u2041", "\u2053"], ["\u2055", "\u205E"], ["\u2190", "\u245F"], ["\u2500", "\u2775"], ["\u2794", "\u2BFF"], ["\u2E00", "\u2E7F"], ["\u3001", "\u3003"], ["\u3008", "\u3020"], "\u3030", "\uFD3E", "\uFD3F", "\uFE45", "\uFE46"], false, false);
    var peg$c68 = peg$otherExpectation("optional whitespace");
    var peg$c69 = peg$otherExpectation("number");
    var peg$c70 = "-";
    var peg$c71 = peg$literalExpectation("-", false);
    var peg$c72 = function (negative, num) {
        return num
            ? negative
                ? -num
                : num
            : 0;
    };
    var peg$c74 = peg$otherExpectation("double apostrophes");
    var peg$c75 = "''";
    var peg$c76 = peg$literalExpectation("''", false);
    var peg$c77 = function () { return "'"; };
    var peg$c78 = function (escapedChar, quotedChars) {
        return escapedChar + quotedChars.replace("''", "'");
    };
    var peg$c79 = function (x) {
        return (x !== '{' &&
            !(isInPluralOption() && x === '#') &&
            !(isNestedMessageText() && x === '}'));
    };
    var peg$c80 = "\n";
    var peg$c81 = peg$literalExpectation("\n", false);
    var peg$c82 = function (x) {
        return x === '{' || x === '}' || (isInPluralOption() && x === '#');
    };
    var peg$c83 = peg$otherExpectation("argNameOrNumber");
    var peg$c84 = peg$otherExpectation("argNumber");
    var peg$c85 = "0";
    var peg$c86 = peg$literalExpectation("0", false);
    var peg$c87 = function () { return 0; };
    var peg$c88 = /^[1-9]/;
    var peg$c89 = peg$classExpectation([["1", "9"]], false, false);
    var peg$c90 = /^[0-9]/;
    var peg$c91 = peg$classExpectation([["0", "9"]], false, false);
    var peg$c92 = function (digits) {
        return parseInt(digits.join(''), 10);
    };
    var peg$c93 = peg$otherExpectation("argName");
    var peg$currPos = 0;
    var peg$savedPos = 0;
    var peg$posDetailsCache = [{ line: 1, column: 1 }];
    var peg$maxFailPos = 0;
    var peg$maxFailExpected = [];
    var peg$silentFails = 0;
    var peg$result;
    if (options.startRule !== undefined) {
        if (!(options.startRule in peg$startRuleFunctions)) {
            throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
        }
        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }
    function text() {
        return input.substring(peg$savedPos, peg$currPos);
    }
    function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
    }
    function error(message, location1) {
        location1 = location1 !== undefined
            ? location1
            : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildSimpleError(message, location1);
    }
    function peg$literalExpectation(text1, ignoreCase) {
        return { type: "literal", text: text1, ignoreCase: ignoreCase };
    }
    function peg$classExpectation(parts, inverted, ignoreCase) {
        return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
    }
    function peg$anyExpectation() {
        return { type: "any" };
    }
    function peg$endExpectation() {
        return { type: "end" };
    }
    function peg$otherExpectation(description) {
        return { type: "other", description: description };
    }
    function peg$computePosDetails(pos) {
        var details = peg$posDetailsCache[pos];
        var p;
        if (details) {
            return details;
        }
        else {
            p = pos - 1;
            while (!peg$posDetailsCache[p]) {
                p--;
            }
            details = peg$posDetailsCache[p];
            details = {
                line: details.line,
                column: details.column
            };
            while (p < pos) {
                if (input.charCodeAt(p) === 10) {
                    details.line++;
                    details.column = 1;
                }
                else {
                    details.column++;
                }
                p++;
            }
            peg$posDetailsCache[pos] = details;
            return details;
        }
    }
    function peg$computeLocation(startPos, endPos) {
        var startPosDetails = peg$computePosDetails(startPos);
        var endPosDetails = peg$computePosDetails(endPos);
        return {
            start: {
                offset: startPos,
                line: startPosDetails.line,
                column: startPosDetails.column
            },
            end: {
                offset: endPos,
                line: endPosDetails.line,
                column: endPosDetails.column
            }
        };
    }
    function peg$fail(expected1) {
        if (peg$currPos < peg$maxFailPos) {
            return;
        }
        if (peg$currPos > peg$maxFailPos) {
            peg$maxFailPos = peg$currPos;
            peg$maxFailExpected = [];
        }
        peg$maxFailExpected.push(expected1);
    }
    function peg$buildSimpleError(message, location1) {
        return new SyntaxError(message, [], "", location1);
    }
    function peg$buildStructuredError(expected1, found, location1) {
        return new SyntaxError(SyntaxError.buildMessage(expected1, found), expected1, found, location1);
    }
    function peg$parsestart() {
        var s0;
        s0 = peg$parsemessage();
        return s0;
    }
    function peg$parsemessage() {
        var s0, s1;
        s0 = [];
        s1 = peg$parsemessageElement();
        while (s1 !== peg$FAILED) {
            s0.push(s1);
            s1 = peg$parsemessageElement();
        }
        return s0;
    }
    function peg$parsemessageElement() {
        var s0;
        s0 = peg$parseliteralElement();
        if (s0 === peg$FAILED) {
            s0 = peg$parseargumentElement();
            if (s0 === peg$FAILED) {
                s0 = peg$parsesimpleFormatElement();
                if (s0 === peg$FAILED) {
                    s0 = peg$parsepluralElement();
                    if (s0 === peg$FAILED) {
                        s0 = peg$parseselectElement();
                        if (s0 === peg$FAILED) {
                            s0 = peg$parsepoundElement();
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parsemessageText() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsedoubleApostrophes();
        if (s2 === peg$FAILED) {
            s2 = peg$parsequotedString();
            if (s2 === peg$FAILED) {
                s2 = peg$parseunquotedString();
            }
        }
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                s2 = peg$parsedoubleApostrophes();
                if (s2 === peg$FAILED) {
                    s2 = peg$parsequotedString();
                    if (s2 === peg$FAILED) {
                        s2 = peg$parseunquotedString();
                    }
                }
            }
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c0(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parseliteralElement() {
        var s0, s1;
        s0 = peg$currPos;
        s1 = peg$parsemessageText();
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parsepoundElement() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 35) {
            s1 = peg$c2;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c3);
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c4();
        }
        s0 = s1;
        return s0;
    }
    function peg$parseargumentElement() {
        var s0, s1, s2, s3, s4, s5;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c6;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c7);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseargNameOrNumber();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 125) {
                            s5 = peg$c8;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c9);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c10(s3);
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c5);
            }
        }
        return s0;
    }
    function peg$parsenumberSkeletonId() {
        var s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$parsewhiteSpace();
        if (s4 === peg$FAILED) {
            if (peg$c12.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c13);
                }
            }
        }
        peg$silentFails--;
        if (s4 === peg$FAILED) {
            s3 = undefined;
        }
        else {
            peg$currPos = s3;
            s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
            if (input.length > peg$currPos) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c14);
                }
            }
            if (s4 !== peg$FAILED) {
                s3 = [s3, s4];
                s2 = s3;
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s2;
            s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                s2 = peg$currPos;
                s3 = peg$currPos;
                peg$silentFails++;
                s4 = peg$parsewhiteSpace();
                if (s4 === peg$FAILED) {
                    if (peg$c12.test(input.charAt(peg$currPos))) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c13);
                        }
                    }
                }
                peg$silentFails--;
                if (s4 === peg$FAILED) {
                    s3 = undefined;
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 !== peg$FAILED) {
                    if (input.length > peg$currPos) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c14);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        s3 = [s3, s4];
                        s2 = s3;
                    }
                    else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        }
        else {
            s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c11);
            }
        }
        return s0;
    }
    function peg$parsenumberSkeletonTokenOption() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 47) {
            s1 = peg$c16;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c17);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsenumberSkeletonId();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c18(s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c15);
            }
        }
        return s0;
    }
    function peg$parsenumberSkeletonToken() {
        var s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
            s2 = peg$parsenumberSkeletonId();
            if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$parsenumberSkeletonTokenOption();
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    s4 = peg$parsenumberSkeletonTokenOption();
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c20(s2, s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c19);
            }
        }
        return s0;
    }
    function peg$parsenumberSkeleton() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsenumberSkeletonToken();
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                s2 = peg$parsenumberSkeletonToken();
            }
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c21(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parsenumberArgStyle() {
        var s0, s1, s2;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c22) {
            s1 = peg$c22;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c23);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsenumberSkeleton();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c24(s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            peg$savedPos = peg$currPos;
            s1 = peg$c25();
            if (s1) {
                s1 = undefined;
            }
            else {
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                s2 = peg$parsemessageText();
                if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c26(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        return s0;
    }
    function peg$parsenumberFormatElement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c6;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c7);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseargNameOrNumber();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 44) {
                            s5 = peg$c27;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c28);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse_();
                            if (s6 !== peg$FAILED) {
                                if (input.substr(peg$currPos, 6) === peg$c29) {
                                    s7 = peg$c29;
                                    peg$currPos += 6;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c30);
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parse_();
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$currPos;
                                        if (input.charCodeAt(peg$currPos) === 44) {
                                            s10 = peg$c27;
                                            peg$currPos++;
                                        }
                                        else {
                                            s10 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c28);
                                            }
                                        }
                                        if (s10 !== peg$FAILED) {
                                            s11 = peg$parse_();
                                            if (s11 !== peg$FAILED) {
                                                s12 = peg$parsenumberArgStyle();
                                                if (s12 !== peg$FAILED) {
                                                    s10 = [s10, s11, s12];
                                                    s9 = s10;
                                                }
                                                else {
                                                    peg$currPos = s9;
                                                    s9 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s9;
                                                s9 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s9;
                                            s9 = peg$FAILED;
                                        }
                                        if (s9 === peg$FAILED) {
                                            s9 = null;
                                        }
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parse_();
                                            if (s10 !== peg$FAILED) {
                                                if (input.charCodeAt(peg$currPos) === 125) {
                                                    s11 = peg$c8;
                                                    peg$currPos++;
                                                }
                                                else {
                                                    s11 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                        peg$fail(peg$c9);
                                                    }
                                                }
                                                if (s11 !== peg$FAILED) {
                                                    peg$savedPos = s0;
                                                    s1 = peg$c31(s3, s7, s9);
                                                    s0 = s1;
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsedateTimeSkeletonLiteral() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 39) {
            s1 = peg$c32;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c33);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parsedoubleApostrophes();
            if (s3 === peg$FAILED) {
                if (peg$c34.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c35);
                    }
                }
            }
            if (s3 !== peg$FAILED) {
                while (s3 !== peg$FAILED) {
                    s2.push(s3);
                    s3 = peg$parsedoubleApostrophes();
                    if (s3 === peg$FAILED) {
                        if (peg$c34.test(input.charAt(peg$currPos))) {
                            s3 = input.charAt(peg$currPos);
                            peg$currPos++;
                        }
                        else {
                            s3 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c35);
                            }
                        }
                    }
                }
            }
            else {
                s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 39) {
                    s3 = peg$c32;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c33);
                    }
                }
                if (s3 !== peg$FAILED) {
                    s1 = [s1, s2, s3];
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = [];
            s1 = peg$parsedoubleApostrophes();
            if (s1 === peg$FAILED) {
                if (peg$c36.test(input.charAt(peg$currPos))) {
                    s1 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c37);
                    }
                }
            }
            if (s1 !== peg$FAILED) {
                while (s1 !== peg$FAILED) {
                    s0.push(s1);
                    s1 = peg$parsedoubleApostrophes();
                    if (s1 === peg$FAILED) {
                        if (peg$c36.test(input.charAt(peg$currPos))) {
                            s1 = input.charAt(peg$currPos);
                            peg$currPos++;
                        }
                        else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c37);
                            }
                        }
                    }
                }
            }
            else {
                s0 = peg$FAILED;
            }
        }
        return s0;
    }
    function peg$parsedateTimeSkeletonPattern() {
        var s0, s1;
        s0 = [];
        if (peg$c38.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c39);
            }
        }
        if (s1 !== peg$FAILED) {
            while (s1 !== peg$FAILED) {
                s0.push(s1);
                if (peg$c38.test(input.charAt(peg$currPos))) {
                    s1 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c39);
                    }
                }
            }
        }
        else {
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsedateTimeSkeleton() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = [];
        s3 = peg$parsedateTimeSkeletonLiteral();
        if (s3 === peg$FAILED) {
            s3 = peg$parsedateTimeSkeletonPattern();
        }
        if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$parsedateTimeSkeletonLiteral();
                if (s3 === peg$FAILED) {
                    s3 = peg$parsedateTimeSkeletonPattern();
                }
            }
        }
        else {
            s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
            s1 = input.substring(s1, peg$currPos);
        }
        else {
            s1 = s2;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c40(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parsedateOrTimeArgStyle() {
        var s0, s1, s2;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c22) {
            s1 = peg$c22;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c23);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsedateTimeSkeleton();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c24(s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            peg$savedPos = peg$currPos;
            s1 = peg$c41();
            if (s1) {
                s1 = undefined;
            }
            else {
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                s2 = peg$parsemessageText();
                if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c26(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        return s0;
    }
    function peg$parsedateOrTimeFormatElement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c6;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c7);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseargNameOrNumber();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 44) {
                            s5 = peg$c27;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c28);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse_();
                            if (s6 !== peg$FAILED) {
                                if (input.substr(peg$currPos, 4) === peg$c42) {
                                    s7 = peg$c42;
                                    peg$currPos += 4;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c43);
                                    }
                                }
                                if (s7 === peg$FAILED) {
                                    if (input.substr(peg$currPos, 4) === peg$c44) {
                                        s7 = peg$c44;
                                        peg$currPos += 4;
                                    }
                                    else {
                                        s7 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c45);
                                        }
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parse_();
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$currPos;
                                        if (input.charCodeAt(peg$currPos) === 44) {
                                            s10 = peg$c27;
                                            peg$currPos++;
                                        }
                                        else {
                                            s10 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c28);
                                            }
                                        }
                                        if (s10 !== peg$FAILED) {
                                            s11 = peg$parse_();
                                            if (s11 !== peg$FAILED) {
                                                s12 = peg$parsedateOrTimeArgStyle();
                                                if (s12 !== peg$FAILED) {
                                                    s10 = [s10, s11, s12];
                                                    s9 = s10;
                                                }
                                                else {
                                                    peg$currPos = s9;
                                                    s9 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s9;
                                                s9 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s9;
                                            s9 = peg$FAILED;
                                        }
                                        if (s9 === peg$FAILED) {
                                            s9 = null;
                                        }
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parse_();
                                            if (s10 !== peg$FAILED) {
                                                if (input.charCodeAt(peg$currPos) === 125) {
                                                    s11 = peg$c8;
                                                    peg$currPos++;
                                                }
                                                else {
                                                    s11 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                        peg$fail(peg$c9);
                                                    }
                                                }
                                                if (s11 !== peg$FAILED) {
                                                    peg$savedPos = s0;
                                                    s1 = peg$c31(s3, s7, s9);
                                                    s0 = s1;
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsesimpleFormatElement() {
        var s0;
        s0 = peg$parsenumberFormatElement();
        if (s0 === peg$FAILED) {
            s0 = peg$parsedateOrTimeFormatElement();
        }
        return s0;
    }
    function peg$parsepluralElement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c6;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c7);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseargNameOrNumber();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 44) {
                            s5 = peg$c27;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c28);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse_();
                            if (s6 !== peg$FAILED) {
                                if (input.substr(peg$currPos, 6) === peg$c46) {
                                    s7 = peg$c46;
                                    peg$currPos += 6;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c47);
                                    }
                                }
                                if (s7 === peg$FAILED) {
                                    if (input.substr(peg$currPos, 13) === peg$c48) {
                                        s7 = peg$c48;
                                        peg$currPos += 13;
                                    }
                                    else {
                                        s7 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c49);
                                        }
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parse_();
                                    if (s8 !== peg$FAILED) {
                                        if (input.charCodeAt(peg$currPos) === 44) {
                                            s9 = peg$c27;
                                            peg$currPos++;
                                        }
                                        else {
                                            s9 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c28);
                                            }
                                        }
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parse_();
                                            if (s10 !== peg$FAILED) {
                                                s11 = peg$currPos;
                                                if (input.substr(peg$currPos, 7) === peg$c50) {
                                                    s12 = peg$c50;
                                                    peg$currPos += 7;
                                                }
                                                else {
                                                    s12 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                        peg$fail(peg$c51);
                                                    }
                                                }
                                                if (s12 !== peg$FAILED) {
                                                    s13 = peg$parse_();
                                                    if (s13 !== peg$FAILED) {
                                                        s14 = peg$parsenumber();
                                                        if (s14 !== peg$FAILED) {
                                                            s12 = [s12, s13, s14];
                                                            s11 = s12;
                                                        }
                                                        else {
                                                            peg$currPos = s11;
                                                            s11 = peg$FAILED;
                                                        }
                                                    }
                                                    else {
                                                        peg$currPos = s11;
                                                        s11 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s11;
                                                    s11 = peg$FAILED;
                                                }
                                                if (s11 === peg$FAILED) {
                                                    s11 = null;
                                                }
                                                if (s11 !== peg$FAILED) {
                                                    s12 = peg$parse_();
                                                    if (s12 !== peg$FAILED) {
                                                        s13 = [];
                                                        s14 = peg$parsepluralOption();
                                                        if (s14 !== peg$FAILED) {
                                                            while (s14 !== peg$FAILED) {
                                                                s13.push(s14);
                                                                s14 = peg$parsepluralOption();
                                                            }
                                                        }
                                                        else {
                                                            s13 = peg$FAILED;
                                                        }
                                                        if (s13 !== peg$FAILED) {
                                                            s14 = peg$parse_();
                                                            if (s14 !== peg$FAILED) {
                                                                if (input.charCodeAt(peg$currPos) === 125) {
                                                                    s15 = peg$c8;
                                                                    peg$currPos++;
                                                                }
                                                                else {
                                                                    s15 = peg$FAILED;
                                                                    if (peg$silentFails === 0) {
                                                                        peg$fail(peg$c9);
                                                                    }
                                                                }
                                                                if (s15 !== peg$FAILED) {
                                                                    peg$savedPos = s0;
                                                                    s1 = peg$c52(s3, s7, s11, s13);
                                                                    s0 = s1;
                                                                }
                                                                else {
                                                                    peg$currPos = s0;
                                                                    s0 = peg$FAILED;
                                                                }
                                                            }
                                                            else {
                                                                peg$currPos = s0;
                                                                s0 = peg$FAILED;
                                                            }
                                                        }
                                                        else {
                                                            peg$currPos = s0;
                                                            s0 = peg$FAILED;
                                                        }
                                                    }
                                                    else {
                                                        peg$currPos = s0;
                                                        s0 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseselectElement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c6;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c7);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseargNameOrNumber();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 44) {
                            s5 = peg$c27;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c28);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse_();
                            if (s6 !== peg$FAILED) {
                                if (input.substr(peg$currPos, 6) === peg$c53) {
                                    s7 = peg$c53;
                                    peg$currPos += 6;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c54);
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parse_();
                                    if (s8 !== peg$FAILED) {
                                        if (input.charCodeAt(peg$currPos) === 44) {
                                            s9 = peg$c27;
                                            peg$currPos++;
                                        }
                                        else {
                                            s9 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c28);
                                            }
                                        }
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parse_();
                                            if (s10 !== peg$FAILED) {
                                                s11 = [];
                                                s12 = peg$parseselectOption();
                                                if (s12 !== peg$FAILED) {
                                                    while (s12 !== peg$FAILED) {
                                                        s11.push(s12);
                                                        s12 = peg$parseselectOption();
                                                    }
                                                }
                                                else {
                                                    s11 = peg$FAILED;
                                                }
                                                if (s11 !== peg$FAILED) {
                                                    s12 = peg$parse_();
                                                    if (s12 !== peg$FAILED) {
                                                        if (input.charCodeAt(peg$currPos) === 125) {
                                                            s13 = peg$c8;
                                                            peg$currPos++;
                                                        }
                                                        else {
                                                            s13 = peg$FAILED;
                                                            if (peg$silentFails === 0) {
                                                                peg$fail(peg$c9);
                                                            }
                                                        }
                                                        if (s13 !== peg$FAILED) {
                                                            peg$savedPos = s0;
                                                            s1 = peg$c55(s3, s11);
                                                            s0 = s1;
                                                        }
                                                        else {
                                                            peg$currPos = s0;
                                                            s0 = peg$FAILED;
                                                        }
                                                    }
                                                    else {
                                                        peg$currPos = s0;
                                                        s0 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsepluralRuleSelectValue() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 61) {
            s2 = peg$c56;
            peg$currPos++;
        }
        else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c57);
            }
        }
        if (s2 !== peg$FAILED) {
            s3 = peg$parsenumber();
            if (s3 !== peg$FAILED) {
                s2 = [s2, s3];
                s1 = s2;
            }
            else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        }
        else {
            s0 = s1;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$parseargName();
        }
        return s0;
    }
    function peg$parseselectOption() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
            s2 = peg$parseargName();
            if (s2 !== peg$FAILED) {
                s3 = peg$parse_();
                if (s3 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 123) {
                        s4 = peg$c6;
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c7);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = peg$currPos;
                        s5 = peg$c58();
                        if (s5) {
                            s5 = undefined;
                        }
                        else {
                            s5 = peg$FAILED;
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsemessage();
                            if (s6 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 125) {
                                    s7 = peg$c8;
                                    peg$currPos++;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c9);
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c59(s2, s6);
                                    s0 = s1;
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsepluralOption() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
            s2 = peg$parsepluralRuleSelectValue();
            if (s2 !== peg$FAILED) {
                s3 = peg$parse_();
                if (s3 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 123) {
                        s4 = peg$c6;
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c7);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = peg$currPos;
                        s5 = peg$c60();
                        if (s5) {
                            s5 = undefined;
                        }
                        else {
                            s5 = peg$FAILED;
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsemessage();
                            if (s6 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 125) {
                                    s7 = peg$c8;
                                    peg$currPos++;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c9);
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c61(s2, s6);
                                    s0 = s1;
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsewhiteSpace() {
        var s0;
        peg$silentFails++;
        if (peg$c63.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c64);
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            if (peg$silentFails === 0) {
                peg$fail(peg$c62);
            }
        }
        return s0;
    }
    function peg$parsepatternSyntax() {
        var s0;
        peg$silentFails++;
        if (peg$c66.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c67);
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            if (peg$silentFails === 0) {
                peg$fail(peg$c65);
            }
        }
        return s0;
    }
    function peg$parse_() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsewhiteSpace();
        while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsewhiteSpace();
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        }
        else {
            s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c68);
            }
        }
        return s0;
    }
    function peg$parsenumber() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 45) {
            s1 = peg$c70;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c71);
            }
        }
        if (s1 === peg$FAILED) {
            s1 = null;
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parseargNumber();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c72(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c69);
            }
        }
        return s0;
    }
    function peg$parsedoubleApostrophes() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c75) {
            s1 = peg$c75;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c76);
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c77();
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c74);
            }
        }
        return s0;
    }
    function peg$parsequotedString() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 39) {
            s1 = peg$c32;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c33);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parseescapedChar();
            if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                s4 = [];
                if (input.substr(peg$currPos, 2) === peg$c75) {
                    s5 = peg$c75;
                    peg$currPos += 2;
                }
                else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c76);
                    }
                }
                if (s5 === peg$FAILED) {
                    if (peg$c34.test(input.charAt(peg$currPos))) {
                        s5 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c35);
                        }
                    }
                }
                while (s5 !== peg$FAILED) {
                    s4.push(s5);
                    if (input.substr(peg$currPos, 2) === peg$c75) {
                        s5 = peg$c75;
                        peg$currPos += 2;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c76);
                        }
                    }
                    if (s5 === peg$FAILED) {
                        if (peg$c34.test(input.charAt(peg$currPos))) {
                            s5 = input.charAt(peg$currPos);
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c35);
                            }
                        }
                    }
                }
                if (s4 !== peg$FAILED) {
                    s3 = input.substring(s3, peg$currPos);
                }
                else {
                    s3 = s4;
                }
                if (s3 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 39) {
                        s4 = peg$c32;
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c33);
                        }
                    }
                    if (s4 === peg$FAILED) {
                        s4 = null;
                    }
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c78(s2, s3);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseunquotedString() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;
        if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c14);
            }
        }
        if (s2 !== peg$FAILED) {
            peg$savedPos = peg$currPos;
            s3 = peg$c79(s2);
            if (s3) {
                s3 = undefined;
            }
            else {
                s3 = peg$FAILED;
            }
            if (s3 !== peg$FAILED) {
                s2 = [s2, s3];
                s1 = s2;
            }
            else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        if (s1 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 10) {
                s1 = peg$c80;
                peg$currPos++;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c81);
                }
            }
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        }
        else {
            s0 = s1;
        }
        return s0;
    }
    function peg$parseescapedChar() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;
        if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c14);
            }
        }
        if (s2 !== peg$FAILED) {
            peg$savedPos = peg$currPos;
            s3 = peg$c82(s2);
            if (s3) {
                s3 = undefined;
            }
            else {
                s3 = peg$FAILED;
            }
            if (s3 !== peg$FAILED) {
                s2 = [s2, s3];
                s1 = s2;
            }
            else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        }
        else {
            s0 = s1;
        }
        return s0;
    }
    function peg$parseargNameOrNumber() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseargNumber();
        if (s1 === peg$FAILED) {
            s1 = peg$parseargName();
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        }
        else {
            s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c83);
            }
        }
        return s0;
    }
    function peg$parseargNumber() {
        var s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 48) {
            s1 = peg$c85;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c86);
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c87();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$currPos;
            if (peg$c88.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c89);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = [];
                if (peg$c90.test(input.charAt(peg$currPos))) {
                    s4 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c91);
                    }
                }
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    if (peg$c90.test(input.charAt(peg$currPos))) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c91);
                        }
                    }
                }
                if (s3 !== peg$FAILED) {
                    s2 = [s2, s3];
                    s1 = s2;
                }
                else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c92(s1);
            }
            s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c84);
            }
        }
        return s0;
    }
    function peg$parseargName() {
        var s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$parsewhiteSpace();
        if (s4 === peg$FAILED) {
            s4 = peg$parsepatternSyntax();
        }
        peg$silentFails--;
        if (s4 === peg$FAILED) {
            s3 = undefined;
        }
        else {
            peg$currPos = s3;
            s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
            if (input.length > peg$currPos) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c14);
                }
            }
            if (s4 !== peg$FAILED) {
                s3 = [s3, s4];
                s2 = s3;
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s2;
            s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                s2 = peg$currPos;
                s3 = peg$currPos;
                peg$silentFails++;
                s4 = peg$parsewhiteSpace();
                if (s4 === peg$FAILED) {
                    s4 = peg$parsepatternSyntax();
                }
                peg$silentFails--;
                if (s4 === peg$FAILED) {
                    s3 = undefined;
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 !== peg$FAILED) {
                    if (input.length > peg$currPos) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c14);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        s3 = [s3, s4];
                        s2 = s3;
                    }
                    else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
        }
        else {
            s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c93);
            }
        }
        return s0;
    }
    var messageCtx = ['root'];
    function isNestedMessageText() {
        return messageCtx.length > 1;
    }
    function isInPluralOption() {
        return messageCtx[messageCtx.length - 1] === 'plural';
    }
    function insertLocation() {
        return options && options.captureLocation ? {
            location: location()
        } : {};
    }
    peg$result = peg$startRuleFunction();
    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
    }
    else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
            peg$fail(peg$endExpectation());
        }
        throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length
            ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
            : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
}
var pegParse = peg$parse;

var __spreadArrays =  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var PLURAL_HASHTAG_REGEX = /(^|[^\\])#/g;
/**
 * Whether to convert `#` in plural rule options
 * to `{var, number}`
 * @param el AST Element
 * @param pluralStack current plural stack
 */
function normalizeHashtagInPlural(els) {
    els.forEach(function (el) {
        // If we're encountering a plural el
        if (!isPluralElement(el) && !isSelectElement(el)) {
            return;
        }
        // Go down the options and search for # in any literal element
        Object.keys(el.options).forEach(function (id) {
            var _a;
            var opt = el.options[id];
            // If we got a match, we have to split this
            // and inject a NumberElement in the middle
            var matchingLiteralElIndex = -1;
            var literalEl = undefined;
            for (var i = 0; i < opt.value.length; i++) {
                var el_1 = opt.value[i];
                if (isLiteralElement(el_1) && PLURAL_HASHTAG_REGEX.test(el_1.value)) {
                    matchingLiteralElIndex = i;
                    literalEl = el_1;
                    break;
                }
            }
            if (literalEl) {
                var newValue = literalEl.value.replace(PLURAL_HASHTAG_REGEX, "$1{" + el.value + ", number}");
                var newEls = pegParse(newValue);
                (_a = opt.value).splice.apply(_a, __spreadArrays([matchingLiteralElIndex, 1], newEls));
            }
            normalizeHashtagInPlural(opt.value);
        });
    });
}

var __assign$1 =  function () {
    __assign$1 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
};
/**
 * https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * Credit: https://github.com/caridy/intl-datetimeformat-pattern/blob/master/index.js
 * with some tweaks
 */
var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
/**
 * Parse Date time skeleton into Intl.DateTimeFormatOptions
 * Ref: https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * @public
 * @param skeleton skeleton string
 */
function parseDateTimeSkeleton(skeleton) {
    var result = {};
    skeleton.replace(DATE_TIME_REGEX, function (match) {
        var len = match.length;
        switch (match[0]) {
            // Era
            case 'G':
                result.era = len === 4 ? 'long' : len === 5 ? 'narrow' : 'short';
                break;
            // Year
            case 'y':
                result.year = len === 2 ? '2-digit' : 'numeric';
                break;
            case 'Y':
            case 'u':
            case 'U':
            case 'r':
                throw new RangeError('`Y/u/U/r` (year) patterns are not supported, use `y` instead');
            // Quarter
            case 'q':
            case 'Q':
                throw new RangeError('`q/Q` (quarter) patterns are not supported');
            // Month
            case 'M':
            case 'L':
                result.month = ['numeric', '2-digit', 'short', 'long', 'narrow'][len - 1];
                break;
            // Week
            case 'w':
            case 'W':
                throw new RangeError('`w/W` (week) patterns are not supported');
            case 'd':
                result.day = ['numeric', '2-digit'][len - 1];
                break;
            case 'D':
            case 'F':
            case 'g':
                throw new RangeError('`D/F/g` (day) patterns are not supported, use `d` instead');
            // Weekday
            case 'E':
                result.weekday = len === 4 ? 'short' : len === 5 ? 'narrow' : 'short';
                break;
            case 'e':
                if (len < 4) {
                    throw new RangeError('`e..eee` (weekday) patterns are not supported');
                }
                result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
                break;
            case 'c':
                if (len < 4) {
                    throw new RangeError('`c..ccc` (weekday) patterns are not supported');
                }
                result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
                break;
            // Period
            case 'a': // AM, PM
                result.hour12 = true;
                break;
            case 'b': // am, pm, noon, midnight
            case 'B': // flexible day periods
                throw new RangeError('`b/B` (period) patterns are not supported, use `a` instead');
            // Hour
            case 'h':
                result.hourCycle = 'h12';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'H':
                result.hourCycle = 'h23';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'K':
                result.hourCycle = 'h11';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'k':
                result.hourCycle = 'h24';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'j':
            case 'J':
            case 'C':
                throw new RangeError('`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead');
            // Minute
            case 'm':
                result.minute = ['numeric', '2-digit'][len - 1];
                break;
            // Second
            case 's':
                result.second = ['numeric', '2-digit'][len - 1];
                break;
            case 'S':
            case 'A':
                throw new RangeError('`S/A` (second) pattenrs are not supported, use `s` instead');
            // Zone
            case 'z': // 1..3, 4: specific non-location format
                result.timeZoneName = len < 4 ? 'short' : 'long';
                break;
            case 'Z': // 1..3, 4, 5: The ISO8601 varios formats
            case 'O': // 1, 4: miliseconds in day short, long
            case 'v': // 1, 4: generic non-location format
            case 'V': // 1, 2, 3, 4: time zone ID or city
            case 'X': // 1, 2, 3, 4: The ISO8601 varios formats
            case 'x': // 1, 2, 3, 4: The ISO8601 varios formats
                throw new RangeError('`Z/O/v/V/X/x` (timeZone) pattenrs are not supported, use `z` instead');
        }
        return '';
    });
    return result;
}
function icuUnitToEcma(unit) {
    return unit.replace(/^(.*?)-/, '');
}
var FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\+|#+)?)?$/g;
var SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?$/g;
function parseSignificantPrecision(str) {
    var result = {};
    str.replace(SIGNIFICANT_PRECISION_REGEX, function (_, g1, g2) {
        // @@@ case
        if (typeof g2 !== 'string') {
            result.minimumSignificantDigits = g1.length;
            result.maximumSignificantDigits = g1.length;
        }
        // @@@+ case
        else if (g2 === '+') {
            result.minimumSignificantDigits = g1.length;
        }
        // .### case
        else if (g1[0] === '#') {
            result.maximumSignificantDigits = g1.length;
        }
        // .@@## or .@@@ case
        else {
            result.minimumSignificantDigits = g1.length;
            result.maximumSignificantDigits =
                g1.length + (typeof g2 === 'string' ? g2.length : 0);
        }
        return '';
    });
    return result;
}
function parseSign(str) {
    switch (str) {
        case 'sign-auto':
            return {
                signDisplay: 'auto',
            };
        case 'sign-accounting':
            return {
                currencySign: 'accounting',
            };
        case 'sign-always':
            return {
                signDisplay: 'always',
            };
        case 'sign-accounting-always':
            return {
                signDisplay: 'always',
                currencySign: 'accounting',
            };
        case 'sign-except-zero':
            return {
                signDisplay: 'exceptZero',
            };
        case 'sign-accounting-except-zero':
            return {
                signDisplay: 'exceptZero',
                currencySign: 'accounting',
            };
        case 'sign-never':
            return {
                signDisplay: 'never',
            };
    }
}
function parseNotationOptions(opt) {
    var result = {};
    var signOpts = parseSign(opt);
    if (signOpts) {
        return signOpts;
    }
    return result;
}
/**
 * https://github.com/unicode-org/icu/blob/master/docs/userguide/format_parse/numbers/skeletons.md#skeleton-stems-and-options
 */
function convertNumberSkeletonToNumberFormatOptions(tokens) {
    var result = {};
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        switch (token.stem) {
            case 'percent':
                result.style = 'percent';
                continue;
            case 'currency':
                result.style = 'currency';
                result.currency = token.options[0];
                continue;
            case 'group-off':
                result.useGrouping = false;
                continue;
            case 'precision-integer':
                result.maximumFractionDigits = 0;
                continue;
            case 'measure-unit':
                result.style = 'unit';
                result.unit = icuUnitToEcma(token.options[0]);
                continue;
            case 'compact-short':
                result.notation = 'compact';
                result.compactDisplay = 'short';
                continue;
            case 'compact-long':
                result.notation = 'compact';
                result.compactDisplay = 'long';
                continue;
            case 'scientific':
                result = __assign$1(__assign$1(__assign$1({}, result), { notation: 'scientific' }), token.options.reduce(function (all, opt) { return (__assign$1(__assign$1({}, all), parseNotationOptions(opt))); }, {}));
                continue;
            case 'engineering':
                result = __assign$1(__assign$1(__assign$1({}, result), { notation: 'engineering' }), token.options.reduce(function (all, opt) { return (__assign$1(__assign$1({}, all), parseNotationOptions(opt))); }, {}));
                continue;
            case 'notation-simple':
                result.notation = 'standard';
                continue;
            // https://github.com/unicode-org/icu/blob/master/icu4c/source/i18n/unicode/unumberformatter.h
            case 'unit-width-narrow':
                result.currencyDisplay = 'narrowSymbol';
                result.unitDisplay = 'narrow';
                continue;
            case 'unit-width-short':
                result.currencyDisplay = 'code';
                result.unitDisplay = 'short';
                continue;
            case 'unit-width-full-name':
                result.currencyDisplay = 'name';
                result.unitDisplay = 'long';
                continue;
            case 'unit-width-iso-code':
                result.currencyDisplay = 'symbol';
                continue;
        }
        // Precision
        // https://github.com/unicode-org/icu/blob/master/docs/userguide/format_parse/numbers/skeletons.md#fraction-precision
        if (FRACTION_PRECISION_REGEX.test(token.stem)) {
            if (token.options.length > 1) {
                throw new RangeError('Fraction-precision stems only accept a single optional option');
            }
            token.stem.replace(FRACTION_PRECISION_REGEX, function (match, g1, g2) {
                // precision-integer case
                if (match === '.') {
                    result.maximumFractionDigits = 0;
                }
                // .000+ case
                else if (g2 === '+') {
                    result.minimumFractionDigits = g2.length;
                }
                // .### case
                else if (g1[0] === '#') {
                    result.maximumFractionDigits = g1.length;
                }
                // .00## or .000 case
                else {
                    result.minimumFractionDigits = g1.length;
                    result.maximumFractionDigits =
                        g1.length + (typeof g2 === 'string' ? g2.length : 0);
                }
                return '';
            });
            if (token.options.length) {
                result = __assign$1(__assign$1({}, result), parseSignificantPrecision(token.options[0]));
            }
            continue;
        }
        if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
            result = __assign$1(__assign$1({}, result), parseSignificantPrecision(token.stem));
            continue;
        }
        var signOpts = parseSign(token.stem);
        if (signOpts) {
            result = __assign$1(__assign$1({}, result), signOpts);
        }
    }
    return result;
}

function parse(input, opts) {
    var els = pegParse(input, opts);
    if (!opts || opts.normalizeHashtagInPlural !== false) {
        normalizeHashtagInPlural(els);
    }
    return els;
}

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
var __spreadArrays$1 =  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// -- Utilities ----------------------------------------------------------------
function getCacheId(inputs) {
    return JSON.stringify(inputs.map(function (input) {
        return input && typeof input === 'object' ? orderedProps(input) : input;
    }));
}
function orderedProps(obj) {
    return Object.keys(obj)
        .sort()
        .map(function (k) {
        var _a;
        return (_a = {}, _a[k] = obj[k], _a);
    });
}
var memoizeFormatConstructor = function (FormatConstructor, cache) {
    if (cache === void 0) { cache = {}; }
    return function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var cacheId = getCacheId(args);
        var format = cacheId && cache[cacheId];
        if (!format) {
            format = new ((_a = FormatConstructor).bind.apply(_a, __spreadArrays$1([void 0], args)))();
            if (cacheId) {
                cache[cacheId] = format;
            }
        }
        return format;
    };
};

var __extends$1 =  (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays$2 =  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var FormatError = /** @class */ (function (_super) {
    __extends$1(FormatError, _super);
    function FormatError(msg, variableId) {
        var _this = _super.call(this, msg) || this;
        _this.variableId = variableId;
        return _this;
    }
    return FormatError;
}(Error));
function mergeLiteral(parts) {
    if (parts.length < 2) {
        return parts;
    }
    return parts.reduce(function (all, part) {
        var lastPart = all[all.length - 1];
        if (!lastPart ||
            lastPart.type !== 0 /* literal */ ||
            part.type !== 0 /* literal */) {
            all.push(part);
        }
        else {
            lastPart.value += part.value;
        }
        return all;
    }, []);
}
// TODO(skeleton): add skeleton support
function formatToParts(els, locales, formatters, formats, values, currentPluralValue, 
// For debugging
originalMessage) {
    // Hot path for straight simple msg translations
    if (els.length === 1 && isLiteralElement(els[0])) {
        return [
            {
                type: 0 /* literal */,
                value: els[0].value,
            },
        ];
    }
    var result = [];
    for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
        var el = els_1[_i];
        // Exit early for string parts.
        if (isLiteralElement(el)) {
            result.push({
                type: 0 /* literal */,
                value: el.value,
            });
            continue;
        }
        // TODO: should this part be literal type?
        // Replace `#` in plural rules with the actual numeric value.
        if (isPoundElement(el)) {
            if (typeof currentPluralValue === 'number') {
                result.push({
                    type: 0 /* literal */,
                    value: formatters.getNumberFormat(locales).format(currentPluralValue),
                });
            }
            continue;
        }
        var varName = el.value;
        // Enforce that all required values are provided by the caller.
        if (!(values && varName in values)) {
            throw new FormatError("The intl string context variable \"" + varName + "\" was not provided to the string \"" + originalMessage + "\"");
        }
        var value = values[varName];
        if (isArgumentElement(el)) {
            if (!value || typeof value === 'string' || typeof value === 'number') {
                value =
                    typeof value === 'string' || typeof value === 'number'
                        ? String(value)
                        : '';
            }
            result.push({
                type: 1 /* argument */,
                value: value,
            });
            continue;
        }
        // Recursively format plural and select parts' option — which can be a
        // nested pattern structure. The choosing of the option to use is
        // abstracted-by and delegated-to the part helper object.
        if (isDateElement(el)) {
            var style = typeof el.style === 'string' ? formats.date[el.style] : undefined;
            result.push({
                type: 0 /* literal */,
                value: formatters
                    .getDateTimeFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if (isTimeElement(el)) {
            var style = typeof el.style === 'string'
                ? formats.time[el.style]
                : isDateTimeSkeleton(el.style)
                    ? parseDateTimeSkeleton(el.style.pattern)
                    : undefined;
            result.push({
                type: 0 /* literal */,
                value: formatters
                    .getDateTimeFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if (isNumberElement(el)) {
            var style = typeof el.style === 'string'
                ? formats.number[el.style]
                : isNumberSkeleton(el.style)
                    ? convertNumberSkeletonToNumberFormatOptions(el.style.tokens)
                    : undefined;
            result.push({
                type: 0 /* literal */,
                value: formatters
                    .getNumberFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if (isSelectElement(el)) {
            var opt = el.options[value] || el.options.other;
            if (!opt) {
                throw new RangeError("Invalid values for \"" + el.value + "\": \"" + value + "\". Options are \"" + Object.keys(el.options).join('", "') + "\"");
            }
            result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
            continue;
        }
        if (isPluralElement(el)) {
            var opt = el.options["=" + value];
            if (!opt) {
                if (!Intl.PluralRules) {
                    throw new FormatError("Intl.PluralRules is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-pluralrules\"\n");
                }
                var rule = formatters
                    .getPluralRules(locales, { type: el.pluralType })
                    .select(value - (el.offset || 0));
                opt = el.options[rule] || el.options.other;
            }
            if (!opt) {
                throw new RangeError("Invalid values for \"" + el.value + "\": \"" + value + "\". Options are \"" + Object.keys(el.options).join('", "') + "\"");
            }
            result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values, value - (el.offset || 0)));
            continue;
        }
    }
    return mergeLiteral(result);
}
function formatToString(els, locales, formatters, formats, values, 
// For debugging
originalMessage) {
    var parts = formatToParts(els, locales, formatters, formats, values, undefined, originalMessage);
    // Hot path for straight simple msg translations
    if (parts.length === 1) {
        return parts[0].value;
    }
    return parts.reduce(function (all, part) { return (all += part.value); }, '');
}
// Singleton
var domParser;
var TOKEN_DELIMITER = '@@';
var TOKEN_REGEX = /@@(\d+_\d+)@@/g;
var counter = 0;
function generateId() {
    return Date.now() + "_" + ++counter;
}
function restoreRichPlaceholderMessage(text, objectParts) {
    return text
        .split(TOKEN_REGEX)
        .filter(Boolean)
        .map(function (c) { return (objectParts[c] != null ? objectParts[c] : c); })
        .reduce(function (all, c) {
        if (!all.length) {
            all.push(c);
        }
        else if (typeof c === 'string' &&
            typeof all[all.length - 1] === 'string') {
            all[all.length - 1] += c;
        }
        else {
            all.push(c);
        }
        return all;
    }, []);
}
/**
 * Not exhaustive, just for sanity check
 */
var SIMPLE_XML_REGEX = /(<([0-9a-zA-Z-_]*?)>(.*?)<\/([0-9a-zA-Z-_]*?)>)|(<[0-9a-zA-Z-_]*?\/>)/;
var TEMPLATE_ID = Date.now() + '@@';
var VOID_ELEMENTS = [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
];
function formatHTMLElement(el, objectParts, values) {
    var tagName = el.tagName;
    var outerHTML = el.outerHTML, textContent = el.textContent, childNodes = el.childNodes;
    // Regular text
    if (!tagName) {
        return restoreRichPlaceholderMessage(textContent || '', objectParts);
    }
    tagName = tagName.toLowerCase();
    var isVoidElement = ~VOID_ELEMENTS.indexOf(tagName);
    var formatFnOrValue = values[tagName];
    if (formatFnOrValue && isVoidElement) {
        throw new FormatError(tagName + " is a self-closing tag and can not be used, please use another tag name.");
    }
    if (!childNodes.length) {
        return [outerHTML];
    }
    var chunks = Array.prototype.slice.call(childNodes).reduce(function (all, child) {
        return all.concat(formatHTMLElement(child, objectParts, values));
    }, []);
    // Legacy HTML
    if (!formatFnOrValue) {
        return __spreadArrays$2(["<" + tagName + ">"], chunks, ["</" + tagName + ">"]);
    }
    // HTML Tag replacement
    if (typeof formatFnOrValue === 'function') {
        return [formatFnOrValue.apply(void 0, chunks)];
    }
    return [formatFnOrValue];
}
function formatHTMLMessage(els, locales, formatters, formats, values, 
// For debugging
originalMessage) {
    var parts = formatToParts(els, locales, formatters, formats, values, undefined, originalMessage);
    var objectParts = {};
    var formattedMessage = parts.reduce(function (all, part) {
        if (part.type === 0 /* literal */) {
            return (all += part.value);
        }
        var id = generateId();
        objectParts[id] = part.value;
        return (all += "" + TOKEN_DELIMITER + id + TOKEN_DELIMITER);
    }, '');
    // Not designed to filter out aggressively
    if (!SIMPLE_XML_REGEX.test(formattedMessage)) {
        return restoreRichPlaceholderMessage(formattedMessage, objectParts);
    }
    if (!values) {
        throw new FormatError('Message has placeholders but no values was given');
    }
    if (typeof DOMParser === 'undefined') {
        throw new FormatError('Cannot format XML message without DOMParser');
    }
    if (!domParser) {
        domParser = new DOMParser();
    }
    var content = domParser
        .parseFromString("<formatted-message id=\"" + TEMPLATE_ID + "\">" + formattedMessage + "</formatted-message>", 'text/html')
        .getElementById(TEMPLATE_ID);
    if (!content) {
        throw new FormatError("Malformed HTML message " + formattedMessage);
    }
    var tagsToFormat = Object.keys(values).filter(function (varName) { return !!content.getElementsByTagName(varName).length; });
    // No tags to format
    if (!tagsToFormat.length) {
        return restoreRichPlaceholderMessage(formattedMessage, objectParts);
    }
    var caseSensitiveTags = tagsToFormat.filter(function (tagName) { return tagName !== tagName.toLowerCase(); });
    if (caseSensitiveTags.length) {
        throw new FormatError("HTML tag must be lowercased but the following tags are not: " + caseSensitiveTags.join(', '));
    }
    // We're doing this since top node is `<formatted-message/>` which does not have a formatter
    return Array.prototype.slice
        .call(content.childNodes)
        .reduce(function (all, child) { return all.concat(formatHTMLElement(child, objectParts, values)); }, []);
}

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
var __assign$2 =  function () {
    __assign$2 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$2.apply(this, arguments);
};
// -- MessageFormat --------------------------------------------------------
function mergeConfig(c1, c2) {
    if (!c2) {
        return c1;
    }
    return __assign$2(__assign$2(__assign$2({}, (c1 || {})), (c2 || {})), Object.keys(c1).reduce(function (all, k) {
        all[k] = __assign$2(__assign$2({}, c1[k]), (c2[k] || {}));
        return all;
    }, {}));
}
function mergeConfigs(defaultConfig, configs) {
    if (!configs) {
        return defaultConfig;
    }
    return Object.keys(defaultConfig).reduce(function (all, k) {
        all[k] = mergeConfig(defaultConfig[k], configs[k]);
        return all;
    }, __assign$2({}, defaultConfig));
}
function createDefaultFormatters(cache) {
    if (cache === void 0) { cache = {
        number: {},
        dateTime: {},
        pluralRules: {},
    }; }
    return {
        getNumberFormat: memoizeFormatConstructor(Intl.NumberFormat, cache.number),
        getDateTimeFormat: memoizeFormatConstructor(Intl.DateTimeFormat, cache.dateTime),
        getPluralRules: memoizeFormatConstructor(Intl.PluralRules, cache.pluralRules),
    };
}
var IntlMessageFormat = /** @class */ (function () {
    function IntlMessageFormat(message, locales, overrideFormats, opts) {
        var _this = this;
        if (locales === void 0) { locales = IntlMessageFormat.defaultLocale; }
        this.formatterCache = {
            number: {},
            dateTime: {},
            pluralRules: {},
        };
        this.format = function (values) {
            return formatToString(_this.ast, _this.locales, _this.formatters, _this.formats, values, _this.message);
        };
        this.formatToParts = function (values) {
            return formatToParts(_this.ast, _this.locales, _this.formatters, _this.formats, values, undefined, _this.message);
        };
        this.formatHTMLMessage = function (values) {
            return formatHTMLMessage(_this.ast, _this.locales, _this.formatters, _this.formats, values, _this.message);
        };
        this.resolvedOptions = function () { return ({
            locale: Intl.NumberFormat.supportedLocalesOf(_this.locales)[0],
        }); };
        this.getAst = function () { return _this.ast; };
        if (typeof message === 'string') {
            this.message = message;
            if (!IntlMessageFormat.__parse) {
                throw new TypeError('IntlMessageFormat.__parse must be set to process `message` of type `string`');
            }
            // Parse string messages into an AST.
            this.ast = IntlMessageFormat.__parse(message, {
                normalizeHashtagInPlural: false,
            });
        }
        else {
            this.ast = message;
        }
        if (!Array.isArray(this.ast)) {
            throw new TypeError('A message must be provided as a String or AST.');
        }
        // Creates a new object with the specified `formats` merged with the default
        // formats.
        this.formats = mergeConfigs(IntlMessageFormat.formats, overrideFormats);
        // Defined first because it's used to build the format pattern.
        this.locales = locales;
        this.formatters =
            (opts && opts.formatters) || createDefaultFormatters(this.formatterCache);
    }
    IntlMessageFormat.defaultLocale = new Intl.NumberFormat().resolvedOptions().locale;
    IntlMessageFormat.__parse = parse;
    // Default format options used as the prototype of the `formats` provided to the
    // constructor. These are used when constructing the internal Intl.NumberFormat
    // and Intl.DateTimeFormat instances.
    IntlMessageFormat.formats = {
        number: {
            currency: {
                style: 'currency',
            },
            percent: {
                style: 'percent',
            },
        },
        date: {
            short: {
                month: 'numeric',
                day: 'numeric',
                year: '2-digit',
            },
            medium: {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            },
            long: {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            },
            full: {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            },
        },
        time: {
            short: {
                hour: 'numeric',
                minute: 'numeric',
            },
            medium: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            },
            long: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short',
            },
            full: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short',
            },
        },
    };
    return IntlMessageFormat;
}());

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var microMemoize = createCommonjsModule(function (module, exports) {
(function (global, factory) {
   module.exports = factory() ;
}(commonjsGlobal, (function () {
  /**
   * @constant DEFAULT_OPTIONS_KEYS the default options keys
   */
  var DEFAULT_OPTIONS_KEYS = {
      isEqual: true,
      isMatchingKey: true,
      isPromise: true,
      maxSize: true,
      onCacheAdd: true,
      onCacheChange: true,
      onCacheHit: true,
      transformKey: true,
  };
  /**
   * @function slice
   *
   * @description
   * slice.call() pre-bound
   */
  var slice = Array.prototype.slice;
  /**
   * @function cloneArray
   *
   * @description
   * clone the array-like object and return the new array
   *
   * @param arrayLike the array-like object to clone
   * @returns the clone as an array
   */
  function cloneArray(arrayLike) {
      var length = arrayLike.length;
      if (!length) {
          return [];
      }
      if (length === 1) {
          return [arrayLike[0]];
      }
      if (length === 2) {
          return [arrayLike[0], arrayLike[1]];
      }
      if (length === 3) {
          return [arrayLike[0], arrayLike[1], arrayLike[2]];
      }
      return slice.call(arrayLike, 0);
  }
  /**
   * @function getCustomOptions
   *
   * @description
   * get the custom options on the object passed
   *
   * @param options the memoization options passed
   * @returns the custom options passed
   */
  function getCustomOptions(options) {
      var customOptions = {};
      /* eslint-disable no-restricted-syntax */
      for (var key in options) {
          if (!DEFAULT_OPTIONS_KEYS[key]) {
              customOptions[key] = options[key];
          }
      }
      /* eslint-enable */
      return customOptions;
  }
  /**
   * @function isMemoized
   *
   * @description
   * is the function passed already memoized
   *
   * @param fn the function to test
   * @returns is the function already memoized
   */
  function isMemoized(fn) {
      return (typeof fn === 'function' &&
          fn.isMemoized);
  }
  /**
   * @function isSameValueZero
   *
   * @description
   * are the objects equal based on SameValueZero equality
   *
   * @param object1 the first object to compare
   * @param object2 the second object to compare
   * @returns are the two objects equal
   */
  function isSameValueZero(object1, object2) {
      // eslint-disable-next-line no-self-compare
      return object1 === object2 || (object1 !== object1 && object2 !== object2);
  }
  /**
   * @function mergeOptions
   *
   * @description
   * merge the options into the target
   *
   * @param existingOptions the options provided
   * @param newOptions the options to include
   * @returns the merged options
   */
  function mergeOptions(existingOptions, newOptions) {
      // @ts-ignore
      var target = {};
      /* eslint-disable no-restricted-syntax */
      for (var key in existingOptions) {
          target[key] = existingOptions[key];
      }
      for (var key in newOptions) {
          target[key] = newOptions[key];
      }
      /* eslint-enable */
      return target;
  }

  // utils
  var Cache = /** @class */ (function () {
      function Cache(options) {
          this.keys = [];
          this.values = [];
          this.options = options;
          var isMatchingKeyFunction = typeof options.isMatchingKey === 'function';
          if (isMatchingKeyFunction) {
              this.getKeyIndex = this._getKeyIndexFromMatchingKey;
          }
          else if (options.maxSize > 1) {
              this.getKeyIndex = this._getKeyIndexForMany;
          }
          else {
              this.getKeyIndex = this._getKeyIndexForSingle;
          }
          this.canTransformKey = typeof options.transformKey === 'function';
          this.shouldCloneArguments = this.canTransformKey || isMatchingKeyFunction;
          this.shouldUpdateOnAdd = typeof options.onCacheAdd === 'function';
          this.shouldUpdateOnChange = typeof options.onCacheChange === 'function';
          this.shouldUpdateOnHit = typeof options.onCacheHit === 'function';
      }
      Object.defineProperty(Cache.prototype, "size", {
          get: function () {
              return this.keys.length;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Cache.prototype, "snapshot", {
          get: function () {
              return {
                  keys: cloneArray(this.keys),
                  size: this.size,
                  values: cloneArray(this.values),
              };
          },
          enumerable: true,
          configurable: true
      });
      /**
       * @function _getKeyIndexFromMatchingKey
       *
       * @description
       * gets the matching key index when a custom key matcher is used
       *
       * @param keyToMatch the key to match
       * @returns the index of the matching key, or -1
       */
      Cache.prototype._getKeyIndexFromMatchingKey = function (keyToMatch) {
          var _a = this.options, isMatchingKey = _a.isMatchingKey, maxSize = _a.maxSize;
          var keys = this.keys;
          var keysLength = keys.length;
          if (!keysLength) {
              return -1;
          }
          if (isMatchingKey(keys[0], keyToMatch)) {
              return 0;
          }
          if (maxSize > 1) {
              for (var index = 1; index < keysLength; index++) {
                  if (isMatchingKey(keys[index], keyToMatch)) {
                      return index;
                  }
              }
          }
          return -1;
      };
      /**
       * @function _getKeyIndexForMany
       *
       * @description
       * gets the matching key index when multiple keys are used
       *
       * @param keyToMatch the key to match
       * @returns the index of the matching key, or -1
       */
      Cache.prototype._getKeyIndexForMany = function (keyToMatch) {
          var isEqual = this.options.isEqual;
          var keys = this.keys;
          var keysLength = keys.length;
          if (!keysLength) {
              return -1;
          }
          if (keysLength === 1) {
              return this._getKeyIndexForSingle(keyToMatch);
          }
          var keyLength = keyToMatch.length;
          var existingKey;
          var argIndex;
          if (keyLength > 1) {
              for (var index = 0; index < keysLength; index++) {
                  existingKey = keys[index];
                  if (existingKey.length === keyLength) {
                      argIndex = 0;
                      for (; argIndex < keyLength; argIndex++) {
                          if (!isEqual(existingKey[argIndex], keyToMatch[argIndex])) {
                              break;
                          }
                      }
                      if (argIndex === keyLength) {
                          return index;
                      }
                  }
              }
          }
          else {
              for (var index = 0; index < keysLength; index++) {
                  existingKey = keys[index];
                  if (existingKey.length === keyLength &&
                      isEqual(existingKey[0], keyToMatch[0])) {
                      return index;
                  }
              }
          }
          return -1;
      };
      /**
       * @function _getKeyIndexForSingle
       *
       * @description
       * gets the matching key index when a single key is used
       *
       * @param keyToMatch the key to match
       * @returns the index of the matching key, or -1
       */
      Cache.prototype._getKeyIndexForSingle = function (keyToMatch) {
          var keys = this.keys;
          if (!keys.length) {
              return -1;
          }
          var existingKey = keys[0];
          var length = existingKey.length;
          if (keyToMatch.length !== length) {
              return -1;
          }
          var isEqual = this.options.isEqual;
          if (length > 1) {
              for (var index = 0; index < length; index++) {
                  if (!isEqual(existingKey[index], keyToMatch[index])) {
                      return -1;
                  }
              }
              return 0;
          }
          return isEqual(existingKey[0], keyToMatch[0]) ? 0 : -1;
      };
      /**
       * @function orderByLru
       *
       * @description
       * order the array based on a Least-Recently-Used basis
       *
       * @param key the new key to move to the front
       * @param value the new value to move to the front
       * @param startingIndex the index of the item to move to the front
       */
      Cache.prototype.orderByLru = function (key, value, startingIndex) {
          var keys = this.keys;
          var values = this.values;
          var currentLength = keys.length;
          var index = startingIndex;
          while (index--) {
              keys[index + 1] = keys[index];
              values[index + 1] = values[index];
          }
          keys[0] = key;
          values[0] = value;
          var maxSize = this.options.maxSize;
          if (currentLength === maxSize && startingIndex === currentLength) {
              keys.pop();
              values.pop();
          }
          else if (startingIndex >= maxSize) {
              // eslint-disable-next-line no-multi-assign
              keys.length = values.length = maxSize;
          }
      };
      /**
       * @function updateAsyncCache
       *
       * @description
       * update the promise method to auto-remove from cache if rejected, and
       * if resolved then fire cache hit / changed
       *
       * @param memoized the memoized function
       */
      Cache.prototype.updateAsyncCache = function (memoized) {
          var _this = this;
          var _a = this.options, onCacheChange = _a.onCacheChange, onCacheHit = _a.onCacheHit;
          var firstKey = this.keys[0];
          var firstValue = this.values[0];
          this.values[0] = firstValue.then(function (value) {
              if (_this.shouldUpdateOnHit) {
                  onCacheHit(_this, _this.options, memoized);
              }
              if (_this.shouldUpdateOnChange) {
                  onCacheChange(_this, _this.options, memoized);
              }
              return value;
          }, function (error) {
              var keyIndex = _this.getKeyIndex(firstKey);
              if (keyIndex !== -1) {
                  _this.keys.splice(keyIndex, 1);
                  _this.values.splice(keyIndex, 1);
              }
              throw error;
          });
      };
      return Cache;
  }());

  // cache
  function createMemoizedFunction(fn, options) {
      if (options === void 0) { options = {}; }
      if (isMemoized(fn)) {
          return createMemoizedFunction(fn.fn, mergeOptions(fn.options, options));
      }
      if (typeof fn !== 'function') {
          throw new TypeError('You must pass a function to `memoize`.');
      }
      var _a = options.isEqual, isEqual = _a === void 0 ? isSameValueZero : _a, isMatchingKey = options.isMatchingKey, _b = options.isPromise, isPromise = _b === void 0 ? false : _b, _c = options.maxSize, maxSize = _c === void 0 ? 1 : _c, onCacheAdd = options.onCacheAdd, onCacheChange = options.onCacheChange, onCacheHit = options.onCacheHit, transformKey = options.transformKey;
      var normalizedOptions = mergeOptions({
          isEqual: isEqual,
          isMatchingKey: isMatchingKey,
          isPromise: isPromise,
          maxSize: maxSize,
          onCacheAdd: onCacheAdd,
          onCacheChange: onCacheChange,
          onCacheHit: onCacheHit,
          transformKey: transformKey,
      }, getCustomOptions(options));
      var cache = new Cache(normalizedOptions);
      var keys = cache.keys, values = cache.values, canTransformKey = cache.canTransformKey, shouldCloneArguments = cache.shouldCloneArguments, shouldUpdateOnAdd = cache.shouldUpdateOnAdd, shouldUpdateOnChange = cache.shouldUpdateOnChange, shouldUpdateOnHit = cache.shouldUpdateOnHit;
      // @ts-ignore
      var memoized = function memoized() {
          // @ts-ignore
          var key = shouldCloneArguments
              ? cloneArray(arguments)
              : arguments;
          if (canTransformKey) {
              key = transformKey(key);
          }
          var keyIndex = keys.length ? cache.getKeyIndex(key) : -1;
          if (keyIndex !== -1) {
              if (shouldUpdateOnHit) {
                  onCacheHit(cache, normalizedOptions, memoized);
              }
              if (keyIndex) {
                  cache.orderByLru(keys[keyIndex], values[keyIndex], keyIndex);
                  if (shouldUpdateOnChange) {
                      onCacheChange(cache, normalizedOptions, memoized);
                  }
              }
          }
          else {
              var newValue = fn.apply(this, arguments);
              var newKey = shouldCloneArguments
                  ? key
                  : cloneArray(arguments);
              cache.orderByLru(newKey, newValue, keys.length);
              if (isPromise) {
                  cache.updateAsyncCache(memoized);
              }
              if (shouldUpdateOnAdd) {
                  onCacheAdd(cache, normalizedOptions, memoized);
              }
              if (shouldUpdateOnChange) {
                  onCacheChange(cache, normalizedOptions, memoized);
              }
          }
          return values[0];
      };
      memoized.cache = cache;
      memoized.fn = fn;
      memoized.isMemoized = true;
      memoized.options = normalizedOptions;
      return memoized;
  }

  return createMemoizedFunction;

})));

});

function o(){}const r=t=>t;function i$1(t,e){for(const n in e)t[n]=e[n];return t}function c(t){return t&&"object"==typeof t&&"function"==typeof t.then}function s(t){return t()}function u(){return Object.create(null)}function a(t){t.forEach(s);}function l(t){return "function"==typeof t}function f(t,e){const n=t.subscribe(e);return n.unsubscribe?()=>n.unsubscribe():n}function d$1(t,e,n){return t[1]?i$1({},i$1(e.$$scope.ctx,t[1](n?n(e):{}))):e.$$scope.ctx}const p=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),h="undefined"!=typeof window;let _=h?()=>window.performance.now():()=>Date.now(),m=h?t=>requestAnimationFrame(t):o;const g=new Set;let b,F=!1;function v(){g.forEach(t=>{t[0](_())||(g.delete(t),t[1]());}),(F=g.size>0)&&m(v);}function $(t){let e;return F||(F=!0,m(v)),{promise:new Promise(n=>{g.add(e=[t,n]);}),abort(){g.delete(e);}}}function y(t,e){t.appendChild(e);}function w(t,e,n){t.insertBefore(e,n||null);}function k(t){t.parentNode.removeChild(t);}function x$1(t){return document.createElement(t)}function E(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function S$2(t){return document.createTextNode(t)}function O(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function C(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n);}function D(t){return Array.from(t.childNodes)}function j(t,e){for(let n=0;n<t.length;n+=1){const o=t[n];if(3===o.nodeType)return o.data=""+e,t.splice(n,1)[0]}return S$2(e)}function A(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}let M,L=0,P={};function R(t,e,n,o,r,i,c,s=0){const u=16.666/o;let a="{\n";for(let t=0;t<=1;t+=u){const o=e+(n-e)*i(t);a+=100*t+`%{${c(o,1-o)}}\n`;}const l=a+`100% {${c(n,1-n)}}\n}`,f=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(l)}_${s}`;if(!P[f]){if(!b){const t=x$1("style");document.head.appendChild(t),b=t.sheet;}P[f]=!0,b.insertRule(`@keyframes ${f} ${l}`,b.cssRules.length);}const d=t.style.animation||"";return t.style.animation=`${d?`${d}, `:""}${f} ${o}ms linear ${r}ms 1 both`,L+=1,f}function q(t,e){t.style.animation=(t.style.animation||"").split(", ").filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")).join(", "),e&&!--L&&m(()=>{if(L)return;let t=b.cssRules.length;for(;t--;)b.deleteRule(t);P={};});}function N(t,e){const n=t.getBoundingClientRect();if(e.left!==n.left||e.top!==n.top){const o=getComputedStyle(t),r="none"===o.transform?"":o.transform;t.style.transform=`${r} translate(${e.left-n.left}px, ${e.top-n.top}px)`;}}function T$2(t){M=t;}function z(){if(!M)throw new Error("Function called outside component initialization");return M}const B=[],U=[],H$1=[],I=[],J=Promise.resolve();let V,Y=!1;function G$2(){Y||(Y=!0,J.then(Q));}function K$2(t){H$1.push(t);}function Q(){const t=new Set;do{for(;B.length;){const t=B.shift();T$2(t),W$3(t.$$);}for(;U.length;)U.pop()();for(let e=0;e<H$1.length;e+=1){const n=H$1[e];t.has(n)||(n(),t.add(n));}H$1.length=0;}while(B.length);for(;I.length;)I.pop()();Y=!1;}function W$3(t){null!==t.fragment&&(t.update(t.dirty),a(t.before_update),t.fragment&&t.fragment.p(t.dirty,t.ctx),t.dirty=null,t.after_update.forEach(K$2));}function X(){return V||(V=Promise.resolve()).then(()=>{V=null;}),V}function Z(t,e,n){t.dispatchEvent(A(`${e?"intro":"outro"}${n}`));}const tt=new Set;let et;function nt(){et={r:0,c:[],p:et};}function ot(){et.r||a(et.c),et=et.p;}function rt(t,e){t&&t.i&&(tt.delete(t),t.i(e));}function it(t,e,n,o){if(t&&t.o){if(tt.has(t))return;tt.add(t),et.c.push(()=>{tt.delete(t),o&&(n&&t.d(1),o());}),t.o(e);}}const ct={duration:0};const st="undefined"!=typeof window?window:global;function ut(t,e){t.d(1),e.delete(t.key);}function at(t,e){it(t,1,1,()=>{e.delete(t.key);});}const lt=new Set(["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"]),ft=/[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;const dt={'"':"&quot;","'":"&#39;","&":"&amp;","<":"&lt;",">":"&gt;"};function pt(t){return String(t).replace(/["'&<>]/g,t=>dt[t])}let ht,_t;function mt(t,e,n){const{fragment:o,on_mount:r,on_destroy:i,after_update:c}=t.$$;o&&o.m(e,n),K$2(()=>{const e=r.map(s).filter(l);i?i.push(...e):a(e),t.$$.on_mount=[];}),c.forEach(K$2);}function gt(t,e){const n=t.$$;null!==n.fragment&&(a(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx={});}"function"==typeof HTMLElement&&(_t=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"});}connectedCallback(){for(const t in this.$$.slotted)this.appendChild(this.$$.slotted[t]);}attributeChangedCallback(t,e,n){this[t]=n;}$destroy(){gt(this,1),this.$destroy=o;}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1);}}$set(){}});class bt{$destroy(){gt(this,1),this.$destroy=o;}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1);}}$set(){}}function Ft(t,e){document.dispatchEvent(A(t,e));}function vt(t){Ft("SvelteDOMRemove",{node:t}),k(t);}var $t,yt,wt,kt=Object.freeze({__proto__:null,HtmlTag:class{constructor(t,e=null){this.e=x$1("div"),this.a=e,this.u(t);}m(t,e=null){for(let n=0;n<this.n.length;n+=1)w(t,this.n[n],e);this.t=t;}u(t){this.e.innerHTML=t,this.n=Array.from(this.e.childNodes);}p(t){this.d(),this.u(t),this.m(this.t,this.a);}d(){this.n.forEach(k);}},SvelteComponent:bt,SvelteComponentDev:class extends bt{constructor(t){if(!t||!t.target&&!t.$$inline)throw new Error("'target' is a required option");super();}$destroy(){super.$destroy(),this.$destroy=()=>{console.warn("Component was already destroyed");};}},get SvelteElement(){return _t},add_attribute:function(t,e,n){return null==e||n&&!e?"":` ${t}${!0===e?"":`=${"string"==typeof e?JSON.stringify(pt(e)):`"${e}"`}`}`},add_classes:function(t){return t?` class="${t}"`:""},add_flush_callback:function(t){I.push(t);},add_location:function(t,e,n,o,r){t.__svelte_meta={loc:{file:e,line:n,column:o,char:r}};},add_render_callback:K$2,add_resize_listener:function(t,e){"static"===getComputedStyle(t).position&&(t.style.position="relative");const n=document.createElement("object");let o;return n.setAttribute("style","display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;"),n.setAttribute("aria-hidden","true"),n.type="text/html",n.tabIndex=-1,n.onload=()=>{(o=n.contentDocument.defaultView).addEventListener("resize",e);},/Trident/.test(navigator.userAgent)?(t.appendChild(n),n.data="about:blank"):(n.data="about:blank",t.appendChild(n)),{cancel:()=>{o&&o.removeEventListener&&o.removeEventListener("resize",e),t.removeChild(n);}}},add_transform:N,afterUpdate:function(t){z().$$.after_update.push(t);},append:y,append_dev:function(t,e){Ft("SvelteDOMInsert",{target:t,node:e}),y(t,e);},assign:i$1,attr:C,attr_dev:function(t,e,n){C(t,e,n),null==n?Ft("SvelteDOMRemoveAttribute",{node:t,attribute:e}):Ft("SvelteDOMSetAttribute",{node:t,attribute:e,value:n});},beforeUpdate:function(t){z().$$.before_update.push(t);},bind:function(t,e,n){p(t.$$.props,e)&&(e=t.$$.props[e]||e,t.$$.bound[e]=n,n(t.$$.ctx[e]));},binding_callbacks:U,blank_object:u,bubble:function(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(t=>t(e));},check_outros:ot,children:D,claim_component:function(t,e){t&&t.l(e);},claim_element:function(t,e,n,o){for(let o=0;o<t.length;o+=1){const r=t[o];if(r.nodeName===e){for(let t=0;t<r.attributes.length;t+=1){const e=r.attributes[t];n[e.name]||r.removeAttribute(e.name);}return t.splice(o,1)[0]}}return o?E(e):x$1(e)},claim_space:function(t){return j(t," ")},claim_text:j,clear_loops:function(){g.forEach(t=>g.delete(t)),F=!1;},component_subscribe:function(t,e,n){t.$$.on_destroy.push(f(e,n));},createEventDispatcher:function(){const t=z();return (e,n)=>{const o=t.$$.callbacks[e];if(o){const r=A(e,n);o.slice().forEach(e=>{e.call(t,r);});}}},create_animation:function(t,e,n,i){if(!e)return o;const c=t.getBoundingClientRect();if(e.left===c.left&&e.right===c.right&&e.top===c.top&&e.bottom===c.bottom)return o;const{delay:s=0,duration:u=300,easing:a=r,start:l=_()+s,end:f=l+u,tick:d=o,css:p}=n(t,{from:e,to:c},i);let h,m=!0,g=!1;function b(){p&&q(t,h),m=!1;}return $(t=>{if(!g&&t>=l&&(g=!0),g&&t>=f&&(d(1,0),b()),!m)return !1;if(g){const e=0+1*a((t-l)/u);d(e,1-e);}return !0}),p&&(h=R(t,0,1,u,s,a,p)),s||(g=!0),d(0,1),b},create_bidirectional_transition:function(t,e,n,i){let c=e(t,n),s=i?0:1,u=null,f=null,d=null;function p(){d&&q(t,d);}function h(t,e){const n=t.b-s;return e*=Math.abs(n),{a:s,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function m(e){const{delay:n=0,duration:i=300,easing:l=r,tick:m=o,css:g}=c||ct,b={start:_()+n,b:e};e||(b.group=et,et.r+=1),u?f=b:(g&&(p(),d=R(t,s,e,i,n,l,g)),e&&m(0,1),u=h(b,i),K$2(()=>Z(t,e,"start")),$(e=>{if(f&&e>f.start&&(u=h(f,i),f=null,Z(t,u.b,"start"),g&&(p(),d=R(t,s,u.b,u.duration,0,l,c.css))),u)if(e>=u.end)m(s=u.b,1-s),Z(t,u.b,"end"),f||(u.b?p():--u.group.r||a(u.group.c)),u=null;else if(e>=u.start){const t=e-u.start;s=u.a+u.d*l(t/u.duration),m(s,1-s);}return !(!u&&!f)}));}return {run(t){l(c)?X().then(()=>{c=c(),m(t);}):m(t);},end(){p(),u=f=null;}}},create_component:function(t){t&&t.c();},create_in_transition:function(t,e,n){let i,c,s=e(t,n),u=!1,a=0;function f(){i&&q(t,i);}function d(){const{delay:e=0,duration:n=300,easing:l=r,tick:d=o,css:p}=s||ct;p&&(i=R(t,0,1,n,e,l,p,a++)),d(0,1);const h=_()+e,m=h+n;c&&c.abort(),u=!0,K$2(()=>Z(t,!0,"start")),c=$(e=>{if(u){if(e>=m)return d(1,0),Z(t,!0,"end"),f(),u=!1;if(e>=h){const t=l((e-h)/n);d(t,1-t);}}return u});}let p=!1;return {start(){p||(q(t),l(s)?(s=s(),X().then(d)):d());},invalidate(){p=!1;},end(){u&&(f(),u=!1);}}},create_out_transition:function(t,e,n){let i,c=e(t,n),s=!0;const u=et;function f(){const{delay:e=0,duration:n=300,easing:l=r,tick:f=o,css:d}=c||ct;d&&(i=R(t,1,0,n,e,l,d));const p=_()+e,h=p+n;K$2(()=>Z(t,!1,"start")),$(e=>{if(s){if(e>=h)return f(0,1),Z(t,!1,"end"),--u.r||a(u.c),!1;if(e>=p){const t=l((e-p)/n);f(1-t,t);}}return s});}return u.r+=1,l(c)?X().then(()=>{c=c(),f();}):f(),{end(e){e&&c.tick&&c.tick(1,0),s&&(i&&q(t,i),s=!1);}}},create_slot:function(t,e,n){if(t){const o=d$1(t,e,n);return t[0](o)}},create_ssr_component:function(t){function e(e,n,o,r){const i=M;T$2({$$:{on_destroy:ht,context:new Map(i?i.$$.context:[]),on_mount:[],before_update:[],after_update:[],callbacks:u()}});const c=t(e,n,o,r);return T$2(i),c}return {render:(t={},n={})=>{ht=[];const o={head:"",css:new Set},r=e(o,t,{},n);return a(ht),{html:r,css:{code:Array.from(o.css).map(t=>t.code).join("\n"),map:null},head:o.head}},$$render:e}},get current_component(){return M},custom_event:A,dataset_dev:function(t,e,n){t.dataset[e]=n,Ft("SvelteDOMSetDataset",{node:t,property:e,value:n});},debug:function(t,e,n,o){return console.log(`{@debug} ${t?t+" ":""}(${e}:${n})`),console.log(o),""},destroy_block:ut,destroy_component:gt,destroy_each:function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e);},detach:k,detach_after_dev:function(t){for(;t.nextSibling;)vt(t.nextSibling);},detach_before_dev:function(t){for(;t.previousSibling;)vt(t.previousSibling);},detach_between_dev:function(t,e){for(;t.nextSibling&&t.nextSibling!==e;)vt(t.nextSibling);},detach_dev:vt,dirty_components:B,dispatch_dev:Ft,each:function(t,e){let n="";for(let o=0;o<t.length;o+=1)n+=e(t[o],o);return n},element:x$1,element_is:function(t,e){return document.createElement(t,{is:e})},empty:function(){return S$2("")},escape:pt,escaped:dt,exclude_internal_props:function(t){const e={};for(const n in t)"$"!==n[0]&&(e[n]=t[n]);return e},fix_and_destroy_block:function(t,e){t.f(),ut(t,e);},fix_and_outro_and_destroy_block:function(t,e){t.f(),at(t,e);},fix_position:function(t){const e=getComputedStyle(t);if("absolute"!==e.position&&"fixed"!==e.position){const{width:n,height:o}=e,r=t.getBoundingClientRect();t.style.position="absolute",t.style.width=n,t.style.height=o,N(t,r);}},flush:Q,getContext:function(t){return z().$$.context.get(t)},get_binding_group_value:function(t){const e=[];for(let n=0;n<t.length;n+=1)t[n].checked&&e.push(t[n].__value);return e},get_current_component:z,get_slot_changes:function(t,e,n,o){return t[1]?i$1({},i$1(e.$$scope.changed||{},t[1](o?o(n):{}))):e.$$scope.changed||{}},get_slot_context:d$1,get_spread_object:function(t){return "object"==typeof t&&null!==t?t:{}},get_spread_update:function(t,e){const n={},o={},r={$$scope:1};let i=t.length;for(;i--;){const c=t[i],s=e[i];if(s){for(const t in c)t in s||(o[t]=1);for(const t in s)r[t]||(n[t]=s[t],r[t]=1);t[i]=s;}else for(const t in c)r[t]=1;}for(const t in o)t in n||(n[t]=void 0);return n},get_store_value:function(t){let e;return f(t,t=>e=t)(),e},globals:st,group_outros:nt,handle_promise:function(t,e){const n=e.token={};function o(t,o,r,c){if(e.token!==n)return;e.resolved=r&&{[r]:c};const s=i$1(i$1({},e.ctx),e.resolved),u=t&&(e.current=t)(s);let a=!1;e.block&&(e.blocks?e.blocks.forEach((t,n)=>{n!==o&&t&&(nt(),it(t,1,1,()=>{e.blocks[n]=null;}),ot());}):e.block.d(1),u.c(),rt(u,1),u.m(e.mount(),e.anchor),a=!0),e.block=u,e.blocks&&(e.blocks[o]=u),a&&Q();}if(c(t)){const n=z();if(t.then(t=>{T$2(n),o(e.then,1,e.value,t),T$2(null);},t=>{T$2(n),o(e.catch,2,e.error,t),T$2(null);}),e.current!==e.pending)return o(e.pending,0),!0}else {if(e.current!==e.then)return o(e.then,1,e.value,t),!0;e.resolved={[e.value]:t};}},has_prop:p,identity:r,init:function(t,e,n,r,i,c){const s=M;T$2(t);const l=e.props||{},f=t.$$={fragment:null,ctx:null,props:c,update:o,not_equal:i,bound:u(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(s?s.$$.context:[]),callbacks:u(),dirty:null};let d=!1;f.ctx=n?n(t,l,(e,n,o=n)=>(f.ctx&&i(f.ctx[e],f.ctx[e]=o)&&(f.bound[e]&&f.bound[e](o),d&&function(t,e){t.$$.dirty||(B.push(t),G$2(),t.$$.dirty=u()),t.$$.dirty[e]=!0;}(t,e)),n)):l,f.update(),d=!0,a(f.before_update),f.fragment=!!r&&r(f.ctx),e.target&&(e.hydrate?f.fragment&&f.fragment.l(D(e.target)):f.fragment&&f.fragment.c(),e.intro&&rt(t.$$.fragment),mt(t,e.target,e.anchor),Q()),T$2(s);},insert:w,insert_dev:function(t,e,n){Ft("SvelteDOMInsert",{target:t,node:e,anchor:n}),w(t,e,n);},intros:{enabled:!1},invalid_attribute_name_character:ft,is_client:h,is_function:l,is_promise:c,listen:O,listen_dev:function(t,e,n,o,r,i){const c=!0===o?["capture"]:o?Array.from(Object.keys(o)):[];r&&c.push("preventDefault"),i&&c.push("stopPropagation"),Ft("SvelteDOMAddEventListener",{node:t,event:e,handler:n,modifiers:c});const s=O(t,e,n,o);return ()=>{Ft("SvelteDOMRemoveEventListener",{node:t,event:e,handler:n,modifiers:c}),s();}},loop:$,loop_guard:function(t){const e=Date.now();return ()=>{if(Date.now()-e>t)throw new Error("Infinite loop detected")}},measure:function(t){const e={};let n=t.length;for(;n--;)e[t[n].key]=t[n].node.getBoundingClientRect();return e},missing_component:{$$render:()=>""},mount_component:mt,noop:o,not_equal:function(t,e){return t!=t?e==e:t!==e},get now(){return _},null_to_empty:function(t){return null==t?"":t},object_without_properties:function(t,e){const n={};for(const o in t)p(t,o)&&-1===e.indexOf(o)&&(n[o]=t[o]);return n},onDestroy:function(t){z().$$.on_destroy.push(t);},onMount:function(t){z().$$.on_mount.push(t);},once:function(t){let e=!1;return function(...n){e||(e=!0,t.call(this,...n));}},outro_and_destroy_block:at,prevent_default:function(t){return function(e){return e.preventDefault(),t.call(this,e)}},prop_dev:function(t,e,n){t[e]=n,Ft("SvelteDOMSetProperty",{node:t,property:e,value:n});},get raf(){return m},run:s,run_all:a,safe_not_equal:function(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t},schedule_update:G$2,select_multiple_value:function(t){return [].map.call(t.querySelectorAll(":checked"),t=>t.__value)},select_option:function(t,e){for(let n=0;n<t.options.length;n+=1){const o=t.options[n];if(o.__value===e)return void(o.selected=!0)}},select_options:function(t,e){for(let n=0;n<t.options.length;n+=1){const o=t.options[n];o.selected=~e.indexOf(o.__value);}},select_value:function(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value},self:function(t){return function(e){e.target===this&&t.call(this,e);}},setContext:function(t,e){z().$$.context.set(t,e);},set_attributes:function(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const o in e)null==e[o]?t.removeAttribute(o):"style"===o?t.style.cssText=e[o]:n[o]&&n[o].set?t[o]=e[o]:C(t,o,e[o]);},set_current_component:T$2,set_custom_element_data:function(t,e,n){e in t?t[e]=n:C(t,e,n);},set_data:function(t,e){e=""+e,t.data!==e&&(t.data=e);},set_data_dev:function(t,e){e=""+e,t.data!==e&&(Ft("SvelteDOMSetData",{node:t,data:e}),t.data=e);},set_input_type:function(t,e){try{t.type=e;}catch(t){}},set_input_value:function(t,e){(null!=e||t.value)&&(t.value=e);},set_now:function(t){_=t;},set_raf:function(t){m=t;},set_store_value:function(t,e,n=e){return t.set(n),e},set_style:function(t,e,n,o){t.style.setProperty(e,n,o?"important":"");},set_svg_attributes:function(t,e){for(const n in e)C(t,n,e[n]);},space:function(){return S$2(" ")},spread:function(t,e){const n=Object.assign({},...t);e&&(null==n.class?n.class=e:n.class+=" "+e);let o="";return Object.keys(n).forEach(t=>{if(ft.test(t))return;const e=n[t];!0===e?o+=" "+t:lt.has(t.toLowerCase())?e&&(o+=" "+t):null!=e&&(o+=" "+t+"="+JSON.stringify(String(e).replace(/"/g,"&#34;").replace(/'/g,"&#39;")));}),o},stop_propagation:function(t){return function(e){return e.stopPropagation(),t.call(this,e)}},subscribe:f,svg_element:E,text:S$2,tick:function(){return G$2(),J},time_ranges_to_array:function(t){const e=[];for(let n=0;n<t.length;n+=1)e.push({start:t.start(n),end:t.end(n)});return e},to_number:function(t){return ""===t?void 0:+t},toggle_class:function(t,e,n){t.classList[n?"add":"remove"](e);},transition_in:rt,transition_out:it,update_keyed_each:function(t,e,n,o,r,i,c,s,u,a,l,f){let d=t.length,p=i.length,h=d;const _={};for(;h--;)_[t[h].key]=h;const m=[],g=new Map,b=new Map;for(h=p;h--;){const t=f(r,i,h),s=n(t);let u=c.get(s);u?o&&u.p(e,t):(u=a(s,t)).c(),g.set(s,m[h]=u),s in _&&b.set(s,Math.abs(h-_[s]));}const F=new Set,v=new Set;function $(t){rt(t,1),t.m(s,l),c.set(t.key,t),l=t.first,p--;}for(;d&&p;){const e=m[p-1],n=t[d-1],o=e.key,r=n.key;e===n?(l=e.first,d--,p--):g.has(r)?!c.has(o)||F.has(o)?$(e):v.has(r)?d--:b.get(o)>b.get(r)?(v.add(o),$(e)):(F.add(r),d--):(u(n,c),d--);}for(;d--;){const e=t[d];g.has(e.key)||u(e,c);}for(;p;)$(m[p-1]);return m},validate_component:function(t,e){if(!t||!t.$$render)throw "svelte:component"===e&&(e+=" this={...}"),new Error(`<${e}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);return t},validate_store:function(t,e){if(!t||"function"!=typeof t.subscribe)throw new Error(`'${e}' is not a store with a 'subscribe' method`)},xlink_attr:function(t,e,n){t.setAttributeNS("http://www.w3.org/1999/xlink",e,n);}}),xt=($t=kt)&&$t.default||$t,Et=(function(t,e){Object.defineProperty(e,"__esModule",{value:!0});const n=[];function o(t,e){return {subscribe:r(t,e).subscribe}}function r(t,e=xt.noop){let o;const r=[];function i(e){if(xt.safe_not_equal(t,e)&&(t=e,o)){const e=!n.length;for(let e=0;e<r.length;e+=1){const o=r[e];o[1](),n.push(o,t);}if(e){for(let t=0;t<n.length;t+=2)n[t][0](n[t+1]);n.length=0;}}}return {set:i,update:function(e){i(e(t));},subscribe:function(n,c=xt.noop){const s=[n,c];return r.push(s),1===r.length&&(o=e(i)||xt.noop),n(t),()=>{const t=r.indexOf(s);-1!==t&&r.splice(t,1),0===r.length&&(o(),o=null);}}}}Object.defineProperty(e,"get",{enumerable:!0,get:function(){return xt.get_store_value}}),e.derived=function(t,e,n){const r=!Array.isArray(t),i=r?[t]:t,c=e.length<2;return o(n,t=>{let n=!1;const o=[];let s=0,u=xt.noop;const a=()=>{if(s)return;u();const n=e(r?o[0]:o,t);c?t(n):u=xt.is_function(n)?n:xt.noop;},l=i.map((t,e)=>t.subscribe(t=>{o[e]=t,s&=~(1<<e),n&&a();},()=>{s|=1<<e;}));return n=!0,a(),function(){xt.run_all(l),u();}})},e.readable=o,e.writable=r;}(yt={exports:{}},yt.exports),yt.exports);(wt=Et)&&wt.__esModule&&Object.prototype.hasOwnProperty.call(wt,"default")&&wt.default;var St=Et.derived,Ot=(Et.readable,Et.writable);const Ct=({navigator:t,hash:e,search:n,fallback:o}={})=>{let r;const i=(t,e)=>{const n=t.substr(1).split("&").find(t=>0===t.indexOf(e));if(n)return n.split("=").pop()};return "undefined"!=typeof window&&(t&&(r=window.navigator.language||window.navigator.languages[0]),n&&(r=i(window.location.search,n)),e&&(r=i(window.location.hash,e))),r||o};let Dt,jt;const At={number:{scientific:{notation:"scientific"},engineering:{notation:"engineering"},compactLong:{notation:"compact",compactDisplay:"long"},compactShort:{notation:"compact",compactDisplay:"short"}}};const Lt=microMemoize((t,n)=>new IntlMessageFormat(t,n,At)),Pt=microMemoize((e,n)=>jt[n][e]||objectResolvePath(jt[n],e));function Rt(t,{values:e,locale:n=Dt}={}){return Lt(t,n).format(e)}function qt(t,{values:e,locale:n=Dt}={}){const o=Pt(t,n);return o?e?Lt(o,n).format(e):o:(console.warn(`[svelte-i18n] The message "${t}" was not found in the locale "${n}".`),t)}qt.time=(t,{format:e="short"}={})=>Rt(`{t,time,${e}}`,{values:{t:t}}),qt.date=(t,{format:e="short"}={})=>Rt(`{d,date,${e}}`,{values:{d:t}}),qt.number=(t,{format:e}={})=>Rt(`{n,number,${e}}`,{values:{n:t}}),qt.capital=(t,e)=>(t=>t.replace(/(^|\s)\S/,t=>t.toUpperCase()))(qt(t,e)),qt.title=(t,e)=>(t=>t.replace(/(^|\s)\S/g,t=>t.toUpperCase()))(qt(t,e)),qt.upper=(t,e)=>(t=>t.toLocaleUpperCase())(qt(t,e)),qt.lower=(t,e)=>(t=>t.toLocaleLowerCase())(qt(t,e));const Nt=Ot({});Nt.subscribe(t=>{jt=t;});const Tt=Ot({}),zt=Tt.set;Tt.set=t=>{const e=function(t){if(jt[t])return t;if("string"==typeof t){const e=t.split("-").shift();if(jt[e])return e}return null}(t);if(e)return zt(e);throw Error(`[svelte-i18n] Locale "${t}" not found.`)},Tt.update=t=>zt(t(Dt)),Tt.subscribe(t=>{Dt=t;});const Bt=St([Tt,Nt],()=>qt);

function cubicOut(t) {
    const f = t - 1.0;
    return f * f * f + 1.0;
}
function quintIn(t) {
    return t * t * t * t * t;
}

function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 }) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === 'none' ? '' : style.transform;
    const od = target_opacity * (1 - opacity);
    return {
        delay,
        duration,
        easing,
        css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
    };
}

function flip(node, animation, params) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;
    const scaleX = animation.from.width / node.clientWidth;
    const scaleY = animation.from.height / node.clientHeight;
    const dx = (animation.from.left - animation.to.left) / scaleX;
    const dy = (animation.from.top - animation.to.top) / scaleY;
    const d = Math.sqrt(dx * dx + dy * dy);
    const { delay = 0, duration = (d) => Math.sqrt(d) * 120, easing = cubicOut } = params;
    return {
        delay,
        duration: is_function(duration) ? duration(d) : duration,
        easing,
        css: (_t, u) => `transform: ${transform} translate(${u * dx}px, ${u * dy}px);`
    };
}

function argsEqual(args1, args2) {
    return JSON.stringify(args1) === JSON.stringify(args2);
}
// will update object(merge new data) in list if it passes predicate, otherwise adds new object
function replaceOrAdd(list, predicate, data) {
    const clone = [...list];
    const index = clone.findIndex(predicate);
    if (index !== -1) {
        const { startTime, contractCall } = clone[index];
        const { startTime: serverStartTime } = data;
        const contractCallMerge = contractCall ? { ...contractCall } : {};
        clone[index] = {
            ...data,
            ...contractCallMerge,
            startTime: startTime || serverStartTime
        };
        return clone;
    }
    return [...list, data];
}
function extractMessageFromError(error) {
    if (!error.stack || !error.message) {
        return {
            eventCode: 'txError',
            errorMsg: 'An unknown error occured'
        };
    }
    const message = error.stack || error.message;
    if (message.includes('User denied transaction signature')) {
        return {
            eventCode: 'txSendFail',
            errorMsg: 'User denied transaction signature'
        };
    }
    if (message.includes('transaction underpriced')) {
        return {
            eventCode: 'txUnderpriced',
            errorMsg: 'Transaction is under priced'
        };
    }
    return {
        eventCode: 'txError',
        errorMsg: message
    };
}
function createEmitter$1() {
    return {
        listeners: {},
        on: function (eventCode, listener) {
            // check if valid eventCode
            switch (eventCode) {
                case 'txSent':
                case 'txPool':
                case 'txConfirmed':
                case 'txSpeedUp':
                case 'txCancel':
                case 'txFailed':
                case 'txRequest':
                case 'nsfFail':
                case 'txRepeat':
                case 'txAwaitingApproval':
                case 'txConfirmReminder':
                case 'txSendFail':
                case 'txError':
                case 'txUnderPriced':
                case 'all':
                    break;
                default:
                    throw new Error(`${eventCode} is not a valid event code, for a list of valid event codes see: https://github.com/blocknative/notify`);
            }
            // check that listener is a function
            if (typeof listener !== 'function') {
                throw new Error('Listener must be a function');
            }
            // add listener for the eventCode
            this.listeners[eventCode] = listener;
        },
        emit: function (state) {
            if (this.listeners[state.eventCode || '']) {
                return this.listeners[state.eventCode || ''](state);
            }
            if (this.listeners.all) {
                return this.listeners.all(state);
            }
        }
    };
}
function localNetwork(networkId) {
    switch (networkId) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 42:
        case 100:
            return false;
        default:
            return true;
    }
}

const defaultNotifyMessages = {
    en: {
        transaction: {
            txRequest: 'Your transaction is waiting for you to confirm',
            nsfFail: 'You have insufficient funds to complete this transaction',
            txUnderpriced: 'The gas price for your transaction is too low, try again with a higher gas price',
            txRepeat: 'This could be a repeat transaction',
            txAwaitingApproval: 'You have a previous transaction waiting for you to confirm',
            txConfirmReminder: 'Please confirm your transaction to continue, the transaction window may be behind your browser',
            txSendFail: 'You rejected the transaction',
            txSent: 'Your transaction has been sent to the network',
            txStallPending: 'Your transaction has stalled and has not entered the transaction pool',
            txPool: 'Your transaction has started',
            txStallConfirmed: "Your transaction has stalled and hasn't been confirmed",
            txSpeedUp: 'Your transaction has been sped up',
            txCancel: 'Your transaction is being canceled',
            txFailed: 'Your transaction has failed',
            txConfirmed: 'Your transaction has succeeded',
            txError: 'Oops something went wrong, please try again'
        },
        watched: {
            txPool: 'Your account is {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}',
            txSpeedUp: 'Your account is {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}',
            txCancel: 'Your account is {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}',
            txConfirmed: 'Your account successfully {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}',
            txFailed: 'Your account failed to {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}'
        },
        time: {
            minutes: 'min',
            seconds: 'sec'
        }
    },
    es: {
        transaction: {
            txRequest: 'Su transacción está esperando que confirme',
            nsfFail: 'No tiene fondos suficientes para completar esta transacción.',
            txUnderpriced: 'El precio del gas para su transacción es demasiado bajo, intente nuevamente con un precio del gas más alto',
            txRepeat: 'Esto podría ser una transacción repetida',
            txAwaitingApproval: 'Tienes una transacción anterior esperando que confirmes',
            txConfirmReminder: 'Confirme su transacción para continuar, la ventana de transacción puede estar detrás de su navegador',
            txSendFail: 'Rechazaste la transacción',
            txSent: 'Su transacción ha sido enviada a la red.',
            txStallPending: 'Su transacción se ha estancado y no ha ingresado al grupo de transacciones',
            txPool: 'Su transacción ha comenzado',
            txStallConfirmed: 'Su transacción se ha estancado y no ha sido confirmada.',
            txSpeedUp: 'Su transacción ha sido acelerada',
            txCancel: 'Tu transacción está siendo cancelada',
            txFailed: 'Su transacción ha fallado',
            txConfirmed: 'Su transacción ha tenido éxito.',
            txError: 'Vaya, algo salió mal, por favor intente nuevamente'
        },
        watched: {
            txPool: 'su cuenta está {verb, select, receiving {recibiendo} sending {enviando}} {formattedValue} {asset} {preposition, select, from {desde} to {a}} {counterpartyShortened}',
            txSpeedUp: 'su cuenta está {verb, select, receiving {recibiendo} sending {enviando}} {formattedValue} {asset} {preposition, select, from {desde} to {a}} {counterpartyShortened}',
            txCancel: 'su cuenta está {verb, select, receiving {recibiendo} sending {enviando}} {formattedValue} {asset} {preposition, select, from {desde} to {a}} {counterpartyShortened}',
            txConfirmed: 'su cuenta {verb, select, received {recibió} sent {ha enviado}} con éxito {formattedValue} {asset} {preposition, select, from {de} to {a}} {counterpartyShortened}',
            txFailed: 'su cuenta fallado {verb, select, received {recibió} sent {ha enviado}} con éxito {formattedValue} {asset} {preposition, select, from {de} to {a}} {counterpartyShortened}'
        },
        time: {
            minutes: 'min',
            seconds: 'sec'
        }
    }
};

const app = writable({
    version: '',
    name: '',
    dappId: '',
    networkId: 1,
    nodeSynced: true,
    mobilePosition: 'top',
    desktopPosition: 'bottomRight',
    darkMode: false,
    txApproveReminderTimeout: 20000,
    txStallPendingTimeout: 20000,
    txStallConfirmedTimeout: 90000,
    clientLocale: 'en',
    notifyMessages: defaultNotifyMessages
});
const transactions = createTransactionStore([]);
const notifications = createNotificationStore([]);
function createTransactionStore(initialState) {
    const { subscribe, update } = writable(initialState);
    function updateQueue(transaction) {
        const predicate = (tx) => tx.id === transaction.id;
        update((store) => {
            return replaceOrAdd(store, predicate, transaction);
        });
    }
    function add(transaction) {
        update((store) => [...store, transaction]);
    }
    return {
        subscribe,
        updateQueue,
        add
    };
}
function createNotificationStore(initialState) {
    const { subscribe, update } = writable(initialState);
    function add(notification) {
        update((store) => {
            const existingNotification = store.find((n) => n.id === notification.id);
            // if notification is a hint type or there are no existing notifications with same id, then just add it.
            if (notification.type === 'hint' || !existingNotification) {
                return [...store, notification];
            }
            // otherwise filter out all notifications with the same id and then add the new notification
            return [
                ...store.filter((n) => n.id !== notification.id),
                notification
            ];
        });
    }
    function remove(id, eventCode) {
        update((store) => store.filter((n) => n.id !== id || n.eventCode !== eventCode));
    }
    return {
        subscribe,
        add,
        remove,
        update
    };
}

/* src/components/CloseIcon.svelte generated by Svelte v3.24.0 */

function add_css() {
	var style = element("style");
	style.id = "svelte-1nxfpxx-style";
	style.textContent = "div.svelte-1nxfpxx{display:flex;justify-content:center;align-items:center;font-size:inherit;font-family:inherit;padding:0.3em;border-radius:40px;transition:background 150ms ease-in-out}div.svelte-1nxfpxx:hover{background:#eeeeee;cursor:pointer}.bn-notify-dark-mode-close-background.svelte-1nxfpxx:hover{background:#00222c}";
	append(document.head, style);
}

function create_fragment(ctx) {
	let div;
	let svg;
	let g;
	let path0;
	let path1;
	let g_stroke_value;
	let div_class_value;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			svg = svg_element("svg");
			g = svg_element("g");
			path0 = svg_element("path");
			path1 = svg_element("path");
			attr(path0, "d", "m.1.1 7.82304289 7.82304289");
			attr(path1, "d", "m.1.1 7.82304289 7.82304289");
			attr(path1, "transform", "matrix(-1 0 0 1 8 0)");
			attr(g, "fill", "none");

			attr(g, "stroke", g_stroke_value = /*hovered*/ ctx[0]
			? /*$app*/ ctx[1].darkMode ? "#ffffff" : "#4a4a4a"
			: "#9B9B9B");

			attr(g, "stroke-linecap", "square");
			attr(g, "stroke-width", "2");
			set_style(g, "transition", "stroke 150ms ease-in-out");
			attr(g, "transform", "translate(2 2)");
			attr(svg, "height", "8");
			attr(svg, "viewBox", "0 0 12 12");
			attr(svg, "width", "8");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");

			attr(div, "class", div_class_value = "bn-notify-custom bn-notify-notification-close-icon " + (/*$app*/ ctx[1].name
			? `bn-notify-${/*$app*/ ctx[1].name}`
			: "") + " svelte-1nxfpxx");

			toggle_class(div, "bn-notify-dark-mode-close-background", /*$app*/ ctx[1].darkMode);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, svg);
			append(svg, g);
			append(g, path0);
			append(g, path1);

			if (!mounted) {
				dispose = [
					listen(div, "mouseenter", /*mouseenter_handler*/ ctx[2]),
					listen(div, "mouseleave", /*mouseleave_handler*/ ctx[3])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*hovered, $app*/ 3 && g_stroke_value !== (g_stroke_value = /*hovered*/ ctx[0]
			? /*$app*/ ctx[1].darkMode ? "#ffffff" : "#4a4a4a"
			: "#9B9B9B")) {
				attr(g, "stroke", g_stroke_value);
			}

			if (dirty & /*$app*/ 2 && div_class_value !== (div_class_value = "bn-notify-custom bn-notify-notification-close-icon " + (/*$app*/ ctx[1].name
			? `bn-notify-${/*$app*/ ctx[1].name}`
			: "") + " svelte-1nxfpxx")) {
				attr(div, "class", div_class_value);
			}

			if (dirty & /*$app, $app*/ 2) {
				toggle_class(div, "bn-notify-dark-mode-close-background", /*$app*/ ctx[1].darkMode);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $app;
	component_subscribe($$self, app, $$value => $$invalidate(1, $app = $$value));
	let hovered;
	const mouseenter_handler = () => $$invalidate(0, hovered = true);
	const mouseleave_handler = () => $$invalidate(0, hovered = false);
	return [hovered, $app, mouseenter_handler, mouseleave_handler];
}

class CloseIcon extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1nxfpxx-style")) add_css();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

/* src/elements/NotificationMessage.svelte generated by Svelte v3.24.0 */

function add_css$1() {
	var style = element("style");
	style.id = "svelte-1rj5tzm-style";
	style.textContent = "p.svelte-1rj5tzm{margin:0;font-family:inherit;font-size:inherit}";
	append(document.head, style);
}

function create_fragment$1(ctx) {
	let p;
	let p_class_value;

	return {
		c() {
			p = element("p");

			attr(p, "class", p_class_value = "bn-notify-custom bn-notify-notification-info-message " + (/*$app*/ ctx[1].name
			? `bn-notify-${/*$app*/ ctx[1].name}`
			: "") + " svelte-1rj5tzm");
		},
		m(target, anchor) {
			insert(target, p, anchor);
			p.innerHTML = /*message*/ ctx[0];
		},
		p(ctx, [dirty]) {
			if (dirty & /*message*/ 1) p.innerHTML = /*message*/ ctx[0];
			if (dirty & /*$app*/ 2 && p_class_value !== (p_class_value = "bn-notify-custom bn-notify-notification-info-message " + (/*$app*/ ctx[1].name
			? `bn-notify-${/*$app*/ ctx[1].name}`
			: "") + " svelte-1rj5tzm")) {
				attr(p, "class", p_class_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	let $app;
	component_subscribe($$self, app, $$value => $$invalidate(1, $app = $$value));
	let { message } = $$props;

	$$self.$set = $$props => {
		if ("message" in $$props) $$invalidate(0, message = $$props.message);
	};

	return [message, $app];
}

class NotificationMessage extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1rj5tzm-style")) add_css$1();
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { message: 0 });
	}
}

/* src/elements/Clock.svelte generated by Svelte v3.24.0 */

function add_css$2() {
	var style = element("style");
	style.id = "svelte-1c9mzro-style";
	style.textContent = "svg.svelte-1c9mzro{margin:0 0.25em 0 0.5em}";
	append(document.head, style);
}

function create_fragment$2(ctx) {
	let svg;
	let g;
	let path;

	return {
		c() {
			svg = svg_element("svg");
			g = svg_element("g");
			path = svg_element("path");
			attr(path, "d", "M7.06681227,1.92484595 C10.9634297,1.92484595 14.1336806,5.03922755\n      14.1336806,8.86724251 C14.1336806,12.6953675 10.9634297,15.8096941\n      7.06681227,15.8096941 C3.17019489,15.8096941 1.66977543e-13,12.6953675\n      1.66977543e-13,8.86724251 C1.66977543e-13,5.03922755 3.17019489,1.92484595\n      7.06681227,1.92484595 Z M7.06681227,13.5248129 C9.68105959,13.5248129\n      11.8078517,11.4354643 11.8078517,8.8672425 C11.8078517,8.25643705\n      11.6862119,7.67319541 11.4676859,7.13820421 L7.06334005,8.88946962\n      L7.06334005,4.20972711 C4.45066084,4.2115977 2.32577285,6.30028608\n      2.32577285,8.86724251 C2.32577285,11.4354643 4.45256495,13.5248129\n      7.06681227,13.5248129 Z M5.53007392,1.22124533e-14\n      L8.61626343,1.22124533e-14 L8.61626343,1.6696743 L5.53007392,1.6696743\n      L5.53007392,1.22124533e-14 Z");
			attr(path, "id", "transaction-timer");
			attr(path, "fill", "#AEAEAE");
			attr(path, "fill-rule", "nonzero");
			attr(g, "id", "Notify-Style-Concepts");
			attr(g, "stroke", "none");
			attr(g, "stroke-width", "1");
			attr(g, "fill", "none");
			attr(g, "fill-rule", "evenodd");
			attr(svg, "width", "15px");
			attr(svg, "height", "16px");
			attr(svg, "viewBox", "0 0 15 16");
			attr(svg, "version", "1.1");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
			attr(svg, "class", "svelte-1c9mzro");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, g);
			append(g, path);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

class Clock extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1c9mzro-style")) add_css$2();
		init(this, options, null, create_fragment$2, safe_not_equal, {});
	}
}

/* src/elements/Time.svelte generated by Svelte v3.24.0 */

function add_css$3() {
	var style = element("style");
	style.id = "svelte-6oams7-style";
	style.textContent = "span.svelte-6oams7{font-size:inherit;font-family:inherit;margin-right:0.5em}";
	append(document.head, style);
}

function create_fragment$3(ctx) {
	let span;
	let t;
	let span_class_value;

	return {
		c() {
			span = element("span");
			t = text(/*time*/ ctx[0]);

			attr(span, "class", span_class_value = "bn-notify-custom bn-notify-notification-info-meta-timestamp " + (/*$app*/ ctx[1].name
			? `bn-notify-${/*$app*/ ctx[1].name}`
			: "") + " svelte-6oams7");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, [dirty]) {
			if (dirty & /*time*/ 1) set_data(t, /*time*/ ctx[0]);

			if (dirty & /*$app*/ 2 && span_class_value !== (span_class_value = "bn-notify-custom bn-notify-notification-info-meta-timestamp " + (/*$app*/ ctx[1].name
			? `bn-notify-${/*$app*/ ctx[1].name}`
			: "") + " svelte-6oams7")) {
				attr(span, "class", span_class_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

function instance$2($$self, $$props, $$invalidate) {
	let $app;
	component_subscribe($$self, app, $$value => $$invalidate(1, $app = $$value));
	let { time } = $$props;

	$$self.$set = $$props => {
		if ("time" in $$props) $$invalidate(0, time = $$props.time);
	};

	return [time, $app];
}

class Time extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-6oams7-style")) add_css$3();
		init(this, options, instance$2, create_fragment$3, safe_not_equal, { time: 0 });
	}
}

/* src/elements/Timer.svelte generated by Svelte v3.24.0 */

function add_css$4() {
	var style = element("style");
	style.id = "svelte-fbmqmu-style";
	style.textContent = "span.svelte-fbmqmu{font-size:inherit;font-family:inherit}";
	append(document.head, style);
}

function create_fragment$4(ctx) {
	let span;
	let t;
	let span_class_value;

	return {
		c() {
			span = element("span");
			t = text(/*value*/ ctx[0]);

			attr(span, "class", span_class_value = "bn-notify-custom bn-notify-notification-info-meta-duration-time " + (/*$app*/ ctx[1].name
			? `bn-notify-${/*$app*/ ctx[1].name}`
			: "") + " svelte-fbmqmu");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, [dirty]) {
			if (dirty & /*value*/ 1) set_data(t, /*value*/ ctx[0]);

			if (dirty & /*$app*/ 2 && span_class_value !== (span_class_value = "bn-notify-custom bn-notify-notification-info-meta-duration-time " + (/*$app*/ ctx[1].name
			? `bn-notify-${/*$app*/ ctx[1].name}`
			: "") + " svelte-fbmqmu")) {
				attr(span, "class", span_class_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

function instance$3($$self, $$props, $$invalidate) {
	let $app;
	component_subscribe($$self, app, $$value => $$invalidate(1, $app = $$value));
	let { value } = $$props;

	$$self.$set = $$props => {
		if ("value" in $$props) $$invalidate(0, value = $$props.value);
	};

	return [value, $app];
}

class Timer extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-fbmqmu-style")) add_css$4();
		init(this, options, instance$3, create_fragment$4, safe_not_equal, { value: 0 });
	}
}

/* src/components/NotificationContent.svelte generated by Svelte v3.24.0 */

function add_css$5() {
	var style = element("style");
	style.id = "svelte-1epeibm-style";
	style.textContent = "div.svelte-1epeibm{display:flex;flex-flow:column nowrap;justify-content:center;font-size:inherit;font-family:inherit;margin:0 1.5rem 0 0.75rem}p.svelte-1epeibm{display:flex;align-items:center;margin:0.5em 0 0 0;opacity:0.7;font-size:0.889em;line-height:1.15;font-family:inherit}span.svelte-1epeibm{font-family:inherit;display:flex;align-items:center}";
	append(document.head, style);
}

// (70:4) {#if notification.type === 'pending' && notification.startTime}
function create_if_block(ctx) {
	let span;
	let t0;
	let clock;
	let t1;
	let timer;
	let span_class_value;
	let current;
	clock = new Clock({});

	timer = new Timer({
			props: {
				value: /*timeString*/ ctx[3](/*currentTime*/ ctx[1] - /*notification*/ ctx[0].startTime)
			}
		});

	return {
		c() {
			span = element("span");
			t0 = text("-\n        ");
			create_component(clock.$$.fragment);
			t1 = space();
			create_component(timer.$$.fragment);

			attr(span, "class", span_class_value = "bn-notify-custom bn-notify-notification-info-meta-duration " + (/*$app*/ ctx[2].name
			? `bn-notify-${/*$app*/ ctx[2].name}`
			: "") + " svelte-1epeibm");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t0);
			mount_component(clock, span, null);
			append(span, t1);
			mount_component(timer, span, null);
			current = true;
		},
		p(ctx, dirty) {
			const timer_changes = {};
			if (dirty & /*currentTime, notification*/ 3) timer_changes.value = /*timeString*/ ctx[3](/*currentTime*/ ctx[1] - /*notification*/ ctx[0].startTime);
			timer.$set(timer_changes);

			if (!current || dirty & /*$app*/ 4 && span_class_value !== (span_class_value = "bn-notify-custom bn-notify-notification-info-meta-duration " + (/*$app*/ ctx[2].name
			? `bn-notify-${/*$app*/ ctx[2].name}`
			: "") + " svelte-1epeibm")) {
				attr(span, "class", span_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(clock.$$.fragment, local);
			transition_in(timer.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(clock.$$.fragment, local);
			transition_out(timer.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(span);
			destroy_component(clock);
			destroy_component(timer);
		}
	};
}

function create_fragment$5(ctx) {
	let div;
	let notificationmessage;
	let t0;
	let p;
	let time;
	let t1;
	let p_class_value;
	let div_class_value;
	let current;

	notificationmessage = new NotificationMessage({
			props: { message: /*notification*/ ctx[0].message }
		});

	time = new Time({
			props: {
				time: /*formatTime*/ ctx[4](/*currentTime*/ ctx[1])
			}
		});

	let if_block = /*notification*/ ctx[0].type === "pending" && /*notification*/ ctx[0].startTime && create_if_block(ctx);

	return {
		c() {
			div = element("div");
			create_component(notificationmessage.$$.fragment);
			t0 = space();
			p = element("p");
			create_component(time.$$.fragment);
			t1 = space();
			if (if_block) if_block.c();

			attr(p, "class", p_class_value = "bn-notify-custom bn-notify-notification-info-meta " + (/*$app*/ ctx[2].name
			? `bn-notify-${/*$app*/ ctx[2].name}`
			: "") + " svelte-1epeibm");

			attr(div, "class", div_class_value = "bn-notify-custom bn-notify-notification-info " + (/*$app*/ ctx[2].name
			? `bn-notify-${/*$app*/ ctx[2].name}`
			: "") + " svelte-1epeibm");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(notificationmessage, div, null);
			append(div, t0);
			append(div, p);
			mount_component(time, p, null);
			append(p, t1);
			if (if_block) if_block.m(p, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const notificationmessage_changes = {};
			if (dirty & /*notification*/ 1) notificationmessage_changes.message = /*notification*/ ctx[0].message;
			notificationmessage.$set(notificationmessage_changes);
			const time_changes = {};
			if (dirty & /*currentTime*/ 2) time_changes.time = /*formatTime*/ ctx[4](/*currentTime*/ ctx[1]);
			time.$set(time_changes);

			if (/*notification*/ ctx[0].type === "pending" && /*notification*/ ctx[0].startTime) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*notification*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(p, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (!current || dirty & /*$app*/ 4 && p_class_value !== (p_class_value = "bn-notify-custom bn-notify-notification-info-meta " + (/*$app*/ ctx[2].name
			? `bn-notify-${/*$app*/ ctx[2].name}`
			: "") + " svelte-1epeibm")) {
				attr(p, "class", p_class_value);
			}

			if (!current || dirty & /*$app*/ 4 && div_class_value !== (div_class_value = "bn-notify-custom bn-notify-notification-info " + (/*$app*/ ctx[2].name
			? `bn-notify-${/*$app*/ ctx[2].name}`
			: "") + " svelte-1epeibm")) {
				attr(div, "class", div_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(notificationmessage.$$.fragment, local);
			transition_in(time.$$.fragment, local);
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(notificationmessage.$$.fragment, local);
			transition_out(time.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(notificationmessage);
			destroy_component(time);
			if (if_block) if_block.d();
		}
	};
}

function instance$4($$self, $$props, $$invalidate) {
	let $app;
	let $formatter;
	component_subscribe($$self, app, $$value => $$invalidate(2, $app = $$value));
	component_subscribe($$self, Bt, $$value => $$invalidate(5, $formatter = $$value));
	

	function timeString(time) {
		const seconds = Math.floor(time / 1000);
		const formattedSeconds = seconds < 0 ? 0 : seconds;

		return formattedSeconds >= 60
		? `${Math.floor(formattedSeconds / 60).toLocaleString($app.clientLocale)} ${$formatter("time.minutes")}`
		: `${formattedSeconds.toLocaleString($app.clientLocale)} ${$formatter("time.seconds")}`;
	}

	function formatTime(number) {
		const time = new Date(number);

		return time.toLocaleString($app.clientLocale, {
			hour: "numeric",
			minute: "numeric",
			hour12: true
		});
	}

	let { notification } = $$props;
	let currentTime = Date.now();

	const intervalId = setInterval(
		() => {
			$$invalidate(1, currentTime = Date.now());
		},
		1000
	);

	onDestroy(() => {
		clearInterval(intervalId);
	});

	$$self.$set = $$props => {
		if ("notification" in $$props) $$invalidate(0, notification = $$props.notification);
	};

	return [notification, currentTime, $app, timeString, formatTime];
}

class NotificationContent extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1epeibm-style")) add_css$5();
		init(this, options, instance$4, create_fragment$5, safe_not_equal, { notification: 0 });
	}
}

/* src/components/TypeIcon.svelte generated by Svelte v3.24.0 */

function add_css$6() {
	var style = element("style");
	style.id = "svelte-ta62lj-style";
	style.textContent = "div.svelte-ta62lj{height:100%;font-size:inherit;font-family:inherit}svg.svelte-ta62lj{width:1.3rem}";
	append(document.head, style);
}

// (20:2) {#if type === 'hint'}
function create_if_block_3(ctx) {
	let svg;
	let style;
	let t;
	let g2;
	let g0;
	let circle0;
	let g1;
	let path;
	let circle1;

	return {
		c() {
			svg = svg_element("svg");
			style = svg_element("style");
			t = text("@-webkit-keyframes kf_el_51c2MS41pY_an_cXFUsKhg3V {\n  50% {\n    stroke-dasharray: 553;\n  }\n  0% {\n    stroke-dasharray: 553;\n  }\n  100% {\n    stroke-dasharray: 553;\n  }\n}\n@keyframes kf_el_51c2MS41pY_an_cXFUsKhg3V {\n  50% {\n    stroke-dasharray: 553;\n  }\n  0% {\n    stroke-dasharray: 553;\n  }\n  100% {\n    stroke-dasharray: 553;\n  }\n}\n@-webkit-keyframes kf_el_51c2MS41pY_an_M-ML-YLcm {\n  50% {\n    stroke-dashoffset: 553;\n  }\n  100% {\n    stroke-dashoffset: 0;\n  }\n  0% {\n    stroke-dashoffset: 553;\n  }\n}\n@keyframes kf_el_51c2MS41pY_an_M-ML-YLcm {\n  50% {\n    stroke-dashoffset: 553;\n  }\n  100% {\n    stroke-dashoffset: 0;\n  }\n  0% {\n    stroke-dashoffset: 553;\n  }\n}\n@-webkit-keyframes kf_el_j5HR_U6Nrp_an_KGzPpGvQb {\n  50% {\n    opacity: 0;\n  }\n  56.67% {\n    opacity: 1;\n  }\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes kf_el_j5HR_U6Nrp_an_KGzPpGvQb {\n  50% {\n    opacity: 0;\n  }\n  56.67% {\n    opacity: 1;\n  }\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes kf_el_j5HR_U6Nrp_an_al_MjoEv-F {\n  50% {\n    stroke-dasharray: 39.41;\n  }\n  0% {\n    stroke-dasharray: 39.41;\n  }\n  100% {\n    stroke-dasharray: 39.41;\n  }\n}\n@keyframes kf_el_j5HR_U6Nrp_an_al_MjoEv-F {\n  50% {\n    stroke-dasharray: 39.41;\n  }\n  0% {\n    stroke-dasharray: 39.41;\n  }\n  100% {\n    stroke-dasharray: 39.41;\n  }\n}\n@-webkit-keyframes kf_el_j5HR_U6Nrp_an_VsVMmQ1MU {\n  50% {\n    stroke-dashoffset: 39.41;\n  }\n  100% {\n    stroke-dashoffset: 0;\n  }\n  0% {\n    stroke-dashoffset: 39.41;\n  }\n}\n@keyframes kf_el_j5HR_U6Nrp_an_VsVMmQ1MU {\n  50% {\n    stroke-dashoffset: 39.41;\n  }\n  100% {\n    stroke-dashoffset: 0;\n  }\n  0% {\n    stroke-dashoffset: 39.41;\n  }\n}\n@-webkit-keyframes kf_el_TZApOLwXZU_an_dL6-SZLSH {\n  50% {\n    -webkit-transform: translate(88.50000762939453px, 56.5px)\n      scale(0, 0) translate(-88.50000762939453px, -56.5px);\n    transform: translate(88.50000762939453px, 56.5px) scale(0, 0)\n      translate(-88.50000762939453px, -56.5px);\n  }\n  83.33% {\n    -webkit-transform: translate(88.50000762939453px, 56.5px)\n      scale(0, 0) translate(-88.50000762939453px, -56.5px);\n    transform: translate(88.50000762939453px, 56.5px) scale(0, 0)\n      translate(-88.50000762939453px, -56.5px);\n  }\n  100% {\n    -webkit-transform: translate(88.50000762939453px, 56.5px)\n      scale(1, 1) translate(-88.50000762939453px, -56.5px);\n    transform: translate(88.50000762939453px, 56.5px) scale(1, 1)\n      translate(-88.50000762939453px, -56.5px);\n  }\n  0% {\n    -webkit-transform: translate(88.50000762939453px, 56.5px)\n      scale(0, 0) translate(-88.50000762939453px, -56.5px);\n    transform: translate(88.50000762939453px, 56.5px) scale(0, 0)\n      translate(-88.50000762939453px, -56.5px);\n  }\n}\n@keyframes kf_el_TZApOLwXZU_an_dL6-SZLSH {\n  50% {\n    -webkit-transform: translate(88.50000762939453px, 56.5px)\n      scale(0, 0) translate(-88.50000762939453px, -56.5px);\n    transform: translate(88.50000762939453px, 56.5px) scale(0, 0)\n      translate(-88.50000762939453px, -56.5px);\n  }\n  83.33% {\n    -webkit-transform: translate(88.50000762939453px, 56.5px)\n      scale(0, 0) translate(-88.50000762939453px, -56.5px);\n    transform: translate(88.50000762939453px, 56.5px) scale(0, 0)\n      translate(-88.50000762939453px, -56.5px);\n  }\n  100% {\n    -webkit-transform: translate(88.50000762939453px, 56.5px)\n      scale(1, 1) translate(-88.50000762939453px, -56.5px);\n    transform: translate(88.50000762939453px, 56.5px) scale(1, 1)\n      translate(-88.50000762939453px, -56.5px);\n  }\n  0% {\n    -webkit-transform: translate(88.50000762939453px, 56.5px)\n      scale(0, 0) translate(-88.50000762939453px, -56.5px);\n    transform: translate(88.50000762939453px, 56.5px) scale(0, 0)\n      translate(-88.50000762939453px, -56.5px);\n  }\n}\n#el_DHAskxC2T * {\n  -webkit-animation-duration: 1s;\n  animation-duration: 1s;\n  -webkit-animation-iteration-count: 1;\n  animation-iteration-count: 1;\n  -webkit-animation-timing-function: cubic-bezier(0, 0, 1, 1);\n  animation-timing-function: cubic-bezier(0, 0, 1, 1);\n}\n#el__hILOKhuR3 {\n  fill: none;\n  -webkit-transform: translate(7px, 7px);\n  transform: translate(7px, 7px);\n}\n#el_TZApOLwXZU {\n  fill: #979797;\n  -webkit-transform: matrix(1, 0, 0, -1, 0, 113);\n  transform: matrix(1, 0, 0, -1, 0, 113);\n}\n#el_fIxIrV8WbF {\n  stroke: #979797;\n  stroke-width: 14;\n}\n#el_TZApOLwXZU_an_dL6-SZLSH {\n  -webkit-animation-fill-mode: forwards;\n  animation-fill-mode: forwards;\n  -webkit-animation-name: kf_el_TZApOLwXZU_an_dL6-SZLSH;\n  animation-name: kf_el_TZApOLwXZU_an_dL6-SZLSH;\n  -webkit-animation-timing-function: cubic-bezier(0, 0, 1, 1);\n  animation-timing-function: cubic-bezier(0, 0, 1, 1);\n}\n#el_j5HR_U6Nrp {\n  -webkit-animation-fill-mode: forwards, forwards, forwards;\n  animation-fill-mode: forwards, forwards, forwards;\n  -webkit-animation-name: kf_el_j5HR_U6Nrp_an_VsVMmQ1MU,\n    kf_el_j5HR_U6Nrp_an_al_MjoEv-F, kf_el_j5HR_U6Nrp_an_KGzPpGvQb;\n  animation-name: kf_el_j5HR_U6Nrp_an_VsVMmQ1MU,\n    kf_el_j5HR_U6Nrp_an_al_MjoEv-F, kf_el_j5HR_U6Nrp_an_KGzPpGvQb;\n  -webkit-animation-timing-function: cubic-bezier(0, 0, 1, 1),\n    cubic-bezier(0, 0, 1, 1), cubic-bezier(0, 0, 1, 1);\n  animation-timing-function: cubic-bezier(0, 0, 1, 1),\n    cubic-bezier(0, 0, 1, 1), cubic-bezier(0, 0, 1, 1);\n}\n#el_51c2MS41pY {\n  -webkit-animation-fill-mode: forwards, forwards;\n  animation-fill-mode: forwards, forwards;\n  -webkit-animation-name: kf_el_51c2MS41pY_an_M-ML-YLcm,\n    kf_el_51c2MS41pY_an_cXFUsKhg3V;\n  animation-name: kf_el_51c2MS41pY_an_M-ML-YLcm,\n    kf_el_51c2MS41pY_an_cXFUsKhg3V;\n  -webkit-animation-timing-function: cubic-bezier(0, 0, 1, 1),\n    cubic-bezier(0, 0, 1, 1);\n  animation-timing-function: cubic-bezier(0, 0, 1, 1),\n    cubic-bezier(0, 0, 1, 1);\n}\n      ");
			g2 = svg_element("g");
			g0 = svg_element("g");
			circle0 = svg_element("circle");
			g1 = svg_element("g");
			path = svg_element("path");
			circle1 = svg_element("circle");
			attr(circle0, "cx", "88.5");
			attr(circle0, "cy", "56.5");
			attr(circle0, "r", "7.5");
			attr(circle0, "id", "el_TZApOLwXZU");
			attr(g0, "id", "el_TZApOLwXZU_an_dL6-SZLSH");
			attr(g0, "data-animator-group", "true");
			attr(g0, "data-animator-type", "2");
			attr(path, "d", "m88.5 128v-39.4130859");
			attr(path, "stroke-linecap", "round");
			attr(path, "stroke-linejoin", "round");
			attr(path, "id", "el_j5HR_U6Nrp");
			attr(circle1, "cx", "88");
			attr(circle1, "cy", "88");
			attr(circle1, "r", "88");
			attr(circle1, "id", "el_51c2MS41pY");
			attr(g1, "id", "el_fIxIrV8WbF");
			attr(g2, "fill-rule", "evenodd");
			attr(g2, "id", "el__hILOKhuR3");
			attr(svg, "viewBox", "0 0 190 190");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "id", "el_DHAskxC2T");
			attr(svg, "class", "svelte-ta62lj");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, style);
			append(style, t);
			append(svg, g2);
			append(g2, g0);
			append(g0, circle0);
			append(g2, g1);
			append(g1, path);
			append(g1, circle1);
		},
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

// (268:2) {#if type === 'pending'}
function create_if_block_2(ctx) {
	let svg;
	let style;
	let t;
	let g3;
	let circle;
	let g2;
	let g0;
	let path0;
	let g1;
	let path1;

	return {
		c() {
			svg = svg_element("svg");
			style = svg_element("style");
			t = text("@-webkit-keyframes kf_el_fv0z90vBrL_an_PwUBZ96LS {\n  0% {\n    -webkit-transform: translate(88px, 87.587890625px) rotate(0deg)\n      translate(-88px, -87.587890625px);\n    transform: translate(88px, 87.587890625px) rotate(0deg)\n      translate(-88px, -87.587890625px);\n  }\n  100% {\n    -webkit-transform: translate(88px, 87.587890625px) rotate(360deg)\n      translate(-88px, -87.587890625px);\n    transform: translate(88px, 87.587890625px) rotate(360deg)\n      translate(-88px, -87.587890625px);\n  }\n}\n@keyframes kf_el_fv0z90vBrL_an_PwUBZ96LS {\n  0% {\n    -webkit-transform: translate(88px, 87.587890625px) rotate(0deg)\n      translate(-88px, -87.587890625px);\n    transform: translate(88px, 87.587890625px) rotate(0deg)\n      translate(-88px, -87.587890625px);\n  }\n  100% {\n    -webkit-transform: translate(88px, 87.587890625px) rotate(360deg)\n      translate(-88px, -87.587890625px);\n    transform: translate(88px, 87.587890625px) rotate(360deg)\n      translate(-88px, -87.587890625px);\n  }\n}\n@-webkit-keyframes kf_el_u3QHGLTow3_an_EQ8OetHGq {\n  0% {\n    -webkit-transform: translate(88px, 87.587890625px) rotate(0deg)\n      translate(-88px, -87.587890625px);\n    transform: translate(88px, 87.587890625px) rotate(0deg)\n      translate(-88px, -87.587890625px);\n  }\n  50% {\n    -webkit-transform: translate(88px, 87.587890625px) rotate(360deg)\n      translate(-88px, -87.587890625px);\n    transform: translate(88px, 87.587890625px) rotate(360deg)\n      translate(-88px, -87.587890625px);\n  }\n  100% {\n    -webkit-transform: translate(88px, 87.587890625px) rotate(720deg)\n      translate(-88px, -87.587890625px);\n    transform: translate(88px, 87.587890625px) rotate(720deg)\n      translate(-88px, -87.587890625px);\n  }\n}\n@keyframes kf_el_u3QHGLTow3_an_EQ8OetHGq {\n  0% {\n    -webkit-transform: translate(88px, 87.587890625px) rotate(0deg)\n      translate(-88px, -87.587890625px);\n    transform: translate(88px, 87.587890625px) rotate(0deg)\n      translate(-88px, -87.587890625px);\n  }\n  50% {\n    -webkit-transform: translate(88px, 87.587890625px) rotate(360deg)\n      translate(-88px, -87.587890625px);\n    transform: translate(88px, 87.587890625px) rotate(360deg)\n      translate(-88px, -87.587890625px);\n  }\n  100% {\n    -webkit-transform: translate(88px, 87.587890625px) rotate(720deg)\n      translate(-88px, -87.587890625px);\n    transform: translate(88px, 87.587890625px) rotate(720deg)\n      translate(-88px, -87.587890625px);\n  }\n}\n#el_XWLVvD_rP * {\n  -webkit-animation-duration: 2s;\n  animation-duration: 2s;\n  -webkit-animation-iteration-count: infinite;\n  animation-iteration-count: infinite;\n  -webkit-animation-timing-function: cubic-bezier(0, 0, 1, 1);\n  animation-timing-function: cubic-bezier(0, 0, 1, 1);\n}\n#el_Uh6HOhkAVi {\n  fill: none;\n  stroke-width: 14;\n  -webkit-transform: translate(7px, 7px);\n  transform: translate(7px, 7px);\n}\n#el_PHAWgO26lN {\n  stroke: #ffbd00;\n}\n#el_A4XF5QQwhp {\n  stroke: #ffbf00;\n}\n#el_u3QHGLTow3_an_EQ8OetHGq {\n  -webkit-animation-fill-mode: backwards;\n  animation-fill-mode: backwards;\n  -webkit-transform: translate(88px, 87.587890625px) rotate(0deg)\n    translate(-88px, -87.587890625px);\n  transform: translate(88px, 87.587890625px) rotate(0deg)\n    translate(-88px, -87.587890625px);\n  -webkit-animation-name: kf_el_u3QHGLTow3_an_EQ8OetHGq;\n  animation-name: kf_el_u3QHGLTow3_an_EQ8OetHGq;\n  -webkit-animation-timing-function: cubic-bezier(0, 0, 1, 1);\n  animation-timing-function: cubic-bezier(0, 0, 1, 1);\n}\n#el_fv0z90vBrL_an_PwUBZ96LS {\n  -webkit-animation-fill-mode: backwards;\n  animation-fill-mode: backwards;\n  -webkit-transform: translate(88px, 87.587890625px) rotate(0deg)\n    translate(-88px, -87.587890625px);\n  transform: translate(88px, 87.587890625px) rotate(0deg)\n    translate(-88px, -87.587890625px);\n  -webkit-animation-name: kf_el_fv0z90vBrL_an_PwUBZ96LS;\n  animation-name: kf_el_fv0z90vBrL_an_PwUBZ96LS;\n  -webkit-animation-timing-function: cubic-bezier(0, 0, 1, 1);\n  animation-timing-function: cubic-bezier(0, 0, 1, 1);\n}\n      ");
			g3 = svg_element("g");
			circle = svg_element("circle");
			g2 = svg_element("g");
			g0 = svg_element("g");
			path0 = svg_element("path");
			g1 = svg_element("g");
			path1 = svg_element("path");
			attr(circle, "cx", "88");
			attr(circle, "cy", "88");
			attr(circle, "r", "88");
			attr(circle, "id", "el_PHAWgO26lN");
			attr(path0, "d", "m88 25v62.5878906");
			attr(path0, "id", "el_fv0z90vBrL");
			attr(g0, "id", "el_fv0z90vBrL_an_PwUBZ96LS");
			attr(g0, "data-animator-group", "true");
			attr(g0, "data-animator-type", "1");
			attr(path1, "d", "m88 45.9160156v41.671875");
			attr(path1, "id", "el_u3QHGLTow3");
			attr(g1, "id", "el_u3QHGLTow3_an_EQ8OetHGq");
			attr(g1, "data-animator-group", "true");
			attr(g1, "data-animator-type", "1");
			attr(g2, "stroke-linecap", "round");
			attr(g2, "stroke-linejoin", "round");
			attr(g2, "id", "el_A4XF5QQwhp");
			attr(g3, "fill-rule", "evenodd");
			attr(g3, "id", "el_Uh6HOhkAVi");
			attr(svg, "viewBox", "0 0 190 190");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "id", "el_XWLVvD_rP");
			attr(svg, "class", "svelte-ta62lj");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, style);
			append(style, t);
			append(svg, g3);
			append(g3, circle);
			append(g3, g2);
			append(g2, g0);
			append(g0, path0);
			append(g2, g1);
			append(g1, path1);
		},
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

// (407:2) {#if type === 'success'}
function create_if_block_1(ctx) {
	let svg;
	let style;
	let t;
	let path;

	return {
		c() {
			svg = svg_element("svg");
			style = svg_element("style");
			t = text("@-webkit-keyframes kf_el_RzYtw9rUyN_an_gX4OsFPwzz {\n  0% {\n    stroke-dasharray: 473.87;\n  }\n  100% {\n    stroke-dasharray: 473.87;\n  }\n}\n@keyframes kf_el_RzYtw9rUyN_an_gX4OsFPwzz {\n  0% {\n    stroke-dasharray: 473.87;\n  }\n  100% {\n    stroke-dasharray: 473.87;\n  }\n}\n@-webkit-keyframes kf_el_RzYtw9rUyN_an_WfcYZ9pjL {\n  0% {\n    stroke-dashoffset: 473.87;\n  }\n  50% {\n    stroke-dashoffset: 473.87;\n  }\n  100% {\n    stroke-dashoffset: 0;\n  }\n}\n@keyframes kf_el_RzYtw9rUyN_an_WfcYZ9pjL {\n  0% {\n    stroke-dashoffset: 473.87;\n  }\n  50% {\n    stroke-dashoffset: 473.87;\n  }\n  100% {\n    stroke-dashoffset: 0;\n  }\n}\n#el_3OA8Szq_A * {\n  -webkit-animation-duration: 1s;\n  animation-duration: 1s;\n  -webkit-animation-iteration-count: 1;\n  animation-iteration-count: 1;\n  -webkit-animation-timing-function: cubic-bezier(0, 0, 1, 1);\n  animation-timing-function: cubic-bezier(0, 0, 1, 1);\n}\n#el_RzYtw9rUyN {\n  fill: none;\n  stroke: #7ed321;\n  stroke-width: 17;\n  -webkit-animation-fill-mode: forwards, forwards;\n  animation-fill-mode: forwards, forwards;\n  -webkit-animation-name: kf_el_RzYtw9rUyN_an_WfcYZ9pjL,\n    kf_el_RzYtw9rUyN_an_gX4OsFPwzz;\n  animation-name: kf_el_RzYtw9rUyN_an_WfcYZ9pjL,\n    kf_el_RzYtw9rUyN_an_gX4OsFPwzz;\n  -webkit-animation-timing-function: cubic-bezier(0, 0, 1, 1),\n    cubic-bezier(0, 0, 1, 1);\n  animation-timing-function: cubic-bezier(0, 0, 1, 1),\n    cubic-bezier(0, 0, 1, 1);\n}\n      ");
			path = svg_element("path");
			attr(path, "d", "m176.126953 63.8789062-94.4130858 95.4130858-72.87402345-72.8740232\n        27.93945315-27.9394532 44.9345703 44.9345704 94.4130858-94.413086");
			attr(path, "stroke-linecap", "round");
			attr(path, "stroke-linejoin", "round");
			attr(path, "id", "el_RzYtw9rUyN");
			attr(svg, "viewBox", "0 0 185 168");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "id", "el_3OA8Szq_A");
			attr(svg, "class", "svelte-ta62lj");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, style);
			append(style, t);
			append(svg, path);
		},
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

// (484:2) {#if type === 'error'}
function create_if_block$1(ctx) {
	let svg;
	let style;
	let t;
	let g1;
	let path0;
	let g0;
	let circle;
	let path1;

	return {
		c() {
			svg = svg_element("svg");
			style = svg_element("style");
			t = text("@-webkit-keyframes kf_el_IAuv9ut-2-_an_xlDuvYsRc {\n  50% {\n    opacity: 0;\n  }\n  66.67% {\n    opacity: 1;\n  }\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes kf_el_IAuv9ut-2-_an_xlDuvYsRc {\n  50% {\n    opacity: 0;\n  }\n  66.67% {\n    opacity: 1;\n  }\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes kf_el_IAuv9ut-2-_an_29XE36SGo1 {\n  50% {\n    stroke-dasharray: 39.41;\n  }\n  0% {\n    stroke-dasharray: 39.41;\n  }\n  100% {\n    stroke-dasharray: 39.41;\n  }\n}\n@keyframes kf_el_IAuv9ut-2-_an_29XE36SGo1 {\n  50% {\n    stroke-dasharray: 39.41;\n  }\n  0% {\n    stroke-dasharray: 39.41;\n  }\n  100% {\n    stroke-dasharray: 39.41;\n  }\n}\n@-webkit-keyframes kf_el_IAuv9ut-2-_an_xo_EIWruT {\n  50% {\n    stroke-dashoffset: 39.41;\n  }\n  100% {\n    stroke-dashoffset: 0;\n  }\n  0% {\n    stroke-dashoffset: 39.41;\n  }\n}\n@keyframes kf_el_IAuv9ut-2-_an_xo_EIWruT {\n  50% {\n    stroke-dashoffset: 39.41;\n  }\n  100% {\n    stroke-dashoffset: 0;\n  }\n  0% {\n    stroke-dashoffset: 39.41;\n  }\n}\n@-webkit-keyframes kf_el_q_eIK0z3HI_an_045tZJOHl {\n  50% {\n    -webkit-transform: translate(88.50000762939453px, 144.5px)\n      scale(0, 0) translate(-88.50000762939453px, -144.5px);\n    transform: translate(88.50000762939453px, 144.5px) scale(0, 0)\n      translate(-88.50000762939453px, -144.5px);\n  }\n  83.33% {\n    -webkit-transform: translate(88.50000762939453px, 144.5px)\n      scale(0, 0) translate(-88.50000762939453px, -144.5px);\n    transform: translate(88.50000762939453px, 144.5px) scale(0, 0)\n      translate(-88.50000762939453px, -144.5px);\n  }\n  100% {\n    -webkit-transform: translate(88.50000762939453px, 144.5px)\n      scale(1, 1) translate(-88.50000762939453px, -144.5px);\n    transform: translate(88.50000762939453px, 144.5px) scale(1, 1)\n      translate(-88.50000762939453px, -144.5px);\n  }\n  0% {\n    -webkit-transform: translate(88.50000762939453px, 144.5px)\n      scale(0, 0) translate(-88.50000762939453px, -144.5px);\n    transform: translate(88.50000762939453px, 144.5px) scale(0, 0)\n      translate(-88.50000762939453px, -144.5px);\n  }\n}\n@keyframes kf_el_q_eIK0z3HI_an_045tZJOHl {\n  50% {\n    -webkit-transform: translate(88.50000762939453px, 144.5px)\n      scale(0, 0) translate(-88.50000762939453px, -144.5px);\n    transform: translate(88.50000762939453px, 144.5px) scale(0, 0)\n      translate(-88.50000762939453px, -144.5px);\n  }\n  83.33% {\n    -webkit-transform: translate(88.50000762939453px, 144.5px)\n      scale(0, 0) translate(-88.50000762939453px, -144.5px);\n    transform: translate(88.50000762939453px, 144.5px) scale(0, 0)\n      translate(-88.50000762939453px, -144.5px);\n  }\n  100% {\n    -webkit-transform: translate(88.50000762939453px, 144.5px)\n      scale(1, 1) translate(-88.50000762939453px, -144.5px);\n    transform: translate(88.50000762939453px, 144.5px) scale(1, 1)\n      translate(-88.50000762939453px, -144.5px);\n  }\n  0% {\n    -webkit-transform: translate(88.50000762939453px, 144.5px)\n      scale(0, 0) translate(-88.50000762939453px, -144.5px);\n    transform: translate(88.50000762939453px, 144.5px) scale(0, 0)\n      translate(-88.50000762939453px, -144.5px);\n  }\n}\n@-webkit-keyframes kf_el_5BNAI_PBsn_an_aToWhdlG8F {\n  50% {\n    stroke-dasharray: 527.67;\n  }\n  0% {\n    stroke-dasharray: 527.67;\n  }\n  100% {\n    stroke-dasharray: 527.67;\n  }\n}\n@keyframes kf_el_5BNAI_PBsn_an_aToWhdlG8F {\n  50% {\n    stroke-dasharray: 527.67;\n  }\n  0% {\n    stroke-dasharray: 527.67;\n  }\n  100% {\n    stroke-dasharray: 527.67;\n  }\n}\n@-webkit-keyframes kf_el_5BNAI_PBsn_an_tQV_CQebU {\n  50% {\n    stroke-dashoffset: 527.67;\n  }\n  100% {\n    stroke-dashoffset: 0;\n  }\n  0% {\n    stroke-dashoffset: 527.67;\n  }\n}\n@keyframes kf_el_5BNAI_PBsn_an_tQV_CQebU {\n  50% {\n    stroke-dashoffset: 527.67;\n  }\n  100% {\n    stroke-dashoffset: 0;\n  }\n  0% {\n    stroke-dashoffset: 527.67;\n  }\n}\n#el_bYTVKD04y * {\n  -webkit-animation-duration: 1s;\n  animation-duration: 1s;\n  -webkit-animation-iteration-count: 1;\n  animation-iteration-count: 1;\n  -webkit-animation-timing-function: cubic-bezier(0, 0, 1, 1);\n  animation-timing-function: cubic-bezier(0, 0, 1, 1);\n}\n#el_doMgf96Cxx {\n  fill: none;\n  -webkit-transform: translate(1px, -5px);\n  transform: translate(1px, -5px);\n}\n#el_5BNAI_PBsn {\n  stroke: #ff0039;\n  stroke-width: 14;\n  -webkit-animation-fill-mode: forwards, forwards;\n  animation-fill-mode: forwards, forwards;\n  -webkit-animation-name: kf_el_5BNAI_PBsn_an_tQV_CQebU,\n    kf_el_5BNAI_PBsn_an_aToWhdlG8F;\n  animation-name: kf_el_5BNAI_PBsn_an_tQV_CQebU,\n    kf_el_5BNAI_PBsn_an_aToWhdlG8F;\n  -webkit-animation-timing-function: cubic-bezier(0, 0, 1, 1),\n    cubic-bezier(0, 0, 1, 1);\n  animation-timing-function: cubic-bezier(0, 0, 1, 1),\n    cubic-bezier(0, 0, 1, 1);\n}\n#el_q_eIK0z3HI {\n  fill: #ff0042;\n}\n#el_IAuv9ut-2- {\n  stroke: #ff0042;\n  stroke-width: 14;\n  -webkit-animation-fill-mode: forwards, forwards, forwards;\n  animation-fill-mode: forwards, forwards, forwards;\n  -webkit-animation-name: kf_el_IAuv9ut-2-_an_xo_EIWruT,\n    kf_el_IAuv9ut-2-_an_29XE36SGo1, kf_el_IAuv9ut-2-_an_xlDuvYsRc;\n  animation-name: kf_el_IAuv9ut-2-_an_xo_EIWruT,\n    kf_el_IAuv9ut-2-_an_29XE36SGo1, kf_el_IAuv9ut-2-_an_xlDuvYsRc;\n  -webkit-animation-timing-function: cubic-bezier(0, 0, 1, 1),\n    cubic-bezier(0, 0, 1, 1), cubic-bezier(0, 0, 1, 1);\n  animation-timing-function: cubic-bezier(0, 0, 1, 1),\n    cubic-bezier(0, 0, 1, 1), cubic-bezier(0, 0, 1, 1);\n}\n#el_q_eIK0z3HI_an_045tZJOHl {\n  -webkit-animation-fill-mode: forwards;\n  animation-fill-mode: forwards;\n  -webkit-animation-name: kf_el_q_eIK0z3HI_an_045tZJOHl;\n  animation-name: kf_el_q_eIK0z3HI_an_045tZJOHl;\n  -webkit-animation-timing-function: cubic-bezier(0, 0, 1, 1);\n  animation-timing-function: cubic-bezier(0, 0, 1, 1);\n}\n      ");
			g1 = svg_element("g");
			path0 = svg_element("path");
			g0 = svg_element("g");
			circle = svg_element("circle");
			path1 = svg_element("path");
			attr(path0, "d", "m96.9442719 17.8885438 71.8196601 143.6393202c2.469893\n          4.939785.467649 10.946515-4.472136 13.416408-1.388554.694277-2.919685\n          1.055728-4.472136 1.055728h-143.6393201c-5.5228475\n          0-10.00000001-4.477153-10.00000001-10 0-1.552451.36145092-3.083582\n          1.05572809-4.472136l71.81966012-143.6393202c2.4698925-4.939785\n          8.4766229-6.9420284 13.4164079-4.4721359 1.935274.967637 3.5044989\n          2.5368619 4.4721359 4.4721359z");
			attr(path0, "stroke-linejoin", "round");
			attr(path0, "id", "el_5BNAI_PBsn");
			attr(circle, "cx", "88.5");
			attr(circle, "cy", "144.5");
			attr(circle, "r", "7.5");
			attr(circle, "id", "el_q_eIK0z3HI");
			attr(g0, "id", "el_q_eIK0z3HI_an_045tZJOHl");
			attr(g0, "data-animator-group", "true");
			attr(g0, "data-animator-type", "2");
			attr(path1, "d", "m88.5 112.413086v-39.413086");
			attr(path1, "stroke-linecap", "round");
			attr(path1, "stroke-linejoin", "round");
			attr(path1, "id", "el_IAuv9ut-2-");
			attr(g1, "fill-rule", "evenodd");
			attr(g1, "id", "el_doMgf96Cxx");
			attr(svg, "viewBox", "0 0 178 178");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "id", "el_bYTVKD04y");
			attr(svg, "class", "svelte-ta62lj");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, style);
			append(style, t);
			append(svg, g1);
			append(g1, path0);
			append(g1, g0);
			append(g0, circle);
			append(g1, path1);
		},
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

function create_fragment$6(ctx) {
	let div;
	let t0;
	let t1;
	let t2;
	let div_class_value;
	let if_block0 = /*type*/ ctx[0] === "hint" && create_if_block_3();
	let if_block1 = /*type*/ ctx[0] === "pending" && create_if_block_2();
	let if_block2 = /*type*/ ctx[0] === "success" && create_if_block_1();
	let if_block3 = /*type*/ ctx[0] === "error" && create_if_block$1();

	return {
		c() {
			div = element("div");
			if (if_block0) if_block0.c();
			t0 = space();
			if (if_block1) if_block1.c();
			t1 = space();
			if (if_block2) if_block2.c();
			t2 = space();
			if (if_block3) if_block3.c();

			attr(div, "class", div_class_value = "bn-notify-custom bn-notify-notification-status-icon " + (/*$app*/ ctx[1].name
			? `bn-notify-${/*$app*/ ctx[1].name}`
			: "") + " svelte-ta62lj");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if (if_block0) if_block0.m(div, null);
			append(div, t0);
			if (if_block1) if_block1.m(div, null);
			append(div, t1);
			if (if_block2) if_block2.m(div, null);
			append(div, t2);
			if (if_block3) if_block3.m(div, null);
		},
		p(ctx, [dirty]) {
			if (/*type*/ ctx[0] === "hint") {
				if (if_block0) ; else {
					if_block0 = create_if_block_3();
					if_block0.c();
					if_block0.m(div, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*type*/ ctx[0] === "pending") {
				if (if_block1) ; else {
					if_block1 = create_if_block_2();
					if_block1.c();
					if_block1.m(div, t1);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (/*type*/ ctx[0] === "success") {
				if (if_block2) ; else {
					if_block2 = create_if_block_1();
					if_block2.c();
					if_block2.m(div, t2);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (/*type*/ ctx[0] === "error") {
				if (if_block3) ; else {
					if_block3 = create_if_block$1();
					if_block3.c();
					if_block3.m(div, null);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if (dirty & /*$app*/ 2 && div_class_value !== (div_class_value = "bn-notify-custom bn-notify-notification-status-icon " + (/*$app*/ ctx[1].name
			? `bn-notify-${/*$app*/ ctx[1].name}`
			: "") + " svelte-ta62lj")) {
				attr(div, "class", div_class_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
		}
	};
}

function instance$5($$self, $$props, $$invalidate) {
	let $app;
	component_subscribe($$self, app, $$value => $$invalidate(1, $app = $$value));
	let { type } = $$props;

	$$self.$set = $$props => {
		if ("type" in $$props) $$invalidate(0, type = $$props.type);
	};

	return [type, $app];
}

class TypeIcon extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-ta62lj-style")) add_css$6();
		init(this, options, instance$5, create_fragment$6, safe_not_equal, { type: 0 });
	}
}

/* src/components/AutoDismiss.svelte generated by Svelte v3.24.0 */

function instance$6($$self, $$props, $$invalidate) {
	
	let { notification } = $$props;

	if (notification.autoDismiss && notification.id) {
		setTimeout(
			() => {
				notifications.remove(notification.id, notification.eventCode);
			},
			notification.autoDismiss
		);
	}

	$$self.$set = $$props => {
		if ("notification" in $$props) $$invalidate(0, notification = $$props.notification);
	};

	return [notification];
}

class AutoDismiss extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$6, null, safe_not_equal, { notification: 0 });
	}
}

/* src/views/Notify.svelte generated by Svelte v3.24.0 */

function add_css$7() {
	var style = element("style");
	style.id = "svelte-t2ve4g-style";
	style.textContent = "ul.svelte-t2ve4g{display:flex;flex-flow:column nowrap;position:fixed;font-size:16px;padding:0 0.75em;margin:0;list-style-type:none;width:18rem;bottom:0;right:0;font-family:'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;max-height:100vh;overflow-y:scroll;overflow-x:hidden;color:#4a4a4a;background:transparent;scrollbar-width:none;box-sizing:border-box;height:100vh;pointer-events:none;z-index:99999999}@media only screen and (max-width: 450px){ul.svelte-t2ve4g{width:100%}}.bn-notify-custom.bn-notify-dark-mode{background:#283944;color:#ffffff;background:rgba(40, 57, 68, 0.9)}.bn-notify-clickable:hover{cursor:pointer}.svelte-t2ve4g::-webkit-scrollbar{display:none}li.svelte-t2ve4g{position:relative;display:flex;padding:0.75em;font-size:0.889em;font-family:inherit;border-radius:10px;background:#ffffff;box-shadow:0px 2px 10px rgba(0, 0, 0, 0.1);color:inherit;transition:background 300ms ease-in-out, color 300ms ease-in-out;pointer-events:all;background:#ffffff;backdrop-filter:blur(5px);background:rgba(255, 255, 255, 0.9)}div.svelte-t2ve4g{position:absolute;top:0.75em;right:0.75em;font-size:inherit;font-family:inherit}a.svelte-t2ve4g{display:flex;text-decoration:none;color:inherit}";
	append(document.head, style);
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[10] = list[i];
	return child_ctx;
}

// (159:0) {#if $notifications.length > 0}
function create_if_block$2(ctx) {
	let ul;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let ul_class_value;
	let ul_style_value;
	let current;
	let each_value = /*$notifications*/ ctx[6];
	const get_key = ctx => /*notification*/ ctx[10].key;

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}

	return {
		c() {
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(ul, "class", ul_class_value = "bn-notify-custom bn-notify-notifications " + (/*$app*/ ctx[5].name
			? `bn-notify-${/*$app*/ ctx[5].name}`
			: "") + " svelte-t2ve4g");

			attr(ul, "style", ul_style_value = `${/*positioning*/ ctx[0]} ${/*justifyContent*/ ctx[4]}`);
		},
		m(target, anchor) {
			insert(target, ul, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (dirty & /*notificationMargin, $notifications, $app, notifications*/ 104) {
				const each_value = /*$notifications*/ ctx[6];
				group_outros();
				for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].r();
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, ul, fix_and_outro_and_destroy_block, create_each_block, null, get_each_context);
				for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].a();
				check_outros();
			}

			if (!current || dirty & /*$app*/ 32 && ul_class_value !== (ul_class_value = "bn-notify-custom bn-notify-notifications " + (/*$app*/ ctx[5].name
			? `bn-notify-${/*$app*/ ctx[5].name}`
			: "") + " svelte-t2ve4g")) {
				attr(ul, "class", ul_class_value);
			}

			if (!current || dirty & /*positioning, justifyContent*/ 17 && ul_style_value !== (ul_style_value = `${/*positioning*/ ctx[0]} ${/*justifyContent*/ ctx[4]}`)) {
				attr(ul, "style", ul_style_value);
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}
		}
	};
}

// (183:8) {:else}
function create_else_block(ctx) {
	let typeicon;
	let t;
	let notificationcontent;
	let current;

	typeicon = new TypeIcon({
			props: { type: /*notification*/ ctx[10].type }
		});

	notificationcontent = new NotificationContent({
			props: { notification: /*notification*/ ctx[10] }
		});

	return {
		c() {
			create_component(typeicon.$$.fragment);
			t = space();
			create_component(notificationcontent.$$.fragment);
		},
		m(target, anchor) {
			mount_component(typeicon, target, anchor);
			insert(target, t, anchor);
			mount_component(notificationcontent, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const typeicon_changes = {};
			if (dirty & /*$notifications*/ 64) typeicon_changes.type = /*notification*/ ctx[10].type;
			typeicon.$set(typeicon_changes);
			const notificationcontent_changes = {};
			if (dirty & /*$notifications*/ 64) notificationcontent_changes.notification = /*notification*/ ctx[10];
			notificationcontent.$set(notificationcontent_changes);
		},
		i(local) {
			if (current) return;
			transition_in(typeicon.$$.fragment, local);
			transition_in(notificationcontent.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(typeicon.$$.fragment, local);
			transition_out(notificationcontent.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(typeicon, detaching);
			if (detaching) detach(t);
			destroy_component(notificationcontent, detaching);
		}
	};
}

// (174:8) {#if notification.link}
function create_if_block_1$1(ctx) {
	let a;
	let typeicon;
	let t;
	let notificationcontent;
	let a_href_value;
	let current;

	typeicon = new TypeIcon({
			props: { type: /*notification*/ ctx[10].type }
		});

	notificationcontent = new NotificationContent({
			props: { notification: /*notification*/ ctx[10] }
		});

	return {
		c() {
			a = element("a");
			create_component(typeicon.$$.fragment);
			t = space();
			create_component(notificationcontent.$$.fragment);
			attr(a, "class", "bn-notify-notification-link svelte-t2ve4g");
			attr(a, "href", a_href_value = /*notification*/ ctx[10].link);
			attr(a, "target", "_blank");
			attr(a, "rel", "noreferrer noopener");
		},
		m(target, anchor) {
			insert(target, a, anchor);
			mount_component(typeicon, a, null);
			append(a, t);
			mount_component(notificationcontent, a, null);
			current = true;
		},
		p(ctx, dirty) {
			const typeicon_changes = {};
			if (dirty & /*$notifications*/ 64) typeicon_changes.type = /*notification*/ ctx[10].type;
			typeicon.$set(typeicon_changes);
			const notificationcontent_changes = {};
			if (dirty & /*$notifications*/ 64) notificationcontent_changes.notification = /*notification*/ ctx[10];
			notificationcontent.$set(notificationcontent_changes);

			if (!current || dirty & /*$notifications*/ 64 && a_href_value !== (a_href_value = /*notification*/ ctx[10].link)) {
				attr(a, "href", a_href_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(typeicon.$$.fragment, local);
			transition_in(notificationcontent.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(typeicon.$$.fragment, local);
			transition_out(notificationcontent.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(a);
			destroy_component(typeicon);
			destroy_component(notificationcontent);
		}
	};
}

// (163:4) {#each $notifications as notification (notification.key)}
function create_each_block(key_1, ctx) {
	let li;
	let current_block_type_index;
	let if_block;
	let t0;
	let div;
	let closeicon;
	let div_class_value;
	let t1;
	let autodismiss;
	let t2;
	let li_class_value;
	let li_intro;
	let li_outro;
	let rect;
	let stop_animation = noop;
	let current;
	let mounted;
	let dispose;
	const if_block_creators = [create_if_block_1$1, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*notification*/ ctx[10].link) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	closeicon = new CloseIcon({});

	function click_handler(...args) {
		return /*click_handler*/ ctx[7](/*notification*/ ctx[10], ...args);
	}

	autodismiss = new AutoDismiss({
			props: { notification: /*notification*/ ctx[10] }
		});

	function click_handler_1(...args) {
		return /*click_handler_1*/ ctx[8](/*notification*/ ctx[10], ...args);
	}

	return {
		key: key_1,
		first: null,
		c() {
			li = element("li");
			if_block.c();
			t0 = space();
			div = element("div");
			create_component(closeicon.$$.fragment);
			t1 = space();
			create_component(autodismiss.$$.fragment);
			t2 = space();

			attr(div, "class", div_class_value = "bn-notify-custom bn-notify-notification-close " + (/*$app*/ ctx[5].name
			? `bn-notify-${/*$app*/ ctx[5].name}`
			: "") + " svelte-t2ve4g");

			attr(li, "style", /*notificationMargin*/ ctx[3]);

			attr(li, "class", li_class_value = "bn-notify-custom bn-notify-notification " + `bn-notify-notification-${/*notification*/ ctx[10].type}` + "\n        " + (/*$app*/ ctx[5].name
			? `bn-notify-${/*$app*/ ctx[5].name}`
			: "") + " svelte-t2ve4g");

			toggle_class(li, "bn-notify-dark-mode", /*$app*/ ctx[5].darkMode);
			toggle_class(li, "bn-notify-clickable", /*notification*/ ctx[10].onclick);
			this.first = li;
		},
		m(target, anchor) {
			insert(target, li, anchor);
			if_blocks[current_block_type_index].m(li, null);
			append(li, t0);
			append(li, div);
			mount_component(closeicon, div, null);
			append(li, t1);
			mount_component(autodismiss, li, null);
			append(li, t2);
			current = true;

			if (!mounted) {
				dispose = [
					listen(div, "click", stop_propagation(click_handler)),
					listen(li, "click", click_handler_1)
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				}

				transition_in(if_block, 1);
				if_block.m(li, t0);
			}

			if (!current || dirty & /*$app*/ 32 && div_class_value !== (div_class_value = "bn-notify-custom bn-notify-notification-close " + (/*$app*/ ctx[5].name
			? `bn-notify-${/*$app*/ ctx[5].name}`
			: "") + " svelte-t2ve4g")) {
				attr(div, "class", div_class_value);
			}

			const autodismiss_changes = {};
			if (dirty & /*$notifications*/ 64) autodismiss_changes.notification = /*notification*/ ctx[10];
			autodismiss.$set(autodismiss_changes);

			if (!current || dirty & /*notificationMargin*/ 8) {
				attr(li, "style", /*notificationMargin*/ ctx[3]);
			}

			if (!current || dirty & /*$notifications, $app*/ 96 && li_class_value !== (li_class_value = "bn-notify-custom bn-notify-notification " + `bn-notify-notification-${/*notification*/ ctx[10].type}` + "\n        " + (/*$app*/ ctx[5].name
			? `bn-notify-${/*$app*/ ctx[5].name}`
			: "") + " svelte-t2ve4g")) {
				attr(li, "class", li_class_value);
			}

			if (dirty & /*$notifications, $app, $app*/ 96) {
				toggle_class(li, "bn-notify-dark-mode", /*$app*/ ctx[5].darkMode);
			}

			if (dirty & /*$notifications, $app, $notifications*/ 96) {
				toggle_class(li, "bn-notify-clickable", /*notification*/ ctx[10].onclick);
			}
		},
		r() {
			rect = li.getBoundingClientRect();
		},
		f() {
			fix_position(li);
			stop_animation();
			add_transform(li, rect);
		},
		a() {
			stop_animation();
			stop_animation = create_animation(li, rect, flip, { duration: 500 });
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			transition_in(closeicon.$$.fragment, local);
			transition_in(autodismiss.$$.fragment, local);

			add_render_callback(() => {
				if (li_outro) li_outro.end(1);

				if (!li_intro) li_intro = create_in_transition(li, fly, {
					duration: 1200,
					delay: 300,
					x: /*x*/ ctx[1],
					y: /*y*/ ctx[2],
					easing: elasticOut
				});

				li_intro.start();
			});

			current = true;
		},
		o(local) {
			transition_out(if_block);
			transition_out(closeicon.$$.fragment, local);
			transition_out(autodismiss.$$.fragment, local);
			if (li_intro) li_intro.invalidate();

			li_outro = create_out_transition(li, fly, {
				duration: 400,
				x: /*x*/ ctx[1],
				y: /*y*/ ctx[2],
				easing: quintIn
			});

			current = false;
		},
		d(detaching) {
			if (detaching) detach(li);
			if_blocks[current_block_type_index].d();
			destroy_component(closeicon);
			destroy_component(autodismiss);
			if (detaching && li_outro) li_outro.end();
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$7(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*$notifications*/ ctx[6].length > 0 && create_if_block$2(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*$notifications*/ ctx[6].length > 0) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*$notifications*/ 64) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$2(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function elasticOut(t) {
	return Math.sin(-13 * (t + 1) * Math.PI / 2) * Math.pow(2, -35 * t) + 1;
}

function instance$7($$self, $$props, $$invalidate) {
	let $app;
	let $notifications;
	component_subscribe($$self, app, $$value => $$invalidate(5, $app = $$value));
	component_subscribe($$self, notifications, $$value => $$invalidate(6, $notifications = $$value));
	let smallScreen = window.outerWidth < 450;
	let positioning;
	let x;
	let y;
	let notificationMargin;
	let justifyContent;

	// listen for screen resize events
	window.addEventListener("resize", lodash_debounce(
		() => {
			if (window.outerWidth < 450) {
				if (!smallScreen) {
					$$invalidate(9, smallScreen = true);
				}
			} else {
				if (smallScreen) {
					$$invalidate(9, smallScreen = false);
				}
			}
		},
		300
	));

	const click_handler = notification => notifications.remove(notification.id, notification.eventCode);
	const click_handler_1 = (notification, e) => notification.onclick && notification.onclick(e);

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$app, smallScreen, positioning*/ 545) {
			 if ($app.desktopPosition && !smallScreen) {
				$$invalidate(0, positioning = $app.desktopPosition === "bottomRight"
				? "bottom: 0; right: 0;"
				: $app.desktopPosition === "bottomLeft"
					? "left: 0; right: unset;"
					: $app.desktopPosition === "topRight"
						? "top: 0;"
						: "top: 0; bottom: unset; left: 0; right: unset;");

				$$invalidate(1, x = positioning && positioning.includes("left") ? -321 : 321);
				$$invalidate(2, y = 0);

				if ($app.desktopPosition.includes("top")) {
					$$invalidate(4, justifyContent = "justify-content: unset;");
					$$invalidate(3, notificationMargin = "margin: 0.75rem 0 0 0;");
				} else {
					$$invalidate(4, justifyContent = "justify-content: flex-end;");
					$$invalidate(3, notificationMargin = "margin: 0 0 0.75rem 0;");
				}
			}
		}

		if ($$self.$$.dirty & /*$app, smallScreen*/ 544) {
			 if ($app.mobilePosition && smallScreen) {
				$$invalidate(0, positioning = $app.mobilePosition === "top"
				? "top: 0; bottom: unset;"
				: "bottom: 0; top: unset;");

				$$invalidate(1, x = 0);

				if ($app.mobilePosition === "top") {
					$$invalidate(2, y = -50);
					$$invalidate(4, justifyContent = "justify-content: unset;");
					$$invalidate(3, notificationMargin = "margin: 0.75rem 0 0 0;");
				} else {
					$$invalidate(2, y = 50);
					$$invalidate(4, justifyContent = "justify-content: flex-end;");
					$$invalidate(3, notificationMargin = "margin: 0 0 0.75rem 0;");
				}
			}
		}

		if ($$self.$$.dirty & /*$app, smallScreen*/ 544) {
			 if (!$app.desktopPosition && !$app.mobilePosition) {
				$$invalidate(1, x = smallScreen ? 0 : 321);
				$$invalidate(2, y = smallScreen ? 50 : 0);
				$$invalidate(3, notificationMargin = "margin: 0 0 0.75rem 0;");
				$$invalidate(4, justifyContent = "justify-content: flex-end;");
				$$invalidate(0, positioning = "bottom: 0; right: 0;");
			}
		}
	};

	return [
		positioning,
		x,
		y,
		notificationMargin,
		justifyContent,
		$app,
		$notifications,
		click_handler,
		click_handler_1
	];
}

class Notify extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-t2ve4g-style")) add_css$7();
		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});
	}
}

function eventToType(eventCode) {
    switch (eventCode) {
        case 'txSent':
        case 'txPool':
        case 'txSpeedUp':
        case 'txCancel':
            return 'pending';
        case 'txRequest':
        case 'txRepeat':
        case 'txAwaitingApproval':
        case 'txConfirmReminder':
        case 'txStallPending':
        case 'txStallConfirmed':
            return 'hint';
        case 'txError':
        case 'txSendFail':
        case 'txFailed':
        case 'txDropped':
        case 'nsfFail':
        case 'txUnderpriced':
            return 'error';
        case 'txConfirmed':
            return 'success';
        default:
            return 'hint';
    }
}
function typeToDismissTimeout(type) {
    switch (type) {
        case 'success':
        case 'hint':
            return 4000;
        default:
            return 0;
    }
}

// subscribe to the formatter store
let formatter;
Bt.subscribe((store) => (formatter = store));
function createNotification(transactionDetails, customization = {}) {
    const notificationObject = transactionDetails.system === 'bitcoin'
        ? createBitcoinNotificationObject(transactionDetails, customization)
        : createEthereumNotificationObject(transactionDetails, customization);
    notifications.add(notificationObject);
}
function createBitcoinNotificationObject(transactionDetails, customization) {
    const { id, txid, startTime, eventCode, watchedAddress, inputs, outputs } = transactionDetails;
    const type = eventToType(eventCode);
    const key = `${id}-${(typeof customization === 'object' && customization.eventCode) || eventCode}`;
    const { direction, value } = getBitcoinDirectionValue(inputs, outputs, watchedAddress);
    const formatterOptions = watchedAddress
        ? {
            messageId: `watched['${eventCode}']`,
            values: {
                verb: eventCode === 'txConfirmed'
                    ? direction === 'incoming'
                        ? 'received'
                        : 'sent'
                    : direction === 'incoming'
                        ? 'receiving'
                        : 'sending',
                formattedValue: value,
                asset: 'BTC',
                preposition: '',
                counterpartyShortened: ''
            }
        }
        : {
            messageId: `transaction['${eventCode}']`,
            values: { value, asset: 'BTC' }
        };
    const internationalizedMessage = formatter(formatterOptions.messageId, {
        values: formatterOptions.values
    });
    const noMessageAvailable = internationalizedMessage === formatterOptions.messageId;
    const message = noMessageAvailable
        ? defaultNotifyMessages.en[watchedAddress ? 'watched' : 'transaction'][eventCode || '']
        : internationalizedMessage;
    let notificationObject = {
        id: id || txid,
        type,
        key,
        startTime,
        eventCode,
        message,
        autoDismiss: typeToDismissTimeout((typeof customization === 'object' && customization.type) || type)
    };
    if (typeof customization === 'object') {
        notificationObject = { ...notificationObject, ...customization };
    }
    return notificationObject;
}
function createEthereumNotificationObject(transactionDetails, customization) {
    const { id, hash, startTime, eventCode, direction, counterparty, value, asset } = transactionDetails;
    const type = eventToType(eventCode);
    const key = `${id}-${(typeof customization === 'object' && customization.eventCode) || eventCode}`;
    const counterpartyShortened = counterparty &&
        counterparty.substring(0, 4) +
            '...' +
            counterparty.substring(counterparty.length - 4);
    const formattedValue = new BigNumber(value || 0)
        .div(new BigNumber('1000000000000000000'))
        .toString(10);
    const formatterOptions = counterparty && value
        ? {
            messageId: `watched['${eventCode}']`,
            values: {
                verb: eventCode === 'txConfirmed'
                    ? direction === 'incoming'
                        ? 'received'
                        : 'sent'
                    : direction === 'incoming'
                        ? 'receiving'
                        : 'sending',
                formattedValue,
                preposition: direction === 'incoming' ? 'from' : 'to',
                counterpartyShortened,
                asset
            }
        }
        : {
            messageId: `transaction['${eventCode}']`,
            values: { formattedValue, asset }
        };
    const internationalizedMessage = formatter(formatterOptions.messageId, {
        values: formatterOptions.values
    });
    const noMessageAvailable = internationalizedMessage === formatterOptions.messageId;
    const message = noMessageAvailable
        ? defaultNotifyMessages.en[counterparty ? 'watched' : 'transaction'][eventCode || '']
        : internationalizedMessage;
    let notificationObject = {
        id: id || hash,
        type,
        key,
        startTime,
        eventCode,
        message,
        autoDismiss: typeToDismissTimeout((typeof customization === 'object' && customization.type) || type)
    };
    if (typeof customization === 'object') {
        notificationObject = { ...notificationObject, ...customization };
    }
    return notificationObject;
}
function getBitcoinDirectionValue(inputs, outputs, watchedAddress) {
    if (!watchedAddress)
        return { value: null, direction: '' };
    const finder = (i) => i.address === watchedAddress;
    const input = inputs && inputs.find(finder);
    const output = outputs && outputs.find(finder);
    return {
        direction: output ? 'incoming' : 'outgoing',
        value: output ? output.value : input && input.value
    };
}

const validInitKeys = [
    'dappId',
    'networkId',
    'system',
    'transactionHandler',
    'name',
    'mobilePosition',
    'desktopPosition',
    'darkMode',
    'txApproveReminderTimeout',
    'txStallPendingTimeout',
    'txStallConfirmedTimeout',
    'notifyMessages',
    'clientLocale'
];
const validNotificationKeys = [
    'eventCode',
    'type',
    'message',
    'autoDismiss',
    'onclick'
];
const validTransactionKeys = [
    'sendTransaction',
    'estimateGas',
    'gasPrice',
    'balance',
    'contractCall',
    'txDetails'
];
function invalidParams$1(params, validParams, functionName) {
    const invalid = Object.keys(params);
    if (invalid.length > 0) {
        throw new Error(`${invalid[0]} is not a valid parameter for ${functionName}, must be one of the following valid parameters: ${validParams.join(', ')}`);
    }
}
function validateType$1({ name, value, type, optional, customValidation }) {
    if (!optional && typeof value === 'undefined') {
        throw new Error(`"${name}" is required`);
    }
    if (typeof value !== 'undefined' &&
        (type === 'array' ? Array.isArray(type) : typeof value !== type)) {
        throw new Error(`"${name}" must be of type: ${type}, received type: ${typeof value} from value: ${value}`);
    }
    if (typeof value !== 'undefined' && customValidation) {
        customValidation(value);
    }
}
function validateInit(init) {
    validateType$1({ name: 'init', value: init, type: 'object' });
    const { dappId, system, networkId, transactionHandler, name, apiUrl, ...otherParams } = init;
    validateType$1({
        name: 'dappId',
        value: dappId,
        type: 'string',
        optional: true
    });
    validateType$1({
        name: 'system',
        value: system,
        type: 'string',
        // defaults to ethereum so optional
        optional: true
    });
    // if no dappId provided then optional, otherwise required
    validateType$1({
        name: 'networkId (if dappId provided)',
        value: networkId,
        type: 'number',
        optional: !dappId
    });
    validateType$1({ name: 'name', value: name, type: 'string', optional: true });
    validateType$1({
        name: 'apiUrl',
        value: apiUrl,
        type: 'string',
        optional: true
    });
    validateType$1({
        name: 'transactionHandler',
        value: transactionHandler,
        type: 'function',
        optional: true
    });
    validateConfig(otherParams);
}
function stringOrNumber(val) {
    return typeof val === 'string' || typeof val === 'number';
}
function validateTransactionOptions(options) {
    validateType$1({ name: 'transaction options', value: options, type: 'object' });
    const { sendTransaction, estimateGas, gasPrice, balance, contractCall, txDetails, ...otherParams } = options;
    invalidParams$1(otherParams, validTransactionKeys, 'Transaction Options');
    validateType$1({
        name: 'sendTransaction',
        value: sendTransaction,
        type: 'function',
        optional: true
    });
    validateType$1({
        name: 'estimateGas',
        value: estimateGas,
        type: 'function',
        optional: true
    });
    validateType$1({
        name: 'gasPrice',
        value: gasPrice,
        type: 'function',
        optional: true
    });
    validateType$1({
        name: 'balance',
        value: balance,
        type: 'string',
        optional: true
    });
    validateType$1({
        name: 'contractCall',
        value: contractCall,
        type: 'object',
        optional: true
    });
    if (contractCall) {
        const { methodName, params, ...otherParams } = contractCall;
        invalidParams$1(otherParams, ['methodName', 'params'], 'contractCall');
        validateType$1({
            name: 'methodName',
            value: methodName,
            type: 'string',
            optional: true
        });
        validateType$1({
            name: 'params',
            value: params,
            type: 'array',
            optional: true
        });
    }
    validateType$1({
        name: 'txDetails',
        value: txDetails,
        type: 'object',
        optional: true
    });
    if (txDetails) {
        const { to, value, from, ...otherParams } = txDetails;
        invalidParams$1(otherParams, ['to', 'value', 'from'], 'txDetails');
        validateType$1({
            name: 'to',
            value: to,
            type: 'string',
            optional: true,
            customValidation: isAddress$1
        });
        if (typeof value !== 'undefined' && !stringOrNumber(value)) {
            throw new Error(`"value" must be of type: string | number, received type: ${typeof value} from value: ${value}`);
        }
        validateType$1({
            name: 'from',
            value: from,
            type: 'string',
            optional: true,
            customValidation: isAddress$1
        });
    }
}
function validateNotificationObject(notification) {
    validateType$1({
        name: 'notification',
        value: notification,
        type: 'object'
    });
    if (typeof notification !== 'object')
        return;
    const { eventCode, type, message, autoDismiss, onclick, ...otherParams } = notification;
    invalidParams$1(otherParams, validNotificationKeys, 'notification');
    validateType$1({
        name: 'eventCode',
        value: eventCode,
        type: 'string',
        optional: true
    });
    validateType$1({
        name: 'type',
        value: type,
        type: 'string',
        optional: true,
        customValidation: validNotificationType
    });
    validateType$1({
        name: 'message',
        value: message,
        type: 'string'
    });
    validateType$1({
        name: 'autoDismiss',
        value: autoDismiss,
        type: 'number',
        optional: true
    });
    validateType$1({
        name: 'onclick',
        value: onclick,
        type: 'function',
        optional: true
    });
}
function validateConfig(config) {
    validateType$1({ name: 'config', value: config, type: 'object' });
    const { networkId, system, mobilePosition, desktopPosition, darkMode, notifyMessages, clientLocale, txApproveReminderTimeout, txStallPendingTimeout, txStallConfirmedTimeout, ...otherParams } = config;
    invalidParams$1(otherParams, validInitKeys, 'config / initialize');
    validateType$1({
        name: 'networkId',
        value: networkId,
        type: 'number',
        optional: true
    });
    validateType$1({
        name: 'system',
        value: system,
        type: 'string',
        optional: true
    });
    validateType$1({
        name: 'mobilePosition',
        value: mobilePosition,
        type: 'string',
        optional: true,
        customValidation: validMobilePosition
    });
    validateType$1({
        name: 'desktopPosition',
        value: desktopPosition,
        type: 'string',
        optional: true,
        customValidation: validDesktopPosition
    });
    validateType$1({
        name: 'darkMode',
        value: darkMode,
        type: 'boolean',
        optional: true
    });
    validateType$1({
        name: 'notifyMessages',
        value: notifyMessages,
        type: 'object',
        optional: true
    });
    if (notifyMessages) {
        Object.keys(notifyMessages).forEach(locale => {
            validateType$1({
                name: locale,
                value: notifyMessages[locale],
                type: 'object'
            });
            const { transaction, watched, time, ...otherParams } = notifyMessages[locale];
            invalidParams$1(otherParams, ['transaction', 'watched', 'time'], locale);
            validateType$1({
                name: `notifyMessages.${locale}.transaction`,
                value: transaction,
                type: 'object',
                optional: true
            });
            validateType$1({
                name: `notifyMessages.${locale}.watched`,
                value: watched,
                type: 'object',
                optional: true
            });
            validateType$1({
                name: `notifyMessages.${locale}.time`,
                value: time,
                type: 'object',
                optional: true
            });
        });
    }
    validateType$1({
        name: 'clientLocale',
        value: clientLocale,
        type: 'string',
        optional: true
    });
    validateType$1({
        name: 'txApproveReminderTimeout',
        value: txApproveReminderTimeout,
        type: 'number',
        optional: true
    });
    validateType$1({
        name: 'txStallPendingTimeout',
        value: txStallPendingTimeout,
        type: 'number',
        optional: true
    });
    validateType$1({
        name: 'txStallConfirmedTimeout',
        value: txStallConfirmedTimeout,
        type: 'number',
        optional: true
    });
}
function validNotificationType(type) {
    switch (type) {
        case 'hint':
        case 'pending':
        case 'error':
        case 'success':
            return;
        default:
            throw new Error(`${type} is not a valid notification type, must be one of: 'hint', 'pending', 'error' or 'success'.`);
    }
}
function validMobilePosition(position) {
    switch (position) {
        case 'top':
        case 'bottom':
            return;
        default:
            throw new Error(`${position} is not a valid mobile notification position, must be one of: 'top' or 'bottom'.`);
    }
}
function validDesktopPosition(position) {
    switch (position) {
        case 'bottomLeft':
        case 'bottomRight':
        case 'topLeft':
        case 'topRight':
            return;
        default:
            throw new Error(`${position} is not a valid desktop notification position, must be one of: 'bottomLeft', 'bottomRight', 'topLeft' or 'topRight'.`);
    }
}
function isAddress$1(address) {
    if (!/^(0x)?[0-9a-fA-F]{40}$/.test(address)) {
        throw new Error(`${address} is not a valid ethereum address.`);
    }
}

let transactionQueue;
transactions.subscribe((store) => (transactionQueue = store));
function handlePreFlightEvent(blocknative, preflightEvent) {
    const { eventCode, contractCall, balance, txDetails, emitter, status } = preflightEvent;
    const contract = {
        methodName: contractCall.methodName,
        parameters: contractCall.params
    };
    blocknative.event({
        categoryCode: contractCall ? 'activeContract' : 'activeTransaction',
        eventCode,
        transaction: txDetails,
        wallet: { balance },
        contract
    });
    const transaction = {
        ...txDetails,
        eventCode,
        status,
        contractCall
    };
    const emitterResult = emitter.emit(transaction);
    if (emitterResult) {
        validateNotificationObject(emitterResult);
    }
    handleTransactionEvent({
        transaction: transaction,
        emitterResult
    });
}
function handleTransactionEvent(event) {
    const { transaction, emitterResult } = event;
    transactions.updateQueue(transaction);
    // create notification if dev hasn't opted out and not connected to a local network
    if (emitterResult !== false && !localNetwork(get_store_value(app).networkId)) {
        const transactionObj = transactionQueue.find((tx) => tx.id === transaction.id);
        if (transactionObj) {
            createNotification(transactionObj, emitterResult);
        }
    }
}
function duplicateTransactionCandidate(transaction, contract) {
    const duplicate = transactionQueue.find((tx) => {
        if (contract && typeof tx.contractCall === 'undefined')
            return false;
        if (tx.status === 'confirmed' || tx.status === 'failed')
            return;
        const sameMethod = contract
            ? contract.methodName === (tx.contractCall && tx.contractCall.methodName)
            : true;
        const sameParams = contract
            ? argsEqual(contract.params, tx.contractCall && tx.contractCall.params)
            : true;
        const sameVal = tx.value == transaction.value;
        const sameTo = contract
            ? sameMethod
            : tx.to &&
                tx.to.toLowerCase() === transaction.to &&
                transaction.to.toLowerCase();
        return sameMethod && sameParams && sameVal && sameTo;
    });
    return duplicate;
}
function preflightTransaction(blocknative, options, emitter) {
    return new Promise((resolve, reject) => {
        // wrap in set timeout to put to the end of the event queue
        setTimeout(async () => {
            const { sendTransaction, estimateGas, gasPrice, balance, contractCall, txDetails } = options;
            //=== if `balance` or `estimateGas` or `gasPrice` is not provided, then sufficient funds check is disabled === //
            //=== if `txDetails` is not provided, then duplicate transaction check is disabled === //
            //== if dev doesn't want notify to intiate the transaction and `sendTransaction` is not provided, then transaction rejected notification is disabled ==//
            //=== to disable hints for `txAwaitingApproval`, `txConfirmReminder` or any other notification, then return false from listener functions ==//
            const [gas, price] = await gasEstimates(estimateGas, gasPrice);
            const id = v4_1();
            const value = new BigNumber((txDetails && txDetails.value) || 0);
            const calculated = {
                value: value.toString(10),
                gas: gas && gas.toString(10),
                gasPrice: price && price.toString(10)
            };
            const txObject = txDetails
                ? {
                    ...txDetails,
                    ...calculated,
                    id
                }
                : { ...calculated, id };
            // check sufficient balance if required parameters are available
            if (balance && gas && price) {
                const transactionCost = gas.times(price).plus(value);
                // if transaction cost is greater than the current balance
                if (transactionCost.gt(new BigNumber(balance))) {
                    const eventCode = 'nsfFail';
                    handlePreFlightEvent(blocknative, {
                        eventCode,
                        contractCall,
                        balance,
                        txDetails: txObject,
                        emitter
                    });
                    return reject('User has insufficient funds');
                }
            }
            // check if it is a duplicate transaction
            if (txDetails && duplicateTransactionCandidate(txDetails, contractCall)) {
                const eventCode = 'txRepeat';
                handlePreFlightEvent(blocknative, {
                    eventCode,
                    contractCall,
                    balance,
                    txDetails: txObject,
                    emitter
                });
            }
            const { txApproveReminderTimeout, txStallPendingTimeout, txStallConfirmedTimeout } = get_store_value(app);
            // check previous transactions awaiting approval
            if (transactionQueue.find(tx => tx.status === 'awaitingApproval')) {
                const eventCode = 'txAwaitingApproval';
                handlePreFlightEvent(blocknative, {
                    eventCode,
                    contractCall,
                    balance,
                    txDetails: txObject,
                    emitter
                });
            }
            // confirm reminder after timeout
            setTimeout(() => {
                const awaitingApproval = transactionQueue.find(tx => tx.id === id && tx.status === 'awaitingApproval');
                if (awaitingApproval) {
                    const eventCode = 'txConfirmReminder';
                    handlePreFlightEvent(blocknative, {
                        eventCode,
                        contractCall,
                        balance,
                        txDetails: txObject,
                        emitter
                    });
                }
            }, txApproveReminderTimeout);
            handlePreFlightEvent(blocknative, {
                eventCode: 'txRequest',
                status: 'awaitingApproval',
                contractCall,
                balance,
                txDetails: txObject,
                emitter
            });
            // if not provided with sendTransaction function, resolve with id so dev can initiate transaction
            // dev will need to call notify.hash(txHash, id) with this id to link up the preflight with the postflight notifications
            if (!sendTransaction) {
                return resolve(id);
            }
            // get result and handle errors
            let hash;
            try {
                hash = await sendTransaction();
            }
            catch (error) {
                const { eventCode, errorMsg } = extractMessageFromError(error);
                handlePreFlightEvent(blocknative, {
                    eventCode,
                    status: 'failed',
                    contractCall,
                    balance,
                    txDetails: txObject,
                    emitter
                });
                return reject(errorMsg);
            }
            if (hash && typeof hash === 'string') {
                const serverEmitter = blocknative.transaction(hash, id).emitter;
                serverEmitter.on('all', (transaction) => {
                    const result = emitter.emit(transaction);
                    return result;
                });
                // Check for pending stall status
                setTimeout(() => {
                    const transaction = transactionQueue.find((tx) => tx.id === id);
                    if (transaction &&
                        transaction.status === 'sent' &&
                        blocknative._connected) {
                        const eventCode = 'txStallPending';
                        handlePreFlightEvent(blocknative, {
                            eventCode,
                            contractCall,
                            balance,
                            txDetails: txObject,
                            emitter
                        });
                    }
                }, txStallPendingTimeout);
                // Check for confirmed stall status
                setTimeout(() => {
                    const transaction = transactionQueue.find(tx => tx.id === id);
                    if (transaction &&
                        transaction.status === 'pending' &&
                        blocknative._connected) {
                        const eventCode = 'txStallConfirmed';
                        handlePreFlightEvent(blocknative, {
                            eventCode,
                            contractCall,
                            balance,
                            txDetails: txObject,
                            emitter
                        });
                    }
                }, txStallConfirmedTimeout);
                resolve(id);
            }
            else {
                reject('sendTransaction function must resolve to a transaction hash that is of type String.');
            }
        }, 10);
    });
}
function gasEstimates(gasFunc, gasPriceFunc) {
    if (!gasFunc || !gasPriceFunc) {
        return Promise.resolve([]);
    }
    const gasProm = gasFunc();
    if (!gasProm.then) {
        throw new Error('The `estimateGas` function must return a Promise');
    }
    const gasPriceProm = gasPriceFunc();
    if (!gasPriceProm.then) {
        throw new Error('The `gasPrice` function must return a Promise');
    }
    return Promise.all([gasProm, gasPriceProm])
        .then(([gasResult, gasPriceResult]) => {
        if (typeof gasResult !== 'string') {
            throw new Error(`The Promise returned from calling 'estimateGas' must resolve with a value of type 'string'. Received a value of: ${gasResult} with a type: ${typeof gasResult}`);
        }
        if (typeof gasPriceResult !== 'string') {
            throw new Error(`The Promise returned from calling 'gasPrice' must resolve with a value of type 'string'. Received a value of: ${gasPriceResult} with a type: ${typeof gasPriceResult}`);
        }
        return [new BigNumber(gasResult), new BigNumber(gasPriceResult)];
    })
        .catch(error => {
        throw new Error(`There was an error getting gas estimates: ${error}`);
    });
}

var version$1 = "1.5.0";

let notify;
function init$1(options) {
    if (notify) {
        console.warn('notify has already been initialized');
        notify.$destroy();
    }
    validateInit(options);
    const { system, transactionHandler, apiUrl, ...appOptions } = options;
    const { dappId, networkId, name, clientLocale } = appOptions;
    const transactionHandlers = [handleTransactionEvent];
    if (transactionHandler) {
        transactionHandlers.push(transactionHandler);
    }
    let blocknative;
    if (dappId) {
        blocknative = new Blocknative({
            dappId,
            networkId,
            transactionHandlers,
            name: name || 'Notify',
            apiUrl,
            system
        });
    }
    // save config to app store
    app.update((store) => ({
        ...store,
        ...appOptions,
        version: version$1,
        clientLocale: clientLocale ||
            Ct({
                fallback: 'en',
                navigator: true
            })
    }));
    // initialize App
    notify = new Notify({
        target: document.body
    });
    app.subscribe((store) => {
        const { notifyMessages, clientLocale } = store;
        // set the dictionary for i18n
        Nt.set(notifyMessages);
        const availableLocale = notifyMessages[clientLocale] || notifyMessages[clientLocale.slice(0, 2)];
        Tt.set(availableLocale ? clientLocale : 'en');
    });
    return {
        hash,
        transaction,
        account,
        unsubscribe,
        notification,
        config
    };
    function account(address) {
        if (!blocknative) {
            throw new Error('A dappId needs to be passed in when intializing Notify to use the account function');
        }
        try {
            const result = blocknative.account(address);
            return result;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    function hash(hash, id) {
        if (!blocknative) {
            throw new Error('A dappId needs to be passed in when intializing Notify to use the hash function');
        }
        try {
            const result = blocknative.transaction(hash, id);
            return result;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    function transaction(options) {
        if (!blocknative) {
            throw new Error('A dappId needs to be passed in when intializing Notify to use the transaction function');
        }
        validateTransactionOptions(options);
        const emitter = createEmitter$1();
        const result = preflightTransaction(blocknative, options, emitter).catch(err => err);
        return {
            emitter,
            result
        };
    }
    function unsubscribe(addressOrHash) {
        if (!blocknative) {
            throw new Error('A dappId needs to be passed in when intializing Notify to use the unsubscribe function');
        }
        blocknative.unsubscribe(addressOrHash);
    }
    function notification(notificationObject) {
        validateNotificationObject(notificationObject);
        let key = 0;
        const id = v4_1();
        const startTime = Date.now();
        const { eventCode = `customNotification${key++}` } = notificationObject;
        const dismiss = () => notifications.remove(id, eventCode);
        function update(notificationUpdate) {
            validateNotificationObject(notificationUpdate);
            const { eventCode = `customNotification${key++}` } = notificationUpdate;
            createNotification({ id, startTime, eventCode }, notificationUpdate);
            return {
                dismiss,
                update
            };
        }
        createNotification({ id, startTime, eventCode }, notificationObject);
        return {
            dismiss,
            update
        };
    }
    function config(options) {
        validateConfig(options);
        const { notifyMessages, networkId: newNetworkId, system: newSystem, ...otherOptions } = options;
        const { networkId, system, dappId, transactionHandler, name, apiUrl } = get_store_value(app);
        // networkId or system has changed
        if ((newNetworkId && newNetworkId !== networkId) ||
            (newSystem && newSystem !== system)) {
            if (!blocknative) {
                throw new Error('A dappId needs to be passed in when intializing Notify to be able to connect to a system and network');
            }
            // close existing SDK connection
            blocknative.destroy();
            // create new connection with new values
            blocknative = new Blocknative({
                dappId,
                networkId: newNetworkId || networkId,
                transactionHandlers: transactionHandler
                    ? [handleTransactionEvent, transactionHandler]
                    : [handleTransactionEvent],
                name: name || 'Notify',
                apiUrl,
                system: newSystem || system
            });
        }
        app.update((store) => {
            return {
                ...store,
                networkId: newNetworkId || networkId,
                system: newSystem || system,
                ...otherOptions,
                notifyMessages: notifyMessages
                    ? { ...store.notifyMessages, ...notifyMessages }
                    : store.notifyMessages
            };
        });
    }
}

export default init$1;
