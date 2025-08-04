import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  token: string | null
  isAuthenticated: boolean
  user: {
    role?: string
    userType: string
    email: string | null
    firstName: string | null
    lastName: string | null
    isVerified?: boolean
    status?: string
  } | null
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserStore: (
      state,
      action: PayloadAction<{ token: string; user: AuthState['user'] }>
    ) => {
      const { token, user } = action.payload
      state.token = token
      state.user = user
      state.isAuthenticated = true
    },
    clearCredentials: (state) => {
      state.token = null
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { setUserStore, clearCredentials } = authSlice.actions
