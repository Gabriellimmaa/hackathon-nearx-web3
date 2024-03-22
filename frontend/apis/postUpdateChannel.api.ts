import { httpClient } from "~~/clients";
import { TPatchUserGuildsResponse } from "~~/types/apis";

type TPostBody = {
  channelId: string;
  roleId: string;
  permission: string[];
};

export const postUpdateChannel = async ({
  channelId,
  roleId,
  permission,
}: TPostBody): Promise<TPatchUserGuildsResponse> => {
  const permissionsObject = {} as { [key: string]: boolean };

  permission.forEach(permission => {
    permissionsObject[permission] = true;
  });
  const { data } = await httpClient.post(`/update-channel`, {
    channel_id: channelId,
    role_id: roleId,
    permission: permissionsObject,
  });
  return data;
};
