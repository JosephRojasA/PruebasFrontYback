using System;

class Program
{
    static void Main(string[] args)
    {
        Console.Write("Ingrese un número entero para la sucesión de Fibonacci: ");
        if (long.TryParse(Console.ReadLine(), out long n) && n >= 0)
        {
            Console.WriteLine($"Sucesión de Fibonacci hasta {n}:");

            for (long i = 0; i <= n; i++)
            {
                Console.Write($"{Fibonacci(i)} ");
            }

            Console.WriteLine();
        }
        else
        {
            Console.WriteLine("❌ Entrada inválida. Ingrese un número entero positivo.");
        }
    }

    // Versión iterativa eficiente
    static long Fibonacci(long n)
    {
        if (n == 0) return 0;
        if (n == 1) return 1;

        long a = 0, b = 1, temp;
        for (long i = 2; i <= n; i++)
        {
            temp = a + b;
            a = b;
            b = temp;
        }

        return b;
    }
}
