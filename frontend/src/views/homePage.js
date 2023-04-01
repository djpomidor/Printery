import { useContext } from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="text-center">
    <Navbar />
    <section>
      {user && <UserInfo user={user} />}
      <h1>You are on home page!</h1>
    </section>
    </div>
  );
};

export default Home;
