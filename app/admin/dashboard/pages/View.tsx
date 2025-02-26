import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../store/employeeSlice";
import { RootState, AppDispatch } from "../../store/store";
import { Table, Loader, Center, Alert } from "@mantine/core";

const ViewEmployees = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, loading, error } = useSelector((state: RootState) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  if (loading) {
    return (
      <Center>
        <Loader size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center>
        <Alert color="red">{error}</Alert>
      </Center>
    );
  }

  return (
    <Table striped highlightOnHover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.id}</td>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.position}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ViewEmployees;
