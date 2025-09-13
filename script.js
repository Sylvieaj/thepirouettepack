
function getCart(){ return JSON.parse(localStorage.getItem('cart')||'[]'); }
function saveCart(c){ localStorage.setItem('cart', JSON.stringify(c)); }
function addToCart(name,price){ let cart=getCart(); let found=cart.find(i=>i.name===name); if(found) found.quantity+=1; else cart.push({name,price,quantity:1}); saveCart(cart); alert(name+' added to cart!'); }
function buyNow(name,price){ saveCart([{name,price,quantity:1}]); window.location.href='checkout.html'; }
function renderCart(){ const c=getCart(); const container=document.getElementById('cart-items'); const totalEl=document.getElementById('cart-total'); if(!container) return; container.innerHTML = ''; let total=0; c.forEach((item,idx)=>{ total += item.price * item.quantity; const div=document.createElement('div'); div.className='cart-item'; div.innerHTML = '<div><strong>'+item.name+'</strong><div class="note">$'+item.price+' x '+item.quantity+'</div></div><div><button class="small-btn" onclick="removeFromCart('+idx+')">Remove</button></div>'; container.appendChild(div); }); if(totalEl) totalEl.innerText = 'Total: $' + total; }
function removeFromCart(i){ let c=getCart(); c.splice(i,1); saveCart(c); renderCart(); }
function checkout(){ window.location.href='checkout.html'; }
function completeOrder(e){ e.preventDefault(); localStorage.removeItem('cart'); window.location.href='thankyou.html'; }
document.addEventListener('DOMContentLoaded', ()=>{ if(document.getElementById('cart-items')) renderCart(); });
