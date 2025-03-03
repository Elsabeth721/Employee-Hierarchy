'use client';

import { IconChevronDown, IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import { Group, Tree, ActionIcon, Menu, TextInput, Button, Modal, TreeNodeData } from "@mantine/core";

interface ExtendedTreeNodeData extends TreeNodeData {
  description?: string;
}
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, doc, updateDoc, deleteDoc } from "firebase/firestore";
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
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const buildHierarchy = (items: Position[], parentId: string | null = null): ExtendedTreeNodeData[] => {
    const filteredItems = items.filter((item) => item.parentId === parentId);
    return filteredItems.map((item) => ({
      label: item.name,
      value: item.id,
      description: item.description, // Include description in the node data
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

        setPositions(positionsArray);
      } catch (error) {
        console.error("Error fetching positions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  const handleEdit = (id: string, name: string, description: string) => {
    setEditingNode(id);
    setEditedName(name);
    setEditedDescription(description);
    setIsModalOpen(true); // Open the modal for editing
    setMenuOpen(null); // Close the menu
  };

  const handleSave = async (id: string) => {
    try {
      const positionRef = doc(db, "positions", id);
      await updateDoc(positionRef, { name: editedName, description: editedDescription });
      setPositions(positions.map(pos => pos.id === id ? { ...pos, name: editedName, description: editedDescription } : pos));
      setEditingNode(null);
      setIsModalOpen(false); // Close the modal after saving
    } catch (error) {
      console.error("Error updating position:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "positions", id));
      setPositions(positions.filter(pos => pos.id !== id));
    } catch (error) {
      console.error("Error deleting position:", error);
    }
  };

  if (loading) return <p>Loading positions...</p>;

  const hierarchy = buildHierarchy(positions);

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
            style={{ position: "relative" }}
          >
            {hasChildren && (
              <IconChevronDown
                size={18}
                style={{
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            )}
            <Group gap={5}>
              <span>{node.label}</span>
              <Menu
                position="bottom-end"
                opened={menuOpen === node.value}
                onClose={() => setMenuOpen(null)}
              >
                <Menu.Target>
                  <ActionIcon
                    size="sm"
                    color="white"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent tree node expansion
                      setMenuOpen(node.value);
                    }}
                  >
                    <IconDots size={16}  />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown style={{ zIndex: 1000 }}>
                  <Menu.Item
                    leftSection={<IconEdit size={16} />}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent menu from closing prematurely
                      handleEdit(node.value, node.label as string, (node as ExtendedTreeNodeData).description as string);
                    }}
                  >
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconTrash size={16} />}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent menu from closing prematurely
                      handleDelete(node.value);
                    }}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        )}
      />

      {/* Edit Modal */}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Position"
      >
        <TextInput
          label="Name"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          placeholder="Enter name"
          mb="md"
        />
        <TextInput
          label="Description"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          placeholder="Enter description"
          mb="md"
        />
        <Button onClick={() => handleSave(editingNode!)}>Save</Button>
      </Modal>
    </div>
  );
};

export default UpdatePositions;