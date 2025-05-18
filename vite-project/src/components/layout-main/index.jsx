import { Outlet } from "react-router-dom";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <div className="main-header">
        <Header />
      </div>
      <div className="main-content-container">
        <div className="main-sidebar">
          <Sidebar />
        </div>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
