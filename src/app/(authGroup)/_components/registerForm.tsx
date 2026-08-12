// "use client";

// import React, { useActionState } from "react";

// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { registerAction } from "../_actions/registserAction";

// const initialState = {
//   success: false,
//   statusCode: 0,
//   message: "",
//   data: null,
// };

// const RegisterForm = () => {
//   const [state, formAction, pending] = useActionState(
//     registerAction,
//     initialState,
//   );

//   return (
//     <div>
//       <Card className="p-6">
//         <form action={formAction} className="space-y-5">
//           {/* Name */}
//           <div className="space-y-2">
//             <Label htmlFor="name">Name</Label>

//             <Input
//               id="name"
//               name="name"
//               type="text"
//               placeholder="Enter your name"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>

//             <Input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="space-y-2">
//             <Label htmlFor="password">Password</Label>

//             <Input
//               id="password"
//               name="password"
//               type="password"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           {/* Role */}
//           <div className="space-y-2">
//             <Label htmlFor="role">Role</Label>

//             <Select name="role" defaultValue="CUSTOMER">
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select your role" />
//               </SelectTrigger>

//               <SelectContent>
//                 <SelectItem value="CUSTOMER">Customer</SelectItem>
//                 <SelectItem value="PROVIDER">Provider</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Profile Photo */}
//           <div className="space-y-2">
//             <Label htmlFor="profilePhoto">Profile Photo</Label>

//             <Input
//               id="profilePhoto"
//               name="profilePhoto"
//               type="file"
//               accept="image/jpeg,image/png,image/webp"
//               required
//             />
//           </div>

//           {/* Error / Message */}
//           {!state.success && state.message && (
//             <p className="text-sm text-red-500">{state.message}</p>
//           )}

//           {/* Success Message */}
//           {state.success && state.message && (
//             <p className="text-sm text-green-600">{state.message}</p>
//           )}

//           {/* Submit */}
//           <Button
//             type="submit"
//             disabled={pending}
//             className="w-full cursor-pointer"
//           >
//             {pending ? "Registering..." : "Register"}
//           </Button>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default RegisterForm;

 "use client";

import React, { useState } from "react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setSuccess(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Get selected image
    const profilePhoto = formData.get(
      "profilePhoto",
    ) as File | null;

    // Image required
    if (
      !profilePhoto ||
      profilePhoto.size === 0
    ) {
      setMessage("Profile photo is required");
      setLoading(false);
      return;
    }

    // Maximum 10 MB
    const maxSize = 10 * 1024 * 1024;

    if (profilePhoto.size > maxSize) {
      setMessage(
        "Profile photo must be less than 10MB",
      );
      setLoading(false);
      return;
    }

    // Allowed image types
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(profilePhoto.type)) {
      setMessage(
        "Only JPG, PNG and WEBP images are allowed",
      );
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/register`,
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await res.json();

      console.log("REGISTER RESULT =", result);

      if (!res.ok || !result.success) {
        setSuccess(false);
        setMessage(
          result.message || "Registration failed",
        );
        return;
      }

      setSuccess(true);
      setMessage("Registration successful!");

      // Reset form
      form.reset();

      // Go to login
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      console.error("Register Error:", error);

      setSuccess(false);
      setMessage(
        "Something went wrong during registration",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-5"
        >
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Name
            </Label>

            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">
              Password
            </Label>

            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">
              Address
            </Label>

            <Input
              id="address"
              name="address"
              type="text"
              placeholder="Enter your address"
              required
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">
              Role
            </Label>

            <Select
              name="role"
              defaultValue="CUSTOMER"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="CUSTOMER">
                  Customer
                </SelectItem>

                <SelectItem value="PROVIDER">
                  Provider
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Profile Photo */}
          <div className="space-y-2">
            <Label htmlFor="profilePhoto">
              Profile Photo
            </Label>

            <Input
              id="profilePhoto"
              name="profilePhoto"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              required
            />

            <p className="text-xs text-gray-500">
              JPG, PNG or WEBP — Maximum 10MB
            </p>
          </div>

          {/* Message */}
          {message && (
            <p
              className={
                success
                  ? "text-sm text-green-600"
                  : "text-sm text-red-500"
              }
            >
              {message}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer"
          >
            {loading
              ? "Registering..."
              : "Register"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default RegisterForm;
// "use client";

// import React, { useActionState } from "react";

// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { registerAction } from "../_actions/registserAction";

// const initialState = {
//   success: false,
//   statusCode: 0,
//   message: "",
//   data: null,
// };

// const RegisterForm = () => {
//   const [state, formAction, pending] = useActionState(
//     registerAction,
//     initialState,
//   );

//   return (
//     <div className="flex min-h-screen items-center justify-center">
//       <Card className="w-full max-w-md p-6">
//         <form action={formAction} className="space-y-5">
//           {/* Name */}
//           <div className="space-y-2">
//             <Label htmlFor="name">Name</Label>

//             <Input
//               id="name"
//               name="name"
//               type="text"
//               placeholder="Enter your name"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>

//             <Input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="space-y-2">
//             <Label htmlFor="password">Password</Label>

//             <Input
//               id="password"
//               name="password"
//               type="password"
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           {/* Address */}
//           <div className="space-y-2">
//             <Label htmlFor="address">Address</Label>

//             <Input
//               id="address"
//               name="address"
//               type="text"
//               placeholder="Enter your address"
//               required
//             />
//           </div>

//           {/* Role */}
//           <div className="space-y-2">
//             <Label htmlFor="role">Role</Label>

//             <Select name="role" defaultValue="CUSTOMER">
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select your role" />
//               </SelectTrigger>

//               <SelectContent>
//                 <SelectItem value="CUSTOMER">Customer</SelectItem>
//                 <SelectItem value="PROVIDER">Provider</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Profile Photo */}
//           <div className="space-y-2">
//             <Label htmlFor="profilePhoto">Profile Photo</Label>

//             <Input
//               id="profilePhoto"
//               name="profilePhoto"
//               type="file"
//               accept="image/jpeg,image/png,image/webp"
//               required
//             />
//           </div>

//           {/* Error */}
//           {!state.success && state.message && (
//             <p className="text-sm text-red-500">{state.message}</p>
//           )}

//           {/* Success */}
//           {state.success && state.message && (
//             <p className="text-sm text-green-600">{state.message}</p>
//           )}

//           {/* Submit */}
//           <Button
//             type="submit"
//             disabled={pending}
//             className="w-full cursor-pointer"
//           >
//             {pending ? "Registering..." : "Register"}
//           </Button>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default RegisterForm;
