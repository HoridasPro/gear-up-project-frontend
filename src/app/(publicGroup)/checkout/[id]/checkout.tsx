"use client";

import { useMemo, useState } from "react";
import { Gear } from "@/type/type-gear";
import { toast } from "sonner";
import Image from "next/image";

type Props = {
  gear: Gear;
};

export default function RentalCheckout({ gear }: Props) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState(1);

  const days = useMemo(() => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    return diff > 0 ? diff : 0;
  }, [startDate, endDate]);

  const totalPrice = days * quantity * gear.price;

  const handleConfirm = async () => {
    toast.success("Rental Confirmed");

  };

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Rental Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left */}
        <div className="rounded-xl border p-6">
          <Image
            src={gear.gearItemImage}
            alt={gear.title}
            className="h-72 w-full rounded-lg object-cover"
          />

          <h2 className="mt-4 text-2xl font-bold">{gear.title}</h2>

          <p className="mt-2 text-lg">
            Price Per Day :<span className="font-bold">৳{gear.price}</span>
          </p>

          <p>Available : {gear.quantity}</p>
        </div>

        {/* Right */}
        <div className="rounded-xl border p-6">
          <h2 className="mb-5 text-2xl font-bold">Rental Details</h2>

          <div className="space-y-4">
            <div>
              <label>Start Date</label>

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </div>

            <div>
              <label>End Date</label>

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </div>

            <div>
              <label>Quantity</label>

              <input
                type="number"
                min={1}
                max={gear.quantity}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="mt-1 w-full rounded border p-2"
              />
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-gray-100 p-4">
            <h3 className="mb-3 text-xl font-semibold">Order Summary</h3>

            <div className="flex justify-between">
              <span>Price / Day</span>
              <span>৳{gear.price}</span>
            </div>

            <div className="mt-2 flex justify-between">
              <span>Days</span>
              <span>{days}</span>
            </div>

            <div className="mt-2 flex justify-between">
              <span>Quantity</span>
              <span>{quantity}</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>৳{totalPrice}</span>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-white"
          >
            Confirm Rental
          </button>
        </div>
      </div>
    </div>
  );
}
