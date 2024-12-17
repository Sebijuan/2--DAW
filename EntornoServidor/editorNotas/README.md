# Editor de Notas

Este proyecto es un editor de notas que permite crear, editar, eliminar, listar, leer, buscar, marcar como importante y filtrar notas. La API está documentada con Swagger y se han aplicado buenas prácticas de desarrollo, incluyendo el uso de un logger, control de errores, estructura de carpetas MVC y cobertura de test superior al 80%.

## Requisitos del Proyecto

1. **Rescatar el Ejercicio de Notas del Tema 6**:
   - Crear una carpeta aparte como proyecto npm e integrar en este el desarrollo de la tarea realizada.

2. **Adaptar el Proyecto**:
   - Adaptar el proyecto de gestor de notas para que si le indicamos argumentos, acceda directamente a la opción seleccionada.
   - Añadir en el `package.json` unos scripts para atajar la ejecución de notas entrando directamente a las opciones.

3. **División del Código en Módulos**:
   - Implementar la estructura para el proyecto de notas aplicando la división del código en los distintos módulos.

4. **Investigación y Comparativa de REST vs OData vs GraphQL**:
   - Escribir documentación en Markdown (`README.md`).
   - Seleccionar uno entre OData y GraphQL y realizar una puesta en práctica con Node.js.

5. **Crear un Servidor con Rutas para el Programa de Notas**:
   - Aplicar buenas prácticas.
   - Logger bien configurado.
   - Control de errores.
   - Estructura de carpetas MVC.
   - Cobertura de test superior al 80%.
   - Realización de colección.

6. **Añadir Seguridad al Proyecto**:
   - Añadir seguridad al proyecto notas con un token encriptado y con el nombre de un usuario admin dado por variable de entorno.

7. **Ordenar, Filtrar y Paginar las Notas**:
   - **Ordenación**:
     - Por fecha de creación/edición.
     - Por título.
     - Por tamaño.
   - **Filtro**:
     - Contiene un texto en el título.
     - Contiene un texto en el contenido.
     - Igual a una categoría o grupo.
     - Pertenece a un rango de fechas según creación/actualización.
   - **Paginado**:
     - Establecer un valor de elementos por página por defecto.
     - Mostrar el total de elementos.
     - Mostrar el total de páginas.

8. **Añadir Documentación Swagger al Proyecto de Notas**:
   - Documentar todas las rutas de la API utilizando Swagger.
   - Acceso a la documentación en `http://localhost:3002/api-docs`.

