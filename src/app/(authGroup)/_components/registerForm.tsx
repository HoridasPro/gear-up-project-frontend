"use client";
import React, { useState } from "react";
import { z } from "zod";
import { toast, ToastContainer } from "react-toastify";
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
      console.error("Register Error:", error);

      toast.error("Something went wrong during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <ToastContainer position="top-right" autoClose={3000} />
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

            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
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

          <div className="space-y-2">
            <Label htmlFor="profilePhoto">Profile Photo</Label>

            <Input
              id="profilePhoto"
              name="profilePhoto"
              type="file"
              accept="image/jpeg,image/png,image/webp"
            />

            <p className="text-xs text-gray-500">
              JPG, PNG or WEBP — Maximum 10MB
            </p>
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
