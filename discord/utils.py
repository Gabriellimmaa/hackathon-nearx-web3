from discord.ext.commands import RoleConverter
from discord.utils import get
from shutil import make_archive
from bson.json_util import dumps
from time import time
from utils import *

COR = 0x9F77F9
COR_BRRP = 0x008539
VERDE = 0x66bb6a
VERMELHO = 0xef5350

class Emoji():
    def __init__(self):
        self.apreencao = '🔒'
        self.modificacao = '🔧'
        self.proprietario = '👦'
        self.dolar = '💵'
        self.duvida = '🤔'

