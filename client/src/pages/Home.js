import React from "react";
import {Container,Row,Col} from "../components/Grid"
import Navbar from "../components/Navbar"
import "./home.css"


function Home() {
    return(
    // <React.Fragment>
        /* <Navbar>Sub-Split!</Navbar> */
        <Container>
        <Navbar>Sub-Split!</Navbar>
            <Row>
                <Col size ="md-12 info"  ><h3 className = "mt-5">Welcome to Sub-spilt. Were you can manage your prescriptions and share them with friends!.</h3></Col>
                
            </Row>
        </Container>

    // </React.Fragment>
    )
}

export default Home;