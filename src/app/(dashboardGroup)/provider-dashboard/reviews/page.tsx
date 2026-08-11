import Image from "next/image";
import { Review, ReviewResponse } from "@/type/type-gear";
import { getReviews } from "../../_actions/getReviews";

const GetAllReviewsPage = async () => {
  let reviews: Review[] = [];

  try {
    const result: ReviewResponse = await getReviews();

    reviews = result.data || [];
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
  }

  return (
    <div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>

        <p className="mt-2 text-muted-foreground">
          Reviews from customers who rented your gears
        </p>

        <div className="mt-6 overflow-x-auto rounded-lg border bg-white">
          <table className="w-full text-left">
            <thead className="border-b bg-gray-100">
              <tr>
                <th className="p-3">SI</th>

                <th className="p-3">Customer Image</th>

                <th className="p-3">Customer Name</th>

                <th className="p-3">Gear Image</th>

                <th className="p-3">Gear Name</th>

                <th className="p-3 text-center">Rating</th>

                <th className="p-3">Comment</th>

                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <tr key={review.id} className="border-t hover:bg-gray-50">
                    {/* SI */}
                    <td className="p-3">{index + 1}</td>

                    {/* Customer Image */}
                    <td className="p-3">
                      <div className="relative h-11 w-11 overflow-hidden rounded-full border bg-gray-100">
                        {review.customer?.profilePhoto ? (
                          <Image
                            src={review.customer.profilePhoto}
                            alt={review.customer.name || "Customer"}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-gray-500">
                            {review.customer?.name?.charAt(0).toUpperCase() ||
                              "C"}
                          </div>
                        )}
                      </div>
                    </td>
                    {/* Customer Name + Email */}
                    <td className="p-3">
                      <div>
                        <p className="font-medium">
                          {review?.customer?.name || "N/A"}
                        </p>

                        <p className="text-sm text-gray-500">
                          {review?.customer?.email || "N/A"}
                        </p>
                      </div>
                    </td>
                    {/* Gear Image */}
                    <td className="p-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg border bg-gray-100">
                        {review.gearItem?.gearItemImage ? (
                          <Image
                            src={review.gearItem.gearItemImage}
                            alt={review.gearItem.title || "Gear"}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Gear Title */}
                    <td className="p-3">
                      <span className="font-medium">
                        {review.gearItem?.title || "N/A"}
                      </span>
                    </td>

                    {/* Rating */}
                    <td className="p-3 text-center">
                      <span className="text-yellow-500">
                        {"★".repeat(review.rating)}
                      </span>

                      <span className="ml-1 text-sm text-gray-500">
                        ({review.rating}/5)
                      </span>
                    </td>

                    {/* Comment */}
                    <td className="max-w-md p-3">
                      {review.comment || "No comment"}
                    </td>

                    {/* Date */}
                    <td className="p-3">
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-gray-500">
                    No reviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetAllReviewsPage;
