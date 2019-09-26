import React from 'react';

const Card = ({ list, onShareClick }) => {
  return list.map(item => (
    <div key={item.id} className='card card2'>
      <div className='card-header'>
        {item.name}
        <div className='float-right'>
          {item.owner ? (
            <a
              href='#'
              onClick={e => {
                e.stopPropagation();
                onShareClick(item.id);
              }}>
              Share
            </a>
          ) : (
            item.ownerName
          )}
        </div>
      </div>
      <div className='card-body test'>${item[item.priceSelected]}</div>
    </div>
  ));
};

export default Card;
