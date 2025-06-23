import { configureStore } from '@reduxjs/toolkit'
import SeePDFSlice from './features/SeePDFSlice'

export const makeStore = (reducer = {}) => {
  return configureStore({
    reducer: {
      SeePDF: SeePDFSlice
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']