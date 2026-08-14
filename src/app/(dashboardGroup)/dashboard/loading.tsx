export default function Loading() {
  return (
    <div className="space-y-6 p-4 text-gray-100 sm:space-y-8 sm:p-6 lg:p-8">
      <div className="animate-pulse">
        {/* ================= HEADER ================= */}
        <div>
          {/* Title */}
          <div className="h-8 w-48 rounded-lg bg-gray-800 sm:h-9 sm:w-56 lg:h-10 lg:w-64" />

          {/* Description */}
          <div className="mt-3 h-4 w-72 rounded bg-gray-800 sm:w-96" />
        </div>

        {/* ================= TABLE ================= */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-800/80 bg-[#0b0f19]/80 shadow-2xl backdrop-blur-xl">
          {/* Table Header */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-xs sm:text-sm">
              <thead className="border-b border-gray-800/80 bg-gray-900/60">
                <tr>
                  {[
                    "SI",
                    "Image",
                    "Gear ID",
                    "Quantity",
                    "Total Price",
                    "Start Date",
                    "End Date",
                    "Updated",
                    "Status",
                    "Review",
                  ].map((header) => (
                    <th key={header} className="px-4 py-4 sm:px-6">
                      <div
                        className={`h-4 rounded bg-gray-800 ${
                          header === "SI"
                            ? "w-6"
                            : header === "Image"
                              ? "mx-auto w-12"
                              : header === "Gear ID"
                                ? "w-20"
                                : header === "Total Price"
                                  ? "mx-auto w-24"
                                  : header === "Start Date" ||
                                      header === "End Date"
                                    ? "mx-auto w-20"
                                    : header === "Updated"
                                      ? "mx-auto w-16"
                                      : header === "Status"
                                        ? "mx-auto w-16"
                                        : "mx-auto w-14"
                        }`}
                      />
                    </th>
                  ))}
                </tr>
              </thead>

              {/* ================= TABLE BODY ================= */}
              <tbody className="divide-y divide-gray-800/60">
                {Array.from({ length: 6 }).map((_, index) => (
                  <tr key={index}>
                    {/* SI */}
                    <td className="px-4 py-4 sm:px-6">
                      <div className="h-4 w-6 rounded bg-gray-800" />
                    </td>

                    {/* Image */}
                    <td className="px-4 py-4 sm:px-6">
                      <div className="flex justify-center">
                        <div className="h-12 w-12 rounded-xl bg-gray-800 sm:h-14 sm:w-14" />
                      </div>
                    </td>

                    {/* Gear ID */}
                    <td className="px-4 py-4 sm:px-6">
                      <div className="h-4 w-24 rounded bg-gray-800" />
                    </td>

                    {/* Quantity */}
                    <td className="px-4 py-4 sm:px-6">
                      <div className="mx-auto h-4 w-8 rounded bg-gray-800" />
                    </td>

                    {/* Total Price */}
                    <td className="px-4 py-4 sm:px-6">
                      <div className="mx-auto h-5 w-20 rounded bg-gray-800" />
                    </td>

                    {/* Start Date */}
                    <td className="px-4 py-4 sm:px-6">
                      <div className="mx-auto h-4 w-20 rounded bg-gray-800" />
                    </td>

                    {/* End Date */}
                    <td className="px-4 py-4 sm:px-6">
                      <div className="mx-auto h-4 w-20 rounded bg-gray-800" />
                    </td>

                    {/* Updated */}
                    <td className="px-4 py-4 sm:px-6">
                      <div className="mx-auto h-4 w-20 rounded bg-gray-800" />
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 sm:px-6">
                      <div className="mx-auto h-7 w-20 rounded-full bg-gray-800" />
                    </td>

                    {/* Review */}
                    <td className="px-4 py-4 sm:px-6">
                      <div className="mx-auto h-8 w-20 rounded-lg bg-gray-800" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
