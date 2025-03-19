/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path, useController } from "react-hook-form";

type DateTimeInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  label?: string;
  type?: string;
  rules?: Record<string, any>;
};

const DateTimeInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
  rules,
  type = "text",
}: DateTimeInputProps<T>) => {
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
          {label && (
            <label className="block text-sm font-medium mb-1">{label}</label>
          )}
          <FormControl className="bg-white">
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          {/* Display validation error message */}
          {error && (
            <FormMessage className="text-red-500 mt-1">{error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};

export default DateTimeInput;
