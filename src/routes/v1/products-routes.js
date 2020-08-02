const productController = require('../../controllers/v1/products-controller');
const { isAuth} = require('../../middlewares/auth');
const express = require('express');

const router = express.Router();
//router como tipo post
router.post('/create',productController.createProduct) //paso usersController
router.get('/get-products',isAuth,productController.getProducts)
router.get('/get-products-User/:userId',productController.getProductsByUser)
router.post('/delete', isAuth , productController.deleteProduct)
router.post('/update',isAuth,productController.updateProduct)

module.exports = router;