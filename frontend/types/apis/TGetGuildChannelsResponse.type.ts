type TChannel = {
  id: number;
  name: string;
  type: string;
  category: string;
};

export type TGetGuildChannelsResponse = {
  category: string;
  channels: TChannel[];
}[];
