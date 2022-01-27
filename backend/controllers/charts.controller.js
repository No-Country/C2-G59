const { request, response } = require('express');
const moment = require('moment');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../libs/sequelize');

// Models
const { Branch } = require('../db/models/branch.model');

// Helpers
const {
  getPurchaseOrderBetweenDates,
  getRetailSalesBetweenDates,
} = require('../helpers/sql-query');
const {
  toDecimal,
  getPercent,
  getPercentDif,
} = require('../helpers/calculate');

const dateFormat = 'YYYY-MM-DD';
// const now = '2021-12-31';
const now = moment();

//show_by = 'month', // 'month', 'quarter', 'halfyear', 'year'

// Get branches total profit, income and outcome
const getBranchesProfit = async (req = request, res = response) => {
  // Query data
  let {
    months = 3, // months > 1
    branch_id = 0, // 0 para todas las Branch
    cashflow = false,
  } = req.query;

  months = Number(months);
  branch_id = Number(branch_id);
  cashflow = JSON.parse(cashflow); // Transforma en bool el string
  let labels = [];
  let data = [];

  if (months < 2) {
    return res.status(400).json({
      msg: 'Query months must be 2 or more',
    });
  }

  try {
    // Establecer mes de inicio y fin
    let startDate = moment(now).subtract(months, 'months').startOf('month');
    let endDate = moment(now).subtract(1, 'months').endOf('month'); // Previous month

    // Obtener todas las PurchaseOrder
    const allPurchaseOrder = await sequelize.query(
      getPurchaseOrderBetweenDates(
        startDate.format(dateFormat),
        endDate.format(dateFormat),
        branch_id
      ),
      { type: QueryTypes.SELECT }
    );

    // Obtener todas las RetailSales
    const allRetailSales = await sequelize.query(
      getRetailSalesBetweenDates(
        startDate.format(dateFormat),
        endDate.format(dateFormat),
        branch_id
      ),
      { type: QueryTypes.SELECT }
    );

    // Asignar valores a labels
    for (let i = 0; i < months; i++) {
      const monthToEvaluate = startDate.clone().add(i, 'months');
      labels.push(monthToEvaluate.format('MMMM'));
    }

    // Asignar valores a data (profit de branch(es))
    if (branch_id === 0) {
      // Todas las branch
      // Obtener la informacion de todas las Branch
      const branches = await Branch.findAll();

      for (let branch of branches) {
        // Se evaluan tolas las branch
        let branchData = [];
        const branchId = branch.dataValues.id;

        for (let i = 0; i < months; i++) {
          // Se evalua todos los meses para una branch
          const monthToEvaluate = startDate.clone().add(i, 'months');
          let amountPurchaseOrder = 0; // in month
          let amountRetailSale = 0; // in month

          // Se obtienen las PurchaseOrder para la branch del loop
          allPurchaseOrder.forEach((purchaseOrder) => {
            let purchaseDate = moment(purchaseOrder.purchase_date);
            if (
              purchaseDate.month() === monthToEvaluate.month() &&
              branchId === purchaseOrder.branch_id
            ) {
              amountPurchaseOrder += Number(purchaseOrder.amount);
            }
          });

          // Obtener el monto total de las ventas
          // del mes a evaluar (monthToEvaluate)
          allRetailSales.forEach((retailSale) => {
            let saleDate = moment(retailSale.sale_date);
            if (
              saleDate.month() === monthToEvaluate.month() &&
              branchId === retailSale.branch_id
            ) {
              amountRetailSale += Number(retailSale.amount);
            }
          });

          if (cashflow) {
            branchData.push({
              month: monthToEvaluate.format('MMMM'),
              profit: toDecimal(amountRetailSale - amountPurchaseOrder),
              amountSales: toDecimal(amountRetailSale),
              amountPurchase: toDecimal(amountPurchaseOrder),
            });
          } else {
            branchData.push(toDecimal(amountRetailSale - amountPurchaseOrder));
          }
        }

        data.push({
          branch_id: branchId,
          branch_name: branch.dataValues.branch_name,
          data: branchData,
        });
      }
    } else {
      // Obtener la informacion de todas las Branch
      const branch = await Branch.findOne({ where: { id: branch_id } });

      let branchData = [];
      const branchId = branch.dataValues.id;

      for (let i = 0; i < months; i++) {
        // Se evalua todos los meses para una branch
        const monthToEvaluate = startDate.clone().add(i, 'months');
        let amountPurchaseOrder = 0; // in month
        let amountRetailSale = 0; // in month

        // Se obtienen las PurchaseOrder para la branch del loop
        allPurchaseOrder.forEach((purchaseOrder) => {
          let purchaseDate = moment(purchaseOrder.purchase_date);
          if (
            purchaseDate.month() === monthToEvaluate.month() &&
            branchId === purchaseOrder.branch_id
          ) {
            amountPurchaseOrder += Number(purchaseOrder.amount);
          }
        });

        // Obtener el monto total de las ventas
        // del mes a evaluar (monthToEvaluate)
        allRetailSales.forEach((retailSale) => {
          let saleDate = moment(retailSale.sale_date);
          if (
            saleDate.month() === monthToEvaluate.month() &&
            branchId === retailSale.branch_id
          ) {
            amountRetailSale += Number(retailSale.amount);
          }
        });

        if (cashflow) {
          branchData.push({
            month: monthToEvaluate.format('MMMM'),
            profit: toDecimal(amountRetailSale - amountPurchaseOrder),
            amountSales: toDecimal(amountRetailSale),
            amountPurchase: toDecimal(amountPurchaseOrder),
          });
        } else {
          branchData.push(toDecimal(amountRetailSale - amountPurchaseOrder));
        }
      }

      data.push({
        branch_id,
        branch_name: branch.dataValues.branch_name,
        data: branchData,
      });
    }

    return res.status(200).json({
      labels,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Talk to the admin',
      error,
    });
  }
};

