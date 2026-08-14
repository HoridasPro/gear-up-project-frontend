/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  User,
  ShieldCheck,
  Camera,
  Edit3,
  Check,
  X,
  Loader2,
  MapPin,
} from "lucide-react";

import { IUser } from "@/type/type-gear";
import { updateProfile } from "../_actions/updateProfile";
// import { updateProfile } from "@/server/updateProfile";

type ProfileClientProps = {
  user: IUser;
};

export default function ProfileContent({ user }: ProfileClientProps) {
  const router = useRouter();

  // Backend response যদি { data: user } হয়
  const profileData = user?.data || user;

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

 

  const defaultAvatar = useMemo(() => {
    const userName = profileData?.name || "User";

    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      userName,
    )}`;
  }, [profileData?.name]);

  const initialPhoto = profileData?.profilePhoto?.trim()
    ? profileData?.profilePhoto.trim()
    : defaultAvatar;

  const [name, setName] = useState(profileData?.name || "");

  const [address, setAddress] = useState(profileData?.address || "");

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [previewUrl, setPreviewUrl] = useState(initialPhoto);

  // ==========================================
  // SYNC PROFILE DATA
  // ==========================================

  useEffect(() => {
    if (!isEditing && profileData) {
      setName(profileData?.name || "");
      setAddress(profileData?.address || "");

      const photo = profileData?.profilePhoto?.trim()
        ? profileData.profilePhoto.trim()
        : defaultAvatar;

      setPreviewUrl(photo);
      setSelectedImage(null);
    }
  }, [profileData, defaultAvatar, isEditing]);

  // ==========================================
  // EDIT
  // ==========================================

  const handleEdit = () => {
    console.log("Edit clicked");

    setName(profileData?.name || "");
    setAddress(profileData?.address || "");
    setPreviewUrl(initialPhoto);
    setSelectedImage(null);

    setIsEditing(true);
  };

  // ==========================================
  // CANCEL
  // ==========================================

  const handleCancel = () => {
    if (loading) return;

    setIsEditing(false);

    setName(profileData?.name || "");
    setAddress(profileData?.address || "");
    setPreviewUrl(initialPhoto);
    setSelectedImage(null);
  };

  // ==========================================
  // IMAGE CHANGE
  // ==========================================

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Image type validation
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // 5 MB validation
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      return;
    }

    setSelectedImage(file);

    const objectUrl = URL.createObjectURL(file);

    setPreviewUrl(objectUrl);
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    if (!name.trim()) {
      alert("Name is required.");
      return;
    }

    setLoading(true);

    try {
      // ========================================
      // STEP 1: IMAGE UPLOAD
      // ========================================

      let imageUrl = profileData?.profilePhoto?.trim() || "";

      if (selectedImage) {
        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

        if (!apiKey) {
          throw new Error(
            "ImgBB API key not found. Check NEXT_PUBLIC_IMGBB_API_KEY in .env.local",
          );
        }

        const imageData = new FormData();

        imageData.append("image", selectedImage);

        console.log("Uploading image...");

        const imageResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: imageData,
          },
        );

        const imageResult = await imageResponse.json();

        console.log("ImgBB response:", imageResult);

        if (!imageResponse.ok || !imageResult.success) {
          throw new Error(
            imageResult?.error?.message || "Image upload failed.",
          );
        }

        imageUrl = imageResult.data.display_url;

        console.log("Image uploaded:", imageUrl);
      }

      // ========================================
      // STEP 2: UPDATE DATA
      // ========================================

      const updatedProfileData = {
        name: name.trim(),
        address: address.trim(),
        profilePhoto: imageUrl,
      };

      console.log("Profile update data:", updatedProfileData);

      // ========================================
      // STEP 3: SERVER ACTION
      // ========================================

      console.log("Sending profile update through Server Action...");

      const result = await updateProfile(updatedProfileData);

      console.log("Profile update result:", result);

      // ========================================
      // STEP 4: ERROR
      // ========================================

      if (!result.success) {
        throw new Error(result.message || "Profile update failed.");
      }

      // ========================================
      // STEP 5: SUCCESS
      // ========================================

      alert(result.message || "Profile updated successfully!");

      setIsEditing(false);
      setSelectedImage(null);

      // Refresh Server Component
      router.refresh();
    } catch (error: any) {
      console.error("========== PROFILE UPDATE ERROR ==========");

      console.error("Error:", error);
      console.error("Message:", error?.message);

      console.error("==========================================");

      alert(error?.message || "Something went wrong while updating profile.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50/50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* ================= HEADER ================= */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Account Overview
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage and view your personal account details
            </p>
          </div>

          {!isEditing && (
            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95"
            >
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </button>
          )}

          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-300 disabled:opacity-50"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          )}
        </div>

        {/* ================= FORM ================= */}

        <form onSubmit={handleSubmit}>
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50">
            {/* ================= COVER ================= */}

            <div className="relative h-36 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 sm:h-44">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:16px_16px]" />
            </div>

            {/* ================= BODY ================= */}

            <div className="px-6 pb-8 sm:px-10">
              {/* ================= AVATAR ================= */}

              <div className="-mt-16 mb-6 flex flex-col items-center sm:-mt-20 sm:flex-row sm:items-end sm:justify-between">
                <div className="group relative">
                  <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-xl ring-1 ring-gray-100 sm:h-36 sm:w-36">
                    <img
                      src={previewUrl}
                      alt={name || "User"}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;

                        if (target.src !== defaultAvatar) {
                          target.src = defaultAvatar;
                        }
                      }}
                    />

                    {isEditing && (
                      <label
                        htmlFor="avatar-upload"
                        className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black/50 backdrop-blur-[2px]"
                      >
                        <Camera className="h-6 w-6 text-white" />

                        <span className="mt-1 text-[10px] font-medium text-white">
                          Change Photo
                        </span>
                      </label>
                    )}
                  </div>

                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={!isEditing || loading}
                    className="hidden"
                  />
                </div>

                {/* ROLE + STATUS */}

                <div className="mt-4 flex flex-wrap justify-center gap-2 sm:mt-0 sm:justify-start">
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    <ShieldCheck className="h-3.5 w-3.5" />

                    {profileData?.role || "CUSTOMER"}
                  </div>

                  {profileData?.status && (
                    <div
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        profileData.status === "SUSPEND"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      Status: {profileData.status}
                    </div>
                  )}
                </div>
              </div>

              {/* ================= NAME / ADDRESS ================= */}

              <div className="border-b border-gray-100 pb-6">
                {isEditing ? (
                  <div className="max-w-md space-y-4">
                    {/* NAME */}

                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Full Name
                      </label>

                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                        className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base font-semibold text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100"
                        placeholder="Enter full name"
                        required
                      />
                    </div>

                    {/* ADDRESS */}

                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Address
                      </label>

                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        disabled={loading}
                        className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100"
                        placeholder="Enter address"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                      {profileData?.name || "User"}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {profileData?.email}
                    </p>
                  </div>
                )}
              </div>

              {/* ================= DETAILS ================= */}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {/* NAME */}

                <div className="rounded-2xl border border-gray-100 bg-slate-50/50 p-4">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-500">
                        Full Name
                      </p>

                      <p className="mt-0.5 truncate font-semibold text-gray-900">
                        {isEditing
                          ? name
                          : profileData?.name || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* EMAIL */}

                <div className="rounded-2xl border border-gray-100 bg-slate-50/50 p-4 opacity-80">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-500">
                        Email Address
                      </p>

                      <p className="mt-0.5 truncate font-semibold text-gray-900">
                        {profileData?.email || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ADDRESS */}

                <div className="rounded-2xl border border-gray-100 bg-slate-50/50 p-4 sm:col-span-2">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-500">
                        Address
                      </p>

                      <p className="mt-0.5 truncate font-semibold text-gray-900">
                        {isEditing
                          ? address || "Not specified"
                          : profileData?.address || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= ACTION BUTTONS ================= */}

              {isEditing && (
                <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-6">
                  {/* CANCEL */}

                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  {/* SAVE */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
