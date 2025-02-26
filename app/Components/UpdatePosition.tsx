"use client";
import { useState, useEffect, SetStateAction } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore();

// Fetch all positions
async function fetchPositions() {
  const querySnapshot = await getDocs(collection(db, "positions"));
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return { id: doc.id, name: data.name, description: data.description, parentId: data.parentId };
  });
}

// PositionTree Component
export default function PositionTree() {
  const [positions, setPositions] = useState<{ id: string; name: string; description: string; parentId: string | null; }[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null); // ID of position being edited
  const [formData, setFormData] = useState<{ name: string; description: string; parentId: string | null }>({ name: "", description: "", parentId: null });

  useEffect(() => {
    fetchPositions().then(setPositions);
  }, []);

  // Build tree structure
  function buildTree(data: any[], parentId: string | null = null): any[] {
    return data
      .filter((pos) => pos.parentId === parentId)
      .map((pos) => ({
        ...pos,
        children: buildTree(data, pos.id),
      }));
  }

  const positionTree = buildTree(positions);

  // Handle Edit Click
  function handleEdit(position: Position) {
    setEditingId(position.id);
    setFormData({ name: position.name, description: position.description, parentId: position.parentId });
  }

  // Handle Save (Update Firestore)
  async function handleSave() {
    if (!editingId) return;

    const positionRef = doc(db, "positions", editingId);
    await updateDoc(positionRef, formData);

    setEditingId(null);
    setPositions(await fetchPositions()); // Refresh data
  }

  // Handle Delete
  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this position?")) return;

    await deleteDoc(doc(db, "positions", id));

    setPositions(await fetchPositions()); // Refresh data
  }

  return (
    <div>
      <h2 className="text-lg font-bold">Company Hierarchy</h2>
      <ul>
        {positionTree.map((pos) => (
          <PositionNode key={pos.id} position={pos} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </ul>

      {/* Edit Form */}
      {editingId && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="font-bold">Edit Position</h3>
          <input
            type="text"
            className="block w-full p-2 border rounded mb-2"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Position Name"
          />
          <input
            type="text"
            className="block w-full p-2 border rounded mb-2"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Description"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleSave}>
            Save
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setEditingId(null)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

// PositionNode Component (Recursive)
interface Position {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  children: Position[];
}

function PositionNode({ position, onEdit, onDelete }: { position: Position; onEdit: (position: Position) => void; onDelete: (id: string) => void }) {
  return (
    <li className="mb-2">
      <div className="flex justify-between items-center">
        <span className="font-semibold">{position.name}</span>
        <div>
          <button className="bg-green-500 text-white px-2 py-1 rounded mr-2" onClick={() => onEdit(position)}>
            Edit
          </button>
          <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => onDelete(position.id)}>
            Delete
          </button>
        </div>
      </div>
      {position.children.length > 0 && (
        <ul className="ml-5">
          {position.children.map((child) => (
            <PositionNode key={child.id} position={child} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </li>
  );
}
