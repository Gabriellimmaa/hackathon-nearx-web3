export type TUserDiscord = {
  user: { id: number; name: string; avatar_url: string; discriminator: string };
  message: { channel_id: number; id: number };
  created_at: string;
  guild_id: number;
};
