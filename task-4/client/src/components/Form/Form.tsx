import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

import { signUpUser, signInUser } from "../../store/auth/auth.action.ts";

import Input from "../Input/Input";

const initialStateForm = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export type targetProps = {
  name: string;
  value: string;
};

const Form = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialStateForm);

  const onChangeEvent = (e: ChangeEvent<targetProps>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const changeSignState = () => setIsSignUp((state) => !state);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        dispatch(signUpUser(formData, navigate));
      } else {
        dispatch(signInUser(formData, navigate));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {isSignUp ? "Create an" : "Sign in to your"} account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {isSignUp && (
                <Input
                  name="displayName"
                  type="text"
                  label="Display Name"
                  placeholder="John Doe"
                  onChange={onChangeEvent}
                />
              )}
              <Input
                name="email"
                type="email"
                label="Your email"
                placeholder="name@company.com"
                onChange={onChangeEvent}
              />

              <Input
                name="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                onChange={onChangeEvent}
              />
              {isSignUp && (
                <Input
                  name="confirmPassword"
                  type="password"
                  label="Confirm password"
                  placeholder="••••••••"
                  onChange={onChangeEvent}
                />
              )}
              <button
                type="submit"
                className="w-full mt-4 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign {isSignUp ? "up" : "in"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {isSignUp
                  ? "Already have an account? "
                  : "Don't have an account yet? "}
                <a
                  onClick={changeSignState}
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {isSignUp ? "Login here" : "Sign up"}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
