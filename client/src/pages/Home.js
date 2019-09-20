import React, { Component } from 'react';
import { Container, Row, Col } from '../components/Grid';
import Navbar from '../components/Navbar';
import './home.css';

import API from '../utils/API';

class Home extends Component {
  state = {
    email: '',
    password: ''
  };

  submit() {
    API.userLogin(this.state);
  }

  test() {
    API.getSubs().then(response => {
      console.log(response);
    });
  }

  render() {
    const { email, password } = this.state;

    return (
      // <React.Fragment>
      /* <Navbar>Sub-Split!</Navbar> */
      <Container>
        <Navbar>Sub-Split!</Navbar>
        <Row>
          <Col size='md-12 info'>
            <h3 className='mt-5'>
              Welcome to Sub-spilt. Were you can manage your subscriptions and
              share them with friends!.
            </h3>
          </Col>
        </Row>

        <input
          value={email}
          placeholder='Username'
          onChange={e =>
            this.setState({
              email: e.target.value
            })
          }
        />
        <input
          value={password}
          placeholder='Password'
          onChange={e =>
            this.setState({
              password: e.target.value
            })
          }
        />

        <button onClick={this.submit.bind(this)}>Login bruh</button>

        <button onClick={this.test.bind(this)}>Test me bruh</button>
      </Container>
      // </React.Fragment>
    );
  }
}

export default Home;
