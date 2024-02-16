import { AxiosCall } from "@/models";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const useFetchAndLoad = () => {
  const [loading, setLoading] = useState(false);
  let controller: AbortController;

  const callEndpoint = async <T>(axiosCall: AxiosCall<T>) => {
    if (axiosCall.controller) controller = axiosCall.controller;
    setLoading(true);
    let result = {} as AxiosResponse<T>;
    try {
      result = await axiosCall.call;
    } catch (err: any) {
      setLoading(false);
      throw err;
    }
    setLoading(false);
    return result;
  };

  const cancelEndpoint = () => {
    setLoading(false);
    controller && controller.abort();
  };

  useEffect(() => {
    return () => {
      cancelEndpoint();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, callEndpoint };
};

export default useFetchAndLoad;
