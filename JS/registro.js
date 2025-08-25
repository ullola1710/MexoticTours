// Archivo: registro.js
// Importaciones de validaciones.js
import { validarTexto, validarTelefono, validarEmail, validarPassword, validarConfirmacionPassword, validarPrivacidad, limpiarErrores } from "./validaciones.js";

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById("registerForm");
    const validationNombre = document.getElementById("validationNombre");
    const telefono = document.getElementById("telefono");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPwd = document.getElementById("confirmPassword");
    const privacyCheck = document.getElementById("privacyCheck");
    const privacyLink = document.getElementById("privacyLink");

    // Alertas bootstrap
    const telefonoFeedback = document.getElementById("telefonoFeedback");
    const emailFeedback = document.getElementById("emailFeedback");
    const privacyCheckFeedback = document.getElementById("privacyCheckFeedback");

    // Validaciones
    function validarNombreRegistro() {
        return validarTexto(validationNombre.value.trim(), 3, validationNombre.nextElementSibling, validationNombre, "nombre");
    }

    function validarTelefonoRegistro() {
        return validarTelefono(telefono.value.trim(), telefonoFeedback, telefono);
    }

    function validarEmailRegistro() {
        return validarEmail(email.value.trim(), emailFeedback, email);
    }

    function validarPasswordRegistro() {
        return validarPassword(password.value.trim(), password.nextElementSibling, password);
    }

    function validarConfirmacionPasswordRegistro() {
        return validarConfirmacionPassword(password.value.trim(), confirmPwd.value.trim(), confirmPwd.nextElementSibling, confirmPwd);
    }

    function validarPrivacidadRegistro() {
        return validarPrivacidad(privacyCheck, privacyCheckFeedback);
    }

    function validarFormularioCompleto() {
        const nameOk = validarNombreRegistro();
        const telefonoOk = validarTelefonoRegistro();
        const emailOk = validarEmailRegistro();
        const pwdOk = validarPasswordRegistro();
        const confirmPwdOk = validarConfirmacionPasswordRegistro();
        const privacyOk = validarPrivacidadRegistro();
        return nameOk && telefonoOk && emailOk && pwdOk && confirmPwdOk && privacyOk;
    }

    // Event listeners
    if (validationNombre) validationNombre.addEventListener("blur", validarNombreRegistro);
    if (telefono) telefono.addEventListener("blur", validarTelefonoRegistro);
    if (email) email.addEventListener("blur", validarEmailRegistro);
    if (password) password.addEventListener("blur", validarPasswordRegistro);
    if (confirmPwd) confirmPwd.addEventListener("blur", validarConfirmacionPasswordRegistro);
    if (privacyCheck) privacyCheck.addEventListener("change", validarPrivacidadRegistro);

    // Pop-up para términos y condiciones
    if (privacyLink) {
        privacyLink.addEventListener("click", function (event) {
            event.preventDefault();
            document.body.insertAdjacentHTML("beforeend",
                `<style>
                    .popup-overlay {
                        display: flex;
                        position: fixed;
                        inset: 0;
                        background-color: rgba(0, 0, 0, 0.5);
                        justify-content: center;
                        align-items: center;
                        z-index: 999;
                    }
                    .popup-content {
                        position: absolute;
                        background-color: white;
                        padding: 20px;
                        border-radius: 8px;
                        width: 80%;
                        max-width: 800px;
                        height: 70%;
                    }
                    .close-btn {
                        position: absolute;
                        top: 10px;
                        right: 20px;
                        font-size: 2.5rem;
                        cursor: pointer;
                    }
                    iframe {
                        width: 100%;
                        height: 90%;
                        border: none;
                        flex: 1;
                    }
                </style>
                <div class="popup-overlay" id="popup">
                    <div class="popup-content">
                        <span class="close-btn" id="closePopup">&times;</span>
                        <h2 id="privacidadTitle" style="margin:0; padding:1rem;">Términos y condiciones</h2>
                        <iframe src="./docs/Terminos_y_Condiciones.pdf" frameborder="0"></iframe>
                    </div>
                </div>`
            );

            const popup = document.getElementById("popup");
            const closePopup = document.getElementById("closePopup");

            if (popup) {
                popup.style.display = "flex";
                if (closePopup) {
                    closePopup.onclick = function () {
                        popup.style.display = "none";
                        popup.remove();
                    };
                }
                window.onclick = function (event) {
                    if (event.target === popup) {
                        popup.style.display = "none";
                        popup.remove();
                    }
                };
            }
        });
    }

    // Envío del formulario
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            if (validarFormularioCompleto()) {
                const nombre = validationNombre.value.trim();
                const telefonoValue = telefono.value.trim();
                const correo = email.value.trim();
                const passwordValue = password.value.trim();

                // Verificar si el correo ya está registrado
                let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
                if (usuarios.some(user => user.correo === correo)) {
                    if (email && email.nextElementSibling) {
                        email.classList.add("is-invalid");
                        email.nextElementSibling.textContent = "El correo ya está registrado.";
                    }
                    return;
                }

                // Crear el objeto usuario
                const usuario = { nombre, telefono: telefonoValue, correo, password: passwordValue };

                // Agregar el nuevo usuario
                usuarios.push(usuario);
                localStorage.setItem("usuarios", JSON.stringify(usuarios));

                // Limpiar formulario y errores
                form.reset();
                limpiarErrores([validationNombre, telefono, email, password, confirmPwd, privacyCheck]);
                form.classList.remove("was-validated");

                // Mostrar mensaje de éxito y redirigir
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.textContent = 'Registro exitoso. Serás redirigido al inicio de sesión.';
                form.parentNode.insertBefore(successMessage, form);

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
            } else {
                form.classList.add("was-validated");
            }
        });
    }
});