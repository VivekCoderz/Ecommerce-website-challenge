const express = require("express")
const router = express.Router()
const cartController = require("../controllers/cart.js")
const authentication = require('../middleware/authentication.js')

router.post('/add-to-cart',authentication,cartController.postAddToCart)
router.post('/update-quantity',authentication,cartController.postUpdateQuantity)
router.post('/remove-item',authentication,cartController.postRemoveItem)
router.post('/clear-cart',authentication,cartController.postClearCart)
router.get('/',authentication,cartController.getCart)

module.exports = router