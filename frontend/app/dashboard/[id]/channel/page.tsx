"use client";

import { ListRoles } from "./components/ListRoles.component";
import { ListChannels } from "./components/ListChannels.component";
import { Header } from "~~/components/dashboard";
import { ListPermission } from "./components/ListPermission.component";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postUpdateChannel } from "~~/apis/postUpdateChannel.api";

type TParams = {
  params: {
    id: string;
  };
};

type TPostBody = {
  channelId: string;
  roleId: string;
  permission: string[];
};

export default function Channel({ params }: TParams) {
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const changeInfoMutation = useMutation({
    mutationFn: ({ channelId, roleId, permission }: TPostBody) => postUpdateChannel({ channelId, permission, roleId }),
  });

  async function handleSubmitUpdateChannel() {
    if (selectedChannelId && selectedRoleId && selectedPermissions) {
      await changeInfoMutation.mutate({
        channelId: selectedChannelId,
        roleId: selectedRoleId,
        permission: selectedPermissions,
      });
      setSelectedPermissions([]);
      setSelectedRoleId("");
      setSelectedChannelId("");
    }
  }

  console.log(selectedPermissions.length);

  return (
    <div className="h-full">
      <Header
        title="Gerenciar Canais"
        description="Gerencie todos os canais de seu discord e vincule ele aos cargos configurados."
      />
      <div className="grid grid-cols-3 h-[620px] mx-8 gap-3">
        <div className="bg-background-300 rounded-lg p-4 flex flex-col border-l-2 border-background-500">
          <h4 className="text-xl">Canais</h4>
          <div className="mt-4">
            <ListChannels
              guildId={params.id}
              setSelectedChannelId={setSelectedChannelId}
              selectedChannelId={selectedChannelId}
            />
          </div>
        </div>
        {selectedChannelId && (
          <div className="bg-background-300 rounded-lg p-4 flex flex-col border-l-2 border-background-500">
            <h1 className="text-xl mb-1">Cargo</h1>
            <ListRoles guildId={params.id} setSelectedRoleId={setSelectedRoleId} selectedRoleId={selectedRoleId} />
          </div>
        )}
        {selectedRoleId && (
          <div className="h-[688px] bg-background-300 rounded-lg p-4 flex flex-col border-l-2 border-background-500 gap-5">
            <h1 className="text-xl mb-1">Permissões</h1>
            <ListPermission setSelectedPermissions={setSelectedPermissions} selectedPermissions={selectedPermissions} />
            <button
              disabled={selectedPermissions.length === 0}
              onClick={handleSubmitUpdateChannel}
              className={`border-2 ${
                selectedPermissions.length === 0
                  ? "border-gray-300 text-gray-300 cursor-not-allowed"
                  : "border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white"
              } text-lg font-bold py-3 px-8 rounded-lg transition duration-300`}
            >
              Salvar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
