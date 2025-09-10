let cart = [];

function addToCart(item) {
  cart.push(item);
  updateCart();
}

function updateCart() {
  document.getElementById('cart-count').textContent = cart.length;
  const cartItems = document.getElementById('cart-items');
  if (cartItems) {
    cartItems.innerHTML = '';
    cart.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      cartItems.appendChild(li);
    });
  }

  const orderDetails = document.getElementById('order-details');
  if (orderDetails) {
    orderDetails.value = cart.join(', ');
  }
}

function toggleCart() {
  const popup = document.getElementById('cart-popup');
  if (popup) {
    popup.classList.toggle('hidden');
  }
}

function goToCheckout() {
  window.location.href = 'order.html';
}