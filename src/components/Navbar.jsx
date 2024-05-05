import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../App";
import { toast } from "react-toastify";

const Navbar = () => {
  const { userData } = useContext(context);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("users");
    toast.success("Logged out successfully!", { autoClose: 1000 });
    window.location.reload();
    navigate("/login");
  };
  return (
    <div className="w-full bg-zinc-800 text-white">
      <nav className=" md:w-[80%] w-full mx-auto h-14 shadow-sm py-3 px-3 flex justify-between items-center">
        <div className="md:text-xl text-md font-semibold first-letter:text-blue-600">
          <Link to="/">Logo</Link>
        </div>
        <ul className="flex gap-5">
          <ul
            className="text-md hover:text-blue-600 duration-200 font-semibold"
            onClick={logout}
          >
            <li>{userData?.name ? "Logout" : "Login"}</li>
          </ul>
          <li className="text-md hover:text-blue-600 duration-200 font-semibold">
            <Link to="/signup">{!userData?.name && "Register"}</Link>
          </li>
          <li className="text-md hover:text-blue-600 duration-200 font-semibold">
            <Link to={`/post/${userData?.name}`}>Post</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
