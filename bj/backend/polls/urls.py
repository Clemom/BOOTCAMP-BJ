from ninja import NinjaAPI, ModelSchema, Schema 
from polls.models import Game, Player
from typing import List 
from polls.services import create_game
api = NinjaAPI()

# Schéma pour représenter les données du modèle Game (en gros les "propriétés" qui vont me servir à interagir avec elle...)
class GameSchema(ModelSchema):
    class Meta:
        model = Game
        fields = [
            "id",
            "name",
            "turn",
            "ended",
        ]

# Schéma pour représenter les données du modèle Player (donc ce qui sera affecté au joueur)
class PlayerSchema(ModelSchema):
    class Meta:
        model = Player
        fields = [
            "id",
            "name",
            "score",
        ]

# Schéma pour ajouter une nouvelle partie avec le nom de la partie et la liste des noms des participants
class AddGame(Schema):
    name: str
    players: List[str]

# Schéma pour mettre à jour une partie existante avec le nouveau nom de la partie et la liste des nouveaux joueurs (permet de upadte les inputs nom de partie et joueurs)
class UpdateGame(Schema):
    name: str
    players: List[str]

# Endpoint pour créer une nouvelle partie (utilise les fonctions dans mon fichier services.py)
@api.post("/create_game", response=GameSchema)
def add(request, game: AddGame):
    new_game = create_game(game.name, game.players)
    return new_game 

# Endpoint pour récupérer une partie par son ID
@api.get("/game/{id}", response=GameSchema)
def get(request, game_id: int):
    current_game = Game.objects.get(pk=game_id)
    return current_game

# Endpoint pour supprimer une partie par son ID
@api.delete("/delete_game/{id}")
def delete(request, game_id: int):
    delete_game = Game.objects.get(pk=game_id)
    delete_game.delete()
    return delete_game

# Endpoint pour mettre à jour une partie existante
@api.put("/update_game/{game_id}")
def update(request, game_id: int, data: UpdateGame):
    game = Game.objects.get(pk=game_id)
    game.name = data.name
    game.save()
    return game 

# Endpoint pour récupérer les joueurs d'une partie
@api.get("/game/{game_id}/players", response=list[PlayerSchema])
def get_players(request, game_id: int):
    players = Player.objects.filter(game_id=game_id)
    return players 
