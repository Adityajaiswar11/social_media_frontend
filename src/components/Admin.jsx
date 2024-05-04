import { useContext, useEffect } from "react";
import { context } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { feed, fetchData, userData } = useContext(context);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const handledeletepost = async (id,userId) => {
    try {
      const res = await axios.delete(`${BASE_URL}/delete/${id}/${userId}`);

      toast.success(res.data.message, { autoClose: 1000 });
      fetchData();
    } catch (e) {
      console.log(e);
      toast.error("something went wrong!", { autoClose: 1000 });
    }
  };

  const handleUpdatePost = async (id) => {
    const res = await axios.post(`${BASE_URL}/updateadmin/${id}`);
    fetchData();
    console.log(res.data);
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("users"));
    if (!user) return navigate("/login");
    if (user.isAdmin == false) return navigate(`/post/${userData?.name}`);
  }, []);
  return (
    <>
      <h1 className="text-center text-xl font-semibold p-3">
        All posts posted by users
      </h1>
      <div className="md:w-[80%] w-full md:mx-auto my-4 h-full shadow-md grid gap-2 md:grid-cols-5 grid-cols-1 place-items-center  md:place-items-start p-2">
        {feed.map((feeds) => {
          return (
            <>
              {feeds.posts.reverse().map((post) => (
                console.log("post ",post),
                <div
                  className="w-[200px] min-h[200px] rounded-md shadow-md p-2"
                  key={post._id}
                >
                  <div className="w-full rounded-md">
                    <img
                      src={post?.image}
                      alt={post?.name}
                      className="w-full h-[150px] rounded-md  hover:scale-[1.1]  duration-700 ease-in-out cursor-pointer object-cover p-2"
                    />
                  </div>
                  <h1 className="text-sm font-semibold ">
                    Post: <span className="text-black/70">{post?.post}</span>
                  </h1>
                  <div>
                    <h1 className="text-sm font-semibold">
                      Created by:{" "}
                      <span className="text-black/80">{feeds.name}</span>
                    </h1>

                    <h1 className="text-sm font-semibold">
                      Created at:{" "}
                      <span className="text-black/80">
                        {post?.data.replace("T", "  ").substr(0, 20)}
                      </span>
                    </h1>
                    <span>{post?.likes} likes</span>
                  </div>

                  <div className="flex  gap-5 py-3">
                    {!post.approved && (
                      <button
                        className="bg-green-500 text-white font-semibold text-sm rounded-sm px-1 py-1"
                        onClick={() => handleUpdatePost(post._id)}
                      >
                        Approve
                      </button>
                    )}
                    <button
                      className="bg-red-500 text-white font-semibold text-sm rounded-sm px-1 py-1"
                      onClick={() => handledeletepost(post._id,userData._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </>
          );
        })}
      </div>
    </>
  );
};

export default Admin;
