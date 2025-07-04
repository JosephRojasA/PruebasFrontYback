using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BibliotecaAPI.Models;

namespace BibliotecaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AutoresController : ControllerBase
    {
        private readonly BibliotecaContext _context;

        public AutoresController(BibliotecaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Autor>>> GetAutores()
        {
            return await _context.Autores.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Autor>> PostAutor(Autor autor)
        {
            _context.Autores.Add(autor);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAutores), new { id = autor.AutorId }, autor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAutor(int id, Autor autor)
        {
            if (id != autor.AutorId) return BadRequest();

            _context.Entry(autor).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAutor(int id)
        {
            var autor = await _context.Autores.FindAsync(id);
            if (autor == null) return NotFound();

            _context.Autores.Remove(autor);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
