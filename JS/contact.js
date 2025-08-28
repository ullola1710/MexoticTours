// Variables existentes
const form = document.getElementsByTagName("form").item(0);
const validationNombre = document.getElementById("validationNombre");
const validationApellido = document.getElementById("validationApellido");
const email = document.getElementById("email");
const validationEmail = document.getElementById("validationEmail");
const inputTelefono = document.getElementById("validationTelefono");
const mensaje = document.getElementById("inputMensaje");

// Nuevas variables (para los feedbacks de Bootstrap y otros elementos)
const privacyCheck = document.getElementById("privacyCheck");
const validationServerEmail = document.getElementById("emailFeedback");
const validationConfirmEmail = document.getElementById("validationEmailFeedback");
const validationServerMessage = document.getElementById("validationServerMessage");
const validationServerTelefono = document.getElementById("validationServerTelefono");
const privacyCheckFeedback = document.getElementById("privacyCheckFeedback");

// Expresiones regulares para validaciones específicas
const emailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$"); // Validación de email más estricta
const textoRegex = new RegExp("^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$"); // Solo letras y espacios
const telefonoRegex = new RegExp("^[1-9]{1}[0-9]{9}$"); // 10 dígitos, no inicia con 0

let isValid = true; // Variable booleana para la validación general

// Declaración de variables para pop-up de política de privacidad
const privacyLink = document.getElementById("privacyLink");

/**
 * --- Funciones auxiliares para mostrar/ocultar errores --
 */
function mostrarError(element, feedbackElement, mensaje) {
  element.classList.add("is-invalid");
  feedbackElement.textContent = mensaje;
  feedbackElement.style.display = "block";
  isValid = false;
}

function ocultarError(element, feedbackElement) {
  element.classList.remove("is-invalid");
  feedbackElement.textContent = "";
  feedbackElement.style.display = "none";
}

/**
 *
 * -- Funciones de validación --
 *
 */

//Validar Nombre
function validarNombre() {
  const nombreValor = validationNombre.value.trim();
  const feedbackElement = validationNombre.nextElementSibling;

  if (nombreValor === "") {
    mostrarError(validationNombre, feedbackElement, "El nombre no puede ir vacío.");
    return false;
  } else if (nombreValor.length < 3) {
    mostrarError(validationNombre, feedbackElement, "El nombre debe tener al menos 3 caracteres.");
    return false;
  } else if (!textoRegex.test(nombreValor)) {
    mostrarError(validationNombre, feedbackElement, "El nombre solo puede contener letras y espacios.");
    return false;
  } else {
    ocultarError(validationNombre, feedbackElement);
    return true;
  }
}

//Validar Apellido
function validarApellido() {
  const apellidoValor = validationApellido.value.trim();
  const feedbackElement = validationApellido.nextElementSibling;

  if (apellidoValor === "") {
    mostrarError(validationApellido, feedbackElement, "El apellido no puede ir vacío.");
    return false;
  } else if (apellidoValor.length < 3) {
    mostrarError(validationApellido, feedbackElement, "El apellido debe tener al menos 3 caracteres.");
    return false;
  } else if (!textoRegex.test(apellidoValor)) {
    mostrarError(validationApellido, feedbackElement, "El apellido solo puede contener letras y espacios.");
    return false;
  } else {
    ocultarError(validationApellido, feedbackElement);
    return true;
  }
}

//Validar Email
function validarEmail() {
  if (email.value.trim() === "") {
    mostrarError(email, validationServerEmail, "El correo electrónico no puede ir vacío.");
    return false;
  } else if (!emailRegex.test(email.value.trim())) {
    mostrarError(email, validationServerEmail, "Dirección de correo electrónico no válida.");
    return false;
  } else {
    ocultarError(email, validationServerEmail);
    return true;
  }
}

