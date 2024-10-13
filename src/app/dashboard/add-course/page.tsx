"use client";

import React from "react";
import { useState, useEffect } from "react";
import AddCourse from "@/components/local/AddCourse";
import { ReturnedCourse } from "@/lib/courses";

const AddCoursePage = () => {
  const [responseDataCourse, setResponseDataCourse] = useState<ReturnedCourse>({
    id: "",
    name: "",
    description: "",
    url: "",
    required_unit: 0,
    created_at: "",
    user: "",
    course_type: "",
    course_category: "",
  });

  return (
    <section>
      <AddCourse setResponseDataCourse={setResponseDataCourse} />
    </section>
  );
};

export default AddCoursePage;
