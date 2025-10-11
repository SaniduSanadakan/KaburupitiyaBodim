import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getUser } from "../services/authService";

export default function Dashboard() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleGetUser = async () => {
        try {
            const response = await getUser();
            console.log('User data:', response);
            // You can update the UI with the user data here if needed
        } catch (error) {
            console.error('Get user failed:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <button 
                onClick={handleLogOut} 
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
            >
                Log Out
            </button>
            <button 
                onClick={handleGetUser} 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            >
                Get User
            </button>
        </div>
    );
}