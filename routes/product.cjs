const pg = require('pg');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Products<h1>')
});

app.get('/api/v1/productsid', (req, res) => {
  res.send(['1', '2', '3', '4'])
});

app.listen(3000);