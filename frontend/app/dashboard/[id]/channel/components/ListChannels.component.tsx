"use client";

import { useQuery } from "@tanstack/react-query";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { RiHashtag } from "react-icons/ri";
import { getGuildChannels } from "~~/apis/getGuildChannels.api";

type TListChannelsProps = {
  guildId: string;
  setSelectedChannelId: (selectedChannelId: string) => void;
  selectedChannelId: string | null;
};

export function ListChannels({ guildId, setSelectedChannelId, selectedChannelId }: TListChannelsProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["getGuildChannels", guildId],
    queryFn: () => getGuildChannels(guildId || ""),
    enabled: !!guildId,
  });

  return (
    <>
      {isLoading && <p>Carregando...</p>}
      {data?.map((res, index) => {
        return (
          <>
            <p>{res.category}</p>
            {res.channels.map(channel => {
              return (
                <button
                  key={index}
                  className={`flex gap-2 items-center p-4 py-3 bg-opacity-30 rounded-lg w-full text-start ${
                    selectedChannelId === channel.id ? "bg-primary-500" : ""
                  }`}
                  onClick={() => {
                    setSelectedChannelId(channel.id);
                  }}
                >
                  {channel.type === "text" ? <RiHashtag size={18} /> : <HiMiniSpeakerWave size={18} />}
                  <p>{channel.name}</p>
                </button>
              );
            })}
          </>
        );
      })}
    </>
  );
}
