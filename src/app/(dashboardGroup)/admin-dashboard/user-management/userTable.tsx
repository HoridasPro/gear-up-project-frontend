"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { updateAdminStatus } from "../../_actions/get-admin-status";
import { UserTableProps } from "@/type/type-gear";
import Image from "next/image";
import { updateAdminRole } from "../../_actions/adminRolePatch";
import { toast } from "sonner";

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

  const [isPending, startTransition] = useTransition();
  const [loadingId, setLoadingId] = useState<string | number | null>(null);

  const [searchTerm, setSearchTerm] = useState(currentSearch || "");
  const [prevSearch, setPrevSearch] = useState(currentSearch);

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
        toast.success(res?.message || "User status updated successfully");
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Status Update Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoadingId(null);
    }
  };

  const handleRoleChange = async (
    id: string | number,
    role: "ADMIN" | "PROVIDER" | "CUSTOMER",
  ) => {
    setLoadingId(id);

    try {
      const res = await updateAdminRole(String(id), role);

      if (res?.success) {
        toast.success(res?.message || "User role updated successfully");
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update role");
      }
    } catch (error) {
      console.error("Role Update Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoadingId(null);
    }
  };

  const effectiveTotalPages = totalPages && totalPages > 0 ? totalPages : 1;

  return (
    <div className="w-full space-y-4">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full rounded-xl border border-slate-800/80 bg-slate-900/60 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 shadow-xl backdrop-blur-xl transition-all duration-200 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        {isPending && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-blue-400">
            Searching...
          </div>
        )}
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 text-slate-100 shadow-xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th scope="col" className="px-4 py-4 text-center">
                  SI
                </th>
                <th scope="col" className="px-4 py-4">
                  Profile
                </th>
                <th scope="col" className="px-4 py-4">
                  Name
                </th>
                <th scope="col" className="px-4 py-4">
                  Email
                </th>
                <th scope="col" className="px-4 py-4">
                  Role
                </th>
                <th scope="col" className="px-4 py-4">
                  Status
                </th>
                <th scope="col" className="px-4 py-4">
                  Created At
                </th>
                <th scope="col" className="px-4 py-4">
                  Updated At
                </th>
                <th scope="col" className="px-4 py-4 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/80 bg-slate-900/40">
              {users && users.length > 0 ? (
                users.map((user, index) => {
                  const userId = user.id || index;
                  const isUserActive = user.status === "ACTIVE";

                  const roleColor =
                    user.role === "ADMIN"
                      ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                      : user.role === "PROVIDER"
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        : user.role === "CUSTOMER"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-slate-800/80 text-slate-300 border border-slate-700/80";

                  return (
                    <tr
                      key={userId}
                      className="transition-colors duration-150 ease-in-out hover:bg-slate-800/50"
                    >
                      <td className="whitespace-nowrap px-4 py-4 text-center text-xs font-medium text-slate-400">
                        {index + 1}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        {user.profilePhoto ? (
                          <Image
                            src={user.profilePhoto.trim()}
                            alt={user.name || "User"}
                            width={45}
                            height={45}
                            className="h-11 w-11 rounded-full object-cover ring-2 ring-slate-700"
                          />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-slate-300 ring-2 ring-slate-700">
                            {user.name?.charAt(0).toUpperCase() || "U"}
                          </div>
                        )}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 font-semibold text-white">
                        {user.name || "N/A"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-slate-300">
                        {user.email || "N/A"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <select
                          value={user.role || "CUSTOMER"}
                          disabled={loadingId === userId}
                          onChange={(e) =>
                            handleRoleChange(
                              userId,
                              e.target.value as
                                | "ADMIN"
                                | "PROVIDER"
                                | "CUSTOMER",
                            )
                          }
                          className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold outline-none transition disabled:cursor-not-allowed disabled:opacity-50 ${roleColor}`}
                        >
                          <option
                            value="CUSTOMER"
                            className="bg-slate-800 text-slate-200"
                          >
                            Customer
                          </option>
                          <option
                            value="PROVIDER"
                            className="bg-slate-800 text-slate-200"
                          >
                            Provider
                          </option>
                          <option
                            value="ADMIN"
                            className="bg-slate-800 text-slate-200"
                          >
                            Admin
                          </option>
                        </select>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                            isUserActive
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isUserActive ? "bg-emerald-400" : "bg-rose-400"
                            }`}
                          />
                          {user.status || "SUSPEND"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-slate-400">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-slate-400">
                        {user.updatedAt
                          ? new Date(user.updatedAt).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-center">
                        <button
                          onClick={() =>
                            handleToggleStatus(userId, user.status || "SUSPEND")
                          }
                          disabled={loadingId === userId}
                          className={`inline-flex items-center justify-center rounded-lg px-3.5 py-1.5 text-xs font-medium transition duration-150 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer ${
                            isUserActive
                              ? "bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                          }`}
                        >
                          {loadingId === userId ? (
                            <span className="flex items-center gap-1">
                              <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              Updating...
                            </span>
                          ) : isUserActive ? (
                            "Suspend"
                          ) : (
                            "Activate"
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-12 text-center text-slate-400"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 pt-2 sm:flex-row">
        <p className="text-sm text-slate-400">
          Page{" "}
          <span className="font-semibold text-slate-200">{currentPage}</span> of{" "}
          <span className="font-semibold text-slate-200">
            {effectiveTotalPages}
          </span>
        </p>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1 || isPending}
            className="rounded-lg border border-slate-800/80 bg-slate-900/60 px-4 py-1.5 text-sm font-medium text-slate-300 backdrop-blur-xl transition duration-150 hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= effectiveTotalPages || isPending}
            className="rounded-lg border border-slate-800/80 bg-slate-900/60 px-4 py-1.5 text-sm font-medium text-slate-300 backdrop-blur-xl transition duration-150 hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
