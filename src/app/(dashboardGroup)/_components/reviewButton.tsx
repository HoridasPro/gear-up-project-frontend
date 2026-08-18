"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createReview } from "../_actions/reviews";
import { ReviewButtonProps } from "@/type/type-gear";

export default function ReviewButton({
  rentalOrderId,
  gearItemId,
}: ReviewButtonProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    setLoading(true);

    try {
      const result = await createReview({
        rentalOrderId,
        gearItemId,
        rating,
        comment,
      });

      if (!result.success) {
        toast.error(result.message || "Failed to submit review");
        return;
      }

      toast.success("Review submitted successfully");

      setOpen(false);
      setComment("");
      setRating(5);

      window.location.reload();
    } catch (error) {
      console.error("Review error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Modal Content
  const modalContent = open ? (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-md transition-all duration-300">
      <div className="w-full max-w-md transform  rounded-2xl border border-gray-800/80 bg-[#0b0f19]/95 p-5 sm:p-7 shadow-2xl backdrop-blur-2xl transition-all">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
          Review Gear
        </h2>

        {/* Rating */}
        <div className="mt-5 sm:mt-6">
          <p className="mb-2 text-xs sm:text-sm font-medium text-gray-300">
            Rating
          </p>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl sm:text-3xl transition-all duration-200 hover:scale-110 focus:outline-none ${
                  star <= rating
                    ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]"
                    : "text-gray-700 hover:text-gray-500"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="mt-5 sm:mt-6">
          <label className="text-xs sm:text-sm font-medium text-gray-300">
            Comment
          </label>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            rows={3}
            className="mt-2 w-full resize-none rounded-xl border border-gray-800/80 bg-gray-900/60 p-3.5 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all shadow-inner"
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 sm:mt-8 flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
            className="border-gray-800 bg-gray-900/50 text-gray-300 hover:bg-gray-800 hover:text-white transition-all text-xs sm:text-sm"
          >
            Cancel
          </Button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-cyber"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <Button
        size="sm"
        onClick={() => setOpen(true)}
        className="min-h-min bg-emerald-500 text-black hover:bg-emerald-400 font-semibold px-4 py-2 transition-all duration-200 shadow-lg shadow-emerald-500/20 active:scale-95"
      >
        Review
      </Button>

      {open &&
        typeof window !== "undefined" &&
        createPortal(modalContent, document.body)}
    </>
  );
}
