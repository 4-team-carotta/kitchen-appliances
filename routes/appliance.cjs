const pg = require('pg');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Kitchen Appliances<h1>')
});

app.get('/api/v1/appliances', (req, res) => {
  res.send(['Refrigerator', 'Oven', 'Microwave', 'Dishwasher'])
});

app.listen(3000);