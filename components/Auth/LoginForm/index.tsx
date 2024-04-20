"use client";

import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";

const LoginForm = () => {
  const LoginSchema = z.object({
    email: z.string().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
  });

  type FormData = z.infer<typeof LoginSchema>;

  const { handleSubmit, register, formState } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
  });

  const OnSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    const response = await axios.post("/api/auth/login", {
      data,
    });
    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit(OnSubmit)}>
      <div>
        <Label>
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          {...register("email")}
          name="email"
          type="email"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <Label>
          Password <span className=" text-red-500">*</span>
        </Label>
        <Input
          {...register("password")}
          name="password"
          type="password"
          placeholder="Enter your password"
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default LoginForm;
