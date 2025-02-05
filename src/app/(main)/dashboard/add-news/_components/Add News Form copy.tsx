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
import { newsCategory, newsType } from "@/types/select";
import { useForm, useFieldArray } from "react-hook-form";
import SelectInput from "@/utils/Form_Inputs/SelectInput";
import TagSelector from "@/utils/Form_Inputs/TagSelector";
import { Delete, ImageUpIcon, PlusIcon } from "lucide-react";
import DateTimeInput from "@/utils/Form_Inputs/DateTimeInput";
import { useCreateNewsMutation } from "@/redux/dailynews/news.api";
import AllImgModal from "@/components/Shared/AllImagesModal/AllImgModal";
import { useGetAllCategoriesQuery } from "@/redux/dailynews/category.api";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import TopBar from "./TopBar";
import SelectMultiValue from "@/utils/Form_Inputs/SelectorWithSearch";

type Inputs = {
  reporterType: string;
  reporterName: string;
  newsArea: string;
  newsType: string;
  reportedDate: string;
  selectedImage: string;
  imageTagline: string;
  photoJournalistName: string;
  newsCategory: string;
  adminName: string;
  postDate: Date;
  slug: string;
  category: string;

  publishedDate: string;
  newsTitle: string;
  shortDescription: string;
  description: string;
  tags: {
    imageTagline: string;
    photoJournalistName: string;
    selectedImage: string;
  }[];
  newsTag: string;
  metaTitle: string;
  metaKeywords: string | string[];
  metaDescription: string;
};

type CourseFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
};

const AddLeadNews = ({ editingId, initialData }: CourseFormProps) => {
  const [createNews] = useCreateNewsMutation({});
  const router = useRouter();

  const { data, isLoading, isError } = useGetAllCategoriesQuery({});
  // console.log(data);

  const form = useForm<Inputs>({
    defaultValues: {
      reporterType: "",
      reporterName: "",
      adminName: "",
      newsArea: "",
      newsType: "",
      newsTag: "",
      reportedDate: "",
      imageTagline: "",
      photoJournalistName: "",

      newsCategory: "",
      category: "",
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

  // api
  if (isLoading) {
    return <h1>loading</h1>;
  }

  // console.log(data);

  const onSubmit = async (data: Inputs) => {
    const modifyData = {
      ...data,
      category: data.category,
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
      <TopBar />
      <div className="min-h-screen">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 md:gap-4 xl:6">
              <div className="lg:col-span-8 col-span-full space-y-3">
                {/* Reporter Info Section */}
                <section className="bg-white border rounded-md p-3">
                  <h1 className="mb-2 font-bold text-lg">প্রতিনিধি তথ্য:</h1>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <DateTimeInput
                      control={form.control}
                      type="datetime-local"
                      name="reportedDate"
                      rules={{ required: "Reported date and time is required" }}
                    />

                    <SelectInput
                      control={form.control}
                      name="reporterType"
                      placeholder="প্রতিনিধি টাইপ নির্বাচন করুন"
                      options={[
                        {
                          label: "নিজস্ব প্রতিনিধি",
                          value: "নিজস্ব প্রতিনিধি",
                        },
                        { label: "প্রতিনিধি", value: "প্রতিনিধি" },
                      ]}
                      rules={{ required: "Reporter type is required" }}
                    />

                    <TextInput
                      control={form.control}
                      name="reporterName"
                      placeholder="প্রতিনিধি নাম"
                      rules={{ required: "Reporter name is required" }}
                    />

                    <TextInput
                      control={form.control}
                      name="newsArea"
                      placeholder="সংবাদ এলাকা"
                      rules={{ required: "News area is required" }}
                    />
                  </div>
                </section>

                {/* News Info Section */}
                <section className="bg-white border rounded-md p-3">
                  <h1 className="pb-5">সংবাদের তথ্য:</h1>
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
                        <SheetTitle className="text-xl font-semibold mb-6">
                          Image Selection Modal
                        </SheetTitle>

                        <AllImgModal />
                      </SheetContent>
                    </Sheet>
                    {/* <Image src={}/> */}
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TextInput
                        control={form.control}
                        name="imageTagline"
                        placeholder="ইমেজ ট্যাগ লাইন"
                        rules={{ required: "Image Tagline is required" }}
                      />
                      <DateTimeInput
                        control={form.control}
                        name="publishedDate"
                        type="datetime-local"
                        rules={{ required: "Published date is required" }}
                      />
                      {/* <TextInput
                        control={form.control}
                        name="publishedDate"
                        type="datetime-local"
                        rules={{ required: "Published date is required" }}
                      /> */}
                      <TextInput
                        control={form.control}
                        rules={{ required: "Photographer name is required" }}
                        name="photoJournalistName"
                        placeholder="ফটো সাংবাদিক নাম"
                      />
                      <TextInput
                        control={form.control}
                        rules={{ required: "Slug is required" }}
                        name="slug"
                        placeholder="Slug"
                      />

                      <SelectMultiValue
                        name="category"
                        label="বিভাগ নির্বাচন করুন"
                        options={
                          data?.data?.categories?.map(
                            (program: { name: string; _id: string }) => ({
                              label: program.name,
                              value: program._id,
                            })
                          ) || []
                        }
                      />

                      <SelectInput
                        control={form.control}
                        name="newsType"
                        placeholder="News type"
                        rules={{ required: "News type is required" }}
                        options={
                          data?.data?.categories?.map(
                            (program: { name: string; _id: string }) => ({
                              label: program.name,
                              value: program._id,
                            })
                          ) || []
                        }
                      />
                      <SelectInput
                        control={form.control}
                        name="newsCategory"
                        placeholder="News Category "
                        rules={{ required: "News Category is required" }}
                        options={newsCategory}
                      />

                      <TextInput
                        control={form.control}
                        name="newsTag"
                        placeholder="News Tag"
                        rules={{ required: "Published date is required" }}
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
                    {/*
                    <div className="col-span-2">
                      <TextEditor
                        rules={"Description is required"}
                        name={"description"}
                        placeholder={"সংবাদ বিবরণ লিখুন"}
                      />
                    </div> */}
                    <div className="col-span-2">
                      <RichText name="description" label="Description" />
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
                <section className="bg-white border rounded-md p-3">
                  <h1 className="mb-2">সংবাদ ট্যাগ:</h1>
                  <div className="col-span-2">
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex flex-col space-y-3">
                        <div className="flex justify-between items-center gap-2 p-4">
                          <Sheet>
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
                              <SheetTitle className="sr-only">
                                Image Selection Modal
                              </SheetTitle>
                              <AllImgModal />
                            </SheetContent>
                          </Sheet>

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

                {/* SEO Section */}
                <section className="bg-white border rounded-md p-3">
                  <h1 className="mb-2">Admin Section:</h1>
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
                        <TextInput
                          control={form.control}
                          name={"adminName"}
                          placeholder="Admin"
                          label="Admin"
                          rules={{ required: "Admin Name is Required" }}
                        />
                        {/* <TextInput
                          control={form.control}
                          name="postDate"
                          type="datetime-local"
                          rules={{ required: "Published date is required" }}
                        /> */}
                      </div>
                    </div>
                  </div>
                </section>

                {/* SEO Section */}
                <section className="bg-white border rounded-md p-3">
                  <h1 className="mb-2">SEO Section:</h1>
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
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddLeadNews;
