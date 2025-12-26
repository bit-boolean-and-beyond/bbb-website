# Copilot Instructions for bbb-website

Welcome to the `bbb-website` codebase! This document provides essential guidelines for AI coding agents to be productive in this project. Please follow these instructions to maintain consistency and quality.

## Project Overview
- **Purpose**: This repository powers the website for Bit Boolean and Beyond, served at [https://bitbooleanandbeyond.com](https://bitbooleanandbeyond.com).  It is a single page application that is navigated by scrolling to different sections or by clicking section buttons in the navigation bar.
- **Tech Stack**: The project uses React with TypeScript, Vite for bundling, and React Router for navigation.
- **Structure**:
  - `app/`: Contains the main application code, including components, pages, and assets.
  - `build/`: Contains the production build output.
  - `public/`: Static assets served directly.

## Key Files and Directories
- `app/root.tsx`: The entry point for the React application.
- `app/routes.ts`: Defines the routing configuration.
- `vite.config.ts`: Vite configuration file.
- `tsconfig.json`: TypeScript configuration.

## Developer Workflows
### Building the Project
Run the following command to build the project:
```bash
npm run build
```
The output will be in the `build/` directory.

### Running the Development Server
Start the development server with:
```bash
npm run dev
```
This serves the app locally with hot-reloading.

### Debugging
- Use browser developer tools to debug React components.
- Source maps are enabled in development mode for easier debugging.

## Project-Specific Conventions
- **Component Organization**: Components are stored in `app/components/` and are named using PascalCase (e.g., `NavButtons.tsx`).
- **Page Organization**: Pages are stored in `app/pages/` and correspond to routes.
- **Styling**: Global styles are defined in `app/app.css`. Component-specific styles should be scoped using CSS modules or inline styles.

## Integration Points
- **React Router**: Routes are defined in `app/routes.ts` and dynamically loaded.
- **Vite**: Handles module bundling and development server.

## External Dependencies
- **React**: UI library.
- **React Router**: For client-side routing.
- **Vite**: For fast builds and development.

## Examples
### Adding a New Page
1. Create a new file in `app/pages/` (e.g., `Contact.tsx`).
2. Define the route in `app/routes.ts`:
   ```typescript
   {
     path: '/contact',
     element: <Contact />,
   }
   ```

### Adding a New Component
1. Create a new file in `app/components/` (e.g., `Button.tsx`).
2. Import and use the component in a page or another component.

---

For any questions or unclear sections, please provide feedback to improve this document.