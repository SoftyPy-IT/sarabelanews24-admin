/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ImgZoomModal from "./ImgZoomModal";
import {
  useDeleteImagesMutation,
  useGetAllImagesQuery,
} from "@/redux/dailynews/images.api";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
const AllImages = () => {
  const [openZoom, setOpenZoom] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  
 
  const [currentPage, setCurrentPage] = React.useState(1);
  const limit = 12; // Number of images per page
  
  const { data, isLoading, isError } = useGetAllImagesQuery({
    page: currentPage,
    limit,
  });
  const [deleteImage] = useDeleteImagesMutation();


  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error loading images.</h1>;
  }
  
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setOpenZoom(true);
  };



  const handleDelete = async (id: string, public_id: string) => {
    const toastId = toast.loading("Deleting image...");
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await deleteImage({ id, public_id }).unwrap();
        toast.success("Image deleted successfully!", {
          id: toastId,
          duration: 3000,
        });

        Swal.fire("Deleted!", "Your image has been deleted.", "success");
      }
    } catch (err: any) {
      console.error("Error deleting Image:", err);


      const errorMessage =
        err?.data?.message || "Failed to delete Image.";
      toast.error(errorMessage, {
        id: toastId,
        duration: 3000,
      });
    }
  };

  const totalPages = data?.totalPages || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>

      <div className="w-full">
        <div className="text-gray-900">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 p-1 md:p-4">
            {data?.map((image: any) => (
              <div key={image._id} className="relative group">
                {/* Image */}
                <Image
                  src={image.url}
                  className="w-full h-full rounded shadow-sm bg-gray-500 aspect-square cursor-pointer"
                  alt={`Image ${image._id}`}
                  onClick={() => handleImageClick(image.url)}
                  width={200}
                  height={200}
                  priority
                />

                <button
                  className="absolute top-2 right-2 text-red-500 p-2 hover:bg-gray-200 hover:rounded-full opacity-0 group-hover:opacity-100 transition"
                  onClick={() => handleDelete(image._id, image.public_id)}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <Pagination className="my-10">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === index + 1}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={() =>
                          handlePageChange(Math.min(totalPages, currentPage + 1))
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
      </div>

      {/* Zoom Modal */}
      <ImgZoomModal
        isOpen={openZoom}
        onOpenChange={setOpenZoom}
        selectedImage={selectedImage}
      />
    </>
  );
};

export default AllImages;
