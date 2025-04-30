const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Transaction', {
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        transaction_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });
};