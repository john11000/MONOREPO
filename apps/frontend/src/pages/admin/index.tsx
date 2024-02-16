import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppBarTitle } from "@/redux/slices/app.slice";
import { useRouter } from "next/router";
import { ROUTER_LINK_TIMESHEETS } from "@/constants/routes-link.constants";

export default function DashboardPage() {
  const dispatcher = useDispatch();
  const router = useRouter();
  router.push(ROUTER_LINK_TIMESHEETS);
  useEffect(() => {
    dispatcher(setAppBarTitle("Home"));
  }, [dispatcher]);
}
