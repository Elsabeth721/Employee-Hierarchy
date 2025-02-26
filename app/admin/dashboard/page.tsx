'use client'
// AdminDashboard.tsx
import React, { useEffect } from 'react';
import usePositions from '../dashboard/hooks/usePosition';
import Link from "next/link";
import PositionTree from '../dashboard/components/PositionTree';

const AdminDashboard = () => {
  const { positions, loadPositions } = usePositions();

  useEffect(() => {
    loadPositions();
  }, [loadPositions]);

  return (
    <div className="admin-dashboard">
      <h1 className="text-xl">Employee Position Hierarchy</h1>
      <div className="mt-4">
        <Link href="/add-position" className="btn">Add Position</Link>
      </div>
      <PositionTree positions={positions} />
    </div>
  );
};

export default AdminDashboard;
