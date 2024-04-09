import Role from '../models/Role.model.js';
export const createRoles  = async () => {
  try{
    const count = await Role.estimatedDocumentCount();

    if (count === 0) {
      
      new Role({ name: "user" }).save();
      new Role({ name: "moderator" }).save();
      new Role({ name: "admin" }).save();

      console.log('Roles de usuario creados');
    }
    // const values = await Promise.all([]);
  } catch(error){
    console.error(error);
  }
};  