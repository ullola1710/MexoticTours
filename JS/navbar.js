document.addEventListener("DOMContentLoaded", () => {
  const navbar = `
<style>

      #navbar-custom {
          padding-left: 2rem;
          padding-right: 2rem;
          transition: transform 0.8s
      }
      .nav--hidden { transform: translateY(-180%); }
      #navbar-custom .nav-link:hover { color: #FFC2DD; }
      .logoRosa:hover { filter: drop-shadow(4px 4px 3px white); }
      #navbar-custom .dropdown-item:hover,
      #navbar-custom .dropdown-item:active {
          color: #FFC2DD;
          background-color: transparent;
      }
      .bi-cart2 { color: white; transition: color 0.2s; }
      .bi-cart2:hover { color: #FFC2DD; filter: drop-shadow(2px 4px 3px white); }
      .btn-login, .btn-signin {
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 5.5rem; height: 2.8rem;
      }
      .btn-login { background-color: white; color: #09112E; }
      .btn-login:hover { background-color: #FFC2DD; }
      .btn-signin { background-color: #09112E; color: white; }
      .btn-signin:hover { color: #FFC2DD; }
      #submenuProductosMobile ul {background-color: rgba(218, 214, 214, 0.456);border-radius: 0.5rem;margin-top: 0.3rem;padding: 0.3rem 0;transition: all 0.3s ease-in-out;}
      #submenuProductosMobile .nav-link {padding-left: 0.2rem;font-size: 1rem;transition: background-color 0.2s ease-in-out;}
      #submenuProductosMobile .nav-link:hover {background-color: rgb(255, 255, 255);border-radius: 0.4rem;}
      .collapse {transition: height 0.35s ease;}
      @media (max-width: 991.98px) {#navbar-custom .nav-link img.logoRosa {position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);}}
      @media (min-width: 992px) {#navbar-custom .nav-link img.logoRosa {position: static;transform: none;}}
      .navbar-toggler {z-index: 1051;}     
    </style>

    <nav id="navbar-custom" class="navbar navbar-expand-lg navbar-dark rounded-pill fixed-top"
        style="background-color: #09112E; height: 4.3rem; width: auto; margin: 2.5rem 2.5rem 0 2.5rem;">
        <div class="container-fluid">
        <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#menuLateral" aria-controls="menuLateral" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand d-none d-lg-block" href="./index.html">
          <img class="logoRosa" src="./assets/LogoRosa.png" alt="Mexotic Tours" style="width: 3.2rem">
        </a>
        <a class="position-absolute top-50 start-50 translate-middle d-lg-none" href="./index.html">
          <img class="logoRosa" src="./assets/LogoRosa.png" alt="Mexotic Tours" style="width: 3.2rem">
        </a>

        <div class="collapse navbar-collapse justify-content-center d-none d-lg-flex" id="navbarSupportedContent">
            <ul class="navbar-nav mb-2 mb-lg-0 d-flex gap-3">
            <li class="nav-item"><a class="nav-link active" aria-current="page" href="./index.html">Inicio</a></li>
            <li class="nav-item"><a class="nav-link active" href="./aboutUs.html">Nosotras</a></li>
            <li class="nav-item"><a class="nav-link active" href="./contact.html">Contáctanos</a></li>
            <li class="nav-item dropdown d-none d-lg-block">
                <a class="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="true">
                Productos
                </a>
                <ul class="dropdown-menu" style="background-color: #8D94FF;">
                <li><a class="dropdown-item" style="color: white;" href="./products.html">Todo</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" style="color: white;" href="./personalized.html">Personalizado</a></li>
                </ul>
            </li>
            <li class="nav-item"><a class="nav-link active"  aria-disabled="page" href="./experiences.html">Experiencias</a></li>
            </ul>
        </div>

        <div class="d-flex gap-2 align-items-center">
            <!--<a class="nav-link" href="./cart.html"><i class="bi bi-cart2 fs-2"></i></a>-->
            <button class="btn position-relative p-0" data-bs-toggle="offcanvas" data-bs-target="#cartDrawer" aria-controls="cartDrawer"
                    style="background: transparent;">
              <i class="bi bi-cart2 fs-1"></i>
              <span id="cartBadge" class="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                    style="background:#8D94FF; display: none;">0</span>
            </button>
            <a class="btn btn-login rounded-pill d-none d-lg-inline-block" href="./logIn.html">Inicia Sesión</a>
            <a class="btn btn-signin rounded-pill d-none d-lg-inline-block" href="./registro.html">Regístrate</a>
        </div>
        </div>
    </nav>   
    <div class="offcanvas offcanvas-start" tabindex="-1" id="menuLateral" aria-labelledby="menuLateralLabel"style="width: 100vw; max-width: 100vw; height: 100vh;">
      <div class="offcanvas-header d-flex justify-content-start align-items-center" style="background-color: #ffffff;">
        <button type="button" class="btn-close p-2" style="background-color: #6c757d; filter: invert(1); border-radius: 0.2rem; margin-left: 0.5rem;" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body d-flex justify-content-center align-items-center flex-column text-center"style="background-color: #ffffff; color: rgb(0, 0, 0);">
        <ul class="navbar-nav gap-3 w-100">
            <li class="nav-item"><a class="nav-link nav-link text-dark text-center" href="./index.html">Inicio</a></li>
            <li class="nav-item"><a class="nav-link nav-link text-dark text-center" href="./aboutUs.html">Nosotras</a></li>
            <li class="nav-item"><a class="nav-link nav-link text-dark text-center" href="./contact.html">Contáctanos</a></li>
            <li class="nav-item d-lg-none"><a class="nav-link text-dark text-center d-flex justify-content-center align-items-center" data-bs-toggle="collapse" href="#submenuProductosMobile" role="button"
                      aria-expanded="false" aria-controls="submenuProductosMobile" id="toggleProductosMobile">
                      Productos<i class="bi bi-chevron-right ms-2 rotate-icon" id="arrowIcon"></i></a>
            <div class="collapse w-90" id="submenuProductosMobile">
              <ul class="navbar-nav w-90"><li class="nav-item w-90"><a class="nav-link text-dark text-center" href="./products.html">Todo</a></li>
                <li><hr class="dropdown-divider"></li>
                <li class="nav-item w-90"><a class="nav-link text-dark text-center" href="./personalized.html">Personalizado</a></li>
              </ul>
            </div>
            </li>
              <li class="nav-item">
                <a class="nav-link text-dark text-center" href="./experiences.html">Experiencias</a>
                <a  class="nav-link text-dark text-center" href="./logIn.html">Inicia sesión</a>
                <a class="nav-link text-dark text-center" href="./registro.html">Regístrate</a>
              </li>
          </ul>
        </div>
    </div>
    <!--Carrito-->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="cartDrawer" aria-labelledby="cartDrawerLabel">
      <div class="offcanvas-header" style="background-color: #8D94FF; color: white;">
        <h5 class="offcanvas-title" id="cartDrawerLabel">Carrito de Compras</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div id="cartItemsContainer">
          <div class="empty-cart-message">
            <i class="bi bi-cart-x" style="font-size: 3rem;"></i>
            <p>Tu carrito está vacío</p>
          </div>
        </div>
        <div class="cart-total text-end mt-3" id="cartTotal" style="display: none;">
          Total: $<span id="totalAmount">0.00</span>
        </div>
        <div class="d-grid gap-2 mt-3" id="checkoutButton" style="display: none;">
          <button class="btn btn-primary" style="background-color: #8D94FF; border: none;">Finalizar Compra</button>
        </div>
      </div>
    </div>
    `;

  document.getElementById("navbar-container").innerHTML = navbar;

  // Inicializar dropdowns si Bootstrap está cargado
  function dropdowns() {
    if (typeof bootstrap !== "undefined" && bootstrap.Dropdown) {
      document.querySelectorAll('#navbar-custom .dropdown-toggle').forEach(dropdownToggleEl => {
        new bootstrap.Dropdown(dropdownToggleEl);
      });
    } else {
      // Intenta de nuevo en 100ms
      setTimeout(dropdowns, 100);
    }
  }

  dropdowns();

  // if (typeof bootstrap !== "undefined") {
  //   document.querySelectorAll('#navbar-custom .dropdown-toggle').forEach(dropdownToggleEl => {
  //     new bootstrap.Dropdown(dropdownToggleEl);
  //   });
  // }

  // Script para el icono de productos
  const collapseElement = document.getElementById('submenuProductosMobile');
  const arrowIcon = document.getElementById('arrowIcon');

  if (collapseElement && arrowIcon) {
    collapseElement.addEventListener('show.bs.collapse', () => {
      arrowIcon.classList.remove('bi-chevron-right');
      arrowIcon.classList.add('bi-chevron-down');
    });

    collapseElement.addEventListener('hide.bs.collapse', () => {
      arrowIcon.classList.remove('bi-chevron-down');
      arrowIcon.classList.add('bi-chevron-right');
    });
  }

  // Lógica para ocultar/mostrar navbar al hacer scroll
  const nav = document.getElementById("navbar-custom");
  if (nav) {
    let scroll = window.pageYOffset;

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        nav.classList.remove("nav--hidden");
        scroll = 0;
        return;
      }

      if (currentScroll > scroll || !nav.classList.contains("nav--hidden")) {
        nav.classList.add("nav--hidden");
      } else if (currentScroll < scroll || nav.classList.contains("nav--hidden")) {
        nav.classList.remove("nav--hidden");
      }

      scroll = currentScroll;
    });
  }

  // Al abrir el carrito
  const cartDrawer = document.getElementById('cartDrawer');
  if (cartDrawer) {
    cartDrawer.addEventListener('show.bs.offcanvas', function () {
      renderCartItems();
    });
  }

  // Actualizar carrito 
  updateCartBadge();
});

