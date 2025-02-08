// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */

// "use client";
// import * as React from "react";
// import { Search } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import Image from "next/image";
// import { Form } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import FileInput from "@/utils/Form_Inputs/FileInput";
// import { useCreateImagesMutation } from "@/redux/dailynews/images.api";
// import toast from "react-hot-toast";
// import { useForm } from "react-hook-form";

// interface FileWithPreview {
//   file: File;
//   preview: string;
// }

// const TopBar = () => {
//   const [selectedFiles, setSelectedFiles] = React.useState<FileWithPreview[]>(
//     []
//   );
//   const [sheetOpen, setSheetOpen] = React.useState(false);
//   const fileInputRef = React.useRef<HTMLInputElement | null>(null);
//   const [createImages] = useCreateImagesMutation();

//   const form = useForm<Inputs>({
//     defaultValues: {
//       folder: "",
//       images: [],
//     },
//   });

//   type Inputs = {
//     folder: string;
//     images: FileWithPreview[];
//   };
//   const onSubmit = async (data: Inputs) => {
//     const toastId = toast.loading("Uploading images...");
//     const formData = new FormData();

//     if (!data.folder) {
//       toast.error("Folder ID is required");
//       return;
//     }

//     if (!Array.isArray(data.images) || data.images.length === 0) {
//       toast.error("Please select at least one image");
//       return;
//     }

//     data.images.forEach((fileWithPreview: FileWithPreview) => {
//       formData.append("images", fileWithPreview.file);
//     });
//     formData.append("folder", data.folder);

//     try {
//       const result = await createImages(formData).unwrap();
//       toast.success(result.message || "Images Uploaded Successfully!", {
//         id: toastId,
//         duration: 3000,
//       });
//       form.reset();
//       setSheetOpen(false);
//     } catch (err: any) {
//       const errorMessage =
//         err.data?.message || err.data?.errorMessages?.[0] || "Upload failed";
//       toast.error(errorMessage);
//     }
//   };

//   // const onSubmit = async (data: Inputs) => {
//   //   const toastId = toast.loading("Uploading images...");
//   //   const formData = new FormData();
//   //   console.log(data);

//   //   if (Array.isArray(data.images) && data.images.length > 0) {
//   //     data.images.forEach((file: any) => {
//   //       formData.append("images", file);
//   //     });
//   //   } else {
//   //     toast.error("Please select at least one image");
//   //     return;
//   //   }

//   //   formData.append("folder", data.folder);

//   //   try {
//   //     data.images.forEach((fileWithPreview: FileWithPreview) => {
//   //       formData.append("images", fileWithPreview.file);
//   //     });

//   //     formData.append("folder", data.folder);

//   //     const result = await createImages(formData).unwrap();

//   //     toast.success(result.message || "Images Uploaded Successfully!", {
//   //       id: toastId,
//   //       duration: 3000,
//   //     });

//   //     form.reset();
//   //     setSheetOpen(false);
//   //   } catch (err: any) {
//   //     const errorMessage =
//   //       err.data?.message || err.data?.errorMessages?.[0] || "Upload failed";
//   //     toast.error(errorMessage);
//   //   }
//   // };

//   return (
//     <>
//       <div className="flex justify-between items-center content-center bg-white p-2 border shadow-sm mb-5 gap-2 md:gap-0 ">
//         <div className="space-y-2">
//           <h2 className="text-sm md:text-3xl pl-2 font-semibold">
//             Folder Image
//           </h2>
//         </div>

//         <div>
//           <div className="relative flex-grow">
//             <div className="absolute p-3">
//               <Search className="h-4 md:h-5 w-4 md:w-5" />
//             </div>
//             <Input
//               placeholder="Search..."
//               className="pl-10 py-3 w-[300px] border  focus:ring-1 rounded"
//             />
//           </div>
//         </div>

