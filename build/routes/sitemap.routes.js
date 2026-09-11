"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var router = _express["default"].Router();
var SITE_URL = 'https://www.voxdiario.com';
function esc() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function getAllPosts() {
  return _getAllPosts.apply(this, arguments);
}
function _getAllPosts() {
  _getAllPosts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var limit,
      filter,
      collections,
      names,
      candidates,
      _i,
      _candidates,
      name,
      coll,
      count,
      sample,
      docs,
      _iterator,
      _step,
      colName,
      _coll,
      one,
      _args4 = arguments,
      _t,
      _t2,
      _t3,
      _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          limit = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : 1000;
          filter = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
          _context4.p = 1;
          if (!(_mongoose["default"].connection.readyState !== 1)) {
            _context4.n = 2;
            break;
          }
          return _context4.a(2, []);
        case 2:
          _context4.n = 3;
          return _mongoose["default"].connection.db.listCollections().toArray();
        case 3:
          collections = _context4.v;
          names = collections.map(function (c) {
            return c.name;
          });
          console.log('[Sitemap] Colecciones disponibles:', names);

          // Nombres probables en orden
          candidates = ['Entry', 'entries', 'Posts', 'posts', 'post', 'Post', 'entriesmodels', 'entrys'];
          _i = 0, _candidates = candidates;
        case 4:
          if (!(_i < _candidates.length)) {
            _context4.n = 12;
            break;
          }
          name = _candidates[_i];
          if (!(!names.includes(name) && !names.includes(name.toLowerCase()))) {
            _context4.n = 5;
            break;
          }
          return _context4.a(3, 11);
        case 5:
          _context4.p = 5;
          coll = _mongoose["default"].connection.db.collection(name);
          _context4.n = 6;
          return coll.countDocuments();
        case 6:
          count = _context4.v;
          if (!(count > 0)) {
            _context4.n = 9;
            break;
          }
          _context4.n = 7;
          return coll.findOne();
        case 7:
          sample = _context4.v;
          if (!(sample && (sample.Entry_Title || sample.title))) {
            _context4.n = 9;
            break;
          }
          console.log("[Sitemap] Usando colecci\xF3n: ".concat(name, " con ").concat(count, " docs"));
          _context4.n = 8;
          return coll.find(filter).sort({
            createdAt: -1,
            _id: -1
          }).limit(limit).toArray();
        case 8:
          docs = _context4.v;
          if (!(docs.length > 0)) {
            _context4.n = 9;
            break;
          }
          return _context4.a(2, docs);
        case 9:
          _context4.n = 11;
          break;
        case 10:
          _context4.p = 10;
          _t = _context4.v;
        case 11:
          _i++;
          _context4.n = 4;
          break;
        case 12:
          // 2. Si no encontró, busca en TODAS las colecciones una que tenga Entry_Title
          _iterator = _createForOfIteratorHelper(names);
          _context4.p = 13;
          _iterator.s();
        case 14:
          if ((_step = _iterator.n()).done) {
            _context4.n = 21;
            break;
          }
          colName = _step.value;
          if (!colName.startsWith('system.')) {
            _context4.n = 15;
            break;
          }
          return _context4.a(3, 20);
        case 15:
          _context4.p = 15;
          _coll = _mongoose["default"].connection.db.collection(colName);
          _context4.n = 16;
          return _coll.findOne({
            Entry_Title: {
              $exists: true
            }
          });
        case 16:
          one = _context4.v;
          if (!one) {
            _context4.n = 18;
            break;
          }
          console.log("[Sitemap] Encontrada por campo Entry_Title en: ".concat(colName));
          _context4.n = 17;
          return _coll.find(filter).sort({
            createdAt: -1
          }).limit(limit).toArray();
        case 17:
          return _context4.a(2, _context4.v);
        case 18:
          _context4.n = 20;
          break;
        case 19:
          _context4.p = 19;
          _t2 = _context4.v;
        case 20:
          _context4.n = 14;
          break;
        case 21:
          _context4.n = 23;
          break;
        case 22:
          _context4.p = 22;
          _t3 = _context4.v;
          _iterator.e(_t3);
        case 23:
          _context4.p = 23;
          _iterator.f();
          return _context4.f(23);
        case 24:
          _context4.n = 26;
          break;
        case 25:
          _context4.p = 25;
          _t4 = _context4.v;
          console.error('getAllPosts error', _t4);
        case 26:
          return _context4.a(2, []);
      }
    }, _callee4, null, [[15, 19], [13, 22, 23, 24], [5, 10], [1, 25]]);
  }));
  return _getAllPosts.apply(this, arguments);
}
router.get('/robots.txt', function (req, res) {
  res.type('text/plain').send("User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nDisallow: /api/auth/\n\nSitemap: ".concat(SITE_URL, "/sitemap.xml\nSitemap: ").concat(SITE_URL, "/sitemap-news.xml"));
});
router.get('/sitemap.xml', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var posts, urls;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return getAllPosts(1000);
        case 1:
          posts = _context.v;
          console.log("[Sitemap] sitemap.xml -> ".concat(posts.length, " posts"));
          urls = posts.map(function (p) {
            var cat = esc(p.Entry_Category || 'noticia');
            var id = esc(p._id);
            var img = p.Entry_Featured_Image ? "<image:image><image:loc>".concat(esc(p.Entry_Featured_Image), "</image:loc></image:image>") : '';
            var lastmod = new Date(p.updatedAt || p.createdAt || Date.now()).toISOString();
            return " <url><loc>".concat(SITE_URL, "/").concat(cat, "/").concat(id, "</loc><lastmod>").concat(lastmod, "</lastmod>").concat(img, "</url>");
          }).join('\n');
          res.header('Content-Type', 'application/xml').send("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:image=\"http://www.google.com/schemas/sitemap-image/1.0\">\n  <url><loc>".concat(SITE_URL, "/</loc><changefreq>always</changefreq><priority>1.0</priority></url>\n").concat(urls, "\n</urlset>"));
        case 2:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/sitemap-news.xml', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var since, posts, urls;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          since = new Date(Date.now() - 48 * 60 * 60 * 1000);
          _context2.n = 1;
          return getAllPosts(500, {
            createdAt: {
              $gte: since
            }
          });
        case 1:
          posts = _context2.v;
          if (posts.length) {
            _context2.n = 3;
            break;
          }
          _context2.n = 2;
          return getAllPosts(50);
        case 2:
          posts = _context2.v;
        case 3:
          console.log("[Sitemap] sitemap-news.xml -> ".concat(posts.length, " posts"));
          urls = posts.map(function (p) {
            return " <url><loc>".concat(SITE_URL, "/").concat(esc(p.Entry_Category), "/").concat(esc(p._id), "</loc><news:news><news:publication><news:name>Vox Diario</news:name><news:language>es</news:language></news:publication><news:publication_date>").concat(new Date(p.createdAt).toISOString(), "</news:publication_date><news:title><![CDATA[").concat(p.Entry_Title, "]]></news:title></news:news></url>");
          }).join('\n');
          res.header('Content-Type', 'application/xml').send("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:news=\"http://www.google.com/schemas/sitemap-news/0.9\">\n".concat(urls, "\n</urlset>"));
        case 4:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.get('/feed.xml', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var posts, items;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.n = 1;
          return getAllPosts(50);
        case 1:
          posts = _context3.v;
          items = posts.map(function (p) {
            return "<item><title><![CDATA[".concat(p.Entry_Title, "]]></title><link>").concat(SITE_URL, "/").concat(esc(p.Entry_Category), "/").concat(esc(p._id), "</link><description><![CDATA[").concat((p.Entry_Resume || '').slice(0, 300), "]]></description><pubDate>").concat(new Date(p.createdAt).toUTCString(), "</pubDate></item>");
          }).join('\n');
          res.header('Content-Type', 'application/rss+xml').send("<?xml version=\"1.0\"?><rss version=\"2.0\"><channel><title>Vox Diario</title><link>".concat(SITE_URL, "</link><description>Noticias de Neuqu\xE9n y Patagonia</description>").concat(items, "</channel></rss>"));
        case 2:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = exports["default"] = router;