// "use client";

// import { useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { cancelPayment } from "../../_actions/cancel-payments";
// // import { cancelPayment } from "../_actions/cancel-payments";

// export default function PaymentContent() {
//   const searchParams = useSearchParams();

//   const isCancelled = searchParams.get("cancel");
//   const sessionId = searchParams.get("session_id");

//   useEffect(() => {
//     const handleCancelPayment = async () => {
//       if (isCancelled === "true" && sessionId) {
//         const result = await cancelPayment(sessionId);

//         console.log("Cancel Payment Result =", result);
//       }
//     };

//     handleCancelPayment();
//   }, [isCancelled, sessionId]);

//   return (
//     <div>
//       {isCancelled === "true" && (
//         <p className="text-red-500">
//           Payment cancelled.
//         </p>
//       )}
//     </div>
//   );
// }