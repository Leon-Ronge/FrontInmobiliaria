// FUNCIONES DEL MODAL USUARIO

function abrirModalRegistrarUsuario() {
    const modalRegistrarUsuario = document.getElementById('modal-registrar-usuario');
    if (modalRegistrarUsuario) {
        modalRegistrarUsuario.style.display = 'block';
    }
}

// Funcion para visualizar lista de usuarios
function abrirModalVisualizarUsuario(id){
    fetch(`http://localhost:8080/usuario/listar/${parseInt(id)}`)
        .then(response => response.json())
        .then(usuario =>{
            document.getElementById("visualizarNombre").innerText= usuario.nombre || "";
            document.getElementById("visualizarApellido").innerText= usuario.apellido || "";
            document.getElementById("visualizarDni").innerText= usuario.dni || "";
            document.getElementById("visualizarTelefono").innerText= usuario.telefono || "";
            document.getElementById("visualizarEmail").innerText= usuario.email || "";
            document.getElementById("visualizarRol").innerText= usuario.rol || "";
            document.getElementById("visualizarEstado").innerText= usuario.estado || "";
            document.getElementById("visualizarInmueble").innerText= usuario.inmueble || "";
        
        })
}


//Funcion para cargar usuario
function cargarUsuarios(){
    fetch("http://localhost:8080/usuario/listar")
        .then(response=> response.json())
        .then(usuarios =>{
            console.log("Datos recibidos del backend ", usuarios);
            const tabla = document.getElementById("tabla-resumida-usuarios");
            tabla.innerHTML = "";

            usuarios.forEach(usuario =>{
                const fila = document.createElement("tr");

                fila.innerHTML=`
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
            
            //Visualizar usuario
            fila.querySelector('.btn-visualizar-usuario').addEventListener('click', function(){
                const id = this.getAttribute('data-id');
                abiriModalVisualizarUsuario(id);
            });
            //Modificar usuario
            fila.querySelector('.btn-modificar-usuario').addEventListener('click', function(){
                const id = this.getAttribute('data-id');
                abiriModalModificarUsuario(id);
            });
            //Eliminar usuario
            fila.querySelector('.btn-eliminar-usuario').addEventListener('click', function(){
                const id = this.getAttribute('data-id');
                eliminarUsaurio(id);
            }); 
            tabla.appendChild(fila);
        
        });  
    })
    .catch(error =>{
        console.error("Error al cargar los usuarios: ", error);
    });
}




//Registrar usuario

document.addEventListener('DOMContentLoaded', function(){
    cargarUsuarios();

    const formRegistrarUsuario = document.getElementById("usuarioForm");
    if(formRegistrarUsuario){
        formRegistrarUsuario.addEventListener("submit", function(e){
            e.preventDefault();

            const usuario = {
                nombre : document.getElementById("nombre").value,
                apellido : document.getElementById("apellido").value,
                dni : document.getElementById("dni").value,
                telefono : document.getElementById("telefono").value,
                email : document.getElementById("email").value,
                rol : document.getElementById("rol").value,
                estado : document.getElementById("estado").value,
                inmueble : document.getElementById("inmueble").value,
            };

            fetch("http://localhost:8080/usuario/guardar",{
                method : "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            })
            .then(response=>{
                if(!response.ok) throw new Error("Error al guardar el usuario");
                return response.json()
            })
            .then(data => {
                console.log("Usuaro registrado:", data);
                cerrarModal("modal-registrar-usuario");
                cargarUsuarios();
            })
            .catch(error => {
                console.error("Error al registrar el usuario:", error);
                alert("Hubo un error al registrar el usuario.")
            });
        })
    }
})
