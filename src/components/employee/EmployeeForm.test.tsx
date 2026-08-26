import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { store } from '../../app/store'
import { EmployeeForm } from './EmployeeForm'

describe('EmployeeForm', () => {
  it('shows validation errors when submitted empty', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(
      <Provider store={store}>
        <EmployeeForm onSubmit={onSubmit} />
      </Provider>,
    )

    await user.click(screen.getByRole('button', { name: 'Create Employee' }))

    expect(await screen.findByText('Name is required')).toBeInTheDocument()
    expect(screen.getByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Mobile is required')).toBeInTheDocument()
    expect(screen.getByText('Country is required')).toBeInTheDocument()
    expect(screen.getByText('State is required')).toBeInTheDocument()
    expect(screen.getByText('District is required')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })
})
