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
  const [page, setPage] = useState("home"); 

  useEffect(() => {
    if (!role) {
      router.push("/auth");
    }
  }, [role, router]);

  if (!role) return <p>Loading...</p>;

  return (
    <div className="flex h-screen">
      <Sidebar role={role} setPage={setPage} />
      <main className="flex-1 p-5 bg-gray-100">
        <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800">
          Welcome to the Dashboard - {role.toUpperCase()}
        </h1>

        {page === "home" && (
          <div className="flex flex-col items-center justify-center bg-gradient-to-r from-gray-400 to-gray-500 text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Hello, {role.toUpperCase()}!</h2>
            <p className="text-lg mb-6">Here, you can manage your company's positions and other details.</p>
            <div className="flex space-x-8">
              <button
                onClick={() => setPage("add")}
                className="bg-green-500 px-6 py-3 text-white rounded-lg hover:bg-green-600 transition"
              >
                Add Position
              </button>
              <button
                onClick={() => setPage("view")}
                className="bg-blue-500 px-6 py-3 text-white rounded-lg hover:bg-blue-600 transition"
              >
                View Positions
              </button>
            </div>
          </div>
        )}

        {page === "add" && <AddPosition />}
        {page === "view" && <ViewPositions />}
        {page === "update" && <UpdatePosition />}
      </main>
    </div>
  );
}
