"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cancelRentalOrder } from "../_actions/cancelOrder";

interface CancelRentalButtonProps {
  rentalOrderId: string;
}

const CancelRentalButton = ({ rentalOrderId }: CancelRentalButtonProps) => {
  const router = useRouter();

  const handleCancel = async () => {
    try {
      await cancelRentalOrder(rentalOrderId);

      toast.success("Rental order cancelled successfully");

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to cancel rental order",
      );
    }
  };

  return (
    <button
      onClick={handleCancel}
      className="rounded-md bg-red-500 px-3 py-2 text-xs font-medium text-white hover:bg-red-600"
    >
      Cancel
    </button>
  );
};

export default CancelRentalButton;
