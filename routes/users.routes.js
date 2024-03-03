const {Router} = require('express')
const { getUser, Register, Login,getUsers,deleteUser,updateUser, addImageUser } = require('../controllers/users.controller')
const  upload  = require('../middlewares/upload')
const { auth } = require('../middlewares/auth.middleware')

const router = Router()

// router.get('/', getUsers)
router.get('/db',auth, getUser)
router.post('/register', Register)
router.post('/image/:id', upload.single("productUser"), addImageUser)
router.post('/login', Login)
router.delete('/:id', deleteUser); 
router.patch('/:id', updateUser);    

module.exports = router