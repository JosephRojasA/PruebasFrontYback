const API_URL = "https://localhost:5141/api/Libros"; // Ajusta el puerto si es necesario

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
          <td>
            <button class="btn btn-warning btn-sm" onclick="editarLibro(${libro.libroId})">✏️</button>
            <button class="btn btn-danger btn-sm" onclick="eliminarLibro(${libro.libroId})">🗑️</button>
          </td>
        </tr>`).join('');

      document.getElementById('lista-libros').innerHTML = `
        <table class="table table-bordered">
          <thead><tr><th>ID</th><th>Título</th><th>Autor ID</th><th>Categoría ID</th><th>Acciones</th></tr></thead>
          <tbody>${tabla}</tbody>
        </table>`;
    })
    .catch(err => console.error("Error al obtener libros:", err));
}

function agregarLibro() {
  const titulo = document.getElementById("titulo").value;
  const autorId = document.getElementById("autorId").value;
  const categoriaId = document.getElementById("categoriaId").value;

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, autorId, categoriaId })
  })
    .then(res => {
      if (res.ok) {
        alert("✅ Libro agregado");
        cargarLibros();
        document.getElementById("form-libro").reset();
      } else {
        alert("❌ Error al agregar libro");
      }
    });
}

function eliminarLibro(id) {
  if (!confirm("¿Eliminar este libro?")) return;

  fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  })
    .then(res => {
      if (res.ok) {
        alert("🗑️ Libro eliminado");
        cargarLibros();
      } else {
        alert("❌ Error al eliminar");
      }
    });
}

function editarLibro(id) {
  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(libro => {
      document.getElementById("titulo").value = libro.titulo;
      document.getElementById("autorId").value = libro.autorId;
      document.getElementById("categoriaId").value = libro.categoriaId;
      document.getElementById("btn-guardar").onclick = function () {
        actualizarLibro(id);
      };
    });
}

function actualizarLibro(id) {
  const titulo = document.getElementById("titulo").value;
  const autorId = document.getElementById("autorId").value;
  const categoriaId = document.getElementById("categoriaId").value;

  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ libroId: id, titulo, autorId, categoriaId })
  })
    .then(res => {
      if (res.ok) {
        alert("✏️ Libro actualizado");
        cargarLibros();
        document.getElementById("form-libro").reset();
        document.getElementById("btn-guardar").onclick = agregarLibro;
      } else {
        alert("❌ Error al actualizar");
      }
    });
}
