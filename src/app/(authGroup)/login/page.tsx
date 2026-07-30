import React from "react";
import Link from "next/link";
import LoginForm from "../_components/loginForm";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md  space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="mb-2 text-center text-3xl font-bold">Welcome Back</h1>

          <p className="mb-6 text-center text-gray-500">
            Inter your credentials to access your account
          </p>
        </div>

        <LoginForm />
        <p className="mt-6 text-center text-sm text-gray-600">
          Dont have an account? please{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
