"use client";

import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTheme } from "next-themes";
import dark_image from "@/public/study_image_dark.svg";
import light_image from "@/public/study_image.svg";

const Hero = () => {
  const { theme } = useTheme();
  return (
    <section className=" flex px-16 mt-20 pt-12">
      <div className="flex flex-col justify-center items-start gap-4 ">
        <h1 className="text-primary font-semibold text-4xl ">
          Track Your Journey, <br />
          Transform Your Learning.
        </h1>
        <h2 className="text-xl text-gray-600 dark:text-gray-200">
          Whether you’re conquering tutorials, diving into books, or solving
          programming challenges, our platform empowers you to keep tabs on your
          growth and achievements.
        </h2>
        <p>
          Stay motivated as you document your progress. With personalized
          tracking, insightful analytics, and a supportive community, you can
          make every learning experience count.
        </p>
        <div className="w-full  flex flex-col justify-center items-center my-6 gap-4">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-200">
            Join our community of learners and unlock your potential!
          </p>
          <Link href="/register">
            <Button className="text-md text-white font-semibold py-6 bg-primary dark:text-gray-800">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <Image
          src={theme === "dark" ? light_image : dark_image}
          alt="Hero Image"
          width={1000}
          height={600}
        />
      </div>
    </section>
  );
};

export default Hero;
