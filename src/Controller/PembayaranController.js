const { response, request } = require('express');
const connet = require('../DataBase/DataBase');


const saveOrderBuyProducts = async (req = request, res = response) => {

   try {
       
    const { receipt, amount, products  } = req.body;

    const conn = await connet();
 
    const db = await conn.query('INSERT INTO orderBuy (user_id, receipt, amount) VALUES (?,?,?)', [ req.uidPerson, receipt, amount ]);

    products.forEach(e => {
        conn.query('INSERT INTO orderDetails (orderBuy_id, product_id, quantity, price) VALUES (?,?,?,?)', [db[0].insertId, e.uidProduct, e.amount, e.price]);
        conn.query('UPDATE products SET stock = stock-? WHERE uidProduct = ?', [ e.amount, e.uidProduct ]);
    });

    // await conn.end();

    return res.json({
        resp: true,
        message: 'Products save'
    });


   } catch (err) {
    return res.status(500).json({
        resp: false,
        message: err
    });
   }
}

const saveOrderBuyProducts2 = async (req = request, res = response) => {

    try {
        
    //  const { picture  } = req.body;
 
     const conn = await connet();
  
    //  await conn.query('INSERT INTO orderBuy (user_id, picture) VALUES (?,?)', 
    //         [ req.uidPerson, req.file.filename ]);

    await conn.query('UPDATE orderBuy SET picture = ? WHERE uidOrderBuy = ?', 
            [ req.file.filename, req.uidOrder ]);

        await conn.end();   

        return res.json({
            resp: true,
            message: 'Bukti Pembayaran Added'
        })
        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }
 }


const getAllPurchasedProductsAdmin = async ( req, res = response ) => {

    // const { token } = req.body;

    try {

        const conn = await connet();

        // const orderbuy = await conn.query('SELECT * FROM orderBuy JOIN users on orderbuy.user_id = users.id WHERE user_id = ?' [ req.uidPerson ]);

        const orderbuy = await conn.query('SELECT * FROM orderBuy JOIN users on orderbuy.user_id = users.id');

        await conn.end();

        res.json({
            resp: true,
            msg : 'Get Puchased Products',
            orderBuy : orderbuy[0],
        });
        
    } catch (err) {
        
    }
   
}


const getAllPurchasedProducts = async ( req, res = response ) => {

    const { token } = req.body;

    try {

        const conn = await connet();

        // const orderbuy = await conn.query('SELECT * FROM orderBuy JOIN users on orderbuy.user_id = users.id WHERE user_id = ?' [ req.uidPerson ]);

        const orderbuy = await conn.query('SELECT * FROM orderBuy JOIN users on orderbuy.user_id = users.id WHERE users.token = ?' , [token]);

        await conn.end();

        res.json({
            resp: true,
            msg : 'Get Puchased Products',
            orderBuy : orderbuy[0],
        });
        
    } catch (err) {
        
    }
   
}

const getOrderDetailsProducts = async ( req, res = response ) => {

    try {

        const conn = await connet();

        const orderDetails = await conn.query(`CALL SP_ORDER_DETAILS(?);`, [req.params.uidOrder]);

        await conn.end();

        res.json({
            resp: true,
            msg : 'Get Puchased Products',
            orderDetails : orderDetails[0][0],
        });
        
    } catch (err) {
        
    }
   
}


const updateStatusPembayaran = async (req = request, res = response) => {

    try {

        const conn = await connet();

        const { status, uidOrderBuy } = req.body;

        await conn.query('UPDATE orderBuy SET status = ? WHERE uidOrderBuy = ?', [ parseInt(status), parseInt(uidOrderBuy) ]);

        // await conn.query('UPDATE orderBuy SET status = ? WHERE uidOrderBuy = ?', [ req.status, req.uidOrderBuy ]);

        await conn.end();   

        return res.json({
            resp: true,
            message: 'Pembayaran Updated'
        });
        
    } catch (err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }

}




module.exports = {
    saveOrderBuyProducts,
    saveOrderBuyProducts2,
    getAllPurchasedProducts,
    getOrderDetailsProducts,
    getAllPurchasedProductsAdmin, 
    updateStatusPembayaran, 
}