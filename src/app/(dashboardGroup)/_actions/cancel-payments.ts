// "use server";

// export const cancelPayment = async (sessionId: string) => {
//   try {
//     const response = await fetch(
//       `${process.env.BACKEND_API_URL}/api/payments/cancel`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           sessionId,
//         }),
//         cache: "no-store",
//       },
//     );

//     const result = await response.json();

//     if (!response.ok) {
//       return {
//         success: false,
//         message: result.message || "Failed to cancel payment",
//       };
//     }

//     return result;
//   } catch (error) {
//     console.error("Cancel payment error:", error);

//     return {
//       success: false,
//       message: "Something went wrong",
//     };
//   }
// };
