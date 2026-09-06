"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTechnologyPosts = exports.getStreaming = exports.getSportsPosts = exports.getSocialPosts = exports.getRelatedPost = exports.getPostById = exports.getPoliticalPosts = exports.getPolicePosts = exports.getNextEightPosts = exports.getLatestPostsByCategory = exports.getLastFivePosts = exports.getLast = exports.getEspectaculos = exports.getEmprender = exports.getEconomicPosts = void 0;
var _PostModel = _interopRequireDefault(require("../models/Post.model.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var getLastFivePosts = exports.getLastFivePosts = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var lastFivePosts, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          _context.n = 1;
          return _PostModel["default"].find().sort({
            createdAt: -1
          }).limit(5).lean();
        case 1:
          lastFivePosts = _context.v;
          res.json(lastFivePosts);
          _context.n = 3;
          break;
        case 2:
          _context.p = 2;
          _t = _context.v;
          res.status(500).json({
            message: _t.message
          });
        case 3:
          return _context.a(2);
      }
    }, _callee, null, [[0, 2]]);
  }));
  return function getLastFivePosts(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getNextEightPosts = exports.getNextEightPosts = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var lastFivePostsIds, nextEightPosts, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _context2.n = 1;
          return _PostModel["default"].find().sort({
            createdAt: -1
          }).limit(5).lean();
        case 1:
          lastFivePostsIds = _context2.v.map(function (post) {
            return post._id;
          });
          _context2.n = 2;
          return _PostModel["default"].find({
            _id: {
              $nin: lastFivePostsIds
            }
          }).sort({
            createdAt: -1
          }).limit(8).lean();
        case 2:
          nextEightPosts = _context2.v;
          res.json(nextEightPosts);
          _context2.n = 4;
          break;
        case 3:
          _context2.p = 3;
          _t2 = _context2.v;
          // Asegúrate de que el objeto 'res' esté disponible y no sea 'undefined'
          if (res && res.status) {
            res.status(500).json({
              message: _t2.message
            });
          } else {
            console.error('Error: Objeto de respuesta no definido', _t2);
          }
        case 4:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 3]]);
  }));
  return function getNextEightPosts(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Función para la categoría 'política'
var getPoliticalPosts = exports.getPoliticalPosts = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var posts, response, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          _context3.n = 1;
          return _PostModel["default"].find({
            'Entry_Category': 'Política'
          }).sort({
            createdAt: -1
          }).lean();
        case 1:
          posts = _context3.v;
          response = {
            portada: posts[0],
            noticias: posts.slice(1, 3)
          };
          res.json(response);
          _context3.n = 3;
          break;
        case 2:
          _context3.p = 2;
          _t3 = _context3.v;
          res.status(500).json({
            message: _t3.message
          });
        case 3:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 2]]);
  }));
  return function getPoliticalPosts(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Función para la categoría 'economía'
var getEconomicPosts = exports.getEconomicPosts = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var posts, response, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          _context4.n = 1;
          return _PostModel["default"].find({
            'Entry_Category': 'Economía'
          }).sort({
            createdAt: -1
          }).lean();
        case 1:
          posts = _context4.v;
          response = {
            portada: posts[0],
            noticias: posts.slice(1, 3)
          };
          res.json(response);
          _context4.n = 3;
          break;
        case 2:
          _context4.p = 2;
          _t4 = _context4.v;
          res.status(500).json({
            message: _t4.message
          });
        case 3:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 2]]);
  }));
  return function getEconomicPosts(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// Función para la categoría 'sociedad'
var getSocialPosts = exports.getSocialPosts = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var posts, response, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.p = 0;
          _context5.n = 1;
          return _PostModel["default"].find({
            'Entry_Category': 'Sociedad'
          }).sort({
            createdAt: -1
          }).lean();
        case 1:
          posts = _context5.v;
          response = {
            portada: posts[0],
            noticias: posts.slice(1, 3)
          };
          res.json(response);
          _context5.n = 3;
          break;
        case 2:
          _context5.p = 2;
          _t5 = _context5.v;
          res.status(500).json({
            message: _t5.message
          });
        case 3:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 2]]);
  }));
  return function getSocialPosts(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();

// Función para la categoría 'policiales'
var getPolicePosts = exports.getPolicePosts = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var posts, _t6;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _context6.p = 0;
          _context6.n = 1;
          return _PostModel["default"].find({
            'Entry_Category': 'Policiales'
          }).sort({
            createdAt: -1
          }).lean();
        case 1:
          posts = _context6.v;
          res.json(posts);
          _context6.n = 3;
          break;
        case 2:
          _context6.p = 2;
          _t6 = _context6.v;
          res.status(500).json({
            message: _t6.message
          });
        case 3:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 2]]);
  }));
  return function getPolicePosts(_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();
var getSportsPosts = exports.getSportsPosts = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var posts, _t7;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          _context7.p = 0;
          _context7.n = 1;
          return _PostModel["default"].find({
            'Entry_Category': 'Deportes'
          }).sort({
            createdAt: -1
          }).lean();
        case 1:
          posts = _context7.v;
          res.json(posts);
          _context7.n = 3;
          break;
        case 2:
          _context7.p = 2;
          _t7 = _context7.v;
          res.status(500).json({
            message: _t7.message
          });
        case 3:
          return _context7.a(2);
      }
    }, _callee7, null, [[0, 2]]);
  }));
  return function getSportsPosts(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();
var getTechnologyPosts = exports.getTechnologyPosts = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
    var posts, _t8;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          _context8.p = 0;
          _context8.n = 1;
          return _PostModel["default"].find({
            'Entry_Category': 'Tecnología'
          }).sort({
            createdAt: -1
          }).lean();
        case 1:
          posts = _context8.v;
          res.json(posts);
          _context8.n = 3;
          break;
        case 2:
          _context8.p = 2;
          _t8 = _context8.v;
          res.status(500).json({
            message: _t8.message
          });
        case 3:
          return _context8.a(2);
      }
    }, _callee8, null, [[0, 2]]);
  }));
  return function getTechnologyPosts(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();
var getLast = exports.getLast = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
    var last, _t9;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          _context9.p = 0;
          _context9.n = 1;
          return _PostModel["default"].find().sort({
            createdAt: -1
          }).limit(13).lean();
        case 1:
          last = _context9.v;
          res.json(last);
          _context9.n = 3;
          break;
        case 2:
          _context9.p = 2;
          _t9 = _context9.v;
          res.status(500).json({
            message: _t9.message
          });
        case 3:
          return _context9.a(2);
      }
    }, _callee9, null, [[0, 2]]);
  }));
  return function getLast(_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();
var getPostById = exports.getPostById = /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
    var postId, post, _t0;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          _context0.p = 0;
          postId = req.params.id; // Obtén el ID del post de los parámetros de la solicitud
          _context0.n = 1;
          return _PostModel["default"].findById(postId).lean();
        case 1:
          post = _context0.v;
          if (post) {
            _context0.n = 2;
            break;
          }
          return _context0.a(2, res.status(404).json({
            message: 'Post not found'
          }));
        case 2:
          res.json(post); // Si se encuentra el post, devuélvelo en formato JSON
          _context0.n = 4;
          break;
        case 3:
          _context0.p = 3;
          _t0 = _context0.v;
          res.status(500).json({
            message: _t0.message
          }); // Manejo de errores
        case 4:
          return _context0.a(2);
      }
    }, _callee0, null, [[0, 3]]);
  }));
  return function getPostById(_x17, _x18) {
    return _ref0.apply(this, arguments);
  };
}();

