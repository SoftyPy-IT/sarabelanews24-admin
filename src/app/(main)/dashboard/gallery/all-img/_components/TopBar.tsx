/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import upload from "@public/assets/images/upload.webp";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import SelectInput from "@/utils/Form_Inputs/SelectInput";
// import CreateFolderModal from "./CreateFolderModal";
import { Input } from "@/components/ui/input";
import AddFolderModal from "../../folder/_components/AddFolderModal";
import { useGetAllFolderQuery } from "@/redux/dailynews/folder.api";
import Loading from "@/app/loading";
import FileInput from "@/utils/Form_Inputs/FileInput";
import { useCreateImagesMutation } from "@/redux/dailynews/images.api";
import toast from "react-hot-toast";

interface FileWithPreview {
  file: File;
  preview: string;
}
export type TProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const TopBar = ({ isOpen, onOpenChange }: TProps) => {
  const [open, setOpen] = React.useState(false);
  const [dragOver, setDragOver] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<FileWithPreview[]>(
    []
  );
  const [createImages] = useCreateImagesMutation();
  const { data, isLoading, isError } = useGetAllFolderQuery({});

  // Cleanup object URLs
  React.useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [selectedFiles]);

  // const handleButtonClick = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // };

  // const onSubmit = async (data: Inputs) => {
  //   console.log(data)
  //   try {
  //     const res = await createImages(data).unwrap();
  //     console.log("response:", res);

  //     if (res) {
  //       toast.success("Image Upload Successfully!");
  //       // router.push("/dashboard/list-news");
  //     }
  //     form.reset();
  //     onOpenChange(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // -----------------------

  // axios
  // ---------------
  // const onSubmit = async (data: any) => {
  //   const toastId = toast.loading('Uploading images...');
  //   const formData = new FormData();
  //   if (Array.isArray(data.images) && data.images.length > 0) {
  //     data.images.forEach((file: File) => {
  //       formData.append('images', file);
  //     });
  //   } else {
  //     toast.error('Please select at least one image');
  //     return;
  //   }
  //   formData.append('folder', data.folder);
  //   try {
  //     const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/gallery/upload`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization:token
  //       },
  //     });
  //     toast.success(res.data.message || 'Images uploaded successfully!', {
  //       id: toastId,
  //     });
  //   } catch (error: any) {
  //     toast.error(
  //       error.response?.data?.message || error.message || 'An error occurred',
  //       { id: toastId },
  //     );
  //   }
  // };
  // --------------------------

  // redux
  // const onSubmit = async (data: any) => {
  //   const toastId = toast.loading("Uploading images...");
  //   const formData = new FormData();
  //   if (Array.isArray(data.images) && data.images.length > 0) {
  //     data.images.forEach((file: File) => {
  //       formData.append("images", file);
  //     });
  //   } else {
  //     toast.error("Please select at least one image");
  //     return;
  //   }
  //   formData.append("folder", data.folder);
  //   try {
  //     const res = await createImages(formData).unwrap();
  //     console.log("response image upload", res);
  //     toast.success(res.message || "Images uploaded successfully!", {
  //       id: toastId,
  //     });
  //   } catch (err: any) {
  //     toast.error(err?.data?.message || err.message || "An error occurred", {
  //       id: toastId,
  //     });
  //   }
  // };

  const onSubmit = async (data: any) => {
    // const toastId = toast.loading("Uploading images...");
    const formData = new FormData();

    if (!data.images || data.images.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    try {
      // Append files to FormData
      data.images.forEach((file: File) => {
        formData.append("images", file);
      });
      formData.append("folder", data.folder);

      const result = await createImages(formData).unwrap();

      if (result) {
        toast.success(result.message || "Images Uploaded Successfully!");
       
      }
    } catch (err: any) {
      // Handle error
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

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex justify-between items-center content-center bg-white p-2 border rounded shadow-sm mb-5 gap-2 md:gap-0 ">
        <div className="space-y-2">
          <h2 className="text-sm md:text-3xl pl-2 font-semibold">All Images</h2>
        </div>

        <div>
          <div className="relative flex-grow">
            <div className="absolute p-3">
              <Search className="h-4 md:h-5 w-4 md:w-5" />
            </div>
            <Input
              placeholder="Search..."
              className="pl-10 py-3 w-[300px] border  focus:ring-1 rounded"
            />
          </div>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="">+ Add Image</Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="pt-4 overflow-y-auto"
            style={{ maxWidth: "500px" }}
          >
            <SheetHeader>
              <SheetTitle className="text-center">Add Image</SheetTitle>
              <hr />
            </SheetHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-5 ">
                  <div className="w-full mt-5 flex items-center gap-2">
                    <div className="w-[400px]">
                      <SelectInput
                        control={form.control}
                        name="folder"
                        placeholder="Select From Folder"
                        options={
                          data?.map(
                            (program: { name: string; _id: string }) => ({
                              label: program.name,
                              value: program._id,
                            })
                          ) || []
                        }
                        rules={{ required: "Please Select Folder" }}
                        // options={[
                        //   { label: "Folder1", value: "Folder1" },
                        //   { label: "Folder1", value: "Folder2" },
                        //   { label: "Folder1", value: "Folder3" },
                        //   { label: "Folder1", value: "Folder4" },
                        //   { label: "Folder1", value: "Folder5" },
                        // ]}
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
                    maxFiles={10}
                  />
                </div>

                <div className="mt-4 flex justify-end ">
                  <Button className="mt-4 bg-green-500" type="submit">
                    Upload
                  </Button>
                </div>
              </form>
            </Form>
          </SheetContent>
        </Sheet>
      </div>
      <AddFolderModal isOpen={open} onOpenChange={setOpen} />
    </>
  );
};

export default TopBar;
