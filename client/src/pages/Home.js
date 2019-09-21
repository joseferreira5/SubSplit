import React, { Component } from 'react';
import { Container, Row, Col } from '../components/Grid';
import './home.css';

class Home extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col size='md-12 info'>
            <h3 className='mt-5'>
              Welcome to Sub-spilt. Were you can manage your subscriptions and
              share them with friends!.
            </h3>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
