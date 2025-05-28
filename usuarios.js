let idUsuarioAEliminar = null;

// === FUNCIONES MODALES ===

function abrirModalRegistrarUsuario() {
    document.getElementById("modal-registrar-usuario").style.display = "block";
}

function abrirModalModificarUsuario(id) {
    fetch(`http://localhost:8080/usuario/listar/${id}`)
        .then(response => response.json())
        .then(usuario => {
            document.getElementById("nombreModificarUsuario").value = usuario.nombre || "";
            document.getElementById("apellidoModificarUsuario").value = usuario.apellido || "";
            document.getElementById("dniModificarUsuario").value = usuario.dni || "";
            document.getElementById("telefonoModificarUsuario").value = usuario.telefono || "";
            document.getElementById("emailModificarUsuario").value = usuario.email || "";
            document.getElementById("rolModificarUsuario").value = usuario.rol || "";
            document.getElementById("estadoModificarUsuario").value = usuario.estado || "";
            document.getElementById("inmuebleModificarUsuario").value = usuario.inmueble || "";

            const formulario = document.getElementById("modificarUsuarioForm");
            formulario.setAttribute("data-id", id);

            document.getElementById("modal-modificar-usuario").style.display = "block";
        })
        .catch(error => {
            console.error("Error al cargar el usuario para modificar:", error);
        });
}

function abrirModalVisualizarUsuario(id) {
    fetch(`http://localhost:8080/usuario/listar/${id}`)
        .then(response => response.json())
        .then(usuario => {
            document.getElementById("visualizarNombre").innerText = usuario.nombre;
            document.getElementById("visualizarApellido").innerText = usuario.apellido;
            document.getElementById("visualizarDni").innerText = usuario.dni;
            document.getElementById("visualizarTelefono").innerText = usuario.telefono;
            document.getElementById("visualizarEmail").innerText = usuario.email;
            document.getElementById("visualizarRol").innerText = usuario.rol;
            document.getElementById("visualizarEstado").innerText = usuario.estado;
            document.getElementById("visualizarInmueble").innerText = usuario.inmueble;

            document.getElementById("modal-visualizar-usuario").style.display = "block";
        })
        .catch(error => {
            console.error("Error al visualizar usuario:", error);
        });
}

// === FUNCION PARA ELIMINAR USUARIO ===

function eliminarUsuario(idUsuarioAEliminar) {
    if (!confirm("¿Seguro que querés eliminar este usuario?")) return;

    fetch(`http://localhost:8080/usuario/eliminar/${idUsuarioAEliminar}`, {
        method: "DELETE",
    })
    .then(async response => {
        const text = await response.text();
        console.log("Status:", response.status);
        console.log("Respuesta backend:", text);

        if (!response.ok) throw new Error(text || "Error al eliminar usuario");

        cerrarModal("modal-confirmacion-eliminar-usuario");
        cargarUsuarios();
    })
    .catch(error => {
        console.error("Error al eliminar usuario:", error);
        alert("No se pudo eliminar el usuario. " + error.message);
    });
}

// === CARGAR USUARIOS ===

function cargarUsuarios() {
    fetch("http://localhost:8080/usuario/listar")
        .then(response => response.json())
        .then(usuarios => {
            const tabla = document.getElementById("tabla-resumida-usuarios");
            tabla.innerHTML = "";

            usuarios.forEach(usuario => {
                const fila = document.createElement("tr");

                fila.innerHTML = `
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellido}</td>
                    <td>${usuario.dni}</td>
                    <td>${usuario.telefono}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.rol}</td>
                    <td>${usuario.estado}</td>
                    <td>${usuario.inmueble}</td>
                    <td>
                        <button class="btn-visualizar-usuario" data-id="${usuario.id}">
                            <img src="svg/Ojo.svg" alt="Visualizar" width="24" height="24">
                        </button>
                        <button class="btn-modificar-usuario" data-id="${usuario.id}">
                            <img src="svg/Lapiz.svg" alt="Modificar" width="24" height="24">
                        </button>
                        <button class="btn-eliminar-usuario" data-id="${usuario.id}">
                            <img src="svg/Tacho.svg" alt="Eliminar" width="24" height="24">
                        </button>
                    </td>
                `;

                fila.querySelector(".btn-visualizar-usuario").addEventListener("click", function () {
                    abrirModalVisualizarUsuario(this.getAttribute("data-id"));
                });

                fila.querySelector(".btn-modificar-usuario").addEventListener("click", function () {
                    abrirModalModificarUsuario(this.getAttribute("data-id"));
                });

                fila.querySelector(".btn-eliminar-usuario").addEventListener("click", function () {
                    const id = this.getAttribute("data-id");
                    eliminarUsuario(id);
                });

                tabla.appendChild(fila);
            });
        });
}

// === EVENTOS PRINCIPALES ===

document.addEventListener("DOMContentLoaded", () => {
    cargarUsuarios();

    document.getElementById("btnregistrarusuario")?.addEventListener("click", abrirModalRegistrarUsuario);

    // Registrar usuario
    document.getElementById("usuarioForm")?.addEventListener("submit", function (e) {
        e.preventDefault();

        const usuario = {
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            dni: document.getElementById("dni").value,
            telefono: document.getElementById("telefono").value,
            email: document.getElementById("email").value,
            rol: document.getElementById("rol").value,
            estado: document.getElementById("estado").value,
            inmueble: document.getElementById("inmueble").value
        };

        fetch("http://localhost:8080/usuario/guardar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        })
            .then(response => {
                if (!response.ok) throw new Error("Error al guardar");
                return response.json();
            })
            .then(() => {
                cerrarModal("modal-registrar-usuario");
                cargarUsuarios();
            })
            .catch(error => {
                console.error("Error al registrar usuario:", error);
            });
    });

    // Modificar usuario
    document.getElementById("modificarUsuarioForm")?.addEventListener("submit", function (e) {
        e.preventDefault();
        const idUsuario = this.getAttribute("data-id");

        const usuarioModificado = {
            nombre: document.getElementById("nombreModificarUsuario").value,
            apellido: document.getElementById("apellidoModificarUsuario").value,
            dni: document.getElementById("dniModificarUsuario").value,
            telefono: document.getElementById("telefonoModificarUsuario").value,
            email: document.getElementById("emailModificarUsuario").value,
            rol: document.getElementById("rolModificarUsuario").value,
            estado: document.getElementById("estadoModificarUsuario").value,
            inmueble: document.getElementById("inmuebleModificarUsuario").value
        };

        fetch(`http://localhost:8080/usuario/modificar/${idUsuario}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuarioModificado)
        })
            .then(response => {
                if (!response.ok) throw new Error("Error al modificar");
                return response.json();
            })
            .then(() => {
                cerrarModal("modal-modificar-usuario");
                cargarUsuarios();
            })
            .catch(error => {
                console.error("Error al modificar usuario:", error);
            });
    });
});

// === UTILIDAD ===

function cerrarModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "none";
}
