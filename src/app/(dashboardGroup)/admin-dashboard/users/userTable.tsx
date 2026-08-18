"use client";

import Image from "next/image";
import { CustomerIfo } from "@/type/type-gear";

interface UserTableProps {
  users: CustomerIfo[];
}

export default function UserTable({ users }: UserTableProps) {
  console.log("UserTable users length =", users?.length);
  console.log("UserTable users =", users);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 text-slate-100 shadow-xl backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
          {/* Header */}
          <thead>
            <tr className="border-b border-slate-800/80 bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <th scope="col" className="px-4 py-4 text-center">
                SI
              </th>
              <th scope="col" className="px-4 py-4">
                Profile
              </th>
              <th scope="col" className="px-4 py-4">
                Users Name
              </th>
              <th scope="col" className="px-4 py-4">
                Email
              </th>
              <th scope="col" className="px-4 py-4">
                Address
              </th>
              <th scope="col" className="px-4 py-4">
                CreatedAt
              </th>
              <th scope="col" className="px-4 py-4">
                UpdatedAt
              </th>
              <th scope="col" className="px-4 py-4">
                Role
              </th>
              <th scope="col" className="px-4 py-4">
                Status
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-800/80 bg-slate-900/40">
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className="transition-colors duration-150 ease-in-out hover:bg-slate-800/50"
                >
                  {/* SI */}
                  <td className="whitespace-nowrap px-4 py-4 text-center text-xs font-medium text-slate-400">
                    {index + 1}
                  </td>

                  {/* Photo */}
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
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 text-xs font-medium text-slate-400 ring-2 ring-slate-700">
                        N/A
                      </div>
                    )}
                  </td>

                  {/* Name */}
                  <td className="whitespace-nowrap px-4 py-4 font-semibold text-white">
                    {user.name}
                  </td>

                  {/* Email */}
                  <td className="whitespace-nowrap px-4 py-4 text-slate-300">
                    {user.email}
                  </td>

                  {/* Address */}
                  <td className="max-w-[180px] truncate px-4 py-4 text-slate-400">
                    {user.address || "Not provided"}
                  </td>

                  {/* Created Date */}
                  <td className="whitespace-nowrap px-4 py-4 text-slate-400">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-GB")
                      : "N/A"}
                  </td>

                  {/* Updated Date */}
                  <td className="whitespace-nowrap px-4 py-4 text-slate-400">
                    {user.updatedAt
                      ? new Date(user.updatedAt).toLocaleDateString("en-GB")
                      : "N/A"}
                  </td>

                  {/* Role */}
                  <td className="whitespace-nowrap px-4 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        user.role === "ADMIN"
                          ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          : user.role === "PROVIDER"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : "bg-slate-800/80 text-slate-300 border border-slate-700/80"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="whitespace-nowrap px-4 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        user.status === "ACTIVE"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : user.status === "SUSPEND"
                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))
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
  );
}
