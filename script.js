function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let item = cart.find(i => i.name === name);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(name + " added to cart!");
}

function loadCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let container = document.getElementById('cart-items');
  let totalElem = document.getElementById('cart-total');
  if (!container) return;

  container.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    let div = document.createElement('div');
    div.innerHTML = item.name + " - $" + item.price + " x " + item.quantity +
      " <button onclick='removeFromCart(" + index + ")'>Remove</button>";
    container.appendChild(div);
    total += item.price * item.quantity;
  });
  totalElem.innerText = "Total: $" + total;
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cart-items')) loadCart();

  let checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(e) {
      e.preventDefault();
      localStorage.removeItem('cart');
      document.getElementById('order-message').innerText = "🎀 Thank you for your order! 🎀";
    });
  }
});
