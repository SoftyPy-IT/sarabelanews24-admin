"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import SelectInput from "@/utils/Form_Inputs/SelectInput";
import { Input } from "@/components/ui/input";

const TopBar = () => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  type Inputs = {
    reporterType: string;
    reporterName: string;
    newsArea: string;
    reportedDateAndTime: string;
    selectedImage: string;
    photoJournalistName: string;
    admin_type: string;
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
      admin_type: "",
      publishedDate: "",
      newsTitle: "",
      description: "",
      newsTags: [""],
    },
  });

  return (
    <>
      <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-lg border shadow-sm mb-5 gap-4 md:gap-8">
        {/* Header Section */}
        <div className="space-y-2 flex-1">
          <h2 className="text-lg md:text-3xl pl-2 font-semibold text-gray-900">
            All Users
          </h2>
        </div>

        {/* Create User Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button className="w-full sm:w-auto text-white hover:bg-blue-600">
              Create User
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="pt-12 px-6">
            <SheetHeader>
              <SheetTitle className="text-center text-xl font-semibold">
                Create User
              </SheetTitle>
              <hr className="my-4" />
            </SheetHeader>
            <Form {...form}>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-700">Name:</h3>
                  <Input placeholder="Name" className="mt-2" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Email:</h3>
                  <Input placeholder="Email" className="mt-2" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Role:</h3>
                  <SelectInput
                    control={form.control}
                    name="admin_type"
                    placeholder="Select Role"
                    options={[
                      { label: "Admin", value: "admin" },
                      { label: "Moderator", value: "moderator" },
                      {
                        label: "Senior Journalist",
                        value: "senior-journalist",
                      },
                      { label: "Journalist", value: "journalist" },
                      { label: "User", value: "user" },
                    ]}
                  />
                </div>

                <div className="flex justify-end my-6">
                  <Button
                    onClick={handleButtonClick}
                    className=" text-white hover:bg-green-600"
                  >
                    Create User
                  </Button>
                </div>
              </div>
            </Form>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default TopBar;
