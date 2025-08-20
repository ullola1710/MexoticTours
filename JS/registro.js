// Validaciones - Modulo
import { validarTexto, validarTelefono, validarEmail, validarPassword, validarConfirmacionPassword, validarPrivacidad, limpiarErrores } from "./validaciones.js";

// Variables
const form = document.getElementById("form");
const validationNombre = document.getElementById("validationNombre");
const validationTelefono = document.getElementById("validationTelefono");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPwd = document.getElementById("confirmPassword");
const privacyCheck = document.getElementById("privacyCheck");


// Alertas bootstrap
const nombreFeedback = document.getElementById("nombreFeedback");
const telefonoFeedback = document.getElementById("telefonoFeedback");
const emailFeedback = document.getElementById("emailFeedback");
const passwordFeedback = document.getElementById("passwordFeedback");
const confirmPasswordFeedback = document.getElementById("confirmPasswordFeedback");
const privacyCheckFeedback = document.getElementById("privacyCheckFeedback");

let isValid = true; 


// Se ocuparan las validaciones importadas de validaciones.js - Especificando sus características de c/u
function validarNombreRegistro(){
    return validarTexto(validationNombre.value.trim(), 3, nombreFeedback, validationNombre, "nombre");
} // valirNombreRegistro

function validarTelefonoRegistro(){
    return validarTelefono(validationTelefono.value.trim(), telefonoFeedback, validationTelefono);
} // validarTelefonoRegistro

function validarEmailRegistro(){
    return validarEmail(email.value.trim(), emailFeedback, email);
} // validarEmailRegistro

function validarPasswordRegistro(){
    return validarPassword(password.value.trim(), passwordFeedback, password);
} // validarPasswordRegistro

function validarConfirmacionPasswordRegistro(){
    return validarConfirmacionPassword(password.value.trim(), confirmPwd.value.trim(), confirmPasswordFeedback, confirmPwd);
} // validarConfirmacionPasswordRegistro

function validarPrivacidadRegistro(){
    return validarPrivacidad(privacyCheck, privacyCheckFeedback);
} // validarPrivacidadRegistro


// Validaciones propias del registro
function validarFormularioCompleto(){
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
privacyLink.onclick = function () {
  document.body.insertAdjacentHTML("beforeend",
    `<style>
    /* Fondo */
    .popup-overlay {
      display: flex;
      position: fixed;
      inset: 0;
      /* top: 0;
      left: 0; 
      width: 100%;
      height: 100%;*/
      background-color: rgba(0, 0, 0, 0.5); /* Fondo semi-transparente */
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
        <iframe src="./docs/Terminos_y_Condiciones.pdf" frameborder="0"></iframe>
      </div>
    </div>`
  );

  // Variables
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("closePopup");

  popup.style.display = "flex";

  closePopup.onclick = function(){
    popup.style.displau = "none"; 
    popup.remove();
  } // closePopup.onclick

  // ventana del popup
  window.onclick = function(event) {
    if(event.target === popup){
      popup.style.display = "none";
      popup.remove();
    }
  }

}



// Envío de todos los datos - Forms completo
form.addEventListener("submit", function(event){
    event.preventDefault();

    if(validarFormularioCompleto()){
       alert("Registro enviado correctamente.")
       form.requestFullscreen();
       limpiarErrores([
        validationNombre,
        validationTelefono, 
        email,
        password,
        confirmPwd,
        privacyCheck,
       ]);
    } else {
        console.log("El registro es inválido. Favor de corregir los errores.")
    }

}); // submit 



