const { sequelize } = require('../libs/sequelize');
const { QueryTypes } = require('sequelize');


const getDistinctBranchId = () => {
    return sequelize.query(`SELECT DISTINCT id FROM branches`,
        { type: QueryTypes.SELECT }
    );
};



module.exports = {
    getDistinctBranchId
};