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
import { Input } from "@/components/ui/input";

const TopBar = () => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [dragOver, setDragOver] = React.useState(false);

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

  const handleButtonClick = () => {
    // Trigger the file input click programmatically
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("File selected:", file);
      // Add upload logic here
    }
  };


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
      <div className="flex justify-between items-center content-center bg-white p-2 border shadow-sm mb-5 gap-2 md:gap-0 ">
        <div className="space-y-2">
          <h2 className="text-sm md:text-3xl pl-2 font-semibold">
            Folder Image
          </h2>
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
            <Button className="">
              + Add Image
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="pt-20">
            <SheetHeader>
              <SheetTitle className="text-center">Add Image</SheetTitle>
              <hr />
            </SheetHeader>
            <Form {...form}>
              <div className="space-y-5">
               
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
                {/* </div> */}
              </div>
              <div className="mt-4 flex justify-end ">
                <Button className="mt-4 bg-green-500">Upload</Button>
              </div>
            </Form>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default TopBar;
