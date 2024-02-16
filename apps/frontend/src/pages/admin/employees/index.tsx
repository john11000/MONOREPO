import { ROUTER_LINK_EMPLOYEES } from "@/constants/routes-link.constants";
import { TITLE_MODULE_EMPLEADOS } from "@/constants/title.constants";
import { AdminLayout } from "@/features/commons";
import EmployeesContainer from "@/features/employees/containers/EmployeesContainer";
import { setAppBarTitle } from "@/redux/slices/app.slice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function EmployeesPage() {
    const dispatcher = useDispatch();
    const router = useRouter();
    router.push(ROUTER_LINK_EMPLOYEES);
    useEffect(() => {
      dispatcher(setAppBarTitle(TITLE_MODULE_EMPLEADOS));
    }, [dispatcher]);
    return <AdminLayout>
    <EmployeesContainer />
    </AdminLayout>
}