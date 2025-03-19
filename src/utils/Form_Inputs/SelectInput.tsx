/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, FieldValues, Path, useController } from "react-hook-form";

type SelectInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
  options: { label: string; value: string }[];
  rules?: Record<string, any>;
  onValueChange?: (value: string) => void;
};

const SelectInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
  options,
  rules,
  onValueChange,
}: SelectInputProps<T>) => {
  const {
    fieldState: { error },
  } = useController<T>({
    control,
    name,
    rules,
  });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Select
            onValueChange={(value) => {
              field.onChange(value); 
              onValueChange?.(value); 
            }}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-white">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && (
            <FormMessage className="text-red-500 mt-1">
              {error.message}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};

export default SelectInput;
