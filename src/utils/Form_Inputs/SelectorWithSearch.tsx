import React from "react";
import Select from "react-tailwindcss-select";
import {
  Options,
  Option,
} from "react-tailwindcss-select/dist/components/type";
import { Controller, useFormContext } from "react-hook-form";

type FormSelectInputProps = {
  name: string;
  options: Options;
  label: string;
  labelShown?: boolean;
};

export default function SelectMultiValue({
  name,
  options,
  label,
  labelShown = false,
}: FormSelectInputProps) {
  const { control } = useFormContext();

  // Function to flatten options and remove GroupOption if needed
  const flattenOptions = (options: Options): Option[] => {
    return options.reduce((acc: Option[], option) => {
      // If it's a GroupOption, merge its options
      if ("options" in option) {
        return [...acc, ...option.options];
      }
      // Otherwise, it's an Option, so add it to the accumulator
      return [...acc, option];
    }, []);
  };

  const flatOptions = flattenOptions(options); // Flatten the options to make sure they're all Option types

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
            // Find the selected option from the flattened list using the value
            const selectedOption = flatOptions.find(
              (option) => option.value === value
            );

            return (
              <>
                <Select
                  isSearchable
                  primaryColor=""
                  value={selectedOption || null} // Make sure it gets the object format
                  onChange={(selected) => {
                    if (Array.isArray(selected)) {
                      // If multiple options are selected, extract an array of values
                      onChange(selected.map((option) => option.value));
                    } else {
                      // If single option is selected, extract the value
                      onChange(selected ? selected.value : null);
                    }
                  }}
                  options={flatOptions} // Use the flattened options list
                  placeholder={label}
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
