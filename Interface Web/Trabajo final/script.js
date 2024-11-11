function mostrarSeccion(seccionId) {
    // Oculta todas las secciones
    document.querySelectorAll('.seccion').forEach(div => div.classList.add('oculto'));
    // Muestra la sección seleccionada
    document.getElementById(seccionId).classList.remove('oculto');
}
