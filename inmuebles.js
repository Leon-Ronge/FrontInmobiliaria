// VARIABLES GLOBALES
let idInmuebleAEliminar = null;

// === ( Funciones de logica ) ===

// Funcion para visualizar lista de inmuebles
    function abrirModalVisualizarInmueble(id) {
    fetch(`http://localhost:8080/inmobiliaria/${parseInt(id)}`)
        .then(response => response.json())
        .then(inmueble => {
            document.getElementById("visualizarTitulo").innerText = inmueble.titulo || "";
            document.getElementById("visualizarCalle").innerText = inmueble.calle || "";
            document.getElementById("visualizarAltura").innerText = inmueble.altura || "";
            document.getElementById("visualizarBarrio").innerText = inmueble.barrio || "";
            document.getElementById("visualizarCiudad").innerText = inmueble.ciudad || "";
            document.getElementById("visualizarPiso").innerText = inmueble.piso || "";
            document.getElementById("visualizarSuperficie").innerText = inmueble.superficie || "";
            document.getElementById("visualizarTipoInmueble").innerText = inmueble.tipoInmueble || "";
            document.getElementById("visualizarPrecio").innerText = inmueble.precio || "";
            document.getElementById("visualizarBanios").innerText = inmueble.banios || "";
            document.getElementById("visualizarDormitorios").innerText = inmueble.dormitorios || "";
            document.getElementById("visualizarDescripcion").innerText = inmueble.descripcion || "";
            document.getElementById("visualizarAntiguedad").innerText = inmueble.antiguedad ? `${inmueble.antiguedad} años` : "";

            const imgElement = document.getElementById("visualizarImagen");
            imgElement.src = inmueble.imagenPrincipal || "img/default.jpg";

            const ul = document.getElementById("visualizarCaracteristicas");
            ul.innerHTML = "";
            if (Array.isArray(inmueble.caracteristicas)) {
                inmueble.caracteristicas.forEach(caracteristica => {
                    const li = document.createElement("li");
                    li.innerText = caracteristica;
                    ul.appendChild(li);
                });
            }

            document.getElementById('visualizarModal').style.display = 'block';
        })
        .catch(error => {
            console.error("Error al visualizar inmueble:", error);
            alert("No se pudo cargar el inmueble.");
        });
}


// Funcion para cargar inmuebles.
function cargarInmuebles() {
    fetch("http://localhost:8080/inmobiliaria/listar")
        .then(response => response.json())
        .then(inmuebles => {
            console.log("Datos recibidos del backend: ", inmuebles);
            const tabla = document.getElementById("tabla-resumida-inmuebles");
            tabla.innerHTML = "";

            inmuebles.forEach(inmueble => {
                const fila = document.createElement("tr");

                fila.innerHTML = `
                    <td>${inmueble.titulo || "Sin descripción"}</td>
                    <td>${inmueble.calle}</td>
                    <td>${inmueble.altura}</td>
                    <td>${inmueble.barrio}</td>
                    <td>${inmueble.piso}</td>
                    <td>${inmueble.superficie} m²</td>
                    <td>${inmueble.operacion}</td>
                    <td>${inmueble.disponible ? "Sí" : "No"}</td>
                    <td>$${inmueble.precio}</td>
                    <td>
                        <button class="btn-visualizar-inmueble" data-id="${inmueble.id}">
                            <img src="svg/Ojo.svg" alt="Visualizar" width="24" height="24">
                        </button>
                        <button class="btn-modificar-inmueble" data-id="${inmueble.id}">
                            <img src="svg/Lapiz.svg" alt="Modificar" width="24" height="24">
                        </button>
                        <button class="btn-eliminar-inmueble" data-id="${inmueble.id}">
                            <img src="svg/Tacho.svg" alt="Eliminar" width="24" height="24">
                        </button>   
                    </td>
                `;

                // Visualizar inmueble
                fila.querySelector('.btn-visualizar-inmueble').addEventListener('click', function () {
                    const id = this.getAttribute('data-id');
                    abrirModalVisualizarInmueble(id);
                });

                // Modificar inmueble
                fila.querySelector('.btn-modificar-inmueble').addEventListener('click', function () {
                    const id = this.getAttribute('data-id');
                    abrirModalModificarInmueble(id);
                });

                // Eliminar inmueble
                fila.querySelector('.btn-eliminar-inmueble').addEventListener('click', function () {
                   const id = this.getAttribute('data-id');
                  eliminarInmueble(id);
                });
 
                tabla.appendChild(fila);
            });
        })
        .catch(error => {
            console.error("Error al cargar los inmuebles:", error);
        });
}

// Funcion que abre modal para modificar inmuebles
    function abrirModalModificarInmueble(id) {
    fetch(`http://localhost:8080/inmobiliaria/${id}`)
        .then(response => response.json())
        .then(inmueble => {
            const modalModificar = document.getElementById('modal-modificar');
            if (modalModificar) {
                // Precargar los valores del inmueble en los campos
                document.getElementById("modificar-titulo").value = inmueble.titulo || "";
                document.getElementById("modificar-descripcion").value = inmueble.descripcion || "";
                document.getElementById("modificar-ciudad").value = inmueble.ciudad || "";
                document.getElementById("modificar-barrio").value = inmueble.barrio || "";
                document.getElementById("modificar-calle").value = inmueble.calle || "";
                document.getElementById("modificar-altura").value = inmueble.altura || "";
                document.getElementById("modificar-dormitorios").value = inmueble.dormitorios || "";
                document.getElementById("modificar-banios").value = inmueble.banios || "";
                document.getElementById("modificar-superficie").value = inmueble.superficie || "";
                document.getElementById("modificar-precio").value = inmueble.precio || "";
                document.getElementById("modificar-tipoInmueble").value = inmueble.tipoInmueble || "";
                document.getElementById("modificar-operacion").value = inmueble.operacion || "";

                // Guardar el ID en el formulario (puede usarse luego para hacer PUT)
                const formulario = document.getElementById("form-modificar-inmueble");
                formulario.setAttribute("data-id", id);

                modalModificar.style.display = "block";
            }
        })
        .catch(error => {
            console.error("Error al cargar el inmueble para modificar:", error);
        });
}

