import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { useNavigate } from "react-router-dom";

import { getUsers } from "../store/user/user.action";
import { selectUsers } from "../store/user/user.selector";

import { UserData } from "../store/user/user.types";

import UsersTable from "../components/UsersTable/UsersTable";

const Users = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth");
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const users: UserData[] = useSelector(selectUsers);

  return (
    <div className="container mx-auto p-2">
      <div className="flex items-center mb-4 justify-between">
        <h1 className="text-2xl font-bold">
          Welcome {localStorage.getItem("user")}
        </h1>
        <button
          onClick={logOut}
          className="flex items-center gap-1 text-white bg-blue-600 rounded-md py-2 px-4"
        >
          Logout
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </button>
      </div>
      <UsersTable users={users} />
    </div>
  );
};

export default Users;
