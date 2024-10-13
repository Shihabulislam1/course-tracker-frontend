import React from "react";
import { Button } from "@/components/ui/button";

import Link from "next/link";

const SignUpDrop = () => {
  return (
    <div className="flex gap-2">
      <Link href="/login">
        <Button>Login</Button>
      </Link>
      <Link href="/register">
        <Button>Sign Up</Button>
      </Link>
    </div>
  );
};

export default SignUpDrop;