// Funcion para eliminar inmueble
    function eliminarInmueble(id) {
    idInmuebleAEliminar = id;
    const modal = document.getElementById('modal-confirmacion-eliminar');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Funcion que abre modal para registrar inmueble
    function abrirModalRegistrar() {
        const modalRegistrar = document.getElementById('modal-registrar');
        if (modalRegistrar) {
            modalRegistrar.style.display = 'block';
        }
    }



document.addEventListener('DOMContentLoaded', function (){
    cargarInmuebles();
    const btnAbrirModalRegistrar = document.getElementById("btn-registrar-inmueble");
    if (btnAbrirModalRegistrar) {
        btnAbrirModalRegistrar.addEventListener("click", abrirModalRegistrar);
}


// registrar inmueble
    const formRegistrar = document.getElementById("form-registrar-inmueble");
    if (formRegistrar) {
        formRegistrar.addEventListener("submit", function (e) {
            e.preventDefault(); // evita recarga de la página

        const inmueble = {
            titulo: document.getElementById("titulo").value,
            descripcion: document.getElementById("descripcion").value,
            ciudad: document.getElementById("ciudad").value,
            barrio: document.getElementById("barrio").value,
            calle: document.getElementById("calle").value,
            altura: document.getElementById("altura").value,
            dormitorios: document.getElementById("dormitorios").value,
            banios: document.getElementById("banios").value,
            superficie: document.getElementById("superficie").value,
            precio: document.getElementById("precio").value,
            tipoInmueble: document.getElementById("tipoInmueble").value,
            operacion: document.getElementById("operacion").value
        };

        fetch("http://localhost:8080/inmobiliaria/guardar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inmueble)
        })
        .then(response => {
            if (!response.ok) throw new Error("Error al guardar el inmueble");
            return response.json();
        })
        .then(data => {
            console.log("Inmueble registrado:", data);
            cerrarModal("modal-registrar");
            cargarInmuebles(); // recargar tabla
        })
        .catch(error => {
            console.error("Error al registrar el inmueble:", error);
            alert("Hubo un error al registrar el inmueble.");
        });
    });
}

// modificar inmueble
    const formModificar = document.getElementById("form-modificar-inmueble");
    formModificar.addEventListener("submit", function (e) {
    e.preventDefault(); // evitar recargar

    const id = formModificar.getAttribute("data-id");

    const datos = {
        titulo: document.getElementById("modificar-titulo").value,
        descripcion: document.getElementById("modificar-descripcion").value,
        ciudad: document.getElementById("modificar-ciudad").value,
        barrio: document.getElementById("modificar-barrio").value,
        calle: document.getElementById("modificar-calle").value,
        altura: document.getElementById("modificar-altura").value,
        dormitorios: document.getElementById("modificar-dormitorios").value,
        banios: document.getElementById("modificar-banios").value,
        superficie: document.getElementById("modificar-superficie").value,
        precio: document.getElementById("modificar-precio").value,
        tipoInmueble: document.getElementById("modificar-tipoInmueble").value,
        operacion: document.getElementById("modificar-operacion").value
    };

    fetch(`http://localhost:8080/inmobiliaria/modificar/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })
    .then(response => {
        if (!response.ok) throw new Error("Error al modificar el inmueble");
        return response.json();
    })
    .then(() => {
        cerrarModal("modal-modificar");
        cargarInmuebles(); // refrescar la tabla
    })
    .catch(error => {
        console.error("Error al enviar la modificación:", error);
        alert("No se pudo modificar el inmueble.");
    });
});

// botones dinamicos
    document.querySelectorAll('.btn-visualizar-inmueble').forEach(button => {
    button.addEventListener('click', function () {
        const id = this.getAttribute("data-id");
        abrirModalVisualizarInmueble(id);
    });
    });


    document.querySelectorAll('.btn-modificar-inmueble').forEach(button => {
    button.addEventListener('click', function () {
        const id = this.getAttribute("data-id");
        abrirModalModificarInmueble(id);
    });
    });


    // Botón de eliminar inmueble
    document.querySelectorAll('.btn-eliminar-inmueble').forEach(button => {
        button.addEventListener('click', abrirModalConfirmacionEliminar);
    });

    // confirmar eliminacion
    const btnConfirmarEliminarInmueble = document.getElementById('boton-confirmar-eliminar');
    if (btnConfirmarEliminarInmueble) {
        btnConfirmarEliminarInmueble.onclick = function () {
            if (idInmuebleAEliminar !== null) {
                fetch(`http://localhost:8080/inmobiliaria/eliminar/${idInmuebleAEliminar}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) throw new Error("Error al eliminar inmueble");
                cerrarModal('modal-confirmacion-eliminar');
                idInmuebleAEliminar = null;
                cargarInmuebles(); // refrescar la tabla
            })
            .catch(error => {
                console.error("Error al eliminar inmueble:", error);
                alert("No se pudo eliminar el inmueble.");
            });
        }
    };
}

});
