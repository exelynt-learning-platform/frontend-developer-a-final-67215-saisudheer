import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Country } from '../../types/country'
import { countryApi } from '../../services/countryApi'

export interface CountryState {
  entities: Country[]
  loading: boolean
  error: string | null
}

// Async thunks
export const fetchCountries = createAsyncThunk(
  'countries/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await countryApi.getAll()
    } catch {
      return rejectWithValue('Failed to fetch countries')
    }
  },
)

const initialState: CountryState = {
  entities: [],
  loading: false,
  error: null,
}

const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false
        state.entities = action.payload
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default countrySlice.reducer
