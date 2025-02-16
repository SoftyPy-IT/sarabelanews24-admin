/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  useDeleteVideoNewsMutation,
  useGetAllVideoNewsQuery,
} from "@/redux/dailynews/videoNews.api ";
import ActionDropdown from "@/utils/Action/ActionDropdown";
import { DataTable } from "@/utils/Table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";



const VideoList = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useGetAllVideoNewsQuery({});
  const [deleteVideoNews] = useDeleteVideoNewsMutation();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // console.log("News data fetched successfully", data);

  const videoNewsData =
    data?.videoNews?.map((item: any, index: any) => ({
      id: item._id,
      slNo: index + 1,
      reporterName: item.reporterName || "N/A",
      reporterType: item.reporterType || "N/A",
      images: item.images || "N/A",
      photojournalistName: item.photojournalistName || "N/A",
      newsTitle: item.newsTitle || "N/A",
      date: new Date(item.date).toLocaleDateString(),
      imageTagline: item.imageTagline || "N/A",
      videioJornalistName: item.videioJornalistName || "N/A",
      videoUrl: item.videoUrl || "N/A",
      category: item.category?.name || "N/A",
      newsType: item.newsType || "N/A",
      shortDescription: item.shortDescription || "N/A",
      description: item.description || "N/A",
      adminName: item.adminName || "N/A",
      slug: item.slug || "N/A",
    })) || []; 

  const handleEdit = (rowData: any) => {
    router.push(`/dashboard/list-video-news/update-details/${rowData.id}`);
  };

  const handleDelete = async (id: string) => {
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
          await deleteVideoNews(id).unwrap();
          Swal.fire("Deleted!", "Your activity has been deleted.", "success");
        }
      });
    } catch (err: any) {
      console.error("Error deleting news:", err);
      toast.error(err.message || "Failed to delete news.");
    }
  };

  const handleView = (rowData: any) => {
    router.push(`/dashboard/list-video-gallery/view-details/${rowData?.id}`);
  };

  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "slNo",
      header: "Sl. No.",
    },
    {
      accessorKey: "images",
      header: "Images",
      cell: ({ row }) => {
        const images = row.original.images;
        const imageUrl = Array.isArray(images) ? images[0] : images;

        return imageUrl && imageUrl !== "N/A" ? (
          <div className="relative w-16 h-16">
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
      accessorKey: "newsTitle",
      header: "News Title",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "videoUrl",
      header: "Video URL",
    },
    {
      accessorKey: "shortDescription",
      header: "Short Description",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "Action",
      header: "Action",
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
    <div className="overflow-x-auto bg-white p-3">
      <DataTable
        columns={columns}
        data={videoNewsData ?? []}
        filterKey="category"
        filterPlaceholder="Search by Category"
        pageSize={10}
        selectOptions={{
          key: "newsType",
          options: [
            { label: "Politics", value: "Politics" },
            { label: "Economy", value: "Economy" },
            { label: "Sports", value: "Sports" },
            { label: "Entertainment", value: "Entertainment" },
            { label: "Education", value: "Education" },
          ],
          placeholder: "Select News Type",
        }}
      />
    </div>
  );
};

export default VideoList;
