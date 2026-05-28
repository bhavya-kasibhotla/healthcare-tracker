import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            return toast.error("Please fill all fields");
        }

        if (formData.password.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }

        try {
            setLoading(true);
            const res = await API.post("/api/auth/register", formData);
            toast.success(res.data.message);
            setLoading(false);
            navigate("/login");
        } catch (error) {
            setLoading(false);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };


    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="bg-white p-10 rounded-xl shadow-lg w-96">
                    <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            className="w-full border p-3 rounded-lg"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            className="w-full border p-3 rounded-lg"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            className="w-full border p-3 rounded-lg"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button
                            disabled={loading}
                            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>

                    <p className="text-center mt-4 text-gray-600">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Register;
