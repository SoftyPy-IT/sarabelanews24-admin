/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import RichText from "@/utils/Form_Inputs/RichText";
import TextArea from "@/utils/Form_Inputs/TextArea";
import TextInput from "@/utils/Form_Inputs/TextInput";
import SelectInput from "@/utils/Form_Inputs/SelectInput";
import { Delete, ImageUpIcon, PlusIcon, Sheet } from "lucide-react";
import DateTimeInput from "@/utils/Form_Inputs/DateTimeInput";
import { useCreateNewsMutation } from "@/redux/dailynews/news.api";
import AllImgModal from "@/components/Shared/AllImagesModal/AllImgModal";
import { useGetAllCategoriesQuery } from "@/redux/dailynews/category.api";
import SelectMultiValue from "@/utils/Form_Inputs/SelectMultiValue";
import TagSelector from "@/utils/Form_Inputs/TagSelector";
import NewsType from "./NewsType";
import RadioInput from "@/utils/Form_Inputs/RadioInput";
// import { SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Inputs = {
  reporterType: string;
  reporterName: string;
  newsArea: string;
  news_showing_position: string;
  reportedDate: string;
  selectedImage: string;
  imageTagline: string;
  photoJournalistName: string;
  news_category: string;
  news_sub_category:string;
  news_type: string;
  adminName: string;
  postDate: Date;
  slug: string;

  publishedDate: string;
  newsTitle: string;
  shortDescription: string;
  description: string;
  tags: {
    imageTagline: string;
    photoJournalistName: string;
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

const AddNewsForm = ({ editingId, initialData }: CourseFormProps) => {
  const [createNews] = useCreateNewsMutation({});
  const router = useRouter();

  const { data, isLoading, isError } = useGetAllCategoriesQuery({});
  console.log(data);

  const form = useForm<Inputs>({
    defaultValues: {
      reporterType: "",
      reporterName: "",
      adminName: "",
      newsArea: "",
      reportedDate: "",
      imageTagline: "",
      photoJournalistName: "",
      news_showing_position: "",
      news_sub_category:"",
      news_category: "",
      news_type: "",
      slug: "",
      publishedDate: "",
      newsTitle: "",
      shortDescription: "",
      description: "",
      tags: [{ imageTagline: "", photoJournalistName: "", selectedImage: "" }],

      metaTitle: "",
      metaKeywords: "",
      metaDescription: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  const newsDivision = useWatch({
    control: form.control,
    name: "news_category",
  });

  console.log(newsDivision);

  // api
  if (isLoading) {
    return <h1>loading</h1>;
  }

  // console.log(data);

  const onSubmit = async (data: Inputs) => {
    const modifyData = {
      ...data,
      news_category: data.news_category,
      postDate: new Date().toISOString(),

      // reporterType: data.reporterType.value,
      // reportedDate: new Date().toISOString(),
    };

    try {
      const res = await createNews(modifyData).unwrap();
      if (res.success) {
        alert("News Create Successfully!");
      }
      router.push("/dashboard/list-lead-news");
    } catch (error) {
      console.error(error);
    }
  };

  console.log(data);

  return (
    <>
      {/* <TopBar /> */}
      <div className="min-h-screen">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-4 xl:6">
              <div className="lg:col-span-8 col-span-full space-y-3">
                {/* Reporter Info Section */}
                <section className="bg-white border border-blue-500 rounded-md p-5">
                  <h1 className="mb-2 font-semibold text-blue-500">
                    প্রতিনিধি তথ্য:
                  </h1>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <SelectInput
                      control={form.control}
                      name="reporterType"
                      placeholder="প্রতিনিধি টাইপ নির্বাচন করুন"
                      options={[
                        {
                          label: "নিজস্ব প্রতিনিধি",
                          value: "own_representative",
                        },
                        { label: "প্রতিনিধি", value: "representative" },
                        {
                          label: "বিশেষ প্রতিনিধি",
                          value: "special_representative",
                        },
                        { label: "স্টাফ রিপোর্টার", value: "staff_reporter" },
                        {
                          label: "আঞ্চলিক প্রতিনিধি",
                          value: "regional_representative",
                        },
                        {
                          label: "জেলা প্রতিনিধি",
                          value: "district_representative",
                        },
                        {
                          label: "উপজেলা প্রতিনিধি",
                          value: "subdistrict_representative",
                        },
                        {
                          label: "সাংস্কৃতিক প্রতিনিধি",
                          value: "cultural_representative",
                        },
                        {
                          label: "খেলাধুলা প্রতিনিধি",
                          value: "sports_representative",
                        },
                        {
                          label: "অর্থনৈতিক প্রতিনিধি",
                          value: "economic_representative",
                        },
                        {
                          label: "রাজনৈতিক প্রতিনিধি",
                          value: "political_representative",
                        },
                        {
                          label: "সাহিত্য প্রতিনিধি",
                          value: "literature_representative",
                        },
                        { label: "ক্রাইম রিপোর্টার", value: "crime_reporter" },
                        {
                          label: "স্বাস্থ্য প্রতিনিধি",
                          value: "health_representative",
                        },
                        {
                          label: "প্রবাস প্রতিনিধি",
                          value: "expatriate_representative",
                        },
                        {
                          label: "তথ্যপ্রযুক্তি প্রতিনিধি",
                          value: "technology_representative",
                        },
                        {
                          label: "পর্যটন প্রতিনিধি",
                          value: "tourism_representative",
                        },
                      ]}
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

                {/* news area */}
                <section className="bg-white border border-blue-500 rounded-md p-5">
                  <h1 className="mb-2 font-semibold text-blue-500">
                    নিউজ ক্যাটাগরি:
                  </h1>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <SelectInput
                        control={form.control}
                        name="news_category"
                        placeholder="নিউজ ক্যাটাগরি নির্বাচন করুন"
                        rules={{ required: "News Category is required" }}
                        options={[
                          { label: "Bangladesh", value: "Bangladesh" },
                          { label: "International", value: "International" },
                        ]}
                      />
                    </div>

                    {newsDivision === "Bangladesh" && (
                      <>
                        <h1 className="mb-1 font-semibold text-blue-500">
                          নিউজ এলাকা
                        </h1>
                        <div className="col-span-2 grid grid-cols-1 lg:grid-cols-3 gap-4">
                          <SelectMultiValue
                            name={`newsArea`}
                            options={[
                              { label: "Bangladesh", value: "Bangladesh" },
                              {
                                label: "International",
                                value: "International",
                              },
                            ]}
                            label="বিভাগ নির্বাচন করুন"
                          />
                          <SelectMultiValue
                            name={`newsArea`}
                            options={[
                              { label: "Bangladesh", value: "Bangladesh" },
                              {
                                label: "International",
                                value: "International",
                              },
                            ]}
                            label="বিভাগ নির্বাচন করুন"
                          />
                          <SelectMultiValue
                            name={`newsArea`}
                            options={[
                              { label: "Bangladesh", value: "Bangladesh" },
                              {
                                label: "International",
                                value: "International",
                              },
                            ]}
                            label="বিভাগ নির্বাচন করুন"
                          />
                        </div>
                      </>
                    )}

                    {newsDivision === "International" && (
                      <>
                        <h1 className="mb-1 font-semibold text-blue-500">
                          নিউজ এলাকা
                        </h1>
                        <div className="col-span-2">
                          <TextInput
                            control={form.control}
                            name={"international_news_area"}
                            placeholder="আন্তর্জাতিক সংবাদ এলাকা"
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
                <section className="bg-white border border-blue-500 rounded-md p-5">
                  <h1 className="mb-2 font-semibold text-blue-500">
                    সংবাদের তথ্য:
                  </h1>
                  <div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="p-8 border hover:bg-blue-400 rounded-full mb-5"
                        >
                          <ImageUpIcon color="red" size={50} /> Add Image
                        </Button>
                      </DialogTrigger>
                      <DialogContent style={{ maxWidth: "800px" }}>
                        <DialogTitle className="sr-only">
                          Image Selection Modal
                        </DialogTitle>
                        <AllImgModal />
                      </DialogContent>
                    </Dialog>

                    {/* <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          className="p-8 border hover:bg-blue-400 rounded-full mb-5"
                        >
                          <ImageUpIcon color="red" size={50} /> Add Image
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" style={{ maxWidth: "800px" }}>
                        <SheetTitle className="sr-only">
                          Image Selection Modal
                        </SheetTitle>
                        <AllImgModal />
                      </SheetContent>
                    </Sheet> */}
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TextInput
                        control={form.control}
                        name="imageTagline"
                        placeholder="ইমেজ ট্যাগ লাইন"
                        rules={{ required: "Image Tagline is required" }}
                      />

                      <TextInput
                        control={form.control}
                        rules={{ required: "Photographer name is required" }}
                        name="photoJournalistName"
                        placeholder="ফটো সাংবাদিক নাম"
                      />

                      <SelectInput
                        control={form.control}
                        name="news_sub_category"
                        placeholder="নিউজ সাব_ক্যাটাগরি নির্বাচন করুন"
                        rules={{ required: "News Sub Category is required" }}
                        options={
                          data?.data?.categories?.map(
                            (program: { name: string; _id: string }) => ({
                              label: program.name,
                              value: program._id,
                            })
                          ) || []
                        }
                      />
                      <NewsType form={form} name="news_type" className="mb-4" />
                    </div>

                    <div className="col-span-2">
                      <TextInput
                        control={form.control}
                        rules={{ required: "Slug is required" }}
                        name="slug"
                        placeholder="Slug"
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

                  {/* Submit Section */}
                  <section className="flex justify-end mt-5">
                    <Button
                      type="submit"
                      className="w-[200px]  text-white hover:bg-blue-600"
                    >
                      <PlusIcon className="w-4 h-4" /> Add Lead News
                    </Button>
                  </section>
                </section>
              </div>

              <div className="lg:col-span-4 col-span-full space-y-5">
                {/* Tags Section */}
                <section className="bg-white border border-blue-500 rounded-md p-5">
                  <h1 className="mb-2 font-semibold text-blue-500">
                    সংবাদ ট্যাগ:
                  </h1>
                  <div className="col-span-2">
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex flex-col space-y-3">
                        <div className="flex justify-between items-center gap-2 p-4">
                          {/* <Sheet>
                            <SheetTrigger asChild>
                              <Button
                                variant="outline"
                                className="p-8 border hover:bg-blue-400 rounded-full"
                              >
                                <ImageUpIcon color="red" size={50} />
                                Add Image
                              </Button>
                            </SheetTrigger>
                            <SheetContent
                              side="right"
                              style={{ maxWidth: "800px" }}
                            >
                              <AllImgModal />
                            </SheetContent>
                          </Sheet> */}

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="p-8 border hover:bg-blue-400 rounded-full mb-5"
                              >
                                <ImageUpIcon color="red" size={50} /> Add Image
                              </Button>
                            </DialogTrigger>
                            <DialogContent
                              side="right"
                              style={{ maxWidth: "800px" }}
                            >
                              <DialogTitle className="sr-only">
                                Image Selection Modal
                              </DialogTitle>
                              <AllImgModal />
                            </DialogContent>
                          </Dialog>

                          <div className="flex justify-end gap-2">
                            {fields.length > 1 && (
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => remove(index)}
                              >
                                <Delete className="w-4 h-4" />
                              </Button>
                            )}
                            {index === fields.length - 1 && (
                              <Button
                                type="button"
                                variant="default"
                                size="sm"
                                onClick={() =>
                                  append({
                                    imageTagline: "",
                                    photoJournalistName: "",
                                    selectedImage: "",
                                  })
                                }
                              >
                                <PlusIcon className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-0 gap-4">
                          <TextInput
                            control={form.control}
                            name={`tags.${index}.imageTagline`}
                            placeholder="ইমেজ ট্যাগ লাইন"
                            rules={{ required: "Image Tag Line is required" }}
                          />
                          <TextInput
                            control={form.control}
                            name={`tags.${index}.photoJournalistName`}
                            placeholder="ফটো সাংবাদিক নাম"
                            rules={{
                              required:
                                "Photo Journalist Name name is required",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* news showing position */}
                <section className="bg-white border border-blue-500 rounded-md p-5">
                  <h1 className="mb-2 font-semibold text-blue-500">
                    কোথায় প্রদর্শন করতে চাচ্ছেন ?
                  </h1>
                  <SelectMultiValue
                    isMultiple={true}
                    name={"news_showing_position"}
                    options={[
                      { label: "গুরুত্বপূর্ণ", value: "important" },
                      { label: "দৈনিক ইসলাম", value: "daily-islam" },
                      { label: "সাক্ষাৎকার", value: "meeting" },
                      { label: "মতামত", value: "opinion" },
                      { label: "ফিচার", value: "feature" },
                      { label: "সম্বার", value: "sombar" },
                      { label: "সবচেয়ে পঠিত", value: "most-readable" },
                      { label: "আলোচিত", value: "discussed" },
                      { label: "সুখবর", value: "good-news" },
                      { label: "চাকরি", value: "job" },
                    ]}
                    label={"অবস্থান নির্বাচন করুন"}
                  />
                </section>

                <section className="bg-white border border-blue-500 rounded-md p-5">
                  <RadioInput title={"ক্যারেন্ট নিউজ হিসেবে রাখতে চাচ্ছেন ?"} />
                </section>

                {/* Admin Section */}
                <section className="bg-white border border-blue-500 rounded-md p-5">
                  <h1 className="mb-2 font-semibold text-blue-500">
                    Admin Section:
                  </h1>
                  <div className="col-span-2">
                    <div className="flex flex-col space-y-3 mb-2">
                      <div className="grid grid-cols-1  gap-4">
                        <DateTimeInput
                          control={form.control}
                          name="postDate"
                          label="Post Date"
                          type="datetime-local"
                          rules={{ required: "Post date is required" }}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* SEO Section */}
                <section className="bg-white border border-blue-500 rounded-md p-3">
                  <h1 className="mb-2 font-semibold text-blue-500">
                    SEO Section:
                  </h1>
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
            <section className="my-4">
              <Button
                type="submit"
                className="w-full bg-blue-500 text-white hover:bg-blue-600"
              >
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
