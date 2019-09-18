import React, { Component } from 'react';
import {Container,Row,Col} from "../Grid"
import "./style.css";
import Modal from "../Modal";
import Card from "../Card"



class Dashboard extends Component {
    state = {
        show: false,
        subscriptionsList:[],
        selectedSubsciption:"" };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  
  selectSubscription = (sub) => {
      console.log(sub)
      this.setState({selectedSubsciption: sub})
      console.log(this.state.selectedSubsciption)
  }

  handleFormSubmit = () => {
        this.setState({ subscriptionList: this.state.subscriptionsList.push(this.state.selectedSubsciption) })
        console.log(this.state.subscriptionsList)
  }
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
            <Modal  show={this.state.show} handleClose={this.hideModal} handleSubmit={(e)=>this.handleFormSubmit()}>
                <p>Add a service!</p>
                <select class="custom-select custom-select-lg mb-3" onChange={(e)=> this.selectSubscription(e.target.value)}>
                <option defaultValue= "Select a Service">Select a Service</option>
                <option value="Netflix">Netflix</option>
                <option value="HBO Go">HBO Go</option>
                <option value="Hulu">Hulu</option>
                </select>

                <select class="custom-select custom-select-sm">
                <option selected>Select Payment Package</option>
                <option value="1">Standard</option>
                <option value="2">Premium</option>
                </select>

            </Modal>
                <button type ="button" onClick = {this.showModal} className = "mt-3 mb-3">Add Subscriptions!</button>
            </Col>
            <Col size = "md-2"></Col>  
        </Row>
        </div>
        <Row>
            <Col size = "md-2"></Col>
            <Col size = "md-8">
                <Card list={this.state.subscriptionsList}/>
            {/* /* <div class="card card2">
            <div class="card-header">
            Netflix
            </div>
            <div class="card-body test" >
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            </div>
            </div>
            <div id="render"/> */ }
            </Col>
            <Col size = "md-2"></Col>

        </Row>

        
    </Container>
    )

}

}
export default Dashboard;