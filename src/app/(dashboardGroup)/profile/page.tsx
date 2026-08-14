// import Image from "next/image";
// import { Mail, User, ShieldCheck } from "lucide-react";
// import { myProfile } from "../_actions/getProfile";

// const ProfilePage = async () => {
//   // ১. সরাসরি server action থেকে user আনুন
//   const user = await myProfile();

//   // ২. ইউজার ডেটা না থাকলে সেফটি হ্যান্ডলার
//   if (!user) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gray-50">
//         <p className="text-gray-600">
//           User data could not be loaded. Please log in again.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-3xl">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
//             My Profile
//           </h1>
//           <p className="mt-1 text-sm text-gray-500">
//             View your account information
//           </p>
//         </div>

//         {/* Profile Card */}
//         <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
//           {/* Cover */}
//           <div className="h-28 bg-gradient-to-r from-blue-600 to-indigo-600 sm:h-36" />

//           {/* Profile Image */}
//           <div className="px-5 pb-6 sm:px-8">
//             <div className="-mt-14 mb-5 flex justify-center sm:justify-start">
//               <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-md sm:h-32 sm:w-32">
//                 <Image
//                   src={user?.profilePhoto || "/default-avatar.png"}
//                   alt={user?.name || "User"}
//                   fill
//                   className="object-cover"
//                   sizes="128px"
//                 />
//               </div>
//             </div>

//             {/* Name */}
//             <div className="text-center sm:text-left">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 {user?.name || "User"}
//               </h2>

//               <p className="mt-1 text-sm text-gray-500">
//                 {user?.role || "CUSTOMER"}
//               </p>
//             </div>

//             {/* User Information */}
//             <div className="mt-8 grid gap-4 sm:grid-cols-2">
//               {/* Name */}
//               <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
//                     <User className="h-5 w-5 text-blue-600" />
//                   </div>

//                   <div>
//                     <p className="text-xs font-medium text-gray-500">
//                       Full Name
//                     </p>
//                     <p className="mt-1 font-semibold text-gray-900">
//                       {user?.name || "Not available"}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Email */}
//               <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
//                     <Mail className="h-5 w-5 text-blue-600" />
//                   </div>

//                   <div className="min-w-0">
//                     <p className="text-xs font-medium text-gray-500">Email</p>
//                     <p className="mt-1 truncate font-semibold text-gray-900">
//                       {user?.email || "Not available"}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Role */}
//               <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 sm:col-span-2">
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
//                     <ShieldCheck className="h-5 w-5 text-blue-600" />
//                   </div>

//                   <div>
//                     <p className="text-xs font-medium text-gray-500">
//                       Account Role
//                     </p>
//                     <p className="mt-1 font-semibold text-gray-900">
//                       {user?.role || "CUSTOMER"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import { myProfile } from "../_actions/getProfile";
import ProfileContent from "../_components/prodileContent";
const ProfilePage = async () => {
  const user = await myProfile();

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">
          User data could not be loaded. Please log in again.
        </p>
      </div>
    );
  }

  return <ProfileContent user={user} />;
};

export default ProfilePage;
