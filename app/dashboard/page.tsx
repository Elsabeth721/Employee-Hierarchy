"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Sidebar from "../Components/Sidebar";
import AddPosition from "../Components/AddPosition";
import ViewPositions from "../Components/ViewPosition";
import UpdatePosition from "../Components/UpdatePosition";

export default function Dashboard() {
  const router = useRouter();
  const role = useSelector((state: { auth: { role: string } }) => state.auth.role);
  const [page, setPage] = useState("home"); // Track the selected page

  useEffect(() => {
    if (!role) {
      router.push("/auth");
    }
  }, [role, router]);

  if (!role) return <p>Loading...</p>;

  return (
    <div className="flex h-screen">
      <Sidebar role={role} setPage={setPage} />
      <main className="flex-1 p-5">
        <h1 className="text-xl font-bold mb-5">Dashboard - {role.toUpperCase()}</h1>
        
        {page === "home" && <p>Welcome to the Dashboard</p>}
        {page === "add" && <AddPosition />}
        {page === "view" && <ViewPositions />}
        {page === "update" && <UpdatePosition/>}
      </main>
    </div>
  );
}
