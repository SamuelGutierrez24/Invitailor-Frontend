"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
export default function HomePage() {
    const { user } = useCurrentUser()  
  return (
    <div>
      <h1>Welcome {user?.email || "Guest"}!</h1>
    </div>
  );
}
