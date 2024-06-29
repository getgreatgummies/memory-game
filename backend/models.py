import random

class MemoryGame:
    def __init__(self):
        self.cards = ['🐵', '🐔', '🐼', '🐧', '🦁', '🐮', '🐷', '🐸', '🦊','🐶'] * 2
        self.scores = [0, 0]
        self.current_turn = 1
        self.flips_this_turn = 0
        self.card1 = None
        self.card2 = None
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
    


