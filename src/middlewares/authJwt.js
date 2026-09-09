import jwt from 'jsonwebtoken';
import config from '../config.js';
import User from '../models/User.model.js';
import Roles from '../models/Role.model.js';

export const verifyToken = async (req, res, next) => {
  try {
    // Acepta x-access-token O Authorization: Bearer <token>
    let token = req.headers["x-access-token"] || req.headers["authorization"] || req.headers["Authorization"];

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    // Si viene como "Bearer xxxxx", lo limpiamos
    if (typeof token === 'string' && token.startsWith('Bearer ')) {
      token = token.slice(7);
    }

    const decoded = jwt.verify(token, config.SECRET);

    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });

    if (!user) return res.status(404).json({ message: 'no user found' });

    // Guardamos el user para isModerator / isAdmin
    req.user = user;

    next();
  } catch (err) {
    console.error('[verifyToken]', err.message);
    return res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
};

export const isModerator = async (req, res, next) => {
  try {
    const user = req.user || await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'no user found' });

    const roles = await Roles.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator" || roles[i].name === "admin") {
        next();
        return;
      }
    }
    return res.status(403).json({ message: 'Require Moderator role' });
  } catch (e) {
    return res.status(500).json({ message: 'Error checking moderator role' });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = req.user || await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'no user found' });

    const roles = await Roles.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }
    return res.status(403).json({ message: 'Require Admin role' });
  } catch (e) {
    return res.status(500).json({ message: 'Error checking admin role' });
  }
};