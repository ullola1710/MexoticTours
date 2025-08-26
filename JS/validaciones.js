// Archivo: validaciones.js
// Contiene las funciones de validación reutilizables para los formularios.

/**
 * Valida un campo de texto basándose en la longitud mínima.
 * @param {string} value - El valor del campo a validar.
 * @param {number} minLength - La longitud mínima requerida.
 * @param {HTMLElement} feedbackElement - El elemento donde se mostrará el mensaje de feedback.
 * @param {HTMLElement} inputElement - El elemento de entrada (input) del formulario.
 * @param {string} type - El tipo de campo (ej. "nombre") para el mensaje.
 * @returns {boolean} - true si la validación es exitosa, false en caso contrario.
 */
export function validarTexto(value, minLength, feedbackElement, inputElement, type) {
    const isValid = value.length >= minLength;
    if (isValid) {
        inputElement.classList.add('is-valid');
        inputElement.classList.remove('is-invalid');
        feedbackElement.style.display = 'none';
    } else {
        inputElement.classList.add('is-invalid');
        inputElement.classList.remove('is-valid');
        feedbackElement.textContent = `El ${type} debe tener al menos ${minLength} caracteres.`;
        feedbackElement.style.display = 'block';
    }
    return isValid;
}

/**
 * Valida un número de teléfono de 10 dígitos.
 * @param {string} value - El valor del campo a validar.
 * @param {HTMLElement} feedbackElement - El elemento donde se mostrará el mensaje de feedback.
 * @param {HTMLElement} inputElement - El elemento de entrada (input) del formulario.
 * @returns {boolean} - true si la validación es exitosa, false en caso contrario.
 */
export function validarTelefono(value, feedbackElement, inputElement) {
    const isValid = /^\d{10}$/.test(value);
    if (isValid) {
        inputElement.classList.add('is-valid');
        inputElement.classList.remove('is-invalid');
        feedbackElement.style.display = 'none';
    } else {
        inputElement.classList.add('is-invalid');
        inputElement.classList.remove('is-valid');
        feedbackElement.textContent = "El teléfono debe tener 10 dígitos.";
        feedbackElement.style.display = 'block';
    }
    return isValid;
}

/**
 * Valida una dirección de correo electrónico.
 * @param {string} value - El valor del campo a validar.
 * @param {HTMLElement} feedbackElement - El elemento donde se mostrará el mensaje de feedback.
 * @param {HTMLElement} inputElement - El elemento de entrada (input) del formulario.
 * @returns {boolean} - true si la validación es exitosa, false en caso contrario.
 */
export function validarEmail(value, feedbackElement, inputElement) {
    const isValid = /^\S+@\S+\.\S+$/.test(value);
    if (isValid) {
        inputElement.classList.add('is-valid');
        inputElement.classList.remove('is-invalid');
        feedbackElement.style.display = 'none';
    } else {
        inputElement.classList.add('is-invalid');
        inputElement.classList.remove('is-valid');
        feedbackElement.textContent = "Ingresa un correo válido.";
        feedbackElement.style.display = 'block';
    }
    return isValid;
}

/**
 * Valida una contraseña con una longitud mínima.
 * @param {string} value - El valor del campo a validar.
 * @param {HTMLElement} feedbackElement - El elemento donde se mostrará el mensaje de feedback.
 * @param {HTMLElement} inputElement - El elemento de entrada (input) del formulario.
 * @returns {boolean} - true si la validación es exitosa, false en caso contrario.
 */
export function validarPassword(value, feedbackElement, inputElement) {
    const isValid = value.length >= 6;
    if (isValid) {
        inputElement.classList.add('is-valid');
        inputElement.classList.remove('is-invalid');
        feedbackElement.style.display = 'none';
    } else {
        inputElement.classList.add('is-invalid');
        inputElement.classList.remove('is-valid');
        feedbackElement.textContent = "La contraseña debe tener al menos 6 caracteres.";
        feedbackElement.style.display = 'block';
    }
    return isValid;
}

/**
 * Valida que el campo de confirmación de contraseña coincida con el campo de contraseña.
 * @param {string} pwd1 - El valor de la contraseña.
 * @param {string} pwd2 - El valor de la confirmación de contraseña.
 * @param {HTMLElement} feedbackElement - El elemento donde se mostrará el mensaje de feedback.
 * @param {HTMLElement} inputElement - El elemento de entrada (input) del formulario.
 * @returns {boolean} - true si la validación es exitosa, false en caso contrario.
 */
export function validarConfirmacionPassword(pwd1, pwd2, feedbackElement, inputElement) {
    const isValid = pwd1 === pwd2 && pwd2.length > 0;
    if (isValid) {
        inputElement.classList.add('is-valid');
        inputElement.classList.remove('is-invalid');
        feedbackElement.style.display = 'none';
    } else {
        inputElement.classList.add('is-invalid');
        inputElement.classList.remove('is-valid');
        feedbackElement.textContent = "Las contraseñas no coinciden.";
        feedbackElement.style.display = 'block';
    }
    return isValid;
}

/**
 * Valida que un checkbox esté marcado.
 * @param {HTMLElement} checkElement - El elemento del checkbox a validar.
 * @param {HTMLElement} feedbackElement - El elemento donde se mostrará el mensaje de feedback.
 * @returns {boolean} - true si la validación es exitosa, false en caso contrario.
 */
export function validarPrivacidad(checkElement, feedbackElement) {
    const isValid = checkElement.checked;
    if (isValid) {
        checkElement.classList.add('is-valid');
        checkElement.classList.remove('is-invalid');
        feedbackElement.style.display = 'none';
    } else {
        checkElement.classList.add('is-invalid');
        checkElement.classList.remove('is-valid');
        feedbackElement.textContent = "Debes aceptar los términos y condiciones.";
        feedbackElement.style.display = 'block';
    }
    return isValid;
}

/**
 * Limpia las clases de validación de los elementos del formulario.
 * @param {Array<HTMLElement>} elements - Un array de elementos del formulario a limpiar.
 */
export function limpiarErrores(elements) {
    elements.forEach(input => {
        input.classList.remove('is-valid', 'is-invalid');
    });
}
