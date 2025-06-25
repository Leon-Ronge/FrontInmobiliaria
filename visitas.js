function abrirModalReporteVisita() {
    const modal = document.getElementById("modal-reporte-visita");
    if (modal) {
      modal.style.display = "flex";
    }
  }

   function abrirModalModificarVisita(id) {
     const modal = document.getElementById("modal-modificar-visita");
     if (modal) {
       modal.style.display = "block";
     }
  }

 function abrirmodaleliminarvisita(){
     const modal = document.getElementById("modal-confirmacion-eliminar-visita");
     if (modal) {
       modal.style.display = "block";
     }
 }

function abrirModalVisualizarVisita(){
    const modal = document.getElementById("modal-visualizar-visita")
    if(modal){
        modal.style.display = "block";
    }
}

const toggleVisitas = document.getElementById('toggleFiltroVisitas');
  const dropdownVisitas = document.getElementById('filtroDropdownVisitas');

  toggleVisitas.addEventListener('click', () => {
    dropdownVisitas.style.display = dropdownVisitas.style.display === 'block' ? 'none' : 'block';
  });

  // Cierra si clickeás fuera
  document.addEventListener('click', function (event) {
    if (!event.target.closest('.dropdown-filtro')) {
      dropdownVisitas.style.display = 'none';
    }
  });

  function aplicarFiltroVisitas() {
    alert("Filtro aplicado con:\n" +
      "Fecha desde: " + document.getElementById('visitaFechaDesde').value + "\n" +
      "Fecha hasta: " + document.getElementById('visitaFechaHasta').value + "\n" +
      "Tipo de inmueble: " + document.getElementById('visitaTipoInmueble').value + "\n" +
      "Barrio: " + document.getElementById('visitaBarrio').value);

    dropdownVisitas.style.display = 'none';
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

document.getElementById('botonReporte').addEventListener('click', () => {
    // Mostrar el modal
    abrirModal('modal-reporte-visita');

    // Obtener el gráfico
    fetch('http://localhost:8080/reportes/inmuebles-mas-visitados')
        .then(res => res.json())
        .then(data => {
            if (!data || data.length === 0) {
                alert("No hay datos para mostrar en el reporte.");
                return;
            }

            const nombres = data.map(d => d.nombre);
            const visitas = data.map(d => d.visitas);

            const canvas = document.getElementById('graficoVisitas');
            canvas.style.display = 'block';

            const ctx = canvas.getContext('2d');

            if (window.reporteChart) {
                window.reporteChart.destroy();
            }

            window.reporteChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: nombres,
                    datasets: [{
                        label: 'Cantidad de visitas',
                        data: visitas,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Visitas'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Inmuebles'
                            }
                        }
                    }
                }
            });
        })
        .catch(err => {
            console.error("Error al cargar el reporte:", err);
            alert("Hubo un error al generar el reporte.");
        });
});

// Funciones para abrir/cerrar modal
function abrirModal(id) {
    document.getElementById(id).style.display = 'block';
}

function cerrarModal(id) {
    document.getElementById(id).style.display = 'none';
}


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
