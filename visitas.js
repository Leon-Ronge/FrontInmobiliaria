//agregar slect en registrar visita
/*let contadorInmueblesVisita = 1;

document.getElementById("agregar-inmueble-btn-visita").addEventListener("click", function () {
  contadorInmueblesVisita++;

  const container = document.getElementById("inmuebles-container-visita");

  const wrapper = document.createElement("div");
  wrapper.className = "inmueble-wrapper";

  const nuevoSelect = document.createElement("select");
  nuevoSelect.className = "inmueble-select";
  nuevoSelect.name = "inmueble";
  nuevoSelect.required = true;

  nuevoSelect.innerHTML = `
    <option disabled selected>Seleccionar inmueble</option>
    <option>(inmueble)</option>
  `;

  const botonEliminar = document.createElement("button");
  botonEliminar.type = "button";
  botonEliminar.textContent = "❌";
  botonEliminar.className = "btn-eliminar-inmueble";
  botonEliminar.onclick = function () {
    wrapper.remove();
  };

  wrapper.appendChild(nuevoSelect);
  wrapper.appendChild(botonEliminar);

  container.appendChild(wrapper);
});

//agregar select modificar visitas
let contadorInmueblesVisitaModificar = 1;

document.getElementById("agregar-inmueble-btn-visita-modificar").addEventListener("click", function () {
    const container = document.getElementById("inmuebles-container-visita-modificar");
  
    const wrapper = document.createElement("div");
    wrapper.className = "inmueble-wrapper";
  
    const nuevoSelect = document.createElement("select");
    nuevoSelect.className = "inmueble-select";
    nuevoSelect.name = "inmueble";
    nuevoSelect.required = true;
  
    nuevoSelect.innerHTML = `
      <option disabled selected>Seleccionar inmueble</option>
      <option>(inmueble)</option>
    `;
  
    const eliminarBtn = document.createElement("button");
    eliminarBtn.type = "button";
    eliminarBtn.textContent = "❌";
    eliminarBtn.className = "btn-eliminar-inmueble";
    eliminarBtn.onclick = () => wrapper.remove();
  
    wrapper.appendChild(nuevoSelect);
    wrapper.appendChild(eliminarBtn);
    container.appendChild(wrapper);
});*/


let idVisitaAEliminar = null;

function abrirModalRegistrarVisita() {
    document.getElementById('modal-registrar-visita').style.display = 'block';
    cargarInmueblesParaVisita(); // ya definida, carga el combo de inmuebles
}

document.addEventListener('DOMContentLoaded', function () {
    cargarVisitas();

    document.getElementById("btnregistrarvisita")?.addEventListener("click", () => {
        document.getElementById('modal-registrar-visita').style.display = 'block';
        cargarInmueblesParaVisita();
    });

    document.getElementById("botonemitirlistadovisitas").addEventListener("click", () => {
        window.open("http://localhost:8080/visita/pdf", "_blank");
    });

    document.getElementById("boton-limpiar-visita")?.addEventListener("click", (e) => {
        e.preventDefault();
        limpiarFormularioVisita();
    });

    document.getElementById("visitaForm")?.addEventListener("submit", function (e) {
        e.preventDefault();

        const visita = {
            nombre: document.getElementById("nombreVisita").value,
            apellido: document.getElementById("apellidoVisita").value,
            dni: document.getElementById("dniVisita").value,
            telefono: document.getElementById("telefonoVisita").value,
            fecha: document.getElementById("fechaVisita").value,
            hora: document.getElementById("horaVisita").value,
            inmueble: {
                id: parseInt(document.getElementById("inmueble-registrar-visita").value)
            }
        };

        fetch("http://localhost:8080/visita/guardar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(visita)
        })
            .then(r => r.json())
            .then(() => {
                cerrarModal("modal-registrar-visita");
                console.log("Enviando visita:", visita);
                cargarVisitas();
                limpiarFormularioVisita();
            })
            .catch(error => {
                console.error("Error al registrar visita:", error);
                alert("Error al registrar la visita.");
            });
    });

    document.getElementById("modificarVisitaForm")?.addEventListener("submit", function (e) {
        e.preventDefault();

        const id = this.getAttribute("data-id");

        const datos = {
            nombre: document.getElementById("nombreModificar").value,
            apellido: document.getElementById("apellidoModificar").value,
            dni: document.getElementById("dniModificar").value,
            telefono: document.getElementById("telefonoModificar").value,
            fecha: document.getElementById("fechaModificar").value,
            hora: document.getElementById("horaModificar").value,
            inmueble: {
                id: parseInt(document.getElementById("inmueble-modificar-visita").value)
            }
        };

        fetch(`http://localhost:8080/visita/modificar/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        })
            .then(r => r.json())
            .then(() => {
                cerrarModal("modal-modificar-visita");
                cargarVisitas();
            })
            .catch(error => {
                console.error("Error al modificar visita:", error);
                alert("Error al modificar la visita.");
            });
    });

    document.getElementById("boton-confirmar-eliminar-visita")?.addEventListener("click", () => {
        if (idVisitaAEliminar !== null) {
            fetch(`http://localhost:8080/visita/eliminar/${idVisitaAEliminar}`, {
                method: 'DELETE'
            })
                .then(r => {
                    if (!r.ok) throw new Error("No se pudo eliminar");
                    cerrarModal("modal-confirmacion-eliminar-visita");
                    idVisitaAEliminar = null;
                    cargarVisitas();
                })
                .catch(error => {
                    alert(error.message);
                });
        }
    });
});

