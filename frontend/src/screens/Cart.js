import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { addToCart, removeFromCart } from '../redux/actions/cartActions'

import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
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

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart({ id }))
  } 

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
    console.log('checkout')
  }

  return (
    <Row>
      <Col md='8'>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> : (
          <ListGroup variant='flush'>
            {cartItems.map(cartItem => (
              <ListGroup.Item key={cartItem.product}>
                <Row>
                  <Col md='2'>
                    <Image src={cartItem.image} alt={cartItem.name} fluid rounded />
                  </Col>
                  <Col md='4'>
                    <Link to={`/product/${cartItem.product}`}>{cartItem.name}</Link>
                  </Col>
                  <Col md='2'>
                    ${cartItem.price}
                  </Col>
                  <Col md='2'>
                    <Form.Control 
                      as='select' 
                      value={cartItem.qty} 
                      onChange={(e) => dispatch(addToCart({ id: cartItem.product, qty: Number(e.target.value)}))}
                    >
                      {[...Array(cartItem.countInStock).keys()].map(qty => (
                        <option key={qty + 1} value={qty + 1}>
                          {qty + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md='2'>
                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(cartItem.product)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>  
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md='4'>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button 
                type='button' 
                className='btn-block' 
                disabled={cartItems.length === 0} 
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default Cart
