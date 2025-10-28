import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const Home = () => {
  const user = useSelector((state: RootState) => state.auth.profile);

  return (
    <>
      <div className="bg-neutral-300 text-primary-1 flex w-full text-center m-auto h-64 items-center justify-center text-4xl font-bold">
        {user ? `Welcome, ${user.name}!` : "Home"}
      </div>
    </>
  );
};

export default Home;
