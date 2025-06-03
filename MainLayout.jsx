import { Outlet } from "react-router-dom";
import TokenChecker from "./src/component/TokenChecker";

const MainLayout = () => {
  return (
    <TokenChecker>
      <Outlet />
    </TokenChecker>
  );
};

export default MainLayout;
