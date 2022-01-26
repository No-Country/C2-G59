const { request, response } = require("express");
const moment = require('moment');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../libs/sequelize');

// Models
const { Branch } = require("../db/models/branch.model");

// Helpers
const {
    getPurchaseOrderBetweenDates,
    getRetailSalesBetweenDates
} = require("../helpers/sql-query");
const { toDecimal, getPercent } = require("../helpers/calculate");

const dateFormat = 'YYYY-MM-DD';

// Get branches total profit, income and outcome
const getBranchesProfit = async(req = request, res = response) => {
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
            msg: 'Query months must be 2 or more'
        });
    }

    try {
        // Establecer mes de inicio y fin
        let startDate = moment().subtract(months, 'months').startOf('month');
        let endDate = moment().subtract(1, 'months').endOf('month'); // Previous month
        
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
        for(let i = 0; i < months; i++) {
            const monthToEvaluate = startDate.clone().add(i, 'months');
            labels.push(monthToEvaluate.format('MMMM'));
        }

        // Asignar valores a data (profit de branch(es))
        if ( branch_id === 0 ) { // Todas las branch
            // Obtener la informacion de todas las Branch
            const branches = await Branch.findAll();
            
            for ( let branch of branches ) { // Se evaluan tolas las branch
                let branchData = [];
                const branchId = branch.dataValues.id;

                for(let i = 0; i < months; i++) { // Se evalua todos los meses para una branch
                    const monthToEvaluate = startDate.clone().add(i, 'months');
                    let amountPurchaseOrder = 0; // in month
                    let amountRetailSale = 0; // in month

                    // Se obtienen las PurchaseOrder para la branch del loop
                    allPurchaseOrder.forEach( purchaseOrder => {
                        let purchaseDate = moment(purchaseOrder.purchase_date);
                        if (purchaseDate.month() === monthToEvaluate.month()
                            && branchId === purchaseOrder.branch_id
                        ){
                            amountPurchaseOrder += Number(purchaseOrder.amount);
                        }
                    });

                    // Obtener el monto total de las ventas
                    // del mes a evaluar (monthToEvaluate)
                    allRetailSales.forEach( retailSale => {
                        let saleDate = moment(retailSale.sale_date);
                        if (saleDate.month() === monthToEvaluate.month()
                            && branchId === retailSale.branch_id
                        ) {
                            amountRetailSale += Number(retailSale.amount);
                        }
                    });

                    if (cashflow) {
                        branchData.push({
                            month: monthToEvaluate.format('MMMM'),
                            profit: toDecimal(amountRetailSale - amountPurchaseOrder),
                            amountSales: toDecimal(amountRetailSale),
                            amountPurchase: toDecimal(amountPurchaseOrder)
                        });
                    } else {
                        branchData.push(toDecimal(amountRetailSale - amountPurchaseOrder));
                    }
                }

                data.push({
                    branch_id: branchId,
                    branch_name: branch.dataValues.branch_name,
                    data: branchData
                });
            }

        } else {
            // Obtener la informacion de todas las Branch
            const branch = await Branch.findOne({ where: { id: branch_id }});

            let branchData = [];
            const branchId = branch.dataValues.id;

            for(let i = 0; i < months; i++) { // Se evalua todos los meses para una branch
                const monthToEvaluate = startDate.clone().add(i, 'months');
                let amountPurchaseOrder = 0; // in month
                let amountRetailSale = 0; // in month

                // Se obtienen las PurchaseOrder para la branch del loop
                allPurchaseOrder.forEach( purchaseOrder => {
                    let purchaseDate = moment(purchaseOrder.purchase_date);
                    if (purchaseDate.month() === monthToEvaluate.month()
                        && branchId === purchaseOrder.branch_id
                    ){
                        amountPurchaseOrder += Number(purchaseOrder.amount);
                    }
                });

                // Obtener el monto total de las ventas
                // del mes a evaluar (monthToEvaluate)
                allRetailSales.forEach( retailSale => {
                    let saleDate = moment(retailSale.sale_date);
                    if (saleDate.month() === monthToEvaluate.month()
                        && branchId === retailSale.branch_id
                    ) {
                        amountRetailSale += Number(retailSale.amount);
                    }
                });

                if (cashflow) {
                    branchData.push({
                        month: monthToEvaluate.format('MMMM'),
                        profit: toDecimal(amountRetailSale - amountPurchaseOrder),
                        amountSales: toDecimal(amountRetailSale),
                        amountPurchase: toDecimal(amountPurchaseOrder)
                    });
                } else {
                    branchData.push(toDecimal(amountRetailSale - amountPurchaseOrder));
                }
            }

            data.push({
                branch_id,
                branch_name: branch.dataValues.branch_name,
                data: branchData
            });
         
        }

        return res.status(200).json({
            labels,
            data
        });

    } catch(error) {
        return res.status(500).json({
            msg: 'Talk to the admin',
            error
        });
    }
};

