const express = require('express');
const router = express.Router();
const { Product } = require('../models/index'); // Đảm bảo rằng bạn đã định nghĩa Product trong models/index.js

// Lấy danh sách sản phẩm
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        res.status(500).send('Có lỗi xảy ra');
    }
});

// Thêm sản phẩm mới
router.post('/add', async (req, res) => {
    try {
        const { name, price } = req.body;
        await Product.create({ name, price });
        res.redirect('/products');
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm:', error);
        res.status(500).send('Không thể thêm sản phẩm');
    }
});

module.exports = router;