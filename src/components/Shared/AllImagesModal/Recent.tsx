"use client";
import React from 'react';
import Image from "next/image";
import img1 from "../../../assests/images/product-01.png";
import img2 from "../../../assests/images/product-02.png";
import img3 from "../../../assests/images/product-03.png";
import img4 from "../../../assests/images/product-04.png";
import img5 from "../../../assests/images/product-01.png";
import img6 from "../../../assests/images/product-02.png";
import img7 from "../../../assests/images/product-03.png";
import img8 from "../../../assests/images/product-04.png";
import img9 from "../../../assests/images/product-01.png";
import img10 from "../../../assests/images/product-01.png";
import img11 from "../../../assests/images/product-02.png";
import img12 from "../../../assests/images/product-03.png";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import SelectInput from "@/utils/Form_Inputs/SelectInput";

const initialImages = [
  { id: 1, image: img1.src },
  { id: 2, image: img2.src },
  { id: 3, image: img3.src },
  { id: 4, image: img4.src },
  { id: 5, image: img5.src },
  { id: 6, image: img6.src },
  { id: 7, image: img7.src },
  { id: 8, image: img8.src },
  { id: 9, image: img9.src },
  { id: 10, image: img10.src },
  { id: 11, image: img11.src },
  { id: 12, image: img12.src },
];

const Recent = () => {
    const [selectedImages, setSelectedImages] = React.useState<number[]>([]);

  const handleCheckboxChange = (id: number, checked: boolean) => {
    setSelectedImages((prev) =>
      checked ? [...prev, id] : prev.filter((imageId) => imageId !== id)
    );
  };

  type Inputs = {
    reporterType: string;
    reporterName: string;
    newsArea: string;
    reportedDateAndTime: string;
    selectedImage: string;
    photoJournalistName: string;
    img_type: string;
    publishedDate: string;
    newsTitle: string;
    description: string;
    newsTags: string[];
  };

  const form = useForm<Inputs>({
    defaultValues: {
      reporterType: "",
      reporterName: "",
      newsArea: "",
      reportedDateAndTime: "",
      photoJournalistName: "",
      img_type: "",
      publishedDate: "",
      newsTitle: "",
      description: "",
      newsTags: [""],
    },
  });
    return (
        <>
         <div className="text-gray-900">
          <Form {...form}>
            <div className="w-full mt-5 flex justify-end gap-2">
              <div className="w-[400px]">
                <SelectInput
                  control={form.control}
                  name="img_type"
                  placeholder="Select From Folder"
                  options={[
                    { label: "Folder1", value: "Folder1" },
                    { label: "Folder1", value: "Folder2" },
                    { label: "Folder1", value: "Folder3" },
                    { label: "Folder1", value: "Folder4" },
                    { label: "Folder1", value: "Folder5" },
                  ]}
                />
              </div>
             
            </div>
          </Form>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 p-1 md:p-1 my-4">
            {initialImages.map((row) => (
              <div key={row.id} className="relative group ">
                <Image
                  src={row.image}
                  className={`w-full h-full rounded shadow-sm bg-gray-500 aspect-square cursor-pointer ${
                    selectedImages.includes(row.id)
                      ? "ring-4 ring-blue-500"
                      : ""
                  }`}
                  alt={`Image ${row.id}`}
                  width={100}
                  height={100}
                />
                <div
                  className={`absolute top-1 right-1 text-white rounded-full transition ${
                    selectedImages.includes(row.id)
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 cursor-pointer"
                    checked={selectedImages.includes(row.id)}
                    onChange={(e) =>
                      handleCheckboxChange(row.id, e.target.checked)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="bg-green-500">Upload</Button>
        </div>   
        </>
    );
};

export default Recent;