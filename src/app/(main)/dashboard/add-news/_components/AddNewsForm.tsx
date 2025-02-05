/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import RichText from "@/utils/Form_Inputs/RichText";
import TextArea from "@/utils/Form_Inputs/TextArea";
import TextInput from "@/utils/Form_Inputs/TextInput";
import SelectInput from "@/utils/Form_Inputs/SelectInput";
import { Delete, ImageUpIcon, PlusIcon } from "lucide-react";
import DateTimeInput from "@/utils/Form_Inputs/DateTimeInput";
import { useCreateNewsMutation } from "@/redux/dailynews/news.api";
import AllImgModal from "@/components/Shared/AllImagesModal/AllImgModal";
import { useGetAllCategoriesQuery } from "@/redux/dailynews/category.api";
import SelectorWithSearch from "@/utils/Form_Inputs/SelectorWithSearch";
import TagSelector from "@/utils/Form_Inputs/TagSelector";
import RadioInput from "@/utils/Form_Inputs/RadioInput";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useState } from "react";
import MultiSelector from "@/utils/Form_Inputs/MultiSelector";
import {
  districtOption,
  divisionOption,
  newsTagOption,
  reporterTypeOption,
  upazilaOption,
} from "@/utils/options";
import toast from "react-hot-toast";
import NewsType from "@/utils/Form_Inputs/NewsType";
import Image from "next/image";

type Inputs = {
  reportedDate: string;
  reporterType: string;
  reporterName: string;
  currentNews: boolean;
  displayLocation: string;
  // firstPage: boolean;

  selectedImage: string;
  imageTagline: string;
  photojournalistName: string;
  internationalArea: string;
  division: string;
  district: string;
  upazila: string;
  newsTag: string;
  newsType: string;
  newsCategory: string;
  newsTitle: string;
  adminName: string;
  slug: string;
  category: string;
  publishedDate: string;
  shortDescription: string;
  description: string;
  // news_tags: string | string[];

  tags: {
    imageTagline: string;
    photojournalistName: string;
    selectedImage: string;
  }[];

  metaTitle: string;
  metaKeywords: string | string[];
  metaDescription: string;
};

type CourseFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
};

interface FileWithPreview {
  file: File;
  preview: string;
}

