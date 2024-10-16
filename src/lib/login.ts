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
  //i also need to ssave cookies from the response
  /*
  Cookie: csrftoken=qgHKCPkiMRvnrMLIJMw57JuyCwsJMsN3; sessionid=zjlasa38v1qdyfxizh31imtzrqi8nub3
  */
  const setCookie = (name: string, value: string) => {
    cookies().set(name, value, { path: "/" });
  };

  const csrfToken = response.headers
    .get("set-cookie")
    ?.match(/csrftoken=([^;]+)/)?.[1];
  const sessionId = response.headers
    .get("set-cookie")
    ?.match(/sessionid=([^;]+)/)?.[1];

  if (csrfToken) {
    setCookie("csrftoken", csrfToken);
  }

  if (sessionId) {
    setCookie("sessionid", sessionId);
  }

  // Create the session
  // const expires = new Date(Date.now() + 10 * 1000);
  // const session = await encrypt({ userKey, expires });

  // Save the session in a cookie
  // cookies().set("session", session, { expires, path: "/" });
  setCookie("session", userKey);
  redirect("/dashboard/add-course");
}
