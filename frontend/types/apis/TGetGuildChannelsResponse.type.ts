type TChannel = {
  id: string;
  name: string;
  type: string;
  category: string;
};

export type TGetGuildChannelsResponse = {
  category: string;
  channels: TChannel[];
}[];
