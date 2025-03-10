const client = require('./client.cjs');

const dropTables = async () =>{
  try{
    await client.query(`
      DROP TABLE IF EXISTS kitchen_appliances_carts;
      DROP TABLE IF EXISTS carts;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS kitchen_appliances;
      `);
  }catch(err){
    console.log(err)
  };
}

const createTables = async () =>{
  try{
    await client.query(`
      CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(30) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL);
      
      CREATE TABLE kitchen_appliances(
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      type VARCHAR(30) NOT NULL,
      color VARCHAR(30) NOT NULL,
      rating CHAR(1),
      availability BOOLEAN);

      CREATE TABLE carts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      is_open BOOLEAN);

      CREATE TABLE kitchen_appliances_carts(
      id SERIAL PRIMARY KEY,
      kitchen_appliances_id INTEGER REFERENCES kitchen_appliances(id),
      carts_id INTEGER REFERENCES carts(id));
      `);

    
  }catch(err){
    console.log(err)
  };

}

const syncAndSeed = async () =>{
  await client.connect();
  console.log(`CONNECTED TO THE DB`);
  
  await dropTables();
  console.log(`DROPPING TABLES`);

  await createTables();
  console.log(`TABLES CREATED`);

  await client.end();
  console.log(`DISCONNECTED FROM THE DB`);
}

syncAndSeed();