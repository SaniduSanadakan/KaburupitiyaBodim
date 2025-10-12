import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { getAllUsers } from "@/services/authService";
import { Button } from "@/components/ui/button";
import UsersTable from "./components/Users/UsersTable";
import LogoutButton from "./components/common/LogoutButton";
import AddUserDialog from "./components/Users/AddUserDialog";

export default function AdminDashboard() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingUsers, setIsFetchingUsers] = useState(false);
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState(null);

    // Fetch users on component mount
    useEffect(() => {
        handleGetUser();
    }, []);

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

    const handleGetUser = async (e) => {
        e?.preventDefault();
        try {
            setIsFetchingUsers(true);
            setError(null);
            const data = await getAllUsers();
            setUserData(data || []);
        } catch (error) {
            console.error('Get users failed:', error);
            setError('Failed to fetch users. Please try again.');
        } finally {
            setIsFetchingUsers(false);
        }
    };

    // Handle user added event
    const handleUserAdded = () => {
        handleGetUser(); // Refresh the users list
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <LogoutButton 
                    onLogout={handleLogOut} 
                    isLoading={isLoading} 
                />
            </div>

            <div className="bg-white rounded-lg border shadow-sm">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Users</h2>
                        <div className="flex space-x-2">
                            <Button 
                                variant="outline"
                                onClick={handleGetUser} 
                                disabled={isFetchingUsers}
                            >
                                {isFetchingUsers ? 'Refreshing...' : 'Refresh'}
                            </Button>
                            <AddUserDialog onUserAdded={handleGetUser} />
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    <UsersTable 
                        users={userData} 
                        isLoading={isFetchingUsers}
                        onRefresh={handleGetUser}
                        isRefreshing={isFetchingUsers}
                    />
                </div>
            </div>
        </div>
    );
}