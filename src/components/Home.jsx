import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Allpost from "./Allpost";

const Home = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("users"));
    if (!userData) return navigate("/login");
  }, []);
  return (
    <>
      <Allpost/>
    </>
  );
};

export default Home;
