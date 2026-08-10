"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { updateAdminStatus } from "../../_actions/get-admin-status";
import { CustomerIfo } from "@/type/type-gear";
import Image from "next/image";

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
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isPending && <p className="text-sm text-blue-500">Loading...</p>}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-100 text-sm font-semibold text-gray-700">
            <tr>
              <th className="border-b p-3">SI</th>
              <th className="border-b p-3">Profile</th>
              <th className="border-b p-3">Name</th>
              <th className="border-b p-3">Email</th>
              <th className="border-b p-3">Role</th>
              <th className="border-b p-3">Status</th>
              <th className="border-b p-3">Created At</th>
              <th className="border-b p-3">Updated At</th>
              <th className="border-b p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y text-sm">
            {users && users.length > 0 ? (
              users.map((user, index) => {
                const userId = user.id || index;
                const isUserActive = user.status === "ACTIVE";

                // Role Color
                const roleColor =
                  user.role === "ADMIN"
                    ? "bg-purple-100 text-purple-800"
                    : user.role === "PROVIDER"
                      ? "bg-blue-100 text-blue-800"
                      : user.role === "CUSTOMER"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800";

                return (
                  <tr key={userId} className="hover:bg-gray-50">
                    {/* SI */}
                    <td className="p-3">{index + 1}</td>

                    {/* Profile */}
                    <td className="p-3">
                      {user.profilePhoto ? (
                        <Image
                          src={user.profilePhoto}
                          alt={user.name || "User"}
                          width={45}
                          height={45}
                          className="h-11 w-11 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                    </td>

                    {/* Name */}
                    <td className="p-3 font-medium">{user.name || "N/A"}</td>

                    {/* Email */}
                    <td className="p-3 text-gray-600">{user.email || "N/A"}</td>

                    {/* Role */}
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${roleColor}`}
                      >
                        {user.role || "N/A"}
                      </span>
                    </td>

                    {/* Status */}
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

                    {/* Created At */}
                    <td className="p-3 text-gray-600">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    {/* Updated At */}
                    <td className="p-3 text-gray-600">
                      {user.updatedAt
                        ? new Date(user.updatedAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    {/* Action */}
                    <td className="p-3 text-center">
                      <button
                        onClick={() =>
                          handleToggleStatus(userId, user.status || "SUSPEND")
                        }
                        disabled={loadingId === userId}
                        className={`rounded px-3 py-1 text-xs font-semibold transition disabled:opacity-50 ${
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
                <td colSpan={9} className="p-6 text-center text-gray-500">
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
            className="rounded border px-3 py-1 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= effectiveTotalPages || isPending}
            className="rounded border px-3 py-1 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
