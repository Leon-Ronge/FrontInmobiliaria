function mostrarVentas() {
  document.getElementById('inicioSection').style.display = 'none';
  document.getElementById('inmueblesSection').style.display = 'none';
  document.getElementById('ventasSection').style.display = 'block';
  document.getElementById('visitasSection').style.display = 'none';
  document.getElementById('usuariosSection').style.display = 'none';
}


function abrirModalRegistrarVenta() {
  const modalRegistrarVenta = document.getElementById('modal-registrar-venta');
  if (modalRegistrarVenta) {
      modalRegistrarVenta.style.display = 'block';
  }
}

function abrirModalModificarVenta(id) {
  const modalModificarVenta = document.getElementById('modal-modificar-venta');
  if (modalModificarVenta) {
    modalModificarVenta.style.display = 'block';
  }
}

function visualizarVenta(id) {
  const modalVisualizarVenta = document.getElementById('modal-visualizar-venta');
  if (modalVisualizarVenta) {
      modalVisualizarVenta.style.display = 'block';
  }
}

function eliminarVenta(id) {
  const modalConfirmacion = document.getElementById('modal-confirmacion-eliminar-venta');
  if (modalConfirmacion) {
      modalConfirmacion.style.display = 'block';
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const btnRegistrarVenta = document.getElementById('btn-registrar-venta');
  if (btnRegistrarVenta) {
      btnRegistrarVenta.addEventListener('click', abrirModalRegistrarVenta);
  }

});