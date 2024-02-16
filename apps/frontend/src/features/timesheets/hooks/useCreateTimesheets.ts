import { URL_API_TIMESHEETS } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";
import { ITimesheets } from "../models/Timesheets.type";

export default function useCreateTimesheets() {
  const { request, loading } = useFetch();

  const createTimesheets = (data: Partial<ITimesheets>) => {
    return request({ method: "POST", url: URL_API_TIMESHEETS, data });
  };

  return {
    createTimesheets,
    loading,
  };
}
