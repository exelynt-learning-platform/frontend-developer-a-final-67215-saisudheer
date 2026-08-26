import type { RootState } from '../../app/store'

export const selectCountries = (state: RootState) => state.countries.entities
export const selectCountriesLoading = (state: RootState) => state.countries.loading
export const selectCountriesError = (state: RootState) => state.countries.error
