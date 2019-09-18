import React from "react";
import CreateAccount from "../components/CreateAccount"
import {Container,Row,Col} from "../components/Grid"
import Navbar from "../components/Navbar"


function CreateAcc() {
    return(
        <Container>
        <Navbar/>
        <CreateAccount/>
        </Container>
    )
}


export default CreateAcc
