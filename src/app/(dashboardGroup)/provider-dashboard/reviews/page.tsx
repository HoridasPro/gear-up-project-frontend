export const dynamic = "force-dynamic";
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
    <div className="w-full">
      <div className="mt-6 sm:mt-2">
        <div className="mb-6">
          <h2 className="text-3xl sm:text-3xl font-extrabold tracking-tight text-white">
            Customer Reviews
          </h2>

          <p className="mt-1 text-xs sm:text-sm text-gray-400">
            Reviews from customers who rented your gears
          </p>
        </div>

        <div className="w-full overflow-hidden rounded-2xl border border-gray-800/80 bg-[#0b0f19]/90 shadow-2xl backdrop-blur-xl">
          <table className="w-full border-collapse text-left table-fixed">
            <thead className="border-b border-gray-800/80 bg-gray-900/60 text-[10px] sm:text-xs uppercase tracking-wider text-gray-400">
              <tr>
                <th className="w-[6%] sm:w-[5%] p-2 sm:p-3.5 font-semibold text-left">
                  SI
                </th>

                <th className="w-[10%] sm:w-[8%] p-2 sm:p-3.5 font-semibold text-left hidden sm:table-cell">
                  Customer Image
                </th>

                <th className="w-[24%] sm:w-[18%] p-2 sm:p-3.5 font-semibold text-left">
                  Customer Name
                </th>

                <th className="w-[8%] p-2 sm:p-3.5 font-semibold text-left hidden md:table-cell">
                  Gear Image
                </th>

                <th className="w-[22%] sm:w-[16%] p-2 sm:p-3.5 font-semibold text-left">
                  Gear Name
                </th>

                <th className="w-[18%] sm:w-[12%] p-2 sm:p-3.5 font-semibold text-center">
                  Rating
                </th>

                <th className="w-[30%] sm:w-[23%] p-2 sm:p-3.5 font-semibold text-left">
                  Comment
                </th>

                <th className="w-[10%] p-2 sm:p-3.5 font-semibold text-left hidden lg:table-cell">
                  Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800/60 text-[11px] sm:text-xs lg:text-sm">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <tr
                    key={review.id}
                    className="transition-colors hover:bg-gray-800/40"
                  >
                    <td className="p-2 sm:p-3.5 font-medium text-gray-400">
                      {index + 1}
                    </td>

                    <td className="p-2 sm:p-3.5 hidden sm:table-cell">
                      <div className="relative h-8 w-8 sm:h-10 sm:w-10 overflow-hidden rounded-full border border-gray-800 bg-gray-900/80 shadow-md shrink-0">
                        {review.customer?.profilePhoto ? (
                          <Image
                            src={review.customer.profilePhoto}
                            alt={review.customer.name || "Customer"}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-emerald-400 bg-emerald-500/10">
                            {review.customer?.name?.charAt(0).toUpperCase() ||
                              "C"}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="p-2 sm:p-3.5 truncate">
                      <div>
                        <p className="font-semibold text-white truncate">
                          {review?.customer?.name || "N/A"}
                        </p>

                        <p className="text-[10px] sm:text-xs text-gray-400 truncate">
                          {review?.customer?.email || "N/A"}
                        </p>
                      </div>
                    </td>

                    <td className="p-2 sm:p-3.5 hidden md:table-cell">
                      <div className="relative h-9 w-9 sm:h-10 sm:w-10 overflow-hidden rounded-lg border border-gray-800 bg-gray-900/80 shadow-md shrink-0">
                        {review.gearItem?.gearItemImage ? (
                          <Image
                            src={review.gearItem.gearItemImage}
                            alt={review.gearItem.title || "Gear"}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-300 hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[9px] text-gray-500 font-medium">
                            No Image
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="p-2 sm:p-3.5 font-medium text-gray-200 truncate">
                      <span className="font-medium truncate block">
                        {review.gearItem?.title || "N/A"}
                      </span>
                    </td>

                    <td className="p-2 sm:p-3.5 text-center truncate">
                      <span className="text-amber-400 text-xs sm:text-sm">
                        {"★".repeat(review.rating)}
                      </span>

                      <span className="ml-1 text-[10px] sm:text-xs text-gray-400 font-mono">
                        ({review.rating}/5)
                      </span>
                    </td>

                    <td className="p-2 sm:p-3.5 text-gray-300 truncate">
                      <p
                        className="truncate"
                        title={review.comment || "No comment"}
                      >
                        {review.comment || "No comment"}
                      </p>
                    </td>

                    <td className="p-2 sm:p-3.5 text-gray-400 text-[10px] sm:text-xs hidden lg:table-cell truncate">
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="p-8 text-center text-gray-400 font-medium"
                  >
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
