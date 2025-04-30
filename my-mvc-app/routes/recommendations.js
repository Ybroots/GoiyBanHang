const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');

// Gửi danh sách giao dịch và nhận sản phẩm gợi ý
router.post('/', (req, res) => {
    const { transactions, minSupport } = req.body;

    const pythonProcess = spawn('python3', ['algorithms/prepost.py']);

    let dataToSend = '';
    pythonProcess.stdout.on('data', (data) => {
        dataToSend += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Lỗi từ Python script: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            res.json(JSON.parse(dataToSend));
        } else {
            res.status(500).send('Lỗi khi chạy thuật toán PrePost');
        }
    });

    pythonProcess.stdin.write(JSON.stringify({ transactions, minSupport }));
    pythonProcess.stdin.end();
});

module.exports = router;