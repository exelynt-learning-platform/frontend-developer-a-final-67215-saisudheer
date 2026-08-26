import { http, HttpResponse } from 'msw'
import type { Employee } from '../../types/employee'
import type { Country } from '../../types/country'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1'

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    mobile: '1234567890',
    country: 'USA',
    state: 'California',
    district: 'Los Angeles',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    mobile: '9876543210',
    country: 'USA',
    state: 'Texas',
    district: 'Houston',
  },
]

const mockCountries: Country[] = [
  { id: '1', name: 'USA' },
  { id: '2', name: 'India' },
  { id: '3', name: 'UK' },
  { id: '4', name: 'Canada' },
]

export const handlers = [
  // GET all employees
  http.get(`${API_BASE_URL}/employee`, () => {
    return HttpResponse.json(mockEmployees)
  }),

  // GET employee by ID
  http.get(`${API_BASE_URL}/employee/:id`, ({ params }) => {
    const employee = mockEmployees.find((e) => e.id === params.id)
    if (!employee) {
      return HttpResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return HttpResponse.json(employee)
  }),

  // POST create employee
  http.post(`${API_BASE_URL}/employee`, async ({ request }) => {
    const body = (await request.json()) as Employee
    const newEmployee = {
      ...body,
      id: String(mockEmployees.length + 1),
    }
    mockEmployees.push(newEmployee)
    return HttpResponse.json(newEmployee, { status: 201 })
  }),

  // PUT update employee
  http.put(`${API_BASE_URL}/employee/:id`, async ({ params, request }) => {
    const body = (await request.json()) as Partial<Employee>
    const index = mockEmployees.findIndex((e) => e.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ error: 'Not found' }, { status: 404 })
    }
    const updated = { ...mockEmployees[index], ...body, id: params.id as string }
    mockEmployees[index] = updated
    return HttpResponse.json(updated)
  }),

  // DELETE employee
  http.delete(`${API_BASE_URL}/employee/:id`, ({ params }) => {
    const index = mockEmployees.findIndex((e) => e.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ error: 'Not found' }, { status: 404 })
    }
    mockEmployees.splice(index, 1)
    return HttpResponse.json({}, { status: 200 })
  }),

  // GET all countries
  http.get(`${API_BASE_URL}/country`, () => {
    return HttpResponse.json(mockCountries)
  }),
]
