import { describe, it, expect, beforeEach } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import countryReducer, { fetchCountries } from './countrySlice'
import type { CountryState } from './countrySlice'
import type { Country } from '../../types/country'

const createTestStore = () =>
  configureStore({
    reducer: {
      countries: countryReducer,
    },
  })

describe('countrySlice', () => {
  let store: ReturnType<typeof createTestStore>

  beforeEach(() => {
    store = createTestStore()
  })

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState().countries as CountryState
      expect(state.entities).toEqual([])
      expect(state.loading).toBe(false)
      expect(state.error).toBeNull()
    })
  })

  describe('fetchCountries thunk', () => {
    it('should handle pending state', () => {
      store.dispatch(fetchCountries.pending('', undefined))
      const state = store.getState().countries as CountryState
      expect(state.loading).toBe(true)
      expect(state.error).toBeNull()
    })

    it('should handle fulfilled state', () => {
      const mockCountries: Country[] = [
        { id: '1', name: 'USA' },
        { id: '2', name: 'India' },
        { id: '3', name: 'UK' },
        { id: '4', name: 'Canada' },
      ]

      store.dispatch(fetchCountries.fulfilled(mockCountries, '', undefined))
      const state = store.getState().countries as CountryState

      expect(state.loading).toBe(false)
      expect(state.entities).toEqual(mockCountries)
      expect(state.entities).toHaveLength(4)
      expect(state.error).toBeNull()
    })

    it('should handle rejected state', () => {
      const errorMessage = 'Failed to fetch countries'
      store.dispatch(fetchCountries.rejected(new Error(), '', undefined, errorMessage))
      const state = store.getState().countries as CountryState

      expect(state.loading).toBe(false)
      expect(state.error).toBe(errorMessage)
      expect(state.entities).toEqual([])
    })
  })

  describe('country data', () => {
    it('should preserve country data structure', () => {
      const mockCountries: Country[] = [
        { id: '1', name: 'USA' },
        { id: '2', name: 'India' },
      ]

      store.dispatch(fetchCountries.fulfilled(mockCountries, '', undefined))
      const state = store.getState().countries as CountryState

      state.entities.forEach((country: Country) => {
        expect(country).toHaveProperty('id')
        expect(country).toHaveProperty('name')
        expect(typeof country.id).toBe('string')
        expect(typeof country.name).toBe('string')
      })
    })
  })
})
