import { combineReducers } from 'redux'
import { productListReducer, productDetailsReducer } from './productReducers'

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer
})

export default reducers