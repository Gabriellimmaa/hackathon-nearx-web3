"use client";

import { ListRoles } from "./components/ListRoles.component";
import { ListChannels } from "./components/ListChannels.component";
import { Header } from "~~/components/dashboard";
import { ListPermission } from "./components/ListPermission.component";
import { useState } from "react";

type TParams = {
  params: {
    id: string;
  };
};

export default function Channel({ params }: TParams) {
  const [selectedChannelId, setSelectedChannelId] = useState<number | null>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

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
          <div className="h-[620px] bg-background-300 rounded-lg p-4 flex flex-col border-l-2 border-background-500 gap-5">
            <h1 className="text-xl mb-1">Permissões</h1>
            <ListPermission setSelectedPermissions={setSelectedPermissions} selectedPermissions={selectedPermissions} />
            <button className="border-2 border-primary-500 text-primary-500 text-lg font-bold py-3 px-8 rounded-lg hover:bg-primary-500 hover:text-white transition duration-300">
              Salvar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