//Confirma el Email
function validarConfirmacionEmail() {
  const emailValor = email.value.trim();
  const confirmEmailValor = validationEmail.value.trim();

  if (confirmEmailValor === "") {
    mostrarError(validationEmail, validationConfirmEmail, "La confirmación de correo no puede ir vacía.");
    return false;
  } else if (emailValor !== confirmEmailValor) {
    mostrarError(validationEmail, validationConfirmEmail, "Las direcciones de correo electrónico no coinciden.");
    return false;
  } else {
    ocultarError(validationEmail, validationConfirmEmail);
    return true;
  }
}

//Validar Teléfono
function validarTelefono() {
  const telefonoValor = inputTelefono.value.trim();

  if (telefonoValor === "") {
    mostrarError(inputTelefono, validationServerTelefono, "El teléfono no puede ir vacío.");
    return false;
  } else if (!telefonoRegex.test(telefonoValor)) {
    mostrarError(inputTelefono, validationServerTelefono, "El número telefónico debe tener 10 dígitos y no puede iniciar con cero.");
    return false;
  } else {
    ocultarError(inputTelefono, validationServerTelefono);
    return true;
  }
}

// Validar mensaje

// function validarMensaje() {
//   const mensaje = document.getElementById("inputMensaje").value.trim(); // elimina espacios
//   const feedback = document.getElementById("validationServerMessage");
//   // if (mensaje.value.trim() === "") {
//   //   mostrarError(mensaje, validationServerMessage, "El mensaje no puede ir vacío.");
//   //   return false;
//   // } else if (mensaje.value.trim().length < 20) {
//   //   mostrarError(mensaje, validationServerMessage, "El mensaje debe contener al menos 20 caracteres.");
//   //   return false;
//   // } else {
//   //   ocultarError(mensaje, validationServerMessage);
//   //   return true;
//   // }
// if (mensaje === "") {
//     feedback.textContent = "El mensaje no puede estar vacío ni contener sólo espacios"
//     feedback.style.display ="block";  
//     return false;
//   } else {
//     feedback.style.display= "none";
//     return true;
//   }
// }

function validarMensaje() {
  const mensajeValor = mensaje.value.trim();
  const feedback = document.getElementById("validationServerMessage");
<<<<<<< HEAD

  // 1. Mensaje vacío
  if (mensajeValor === "") {
    mostrarError(mensaje, feedback, "El mensaje no puede ir vacío.");
    return false;
  }

  // 2. Múltiples espacios seguidos
=======
  // 1. Mensaje vacío
  if (mensajeValor === "") {
    mostrarError(mensaje, feedback, "El mensaje no puede ir vacío."); return false;
  }
  //2. Múltiples espacios libres 
>>>>>>> 3f63cbd7cb6b3fd83be531aa2c4ac40690bf3f8a
  if (mensajeValor.includes("  ")) {
    mostrarError(mensaje, feedback, "El mensaje no puede contener múltiples espacios seguidos.");
    return false;
  }

<<<<<<< HEAD
  // 3. Longitud mínima (después de validaciones)
=======
  //3.Longitud minima
>>>>>>> 3f63cbd7cb6b3fd83be531aa2c4ac40690bf3f8a
  if (mensajeValor.length < 20) {
    mostrarError(mensaje, feedback, "El mensaje debe contener al menos 20 caracteres.");
    return false;
  }
<<<<<<< HEAD

=======
>>>>>>> 3f63cbd7cb6b3fd83be531aa2c4ac40690bf3f8a
  ocultarError(mensaje, feedback);
  return true;
}


<<<<<<< HEAD


=======
>>>>>>> 3f63cbd7cb6b3fd83be531aa2c4ac40690bf3f8a
// Validar política de privacidad
function validarPrivacidad() {
  if (!privacyCheck.checked) {
    mostrarError(privacyCheck, privacyCheckFeedback, "Para poder continuar, es necesario aceptar nuestra política de privacidad.");
    return false;
  } else {
    ocultarError(privacyCheck, privacyCheckFeedback);
    return true;
  }
}

