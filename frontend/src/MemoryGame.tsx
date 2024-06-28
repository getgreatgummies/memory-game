import React, { useState, useEffect } from 'react';
import { Shuffle } from 'lucide-react';
import './globals.css'



  interface Card {
    id: number;
    image: string;
    flipped: boolean;
  }

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [playerTurn, setPlayerTurn] = useState(1)
  const [scores, setScores] = useState([0,0])

  useEffect(() => {
    fetch('/api/initialize')
      .then(response => response.json())
      .then(data => {
        if (data.cards) {
          setCards(data.cards.map((image: string, index: number) => ({ id: index, image, flipped: false })));
        } else {
          console.error('Cards data is missing or in an unexpected format:', data);
        }
      })
  }, []);

  const handleCardClick = (id: number) => {
    fetch('/api/turn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ card_id: id })
    })
    .then(response => response.json())
    .then(data => {
      if(data.flips_this_turn == 2) {
        setScores(data.scores);
        if (!data.is_match) {
          // Use a closure to capture the current state when the timeout executes
          setTimeout(() => {
            setCards(prevCards => {
              return prevCards.map(card => {
                if (card.id === data.card1 || card.id === data.card2) {
                  return { ...card, flipped: false };
                }
                return card;
              });
            });
          }, 1000);
        }
        setPlayerTurn(prevTurn => prevTurn === 1 ? 2 : 1);
        
      }  
    });

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
        <span className={`score ${playerTurn === 1 ? 'player-turn' : ''}`}>Player 1 Score: {scores[0]}</span>
        <span className={`score ${playerTurn === 2 ? 'player-turn' : ''}`}>Player 2 Score: {scores[1]}</span>
      </div>
      <button className="new-game-button">
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
