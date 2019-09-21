import React, { Component } from 'react';
import {Container,Row,Col} from "../Grid"
import "./style.css";
import Modal from "../Modal";
import Card from "../Card"



class Dashboard extends Component {
    state = {
        show: false,
        subscriptionList:[],
        selectedSubscription:"",
        selectedPlan: ""
   };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  
  selectSubscription = (sub) => {
      console.log("SELECTED SUB", sub)
      this.setState({selectedSubscription: sub})
  }

  selectPlan = (plan) => {
      this.setState({selectedPlan: plan})
  }

  handleFormSubmit = () => {
        
        const newState = [...this.state.subscriptionList]
        newState.push({subscription: this.state.selectedSubscription, plan: this.state.selectedPlan}) 
        this.setState({ subscriptionList: newState })
        console.log(this.state.subscriptionList)
        // this.setState({planList:this.state.planList.push(this.state.selectedplan)}) 
  }

// const Dashboard = () => {
    render() { 
    return(
    <Container>
        <div className = "row1">
        <Row >
            <Col size = "md-2" >
                <div className="card w-3 mt-5">
                    <div className="card-body">
                        <h5 className="card-title">Add A Friend!</h5>
                        <p className="card-text">Click the button below and enter an email to send invite.</p>
                        <a href="/addfriend" className="btn btn-primary">Button</a>
                    </div>
                </div>
            </Col>
            <Col size = "md-8"> 
                <div className = "border rounded mt-5">
                <h3 className = "d-flex justify-content-center">Your Subscriptions</h3>
                </div>
            <Modal  show={this.state.show} handleClose={this.hideModal} handleSubmit={(e)=>this.handleFormSubmit()}>
                <p>Add a service!</p>
                <select className="custom-select custom-select-lg mb-3" onChange={(e)=> this.selectSubscription(e.target.value)}>
                <option defaultValue= "Select a Service">Select a Service</option>
                <option value="Netflix">Netflix</option>
                <option value="HBO Go">HBO GO</option>
                <option value="Hulu">Hulu</option>
                </select>

                <select className="custom-select custom-select-sm" onChange={(e)=> this.selectPlan(e.target.value)}>
                <option selected>Select Payment Package</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
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
                <Card list={this.state.subscriptionList}/>
            </Col>
            <Col size = "md-2"></Col>

        </Row>

        
    </Container>
    )

}

}
export default Dashboard;