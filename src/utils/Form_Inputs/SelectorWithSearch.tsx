import React from "react";
import Select from "react-tailwindcss-select";
import { Options, Option } from "react-tailwindcss-select/dist/components/type";
import { Controller, useFormContext } from "react-hook-form";

type FormSelectInputProps = {
  name: string;
  options: Options;
  label: string;
  labelShown?: boolean;
};

export default function SelectorWithSearch({
  name,
  options,
  label,
  labelShown = false,
}: FormSelectInputProps) {
  const { control } = useFormContext();

  const flattenOptions = (options: Options): Option[] => {
    return options.reduce((acc: Option[], option) => {
      if ("options" in option) {
        return [...acc, ...option.options];
      }

      return [...acc, option];
    }, []);
  };

  const flatOptions = flattenOptions(options);

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
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            const selectedOption = flatOptions.find(
              (option) => option.value === value
            );

            return (
              <>
                <Select
                  isSearchable
                  primaryColor=""
                  value={selectedOption || null}
                  onChange={(selected) => {
                    if (Array.isArray(selected)) {
                      onChange(selected.map((option) => option.value));
                    } else {
                      onChange(selected ? selected.value : null);
                    }
                  }}
                  options={flatOptions}
                  placeholder={label}
                  classNames={{
                    searchIcon:
                      "absolute top-1/2 transform -translate-y-1/2 text-gray-400 h-5 pl-2 ",
                  }}
                />
                {error && (
                  <p className="mt-1 text-sm text-red-600">{error.message}</p>
                )}
              </>
            );
          }}
        />
      </div>
    </div>
  );
}
