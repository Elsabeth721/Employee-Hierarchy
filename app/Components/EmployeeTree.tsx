
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface Employee {
  id: string;
  name: string;
  parentId: string | null;
}

export default function EmployeeTree() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const querySnapshot = await getDocs(collection(db, "positions"));
      const empList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Employee[];
      setEmployees(empList);
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Employee Hierarchy</h2>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.name} {emp.parentId ? `→ Child of ${emp.parentId}` : " (Root)"}
          </li>
        ))}
      </ul>
    </div>
  );
}
