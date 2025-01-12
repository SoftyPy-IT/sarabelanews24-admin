/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import Select from "react-tailwindcss-select";
import { Option, Options } from "react-tailwindcss-select/dist/components/type";
import { Controller, useFormContext } from "react-hook-form";
// import AddNewButton from "./AddNewButton";

type FormSelectInputProps = {
  name: string;
  options: Options;
  label: string;
  href?: string;
  labelShown?: boolean;
  toolTipText?: string;
  isMultiple?: boolean;
};

export default function SelectMultiValue({ 
  name,
  options,
  label,
  href,
  toolTipText,
  labelShown = true,
  isMultiple = false,
}: FormSelectInputProps) {
  const { control } = useFormContext();

  return (
    <div className="">
      {/* {labelShown && (
        <h2 className="pb-2 block text-sm font-medium leading-6 text-gray-900">
          Select {label}
        </h2>
      )} */}
      <div className="">
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <Select
                isSearchable
                isClearable
                primaryColor="indigo"
                value={isMultiple ? value || null : value || null}
                onChange={(selected) => {
                  if (isMultiple) {
                    onChange(selected ? selected : null);
                  } else {
                    onChange(selected ? selected : null);
                  }
                }}
                options={options}
                // placeholder={`Select ${label}`}
                placeholder={label}
                isMultiple={isMultiple}
              />
              {/* {href && toolTipText && (
                <AddNewButton toolTipText={toolTipText} href={href} />
              )} */}
              {error && (
                <p className="mt-1  text-red-600">{error.message}</p>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
}
