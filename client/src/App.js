import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { useContext} from "react";
import { AuthContext } from "./authContext";
import AdminLanding from "./pages/AdminLanding"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import Reservations from "./pages/Reservations";

function App() {

  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ children, redirectTo }) => {
    if (!user) {
      return <Navigate to={redirectTo} />;
    } else {
      return children;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute redirectTo="/userLogin"><Home /></ProtectedRoute>} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/adminLogin" element={<Login type="admin"/>} />
        <Route path="/restaurant/:id" element={<ProtectedRoute redirectTo="/userLogin"><Restaurant /></ProtectedRoute>} />
        <Route path="/reservations" element={<ProtectedRoute redirectTo="/userLogin"><Reservations /></ProtectedRoute>} />
        <Route path="/adminRegister" element={<Register type="admin"/>} />
        <Route path="/userLogin" element={<Login type="user"/>} />
        <Route path="/userRegister" element={<Register type="user"/>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute redirectTo="/adminLogin"><AdminLanding /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
