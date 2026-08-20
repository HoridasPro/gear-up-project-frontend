import React from "react";
import Link from "next/link";
import RegisterForm from "../_components/registerForm";

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 mt-5 mb-5">
      <div className="w-full max-w-md  rounded-lg border p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>

          <p className="text-gray-500">Join GearUp and start renting gear</p>
        </div>

        <RegisterForm />

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? Please{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
