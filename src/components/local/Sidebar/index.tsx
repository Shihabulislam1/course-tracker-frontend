"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname(); 
  return (
    <div className="bg-gray-50">
    <ul className="shadow-xl flex flex-col gap-[1px] h-full px-4 pt-6">
      <li className={`sidebar-link ${pathname === "/dashboard/add-course" ? "active" : ""}`}>
        <Link href="/dashboard/add-course">Add Courses</Link>
      </li>
      <li className={`sidebar-link ${pathname === "/dashboard/courses" ? "active" : ""}`}>
        <Link href="/dashboard/courses">Courses</Link>
      </li>
      <li className={`sidebar-link ${pathname === "/dashboard/summary" ? "active" : ""}`}>
        <Link href="/dashboard/summary">Summary</Link>
      </li>
      <li className={`sidebar-link ${pathname === "/dashboard/completed-courses" ? "active" : ""}`}>
        <Link href="/dashboard/completed-courses">Completed Courses</Link>
      </li>
    </ul>
  </div>
  );
};

export default Sidebar;
