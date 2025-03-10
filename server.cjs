const express = require('express')
const routes = require('./routes/index.cjs')

const app = express()

app.use(express.json())

app.use('/api/v1', routes)


const PORT = process.env.PORT || 3001;
app.listen(PORT,()=> console.log(`SERVER RUNNING ON PORT ${PORT}`))