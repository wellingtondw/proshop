import { combineReducers } from 'redux'
import { productListReducer, productDetailsReducer } from './productReducers'
import { cartReducer } from './cartReducers'

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer
})

export default reducers