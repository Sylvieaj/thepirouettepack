
// Cart with quantities, localStorage, product images, remove, floating hearts, toast notifications, and checkout page
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const product = button.getAttribute("data-product");
    const price = parseFloat(button.getAttribute("data-price"));
    const image = button.getAttribute("data-image") || "assets/images/logo.jpeg";

    // Check if product already in cart
    let existing = cart.find(item => item.product === product);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ product, price, image, quantity: 1 });
    }

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
  let count = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById("cart-count").textContent = count;
}

// Show cart popup
document.getElementById("view-cart").addEventListener("click", () => {
  const cartPopup = document.getElementById("cart-popup");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    let li = document.createElement("li");
    li.textContent = "💖 Your cart is empty, bestie! 🎀";
    cartItems.appendChild(li);
  } else {
    cart.forEach((item, index) => {
      let li = document.createElement("li");
      li.innerHTML = `
        <img src="${item.image}" alt="${item.product}" style="width:50px;height:50px;border-radius:8px;margin-right:8px;">
        ${item.product} - $${item.price.toFixed(2)} x ${item.quantity}
        <div style="margin-left:auto; display:flex; gap:4px;">
          <button class="decrease" data-index="${index}" style="background:#ffb6d9;border:none;color:white;padding:4px 8px;border-radius:8px;cursor:pointer;">➖</button>
          <button class="increase" data-index="${index}" style="background:#ff80bf;border:none;color:white;padding:4px 8px;border-radius:8px;cursor:pointer;">➕</button>
          <button class="remove-item" data-index="${index}" style="background:#ff6f91;border:none;color:white;padding:4px 8px;border-radius:8px;cursor:pointer;">✕</button>
        </div>
      `;
      li.style.display = "flex";
      li.style.alignItems = "center";
      li.style.gap = "6px";
      li.style.marginBottom = "6px";
      cartItems.appendChild(li);
      total += item.price * item.quantity;
    });
  }

  cartTotal.textContent = "Total: $" + total.toFixed(2);
  cartPopup.style.display = "block";

  // Add remove, increase, decrease functionality
  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      cart.splice(index, 1);
      saveCart();
      updateCartCount();
      document.getElementById("view-cart").click(); // refresh popup
    });
  });

  document.querySelectorAll(".increase").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      cart[index].quantity += 1;
      saveCart();
      updateCartCount();
      document.getElementById("view-cart").click();
    });
  });

  document.querySelectorAll(".decrease").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
      saveCart();
      updateCartCount();
      document.getElementById("view-cart").click();
    });
  });
});

document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart-popup").style.display = "none";
});

document.getElementById("checkout-btn").addEventListener("click", () => {
  window.location = "checkout.html";
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
