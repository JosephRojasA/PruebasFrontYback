public class Autor
{
    public int AutorId { get; set; }
    public string Nombre { get; set; } = default!;
    public List<Libro> Libros { get; set; } = new();
}
