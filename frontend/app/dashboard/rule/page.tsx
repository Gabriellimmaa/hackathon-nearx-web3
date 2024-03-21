"use client";

import Link from "next/link";
import { SlArrowLeft } from "react-icons/sl";
import { Input } from "~~/components/Input";
import { Select } from "~~/components/Select";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkboxes } from "~~/components/Checkboxes";

const ruleSchema = yup.object({
  title: yup.string().required("O campo Título é obrigatório"),
  chainType: yup.string().required("O campo Chain Type é obrigatório"),
  tokenType: yup.string().required("O campo Token Type é obrigatório"),
  address: yup.string().required("O campo Endereço é obrigatório"),
  qtdMin: yup.string().required("O campo Quantidade mínima é obrigatório"),
  qtdMax: yup.string().required("O campo Quantidade máxima é obrigatório"),
  roles: yup
    .array(yup.string().nullable())
    .min(1, "É necessário ao menos uma role")
    .test("notEmptyOrNulls", "É necessário ao menos uma role", function (value) {
      return value && value.some(role => role !== null && role !== undefined);
    }),
});

type ruleFormData = yup.InferType<typeof ruleSchema>;

const array = [
  {
    id: "123",
    name: "Administrador",
  },
  {
    id: "456",
    name: "Cargo 1",
  },
  {
    id: "789",
    name: "Cargo 2",
  },
];

export default function Rule() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ruleFormData>({
    resolver: yupResolver(ruleSchema),
    defaultValues: {
      roles: [],
      address: "",
      chainType: "",
      qtdMax: "",
      qtdMin: "",
      title: "",
      tokenType: "",
    },
  });

  async function onSubmit(data: ruleFormData) {
    console.log(data);
  }

  return (
    <>
      <div className="p-8 flex">
        <div className="flex">
          <Link href="/dashboard" className="flex justify-start items-center gap-3 text-3xl font-bold text-primary-500">
            <SlArrowLeft size={30} strokeWidth={50} />
            <p className="text-primary-500 font-bold">Gerenciar Cargos e Tokens</p>
          </Link>
        </div>
      </div>
      <form className="pl-8 grid grid-cols-2 gap-12 pr-20" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-rows-4 gap-8 w-full">
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Título"
                className="row-span-1"
                value={value}
                onChange={onChange}
                placeholder="Título"
                type="text"
                errorMessage={errors.title?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="chainType"
            render={({ field: { onChange, value } }) => (
              <Select
                label="Chain Type"
                className="row-span-1"
                value={value}
                onChange={onChange}
                errorMessage={errors.chainType?.message}
              >
                <option value="mainnet">Mainnet</option>
                <option value="bitcoin">Bitcoin</option>
              </Select>
            )}
          />

          <Controller
            control={control}
            name="tokenType"
            render={({ field: { onChange, value } }) => (
              <Select
                label="Token Type"
                className="row-span-1"
                value={value}
                onChange={onChange}
                errorMessage={errors.tokenType?.message}
              >
                <option value="erc20">ERC20</option>
                <option value="erc721">ERC721</option>
              </Select>
            )}
          />

          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Endereço"
                value={value}
                onChange={onChange}
                className="row-span-1"
                placeholder="Endereço"
                type="text"
                errorMessage={errors.address?.message}
              />
            )}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary-500">Saldo</h1>
          <div className="grid grid-cols-2 gap-5 mt-2">
            <Controller
              control={control}
              name="qtdMin"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Quantidade Mínima"
                  value={value}
                  onChange={onChange}
                  className="row-span-1"
                  placeholder="Quantidade Mínima"
                  type="text"
                  errorMessage={errors.qtdMin?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="qtdMax"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Quantidade Máxima"
                  value={value}
                  onChange={onChange}
                  className="row-span-1"
                  placeholder="Quantidade Máxima"
                  type="text"
                  errorMessage={errors.qtdMax?.message}
                />
              )}
            />
          </div>
          <h1 className="text-2xl font-bold text-primary-500 mt-8">Vincular a um cargo discord</h1>
          <div className="flex flex-col gap-4 mt-3">
            <Checkboxes options={array} control={control} name="roles" />
            {errors.roles && <p className="text-red-500 text-lg mt-1 font-normal">{errors.roles.message}</p>}
          </div>
        </div>

        <button
          type="button"
          className="font-normal border-2 border-primary-500 rounded-lg py-4 hover:border-primary-300 hover:bg-background-300 transition duration-300"
        >
          Resetar
        </button>
        <button
          type="submit"
          className="font-normal rounded-lg py-4 bg-primary-500 hover:bg-primary-300 transition duration-300"
        >
          Salvar
        </button>
      </form>
    </>
  );
}
