"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
var _path = _interopRequireDefault(require("path"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _postModel = _interopRequireDefault(require("../models/post.model.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
_dotenv["default"].config({
  path: _path["default"].resolve(process.cwd(), '.env')
});
var stripHtml = function stripHtml() {
  var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return html.replace(/<style[^>]*>[^]*?<\/style>/gi, '').replace(/<script[^>]*>[^]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
};
var slugify = function slugify() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').substring(0, 120);
};
await _mongoose["default"].connect(process.env.MONGODB_URI);
var posts = await _postModel["default"].find({
  $or: [{
    Entry_Slug: {
      $exists: false
    }
  }, {
    Entry_Slug: null
  }, {
    Entry_Body_Plain: {
      $exists: false
    }
  }, {
    Entry_Body_Plain: ''
  }]
});
var _iterator = _createForOfIteratorHelper(posts),
  _step;
try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var p = _step.value;
    if (!p.Entry_Slug) p.Entry_Slug = slugify(p.Entry_Title) + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 4);
    if (!p.Entry_Body_Plain && p.Entry_Body) p.Entry_Body_Plain = stripHtml(p.Entry_Body).substring(0, 20000);
    if (p.Entry_Resume && !p.Entry_Body_Resume_Plain) p.Entry_Body_Resume_Plain = stripHtml(p.Entry_Resume);
    await p.save();
    console.log('migrado', p.Entry_Slug);
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}
process.exit();