// --- Lógica de validación general con isValid ---
function validarFormularioCompleto() {
  isValid = true; // Reinicia la variable de validación

  const nombreValido = validarNombre();
  const apellidoValido = validarApellido();
  const emailValido = validarEmail();
  const confirmEmailValido = validarConfirmacionEmail();
  const telefonoValido = validarTelefono();
  const mensajeValido = validarMensaje();
  const privacidadValida = validarPrivacidad();

  // Devuelve true si todas las validaciones son verdaderas
  return nombreValido && apellidoValido && emailValido && confirmEmailValido && telefonoValido && mensajeValido && privacidadValida;
}

// --- Escuchadores de eventos (blur y submit) ---

// Validaciones en tiempo real al salir del campo
validationNombre.addEventListener("blur", validarNombre);
validationApellido.addEventListener("blur", validarApellido);
email.addEventListener("blur", validarEmail);
validationEmail.addEventListener("blur", validarConfirmacionEmail);
inputTelefono.addEventListener("blur", validarTelefono);
mensaje.addEventListener("blur", validarMensaje);
privacyCheck.addEventListener("change", validarPrivacidad);


// Limpiar errores al enfocar los campos
function limpiarErrores() {
  const campos = [
    validationNombre,
    validationApellido,
    email,
    validationEmail,
    inputTelefono,
    mensaje,
    privacyCheck
  ];

  campos.forEach(campo => {
    campo.classList.remove("is-invalid");
  });
}

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
        <h2 id="privacidadTitle" style="margin:0; padding:1rem;">Política de Privacidad</h2>
        <iframe src="./docs/AvisoPrivacidad.pdf" frameborder="0"></iframe>
      </div>
    </div>`
  );

  // Variables
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("closePopup");

  popup.style.display = "flex";

  closePopup.onclick = function () {
    popup.style.display = "none";
    popup.remove();
  } // closePopup.onclick

  // ventana del popup
  window.onclick = function (event) {
    if (event.target === popup) {
      popup.style.display = "none";
      popup.remove();
    }
  }

}

// Escuchador de evento para el envío del formulario
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Evita el envío por defecto

  if (validarFormularioCompleto()) {
    // Enviar con EmailJS - NUEVO
    const templateParams = {
      to_email: "mexotictours@gmail.com",
      subject: "Contacto de " + validationNombre.value.trim() + " " + validationApellido.value.trim(),
      from_name: validationNombre.value.trim() + " " + validationApellido.value.trim(),
      from_email: email.value.trim(),
      phone: inputTelefono.value.trim(),
      message: mensaje.value.trim(),
      type: "contacto", // t = type
      time: new Date().toLocaleString(),
      show_contatcto: "block",
      show_suscripcion: "none"
    };

    // Enviar con EmailJS
    emailjs.send("service_pi5sznp", "template_xd5aaoa", templateParams) // antes form
      .then(
        function (response) {
          console.log(
            "Correo enviado con éxito",
            response.status,
            response.text
          );
<<<<<<< HEAD
          // alert("✅ Formulario enviado correctamente.");
           
=======
>>>>>>> 3f63cbd7cb6b3fd83be531aa2c4ac40690bf3f8a
          Swal.fire({ //SweetAlert
            icon: "success",
            title: "Formulario enviado",
            text: "✅ Tu mensaje se envió correctamente.",
            confirmButtonColor: "#8D94FF"
          });
          form.reset();
          limpiarErrores();
        },
        function (error) {
          console.error("Error al enviar el correo", error);
<<<<<<< HEAD
          // alert(
          //   "❌ Ocurrió un error al enviar el formulario. Intenta más tarde."
          // );
          
=======
>>>>>>> 3f63cbd7cb6b3fd83be531aa2c4ac40690bf3f8a
          Swal.fire({ //SweetAlert
            icon: "error",
            title: "Error al enviar",
            text: "❌ Ocurrió un error al enviar el formulario. Intenta más tarde.",
            confirmButtonColor: "#8D94FF"
          });
        }
      );

  } else {
    console.log("El formulario no es válido. Por favor, corrige los errores.");
    Swal.fire({
      icon: "warning",
      title: "Formulario incompleto",
      text: "Por favor, corrige los errores antes de enviar.",
      confirmButtonColor: "#8D94FF"
    });
  }
});
