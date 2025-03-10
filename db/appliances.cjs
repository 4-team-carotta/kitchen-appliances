const client = require('./client.cjs');
const createAppliances = async (inputName, inputType, inputColor, inputRating, inputAvailability) => {
  try{
    const { rows } = await client.query(`
      INSERT INTO kitchen_appliances(name, type, color, rating, availability)
      VALUES ('${inputName}','${inputType}','${inputColor}','${inputRating}','${inputAvailability}')
      RETURNING *`);
      return rows[0];
  }catch(err){
    console.log(err);
  };

};

module.exports = { createAppliances };