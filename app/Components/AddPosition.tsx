"use client";

import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";

const AddPosition = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState("");
  const [positions, setPositions] = useState<{ id: string; name?: string; description?: string; parentId?: string }[]>([]); // Available positions
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPositions = async () => {
      const querySnapshot = await getDocs(collection(db, "positions"));
      const positionsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPositions(positionsArray);
    };

    fetchPositions();
  }, []);

  const handleAddPosition = async () => {
    if (!name) {
      setMessage("Position name is required.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "positions"), {
        name,
        description,
        parentId: parentId || null, // Null if root position
        createdAt: serverTimestamp(),
      });

      setMessage("Position added successfully!");
      setName("");
      setDescription("");
      setParentId("");
    } catch (error) {
      setMessage("Failed to add position.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-bold mb-2">Add New Position</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Position Name"
        className="border p-2 mb-2 w-full"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        className="border p-2 mb-2 w-full"
      />
      <select
        value={parentId}
        onChange={(e) => setParentId(e.target.value)}
        className="border p-2 mb-2 w-full"
      >
        <option value="">No Parent (Top-level Position)</option>
        {positions.map((pos) => (
          <option key={pos.id} value={pos.id}>
            {pos.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleAddPosition}
        className="bg-blue-500 text-white p-2 w-full"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Position"}
      </button>
      {message && <p className="text-red-500 mt-2">{message}</p>}
    </div>
  );
};

export default AddPosition;
