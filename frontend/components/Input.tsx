import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type TInput = ComponentProps<"input"> & {
  label: string;
  placeholder?: string;
  errorMessage?: string;
};

export function Input({ placeholder, label, errorMessage, className, type, ...props }: TInput) {
  function formatId(label: string): string {
    return label
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xl text-zinc-100 font-normal" htmlFor={formatId(label)}>
        {label}
      </label>
      <input
        id={formatId(label)}
        className={twMerge(
          "bg-background-300 border border-primary-500 rounded-md px-5 py-2 w-full focus:outline-2 focus:outline focus:outline-primary-500 focus:outline-offset-2",
          className,
        )}
        placeholder={placeholder}
        {...props}
      />
      {errorMessage && <p className="text-red-500 text-lg mt-1 font-normal">{errorMessage}</p>}
    </div>
  );
}
