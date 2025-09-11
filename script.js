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

// ... rest stays same as before ...
