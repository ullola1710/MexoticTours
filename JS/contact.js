yap
const form = document.getElementsByTagName("form").item(0);
const validationNombre = document.getElementById("validationNombre");
const validationApellido = document.getElementById("validationApellido");
const email = document.getElementById("email");
const validationEmail = document.getElementById("validationEmail");
const validationTelefono = document.getElementById("validationTelefono");
const mensaje = document.getElementById("inputMensaje");
const validationServerEmail = getElementById("validationServerEmail");
const validationServerTelefono = document.getElementById("validationServerTelefono");

const invalidNombre = document.getElementById("invalidNombre");
const invalidApellido = document.getElementById("invalidApellido");
const errorMensaje = document.getElementById("validationServerMessage");


form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío del formulario

    let esValido = true;

    // Validación del nombre
    if (validationNombre.value.trim() === "") {
      validationNombre.classList.add("is-invalid");
      invalidNombre.style.display = "block";
      esValido = false;
    } else {
      validationNombre.classList.remove("is-invalid");
      invalidNombre.style.display = "none";
    }

    // Validación del apellido
    if (validationApellido.value.trim() === "") {
      validationApellido.classList.add("is-invalid");
      invalidApellido.style.display = "block";
      esValido = false;
    } else {
      validationApellido.classList.remove("is-invalid");
      invalidApellido.style.display = "none";
    }

    // Si todo es válido
    if (esValido) {
      alert("Formulario enviado correctamente.");
      form.reset();
      validationNombre.classList.remove("is-invalid");
      validationApellido.classList.remove("is-invalid");
    }
  });

  // Limpiar errores al escribir en el input
  validationNombre.addEventListener("input", function () {
    if (validationNombre.value.trim() !== "") {
      validationNombre.classList.remove("is-invalid");
      invalidNombre.style.display = "none";
    }
  });

  validationApellido.addEventListener("input", function () {
    if (validationApellido.value.trim() !== "") {
      validationApellido.classList.remove("is-invalid");
      invalidApellido.style.display = "none";
    }
  });

function validationEmail(email) {
     const valEmail = email.value.trim();
     const regex = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+");
     return regex.test(valEmail);
};

 validationEmail.addEventListener("blur", function (event) {
     event.preventDefault();
     validationEmail.innerHTML = "";
     validarEmail.style.display = "none";
     validarEmail.style.border = " 1px, red";

     if (!regex.test(valEmail)) {
         mostrarError(inputEmail, feedbackEmail, "Por favor, ingrese un correo electrónico válido.");
         return false;
     }else{
         return true;
     }
 });

//Confirma el Email

 function validarConfirmacionEmail(){
     const emailValor = valEmail.value.trim();
     const reValidationEmail = validationEmail.value.trim(); 
    
     if(reValidationEmail === " "){
         mostrarError(inputConfirmEmail, feedbackConfirmEmail, "Por favor, confirme su correo electrónico.");
     return false;
     }else if(emailValor !== reValidationEmail){
          mostrarError(inputConfirmEmail, feedbackConfirmEmail, "Las direcciones de correo electrónico no coinciden.");
     return false;   
     }else{
         ocultarError(inputConfirmEmail, feedbackConfirmEmail);
     return true;
    }
 }


//Validar Teléfono
validationTelefono.addEventListener("blur", function (event) {

    event.preventDefault();
    //validationServerTelefono.innerHTML = "";
    validationTelefono.classList.remove("is-invalid");
    validationServerTelefono.style.display = "none";
    validationTelefono.style.border = "";

    const telefono = validationTelefono.value.trim();

    if (isNaN(telefono)) {
        validationTelefono.style.border = "medium red solid"
        validationServerTelefono.style.display = "block";
        return false;
    } //Sean números

    if (telefono.length !== 10) {
     validationTelefono.style.border = "medium red solid"
     validationServerTelefono.style.display = "block";
        return false;
    } //Sea de 10 dígitos


    return true
}); //validarTelefono

  // Validar mensaje

function validarMensaje() {
    if (!mensaje.checkValidity()) {
        mensaje.reportValidity();
        return false;
    }
    return true;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validarMensaje()) {
        console.log("Formulario válido. Enviar");
        form.submit();
    }
});