let idVisitaAEliminar = null;

document.addEventListener('DOMContentLoaded', function () {
    cargarVisitas();

    document.getElementById("btnregistrarvisita")?.addEventListener("click", () => {
        document.getElementById('modal-registrar-visita').style.display = 'block';
        cargarInmueblesParaVisita();
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
                limpiarFormularioVisita();
                cargarVisitas();
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
                id: parseInt(document.getElementById("inmuebleModificar").value)
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
        .then(r => r.json())
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
    fetch(`http://localhost:8080/visita/consultar/${id}`)
        .then(r => r.json())
        .then(visita => {
            document.getElementById("nombreModificar").value = visita.nombre;
            document.getElementById("apellidoModificar").value = visita.apellido;
            document.getElementById("dniModificar").value = visita.dni;
            document.getElementById("telefonoModificar").value = visita.telefono;
            document.getElementById("fechaModificar").value = visita.fecha;
            document.getElementById("horaModificar").value = visita.hora;
            document.getElementById("inmuebleModificar").value = visita.inmueble.id;

            const formulario = document.getElementById("modificarVisitaForm");
            formulario.setAttribute("data-id", id);
            document.getElementById("modal-modificar-visita").style.display = "block";
        })
        .catch(error => {
            console.error("Error al cargar visita para modificar:", error);
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
