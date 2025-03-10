const router = require('express').Router()
const authRoutes = require('./auth.cjs')

router.use(authRoutes)



module.exports = router;