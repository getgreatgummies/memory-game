import random

class MemoryGame:
    def __init__(self):
        # Initialize the deck of cards, duplicated for pairs
        self.cards = ['🐵', '🐔', '🐼', '🐧', '🦁', '🐮', '🐷', '🐸', '🦊','🐶'] * 2
        # Track cards that are still in play (not yet matched)
        self.cards_still_in_play = ['🐵', '🐔', '🐼', '🐧', '🦁', '🐮', '🐷', '🐸', '🦊','🐶']
        # Initialize scores for two players
        self.scores = [0, 0]
        # Track the current player's turn
        self.current_turn = 1
        # Count of flips made in the current turn
        self.flips_this_turn = 0
        # Temporary storage for the first and second card flipped in a turn
        self.card1 = None
        self.card2 = None
        # Shuffle the cards at the start of the game
        self.shuffle_cards()


    def shuffle_cards(self):
        random.shuffle(self.cards)
        return self.cards
    
    def get_game_state(self):
        return {
            'cards': self.cards,
            'scores': self.scores,
            'current_turn': self.current_turn
        }
    


