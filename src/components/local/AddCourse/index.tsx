"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  fetchCourseCategories,
  fetchCourseTypes,
  handleCourseUpdate,
  CourseType,
  CourseCategories,
  ReturnedCourse,
  clientCookies,
} from "@/lib/courses";

export const FormSchema = z.object({
  name: z.string().min(4, {
    message: "Course name must be at least 4 characters.",
  }),
  description: z.string().min(4, {
    message: "Course description must be at least 4 characters.",
  }),
  url: z.string().url({
    message: "Please enter a valid url.",
  }),
  required_unit: z.number().int().positive(),
  user: z.string(),
  course_type: z.string(),
  course_category: z.string(),
});

type FormData = z.infer<typeof FormSchema>;
interface AddCourseProps {
  setResponseDataCourse: (data: ReturnedCourse) => void;
}

const AddCourse: React.FC<AddCourseProps> = ({ setResponseDataCourse }) => {
  const [courseTypes, setCourseTypes] = useState<CourseType[]>([]);
  const [courseCategorie, setCourseCategorie] = useState<CourseCategories[]>(
    []
  );
  const [session, setSession] = useState("");

  useEffect(() => {
    const fetchAndSetCourseTypes = async (token: String) => {
      const courseTypesResults = await fetchCourseTypes(token);
      setCourseTypes(courseTypesResults);
    };
    const fetchAndSetCourseCategories = async (token: String) => {
      const courseCategoriesResults = await fetchCourseCategories(token);
      setCourseCategorie(courseCategoriesResults);
    };
    const getCookie = clientCookies();
    if (getCookie) {
      setSession(getCookie);
      fetchAndSetCourseTypes(session);
      fetchAndSetCourseCategories(session);
    } else {
      redirect("/login");
    }
  }, []);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      url: "",
      required_unit: 0,
      user: "",
      course_type: "",
      course_category: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const {
      name,
      description,
      url,
      required_unit,
      course_type,
      course_category,
    } = data;
    const inData = {
      name,
      description,
      url,
      required_unit,
      user: session,
      course_type,
      course_category,
    };

    try {
      const resposeCourse = await handleCourseUpdate(inData);
      setResponseDataCourse(resposeCourse);
    } catch (error) {
      console.log("Course Error", error);
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full flex-grow space-y-6 bg-white border-2 border-primary/15 px-12 py-8 rounded-lg dark:bg-primary/15 dark:border-primary bg-opacity-50 shadow-lg text-md dark:text-gray-200 dark:shadow-custom-dark"
        //   {onSubmit={form.handleSubmit(onSubmit)}}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input placeholder="Course Name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your description here..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url</FormLabel>
              <FormControl>
                <Input placeholder="https://example.xyz" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required_unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required Unit</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter units you want to finish."
                  {...field}
                  type="password"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="course_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Course Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Units</SelectLabel>
                      {courseTypes.map((obj) => (
                        <SelectItem value={obj.name} key={obj.id}>
                          {obj.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="course_category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Category</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Course Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Units</SelectLabel>
                      {courseCategorie.map((obj) => (
                        <SelectItem value={obj.name} key={obj.id}>
                          {obj.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className=" w-full text-center   text-lg text-gray-50 dark:text-gray-900 bg-primary hover:bg-primary/95 py-5 font-semibold"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddCourse;