// Get branches total profit, income and outcome
const getBranchesProfitTotal = async (req = request, res = response) => {
  // Query data
  let {
    months = 3, // months > 1
    branch_id = 0, // 0 para todas las Branch
    cashflow = false,
  } = req.query;

  months = Number(months);
  branch_id = Number(branch_id);
  cashflow = JSON.parse(cashflow); // Transforma en bool el string
  let labels = [];
  let data = [];
  let totalProfit = 0;
  let totalAmountPurchase = 0;
  let totalAmountSales = 0;

  if (months < 2) {
    return res.status(400).json({
      msg: 'Query months must be 2 or more',
    });
  }

  try {
    // Establecer mes de inicio y fin
    let startDate = moment(now).subtract(months, 'months').startOf('month');
    let endDate = moment(now).subtract(1, 'months').endOf('month'); // Previous month

    // Obtener todas las PurchaseOrder
    const allPurchaseOrder = await sequelize.query(
      getPurchaseOrderBetweenDates(
        startDate.format(dateFormat),
        endDate.format(dateFormat),
        branch_id
      ),
      { type: QueryTypes.SELECT }
    );

    // Obtener todas las RetailSales
    const allRetailSales = await sequelize.query(
      getRetailSalesBetweenDates(
        startDate.format(dateFormat),
        endDate.format(dateFormat),
        branch_id
      ),
      { type: QueryTypes.SELECT }
    );

    // Asignar valores de montos totales
    allPurchaseOrder.forEach((po) => {
      totalAmountPurchase += Number(po.amount);
    });

    allRetailSales.forEach((rs) => {
      totalAmountSales += Number(rs.amount);
    });

    totalProfit = Number(totalAmountSales) - Number(totalAmountPurchase);

    // Asignar valores a labels
    for (let i = 0; i < months; i++) {
      const monthToEvaluate = startDate.clone().add(i, 'months');
      labels.push(monthToEvaluate.format('MMMM'));
    }

    // Asignar valores a data (profit de branch(es))
    if (branch_id === 0) {
      // Todas las branch
      // Obtener la informacion de todas las Branch
      const branches = await Branch.findAll();

      for (let branch of branches) {
        // Se evaluan tolas las branch
        let branchData = [];
        const branchId = branch.dataValues.id;
        let amountPurchaseOrder = 0;
        let amountRetailSale = 0;

        // Se obtienen las PurchaseOrder para la branch del loop
        allPurchaseOrder.forEach((purchaseOrder) => {
          if (branchId === purchaseOrder.branch_id) {
            amountPurchaseOrder += Number(purchaseOrder.amount);
          }
        });

        // Obtener el monto total de las ventas
        // del mes a evaluar (monthToEvaluate)
        allRetailSales.forEach((retailSale) => {
          if (branchId === retailSale.branch_id) {
            amountRetailSale += Number(retailSale.amount);
          }
        });

        if (cashflow) {
          branchData.push({
            profit: toDecimal(amountRetailSale - amountPurchaseOrder),
            amountSales: toDecimal(amountRetailSale),
            amountPurchase: toDecimal(amountPurchaseOrder),
            profit_percent: getPercent(
              toDecimal(amountRetailSale - amountPurchaseOrder),
              totalProfit
            ),
            amountSales_percent: getPercent(
              toDecimal(amountRetailSale),
              totalAmountSales
            ),
            amountPurchase_percent: getPercent(
              toDecimal(amountPurchaseOrder),
              totalAmountPurchase
            ),
          });
        } else {
          branchData.push(toDecimal(amountRetailSale - amountPurchaseOrder));
        }

        data.push({
          branch_id: branchId,
          branch_name: branch.dataValues.branch_name,
          data: branchData,
        });
      }
    } else {
      // Obtener la informacion de todas las Branch
      const branch = await Branch.findOne({ where: { id: branch_id } });

      let branchData = [];
      const branchId = branch.dataValues.id;

      let amountPurchaseOrder = 0; // in month
      let amountRetailSale = 0; // in month

      // Se obtienen las PurchaseOrder para la branch del loop
      allPurchaseOrder.forEach((purchaseOrder) => {
        if (branchId === purchaseOrder.branch_id) {
          amountPurchaseOrder += Number(purchaseOrder.amount);
        }
      });

      // Obtener el monto total de las ventas
      // del mes a evaluar (monthToEvaluate)
      allRetailSales.forEach((retailSale) => {
        if (branchId === retailSale.branch_id) {
          amountRetailSale += Number(retailSale.amount);
        }
      });

      if (cashflow) {
        branchData.push({
          profit: toDecimal(amountRetailSale - amountPurchaseOrder),
          amountSales: toDecimal(amountRetailSale),
          amountPurchase: toDecimal(amountPurchaseOrder),
          profit_percent: getPercent(
            toDecimal(amountRetailSale - amountPurchaseOrder),
            totalProfit
          ),
          amountSales_percent: getPercent(
            toDecimal(amountRetailSale),
            totalAmountSales
          ),
          amountPurchase_percent: getPercent(
            toDecimal(amountPurchaseOrder),
            totalAmountPurchase
          ),
        });
      } else {
        branchData.push(toDecimal(amountRetailSale - amountPurchaseOrder));
      }

      data.push({
        branch_id,
        branch_name: branch.dataValues.branch_name,
        data: branchData,
      });
    }

    return res.status(200).json({
      total_profit: toDecimal(totalProfit),
      total_amount_sales: toDecimal(totalAmountSales),
      total_amount_purchase: toDecimal(totalAmountPurchase),
      labels,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Talk to the admin',
      error,
    });
  }
};

