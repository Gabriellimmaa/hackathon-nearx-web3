"use client";

import { Switcher } from "~~/components/Switcher";

type TListPermissionProps = {
  setSelectedPermissions: (selectedPermissions: string[]) => void;
  selectedPermissions: string[] | null;
};

type TPermissions = {
  id: string;
  name: string;
};

const Permissions: TPermissions[] = [
  {
    id: "add_reactions",
    name: "Adicionar Reações",
  },
  {
    id: "attach_files",
    name: "Anexar Arquivos",
  },
  {
    id: "connect",
    name: "Conectar",
  },
  {
    id: "embed_links",
    name: "Incorporar Links",
  },
  {
    id: "external_emojis",
    name: "Emojis Externos",
  },
  {
    id: "external_stickers",
    name: "Stickers Externos",
  },
  {
    id: "manage_channels",
    name: "Gerenciar Canais",
  },
  {
    id: "manage_emojis",
    name: "Gerenciar Emojis",
  },
  {
    id: "manage_messages",
    name: "Gerenciar Mensagens",
  },
  {
    id: "manage_nicknames",
    name: "Gerenciar Apelidos",
  },
  {
    id: "manage_threads",
    name: "Gerenciar Threads",
  },
  {
    id: "mention_everyone",
    name: "Mencionar Todos",
  },
  {
    id: "moderate_members",
    name: "Moderar Membros",
  },
  {
    id: "move_members",
    name: "Mover Membros",
  },
  {
    id: "mute_members",
    name: "Silenciar Membros",
  },
  {
    id: "priority_speaker",
    name: "Orador Prioritário",
  },
  {
    id: "read_message_history",
    name: "Ler Histórico de Mensagens",
  },
  {
    id: "read_messages",
    name: "Ler Mensagens",
  },
  {
    id: "send_messages",
    name: "Enviar Mensagens",
  },
  {
    id: "send_messages_in_threads",
    name: "Enviar Mensagens em Threads",
  },
  {
    id: "send_voice_messages",
    name: "Enviar Mensagens de Voz",
  },
  {
    id: "speak",
    name: "Falar",
  },
  {
    id: "stream",
    name: "Transmitir",
  },
  {
    id: "use_external_emojis",
    name: "Usar Emojis Externos",
  },
  {
    id: "use_external_sounds",
    name: "Usar Sons Externos",
  },
  {
    id: "use_external_stickers",
    name: "Usar Stickers Externos",
  },
  {
    id: "view_audit_log",
    name: "Ver Registro de Auditoria",
  },
  {
    id: "view_channel",
    name: "Ver Canal",
  },
  {
    id: "view_guild_insights",
    name: "Ver Insights do Servidor",
  },
];

export function ListPermission({ setSelectedPermissions, selectedPermissions }: TListPermissionProps) {
  const togglePermission = (id: string) => {
    if (selectedPermissions!.includes(id)) {
      setSelectedPermissions(selectedPermissions!.filter(permissionId => permissionId !== id));
    } else {
      setSelectedPermissions([...selectedPermissions!, id]);
    }
  };

  return (
    <div
      className="overflow-y-auto flex flex-col gap-4 mt-2 h-[450px]"
      style={{
        scrollbarColor: "#232328 transparent",
      }}
    >
      {Permissions.map((permission, index) => {
        return (
          <Switcher
            key={index}
            label={permission.name}
            id={permission.id}
            checked={selectedPermissions!.includes(permission.id)} // Verifica se a permissão está selecionada
            onChange={() => togglePermission(permission.id)}
            // className={`p-4 py-3 bg-opacity-30 rounded-lg w-full text-start ${
            //   selectedPermissionId === permission.id ? "bg-primary-500" : ""
            // }`}
            // onClick={() => {
            //   setSelectedPermissionId(permission.id);
            // }}
          />
        );
      })}
    </div>
  );
}
