function mostrarVentas() {
  document.getElementById('inicioSection').style.display = 'none';
  document.getElementById('inmueblesSection').style.display = 'none';
  document.getElementById('ventasSection').style.display = 'block';
  document.getElementById('visitasSection').style.display = 'none';
  document.getElementById('usuariosSection').style.display = 'none';

  cargarVentas();
}
/*
function abrirModalVisualizarVenta() {
  const modal = document.getElementById("modal-visualizar-venta")
  if (modal) {
    modal.style.display = "block";
  }
}
*/
function abrirModalRegistrarVenta() {
  const modal = document.getElementById("modal-registrar-venta")
  if (modal) {
    modal.style.display = "block";
  }
}/*
function abrirModalModificarVenta() {
  const modal = document.getElementById("modal-modificar-venta")
  if (modal) {
    modal.style.display = "block";
  }
}
*/
///////

const toggleBtn = document.getElementById('toggleFiltro');
const dropdown = document.getElementById('filtroDropdown');

toggleBtn.addEventListener('click', () => {
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', function (event) {
  if (!event.target.closest('.dropdown-filtro')) {
    dropdown.style.display = 'none';
  }
});

/////////////
let ventaIdActual = null;
/////////////

function obtenerFiltrosVenta() {
  return {
    fechaDesde: document.getElementById("fechaDesde").value,
    fechaHasta: document.getElementById("fechaHasta").value,
    precioDesde: document.getElementById("precioDesde").value,
    precioHasta: document.getElementById("precioHasta").value,
    tipoInmueble: document.getElementById("VentatipoInmueble").value,
    barrio: document.getElementById("Ventasbarrio").value
  };
}

function construirURL(base, filtros) {
  const params = [];

  if (filtros.fechaDesde) params.push(`fechaInicio=${filtros.fechaDesde}`);
  if (filtros.fechaHasta) params.push(`fechaFin=${filtros.fechaHasta}`);
  if (filtros.precioDesde) params.push(`precioMin=${filtros.precioDesde}`);
  if (filtros.precioHasta) params.push(`precioMax=${filtros.precioHasta}`);
  if (filtros.tipoInmueble) params.push(`tipoInmueble=${encodeURIComponent(filtros.tipoInmueble)}`);
  if (filtros.barrio) params.push(`barrio=${encodeURIComponent(filtros.barrio)}`);

  return `${base}?${params.join("&")}`;
}

function obtenerCredenciales() {
  return btoa("admin:servicio1234");
}

function emitirListadoVentas() {
  const filtros = obtenerFiltrosVenta();
  const url = construirURL("http://localhost:8080/venta/pdf", filtros);
  const credenciales = obtenerCredenciales();

  fetch(url, {
    headers: {
      "Authorization": "Basic " + credenciales
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al generar el PDF");
      return res.blob();
    })
    .then(blob => {
      const urlBlob = URL.createObjectURL(blob);
      window.open(urlBlob, "_blank");
    })
    .catch(error => {
      console.error("Error al emitir PDF de ventas:", error);
      alert("No se pudo generar el PDF.");
    });
}

function generarColoresAleatorios(cantidad) {
  const colores = [];
  for (let i = 0; i < cantidad; i++) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    colores.push(`rgba(${r}, ${g}, ${b}, 0.6)`);
  }
  return colores;
}

function emitirReporteGraficoVentas() {
  const filtros = obtenerFiltrosVenta();
  const url = construirURL("http://localhost:8080/reportes/ventas-filtradas", filtros);
  const credenciales = obtenerCredenciales();

  fetch(url, {
    headers: {
      "Authorization": "Basic " + credenciales
    }
  })
    .then(res => res.json())
    .then(data => {
      if (!data || data.length === 0) {
        alert("No hay datos para mostrar en el reporte.");
        return;
      }

      const labels = data.map(d => d.titulo);
      const valores = data.map(d => d.ventas);
      const colores = generarColoresAleatorios(valores.length);

      const ctx = document.getElementById("graficoVentas").getContext("2d");

      if (window.ventasChart) {
        window.ventasChart.destroy();
      }

      window.ventasChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [{
            label: "Ventas por inmueble",
            data: valores,
            backgroundColor: colores,
            borderColor: colores.map(c => c.replace("0.6", "1")),
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: "Reporte de Ventas" }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: 'Ventas' }
            },
            x: {
              title: { display: true, text: 'Inmuebles' },
              barPercentage: 0.6,
              categoryPercentage: 0.6
            }
          }

        }
      });
    })
    .catch(error => {
      console.error("Error al generar gráfico de ventas:", error);
      alert("No se pudo generar el reporte.");
    });
}

