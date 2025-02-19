// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import {
//   useDeleteNewsMutation,
//   useGetAllNewsQuery,
// } from "@/redux/dailynews/news.api";
// import ActionDropdown from "@/utils/Action/ActionDropdown";
// import { DataTable } from "@/utils/Table/DataTable";
// import { ColumnDef } from "@tanstack/react-table";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import Swal from "sweetalert2";
// import TopBar from "./TopBar";
// import Loading from "@/app/loading";
// import Image from "next/image";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input"; // ShadCN Input
// import { useEffect, useState } from "react";
// import parse from "html-react-parser";
// import { TMeta, TQueryParam } from "@/types/api.types";
// import { updatePaginationParams } from "@/utils/pagination";
// import debounce from "lodash.debounce";
// import { Search } from "lucide-react";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// const tagColors = [
//   "border-blue-500 text-blue-500",
//   "border-green-500 text-green-500",
//   "border-red-500 text-red-500",
//   "border-black text-black",
//   "border-purple-500 text-purple-500",
//   "border-pink-500 text-pink-500",
//   "border-orange-500 text-orange-500",
//   "border-gray-500 text-gray-500",
// ];

// const NewsDataTable = () => {
//   const router = useRouter();
//   const [params, setParams] = useState<TQueryParam[]>([
//     { name: "page", value: "1" },
//     { name: "limit", value: "5" },
//   ]);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch data with dynamic params (includes search term)
//   const { data, isLoading } = useGetAllNewsQuery(params);
//   const [deleteNews] = useDeleteNewsMutation();
//   const fetchAllNews = data?.data?.news;
//   const meta = data?.data?.meta as TMeta;

//   const newsData =
//     fetchAllNews?.map((item: any, index: any) => ({
//       id: item._id,
//       slNo: index + 1,
//       images: item.images || "N/A",
//       title: item.newsTitle || "N/A",
//       category: item.category?.name || "N/A",
//       publishedDate: new Date(item.publishedDate).toLocaleDateString(),
//       description: item.description || "N/A",
//       newsTag: item.newsTag || [],
//       newsType: item.newsType || "N/A",
//       shortDescription: item.shortDescription || "N/A",
//       slug: item.slug || "N/A",
//     })) || [];

//   // Update API params when search input changes (debounced for performance)
//   useEffect(() => {
//     const debouncedSearch = debounce(() => {
//       setParams((prev) => {
//         const newParams = prev.filter((p) => p.name !== "searchTerm");
//         if (searchQuery) {
//           newParams.push({ name: "searchTerm", value: searchQuery });
//         }
//         return newParams;
//       });
//     }, 300); // Delay API calls by 300ms

//     debouncedSearch();
//     return () => debouncedSearch.cancel();
//   }, [searchQuery]);

//   const handleEdit = (rowData: any) => {
//     router.push(`/dashboard/list-news/update-details/${rowData.slug}`);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!",
//       }).then(async (result) => {
//         if (result.isConfirmed) {
//           await deleteNews(id).unwrap();
//           Swal.fire("Deleted!", "Your activity has been deleted.", "success");
//         }
//       });
//     } catch (err: any) {
//       console.error("Error deleting news:", err);
//       toast.error(err.message || "Failed to delete news.");
//     }
//   };

//   const handleView = (rowData: any) => {
//     router.push(`/dashboard/list-news/view-details/${rowData.id}`);
//   };

//   const columns: ColumnDef<any, any>[] = [
//     { accessorKey: "slNo", header: () => <div className="w-10 font-bold">SL. No.</div> },
//     { accessorKey: "publishedDate", header: () => <div className="w-20 font-bold">Pub. Date</div> },
//     {
//       accessorKey: "images",
//       header: () => <span className="font-bold flex justify-center">Images</span>,
//       cell: ({ row }) => {
//         const imageUrl = Array.isArray(row.original.images) ? row.original.images[0] : row.original.images;
//         return imageUrl && imageUrl !== "N/A" ? (
//           <div className="relative w-24 h-16">
//             <Image src={imageUrl} alt="News thumbnail" fill className="object-cover rounded-md" />
//           </div>
//         ) : (
//           <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
//             <span className="text-gray-400 text-xs">No image</span>
//           </div>
//         );
//       },
//     },
//     { accessorKey: "title", header: () => <span className="font-bold">Title</span> },
//     {
//       accessorKey: "newsTag",
//       header: () => <div className="w-32 font-bold flex justify-center">Tags</div>,
//       cell: ({ row }) => (
//         <div className="grid grid-cols-2 gap-2">
//           {row.original.newsTag.map((tag: string, index: number) => (
//             <Badge key={index} variant="outline" className={`p-1 rounded-full ${tagColors[index % tagColors.length]}`}>
//               {tag}
//             </Badge>
//           ))}
//         </div>
//       ),
//     },
//     { accessorKey: "category", header: () => <div className="w-32 font-bold">Category</div> },
//     {
//       accessorKey: "shortDescription",
//       header: () => <span className="font-bold flex justify-center">Short Description</span>,
//       cell: ({ row }) => {
//         const description = row.original.shortDescription || "";
//         return <div>{parse(description.length > 30 ? `${description.slice(0, 30)}...` : description)}</div>;
//       },
//     },
//     {
//       accessorKey: "Action",
//       header: () => <span className="font-bold">Action</span>,
//       cell: ({ row }) => (
//         <ActionDropdown
//           row={row}
//           onView={handleView}
//           onUpdate={handleEdit}
//           onDelete={() => handleDelete(row.original.id)}
//         />
//       ),
//     },
//   ];

//   const handlePaginationChange = (page: number) => {
//     setParams((prev) => updatePaginationParams(prev, page, meta?.limit || 5));
//   };

//   if (isLoading) {
//     return <Loading />;
//   }

//   return (
//     <>
//       <TopBar />
//       <div className="bg-white p-4 rounded">
//         <div className="mb-4 flex justify-between items-center">
//           <h2 className="text-lg font-semibold">News List</h2>
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="h-12 w-full rounded-lg border border-gray-200 pl-10 pr-4 text-sm outline-none focus:border-gray-300"
//             />
//           </div>
//         </div>
//         <DataTable columns={columns} data={newsData} meta={meta} onPaginationChange={handlePaginationChange} />
//         <Pagination>
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationPrevious onClick={() => handlePaginationChange(meta.page - 1)} disabled={meta.page === 1} />
//             </PaginationItem>
//             {[...Array(meta.totalPages)].map((_, i) => (
//               <PaginationItem key={i}>
//                 <PaginationLink onClick={() => handlePaginationChange(i + 1)} isActive={meta.page === i + 1}>
//                   {i + 1}
//                 </PaginationLink>
//               </PaginationItem>
//             ))}
//             <PaginationItem>
//               <PaginationNext onClick={() => handlePaginationChange(meta.page + 1)} disabled={meta.page === meta.totalPages} />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//       </div>
//     </>
//   );
// };

// export default NewsDataTable;
