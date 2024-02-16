import React, { useEffect, useState } from "react";
import { GroupsProvider } from "@/features/employees/context/Groups.context";
import GroupsSettings from "@/features/employees/components/EmployeesSettings";
import EmployeesTable from "@/features/employees/components/EmployeesTable";
import useGetEmployees from "../hooks/useGetEmployees";
import { IEmployees } from "../models/Groups.type";
import EmployeesEditDialog from "../components/EmployeesEditDialog";

const EmployeesContainer = () => {
  const { getEmployees } = useGetEmployees();
  const [employeesData, setEmployeesData] = useState<IEmployees[]>();
  const getEmployeesFromApi = async () => {
    const employees = await getEmployees();
    setEmployeesData(employees.data?.employees);
  }

  useEffect(() => {
    getEmployeesFromApi();
  }, [])
  return (
    <GroupsProvider>
      <GroupsSettings />
      <EmployeesTable employees={employeesData || []} loading={false} updateTable={getEmployeesFromApi} />
      <EmployeesEditDialog getEmployeesFromApi={getEmployeesFromApi} />
    </GroupsProvider>
  );
};

export default EmployeesContainer;
