"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { updateAdminStatus } from "../../_actions/get-admin-status";
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
   
      router.push(`${pathname}?${params.toString()}`);
      router.refresh();
    });
  };


  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("page", page.toString());
    params.set("limit", limit.toString());

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
      router.refresh(); 
    });
  };
   
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

 