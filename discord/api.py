# Importe as bibliotecas necessárias
from flask import Flask, jsonify,request
from flask_cors import CORS
from discord.ext import commands
import asyncio
import threading
import discord
from typing import Dict
from dotenv import load_dotenv
import os
load_dotenv() 

# Crie uma instância do Flask
app = Flask(__name__)
CORS(app, origins="*")

# Configuração do bot do Discord
bot = commands.Bot(command_prefix='!', intents=discord.Intents.all())

# Rota da API Flask
@app.route('/guild-roles', methods=['GET'])
def guild_roles():
    guild_id_param = request.args.get('guild_id')

    if guild_id_param is None:
        return jsonify({"error": "parametro guild_id não especificado"}), 400

    async def get_all_roles():
        guild_id = int(guild_id_param)
        guild = bot.get_guild(guild_id)
        if guild:
            roles = []
            for role in guild.roles:
                roles.append({
                    "id": role.id,
                    "name": role.name,
                })

            return jsonify({"roles": roles})
        else:
            return jsonify({"error": "guild não encontrado"}), 404

    response = asyncio.run(get_all_roles())
    return response

@app.route('/update-channel', methods=['POST'])
def update_channel():
    data = request.json

    if 'channel_id' not in data:
        return jsonify({"error": "ID do canal não especificado"}), 400
    
    if 'role_id' not in data:
        return jsonify({"error": "ID do role não especificado"}), 400

    if 'permission' not in data:
        return jsonify({"error": "Permissões não especificadas"}), 400

    async def update_channel_permissions():
        channel_id = int(data['channel_id'])
        role_id = int(data['role_id'])
        permission = data['permission']
        channel = bot.get_channel(channel_id)
        if channel:
            role = discord.utils.get(channel.guild.roles, id=role_id)
            if role:
                await channel.set_permissions(target=role, overwrite=discord.PermissionOverwrite(**permission))
                return "Permissões do canal atualizadas com sucesso"
            else:
                return "Role não encontrado"
        else:
            return "Canal não encontrado"

    asyncio.run_coroutine_threadsafe(update_channel_permissions(), bot.loop)
    response = 'Permissões do canal atualizadas com sucesso'
    return jsonify({"message": response})

@app.route('/add-user-role', methods=['POST'])
def add_user_role():
    data = request.json

    if 'user_id' not in data:
        return jsonify({"error": "user_id não especificado"}), 400
    
    if 'roles' not in data:
        return jsonify({"error": "roles não especificado"}), 400
    
    if 'guild_id' not in data:
        return jsonify({"error": "guild_id não especificado"}), 400

    async def add_user_role():
        user_id = int(data['user_id'])
        guild_id = int(data['guild_id'])
        guild = bot.get_guild(guild_id)
        roles = data['roles']
        roles_discord = []
        for role_id in roles:
            try: 
                roles_discord.append(discord.utils.get(guild.roles, id=role_id))
            except: 
                pass

        user = guild.get_member(user_id)
        if user:
            await user.add_roles(*roles_discord)
            return "Role removido com sucesso"
        else:
            return "Usuário não encontrado"

    asyncio.run_coroutine_threadsafe(add_user_role(), bot.loop)
    response = 'Cargos adicionados com sucesso'
    return jsonify({"message": response})

@app.route('/remove-user-role', methods=['POST'])
def remove_user_role():
    data = request.json

    if 'user_id' not in data:
        return jsonify({"error": "user_id não especificado"}), 400
    
    if 'roles' not in data:
        return jsonify({"error": "roles não especificado"}), 400
    
    if 'guild_id' not in data:
        return jsonify({"error": "guild_id não especificado"}), 400

    async def remove_user_role():
        user_id = int(data['user_id'])
        guild_id = int(data['guild_id'])
        guild = bot.get_guild(guild_id)
        roles = data['roles']
        roles_discord = []
        for role_id in roles:
            try: 
                roles_discord.append(discord.utils.get(guild.roles, id=role_id))
            except: 
                pass

        user = guild.get_member(user_id)
        if user:
            await user.remove_roles(*roles_discord)
            return "Role removido com sucesso"
        else:
            return "Usuário não encontrado"

    asyncio.run_coroutine_threadsafe(remove_user_role(), bot.loop)
    response = 'Cargos removidos com sucesso'
    return jsonify({"message": response})
    

# Função para rodar o bot do Discord
async def run_bot():
    await bot.start(str(os.getenv("BOT_TOKEN")))

# Roda o bot em uma thread separada
bot_thread = threading.Thread(target=bot.run, args=(str(os.getenv("BOT_TOKEN")),))
bot_thread.start()

# Roda a API Flask
if __name__ == '__main__':
    app.run(debug=True)
