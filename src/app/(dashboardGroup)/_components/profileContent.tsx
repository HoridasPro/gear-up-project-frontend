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
import Image from "next/image";
import { toast } from "sonner";
import { z } from "zod";

type ProfileClientProps = {
  user: IUser;
};

const profileValidationSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),

  address: z.string().trim().min(1, "Address is required."),

  image: z
    .instanceof(File)
    .refine(
      (file) => file.type.startsWith("image/"),
      "Please select a valid image file.",
    )
    .refine(
      (file) => file.size <= 10 * 1024 * 1024,
      "Image size must be less than 10MB.",
    )
    .nullable(),
});

export default function ProfileContent({ user }: ProfileClientProps) {
  const router = useRouter();

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

  const handleEdit = () => {
    setName(profileData?.name || "");
    setAddress(profileData?.address || "");
    setPreviewUrl(initialPhoto);
    setSelectedImage(null);

    setIsEditing(true);
  };

  const handleCancel = () => {
    if (loading) return;

    setIsEditing(false);

    setName(profileData?.name || "");
    setAddress(profileData?.address || "");
    setPreviewUrl(initialPhoto);
    setSelectedImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageValidation = z
      .instanceof(File)
      .refine(
        (file) => file.type.startsWith("image/"),
        "Please select a valid image file.",
      )
      .refine(
        (file) => file.size <= 10 * 1024 * 1024,
        "Image size must be less than 10MB.",
      );

    const result = imageValidation.safeParse(file);

    if (!result.success) {
      toast.error(result.error.issues[0]?.message || "Invalid image.");
      return;
    }

    setSelectedImage(file);

    const objectUrl = URL.createObjectURL(file);

    setPreviewUrl(objectUrl);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    const validationResult = profileValidationSchema.safeParse({
      name,
      address,
      image: selectedImage,
    });

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]?.message;

      toast.error(firstError || "Please check your information.");

      return;
    }

    setLoading(true);

    try {
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

        const imageResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: imageData,
          },
        );

        const imageResult = await imageResponse.json();

        if (!imageResponse.ok || !imageResult.success) {
          throw new Error(
            imageResult?.error?.message || "Image upload failed.",
          );
        }

        imageUrl = imageResult.data.display_url;
      }

      const updatedProfileData = {
        name: name.trim(),
        address: address.trim(),
        profilePhoto: imageUrl,
      };

      const result = await updateProfile(updatedProfileData);

      if (!result.success) {
        throw new Error(result.message || "Profile update failed.");
      }

      toast.success(result.message || "Profile updated successfully!");

      setIsEditing(false);
      setSelectedImage(null);

      router.refresh();
    } catch (error: any) {
      toast.error(
        error?.message || "Something went wrong while updating profile.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Account Overview
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Manage and view your personal account details
            </p>
          </div>

          {!isEditing && (
            <button
              type="button"
              onClick={handleEdit}
              className="btn-cyber cursor-pointer"
            >
              <Edit3 className="mr-2 h-4 w-4" />
              Edit Profile
            </button>
          )}

          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-700 disabled:opacity-50 cursor-pointer"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-[#131f33] shadow-2xl shadow-black/50">
            <div className="relative h-36 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 sm:h-44">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:16px_16px]" />
            </div>

            <div className="px-6 pb-8 sm:px-10">
              <div className="-mt-16 mb-6 flex flex-col items-center sm:-mt-20 sm:flex-row sm:items-end sm:justify-between">
                <div className="group relative">
                  <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-[#131f33] bg-slate-900 shadow-xl ring-1 ring-slate-800 sm:h-45 sm:w-45">
                    <Image
                      src={previewUrl}
                      alt={name || "User"}
                      fill
                      sizes="(max-width: 768px) 128px, 144px"
                      className="object-cover"
                      onError={() => {
                        setPreviewUrl(defaultAvatar);
                      }}
                    />

                    {isEditing && (
                      <label
                        htmlFor="avatar-upload"
                        className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] transition hover:bg-black/70"
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

                <div className="mt-4 flex flex-wrap justify-center gap-2 sm:mt-0 sm:justify-start">
                  <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                    <ShieldCheck className="h-3.5 w-3.5" />

                    {profileData?.role || "CUSTOMER"}
                  </div>

                  {profileData?.status && (
                    <div
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
                        profileData.status === "SUSPEND"
                          ? "border-amber-500/20 bg-amber-500/10 text-amber-400"
                          : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                      }`}
                    >
                      Status: {profileData.status}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-b border-slate-800/80 pb-6">
                {isEditing ? (
                  <div className="max-w-md space-y-4">
                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Full Name
                      </label>

                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                        className="w-full rounded-xl border border-slate-700 bg-[#0b1320] px-4 py-2 text-base font-semibold text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-900"
                        placeholder="Enter full name"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Address
                      </label>

                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        disabled={loading}
                        className="w-full rounded-xl border border-slate-700 bg-[#0b1320] px-4 py-2 text-sm font-medium text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-900"
                        placeholder="Enter address"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-white sm:text-3xl">
                      {profileData?.name || "User"}
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      {profileData?.email}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-[#0b1320]/60 p-4">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-[#131f33] shadow-sm">
                      <User className="h-5 w-5 text-blue-400" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-400">
                        Full Name
                      </p>

                      <p className="mt-0.5 truncate font-semibold text-slate-100">
                        {isEditing
                          ? name
                          : profileData?.name || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-[#0b1320]/60 p-4 opacity-80">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-[#131f33] shadow-sm">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-400">
                        Email Address
                      </p>

                      <p className="mt-0.5 truncate font-semibold text-slate-100">
                        {profileData?.email || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-[#0b1320]/60 p-4 sm:col-span-2">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-[#131f33] shadow-sm">
                      <MapPin className="h-5 w-5 text-blue-400" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-400">
                        Address
                      </p>

                      <p className="mt-0.5 truncate font-semibold text-slate-100">
                        {isEditing
                          ? address || "Not specified"
                          : profileData?.address || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-8 flex justify-end gap-3 border-t border-slate-800/80 pt-6">
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-700 disabled:opacity-50 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-cyber cursor-pointer"
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
