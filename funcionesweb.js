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
  document.getElementById('ventasSection').style.display = 'none';
}


function mostrarInmuebles() {
  document.getElementById('inicioSection').style.display = 'none';
  document.getElementById('inmueblesSection').style.display = 'block';
  document.getElementById('visitasSection').style.display = 'none';
  document.getElementById('usuariosSection').style.display = 'none';
  document.getElementById('ventasSection').style.display = 'none';
  cargarInmuebles();
}

function mostrarVisitas() {
  document.getElementById('inicioSection').style.display = 'none';
  document.getElementById('inmueblesSection').style.display = 'none';
  document.getElementById('visitasSection').style.display = 'block';
  document.getElementById('usuariosSection').style.display = 'none';
  document.getElementById('ventasSection').style.display = 'none';
}

function mostrarUsuarios() {
  document.getElementById('inicioSection').style.display = 'none';
  document.getElementById('inmueblesSection').style.display = 'none';
  document.getElementById('visitasSection').style.display = 'none';
  document.getElementById('usuariosSection').style.display = 'block';
  document.getElementById('ventasSection').style.display = 'none';
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

function mostrarVentas() {
  document.getElementById('inicioSection').style.display = 'none';
  document.getElementById('inmueblesSection').style.display = 'none';
  document.getElementById('visitasSection').style.display = 'none';
  document.getElementById('usuariosSection').style.display = 'none';
  document.getElementById('ventasSection').style.display = 'block';
}


////////////////                         Windload                                //////////////////////

window.onload = function () {
  generarCalendario();

  actualizarHora(); 
  setInterval(actualizarHora, 1000); 

  const modal = document.getElementById('modal-registrar');
  const btn = document.getElementById('btn-registrar');
  const span = document.getElementById('cerrar-modal');
  const modalVisita = document.getElementById("modal-registrar-visita");
  
  const spans = document.querySelectorAll('.cerrar-modal');
}
