import { combineReducers } from 'redux'
import { productListReducer } from './productReducers'

const reducers = combineReducers({
  productList: productListReducer
})

export default reducers