
import { redirect } from "next/navigation";


import FormPage from "@/components/local/Register";

export default async function RegisterPage() {
  

//   if (session) {
//     redirect("/");
//   }

  return (
    <section className="bg-black h-screen flex items-center justify-center">
      <div className="w-[600px]">
        <FormPage />
      </div>
    </section>
  );
}