// Función genérica para obtener las últimas noticias de una categoría
var getLatestPostsByCategory = exports.getLatestPostsByCategory = /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(category) {
    var limit,
      posts,
      _args1 = arguments,
      _t1;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          limit = _args1.length > 1 && _args1[1] !== undefined ? _args1[1] : 10;
          _context1.p = 1;
          _context1.n = 2;
          return _PostModel["default"].find({
            'Entry_Category': category
          }).sort({
            createdAt: -1
          }).limit(limit).lean();
        case 2:
          posts = _context1.v;
          return _context1.a(2, posts);
        case 3:
          _context1.p = 3;
          _t1 = _context1.v;
          throw new Error(_t1.message);
        case 4:
          return _context1.a(2);
      }
    }, _callee1, null, [[1, 3]]);
  }));
  return function getLatestPostsByCategory(_x19) {
    return _ref1.apply(this, arguments);
  };
}();
var getRelatedPost = exports.getRelatedPost = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
    var _req$params, category, postId, latestPosts, _t10;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.p = _context10.n) {
        case 0:
          _req$params = req.params, category = _req$params.category, postId = _req$params.postId;
          _context10.p = 1;
          _context10.n = 2;
          return _PostModel["default"].find({
            'Entry_Category': category,
            '_id': {
              $ne: postId
            }
          }).sort({
            createdAt: -1
          }).limit(4).lean();
        case 2:
          latestPosts = _context10.v;
          res.json(latestPosts);
          _context10.n = 4;
          break;
        case 3:
          _context10.p = 3;
          _t10 = _context10.v;
          res.status(500).json({
            message: _t10.message
          });
        case 4:
          return _context10.a(2);
      }
    }, _callee10, null, [[1, 3]]);
  }));
  return function getRelatedPost(_x20, _x21) {
    return _ref10.apply(this, arguments);
  };
}();
var getStreaming = exports.getStreaming = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
    var posts, _t11;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.p = _context11.n) {
        case 0:
          _context11.p = 0;
          _context11.n = 1;
          return _PostModel["default"].find({
            'Entry_Category': 'Streaming'
          }).sort({
            createdAt: -1
          }).lean();
        case 1:
          posts = _context11.v;
          res.json(posts);
          _context11.n = 3;
          break;
        case 2:
          _context11.p = 2;
          _t11 = _context11.v;
          res.status(500).json({
            message: _t11.message
          });
        case 3:
          return _context11.a(2);
      }
    }, _callee11, null, [[0, 2]]);
  }));
  return function getStreaming(_x22, _x23) {
    return _ref11.apply(this, arguments);
  };
}();
var getEmprender = exports.getEmprender = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
    var posts, _t12;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.p = _context12.n) {
        case 0:
          _context12.p = 0;
          _context12.n = 1;
          return _PostModel["default"].find({
            'Entry_Category': 'Emprender'
          }).sort({
            createdAt: -1
          }).lean();
        case 1:
          posts = _context12.v;
          res.json(posts);
          _context12.n = 3;
          break;
        case 2:
          _context12.p = 2;
          _t12 = _context12.v;
          res.status(500).json({
            message: _t12.message
          });
        case 3:
          return _context12.a(2);
      }
    }, _callee12, null, [[0, 2]]);
  }));
  return function getEmprender(_x24, _x25) {
    return _ref12.apply(this, arguments);
  };
}();
var getEspectaculos = exports.getEspectaculos = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(req, res) {
    var posts, _t13;
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.p = _context13.n) {
        case 0:
          _context13.p = 0;
          _context13.n = 1;
          return _PostModel["default"].find({
            'Entry_Category': 'Espectáculos'
          }).sort({
            createdAt: -1
          }).lean();
        case 1:
          posts = _context13.v;
          res.json(posts);
          _context13.n = 3;
          break;
        case 2:
          _context13.p = 2;
          _t13 = _context13.v;
          res.status(500).json({
            message: _t13.message
          });
        case 3:
          return _context13.a(2);
      }
    }, _callee13, null, [[0, 2]]);
  }));
  return function getEspectaculos(_x26, _x27) {
    return _ref13.apply(this, arguments);
  };
}();