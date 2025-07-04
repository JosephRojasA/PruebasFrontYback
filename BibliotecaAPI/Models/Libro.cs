public class Libro
{
    public int LibroId { get; set; }
    public string Titulo { get; set; } = default!;
    public Autor Autor { get; set; } = default!;
    public int AutorId { get; set; }
    public Categoria Categoria { get; set; } = default!;
    public int CategoriaId { get; set; }
}
