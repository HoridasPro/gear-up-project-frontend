/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { use, useEffect, useState } from "react";
import {
  Calendar,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Gear } from "@/type/type-gear";

type Props = {
  params: Promise<{ id: string }>;
};

export default function CheckoutPage({ params }: Props) {
  // Next.js 15+ অনুযায়ী params resolve করা
  const resolvedParams = use(params);
  const gearId = resolvedParams.id;

  const today = new Date().toISOString().split("T")[0];

  const [gear, setGear] = useState<Gear | null>(null);
  const [fetchingGear, setFetchingGear] = useState<boolean>(true);

  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // ১. ব্যাকএন্ড থেকে গিয়ার ডিটেইলস ও প্রাইস লোড করা
  useEffect(() => {
    const fetchGearDetails = async () => {
      try {
        setFetchingGear(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/gear/${gearId}`,
        );
        const data = await res.json();

        if (res.ok) {
          setGear(data.data || data);
        }
      } catch (error) {
        console.error("Error fetching gear details:", error);
      } finally {
        setFetchingGear(false);
      }
    };

    if (gearId) {
      fetchGearDetails();
    }
  }, [gearId]);

  // ২. দিনের হিসাব ও মোট মূল্য গণনার লজিক
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
  const handleStripeCheckout = async () => {
  if (!startDate || !endDate) {
    alert("Please select start date and end date");
    return;
  }

  try {
    setLoading(true);

    // ===========================
    // STEP 1: Create Rental Order
    // ===========================

    const rentalResponse = await fetch(
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

    const rentalData = await rentalResponse.json();

    if (!rentalResponse.ok) {
      throw new Error(rentalData.message);
    }

    // এখান থেকে Rental Order Id পাও
    const rentalOrderId = rentalData.data.id;

    // ===========================
    // STEP 2: Create Payment
    // ===========================

    const paymentResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/payments/create`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rentalOrderId,
        }),
      },
    );

    const paymentData = await paymentResponse.json();

    if (!paymentResponse.ok) {
      throw new Error(paymentData.message);
    }

    // ===========================
    // STEP 3: Redirect Stripe
    // ===========================

    window.location.href = paymentData.data.url;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Rental Checkout</h1>

      <div className="grid gap-8 md:grid-cols-3">
        {/* তারিখ ও ইনপুট ফ্লো */}
        <div className="space-y-6 md:col-span-2">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center text-xl font-semibold">
              <Calendar className="mr-2 h-5 w-5 text-indigo-600" /> Select
              Rental Dates
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  min={today}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-lg border p-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  min={startDate || today}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-lg border p-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium">Quantity</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value)))
                }
                className="w-28 rounded-lg border p-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-3 flex items-center text-xl font-semibold">
              <CreditCard className="mr-2 h-5 w-5 text-indigo-600" /> Payment
              Method
            </h2>
            <div className="flex items-center justify-between rounded-lg border border-indigo-200 bg-indigo-50/40 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-indigo-600 px-2.5 py-1 text-xs font-bold text-white">
                  STRIPE
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    Credit or Debit Card
                  </p>
                  <p className="text-xs text-gray-500">
                    Secured & Fast Processing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* সামারি সেকশন */}
        <div className="h-fit rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Order Details</h2>

          {fetchingGear ? (
            <div className="flex items-center justify-center py-6 text-gray-500">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading item
              details...
            </div>
          ) : (
            <div className="space-y-3 border-b pb-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Gear Name:</span>
                <span className="font-semibold text-gray-800">
                  {gear?.title || "N/A"}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Price per Day:</span>
                <span className="font-semibold text-gray-800">
                  ${pricePerDay}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Total Duration:</span>
                <span className="font-semibold text-gray-800">
                  {totalDays} Day(s)
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Quantity:</span>
                <span className="font-semibold text-gray-800">{quantity}</span>
              </div>

              {/* টোটাল প্রাইস প্রদর্শন */}
              <div className="mt-4 flex justify-between border-t pt-3 text-base font-bold text-gray-900">
                <span>Total Amount:</span>
                <span className="text-indigo-600">${totalPrice}</span>
              </div>
            </div>
          )}

          <button
            onClick={handleStripeCheckout}
            disabled={loading || fetchingGear}
            className="mt-6 flex w-full items-center justify-center rounded-lg bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition-all"
          >
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <>
                Pay {totalPrice > 0 ? `$${totalPrice}` : ""} with Stripe{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-500">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            <span>Encrypted Payment Gateway</span>
          </div>
        </div>
      </div>
    </div>
  );
}
