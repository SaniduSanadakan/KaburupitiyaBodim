import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getUser } from "../services/authService";
import Loading from "../components/common/Loading";

export default function Dashboard() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(null);

    const handleLogOut = async () => {
        try {
            setIsLoading(true);
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            setIsLoading(false);
        }
    };

    const handleGetUser = async () => {
        try {
            setIsLoading(true);
            const response = await getUser();
            setUserData(response);
        } catch (error) {
            console.error('Get user failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loading fullScreen={true} text="Processing..." />;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            
            <div className="space-y-4">
                <div className="flex space-x-4">
                    <button 
                        onClick={handleLogOut} 
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                        disabled={isLoading}
                    >
                        Log Out
                    </button>
                    <button 
                        onClick={handleGetUser} 
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                        disabled={isLoading}
                    >
                        Get User
                    </button>
                </div>

                {userData && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">User Information</h2>
                        <pre className="text-sm bg-white p-3 rounded overflow-auto">
                            {JSON.stringify(userData, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}