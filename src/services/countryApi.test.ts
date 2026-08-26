import { describe, it, expect } from 'vitest'
import { countryApi } from '../services/countryApi'
import type { Country } from '../types/country'

describe('countryApi', () => {
  describe('getAll', () => {
    it('should fetch all countries successfully', async () => {
      const countries = await countryApi.getAll()
      expect(Array.isArray(countries)).toBe(true)
      expect(countries.length).toBeGreaterThan(0)
    })

    it('should return countries with id and name properties', async () => {
      const countries = await countryApi.getAll()
      countries.forEach((country: Country) => {
        expect(country).toHaveProperty('id')
        expect(country).toHaveProperty('name')
        expect(typeof country.id).toBe('string')
        expect(typeof country.name).toBe('string')
      })
    })

    it('should include common countries', async () => {
      const countries = await countryApi.getAll()
      const countryNames = countries.map((c: Country) => c.name)
      expect(countryNames).toContain('USA')
      expect(countryNames).toContain('India')
      expect(countryNames).toContain('UK')
      expect(countryNames).toContain('Canada')
    })
  })
})
