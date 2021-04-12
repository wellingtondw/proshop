import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './redux/store'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './screens/Home'
import ProductDetails from './screens/ProductDetails'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Route path='/' component={Home} exact />
            <Route path='/product/:id' component={ProductDetails} exact />
          </Container>
        </main>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
