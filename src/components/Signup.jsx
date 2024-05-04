import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      password: e.target.password.value,
      email: e.target.email.value,
      number: e.target.number.value,
      image: e.target.image.value,
    };
    const { name, password, email, number, image } = data;
    console.log(image);
    if (!name || !password || !email || !number || !image)
      return toast.error("all  fields are required", { autoClose: 1000 });
    try {
      setLoading(true);
      let res = await axios.post(`${BASE_URL}/signup`, {
        name,
        password,
        email,
        number,
        image,
      });
      console.log(res);
      if (res) {
        toast.success("Registered successfully", { autoClose: 1000 });
        navigate("/login");
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.error(e.response.data, { autoClose: 1000 });
    }
  };

  return (
    <div className="mt-[1rem]">
      <div className="w-full flex justify-center p-10">
        <form
          onSubmit={handleSubmitForm}
          className="md:w-[400px] w-[300px] min-h-[300px] bg-white/70 rounded-md shadow-md py-3 border"
        >
          <h1 className="md:text-2xl text-xl font-semibold text-center text-black/65">
            Register
          </h1>
          <div className="w-[80%] mx-auto h-10 mt-5 mb-6 border-2 rounded-md">
            <input
              type="text"
              placeholder="username.."
              name="name"
              className="block w-full h-full outline-none px-3 py-1 rounded-md text-black/70 font-semibold"
            />
          </div>

          <div className="w-[80%] mx-auto h-10 mt-5 mb-6 border-2  rounded-md">
            <input
              type="password"
              placeholder="user Password.."
              name="password"
              className="block w-full h-full outline-none px-3 py-1 rounded-md  text-black/70 font-semibold"
            />
          </div>
          <div className="w-[80%] mx-auto h-10 mt-5 mb-6 border-2  rounded-md">
            <input
              type="email"
              name="email"
              placeholder="user email..."
              className="block w-full h-full outline-none px-3 py-1 rounded-md  text-black/70 font-semibold"
            />
          </div>
          <div className="w-[80%] mx-auto h-10 mt-5 mb-6 border-2  rounded-md">
            <input
              type="number"
              name="number"
              placeholder="contact number..."
              className="block w-full h-full outline-none px-3 py-1 rounded-md  text-black/70 font-semibold"
            />
          </div>
          <div className="w-[80%] mx-auto h-10 mt-5 mb-6 border-2  rounded-md">
            <input
              type="text"
              name="image"
              placeholder="upload profile image url..."
              className="block w-full h-full outline-none px-3 py-1 rounded-md  text-black/70 font-semibold"
            />
          </div>
          <div className=" mt-10  w-[80%] mx-auto py-2 ">
            <input
              type="submit"
              value={loading ? "Loading..." : "Register"}
              className=" w-full cursor-pointer px-3 py-2 rounded-md bg-slate-900 font-semibold text-white hover:bg-transparent hover:border hover:border-blue-600 duration-300 hover:text-black"
            />
          </div>

          <div className=" w-[80%] mx-auto">
            <p className="text-sm font-medium text-black/60">
              Already have an Acount ?{" "}
              <Link
                to="/login"
                className="text-blue-600 underline px-1 text-md"
              >
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
