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
  newsTagOption,
  reporterTypeOption,
} from "@/utils/options";
import toast from "react-hot-toast";
import Image from "next/image";
import Loading from "@/app/loading";
import UpdateTopBar from "../../_components/UpdateTopBar";
import SelecteWithSearch from "@/utils/Form_Inputs/SelecteWithSearch";
import NewsLocation from "@/utils/Form_Inputs/NewsLocation";

type Inputs = {
  firstPage: string;
  reportedDate: string;
  reporterType: string;
  reporterName: string;
  currentNews: boolean;
  localNews: boolean;
  newsLocation: string;
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
  const [firstPage, setFirstPage] = useState<string>("no");
  const [currentNews, setCurrentNews] = useState<boolean>(false);
  const [localNews, setLocalNews] = useState<boolean>(false);

  const [updateNews] = useUpdateNewsMutation();

  const { data: singleData } = useGetSingleNewsQuery(id);

  const [mainSelectedFiles, setMainSelectedFiles] = React.useState<
    { url: string }[]
  >([]);

  const [tagSelectedFiles, setTagSelectedFiles] = React.useState<
    { url: string }[][]
  >([]);

  const [openSheetIndex, setOpenSheetIndex] = useState<number | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Add state for location data
  const [locationData, setLocationData] = useState<
    Record<string, Record<string, string[]>>
  >({});
  const [districtOptions, setDistrictOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [upazilaOptions, setUpazilaOptions] = useState<
    { label: string; value: string }[]
  >([]);

  // Load location data
  useEffect(() => {
    fetch("/data/location.json")
      .then((res) => res.json())
      .then((data) => setLocationData(data));
  }, []);

  const form = useForm<Inputs>({
    defaultValues: {
      firstPage:"", 
      reportedDate: "",
      reporterType: "",
      reporterName: "",
      currentNews: true || false,
      localNews: true || false,
      newsLocation: "",
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

  // Watch for changes to division, district, and newsType
  const division = useWatch({
    control: form.control,
    name: "division",
  });

  const district = useWatch({
    control: form.control,
    name: "district",
  });

  const newsType = useWatch({
    control: form.control,
    name: "newsType",
  });

  // Update district options when division changes
  useEffect(() => {
    if (division && locationData[division]) {
      setDistrictOptions(
        Object.keys(locationData[division]).map((district) => ({
          label: district,
          value: district,
        }))
      );
    }
  }, [division, locationData]);

  // Update upazila options when district changes
  useEffect(() => {
    if (division && district && locationData[division]?.[district]) {
      setUpazilaOptions(
        locationData[division][district].map((upazila) => ({
          label: upazila,
          value: upazila,
        }))
      );
    }
  }, [district, division, locationData]);

  // Load existing data and initialize form
  useEffect(() => {
   if (singleData && Object.keys(singleData).length > 0) {
      const formatDate = (isoString: string) =>
        isoString ? isoString.slice(0, 16) : "";

      // Set form values from single data
      form.reset({
        reportedDate: formatDate(singleData.reportedDate),
        reporterType: singleData.reporterType || "",
        reporterName: singleData.reporterName || "",
        currentNews: singleData.currentNews || false,
        localNews: singleData.localNews || false,
        firstPage: singleData.firstPage ? "yes" : "no",     
        newsLocation: singleData.newsLocation || "",
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

      // Update currentNews and localNews state
      setCurrentNews(singleData.currentNews || false);
      setLocalNews(singleData.localNews || false);

      // Set main images
      const mainImages =
        singleData.images?.map((url: string) => ({ url })) || [];
      setMainSelectedFiles(mainImages);

      // Initialize tag images from API
      const initialTagFiles =
        singleData.tags?.map((tag: any) =>
          tag.selectedImage ? [{ url: tag.selectedImage }] : []
        ) || [];
      setTagSelectedFiles(initialTagFiles);
      setFirstPage(singleData.firstPage ? "yes" : "no");
    }

  }, [singleData, form]);

  // Initialize location dropdowns after both location data and news data are loaded
  useEffect(() => {
    if (singleData && Object.keys(locationData).length > 0) {
      // If division is set, update district options
      if (singleData.division && locationData[singleData.division]) {
        setDistrictOptions(
          Object.keys(locationData[singleData.division]).map((district) => ({
            label: district,
            value: district,
          }))
        );

        // If district is set, update upazila options
        if (singleData.district && locationData[singleData.division][singleData.district]) {
          setUpazilaOptions(
            locationData[singleData.division][singleData.district].map((upazila) => ({
              label: upazila,
              value: upazila,
            }))
          );
        }
      }
    }
  }, [singleData, locationData]);

  const { fields, append, remove } = useFieldArray({ 
    control: form.control,
    name: "tags",
  });

  const onSubmit = async (data: Inputs) => {
    const modifyData = {
      ...data,
          firstPage: data.firstPage === "yes",
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
    setSheetOpen(false);
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
                          <SelecteWithSearch
                            name="division"
                            options={Object.keys(locationData).map((div) => ({
                              label: div,
                              value: div,
                            }))}
                            label="বিভাগ নির্বাচন করুন"
                            onChange={(value) => {
                              // Reset district and upazila when division changes
                              form.setValue("district", "");
                              form.setValue("upazila", "");
                              setUpazilaOptions([]);
                            }}
                          />

                          <SelecteWithSearch
                            name="district"
                            options={districtOptions}
                            label="জেলা নির্বাচন করুন"
                            onChange={(value) => {
                              // Reset upazila when district changes
                              form.setValue("upazila", "");
                            }}
                          />

                          <SelecteWithSearch
                            name="upazila"
                            options={upazilaOptions}
                            label="উপজেলা নির্বাচন করুন"
                          />
                        </div>
                        <section className="bg-white py-3 border-2 border-dashed rounded-lg mt-2 md:col-span-2 xl:col-span-1">
                          <RadioInput
                            title={"জনপদের সংবাদ?"}
                            name="localNews"
                            value={localNews}
                            onChange={(value: boolean) => {
                              setLocalNews(value);
                              form.setValue("localNews", value);
                            }}
                          />
                        </section>
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
                    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          className="p-8 border rounded-full mb-5"
                          onClick={() => setOpenSheetIndex(null)}
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

                      <NewsLocation
                        form={form}
                        name="newsLocation"
                        className=""
                        rules={{ required: "News type is required" }}
                        setFirstPage={setFirstPage}
                        initialFirstPage={singleData?.firstPage}
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
                    onChange={(value: boolean) => {
                      setCurrentNews(value);
                      form.setValue("currentNews", value);
                    }}
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
                  {/* <TagSelector
                    name="metaKeywords"
                    label="Meta Keywords"
                  /> */}
                  <TagSelector
                    name="metaKeywords"
                    label="Meta Keywords"
                    // defaultValues={singleData?.metaKeywords || []}
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