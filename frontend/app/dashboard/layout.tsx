import { ReactNode } from "react";
import { ListGuilds } from "./components/ListGuilds.component";
import { ListPages } from "./components/ListPages.components";
import { Logout } from "./components/Logout.component";
import ModalInviteBot from "./components/ModalInviteBot.component";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaDiscord } from "react-icons/fa";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdSupportAgent } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex w-full h-[100vh]">
      <div className="bg-background-500 w-[72px] p-2 gap-2 flex flex-col">
        <ListGuilds />
        <ModalInviteBot showButton />
      </div>
      <div className="bg-background-300 w-[240px] w-min-[240px] flex flex-col justify-between">
        <div>
          <div className="bg-gradient-to-t from-primary-300 bg-primary-500 w-full h-[164px] rounded-b-lg"></div>
          <div className="p-4 flex flex-col justify-center">
            <div className="flex gap-1 items-center pl-1">
              <FaDiscord className="text-primary-500" />
              <label className="text-sm">Logado com o discord</label>
            </div>
          </div>
          <ListPages />
        </div>
        <div className="px-4 flex flex-col gap-4">
          <button className="bg-primary-500 p-3 rounded-md font-normal w-full flex items-center gap-2 justify-center">
            <RiTeamFill size={24} />
            Conheça nosso time
          </button>
          <button className="bg-primary-500 p-3 rounded-md font-normal w-full flex items-center gap-2 justify-center">
            <BiSolidDonateBlood size={24} />
            Faça sua doação
          </button>
          <span className="w-fill h-[1px] bg-background-500"></span>
          <Logout />
        </div>
      </div>
      <div className="bg-background-500 flex flex-col flex-1">
        <div className="border-b border-primary-500 w-full ml-auto flex p-4 gap-4 justify-end">
          <MdSupportAgent className="text-primary-500" size={24} />
          <IoMdHelpCircleOutline className="text-primary-500" size={24} />
        </div>
        <div className="h-full flex flex-col">{children}</div>
      </div>
    </div>
  );
}
