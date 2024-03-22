"use client";

import { usePathname } from "next/navigation";

export function ListPages() {
  const route = usePathname();

  const routes = [
    {
      name: "Gerenciar Regras",
      path: "/dashboard",
    },
    {
      name: "Gerenciar Canais",
      path: "/dashboard/channel",
    },
    {
      name: "Gerenciar Comunidade",
      path: "/dashboard/community",
    },
    {
      name: "Configurações",
      path: "/dashboard/config",
    },
  ];

  return (
    <div className="flex flex-col mt-4">
      {routes.map((item, index) => {
        return (
          <a
            key={index}
            className={`${route === item.path ? "bg-primary-500" : ""} bg-opacity-20 px-4 py-2 cursor-pointer`}
            href={item.path}
          >
            {item.name}
          </a>
        );
      })}
    </div>
  );
}
