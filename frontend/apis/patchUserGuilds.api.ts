import { httpClient } from "~~/clients";
import { TPatchUserGuildsResponse } from "~~/types/apis";

type TProps = {
  userId: string;
  guildsIds: string[];
};

export const patchGuildRoles = async ({ userId, guildsIds }: TProps): Promise<TPatchUserGuildsResponse> => {
  const { data } = await httpClient.patch<TPatchUserGuildsResponse>(`/user-guilds?user_id=${userId}`, {
    guilds_ids: guildsIds,
  });

  return data;
};
