import { URL_API_CITIES } from "@/constants/url-apis.constants";
import useFetch from "./useFetch";

export default function useGetDepartaments() {
  const { request, loading } = useFetch();

  const getDepartaments = () => {
    return request<any>({ url: URL_API_CITIES });
  };

  return { getDepartaments, loading };
}
