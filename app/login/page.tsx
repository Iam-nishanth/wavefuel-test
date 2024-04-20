import LoginForm from "@/components/Auth/LoginForm";
import Image from "next/image";
import React from "react";

export default function LoginPage() {
  return (
    <div className="flex w-full h-screen">
      <div className="flex-1 w-full h-full relative">
        <Image src="/images/sign-in.png" alt="sign-in" fill />
      </div>
      <div className="flex-1 h-full w-full max-w-md flex flex-col justify-center items-center px-5">
        <h1>Login/SignUp</h1>
        <LoginForm />
      </div>
    </div>
  );
}
