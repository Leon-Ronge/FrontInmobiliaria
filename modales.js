// Esta función la hago GLOBAL para que el HTML pueda usarla
function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

function abrirModalConfirmacionEliminar() {
    const modalConfirmacion = document.getElementById('modal-confirmacion-eliminar');
    if (modalConfirmacion) {
        modalConfirmacion.style.display = 'block';
    }
}

function abrirModalConfirmacionEliminarVisita() {
    const modalConfirmacionVisita = document.getElementById('modal-confirmacion-eliminar-visita');
    if (modalConfirmacionVisita) {
        modalConfirmacionVisita.style.display = 'block';
    }
}

function abrirModalRegistrarVisita() {
    const modalRegistrarVisita = document.getElementById('modal-registrar-visita');
    if (modalRegistrarVisita) {
        modalRegistrarVisita.style.display = 'block';
    }
}

function abrirModalModificarVisita() {
    const modalModificarVisita = document.getElementById('modal-modificar-visita');
    if (modalModificarVisita) {
        modalModificarVisita.style.display = 'block';
    }
}

let idVisitaAEliminar = null; // Variable global para guardar el ID de la visita a eliminar

function eliminarVisita(idVisita) {
    idVisitaAEliminar = idVisita; // Guardamos el ID que queremos eliminar
    const modalConfirmacionVisita = document.getElementById('modal-confirmacion-eliminar-visita');
    if (modalConfirmacionVisita) {
        modalConfirmacionVisita.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Funciones para abrir modales
    function abrirModalRegistrar() {
        const modalRegistrar = document.getElementById('modal-registrar');
        if (modalRegistrar) {
            modalRegistrar.style.display = 'block';
        }
    }

    function abrirModalvisualizarinmueble() {
        const modalVisualizar = document.getElementById('visualizarModal');
        if (modalVisualizar) {
            modalVisualizar.style.display = 'block';
        }
    }

    function abrirModalModificarInmueble() {
        const modalModificar = document.getElementById('modal-modificar');
        if (modalModificar) {
            modalModificar.style.display = 'block';
        }
    }

    // Botones para cerrar cada modal
    const btnCerrarVisualizar = document.getElementById('btn-cerrar-visualizar');
    if (btnCerrarVisualizar) {
        btnCerrarVisualizar.onclick = function() {
            cerrarModal('visualizarModal');
        };
    }

    const btnCerrarRegistrar = document.getElementById('btn-cerrar-registrar');
    if (btnCerrarRegistrar) {
        btnCerrarRegistrar.onclick = function() {
            cerrarModal('modal-registrar');
        };
    }

    const btnCerrarModificar = document.getElementById('btn-cerrar-modificar');
    if (btnCerrarModificar) {
        btnCerrarModificar.onclick = function() {
            cerrarModal('modal-modificar');
        };
    }

    // También el del modal de modificar inmueble
    const spanCerrarModalModificar = document.querySelector('#modal-modificar .cerrar-modal');
    if (spanCerrarModalModificar) {
        spanCerrarModalModificar.onclick = function() {
            cerrarModal('modal-modificar');
        };
    }

    // Botones de acciones principales
    const btnRegistrarInmueble = document.getElementById('btn-registrar-inmueble');
    if (btnRegistrarInmueble) {
        btnRegistrarInmueble.onclick = abrirModalRegistrar;
    }

    const btnConsultarInmueble = document.getElementById('consultarinmueble');
    if (btnConsultarInmueble) {
        // Función para consultar inmuebles
    }

    const btnEmitirListado = document.getElementById('botonemitirlistadoinmuebles');
    if (btnEmitirListado) {
        // Función para emitir listado
    }

    // Botones de cada fila de la tabla
    document.querySelectorAll('.btn-visualizar-inmueble').forEach(button => {
        button.addEventListener('click', abrirModalvisualizarinmueble);
    });

    document.querySelectorAll('.btn-modificar-inmueble').forEach(button => {
        button.addEventListener('click', abrirModalModificarInmueble);
    });

    // Botón de eliminar inmueble
    document.querySelectorAll('.btn-eliminar-inmueble').forEach(button => {
        button.addEventListener('click', abrirModalConfirmacionEliminar);
    });

    // Botón para abrir el modal de registrar visita
    const btnRegistrarVisita = document.getElementById('btnregistrarvisita');
    if (btnRegistrarVisita) {
        btnRegistrarVisita.onclick = abrirModalRegistrarVisita;
    }

    // Botón para abrir el modal de modificar visita
    document.querySelectorAll('.btn-modificar-visita').forEach(button => {
        button.addEventListener('click', abrirModalModificarVisita);
    });

    // Cerrar modales al hacer clic fuera
    window.onclick = function(event) {
        const modalVisualizar = document.getElementById('visualizarModal');
        const modalRegistrar = document.getElementById('modal-registrar');
        const modalModificar = document.getElementById('modal-modificar');
        const modalConfirmacionEliminar = document.getElementById('modal-confirmacion-eliminar');
        const modalRegistrarVisita = document.getElementById('modal-registrar-visita');
        const modalModificarVisita = document.getElementById('modal-modificar-visita');
        const modalConfirmacionEliminarVisita = document.getElementById('modal-confirmacion-eliminar-visita');

        if (event.target === modalVisualizar) {
            cerrarModal('visualizarModal');
        }
        if (event.target === modalRegistrar) {
            cerrarModal('modal-registrar');
        }
        if (event.target === modalModificar) {
            cerrarModal('modal-modificar');
        }
        if (event.target === modalConfirmacionEliminar) {
            cerrarModal('modal-confirmacion-eliminar');
        }
        if (event.target === modalRegistrarVisita) {
            cerrarModal('modal-registrar-visita');
        }
        if (event.target === modalModificarVisita) {
            cerrarModal('modal-modificar-visita');
        }
        if (event.target === modalConfirmacionEliminarVisita) {
            cerrarModal('modal-confirmacion-eliminar-visita');
        }
    };

    // Botón de confirmación para eliminar visita
    const btnConfirmarEliminarVisita = document.getElementById('boton-confirmar-eliminar-visita');
    if (btnConfirmarEliminarVisita) {
        btnConfirmarEliminarVisita.onclick = function() {
            if (idVisitaAEliminar !== null) {
                // Aquí puedes realizar la eliminación de la visita (por ejemplo, haciendo una petición al servidor)
                console.log('Eliminar visita con ID:', idVisitaAEliminar);

                // Después de eliminar, cerramos el modal
                cerrarModal('modal-confirmacion-eliminar-visita');

                // Opcional: resetear la variable
                idVisitaAEliminar = null;
            }
        };
    }
});


