
// Persisted cart using localStorage (keys: 'cart', 'memberName', 'lastOrder')
let cart = JSON.parse(localStorage.getItem('cart')) || {};

const products = {
  "Original Pack 🎀": 25,
  "Ultra Pack ✨": 25,
  "Deluxe Pack 🌸": 30,
  "Sophia's Hair Kit (Regular) ✨": 20,
  "Sophia's Hair Kit (Basic) ✨": 25,
  "Sophia's Hair Kit (Deluxe) ✨": 35,
  "Alex's Pack 💕": 35
};

// Utility to save cart
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add to cart with scrunchie handling
document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const productCard = e.target.closest('.product-card');
      let productName = productCard.querySelector('h2').innerText.trim();

      // Find select element inside the same card (scrunchie)
      const scrunchieSelect = productCard.querySelector('select');
      if (scrunchieSelect) {
        productName += ' - ' + scrunchieSelect.value;
      }

      if (!cart[productName]) cart[productName] = 1; else cart[productName]++;

      saveCart();
      updateCartDisplay();
      showToast(productName + ' added to your cart!');
    });
  });

  // Member join handling
  const joinBtn = document.getElementById('join-btn');
  if (joinBtn) {
    joinBtn.addEventListener('click', () => {
      const name = document.getElementById('memberName').value.trim();
      if (!name) { alert('Please enter your name to join 😊'); return; }
      localStorage.setItem('memberName', name);
      document.getElementById('memberMessage').innerText = `Welcome, ${name}! You're now a member 🎀✨`;
      updateCartDisplay();
    });
  }

  // Show member message on load
  const memberName = localStorage.getItem('memberName');
  if (memberName && document.getElementById('memberMessage')) {
    document.getElementById('memberMessage').innerText = `Welcome back, ${memberName}! 💕 Thanks for being a member 🎀`;
  }

  updateCartDisplay();
});

// Toast helper
function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerText = msg;
  t.style.position='fixed'; t.style.bottom='20px'; t.style.right='20px';
  t.style.background='#ffb6d9'; t.style.color='#8a1f57'; t.style.padding='10px 14px';
  t.style.borderRadius='12px'; t.style.fontWeight='700'; t.style.zIndex=2000;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

// Update cart display in cart.html if exists
function updateCartDisplay() {
  const cartItemsDiv = document.getElementById('cart-items');
  if (!cartItemsDiv) return;

  cartItemsDiv.innerHTML = '';
  let total = 0;
  const memberName = localStorage.getItem('memberName');
  for (const [productName, qty] of Object.entries(cart)) {
    const baseName = productName.split(' - ')[0];
    const price = products[baseName] || 0;
    const itemTotal = price * qty;
    const item = document.createElement('div');
    item.innerHTML = `<strong>${productName}</strong> — $${price} x ${qty} = $${itemTotal.toFixed(2)}`;

    // controls
    const minus = document.createElement('button'); minus.innerText='➖';
    minus.addEventListener('click', ()=>{ if (cart[productName] > 1) cart[productName]--; else delete cart[productName]; saveCart(); updateCartDisplay(); });
    const plus = document.createElement('button'); plus.innerText='➕';
    plus.addEventListener('click', ()=>{ cart[productName] = (cart[productName]||0)+1; saveCart(); updateCartDisplay(); });
    const rem = document.createElement('button'); rem.innerText='Remove';
    rem.addEventListener('click', ()=>{ delete cart[productName]; saveCart(); updateCartDisplay(); });

    const controls = document.createElement('span'); controls.className='cart-controls';
    controls.appendChild(minus); controls.appendChild(plus); controls.appendChild(rem);
    item.appendChild(controls);

    cartItemsDiv.appendChild(item);
    total += itemTotal;
  }

  // apply member discount
  let discount = 0;
  if (localStorage.getItem('memberName')) {
    discount = total * 0.10;
  }
  const totalDiv = document.getElementById('cart-total');
  if (totalDiv) {
    const final = total - discount;
    totalDiv.innerText = `Total: $${final.toFixed(2)}`;
    // show discount message in cart area
    const existingNote = document.getElementById('member-discount-note');
    if (existingNote) existingNote.remove();
    if (discount > 0) {
      const note = document.createElement('div'); note.id='member-discount-note';
      note.innerText = `💖 Members save 10%! Discount: -$${discount.toFixed(2)}`;
      note.style.marginTop='10px'; note.style.fontWeight='700'; note.style.color='#d63384';
      cartItemsDiv.appendChild(note);
    }
  }
  saveCart();
}

