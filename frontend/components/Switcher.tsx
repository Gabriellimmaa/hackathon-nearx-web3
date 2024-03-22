"use client";

import { ComponentProps, useState } from "react";

type TSwitcher = ComponentProps<"input"> & {
  label: string;
  errorMessage?: string;
};

export function Switcher({ label, errorMessage, id, checked, onChange }: TSwitcher) {
  return (
    <div className="grid grid-cols-2 w-full justify-between px-8">
      <p className="text-md">{label}</p>
      <div className="inline-flex items-center justify-end">
        <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
          <input
            id={id}
            checked={checked}
            onChange={onChange}
            type="checkbox"
            className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-white checked:bg-primary-500 peer-checked:border-primary-500 peer-checked:before:bg-gray-900"
          />
          <label
            htmlFor={id}
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
  );
}
