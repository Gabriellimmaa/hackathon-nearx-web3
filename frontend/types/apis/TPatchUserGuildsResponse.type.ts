type TGuild = {
  id: number;
  name: string;
  icon_url: string;
};

export type TPatchUserGuildsResponse = {
  guilds: TGuild[];
};
