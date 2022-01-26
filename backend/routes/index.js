// const router = require('express').Router()
const authRouter = require('./auth.routes');
const branchesRouter = require('./branches.routes');
const categoriesRouter = require('./categories.routes');
const chartsRouter = require('./charts.routes');
const productsRouter = require('./products.routes');
const purchaseOrdersRouter = require('./purchase-orders.routes');
const retailSalesRouter = require('./retail-sales.routes');
const suppliersRouter = require('./suppliers.routes');
const usersRouter = require('./users.routes');

function routerApi (app) {
  app.use('/api/auth', authRouter)
  app.use('/api/branches', branchesRouter)
  app.use('/api/categories', categoriesRouter)
  app.use('/api/charts', chartsRouter)
  app.use('/api/products', productsRouter)
  app.use('/api/purchase', purchaseOrdersRouter)
  app.use('/api/sales', retailSalesRouter)
  app.use('/api/suppliers', suppliersRouter)
  app.use('/api/users', usersRouter)
}

module.exports = routerApi
