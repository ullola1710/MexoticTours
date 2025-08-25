// Validaciones - Modulo
import { validarEmail, validarPassword, limpiarErrores } from "./validaciones.js";

// Variables
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById("form");
    const email = document.getElementById("mt-email");
    const password = document.getElementById("mt-password");

    // Alertas bootstrap
    const emailFeedback = document.getElementById("emailFeedback");
    const passwordFeedback = document.getElementById("passwordFeedback");

    function validarEmailRegistro() {
        return validarEmail(email.value.trim(), emailFeedback, email);
    } // validarEmailRegistro

    function validarPasswordRegistro() {
        return validarPassword(password.value.trim(), passwordFeedback, password);
    } // validarPasswordRegistro

    // Orejas
    email.addEventListener("blur", validarEmailRegistro);
    password.addEventListener("blur", validarPasswordRegistro);


    // Esto puede cambiar -------------------------
    // Validaciones propias del registro
    function validarFormularioCompleto() {
        const emailOk = validarEmailRegistro();
        const pwdOk = validarPasswordRegistro();

        return emailOk && pwdOk;
    } // validarFormularioCompleto 
    // Esto puede cambiar -------------------------


    // Envío de todos los datos - Forms completo
    form.addEventListener("submit", function (event) {
        if (!validarFormularioCompleto()) {
            event.preventDefault();
            alert("El correo electrónico y/o contraseña son incorrectos. Por favor, intentalo de nuevo.");
            return;
        }

        // localStorage

        const usuarioValido = usuarios.some(usuario => usuario.correo === correo && usuario.password === pass);
        if(usuarioValido){
            alert ("Bienevido");
            form.reset();
            limpiarErrores([
                email, 
                password,
            ]);

            // Redigirir al home?
            window.location.href = "./index.html";
        } else {
            alert("El correo electrónico y/o contraseña son incorrectos. Por favor, intentalo de nuevo.");
        } // if -> usuario encontrado y real
            
    });// submit 

}); 