"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGuildRoles } from "~~/apis";

export function ListRoles() {
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const { data: guildRoles, isLoading } = useQuery({
    queryKey: ["getGuildRoles"],
    queryFn: () => getGuildRoles("1220090771525472396"),
  });

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        guildRoles?.roles.map((role, index) => {
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
        })
      )}
    </>
  );
}
