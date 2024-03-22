"use client";

import { Header } from "~~/components/dashboard";

export default function Config() {
  return (
    <>
      <Header title="Configurações" />
      <div className="ml-8">
        <div className="grid grid-rows-2 items-center">
          <div className="grid grid-cols-2 items-center ">
            <div>
              <h3>Carteira check</h3>
              <p className="text-sm">Fazer a verificação regular dentre intervalos de tempos</p>
            </div>
            <div className="flex justify-end items-center w-[252px]">
              <div className="inline-flex items-center">
                <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                  <input
                    id="switch"
                    type="checkbox"
                    className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-white checked:bg-primary-500 peer-checked:border-primary-500 peer-checked:before:bg-gray-900"
                    defaultChecked
                  />
                  <label
                    htmlFor="switch"
                    className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-primary-500 bg-primary-500 shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-background-300 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-primary-500 peer-checked:before:bg-gray-900"
                  >
                    <div
                      className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                      data-ripple-dark="true"
                    ></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 items-center mt-8">
            <div className="">
              <h3>Verificar configurações do Bot</h3>
              <p className="text-sm">Verificar se seu bot esta devidamente configurado em seu servidor</p>
            </div>

            <div>
              <button className="border-2 border-primary-500 text-primary-500 text-lg font-bold py-3 px-8 rounded-lg hover:bg-primary-500 hover:text-white transition duration-300">
                Verificar configurações
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
