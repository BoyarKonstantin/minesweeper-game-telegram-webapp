from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton

game = InlineKeyboardMarkup(row_width=1)
game_button = InlineKeyboardButton(text="Play game!", url='www.google.com')
game.insert(game_button)