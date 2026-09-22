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
var SITE_URL = 'https://voxdiario.com'; // CANONICA SIN WWW
var COLLECTION = 'posts';
function esc() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return String(str !== null && str !== void 0 ? str : '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').trim();
}
function safeCdata() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return String(str !== null && str !== void 0 ? str : '').replace(/]]>/g, ']]]]><![CDATA[>');
}
var isCloudinary = function isCloudinary() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return /res\.cloudinary\.com/i.test(url) && !String(url).startsWith('data:') && String(url).length < 2000;
};
var cleanDate = function cleanDate(d) {
  try {
    return new Date(d).toISOString();
  } catch (_unused) {
    return new Date().toISOString();
  }
};
function getPosts() {
  return _getPosts.apply(this, arguments);
} // robots.txt -> apunta al index ahora
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
          limit = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : 5000;
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
  res.set('Cache-Control', 'public, max-age=86400');
  res.type('text/plain').send("User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nDisallow: /api/auth/\nDisallow: /RadioAdmin/\n\nSitemap: ".concat(SITE_URL, "/sitemap-index.xml"));
});

// SITEMAP PRINCIPAL - ultimas 5000
var sitemapHandler = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var posts, urls;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return getPosts(5000, {
            Entry_Slug: {
              $exists: true,
              $ne: "",
              $type: "string"
            },
            createdAt: {
              $exists: true
            }
          });
        case 1:
          posts = _context.v;
          posts = posts.filter(function (p) {
            return p.Entry_Slug && !p.Entry_Slug.includes(' ') && p.Entry_Slug.length > 2;
          });
          urls = posts.map(function (p) {
            var cat = esc((p.Entry_Category || 'noticia').toLowerCase());
            var slug = esc(p.Entry_Slug);
            var lastmod = cleanDate(p.updatedAt || p.createdAt);
            var img = isCloudinary(p.Entry_Featured_Image) ? "\n <image:image><image:loc>".concat(esc(p.Entry_Featured_Image), "</image:loc><image:title><![CDATA[").concat(safeCdata(p.Entry_Title), "]]></image:title></image:image>") : '';
            return " <url><loc>".concat(SITE_URL, "/").concat(cat, "/").concat(slug, "</loc><lastmod>").concat(lastmod, "</lastmod><changefreq>daily</changefreq><priority>0.8</priority>").concat(img, "</url>");
          }).join('\n');
          res.set('Cache-Control', 'public, max-age=3600');
          res.header('Content-Type', 'application/xml').send("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:image=\"http://www.google.com/schemas/sitemap-image/1.1\">\n  <url><loc>".concat(SITE_URL, "/</loc><lastmod>").concat(cleanDate(new Date()), "</lastmod><changefreq>always</changefreq><priority>1.0</priority></url>\n").concat(urls, "\n</urlset>"));
        case 2:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function sitemapHandler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// GOOGLE NEWS - ultimas 48hs
var newsHandler = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var since, posts, urls;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          since = new Date(Date.now() - 48 * 60 * 60 * 1000);
          _context2.n = 1;
          return getPosts(1000, {
            createdAt: {
              $gte: since
            },
            Entry_Slug: {
              $exists: true,
              $ne: ""
            }
          });
        case 1:
          posts = _context2.v;
          posts = posts.filter(function (p) {
            return p.Entry_Title && p.Entry_Title.length > 10;
          });
          urls = posts.map(function (p) {
            var cat = esc((p.Entry_Category || 'noticia').toLowerCase());
            var slug = esc(p.Entry_Slug);
            return " <url><loc>".concat(SITE_URL, "/").concat(cat, "/").concat(slug, "</loc><news:news><news:publication><news:name>Vox Diario</news:name><news:language>es</news:language></news:publication><news:publication_date>").concat(cleanDate(p.createdAt), "</news:publication_date><news:title><![CDATA[").concat(safeCdata(p.Entry_Title), "]]></news:title></news:news></url>");
          }).join('\n');
          res.set('Cache-Control', 'public, max-age=300');
          res.header('Content-Type', 'application/xml').send("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:news=\"http://www.google.com/schemas/sitemap-news/0.9\">\n".concat(urls, "\n</urlset>"));
        case 2:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function newsHandler(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// ARCHIVE - viejas
var archiveHandler = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var cutoff, posts, urls;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);
          _context3.n = 1;
          return getPosts(50000, {
            createdAt: {
              $lt: cutoff
            },
            Entry_Slug: {
              $exists: true,
              $ne: ""
            }
          });
        case 1:
          posts = _context3.v;
          posts = posts.filter(function (p) {
            return p.Entry_Slug && p.Entry_Slug.length > 2;
          });
          urls = posts.map(function (p) {
            var cat = esc((p.Entry_Category || 'noticia').toLowerCase());
            var slug = esc(p.Entry_Slug);
            var lastmod = cleanDate(p.updatedAt || p.createdAt);
            return " <url><loc>".concat(SITE_URL, "/").concat(cat, "/").concat(slug, "</loc><lastmod>").concat(lastmod, "</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>");
          }).join('\n');
          res.set('Cache-Control', 'public, max-age=86400');
          res.header('Content-Type', 'application/xml').send("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n".concat(urls, "\n</urlset>"));
        case 2:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return function archiveHandler(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// SITEMAP INDEX - solo los que existen
var sitemapIndexHandler = function sitemapIndexHandler(req, res) {
  var lastmod = cleanDate(new Date());
  res.set('Cache-Control', 'public, max-age=3600');
  res.header('Content-Type', 'application/xml').send("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n  <sitemap><loc>".concat(SITE_URL, "/sitemap.xml</loc><lastmod>").concat(lastmod, "</lastmod></sitemap>\n  <sitemap><loc>").concat(SITE_URL, "/sitemap-news.xml</loc><lastmod>").concat(lastmod, "</lastmod></sitemap>\n  <sitemap><loc>").concat(SITE_URL, "/sitemap-archive.xml</loc><lastmod>").concat(lastmod, "</lastmod></sitemap>\n</sitemapindex>"));
};
router.get(['/sitemap.xml', '/api/v2/sitemap.xml'], sitemapHandler);
router.get(['/sitemap-news.xml', '/api/v2/sitemap-news.xml'], newsHandler);
router.get(['/sitemap-archive.xml', '/api/v2/sitemap-archive.xml'], archiveHandler);
router.get(['/sitemap-index.xml', '/api/v2/sitemap-index.xml'], sitemapIndexHandler);
var _default = exports["default"] = router;