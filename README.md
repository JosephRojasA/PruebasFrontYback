Claro. Aquí tienes un archivo `README.md` **completo y listo para copiar y pegar**, con instrucciones claras para instalar y ejecutar tu proyecto **BibliotecaAPI** usando la rama `GestionBibliotecaPruebaBack`:

---

````markdown
# 📚 Biblioteca API - Gestión de Libros, Autores y Categorías

Proyecto de API REST desarrollada en **.NET 6/7/10** con **SQLite** para la gestión básica de una biblioteca. Incluye operaciones CRUD para:

- Libros
- Autores
- Categorías

## ✅ Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

1. **.NET SDK 6, 7 o 10**  
   Puedes verificar con:  
   ```bash
   dotnet --version
````

Si no lo tienes, descárgalo desde: [https://dotnet.microsoft.com/en-us/download](https://dotnet.microsoft.com/en-us/download)

2. **Extensión de SQLite para VS Code (opcional pero útil):**

   * Busca e instala: `SQLite Viewer` o `SQLite` desde el marketplace de extensiones de Visual Studio Code.

3. **Git** instalado
   Verifica con:

   ```bash
   git --version
   ```

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

### 2. Cambiar a la rama del backend

```bash
git checkout GestionBibliotecaPruebaBack
```

### 3. Restaurar dependencias y ejecutar

```bash
dotnet restore
dotnet run
```

### 4. Acceder a la API

Una vez se esté ejecutando, abre tu navegador en:

```
http://localhost:5141
```

### 5. Ver documentación Swagger

Puedes probar los endpoints desde:

```
http://localhost:5141/swagger
```

---

## 📦 Estructura del proyecto

```
PruebasFrontYback/
│
├── BibliotecaAPI/             # Proyecto API .NET con SQLite
│   ├── Controllers/           # Controladores de Libros, Autores y Categorías
│   ├── Models/                # Modelos con relaciones y validaciones
│   └── appsettings.json       # Configuración de conexión SQLite
│
└── BibliotecaFrontend/        # HTML + Bootstrap + JS para consumo de API
    ├── index.html             # CRUD de libros
    ├── crud_autores_categorias.html
    ├── js/
    └── css/
```

---

## 🗃️ Base de datos

* Se usa **SQLite**, no requiere instalación adicional.
* El archivo de base de datos `biblioteca.db` se generará automáticamente al ejecutar la API si no existe.
* Configuración en `BibliotecaAPI/appsettings.json`:

```json
"ConnectionStrings": {
  "BibliotecaConnection": "Data Source=biblioteca.db"
}
```

---

## 🧪 Endpoints REST principales

| Entidad    | Método | Ruta             |
| ---------- | ------ | ---------------- |
| Libros     | GET    | /api/Libros      |
|            | POST   | /api/Libros      |
|            | PUT    | /api/Libros/{id} |
|            | DELETE | /api/Libros/{id} |
| Autores    | GET    | /api/Autores     |
| Categorías | GET    | /api/Categorias  |
| ...        | ...    | ...              |

> Todos los endpoints están documentados en Swagger.

---

## 🧑‍💻 Autores

* Proyecto desarrollado como ejercicio de aprendizaje en ASP.NET + SQLite.
* Desarrollador: \[Tu Nombre]
* Rama principal del backend: `GestionBibliotecaPruebaBack`

---

## 🔐 Licencia

Este proyecto está licenciado bajo MIT License.

```

---

### ✅ Recomendaciones

- Cambia el enlace del repositorio (`https://github.com/tu-usuario/tu-repositorio.git`) por el **enlace real** de tu repositorio.
- Si usas otra versión de .NET (por ejemplo .NET 7), ajústalo en la parte de requisitos.

¿Te gustaría que el README también incluya cómo iniciar el frontend (`index.html`) desde Live Server u otra herramienta?
```
