// === VARIABLES GLOBALES ===
let idUsuarioAEliminar = null;
// === FUNCIONES ===

// Mostrar campo de inmueble si el rol es propietario o inquilino
document.getElementById("rol").addEventListener("change", function () {
    const rol = this.value;
    const campo = document.getElementById("campo-inmueble-registrar");
  
    if (rol === "propietario" || rol === "inquilino") {
      campo.style.display = "block";
      document.querySelectorAll("#inmuebles-container-registrar input").forEach(i => i.required = true);
    } else {
      campo.style.display = "none";
      document.querySelectorAll("#inmuebles-container-registrar input").forEach(i => i.required = false);
    }
  });
  
  document.getElementById("agregar-inmueble-btn-registrar").addEventListener("click", function () {
    const container = document.getElementById("inmuebles-container-registrar");
  
    const wrapper = document.createElement("div");
    wrapper.className = "inmueble-wrapper";
  
    const input = document.createElement("input");
    input.type = "text";
    input.className = "inmueble-input";
    input.name = "inmueble";
    input.required = true;
  
    const eliminar = document.createElement("button");
    eliminar.type = "button";
    eliminar.textContent = "❌";
    eliminar.className = "btn-eliminar-inmueble";
    eliminar.onclick = () => wrapper.remove();
  
    wrapper.appendChild(input);
    wrapper.appendChild(eliminar);
    container.appendChild(wrapper);
});



document.getElementById("rol-modificar").addEventListener("change", function () {
    const rol = this.value;
    const campo = document.getElementById("campo-inmueble-modificar");
  
    if (rol === "propietario" || rol === "inquilino") {
      campo.style.display = "block";
      document.querySelectorAll("#inmuebles-container-modificar input").forEach(i => i.required = true);
    } else {
      campo.style.display = "none";
      document.querySelectorAll("#inmuebles-container-modificar input").forEach(i => i.required = false);
    }
  });
  
  document.getElementById("agregar-inmueble-btn-modificar").addEventListener("click", function () {
    const container = document.getElementById("inmuebles-container-modificar");
  
    const wrapper = document.createElement("div");
    wrapper.className = "inmueble-wrapper";
  
    const input = document.createElement("input");
    input.type = "text";
    input.className = "inmueble-input";
    input.name = "inmueble";
    input.required = true;
  
    const eliminar = document.createElement("button");
    eliminar.type = "button";
    eliminar.textContent = "❌";
    eliminar.className = "btn-eliminar-inmueble";
    eliminar.onclick = () => wrapper.remove();
  
    wrapper.appendChild(input);
    wrapper.appendChild(eliminar);
    container.appendChild(wrapper);
  });
  
  


///////////////////////////////////////////////////////////////////////////////////////////////////////




// Abrir modal para registrar usuario
function abrirModalRegistrarUsuario() {
    const modal = document.getElementById('modal-registrar-usuario');
    if (modal) modal.style.display = 'block';
}

function abrirModalModificarUsuario() {
    const modal = document.getElementById('modal-modificar-usuario');
    if (modal) modal.style.display = 'block';
}


// Limpiar el formulario de registro
function limpiarFormularioUsuario() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("dni").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("email").value = "";
    document.getElementById("rol").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("inmueble").value = "";
}

// // Abrir modal para visualizar usuario
// function abrirModalVisualizarUsuario(id) {
//     fetch(`http://localhost:8080/usuario/listar/${parseInt(id)}`)
//         .then(response => response.json())
//         .then(usuario => {
//             document.getElementById("visualizarNombre").innerText = `Nombre: ${usuario.nombre || ""}`;
//             document.getElementById("visualizarApellido").innerText = `Apellido: ${usuario.apellido || ""}`;
//             document.getElementById("visualizarDni").innerText = `DNI: ${usuario.dni || ""}`;
//             document.getElementById("visualizarTelefono").innerText =`Telefono: ${usuario.telefono || ""}`;
//             document.getElementById("visualizarEmail").innerText = `Email: ${usuario.email || ""}`;
//             document.getElementById("visualizarRol").innerText =`Rol: ${usuario.rol || ""}`;
//             document.getElementById("visualizarEstado").innerText =`Estado: ${usuario.estado || ""}`;
//             document.getElementById("visualizarInmueble").innerText =`Inmueble: ${usuario.inmueble || ""}`;

