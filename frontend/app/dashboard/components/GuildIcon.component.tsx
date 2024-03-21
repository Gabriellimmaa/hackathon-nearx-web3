"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";

export function GuildIcon() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="bg-primary-500 w-[57px] h-[57px] rounded-md">
      {/* <Image src={session?.user?.image} alt="" width={57} height={57} /> */}
    </div>
  );
}
