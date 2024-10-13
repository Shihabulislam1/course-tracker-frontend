"use client";
import React from "react";
import { logout } from "@/lib/logout";
import { Button } from "@/components/ui/button";

const Logout = () => {
  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    await logout();
  };

  return (
    <form onSubmit={handleLogout}>
      <Button type="submit">Logout</Button>
    </form>
  );
};

export default Logout;