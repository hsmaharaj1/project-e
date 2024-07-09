import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Navbar from "../components/custom/Navbar";
import UpdateProfile from "@/components/custom/UpdateProfile";
import AddEvent from "@/components/custom/AddEvent";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [showUpdate, setShowUpdate] = useState(false)

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      if (!status) (removeCookie("token"), navigate("/login"))
    }
    verifyCookie();
  }, [cookies, navigate, removeCookie])

  useEffect(() => {
    const verifyUpdate = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/user/isupdated",
          { withCredentials: true }
        )
        setShowUpdate(!data.isUpdated)
      } catch (error) {
        console.error("Error verifying update status:", error)
      }
    }
    verifyUpdate()
  }, [cookies, navigate, removeCookie])


  return (
    <>
      <div className="h-screen w-screen flex flex-col gap-6">
        <div className="items-center">
          <Navbar />
        </div>
        <div className="w-[100vw] flex flex-col items-center h-fit overflow-x-hidden">
          {showUpdate ? <UpdateProfile /> : navigate("/explore")}
        </div>

      </div>
    </>
  );
};

export default Home;