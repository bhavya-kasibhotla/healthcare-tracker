import { useState } from "react";

import API from "../services/api";

import Layout from "../components/Layout";

import { toast } from "react-toastify";

function AddRecord() {

  const [formData, setFormData] =
    useState({

      bloodPressure: "",

      sugarLevel: "",

      weight: "",

      height: "",

      heartRate: "",

      sleepHours: "",

      diet: ""

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


  // SUBMIT FORM

  const handleSubmit = async (e) => {

    e.preventDefault();


    // VALIDATION

    if (

      !formData.bloodPressure ||

      !formData.sugarLevel ||

      !formData.weight ||

      !formData.height ||

      !formData.heartRate ||

      !formData.sleepHours ||

      !formData.diet

    ) {

      return toast.error(
        "Please fill all fields"
      );
    }


    if (

      formData.weight <= 0 ||

      formData.height <= 0 ||

      formData.sleepHours <= 0

    ) {

      return toast.error(
        "Invalid values entered"
      );
    }


    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const res = await API.post(

        "/api/health/add",

        formData,

        {
          headers: {
            authorization: token
          }
        }
      );

      toast.success(res.data.message);

      setFormData({

        bloodPressure: "",

        sugarLevel: "",

        weight: "",

        height: "",

        heartRate: "",

        sleepHours: "",

        diet: ""

      });

      setLoading(false);

    } catch (error) {

      setLoading(false);

      toast.error(

        error.response?.data?.message ||

        "Something went wrong"
      );
    }
  };


  // INPUT FIELDS

  const fields = [

    {
      name: "bloodPressure",
      placeholder: "Blood Pressure",
      type: "text"
    },

    {
      name: "sugarLevel",
      placeholder: "Sugar Level",
      type: "number"
    },

    {
      name: "weight",
      placeholder: "Weight (kg)",
      type: "number"
    },

    {
      name: "height",
      placeholder: "Height (cm)",
      type: "number"
    },

    {
      name: "heartRate",
      placeholder: "Heart Rate",
      type: "number"
    },

    {
      name: "sleepHours",
      placeholder: "Sleep Hours",
      type: "number"
    }

  ];


  return (

    <Layout>

      <div className="min-h-screen bg-gray-100 flex justify-center items-center">

        <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-lg">

          <h2 className="text-3xl font-bold mb-8 text-center">

            Add Health Record

          </h2>


          <form
            className="space-y-4"
            onSubmit={handleSubmit}
          >

            {/* INPUTS */}

            {fields.map((field) => (

              <input
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className="w-full border p-3 rounded-lg"
                value={formData[field.name]}
                onChange={handleChange}
              />
            ))}


            {/* DIET DROPDOWN */}

            <select
              name="diet"
              className="w-full border p-3 rounded-lg"
              value={formData.diet}
              onChange={handleChange}
            >

              <option value="">
                Select Diet Type
              </option>

              <option value="Vegetarian">
                Vegetarian
              </option>

              <option value="Non-Vegetarian">
                Non-Vegetarian
              </option>

              <option value="Vegan">
                Vegan
              </option>

              <option value="Keto">
                Keto
              </option>

              <option value="Low Carb">
                Low Carb
              </option>

              <option value="High Protein">
                High Protein
              </option>

            </select>


            {/* BUTTON */}

            <button
              disabled={loading}
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >

              {
                loading
                  ? "Adding..."
                  : "Add Record"
              }

            </button>

          </form>

        </div>

      </div>

    </Layout>
  );
}

export default AddRecord;