function eliminarInmuebleDelSelect(idInmueble) {
  const select = document.getElementById("inmueble-venta");
  const opcion = select.querySelector(`option[value="${idInmueble}"]`);
  if (opcion) {
    opcion.remove();
  }
}

// Cargar ventas desde el backend
function cargarVentas() {
  const usuario = "admin";
  const password = "servicio1234";
  const credenciales = btoa(usuario + ":" + password);
  fetch('http://localhost:8080/venta/listar', {
    headers: {
      "Authorization": "Basic " + credenciales
    }
  })
    .then(response => response.json())
    .then(data => {
      const tbody = document.getElementById('tabla-resumida-ventas');
      tbody.innerHTML = '';

      data.forEach(venta => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${venta.inmueble?.titulo || 'Sin título'}</td>
          <td>${venta.nombreCliente}</td>
          <td>${venta.fecha?.split('T')[0] || ''}</td>
          <td>$${venta.precio || '0'}</td>
          <td>${venta.estado}</td>
          <td>
            <button class="icon-button" onclick="visualizarVenta(${venta.id})"><img src="svg/Ojo.svg" width="24"></button>
            <button class="icon-button" onclick="abrirModalModificarVenta(${venta.id})"><img src="svg/Lapiz.svg" width="24"></button>
          </td>
        `;
        tbody.appendChild(fila);
      });
    })
    .catch(error => console.error('Error al cargar ventas:', error));
}

// Cargar inmuebles
function cargarInmueblesParaVenta(selectId = "inmueble-venta") {
  const usua = "admin";
  const password = "servicio1234";
  const credenciales = btoa(usua + ":" + password);
  fetch("http://localhost:8080/inmobiliaria/listar", {
    headers: {
      "Authorization": "Basic " + credenciales
    }
  })
    .then(response => response.json())
    .then(data => {
      const select = document.getElementById(selectId);
      select.innerHTML = '<option disabled selected>Seleccionar inmueble</option>';

      data.forEach(inmueble => {
        const option = document.createElement("option");
        option.value = inmueble.id;
        option.textContent = inmueble.titulo;
        select.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Error al cargar inmuebles:", error);
      alert("No se pudieron cargar los inmuebles.");
    });
}

// Abrir modal de registrar venta
function abrirModalRegistrarVenta() {
  const modalRegistrarVenta = document.getElementById('modal-registrar-venta');
  if (modalRegistrarVenta) {
    cargarInmueblesParaVenta("inmueble-venta");
    modalRegistrarVenta.style.display = 'block';
  }
}

// Abrir modal de modificar y cargar datos
function abrirModalModificarVenta(id) {
  cargarInmueblesParaVenta("modificar-inmueble-venta");
  const usua = "admin";
  const password = "servicio1234";
  const credenciales = btoa(usua + ":" + password);
  fetch(`http://localhost:8080/venta/detalle/${id}`, {
    headers: {
      "Authorization": "Basic " + credenciales
    }
  })
    .then(response => response.json())
    .then(venta => {
      ventaIdActual = venta.id;

      // Cargar valores en los campos del modal
      document.getElementById("modificar-inmueble-venta").value = venta.inmueble?.titulo || '';
      document.getElementById("modificar-cliente-venta").value = venta.nombreCliente || '';
      document.getElementById("modificar-telefono-venta").value = venta.telefonoCliente || '';
      document.getElementById("modificar-dni-venta").value = venta.dniCliente || '';
      document.getElementById("modificar-venta-precio").value = venta.precio || 0;
      document.getElementById("modificar-venta-fecha").value = venta.fecha?.split("T")[0] || '';
      document.getElementById("modificar-estado-venta").value = venta.estado || '';

      // Mostrar el modal
      document.getElementById("modal-modificar-venta").style.display = "block";
    })
    .catch(error => {
      console.error("Error al cargar la venta para modificar:", error);
      alert("No se pudo cargar la venta.");
    });
}


// Abrir modal visualizar y cargar datos
function visualizarVenta(id) {
  const usua = "admin";
  const password = "servicio1234";
  const credenciales = btoa(usua + ":" + password);
  fetch(`http://localhost:8080/venta/detalle/${id}`, {
    headers: {
      "Authorization": "Basic " + credenciales
    }
  })
    .then(response => response.json())
    .then(venta => {
      // Datos del cliente
      document.getElementById("venta-cliente-nombre").textContent = venta.nombreCliente || '-';
      document.getElementById("venta-cliente-telefono").textContent = venta.telefonoCliente || '-';
      document.getElementById("venta-cliente-dni").textContent = venta.dniCliente || '-';

      // Transacción
      document.getElementById("venta-transaccion-id").textContent = venta.id || '-';
      document.getElementById("venta-fecha").textContent = venta.fecha?.split("T")[0] || '-';
      document.getElementById("venta-total").textContent = `$${venta.precio || 0}`;



      // Mostrar el modal
      document.getElementById("modal-visualizar-venta").style.display = "block";
    })
    .catch(error => {
      console.error("Error al visualizar venta:", error);
      alert("No se pudo visualizar la venta.");
    });
}


// Registrar nueva venta
document.addEventListener("DOMContentLoaded", function () {
  const btnRegistrarVenta = document.getElementById('btn-registrar-venta');
  if (btnRegistrarVenta) {
    btnRegistrarVenta.addEventListener('click', abrirModalRegistrarVenta);
  }

  const btnPDF = document.getElementById("botonemitirlistadoventas");
  if (btnPDF) btnPDF.addEventListener("click", emitirListadoVentas);

  const btnGrafico = document.getElementById("botonReporteVentas");
  if (btnGrafico) btnGrafico.addEventListener("click", emitirReporteGraficoVentas);

  const formRegistrarVenta = document.getElementById('formRegistrarVenta');
  if (formRegistrarVenta) {
    formRegistrarVenta.addEventListener("submit", function (event) {
      event.preventDefault();

      const venta = {
        nombreCliente: document.getElementById("cliente-venta").value,
        telefonoCliente: document.getElementById("telefono-cliente-venta").value,
        dniCliente: document.getElementById("dni-cliente-venta").value,
        fecha: document.getElementById("ventaFecha").value,
        precio: document.getElementById("ventaPrecio").value,
        estado: document.getElementById("estado-registrar-venta").value,
        inmueble: {
          id: document.getElementById("inmueble-venta").value
        }
      };
      const usua = "admin";
      const password = "servicio1234";
      const credenciales = btoa(usua + ":" + password);
      fetch("http://localhost:8080/venta/guardar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + credenciales
        },
        body: JSON.stringify(venta)
      })
        .then(response => {
          if (!response.ok) throw new Error("Error al guardar la venta");
          return response.json();
        })
        .then(() => {
           eliminarInmuebleDelSelect(venta.inmueble.id);
          cerrarModal('modal-registrar-venta');
          cargarVentas();
        })
        .catch(error => {
          console.error("Error:", error);
          alert("No se pudo registrar la venta");
        });
    });
  }

  const formModificarVenta = document.getElementById('formModificarVenta');
  if (formModificarVenta) {
    formModificarVenta.addEventListener("submit", function (event) {
      event.preventDefault();

      const ventaModificada = {
        nombreCliente: document.getElementById("modificar-cliente-venta").value,
        telefonoCliente: document.getElementById("modificar-telefono-venta").value,
        dniCliente: document.getElementById("modificar-dni-venta").value,
        fecha: document.getElementById("modificar-venta-fecha").value,
        estado: document.getElementById("modificar-estado-venta").value,
        precio: document.getElementById("modificar-venta-precio").value,

        inmueble: {
          id: document.getElementById("modificar-inmueble-venta").value,
        }
      };
      const usua = "admin";
      const password = "servicio1234";
      const credenciales = btoa(usua + ":" + password);
      fetch(`http://localhost:8080/venta/actualizar/${ventaIdActual}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + credenciales
        },
        body: JSON.stringify(ventaModificada)
      })
        .then(response => {
          if (!response.ok) throw new Error("Error al actualizar la venta");
          cerrarModal("modal-modificar-venta");
          cargarVentas();
        })
        .catch(error => {
          console.error("Error al modificar venta:", error);
          alert("No se pudo modificar la venta.");
        });
    });
  }
});