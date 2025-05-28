// === VARIABLES GLOBALES ===
let idVisitaAEliminar = null;

// === FUNCIONES ===

// Abrir modal para registrar visita
function abrirModalRegistrarVisita() {
    const modal = document.getElementById('modal-registrar-visita');
    if (modal) modal.style.display = 'block';
}

// Limpiar formulario
function limpiarFormularioVisita() {
    document.getElementById("nombreVisita").value = "";
    document.getElementById("apellidoVisita").value = "";
    document.getElementById("dniVisita").value = "";
    document.getElementById("telefonoVisita").value = "";
    document.getElementById("fechaVisita").value = "";
    document.getElementById("horaVisita").value = "";
    document.getElementById("inmuebleVisita").value = "";
}

// Abrir modal para visualizar visita
function abrirModalVisualizarVisita(id) {
    fetch(`http://localhost:8080/visita/consultar/${parseInt(id)}`)
        .then(response => response.json())
        .then(visita => {
            document.getElementById("visita-fecha").innerText = `Fecha: ${visita.fecha || "-"}`;
            document.getElementById("visita-hora").innerText = `Hora: ${visita.hora || "-"}`;
            document.getElementById("visita-cliente").innerText = `Cliente: ${visita.nombre || ""} ${visita.apellido || ""}`;
            document.getElementById("visita-dni").innerText = `DNI: ${visita.dni || "-"}`;
            document.getElementById("visita-telefono").innerText = `Teléfono: ${visita.telefono || "-"}`;
            document.getElementById("visita-inmueble").innerText = `Inmueble: ${visita.inmuebleVisita || "-"}`;

            document.getElementById('modal-visualizar-visita').style.display = 'block';
        })
        .catch(error => {
            console.error("Error al visualizar la visita: ", error);
            alert("No se pudo cargar la visita");
        });
}

// Cargar todas las visitas y mostrarlas en tabla
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
                    <td>${visita.inmuebleVisita}</td>
                    <td>${visita.dni}</td>
                    <td>${visita.telefono}</td>
                    <td>
                        <button class="btn-visualizar-visita" data-id="${visita.id}">
                            <img src="svg/Ojo.svg" alt="Visualizar" width="24" height="24">
                        </button>
                    </td>
                `;

                fila.querySelector('.btn-visualizar-visita').addEventListener('click', function () {
                    abrirModalVisualizarVisita(this.getAttribute('data-id'));
                });

                tabla.appendChild(fila);
            });
        })
        .catch(error => {
            console.error("Error al cargar las visitas:", error);
        });
}

// === EVENTOS ===
document.addEventListener('DOMContentLoaded', function () {
    cargarVisitas();

    // Botón para abrir modal de registrar visita
    const btnRegistrarVisita = document.getElementById("btnregistrarvisita");
    if (btnRegistrarVisita) {
        btnRegistrarVisita.addEventListener("click", abrirModalRegistrarVisita);
    }

    // Botón limpiar
    const btnLimpiarVisita = document.getElementById("boton-limpiar-visita");
    if (btnLimpiarVisita) {
        btnLimpiarVisita.addEventListener("click", function (e) {
            e.preventDefault();
            limpiarFormularioVisita();
        });
    }

    // Formulario registrar visita
    const formRegistrarVisita = document.getElementById("visitaForm");
    if (formRegistrarVisita) {
        formRegistrarVisita.addEventListener("submit", function (e) {
            e.preventDefault();

            const visita = {
                nombre: document.getElementById("nombreVisita").value,
                apellido: document.getElementById("apellidoVisita").value,
                dni: document.getElementById("dniVisita").value,
                telefono: document.getElementById("telefonoVisita").value,
                fecha: document.getElementById("fechaVisita").value,
                hora: document.getElementById("horaVisita").value,
                inmuebleVisita: document.getElementById("inmuebleVisita").value
            };

            fetch("http://localhost:8080/visita/guardar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(visita)
            })
                .then(response => {
                    if (!response.ok) throw new Error("Error al guardar la visita");
                    return response.json();
                })
                .then(() => {
                    cerrarModal("modal-registrar-visita");
                    cargarVisitas();
                })
                .catch(error => {
                    console.error("Error al registrar la visita:", error);
                    alert("Hubo un error al registrar la visita.");
                });
        });
    }
});
