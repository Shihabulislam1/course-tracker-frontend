import { NextResponse } from "next/server";
import { getSession, getCsrfToken, getSessionId } from "@/lib/auth";
import { getUserID } from "@/lib/courses";
import { API_URL } from "@/constants";

// Handle POST requests
export async function POST(req: Request) {
  try {
    // Parse the request body
    const { name, description, url, required_unit, course_type, course_category } = await req.json();
    
    // Get the current session
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get CSRF token and session ID
    const csrfToken = await getCsrfToken();
    const sessionId = await getSessionId();
    
    // Get user ID based on session
    const user = await getUserID(session, csrfToken, sessionId);

    // Prepare the payload for third-party API
    const payload = {
      name,
      description,
      url,
      required_unit,
      user,
      course_type,
      course_category,
    };

    console.log("Payload being sent:", payload); // Log the payload

    // Send data to third-party API
    const thirdPartyResponse = await fetch(`${API_URL}/courses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session}`,
        "X-CSRFToken": csrfToken,
        Cookie: `csrftoken=${csrfToken}; sessionid=${sessionId}`,
      },
      body: JSON.stringify(payload),
    });

    // Check for errors in third-party API response
    if (!thirdPartyResponse.ok) {
      const responseData = await thirdPartyResponse.json();
      console.error("Third-party API response:", responseData); // Log the error response
      return NextResponse.json({ error: "Failed to connect to third-party API" }, { status: 500 });
    }

    // Parse the third-party API response
    const responseData = await thirdPartyResponse.json();

    // Return a success response
    return NextResponse.json({ success: true, data: responseData }, { status: 200 });

  } catch (error) {
    console.error("Error in course-update API:", error); // Log the error
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
