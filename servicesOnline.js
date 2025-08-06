document.addEventListener("DOMContentLoaded", () => {
  // Variables del DOM
  const form = document.getElementsByTagName("form").item(0);
  const validationNombre = document.getElementById("validationNombre");
  const validationApellido = document.getElementById("validationApellido");
  const email = document.getElementById("email");
  const validationEmail = document.getElementById("validationEmail");
  const inputTelefono = document.getElementById("validationTelefono");
  const mensaje = document.getElementById("inputMensaje");

  const privacyCheck = document.getElementById("privacyCheck");
  const validationServerEmail = document.getElementById("emailFeedback");
  const validationConfirmEmail = document.getElementById(
    "validationEmailFeedback"
  );
  const validationServerMessage = document.getElementById(
    "validationServerMessage"
  );
  const validationServerTelefono = document.getElementById(
    "validationServerTelefono"
  );
  const privacyCheckFeedback = document.getElementById("privacyCheckFeedback");

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const textoRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  const telefonoRegex = /^[1-9]{1}[0-9]{9}$/;

  let isValid = true;

  function mostrarError(element, feedbackElement, mensaje) {
    element.classList.add("is-invalid");
    if (feedbackElement) {
      feedbackElement.textContent = mensaje;
      feedbackElement.style.display = "block";
    }
    isValid = false;
  }

  function ocultarError(element, feedbackElement) {
    element.classList.remove("is-invalid");
    if (feedbackElement) {
      feedbackElement.textContent = "";
      feedbackElement.style.display = "none";
    }
  }

  function validarNombre() {
    const nombreValor = validationNombre.value.trim();
    const feedbackElement = validationNombre.nextElementSibling;

    if (nombreValor === "") {
      mostrarError(
        validationNombre,
        feedbackElement,
        "El nombre no puede ir vacío."
      );
      return false;
    } else if (nombreValor.length < 3) {
      mostrarError(
        validationNombre,
        feedbackElement,
        "El nombre debe tener al menos 3 caracteres."
      );
      return false;
    } else if (!textoRegex.test(nombreValor)) {
      mostrarError(
        validationNombre,
        feedbackElement,
        "El nombre solo puede contener letras y espacios."
      );
      return false;
    } else {
      ocultarError(validationNombre, feedbackElement);
      return true;
    }
  }

  function validarApellido() {
    const apellidoValor = validationApellido.value.trim();
    const feedbackElement = validationApellido.nextElementSibling;

    if (apellidoValor === "") {
      mostrarError(
        validationApellido,
        feedbackElement,
        "El apellido no puede ir vacío."
      );
      return false;
    } else if (apellidoValor.length < 3) {
      mostrarError(
        validationApellido,
        feedbackElement,
        "El apellido debe tener al menos 3 caracteres."
      );
      return false;
    } else if (!textoRegex.test(apellidoValor)) {
      mostrarError(
        validationApellido,
        feedbackElement,
        "El apellido solo puede contener letras y espacios."
      );
      return false;
    } else {
      ocultarError(validationApellido, feedbackElement);
      return true;
    }
  }

  function validarEmail() {
    if (email.value.trim() === "") {
      mostrarError(
        email,
        validationServerEmail,
        "El correo electrónico no puede ir vacío."
      );
      return false;
    } else if (!emailRegex.test(email.value.trim())) {
      mostrarError(
        email,
        validationServerEmail,
        "Dirección de correo electrónico no válida."
      );
      return false;
    } else {
      ocultarError(email, validationServerEmail);
      return true;
    }
  }

  function validarConfirmacionEmail() {
    const emailValor = email.value.trim();
    const confirmEmailValor = validationEmail.value.trim();

    if (confirmEmailValor === "") {
      mostrarError(
        validationEmail,
        validationConfirmEmail,
        "La confirmación de correo no puede ir vacía."
      );
      return false;
    } else if (emailValor !== confirmEmailValor) {
      mostrarError(
        validationEmail,
        validationConfirmEmail,
        "Las direcciones de correo electrónico no coinciden."
      );
      return false;
    } else {
      ocultarError(validationEmail, validationConfirmEmail);
      return true;
    }
  }

  function validarTelefono() {
    const telefonoValor = inputTelefono.value.trim();

    if (telefonoValor === "") {
      mostrarError(
        inputTelefono,
        validationServerTelefono,
        "El teléfono no puede ir vacío."
      );
      return false;
    } else if (!telefonoRegex.test(telefonoValor)) {
      mostrarError(
        inputTelefono,
        validationServerTelefono,
        "El número telefónico debe tener 10 dígitos y no puede iniciar con cero."
      );
      return false;
    } else {
      ocultarError(inputTelefono, validationServerTelefono);
      return true;
    }
  }

  function validarMensaje() {
    if (mensaje.value.trim() === "") {
      mostrarError(
        mensaje,
        validationServerMessage,
        "El mensaje no puede ir vacío."
      );
      return false;
    } else if (mensaje.value.trim().length < 20) {
      mostrarError(
        mensaje,
        validationServerMessage,
        "El mensaje debe contener al menos 20 caracteres."
      );
      return false;
    } else {
      ocultarError(mensaje, validationServerMessage);
      return true;
    }
  }

  function validarPrivacidad() {
    if (!privacyCheck.checked) {
      mostrarError(
        privacyCheck,
        privacyCheckFeedback,
        "Debes aceptar la política de privacidad."
      );
      return false;
    } else {
      ocultarError(privacyCheck, privacyCheckFeedback);
      return true;
    }
  }

  function validarFormularioCompleto() {
    isValid = true;

    const nombreValido = validarNombre();
    const apellidoValido = validarApellido();
    const emailValido = validarEmail();
    const confirmEmailValido = validarConfirmacionEmail();
    const telefonoValido = validarTelefono();
    const mensajeValido = validarMensaje();
    const privacidadValida = validarPrivacidad();

    return (
      nombreValido &&
      apellidoValido &&
      emailValido &&
      confirmEmailValido &&
      telefonoValido &&
      mensajeValido &&
      privacidadValida
    );
  }

  // Listeners
  validationNombre.addEventListener("blur", validarNombre);
  validationApellido.addEventListener("blur", validarApellido);
  email.addEventListener("blur", validarEmail);
  validationEmail.addEventListener("blur", validarConfirmacionEmail);
  inputTelefono.addEventListener("blur", validarTelefono);
  mensaje.addEventListener("blur", validarMensaje);
  privacyCheck.addEventListener("change", validarPrivacidad);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validarFormularioCompleto()) {
      // Datos del formulario
      const datos = {
        nombre: validationNombre.value.trim(),
        apellido: validationApellido.value.trim(),
        email: email.value.trim(),
        telefono: inputTelefono.value.trim(),
        mensaje: mensaje.value.trim(),
      };

      // Enviar con EmailJS
      emailjs.send("service_pi5sznp", "template_xd5aaoa", datos).then(
        function (response) {
          console.log(
            "Correo enviado con éxito",
            response.status,
            response.text
          );
          alert("✅ Formulario enviado correctamente.");
          form.reset();
          limpiarErrores();
        },
        function (error) {
          console.error("Error al enviar el correo", error);
          alert(
            "❌ Ocurrió un error al enviar el formulario. Intenta más tarde."
          );
        }
      );
    } else {
      console.log(
        "El formulario no es válido. Por favor, corrige los errores."
      );
    }
  });

  function limpiarErrores() {
    const elementosInvalidos = form.querySelectorAll(".is-invalid");
    elementosInvalidos.forEach((el) => el.classList.remove("is-invalid"));

    const mensajesFeedback = form.querySelectorAll(".invalid-feedback");
    mensajesFeedback.forEach((el) => {
      el.textContent = "";
      el.style.display = "none";
    });
  }
});
