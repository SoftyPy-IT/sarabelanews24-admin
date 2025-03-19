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
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import SelectInput from "@/utils/Form_Inputs/SelectInput";
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

// export type TProps = {
//   isOpen: boolean;
//   onOpenChange: (isOpen: boolean) => void;
//   setIsOpen: (isOpen: boolean) => void;
// };

const TopBar = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<FileWithPreview[]>(
    []
  );
  const [createImages] = useCreateImagesMutation();
  const { data, isLoading, isError } = useGetAllFolderQuery({});
  const [sheetOpen, setSheetOpen] = React.useState(false);

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

      toast.success(result.message || "Images Uploaded Successfully!", {
        id: toastId,
        duration: 3000,
      });

      form.reset();
      setSheetOpen(false);
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-between items-center content-center bg-white p-2 border rounded shadow-sm mb-5 gap-2 md:gap-0 ">
        <div className="space-y-2">
          <h2 className="text-sm md:text-3xl pl-2 font-semibold">All Images</h2>
        </div>

        <div className="hidden lg:flex">
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

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button onClick={() => setSheetOpen(true)}>+ Add Image</Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="pt-4 overflow-auto"
            style={{ maxWidth: "500px" }}
          >
            <SheetHeader>
              <SheetTitle className="text-center">Add Image</SheetTitle>
              <hr />
            </SheetHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-5">
                  <div className="w-full mt-5 lg:flex items-center gap-2">
                    <div className="lg:w-[400px]">
                      <SelectInput
                        control={form.control}
                        name="folder"
                        placeholder="Select Folder"
                        options={
                          data?.map(
                            (program: { name: string; _id: string }) => ({
                              label: program.name,
                              value: program._id,
                            })
                          ) || []
                        }
                      />
                    </div>
                    <h1 className="text-center">OR</h1>
<div className="flex justify-center ">
                    <Button className="lg:h-[46px] " onClick={() => setOpen(true)}>
                      Create New Folder
                    </Button>
                    </div>
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
