import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { uiActions } from './store/uiSlice'
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import "./App.css";
import { sendCartData } from "./store/cartSlice";

let isFirstRender = true;

function App() {
  const dispatch = useDispatch()  ;
  
  const cart = useSelector(state => state.cart);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const notification = useSelector(state => state.ui.notification);
  
  
  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    dispatch(sendCartData(cart))

  },[cart, dispatch])

  return (
    <div className="App">
      {notification?.open && <Notification type={notification?.type} message={notification?.message} />}
      {!isLoggedIn ? 
        <Auth /> 
      :
       <Layout/>
      }
    </div>
  );
}

export default App;
