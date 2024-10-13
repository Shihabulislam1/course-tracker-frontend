import { API_URL } from "@/constants";
import { becrypt } from "@/lib/auth";
import Cookies from "js-cookie";

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

export const clientCookies = (): string | null => {
  return Cookies.get("session") || null;
};

export const fetchCourseCategories = async (
  token: String
): Promise<CourseCategories[]> => {
  const response = await fetch(`${API_URL}/courses/categories/?page=1`, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the headers
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const responseData = await response.json();
  return responseData.results as CourseCategories[];
};

export const fetchCourseTypes = async (
  token: String
): Promise<CourseType[]> => {
  const response = await fetch(`${API_URL}/courses/types/?page=1`, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the headers
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const responseData = await response.json();
  return responseData.results as CourseType[];
};

export const handleCourseUpdate = async (
  courseData: courseDataTypes
): Promise<ReturnedCourse> => {
  const response = await fetch(`${API_URL}/courses/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(courseData),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const responseData = await response.json();
  return responseData as ReturnedCourse;
};
