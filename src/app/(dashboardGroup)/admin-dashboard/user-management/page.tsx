 

import { getAdminUsersSearch } from "../../_actions/get-admin-status";
import UserTables from "./userTable";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function UsersPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;

  const search = resolvedSearchParams?.search ?? "";
  const page = Number(resolvedSearchParams?.page) || 1;
  const limit = Number(resolvedSearchParams?.limit) || 10;
  console.log("search params", search);
  console.log("page", page);
  console.log("limit", limit);

  // Fetch users server-side
  const { users, totalPages } = await getAdminUsersSearch(search, page, limit);
  console.log("totalPages:", totalPages);
  console.log("users:", users.length);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-gray-500">
          Server-side Search, Pagination & Action Table
        </p>
      </div>

      <UserTables
        users={users}
        totalPages={totalPages}
        currentPage={page}
        currentSearch={search}
        limit={limit}
      />
    </div>
  );
}
