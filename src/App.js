import React, { useState, useEffect } from 'react';
import Card from "./component/Card"
import "./App.css"
const generateCards = () => {
  const numbers = [1, 2, 3, 4, 5, 6];
  const cards = [];
  
  numbers.forEach((number, index) => {
    const card = {
      id: index,
      number: number,
      flipped: false,
      matched: false
    };
    cards.push(card);
    cards.push({ ...card, id: index + numbers.length });
  });

  return cards;
};

const shuffleCards = (cards) => {
  const shuffledCards = [...cards];
  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }
  return shuffledCards;
};

const App = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [pairsMatched, setPairsMatched] = useState(0);

  useEffect(() => {
    const generatedCards = generateCards();
    const shuffledCards = shuffleCards(generatedCards);
    setCards(shuffledCards);
  }, []);

  const handleCardClick = (card) => {
    if (selectedCards.length === 1 && selectedCards[0].id === card.id) {
      // Do nothing if the user clicks the same card twice
      return;
    }
    if (selectedCards.length === 0) {
      setSelectedCards([card]);
    } else {
      const firstCard = selectedCards[0];
      const secondCard = card;
      const updatedCards = cards.map((card) => {
        if (card.id === firstCard.id || card.id === secondCard.id) {
          return { ...card, flipped: true };
        }
        return card;
      });
      setCards(updatedCards);
      if (firstCard.number === secondCard.number) {
        setPairsMatched(pairsMatched + 1);
        const updatedCards = cards.map((card) => {
          if (card.id === firstCard.id || card.id === secondCard.id) {
            return { ...card, matched: true };
          }
          return card;
        });
        setCards(updatedCards);
      } else {
        setTimeout(() => {
          const updatedCards = cards.map((card) => {
            if (card.id === firstCard.id || card.id === secondCard.id) {
              return { ...card, flipped: false };
            }
            return card;
          });
          setCards(updatedCards);
        }, 1000);
      }
      setSelectedCards([]);
    }
  };

  const handleRestart = () => {
    window.location.reload();
   };
  return (
    <div className="game">
      <h4 className="game-over">Play Memory Game</h4>
      <div className="deck">
        {cards.map((card) => (
          <Card key={card.id} card={card} handleCardClick={handleCardClick} />
        ))}
      </div>
      <div className='restart'> <button onClick={handleRestart}>Restart Game</button></div>
      {pairsMatched === 6 && (
        <div className="game-over">
          <h2>Congratulation You win!!!</h2>
        </div>
       
      )}
    </div>
  );
};

export default App;

