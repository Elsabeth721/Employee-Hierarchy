'use client'
import { IconChevronDown } from "@tabler/icons-react";
import { Group, Tree, TreeNodeData } from "@mantine/core";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface Position {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  createdAt: Date;
}

const ViewPositions = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);

  const buildHierarchy = (items: Position[], parentId: string | null = null): TreeNodeData[] => {
    console.log("Building hierarchy for parentId:", parentId); 
    const filteredItems = items.filter((item) => item.parentId === parentId);
    console.log("Filtered Items:", filteredItems); 

    return filteredItems.map((item) => ({
      label: item.name,
      value: item.id,
      children: buildHierarchy(items, item.id),
    }));
  };

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
            parentId: data.parentId || null, 
            createdAt: data.createdAt?.toDate(),
          };
        });

        console.log("Fetched positions:", positionsArray); 
        setPositions(positionsArray);
      } catch (error) {
        console.error("Error fetching positions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  if (loading) return <p>Loading positions...</p>;

  const hierarchy = buildHierarchy(positions);
  console.log("Positions before building hierarchy:", positions); 
  console.log("Hierarchy structure:", hierarchy); 

  return (
    <div className="p-8 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Perago Information System Employee Hierarchy
      </h2>

      <Tree
        data={hierarchy}
        levelOffset={23}
        renderNode={({ node, expanded, hasChildren, elementProps }) => (
          <Group gap={5} {...elementProps}>
            {hasChildren && (
              <IconChevronDown
                size={18}
                style={{
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            )}
            <span>{node.label}</span>
          </Group>
        )}
      />
    </div>
  );
};

export default ViewPositions;