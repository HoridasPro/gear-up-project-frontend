// "use client";

// import { useEffect, useState, Suspense } from "react";
// import { useSearchParams } from "next/navigation";
// import { CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";
// import Link from "next/link";
// import { confirmPayment } from "../_actions/confirm-payment";

// function PaymentContent() {
//   const searchParams = useSearchParams();

//   const isSuccess = searchParams.get("success") === "true";

//   // 👈 cancel=true এবং canceled=true দুটিই একসাথে সাপোর্ট করবে
//   const isCanceled =
//     searchParams.get("canceled") === "true" ||
//     searchParams.get("cancel") === "true";

//   const sessionId = searchParams.get("session_id");

//   const [loading, setLoading] = useState(true);
//   const [confirmed, setConfirmed] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const handleConfirmation = async () => {
//       // 🛑 ১. ক্যানসেল হলে সরাসরি লোডিং বন্ধ হবে
//       if (isCanceled) {
//         setLoading(false);
//         return;
//       }

//       // 🟢 ২. পেমেন্ট সাকসেস হলে কনফার্মেশন রান হবে
//       if (isSuccess) {
//         try {
//           if (sessionId) {
//             const res = await confirmPayment(sessionId);
//             if (res?.success || res?.status === "success") {
//               setConfirmed(true);
//             } else {
//               setErrorMessage(res?.message || "Payment confirmation failed!");
//             }
//           } else {
//             setConfirmed(true);
//           }
//         } catch (error: any) {
//           console.error("Confirmation Error:", error);
//           setErrorMessage(error.message || "Failed to confirm payment.");
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setLoading(false);
//       }
//     };

//     handleConfirmation();
//   }, [isSuccess, isCanceled, sessionId]);

//   // 🔄 লোডিং স্টেট
//   if (loading) {
//     return (
//       <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
//         <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
//         <p className="mt-4 text-gray-600 font-medium">
//           Verifying payment status, please wait...
//         </p>
//       </div>
//     );
//   }

//   // 💛 CANCELED STATE (ক্যানসেল করে ব্যাক আসলে)
//   if (isCanceled) {
//     return (
//       <div className="mx-auto my-16 max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
//         <AlertCircle className="mx-auto h-16 w-16 text-amber-500" />
//         <h1 className="mt-4 text-2xl font-bold text-gray-900">
//           Payment Canceled
//         </h1>
//         <p className="mt-2 text-sm text-gray-600">
//           You canceled the payment process. No money was deducted from your
//           account.
//         </p>
//         <div className="mt-6 space-y-3">
//           <Link
//             href="/"
//             className="block w-full rounded-lg bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700 transition-all"
//           >
//             Try Renting Again
//           </Link>
//           <Link
//             href="/"
//             className="block w-full rounded-lg bg-gray-100 py-3 font-medium text-gray-700 hover:bg-gray-200 transition-all"
//           >
//             Go Back Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // 💚 SUCCESS STATE (পেমেন্ট সফল হলে)
//   if (isSuccess && (confirmed || !sessionId)) {
//     return (
//       <div className="mx-auto my-16 max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
//         <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
//         <h1 className="mt-4 text-2xl font-bold text-gray-900">
//           Payment Successful!
//         </h1>
//         <p className="mt-2 text-sm text-gray-600">
//           Thank you! Your rental order payment has been successfully processed.
//         </p>
//         <Link
//           href="/my-rentals"
//           className="mt-6 inline-block w-full rounded-lg bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700 transition-all"
//         >
//           View My Orders
//         </Link>
//       </div>
//     );
//   }

//   // ❤️ ERROR STATE (পেমেন্ট ফেল করলে বা অন্য কোনো সমস্যা হলে)
//   return (
//     <div className="mx-auto my-16 max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
//       <XCircle className="mx-auto h-16 w-16 text-red-500" />
//       <h1 className="mt-4 text-2xl font-bold text-gray-900">
//         Payment Failed or Invalid
//       </h1>
//       <p className="mt-2 text-sm text-gray-600">
//         {errorMessage || "We couldn't process your payment status."}
//       </p>
//       <Link
//         href="/"
//         className="mt-6 inline-block w-full rounded-lg bg-gray-100 py-3 font-medium text-gray-700 hover:bg-gray-200 transition-all"
//       >
//         Go Back Home
//       </Link>
//     </div>
//   );
// }

// export default function PaymentPage() {
//   return (
//     <Suspense
//       fallback={
//         <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
//           <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
//         </div>
//       }
//     >
//       <PaymentContent />
//     </Suspense>
//   );
// }
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { confirmPayment } from "../_actions/confirm-payment"; // 👈 Action Import

function PaymentContent() {
  const searchParams = useSearchParams();

  const isSuccess = searchParams.get("success") === "true";
  const isCanceled =
    searchParams.get("canceled") === "true" ||
    searchParams.get("cancel") === "true";
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleConfirmation = async () => {
      // ১. ক্যানসেল হলে
      if (isCanceled) {
        setLoading(false);
        return;
      }

      // ২. সাকসেস হলে এবং sessionId থাকলে ডাটাবেজে PAID করার রিকোয়েস্ট যাবে
      if (isSuccess) {
        try {
          if (sessionId) {
            // 🚀 ব্যাকএন্ডে sessionId পাঠিয়ে Status 'PAID' করা হচ্ছে
            const res = await confirmPayment(sessionId);
            
            if (res?.success || res?.status === "success") {
              setConfirmed(true);
            } else {
              setErrorMessage(res?.message || "Failed to update database!");
            }
          } else {
            setConfirmed(true);
          }
        } catch (error: any) {
          console.error("Confirmation Error:", error);
          setErrorMessage(error.message || "Failed to confirm payment.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    handleConfirmation();
  }, [isSuccess, isCanceled, sessionId]);

  // 🔄 ১. লোডিং (ভেরিফাই হচ্ছে)
  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
        <p className="mt-4 text-gray-600 font-medium">
          Updating your order status to PAID, please wait...
        </p>
      </div>
    );
  }

  // 💛 ২. ক্যানসেল পেজ
  if (isCanceled) {
    return (
      <div className="mx-auto my-16 max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
        <AlertCircle className="mx-auto h-16 w-16 text-amber-500" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Payment Canceled
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          You canceled the payment process. No money was deducted from your account.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block w-full rounded-lg bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700 transition-all"
        >
          Try Again
        </Link>
      </div>
    );
  }

  // 💚 ৩. সফলভাবে PAID হলে
  if (isSuccess && confirmed) {
    return (
      <div className="mx-auto my-16 max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Payment Successful!
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Thank you! Your order has been marked as PAID in our system.
        </p>
        <Link
          href="/my-rentals"
          className="mt-6 inline-block w-full rounded-lg bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700 transition-all"
        >
          View My Orders
        </Link>
      </div>
    );
  }

  // ❤️ ৪. ফেল করলে
  return (
    <div className="mx-auto my-16 max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
      <XCircle className="mx-auto h-16 w-16 text-red-500" />
      <h1 className="mt-4 text-2xl font-bold text-gray-900">
        Payment Failed
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        {errorMessage || "Could not confirm payment."}
      </p>
      <Link
        href="/"
        className="mt-6 inline-block w-full rounded-lg bg-gray-100 py-3 font-medium text-gray-700 hover:bg-gray-200 transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}