import React, { useContext, useEffect, useState } from "react";
import { context } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdatePost = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { postId, userData, fetchData } = useContext(context);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");
  const fetchPost = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/updatepost/${postId}`);
      setImage(res.data.image);
      setPostText(res.data.post);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);
  console.log(postText)

  const handleSubmitpost = async e => {
    e.preventDefault();
    if (!postText || !image)
      return toast.error("All  fields are required", { autoClose: 1000 });

    try {
      setLoader(true);
      let res = await axios.post(`${BASE_URL}/update/${postId}`, {
        postText,
        image
      });
     console.log("updated post",res.data)
      setLoader(false);

      if (res) {
        setPostText("");
        setImage("");

        toast.success("Updated successfully", { autoClose: 1000 });
        navigate(`/profile/${userData.name}`);
        fetchData();
      }
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };
  return (
    <>
      <h1 className="text-lg text-zinc-500 font-semibold text-center mt-4">
        Update your post
      </h1>
      <div className="md:w-[50%] mx-auto w-[80%] ">
        <button
          onClick={() => navigate(`/profile/${userData.name}`)}
          className="text-md text-zinc-600 font-semibold border px-2 hover:bg-blue-500 hover:text-white duration-500"
        >
          Back
        </button>
      </div>

      <div className="flex justify-center w-full mt-10 p-3 ">
        <form
          className="w-[400px] min-h-[200px] shadow-md "
          onSubmit={handleSubmitpost}
        >
          <div className="w-[80%] mx-auto h-10  mb-6 border-2  rounded-md">
            <input
              type="text"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Upload image Url..."
              className="block w-full h-full outline-none px-3 py-1 rounded-md  text-black/70 font-semibold"
            />
          </div>
          <div className="w-[80%] mx-auto h-10  mb-6 border-2  rounded-md">
            <input
              type="text"
              name="postText"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Enter your postText..."
              className="block w-full h-full outline-none px-3 py-1 rounded-md  text-black/70 font-semibold"
            />
          </div>

          <div className="w-[130px] mx-auto h-10  mb-6 border-2  rounded-md">
            <input
              value={loader ? "Please wait..." : "Update"}
              type="submit"
              className="block w-full cursor-pointer h-full bg-green-500 px-3 py-1 rounded-md font-semibold text-white"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdatePost;
