import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Tracker",
  description: "Track your Courses and Book reading progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <div>{children}</div>
  
  );
}
