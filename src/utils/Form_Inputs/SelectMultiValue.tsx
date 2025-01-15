/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import Select from "react-tailwindcss-select";
import { Option, Options } from "react-tailwindcss-select/dist/components/type";
import { Controller, useFormContext } from "react-hook-form";

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
    <div className="space-y-2">
      {labelShown && (
        <label className="block text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <div>
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <Select
                isSearchable
                isClearable
                primaryColor="indigo"
                value={value || (isMultiple ? [] : null)} 
                onChange={(selected) => {
                  onChange(isMultiple ? selected || [] : selected || null);
                }}
                options={options}
                placeholder={`Select ${label}`}
                isMultiple={isMultiple}
              />
              {error && (
                <p className="mt-1 text-sm text-red-600">{error.message}</p>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
}
