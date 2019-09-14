import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home"
import Loginpage from "./pages/Loginpage"
import CreateAcc from "./pages/CreateAcc"

function App() {
  return (
    <Router>
    <div>
     
     
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={Home} />
        <Route exact path="/login" component={Loginpage} />
        <Route exact path="/create" component={CreateAcc} />
       
     
    </div>
  </Router>


  );
}

export default App;
