// Definir carrito
import { normalizadorTour } from "./normalizador.js";

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
      quantity: 1,
      img: product.img,
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
      <div class="empty-cart-message text-center">
        <i class="bi bi-cart-x" style="font-size: 3rem;"></i>
        <p>Tu carrito está vacío</p>
      </div>`;
    if (totalElement){ 
      //totalElement.style.display = 'none';
      totalElement.querySelector('#totalAmount').textContent = '0.00';
    }
    if (checkoutButton) checkoutButton.style.display = 'none';
  } else {
    let html = '';
    let total = 0;
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      html += `
        <div class="cart-item mb-4">
          <div class="d-flex justify-content-between align-items-center">
            <div style="position: relative; display: inline-block;">
              <div style="height: 100px; width: 100px; border-radius: 20px; overflow: hidden;">
              <img style="height: 100%; width: 100%; object-fit: cover;" src="${item.img}" alt="${item.name}" />
            </div>
              <button class="btn btn-sm" onclick="removeFromCart(${item.id})" style="position: absolute; bottom: 5px; left: 5px; border-radius: 2rem; background-color: white;">
                <i class="bi bi-trash" style="color: red;"></i>
              </button>
            </div>
            <div style="width: 12rem; padding: 0 20px 0 20px; gap: 20px;">
              <h5>${item.name}</h5>
              <div>
                <p class="mb-0">Total: $${itemTotal.toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</p>
                <p class="mb-0" style="font-size: 12px;">$${item.price.toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} c/u</p>
              </div>
            </div>
            <div class="quantity-controls" style="display: flex; align-items: center; gap: 0px;">
              <button class="btn btn-sm btn-outline-secondary quantity-btn" style="border-radius: 1rem; width: 25px; height: 25px; border-color: red; color: red; display: flex; justify-content: center; align-items: center;" onclick="updateQuantity(${item.id}, -1)">-</button>
              <span class="mx-1 px-2 py-1" style="background-color: #8D94FF; color: white; border-radius: 5px;">${item.quantity}</span>
              <button class="btn btn-sm btn-outline-secondary quantity-btn" style="border-radius: 1rem; width: 25px; height: 25px; border-color: red; color: red; display: flex; justify-content: center; align-items: center;" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
          </div>
        </div>`;
    });
    container.innerHTML = html;
    if (totalElement) {
      totalElement.style.display = 'block';
      totalElement.querySelector('#totalAmount').textContent = total.toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    }
    if (checkoutButton) checkoutButton.style.display = 'block';
  }
}

// Inicializar carrito
document.addEventListener('DOMContentLoaded', function() {
  updateCartBadge();
});
