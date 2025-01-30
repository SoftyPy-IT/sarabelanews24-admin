/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { Form } from "@/components/ui/form";
import SelectInput from "@/utils/Form_Inputs/SelectInput";
import { useGetAllFolderQuery } from "@/redux/dailynews/folder.api";
import { useGetAllImagesQuery } from "@/redux/dailynews/images.api";

interface RecentProps {
  onImageSelect: (images: any[]) => void;
}

const Recent: React.FC<RecentProps> = ({ onImageSelect }) => {
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const { data: folders, isLoading: foldersLoading } = useGetAllFolderQuery({});
  const { data: allImages, isLoading: imagesLoading } = useGetAllImagesQuery(
    {}
  );

  // Filter images based on selected folder
  const filteredImages = selectedFolder
    ? allImages?.filter((img: any) => img.folderId === selectedFolder)
    : allImages;

  const handleCheckboxChange = (image: any, checked: boolean) => {
    setSelectedImages((prev) =>
      checked ? [...prev, image] : prev.filter((img) => img._id !== image._id)
    );
  };
  const form = useForm({
    defaultValues: { img_type: "" },
  });

  return (
    <>
      <div className="text-gray-900">
        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 p-1 my-4">
          {filteredImages?.map((row: any) => (
            <div key={row._id} className="relative group">
              <Image
                src={row.url}
                className={`w-full h-full rounded shadow-sm bg-gray-500 aspect-square cursor-pointer ${
                  selectedImages.includes(row._id) ? "ring-4 ring-blue-500" : ""
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
                  checked={selectedImages.some((img) => img._id === row._id)}
                  onChange={(e) => handleCheckboxChange(row, e.target.checked)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Button */}
      <div className="flex justify-end">
        <Button
          className="bg-green-500"
          onClick={() => onImageSelect(selectedImages)}          
        >
          Upload
        </Button>
      </div>
    </>
  );
};

export default Recent;
