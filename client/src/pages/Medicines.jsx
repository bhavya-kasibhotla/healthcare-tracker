import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

function Medicines() {
    const [formData, setFormData] = useState({
        medicineName: "",
        dosage: "",
        timing: ""
    });

    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchMedicines();
    }, []);


    // FETCH MEDICINES
    const fetchMedicines = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const res = await API.get("/api/medicines/all", {
                headers: { authorization: token }
            });
            setMedicines(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };


    // HANDLE INPUT
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    // ADD MEDICINE
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.medicineName || !formData.dosage || !formData.timing) {
            return toast.error("Please fill all fields");
        }

        try {
            const token = localStorage.getItem("token");
            const res = await API.post("/api/medicines/add", formData, {
                headers: { authorization: token }
            });
            toast.success(res.data.message);
            setFormData({ medicineName: "", dosage: "", timing: "" });
            fetchMedicines();
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };


    // TOGGLE TAKEN / RESET
    const handleToggleTaken = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const res = await API.put(`/api/medicines/taken/${id}`, {}, {
                headers: { authorization: token }
            });
            toast.success(res.data.message);
            fetchMedicines();
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };


    // DELETE MEDICINE
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this medicine?")) return;
        try {
            const token = localStorage.getItem("token");
            await API.delete(`/api/medicines/delete/${id}`, {
                headers: { authorization: token }
            });
            toast.success("Medicine deleted");
            fetchMedicines();
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };


    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-screen text-3xl font-bold">
                    Loading...
                </div>
            </Layout>
        );
    }


    return (
        <Layout>
            <h1 className="text-5xl font-bold mb-10">Medicine Reminder</h1>


            {/* ADD FORM */}
            <div className="bg-white p-8 rounded-xl shadow-lg mb-10 max-w-lg">
                <h2 className="text-2xl font-bold mb-6">Add Medicine</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="medicineName"
                        placeholder="Medicine Name"
                        className="w-full border p-3 rounded-lg"
                        value={formData.medicineName}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="dosage"
                        placeholder="Dosage (e.g. 500mg)"
                        className="w-full border p-3 rounded-lg"
                        value={formData.dosage}
                        onChange={handleChange}
                    />
                    <input
                        type="time"
                        name="timing"
                        className="w-full border p-3 rounded-lg"
                        value={formData.timing}
                        onChange={handleChange}
                    />
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 w-full">
                        Add Medicine
                    </button>
                </form>
            </div>


            {/* MEDICINES LIST */}
            {medicines.length === 0 ? (
                <div className="text-xl font-semibold">No medicines added</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {medicines.map((medicine) => (
                        <div key={medicine._id} className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-bold mb-2">{medicine.medicineName}</h2>
                            <p className="mb-1"><strong>Dosage:</strong> {medicine.dosage}</p>
                            <p className="mb-4"><strong>Time:</strong> {medicine.timing}</p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleToggleTaken(medicine._id)}
                                    className={`flex-1 px-4 py-2 rounded-lg text-white text-sm font-semibold ${
                                        medicine.taken
                                            ? "bg-green-500 hover:bg-green-600"
                                            : "bg-orange-500 hover:bg-orange-600"
                                    }`}
                                >
                                    {medicine.taken ? "✓ Taken — Reset" : "Mark as Taken"}
                                </button>
                                <button
                                    onClick={() => handleDelete(medicine._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Layout>
    );
}

export default Medicines;
