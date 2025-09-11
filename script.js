
// Cart object
let cart = {};

// Product prices
const products = {
  "Original Pack 🎀": 25,
  "Sophia's Hair Kit ✨": 35,
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
    updateCart();
  });
});

// Update cart display
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
      updateCart();
    });

    // ➕ Increase button
    const increaseBtn = document.createElement("button");
    increaseBtn.innerText = "➕";
    increaseBtn.addEventListener("click", () => {
      cart[productName]++;
      updateCart();
    });

    // 🗑️ Remove button
    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.addEventListener("click", () => {
      delete cart[productName];
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

// Placeholder checkout
function checkout() {
  const totalText = document.getElementById("cart-total").innerText;
  alert("Proceeding to checkout! 🎀 " + totalText);
}
