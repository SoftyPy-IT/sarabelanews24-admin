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
import SelectMultiValue from "@/utils/Form_Inputs/SelectorWithSearch";
import TagSelector from "@/utils/Form_Inputs/TagSelector";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Inputs = {
  admin_name: string;
  published_date: string;
  reporter_name: string;
  reported_date: string;
  reporter_type: string;
  selectedImage: string;
  photo_journalist_name: string;
  international_news_area: string;
  news_type: string;
  news_category: string;
  news_title: string;
  short_description: string;
  adminName: string;
  slug: string;
  publishedDate: string;
  description: string;

  tags: {
    video_tagline: string;
    video_journalist_name: string;
    video_link: string;
  }[];

  metaTitle: string;
  metaKeywords: string | string[];
  metaDescription: string;
};

type CourseFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
};

const AddVideoForm = ({ editingId, initialData }: CourseFormProps) => {
  const [createNews] = useCreateNewsMutation({});
  const router = useRouter();

  const { data, isLoading, isError } = useGetAllCategoriesQuery({});
  console.log(data);

  const form = useForm<Inputs>({
    defaultValues: {
      reporter_type: "",
      reporter_name: "",
      admin_name: "",
      reported_date: "",
      photo_journalist_name: "",
      news_category: "",
      news_type: "",
      news_title: "",
      slug: "",
      published_date: "",
      short_description: "",
      description: "",
      tags: [{ video_tagline: "", video_journalist_name: "", video_link: "" }],
      metaTitle: "",
      metaKeywords: "",
      metaDescription: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  const news_type = useWatch({
    control: form.control,
    name: "news_type",
  });

  if (isLoading) {
    return <h1>loading</h1>;
  }

  const onSubmit = async (data: Inputs) => {
    const modifyData = {
      ...data,
      // news_category: data.news_category,
      // postDate: new Date().toISOString(),
      // reporterType: data.reporterType.value,
      // reportedDate: new Date().toISOString(),
    };
    console.log(modifyData);

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

  // console.log(data);

  return (
    <>
      {/* <TopBar /> */}
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-4 xl:6">
              <div className="lg:col-span-8 col-span-full space-y-3">
                {/* Reporter Info Section */}
                <section className="bg-white border border-black p-5">
                  <h1 className="mb-2 font-semibold text-blue-500">
                    প্রতিনিধি তথ্য:
                  </h1>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <SelectInput
                      control={form.control}
                      name="reporter_type"
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
                      name="reported_date"
                      rules={{ required: "Reported date and time is required" }}
                    />

                    <div className="col-span-2">
                      <TextInput
                        control={form.control}
                        name="reporter_name"
                        placeholder="প্রতিনিধি নাম"
                        rules={{ required: "Reporter name is required" }}
                      />
                    </div>
                  </div>
                </section>

                {/* news type and area */}
                <section className="bg-white border border-black p-5">
                  <h1 className="mb-2 font-semibold text-blue-500">
                    নিউজ টাইপ:
                  </h1>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <SelectInput
                        control={form.control}
                        name="news_type"
                        placeholder="নিউজ টাইপ নির্বাচন করুন"
                        rules={{ required: "News Category is required" }}
                        options={[
                          { label: "Bangladesh", value: "Bangladesh" },
                          { label: "International", value: "International" },
                        ]}
                      />
                    </div>

                    {news_type === "Bangladesh" && (
                      <>
                        <h1 className="mb-1 font-semibold text-blue-500">
                          নিউজ এলাকা
                        </h1>
                        <div className="col-span-2 grid grid-cols-1 lg:grid-cols-3 gap-4">
                          <SelectMultiValue
                            name={`news_area_division`}
                            options={[
                              { label: "বাংলাদেশ", value: "Bangladesh" },
                              { label: "ঢাকা", value: "Dhaka" },
                              { label: "বরিশাল", value: "Barishal" },
                              { label: "খুলনা", value: "Khulna" },
                              { label: "চট্টগ্রাম", value: "Chattogram" },
                              { label: "রাজশাহী", value: "Rajshahi" },
                              { label: "রংপুর", value: "Rangpur" },
                              { label: "সিলেট", value: "Sylhet" },
                              { label: "ময়মনসিংহ", value: "Mymensingh" },
                            ]}
                            label="বিভাগ নির্বাচন করুন"
                          />
                          <SelectMultiValue
                            name={`news_area_district`}
                            options={[
                              { label: "বাংলাদেশ", value: "Bangladesh" },
                              { label: "ঢাকা", value: "Dhaka" },
                              { label: "বরিশাল", value: "Barishal" },
                              { label: "খুলনা", value: "Khulna" },
                              { label: "চট্টগ্রাম", value: "Chattogram" },
                              { label: "রাজশাহী", value: "Rajshahi" },
                              { label: "রংপুর", value: "Rangpur" },
                              { label: "সিলেট", value: "Sylhet" },
                              { label: "ময়মনসিংহ", value: "Mymensingh" },
                            ]}
                            label="জেলা নির্বাচন করুন"
                          />
                          <SelectMultiValue
                            name={`news_area_upozilla`}
                            options={[
                              { label: "বাংলাদেশ", value: "Bangladesh" },
                              { label: "ঢাকা", value: "Dhaka" },
                              { label: "বরিশাল", value: "Barishal" },
                              { label: "খুলনা", value: "Khulna" },
                              { label: "চট্টগ্রাম", value: "Chattogram" },
                              { label: "রাজশাহী", value: "Rajshahi" },
                              { label: "রংপুর", value: "Rangpur" },
                              { label: "সিলেট", value: "Sylhet" },
                              { label: "ময়মনসিংহ", value: "Mymensingh" },
                            ]}
                            label="উপজেলা নির্বাচন করুন"
                          />
                        </div>
                      </>
                    )}

                    {news_type === "International" && (
                      <>
                        <h1 className="mb-1 font-semibold text-blue-500">
                          নিউজ এলাকা
                        </h1>
                        <div className="col-span-2">
                          <TextInput
                            control={form.control}
                            name={"international_news_area"}
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
                <section className="bg-white border border-black p-5">
                  <h1 className="mb-2 font-semibold text-blue-500">
                    সংবাদের তথ্য:
                  </h1>
                  <div>
                    <Sheet>
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
                    </Sheet>
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <TextInput
                        control={form.control}
                        rules={{ required: "Photographer name is required" }}
                        name="photo_journalist_name"
                        placeholder="ফটো সাংবাদিক নাম"
                      />

                      <SelectInput
                        control={form.control}
                        name="news_category"
                        placeholder="নিউজ ক্যাটাগরি নির্বাচন করুন"
                        rules={{ required: "News Sub Category is required" }}
                        options={[
                          { label: "রাজনীতি", value: "রাজনীতি" },
                          { label: "অর্থনীতি", value: "অর্থনীতি" },
                          { label: "খেলাধুলা", value: "খেলাধুলা" },
                          { label: "বিনোদন", value: "বিনোদন" },
                          { label: "শিক্ষা", value: "শিক্ষা" },
                        ]}
                      />
                    </div>

                    <div className="col-span-2">
                      <TextInput
                        control={form.control}
                        name="news_title"
                        placeholder="শিরোনাম"
                        rules={{ required: "News title is required" }}
                      />
                    </div>

                    <div className="col-span-2">
                      <TextArea
                        control={form.control}
                        name="short_description"
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
                <section className="bg-white border border-black p-5">
                  <h1 className="mb-2 font-semibold text-blue-500">
                    ভিডিও ট্যাগ:
                  </h1>
                  <div className="col-span-2">
                    {fields.map((field, index) => (
                      <div key={field.id}>
                        <div key={index} className="grid grid-cols-1 gap-4">
                          <div>
                            <TextInput
                              control={form.control}
                              name={`tags.${index}.video_link`}
                              placeholder="ভিডিও লিঙ্ক"
                            />
                          </div>
                          <div>
                            <TextInput
                              control={form.control}
                              name={`tags.${index}.video_journalist_name`}
                              placeholder="ভিডিও সাংবাদিকের নাম"
                            />
                          </div>
                          <div>
                            <TextInput
                              control={form.control}
                              name={`tags.${index}.video_tagline`}
                              placeholder="সংবাদ ট্যাগ লাইন"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-4 py-2">
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
                                  video_link: "",
                                  video_journalist_name: "",
                                  video_tagline: "",
                                })
                              }
                            >
                              <PlusIcon className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Admin Section */}
                <section className="bg-white border border-black p-5">
                  <h1 className="mb-2 font-semibold text-blue-500">
                    Admin Section:
                  </h1>
                  <div className="col-span-2">
                    <div className="flex flex-col space-y-3 mb-2">
                      <div className="grid grid-cols-1  gap-4">
                        <DateTimeInput
                          control={form.control}
                          name="published_date"
                          label="Post Date"
                          type="datetime-local"
                          rules={{ required: "Post date is required" }}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* SEO Section */}
                <section className="bg-white border border-black p-5">
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

export default AddVideoForm;
