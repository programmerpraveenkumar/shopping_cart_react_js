import './App.css';
import Home from './Home';

import Footer  from './Footer';
import Product from './Product'
import CheckoutCart from './CheckoutCart';
import Header from './Header';
import {ContextProvider, cartState, reducer } from './ContextProvider'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <ContextProvider reducer={reducer} cartState={cartState}>
    <div>
     
       <Router>
       <Header></Header>
       <Route exact path="/product/:id">
         <Product></Product>
      </Route>
      <Route exact path="/checkoutcart">
         <CheckoutCart></CheckoutCart>
      </Route>
       <Route exact path="/">
         <Home></Home>
      </Route>      
      </Router>
      <Footer></Footer>
    </div>
    </ContextProvider>
  );
}

export default App;
