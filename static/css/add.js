const cartItems = [];
const cartPopup = document.getElementById('cart-popup');
const cartList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// Handle all add-to-cart buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    addToCart({ name, price });
    cartPopup.classList.remove('hidden');
  });
});

function addToCart(product) {
  const existingItem = cartItems.find(item => item.name === product.name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }
  updateCartPopup();
}

function updateCartPopup() {
  cartList.innerHTML = '';
  let total = 0;

  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} × ${item.quantity} = £${itemTotal.toFixed(2)}
      <button class="delete-btn" onclick="removeFromCart(${index})">🗑️</button>
    `;
    cartList.appendChild(li);
    total += itemTotal;
  });

  cartTotal.textContent = `£${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCartPopup();
}

function toggleCart() {
  cartPopup.classList.toggle('hidden');
}

function closeCart() {
  cartPopup.classList.add('hidden');
}

function payNow() {
  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  alert(`Thank you for your purchase!\nTotal: £${totalAmount.toFixed(2)}`);

  // Clear cart
  cartItems.length = 0;
  updateCartPopup();
  closeCart();
}
