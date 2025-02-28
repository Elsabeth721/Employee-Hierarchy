'use client'
import { IconChevronDown, IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import { Group, Tree, TreeNodeData, Menu, ActionIcon } from "@mantine/core";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface Position {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  createdAt: Date;
}

const UpdatePositions = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

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

  const buildHierarchy = (items: Position[], parentId: string | null = null): TreeNodeData[] => {
    return items
      .filter((item) => item.parentId === parentId)
      .map((item) => ({
        label: item.name,
        value: item.id,
        children: buildHierarchy(items, item.id),
      }));
  };

  const hierarchy = buildHierarchy(positions);

  // Edit handler
  const handleEdit = (id: string) => {
    console.log(`Editing position: ${id}`);
    // Implement your edit logic here
    setMenuOpen(null); // Close menu after clicking
  };

  // Delete handler
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this position?")) {
      try {
        await deleteDoc(doc(db, "positions", id));
        setPositions((prev) => prev.filter((pos) => pos.id !== id)); // Remove from UI
        console.log(`Deleted position: ${id}`);
      } catch (error) {
        console.error("Error deleting position:", error);
      }
    }
    setMenuOpen(null); // Close menu after clicking
  };

  return (
    <div className="p-8 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Perago Information System Employee Hierarchy
      </h2>

      <Tree
        data={hierarchy}
        levelOffset={23}
        renderNode={({ node, expanded, hasChildren, elementProps }) => (
          <Group
            gap={5}
            {...elementProps}
            className="relative w-full flex justify-between"
          >
            {/* Label with Expand/Collapse icon */}
            <div className="flex items-center gap-2">
              {hasChildren && (
                <IconChevronDown
                  size={18}
                  style={{
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              )}
              <span>{node.label}</span>
            </div>

            {/* Three-dot menu stays visible on click */}
            <Menu
              opened={menuOpen === node.value}
              onChange={(open) => setMenuOpen(open ? node.value : null)}
              shadow="md"
            >
              <Menu.Target>
                <ActionIcon onClick={() => setMenuOpen(node.value)}>
                  <IconDotsVertical size={18} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<IconEdit size={16} />} onClick={() => handleEdit(node.value)}>
                  Edit
                </Menu.Item>
                <Menu.Item leftSection={<IconTrash size={16} />} color="red" onClick={() => handleDelete(node.value)}>
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        )}
      />
    </div>
  );
};

export default UpdatePositions;
