import { URL_API_EMPLOYEES } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";
import { IEmployees } from "../models/Groups.type";

export default function useUpdateEmployees() {
  const { request, loading } = useFetch();

  const updateEmployees = (data: IEmployees) => {
    return request({ method: "PUT", url: URL_API_EMPLOYEES  + "/" + data.id, data });
  };

  return {
    updateEmployees,
    loading,
  };
}
