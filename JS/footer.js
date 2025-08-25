document.addEventListener("DOMContentLoaded", () => {
  const footer = `
<div class="footer-card" style="background-color: #09112E;">
        <div class="card-body">
            <div class="container text-center">
                <div class="row">
                    <div class="col-lg-2 col-sm-12">
                        <ol style="list-style: none; float: left;">
                           <a href="./index.html"><li><img src="./assets/LogoFooter.png" alt="Logo" style="width: 10rem;"></li></a>
                            <li><i class="bi bi-twitter-x fs-4" style="color: #FFC2DD; margin: 0.3rem;"></i> <i class="bi bi-instagram fs-4"
                                    style="color: #FFC2DD; margin: 0.3rem;"></i> <i class="bi bi-youtube fs-4" style="color: #FFC2DD; margin: 0.3rem;"></i>
                                <i class="bi bi-linkedin fs-4" style="color: #FFC2DD; margin: 0.3rem;"></i></li>
                        </ol>
                    </div>
                    <div class="col-lg-2 col-sm-12">
                        <ol style="list-style: none; padding-top: 3rem;">
                            <li style="color: #FFFFFF; text-align: left; font-size: 1.3rem; font-family: Bebas Neue, sans-serif;"><strong>EXPLORA</strong></li>
                           <a href="./index.html" style="text-decoration: none;"><li style="color: #5A64FF; text-align: left; font-size: 0.9rem; margin-top: 1rem; font-family: Be Vietnam Pro, sans-serif;">Inicio</li></a>
                           <a href="./aboutUs.html" style="text-decoration: none;"><li style="color: #5A64FF; text-align: left; font-size: 0.9rem; margin-top: 0.3rem; font-family: Be Vietnam Pro, sans-serif;">Nosotras</li></a>
                           <a href="./products.html" style="text-decoration: none;"><li style="color: #5A64FF; text-align: left; font-size: 0.9rem; margin-top: 0.3rem; font-family: Be Vietnam Pro, sans-serif;">Productos</li></a>
                          <a href="./signIn.html" style="text-decoration: none;"><li style="color: #5A64FF; text-align: left; font-size: 0.9rem; margin-top: 0.3rem; font-family: Be Vietnam Pro, sans-serif;">Inicio de sesión</li></a>
                           <a href="./experiences.html" style="text-decoration: none;"><li style="color: #5A64FF; text-align: left; font-size: 0.9rem; margin-top: 0.3rem; font-family: Be Vietnam Pro, sans-serif;">Experiencias</li></a> 
                        </ol>
                    </div>
                    <div class="col-lg-3 col-sm-12">
                        <ol style="list-style: none; padding-top: 3rem;">
                            <li style="color: #FFFFFF; text-align: left;font-size:1.3rem; font-family: Bebas Neue, sans-serif;"><strong>ATENCIÓN AL CLIENTE Y CONTACTO</strong></li>
                            <li style="color: #FFFFFF; margin-top:1.5rem; text-align:left; font-size: 0.9rem; font-family: Be Vietnam Pro, sans-serif;">mexotictours@gmail.com</li>
                            <li style="color: #FFFFFF;margin-top:1.5rem; text-align:left; font-size: 0.9rem; font-family: Be Vietnam Pro, sans-serif;">+52 (55) 1234 5678</li>
                        </ol>

                    </div>
                    <div class="col-lg-5 col-sm-12">
                        <ol style="list-style: none; padding-top: 3rem;">
                            <li style="color:#FF8FC1; font-size:1.6rem;text-align: left; font-family: Bebas Neue, sans-serif;"><strong>¡SUSCRÍBETE Y RECIBE OFERTAS EXCLUSIVAS! </strong> </li>
                            <li>
                                <form class="row" id="footerForm" style="margin-top: 2rem;">
                                    <div class="col-auto">
                                        <label for="inputPassword2" class="visually-hidden">correo</label>
                                        <input type="email" class="form-control" id="footerEmail"
                                            placeholder="correo@ejemplo.com">
                                    </div>
                                    <div class="col-auto">
                                        <button type="submit" class="btn btn-primary mb-3">Enviar</button>
                                    </div>
                                </form>
                            </li>
                        </ol>
                    </div>
                </div>
                <p class="card-text" style="color:#FFFFFF; margin-top: 2rem; font-size: 0.9rem; font-family: Be Vietnam Pro, sans-serif;"> ©2025 Mexotic Tours. Todos los derechos reservados.</p>
            </div>
        </div>
    </div>
  `;
  document.getElementById("footer-container").innerHTML = footer;
  document.body.classList.add("footer");
});


document.addEventListener("DOMContentLoaded", () => {
    console.log("emailjs en window:", window.emailjs);
    
    const footerForm = document.getElementById("footerForm");
    const footerEmail = document.getElementById("footerEmail");

    footerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = footerEmail.value.trim();

        if (email === "") {
        alert("⚠️ Por favor ingresa un correo válido.");
        return;
        }

        // Creamos un objeto con la data que espera tu template en EmailJS
        const templateParams = {
        email: email, // El email que escribió el usuario en el footer
        time: new Date().toLocaleString()
        };

        // Enviar con EmailJS
        emailjs.send("service_pi5sznp", "template_7qr2tqv", templateParams)
        .then(
            function (response) {
            console.log("✅ Correo enviado con éxito", response.status, response.text);
            alert("Te has suscrito correctamente 🎉");
            footerForm.reset();
            },
            function (error) {
            console.error("❌ Error al enviar el correo", error);
            alert("Hubo un error, intenta más tarde.");
            }
        );
    });
});