// Get branches total sales
const getBranchesTransactionCount = async (req = request, res = response) => {
  // Query data
  let {
    months = 3, // months > 1
    branch_id = 0, // 0 para todas las Branch
    purchase = true, // show purchase count
    sales = true, // show sales count
  } = req.query;

  months = Number(months);
  branch_id = Number(branch_id);
  purchase = JSON.parse(purchase);
  sales = JSON.parse(sales);
  let labels = [];
  let data = [];

  if (months < 2) {
    return res.status(400).json({
      msg: 'Query months must be 2 or more',
    });
  }

  try {
    // Establecer mes de inicio y fin
    let startDate = moment(now).subtract(months, 'months').startOf('month');
    let endDate = moment(now).subtract(1, 'months').endOf('month'); // Previous month
    let allPurchaseOrder;
    let allRetailSales;

    // Obtener todas las PurchaseOrder
    if (purchase) {
      allPurchaseOrder = await sequelize.query(
        getPurchaseOrderBetweenDates(
          startDate.format(dateFormat),
          endDate.format(dateFormat),
          branch_id
        ),
        { type: QueryTypes.SELECT }
      );
    }

    // Obtener todas las RetailSales
    if (sales) {
      allRetailSales = await sequelize.query(
        getRetailSalesBetweenDates(
          startDate.format(dateFormat),
          endDate.format(dateFormat),
          branch_id
        ),
        { type: QueryTypes.SELECT }
      );
    }

    // Asignar valores a labels
    for (let i = 0; i < months; i++) {
      const monthToEvaluate = startDate.clone().add(i, 'months');
      labels.push(monthToEvaluate.format('MMMM'));
    }

    // Asignar valores a data (profit de branch(es))
    if (branch_id === 0) {
      // Todas las branch
      // Obtener la informacion de todas las Branch
      const branches = await Branch.findAll();

      for (let branch of branches) {
        // Se evaluan tolas las branch
        let branchData = [];
        const branchId = branch.dataValues.id;

        for (let i = 0; i < months; i++) {
          // Se evalua todos los meses para una branch
          const monthToEvaluate = startDate.clone().add(i, 'months');
          let countPurchaseOrder = 0; // in month
          let countRetailSale = 0; // in month
          let objTemp = {};

          // Se obtienen las PurchaseOrder para la branch del loop
          if (purchase) {
            allPurchaseOrder.forEach((purchaseOrder) => {
              let purchaseDate = moment(purchaseOrder.purchase_date);
              if (
                purchaseDate.month() === monthToEvaluate.month() &&
                branchId === purchaseOrder.branch_id
              ) {
                countPurchaseOrder++;
              }
            });
          }

          // Obtener el monto total de las ventas
          // del mes a evaluar (monthToEvaluate)
          if (sales) {
            allRetailSales.forEach((retailSale) => {
              let saleDate = moment(retailSale.sale_date);
              if (
                saleDate.month() === monthToEvaluate.month() &&
                branchId === retailSale.branch_id
              ) {
                countRetailSale++;
              }
            });
          }

          if (purchase) {
            objTemp = { ...objTemp, purchase_count: countPurchaseOrder };
          }

          if (sales) {
            objTemp = { ...objTemp, sales_count: countRetailSale };
          }

          branchData.push({
            month: monthToEvaluate.format('MMMM'),
            ...objTemp,
          });
        }

        data.push({
          branch_id: branchId,
          branch_name: branch.dataValues.branch_name,
          data: branchData,
        });
      }
    } else {
      // Obtener la informacion de todas las Branch
      const branch = await Branch.findOne({ where: { id: branch_id } });

      let branchData = [];
      const branchId = branch.dataValues.id;

      for (let i = 0; i < months; i++) {
        // Se evalua todos los meses para una branch
        const monthToEvaluate = startDate.clone().add(i, 'months');
        let countPurchaseOrder = 0; // in month
        let countRetailSale = 0; // in month
        let objTemp = {};

        // Se obtienen las PurchaseOrder para la branch del loop
        if (purchase) {
          allPurchaseOrder.forEach((purchaseOrder) => {
            let purchaseDate = moment(purchaseOrder.purchase_date);
            if (
              purchaseDate.month() === monthToEvaluate.month() &&
              branchId === purchaseOrder.branch_id
            ) {
              countPurchaseOrder++;
            }
          });
        }

        // Obtener el monto total de las ventas
        // del mes a evaluar (monthToEvaluate)
        if (sales) {
          allRetailSales.forEach((retailSale) => {
            let saleDate = moment(retailSale.sale_date);
            if (
              saleDate.month() === monthToEvaluate.month() &&
              branchId === retailSale.branch_id
            ) {
              countRetailSale++;
            }
          });
        }

        if (purchase) {
          objTemp = { ...objTemp, purchase_count: countPurchaseOrder };
        }

        if (sales) {
          objTemp = { ...objTemp, sales_count: countRetailSale };
        }

        branchData.push({
          month: monthToEvaluate.format('MMMM'),
          ...objTemp,
        });
      }

      data.push({
        branch_id,
        branch_name: branch.dataValues.branch_name,
        data: branchData,
      });
    }

    return res.status(200).json({
      labels,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Talk to the admin',
      error,
    });
  }
};

