import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchUserProfile } from "../store/userSlice";
import SignInForm from "../components/auth/SignInForm";

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.profile);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (!user) return (
  <div>
    <p>Sign in</p>
    <SignInForm />  
  </div>
  )


  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Company: {user.companyName}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default ProfilePage;
