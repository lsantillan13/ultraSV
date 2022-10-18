import {ROLES} from '../models/Role.model.js';
import UserModel from '../models/User.model.js';

export const checkDuplicatedUsernameOrEmail = async (req, res, next) => {
  const user = await UserModel.findOne({username: req.body.username});

  if(user) return res.status(400).json({message: 'User already exists'});

  const email = await UserModel.findOne({email: req.body.email});
  if(email) return res.status(400).json({message: 'Email already exists'})

  next();
};

export const checkRoles = (req, res, next) => {
  if(req.body.roles){
    for(let i = 0;  i < req.body.roles.length; i++){
      if(!ROLES.includes(req.body.roles[i])){
        return res.status(400).json({message: `Role ${req.body.roles[i]} does not exists`})
      }
    }
  }
  next();
};