document.addEventListener("DOMContentLoaded", async () => {
    const productList = document.getElementById('product-list');
    const recommendationList = document.getElementById('recommendation-list');

    // Lấy danh sách sản phẩm từ API
    const products = await fetch('/products').then(res => res.json());

    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - ${product.price} VND`;
        li.dataset.id = product.id;
        li.addEventListener('click', () => {
            fetch('/recommendations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ transactions: [[product.id]], minSupport: 2 })
            })
            .then(res => res.json())
            .then(recommendations => {
                recommendationList.innerHTML = '';
                recommendations.forEach(item => {
                    const recLi = document.createElement('li');
                    recLi.textContent = item;
                    recommendationList.appendChild(recLi);
                });
            });
        });
        productList.appendChild(li);
    });
});