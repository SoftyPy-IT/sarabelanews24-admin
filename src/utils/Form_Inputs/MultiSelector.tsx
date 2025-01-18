/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Multiselect from "multiselect-react-dropdown";

type MultiSelectorProps = {
  options: Array<{ label: string; value: string }>;
  selectedValues: Array<{ label: string; value: string }>;
  placeholder: string;
  onChange: (values: Array<{ label: string; value: string }>) => void;
};

const MultiSelector: React.FC<MultiSelectorProps> = ({
  placeholder,
  options,
  selectedValues,
  onChange,
}) => {
  const handleSelect = (selectedList: []) => {
    onChange(selectedList);
  };

  const handleRemove = (selectedList: []) => {
    onChange(selectedList);
  };

  return (
    <div>
      <Multiselect
        placeholder={placeholder}
        options={options}
        selectedValues={selectedValues}
        displayValue="label"
        onSelect={handleSelect}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default MultiSelector;
