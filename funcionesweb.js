////////////////          Notas         /////////////

function crearNota() {
  const notasContainer = document.querySelector('.notes');
  const nuevaNota = document.createElement('textarea');
  nuevaNota.className = 'note-input note';
  nuevaNota.placeholder = 'Escribí tu nota y presioná Enter';
  nuevaNota.style.position = 'absolute';
  nuevaNota.style.top = '70px';
  nuevaNota.style.left = '20px';
  nuevaNota.style.minWidth = '150px';
  nuevaNota.style.minHeight = '100px';
  nuevaNota.style.resize = 'both';
  nuevaNota.style.overflow = 'auto';
  notasContainer.prepend(nuevaNota);
  nuevaNota.focus();

  nuevaNota.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nuevaNota.value.trim() !== '') {
        const divNota = crearDivNota(nuevaNota.value, nuevaNota.style.top, nuevaNota.style.left);
        notasContainer.replaceChild(divNota, nuevaNota);
        hacerDraggable(divNota);
      } else {
        nuevaNota.remove();
      }
    }
  });
}

function crearDivNota(texto, top, left) {
  const divNota = document.createElement('div');
  divNota.className = 'note draggable';
  divNota.setAttribute('draggable', 'true');
  divNota.style.top = top;
  divNota.style.left = left;
  divNota.style.position = 'absolute';
  divNota.style.minWidth = '150px';
  divNota.style.minHeight = '100px';
  divNota.style.resize = 'both';
  divNota.style.overflow = 'auto';

  const closeBtn = document.createElement('span');
  closeBtn.className = 'close-btn';
  closeBtn.innerHTML = '&times;';
  closeBtn.onclick = () => divNota.remove();

  const content = document.createElement('div');
  content.className = 'note-content';
  content.textContent = texto;

  content.ondblclick = () => {
    const textarea = document.createElement('textarea');
    textarea.value = content.textContent;
    textarea.className = 'note';
    textarea.style.width = '100%';
    textarea.style.height = '100%';
    textarea.onblur = () => {
      content.textContent = textarea.value;
      divNota.replaceChild(content, textarea);
    };
    divNota.replaceChild(textarea, content);
    textarea.focus();
  };

  divNota.appendChild(closeBtn);
  divNota.appendChild(content);
  return divNota;
}

function hacerDraggable(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    if (e.target.classList.contains('close-btn') || e.target.tagName === 'TEXTAREA') return;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    elmnt.style.position = 'absolute';
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
/////////////////////////////////////////////////////////////////////


////////////////           Hora y calendario           /////////////

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

////////////////////////////  Funciones mostrar ///////////////////////////////////
function irAlLogin() {
  const mainContent = document.querySelector('body');
  mainContent.classList.add('page-transition');
  mainContent.classList.add('slide-out');
  
  setTimeout(() => {
    window.location.href = "login.html";
  }, 500);
}

function iniciarSesion() {
  const contenedor = document.body; 
  contenedor.classList.add("animate-slide-in");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 500); 
}


function mostrarInicio() {
  document.getElementById('inicioSection').style.display = 'block';
  document.getElementById('inmueblesSection').style.display = 'none';
  document.getElementById('visitasSection').style.display = 'none';
  document.getElementById('usuariosSection').style.display = 'none';
}

function mostrarInmuebles() {
  document.getElementById('inicioSection').style.display = 'none';
  document.getElementById('inmueblesSection').style.display = 'block';
  document.getElementById('visitasSection').style.display = 'none';
  document.getElementById('usuariosSection').style.display = 'none';
}

function mostrarVisitas() {
  document.getElementById('inicioSection').style.display = 'none';
  document.getElementById('inmueblesSection').style.display = 'none';
  document.getElementById('visitasSection').style.display = 'block';
  document.getElementById('usuariosSection').style.display = 'none';
}

