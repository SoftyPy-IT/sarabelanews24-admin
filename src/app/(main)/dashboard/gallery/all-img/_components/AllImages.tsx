/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
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
import { TQueryParam } from "@/types/api.types";
import Loader from "@/app/loading";

const AllImages = () => {
  const [openZoom, setOpenZoom] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);


  const [params, setParams] = React.useState<TQueryParam[]>([]);
  const { data, isLoading, refetch } = useGetAllImagesQuery([
    ...params,
  ]) as any;
  console.log(data);

  React.useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  const [deleteImage] = useDeleteImagesMutation();

  if (isLoading) return <Loader />;

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
        await deleteImage({ id, public_id }).unwrap();
        toast.success("Image deleted successfully!", {
          id: toastId,
          duration: 3000,
        });
        Swal.fire("Deleted!", "Your image has been deleted.", "success");
      }
    } catch (err: any) {
      console.error("Error deleting Image:", err);
      toast.error(err?.data?.message || "Failed to delete Image.", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  const images = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      <div className="w-full">
        <div className="text-gray-900">
          <div className="grid grid-cols-4 gap-2 lg:gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 p-1 md:p-4">
            {images.map((image: any) => (
              <div key={image._id} className="relative group">
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

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="my-10 flex justify-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                  className={
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                  className={
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
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
