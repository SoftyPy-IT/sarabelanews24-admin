"use client";
import Image from 'next/image';
import React from 'react';
import SelectInput from '@/utils/Form_Inputs/SelectInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import upload from "@public/assets/images/product-01.png";

const Upload = () => {
      const fileInputRef = React.useRef<HTMLInputElement | null>(null);
      const [dragOver, setDragOver] = React.useState(false);
    
      const handleButtonClick = () => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      };
    
      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          console.log("File selected:", file);
        }
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
        const file = event.dataTransfer.files?.[0];
        if (file) {
          console.log("File dropped:", file);
        }
      };
    return (
        <>
         <Form {...form}>
              <div className="space-y-5">
                <div className="w-full mt-5 flex justify-end gap-2">
                  <div className="w-[400px]">
                    <SelectInput
                      control={form.control}
                      name="img_type"
                      placeholder="Select Folder"
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

                <div
                  className={`flex flex-col items-center justify-center border-dashed border-2 rounded-xl p-6 my-4 space-y-4 ${
                    dragOver
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Image
                    src={upload}
                    alt="Upload Placeholder"
                    className="h-32 w-32"
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Button onClick={handleButtonClick}>Browse</Button>
                  <h3>or drag an image here</h3>
                </div>
               
              </div>
              <div className="mt-4 flex justify-end ">
              <Button className="mt-4 bg-green-500">Upload</Button>
              </div>
            </Form>   
        </>
    );
};

export default Upload;