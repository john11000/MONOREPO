import { URL_API_TIMESHEETS } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";

export default function useUpdateNoteTimesheets() {
    const { request, loading } = useFetch();

    const updateTimesheets = (data: { id: string, note: string }) => {
        return request({ method: "PUT", url: `${URL_API_TIMESHEETS}/${data.id}/note`, data: { notes: data.note } });
    };

    return {
        updateTimesheets,
        loading,
    };
}
