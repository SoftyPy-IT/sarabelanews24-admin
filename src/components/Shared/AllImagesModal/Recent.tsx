/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { Form } from "@/components/ui/form";
import SelectInput from "@/utils/Form_Inputs/SelectInput";
import { useGetAllFolderQuery } from "@/redux/dailynews/folder.api";
import {
  useGetAllImagesQuery,
  useGetImagesByFolderQuery,
} from "@/redux/dailynews/images.api";
import { TQueryParam } from "@/types/api.types";

interface RecentProps {
  onImageSelect: (images: any[]) => void; // Add this prop
  onClose: () => void;
}

const Recent: React.FC<RecentProps> = ({ onImageSelect, onClose }) => {
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const { data: folders, isLoading: foldersLoading } = useGetAllFolderQuery({});

  const [params, setParams] = useState<TQueryParam[]>([]);
  const {
    data: allImages,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllImagesQuery([...params]) as any;

  const handleFolderChange = (value: any) => {
    setParams([{ name: "folder", value: value }]);
  };

  const handleCheckboxChange = (image: any, checked: boolean) => {
    setSelectedImages((prev) =>
      checked ? [...prev, image] : prev.filter((img) => img._id !== image._id)
    );
  };

  // const handleUpload = () => {
  //   onImageSelect(selectedImages);
  //   onClose();
  // };

  const handleUpload = () => {
    onImageSelect(selectedImages);
    onClose();
  };
  


  type Inputs = {
    folder: string;
  };

  const form = useForm<Inputs>({
    defaultValues: {
      folder: "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})}>
          <div className="text-gray-900">
            <div className="w-full mt-5 flex justify-end items-center gap-2">
              <div className="w-[400px]">
                <SelectInput
                  control={form.control}
                  name="folder"
                  placeholder="Select From Folder"
                  options={
                    folders?.map((folder: { name: string; _id: string }) => ({
                      label: folder.name,
                      value: folder._id,
                    })) || []
                  }
                  onValueChange={handleFolderChange}
                />
              </div>
            </div>

            {!selectedFolder && (
              <div className="text-center text-gray-500 my-4">
                Please select a folder to view images.
              </div>
            )}

            {selectedFolder || !selectedFolder ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 p-1 my-4">
                {allImages?.data?.map((row: any) => (
                  <div key={row._id} className="relative group">
                    <Image
                      src={row.url}
                      className={`w-full h-full rounded shadow-sm bg-gray-500 aspect-square cursor-pointer ${
                        selectedImages.some((img) => img._id === row._id)
                          ? "ring-4 ring-blue-500"
                          : ""
                      }`}
                      alt={`Image ${row._id}`}
                      width={100}
                      height={100}
                    />
                    <div
                      className={`absolute top-1 right-1 text-white rounded-full transition ${
                        selectedImages.some((img) => img._id === row._id)
                          ? "opacity-100"
                          : "opacity-0"
                      } group-hover:opacity-100`}
                    >
                      <input
                        type="checkbox"
                        className="w-5 h-5 cursor-pointer"
                        checked={selectedImages.some(
                          (img) => img._id === row._id
                        )}
                        onChange={(e) =>
                          handleCheckboxChange(row, e.target.checked)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 my-4">
                No images found for the selected folder.
              </div>
            )}
          </div>

          <div className="flex justify-end">
          <Button 
        className="bg-green-500" 
        onClick={handleUpload}
        disabled={selectedImages.length === 0}
      >
        Upload
      </Button>
            {/* <Button className="bg-green-500" onClick={handleUpload}>
              Upload
            </Button> */}
          </div>
        </form>
      </Form>
    </>
  );
};

export default Recent;
