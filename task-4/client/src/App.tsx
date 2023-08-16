import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "./store/auth/auth.selector";
import jwtDecode from "jwt-decode";

import Auth from "./pages/Auth";
import Users from "./pages/Users";

const token = localStorage.getItem("token");

interface MyToken {
  id: number;
  email: string;
  displayname: string;
  status: boolean;
  iat: number;
  exp: number;
}

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    let decodedToken: MyToken | null = null;
    if (localStorage.getItem("token")) {
      decodedToken = jwtDecode(localStorage.getItem("token") as string);
    }

    if (decodedToken) {
      localStorage.setItem("user", decodedToken.displayname);
      if (decodedToken?.exp * 1000 < new Date().getTime()) {
        dispatch({ type: "LOGOUT" });
      }
    }
  }, []);

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
