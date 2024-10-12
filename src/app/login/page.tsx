

import LoginPage  from "@/components/local/Login";

export default async function page() {

  return (
    <section className="bg-black h-screen flex items-center justify-center">
      <div className="w-[600px]">
        <LoginPage/>
      </div>
    </section>
  );
}
