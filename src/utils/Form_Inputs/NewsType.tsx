"use client";
import RadioInput from "@/utils/Form_Inputs/RadioInput";
import SelectInput from "@/utils/Form_Inputs/SelectInput";
import React, { useState } from "react";
import { Control, FieldValues, Path, useWatch } from "react-hook-form";

interface NewsTypeProps<T extends FieldValues> {
  form: { control: Control<T> };
  name: Path<T>;
  className?: string;
  setFirstPage: (value: string) => void;
}

const NewsType = <T extends FieldValues>({
  form,
  name,
  className,
}: NewsTypeProps<T>) => {
  const selectedNewsType = useWatch({
    control: form.control,
    name,
  });
  const [firstPage, setFirstPage] = useState<boolean>(false);

  return (
    <div className={className}>
      <SelectInput
        control={form.control}
        name={name}
        placeholder="কোথায় প্রদর্শন করতে চাচ্ছেন ?"
        rules={{ required: "News type is required" }}
        options={[
          { label: "Lead-1", value: "Lead-1" },
          { label: "Lead-2", value: "Lead-2" },
          { label: "Lead-3", value: "Lead-3" },
        ]}
      />

      {selectedNewsType === "Lead-1" || selectedNewsType === "Lead-2" ? (
        <div className="">
          <RadioInput
            title="প্রথম পৃষ্ঠায় দেখবেন ?"
            // name="currentNews"
            value={firstPage}
            // onChange={setCurrentNews}
            // onChange={(value) => {
            //   setFirstPage(value);
            // }}
            onChange={(value: boolean) => {
              setFirstPage(value);
            }}
          />
          {/* <RadioInput
            title="প্রথম পৃষ্ঠায় দেখবেন ?"
            onChange={(value) => {
              setFirstPage(value);
            }} */}
          {/* /> */}
        </div>
      ) : null}
    </div>
  );
};

export default NewsType;
