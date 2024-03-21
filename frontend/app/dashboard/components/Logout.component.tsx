"use client";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { MdOutlineLogout } from "react-icons/md";

export function Logout() {
  const { data: session } = useSession();
  async function handleLogout() {
    await signOut({
      callbackUrl: `${window.location.origin}`,
    });
  }
  return (
    <>
      <div className="flex flex-row justify-between pb-4">
        <Image src={session?.user.image || ""} alt="user-image" width={54} height={54} className="rounded-full" />
        <button
          type="button"
          onClick={handleLogout}
          className="hover:bg-background-500 p-3 rounded-full transition duration-300"
        >
          <MdOutlineLogout className="text-primary-500" size={28} />
        </button>
      </div>
    </>
  );
}
