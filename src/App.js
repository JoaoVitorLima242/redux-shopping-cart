import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { uiActions } from './store/uiSlice'
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const notification = useSelector(state => state.ui.notification);
  
  useEffect(() => {
    const sendRequest = async () => {
      dispatch(uiActions.showNotification({
        open: true,
        message: 'Sending request',
        type: 'warning'
      }))
      const res = await fetch('https://redux-68018-default-rtdb.firebaseio.com/cartItems.json', {
        method: 'PUT',
        body: JSON.stringify(cart)
      });
      const data = await res.json();
      dispatch(uiActions.showNotification({
        open: true,
        message: 'Send Request to Database successfully!',
        type: 'success'
      }))
    };
    
    sendRequest().catch(err => {
      dispatch(uiActions.showNotification({
        open: true,
        message: 'Sending request error',
        type: 'error'
      }))
    });
  },[cart])

  return (
    <div className="App">
      {notification.open && <Notification type={notification?.type} message={notification?.message} />}
      {!isLoggedIn ? 
        <Auth /> 
      :
       <Layout/>
      }
    </div>
  );
}

export default App;
