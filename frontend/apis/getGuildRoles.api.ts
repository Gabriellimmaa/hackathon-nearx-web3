import { httpClient } from "~~/clients";

export const getGuildRoles = async (guildId: string | number) => {
  const { data } = await httpClient.get(`/guild-roles`, {
    params: {
      guild_id: guildId,
    },
  });

  return data;
};
