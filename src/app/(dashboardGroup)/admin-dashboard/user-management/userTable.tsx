// "use client";

// import { updateAdminStatus } from "@/app/(dashboardGroup)/_actions/get-admin-status";
// import { CustomerIfo } from "@/type/type-gear";
// import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import { useState, useTransition } from "react";

// interface UserTableProps {
//   users: CustomerIfo[];
//   totalPages: number;
//   currentPage: number;
//   currentSearch: string;
//   limit?: number;
// }

// export default function UserTables({
//   users,
//   totalPages,
//   currentPage,
//   currentSearch,
//   limit = 10,
// }: UserTableProps) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const [isPending, startTransition] = useTransition();
//   const [loadingId, setLoadingId] = useState<string | number | null>(null);

//   // 1. Search Input State
//   const [searchTerm, setSearchTerm] = useState(currentSearch || "");

//   // 🔍 টাইপ করার সাথে সাথে সার্চ ও URL আপডেট করার ফাংশন
//   const handleSearchChange = (value: string) => {
//     setSearchTerm(value);

//     const params = new URLSearchParams(searchParams?.toString() || "");

//     if (value.trim() !== "") {
//       params.set("search", value.trim());
//     } else {
//       params.delete("search");
//     }

//     // সার্চ করলে প্রথম পেজে পাঠাবে
//     params.set("page", "1");
//     params.set("limit", limit.toString());

//     startTransition(() => {
//       // router.push দিয়ে Server Component-কে রি-ফেচ করতে বলা হয়
//       router.push(`${pathname}?${params.toString()}`);
//     });
//   };

//   // 🔘 Page Change Handler
//   const handlePageChange = (newPage: number) => {
//     const params = new URLSearchParams(searchParams?.toString() || "");
//     params.set("page", newPage.toString());
//     params.set("limit", limit.toString());

//     startTransition(() => {
//       router.push(`${pathname}?${params.toString()}`);
//     });
//   };

//   // 🔘 Status Update Handler
//   const handleToggleStatus = async (
//     id: string | number,
//     currentStatus: string,
//   ) => {
//     const nextStatus = currentStatus === "ACTIVE" ? "SUSPEND" : "ACTIVE";
//     setLoadingId(id);

//     try {
//       const res = await updateAdminStatus(id, nextStatus);

//       if (res?.success) {
//         router.refresh();
//       } else {
//         alert(res?.message || "Failed to update status");
//       }
//     } catch (error) {
//       console.error("Status Update Error:", error);
//       alert("Something went wrong!");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   const effectiveTotalPages = totalPages && totalPages > 0 ? totalPages : 1;

//   return (
//     <div className="space-y-4">
//       {/* Search Input */}
//       <div className="flex items-center gap-4 justify-between">
//         <div className="relative w-full max-w-sm">
//           <input
//             type="text"
//             placeholder="Search by name or email..."
//             value={searchTerm}
//             onChange={(e) => handleSearchChange(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         {isPending && (
//           <span className="text-sm text-blue-600 font-medium animate-pulse">
//             Searching...
//           </span>
//         )}
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
//         <table className="w-full text-left border-collapse">
//           <thead className="bg-gray-100 text-gray-700 font-semibold text-sm">
//             <tr>
//               <th className="p-3 border-b">Name</th>
//               <th className="p-3 border-b">Email</th>
//               <th className="p-3 border-b">Role</th>
//               <th className="p-3 border-b">Status</th>
//               <th className="p-3 border-b text-center">Action</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y text-sm">
//             {users && users.length > 0 ? (
//               users.map((user, index) => {
//                 const userId = user.id || index;
//                 const isUserActive = user.status === "ACTIVE";

//                 return (
//                   <tr key={userId} className="hover:bg-gray-50">
//                     <td className="p-3 font-medium">{user.name || "N/A"}</td>
//                     <td className="p-3 text-gray-600">{user.email || "N/A"}</td>
//                     <td className="p-3 text-gray-600">{user.role || "USER"}</td>
//                     <td className="p-3">
//                       <span
//                         className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
//                           isUserActive
//                             ? "bg-green-100 text-green-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {user.status || "SUSPEND"}
//                       </span>
//                     </td>
//                     <td className="p-3 text-center">
//                       <button
//                         onClick={() =>
//                           handleToggleStatus(userId, user.status || "SUSPEND")
//                         }
//                         disabled={loadingId === userId}
//                         className={`px-3 py-1 rounded text-xs font-semibold transition disabled:opacity-50 ${
//                           isUserActive
//                             ? "bg-red-500 text-white hover:bg-red-600"
//                             : "bg-green-500 text-white hover:bg-green-600"
//                         }`}
//                       >
//                         {loadingId === userId
//                           ? "Updating..."
//                           : isUserActive
//                             ? "Suspend"
//                             : "Activate"}
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan={5} className="p-6 text-center text-gray-500">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex items-center justify-between pt-2">
//         <p className="text-sm text-gray-600">
//           Page <span className="font-semibold">{currentPage}</span> of{" "}
//           <span className="font-semibold">{effectiveTotalPages}</span>
//         </p>

