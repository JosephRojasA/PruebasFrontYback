const apiCategorias = 'http://localhost:5141/api/Categorias';

function cargarCategorias() {
  fetch(apiCategorias)
    .then(res => res.json())
    .then(categorias => {
      const tabla = `
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            ${categorias.map(c => `
              <tr>
                <td>${c.categoriaId}</td>
                <td>${c.nombre}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      `;
      document.getElementById('lista-categorias').innerHTML = tabla;
    })
    .catch(err => console.error('Error al cargar categorías:', err));
}
