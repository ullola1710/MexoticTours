<<<<<<< HEAD
=======
<<<<<<< HEAD
// Expresiones regulares para validaciones específicas
const emailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$"); // Validación de email más estricta
const textoRegex = new RegExp("^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$"); // Solo letras y espacios
const telefonoRegex = new RegExp("^[1-9]{1}[0-9]{9}$"); // 10 dígitos, no inicia con 0

let isValid = true; // Variable booleana para la validación general

/**
 * --- Funciones auxiliares para mostrar/ocultar errores --
 */
export function mostrarError(element, feedbackElement, mensaje) {
  element.classList.add("is-invalid");
  feedbackElement.textContent = mensaje;
  feedbackElement.style.display = "block";
  return false;
}

export function ocultarError(element, feedbackElement) {
  element.classList.remove("is-invalid");
  feedbackElement.textContent = "";
  feedbackElement.style.display = "none";
  return true;
}

/**
 *
 * -- Funciones de validación --
 *
 */

// Validar Nombre/Apellido
export function validarTexto(value, minLength, feedbackElement, element, field) {
  if (value === "") {
    return mostrarError(element, feedbackElement, `El ${field} no puede ir vacío.`);
  } else if (value.length < minLength) {
    return mostrarError(element, feedbackElement, `El ${field} debe tener al menos ${minLength} caracteres.`);
  } else if (!textoRegex.test(value)) {
    return mostrarError(element, feedbackElement, `El ${field} solo puede contener letras y espacios.`);
  } else {
    return ocultarError(element, feedbackElement);
  }
}

//Validar Email
export function validarEmail(value, feedbackElement, element) {
  if (value.trim() === "") {
    return mostrarError(element, feedbackElement, "El correo electrónico no puede ir vacío.");
  } else if (!emailRegex.test(value.trim())) {
    return mostrarError(element, feedbackElement, "Dirección de correo electrónico no válida.");
  } else {
    return ocultarError(element, feedbackElement);
  }
}

//Confirma el Email
export function validarConfirmacionEmail(emailValue, confirmEmailValue, feedbackElement, element) {
  if (confirmEmailValue === "") {
    return mostrarError(element, feedbackElement, "La confirmación de correo no puede ir vacía.");
  } else if (emailValue !== confirmEmailValue) {
    return mostrarError(element, feedbackElement, "Las direcciones de correo electrónico no coinciden.");
  } else {
    return ocultarError(element, feedbackElement);
  }
}


//Validar Teléfono
export function validarTelefono(value, feedbackElement, element) {
  if (value === "") {
    return mostrarError(element, feedbackElement, "El teléfono no puede ir vacío.");
  } else if (!telefonoRegex.test(value)) {
    return mostrarError(element, feedbackElement, "El número telefónico debe tener 10 dígitos y no puede iniciar con cero.");
  } else {
    return ocultarError(element, feedbackElement);
  }
}


// Validar mensaje
export function validarMensaje(value, minLength, feedbackElement, element) {
  if (value === "") {
    return mostrarError(element, feedbackElement, "El mensaje no puede ir vacío.");
  } else if (value.length < minLength) {
    return mostrarError(element, feedbackElement, `El mensaje debe contener al menos ${minLength} caracteres.`);
  } else {
    return ocultarError(element, feedbackElement);
  }
}

