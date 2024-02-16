import { URL_API_TIMESHEETS } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";


export default function useDeleteTimesheets() {
  const { request, loading } = useFetch();

  const deleteTimesheet = (id: string) => {
    return request({ method: "DELETE", url: URL_API_TIMESHEETS + "/" + id });
  };

  return {
    deleteTimesheet,
    loading,
  };
}
