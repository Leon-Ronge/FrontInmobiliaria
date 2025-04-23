let filaSeleccionada = null;
let modoEdicion = false;
let visitaSeleccionada = null;
let modoEdicionVisita = false;

function asignarEventoFila(fila) {
  fila.addEventListener('click', (e) => {
    e.stopPropagation();

    // Verificar si la fila pertenece a la tabla de visitas
    const esVisita = fila.closest('.visitas-table') !== null;

    if (esVisita) {
      if (visitaSeleccionada) visitaSeleccionada.classList.remove('seleccionada');
      visitaSeleccionada = fila;
      filaSeleccionada = null; // Limpiar la selección de inmuebles
    } else {
      if (filaSeleccionada) filaSeleccionada.classList.remove('seleccionada');
      filaSeleccionada = fila;
      visitaSeleccionada = null; // Limpiar la selección de visitas
    }

    fila.classList.add('seleccionada');

    // Actualizar el input de inmueble en visitas si hay un modal de visita
    const celdas = fila.querySelectorAll('td');
    const inputInmueble = document.getElementById("input-inmueble");
    if (inputInmueble) {
      inputInmueble.value = celdas[1].textContent; // usa la calle como nombre
    }
  });
}

function mostrarInmuebles() {
  document.getElementById('inicioSection').style.display = 'none';
  document.getElementById('inmueblesSection').style.display = 'block';
  document.getElementById('visitasSection').style.display = 'none';
}

function mostrarInicio() {
  document.getElementById('inmueblesSection').style.display = 'none';
  document.getElementById('visitasSection').style.display = 'none';
  document.getElementById('inicioSection').style.display = 'block';
}

function mostrarModalRegistrar() {
  modoEdicion = false;
  limpiarCampos();
  document.getElementById('modal-titulo').textContent = 'Registrar inmueble';
  document.getElementById('btn-confirmar-modificacion').textContent = 'Confirmar';
  document.getElementById('modal-registrar').style.display = 'block';
}

function limpiarCampos() {
  document.getElementById('input-calle').value = '';
  document.getElementById('input-barrio').value = '';
  document.getElementById('input-piso').value = '';
  document.getElementById('input-metros').value = '';
  document.getElementById('input-condicion').value = 'alquiler';
  document.getElementById('input-visible').checked = false;
  document.getElementById('input-precio').value = '';
}

function agregarInmueble() {
  const calle = document.getElementById('input-calle').value;
  const barrio = document.getElementById('input-barrio').value;
  const piso = document.getElementById('input-piso').value;
  const metros = document.getElementById('input-metros').value;
  const condicion = document.getElementById('input-condicion').value;
  const precio = document.getElementById('input-precio').value;
  const visible = document.getElementById('input-visible').checked;

  const nuevaFila = document.createElement('tr');
  nuevaFila.innerHTML = `
    <td>${Math.floor(Math.random() * 1000000000)}</td>
    <td>${calle}</td>
    <td>${barrio}</td>
    <td>${piso}</td>
    <td>${metros}</td>
    <td>${condicion.charAt(0).toUpperCase() + condicion.slice(1)}</td>
    <td><input type="checkbox" ${visible ? 'checked' : ''}></td>
    <td>$${parseInt(precio).toLocaleString()}</td>
    <td><button class="delete-btn">🗑️</button></td>`;

  const tabla = document.querySelector('tbody');
  tabla.appendChild(nuevaFila);

  nuevaFila.querySelector('.delete-btn').addEventListener('click', () => {
    nuevaFila.remove();
    if (nuevaFila === filaSeleccionada) {
      filaSeleccionada = null;
    }
  });

  asignarEventoFila(nuevaFila);
  document.getElementById('modal-registrar').style.display = 'none';
  limpiarCampos();
}








function modificarInmueble() {
  if (!filaSeleccionada) {
    alert('Seleccioná un inmueble para modificar.');
    return;
  }


  const celdas = filaSeleccionada.querySelectorAll('td');
  document.getElementById('input-calle').value = celdas[1].textContent;
  document.getElementById('input-barrio').value = celdas[2].textContent;
  document.getElementById('input-piso').value = celdas[3].textContent;
  document.getElementById('input-metros').value = celdas[4].textContent;
  document.getElementById('input-condicion').value = celdas[5].textContent.toLowerCase();
  document.getElementById('input-visible').checked = celdas[6].querySelector('input').checked;
  document.getElementById('input-precio').value = celdas[7].textContent.replace(/\D/g, '');

  document.getElementById('modal-titulo').textContent = 'Modificar inmueble';
  document.getElementById('btn-confirmar-modificacion').textContent = 'Confirmar guardar cambios';
  document.getElementById('modal-registrar').style.display = 'block';

  modoEdicion = true; // ✅ Muy importante
  const modalInmueble = new bootstrap.Modal(document.getElementById('modalInmueble'));
  modalInmueble.show(); // ✅ Abrimos el modal
}




