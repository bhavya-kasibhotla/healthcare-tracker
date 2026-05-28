import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Healthcare Tracker</h1>

            <div className="space-x-6 text-lg">
                <Link to="/" className="hover:text-blue-400">
                    Home
                </Link>

                {!token && (
                    <>
                        <Link to="/login" className="hover:text-blue-400">
                            Login
                        </Link>
                        <Link to="/register" className="hover:text-blue-400">
                            Register
                        </Link>
                    </>
                )}

                {token && (
                    <>
                        <Link to="/dashboard" className="hover:text-blue-400">
                            Dashboard
                        </Link>
                        <Link to="/add-record" className="hover:text-blue-400">
                            Add Record
                        </Link>
                        <Link to="/medicines" className="hover:text-blue-400">
                            Medicines
                        </Link>
                        <Link to="/profile" className="hover:text-blue-400">
                            Profile
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="hover:text-red-400"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
