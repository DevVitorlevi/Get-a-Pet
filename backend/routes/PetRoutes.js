const router = require('express').Router()
const PetController = require('../controllers/PetController')

const verifyToken = require('../helpers/verify-token')
const {ImageUpload} = require('../helpers/image-upload')

router.post('/create', verifyToken,ImageUpload.array("images"),PetController.Createpet)
router.get('/'  ,PetController.Allpets)
router.get('/mypets', verifyToken, PetController.Mypets)
router.get('/myadotados', verifyToken, PetController.Myadotados)
router.get('/pet/:id',PetController.PetId)
module.exports = router