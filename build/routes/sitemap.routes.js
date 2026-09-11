"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var router = _express["default"].Router();
var SITE_URL = 'https://www.voxdiario.com';
var COLLECTION = 'posts'; // <-- CONFIRMADO por tu debug: 3137 docs

function esc() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function getPosts() {
  return _getPosts.apply(this, arguments);
}
function _getPosts() {
  _getPosts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var limit,
      filter,
      coll,
      _args4 = arguments,
      _t;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          limit = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : 1000;
          filter = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
          if (!(_mongoose["default"].connection.readyState !== 1 || !_mongoose["default"].connection.db)) {
            _context4.n = 1;
            break;
          }
          return _context4.a(2, []);
        case 1:
          _context4.p = 1;
          coll = _mongoose["default"].connection.db.collection(COLLECTION);
          _context4.n = 2;
          return coll.find(filter).sort({
            createdAt: -1
          }).limit(limit).toArray();
        case 2:
          return _context4.a(2, _context4.v);
        case 3:
          _context4.p = 3;
          _t = _context4.v;
          console.error('[Sitemap] getPosts error', _t.message);
          return _context4.a(2, []);
      }
    }, _callee4, null, [[1, 3]]);
  }));
  return _getPosts.apply(this, arguments);
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
          return getPosts(1000);
        case 1:
          posts = _context.v;
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
          return getPosts(500, {
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
          return getPosts(50);
        case 2:
          posts = _context2.v;
        case 3:
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
          return getPosts(50);
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