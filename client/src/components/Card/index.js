import React from 'react';
import './style.css';

const Card = ({ list, onShareClick, onRetrieveClick }) => {
  return list.map(item => (
    <div key={item.id} className='shadow card mt-3'>
      <div className='card-header'>
        <span>
          <strong>{item.name}</strong>
        </span>
        <div className='float-right'>
          {item.owner ? (
            <button
              type='button'
              className='btn btn-success'
              onClick={e => {
                e.stopPropagation();
                onShareClick(item.id);
              }}>
              Share
            </button>
          ) : (
            <span>Splitting from {item.ownerName}</span>
          )}
        </div>
      </div>
      <div className='card-body d-flex'>
        ${item[item.priceSelected]}
        {item.owner ? (
          <p className='ml-4 text-center'>
            Split your sub with a friend! Hit the share button and start saving!
          </p>
        ) : (
          <button
            type='button'
            className='btn btn-success ml-auto'
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
