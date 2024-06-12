"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTechnologyPosts = exports.getStreaming = exports.getSportsPosts = exports.getSocialPosts = exports.getRelatedPost = exports.getPostById = exports.getPoliticalPosts = exports.getPolicePosts = exports.getNextEightPosts = exports.getLatestPostsByCategory = exports.getLastFivePosts = exports.getLast = exports.getEspectaculos = exports.getEmprender = exports.getEconomicPosts = void 0;
var _PostModel = _interopRequireDefault(require("../models/Post.model.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getLastFivePosts = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var lastFivePosts;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _PostModel["default"].find().sort({
              createdAt: -1
            }).limit(5).lean();
          case 3:
            lastFivePosts = _context.sent;
            res.json(lastFivePosts);
            _context.next = 10;
            break;
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: _context.t0.message
            });
          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function getLastFivePosts(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getLastFivePosts = getLastFivePosts;
var getNextEightPosts = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var lastFivePostsIds, nextEightPosts;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _PostModel["default"].find().sort({
              createdAt: -1
            }).limit(5).lean();
          case 3:
            lastFivePostsIds = _context2.sent.map(function (post) {
              return post._id;
            });
            _context2.next = 6;
            return _PostModel["default"].find({
              _id: {
                $nin: lastFivePostsIds
              }
            }).sort({
              createdAt: -1
            }).limit(8).lean();
          case 6:
            nextEightPosts = _context2.sent;
            res.json(nextEightPosts);
            _context2.next = 13;
            break;
          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            // Asegúrate de que el objeto 'res' esté disponible y no sea 'undefined'
            if (res && res.status) {
              res.status(500).json({
                message: _context2.t0.message
              });
            } else {
              console.error('Error: Objeto de respuesta no definido', _context2.t0);
            }
          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function getNextEightPosts(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Función para la categoría 'política'
exports.getNextEightPosts = getNextEightPosts;
var getPoliticalPosts = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var posts, response;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _PostModel["default"].find({
              'Entry_Category': 'Política'
            }).sort({
              createdAt: -1
            }).lean();
          case 3:
            posts = _context3.sent;
            response = {
              portada: posts[0],
              noticias: posts.slice(1, 3)
            };
            res.json(response);
            _context3.next = 11;
            break;
          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              message: _context3.t0.message
            });
          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function getPoliticalPosts(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Función para la categoría 'economía'
exports.getPoliticalPosts = getPoliticalPosts;
var getEconomicPosts = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var posts, response;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _PostModel["default"].find({
              'Entry_Category': 'Economía'
            }).sort({
              createdAt: -1
            }).lean();
          case 3:
            posts = _context4.sent;
            response = {
              portada: posts[0],
              noticias: posts.slice(1, 3)
            };
            res.json(response);
            _context4.next = 11;
            break;
          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              message: _context4.t0.message
            });
          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return function getEconomicPosts(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// Función para la categoría 'sociedad'
exports.getEconomicPosts = getEconomicPosts;
var getSocialPosts = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var posts, response;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _PostModel["default"].find({
              'Entry_Category': 'Sociedad'
            }).sort({
              createdAt: -1
            }).lean();
          case 3:
            posts = _context5.sent;
            response = {
              portada: posts[0],
              noticias: posts.slice(1, 3)
            };
            res.json(response);
            _context5.next = 11;
            break;
          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            res.status(500).json({
              message: _context5.t0.message
            });
          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return function getSocialPosts(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

// Función para la categoría 'policiales'
exports.getSocialPosts = getSocialPosts;
var getPolicePosts = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var posts;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _PostModel["default"].find({
              'Entry_Category': 'Policiales'
            }).sort({
              createdAt: -1
            }).lean();
          case 3:
            posts = _context6.sent;
            res.json(posts);
            _context6.next = 10;
            break;
          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            res.status(500).json({
              message: _context6.t0.message
            });
          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function getPolicePosts(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.getPolicePosts = getPolicePosts;
var getSportsPosts = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var posts;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _PostModel["default"].find({
              'Entry_Category': 'Deportes'
            }).sort({
              createdAt: -1
            }).lean();
          case 3:
            posts = _context7.sent;
            res.json(posts);
            _context7.next = 10;
            break;
          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            res.status(500).json({
              message: _context7.t0.message
            });
          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 7]]);
  }));
  return function getSportsPosts(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.getSportsPosts = getSportsPosts;
var getTechnologyPosts = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var posts;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _PostModel["default"].find({
              'Entry_Category': 'Tecnología'
            }).sort({
              createdAt: -1
            }).lean();
          case 3:
            posts = _context8.sent;
            res.json(posts);
            _context8.next = 10;
            break;
          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            res.status(500).json({
              message: _context8.t0.message
            });
          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return function getTechnologyPosts(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
exports.getTechnologyPosts = getTechnologyPosts;
var getLast = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var last;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _PostModel["default"].find().sort({
              createdAt: -1
            }).limit(13).lean();
          case 3:
            last = _context9.sent;
            res.json(last);
            _context9.next = 10;
            break;
          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9["catch"](0);
            res.status(500).json({
              message: _context9.t0.message
            });
          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 7]]);
  }));
  return function getLast(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
exports.getLast = getLast;
var getPostById = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var postId, post;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            postId = req.params.id; // Obtén el ID del post de los parámetros de la solicitud
            _context10.next = 4;
            return _PostModel["default"].findById(postId).lean();
          case 4:
            post = _context10.sent;
            if (post) {
              _context10.next = 7;
              break;
            }
            return _context10.abrupt("return", res.status(404).json({
              message: 'Post not found'
            }));
          case 7:
            res.json(post); // Si se encuentra el post, devuélvelo en formato JSON
            _context10.next = 13;
            break;
          case 10:
            _context10.prev = 10;
            _context10.t0 = _context10["catch"](0);
            res.status(500).json({
              message: _context10.t0.message
            }); // Manejo de errores
          case 13:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 10]]);
  }));
  return function getPostById(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

// Función genérica para obtener las últimas noticias de una categoría
exports.getPostById = getPostById;
var getLatestPostsByCategory = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(category) {
    var limit,
      posts,
      _args11 = arguments;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            limit = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : 10;
            _context11.prev = 1;
            _context11.next = 4;
            return _PostModel["default"].find({
              'Entry_Category': category
            }).sort({
              createdAt: -1
            }).limit(limit).lean();
          case 4:
            posts = _context11.sent;
            return _context11.abrupt("return", posts);
          case 8:
            _context11.prev = 8;
            _context11.t0 = _context11["catch"](1);
            throw new Error(_context11.t0.message);
          case 11:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[1, 8]]);
  }));
  return function getLatestPostsByCategory(_x21) {
    return _ref11.apply(this, arguments);
  };
}();
exports.getLatestPostsByCategory = getLatestPostsByCategory;
var getRelatedPost = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var _req$params, category, postId, latestPosts;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _req$params = req.params, category = _req$params.category, postId = _req$params.postId;
            _context12.prev = 1;
            _context12.next = 4;
            return _PostModel["default"].find({
              'Entry_Category': category,
              '_id': {
                $ne: postId
              }
            }).sort({
              createdAt: -1
            }).limit(4).lean();
          case 4:
            latestPosts = _context12.sent;
            res.json(latestPosts);
            _context12.next = 11;
            break;
          case 8:
            _context12.prev = 8;
            _context12.t0 = _context12["catch"](1);
            res.status(500).json({
              message: _context12.t0.message
            });
          case 11:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[1, 8]]);
  }));
  return function getRelatedPost(_x22, _x23) {
    return _ref12.apply(this, arguments);
  };
}();
exports.getRelatedPost = getRelatedPost;
var getStreaming = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var posts;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return _PostModel["default"].find({
              'Entry_Category': 'Streaming'
            }).sort({
              createdAt: -1
            }).lean();
          case 3:
            posts = _context13.sent;
            res.json(posts);
            _context13.next = 10;
            break;
          case 7:
            _context13.prev = 7;
            _context13.t0 = _context13["catch"](0);
            res.status(500).json({
              message: _context13.t0.message
            });
          case 10:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 7]]);
  }));
  return function getStreaming(_x24, _x25) {
    return _ref13.apply(this, arguments);
  };
}();
exports.getStreaming = getStreaming;
var getEmprender = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var posts;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _context14.next = 3;
            return _PostModel["default"].find({
              'Entry_Category': 'Emprender'
            }).sort({
              createdAt: -1
            }).lean();
          case 3:
            posts = _context14.sent;
            res.json(posts);
            _context14.next = 10;
            break;
          case 7:
            _context14.prev = 7;
            _context14.t0 = _context14["catch"](0);
            res.status(500).json({
              message: _context14.t0.message
            });
          case 10:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 7]]);
  }));
  return function getEmprender(_x26, _x27) {
    return _ref14.apply(this, arguments);
  };
}();
exports.getEmprender = getEmprender;
var getEspectaculos = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var posts;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _context15.next = 3;
            return _PostModel["default"].find({
              'Entry_Category': 'Espectáculos'
            }).sort({
              createdAt: -1
            }).lean();
          case 3:
            posts = _context15.sent;
            res.json(posts);
            _context15.next = 10;
            break;
          case 7:
            _context15.prev = 7;
            _context15.t0 = _context15["catch"](0);
            res.status(500).json({
              message: _context15.t0.message
            });
          case 10:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[0, 7]]);
  }));
  return function getEspectaculos(_x28, _x29) {
    return _ref15.apply(this, arguments);
  };
}();
exports.getEspectaculos = getEspectaculos;