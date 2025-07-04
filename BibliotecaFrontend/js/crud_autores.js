const API_AUTOR = 'http://localhost:5141/api/Autores';

function cargarAutoresCRUD() {
  fetch(API_AUTOR)
    .then(res => res.json())
    .then(data => {
      let tabla = '<table class="table table-bordered"><thead><tr><th>ID</th><th>Nombre</th><th>Acciones</th></tr></thead><tbody>';
      data.forEach(autor => {
        tabla += `<tr>
                    <td>${autor.id}</td>
                    <td>${autor.nombre}</td>
                    <td>
                      <button class="btn btn-warning btn-sm" onclick="editarAutor(${autor.id}, '${autor.nombre}')">✏️</button>
                      <button class="btn btn-danger btn-sm" onclick="eliminarAutor(${autor.id})">🗑️</button>
                    </td>
                  </tr>`;
      });
      tabla += '</tbody></table>';
      document.getElementById('tabla-autores').innerHTML = tabla;
    });
}

function guardarAutor() {
  const id = document.getElementById('autorId').value;
  const nombre = document.getElementById('nombreAutor').value;

  const autor = { nombre };
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_AUTOR}/${id}` : API_AUTOR;

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(autor)
  }).then(() => {
    document.getElementById('form-autor').reset();
    cargarAutoresCRUD();
  });
}

function editarAutor(id, nombre) {
  document.getElementById('autorId').value = id;
  document.getElementById('nombreAutor').value = nombre;
}

function eliminarAutor(id) {
  if (confirm('¿Deseas eliminar este autor?')) {
    fetch(`${API_AUTOR}/${id}`, { method: 'DELETE' })
      .then(() => cargarAutoresCRUD());
  }
}