// Get branches total profit, income and outcome
const getBranchesProfitTotal = async(req = request, res = response) => {
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
            msg: 'Query months must be 2 or more'
        });
    }

    try {
        // Establecer mes de inicio y fin
        let startDate = moment().subtract(months, 'months').startOf('month');
        let endDate = moment().subtract(1, 'months').endOf('month'); // Previous month
        
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
        allPurchaseOrder.forEach( po => {
            totalAmountPurchase += Number(po.amount);
        });

        allRetailSales.forEach( rs => {
            totalAmountSales += Number(rs.amount);
        });

        totalProfit = Number(totalAmountSales) - Number(totalAmountPurchase);

        // Asignar valores a labels
        for(let i = 0; i < months; i++) {
            const monthToEvaluate = startDate.clone().add(i, 'months');
            labels.push(monthToEvaluate.format('MMMM'));
        }

        // Asignar valores a data (profit de branch(es))
        if ( branch_id === 0 ) { // Todas las branch
            // Obtener la informacion de todas las Branch
            const branches = await Branch.findAll();
            
            for ( let branch of branches ) { // Se evaluan tolas las branch
                let branchData = [];
                const branchId = branch.dataValues.id;
                let amountPurchaseOrder = 0; 
                let amountRetailSale = 0;

                // Se obtienen las PurchaseOrder para la branch del loop
                allPurchaseOrder.forEach( purchaseOrder => {
                    if ( branchId === purchaseOrder.branch_id ){
                        amountPurchaseOrder += Number(purchaseOrder.amount);
                    }
                });

                // Obtener el monto total de las ventas
                // del mes a evaluar (monthToEvaluate)
                allRetailSales.forEach( retailSale => {
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
                    data: branchData
                });
            }


        } else {
            // Obtener la informacion de todas las Branch
            const branch = await Branch.findOne({ where: { id: branch_id }});

            let branchData = [];
            const branchId = branch.dataValues.id;

            let amountPurchaseOrder = 0; // in month
            let amountRetailSale = 0; // in month

            // Se obtienen las PurchaseOrder para la branch del loop
            allPurchaseOrder.forEach( purchaseOrder => {
                if (branchId === purchaseOrder.branch_id){
                    amountPurchaseOrder += Number(purchaseOrder.amount);
                }
            });

            // Obtener el monto total de las ventas
            // del mes a evaluar (monthToEvaluate)
            allRetailSales.forEach( retailSale => {
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
                data: branchData
            });
         
        }

        return res.status(200).json({
            total_profit: toDecimal(totalProfit),
            total_amount_sales: toDecimal(totalAmountSales),
            total_amount_purchase: toDecimal(totalAmountPurchase),
            labels,
            data
        });

    } catch(error) {
        return res.status(500).json({
            msg: 'Talk to the admin',
            error
        });
    }
};

