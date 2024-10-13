import { redirect } from "next/navigation";

import FormPage from "@/components/local/Register";
import Link from "next/link";

export default async function RegisterPage() {
  //   if (session) {
  //     redirect("/");
  //   }

  return (
    <section className=" flex flex-col items-center justify-center gap-4">
      <div className="w-[600px]">
        <p className="w-full flex-grow text-center text-2xl text-primary font-semibold my-8 ">
          Register for an account to get started.
        </p>
        <FormPage />
        <div className="flex gap-2 text-md justify-center items-center mt-4">
          <p>Already have an account?</p>
          <Link href="/login" className="text-primary font-semibold text-lg">
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}
