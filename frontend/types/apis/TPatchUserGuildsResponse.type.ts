type TGuild = {
  id: string;
  name: string;
  icon_url: string;
};

export type TPatchUserGuildsResponse = {
  guilds: TGuild[];
};
