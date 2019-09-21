import React from 'react';

const Card = props => {
  return props.list.map(item => (
    <div key={item.id} class='card card2'>
      <div class='card-header'>{item.name}</div>
      <div class='card-body test'>${item[item.priceSelected]}</div>
    </div>
  ));
};

export default Card;