// Get branches total profit, income and outcome
const getBranchesCompareData = async (req = request, res = response) => {
  // Query data
  let {
    show_by = 'quarter', // 'week', 'months', 'quarter', 'halfyear', 'years'
    branch_id = 0, // 0 para todas las Branch
    cashflow = false,
    periods = 4,
  } = req.query;

  validShowBy = ['quarter', 'months'];
  periods = Number(periods);
  branch_id = Number(branch_id);
  branch_id = Number(branch_id);
  cashflow = JSON.parse(cashflow); // Transforma en bool el string

  let labels = [];
  let data = [];

  if (periods < 2) {
    return res.status(400).json({
      msg: 'Query periods must be 2 or more',
    });
  }

  if (!validShowBy.includes(show_by)) {
    return res.status(400).json({
      msg: `Query show_by must be 'week', 'months', 'quarter', 'halfyear', 'years'`,
    });
  }

  try {
    
    let purchase_amount_current_period_total = 0;
    let purchase_amount_last_period_total = 0;
    let purchase_count_current_period_total = 0;
    let purchase_count_last_period_total = 0;

    let sales_amount_current_period_total = 0;
    let sales_amount_last_period_total = 0;
    let sales_count_current_period_total = 0;
    let sales_count_last_period_total = 0;

    // Establecer inicio y fin del periodo actual
    let startCurrentPeriod = moment(now).startOf(show_by);
    let endCurrentPeriod = moment(now).endOf(show_by);
    let starLastPeriod = moment(now).subtract(1, show_by).startOf(show_by);
    let endLastPeriod = moment(now).subtract(1, show_by).endOf(show_by);

    // Establecer mes de inicio y fin. Establecer labels
    let startDate;
    let endDate;
    switch (show_by) {
      case 'quarter':
        startDate = moment(now).subtract(periods - 1, show_by).startOf(show_by);
        endDate = moment(now).endOf(show_by);
		
        for (let i = 0; i < periods; i++) {
          let quarter = moment(now).subtract(i, show_by).quarter();
          let year = moment(now).subtract(i, show_by).year();
          labels.unshift(`Q${quarter} ${year}`);
        }
        break;

			case 'months':
				startDate = moment(now).subtract(periods - 1, show_by).startOf(show_by);
        endDate = moment(now).endOf(show_by);

				for (let i = 0; i < periods; i++) {
          let month = moment(now).subtract(i, show_by).format('MMMM');
          let year = moment(now).subtract(i, show_by).year();
          labels.unshift(`${month} ${year}`);
        }

    }

    // Obtener todas las PurchaseOrder
    const allPurchaseOrder = await sequelize.query(
      getPurchaseOrderBetweenDates(
        startDate.format(dateFormat),
        endDate.format(dateFormat),
        branch_id
      ),
      { type: QueryTypes.SELECT }
    );

    // Obtener todas las RetailSales
    const allRetailSales = await sequelize.query(
      getRetailSalesBetweenDates(
        startDate.format(dateFormat),
        endDate.format(dateFormat),
        branch_id
      ),
      { type: QueryTypes.SELECT }
    );

    // Asignar valores a data (profit de branches)
		// Obtener la informacion de todas las Branch
		const branches = await Branch.findAll();

		for (let branch of branches) {
			// Se evaluan tolas las branch
			let branchData = [];
			const branchId = branch.dataValues.id;
			let purchase_amount_current_period = 0;
			let purchase_amount_last_period = 0;
			let purchase_count_current_period = 0;
			let purchase_count_last_period = 0;
			let sales_amount_current_period = 0;
			let sales_amount_last_period = 0;
			let sales_count_current_period = 0;
			let sales_count_last_period = 0;

			for (let i = 0; i < periods; i++) {
				// Se evalua todos los meses para una branch
				const periodToEvaluate = startDate.clone().add(i, show_by);
				let amountPurchaseOrder = 0; // in month
				let amountRetailSale = 0; // in month

				// Se obtienen las PurchaseOrder para la branch del loop
				allPurchaseOrder.forEach((purchaseOrder) => {
					let purchaseDate = moment(purchaseOrder.purchase_date);
					if (branchId === purchaseOrder.branch_id) {
						switch (show_by) {
							case 'quarter':
								if (
									purchaseDate.quarter() === periodToEvaluate.quarter() &&
									purchaseDate.year() === periodToEvaluate.year()
								) {
									amountPurchaseOrder += Number(purchaseOrder.amount);

									// Current period condition
									if (i === periods - 1) {
										// Current period
										purchase_amount_current_period += Number(
											purchaseOrder.amount
										);
										purchase_amount_current_period_total += Number(
											purchaseOrder.amount
										);
										purchase_count_current_period++;
										purchase_count_current_period_total++;
									}

									// Last period condition
									if (i === periods - 2) {
										// last period
										purchase_amount_last_period += Number(
											purchaseOrder.amount
										);
										purchase_amount_last_period_total += Number(
											purchaseOrder.amount
										);
										purchase_count_last_period++;
										purchase_count_last_period_total++;
									}
								}
								break;

							case 'months':
								if (
									purchaseDate.month() === periodToEvaluate.month() &&
									purchaseDate.year() === periodToEvaluate.year()
								) {
									amountPurchaseOrder += Number(purchaseOrder.amount);

									// Current period condition
									if (i === periods - 1) {
										// Current period
										purchase_amount_current_period += Number(
											purchaseOrder.amount
										);
										purchase_amount_current_period_total += Number(
											purchaseOrder.amount
										);
										purchase_count_current_period++;
										purchase_count_current_period_total++;
									}

									// Last period condition
									if (i === periods - 2) {
										// last period
										purchase_amount_last_period += Number(
											purchaseOrder.amount
										);
										purchase_amount_last_period_total += Number(
											purchaseOrder.amount
										);
										purchase_count_last_period++;
										purchase_count_last_period_total++;
									}
								}
								break;
						}
					}
				});

				// Obtener el monto total de las ventas
				// del mes a evaluar (monthToEvaluate)
				allRetailSales.forEach((retailSale) => {
					let saleDate = moment(retailSale.sale_date);
					if (branchId === retailSale.branch_id) {
						switch (show_by) {
							case 'quarter':
								if (
									saleDate.quarter() === periodToEvaluate.quarter() &&
									saleDate.year() === periodToEvaluate.year()
								) {
									amountRetailSale += Number(retailSale.amount);

									// Current period condition
									if (i === periods - 1) {
										// Current period
										sales_amount_current_period += Number(retailSale.amount);
										sales_amount_current_period_total += Number(
											retailSale.amount
										);
										sales_count_current_period++;
										sales_count_current_period_total++;
									}

									// Last period condition
									if (i === periods - 2) {
										// last period
										sales_amount_last_period += Number(retailSale.amount);
										sales_amount_last_period_total += Number(
											retailSale.amount
										);
										sales_count_last_period++;
										sales_count_last_period_total++;
									}
								}
								break;

							case 'months':
								if (
									saleDate.month() === periodToEvaluate.month() &&
									saleDate.year() === periodToEvaluate.year()
								) {
									amountRetailSale += Number(retailSale.amount);

									// Current period condition
									if (i === periods - 1) {
										// Current period
										sales_amount_current_period += Number(retailSale.amount);
										sales_amount_current_period_total += Number(
											retailSale.amount
										);
										sales_count_current_period++;
										sales_count_current_period_total++;
									}

									// Last period condition
									if (i === periods - 2) {
										// last period
										sales_amount_last_period += Number(retailSale.amount);
										sales_amount_last_period_total += Number(
											retailSale.amount
										);
										sales_count_last_period++;
										sales_count_last_period_total++;
									}
								}
								break;
						}
					}
				});

				if (cashflow) {
					branchData.push({
						profit: toDecimal(amountRetailSale - amountPurchaseOrder),
						amountSales: toDecimal(amountRetailSale),
						amountPurchase: toDecimal(amountPurchaseOrder),
					});
				} else {
					branchData.push(toDecimal(amountRetailSale - amountPurchaseOrder));
				}
			}

			data.push({
				branch_id: branchId,
				branch_name: branch.dataValues.branch_name,
				purchase_amount_current_period: toDecimal(purchase_amount_current_period),
				purchase_amount_last_period: toDecimal(purchase_amount_last_period),
				purchase_amount_compare_percent: getPercentDif(
					purchase_amount_current_period,
					purchase_amount_last_period
				),
				purchase_count_current_period: toDecimal(purchase_count_current_period),
				purchase_count_last_period: toDecimal(purchase_count_last_period),
				purchase_count_compare_percent: getPercentDif(
					purchase_count_current_period,
					purchase_count_last_period
				),
				sales_amount_current_period: toDecimal(sales_amount_current_period),
				sales_amount_last_period: toDecimal(sales_amount_last_period),
				sales_amount_compare_percent: getPercentDif(
					sales_amount_current_period,
					sales_amount_last_period
				),
				sales_count_current_period: toDecimal(sales_count_current_period),
				sales_count_last_period: toDecimal(sales_count_last_period),
				sales_count_compare_percent: getPercentDif(
					sales_count_current_period,
					sales_count_last_period
				),
				data: branchData,
			});
		}

    return res.status(200).json({
      start_current_period: startCurrentPeriod,
      end_current_period: endCurrentPeriod,
      start_last_period: starLastPeriod,
      end_last_period: endLastPeriod,
			purchase_amount_current_period_total: toDecimal(purchase_amount_current_period_total),
			purchase_amount_last_period_total: toDecimal(purchase_amount_last_period_total),
			purchase_amount_compare_percent_total: getPercentDif(
				purchase_amount_current_period_total,
				purchase_amount_last_period_total
			),
			purchase_count_current_period_total: toDecimal(purchase_count_current_period_total),
			purchase_count_last_period_total: toDecimal(purchase_count_last_period_total),
			purchase_count_compare_percent_total: getPercentDif(
				purchase_count_current_period_total,
				purchase_count_last_period_total
			),
			sales_amount_current_period_total: toDecimal(sales_amount_current_period_total),
			sales_amount_last_period_total: toDecimal(sales_amount_last_period_total),
			sales_amount_compare_percent_total: getPercentDif(
				sales_amount_current_period_total,
				sales_amount_last_period_total
			),
			sales_count_current_period_total: toDecimal(sales_count_current_period_total),
			sales_count_last_period_total: toDecimal(sales_count_last_period_total),
			sales_count_compare_percent_total: getPercentDif(
				sales_count_current_period_total,
				sales_count_last_period_total
			),
      labels,
      data,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Talk to the admin',
      error,
    });
  }
};


module.exports = {
  getBranchesProfit,
  getBranchesCompareData,
  getBranchesProfitTotal,
  getBranchesTransactionCount,
};
