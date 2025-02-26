"use client";

import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const ViewPositions = () => {
  interface Position {
    id: string;
    name: string;
    description?: string;
    parentId?: string;
    createdAt?: Date;
  }

  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const q = query(collection(db, "positions"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const positionsArray = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            description: data.description,
            parentId: data.parentId,
            createdAt: data.createdAt?.toDate(),
          };
        });

        setPositions(positionsArray);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
      setLoading(false);
    };

    fetchPositions();
  }, []);

  const buildHierarchy = (items: any[], parentId: string | null = null): Position[] => {
    return items
      .filter((item) => item.parentId === parentId)
      .map((item) => ({
        ...item,
        children: buildHierarchy(items, item.id),
      }));
  };

  const renderTree = (nodes: any[]) => (
    <ul className="pl-4">
      {nodes.map((node) => (
        <li key={node.id} className="mb-2">
          <strong>{node.name}</strong> {node.description && `- ${node.description}`}
          {node.children.length > 0 && renderTree(node.children)}
        </li>
      ))}
    </ul>
  );

  if (loading) return <p>Loading positions...</p>;

  const hierarchy = buildHierarchy(positions);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Position Hierarchy</h2>
      {positions.length === 0 ? <p>No positions available.</p> : renderTree(hierarchy)}
    </div>
  );
};

export default ViewPositions;
