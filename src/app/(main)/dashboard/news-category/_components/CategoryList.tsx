/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  useDeleteNewsMutation,
  useGetAllNewsQuery,
} from "@/redux/dailynews/news.api";
import ActionDropdown from "@/utils/Action/ActionDropdown";
import { DataTable } from "@/utils/Table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Form } from "@/components/ui/form";
import { useCreateCategoriesMutation, useDeleteCategoriesMutation, useGetAllCategoriesQuery } from "@/redux/dailynews/category.api";
import TextInput from "@/utils/Form_Inputs/TextInput";
import React from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
};

const CategoryList = () => {
  const router = useRouter();

  // API call
  const { data, isLoading, isError } = useGetAllCategoriesQuery({});
  const [deleteCategories] = useDeleteCategoriesMutation();
  const [createCategories] = useCreateCategoriesMutation();

  const form = useForm<Inputs>({
    defaultValues: {
      name: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: Inputs) => {
    try {
      const res = await createCategories(data).unwrap();
      toast.success("Category created Successfully!");
      form.reset();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  

  const newsData =
    data?.categories?.map((item: any) => ({
      id: item._id,      
      category: item.name || "N/A",
    
    })) || []; 

  const handleEdit = (rowData: any) => {
    router.push(`/dashboard/list-news/update-details/${rowData.id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteCategories(id).unwrap();
          Swal.fire("Deleted!", "Your activity has been deleted.", "success");
        }
      });
    } catch (err: any) {
      console.error("Error deleting news:", err);
      toast.error(err.message || "Failed to delete news.");
    }
  };

  const handleView = (rowData: any) => {
    router.push(`/dashboard/list-news/view-details/${rowData.id}`);
  };

  const columns: ColumnDef<any, any>[] = [
    // {
    //   accessorKey: "id",
    //   header: () => <span className="font-bold">Sl No.</span>,
    // },
    {
      accessorKey: "category",
      header: () => <span className="font-bold">Category Name</span>,
    },
    {
      accessorKey: "Action",
      header: () => <span className="font-bold">Action</span>,
      cell: ({ row }: any) => (
        <ActionDropdown
          row={row}
          onView={handleView}
          onUpdate={handleEdit}
          onDelete={() => handleDelete(row.original.id)}
        />
      ),
    },
  ];

  return (
    <>
      <div className="overflow-x-auto bg-white py-5 px-8 w-[800px] mx-auto ">
        <Sheet>
          <SheetTrigger asChild>
            <div className=" flex justify-end">
              <Button variant="outline" className="bg-black text-white p-2 mb-4">
                + Add Category
              </Button>
            </div>
          </SheetTrigger>
          <SheetContent side="right" style={{ maxWidth: "400px" }}>
            <SheetTitle className="sr-only">Image Selection Modal</SheetTitle>
            <hr className="mt-8"/>
            <div className="mt-32">
            <Form {...form}>
              <div className="space-y-4 border border-gray-300 rounded p-6 bg-white ">
                <h1 className="font-semibold  text-lg">
                  Add New News Category :
                </h1>
                <div>
                  <TextInput
                    control={form.control}
                    name="name"
                    placeholder="Enter your category name"
                    rules={{ required: "Category Name is required" }}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button
                    onClick={form.handleSubmit(onSubmit)}
                    type="submit"
                    variant="default"
                    className="px-4 py-2.5  hover:bg-blue-700 text-white font-medium transition-colors"
                  >
                    Create new category
                  </Button>
                </div>
              </div>
            </Form>
            </div>
          </SheetContent>
        </Sheet>

        <DataTable
          columns={columns}
          data={newsData ?? []} 
          filterKey="category"
          filterPlaceholder="Search by Name"
          pageSize={10}
          // selectOptions={{
          //   key: "newsType",
          //   options: [
          //     { label: "Politics", value: "Politics" },
          //     { label: "Economy", value: "Economy" },
          //     { label: "Sports", value: "Sports" },
          //     { label: "Entertainment", value: "Entertainment" },
          //     { label: "Education", value: "Education" },
          //   ],
          //   placeholder: "Select News Type",
          // }}
        />
      </div>
    </>
  );
};

export default CategoryList;