//         <div className="space-x-2">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage <= 1 || isPending}
//             className="px-3 py-1 border rounded text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage >= effectiveTotalPages || isPending}
//             className="px-3 py-1 border rounded text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { updateAdminStatus } from "../../_actions/get-admin-status"; // আপনার সঠিক ইম্পোর্ট পাথ দিন
import { CustomerIfo } from "@/type/type-gear";

interface UserTableProps {
  users: CustomerIfo[];
  totalPages: number;
  currentPage: number;
  currentSearch: string;
  limit?: number;
}

export default function UserTables({
  users,
  totalPages,
  currentPage,
  currentSearch,
  limit = 10,
}: UserTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  console.log("just limit", limit);

  const [isPending, startTransition] = useTransition();
  const [loadingId, setLoadingId] = useState<string | number | null>(null);

  const [searchTerm, setSearchTerm] = useState(currentSearch || "");
  const [prevSearch, setPrevSearch] = useState(currentSearch);

  // Search Param Caching Fix
  if (prevSearch !== currentSearch) {
    setPrevSearch(currentSearch);
    setSearchTerm(currentSearch || "");
  }

  // 🔍 ১. সার্চ হ্যান্ডলার (router.refresh যুক্ত করা হয়েছে)
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    params.set("page", "1");
    params.set("limit", limit.toString());

    startTransition(() => {
      // URL পরিবর্তন করার সাথে সাথে Server Component কে বাধ্যতামূলক Re-fetch করানো
      router.push(`${pathname}?${params.toString()}`);
      router.refresh(); // 🟢 এই লাইনটি সার্চ রিয়েল-টাইমে আপডেট করবে
    });
  };

  // 🔘 ২. পেজিনেশন হ্যান্ডলার (router.refresh যুক্ত করা হয়েছে)
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("page", page.toString());
    params.set("limit", limit.toString());

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
      // router.refresh(); // 🟢 এই লাইনটি নতুন পেজের ডাটা সাথে সাথে আনবে
    });
  };
  // const handlePageChange = (page: number) => {
  //   const params = new URLSearchParams(searchParams.toString());

  //   params.set("page", page.toString());

  //   // Debug
  //   console.log("limit prop =", limit);

  //   params.set("limit", limit.toString());

  //   router.push(`${pathname}?${params.toString()}`);
  // };

  // 🔘 ৩. স্ট্যাটাস আপডেট হ্যান্ডলার
  const handleToggleStatus = async (
    id: string | number,
    currentStatus: string,
  ) => {
    const nextStatus = currentStatus === "ACTIVE" ? "SUSPEND" : "ACTIVE";
    setLoadingId(id);

    try {
      const res = await updateAdminStatus(String(id), nextStatus);

      if (res?.success) {
        router.refresh();
      } else {
        alert(res?.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Status Update Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoadingId(null);
    }
  };

  const effectiveTotalPages = totalPages && totalPages > 0 ? totalPages : 1;

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="flex items-center gap-4 justify-between">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {isPending && (
          <span className="text-sm text-blue-600 font-medium animate-pulse">
            Loading...
          </span>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 font-semibold text-sm">
            <tr>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Role</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y text-sm">
            {users && users.length > 0 ? (
              users.map((user, index) => {
                const userId = user.id || index;
                const isUserActive = user.status === "ACTIVE";

                return (
                  <tr key={userId} className="hover:bg-gray-50">
                    <td className="p-3 font-medium">{user.name || "N/A"}</td>
                    <td className="p-3 text-gray-600">{user.email || "N/A"}</td>
                    <td className="p-3 text-gray-600">{user.role || "N/A"}</td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          isUserActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status || "SUSPEND"}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() =>
                          handleToggleStatus(userId, user.status || "SUSPEND")
                        }
                        disabled={loadingId === userId}
                        className={`px-3 py-1 rounded text-xs font-semibold transition disabled:opacity-50 ${
                          isUserActive
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                      >
                        {loadingId === userId
                          ? "Updating..."
                          : isUserActive
                            ? "Suspend"
                            : "Activate"}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-sm text-gray-600">
          Page <span className="font-semibold">{currentPage}</span> of{" "}
          <span className="font-semibold">{effectiveTotalPages}</span>
        </p>

        <div className="space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1 || isPending}
            className="px-3 py-1 border rounded text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= effectiveTotalPages || isPending}
            className="px-3 py-1 border rounded text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState, useTransition } from "react";
// import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import { updateAdminStatus } from "../../_actions/get-admin-status";
// // import { updateAdminStatus } from "@/actions/user-actions";

// export interface User {
//   id: string | number;
//   name: string;
//   email: string;
//   role: string;
//   status: "ACTIVE" | "SUSPEND" | string;
// }

// interface UserTableProps {
//   users: User[];
//   totalPages: number;
//   currentPage: number;
//   currentSearch: string;
//   limit?: number;
// }

// export default function UserTables({
//   users,
//   totalPages,
//   currentPage,
//   currentSearch,
//   limit = 10,
// }: UserTableProps) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const [isPending, startTransition] = useTransition();
//   const [loadingId, setLoadingId] = useState<string | number | null>(null);

//   // Search State Sync
//   const [searchTerm, setSearchTerm] = useState(currentSearch || "");
//   const [prevSearch, setPrevSearch] = useState(currentSearch);

//   if (prevSearch !== currentSearch) {
//     setPrevSearch(currentSearch);
//     setSearchTerm(currentSearch || "");
//   }

//   // Handle Search Input Change
//   const handleSearchChange = (value: string) => {
//     setSearchTerm(value);

//     const params = new URLSearchParams(searchParams?.toString() || "");

//     if (value.trim() !== "") {
//       params.set("search", value.trim());
//     } else {
//       params.delete("search");
//     }

//     params.set("page", "1");
//     params.set("limit", limit.toString());

//     startTransition(() => {
//       router.push(`${pathname}?${params.toString()}`);
//     });
//   };

//   // Handle Pagination Change
//   const handlePageChange = (newPage: number) => {
//     const params = new URLSearchParams(searchParams?.toString() || "");
//     params.set("page", newPage.toString());
//     params.set("limit", limit.toString());

//     startTransition(() => {
//       router.push(`${pathname}?${params.toString()}`);
//     });
//   };

//   // Handle Action Button (Suspend / Activate)
//   const handleToggleStatus = async (
//     id: string | number,
//     currentStatus: string,
//   ) => {
//     const nextStatus = currentStatus === "ACTIVE" ? "SUSPEND" : "ACTIVE";
//     setLoadingId(id);

//     try {
//       const res = await updateAdminStatus(String(id), nextStatus);

//       if (res?.success) {
//         router.refresh();
//       } else {
//         alert(res?.message || "Failed to update status");
//       }
//     } catch (error) {
//       console.error("Status Update Error:", error);
//       alert("Something went wrong!");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   const effectiveTotalPages = totalPages && totalPages > 0 ? totalPages : 1;

//   return (
//     <div className="space-y-4">
//       {/* Top Bar: Search Input */}
//       <div className="flex items-center gap-4 justify-between">
//         <div className="relative w-full max-w-sm">
//           <input
//             type="text"
//             placeholder="Search by name or email..."
//             value={searchTerm}
//             onChange={(e) => handleSearchChange(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         {isPending && (
//           <span className="text-sm text-blue-600 font-medium animate-pulse">
//             Loading...
//           </span>
//         )}
//       </div>

//       {/* Data Table */}
//       <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
//         <table className="w-full text-left border-collapse">
//           <thead className="bg-gray-100 text-gray-700 font-semibold text-sm">
//             <tr>
//               <th className="p-3 border-b">Name</th>
//               <th className="p-3 border-b">Email</th>
//               <th className="p-3 border-b">Role</th>
//               <th className="p-3 border-b">Status</th>
//               <th className="p-3 border-b text-center">Action</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y text-sm">
//             {users && users.length > 0 ? (
//               users.map((user, index) => {
//                 const userId = user.id || index;
//                 const isUserActive = user.status === "ACTIVE";

//                 return (
//                   <tr key={userId} className="hover:bg-gray-50">
//                     <td className="p-3 font-medium">{user.name || "N/A"}</td>
//                     <td className="p-3 text-gray-600">{user.email || "N/A"}</td>
//                     <td className="p-3 text-gray-600">{user.role || "USER"}</td>
//                     <td className="p-3">
//                       <span
//                         className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
//                           isUserActive
//                             ? "bg-green-100 text-green-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {user.status || "SUSPEND"}
//                       </span>
//                     </td>
//                     <td className="p-3 text-center">
//                       <button
//                         onClick={() =>
//                           handleToggleStatus(userId, user.status || "SUSPEND")
//                         }
//                         disabled={loadingId === userId}
//                         className={`px-3 py-1 rounded text-xs font-semibold transition disabled:opacity-50 ${
//                           isUserActive
//                             ? "bg-red-500 text-white hover:bg-red-600"
//                             : "bg-green-500 text-white hover:bg-green-600"
//                         }`}
//                       >
//                         {loadingId === userId
//                           ? "Updating..."
//                           : isUserActive
//                             ? "Suspend"
//                             : "Activate"}
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan={5} className="p-6 text-center text-gray-500">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex items-center justify-between pt-2">
//         <p className="text-sm text-gray-600">
//           Page <span className="font-semibold">{currentPage}</span> of{" "}
//           <span className="font-semibold">{effectiveTotalPages}</span>
//         </p>

//         <div className="space-x-2">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage <= 1 || isPending}
//             className="px-3 py-1 border rounded text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage >= effectiveTotalPages || isPending}
//             className="px-3 py-1 border rounded text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
