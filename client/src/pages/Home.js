import React from 'react';
import Navbar from "../components/Navbar"
// import Container from "./components/Grid"
// import Row from "./components/Grid"
// import Col from "./components/Grid"
import { Container, Row, Col } from "../components/Grid";



function Home(){
    return(
        <React.Fragment>
        <Navbar>Subsplit!</Navbar>
        <Container>
  
            <Row>
                <Col size ="md-6">hi</Col>
                <Col size ="md-6">hi</Col>
            </Row>
  
        </Container>
        </React.Fragment>


    )
}

export default Home;