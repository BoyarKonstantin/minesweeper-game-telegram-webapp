from aiogram import Bot, types
from aiogram.dispatcher import Dispatcher
from aiogram.utils import executor

bot = Bot(token='5206845837:AAG0rGYj6toO9VrSZwsCrmFWFb52yrMMxd8')
dp = Dispatcher(bot)

@dp.inline_handler()
async def game_query_handler(query: types.InlineQuery):
    text = query.query or None

    articles = [types.InlineQueryResultArticle(
        id = '1',
        title = 'Game',
        input_message_content=types.InputTextMessageContent(message_text=text)
    )]

    await query.answer(articles, cache_time=1, is_personal=True)

@dp.message_handler(commands=['game'])
async def send_gamee(message: types.Message):
    await bot.send_game(message.chat.id, 'minesweeper')

@dp.callback_query_handler()
async def launch_game(query: types.CallbackQuery):
    if query.game_short_name == 'minesweeper':
        await bot.answer_callback_query(query.id, url='www.google.com')

if __name__ == "__main__":
    executor.start_polling(dp, skip_updates=True)