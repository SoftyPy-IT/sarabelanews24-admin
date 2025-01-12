"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import SelectInput from "@/utils/Form_Inputs/SelectInput";
import TextInput from "@/utils/Form_Inputs/TextInput";
import DateTimeInput from "@/utils/Form_Inputs/DateTimeInput";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import TextEditor from "@/utils/Form_Inputs/TextEditor";
import { DialogTitle } from "@/components/ui/dialog";
import AllImgModal from "@/components/Shared/AllImagesModal/AllImgModal";

const Page = () => {
  type Inputs = {
    reporterType: string;
    reporterName: string;
    newsArea: string;
    reportedDateAndTime: string;
    selectedImage: string;
    photoJournalistName: string;
    news_type: string;
    publishedDate: string;
    newsTitle: string;
    description: string;
  };

  const form = useForm<Inputs>({
    defaultValues: {
      reporterType: "নিজস্ব প্রতিনিধি",
      reporterName: "Jhonathan",
      newsArea: "ঢাকা",
      reportedDateAndTime: "12:34",
      photoJournalistName: "jhonathan",
      news_type: "রাজনীতি",
      publishedDate: "",
      newsTitle: "Hello world",
      description: "this is a great news article",
      selectedImage: "http://",
    },
  });

  const onSubmit = (data: Inputs) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-screen ">
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmit(data);
        })}
        className="space-y-6"
      >
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
        <section>
          <h1 className="mb-2">সংবাদের তথ্য:</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="col-span-2">
              <div className="grid lg:grid-cols-4 items-center lg:justify-center gap-4">
                <div>
                  <Sheet>
                    <SheetTrigger asChild>
                      <span>
                        <Button className="bg-blue-500 rounded-full">
                          Add Lead Image
                        </Button>
                      </span>
                    </SheetTrigger>
                    <SheetContent style={{ maxWidth: "800px" }}>
                      <DialogTitle className="text-lg font-semibold mt-10 border-b-[2px]">
                        Add Image
                      </DialogTitle>
                    <AllImgModal/>
                    </SheetContent>
                  </Sheet>
                  {/* <AllImages/> */}
                </div>
                <div className="lg:col-span-3">
                  <TextInput
                    control={form.control}
                    name="newsTitle"
                    placeholder="শিরোনাম"
                    rules={{ required: "News title is required" }}
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
              <TextEditor
                name={"description"}
                placeholder={"Please enter your text here.."}
              />
            </div>
          </div>
        </section>
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
