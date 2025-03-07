
const { Client } = require('pg');
const client = new Client('postgres://localhost:5432/carotta_kitchen_appliances');

module.exports = client;