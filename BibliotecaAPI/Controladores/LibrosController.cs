using Microsoft.AspNetCore.Mvc;
using BibliotecaAPI.Models;

namespace BibliotecaAPI.Controladores
{
    [ApiController]
    [Route("api/[controller]")]
    public class LibrosController : ControllerBase
    {
        private readonly BibliotecaContext _context;

        public LibrosController(BibliotecaContext context)
        {
            _context = context;
        }

        // GET: api/Libros
        [HttpGet]
        public ActionResult<IEnumerable<Libro>> GetLibros()
        {
            return _context.Libros.ToList();
        }

        // POST: api/Libros
        [HttpPost]
        public ActionResult<Libro> PostLibro(Libro libro)
        {
            _context.Libros.Add(libro);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetLibros), new { id = libro.LibroId }, libro);
        }
    }
}
