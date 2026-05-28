import { Link, useNavigate } from "react-router-dom";

import {

  FaHome,

  FaNotesMedical,

  FaPills,

  FaUser,

  FaSignOutAlt

} from "react-icons/fa";

function Sidebar() {

  const navigate = useNavigate();


  // LOGOUT

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };


  const links = [

    {
      to: "/dashboard",
      icon: <FaHome />,
      label: "Dashboard"
    },

    {
      to: "/add-record",
      icon: <FaNotesMedical />,
      label: "Add Record"
    },

    {
      to: "/medicines",
      icon: <FaPills />,
      label: "Medicines"
    },

    {
      to: "/profile",
      icon: <FaUser />,
      label: "Profile"
    }
  ];


  return (

    <div className="w-64 min-h-screen bg-blue-600 text-white p-6">

      <h1 className="text-3xl font-bold mb-10">

        HealthCare+

      </h1>


      <div className="flex flex-col gap-6">


        {/* NAV LINKS */}

        {links.map((link) => (

          <Link
            key={link.to}
            to={link.to}
            className="flex items-center gap-3 text-lg hover:text-gray-200"
          >

            {link.icon}

            {link.label}

          </Link>
        ))}


        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-lg hover:text-red-300 text-left"
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </div>
  );
}

export default Sidebar;