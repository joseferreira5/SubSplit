import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Home from "./pages/Home";
// import Navbar from "./components/Navbar"
// import Container from "./components/Grid"
// import Row from "./components/Grid"
// import Col from "./components/Grid"
// import { Container, Row, Col } from "./components/Grid";


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
