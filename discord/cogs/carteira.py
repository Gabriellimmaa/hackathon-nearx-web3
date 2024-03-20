from discord.ui import Button, View
import discord
from discord.ext import commands
from utils import COR
import json
import base64

class Carteira(commands.Cog):
    def __init__(self, bot: discord.client.Client):
        self.client = bot


    @commands.command(pass_context=True, description="Mostra uma lista com todos os comandos disponíveis no servidor")
    async def carteira(self, ctx: commands.Context):
        author = ctx.author
        viewButton = View()        
        tokenData = {
            "user": {
                "id": author.id,
                "name": author.name,
                "avatar": author.avatar.url,
                "discriminator": author.discriminator
            },
            "message": {
                "id": ctx.message.id,
                "channel_id": ctx.message.channel.id,
            },
            "created_at": ctx.message.created_at.timestamp(),
            "guild_id": ctx.message.guild.id
        }
        print(tokenData)
        json_token_data = json.dumps(tokenData)
        print(json_token_data)
        encoded_token_data = base64.b64encode(json_token_data.encode()).decode()
        print(encoded_token_data)

        buttonCreate = Button(label='Conectar Carteira', style=discord.ButtonStyle.url, url=f"http://localhost:3000/auth/user/{encoded_token_data}")
        viewButton.add_item(buttonCreate)
        embed = discord.Embed(
            title="Conectando sua Carteira",
            description="Para acessar nossos conteúdos exclusivos, precisamos verificar sua carteira e confirmar a posse de NFTs. Você será redirecionado para o nosso site para conectar sua carteira.",
            color=COR
        )
        embed.set_thumbnail(url=self.client.user.avatar)
        await ctx.send(embed=embed, view=viewButton)





async def setup(bot):
    await bot.add_cog(Carteira(bot))
