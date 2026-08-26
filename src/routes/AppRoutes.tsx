import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { EmployeeListPage } from '../pages/EmployeeListPage'
import { EmployeeCreatePage } from '../pages/EmployeeCreatePage'
import { EmployeeEditPage } from '../pages/EmployeeEditPage'

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/employees" replace />} />
        <Route path="/employees" element={<EmployeeListPage />} />
        <Route path="/employees/new" element={<EmployeeCreatePage />} />
        <Route path="/employees/:id/edit" element={<EmployeeEditPage />} />
      </Routes>
    </Router>
  )
}
