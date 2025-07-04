using BibliotecaAPI;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// ✅ Agregar CORS para permitir solicitudes desde otros orígenes (como tu frontend local)
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTodo", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// ✅ Configura DbContext con SQLite desde appsettings.json
builder.Services.AddDbContext<BibliotecaContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("BibliotecaConnection")));

// ✅ Agrega soporte para controladores
builder.Services.AddControllers();

// ✅ Configura Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Biblioteca API",
        Version = "v1"
    });
});

var app = builder.Build();

// ✅ Habilita CORS
app.UseCors("PermitirTodo");

// ✅ Middleware Swagger solo en desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Biblioteca API v1");
        c.RoutePrefix = string.Empty; // Muestra Swagger en la raíz
    });
}

// ✅ Middleware para autorización
app.UseAuthorization();

// ✅ Mapeo de rutas a controladores
app.MapControllers();

// ✅ Ejecuta la app
app.Run();
