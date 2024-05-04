import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { context } from "../App";

const Login = () => {
  const { userData } = useContext(context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { setUserData } = useContext(context);
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      password: e.target.password.value,
    };
    const { name, password } = data;
    if (!name || !password)
      return toast.error("all  fields are required", { autoClose: 1000 });
    try {
      setLoading(true);
      let res = await axios.post(`${BASE_URL}/login`, { name, password });

      if (res) {
        toast.success("Login successfully", { autoClose: 1000 });
        setUserData(res.data);
        if (res?.data?.isAdmin == true) {
          navigate("/admin");

          localStorage.setItem("users", JSON.stringify(res.data));
        } else {
          navigate(`/`);
          localStorage.setItem("users", JSON.stringify(res.data));
        }

        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
      toast.error(e.response.data,{autoClose:1000});
    }
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("users"));
    console.log("local", user);
    if (!user) return navigate("/login");
    setUserData(user);
  }, []);
  return (
    <div className="mt-[5rem]">
      <div className="w-full flex justify-center p-5">
        <form
          onSubmit={handleSubmitForm}
          className="md:w-[400px] w-[300px] min-h-[300px] bg-white/70 rounded-md shadow-md py-3 border "
        >
          <h1 className="md:text-2xl text-xl font-semibold text-center text-black/65">
            Login
          </h1>
          <div className="w-[80%] mx-auto h-10 mt-5 mb-6 border-2 rounded-md">
            <input
              type="text"
              placeholder="Username.."
              name="name"
              className="block w-full h-full outline-none px-3 py-1 rounded-md text-black/70 font-semibold"
            />
          </div>

          <div className="w-[80%] mx-auto h-10 mt-10 mb-6 border-2  rounded-md">
            <input
              type="password"
              name="password"
              placeholder="Password.."
              className="block w-full h-full outline-none px-3 py-1 rounded-md  text-black/70 font-semibold"
            />
          </div>
          <div className=" mt-10  w-[80%] mx-auto py-2 ">
            <input
              type="submit"
              value={loading ? "Please wait ..." : "Login"}
              className=" w-full cursor-pointer px-3 py-2 rounded-md bg-slate-900 font-semibold text-white hover:bg-transparent hover:border hover:border-blue-600 duration-300 hover:text-black"
            />
          </div>

          <div className=" w-[80%] mx-auto">
            <p className="text-sm font-medium text-black/60">
              Don't have an Acount ?{" "}
              <Link
                to="/signup"
                className="text-blue-600 underline px-1 text-md"
              >
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
