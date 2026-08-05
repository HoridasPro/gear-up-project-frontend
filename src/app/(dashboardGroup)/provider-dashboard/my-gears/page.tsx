// import { GearResponse } from "@/type/type-gear";
// import { getProviderGears } from "../../_actions/get-provider-gear";
// // import { getProviderGear } from "../_actions/get-provider-gears";

// export default async function ProviderDashboard() {
//   const result: GearResponse = await getProviderGears();

//   const gears = result?.data || [];

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Provider Dashboard</h1>
//         <p className="text-gray-500">Overview of your inventory</p>
//       </div>

//       {/* Stats */}
//       {/* <div className="grid grid-cols-3 gap-5">
//         <div className="rounded-lg border bg-white p-6">
//           <h2 className="text-3xl font-bold">{gears.length}</h2>
//           <p className="text-gray-500">Total Gear</p>
//         </div>
//       </div> */}

//       {/* Inventory */}
//       <div className="rounded-lg border bg-white">
//         <table className="w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">Image</th>
//               <th className="p-3 text-left">Title</th>
//               <th className="p-3 text-left">Category</th>
//               <th className="p-3 text-center">Price</th>
//               <th className="p-3 text-center">Quantity</th>
//               <th className="p-3 text-left">Brand</th>
//             </tr>
//           </thead>

//           <tbody>
//             {gears.map((gear) => (
//               <tr key={gear.id} className="border-t">
//                 <td className="p-3">
//                   <img
//                     src={gear.gearItemImage}
//                     alt={gear.title}
//                     className="h-12 w-12 rounded object-cover"
//                   />
//                 </td>

//                 <td className="p-3">{gear.title}</td>

//                 <td className="p-3">{gear.category}</td>

//                 <td className="p-3 text-center">৳ {gear.price}</td>

//                 <td className="p-3 text-center">{gear.quantity}</td>

//                 <td className="p-3">{gear.brand}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
