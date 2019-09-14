import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home"

function App() {
  return (
    <Router>
    <div>
     
     
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={Home} />
       
     
    </div>
  </Router>


  );
}

export default App;
