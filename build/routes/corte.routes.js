"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var cortesCtrl = _interopRequireWildcard(require("../controllers/cortes.controllers"));
var _index = require("../middlewares/index.js");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var router = (0, _express.Router)();
/* REGULAR USER */
/*R*/router.get('/', cortesCtrl.getCortes);
/*R*/
router.get('/:corteId', cortesCtrl.getCortesById);

/* ADMIN && MODERATOR */
/*C*/
router.post('/', [_index.authJwt.verifyToken, _index.authJwt.isAdmin], cortesCtrl.createCorte);
/*R*/
router.put('/:corteId', [_index.authJwt.verifyToken, _index.authJwt.isAdmin], cortesCtrl.updateCortesById);
/*D*/
router["delete"]('/:corteId', [_index.authJwt.verifyToken, _index.authJwt.isAdmin], cortesCtrl.deleteCortesById);
var _default = exports["default"] = router;