function actualizarFilaInmueble() {
  if (!filaSeleccionada) {
    return; // Si no hay ninguna fila seleccionada, salir
  }

  // Actualizar los valores de la fila seleccionada con los nuevos datos del modal
  filaSeleccionada.cells[0].textContent = document.getElementById('input-id').value;
  filaSeleccionada.cells[1].textContent = document.getElementById('input-calle').value;
  filaSeleccionada.cells[2].textContent = document.getElementById('input-barrio').value;
  filaSeleccionada.cells[3].textContent = document.getElementById('input-piso').value;
  filaSeleccionada.cells[4].textContent = document.getElementById('input-metros').value;
  filaSeleccionada.cells[5].textContent = document.getElementById('input-condicion').value;
  filaSeleccionada.cells[6].querySelector('input').checked = document.getElementById('input-visible').checked;
  filaSeleccionada.cells[7].textContent = `$${document.getElementById('input-precio').value}`;

  // Cerrar el modal después de actualizar
  let modal = bootstrap.Modal.getInstance(document.getElementById('modalInmueble'));
  modal.hide();

  // Resetear variables de edición
  modoEdicion = false;
  filaSeleccionada = null;
}






window.onload = function () {
  actualizarHora();
  generarCalendario();

  const modal = document.getElementById('modal-registrar');
  const btn = document.getElementById('btn-registrar');
  const span = document.getElementById('cerrar-modal');

  btn.onclick = mostrarModalRegistrar;
  span.onclick = () => modal.style.display = 'none';

  window.onclick = (event) => {
    // Cerrar modal de registrar
    if (event.target === modal) {
      modal.style.display = 'none';
    }

    // Cerrar modal de registrar visita si se hace clic fuera de él
    const modalVisita = document.getElementById("modal-registrar-visita");
    if (event.target === modalVisita) {
      modalVisita.style.display = "none";
    }
  };

  document.querySelectorAll('tbody tr').forEach(asignarEventoFila);

  document.addEventListener('click', (e) => {
    const tabla = document.querySelector('table');
    if (filaSeleccionada && !tabla.contains(e.target)) {
      filaSeleccionada.classList.remove('seleccionada');
      filaSeleccionada = null;
    }
  });




  document.getElementById('btn-confirmar-modificacion').addEventListener('click', function () {
    if (modoEdicion && filaSeleccionada) {
      actualizarFilaInmueble();
    } else {
      agregarInmueble();
    }
  
    // Después de guardar, restablecer modo
    modoEdicion = false;
    filaSeleccionada = null;
  
    // Limpiar los campos y cerrar el modal
    limpiarCampos();
    document.getElementById('modal-registrar').style.display = 'none';
  });








  document.getElementById("btn-abrir-modal-visita").addEventListener("click", function () {
    document.getElementById("input-inmueble").value = '';
    document.getElementById("modal-registrar-visita").style.display = "block";
  });

  document.getElementById("btn-confirmar-visita").addEventListener("click", function (e) {
    e.preventDefault(); // Esto previene el reload
    const inmueble = document.getElementById("input-inmueble").value;
    const fecha = document.getElementById("input-fecha").value;
    const hora = document.getElementById("input-hora").value;
    const cliente = document.getElementById("input-cliente").value;

    if (modoEdicionVisita && visitaSeleccionada) {
      // Modo de edición: actualizar la visita seleccionada
      if (inmueble && fecha && hora && cliente) {
        // Obtener las celdas de la fila seleccionada
        const celdas = visitaSeleccionada.querySelectorAll('td');

        // Actualizar los valores de la fila seleccionada
        celdas[1].textContent = inmueble; // Inmueble
        celdas[2].textContent = fecha;    // Fecha
        celdas[3].textContent = hora;     // Hora
        celdas[4].textContent = cliente;  // Cliente

        // Restablecer el modo de edición y la visita seleccionada
        modoEdicionVisita = false;
        visitaSeleccionada.classList.remove('seleccionada');
        visitaSeleccionada = null;

        // Cerrar el modal y limpiar los campos
        document.getElementById("modal-registrar-visita").style.display = "none";
        document.querySelector("#modal-registrar-visita form").reset();
      }
    } else {
      // Modo de registro: agregar una nueva visita
      if (inmueble && fecha && hora && cliente) {
        agregarVisita();
        // Cerrar el modal y limpiar los campos
        document.getElementById("modal-registrar-visita").style.display = "none";
        document.querySelector("#modal-registrar-visita form").reset();
      }
    }
  });

  // Cierre del modal al hacer clic fuera de él
  window.onclick = function (event) {
    const modal = document.getElementById("modal-registrar-visita");
    if (event.target === modal) {
      modal.style.display = "none"; // Cierra el modal si se hace clic fuera
    }
  };
};

