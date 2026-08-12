// import { Clock3, ShieldCheck, Award, CalendarDays } from "lucide-react";

// const features = [
//   {
//     icon: Clock3,
//     title: "Easy & Fast",
//     description: "Rent your favorite gear within minutes.",
//   },
//   {
//     icon: ShieldCheck,
//     title: "Secure Payment",
//     description: "Enjoy a safe and secure checkout experience.",
//   },
//   {
//     icon: Award,
//     title: "Quality Equipment",
//     description: "Reliable sports and outdoor gear for every adventure.",
//   },
//   {
//     icon: CalendarDays,
//     title: "Flexible Rental",
//     description: "Choose your preferred rental dates with ease.",
//   },
// ];

// const WhyChooseGearUp = () => {
//   return (
//     <section className="bg-gray-50 py-16">
//       <div className="container mx-auto px-5">
//         {/* Section Heading */}
//         <div className="mx-auto mb-12 max-w-2xl text-center">
//           <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
//             Why Choose Us
//           </p>

//           <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
//             Why Choose GearUp?
//           </h2>

//           <p className="mt-4 text-gray-600">
//             We make renting sports and outdoor gear simple, secure, and
//             convenient.
//           </p>
//         </div>

//         {/* Features */}
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {features.map((feature) => {
//             const Icon = feature.icon;

//             return (
//               <div
//                 key={feature.title}
//                 className="rounded-2xl border bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
//               >
//                 {/* Icon */}
//                 <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
//                   <Icon className="h-7 w-7 text-blue-600" />
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-lg font-bold text-gray-900">
//                   {feature.title}
//                 </h3>

//                 {/* Description */}
//                 <p className="mt-3 text-sm leading-6 text-gray-600">
//                   {feature.description}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseGearUp;