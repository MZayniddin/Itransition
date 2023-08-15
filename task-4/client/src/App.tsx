import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Auth from "./pages/Auth";
import Users from "./pages/Users";
import { selectCurrentUser } from "./store/auth/auth.selector";

const token = localStorage.getItem("token");

const App = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <Routes>
      <Route
        index
        element={token || user ? <Users /> : <Navigate to="/auth" />}
      />
      <Route path="auth" element={<Auth />} />
    </Routes>
  );
};

export default App;
