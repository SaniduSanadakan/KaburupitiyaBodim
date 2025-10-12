import AdminDashboard from "../components/Admin/adDashboard";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
    const { role } = useContext(AuthContext);

    return (
        role === "admin" ? <AdminDashboard /> : <div>House Owner Dashboard</div>
    );
}