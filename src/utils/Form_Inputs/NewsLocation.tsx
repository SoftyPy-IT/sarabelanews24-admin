/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import RadioInput from "@/utils/Form_Inputs/RadioInput"
import SelectInput from "@/utils/Form_Inputs/SelectInput"
import { type FieldValues, type Path, useWatch, type UseFormReturn } from "react-hook-form"
import React from "react"

interface NewsTypeProps<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
  className?: string
  setFirstPage: (value: string) => void
  rules?: Record<string, any>
}

const NewsLocation = <T extends FieldValues>({ form, name, className, setFirstPage, rules }: NewsTypeProps<T>) => {
  const selectedNewsType = useWatch({
    control: form.control,
    name,
  });

  console.log("NewsLocation name prop:", name);
  console.log("Selected newsLocation:", selectedNewsType);

  const firstPageValue = useWatch({
    control: form.control,
    name: "firstPage" as Path<T>,
  })

  // Convert string to boolean for the RadioInput component
  const firstPageBool = firstPageValue === "yes"

  const handleFirstPageChange = (value: boolean) => {
    // Update the parent component's state
    setFirstPage(value ? "yes" : "no")
    // Also make sure it's captured in the form data with explicit options
    form.setValue("firstPage" as Path<T>, (value ? "yes" : "no") as any, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
    console.log("firstPage updated to:", value ? "yes" : "no")
    console.log("Form values after update:", form.getValues())
  }

  React.useEffect(() => {
    if (selectedNewsType) {
      console.log("displayLocation selected:", selectedNewsType)
    }
  }, [selectedNewsType])

  return (
    <div className={className}>
      <SelectInput
        control={form.control}
        name={name}
        placeholder="কোথায় প্রদর্শন করতে চাচ্ছেন ?"
        rules={rules}
        options={[
          { label: "Lead-1", value: "Lead-1" },
          { label: "Lead-2", value: "Lead-2" },
          { label: "Lead-3", value: "Lead-3" },
        ]}
      />

      {selectedNewsType === "Lead-1" || selectedNewsType === "Lead-2" ? (
        <div className="mt-2">
          <RadioInput
            title="প্রথম পৃষ্ঠায় দেখবেন ?"
            name="firstPage"
            value={firstPageBool}
            onChange={handleFirstPageChange}
          />
        </div>
      ) : null}
    </div>
  )
}

export default NewsLocation; 
