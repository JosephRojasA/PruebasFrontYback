const API_CATEGORIA = 'http://localhost:5141/api/Categorias';

function cargarCategoriasCRUD() {
  fetch(API_CATEGORIA)
    .then(res => res.json())
    .then(data => {
      let tabla = '<table class="table table-bordered"><thead><tr><th>ID</th><th>Nombre</th><th>Acciones</th></tr></thead><tbody>';
      data.forEach(cat => {
        tabla += `<tr>
                    <td>${cat.id}</td>
                    <td>${cat.nombre}</td>
                    <td>
                      <button class="btn btn-warning btn-sm" onclick="editarCategoria(${cat.id}, '${cat.nombre}')">✏️</button>
                      <button class="btn btn-danger btn-sm" onclick="eliminarCategoria(${cat.id})">🗑️</button>
                    </td>
                  </tr>`;
      });
      tabla += '</tbody></table>';
      document.getElementById('tabla-categorias').innerHTML = tabla;
    });
}

function guardarCategoria() {
  const id = document.getElementById('categoriaId').value;
  const nombre = document.getElementById('nombreCategoria').value;

  const categoria = { nombre };
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_CATEGORIA}/${id}` : API_CATEGORIA;

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoria)
  }).then(() => {
    document.getElementById('form-categoria').reset();
    cargarCategoriasCRUD();
  });
}

function editarCategoria(id, nombre) {
  document.getElementById('categoriaId').value = id;
  document.getElementById('nombreCategoria').value = nombre;
}

function eliminarCategoria(id) {
  if (confirm('¿Deseas eliminar esta categoría?')) {
    fetch(`${API_CATEGORIA}/${id}`, { method: 'DELETE' })
      .then(() => cargarCategoriasCRUD());
  }
}
