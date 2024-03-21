"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { patchGuildRoles } from "~~/apis";

export function ListGuilds() {
  const { data: session } = useSession();
  console.log("session");
  console.log(session);

  const { data } = useQuery({
    queryKey: ["guildRoles"],
    queryFn: () =>
      patchGuildRoles({
        userId: session?.user.id || "",
        guildsIds: session?.guilds.map(guild => guild.id) || [],
      }),
    enabled: !!session?.user.id,
  });

  return (
    <>
      {data?.guilds.map((guild, index) => {
        return (
          <div key={index} className="bg-primary-500 w-[57px] h-[57px] rounded-md">
            <Image src={guild.icon_url} alt={`guild-${index}`} width={57} height={57} />
          </div>
        );
      })}
    </>
  );
}
