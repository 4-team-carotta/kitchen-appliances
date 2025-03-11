const client = require('./client.cjs');
const createAppliancesCarts = async (idOfAppliance, idOfCart) => {
  try{
    await client.query(`
      INSERT INTO kitchen_appliances_carts(kitchen_appliances_id, carts_id)
      VALUES ('${idOfAppliance}','${idOfCart}')
      `)
  }catch(err){
    console.log(err);
  };

};

module.exports = { createAppliancesCarts };