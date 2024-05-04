import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Feed from "./components/Feed";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import axios from "axios";
import Profile from "./components/Profile";
import UpdatePost from "./components/UpdatePost";
import Admin from "./components/Admin";
import Allpost from "./components/Allpost";
import SampleComponent from "./components/SampleComponent";


export const context = createContext();
const App = () => {
 
  const [userData, setUserData] = useState(() => {
    const user = JSON.parse(localStorage.getItem("users"));
    if (!user) {
      return null;
    }
    return user;
  });

  // const [userLog, setUserLog] = useState(false);
  const [loader, setLoader] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [feed, setFeed] = useState([]);
  const [postId, SetPostId] = useState(null);

  const fetchData = async () => {
    try {
      setLoader(true);
      const res = await axios.get(`${BASE_URL}/post/${userData?.name}`);
      setFeed(res.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <context.Provider
      value={{
        feed,
        setFeed,
        userData,
        setUserData,
        loader,
        setLoader,
        SetPostId,
        postId,
        fetchData,
      }}
    >
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="/post/:id" element={<Feed />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/updatepost/:id" element={<UpdatePost />}></Route>
          <Route path="/allpost" element={<Allpost />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          
        </Routes>
      </BrowserRouter>
    </context.Provider>
  );
};

export default App;
