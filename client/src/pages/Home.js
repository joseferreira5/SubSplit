import React from "react";
import {Container,Row,Col} from "../components/Grid"
import Navbar from "../components/Navbar"


function Home() {
    return(
    <React.Fragment>
        <Navbar>Sub-Split!</Navbar>
        <Container>
            <Row>
                <Col size ="md-6">hi</Col>
                <Col size="md-6">hi</Col>
            </Row>
        </Container>

    </React.Fragment>
    )
}

export default Home;