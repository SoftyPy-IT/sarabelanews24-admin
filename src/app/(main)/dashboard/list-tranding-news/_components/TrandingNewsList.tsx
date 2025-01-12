"use client";
import ActionDropdown from "@/utils/Action/ActionDropdown";
import { DataTable } from "@/utils/Table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const data = [
  {
    id: "1",
    reporterType: "নিজস্ব প্রতিনিধি",
    reporterName: "জন ডো",
    newsArea: "মুন্সিগঞ্জ, ঢাকা",
    reportedDateAndTime: "২০২৪-১২-২৮ ১২:০০",
    photoJournalistName: "জেন স্মিথ",
    newsType: "Politics",
    publishedDate: "২০২৪-১২-২৮",
    newsTitle: "রাজনৈতিক সংবাদ আপডেট",
  },
  {
    id: "2",
    reporterType: "প্রতিনিধি",
    reporterName: "এলিস জনসন",
    newsArea: "সোনাডাঙ্গা, খুলনা",
    reportedDateAndTime: "২০২৪-১২-২৭ ১৫:৩০",
    photoJournalistName: "টম ক্লার্ক",
    newsType: "Sports",
    publishedDate: "২০২৪-১২-২৭",
    newsTitle: "খেলার ইভেন্টের প্রধান দিক",
  },
  {
    id: "3",
    reporterType: "প্রতিনিধি",
    reporterName: "এলিস জনসন",
    newsArea: "সোনাডাঙ্গা, খুলনা",
    reportedDateAndTime: "২০২৪-১২-২৭ ১৫:৩০",
    photoJournalistName: "টম ক্লার্ক",
    newsType: "Economy",
    publishedDate: "২০২৪-১২-২৭",
    newsTitle: "খেলার ইভেন্টের প্রধান দিক",
  },
  {
    id: "4",
    reporterType: "প্রতিনিধি",
    reporterName: "এলিস জনসন",
    newsArea: "খেলা",
    reportedDateAndTime: "২০২৪-১২-২৭ ১৫:৩০",
    photoJournalistName: "টম ক্লার্ক",
    newsType: "Entertainment",
    publishedDate: "২০২৪-১২-২৭",
    newsTitle: "খেলার ইভেন্টের প্রধান দিক",
  },
  {
    id: "5",
    reporterType: "প্রতিনিধি",
    reporterName: "এলিস জনসন",
    newsArea: "খেলা",
    reportedDateAndTime: "২০২৪-১২-২৭ ১৫:৩০",
    photoJournalistName: "টম ক্লার্ক",
    newsType: "Politics",
    publishedDate: "২০২৪-১২-২৭",
    newsTitle: "খেলার ইভেন্টের প্রধান দিক",
  },
  {
    id: "6",
    reporterType: "প্রতিনিধি",
    reporterName: "এলিস জনসন",
    newsArea: "খেলা",
    reportedDateAndTime: "২০২৪-১২-২৭ ১৫:৩০",
    photoJournalistName: "টম ক্লার্ক",
    newsType: "Bangladesh",
    publishedDate: "২০২৪-১২-২৭",
    newsTitle: "খেলার ইভেন্টের প্রধান দিক",
  },
  {
    id: "7",
    reporterType: "প্রতিনিধি",
    reporterName: "এলিস জনসন",
    newsArea: "খেলা",
    reportedDateAndTime: "২০২৪-১২-২৭ ১৫:৩০",
    photoJournalistName: "টম ক্লার্ক",
    newsType: "Economy",
    publishedDate: "২০২৪-১২-২৭",
    newsTitle: "খেলার ইভেন্টের প্রধান দিক",
  },
  {
    id: "8",
    reporterType: "প্রতিনিধি",
    reporterName: "এলিস জনসন",
    newsArea: "খেলা",
    reportedDateAndTime: "২০২৪-১২-২৭ ১৫:৩০",
    photoJournalistName: "টম ক্লার্ক",
    newsType: "Sports",
    publishedDate: "২০২৪-১২-২৭",
    newsTitle: "খেলার ইভেন্টের প্রধান দিক",
  },
  {
    id: "9",
    reporterType: "প্রতিনিধি",
    reporterName: "এলিস জনসন",
    newsArea: "খেলা",
    reportedDateAndTime: "২০২৪-১২-২৭ ১৫:৩০",
    photoJournalistName: "টম ক্লার্ক",
    newsType: "Education",
    publishedDate: "২০২৪-১২-২৭",
    newsTitle: "খেলার ইভেন্টের প্রধান দিক",
  },
  {
    id: "10",
    reporterType: "প্রতিনিধি",
    reporterName: "এলিস জনসন",
    newsArea: "খেলা",
    reportedDateAndTime: "২০২৪-১২-২৭ ১৫:৩০",
    photoJournalistName: "টম ক্লার্ক",
    newsType: "Education",
    publishedDate: "২০২৪-১২-২৭",
    newsTitle: "খেলার ইভেন্টের প্রধান দিক",
  },
];

const TrandingNewsList = () => {
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (rowData: any) => {
    router.push(`/dashboard/list-tranding-news/update-details/${rowData?.id}`);
    // console.log("Editing row:", rowData);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        Swal.fire({
          title: "Deleted!",
          text: "Delete Successful",
          icon: "success",
        });
      }
    });
    console.log("Deleting row:", rowData);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleView = (rowData: any) => {
    router.push(`/dashboard/list-tranding-news/view-details/${rowData?.id}`);
    // console.log("Viewing row:", rowData);
  };

  //the columns :
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "reporterType",
      header: "Reporter Type",
    },
    {
      accessorKey: "reporterName",
      header: "Reporter Name",
    },
    {
      accessorKey: "newsArea",
      header: "News Area",
    },
    {
      accessorKey: "reportedDateAndTime",
      header: "Reported Date & Time",
    },
    {
      accessorKey: "photoJournalistName",
      header: "Photo Journalist Name",
    },
    {
      accessorKey: "newsType",
      header: "News Type",
    },
    {
      accessorKey: "publishedDate",
      header: "Published Date",
    },
    {
      accessorKey: "newsTitle",
      header: "News Title",
    },
    {
      accessorKey: "Action",
      header: "Action",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        data={data}
        filterKey="reporterName"
        filterPlaceholder="Search by Reporter Name"
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

export default TrandingNewsList;
