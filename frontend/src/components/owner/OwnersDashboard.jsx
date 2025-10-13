import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, CheckCircle, Clock, XCircle, Home, User, LogOut, LayoutDashboard } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "@/components/ui/button";

export default function OwnerDashboard() {
  const { role, logout } = useContext(AuthContext);
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "houseOwner") {
      navigate("/");
    } else {
      // Fetch ads from backend API
      fetch("/api/owner/ads")
        .then((res) => res.json())
        .then((data) => setAds(data))
        .catch(() => setAds([]));
    }
  }, [role, navigate]);

//   const handleEdit = (id) => {
//     navigate(`/edit-ad/${id}`);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this ad?")) {
//       await fetch(`/api/owner/ads/${id}`, { method: "DELETE" });
//       setAds(ads.filter((ad) => ad.id !== id));
//     }
//   };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="text-green-500" size={18} />;
      case "pending":
        return <Clock className="text-yellow-500" size={18} />;
      case "rejected":
        return <XCircle className="text-red-500" size={18} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            🏠 Owner Panel
          </h1>
          <nav className="space-y-3">
            <button
              onClick={() => navigate("/owner/dashboard")}
              className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <LayoutDashboard size={18} /> Dashboard
            </button>
            <button
              onClick={() => navigate("/owner/ads")}
              className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Home size={18} /> My Ads
            </button>
            <button
              onClick={() => navigate("/owner/profile")}
              className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <User size={18} /> Profile
            </button>
          </nav>
        </div>

        <div className="mt-8">
          <Button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white w-full"
          >
            <LogOut size={18} /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          My Advertisements
        </h2>

        <div className="bg-white shadow-md rounded-xl p-6">
          {ads.length === 0 ? (
            <p className="text-gray-500 text-center py-6">
              You haven’t posted any ads yet.
            </p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ads.map((ad) => (
                  <tr key={ad.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3">{ad.title}</td>
                    <td className="p-3 flex items-center gap-2">
                      {getStatusIcon(ad.status)}
                      <span className="capitalize">{ad.status}</span>
                    </td>
                    <td className="p-3 text-center space-x-3">
                      <button
                        onClick={() => handleEdit(ad.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(ad.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
