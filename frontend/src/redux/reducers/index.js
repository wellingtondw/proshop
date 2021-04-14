import { combineReducers } from 'redux'
import { productListReducer, productDetailsReducer } from './productReducers'
import { cartReducer } from './cartReducers'
import { userReducer } from './userReducer'

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userReducer
})

export default reducers