function mostrarUsuarios() {
  document.getElementById('inicioSection').style.display = 'none';
  document.getElementById('inmueblesSection').style.display = 'none';
  document.getElementById('visitasSection').style.display = 'none';
  document.getElementById('usuariosSection').style.display = 'block';
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

////////////////                         Windload                                //////////////////////

window.onload = function () {
  actualizarHora();
  generarCalendario();

  const modal = document.getElementById('modal-registrar');
  const btn = document.getElementById('btn-registrar');
  const span = document.getElementById('cerrar-modal');
  const modalVisita = document.getElementById("modal-registrar-visita");
  
  const spans = document.querySelectorAll('.cerrar-modal');

}


// // CONEXION DE FRONTEND CON BACKEND

// // REGISTRAR VISITAS

// let boton = document.getElementById("btn-confirmar-visita");

// boton.addEventListener("click", evento=>{
//     evento.preventDefault();
//     registrarVisitas();
// });


// let registrarVisitas = async () => {
//     let campos = {
//         nombre: document.getElementById("input-cliente").value,
//         fecha: document.getElementById("input-fecha").value,
//         hora: document.getElementById("input-hora").value,
//         inmuebleVisita: document.getElementById("input-inmueble").value
//     };
    
//     const peticion = await fetch("http://localhost:8080/consulta/guardar", {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(campos)
//     });


//     const respuesta = await peticion.json();
//     console.log(respuesta);
//     document.getElementById("visitaForm").reset();
// }

// // CONSULTAR VISITAS

// let cargarVisitas = async () => {
//   const respuesta = await fetch("http://localhost:8080/consulta", {
//       method: 'GET',
//       headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//       }
//   });
//   const visitas = await respuesta.json();

//   // Obtener el cuerpo de la tabla donde se agregarán las filas
//   let tablaCuerpo = document.querySelector(".visitas-table tbody");
//   tablaCuerpo.innerHTML = ""; // Limpiar las filas anteriores

//   // Iterar sobre las visitas y crear una fila para cada una
//   visitas.forEach(v => {
//       let fila = document.createElement("tr");

//       // Crear las celdas para cada propiedad de la visita
//       let celdaId = document.createElement("td");
//       celdaId.textContent = v.id; // Asumiendo que la propiedad id existe
//       fila.appendChild(celdaId);

//       let celdaInmueble = document.createElement("td");
//       celdaInmueble.textContent = v.inmuebleVisita; // Asegúrate de que esta propiedad existe
//       fila.appendChild(celdaInmueble);

//       let celdaFecha = document.createElement("td");
//       celdaFecha.textContent = v.fecha; // Asumiendo que la propiedad fecha existe
//       fila.appendChild(celdaFecha);

//       let celdaHora = document.createElement("td");
//       celdaHora.textContent = v.hora; // Asegúrate de que esta propiedad existe
//       fila.appendChild(celdaHora);

//       let celdaCliente = document.createElement("td");
//       celdaCliente.textContent = v.nombre; // Combinando nombre y apellido del cliente
//       fila.appendChild(celdaCliente);

//       // Agregar la fila a la tabla
//       tablaCuerpo.appendChild(fila);
//   });

// };

// // REGISTRAR INMUEBLE

// document.getElementById("btn-confirmar-registro-inmuebles").addEventListener("click", function () {
//   const inmueble = {
//     calle: document.getElementById("input-calle").value,
//     barrio: document.getElementById("input-barrio").value,
//     piso: document.getElementById("input-piso").value,
//     metros: document.getElementById("input-metros").value,
//     condicion: document.getElementById("input-condicion").value,
//     visible: document.getElementById("input-visible").value,
//     precio: document.getElementById("input-precio").value
//   };

//   fetch("http://localhost:8080/inmobiliaria/guardar", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(inmueble)
//   })
//     .then(response => {
//       if (!response.ok) throw new Error("Error al registrar");
//       return response.json();
//     })
//     .then(data => {
//       alert("¡Inmueble registrado correctamente!");
//       document.getElementById("modal-registrar").style.display = "none";
//       if (typeof cargarInmuebles === "function") cargarInmuebles();
//     })
//     .catch(err => {
//       console.error(err);
//       alert("Error al registrar el inmueble");
//     });
// });

// //MOSTRAR INMUEBLE REGISTRADO

// let cargarInmuebles = async () => {
//   const respuesta = await fetch("http://localhost:8080/inmobiliaria/listar", {
//     method: 'GET',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     }
//   });

//   const inmuebles = await respuesta.json();

//   // Cambiado a la tabla correcta
//   let tablaCuerpo = document.querySelector(".inmuebles-table tbody");
//   tablaCuerpo.innerHTML = ""; // Limpiar las filas anteriores

//   // Iterar sobre los inmuebles e imprimir datos
//   inmuebles.forEach(v => {
//     let fila = document.createElement("tr");

//     let celdaId = document.createElement("td");
//     celdaId.textContent = v.id;
//     fila.appendChild(celdaId);

//     let celdaCalle = document.createElement("td");
//     celdaCalle.textContent = v.calle;
//     fila.appendChild(celdaCalle);

//     let celdaBarrio = document.createElement("td");
//     celdaBarrio.textContent = v.barrio;
//     fila.appendChild(celdaBarrio);

//     let celdaPiso = document.createElement("td");
//     celdaPiso.textContent = v.piso || "-";
//     fila.appendChild(celdaPiso);

//     let celdaMetros = document.createElement("td");
//     celdaMetros.textContent = v.metros;
//     fila.appendChild(celdaMetros);

//     let celdaCondicion = document.createElement("td");
//     celdaCondicion.textContent = v.condicion;
//     fila.appendChild(celdaCondicion);

//     let celdaVisible = document.createElement("td");
//     celdaVisible.textContent = v.visible ? "Sí" : "No";
//     fila.appendChild(celdaVisible);

//     let celdaPrecio = document.createElement("td");
//     celdaPrecio.textContent = v.precio;
//     fila.appendChild(celdaPrecio);


//     tablaCuerpo.appendChild(fila);
//   });
// };

// // MODIFICAR INMUEBLES

// function modificarInmueble() {
//   const id = document.getElementById("input-id-modificar").value;

//   if (!id) {
//     alert("Por favor, ingresa un ID válido.");
//     return;
//   }

//   // URL correcta al endpoint GET (¡no al PUT!)
//   fetch(`http://localhost:8080/inmobiliaria/listar`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error("Error al consultar inmuebles");
//       }
//       return response.json();
//     })
//     .then(data => {
//       // Buscar inmueble por ID en la lista devuelta
//       const inmueble = data.find(i => i.id == id);

//       if (!inmueble) {
//         alert("No se encontró el inmueble con ese ID.");
//         return;
//       }

//       // Cargar datos en el modal
//       document.getElementById("input-calle").value = inmueble.calle;
//       document.getElementById("input-barrio").value = inmueble.barrio;
//       document.getElementById("input-piso").value = inmueble.piso;
//       document.getElementById("input-metros").value = inmueble.metros;
//       document.getElementById("input-condicion").value = inmueble.condicion;
//       document.getElementById("input-visible").value = inmueble.visible;
//       document.getElementById("input-precio").value = inmueble.precio;

//       // Guardar ID en el botón de confirmar
//       document.getElementById("btn-confirmar-modificacion").setAttribute("data-id", id);

//       // Mostrar el modal
//       document.getElementById("modal-registrar").style.display = "block";
//       document.getElementById("modal-titulo").textContent = "Modificar inmueble";
//     })
//     .catch(error => {
//       console.error("Error:", error);
//       alert("Hubo un problema al buscar el inmueble.");
//     });
// }
// document.getElementById("btn-confirmar-modificacion").addEventListener("click", function (event) {
//   event.preventDefault(); // Evita que se recargue el formulario

//   const id = this.getAttribute("data-id"); // Recupera el ID del inmueble a modificar

//   // Armar objeto con los valores del formulario
//   const inmueble = {
//     calle: document.getElementById("input-calle").value,
//     barrio: document.getElementById("input-barrio").value,
//     piso: document.getElementById("input-piso").value,
//     metros: document.getElementById("input-metros").value,
//     condicion: document.getElementById("input-condicion").value,
//     visible: document.getElementById("input-visible").value,
//     precio: document.getElementById("input-precio").value
//   };

//   // Enviar PUT al backend
//   fetch(`http://localhost:8080/inmobiliaria/modificar/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(inmueble)
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error("Error al modificar el inmueble.");
//       }
//       return response.json();
//     })
//     .then(data => {
//       alert("Inmueble modificado correctamente.");
//       document.getElementById("modal-registrar").style.display = "none"; // Cierra el modal

//       // Si tenés una función para recargar la tabla:
//       if (typeof cargarInmuebles === "function") {
//         cargarInmuebles();
//       }
//     })
//     .catch(error => {
//       console.error("Error al modificar:", error);
//       alert("Ocurrió un error al modificar el inmueble.");
//     });
// });



// // ELIMINAR INMUEBLES

// function eliminarInmueble() {
//   const id = document.getElementById("input-id-eliminar").value;

//   if (!id) {
//     alert("Por favor, ingresa un ID válido.");
//     return;
//   }

//   if (!confirm(`¿Estás seguro que deseas eliminar el inmueble con ID ${id}?`)) {
//     return;
//   }

//   fetch(`http://localhost:8080/inmobiliaria/eliminar/${id}`, {
//     method: "DELETE"
//   })
//     .then(res => {
//       if (res.ok) {
//         alert("Inmueble eliminado correctamente");
//         cargarInmuebles(); // Refrescar la tabla
//       } else {
//         alert("Error al eliminar el inmueble. Verifica el ID.");
//       }
//     })
//     .catch(error => {
//       console.error("Error:", error);
//       alert("Hubo un problema al intentar eliminar el inmueble.");
//     });
// }

