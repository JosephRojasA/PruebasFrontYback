const API_URL = "https://localhost:5141/api/Libros"; // Ajusta el puerto si cambia

function cargarLibros() {
  fetch(API_URL)
    .then(res => res.json())
    .then(libros => {
      const tabla = libros.map(libro => `
        <tr>
          <td>${libro.libroId}</td>
          <td>${libro.titulo}</td>
          <td>${libro.autorId}</td>
          <td>${libro.categoriaId}</td>
        </tr>`).join('');

      document.getElementById('lista-libros').innerHTML = `
        <table class="table table-striped">
          <thead><tr><th>ID</th><th>Título</th><th>Autor ID</th><th>Categoría ID</th></tr></thead>
          <tbody>${tabla}</tbody>
        </table>`;
    })
    .catch(err => {
      console.error("Error al cargar libros:", err);
      document.getElementById('lista-libros').innerHTML = `<p class="text-danger">❌ Error al obtener libros.</p>`;
    });
}
