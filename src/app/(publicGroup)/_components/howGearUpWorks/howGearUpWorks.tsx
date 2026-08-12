// import { Search, CalendarDays, CreditCard, PackageCheck } from "lucide-react";

// const steps = [
//   {
//     number: "01",
//     icon: Search,
//     title: "Browse Gear",
//     description: "Explore our collection and find the perfect gear for you.",
//   },
//   {
//     number: "02",
//     icon: CalendarDays,
//     title: "Select Dates",
//     description: "Choose your preferred rental dates and quantity.",
//   },
//   {
//     number: "03",
//     icon: CreditCard,
//     title: "Pay Securely",
//     description: "Complete your rental with a safe and secure payment.",
//   },
//   {
//     number: "04",
//     icon: PackageCheck,
//     title: "Enjoy & Return",
//     description: "Use your gear and return it when your rental period ends.",
//   },
// ];

// const HowGearUpWorks = () => {
//   return (
//     <section className="py-16">
//       <div className="container mx-auto px-5">
//         {/* Section Heading */}
//         <div className="mx-auto mb-12 max-w-2xl text-center">
//           <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
//             Simple & Easy
//           </p>

//           <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
//             How GearUp Works
//           </h2>

//           <p className="mt-4 text-gray-600">
//             Rent your favorite sports and outdoor gear in just a few simple
//             steps.
//           </p>
//         </div>

//         {/* Steps */}
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
//           {steps.map((step, index) => {
//             const Icon = step.icon;

//             return (
//               <div key={step.number} className="relative text-center">
//                 {/* Connector */}
//                 {index !== steps.length - 1 && (
//                   <div className="absolute left-[calc(50%+45px)] top-7 hidden h-px w-[calc(100%-90px)] bg-gray-300 lg:block" />
//                 )}

//                 {/* Icon */}
//                 <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-white shadow-md">
//                   <Icon className="h-7 w-7" />
//                 </div>

//                 {/* Step Number */}
//                 <p className="mt-4 text-sm font-bold text-blue-600">
//                   STEP {step.number}
//                 </p>

//                 {/* Title */}
//                 <h3 className="mt-2 text-xl font-bold text-gray-900">
//                   {step.title}
//                 </h3>

//                 {/* Description */}
//                 <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-600">
//                   {step.description}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HowGearUpWorks;
