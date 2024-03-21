"use client";
import { useState } from "react";
import { useController } from "react-hook-form";

export function Checkboxes({ options, control, name }) {
  const { field } = useController({
    control,
    name,
  });

  const [value, setValue] = useState(field.value || []);

  return (
    <>
      {options.map((option, index) => (
        <label className="label cursor-pointer" key={option.id}>
          <span className="label-text text-zinc-100 font-normal text-xl">{option.name}</span>
          <input
            onChange={e => {
              const valueCopy = [...value];

              // update checkbox value
              valueCopy[index] = e.target.checked ? e.target.value : null;
              // send data to react hook form
              field.onChange(valueCopy);

              // update local state
              setValue(valueCopy);
            }}
            className="checkbox checkbox-primary"
            type="checkbox"
            checked={value.includes(option.id)}
            value={option.id}
          />
        </label>
      ))}
    </>
  );
}
