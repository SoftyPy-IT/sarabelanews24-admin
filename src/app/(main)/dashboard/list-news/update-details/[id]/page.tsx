/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import RichText from "@/utils/Form_Inputs/RichText";
import TextArea from "@/utils/Form_Inputs/TextArea";
import TextInput from "@/utils/Form_Inputs/TextInput";
import SelectInput from "@/utils/Form_Inputs/SelectInput";
import { CircleX, ImageUpIcon } from "lucide-react";
import DateTimeInput from "@/utils/Form_Inputs/DateTimeInput";
import {
  useGetSingleNewsQuery,
  useUpdateNewsMutation,
} from "@/redux/dailynews/news.api";
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
import React, { use, useEffect, useState } from "react";
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
import Loading from "@/app/loading";
import UpdateTopBar from "../../_components/UpdateTopBar";

type Inputs = {
  reportedDate: string;
  reporterType: string;
  reporterName: string;
  currentNews: boolean;
  displayLocation: string;
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
  // slug: string;
  category: string;
  publishedDate: string;
  shortDescription: string;
  description: string;
  tags: {
    imageTagline: string;
    photojournalistName: string;
    selectedImage: string;
  }[];
  metaTitle: string;
  metaKeywords: string | string[];
  metaDescription: string;
};

type newsProps = {
  params: Promise<{ id: string }>;
};

