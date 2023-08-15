import { ChangeEvent } from "react";
import { targetProps } from "../Form/Form";

export type InputProps = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  onChange: (e: ChangeEvent<targetProps>) => void;
};

const Input = ({ name, label, placeholder, type, onChange }: InputProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        name={name}
        id={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        autoComplete="new-password"
        required
      />
    </div>
  );
};

export default Input;
