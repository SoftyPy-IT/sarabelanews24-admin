/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import RichText from "@/utils/Form_Inputs/RichText";
import TextInput from "@/utils/Form_Inputs/TextInput";
import { Delete, ImageUpIcon, PlusIcon } from "lucide-react";
import AllImgModal from "@/components/Shared/AllImagesModal/AllImgModal";

import { useFieldArray, useForm } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import toast from "react-hot-toast";
import {
  useCreatePhotoNewsMutation,
  useGetSinglePhotoNewsQuery,
  useUpdatePhotoNewsMutation,
} from "@/redux/dailynews/photoNews.api";
import DateTimeInput from "@/utils/Form_Inputs/DateTimeInput";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import UpdateTopBar from "../../_components/UpdateTopBar";

type Inputs = {
  title: string;
  description: string;
  imgTagline: string;
  images: string | string[];
  tagImages: string | string[];
  selectedImage: string;
  adminName: string;
  tags: {
    imgTagline: string;
    tagImages?: string;
    selectedImage: string;
  }[];
  postDate: string;
};

type newsProps = {
  params: Promise<{ id: string }>;
};

const Update = ({ params }: newsProps) => {
  const { id } = use(params);
  const [updatePhotoNews] = useUpdatePhotoNewsMutation();
  const { data: singleData } = useGetSinglePhotoNewsQuery(id);

  const [mainSelectedFiles, setMainSelectedFiles] = React.useState<
    { url: string }[]
  >([]);
  const [tagSelectedFiles, setTagSelectedFiles] = React.useState<
    { url: string }[][]
  >([]);
  const [openSheetIndex, setOpenSheetIndex] = useState<number | null>(null);

  const router = useRouter(); 

  
  const handleImageSelect = (images: any[]) => {
    if (openSheetIndex === null) {
      const urls = images.map((img) => img.url);
      setMainSelectedFiles(images);
      form.setValue("selectedImage", urls[0] || "");
    } else {
      const newTagFiles = [...tagSelectedFiles];
      newTagFiles[openSheetIndex] = images;
      setTagSelectedFiles(newTagFiles);
      form.setValue(
        `tags.${openSheetIndex}.selectedImage`,
        images[0]?.url || ""
      );
    }
  };
  
  const form = useForm<Inputs>({
    defaultValues: {
      title: "",
      description: "",
      imgTagline: "",
      images: "",
      tagImages: "",
      adminName: "",
      postDate: "",
      selectedImage: "",
      tags: [{ imgTagline: "", selectedImage: "" }],
    },
  });

  useEffect(() => {
    if (singleData && Object.keys(singleData).length > 0) {
      const formatDate = (isoString: string) =>
        isoString ? isoString.slice(0, 16) : "";

      form.reset({
        title: singleData.title || "",
        imgTagline: singleData.imgTagline || "",
        tagImages: singleData.tagImages || "",
        adminName: singleData.adminName || "",
        postDate: formatDate(singleData.postDate),
        description: singleData.description || "",
        selectedImage: singleData.images?.[0] || "",
        tags: singleData.tags || [
          { imageTagline: "", tagImages: "", selectedImage: "" },
        ],
      });

      // Handle main images
      const images = singleData.images?.map((url: string) => ({ url })) || [];

      setMainSelectedFiles(images);


      

      // Handle tag images
      if (singleData.tagImages) {
        // Split the comma-separated string into an array of URLs
        const tagImagesArray: string[] = singleData.tagImages[0].split(",");
        // Convert each URL into the required format
        const formattedTagImages: { url: string }[][] = [
          tagImagesArray.map((url: string) => ({
            url: url.trim(),
          })),
        ];
        setTagSelectedFiles(formattedTagImages);
      }
    }
  }, [singleData, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  const appendField = () => {
    append({
      imgTagline: "",
      tagImages: "",
      selectedImage:""
    });
    setTagSelectedFiles([...tagSelectedFiles, []]);
  };

  const onSubmit = async (data: Inputs) => {
    const modifyData = {
      ...data,
      title: data.title,
      images: mainSelectedFiles.map((item) => item.url).join(","),
      tagImages: tagSelectedFiles
        .flat()
        .map((item) => item.url)
        .join(","),
    };
    console.log("modify value:", modifyData);
    console.log(data);

    try {
      const res = await updatePhotoNews({ ...modifyData, id }).unwrap();
      console.log("response:", res);
      if (res) {
        toast.success("News Update Successfully!");
        router.push("/dashboard/list-photo-news");
      }
    } catch (error) {
      console.error(error);
    }
  };

  


  const removeField = (index: number) => {
    remove(index);
    setTagSelectedFiles(tagSelectedFiles.filter((_, i) => i !== index));
  };

  return (
    <>
      <UpdateTopBar />
      <div>
        <Form {...form}>
          
            <div className="grid grid-cols-12 gap-4 xl:6">
              <div className="lg:col-span-8 col-span-full space-y-3">
                {/* News Info Section */}
                <section className="bg-white border border-gray-300 rounded p-5">
                  <h1 className="mb-2 font-semibold">সংবাদের তথ্য:</h1>
                  <div>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          className="p-8 border  rounded-full mb-5"
                        >
                          <ImageUpIcon color="red" size={50} /> Add Image
                        </Button>
                      </SheetTrigger>
                      <SheetContent
                        side="right"
                        style={{ maxWidth: "800px" }}
                        className="pt-4 overflow-y-auto"
                      >
                        <SheetTitle className="sr-only">
                          Image Selection Modal
                        </SheetTitle>
                        <AllImgModal
                          onImageSelect={handleImageSelect}
                          onClose={() => setOpenSheetIndex(null)}
                        />
                      </SheetContent>
                    </Sheet>
                  </div>

                  {mainSelectedFiles.map((file, index) => (
                    <Image
                      key={index}
                      src={file.url}
                      alt={`Preview ${index}`}
                      width={130}
                      height={100}
                    />
                  ))}
                  <div className="space-y-2">
                    <div className="col-span-2">
                      <TextInput
                        control={form.control}
                        name="title"
                        placeholder="শিরোনাম"
                        rules={{ required: "News title is required" }}
                      />
                    </div>

                    <div className="col-span-2">
                      <RichText
                        name="description"
                        placeholder={"বিস্তারিত বর্ণনা "}
                      />
                    </div>
                  </div>
                </section>
              </div>

              <div className="lg:col-span-4 col-span-full space-y-5">
                {/* Tags Section */}
                <section className="bg-white border border-gray-300 rounded p-5">
                  <h1 className="mb-2 font-semibold">সংবাদ ট্যাগ:</h1>
                  <div className="col-span-2">
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex flex-col space-y-3">
                        <div className="flex justify-between items-center gap-2 p-4">
                          <Sheet
                            key={field.id}
                            open={openSheetIndex === index}
                            onOpenChange={(open) =>
                              setOpenSheetIndex(open ? index : null)
                            }
                          >
                            <SheetTrigger asChild>
                              <Button
                                variant="outline"
                                className="p-8 border rounded-full mb-2"
                              >
                                <ImageUpIcon color="red" size={50} /> Add Image
                              </Button>
                            </SheetTrigger>
                            <SheetContent
                              side="right"
                              className="pt-4 overflow-y-auto"
                              style={{ maxWidth: "800px" }}
                            >
                              <SheetTitle>সংবাদ ট্যাগ</SheetTitle>
                              <AllImgModal
                                onImageSelect={(images: any) => {
                                  const newTagFiles = [...tagSelectedFiles];
                                  newTagFiles[index] = images;
                                  setTagSelectedFiles(newTagFiles);
                                }}
                                onClose={() => setOpenSheetIndex(null)}
                              />
                            </SheetContent>
                          </Sheet>

                          <div className="flex justify-end gap-2">
                            {fields.length > 1 && (
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeField(index)}
                              >
                                <Delete className="w-4 h-4" />
                              </Button>
                            )}
                            {index === fields.length - 1 && (
                              <Button
                                type="button"
                                variant="default"
                                size="sm"
                                onClick={appendField}
                              >
                                <PlusIcon className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Tag Image Display */}
                        <div className="grid grid-cols-3 gap-2">
                          {tagSelectedFiles[index]?.map((file, imgIndex) =>
                            file?.url ? ( // Only render Image if url exists
                              <Image
                                key={imgIndex}
                                src={file.url}
                                alt={`Preview ${imgIndex}`}
                                width={130}
                                height={100}
                                className="rounded-md"
                              />
                            ) : null
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-0 gap-4">
                          <TextInput
                            control={form.control}
                            name="imgTagline"
                            placeholder="ইমেজ ট্যাগ লাইন"
                            rules={{ required: "Image Tag Line is required" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Admin Section */}
                <section className="bg-white border border-gray-300 rounded p-5">
                  <h1 className="mb-2 font-semibold ">Admin Section:</h1>
                  <div className="col-span-2">
                    <div className="col-span-2">
                      <TextInput
                        control={form.control}
                        name="adminName"
                        placeholder="Admin Name"
                        rules={{ required: "Admin name is required" }}
                      />
                    </div>
                    <div className="grid grid-cols-1  gap-4 mt-2">
                      <DateTimeInput
                        control={form.control}
                        name="postDate"
                        label="Post Date"
                        type="datetime-local"
                        rules={{ required: "Post date is required" }}
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Submit Section */}
            <section className="my-4 flex justify-end">
              <Button type="submit" className="w-[400px] text-white " onClick={form.handleSubmit(onSubmit)}>
                Submit
              </Button>
            </section>
         
        </Form>
      </div>
    </>
  );
};

export default Update;
