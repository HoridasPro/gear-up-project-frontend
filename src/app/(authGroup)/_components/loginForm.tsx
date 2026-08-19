"use client";
import React, { useActionState, useEffect, useState } from "react";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { loginAction } from "../_actions/authAction";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
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
});

const LoginForm = () => {
  const [state, action, pending] = useActionState(loginAction, false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Login successful");
    }

    if (!state.success) {
      toast.error(state.message || "Login failed");
    }
  }, [state]);

  const handleSubmit = (formData: FormData) => {
    const result = loginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;

      if (errors.email?.[0]) {
        toast.error(errors.email[0]);
        return;
      }

      if (errors.password?.[0]) {
        toast.error(errors.password[0]);
        return;
      }
    }

    action(formData);
  };

  return (
    <div>
      <form action={handleSubmit} className="space-y-4">
        <Card className="p-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input name="email" type="email" placeholder="Inter your email" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <Button type="submit" className="cursor-pointer">
            {pending ? "Submiting..." : "Login"}
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default LoginForm;
