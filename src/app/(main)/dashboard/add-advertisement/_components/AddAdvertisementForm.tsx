"use client";

import AllImgModal from "@/components/Shared/AllImagesModal/AllImgModal";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import TextInput from "@/utils/Form_Inputs/TextInput";
import { ImageUpIcon } from "lucide-react";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCreateAdvertisementMutation } from "@/redux/dailynews/advertisement.api";
import DateTimeInput from "@/utils/Form_Inputs/DateTimeInput";
import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

type Inputs = {
  scheduleAdvertisements: string;
  advertisementImage: string;
  advertisementLink: string;
  adminName: string;
  displayLocation: string;
};

const AddAdvertisementForm = () => {
  const [createAdvertisement] = useCreateAdvertisementMutation();
  // const router = useRouter();

  const form = useForm<Inputs>({
    defaultValues: {
      scheduleAdvertisements: "",
      advertisementImage: "",
      advertisementLink: "",
      adminName: "",
      displayLocation: "popup",
    },
  });
  // const form = useForm<Inputs>({
  //   defaultValues: {
  //     advertisementLink: "",
  //     popup: "popup", // Set a default value corresponding to a radio item value
  //   },
  // });

  // Handle form submission
  // const onSubmit = async (data: Inputs) => {

  //   try {
  //     const res = await createAdvertisement(data).unwrap();
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   console.log(data);
  // };

  const onSubmit = async (data: Inputs) => {
    // Transforming the data to match your desired output
    const transformedData = {
      advertisementLink: data.advertisementLink,
      displayLocation: data.displayLocation, 
      visibility: {
        popup: data.displayLocation === "popup",
        header: data.displayLocation === "header",
        firstPage: data.displayLocation === "first-page",
        categoryPage: data.displayLocation === "category-page",
        detailsPage: data.displayLocation === "details-page",
      },
    };

    try {
      const res = await createAdvertisement(transformedData).unwrap();
      toast.success("Advertisement created Successfully!");
      if (res.success) {
        toast.success("Advertisement created Successfully!");
        // router.push("/dashboard/list-advertisement");
      }
      // router.push("/dashboard/list-advertisement");
    } catch (error) {
      console.error(error);
    }

    // try {
    //   const res = await createAdvertisement(transformedData).unwrap();
    //   if (res.success) {
    //     toast.success("Advertisement created successfully!", {
    //       position: "top-right",
    //       duration: 5000, // Toast visible for 5 seconds
    //     });
    //     router.push("/dashboard/list-advertisement");
    //   }
    // }  catch (error) {
    //   console.log(error);
    // }

    console.log(transformedData);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white border border-black p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Add New Advertisement
          </h2>
          <p className="text-gray-600">
            Upload an image and provide additional details for your
            advertisement.
          </p>
        </div>

        <Form {...form}>
          <div className="space-y-8">
            {/* Image Upload Section */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    title="Please Add Image"
                    variant="outline"
                    className="group p-8 hover:bg-blue-50 hover:border-blue-200 rounded-2xl transition-all duration-200"
                    name="advertisementImage"
                  >
                    <ImageUpIcon className="w-8 h-8 text-blue-500" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" style={{ maxWidth: "800px" }}>
                  <SheetTitle className="text-xl font-semibold mb-6">
                    Select Advertisement Image
                  </SheetTitle>
                  <AllImgModal />
                </SheetContent>
              </Sheet>
            </div>

            {/* Additional Link Section */}
            <div className="space-y-2">
              <h3 className="text-base font-medium text-gray-700">
                Advertisement Link
              </h3>
              <TextInput
                control={form.control}
                name="advertisementLink"
                placeholder="Enter the advertisement URL"
                rules={{
                  required: "Additional Link is required",
                  pattern: {
                    value:
                      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                    message: "Please enter a valid URL",
                  },
                }}
              />
            </div>

            {/* Popup Option Section */}
            <div>
              <h1 className="text-blue-500 font-semibold my-2">
                কোথায় দৃশ্যমান করবেন ?
              </h1>
              <Controller
                name="displayLocation"
                control={form.control}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                    className="grid lg:grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="popup" id="popup" />
                      <Label htmlFor="popup">
                        ওয়েবসাইট পপ-আপ হিসাবে রাখবেন ?
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="header" id="header" />
                      <Label htmlFor="header">ওয়েবসাইট হেডার রাখবেন ?</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="first-page" id="first-page" />
                      <Label htmlFor="first-page">প্রথম পৃষ্ঠায় রাখবেন ?</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="category-page"
                        id="category-page"
                      />
                      <Label htmlFor="category-page">
                        ক্যাটাগরি পৃষ্ঠায় রাখবেন ?
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="details-page" id="details-page" />
                      <Label htmlFor="details-page">
                        বিস্তারিত পৃষ্ঠায় রাখবেন ?
                      </Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>
            <hr />
            <div>
              <h3 className="text-base font-medium text-gray-700">
                Schedule Advertisement
              </h3>
              <DateTimeInput
                control={form.control}
                type="datetime-local"
                name="scheduleAdvertisements"
                rules={{
                  required: "Schedule Advertisement date and time is required",
                }}
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-medium text-gray-700">
                Admin Name
              </h3>
              <TextInput
                control={form.control}
                name="adminName"
                placeholder="Enter the Admin Name"
                rules={{
                  required: "Admin Name is Required",
                }}
              />
            </div>
            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="default"
                onClick={form.handleSubmit(onSubmit)}
                className="w-full sm:w-auto px-8 py-2.5  hover:bg-blue-700 text-white font-medium transition-colors "
              >
                Create Advertisement
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddAdvertisementForm;
