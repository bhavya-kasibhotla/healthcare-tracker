import {

  BrowserRouter,

  Routes,

  Route

} from "react-router-dom";


import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import AddRecord from "./pages/AddRecord";

import Medicines from "./pages/Medicines";

import Profile from "./pages/Profile";
import {
  ToastContainer
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";


function App() {

  return (

    <BrowserRouter>

    

      <Routes>


        {/* PUBLIC ROUTES */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* PROTECTED ROUTES */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/add-record"
          element={
            <ProtectedRoute>
              <AddRecord />
            </ProtectedRoute>
          }
        />


        <Route
          path="/medicines"
          element={
            <ProtectedRoute>
              <Medicines />
            </ProtectedRoute>
          }
        />


        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>

      <ToastContainer
  position="top-right"
  autoClose={2000}
/>

    </BrowserRouter>
  );
}

export default App;