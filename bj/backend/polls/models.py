from django.db import models

# Ca représente une partie et ses attributs donc le nom de la partie, le numéro du tour du joueur et si la partie est terminée ou non
class Game(models.Model):
    name = models.CharField(max_length=50)
    turn = models.IntegerField(default=0)
    ended = models.BooleanField(default=False)

#Ce modèle représente un joueur dans une partie, on peut voir ses attributs, le nom, le score actuel et la partie rattaché au joueur
class Player(models.Model):
    name = models.CharField(max_length=50)
    score = models.IntegerField(default=0)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name="players")
