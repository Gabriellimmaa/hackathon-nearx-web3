"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import ABI from "./abi.json";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useMutation, useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import { FaArrowRight } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { optimismSepolia } from "viem/chains";
import { useAccount, useReadContract, useReadContracts, useWalletClient } from "wagmi";
import { getRules, postAddUserRole } from "~~/apis";
import Animation from "~~/public/assets/confetes.json";
import Logo from "~~/public/logo.svg";
import { TUserDiscord } from "~~/types";

export default function AuthUserWaller() {
  const searchParams = useSearchParams();
  const account = useAccount();
  const wallet = useWalletClient();
  const [userDiscord, setUserDiscord] = useState<TUserDiscord | null>(null);
  const token = searchParams.get("user");

  // consultar backend supabase para verificar se as nfts do usuario estao na whitelist
  const { data: rules } = useQuery({
    queryKey: ["getRules"],
    queryFn: () => getRules(),
  });

  // const {
  //   data: qtdUserToken,
  //   isLoading,
  //   isError,
  //   isSuccess,
  // } = useReadContract({
  //   // endereco contrato
  //   address: rule.address as any,
  //   abi: ABI,
  //   // argumento da funcao
  //   // buscar uma nft especifica
  //   args: [account.address],
  //   chainId: optimismSepolia.id,
  //   functionName: "balanceOf",
  // });

  const { data: qtdUserToken, refetch } = useReadContracts({
    contracts: rules?.data?.map(rule => ({
      address: rule.address,
      abi: ABI,
      args: [account.address],
      chainId: optimismSepolia.id,
      functionName: "balanceOf",
    })) as any,
  });
  console.log(qtdUserToken);

  const postAddUserRole = useMutation({
    mutationFn: ({ userId, guild_id, roles }: { userId: number; guild_id: number; roles: number[] }) =>
      postAddUserRole({ userId, guild_id, roles }),
  });

  useEffect(() => {
    if (rules) {
      console.log(
        rules?.data?.map(rule => ({
          address: rule.address,
          abi: ABI,
          args: [account.address],
          chainId: optimismSepolia.id,
          functionName: "balanceOf",
        })) as any,
      );
      refetch();
    }
  }, [rules]);

  useEffect(() => {
    if (token) {
      const convertedBase64 = atob(token);
      setUserDiscord(JSON.parse(convertedBase64));
    }
  }, [token]);

  return (
    <>
      <div className="from-background-300 to-background-800 bg-gradient-to-tr fixed h-full w-full z-10"></div>
      <div
        className="absolute z-50 h-full w-full"
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div className="flex flex-col justify-center items-center text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center gap-8">
          <div className="flex mt-8">
            <p>Olá </p>
            <h1 className="ml-2">
              {userDiscord?.user.name}#{userDiscord?.user.discriminator}
            </h1>
            <p>, seja bem-vindo ao CryptoGuardian</p>
          </div>
          <div className="flex gap-4 items-center">
            <Image
              src={Logo}
              alt="logo"
              width={100}
              height={100}
              className="rounded-full w-52 border-4 border-primary-500"
            />
            {account.isConnected ? (
              <FaCheck size={64} className="text-success" />
            ) : (
              <FaArrowRight size={64} className="text-primary-500" />
            )}
            <Image
              src={userDiscord?.user.avatar_url || ""}
              alt="avatar"
              width={100}
              height={100}
              className="rounded-full w-52"
            />
          </div>
          {account.isConnected ? (
            <>
              <h2 className="my-10 text-4xl text-success">Conectado com sucesso</h2>
              <p className="text-white">
                Estamos processando sua carteira e logo você terá acesso a todas as funcionalidades
              </p>
            </>
          ) : (
            <>
              <h2 className="my-10 text-4xl">Vamos conectar sua carteira?</h2>
              <p className="text-primary-500">
                Com sua carteria conectada podemos liberar acesso a funcionalidades exclusivas conforme suas NFTs
              </p>
            </>
          )}

          {/* <p>message_channel_id: {userDiscord?.message.channel_id}</p>
        <p>message_id: {userDiscord?.message.id}</p>
        <p>created_at: {userDiscord?.created_at}</p>
        <p>guild_id: {userDiscord?.guild_id}</p> */}
        </div>
        <div className="p-2 bg-primary-500 rounded-xl border-2 border-white m-4 h-fit">
          <ConnectButton />
        </div>
      </div>
      {account.isConnected && (
        <Lottie
          animationData={Animation}
          loop={false}
          style={{
            position: "fixed",
            bottom: 0,
            zIndex: 20,
          }}
        />
      )}
    </>
  );
}
