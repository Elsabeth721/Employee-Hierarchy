import Link from "next/link";

export default function Sidebar({ role, setPage }: { role: string; setPage: (page: string) => void }) {
  return (
    <aside className="w-64 bg-green-400 text-white h-screen p-5">
      <h2 className="text-lg font-bold">Company Hierarchy</h2>
      <ul className="mt-5 space-y-3">
        <li>
          <button onClick={() => setPage("home")} className="hover:text-gray-400">Home</button>
        </li>
        {role === "admin" && (
          <>
            <li>
              <button onClick={() => setPage("add")} className="hover:text-gray-400">Add Position</button>
            </li>
            <li>
              <button onClick={() => setPage("view")} className="hover:text-gray-400">View Positions</button>
            </li>
            <li>
              <button onClick={() => setPage("update")} className="hover:text-gray-400">Update Positions</button>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}
