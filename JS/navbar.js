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
    </style>

    <nav id="navbar-custom" class="navbar navbar-expand-lg navbar-dark rounded-pill fixed-top"
        style="background-color: #09112E; height: 4.3rem; width: auto; margin: 2.5rem 2.5rem 0 2.5rem;">
        <div class="container-fluid">
        <a class="nav-link" href="./index.html">
            <img class="logoRosa" src="./assets/LogoRosa.png" alt="Mexotic Tours" style="width: 3.2rem">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul class="navbar-nav mb-2 mb-lg-0 d-flex gap-3">
            <li class="nav-item"><a class="nav-link active" href="./index.html">Inicio</a></li>
            <li class="nav-item"><a class="nav-link active" href="./aboutUs.html">Nosotras</a></li>
            <li class="nav-item dropdown">
                <a class="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Productos
                </a>
                <ul class="dropdown-menu" style="background-color: #8D94FF;">
                <li><a class="dropdown-item" style="color: white;" href="./products.html">Todo</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" style="color: white;" href="./personalized.html">Personalizado</a></li>
                </ul>
            </li>
            <li class="nav-item"><a class="nav-link active" href="./experiences.html">Experiencias</a></li>
            </ul>
        </div>

        <div class="d-flex gap-2 align-items-center">
            <a class="nav-link" href="#"><i class="bi bi-cart2 fs-2"></i></a>
            <a class="btn btn-login rounded-pill" href="./logIn.html">Log in</a>
            <a class="btn btn-signin rounded-pill" href="./signIn.html">Sign in</a>
        </div>
        </div>
    </nav>   
    `;

  document.getElementById("navbar-container").innerHTML = navbar;

  // Inicializar dropdowns si Bootstrap está cargado
  function initializeDropdowns() {
    if (typeof bootstrap !== "undefined" && bootstrap.Dropdown) {
      document.querySelectorAll('#navbar-custom .dropdown-toggle').forEach(dropdownToggleEl => {
        new bootstrap.Dropdown(dropdownToggleEl);
      });
    } else {
      // Intenta de nuevo en 100ms
      setTimeout(initializeDropdowns, 100);
    }
  }

  initializeDropdowns();

  // if (typeof bootstrap !== "undefined") {
  //   document.querySelectorAll('#navbar-custom .dropdown-toggle').forEach(dropdownToggleEl => {
  //     new bootstrap.Dropdown(dropdownToggleEl);
  //   });
  // }

  // Lógica para ocultar/mostrar navbar al hacer scroll
  const nav = document.getElementById("navbar-custom");
  let lastScrollY = window.pageYOffset;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.pageYOffset;

    if (currentScrollY <= 0) {
      nav.classList.remove("nav--hidden");
      lastScrollY = 0;
      return;
    }

    if (currentScrollY > lastScrollY || !nav.classList.contains("nav--hidden")) {
      nav.classList.add("nav--hidden");
    } else if (currentScrollY < lastScrollY || nav.classList.contains("nav--hidden")) {
      nav.classList.remove("nav--hidden");
    }

    lastScrollY = currentScrollY;
  });
});