function cargarVisitas() {
    fetch("http://localhost:8080/visita/consultar")
        .then(response => response.json())
        .then(visitas => {
            const tabla = document.getElementById("tabla-resumida-visitas");
            tabla.innerHTML = "";

            visitas.forEach(visita => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${visita.fecha}</td>
                    <td>${visita.hora}</td>
                    <td>${visita.nombre} ${visita.apellido}</td>
                    <td>${visita.inmueble?.titulo || "-"}</td>
                    <td>${visita.dni}</td>
                    <td>${visita.telefono}</td>
                    <td>
                        <button onclick="abrirModalVisualizarVisita(${visita.id})"><img src="svg/Ojo.svg" width="24"></button>
                        <button onclick="abrirModalModificarVisita(${visita.id})"><img src="svg/Lapiz.svg" width="24"></button>
                        <button onclick="eliminarVisita(${visita.id})"><img src="svg/Tacho.svg" width="24"></button>
                    </td>`;
                tabla.appendChild(fila);
            });
        })
        .catch(error => console.error("Error al cargar visitas:", error));
}

function abrirModalVisualizarVisita(id) {
    fetch(`http://localhost:8080/visita/consultar/${id}`)
        .then(r => r.json())
        .then(visita => {
            document.getElementById("visita-fecha").innerText = `Fecha: ${visita.fecha}`;
            document.getElementById("visita-hora").innerText = `Hora: ${visita.hora}`;
            document.getElementById("visita-cliente").innerText = `Cliente: ${visita.nombre} ${visita.apellido}`;
            document.getElementById("visita-dni").innerText = `DNI: ${visita.dni}`;
            document.getElementById("visita-telefono").innerText = `Teléfono: ${visita.telefono}`;
            document.getElementById("visita-inmueble").innerText = `Inmueble: ${visita.inmueble?.titulo || "-"}`;
            document.getElementById("modal-visualizar-visita").style.display = "block";
        })
        .catch(error => {
            console.error("Error al visualizar visita:", error);
            alert("No se pudo cargar la visita.");
        });
}

function abrirModalModificarVisita(id) {
    const select = document.getElementById("inmueble-modificar-visita");

    // Primero cargamos los inmuebles
    fetch("http://localhost:8080/inmobiliaria/listar")
        .then(response => response.json())
        .then(inmuebles => {
            // Limpiamos el select
            select.innerHTML = '<option disabled selected>Seleccionar inmueble</option>';

            // Agregamos opciones
            inmuebles.forEach(inmueble => {
                const option = document.createElement("option");
                option.value = inmueble.id;
                option.textContent = inmueble.titulo;
                select.appendChild(option);
            });

            // Luego de poblar el select, cargamos la visita
            return fetch(`http://localhost:8080/visita/consultar/${id}`);
        })
        .then(response => response.json())
        .then(visita => {
            document.getElementById("nombreModificar").value = visita.nombre;
            document.getElementById("apellidoModificar").value = visita.apellido;
            document.getElementById("dniModificar").value = visita.dni;
            document.getElementById("telefonoModificar").value = visita.telefono;
            document.getElementById("fechaModificar").value = visita.fecha;
            document.getElementById("horaModificar").value = visita.hora;

            // Asignar el inmueble en el select
            document.getElementById("inmueble-modificar-visita").value = visita.inmueble.id;

            // Abrir el modal
            const formulario = document.getElementById("modificarVisitaForm");
            formulario.setAttribute("data-id", id);
            document.getElementById("modal-modificar-visita").style.display = "block";
        })
        .catch(error => {
            console.error("Error al abrir modal de modificar visita:", error);
            alert("No se pudo cargar la visita.");
        });
}


function eliminarVisita(id) {
    idVisitaAEliminar = id;
    document.getElementById("modal-confirmacion-eliminar-visita").style.display = "block";
}

function limpiarFormularioVisita() {
    document.getElementById("nombreVisita").value = "";
    document.getElementById("apellidoVisita").value = "";
    document.getElementById("dniVisita").value = "";
    document.getElementById("telefonoVisita").value = "";
    document.getElementById("fechaVisita").value = "";
    document.getElementById("horaVisita").value = "";
    document.getElementById("inmueble-registrar-visita").value = "";
}

function cargarInmueblesParaVisita() {
    fetch("http://localhost:8080/inmobiliaria/listar")
        .then(r => r.json())
        .then(data => {
            const select = document.getElementById("inmueble-registrar-visita");
            select.innerHTML = '<option disabled selected>Seleccionar inmueble</option>';
            data.forEach(inmueble => {
                const option = document.createElement("option");
                option.value = inmueble.id;
                option.textContent = inmueble.titulo;
                select.appendChild(option);
            });

            const selectModificar = document.getElementById("inmuebleModificar");
            if (selectModificar) {
                selectModificar.innerHTML = '<option disabled selected>Seleccionar inmueble</option>';
                data.forEach(inmueble => {
                    const option = document.createElement("option");
                    option.value = inmueble.id;
                    option.textContent = inmueble.titulo;
                    selectModificar.appendChild(option);
                });
            }
        })
        .catch(error => {
            console.error("Error al cargar inmuebles:", error);
        });
}

function cerrarModal(idModal) {
    document.getElementById(idModal).style.display = "none";
}
