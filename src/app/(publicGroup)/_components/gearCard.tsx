/* eslint-disable @typescript-eslint/no-explicit-any */
// import Image from "next/image";
// import Link from "next/link";
// import { Gear } from "@/type/type-gear";

// type Props = {
//   gear: Gear;
// };

// export default function GearCard({ gear }: Props) {
//   return (
//     <div className="rounded-xl border bg-white shadow-sm transition hover:shadow-lg">
//       <div className="relative h-56 w-full">
//         <Image
//           src={gear.gearItemImage}
//           alt={gear.title}
//           fill
//           className="rounded-t-xl object-cover"
//         />
//       </div>

//       <div className="space-y-3 p-5">
//         <h2 className="text-xl font-semibold">{gear.title}</h2>

//         <p className="text-gray-500">
//           Category:
//           <span className="ml-2 font-medium">
//             {gear.category}
//           </span>
//         </p>
//          <p className="text-gray-500">
//           Brand:
//           <span className="ml-2 font-medium">{gear.brand}</span>
//         </p>

//         <p className="text-2xl font-bold text-green-600">
//           ${gear.price}
//           <span className="text-base text-gray-500"> /day</span>
//         </p>

//         {gear.quantity > 0 ? (
//           <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
//             Available
//           </span>
//         ) : (
//           <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
//             Out of Stock
//           </span>
//         )}

//         <Link
//           href={`/gears/${gear.id}`}
//           className="mt-4 block rounded-lg bg-black py-3 text-center text-white"
//         >
//           View Details
//         </Link>
//       </div>
//     </div>
//   );
// }
import Image from "next/image";
import Link from "next/link";
import { Gear } from "@/type/type-gear";

type Props = {
  gear: Gear;
};

export default function GearCard({ gear }: Props) {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Check if image URL is relative or absolute
  const rawImg = gear?.gearItemImage;
  const imageUrl = rawImg
    ? rawImg.startsWith("http")
      ? rawImg
      : `${BACKEND_URL}/${rawImg.replace(/^\//, "")}`
    : "/placeholder.png"; // dynamic fallback

  const gearId = gear?.id || (gear as Record<string, any>)?._id;

  return (
    <div className="rounded-xl border bg-white shadow-sm transition hover:shadow-lg overflow-hidden flex flex-col justify-between">
      {/* 
        Next.js <Image fill /> ব্যবহারের জন্য Parent Div-এ 
        অবশ্যই relative, width, height থাকা বাধ্যতামূলক
      */}
      <div className="relative h-56 w-full bg-gray-100 border-b">
        <Image
          src={imageUrl}
          alt={gear?.title || "Gear Image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={true} // Image load blockage বন্ধ করতে এটি আবশ্যক
          className="rounded-t-xl object-cover"
        />
      </div>

      <div className="space-y-3 p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold line-clamp-1">
            {gear?.title || "Untitled Gear"}
          </h2>

          <p className="text-gray-500 text-sm">
            Category:
            <span className="ml-2 font-medium text-gray-800">
              {gear?.category || "N/A"}
            </span>
          </p>
          <p className="text-gray-500 text-sm">
            Brand:
            <span className="ml-2 font-medium text-gray-800">
              {gear?.brand || "N/A"}
            </span>
          </p>

          <p className="text-2xl font-bold text-green-600">
            ৳ {gear?.price ?? 0}
            <span className="text-base font-normal text-gray-500"> /day</span>
          </p>

          {gear?.quantity && gear.quantity > 0 ? (
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              Available ({gear.quantity})
            </span>
          ) : (
            <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
              Out of Stock
            </span>
          )}
        </div>

        <Link
          href={`/gears/${gearId}`}
          className="mt-4 block w-full rounded-lg bg-black py-3 text-center text-sm font-medium text-white transition hover:bg-gray-800"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
