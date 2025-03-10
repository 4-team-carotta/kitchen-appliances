const client = require('./client.cjs');
const { createUser } = require('./users.cjs');
const { createCarts } = require('./carts.cjs');
const { createAppliances } = require('./appliances.cjs');
const { createAppliancesCarts } =require('./appliances-carts.cjs');

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

  const bobby = await createUser('bobby','bobby1');
  const timmy = await createUser('timmy','timmy1');
  const sally = await createUser('sally','sally1');
  const callie = await createUser('callie','callie1');
  const jenny = await createUser('jenny','jenny1');
  console.log(`USERS CREATED`);

  const blender = await createAppliances('Magic Blender','blender','stainless-steel','4','true');
  const coffee = await createAppliances('CoffeePal','coffee-maker','stainless-steel','5','true');
  const ice = await createAppliances('Ice Forever','ice-machine','white','3','false');
  const fridge = await createAppliances('Kitchen-helper','refrigerator','red','4','true');
  const dishwasher = await createAppliances('Kitchen-helper','dishwasher','black','2','false');
  console.log(`APPLIANCES CREATED`)

  const cartOne = await createCarts(bobby.id,'true');
  const cartTwo = await createCarts(bobby.id,'false');
  const cartThree = await createCarts(sally.id,'true');
  const cartFour = await createCarts(timmy.id,'false');
  const cartFive = await createCarts(jenny.id,'true');
  console.log(`CARTS CREATED`);

  await createAppliancesCarts(blender.id, cartOne.id);
  await createAppliancesCarts(coffee.id, cartTwo.id);
  await createAppliancesCarts(ice.id, cartThree.id);
  await createAppliancesCarts(fridge.id, cartFour.id);
  await createAppliancesCarts(dishwasher.id, cartFive.id);
  console.log(`APPLIANCES CARTS CREATED`)

  await client.end();
  console.log(`DISCONNECTED FROM THE DB`);
}

syncAndSeed();