// Validar contraseña
export function validarPassword(value, feedbackElement, element) {
  const pwd = (value ?? "").trim();
  
  if (pwd.length < 8) {
    return mostrarError(element, feedbackElement, "La contraseña debe tener al menos 8 caracteres.");
  }
  if (!/[a-z]/.test(pwd)) {
    return mostrarError(element, feedbackElement, "Incluye al menos una minúscula.");
  }
  if (!/[A-Z]/.test(pwd)) {
    return mostrarError(element, feedbackElement, "Incluye al menos una mayúscula.");
  }
  if (!/[0-9]/.test(pwd)) {
    return mostrarError(element, feedbackElement, "Incluye al menos un número.");
  }
  if (!/[!@#$%^&*_\-(),.?":{}|<>\\.]/.test(pwd)) {
    return mostrarError(element, feedbackElement, "Incluye al menos un carácter especial.");
  }
  return ocultarError(element, feedbackElement);
} // validarPassword

// Validar confirmación de contraseña
export function validarConfirmacionPassword(pwdValue, confirmPwdValue, feedbackElement, element) {
  if (!confirmPwdValue) {
    return mostrarError(element, feedbackElement, "Confirma tu contraseña.");
  }
  if (pwdValue !== confirmPwdValue) {
    return mostrarError(element, feedbackElement, "Las contraseñas no coinciden.");
  }
  return ocultarError(element, feedbackElement);
}// validarConfirmacionPassword


// Validar política de privacidad
export function validarPrivacidad(element, feedbackElement) {
  if (!element.checked) {
    return mostrarError(element, feedbackElement, "Para poder continuar, es necesario aceptar nuestra política de privacidad.");
  } else {
    return ocultarError(element, feedbackElement);
  }
}// validarPrivacidad



// Limpiar errores al enfocar los campos
export function limpiarErrores(fields) {
  fields.forEach(field => {
    if (field.classList) {
      field.classList.remove("is-invalid");
    }
  });
}
=======
>>>>>>> backup-MTH
// He incluido este archivo porque el registro.js depende de el y parece que no esta siendo importado correctamente.

/**
 * Valida un campo de texto.
 * @param {string} valor El valor del campo a validar.
 * @param {number} minLength La longitud mínima requerida.
 * @param {HTMLElement} feedbackElement El elemento para mostrar el feedback.
 * @param {HTMLElement} inputElement El elemento de input.
 * @param {string} tipo El tipo de validación (e.g., "nombre").
 * @returns {boolean} true si la validación es exitosa, false en caso contrario.
 */
export function validarTexto(valor, minLength, feedbackElement, inputElement, tipo) {
    if (valor.length >= minLength) {
        inputElement.classList.remove("is-invalid");
        inputElement.classList.add("is-valid");
        feedbackElement.textContent = "";
        return true;
    } else {
        inputElement.classList.remove("is-valid");
        inputElement.classList.add("is-invalid");
        feedbackElement.textContent = `Por favor, ingrese un ${tipo} válido (mínimo ${minLength} caracteres).`;
        return false;
    }
}

/**
 * Valida un número de teléfono.
 * @param {string} telefono El número de teléfono a validar.
 * @param {HTMLElement} feedbackElement El elemento para mostrar el feedback.
 * @param {HTMLElement} inputElement El elemento de input.
 * @returns {boolean} true si la validación es exitosa, false en caso contrario.
 */
export function validarTelefono(telefono, feedbackElement, inputElement) {
    const telefonoRegex = /^\d{10}$/;
    if (telefonoRegex.test(telefono)) {
        inputElement.classList.remove("is-invalid");
        inputElement.classList.add("is-valid");
        feedbackElement.textContent = "";
        return true;
    } else {
        inputElement.classList.remove("is-valid");
        inputElement.classList.add("is-invalid");
        feedbackElement.textContent = "El número de teléfono debe tener 10 dígitos.";
        return false;
    }
}

/**
 * Valida un correo electrónico.
 * @param {string} email El correo a validar.
 * @param {HTMLElement} feedbackElement El elemento para mostrar el feedback.
 * @param {HTMLElement} inputElement El elemento de input.
 * @returns {boolean} true si la validación es exitosa, false en caso contrario.
 */
export function validarEmail(email, feedbackElement, inputElement) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
        inputElement.classList.remove("is-invalid");
        inputElement.classList.add("is-valid");
        feedbackElement.textContent = "";
        return true;
    } else {
        inputElement.classList.remove("is-valid");
        inputElement.classList.add("is-invalid");
        feedbackElement.textContent = "Por favor, ingrese un correo electrónico válido.";
        return false;
    }
}

/**
 * Valida una contraseña.
 * @param {string} password La contraseña a validar.
 * @param {HTMLElement} feedbackElement El elemento para mostrar el feedback.
 * @param {HTMLElement} inputElement El elemento de input.
 * @returns {boolean} true si la validación es exitosa, false en caso contrario.
 */
export function validarPassword(password, feedbackElement, inputElement) {
    const minLength = 8;
    const hasCapital = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

    if (password.length >= minLength && hasCapital && hasLower && hasNumber && hasSpecial) {
        inputElement.classList.remove("is-invalid");
        inputElement.classList.add("is-valid");
        feedbackElement.textContent = "";
        return true;
    } else {
        inputElement.classList.remove("is-valid");
        inputElement.classList.add("is-invalid");
        feedbackElement.textContent = `La contraseña debe tener al menos ${minLength} caracteres, una mayúscula, una minúscula, un número y un carácter especial.`;
        return false;
    }
}

/**
 * Valida la confirmación de la contraseña.
 * @param {string} password La contraseña original.
 * @param {string} confirmPassword La confirmación de la contraseña.
 * @param {HTMLElement} feedbackElement El elemento para mostrar el feedback.
 * @param {HTMLElement} inputElement El elemento de input.
 * @returns {boolean} true si las contraseñas coinciden, false en caso contrario.
 */
export function validarConfirmacionPassword(password, confirmPassword, feedbackElement, inputElement) {
    if (password === confirmPassword) {
        inputElement.classList.remove("is-invalid");
        inputElement.classList.add("is-valid");
        feedbackElement.textContent = "";
        return true;
    } else {
        inputElement.classList.remove("is-valid");
        inputElement.classList.add("is-invalid");
        feedbackElement.textContent = "Las contraseñas no coinciden.";
        return false;
    }
}

/**
 * Valida el checkbox de privacidad.
 * @param {HTMLElement} checkboxElement El elemento del checkbox.
 * @param {HTMLElement} feedbackElement El elemento para mostrar el feedback.
 * @returns {boolean} true si el checkbox está marcado, false en caso contrario.
 */
export function validarPrivacidad(checkboxElement, feedbackElement) {
    if (checkboxElement.checked) {
        checkboxElement.classList.remove("is-invalid");
        feedbackElement.textContent = "";
        return true;
    } else {
        checkboxElement.classList.add("is-invalid");
        feedbackElement.textContent = "Debe aceptar los términos y condiciones.";
        return false;
    }
}

/**
 * Limpia los errores de los elementos.
 * @param {Array<HTMLElement>} elementsArray Un array de elementos a limpiar.
 */
export function limpiarErrores(elementsArray) {
    elementsArray.forEach(element => {
        element.classList.remove("is-invalid");
        element.classList.remove("is-valid");
    });
<<<<<<< HEAD
}
=======
}
>>>>>>> cf0256e (Implementar autenticación verificando usuarios pre almacenados en el local storage.)
>>>>>>> backup-MTH
