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
    children?: Position[];
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

  const buildHierarchy = (items: Position[], parentId: string | null = null): Position[] => {
    return items
      .filter((item) => item.parentId === parentId)
      .map((item) => ({
        ...item,
        children: buildHierarchy(items, item.id),
      }));
  };

  const renderTree = (nodes: Position[], level = 0) => (
    <div className="flex flex-col items-center">
      {nodes.map((node) => (
        <div key={node.id} className="flex flex-col items-center mb-8">
          {/* Parent node */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mb-2 transition-transform transform hover:scale-110" />
            <strong className="text-lg font-semibold text-red-900">{node.name}</strong>
            {node.description && (
              <span className="text-gray-600 text-sm">{node.description}</span>
            )}
          </div>

          {/* Vertical line from parent to children */}
          {node.children && node.children.length > 0 && (
            <div className="w-px h-8 bg-gray-400 mb-4"></div>
          )}

          {/* Children nodes (horizontal layout) */}
          {node.children && node.children.length > 0 && (
            <div className="flex space-x-12 mt-4 justify-center">
              {node.children.map((child) => (
                <div key={child.id} className="flex flex-col items-center">
                  {/* Horizontal line from parent to child */}
                  <div className="w-24 h-px bg-gray-400 mb-4"></div>

                  {/* Child node */}
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mb-2 transition-transform transform hover:scale-110" />
                    <strong className="text-lg font-semibold text-blue-800">{child.name}</strong>
                    {child.description && (
                      <span className="text-gray-600 text-sm">{child.description}</span>
                    )}
                  </div>

                  {/* Vertical line from child to grandchildren */}
                  {child.children && child.children.length > 0 && (
                    <div className="w-px h-8 bg-gray-400 mb-4"></div>
                  )}

                  {/* Render grandchildren recursively */}
                  {child.children && child.children.length > 0 && (
                    <div className="flex space-x-12 mt-4 justify-center">
                      {child.children.map((grandchild) => (
                        <div key={grandchild.id} className="flex flex-col items-center">
                          {/* Horizontal line from child to grandchild */}
                          <div className="w-24 h-px bg-gray-400 mb-4"></div>

                          {/* Grandchild node */}
                          <div className="flex flex-col items-center mb-4">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mb-2 transition-transform transform hover:scale-110" />
                            <strong className="text-lg font-semibold text-gray-800">
                              {grandchild.name}
                            </strong>
                            {grandchild.description && (
                              <span className="text-gray-600 text-sm">
                                {grandchild.description}
                              </span>
                            )}
                          </div>

                          {/* Render deeper levels recursively */}
                          {grandchild.children && grandchild.children.length > 0 && (
                            <div className="mt-4 text-gray-700">{renderTree(grandchild.children, level + 1)}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  if (loading) return <p>Loading positions...</p>;

  const hierarchy = buildHierarchy(positions);

  return (
    <div className="p-8 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Perago Information System Employee Hierarchy</h2>
      {positions.length === 0 ? (
        <p>No positions available.</p>
      ) : (
        <div className="flex flex-col items-center">{renderTree(hierarchy)}</div>
      )}
    </div>
  );
};

export default ViewPositions;
