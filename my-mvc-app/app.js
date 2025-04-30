const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');// Kết nối cơ sở dữ liệu
const productRoutes = require('./routes/products');
const recommendationRoutes = require('./routes/recommendations');

const app = express();

// Cấu hình Handlebars làm View Engine
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/products', productRoutes);
app.use('/recommendations', recommendationRoutes);

// Trang chính
app.get('/', (req, res) => {
    res.render('index', { title: 'Hệ Thống Gợi Ý Sản Phẩm' });
});

// Khởi động server
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server đang chạy tại http://localhost:${PORT}`));
}).catch((error) => {
    console.error('Không thể kết nối cơ sở dữ liệu:', error);
});