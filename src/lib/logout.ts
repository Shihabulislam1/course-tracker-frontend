"use server";

import { API_URL } from "@/constants";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logout() {
    const logout = await fetch(`${API_URL}/auth/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!logout.ok) {
      throw new Error("Network response was not ok");
    }
    const logDetails = await logout.json();
    // Destroy the session
    if (logDetails.detail === "Successfully logged out.") {
      cookies().set("session", "", { expires: new Date(0) });
      redirect("/");
    }
  }