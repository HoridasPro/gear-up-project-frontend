"use client";
import React, { useActionState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { loginAction } from "../_actions/authAction";
import { toast } from "sonner";

const LoginForm = () => {
  const [state, action, pending] = useActionState(loginAction, false);
  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Login successful");
    }
    if (!state.success) {
      toast.error(state.message || "Login failed");
    }
  }, [state]);
  return (
    <div>
      <form action={action} className="space-y-4">
        <Card className="p-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Inter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="Inter your password"
              required
            />
          </div>

          <Button type="submit" className="cursor-pointer">
            {pending ? "Submiting..." : "Login"}
            Login
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default LoginForm;
