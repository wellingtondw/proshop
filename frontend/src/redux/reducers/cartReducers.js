import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM
} from '../constants/cartConstants'

const cartItemsFromStorage = localStorage.getItem('cartItems')
const initialState = {
  cartItems: cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : []
}

export const cartReducer = (state = initialState, action) => {

  switch(action.type) {
    case CART_ADD_ITEM:
      const item = action.payload

      const existItem = state.cartItems.find(cartItem => cartItem.product === item.product)

      if(existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(cartItem => {
            if(cartItem.product === existItem.product) {
              return item
            }

            return cartItem
          })
        } 
      }

      return {
        ...state,
        cartItems: [...state.cartItems, item]
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.product !== action.payload)
      }
    default:
      return state
  }
}