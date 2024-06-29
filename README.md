# Memory Game

## Overview
This project is a simple memory game built using React for the frontend and Flask for the backend. Players take turns flipping cards to find matching pairs. The game tracks scores for two players and declares a winner once all pairs are matched or the total score reaches 100.

## Features
- **React Frontend**: Interactive UI built with React, showcasing card flipping animations and responsive design.
- **Flask Backend**: Server-side logic to handle game state, including card shuffling, turn management, and score tracking.
- **Real-time Updates**: Game state is updated in real-time as players interact with the game.
- **Score Tracking**: Tracks scores for two players and updates after each successful match.
- **End Game Detection**: Automatically detects when the game ends and declares a winner or a tie.

## Installation

### Prerequisites
- Node.js
- npm or yarn
- Python 3.8

### Setting Up the Project

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sfreifeld/memory-game.git
   cd memory-game
   ```

2. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

3. **Install backend dependencies using pipenv:**
   ```bash
   cd backend
   pipenv install
   ```

### Running the Application

1. **Start the backend server:**
   ```bash
   cd backend
   python app.py
   ```

2. **Run the frontend application:**
   ```bash
   cd ../frontend
   npm run dev
   ```




