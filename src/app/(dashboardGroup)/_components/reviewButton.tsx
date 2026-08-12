"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createReview } from "../_actions/reviews";

interface ReviewButtonProps {
  rentalOrderId: string;
  gearItemId: string;
}

export default function ReviewButton({ rentalOrderId,gearItemId }: ReviewButtonProps) {
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

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        Review
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Review Gear</h2>

            {/* Rating */}
            <div className="mt-4">
              <p className="mb-2 text-sm font-medium">Rating</p>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-2xl ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="mt-4">
              <label className="text-sm font-medium">Comment</label>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review..."
                className="mt-2 min-h-24 w-full rounded-lg border p-3 outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="mt-5 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>

              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
