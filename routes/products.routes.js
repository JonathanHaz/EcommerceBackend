const {Router} = require('express')
const { auth } = require('../middlewares/auth.middleware')
const {getProduct, editProduct, createProduct, deleteProduct, addImageProduct} = require('../controllers/products.controller')
const  upload  = require('../middlewares/upload')
const router = Router()

router.get('/', getProduct)

router.post('/', auth ,createProduct)

router.patch('/edit',editProduct)

router.post('/image/:id', upload.single("productImage"), addImageProduct)

router.delete('/:id',deleteProduct)


module.exports = router