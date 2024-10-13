import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/constants";


const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

// export async function login(formData: FormData) {
//   // Verify credentials && get the user
//   const loginPayload = {
//     username: formData.get("username"),
//     email: formData.get("email"),
//     password: formData.get("password"),
//   };
//   const response = await fetch(`${API_URL}/auth/login/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(loginPayload),
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   const responseData = await response.json();
//   const userKey = responseData.key;

//   // Create the session
//   const expires = new Date(Date.now() + 10 * 1000);
//   const session = await encrypt({ userKey, expires });

//   // Save the session in a cookie
//   cookies().set("session", session, { expires, httpOnly: true });
//   toast({ title: "Login Successful", description: "Welcome back!" });
// }

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
  }
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
