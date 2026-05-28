import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import { toast } from "react-toastify";

import Navbar from "../components/Navbar";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

      email: "",

      password: ""

    });

  const [loading, setLoading] =
    useState(false);


  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });
  };


  // HANDLE LOGIN

  const handleSubmit = async (e) => {

    e.preventDefault();


    // VALIDATION

    if (

      !formData.email ||

      !formData.password

    ) {

      return toast.error(
        "Please fill all fields"
      );
    }


    if (
      formData.password.length < 6
    ) {

      return toast.error(
        "Password must be at least 6 characters"
      );
    }


    try {

      setLoading(true);

      const res = await API.post(
  "/api/auth/login",
  formData
);

      localStorage.setItem(

        "token",

        res.data.token
      );

      localStorage.setItem(

        "user",

        JSON.stringify(res.data.user)
      );

      toast.success(
        res.data.message
      );

      setLoading(false);

      navigate("/dashboard");

    } catch (error) {

      setLoading(false);

      toast.error(

        error.response?.data?.message ||

        "Something went wrong"
      );
    }
  };


  return (

    <>

      <Navbar />

      <div className="min-h-screen bg-gray-100 flex justify-center items-center">

        <div className="bg-white p-10 rounded-xl shadow-lg w-96">

          <h2 className="text-3xl font-bold mb-6 text-center">

            Login

          </h2>


          <form
            className="space-y-4"
            onSubmit={handleSubmit}
          >

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
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >

              {
                loading
                  ? "Logging in..."
                  : "Login"
              }

            </button>

          </form>

        </div>

      </div>

    </>
  );
}

export default Login;