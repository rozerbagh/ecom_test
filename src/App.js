import { useState, useEffect, useCallback } from "react";
import { useStore, connect, useSelector } from 'react-redux';
import Container from "@mui/material/Container";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import Profile from "./components/Profile";
import { addToCart } from './store/actions'
const history = createBrowserHistory();
function App(props) {
  const store = useStore();
  const handleAddToCart = (data) => {

    let addItemNo = store.getState().reducer.itemNo;
    addItemNo = addItemNo + 1;
    let arr = store.getState().reducer.items;
    arr.push(data);
    store.dispatch(addToCart(arr, addItemNo));
  }
  const handleRemoveFromCart = (data) => {
    let addItemNo = store.getState().reducer.itemNo;
    addItemNo = addItemNo - 1;
    addItemNo = addItemNo > 0 ? addItemNo : 0;
    let arr = store.getState().reducer.items.filter(ele => data.id !== ele.id);
    store.dispatch(addToCart(arr, addItemNo));
  }

  useEffect(() => {
    try {
      let serializedState = localStorage.getItem('state');
      if (serializedState === null) return undefined
      let state = JSON.parse(serializedState);

      store.dispatch(addToCart(state.reducer.cartItems, state.reducer.cartItemNo));
    } catch (e) {

    }
  }, [])


  return (
    <Router history={history}>
      <Navbar cartItemNo={props.itemNo} {...props} />
      <Container maxWidth="lg">
        <Switch>
          <Route exact path="/" >
            <Home
              {...props}
              handleAddToCart={handleAddToCart}
            />
          </Route>
          <Route exact path="/cart" >
            <Cart {...props} cartItems={props.items} removeFromCart={handleRemoveFromCart} />
          </Route>
          <Route exact path="/product_details/:id">
            <ProductDetails {...props} addToCart={handleAddToCart} />
          </Route>
          <Route exact path="/profile">
            <Profile {...props} />
          </Route>
        </Switch>
      </Container>
    </Router>);
}
// const mapStateToProps = (state) => {
//   return {
//     itemNo: state.reducer.cartItemNo,
//     items: state.reducer.cartItems,
//   }
// }
// export default connect(mapStateToProps, null)(App);
export default App;
