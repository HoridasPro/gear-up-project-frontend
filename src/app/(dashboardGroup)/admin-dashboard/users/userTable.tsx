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
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1100px]">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-3 text-left">SI</th>
            <th className="p-3 text-left">Profile</th>
            <th className="p-3 text-left">Users Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">CreatedAt</th>
            <th className="p-3 text-left">UpdatedAt</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {users && users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-4">{index + 1}</td>
                {/* Photo */}
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
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 text-xs">
                      N/A
                    </div>
                  )}
                </td>

                {/* Name */}
                <td className="p-3 font-medium">{user.name}</td>

                {/* Email */}
                <td className="p-3 text-sm text-gray-600">{user.email}</td>

                {/* Address */}
                <td className="max-w-[180px] truncate p-3 text-sm">
                  {user.address || "Not provided"}
                </td>

                {/* Created Date */}
                <td className="p-3 text-sm text-gray-600">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-GB")
                    : "N/A"}
                </td>

                {/* Updated Date */}
                <td className="p-3 text-sm text-gray-600">
                  {user.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString("en-GB")
                    : "N/A"}
                </td>
                <td className="p-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.role === "ADMIN"
                        ? "bg-purple-100 text-purple-700"
                        : user.role === "PROVIDER"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : user.status === "SUSPEND"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="p-8 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
