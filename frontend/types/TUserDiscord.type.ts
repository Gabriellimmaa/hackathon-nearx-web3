export type TUserDiscord = {
  user: { id: string; name: string; avatar_url: string; discriminator: string };
  message: { channel_id: string; id: string };
  created_at: string;
  guild_id: string;
};
