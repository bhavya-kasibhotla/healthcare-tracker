import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import { FaBed, FaPills, FaWeight, FaTint, FaUser } from "react-icons/fa";

function Dashboard() {
    const [records, setRecords] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const [profile, setProfile] = useState(null);
    const [waterIntake, setWaterIntake] = useState(0);
    const [loading, setLoading] = useState(true);

    // EDIT MODAL STATE
    const [editRecord, setEditRecord] = useState(null);
    const [editForm, setEditForm] = useState({});

    const waterGoal = 8;
    const user = JSON.parse(localStorage.getItem("user"));


    useEffect(() => {
        fetchData();
    }, []);


    // FETCH DATA
    const fetchData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const config = { headers: { authorization: token } };

            const [healthRes, medicineRes, profileRes] = await Promise.all([
                API.get("/health/all", config),
                API.get("/medicines/all", config),
                API.get("/profile/get", config)
            ]);

            setRecords(healthRes.data);
            setMedicines(medicineRes.data);
            setProfile(profileRes.data);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };


    // DELETE RECORD
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this record?")) return;
        try {
            const token = localStorage.getItem("token");
            await API.delete(`/health/delete/${id}`, {
                headers: { authorization: token }
            });
            toast.success("Record deleted");
            fetchData();
        } catch (error) {
            toast.error("Failed to delete record");
        }
    };


    // OPEN EDIT MODAL
    const openEdit = (record) => {
        setEditRecord(record._id);
        setEditForm({
            bloodPressure: record.bloodPressure || "",
            sugarLevel: record.sugarLevel || "",
            weight: record.weight || "",
            height: record.height || "",
            heartRate: record.heartRate || "",
            sleepHours: record.sleepHours || "",
            diet: record.diet || ""
        });
    };


    // SAVE EDIT
    const handleEditSave = async () => {
        try {
            const token = localStorage.getItem("token");
            await API.put(`/health/update/${editRecord}`, editForm, {
                headers: { authorization: token }
            });
            toast.success("Record updated");
            setEditRecord(null);
            fetchData();
        } catch (error) {
            toast.error("Failed to update record");
        }
    };


    // HYDRATION
    const addWater = () => waterIntake < waterGoal && setWaterIntake(waterIntake + 1);
    const removeWater = () => waterIntake > 0 && setWaterIntake(waterIntake - 1);


    // SUMMARY
    const latest = records[0];
    const bmi = latest
        ? (latest.weight / ((latest.height / 100) ** 2)).toFixed(1)
        : 0;

    const cards = [
        {
            title: "BMI",
            value: bmi,
            icon: <FaWeight className="text-blue-500 text-3xl" />
        },
        {
            title: "Sleep",
            value: latest?.sleepHours >= 7 ? "Good" : "Poor",
            icon: <FaBed className="text-green-500 text-3xl" />
        },
        {
            title: "Medicines",
            value: medicines.filter((m) => !m.taken).length,
            icon: <FaPills className="text-orange-500 text-3xl" />
        },
        {
            title: "Hydration",
            value: `${waterIntake}/${waterGoal}`,
            icon: <FaTint className="text-cyan-500 text-3xl" />
        }
    ];


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
            <h1 className="text-5xl font-bold mb-10">Health Dashboard</h1>


            {/* PROFILE */}
            {profile && (
                <div className="bg-white p-8 rounded-xl shadow-lg mb-10">
                    <div className="flex items-center gap-4 mb-4">
                        <FaUser className="text-4xl text-blue-500" />
                        <h2 className="text-3xl font-bold">Welcome {user?.name} 👋</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p><strong>Age:</strong> {profile.age}</p>
                        <p><strong>Gender:</strong> {profile.gender}</p>
                        <p><strong>Blood Group:</strong> {profile.bloodGroup}</p>
                        <p><strong>Emergency:</strong> {profile.emergencyContact}</p>
                        <p><strong>Allergies:</strong> {profile.allergies}</p>
                    </div>
                </div>
            )}


            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {cards.map((card, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">{card.title}</h2>
                            {card.icon}
                        </div>
                        <p className="text-4xl font-bold mt-6">{card.value}</p>
                    </div>
                ))}
            </div>


            {/* HEALTH RECORDS */}
            <h2 className="text-3xl font-bold mb-6">Health Records</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {records.length === 0 ? (
                    <p className="text-xl font-semibold">No health records added</p>
                ) : (
                    records.map((record) => (
                        <div key={record._id} className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-xl font-bold mb-4">
                                {new Date(record.createdAt).toLocaleDateString()}
                            </h2>
                            <div className="space-y-1 text-sm">
                                <p><strong>BP:</strong> {record.bloodPressure}</p>
                                <p><strong>Sugar:</strong> {record.sugarLevel}</p>
                                <p><strong>Weight:</strong> {record.weight} kg</p>
                                <p><strong>Height:</strong> {record.height} cm</p>
                                <p>
                                    <strong>BMI:</strong>{" "}
                                    {(record.weight / ((record.height / 100) ** 2)).toFixed(1)}
                                </p>
                                <p><strong>Heart Rate:</strong> {record.heartRate} bpm</p>
                                <p><strong>Sleep:</strong> {record.sleepHours} hrs</p>
                                <p><strong>Diet:</strong> {record.diet}</p>
                            </div>
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => openEdit(record)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(record._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>


            {/* HYDRATION */}
            <div className="bg-white p-8 rounded-xl shadow-lg mb-10">
                <h2 className="text-3xl font-bold mb-6">Daily Hydration</h2>
                <p className="text-xl mb-4">{waterIntake} / {waterGoal} glasses</p>
                <div className="w-full bg-gray-200 h-5 rounded-full mb-6">
                    <div
                        className="bg-cyan-500 h-5 rounded-full transition-all"
                        style={{ width: `${(waterIntake / waterGoal) * 100}%` }}
                    ></div>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={addWater}
                        className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600"
                    >
                        + Add
                    </button>
                    <button
                        onClick={removeWater}
                        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                    >
                        - Remove
                    </button>
                </div>
            </div>


            {/* MEDICINES */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold mb-8">Medicine Reminder</h2>
                {medicines.length === 0 ? (
                    <p className="text-xl font-semibold">No medicines added</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {medicines.map((medicine) => (
                            <div key={medicine._id} className="border p-6 rounded-xl">
                                <h3 className="text-xl font-bold mb-2">{medicine.medicineName}</h3>
                                <p><strong>Dosage:</strong> {medicine.dosage}</p>
                                <p className="mb-3"><strong>Time:</strong> {medicine.timing}</p>
                                <span
                                    className={`font-bold ${medicine.taken ? "text-green-500" : "text-orange-500"}`}
                                >
                                    {medicine.taken ? "✓ Taken" : "⏳ Pending"}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>


            {/* EDIT MODAL */}
            {editRecord && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-6">Edit Health Record</h2>
                        <div className="space-y-3">
                            {[
                                { key: "bloodPressure", label: "Blood Pressure", type: "text" },
                                { key: "sugarLevel", label: "Sugar Level", type: "number" },
                                { key: "weight", label: "Weight (kg)", type: "number" },
                                { key: "height", label: "Height (cm)", type: "number" },
                                { key: "heartRate", label: "Heart Rate", type: "number" },
                                { key: "sleepHours", label: "Sleep Hours", type: "number" }
                            ].map((field) => (
                                <input
                                    key={field.key}
                                    type={field.type}
                                    placeholder={field.label}
                                    className="w-full border p-3 rounded-lg"
                                    value={editForm[field.key]}
                                    onChange={(e) =>
                                        setEditForm({ ...editForm, [field.key]: e.target.value })
                                    }
                                />
                            ))}
                            <select
                                className="w-full border p-3 rounded-lg"
                                value={editForm.diet}
                                onChange={(e) =>
                                    setEditForm({ ...editForm, diet: e.target.value })
                                }
                            >
                                <option value="">Select Diet Type</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Non-Vegetarian">Non-Vegetarian</option>
                                <option value="Vegan">Vegan</option>
                                <option value="Keto">Keto</option>
                                <option value="Low Carb">Low Carb</option>
                                <option value="High Protein">High Protein</option>
                            </select>
                        </div>
                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={handleEditSave}
                                className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditRecord(null)}
                                className="flex-1 bg-gray-300 text-black py-3 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default Dashboard;
