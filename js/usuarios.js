// REGISTRO

const formularioRegistro =
    document.getElementById("formularioRegistro");

if (formularioRegistro) {

    formularioRegistro.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const nombre =
                document.getElementById("nombreRegistro").value.trim();

            const correo =
                document.getElementById("correoRegistro").value.trim();

            const password =
                document.getElementById("passwordRegistro").value;

            const confirmarPassword =
                document.getElementById("confirmarPassword").value;

            const mensaje =
                document.getElementById("mensajeRegistro");

            // Obtener usuarios guardados
            let usuarios =
                JSON.parse(localStorage.getItem("usuarios")) || [];

            // Validaciones

            if (nombre === "") {
                mensaje.textContent =
                    "El nombre es obligatorio.";
                mensaje.className = "error-general";
                return;
            }

            if (correo === "") {
                mensaje.textContent =
                    "El correo es obligatorio.";
                mensaje.className = "error-general";
                return;
            }

            if (password === "") {
                mensaje.textContent =
                    "La contraseña es obligatoria.";
                mensaje.className = "error-general";
                return;
            }

            if (password !== confirmarPassword) {
                mensaje.textContent =
                    "Las contraseñas no coinciden.";
                mensaje.className = "error-general";
                return;
            }

            // Comprobar si el correo ya existe

            const usuarioExiste =
                usuarios.find(function (usuario) {
                    return usuario.correo === correo;
                });

            if (usuarioExiste) {
                mensaje.textContent =
                    "Este correo ya está registrado.";
                mensaje.className = "error-general";
                return;
            }

            // Crear usuario

            const nuevoUsuario = {
                nombre: nombre,
                correo: correo,
                password: password
            };

            usuarios.push(nuevoUsuario);

            // Guardar usuario

            localStorage.setItem(
                "usuarios",
                JSON.stringify(usuarios)
            );

            mensaje.textContent =
                "¡Registro exitoso! Ahora puedes iniciar sesión.";

            mensaje.className = "exito";

            formularioRegistro.reset();

        }
    );
}


// LOGIN

const formularioLogin =
    document.getElementById("formularioLogin");

if (formularioLogin) {

    formularioLogin.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const correo =
                document.getElementById("correoLogin").value.trim();

            const password =
                document.getElementById("passwordLogin").value;

            const mensaje =
                document.getElementById("mensajeLogin");

            // Obtener usuarios

            const usuarios =
                JSON.parse(localStorage.getItem("usuarios")) || [];

            // Buscar usuario

            const usuario =
                usuarios.find(function (usuario) {

                    return usuario.correo === correo &&
                           usuario.password === password;

                });

            // Comprobar login

            if (usuario) {

                localStorage.setItem(
                    "usuarioActual",
                    JSON.stringify(usuario)
                );

                window.location.href = "index.html";

            } else {

                mensaje.textContent =
                    "Correo o contraseña incorrectos.";

                mensaje.className = "error-general";

            }

        }
    );
}