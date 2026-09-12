"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// --- MAPA FINAL 45 CATEGORÍAS VOXDIARIO ---
var CATEGORY_MAP = {
  "anticipacion-politica": "Anticipación Política",
  "politica": "Política",
  "internacionales": "Internacionales",
  "policiales": "Policiales",
  "judiciales": "Judiciales",
  "seguridad": "Seguridad",
  "sociedad": "Sociedad",
  "ciudad": "Ciudad",
  "region": "Región",
  "infraestructura": "Infraestructura",
  "obras": "Obras",
  "rutas": "Rutas",
  "transito-y-transporte": "Tránsito y Transporte",
  "clima": "Clima",
  "cooperativas": "Cooperativas",
  "vivienda-y-habitat": "Vivienda y Hábitat",
  "inmobiliarias": "Inmobiliarias",
  "economia": "Economía",
  "emprender": "Emprender",
  "vaca-muerta": "Vaca Muerta",
  "energia": "Energía",
  "campo-y-produccion": "Campo y Producción",
  "trabajo": "Trabajo",
  "gremiales": "Gremiales",
  "jubilados-y-anses": "Jubilados y ANSES",
  "salud": "Salud",
  "educacion": "Educación",
  "ciencia-y-tecnologia": "Ciencia y Tecnología",
  "tecnologia": "Tecnología",
  "deportes": "Deportes",
  "deporte-local": "Deporte Local",
  "gaming-y-esports": "Gaming y Esports",
  "espectaculos": "Espectáculos",
  "los40": "Los40",
  "streaming": "Streaming",
  "cultura": "Cultura",
  "redes": "Redes",
  "lifestyle": "Lifestyle",
  "gastronomia": "Gastronomía",
  "turismo": "Turismo",
  "ambiente": "Ambiente",
  "mascotas": "Mascotas",
  "genero-y-diversidad": "Género y Diversidad",
  "servicio-feriados": "Servicio / Feriados",
  "institucional": "Institucional",
  "agenda": "Agenda",
  "loteria-y-quiniela": "Lotería y Quiniela"
};
var CATEGORY_GRUPO = {
  "anticipacion-politica": "POLÍTICA Y ACTUALIDAD",
  "politica": "POLÍTICA Y ACTUALIDAD",
  "internacionales": "POLÍTICA Y ACTUALIDAD",
  "policiales": "POLICIAL / JUDICIAL",
  "judiciales": "POLICIAL / JUDICIAL",
  "seguridad": "POLICIAL / JUDICIAL",
  "ciudad": "NEUQUÉN",
  "region": "NEUQUÉN",
  "infraestructura": "NEUQUÉN",
  "obras": "NEUQUÉN",
  "rutas": "NEUQUÉN",
  "transito-y-transporte": "NEUQUÉN",
  "clima": "NEUQUÉN",
  "cooperativas": "NEUQUÉN",
  "vivienda-y-habitat": "NEUQUÉN",
  "inmobiliarias": "NEUQUÉN",
  "sociedad": "NEUQUÉN",
  "economia": "ECONOMÍA",
  "emprender": "ECONOMÍA",
  "vaca-muerta": "ECONOMÍA",
  "energia": "ECONOMÍA",
  "campo-y-produccion": "ECONOMÍA",
  "trabajo": "ECONOMÍA",
  "gremiales": "ECONOMÍA",
  "jubilados-y-anses": "ECONOMÍA",
  "salud": "SERVICIO",
  "educacion": "SERVICIO",
  "ciencia-y-tecnologia": "SERVICIO",
  "tecnologia": "SERVICIO",
  "servicio-feriados": "SERVICIO",
  "loteria-y-quiniela": "SERVICIO",
  "deportes": "DEPORTES",
  "deporte-local": "DEPORTES",
  "gaming-y-esports": "DEPORTES",
  "espectaculos": "CULTURA Y SHOW",
  "los40": "CULTURA Y SHOW",
  "streaming": "CULTURA Y SHOW",
  "cultura": "CULTURA Y SHOW",
  "redes": "CULTURA Y SHOW",
  "agenda": "CULTURA Y SHOW",
  "gastronomia": "ESTILO DE VIDA",
  "turismo": "ESTILO DE VIDA",
  "ambiente": "ESTILO DE VIDA",
  "mascotas": "ESTILO DE VIDA",
  "genero-y-diversidad": "ESTILO DE VIDA",
  "lifestyle": "ESTILO DE VIDA",
  "institucional": "INSTITUCIONAL"
};

