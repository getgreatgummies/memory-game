from flask import Flask, jsonify, request
from models import MemoryGame

app = Flask(__name__)
game = MemoryGame()

@app.route('/initialize', methods=['GET'])
def initialize_game():
    game.shuffle_cards()
    game.current_turn = 1
    game.flips_this_turn = 0
    game.card1 = 0
    game.card2 = 0  
    return jsonify(game.get_game_state())

@app.route('/turn', methods=['POST'])
def handle_turn():
    data = request.get_json()
    update_turn(data['player_id'], data['card_id'])
    return jsonify({
        "success": True, 
        "current_turn": game.current_turn, 
        "flips_this_turn": game.flips_this_turn
    })

def update_turn(player_id, card_id):
    game.current_turn = player_id
    if game.flips_this_turn <= 1:
        handle_first_flip(card_id)
    else:
        handle_second_flip(card_id)

def handle_first_flip(card_id):
    print(f'card1 id: {card_id}')
    game.card1 = card_id
    game.flips_this_turn += 1

def handle_second_flip(card_id):
    print(f'card2 id: {card_id}')
    game.card2 = card_id
    game.flips_this_turn = 1
    toggle_player_turn()
    check_match()

def toggle_player_turn():
    game.current_turn = 2 if game.current_turn == 1 else 1

def check_match():
    print(f'Card1: {game.cards[game.card1]}')
    print(f'Card2: {game.cards[game.card2]}')
    if game.cards[game.card1] == game.cards[game.card2]:
        print('congrats!')
    game.card1 = 0
    game.card2 = 0

if __name__ == '__main__':
    app.run(debug=True)
