# Employee Management App

A responsive employee management application built with React, TypeScript, Material UI, Redux Toolkit, React Hook Form, Zod, Axios, and Vitest.

## Features

- View employees in a responsive table or mobile card layout
- Search for an employee by ID
- Create and edit employee records with validation
- Delete employees with confirmation
- Loading, empty, error, and success notification states
- Country data loaded from the API for form selection
- Mock API handlers available through MSW during tests

## Requirements

- Node.js 20 or newer
- npm

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173/` in a browser.

The API base URL can be configured with `VITE_API_BASE_URL`. When it is not set, the app uses the configured default API endpoint.

## API

The application uses the provided MockAPI endpoints for employees and countries. Employee operations are available through `src/services/employeeApi.ts`, and country loading is handled by `src/services/countryApi.ts`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run the test suite once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run test:coverage` | Generate test coverage |

## Architecture

Smart pages in `src/pages` coordinate routing, Redux state, and API actions. Reusable presentation components live in `src/components`. API access is centralized in `src/services`, while employee and country state is managed in Redux Toolkit slices under `src/features`.

## Testing

Tests use Vitest, React Testing Library, and MSW. The suite covers API services, Redux thunks and reducers, mock handlers, form validation, and confirmation-dialog interactions.

Run all checks with:

```bash
npm run lint
npm run build
npm run test
```

## Assumptions

- Employee IDs are supplied by the API.
- Country selection uses the country names returned by the countries endpoint.
- MSW handlers provide deterministic API behavior during tests without changing production API code.
