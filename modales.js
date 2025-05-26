// Esta función la hago GLOBAL para que el HTML pueda usarla
function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}
