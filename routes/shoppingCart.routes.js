const {Router} = require('express')
const { auth } = require('../middlewares/auth.middleware')
const { newShoppingCart, getShoppingCartById, getShoppingCart, updateShoppingCart, deletShoppingCart, addProduct, removeProduct, calculateTotalPrice } = require('../controllers/shoppingCart.controller')
const router = Router()

// router.get('/', getShoppingCart)

router.get('/', auth ,getShoppingCartById)

router.patch('/Calculate/:id', auth ,calculateTotalPrice)

router.post('/', auth ,newShoppingCart)

router.post('/addProduct', auth ,addProduct)

router.patch('/edit',updateShoppingCart)

// router.delete('/:id', deletShoppingCart)

router.patch('/deleteProduct', auth, removeProduct)



module.exports = router