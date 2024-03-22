import { ListChannels } from "./components/ListChannels.component";
import { Header } from "~~/components/dashboard";

export default function Channel() {
  return (
    <div className="h-full">
      <div className="p-8">
        <Header
          title="Gerenciar Canais"
          description="Gerencie todos os canais de seu discord e vincule ele aos cargos configurados."
        />
      </div>
      <div className="grid grid-cols-7 h-full">
        <div className="col-span-2 bg-background-300 rounded-tr-lg p-4 flex flex-col border-l-2 border-background-500">
          <h4 className="text-xl">Canais</h4>
          <div className="mt-4">
            <ListChannels />
          </div>
        </div>
        <div className="col-span-5 grid justify-center items-center">
          <h1>asdasda</h1>
        </div>
      </div>
    </div>
  );
}
