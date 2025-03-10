const client = require('./client.cjs');
const createUser = async (inputUsername, inputPassword) =>{
  try{
    const { rows } = await client.query(`
      INSERT INTO users (username, password)
      VALUES ('${inputUsername}','${inputPassword}')
      RETURNING *`);
      return rows[0];
  }catch(err){
    console.log(err)
  };
};

module.exports = { createUser }