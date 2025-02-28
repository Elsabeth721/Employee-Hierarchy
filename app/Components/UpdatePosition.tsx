import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { 
  IconChevronDown, 
  IconEdit, 
  IconTrash, 
  IconDotsVertical, 
  IconCheck, 
  IconX 
} from "@tabler/icons-react";
import { Group, Tree, TextInput, Button, TreeNodeData } from "@mantine/core";
import { db } from "../firebaseConfig";

interface Position {
  id: string;
  name: string;
  description: string;
  parentId: string;
  createdAt: Date;
}

const UpdatePositions = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ name: "", description: "", parentId: "" });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

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
        console.log("Positions:", positionsArray);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
      setLoading(false);
    };

    fetchPositions();
  }, []);

  if (loading) return <p>Loading positions...</p>;

  const toggleExpand = (id: string) => {
    setExpandedNodes((prev) =>
      prev.includes(id) ? prev.filter((nodeId) => nodeId !== id) : [...prev, id]
    );
  };

  const toggleMenu = (id: string) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const startEditing = (node: TreeNodeData) => {
    setEditingId(node.value);
    setEditData({
      name: node.label as string,
      description: (node as any).description || "",
      parentId: (node as any).parentId || "",
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({ name: "", description: "", parentId: "" });
  };

  const saveEdit = async (id: string) => {
    try {
      await updateDoc(doc(db, "positions", id), editData);
      setPositions(positions.map(pos => pos.id === id ? { ...pos, ...editData } : pos));
      setEditingId(null);
    } catch (error) {
      console.error("Error updating position:", error);
    }
  };

  const deletePosition = async (id: string) => {
    try {
      await deleteDoc(doc(db, "positions", id));
      setPositions(positions.filter(pos => pos.id !== id));
      setMenuOpen(null);
    } catch (error) {
      console.error("Error deleting position:", error);
    }
  };

  const buildHierarchy = (items: Position[], parentId: string | null = null): TreeNodeData[] => {
    return items
      .filter((item) => item.parentId === parentId || (!item.parentId && !parentId))
      .map((item) => ({
        label: item.name,
        value: item.id,
        children: buildHierarchy(items, item.id),
        description: item.description,
        parentId: item.parentId,
      }));
  };

  const hierarchy = buildHierarchy(positions);
  console.log("Hierarchy:", hierarchy);

  return (
    <div className="p-8 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Employee Hierarchy</h2>

      <Tree
  data={hierarchy}
  levelOffset={23}
  renderNode={({ node }) => (
    <div className="flex justify-between items-center w-full relative">
      <Group className="cursor-pointer" onClick={() => toggleExpand(node.value)}>
        <span>{node.label}</span>
      </Group>
      {editingId === node.value && (
        <div className="bg-white shadow-md p-4 rounded-lg mt-2 w-full max-w-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Edit Position</h3>
          <TextInput 
            className="w-full p-2 border-gray-300 rounded-md mb-2"
            value={editData.name} 
            onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))} 
            placeholder="Enter name"
          />
          <TextInput 
            className="w-full p-2 border-gray-300 rounded-md mb-2"
            value={editData.description} 
            onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))} 
            placeholder="Enter description"
          />
          <select 
            className="w-full p-2 border border-gray-300 rounded-md mb-3 bg-white"
            value={editData.parentId} 
            onChange={(e) => setEditData(prev => ({ ...prev, parentId: e.target.value }))}
          >
            <option value="">No Parent</option>
            {positions.map((pos) => (
              <option key={pos.id} value={pos.id}>{pos.name}</option>
            ))}
          </select>
      
                
                <div className="flex justify-end">
                  <Button 
                    onClick={() => saveEdit(node.value)} 
                    size="sm" 
                    className="bg-green-500 text-white hover:bg-green-600 px-4 py-1 rounded-md"
                  >
                    <IconCheck size={16} />
                  </Button>
                  <Button 
                    onClick={cancelEditing} 
                    size="sm" 
                    className="bg-red-500 text-white hover:bg-red-600 px-4 py-1 rounded-md"
                  >
                    <IconX size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default UpdatePositions;