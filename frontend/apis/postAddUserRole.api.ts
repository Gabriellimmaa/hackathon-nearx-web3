import { httpClient } from "~~/clients";

type TProps = {
  user_id: string;
  guild_id: string;
  roles: string[];
};

export const postAddUserRole = async ({ user_id, guild_id, roles }: TProps): Promise<void> => {
  const { data } = await httpClient.post<void>(`/add-user-role`, {
    user_id,
    guild_id,
    roles,
  });

  return data;
};
