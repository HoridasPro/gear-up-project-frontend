// "use server";

// import { redirect } from "next/navigation";

// type RegisterAction = {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data?: {
//     accessToken?: string;
//     refreshToken?: string;
//   } | null;
// };

// export const registerAction = async (
//   prevState: RegisterAction | null,
//   formData: FormData,
// ): Promise<RegisterAction | never> => {
//   const name = formData.get("name") as string;
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;
//   const role = formData.get("role") as string;
//   const address = formData.get("address") as string;
//   const profilePhoto = formData.get("profilePhoto") as File | null;

//   const registerFormData = new FormData();

//   registerFormData.append("name", name);
//   registerFormData.append("email", email);
//   registerFormData.append("password", password);
//   registerFormData.append("role", role);
//   registerFormData.append("address", address);

//   if (profilePhoto && profilePhoto instanceof File && profilePhoto.size > 0) {
//     registerFormData.append("profilePhoto", profilePhoto);
//   }

//   let result;

//   try {
//     const res = await fetch(
//       `${process.env.BACKEND_API_URL}/api/auth/register`,
//       {
//         method: "POST",
//         body: registerFormData,
//       },
//     );

//     result = await res.json();

//     console.log("REGISTER RESULT =", result);

//     if (!res.ok || !result.success) {
//       return {
//         success: false,
//         statusCode: result.statusCode || res.status,
//         message: result.message || "Registration failed",
//         data: null,
//       };
//     }
//   } catch (error) {
//     console.error("Register Error:", error);

//     return {
//       success: false,
//       statusCode: 500,
//       message: "Something went wrong during registration",
//       data: null,
//     };
//   }

//   // Redirect outside try/catch
//   redirect("/login");
// };

"use server";

import { redirect } from "next/navigation";

type RegisterAction = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
  } | null;
};

export const registerAction = async (
  prevState: RegisterAction | null,
  formData: FormData,
): Promise<RegisterAction | never> => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;
  const address = formData.get("address") as string;

  const profilePhoto = formData.get("profilePhoto") as File | null;

  // Image validation
  if (
    !profilePhoto ||
    !(profilePhoto instanceof File) ||
    profilePhoto.size === 0
  ) {
    return {
      success: false,
      statusCode: 400,
      message: "Profile photo is required",
      data: null,
    };
  }

  // Maximum image size: 10MB
  const maxSize = 10 * 1024 * 1024;

  if (profilePhoto.size > maxSize) {
    return {
      success: false,
      statusCode: 400,
      message: "Profile photo must be less than 10MB",
      data: null,
    };
  }

  // Check image type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(profilePhoto.type)) {
    return {
      success: false,
      statusCode: 400,
      message: "Only JPG, PNG and WEBP images are allowed",
      data: null,
    };
  }

  const registerFormData = new FormData();

  registerFormData.append("name", name);
  registerFormData.append("email", email);
  registerFormData.append("password", password);
  registerFormData.append("role", role);
  registerFormData.append("address", address);
  registerFormData.append("profilePhoto", profilePhoto);

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/register`,
      {
        method: "POST",
        body: registerFormData,
      },
    );

    const result = await res.json();

    console.log("REGISTER RESULT =", result);

    if (!res.ok || !result.success) {
      return {
        success: false,
        statusCode: result.statusCode || res.status,
        message: result.message || "Registration failed",
        data: null,
      };
    }
  } catch (error) {
    console.error("Register Error:", error);

    return {
      success: false,
      statusCode: 500,
      message: "Something went wrong during registration",
      data: null,
    };
  }

  redirect("/login");
};
// "use server";

// import { redirect } from "next/navigation";

// type RegisterAction = {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data?: {
//     accessToken?: string;
//     refreshToken?: string;
//   } | null;
// };

// export const registerAction = async (
//   prevState: RegisterAction | null,
//   formData: FormData,
// ): Promise<RegisterAction | never> => {
//   const name = formData.get("name") as string;
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;
//   const role = formData.get("role") as string;
//   const address = formData.get("address") as string;

//   const profilePhoto = formData.get("profilePhoto") as File | null;

//   // Image validation
//   if (
//     !profilePhoto ||
//     !(profilePhoto instanceof File) ||
//     profilePhoto.size === 0
//   ) {
//     return {
//       success: false,
//       statusCode: 400,
//       message: "Profile photo is required",
//       data: null,
//     };
//   }

//   // Maximum image size: 1MB
//   const maxSize = 10 * 1024 * 1024;

//   if (profilePhoto.size > maxSize) {
//     return {
//       success: false,
//       statusCode: 400,
//       message: "Profile photo must be less than 1MB",
//       data: null,
//     };
//   }

//   // Check image type
//   const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

//   if (!allowedTypes.includes(profilePhoto.type)) {
//     return {
//       success: false,
//       statusCode: 400,
//       message: "Only JPG, PNG and WEBP images are allowed",
//       data: null,
//     };
//   }

//   const registerFormData = new FormData();

//   registerFormData.append("name", name);
//   registerFormData.append("email", email);
//   registerFormData.append("password", password);
//   registerFormData.append("role", role);
//   registerFormData.append("address", address);
//   registerFormData.append("profilePhoto", profilePhoto);

//   try {
//     const res = await fetch(
//       `${process.env.BACKEND_API_URL}/api/auth/register`,
//       {
//         method: "POST",
//         body: registerFormData,
//       },
//     );

//     const result = await res.json();

//     console.log("REGISTER RESULT =", result);

//     if (!res.ok || !result.success) {
//       return {
//         success: false,
//         statusCode: result.statusCode || res.status,
//         message: result.message || "Registration failed",
//         data: null,
//       };
//     }
//   } catch (error) {
//     console.error("Register Error:", error);

//     return {
//       success: false,
//       statusCode: 500,
//       message: "Something went wrong during registration",
//       data: null,
//     };
//   }

//   redirect("/login");
// };
