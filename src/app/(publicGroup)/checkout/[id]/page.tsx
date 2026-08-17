// // /* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";
// import { use, useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import {
//   ShieldCheck,
//   ArrowRight,
//   Loader2,
//   ShoppingBag,
//   Calendar,
//   Layers,
//   CreditCard,
//   XCircle,
// } from "lucide-react";
// import { Gear } from "@/type/type-gear";
// // import { toast } from "sonner";

// type Props = {
//   params: Promise<{ id: string }>;
// };

// export default function CheckoutPage({ params }: Props) {
//   const router = useRouter();
//   const resolvedParams = use(params);
//   const gearId = resolvedParams.id;

//   const searchParams = useSearchParams();
//   const startDate = searchParams.get("startDate") || "";
//   const endDate = searchParams.get("endDate") || "";
//   const quantity = Number(searchParams.get("quantity")) || 1;

//   const [gear, setGear] = useState<Gear | null>(null);
//   const [fetchingGear, setFetchingGear] = useState<boolean>(true);
//   // const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchGearDetails = async () => {
//       try {
//         setFetchingGear(true);
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/gear/${gearId}`,
//         );
//         const data = await res.json();

//         if (res.ok) {
//           setGear(data.data || data);
//         }
//       } catch (error) {
//         console.error("Error fetching gear details:", error);
//       } finally {
//         setFetchingGear(false);
//       }
//     };

//     if (gearId) {
//       fetchGearDetails();
//     }
//   }, [gearId]);

//   const calculateDays = () => {
//     if (!startDate || !endDate) return 1;
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const diffTime = end.getTime() - start.getTime();
//     const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return days > 0 ? days : 1;
//   };

//   const totalDays = calculateDays();
//   const pricePerDay = gear?.price || 0;
//   const totalPrice = totalDays * pricePerDay * quantity;

//   const handleStripeCheckout = async () => {
//     if (!startDate || !endDate) {
//       toast.error("Invalid rental period. Please go back and select dates.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const rentalResponse = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/rentals`,
//         {
//           method: "POST",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             gearItemId: gearId,
//             quantity: Number(quantity),
//             startDate,
//             endDate,
//           }),
//         },
//       );

//       const rentalData = await rentalResponse.json();

//       if (!rentalResponse.ok) {
//         throw new Error(rentalData.message || "Failed to create rental order");
//       }

//       const rentalOrderId =
//         rentalData?.data?.id || rentalData?.data?._id || rentalData?.id;

//       if (!rentalOrderId) {
//         throw new Error("Rental Order ID is missing from response");
//       }

//       const paymentResponse = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/payments/create`,
//         {
//           method: "POST",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             rentalOrderId,
//           }),
//         },
//       );

//       const paymentData = await paymentResponse.json();

//       if (!paymentResponse.ok) {
//         throw new Error(
//           paymentData.message || "Failed to create payment session",
//         );
//       }

//       const checkoutUrl =
//         paymentData?.data?.url ||
//         paymentData?.url ||
//         paymentData?.data?.paymentUrl ||
//         paymentData?.paymentUrl ||
//         paymentData?.data?.checkoutUrl ||
//         paymentData?.checkoutUrl ||
//         paymentData?.data?.sessionUrl ||
//         (typeof paymentData?.data === "string" ? paymentData?.data : null);

//       if (checkoutUrl && typeof checkoutUrl === "string") {
//         window.location.href = checkoutUrl;
//       } else {
//         toast.error("Stripe payment URL not found in backend response!");
//       }
//     } catch (error: any) {
//       console.error("Checkout Error:", error);
//       toast.error(error.message || "Payment failed!");
//     } finally {
//       setLoading(false);
//     }
//   };





//   return (
//     <div className="min-h-screen px-4 py-8 sm:py-16 text-slate-100 flex items-center justify-center">
//       <div className="w-full max-w-2xl mx-auto space-y-6">
//         {/* Header Section */}
//         <div className="text-center space-y-2">
//           <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
//             Checkout & Confirmation
//           </h1>
//           <p className="text-slate-400 text-sm sm:text-base">
//             Review your rental details before proceeding to payment
//           </p>
//         </div>

//         {/* Order Card Container */}
//         <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/80 backdrop-blur-xl p-5 sm:p-8 shadow-2xl">
//           <div className="flex items-center justify-between border-b border-slate-800 pb-5">
//             <h2 className="flex items-center text-lg sm:text-xl font-semibold text-white">
//               <ShoppingBag className="mr-2.5 h-5 w-5 text-cyan-400" />
//               Rental Summary
//             </h2>
//             <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-cyan-400 border border-indigo-500/20">
//               Pending Payment
//             </span>
//           </div>

