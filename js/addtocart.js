// Thêm sản phẩm vào giỏ hàng
var addToCartButtons = document.querySelectorAll('.single-product .product-action-2 a[title="Add to cart"]');
addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        var product = this.closest('.single-product');
        var productName = product.querySelector('.product-content h3 a').innerText;
        var productPrice = product.querySelector('.product-price span').innerText;
        var productImage = product.querySelector('.product-img a img').getAttribute('src');
        addItemToCart(productName, productPrice, productImage);
    });
});

// Xóa sản phẩm khỏi giỏ hàng
var removeCartItemButtons = document.querySelectorAll('.shopping-cart .remove-icon');
removeCartItemButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        var buttonClicked = event.target;
        buttonClicked.closest('tr').remove();
        updateCartTotal();
    });
});

// Cập nhật số lượng sản phẩm trong giỏ hàng
var quantityInputs = document.querySelectorAll('.shopping-cart .qty .input-number');
quantityInputs.forEach(function(input) {
    input.addEventListener('change', function(event) {
        updateCartTotal();
    });
});

// Tính toán và hiển thị tổng giá trị của giỏ hàng
function updateCartTotal() {
    var cartItems = document.querySelectorAll('.shopping-cart tbody tr');
    var total = 0;
    cartItems.forEach(function(cartItem) {
        var priceElement = cartItem.querySelector('.price span');
        var quantityElement = cartItem.querySelector('.qty .input-number');
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = parseInt(quantityElement.value);
        total += price * quantity;
    });
    document.querySelector('.total-amount li:nth-child(4) span').innerText = '$' + total.toFixed(2);
}

// Thêm sản phẩm vào giỏ hàng
function addItemToCart(title, price, img) {
    var cartRow = document.createElement('tr');
    cartRow.innerHTML = `
        <td class="image" data-title="No"><img src="${img}" alt="${title}"></td>
        <td class="product-des" data-title="Description">
            <p class="product-name"><a href="#">${title}</a></p>
        </td>
        <td class="price" data-title="Price"><span>${price}</span></td>
        <td class="qty" data-title="Qty">
            <div class="input-group">
                <input class="input-number" type="number" value="1" min="1">
            </div>
        </td>
        <td class="total-amount" data-title="Total"><span>${price}</span></td>
        <td class="action" data-title="Remove"><i class="ti-trash remove-icon"></i></td>
    `;
    document.querySelector('.shopping-cart tbody').appendChild(cartRow);
    updateCartTotal();
}
