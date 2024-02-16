import { URL_API_EMPLOYEES } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";
import { IEmployees } from "../models/Groups.type";

export default function useCreateEmployee() {
  const { request, loading } = useFetch();

  const createEmployee = (data: Partial<IEmployees>) => {
    return request({ method: "POST", url: URL_API_EMPLOYEES, data });
  };

  return {
    createEmployee,
    loading,
  };
}
