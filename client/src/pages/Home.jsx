import Navbar from "../components/Navbar";

function Home() {

  return (

    <>

      <Navbar />

      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 min-h-screen text-white flex flex-col justify-center items-center px-6">


        {/* HERO SECTION */}

        <h1 className="text-6xl font-bold mb-6 text-center">

          Healthcare Tracker

        </h1>

        <p className="text-2xl text-center max-w-2xl mb-10">

          Track your health records, medicines,
          hydration, sleep, BMI, and wellness
          securely in one place.

        </p>


        {/* BUTTONS */}

        <div className="flex gap-6 mb-16">

          <a
            href="/login"
            className="bg-white text-blue-500 px-8 py-3 rounded-xl font-bold hover:bg-gray-100"
          >
            Login
          </a>

          <a
            href="/register"
            className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800"
          >
            Register
          </a>

        </div>


        {/* FEATURES */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">


          <div className="bg-white text-black p-6 rounded-2xl shadow-xl">

            <h2 className="text-2xl font-bold mb-4">

              Health Records

            </h2>

            <p>

              Store and manage blood pressure,
              sugar levels, BMI, and more.

            </p>

          </div>


          <div className="bg-white text-black p-6 rounded-2xl shadow-xl">

            <h2 className="text-2xl font-bold mb-4">

              Medicine Reminder

            </h2>

            <p>

              Track medicines and mark them
              as taken daily.

            </p>

          </div>


          <div className="bg-white text-black p-6 rounded-2xl shadow-xl">

            <h2 className="text-2xl font-bold mb-4">

              Hydration Tracker

            </h2>

            <p>

              Monitor your daily water intake
              and hydration goals.

            </p>

          </div>


          <div className="bg-white text-black p-6 rounded-2xl shadow-xl">

            <h2 className="text-2xl font-bold mb-4">

              Sleep & BMI

            </h2>

            <p>

              Analyze sleep patterns and BMI
              for better wellness tracking.

            </p>

          </div>

        </div>

      </div>

    </>
  );
}

export default Home;