// /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { RentalResponse } from "@/type/type-gear";
// // import { getProviderOrders } from "../../_actions/get-provider-orders";
// // import OrdersTable from "./ordersTable";

// // const OrdersPage = async () => {
// //   const result: RentalResponse = await getProviderOrders();
// //   console.log("Result =", result);
// //   console.log("Orders =", result?.data);

// //   const orders = result?.data || [];

// //   return (
// //     <div className="space-y-6">
// //       <div>
// //         <h1 className="text-3xl font-bold">Orders</h1>
// //         <p className="text-muted-foreground">
// //           Manage all incoming rental orders.
// //         </p>
// //       </div>

// //       <OrdersTable orders={orders} />
// //     </div>
// //   );
// // };

// // export default OrdersPage;
// import { RentalResponse } from "@/type/type-gear";
// // import { getProviderOrders } from "../../_actions/get-provider-orders";
// // import OrdersTable from "./ordersTable";
// import OrdersTable from './ordersTable';
// import { getProviderOrders } from "../../_actions/get-provider-orders";
// // import { getProviderOrders } from "../../_actions/get-provider-gear";

// const OrdersPage = async () => {
//   const result: RentalResponse = await getProviderOrders();

//   console.log("API Result =", result);

//   // ব্যাকএন্ড যদি { data: [...] } অথবা সরাসরি { data: { orders: [...] } } পাঠায়
//   const rawOrders = Array.isArray(result?.data)
//     ? result.data
//     : (result?.data as any)?.orders || [];

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Orders</h1>
//         <p className="text-muted-foreground">
//           Manage all incoming rental orders.
//         </p>
//       </div>

//       <OrdersTable orders={rawOrders} />
//     </div>
//   );
// };

// export default OrdersPage;