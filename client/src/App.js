import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home"
import Loginpage from "./pages/Loginpage"

function App() {
  return (
    <Router>
    <div>
     
     
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={Home} />
        <Route exact path="/login" component={Loginpage} />
       
     
    </div>
  </Router>


  );
}

export default App;
