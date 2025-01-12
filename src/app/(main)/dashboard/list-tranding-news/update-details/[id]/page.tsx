"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
import SelectInput from "@/utils/Form_Inputs/SelectInput";
import TextInput from "@/utils/Form_Inputs/TextInput";
import DateTimeInput from "@/utils/Form_Inputs/DateTimeInput";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import TextEditor from "@/utils/Form_Inputs/TextEditor";
import TextArea from "@/utils/Form_Inputs/TextArea";
import { Delete, ImageUpIcon, PlusIcon } from "lucide-react";
import AllImgModal from "@/components/Shared/AllImagesModal/AllImgModal";

type Inputs = {
  reporterType: string;
  reporterName: string;
  newsArea: string;
  reportedDateAndTime: string;
  selectedImage: string;
  imageTagLine: string;
  photoJournalistName: string;
  news_type: string;
  publishedDate: string;
  newsTitle: string;
  shortDescription: string;
  description: string;
  tags: {
    imageTagLine: string;
    photoJournalistName: string;
    selectedImage: string;
  }[];
};

const Page = () => {
  const form = useForm<Inputs>({
    defaultValues: {
      reporterType: "personalReporter",
      reporterName: "John Smith",
      newsArea: "তেজগাঁও। ঢাকা-১২১২",
      reportedDateAndTime: "1988-09-07T23:17",
      imageTagLine: "This should be the first image",
      photoJournalistName: "omith Jordan",
      news_type: "politics",
      publishedDate: "1988-09-07T23:17",
      newsTitle: "This  is the first news",
      shortDescription: "This is the first news title and description for",
      description:
        "This is the first news description. This description includes  information about the news.",
      tags: [
        {
          imageTagLine: "This is  tagline",
          photoJournalistName: "jahan Ahmed",
          selectedImage: "https//www.lorem.com",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  const onSubmit = (data: Inputs) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Reporter Info Section */}
          <section>
            <h1 className="mb-2">প্রতিনিধি তথ্য:</h1>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <SelectInput
                control={form.control}
                name="reporterType"
                placeholder="প্রতিনিধি টাইপ নির্বাচন করুন"
                options={[
                  { label: "নিজস্ব প্রতিনিধি", value: "নিজস্ব প্রতিনিধি" },
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
              <DateTimeInput
                control={form.control}
                type="datetime-local"
                name="reportedDateAndTime"
                rules={{ required: "Reported date and time is required" }}
              />
            </div>
          </section>

          {/* News Info Section */}
          <section>
            <h1 className="mb-2">সংবাদের তথ্য:</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="col-span-2">
                <div className="grid lg:grid-cols-3 items-center lg:justify-center gap-4">
                  <div>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          className="p-8 border-none hover:bg-blue-400 rounded-full"
                        >
                          <ImageUpIcon color="red" size={50} />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" style={{ maxWidth: "800px" }}>
                        <AllImgModal />
                      </SheetContent>
                    </Sheet>
                  </div>

                  <div>
                    <TextInput
                      control={form.control}
                      name="imageTagLine"
                      placeholder="ইমেজ ট্যাগ লাইন"
                      rules={{ required: "Image Tagline is required" }}
                    />
                  </div>

                  <div>
                    <TextInput
                      control={form.control}
                      rules={{ required: "Photographer name is required" }}
                      name="photoJournalistName"
                      placeholder="ফটো সাংবাদিক নাম"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-2 lg:col-span-1">
                <SelectInput
                  control={form.control}
                  name="news_type"
                  placeholder="বিভাগ নির্বাচন করুন"
                  rules={{ required: "News type is required" }}
                  options={[
                    { label: "রাজনীতি", value: "রাজনীতি" },
                    { label: "অর্থনীতি", value: "অর্থনীতি" },
                    { label: "খেলাধুলা", value: "খেলাধুলা" },
                    { label: "বিনোদন", value: "বিনোদন" },
                    { label: "শিক্ষা", value: "শিক্ষা" },
                  ]}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <TextInput
                  control={form.control}
                  name="publishedDate"
                  type="datetime-local"
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

              <div className="col-span-2">
                <TextEditor
                defaultValue = "Long Description"
                  rules={"Description is required"}
                  name={"description"}
                  placeholder={"সংবাদ বিবরণ লিখুন"}
                />
              </div>
            </div>
          </section>

          {/* Tags Section */}
          <section>
            <h1 className="mb-2">সংবাদ ট্যাগ:</h1>
            <div className="col-span-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col space-y-3">
                  <div className="flex justify-between items-center gap-2 p-4">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          className="p-8 border-none hover:bg-blue-400 rounded-full"
                        >
                          <ImageUpIcon color="red" size={50} />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" style={{ maxWidth: "800px" }}>
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
                              imageTagLine: "",
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
                  <TextInput
                    control={form.control}
                    name={`tags.${index}.photoJournalistName`}
                    placeholder="ফটো সাংবাদিক নাম"
                  />
                  <TextInput
                    control={form.control}
                    name={`tags.${index}.imageTagLine`}
                    placeholder="ইমেজ ট্যাগ লাইন"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Submit Section */}
          <section>
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
  );
};

export default Page;
