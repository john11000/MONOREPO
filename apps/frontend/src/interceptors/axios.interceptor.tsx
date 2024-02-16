/* eslint-disable no-console */
import { URL_API_BASE } from "@/constants/url-apis.constants";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ROUTE_LINK_LOGIN } from "@/constants/routes-link.constants";
import { toastsManager } from "@/utilities";

// axios instance
const instance = axios.create({
  baseURL: URL_API_BASE,
});

interface Props {
  children: JSX.Element;
}

const AxiosInterceptor = ({ children }: Props) => {
  console.log("interceptor");
  const route = useRouter();

  useEffect(() => {
    const resInterceptor = (response: any) => {
      console.log("resInterceptor");
      return response;
    };

    const errInterceptor = (error: any) => {
      if (error.response) {
        if (error.response.status === 401) {
          route.push(ROUTE_LINK_LOGIN);
          return Promise.reject();
        }

        if (error.response.status === 400 || error.response.status === 409) {
          if (Array.isArray(error.response.data.message)) {
            const er = error.response.data.message as string[];
            toastsManager.showToast("error", er.join());
          } else if (error.response.data.message) {
            toastsManager.showToast("error", error.response.data.message);
          }
          return Promise.reject();
        }

        if (error.response.status === 404) {
          toastsManager.showToast("error", "Recurso no encontrado");
          return Promise.reject();
        }

        toastsManager.showToast(
          "error",
          "Ocurrió un error, contacta con soporte"
        );
        return Promise.reject();
      }
      toastsManager.showToast("error", "No se pudo conectar con el servidor");
      return Promise.reject();
    };

    const interceptor = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => {
      instance.interceptors.response.eject(interceptor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default instance;
export { AxiosInterceptor };
