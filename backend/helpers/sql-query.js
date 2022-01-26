
const getPurchaseOrderBetweenDates = (startDate, endDate, branch_id) => {
    const branchCondition = Number(branch_id) === 0 ? '' : ` AND branch_id = ${branch_id}`;
    return `
        SELECT * 
        FROM purchase_orders 
        WHERE purchase_date >= '${startDate}' AND purchase_date <= '${endDate}'
    ` + branchCondition;
};

const getRetailSalesBetweenDates = (startDate, endDate, branch_id) => {
    const branchCondition = Number(branch_id) === 0 ? '' : ` AND branch_id = ${branch_id}`;
    return `
        SELECT * 
        FROM retail_sales 
        WHERE sale_date >= '${startDate}' AND sale_date <= '${endDate}'
    ` + branchCondition;
};




module.exports = {
    getPurchaseOrderBetweenDates,
    getRetailSalesBetweenDates,
};