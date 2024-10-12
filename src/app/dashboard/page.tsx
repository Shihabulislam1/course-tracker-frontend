"use client";

import React from 'react'
import { logout } from '@/lib/logout'

const page = () => {
  return (
    <>
    <div>Dashboard</div>
    <form
        action={async () => {
          await logout();
        }}
      >
        <button type="submit">Logout</button>
        </form>
    </>
    
  )
}

export default page