function abrirModalRegistrarUsuario() {
    const modalRegistrarUsuario = document.getElementById('modal-registrar-usuario');
    if (modalRegistrarUsuario) {
        modalRegistrarUsuario.style.display = 'block';
    }
}

function abrirModalModificarUsuario() {
    const modalModificarUsuario = document.getElementById('modal-modificar-usuario');
    if (modalModificarUsuario) {
        modalModificarUsuario.style.display = 'block';
    }
}

function abrirModalVisualizarUsuario() {
    const modalVisualizarUsuario = document.getElementById('modal-visualizar-usuario');
    if (modalVisualizarUsuario) {
        modalVisualizarUsuario.style.display = 'block';
    }
}

function abrirModalConfirmacionEliminarUsuario() {
    const modalConfirmacionUsuario = document.getElementById('modal-confirmacion-eliminar-usuario');
    if (modalConfirmacionUsuario) {
        modalConfirmacionUsuario.style.display = 'block';
    }
}

function eliminarUsuario(idUsuario) {
    idUsuarioAEliminar = idUsuario; // Guardamos el ID que queremos eliminar
    const modalConfirmacionUsuario = document.getElementById('modal-confirmacion-eliminar-usuario');
    if (modalConfirmacionUsuario) {
        modalConfirmacionUsuario.style.display = 'block';
    }
}


let idUsuarioAEliminar = null;

// Dentro del DOMContentLoaded, justo antes del window.onclick
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // Botón para abrir el modal de registrar usuario
    const btnRegistrarUsuario = document.getElementById('btnregistrarusuario');
    if (btnRegistrarUsuario) {
        btnRegistrarUsuario.onclick = abrirModalRegistrarUsuario;
    }

    // Botón para abrir el modal de modificar usuario
    document.querySelectorAll('.btn-modificar-usuario').forEach(button => {
        button.addEventListener('click', abrirModalModificarUsuario);
    });

    // En la sección de window.onclick, agregar estos casos
    window.onclick = function(event) {
        // ... existing code ...
        
        const modalRegistrarUsuario = document.getElementById('modal-registrar-usuario');
        const modalModificarUsuario = document.getElementById('modal-modificar-usuario');
        const modalConfirmacionEliminarUsuario = document.getElementById('modal-confirmacion-eliminar-usuario');

        if (event.target === modalRegistrarUsuario) {
            cerrarModal('modal-registrar-usuario');
        }
        if (event.target === modalModificarUsuario) {
            cerrarModal('modal-modificar-usuario');
        }
        if (event.target === modalConfirmacionEliminarUsuario) {
            cerrarModal('modal-confirmacion-eliminar-usuario');
        }
    };

    // Botón de confirmación para eliminar usuario
    const btnConfirmarEliminarUsuario = document.getElementById('boton-confirmar-eliminar-usuario');
    if (btnConfirmarEliminarUsuario) {
        btnConfirmarEliminarUsuario.onclick = function() {
            if (idUsuarioAEliminar !== null) {
                // Aquí puedes realizar la eliminación del usuario
                console.log('Eliminar usuario con ID:', idUsuarioAEliminar);
                cerrarModal('modal-confirmacion-eliminar-usuario');
                idUsuarioAEliminar = null;
            }
        };
    }
});