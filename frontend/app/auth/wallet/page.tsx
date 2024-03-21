"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import ABI from "./abi.json";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { optimismSepolia } from "viem/chains";
import { useAccount, useReadContract, useWalletClient } from "wagmi";
import { TUserDiscord } from "~~/types";

export default function AuthUserWaller() {
  const searchParams = useSearchParams();
  const account = useAccount();
  const wallet = useWalletClient();
  const [userDiscord, setUserDiscord] = useState<TUserDiscord | null>(null);
  const token = searchParams.get("user");

  const { data, isLoading, isError, isSuccess } = useReadContract({
    // endereco contrato
    address: "0x3D1dDac02c60EDacAbA25C1D1ceD93eE96f6EFbb",
    abi: ABI,
    // argumento da funcao
    // buscar uma nft especifica
    args: [account.address],
    chainId: optimismSepolia.id,
    functionName: "balanceOf",
  });

  useEffect(() => {
    if (token) {
      const convertedBase64 = atob(token);
      setUserDiscord(JSON.parse(convertedBase64));
    }
  }, [token]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: 12,
      }}
    >
      <div className="flex flex-col justify-center items-center mt-10 text-3xl">
        <h1>Auth params Wallet</h1>
        <Image src={userDiscord?.user.avatar_url || ""} alt="avatar" width={100} height={100} />
        <p>name: {userDiscord?.user.name}</p>
        <p>discriminator: {userDiscord?.user.discriminator}</p>
        <p>message_channel_id: {userDiscord?.message.channel_id}</p>
        <p>message_id: {userDiscord?.message.id}</p>
        <p>created_at: {userDiscord?.created_at}</p>
        <p>guild_id: {userDiscord?.guild_id}</p>
      </div>
      <ConnectButton />
    </div>
  );
}
