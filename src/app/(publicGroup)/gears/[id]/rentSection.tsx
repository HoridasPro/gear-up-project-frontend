/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { Gear } from "@/type/type-gear";
import Link from "next/link";

type Props = {
  gear: Gear;
};

export const RentSection = ({ gear }: Props) => {
  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleRent = async () => {
    // ১. ফর্ম ভ্যালিডেশন
    if (!startDate || !endDate) {
      alert("দয়া করে শুরুর এবং শেষ তারিখ নির্বাচন করুন!");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      alert("শেষ তারিখ অবশ্যই শুরুর তারিখের পর হতে হবে!");
      return;
    }

    try {
      setLoading(true);

      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
      if (!baseUrl) {
        throw new Error("Backend API URL পাওয়া যায়নি!");
      }

      const res = await fetch(`${baseUrl}/api/rentals`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gearItemId: gear.id,
          quantity,
          startDate,
          endDate,
        }),
      });

      if (!res.ok) {
        // ব্যাকএন্ডের প্রকৃত ভুল মেসেজ দেখার জন্য
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || `সার্ভার এরর: ${res.status}`);
      }

      await res.json();
      alert("Rental created successfully!");

      // সফল হওয়ার পর ফর্ম রিসেট
      setStartDate("");
      setEndDate("");
      setQuantity(1);
    } catch (error: any) {
      console.error("Rental Error:", error);
      alert(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const isFormInvalid = !startDate || !endDate || loading;

  return (
    <div className="rounded-xl border p-5 space-y-4">
      <h2 className="text-2xl font-bold">Rent Now</h2>

      <div>
        <label className="mb-1 block font-medium">Start Date</label>
        <input
          type="date"
          value={startDate}
          min={today}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full rounded-lg border p-2"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">End Date</label>
        <input
          type="date"
          value={endDate}
          min={startDate || today}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full rounded-lg border p-2"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Quantity</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full rounded-lg border p-2"
        />
      </div>

      {/* <button
        onClick={handleRent}
        disabled={isFormInvalid}
        className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Renting..." : "Rent Now"}
      </button> */}
      <Link href={`/checkout/${gear.id}`}>
  <button className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700">
    Rent Now
  </button>
</Link>
    </div>
  );
};
