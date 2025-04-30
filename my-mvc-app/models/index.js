const { Sequelize } = require('sequelize');
const Product = require('./product'); // Import module product.js

// Kết nối cơ sở dữ liệu
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database1.sqlite',
});

// Tạo mô hình
const models = {
    Product: Product(sequelize), // Tạo model Product
};

module.exports = { sequelize, ...models };