//           {fetchingGear ? (
//             <div className="flex flex-col items-center justify-center py-12 text-slate-400 space-y-3">
//               <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
//               <p className="text-sm">Fetching item details...</p>
//             </div>
//           ) : (
//             <div className="mt-6 space-y-4 text-sm sm:text-base">
//               {/* Product Preview Header (Image + Title) */}
//               {gear?.gearItemImage && (
//                 <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 mb-4">
//                   <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
//                     <Image
//                       src={gear.gearItemImage}
//                       alt={gear.title || "Gear Image"}
//                       fill
//                       unoptimized
//                       className="object-cover"
//                     />
//                   </div>
//                   <div className="overflow-hidden">
//                     <h3 className="font-semibold text-white truncate text-base sm:text-lg">
//                       {gear.title}
//                     </h3>
//                     {gear.category && (
//                       <p className="text-xs text-slate-400 capitalize">
//                         {gear.category}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Duration Row */}
//               <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
//                 <span className="text-slate-400 flex items-center">
//                   <Calendar className="mr-2 h-4 w-4 text-slate-500" /> Rental
//                   Period
//                 </span>
//                 <span className="font-medium text-slate-200 text-xs sm:text-sm bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
//                   {startDate} &rarr; {endDate}
//                 </span>
//               </div>

//               {/* Rate Row */}
//               <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
//                 <span className="text-slate-400 flex items-center">
//                   <CreditCard className="mr-2 h-4 w-4 text-slate-500" /> Price
//                   per Day
//                 </span>
//                 <span className="font-semibold text-slate-200">
//                   ${pricePerDay}
//                 </span>
//               </div>

//               {/* Total Days Row */}
//               <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
//                 <span className="text-slate-400 flex items-center">
//                   <Calendar className="mr-2 h-4 w-4 text-slate-500" /> Total
//                   Duration
//                 </span>
//                 <span className="font-semibold text-slate-200">
//                   {totalDays} Day{totalDays > 1 ? "s" : ""}
//                 </span>
//               </div>

//               {/* Quantity Row */}
//               <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
//                 <span className="text-slate-400 flex items-center">
//                   <Layers className="mr-2 h-4 w-4 text-slate-500" /> Quantity
//                 </span>
//                 <span className="font-semibold text-slate-200">{quantity}</span>
//               </div>

//               {/* Total Calculation Row */}
//               <div className="mt-6 flex justify-between items-center rounded-xl bg-slate-900/90 p-4 border border-slate-800">
//                 <div>
//                   <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
//                     Total Amount
//                   </p>
//                   <p className="text-xs text-slate-500">
//                     Includes all applicable charges
//                   </p>
//                 </div>
//                 <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400">
//                   ${totalPrice}
//                 </span>
//               </div>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="mt-8 space-y-3">
//             <button
//               // onClick={handleStripeCheckout}
//               // disabled={loading || fetchingGear}
//               className="flex w-full items-center justify-center rounded-xl bg-cyan-400 hover:bg-cyan-500 active:scale-[0.99] py-3.5 px-4 font-semibold text-black shadow-lg shadow-indigo-600/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-cyan-600 cursor-pointer"
//             >
//               {/* {loading ? (
//                 <div className="flex items-center space-y-0">
//                   <Loader2 className="mr-2 h-5 w-5 animate-spin text-white" />
//                   <span>Redirecting to Stripe...</span>
//                 </div>
//               ) : ( */}
//                 <span className="flex items-center justify-center">
//                   Confirm
//                   <ArrowRight className="ml-2 h-5 w-5" />
//                 </span>
//               {/* )} */}
//             </button>

//             {/* Cancel Button */}
//             <button
//               onClick={() => router.back()}
//               disabled={loading}
//               className="flex w-full items-center justify-center rounded-xl bg-slate-800/80 hover:bg-slate-700 active:scale-[0.99] py-3 px-4 font-medium text-slate-300 border border-slate-700/80 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <XCircle className="mr-2 h-4 w-4 text-slate-400" />
//               Cancel & Go Back
//             </button>
//           </div>

//           {/* Security Badge */}
//           <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
//             <ShieldCheck className="h-4 w-4 text-emerald-400" />
//             <span>Secured with 256-bit SSL via Stripe</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ShieldCheck,
  ArrowRight,
  Loader2,
  ShoppingBag,
  Calendar,
  Layers,
  CreditCard,
  XCircle,
} from "lucide-react";
import { Gear } from "@/type/type-gear";
import { toast } from "sonner";

type Props = {
  params: Promise<{ id: string }>;
};

