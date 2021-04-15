import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { getUserDetails } from '../redux/actions/userActions'

const Profile = ({ location, history }) => {  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if(!userInfo) {
      return history.push('/login')
    }

    if(!user.name) {
      return dispatch(getUserDetails())
    }
    
    setName(user.name)
    setEmail(user.email)
  }, [history, userInfo, dispatch, user])

  const submitHandler = (e) => {
    e.preventDefault()

    if(password !== confirmPassword) {
      return setMessage('Passwords do not match')
    }

    setMessage('')

    //DISPATCH UPDATE PROFILE
  }

  return (
    <Row>
      <Col md='3'>
      <h2>User Profile</h2>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Enter your name' 
            value={name} 
            onChange={e => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            type='email' 
            placeholder='Enter your email' 
            value={email} 
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type='password' 
            placeholder='Enter your password' 
            value={password} 
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='confirm-password'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type='password' 
            placeholder='Enter your password' 
            value={confirmPassword} 
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button type='submit' variant='primary'>
          Update
        </Button>
      </Form>
      </Col>
      <Col md='9'>
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default Profile
