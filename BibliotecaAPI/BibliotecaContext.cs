        using Microsoft.EntityFrameworkCore;
        using BibliotecaAPI.Models;

        namespace BibliotecaAPI
        {
            public class BibliotecaContext : DbContext
            {
                public BibliotecaContext(DbContextOptions<BibliotecaContext> options) : base(options) { }

                public DbSet<Libro> Libros { get; set; }
                public DbSet<Autor> Autores { get; set; }
                public DbSet<Categoria> Categorias { get; set; }
            }
        }