export default function CheckoutPage({ params }: Props) {
  const router = useRouter();

  const resolvedParams = use(params);
  const gearId = resolvedParams.id;

  const searchParams = useSearchParams();

  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const quantity = Number(searchParams.get("quantity")) || 1;

  const [gear, setGear] = useState<Gear | null>(null);
  const [fetchingGear, setFetchingGear] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // =========================
  // Fetch Gear
  // =========================

  useEffect(() => {
    const fetchGearDetails = async () => {
      try {
        setFetchingGear(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/gear/${gearId}`,
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Failed to fetch gear details");
        }

        setGear(data.data || data);
      } catch (error) {
        console.error("Error fetching gear details:", error);

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to fetch gear details",
        );
      } finally {
        setFetchingGear(false);
      }
    };

    if (gearId) {
      fetchGearDetails();
    }
  }, [gearId]);

  // =========================
  // Calculate Rental Days
  // =========================

  const calculateDays = () => {
    if (!startDate || !endDate) return 1;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = end.getTime() - start.getTime();

    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return days > 0 ? days : 1;
  };

  const totalDays = calculateDays();

  const pricePerDay = gear?.price || 0;

  const totalPrice = totalDays * pricePerDay * quantity;

  const handleConfirmRental = async () => {
    if (!startDate || !endDate) {
      toast.error("Invalid rental period. Please select rental dates.");

      return;
    }

    if (!gearId) {
      toast.error("Gear item not found.");

      return;
    }

    if (quantity <= 0) {
      toast.error("Quantity must be greater than 0.");

      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/rentals`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gearItemId: gearId,
            quantity,
            startDate,
            endDate,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to create rental order");
      }

      console.log("Rental created:", data);

      toast.success("Rental request placed successfully!", {
        description: "Waiting for provider confirmation.",
      });

      // Give toast a moment to show
      setTimeout(() => {
        router.push("/checkout/orderSuccess");
      }, 1000);
    } catch (error: any) {
      console.error("Create rental error:", error);

      toast.error(error?.message || "Failed to place rental request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:py-16 text-slate-100 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto space-y-6">
        {/* Header Section */}

        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Checkout & Confirmation
          </h1>

          <p className="text-slate-400 text-sm sm:text-base">
            Review your rental details before confirming
          </p>
        </div>

        {/* Order Card */}

        <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/80 backdrop-blur-xl p-5 sm:p-8 shadow-2xl">
          {/* Header */}

          <div className="flex items-center justify-between border-b border-slate-800 pb-5">
            <h2 className="flex items-center text-lg sm:text-xl font-semibold text-white">
              <ShoppingBag className="mr-2.5 h-5 w-5 text-cyan-400" />
              Rental Summary
            </h2>

            <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400 border border-yellow-500/20">
              Pending
            </span>
          </div>

          {/* Loading */}

          {fetchingGear ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400 space-y-3">
              <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />

              <p className="text-sm">Fetching item details...</p>
            </div>
          ) : (
            <div className="mt-6 space-y-4 text-sm sm:text-base">
              {/* Product */}

              {gear?.gearItemImage && (
                <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 mb-4">
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
                    <Image
                      src={gear.gearItemImage}
                      alt={gear.title || "Gear Image"}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div className="overflow-hidden">
                    <h3 className="font-semibold text-white truncate text-base sm:text-lg">
                      {gear.title}
                    </h3>

                    {gear.category && (
                      <p className="text-xs text-slate-400 capitalize">
                        {gear.category}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Rental Period */}

              <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-slate-500" />
                  Rental Period
                </span>

                <span className="font-medium text-slate-200 text-xs sm:text-sm bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
                  {startDate} &rarr; {endDate}
                </span>
              </div>

              {/* Price */}

              <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center">
                  <CreditCard className="mr-2 h-4 w-4 text-slate-500" />
                  Price per Day
                </span>

                <span className="font-semibold text-slate-200">
                  ${pricePerDay}
                </span>
              </div>

              {/* Duration */}

              <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-slate-500" />
                  Total Duration
                </span>

                <span className="font-semibold text-slate-200">
                  {totalDays} Day
                  {totalDays > 1 ? "s" : ""}
                </span>
              </div>

              {/* Quantity */}

              <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center">
                  <Layers className="mr-2 h-4 w-4 text-slate-500" />
                  Quantity
                </span>

                <span className="font-semibold text-slate-200">{quantity}</span>
              </div>

              {/* Total */}

              <div className="mt-6 flex justify-between items-center rounded-xl bg-slate-900/90 p-4 border border-slate-800">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Total Amount
                  </p>

                  <p className="text-xs text-slate-500">
                    Payment will be available after provider confirmation
                  </p>
                </div>

                <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400">
                  ${totalPrice}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}

          <div className="mt-8 space-y-3">
            {/* Confirm Rental */}

            <button
              onClick={handleConfirmRental}
              disabled={loading || fetchingGear}
              className="flex w-full items-center justify-center rounded-xl bg-cyan-400 hover:bg-cyan-500 active:scale-[0.99] py-3.5 px-4 font-semibold text-black shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Placing Rental Request...
                </>
              ) : (
                <>
                  <span>Confirm Rental</span>

                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>

            {/* Cancel */}

            <button
              onClick={() => router.back()}
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-slate-800/80 hover:bg-slate-700 active:scale-[0.99] py-3 px-4 font-medium text-slate-300 border border-slate-700/80 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <XCircle className="mr-2 h-4 w-4 text-slate-400" />
              Cancel & Go Back
            </button>
          </div>

          {/* Security */}

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />

            <span>Your rental request is securely processed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
