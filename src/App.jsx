import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Home from "./pages/Home";

export default function App() {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
      />
      <Route
        path="/home"
        element={isAuthenticated ? <Home /> : <Navigate to="/" />}
      />
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/home" : "/"} />}
      />
    </Routes>
  );
}
