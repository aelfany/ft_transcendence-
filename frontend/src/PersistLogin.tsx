import refreshToken from "@/src/services/hooks/refreshToken";
import { RootState } from "@/src/states/store";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  setUnAuthenticatedData,
  setUserData,
} from "./pages/modules/setAuthenticationData";
import { useAxiosPrivate } from "./services/hooks/useAxiosPrivate";
import { axiosPrivate } from "./services/api/axios";

const getUsersInfo = async () => {
  await axiosPrivate
    .get("user_info")
    .then((res) => {
      setUserData(res.data);
    })
    .catch((err) => {
      if (err.name === "CanceledError") return;
    });
};

interface PersistLoginProps {
  children: any;
}

const PersistLogin = ({ children }: PersistLoginProps) => {
  useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const refresh = refreshToken();
  const accessToken = useSelector(
    (state: RootState) => state.accessToken.value
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.authenticator.value
  );

  useEffect(() => {
    if (isAuthenticated) getUsersInfo();
  }, [isAuthenticated]);

  useLayoutEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        if (Cookies.get("accessToken") !== undefined) await refresh();
        else throw new Error("No access token in Cookies");
      } catch (err) {
        setUnAuthenticatedData();
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  return <>{isLoading ? <p>Loading...</p> : children}</>;
};

export default PersistLogin;
