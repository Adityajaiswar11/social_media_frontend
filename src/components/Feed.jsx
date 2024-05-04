import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { context } from "../App";

const Feed = () => {
  const { userData, setFeed, postId } = useContext(context);

  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [feeds, setFeeds] = useState([]);

  const fetchData = async () => {
    try {
      setLoader(true);
      const res = await axios.get(`${BASE_URL}/post/${userData?.name}`);
      console.log("post", res.data);
      setFeeds(res.data);
      setFeed(res.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };


  const handleSubmitpost = async (e) => {
    e.preventDefault();
    if (!postText || !image)
      return toast.error("All  fields are required", { autoClose: 1000 });

    try {
      setLoader(true);
      let res = await axios.post(`${BASE_URL}/post/${userData?.name}`, {
        image,
        postText,
      });

      setLoader(false);

      if (res.status == 200) {
        setPostText("");
        setImage("");
        toast.success("posted successfully", { autoClose: 1000 });
      }
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("users"));
    if (!userData) return navigate("/login");
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-center py-5 font-semibold text-xl opacity-90">
        Post anything here...
      </h1>
      <div className="flex justify-center w-full mt-2">
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
              placeholder="What's going on your mind..."
              className="block w-full h-full outline-none px-3 py-1 rounded-md  text-black/70 font-semibold"
            />
          </div>

          <div className="w-[130px] mx-auto h-10  mb-6 border-2  rounded-md">
            <input
              value={postId ? "Update post" : "Create Post"}
              type="submit"
              className="block w-full cursor-pointer h-full bg-blue-500 px-3 py-1 rounded-md font-semibold text-white"
            />
          </div>
          <div className="max-w-[130px] mx-auto py-2 mb-6 border-2  rounded-md">
            <p className="w-full h-full text-center ">
              <Link to={`/profile/${userData?.name}`}>View My post</Link>
            </p>
          </div>
          <div className="max-w-[200px] mx-auto py-2 mb-6 border-2  rounded-md">
            <p className="w-full h-full text-center ">
              <Link to="/allpost">View Other User post</Link>
            </p>
          </div>
        </form>
      </div>
      <h1 className="text-center mt-5 ">All users Posts are here</h1>
      <div className="md:w-[80%] w-full md:mx-auto my-4 h-full shadow-md grid gap-2 md:grid-cols-5 grid-cols-1 place-items-center  md:place-items-start p-2">
        {loader ? (
          <h1 className="px-10 text-center py-5 font-light text-zinc-500">
            Post is loading...
          </h1>
        ) : (
          feeds.map((feeds) => {
            
            return (
              <Fragment key={feeds._id}>
                {feeds.posts.reverse().map((post) => (
                 post.approved && ( <div
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
                    <span>{post?.likes} likes</span>

                    <h1 className="text-sm font-semibold">
                      Created date:{" "}
                      <span className="text-black/80">
                        {post?.data.replace("T", "  ").substr(0, 20)}
                      </span>
                    </h1>
                  </div>
                </div>)
                ))}
              </Fragment>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Feed;
