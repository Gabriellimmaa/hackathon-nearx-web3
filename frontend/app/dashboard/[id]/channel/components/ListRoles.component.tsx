"use client";

import { useQuery } from "@tanstack/react-query";
import { getGuildRoles } from "~~/apis";

type TListRolesProps = {
  guildId: string;
  setSelectedRoleId: (selectedRoleId: number) => void;
  selectedRoleId: number | null;
};

export function ListRoles({ guildId, setSelectedRoleId, selectedRoleId }: TListRolesProps) {
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
            className={`p-4 py-3 bg-opacity-30 rounded-lg w-full text-start ${
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
