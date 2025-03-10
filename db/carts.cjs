const client = require('./client.cjs');
const createCarts = async (idOfUser, isCartOpen) =>{
  try{
     await client.query(`
      INSERT INTO carts(user_id, is_open)
      VALUES ('${idOfUser}','${isCartOpen}')
      `);
  }catch(err){
    console.log(err);
  };
};

module.exports = { createCarts };