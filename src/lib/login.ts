// src/components/local/Login/loginAction.ts
"use server";

import { API_URL } from "@/constants";

import { encrypt } from "./auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function login(formData: FormData) {

    // Verify credentials && get the user
    const loginPayload = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const response = await fetch(`${API_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginPayload),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    const userKey = responseData.key;
  
    // Create the session
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ userKey, expires });
  
    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
    redirect('/dashboard');
  }