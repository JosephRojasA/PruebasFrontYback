# Document Manager SPA

Una aplicación de gestión documental construida con React 18, Vite, TypeScript y Material UI v5, siguiendo los principios de la arquitectura hexagonal.

## 🚀 Stack

- React 18
- Vite 5
- TypeScript 5
- Material UI 5
- React Router DOM 6
- LocalStorage (persistencia local)
- Git + GitHub

## 📁 Estructura del proyecto

- `domain/`: entidades, lógica de negocio
- `ports/`: interfaces (puertos) hacia el dominio
- `infrastructure/`: adapters (ej. localStorage, fetch)
- `ui/`: componentes visuales y páginas
- `hooks/`: hooks personalizados

## 🛠️ Instalación y ejecución

```bash
git clone https://github.com/tu-usuario/document-manager.git
cd document-manager
npm install
npm run dev
