// JSON  Dupla Aby e Isa
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // evita que la página se recargue

        // 1. Tomar los valores del formulario
        const nombre = document.getElementById("validationNombre").value;
        const telefono = document.getElementById("validationTelefono").value;
        const correo = document.getElementById("validationEmail").value;
        const password = document.getElementById("validationPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const terminos = document.getElementById("privacyCheck").checked; //

        // (validaciones Jade y Brandy)
    

// Dupla Aby e Isa
        // 2. Crear el objeto JSON
        const usuario = {
            nombre: nombre,
            telefono: telefono,
            correo: correo,
            password: password,
            confirmPassword: confirmPassword,
            terminos: terminos
        };

        // 3. Recuperar arreglo de localStorage (si no existe, se crea vacío)
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // 4. Agregar el nuevo usuario
        usuarios.push(usuario);

        // 5. Guardar el arreglo actualizado en localStorage
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("✅ Usuario guardado en localStorage");
            form.reset(); // limpia el formulario
    });
});
