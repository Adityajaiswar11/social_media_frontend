import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { context } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { userData, SetPostId } = useContext(context);
  const [posts, setPost] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  //fetching data from the api
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/user/${param.id}`);
        console.log(res.data);
        setUser(res.data);
        setPost(res.data.posts);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handledeletepost = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/delete/${id}/${userData._id}`);
      const deletePost = posts.filter((post) => post._id !== id);
      setPost(deletePost);
      toast.success(res.data.message, { autoClose: 1000 });
    } catch (e) {
      console.log(e);
      toast.error("something went wrong!", { autoClose: 1000 });
    }
  };

  const handleUpdatePost = (id) => {
    SetPostId(id);
    navigate(`/updatepost/${userData.name}`);
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("users"));
    if (!userData) return navigate("/login");
  }, []);
  return (
    <>
      <div className="md:w-[70%]  w-full md:mx-auto h-60 bg-white shadow-md">
        <div className="flex justify-center items-center py-4 flex-col">
          <img
            src={userData?.image}
            alt={userData?.name}
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
          <h1 className="py-1 text-xl font-semibold opacity-80">
            @{userData?.name}
          </h1>
          <h1 className="text-lg opacity-80">{userData?.email}</h1>
          <Link className="bg-blue-600 py-1 px-2 font-semibold rounded-sm text-white mt-4">
            Setting
          </Link>
        </div>
      </div>
      {posts.length == 0 && (
        <h1 className="text-center font-semibold text-zinc-500 p-3">
          No Post yet!
        </h1>
      )}
      <div className="md:w-[80%] w-full md:mx-auto my-4 h-full shadow-md grid gap-5 md:grid-cols-3 lg:grid-cols-5 grid-cols-1 place-items-center  md:place-items-start p-2">
        {loading ? (
          <h1 className="text-center py-10">Loading posts...</h1>
        ) : (
          posts.reverse().map((post) => {
            console.log("users by post",post)
            return (
              <div
                key={post?._id}
                className="w-[200px] min-h[200px] rounded-md shadow-md p-2"
              >
                <div className="w-full rounded-md">
                  <img
                    src={post?.image}
                    alt={user?.name}
                    className="w-full h-[150px] rounded-md  hover:scale-[1.1]  duration-700 ease-in-out cursor-pointer object-cover p-2"
                  />
                </div>
                <h1 className="text-sm font-semibold ">
                  Post: <span className="text-black/70">{post?.post}</span>
                </h1>
                <div>
                  <h1 className="text-sm font-semibold">
                    Created by:{" "}
                    <span className="text-black/80">{user?.name}</span>
                  </h1>
                  <span>{post.likes} likes</span>
                  {/* <span>{post.likes} likes</span> */}
                  <h1 className="text-sm font-semibold">
                    Created date:{" "}
                    <span className="text-black/80">
                      {post?.data.replace("T", "  ").substr(0, 20)}
                    </span>
                  </h1>
                </div>
                <div className="flex  gap-5 py-3">
                  <button
                    className="bg-green-500 text-white font-semibold text-sm rounded-sm px-1 py-1"
                    onClick={() => handleUpdatePost(post?._id,)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white font-semibold text-sm rounded-sm px-1 py-1"
                    onClick={() => handledeletepost(post?._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Profile;