//         <Sheet>
//           <SheetTrigger asChild>
//             <Button className="">+ Add Image</Button>
//           </SheetTrigger>
//           <SheetContent side="right" className="pt-20 overflow-auto">
//             <SheetHeader>
//               <SheetTitle className="text-center">Add Image</SheetTitle>
//               <hr />
//             </SheetHeader>
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)}>
//                 <div className="space-y-5">
//                   <FileInput
//                     control={form.control}
//                     name="images"
//                     label="Upload Images"
//                     accept="image/*"
//                     multiple
//                     maxFiles={20}
//                   />
//                 </div>

//                 {selectedFiles.length > 0 && (
//                   <div className="grid grid-cols-3 gap-4 mt-4">
//                     {selectedFiles.map((fileWithPreview, index) => (
//                       <div key={index} className="relative group">
//                         <Image
//                           src={fileWithPreview.preview}
//                           alt={`Preview ${index}`}
//                           className="w-full h-32 object-cover rounded"
//                           width={100}
//                           height={100}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 )}
//                 <div className="mt-4 flex justify-end ">
//                   <Button type="submit">Upload</Button>
//                 </div>
//               </form>
//             </Form>
//           </SheetContent>
//         </Sheet>
//       </div>
//     </>
//   );
// };

// export default TopBar;

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import * as React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FileInput from "@/utils/Form_Inputs/FileInput";
import { useCreateImagesMutation } from "@/redux/dailynews/images.api";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

interface FileWithPreview {
  file: File;
  preview: string;
}

type Inputs = {
  folder: string;
  images: FileWithPreview[];
};

interface TopBarProps {
  folderId: string;
}

const TopBar = ({ folderId }: TopBarProps) => {
  const [selectedFiles, setSelectedFiles] = React.useState<FileWithPreview[]>(
    []
  );
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [createImages] = useCreateImagesMutation();

  const form = useForm<Inputs>({
    defaultValues: {
      images: [],
    },
  });

  const onSubmit = async (data: Inputs) => {
    const toastId = toast.loading("Uploading images...");
    const formData = new FormData();

    if (!folderId) {
      toast.error("Folder ID is missing!", { id: toastId });
      return;
    }

    if (!Array.isArray(data.images) || data.images.length === 0) {
      toast.error("Please select at least one image", { id: toastId });
      return;
    }

    data.images.forEach((fileWithPreview: FileWithPreview) => {
      formData.append("images", fileWithPreview.file);
    });
    formData.append("folder", folderId);

    try {
      const result = await createImages(formData).unwrap();
      toast.success(result.message || "Images Uploaded Successfully!", {
        id: toastId,
        duration: 3000,
      });
      form.reset();
      setSheetOpen(false);
    } catch (err: any) {
      const errorMessage =
        err.data?.message || err.data?.errorMessages?.[0] || "Upload failed";
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div className="flex justify-between items-center content-center bg-white p-2 border shadow-sm mb-5 gap-2 md:gap-0 ">
      <div className="space-y-2">
        <h2 className="text-sm md:text-3xl pl-2 font-semibold">Folder Image</h2>
      </div>

      <div>
        <div className="relative flex-grow">
          <div className="absolute p-3">
            <Search className="h-4 md:h-5 w-4 md:w-5" />
          </div>
          <Input
            placeholder="Search..."
            className="pl-10 py-3 w-[300px] border  focus:ring-1 rounded"
          />
        </div>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button>+ Add Image</Button>
        </SheetTrigger>
        <SheetContent side="right" className="pt-2 overflow-auto">
          <SheetHeader>
            <SheetTitle className="text-center">Add Image</SheetTitle>
            <hr className="pb-5"/>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FileInput
                control={form.control}
                name="images"
                label="Upload Images"
                accept="image/*"
                multiple
                maxFiles={20}
              />
              <div className="mt-4 flex justify-end">
                <Button type="submit">Upload</Button>
              </div>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default TopBar;
