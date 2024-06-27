import React, { useState, useEffect } from 'react';
import { Shuffle } from 'lucide-react';

import './globals.css'

  const cardImages = [
    '🐵', '🐔', '🐼', '🐧',
    '🦁', '🐮', '🐷', '🐸'
  ];

  interface Card {
    id: number;
    image: string;
    flipped: boolean;
  }

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    initializeGame();
  }, []);
  
  const initializeGame = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({ id: index, image, flipped: false }));
    setCards(shuffledCards);

  };

  const handleCardClick = (id: number) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, flipped: !card.flipped } : card
      )
    );
  }

  return (
    <div className="memory-game">
      <h1 className="game-title">Memory Game</h1>
      <div className="game-info">
        <span className="score">Player 1 Score: 20</span>
        <span className="score">Player 2 Score: 60</span>
      </div>
      <button onClick={initializeGame} className="new-game-button">
        <Shuffle className="shuffle-icon" /> New Game
      </button>
      <div className='card-grid cols-4'>
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card card-size-medium ${card.flipped ? 'flipped' : ''}`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-inner">
              <div className="card-front">
                <div className="card-content">?</div>
              </div>
              <div className="card-back">
                <div className="card-content">{card.image}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
