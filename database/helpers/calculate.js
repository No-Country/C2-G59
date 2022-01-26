// Get random position in array
const randomIn = (options) => {
    const random = Math.floor(Math.random() * options.length );
    return options[random];
};

const getAmountTotal = (products) => {
    let total = 0;
    for(let product of products) {
        let money = product.cost || product.price;
        total += ( money * product.count );
    }
    // return Number(total.toFixed(2));
    return total.toFixed(2);

};

module.exports = {
    randomIn,
    getAmountTotal,
};