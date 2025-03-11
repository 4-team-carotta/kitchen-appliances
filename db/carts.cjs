const client = require('./client.cjs');
const createCarts = async (idOfUser, isCartOpen) =>{
  try{
     const { rows } = await client.query(`
      INSERT INTO carts(user_id, is_open)
      VALUES ('${idOfUser}','${isCartOpen}')
      RETURNING *`);
      return rows[0];
  }catch(err){
    console.log(err);
  };
};

module.exports = { createCarts };