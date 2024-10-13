import Sidebar from "@/components/local/Sidebar";
import type { Metadata } from "next";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <div className="flex h-[calc(100vh-69px)] bg-gray">
      <Sidebar />
      <ScrollArea className="h-full w-full flex justify-center items-center">
        {children}
      </ScrollArea>
    </div>
  );
}
