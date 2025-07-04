const apiAutores = 'http://localhost:5141/api/Autores';

function cargarAutoresCRUD() {
  fetch(apiAutores)
    .then(res => res.json())
    .then(data => {
      const tabla = `
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(autor => `
              <tr>
                <td>${autor.autorId}</td>
                <td>${autor.nombre}</td>
                <td>
                  <button class="btn btn-sm btn-warning" onclick="editarAutor(${autor.autorId}, '${autor.nombre}')">✏️</button>
                  <button class="btn btn-sm btn-danger" onclick="eliminarAutor(${autor.autorId})">🗑️</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
      document.getElementById('tabla-autores').innerHTML = tabla;
    })
    .catch(err => console.error('Error al cargar autores:', err));
}

function guardarAutor() {
  const id = document.getElementById('autorId').value;
  const nombre = document.getElementById('nombreAutor').value;

  if (!nombre.trim()) {
    alert("⚠️ El nombre del autor es obligatorio.");
    return;
  }

  const autor = { autorId: parseInt(id || 0), nombre };

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${apiAutores}/${id}` : apiAutores;

  fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(autor)
  })
    .then(res => {
      if (!res.ok) return res.text().then(text => { throw new Error(text); });
      return res.json();
    })
    .then(() => {
      alert('✅ Autor guardado correctamente');
      document.getElementById('form-autor').reset();
      cargarAutoresCRUD();
    })
    .catch(err => {
      console.error('Error al guardar autor:', err);
      alert('❌ Error al guardar autor:\n' + err.message);
    });
}

function editarAutor(id, nombre) {
  document.getElementById('autorId').value = id;
  document.getElementById('nombreAutor').value = nombre;
}

function eliminarAutor(id) {
  if (!confirm('¿Seguro que deseas eliminar este autor?')) return;

  fetch(`${apiAutores}/${id}`, { method: 'DELETE' })
    .then(res => {
      if (!res.ok) throw new Error('Error al eliminar');
      return res.text();
    })
    .then(() => {
      alert('🗑️ Autor eliminado correctamente');
      cargarAutoresCRUD();
    })
    .catch(err => {
      console.error('Error al eliminar autor:', err);
      alert('❌ No se pudo eliminar el autor');
    });
}
