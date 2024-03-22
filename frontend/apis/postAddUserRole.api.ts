import { httpClient } from "~~/clients";

type TProps = {
  userId: number;
  guild_id: number;
  roles: number[];
};

export const postAddUserRole = async ({ userId, guild_id, roles }: TProps): Promise<void> => {
  const { data } = await httpClient.post<void>(`/add-user-role`, {
    userId,
    guild_id,
    roles,
  });

  return data;
};
