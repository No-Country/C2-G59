const { request, response } = require('express');
const { Product } = require('../db/models/product.model');
const { RetailSale } = require('../db/models/sales.model');
const { SaleTransaction } = require('../db/models/sales-trx.model');
const { setIdInInvoiceFormat } = require('../helpers/set-format');

const getRetailSale = async (req = request, res = response) => {

  const { show_products = false } = req.query;

  try {
    const retailSales = await RetailSale.findAll();
    const newRetailSales = [];
    
    // sort retail sales by date
    retailSales.sort( function (a,b) {
      return new Date(b.sale_date).getTime() - new Date(a.sale_date).getTime();
    });

    // Set Invoice format
    for (const sale of retailSales) {
      newRetailSales.push({ ...sale.dataValues, invoice: setIdInInvoiceFormat(sale.dataValues.id)})
    }

    if (!JSON.parse(show_products)) {
      return res.status(200).json({ retail_sales: newRetailSales });
    }

    // Code to include list of products
    let retailSalesWithProducts = [];
    
    for(const sale of newRetailSales) {
      const products = [];
      const saleTrxs = await SaleTransaction.findAll({ 
        where: { retail_sale_id: sale.id }
      });
      
      for (const trx of saleTrxs) {
        const product = await Product.findOne({ where: { id: trx.product_id }});
        delete product.dataValues.stock;
        products.push({ ...product.dataValues, count: trx.count });
      }
      
      retailSalesWithProducts.push({...sale.dataValues, products});
    }
    res.status(200).json({ retail_sales: retailSalesWithProducts });

  } catch (error) {
    return res.status(500).json({ ok: false, msg: 'Talk with de admin', error });
  }

};

const getRetailSaleById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const products = [];
    const retailSale = await RetailSale.findOne({ where: { id }});
    
    const saleTrx = await SaleTransaction.findAll({
      where: { retail_sale_id: retailSale.id }
    });

    for (const trx of saleTrx) {
      const product = await Product.findOne({ where: { id: trx.product_id }});
      delete product.dataValues.stock;
      products.push({ ...product.dataValues, count: trx.count });
    }
    
    res.status(200).json({
      ...retailSale.dataValues,
      invoice: setIdInInvoiceFormat(retailSale.dataValues.id),
      products 
    });
  } catch(error) {
    return res.status(500).json({ ok: false, msg: 'Talk with de admin', error });
  }

};

const createRetailSale = async (req = request, res = response) => {
  const { products, sale_date, pay_date, ...restRetailSale } = req.body;

  const newPayDate = !pay_date ? sale_date : pay_date;

  // Agregar datos a la tabla retail-sales
  const retailSale = await RetailSale.create({ 
    ...restRetailSale,
    sale_date,
    pay_date: newPayDate
  })
  .catch( (error) => {
    return res.status(500).json({ ok: false, msg: 'Talk with de admin', error });
  });

  const { id:retail_sale_id } = retailSale;

  // Agregar datos a la tabla sale-trx
  for(let product of products) {
    await SaleTransaction.create({
      price: product.price,
      count: product.count,
      product_id: product.product_id,
      retail_sale_id
    }).catch((error) => {
      return res.status(500).json({ ok: false, msg: 'Talk with de admin', error });
    });

    const productTemp = await Product.findOne({ where: { id: product.product_id }});

    const newStock = Number(productTemp.stock) - Number(product.count);

    await Product.update({ stock: newStock }, { where: { id: product.product_id } })
      .catch( (error) => {
        res.status(400).json({
          msg: 'Talk with the admin',
          error,
        });
      });
  }

  // Agregar datos a la tabla de products
  res.status(200).json({
    ...retailSale.dataValues,
    invoice: setIdInInvoiceFormat(retailSale.dataValues.id)
  });
};

const deleteRetailSale = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const saleTrxs = await SaleTransaction.findAll({
      where: { retail_sale_id: id }
    });

    // Update stock when delete purchase order
    for(let trx of saleTrxs) {
      const product = await Product.findOne({ where: { id: trx.product_id }});
      const newStock = Number(product.stock) + Number(trx.count);
      await Product.update({ stock: newStock }, { where: { id: trx.product_id } })
    }

    await SaleTransaction.destroy({ where: { retail_sale_id: id }});
    await RetailSale.destroy({ where: { id } });

    res.status(200).json({
      msg: 'Retail sale deleted successfully',
    });

  } catch(error) {
    return res.status(500).json({ ok: false, msg: 'Talk with de admin', error });
  }
};

module.exports = {
  getRetailSale,
  getRetailSaleById,
  createRetailSale,
  deleteRetailSale,
};