function actualizarHora() {
  const reloj = document.getElementById('clock');
  const ahora = new Date();
  const horas = ahora.getHours().toString().padStart(2, '0');
  const minutos = ahora.getMinutes().toString().padStart(2, '0');
  reloj.textContent = `${horas}:${minutos}`;
}

function generarCalendario() {
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = fecha.getMonth();
  const hoy = fecha.getDate();
  const primerDia = new Date(año, mes, 1).getDay();
  const ultimoDia = new Date(año, mes + 1, 0).getDate();

  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const calendar = document.getElementById('calendar-table');
  calendar.innerHTML = '';

  const header = document.createElement('tr');
  diasSemana.forEach(dia => {
    const th = document.createElement('th');
    th.textContent = dia;
    header.appendChild(th);
  });
  calendar.appendChild(header);

  let fila = document.createElement('tr');
  for (let i = 0; i < primerDia; i++) {
    fila.appendChild(document.createElement('td'));
  }

  for (let dia = 1; dia <= ultimoDia; dia++) {
    const celda = document.createElement('td');
    celda.textContent = dia;
    if (dia === hoy) {
      celda.classList.add('hoy');
    }
    fila.appendChild(celda);
    if ((primerDia + dia) % 7 === 0) {
      calendar.appendChild(fila);
      fila = document.createElement('tr');
    }
  }

  if (fila.children.length > 0) {
    while (fila.children.length < 7) {
      fila.appendChild(document.createElement('td'));
    }
    calendar.appendChild(fila);
  }
}

// Función para mostrar las visitas
function mostrarVisitas() {
  document.getElementById("inicioSection").style.display = "none";
  document.getElementById("inmueblesSection").style.display = "none";
  document.getElementById("visitasSection").style.display = "block";
}

function agregarVisita() {
  const inmueble = document.getElementById("input-inmueble").value;
  const fecha = document.getElementById("input-fecha").value;
  const hora = document.getElementById("input-hora").value;
  const cliente = document.getElementById("input-cliente").value;

  if (!inmueble || !fecha || !hora || !cliente) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const nuevaFila = document.createElement("tr");
  nuevaFila.innerHTML = `
    <td>${Date.now()}</td>
    <td>${inmueble}</td>
    <td>${fecha}</td>
    <td>${hora}</td>
    <td>${cliente}</td>
    <td><button class="delete-btn">🗑️</button></td>
  `;

  const tabla = document.querySelector(".visitas-table tbody");
  tabla.appendChild(nuevaFila);

  // Asignar evento de eliminación
  nuevaFila.querySelector('.delete-btn').addEventListener('click', () => {
    nuevaFila.remove();
    if (nuevaFila === visitaSeleccionada) {
      visitaSeleccionada = null;
    }
  });

  // Asignar evento de selección a la nueva fila
  asignarEventoFila(nuevaFila);

  document.getElementById("modal-registrar-visita").style.display = "none";
  document.querySelector("#modal-registrar-visita form").reset();
}

// Cierre del modal al hacer clic fuera de él
window.onclick = function (event) {
  const modal = document.getElementById("modal-registrar-visita");
  if (event.target === modal) {
    modal.style.display = "none"; // Cierra el modal si se hace clic fuera
  }
};

function modificarVisita() {
  if (!visitaSeleccionada) {
    alert('Selecciona una visita para modificar.');
    return;
  }

  modoEdicionVisita = true;

  const celdas = visitaSeleccionada.querySelectorAll('td');
  document.getElementById('input-inmueble').value = celdas[1].textContent;
  document.getElementById('input-fecha').value = celdas[2].textContent;
  document.getElementById('input-hora').value = celdas[3].textContent;
  document.getElementById('input-cliente').value = celdas[4].textContent;

  document.getElementById('modal-titulo-visita').textContent = 'Modificar visita';
  document.getElementById('btn-confirmar-visita').textContent = 'Confirmar cambios';
  document.getElementById("modal-registrar-visita").style.display = "block";
}