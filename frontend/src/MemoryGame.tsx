import React, { useState, useEffect } from 'react';
import { Shuffle } from 'lucide-react';
import Confetti from 'react-confetti'
import './globals.css'



  interface Card {
    id: number;
    image: string;
    flipped: boolean;
  }

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [playerTurn, setPlayerTurn] = useState<number | null>(1)
  const [scores, setScores] = useState([0,0])

  const totalScore = scores[0]! + scores[1]!;

  useEffect(() => {
    if (totalScore === 100) {
      if (scores[0]! == 50) {
        alert("Congrats, it's a tie!")

      }
      else {
        const winner = scores[0]! > scores[1]! ? 'Player 1' : 'Player 2';
        alert(`${winner} wins!`);
      }
    }
  }, [totalScore, scores]);

  useEffect(() => {
    fetch('/api/initialize')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to initialize the game. Please try again.');
        }
        return response.json();
      })
      .then(data => {
        if (data.cards) {
          setCards(data.cards.map((image: string, index: number) => ({ id: index, image, flipped: false })));
          setPlayerTurn(data.current_turn)
        } else {
          console.error('Cards data is missing or in an unexpected format:', data);
        }
      })
      .catch(error => {
        alert(error.message);
      });
  }, []);

  const handleCardClick = (id: number) => {
    const card = cards.find(card => card.id === id);
    if (card && card.flipped) {
      console.log('Please select a card that is not already flipped');
      return;
    }

    fetch('/api/turn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ card_id: id })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to process the turn. Please try again.');
      }
      return response.json();
    })
    .then(data => {
      if(data.flips_this_turn == 2) {
        setScores(data.scores);
        if (!data.is_match) {
          setTimeout(() => {
            setCards(prevCards => {
              const updatedCards = prevCards.map(card => {
                if (card.id === data.card1 || card.id === data.card2) {
                  return { ...card, flipped: false };
                }
                return card;
              });
              return updatedCards;
            });
            setPlayerTurn(prevTurn => prevTurn === 1 ? 2 : 1); // Moved inside setTimeout
          }, 1000);
        }
      }
      // Fetch game state after processing the turn
    })

    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, flipped: !card.flipped } : card
      )
    );
  }

  const handleNewGame = () => {
    fetch('/api/initialize')
      .then(response => response.json())
      .then(data => {
        if (data.cards) {
          setCards(data.cards.map((image: string, index: number) => ({ id: index, image, flipped: false })));
          setScores([0, 0]);
          setPlayerTurn(1);
        } else {
          console.error('Failed to start new game:', data);
        }
      });
  };

  return (
    <div className="memory-game">
      <h1 className="game-title">Memory Game</h1>
      <div className="game-info">
        <span className={`score ${playerTurn === 1 ? 'player-turn' : ''}`}>Player 1 Score: {scores[0]}</span>
        <span className={`score ${playerTurn === 2 ? 'player-turn' : ''}`}>Player 2 Score: {scores[1]}</span>
      </div>
      <button className="new-game-button" onClick={handleNewGame}>
        <Shuffle className="shuffle-icon" /> New Game
      </button>
      <div className='card-grid cols-4'>
        {cards.map((card) => (
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
      {totalScore === 100 && <Confetti />}
    </div>
  );
};

export default MemoryGame;
