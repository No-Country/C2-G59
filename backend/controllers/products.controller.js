const { request, response } = require('express');
const { Branch } = require('../db/models/branch.model');
const { Product } = require('../db/models/product.model');
const { PurchaseOrder } = require('../db/models/purchase-order.model');
const { PurchaseTransaction } = require('../db/models/purchase-trx.model');
const { SaleTransaction } = require('../db/models/sales-trx.model');
const { RetailSale } = require('../db/models/sales.model');
const { toDecimal } = require('../helpers/calculate');

const getProducts = async (req = request, res = response) => {

  let { cashflow = false } = req.query;

  cashflow = JSON.parse(cashflow);

  try {
    const products = await Product.findAll();
    console.log(cashflow);
    if (!cashflow) {
      return res.status(200).json({ products });
    }

    // Se define el nuevo array de productos donde se guardaran los valores
    // adicionales
    let newProducts = [];

    // Se obtienen todas las ordenes de compra y ventas
    const allBranches = await Branch.findAll();
    const allPurchaseOrder = await PurchaseOrder.findAll();
    const allPurchaseTrx = await PurchaseTransaction.findAll();
    const allRetailSales = await RetailSale.findAll();
    const allSalesTrx = await SaleTransaction.findAll();


    // Se analiza cada producto
    products.forEach( product => {
      let totalAmountInPurchase = 0;
      let totalPurchasedProducts = 0;
      let totalAmountInSales = 0;
      let totalSoldProducts = 0;
      let dataByBranch = [];

      // Para cada producto se analiza cada branch y las ventas de la misma
      allBranches.forEach( branch => {
        let amountInPurchaseByBranch = 0;
        let purchaseProductsByBranch = 0;
        let amountInSalesByBranch = 0;
        let soldProductsByBranch = 0;

        allPurchaseOrder.forEach( purchaseOrder => {
          if ( branch.id === purchaseOrder.branch_id ) {
            allPurchaseTrx.forEach( purchaseTrx => {
              if (purchaseTrx.purchase_order_id === purchaseOrder.id && 
                  purchaseTrx.product_id === product.id
              ) {
                const { cost, count } = purchaseTrx;
                amountInPurchaseByBranch += (cost * count);
                totalAmountInPurchase += (cost * count);
                purchaseProductsByBranch += count;
                totalPurchasedProducts += count;
              }
            });
          }
        });

        allRetailSales.forEach( retailSale => {
          if ( branch.id === retailSale.branch_id ) {
            allSalesTrx.forEach( salesTrx => {
              if (salesTrx.retail_sale_id === retailSale.id && 
                salesTrx.product_id === product.id
              ) {
                const { price, count } = salesTrx;
                amountInSalesByBranch += (price * count);
                totalAmountInSales += (price * count);
                soldProductsByBranch += count;
                totalSoldProducts += count;
              }
            });
          }
        });

        dataByBranch.push({
          branch_id: branch.id,
          purchases_amount: toDecimal(amountInPurchaseByBranch),
          purchases: purchaseProductsByBranch,
          sales_amount: toDecimal(amountInSalesByBranch),
          sales: soldProductsByBranch,
        });
  
      });

      newProducts.push({
        ...product.dataValues,
        total_purchases_amount: toDecimal(totalAmountInPurchase),
        total_purchases: totalPurchasedProducts,
        total_sales_amount: toDecimal(totalAmountInSales),
        total_sales: totalSoldProducts,
        branches: dataByBranch
      });

    });

    return res.status(200).json({ products: newProducts });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Talk to the admin',
    });
  }
};

const getProductById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ where: { id } });
    res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Talk to the admin',
    });
  }
};

const createProduct = async (req = request, res = response) => {
  const {
    price = 0,
    stock = 0,
    ...restProduct
  } = req.body;

  const product = await Product.create({
    price,
    stock,
    ...restProduct
  }).catch((error) => {
    return res.status(500).json({ error });
  });

  res.status(200).json({ product });
};

const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;

  await Product.update(req.body, { where: { id } })
		.catch( (error) => {
			res.status(400).json({
				msg: 'Talk with the admin',
				error,
			});
		});

  res.status(200).json({
    msg: 'Product updated successfully',
  });
};

const updateProductStock = async (req = request, res = response) => {
  const { id, count } = req.params;
  const { action = 'increment' } = req.query; // increment or decrement
  const { stock, product_name } = await Product.findOne({ where: { id }});
  const countNumber = Number(count);

  if ( action !== 'increment' && action !== 'decrement') {
    return res.status(400).json({
      error: 'action must be \'increment\' or \'decrement\''
    });
  }

  if ( stock - countNumber < 0 && action === 'decrement') {
    return res.status(400).json({
      error: 'Not enought items to sell'
    });
  }

  let newStock = action === 'increment' 
                ? stock + countNumber 
                : stock - countNumber;

  newStock = newStock < 0 ? 0 : newStock;
  
  await Product.update({ stock: newStock }, { where: { id } })
		.catch( (error) => {
			res.status(400).json({
				msg: 'Talk with the admin',
				error,
			});
		});

  res.status(200).json({
    msg: `New stock for ${product_name}: ${ newStock }`,
  });
};

const deleteProduct = async (req = request, res = response) => {

	const { id } = req.params;

  await Product.destroy({ where: { id } }).catch((error) => {
		return res.status(400).json({
			msg: 'Talk with the admin',
			error
		});
	});

	res.status(200).json({
		msg: 'Product deleted successfully'
	});
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  updateProductStock,
  deleteProduct,
};
