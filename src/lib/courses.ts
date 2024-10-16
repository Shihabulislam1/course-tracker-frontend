import { API_URL } from "@/constants";
import { Session } from "inspector/promises";

export interface courseDataTypes {
  name: string;
  description: string;
  url: string;
  required_unit: number;
  user: string;
  course_type: string;
  course_category: string;
}
export interface ReturnedCourse {
  id: string;
  name: string;
  description: string;
  url: string;
  required_unit: number;
  created_at: string;
  user: string;
  course_type: string;
  course_category: string;
}

export interface CourseCategories {
  id: string;
  name: string;
  description: string;
}

export interface CourseType {
  id: string;
  name: string;
  description: string;
  unit: string;
}

export const fetchCourseCategories = async (
  token: string,
  csrfToken: string,
  sessionId: string
): Promise<CourseCategories[]> => {
  const response = await fetch(`${API_URL}/courses/categories/?page=1`, {
    headers: {
      "Content-Type": "application/json",
      "WW-Authenticate": `${token}`,
      Cookie: `csrftoken=${csrfToken}; sessionid=${sessionId}`,
    },
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    console.error("Network response was not ok", errorResponse);
    throw new Error("Network response was not ok");
  }
  const responseData = await response.json();
  return responseData.results as CourseCategories[];
};

export const fetchCourseTypes = async (
  token: string,
  csrfToken: string,
  sessionId: string
): Promise<CourseType[]> => {
  const response = await fetch(`${API_URL}/courses/types/?page=1`, {
    headers: {
      "Content-Type": "application/json",
      "WW-Authenticate": `${token}`,
      Cookie: `csrftoken=${csrfToken}; sessionid=${sessionId}`,
    },
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    console.error("Network response was not ok", errorResponse);
    throw new Error("Network response was not ok");
  }
  const responseData = await response.json();
  return responseData.results as CourseType[];
};

//write a function to get the user id
export const getUserID = async (
  session: string,
  csrfToken: string,
  sessionId: string
): Promise<string> => {
  const response = await fetch(`${API_URL}/auth/user/`, {
    headers: {
      "Content-Type": "application/json",
      "WW-Authenticate": `${session}`,
      Cookie: `csrftoken=${csrfToken}; sessionid=${sessionId}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const responseData = await response.json();
  return responseData.pk as string;
};

// export const handleCourseUpdate = async (
//   session: string,
//   csrfToken: string,
//   sessionId: string,
//   courseData: courseDataTypes
// ): Promise<ReturnedCourse> => {
//   const response = await fetch(`${API_URL}/courses/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${session}`,
//       "X-CSRFToken": csrfToken,
//       Cookie: `csrftoken=${csrfToken}; sessionid=${sessionId}`,
//     },
//     credentials: "include",  // Include credentials (cookies) with the request
//     body: JSON.stringify(courseData),
//   });

//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }

//   const responseData = await response.json();
//   return responseData as ReturnedCourse;
// };
