using System;
using System.IO;

namespace TextoArchivoApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Ingrese el nombre del archivo (sin extensión): ");
            string? nombreArchivo = Console.ReadLine()?.Trim();

            Console.Write("Ingrese el texto que desea guardar: ");
            string? texto = Console.ReadLine()?.Trim();

            if (string.IsNullOrWhiteSpace(nombreArchivo) || string.IsNullOrWhiteSpace(texto))
            {
                Console.WriteLine("❌ Nombre de archivo o texto inválido.");
                return;
            }

            try
            {
                // Crear archivo en la carpeta actual del proyecto
                string nombreCompleto = $"{nombreArchivo}.txt";
                string rutaCompleta = Path.Combine(Directory.GetCurrentDirectory(), nombreCompleto);

                // Separar el texto en palabras por espacios y tabulaciones
                string[] palabras = texto.Split(new[] { ' ', '\t' }, StringSplitOptions.RemoveEmptyEntries);
                File.WriteAllLines(rutaCompleta, palabras);

                Console.WriteLine($"\n✅ Archivo creado exitosamente en:\n{rutaCompleta}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error al crear el archivo: {ex.Message}");
            }
        }
    }
}
