import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

interface UIState {
  isSidebarCollapsed: boolean
  isDarkMode: boolean // Add dark mode state
}

// Load initial state from localStorage
const loadState = (): boolean => {
  try {
    const serializedState = localStorage.getItem('sidebarCollapsed')
    if (serializedState === null) {
      return false
    }
    return JSON.parse(serializedState)
  } catch {
    return false
  }
}

// Load dark mode state
const loadDarkModeState = (): boolean => {
  try {
    const serializedState = localStorage.getItem('darkMode')
    if (serializedState === null) {
      return false
    }
    return JSON.parse(serializedState)
  } catch {
    return false
  }
}

const initialState: UIState = {
  isSidebarCollapsed: loadState(),
  isDarkMode: loadDarkModeState(), // Initialize dark mode state
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed
      // Save to localStorage
      localStorage.setItem(
        'sidebarCollapsed',
        JSON.stringify(state.isSidebarCollapsed)
      )
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload
      // Save to localStorage
      localStorage.setItem(
        'sidebarCollapsed',
        JSON.stringify(state.isSidebarCollapsed)
      )
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode
      // Save to localStorage
      localStorage.setItem('darkMode', JSON.stringify(state.isDarkMode))
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload
      // Save to localStorage
      localStorage.setItem('darkMode', JSON.stringify(state.isDarkMode))
    },
  },
})

export const {
  toggleSidebar,
  setSidebarCollapsed,
  toggleDarkMode,
  setDarkMode,
} = uiSlice.actions

export const selectSidebarCollapsed = (state: RootState) =>
  state.ui.isSidebarCollapsed

export const selectDarkMode = (state: RootState) => state.ui.isDarkMode // Selector for dark mode
export default uiSlice.reducer
