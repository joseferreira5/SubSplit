import React, { Component } from 'react';
import { Container, Row, Col } from '../components/Grid';
import './home.css';
import npc from './images/npc.jpg';

class Home extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col size='md-6 info'>
            <h2 className='mt-5 mb-3'>Welcome to Sub-split!</h2>
            <p className='mb-5'>
              Were you can manage your subscriptions and share them with
              friends!
            </p>
            <hr />
            <h2 className='mt-2'>How is works?</h2>
            <p>
              To get started, create an account and add your subscriptions. You
              can then share them with frinds to split the cost!
            </p>
            <p>
              <strong>
                Bill by yourself
                <img className='npc ml-1' src={npc} alt='person icon' />: Full
              </strong>
            </p>
            <p>
              <strong>
                Bill split
                <img className='npc ml-1' src={npc} alt='person icon' />{' '}
                <img className='npc' src={npc} alt='person icon' />: 1/2
              </strong>
            </p>
            <p>
              <strong>
                Bill split
                <img className='npc ml-1' src={npc} alt='person icon' />{' '}
                <img className='npc' src={npc} alt='person icon' />{' '}
                <img className='npc' src={npc} alt='person icon' />: 1/3
              </strong>
            </p>
            <small className='text-muted'>You probly get it . . .</small>
            <hr />
          </Col>
          <Col size='md-6'>
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrPtv1VM2miLPNv-_iR-RiNrfS8_eFc2DAblOYKDL4wieO0_1L8w'
              alt='Smiley face'
              className='sandwich'
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
