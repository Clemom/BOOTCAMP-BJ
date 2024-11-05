from ninja import NinjaAPI, ModelSchema, Schema
from polls.models import Game, Player
from typing import List
from polls.services import create_game
api = NinjaAPI()

class GameSchema(ModelSchema):
     class Meta:
        model = Game
        fields = [
            "id",
            "name",
            "turn",
            "ended",
        ]



class PlayerSchema(ModelSchema):
     class Meta:
        model = Player
        fields = [
            "id",
            "name",
            "score",
        ]
     
class AddGame(Schema):
     name: str
     players: List[str]
     
class UpdateGame(Schema):
     name: str
     players: List[str]


@api.post("/create_game", response=GameSchema)
def add(request, game: AddGame):
    new_game = create_game(game.name, game.players)
    return new_game

@api.get("/game/{id}", response=GameSchema)
def get(request, game_id: int):
    current_game = Game.objects.get(pk=game_id)
    return current_game

@api.delete("/delete_game/{id}")
def delete(request, game_id:int):
     delete_game = Game.objects.get(pk=game_id)
     delete_game.delete()
     return delete_game

@api.put("/update_game", response=GameSchema)
def update(request, game_id: int, data: UpdateGame):
    game = Game.objects.get(pk=game_id)
    game.name = data.name
    game.save()
    return game

# class ChoiceSchema(ModelSchema):
#     class Meta:
#         model = Choice
#         fields = [
#             "id",
#             "choice_text",
#             "votes",
#         ]

# class QuestionSchema(ModelSchema):
#     class Meta:
#         model = Question
#         fields = [
#         "id",
#         "question_text",
#         "pub_date",
#         ]

# class AddQuestion(Schema):
#         question_text: str
#         choice: list [str]

# class UpdateQuestion(Schema):
#         question_text: str
#         choice: list [str]

# @api.post("/create_question", response=QuestionSchema)
# def add(request, question: AddQuestion):
#     new_question = Question.objects.create(question_text=question.question_text, pub_date=date.today())
#     for choice_text in question.choice:
#          Choice.objects.create(question=new_question, choice_text=choice_text, votes=0)
#     return new_question

# @api.get("/question/{id}", response=QuestionSchema)
# def get(request, question_id:int):
#         return Question.objects.get(pk=question_id)

# @api.delete("/delete_question/{id}", response=QuestionSchema)
# def delete(request, question_id:int):
#      delete_question = Question.objects.get(pk=question_id)
#      return delete_question.delete()

# @api.put("/update_question", response=QuestionSchema)
# def update(request, question_id:int, data: UpdateQuestion):
#     update_question = Question.objects.get(pk=question_id)
#     update_question.question_text = data.question_text
#     return update_question.save()
    