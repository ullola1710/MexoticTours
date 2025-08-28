// Validaciones - Modulo
import { validarTexto, validarTelefono, validarEmail, validarPassword, validarConfirmacionPassword, validarPrivacidad, limpiarErrores } from "./validaciones.js";

// Variables
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById("form");
  const validationNombre = document.getElementById("validationNombre");
  const validationTelefono = document.getElementById("validationTelefono");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPwd = document.getElementById("confirmPassword");
  const privacyCheck = document.getElementById("privacyCheck");
  const privacyLink = document.getElementById("privacyLink");
  const statusMessage = document.getElementById("statusMessage");


  // Alertas bootstrap
  const nombreFeedback = document.getElementById("nombreFeedback");
  const telefonoFeedback = document.getElementById("telefonoFeedback");
  const emailFeedback = document.getElementById("emailFeedback");
  const passwordFeedback = document.getElementById("passwordFeedback");
  const confirmPasswordFeedback = document.getElementById("confirmPasswordFeedback");
  const privacyCheckFeedback = document.getElementById("privacyCheckFeedback");

  // Los campos deben existir antes de continuar
  const elements = [form, validationNombre, validationTelefono, email, password, confirmPwd, privacyCheck, privacyLink];
  const allElementsExist = elements.every(element => {
    if (!element) {
      console.error("Elemento no encontrado:", element);
      return false;
    }
    return true;
  });

  if (!allElementsExist) {
    console.error("Uno o más elementos del formulario no se encontraron en el DOM");
    return;
  }


  // Se ocuparan las validaciones importadas de validaciones.js - Especificando sus características de c/u
  function validarNombreRegistro() {
    return validarTexto(validationNombre.value.trim(), 3, nombreFeedback, validationNombre, "nombre");
  } // valirNombreRegistro

  function validarTelefonoRegistro() {
    return validarTelefono(validationTelefono.value.trim(), telefonoFeedback, validationTelefono);
  } // validarTelefonoRegistro

  function validarEmailRegistro() {
    return validarEmail(email.value.trim(), emailFeedback, email);
  } // validarEmailRegistro

  function validarPasswordRegistro() {
    return validarPassword(password.value.trim(), passwordFeedback, password);
  } // validarPasswordRegistro

  function validarConfirmacionPasswordRegistro() {
    return validarConfirmacionPassword(password.value.trim(), confirmPwd.value.trim(), confirmPasswordFeedback, confirmPwd);
  } // validarConfirmacionPasswordRegistro

  function validarPrivacidadRegistro() {
    return validarPrivacidad(privacyCheck, privacyCheckFeedback);
  } // validarPrivacidadRegistro


  // Validaciones propias del registro
  function validarFormularioCompleto() {
    const nameOk = validarNombreRegistro();
    const telefonoOk = validarTelefonoRegistro();
    const emailOk = validarEmailRegistro();
    const pwdOk = validarPasswordRegistro();
    const confirmPwdOk = validarConfirmacionPasswordRegistro();
    const privacyOk = validarPrivacidadRegistro();

    return nameOk && telefonoOk && emailOk && pwdOk && confirmPwdOk && privacyOk;
  } // validarFormularioCompleto // validarFormularioCompleto


  // Orejas
  validationNombre.addEventListener("blur", validarNombreRegistro);
  validationTelefono.addEventListener("blur", validarTelefonoRegistro);
  email.addEventListener("blur", validarEmailRegistro);
  password.addEventListener("blur", validarPasswordRegistro);
  confirmPwd.addEventListener("blur", validarConfirmacionPasswordRegistro);
  privacyCheck.addEventListener("change", validarPrivacidadRegistro);

  // Pop-up
  privacyLink.addEventListener("click", function (event) {
    event.preventDefault();

    // Si pop-up ya existe evitar duplicados
    if (!document.getElementById("popup")) {
      document.body.insertAdjacentHTML("beforeend", `
                <style>
                    /* Fondo */
                    .popup-overlay {
                        display: flex;
                        position: fixed;
                        inset: 0;
                        background-color: rgba(0, 0, 0, 0.5);
                        justify-content: center;
                        align-items: center;
                        z-index: 999;
                    }

                    /* Contenido */
                    .popup-content {
                        position: absolute;
                        background-color: white;
                        padding: 20px;
                        border-radius: 8px;
                        width: 80%;
                        max-width: 800px;
                        height: 70%;
                    }

                    /* Cerrar el popup */
                    .close-btn {
                        position: absolute;
                        top: 10px;
                        right: 20px;
                        font-size: 2.5rem;
                        cursor: pointer;
                    }

                    /* Estilos para el iframe */
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
                        <iframe src="./docs/Términos_y_Condiciones.pdf" frameborder="0"></iframe>
                    </div>
                </div>`
      );
    }

    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("closePopup");

    popup.style.display = "flex";

    closePopup.onclick = function () {
      popup.style.display = "none";
      popup.remove();
    }

    // Cerrar popup al hacer clic fuera
    window.onclick = function (event) {
      if (event.target === popup) {
        popup.style.display = "none";
        popup.remove();
      }
    }
  });

  // Envío de todos los datos - Forms completo
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Ocultar mensajes de estado anteriores
    if (statusMessage) {
      statusMessage.style.display = 'none';
      statusMessage.textContent = '';
    }

    if (validarFormularioCompleto()) {
      // Crear el objeto JSON 
      const usuario = {
        nombre: validationNombre.value.trim(),
        telefono: validationTelefono.value.trim(),
        correo: email.value.trim(),
        password: password.value.trim(),
        confirmPassword: confirmPwd.value.trim(),
        terminos: privacyCheck.checked
      };

      // Recuperar arreglo de localStorage (si no existe, se crea vacío)
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      // Verificar si el correo ya está registrado
      if (usuarios.some(user => user.correo === usuario.correo)) {
        if (statusMessage) {
          statusMessage.textContent = "El correo ya está registrado.";
          statusMessage.style.color = '#dc3545';
          statusMessage.style.display = 'block';
        }

        emailFeedback.textContent = "El correo ya está registrado.";
        email.classList.add('is-invalid');
        email.classList.remove('is-valid');
        return;
      }

      // Agregar el nuevo usuario
      usuarios.push(usuario);

      // Guardar el arreglo actualizado en localStorage
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      // alert("Registro exitoso y usuario guardado en localStorage.");
      if (statusMessage) {
        statusMessage.textContent = "¡Registro exitoso! Redirigiendo a la página de inicio de sesión...";
        statusMessage.style.color = '#198754';
        statusMessage.style.display = 'block';
      } else {
        // Fallback si no hay elemento statusMessage
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso!',
          text: 'Tu usuario ha sido guardado',
          confirmButtonText: 'Aceptar'
        });
      }

      form.reset();
      limpiarErrores([
        validationNombre,
        validationTelefono,
        email,
        password,
        confirmPwd,
        privacyCheck,
      ]);

      setTimeout(() => {
        window.location.href = "./logIn.html";
      }, 2000);
    } else {
      // Mostrar mensaje de error general
      if (statusMessage) {
        statusMessage.textContent = "Hay errores en el formulario. Por favor, revisa los campos.";
        statusMessage.style.color = '#dc3545';
        statusMessage.style.display = 'block';
      } else {
        console.log("El registro es inválido. Favor de corregir los errores.");
      }
    }
  });// submit 
});