//             document.getElementById('modal-visualizar-usuario').style.display = 'block';
//         })
//         .catch(error => {
//             console.error("Error al visualizar el usuario: ", error);
//             alert("No se pudo cargar el usuario");
//         });
// }

// // Abrir modal para modificar usuario
// function abrirModalModificarUsuario(id) {
//     fetch(`http://localhost:8080/usuario/listar/${id}`)
//         .then(response => response.json())
//         .then(usuario => {
//             const modalModificar = document.getElementById('modal-modificar-usuario');
//             if (modalModificar) {
//                 document.getElementById("nombreModificarUsuario").value = usuario.nombre || "";
//                 document.getElementById("apellidoModificarUsuario").value = usuario.apellido || "";
//                 document.getElementById("dniModificarUsuario").value = usuario.dni || "";
//                 document.getElementById("telefonoModificarUsuario").value = usuario.telefono || "";
//                 document.getElementById("emailModificarUsuario").value = usuario.email || "";
//                 document.getElementById("rolModificarUsuario").value = usuario.rol || "";
//                 document.getElementById("estadoModificarUsuario").value = usuario.estado || "";
//                 document.getElementById("inmuebleModificarUsuario").value = usuario.inmueble || "";

//                 const formulario = document.getElementById("modificarUsuarioForm");
//                 formulario.setAttribute("data-id", id);
//                 modalModificar.style.display = "block";
//             }
//         })
//         .catch(error => {
//             console.error("Error al cargar el usuario a modificar:", error);
//         });
// }

// // Abrir modal de confirmación para eliminar usuario
// function eliminarUsuario(id) {
//     idUsuarioAEliminar = id;
//     const modal = document.getElementById("modal-confirmacion-eliminar-usuario");
//     if (modal) {
//         modal.style.display = "block";
//     }
// }

// // Cargar usuarios y mostrarlos en la tabla
// function cargarUsuarios() {
//     fetch("http://localhost:8080/usuario/listar")
//         .then(response => response.json())
//         .then(usuarios => {
//             const tabla = document.getElementById("tabla-resumida-usuarios");
//             tabla.innerHTML = "";

//             usuarios.forEach(usuario => {
//                 const fila = document.createElement("tr");

//                 fila.innerHTML = `
//                     <td>${usuario.nombre}</td>
//                     <td>${usuario.apellido}</td>
//                     <td>${usuario.dni}</td>
//                     <td>${usuario.telefono}</td>
//                     <td>${usuario.email}</td>
//                     <td>${usuario.rol}</td>
//                     <td>${usuario.estado}</td>
//                     <td>${usuario.inmueble}</td>
//                     <td>
//                         <button class="btn-visualizar-usuario" data-id="${usuario.id}">
//                             <img src="svg/Ojo.svg" alt="Visualizar" width="24" height="24">
//                         </button>
//                         <button class="btn-modificar-usuario" data-id="${usuario.id}">
//                             <img src="svg/Lapiz.svg" alt="Modificar" width="24" height="24">
//                         </button>
//                         <button class="btn-eliminar-usuario" data-id="${usuario.id}">
//                             <img src="svg/Tacho.svg" alt="Eliminar" width="24" height="24">
//                         </button> 
//                     </td>
//                 `;

//                 fila.querySelector('.btn-visualizar-usuario').addEventListener('click', function () {
//                     abrirModalVisualizarUsuario(this.getAttribute('data-id'));
//                 });

//                 fila.querySelector('.btn-modificar-usuario').addEventListener('click', function () {
//                     abrirModalModificarUsuario(this.getAttribute('data-id'));
//                 });

//                 fila.querySelector('.btn-eliminar-usuario').addEventListener('click', function () {
//                     eliminarUsuario(this.getAttribute('data-id'));
//                 });

//                 tabla.appendChild(fila);
//             });
//         })
//         .catch(error => {
//             console.error("Error al cargar los usuarios:", error);
//         });
// }

// // === EVENTOS PRINCIPALES ===
// document.addEventListener('DOMContentLoaded', function () {
//     cargarUsuarios();

