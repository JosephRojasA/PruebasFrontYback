const apiAutores = 'http://localhost:5141/api/Autores';

function cargarAutores() {
  fetch(apiAutores)
    .then(res => res.json())
    .then(autores => {
      const tabla = `
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            ${autores.map(a => `
              <tr>
                <td>${a.autorId}</td>
                <td>${a.nombre}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      `;
      document.getElementById('lista-autores').innerHTML = tabla;
    })
    .catch(err => console.error('Error al cargar autores:', err));
}
