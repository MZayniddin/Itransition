import { useState } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import {
  blockUser,
  deleteUsers,
  unBlockUser,
} from "../../store/user/user.action";

import { selectIsUserLoading } from "../../store/user/user.selector";

import { UserData } from "../../store/user/user.types";
import Spinner from "../Spinner/Spinner";

const formatedDate = (date: string) =>
  format(new Date(date), "yyyy-mm-dd hh:mm");

type UserTableProps = {
  users: UserData[];
};

const UsersTable = ({ users }: UserTableProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  const isLoading: boolean = useSelector(selectIsUserLoading);

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId as never)
        ? prevSelected.filter((id: number) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setSelectedUsers(users.map((user) => +user.id));
    if (isCheckAll) {
      setSelectedUsers([]);
    }
  };

  const clearSelectedUsersState = () => {
    setSelectedUsers([]);
    if (isCheckAll) setIsCheckAll(false);
  };

  const handleBlock = () => {
    dispatch(blockUser(selectedUsers, navigate));
    clearSelectedUsersState();
  };

  const handleUnblock = () => {
    dispatch(unBlockUser(selectedUsers, navigate));
    clearSelectedUsersState();
  };

  const handleDelete = () => {
    dispatch(deleteUsers(selectedUsers, navigate));
    clearSelectedUsersState();
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full">
      <div className="flex justify-start items-center mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBlock}
            className="bg-red-600 text-white px-4 py-2 rounded-md flex gap-1"
          >
            Block
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
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </button>
          <button
            onClick={handleUnblock}
            className="ml-2 text-white bg-green-500 rounded-md p-1"
          >
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
                d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="ml-2 text-white bg-gray-600 rounded-md p-1"
          >
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedUsers.length === users.length}
                />
              </th>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Last Login Time
              </th>
              <th scope="col" className="px-6 py-3">
                Registration Time
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <input
                    type="checkbox"
                    onChange={() => toggleUserSelection(user.id as never)}
                    checked={selectedUsers.includes(user.id as never)}
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.displayname}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.email}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {formatedDate(user.last_login)}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {formatedDate(user.created_at)}
                </td>
                <td
                  className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ${
                    !user.status ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {user.status ? "Active" : "Blocked"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
