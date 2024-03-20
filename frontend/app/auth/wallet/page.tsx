"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { TUserDiscord } from "~~/types";

export default function AuthUserWaller() {
  const searchParams = useSearchParams();
  const [userDiscord, setUserDiscord] = useState<TUserDiscord | null>(null);
  const token = searchParams.get("user");

  useEffect(() => {
    if (token) {
      const convertedBase64 = atob(token);
      setUserDiscord(JSON.parse(convertedBase64));
    }
  }, [token]);

  return (
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
  );
}
