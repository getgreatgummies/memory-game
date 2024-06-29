import random  # Add this import at the top of your file

from flask import Flask, jsonify, request, abort
from models import MemoryGame

app = Flask(__name__)
game = MemoryGame()

# Define a dictionary to map emojis to their titles
emoji_to_title = {
    "🐵": "monkey",
    "🐔": "chicken",
    "🐼": "panda",
    "🐧": "penguin", 
    "🦁": "lion", 
    "🐮": "cow", 
    "🐷": "pig", 
    "🐸": "frog", 
    "🦊": "fox",
    "🐶": "dog"
}


@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Server error'}), 500

@app.route('/initialize', methods=['GET'])
def initialize_game():
    game.shuffle_cards()
    state = game.get_game_state()  # Store the state in a variable
    game.current_turn = random.choice([1, 2])  # Randomly choose between player 1 and 2
    game.flips_this_turn = 0
    game.scores = [0,0]
    game.card1 = None
    game.card2 = None  
    return jsonify(state)

@app.route('/turn', methods=['POST'])
def handle_turn():
    data = request.get_json()
    card_id = data.get('card_id')
    if card_id is None or not isinstance(card_id, int) or card_id >= len(game.cards) or card_id < 0:
        abort(400, description="Invalid card ID")
    if game.flips_this_turn == 0:
        handle_first_flip(card_id)
    elif game.flips_this_turn == 1:
        handle_second_flip(card_id)
        scores, is_match = check_match()
        # Transform emojis to titles using the dictionary
        cards_titles = [emoji_to_title[emoji] for emoji in game.cards_still_in_play if emoji in emoji_to_title]
        response = jsonify({
            "success": True, 
            "current_turn": game.current_turn,
            "flips_this_turn": game.flips_this_turn,
            "scores": scores,
            "is_match": is_match,
            "card1": game.card1,
            "card2": game.card2,
            "cards_still_in_play": cards_titles  # Use the transformed list
        })
        game.card1 = None
        game.card2 = None
        toggle_player_turn(is_match)  # Pass is_match to decide whether to toggle turn
        return response

    return jsonify({
        "success": True, 
        "current_turn": game.current_turn,
        "flips_this_turn": game.flips_this_turn,
        "card1": game.card1,
        "scores": game.scores
    })

def handle_first_flip(card_id):
    print(f'card1 id: {card_id}')
    game.card1 = card_id
    game.flips_this_turn = 1

def handle_second_flip(card_id):
    print(f'card2 id: {card_id}')
    game.card2 = card_id
    game.flips_this_turn = 2

def check_match():
    print(f'Card1: {game.cards[game.card1]}')
    print(f'Card2: {game.cards[game.card2]}')
    is_match = game.cards[game.card1] == game.cards[game.card2]
    if is_match:
        print('congrats!')
        # Remove only one matched card from the cards_still_in_play array
        game.cards_still_in_play.remove(game.cards[game.card1])  # Remove the emoji by value
        # Update scores based on the current player
        if game.current_turn == 1:
            game.scores[0] += 10
        elif game.current_turn == 2:
            game.scores[1] += 10
    else:
        print('not a match!')
    return game.scores, is_match

def toggle_player_turn(is_match):
    if not is_match:
        game.current_turn = 2 if game.current_turn == 1 else 1
    game.flips_this_turn = 0

if __name__ == '__main__':
    app.run(debug=True)
