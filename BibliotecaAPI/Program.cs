using BibliotecaAPI;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Configura DbContext con la conexión desde appsettings.json
builder.Services.AddDbContext<BibliotecaContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("BibliotecaConnection")));

// Configura Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Biblioteca API",
        Version = "v1"
    });
});

builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Biblioteca API v1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseAuthorization();
app.MapControllers();
app.Run();