const Page = ({ params }: newsProps) => {
  const { id } = use(params);
  const { data, isLoading, isError } = useGetAllCategoriesQuery({});
  const router = useRouter();
  const [firstPage, setFirstPage] = useState("");
  const [currentNews, setCurrentNews] = useState<boolean>(false);

  const [updateNews] = useUpdateNewsMutation();

  const { data: singleData } = useGetSingleNewsQuery(id);

  const [mainSelectedFiles, setMainSelectedFiles] = React.useState<
    { url: string }[]
  >([]);

  const [tagSelectedFiles, setTagSelectedFiles] = React.useState<
    { url: string }[][]
  >([]);

  const [openSheetIndex, setOpenSheetIndex] = useState<number | null>(null);

  const form = useForm<Inputs>({
    defaultValues: {
      reportedDate: "",
      reporterType: "",
      reporterName: "",
      currentNews: false,
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
      // slug: "",
      category: "",
      publishedDate: "",
      shortDescription: "",
      description: "",
      tags: [{ imageTagline: "", photojournalistName: "", selectedImage: "" }],
      metaTitle: "",
      metaKeywords: [],
      metaDescription: "",
    },
  });

  useEffect(() => {
    // if (singleData && Object.keys(singleData).length > 0) {
    //   const formatDate = (isoString: string) =>
    //     isoString ? isoString.slice(0, 16) : "";
    if (singleData && Object.keys(singleData).length > 0) {
      const formatDate = (isoString: string) =>
        isoString ? isoString.slice(0, 16) : "";

      form.reset({
        reportedDate: formatDate(singleData.reportedDate),
        // reportedDate: singleData.reportedDate || "",
        reporterType: singleData.reporterType || "",
        reporterName: singleData.reporterName || "",
        currentNews: singleData.currentNews || false,
        displayLocation: singleData.displayLocation || "",
        selectedImage: singleData.images?.[0] || "",
        imageTagline: singleData.imageTagline || "",
        photojournalistName: singleData.photojournalistName || "",
        internationalArea: singleData.internationalArea || "",
        division: singleData.division || "",
        district: singleData.district || "",
        upazila: singleData.upazila || "",
        newsTag: singleData.newsTag || [],
        newsType: singleData.newsType || "",
        newsCategory: singleData.newsCategory || "",
        newsTitle: singleData.newsTitle || "",
        adminName: singleData.adminName || "",
        // slug: singleData.slug || "",
        category: singleData.category?._id || "",
        publishedDate: formatDate(singleData.publishedDate),
        shortDescription: singleData.shortDescription || "",
        description: singleData.description || "",

        tags: singleData.tags || [
          { imageTagline: "", photojournalistName: "", selectedImage: "" },
        ],
        metaTitle: singleData.metaTitle || "",
        metaKeywords: singleData.metaKeywords || [],
        metaDescription: singleData.metaDescription || "",
      });

      const mainImages =
        singleData.images?.map((url: string) => ({ url })) || [];
      setMainSelectedFiles(mainImages);

      // Initialize tag images from API
      const initialTagFiles =
        singleData.tags?.map((tag: any) =>
          tag.selectedImage ? [{ url: tag.selectedImage }] : []
        ) || [];
      setTagSelectedFiles(initialTagFiles);
    }
  }, [singleData, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  const newsType = useWatch({
    control: form.control,
    name: "newsType",
  });

  const onSubmit = async (data: Inputs) => {
    const modifyData = {
      ...data,
      
      category: data.category,
      postDate: new Date().toISOString(),
      images: mainSelectedFiles.map((item) => item.url),
    };
    console.log("modify value:", modifyData);
    console.log(data);

    try {
      const res = await updateNews({ ...modifyData, id }).unwrap();
      console.log("response:", res);
      if (res) {
        toast.success("News Update Successfully!");
        router.push("/dashboard/list-news");
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <UpdateTopBar />
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-4 xl:6">
              <div className="lg:col-span-8 col-span-full space-y-3">
                {/* Reporter Info Section */}
                <section className="bg-white border border-gray-300 rounded p-5">
                  <h1 className="mb-2 font-semibold">প্রতিনিধি তথ্য:</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <div>
                      <SelectInput
                        control={form.control}
                        name="reporterType"
                        placeholder="প্রতিনিধি টাইপ নির্বাচন করুন"
                        options={reporterTypeOption}
                      />
                    </div>
                    <div>
                      <DateTimeInput
                        control={form.control}
                        type="datetime-local"
                        name="reportedDate"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <TextInput
                        control={form.control}
                        name="reporterName"
                        placeholder="প্রতিনিধি নাম"
                      />
                    </div>
                  </div>
                </section>

                {/* News type and area */}
                <section className="bg-white border border-gray-300 rounded p-5">
                  <h1 className="mb-2 font-semibold">নিউজ টাইপ:</h1>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <SelectInput
                        control={form.control}
                        name="newsType"
                        placeholder="নিউজ টাইপ নির্বাচন করুন"
                        options={[
                          { label: "Bangladesh", value: "Bangladesh" },
                          { label: "International", value: "International" },
                        ]}
                      />
                    </div>
                    {newsType === "Bangladesh" && (
                      <>
                        <h1 className="mb-1 font-semibold">নিউজ এলাকা</h1>
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
                        <h1 className="mb-1 font-semibold">নিউজ এলাকা</h1>
                        <div className="col-span-2">
                          <TextInput
                            control={form.control}
                            name="internationalArea"
                            placeholder="আন্তর্জাতিক এলাকা"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </section>

                {/* News Info Section */}
                <section className="bg-white border border-gray-300 rounded p-5">
                  <h1 className="mb-2 font-semibold">সংবাদের তথ্য:</h1>
                  <div>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          className="p-8 border rounded-full mb-5"
                        >
                          <ImageUpIcon color="red" size={50} /> Add Image
                        </Button>
                      </SheetTrigger>
                      <SheetContent
                        side="right"
                        style={{ maxWidth: "800px" }}
                        className="overflow-auto"
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

                  <div className="flex flex-wrap gap-4 mb-3">
                    {mainSelectedFiles.map((file, index) => (
                      <div key={index} className="relative rounded-lg group">
                        <Image
                          src={file.url}
                          alt={`Preview ${index}`}
                          width={150}
                          height={150}
                          className="lg:h-[150px] lg:w-[150px] rounded-lg object-cover"
                        />
                        <button
                          onClick={() => {
                            setMainSelectedFiles((files) =>
                              files.filter((_, i) => i !== index)
                            );
                          }}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          <CircleX />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <TextInput
                          control={form.control}
                          name="photojournalistName"
                          placeholder="ফটো সাংবাদিক নাম"
                        />
                      </div>

                      <SelectInput
                        control={form.control}
                        name="category"
                        placeholder="নিউজ ক্যাটাগরি নির্বাচন করুন"
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
                      />
                    </div>
                    <div className="col-span-2">
                      <TextArea
                        control={form.control}
                        name="shortDescription"
                        placeholder="সংক্ষিপ্ত বিবরণ"
                      />
                    </div>
                    <div className="col-span-2">
                      <RichText
                        name="description"
                        // placeholder="বিস্তারিত বর্ণনা"
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
                    <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-0 gap-4">
                      <TextInput
                        control={form.control}
                        name="imageTagline"
                        placeholder="ইমেজ ট্যাগ লাইন"
                      />
                    </div>
                  </div>
                </section>

                {/* News showing position */}
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
                    title="ক্যারেন্ট নিউজ হিসেবে রাখতে চাচ্ছেন ?"
                    name="currentNews"
                    value={currentNews}
                    onChange={(value: boolean) => setCurrentNews(value)}
                  />
                </section>

                {/* Admin Section */}
                <section className="bg-white border border-gray-300 rounded p-5">
                  <h1 className="mb-2 font-semibold">Admin Section:</h1>
                  <div className="col-span-2">
                    <div className="col-span-2">
                      <TextInput
                        control={form.control}
                        name="adminName"
                        placeholder="Admin Name"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <DateTimeInput
                        control={form.control}
                        name="publishedDate"
                        label="Publish Date"
                        type="datetime-local"
                      />
                    </div>
                  </div>
                </section>

                {/* SEO Section */}
                <section className="bg-white border border-gray-300 rounded p-5">
                  <h1 className="mb-2 font-semibold">SEO Section:</h1>

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
                  {/* <TagSelector name="metaKeywords" label="Meta Keywords" /> */}
                  <TagSelector
                    name="metaKeywords"
                    label="Meta Keywords"
                    defaultValues={singleData?.metaKeywords || []}
                  />
                </section>
              </div>
            </div>

            {/* Submit Section */}
            <section className="my-4 flex justify-end">
              <Button type="submit" className="w-[400px] text-white">
                Update
              </Button>
            </section>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Page;
