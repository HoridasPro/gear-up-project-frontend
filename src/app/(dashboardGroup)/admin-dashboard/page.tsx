// // import UserTable from "./UserTable";
// import { IUser } from "@/type/type-gear";
// import { getAdminUsers } from "../_actions/get-admin-users";
// import UserTable from "./users/page";

// export default async function UsersPage() {
//   const result:IUser = await getAdminUsers();

//   const users = result?.data || [];

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">User Management</h1>
//         <p className="text-muted-foreground">
//           Manage all registered users
//         </p>
//       </div>

//       <UserTable initialUsers={users} />
//     </div>
//   );
// }