# Employee Management Application

A responsive Employee Management Application built with **React, TypeScript, Redux Toolkit, Material UI, React Hook Form, Zod, Axios, and Vitest**.

This project was developed as part of the **Frontend Developer Assignment — Deadline: 30 September 2026**.

---

## 📋 Assignment Overview

The application demonstrates practical frontend development skills including:

- Employee CRUD operations
- REST API integration
- Redux Toolkit state management
- Redux Toolkit Entity Adapter
- Smart and Dumb component architecture
- Responsive UI
- Form handling and validation
- Loading, error, and empty states
- Search employee by ID
- Delete confirmation
- Reusable components
- Unit and integration testing
- Mock API testing with MSW
- TypeScript type safety
- Accessible and responsive Material UI components

---

## 🚀 Features

### Employee Management

The application supports:

- View all employees
- Search employee by ID
- Display a clear "employee not found" state
- Add a new employee
- Edit an existing employee
- Delete an employee
- Confirm before deleting
- Pre-populate employee information when editing
- Automatically update the UI after create, update, and delete operations

### Employee Fields

The employee form contains:

- Name
- Email
- Mobile
- Country
- State
- District

### Validation

The form validates:

- Required fields
- Email format
- Name length
- Mobile number format
- Appropriate field lengths
- Country, State, and District values

Validation errors are displayed clearly to the user.

### Country Management

Countries are loaded from the countries API and maintained separately in Redux state.

The selected country is displayed in the employee list and used in the employee form.

### UI States

The application provides dedicated states for:

- Loading
- API errors
- Empty employee list
- Employee not found
- Form validation errors
- Delete confirmation
- Successful operations

---

# 🛠️ Technology Stack

## Core

| Technology | Version |
|---|---:|
| React | 19.2.8 |
| React DOM | 19.2.8 |
| TypeScript | 5.9.3 |
| Vite | 7.3.6 |
| Node.js | 20.20.2 |
| npm | 11.17.0 |

## State Management

| Technology | Version |
|---|---:|
| Redux Toolkit | 2.9.0 |
| React Redux | 9.2.0 |

Redux Toolkit is used for:

- Employee state
- Country state
- Loading state
- Error state
- Async API operations
- Entity management

Redux Toolkit Entity Adapter is used to efficiently manage employee entities.

## UI

| Technology | Version |
|---|---:|
| Material UI | 7.3.1 |
| Emotion React | 11.14.0 |
| Emotion Styled | 11.14.0 |

Material UI provides:

- Responsive layouts
- Tables
- Forms
- Dialogs
- Buttons
- Inputs
- Alerts
- Loading indicators
- Accessibility support

## Forms and Validation

| Technology | Version |
|---|---:|
| React Hook Form | 7.62.0 |
| Zod | 4.0.17 |
| @hookform/resolvers | 5.2.1 |

## API

| Technology | Version |
|---|---:|
| Axios | 1.11.0 |

Axios is used for REST API communication and centralized error handling.

## Routing

| Technology | Version |
|---|---:|
| React Router DOM | 7.8.2 |

## Testing

| Technology | Version |
|---|---:|
| Vitest | 3.2.4 |
| Testing Library React | 16.3.0 |
| Testing Library Jest DOM | 6.7.0 |
| Testing Library User Event | 14.6.1 |
| MSW | 2.10.4 |
| JSDOM | 26.1.0 |

## Code Quality

- ESLint
- TypeScript
- Strict typing
- Reusable components
- Separation of concerns

---

# 🏗️ Architecture

The application follows a **Smart and Dumb component architecture**.

## Smart Components

Smart components/pages are responsible for:

- Reading Redux state
- Dispatching Redux actions
- Handling business logic
- Coordinating API operations
- Managing page-level behavior
- Navigation

Examples:

```text
src/pages/
├── EmployeeListPage.tsx
├── EmployeeCreatePage.tsx
└── EmployeeEditPage.tsx