const AddNewsForm = ({ editingId, initialData }: CourseFormProps) => {
  const [mainSelectedFiles, setMainSelectedFiles] = React.useState<
    { url: string }[]
  >([]);

  const [tagSelectedFiles, setTagSelectedFiles] = React.useState<
    { url: string }[][]
  >([]);

  const [createNews] = useCreateNewsMutation({});
  const router = useRouter();
  const [firstPage, setFirstPage] = useState("");
  const [currentNews, setCurrentNews] = useState<boolean>(false);

  const { data, isLoading, isError } = useGetAllCategoriesQuery({});
  const [openSheetIndex, setOpenSheetIndex] = useState<number | null>(null);

  const form = useForm<Inputs>({
    defaultValues: {
      reportedDate: "",
      reporterType: "",
      reporterName: "",
      currentNews: true || false,
      displayLocation: "",
      selectedImage: "",
      imageTagline: "",
      photojournalistName: "",
      internationalArea: "",
      division: "",
      district: "",
      upazila: "",
      newsTag: "",
      newsType: "",
      newsCategory: "",
      newsTitle: "",
      adminName: "",
      slug: "",
      category: "",
      publishedDate: "",
      shortDescription: "",
      description: "",
      tags: [{ imageTagline: "", photojournalistName: "", selectedImage: "" }],
      metaTitle: "",
      metaKeywords: "",
      metaDescription: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  const appendField = () => {
    append({
      imageTagline: "",
      photojournalistName: "",
      selectedImage: "",
    });
    setTagSelectedFiles([...tagSelectedFiles, []]);
  };

  const handleImageSelect = (images: any[]) => {
    if (openSheetIndex === null) {
      setMainSelectedFiles(images.map((img) => ({ url: img.url })));
    } else {
      const newTagFiles = [...tagSelectedFiles];
      newTagFiles[openSheetIndex] = images.map((img) => ({ url: img.url }));
      setTagSelectedFiles(newTagFiles);
    }
  };

  const removeField = (index: number) => {
    remove(index);
    setTagSelectedFiles(tagSelectedFiles.filter((_, i) => i !== index));
  };

  const newsType = useWatch({
    control: form.control,
    name: "newsType",
  });

  if (isLoading) {
    return <h1>loading</h1>;
  }

  const onSubmit = async (data: Inputs) => {
    const modifyData = {
      ...data,
      category: data.category,
      postDate: new Date().toISOString(),
      images: mainSelectedFiles.map((item) => item.url),
    };
    // console.log("modify value:",modifyData);
    // console.log(data);

    try {
      const res = await createNews(modifyData).unwrap();
      // console.log("response:",res)
      if (res) {
        toast.success("News Create Successfully!");
        router.push("/dashboard/list-news");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <TopBar /> */}
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-4 xl:6">
              <div className="lg:col-span-8 col-span-full space-y-3">
                {/* Reporter Info Section */}
                <section className="bg-white border border-gray-300 rounded p-5">
                  <h1 className="mb-2 font-semibold  ">প্রতিনিধি তথ্য:</h1>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <SelectInput
                      control={form.control}
                      name="reporterType"
                      placeholder="প্রতিনিধি টাইপ নির্বাচন করুন"
                      options={reporterTypeOption}
                      rules={{ required: "Reporter type is required" }}
                    />

                    <DateTimeInput
                      control={form.control}
                      type="datetime-local"
                      name="reportedDate"
                      rules={{ required: "Reported date and time is required" }}
                    />

                    <div className="col-span-2">
                      <TextInput
                        control={form.control}
                        name="reporterName"
                        placeholder="প্রতিনিধি নাম"
                        rules={{ required: "Reporter name is required" }}
                      />
                    </div>
                  </div>
                </section>

                {/* news type and area */}
                <section className="bg-white border border-gray-300 rounded p-5">
                  <h1 className="mb-2 font-semibold  ">নিউজ টাইপ:</h1>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <SelectInput
                        control={form.control}
                        name="newsType"
                        placeholder="নিউজ টাইপ নির্বাচন করুন"
                        rules={{ required: "News Type is required" }}
                        options={[
                          { label: "Bangladesh", value: "Bangladesh" },
                          { label: "International", value: "International" },
                        ]}
                      />
                    </div>

                    {newsType === "Bangladesh" && (
                      <>
                        <h1 className="mb-1 font-semibold ">নিউজ এলাকা</h1>
                        <div className="col-span-2 grid grid-cols-1 lg:grid-cols-3 gap-4">
                          <SelectorWithSearch
                            name="division"
                            options={divisionOption}
                            label="বিভাগ নির্বাচন করুন"
                          />
                          <SelectorWithSearch
                            name="district"
                            options={districtOption}
                            label="জেলা নির্বাচন করুন"
                          />
                          <SelectorWithSearch
                            name="upazila"
                            options={upazilaOption}
                            label="উপজেলা নির্বাচন করুন"
                          />
                        </div>
                      </>
                    )}

                    {newsType === "International" && (
                      <>
                        <h1 className="mb-1 font-semibold ">নিউজ এলাকা</h1>
                        <div className="col-span-2">
                          <TextInput
                            control={form.control}
                            name="internationalArea"
                            placeholder="আন্তর্জাতিক এলাকা"
                            rules={{
                              required: "International area is required",
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </section>

                {/* News Info Section */}
                <section className="bg-white border border-gray-300 rounded p-5">
                  <h1 className="mb-2 font-semibold  ">সংবাদের তথ্য:</h1>
                  <div>
                    <Sheet>
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
                        <SheetTitle>সংবাদের তথ্য</SheetTitle>
                        <AllImgModal
                          onImageSelect={handleImageSelect}
                          onClose={() => setOpenSheetIndex(null)}
                        />
                      </SheetContent>
                    </Sheet>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-6 mb-4 ">
                    {mainSelectedFiles.map((file, index) => (
                      <div key={index} className="rounded-lg">
                        <Image
                          src={file.url}
                          alt={`Preview ${index}`}
                          width={100}
                          height={0}
                          className="h-[150px] w-[150px] rounded-lg"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <TextInput
                          control={form.control}
                          rules={{ required: "Photographer name is required" }}
                          name="photojournalistName"
                          placeholder="ফটো সাংবাদিক নাম"
                        />
                      </div>

                      <SelectInput
                        control={form.control}
                        name="category"
                        placeholder="নিউজ ক্যাটাগরি নির্বাচন করুন"
                        rules={{ required: "News Category is required" }}
                        options={
                          data?.categories?.map(
                            (program: { name: string; _id: string }) => ({
                              label: program.name,
                              value: program._id,
                            })
                          ) || []
                        }
                      />

                      <NewsType
                        form={form}
                        name="displayLocation"
                        className="mb-4"
                        setFirstPage={setFirstPage}
                      />
                    </div>

                    <div className="col-span-2">
                      <TextInput
                        control={form.control}
                        name="newsTitle"
                        placeholder="শিরোনাম"
                        rules={{ required: "News title is required" }}
                      />
                    </div>

                    <div className="col-span-2">
                      <TextArea
                        control={form.control}
                        name="shortDescription"
                        placeholder="সংক্ষিপ্ত বিবরণ"
                        rules={{ required: "Short Description is required" }}
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
                        {tagSelectedFiles[index]?.map((file, imgIndex) => (
                          <Image
                            key={imgIndex}
                            src={file.url}
                            alt={`Preview ${imgIndex}`}
                            width={130}
                            height={100}
                          />
                        ))}

                        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-0 gap-4">
                          <TextInput
                            control={form.control}
                            name="imageTagline"
                            placeholder="ইমেজ ট্যাগ লাইন"
                            rules={{ required: "Image Tag Line is required" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* news showing position */}
                <section className="bg-white border border-gray-300 rounded p-5">
                  <h1 className="mb-2 font-semibold">
                    কোথায় ট্যাগ করতে চাচ্ছেন ?
                  </h1>
                  <MultiSelector
                    name="newsTag"
                    placeholder="ট্যাগ নির্বাচন করুন"
                    options={newsTagOption}
                  />
                </section>

                <section className="bg-white border border-gray-300 rounded p-5">
                  <RadioInput
                    title={"ক্যারেন্ট নিউজ হিসেবে রাখতে চাচ্ছেন ?"}
                    name="currentNews"
                    value={currentNews}
                    onChange={(value: boolean) => setCurrentNews(value)}
                  />
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

                    <div className="grid grid-cols-1  gap-4">
                      <DateTimeInput
                        control={form.control}
                        name="publishedDate"
                        label="Publish Date"
                        type="datetime-local"
                        rules={{ required: "Post date is required" }}
                      />
                    </div>
                  </div>
                </section>

                {/* SEO Section */}
                <section className="bg-white border border-gray-300 rounded p-5">
                  <h1 className="mb-2 font-semibold ">SEO Section:</h1>
                  <CardContent className="space-y-5">
                    <TextInput
                      control={form.control}
                      name="metaTitle"
                      label="Meta Title"
                      type="text"
                      placeholder="Enter Meta Title"
                    />
                    <TextArea
                      control={form.control}
                      name="metaDescription"
                      label="Meta Description"
                      placeholder="Enter Meta Description"
                    />

                    <TagSelector
                      name="metaKeywords"
                      label="Meta Keywords"
                      defaultValues={initialData?.metaKeywords || []}
                    />
                  </CardContent>
                </section>
              </div>
            </div>

            {/* Submit Section */}
            <section className="my-4 flex justify-end">
              <Button type="submit" className="w-[400px] text-white ">
                Submit
              </Button>
            </section>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddNewsForm;
