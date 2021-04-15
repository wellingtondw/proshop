import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './redux/store'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './screens/Home'
import ProductDetails from './screens/ProductDetails'
import Cart from './screens/Cart'
import Login from './screens/Login'
import Register from './screens/Register'
import Profile from './screens/Profile'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Route path='/login' component={Login} exact />
            <Route path='/register' component={Register} exact />
            <Route path='/' component={Home} exact />
            <Route path='/profile' component={Profile} exact />
            <Route path='/product/:id' component={ProductDetails} exact />
            <Route path='/cart/:id?' component={Cart} exact />
          </Container>
        </main>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
