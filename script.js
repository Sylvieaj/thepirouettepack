
// Cart with localStorage, product images, remove option, floating hearts, and toast notifications
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const product = button.getAttribute("data-product");
    const price = parseFloat(button.getAttribute("data-price"));
    const image = button.getAttribute("data-image") || "assets/images/logo.jpeg";

    cart.push({ product, price, image });
    saveCart();
    updateCartCount();
    showToast(product + " added to your cart! 💖");
    createHeart();
  });
});

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

// Show cart popup
document.getElementById("view-cart").addEventListener("click", () => {
  const cartPopup = document.getElementById("cart-popup");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <img src="${item.image}" alt="${item.product}" style="width:50px;height:50px;border-radius:8px;margin-right:8px;">
      ${item.product} - $${item.price.toFixed(2)}
      <button class="remove-item" data-index="${index}" style="margin-left:auto;background:#ff6f91;border:none;color:white;padding:4px 8px;border-radius:8px;cursor:pointer;">✕</button>
    `;
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.gap = "6px";
    li.style.marginBottom = "6px";
    cartItems.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = "Total: $" + total.toFixed(2);
  cartPopup.style.display = "block";

  // Add remove item functionality
  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      cart.splice(index, 1);
      saveCart();
      updateCartCount();
      document.getElementById("view-cart").click(); // refresh popup
    });
  });
});

document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart-popup").style.display = "none";
});

document.getElementById("checkout-btn").addEventListener("click", () => {
  alert("Checkout not set up yet — but you could connect this to PayPal or Stripe!");
});

// Floating hearts effect
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💖";
  heart.style.left = Math.random() * window.innerWidth + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}

// Toast notification function
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Initialize cart count on page load
updateCartCount();
