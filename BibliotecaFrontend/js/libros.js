const apiUrl = 'http://localhost:5141/api/Libros';

function cargarLibros() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const tabla = `
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(libro => `
              <tr>
                <td>${libro.libroId}</td>
                <td>${libro.titulo}</td>
                <td>${libro.autor?.nombre || 'N/A'}</td>
                <td>${libro.categoria?.nombre || 'N/A'}</td>
                <td>
                  <button class="btn btn-sm btn-warning" onclick="editarLibro(${libro.libroId}, '${libro.titulo}', ${libro.autorId}, ${libro.categoriaId})">✏️</button>
                  <button class="btn btn-sm btn-danger" onclick="eliminarLibro(${libro.libroId})">🗑️</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
      document.getElementById('lista-libros').innerHTML = tabla;
    })
    .catch(err => {
      console.error('Error al cargar libros:', err);
    });
}

function guardarLibro() {
  const titulo = document.getElementById('titulo').value;
  const autorId = parseInt(document.getElementById('autorId').value);
  const categoriaId = parseInt(document.getElementById('categoriaId').value);

  if (!titulo || isNaN(autorId) || isNaN(categoriaId)) {
    alert("❌ Por favor complete todos los campos correctamente.");
    return;
  }

  const libro = {
    titulo: titulo,
    autorId: autorId,
    categoriaId: categoriaId
  };

  const id = document.getElementById('libroId').value;
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${apiUrl}/${id}` : apiUrl;

  fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(libro)
  })
    .then(res => {
      if (!res.ok) return res.text().then(text => { throw new Error(text); });
      return res.json();
    })
    .then(() => {
      alert('✅ Libro guardado correctamente');
      document.getElementById('form-libro').reset();
      cargarLibros();
    })
    .catch(err => {
      console.error('Error al guardar libro:', err);
      alert('❌ Error al guardar libro:\n' + err.message);
    });
}


function editarLibro(id, titulo, autorId, categoriaId) {
  document.getElementById('libroId').value = id;
  document.getElementById('titulo').value = titulo;
  document.getElementById('autorId').value = autorId;
  document.getElementById('categoriaId').value = categoriaId;
}

function eliminarLibro(id) {
  if (!confirm('¿Seguro que deseas eliminar este libro?')) return;

  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  })
    .then(res => {
      if (!res.ok) throw new Error('Error al eliminar');
      return res.text();
    })
    .then(() => {
      alert('🗑️ Libro eliminado correctamente');
      cargarLibros();
    })
    .catch(err => {
      console.error('Error al eliminar libro:', err);
      alert('❌ No se pudo eliminar el libro');
    });
}

// 🔽 NUEVO: Llenar select de autores
function fetchAutoresSelect() {
  fetch('http://localhost:5141/api/Autores')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('autorId');
      select.innerHTML = '<option value="">Seleccione un autor</option>';
      data.forEach(autor => {
        const option = document.createElement('option');
        option.value = autor.autorId;
        option.textContent = autor.nombre;
        select.appendChild(option);
      });
    })
    .catch(err => console.error('Error al cargar autores:', err));
}

// 🔽 NUEVO: Llenar select de categorías
function fetchCategoriasSelect() {
  fetch('http://localhost:5141/api/Categorias')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('categoriaId');
      select.innerHTML = '<option value="">Seleccione una categoría</option>';
      data.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.categoriaId;
        option.textContent = categoria.nombre;
        select.appendChild(option);
      });
    })
    .catch(err => console.error('Error al cargar categorías:', err));
}
