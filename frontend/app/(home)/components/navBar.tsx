"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaArrowUp } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";

export function NavBar() {
  const { data: session } = useSession();

  async function handleSign() {
    await signIn("discord", {
      callbackUrl: `${window.location.origin}/dashboard`,
    });
  }

  async function handleLogout() {
    await signOut();
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function scrollToElement(elementId: string) {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  }

  if (status === "loading") {
    return <></>;
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <div className="flex bg-background-300 p-4 rounded-full gap-4 items-center justify-center flex-grow text-zinc-100">
        <button
          type="button"
          onClick={scrollToTop}
          className="flex justify-center h-[52px] w-32 items-center hover:bg-background-500 p-3 rounded-full transition duration-300"
        >
          <FaArrowUp className="text-lg" />
        </button>

        <button
          type="button"
          onClick={() => scrollToElement("preco")}
          className="flex justify-center h-[52px] items-center text-lg w-40 hover:bg-background-500 p-3 rounded-full transition duration-300 font-bold"
        >
          Ver Preço
        </button>
        {session ? (
          <>
            <Link
              href="/dashboard"
              className="flex justify-center h-[52px] items-center text-lg w-40 hover:bg-background-500 p-3 rounded-full transition duration-300 font-bold"
            >
              Dashboard
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex justify-center h-[52px] items-center text-lg w-40 hover:bg-background-500 p-3 rounded-full transition duration-300 font-bold"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handleSign}
            className="flex justify-center h-[52px] items-center text-lg w-40 p-3 rounded-full transition duration-300 font-bold gap-4  bg-gradient-to-tr from-primary-500 to-purple-500 hover:to-primary-500"
          >
            <FaDiscord size={30} />
            Login
          </button>
        )}
      </div>
    </div>
  );
}
