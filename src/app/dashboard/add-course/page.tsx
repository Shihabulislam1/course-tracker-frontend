import React from "react";
// import { useState} from "react";
import AddCourse from "@/components/local/AddCourse";
import { redirect } from "next/navigation";

import {
  fetchCourseCategories,
  fetchCourseTypes,
  getUserID,
} from "@/lib/courses";
import { getSession, getCsrfToken, getSessionId } from "@/lib/auth";

const AddCoursePage = async () => {
  const session = await getSession();
  const csrfToken = await getCsrfToken();
  const sessionId = await getSessionId();
  if (!session) {
    redirect("/login");
  }
  const courseTypesResults = await fetchCourseTypes(
    session,
    csrfToken,
    sessionId
  );
  const courseCategoriesResults = await fetchCourseCategories(
    session,
    csrfToken,
    sessionId
  );

  return (
    <section>
      <AddCourse
        courseTypes={courseTypesResults}
        courseCategories={courseCategoriesResults}
      />
    </section>
  );
};

export default AddCoursePage;
