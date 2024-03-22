"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import ABI from "./abi.json";
import { Success } from "./components/Success.component";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import { FaArrowRight } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { optimismSepolia } from "viem/chains";
import { useAccount } from "wagmi";
import { getRules } from "~~/apis";
import Animation from "~~/public/assets/confetes.json";
import Logo from "~~/public/logo.svg";
import { TUserDiscord } from "~~/types";

export default function AuthUserWaller() {
  const searchParams = useSearchParams();
  const account = useAccount();
  const [userDiscord, setUserDiscord] = useState<TUserDiscord | null>(null);
  const token = searchParams.get("user");

  const [contractsData, setContractsData] = useState([] as any[]);

  const { data: rules } = useQuery({
    queryKey: ["getRules"],
    queryFn: () => getRules(),
  });

  useEffect(() => {
    if (rules) {
      if (rules.data) {
        setContractsData(
          rules.data.map((rule: any) => {
            return {
              address: rule.address,
              abi: ABI,
              args: [account.address],
              chainId: optimismSepolia.id,
              functionName: "balanceOf",
            };
          }),
        );
      }
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
              {!!userDiscord ? <Success contractsData={contractsData} userDiscord={userDiscord} /> : null}
            </>
          ) : (
            <>
              <h2 className="my-10 text-4xl">Vamos conectar sua carteira?</h2>
              <p className="text-primary-500">
                Com sua carteria conectada podemos liberar acesso a funcionalidades exclusivas conforme suas NFTs
              </p>
            </>
          )}
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
