const router = require('express').Router()
const PetController = require('../controllers/PetController')

const verifyToken = require('../helpers/verify-token')
const {ImageUpload} = require('../helpers/image-upload')

router.post('/create', verifyToken,ImageUpload.array("images"),PetController.Createpet)
router.get('/'  ,PetController.Allpets)
router.get('/mypets', verifyToken, PetController.Mypets)
router.get('/myadotados', verifyToken, PetController.Myadotados)
router.get('/pet/:id',PetController.PetId)
router.delete('/pet/:id', verifyToken, PetController.Deletepet)
router.patch('/pet/:id', verifyToken,ImageUpload.array('images'),PetController.UpdatePet)
router.patch('/agendar/:id',verifyToken,PetController.AgendarPet)
router.patch('/adotar/:id',verifyToken,PetController.Concluir)
module.exports = router