import { URL_API_TIMESHEETS } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";
import { ITimesheets } from "../models/Timesheets.type";

export default function useUpdateTimesheets() {
  const { request, loading } = useFetch();

  const updateTimesheets = (data: ITimesheets) => {
    return request({ method: "PUT", url: URL_API_TIMESHEETS  + "/" + data.id, data });
  };

  return {
    updateTimesheets,
    loading,
  };
}
