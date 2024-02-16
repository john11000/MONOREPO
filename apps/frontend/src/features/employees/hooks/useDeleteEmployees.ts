import { URL_API_EMPLOYEES } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";


export default function useDeleteEmployees() {
  const { request, loading } = useFetch();

  const deleteEmployee = (id: string) => {
    return request({ method: "DELETE", url: URL_API_EMPLOYEES + "/" + id });
  };

  return {
    deleteEmployee,
    loading,
  };
}
