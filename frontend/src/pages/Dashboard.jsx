import AdminDashboard from "../components/Admin/adDashboard";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import OwnersDashboard from "../components/owner/OwnersDashboard";
export default function Dashboard() {
    const { role } = useContext(AuthContext);

    return (
        role === "admin" ? <AdminDashboard /> :< OwnersDashboard />
    );
}