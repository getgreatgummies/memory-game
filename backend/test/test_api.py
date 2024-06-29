from app import app
import pytest

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_initialize_game(client):
    response = client.get('/initialize')
    assert response.status_code == 200
    data = response.get_json()
    assert 'cards' in data
    assert 'current_turn' in data


def test_first_flip(client):
    client.get('/initialize')
    response = client.post('/turn', json={'card_id': 0})
    data = response.get_json()
    assert response.status_code == 200
    assert data['flips_this_turn'] == 1


def test_second_flip(client):
    client.get('/initialize')
    client.post('/turn', json={'card_id': 0})
    response = client.post('/turn', json={'card_id': 1})
    data = response.get_json()
    assert response.status_code == 200
    assert data['flips_this_turn'] == 2


def test_invalid_card_id(client):
    client.get('/initialize')
    response = client.post('/turn', json={'card_id': 999})  # Assuming 999 is out of range
    assert response.status_code == 400

