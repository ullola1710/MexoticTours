// Archivo: registro.js
// Lógica para el formulario de registro.
import {
    validarTexto,
    validarTelefono,
    validarEmail,
    validarPassword,
    validarConfirmacionPassword,
    validarPrivacidad,
    limpiarErrores
} from "./validaciones.js";

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById("registroForm");
    const validationNombre = document.getElementById("validationNombre");
    const telefono = document.getElementById("validationTelefono");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPwd = document.getElementById("confirmPassword");
    const privacyCheck = document.getElementById("privacyCheck");
    const privacyLink = document.getElementById("privacyLink");
    const statusMessage = document.getElementById("statusMessage");

    // Event listeners para las validaciones en tiempo real
    if (validationNombre) validationNombre.addEventListener("blur", () => validarTexto(validationNombre.value.trim(), 3, document.getElementById("nombreFeedback"), validationNombre, "nombre"));
    if (telefono) telefono.addEventListener("blur", () => validarTelefono(telefono.value.trim(), document.getElementById("telefonoFeedback"), telefono));
    if (email) email.addEventListener("blur", () => validarEmail(email.value.trim(), document.getElementById("emailFeedback"), email));
    if (password) password.addEventListener("blur", () => validarPassword(password.value.trim(), document.getElementById("passwordFeedback"), password));
    if (confirmPwd) confirmPwd.addEventListener("blur", () => validarConfirmacionPassword(password.value.trim(), confirmPwd.value.trim(), document.getElementById("confirmPasswordFeedback"), confirmPwd));
    if (privacyCheck) privacyCheck.addEventListener("change", () => validarPrivacidad(privacyCheck, document.getElementById("privacyCheckFeedback")));
    
    // Lógica para el pop-up de términos y condiciones
    if (privacyLink) {
        privacyLink.addEventListener("click", function (event) {
            event.preventDefault();
            
            // Revisa si el pop-up ya existe para evitar duplicados
            if (!document.getElementById("popup")) {
                document.body.insertAdjacentHTML("beforeend", `
                    <div class="popup-overlay" id="popup">
                        <div class="popup-content">
                            <span class="close-btn" id="closePopup">&times;</span>
                            <h2 style="margin:0; padding:1rem;">Términos y condiciones</h2>
                            <iframe src="https://example.com/terminos-y-condiciones.pdf" frameborder="0"></iframe>
                        </div>
                    </div>`);
            }
            
            const popup = document.getElementById("popup");
            const closePopup = document.getElementById("closePopup");

            if (popup) {
                popup.style.display = "flex";
                if (closePopup) {
                    closePopup.onclick = function () {
                        popup.remove();
                    };
                }
                window.onclick = function (event) {
                    if (event.target === popup) {
                        popup.remove();
                    }
                };
            }
        });
    }

    // Lógica para validar el formulario completo al enviarlo
    function validarFormularioCompleto() {
        const nameOk = validarTexto(validationNombre.value.trim(), 3, document.getElementById("nombreFeedback"), validationNombre, "nombre");
        const telefonoOk = validarTelefono(telefono.value.trim(), document.getElementById("telefonoFeedback"), telefono);
        const emailOk = validarEmail(email.value.trim(), document.getElementById("emailFeedback"), email);
        const pwdOk = validarPassword(password.value.trim(), document.getElementById("passwordFeedback"), password);
        const confirmPwdOk = validarConfirmacionPassword(password.value.trim(), confirmPwd.value.trim(), document.getElementById("confirmPasswordFeedback"), confirmPwd);
        const privacyOk = validarPrivacidad(privacyCheck, document.getElementById("privacyCheckFeedback"));
        return nameOk && telefonoOk && emailOk && pwdOk && confirmPwdOk && privacyOk;
    }

    // Envío del formulario
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            
            // Ocultar mensajes de estado anteriores
            statusMessage.style.display = 'none';
            statusMessage.textContent = '';
            
            if (validarFormularioCompleto()) {
                const usuario = {
                    nombre: validationNombre.value.trim(),
                    telefono: telefono.value.trim(),
                    correo: email.value.trim(),
                    password: password.value.trim(),
                };
                
                let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
                
                // Verificar si el correo ya está registrado
                if (usuarios.some(user => user.correo === usuario.correo)) {
                    statusMessage.textContent = "El correo ya está registrado.";
                    statusMessage.style.color = '#dc3545';
                    statusMessage.style.display = 'block';
                    document.getElementById("emailFeedback").textContent = "El correo ya está registrado.";
                    email.classList.add('is-invalid');
                    email.classList.remove('is-valid');
                    return;
                }
                
                usuarios.push(usuario);
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                
                statusMessage.textContent = "¡Registro exitoso! Redirigiendo a la página de inicio de sesión...";
                statusMessage.style.color = '#198754';
                statusMessage.style.display = 'block';
                
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
                
                limpiarErrores([validationNombre, telefono, email, password, confirmPwd, privacyCheck]);
            } else {
                statusMessage.textContent = "Hay errores en el formulario. Por favor, revisa los campos.";
                statusMessage.style.color = '#dc3545';
                statusMessage.style.display = 'block';
            }
        });
    }
});
