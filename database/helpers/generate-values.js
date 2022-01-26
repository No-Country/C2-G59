const { randomIn } = require("./calculate");

/**
 * @param {number} max 
 * @returns random number from 1 and max
 */
 const getRandomInt = (max) => {
    const randomNumber = Math.floor(Math.random() * (max + 1) );
    return randomNumber !== 0 ? randomNumber : getRandomInt(max);
};

// Random number from 1 to 3
const randomBranchId = () => {
    return getRandomInt(3);
};

// Random number from 1 to 9
const randomBranchSupplierId = () => {
    return getRandomInt(9);
};

// Random number of 8 digits length with 0 at begining
const randomSupplierInvoice = () => {
    return '0' + Math.floor(Math.random() * 10000000);    
};

// Random number from 1 to 100
const randomProductId = () => {
    return getRandomInt(100);
};

// Random number from 1 to 100
const randomDozen = () => {
    const dozen = Math.floor(Math.random() * 5) * 12;
    if (dozen > 0) {
        return  dozen;
    } else {
        return randomDozen();
    }
};

// Get cost of product with 30-70% less
const getCostOfProduct = (price) => {
    const randomNumber = Math.random();
    const randomPercent = randomNumber >= 0.3 && randomNumber <= 0.7
                        ? randomNumber
                        : 0.45;
    
    return (price * randomPercent).toFixed(2);
};

const randomTransactionDate = () => {
    const start = new Date('2019-06-01');
    const end = new Date();
    const random = Math.random();

    const trx_date = new Date(start.getTime() + random * (end.getTime() - start.getTime()));
    const pay_date =  new Date(start.getTime() + random * (end.getTime() - start.getTime()));
    pay_date.setDate(pay_date.getDate() + randomIn([0, 7, 15, 30]));

    return { trx_date, pay_date };
};

module.exports = {
    getRandomInt,
    randomBranchId,
    randomBranchSupplierId,
    randomProductId,
    randomSupplierInvoice,
    randomDozen,
    getCostOfProduct,
    randomTransactionDate,
};