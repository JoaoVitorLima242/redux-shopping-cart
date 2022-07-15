import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import "./App.css";

function App() {
  const cart = useSelector(state => state.cart)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  
  useEffect(() => {
    const sendRequest = async () => {
      const res = await fetch('https://redux-68018-default-rtdb.firebaseio.com/cartItems.json', {
        method: 'PUT',
        body: JSON.stringify(cart)
      });
      const data = await res.json();
    };
    
    sendRequest();
  },[cart])

  return (
    <div className="App">
      <Notification type='success' message="This is a dummy message" />
      {!isLoggedIn ? 
        <Auth /> 
      :
       <Layout/>
      }
    </div>
  );
}

export default App;
