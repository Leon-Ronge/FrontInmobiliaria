// // VARIABLES GLOBALES
// let idInmuebleAEliminar = null;

// // === ( Funciones de logica ) ===


const toggleInmuebles = document.getElementById('toggleFiltroInmuebles');
const dropdownInmuebles = document.getElementById('filtroDropdownInmuebles');

toggleInmuebles.addEventListener('click', () => {
  dropdownInmuebles.style.display = dropdownInmuebles.style.display === 'block' ? 'none' : 'block';
});
/*
document.addEventListener('click', function (event) {
  if (!event.target.closest('.dropdown-filtro')) {
    dropdownInmuebles.style.display = 'none';
  }
});*/

let filtrosAplicados = {}; // Variable global

function aplicarFiltroInmuebles() {
  filtrosAplicados = {
    barrio: document.getElementById("barrio").value || null,
    tipoInmueble: document.getElementById("tipoInmueble").value || null,
    operacion: document.getElementById("operacion").value || null,
    dormitorios: document.getElementById("dormitorios").value || null,
    banos: document.getElementById("banos").value || null,
    precioDesde: document.getElementById("precioDesde").value || null,
    precioHasta: document.getElementById("precioHasta").value || null,
    superficieDesde: document.getElementById("superficieDesde").value || null,
    superficieHasta: document.getElementById("superficieHasta").value || null
  };

  const params = new URLSearchParams();
  for (const [key, val] of Object.entries(filtrosAplicados)) {
    if (val) params.append(key, val);
  }
  const usuario = "admin";
  const password = "servicio1234";
  const credenciales = btoa(`${usuario}:${password}`);
  fetch(`http://localhost:8080/inmobiliaria/filtrar?${params.toString()}`, {
    headers: {
      "Authorization": "Basic " + credenciales
    }
  })
    .then(res => res.json())
    .then(data => {
      mostrarInmueblesEnTabla(data);
      document.getElementById("filtroDropdownInmuebles").style.display = "none";
      limpiarFormularioInmueble()
    })
  document.getElementById("filtroDropdownInmuebles").style.display = "none";
}

function abrirModalregistrarinmueble() {
  const modal = document.getElementById("modal-registrar")
  if (modal) {
    modal.style.display = "block";
  }
}

// VARIABLES GLOBALES
let idInmuebleAEliminar = null;

// === Lógica ===

function limpiarFormularioInmueble() {
  document.getElementById("titulo").value = "";
  document.getElementById("descripcion-registro-inmueble").value = "";
  document.getElementById("ciudad").value = "";
  document.getElementById("barrio").value = "";
  document.getElementById("email").value = "";
  document.getElementById("calle").value = "";
  document.getElementById("altura").value = "";
  document.getElementById("dormitorios").value = "";
  document.getElementById("banios").value = "";
  document.getElementById("superficie").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("tipoInmueble").value = "";
  document.getElementById("operacion").value = "";
}

function abrirModalRegistrar() {
  const modal = document.getElementById("modal-registrar");
  if (modal) modal.style.display = "block";
}

function abrirModalVisualizarInmueble(id) {
  const usua = "admin";
  const password = "servicio1234";
  const credenciales = btoa(usua + ":" + password);
  fetch(`http://localhost:8080/inmobiliaria/listar/${parseInt(id)}`, {
    headers: {
      "Authorization": "Basic " + credenciales
    }
  })
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

      const img = document.getElementById("visualizarImagen");
      img.src = inmueble.imagenPrincipal || "img/default.jpg";

      const ul = document.getElementById("visualizarCaracteristicas");
      ul.innerHTML = "";
      if (Array.isArray(inmueble.caracteristicas)) {
        inmueble.caracteristicas.forEach(c => {
          const li = document.createElement("li");
          li.innerText = c;
          ul.appendChild(li);
        });
      }

      document.getElementById("visualizarModal").style.display = "block";
    })
    .catch(error => {
      console.error("Error al visualizar inmueble:", error);
      alert("No se pudo cargar el inmueble.");
    });
}

function abrirModalModificarInmueble(id) {
  const usua = "admin";
  const password = "servicio1234";
  const credenciales = btoa(usua + ":" + password);
  fetch(`http://localhost:8080/inmobiliaria/listar/${id}`, {
    headers: {
      "Authorization": "Basic " + credenciales
    }
  })
    .then(response => response.json())
    .then(inmueble => {
      const modal = document.getElementById("modal-modificar");
      if (!modal) return;

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

      const form = document.getElementById("form-modificar-inmueble");
      form.setAttribute("data-id", id);

      modal.style.display = "block";
    })
    .catch(error => {
      console.error("Error al cargar inmueble para modificar:", error);
    });
}

