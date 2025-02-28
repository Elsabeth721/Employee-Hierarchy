"use client";

import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";

const AddPosition = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState("");
  const [positions, setPositions] = useState<{ id: string; name?: string; description?: string; parentId?: string }[]>([]);
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
        parentId: parentId || null, 
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
    <div className="flex justify-center m-10">
      <div className="m-10 p-10 border rounded-lg shadow-md bg-white max-w-sm w-full">
        <h2 className="text-lg font-bold mb-2 text-center">Add New Position</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Position Name"
          className="border p-1 mb-3 w-full rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="border p-1 mb-3 w-full rounded"
        />
        <select
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
          className="border p-1 mb-3 w-full rounded"
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
          className="bg-green-500 text-white p-1 w-full rounded hover:bg-green-600 transition ease-in"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Position"}
        </button>
        {message && <p className="text-green-500 mt-2 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default AddPosition;
