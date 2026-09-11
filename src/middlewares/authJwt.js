import jwt from 'jsonwebtoken';
import config from '../config.js';
import User from '../models/User.model.js';
import Roles from '../models/Role.model.js';

export const verifyToken = async (req, res, next) => {
  try{
    // LOG PARA DEBUG - borralo después
    console.log('HEADERS RECIBIDOS:', req.headers);

    const token = req.headers["x-access-token"] || req.headers["authorization"]?.split(' ')[1] || req.headers["authorization"];

    if(!token) {
      console.log('❌ NO HAY TOKEN en headers');
      return res.status(403).json({message: "No token provided"});
    }

    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, {password: 0})
    if(!user) return res.status(404).json({message: 'no user found'})

    req.user = user;
    next()
  } catch(err){
    console.log('❌ TOKEN ERROR:', err.message);
    return res.status(401).json({message: 'Unauthorized', err: err.message});
  };
};

export const isModerator = async (req, res, next) => {
  const user = req.user || await User.findById(req.userId);
  const roles = await Roles.find({_id: {$in: user.roles}});
  for(let i = 0; i < roles.length; i++){
    if(roles[i].name === "moderator" || roles[i].name === "admin"){
      next(); return;
    }
  }
  return res.status(403).json({message: 'Require Moderator role'})
}

export const isAdmin = async (req, res, next) => {
  const user = req.user || await User.findById(req.userId);
  const roles = await Roles.find({_id: {$in: user.roles}});
  for(let i = 0; i < roles.length; i++){
    if(roles[i].name === "admin"){
      next(); return;
    }
  }
  return res.status(403).json({message: 'Require Admin role'});
};