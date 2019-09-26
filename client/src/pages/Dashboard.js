import React, { Component } from 'react';
import { Container, Row, Col } from '../components/Grid';
import Modal from '../components/Modal';
import Card from '../components/Card';
import API from '../utils/API';

class Dashboard extends Component {
  state = {
    show: false,
    serviceList: [],
    planList: [],
    subscriptionList: [],
    selectedService: '',
    selectedPlan: '',
    username: '',
    password: '',
    showShareModal: false,
    shareSubscriptionId: null
  };

  componentDidMount() {
    API.getServices().then(response => {
      const serviceList = response.data;
      this.setState({ serviceList: serviceList });
    });

    API.getSubs().then(response => {
      const subs = response.data;
      this.setState({ subscriptionList: subs });
    });
  }

  getServiceById(id) {
    return this.state.serviceList.find(s => s.id === parseInt(id));
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  selectService = sub => {
    console.log('SELECTED SUB', sub);
    this.setState({ selectedService: sub, selectedPlan: 'basePrice' });
  };

  selectPlan = plan => {
    this.setState({ selectedPlan: plan });
  };

  handleFormSubmit = () => {
    const serviceId = this.state.selectedService;
    const priceSelected = this.state.selectedPlan;
    const username = this.state.username;
    const password = this.state.password;

    const data = {
      serviceId,
      priceSelected,
      username,
      password
    };

    API.addSub(data).then(response => {
      this.setState({
        subscriptionList: [...this.state.subscriptionList, response.data],
        selectedService: '',
        selectedPlan: 'basePrice',
        username: '',
        password: '',
        show: false
      });
    });
  };

  handleShareClick = id => {
    this.setState({
      showShareModal: true,
      shareSubscriptionId: id
    });
  };

  handleShareSubmit = e => {
    e.preventDefault();

    const data = {
      email: this.state.shareEmail,
      serviceId: this.state.shareSubscriptionId
    };

    API.invite(data).then(response => {
      this.setState({
        showShareModal: false,
        shareEmail: '',
        shareSubscriptionId: null
      });
    });
  };

  renderPriceList() {
    const sub = this.getServiceById(this.state.selectedService);
    const priceList = [
      {
        name: `Base - ${sub.basePrice}`,
        value: 'basePrice'
      }
    ];

    if (sub.premiumPrice) {
      priceList.push({
        name: `Premium - ${sub.premiumPrice}`,
        value: 'premiumPrice'
      });
    }

    return (
      <select
        className='custom-select custom-select-sm'
        value={this.state.selectedPlan}
        onChange={e => this.selectPlan(e.target.value)}>
        {priceList.map(price => (
          <option key={price.value} value={price.value}>
            {price.name}
          </option>
        ))}
      </select>
    );
  }

  render() {
    const {
      show,
      showShareModal,
      serviceList,
      subscriptionList,
      selectedService,
      username,
      password,
      shareEmail
    } = this.state;

    return (
      <Container>
        <div className='row1'>
          <Row>
            <Col size='md-8'>
              <div className='border rounded mt-5'>
                <h3 className='d-flex justify-content-center'>
                  Your Subscriptions
                </h3>
              </div>
              <Modal
                show={show}
                handleClose={this.hideModal}
                handleSubmit={e => this.handleFormSubmit()}>
                <p>Add a service!</p>

                <input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={e =>
                    this.setState({
                      password: e.target.value
                    })
                  }
                />
                <input
                  type='text'
                  placeholder='Username'
                  value={username}
                  onChange={e =>
                    this.setState({
                      username: e.target.value
                    })
                  }
                />

                <select
                  className='custom-select custom-select-lg mb-3'
                  value={selectedService}
                  onChange={e => this.selectService(e.target.value)}>
                  <option defaultValue='Select a Service'>
                    Select a Service
                  </option>
                  {serviceList.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>

                {selectedService && this.renderPriceList()}
              </Modal>
              <button
                type='button'
                onClick={this.showModal}
                className='mt-3 mb-3'>
                Add Subscriptions!
              </button>
            </Col>
            <Col size='md-2'></Col>
          </Row>
        </div>
        <Row>
          <Col size='md-2'></Col>
          <Col size='md-8'>
            <Card
              list={subscriptionList}
              onShareClick={this.handleShareClick}
            />
          </Col>
          <Col size='md-2'></Col>
        </Row>

        <Modal
          show={showShareModal}
          handleClose={() =>
            this.setState({
              showShareModal: false,
              shareSubscriptionId: null
            })
          }
          handleSubmit={this.handleShareSubmit}>
          <input
            placeholder='Email'
            value={shareEmail}
            onChange={e => {
              this.setState({
                shareEmail: e.target.value
              });
            }}
          />
        </Modal>
      </Container>
    );
  }
}
export default Dashboard;
