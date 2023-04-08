import React from 'react';
import './card.css'
const Card = ({ card, handleCardClick }) => {
  const handleClick = () => {
    if (!card.flipped && !card.matched) {
      handleCardClick(card);
    }
  };

  return (
    <div
      className={`card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
      onClick={handleClick}
    >
      <div className="card-front"></div>
      <div className="card-back"><p>{card.number}</p></div>
    </div>
  );
};

export default Card;

