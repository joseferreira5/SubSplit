import React from 'react';
import Navbar from "../components/Navbar";
import InviteFriend from "../components/InviteFriend";
import {Container} from "../components/Grid";

function Addfriend(){
    return(
        <Container>
            <Navbar/>
            <InviteFriend/>
        </Container>
    )
}


export default Addfriend;