        using Microsoft.EntityFrameworkCore;
        using BibliotecaAPI.Models;

        namespace BibliotecaAPI
        {
            public class BibliotecaContext : DbContext
            {
                public BibliotecaContext(DbContextOptions<BibliotecaContext> options) : base(options) { }

            public DbSet<Autor> Autores { get; set; } = null!;
            public DbSet<Categoria> Categorias { get; set; } = null!;
            public DbSet<Libro> Libros { get; set; }


            }
        }