function eliminarInmueble(id) {
  idInmuebleAEliminar = id;
  const modal = document.getElementById("modal-confirmacion-eliminar");
  if (modal) modal.style.display = "block";
}

function cargarInmuebles() {
  const usuario = "admin";
  const password = "servicio1234";
  const credenciales = btoa(usuario + ":" + password);
  fetch("http://localhost:8080/inmobiliaria/listar", {
    headers: {
      "Authorization": "Basic " + credenciales
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
      return response.text();  // Obtenemos como texto para ver qué devuelve realmente
    })
    .then(text => {
      console.log("Respuesta cruda:", text);
      if (!text) {
        throw new Error('Respuesta vacía');
      }
      const inmuebles = JSON.parse(text); // Parseamos manualmente para detectar mejor error
      return inmuebles;
    })
    .then(inmuebles => {
      const tabla = document.getElementById("tabla-resumida-inmuebles");
      tabla.innerHTML = "";

      inmuebles.forEach(inmueble => {
        // resto del código igual
        const fila = document.createElement("tr");
        fila.innerHTML = `
                    <td>${inmueble.titulo || "Sin descripción"}</td>
                    <td>${inmueble.calle}</td>
                    <td>${inmueble.altura}</td>
                    <td>${inmueble.barrio}</td>
                    <td>${inmueble.superficie} m²</td>
                    <td>${inmueble.operacion}</td>
                    <td>$${inmueble.precio}</td>
                    <td>
                        <div class="acciones-inmueble">
                            <button class="btn-visualizar-inmueble" data-id="${inmueble.id}">
                                <img src="svg/Ojo.svg" width="18">
                            </button>
                            <button class="btn-modificar-inmueble" data-id="${inmueble.id}">
                                <img src="svg/Lapiz.svg" width="18">
                            </button>
                            <button class="btn-eliminar-inmueble" data-id="${inmueble.id}">
                                <img src="svg/Tacho.svg" width="18">
                            </button>
                        </div>
                    </td>
                `;

        fila.querySelector(".btn-visualizar-inmueble").addEventListener("click", () => {
          abrirModalVisualizarInmueble(inmueble.id);
        });

        fila.querySelector(".btn-modificar-inmueble").addEventListener("click", () => {
          abrirModalModificarInmueble(inmueble.id);
        });

        fila.querySelector(".btn-eliminar-inmueble").addEventListener("click", () => {
          eliminarInmueble(inmueble.id);
        });

        tabla.appendChild(fila);
      });
    })
    .catch(error => {
      console.error("Error al cargar inmuebles:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  cargarInmuebles();

  const btnRegistrar = document.getElementById("btn-registrar-inmueble");
  if (btnRegistrar) {
    btnRegistrar.addEventListener("click", abrirModalRegistrar);
  }

  document.getElementById("botonemitirlistadoinmuebles").addEventListener("click", function () {
    const params = new URLSearchParams();

    function addParamIfValid(key, value) {
      if (value !== null && value !== undefined && value.toString().trim() !== "") {
        params.append(key, value);
      }
    }

    const barrio = document.getElementById("barrio").value;
    const tipoInmueble = document.getElementById("tipoInmueble").value;
    const operacion = document.getElementById("operacion").value;
    const dormitorios = document.getElementById("dormitorios").value;
    const banos = document.getElementById("banos").value;
    const precioDesde = document.getElementById("precioDesde").value;
    const precioHasta = document.getElementById("precioHasta").value;
    const superficieDesde = document.getElementById("superficieDesde").value;
    const superficieHasta = document.getElementById("superficieHasta").value;

    addParamIfValid("barrio", barrio);
    addParamIfValid("tipoInmueble", tipoInmueble);
    addParamIfValid("operacion", operacion);
    addParamIfValid("dormitorios", dormitorios);
    addParamIfValid("banos", banos);
    addParamIfValid("precioDesde", precioDesde);
    addParamIfValid("precioHasta", precioHasta);
    addParamIfValid("superficieDesde", superficieDesde);
    addParamIfValid("superficieHasta", superficieHasta);

    let url = `http://localhost:8080/inmobiliaria/pdf-inmuebles?${params.toString()}`;

    const usuario = "admin";
    const password = "servicio1234";
    const credenciales = btoa(usuario + ":" + password);

    fetch(url, {
      method: "GET",
      headers: {
        "Authorization": "Basic " + credenciales
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al generar el PDF");
        }
        return response.blob();
      })
      .then(blob => {
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, "_blank");
      })
      .catch(error => {
        console.error("Error al emitir listado de inmuebles:", error);
        alert("No se pudo generar el reporte.");
      });
  });




  const formRegistrar = document.getElementById("form-registrar-inmueble");
  if (formRegistrar) {
    formRegistrar.addEventListener("submit", function (e) {
      e.preventDefault();

      const inmueble = {
        titulo: document.getElementById("titulo").value.trim(),
        descripcion: document.getElementById("descripcion-registro-inmueble").value.trim(),
        ciudad: document.getElementById("ciudad").value.trim(),
        barrio: document.getElementById("barrio").value.trim(),
        calle: document.getElementById("calle").value.trim(),
        altura: parseInt(document.getElementById("altura").value),
        dormitorios: document.getElementById("dormitorios").value ? parseInt(document.getElementById("dormitorios").value) : null,
        banios: parseInt(document.getElementById("banios").value),
        tipoInmueble: document.getElementById("tipoInmueble").value.trim(),
        operacion: document.getElementById("operacion").value.trim(),
        precio: parseFloat(document.getElementById("precio").value),
        superficie: parseFloat(document.getElementById("superficie").value)
      };


      const usua = "admin";
      const password = "servicio1234";
      const credenciales = btoa(usua + ":" + password);
      console.log("Datos enviados:", inmueble);
      fetch("http://localhost:8080/inmobiliaria/guardar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + credenciales
        },
        body: JSON.stringify(inmueble)
      })
        .then(res => {
          if (!res.ok) throw new Error("Error al guardar");
          return res.json();
        })
        .then(data => {
          cerrarModal("modal-registrar");
          limpiarFormularioInmueble();
          cargarInmuebles();
        })
        .catch(error => {
          console.error("Error al registrar:", error);
          alert("Hubo un error al registrar el inmueble.");
        });
    });
  }

  const formModificar = document.getElementById("form-modificar-inmueble");
  if (formModificar) {
    formModificar.addEventListener("submit", function (e) {
      e.preventDefault();
      const id = formModificar.getAttribute("data-id");

      const datos = {
        titulo: document.getElementById("modificar-titulo")?.value || "",
        descripcion: document.getElementById("modificar-descripcion")?.value || "",
        ciudad: document.getElementById("modificar-ciudad")?.value || "",
        barrio: document.getElementById("modificar-barrio")?.value || "",
        calle: document.getElementById("modificar-calle")?.value || "",
        altura: document.getElementById("modificar-altura")?.value || "",
        dormitorios: document.getElementById("modificar-dormitorios")?.value || "",
        banios: document.getElementById("modificar-banios")?.value || "",
        superficie: document.getElementById("modificar-superficie")?.value || "",
        precio: document.getElementById("modificar-precio")?.value || "",
        tipoInmueble: document.getElementById("modificar-tipoInmueble")?.value || "",
        operacion: document.getElementById("modificar-operacion")?.value || ""
      };
      const usua = "admin";
      const password = "servicio1234";
      const credenciales = btoa(usua + ":" + password);

      console.log("Datos enviados:", datos);
      fetch(`http://localhost:8080/inmobiliaria/modificar/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + credenciales
        },
        body: JSON.stringify(datos)
      })
        .then(res => {
          if (!res.ok) throw new Error("Error al modificar");
          return res.json();
        })
        .then(() => {
          cerrarModal("modal-modificar");
          cargarInmuebles();
        })
        .catch(error => {
          console.error("Error al modificar inmueble:", error);
          alert("No se pudo modificar el inmueble.");
        });
    });
  }

  const btnEliminar = document.getElementById('boton-confirmar-eliminar');
  if (btnEliminar) {
    btnEliminar.onclick = function () {
      if (idInmuebleAEliminar !== null) {
        const usua = "admin";
        const password = "servicio1234";
        const credenciales = btoa(usua + ":" + password);
        fetch(`http://localhost:8080/inmobiliaria/eliminar/${idInmuebleAEliminar}`, {
          method: 'DELETE',
          headers: {
            "Authorization": "Basic " + credenciales
          }
        })
          .then(res => {
            if (!res.ok) throw new Error("Error al eliminar");
            cerrarModal('modal-confirmacion-eliminar');
            idInmuebleAEliminar = null;
            cargarInmuebles();
          })
          .catch(error => {
            console.error("Error al eliminar:", error);
            alert("No se pudo eliminar el inmueble.");
          });
      }
    };
  }
});
