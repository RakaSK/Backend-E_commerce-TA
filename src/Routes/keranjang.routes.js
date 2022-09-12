const { Router } = require('express');
const {
    saveHistoryKeranjang,
    deleteHistoryKeranjang,
    getAllKeranjang,
    getKeranjang,
    getKeranjangDetails, 
    changeItemKeranjang,
} = require('../Controller/KeranjangController');
const { validateToken }  = require('../Middlewares/ValidateToken');
// const { uploadsProduct, uploadsBuktiPembayaran } = require('../Helpers/Multer');

const router = Router();

    router.post('/product/save-history-keranjang', validateToken, saveHistoryKeranjang);
    router.post('/product/get-all-keranjang-products', validateToken, getAllKeranjang);
    router.post('/product/get-keranjang-products', validateToken, getKeranjang);

    router.get('/product/get-keranjang-details/:uidKeranjang', validateToken, getKeranjangDetails);
    router.delete('/product/delete-keranjang/:uidKeranjangDetails', validateToken, deleteHistoryKeranjang);
    router.post('/product/change-item', changeItemKeranjang);


module.exports = router;