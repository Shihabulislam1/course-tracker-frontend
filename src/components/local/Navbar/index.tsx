import React from "react";
import { getSession } from "@/lib/auth";
import { ModeToggle } from "../ModeToggle";
import SignUpDrop from "./SignUpDrop";
import Logout from "../Logout";

const Navbar = async () => {
  const session = await getSession();
  return (
      <ul className="flex justify-between items-center shadow-md py-4 px-16  dark:bg-rgay-950  bg-opacity-15  dark:shadow-custom-dark">
        <li className="text-xl"><span className="text-primary font-bold text-3xl">C</span>ourse<span className="text-primary opacity-80 text-2xl">Log</span></li>
        <li className="flex ">
          <div className="flex items-center justify-center gap-4">
            <ModeToggle />
            {session ? <Logout /> : <SignUpDrop />}
          </div>
        </li>
      </ul>

  );
};

export default Navbar;
