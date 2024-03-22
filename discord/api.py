# Importe as bibliotecas necessárias
from flask import Flask, jsonify,request
from flask_cors import CORS
from discord.ext import commands
import asyncio
import threading
import discord
from dotenv import load_dotenv
import os
from pathlib import Path

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
                    "id": str(role.id),
                    "name": role.name,
                })

            return jsonify({"roles": roles})
        else:
            return jsonify({"error": "guild não encontrado"}), 404

    response = asyncio.run(get_all_roles())
    return response

@app.route('/guild-channels', methods=['GET'])
def guild_channels():
    guild_id_param = request.args.get('guild_id')

    if guild_id_param is None:
        return jsonify({"error": "parametro guild_id não especificado"}), 400

    async def get_all_channels():
        guild_id = int(guild_id_param)
        guild = bot.get_guild(guild_id)
        response = []
        if guild:
            for category in guild.categories:
                channels = []
                for channel in category.channels:
                    channels.append({
                        "id": str(channel.id),
                        "name": channel.name,
                        "type": str(channel.type),
                        "category": category.name,
                    })
                response.append({
                    "category": category.name,
                    "channels": channels,
                })
            
            return jsonify(response)
        else:
            return jsonify({"error": "guild não encontrado"}), 404

    response = asyncio.run(get_all_channels())
    return response

@app.route('/user-guilds', methods=['PATCH'])
def user_guilds():
    guilds_ids = request.json['guilds_ids']
    user_id_param = request.args.get('user_id')

    if guilds_ids is None:
        return jsonify({"error": "body guilds_ids não especificado"}), 400
    if user_id_param is None:
        return jsonify({"error": "parametro user_id não especificado"}), 400
    
    async def get_all_guilds_when_user_has_admin():
        guilds = []
        user_id = int(user_id_param)
        for guild_id in guilds_ids:
            guild = bot.get_guild(int(guild_id))
            if guild:
                member = guild.get_member(user_id)
                if member:
                    if member.guild_permissions.administrator:
                        guilds.append({
                            "id": str(guild.id),
                            "name": guild.name,
                            "icon_url": guild.icon.url if guild.icon else None,
                        })

        return jsonify({"guilds": guilds})

    response = asyncio.run(get_all_guilds_when_user_has_admin())
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
                roles_discord.append(discord.utils.get(guild.roles, id=int(role_id)))
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
    
@bot.event
async def on_ready():
    await bot.change_presence(activity=discord.Game(name="Desenvolvido por gabriellimamoraes"))

    cogs_dir = Path("cogs").resolve()
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

# Roda a API Flask
if __name__ == '__main__':
    # Roda o bot em uma thread separada
    bot_thread = threading.Thread(target=bot.run, args=(str(os.getenv("BOT_TOKEN")),))
    bot_thread.start()
    app.run(debug=False)
