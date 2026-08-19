"use client";
import React, { useState } from "react";
import { z } from "zod";
import "react-toastify/dist/ReactToastify.css";
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
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Email is not valid"),

  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),

  role: z
    .string()
    .trim()
    .min(1, "Role is required")
    .transform((value) => value.toUpperCase())
    .refine((value) => value === "CUSTOMER" || value === "PROVIDER", {
      message: "Role must be CUSTOMER or PROVIDER",
    }),

  address: z.string().trim().min(1, "Address is required"),
});

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setPreview(null);
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const validationResult = registerSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
      address: formData.get("address"),
    });

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;

      if (errors.name?.[0]) {
        toast.error(errors.name[0]);
        setLoading(false);
        return;
      }

      if (errors.email?.[0]) {
        toast.error(errors.email[0]);
        setLoading(false);
        return;
      }

      if (errors.password?.[0]) {
        toast.error(errors.password[0]);
        setLoading(false);
        return;
      }

      if (errors.role?.[0]) {
        toast.error(errors.role[0]);
        setLoading(false);
        return;
      }

      if (errors.address?.[0]) {
        toast.error(errors.address[0]);
        setLoading(false);
        return;
      }

      setLoading(false);
      return;
    }

    const profilePhoto = formData.get("profilePhoto") as File | null;

    if (!profilePhoto || profilePhoto.size === 0) {
      toast.error("Profile photo is required");
      setLoading(false);
      return;
    }

    const maxSize = 10 * 1024 * 1024;

    if (profilePhoto.size > maxSize) {
      toast.error("Profile photo must be less than 10MB");
      setLoading(false);
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(profilePhoto.type)) {
      toast.error("Only JPG, PNG and WEBP images are allowed");
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

      if (!res.ok || !result.success) {
        toast.error(result.message || "Registration failed");
        return;
      }

      toast.success("Registration successful!");

      form.reset();

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      console.log("Something is wrong", error);
      toast.error("Something went wrong during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 items-center justify-center">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <Card className="p-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>

            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>

            <Input
              id="address"
              name="address"
              type="text"
              placeholder="Enter your address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>

            <Select name="role" defaultValue="CUSTOMER">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="CUSTOMER">Customer</SelectItem>

                <SelectItem value="PROVIDER">Provider</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3 text-xs font-medium text-gray-300 sm:text-sm">
            <Label htmlFor="profilePhoto">Profile Photo</Label>

            <Input
              id="profilePhoto"
              name="profilePhoto"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full cursor-pointer rounded-xl border border-gray-800/80 bg-gray-900/60 text-xs text-gray-400 outline-none transition-all file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500/10 file:px-4 file:text-xs file:font-semibold file:text-cyan-400 hover:file:bg-cyan-500/20 sm:text-sm"
            />

            {preview && (
              <div className="mt-3 flex justify-center">
                <Image
                  src={preview}
                  alt="Profile preview"
                  width={32}
                  height={32}
                  className="h-[250px] w-full border-2 object-cover"
                />
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer"
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default RegisterForm;
