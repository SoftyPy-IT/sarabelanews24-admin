/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useDeleteNewsMutation,
  useGetAllNewsQuery,
} from "@/redux/dailynews/news.api";
import ActionDropdown from "@/utils/Action/ActionDropdown";
import { DataTable } from "@/utils/Table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import TopBar from "./TopBar";
import Loading from "@/app/loading";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

import parse from "html-react-parser";

const tagColors = [
  "border-blue-500 text-blue-500",
  "border-green-500 text-green-500",
  "border-red-500 text-red-500",
  "border-black text-black",
  "border-purple-500 text-purple-500",
  "border-pink-500 text-pink-500",
  "border-orange-500 text-orange-500",
  "border-gray-500 text-gray-500",
];

const NewsDataTable = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useGetAllNewsQuery({});
  const [deleteNews] = useDeleteNewsMutation();

  if (isLoading) {
    return <Loading />;
  }

  const newsData =
    data?.news?.map((item: any, index: any) => ({
      id: item._id,
      slNo: index + 1,
      images: item.images || "N/A",
      title: item.newsTitle || "N/A",
      category: item.category?.name || "N/A",
      publishedDate: new Date(item.publishedDate).toLocaleDateString(),
      description: item.description || "N/A",
      newsTag: item.newsTag || [],
      newsType: item.newsType || "N/A",
      shortDescription: item.shortDescription || "N/A",
      slug: item.slug || "N/A",
    })) || [];

  const handleEdit = (rowData: any) => {
    router.push(`/dashboard/list-news/update-details/${rowData.slug}`);
  };

  const handleDelete = async (id: string) => {
    console.log(id)
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteNews(id).unwrap();
          Swal.fire("Deleted!", "Your activity has been deleted.", "success");
        }
      });
    } catch (err: any) {
      console.error("Error deleting news:", err);
      toast.error(err.message || "Failed to delete news.");
    }
  };

  const handleView = (rowData: any) => {
    router.push(`/dashboard/list-news/view-details/${rowData.id}`);
  };

  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "slNo",
      header: () => <div className="w-10 font-bold">SL. No.</div>,
    },
    {
      accessorKey: "publishedDate",
      header: () => <div className="w-20 font-bold">Pub. Date</div>,
    },
    {
      accessorKey: "images",
      header: () => (
        <span className="font-bold flex justify-center">Images</span>
      ),
      cell: ({ row }) => {
        const images = row.original.images;
        const imageUrl = Array.isArray(images) ? images[0] : images;

        return imageUrl && imageUrl !== "N/A" ? (
          <div className="relative w-24 h-16">
            <Image
              src={imageUrl}
              alt="News thumbnail"
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 64px) 100vw, 64px"
            />
          </div>
        ) : (
          <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-400 text-xs">No image</span>
          </div>
        );
      },
    },
  
    {
      accessorKey: "title",
      header: () => (
        <span className="font-bold ">Title</span>
      ),
    
    },
    {
      accessorKey: "newsTag",
      header: () => (
        <div className="w-32 font-bold flex justify-center">Tags</div>
      ),
      cell: ({ row }) => {
        const tags = row.original.newsTag;
        return (

          <div className="grid grid-cols-2 gap-2">
            {tags.map((tag: string, index: number) => {
              const colorClass = tagColors[index % tagColors.length];

              return (
                <Badge
                  key={index}
                  variant="outline"
                  className={`p-1 rounded-full flex justify-center items-center  ${colorClass}`}

                >
                  {tag}
                </Badge>
              );
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: () => <div className="w-32 font-bold ">Category</div>,
    },

    {
      accessorKey: "shortDescription",
      header: () => (
        <span className="font-bold flex justify-center">Short Description</span>
      ),
      cell: ({ row }) => {
        const description = row.original.shortDescription || "";
        const maxLength = 30;
        const slicedDescription =
          description.length > maxLength
            ? `${description.slice(0, maxLength)}...`
            : description;

        return <div>{parse(slicedDescription)}</div>;
      },
    },

  
    {
      accessorKey: "Action",
      header: () => <span className="font-bold">Action</span>,
      cell: ({ row }: any) => (
        <ActionDropdown
          row={row}
          onView={handleView}
          onUpdate={handleEdit}
          onDelete={() => handleDelete(row.original.id)}
        />
      ),
    },
  ];

  return (
    <>
      <TopBar />
      <div className="overflow-x-auto bg-white p-2 rounded">
        <DataTable
          columns={columns}
          data={newsData ?? []}
          filterKey="publishedDate"
          filterPlaceholder="Search by Published Date"
          pageSize={10}
          selectOptions={{
            key: "category",
            options: [
              { label: "বিনোদন", value: "বিনোদন" },
              { label: "উপসম্পাদকীয়", value: "উপসম্পাদকীয়" },
              { label: "জাতীয়", value: "জাতীয়" },
              { label: "লাইফ স্টাইল", value: "লাইফ স্টাইল" },
              { label: "ভ্রমণ ও পর্যটন", value: "ভ্রমণ ও পর্যটন" },
              { label: "স্বাস্থ্য", value: "স্বাস্থ্য" },
              { label: "শিক্ষা", value: "শিক্ষা" },
              { label: "ধর্ম ও ইসলাম", value: "ধর্ম ও ইসলাম" },
              { label: "চাকরি", value: "চাকরি" },
            ],
            placeholder: "Select News Type",
          }}
        />
      </div>
    </>
  );
};

export default NewsDataTable;
