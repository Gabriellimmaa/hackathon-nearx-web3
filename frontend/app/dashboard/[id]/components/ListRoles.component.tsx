"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGuildRoles } from "~~/apis";

type TListRoles = {
  guildId: string;
};

export function ListRoles({ guildId }: TListRoles) {
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const { data: guildRoles, isLoading } = useQuery({
    queryKey: ["getGuildRoles"],
    queryFn: () => getGuildRoles(guildId),
  });

  return (
    <>
      {isLoading && <p>Carregando...</p>}
      {guildRoles?.roles.map((role, index) => {
        return (
          <button
            key={index}
            className={`flex gap-2 items-center p-4 py-3 bg-opacity-30 rounded-lg w-full text-start  ${
              selectedRoleId === role.id ? "bg-primary-500" : ""
            }`}
            onClick={() => {
              setSelectedRoleId(role.id);
            }}
          >
            {role.name}
          </button>
        );
      })}
    </>
  );
}
