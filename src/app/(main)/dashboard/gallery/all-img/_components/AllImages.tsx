"use client";
import * as React from "react";
import Image from "next/image";
import img1 from "@public/assets/images/product-01.png";
import img2 from "@public/assets/images/product-02.png";
import img3 from "@public/assets/images/product-03.png";
import img4 from "@public/assets/images/product-04.png";
import img5 from "@public/assets/images/product-01.png";
import img6 from "@public/assets/images/product-02.png";
import img7 from "@public/assets/images/product-03.png";
import img8 from "@public/assets/images/product-04.png";
import img9 from "@public/assets/images/product-01.png";
import img10 from "@public/assets/images/product-01.png";
import img11 from "@public/assets/images/product-02.png";
import img12 from "@public/assets/images/product-03.png";

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
import {Trash2 } from "lucide-react";


const initialImages = [
  { id: 1, image: img1.src },
  { id: 2, image: img2.src },
  { id: 3, image: img3.src },
  { id: 4, image: img4.src },
  { id: 5, image: img5.src },
  { id: 6, image: img6.src },
  { id: 7, image: img7.src },
  { id: 8, image: img8.src },
  { id: 9, image: img9.src },
  { id: 10, image: img10.src },
  { id: 11, image: img11.src },
  { id: 12, image: img12.src },
];

const AllImages = () => {
  const [images, setImages] = React.useState(initialImages);
  const [openZoom, setOpenZoom] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);


  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setOpenZoom(true);
  };

  const handleDeleteImage = (id: number) => {
    setImages((prevImages) => prevImages.filter((img) => img.id !== id));
  };

  return (
    <>
      <div className="w-full">
        <div className="text-gray-900">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 p-1 md:p-4">
            {images.map((row) => (
              <div key={row.id} className="relative group">
                <Image
                  src={row.image}
                  className="w-full h-full rounded shadow-sm bg-gray-500 aspect-square cursor-pointer"
                  alt={`Image ${row.id}`}
                  onClick={() => handleImageClick(row.image)}
                  width={100}
                  height={100}
                />

                <button
                  onClick={() => handleDeleteImage(row.id)}
                  className="absolute top-2 left-2 bg-gray-800 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 color="red" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <Pagination className="my-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
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
