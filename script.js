
// Cart object
let cart = JSON.parse(localStorage.getItem("cart")) || {};

// Product prices
const products = {
  "Original Pack 🎀": 25,
  "Ultra Pack ✨": 25,
  "Deluxe Pack 🌸": 30,
  "Sophia's Hair Kit (Regular) ✨": 20,
  "Sophia's Hair Kit (Basic) ✨": 25,
  "Sophia's Hair Kit (Deluxe) ✨": 35,
  "Alex's Pack 💕": 35
};

// Add to cart with scrunchie choice
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", (e) => {
    const productCard = e.target.closest(".product-card");
    let productName = productCard.querySelector("h2").innerText;

    // Check if scrunchie choice exists
    const scrunchieSelect = productCard.querySelector("select");
    if (scrunchieSelect) {
      const choice = scrunchieSelect.value;
      productName += " - " + choice;
    }

    if (!cart[productName]) {
      cart[productName] = 1;
    } else {
      cart[productName]++;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  });
});

// Update cart display (for cart page)
function updateCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  if (!cartItemsDiv) return;

  cartItemsDiv.innerHTML = "";
  let total = 0;

  for (const [productName, qty] of Object.entries(cart)) {
    const baseName = productName.split(" - ")[0];
    const price = products[baseName] || 0;
    const itemTotal = price * qty;

    const item = document.createElement("div");
    item.innerHTML = `${productName} — $${price} x ${qty} = $${itemTotal} `;

    // ➖ Decrease button
    const decreaseBtn = document.createElement("button");
    decreaseBtn.innerText = "➖";
    decreaseBtn.addEventListener("click", () => {
      if (cart[productName] > 1) {
        cart[productName]--;
      } else {
        delete cart[productName];
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
    });

    // ➕ Increase button
    const increaseBtn = document.createElement("button");
    increaseBtn.innerText = "➕";
    increaseBtn.addEventListener("click", () => {
      cart[productName]++;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
    });

    // 🗑️ Remove button
    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.addEventListener("click", () => {
      delete cart[productName];
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
    });

    item.appendChild(decreaseBtn);
    item.appendChild(increaseBtn);
    item.appendChild(removeBtn);
    cartItemsDiv.appendChild(item);

    total += itemTotal;
  }

  const totalDiv = document.getElementById("cart-total");
  if (totalDiv) {
    totalDiv.innerText = "Total: $" + total;
  }
}

// Checkout page rendering
if (document.getElementById("checkout-items")) {
  const checkoutDiv = document.getElementById("checkout-items");
  let total = 0;
  for (const [productName, qty] of Object.entries(cart)) {
    const baseName = productName.split(" - ")[0];
    const price = products[baseName] || 0;
    const itemTotal = price * qty;

    const item = document.createElement("div");
    item.innerText = `${productName} — $${price} x ${qty} = $${itemTotal}`;
    checkoutDiv.appendChild(item);

    total += itemTotal;
  }
  const totalDiv = document.getElementById("checkout-total");
  if (totalDiv) totalDiv.innerText = "Total: $" + total;
}

// Confirm order
function confirmOrder() {
  localStorage.setItem("lastOrder", JSON.stringify(cart));
  cart = {};
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "thankyou.html";
}

// Thank you page rendering
if (document.getElementById("order-summary")) {
  const orderSummaryDiv = document.getElementById("order-summary");
  const lastOrder = JSON.parse(localStorage.getItem("lastOrder")) || {};
  let total = 0;

  for (const [productName, qty] of Object.entries(lastOrder)) {
    const baseName = productName.split(" - ")[0];
    const price = products[baseName] || 0;
    const itemTotal = price * qty;

    const item = document.createElement("div");
    item.innerText = `${productName} — $${price} x ${qty} = $${itemTotal}`;
    orderSummaryDiv.appendChild(item);

    total += itemTotal;
  }

  const totalDiv = document.createElement("h3");
  totalDiv.innerText = "Total: $" + total;
  orderSummaryDiv.appendChild(totalDiv);
}
