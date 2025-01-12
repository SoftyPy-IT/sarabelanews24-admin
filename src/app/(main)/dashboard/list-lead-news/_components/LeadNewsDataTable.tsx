/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllNewsQuery } from "@/redux/dailynews/news.api";
import ActionDropdown from "@/utils/Action/ActionDropdown";
import { DataTable } from "@/utils/Table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const LeadNewsDataTable = () => {
  const router = useRouter();

  // API call
  const { data, isLoading, isError } = useGetAllNewsQuery({});

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  console.log("News data fetched successfully", data);

  // Map data to match the columns
  const newsData = data?.data?.news?.map((item: any) => ({
    id: item._id,
    adminName: item.adminName || "N/A",
    category: item.category?.name || "N/A",
    createdAt: new Date(item.createdAt).toLocaleString(),
    date: new Date(item.date).toLocaleDateString(),
    description: item.description || "N/A",
    imageTagline: item.imageTagline || "N/A",
    metaTitle: item.metaTitle || "N/A",
    metaDescription: item.metaDescription || "N/A",
    newsCategory: item.newsCategory || "N/A",
    newsType: item.newsType || "N/A",
    shortDescription: item.shortDescription || "N/A",
    slug: item.slug || "N/A",
    title: item.title || "N/A",
  }));

  const handleEdit = (rowData: any) => {
    router.push(`/dashboard/list-lead-news/update-details/${rowData.id}`);
  };

  const handleDelete = (rowData: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Delete Successful", "success");
        console.log("Deleting row:", rowData);
      }
    });
  };

  const handleView = (rowData: any) => {
    router.push(`/dashboard/list-lead-news/view-details/${rowData.id}`);
  };

  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "adminName",
      header: "Admin Name",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "imageTagline",
      header: "Image Tagline",
    },
    {
      accessorKey: "metaTitle",
      header: "Meta Title",
    },
    {
      accessorKey: "metaDescription",
      header: "Meta Description",
    },
    {
      accessorKey: "newsCategory",
      header: "News Category",
    },
    {
      accessorKey: "newsType",
      header: "News Type",
    },
    {
      accessorKey: "shortDescription",
      header: "Short Description",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "Action",
      header: "Action",
      cell: ({ row }: any) => (
        <ActionDropdown
          row={row}
          onView={handleView}
          onUpdate={handleEdit}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <DataTable
        columns={columns}
        data={newsData}
        filterKey="adminName"
        filterPlaceholder="Search by Admin Name"
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

export default LeadNewsDataTable;
