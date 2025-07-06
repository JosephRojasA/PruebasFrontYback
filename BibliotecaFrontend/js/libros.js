const apiUrl = 'http://localhost:5141/api/Libros';

// 🔄 Cargar lista de libros


// 🔄 Cargar lista de libros con filtros
function cargarLibros() {
  const autorId = document.getElementById('filtroAutorId').value;
  const categoriaId = document.getElementById('filtroCategoriaId').value;
  const tituloFiltro = document.getElementById('filtroTitulo').value.trim().toLowerCase();
  const fechaInicio = document.getElementById('filtroFechaInicio').value;
  const fechaFin = document.getElementById('filtroFechaFin').value;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      // ✅ Filtro por autor
      if (autorId) data = data.filter(l => l.autorId == autorId);

      // ✅ Filtro por categoría
      if (categoriaId) data = data.filter(l => l.categoriaId == categoriaId);

      // ✅ Filtro por título
      if (tituloFiltro) {
        data = data.filter(l => l.titulo.toLowerCase().includes(tituloFiltro));
      }

      // ✅ Filtro por rango de fechas
      if (fechaInicio) {
        const inicio = new Date(fechaInicio);
        data = data.filter(l => new Date(l.fechaPublicacion) >= inicio);
      }
      if (fechaFin) {
        const fin = new Date(fechaFin);
        data = data.filter(l => new Date(l.fechaPublicacion) <= fin);
      }

      // ✅ Mostrar resultados
      const tabla = `
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Categoría</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(libro => `
              <tr>
                <td>${libro.libroId}</td>
                <td>${libro.titulo}</td>
                <td>${libro.autor?.nombre || 'Sin autor'}</td>
                <td>${libro.categoria?.nombre || 'Sin categoría'}</td>
                <td>${libro.fechaPublicacion?.substring(0, 10) || 'N/D'}</td>
                <td>
                  <button class="btn btn-sm btn-warning" onclick="editarLibro(${libro.libroId}, '${libro.titulo.replace(/'/g, "\\'")}', ${libro.autorId}, ${libro.categoriaId}, '${libro.fechaPublicacion}')">Editar</button>
                  <button class="btn btn-sm btn-danger" onclick="eliminarLibro(${libro.libroId})">Eliminar</button>
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
      document.getElementById('lista-libros').innerHTML = `<p class="text-danger">❌ Error al cargar libros</p>`;
    });
}


// 💾 Guardar nuevo libro o editar existente
function guardarLibro() {
  const id = document.getElementById('libroId').value;
  const titulo = document.getElementById('titulo').value.trim();
  const autorId = parseInt(document.getElementById('autorId').value);
  const categoriaId = parseInt(document.getElementById('categoriaId').value);

  if (!titulo || isNaN(autorId) || isNaN(categoriaId)) {
    alert("⚠️ Todos los campos son obligatorios.");
    return;
  }

  // ✅ Incluir libroId solo si es edición
  const libro = {
    titulo,
    autorId,
    categoriaId
  };

  if (id) {
    libro.libroId = parseInt(id); // ✅ Añadir el ID para PUT
  }

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${apiUrl}/${id}` : apiUrl;

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(libro)
  })
    .then(res => {
      if (!res.ok) return res.text().then(text => { throw new Error(text); });
      
      // ✅ Evitar error cuando el backend responde con 204 (sin contenido)
      if (res.status === 204) return null;

      return res.json();
    })
    .then(() => {
      alert('✅ Libro guardado exitosamente.');
      document.getElementById('form-libro').reset();
      cargarLibros();
    })
    .catch(err => {
      console.error('Error al guardar libro:', err);
      alert('❌ Error al guardar libro:\n' + err.message);
    });
}



// ✏️ Cargar datos en el formulario para editar
function editarLibro(id, titulo, autorId, categoriaId) {
  document.getElementById('libroId').value = id;
  document.getElementById('titulo').value = titulo;
  document.getElementById('autorId').value = autorId;
  document.getElementById('categoriaId').value = categoriaId;
}

// 🗑️ Eliminar libro
function eliminarLibro(id) {
  if (!confirm('¿Deseas eliminar este libro?')) return;

  fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
    .then(res => {
      if (!res.ok) throw new Error('Error al eliminar');
      return res.text();
    })
    .then(() => {
      alert('🗑️ Libro eliminado correctamente.');
      cargarLibros();
    })
    .catch(err => {
      console.error('Error al eliminar libro:', err);
      alert('❌ No se pudo eliminar el libro.');
    });
}
// 🔽 Llenar select de autores para formulario
function fetchAutoresSelect(selectId = 'autorId') {
  fetch('http://localhost:5141/api/Autores')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById(selectId);
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

// 🔽 Llenar select de categorías para formulario
function fetchCategoriasSelect(selectId = 'categoriaId') {
  fetch('http://localhost:5141/api/Categorias')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById(selectId);
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

