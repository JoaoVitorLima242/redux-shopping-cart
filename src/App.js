import React from "react";

import Auth from "./components/Auth";
import Layout from "./components/Layout";
import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    
  return (
    <div className="App">
      {!isLoggedIn ? 
        <Auth /> 
      :
       <Layout/>
      }
    </div>
  );
}

export default App;
