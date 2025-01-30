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
import AddFolderModal from "@/app/(main)/dashboard/gallery/folder/_components/AddFolderModal";

interface FileWithPreview {
  file: File;
  preview: string;
}

const Upload = ({ onSuccess }: { onSuccess: () => void }) => {
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
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
     return () => {
       selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
     };
   }, [selectedFiles]);

  const onSubmit = async (data: Inputs) => {
    const toastId = toast.loading("Uploading images...");
    const formData = new FormData();
    console.log(data);

    if (Array.isArray(data.images) && data.images.length > 0) {
      data.images.forEach((file: any) => {
        formData.append("images", file);
      });
    } else {
      toast.error("Please select at least one image");
      return;
    }

    formData.append("folder", data.folder);

    try {
      data.images.forEach((fileWithPreview: FileWithPreview) => {
        formData.append("images", fileWithPreview.file);
      });
      
      formData.append("folder", data.folder);
  

      const result = await createImages(formData).unwrap();

      toast.success(result.message || "Images Uploaded Successfully!", { id: toastId, duration: 3000 });

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
  const handleUploadSuccess = () => {
    // Your existing upload logic
    onSuccess(); // Close the sheet
  };
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <div className="w-full mt-5 flex items-center gap-2">
              <div className="w-[400px]">
                <SelectInput
                  control={form.control}
                  name="folder"
                  placeholder="Select From Folder"
                  options={
                    data?.map((program: { name: string; _id: string }) => ({
                      label: program.name,
                      value: program._id,
                    })) || []
                  }
                />
              </div>
              <h1>OR</h1>
              <Button className="h-[46px] " onClick={() => setOpen(true)}>
                Create New Folder
              </Button>
            </div>
            <FileInput
              control={form.control}
              name="images"
              label="Upload Images"
              accept="image/*"
              multiple
              maxFiles={20}
            />
          </div>
          {/* Image previews grid */}
          {selectedFiles.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {selectedFiles.map((fileWithPreview, index) => (
                <div key={index} className="relative group">
                  <Image
                    src={fileWithPreview.preview}
                    alt={`Preview ${index}`}
                    className="w-full h-32 object-cover rounded"
                    width={100}
                    height={100}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 flex justify-end ">
          <Button onClick={handleUploadSuccess}>Upload</Button>
           
          </div>
        </form>
      </Form>
      <AddFolderModal isOpen={open} onOpenChange={setOpen} />
    </>
  );
};

export default Upload;
