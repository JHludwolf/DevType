import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import exampleReducer from '../reducers/exampleReducer'
import themeReducer from '../reducers/themeReducer'

const reducer = combineReducers({
  example: exampleReducer,
  theme: themeReducer
})
const store = configureStore({
  reducer,
})
export default store;
