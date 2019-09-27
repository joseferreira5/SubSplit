import React from 'react';

const Card = ({ list, onShareClick, onRetrieveClick }) => {
  return list.map(item => (
    <div key={item.id} className='card mt-3'>
      <div className='card-header'>
        {item.name}
        <div className='float-right'>
          {item.owner ? (
            <button
              onClick={e => {
                e.stopPropagation();
                onShareClick(item.id);
              }}>
              Share
            </button>
          ) : (
            item.ownerName
          )}
        </div>
      </div>
      <div className='card-body'>
        ${item[item.priceSelected]}
        {item.owner ? (
          <p>Split your sub! Hit the share button and invite a friend!</p>
        ) : (
          <button
            type='button'
            className='btn btn-primary'
            onClick={e => {
              e.stopPropagation();
              onRetrieveClick(item);
            }}>
            Retrieve Shared Login
          </button>
        )}
      </div>
    </div>
  ));
};

export default Card;
