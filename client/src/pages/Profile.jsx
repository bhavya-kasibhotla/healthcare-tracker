import { useEffect, useState } from "react";

import API from "../services/api";

import Layout from "../components/Layout";

import { toast } from "react-toastify";

function Profile() {

  const [formData, setFormData] =
    useState({

      age: "",

      gender: "",

      bloodGroup: "",

      allergies: "",

      emergencyContact: ""

    });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);


  useEffect(() => {

    fetchProfile();

  }, []);


  // FETCH PROFILE

  const fetchProfile = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const res = await API.get(

        "/profile/get",

        {
          headers: {
            authorization: token
          }
        }
      );

      if (res.data) {

        setFormData({

          age:
            res.data.age || "",

          gender:
            res.data.gender || "",

          bloodGroup:
            res.data.bloodGroup || "",

          allergies:
            res.data.allergies || "",

          emergencyContact:
            res.data.emergencyContact || ""

        });
      }

      setLoading(false);

    } catch (error) {

      setLoading(false);

      toast.error(

        error.response?.data?.message ||

        "Something went wrong"
      );
    }
  };


  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });
  };


  // SAVE PROFILE

  const handleSubmit = async (e) => {

    e.preventDefault();


    // VALIDATION

    if (

      !formData.age ||

      !formData.gender ||

      !formData.bloodGroup ||

      !formData.emergencyContact

    ) {

      return toast.error(
        "Please fill required fields"
      );
    }


    if (
      formData.age <= 0
    ) {

      return toast.error(
        "Invalid age"
      );
    }


    try {

      setSaving(true);

      const token =
        localStorage.getItem("token");

      const res = await API.post(

        "/profile/save",

        formData,

        {
          headers: {
            authorization: token
          }
        }
      );

      toast.success(
        res.data.message
      );

      setSaving(false);

    } catch (error) {

      setSaving(false);

      toast.error(

        error.response?.data?.message ||

        "Something went wrong"
      );
    }
  };


  // LOADING UI

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

      <h1 className="text-5xl font-bold mb-10">

        My Profile

      </h1>


      <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="number"
            name="age"
            placeholder="Age"
            className="w-full border p-3 rounded-lg"
            value={formData.age}
            onChange={handleChange}
          />


          <select
            name="gender"
            className="w-full border p-3 rounded-lg"
            value={formData.gender}
            onChange={handleChange}
          >

            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

          </select>


          <input
            type="text"
            name="bloodGroup"
            placeholder="Blood Group"
            className="w-full border p-3 rounded-lg"
            value={formData.bloodGroup}
            onChange={handleChange}
          />


          <textarea
            name="allergies"
            placeholder="Allergies"
            rows="4"
            className="w-full border p-3 rounded-lg"
            value={formData.allergies}
            onChange={handleChange}
          ></textarea>


          <input
            type="text"
            name="emergencyContact"
            placeholder="Emergency Contact"
            className="w-full border p-3 rounded-lg"
            value={formData.emergencyContact}
            onChange={handleChange}
          />


          <button
            disabled={saving}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >

            {
              saving
                ? "Saving..."
                : "Save Profile"
            }

          </button>

        </form>

      </div>

    </Layout>
  );
}

export default Profile;