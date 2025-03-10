const router = require('express').Router()
const db = require("../db/client.cjs")
const bcrypt = require('bcrypt')
const { response } = require('express')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ message: "USERNAME AND PASSWORD REQUIRED" })
    }

    const userExists = await db.query('SELECT * FROM users WHERE username = $1', [username])
    if (userExists.rows.length > 0) {
      console.log("userExists")
      return res.status(400).json({ message: "USER ALREADY EXISTS" })
    }
console.log("userExists")
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = await db.query("INSERT INTO users(username, password) VALUES ($1,$2) RETURNING id, username", [username, passwordHash])
    res.status(201).json({ message: "REGISTRATION SUCCESSFUL" })
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "SERVER ERROR"})
  }
})


module.exports = router;