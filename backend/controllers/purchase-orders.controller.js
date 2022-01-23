const { request, response } = require('express');
const { Product } = require('../db/models/product.model');
const { PurchaseOrder } = require('../db/models/purchase-order.model');
const { PurchaseTransaction } = require('../db/models/purchase-trx.model');

const getPurchaseOrder = async (req = request, res = response) => {

  const purchaseOrders = await PurchaseOrder.findAll();
  const newPurchaseOrders = [];
  
  // Code to include list of products
  for(const purchaseOrder of purchaseOrders) {
    const products = await PurchaseTransaction.findAll({
      where: {
        purchase_order_id: purchaseOrder.id
      }
    }).catch((error) => {
      return res.status(500).json({ ok: false, msg: 'Talk with de admin', error });
    });
    newPurchaseOrders.push({...purchaseOrder.dataValues, products});
  }
  res.status(200).json({ purchase_orders: newPurchaseOrders });

};

const getPurchaseOrderById = async (req = request, res = response) => {
  const { id } = req.params;

  const purchaseOrder = await PurchaseOrder.findOne({ where: { id }});

  const products = await PurchaseTransaction.findAll({
    where: {
      purchase_order_id: purchaseOrder.id
    }
  }).catch((error) => {
    return res.status(500).json({ ok: false, msg: 'Talk with de admin', error });
  });

  // Asign name to the products
  let productsWithName = [];
  for(const product of products) {
    const productObj = await Product.findOne({ where: { id: product.id }})
      .catch((error) => {
        return res.status(500).json({ ok: false, msg: 'Talk with de admin', error });
      });
    
    productsWithName.push({...product.dataValues, ...productObj.dataValues });
  }

  res.status(200).json({...purchaseOrder.dataValues, products: productsWithName});


};

const createPurchaseOrder = async (req = request, res = response) => {
  const { products, purchase_date, pay_date, ...restPurchaseOrder } = req.body;

  const newPayDate = !pay_date ? purchase_date : pay_date;

  // Agregar datos a la tabla purchase-order
  const purchaseOrder = await PurchaseOrder.create({ 
    ...restPurchaseOrder,
    purchase_date,
    pay_date: newPayDate
  })
  .catch( (error) => {
    return res.status(500).json({ ok: false, msg: 'Talk with de admin', error });
  });

  const { id:purchase_order_id } = purchaseOrder;

  // Agregar datos a la tabla purchase-trx
  for(let product of products) {
    await PurchaseTransaction.create({
      cost: product.cost,
      count: product.count,
      product_id: product.product_id,
      purchase_order_id
    }).catch((error) => {
      return res.status(500).json({ ok: false, msg: 'Talk with de admin', error });
    });

    const productTemp = await Product.findOne({ where: { id: product.product_id }});

    const newStock = Number(product.count) + Number(productTemp.stock);

    await Product.update({ stock: newStock }, { where: { id: product.product_id } })
      .catch( (error) => {
        res.status(400).json({
          msg: 'Talk with the admin',
          error,
        });
      });


  }

  // Agregar datos a la tabla de products
  res.status(200).json({ ok: true, purchaseOrder });
};

const deletePurchaseOrder = async (req = request, res = response) => {
  const { id } = req.params;
  const products = [];

  try {
    const purchaseTrxs = await PurchaseTransaction.findAll({
      where: { purchase_order_id: id }
    });

    // Update stock when delete purchase order
    for(let trx of purchaseTrxs) {
      const product = await Product.findOne({ where: { id: trx.product_id }});
      const newStock = product.stock - trx.count;
      await Product.update({ stock: newStock }, { where: { id: trx.product_id } })
    }

    await PurchaseTransaction.destroy({ where: { purchase_order_id: id }});
    await PurchaseOrder.destroy({ where: { id } });

    res.status(200).json({
      msg: 'Purchase Order deleted successfully',
    });

  } catch(error) {
    return res.status(500).json({ ok: false, msg: 'Talk with de admin', error });
  }
  

  

  
};

module.exports = {
  getPurchaseOrder,
  getPurchaseOrderById,
  createPurchaseOrder,
  deletePurchaseOrder,
};
