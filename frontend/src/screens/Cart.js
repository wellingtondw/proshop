import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { addToCart } from '../redux/actions/cartActions'

import { Row } from 'react-bootstrap'
import Message from '../components/Message'
import { useEffect } from 'react'



const Cart = ({ match, location, history }) => {
  const productId = match.params.id 
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
 
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if(productId) {
      dispatch(addToCart({ id: productId, qty }))
    }
  }, [dispatch, productId, qty])

  return (
    <div>
      Cart
    </div>
  )
}

export default Cart
