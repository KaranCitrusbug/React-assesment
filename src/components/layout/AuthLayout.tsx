import { FC, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProtectedProps } from "../../types/ProtectedProps";
import { RootState } from "../../types/StateType";
import Loading from "../../pages/loading/loading";

const Protected: FC<ProtectedProps> = ({ children, isAuthRequired = true }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isUserLoggedIn
  );

  useEffect(() => {
    setIsLoading(true);
    if (isAuthRequired && !isAuthenticated) {
      navigate("/login");
    } else if (!isAuthRequired && isAuthenticated) {
      navigate("/");
    }
    setIsLoading(false);
  }, [isAuthenticated, isAuthRequired]);

  return isLoading ? <Loading/> : <>{children}</>;
};

export default Protected;
