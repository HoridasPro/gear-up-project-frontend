// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { IUser } from "@/type/type-gear";

// interface UserTableProps {
//   initialUsers:  CustomerIfo[];
// }

// export default function UserTable({ initialUsers }: UserTableProps) {
//   return (
//     <div className="overflow-x-auto rounded-lg border bg-white">
//       <table className="w-full">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3 text-left">Name</th>
//             <th className="p-3 text-left">Email</th>
//             <th className="p-3 text-left">Role</th>
//             <th className="p-3 text-left">Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {initialUsers.length > 0 ? (
//             initialUsers.map((user: IUser) => (
//               <tr key={user.id} className="border-t">
//                 <td className="p-3">{user.name}</td>
//                 <td className="p-3">{user.email}</td>
//                 <td className="p-3">{user.role}</td>
//                 <td className="p-3">
//                   <span
//                     className={`rounded-full px-3 py-1 text-sm font-medium ${
//                       user.status === "ACTIVE"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {user.status}
//                   </span>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={4} className="p-6 text-center">
//                 No users found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }