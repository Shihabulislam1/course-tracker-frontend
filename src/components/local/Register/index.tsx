"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { API_URL } from "@/constants";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

export const FormSchema = z
  .object({
    username: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password1: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    //match password1 and password2
    password2: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords must match!",
    path: ["password2"],
  });

type FormData = z.infer<typeof FormSchema>;

export default function FormPage() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password1: "",
      password2: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Submitting form", data);

    const { username, email, password1, password2 } = data;

    try {
      const response = await fetch(`${API_URL}/auth/registration/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password1, password2 }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Process response here
  
      const responseData = await response.json();
      const userKey = responseData.key;
      if (userKey) {
        //redirect to login page
        redirect("/login");
      }
    } catch (error: unknown) {
      console.error("Registration Failed:", error);
      toast({
        title: "Registration Failed",
        description: (error as Error).message,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-2/3 space-y-6 bg-white"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type="password" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  {...field}
                  type="password"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
