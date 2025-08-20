// Definir carrito
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para agregar al carrito
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }
  saveCart();
  updateCartBadge();
}

// Eliminar producto del carrito
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartBadge();
  // Volver a rendirizar
  if (document.getElementById('cartDrawer').classList.contains('show')) {
    renderCartItems();
  }
} // removeFromCart

// Actualizar carrito
function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      if (document.getElementById('cartDrawer')?.classList.contains('show')) {
        renderCartItems();
      }
    }
  }
}

// Guardar carrito en el localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Actualizar badge del carrito
function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  if (badge) {
    badge.textContent = totalItems > 0 ? totalItems : '';
    badge.style.display = totalItems > 0 ? 'block' : 'none';
  }
}

// Renderizar
function renderCartItems() {
  const container = document.getElementById('cartItemsContainer');
  const totalElement = document.getElementById('cartTotal');
  const checkoutButton = document.getElementById('checkoutButton');
  if (!container) return;
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-message">
        <i class="bi bi-cart-x" style="font-size: 3rem;"></i>
        <p>Tu carrito está vacío</p>
      </div>`;
    if (totalElement) totalElement.style.display = 'none';
    if (checkoutButton) checkoutButton.style.display = 'none';
  } else {
    let html = '';
    let total = 0;
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      html += `
        <div class="cart-item">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h5>${item.name}</h5>
              <p class="mb-0">$${item.price.toFixed(2)} c/u</p>
            </div>
            <div class="quantity-controls">
              <button class="btn btn-sm btn-outline-secondary quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
              <span class="mx-2">${item.quantity}</span>
              <button class="btn btn-sm btn-outline-secondary quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <span>Total: $${itemTotal.toFixed(2)}</span>
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>`;
    });
    container.innerHTML = html;
    if (totalElement) {
      totalElement.style.display = 'block';
      totalElement.querySelector('#totalAmount').textContent = total.toFixed(2);
    }
    if (checkoutButton) checkoutButton.style.display = 'block';
  }
}

// Inicializar carrito
document.addEventListener('DOMContentLoaded', function() {
  updateCartBadge();
});
