import { httpClient } from "~~/clients";
import { TGetGuildRolesResponse } from "~~/types/apis";

export const getGuildRoles = async (guildId: string | number): Promise<TGetGuildRolesResponse> => {
  const { data } = await httpClient.get<TGetGuildRolesResponse>(`/guild-roles`, {
    params: {
      guild_id: guildId,
    },
  });

  return data;
};
