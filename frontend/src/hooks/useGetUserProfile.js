import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "./useShowToast";

const useGetUserProfile = () => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const { username } = useParams();
  const showToast = useShowToast();
  const showToastRef = useRef(showToast);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();

        if (data.error) {
          showToastRef.current('Error', data.error, 'error');
          return;
        }

        setUser(data);
      } catch (error) {
        showToastRef.current('Error', error.message, 'error');
      } finally {
        setUserLoading(false);
      }
    };

    getUser();
  }, [username]);

  return { user, userLoading };
}

export default useGetUserProfile