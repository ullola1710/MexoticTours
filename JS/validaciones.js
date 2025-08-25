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
}