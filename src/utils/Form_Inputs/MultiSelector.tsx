/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Multiselect from "multiselect-react-dropdown";
import { Controller, useFormContext } from "react-hook-form";

type MultiSelectorProps = {
  name: string;
  options: Array<{ label: string; value: string }>;
  placeholder: string;
};

const MultiSelector: React.FC<MultiSelectorProps> = ({
  name,
  options,
  placeholder,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]} // Default value as an empty array
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div>
          <Multiselect
            placeholder={placeholder}
            options={options}
            selectedValues={options.filter((option) =>
              value?.includes(option.value)
            )} // Match selected values to the full objects
            displayValue="label"
            onSelect={(selectedList) =>
              onChange(selectedList.map((item: any) => item.value))
            } // Update form state with array of values
            onRemove={(selectedList) =>
              onChange(selectedList.map((item: any) => item.value))
            } // Update form state with array of values
          />
          {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
        </div>
      )}
    />
  );
};

export default MultiSelector;
