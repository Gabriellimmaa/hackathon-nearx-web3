"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function ListPages() {
  const route = usePathname();
  const existsIdServer = route.split("/")[2];

  const routes = [
    {
      name: "Gerenciar Regras",
      path: `/dashboard/${existsIdServer}`,
    },
    {
      name: "Gerenciar Canais",
      path: `/dashboard/${existsIdServer}/channel`,
    },
    {
      name: "Gerenciar Comunidade",
      path: `/dashboard/${existsIdServer}/community`,
    },
    {
      name: "Configurações",
      path: `/dashboard/${existsIdServer}/config`,
    },
  ];

  return (
    <div className="flex flex-col mt-4">
      {routes.map((item, index) => {
        return (
          <Link
            key={index}
            className={`${route === item.path ? "bg-primary-500" : ""} bg-opacity-20 px-4 py-2 cursor-pointer`}
            href={item.path}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}
