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
import AddFolderModal from "../../folder/_components/AddFolderModal";
import { useGetAllFolderQuery } from "@/redux/dailynews/folder.api";
import Loading from "@/app/loading";

interface FileWithPreview {
  file: File;
  preview: string;
}

const TopBar = () => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [dragOver, setDragOver] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<FileWithPreview[]>([]);
  const { data, isLoading, isError } = useGetAllFolderQuery({});

  // Cleanup object URLs
  React.useEffect(() => {
    return () => {
      selectedFiles.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [selectedFiles]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  // type Inputs = {
  //   // ... (keep your existing form types)
  // };

  const form = useForm<Inputs>({
    // ... (keep your existing form setup)
  });

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    const files = event.dataTransfer.files;
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {/* Existing TopBar JSX remains unchanged */}

      <Sheet>
        <SheetTrigger asChild>
          <Button>+ Add Image</Button>
        </SheetTrigger>
        <SheetContent side="right" className="pt-20" style={{ maxWidth: "500px" }}>
          <SheetHeader>
            <SheetTitle className="text-center">Add Image</SheetTitle>
            <hr />
          </SheetHeader>
          <Form {...form}>
            <div className="space-y-5">
              {/* Folder selection and creation UI remains unchanged */}

              <div
                className={`flex flex-col items-center justify-center border-dashed border-2 rounded-xl p-6 my-4 space-y-4 ${
                  dragOver ? "border-green-500 bg-green-50" : "border-gray-300"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Image src={upload} alt="Upload Placeholder" className="h-32 w-32" />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                />
                <Button onClick={handleButtonClick}>Browse</Button>
                <h3>or drag images here</h3>
              </div>

              {/* Image previews grid */}
              {selectedFiles.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {selectedFiles.map((fileWithPreview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={fileWithPreview.preview}
                        alt={`Preview ${index}`}
                        className="w-full h-32 object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-end ">
              <Button className="mt-4 bg-green-500">Upload</Button>
            </div>
          </Form>
        </SheetContent>
      </Sheet>
      <AddFolderModal isOpen={open} onOpenChange={setOpen} />
    </>
  );
};

export default TopBar;










