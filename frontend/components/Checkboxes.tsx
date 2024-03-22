import { useEffect, useState } from "react";
import { useController } from "react-hook-form";

export function Checkboxes({ options, control, name }) {
  const { field } = useController({
    control,
    name,
  });

  // Inicializa um array de booleanos para acompanhar se cada opção está marcada
  const [checkedOptions, setCheckedOptions] = useState(() => {
    const initialValues = options.map(option => field.value?.includes(option.id));
    return initialValues;
  });

  useEffect(() => {
    const newCheckedOptions = options.map(option => field.value?.includes(option.id));
    setCheckedOptions(prevCheckedOptions =>
      newCheckedOptions.map((newValue, index) =>
        newValue !== prevCheckedOptions[index] ? newValue : prevCheckedOptions[index],
      ),
    );
  }, [field.value, options]);

  return (
    <>
      {options.map((option, index) => (
        <label className="label cursor-pointer" key={option.id}>
          <span className="label-text text-zinc-100 font-normal text-xl">{option.name}</span>
          <input
            onChange={e => {
              const isChecked = e.target.checked;
              // Cria uma cópia do array de booleanos
              const newCheckedOptions = [...checkedOptions];
              // Atualiza o valor do checkbox na posição correspondente do array
              newCheckedOptions[index] = isChecked;
              // Atualiza o estado local com os novos valores dos checkboxes marcados
              setCheckedOptions(newCheckedOptions);
              // Filtra os IDs das opções marcadas e envia para o react-hook-form
              const selectedOptions = options.filter((opt, idx) => newCheckedOptions[idx]).map(opt => opt.id);
              field.onChange(selectedOptions);
            }}
            className="checkbox checkbox-primary"
            type="checkbox"
            checked={checkedOptions[index]}
            value={option.id}
          />
        </label>
      ))}
    </>
  );
}
