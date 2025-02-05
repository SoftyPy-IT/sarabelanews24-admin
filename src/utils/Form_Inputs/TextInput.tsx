/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { type Control, type FieldValues, type Path, useController } from "react-hook-form"

type TextInputProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label?: string
  type?: string
  placeholder?: string
  defaultValue?: T[Path<T>]
  disabled?: boolean
  rules?: Record<string, any>
}

const TextInput = <T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  defaultValue,
  disabled = false,
  rules,
}: TextInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController<T>({
    name,
    control,
    rules,
    defaultValue,
  })

  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-1 text-gray-700">
          {label}
        </label>
      )}
      <FormField
        control={control}
        name={name}
        render={() => (
          <FormItem>
            <FormControl className="bg-white">
              <Input id={name} type={type} placeholder={placeholder} disabled={disabled} {...field} />
            </FormControl>
            {error && <FormMessage className="text-red-500 mt-1">{error.message}</FormMessage>}
          </FormItem>
        )}
      />
    </div>
  )
}

export default TextInput

