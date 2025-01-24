const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/registrar', UserController.registrar)

module.exports = router