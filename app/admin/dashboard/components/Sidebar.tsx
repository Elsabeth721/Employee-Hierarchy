'use client'; // ✅ Ensures it's a client component
import { IconAdjustments, IconFileAnalytics, IconGauge, IconUserPlus, IconUsers } from '@tabler/icons-react';

const Sidebar = ({ setSelectedPage }: { setSelectedPage: (page: string) => void }) => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <ul>
        <li className="mb-4 cursor-pointer flex items-center" onClick={() => setSelectedPage('view')}>
          <IconUsers className="mr-2" /> View Employees
        </li>
        <li className="mb-4 cursor-pointer flex items-center" onClick={() => setSelectedPage('add')}>
          <IconUserPlus className="mr-2" /> Add Employee
        </li>
        <li className="mb-4 cursor-pointer flex items-center" onClick={() => setSelectedPage('edit')}>
          <IconFileAnalytics className="mr-2" /> Edit Employee
        </li>
        <li className="mb-4 cursor-pointer flex items-center" onClick={() => setSelectedPage('delete')}>
          <IconAdjustments className="mr-2" /> Delete Employee
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
