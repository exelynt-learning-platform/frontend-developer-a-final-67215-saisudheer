import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from '../features/employees/employeeSlice'
import countryReducer from '../features/countries/countrySlice'

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    countries: countryReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
