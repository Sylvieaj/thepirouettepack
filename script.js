let cart = {};
let products = {
  "Original Pack 🎀": 20,
  "Ultra Pack ✨": 25,
  "Deluxe Pack 🌸": 30,
  "Sophia's Hair Kit (Regular)": 20,
  "Sophia's Hair Kit (Basic)": 25,
  "Sophia's Hair Kit (Deluxe)": 35,
  "Alex's Pack 💕": 35,
  "Stickers ✨": 5,
  "Monogramming 🌸": 5
};

function addToCart(product) {
  if (!cart[product]) cart[product] = 0;
  cart[product]++;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function removeFromCart(product) {
  if (cart[product]) {
    cart[product]--;
    if (cart[product] <= 0) delete cart[product];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  }
}

function updateCart() {
  const cartDiv = document.getElementById("cart-items");
  if (!cartDiv) return;
  cartDiv.innerHTML = "";
  let total = 0;
  for (const [product, qty] of Object.entries(cart)) {
    const price = products[product] || 0;
    const itemTotal = price * qty;
    total += itemTotal;
    const div = document.createElement("div");
    div.innerHTML = `${product} - $${price} x ${qty} = $${itemTotal}
      <button onclick="addToCart('${product}')">+</button>
      <button onclick="removeFromCart('${product}')">-</button>`;
    cartDiv.appendChild(div);
  }
  const memberName = localStorage.getItem("memberName");
  if (memberName) {
    const discount = total * 0.10;
    total -= discount;
    const msg = document.createElement("p");
    msg.innerText = `💖 Members save 10%! Discount: -$${discount.toFixed(2)}`;
    cartDiv.appendChild(msg);
  }
  const totalDiv = document.getElementById("cart-total");
  if (totalDiv) totalDiv.innerText = "Total: $" + total.toFixed(2);
}

function joinMembers() {
  const name = document.getElementById("memberName").value;
  if (name) {
    localStorage.setItem("memberName", name);
    document.getElementById("memberMessage").innerText = 
      `Welcome, ${name}! You're now a member 🎀✨`;
  }
}

function confirmOrder() {
  localStorage.setItem("lastOrder", JSON.stringify(cart));
  window.location.href = "thankyou.html";
}

window.onload = function() {
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    updateCart();
  }
  const memberName = localStorage.getItem("memberName");
  if (memberName && document.getElementById("memberMessage")) {
    document.getElementById("memberMessage").innerText = 
      `Welcome back, ${memberName}! 💕 Thanks for being a member 🎀`;
  }
  if (document.getElementById("checkout-items")) {
    const order = JSON.parse(localStorage.getItem("cart") || "{}");
    let total = 0;
    for (const [product, qty] of Object.entries(order)) {
      const price = products[product] || 0;
      const itemTotal = price * qty;
      total += itemTotal;
      const div = document.createElement("div");
      div.innerText = `${product} - $${price} x ${qty} = $${itemTotal}`;
      document.getElementById("checkout-items").appendChild(div);
    }
    if (memberName) {
      const discount = total * 0.10;
      total -= discount;
      const msg = document.createElement("p");
      msg.innerText = `💖 Members save 10%! Discount: -$${discount.toFixed(2)}`;
      document.getElementById("checkout-items").appendChild(msg);
    }
    document.getElementById("checkout-total").innerText = "Total: $" + total.toFixed(2);
  }
  if (document.getElementById("order-summary")) {
    const order = JSON.parse(localStorage.getItem("lastOrder") || "{}");
    let total = 0;
    for (const [product, qty] of Object.entries(order)) {
      const price = products[product] || 0;
      const itemTotal = price * qty;
      total += itemTotal;
      const div = document.createElement("div");
      div.innerText = `${product} - $${price} x ${qty} = $${itemTotal}`;
      document.getElementById("order-summary").appendChild(div);
    }
    if (memberName) {
      const discount = total * 0.10;
      total -= discount;
      const msg = document.createElement("p");
      msg.innerText = `💖 Members save 10%! Discount: -$${discount.toFixed(2)}`;
      document.getElementById("order-summary").appendChild(msg);
    }
    const totalDiv = document.createElement("h2");
    totalDiv.innerText = "Total: $" + total.toFixed(2);
    document.getElementById("order-summary").appendChild(totalDiv);
  }
}