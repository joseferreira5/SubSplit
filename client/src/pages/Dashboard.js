import React, { Component } from 'react';
import { Container, Row, Col } from '../components/Grid';
import Modal from '../components/Modal';
import Card from '../components/Card';
import API from '../utils/API';
import './Dashboard.css';

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
    this.setState({ selectedService: sub, selectedPlan: 'basePrice' });
  };

  selectPlan = plan => {
    this.setState({ selectedPlan: plan });
  };

  handleRetrieveClick = service => {
    API.retrieve({
      serviceId: service.id,
      ownerId: service.ownerId
    });
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

  /*calculateMonthly() {
    const { serviceList } = this.state;
    const sum;

    serviceList.forEach((service) => {
      sum += service.priceSelected;
    })
  }*/

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
        className='custom-select'
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
        <Row>
          <Col size='md-3'>
            <h3 className='mt-5'>Monthly Summary</h3>
          </Col>
        </Row>
        <Row>
          <Col size='md-6'>
            <h5 className='ml-4'>Total from Subscriptions: COMING SOON</h5>
          </Col>
          <Col size='md-6'>
            <h5 className='mr-auto'>Total Saved from Splitting: COMING SOON</h5>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col size='md-8'>
            <div className='mt-2'>
              <h3>Subscriptions({subscriptionList.length})</h3>
            </div>

            <button
              type='button'
              className='btn btn-primary mt-1 ml-4 mb-3'
              onClick={this.showModal}>
              Add Subscriptions!
            </button>

            {/* Modal for adding a subscription */}
            <Modal
              title='Add a Service'
              show={show}
              handleClose={this.hideModal}
              handleSubmit={e => this.handleFormSubmit()}>
              <p>
                Add the your login username and password and select your
                subcription service and plan.
              </p>
              <input
                className='form-control'
                type='text'
                placeholder='Username'
                value={username}
                onChange={e =>
                  this.setState({
                    username: e.target.value
                  })
                }
              />
              <input
                className='form-control mt-2'
                type='password'
                placeholder='Password'
                value={password}
                onChange={e =>
                  this.setState({
                    password: e.target.value
                  })
                }
              />
              <select
                className='custom-select mt-2 mb-3'
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
          </Col>
        </Row>
        <Row>
          <Col size='md-2'></Col>
          <Col size='md-8'>
            <Card
              list={subscriptionList}
              onShareClick={this.handleShareClick}
              onRetrieveClick={this.handleRetrieveClick}
            />
          </Col>
          <Col size='md-2'></Col>
        </Row>

        {/* Modal for sharing a subscription */}
        <Modal
          show={showShareModal}
          handleClose={() =>
            this.setState({
              showShareModal: false,
              shareSubscriptionId: null
            })
          }
          handleSubmit={this.handleShareSubmit}>
          <p>
            Enter the email of the person you would like to share your
            subcription with.
          </p>
          <span id='warning'>
            WARNING! You can unshare within SubSplit, however you will have to
            change the password to your subcription account to prevent further
            use.{' '}
          </span>
          <input
            className='form-control mt-2'
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
