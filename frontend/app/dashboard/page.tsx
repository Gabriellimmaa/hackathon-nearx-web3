"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { patchGuildRoles } from "~~/apis";
import Logo from "~~/public/logo.svg";

export default function Dashboard() {
  const { data: session } = useSession();

  const { data } = useQuery({
    queryKey: ["patchGuildRoles", session?.user.id],
    queryFn: () =>
      patchGuildRoles({
        userId: session?.user.id || "",
        guildsIds: session?.guilds.map(guild => guild.id) || [],
      }),
    enabled: !!session?.user.id,
  });

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-full max-w-screen-lg">
          <div className="p-8 pt-2 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-background-300 outline-none focus:outline-none">
            <div className="relative flex justify-between gap-4 items-center">
              <div>
                <h1 className="text-3xl">Bem vindo, {session?.user.name}</h1>
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  Aqui você tem acesso a todo o painel administrativo de nosso bot.
                  <br /> Mas primeiro precisamos adiciona-lo em seu servidor
                </p>
              </div>
              <Image src={Logo} alt="logo" width={200} height={200} />
            </div>

            <div
              className="flex flex-col gap-4 max-h-72 overflow-y-auto"
              style={{
                scrollbarColor: "#232328 transparent",
              }}
            >
              {data?.guilds.map(guild => {
                return (
                  <div key={guild.id} className="flex gap-4 items-center bg-background-500 rounded-lg pr-3">
                    <Image
                      src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                      alt={guild.name}
                      width={64}
                      height={64}
                      className="rounded-md"
                    />
                    <div>
                      <h2>{guild.name}</h2>
                      <p>{guild.id}</p>
                    </div>
                    <Link
                      href={`/dashboard/${guild.id}`}
                      className="ml-auto text-center bg-primary-500 rounded-lg p-2 font-normal w-fit hover:bg-primary-300 transition duration-300 cursor-pointer"
                    >
                      Acessar Servidor
                    </Link>
                  </div>
                );
              })}
              <h1 className="text-2xl mb-4">Selecione um servidor para adicionar o bot</h1>
              {session?.guilds
                .filter(guild => !data?.guilds.find(g => g.id === guild.id))
                .map(guild => {
                  return (
                    <div key={guild.id} className="flex gap-4 items-center bg-background-500 rounded-lg pr-3">
                      <Image
                        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                        alt={guild.name}
                        width={64}
                        height={64}
                        className="rounded-md"
                      />
                      <div>
                        <h2>{guild.name}</h2>
                        <p>{guild.id}</p>
                      </div>
                      <a
                        className="ml-auto text-center bg-primary-500 rounded-lg p-2 font-normal w-32 hover:bg-primary-300 transition duration-300 cursor-pointer"
                        target="_blank"
                        // @todo
                        href={`https://discord.com/api/oauth2/authorize?client_id=1220091005315846234&permissions=8&scope=bot&guild_id=${guild.id}`}
                      >
                        Adicionar
                      </a>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
