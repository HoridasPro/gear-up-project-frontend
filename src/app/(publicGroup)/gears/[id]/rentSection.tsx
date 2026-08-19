"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, ShoppingBag, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Gear } from "@/type/type-gear";
import { checkGearAvailability } from "@/app/(dashboardGroup)/_actions/checkAvailable";

type RentSectionProps = {
  gear: Gear;
};

export const RentSection = ({ gear }: RentSectionProps) => {
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [checkingAvailability, setCheckingAvailability] =
    useState<boolean>(false);

  const handleStartDateChange = (value: string) => {
    setStartDate(value);

    if (endDate && value > endDate) {
      setEndDate("");
    }
  };

  const handleEndDateChange = (value: string) => {
    if (value < startDate) {
      toast.error("End date cannot be before start date");
      return;
    }

    setEndDate(value);
  };

  const handleQuantityChange = (value: string) => {
    const newQuantity = Number(value);

    if (newQuantity < 1) {
      setQuantity(1);
      return;
    }

    setQuantity(newQuantity);
  };

  const handleRentNow = async () => {
    if (!startDate) {
      toast.error("Please select start date");
      return;
    }

    if (!endDate) {
      toast.error("Please select end date");
      return;
    }

    if (endDate <= startDate) {
      toast.error("End date must be after start date");
      return;
    }

    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    if (quantity > gear.quantity) {
      toast.error(`Only ${gear.quantity} items are available`);
      return;
    }

    try {
      setCheckingAvailability(true);

      const result = await checkGearAvailability(
        gear.id,
        startDate,
        endDate,
        quantity,
      );

      const availability = result?.data ?? result;

      if (!availability?.available) {
        toast.error(
          `Not available. Only ${availability?.availableQuantity ?? 0} items are available for these dates.`,
        );

        return;
      }

      toast.success("Gear is available successfully");

      const query = new URLSearchParams({
        startDate,
        endDate,
        quantity: quantity.toString(),
      }).toString();

      router.push(`/checkout/${gear.id}?${query}`);
    } catch (error) {
      console.error("Availability check failed:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to check gear availability",
      );
    } finally {
      setCheckingAvailability(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/80 backdrop-blur-xl p-5 sm:p-8 shadow-2xl space-y-6 text-slate-100 max-w-3xl mx-auto">
      <h2 className="flex items-center text-lg sm:text-xl font-semibold text-white border-b border-slate-800 pb-4">
        <Calendar className="mr-2.5 h-5 w-5 text-cyan-400" />
        Select Rental Dates
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs sm:text-sm font-medium text-slate-300">
            Start Date
          </label>

          <input
            type="date"
            value={startDate}
            min={today}
            onChange={(e) => handleStartDateChange(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900/80 p-3 text-sm text-slate-200 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all [color-scheme:dark]"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs sm:text-sm font-medium text-slate-300">
            End Date
          </label>

          <input
            type="date"
            value={endDate}
            min={startDate || today}
            onChange={(e) => handleEndDateChange(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900/80 p-3 text-sm text-slate-200 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all [color-scheme:dark]"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs sm:text-sm font-medium text-slate-300">
          Quantity
        </label>

        <input
          type="number"
          min={1}
          max={gear.quantity || 99}
          value={quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          className="w-full sm:w-32 rounded-xl border border-slate-700 bg-slate-900/80 p-3 text-sm text-slate-200 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
        />
      </div>

      <button
        onClick={handleRentNow}
        disabled={checkingAvailability}
        className="w-full flex items-center justify-center rounded-xl bg-cyan-400 hover:bg-cyan-500 disabled:bg-cyan-400/50 disabled:cursor-not-allowed active:scale-[0.99] py-3.5 px-4 font-semibold text-black shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
      >
        {checkingAvailability ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Checking Availability...
          </>
        ) : (
          <>
            <ShoppingBag className="mr-2 h-5 w-5" />
            Rent Now
          </>
        )}
      </button>
    </div>
  );
};
