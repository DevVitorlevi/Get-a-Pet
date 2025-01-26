const router = require('express').Router()
const PetController = require('../controllers/PetController')

const verifyToken = require('../helpers/verify-token')
const {ImageUpload} = require('../helpers/image-upload')

router.post('/create', verifyToken,ImageUpload.array("images"),PetController.Createpet)

module.exports = router