// Checkout rendering
function renderCheckout() {
  const checkoutDiv = document.getElementById('checkout-items');
  if (!checkoutDiv) return;
  checkoutDiv.innerHTML = '';
  let total = 0;
  for (const [productName, qty] of Object.entries(cart)) {
    const baseName = productName.split(' - ')[0];
    const price = products[baseName] || 0;
    const itemTotal = price * qty;
    const d = document.createElement('div');
    d.innerText = `${productName} — $${price} x ${qty} = $${itemTotal.toFixed(2)}`;
    checkoutDiv.appendChild(d);
    total += itemTotal;
  }
  // apply discount if member
  const discount = localStorage.getItem('memberName') ? total * 0.10 : 0;
  const final = total - discount;
  const totalDiv = document.getElementById('checkout-total');
  if (totalDiv) totalDiv.innerText = `Total: $${final.toFixed(2)}`;
  // show discount note
  const existing = document.getElementById('checkout-discount-note'); if (existing) existing.remove();
  if (discount > 0) {
    const note = document.createElement('div'); note.id='checkout-discount-note'; note.innerText = `💖 Members save 10%! Discount: -$${discount.toFixed(2)}`;
    note.style.color='#d63384'; document.getElementById('checkout-items').appendChild(note);
  }
}

// Confirm order -> save lastOrder and redirect
function confirmOrder() {
  const lastOrder = { items: cart, timestamp: Date.now() };
  localStorage.setItem('lastOrder', JSON.stringify(lastOrder));
  // clear cart
  cart = {}; saveCart();
  window.location.href = 'thankyou.html';
}

// Thank you rendering
function renderThankYou() {
  const orderSummaryDiv = document.getElementById('order-summary');
  if (!orderSummaryDiv) return;
  orderSummaryDiv.innerHTML = '';
  const lastOrder = JSON.parse(localStorage.getItem('lastOrder')||'{}');
  const items = (lastOrder.items) || {};
  let total = 0;
  for (const [productName, qty] of Object.entries(items)) {
    const baseName = productName.split(' - ')[0];
    const price = products[baseName] || 0;
    const itemTotal = price * qty;
    const d = document.createElement('div');
    // add cute emoji suffix depending on baseName
    let suffix = '';
    if (baseName.includes('Sophia')) suffix = ' 🌸';
    else if (baseName.includes('Alex')) suffix = ' 💕';
    else if (baseName.includes('Ultra')) suffix = ' ✨';
    else if (baseName.includes('Deluxe')) suffix = ' 🌸';
    else suffix = ' 🎀';
    d.innerText = `${suffix} ${productName} — $${price} x ${qty} = $${itemTotal.toFixed(2)}`;
    orderSummaryDiv.appendChild(d);
    total += itemTotal;
  }
  const discount = localStorage.getItem('memberName') ? total * 0.10 : 0;
  const final = total - discount;
  const finalTotal = document.getElementById('final-total');
  if (finalTotal) finalTotal.innerText = `Total: $${final.toFixed(2)}`;
  if (discount>0) {
    const note = document.createElement('div'); note.innerText = `💖 Members saved $${discount.toFixed(2)}!`;
    note.style.color='#d63384'; orderSummaryDiv.appendChild(note);
  }
}

// run checkout/thankyou rendering on DOM ready
document.addEventListener('DOMContentLoaded', ()=>{ renderCheckout(); renderThankYou(); updateCartDisplay(); });

