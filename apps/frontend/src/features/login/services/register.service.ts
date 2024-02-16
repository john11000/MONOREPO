import { LoginResponse, RegisterFormState } from "../models/login.type";
import { URL_API_BASE } from "@/constants/url-apis.constants";
import { loadAbort } from "@/utilities";
import axios from "axios";

export const registerUrl = `${URL_API_BASE}/auth/register`;

export const doRegister = (data: RegisterFormState) => {
  const controller = loadAbort();
  return {
    call: axios.post<LoginResponse>(
      registerUrl,
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};