// helper para generar texto limpio para TTS
var stripHtml = function stripHtml() {
  var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return html.replace(/<style[^>]*>[^]*?<\/style>/gi, '').replace(/<script[^>]*>[^]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
};
var slugify = function slugify() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return text.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').substring(0, 120);
};
var postSchema = new _mongoose.Schema({
  Entry_Title: {
    type: String,
    required: true,
    trim: true
  },
  Entry_Resume: {
    type: String,
    trim: true
  },
  Entry_Body: {
    type: String
  },
  Entry_Featured_Image: {
    type: String,
    trim: true
  },
  // --- CATEGORÍA NORMALIZADA ---
  Entry_Category: {
    type: String,
    trim: true,
    lowercase: true,
    index: true
  },
  Entry_Category_Label: {
    type: String,
    trim: true
  },
  Entry_Grupo: {
    type: String,
    trim: true
  },
  // --- PORTADA ---
  Entry_Is_Portada: {
    type: Boolean,
    "default": false
  },
  Entry_Portada_At: {
    type: Date,
    "default": null
  },
  // --- SLUG / SEO ---
  Entry_Slug: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    sparse: true
  },
  // --- BODY LIMPIO PARA TTS / LECTOR ---
  Entry_Body_Plain: {
    type: String,
    "default": ''
  },
  Entry_Body_Resume_Plain: {
    type: String,
    "default": ''
  },
  // --- TAGS ---
  Entry_Tags: {
    type: [String],
    "default": [],
    set: function set(tags) {
      if (!Array.isArray(tags)) return [];
      return _toConsumableArray(new Set(tags.map(function (t) {
        return t.toString().toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9-]/g, '-').replace(/--+/g, '-').replace(/^-|-$/g, '');
      }).filter(Boolean))).slice(0, 12);
    }
  },
  Entry_Tags_Auto: {
    type: Boolean,
    "default": false
  },
  // --- VIEWS REALES ---
  views: {
    type: Number,
    "default": 0
  },
  views24h: {
    type: Number,
    "default": 0
  },
  views7d: {
    type: Number,
    "default": 0
  },
  trendingScore: {
    type: Number,
    "default": 0
  },
  lastViewedAt: {
    type: Date,
    "default": null
  },
  viewsUnique: {
    type: Number,
    "default": 0
  },
  // --- TTS y Audio ---
  ttsEnabled: {
    type: Boolean,
    "default": true
  },
  ttsAudioUrl: {
    type: String,
    "default": null
  },
  ttsGeneratedAt: {
    type: Date,
    "default": null
  },
  // --- Métricas ---
  readingTime: {
    type: Number,
    "default": 0
  },
  shares: {
    type: Number,
    "default": 0
  }
}, {
  timestamps: true,
  versionKey: false
});

// --- MIDDLEWARE ---
postSchema.pre('save', function (next) {
  // 1. NORMALIZACIÓN DE CATEGORÍA - EL PARCHE CLAVE
  if (this.isModified('Entry_Category') && this.Entry_Category) {
    var slug = slugify(this.Entry_Category);
    this.Entry_Category = slug;
    // Label bonito automático
    this.Entry_Category_Label = CATEGORY_MAP[slug] || this.Entry_Category;
    // Grupo para el select del admin
    this.Entry_Grupo = CATEGORY_GRUPO[slug] || 'OTROS';
  }
  if (!this.Entry_Slug && this.Entry_Title) {
    this.Entry_Slug = slugify(this.Entry_Title) + '-' + Date.now().toString(36);
  }
  if (this.isModified('Entry_Body') && this.Entry_Body) {
    this.Entry_Body_Plain = stripHtml(this.Entry_Body).substring(0, 20000);
    this.readingTime = Math.ceil(this.Entry_Body_Plain.split(' ').length / 200);
  }
  if (this.isModified('Entry_Resume') && this.Entry_Resume) {
    this.Entry_Body_Resume_Plain = stripHtml(this.Entry_Resume);
  }
  if (this.isModified('Entry_Is_Portada') && this.Entry_Is_Portada && !this.Entry_Portada_At) {
    this.Entry_Portada_At = new Date();
  }
  if (this.Entry_Tags.length === 0 && this.Entry_Title) {
    var base = "".concat(this.Entry_Title, " ").concat(this.Entry_Category).toLowerCase();
    var words = base.split(/[\s,.-]+/).filter(function (w) {
      return w.length > 3;
    }).slice(0, 4);
    if (words.length) {
      this.Entry_Tags = words;
      this.Entry_Tags_Auto = true;
    }
  }
  next();
});

// --- INDICES - TODO ACA, UNA SOLA VEZ ---
postSchema.index({
  createdAt: -1
});
postSchema.index({
  Entry_Category: 1,
  createdAt: -1
});
postSchema.index({
  Entry_Title: 'text',
  Entry_Resume: 'text',
  Entry_Body_Plain: 'text'
});
postSchema.index({
  Entry_Is_Portada: 1,
  Entry_Portada_At: -1
});
postSchema.index({
  Entry_Is_Portada: 1,
  createdAt: -1
});
postSchema.index({
  views: -1
});
postSchema.index({
  views24h: -1,
  createdAt: -1
});
postSchema.index({
  trendingScore: -1,
  createdAt: -1
});
postSchema.index({
  lastViewedAt: -1
});
postSchema.index({
  Entry_Tags: 1
});
postSchema.index({
  Entry_Tags: 1,
  createdAt: -1
});
postSchema.index({
  Entry_Category: 1,
  Entry_Tags: 1
});
postSchema.index({
  Entry_Grupo: 1
});
var _default = exports["default"] = (0, _mongoose.model)('Post', postSchema);