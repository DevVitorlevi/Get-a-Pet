const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/registrar', UserController.registrar)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)

module.exports = router