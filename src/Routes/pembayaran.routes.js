const { Router } = require('express');
const { 
    saveOrderBuyProducts,
    getAllPurchasedProducts,
    getOrderDetailsProducts, 
    saveOrderBuyProducts2,
    updateStatusPembayaran,
    getAllPurchasedProductsAdmin,
} = require('../Controller/PembayaranController');
const { validateToken }  = require('../Middlewares/ValidateToken');
const { uploadsBuktiPembayaran } = require('../Helpers/Multer');

const router = Router();

    
    router.post('/product/save-order-buy-product', validateToken, saveOrderBuyProducts);
    router.post('/product/save-order-buy-product-2:uidOrder', [validateToken, uploadsBuktiPembayaran.single('BuktiPembayaranImage')], saveOrderBuyProducts2);
    router.get('/product/get-all-purchased-products-admin', validateToken, getAllPurchasedProductsAdmin);
    router.post('/product/get-all-purchased-products', validateToken, getAllPurchasedProducts);
    router.get('/product/get-orders-details/:uidOrder', validateToken, getOrderDetailsProducts);
    router.put('/update-status-pembayaran', validateToken, updateStatusPembayaran);
   


module.exports = router;