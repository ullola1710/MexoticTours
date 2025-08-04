const form = document.getElementsByTagName("form").item(0);
const email = document.getElementById("email");
const validationEmail = document.getElementById("validationEmail");

// Confirmación de correo electrónico - valida que los campos coincidan 
// Dupla: Jade - Brandy 
form.addEventListener("submit", function (event) {
    if (!form.checkValidity()) {
        event.preventDefault();
    } // checkValidity

    // Coincidencia de correos
    if (email.value != validationEmail.value) {
        validationEmail.classList.add("is-invalid"); // Si el correo esta mal, llamará a la clase is-invalid
        validationEmail.classList.remove("is-valid");
        event.preventDefault();
    } else {
        validationEmail.classList.remove("is-invalid");
        validationEmail.classList.add("is-valid");
    } // email.value confirmación

    form.classList.add("was-validated");
}); // form
