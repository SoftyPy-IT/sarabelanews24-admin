/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import upload from "@public/assets/images/upload.webp";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import SelectInput from "@/utils/Form_Inputs/SelectInput";
import AddFolderModal from "../../folder/_components/AddFolderModal";
import { useGetAllFolderQuery } from "@/redux/dailynews/folder.api";
import Loading from "@/app/loading";

interface FileWithPreview {
  file: File;
  preview: string;
}

const TopBar = () => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [dragOver, setDragOver] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<FileWithPreview[]>([]);
  const { data, isLoading, isError } = useGetAllFolderQuery({});

  // Cleanup object URLs
  React.useEffect(() => {
    return () => {
      selectedFiles.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [selectedFiles]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  // type Inputs = {
  //   // ... (keep your existing form types)
  // };

  const form = useForm<Inputs>({
    // ... (keep your existing form setup)
  });

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    const files = event.dataTransfer.files;
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {/* Existing TopBar JSX remains unchanged */}

      <Sheet>
        <SheetTrigger asChild>
          <Button>+ Add Image</Button>
        </SheetTrigger>
        <SheetContent side="right" className="pt-20" style={{ maxWidth: "500px" }}>
          <SheetHeader>
            <SheetTitle className="text-center">Add Image</SheetTitle>
            <hr />
          </SheetHeader>
          <Form {...form}>
            <div className="space-y-5">
              {/* Folder selection and creation UI remains unchanged */}

              <div
                className={`flex flex-col items-center justify-center border-dashed border-2 rounded-xl p-6 my-4 space-y-4 ${
                  dragOver ? "border-green-500 bg-green-50" : "border-gray-300"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Image src={upload} alt="Upload Placeholder" className="h-32 w-32" />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                />
                <Button onClick={handleButtonClick}>Browse</Button>
                <h3>or drag images here</h3>
              </div>

              {/* Image previews grid */}
              {selectedFiles.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {selectedFiles.map((fileWithPreview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={fileWithPreview.preview}
                        alt={`Preview ${index}`}
                        className="w-full h-32 object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-end ">
              <Button className="mt-4 bg-green-500">Upload</Button>
            </div>
          </Form>
        </SheetContent>
      </Sheet>
      <AddFolderModal isOpen={open} onOpenChange={setOpen} />
    </>
  );
};

export default TopBar;


// // /* eslint-disable @typescript-eslint/no-unused-vars */
// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // "use client";

// // import * as React from "react";
// // import { Search } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Sheet,
// //   SheetContent,
// //   SheetHeader,
// //   SheetTitle,
// //   SheetTrigger,
// // } from "@/components/ui/sheet";
// // import Image from "next/image";
// // import { Form } from "@/components/ui/form";
// // import { useForm } from "react-hook-form";
// // import SelectInput from "@/utils/Form_Inputs/SelectInput";
// // // import CreateFolderModal from "./CreateFolderModal";
// // import { Input } from "@/components/ui/input";
// // import AddFolderModal from "../../folder/_components/AddFolderModal";
// // import { useGetAllFolderQuery } from "@/redux/dailynews/folder.api";
// // import Loading from "@/app/loading";
// // import FileInput from "@/utils/Form_Inputs/FileInput";
// // import { useCreateImagesMutation } from "@/redux/dailynews/images.api";
// // import toast from "react-hot-toast";

// // interface FileWithPreview {
// //   file: File;
// //   preview: string;
// // }
// // export type TProps = {
// //   isOpen: boolean;
// //   onOpenChange: (isOpen: boolean) => void;
// //   setIsOpen: (isOpen: boolean) => void;
// // };

// // const TopBar = ({ isOpen, onOpenChange, setIsOpen }: TProps) => {
// //   const fileInputRef = React.useRef<HTMLInputElement | null>(null);
// //   const [open, setOpen] = React.useState(false);
// //   const [dragOver, setDragOver] = React.useState(false);
// //   const [selectedFiles, setSelectedFiles] = React.useState<FileWithPreview[]>(
// //     []
// //   );
// //   const [createImages] = useCreateImagesMutation();
// //   const { data, isLoading, isError } = useGetAllFolderQuery({});
// //   const [sheetOpen, setSheetOpen] = React.useState(false);

// //   // Cleanup object URLs
// //   React.useEffect(() => {
// //     return () => {
// //       selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
// //     };
// //   }, [selectedFiles]);

// //   const onSubmit = async (data: Inputs) => {
// //     // const toastId = toast.loading("Uploading images...");
// //     const formData = new FormData();

// //     if (Array.isArray(data.images) && data.images.length > 0) {
// //       data.images.forEach((file: File) => {
// //         formData.append("images", file);
// //       });
// //     } else {
// //       toast.error("Please select at least one image");
// //       return;
// //     }

// //     formData.append("folder", data.folder);

// //     try {
// //       data.images.forEach((fileWithPreview: FileWithPreview) => {
// //         formData.append("images", fileWithPreview.file);
// //       });

// //       const result = await createImages(formData).unwrap();

// //       toast.success(result.message || "Images Uploaded Successfully!");

// //       // Reset form and close sheet
// //       form.reset();
// //       setSheetOpen(false);
// //       // onOpenChange(false);

// //     } catch (err: any) {
// //       const errorMessage =
// //         err.data?.message || err.data?.errorMessages?.[0] || "Upload failed";
// //       toast.error(errorMessage);
// //     }
// //   };

// //   type Inputs = {
// //     folder: string;
// //     images: FileWithPreview[];
// //   };

// //   const form = useForm<Inputs>({
// //     defaultValues: {
// //       folder: "",

// //       images: [],
// //     },
// //   });

// //   if (isLoading) {
// //     return <Loading />;
// //   }
// //   return (
// //     <>
// //       <div className="flex justify-between items-center content-center bg-white p-2 border rounded shadow-sm mb-5 gap-2 md:gap-0 ">
// //         <div className="space-y-2">
// //           <h2 className="text-sm md:text-3xl pl-2 font-semibold">All Images</h2>
// //         </div>

// //         <div>
// //           <div className="relative flex-grow">
// //             <div className="absolute p-3">
// //               <Search className="h-4 md:h-5 w-4 md:w-5" />
// //             </div>
// //             <Input
// //               placeholder="Search..."
// //               className="pl-10 py-3 w-[300px] border  focus:ring-1 rounded"
// //             />
// //           </div>
// //         </div>

// //         <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
// //           <SheetTrigger asChild>
// //             <Button onClick={() => setSheetOpen(true)}>+ Add Image</Button>
// //           </SheetTrigger>
// //           <SheetContent
// //             side="right"
// //             className="pt-4 overflow-y-auto"
// //             style={{ maxWidth: "500px" }}
// //           >
// //             <SheetHeader>
// //               <SheetTitle className="text-center">Add Image</SheetTitle>
// //               <hr />
// //             </SheetHeader>
// //             <Form {...form}>
// //               <form onSubmit={form.handleSubmit(onSubmit)}>
// //                 <div className="space-y-5">
// //                   <div className="w-full mt-5 flex items-center gap-2">
// //                     <div className="w-[400px]">
// //                       <SelectInput
// //                         control={form.control}
// //                         name="folder"
// //                         placeholder="Select From Folder"
// //                         options={
// //                           data?.map(
// //                             (program: { name: string; _id: string }) => ({
// //                               label: program.name,
// //                               value: program._id,
// //                             })
// //                           ) || []
// //                         }

// //                       />
// //                     </div>
// //                     <h1>OR</h1>
// //                     <Button className="h-[46px] " onClick={() => setOpen(true)}>
// //                       Create New Folder
// //                     </Button>
// //                   </div>
// //                   <FileInput
// //                     control={form.control}
// //                     name="images"
// //                     label="Upload Images"
// //                     accept="image/*"
// //                     multiple
// //                     maxFiles={20}
// //                   />

// //                 </div>
// //                 {/* Image previews grid */}
// //                 {/* {selectedFiles.length > 0 && (
// //                   <div className="grid grid-cols-3 gap-4 mt-4">
// //                     {selectedFiles.map((fileWithPreview, index) => (
// //                       <div key={index} className="relative group">
// //                         <Image
// //                           src={fileWithPreview.preview}
// //                           alt={`Preview ${index}`}
// //                           className="w-full h-32 object-cover rounded"
// //                           width={100}
// //                           height={100}
// //                         />
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )} */}
// //                 <div className="mt-4 flex justify-end ">
// //                   <Button className="mt-4 bg-green-500" type="submit">
// //                     Upload
// //                   </Button>
// //                 </div>
// //               </form>
// //             </Form>
// //           </SheetContent>
// //         </Sheet>
// //       </div>
// //       <AddFolderModal isOpen={open} onOpenChange={setOpen} />
// //     </>
// //   );
// // };

// // export default TopBar;

// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
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
// import upload from "@public/assets/images/upload.webp";
// import { Form } from "@/components/ui/form";
// import { useForm } from "react-hook-form";
// import SelectInput from "@/utils/Form_Inputs/SelectInput";
// // import CreateFolderModal from "./CreateFolderModal";
// import { Input } from "@/components/ui/input";
// import AddFolderModal from "../../folder/_components/AddFolderModal";
// import { useGetAllFolderQuery } from "@/redux/dailynews/folder.api";
// import Loading from "@/app/loading";
// import FileInput from "@/utils/Form_Inputs/FileInput";
// import { useCreateImagesMutation } from "@/redux/dailynews/images.api";
// import toast from "react-hot-toast";

// interface FileWithPreview {
//   file: File;
//   preview: string;
// }
// export type TProps = {
//   isOpen: boolean;
//   onOpenChange: (isOpen: boolean) => void;
//   setIsOpen: (isOpen: boolean) => void;
// };

// const TopBar = ({ isOpen, onOpenChange, setIsOpen }: TProps) => {
//   const [open, setOpen] = React.useState(false);
//   const [selectedFiles, setSelectedFiles] = React.useState<FileWithPreview[]>(
//     []
//   );
//   const [createImages] = useCreateImagesMutation();
//   const { data: datafolder, isLoading, isError } = useGetAllFolderQuery({});

//   console.log("datafolder", datafolder);
//   // Cleanup object URLs
//   React.useEffect(() => {
//     return () => {
//       selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
//     };
//   }, [selectedFiles]);

//   const options = Array.isArray(datafolder?.data)
//     ? datafolder.data.map((folder: { name: string; _id: string }) => ({
//         label: folder.name,
//         value: folder._id,
//       }))
//     : [];

//     const onSubmit = async (data: Inputs) => {
//       console.log("Selected Folder:", data.folder); // Check the folder value here
//       try {
//         const res = await createImages(data).unwrap();
//         console.log("response:", res);
    
//         if (res) {
//           toast.success("Image Upload Successfully!");
//         }
//         form.reset();
//         onOpenChange(false);
//       } catch (error) {
//         console.error(error);
//       }
//     };
    

//   type Inputs = {
//     folder: string;
//     images: FileWithPreview[];
//   };

//   const form = useForm<Inputs>({
//     defaultValues: {
//       folder: "",
//       images: [],
//     },
//   });

//   if (isLoading) {
//     return <Loading />;
//   }
//   return (
//     <>
//       <div className="flex justify-between items-center content-center bg-white p-2 border rounded shadow-sm mb-5 gap-2 md:gap-0 ">
//         <div className="space-y-2">
//           <h2 className="text-sm md:text-3xl pl-2 font-semibold">All Images</h2>
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
//           <SheetContent
//             side="right"
//             className="pt-4"
//             style={{ maxWidth: "500px" }}
//           >
//             <SheetHeader>
//               <SheetTitle className="text-center">Add Image</SheetTitle>
//               <hr />
//             </SheetHeader>
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)}>
//                 <div className="space-y-5">
//                   <div className="w-full mt-5 flex items-center gap-2">
//                     <div className="w-[400px]">
//                       <SelectInput
//                         control={form.control}
//                         name="folder"
//                         placeholder="Select From Folder"
//                         options={options}
//                       />
//                     </div>
//                     <h1>OR</h1>
//                     <Button className="h-[46px] " onClick={() => setOpen(true)}>
//                       Create New Folder
//                     </Button>
//                   </div>
//                   <FileInput
//                     control={form.control}
//                     name="images"
//                     label="Upload Images"
//                     accept="image/*"
//                     multiple
//                     maxFiles={5}
//                   />
//                   {/* <div
//                   className={`flex flex-col items-center justify-center border-dashed border-2 rounded-xl p-6 my-4 space-y-4 ${
//                     dragOver
//                       ? "border-green-500 bg-green-50"
//                       : "border-gray-300"
//                   }`}
//                   onDragOver={handleDragOver}
//                   onDragLeave={handleDragLeave}
//                   onDrop={handleDrop}
//                 >
//                   <Image
//                     src={upload}
//                     alt="Upload Placeholder"
//                     className="h-32 w-32"
//                   />
                 
//                   <Button onClick={handleButtonClick}>Browse</Button>
//                   <h3>or drag images here</h3>
//                 </div> */}
//                 </div>
//                 {/* Image previews grid */}
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
//                   <Button className="mt-4 bg-green-500" type="submit">
//                     Upload
//                   </Button>
//                 </div>
//               </form>
//             </Form>
//           </SheetContent>
//         </Sheet>
//       </div>
//       <AddFolderModal isOpen={open} onOpenChange={setOpen} />
//     </>
//   );
// };

// export default TopBar;







