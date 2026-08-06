import { IUserInfo } from "@/type/type-gear";
// import UserTable from "./userTable";

import UserTable from "./userTable";
import { getAdminUsers } from "../../_actions/get-admin-users";
// import { getAdminUsers } from "../../_actions/get-admin-status";

export default async function UsersPage() {
  const result: IUserInfo = await getAdminUsers();

  const users = result?.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">Manage all registered users</p>
      </div>

      <UserTable users={users} />
    </div>
  );
}
