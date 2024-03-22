import { httpClient } from "~~/clients";
import { TGetGuildChannelsResponse } from "~~/types/apis";

export const getGuildChannels = async (guildId: string | number): Promise<TGetGuildChannelsResponse> => {
  const { data } = await httpClient.get<TGetGuildChannelsResponse>(`/guild-channels`, {
    params: {
      guild_id: guildId,
    },
  });

  return data;
};
