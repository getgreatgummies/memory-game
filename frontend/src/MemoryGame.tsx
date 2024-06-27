import React, { useState, useEffect } from 'react';
import { Shuffle, Clock } from 'lucide-react';

import './globals.css'

  const cardImages = [
    '🐵', '🐔', '🐼', '🐧',
    '🦁', '🐮', '🐷', '🐸'
  ];

  interface Card {
    id: number;
    image: string;
  }

  const MemoryGame: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
      initializeGame();
    }, []);
  
    const initializeGame = () => {
      const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((image, index) => ({ id: index, image }));
      setCards(shuffledCards);

    };

  return (
    <div className="memory-game">
      <h1 className="game-title">Memory Game</h1>
      <div className="game-info">
        <span className="score">Score: 20</span>
        <Clock className="clock-icon" />
        <span>10s</span>
      </div>
      <button onClick={initializeGame} className="new-game-button">
        <Shuffle className="shuffle-icon" /> New Game
      </button>
      <div className='card-grid cols-4'>
        {cards.map((card, index) => (
          <div
            key={card.id}
            className='card card-size-medium flipped'
          >
            <div className="card-inner">
              <div className="card-front">
                <div className="card-content">?</div>
              </div>
              <div className="card-back">
                <div className="card-content">🐼</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
