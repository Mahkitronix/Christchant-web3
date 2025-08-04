import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import LoginForm from '../user-login-form'
import '@testing-library/jest-dom'

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

const mockStore = configureStore({
  reducer: {
    auth: (state = { isAuthenticated: false, user: null }) => state,
  },
})

describe('LoginForm', () => {
  it('renders login form', () => {
    render(
      <Provider store={mockStore}>
        <LoginForm />
      </Provider>
    )

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })
})
