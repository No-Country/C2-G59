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
const { toDecimal } = require("../helpers/calculate");

const dateFormat = 'YYYY-MM-DD';

// Get all branches total profit 
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


module.exports = {
    getBranchesProfit
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