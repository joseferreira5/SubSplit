import React, { Component } from 'react';
import {Container,Row,Col} from "../Grid"
import "./style.css";
import Modal from "../Modal";



class Dashboard extends Component {
    state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };



// const Dashboard = () => {
    render() { 
    return(
    <Container>
        <div className = "row1">
        <Row >
            <Col size = "md-2" >
                <div className="card w-5 mt-5">
                    <div className="card-body">
                        <h5 className="card-title">Add A Friend!</h5>
                        <p className="card-text">Click the button below and enter an email to send invite.</p>
                        <a href="#" class="btn btn-primary">Button</a>
                    </div>
                </div>
            </Col>
            <Col size = "md-8"> 
                <div className = "border rounded mt-5">
                <h3 className = "d-flex justify-content-center">Your Subscriptions</h3>
                </div>
                <Modal  show={this.state.show} handleClose={this.hideModal}>
                <p>Modal</p>
                <p>Data</p>
                </Modal>
                <button type ="button" onClick = {this.showModal} className = "mt-3 mb-3">Add Subscriptions!</button>
            </Col>
            <Col size = "md-2"></Col>
          
        </Row>
        </div>
        <Row>
            <Col size = "md-2"></Col>
            <Col size = "md-8">
            <div class="card card2">
            <div class="card-header">
            Netflix
            </div>
            <div class="card-body">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            </div>
            </div>
            </Col>
            <Col size = "md-2"></Col>

        </Row>

        
    </Container>
    )

}

}
export default Dashboard;