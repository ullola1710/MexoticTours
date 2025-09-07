// Validaciones - Modulo
import { validarEmail, validarPassword, limpiarErrores } from "./validaciones.js";

// Variables
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById("loginForm");
    const email = document.getElementById("mt-email");
    const password = document.getElementById("mt-password");
    const resetPassword = document.getElementById("resetPassword");
    const loginError = document.getElementById("loginError");
    // const loginLink = document.getElementById("loginLink");
    // const registerLink = document.getElementById("registerLink");
    // const logoutLink = document.getElementById("logoutLink");
    const welcomeMessageElement = document.getElementById("welcomeMessage");


    // Alertas bootstrap
    const emailFeedback = document.getElementById("emailFeedback");
    const passwordFeedback = document.getElementById("passwordFeedback");

    // Email 
    if (window.emailjs) {
        emailjs.init("GNnB5jB5JcNSpPcEb");
    }

    // Función para mostrar mensajes de error
    function showError(message) {
        if (!loginError) return;
        loginError.textContent = message;
        loginError.style.display = "block";
    }
    function hideError() {
        if (!loginError) return;
        loginError.style.display = "none";
        loginError.textContent = "";
    }

    function validarEmailRegistro() {
        return validarEmail(email.value.trim(), emailFeedback, email);
    } // validarEmailRegistro

    function validarPasswordRegistro() {
        return validarPassword(password.value.trim(), passwordFeedback, password);
    } // validarPasswordRegistro

    // Orejas
    email.addEventListener("blur", validarEmailRegistro);
    password.addEventListener("blur", validarPasswordRegistro);


    // Esto puede cambiar -------------------------
    // Validaciones propias del registro
    function validarFormularioCompleto() {
        const emailOk = validarEmailRegistro();
        const pwdOk = validarPasswordRegistro();

        return emailOk && pwdOk;
    } // validarFormularioCompleto 
    // Esto puede cambiar -------------------------


    // Generar OTP/token para enlace de recuperación
    function generarToken() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    } // generarToken

    // Guardar OTP/token
    function guardarToken(email, token) {
        const tokens = JSON.parse(localStorage.getItem("tokenRecuperacion") || `{}`);
        tokens[email] = {
            token: token,
            expiracion: Date.now() + 86_400_000 // 24 hrs de expiración
        };
        localStorage.setItem("tokenRecuperacion", JSON.stringify(tokens));
    } // guardarToken

    // Regresar valor de usuario-email
    // return email.split('@')[0]; 
    function obtenerUsuario(email) {
        const users = JSON.parse(localStorage.getItem("usuarios") || "[]");
        const user = users.find(user => user.correo === email);
        return user ? user.nombre : email;
    } // obtenerUsuario

    // EmailJS - Recuperar contraseña
    function recuperarContraseña(email) {
        const token = generarToken();
        guardarToken(email, token);

        // const enlace = `${window.location.origin}/reset_password.html?token=${token}?email=${encodeURIComponent(email)}`;
        const url = new URL("./reset_password.html", window.location.href);
        url.searchParams.set('token', token);
        url.searchParams.set('email', email);
        const enlace = url.toString();

        // template 2 de EmailJS
        const templateParams = {
            to_email: email,
            from_name: obtenerUsuario(email),
            enlace: enlace,
        };

        if (!window.emailjs) {
            console.error("EmailJS no está cargado.");
            // alert("Hubo un error enviando el correo. Intenta más tarde.");
            Swal.fire({ //SweetAlert
                icon: "error",
                title: "Error al enviar",
                text: "❌ Hubo un error enviando el correo. Intenta más tarde.",
                confirmButtonColor: "#8D94FF"
            });
            return;
        }

        // Envio de email
        emailjs.send("service_pi5sznp", "template_7qr2tqv", templateParams)
            .then(() => {
                // alert("Se ha enviado un correo con instrucciones para restablecer tu contraseña.");
                Swal.fire({ //SweetAlert
                    icon: "success",
                    title: "Solicitud enviada",
                    text: "✅ Se ha enviado un correo con instrucciones para restablecer tu contraseña.",
                    confirmButtonColor: "#8D94FF"
                });
            })
            .catch((error) => {
                console.error("❌ Error al enviar el correo", error);
                // alert("Hubo un error, intenta más tarde.");
                Swal.fire({ //SweetAlert
                    icon: "error",
                    title: "Error al enviar",
                    text: "❌ Hubo un error, intenta más tarde.",
                    confirmButtonColor: "#8D94FF"
                });
            });
    } // recuperarContraseña

    // Si el usuario olvida su contraseña:
    if (resetPassword) {
        resetPassword.addEventListener("click", (event) => {
            event.preventDefault();

            const emailOk = validarEmailRegistro();
            if (!emailOk) {
                // alert("El correo electrónico y/o contraseña son incorrectos. Por favor, intentalo de nuevo.");
                Swal.fire({ //SweetAlert
                    icon: "error",
                    title: "Error al enviar",
                    text: "El correo electrónico y/o contraseña son incorrectos. Por favor, intentalo de nuevo.",
                    confirmButtonColor: "#8D94FF"
                });
                return;
            }
            const userEmail = email.value.trim();
            recuperarContraseña(userEmail);

        });
    } // if(resetPassword)

    // Event listener para envío del formulario de login
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        hideError();

        if (!validarFormularioCompleto()) {
            showError("Por favor, corrige los errores en el formulario.");
            return;
        }

        const userEmail = email.value.trim();
        const userPassword = password.value.trim();

        // Obtener usuarios del localStorage
        const users = JSON.parse(localStorage.getItem("usuarios") || "[]");

        // Buscar usuario
        const userFound = users.find(user => user.correo === userEmail && user.password === userPassword);

        if (userFound) {
            // Guardar sesión
            localStorage.setItem("sesionIniciada", JSON.stringify({
                isLoggedIn: true,
                correo: userFound.correo,
                nombre: userFound.nombre
            }));

            // Mostrar mensaje de éxito
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.textContent = '¡Inicio de sesión exitoso! Serás redirigido a la página de inicio.';
            form.parentNode.insertBefore(successMessage, form);

            // Limpiar formulario
            form.reset();
            limpiarErrores([email, password]);

            // Redirigir después de 2 segundos
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        } else {
            showError("Correo o contraseña incorrectos. Por favor, intente de nuevo.");
            email.value = '';
            password.value = '';
        }
    });

    // Función para cerrar sesión
    function logoutUser() {
        localStorage.removeItem("sesionIniciada");
        window.location.href = "index.html";
    }

    // Event listener para cerrar sesión
    if (logoutLink) {
        logoutLink.addEventListener("click", function (event) {
            event.preventDefault();
            logoutUser();
        });
    }

    // Mostrar nombre de usuario si la sesión está activa
    function showUserNameOnPage() {
        const sesionData = JSON.parse(localStorage.getItem("sesionIniciada"));

        // Ocultar/mostrar enlaces de navegación
        if (loginLink) loginLink.style.display = sesionData && sesionData.isLoggedIn ? 'none' : 'block';
        if (registerLink) registerLink.style.display = sesionData && sesionData.isLoggedIn ? 'none' : 'block';
        if (logoutLink) logoutLink.style.display = sesionData && sesionData.isLoggedIn ? 'block' : 'none';

        // if (sesionData && sesionData.isLoggedIn && welcomeMessageElement) {
        //     welcomeMessageElement.textContent = `¡Hola, ${sesionData.nombre}!`;
        // } else if (welcomeMessageElement) {
        //     welcomeMessageElement.textContent = ``;
        // }
        if (welcomeMessageElement) {
            welcomeMessageElement.textContent = sesionData?.isLoggedIn
                ? `¡Hola, ${sesionData.nombre}!`
                : "";
        }
    }


    // Ejecutar la función al cargar la página
    showUserNameOnPage();

}); 