//     // Botón para abrir modal de registro
//     const btnRegistrarUsuario = document.getElementById("btnregistrarusuario");
//     if (btnRegistrarUsuario) {
//         btnRegistrarUsuario.addEventListener("click", abrirModalRegistrarUsuario);
//     }

//     // Botón limpiar formulario
//     const btnLimpiarUsuario = document.getElementById("boton-limpiar-usuario");
//     if (btnLimpiarUsuario) {
//         btnLimpiarUsuario.addEventListener("click", function (e) {
//             e.preventDefault();
//             limpiarFormularioUsuario();
//         });
//     }

//     // Registrar usuario
//     const formRegistrarUsuario = document.getElementById("usuarioForm");
//     if (formRegistrarUsuario) {
//         formRegistrarUsuario.addEventListener("submit", function (e) {
//             e.preventDefault();

//             const usuario = {
//                 nombre: document.getElementById("nombre").value,
//                 apellido: document.getElementById("apellido").value,
//                 dni: document.getElementById("dni").value,
//                 telefono: document.getElementById("telefono").value,
//                 email: document.getElementById("email").value,
//                 rol: document.getElementById("rol").value,
//                 estado: document.getElementById("estado").value,
//                 inmueble: document.getElementById("inmueble").value
//             };

//             fetch("http://localhost:8080/usuario/guardar", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(usuario)
//             })
//                 .then(response => {
//                     if (!response.ok) throw new Error("Error al guardar el usuario");
//                     return response.json();
//                 })
//                 .then(() => {
//                     cerrarModal("modal-registrar-usuario");
//                     cargarUsuarios();
//                     limpiarFormularioUsuario()
//                 })
//                 .catch(error => {
//                     console.error("Error al registrar el usuario:", error);
//                     alert("Hubo un error al registrar el usuario.");
//                 });
//         });
//     }

//     // Modificar usuario
//     const formModificarUsuario = document.getElementById("modificarUsuarioForm");
//     if (formModificarUsuario) {
//         formModificarUsuario.addEventListener("submit", function (e) {
//             e.preventDefault();

//             const idUsuario = formModificarUsuario.getAttribute("data-id");

//             const datosUsuario = {
//                 nombre: document.getElementById("nombreModificarUsuario").value,
//                 apellido: document.getElementById("apellidoModificarUsuario").value,
//                 dni: document.getElementById("dniModificarUsuario").value,
//                 telefono: document.getElementById("telefonoModificarUsuario").value,
//                 email: document.getElementById("emailModificarUsuario").value,
//                 rol: document.getElementById("rolModificarUsuario").value,
//                 estado: document.getElementById("estadoModificarUsuario").value,
//                 inmueble: document.getElementById("inmuebleModificarUsuario").value
//             };

//             fetch(`http://localhost:8080/usuario/modificar/${idUsuario}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(datosUsuario)
//             })
//                 .then(response => {
//                     if (!response.ok) throw new Error("Error al modificar el usuario");
//                     return response.json();
//                 })
//                 .then(() => {
//                     cerrarModal("modal-modificar-usuario");
//                     cargarUsuarios();
//                 })
//                 .catch(error => {
//                     console.error("Error al modificar el usuario:", error);
//                     alert("No se pudo modificar el usuario.");
//                 });
//         });
//     }

//     // Confirmar eliminación
//     const btnConfirmarEliminarUsuario = document.getElementById('boton-confirmar-eliminar-usuario');
//     if (btnConfirmarEliminarUsuario) {
//         btnConfirmarEliminarUsuario.onclick = function () {
//             if (idUsuarioAEliminar !== null) {
//                 fetch(`http://localhost:8080/usuario/eliminar/${idUsuarioAEliminar}`, {
//                     method: 'DELETE'
//                 })
//                     .then(response => {
//                         if (!response.ok) throw new Error("Error al eliminar el usuario");
//                         cerrarModal('modal-confirmacion-eliminar-usuario');
//                         idUsuarioAEliminar = null;
//                         cargarUsuarios();
//                     })
//                     .catch(error => {
//                         console.error("Error al eliminar el usuario:", error);
//                         alert("No se pudo eliminar el usuario.");
//                     });
//             }
//         };
//     }
// });
