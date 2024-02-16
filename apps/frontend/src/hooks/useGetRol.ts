import { AppStore } from "@/redux/store";
import { useSelector } from "react-redux";

const useGetRol = (): string => {
  const authState = useSelector((state: AppStore) => state.authState);
  const role = authState?.user?.role?.toLowerCase();
  return role;
};

export default useGetRol;
