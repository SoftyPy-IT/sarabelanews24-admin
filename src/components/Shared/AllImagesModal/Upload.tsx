/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import React from "react";
import SelectInput from "@/utils/Form_Inputs/SelectInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import upload from "@public/assets/images/product-01.png";
import FileInput from "@/utils/Form_Inputs/FileInput";
import { useGetAllFolderQuery } from "@/redux/dailynews/folder.api";
import { useCreateImagesMutation } from "@/redux/dailynews/images.api";
import toast from "react-hot-toast";

interface FileWithPreview {
  file: File;
  preview: string;
}

const Upload = () => {
  // const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  // const [dragOver, setDragOver] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<FileWithPreview[]>(
    []
  );

  const { data, isLoading, isError } = useGetAllFolderQuery({});
  React.useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [selectedFiles]);

  const [createImages] = useCreateImagesMutation();
  const [sheetOpen, setSheetOpen] = React.useState(false);

  // const handleButtonClick = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     console.log("File selected:", file);
  //   }
  // };

  // Cleanup object URLs
  React.useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [selectedFiles]);

  const onSubmit = async (data: Inputs) => {
    // const toastId = toast.loading("Uploading images...");
    const formData = new FormData();

    if (!data.images || data.images.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    try {
      data.images.forEach((fileWithPreview: FileWithPreview) => {
        formData.append("images", fileWithPreview.file);
      });
      formData.append("folder", data.folder);

      const result = await createImages(formData).unwrap();

      toast.success(result.message || "Images Uploaded Successfully!");

      // Reset form and close sheet
      form.reset();
      setSheetOpen(false);
      // onOpenChange(false);
    } catch (err: any) {
      const errorMessage =
        err.data?.message || err.data?.errorMessages?.[0] || "Upload failed";
      toast.error(errorMessage);
    }
  };

  type Inputs = {
    folder: string;
    images: FileWithPreview[];
  };

  const form = useForm<Inputs>({
    defaultValues: {
      folder: "",
      images: [],
    },
  });

  // const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   setDragOver(true);
  // };

  // const handleDragLeave = () => {
  //   setDragOver(false);
  // };

  // const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   setDragOver(false);
  //   const file = event.dataTransfer.files?.[0];
  //   if (file) {
  //     console.log("File dropped:", file);
  //   }
  // };
  return (
    <>
      <Form {...form}>
        <div className="space-y-5 ">
          <div className="w-full mt-5 flex justify-end gap-2 ">
            <div className="w-[500px]">
              <SelectInput
                control={form.control}
                name="folder"
                placeholder="Select Folder"
                options={
                  data?.map((program: { name: string; _id: string }) => ({
                    label: program.name,
                    value: program._id,
                  })) || []
                }
                rules={{ required: "Please Select Folder" }}
              />
            </div>
          </div>
          <FileInput
            control={form.control}
            name="images"
            label="Upload Images"
            accept="image/*"
            multiple
            maxFiles={10}
          />
        </div>
        <div className="mt-4 flex justify-end ">
          <Button className="mt-4 bg-green-500">Upload</Button>
        </div>
      </Form>
    </>
  );
};

export default Upload;
