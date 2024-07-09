import { combineReducers, configureStore } from '@reduxjs/toolkit'
import listSlice from "./slices/listSlice";
import { reducer as toastrReducer } from "react-redux-toastr";

const rootReducer = combineReducers({
  list: listSlice,
  toastr: toastrReducer,
});
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']