// Get branches total sales
const getBranchesTransactionCount = async(req = request, res = response) => {
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
            msg: 'Query months must be 2 or more'
        });
    }

    try {
        // Establecer mes de inicio y fin
        let startDate = moment().subtract(months, 'months').startOf('month');
        let endDate = moment().subtract(1, 'months').endOf('month'); // Previous month
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
        for(let i = 0; i < months; i++) {
            const monthToEvaluate = startDate.clone().add(i, 'months');
            labels.push(monthToEvaluate.format('MMMM'));
        }

        // Asignar valores a data (profit de branch(es))
        if ( branch_id === 0 ) { // Todas las branch
            // Obtener la informacion de todas las Branch
            const branches = await Branch.findAll();
            
            for ( let branch of branches ) { // Se evaluan tolas las branch
                let branchData = [];
                const branchId = branch.dataValues.id;

                for(let i = 0; i < months; i++) { // Se evalua todos los meses para una branch
                    const monthToEvaluate = startDate.clone().add(i, 'months');
                    let countPurchaseOrder = 0; // in month
                    let countRetailSale = 0; // in month
                    let objTemp = {};

                    // Se obtienen las PurchaseOrder para la branch del loop
                    if (purchase) {
                        allPurchaseOrder.forEach( purchaseOrder => {
                            let purchaseDate = moment(purchaseOrder.purchase_date);
                            if (purchaseDate.month() === monthToEvaluate.month()
                                && branchId === purchaseOrder.branch_id
                            ){
                                countPurchaseOrder++;
                            }
                        });
                    }

                    // Obtener el monto total de las ventas
                    // del mes a evaluar (monthToEvaluate)
                    if (sales) {
                        allRetailSales.forEach( retailSale => {
                            let saleDate = moment(retailSale.sale_date);
                            if (saleDate.month() === monthToEvaluate.month()
                                && branchId === retailSale.branch_id
                            ) {
                                countRetailSale++;
                            }
                        });
                    }

                    if (purchase) {
                        objTemp = {... objTemp, purchase_count: countPurchaseOrder };
                    }

                    if (sales) {
                        objTemp = {...objTemp, sales_count: countRetailSale };
                    }

                    branchData.push({
                        month: monthToEvaluate.format('MMMM'),
                        ...objTemp,
                    });
                
                }

                data.push({
                    branch_id: branchId,
                    branch_name: branch.dataValues.branch_name,
                    data: branchData
                });
            }

        } else {
            // Obtener la informacion de todas las Branch
            const branch = await Branch.findOne({ where: { id: branch_id }});

            let branchData = [];
            const branchId = branch.dataValues.id;

            for(let i = 0; i < months; i++) { // Se evalua todos los meses para una branch
                const monthToEvaluate = startDate.clone().add(i, 'months');
                let countPurchaseOrder = 0; // in month
                let countRetailSale = 0; // in month
                let objTemp = {};

                // Se obtienen las PurchaseOrder para la branch del loop
                if (purchase) {
                    allPurchaseOrder.forEach( purchaseOrder => {
                        let purchaseDate = moment(purchaseOrder.purchase_date);
                        if (purchaseDate.month() === monthToEvaluate.month()
                            && branchId === purchaseOrder.branch_id
                        ){
                            countPurchaseOrder++;
                        }
                    });
                }

                // Obtener el monto total de las ventas
                // del mes a evaluar (monthToEvaluate)
                if (sales) {
                    allRetailSales.forEach( retailSale => {
                        let saleDate = moment(retailSale.sale_date);
                        if (saleDate.month() === monthToEvaluate.month()
                            && branchId === retailSale.branch_id
                        ) {
                            countRetailSale++;
                        }
                    });
                }

                if (purchase) {
                    objTemp = {... objTemp, purchase_count: countPurchaseOrder };
                }

                if (sales) {
                    objTemp = {...objTemp, sales_count: countRetailSale };
                }

                branchData.push({
                    month: monthToEvaluate.format('MMMM'),
                    ...objTemp,
                });
            }

            data.push({
                branch_id,
                branch_name: branch.dataValues.branch_name,
                data: branchData
            });
        
        }

        return res.status(200).json({
            labels,
            data
        });

    } catch(error) {
        return res.status(500).json({
            msg: 'Talk to the admin',
            error
        });
    }
};

module.exports = {
    getBranchesProfit,
    getBranchesProfitTotal,
    getBranchesTransactionCount
};

/**
 
/*
    for(let i = 0; i < months; i++) {
        const monthToEvaluate = startDate.clone().add(i, 'months');
        let amountPurchaseOrder = 0; // in month
        let amountRetailSale = 0; // in month
        
        // Asignar labels
        labels.push(monthToEvaluate.format('MMMM'));

        // Obtener el monto total de las ordenes de compra
        // del mes a evaluar (monthToEvaluate)
        allPurchaseOrder.forEach( purchaseOrder => {
            let purchaseDate = moment(purchaseOrder.purchase_date);
            if (purchaseDate.month() === monthToEvaluate.month()) {
                amountPurchaseOrder += Number(purchaseOrder.amount);
            }
        });

        // Obtener el monto total de las ventas
        // del mes a evaluar (monthToEvaluate)
        allRetailSales.forEach( retailSale => {
            let saleDate = moment(retailSale.sale_date);
            if (saleDate.month() === monthToEvaluate.month()) {
                amountRetailSale += Number(retailSale.amount);
            }
        });

        data.push({ 
            // branch_id si es por branch
            profit: toDecimal(amountRetailSale - amountPurchaseOrder),
            amountTotalSales: toDecimal(amountRetailSale),
            amountTotalPurchase: toDecimal(amountPurchaseOrder),
        });
    }

 */