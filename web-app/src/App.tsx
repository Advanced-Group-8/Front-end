import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProfile } from "./store/authSlice";
import type { AppDispatch } from "./store/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return <></>;
}

export default App;
