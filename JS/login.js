// Validaciones - Modulo
import { validarEmail, validarPassword, limpiarErrores } from "./validaciones.js";

// Variables
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById("form");
    const email = document.getElementById("mt-email");
    const password = document.getElementById("mt-password");

    // Alertas bootstrap
    const emailFeedback = document.getElementById("emailFeedback");
    const passwordFeedback = document.getElementById("passwordFeedback");

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


    // Envío de todos los datos - Forms completo
    form.addEventListener("submit", function (event) {
        if (!validarFormularioCompleto()) {
            event.preventDefault();
            alert("El correo electrónico y/o contraseña son incorrectos. Por favor, intentalo de nuevo.");
            return;
        }

        // localStorage

        const usuarioValido = usuarios.some(usuario => usuario.correo === correo && usuario.password === pass);
        if(usuarioValido){
            alert ("Bienevido");
            form.reset();
            limpiarErrores([
                email, 
                password,
            ]);

            // Redigirir al home?
            window.location.href = "./index.html";
        } else {
            alert("El correo electrónico y/o contraseña son incorrectos. Por favor, intentalo de nuevo.");
        } // if -> usuario encontrado y real
            
    });// submit 

<<<<<<< HEAD
=======
<<<<<<< HEAD
}); 
=======
>>>>>>> backup-MTH
}); 



// Miriam_Marian//
// Espera a que el DOM (Document Object Model) esté completamente cargado antes de ejecutar el código.
document.addEventListener("DOMContentLoaded", function () {
    // 1. Referencias a los elementos del DOM.
    // Se obtienen los elementos del formulario de login por su ID.
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("mt-email");
    const passwordInput = document.getElementById("mt-password");
    // Se corrigió el ID aquí: de "logingError" a "loginError"
    const loginError = document.getElementById("loginError");
    const welcomeMessageElement = document.getElementById("welcomeMessage");
    const logoutLink = document.getElementById("logout-link");
    const loginLink = document.getElementById("login-link");
    const registerLink = document.getElementById("register-link");

    // 2. Función para mostrar mensajes de error.
    // Esta función recibe un mensaje y lo muestra en el elemento 'loginError'.
    function showError(message) {
        if (loginError) {
            loginError.textContent = message; // Establece el texto del mensaje de error.
            loginError.style.display = "block"; // Hace visible el contenedor del error.
        }
    }

    // 3. Evento de escucha para el envío del formulario.
    // Se añade un 'listener' al formulario para el evento 'submit' (cuando el usuario presiona el botón).
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            // Previene el comportamiento por defecto del formulario (evita que la página se recargue).
            event.preventDefault();
            
            // Oculta el mensaje de error anterior para que no se muestren múltiples errores.
            if (loginError) {
                loginError.style.display = "none";
            }

            // Obtiene los valores de los campos de correo y contraseña.
            const email = emailInput.value;
            const password = passwordInput.value;

            // 4. Recupera la lista de usuarios.
            // Se obtiene el array de usuarios del localStorage. Si no existe, se usa un array vacío.
            const users = JSON.parse(localStorage.getItem("usuarios")) || [];

            // 5. Busca al usuario.
            // Se utiliza el método 'find' para buscar un usuario en el array que coincida con el correo y la contraseña ingresados.
            // Se corrigió la propiedad de búsqueda a 'correo' para que coincida con lo que se guarda en registro.js
            const userFound = users.find(user => user.correo === email && user.password === password);

            // 6. Lógica de validación de credenciales.
            if (userFound) {
                // Si el usuario es encontrado (credenciales correctas):
                
                // a. Guarda el estado de la sesión en el localStorage.
                // Se crea un objeto y se guarda en localStorage para saber que hay una sesión iniciada.
                localStorage.setItem("sesionIniciada", JSON.stringify({
                    isLoggedIn: true,
                    correo: userFound.correo,
                    nombre: userFound.nombre // Guarda también el nombre del usuario
                }));
                
                // b. Muestra una alerta de éxito y redirige a la página principal.
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.textContent = '¡Inicio de sesión exitoso! Serás redirigido a la página de inicio.';
                loginForm.parentNode.insertBefore(successMessage, loginForm);

                setTimeout(() => {
                    window.location.href = "index.html"; // Redirige al usuario a 'home.html'.
                }, 2000);
            } else {
                // Si el usuario no es encontrado (credenciales incorrectas):
                
                // Muestra el mensaje de error correspondiente.
                showError("Correo o contraseña incorrectos. Por favor, intente de nuevo.");
                emailInput.value = ''; // Limpia el campo de correo para mayor seguridad y usabilidad.
                passwordInput.value = ''; // Limpia el campo de contraseña.
            }
        });
    }
    
    // 7. Función para el cierre de sesión.
    function logoutUser() {
        // Eliminar el item de la sesión de localStorage
        localStorage.removeItem("sesionIniciada");
        // Redirigir al usuario a la página de inicio (o de login)
        window.location.href = "index.html";
    }

    // 8. Event listener para el botón de cierre de sesión.
    if (logoutLink) {
        logoutLink.addEventListener("click", function(event) {
            event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
            logoutUser(); // Llamar a la función de cierre de sesión
        });
    }

    // 9. Mostrar el nombre de usuario si la sesión está activa
    // Este código se ejecutará al cargar la página para verificar si hay una sesión activa
    function showUserNameOnPage() {
        const sesionData = JSON.parse(localStorage.getItem("sesionIniciada"));

        // Ocultar todos los enlaces de navegación por defecto
        if (loginLink) loginLink.style.display = 'none';
        if (registerLink) registerLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'none';

        if (sesionData && sesionData.isLoggedIn) {
            if (welcomeMessageElement) {
                welcomeMessageElement.textContent = `¡Hola, ${sesionData.nombre}!`;
            }
            if (logoutLink) logoutLink.style.display = 'block';
        } else {
             if (welcomeMessageElement) {
                welcomeMessageElement.textContent = ``;
            }
            if (loginLink) loginLink.style.display = 'block';
            if (registerLink) registerLink.style.display = 'block';
        }
    }
    
    // Ejecutar la función para mostrar el nombre del usuario al cargar la página
    showUserNameOnPage();
});
<<<<<<< HEAD
=======
>>>>>>> cf0256e (Implementar autenticación verificando usuarios pre almacenados en el local storage.)
>>>>>>> backup-MTH
