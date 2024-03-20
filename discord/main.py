import json
from discord.ext import commands, tasks
from multiprocessing.connection import Client
import discord
from discord.utils import get
from discord.ext import commands, tasks
from utils import *
import pytz
from datetime import datetime
from pathlib import Path
import tracemalloc
from dotenv import load_dotenv, dotenv_values
import os
load_dotenv() 
tracemalloc.start()

COR = 0x9F77F9
VERDE = 0x66bb6a
VERMELHO = 0xef5350

bot = commands.Bot(command_prefix="!", intents=discord.Intents.all())
bot.remove_command('help')


@bot.event
async def on_ready():
    await bot.change_presence(activity=discord.Game(name="Desenvolvido por gabriellimamoraes"))
    if not diaria.is_running():
        diaria.start()
        
    cogs_dir = Path("bot/cogs").resolve()
    for path in cogs_dir.rglob("*.py"):
        if "__pycache__" not in path.parts:
            cog_path = path.relative_to(cogs_dir)
            cog_parts = list(cog_path.parts)
            if len(cog_parts) > 1:
                cog = f"cogs.{cog_parts[0]}.{cog_parts[1]}.{cog_path.stem}"
            else:
                cog = f"cogs.{cog_path.stem}"
            print("Carregando:", cog)
            try:
                await bot.load_extension(cog)
            except Exception as e:
                print(f"{cog} falhou ao ser carregado:", str(e))

    print(f"Logged in as {bot.user}")


@tasks.loop(minutes=1)
async def diaria():
    time_zone = pytz.timezone("Brazil/East")
    date_time = datetime.now(time_zone)
    date = date_time.strftime("%H%M")
    # print(f"check loop date: {date}")

    # if date == "0000":
    #     check roles

@bot.event
async def on_member_join(member: discord.Member):
    channel_welcome = get(member.guild.channels, id=int(os.getenv("CHANNEL_WELCOME")))
    await channel_welcome.send(f"Olá {member.mention}, seja bem-vindo ao servidor!")
    await member.send(f"Olá {member.mention}, seja bem-vindo ao servidor!")

@bot.event
async def on_message(message: discord.Message):
    if message.author.bot:
        return
    if(message.channel.id == int(os.getenv("CHANNEL_LISTENER"))):
        await message.channel.send("Estamos ouvindo esse canal")

    await bot.process_commands(message)

bot.run(str(os.getenv("BOT_TOKEN")))