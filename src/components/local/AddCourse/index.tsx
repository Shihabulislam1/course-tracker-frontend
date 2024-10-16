"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ReturnedCourse,
  CourseCategories,
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
  required_unit: z.coerce.number().min(1, "Required unit must be at least 1"),
  course_type: z.string(),
  course_category: z.string(),
});

type FormData = z.infer<typeof FormSchema>;

const AddCourse = ({
  courseTypes,
  courseCategories,
}: {
  courseTypes: CourseCategories[];
  courseCategories: CourseCategories[];
}) => {
  const [responseDataCourse, setResponseDataCourse] =
    useState<ReturnedCourse | null>(null);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      url: "",
      required_unit: 0,
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
      course_type,
      course_category,
    };

    try {
      // Send the request to the Next.js route handler
      const responseCourse = await fetch("/api/course-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inData),
      });

      // Handle the response
      const responseCourseData = await responseCourse.json();

      if (responseCourse.ok) {
        // Set the response data to state if request was successful
        setResponseDataCourse(responseCourseData?.data);
      } else {
        console.error("Error submitting course:", responseCourseData.error);
      }
    } catch (error) {
      console.log("Course Error", error);
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full flex-grow space-y-6 bg-white border-2 border-primary/15 px-12 py-8 rounded-lg dark:bg-primary/15 dark:border-primary bg-opacity-50 shadow-lg text-md dark:text-gray-200 dark:shadow-custom-dark"
        onSubmit={form.handleSubmit(onSubmit)}
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
                  type="number"
                  placeholder="Enter required units"
                  {...field}
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
                      {/* <SelectLabel>Units</SelectLabel> */}
                      {courseTypes.map((obj) => (
                        <SelectItem value={obj.id} key={obj.id}>
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
                      {/* <SelectLabel>Units</SelectLabel> */}
                      {courseCategories.map((obj) => (
                        <SelectItem value={obj.id} key={obj.id}>
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
          disabled={form.formState.isSubmitting}
          className=" w-full text-center   text-lg text-gray-50 dark:text-gray-900 bg-primary hover:bg-primary/95 py-5 font-semibold"
        >
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default AddCourse;
