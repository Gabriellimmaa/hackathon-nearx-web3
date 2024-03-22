import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useReadContracts } from "wagmi";
import { getRules, postAddUserRole } from "~~/apis";
import { TUserDiscord } from "~~/types";

type TProps = {
  contractsData: any;
  userDiscord: TUserDiscord;
};

export function Success({ contractsData, userDiscord }: TProps) {
  const [loading, setLoading] = useState(false);
  const mutationUserRole = useMutation({
    mutationFn: ({ user_id, guild_id, roles }: { user_id: string; guild_id: string; roles: string[] }) =>
      postAddUserRole({ user_id, guild_id, roles }),
  });

  const { data: rules } = useQuery({
    queryKey: ["getRules"],
    queryFn: () => getRules(),
  });

  const { data: qtdUserToken } = useReadContracts({
    contracts: contractsData,
  });

  useEffect(() => {
    if (qtdUserToken) {
      console.log("contractsData");
      console.log(contractsData);
      console.log("qtdUserToken");
      console.log();
      qtdUserToken.forEach((element: any) => {
        const qtd = parseInt(element.result.toString());
        rules?.data?.map(rule => {
          if (qtd >= parseInt(rule.qtdMin) && qtd <= parseInt(rule.qtdMax)) {
            console.log({ userId: userDiscord.user.id, guild_id: userDiscord.guild_id, roles: rule.roles });
            mutationUserRole.mutate({
              user_id: userDiscord.user.id,
              guild_id: userDiscord.guild_id,
              roles: rule.roles,
            });
          }
        });
        setLoading(false);
      });
    }
  }, [contractsData, qtdUserToken]);

  return (
    <>
      {loading ? (
        <p>Estamos processando sua carteira e logo você terá acesso a todas as funcionalidades</p>
      ) : (
        <p>Tudo pronto! já liberamos seu acesso em nosso servidor</p>
      )}
    </>
  );
}
