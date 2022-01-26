const toDecimal = (number) => {
    return Number(number.toFixed(2));
};

const getPercent = (partial, total) => {
    return toDecimal( (partial / total) * 100);
};

module.exports = {
    toDecimal,
    getPercent
};