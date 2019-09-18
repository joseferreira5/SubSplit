import React from "react";
import Navbar from "../components/Navbar"
import Dashboard from "../components/Dashboard"
import { Container } from "../components/Grid";


function Dash() {
    return(
        <Container>
            <Navbar/>
            <Dashboard/>
        </Container>
    )
}


export default Dash;