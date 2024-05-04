import { Fragment, useContext, useState, useEffect } from "react";
import { context } from "../App";
import axios from "axios";

const Allpost = () => {
  const { feed, fetchData, userData } = useContext(context);

  const [users, setUsers] = useState([]);
  const [dislikedUsers, setDislikedUserss] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleLikepost = async (postId, userId) => {
    await axios.post(`${BASE_URL}/likes/${postId}/${userId}`);
    setOpen2(false);
    fetchData();
  };

  const handleDisLikepost = async (postId, userId) => {
    await axios.post(`${BASE_URL}/dislike/${postId}/${userId}`);
    fetchData();
    setOpen(false);
  };

  const fetchUsers = async (postId) => {
    console.log(postId);
    setOpen(!open);
    const user = await axios.get(`${BASE_URL}/likeusers/${postId}`);
    setUsers(user.data.likeby);
    fetchData();
    setOpen2(false);
  };

  const getUsersDislike = async (postId) => {
    const res = await axios.get(`${BASE_URL}/dislikeusers/${postId}`);
    console.log(res.data.dislikeby);
    setDislikedUserss(res.data.dislikeby);
    fetchData();
    setOpen2(!open2);
    setOpen(false);
  };

  useEffect(() => {
    window.onscroll = () => {
      setOpen(false);
      setOpen2(false);
    };
  }, []);

  return (
    <>
      <h1 className="text-center text-xl font-semibold p-3">
        All posts posted by users
      </h1>
      <div className="md:w-[50%] w-full md:mx-auto my-4 h-full shadow-md grid gap-2 md:grid-cols-1 grid-cols-1 place-items-center  md:place-items-center p-2">
        {feed.map((feeds) => {
          return (
            <Fragment key={feeds._id}>
              {feeds.posts.map(
                (post) =>
                  post?.approved && (
                    <div
                      className="w-[200px] min-h[200px] rounded-md shadow-md p-2 relative"
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
                        Post:{" "}
                        <span className="text-black/70">{post?.post}</span>
                      </h1>
                      <div>
                        <h1 className="text-sm font-semibold">
                          Created by:{" "}
                          <span className="text-black/80">{feeds.name}</span>
                        </h1>
                        <div className="py-1 flex flex-col justify-start">
                          <div>
                            <button
                              onClick={() => {
                                handleLikepost(post._id, userData._id);
                              }}
                              className="bg-green-500  text-white rounded-sm px-1 py-1 text-sm"
                            >
                              Like
                            </button>

                            <button
                              onClick={() => {
                                handleDisLikepost(post._id, userData._id);
                              }}
                              className="my-1 mx-8 bg-red-500  text-white rounded-sm px-1 py-1 text-sm"
                            >
                              Dislike
                            </button>

                            <div className="flex gap-7">
                              <span className="text-sm font-medium ">
                                {post.likes} likes
                              </span>
                              <span className="text-sm font-medium ">
                                {post.dislikes} Dislikes
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <button
                              onClick={() => fetchUsers(post._id)}
                              className="bg-zinc-500 text-white font-semibold text-[12px] px-1 py-1 my-1 rounded-sm"
                            >
                              Liked by
                            </button>
                            <button
                              onClick={() => getUsersDislike(post._id)}
                              className="bg-zinc-500 text-white font-semibold text-[12px] px-1 py-1 my-1 rounded-sm"
                            >
                              Disliked by
                            </button>
                          </div>
                          <div className="w-[200px] relative">
                            {open && (
                              <div className="w-[200px] h-[120px] fixed z-50 top-30 bg-zinc-900 rounded-md overflow-scroll text-white">
                                {users.map((like) => {
                                  return (
                                    <>
                                      <div className="flex gap-5 p-3">
                                        <img
                                          src={like.image}
                                          alt=""
                                          width={30}
                                          className="rounded-full"
                                        />
                                        <h1>{like.name}</h1>
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          <div className="w-[200px] relative">
                            {open2 && (
                              <div className="w-[200px] h-[120px] fixed z-50 top-30 bg-zinc-900 rounded-md overflow-scroll text-white">
                                {dislikedUsers?.map((like) => {
                                  return (
                                    <>
                                      <div className="flex gap-5 p-3">
                                        <img
                                          src={like.image}
                                          alt=""
                                          width={30}
                                          className="rounded-full"
                                        />
                                        <h1>{like.name}</h1>
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-3 "></div>

                        <h1 className="text-sm font-semibold">
                          posted at :{" "}
                          <span className="text-black/80 text-[12px]">
                            {post?.data.replace("T", "  ").substr(0, 20)}
                          </span>
                        </h1>
                      </div>
                    </div>
                  )
              )}
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Allpost;
