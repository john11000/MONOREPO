import { URL_API_EMPLOYEES } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";
import { IEmployees } from "../models/Groups.type";

export default function useGetEmployees() {
  const { request, loading } = useFetch();

  const getEmployees = () => {
    return request<{ employees :IEmployees[]}>({ url: URL_API_EMPLOYEES });
  };

  return {
    getEmployees,
    loading,
  };
}
