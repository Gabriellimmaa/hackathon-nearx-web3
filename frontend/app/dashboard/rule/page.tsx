"use client";

import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { SlArrowLeft } from "react-icons/sl";
import * as yup from "yup";
import { getGuildRoles } from "~~/apis";
import { Checkboxes } from "~~/components/Checkboxes";
import { Input } from "~~/components/Input";
import { Select } from "~~/components/Select";
import { createClient } from "~~/utils/supabase/client";

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

export default function Rule() {
  const supabase = createClient();

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

  const { data: guildRoles, isLoading } = useQuery({
    queryKey: ["getGuildRoles"],
    queryFn: () => getGuildRoles("1220090771525472396"),
  });

  async function onSubmit(formData: ruleFormData) {
    const { data, error } = await supabase
      .from("rule")
      .insert([
        {
          address: formData.address,
          chainType: formData.chainType,
          qtdMax: formData.qtdMax,
          qtdMin: formData.qtdMin,
          title: formData.title,
          tokenType: formData.tokenType,
          roles: formData.roles,
        },
      ])
      .select();

    if (!error) {
      reset();
    }
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
                <option value="mainnet">optimismSepolia</option>
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
            {isLoading && <p>Carregando...</p>}
            {guildRoles && <Checkboxes options={guildRoles.roles} control={control} name="roles" />}
            {errors.roles && <p className="text-red-500 text-lg mt-1 font-normal">{errors.roles.message}</p>}
          </div>
        </div>

        <button
          type="button"
          onClick={() => reset()}
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
