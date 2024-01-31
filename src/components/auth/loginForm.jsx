"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import CardWrapper from "./cardWrapper";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../../schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormErrorMessage } from "../formError";
import { FormSuccessMessage } from "../formSuccess";
import { login } from "../../../actions/login";

const LoginForm = () => {
  const [isPending, startTran] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data) => {
    setError("");
    setSuccess("");

    startTran(() => {
      login(data).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account?"
      backbuttonHref="/auth/register"
      showSocial={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {" "}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="example@email.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="*********"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormErrorMessage message={error} />
          <FormSuccessMessage message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
