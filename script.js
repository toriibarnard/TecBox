document.getElementById('product-type').addEventListener('change', function() {
    const selectedType = this.value;
    const products = document.querySelectorAll('.product-card');

    products.forEach(function(product) {
        if (selectedType === 'all' || product.getAttribute('data-type') === selectedType) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});