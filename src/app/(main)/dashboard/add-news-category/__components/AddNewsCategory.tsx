"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import TextInput from "@/utils/Form_Inputs/TextInput";
import React from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  category_name: string;
};

const AddNewsCategory = () => {
  const form = useForm<Inputs>({
    defaultValues: {
      category_name: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: Inputs) => {
    console.log(data);
  };

  return (
    <div className="max-w-xl mx-auto">
      <Form {...form}>
        <div className="space-y-4 border p-6 bg-white">
          <h1 className="font-semibold text-blue-500 text-lg">Add New News Category :</h1>
          <div>
            <TextInput
              control={form.control}
              name="category_name"
              placeholder="Enter your category name"
              rules={{ required: "Category Name is required" }}
            />
          </div>

          {/* Submit Button */}
          <div>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              type="submit"
              variant="default"
              className="w-full sm:w-auto px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            >
              Create new category
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddNewsCategory;
