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
            <Row className = "bob">
                <Col size ="md-8 info"  ><h2 >Welcome to Sub-Spilt!</h2><p className = "mt-5">Were you can manage your subscriptions and share them with friends!</p></Col>
                <Col size = "md-4 info"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrPtv1VM2miLPNv-_iR-RiNrfS8_eFc2DAblOYKDL4wieO0_1L8w" alt="Smiley face"/></Col>               
            </Row>
        </Container>

    // </React.Fragment>
    )
}

export default Home;