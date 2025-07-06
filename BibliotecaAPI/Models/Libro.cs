using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BibliotecaAPI.Models
{
    public class Libro
    {
        [Key]
        public int LibroId { get; set; }

        [Required]
        public string Titulo { get; set; } = string.Empty;

        [Required]
        [ForeignKey("Autor")]
        public int AutorId { get; set; }
        public Autor? Autor { get; set; }

        [Required]
        [ForeignKey("Categoria")]
        public int CategoriaId { get; set; }
        public Categoria? Categoria { get; set; }
    }
}
