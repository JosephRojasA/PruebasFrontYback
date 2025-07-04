using BibliotecaAPI;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Agregar DbContext con SQLite
builder.Services.AddDbContext<BibliotecaContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("BibliotecaConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthorization();
app.MapControllers();

app.Run();
